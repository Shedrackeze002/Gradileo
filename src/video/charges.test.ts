import { describe, expect, it } from 'vitest';
import { checkCharges, checkScript, type ChargeBody, type ChargesEl, type Explainer } from './script.ts';
import { chargesAt, coulombForce, electronsIn, markAt, peakForce } from './charges.ts';
import { clipSeconds, compile, stateAt } from './timeline.ts';

/** Point charges, in microcoulombs and metres. */
const points = (bodies: ChargeBody[], over: Partial<ChargesEl> = {}): ChargesEl => ({ kind: 'charges', id: 'c', bodies, view: [-1, 1, -0.5, 0.5], clips: {}, ...over });

// The lesson's two spheres: +3.0 μC and −5.0 μC, with their centres 0.30 m apart.
const pair = (over: Partial<ChargesEl> = {}) =>
  points(
    [
      { id: 'a', charge: 3, x: 0 },
      { id: 'b', charge: -5, x: 0.3 },
    ],
    { clips: { out: { phases: [{ dur: 2, to: { b: 0.6 } }] }, more: { phases: [{ dur: 1, charge: { a: 6 } }] }, again: { reset: true, phases: [{ dur: 1 }] } }, ...over },
  );

// A glass rod rubbed with silk, a metal sphere on a stand that the rod then charges, and a second sphere to share with.
const bench = (over: Partial<ChargesEl> = {}): ChargesEl => ({
  kind: 'charges',
  id: 'c',
  unit: 'nC',
  mark: 2,
  view: [-6, 6, -3, 3],
  bodies: [
    { id: 'rod', shape: 'rod', charge: 0, x: -3, y: 1, radius: 1.5, pairs: 6 },
    { id: 'silk', shape: 'cloth', charge: 0, x: -3, y: 0, radius: 1, pairs: 6 },
    { id: 'ball', shape: 'sphere', charge: 0, x: 2, y: 0, radius: 1, pairs: 6 },
    { id: 'twin', shape: 'sphere', charge: 0, x: 5, y: 0, radius: 1, pairs: 6, wire: 'left' },
  ],
  clips: {
    rub: { phases: [{ dur: 2, electrons: [{ from: 'rod', to: 'silk', n: 4 }] }] },
    near: { phases: [{ dur: 1, to: { rod: [-0.2, 0] } }] },
    touch: { phases: [{ dur: 2, electrons: [{ from: 'ball', to: 'rod', n: 2 }] }] },
    earth: { phases: [{ dur: 1, ground: { ball: true } }, { dur: 2, electrons: [{ from: 'ground', to: 'ball', n: 2 }] }, { dur: 1, ground: { ball: false } }] },
  },
  ...over,
});

const total = (el: ChargesEl, plays: Array<[string, number]>) => {
  const s = chargesAt(el, plays);
  return Object.values(s.bodies).reduce((n, b) => n + b.minus.length, 0) + s.flying.length;
};

