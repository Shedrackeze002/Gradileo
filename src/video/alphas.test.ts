import { describe, expect, it } from 'vitest';
import { checkAlphas, type AlphasEl } from './script.ts';
import { FM, SPIN, alphasAt, closest, energyFor, fallRadius, fallTurn, forceAt, kindOf, kinetic, MEV, nearest, pathPast, ringAngle, turned, whereAt } from './alphas.ts';

const el = (more: Partial<AlphasEl> = {}): AlphasEl => ({ kind: 'alphas', id: 'a', picture: 'head', clips: { a: { phases: [{ dur: 4, fire: [0] }] } }, ...more });

describe('the distance of closest approach', () => {
  it('gives the numbers of the lesson', () => {
    expect(closest(79, 5.0) / 1e-14).toBeCloseTo(4.55, 2);
    expect(kinetic(1.6e7) / 1e-13).toBeCloseTo(8.5, 2);
    expect(closest(79, kinetic(1.6e7) / MEV) / 1e-14).toBeCloseTo(4.28, 2);
    expect(energyFor(47, 3.0e-14)).toBeCloseTo(4.5, 1);
    expect(forceAt(79, 5.0e-14)).toBeCloseTo(14.5, 1);
  });

  it('is half as far for twice the energy, and further from a nucleus with more protons', () => {
    expect(closest(79, 10) / closest(79, 5)).toBeCloseTo(0.5, 12);
    expect(closest(79, 5) / closest(47, 5)).toBeCloseTo(79 / 47, 12);
    expect(energyFor(79, closest(79, 7.7))).toBeCloseTo(7.7, 10);
  });
});

