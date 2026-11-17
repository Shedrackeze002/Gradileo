import { describe, expect, it } from 'vitest';
import { checkParticles, checkScript, type Explainer, type ParticleBox, type ParticlesEl } from './script.ts';
import { controlsAt, particlesAt, pressureOf, singular, TEMPS } from './particles.ts';
import { hydrogenBurning } from './reactions.ts';
import { clipSeconds, compile, stateAt } from './timeline.ts';

let n = 0;
/** A fresh element id each time, so no test reuses another's cached run. */
const el = (over: Partial<ParticlesEl> = {}): ParticlesEl => ({ kind: 'particles', id: `p${n++}`, boxes: [{ id: 'b', state: 'gas', n: 12 }], clips: {}, ...over });

const mean = (xs: number[]) => xs.reduce((s, x) => s + x, 0) / xs.length;

describe('particles: the states come from the simulation', () => {
  it('keeps a solid in its rows: every particle vibrates near where it started', () => {
    const e = el({ boxes: [{ id: 'b', state: 'solid', n: 30 }] });
    const [a] = particlesAt(e, [], 0);
    const [b] = particlesAt(e, [], 6);
    const moved = a.x.map((x, i) => Math.hypot(b.x[i] - x, b.y[i] - a.y[i]));
    // Nearly all stay within half a particle of their places (one on the surface may roll over).
    expect(moved.filter((d) => d < 0.5).length).toBeGreaterThanOrEqual(28);
    expect(Math.max(...moved)).toBeGreaterThan(0.01);
  });

  it('lets a liquid’s particles wander, but keeps them at the bottom', () => {
    const e = el({ boxes: [{ id: 'b', state: 'liquid', n: 30 }] });
    const [a] = particlesAt(e, [], 0);
    const [b] = particlesAt(e, [], 12);
    const moved = a.x.map((x, i) => Math.hypot(b.x[i] - x, b.y[i] - a.y[i]));
    expect(mean(moved)).toBeGreaterThan(0.6);
    expect(mean(b.y)).toBeLessThan(3);
  });

  it('spreads a gas through its whole box', () => {
    const [f] = particlesAt(el({ boxes: [{ id: 'b', state: 'gas', n: 30 }] }), [], 8);
    expect(Math.max(...f.y)).toBeGreaterThan(7);
    expect(mean(f.y)).toBeGreaterThan(3.5);
    expect(mean(f.y)).toBeLessThan(6.5);
  });

  it('gives the same frames every time, whatever order they are drawn in', () => {
    const e = el();
    const late = particlesAt(e, [], 5);
    particlesAt(e, [], 1);
    expect(particlesAt(e, [], 5)).toEqual(late);
  });

  it('boils a solid when a clip heats it', () => {
    const e = el({ boxes: [{ id: 'b', state: 'solid', n: 30 }], clips: { heat: { phases: [{ dur: 4, heat: { b: 'gas' } }] } } });
    const [f] = particlesAt(e, [['heat', 1]], 14);
    expect(f.temp).toBe(TEMPS.gas);
    expect(Math.max(...f.y)).toBeGreaterThan(6);
  });
});

describe('particles: lids, pistons and the gauge', () => {
  const squeeze = { push: { phases: [{ dur: 4, lid: { b: 0.4 } }] } };

  it('moves a lid steadily to its target over the phase', () => {
    const e = el({ clips: squeeze });
    expect(controlsAt(e, [['push', 2]], 4).lid.b).toBeCloseTo(0.7);
    expect(controlsAt(e, [['push', 2]], 9).lid.b).toBeCloseTo(0.4);
    expect(controlsAt(e, [['push', 2]], 1).lid.b).toBe(1);
  });

  it('squashes a gas, but stops on a liquid', () => {
    const [gas] = particlesAt(el({ boxes: [{ id: 'b', state: 'gas', n: 15 }], clips: squeeze }), [['push', 0]], 6);
    const [liquid] = particlesAt(el({ boxes: [{ id: 'b', state: 'liquid', n: 45, height: 7 }], clips: squeeze }), [['push', 0]], 6);
    expect(gas.lidY).toBeCloseTo(4);
    expect(liquid.lidY).toBeGreaterThan(4.5);
    // No particle is ever left above the lid.
    expect(Math.max(...gas.y)).toBeLessThan(gas.lidY);
  });

  it('reads the pressure from the space under the lid (P × V stays the same)', () => {
    const e = el({ gauge: { box: 'b', start: 100 } });
    const b = e.boxes[0];
    expect(pressureOf(e, b, TEMPS.gas, 1)).toBe(100);
    expect(pressureOf(e, b, TEMPS.gas, 0.5)).toBe(200);
    expect(pressureOf(e, b, TEMPS.gas, 0.25)).toBe(400);
  });

  it('counts more wall hits in a smaller space', () => {
    const e = el({ boxes: [{ id: 'b', state: 'gas', n: 16, width: 14, height: 16 }], clips: { push: { phases: [{ dur: 2, lid: { b: 0.25 } }] } } });
    const before = particlesAt(e, [['push', 10]], 8)[0].hitRate;
    const after = particlesAt(e, [['push', 10]], 20)[0].hitRate;
    expect(after).toBeGreaterThan(2 * before);
  });
});

