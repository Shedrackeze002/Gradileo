import { describe, expect, it } from 'vitest';
import { checkRamp, checkScript, type Explainer, type RampEl } from './script.ts';
import { chains, FRICTION, NET_WORK, NORMAL, rampAt, TENSION, WEIGHT } from './ramp.ts';
import { clipSeconds, compile, stateAt } from './timeline.ts';

const G = 9.81;
const sin = (deg: number) => Math.sin((deg * Math.PI) / 180);
const cos = (deg: number) => Math.cos((deg * Math.PI) / 180);

// A 12 kg box on a level floor: static friction up to 0.5 of the normal force, kinetic 0.2.
const floor = (over: Partial<RampEl> = {}): RampEl => ({
  kind: 'ramp',
  id: 'r',
  angle: 0,
  length: 12,
  friction: [0.5, 0.2],
  bodies: [{ id: 'box', mass: 12, x: 2 }],
  clips: {
    name: { phases: [{ dur: 2, freeze: true }] },
    lean: { phases: [{ dur: 1, forces: [{ on: 'box', name: 'Push', n: 40 }] }] },
    shove: { phases: [{ dur: 2, forces: [{ on: 'box', name: 'Push', n: 50 }] }] },
    coast: { phases: [{ dur: 4 }] },
  },
  ...over,
});

// An 8 kg block on a ramp tilted to 25 degrees.
const slope = (over: Partial<RampEl> = {}): RampEl => ({
  kind: 'ramp',
  id: 'r',
  angle: 25,
  length: 10,
  bodies: [{ id: 'b', mass: 8, x: 8 }],
  clips: { go: { phases: [{ dur: 1 }] }, name: { phases: [{ dur: 2, freeze: true }] } },
  ...over,
});

const force = (el: RampEl, plays: Array<[string, number]>, id: string, kind: string) => rampAt(el, plays).bodies[id].forces.filter((f) => f.kind === kind);

describe('ramp: a level floor', () => {
  it('balances the weight with the normal force, and has no friction until something pushes', () => {
    const s = rampAt(floor(), [['name', 1]]);
    expect(s.bodies.box).toMatchObject({ x: 2, v: 0, a: 0, net: 0 });
    expect(s.bodies.box.normal).toBeCloseTo(12 * G);
    expect(s.bodies.box.forces.map((f) => f.kind)).toEqual(['weight', 'normal']);
    expect(s.bodies.box.forces[0]).toMatchObject({ turn: -90 });
    expect(s.bodies.box.forces[1]).toMatchObject({ turn: 90 });
  });

  it('matches a push with static friction, up to its greatest value', () => {
    // The greatest static friction is 0.5 × 12 × 9.81 = 58.9 N.
    const s = rampAt(floor(), [['lean', 1]]);
    expect(s.bodies.box).toMatchObject({ x: 2, v: 0, a: 0, net: 0 });
    const [f] = force(floor(), [['lean', 1]], 'box', 'friction');
    expect(f.n).toBeCloseTo(40);
    expect(f.turn).toBe(180);
  });

  it('slides with kinetic friction once the push beats static friction', () => {
    const harder = floor({ clips: { shove: { phases: [{ dur: 2, forces: [{ on: 'box', name: 'Push', n: 60 }] }] } } });
    const s = rampAt(harder, [['shove', 2]]);
    // Kinetic friction is 0.2 × 117.72 = 23.5 N, so a = (60 − 23.54) ÷ 12.
    const a = (60 - 0.2 * 12 * G) / 12;
    expect(s.bodies.box.a).toBeCloseTo(a);
    expect(s.bodies.box.v).toBeCloseTo(2 * a);
    expect(s.bodies.box.x).toBeCloseTo(2 + 2 * a);
    expect(force(harder, [['shove', 2]], 'box', 'friction')[0].n).toBeCloseTo(0.2 * 12 * G);
  });

  it('brings a sliding block to rest at a = μg, and keeps it there', () => {
    const puck = floor({ friction: [0.2, 0.2], bodies: [{ id: 'box', mass: 0.17, x: 1, v: 6 }] });
    const mid = rampAt(puck, [['coast', 1]]);
    expect(mid.bodies.box.a).toBeCloseTo(-0.2 * G);
    const end = rampAt(puck, [['coast', 4]]);
    expect(end.bodies.box).toMatchObject({ v: 0, a: 0 });
    expect(end.bodies.box.x).toBeCloseTo(1 + 36 / (2 * 0.2 * G));
    expect(end.bodies.box.forces.map((f) => f.kind)).toEqual(['weight', 'normal']);
  });

  it('takes the lift of a pull at an angle off the normal force', () => {
    // The lesson's sled: 20 kg pulled with 80 N at 30° on snow with μ = 0.1.
    const sled = floor({
      friction: [0.1, 0.1],
      bodies: [{ id: 'box', mass: 20, x: 2 }],
      clips: { pull: { phases: [{ dur: 1, forces: [{ on: 'box', name: 'Pull', n: 80, angle: 30 }] }] } },
    });
    const s = rampAt(sled, [['pull', 1]]);
    expect(s.bodies.box.normal).toBeCloseTo(20 * G - 40);
    expect(s.bodies.box.a).toBeCloseTo((80 * cos(30) - 0.1 * (20 * G - 40)) / 20);
    expect(s.bodies.box.a).toBeCloseTo(2.68, 2);
    expect(force(sled, [['pull', 1]], 'box', 'applied')[0]).toMatchObject({ n: 80, turn: 30 });
  });
});

