import { describe, expect, it } from 'vitest';
import { getCourse } from '@engine/curriculum/index.ts';
import { emptySkillState, type SkillState } from '@engine/mastery.ts';
import { heldUntilDue, resultsVisible, selfPacedLessons } from './derive.ts';

const proficient = (skillId: string): SkillState => ({ ...emptySkillState(skillId), level: 'proficient', pKnown: 0.9, attempts: 6 });

describe('self-paced lessons', () => {
  const course = getCourse('math-9')!;

  it('starts at the first lesson', () => {
    const r = selfPacedLessons('math-9', new Map());
    expect(r.next).toBe(course.lessons[0].id);
    expect(r.taught).toEqual([course.lessons[0].id]);
  });

  it('moves on once every skill of a lesson is proficient', () => {
    const map = new Map(course.lessons[0].skills.map((s) => [s, proficient(s)]));
    const r = selfPacedLessons('math-9', map);
    expect(r.next).toBe(course.lessons[1].id);
    expect(r.taught).toEqual([course.lessons[0].id, course.lessons[1].id]);
  });

  it('stays on the last lesson when the course is complete', () => {
    const map = new Map(course.lessons.flatMap((l) => l.skills).map((s) => [s, proficient(s)]));
    const r = selfPacedLessons('math-9', map);
    expect(r.next).toBe(course.lessons[course.lessons.length - 1].id);
    expect(r.taught).toHaveLength(course.lessons.length);
  });

  it('returns nothing for an unknown course', () => {
    expect(selfPacedLessons('math-0', new Map())).toEqual({ next: undefined, taught: [] });
  });
});

describe('results held until the due date', () => {
  const exam = (dueAt: string | null) => ({ settings: { feedback: 'after_due' }, dueAt }) as unknown as Parameters<typeof resultsVisible>[0];

  it('holds results until the due date has passed', () => {
    const a = exam('2026-11-12T19:00:00Z');
    expect(heldUntilDue(a)).toBe(true);
    expect(resultsVisible(a, new Date('2026-11-12T18:00:00Z'))).toBe(false);
    expect(resultsVisible(a, new Date('2026-11-12T19:00:01Z'))).toBe(true);
  });

  it('shows results after submission when there is no due date to wait for', () => {
    const a = exam(null);
    expect(heldUntilDue(a)).toBe(false);
    expect(resultsVisible(a)).toBe(true);
  });
});