describe('particles: dividers, baths and expansion', () => {
  it('keeps two gases apart until the divider is lifted, then lets them mix', () => {
    const e = el({ boxes: [{ id: 'b', state: 'gas', kinds: [{ n: 10 }, { n: 10 }], apart: true, divider: 0.5, width: 14, height: 9, temp: 3 }], clips: { lift: { phases: [{ dur: 4, lift: ['b'] }] } } });
    const crossed = (f: ReturnType<typeof particlesAt>[number]) => f.x.filter((x, i) => (f.kind[i] === 0 ? x > 7 : x < 7)).length;
    const [before] = particlesAt(e, [['lift', 6]], 5.9);
    expect(crossed(before)).toBe(0);
    expect(before.divider).toEqual({ x: 7, out: 0 });
    const [after] = particlesAt(e, [['lift', 6]], 16);
    expect(crossed(after)).toBeGreaterThanOrEqual(4);
    expect(after.divider?.out).toBe(1);
  });

  it('conducts heat along a bar heated at one end', () => {
    const e = el({ boxes: [{ id: 'b', state: 'solid', n: 57, cols: 19, width: 22, height: 4, temp: 0.04, bath: 'left', heatColor: [0.04, 0.2] }], clips: { heat: { phases: [{ dur: 1, heat: { b: 0.26 } }, { dur: 10 }] } } });
    const [f] = particlesAt(e, [['heat', 0]], 5);
    const keOf = (lo: number, hi: number) => mean(f.ke!.filter((_, i) => f.x[i] >= lo && f.x[i] < hi));
    // Hot near the flame, cooler further along, and the far end has not yet warmed as much.
    expect(keOf(0, 5)).toBeGreaterThan(keOf(8, 13));
    expect(keOf(8, 13)).toBeGreaterThan(0.06);
    expect(keOf(0, 5)).toBeGreaterThan(keOf(16, 22));
  });

  it('spreads a solid’s particles apart as it is heated, and back as it cools', () => {
    const e = el({ boxes: [{ id: 'b', state: 'solid', n: 39, cols: 13, width: 18, height: 8, temp: 0.03, expand: 0.8 }], clips: { heat: { phases: [{ dur: 6, heat: { b: 0.14 } }] }, cool: { phases: [{ dur: 6, heat: { b: 0.03 } }] } } });
    const width = (t: number) => {
      const [f] = particlesAt(e, [['heat', 0], ['cool', 9]], t);
      return f.span[1] - f.span[0];
    };
    const w0 = width(0);
    expect(width(8)).toBeGreaterThan(w0 * 1.05);
    expect(width(19)).toBeLessThan(w0 * 1.02);
  });

  it('checks dividers and the heat flow', () => {
    expect(checkParticles(el({ boxes: [{ id: 'b', state: 'gas', divider: 0.95 }], clips: { go: { phases: [{ dur: 1, lift: ['b'] }] } } }))).toEqual(['box "b": a divider must be between 0.1 and 0.9 of the way across.']);
    expect(checkParticles(el({ clips: { go: { phases: [{ dur: 1, lift: ['b'] }] } } }))).toEqual(['clip "go", phase 1 lifts a divider that box "b" does not have.']);
    expect(checkParticles(el({ boxes: [{ id: 'a', state: 'gas' }, { id: 'b', state: 'gas' }, { id: 'c', state: 'gas' }], flow: { from: 'a', to: 'c' } }))).toEqual(['the heat flow must join two boxes side by side.']);
  });
});

