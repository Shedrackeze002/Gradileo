import { describe, expect, it } from 'vitest';
import { checkMagnets, checkScript, type Explainer, type MagnetsEl } from './script.ts';
import { balanceReading, barForce, coilEmf, coilOutput, coilSides, coilTorque, fieldAt, magnetLines, magnetsAt, MU0, peakBarForce, pickupAt, pickupFlux, pickupPeak, pickupTurns, polesOf, wireForce } from './magnets.ts';
import { linesBetween } from './fieldlines.ts';
import { clipSeconds, compile, stateAt } from './timeline.ts';

/** A magnets element, in centimetres. */
const picture = (over: Partial<MagnetsEl> = {}): MagnetsEl => ({ kind: 'magnets', id: 'm', view: [-6, 6, -3, 3], length: { metres: 0.01, symbol: 'cm' }, clips: {}, ...over });

// The lesson's wire: 5.0 A out of the page, with a point 2.0 cm to its right.
const wire = (over: Partial<MagnetsEl> = {}) =>
  picture({
    wires: [{ id: 'w', at: [0, 0], amps: 5 }],
    probes: [{ id: 'p', at: [2, 0] }],
    clips: { out: { phases: [{ dur: 2, to: { p: [4, 0] } }] }, more: { phases: [{ dur: 2, amps: { w: 10 } }] } },
    ...over,
  });

// One bar magnet along the x axis, its north pole to the right.
const bar = (over: Partial<MagnetsEl> = {}) => picture({ bars: [{ id: 'b', at: [0, 0], long: 3, thick: 1 }], ...over });

// Two bar magnets in a line: north poles facing, until the right one is turned round.
const two = (over: Partial<MagnetsEl> = {}) =>
  picture({
    bars: [
      { id: 'a', at: [-3, 0], long: 2, thick: 0.6 },
      { id: 'b', at: [3, 0], long: 2, thick: 0.6, angle: 180 },
    ],
    clips: { near: { phases: [{ dur: 2, to: { a: [-1.5, 0], b: [1.5, 0] } }] }, flip: { phases: [{ dur: 2, turn: { b: 0 } }] } },
    ...over,
  });

const size = ([x, y]: [number, number]) => Math.hypot(x, y);

describe('the field of a long straight wire', () => {
  it('is μ₀I ÷ 2πr', () => {
    const el = wire();
    const [bx, by] = fieldAt(el, magnetsAt(el), 2, 0);
    expect(size([bx, by])).toBeCloseTo(5.0e-5, 9);
    expect(size([bx, by])).toBeCloseTo((MU0 * 5) / (2 * Math.PI * 0.02), 12);
  });

  it('circles the wire anticlockwise when the current comes out of the page', () => {
    const el = wire();
    const st = magnetsAt(el);
    // To the right of the wire the field points up the page; above it, to the left.
    expect(fieldAt(el, st, 2, 0)[0]).toBeCloseTo(0, 12);
    expect(fieldAt(el, st, 2, 0)[1]).toBeGreaterThan(0);
    expect(fieldAt(el, st, 0, 2)[0]).toBeLessThan(0);
    expect(fieldAt(el, st, 0, 2)[1]).toBeCloseTo(0, 12);
  });

  it('turns the other way when the current goes into the page', () => {
    const el = wire({ wires: [{ id: 'w', at: [0, 0], amps: -5 }] });
    expect(fieldAt(el, magnetsAt(el), 2, 0)[1]).toBeLessThan(0);
  });

  it('halves at twice the distance and doubles with twice the current', () => {
    const el = wire();
    const at = (plays: Array<[string, number]>) => {
      const st = magnetsAt(el, plays);
      return size(fieldAt(el, st, ...st.at.p));
    };
    expect(at([['out', 2]])).toBeCloseTo(2.5e-5, 9);
    expect(
      at([
        ['out', 2],
        ['more', 2],
      ]),
    ).toBeCloseTo(5.0e-5, 9);
  });

  it('has field lines that are closed circles round the wire', () => {
    const el = wire({ seeds: [[1.5, 0]] });
    const [line] = magnetLines(el, magnetsAt(el));
    expect(line.closed).toBe(true);
    for (const [x, y] of line.points) expect(Math.hypot(x, y)).toBeCloseTo(1.5, 2);
    // The line runs the way of the field: up the page from the seed, to the right of the wire.
    expect(line.points[1][1]).toBeGreaterThan(0);
  });

  it('adds the fields of two wires as vectors', () => {
    const el = picture({
      wires: [
        { id: 'a', at: [-2, 0], amps: 5 },
        { id: 'b', at: [2, 0], amps: 5 },
      ],
    });
    const st = magnetsAt(el);
    // Half way between two equal currents the same way, the fields cancel.
    expect(size(fieldAt(el, st, 0, 0))).toBeCloseTo(0, 12);
    expect(size(fieldAt(el, st, 0, 0, 'b'))).toBeCloseTo(5.0e-5, 9);
  });
});

describe('a uniform field', () => {
  it('is added everywhere', () => {
    const el = picture({ uniform: [0.2, 0] });
    expect(fieldAt(el, magnetsAt(el), 1, 2)).toEqual([0.2, 0]);
  });

  it('has straight, evenly spaced lines when nothing else makes a field', () => {
    const el = picture({ uniform: [0.2, 0], uniformLines: 5 });
    const lines = magnetLines(el, magnetsAt(el));
    expect(lines).toHaveLength(5);
    for (const line of lines) {
      const ys = line.points.map((p) => p[1]);
      expect(Math.max(...ys) - Math.min(...ys)).toBeLessThan(1e-9);
      expect(line.points[line.points.length - 1][0]).toBeGreaterThan(line.points[0][0]);
    }
    const ys = lines.map((line) => line.points[0][1]).sort((a, b) => a - b);
    for (let j = 1; j < ys.length; j++) expect(ys[j] - ys[j - 1]).toBeCloseTo(6 / 5, 9);
  });

  it('pushes a wire at right angles to the field and to the current: F = BIL', () => {
    // 0.20 T to the right, 3.0 A out of the page, 0.50 m of wire in the field: 0.30 N up the page.
    const el = picture({ uniform: [0.2, 0], wires: [{ id: 'w', at: [0, 0], amps: 3, metres: 0.5 }] });
    const [fx, fy] = wireForce(el, magnetsAt(el), 'w');
    expect(fx).toBeCloseTo(0, 12);
    expect(fy).toBeCloseTo(0.3, 12);
    const back = picture({ uniform: [0.2, 0], wires: [{ id: 'w', at: [0, 0], amps: -3, metres: 0.5 }] });
    expect(wireForce(back, magnetsAt(back), 'w')[1]).toBeCloseTo(-0.3, 12);
  });
});

