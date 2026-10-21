/** "Draft with AI" in demo mode: only the class's teacher can draft, and without a key the draft is offline. */
import { beforeEach, describe, expect, it } from 'vitest';
import { DEMO_PASSWORD, DEMO_STUDENT_EMAIL, DEMO_TEACHER_EMAIL } from './constants.ts';
import type { DraftRequest } from '@engine/ai/builder.ts';

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

async function freshApi() {
  Object.assign(globalThis, { localStorage: new MemoryStorage(), sessionStorage: new MemoryStorage() });
  const { DemoApi } = await import('./demoApi.ts');
  return new DemoApi();
}

const request: DraftRequest = { type: 'homework', lessonIds: ['m10c-1-1', 'm10c-1-2'], count: 9, difficulty: 'mixed', formats: ['generated', 'choice'], focusWeak: true, notes: '' };

describe('demo drafts', () => {
  let api: Awaited<ReturnType<typeof freshApi>>;
  let classId: string;
  beforeEach(async () => {
    api = await freshApi();
    await api.signIn(DEMO_TEACHER_EMAIL, DEMO_PASSWORD);
    classId = (await api.listMyClasses())[0].id;
  });

  it('drafts the number of questions asked for, from the chosen lessons', async () => {
    const res = await api.draftAssignment(classId, request);
    expect(res.source).toBe('offline');
    const skills = new Set(['m1-referents', 'm1-estimate', 'm1-read-ruler-metric', 'm1-read-ruler-imperial', 'm1-vernier', 'm1-circumference']);
    expect(res.draft.sections.every((s) => skills.has(s.skillId))).toBe(true);
    expect(res.draft.sections.reduce((t, s) => t + s.count, 0)).toBe(9);
    expect(res.draft.title).toMatch(/^Homework: Lessons 1\.1, 1\.2$/);
  });

  it('refuses lessons from another course and other people', async () => {
    await expect(api.draftAssignment(classId, { ...request, lessonIds: ['m8-1-3'] })).rejects.toThrow(/lesson/);
    await api.signOut();
    await api.signIn(DEMO_STUDENT_EMAIL, DEMO_PASSWORD);
    await expect(api.draftAssignment(classId, request)).rejects.toThrow();
  });
});