describe('particles: dissolving', () => {
  const WATER = { n: 44, heavy: 0.2, tone: 'adj' } as const;
  const lump = (id: string, solid: { bond: number; heavy: number }, cross: number, temp = 0.7): ParticleBox => ({ id, state: 'liquid', kinds: [{ n: 14, ...solid }, { ...WATER }], lump: true, hold: true, cross, width: 12, height: 9, temp });

  it('holds a lump until it is let go, then water dissolves sugar but not sand', () => {
    const e = el({ boxes: [lump('s', { bond: 1.5, heavy: 0.2 }, 1.8), lump('d', { bond: 3, heavy: 3 }, 1)], clips: { drop: { phases: [{ dur: 1, release: ['s', 'd'] }, { dur: 11 }] } }, speed: 4 });
    const [a] = particlesAt(e, [['drop', 2]], 0);
    const [b] = particlesAt(e, [['drop', 2]], 1.9);
    // Held still: the lump's particles have not moved at all, and none has come loose.
    a.kind.forEach((k, i) => k === 0 && expect([b.x[i], b.y[i]]).toEqual([a.x[i], a.y[i]]));
    expect(b.loose).toBe(0);
    const [sugar, sand] = particlesAt(e, [['drop', 2]], 16);
    expect(sugar.loose).toBeGreaterThanOrEqual(12);
    expect(sand.loose).toBe(0);
  });

  it('dissolves a stirred lump faster than a still one', () => {
    const e = el({ boxes: [lump('a', { bond: 1.5, heavy: 0.2 }, 1.8, 0.6), lump('b', { bond: 1.5, heavy: 0.2 }, 1.8, 0.6)], clips: { go: { phases: [{ dur: 1, release: ['a', 'b'], stir: { b: 2 } }, { dur: 11 }] } }, speed: 4, seed: 5 });
    const [still, stirred] = particlesAt(e, [['go', 0]], 5);
    expect(stirred.stir).toBeGreaterThan(1);
    expect(stirred.loose).toBeGreaterThan(still.loose + 4);
  });

  it('checks lumps, letting go and stirring', () => {
    expect(checkParticles(el({ boxes: [{ id: 'b', state: 'liquid', n: 20, lump: true }] }))).toEqual(['box "b": a lump or held particles need two kinds (the lump first, then what is round it).']);
    expect(checkParticles(el({ boxes: [{ id: 'b', state: 'liquid', kinds: [{ n: 5 }, { n: 20 }] }], clips: { go: { phases: [{ dur: 1, release: ['b'] }] } } }))).toEqual(['clip "go", phase 1 lets go of a lump that box "b" does not hold.']);
    expect(checkParticles(el({ clips: { go: { phases: [{ dur: 1, stir: { x: 2 } }] } } }))).toEqual(['clip "go", phase 1 names no box "x".']);
  });
});

