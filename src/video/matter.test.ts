import { describe, expect, it } from 'vitest';
import { checkMatter, type MatterEl } from './script.ts';
import { FRINGE_REACH, NICKEL, PROTON, RINGS, chance, comeOff, deBroglie, electronNm, fringe, landing, massOf, matterAt, momentumFromEnergy, offAngle, paceOf, ringLanding, ringRadius, speedFromVolts, strongAngle, tally } from './matter.ts';
import { ELECTRON, EV } from './photons.ts';

const wave = (more: Partial<MatterEl> = {}): MatterEl => ({ kind: 'matter', id: 'm', picture: 'wave', speed: 2.0e6, clips: { a: { phases: [{ dur: 10 }] } }, ...more });
const slits = (more: Partial<MatterEl> = {}): MatterEl => ({ kind: 'matter', id: 's', picture: 'slits', rate: 20, clips: { a: { phases: [{ dur: 10 }] } }, ...more });

describe('the de Broglie wavelength', () => {
  it('is h ÷ mv, with the numbers of the lesson', () => {
    expect(deBroglie(ELECTRON, 2.0e6)).toBeCloseTo(3.64e-10, 12);
    expect(deBroglie(0.145, 40)).toBeCloseTo(1.14e-34, 36);
    expect(6.63e-34 / (ELECTRON * 0.5e-9)).toBeCloseTo(1.46e6, -4);
    expect(massOf('proton')).toBe(PROTON);
    expect(massOf(undefined)).toBe(ELECTRON);
    expect(massOf({ name: 'Baseball', mass: 0.145 })).toBe(0.145);
  });

  it('halves when the speed doubles, and is far shorter for a proton at the same speed', () => {
    expect(deBroglie(ELECTRON, 4.0e6) / deBroglie(ELECTRON, 2.0e6)).toBeCloseTo(0.5, 12);
    expect(deBroglie(ELECTRON, 1e6) / deBroglie(PROTON, 1e6)).toBeCloseTo(1833, 0);
  });

  it('follows from the voltage that accelerates an electron, or from its kinetic energy', () => {
    expect(speedFromVolts(150)).toBeCloseTo(7.26e6, -4);
    expect(deBroglie(ELECTRON, speedFromVolts(150))).toBeCloseTo(1.0e-10, 12);
    expect(momentumFromEnergy(54 * EV)).toBeCloseTo(3.97e-24, 26);
    expect(electronNm(54)).toBeCloseTo(0.167, 3);
    // Four times the voltage: twice the speed, and half the wavelength.
    expect(electronNm(600) / electronNm(150)).toBeCloseTo(0.5, 10);
  });
});

describe('a particle and its wave', () => {
  it('slides the speed, and moves the particle faster as it does', () => {
    const el = wave({ speed: 1.5e6, clips: { a: { phases: [{ dur: 4 }, { dur: 4, speed: 4.5e6 }] } } });
    const early = matterAt(el, [['a', 4]]);
    const late = matterAt(el, [['a', 8]]);
    expect(early.speed).toBe(1.5e6);
    expect(late.speed).toBe(4.5e6);
    expect(early.travel).toBeCloseTo(4 * paceOf(1.5e6, 1.5e6), 6);
    expect(late.travel - early.travel).toBeGreaterThan(early.travel);
  });

  it('finds the speed from the voltage when it is given no speed', () => {
    const el = wave({ speed: undefined, volts: 150, clips: { a: { phases: [{ dur: 5, volts: 600 }] } } });
    expect(matterAt(el).speed).toBeCloseTo(7.26e6, -4);
    const after = matterAt(el, [['a', 5]]);
    expect(after.volts).toBe(600);
    expect(after.speed).toBeCloseTo(2 * speedFromVolts(150), 3);
  });
});

describe('the numbers that a particle draws', () => {
  it('are the same every time, from 0 up to 1, and evenly spread', () => {
    const drawn = Array.from({ length: 4000 }, (_, i) => chance(i + 1, 1));
    expect(chance(17, 1)).toBe(chance(17, 1));
    expect(chance(17, 1)).not.toBe(chance(17, 2));
    expect(Math.min(...drawn)).toBeGreaterThanOrEqual(0);
    expect(Math.max(...drawn)).toBeLessThan(1);
    for (let band = 0; band < 10; band++) {
      const inBand = drawn.filter((u) => u >= band / 10 && u < (band + 1) / 10).length;
      expect(inBand).toBeGreaterThan(320);
      expect(inBand).toBeLessThan(480);
    }
  });
});

describe('two slits, one particle at a time', () => {
  it('is bright where the waves agree and dark where they cancel', () => {
    expect(fringe(0)).toBe(1);
    expect(fringe(0.5)).toBeCloseTo(0, 12);
    expect(fringe(1)).toBeGreaterThan(0.8);
    expect(fringe(1.5)).toBeCloseTo(0, 12);
    expect(fringe(2)).toBeLessThan(fringe(1));
  });

  it('lands each particle at one place, always the same, and never outside the screen', () => {
    for (let n = 1; n <= 500; n++) {
      expect(landing(n)).toBe(landing(n));
      expect(Math.abs(landing(n))).toBeLessThanOrEqual(FRINGE_REACH);
    }
  });

  it('builds up the fringes: many dots where the pattern is bright, and almost none where it is dark', () => {
    // Twelve strips to each fringe spacing.
    const bins = 132;
    const counts = tally(6000, bins);
    expect(counts.reduce((a, b) => a + b, 0)).toBe(6000);
    const at = (y: number) => counts[Math.floor(((y + FRINGE_REACH) / (2 * FRINGE_REACH)) * bins)];
    for (const bright of [0.02, 1.02, -0.98, 2.02]) for (const dark of [0.5, -0.5, 1.5, -1.5]) expect(at(bright)).toBeGreaterThan(8 * Math.max(1, at(dark)));
    // And the first few dots give no hint of it.
    expect(Math.max(...tally(12, bins))).toBeLessThanOrEqual(3);
  });

  it('sends the particles at the rate of the clip, and never moves one between frames', () => {
    const el = slits({ rate: 2, clips: { a: { phases: [{ dur: 5 }, { dur: 5, rate: 100 }] } } });
    const early = matterAt(el, [['a', 6.013]]);
    const late = matterAt(el, [['a', 10]]);
    expect(matterAt(el, [['a', 5]]).sent).toHaveLength(10);
    expect(late.sent.length).toBeGreaterThan(200);
    early.sent.forEach((sent, i) => expect(late.sent[i].at).toBeCloseTo(sent.at, 9));
  });
});