describe('two parallel wires', () => {
  const pair = (second: number) =>
    picture({
      wires: [
        { id: 'a', at: [-1, 0], amps: 10 },
        { id: 'b', at: [1, 0], amps: second },
      ],
    });

  it('attract when their currents are the same way, with μ₀I₁I₂ ÷ 2πd on each metre', () => {
    const el = pair(10);
    const st = magnetsAt(el);
    const [fa, fb] = [wireForce(el, st, 'a'), wireForce(el, st, 'b')];
    expect(fa[0]).toBeCloseTo((MU0 * 100) / (2 * Math.PI * 0.02), 12);
    expect(fb[0]).toBeCloseTo(-fa[0], 12);
    expect(fa[1]).toBeCloseTo(0, 12);
  });

  it('repel when their currents are opposite ways', () => {
    const el = pair(-10);
    const st = magnetsAt(el);
    expect(wireForce(el, st, 'a')[0]).toBeLessThan(0);
    expect(wireForce(el, st, 'b')[0]).toBeGreaterThan(0);
  });
});

describe('a bar magnet', () => {
  it('has a north pole and a south pole, set in from its ends', () => {
    const el = bar();
    const [north, south] = polesOf(el, magnetsAt(el));
    expect([north.x, north.y, north.q]).toEqual([1, 0, 12]);
    expect([south.x, south.y, south.q]).toEqual([-1, 0, -12]);
  });

  it('has a field that leaves the north pole and enters the south pole', () => {
    const el = bar();
    const st = magnetsAt(el);
    // Beyond the north pole the field points away from the magnet; beyond the south pole, towards it.
    expect(fieldAt(el, st, 3, 0)[0]).toBeGreaterThan(0);
    expect(fieldAt(el, st, -3, 0)[0]).toBeGreaterThan(0);
    // Beside the magnet, the field runs back from north to south.
    expect(fieldAt(el, st, 0, 2)[0]).toBeLessThan(0);
    expect(fieldAt(el, st, 0, 2)[1]).toBeCloseTo(0, 12);
  });

  it('has field lines that run from its north pole, and those that stay in the picture end on its south pole', () => {
    const el = bar();
    const lines = magnetLines(el, magnetsAt(el));
    expect(lines.length).toBeGreaterThanOrEqual(12);
    const [x0, x1, y0, y1] = el.view;
    let home = 0;
    for (const line of lines) {
      expect(line.closed).toBe(false);
      const [first, last] = [line.points[0], line.points[line.points.length - 1]];
      const inside = last[0] > x0 + 0.2 && last[0] < x1 - 0.2 && last[1] > y0 + 0.2 && last[1] < y1 - 0.2;
      const [fromNorth, toSouth] = [Math.hypot(first[0] - 1, first[1]) < 0.3, Math.hypot(last[0] + 1, last[1]) < 0.3];
      const [fromSouth, toNorth] = [Math.hypot(first[0] + 1, first[1]) < 0.3, Math.hypot(last[0] - 1, last[1]) < 0.3];
      // Every line touches the magnet at one end at least, and a line that ends in the picture ends on a pole.
      expect(fromNorth || toSouth || fromSouth || toNorth).toBe(true);
      if (inside && fromNorth) {
        expect(toSouth).toBe(true);
        home++;
      }
    }
    expect(home).toBeGreaterThan(0);
  });

  it('turns with its angle', () => {
    const el = bar({ bars: [{ id: 'b', at: [0, 0], long: 3, thick: 1, angle: 90 }] });
    const [north] = polesOf(el, magnetsAt(el));
    expect(north.x).toBeCloseTo(0, 12);
    expect(north.y).toBeCloseTo(1, 12);
  });
});

describe('two bar magnets', () => {
  it('repel when like poles face', () => {
    const el = two();
    const st = magnetsAt(el);
    expect(barForce(el, st, 'a')[0]).toBeLessThan(0);
    expect(barForce(el, st, 'b')[0]).toBeGreaterThan(0);
    expect(barForce(el, st, 'a')[0]).toBeCloseTo(-barForce(el, st, 'b')[0], 9);
  });

  it('attract when unlike poles face', () => {
    const el = two();
    const st = magnetsAt(el, [['flip', 2]]);
    expect(st.angle.b).toBeCloseTo(0, 12);
    expect(barForce(el, st, 'a')[0]).toBeGreaterThan(0);
    expect(barForce(el, st, 'b')[0]).toBeLessThan(0);
  });

  it('push harder when they are closer, and the largest force is the one at the end of a clip', () => {
    const el = two();
    const far = size(barForce(el, magnetsAt(el), 'a'));
    const near = size(barForce(el, magnetsAt(el, [['near', 2]]), 'a'));
    expect(near).toBeGreaterThan(far);
    expect(peakBarForce(el)).toBeCloseTo(near, 9);
  });
});