describe('particles: separating mixtures', () => {
  const below = (f: ReturnType<typeof particlesAt>[number], k: number, y: number) => f.y.filter((yy, i) => f.kind[i] === k && yy < y).length;

  it('holds everything on a filter until it is opened, then lets only the small particles through', () => {
    const e = el({ boxes: [{ id: 'b', state: 'liquid', width: 12, height: 12, temp: 0.5, filter: { at: 0.5, holes: 1.3 }, cross: 0.3, kinds: [{ n: 10, size: 1.6, heavy: 3 }, { n: 30, size: 0.8, heavy: 2 }] }], clips: { pour: { phases: [{ dur: 1, release: ['b'] }, { dur: 9 }] } } });
    const [shut] = particlesAt(e, [['pour', 3]], 2.9);
    expect(below(shut, 0, 6) + below(shut, 1, 6)).toBe(0);
    expect(shut.filter).toEqual({ y: 6, open: false });
    const [open] = particlesAt(e, [['pour', 3]], 10);
    expect(below(open, 1, 6)).toBeGreaterThanOrEqual(25);
    expect(below(open, 0, 6)).toBe(0);
  });

  it('pulls only the magnetic kind up to a magnet', () => {
    const e = el({ boxes: [{ id: 'b', state: 'liquid', width: 12, height: 9, temp: 0.15, cross: 0.3, kinds: [{ n: 10, bond: 0.4, heavy: 2, magnetic: true }, { n: 26, bond: 0.4, heavy: 2 }] }], clips: { go: { phases: [{ dur: 2, magnet: { b: 1 } }, { dur: 8 }] } } });
    const [f] = particlesAt(e, [['go', 1]], 8);
    const high = (k: number) => f.y.filter((y, i) => f.kind[i] === k && y > 6).length;
    expect(f.magnet).toBe(1);
    expect(high(0)).toBeGreaterThanOrEqual(8);
    expect(high(1)).toBe(0);
  });

  it('lets water evaporate out of an open dish, leaving the salt behind', () => {
    const e = el({ boxes: [{ id: 'b', state: 'liquid', width: 12, height: 10, temp: 0.5, escape: true, bath: 'floor', cross: 2.4, kinds: [{ n: 10, bond: 2, heavy: 3 }, { n: 40, heavy: 0.3 }] }], clips: { heat: { phases: [{ dur: 2, heat: { b: 1.8 } }, { dur: 20 }] } } });
    const [f] = particlesAt(e, [['heat', 0]], 24);
    expect(f.goneCount).toBeGreaterThanOrEqual(25);
    expect(f.kind.filter((k) => k === 0).length).toBe(10);
    expect(f.x.length).toBe(50 - f.goneCount);
  });

  it('distils water over a wall into the cold side, and never the salt', () => {
    const e = el({ boxes: [{ id: 'b', state: 'liquid', width: 20, height: 12, temp: 0.5, wall: { at: 0.5, height: 0.5 }, cross: 1.6, zones: [{ x: [0, 0.5], y: [0, 0.17] }, { x: [0.6, 1], y: [0, 1], temp: 0.4 }], kinds: [{ n: 8, bond: 3, heavy: 6 }, { n: 30, heavy: 0.3 }] }], clips: { boil: { phases: [{ dur: 2, heat: { b: 1.6 } }, { dur: 18 }] } }, speed: 5 });
    const [f] = particlesAt(e, [['boil', 0]], 20);
    const right = (k: number) => f.x.filter((x, i) => f.kind[i] === k && x > 10.5).length;
    expect(right(1)).toBeGreaterThanOrEqual(15);
    expect(right(0)).toBe(0);
  });

  it('carries each dye up the paper at its own pace, stopping when the solvent reaches the top', () => {
    const e = el({ boxes: [{ id: 'b', state: 'solid', width: 4, height: 12, temp: 0.005, paper: true, cross: 0, kinds: [{ n: 4, size: 0.8, bond: 1.5, heavy: 0, rise: 0.3 }, { n: 4, size: 0.8, bond: 1.5, heavy: 0, rise: 0.7 }] }], clips: { run: { phases: [{ dur: 1, run: { b: 1 } }, { dur: 13 }] } } });
    const meanY = (f: ReturnType<typeof particlesAt>[number], k: number) => mean(f.y.filter((_, i) => f.kind[i] === k));
    const [a] = particlesAt(e, [['run', 0]], 14);
    expect(a.front).toBeCloseTo(11.5, 5);
    expect(meanY(a, 1) - meanY(a, 0)).toBeGreaterThan(2.5);
    expect(meanY(a, 1)).toBeGreaterThan(6.5);
    const [b] = particlesAt(e, [['run', 0]], 20);
    expect(Math.abs(meanY(b, 1) - meanY(a, 1))).toBeLessThan(0.6);
  });

  it('checks filters, walls, magnets and paper', () => {
    expect(checkParticles(el({ boxes: [{ id: 'b', state: 'liquid', filter: { at: 0.95, holes: 1 } }] }))).toEqual(['box "b": a filter must be between 0.1 and 0.9 of the way up.']);
    expect(checkParticles(el({ boxes: [{ id: 'b', state: 'liquid', wall: { at: 0.5, height: 1.2 } }] }))).toEqual(['box "b": a wall must stand between 0.1 and 0.9 of the way across, and be lower than the box.']);
    expect(checkParticles(el({ boxes: [{ id: 'b', state: 'liquid', filter: { at: 0.5, holes: 1 } }], clips: { go: { phases: [{ dur: 1, release: ['b'] }] } } }))).toEqual([]);
    expect(checkParticles(el({ clips: { go: { phases: [{ dur: 1, magnet: { x: 1 } }] } } }))).toEqual(['clip "go", phase 1 names no box "x".']);
    expect(checkParticles(el({ clips: { go: { phases: [{ dur: 1, run: { b: 1 } }] } } }))).toEqual(['clip "go", phase 1 runs solvent up box "b", which is not paper.']);
  });
});

