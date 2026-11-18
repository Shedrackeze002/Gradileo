import { describe, expect, it } from 'vitest';
import { checkInduction, checkScript, type Explainer, type InductionEl } from './script.ts';
import { ampsOf, circuitRect, emfOf, fluxArea, fluxOf, fluxRect, inductionAt, peakTesla, rodForce, rodLength } from './induction.ts';
import { clipSeconds, compile, stateAt } from './timeline.ts';

// The lesson's coil: 200 turns of area 0.0050 m² (10 cm by 5 cm), in a field into the page that rises steadily from 0.10 T to 0.60 T in 0.25 s.
const coil = (over: Partial<InductionEl> = {}): InductionEl => ({
  kind: 'induction',
  id: 'i',
  view: [-14, 14, -6, 6],
  length: { metres: 0.01, symbol: 'cm' },
  tesla: -0.1,
  loop: { id: 'c', rect: [-5, 5, -2.5, 2.5], turns: 200 },
  rate: 0.05,
  clips: { rise: { phases: [{ dur: 5, tesla: -0.6 }] }, fall: { phases: [{ dur: 5, tesla: -0.1 }] } },
  ...over,
});

// The lesson's rod: it slides at 6.0 m/s along rails 0.50 m apart, in a field of 0.40 T into the page, with 2.0 Ω between the rails.
const rails = (over: Partial<InductionEl> = {}): InductionEl => ({
  kind: 'induction',
  id: 'r',
  view: [-2.2, 2.2, -0.8, 0.8],
  tesla: -0.4,
  rails: { id: 'k', x: [-1.6, 1.9], y: [-0.25, 0.25], ohms: 2, rod: -1, speed: 6, mass: 0.004 },
  rate: 0.05,
  clips: { go: { phases: [{ dur: 6 }] }, start: { phases: [{ dur: 1, speed: 0 }, { dur: 1, speed: 6 }] }, free: { phases: [{ dur: 4, free: true }] } },
  ...over,
});

describe('the flux through a coil', () => {
  it('is Φ = BA', () => {
    const el = coil();
    const state = inductionAt(el);
    expect(fluxArea(el, state)).toBeCloseTo(0.005, 12);
    expect(fluxOf(el, state)).toBeCloseTo(-0.0005, 12);
    expect(fluxOf(el, inductionAt(el, [['rise', 5]]))).toBeCloseTo(-0.003, 12);
  });

  it('counts only the part of the coil that the field passes through', () => {
    const el = coil({ region: [0, 14, -6, 6] });
    expect(fluxRect(el, inductionAt(el))).toEqual([0, 5, -2.5, 2.5]);
    expect(fluxOf(el, inductionAt(el))).toBeCloseTo(-0.00025, 12);
    const missed = coil({ region: [8, 14, -6, 6] });
    expect(fluxRect(missed, inductionAt(missed))).toBeNull();
    expect(fluxOf(missed, inductionAt(missed))).toBeCloseTo(0, 15);
  });

  it('knows the strongest field of its clips', () => {
    expect(peakTesla(coil())).toBeCloseTo(0.6, 12);
    expect(peakTesla(coil({ clips: {} }))).toBeCloseTo(0.1, 12);
  });
});

