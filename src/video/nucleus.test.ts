import { describe, expect, it } from 'vitest';
import { checkNucleus, type NucleusEl } from './script.ts';
import { averageMass, DECAY, electricForce, MOVE, nucleons, nucleusAt, packed, protonAt, radiusOf, shareFor, strongShare } from './nucleus.ts';

const el = (more: Partial<NucleusEl> = {}): NucleusEl => ({ kind: 'nucleus', id: 'a', clips: { a: { phases: [{ dur: 4 }] } }, ...more });
const far = (p: number[]) => Math.hypot(...p);

describe('the numbers of the lesson', () => {
  it('gives the force between two protons 2.0 fm apart', () => {
    expect(electricForce(2)).toBeCloseTo(57.5, 1);
    // A quarter of it at twice the distance.
    expect(electricForce(4)).toBeCloseTo(electricForce(2) / 4, 10);
  });

  it('gives the radius of a nucleus', () => {
    expect(radiusOf(197)).toBeCloseTo(6.98, 2);
    expect(radiusOf(238) / radiusOf(4)).toBeCloseTo(3.9, 2);
    expect(radiusOf(64)).toBeCloseTo(4.8, 10);
    expect(radiusOf(1)).toBe(1.2);
  });

  it('gives the average mass of an atom, and the share that gives an average', () => {
    expect(averageMass([35, 37], 0.758)).toBeCloseTo(35.48, 2);
    expect(shareFor([10, 11], 10.8)).toBeCloseTo(0.2, 10);
    expect(averageMass([10, 11], shareFor([10, 11], 10.8))).toBeCloseTo(10.8, 10);
  });

  it('draws a strong force with a very short range', () => {
    expect(strongShare(1)).toBe(1);
    expect(strongShare(2)).toBeLessThan(0.2);
    expect(strongShare(3)).toBeLessThan(0.001);
    for (let r = 1; r < 5; r += 0.25) expect(strongShare(r + 0.25)).toBeLessThan(strongShare(r));
  });
});

describe('the packing of a nucleus', () => {
  it('gives every nucleon a place of its own, no closer than one width to another', () => {
    for (const a of [1, 2, 4, 12, 14, 40, 63, 197, 208, 238]) {
      const places = packed(a);
      expect(places).toHaveLength(a);
      let nearest = Infinity;
      for (let i = 0; i < a; i++) for (let j = i + 1; j < a; j++) nearest = Math.min(nearest, far([places[i][0] - places[j][0], places[i][1] - places[j][1], places[i][2] - places[j][2]]));
      if (a > 1) expect(nearest).toBeGreaterThan(1 - 1e-9);
      // It is centred on the middle of its nucleons.
      for (const axis of [0, 1, 2]) expect(places.reduce((sum, p) => sum + p[axis], 0) / a).toBeCloseTo(0, 9);
    }
  });

  it('is a ball: 238 nucleons reach little further than a ball of them would', () => {
    // A close packing fills 74% of space, so a ball of 238 has a radius of about ∛(238 ÷ 0.74) half widths.
    const reach = Math.max(...packed(238).map(far));
    expect(reach + 0.5).toBeLessThan(0.5 * Math.cbrt(238 / 0.74) * 1.3);
  });

  it('draws the nucleus with the radius 1.2 fm × ∛A', () => {
    for (const [z, n] of [[1, 0], [2, 2], [6, 6], [79, 118], [92, 146]]) {
      const { protons, neutrons, ball } = nucleons(z, n);
      expect(protons).toHaveLength(z);
      expect(neutrons).toHaveLength(n);
      expect(Math.max(...[...protons, ...neutrons].map(far)) + ball).toBeCloseTo(radiusOf(z + n), 9);
    }
  });

  it('spreads the protons through the nucleus', () => {
    for (const [a, z] of [[12, 6], [238, 92], [4, 2], [3, 1], [1, 1], [14, 6]]) {
      const which = Array.from({ length: a }, (_, k) => protonAt(k, a, z));
      expect(which.filter(Boolean)).toHaveLength(z);
    }
    // In uranium-238 no run of places is all protons or all neutrons for long.
    const u = Array.from({ length: 238 }, (_, k) => (protonAt(k, 238, 92) ? 'p' : 'n')).join('');
    expect(u).not.toMatch(/pp|nnnn/);
  });
});