describe('particles: molecules and reactions', () => {
  const H = { n: 0, bond: 0.15, heavy: 0, size: 0.8 };
  const O = { n: 0, bond: 0.15, heavy: 0 };
  // Hydrogen burning in oxygen (see reactions.ts for the kinds).
  const burning = (): ParticlesEl =>
    el({ boxes: [hydrogenBurning('b')], clips: { spark: { phases: [{ dur: 1, heat: { b: 2 } }, { dur: 2 }, { dur: 1, heat: { b: 0.4 } }, { dur: 16 }] } }, seed: 3 });

  it('starts molecules bonded, and keeps their atoms together and a bent molecule bent', () => {
    const e = el({ boxes: [{ id: 'b', state: 'gas', width: 14, height: 10, temp: 0.6, kinds: [{ ...O }, { ...H }], molecules: [{ atoms: [0, 1, 1], n: 8, bent: true }] }] });
    const [f] = particlesAt(e, [], 8);
    expect(f.x.length).toBe(24);
    expect(f.bonds.length).toBe(16);
    for (const [i, j] of f.bonds) expect(Math.hypot(f.x[i] - f.x[j], f.y[i] - f.y[j])).toBeLessThan(1);
    // Each oxygen's two hydrogens stay about 105 degrees apart.
    for (let m = 0; m < 8; m++) {
      const [o, a, c] = [3 * m, 3 * m + 1, 3 * m + 2];
      const ang = Math.abs(Math.atan2(f.y[a] - f.y[o], f.x[a] - f.x[o]) - Math.atan2(f.y[c] - f.y[o], f.x[c] - f.x[o]));
      expect((Math.min(ang, 2 * Math.PI - ang) * 180) / Math.PI).toBeGreaterThan(80);
    }
  });

  it('burns hydrogen only once it is sparked, keeps every atom, and gets hotter as it burns', () => {
    const e = burning();
    const [before] = particlesAt(e, [['spark', 2]], 2);
    expect(before.tally).toBe(0);
    expect(before.bonds.length).toBe(18);
    const [after] = particlesAt(e, [['spark', 2]], 22);
    expect(after.tally).toBeGreaterThanOrEqual(9);
    const count = (f: typeof after, ks: number[]) => f.kind.filter((k) => ks.includes(k)).length;
    expect(count(after, [0, 2])).toBe(24);
    expect(count(after, [1, 3, 4])).toBe(12);
    // Each water molecule is an oxygen bonded to two hydrogens.
    const deg = after.kind.map(() => 0);
    for (const [i, j] of after.bonds) {
      deg[i]++;
      deg[j]++;
    }
    after.kind.forEach((k, i) => k === 3 && expect(deg[i]).toBe(2));
    // Past the spark, the heat given out keeps the gas well above where it started.
    const [burnt] = particlesAt(e, [['spark', 2]], 8);
    expect(burnt.temp).toBeGreaterThan(0.6);
  });

  it('moves a heavy kind more slowly than a light one at the same temperature', () => {
    const e = el({ boxes: [{ id: 'b', state: 'gas', temp: 1.6, heatColor: [0.5, 3], kinds: [{ n: 10 }, { n: 10, mass: 16 }] }] });
    // How far each kind goes in a short moment, averaged over several moments.
    const dist = [0, 0];
    for (let t = 2; t < 8; t += 0.5) {
      const [a] = particlesAt(e, [], t);
      const [b] = particlesAt(e, [], t + 0.05);
      a.x.forEach((x, i) => (dist[a.kind[i]] += Math.hypot(b.x[i] - x, b.y[i] - a.y[i])));
    }
    // Four times as fast in theory (the square root of 16); collisions blur it a little.
    expect(dist[0] / dist[1]).toBeGreaterThan(2.5);
    // The same energy each, so both kinds look equally hot.
    const [f] = particlesAt(e, [], 6);
    const ke = [0, 1].map((k) => mean(f.ke!.filter((_, i) => f.kind[i] === k)));
    expect(ke[0] / ke[1]).toBeGreaterThan(0.5);
    expect(ke[0] / ke[1]).toBeLessThan(2);
  });

  it('breaks a reacting lump into separate pieces, and lets only its surface react', () => {
    const solid = (id: string, pieces: number) => ({
      id,
      state: 'gas' as const,
      width: 22,
      height: 9,
      temp: 0.7,
      hold: true,
      lump: pieces === 1 ? true : pieces,
      cols: pieces === 1 ? 6 : 2,
      cross: 0.2,
      kinds: [{ n: 24, bond: 6, heavy: 3 }, { ...O, n: 24 }, { ...O }, { ...O }],
      reactions: [{ a: 1, b: 0, to: [3, 2] as [number, number], join: true, energy: 1, reach: 1.15 }],
      tally: { kinds: [2], label: 'new' },
    });
    const e = el({ boxes: [solid('a', 1), solid('b', 4)], clips: { go: { phases: [{ dur: 1, release: ['a', 'b'] }, { dur: 13 }] } }, seed: 8 });
    // Four pieces of six, side by side along the floor with gaps between them.
    const [, start] = particlesAt(e, [], 1);
    const xs = start.x.filter((_, i) => start.kind[i] === 0).sort((p, q) => p - q);
    const gaps = xs.slice(1).map((x, i) => x - xs[i]).filter((g) => g > 2);
    expect(gaps.length).toBe(3);
    // Nothing reacts until the clip lets go; then the pieces, with more surface, react faster.
    expect(particlesAt(e, [['go', 2]], 1.9).map((f) => f.tally)).toEqual([0, 0]);
    const [lump, pieces] = particlesAt(e, [['go', 2]], 10).map((f) => f.tally);
    expect(pieces).toBeGreaterThan(lump);
  });

  it('checks reactions, molecules and tallies', () => {
    const b = { id: 'b', state: 'gas' as const, kinds: [{ n: 4 }, { n: 4 }] };
    expect(checkParticles(el({ boxes: [{ ...b, reactions: [{ a: 0, b: 2, to: [1, 1] }] }] }))).toEqual(['box "b": a reaction names a kind it does not have.']);
    expect(checkParticles(el({ boxes: [{ ...b, reactions: [{ a: 0, b: 1, to: [1, 1], free: [null, 3] }] }] }))).toEqual(['box "b": a reaction names a kind it does not have.']);
    expect(checkParticles(el({ boxes: [{ ...b, molecules: [{ atoms: [0, 1], n: 2, bent: true }] }] }))).toEqual(['box "b": only a molecule of three atoms can be bent.']);
    expect(checkParticles(el({ boxes: [{ ...b, molecules: [{ atoms: [0], n: 2 }] }] }))).toEqual(['box "b": a molecule needs two atoms or more, of kinds the box has.']);
    expect(checkParticles(el({ boxes: [{ ...b, tally: { kinds: [5], label: 'x' } }] }))).toEqual(['box "b": the tally counts a kind it does not have.']);
  });
});

