import { describe, expect, it } from 'vitest';
import { allSkills, COURSES } from './index.ts';
import { checkSkill } from './testing.ts';

describe('every skill generator', () => {
  for (const s of allSkills()) checkSkill(s);
});

describe('money answers', () => {
  it('are graded to the cent, not with the relative allowance used for measurements', async () => {
    const loose: string[] = [];
    for (const s of allSkills()) {
      // Let the test worker report progress between skills (a long synchronous loop times it out).
      await new Promise((r) => setTimeout(r, 0));
      for (const d of [1, 2, 3] as const) {
        for (let seed = 1; seed <= 40; seed++) {
          const item = s.generate(seed, d);
          if (!/nearest cent\b/i.test(item.prompt)) continue;
          for (const p of item.parts) {
            const a = p.answer;
            // Areas (m²) and percents (a profit margin to the hundredth) are not money.
            if (a.kind !== 'numeric' || a.decimals !== 2 || /²|\^2|%/.test(`${p.suffix ?? ''}${p.label ?? ''}`)) continue;
            if (a.tolerance === undefined || a.tolerance > 0.031) loose.push(`${s.id} seed=${seed} d=${d} value=${a.value} tolerance=${a.tolerance}`);
          }
        }
      }
    }
    expect(loose.slice(0, 10)).toEqual([]);
  }, 60_000); // every skill in every course, 120 items each
});

describe('course structure', () => {
  it('every lesson skill exists and every skill belongs to its lesson', () => {
    const ids = new Set(allSkills().map((s) => s.id));
    for (const c of COURSES) {
      for (const l of c.lessons) for (const sk of l.skills) expect(ids.has(sk), `${l.id} -> ${sk}`).toBe(true);
    }
    const lessons = new Map(COURSES.filter((c) => !c.map).flatMap((c) => c.lessons.map((l) => [l.id, l] as const)));
    for (const s of allSkills()) expect(lessons.get(s.lessonId)?.skills, `${s.id} names lesson ${s.lessonId}, which does not list it`).toContain(s.id);
  });

  it('lesson and unit ids are unique across courses, and lesson outcomes exist in their course', () => {
    // A mapped course ("Algebra I") reuses other courses' lessons, so only Gradileo's own courses own lesson ids.
    const lessonIds = COURSES.filter((c) => !c.map).flatMap((c) => c.lessons.map((l) => l.id));
    expect(new Set(lessonIds).size).toBe(lessonIds.length);
    const unitIds = COURSES.flatMap((c) => c.units.map((u) => u.id));
    expect(new Set(unitIds).size).toBe(unitIds.length);
    for (const c of COURSES) {
      const codes = new Set(c.outcomes.map((o) => o.code));
      for (const l of c.lessons) for (const o of l.outcomes) expect(codes.has(o), `${l.id} outcome ${o}`).toBe(true);
    }
  });
});
