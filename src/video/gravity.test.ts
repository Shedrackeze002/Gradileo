import { describe, expect, it } from 'vitest';
import { checkGravity, checkScript, type Explainer, type GravityEl } from './script.ts';
import { attraction, BIG_G, fieldStrength, gravityAt, written } from './gravity.ts';
import { clipSeconds, compile, stateAt } from './timeline.ts';

// The lesson's planet and satellite: 6.0 × 10²⁴ kg and 800 kg, with their centres 7.0 × 10⁶ m apart.
const orbit = (over: Partial<GravityEl> = {}): GravityEl => ({
  kind: 'gravity',
  id: 's',
  bodies: [
    { id: 'planet', mass: 6.0e24, x: 0, radius: 6.4e6 },
    { id: 'sat', mass: 800, x: 7.0e6 },
  ],
  view: [-3e6, 12e6, -2.4e6, 2.4e6],
  clips: {
    out: { phases: [{ dur: 4, to: { sat: 14.0e6 } }] },
    up: { phases: [{ dur: 2, to: { sat: [0, 7.0e6] } }] },
    heavy: { phases: [{ dur: 2, mass: { sat: 1600 } }, { dur: 1, note: 'Twice the mass' }] },
    again: { reset: true, phases: [{ dur: 1 }] },
  },
  ...over,
});

// The Earth, with the mass that makes g exactly 9.81 N/kg at its surface, and the lesson's 500 kg satellite.
const R = 6.37e6;
const earth = (x: number): GravityEl => ({
  kind: 'gravity',
  id: 's',
  bodies: [
    { id: 'earth', mass: (9.81 * R ** 2) / BIG_G, label: 'Earth', x: 0, radius: R },
    { id: 'sat', mass: 500, x },
  ],
  view: [-9e6, 27e6, -6.6e6, 6.6e6],
  clips: {},
});

