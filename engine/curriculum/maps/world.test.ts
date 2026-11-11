import { describe, expect, it } from 'vitest';
import { CURRICULUM_MAPS, getCourse, mappedCourses } from '../index.ts';
import { recommendCourse, type PlacementAnswers } from '../../placement.ts';

const maths = (curriculum: string, grade: number, more: Partial<PlacementAnswers> = {}) => recommendCourse({ subject: 'Mathematics', grade, curriculum, plan: 'university-stem', feeling: 'ok', ...more });

describe('the WAEC, Kenya, South Africa, Cambridge and IB maps', () => {
  it('give each system its own courses, and Ghana the same WASSCE courses as Nigeria', () => {
    expect(CURRICULUM_MAPS.map((m) => m.name)).toEqual(expect.arrayContaining(['WAEC (WASSCE)', 'Kenya KCSE', 'South Africa CAPS', 'Cambridge IGCSE', 'IB Diploma']));
    expect(mappedCourses('ng').map((c) => c.shortTitle)).toEqual(['WASSCE SS 1', 'WASSCE SS 2', 'WASSCE SS 3']);
    expect(mappedCourses('gh')).toEqual(mappedCourses('ng'));
    expect(mappedCourses('ke').map((c) => c.shortTitle)).toEqual(['KCSE Form 1', 'KCSE Form 2', 'KCSE Form 3', 'KCSE Form 4']);
    expect(mappedCourses('za').map((c) => c.shortTitle)).toEqual(['CAPS Grade 10', 'CAPS Grade 11', 'CAPS Grade 12']);
    expect(mappedCourses('cambridge').map((c) => c.shortTitle)).toEqual(['IGCSE Core', 'IGCSE Extended']);
    expect(mappedCourses('ib').map((c) => c.shortTitle)).toEqual(['IB AA SL', 'IB AI SL']);
    // A system without a map has no mapped courses.
    expect(mappedCourses('in')).toEqual([]);
  });

  it('use each syllabus’s own unit names, and list what Gradileo does not teach yet', () => {
    expect(getCourse('waec-ss-3')!.units.map((u) => u.title)).toEqual(expect.arrayContaining(['Surds', 'Matrices and Determinants', 'Arithmetic of Finance']));
    expect(getCourse('kcse-form-3')!.units.map((u) => u.title)).toEqual(expect.arrayContaining(['Commercial Arithmetic II', 'Formulae and Variations', 'Graphical Methods']));
    expect(getCourse('caps-grade-11')!.units.map((u) => u.title)).toEqual(expect.arrayContaining(['Exponents and Surds', 'Euclidean Geometry: Circles', 'Finance, Growth and Decay']));
    expect(getCourse('igcse-extended')!.units.map((u) => u.title)).toEqual(expect.arrayContaining(['Surds', 'Differentiation', 'Transformations and Vectors']));
    expect(getCourse('ib-aa-sl')!.units.map((u) => u.title)).toEqual(expect.arrayContaining(['Circular Functions', 'Probability Distributions', 'Integration and Kinematics']));
    expect(getCourse('waec-ss-3')!.gaps).toEqual([]);
    expect(getCourse('kcse-form-4')!.gaps).toContain('The mid-ordinate rule');
    expect(getCourse('caps-grade-12')!.gaps).toContain('The proportionality theorem');
    expect(getCourse('ib-ai-sl')!.gaps).toContain('Voronoi diagrams');
    expect(getCourse('kcse-form-1')!.gaps).toEqual([]);
  });

  it('teach the topics that More Mathematics Topics added for them', () => {
    const lessons = (id: string) => getCourse(id)!.lessons.map((l) => l.id);
    expect(getCourse('waec-ss-1')!.gaps).toEqual([]);
    expect(lessons('waec-ss-1')).toEqual(expect.arrayContaining(['mx-23-1', 'mx-23-2', 'mx-23-3', 'mx-24-1', 'mx-24-2', 'mx-25-1', 'mx-25-2']));
    expect(lessons('waec-ss-2')).toEqual(expect.arrayContaining(['mx-24-3', 'mx-25-4']));
    expect(lessons('kcse-form-2')).toEqual(expect.arrayContaining(['mx-25-1', 'mx-25-2', 'mx-25-3', 'mx-25-4']));
    expect(lessons('kcse-form-4')).toEqual(expect.arrayContaining(['mx-24-3', 'mx-25-6']));
    expect(lessons('igcse-core')).toContain('mx-24-1');
    expect(lessons('caps-grade-11')).toEqual(expect.arrayContaining(['mx-25-4', 'mx-26-1']));
    expect(lessons('caps-grade-12')).toEqual(expect.arrayContaining(['mx-26-2', 'mx-26-3']));
    expect(lessons('ib-ai-sl')).toEqual(expect.arrayContaining(['mx-26-2', 'mx-26-3']));
  });

  it('recommend the course of the learner’s year in their own system', () => {
    // Nigeria and Ghana: every senior secondary student takes General Mathematics.
    expect([10, 11, 12].map((g) => maths('ng', g).courseId)).toEqual(['waec-ss-1', 'waec-ss-2', 'waec-ss-3']);
    expect(maths('gh', 11, { year: 'SHS 2', plan: 'work' }).courseId).toBe('waec-ss-2');
    expect(maths('gh', 11, { year: 'SHS 2' }).reasons[0]).toContain('SHS 2');
    expect(maths('ng', 10).prerequisite).toBe('math-9');
    expect(maths('ng', 9).courseId).toBe('math-9');
    // Kenya: a form gets KCSE Mathematics; a grade of the new curriculum keeps Gradileo's courses.
    expect([9, 10, 11, 12].map((g) => maths('ke', g, { year: `Form ${g - 8}` }).courseId)).toEqual(['kcse-form-1', 'kcse-form-2', 'kcse-form-3', 'kcse-form-4']);
    expect(maths('ke', 10, { year: 'Grade 10' }).courseId).toBe('math-10c');
    // South Africa: Mathematics follows CAPS; other plans keep the practical courses.
    expect([10, 11, 12].map((g) => maths('za', g).courseId)).toEqual(['caps-grade-10', 'caps-grade-11', 'caps-grade-12']);
    expect(maths('za', 11).alternatives.map((c) => c.courseId)).toEqual(['caps-grade-12', 'caps-grade-10', 'math-20-3']);
    expect(maths('za', 10, { plan: 'work' }).courseId).toBe('math-10-3');
    expect(maths('za', 9).courseId).toBe('math-9');
    // Cambridge: IGCSE in Years 10 and 11, Extended unless the learner wants support.
    expect(maths('cambridge', 9).courseId).toBe('igcse-extended');
    expect(maths('cambridge', 10, { feeling: 'struggling' }).courseId).toBe('igcse-core');
    expect(maths('cambridge', 11).courseId).toBe('math-20-1');
    // IB Diploma: Analysis and Approaches for science plans, Applications and Interpretation otherwise.
    expect(maths('ib', 11).courseId).toBe('ib-aa-sl');
    expect(maths('ib', 12, { plan: 'university-other' }).courseId).toBe('ib-ai-sl');
    expect(maths('ib', 10).courseId).toBe('math-10c');
  });
});
