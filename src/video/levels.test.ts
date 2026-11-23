import { describe, expect, it } from 'vitest';
import { checkLevels, type LevelsEl } from './script.ts';
import { ARRIVE, BOHR, bandOf, hertzOf, hydrogen, jumpVolts, levelsAt, levelsOf, linesFrom, linesOf, meets, nmOf, orbitRadius, spinOf, turnAt } from './levels.ts';

const el = (more: Partial<LevelsEl> = {}): LevelsEl => ({ kind: 'levels', id: 'a', clips: { a: { phases: [{ dur: 4 }] } }, ...more });
const H = [1, 2, 3, 4, 5, 6].map(hydrogen);

describe('the energy levels of hydrogen', () => {
  it('are the ones the lesson lists', () => {
    expect(H).toEqual([-13.6, -3.4, -1.51, -0.85, -0.544, -0.378]);
    expect(levelsOf(el())).toEqual([-13.6, -3.4, -1.51, -0.85]);
    expect(levelsOf(el({ picture: 'spectrum' }))).toHaveLength(6);
    expect(levelsOf(el({ top: 5 }))).toHaveLength(5);
    expect(levelsOf(el({ levels: [-10.4, -5.5, -3.7, -1.6] }))).toEqual([-10.4, -5.5, -3.7, -1.6]);
  });

  it('have orbits n² times as large as the first', () => {
    expect(orbitRadius(1)).toBe(BOHR);
    expect(orbitRadius(3) / 1e-10).toBeCloseTo(4.76, 2);
  });
});

describe('the photon of a jump', () => {
  it('gives the numbers of the lesson', () => {
    // The red line of hydrogen, 3 to 2.
    expect(jumpVolts(H, 3, 2)).toBe(1.89);
    expect(nmOf(1.89)).toBeCloseTo(658, 0);
    expect(bandOf(nmOf(1.89))).toBe('visible');
    // 2 to 1 is ultraviolet.
    expect(jumpVolts(H, 2, 1)).toBe(10.2);
    expect(nmOf(10.2)).toBeCloseTo(122, 0);
    expect(bandOf(nmOf(10.2))).toBe('ultraviolet');
    // 2 to 4 takes in 2.55 eV: 6.15 × 10¹⁴ Hz.
    expect(jumpVolts(H, 4, 2)).toBe(2.55);
    expect(hertzOf(2.55) / 1e14).toBeCloseTo(6.15, 2);
    expect(jumpVolts(H, 4, 1)).toBe(12.75);
    // Two steps add up to one: 4 to 3 and 3 to 2.
    expect(jumpVolts(H, 4, 3) + jumpVolts(H, 3, 2)).toBeCloseTo(2.55, 10);
    expect(bandOf(nmOf(jumpVolts(H, 4, 3)))).toBe('infrared');
    // Another atom.
    expect(jumpVolts([-10.4, -5.5, -3.7, -1.6], 3, 2)).toBe(1.8);
    expect(nmOf(1.8)).toBeCloseTo(691, 0);
  });

  it('is the same whichever way the jump goes', () => {
    expect(jumpVolts(H, 2, 5)).toBe(jumpVolts(H, 5, 2));
  });

  it('counts n(n − 1) ÷ 2 lines from level n', () => {
    expect(linesFrom(4)).toBe(6);
    expect(linesOf(H.slice(0, 4))).toHaveLength(6);
    expect(Math.max(...linesOf(H.slice(0, 4)).map((line) => line.volts))).toBe(12.75);
  });

  it('puts four lines of hydrogen in the visible part of the spectrum, all of them jumps to level 2', () => {
    const seen = linesOf(H).filter((line) => bandOf(line.nm) === 'visible');
    expect(seen.map((line) => `${line.from}-${line.to}`)).toEqual(['3-2', '4-2', '5-2', '6-2']);
    expect(seen.map((line) => Math.round(line.nm))).toEqual([658, 488, 435, 411]);
    for (const line of linesOf(H)) expect(bandOf(line.nm)).toBe(line.to === 1 ? 'ultraviolet' : line.to === 2 ? 'visible' : 'infrared');
  });
});

describe('a photon that meets an atom', () => {
  it('lifts the electron only when it matches a jump exactly', () => {
    expect(meets(H, 1, 10.2)).toEqual({ kind: 'absorb', to: 2 });
    expect(meets(H, 1, 12.75)).toEqual({ kind: 'absorb', to: 4 });
    expect(meets(H, 2, 2.55)).toEqual({ kind: 'absorb', to: 4 });
    expect(meets(H, 1, 11)).toEqual({ kind: 'pass' });
    expect(meets(H, 1, 9.5)).toEqual({ kind: 'pass' });
    expect(meets(H, 2, 2.0)).toEqual({ kind: 'pass' });
  });

  it('frees the electron when it has at least the energy that binds it', () => {
    expect(meets(H, 1, 13.6)).toEqual({ kind: 'free' });
    expect(meets(H, 1, 15)).toEqual({ kind: 'free' });
    expect(meets(H, 2, 3.4)).toEqual({ kind: 'free' });
    expect(meets(H, 2, 5)).toEqual({ kind: 'free' });
  });
});

