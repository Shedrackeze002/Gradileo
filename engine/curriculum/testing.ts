/** Shared test suite for skill generators (used by generators.test.ts and per-unit work-in-progress tests). */
import { expect, it } from 'vitest';
import { gradeItem } from '../grade.ts';
import { canonicalResponses } from '../answers.ts';
import { FIGURE_TYPES, type Difficulty, type SkillDef } from '../types.ts';

export function checkSkill(s: SkillDef, seeds = Number(process.env.GEN_SEEDS ?? 60)) {
  it(`${s.id} generates valid, self-consistent items`, () => {
    const prompts = new Set<string>();
    for (const d of [1, 2, 3] as Difficulty[]) {
      for (let seed = 1; seed <= seeds; seed++) {
        const item = s.generate(seed, d);
        const ctx = `${s.id} seed=${seed} d=${d}`;
        expect(item.prompt, ctx).toBeTruthy();
        expect(item.parts.length, ctx).toBeGreaterThan(0);
        expect(item.solution.length, ctx).toBeGreaterThan(0);
        expect(item.hints.length, ctx).toBeGreaterThan(0);
        const text = JSON.stringify(item);
        // A whole word: NaNO3 (sodium nitrate) is a formula, not a leaked NaN.
        expect(/\bNaN\b/.test(text), `${ctx} contains NaN: ${text.slice(0, 400)}`).toBe(false);
        expect(/\bInfinity\b/.test(text), `${ctx} contains Infinity`).toBe(false);
        // A leaked JavaScript value shows up inside maths ($...$); "undefined" as a word (an undefined slope) is fine.
        const maths = (item.prompt + item.hints.join(' ') + item.solution.join(' ') + (item.answerDisplay ?? '')).match(/\$[^$]*\$/g) ?? [];
        expect(maths.filter((m) => /\bundefined\b/.test(m)), `${ctx} prints "undefined" in maths`).toEqual([]);
        if (item.figure) expect(FIGURE_TYPES, `${ctx} unknown figure type`).toContain(item.figure.type);
        for (const p of item.parts) {
          const a = p.answer;
          if (a.kind === 'mc') {
            expect(a.choices.some((c) => c.id === a.correct), ctx).toBe(true);
            expect(a.choices.length, `${ctx} too few choices`).toBeGreaterThanOrEqual(2);
            const mds = a.choices.map((c) => c.md + JSON.stringify(c.figure ?? ''));
            expect(new Set(mds).size, `${ctx} duplicate choices ${mds.join(' | ')}`).toBe(mds.length);
          }
          if (a.kind === 'numeric') expect(Number.isFinite(a.value), ctx).toBe(true);
        }
        const res = gradeItem(item, canonicalResponses(item));
        expect(res.correct, `${ctx} canonical answer graded wrong: ${JSON.stringify(canonicalResponses(item))} -> ${JSON.stringify(res.parts)} | ${item.prompt}`).toBe(true);
        prompts.add(JSON.stringify([item.prompt, item.figure, item.parts]));
      }
    }
    expect(prompts.size, `${s.id} has too little variety`).toBeGreaterThan(5);
  });
}
