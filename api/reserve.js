import nodemailer from 'nodemailer';

const allowCors = (res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
};

// Reservation details email to hotel – clean, scannable layout
function reservationEmailToHotel(data) {
  const s = (v) => (v != null && String(v).trim() !== '' ? String(v) : '–');
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;font-family:'Segoe UI',system-ui,sans-serif;background:#f5efe6;color:#2c3e50;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5efe6;padding:24px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(44,62,80,0.12);">
        <tr><td style="background:#2c3e50;color:#f5efe6;padding:20px 24px;">
          <h1 style="margin:0;font-size:20px;font-weight:600;">New Reservation Request</h1>
          <p style="margin:6px 0 0;font-size:14px;opacity:0.9;">Samar Annapurna Hotel</p>
        </td></tr>
        <tr><td style="padding:24px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:15px;line-height:1.6;">
            <tr><td style="padding:10px 0;border-bottom:1px solid #e8dcc4;"><strong style="color:#2c3e50;">Guest name</strong></td><td style="padding:10px 0;border-bottom:1px solid #e8dcc4;text-align:right;">${s(data.name)}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #e8dcc4;"><strong style="color:#2c3e50;">Email</strong></td><td style="padding:10px 0;border-bottom:1px solid #e8dcc4;text-align:right;"><a href="mailto:${encodeURIComponent(data.email || '')}" style="color:#c65d3b;">${s(data.email)}</a></td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #e8dcc4;"><strong style="color:#2c3e50;">Phone / WhatsApp</strong></td><td style="padding:10px 0;border-bottom:1px solid #e8dcc4;text-align:right;"><a href="tel:${(data.phone || '').replace(/\D/g,'')}" style="color:#c65d3b;">${s(data.phone)}</a></td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #e8dcc4;"><strong style="color:#2c3e50;">Check-in</strong></td><td style="padding:10px 0;border-bottom:1px solid #e8dcc4;text-align:right;">${s(data.checkIn)}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #e8dcc4;"><strong style="color:#2c3e50;">Check-out</strong></td><td style="padding:10px 0;border-bottom:1px solid #e8dcc4;text-align:right;">${s(data.checkOut)}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #e8dcc4;"><strong style="color:#2c3e50;">Adults</strong></td><td style="padding:10px 0;border-bottom:1px solid #e8dcc4;text-align:right;">${s(data.adults)}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #e8dcc4;"><strong style="color:#2c3e50;">Children</strong></td><td style="padding:10px 0;border-bottom:1px solid #e8dcc4;text-align:right;">${s(data.children)}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #e8dcc4;"><strong style="color:#2c3e50;">Room type</strong></td><td style="padding:10px 0;border-bottom:1px solid #e8dcc4;text-align:right;">${s(data.roomType)}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #e8dcc4;"><strong style="color:#2c3e50;">Rooms</strong></td><td style="padding:10px 0;border-bottom:1px solid #e8dcc4;text-align:right;">${s(data.rooms)}</td></tr>
            <tr><td style="padding:10px 0;"><strong style="color:#2c3e50;">Special requests</strong></td><td style="padding:10px 0;text-align:right;">${s(data.specialRequests)}</td></tr>
          </table>
        </td></tr>
        <tr><td style="background:#e8dcc4;padding:12px 24px;font-size:13px;color:#2c3e50;">
          Reply to the guest at the email above, or call/WhatsApp to confirm.
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// Thank-you email to client – welcoming, clear next steps
function thankYouEmailToClient(data) {
  const name = (data.name || '').trim() ? data.name.split(/\s+/)[0] : 'Guest';
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;font-family:'Segoe UI',system-ui,sans-serif;background:#f5efe6;color:#2c3e50;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5efe6;padding:24px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(44,62,80,0.12);">
        <tr><td style="background:#2c3e50;color:#f5efe6;padding:24px;">
          <h1 style="margin:0;font-size:22px;font-weight:600;">Thank you, ${name}</h1>
          <p style="margin:8px 0 0;font-size:15px;opacity:0.9;">We’ve received your reservation request.</p>
        </td></tr>
        <tr><td style="padding:28px 24px;">
          <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#2c3e50;">
            Hello ${name},
          </p>
          <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#2c3e50;">
            Thank you for choosing <strong>Samar Annapurna Hotel</strong>. We’ve received your reservation details and will get back to you shortly to confirm availability and next steps.
          </p>
          <div style="background:#f5efe6;border-radius:8px;padding:16px;margin:20px 0;">
            <p style="margin:0 0 8px;font-size:13px;color:#2c3e50;opacity:0.85;">What happens next?</p>
            <ul style="margin:0;padding-left:20px;font-size:15px;line-height:1.7;color:#2c3e50;">
              <li>We’ll review your request and confirm by email or phone/WhatsApp.</li>
              <li>Feel free to reach us at <a href="mailto:samarannapurnahotel@gmail.com" style="color:#c65d3b;">samarannapurnahotel@gmail.com</a> or <a href="tel:+9779841345621" style="color:#c65d3b;">+977-9841345621</a> with any questions.</li>
            </ul>
          </div>
          <p style="margin:0;font-size:16px;line-height:1.6;color:#2c3e50;">
            We look forward to welcoming you to Mustang.
          </p>
        </td></tr>
        <tr><td style="background:#2c3e50;color:#f5efe6;padding:16px 24px;font-size:14px;">
          <strong>Samar Annapurna Hotel</strong> · Family-run lodge in Upper Mustang, Nepal<br>
          <a href="mailto:samarannapurnahotel@gmail.com" style="color:#e8dcc4;">samarannapurnahotel@gmail.com</a> · +977-9841345621
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function stripHtml(html) {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

export default async function handler(req, res) {
  allowCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const data = {
      name: body.name,
      email: body.email,
      phone: body.phone,
      checkIn: body.checkIn,
      checkOut: body.checkOut,
      adults: body.adults,
      children: body.children,
      roomType: body.roomType,
      rooms: body.rooms,
      specialRequests: body.specialRequests,
    };

    const host = process.env.SMTP_HOST || 'smtp.gmail.com';
    const port = Number(process.env.SMTP_PORT) || 587;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const to = process.env.RECEIVER_EMAIL;

    if (!user || !pass || !to) {
      console.error('Missing SMTP_USER, SMTP_PASS, or RECEIVER_EMAIL');
      return res.status(500).json({ success: false, error: 'Email not configured' });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    // 1) Email to hotel – reservation details
    const reservationHtml = reservationEmailToHotel(data);
    await transporter.sendMail({
      from: user,
      to,
      subject: 'New Reservation Request – Samar Annapurna Hotel',
      html: reservationHtml,
      text: stripHtml(reservationHtml),
    });

    // 2) Thank-you email to client (if valid address)
    if (data.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.email).trim())) {
      const thankYouHtml = thankYouEmailToClient(data);
      await transporter.sendMail({
        from: user,
        to: data.email.trim(),
        subject: 'We received your reservation – Samar Annapurna Hotel',
        html: thankYouHtml,
        text: stripHtml(thankYouHtml),
      });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Reserve API error:', err);
    return res.status(500).json({ success: false, error: err.message || 'Failed to send' });
  }
}