describe('particles: scripts and timing', () => {
  const video = (p: ParticlesEl, lines: Explainer['scenes'][number]['lines']): Explainer => ({
    id: 'x',
    lessonId: 'x',
    title: 'X',
    summary: 'X',
    scenes: [{ layout: 'center', main: [p], lines }],
  });

  it('waits for a clip before the next line, and gives the element its age', () => {
    const p = el({ clips: { push: { phases: [{ dur: 3, lid: { b: 0.5 } }, { dur: 2 }] } } });
    expect(clipSeconds(p, 'push')).toBe(5);
    const tl = compile(video(p, [{ say: 'Watch.', show: p.id, play: `${p.id}.push` }, { say: 'Done.' }]), { '0.0': 1, '0.1': 1 });
    expect(tl.lines[1].start).toBeGreaterThan(5);
    const st = stateAt(tl, 2).els[p.id];
    expect(st.age).toBeCloseTo(2 - tl.lines[0].start, 2);
    expect(st.started).toEqual([['push', 0]]);
  });

  it('checks clips, boxes and the parts a line shows', () => {
    const p = el({ clips: { push: { phases: [{ dur: 1, lid: { c: 0.1 } }] } } });
    expect(checkParticles(p)).toEqual(['clip "push", phase 1 names no box "c".', 'clip "push", phase 1: a lid must be between 0.2 and 1.']);
    const problems = checkScript(video(el({ id: 'q' }), [{ say: 'Look.', show: ['q', 'q.gauge', 'q.trail'], play: 'q.nope' }]));
    expect(problems).toEqual([
      'Scene 1, line 1: particles "q" shows "gauge" but does not set it up (thermometers, gauge, volume or flow).',
      'Scene 1, line 1: particles "q" has no clip "nope".',
    ]);
  });
});

describe('particles: a burette and an indicator', () => {
  // An acid (kinds 0, 1) titrated with a base (kind 2) from a burette; kind 3 is what they make.
  const titration = (add: number): ParticlesEl =>
    el({
      boxes: [
        {
          id: 'f',
          state: 'gas',
          width: 8,
          height: 6,
          temp: 0.6,
          kinds: [{ n: 4 }, { n: 4 }, { n: 6 }, { n: 0 }],
          reserve: [2],
          reactions: [{ a: 0, b: 2, to: [3, 3] }],
          indicator: { acid: [0], base: [2], tone: 'hyp' },
        },
      ],
      clips: { go: { phases: [{ dur: 4, add: { f: add } }, { dur: 30 }] } },
      speed: 2,
      seed: 2,
    });
  const count = (f: { kind: number[] }, k: number) => f.kind.filter((x) => x === k).length;

  it('keeps the reserved kinds out of the box until a phase pours them in', () => {
    const e = titration(6);
    const [start] = particlesAt(e, [['go', 0]], 0);
    expect(count(start, 2)).toBe(0);
    expect(count(start, 0)).toBe(4);
    const [half] = particlesAt(e, [['go', 0]], 2.1);
    expect(count(half, 2) + count(half, 3) / 2).toBe(3);
  });

  it('pours in only as many units as asked for', () => {
    const [f] = particlesAt(titration(2), [['go', 0]], 30);
    expect(count(f, 2) + count(f, 3) / 2).toBe(2);
    expect(count(f, 0)).toBeGreaterThanOrEqual(2);
  });

  it('pours in the base, which uses up the acid and is left over past the endpoint', () => {
    const [f] = particlesAt(titration(6), [['go', 0]], 34);
    expect(count(f, 0)).toBe(0);
    expect(count(f, 2)).toBe(2);
  });

  it('checks the burette and the indicator', () => {
    const bad = el({ boxes: [{ id: 'f', state: 'gas', kinds: [{ n: 4 }], reserve: [3], indicator: { acid: [0], base: [5], tone: 'hyp' } }], clips: { go: { phases: [{ dur: 1, add: { g: 1 } }] } } });
    expect(checkParticles(bad)).toEqual([
      'box "f": the burette holds a kind the box does not have.',
      'box "f": the indicator watches a kind the box does not have.',
      'clip "go", phase 1 pours into box "g", which has no burette (`reserve`).',
    ]);
  });
});

