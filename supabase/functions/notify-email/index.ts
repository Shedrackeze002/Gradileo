/**
 * notify-email: lets a student whose account has no email address (a username made by the teacher,
 * or a name-only class-link account once a teacher has let them in) add a parent's or guardian's
 * email, so class reminders reach it. The code goes to the parent, who agrees by giving it to the
 * student; the address is used only once the code is typed back, so nobody can make Gradileo email
 * an address whose owner did not agree.
 *
 * Body: { action: 'get' }
 *       { action: 'request', email }   sends a code (at most 5 an hour; each lasts 15 minutes)
 *       { action: 'confirm', code }    5 tries per code
 *       { action: 'remove' }
 * Answers { email, pendingEmail } (the confirmed address, and one waiting for its code).
 *
 * Sends through Resend with the settings the *Set up sending email* workflow stored in Vault
 * (public.email_sender()).
 */
import { HttpError, readJson, serve } from '../_shared/http.ts';
import { adminClient, type Db, getCaller, str } from '../_shared/db.ts';

const DOMAIN = Deno.env.get('STUDENT_EMAIL_DOMAIN') ?? 'students.educore.local';
const CODES_PER_HOUR = 5;
const TRIES_PER_CODE = 5;
const CODE_MINUTES = 15;
const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

interface Row {
  user_id: string;
  email: string | null;
  verified_at: string | null;
  pending_email: string | null;
  code_hash: string | null;
  code_expires_at: string | null;
  attempts: number;
  codes_sent: number;
  window_started_at: string;
}

async function sha256(text: string): Promise<string> {
  const bytes = new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text)));
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

function sixDigits(): string {
  const [n] = crypto.getRandomValues(new Uint32Array(1));
  return String(n % 1_000_000).padStart(6, '0');
}

const answer = (row: Row | null) => ({ email: row?.verified_at ? row.email : null, pendingEmail: row?.pending_email ?? null });

async function sendCode(db: Db, to: string, code: string, name: string) {
  const { data, error } = await db.rpc('email_sender');
  if (error) throw new Error(error.message);
  const s = (data ?? {}) as { resend_api_key?: string; email_from?: string; email_reply_to?: string };
  const apiKey = s.resend_api_key || Deno.env.get('RESEND_API_KEY');
  const from = s.email_from || Deno.env.get('EMAIL_FROM');
  const replyTo = s.email_reply_to || Deno.env.get('EMAIL_REPLY_TO');
  if (!apiKey || !from) throw new HttpError(503, 'Email is not set up on this Gradileo server yet.');
  const who = name.trim() || 'A Gradileo student';
  const safe = who.replace(/[&<>"']/g, '');
  const text =
    `${who} asked for reminders about their class work on Gradileo to be sent to this address, as their parent or guardian.\n\n` +
    `If you agree, give them this code to type in: ${code}\nIt works for ${CODE_MINUTES} minutes.\n\n` +
    'We use this address only for reminders from their classes, and it can be removed at any time in Settings. ' +
    'If you do not agree, or did not expect this, ignore this email and nothing more will be sent.';
  const html = `<div style="font-family:system-ui,sans-serif;max-width:520px;margin:auto;padding:24px;color:#14161f">
    <div style="font-size:12px;font-weight:700;color:#6a43e3;letter-spacing:.06em;text-transform:uppercase">Gradileo</div>
    <p style="margin:12px 0;color:#14161f;line-height:1.5"><strong>${safe}</strong> asked for reminders about their class work on Gradileo to be sent to this address, as their parent or guardian.</p>
    <p style="margin:0 0 6px;color:#4b5060">If you agree, give them this code to type in:</p>
    <div style="font-size:32px;font-weight:700;letter-spacing:.2em">${code}</div>
    <p style="margin:6px 0 18px;color:#4b5060">It works for ${CODE_MINUTES} minutes.</p>
    <p style="margin:0;font-size:13px;color:#8a8fa0;line-height:1.5">We use this address only for reminders from their classes, and it can be removed at any time in Settings. If you do not agree, or did not expect this, ignore this email and nothing more will be sent.</p>
  </div>`;
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to: [to], ...(replyTo ? { reply_to: replyTo } : {}), subject: `${who} asked for Gradileo reminders at this address`, html, text }),
  });
  if (!res.ok) {
    console.error('code email failed', res.status, await res.text());
    throw new HttpError(502, 'The code could not be sent. Check the address and try again.');
  }
}

