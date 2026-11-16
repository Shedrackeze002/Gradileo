import { describe, expect, it } from 'vitest';
import { checkForces, checkScript, type Explainer, type ForcesEl } from './script.ts';
import { forcesAt, resultant, tensions } from './forces.ts';
import { clipSeconds, compile, stateAt } from './timeline.ts';

const G = 9.81;

// The lesson's puck: 10 kg on frictionless ice, pushed with 30 N east and 40 N north.
const puck = (over: Partial<ForcesEl> = {}): ForcesEl => ({
  kind: 'forces',
  id: 'f',
  body: { mass: 10 },
  view: [-1, 9, -1, 11],
  clips: {
    name: {
      phases: [
        {
          dur: 2,
          freeze: true,
          forces: [
            { name: 'Push', n: 30, angle: 0 },
            { name: 'Pull', n: 40, angle: 90 },
          ],
        },
      ],
    },
    go: {
      phases: [
        {
          dur: 2,
          forces: [
            { name: 'Push', n: 30, angle: 0 },
            { name: 'Pull', n: 40, angle: 90 },
          ],
        },
      ],
    },
    east: { phases: [{ dur: 1, slow: 2, forces: [{ name: 'Push', n: 30, angle: 0 }] }, { dur: 1 }] },
    again: { reset: true, phases: [{ dur: 1, forces: [{ name: 'Push', n: 20, angle: 180 }] }] },
  },
  ...over,
});

// The lesson's sign: 12 kg on two cables, each at 40 degrees above the horizontal.
const sign = (over: Partial<ForcesEl> = {}): ForcesEl => ({
  kind: 'forces',
  id: 'f',
  body: { mass: 12, label: 'sign' },
  cables: [40, 40],
  clips: { flatten: { phases: [{ dur: 4, cables: [15, 15] }] } },
  ...over,
});