describe('a magnets clip', () => {
  it('eases each thing from where it was to where the phase puts it', () => {
    const el = two();
    expect(magnetsAt(el).at.a).toEqual([-3, 0]);
    expect(magnetsAt(el, [['near', 1]]).at.a[0]).toBeCloseTo(-2.25, 9);
    expect(magnetsAt(el, [['near', 2]]).at.a[0]).toBeCloseTo(-1.5, 9);
    expect(magnetsAt(el, [['near', 9]]).at.a[0]).toBeCloseTo(-1.5, 9);
    expect(magnetsAt(el, [['near', 2]]).time).toBe(2);
  });

  it('keeps what an earlier clip did', () => {
    const el = two();
    const st = magnetsAt(el, [
      ['near', 2],
      ['flip', 1],
    ]);
    expect(st.at.b[0]).toBeCloseTo(1.5, 9);
    expect(st.angle.b).toBeCloseTo(90, 9);
  });

  it('lines up the domains of a piece of iron', () => {
    const el = bar({ iron: [{ id: 'fe', at: [4, 0], long: 2, thick: 1 }], clips: { near: { phases: [{ dur: 2, order: { fe: 1 } }] } } });
    expect(magnetsAt(el).order.fe).toBe(0);
    expect(magnetsAt(el, [['near', 1]]).order.fe).toBeCloseTo(0.5, 9);
    expect(magnetsAt(el, [['near', 2]]).order.fe).toBe(1);
  });
});

describe('field lines between sources', () => {
  it('start evenly round a lone source, turned by its offset', () => {
    const lines = linesBetween([{ x: 0, y: 0, q: 4, turn: 0, offset: Math.PI / 4 }], [-2, 2, -2, 2], 4, 4);
    expect(lines).toHaveLength(4);
    const angles = lines.map((line) => Math.round((Math.atan2(line.points[1][1], line.points[1][0]) * 180) / Math.PI)).sort((a, b) => a - b);
    expect(angles).toEqual([-135, -45, 45, 135]);
  });
});

describe('checking a magnets element', () => {
  it('passes the pictures above', () => {
    for (const el of [wire(), bar(), two(), picture({ uniform: [0.2, 0] })]) expect(checkMagnets(el)).toEqual([]);
  });

  it('needs something that makes a field', () => {
    expect(checkMagnets(picture({ compasses: [{ id: 'c', at: [0, 0] }] }))).toContain('it needs a bar magnet, a wire or a uniform field.');
  });

  it('finds an id used twice, a part name used as an id, and a thing outside the view', () => {
    const problems = checkMagnets(
      wire({
        compasses: [
          { id: 'w', at: [1, 1] },
          { id: 'lines', at: [1, 1] },
          { id: 'far', at: [9, 0] },
        ],
      }),
    );
    expect(problems).toContain('the id "w" is used twice.');
    expect(problems).toContain('the id "lines" is the name of a part.');
    expect(problems).toContain('"far" starts outside the view.');
  });

  it('finds a clip that names the wrong kind of thing', () => {
    const problems = checkMagnets(
      wire({
        clips: {
          a: { phases: [{ dur: 1, turn: { w: 90 } }] },
          b: { phases: [{ dur: 1, amps: { p: 2 } }] },
          c: { phases: [{ dur: 1, to: { p: [9, 0] } }] },
          d: { phases: [{ dur: 1, order: { w: 1 } }] },
          e: { phases: [] },
        },
      }),
    );
    expect(problems).toContain('clip "a" turns "w", which is not a bar magnet.');
    expect(problems).toContain('clip "b" sets the current of "p", which is not a wire.');
    expect(problems).toContain('clip "c" moves "p" outside the view.');
    expect(problems).toContain('clip "d" lines up "w", which is not a piece of iron.');
    expect(problems).toContain('clip "e" has no phases.');
  });

  it('finds an Earth with no magnet, a poster that is not a clip and a seed outside the view', () => {
    const problems = checkMagnets(wire({ earth: 1, poster: 'none', seeds: [[0, 9]] }));
    expect(problems).toContain('the Earth needs a bar magnet inside it and a radius above zero.');
    expect(problems).toContain('the poster clip "none" is not a clip.');
    expect(problems).toContain('the seed at (0, 9) is outside the view.');
  });
});

describe('a magnets element in a video', () => {
  const el = two();
  const video: Explainer = {
    id: 'v',
    lessonId: 'l',
    title: 'T',
    summary: 'S',
    scenes: [
      {
        layout: 'center',
        main: [el],
        lines: [
          { say: 'Two magnets.', show: 'm' },
          { say: 'They come together.', show: 'm.force', play: 'm.near' },
        ],
      },
    ],
  };

  it('passes the script check, and a part that does not exist does not', () => {
    expect(checkScript(video)).toEqual([]);
    const wrong: Explainer = { ...video, scenes: [{ ...video.scenes[0], lines: [{ say: 'Two magnets.', show: ['m', 'm.sparks'] }] }] };
    expect(checkScript(wrong).length).toBeGreaterThan(0);
  });

  it('plays its clip on the timeline', () => {
    expect(clipSeconds(el, 'near')).toBe(2);
    const tl = compile(video, { '0.0': 2, '0.1': 4 });
    const during = stateAt(tl, tl.lines[1].start + 1).els.m;
    expect(magnetsAt(el, during.plays).at.a[0]).toBeCloseTo(-2.25, 6);
  });
});

// The lesson's wire between the poles of a magnet: 0.50 m of it in a field of 0.30 T, carrying 4.0 A out of the page.
const gap = (over: Partial<MagnetsEl> = {}) =>
  picture({
    uniform: [0.3, 0],
    yoke: { faces: [-3, 3], span: [-2, 2] },
    wires: [{ id: 'w', at: [0, -1], amps: 4, metres: 0.5, mass: 0.02 }],
    rate: 0.01,
    clips: { go: { phases: [{ dur: 1 }] }, long: { phases: [{ dur: 20 }] } },
    ...over,
  });

// The lesson's wire that floats: 20 g and 0.50 m long, across a field of 0.40 T, resting on supports.
const float = (amps: number, rests = true) =>
  picture({
    uniform: [0.4, 0],
    g: 9.81,
    wires: [{ id: 'w', at: [0, 0], amps: 0, metres: 0.5, mass: 0.02, rests }],
    rate: 0.05,
    clips: { on: { phases: [{ dur: 2, amps: { w: amps } }, { dur: 2 }] } },
  });