describe("Coulomb's law", () => {
  it('finds the force between two charges from the distance between their centres', () => {
    expect(coulombForce(3.0e-6, 5.0e-6, 0.3)).toBeCloseTo(1.498, 3);
    const s = chargesAt(pair());
    expect(s.bodies.a.force.n).toBeCloseTo(1.498, 3);
    // Unlike charges attract, and the two forces of a pair are equal and opposite.
    expect(s.bodies.b.force.n).toBeCloseTo(s.bodies.a.force.n, 9);
    expect(s.bodies.a.force.angle).toBe(0);
    expect(s.bodies.b.force.angle).toBe(180);
    // Like charges repel.
    const like = chargesAt(points([{ id: 'a', charge: 2, x: 0 }, { id: 'b', charge: 4, x: 0.283 }]));
    expect(like.bodies.a.force.n).toBeCloseTo(0.9, 2);
    expect(like.bodies.a.force.angle).toBe(180);
    expect(like.bodies.b.force.angle).toBe(0);
  });

  it('follows the inverse square law as a charge is carried away, and doubles with a charge', () => {
    const near = chargesAt(pair()).bodies.a.force.n;
    expect(chargesAt(pair(), [['out', 2]]).bodies.a.force.n).toBeCloseTo(near / 4, 9);
    expect(chargesAt(pair(), [['out', 1]]).bodies.b.x).toBeCloseTo(0.45, 9);
    expect(chargesAt(pair(), [['more', 1]]).bodies.b.force.n).toBeCloseTo(near * 2, 9);
    // A clip that resets puts everything back.
    expect(chargesAt(pair(), [['out', 2], ['more', 1], ['again', 0]]).bodies.a.force.n).toBeCloseTo(near, 9);
    expect(clipSeconds(pair(), 'out')).toBe(2);
    // The longest arrow is drawn for the largest force of the element, with its clips played in order: here, the force at the start.
    expect(peakForce(pair())).toBeCloseTo(near, 9);
    expect(peakForce(pair({ clips: { more: { phases: [{ dur: 1, charge: { a: 6 } }] } } }))).toBeCloseTo(near * 2, 9);
  });

  it('adds the forces of several charges as vectors', () => {
    // A (+2.0 μC) is 0.20 m west of B (+3.0 μC), and C (+6.0 μC) is 0.40 m east of B.
    const line = chargesAt(points([{ id: 'a', charge: 2, x: -0.2 }, { id: 'b', charge: 3, x: 0 }, { id: 'c', charge: 6, x: 0.4 }]));
    expect(line.bodies.b.from.a.n).toBeCloseTo(1.3485, 4);
    expect(line.bodies.b.from.a.angle).toBe(0);
    expect(line.bodies.b.from.c.n).toBeCloseTo(1.0114, 4);
    expect(line.bodies.b.from.c.angle).toBe(180);
    expect(line.bodies.b.force.n).toBeCloseTo(0.337, 3);
    expect(line.bodies.b.force.angle).toBe(0);
    // A (+5.0 μC) at the corner, B (+2.0 μC) 0.30 m east of it and C (−3.0 μC) 0.30 m north of it.
    const corner = chargesAt(points([{ id: 'a', charge: 5, x: 0 }, { id: 'b', charge: 2, x: 0.3 }, { id: 'c', charge: -3, x: 0, y: 0.3 }]));
    expect(corner.bodies.a.from.b.n).toBeCloseTo(0.999, 3);
    expect(corner.bodies.a.from.c.n).toBeCloseTo(1.498, 3);
    expect(corner.bodies.a.force.n).toBeCloseTo(1.8, 2);
    // 56.3° north of west.
    expect(180 - corner.bodies.a.force.angle).toBeCloseTo(56.3, 1);
  });

  it('works in elementary charges and gives the field where each body is', () => {
    // The electron and the proton of a hydrogen atom.
    const atom = chargesAt(points([{ id: 'p', charge: 1, x: 0 }, { id: 'e', charge: -1, x: 5.29e-11 }], { unit: 'e' }));
    expect(atom.bodies.e.force.n / 1e-8).toBeCloseTo(8.22, 2);
    expect(electronsIn(4.8e-8) / 1e11).toBeCloseTo(3.0, 6);
    // 0.50 m from +4.0 μC the field is 1.4 × 10⁵ N/C, away from the charge; a test charge there feels qE and exerts nothing.
    const s = chargesAt(points([{ id: 'q', charge: 4, x: 0 }, { id: 't', charge: -0.002, x: 0.5, test: true }]));
    expect(s.bodies.t.field.n / 1e5).toBeCloseTo(1.438, 3);
    expect(s.bodies.t.field.angle).toBe(0);
    expect(s.bodies.t.force.n).toBeCloseTo(2.877e-4, 6);
    expect(s.bodies.t.force.angle).toBe(180);
    expect(s.bodies.q.force.n).toBe(0);
  });
});

