/** A teacher's classes in demo mode: no second class for the same course and section, and deleting a class. */
import { beforeEach, describe, expect, it } from 'vitest';
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

describe('demo teacher classes', () => {
  let api: Awaited<ReturnType<typeof teacherApi>>;
  beforeEach(async () => {
    api = await teacherApi();
  });

  it('refuses a second active class for the same course and section', async () => {
    const first = await api.createClass({ name: 'Chemistry 10', courseId: 'chem-10' });
    await expect(api.createClass({ name: 'Chemistry 10', courseId: 'chem-10' })).rejects.toThrow(/already have Chemistry 10/);
    await expect(api.createClass({ name: 'Chem', section: '  ', courseId: 'chem-10' })).rejects.toThrow(/already have/);
    // Another group of the same course is fine once it has its own section.
    const second = await api.createClass({ name: 'Chemistry 10', section: 'Period 3', courseId: 'chem-10' });
    await expect(api.createClass({ name: 'Chemistry 10', section: 'period 3', courseId: 'chem-10' })).rejects.toThrow(/Period 3/);
    // Clearing the second class's section would repeat the first, and so would restoring an archived copy.
    await expect(api.updateClass(second.id, { section: null })).rejects.toThrow(/already have/);
    await api.updateClass(first.id, { archived: true });
    const again = await api.createClass({ name: 'Chemistry 10', courseId: 'chem-10' });
    await expect(api.updateClass(first.id, { archived: false })).rejects.toThrow(/already have/);
    expect(again.courseId).toBe('chem-10');
  });

  it('deletes a class with everything in it', async () => {
    const c = await api.createClass({ name: 'Chemistry 10', courseId: 'chem-10' });
    await api.setPublished(c.id, 'c10-1-1', true);
    expect(await api.listPublications(c.id)).toHaveLength(1);
    await api.deleteClass(c.id);
    expect(await api.getClass(c.id)).toBeNull();
    expect(await api.listPublications(c.id)).toHaveLength(0);
    expect((await api.listMyClasses()).some((x) => x.id === c.id)).toBe(false);
    // The course can be added again afterwards.
    await expect(api.createClass({ name: 'Chemistry 10', courseId: 'chem-10' })).resolves.toMatchObject({ courseId: 'chem-10' });
  });
});
