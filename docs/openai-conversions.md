# OpenAI Ads quote conversions

This integration uses Conversions API only. Do not install the browser SDK: the
configured pixel enables automatic advanced matching and may scan form inputs.

Account: 7th Creation Studio. Pixel: `3um9AyoCiPewws32s8N7AP`.
Ads Manager conversion: **Successful quote request**, base event `lead_created`.

## Behavior and privacy

- The quote form offers an optional, unchecked measurement consent checkbox.
- No OpenAI event is sent for visits, invalid requests, declined consent, or
  failed email delivery. Global Privacy Control suppresses delivery.
- After both quote notification emails succeed, Next `after()` sends the event
  without delaying the quote response. Analytics failure cannot fail the quote.
- A random per-submission UUID is reused across retries. CAPI transport makes at
  most two attempts with identical event IDs and timestamps; permanent 4xx errors
  stop immediately (429 may retry). No durable delivery queue is provided.
- The allowlist contains only a random event ID, event time, `lead_created`, a
  constant quote URL, web action source, personalization opt-out, and the empty
  `customer_action` data shape. Never add a `user` object, contact fields, hashes,
  form content, client IP/user agent, click/browser references, or arbitrary URLs.
- No browser pixel, cookies, or new browser storage are introduced. Existing
  Google Ads tracking remains unchanged. Without click or customer matching
  identifiers, ingestion can be verified but attribution is not guaranteed.

## Credential and validation

Set `OPENAI_ADS_CONVERSION_API_KEY` as a **Secret**, **Production only**, on Vercel
project `general-ishmael/7th-creation`. Never prefix with `NEXT_PUBLIC_`, log its
value, commit it, or store it in the browser. Rotate in OpenAI Ads Manager's
Conversion keys panel, then update the Vercel secret and redeploy.

`npm run test:conversions` uses mocked transport and email delivery only.
`npm run build` compiles Next, then validates the exact allowlisted payload from
Vercel's build environment if the server credential exists. Validation always
sets `validate_only:true`, uses no customer data, and records no synthetic lead.
Production builds fail if the credential is absent or validation is rejected.
Preview/local builds without a credential skip the external validation.

Do not test production by submitting a fictitious customer quote. Verify live
form consent and no browser SDK, check the production build validation log,
and inspect real consented events in Ads Manager as genuine leads occur.

Official references:
- https://developers.openai.com/ads/conversions-api
- https://developers.openai.com/ads/api-reference/conversion-setup
