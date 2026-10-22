import { randomUUID } from 'node:crypto';

function validClickReference(value: unknown): value is string {
  return typeof value === 'string' && value.length > 0 && value.length <= 4096 &&
    !/[\u0000-\u0020\u007f]/.test(value);
}

const PIXEL_ID = '3um9AyoCiPewws32s8N7AP';
const ENDPOINT = `https://bzr.openai.com/v1/events?pid=${PIXEL_ID}`;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/** A random submission token, never a customer identifier or form value. */
export function quoteEventId(value: unknown): string {
  return typeof value === 'string' && UUID.test(value) ? value : randomUUID();
}

/** Explicit allowlist: this function cannot accept contact or project fields. */
export function quoteConversionPayload(eventId: string, validateOnly = false, oppref?: unknown) {
  return {
    validate_only: validateOnly,
    events: [{
      id: quoteEventId(eventId),
      type: 'lead_created',
      timestamp_ms: Date.now(),
      action_source: 'web',
      source_url: 'https://www.7thcreation.com/quote',
      opt_out: true,
      ...(validClickReference(oppref) ? { oppref } : {}),
      data: { type: 'customer_action' },
    }],
  };
}

/** Best effort; a conversion outage must never fail a delivered quote request. */
export async function sendQuoteConversion(eventId: string, consent: unknown, oppref?: unknown): Promise<void> {
  const key = process.env.OPENAI_ADS_CONVERSION_API_KEY;
  if (consent !== true || !key) return;

  // The same event and timestamp are retained for the bounded retry.
  const body = JSON.stringify(quoteConversionPayload(eventId, false, oppref));
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
        body,
        signal: AbortSignal.timeout(2000),
        cache: 'no-store',
      });
      if (response.ok) return;
      // Never log bodies, headers, credentials, identifiers or customer data.
      if (response.status !== 429 && response.status < 500) {
        console.warn('[OpenAI Ads] Conversion rejected; status:', response.status);
        return;
      }
    } catch {
      // A transient transport failure may retry with the same deduplication ID.
    }
  }
  console.warn('[OpenAI Ads] Conversion delivery unavailable after bounded retry.');
}
