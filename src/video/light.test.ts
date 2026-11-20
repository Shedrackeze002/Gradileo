import { describe, expect, it } from 'vitest';
import { checkLight, checkScript, type Explainer, type LightEl } from './script.ts';
import {
  C,
  FACE,
  FIBRE,
  PRISM_COLOURS,
  REGIONS,
  TOLERANCE,
  chargeAt,
  fibreAt,
  fibreCentre,
  fibreCritical,
  fibrePath,
  fieldAt,
  incidenceOf,
  prismAt,
  prismIndex,
  prismPath,
  prismShape,
  reflectRay,
  refractRay,
  firstRate,
  lightWaveAt,
  realHertz,
  realMetres,
  regionOf,
  roundTrip,
  samplePixels,
  spectrumAt,
  spectrumShare,
  spinAt,
  spinRate,
  tiltOf,
  tripAt,
  tripMetres,
  tripRate,
  turnInTrip,
  visibleColour,
  waveShare,
} from './light.ts';
import { clipSeconds, compile, stateAt } from './timeline.ts';

// A wave from an aerial: half a cycle each second, and four seconds to cross the picture, so a wavelength is half of the path.
const wave = (over: Partial<NonNullable<LightEl['wave']>> = {}, clips: LightEl['clips'] = {}): LightEl => ({
  kind: 'light',
  id: 'em',
  wave: { hertz: 0.5, cross: 4, ...over },
  clips: { a: { phases: [{ dur: 8 }] }, start: { phases: [{ dur: 6, on: true }] }, stop: { phases: [{ dur: 6, on: false }] }, up: { phases: [{ dur: 4, hertz: 1 }, { dur: 4 }] }, ...clips },
});

/** A clip that turns a filter a quarter of a turn in four seconds. */
const TURN: LightEl['clips'] = { turn: { phases: [{ dur: 4, filter: 90 }, { dur: 4 }] } };

// The spectrum, with its pointer on a radio wave of 300 m.
const spectrum = (over: Partial<LightEl> = {}): LightEl => ({
  kind: 'light',
  id: 'range',
  spectrum: { at: 300 },
  clips: { hold: { phases: [{ dur: 4 }] }, radio: { phases: [{ dur: 3, to: 3 }, { dur: 5 }] } },
  ...over,
});

// The lesson's flash from the Sun: 1.50 × 10¹¹ m, with 62.5 s of the model in each second of video, so it takes 8 s of video.
const sun = (over: Partial<LightEl> = {}): LightEl => ({
  kind: 'light',
  id: 'sun',
  trip: { from: { shape: 'sun' }, to: { shape: 'earth' }, metres: 1.5e11 },
  rate: 62.5,
  clips: { wait: { phases: [{ dur: 2 }] }, go: { phases: [{ dur: 10, send: true }] } },
  ...over,
});

// The lesson's radar echo: an aircraft 60 km away, with 50 μs of the model in each second of video, so the echo takes 8 s of video.
const radar = (): LightEl => ({
  kind: 'light',
  id: 'radar',
  trip: { from: { shape: 'dish' }, to: { shape: 'plane' }, metres: 60_000, echo: true, clock: { unit: 'μs', seconds: 1e-6 }, length: { unit: 'km', metres: 1000 } },
  rate: 5e-5,
  clips: { go: { phases: [{ dur: 10, send: true }] }, again: { phases: [{ dur: 10, send: true }] } },
});

// The lesson's spinning mirror: the fixed mirror is 35 km away, and a round trip of the light is 2.5 s of video.
const mirror = (over: Partial<NonNullable<LightEl['spin']>> = {}): LightEl => ({
  kind: 'light',
  id: 'mich',
  spin: { metres: 35_000, ...over },
  clips: { rest: { phases: [{ dur: 6 }] }, slow: { phases: [{ dur: 3, hertz: 300 }, { dur: 9.6 }] }, up: { phases: [{ dur: 5, hertz: 536 }, { dur: 12 }] }, go: { phases: [{ dur: 20 }] } },
});

