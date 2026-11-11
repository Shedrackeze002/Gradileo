/** A teacher reopens a submitted attempt: it is kept for the record, stops counting, and the student gets new questions. */
import { describe, expect, it } from 'vitest';
import { DEMO_PASSWORD, DEMO_TEACHER_EMAIL } from './constants.ts';

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

async function teacherApi() {
  Object.assign(globalThis, { localStorage: new MemoryStorage(), sessionStorage: new MemoryStorage() });
  const { DemoApi } = await import('./demoApi.ts');
  const api = new DemoApi();
  await api.signIn(DEMO_TEACHER_EMAIL, DEMO_PASSWORD);
  return api;
}

describe('reopening a submitted attempt', () => {
  it('keeps the old attempt for the record and starts a fresh one with new questions', async () => {
    const api = await teacherApi();
    const [cls] = await api.listMyClasses();
    const subs = await api.listSubmissions({ classId: cls.id });
    const old = subs.find((s) => s.assignmentId && s.status !== 'in_progress' && s.items.length > 0 && !subs.some((x) => x.assignmentId === s.assignmentId && x.studentId === s.studentId && x.status === 'in_progress'));
    expect(old).toBeTruthy();

    const fresh = await api.reopenSubmission(old!.id);
    expect(fresh.status).toBe('in_progress');
    expect(fresh.studentId).toBe(old!.studentId);
    expect(fresh.assignmentId).toBe(old!.assignmentId);
    expect(fresh.attempt).toBeGreaterThan(old!.attempt);
    expect(fresh.seed).not.toBe(old!.seed);
    expect(fresh.items.length).toBe(old!.items.length);

    // The reopened attempt no longer counts, but is still there for the record.
    const counting = await api.listSubmissions({ assignmentId: old!.assignmentId! });
    expect(counting.some((s) => s.id === old!.id)).toBe(false);
    const all = await api.listSubmissions({ assignmentId: old!.assignmentId!, includeReopened: true });
    expect(all.find((s) => s.id === old!.id)?.reopenedAt).toBeTruthy();
    expect((await api.getSubmission(old!.id))?.percent).toBe(old!.percent);

    // The fresh attempt's clock waits for the student: it starts when they first open it.
    expect(fresh.integrity.awaitingStart).toBe(true);

    // Not twice, and not while the fresh attempt is open.
    await expect(api.reopenSubmission(old!.id)).rejects.toThrow(/already reopened/);
    await expect(api.reopenSubmission(fresh.id)).rejects.toThrow(/still in progress/);
  });

  it('starts the fresh attempt’s clock when the student first opens it, not when the teacher reopened', async () => {
    const api = await teacherApi();
    const [cls] = await api.listMyClasses();
    const subs = await api.listSubmissions({ classId: cls.id });
    const old = subs.find((s) => s.assignmentId && s.status !== 'in_progress' && s.items.length > 0 && !subs.some((x) => x.assignmentId === s.assignmentId && x.studentId === s.studentId && x.status === 'in_progress'));
    const fresh = await api.reopenSubmission(old!.id);

    // The teacher reopened it a day ago; the student opens it only now.
    const db = (api as unknown as { db: { submissions: { id: string; startedAt: string }[]; users: { id: string; email: string | null }[] } }).db;
    const aDayAgo = new Date(Date.now() - 86_400_000).toISOString();
    db.submissions.find((s) => s.id === fresh.id)!.startedAt = aDayAgo;
    const student = db.users.find((p) => p.id === old!.studentId)!;
    await api.signOut();
    await api.signIn(student.email!, DEMO_PASSWORD);

    const begun = await api.startSubmission(old!.assignmentId!);
    expect(begun.id).toBe(fresh.id);
    expect(begun.integrity.awaitingStart).toBeUndefined();
    expect(Date.now() - new Date(begun.startedAt).getTime()).toBeLessThan(5000);

    // Opening it again (a reload) does not restart the clock.
    const startedAt = begun.startedAt;
    await new Promise((r) => setTimeout(r, 15));
    expect((await api.startSubmission(old!.assignmentId!)).startedAt).toBe(startedAt);
  });
});