describe('a wire in the gap of a magnet', () => {
  it('is pushed with F = BIL, at right angles to the field and to the current', () => {
    const el = gap();
    const [fx, fy] = wireForce(el, magnetsAt(el), 'w');
    expect(fx).toBeCloseTo(0, 9);
    expect(fy).toBeCloseTo(0.6, 9);
    const back = gap({ wires: [{ id: 'w', at: [0, -1], amps: -4, metres: 0.5 }] });
    expect(wireForce(back, magnetsAt(back), 'w')[1]).toBeCloseTo(-0.6, 9);
  });

  it('feels no force outside the gap, where there is no field', () => {
    const el = gap({ wires: [{ id: 'w', at: [0, 2.5], amps: 4, metres: 0.5 }] });
    expect(fieldAt(el, magnetsAt(el), 0, 2.5)).toEqual([0, 0]);
    expect(size(wireForce(el, magnetsAt(el), 'w'))).toBe(0);
    // In the gap: the field of the magnet, and a little from the wire itself.
    expect(fieldAt(el, magnetsAt(el), 0, 0)[0]).toBeCloseTo(0.3, 4);
  });

  it('speeds up under the force while a clip plays: a = F ÷ m', () => {
    const el = gap();
    // 0.01 s of the model: v = 30 × 0.01 = 0.30 m/s, and ½at² = 0.15 cm.
    const state = magnetsAt(el, [['go', 1]]);
    expect(state.v.w[1]).toBeCloseTo(0.3, 6);
    expect(state.at.w[1] - -1).toBeCloseTo(0.15, 2);
    expect(state.at.w[0]).toBe(0);
    expect(magnetsAt(el).at.w).toEqual([0, -1]);
  });

  it('coasts once it has left the gap, and is stopped at the edge of the picture', () => {
    const el = gap();
    // It leaves the gap after 3 cm, which takes 0.0447 s of the model.
    const out = magnetsAt(el, [['long', 4.6]]);
    const later = magnetsAt(el, [['long', 4.7]]);
    expect(out.at.w[1]).toBeGreaterThan(2);
    expect(later.v.w[1]).toBeCloseTo(out.v.w[1], 9);
    const end = magnetsAt(el, [['long', 20]]);
    expect(end.at.w[1]).toBeCloseTo(3 - 12 * 0.025, 9);
    expect(end.v.w[1]).toBe(0);
  });

  it('draws the field lines straight across the gap, from the north pole face to the south', () => {
    const el = gap({ uniformLines: 5, wires: [] });
    const lines = magnetLines(el, magnetsAt(el));
    expect(lines).toHaveLength(5);
    for (const line of lines) {
      expect(line.points[0][0]).toBe(-3);
      expect(line.points.at(-1)![0]).toBeGreaterThan(2.95);
      expect(line.points.at(-1)![0]).toBeLessThan(3.05);
      expect(line.points.at(-1)![1]).toBeCloseTo(line.points[0][1], 2);
    }
    const reversed = gap({ uniform: [-0.3, 0] });
    expect(magnetLines(reversed, magnetsAt(reversed))[0].points[0][0]).toBe(3);
  });
});

describe('a wire that floats', () => {
  it('has a magnetic force equal to its weight at I = mg ÷ BL', () => {
    const el = float(0.981);
    const state = magnetsAt(el, [['on', 4]]);
    expect(wireForce(el, state, 'w')[1]).toBeCloseTo(0.02 * 9.81, 9);
    // It stays on its supports all the way: the force never passes its weight.
    expect(state.at.w).toEqual([0, 0]);
    expect(state.v.w).toEqual([0, 0]);
  });

  it('rises with a larger current, and stays down with a smaller one', () => {
    expect(magnetsAt(float(1.2), [['on', 4]]).at.w[1]).toBeGreaterThan(0.5);
    expect(magnetsAt(float(0.5), [['on', 4]]).at.w[1]).toBe(0);
  });

  it('falls with too small a current when nothing holds it up', () => {
    expect(magnetsAt(float(0.5, false), [['on', 4]]).at.w[1]).toBeLessThan(-0.5);
  });
});

describe('a magnet on a balance', () => {
  // The lesson's measurement: 10 cm of wire in the field, 2.0 A, and the reading rises by 1.02 g.
  const el = picture({
    uniform: [0.05, 0],
    g: 9.81,
    yoke: { faces: [-2, 2], span: [-1, 2], base: 0.6 },
    balance: { grams: 250 },
    wires: [{ id: 'w', at: [0, 0.5], amps: 0, metres: 0.1 }],
    clips: { on: { phases: [{ dur: 2, amps: { w: 2 } }] }, back: { phases: [{ dur: 2, amps: { w: -2 } }] } },
  });

  it('reads the mass of the magnet with no current', () => {
    expect(balanceReading(el, magnetsAt(el))).toBe(250);
  });

  it('reads more when the wire is pushed up, by Newton\'s third law', () => {
    const state = magnetsAt(el, [['on', 2]]);
    expect(wireForce(el, state, 'w')[1]).toBeCloseTo(0.01, 9);
    expect(balanceReading(el, state)).toBeCloseTo(251.02, 2);
  });

  it('reads less when the current is reversed', () => {
    expect(balanceReading(el, magnetsAt(el, [['on', 2], ['back', 2]]))).toBeCloseTo(248.98, 2);
  });

  it('is not there without gravity', () => {
    expect(balanceReading({ ...el, g: undefined }, magnetsAt(el))).toBeNull();
  });
});

// The lesson's motor coil: 100 turns, sides 4.0 cm long and 2 cm from the axle, 1.5 A, in a field of 0.20 T.
const motor = (over: Partial<NonNullable<MagnetsEl['coil']>> = {}, rest: Partial<MagnetsEl> = {}) =>
  picture({
    uniform: [0.2, 0],
    yoke: { faces: [-4, 4], span: [-2.9, 2.9] },
    coil: { id: 'c', at: [0, 0], radius: 2, amps: 1.5, turns: 100, metres: 0.04, inertia: 2e-4, friction: 2e-3, ...over },
    rate: 0.05,
    clips: { run: { phases: [{ dur: 10 }] }, back: { phases: [{ dur: 1, amps: { c: -1.5 } }, { dur: 9 }] } },
    ...rest,
  });

