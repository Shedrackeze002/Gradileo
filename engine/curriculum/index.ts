/**
 * Curriculum registry. Every course (Grades 5 to 12) registers here.
 *
 * Course outlines and the skill catalogue (names, lessons, outcomes) are small and always loaded.
 * Each course's question generators are large, so the browser loads them only when a page needs
 * them (`loadSkills`, or the `useSkillsReady` hook). The server, tests and tools import
 * `./all.ts`, which registers every generator at once.
 */
import type { CourseMeta, SkillDef, SkillInfo } from '../types.ts';
import { SKILL_CATALOG } from './catalog.ts';
import { MATH10C } from './math10c/course.ts';
import { MATH10_3 } from './math10-3/course.ts';
import { MATH10_4 } from './math10-4/course.ts';
import { MATH20_1 } from './math20-1/course.ts';
import { MATH20_2 } from './math20-2/course.ts';
import { MATH20_3 } from './math20-3/course.ts';
import { MATH20_4 } from './math20-4/course.ts';
import { MATH30_1 } from './math30-1/course.ts';
import { MATH30_2 } from './math30-2/course.ts';
import { MATH30_3 } from './math30-3/course.ts';
import { MATH31 } from './math31/course.ts';
import { MATH5 } from './math5/course.ts';
import { MATH6 } from './math6/course.ts';
import { MATH7 } from './math7/course.ts';
import { MATH8 } from './math8/course.ts';
import { MATH9 } from './math9/course.ts';
import { CHEM10 } from './chem10/course.ts';
import { CHEM20 } from './chem20/course.ts';
import { CHEM30 } from './chem30/course.ts';
import { ENG10 } from './eng10/course.ts';

/** Every course, youngest grade first (the order of course pickers and tabs). */
export const COURSES: CourseMeta[] = [MATH5, MATH6, MATH7, MATH8, MATH9, MATH10C, MATH10_3, MATH10_4, MATH20_1, MATH20_2, MATH20_3, MATH20_4, MATH30_1, MATH30_2, MATH30_3, MATH31, CHEM10, CHEM20, CHEM30, ENG10];

/** The courses a class can be made for or a student placed in: every course that is not a draft. */
export const LISTED_COURSES: CourseMeta[] = COURSES.filter((c) => !c.draft);

/** The subjects of the listed courses, in the order of the courses (Mathematics first). */
export const SUBJECTS: string[] = [...new Set(LISTED_COURSES.map((c) => c.subject))];

/** Each course's generators, loaded on demand (a separate download per course in the browser). */
const LOADERS: Record<string, () => Promise<SkillDef[]>> = {
  'math-10c': () => import('./math10c/skills.ts').then((m) => m.MATH10C_SKILLS),
  'math-10-3': () => import('./math10-3/skills.ts').then((m) => m.MATH10_3_SKILLS),
  'math-10-4': () => import('./math10-4/skills.ts').then((m) => m.MATH10_4_SKILLS),
  'math-20-1': () => import('./math20-1/skills.ts').then((m) => m.MATH20_1_SKILLS),
  'math-20-2': () => import('./math20-2/skills.ts').then((m) => m.MATH20_2_SKILLS),
  'math-20-3': () => import('./math20-3/skills.ts').then((m) => m.MATH20_3_SKILLS),
  'math-20-4': () => import('./math20-4/skills.ts').then((m) => m.MATH20_4_SKILLS),
  'math-30-1': () => import('./math30-1/skills.ts').then((m) => m.MATH30_1_SKILLS),
  'math-30-2': () => import('./math30-2/skills.ts').then((m) => m.MATH30_2_SKILLS),
  'math-30-3': () => import('./math30-3/skills.ts').then((m) => m.MATH30_3_SKILLS),
  'math-31': () => import('./math31/skills.ts').then((m) => m.MATH31_SKILLS),
  'math-5': () => import('./math5/skills.ts').then((m) => m.MATH5_SKILLS),
  'math-6': () => import('./math6/skills.ts').then((m) => m.MATH6_SKILLS),
  'math-7': () => import('./math7/skills.ts').then((m) => m.MATH7_SKILLS),
  'math-8': () => import('./math8/skills.ts').then((m) => m.MATH8_SKILLS),
  'math-9': () => import('./math9/skills.ts').then((m) => m.MATH9_SKILLS),
  'chem-10': () => import('./chem10/skills.ts').then((m) => m.CHEM10_SKILLS),
  'chem-20': () => import('./chem20/skills.ts').then((m) => m.CHEM20_SKILLS),
  'chem-30': () => import('./chem30/skills.ts').then((m) => m.CHEM30_SKILLS),
  'eng-10': () => import('./eng10/skills.ts').then((m) => m.ENG10_SKILLS),
};