describe('the emf induced in a coil', () => {
  it('is N ΔΦ ÷ Δt while the field changes: 2.0 V for the lesson\'s coil', () => {
    const el = coil();
    expect(Math.abs(emfOf(el, inductionAt(el, [['rise', 2]])))).toBeCloseTo(2.0, 9);
    expect(Math.abs(emfOf(el, inductionAt(el, [['rise', 4.9]])))).toBeCloseTo(2.0, 9);
  });

  it('is zero while the field is steady, however strong it is', () => {
    const el = coil();
    expect(emfOf(el, inductionAt(el))).toBe(0);
    expect(emfOf(el, inductionAt(el, [['rise', 5]]))).toBe(0);
    expect(emfOf(el, inductionAt(el, [['rise', 9]]))).toBe(0);
  });

  it('changes steadily, so the field is half way after half the time', () => {
    const el = coil();
    expect(inductionAt(el, [['rise', 2.5]]).tesla).toBeCloseTo(-0.35, 9);
    expect(inductionAt(el, [['rise', 2.5]]).time).toBeCloseTo(0.125, 9);
  });

  it('drives a current anticlockwise as a field into the page grows, and clockwise as it falls (Lenz\'s law)', () => {
    const el = coil({ loop: { id: 'c', rect: [-5, 5, -2.5, 2.5], turns: 200, ohms: 4 } });
    // An anticlockwise current makes a field out of the page inside the coil, against the growth of the field into the page.
    expect(emfOf(el, inductionAt(el, [['rise', 2]]))).toBeGreaterThan(0);
    expect(ampsOf(el, inductionAt(el, [['rise', 2]]))).toBeCloseTo(0.5, 9);
    expect(ampsOf(el, inductionAt(el, [['rise', 5], ['fall', 2]]))).toBeCloseTo(-0.5, 9);
    // With the field out of the page the same changes drive the current the other way.
    const out = coil({ tesla: 0.1, loop: { id: 'c', rect: [-5, 5, -2.5, 2.5], turns: 200, ohms: 4 }, clips: { rise: { phases: [{ dur: 5, tesla: 0.6 }] } } });
    expect(ampsOf(out, inductionAt(out, [['rise', 2]]))).toBeCloseTo(-0.5, 9);
  });

  it('drives no current in a coil that is joined only to a meter', () => {
    const el = coil();
    expect(ampsOf(el, inductionAt(el, [['rise', 2]]))).toBe(0);
    expect(inductionAt(el, [['rise', 5]]).drift).toBe(0);
  });

  it('is twice as large when the same change takes half the time', () => {
    const el = coil({ clips: { rise: { phases: [{ dur: 2.5, tesla: -0.6 }] } } });
    expect(Math.abs(emfOf(el, inductionAt(el, [['rise', 1]])))).toBeCloseTo(4.0, 9);
  });
});