describe('a wave from an aerial', () => {
  it('is not there until the charge is driven, and then takes time to reach each place', () => {
    const el = wave({ on: false });
    const before = lightWaveAt(el);
    expect(chargeAt(before)).toBe(0);
    expect(fieldAt(el, before, 0.1)).toEqual({ e: [0, 0], b: [0, 0] });

    // Two seconds after the start, the wave has covered half of the path.
    const after = lightWaveAt(el, [['start', 2]]);
    expect(after.time).toBeCloseTo(2, 9);
    expect(after.phase).toBeCloseTo(2 * Math.PI, 9);
    expect(fieldAt(el, after, 0.75).e).toEqual([0, 0]);
    // An eighth of the way along, the wave is what the aerial sent half a second ago: three quarters of a cycle in.
    const near = fieldAt(el, after, 0.125);
    expect(near.e[0]).toBeCloseTo(-1, 6);
    expect(near.e[1]).toBe(0);
  });

  it('has a magnetic field at right angles to the electric field, in step with it', () => {
    const el = wave({ full: true });
    const state = lightWaveAt(el, [['a', 3.3]]);
    for (const x of [0.05, 0.3, 0.62, 0.9]) {
      const { e, b } = fieldAt(el, state, x);
      expect(e[0] * b[0] + e[1] * b[1]).toBeCloseTo(0, 9);
      expect(Math.hypot(...b)).toBeCloseTo(Math.hypot(...e), 9);
      // The electric field is up and down, so the magnetic field is towards you and away.
      expect(b[0]).toBeCloseTo(0, 9);
      expect(b[1]).toBeCloseTo(e[0], 9);
    }
  });

  it('fills the picture from the first moment with `full`, and repeats every wavelength', () => {
    const el = wave({ full: true });
    const state = lightWaveAt(el);
    expect(fieldAt(el, state, 0.3).e[0]).toBeCloseTo(Math.sin(-1.2 * Math.PI), 9);
    expect(waveShare(el, 0.5)).toBeCloseTo(0.5, 9);
    const later = lightWaveAt(el, [['a', 5]]);
    expect(fieldAt(el, later, 0.2).e[0]).toBeCloseTo(fieldAt(el, later, 0.7).e[0], 6);
    // Half a wavelength on, the field is the other way up.
    expect(fieldAt(el, later, 0.2).e[0]).toBeCloseTo(-fieldAt(el, later, 0.45).e[0], 6);
  });

  it('keeps its speed when the frequency is raised, so the wavelength shortens', () => {
    const el = wave({ full: true, real: 98.5e6 });
    expect(lightWaveAt(el, [['up', 2]]).hertz).toBeCloseTo(0.75, 9);
    const fast = lightWaveAt(el, [['up', 8]]);
    expect(fast.hertz).toBe(1);
    expect(waveShare(el, fast.hertz)).toBeCloseTo(0.25, 9);
    // The real wave: 98.5 MHz and 3.05 m at first, then 197 MHz and half of the wavelength.
    const first = lightWaveAt(el);
    expect(realHertz(el, first)).toBeCloseTo(98.5e6, 3);
    expect(realMetres(el, first)).toBeCloseTo(3.0457, 3);
    expect(realHertz(el, fast)).toBeCloseTo(197e6, 3);
    expect(realMetres(el, fast)).toBeCloseTo(1.5228, 3);
    expect(realHertz(el, fast) * realMetres(el, fast)).toBeCloseTo(C, 3);
  });

  it('goes on travelling after the charge stops', () => {
    const el = wave({ full: true });
    const state = lightWaveAt(el, [['a', 4.25], ['stop', 1]]);
    expect(state.amp).toBe(0);
    expect(chargeAt(state)).toBe(0);
    expect(fieldAt(el, state, 0.01).e).toEqual([0, 0]);
    // The far end is what the aerial sent 3.6 s ago, while it was still driven.
    expect(Math.abs(fieldAt(el, state, 0.9).e[0])).toBeGreaterThan(0.3);
  });

  it('moves the charge against the field it sends out', () => {
    const el = wave();
    const state = lightWaveAt(el, [['a', 0.5]]);
    expect(chargeAt(state)).toBeCloseTo(-1, 9);
    expect(fieldAt(el, state, 0).e[0]).toBeCloseTo(1, 9);
  });
});