describe('electrons that move', () => {
  it('counts the charge of a body from the electrons on it, and never loses one', () => {
    const el = bench();
    const start = chargesAt(el);
    expect(start.bodies.rod.charge).toBe(0);
    expect(start.bodies.rod.plus).toHaveLength(6);
    expect(start.bodies.rod.minus).toHaveLength(6);
    const rubbed = chargesAt(el, [['rub', 2]]);
    expect(rubbed.bodies.rod.charge).toBe(8);
    expect(rubbed.bodies.silk.charge).toBe(-8);
    expect(rubbed.bodies.silk.minus).toHaveLength(10);
    expect(rubbed.flying).toHaveLength(0);
    // Part way through, some electrons are between the two; with them the count is what it was.
    const during = chargesAt(el, [['rub', 1]]);
    expect(during.flying.length).toBeGreaterThan(0);
    expect(during.bodies.rod.charge + during.bodies.silk.charge).toBeGreaterThan(0);
    for (const t of [0, 0.3, 0.7, 1, 1.4, 1.9, 2]) expect(total(el, [['rub', t]])).toBe(24);
    // The + marks never move.
    expect(rubbed.bodies.rod.plus).toEqual(start.bodies.rod.plus);
  });

  it('charges a sphere by contact and through a ground wire', () => {
    const el = bench();
    const touched = chargesAt(el, [['rub', 2], ['near', 1], ['touch', 2]]);
    // The positive rod took electrons from the sphere: both are positive now, and the total is unchanged.
    expect(touched.bodies.rod.charge).toBe(4);
    expect(touched.bodies.ball.charge).toBe(4);
    expect(touched.bodies.rod.charge + touched.bodies.silk.charge + touched.bodies.ball.charge).toBe(0);
    // Electrons come up the wire from the ground and the sphere is neutral again.
    const plays: Array<[string, number]> = [['rub', 2], ['near', 1], ['touch', 2]];
    expect(chargesAt(el, [...plays, ['earth', 0.25]]).bodies.ball.wire).toBeCloseTo(0.5, 9);
    const rising = chargesAt(el, [...plays, ['earth', 2]]);
    expect(rising.bodies.ball.wire).toBe(1);
    expect(rising.flying.length).toBeGreaterThan(0);
    // The wire leaves the right-hand side of the sphere, and its end is below the sphere.
    expect(rising.bodies.ball.wirePath[0]).toEqual([3, 0]);
    expect(rising.bodies.ball.wirePath[2][1]).toBeLessThan(-1);
    expect(rising.bodies.twin.wirePath[0]).toEqual([4, 0]);
    const earthed = chargesAt(el, [...plays, ['earth', 4]]);
    expect(earthed.bodies.ball.charge).toBe(0);
    expect(earthed.bodies.ball.wire).toBe(0);
    expect(earthed.floor).toBeCloseTo(-1.9, 9);
  });

  it('pushes the electrons of a metal sphere away from a negative body and towards a positive one', () => {
    const el = bench();
    const mean = (pts: Array<[number, number]>) => pts.reduce((n, q) => n + q[0], 0) / pts.length;
    const alone = chargesAt(el);
    expect(alone.bodies.ball.lean).toEqual([0, 0]);
    // The rod, positive after it is rubbed, is to the left: the electrons lean left, towards it.
    const drawn = chargesAt(el, [['rub', 2], ['near', 1]]);
    expect(drawn.bodies.ball.lean[0]).toBeLessThan(-0.3);
    expect(mean(drawn.bodies.ball.minus)).toBeLessThan(mean(alone.bodies.ball.minus) - 0.2);
    expect(drawn.bodies.ball.charge).toBe(0);
    // A negative rod pushes them to the far side.
    const negative = bench({ bodies: bench().bodies.map((b) => (b.id === 'rod' ? { ...b, charge: -8 } : b)), clips: { near: bench().clips.near } });
    expect(chargesAt(negative, [['near', 1]]).bodies.ball.lean[0]).toBeGreaterThan(0.3);
    // However hard they are pushed, the electrons stay inside the sphere, and in the same order along the push.
    const ball = el.bodies[2];
    for (const lean of [0.2, 0.6, 1]) {
      const at = Array.from({ length: 9 }, (_, i) => markAt(ball, 'minus', i, 9, [lean, 0]));
      for (const [x, y] of at) expect(Math.hypot(x - 0.07, y + 0.05)).toBeLessThanOrEqual(0.76 + 1e-9);
      const before = Array.from({ length: 9 }, (_, i) => markAt(ball, 'minus', i, 9));
      const order = (pts: Array<[number, number]>) => pts.map((q, i) => [q[0], i]).sort((a, b) => a[0] - b[0]).map((q) => q[1]);
      expect(order(at)).toEqual(order(before));
    }
    // The insulators do not lean at all.
    expect(drawn.bodies.silk.lean).toEqual([0, 0]);
  });

  it('keeps the electrons of an atom in two shells that turn', () => {
    const atom: ChargeBody = { id: 'li', shape: 'atom', charge: 0, x: 0, radius: 1, pairs: 3 };
    const el = points([atom, { ...atom, id: 'f', x: 3 }], { unit: 'e', mark: 1, clips: { cross: { phases: [{ dur: 1, electrons: [{ from: 'li', to: 'f', n: 1 }] }] } } });
    const s = chargesAt(el);
    expect(s.bodies.li.minus.map(([x, y]) => Math.hypot(x, y).toFixed(2))).toEqual(['0.52', '0.52', '0.88']);
    expect(chargesAt(el, [], 1).bodies.li.minus[0]).not.toEqual(s.bodies.li.minus[0]);
    const after = chargesAt(el, [['cross', 1]]);
    expect(after.bodies.li.charge).toBe(1);
    expect(after.bodies.f.charge).toBe(-1);
    expect(after.bodies.f.minus).toHaveLength(4);
  });
});

