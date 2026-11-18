import type { MoleculesEl } from '@/video/script.ts';

// Shapes of molecules as balls and sticks (src/video/molecules.ts), drawn flat, with a tetrahedron
// in perspective, and bonds about 1.3 units long.

// Electron groups spreading out (src/video/molecules.ts): carbon dioxide, boron trifluoride and
// methane start with their outer atoms crowded on one side; in the clip `go` the groups repel and
// spread as far apart as they can, to 180°, 120° and 109.5° (methane drawn in perspective).
export const spreading = (id: string, height = 380): MoleculesEl => ({
  kind: 'molecules',
  id,
  atoms: { C1: 'C', O1: 'O', O2: 'O', B: { el: 'B', tone: 'hyp' }, F1: 'F', F2: 'F', F3: 'F', C2: 'C', H1: 'H', H2: 'H', H3: 'H', H4: 'H' },
  stages: {
    bunched: {
      at: { C1: [2.4, 2.5], O1: [1.921, 1.184], O2: [2.879, 1.184], B: [7.5, 2.5], F1: [7.5, 1.1], F2: [6.697, 1.353], F3: [8.303, 1.353], C2: [12.6, 2.5], H1: [12.22, 1.257], H2: [11.604, 1.664], H3: [13.596, 1.664], H4: [12.98, 1.257] },
      bonds: 'C1=O1 C1=O2 B-F1 B-F2 B-F3 C2-H1 C2-H2 C2-H3 C2-H4',
      names: [
        { text: 'CO₂: 2 groups', at: [2.4, 4.6] },
        { text: 'BF₃: 3 groups', at: [7.5, 4.6] },
        { text: 'CH₄: 4 groups', at: [12.6, 4.6] },
      ],
    },
    spread: {
      at: { C1: [2.4, 2.5], O1: [1.0, 2.5], O2: [3.8, 2.5], B: [7.5, 2.5], F1: [7.5, 1.1], F2: [6.288, 3.2], F3: [8.712, 3.2], C2: [12.6, 2.5], H1: [12.6, 1.2], H2: [11.375, 2.934], H3: [12.99, 3.54], H4: [13.737, 2.792] },
      bonds: 'C1=O1 C1=O2 B-F1 B-F2 B-F3 C2-H1 C2-H2 C2-H3 C2-H4',
      names: [
        { text: '180°, linear', at: [2.4, 4.6], tone: 'good' },
        { text: '120°, trigonal planar', at: [7.5, 4.6], tone: 'good' },
        { text: '109.5°, tetrahedral', at: [12.6, 4.6], tone: 'good' },
      ],
    },
  },
  start: 'bunched',
  clips: { go: { phases: [{ dur: 0.8 }, { dur: 3.2, to: 'spread' }, { dur: 1.2 }] } },
  span: [15, 5.2],
  poster: 'go',
  height,
});

/**
 * Lone pairs (yellow balls marked ••) repel too (clip `spread`): ammonia (left) and water (right)
 * each have four electron groups, crowded at first, which spread to the corners of a tetrahedron.
 * In the clip `name` the lone pairs fade, leaving the shape named from the atoms: trigonal
 * pyramidal and V-shaped.
 */
export const lonePairs = (id: string, height = 400): MoleculesEl => ({
  kind: 'molecules',
  id,
  atoms: { N: 'N', Ha: 'H', Hb: 'H', Hc: 'H', P1: { el: '••', tone: 'theta' }, O: 'O', H1: 'H', H2: 'H', P2: { el: '••', tone: 'theta' }, P3: { el: '••', tone: 'theta' } },
  stages: {
    bunched: {
      at: { N: [3.5, 2.3], P1: [2.95, 1.347], Ha: [2.278, 1.855], Hb: [4.496, 1.464], Hc: [3.726, 1.02], O: [10.5, 2.3], P2: [9.95, 1.347], P3: [10.691, 1.217], H1: [9.278, 1.855], H2: [11.496, 1.464] },
      bonds: 'N-Ha N-Hb N-Hc O-H1 O-H2',
      names: [
        { text: 'NH₃: 3 bonds, 1 lone pair', at: [3.5, 4.6] },
        { text: 'H₂O: 2 bonds, 2 lone pairs', at: [10.5, 4.6] },
      ],
    },
    spread: {
      at: { N: [3.5, 2.3], P1: [3.5, 1.2], Ha: [2.275, 2.734], Hb: [3.89, 3.34], Hc: [4.638, 2.592], O: [10.5, 2.3], P2: [10.5, 1.2], P3: [11.463, 2.547], H1: [9.275, 2.734], H2: [10.89, 3.34] },
      bonds: 'N-Ha N-Hb N-Hc O-H1 O-H2',
      names: [
        { text: '4 groups: a tetrahedron', at: [3.5, 4.6] },
        { text: '4 groups: a tetrahedron', at: [10.5, 4.6] },
      ],
    },
    shape: {
      at: { N: [3.5, 2.3], Ha: [2.275, 2.734], Hb: [3.89, 3.34], Hc: [4.638, 2.592], O: [10.5, 2.3], H1: [9.275, 2.734], H2: [10.89, 3.34] },
      bonds: 'N-Ha N-Hb N-Hc O-H1 O-H2',
      names: [
        { text: 'trigonal pyramidal', at: [3.5, 4.6], tone: 'good' },
        { text: 'V-shaped', at: [10.5, 4.6], tone: 'good' },
      ],
    },
  },
  start: 'bunched',
  clips: {
    spread: { phases: [{ dur: 0.6 }, { dur: 3, to: 'spread' }, { dur: 0.8 }] },
    name: { phases: [{ dur: 2, to: 'shape' }, { dur: 1 }] },
  },
  span: [14, 5.2],
  poster: 'spread',
  height,
});

