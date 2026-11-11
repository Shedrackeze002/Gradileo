/** Fixes from the end-to-end test of the live site (11 November 2026). */
import { describe, expect, it } from 'vitest';
import { DEMO_PASSWORD, DEMO_STUDENT_EMAIL, DEMO_TEACHER_EMAIL } from './constants.ts';
import { promptStart } from '@/components/question/ReviewList.tsx';

class MemoryStorage {
  private m = new Map<string, string>();
  getItem(k: string) {
    return this.m.get(k) ?? null;
  }
  setItem(k: string, v: string) {
    this.m.set(k, String(v));
  }
  removeItem(k: string) {
    this.m.delete(k);
  }
  clear() {
    this.m.clear();
  }
}

async function demo(email: string) {
  Object.assign(globalThis, { localStorage: new MemoryStorage(), sessionStorage: new MemoryStorage() });
  const { DemoApi } = await import('./demoApi.ts');
  const api = new DemoApi();
  await api.signIn(email, DEMO_PASSWORD);
  return api;
}

type Db = { submissions: { id: string; startedAt: string }[]; assignments: { id: string; settings: { timeLimitMinutes: number | null } }[]; users: { id: string; username?: string; password: string }[] };
const dbOf = (api: unknown) => (api as { db: Db }).db;

describe('the time limit, checked where the work is stored', () => {
  it('records how far past the limit a timed attempt came in, and nothing for one on time', async () => {
    const api = await demo(DEMO_STUDENT_EMAIL);
    const me = (await api.getCurrentUser())!;
    const [cls] = await api.listMyClasses();
    const mine = await api.listSubmissions({ studentId: me.id });
    const open = (await api.listAssignments(cls.id)).filter((a) => a.status === 'published' && a.type !== 'reading' && !mine.some((s) => s.assignmentId === a.id));
    expect(open.length).toBeGreaterThanOrEqual(2);

    const db = dbOf(api);
    const [late, onTime] = open;
    for (const a of [late, onTime]) db.assignments.find((x) => x.id === a.id)!.settings.timeLimitMinutes = 30;

    const s1 = await api.startSubmission(late.id);
    db.submissions.find((s) => s.id === s1.id)!.startedAt = new Date(Date.now() - 42 * 60_000).toISOString();
    const done1 = await api.submit(s1.id, { responses: {}, items: s1.items });
    expect(done1.integrity.overtimeSeconds).toBeGreaterThanOrEqual(12 * 60 - 2);
    expect(done1.integrity.overtimeSeconds).toBeLessThan(12 * 60 + 10);

    const s2 = await api.startSubmission(onTime.id);
    const done2 = await api.submit(s2.id, { responses: {}, items: s2.items });
    expect(done2.integrity.overtimeSeconds).toBeUndefined();
  });
});

describe('a new password from the teacher', () => {
  it('is made for a student who signs in with a username, and only in the teacher’s own class', async () => {
    const api = await demo(DEMO_TEACHER_EMAIL);
    const [cls] = await api.listMyClasses();
    const [made] = await api.createStudentAccounts(cls.id, ['Zed Tester']);
    const student = dbOf(api).users.find((u) => u.username === made.username)!;

    const again = await api.resetStudentPassword(cls.id, student.id);
    expect(again.username).toBe(made.username);
    expect(again.password).not.toBe(made.password);
    expect(student.password).toBe(again.password);

    await expect(api.resetStudentPassword(cls.id, 'nobody')).rejects.toThrow(/not in your class/);
    const withEmail = (await api.listRoster(cls.id)).find((s) => !s.email.endsWith('@students.educore.local'))!;
    await expect(api.resetStudentPassword(cls.id, withEmail.id)).rejects.toThrow(/Forgot password/);
  });
});

describe('a teacher’s own question in the review', () => {
  it('is titled by the start of its text', () => {
    expect(promptStart('**Name** the longest side of a right triangle.')).toBe('Name the longest side of a right triangle.');
    expect(promptStart('x'.repeat(200))).toHaveLength(70);
    expect(promptStart('  ')).toBeUndefined();
  });
});