describe('the coil of a motor', () => {
  it('has two opposite forces of NBIL on its sides', () => {
    const el = motor();
    const [a, b] = coilSides(el, magnetsAt(el));
    expect(a.at).toEqual([2, 0]);
    expect(b.at[0]).toBeCloseTo(-2, 12);
    expect(a.amps).toBe(1.5);
    expect(b.amps).toBe(-1.5);
    expect(a.force[1]).toBeCloseTo(1.2, 9);
    expect(b.force[1]).toBeCloseTo(-1.2, 9);
    expect(a.force[0]).toBeCloseTo(0, 12);
  });

  it('has the largest turning effect when its plane is along the field, and none when it is at right angles', () => {
    const flat = motor();
    expect(coilTorque(flat, magnetsAt(flat))).toBeCloseTo(2 * 0.02 * 1.2, 9);
    const upright = motor({ angle: 90 });
    expect(coilTorque(upright, magnetsAt(upright))).toBeCloseTo(0, 9);
    const tilted = motor({ angle: 60 });
    expect(coilTorque(tilted, magnetsAt(tilted))).toBeCloseTo(0.048 * 0.5, 9);
  });

  it('rocks about the upright place and stops there without a commutator', () => {
    const el = motor();
    let top = 0;
    for (let t = 0.25; t <= 10; t += 0.25) top = Math.max(top, magnetsAt(el, [['run', t]]).spin!.angle);
    // It swings past the upright, but never as far as half a turn.
    expect(top).toBeGreaterThan(95);
    expect(top).toBeLessThan(180);
    const end = magnetsAt(el, [['run', 10], ['run', 10], ['run', 10]]).spin!;
    expect(end.angle).toBeCloseTo(90, 0);
    expect(Math.abs(end.omega)).toBeLessThan(0.5);
  });

  it('is turned back past the upright place without a commutator', () => {
    const past = motor({ angle: 200 });
    expect(coilTorque(past, magnetsAt(past))).toBeLessThan(0);
  });

  it('keeps turning the same way with a commutator, which reverses its current every half turn', () => {
    const el = motor({ commutator: true });
    const past = motor({ commutator: true, angle: 200 });
    expect(coilTorque(past, magnetsAt(past))).toBeCloseTo(0.048 * Math.abs(Math.cos((200 * Math.PI) / 180)), 9);
    let last = 0;
    for (let t = 0.5; t <= 10; t += 0.5) {
      const state = magnetsAt(el, [['run', t]]);
      expect(state.spin!.angle).toBeGreaterThan(last);
      last = state.spin!.angle;
      // The side that is further along the field always carries the current out of the page.
      for (const side of coilSides(el, state)) if (Math.abs(side.at[0]) > 0.05) expect(Math.sign(side.amps)).toBe(Math.sign(side.at[0]));
    }
    expect(last).toBeGreaterThan(270);
  });

  it('settles at the speed where the turning effect matches the friction', () => {
    const el = motor({ commutator: true });
    const turned = (plays: number) => magnetsAt(el, Array.from({ length: plays }, (): [string, number] => ['run', 10])).spin!.angle;
    // Each clip is 0.5 s of the model. The mean speed stops growing, below the speed the largest torque could keep up.
    const [early, late] = [(turned(4) - turned(2)) * (Math.PI / 180), (turned(8) - turned(6)) * (Math.PI / 180)];
    expect(late / early).toBeGreaterThan(0.97);
    expect(late / early).toBeLessThan(1.03);
    expect(late).toBeLessThan(0.048 / 2e-3);
    expect(late).toBeGreaterThan(0.4 * (0.048 / 2e-3));
  });

  it('turns the other way when the current is reversed', () => {
    const el = motor({ commutator: true, amps: -1.5 });
    expect(magnetsAt(el, [['run', 5]]).spin!.angle).toBeLessThan(-120);
    const turned = motor({ commutator: true });
    const state = magnetsAt(turned, [['run', 4], ['back', 10]]);
    expect(state.amps.c).toBe(-1.5);
    expect(state.spin!.omega).toBeLessThan(0);
  });

  it('keeps its energy when there is no friction: ½Jω² is the work the forces have done', () => {
    const el = motor({ friction: 0 });
    for (const t of [0.4, 0.8, 1.3]) {
      const { angle, omega } = magnetsAt(el, [['run', t]]).spin!;
      const work = 0.048 * Math.sin((angle * Math.PI) / 180);
      expect(0.5 * 2e-4 * omega * omega).toBeCloseTo(work, 3);
    }
  });

  it('does not move until a clip plays', () => {
    const el = motor();
    expect(magnetsAt(el).spin).toEqual({ angle: 0, omega: 0 });
    expect(magnetsAt(bar()).spin).toBeNull();
  });
});

