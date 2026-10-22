# OpenAI Ads quote conversions

This integration uses Conversions API only. Do not install the browser SDK: the
configured pixel enables automatic advanced matching and may scan form inputs.

Account: 7th Creation Studio. Pixel: `3um9AyoCiPewws32s8N7AP`.
Ads Manager conversion: **Successful quote request**, base event `lead_created`.

## Behavior and privacy

- Every landing page offers optional session measurement consent, explaining
  ad-click matching. Reject/withdraw is available at the same prominence. The
  preferences control remains available on every page; the quote checkbox shares
  the same session choice.
- Only after opt-in, capture the URL's `oppref` into first-party sessionStorage.
  Retain the decoded original string verbatim through internal navigation. No
  cookies, localStorage, or 30-day retention. Withdrawal removes the stored
  reference; GPC clears it and prevents capture/use. If storage is blocked, fail
  closed. A new tab session starts without consent (normal browser sessionStorage
  restoration/copy behavior applies).
- Visitors who navigate away from their landing URL before granting consent may
  lose that click reference; it is deliberately not retained before opt-in.
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
  form content, client IP/user agent, browser references, or arbitrary URLs.
  The only additional identifier is the approved, consented event-level `oppref`.
  It is omitted when absent/invalid, and never placed inside `user`.
- No browser pixel, cookies, or persistent browser storage are introduced.
  Existing Google Ads tracking remains unchanged. Click attribution is supported
  when a genuine valid OpenAI reference accompanies a consented lead; actual
  attribution remains unverified until such a real lead occurs.

## Credential and validation

Set `OPENAI_ADS_CONVERSION_API_KEY` as a **Secret**, **Production only**, on Vercel
project `general-ishmael/7th-creation`. Never prefix with `NEXT_PUBLIC_`, log its
value, commit it, or store it in the browser. Rotate in OpenAI Ads Manager's
Conversion keys panel, then update the Vercel secret and redeploy.

`npm run test:conversions` uses mocked transport and email delivery only.
`npm run build` compiles Next, then validates the exact allowlisted payload from
Vercel's build environment if the server credential exists. Validation always
sets `validate_only:true`, uses no customer data, and records no synthetic lead.
It checks payloads both without a reference and with the official docs' synthetic
`oppref_abc` fixture. That fixture is never used in runtime delivery or storage.
Production builds fail if the credential is absent or validation is rejected.
Preview/local builds without a credential skip the external validation.

Do not test production by submitting a fictitious customer quote. Verify live
form consent and no browser SDK, check the production build validation log,
and inspect real consented events in Ads Manager as genuine leads occur.

Official references:
- https://developers.openai.com/ads/conversions-api
- https://developers.openai.com/ads/api-reference/conversion-setup

Click matching reference: https://developers.openai.com/ads/conversions-api#event-structure
