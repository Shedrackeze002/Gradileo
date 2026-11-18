import { describe, expect, it } from 'vitest';
import { nuclei, reaction } from './c10-equations.ts';

describe('reaction', () => {
  it('moves every reactant atom into a product, keeping each element', () => {
    const r = reaction('r', { from: [{ t: 'H2', n: 2 }, { t: 'O2' }], to: [{ t: 'H2O', n: 2 }], counts: true });
    const before = Object.keys(r.stages.before.at).sort();
    const after = Object.keys(r.stages.after.at).sort();
    expect(after).toEqual(before);
    for (const name of before) expect(name.replace(/\d+$/, '')).toBe(r.atoms[name]);
    // Each water molecule bonds one oxygen to two hydrogens.
    const bonds = r.stages.after.bonds.split(' ');
    expect(bonds).toHaveLength(4);
    for (const b of bonds) expect(b).toMatch(/^O\d+-H\d+$/);
    expect(r.stages.after.names?.map((n) => n.text)).toContain('4 H, 2 O');
  });

  it('refuses an equation that does not balance', () => {
    expect(() => reaction('r', { from: [{ t: 'H2' }, { t: 'O2' }], to: [{ t: 'H2O' }] })).toThrow(/left over/);
    expect(() => reaction('r', { from: [{ t: 'H2' }], to: [{ t: 'H2O' }] })).toThrow(/no O atom/);
  });

  it('keeps bonds and charges through the move when the groups stay whole', () => {
    const r = reaction('r', { from: [{ t: 'OH' }, { t: 'Ca2' }, { t: 'OH' }], to: [{ t: 'CaOH2' }], whole: true });
    expect(r.stages.apart.bonds).toBe(r.stages.before.bonds);
    expect(r.stages.after.charges).toEqual(expect.objectContaining({ Ca1: 2 }));
  });
});

describe('nuclei', () => {
  it('builds each nucleus from its protons and neutrons', () => {
    const n = nuclei('n', [
      { label: 'carbon-12', p: 6, n: 6 },
      { label: 'carbon-14', p: 6, n: 8 },
    ]);
    const kinds = Object.values(n.atoms).map((a) => (typeof a === 'string' ? a : a.el));
    expect(kinds.filter((k) => k === 'p')).toHaveLength(12);
    expect(kinds.filter((k) => k === 'n')).toHaveLength(14);
    expect(Object.keys(n.stages.built.at)).toHaveLength(26);
  });
});