describe('ramp: a tilted surface', () => {
  it('turns the normal force with the surface, and lets a block slide at g sin θ', () => {
    const s = rampAt(slope(), [['go', 1]]);
    expect(s.bodies.b.normal).toBeCloseTo(8 * G * cos(25));
    expect(s.bodies.b.forces.find((f) => f.kind === 'normal')!.turn).toBe(115);
    expect(s.bodies.b.a).toBeCloseTo(-G * sin(25));
    expect(s.bodies.b.x).toBeCloseTo(8 - 0.5 * G * sin(25));
    expect(s.bodies.b.net).toBeCloseTo(-8 * G * sin(25));
  });

  it('holds a block with static friction that points up the slope', () => {
    const rough = slope({ friction: [0.6, 0.4] });
    const s = rampAt(rough, [['go', 1]]);
    expect(s.bodies.b).toMatchObject({ x: 8, v: 0, a: 0 });
    const [f] = force(rough, [['go', 1]], 'b', 'friction');
    expect(f.n).toBeCloseTo(8 * G * sin(25));
    expect(f.turn).toBe(25);
  });

  it('slides down with friction at g (sin θ − μ cos θ)', () => {
    const rough = slope({ angle: 30, friction: [0.3, 0.2] });
    expect(rampAt(rough, [['go', 1]]).bodies.b.a).toBeCloseTo(-G * (sin(30) - 0.2 * cos(30)));
    expect(rampAt(rough, [['go', 1]]).bodies.b.a).toBeCloseTo(-3.21, 2);
  });

  it('stops a block that is thrown up a rough slope, and holds it if static friction can', () => {
    const up = slope({ friction: [0.6, 0.4], bodies: [{ id: 'b', mass: 8, x: 1, v: 6 }], clips: { go: { phases: [{ dur: 3 }] } } });
    const a = -G * (sin(25) + 0.4 * cos(25));
    expect(rampAt(up, [['go', 0.2]]).bodies.b.a).toBeCloseTo(a);
    const end = rampAt(up, [['go', 3]]);
    expect(end.bodies.b).toMatchObject({ v: 0, a: 0 });
    expect(end.bodies.b.x).toBeCloseTo(1 + 36 / (2 * -a));
  });

  it('tilts until the block slips, when tan θ passes μ', () => {
    const tip = slope({
      angle: 0,
      friction: [0.5, 0.4],
      clips: { tip: { phases: [{ dur: 4, tilt: 40 }] } },
    });
    // tan⁻¹(0.5) = 26.6°, reached after 2.66 s.
    const before = rampAt(tip, [['tip', 2.5]]);
    expect(before.angle).toBeCloseTo(25);
    expect(before.bodies.b).toMatchObject({ x: 8, v: 0 });
    const after = rampAt(tip, [['tip', 4]]);
    expect(after.angle).toBe(40);
    expect(after.bodies.b.v).toBeLessThan(-1);
  });

  it('leaves a mark at every strobe step', () => {
    const s = rampAt(slope({ strobe: 0.25 }), [['go', 1]]);
    expect(s.marks.b).toHaveLength(5);
    expect(s.marks.b[2]).toBeCloseTo(8 - 0.5 * G * sin(25) * 0.25);
  });
});