const INFO = new Map<string, SkillInfo>(SKILL_CATALOG.map((s) => [s.id, s]));
const LOADED = new Map<string, SkillDef>();
const loading = new Map<string, Promise<void>>();
const listeners = new Set<() => void>();
let version = 0;

/** Adds generators to the registry (used by the course loaders and by ./all.ts). */
export function registerSkills(defs: SkillDef[]): void {
  for (const s of defs) {
    const known = LOADED.get(s.id);
    if (known && known !== s) throw new Error(`Duplicate skill id ${s.id}`);
    LOADED.set(s.id, s);
  }
  version++;
  for (const l of listeners) l();
}

/** Name, lesson, outcomes and format of a skill. Always available, even before its generator loads. */
export function skillInfo(id: string): SkillInfo | undefined {
  return INFO.get(id);
}

export function allSkillInfos(): SkillInfo[] {
  return SKILL_CATALOG;
}

/** A skill with its question generator, or undefined until its course has loaded. */
export function getSkill(id: string): SkillDef | undefined {
  return LOADED.get(id);
}

/** Every skill whose generator has loaded. */
export function allSkills(): SkillDef[] {
  return [...LOADED.values()];
}

/** Loads one course's generators; resolves at once when they are already loaded. */
export function loadCourseSkills(courseId: string): Promise<void> {
  const course = getCourse(courseId);
  if (!course || course.lessons.every((l) => l.skills.every((s) => LOADED.has(s)))) return Promise.resolve();
  let p = loading.get(courseId);
  if (!p) {
    const load = LOADERS[courseId];
    p = load
      ? load()
          .then(registerSkills)
          .catch((e) => {
            loading.delete(courseId);
            throw e;
          })
      : Promise.resolve();
    loading.set(courseId, p);
  }
  return p;
}

/** Loads the generators of every course these skills belong to. */
export async function loadSkills(ids: Iterable<string>): Promise<void> {
  const courses = new Set<string>();
  for (const id of ids) {
    const c = courseOfSkill(id);
    if (c && !LOADED.has(id)) courses.add(c.id);
  }
  await Promise.all([...courses].map(loadCourseSkills));
}

/** True when every known skill in the list has its generator loaded. */
export function skillsReady(ids: Iterable<string>): boolean {
  for (const id of ids) if (INFO.has(id) && !LOADED.has(id)) return false;
  return true;
}

/** For React's useSyncExternalStore: re-render when more generators load. */
export function subscribeSkills(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function skillsVersion(): number {
  return version;
}

export function getCourse(id: string): CourseMeta | undefined {
  return COURSES.find((c) => c.id === id);
}

/** The course a lesson belongs to. */
export function courseOfLesson(lessonId: string): CourseMeta | undefined {
  return COURSES.find((c) => c.lessons.some((l) => l.id === lessonId));
}

/** The course a skill belongs to. */
export function courseOfSkill(skillId: string): CourseMeta | undefined {
  const info = INFO.get(skillId);
  return info ? courseOfLesson(info.lessonId) : undefined;
}

export function lessonById(id: string) {
  for (const c of COURSES) {
    const l = c.lessons.find((x) => x.id === id);
    if (l) return l;
  }
  return undefined;
}

export function unitById(id: string) {
  for (const c of COURSES) {
    const u = c.units.find((x) => x.id === id);
    if (u) return u;
  }
  return undefined;
}

/** Skills of a course, ordered by lesson. */
export function courseSkillIds(courseId: string): string[] {
  const c = getCourse(courseId);
  if (!c) return [];
  return c.lessons.flatMap((l) => l.skills);
}

export function unitSkillIds(unitId: string): string[] {
  for (const c of COURSES) {
    const u = c.units.find((x) => x.id === unitId);
    if (u) return u.lessons.flatMap((lid) => c.lessons.find((l) => l.id === lid)?.skills ?? []);
  }
  return [];
}

export function skillName(id: string): string {
  return INFO.get(id)?.name ?? id;
}