describe('universal gravitation', () => {
  it('finds the force between two masses from the distance between their centres', () => {
    // Two spheres in a laboratory: about the weight of a grain of sand.
    expect(attraction(50, 150, 0.5)).toBeCloseTo(2.001e-6, 9);
    const s = gravityAt(orbit());
    expect(s.bodies.sat.force.n).toBeCloseTo(6533.9, 0);
    // The two pulls of a pair are equal and opposite.
    expect(s.bodies.planet.force.n).toBeCloseTo(s.bodies.sat.force.n, 6);
    expect(s.bodies.sat.force.angle).toBe(180);
    expect(s.bodies.planet.force.angle).toBe(0);
  });

  it('follows the inverse square law as a body is carried away', () => {
    const near = gravityAt(orbit()).bodies.sat.force.n;
    const far = gravityAt(orbit(), [['out', 4]]).bodies.sat;
    expect(far.x).toBe(14.0e6);
    expect(far.force.n).toBeCloseTo(near / 4, 6);
    // It is carried smoothly: half way there at half time, and no further when the clip is over.
    expect(gravityAt(orbit(), [['out', 2]]).bodies.sat.x).toBeCloseTo(10.5e6, 3);
    expect(gravityAt(orbit(), [['out', 1]]).bodies.sat.x).toBeLessThan(8.75e6);
    expect(gravityAt(orbit(), [['out', 9]]).bodies.sat.x).toBe(14.0e6);
    expect(clipSeconds(orbit(), 'out')).toBe(4);
  });

  it('grows with either mass, and points at the other body wherever it is', () => {
    const near = gravityAt(orbit()).bodies.sat.force.n;
    const heavy = gravityAt(orbit(), [['heavy', 2]]);
    expect(heavy.bodies.sat.mass).toBe(1600);
    expect(heavy.bodies.sat.force.n).toBeCloseTo(2 * near, 6);
    // The field where the satellite is does not depend on the satellite.
    expect(heavy.bodies.sat.g).toBeCloseTo(gravityAt(orbit()).bodies.sat.g, 9);
    expect(gravityAt(orbit(), [['heavy', 2.5]]).note).toBe('Twice the mass');
    const above = gravityAt(orbit(), [['up', 2]]).bodies;
    expect(above.sat.force.angle).toBe(-90);
    expect(above.planet.force.angle).toBe(90);
    expect(above.sat.force.n).toBeCloseTo(near, 6);
    // A clip that resets puts everything back.
    const back = gravityAt(orbit(), [['out', 4], ['heavy', 2], ['again', 1]]).bodies.sat;
    expect([back.x, back.mass]).toEqual([7.0e6, 800]);
  });

  it('gives the field strength of the Earth at its surface and above it', () => {
    expect(fieldStrength(5.97e24, 6.37e6)).toBeCloseTo(9.81, 2);
    expect(gravityAt(earth(R)).bodies.sat.g).toBeCloseTo(9.81, 9);
    // 400 km up, where crewed spacecraft orbit, gravity is still almost 90% as strong.
    expect(written(gravityAt(earth(R + 4.0e5)).bodies.sat.g).text).toBe('8.69');
    // One Earth radius above the surface is two radii from the centre: a quarter of the field.
    const far = gravityAt(earth(2 * R)).bodies.sat;
    expect(written(far.g).text).toBe('2.45');
    expect(written(far.force.n).text).toBe('1226.3');
  });

  it('adds the pulls of several bodies', () => {
    // Half way between two equal masses, their fields cancel.
    const s = gravityAt({ ...orbit(), bodies: [{ id: 'a', mass: 5e10, x: -10 }, { id: 'b', mass: 5e10, x: 10 }, { id: 'c', mass: 1, x: 0 }] });
    expect(s.bodies.c.g).toBeCloseTo(0, 12);
    expect(s.bodies.a.force.angle).toBe(0);
    expect(s.bodies.b.force.angle).toBe(180);
  });

  it('writes numbers as they are written in the lessons', () => {
    expect(written(144)).toEqual({ text: '144', power: null });
    expect(written(16)).toEqual({ text: '16', power: null });
    expect(written(2.4525)).toEqual({ text: '2.45', power: null });
    expect(written(4905)).toEqual({ text: '4905', power: null });
    expect(written(0.5, 2)).toEqual({ text: '0.5', power: null });
    expect(written(6533.9, 3, true)).toEqual({ text: '6.53', power: 3 });
    expect(written(2.001e-6)).toEqual({ text: '2.00', power: -6 });
    expect(written(7.0e6, 2)).toEqual({ text: '7.0', power: 6 });
    expect(written(6.0e24, 2)).toEqual({ text: '6.0', power: 24 });
    // A mantissa that rounds up to ten carries into the power.
    expect(written(9.996e5)).toEqual({ text: '1.00', power: 6 });
    expect(written(0)).toEqual({ text: '0', power: null });
  });

  it('reports a picture of space that cannot be drawn', () => {
    expect(checkGravity(orbit())).toEqual([]);
    expect(checkGravity(orbit({ bodies: [{ id: 'a', mass: 0, x: 0 }] }))[0]).toMatch(/mass above zero/);
    expect(checkGravity(orbit({ bodies: [{ id: 'a', mass: 1, x: 0 }, { id: 'a', mass: 1, x: 1 }] }))[0]).toMatch(/share an id/);
    expect(checkGravity(orbit({ bodies: [{ id: 'a', mass: 1, x: 2 }, { id: 'b', mass: 1, x: 2 }], clips: {} }))[0]).toMatch(/same place/);
    expect(checkGravity(orbit({ bodies: [{ id: 'force', mass: 1, x: 0 }], clips: {} }))[0]).toMatch(/name of a part/);
    expect(checkGravity(orbit({ view: [5, 1, 0, 1] }))[0]).toMatch(/left, right, bottom, top/);
    expect(checkGravity(orbit({ pulls: ['moon'] }))[0]).toMatch(/no body "moon"/);
    expect(checkGravity(orbit({ poster: 'fly' }))[0]).toMatch(/no clip "fly"/);
    expect(checkGravity(orbit({ clips: { go: { phases: [{ dur: 1, to: { moon: 3 } }] } } }))[0]).toMatch(/names no body "moon"/);
    expect(checkGravity(orbit({ clips: { go: { phases: [{ dur: 0, mass: { sat: -1 } }] } } }))).toHaveLength(2);
    expect(() => gravityAt(orbit(), [['fly', 1]])).toThrow(/no clip "fly"/);
  });

  it('plays in a script, with parts that can be shown one at a time', () => {
    const x: Explainer = {
      id: 'gravity-test',
      lessonId: 'p20-2-7',
      title: 'Gravity',
      summary: 'A test.',
      scenes: [
        {
          layout: 'center',
          main: [orbit()],
          lines: [
            { say: 'A satellite orbits a planet.', show: ['s', 's.radius', 's.height'] },
            { say: 'The planet pulls on it.', show: ['s.force', 's.distance'], focus: 's.sat' },
            { say: 'Now it moves away.', hide: 's.height', show: ['s.field', 's.g'], play: 's.out' },
          ],
        },
      ],
    };
    expect(checkScript(x)).toEqual([]);
    expect(checkScript({ ...x, scenes: [{ ...x.scenes[0], lines: [{ say: 'No such part.', show: ['s', 's.orbit'] }] }] })[0]).toMatch(/gravity "s" has no part "orbit"/);
    const tl = compile(x, { '0.0': 3, '0.1': 2, '0.2': 2 });
    const during = stateAt(tl, tl.lines[2].start + 2).els.s;
    expect(gravityAt(orbit(), during.plays).bodies.sat.x).toBeCloseTo(10.5e6, 3);
  });
});
