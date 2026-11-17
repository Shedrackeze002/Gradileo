import { describe, expect, it } from 'vitest';
import type { MoleculesEl } from './script.ts';
import { checkMolecules, FRESH, moleculesAt, parseBonds } from './molecules.ts';

/** Ethene and bromine: the second C–C bond and the Br–Br bond break, and two C–Br bonds form (clip `go`, 1 s then a 2 s move). */
const el = (over: Partial<MoleculesEl> = {}): MoleculesEl => ({
  kind: 'molecules',
  id: 'm',
  atoms: { C1: 'C', C2: 'C', Br1: 'Br', Br2: 'Br', X: 'H' },
  stages: {
    a: { at: { C1: [1, 2], C2: [2, 2], Br1: [5, 1], Br2: [6, 1] }, bonds: 'C1=C2 Br1-Br2', names: [{ text: 'ethene', at: [1.5, 3] }] },
    b: { at: { C1: [1, 2], C2: [2, 2], Br1: [1, 1], Br2: [2, 1] }, bonds: 'C1-C2 C1-Br1 C2-Br2', names: [{ text: 'product', at: [1.5, 3] }] },
    c: { at: { X: [3, 3] }, bonds: '', charges: { X: 1 } },
  },
  start: 'a',
  clips: { go: { phases: [{ dur: 1 }, { dur: 2, to: 'b' }] }, swap: { phases: [{ dur: 2, to: 'c' }] } },
  span: [8, 4],
  ...over,
});
const bondsOf = (f: ReturnType<typeof moleculesAt>, a: string, b: string) => f.bonds.filter((l) => (l.a === a && l.b === b) || (l.a === b && l.b === a));
const atom = (f: ReturnType<typeof moleculesAt>, n: string) => f.atoms.find((a) => a.name === n)!;

describe('molecules', () => {
  it('reads bonds of each order', () => {
    expect([...parseBonds('C1=C2 C2-H1 N#C3')]).toEqual([
      ['C1|C2', 2],
      ['C2|H1', 1],
      ['C3|N', 3],
    ]);
  });

  it('starts at the first stage, jiggling only a little', () => {
    const f = moleculesAt(el(), [], 0.7);
    expect(atom(f, 'Br1').x).toBeCloseTo(5, 0);
    expect(Math.abs(atom(f, 'Br1').x - 5)).toBeLessThan(0.05);
    expect(f.atoms.map((a) => a.name)).not.toContain('X');
    expect(bondsOf(f, 'C1', 'C2')).toHaveLength(2);
    expect(f.names.map((n) => n.text)).toEqual(['ethene']);
  });

  it('turns breaking bonds red and fades them, and brings new bonds in green, part way through a move', () => {
    const early = moleculesAt(el(), [['go', 0]], 1.6);
    const cc = bondsOf(early, 'C1', 'C2');
    expect(cc).toHaveLength(2);
    expect(cc.filter((l) => l.tint?.tone === 'bad')).toHaveLength(1);
    expect(bondsOf(early, 'Br1', 'Br2')[0].tint?.tone).toBe('bad');
    expect(bondsOf(early, 'Br1', 'Br2')[0].opacity).toBeGreaterThan(0);
    expect(bondsOf(early, 'C1', 'Br1')[0].opacity).toBe(0);
    const late = moleculesAt(el(), [['go', 0]], 2.6);
    expect(bondsOf(late, 'Br1', 'Br2')[0].opacity).toBe(0);
    expect(bondsOf(late, 'C1', 'Br1')[0].tint?.tone).toBe('good');
    expect(bondsOf(late, 'C1', 'Br1')[0].opacity).toBeGreaterThan(0);
    // The atoms are part way to their new places.
    const half = moleculesAt(el(), [['go', 0]], 2);
    expect(atom(half, 'Br1').x).toBeGreaterThan(2.5);
    expect(atom(half, 'Br1').x).toBeLessThan(3.5);
  });

  it('ends at the new stage, with the new bonds green for a moment', () => {
    const just = moleculesAt(el(), [['go', 0]], 3.1);
    expect(bondsOf(just, 'C1', 'C2')).toHaveLength(1);
    expect(bondsOf(just, 'Br1', 'Br2')).toHaveLength(0);
    expect(bondsOf(just, 'C1', 'Br1')[0].tint?.tone).toBe('good');
    expect(bondsOf(just, 'C1', 'C2')[0].tint).toBeUndefined();
    expect(just.names.map((n) => n.text)).toEqual(['product']);
    const later = moleculesAt(el(), [['go', 0]], 3 + FRESH + 0.1);
    expect(bondsOf(later, 'C1', 'Br1')[0].tint).toBeUndefined();
  });

  it('fades molecules in and out whole, without red or green, and changes charges', () => {
    const mid = moleculesAt(el(), [['swap', 0]], 0.5);
    expect(bondsOf(mid, 'C1', 'C2').every((l) => !l.tint)).toBe(true);
    expect(atom(mid, 'C1').opacity).toBeCloseTo(0.5, 5);
    expect(atom(mid, 'X').opacity).toBe(0);
    const end = moleculesAt(el(), [['swap', 0]], 2.5);
    expect(end.atoms.map((a) => a.name)).toEqual(['X']);
    expect(atom(end, 'X').charge).toBe(1);
  });

  it('checks stages, bonds and clips', () => {
    expect(checkMolecules(el())).toEqual([]);
    const bad = el({
      start: 'z',
      stages: { a: { at: { C1: [1, 2], Q: [9, 1] }, bonds: 'C1-C2 C1~Q', charges: { Br1: -1 } } },
      clips: { go: { phases: [{ dur: 0, to: 'b' }] } },
    });
    expect(checkMolecules(bad)).toEqual([
      'there is no stage "z" to start from.',
      'stage "a" places no atom "Q".',
      'stage "a": atom "Q" is outside the span.',
      'stage "a": the bond "C1-C2" joins an atom the stage does not place.',
      'stage "a": cannot read the bond "C1~Q" (write it like C1-H1, C1=C2 or C1#C2).',
      'stage "a" gives a charge to an atom it does not place ("Br1").',
      'clip "go", phase 1 needs a length (dur).',
      'clip "go", phase 1 moves to no stage "b".',
    ]);
  });
});