describe('a nucleus through its clips', () => {
  it('starts as carbon-12', () => {
    const st = nucleusAt(el());
    expect([st.z, st.n, st.symbol, st.name]).toEqual([6, 6, 'C', 'Carbon']);
    expect(st.gone).toBe(1);
    expect(st.changes).toHaveLength(0);
  });

  it('adds neutrons to make an isotope', () => {
    const iso = el({ clips: { a: { phases: [{ dur: 3 }, { dur: 3, n: 8 }, { dur: 8 }] } } });
    expect(nucleusAt(iso, [['a', 2]]).n).toBe(6);
    const part = nucleusAt(iso, [['a', 3 + MOVE / 2]]);
    expect([part.z, part.n]).toEqual([6, 8]);
    expect(part.change?.kind).toBe('move');
    expect(part.change?.from.n).toBe(6);
    expect(part.gone).toBeCloseTo(0.5, 10);
    expect(nucleusAt(iso, [['a', 14]]).gone).toBe(1);
  });

  it('builds another element, with its symbol and its name', () => {
    const big = el({ clips: { a: { phases: [{ dur: 3, z: 92, n: 146, symbol: 'U', name: 'Uranium' }, { dur: 5 }] } } });
    const st = nucleusAt(big, [['a', 8]]);
    expect([st.z, st.n, st.symbol, st.name, st.z + st.n]).toEqual([92, 146, 'U', 'Uranium', 238]);
  });

  it('decays as the next lesson says', () => {
    // Radium-226 gives radon-222 and an alpha particle.
    const ra = el({ z: 88, n: 138, symbol: 'Ra', name: 'Radium', clips: { a: { phases: [{ dur: 6, decay: 'alpha', symbol: 'Rn', name: 'Radon' }] } } });
    const rn = nucleusAt(ra, [['a', 6]]);
    expect([rn.z, rn.z + rn.n, rn.symbol]).toEqual([86, 222, 'Rn']);
    expect(rn.change?.kind).toBe('alpha');
    expect(rn.change?.over).toBe(DECAY);
    // Carbon-14 gives nitrogen-14 in a beta-minus decay; sodium-22 gives neon-22 in a beta-plus decay.
    const c = nucleusAt(el({ n: 8, clips: { a: { phases: [{ dur: 6, decay: 'beta-', symbol: 'N', name: 'Nitrogen' }] } } }), [['a', 6]]);
    expect([c.z, c.z + c.n, c.symbol]).toEqual([7, 14, 'N']);
    const na = nucleusAt(el({ z: 11, n: 11, symbol: 'Na', name: 'Sodium', clips: { a: { phases: [{ dur: 6, decay: 'beta+', symbol: 'Ne', name: 'Neon' }] } } }), [['a', 6]]);
    expect([na.z, na.z + na.n, na.symbol]).toEqual([10, 22, 'Ne']);
    // A gamma decay leaves the numbers as they were.
    const g = nucleusAt(el({ clips: { a: { phases: [{ dur: 6, decay: 'gamma' }] } } }), [['a', 6]]);
    expect([g.z, g.n, g.changes.length, g.change?.kind]).toEqual([6, 6, 1, 'gamma']);
  });

  it('follows a decay series', () => {
    // Thorium-232, after three alpha decays and two beta-minus decays, is radon-220.
    const alpha = (symbol: string, name: string) => ({ dur: 3, decay: 'alpha' as const, symbol, name });
    const beta = (symbol: string, name: string) => ({ dur: 3, decay: 'beta-' as const, symbol, name });
    const th = el({ z: 90, n: 142, symbol: 'Th', name: 'Thorium', clips: { a: { phases: [alpha('Ra', 'Radium'), beta('Ac', 'Actinium'), beta('Th', 'Thorium'), alpha('Ra', 'Radium'), alpha('Rn', 'Radon')] } } });
    expect(checkNucleus(th)).toEqual([]);
    const st = nucleusAt(th, [['a', 15]]);
    expect([st.z, st.z + st.n, st.symbol, st.changes.length]).toEqual([86, 220, 'Rn', 5]);
  });

  it('marks a nucleus as unstable', () => {
    const shaky = el({ clips: { a: { phases: [{ dur: 2 }, { dur: 2, shaky: true }] } } });
    expect(nucleusAt(shaky, [['a', 1]]).shaky).toBe(false);
    expect(nucleusAt(shaky, [['a', 3]]).shaky).toBe(true);
    // A phase can give the mark other words, and '' gives it its own words again.
    const noted = el({ shaky: true, clips: { a: { phases: [{ dur: 2 }, { dur: 2, note: 'It still has extra energy' }, { dur: 2, note: '' }] } } });
    expect(nucleusAt(noted, [['a', 1]]).note).toBeUndefined();
    expect(nucleusAt(noted, [['a', 3]]).note).toBe('It still has extra energy');
    expect(nucleusAt(noted, [['a', 5]]).note).toBeUndefined();
    expect(checkNucleus(noted)).toEqual([]);
    expect(checkNucleus(el({ picture: 'pair', clips: { a: { phases: [{ dur: 2, note: 'x' }] } } })).join(' ')).toMatch(/only a build picture/);
  });

  it('slides two nucleons apart, and the share of an isotope', () => {
    const pair = el({ picture: 'pair', apart: 2, clips: { a: { phases: [{ dur: 4, apart: 4 }] }, b: { phases: [{ dur: 2, kinds: 'pn' }] } } });
    expect(nucleusAt(pair).apart).toBe(2);
    expect(nucleusAt(pair, [['a', 2]]).apart).toBeCloseTo(3, 10);
    expect(nucleusAt(pair, [['a', 4]]).apart).toBe(4);
    expect(nucleusAt(pair, [['a', 4]]).kinds).toBe('pp');
    expect(nucleusAt(pair, [['a', 4], ['b', 1]]).kinds).toBe('pn');
    const mix = el({ picture: 'mix', clips: { a: { phases: [{ dur: 4, share: 0.758 }] } } });
    expect(nucleusAt(mix).share).toBe(0.5);
    expect(nucleusAt(mix, [['a', 4]]).share).toBeCloseTo(0.758, 10);
  });
});