describe('particles: slow reactions with a chance', () => {
  // Two kinds that turn into each other on meeting: kind 0 + kind 0 gives 1 + 1, and back.
  const both = (forward: number, back: number): ParticlesEl =>
    el({
      boxes: [
        {
          id: 'b',
          state: 'gas',
          width: 10,
          height: 8,
          temp: 0.6,
          kinds: [{ n: 40 }, { n: 0 }],
          reactions: [
            { a: 0, b: 0, to: [1, 1], chance: forward, reach: 1.15 },
            { a: 1, b: 1, to: [0, 0], chance: back, reach: 1.15 },
          ],
          tally: { kinds: [1], label: 'made' },
        },
      ],
      clips: {},
      seed: 3,
    });

  it('reacts more slowly with a smaller chance', () => {
    const fast = particlesAt(both(0.01, 0), [], 1)[0].tally!;
    const slow = particlesAt(both(0.0005, 0), [], 1)[0].tally!;
    expect(fast).toBeGreaterThan(slow);
    expect(particlesAt(both(0.01, 0), [], 20)[0].tally).toBeGreaterThanOrEqual(36);
  });

  it('settles part way when the reaction runs both ways', () => {
    const e = both(0.002, 0.002);
    const late = [20, 24, 28, 32].map((t) => particlesAt(e, [], t)[0].tally!);
    for (const v of late) {
      expect(v).toBeGreaterThan(8);
      expect(v).toBeLessThan(32);
    }
  });
});

describe('particles: molecules that fall apart', () => {
  // Pairs of kind 1 that fall apart into kind 0, which pair up again on touching.
  const pairs = (o: { split: number; pair: number; energy?: number; temp?: number; lid?: number }): ParticlesEl =>
    el({
      boxes: [
        {
          id: 'b',
          state: 'gas',
          width: 11,
          height: 8,
          temp: o.temp ?? 0.6,
          kinds: [{ n: 0 }, { n: 0 }],
          molecules: [{ atoms: [1, 1], n: 25 }],
          breaks: [{ kinds: [1, 1], to: [0, 0], chance: o.split, energy: o.energy }],
          reactions: [{ a: 0, b: 0, to: [1, 1], join: true, reach: 1.15, chance: o.pair }],
          tally: { kinds: [0], label: 'single' },
        },
      ],
      clips: {},
      seed: 2,
    });
  const late = (e: ParticlesEl) => mean([24, 28, 32, 36, 40].map((t) => particlesAt(e, [], t)[0].tally!));

  it('splits pairs without any meeting, and keeps every bond between whole pairs', () => {
    const [f] = particlesAt(pairs({ split: 0.0005, pair: 0 }), [], 10);
    expect(f.tally).toBeGreaterThan(20);
    expect(f.bonds.length).toBe((50 - f.tally!) / 2);
  });

  it('settles part way when pairs split and re-form', () => {
    const open = late(pairs({ split: 0.0001, pair: 0.0004 }));
    expect(open).toBeGreaterThan(6);
    expect(open).toBeLessThan(44);
  });

  it('splits more when hot, with an energy', () => {
    const cold = late(pairs({ split: 0.0001 * Math.exp(1.5 / 0.6), pair: 0.0004, energy: 1.5, temp: 0.4 }));
    const hot = late(pairs({ split: 0.0001 * Math.exp(1.5 / 0.6), pair: 0.0004, energy: 1.5, temp: 1 }));
    expect(hot).toBeGreaterThan(cold + 4);
  });

  it('checks the kinds a break names', () => {
    expect(checkParticles(el({ boxes: [{ id: 'b', state: 'gas', kinds: [{ n: 4 }], breaks: [{ kinds: [0, 2], to: [0, 0], chance: 0.1 }] }] }))).toEqual(['box "b": a break names a kind it does not have.']);
  });
});

describe('particles: tally labels', () => {
  it('makes a label singular for a count of one', () => {
    expect(singular('hydronium ions')).toBe('hydronium ion');
    expect(singular('units of silver chloride')).toBe('unit of silver chloride');
    expect(singular('particles inside')).toBe('particle inside');
  });
});

