import { describe, expect, it } from 'vitest';
import { checkCharges, checkScript, type ChargeBody, type ChargesEl, type Explainer } from './script.ts';
import { chargesAt, coulombForce, electronsIn, fieldLines, markAt, peakForce, peaksOf } from './charges.ts';
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

describe('the electric field', () => {
  it('gives the field of each charge where a test charge is, and adds them as vectors', () => {
    // The lesson's sphere: +4.0 μC, and a point 0.50 m from it.
    const one = chargesAt(points([{ id: 'q', charge: 4, x: 0 }, { id: 'p', charge: 0, x: 0.5, test: true }])).bodies.p;
    expect(one.field.n).toBeCloseTo(143840, 0);
    expect(one.field.angle).toBeCloseTo(0, 6);
    expect(one.force.n).toBe(0);
    // Half way between +6.0 μC and +2.0 μC that are 0.60 m apart: the fields are opposite.
    const mid = points([{ id: 'a', charge: 6, x: 0 }, { id: 'b', charge: 2, x: 0.6 }, { id: 'p', charge: 0, x: 0.3, test: true }], { clips: { flip: { phases: [{ dur: 1, charge: { b: -2 } }] } } });
    const p = chargesAt(mid).bodies.p;
    expect(p.fields.a.n / 1e5).toBeCloseTo(5.993, 3);
    expect(p.fields.b.n / 1e5).toBeCloseTo(1.998, 3);
    expect(p.field.n / 1e5).toBeCloseTo(3.996, 3);
    expect(p.field.angle).toBeCloseTo(0, 6);
    // With B negative, both fields point towards B and add.
    expect(chargesAt(mid, [['flip', 1]]).bodies.p.field.n / 1e5).toBeCloseTo(7.991, 3);
    expect(peaksOf(mid).field / 1e5).toBeCloseTo(7.991, 3);
    // +2.0 μC and +8.0 μC that are 0.90 m apart: the field is zero 0.30 m from the smaller one.
    expect(chargesAt(points([{ id: 'a', charge: 2, x: 0 }, { id: 'b', charge: 8, x: 0.9 }, { id: 'p', charge: 0, x: 0.3, test: true }])).bodies.p.field.n).toBeLessThan(1e-6);
    // A test charge takes no part in the field of the others.
    expect(chargesAt(points([{ id: 'q', charge: 4, x: 0 }, { id: 't', charge: 2, x: 0.25, test: true }, { id: 'p', charge: 0, x: 0.5, test: true }])).bodies.p.field.n).toBeCloseTo(143840, 0);
  });

  it('puts a charge in a uniform field: F = qE, along the field or against it', () => {
    const el = points([{ id: 't', charge: 2, x: 0, test: true }, { id: 'e', charge: -1.6e-13, x: 0.5, test: true }], { uniform: { field: 15000, angle: 90 } });
    const { t, e } = chargesAt(el).bodies;
    expect(t.field.n).toBeCloseTo(15000, 6);
    expect(t.from.field.n).toBeCloseTo(0.03, 9);
    expect(t.from.field.angle).toBeCloseTo(90, 6);
    expect(e.from.field.angle).toBeCloseTo(-90, 6);
  });

  it('draws field lines out of positive charges and into negative ones', () => {
    const lines = (bodies: ChargeBody[]) => {
      const el = points(bodies, { view: [-1, 1, -0.6, 0.6] });
      return fieldLines(el, chargesAt(el));
    };
    // One positive charge: twelve straight lines, all leaving the picture.
    const alone = lines([{ id: 'a', charge: 3, x: 0 }]);
    expect(alone).toHaveLength(12);
    expect(alone.every((l) => l.from === 0 && l.to === null)).toBe(true);
    const [x, y] = alone[1].points[alone[1].points.length - 1];
    expect(Math.atan2(y, x)).toBeCloseTo(Math.PI / 6, 6);
    // One negative charge: the lines come in from outside.
    const sink = lines([{ id: 'a', charge: -3, x: 0 }]);
    expect(sink).toHaveLength(12);
    expect(sink.every((l) => l.from === null && l.to === 0)).toBe(true);
    expect(Math.hypot(...sink[0].points[0])).toBeGreaterThan(0.5);
    // A dipole: twelve lines leave and twelve arrive, and most of them join the two charges.
    const dipole = lines([{ id: 'a', charge: 3, x: -0.4 }, { id: 'b', charge: -3, x: 0.4 }]);
    expect(dipole.filter((l) => l.from === 0)).toHaveLength(12);
    expect(dipole.filter((l) => l.to === 1)).toHaveLength(12);
    expect(dipole.filter((l) => l.from === 0 && l.to === 1).length).toBeGreaterThanOrEqual(7);
    // Two like charges: no line of one ends on the other. A charge a third as large has a third of the lines.
    const like = lines([{ id: 'a', charge: 6, x: -0.4 }, { id: 'b', charge: 2, x: 0.4 }]);
    expect(like.filter((l) => l.from === 0)).toHaveLength(12);
    expect(like.filter((l) => l.from === 1)).toHaveLength(4);
    expect(like.every((l) => l.to === null)).toBe(true);
    // A test charge has no lines of its own.
    expect(lines([{ id: 'a', charge: 3, x: 0 }, { id: 'p', charge: 1, x: 0.4, test: true }])).toHaveLength(12);
  });
});