describe('ramp: strings and a pulley', () => {
  // The lesson's blocks: 5 kg behind and 3 kg in front, pulled with 24 N.
  const train = (over: Partial<RampEl> = {}): RampEl =>
    floor({
      friction: undefined,
      bodies: [
        { id: 'rear', mass: 5, x: 2 },
        { id: 'front', mass: 3, x: 4 },
      ],
      ropes: [['rear', 'front']],
      clips: { pull: { phases: [{ dur: 1, forces: [{ on: 'front', name: 'Pull', n: 24 }] }] } },
      ...over,
    });

  it('moves tied blocks together, with a tension that is less than the pull', () => {
    expect(chains(train())).toEqual([['rear', 'front']]);
    const s = rampAt(train(), [['pull', 1]]);
    expect(s.bodies.rear.a).toBeCloseTo(3);
    expect(s.bodies.front.a).toBeCloseTo(3);
    expect(s.bodies.front.x - s.bodies.rear.x).toBeCloseTo(2);
    expect(force(train(), [['pull', 1]], 'rear', 'tension')[0]).toMatchObject({ turn: 0 });
    expect(force(train(), [['pull', 1]], 'rear', 'tension')[0].n).toBeCloseTo(15);
    expect(force(train(), [['pull', 1]], 'front', 'tension')[0]).toMatchObject({ turn: 180 });
    expect(s.bodies.rear.net).toBeCloseTo(15);
    expect(s.bodies.front.net).toBeCloseTo(9);
  });

  it('shares kinetic friction between tied blocks', () => {
    const rough = train({ friction: [0.2, 0.2], clips: { pull: { phases: [{ dur: 1, forces: [{ on: 'front', name: 'Pull', n: 30 }] }] } } });
    const s = rampAt(rough, [['pull', 1]]);
    expect(s.bodies.rear.a).toBeCloseTo((30 - 0.2 * 8 * G) / 8);
    expect(force(rough, [['pull', 1]], 'rear', 'tension')[0].n).toBeCloseTo(18.75, 1);
  });

  it('lets a hanging body pull a block along a table', () => {
    const table = floor({
      friction: undefined,
      raise: 3,
      bodies: [{ id: 'block', mass: 6, x: 2 }],
      hanging: { id: 'hang', mass: 2 },
      clips: { go: { phases: [{ dur: 1 }] } },
    });
    expect(chains(table)).toEqual([['block', 'hang']]);
    const s = rampAt(table, [['go', 1]]);
    const a = (2 * G) / 8;
    expect(s.bodies.block.a).toBeCloseTo(a);
    expect(s.bodies.hang.a).toBeCloseTo(a);
    expect(s.bodies.block.x).toBeCloseTo(2 + a / 2);
    expect(s.bodies.hang.x).toBeCloseTo(1 + a / 2);
    expect(force(table, [['go', 1]], 'block', 'tension')[0].n).toBeCloseTo(6 * a);
    expect(force(table, [['go', 1]], 'hang', 'tension')[0]).toMatchObject({ turn: 90 });
    expect(s.bodies.hang.net).toBeCloseTo(2 * a);
  });

  it('is an Atwood machine when the surface is tilted to 90 degrees', () => {
    const atwood = slope({
      angle: 90,
      bodies: [{ id: 'light', mass: 3, x: 2 }],
      hanging: { id: 'heavy', mass: 5, drop: 3 },
    });
    const s = rampAt(atwood, [['go', 1]]);
    expect(s.bodies.light.a).toBeCloseTo((2 * G) / 8);
    expect(s.bodies.light.normal).toBe(0);
    expect(force(atwood, [['go', 1]], 'light', 'tension')[0].n).toBeCloseTo(3 * (G + (2 * G) / 8));
    expect(force(atwood, [['go', 1]], 'light', 'normal')).toEqual([]);
  });
});