describe('forces in a plane', () => {
  it('adds forces at right angles with the Pythagorean theorem', () => {
    const sum = resultant([
      { n: 30, angle: 0 },
      { n: 40, angle: 90 },
    ]);
    expect(sum.n).toBeCloseTo(50);
    expect(sum.angle).toBeCloseTo(53.13, 2);
    // Equal and opposite forces leave nothing, in no direction.
    expect(resultant([{ n: 20, angle: 35 }, { n: 20, angle: 215 }])).toMatchObject({ n: 0, angle: 0 });
  });

  it('accelerates the object along the net force', () => {
    const s = forcesAt(puck(), [['go', 2]]);
    expect(s.a).toEqual([3, 4]);
    expect(s.v).toEqual([6, 8]);
    expect(s.at).toEqual([6, 8]);
    expect(s.net.n).toBeCloseTo(50);
    expect(s.net.angle).toBeCloseTo(53.13, 2);
    expect(s.time).toBe(2);
    expect(s.forces.map((f) => f.name)).toEqual(['Push', 'Pull']);
    // The trail runs from the start to where the object is now.
    expect(s.trail[0]).toEqual([0, 0]);
    expect(s.trail.at(-1)![0]).toBeCloseTo(6);
    expect(s.trail.at(-1)![1]).toBeCloseTo(8);
  });

  it('holds the object still while the forces are named, and lets their arrows grow in', () => {
    const s = forcesAt(puck(), [['name', 1.5]]);
    expect(s.at).toEqual([0, 0]);
    expect(s.v).toEqual([0, 0]);
    expect(s.time).toBe(0);
    expect(s.net.n).toBeCloseTo(50);
    expect(s.forces.every((f) => f.age === 1.5)).toBe(true);
    // The same forces in the next clip keep their age, so their arrows do not grow in again.
    expect(forcesAt(puck(), [['name', 2], ['go', 0.5]]).forces[0].age).toBeCloseTo(2.5);
  });

  it('plays slow motion, then coasts at a steady velocity when the forces stop', () => {
    // One second of motion takes two seconds of video.
    const half = forcesAt(puck(), [['east', 1]]);
    expect(half.time).toBe(0.5);
    expect(half.slow).toBe(2);
    expect(half.v).toEqual([1.5, 0]);
    const s = forcesAt(puck(), [['east', 3]]);
    expect(s.forces).toEqual([]);
    expect(s.net.n).toBe(0);
    expect(s.a).toEqual([0, 0]);
    expect(s.v).toEqual([3, 0]);
    expect(s.at).toEqual([4.5, 0]);
    expect(clipSeconds(puck(), 'east')).toBe(3);
  });

  it('starts again from rest when a clip resets', () => {
    const s = forcesAt(puck(), [['go', 2], ['again', 1]]);
    expect(s.v).toEqual([-2, 0]);
    expect(s.at).toEqual([-1, 0]);
    expect(s.net.angle).toBe(180);
    expect(s.time).toBe(1);
  });

  it('works out the tensions in two cables from their angles', () => {
    const [left, right] = tensions(12 * G, 40, 40);
    expect(left).toBeCloseTo(91.57, 1);
    expect(right).toBeCloseTo(91.57, 1);
    // A lamp held to one side by a level rope, with its cable at 30 degrees to the vertical.
    const [cable, rope] = tensions(7 * G, 60, 0);
    expect(cable).toBeCloseTo(79.29, 1);
    expect(rope).toBeCloseTo(39.65, 1);
    // Two upright cables share the weight.
    expect(tensions(100, 90, 90)[0]).toBeCloseTo(50);
  });

  it('keeps a hung object in equilibrium while its cables flatten', () => {
    const start = forcesAt(sign());
    expect(start.cables).toEqual([40, 40]);
    expect(start.net.n).toBe(0);
    expect(start.forces.map((f) => [f.kind, Math.round(f.n * 10) / 10, f.angle])).toEqual([
      ['weight', 117.7, -90],
      ['tension', 91.6, 140],
      ['tension', 91.6, 40],
    ]);
    const mid = forcesAt(sign(), [['flatten', 2]]);
    expect(mid.cables).toEqual([27.5, 27.5]);
    const end = forcesAt(sign(), [['flatten', 9]]);
    expect(end.cables).toEqual([15, 15]);
    // The flatter the cables, the larger the tension: 117.72 / (2 sin 15°).
    expect(end.forces[1].n).toBeCloseTo(227.4, 1);
    expect(end.net.n).toBe(0);
    expect(end.at).toEqual([0, 0]);
    // The cables can be named.
    expect(forcesAt(sign({ cables: [60, 0], names: ['Cable', 'Rope'] })).forces.map((f) => f.name)).toEqual(['Weight', 'Cable', 'Rope']);
  });

  it('reports forces that cannot be drawn', () => {
    expect(checkForces(puck())).toEqual([]);
    expect(checkForces(sign())).toEqual([]);
    expect(checkForces(puck({ body: { mass: 0 } }))[0]).toMatch(/mass above zero/);
    expect(checkForces(puck({ view: undefined }))[0]).toMatch(/view of the floor/);
    expect(checkForces(puck({ view: [1, 9, 0, 5] }))[0]).toMatch(/around the origin/);
    expect(checkForces(puck({ poster: 'fly' }))[0]).toMatch(/no clip "fly"/);
    expect(checkForces(puck({ clips: { go: { phases: [{ dur: 1, forces: [{ name: 'Push', n: -5, angle: 0 }] }] } } }))[0]).toMatch(/size above zero/);
    expect(checkForces(puck({ clips: { go: { phases: [{ dur: 1, cables: [30, 30] }] } } }))[0]).toMatch(/does not hang/);
    expect(checkForces(sign({ cables: [0, 0] }))[0]).toMatch(/not both level/);
    expect(checkForces(sign({ clips: { flatten: { phases: [{ dur: 2, cables: [100, 20] }] } } }))[0]).toMatch(/0 to 90 degrees/);
    expect(() => forcesAt(puck(), [['fly', 1]])).toThrow(/no clip "fly"/);
  });

  it('plays in a script, with parts that can be shown one at a time', () => {
    const x: Explainer = {
      id: 'forces-test',
      lessonId: 'p20-2-6',
      title: 'Forces',
      summary: 'A test.',
      scenes: [
        {
          layout: 'center',
          main: [puck()],
          lines: [
            { say: 'Two forces act on a puck.', show: 'f', play: 'f.name' },
            { say: 'They add to a net force.', show: ['f.net', 'f.components'] },
            { say: 'The puck moves off along it.', hide: 'f.components', show: ['f.velocity', 'f.trail'], play: 'f.go', focus: 'f.body' },
          ],
        },
      ],
    };
    expect(checkScript(x)).toEqual([]);
    expect(checkScript({ ...x, scenes: [{ ...x.scenes[0], lines: [{ say: 'No such part.', show: ['f', 'f.wind'] }] }] })[0]).toMatch(/forces "f" has no part "wind"/);
    const tl = compile(x, { '0.0': 3, '0.1': 2, '0.2': 2 });
    const during = stateAt(tl, tl.lines[2].start + 0.5).els.f;
    expect(forcesAt(puck(), during.plays).v).toEqual([1.5, 2]);
  });
});