describe('the field lines of two like charges', () => {
  it('ends the two lines on the axis at the point of no field, with the picture the same above and below', () => {
    const like = points([{ id: 'a', charge: 3, x: -0.3 }, { id: 'b', charge: 3, x: 0.3 }], { view: [-0.9, 0.9, -0.34, 0.34], lines: 16 });
    const lines = fieldLines(like, chargesAt(like));
    const ends = lines.map((l) => l.points[l.points.length - 1]);
    // The line each charge sends at the other stays on the axis and stops short of the middle.
    const inner = lines.filter((l) => l.points.every(([, y]) => y === 0) && Math.abs(l.points[l.points.length - 1][0]) < 0.3);
    expect(inner).toHaveLength(2);
    for (const l of inner) expect(Math.abs(l.points[l.points.length - 1][0])).toBeLessThan(0.02);
    // As many lines end above the axis as below it.
    expect(ends.filter(([, y]) => y > 1e-9).length).toBe(ends.filter(([, y]) => y < -1e-9).length);
  });
});

describe('parallel plates', () => {
  // The lesson's plates: 600 V across 3.0 cm, the positive one on the left, with a proton between them.
  const PROTON = 1.67e-27;
  const ELECTRON = 9.11e-31;
  const plates = (over: Partial<ChargesEl> = {}, bodies: ChargeBody[] = [{ id: 'p', charge: 1, x: 0.01, mass: PROTON }]): ChargesEl => ({ kind: 'charges', id: 'c', unit: 'e', bodies, view: [-0.01, 0.04, -0.015, 0.015], plates: { at: [0, 0.03], span: [-0.01, 0.01], volts: 600 }, clips: {}, ...over });

  it('has a uniform field ΔV ÷ d in the gap, and none outside it', () => {
    const el = plates({ clips: { move: { phases: [{ dur: 1, to: { p: [0.025, 0.008] } }] }, out: { phases: [{ dur: 1, to: { p: [0.02, 0.012] } }] }, close: { phases: [{ dur: 1, plates: [0, 0.015] }] }, less: { phases: [{ dur: 1, volts: -300 }] } } });
    const p = chargesAt(el).bodies.p;
    expect(p.field.n).toBeCloseTo(20000, 6);
    expect(p.field.angle).toBeCloseTo(0, 6);
    expect(p.from.field.n / 1e-15).toBeCloseTo(3.2, 9);
    // The force is the same wherever the proton is between the plates.
    expect(chargesAt(el, [['move', 1]]).bodies.p.from.field.n / 1e-15).toBeCloseTo(3.2, 9);
    expect(chargesAt(el, [['move', 1], ['out', 1]]).bodies.p.force.n).toBe(0);
    // Plates half as far apart have twice the field; the other way round, the field turns round.
    const near = chargesAt(el, [['close', 1]]);
    expect(near.plates).toEqual({ at: [0, 0.015], volts: 600 });
    expect(near.bodies.p.field.n).toBeCloseTo(40000, 6);
    const turned = chargesAt(el, [['less', 1]]).bodies.p;
    expect(turned.field.n).toBeCloseTo(10000, 6);
    expect(turned.field.angle).toBeCloseTo(180, 6);
  });

  it('lets the potential fall evenly from one plate to the other, and counts the energy a charge can still lose', () => {
    const el = plates({ plates: { at: [0, 0.03], span: [-0.01, 0.01], volts: 300, base: 100 } }, [{ id: 'p', charge: 1, x: 0.01, mass: PROTON }, { id: 'n', charge: -2, x: 0.03, y: 0.005 }]);
    const { p, n } = chargesAt(el).bodies;
    // A third of the way across, the potential has fallen by a third of 300 V, from 400 V.
    expect(p.potential).toBeCloseTo(300, 9);
    expect(p.stored! / 1.6e-19).toBeCloseTo(200, 9);
    // A negative charge at the plate of lower potential can still lose 2 × 300 eV on its way to the other.
    expect(n.potential).toBeCloseTo(100, 9);
    expect(n.stored! / 1.6e-19).toBeCloseTo(600, 9);
  });

  it('accelerates a charge between the plates: a = qE ÷ m, and qΔV = ½mv²', () => {
    // A proton in a field of 2000 N/C.
    const slow = plates({ plates: { at: [0, 0.03], span: [-0.01, 0.01], volts: 60 }, rate: 1e-7, clips: { go: { phases: [{ dur: 1, fly: true }] } } });
    const p = chargesAt(slow, [['go', 1]]).bodies.p;
    expect(p.speed / 1e-7 / 1e11).toBeCloseTo(1.916, 3);
    expect(p.kinetic + p.stored!).toBeCloseTo(chargesAt(slow).bodies.p.stored!, 22);
    expect(p.trail.length).toBeGreaterThan(50);
    // An electron from rest through 1000 V, out through a hole in the positive plate: 1.87 × 10⁷ m/s, however far apart the plates are.
    for (const gap of [0.02, 0.01]) {
      const gun = plates(
        { view: [-0.01, 0.2, -0.015, 0.015], plates: { at: [gap, 0], span: [-0.01, 0.01], volts: 1000, hole: 'first' }, rate: 1e-9, clips: { go: { phases: [{ dur: 4, fly: true }] } } },
        [{ id: 'e', charge: -1, x: 0, mass: ELECTRON }],
      );
      const e = chargesAt(gun, [['go', 4]]).bodies.e;
      expect(e.x).toBeGreaterThan(gap);
      expect(e.speed / 1e7).toBeCloseTo(1.874, 2);
      expect(e.kinetic / 1.6e-19).toBeCloseTo(1000, 0);
      expect(e.stored).toBeCloseTo(0, 25);
    }
    // A knob turned while the drop moves: it falls at 1200 V, is stopped by 2000 V, and is left at rest when the voltage is eased back to 1600 V.
    const tuned = plates(
      { g: 9.81, view: [-0.03, 0.03, -0.015, 0.015], plates: { at: [0.01, -0.01], across: 'y', span: [-0.02, 0.02], volts: 1200 }, rate: 0.028, clips: { tune: { phases: [{ dur: 1, fly: true }, { dur: 0.8, volts: 2000, fly: true }, { dur: 0.6, fly: true }, { dur: 0.8, volts: 1600, fly: true }, { dur: 2, fly: true }] } } },
      [{ id: 'drop', charge: -5, x: 0, y: 0.004, mass: 6.53e-15 }],
    );
    const settled = chargesAt(tuned, [['tune', 5.2]]).bodies.drop;
    expect(Math.abs(settled.v[1])).toBeLessThan(2e-3);
    expect(Math.abs(settled.y)).toBeLessThan(1.5e-3);
    // Without the hole it stops on the plate, at the potential of the plate.
    const wall = plates({ plates: { at: [0.02, 0], span: [-0.01, 0.01], volts: 1000 }, rate: 1e-9, clips: { go: { phases: [{ dur: 4, fly: true }] } } }, [{ id: 'e', charge: -1, x: 0.001, mass: ELECTRON }]);
    const stopped = chargesAt(wall, [['go', 4]]).bodies.e;
    expect([stopped.x, stopped.speed, stopped.potential, stopped.stored]).toEqual([0.02, 0, 1000, 0]);
  });

  it('bends the path of a charge that enters across the field into a parabola', () => {
    // The lesson's electron: 2.0 × 10⁷ m/s along plates 6.0 cm long, in a field of 4000 N/C that points down.
    const el = plates(
      { view: [-0.02, 0.1, -0.02, 0.02], plates: { at: [0.01, -0.01], across: 'y', span: [0, 0.06], volts: 80 }, rate: 1e-9, clips: { go: { phases: [{ dur: 3, fly: true }] }, on: { phases: [{ dur: 1, fly: true }] } } },
      [{ id: 'e', charge: -1, x: 0, y: 0, mass: ELECTRON, v: [2e7, 0] }],
    );
    expect(chargesAt(el).bodies.e.field.angle).toBeCloseTo(-90, 6);
    const e = chargesAt(el, [['go', 3]]).bodies.e;
    expect(e.x).toBeCloseTo(0.06, 9);
    // y = ½at², with a = qE ÷ m upward, against the field: 3.2 mm.
    expect(e.y * 1000).toBeCloseTo(3.16, 2);
    expect(e.v[0]).toBeCloseTo(2e7, 3);
    // Past the plates there is no field, and it goes on in a straight line.
    const later = chargesAt(el, [['go', 3], ['on', 1]]).bodies.e;
    expect(later.v[1] / e.v[1]).toBeCloseTo(1, 2);
    expect(later.force.n).toBe(0);
  });

  it('lets a test charge with no charge mark the straight path beside a charge that is deflected', () => {
    const el = plates(
      { view: [-0.02, 0.1, -0.02, 0.02], plates: { at: [0.006, -0.006], across: 'y', span: [0, 0.06], volts: 48 }, rate: 1e-9, clips: { go: { phases: [{ dur: 3.6, fly: true }] } } },
      [
        { id: 'n', charge: 0, x: -0.012, y: 0, mass: ELECTRON, v: [2e7, 0], test: true },
        { id: 'e', charge: -1, x: -0.012, y: 0, mass: ELECTRON, v: [2e7, 0] },
      ],
    );
    // The two start at the same place, and neither stops the other.
    expect(checkCharges(el)).toEqual([]);
    const { n, e } = chargesAt(el, [['go', 3.6]]).bodies;
    expect([n.x, e.x].map((x) => Math.round(x * 1e6))).toEqual([60000, 60000]);
    expect(n.y).toBe(0);
    expect(e.y * 1000).toBeCloseTo(3.16, 2);
    // Two charges may not start at the same place, and nor may a mark that shows its charges.
    expect(checkCharges(plates({}, [{ id: 'a', charge: 1, x: 0.01 }, { id: 'b', charge: 0, x: 0.01 }]))[0]).toMatch(/start at the same place/);
  });

  it("holds Millikan's oil drop at rest when qE = mg, and lets it fall or rise otherwise", () => {
    // 6.53 × 10⁻¹⁵ kg with five extra electrons, between plates 2.0 cm apart: 1600 V holds it.
    const el = plates(
      { g: 9.81, view: [-0.03, 0.03, -0.015, 0.015], plates: { at: [0.01, -0.01], across: 'y', span: [-0.02, 0.02], volts: 1600 }, rate: 0.02, clips: { wait: { phases: [{ dur: 2, fly: true }] }, less: { phases: [{ dur: 2, volts: 1200, fly: true }] }, more: { reset: true, phases: [{ dur: 2, volts: 2000, fly: true }] } } },
      [{ id: 'drop', charge: -5, x: 0, y: 0, mass: 6.53e-15 }],
    );
    const drop = chargesAt(el).bodies.drop;
    expect(drop.from.field.angle).toBeCloseTo(90, 6);
    expect(drop.from.field.n / drop.from.weight.n).toBeCloseTo(1, 2);
    expect(Math.abs(chargesAt(el, [['wait', 2]]).bodies.drop.y)).toBeLessThan(1e-5);
    expect(chargesAt(el, [['wait', 2], ['less', 2]]).bodies.drop.y).toBeLessThan(-1e-4);
    expect(chargesAt(el, [['more', 2]]).bodies.drop.y).toBeGreaterThan(1e-4);
    expect(chargesAt(el, [['more', 2]]).plates?.volts).toBe(2000);
  });

  it('reports plates that cannot be drawn', () => {
    expect(checkCharges(plates())).toEqual([]);
    expect(checkCharges(plates({ plates: { at: [0, 0], span: [1, 0], volts: 600, lines: 0 } }))).toHaveLength(3);
    expect(checkCharges(plates({ uniform: { field: 100 } }))[0]).toMatch(/plates or a uniform field/);
    expect(checkCharges(points([{ id: 'a', charge: 1, x: 0 }], { clips: { c: { phases: [{ dur: 1, volts: 5 }] } } }))[0]).toMatch(/changes the plates, but the element has none/);
    expect(checkCharges(plates({ clips: { c: { phases: [{ dur: 1, plates: [0, 0.01], fly: true }] } } }))[0]).toMatch(/cannot move the plates while time runs/);
    expect(checkCharges(plates({ clips: { c: { phases: [{ dur: 1, launch: { q: [1, 0] } }] } } }))[0]).toMatch(/names no body "q"/);
    expect(checkCharges(points([{ id: 'weight', charge: 1, x: 0, v: [1, 0] }]))).toHaveLength(2);
    expect(checkCharges(points([{ id: 'a', charge: 1, x: 0 }], { g: 0, lines: 1.5, thumb: ['lines', 'orbit' as 'lines'] }))).toHaveLength(3);
  });
});