describe('ramp: the work of each force', () => {
  // A 20 kg box pushed with 70 N along a floor where kinetic friction is 0.25 × 20 × 9.81 = 49.05 N.
  const pushed = floor({
    friction: [0.3, 0.25],
    bodies: [{ id: 'box', mass: 20, x: 1 }],
    work: { rows: ['Push', FRICTION, NET_WORK], range: [-400, 600] },
    clips: { push: { phases: [{ dur: 5, forces: [{ on: 'box', name: 'Push', n: 70 }] }] } },
  });
  // The box has moved 8 m when ½ × a × t² = 8, with a = (70 − 49.05) ÷ 20.
  const at8 = Math.sqrt(16 / ((70 - 49.05) / 20));

  it('is the force times the distance moved, and less than nothing for friction', () => {
    expect(checkRamp(pushed)).toEqual([]);
    const { moved, work } = rampAt(pushed, [['push', at8]]).bodies.box;
    expect(moved).toBeCloseTo(8, 6);
    expect(work.Push).toBeCloseTo(560, 4);
    expect(work[FRICTION]).toBeCloseTo(-392.4, 4);
    expect(work[NET_WORK]).toBeCloseTo(167.6, 4);
  });

  it('counts nothing for the forces at right angles to the motion', () => {
    const { work } = rampAt(pushed, [['push', at8]]).bodies.box;
    expect(work[NORMAL]).toBe(0);
    expect(work[WEIGHT]).toBeCloseTo(0, 9);
    expect(work[TENSION]).toBeCloseTo(0, 9);
  });

  it('adds up to the kinetic energy gained (the work-energy theorem)', () => {
    for (const t of [0.5, 1.7, at8, 5]) {
      const { v, work } = rampAt(pushed, [['push', t]]).bodies.box;
      expect(work[NET_WORK]).toBeCloseTo(0.5 * 20 * v * v, 4);
    }
  });

  it('starts from nothing, and has done no work while the box stays put', () => {
    expect(rampAt(pushed).bodies.box).toMatchObject({ moved: 0, work: { [NORMAL]: 0, [NET_WORK]: 0 } });
    // 40 N cannot beat static friction of 0.5 × 12 × 9.81 N: no distance, so no work.
    const held = rampAt(floor(), [['lean', 1]]).bodies.box;
    expect(held.moved).toBe(0);
    expect(held.work.Push ?? 0).toBe(0);
    expect(held.work[NET_WORK]).toBe(0);
  });

  it('counts only the part of a pull that lies along the motion', () => {
    // The lesson's sled, pulled with 80 N at 30°: over 10 m, 80 × cos 30° × 10 = 693 J.
    const sled = floor({
      friction: [0.1, 0.1],
      length: 16,
      bodies: [{ id: 'box', mass: 20, x: 2 }],
      clips: { pull: { phases: [{ dur: 2, forces: [{ on: 'box', name: 'Pull', n: 80, angle: 30 }] }] } },
    });
    const { moved, work } = rampAt(sled, [['pull', 2]]).bodies.box;
    expect(work.Pull).toBeCloseTo(80 * cos(30) * moved, 4);
    expect((work.Pull / moved) * 10).toBeCloseTo(693, 0);
    // Friction is 0.1 of a normal force that the pull has made smaller.
    expect(work[FRICTION]).toBeCloseTo(-0.1 * (20 * G - 40) * moved, 4);
  });

  it('lets the weight do the work on a slope, where friction takes a share', () => {
    // A 20 kg crate on a slope with sin θ = 0.4, against 42.48 N of friction: over 10 m the
    // weight does 784.8 J, friction −424.8 J, and 360 J is left as kinetic energy.
    const angle = (Math.asin(0.4) * 180) / Math.PI;
    const mu = 42.48 / (20 * G * cos(angle));
    const crate = slope({
      angle,
      length: 13.5,
      friction: [mu, mu],
      bodies: [{ id: 'b', mass: 20, x: 12.5 }],
      work: { rows: [WEIGHT, FRICTION, NET_WORK], range: [-500, 850] },
      clips: { go: { phases: [{ dur: 10 / 3 }] } },
    });
    expect(checkRamp(crate)).toEqual([]);
    // a = 360 ÷ 10 ÷ 20 = 1.8 m/s² down the slope: 10 m takes 10 ÷ 3 s, and it ends at 6 m/s.
    const { moved, v, work } = rampAt(crate, [['go', 10 / 3]]).bodies.b;
    expect(moved).toBeCloseTo(-10, 5);
    expect(v).toBeCloseTo(-6, 5);
    expect(work[WEIGHT]).toBeCloseTo(784.8, 3);
    expect(work[FRICTION]).toBeCloseTo(-424.8, 3);
    expect(work[NET_WORK]).toBeCloseTo(360, 3);
  });

  it('gives tied blocks equal and opposite work from the string between them', () => {
    const tied = floor({
      friction: [0, 0],
      bodies: [
        { id: 'a', mass: 2, x: 2 },
        { id: 'b', mass: 3, x: 4 },
      ],
      ropes: [['a', 'b']],
      clips: { pull: { phases: [{ dur: 1.5, forces: [{ on: 'b', name: 'Pull', n: 20 }] }] } },
    });
    const s = rampAt(tied, [['pull', 1.5]]);
    // a = 20 ÷ 5 = 4 m/s², so 4.5 m; the tension is 2 × 4 = 8 N.
    expect(s.bodies.a.moved).toBeCloseTo(4.5, 6);
    expect(s.bodies.a.work[TENSION]).toBeCloseTo(36, 4);
    expect(s.bodies.b.work[TENSION]).toBeCloseTo(-36, 4);
    expect(s.bodies.b.work.Pull).toBeCloseTo(90, 4);
    expect(s.bodies.a.work[NET_WORK] + s.bodies.b.work[NET_WORK]).toBeCloseTo(90, 4);
  });

  it('starts the count again when a clip puts the blocks back', () => {
    const again = floor({
      friction: [0.3, 0.25],
      bodies: [{ id: 'box', mass: 20, x: 1 }],
      clips: {
        push: { phases: [{ dur: 5, forces: [{ on: 'box', name: 'Push', n: 70 }] }] },
        back: { reset: true, phases: [{ dur: 1, forces: [{ on: 'box', name: 'Push', n: 70 }] }] },
      },
    });
    const s = rampAt(again, [['push', at8], ['back', 1]]).bodies.box;
    expect(s.moved).toBeCloseTo(0.5 * ((70 - 49.05) / 20), 6);
    expect(s.work.Push).toBeCloseTo(70 * s.moved, 4);
  });

  it('reports bars of work that cannot be drawn', () => {
    expect(checkRamp({ ...pushed, work: { rows: [], range: [-400, 600] } })[0]).toMatch(/need a force to show/);
    expect(checkRamp({ ...pushed, work: { rows: ['Push'], range: [100, 600] } })[0]).toMatch(/zero between them/);
    expect(checkRamp({ ...pushed, work: { rows: ['Push'], range: [0, 0] } })[0]).toMatch(/zero between them/);
    expect(checkRamp({ ...pushed, work: { of: 'crate', rows: ['Push'], range: [-400, 600] } })[0]).toMatch(/of no block "crate"/);
  });
});