describe('charged bodies that are free to move', () => {
  const free = (qb: number): ChargesEl =>
    points(
      [
        { id: 'a', charge: 2, x: -0.5, radius: 0.1, mass: 0.02 },
        { id: 'b', charge: qb, x: 0.5, radius: 0.1, mass: 0.02 },
      ],
      { view: [-3, 3, -1, 1], clips: { go: { phases: [{ dur: 3, fly: true }] }, back: { phases: [{ dur: 1, to: { a: -0.5, b: 0.5 } }, { dur: 1, fly: true }] } } },
    );

  it('lets like charges fly apart, keeping their energy', () => {
    const el = free(2);
    const k = 8.99e9;
    const energy = (t: number) => {
      const { a, b } = chargesAt(el, [['go', t]]).bodies;
      return 0.5 * 0.02 * (a.speed ** 2 + b.speed ** 2) + (k * 2e-6 * 2e-6) / (b.x - a.x);
    };
    const s = chargesAt(el, [['go', 1]]);
    expect(s.bodies.a.x).toBeLessThan(-0.5);
    expect(s.bodies.b.x).toBeCloseTo(-s.bodies.a.x, 9);
    expect(s.bodies.a.v[0]).toBeCloseTo(-s.bodies.b.v[0], 9);
    expect(s.time).toBe(1);
    expect(energy(1)).toBeCloseTo(energy(0), 4);
    expect(energy(3)).toBeCloseTo(energy(0), 4);
  });

  it('brings unlike charges together until they touch, and lets them go again after they are carried', () => {
    const el = free(-2);
    const s = chargesAt(el, [['go', 3]]);
    expect(s.bodies.b.x - s.bodies.a.x).toBeCloseTo(0.216, 6);
    expect(s.bodies.a.speed).toBe(0);
    const again = chargesAt(el, [['go', 3], ['back', 1.5]]);
    expect(again.bodies.a.x).toBeGreaterThan(-0.5);
    expect(again.bodies.a.speed).toBeGreaterThan(0);
  });
});

