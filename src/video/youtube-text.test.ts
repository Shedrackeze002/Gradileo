import { describe, expect, it } from 'vitest';
import { getCourse } from '../../engine/curriculum/index.ts';
import { levelOf, youtubeFields, youtubeText } from './youtube-text.ts';

const video = { title: 'Percents of Money, Part 1: Percent of an Amount and Tips', summary: 'Finding a percent of an amount.', lessonId: 'm104-3-3' };
const chapters = [
  { title: 'Introduction', t: 0 },
  { title: 'Tips', t: 63 },
  { title: 'Summary', t: 129 },
];

describe('youtubeText', () => {
  const text = youtubeText(video, chapters);
  const lines = text.split('\n');

  it('leads the title with the topic and names no course', () => {
    expect(lines[1]).toBe('Percents of Money, Part 1: Percent of an Amount and Tips | Gradileo');
    expect(lines[0]).toBe(`TITLE (${lines[1].length}/100 characters)`);
  });

  it('gives the topic and the level in words used around the world', () => {
    expect(text).toContain('Topic: Decimals, Percents and Money');
    expect(text).toContain('Level: Grade 10 / Year 11 · everyday mathematics');
    expect(text).toContain('Chapters\n0:00 Introduction\n1:03 Tips\n2:09 Summary');
  });

  it('names the course by its grade and stream, and no province or course code', () => {
    expect(text).toContain('Course\nGrade 10 Mathematics: Essentials, lesson 3.3: Percent in Everyday Life');
    expect(text).not.toMatch(/Alberta|10-4/);
  });

  it('keeps commas out of tags, since YouTube splits tags at commas', () => {
    const tags = lines[lines.indexOf('TAGS') + 1].split(', ');
    expect(tags).toContain('Decimals Percents and Money');
    expect(tags).toContain('Year 11 maths');
    expect(new Set(tags).size).toBe(tags.length);
  });

  it('drops the brand from a title that would pass 100 characters, and leaves out empty chapters', () => {
    const long = youtubeText({ ...video, title: 'A'.repeat(95) }, null);
    expect(long.split('\n')[1]).toBe('A'.repeat(95));
    expect(long).not.toContain('Chapters');
  });
});

describe('youtubeFields', () => {
  it('gives the same title, description and tags as the text file', () => {
    const f = youtubeFields(video, chapters);
    const text = youtubeText(video, chapters);
    expect(text).toContain(`${f.title}\n\nDESCRIPTION\n${f.description}\n\nTAGS\n${f.tags.join(', ')}`);
  });

  it('describes a video about Gradileo itself with its own tags and no course', () => {
    const f = youtubeFields({ title: 'A Math Platform for Students, Teachers and Parents', summary: 'A tour of Gradileo.', lessonId: '', tags: ['AI tutor', 'report cards'] }, chapters);
    expect(f.description).toContain('Try Gradileo: https://gradileo.com/');
    expect(f.description).not.toMatch(/Topic:|Level:|Curriculum|Practise this topic/);
    expect(f.description).toMatch(/^A tour of Gradileo\.\n\nChapters\n/);
    expect(f.tags).toEqual(['Gradileo', 'math', 'maths', 'explainer', 'AI tutor', 'report cards']);
  });

  it('swaps the "<" and ">" that YouTube refuses for full-width signs', () => {
    const f = youtubeFields({ ...video, title: 'When x < 2', summary: 'Solve 0° ≤ θ < 360° and |r| > 1.' }, null);
    expect(f.title).toBe('When x ＜ 2 | Gradileo');
    expect(f.description).toContain('Solve 0° ≤ θ ＜ 360° and |r| ＞ 1.');
    expect(f.description).not.toMatch(/[<>]/);
  });
});

describe('levelOf', () => {
  it('names the grade, the UK year and the kind of course', () => {
    expect(levelOf(getCourse('math-30-1')!)).toBe('Grade 12 / Year 13 · pre-calculus');
    expect(levelOf(getCourse('math-7')!)).toBe('Grade 7 / Year 8 · mathematics');
  });
});
