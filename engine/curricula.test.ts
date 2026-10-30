import { describe, expect, it } from 'vitest';
import { CURRICULA, curriculumById, guessCurriculum, levelIn, yearsFor } from './curricula.ts';

describe('curricula', () => {
  it('give every system each level from its first year to 12, with distinct labels', () => {
    for (const c of CURRICULA) {
      const labels = c.years.map((y) => y.label);
      expect(new Set(labels).size, c.id).toBe(labels.length);
      // The IB starts at MYP 1 (Grade 6); every other system reaches down to Grade 5.
      const first = c.id === 'ib' ? 6 : 5;
      for (let g = first; g <= 12; g++) expect(c.years.some((y) => y.grade === g), `${c.id} ${g}`).toBe(true);
      for (const y of c.years) expect(y.grade >= 5 && y.grade <= 12, `${c.id} ${y.label}`).toBe(true);
    }
    expect(new Set(CURRICULA.map((c) => c.id)).size).toBe(CURRICULA.length);
  });

  it('match each system’s years to the same age', () => {
    const grade = (id: string, label: string) => curriculumById(id)!.years.find((y) => y.label === label)?.grade;
    expect(grade('uk', 'Year 11')).toBe(10);
    expect(grade('uk', 'Year 13')).toBe(12);
    expect(grade('scotland', 'S4')).toBe(10);
    expect(grade('ni', 'Year 12')).toBe(10);
    expect(grade('ng', 'JSS 1')).toBe(7);
    expect(grade('ng', 'SS 3')).toBe(12);
    expect(grade('gh', 'SHS 1')).toBe(10);
    expect(grade('ke', 'Form 4')).toBe(12);
    expect(grade('ib', 'MYP 5')).toBe(10);
    expect(grade('ib', 'DP 1')).toBe(11);
    expect(grade('ie', 'Transition Year')).toBe(10);
    expect(grade('other', '15')).toBe(10);
  });

  it('offer the years a subject is taught in', () => {
    expect(yearsFor(curriculumById('uk')!, 9).map((y) => y.label)).toEqual(['Year 10', 'Year 11', 'Year 12', 'Year 13']);
    expect(yearsFor(curriculumById('ng')!, 5)).toHaveLength(8);
  });

  it('say where a level sits in the learner’s system, and nothing where the grades are the same', () => {
    expect(levelIn('uk', 10)).toBe('Year 11');
    expect(levelIn('ng', 10)).toBe('SS 1');
    expect(levelIn('other', 10)).toBe('age 15');
    expect(levelIn('us', 10)).toBeUndefined();
    expect(levelIn('ke', 12)).toBeUndefined();
    expect(levelIn(undefined, 10)).toBeUndefined();
  });

  it('guess the curriculum from the time zone', () => {
    expect(guessCurriculum('Europe/London')).toBe('uk');
    expect(guessCurriculum('Africa/Lagos')).toBe('ng');
    expect(guessCurriculum('America/Edmonton')).toBe('ca');
    expect(guessCurriculum('America/Chicago')).toBe('us');
    expect(guessCurriculum('Australia/Sydney')).toBe('au');
    expect(guessCurriculum('Etc/UTC')).toBeUndefined();
    expect(guessCurriculum(undefined)).toBeUndefined();
  });
});
