import { describe, expect, it } from 'vitest';
import { checkReaction, type ReactionEl } from './script.ts';
import { bindingAt, bindingEnergy, CURVE, energyOf, FIRST, fissionsBy, freed, GEN, generations, JOIN, massDefect, PRODUCTS, reactionAt, separateMass } from './reaction.ts';

const el = (more: Partial<ReactionEl> = {}): ReactionEl => ({ kind: 'reaction', id: 'a', clips: { a: { phases: [{ dur: 4 }] } }, ...more });

describe('the numbers of the lesson', () => {
  it('finds the mass defect and the binding energy of helium-4', () => {
    expect(separateMass(2, 2)).toBeCloseTo(4.032, 10);
    expect(massDefect(2, 2, 4.0015)).toBeCloseTo(0.0305, 10);
    expect(bindingEnergy(2, 2, 4.0015)).toBeCloseTo(28.4, 1);
  });

  it('compares iron-56 with uranium-235 for each nucleon', () => {
    expect(massDefect(26, 30, 55.9207)).toBeCloseTo(0.5301, 10);
    expect(bindingEnergy(26, 30, 55.9207)).toBeCloseTo(493.79, 2);
    expect(bindingEnergy(26, 30, 55.9207) / 56).toBeCloseTo(8.82, 2);
    expect(massDefect(92, 143, 234.9935)).toBeCloseTo(1.9222, 10);
    expect(bindingEnergy(92, 143, 234.9935)).toBeCloseTo(1790.53, 2);
    expect(bindingEnergy(92, 143, 234.9935) / 235).toBeCloseTo(7.62, 2);
  });

  it('finds the mass defect of lithium-7', () => {
    expect(separateMass(3, 4)).toBeCloseTo(7.0567, 10);
    expect(massDefect(3, 4, 7.0144)).toBeCloseTo(0.0423, 10);
  });

  it('turns the mass that a reaction loses into energy', () => {
    // Hydrogen-2 and hydrogen-3 fuse into helium-4 and a neutron.
    expect(2.0141 + 3.016 - 4.0026 - 1.0087).toBeCloseTo(0.0188, 10);
    expect(energyOf(0.0188)).toBeCloseTo(17.5, 1);
    // Uranium-235 and a neutron make barium-141, krypton-92 and 3 neutrons.
    expect(235.0439 + 1.0087 - 140.9144 - 91.9262 - 3 * 1.0087).toBeCloseTo(0.1859, 10);
    expect(energyOf(0.1859)).toBeCloseTo(173.2, 1);
  });

  it('sets 3 neutrons free when uranium-235 splits into krypton-92 and barium-141', () => {
    expect(freed(PRODUCTS)).toBe(3);
    expect(PRODUCTS[0].z + PRODUCTS[1].z).toBe(92);
    // Tellurium-134 and zirconium-99 leave 3 as well.
    expect(freed([{ z: 52, n: 82, name: 'Tellurium' }, { z: 40, n: 59, name: 'Zirconium' }])).toBe(3);
  });
});

describe('the graph of the binding energy for each nucleon', () => {
  it('passes through its points and joins them with straight lines', () => {
    expect(bindingAt(4)).toBe(7.07);
    expect(bindingAt(56)).toBe(8.79);
    expect(bindingAt(238)).toBe(7.57);
    expect(bindingAt(3.5)).toBeCloseTo((2.57 + 7.07) / 2, 10);
    // Beyond its ends it stays at the end values.
    expect(bindingAt(0)).toBe(0);
    expect(bindingAt(300)).toBe(7.57);
  });

  it('has its peak near iron, with lighter and heavier nuclei below it', () => {
    const best = Math.max(...CURVE.map(([, e]) => e));
    expect(bindingAt(56)).toBe(best);
    expect(bindingAt(235)).toBeLessThan(bindingAt(141));
    expect(bindingAt(235)).toBeLessThan(bindingAt(92));
    expect(bindingAt(2)).toBeLessThan(bindingAt(4));
    // The mass numbers rise along the graph.
    for (let i = 1; i < CURVE.length; i++) expect(CURVE[i][0]).toBeGreaterThan(CURVE[i - 1][0]);
  });
});

