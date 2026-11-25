import { describe, expect, it } from 'vitest';
import { checkHalflife, type HalflifeEl } from './script.ts';
import { amountLeft, decayMoments, halfLives, halflifeAt, nucleiLeft, shareLeft, tidy, videoTimeOf } from './halflife.ts';

const el = (more: Partial<HalflifeEl> = {}): HalflifeEl => ({ kind: 'halflife', id: 'a', halfLife: 8, clips: { a: { phases: [{ dur: 4 }, { dur: 8, to: 16 }] } }, ...more });

describe('the numbers of the lessons', () => {
  it('halves the amount in every half-life', () => {
    expect(shareLeft(0, 8)).toBe(1);
    expect(shareLeft(8, 8)).toBe(0.5);
    expect(shareLeft(24, 8)).toBe(0.125);
    // 80 mg of iodine-131 after 24 days, and 200 g of cobalt-60 after 12 years.
    expect(amountLeft(el({ amount: 80 }), 24)).toBeCloseTo(10, 10);
    expect(amountLeft(el({ halfLife: 5.3, amount: 200 }), 12)).toBeCloseTo(41.63, 2);
    // 400 MBq of technetium-99m after 15 hours.
    expect(amountLeft(el({ halfLife: 6, amount: 400 }), 15)).toBeCloseTo(70.7, 1);
    // With no amount, it is a share of 1.
    expect(amountLeft(el(), 8)).toBe(0.5);
  });

  it('counts the half-lives between two amounts', () => {
    expect(halfLives(400, 50)).toBeCloseTo(3, 10);
    expect(halfLives(20, 2.5) * 5730).toBeCloseTo(17190, 6);
    expect(halfLives(20, 12.5)).toBeCloseTo(0.6781, 4);
    expect(halfLives(20, 12.5) * 5730).toBeCloseTo(3885, 0);
  });

  it('writes a number as the lessons do', () => {
    expect(tidy(100)).toBe('100');
    expect(tidy(41.630001)).toBe('41.63');
    expect(tidy(12.5)).toBe('12.5');
    expect(tidy(17190)).toBe('17\u2009190');
    expect(tidy(5730)).toBe('5730');
    expect(tidy(2.26, 1)).toBe('2.3');
    expect(tidy(8, 1)).toBe('8');
  });
});

describe('the nuclei of a sample', () => {
  it('gives every nucleus a moment of its own, and half of them one in the first half-life', () => {
    const moments = decayMoments(400);
    expect(moments).toHaveLength(400);
    expect(new Set(moments).size).toBe(400);
    expect(moments.every((m) => m > 0)).toBe(true);
    for (const n of [1, 2, 3, 4]) expect(moments.filter((m) => m > n).length).toBe(400 / 2 ** n);
    // The same sample every time, and another one for another salt.
    expect(decayMoments(400)).toBe(moments);
    expect(decayMoments(400, 1)).not.toEqual(moments);
  });

  it('decays in no order: the first to go are spread through the sample', () => {
    const moments = decayMoments(400);
    const early = moments.map((m, i) => [m, i]).filter(([m]) => m <= 1).map(([, i]) => i);
    expect(early).toHaveLength(200);
    // About half of them are in each half of the sample, and about a quarter in each quarter.
    for (let q = 0; q < 4; q++) {
      const here = early.filter((i) => Math.floor(i / 100) === q).length;
      expect(here).toBeGreaterThan(35);
      expect(here).toBeLessThan(65);
    }
  });

  it('counts the nuclei that are left', () => {
    expect(nucleiLeft(el(), 0)).toBe(400);
    expect(nucleiLeft(el(), 8)).toBe(200);
    expect(nucleiLeft(el(), 16)).toBe(100);
    expect(nucleiLeft(el(), 40)).toBe(12);
    expect(nucleiLeft(el({ count: 100 }), 8)).toBe(50);
    // Between half-lives it stays close to the decay equation.
    for (const t of [3, 11, 20, 29]) expect(Math.abs(nucleiLeft(el(), t) - 400 * shareLeft(t, 8))).toBeLessThanOrEqual(1);
  });
});

describe('a sample through its clips', () => {
  it('runs its clock steadily through a phase that has a time to reach', () => {
    const e = el();
    expect(halflifeAt(e).clock).toBe(0);
    expect(halflifeAt(e, [['a', 3]]).clock).toBe(0);
    expect(halflifeAt(e, [['a', 8]]).clock).toBeCloseTo(8, 10);
    expect(halflifeAt(e, [['a', 12]]).clock).toBe(16);
    expect(halflifeAt(e, [['a', 30]])).toMatchObject({ clock: 16, time: 12 });
    // A second clip carries on from where the first one stopped.
    const two = el({ clips: { a: { phases: [{ dur: 4, to: 8 }] }, b: { phases: [{ dur: 2 }, { dur: 4, to: 24 }] } } });
    expect(halflifeAt(two, [['a', 4], ['b', 4]]).clock).toBeCloseTo(16, 10);
    expect(halflifeAt(two, [['a', 4], ['b', 6]]).runs).toHaveLength(2);
    expect(halflifeAt(el({ start: 8 })).clock).toBe(8);
  });

  it('knows when the clock passed a time, for the flash of a decay', () => {
    const st = halflifeAt(el(), [['a', 8]]);
    // The clock reaches 4 days after 4 + 2 seconds.
    expect(videoTimeOf(st, 4)).toBeCloseTo(6, 10);
    expect(videoTimeOf(st, 8)).toBeCloseTo(8, 10);
    // It has not reached 12 days yet.
    expect(videoTimeOf(st, 12)).toBeUndefined();
    expect(videoTimeOf(halflifeAt(el(), [['a', 12]]), 12)).toBeCloseTo(10, 10);
    expect(videoTimeOf(st, 0)).toBeUndefined();
  });
});

describe('checking a sample', () => {
  it('passes the pictures of the lessons', () => {
    expect(checkHalflife(el())).toEqual([]);
    expect(checkHalflife(el({ halfLife: 5730, unit: 'years', name: 'carbon-14', amount: 20, amountUnit: 'per minute', amountName: 'Decays in each gram of carbon', span: 4, poster: 'a', posterAt: 1, thumb: ['graph', 'halves'] }))).toEqual([]);
  });

  it('finds what does not belong', () => {
    expect(checkHalflife(el({ halfLife: 0 })).length).toBeGreaterThan(0);
    expect(checkHalflife(el({ count: 2.5 })).length).toBeGreaterThan(0);
    expect(checkHalflife(el({ span: 0 })).length).toBeGreaterThan(0);
    expect(checkHalflife(el({ amount: -1 })).length).toBeGreaterThan(0);
    expect(checkHalflife(el({ every: 2 })).join(' ')).toMatch(/marks of the time axis/);
    expect(checkHalflife(el({ every: 4 }))).toEqual([]);
    expect(checkHalflife(el({ poster: 'z' })).join(' ')).toMatch(/poster/);
    expect(checkHalflife(el({ clips: { a: { phases: [] } } })).join(' ')).toMatch(/no phases/);
    // The clock only runs forwards.
    expect(checkHalflife(el({ clips: { a: { phases: [{ dur: 4, to: 16 }, { dur: 4, to: 8 }] } } })).length).toBeGreaterThan(0);
  });
});