describe('the path of an alpha particle', () => {
  it('stops at the distance of closest approach when it is aimed straight at the nucleus, and comes back', () => {
    const d = closest(79, 5) / FM;
    const steps = pathPast(0, d, 400);
    expect(nearest(steps) / d).toBeCloseTo(1, 2);
    const last = steps[steps.length - 1];
    expect(last[0]).toBeLessThan(-400);
    expect(Math.abs(last[1])).toBeLessThan(1e-9);
    expect(turned(0, d)).toBe(180);
  });

  it('is turned through 2 atan(d ÷ 2b) when it is aimed to miss by b', () => {
    const d = 45.5;
    for (const miss of [10, 22.75, 60, 200, -60]) {
      const steps = pathPast(miss, d, 30000);
      const [a, b] = [steps[steps.length - 2], steps[steps.length - 1]];
      const heading = (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI;
      expect(Math.abs(heading)).toBeCloseTo(turned(miss, d), 0);
      // It is pushed away from the nucleus, to the side it was aimed at.
      expect(Math.sign(heading)).toBe(Math.sign(miss));
    }
    expect(turned(22.75, 45.5)).toBeCloseTo(90, 9);
    expect(turned(2000, 45.5)).toBeLessThan(1.5);
  });

  it('keeps its energy: kinetic and potential energy add up to the same all the way', () => {
    const d = 45.5;
    const steps = pathPast(30, d, 600);
    for (let i = 50; i < steps.length - 1; i += Math.ceil(steps.length / 40)) {
      const [x0, y0, t0] = steps[i - 1];
      const [x1, y1, t1] = steps[i + 1];
      const speed = Math.hypot(x1 - x0, y1 - y0) / (t1 - t0);
      const r = Math.hypot(steps[i][0], steps[i][1]);
      expect(0.5 * speed * speed + d / 2 / r).toBeCloseTo(0.5, 2);
    }
  });

  it('is found at a time by its place along the steps', () => {
    const steps = pathPast(40, 45.5, 500);
    expect(whereAt(steps, 0).at).toEqual([steps[0][0], steps[0][1]]);
    const mid = whereAt(steps, steps[200][2]);
    expect(mid.at[0]).toBeCloseTo(steps[200][0], 9);
    expect(mid.done).toBe(false);
    expect(whereAt(steps, 1e9).done).toBe(true);
  });
});

describe('the foil of the experiment', () => {
  it('lets most alpha particles straight through, turns some aside and a few back', () => {
    const tally = { through: 0, aside: 0, back: 0 };
    for (let n = 1; n <= 4000; n++) tally[kindOf(ringAngle(n))]++;
    expect(tally.through / 4000).toBeGreaterThan(0.75);
    expect(tally.aside / 4000).toBeGreaterThan(0.1);
    expect(tally.back / 4000).toBeGreaterThan(0.01);
    expect(tally.back / 4000).toBeLessThan(0.035);
    // The same particle does the same thing every time.
    expect(ringAngle(17)).toBe(ringAngle(17));
    let none = 0;
    for (let n = 1; n <= 500; n++) if (kindOf(ringAngle(n, 0)) === 'back') none++;
    expect(none).toBe(0);
  });
});

describe('a picture and its clips', () => {
  it('fires the particles a phase lists, evenly through it', () => {
    const past = el({ picture: 'past', clips: { a: { phases: [{ dur: 2 }, { dur: 6, fire: [300, 100, -40] }] } } });
    expect(alphasAt(past).sent).toEqual([]);
    expect(alphasAt(past, [['a', 2.5]]).sent).toEqual([]);
    const all = alphasAt(past, [['a', 8]]).sent;
    expect(all.map((shot) => shot.miss)).toEqual([300, 100, -40]);
    expect(all.map((shot) => shot.at)).toEqual([3, 5, 7]);
    expect(all[0]).toMatchObject({ n: 1, mev: 5, z: 79 });
  });

  it('sends a stream at a rate, and slides the energy and changes the nucleus', () => {
    const ring = el({ picture: 'ring', rate: 0, clips: { a: { phases: [{ dur: 1 }, { dur: 10, rate: 8 }] }, b: { phases: [{ dur: 5 }] } } });
    expect(alphasAt(ring, [['a', 1]]).sent.length).toBe(0);
    const some = alphasAt(ring, [['a', 11], ['b', 5]]);
    expect(some.rate).toBe(8);
    expect(some.sent.length).toBeGreaterThan(70);
    expect(some.sent.length).toBeLessThan(90);
    expect(some.sent.map((shot) => shot.n)).toEqual(some.sent.map((_, i) => i + 1));
    const head = el({ clips: { a: { phases: [{ dur: 4, fire: [0] }, { dur: 4, mev: 10 }, { dur: 4, z: 47, name: 'Silver', fire: [0] }] } } });
    expect(alphasAt(head, [['a', 6]]).mev).toBeCloseTo(7.5, 9);
    const end = alphasAt(head, [['a', 12]]);
    expect(end).toMatchObject({ mev: 10, z: 47, name: 'Silver' });
    expect(end.sent[1]).toMatchObject({ mev: 10, z: 47 });
  });
});

describe("Rutherford's atom", () => {
  it('turns its electron steadily, then faster and faster as it falls in', () => {
    const atom = el({ picture: 'orbit', clips: { a: { phases: [{ dur: 4 }, { dur: 8, fall: true }, { dur: 2 }] } } });
    expect(alphasAt(atom, [['a', 4]]).turn).toBeCloseTo(SPIN * 4, 9);
    const half = alphasAt(atom, [['a', 8]]);
    expect(half.fall).toBeCloseTo(0.5, 9);
    // An electron that radiates loses r³ at a steady rate, and turns at a rate that goes as r^(−3/2).
    expect(fallRadius(half.fall) ** 3).toBeCloseTo(0.5, 9);
    const soon = alphasAt(atom, [['a', 8.001]]);
    expect((soon.turn - half.turn) / 0.001).toBeCloseTo(SPIN / fallRadius(0.5) ** 1.5, 1);
    const end = alphasAt(atom, [['a', 14]]);
    expect(end.fall).toBe(1);
    expect(fallRadius(1)).toBe(0);
    expect(end.turn).toBeCloseTo(SPIN * 4 + fallTurn(1, 8), 9);
  });
});

describe('checking a picture of alpha particles', () => {
  it('passes each picture', () => {
    expect(checkAlphas(el())).toEqual([]);
    expect(checkAlphas(el({ picture: 'pudding', clips: { a: { phases: [{ dur: 5 }] } } }))).toEqual([]);
    expect(checkAlphas(el({ picture: 'pudding', rate: 0, clips: { a: { phases: [{ dur: 5, rate: 6 }] } } }))).toEqual([]);
    expect(checkAlphas(el({ picture: 'ring', rate: 4, back: 0.03, clips: { a: { phases: [{ dur: 5, rate: 12 }] } } }))).toEqual([]);
    expect(checkAlphas(el({ picture: 'past', span: 800, clips: { a: { phases: [{ dur: 5, fire: [200, -30] }] } } }))).toEqual([]);
    expect(checkAlphas(el({ picture: 'orbit', electrons: 3, clips: { a: { phases: [{ dur: 5 }, { dur: 5, fall: true }] } } }))).toEqual([]);
  });

  it('refuses a rate where particles are fired one by one, an aim to the side of a head picture, and options of another picture', () => {
    expect(checkAlphas(el({ rate: 3 })).join(' ')).toContain('one by one');
    expect(checkAlphas(el({ clips: { a: { phases: [{ dur: 3, fire: [20] }] } } })).join(' ')).toContain('straight for the nucleus');
    expect(checkAlphas(el({ span: 500 })).join(' ')).toContain('only a past picture');
    expect(checkAlphas(el({ picture: 'past', scale: 3 })).join(' ')).toContain('only a head picture');
    expect(checkAlphas(el({ picture: 'pudding', clips: { a: { phases: [{ dur: 3, rate: 5 }] } } })).join(' ')).toContain('was not given one');
    expect(checkAlphas(el({ picture: 'pudding', clips: { a: { phases: [{ dur: 3, fire: [0] }] } } })).join(' ')).toContain('no source');
    expect(checkAlphas(el({ clips: { a: { phases: [{ dur: 3, fall: true }] } } })).join(' ')).toContain('only an orbit picture');
    expect(checkAlphas(el({ picture: 'orbit', clips: { a: { phases: [{ dur: 3, fire: [0] }] } } })).join(' ')).toContain('has none');
    expect(checkAlphas(el({ electrons: 2 })).join(' ')).toContain('from 1 to 4');
    expect(checkAlphas(el({ mev: 0 })).join(' ')).toContain('more than zero');
    expect(checkAlphas(el({ z: 2.5 })).join(' ')).toContain('whole number');
    expect(checkAlphas(el({ thumb: ['nothing' as never] })).join(' ')).toContain('not a part');
  });
});