describe('checking wires that move, a balance and a coil', () => {
  it('passes the pictures above', () => {
    for (const el of [gap(), float(1), motor(), motor({ commutator: true })]) expect(checkMagnets(el)).toEqual([]);
  });

  it('finds a wire with a mass but no length, and a clip that carries a wire that moves by itself', () => {
    expect(checkMagnets(gap({ wires: [{ id: 'w', at: [0, -1], amps: 4, mass: 0.02 }] })).join(' ')).toContain('needs a mass above zero, and the length');
    expect(checkMagnets(gap({ wires: [{ id: 'w', at: [0, -1], amps: 4, metres: 0.5, rests: true }] })).join(' ')).toContain('so it needs a mass');
    expect(checkMagnets(gap({ clips: { go: { phases: [{ dur: 1, to: { w: [0, 1] } }] } } })).join(' ')).toContain('moves by itself');
  });

  it('finds poles with no field along x between them, or outside the view', () => {
    expect(checkMagnets(gap({ uniform: [0, 0.3] })).join(' ')).toContain('uniform field along x');
    expect(checkMagnets(gap({ yoke: { faces: [-7, 3], span: [-2, 2] } })).join(' ')).toContain('pole faces');
    expect(checkMagnets(gap({ yoke: { faces: [-3, 3], span: [-2, 2], base: 2 } })).join(' ')).toContain('room under the gap');
  });

  it('finds a balance with no gravity, and a rate of zero', () => {
    expect(checkMagnets(gap({ balance: { grams: 250 } })).join(' ')).toContain('a balance needs gravity');
    expect(checkMagnets(gap({ rate: 0 })).join(' ')).toContain('rate');
  });

  it('finds a coil that turns outside the gap, has no inertia, or is carried by a clip', () => {
    expect(checkMagnets(motor({ radius: 4.5 })).join(' ')).toContain('outside the gap');
    expect(checkMagnets(motor({ inertia: 0 })).join(' ')).toContain('moment of inertia');
    expect(checkMagnets(motor({ turns: 2.5 })).join(' ')).toContain('whole number of turns');
    expect(checkMagnets(motor({}, { clips: { run: { phases: [{ dur: 2, to: { c: [1, 0] } }] } } })).join(' ')).toContain('stays on its axle');
    expect(checkMagnets(motor({}, { clips: { run: { phases: [{ dur: 2, amps: { x: 1 } }] } } })).join(' ')).toContain('not a wire');
  });
});

// A bar magnet on the axis of a coil that is joined to a meter: its north pole faces the coil.
const pickup = (over: Partial<MagnetsEl> = {}) =>
  picture({
    view: [-7, 7, -3, 2],
    bars: [{ id: 'b', at: [-4, 0], long: 3, thick: 0.8 }],
    pickup: { id: 'k', at: [2.5, 0], long: 3, radius: 1 },
    clips: {
      in: { phases: [{ dur: 2, to: { b: [1, 0] } }] },
      out: { phases: [{ dur: 2, to: { b: [-4, 0] } }] },
      fast: { phases: [{ dur: 0.5, to: { b: [1, 0] } }] },
    },
    ...over,
  });

describe('a magnet and a pickup coil', () => {
  it('has its turns evenly spaced along the coil', () => {
    expect(pickupTurns(pickup())).toHaveLength(7);
    expect(pickupTurns(pickup({ pickup: { id: 'k', at: [2.5, 0], long: 3, radius: 1, drawn: 3 } }))).toEqual([1.5, 2.5, 3.5]);
    expect(pickupTurns(picture())).toEqual([]);
  });

  it('has more flux through the coil when the magnet is nearer, and most when the magnet is inside it', () => {
    const el = pickup({ clips: { step: { phases: [{ dur: 1, to: { b: [-2, 0] } }, { dur: 1, to: { b: [2.5, 0] } }, { dur: 1, to: { b: [6, 0] } }] } } });
    const [far, near, inside, past] = [0, 1, 2, 3].map((t) => pickupFlux(el, magnetsAt(el, [['step', t]])));
    expect(far).toBeGreaterThan(0);
    expect(near).toBeGreaterThan(far);
    expect(inside).toBeGreaterThan(near);
    expect(past).toBeLessThan(inside);
    expect(past).toBeGreaterThan(0);
  });

  it('has a flux that does not jump as a pole passes through a turn', () => {
    const el = pickup({ pickup: { id: 'k', at: [2.5, 0], long: 3, radius: 1, drawn: 2 }, clips: { through: { phases: [{ dur: 10, to: { b: [6, 0] } }] } } });
    let last = pickupFlux(el, magnetsAt(el));
    let jump = 0;
    for (let t = 0.01; t <= 10; t += 0.01) {
      const now = pickupFlux(el, magnetsAt(el, [['through', t]]));
      jump = Math.max(jump, Math.abs(now - last));
      last = now;
    }
    const top = pickupFlux(el, magnetsAt(el, [['through', 5.6]]));
    expect(jump).toBeLessThan(top * 0.03);
  });

  it('reverses the flux when the magnet is turned end for end', () => {
    const [el, turned] = [pickup(), pickup({ bars: [{ id: 'b', at: [-4, 0], long: 3, thick: 0.8, angle: 180 }] })];
    expect(pickupFlux(turned, magnetsAt(turned))).toBeCloseTo(-pickupFlux(el, magnetsAt(el)), 12);
  });

  it('induces an emf only while the magnet moves', () => {
    const el = pickup();
    expect(pickupAt(el).emf).toBe(0);
    expect(Math.abs(pickupAt(el, [['in', 1]]).emf)).toBeGreaterThan(0);
    // As it comes to rest inside the coil there is a large flux, but almost no change.
    expect(Math.abs(pickupAt(el, [['in', 2]]).emf)).toBeLessThan(pickupPeak(el).emf * 0.01);
    expect(pickupAt(el, [['in', 5]]).emf).toBe(0);
  });

  it('is the rate at which the flux changes (Faraday\'s law)', () => {
    const el = pickup();
    const dt = 1e-3;
    const rate = (pickupFlux(el, magnetsAt(el, [['in', 1 + dt]])) - pickupFlux(el, magnetsAt(el, [['in', 1 - dt]]))) / (2 * dt);
    expect(pickupAt(el, [['in', 1]]).emf / -rate).toBeCloseTo(1, 2);
  });

  it('induces the opposite emf when the magnet is pulled out', () => {
    const el = pickup();
    const pushed = pickupAt(el, [['in', 1]]).emf;
    const pulled = pickupAt(el, [['in', 2], ['out', 1]]).emf;
    expect(pushed).toBeLessThan(0);
    expect(pulled).toBeCloseTo(-pushed, 6);
  });

  it('induces a larger emf when the magnet moves faster: four times the speed, four times the emf', () => {
    const el = pickup();
    expect(pickupAt(el, [['fast', 0.25]]).emf / pickupAt(el, [['in', 1]]).emf).toBeCloseTo(4, 1);
    expect(pickupPeak(el).emf).toBeGreaterThan(Math.abs(pickupAt(el, [['in', 1]]).emf) * 3.9);
  });

  it('pushes the magnet back as it goes in, and pulls it back as it comes out (Lenz\'s law)', () => {
    const el = pickup();
    // Going in, the magnet moves along +x: the push on it is along −x.
    expect(pickupAt(el, [['in', 1]]).drag).toBeLessThan(0);
    expect(pickupAt(el, [['in', 2], ['out', 1]]).drag).toBeGreaterThan(0);
    expect(pickupAt(el, [['in', 3]]).drag).toBe(0);
  });

  it('makes the near end of the coil a north pole as a north pole comes towards it', () => {
    // The flux along +x grows, so the field of the induced current is along −x: the emf is counted negative, and the left end is a north pole.
    expect(pickupAt(pickup(), [['in', 0.8]]).emf).toBeLessThan(0);
    const south = pickup({ bars: [{ id: 'b', at: [-4, 0], long: 3, thick: 0.8, angle: 180 }] });
    expect(pickupAt(south, [['in', 0.8]]).emf).toBeGreaterThan(0);
  });

  it('is checked: the magnet must lie on the axis, fit inside the coil and stay on the axis', () => {
    expect(checkMagnets(pickup())).toEqual([]);
    expect(checkMagnets(pickup({ bars: [{ id: 'b', at: [-4, 0.5], long: 3, thick: 0.8 }] })).join(' ')).toContain('along the axis');
    expect(checkMagnets(pickup({ bars: [{ id: 'b', at: [-4, 0], long: 3, thick: 0.8, angle: 90 }] })).join(' ')).toContain('along the axis');
    expect(checkMagnets(pickup({ bars: [{ id: 'b', at: [-4, 0], long: 3, thick: 2.4 }] })).join(' ')).toContain('too thick');
    expect(checkMagnets(pickup({ clips: { up: { phases: [{ dur: 1, to: { b: [0, 1] } }] } } })).join(' ')).toContain('off the axis');
    expect(checkMagnets(pickup({ clips: { away: { phases: [{ dur: 1, to: { k: [0, 0] } }] } } })).join(' ')).toContain('move the magnet instead');
    expect(checkMagnets(pickup({ clips: { round: { phases: [{ dur: 1, turn: { b: 90 } }] } } })).join(' ')).toContain('turns a magnet');
    expect(checkMagnets(pickup({ bars: [] })).join(' ')).toContain('needs a bar magnet');
    expect(checkMagnets(pickup({ pickup: { id: 'k', at: [6, 0], long: 3, radius: 1 } })).join(' ')).toContain('outside the view');
    expect(checkMagnets(pickup({ pickup: { id: 'lines', at: [2.5, 0], long: 3, radius: 1 } })).join(' ')).toContain('name of a part');
    expect(checkMagnets(pickup({ poster: 'in', posterAt: 0.7 }))).toEqual([]);
    expect(checkMagnets(pickup({ posterAt: 0.7 })).join(' ')).toContain('posterAt');
    expect(checkMagnets(pickup({ poster: 'in', posterAt: 1.5 })).join(' ')).toContain('posterAt');
  });
});