describe('the state of the picture', () => {
  const atom = el({
    start: 3,
    clips: {
      a: { phases: [{ dur: 2 }, { dur: 3, to: 2 }] },
      b: { phases: [{ dur: 4, to: 4 }, { dur: 4, photon: 0.5 }, { dur: 4, photon: 5 }] },
    },
  });

  it('gives out a photon at once when the electron drops', () => {
    const st = levelsAt(atom, [['a', 2.5]]);
    expect(st.level).toBe(2);
    expect(st.jumps).toHaveLength(1);
    expect(st.jumps[0]).toMatchObject({ at: 2, kind: 'emit', from: 3, to: 2, volts: 1.89 });
    expect(levelsAt(atom, [['a', 1.9]]).level).toBe(3);
  });

  it('lifts the electron when its photon arrives, not before', () => {
    expect(levelsAt(atom, [['a', 5], ['b', ARRIVE - 0.1]]).level).toBe(2);
    const st = levelsAt(atom, [['a', 5], ['b', ARRIVE + 0.1]]);
    expect(st.level).toBe(4);
    expect(st.jumps[1]).toMatchObject({ at: 5 + ARRIVE, kind: 'absorb', from: 2, to: 4, volts: 2.55 });
  });

  it('lets a photon pass that matches no jump, and frees the electron with one that has enough energy', () => {
    const st = levelsAt(atom, [['a', 5], ['b', 12]]);
    expect(st.jumps.map((jump) => jump.kind)).toEqual(['emit', 'absorb', 'pass', 'free']);
    expect(st.jumps[2]).toMatchObject({ from: 4, to: 4 });
    expect(st.level).toBe(0);
    expect(levelsAt(atom, [['a', 5], ['b', 9]]).level).toBe(4);
  });

  it('turns the electron at the rate of each orbit it has been in', () => {
    const st = levelsAt(atom, [['a', 5]]);
    expect(st.turn).toBeCloseTo(spinOf(3) * 2 + spinOf(2) * 3, 10);
    expect(turnAt(3, st.jumps, 1)).toBeCloseTo(spinOf(3), 10);
    expect(spinOf(1)).toBeGreaterThan(spinOf(2));
  });

  it('changes the source of a spectrum smoothly', () => {
    const spectrum = el({ picture: 'spectrum', clips: { a: { phases: [{ dur: 3 }, { dur: 4, source: 'gas' }] }, b: { phases: [{ dur: 5, source: 'through' }] } } });
    expect(levelsAt(spectrum, [['a', 2]])).toMatchObject({ source: 'solid', before: 'solid' });
    const part = levelsAt(spectrum, [['a', 3.5]]);
    expect(part).toMatchObject({ source: 'gas', before: 'solid' });
    expect(part.mix).toBeGreaterThan(0);
    expect(part.mix).toBeLessThan(1);
    expect(levelsAt(spectrum, [['a', 7]]).mix).toBe(1);
    expect(levelsAt(spectrum, [['a', 7], ['b', 5]])).toMatchObject({ source: 'through', before: 'gas', mix: 1 });
  });

  it('slides the wavelengths round the orbit of a wave picture', () => {
    const wave = el({ picture: 'wave', waves: 3, clips: { a: { phases: [{ dur: 4, waves: 4 }] } } });
    expect(levelsAt(wave).waves).toBe(3);
    expect(levelsAt(wave, [['a', 2]]).waves).toBeCloseTo(3.5, 10);
    expect(levelsAt(wave, [['a', 4]]).waves).toBe(4);
  });
});

describe('the checks on a picture of energy levels', () => {
  it('pass a picture that is in order', () => {
    expect(checkLevels(el({ start: 3, clips: { a: { phases: [{ dur: 3, to: 2 }, { dur: 2, to: 4 }, { dur: 2, photon: 1 }] } } }))).toEqual([]);
    expect(checkLevels(el({ picture: 'spectrum', source: 'gas', clips: { a: { phases: [{ dur: 3, source: 'through' }] } } }))).toEqual([]);
    expect(checkLevels(el({ picture: 'wave', waves: 3, clips: { a: { phases: [{ dur: 3, waves: 3.5 }] } } }))).toEqual([]);
    expect(checkLevels(el({ levels: [-10.4, -5.5, -3.7, -1.6], name: 'this atom', start: 3, clips: { a: { phases: [{ dur: 3, to: 2 }] } } }))).toEqual([]);
  });

  it('refuse levels out of order, a jump to a level that is not there and a photon with no time to arrive', () => {
    expect(checkLevels(el({ levels: [-5.5, -10.4] }))[0]).toMatch(/lowest first/);
    expect(checkLevels(el({ levels: [-5.5, 1] }))[0]).toMatch(/below zero/);
    expect(checkLevels(el({ clips: { a: { phases: [{ dur: 3, to: 5 }] } } }))[0]).toMatch(/levels 1 to 4/);
    expect(checkLevels(el({ clips: { a: { phases: [{ dur: 1, to: 2 }] } } }))[0]).toMatch(/1\.6 seconds/);
    expect(checkLevels(el({ clips: { a: { phases: [{ dur: 1, photon: 3 }] } } }))[0]).toMatch(/1\.6 seconds/);
    expect(checkLevels(el({ start: 3, clips: { a: { phases: [{ dur: 1, to: 2 }] } } }))).toEqual([]);
  });

  it('refuse an option that belongs to another picture', () => {
    expect(checkLevels(el({ picture: 'spectrum', start: 2 }))[0]).toMatch(/only an atom picture/);
    expect(checkLevels(el({ source: 'gas' }))[0]).toMatch(/only a spectrum picture/);
    expect(checkLevels(el({ lamp: 'Star' }))[0]).toMatch(/only a spectrum picture/);
    expect(checkLevels(el({ waves: 3 }))[0]).toMatch(/only a wave picture/);
    expect(checkLevels(el({ picture: 'wave', clips: { a: { phases: [{ dur: 3, to: 2 }] } } }))[0]).toMatch(/only an atom picture/);
    expect(checkLevels(el({ clips: { a: { phases: [{ dur: 3, source: 'gas' }] } } }))[0]).toMatch(/only a spectrum picture/);
  });
});