describe('a polarizing filter', () => {
  it('passes the wave when it is lined up, and stops it when it is across', () => {
    const along = wave({ full: true, filter: { at: 0.5, angle: 0 } });
    const across = wave({ full: true, filter: { at: 0.5, angle: 90 } });
    const [a, b] = [lightWaveAt(along, [['a', 3.3]]), lightWaveAt(across, [['a', 3.3]])];
    expect(fieldAt(along, a, 0.8).e[0]).toBeCloseTo(fieldAt(wave({ full: true }), a, 0.8).e[0], 9);
    expect(Math.abs(fieldAt(along, a, 0.8).e[0])).toBeGreaterThan(0.1);
    expect(Math.hypot(...fieldAt(across, b, 0.8).e)).toBeCloseTo(0, 9);
    // Before the filter the wave is whole.
    expect(fieldAt(across, b, 0.3).e[0]).toBeCloseTo(fieldAt(along, a, 0.3).e[0], 9);
  });

  it('passes the part of the wave along its own direction', () => {
    const el = wave({ full: true, filter: { at: 0.5, angle: 45 } });
    const state = lightWaveAt(el, [['a', 3.3]]);
    const whole = fieldAt(wave({ full: true }), state, 0.8).e[0];
    const { e, b } = fieldAt(el, state, 0.8);
    expect(e[0]).toBeCloseTo(whole / 2, 9);
    expect(e[1]).toBeCloseTo(whole / 2, 9);
    expect(Math.hypot(...e)).toBeCloseTo(Math.abs(whole) * Math.SQRT1_2, 9);
    expect(e[0] * b[0] + e[1] * b[1]).toBeCloseTo(0, 9);
  });

  it('turns steadily, and the wave that passed it earlier keeps the direction it was given', () => {
    const el = wave({ full: true, filter: { at: 0.5, angle: 0 } }, TURN);
    expect(lightWaveAt(el, [['turn', 2]]).angle).toBeCloseTo(45, 9);
    const state = lightWaveAt(el, [['turn', 4.2]]);
    expect(state.angle).toBe(90);
    // Just beyond the filter nothing gets through now; the far end passed it 2 s ago, at about 50°.
    expect(Math.hypot(...fieldAt(el, state, 0.501).e)).toBeLessThan(0.01);
    const whole = fieldAt(wave({ full: true }), state, 1).e[0];
    expect(Math.abs(whole)).toBeGreaterThan(0.3);
    const far = fieldAt(el, state, 1).e;
    expect(Math.hypot(...far)).toBeCloseTo(Math.abs(whole) * Math.cos((49.5 * Math.PI) / 180), 6);
  });
});

describe('the electromagnetic spectrum', () => {
  it('names the region of a wavelength', () => {
    expect(REGIONS.map((r) => r.id)).toEqual(['radio', 'microwaves', 'infrared', 'visible', 'ultraviolet', 'xrays', 'gamma']);
    expect(regionOf(300).id).toBe('radio');
    expect(regionOf(3).id).toBe('radio');
    expect(regionOf(0.03).id).toBe('microwaves');
    expect(regionOf(1e-5).id).toBe('infrared');
    expect(regionOf(5.5e-7).id).toBe('visible');
    expect(regionOf(1e-7).id).toBe('ultraviolet');
    expect(regionOf(1e-9).id).toBe('xrays');
    expect(regionOf(1e-12).id).toBe('gamma');
    expect(regionOf(1e-15).id).toBe('gamma');
  });

  it('is drawn with each step ten times shorter', () => {
    expect(spectrumShare(1e4)).toBe(0);
    expect(spectrumShare(1e-13)).toBe(1);
    expect(spectrumShare(1)).toBeCloseTo(4 / 17, 9);
    expect(spectrumShare(1e-3) - spectrumShare(1)).toBeCloseTo(spectrumShare(1e-9) - spectrumShare(1e-6), 9);
    // The wave drawn over it shortens all the way along, from 300 px down to 14 px.
    expect(samplePixels(1e4)).toBeCloseTo(300, 9);
    expect(samplePixels(1e-13)).toBeCloseTo(14, 9);
    expect(samplePixels(1e-7)).toBeLessThan(samplePixels(1e-3));
  });

  it('slides its pointer by equal steps of the scale', () => {
    const el = spectrum();
    expect(spectrumAt(el).metres).toBe(300);
    expect(spectrumAt(el, [['hold', 3]]).metres).toBe(300);
    // From 300 m to 3 m in 3 s: halfway through, the pointer is at 30 m.
    expect(spectrumAt(el, [['radio', 1.5]]).metres).toBeCloseTo(30, 6);
    const after = spectrumAt(el, [['radio', 8]]);
    expect(after.metres).toBeCloseTo(3, 9);
    expect(after.time).toBeCloseTo(8, 9);
    // The wave over it keeps moving while the pointer rests, and a shorter wave passes a place more often.
    expect(after.cycles).toBeGreaterThan(spectrumAt(el, [['radio', 4]]).cycles);
    const [long, short] = [spectrumAt(spectrum(), [['hold', 4]]), spectrumAt(spectrum({ spectrum: { at: 1e-9 } }), [['hold', 4]])];
    expect(short.cycles).toBeGreaterThan(long.cycles);
  });

  it('gives visible light its colour', () => {
    const [red, green, blue] = [visibleColour(700), visibleColour(530), visibleColour(450)];
    expect(red[0]).toBe(255);
    expect(red[0]).toBeGreaterThan(red[1]);
    expect(green[1]).toBe(255);
    expect(green[1]).toBeGreaterThan(green[0]);
    expect(green[1]).toBeGreaterThan(green[2]);
    expect(blue[2]).toBe(255);
    expect(blue[2]).toBeGreaterThan(blue[0]);
    // Yellow is red and green together, and violet has red in it again.
    expect(visibleColour(580).slice(0, 2)).toEqual([255, 255]);
    expect(visibleColour(400)[0]).toBeGreaterThan(visibleColour(450)[0]);
    expect(visibleColour(1000)).toEqual([255, 255, 255]);
    expect(visibleColour(100)).toEqual([255, 255, 255]);
  });
});

