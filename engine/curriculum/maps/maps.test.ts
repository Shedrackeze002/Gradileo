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
      expect(c.gaps?.length, `${c.id} lists its gaps`).toBeGreaterThan(0);
      // The database's start_self_paced accepts course ids of this form only.
      expect(c.id).toMatch(/^[a-z]{2,6}-[0-9a-z-]{1,12}$/);
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

  it('recommend the Common Core course of a US learner’s grade, with a placement check on the one before', () => {
    const us = (grade: number, more = {}) => recommendCourse({ subject: 'Mathematics', grade, curriculum: 'us', plan: 'university-stem', feeling: 'ok', ...more });
    expect([6, 7, 8, 9, 10, 11, 12].map((g) => us(g).courseId)).toEqual(['us-grade-6', 'us-grade-7', 'us-grade-8', 'us-algebra-1', 'us-geometry', 'us-algebra-2', 'us-precalculus']);
    expect(us(12, { calculus: true }).courseId).toBe('math-31');
    expect(us(10).prerequisite).toBe('us-algebra-1');
    expect(us(5).courseId).toBe('math-5');
    // Other learners keep Gradileo's own courses.
    expect(recommendCourse({ subject: 'Mathematics', grade: 9, curriculum: 'uk' }).courseId).toBe('math-9');
    for (const c of MAPPED_COURSES) {
      const before = PREREQUISITE[c.id];
      expect(before && getCourse(before), c.id).toBeTruthy();
      expect(placementSkills(before!).length, c.id).toBeGreaterThan(0);
    }
  });
});
