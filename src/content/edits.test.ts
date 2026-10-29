import { describe, expect, it } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { applyEdits, diffLines, sectionHash, splitLesson, validateSection } from './edits.ts';
import { parseLesson } from './lessonParser.ts';

const files = readdirSync(__dirname, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .flatMap((d) => {
    try {
      return readdirSync(join(__dirname, d.name, 'lessons'))
        .filter((f) => f.endsWith('.md'))
        .map((f) => join(__dirname, d.name, 'lessons', f));
    } catch {
      return [];
    }
  });

const LESSON = `Intro paragraph.

## First

Some text with $x^2$.

:::example A worked example
## not a heading inside a block
@step Do it.
:::

## Second

More text.
`;

describe('lesson edits', () => {
  it('splits every lesson file into the same sections as the parser', () => {
    expect(files.length).toBeGreaterThan(400);
    for (const f of files) {
      const raw = readFileSync(f, 'utf8');
      const split = splitLesson(raw).sections.map((s) => s.title);
      const parsed = parseLesson(raw).sections.map((s) => s.title);
      expect(split, f).toEqual(parsed);
    }
  }, 30_000); // every lesson of every course, more each time a course is added

  it('keeps headings inside ::: blocks in their section', () => {
    const { head, sections } = splitLesson(LESSON);
    expect(head.trim()).toBe('Intro paragraph.');
    expect(sections.map((s) => s.title)).toEqual(['First', 'Second']);
    expect(sections[0].text).toContain('## not a heading inside a block');
  });

  it('applies an edit to the section it was made from', () => {
    const [first] = splitLesson(LESSON).sections;
    const out = applyEdits(LESSON, [{ baseHash: first.hash, markdown: '## First, better\n\nClearer text.' }]);
    expect(out.content.sections.map((s) => s.title)).toEqual(['First, better', 'Second']);
    expect(out.sources[0]).toMatchObject({ edited: true, baseHash: first.hash });
    expect(out.content.intro).toHaveLength(1);
  });

  it('ignores edits whose section has changed in the file, and invalid edits', () => {
    const stale = applyEdits(LESSON, [{ baseHash: sectionHash('## First\n\nOld text.'), markdown: '## X\n\nY' }]);
    expect(stale.content.sections[0].title).toBe('First');
    const [first] = splitLesson(LESSON).sections;
    const broken = applyEdits(LESSON, [{ baseHash: first.hash, markdown: '## First\n\n:::tip\nnever closed' }]);
    expect(broken.content.sections[0].title).toBe('First');
    expect(broken.sources.every((s) => !s.edited)).toBe(true);
  });

  it('checks a proposed section', () => {
    expect(validateSection('## Title\n\nText.')).toBeNull();
    expect(validateSection('Text without a heading.')).toMatch(/heading/);
    expect(validateSection('## One\n\nA\n\n## Two\n\nB')).toMatch(/one section/);
    expect(validateSection('## T\n\n:::video javascript:alert(1) Bad\n:::')).toMatch(/https/);
    expect(validateSection('## T\n\n:::check no-such-skill 2\n:::', () => false)).toMatch(/no skill/);
  });

  it('diffs lines', () => {
    expect(diffLines('a\nb\nc', 'a\nB\nc')).toEqual([
      { kind: 'same', text: 'a' },
      { kind: 'removed', text: 'b' },
      { kind: 'added', text: 'B' },
      { kind: 'same', text: 'c' },
    ]);
  });
});
