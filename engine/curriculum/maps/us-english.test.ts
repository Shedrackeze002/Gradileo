import { describe, expect, it } from 'vitest';
import { getCourse, LISTED_COURSES, mappedCourses } from '../index.ts';
import { PREREQUISITE, recommendCourse } from '../../placement.ts';

const english = () => mappedCourses('us').filter((c) => c.subject === 'English');

describe('the US map’s English courses (Common Core English Language Arts)', () => {
  it('build Grades 5 to 8 and English 9 to 12 from English lessons only', () => {
    expect(english().map((c) => c.shortTitle)).toEqual(['US ELA Grade 5', 'US ELA Grade 6', 'US ELA Grade 7', 'US ELA Grade 8', 'US English 9', 'US English 10', 'US English 11', 'US English 12']);
    expect(english().map((c) => c.grade)).toEqual([5, 6, 7, 8, 9, 10, 11, 12]);
    const own = new Set([...LISTED_COURSES.filter((c) => c.subject === 'English'), getCourse('eng-more')!].flatMap((c) => c.lessons.map((l) => l.id)));
    for (const c of english()) {
      for (const l of c.lessons) expect(own.has(l.id), `${c.id} ${l.id}`).toBe(true);
      // Every unit names the Common Core standards it serves, and every gap names its standard.
      for (const u of c.units) expect(u.description, `${c.id} ${u.title}`).toMatch(/\((RL|RI|RF|W|SL|L)\.\d/);
      for (const g of c.gaps ?? []) expect(g, c.id).toMatch(/\((RL|RI|RF|W|SL|L)\.\d/);
    }
  });

  it('teach every More English Topics lesson written for the US map (Units 11 and after) in a course of its grade or near it', () => {
    const more = getCourse('eng-more')!.lessons.filter((l) => Number(l.unitId.slice('ex-u'.length)) >= 11);
    expect(more.length).toBeGreaterThan(0);
    for (const l of more) {
      const homes = english().filter((c) => c.lessons.some((x) => x.id === l.id));
      expect(homes.length, `${l.id} is filed in a US course`).toBeGreaterThan(0);
      expect(homes.some((c) => Math.abs(c.grade - (l.grade ?? 10)) <= 1), `${l.id} (Grade ${l.grade}) is taught near its grade`).toBe(true);
    }
  });

  it('teach each course mostly from Gradileo’s course of the same grade', () => {
    const own: Record<string, string> = { 'us-ela-grade-5': 'e5-', 'us-ela-grade-6': 'e6-', 'us-ela-grade-7': 'e7-', 'us-ela-grade-8': 'e8-', 'us-english-9': 'e9-', 'us-english-10': 'e10-', 'us-english-11': 'e11-', 'us-english-12': 'e12-' };
    for (const [id, prefix] of Object.entries(own)) {
      // Counted among the lessons of Gradileo's graded courses; the gap lessons of More English Topics come on top.
      const lessons = getCourse(id)!.lessons.filter((l) => !l.id.startsWith('ex-'));
      expect(lessons.filter((l) => l.id.startsWith(prefix)).length / lessons.length, id).toBeGreaterThan(0.6);
    }
    expect(getCourse('us-english-11')!.units.find((u) => u.title === 'Drama: Macbeth')!.lessons).toEqual(['e11-3-1', 'e11-3-2', 'e11-3-3', 'e11-3-4']);
    // Outcome codes name the course a lesson comes from.
    expect(getCourse('us-ela-grade-8')!.lessons.find((l) => l.id === 'e9-6-1')!.outcomes.every((o) => o.startsWith('English 9 '))).toBe(true);
  });

  it('offer a US learner the course of their grade, with Gradileo’s own course beside it', () => {
    const us = (grade: number) => recommendCourse({ subject: 'English', grade, curriculum: 'us' });
    expect([5, 6, 7, 8, 9, 10, 11, 12].map((g) => us(g).courseId)).toEqual(['us-ela-grade-5', 'us-ela-grade-6', 'us-ela-grade-7', 'us-ela-grade-8', 'us-english-9', 'us-english-10', 'us-english-11', 'us-english-12']);
    expect(us(11).alternatives.map((c) => c.courseId)).toEqual(['eng-20', 'us-english-10']);
    expect(us(9).alternatives.map((c) => c.courseId)).toEqual(['eng-9', 'us-ela-grade-8']);
    expect(us(5).alternatives.map((c) => c.courseId)).toEqual(['eng-5']);
    expect(us(10).prerequisite).toBe('us-english-9');
    expect(PREREQUISITE['us-ela-grade-5']).toBeNull();
    // Younger learners, and learners elsewhere, keep Gradileo’s own courses.
    expect(us(4).courseId).toBe('eng-5');
    expect(recommendCourse({ subject: 'English', grade: 10, curriculum: 'ca' }).courseId).toBe('eng-10');
  });
});