describe('a charges element in a script', () => {
  it('reports a picture that cannot be drawn', () => {
    expect(checkCharges(pair())).toEqual([]);
    expect(checkCharges(bench())).toEqual([]);
    expect(checkCharges(points([]))[0]).toMatch(/needs a body/);
    expect(checkCharges(points([{ id: 'a', charge: 1, x: 0 }, { id: 'a', charge: 1, x: 1 }]))[0]).toMatch(/share an id/);
    expect(checkCharges(points([{ id: 'force', charge: 1, x: 0 }]))[0]).toMatch(/name of a part/);
    expect(checkCharges(points([{ id: 'ground', charge: 1, x: 0 }]))[0]).toMatch(/or of the ground/);
    expect(checkCharges(points([{ id: 'a', charge: 1, x: 0 }, { id: 'b', charge: 1, x: 0 }]))[0]).toMatch(/same place/);
    expect(checkCharges(points([{ id: 'a', shape: 'sphere', charge: 0, x: 0 }]))[0]).toMatch(/needs a radius/);
    expect(checkCharges(points([{ id: 'a', charge: 1, x: 0, pairs: 3 }], { mark: 1 }))[0]).toMatch(/is a point/);
    expect(checkCharges(points([{ id: 'a', shape: 'sphere', radius: 1, charge: 0, x: 0, pairs: 3 }]))[0]).toMatch(/charge of one mark/);
    expect(checkCharges(bench({ mark: 3 }))).toEqual([]);
    expect(checkCharges(bench({ bodies: [{ id: 'ball', shape: 'sphere', radius: 1, charge: 3, x: 0, pairs: 4 }], clips: {} }))[0]).toMatch(/whole number of marks/);
    expect(checkCharges(bench({ bodies: [{ id: 'ball', shape: 'sphere', radius: 1, charge: 10, x: 0, pairs: 4 }], clips: {} }))[0]).toMatch(/too few pairs/);
    expect(checkCharges(bench({ bodies: [{ id: 'atom', shape: 'atom', radius: 1, charge: 0, x: 0, pairs: 11 }], clips: {} }))[0]).toMatch(/ten protons at most/);
    expect(checkCharges(bench({ bodies: [{ id: 'atom', shape: 'atom', radius: 1, charge: 0, x: 0 }], clips: {} }))[0]).toMatch(/number of protons/);
    expect(checkCharges(points([{ id: 'a', shape: 'rod', radius: 1, charge: 0, x: 0, wire: 'left' }]))[0]).toMatch(/only a sphere is joined/);
    expect(checkCharges(pair({ view: [5, 1, 0, 1] }))[0]).toMatch(/left, right, bottom, top/);
    expect(checkCharges(pair({ pulls: ['c'] }))[0]).toMatch(/no body "c" to draw/);
    expect(checkCharges(pair({ spans: [['a', 'c']] }))[0]).toMatch(/no body "c" to mark/);
    expect(checkCharges(pair({ poster: 'fly' }))[0]).toMatch(/no clip "fly"/);
    expect(checkCharges(pair({ clips: { go: { phases: [{ dur: 0, to: { c: 1 } }] } } }))).toHaveLength(2);
    expect(checkCharges(pair({ clips: { go: { phases: [{ dur: 1, fly: true }] } } }))[0]).toMatch(/no body has a mass/);
    expect(checkCharges(pair({ clips: { go: { phases: [{ dur: 1, electrons: [{ from: 'a', to: 'b', n: 1 }] }] } } }))[0]).toMatch(/does not show its charges/);
    const clip = (phases: ChargesEl['clips'][string]['phases']) => bench({ clips: { go: { phases } } });
    expect(checkCharges(clip([{ dur: 1, charge: { rod: 4 } }]))[0]).toMatch(/changes as electrons cross/);
    expect(checkCharges(clip([{ dur: 1, electrons: [{ from: 'rod', to: 'silk', n: 7 }] }]))[0]).toMatch(/no more electrons to give/);
    expect(checkCharges(clip([{ dur: 1, electrons: [{ from: 'ball', to: 'ground', n: 1 }] }]))[0]).toMatch(/not joined to the ground/);
    expect(checkCharges(clip([{ dur: 1, ground: { rod: true } }]))[0]).toMatch(/only a sphere is joined/);
    expect(checkCharges(clip([{ dur: 1, electrons: [{ from: 'rod', to: 'silk', n: 1 }, { from: 'silk', to: 'ball', n: 1 }] }]))[0]).toMatch(/gives and takes electrons at once/);
    expect(checkCharges(clip([{ dur: 1, electrons: [{ from: 'rod', to: 'rod', n: 1.5 }] }]))).toHaveLength(3);
    expect(() => chargesAt(pair(), [['fly', 1]])).toThrow(/no clip "fly"/);
  });

  it('plays in a script, with parts that can be shown one at a time', () => {
    const x: Explainer = {
      id: 'charges-test',
      lessonId: 'p30-2-2',
      title: 'Charges',
      summary: 'A test.',
      scenes: [
        {
          layout: 'center',
          main: [pair()],
          lines: [
            { say: 'Two charges.', show: ['c', 'c.charge'] },
            { say: 'Each pulls the other.', show: ['c.force', 'c.distance'], focus: 'c.a' },
            { say: 'Now one moves away.', show: ['c.net', 'c.angle'], play: 'c.out' },
          ],
        },
      ],
    };
    expect(checkScript(x)).toEqual([]);
    expect(checkScript({ ...x, scenes: [{ ...x.scenes[0], lines: [{ say: 'No such part.', show: ['c', 'c.field'] }] }] })[0]).toMatch(/charges "c" has no part "field"/);
    const tl = compile(x, { '0.0': 3, '0.1': 2, '0.2': 2 });
    const during = stateAt(tl, tl.lines[2].start + 1).els.c;
    expect(chargesAt(pair(), during.plays).bodies.b.x).toBeCloseTo(0.45, 6);
  });
});