serve(async (req) => {
  const db = adminClient();
  const me = await getCaller(req, db);
  const body = await readJson(req, 2_000);
  const action = str(body.action, 20);

  if (me.role !== 'student') throw new HttpError(403, 'Only students add an email address for reminders.');
  if (me.email && !me.email.toLowerCase().endsWith(`@${DOMAIN}`)) throw new HttpError(400, 'Reminders already go to the email address you signed up with.');
  // A name-only account counts once a teacher has let it into a class.
  const { data: profile } = await db.from('profiles').select('name_only').eq('id', me.id).maybeSingle();
  if (profile?.name_only) {
    const { count } = await db.from('enrollments').select('class_id', { count: 'exact', head: true }).eq('student_id', me.id);
    // Settings asks on every visit: answer plainly instead of refusing, so the page can say why.
    if (!count && action === 'get') return { email: null, pendingEmail: null, waitingForClass: true };
    if (!count) throw new HttpError(403, 'You can add an email address once your teacher has let you into the class.');
  }

  const { data: found, error } = await db.from('notification_emails').select('*').eq('user_id', me.id).maybeSingle();
  if (error) throw new Error(error.message);
  const row = found as Row | null;

  if (action === 'get') return answer(row);

  if (action === 'remove') {
    await db.from('notification_emails').delete().eq('user_id', me.id);
    return answer(null);
  }

  if (action === 'request') {
    const email = str(body.email, 254).trim().toLowerCase();
    if (!EMAIL.test(email) || email.endsWith(`@${DOMAIN}`)) throw new HttpError(400, 'Enter a full email address, such as name@example.com.');
    const now = Date.now();
    const fresh = !row || now - Date.parse(row.window_started_at) > 3_600_000;
    const sent = fresh ? 0 : row.codes_sent;
    if (sent >= CODES_PER_HOUR) throw new HttpError(429, 'Too many codes for now. Try again in an hour.');
    const code = sixDigits();
    await sendCode(db, email, code, me.full_name);
    const next = {
      user_id: me.id,
      email: row?.email ?? null,
      verified_at: row?.verified_at ?? null,
      pending_email: email,
      code_hash: await sha256(`${me.id}:${code}`),
      code_expires_at: new Date(now + CODE_MINUTES * 60_000).toISOString(),
      attempts: 0,
      codes_sent: sent + 1,
      window_started_at: fresh ? new Date(now).toISOString() : row.window_started_at,
      updated_at: new Date(now).toISOString(),
    };
    const { error: e } = await db.from('notification_emails').upsert(next);
    if (e) throw new Error(e.message);
    return answer(next as Row);
  }

  if (action === 'confirm') {
    const code = str(body.code, 12).replace(/\s/g, '');
    if (!row?.pending_email || !row.code_hash || !row.code_expires_at) throw new HttpError(400, 'Ask for a code first.');
    if (Date.parse(row.code_expires_at) < Date.now()) throw new HttpError(400, 'That code has expired. Ask for a new one.');
    if (row.attempts >= TRIES_PER_CODE) throw new HttpError(400, 'Too many tries. Ask for a new code.');
    if (!/^\d{6}$/.test(code) || (await sha256(`${me.id}:${code}`)) !== row.code_hash) {
      await db.from('notification_emails').update({ attempts: row.attempts + 1 }).eq('user_id', me.id);
      throw new HttpError(400, 'That code is not right. Check the email and try again.');
    }
    const confirmed = {
      email: row.pending_email,
      verified_at: new Date().toISOString(),
      pending_email: null,
      code_hash: null,
      code_expires_at: null,
      attempts: 0,
      updated_at: new Date().toISOString(),
    };
    const { error: e } = await db.from('notification_emails').update(confirmed).eq('user_id', me.id);
    if (e) throw new Error(e.message);
    return answer({ ...row, ...confirmed } as Row);
  }

  throw new HttpError(400, 'Unknown action.');
});
