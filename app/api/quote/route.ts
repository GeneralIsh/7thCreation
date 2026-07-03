import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const STUDIO_EMAIL = 'studio@7thcreation.com';
const EMAIL_RE = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const MAX_LENGTH = {
  name: 120,
  email: 254,
  company: 160,
  phone: 40,
  service: 240,
  timeline: 80,
  budget: 80,
  details: 3000,
};

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error('[Quote API] RESEND_API_KEY not set. Email not sent.');
    return NextResponse.json(
      { success: false, error: 'Email service not configured.' },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request.' }, { status: 400 });
  }

  if (!isRecord(body)) {
    return NextResponse.json({ success: false, error: 'Invalid request.' }, { status: 400 });
  }

  const name = cleanText(body.name, MAX_LENGTH.name);
  const email = cleanText(body.email, MAX_LENGTH.email).toLowerCase();
  const company = cleanText(body.company, MAX_LENGTH.company);
  const phone = cleanText(body.phone, MAX_LENGTH.phone);
  const service = cleanText(body.service, MAX_LENGTH.service);
  const timeline = cleanText(body.timeline, MAX_LENGTH.timeline);
  const budget = cleanText(body.budget, MAX_LENGTH.budget);
  const details = cleanText(body.details, MAX_LENGTH.details);

  if (!name || !email || !EMAIL_RE.test(email) || !service || service === 'Not specified' || !details) {
    return NextResponse.json(
      { success: false, error: 'Please complete the required fields.' },
      { status: 422 }
    );
  }

  const resend = new Resend(apiKey);
  const submittedAt = new Date().toLocaleString('en-US', {
    timeZone: 'America/Los_Angeles',
    dateStyle: 'medium',
    timeStyle: 'short',
  });
  const safe = {
    name: escapeHtml(name),
    email: escapeHtml(email),
    company: escapeHtml(company),
    phone: escapeHtml(phone),
    service: escapeHtml(service),
    timeline: escapeHtml(timeline),
    budget: escapeHtml(budget),
    details: escapeHtml(details),
    firstName: escapeHtml(name.split(/\s+/)[0]),
  };
  const phoneHref = phone.replace(/[^\d+]/g, '');

  // ── Studio notification email ──────────────────────────────────────────────
  const studioHtml = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#090f14;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#090f14;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#12284d;border-radius:4px;overflow:hidden;max-width:600px;width:100%;">
        <!-- Header -->
        <tr>
          <td style="background:#224f71;padding:28px 36px;">
            <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#d6eff8;">7th Creation Studio</p>
            <h1 style="margin:8px 0 0;font-size:22px;font-weight:800;color:#e8e8e3;letter-spacing:-0.02em;">New Quote Request</h1>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:32px 36px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              ${row('Name', safe.name)}
              ${row('Email', `<a href="mailto:${safe.email}" style="color:#d6eff8;">${safe.email}</a>`)}
              ${company ? row('Company', safe.company) : ''}
              ${phone ? row('Phone', `<a href="tel:${phoneHref}" style="color:#d6eff8;">${safe.phone}</a>`) : ''}
              ${row('Service', safe.service)}
              ${timeline ? row('Timeline', safe.timeline) : ''}
              ${budget ? row('Budget Range', safe.budget) : ''}
              ${row('Project Details', `<span style="white-space:pre-wrap;">${safe.details}</span>`)}
            </table>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="padding:20px 36px;border-top:1px solid #224f71;">
            <p style="margin:0;font-size:11px;color:#bcbec0;">Submitted via 7thcreation.com · ${submittedAt} PT</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  // ── Client confirmation email ──────────────────────────────────────────────
  const clientHtml = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#090f14;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#090f14;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#12284d;border-radius:4px;overflow:hidden;max-width:600px;width:100%;">
        <!-- Header -->
        <tr>
          <td style="background:#224f71;padding:28px 36px;">
            <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#d6eff8;">7th Creation Studio</p>
            <h1 style="margin:8px 0 0;font-size:22px;font-weight:800;color:#e8e8e3;letter-spacing:-0.02em;">We received your request.</h1>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:32px 36px;">
            <p style="margin:0 0 20px;font-size:15px;color:#e8e8e3;line-height:1.6;">
              Hi ${safe.firstName},
            </p>
            <p style="margin:0 0 20px;font-size:15px;color:#bcbec0;line-height:1.6;">
              Thanks for reaching out to 7th Creation Studio. We've received your quote request for <strong style="color:#e8e8e3;">${safe.service}</strong> and will follow up within <strong style="color:#e8e8e3;">1–2 business days</strong>.
            </p>
            <p style="margin:0 0 32px;font-size:15px;color:#bcbec0;line-height:1.6;">
              If you have additional details, files, or reference images to share, reply directly to this email.
            </p>
            <p style="margin:0;font-size:12px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#d6eff8;">
              Conceptualize. Create. Complete.
            </p>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="padding:20px 36px;border-top:1px solid #224f71;">
            <p style="margin:0;font-size:11px;color:#bcbec0;">7th Creation Studio · Oakland, CA · <a href="mailto:studio@7thcreation.com" style="color:#bcbec0;">studio@7thcreation.com</a></p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  try {
    const [studioResult, clientResult] = await Promise.all([
      resend.emails.send({
        from: 'quotes@7thcreation.com',
        to: STUDIO_EMAIL,
        replyTo: email,
        subject: `Quote Request — ${cleanHeader(service)} · ${cleanHeader(name)}`,
        html: studioHtml,
      }),
      resend.emails.send({
        from: 'studio@7thcreation.com',
        to: email,
        subject: `We received your request — 7th Creation Studio`,
        html: clientHtml,
      }),
    ]);

    if (studioResult.error || clientResult.error) {
      console.error('[Quote API] Resend error:', studioResult.error || clientResult.error);
      return NextResponse.json({ success: false, error: 'Failed to send email.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[Quote API] Unexpected error:', err);
    return NextResponse.json({ success: false, error: 'Server error.' }, { status: 500 });
  }
}

function row(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #224f71;vertical-align:top;width:140px;">
        <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#bcbec0;">${escapeHtml(label)}</p>
      </td>
      <td style="padding:10px 0 10px 16px;border-bottom:1px solid #224f71;vertical-align:top;">
        <p style="margin:0;font-size:14px;color:#e8e8e3;line-height:1.5;">${value}</p>
      </td>
    </tr>`;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function cleanText(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') return '';
  return value.replace(/\0/g, '').trim().slice(0, maxLength);
}

function cleanHeader(value: string): string {
  return value.replace(/[\r\n]+/g, ' ').slice(0, 120);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