describe('a trip of light', () => {
  it('takes 500 s from the Sun to the Earth', () => {
    const el = sun();
    expect(tripMetres(el)).toBe(1.5e11);
    const waiting = tripAt(el, [['wait', 2]]);
    expect([waiting.left, waiting.covered, waiting.clock, waiting.done]).toEqual([null, 0, 0, false]);
    // Four seconds of video are 250 s: the flash is half of the way there.
    const half = tripAt(el, [['wait', 2], ['go', 4]]);
    expect(half.left).toBeCloseTo(125, 9);
    expect(half.covered).toBeCloseTo(7.5e10, 0);
    expect(half.clock).toBeCloseTo(250, 6);
    expect(half.done).toBe(false);
    const there = tripAt(el, [['go', 8]]);
    expect(there.done).toBe(true);
    expect(there.clock).toBeCloseTo(500, 6);
    // The clock stops when the flash arrives.
    expect(tripAt(el, [['go', 10]]).clock).toBeCloseTo(500, 6);
    expect(tripAt(el, [['go', 10]]).out).toBeCloseTo(1.5e11, 0);
  });

  it('crosses in 2.5 s of video when no rate is given', () => {
    const el = sun({ rate: undefined });
    expect(tripRate(el)).toBeCloseTo(200, 9);
    expect(tripAt(el, [['go', 1.25]]).covered).toBeCloseTo(7.5e10, 0);
    expect(tripAt(el, [['go', 2.5]]).done).toBe(true);
  });

  it('goes there and back for an echo', () => {
    const el = radar();
    expect(tripMetres(el)).toBe(120_000);
    const out = tripAt(el, [['go', 2]]);
    expect(out.covered).toBeCloseTo(30_000, 6);
    expect(out.out).toBeCloseTo(30_000, 6);
    expect(out.back).toBe(false);
    // Six seconds of video are 300 μs: 90 km travelled, and 30 km from the dish on the way back.
    const back = tripAt(el, [['go', 6]]);
    expect(back.covered).toBeCloseTo(90_000, 6);
    expect(back.out).toBeCloseTo(30_000, 6);
    expect(back.back).toBe(true);
    expect(back.done).toBe(false);
    const done = tripAt(el, [['go', 10]]);
    expect(done.done).toBe(true);
    expect(done.clock).toBeCloseTo(400e-6, 12);
    expect(done.out).toBeCloseTo(0, 6);
    // The distance to the aircraft is half of what the pulse covered.
    expect(done.covered / 2).toBeCloseTo(60_000, 6);
  });

  it('starts again with a second flash', () => {
    const el = radar();
    const again = tripAt(el, [['go', 10], ['again', 2]]);
    expect(again.covered).toBeCloseTo(30_000, 6);
    expect(again.done).toBe(false);
  });
});