describe('particles: an insulated box', () => {
  // A hot lump of heavy particles in cold water, with nothing holding either at a temperature.
  const cup = (insulated = true): ParticlesEl =>
    el({
      boxes: [
        {
          id: 'c',
          state: 'liquid',
          width: 12,
          height: 9,
          temp: 0.3,
          insulated,
          lump: true,
          heatColor: [0.3, 1],
          kinds: [
            { n: 16, bond: 4, heavy: 0.1, mass: 30, temp: 1 },
            { n: 44 },
          ],
        },
      ],
      clips: {},
      seed: 1,
    });
  const temps = (e: ParticlesEl, t: number) => {
    const f = particlesAt(e, [], t)[0];
    const avg = (k: number) => mean(f.ke!.filter((_, i) => f.kind[i] === k));
    return { metal: avg(0), water: avg(1), thermo: f.temp };
  };

  it('starts the lump hot and the water cold, and the thermometer reads the water', () => {
    const t = temps(cup(), 0);
    expect(t.metal).toBeGreaterThan(0.7);
    expect(t.water).toBeLessThan(0.4);
    expect(t.thermo).toBeCloseTo(t.water, 5);
  });

  it('passes heat from the lump to the water until they are about the same temperature', () => {
    const late = mean([30, 32, 34, 36].map((t) => temps(cup(), t).water));
    const lump = mean([30, 32, 34, 36].map((t) => temps(cup(), t).metal));
    expect(late).toBeGreaterThan(0.38);
    expect(late).toBeLessThan(0.6);
    expect(Math.abs(lump - late)).toBeLessThan(0.2);
  });

  it('is refused for a kind with its own temperature in a box that is not insulated', () => {
    expect(checkParticles(cup(false))).toEqual(['box "c": a kind starts at its own temperature only in an insulated box.']);
  });
});

describe('particles: electrodes', () => {
  /** A solution of metal ions (0) and negative ions (1) with a metal anode (2) to plate an object with metal (3). */
  const cell = (dissolve: { kind: number; to: number; chance?: number } = { kind: 2, to: 0 }, plate = 16, plating = true): ParticlesEl =>
    el({
      boxes: [
        {
          id: 'c',
          state: 'liquid',
          width: 13,
          height: 9,
          temp: 0.45,
          kinds: [
            { n: 8, bond: 1, heavy: 0.2, charge: 2 },
            { n: 8, bond: 1, heavy: 0.2, size: 1.3, charge: -2 },
            { n: 16, bond: 1, heavy: 0.2 },
            { n: 0, bond: 1, heavy: 0.2 },
            { n: 20, bond: 1, heavy: 0.2, size: 0.85 },
          ],
          electrodes: {
            left: { rules: plating ? [{ kind: 0, to: 3, stick: true }] : [] },
            right: { plate: { kind: 2, n: plate }, dissolve },
          },
        },
      ],
      clips: { run: { phases: [{ dur: 1, power: { c: 1 } }, { dur: 15 }] } },
      seed: 1,
    });
  const count = (f: { kind: number[] }, k: number) => f.kind.filter((x) => x === k).length;
  const meanX = (f: { x: number[]; kind: number[] }, k: number) => mean(f.x.filter((_, i) => f.kind[i] === k));
  const at = (e: ParticlesEl, t: number, on = true) => particlesAt(e, on ? [['run', 0]] : [], t)[0];

  it('starts the anode coated, against its wall', () => {
    const f = at(cell(), 0, false);
    const xs = f.x.filter((_, i) => f.kind[i] === 2);
    expect(xs).toHaveLength(16);
    expect(Math.min(...xs)).toBeGreaterThan(13 - 2.4);
  });

  it('drifts positive ions to the cathode and negative ions to the anode while the current flows', () => {
    const on = at(cell(undefined, 16, false), 8);
    const off = at(cell(undefined, 16, false), 8, false);
    expect(meanX(on, 0)).toBeLessThan(meanX(off, 0) - 2);
    expect(meanX(on, 1)).toBeGreaterThan(meanX(off, 1) + 2);
  });

  it('plates metal that stays on the cathode, and the anode loses an atom for each one', () => {
    const f = at(cell(), 16);
    const plated = f.x.filter((_, i) => f.kind[i] === 3);
    expect(plated.length).toBeGreaterThan(2);
    expect(plated.length).toBeLessThan(16);
    expect(Math.max(...plated)).toBeLessThan(2.4);
    expect(count(f, 2)).toBe(16 - plated.length);
    expect(count(f, 0)).toBe(8);
  });

  it('changes nothing with the current off', () => {
    const f = at(cell(), 16, false);
    expect(count(f, 3)).toBe(0);
    expect(count(f, 2)).toBe(16);
  });

  it('dissolves the anode now and then with a chance, with nothing plated', () => {
    const f = at(cell({ kind: 2, to: 0, chance: 0.01 }, 16, false), 16);
    expect(count(f, 3)).toBe(0);
    expect(count(f, 2)).toBeLessThan(16);
    expect(count(f, 0)).toBe(8 + 16 - count(f, 2));
  });

  it('checks the kinds an electrode names and the size of its coating', () => {
    expect(checkParticles(cell({ kind: 7, to: 0 }))).toEqual(['box "c": an electrode names a kind the box does not have.']);
    expect(checkParticles(cell(undefined, 17))).toEqual(["box \"c\": an electrode's coating needs more particles than its kind has."]);
  });
});
