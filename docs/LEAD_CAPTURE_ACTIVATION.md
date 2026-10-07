# Lead-Capture Activation — 7th Creation Studio

**Status:** production blocker identified on 2026-10-07.

The live website at `https://www.7thcreation.com/api/quote` returned:

```text
HTTP 503
{"success":false,"error":"Email service not configured."}
```

Until this is corrected and tested, the website must **not** be treated as a working job-acquisition channel. The form is visually complete but does not deliver inquiries to the studio.

---

## Required production configuration

1. **Resend account/domain**
   - Verify the domain `7thcreation.com` in Resend.
   - Confirm that `quotes@7thcreation.com` and `studio@7thcreation.com` are authorized sending identities.
   - Ensure `studio@7thcreation.com` can receive the internal notification email.

2. **Vercel environment variable**
   - Add `RESEND_API_KEY` to the Vercel project that deploys `www.7thcreation.com`.
   - Apply it to **Production** (and Preview if preview tests are required).
   - Redeploy after saving the variable.

3. **Functional test**
   - Submit a real internal test from `/quote` with a studio-controlled email address.
   - Confirm both outcomes:
     - the studio receives **New Quote Request** at `studio@7thcreation.com`, with the inquiry sender as Reply-To;
     - the test address receives **We received your request — 7th Creation Studio**.
   - Confirm the UI shows its success state and no technical error.

4. **Operational test**
   - Log the test inquiry in the revenue pipeline.
   - Confirm a named owner, next action, and due date exist.
   - Run one full quote workflow: qualification → QuickBooks estimate → approved scope → deposit/PO → production release.

---

## Recommended resilience improvements

These are code improvements after the production email path is live:

| Improvement | Why it matters |
|---|---|
| Buyer-friendly fallback for an email-service outage | A prospect should see a direct contact route, not “Email service not configured.” |
| Honeypot and basic rate limiting | Reduces form spam before the inbox becomes a bottleneck. |
| Lead source / UTM capture | Enables attribution: Google, LinkedIn, referral, agency partner, etc. |
| Server-side lead-store or CRM handoff | Avoids depending on email as the only source of an inquiry record. |
| File upload route or clearly stated file-sharing process | Large-format jobs frequently need artwork, site photos, and reference assets. |

---

## Acceptance criteria

The quote funnel is **ready** only when all are true:

- [ ] The production endpoint no longer returns HTTP 503.
- [ ] A real test sends an internal quote notification to the studio inbox.
- [ ] The client confirmation email is delivered from a verified `7thcreation.com` sender.
- [ ] A receiving owner monitors the inbox during published business hours.
- [ ] All incoming inquiries are logged in the revenue pipeline the same day.
- [ ] Every active opportunity has a stage, owner, next action, and due date.

**Do not begin paid lead generation before these conditions are met.**