describe('a spinning mirror', () => {
  it('needs 536 turns each second for the next face to be in place', () => {
    const el = mirror();
    expect(roundTrip(el)).toBeCloseTo(70_000 / C, 12);
    expect(firstRate(el)).toBeCloseTo(535.71, 2);
    expect(turnInTrip(el, 536)).toBeCloseTo(0.125, 3);
    expect(turnInTrip(el, 300)).toBeCloseTo(0.07, 6);
    // The lesson's sum: 70 000 m × 8 × 536 is 3.00 × 10⁸ m/s.
    expect(70_000 * 8 * 536).toBeCloseTo(C, -6);
    expect(spinRate(el)).toBeCloseTo(roundTrip(el) / 2.5, 12);
  });

  it('brings an angle to within half a face of zero', () => {
    expect(tiltOf(0)).toBe(0);
    expect(tiltOf(FACE)).toBe(0);
    expect(tiltOf(5 * FACE)).toBe(0);
    expect(tiltOf(1.25 * FACE)).toBeCloseTo(0.25 * FACE, 9);
    expect(tiltOf(0.75 * FACE)).toBeCloseTo(-0.25 * FACE, 9);
  });

  it('sends a steady beam to the detector while it is at rest', () => {
    const el = mirror();
    const start = spinAt(el);
    expect([start.steady, start.since, start.time, start.flashes.length]).toEqual([true, 0, 0, 0]);
    const later = spinAt(el, [['rest', 5]]);
    expect(later.steady).toBe(true);
    expect(later.since).toBe(0);
    // Five seconds of video are two round trips of the light.
    expect(later.time / roundTrip(el)).toBeCloseTo(2, 6);
    expect(later.angle).toBe(0);
  });

  it('misses the detector at 300 turns each second', () => {
    const el = mirror();
    const state = spinAt(el, [['slow', 12.6]]);
    expect(state.hertz).toBe(300);
    expect([state.steady, state.since]).toEqual([false, null]);
    expect(state.sent).toBeGreaterThanOrEqual(2);
    expect([state.seen, state.hit]).toEqual([0, null]);
    // The mirror makes 0.56 of a face during the round trip, so the nearest face is 0.44 of a face short.
    // (A flash that came back is kept for one more round trip: the first is back about 8.5 s into the clip.)
    const back = spinAt(el, [['slow', 9.5]]).flashes.filter((flash) => flash.tilt !== null);
    expect(back.length).toBeGreaterThan(0);
    for (const flash of back) {
      expect(flash.tilt!).toBeCloseTo(-0.44 * FACE, 3);
      expect(Math.abs(flash.tilt!)).toBeGreaterThan(TOLERANCE);
    }
  });

  it('reaches the detector at 536 turns each second', () => {
    const el = mirror();
    const state = spinAt(el, [['slow', 12.6], ['up', 17], ['go', 20]]);
    expect(state.hertz).toBe(536);
    expect(state.seen).toBeGreaterThan(5);
    expect(state.hit).not.toBeNull();
    expect(state.sent).toBeGreaterThan(state.seen);
    const back = state.flashes.filter((flash) => flash.tilt !== null);
    expect(back.length).toBeGreaterThan(0);
    for (const flash of back) expect(Math.abs(flash.tilt!)).toBeLessThan(TOLERANCE);
    // A flash leaves each time a face comes into place, which is once in each round trip.
    const waiting = state.flashes.filter((flash) => flash.tilt === null);
    expect(waiting.length).toBe(1);
  });

  it('can start already spinning', () => {
    const el = mirror({ hertz: 536 });
    const state = spinAt(el, [['go', 20]]);
    expect(spinAt(el).steady).toBe(false);
    expect(spinAt(el).since).toBeNull();
    expect(state.sent).toBeGreaterThanOrEqual(7);
    expect(state.seen).toBe(state.sent - 1);
    // Twice as fast, two faces pass during the round trip, and the light arrives again.
    const double = spinAt(mirror({ hertz: 1072 }), [['go', 20]]);
    expect(double.seen).toBeGreaterThan(state.seen);
    // Half as fast again, the faces are halfway between places when the light is back.
    const between = spinAt(mirror({ hertz: 804 }), [['go', 20]]);
    expect(between.seen).toBe(0);
  });
});

// White light that meets a 60° prism at 50° to the normal of its first face.
const prism = (over: Partial<NonNullable<LightEl['prism']>> = {}, clips: LightEl['clips'] = {}): LightEl => ({ kind: 'light', id: 'pr', prism: { angle: 50, ...over }, clips: { a: { phases: [{ dur: 6 }] }, turn: { phases: [{ dur: 4, angle: 64 }] }, ...clips } });
// A ray that enters an optical fibre at 20° to its axis.
const fibre = (over: Partial<NonNullable<LightEl['fibre']>> = {}, clips: LightEl['clips'] = {}): LightEl => ({ kind: 'light', id: 'fb', fibre: { angle: 20, ...over }, clips: { a: { phases: [{ dur: 6 }] }, steep: { phases: [{ dur: 4, angle: 50 }] }, ...clips } });
const DEG = Math.PI / 180;

describe('refraction of a ray', () => {
  it("follows Snell's law: 40.0° in air is 25.0° in crown glass", () => {
    const d = refractRay([Math.sin(40 * DEG), -Math.cos(40 * DEG)], [0, 1], 1, 1.52)!;
    expect(Math.asin(d[0]) / DEG).toBeCloseTo(25.0, 1);
    expect(d[1]).toBeLessThan(0);
    expect(Math.hypot(d[0], d[1])).toBeCloseTo(1);
    expect(incidenceOf(d, [0, 1])).toBeCloseTo(25.0, 1);
  });

  it('lets no light cross beyond the critical angle: 41.1° for crown glass in air', () => {
    const from = (angle: number) => refractRay([Math.sin(angle * DEG), -Math.cos(angle * DEG)], [0, 1], 1.52, 1);
    expect(from(41)).not.toBeNull();
    expect(from(41.2)).toBeNull();
    // A ray along the normal goes straight on.
    expect(from(0)![0]).toBeCloseTo(0);
  });

  it('reflects a ray at the angle it arrives at', () => {
    const d = reflectRay([Math.sin(55 * DEG), -Math.cos(55 * DEG)], [0, 1]);
    expect(d[0]).toBeCloseTo(Math.sin(55 * DEG));
    expect(d[1]).toBeCloseTo(Math.cos(55 * DEG));
  });
});

