import { describe, expect, it } from 'vitest';
import { checkGravity, checkScript, type Explainer, type GravityEl } from './script.ts';
import { attraction, BIG_G, fieldStrength, gravityAt, orbitalPeriod, orbitalSpeed, written } from './gravity.ts';
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

  it('keeps a satellite in a circular orbit, at the one speed for its radius', () => {
    // The lesson's satellite: 7.56 × 10³ m/s, and once round in 5.82 × 10³ s (97 minutes).
    expect(orbitalSpeed(6.0e24, 7.0e6)).toBeCloseTo(7561.2, 0);
    expect(orbitalPeriod(6.0e24, 7.0e6)).toBeCloseTo(5816.9, 0);
    const T = orbitalPeriod(6.0e24, 7.0e6);
    const el = orbit({ bodies: [{ id: 'planet', mass: 6.0e24, x: 0, radius: 6.4e6 }, { id: 'sat', mass: 800, x: 7.0e6, orbit: true }], rate: T / 8, clips: { round: { phases: [{ dur: 8, fly: true }] }, wait: { phases: [{ dur: 2 }] } } });
    // It starts moving up the picture, at right angles to the pull of the planet.
    const start = gravityAt(el).bodies.sat;
    expect(start.flying).toBe(true);
    expect(start.v[0]).toBeCloseTo(0, 6);
    expect(start.v[1]).toBeCloseTo(7561.2, 0);
    expect(start.force.angle).toBe(180);
    // A quarter of the way round it is above the planet, still as far from it and as fast.
    const quarter = gravityAt(el, [['round', 2]]).bodies.sat;
    expect(quarter.x / 7.0e6).toBeCloseTo(0, 4);
    expect(quarter.y / 7.0e6).toBeCloseTo(1, 4);
    expect(quarter.speed).toBeCloseTo(start.speed, 1);
    expect(quarter.force.n).toBeCloseTo(attraction(6.0e24, 800, 7.0e6), 0);
    // After one period it is back where it began, and has been round once.
    const once = gravityAt(el, [['round', 8]]);
    expect(once.time).toBeCloseTo(T, 6);
    expect(once.bodies.sat.x / 7.0e6).toBeCloseTo(1, 4);
    expect(once.bodies.sat.y / 7.0e6).toBeCloseTo(0, 3);
    expect(once.bodies.sat.turns).toBeCloseTo(1, 3);
    expect(once.bodies.sat.trail.length).toBeGreaterThan(20);
    // Time stands still in a phase that does not let it run.
    expect(gravityAt(el, [['round', 2], ['wait', 2]]).bodies.sat.y).toBeCloseTo(quarter.y, 3);
  });

  it('follows Kepler’s third law: four times the radius, eight times the period', () => {
    expect(orbitalPeriod(6.0e24, 4 * 7.0e6) / orbitalPeriod(6.0e24, 7.0e6)).toBeCloseTo(8, 9);
    expect(orbitalSpeed(6.0e24, 4 * 7.0e6) / orbitalSpeed(6.0e24, 7.0e6)).toBeCloseTo(0.5, 9);
    const T = orbitalPeriod(6.0e24, 7.0e6);
    const el = orbit({
      bodies: [{ id: 'planet', mass: 6.0e24, x: 0, radius: 6.4e6 }, { id: 'inner', mass: 800, x: 7.0e6, orbit: true }, { id: 'outer', mass: 800, x: -28.0e6, orbit: true }],
      rate: T,
      clips: { go: { phases: [{ dur: 8, fly: true }] }, fast: { phases: [{ dur: 4, fly: true, rate: 2 * T }] } },
    });
    const s = gravityAt(el, [['go', 8]]).bodies;
    expect(s.inner.turns).toBeCloseTo(8, 2);
    expect(s.outer.turns).toBeCloseTo(1, 2);
    expect(s.outer.x / 28.0e6).toBeCloseTo(-1, 3);
    // A phase can run the clock at its own rate.
    expect(gravityAt(el, [['fast', 4]]).bodies.inner.turns).toBeCloseTo(8, 2);
  });

  it('throws a ball from Newton’s mountain: too slow and it lands, fast enough and it orbits', () => {
    const M = 5.97e24;
    const top = 1.12 * R;
    const round = orbitalSpeed(M, top);
    const el: GravityEl = {
      kind: 'gravity',
      id: 's',
      bodies: [{ id: 'earth', mass: M, x: 0, radius: R }, { id: 'ball', mass: 10, x: 0, y: top }],
      view: [-2 * R, 2 * R, -2 * R, 2 * R],
      mountain: 0.12 * R,
      rate: 400,
      clips: {
        slow: { phases: [{ dur: 3, fly: true, launch: { ball: [4000, 0] } }] },
        faster: { phases: [{ dur: 3, fly: true, launch: { ball: [6000, 0] } }] },
        orbit: { phases: [{ dur: 15, fly: true, launch: { ball: [round, 0] } }] },
      },
    };
    expect(checkGravity(el)).toEqual([]);
    // Before it is thrown, the ball sits on the mountain top.
    const rest = gravityAt(el).bodies.ball;
    expect([rest.flying, rest.speed]).toEqual([false, 0]);
    // Thrown at 4000 m/s it falls round to the right, and stops on the ground.
    const down = gravityAt(el, [['slow', 3]]).bodies.ball;
    expect(down.landed).toBe(true);
    expect(down.flying).toBe(false);
    expect(Math.hypot(down.x, down.y) / R).toBeCloseTo(1, 3);
    expect(down.x).toBeGreaterThan(0);
    // Faster, it lands farther round, and the first path stays as a ghost.
    const second = gravityAt(el, [['slow', 3], ['faster', 3]]);
    const far = second.bodies.ball;
    expect(far.landed).toBe(true);
    expect(Math.atan2(far.x, far.y)).toBeGreaterThan(Math.atan2(down.x, down.y));
    expect(second.ghosts).toHaveLength(1);
    // At the speed of a circular orbit it never comes down: after one period it is back at the mountain top.
    const T = orbitalPeriod(M, top);
    const up = gravityAt(el, [['slow', 3], ['faster', 3], ['orbit', T / 400]]);
    expect(up.ghosts).toHaveLength(2);
    expect(up.bodies.ball.landed).toBe(false);
    expect(up.bodies.ball.flying).toBe(true);
    expect(up.bodies.ball.x / top).toBeCloseTo(0, 3);
    expect(up.bodies.ball.y / top).toBeCloseTo(1, 3);
    expect(up.bodies.ball.speed).toBeCloseTo(round, 0);
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
    expect(checkGravity(orbit({ bodies: [{ id: 'a', mass: 1, x: 0, orbit: true }, { id: 'b', mass: 1, x: 1 }], clips: {} }))[0]).toMatch(/first body stays where it is/);
    expect(checkGravity(orbit({ bodies: [{ id: 'a', mass: 1, x: 0 }, { id: 'b', mass: 1, x: 1, orbit: true, v: [0, 1] }], clips: {} }))[0]).toMatch(/an orbit and a velocity/);
    expect(checkGravity(orbit({ rate: 0 }))[0]).toMatch(/rate must be above zero/);
    expect(checkGravity(orbit({ clock: { unit: 'h', seconds: 0 } }))[0]).toMatch(/unit of the clock/);
    expect(checkGravity(orbit({ mountain: 1e5, bodies: [{ id: 'a', mass: 1, x: 0 }, { id: 'b', mass: 1, x: 1 }], clips: {} }))[0]).toMatch(/a mountain needs/);
    expect(checkGravity(orbit({ clips: { go: { phases: [{ dur: 1, fly: true, launch: { planet: [1, 0] } }] } } }))[0]).toMatch(/first body stays where it is/);
    expect(checkGravity(orbit({ clips: { go: { phases: [{ dur: 1, fly: true, to: { sat: 9e6 } }] } } }))[0]).toMatch(/cannot carry a body while time runs/);
    expect(checkGravity(orbit({ clips: { go: { phases: [{ dur: 1, fly: true, rate: -1 }] } } }))[0]).toMatch(/rate must be above zero/);
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
    expect(checkScript({ ...x, scenes: [{ ...x.scenes[0], lines: [{ say: 'No such part.', show: ['s', 's.moon'] }] }] })[0]).toMatch(/gravity "s" has no part "moon"/);
    const tl = compile(x, { '0.0': 3, '0.1': 2, '0.2': 2 });
    const during = stateAt(tl, tl.lines[2].start + 2).els.s;
    expect(gravityAt(orbit(), during.plays).bodies.sat.x).toBeCloseTo(10.5e6, 3);
  });
});