type At = [number, number];
const turn = (c: At, len: number, deg: number): At => {
  const a = (deg * Math.PI) / 180;
  return [Math.round((c[0] + len * Math.cos(a)) * 1000) / 1000, Math.round((c[1] - len * Math.sin(a)) * 1000) / 1000];
};

/** A polar molecule, flat, its δ+ end (hydrogen) pointing at `deg` degrees: water, or chloroform. */
const polarMolecule = (kind: 'water' | 'chloroform', k: number, c: At, deg: number): Record<string, At> =>
  kind === 'water'
    ? { [`O${k}`]: c, [`Ha${k}`]: turn(c, 0.95, deg + 52), [`Hb${k}`]: turn(c, 0.95, deg - 52) }
    : { [`C${k}`]: c, [`H${k}`]: turn(c, 0.8, deg), [`Xa${k}`]: turn(c, 0.95, deg + 90), [`Xb${k}`]: turn(c, 0.95, deg + 180), [`Xc${k}`]: turn(c, 0.95, deg - 90) };

/**
 * The stream test up close (clip `rod`): a negatively charged rod comes near two liquids. The
 * polar molecules on the left (water, or chloroform) turn their δ+ hydrogen ends to face it; the
 * non-polar carbon tetrachloride molecules on the right have no charged sides, so they do not turn.
 */
export const rodTest = (id: string, polar: 'water' | 'chloroform', height = 480): MoleculesEl => {
  const A: At[] = [[1.9, 2.4], [5.3, 2.4], [1.9, 5.5], [5.3, 5.5]];
  const B: At[] = [[9.7, 2.4], [13.1, 2.4], [9.7, 5.5], [13.1, 5.5]];
  const from = [10, 170, 160, 25];
  const spin = [0, 20, 35, 10];
  const atoms: MoleculesEl['atoms'] = {};
  A.forEach((_, k) => Object.assign(atoms, polar === 'water' ? { [`O${k}`]: 'O', [`Ha${k}`]: 'H', [`Hb${k}`]: 'H' } : { [`C${k}`]: 'C', [`H${k}`]: 'H', [`Xa${k}`]: 'Cl', [`Xb${k}`]: 'Cl', [`Xc${k}`]: 'Cl' }));
  B.forEach((_, k) => Object.assign(atoms, { [`T${k}`]: 'C', [`Ta${k}`]: 'Cl', [`Tb${k}`]: 'Cl', [`Tc${k}`]: 'Cl', [`Td${k}`]: 'Cl' }));
  const bonds = [
    ...A.map((_, k) => (polar === 'water' ? `O${k}-Ha${k} O${k}-Hb${k}` : `C${k}-H${k} C${k}-Xa${k} C${k}-Xb${k} C${k}-Xc${k}`)),
    ...B.map((_, k) => `T${k}-Ta${k} T${k}-Tb${k} T${k}-Tc${k} T${k}-Td${k}`),
  ].join(' ');
  const ccl4 = Object.assign({}, ...B.map((c, k) => ({ [`T${k}`]: c, [`Ta${k}`]: turn(c, 0.95, spin[k]), [`Tb${k}`]: turn(c, 0.95, spin[k] + 90), [`Tc${k}`]: turn(c, 0.95, spin[k] + 180), [`Td${k}`]: turn(c, 0.95, spin[k] + 270) })));
  const labels = [
    { text: polar === 'water' ? 'water: polar' : 'chloroform: polar', at: [3.6, 7.3] as At },
    { text: 'carbon tetrachloride: non-polar', at: [11.4, 7.3] as At },
  ];
  const rod = [
    { text: '−  −  −  charged rod  −  −  −', at: [3.6, 0.45] as At, tone: 'bad' as const },
    { text: '−  −  −  charged rod  −  −  −', at: [11.4, 0.45] as At, tone: 'bad' as const },
  ];
  return {
    kind: 'molecules',
    id,
    atoms,
    stages: {
      before: { at: { ...Object.assign({}, ...A.map((c, k) => polarMolecule(polar, k, c, from[k]))), ...ccl4 }, bonds, names: labels },
      rod: { at: { ...Object.assign({}, ...A.map((c, k) => polarMolecule(polar, k, c, 90))), ...ccl4 }, bonds, names: [...labels, ...rod] },
    },
    start: 'before',
    clips: { rod: { phases: [{ dur: 0.6 }, { dur: 3, to: 'rod' }, { dur: 1 }] } },
    span: [15, 7.8],
    poster: 'rod',
    height,
  };
};
