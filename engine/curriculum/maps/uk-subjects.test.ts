import { describe, expect, it } from 'vitest';
import { getCourse, LISTED_COURSES, mappedCourses } from '../index.ts';
import { recommendCourse } from '../../placement.ts';

const titles = (subject: string) => mappedCourses('uk').filter((c) => c.subject === subject).map((c) => c.shortTitle);

describe('the UK map’s chemistry and English courses', () => {
  it('build GCSE and A level Chemistry from chemistry lessons only', () => {
    const more = getCourse('chem-more')!;
    expect(titles('Chemistry')).toEqual(['GCSE Chemistry', 'A level Chemistry Year 12', 'A level Chemistry Year 13']);
    const own = new Set([...LISTED_COURSES.filter((c) => c.subject === 'Chemistry'), more].flatMap((c) => c.lessons.map((l) => l.id)));
    for (const c of mappedCourses('uk').filter((c) => c.subject === 'Chemistry')) {
      for (const l of c.lessons) expect(own.has(l.id), `${c.id} ${l.id}`).toBe(true);
      expect(c.gaps!.length, `${c.id} lists what it does not teach yet`).toBeGreaterThan(0);
    }
    const gcse = getCourse('uk-gcse-chemistry')!;
    expect(gcse.units.map((u) => u.title)).toEqual(expect.arrayContaining(['Quantitative Chemistry', 'Chemical Changes', 'Organic Chemistry', 'Chemical Analysis']));
    // Gaps are filled from More Chemistry Topics, an extra course that no picker lists.
    expect(more.extra).toBe(true);
    expect(LISTED_COURSES).not.toContain(more);
    for (const l of more.lessons) expect(gcse.lessons.some((x) => x.id === l.id), `GCSE Chemistry teaches ${l.id}`).toBe(true);
    expect(gcse.gaps!.some((g) => /reactivity series|Flame tests|Empirical/.test(g))).toBe(false);
    // Outcome codes name the course a lesson comes from.
    expect(gcse.lessons.find((l) => l.id === 'c30-2-8')!.outcomes.every((o) => o.startsWith('Chemistry 12 '))).toBe(true);
    expect(getCourse('uk-a-level-chemistry-1')!.units.map((u) => u.title)).toEqual(expect.arrayContaining(['Amount of Substance', 'Bonding', 'Energetics']));
    expect(getCourse('uk-a-level-chemistry-2')!.units.map((u) => u.title)).toContain('Acids and Bases');
  });

  it('build the two English GCSEs from English lessons only', () => {
    expect(titles('English')).toEqual(['GCSE English Language', 'GCSE English Literature']);
    const own = new Set(LISTED_COURSES.filter((c) => c.subject === 'English').flatMap((c) => c.lessons.map((l) => l.id)));
    for (const c of mappedCourses('uk').filter((c) => c.subject === 'English')) for (const l of c.lessons) expect(own.has(l.id), `${c.id} ${l.id}`).toBe(true);
    const literature = getCourse('uk-gcse-english-literature')!;
    expect(literature.units.find((u) => u.title === 'Shakespeare: Macbeth')!.lessons).toEqual(['e11-3-1', 'e11-3-2', 'e11-3-3', 'e11-3-4']);
    // Texts still in copyright stay a gap: Gradileo teaches from the public domain only.
    expect(literature.gaps!.some((g) => /public domain/.test(g))).toBe(true);
    expect(getCourse('uk-gcse-english-language')!.units.map((u) => u.title)).toEqual(expect.arrayContaining(['Reading Fiction: Structure', 'Writing to Present a Viewpoint', 'Technical Accuracy']));
  });

  it('offer them to a UK learner, and Gradileo’s own courses to everyone else', () => {
    const uk = (subject: string, grade: number) => recommendCourse({ subject, grade, curriculum: 'uk' });
    expect([9, 10, 11, 12].map((g) => uk('Chemistry', g).courseId)).toEqual(['uk-gcse-chemistry', 'uk-gcse-chemistry', 'uk-a-level-chemistry-1', 'uk-a-level-chemistry-2']);
    expect(uk('Chemistry', 10).prerequisite).toBeNull();
    expect(uk('Chemistry', 11).prerequisite).toBe('uk-gcse-chemistry');
    expect(uk('Chemistry', 11).alternatives.map((c) => c.courseId)).toContain('chem-20');
    expect([9, 10].map((g) => uk('English', g).courseId)).toEqual(['uk-gcse-english-language', 'uk-gcse-english-language']);
    expect(uk('English', 10).alternatives.map((c) => c.courseId)).toContain('uk-gcse-english-literature');
    expect(uk('English', 10).prerequisite).toBe('eng-9');
    // English has no A level map, and Key Stage 3 keeps the grade courses.
    expect(uk('English', 11).courseId).toBe('eng-20');
    expect(uk('English', 8).courseId).toBe('eng-8');
    expect(recommendCourse({ subject: 'Chemistry', grade: 10, curriculum: 'ng' }).courseId).toBe('chem-10');
    expect(recommendCourse({ subject: 'English', grade: 10, curriculum: 'us' }).courseId).toBe('eng-10');
  });
});