describe('ramp: checks', () => {
  it('reports a ramp that cannot be drawn', () => {
    expect(checkRamp(floor())).toEqual([]);
    expect(checkRamp(slope())).toEqual([]);
    expect(checkRamp(slope({ angle: 120 }))[0]).toMatch(/tilt must be from 0 to 90/);
    expect(checkRamp(slope({ angle: 90 }))[0]).toMatch(/needs a hanging body/);
    expect(checkRamp(floor({ friction: [0.2, 0.5] }))[0]).toMatch(/static one at least as large/);
    expect(checkRamp(slope({ bodies: [{ id: 'b', mass: 8, x: 12 }] }))[0]).toMatch(/starts off the surface/);
    expect(checkRamp(slope({ bodies: [{ id: 'net', mass: 8, x: 2 }] }))[0]).toMatch(/name of a part/);
    expect(checkRamp(slope({ ropes: [['b', 'c']] }))[0]).toMatch(/ties no block "c"/);
    expect(checkRamp(slope({ clips: { go: { phases: [{ dur: 1, forces: [{ on: 'c', name: 'Push', n: 5 }] }] } } }))[0]).toMatch(/pushes no block "c"/);
    expect(checkRamp(slope({ clips: { go: { phases: [{ dur: 1, forces: [{ on: 'b', name: 'Push', n: -5 }] }] } } }))[0]).toMatch(/size above zero/);
    expect(checkRamp(slope({ poster: 'fly' }))[0]).toMatch(/no clip "fly"/);
  });

  it('plays in a script, with forces that can be shown one at a time', () => {
    const x: Explainer = {
      id: 'ramp-test',
      lessonId: 'p20-2-4',
      title: 'Ramp',
      summary: 'A test.',
      scenes: [
        {
          layout: 'center',
          main: [slope()],
          lines: [
            { say: 'A block rests on a ramp.', show: ['r', 'r.weight'], play: 'r.name' },
            { say: 'The ramp pushes back.', show: ['r.normal', 'r.components'] },
            { say: 'Now it is let go.', hide: 'r.components', play: 'r.go', focus: 'r.b' },
          ],
        },
      ],
    };
    expect(checkScript(x)).toEqual([]);
    expect(checkScript({ ...x, scenes: [{ ...x.scenes[0], lines: [{ say: 'No such part.', show: ['r', 'r.wind'] }] }] })[0]).toMatch(/ramp "r" has no part "wind"/);
    expect(clipSeconds(slope(), 'name')).toBe(2);
    const tl = compile(x, { '0.0': 3, '0.1': 2, '0.2': 2 });
    const during = stateAt(tl, tl.lines[2].start + 0.5).els.r;
    expect(rampAt(slope(), during.plays).bodies.b.v).toBeCloseTo(-G * sin(25) * 0.5);
  });
});