describe('checking a nucleus', () => {
  it('passes the pictures of the lessons', () => {
    expect(checkNucleus(el())).toEqual([]);
    expect(checkNucleus(el({ z: 29, n: 34, symbol: 'Cu', name: 'Copper', electrons: 27, scale: 26 }))).toEqual([]);
    expect(checkNucleus(el({ picture: 'pair', apart: 4, kinds: 'pp', clips: { a: { phases: [{ dur: 4, apart: 1 }, { dur: 2, kinds: 'nn' }] } } }))).toEqual([]);
    expect(checkNucleus(el({ picture: 'mix', masses: [35, 37], share: 0.5, name: 'Chlorine', clips: { a: { phases: [{ dur: 4, share: 0.758 }] } } }))).toEqual([]);
  });

  it('finds a nucleus that cannot be', () => {
    expect(checkNucleus(el({ z: 0 }))).toHaveLength(1);
    expect(checkNucleus(el({ n: 2.5 }))).toHaveLength(1);
    expect(checkNucleus(el({ z: 120, n: 200 }))).toHaveLength(1);
  });

  it('finds a decay that cannot happen, or that does not name its daughter', () => {
    // Hydrogen-1 has nothing to give to an alpha particle.
    expect(checkNucleus(el({ z: 1, n: 0, symbol: 'H', name: 'Hydrogen', clips: { a: { phases: [{ dur: 4, decay: 'alpha', symbol: 'X', name: 'Nothing' }] } } })).join(' ')).toMatch(/cannot make it/);
    expect(checkNucleus(el({ clips: { a: { phases: [{ dur: 4, decay: 'beta-' }] } } })).join(' ')).toMatch(/daughter/);
    expect(checkNucleus(el({ clips: { a: { phases: [{ dur: 4, decay: 'gamma' }] } } }))).toEqual([]);
    expect(checkNucleus(el({ clips: { a: { phases: [{ dur: 4, decay: 'alpha', z: 4, symbol: 'Be', name: 'Beryllium' }] } } })).join(' ')).toMatch(/both a decay and a new nucleus/);
  });

  it('finds a new element with no name', () => {
    expect(checkNucleus(el({ clips: { a: { phases: [{ dur: 4, z: 7 }] } } })).join(' ')).toMatch(/new element/);
    expect(checkNucleus(el({ clips: { a: { phases: [{ dur: 4, n: 8 }] } } }))).toEqual([]);
  });

  it('finds an option that belongs to another picture', () => {
    expect(checkNucleus(el({ picture: 'pair', z: 6 })).join(' ')).toMatch(/only a build picture/);
    expect(checkNucleus(el({ apart: 2 })).join(' ')).toMatch(/only a pair picture/);
    expect(checkNucleus(el({ share: 0.5 })).join(' ')).toMatch(/only a mix picture/);
    expect(checkNucleus(el({ picture: 'pair', apart: 12 })).join(' ')).toMatch(/1 to 8/);
    expect(checkNucleus(el({ picture: 'mix', masses: [37, 35] })).join(' ')).toMatch(/lighter first/);
    expect(checkNucleus(el({ picture: 'mix', clips: { a: { phases: [{ dur: 4, n: 8 }] } } })).join(' ')).toMatch(/only a build picture shows/);
    expect(checkNucleus(el({ clips: { a: { phases: [{ dur: 4, apart: 2 }] } } })).join(' ')).toMatch(/only a pair picture shows/);
    expect(checkNucleus(el({ clips: { a: { phases: [{ dur: 4, share: 0.3 }] } } })).join(' ')).toMatch(/mix picture/);
    expect(checkNucleus(el({ poster: 'z' })).join(' ')).toMatch(/poster/);
    expect(checkNucleus(el({ clips: { a: { phases: [] } } })).join(' ')).toMatch(/no phases/);
  });
});