describe('a rod that slides along two rails', () => {
  it('has the emf BLv: 1.2 V for the lesson\'s rod, and a current of 0.60 A', () => {
    const el = rails();
    const state = inductionAt(el, [['go', 1]]);
    expect(rodLength(el, state)).toBeCloseTo(0.5, 12);
    expect(Math.abs(emfOf(el, state))).toBeCloseTo(1.2, 9);
    expect(Math.abs(ampsOf(el, state))).toBeCloseTo(0.6, 9);
  });

  it('moves at its speed: 6.0 m/s for 0.05 s of the model each second of video', () => {
    const el = rails();
    expect(inductionAt(el, [['go', 2]]).rod).toBeCloseTo(-1 + 6 * 0.1, 9);
    expect(circuitRect(el, inductionAt(el, [['go', 2]]))).toEqual([-1.6, inductionAt(el, [['go', 2]]).rod, -0.25, 0.25]);
  });

  it('has an emf equal to the rate at which the flux through the circuit changes', () => {
    const el = rails();
    const [a, b] = [inductionAt(el, [['go', 1]]), inductionAt(el, [['go', 1.2]])];
    expect((fluxOf(el, b) - fluxOf(el, a)) / (b.time - a.time)).toBeCloseTo(-emfOf(el, a), 6);
  });

  it('sends the current up the rod when the rod moves right across a field into the page', () => {
    // The field pushes positive charges in the rod up the screen (v × B), and up the right-hand side of the circuit is anticlockwise.
    expect(ampsOf(rails(), inductionAt(rails(), [['go', 1]]))).toBeGreaterThan(0);
    const out = rails({ tesla: 0.4 });
    expect(ampsOf(out, inductionAt(out, [['go', 1]]))).toBeLessThan(0);
  });

  it('is pushed back by the field with F = BIL, against its motion, whichever way the field points', () => {
    const el = rails();
    expect(rodForce(el, inductionAt(el, [['go', 1]]))).toBeCloseTo(-0.12, 9);
    const out = rails({ tesla: 0.4 });
    expect(rodForce(out, inductionAt(out, [['go', 1]]))).toBeCloseTo(-0.12, 9);
    const back = rails({ rails: { id: 'k', x: [-1.6, 1.9], y: [-0.25, 0.25], ohms: 2, rod: 1, speed: -6 } });
    expect(rodForce(back, inductionAt(back, [['go', 1]]))).toBeCloseTo(0.12, 9);
  });

  it('has no emf at rest, and one that grows with its speed', () => {
    const el = rails({ rails: { id: 'k', x: [-1.6, 1.9], y: [-0.25, 0.25], ohms: 2, rod: -1 } });
    expect(emfOf(el, inductionAt(el))).toBe(0);
    expect(Math.abs(emfOf(el, inductionAt(el, [['start', 1], ['start', 1.5]])))).toBeCloseTo(0.6, 9);
    expect(Math.abs(emfOf(el, inductionAt(el, [['start', 2]])))).toBeCloseTo(1.2, 9);
  });

  it('has no emf once it is outside the field', () => {
    const el = rails({ region: [-2.2, 0, -0.8, 0.8] });
    expect(Math.abs(emfOf(el, inductionAt(el, [['go', 1]])))).toBeCloseTo(1.2, 9);
    const past = inductionAt(el, [['go', 5]]);
    expect(past.rod).toBeGreaterThan(0);
    expect(emfOf(el, past)).toBe(0);
    expect(rodForce(el, past)).toBe(0);
  });

  it('stops at the end of the rails', () => {
    const el = rails({ clips: { go: { phases: [{ dur: 20 }] } } });
    const state = inductionAt(el, [['go', 20]]);
    expect(state.rod).toBeLessThan(1.9);
    expect(state.rod).toBeGreaterThan(1.8);
    expect(state.v).toBe(0);
    expect(emfOf(el, state)).toBe(0);
  });

  it('slows down when it is let go, with the time constant mR ÷ B²L²', () => {
    const el = rails();
    // m R ÷ (B L)² = 0.004 × 2.0 ÷ 0.04 = 0.20 s of the model, which is 4 s of video.
    expect(inductionAt(el, [['free', 4]]).v / 6).toBeCloseTo(Math.exp(-1), 2);
    // It travels v × the time constant in all: 1.2 m.
    const long = rails({ clips: { free: { phases: [{ dur: 60, free: true }] } } });
    expect(inductionAt(long, [['free', 60]]).rod - -1).toBeCloseTo(1.2, 2);
  });

  it('turns the kinetic energy the rod loses into electrical energy: ∫I²R dt = ½mv² lost', () => {
    const el = rails();
    let heat = 0;
    const dt = 0.01;
    for (let t = dt / 2; t < 4; t += dt) heat += ampsOf(el, inductionAt(el, [['free', t]])) ** 2 * 2 * dt * 0.05;
    const v = inductionAt(el, [['free', 4]]).v;
    expect(heat).toBeCloseTo(0.5 * 0.004 * (36 - v * v), 3);
  });

  it('starts again from the first picture in a clip that resets', () => {
    const el = rails({ clips: { go: { reset: true, phases: [{ dur: 6 }] } } });
    expect(inductionAt(el, [['go', 6], ['go', 2]]).rod).toBeCloseTo(-1 + 6 * 0.1, 9);
    const twice = rails();
    expect(inductionAt(twice, [['go', 3], ['go', 2]]).rod).toBeCloseTo(-1 + 6 * 0.25, 9);
    // The arrowheads of the current carry on from where they were.
    expect(inductionAt(el, [['go', 6], ['go', 2]]).drift).toBeCloseTo(0.6 * 8, 6);
  });

  it('carries the arrowheads of the current further for a larger current', () => {
    const el = rails();
    expect(inductionAt(el, [['go', 2]]).drift).toBeCloseTo(1.2, 6);
    expect(inductionAt(el, [['go', 4]]).drift).toBeCloseTo(2.4, 6);
  });
});

