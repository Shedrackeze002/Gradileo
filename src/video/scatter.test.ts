import { describe, expect, it } from 'vitest';
import { checkScatter, fateOf, fireTimes, scatterAt, shotsOf, startsOf } from './scatter.ts';
import type { ScatterEl } from './script.ts';

const foil = (over: Partial<ScatterEl> = {}): ScatterEl => ({
  kind: 'scatter',
  id: 'g',
  shots: 24,
  close: [
    { shot: 14, miss: 0.03 },
    { shot: 17, miss: -0.0005 },
    { shot: 20, miss: 0.008 },
  ],
  clips: { first: { phases: [{ dur: 7, fire: 10 }, { dur: 5 }] }, rest: { phases: [{ dur: 9, fire: 14 }, { dur: 5 }] } },
  ...over,
});

describe('scatter: alpha particles at gold foil', () => {
  it('sends every shot that keeps clear of the nuclei straight through', () => {
    const shots = shotsOf(foil());
    shots.forEach((s, i) => {
      if (![14, 17, 20].includes(i)) expect(fateOf(s.angle)).toBe('through');
    });
  });

  it('turns a near miss aside and throws a head-on shot back', () => {
    const shots = shotsOf(foil());
    expect(fateOf(shots[14].angle)).toBe('turned');
    expect(fateOf(shots[20].angle)).toBe('turned');
    expect(shots[17].angle).toBeGreaterThan(150);
    // The closer the miss, the more it is turned.
    expect(shots[20].angle).toBeGreaterThan(shots[14].angle);
  });

  it('starts every shot inside the beam', () => {
    for (const y of startsOf(foil())) {
      expect(y).toBeGreaterThan(1.5);
      expect(y).toBeLessThan(7.5);
    }
  });

  it('fires the shots in order through each clip, and keeps a shot that has left', () => {
    const el = foil();
    expect(fireTimes(el, [['first', 0]]).filter((t) => t !== undefined)).toHaveLength(0);
    expect(fireTimes(el, [['first', 7]]).filter((t) => t !== undefined)).toHaveLength(10);
    const end = scatterAt(el, [['first', 12], ['rest', 14]]);
    expect(end.shots).toHaveLength(24);
    expect(end.shots.every((s) => s.at === null && s.fate !== null)).toBe(true);
    expect(end.shots.filter((s) => s.fate === 'back')).toHaveLength(1);
  });

  it('checks the shots, columns and close misses', () => {
    expect(checkScatter(foil())).toEqual([]);
    expect(checkScatter(foil({ shots: 5 }))).toContain('a close shot (14) is not one of the shots.');
    expect(checkScatter(foil({ close: [{ shot: 1, miss: 0.5 }] }))).toEqual(["a close shot's miss must be under 0.32, or it is not close."]);
    expect(checkScatter(foil({ shots: 20, close: [] }))).toEqual(['the clips fire 24 shots, but there are only 20.']);
  });
});
