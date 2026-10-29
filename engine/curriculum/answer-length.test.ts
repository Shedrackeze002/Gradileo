// A test-wise student learns to pick the longest choice when the right answer is usually the
// fullest one. In the English courses, where choices are sentences, the keyed answer must not stand
// out by length: wrong answers are written as fully as the right one.
import { describe, expect, it } from 'vitest';
import { COURSES, allSkills } from './index.ts';
import type { Difficulty } from '../types.ts';

const SEEDS = 60;
/** Choices shorter than this are labels ("Simile", "Act 3"), where length says nothing. */
const MIN_LENGTH = 25;
/** The keyed answer "stands out" when it is this much longer than every other choice. */
const MARGIN = 1.15;
/** At most this share of a skill's items, at each difficulty, may have a keyed answer that stands out. */
const MAX_SHARE = 0.35;

const plain = (md: string) => md.replace(/[*_`>\\]/g, '').trim();

describe('English choices', () => {
  const english = new Set(COURSES.filter((c) => c.subject === 'English').flatMap((c) => c.lessons.map((l) => l.id)));
  const skills = allSkills().filter((s) => english.has(s.lessonId));
  it('cover every English skill', () => expect(skills.length).toBeGreaterThan(0));
  for (const s of skills) {
    it(`${s.id}: the right answer is not given away by being the longest`, () => {
      for (const d of [1, 2, 3] as Difficulty[]) {
        let counted = 0;
        let standsOut = 0;
        for (let seed = 1; seed <= SEEDS; seed++) {
          for (const p of s.generate(seed, d).parts) {
            const a = p.answer;
            if (a.kind !== 'mc' || a.choices.length < 3) continue;
            const lengths = a.choices.map((c) => plain(c.md).length);
            const k = a.choices.findIndex((c) => c.id === a.correct);
            if (lengths[k] < MIN_LENGTH) continue;
            counted++;
            if (lengths[k] > MARGIN * Math.max(...lengths.filter((_, i) => i !== k))) standsOut++;
          }
        }
        if (counted < 20) continue;
        expect(standsOut / counted, `${s.id} d${d}: the keyed answer is the longest by a clear margin in ${standsOut} of ${counted} items`).toBeLessThanOrEqual(MAX_SHARE);
      }
    });
  }
});
