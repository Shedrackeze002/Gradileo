/**
 * send-emails: delivers new-assignment and deadline-reminder notifications by email
 * for classes that turned on "email reminders". Called every 10 minutes by pg_cron
 * (public.trigger_email_delivery), which sends the Vault secret educore_cron_secret.
 *
 * Settings come from Vault through public.email_settings(), which the *Set up sending email*
 * workflow fills in (docs/SETUP.md 3.3): the Resend key, the sender
 * (e.g. "Gradileo <no-reply@gradileo.com>") and the reply-to address. The Edge Function secrets
 * RESEND_API_KEY, EMAIL_FROM and EMAIL_REPLY_TO are used only where Vault has no value.
 * APP_URL (e.g. https://gradileo.com) is an Edge Function secret.
 */
import { HttpError, serve } from '../_shared/http.ts';
import { adminClient } from '../_shared/db.ts';

const DOMAIN = Deno.env.get('STUDENT_EMAIL_DOMAIN') ?? 'students.educore.local';

interface EmailSettings {
  resend_api_key: string | null;
  email_from: string | null;
  email_reply_to: string | null;
}

// Says why the email came, which helps people (and spam filters) trust it.
const FOOTER =
  'You get this email because your teacher turned on email reminders for this class in Gradileo. ' +
  'A student who added this address can remove it in Settings.';

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

serve(async (req) => {
  const token = (req.headers.get('Authorization') ?? '').replace(/^Bearer\s+/i, '').trim();
  if (!token) throw new HttpError(401, 'Unauthorized');
  const db = adminClient();
  // Null unless the token is the shared secret in Vault.
  const { data: settings, error: settingsError } = await db.rpc('email_settings', { cron_token: token });
  if (settingsError) throw new Error(settingsError.message);
  if (!settings) throw new HttpError(401, 'Unauthorized');
  const vault = settings as EmailSettings;
  const apiKey = vault.resend_api_key || Deno.env.get('RESEND_API_KEY');
  const from = vault.email_from || Deno.env.get('EMAIL_FROM');
  const replyTo = vault.email_reply_to || Deno.env.get('EMAIL_REPLY_TO');
  if (!apiKey || !from) return { sent: 0, skipped: 'No Resend key or sender yet: run the Set up sending email workflow' };
  const appUrl = (Deno.env.get('APP_URL') ?? '').replace(/\/$/, '');

  const since = new Date(Date.now() - 86_400_000).toISOString();
  const { data, error } = await db
    .from('notifications')
    .select('id, user_id, title, body, link, profiles!inner(email, full_name), assignments(class_id, classes(name, settings))')
    .is('emailed_at', null)
    .in('kind', ['assignment', 'reminder'])
    .gte('created_at', since)
    .order('created_at')
    .limit(200);
  if (error) throw new Error(error.message);

  // Students without an email address of their own may add and confirm one in Settings
  // (notify-email); it takes the place of their account's address.
  const userIds = [...new Set(((data ?? []) as Array<{ user_id: string }>).map((n) => n.user_id))];
  const added = new Map<string, string>();
  if (userIds.length) {
    const { data: rows, error: e } = await db.from('notification_emails').select('user_id, email').in('user_id', userIds).not('verified_at', 'is', null);
    if (e) throw new Error(e.message);
    for (const r of rows ?? []) if (r.email) added.set(r.user_id, r.email);
  }

  let sent = 0;
  const processed: string[] = [];
  // deno-lint-ignore no-explicit-any
  for (const n of (data ?? []) as any[]) {
    processed.push(n.id);
    const profile = Array.isArray(n.profiles) ? n.profiles[0] : n.profiles;
    const assignment = Array.isArray(n.assignments) ? n.assignments[0] : n.assignments;
    const cls = assignment ? (Array.isArray(assignment.classes) ? assignment.classes[0] : assignment.classes) : null;
    const own: string = profile?.email ?? '';
    const email = added.get(n.user_id) ?? (own.endsWith(`@${DOMAIN}`) ? '' : own);
    if (!cls?.settings?.emailReminders || !email) continue;
    const href = appUrl && n.link ? `${appUrl}${n.link}` : appUrl;
    const html = `<div style="font-family:system-ui,sans-serif;max-width:520px;margin:auto;padding:24px;color:#14161f">
      <div style="font-size:12px;font-weight:700;color:#6a43e3;letter-spacing:.06em;text-transform:uppercase">Gradileo · ${esc(cls.name ?? '')}</div>
      <h2 style="margin:8px 0 6px;font-size:20px">${esc(n.title)}</h2>
      <p style="margin:0 0 18px;color:#4b5060;line-height:1.5">${esc(n.body ?? '')}</p>
      ${href ? `<a href="${esc(href)}" style="display:inline-block;background:#6a43e3;color:#fff;text-decoration:none;padding:10px 18px;border-radius:10px;font-weight:600">Open in Gradileo</a>` : ''}
      <p style="margin:24px 0 0;font-size:12px;color:#8a8fa0;line-height:1.5">${esc(FOOTER)}</p>
    </div>`;
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [email],
        ...(replyTo ? { reply_to: replyTo } : {}),
        subject: n.title,
        html,
        text: `${n.title}\n\n${n.body ?? ''}${href ? `\n\n${href}` : ''}\n\n${FOOTER}`,
      }),
    });
    if (res.ok) sent++;
    else console.error('email failed', res.status, await res.text());
  }
  if (processed.length) await db.from('notifications').update({ emailed_at: new Date().toISOString() }).in('id', processed);
  return { sent, processed: processed.length };
});
