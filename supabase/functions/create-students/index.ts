/**
 * create-students: a teacher creates student accounts from a list of names.
 * Students sign in with a username (mapped to <username>@STUDENT_EMAIL_DOMAIN) and a
 * temporary password, so no student email address is needed.
 */
import { HttpError, readJson, serve } from '../_shared/http.ts';
import { adminClient, getCaller, requireTeacherOf, str } from '../_shared/db.ts';

const DOMAIN = Deno.env.get('STUDENT_EMAIL_DOMAIN') ?? 'students.educore.local';
const WORDS = ['maple', 'river', 'cedar', 'prairie', 'aurora', 'summit', 'canyon', 'harbor', 'meadow', 'falcon', 'glacier', 'willow', 'timber', 'comet', 'orbit', 'delta'];

function randomInt(n: number): number {
  const a = new Uint32Array(1);
  crypto.getRandomValues(a);
  return a[0] % n;
}

function password(): string {
  return `${WORDS[randomInt(WORDS.length)]}-${10 + randomInt(90)}-${WORDS[randomInt(WORDS.length)]}`;
}

function baseUsername(fullName: string): string {
  const parts = fullName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z\s-]/g, '')
    .trim()
    .split(/[\s-]+/)
    .filter(Boolean);
  if (!parts.length) return 'student';
  const first = parts[0].slice(0, 20);
  return parts.length > 1 ? `${first}.${parts[parts.length - 1][0]}` : first;
}

serve(async (req) => {
  const db = adminClient();
  const me = await getCaller(req, db);
  const body = await readJson(req);
  const classId = str(body.classId, 64);
  await requireTeacherOf(db, classId, me);

  // A student who signs in with a username has no email address, so "Forgot password" cannot
  // reach them: their teacher gives them a new temporary password instead.
  if (str(body.action, 32) === 'reset_password') {
    const studentId = str(body.studentId, 64);
    const { data: enrolled } = await db.from('enrollments').select('student_id').eq('class_id', classId).eq('student_id', studentId).maybeSingle();
    if (!enrolled) throw new HttpError(403, 'This student is not in your class.');
    const { data: p } = await db.from('profiles').select('full_name, email, role, username, name_only').eq('id', studentId).maybeSingle();
    if (!p || p.role !== 'student') throw new HttpError(404, 'Student not found.');
    if (p.name_only) throw new HttpError(400, 'This student joined with the class link and has no password.');
    const email = String(p.email ?? '').toLowerCase();
    if (!email.endsWith(`@${DOMAIN}`)) throw new HttpError(400, 'This student signs in with an email address and can use "Forgot password" on the sign-in page.');
    const pw = password();
    const { error } = await db.auth.admin.updateUserById(studentId, { password: pw });
    if (error) throw new Error(error.message);
    return { fullName: p.full_name, username: p.username ?? email.slice(0, email.indexOf('@')), password: pw };
  }

  const names = (Array.isArray(body.names) ? body.names : [])
    .map((n: unknown) => str(n, 80).trim())
    .filter(Boolean);
  if (!names.length) throw new HttpError(400, 'Add at least one name.');
  if (names.length > 60) throw new HttpError(400, 'Add up to 60 students at a time.');

  const students: Array<{ fullName: string; username: string; password: string }> = [];
  for (const fullName of names) {
    const base = baseUsername(fullName);
    let created = false;
    for (let n = 1; n <= 50 && !created; n++) {
      const username = n === 1 ? base : `${base}${n}`;
      const { data: taken } = await db.from('profiles').select('id').eq('username', username).maybeSingle();
      if (taken) continue;
      const pw = password();
      const { data, error } = await db.auth.admin.createUser({
        email: `${username}@${DOMAIN}`,
        password: pw,
        email_confirm: true,
        app_metadata: { role: 'student', username, full_name: fullName },
        user_metadata: { full_name: fullName },
      });
      if (error) {
        if (/already|exists|registered/i.test(error.message)) continue;
        throw new Error(error.message);
      }
      // The sign-up trigger runs before the account's app metadata is stored, so it cannot read
      // the username; write it here, or the roster and the gradebook show the sign-in address.
      const { error: e1 } = await db.from('profiles').update({ username }).eq('id', data.user.id);
      if (e1) throw new Error(e1.message);
      const { error: e2 } = await db.from('enrollments').insert({ class_id: classId, student_id: data.user.id });
      if (e2) throw new Error(e2.message);
      students.push({ fullName, username, password: pw });
      created = true;
    }
    if (!created) throw new HttpError(409, `Could not find a free username for ${fullName}.`);
  }
  return { students };
});
