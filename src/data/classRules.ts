import type { ClassRoom } from './types.ts';

/** A section or period as the duplicate check compares it: trimmed, case-insensitive, empty for none. */
const sectionKey = (section: string | null | undefined) => (section ?? '').trim().toLowerCase();

/**
 * The teacher's active class that already teaches this course in this section, if any. A teacher
 * can teach one course to several groups, but each needs its own section or period; the database
 * enforces the same rule (see the `classes_one_active_per_course` index).
 */
export function duplicateClass(classes: ClassRoom[], courseId: string, section: string | null | undefined, exceptId?: string): ClassRoom | undefined {
  return classes.find((c) => c.kind === 'teacher' && !c.archived && c.id !== exceptId && c.courseId === courseId && sectionKey(c.section) === sectionKey(section));
}

/** What a teacher is told when a class would repeat one they already have. */
export function duplicateClassMessage(existing: Pick<ClassRoom, 'name' | 'section'>): string {
  const what = existing.section ? `${existing.name} (${existing.section})` : existing.name;
  return `You already have ${what} for this course. Open that class instead, or give the new one a different section or period, such as "Period 3".`;
}