describe('a prism', () => {
  it('has an index that rises from red to violet', () => {
    expect(prismIndex(prism(), 700)).toBeCloseTo(1.5);
    expect(prismIndex(prism(), 400)).toBeCloseTo(1.56);
    expect(prismIndex(prism(), 550)).toBeCloseTo(1.53);
    expect(prismIndex(prism({ index: [1.5, 1.6] }), 400)).toBeCloseTo(1.6);
    expect(PRISM_COLOURS[0]).toBeGreaterThan(PRISM_COLOURS[PRISM_COLOURS.length - 1]);
  });

  it('has sloping sides one unit long', () => {
    const { top, left, right } = prismShape(prism());
    expect(Math.hypot(top[0] - left[0], top[1] - left[1])).toBeCloseTo(1);
    expect(Math.hypot(top[0] - right[0], top[1] - right[1])).toBeCloseTo(1);
    expect(right[0] - left[0]).toBeCloseTo(1);
    expect(prismShape(prism({ apex: 90 })).top[1]).toBeCloseTo(Math.SQRT1_2);
  });

  it('turns each colour by the angle that two refractions give', () => {
    // Red light, n = 1.50, at 50° on a 60° prism: 30.7° inside, 29.3° at the second face, and 47.2° beyond it, so it is turned through 50 + 47.2 − 60 = 37.2°.
    const red = prismPath(prism(), 50, 700);
    expect(red.index).toBeCloseTo(1.5);
    expect(incidenceOf(red.inside, [-Math.cos(30 * DEG), Math.sin(30 * DEG)])).toBeCloseTo(30.71, 1);
    expect(red.deviation).toBeCloseTo(37.2, 0);
    // The light enters half way up the first face, and leaves from the second.
    expect(red.enter[0]).toBeCloseTo(-0.25);
    expect(red.leave[0]).toBeGreaterThan(0);
    expect(red.leave[1]).toBeCloseTo((0.5 - red.leave[0]) * Math.tan(60 * DEG));
  });

  it('bends violet the most and red the least', () => {
    const turned = PRISM_COLOURS.map((nm) => prismPath(prism(), 50, nm).deviation!);
    for (let i = 1; i < turned.length; i++) expect(turned[i]).toBeGreaterThan(turned[i - 1]);
    expect(turned[turned.length - 1] - turned[0]).toBeGreaterThan(3);
  });

  it('cannot let the light out when it meets the second face beyond the critical angle', () => {
    const path = prismPath(prism(), 10, 700);
    expect(path.out).toBeNull();
    expect(path.deviation).toBeNull();
  });

  it('turns the incoming ray while a clip plays', () => {
    expect(prismAt(prism())).toEqual({ time: 0, angle: 50 });
    expect(prismAt(prism(), [['a', 6]])).toEqual({ time: 6, angle: 50 });
    expect(prismAt(prism(), [['a', 6], ['turn', 2]]).angle).toBeCloseTo(57);
    expect(prismAt(prism(), [['a', 6], ['turn', 4]])).toEqual({ time: 10, angle: 64 });
  });
});

describe('an optical fibre', () => {
  it('has a critical angle set by its two indices', () => {
    expect(fibreCritical(fibre())).toBeCloseTo(53.13, 1);
    expect(fibreCritical(fibre({ index: [1.48, 1.46] }))).toBeCloseTo(80.6, 1);
  });

  it('holds in a ray that meets the wall beyond the critical angle, all the way round the bend', () => {
    const path = fibrePath(fibre(), 20);
    expect(path.bounces.length).toBeGreaterThanOrEqual(3);
    for (const bounce of path.bounces) {
      expect(bounce.total).toBe(true);
      expect(bounce.escape).toBeNull();
      expect(bounce.incidence).toBeGreaterThan(53.13);
      // Every bounce is at the wall of the core.
      expect(Math.abs(bounce.at[1] - fibreCentre(bounce.at[0]))).toBeCloseTo(FIBRE.half, 0);
    }
    expect(path.through).toBe(1);
    expect(path.points[0].at).toEqual([0, fibreCentre(0)]);
    expect(path.points[path.points.length - 1].at[0]).toBeGreaterThanOrEqual(FIBRE.length);
    expect(path.length).toBeGreaterThan(FIBRE.length);
  });

  it('loses most of the light at each bounce when the ray is too steep', () => {
    const path = fibrePath(fibre(), 50);
    expect(path.bounces[0].total).toBe(false);
    expect(path.bounces[0].incidence).toBeLessThan(53.13);
    // The light that escapes bends away from the normal of the wall, by Snell's law.
    const out = path.bounces[0].escape!;
    expect(out[1]).toBeGreaterThan(0);
    expect(path.points[2].strength).toBeCloseTo(0.25);
    expect(path.through).toBe(0);
  });

  it('turns the incoming ray while a clip plays', () => {
    expect(fibreAt(fibre())).toEqual({ time: 0, angle: 20 });
    expect(fibreAt(fibre(), [['a', 6], ['steep', 4]])).toEqual({ time: 10, angle: 50 });
  });
});

