import { describe, expect, it } from 'vitest';
import { atomsAt, checkAtoms, SHELL_R } from './atoms.ts';
import type { AtomsEl } from './script.ts';

const el = (over: Partial<AtomsEl> = {}): AtomsEl => ({
  kind: 'atoms',
  id: 'a',
  span: [14, 7],
  atoms: [
    { id: 'na', symbol: 'Na', protons: 11, at: [3, 3.5] },
    { id: 'cl', symbol: 'Cl', protons: 17, at: [10, 3.5] },
  ],
  clips: {},
  ...over,
});

describe('atoms', () => {
  it('fills shells from the inside out, one electron at a time', () => {
    const e = el({ atoms: [{ id: 'ca', symbol: 'Ca', protons: 20, electrons: 0, at: [7, 3.5] }], clips: { fill: { phases: [{ dur: 4, fill: { ca: 20 } }] } } });
    expect(atomsAt(e, [], 1).shells[0]).toEqual([]);
    expect(atomsAt(e, [['fill', 1]], 2).shells[0]).toEqual([2, 3]);
    const done = atomsAt(e, [['fill', 1]], 6);
    expect(done.shells[0]).toEqual([2, 8, 8, 2]);
    expect(done.charges[0]).toBe(0);
    // Every electron sits on its shell's ring.
    const r = done.electrons.map((p) => Math.hypot(p.x - 7, p.y - 3.5));
    for (const d of r) expect(SHELL_R.some((s) => Math.abs(s - d) < 1e-6)).toBe(true);
  });

  it('passes an outer electron across, making a positive and a negative ion', () => {
    const e = el({ clips: { give: { phases: [{ dur: 2, give: [{ from: 'na', to: 'cl', n: 1 }] }] } } });
    const before = atomsAt(e, [], 1);
    expect(before.shells).toEqual([[2, 8, 1], [2, 8, 7]]);
    const after = atomsAt(e, [['give', 1]], 4);
    expect(after.shells).toEqual([[2, 8], [2, 8, 8]]);
    expect(after.charges).toEqual([1, -1]);
    // The electron keeps sodium's colour on chlorine.
    expect(after.electrons.filter((p) => p.home === 0)).toHaveLength(11);
    // Part way across, it is between the two atoms.
    const mid = atomsAt(e, [['give', 1]], 2).electrons.find((p) => p.home === 0 && p.x > 5 && p.x < 8);
    expect(mid).toBeDefined();
  });

  it('loses an electron to nowhere, and adds one from nowhere', () => {
    const e = el({ clips: { lose: { phases: [{ dur: 1, give: [{ from: 'na', to: null, n: 1 }] }] }, gain: { phases: [{ dur: 1, fill: { cl: 18 } }] } } });
    const f = atomsAt(e, [['lose', 0], ['gain', 2]], 5);
    expect(f.charges).toEqual([1, -1]);
    expect(f.electrons).toHaveLength(28);
  });

  it('shares a pair of electrons where two shells overlap, and counts them for both atoms', () => {
    const e = el({
      span: [10, 7],
      atoms: [
        { id: 'o', symbol: 'O', protons: 8, at: [5, 3] },
        { id: 'h', symbol: 'H', protons: 1, at: [7.2, 3] },
      ],
      clips: { share: { phases: [{ dur: 2, share: [{ a: 'o', b: 'h', n: 1 }] }] } },
    });
    const f = atomsAt(e, [['share', 0]], 5);
    expect(f.shells).toEqual([[2, 7], [2]]);
    expect(f.charges).toEqual([0, 0]);
    // The shared pair sits in the overlap: inside both outer shells.
    const shared = f.electrons.filter((p) => Math.hypot(p.x - 5, p.y - 3) < SHELL_R[1] && Math.hypot(p.x - 7.2, p.y - 3) < SHELL_R[0]);
    expect(shared).toHaveLength(2);
    expect(new Set(shared.map((p) => p.home))).toEqual(new Set([0, 1]));
  });

  it('checks clips and atoms', () => {
    expect(checkAtoms(el({ clips: { x: { phases: [{ dur: 1, give: [{ from: 'k', to: 'cl', n: 1 }] }, { dur: 0 }] } } }))).toEqual([
      'clip "x", phase 1 names no atom "k".',
      'clip "x", phase 2 needs a length (dur).',
    ]);
    expect(checkAtoms(el({ atoms: [{ id: 'z', symbol: 'Z', protons: 50, at: [20, 1] }] }))).toEqual(['atom "z" has more electrons than its shells hold.', 'atom "z" is outside the span.']);
  });
});