describe('a chain reaction', () => {
  it('doubles without control rods and stays steady with them', () => {
    expect(generations(false)).toEqual([1, 2, 4, 8]);
    expect(generations(true)).toEqual([1, 1, 1, 1, 1]);
  });

  it('counts the fissions so far', () => {
    expect(fissionsBy(false, 0)).toBe(0);
    expect(fissionsBy(false, FIRST)).toBe(1);
    expect(fissionsBy(false, FIRST + GEN)).toBe(3);
    expect(fissionsBy(false, FIRST + 2 * GEN + 0.1)).toBe(7);
    expect(fissionsBy(false, 60)).toBe(15);
    expect(fissionsBy(true, FIRST + 2 * GEN)).toBe(3);
    expect(fissionsBy(true, 60)).toBe(5);
  });
});

describe('the state after the clips', () => {
  it('brings the nucleons together over the joining time, and apart again', () => {
    const e = el({ clips: { a: { phases: [{ dur: 2 }, { dur: 10, join: true }] }, b: { phases: [{ dur: 10, join: false }] } } });
    expect(reactionAt(e).joined).toBe(0);
    expect(reactionAt(e, [['a', 2]]).joined).toBe(0);
    expect(reactionAt(e, [['a', 2 + JOIN / 2]]).joined).toBeCloseTo(0.5, 10);
    const whole = reactionAt(e, [['a', 12]]);
    expect([whole.joined, whole.most, whole.joining, whole.joinAt]).toEqual([1, 1, true, 2]);
    const apart = reactionAt(e, [['a', 12], ['b', JOIN / 4]]);
    expect(apart.joined).toBeCloseTo(0.75, 10);
    expect(apart.joining).toBe(false);
    // It remembers that it was a nucleus.
    const gone = reactionAt(e, [['a', 12], ['b', 10]]);
    expect([gone.joined, gone.most]).toEqual([0, 1]);
    // It can start as a nucleus.
    expect(reactionAt(el({ joined: true })).joined).toBe(1);
  });

  it('turns back from where it has got to when the joining is reversed part way', () => {
    const e = el({ clips: { a: { phases: [{ dur: JOIN / 2, join: true }, { dur: 10, join: false }] } } });
    expect(reactionAt(e, [['a', JOIN / 2]]).joined).toBeCloseTo(0.5, 10);
    const back = reactionAt(e, [['a', JOIN / 2 + JOIN / 4]]);
    expect(back.joined).toBeCloseTo(0.375, 10);
    expect(back.most).toBeCloseTo(0.5, 10);
  });

  it('slides the marker of the graph', () => {
    const e = el({ picture: 'curve', at: 4, clips: { a: { phases: [{ dur: 1 }, { dur: 4, to: 60 }] } } });
    expect(reactionAt(e).at).toBe(4);
    expect(reactionAt(e, [['a', 1]]).at).toBe(4);
    expect(reactionAt(e, [['a', 3]]).at).toBeCloseTo(32, 10);
    expect(reactionAt(e, [['a', 5]]).at).toBe(60);
    // Without a start, it is at iron-56.
    expect(reactionAt(el({ picture: 'curve' })).at).toBe(56);
  });

  it('starts a reaction and counts the seconds since', () => {
    const e = el({ picture: 'fusion', clips: { a: { phases: [{ dur: 3 }] }, b: { phases: [{ dur: 1 }, { dur: 6, fire: 'slow' }] }, c: { phases: [{ dur: 2, fire: true }, { dur: 6 }] } } });
    const before = reactionAt(e, [['a', 3], ['b', 1]]);
    expect([before.since, before.shots.length, before.slow]).toEqual([-1, 0, false]);
    const slow = reactionAt(e, [['a', 3], ['b', 3]]);
    expect([slow.since, slow.slow, slow.time]).toEqual([2, true, 6]);
    const fast = reactionAt(e, [['a', 3], ['b', 7], ['c', 1.5]]);
    expect([fast.since, fast.slow]).toEqual([1.5, false]);
    expect(fast.shots).toEqual([{ at: 4, slow: true }, { at: 10, slow: false }]);
  });

  it('ignores a clip that the element does not have', () => {
    expect(reactionAt(el(), [['z', 5]]).time).toBe(0);
  });
});

