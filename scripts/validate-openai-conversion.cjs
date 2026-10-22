// Runs in Vercel's build environment, using the existing server-only secret.
// All synthetic requests are validation-only: never save an artificial lead.
const { randomUUID } = require('node:crypto');
const { quoteConversionPayload } = require('./load-conversion-helper.cjs')();
async function main() {
  const key = process.env.OPENAI_ADS_CONVERSION_API_KEY;
  if (!key) {
    if (process.env.VERCEL_ENV === 'production') throw new Error('Production conversion secret is missing.');
    console.log('[OpenAI Ads validation] Skipped: no server credential in this environment.');
    return;
  }
  // The second case uses the official documentation's synthetic example only
  // in validation mode. It is never stored as a browser or production reference.
  for (const reference of [undefined, 'oppref_abc']) {
    const result = await fetch('https://bzr.openai.com/v1/events?pid=3um9AyoCiPewws32s8N7AP', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(quoteConversionPayload(randomUUID(), true, reference)),
      signal: AbortSignal.timeout(10000),
    });
    // Never print the response body, request headers or credential.
    if (!result.ok) {
      console.error(`[OpenAI Ads validation] API rejected validate_only request: HTTP ${result.status}.`);
      throw new Error('API rejected validation.');
    }
    console.log(`[OpenAI Ads validation] ${reference ? 'with click reference' : 'without click reference'}: validate_only=true accepted: HTTP ${result.status}; no lead recorded.`);
  }
}
main().catch((error) => {
  const code = error?.cause?.code;
  if (typeof code === 'string' && /^[A-Z0-9_]{1,40}$/.test(code)) {
    console.error(`[OpenAI Ads validation] Transport error code: ${code}.`);
  }
  console.error('[OpenAI Ads validation] Validation failed; check conversion credential/configuration. No secret logged.');
  process.exitCode = 1;
});
