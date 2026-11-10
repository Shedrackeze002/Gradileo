import { describe, expect, it } from 'vitest';
import { courseOfLesson, getCourse, lessonById, LISTED_COURSES, MAPPED_COURSES, mappedCourses, unitById } from '../index.ts';
import { PREREQUISITE, placementSkills, recommendCourse } from '../../placement.ts';

describe('curriculum maps', () => {
  it('build each US course from existing lessons, each once, in units that are not empty', () => {
    expect(mappedCourses('us').map((c) => c.shortTitle)).toEqual(['US Grade 6', 'US Grade 7', 'US Grade 8', 'Algebra I', 'Geometry', 'Algebra II', 'Precalculus']);
    for (const c of MAPPED_COURSES) {
      const ids = c.lessons.map((l) => l.id);
      expect(new Set(ids).size, c.id).toBe(ids.length);
      for (const u of c.units) expect(u.lessons.length, `${c.id} ${u.title}`).toBeGreaterThan(0);
      for (const l of c.lessons) {
        expect(courseOfLesson(l.id)?.map, `${l.id} belongs to its own course`).toBeUndefined();
        expect(c.units.find((u) => u.id === l.unitId)?.lessons, l.id).toContain(l.id);
      }
      // The gaps the map still shows (an empty list once every syllabus topic has a lesson).
      expect(Array.isArray(c.gaps), `${c.id} lists its gaps`).toBe(true);
      // The database's start_self_paced accepts course ids of this form only.
      expect(c.id).toMatch(/^[a-z0-9-]{3,40}$/);
    }
  });

  it('leave lessons and units found in their own courses, and keep mapped courses out of the general lists', () => {
    const algebra = getCourse('us-algebra-1')!;
    expect(algebra.subject).toBe('Mathematics');
    expect(lessonById('m10c-4-1')?.unitId).toBe('m10c-u4');
    expect(unitById('us-algebra-1-u7')?.title).toBe('Polynomials and Factoring');
    expect(LISTED_COURSES.some((c) => c.map)).toBe(false);
    // Outcome codes name the course they come from, since every course numbers its own.
    expect(algebra.lessons.find((l) => l.id === 'm10c-4-1')!.outcomes.every((o) => o.startsWith('Math 10 '))).toBe(true);
  });

  it('recommend a GCSE tier to a UK learner in Year 10 or 11, and Gradileo’s own courses to others', () => {
    expect(mappedCourses('uk').map((c) => c.shortTitle)).toEqual(['GCSE Foundation', 'GCSE Higher', 'A level Year 12', 'A level Year 13']);
    // Every GCSE topic has a lesson, so neither tier lists a gap.
    for (const id of ['uk-gcse-foundation', 'uk-gcse-higher']) expect(getCourse(id)!.gaps, id).toEqual([]);
    const uk = (grade: number, more = {}) => recommendCourse({ subject: 'Mathematics', grade, curriculum: 'uk', feeling: 'ok', ...more });
    expect(uk(9).courseId).toBe('uk-gcse-higher');
    expect(uk(10).courseId).toBe('uk-gcse-higher');
    expect(uk(10).alternatives.map((c) => c.courseId)).toContain('uk-gcse-foundation');
    expect(uk(10, { support: true }).courseId).toBe('uk-gcse-foundation');
    expect(uk(9, { feeling: 'struggling' }).courseId).toBe('uk-gcse-foundation');
    expect(uk(8).courseId).toBe('math-8');
    expect(uk(10).prerequisite).toBe('math-9');
  });

  it('build A level Mathematics from Gradileo’s lessons, list what it does not teach yet, and offer it in Years 12 and 13', () => {
    const year1 = getCourse('uk-a-level-year-1')!;
    const year2 = getCourse('uk-a-level-year-2')!;
    expect(year1.units.map((u) => u.title)).toContain('Exponentials and Logarithms');
    expect(year2.units.map((u) => u.title)).toContain('Trigonometry and Modelling');
    // Mechanics and hypothesis testing are the largest topics still to write.
    expect(year1.gaps).toContain('The binomial distribution');
    expect(year2.gaps).toContain('Moments');
    const uk = (grade: number, more = {}) => recommendCourse({ subject: 'Mathematics', grade, curriculum: 'uk', plan: 'university-stem', feeling: 'ok', ...more });
    expect(uk(11).courseId).toBe('uk-a-level-year-1');
    expect(uk(11).prerequisite).toBe('uk-gcse-higher');
    expect(uk(12).courseId).toBe('uk-a-level-year-2');
    expect(uk(12).prerequisite).toBe('uk-a-level-year-1');
    // A learner heading for work or with extra support keeps Gradileo’s own courses.
    expect(uk(11, { plan: 'work' }).courseId).toBe('math-20-3');
    expect(uk(12, { support: true }).courseId).toBe('math-20-4');
  });

  it('recommend the Common Core course of a US learner’s grade, with a placement check on the one before', () => {
    const us = (grade: number, more = {}) => recommendCourse({ subject: 'Mathematics', grade, curriculum: 'us', plan: 'university-stem', feeling: 'ok', ...more });
    expect([6, 7, 8, 9, 10, 11, 12].map((g) => us(g).courseId)).toEqual(['us-grade-6', 'us-grade-7', 'us-grade-8', 'us-algebra-1', 'us-geometry', 'us-algebra-2', 'us-precalculus']);
    expect(us(12, { calculus: true }).courseId).toBe('math-31');
    expect(us(10).prerequisite).toBe('us-algebra-1');
    expect(us(5).courseId).toBe('math-5');
    // Other learners keep Gradileo's own courses.
    expect(recommendCourse({ subject: 'Mathematics', grade: 9, curriculum: 'ng' }).courseId).toBe('math-9');
    for (const c of MAPPED_COURSES) {
      const before = PREREQUISITE[c.id];
      expect(before && getCourse(before), c.id).toBeTruthy();
      expect(placementSkills(before!).length, c.id).toBeGreaterThan(0);
    }
  });
});
