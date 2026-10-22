const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
function browserSession({ gpc=false, url='?oppref=opaque_Original%2BCase%2F%3D', blocked=false }={}) {
  const storage=new Map();
  const navigator={globalPrivacyControl:gpc};
  const window={
    location:{search:url},
    sessionStorage:{
      getItem:k=>{if(blocked)throw Error('blocked');return storage.get(k)||null;},
      setItem:(k,v)=>{if(blocked)throw Error('blocked');storage.set(k,v);},
      removeItem:k=>storage.delete(k),
    },
    dispatchEvent:()=>{},
  };
  const source=fs.readFileSync(require.resolve('../lib/openai-measurement.ts'),'utf8');
  const exports={};
  vm.runInNewContext(ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,{exports,window,navigator,URLSearchParams,Event});
  return {api:exports,storage,window,navigator};
}
test('landing reference is not stored/read into a payload before opt-in or on rejection',()=>{
  const s=browserSession();
  assert.equal(s.api.captureConsentedClick().choice,'unset');
  assert.equal(s.storage.size,0);
  assert.equal(s.api.quoteMeasurement().openaiClickReference,undefined);
  s.api.chooseMeasurement(false);
  assert.equal(s.api.quoteMeasurement().openaiMeasurementConsent,false);
  assert.ok(!JSON.stringify([...s.storage]).includes('Original'));
});
test('opt-in preserves exact decoded reference through navigation and reallowing',()=>{
  const s=browserSession();
  s.api.chooseMeasurement(true);
  assert.equal(s.api.quoteMeasurement().openaiClickReference,'opaque_Original+Case/=');
  s.window.location.search='';
  assert.equal(s.api.captureConsentedClick().oppref,'opaque_Original+Case/=');
  s.api.chooseMeasurement(true);
  assert.equal(s.api.quoteMeasurement().openaiClickReference,'opaque_Original+Case/=');
});
test('withdrawal removes reference and stops subsequent use across navigation',()=>{
  const s=browserSession();s.api.chooseMeasurement(true);s.window.location.search='';
  s.api.chooseMeasurement(false);
  assert.equal(s.api.quoteMeasurement().openaiMeasurementConsent,false);
  assert.equal(s.api.quoteMeasurement().openaiClickReference,undefined);
  assert.ok(!JSON.stringify([...s.storage]).includes('Original'));
  s.window.location.search='?oppref=new-reference';
  assert.equal(s.api.captureConsentedClick().oppref,undefined);
});
test('GPC overrides opt-in, clears earlier reference and prevents further capture',()=>{
  const s=browserSession();s.api.chooseMeasurement(true);s.navigator.globalPrivacyControl=true;
  assert.equal(s.api.quoteMeasurement().openaiMeasurementConsent,false);
  assert.equal(s.storage.size,0);
  s.api.chooseMeasurement(true);
  assert.equal(s.api.quoteMeasurement().openaiClickReference,undefined);
  assert.equal(s.storage.size,0);
});
test('missing reference supports consented metadata; separate session starts unset; storage failure closes consent',()=>{
  const s=browserSession({url:''});s.api.chooseMeasurement(true);
  assert.equal(s.api.quoteMeasurement().openaiMeasurementConsent,true);
  assert.equal(s.api.quoteMeasurement().openaiClickReference,undefined);
  assert.equal(browserSession().api.readMeasurement().choice,'unset');
  const blocked=browserSession({blocked:true});
  blocked.api.chooseMeasurement(true);
  assert.equal(blocked.api.quoteMeasurement().openaiMeasurementConsent,false);
});