describe('electrons and a crystal', () => {
  it('sends the strong beam where d sin θ = λ', () => {
    const nm = electronNm(54);
    const angle = strongAngle(nm)!;
    expect(NICKEL * Math.sin((angle * Math.PI) / 180)).toBeCloseTo(nm, 10);
    expect(angle).toBeGreaterThan(49);
    expect(angle).toBeLessThan(52);
    // A wavelength longer than the spacing gives no strong beam at all.
    expect(strongAngle(0.3)).toBeUndefined();
  });

  it('counts most electrons at that angle, and sends most of them there', () => {
    const nm = electronNm(54);
    const angle = strongAngle(nm)!;
    expect(comeOff(angle, nm)).toBeGreaterThan(3 * comeOff(angle - 20, nm));
    expect(comeOff(angle, nm)).toBeGreaterThan(3 * comeOff(angle + 20, nm));
    const angles = Array.from({ length: 3000 }, (_, i) => offAngle(i + 1, nm));
    const near = (a: number) => angles.filter((x) => Math.abs(x - a) < 5).length;
    expect(near(angle)).toBeGreaterThan(2.5 * near(angle - 20));
    expect(Math.min(...angles)).toBeGreaterThanOrEqual(8);
    expect(Math.max(...angles)).toBeLessThanOrEqual(88);
  });

  it('swings the detector, and remembers how far it has been', () => {
    const el: MatterEl = { kind: 'matter', id: 'c', picture: 'crystal', volts: 54, rate: 8, detector: 20, clips: { a: { phases: [{ dur: 6, detector: 80 }, { dur: 3, detector: 51 }] } } };
    const state = matterAt(el, [['a', 9]]);
    expect(state.detector).toBe(51);
    expect(state.swept).toEqual([20, 80]);
  });
});

describe('rings from a foil', () => {
  it('shrinks the rings in step with the wavelength', () => {
    const [slow, fast] = [electronNm(10000), electronNm(40000)];
    for (let k = 0; k < RINGS.length; k++) expect(ringRadius(fast, k) / ringRadius(slow, k)).toBeCloseTo(0.5, 10);
    expect(ringRadius(slow, 2)).toBeLessThan(1);
    expect(ringRadius(slow, 0)).toBeLessThan(ringRadius(slow, 1));
  });

  it('lands most electrons close to a ring', () => {
    const nm = electronNm(10000);
    const hits = Array.from({ length: 2000 }, (_, i) => ringLanding(i + 1, nm));
    const close = hits.filter((hit) => RINGS.some((_, k) => Math.abs(hit.r - ringRadius(nm, k)) < 0.05)).length;
    expect(close).toBeGreaterThan(1500);
    expect(hits.filter((hit) => hit.r < 0.08).length).toBeGreaterThan(100);
  });
});

describe('checking a matter element', () => {
  it('passes each picture', () => {
    expect(checkMatter(wave())).toEqual([]);
    expect(checkMatter(wave({ speed: undefined, volts: 150, clips: { a: { phases: [{ dur: 5, volts: 600 }] } } }))).toEqual([]);
    expect(checkMatter(slits())).toEqual([]);
    expect(checkMatter({ kind: 'matter', id: 'c', picture: 'crystal', volts: 54, rate: 8, detector: 20, clips: { a: { phases: [{ dur: 6, detector: 80 }] } } })).toEqual([]);
    expect(checkMatter({ kind: 'matter', id: 'r', picture: 'rings', volts: 10000, rate: 150, clips: { a: { phases: [{ dur: 6, volts: 40000 }] } } })).toEqual([]);
  });

  it('refuses a wave with no speed, a picture with nothing to send, and a clip that changes what is not there', () => {
    expect(checkMatter(wave({ speed: undefined })).join(' ')).toContain('needs a speed');
    expect(checkMatter(wave({ volts: 150 })).join(' ')).toContain('not both');
    expect(checkMatter(slits({ rate: undefined })).join(' ')).toContain('needs a rate');
    expect(checkMatter(slits({ clips: { a: { phases: [{ dur: 5, rate: 500 }] } } })).join(' ')).toContain('cannot draw');
    expect(checkMatter(wave({ clips: { a: { phases: [{ dur: 5, detector: 40 }] } } })).join(' ')).toContain('detector');
    expect(checkMatter(wave({ clips: { a: { phases: [{ dur: 5, volts: 300 }] } } })).join(' ')).toContain('has none');
    expect(checkMatter(wave({ thumb: ['nothing' as never] })).join(' ')).toContain('not a part');
  });
});