describe('the checks of a light element', () => {
  it('passes the pictures of the lesson', () => {
    expect(checkLight(wave())).toEqual([]);
    expect(checkLight(wave({ full: true, filter: { at: 0.5, angle: 0 }, real: 98.5e6 }, TURN))).toEqual([]);
    expect(checkLight(spectrum())).toEqual([]);
    expect(checkLight(sun())).toEqual([]);
    expect(checkLight(radar())).toEqual([]);
    expect(checkLight(mirror())).toEqual([]);
    expect(checkLight(mirror({ hertz: 536 }))).toEqual([]);
    expect(checkLight(prism())).toEqual([]);
    expect(checkLight(prism({ apex: 45, index: [1.5, 1.6] }))).toEqual([]);
    expect(checkLight(fibre())).toEqual([]);
  });

  it('keeps a prism and a fibre within what can be drawn', () => {
    expect(checkLight(prism({ angle: 5 })).join(' ')).toContain('10° to 85°');
    expect(checkLight(prism({ apex: 120 })).join(' ')).toContain('30° to 90°');
    expect(checkLight(prism({ index: [1.6, 1.5] })).join(' ')).toContain('no smaller for violet');
    expect(checkLight(prism({}, { far: { phases: [{ dur: 2, angle: 88 }] } })).join(' ')).toContain('past what the prism can take');
    expect(checkLight(fibre({ angle: 85 })).join(' ')).toContain('1° to 80°');
    expect(checkLight(fibre({ index: [1.2, 1.5] })).join(' ')).toContain('larger refractive index than the cladding');
    expect(checkLight(fibre({}, { far: { phases: [{ dur: 2, angle: 0 }] } })).join(' ')).toContain('past what the fibre can take');
    expect(checkLight(sun({ clips: { go: { phases: [{ dur: 8, angle: 30 }] } } })).join(' ')).toContain('not a prism or a fibre');
  });

  it('wants exactly one picture', () => {
    expect(checkLight({ kind: 'light', id: 'x', clips: {} }).join(' ')).toContain('exactly one of');
    expect(checkLight({ ...wave(), spectrum: { at: 1 } }).join(' ')).toContain('exactly one of');
  });

  it('finds what a picture cannot have', () => {
    expect(checkLight(wave({ hertz: 0 })).join(' ')).toContain('frequency above zero');
    expect(checkLight(wave({ cross: 0 })).join(' ')).toContain('more than zero seconds to cross');
    expect(checkLight(wave({ filter: { at: 1.2, angle: 0 } })).join(' ')).toContain('part of the way along the path');
    expect(checkLight(wave({ real: 0 })).join(' ')).toContain('real frequency');
    expect(checkLight(spectrum({ spectrum: { at: 1e5 } })).join(' ')).toContain('pointer must start');
    expect(checkLight(sun({ trip: { from: { shape: 'sun' }, to: { shape: 'earth' }, metres: 0 } })).join(' ')).toContain('distance above zero');
    expect(checkLight(sun({ trip: { from: { shape: 'sun' }, to: { shape: 'earth' }, metres: 1, clock: { unit: 's', seconds: 0 } } })).join(' ')).toContain('unit of the clock');
    expect(checkLight(sun({ trip: { from: { shape: 'sun' }, to: { shape: 'earth' }, metres: 1, length: { unit: 'km', metres: 0 } } })).join(' ')).toContain('unit of length');
    expect(checkLight(mirror({ metres: 0 })).join(' ')).toContain('fixed mirror needs a distance');
    expect(checkLight(mirror({ hertz: -1 })).join(' ')).toContain('negative number of times');
    expect(checkLight(sun({ rate: 0 })).join(' ')).toContain('rate must be more than zero');
    expect(checkLight({ ...wave(), rate: 2 }).join(' ')).toContain('only a trip or a spinning mirror has a rate');
    expect(checkLight({ ...wave(), poster: 'nothing' }).join(' ')).toContain('poster clip "nothing"');
    expect(checkLight({ ...wave(), poster: 'a', posterAt: 0 }).join(' ')).toContain('`posterAt`');
    expect(checkLight({ ...wave(), thumb: ['electric', 'flux' as 'electric'] }).join(' ')).toContain('thumbnail part "flux"');
  });

  it('finds clips that ask for what the picture does not have', () => {
    expect(checkLight(wave({}, { none: { phases: [] } })).join(' ')).toContain('clip "none" has no phases');
    expect(checkLight(wave({}, { zero: { phases: [{ dur: 0 }] } })).join(' ')).toContain('a phase with no duration');
    expect(checkLight(wave({}, { low: { phases: [{ dur: 2, hertz: 0 }] } })).join(' ')).toContain('clip "low" needs a frequency above zero');
    expect(checkLight({ ...wave(), clips: { turn: { phases: [{ dur: 2, filter: 90 }] } } }).join(' ')).toContain('turns a filter');
    expect(checkLight({ ...wave(), clips: { slide: { phases: [{ dur: 2, to: 1 }] } } }).join(' ')).toContain('slides a pointer');
    expect(checkLight({ ...wave(), clips: { send: { phases: [{ dur: 2, send: true }] } } }).join(' ')).toContain('sends a flash');
    expect(checkLight({ ...sun(), clips: { on: { phases: [{ dur: 2, on: true }] } } }).join(' ')).toContain('starts or stops a charge');
    expect(checkLight({ ...spectrum(), clips: { up: { phases: [{ dur: 2, hertz: 3 }] } } }).join(' ')).toContain('sets a frequency');
    expect(checkLight({ ...spectrum(), clips: { off: { phases: [{ dur: 2, to: 1e6 }] } } }).join(' ')).toContain('off the spectrum');
    expect(checkLight({ ...mirror(), clips: { back: { phases: [{ dur: 2, hertz: -5 }] } } }).join(' ')).toContain('negative number of times');
    expect(checkLight({ ...mirror(), clips: { send: { phases: [{ dur: 2, send: true }] } } }).join(' ')).toContain('sends a flash');
  });
});

