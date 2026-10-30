import { describe, expect, it } from 'vitest';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { checkLessonFile } from './testing.ts';
import { getSkill, COURSES } from '@engine/curriculum/index.ts';

// Each course keeps its lessons in src/content/<folder>/lessons/<lesson-id>.md.
const files = readdirSync(__dirname, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .flatMap((d) => {
    const dir = join(__dirname, d.name, 'lessons');
    try {
      return readdirSync(dir)
        .filter((f) => f.endsWith('.md'))
        .map((f) => ({ id: f.replace('.md', ''), path: join(dir, f), label: `${d.name}/${f}` }));
    } catch {
      return [];
    }
  });

// The lessons as their own courses list them (a mapped course files them under its own units).
const lessonMeta = new Map(COURSES.filter((c) => !c.map).flatMap((c) => c.lessons.map((l) => [l.id, l] as const)));

describe('lesson content', () => {
  for (const course of COURSES) {
    it(`${course.id} has a lesson file for every lesson`, () => {
      const ids = new Set(files.map((f) => f.id));
      for (const l of course.lessons) expect(ids.has(l.id), l.id).toBe(true);
    });
  }
  it('every lesson file belongs to a course', () => {
    for (const f of files) expect(lessonMeta.has(f.id), f.label).toBe(true);
  });
  for (const f of files) {
    it(`${f.label} parses, references real skills, and practises every lesson skill`, () => {
      const meta = lessonMeta.get(f.id);
      expect(meta, `${f.label} is not in any course`).toBeTruthy();
      checkLessonFile(f.path, meta!, (id) => !!getSkill(id), f.label);
    });
  }
});
