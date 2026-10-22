const { test, afterEach } = require('node:test');
const assert = require('node:assert/strict');
const { randomUUID } = require('node:crypto');
const loadHelper = require('../scripts/load-conversion-helper.cjs');
const { quoteEventId, quoteConversionPayload, sendQuoteConversion } = loadHelper();
const originalFetch = global.fetch;
const originalKey = process.env.OPENAI_ADS_CONVERSION_API_KEY;
afterEach(() => {
  global.fetch = originalFetch;
  if (originalKey === undefined) delete process.env.OPENAI_ADS_CONVERSION_API_KEY;
  else process.env.OPENAI_ADS_CONVERSION_API_KEY = originalKey;
});

test('strict payload allowlist excludes customer values and rejects nonrandom IDs', () => {
  const id = randomUUID();
  const payload = quoteConversionPayload(id, true);
  assert.equal(payload.validate_only, true);
  const e = payload.events[0];
  assert.deepEqual(Object.keys(e).sort(), ['action_source','data','id','opt_out','source_url','timestamp_ms','type'].sort());
  assert.deepEqual(e.data, { type: 'customer_action' });
  assert.equal(e.id, id);
  assert.equal(e.type, 'lead_created');
  assert.equal(e.source_url, 'https://www.7thcreation.com/quote');
  assert.equal(e.opt_out, true);
  assert.notEqual(quoteEventId('customer@example.com'), 'customer@example.com');
});

test('no credential or denied/nonboolean consent sends nothing', async () => {
  let calls = 0;
  global.fetch = async () => { calls++; return { ok: true }; };
  delete process.env.OPENAI_ADS_CONVERSION_API_KEY;
  await sendQuoteConversion(randomUUID(), true);
  process.env.OPENAI_ADS_CONVERSION_API_KEY = 'test-only-placeholder';
  for (const consent of [false, undefined, 'true', 1]) await sendQuoteConversion(randomUUID(), consent);
  assert.equal(calls, 0);
});

test('transient retry retains identical ID, timestamp and payload without data leakage', async () => {
  process.env.OPENAI_ADS_CONVERSION_API_KEY = 'test-only-placeholder';
  const calls = [];
  global.fetch = async (url, options) => {
    calls.push({ url, options });
    return { ok: calls.length > 1, status: calls.length > 1 ? 200 : 503 };
  };
  await sendQuoteConversion(randomUUID(), true);
  assert.equal(calls.length, 2);
  assert.equal(calls[0].options.body, calls[1].options.body);
  assert.equal(JSON.parse(calls[0].options.body).validate_only, false);
  assert.equal(calls[0].url, 'https://bzr.openai.com/v1/events?pid=3um9AyoCiPewws32s8N7AP');
});

test('network outages and permanent rejection are contained', async () => {
  process.env.OPENAI_ADS_CONVERSION_API_KEY = 'test-only-placeholder';
  let calls = 0;
  global.fetch = async () => { calls++; throw new Error('network failure'); };
  await assert.doesNotReject(sendQuoteConversion(randomUUID(), true));
  assert.equal(calls, 2);
  calls = 0;
  global.fetch = async () => { calls++; return { ok: false, status: 400 }; };
  await assert.doesNotReject(sendQuoteConversion(randomUUID(), true));
  assert.equal(calls, 1);
});