describe('checking a reaction element', () => {
  it('accepts the pictures of the lesson', () => {
    expect(checkReaction(el())).toEqual([]);
    expect(checkReaction(el({ z: 26, n: 30, name: 'iron', mass: 55.9207, each: true, places: 2, joined: true, clips: { a: { phases: [{ dur: 4, join: false }] } } }))).toEqual([]);
    expect(checkReaction(el({ picture: 'curve', at: 4, marks: [{ a: 2, label: 'hydrogen-2' }], clips: { a: { phases: [{ dur: 4, to: 60 }] } }, thumb: ['names', 'peak'] }))).toEqual([]);
    expect(checkReaction(el({ picture: 'fission', released: 173.2, products: [{ z: 52, n: 82, name: 'Tellurium' }, { z: 40, n: 59, name: 'Zirconium' }], clips: { a: { phases: [{ dur: 4, fire: true }] } }, poster: 'a', posterAt: 0.5 }))).toEqual([]);
    expect(checkReaction(el({ picture: 'chain', rods: true, clips: { a: { phases: [{ dur: 8, fire: true }] } } }))).toEqual([]);
    expect(checkReaction(el({ picture: 'fusion', clips: { a: { phases: [{ dur: 4, fire: 'slow' }, { dur: 4, fire: true }] } } }))).toEqual([]);
  });

  it('rejects options that do not fit', () => {
    expect(checkReaction(el({ picture: 'burn' as never })).length).toBeGreaterThan(0);
    expect(checkReaction(el({ z: 0 })).length).toBeGreaterThan(0);
    expect(checkReaction(el({ z: 2.5 })).length).toBeGreaterThan(0);
    // A nucleus is lighter than its separate nucleons.
    expect(checkReaction(el({ mass: 4.04 })).join(' ')).toMatch(/less than the mass of its separate nucleons/);
    expect(checkReaction(el({ picture: 'curve', mass: 4 })).length).toBeGreaterThan(0);
    expect(checkReaction(el({ at: 60 })).join(' ')).toMatch(/only a curve picture/);
    expect(checkReaction(el({ picture: 'curve', at: 300 })).length).toBeGreaterThan(0);
    expect(checkReaction(el({ picture: 'curve', marks: [{ a: 0, label: 'nothing' }] })).length).toBeGreaterThan(0);
    expect(checkReaction(el({ picture: 'fission', products: [{ z: 36, n: 56, name: 'Krypton' }, { z: 55, n: 85, name: 'Caesium' }] })).join(' ')).toMatch(/add up to 92/);
    expect(checkReaction(el({ picture: 'fission', products: [{ z: 36, n: 50, name: 'Krypton' }, { z: 56, n: 85, name: 'Barium' }] })).join(' ')).toMatch(/from 1 to 4 neutrons/);
    expect(checkReaction(el({ picture: 'chain', released: 5 })).length).toBeGreaterThan(0);
    expect(checkReaction(el({ picture: 'fusion', rods: true })).length).toBeGreaterThan(0);
    expect(checkReaction(el({ poster: 'z' })).length).toBeGreaterThan(0);
    expect(checkReaction(el({ posterAt: 0 })).length).toBeGreaterThan(0);
    expect(checkReaction(el({ thumb: ['smoke' as never] })).length).toBeGreaterThan(0);
  });

  it('rejects phases that the picture does not show', () => {
    expect(checkReaction(el({ clips: { a: { phases: [] } } })).length).toBeGreaterThan(0);
    expect(checkReaction(el({ clips: { a: { phases: [{ dur: 0 }] } } })).length).toBeGreaterThan(0);
    expect(checkReaction(el({ picture: 'curve', clips: { a: { phases: [{ dur: 4, join: true }] } } })).join(' ')).toMatch(/only a weigh picture/);
    expect(checkReaction(el({ clips: { a: { phases: [{ dur: 4, to: 60 }] } } })).length).toBeGreaterThan(0);
    expect(checkReaction(el({ clips: { a: { phases: [{ dur: 4, fire: true }] } } })).length).toBeGreaterThan(0);
    expect(checkReaction(el({ picture: 'chain', clips: { a: { phases: [{ dur: 4, fire: 'slow' }] } } })).join(' ')).toMatch(/only a fusion picture/);
  });
});
