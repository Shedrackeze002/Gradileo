import { describe, expect, it } from 'vitest';
import { checkMagnets, checkScript, type Explainer, type MagnetsEl } from './script.ts';
import { barForce, fieldAt, magnetLines, magnetsAt, MU0, peakBarForce, polesOf, wireForce } from './magnets.ts';
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