// The lesson's generator: a coil of 100 turns, each side 4.0 cm long and 2.0 cm from the axle, turned 50 times each second in 0.20 T.
const generator = (over: Partial<NonNullable<MagnetsEl['coil']>> = {}, rest: Partial<MagnetsEl> = {}) =>
  picture({
    view: [-7, 7, -3, 3],
    uniform: [0.2, 0],
    yoke: { faces: [-5.7, -1.1], span: [-2.3, 2.3] },
    coil: { id: 'c', at: [-3.4, 0], radius: 2, angle: 90, amps: 0, turns: 100, metres: 0.04, drive: 50, slip: true, ...over },
    trace: { at: [2, 6.6], span: [-2, 2], volts: 20, seconds: 0.04 },
    // One second of video is 5 ms: the coil turns once in four seconds.
    rate: 0.005,
    clips: { run: { phases: [{ dur: 8 }] }, faster: { phases: [{ dur: 4, drive: 100 }, { dur: 4 }] } },
    ...rest,
  });
/** The greatest emf of the coil at 50 turns each second: 2NBLrω. */
const PEAK = 2 * 100 * 0.2 * 0.04 * 0.02 * (2 * Math.PI * 50);

describe('the coil of a generator', () => {
  it('has no emf when its plane is at right angles to the field: the sides move along the field lines', () => {
    const el = generator();
    expect(coilEmf(el, magnetsAt(el))).toBeCloseTo(0, 9);
  });

  it('has the greatest emf, 2NBLrω, when its plane lies along the field', () => {
    const el = generator();
    // A quarter of a turn takes one second of video.
    expect(coilEmf(el, magnetsAt(el, [['run', 1]]))).toBeCloseTo(PEAK, 3);
    expect(PEAK).toBeCloseTo(10.05, 2);
  });

  it('reverses its emf every half turn, and comes back after a whole turn', () => {
    const el = generator();
    expect(coilEmf(el, magnetsAt(el, [['run', 3]]))).toBeCloseTo(-PEAK, 3);
    expect(coilEmf(el, magnetsAt(el, [['run', 2]]))).toBeCloseTo(0, 2);
    expect(coilEmf(el, magnetsAt(el, [['run', 5]]))).toBeCloseTo(PEAK, 3);
    expect(magnetsAt(el, [['run', 4]]).spin?.angle).toBeCloseTo(90 + 360, 6);
  });

  it('follows a sine curve as it turns steadily', () => {
    const el = generator();
    for (const t of [0.4, 1.3, 2.9, 6.1]) expect(coilEmf(el, magnetsAt(el, [['run', t]]))).toBeCloseTo(PEAK * Math.sin((2 * Math.PI * t) / 4), 3);
  });

  it('is the rate at which the flux through the coil changes (Faraday\'s law)', () => {
    const el = generator();
    // Φ = B × area × cos of the angle the coil has turned from the upright place, for each of the 100 turns.
    const linked = (t: number) => 100 * 0.2 * (0.04 * 0.04) * Math.cos((2 * Math.PI * t) / 4);
    const [t, h] = [1.7, 1e-4];
    const rate = (linked(t + h) - linked(t - h)) / (2 * h * 0.005);
    expect(Math.abs(coilEmf(el, magnetsAt(el, [['run', t]])))).toBeCloseTo(Math.abs(rate), 3);
  });

  it('gives the emf of the coil unchanged through slip rings, and one sign only through a commutator', () => {
    const [ac, dc] = [generator(), generator({ slip: undefined, commutator: true })];
    let [low, least] = [0, 0];
    for (let t = 0; t <= 8; t += 0.05) {
      low = Math.min(low, coilOutput(ac, magnetsAt(ac, [['run', t]])));
      least = Math.min(least, coilOutput(dc, magnetsAt(dc, [['run', t]])));
    }
    expect(low).toBeCloseTo(-PEAK, 2);
    expect(least).toBe(0);
    expect(coilOutput(dc, magnetsAt(dc, [['run', 3]]))).toBeCloseTo(PEAK, 3);
  });

  it('doubles its greatest emf and its frequency when it is turned twice as fast', () => {
    const el = generator();
    const fast = magnetsAt(el, [['faster', 8]]);
    expect(fast.spin?.omega).toBeCloseTo(2 * Math.PI * 100, 9);
    let top = 0;
    for (let t = 4; t <= 8; t += 0.02) top = Math.max(top, Math.abs(coilEmf(el, magnetsAt(el, [['faster', t]]))));
    expect(top).toBeCloseTo(2 * PEAK, 1);
    // At 100 turns each second a whole turn takes two seconds of video.
    expect(magnetsAt(el, [['faster', 8]]).spin!.angle - magnetsAt(el, [['faster', 6]]).spin!.angle).toBeCloseTo(360, 6);
  });

  it('keeps the speed it is turned at, whatever the forces on it', () => {
    const el = generator({ load: 5 });
    expect(magnetsAt(el, [['run', 8]]).spin?.omega).toBeCloseTo(2 * Math.PI * 50, 12);
  });

  it('carries no current with nothing joined to it, and ε ÷ R with a load', () => {
    const open = generator();
    expect(coilSides(open, magnetsAt(open, [['run', 1]])).map((side) => side.amps)).toEqual([0, -0]);
    const el = generator({ load: 5 });
    const [a, b] = coilSides(el, magnetsAt(el, [['run', 1]]));
    expect(a.amps).toBeCloseTo(PEAK / 5, 3);
    expect(b.amps).toBeCloseTo(-PEAK / 5, 3);
  });

  it('is pushed back by the field when it gives a current: the forces oppose the turning (Lenz\'s law)', () => {
    const el = generator({ load: 5 });
    for (const t of [0.5, 1, 1.6, 2.7, 3.3]) {
      const state = magnetsAt(el, [['run', t]]);
      expect(coilTorque(el, state)).toBeLessThan(0);
    }
    // At the greatest emf each side feels NBIL, straight against its motion.
    const [a] = coilSides(el, magnetsAt(el, [['run', 1]]));
    expect(a.at[0]).toBeCloseTo(-5.4, 6);
    expect(a.force[1]).toBeCloseTo(100 * 0.2 * (PEAK / 5) * 0.04, 3);
  });

  it('takes as much work to turn as the electrical energy it gives: torque × ω = ε²÷R', () => {
    const el = generator({ load: 5 });
    for (const t of [0.7, 1, 2.2]) {
      const state = magnetsAt(el, [['run', t]]);
      expect(-coilTorque(el, state) * state.spin!.omega).toBeCloseTo(coilEmf(el, state) ** 2 / 5, 6);
    }
  });

  it('draws its emf against time, and starts the trace again after each sweep', () => {
    const el = generator();
    expect(magnetsAt(el).trace).toEqual([]);
    const part = magnetsAt(el, [['run', 3]]);
    expect(part.model).toBeCloseTo(0.015, 9);
    // A point is added every fourth step, so the last one is at most three steps old.
    expect(part.trace[part.trace.length - 1][0]).toBeCloseTo(0.015, 3);
    expect(Math.max(...part.trace.map((point) => point[1]))).toBeCloseTo(PEAK, 2);
    // One sweep is 40 ms, eight seconds of video; half a second into the next clip the trace has started again.
    const again = magnetsAt(el, [['run', 8], ['run', 0.5]]);
    expect(again.trace[again.trace.length - 1][0]).toBeCloseTo(0.0025, 3);
    expect(again.trace.length).toBeLessThan(40);
  });

  it('is checked: a driven coil carries no current of its own, and a trace needs a generator', () => {
    expect(checkMagnets(generator())).toEqual([]);
    expect(checkMagnets(generator({ load: 5 }))).toEqual([]);
    expect(checkMagnets(generator({ slip: undefined, commutator: true }))).toEqual([]);
    expect(checkMagnets(generator({ amps: 1 })).join(' ')).toContain('amps: 0');
    expect(checkMagnets(generator({ commutator: true })).join(' ')).toContain('not both');
    expect(checkMagnets(generator({ load: 0 })).join(' ')).toContain('resistance above zero');
    expect(checkMagnets(generator({}, { clips: { run: { phases: [{ dur: 2, amps: { c: 1 } }] } } })).join(' ')).toContain('coil that is driven');
    expect(checkMagnets(generator({}, { trace: { at: [2, 8], span: [-2, 2], volts: 20, seconds: 0.04 } })).join(' ')).toContain('inside the view');
    expect(checkMagnets(generator({}, { trace: { at: [2, 6.6], span: [-2, 2], volts: 0, seconds: 0.04 } })).join(' ')).toContain('above zero');
    expect(checkMagnets(motor({ slip: true })).join(' ')).toContain('only a coil that is driven');
    expect(checkMagnets(motor({}, { trace: { at: [-3, 3], span: [-2, 2], volts: 20, seconds: 0.04 } })).join(' ')).toContain('needs a coil that is driven');
    expect(checkMagnets(motor({}, { clips: { run: { phases: [{ dur: 2, drive: 20 }] } } })).join(' ')).toContain('no generator');
  });
});