describe('a charges element in a script', () => {
  it('reports a picture that cannot be drawn', () => {
    expect(checkCharges(pair())).toEqual([]);
    expect(checkCharges(bench())).toEqual([]);
    expect(checkCharges(points([]))[0]).toMatch(/needs a body/);
    expect(checkCharges(points([{ id: 'a', charge: 1, x: 0 }, { id: 'a', charge: 1, x: 1 }]))[0]).toMatch(/share an id/);
    expect(checkCharges(points([{ id: 'force', charge: 1, x: 0 }]))[0]).toMatch(/name of a part/);
    expect(checkCharges(points([{ id: 'ground', charge: 1, x: 0 }]))[0]).toMatch(/of the ground or of a force/);
    expect(checkCharges(points([{ id: 'a', charge: 1, x: 0 }, { id: 'b', charge: 1, x: 0 }]))[0]).toMatch(/same place/);
    expect(checkCharges(points([{ id: 'a', shape: 'sphere', charge: 0, x: 0 }]))[0]).toMatch(/needs a radius/);
    expect(checkCharges(points([{ id: 'a', charge: 1, x: 0, pairs: 3 }], { mark: 1 }))[0]).toMatch(/is a point/);
    expect(checkCharges(points([{ id: 'a', shape: 'sphere', radius: 1, charge: 0, x: 0, pairs: 3 }]))[0]).toMatch(/charge of one mark/);
    expect(checkCharges(bench({ mark: 3 }))).toEqual([]);
    expect(checkCharges(bench({ bodies: [{ id: 'ball', shape: 'sphere', radius: 1, charge: 3, x: 0, pairs: 4 }], clips: {} }))[0]).toMatch(/whole number of marks/);
    expect(checkCharges(bench({ bodies: [{ id: 'ball', shape: 'sphere', radius: 1, charge: 10, x: 0, pairs: 4 }], clips: {} }))[0]).toMatch(/too few pairs/);
    expect(checkCharges(bench({ bodies: [{ id: 'atom', shape: 'atom', radius: 1, charge: 0, x: 0, pairs: 11 }], clips: {} }))[0]).toMatch(/ten protons at most/);
    expect(checkCharges(bench({ bodies: [{ id: 'atom', shape: 'atom', radius: 1, charge: 0, x: 0 }], clips: {} }))[0]).toMatch(/number of protons/);
    // Ten protons and a charge of one extra electron would be eleven electrons, and the two shells hold ten.
    expect(checkCharges(bench({ bodies: [{ id: 'atom', shape: 'atom', radius: 1, charge: -2, x: 0, pairs: 10 }], clips: {} }))[0]).toMatch(/starts with more than ten electrons/);
    expect(checkCharges(bench({ bodies: [{ id: 'atom', shape: 'atom', radius: 1, charge: 2, x: 0, pairs: 10 }], clips: {} }))).toEqual([]);
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

  it('follows the electrons through the clips in the order they are played', () => {
    // Written in the order a video plays them, the clips are sound.
    expect(checkCharges(bench())).toEqual([]);
    // Rubbing twice would take eight electrons from a rod that has six, and each problem is told once.
    expect(checkCharges(bench(), ['rub', 'rub', 'rub'])).toEqual(['clip "rub", phase 1: body "rod" has no more electrons to give.']);
    // A sphere must be joined to the ground before electrons run along the wire, whatever order the clips are written in.
    const wired = bench({ clips: { run: { phases: [{ dur: 1, electrons: [{ from: 'ground', to: 'ball', n: 2 }] }] }, join: { phases: [{ dur: 1, ground: { ball: true } }] } } });
    expect(checkCharges(wired)[0]).toMatch(/body "ball" is not joined to the ground/);
    expect(checkCharges(wired, ['join', 'run'])).toEqual([]);
    const scene = (plays: string[]): Explainer => ({
      id: 'charges-order',
      lessonId: 'p30-2-1',
      title: 'Charges',
      summary: 'A test.',
      scenes: [{ layout: 'center', main: [wired], lines: [{ say: 'A sphere on a stand.', show: 'c' }, ...plays.map((play) => ({ say: 'Watch the electrons.', play }))] }],
    });
    expect(checkScript(scene(['c.join', 'c.run']))).toEqual([]);
    expect(checkScript(scene(['c.run', 'c.join']))[0]).toMatch(/Scene 1: charges "c": clip "run", phase 1: body "ball" is not joined to the ground/);
  });

  it('keeps the electrons of an atom circling between clips', () => {
    const atom: ChargesEl = bench({ bodies: [{ id: 'na', shape: 'atom', radius: 1.5, charge: 0, x: 0, pairs: 3 }], clips: {} });
    const x = (el: ChargesEl): Explainer => ({ id: 'charges-age', lessonId: 'p30-2-1', title: 'Charges', summary: 'A test.', scenes: [{ layout: 'center', main: [el], lines: [{ say: 'Here it is.', show: 'c' }, { say: 'Look at it.' }] }] });
    const tl = compile(x(atom), { '0.0': 3, '0.1': 3 });
    // No clip is playing, but the picture's age goes on, so each frame is drawn afresh and the electrons move.
    const [early, late] = [stateAt(tl, 4).els.c, stateAt(tl, 5).els.c];
    expect(late.age! - early.age!).toBeCloseTo(1, 6);
    expect(chargesAt(atom, [], late.age).bodies.na.minus[2]).not.toEqual(chargesAt(atom, [], early.age).bodies.na.minus[2]);
    // A picture with no atom stays still between clips, so its frames can be reused.
    const still = compile(x(pair()), { '0.0': 3, '0.1': 3 });
    expect(stateAt(still, 5).els.c.age).toBeUndefined();
    expect(JSON.stringify(stateAt(still, 4))).toBe(JSON.stringify(stateAt(still, 5)));
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
    expect(checkScript({ ...x, scenes: [{ ...x.scenes[0], lines: [{ say: 'No such part.', show: ['c', 'c.orbit'] }] }] })[0]).toMatch(/charges "c" has no part "orbit"/);
    const tl = compile(x, { '0.0': 3, '0.1': 2, '0.2': 2 });
    const during = stateAt(tl, tl.lines[2].start + 1).els.c;
    expect(chargesAt(pair(), during.plays).bodies.b.x).toBeCloseTo(0.45, 6);
  });
});
