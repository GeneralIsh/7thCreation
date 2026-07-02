import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const STUDIO_EMAIL = 'studio@7thcreation.com';

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    // Fail gracefully — form still works, just logs instead of sending
    console.error('[Quote API] RESEND_API_KEY not set. Email not sent.');
    return NextResponse.json(
      { success: false, error: 'Email service not configured.' },
      { status: 503 }
    );
  }

  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request.' }, { status: 400 });
  }

  const { name, email, company, phone, service, timeline, budget, details } = body;

  if (!name || !email || !service) {
    return NextResponse.json(
      { success: false, error: 'Missing required fields.' },
      { status: 422 }
    );
  }

  const resend = new Resend(apiKey);

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
              ${row('Name', name)}
              ${row('Email', `<a href="mailto:${email}" style="color:#d6eff8;">${email}</a>`)}
              ${company ? row('Company', company) : ''}
              ${phone ? row('Phone', `<a href="tel:${phone}" style="color:#d6eff8;">${phone}</a>`) : ''}
              ${row('Service', service)}
              ${timeline ? row('Timeline', timeline) : ''}
              ${budget ? row('Budget Range', budget) : ''}
              ${details ? row('Project Details', `<span style="white-space:pre-wrap;">${details}</span>`) : ''}
            </table>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="padding:20px 36px;border-top:1px solid #224f71;">
            <p style="margin:0;font-size:11px;color:#bcbec0;">Submitted via 7thcreation.com · ${new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles', dateStyle: 'medium', timeStyle: 'short' })} PT</p>
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
              Hi ${name.split(' ')[0]},
            </p>
            <p style="margin:0 0 20px;font-size:15px;color:#bcbec0;line-height:1.6;">
              Thanks for reaching out to 7th Creation Studio. We've received your quote request for <strong style="color:#e8e8e3;">${service}</strong> and will follow up within <strong style="color:#e8e8e3;">1–2 business days</strong>.
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
        subject: `Quote Request — ${service} · ${name}`,
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
        <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#bcbec0;">${label}</p>
      </td>
      <td style="padding:10px 0 10px 16px;border-bottom:1px solid #224f71;vertical-align:top;">
        <p style="margin:0;font-size:14px;color:#e8e8e3;line-height:1.5;">${value}</p>
      </td>
    </tr>`;
}