// Exercise the real API handler with mocked email transport and Next lifecycle.
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
function routeHarness({ emailError = false, scheduleError = false } = {}) {
  const scheduled = [];
  const emitted = [];
  const source = fs.readFileSync(require.resolve('../app/api/quote/route.ts'), 'utf8');
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const exports = {};
  vm.runInNewContext(compiled, {
    exports, process: { env: { RESEND_API_KEY: 'test-only-placeholder' } }, console: { error(){}, warn(){} },
    require(name) {
      if (name === 'next/server') return {
        NextResponse: { json: (body, init) => ({ body, status: init?.status || 200 }) },
        after: cb => { if (scheduleError) throw new Error('scheduler unavailable'); scheduled.push(cb); },
      };
      if (name === 'resend') return { Resend: class { emails = { send: async () => emailError ? { error: { message: 'failure' } } : { data: { id: 'mock' } } }; } };
      if (name === '@/lib/openai-conversions') return { quoteEventId, sendQuoteConversion: async (...args) => emitted.push(args) };
      throw new Error(`Unexpected module ${name}`);
    },
  });
  return { POST: exports.POST, scheduled, emitted };
}
const validQuote = { name:'Synthetic local test', email:'test@example.com', service:'Mock service', details:'Mock project; no network calls' };
test('only confirmed email success with consent schedules a conversion', async () => {
  for (const emailError of [false, true]) for (const consent of [false, true]) {
    const h = routeHarness({ emailError });
    const id = randomUUID();
    const result = await h.POST({ json: async () => ({ ...validQuote, conversionEventId:id, openaiMeasurementConsent:consent }) });
    assert.equal(result.status, emailError ? 500 : 200);
    assert.equal(h.scheduled.length, !emailError && consent ? 1 : 0);
    for (const cb of h.scheduled) await cb();
    if (!emailError && consent) assert.deepEqual(h.emitted, [[id, true, undefined]]);
  }
});
test('invalid submissions never schedule and scheduler failures do not fail delivered quotes', async () => {
  const invalid = routeHarness();
  assert.equal((await invalid.POST({ json: async () => ({}) })).status, 422);
  assert.equal(invalid.scheduled.length, 0);
  const h = routeHarness({ scheduleError:true });
  const result = await h.POST({ json: async () => ({ ...validQuote, openaiMeasurementConsent:true }) });
  assert.equal(result.status, 200);
  assert.equal(result.body.success, true);
});

test('server respects Global Privacy Control even when the posted consent is true', async () => {
  const h = routeHarness();
  const result = await h.POST({
    headers: new Headers({ 'sec-gpc':'1' }),
    json: async () => ({ ...validQuote, openaiMeasurementConsent:true }),
  });
  assert.equal(result.status, 200);
  assert.equal(h.scheduled.length, 0);
});


test('click reference is event-level, preserved verbatim and identical across retries', async () => {
  process.env.OPENAI_ADS_CONVERSION_API_KEY = 'test-only-placeholder';
  const reference = 'opaque_Ref+Case/=Token';
  const id = randomUUID();
  const payload = quoteConversionPayload(id, true, reference);
  assert.equal(payload.validate_only, true);
  assert.equal(payload.events[0].oppref, reference);
  assert.equal(payload.events[0].user, undefined);
  const calls=[];
  global.fetch = async (url, options) => { calls.push(JSON.parse(options.body)); return {ok:calls.length>1,status:503}; };
  await sendQuoteConversion(id, true, reference);
  assert.equal(calls.length, 2);
  assert.deepEqual(calls[0], calls[1]);
  assert.equal(calls[0].events[0].oppref, reference);
  assert.equal(calls[0].events[0].user, undefined);
  for (const bad of ['', ' with-space', 'line\nfeed', 'x'.repeat(4097), 12]) {
    assert.equal(quoteConversionPayload(id,true,bad).events[0].oppref, undefined);
  }
});

test('real handler forwards only consented reference and deduplicates repeated submission IDs', async () => {
  const h = routeHarness();
  const id=randomUUID();
  for (let i=0;i<2;i++) await h.POST({json:async()=>({...validQuote,conversionEventId:id,openaiMeasurementConsent:true,openaiClickReference:'opaque-original'})});
  for (const cb of h.scheduled) await cb();
  assert.deepEqual(h.emitted, [[id,true,'opaque-original'],[id,true,'opaque-original']]);
  const denied = routeHarness();
  await denied.POST({json:async()=>({...validQuote,openaiMeasurementConsent:false,openaiClickReference:'must-not-send'})});
  assert.equal(denied.scheduled.length,0);
});

test('deployment validator sends only validate_only requests, with and without documented reference', async () => {
  const requests=[];
  const script=fs.readFileSync(require.resolve('../scripts/validate-openai-conversion.cjs'),'utf8');
  const pending=vm.runInNewContext(script, {
    require(name) {
      if(name==='node:crypto') return {randomUUID};
      if(name==='./load-conversion-helper.cjs') return loadHelper;
      throw Error('unexpected import');
    },
    process:{env:{OPENAI_ADS_CONVERSION_API_KEY:'test-only-placeholder'}},
    console:{log(){},error(){}}, AbortSignal,
    fetch:async(url,options)=>{requests.push(JSON.parse(options.body));return {ok:true,status:200};},
  });
  await pending;
  assert.equal(requests.length,2);
  for(const p of requests){assert.equal(p.validate_only,true);assert.equal(p.events[0].user,undefined);}
  assert.equal(requests[0].events[0].oppref,undefined);
  assert.equal(requests[1].events[0].oppref,'oppref_abc');
});