describe('a light element in a video', () => {
  const video = (el: LightEl, show: string[], play: string): Explainer => ({
    id: 'test',
    lessonId: 'test',
    title: 'Light',
    summary: 'A test.',
    scenes: [{ layout: 'center', main: [el], lines: [{ say: 'Here is some light.', show }, { say: 'Watch it travel.', play }] }],
  });
  const filtered = () => wave({ full: true, filter: { at: 0.5, angle: 0 } }, TURN);

  it('passes the script check, and a part that does not exist does not', () => {
    expect(checkScript(video(filtered(), ['em', 'em.electric', 'em.magnetic', 'em.wavelength', 'em.speed', 'em.values'], 'em.a'))).toEqual([]);
    expect(checkScript(video(spectrum(), ['range', 'range.scale', 'range.wave', 'range.made', 'range.use', 'range.visible', 'range.ionizing', 'range.arrows'], 'range.radio'))).toEqual([]);
    expect(checkScript(video(sun(), ['sun', 'sun.clock', 'sun.distance', 'sun.travelled'], 'sun.go'))).toEqual([]);
    expect(checkScript(video(mirror(), ['mich', 'mich.rate', 'mich.turn', 'mich.clock', 'mich.distance'], 'mich.slow'))).toEqual([]);
    expect(checkScript(video(filtered(), ['em', 'em.flux'], 'em.a')).join(' ')).toContain('has no part "flux"');
    expect(checkScript(video(sun({ rate: 0 }), ['sun'], 'sun.go')).join(' ')).toContain('light "sun"');
  });

  it('plays its clips on the timeline', () => {
    const el = filtered();
    const tl = compile(video(el, ['em', 'em.electric'], 'em.up'), { '0.0': 2, '0.1': 2 });
    expect(clipSeconds(el, 'a')).toBe(8);
    expect(clipSeconds(el, 'up')).toBe(8);
    const play = tl.scenes[0].events.find((ev) => ev.kind === 'play');
    expect(play).toBeDefined();
    const st = stateAt(tl, play!.t + 2).els.em;
    expect(st.plays).toEqual([['up', 2]]);
    expect(lightWaveAt(el, st.plays).hertz).toBeCloseTo(0.75, 9);

    const trip = radar();
    const tl2 = compile(video(trip, ['radar', 'radar.clock'], 'radar.go'), { '0.0': 2, '0.1': 2 });
    const play2 = tl2.scenes[0].events.find((ev) => ev.kind === 'play');
    const st2 = stateAt(tl2, play2!.t + 6).els.radar;
    expect(st2.plays).toEqual([['go', 6]]);
    expect(tripAt(trip, st2.plays).back).toBe(true);
  });
});