describe('checking an induction element', () => {
  it('passes the pictures above', () => {
    expect(checkInduction(coil())).toEqual([]);
    expect(checkInduction(rails())).toEqual([]);
  });

  it('needs a coil or two rails, and not both', () => {
    expect(checkInduction(coil({ loop: undefined })).join(' ')).toContain('a coil or two rails');
    expect(checkInduction(coil({ rails: rails().rails })).join(' ')).toContain('a coil or two rails');
  });

  it('finds a coil outside the view, with no size, or with half a turn', () => {
    expect(checkInduction(coil({ loop: { id: 'c', rect: [-5, 20, -2.5, 2.5] } })).join(' ')).toContain('outside the view');
    expect(checkInduction(coil({ loop: { id: 'c', rect: [5, -5, -2.5, 2.5] } })).join(' ')).toContain('its right above its left');
    expect(checkInduction(coil({ loop: { id: 'c', rect: [-5, 5, -2.5, 2.5], turns: 1.5 } })).join(' ')).toContain('whole number of turns');
    expect(checkInduction(coil({ loop: { id: 'flux', rect: [-5, 5, -2.5, 2.5] } })).join(' ')).toContain('name of a part');
  });

  it('finds rails outside the view, with no resistance, or a rod that starts off them', () => {
    const k = rails().rails!;
    expect(checkInduction(rails({ rails: { ...k, x: [-3, 1.9] } })).join(' ')).toContain('outside the view');
    expect(checkInduction(rails({ rails: { ...k, ohms: 0 } })).join(' ')).toContain('resistance above zero');
    expect(checkInduction(rails({ rails: { ...k, rod: 2 } })).join(' ')).toContain('start on the rails');
  });

  it('finds a clip that moves a rod that is not there, or lets go a rod with no mass', () => {
    expect(checkInduction(coil({ clips: { go: { phases: [{ dur: 1, speed: 2 }] } } })).join(' ')).toContain('has no rails');
    const k = rails().rails!;
    expect(checkInduction(rails({ rails: { ...k, mass: undefined } })).join(' ')).toContain('needs a mass');
    expect(checkInduction(rails({ clips: { both: { phases: [{ dur: 1, speed: 2, free: true }] } } })).join(' ')).toContain('in the same phase');
    expect(checkInduction(rails({ clips: { none: { phases: [] } } })).join(' ')).toContain('no phases');
  });

  it('finds a rate of zero, a poster that is not a clip and a thumbnail part that is not a part', () => {
    expect(checkInduction(coil({ rate: 0 })).join(' ')).toContain('rate');
    expect(checkInduction(coil({ poster: 'nothing' })).join(' ')).toContain('poster');
    expect(checkInduction(coil({ thumb: ['lines'] })).join(' ')).toContain('thumbnail part');
  });
});

describe('an induction element in a video', () => {
  const video = (el: InductionEl, show: string[], play: string): Explainer => ({
    id: 'test',
    lessonId: 'test',
    title: 'Induction',
    summary: 'A test.',
    scenes: [{ layout: 'center', main: [el], lines: [{ say: 'Here is a circuit in a field.', show }, { say: 'Watch it change.', play }] }],
  });

  it('passes the script check, and a part that does not exist does not', () => {
    expect(checkScript(video(coil(), ['i', 'i.field', 'i.flux', 'i.emf'], 'i.rise'))).toEqual([]);
    expect(checkScript(video(rails(), ['r', 'r.field', 'r.current', 'r.force', 'r.velocity', 'r.charge'], 'r.go'))).toEqual([]);
    expect(checkScript(video(coil(), ['i', 'i.lines'], 'i.rise')).join(' ')).toContain('has no part "lines"');
  });

  it('plays its clip on the timeline', () => {
    const el = coil();
    const x = video(el, ['i', 'i.field'], 'i.rise');
    const tl = compile(x, { '0.0': 2, '0.1': 2 });
    expect(clipSeconds(el, 'rise')).toBe(5);
    const play = tl.scenes[0].events.find((ev) => ev.kind === 'play');
    expect(play).toBeDefined();
    const st = stateAt(tl, play!.t + 2.5).els.i;
    expect(st.plays).toEqual([['rise', 2.5]]);
    expect(inductionAt(el, st.plays).tesla).toBeCloseTo(-0.35, 6);
  });
});
