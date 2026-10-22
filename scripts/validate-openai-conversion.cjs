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
  const result = await fetch('https://bzr.openai.com/v1/events?pid=3um9AyoCiPewws32s8N7AP', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(quoteConversionPayload(randomUUID(), true)),
    signal: AbortSignal.timeout(10000),
  });
  // Never print the response body, request headers or credential.
  if (!result.ok) throw new Error(`Validation failed with HTTP ${result.status}.`);
  console.log(`[OpenAI Ads validation] validate_only=true accepted: HTTP ${result.status}; no lead recorded.`);
}
main().catch(() => {
  console.error('[OpenAI Ads validation] Validation failed; check conversion credential/configuration. No secret logged.');
  process.exitCode = 1;
});
