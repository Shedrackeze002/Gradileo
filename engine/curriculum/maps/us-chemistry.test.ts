import { describe, expect, it } from 'vitest';
import { getCourse, LISTED_COURSES, mappedCourses } from '../index.ts';
import { PREREQUISITE, recommendCourse } from '../../placement.ts';

describe('the US map’s AP Chemistry course', () => {
  it('build the nine AP units from chemistry lessons only', () => {
    const chemistry = mappedCourses('us').filter((c) => c.subject === 'Chemistry');
    expect(chemistry.map((c) => c.shortTitle)).toEqual(['AP Chemistry']);
    const ap = getCourse('us-ap-chemistry')!;
    expect(ap.units.map((u) => u.title)).toEqual(['Atomic Structure and Properties', 'Compound Structure and Properties', 'Properties of Substances and Mixtures', 'Chemical Reactions', 'Kinetics', 'Thermochemistry', 'Equilibrium', 'Acids and Bases', 'Thermodynamics and Electrochemistry']);
    const more = getCourse('chem-more')!;
    const own = new Set([...LISTED_COURSES.filter((c) => c.subject === 'Chemistry'), more].flatMap((c) => c.lessons.map((l) => l.id)));
    for (const l of ap.lessons) expect(own.has(l.id), l.id).toBe(true);
    // Every unit names the AP topics it covers.
    for (const u of ap.units) expect(u.description, u.title).toMatch(/\(AP topics? \d\.\d+/);
    // The AP units of More Chemistry (units 20 and after) are all filed in AP Chemistry.
    for (const l of more.lessons.filter((x) => Number(x.unitId.slice('cx-u'.length)) >= 20)) {
      expect(ap.lessons.some((x) => x.id === l.id), `AP Chemistry teaches ${l.id}`).toBe(true);
    }
    // Outcome codes name the course a lesson comes from.
    expect(ap.lessons.find((l) => l.id === 'c30-4-8')!.outcomes.every((o) => o.startsWith('Chemistry 12 '))).toBe(true);
  });

  it('offer AP Chemistry in Grade 12, and first-year chemistry before it', () => {
    const us = (grade: number) => recommendCourse({ subject: 'Chemistry', grade, curriculum: 'us' });
    expect(us(12).courseId).toBe('us-ap-chemistry');
    expect(us(12).prerequisite).toBe('chem-20');
    expect(us(12).alternatives.map((c) => c.courseId)).toEqual(['chem-20', 'chem-30']);
    expect(us(11).courseId).toBe('chem-20');
    expect(us(11).alternatives.map((c) => c.courseId)).toEqual(['us-ap-chemistry']);
    expect(PREREQUISITE['us-ap-chemistry']).toBe('chem-20');
    // Younger learners, and learners elsewhere, keep Gradileo’s own courses.
    expect(us(10).courseId).toBe('chem-10');
    expect(recommendCourse({ subject: 'Chemistry', grade: 12, curriculum: 'ng' }).courseId).toBe('chem-30');
  });
});
