import { describe, expect, it } from 'vitest';
import { COURSES, CURRICULUM_MAPS, getCourse, mappedCourses } from '../index.ts';
import { recommendCourse, type PlacementAnswers } from '../../placement.ts';

const maths = (curriculum: string, grade: number, more: Partial<PlacementAnswers> = {}) => recommendCourse({ subject: 'Mathematics', grade, curriculum, plan: 'university-stem', feeling: 'ok', ...more });

describe('the WAEC, Kenya, South Africa, Cambridge and IB maps', () => {
  it('give each system its own courses, and Ghana the same WASSCE courses as Nigeria', () => {
    expect(CURRICULUM_MAPS.map((m) => m.name)).toEqual(expect.arrayContaining(['WAEC (WASSCE)', 'Kenya KCSE', 'South Africa CAPS', 'Cambridge IGCSE', 'IB Diploma']));
    expect(mappedCourses('ng').filter((c) => c.subject === 'Mathematics').map((c) => c.shortTitle)).toEqual(['WASSCE SS 1', 'WASSCE SS 2', 'WASSCE SS 3']);
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
    // More Mathematics Topics now teaches every topic these maps listed as a gap.
    for (const system of ['ng', 'ke', 'za', 'cambridge', 'ib']) for (const c of mappedCourses(system)) expect([c.id, c.gaps]).toEqual([c.id, []]);
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
    // Unit 27: the geometry theorems, vector geometry and transformation matrices.
    expect(lessons('caps-grade-10')).toContain('mx-27-1');
    expect(lessons('caps-grade-11')).toContain('mx-27-2');
    expect(lessons('caps-grade-12')).toEqual(expect.arrayContaining(['mx-27-1', 'mx-27-3']));
    expect(lessons('kcse-form-3')).toContain('mx-27-4');
    expect(lessons('kcse-form-4')).toContain('mx-27-5');
    expect(lessons('igcse-extended')).toContain('mx-27-4');
    for (const id of ['caps-grade-10', 'caps-grade-11', 'kcse-form-3', 'igcse-extended']) expect(getCourse(id)!.gaps).toEqual([]);
    // Units 28 and 29: statistics, the mid-ordinate rule and Voronoi diagrams.
    expect(lessons('caps-grade-12')).toContain('mx-28-1');
    expect(lessons('ib-aa-sl')).toEqual(expect.arrayContaining(['mx-28-1', 'mx-28-2']));
    expect(lessons('ib-ai-sl')).toEqual(expect.arrayContaining(['mx-28-1', 'mx-28-2', 'mx-28-3', 'mx-28-4', 'mx-28-5', 'mx-29-2']));
    expect(lessons('kcse-form-4')).toContain('mx-29-1');
  });

  it('build WASSCE Chemistry from chemistry lessons, with every topic taught', () => {
    const chem = mappedCourses('ng').filter((c) => c.subject === 'Chemistry');
    expect(chem.map((c) => c.shortTitle)).toEqual(['WASSCE Chemistry SS 1', 'WASSCE Chemistry SS 2', 'WASSCE Chemistry SS 3']);
    expect(chem.map((c) => c.grade)).toEqual([10, 11, 12]);
    for (const c of chem) expect([c.id, c.gaps]).toEqual([c.id, []]);
    // Every lesson comes from a chemistry course, or (for Ghana's nuclear chemistry) from Physics 30.
    const own = new Set(COURSES.filter((c) => !c.map && (c.subject === 'Chemistry' || c.id === 'phys-30')).flatMap((c) => c.lessons.map((l) => l.id)));
    for (const c of chem) for (const l of c.lessons) expect(own.has(l.id), `${c.id} ${l.id}`).toBe(true);
    // The More Chemistry lessons written for the WASSCE (units 13 to 19) are each filed in one of the three years.
    const filed = new Set(chem.flatMap((c) => c.lessons.map((l) => l.id)));
    const waecLessons = getCourse('chem-more')!.lessons.filter((l) => { const u = Number(l.unitId.slice('cx-u'.length)); return u >= 13 && u <= 19; });
    expect(waecLessons.length).toBe(30);
    for (const l of waecLessons) expect(filed.has(l.id), l.id).toBe(true);
    expect(getCourse('waec-chem-ss-3')!.units.map((u) => u.title)).toEqual(expect.arrayContaining(['Chemistry of Carbon Compounds', 'Nuclear Chemistry', 'Solubility Product']));
  });

  it('recommend the course of the learner’s year in their own system', () => {
    // Nigeria and Ghana: chemistry learners get the year of WASSCE Chemistry.
    const chemistry = (curriculum: string, grade: number, more: Partial<PlacementAnswers> = {}) => recommendCourse({ subject: 'Chemistry', grade, curriculum, ...more });
    expect([10, 11, 12].map((g) => chemistry('ng', g).courseId)).toEqual(['waec-chem-ss-1', 'waec-chem-ss-2', 'waec-chem-ss-3']);
    expect(chemistry('gh', 12, { year: 'SHS 3' }).reasons[0]).toContain('SHS 3');
    expect(chemistry('ng', 10).prerequisite).toBe('chem-9');
    expect(chemistry('ng', 11).alternatives.map((c) => c.courseId)).toEqual(['waec-chem-ss-3', 'waec-chem-ss-1']);
    expect(chemistry('ng', 9).courseId).not.toMatch(/^waec/);
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
