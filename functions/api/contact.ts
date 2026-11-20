interface Env {
  RESEND_API_KEY?: string;
  TURNSTILE_SECRET_KEY?: string;
  CONTACT_EMAIL?: string;
}

interface CloudflarePagesContext {
  request: Request;
  env: Env;
  params: Record<string, string>;
  waitUntil: (promise: Promise<any>) => void;
  next: () => Promise<Response>;
  data: Record<string, unknown>;
}

export async function onRequestPost(context: CloudflarePagesContext): Promise<Response> {
  const { request, env } = context;

  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
    'Content-Type': 'application/json',
  };

  try {
    let name = '';
    let phone = '';
    let email = '';
    let need = '';
    let message = '';
    let consent = false;
    let honeypot = '';
    let turnstileToken = '';

    const contentType = request.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      const body = await request.json().catch(() => ({}));
      name = body.name || '';
      phone = body.phone || '';
      email = body.email || '';
      need = body.need || '';
      message = body.message || '';
      consent = Boolean(body.consent);
      honeypot = body.b_url || '';
      turnstileToken = body['cf-turnstile-response'] || '';
    } else {
      const formData = await request.formData();
      name = (formData.get('name') as string) || '';
      phone = (formData.get('phone') as string) || '';
      email = (formData.get('email') as string) || '';
      need = (formData.get('need') as string) || '';
      message = (formData.get('message') as string) || '';
      consent = Boolean(formData.get('consent'));
      honeypot = (formData.get('b_url') as string) || '';
      turnstileToken = (formData.get('cf-turnstile-response') as string) || '';
    }

    // 1. Anti-spam Honeypot Check (Silently drop bots)
    if (honeypot) {
      console.warn('Bot detected via honeypot field');
      return new Response(
        JSON.stringify({ success: true, message: 'Enquiry received successfully.' }),
        { status: 200, headers: corsHeaders }
      );
    }

    // 2. Validate mandatory fields (Max 6 fields per Section 10)
    if (!name.trim() || !phone.trim() || !need.trim() || !consent) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Please complete all required fields (Name, Phone/WhatsApp, Need, and Consent).',
        }),
        { status: 400, headers: corsHeaders }
      );
    }

    // 3. Verify Cloudflare Turnstile token if configured
    if (env.TURNSTILE_SECRET_KEY && turnstileToken) {
      const clientIp = request.headers.get('CF-Connecting-IP') || '';
      const turnstileFormData = new FormData();
      turnstileFormData.append('secret', env.TURNSTILE_SECRET_KEY);
      turnstileFormData.append('response', turnstileToken);
      if (clientIp) {
        turnstileFormData.append('remoteip', clientIp);
      }

      const turnstileRes = await fetch(
        'https://challenges.cloudflare.com/turnstile/v0/siteverify',
        {
          method: 'POST',
          body: turnstileFormData,
        }
      );

      const turnstileResult = (await turnstileRes.json().catch(() => ({}))) as any;
      if (!turnstileResult.success) {
        return new Response(
          JSON.stringify({
            success: false,
            message: 'Security verification failed. Please refresh and try again.',
          }),
          { status: 403, headers: corsHeaders }
        );
      }
    }

    // 4. Send Email via Resend API to contact@gmdesign.in
    const recipientEmail = env.CONTACT_EMAIL || 'contact@gmdesign.in';
    const resendApiKey = env.RESEND_API_KEY;

    if (resendApiKey) {
      const emailHtml = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #E2E8F0; border-radius: 8px;">
          <h2 style="color: #0F172A; margin-top: 0;">New Enquiry via gmdesign.in</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr>
              <td style="padding: 8px 0; color: #64748B; width: 140px; font-weight: bold;">Name:</td>
              <td style="padding: 8px 0; color: #0F172A;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748B; font-weight: bold;">WhatsApp / Phone:</td>
              <td style="padding: 8px 0; color: #0F172A;"><a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}">${escapeHtml(phone)}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748B; font-weight: bold;">Email:</td>
              <td style="padding: 8px 0; color: #0F172A;">${email ? `<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>` : 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748B; font-weight: bold;">Requirement:</td>
              <td style="padding: 8px 0; color: #0F172A; font-weight: bold;">${escapeHtml(need)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748B; font-weight: bold; vertical-align: top;">Message:</td>
              <td style="padding: 8px 0; color: #334155;">${message ? escapeHtml(message).replace(/\n/g, '<br/>') : 'None'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748B; font-weight: bold;">Timestamp:</td>
              <td style="padding: 8px 0; color: #64748B;">${new Date().toISOString()}</td>
            </tr>
          </table>
          <div style="margin-top: 25px; padding-top: 15px; border-top: 1px solid #E2E8F0; font-size: 12px; color: #64748B;">
            Sent from GM Design Cloudflare Contact Function.
          </div>
        </div>
      `;

      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'GM Design Website <onboarding@resend.dev>',
          to: [recipientEmail],
          reply_to: email || undefined,
          subject: `[Enquiry] ${name} - ${need}`,
          html: emailHtml,
        }),
      });

      if (!resendRes.ok) {
        const errData = await resendRes.json().catch(() => ({}));
        console.error('Resend API error:', errData);
      }
    } else {
      console.log('RESEND_API_KEY not configured. Submission logged locally:', {
        name,
        phone,
        email,
        need,
        message,
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Thank you! We have received your message and will reply within 1 working day.',
      }),
      { status: 200, headers: corsHeaders }
    );
  } catch (error: any) {
    console.error('Contact function error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: 'An error occurred while submitting your message. Please message us on WhatsApp.',
      }),
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function onRequestOptions(): Promise<Response> {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Accept',
    },
  });
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
