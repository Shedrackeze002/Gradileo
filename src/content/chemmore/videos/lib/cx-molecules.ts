import type { MoleculesEl, MolAtom, MolPhase, MolStage } from '@/video/script.ts';

// Reactions and mechanisms as balls and sticks, for the extra chemistry lessons
// (src/video/molecules.ts). Bonds that break flash red, new bonds come in green, and a
// mechanism's curly arrows show where each pair of electrons goes before it moves.

const el = (id: string, atoms: Record<string, MolAtom>, stages: Record<string, MolStage>, start: string, clips: Record<string, { phases: MolPhase[] }>, span: [number, number] = [11, 5.8]): MoleculesEl => ({
  kind: 'molecules',
  id,
  atoms,
  stages,
  start,
  clips,
  span,
  poster: Object.keys(clips)[0],
});

/** A move to a stage that takes `dur` seconds, then a pause. */
const go = (to: string, dur = 2.6, pause = 0.6): MolPhase[] => [{ dur, to }, { dur: pause }];

/** Nucleophilic substitution: a hydroxide ion attacks the slightly positive carbon of bromoethane, and the bromide ion leaves (clips `attack`, which shows the curly arrows, then `swap`). */
export const nucleophilicSubstitution = (id: string): MoleculesEl => {
  const ethyl = { C1: [5.0, 1.75], Ha: [5.0, 0.75], Hb: [4.0, 1.75], Hc: [6.0, 1.75], C2: [5.0, 3.0], Hd: [4.3, 3.75], He: [5.7, 3.75] } as Record<string, [number, number]>;
  const chain = 'C1-C2 C1-Ha C1-Hb C1-Hc C2-Hd C2-He';
  const partial = [
    { text: 'δ+', at: [5.45, 2.55] as [number, number], tone: 'adj' as const },
    { text: 'δ−', at: [6.75, 2.4] as [number, number], tone: 'bad' as const },
  ];
  return el(
    id,
    { C1: 'C', C2: 'C', Ha: 'H', Hb: 'H', Hc: 'H', Hd: 'H', He: 'H', Br: 'Br', O: 'O', Ho: 'H' },
    {
      apart: {
        at: { ...ethyl, Br: [6.35, 3.0], O: [1.6, 3.0], Ho: [0.95, 2.35] },
        bonds: `${chain} C2-Br O-Ho`,
        charges: { O: -1 },
        names: [{ text: 'bromoethane', at: [5.3, 4.7] }, { text: 'hydroxide ion', at: [1.6, 4.0], tone: 'bad' }, ...partial],
      },
      attack: {
        at: { ...ethyl, Br: [6.35, 3.0], O: [3.1, 3.0], Ho: [2.45, 2.35] },
        bonds: `${chain} C2-Br O-Ho`,
        charges: { O: -1 },
        names: partial,
        arrows: [
          { from: 'O', to: 'C2', bend: -0.5 },
          { from: 'C2-Br', to: 'Br', bend: -0.6 },
        ],
      },
      product: {
        at: { ...ethyl, Br: [8.6, 3.0], O: [3.75, 3.0], Ho: [3.1, 2.35] },
        bonds: `${chain} C2-O O-Ho`,
        charges: { Br: -1 },
        names: [
          { text: 'ethanol', at: [4.6, 4.7] },
          { text: 'bromide ion', at: [8.6, 4.0], tone: 'opp' },
        ],
      },
    },
    'apart',
    { attack: { phases: [{ dur: 1 }, ...go('attack', 2.4, 2.6)] }, swap: { phases: [{ dur: 4 }, ...go('product', 2.8, 1.5)] } },
  );
};

/** Electrophilic addition: ethene's double bond attacks the hydrogen of HBr, leaving a carbocation that the bromide ion attacks (clips `first`, to the carbocation, then `second`). */
export const electrophilicAddition = (id: string): MoleculesEl =>
  el(
    id,
    { C1: 'C', C2: 'C', H1: 'H', H2: 'H', H3: 'H', H4: 'H', Hx: 'H', Br: 'Br' },
    {
      apart: {
        at: { C1: [3.6, 3.6], C2: [4.85, 3.6], H1: [2.95, 2.8], H2: [2.95, 4.4], H3: [5.5, 2.8], H4: [5.5, 4.4], Hx: [7.6, 1.5], Br: [8.95, 1.5] },
        bonds: 'C1=C2 C1-H1 C1-H2 C2-H3 C2-H4 Hx-Br',
        names: [
          { text: 'ethene', at: [4.2, 5.3] },
          { text: 'hydrogen bromide', at: [8.3, 2.45], tone: 'opp' },
        ],
      },
      attack: {
        at: { C1: [3.6, 3.6], C2: [4.85, 3.6], H1: [2.95, 2.8], H2: [2.95, 4.4], H3: [5.5, 2.8], H4: [5.5, 4.4], Hx: [3.85, 2.3], Br: [3.85, 1.0] },
        bonds: 'C1=C2 C1-H1 C1-H2 C2-H3 C2-H4 Hx-Br',
        arrows: [
          { from: 'C1=C2', to: 'Hx', bend: -0.6 },
          { from: 'Hx-Br', to: 'Br', bend: 0.6 },
        ],
      },
      cation: {
        at: { C1: [3.6, 3.6], C2: [4.85, 3.6], H1: [2.6, 3.6], H2: [3.6, 4.6], H3: [5.5, 2.8], H4: [5.5, 4.4], Hx: [3.6, 2.6], Br: [6.9, 1.6] },
        bonds: 'C1-C2 C1-H1 C1-H2 C2-H3 C2-H4 C1-Hx',
        charges: { C2: 1, Br: -1 },
        names: [
          { text: 'carbocation', at: [4.2, 5.3] },
          { text: 'bromide ion', at: [6.9, 2.55], tone: 'opp' },
        ],
        arrows: [{ from: 'Br', to: 'C2', bend: 0.5 }],
      },
      product: {
        at: { C1: [3.6, 3.6], C2: [4.85, 3.6], H1: [2.6, 3.6], H2: [3.6, 4.6], H3: [5.85, 3.6], H4: [4.85, 4.6], Hx: [3.6, 2.6], Br: [4.85, 2.3] },
        bonds: 'C1-C2 C1-H1 C1-H2 C2-H3 C2-H4 C1-Hx C2-Br',
        names: [{ text: 'bromoethane', at: [4.2, 5.3] }],
      },
    },
    'apart',
    {
      first: { phases: [{ dur: 1 }, ...go('attack', 2.4, 2.4), ...go('cation', 2.6, 1)] },
      second: { phases: [{ dur: 0.3 }, ...go('product', 2.6, 1.5)] },
    },
  );

/** The benzene ring: six carbons round a centre, each with a hydrogen atom further out. */
function benzene(cx: number, cy: number): Record<string, [number, number]> {
  const out: Record<string, [number, number]> = {};
  for (let k = 0; k < 6; k++) {
    const a = (-k * Math.PI) / 3;
    out[`C${k + 1}`] = [cx + 1.1 * Math.cos(a), cy + 1.1 * Math.sin(a)];
    out[`H${k + 1}`] = [cx + 2.05 * Math.cos(a), cy + 2.05 * Math.sin(a)];
  }
  return out;
}
const RING = 'C1-C2 C2-C3 C3-C4 C4-C5 C5-C6 C6-C1';
const RING_H = 'C2-H2 C3-H3 C4-H4 C5-H5 C6-H6';
const RING_ATOMS = ['C1', 'C2', 'C3', 'C4', 'C5', 'C6'];

/** The nitration of benzene: the nitronium ion is attacked by the ring's delocalised electrons, and a hydrogen ion leaves so the ring is restored (clips `attack`, to the positive middle stage, then `restore`). */
export const nitration = (id: string): MoleculesEl => {
  const ring = benzene(3.6, 3.0);
  const keep = Object.fromEntries(Object.entries(ring).filter(([n]) => n !== 'H1'));
  return el(
    id,
    { C1: 'C', C2: 'C', C3: 'C', C4: 'C', C5: 'C', C6: 'C', H1: 'H', H2: 'H', H3: 'H', H4: 'H', H5: 'H', H6: 'H', N: 'N', O1: 'O', O2: 'O' },
    {
      apart: {
        at: { ...ring, N: [9.0, 3.0], O1: [9.0, 1.9], O2: [9.0, 4.1] },
        bonds: `${RING} ${RING_H} C1-H1 N=O1 N=O2`,
        rings: [RING_ATOMS],
        charges: { N: 1 },
        names: [
          { text: 'benzene', at: [3.6, 5.45] },
          { text: 'nitronium ion', at: [9.0, 5.0], tone: 'adj' },
        ],
      },
      attack: {
        at: { ...ring, N: [6.9, 3.0], O1: [6.9, 1.9], O2: [6.9, 4.1] },
        bonds: `${RING} ${RING_H} C1-H1 N=O1 N=O2`,
        rings: [RING_ATOMS],
        charges: { N: 1 },
        arrows: [
          { from: 'C1-C2', to: 'N', bend: -0.5 },
          { from: 'N=O1', to: 'O1', bend: 0.5 },
        ],
      },
      middle: {
        at: { ...keep, H1: [5.35, 2.05], N: [5.75, 3.85], O1: [6.95, 3.6], O2: [5.5, 5.0] },
        bonds: `${RING} ${RING_H} C1-H1 C1-N N=O1 N-O2`,
        charges: { N: 1, O2: -1 },
        names: [{ text: '+', at: [3.6, 3.0], tone: 'adj' }],
        arrows: [{ from: 'C1-H1', to: 'C1-C6', bend: 0.6 }],
      },
      product: {
        at: { ...keep, H1: [8.6, 1.4], N: [5.95, 3.0], O1: [6.55, 2.05], O2: [6.55, 3.95] },
        bonds: `${RING} ${RING_H} C1-N N=O1 N-O2`,
        rings: [RING_ATOMS],
        charges: { N: 1, O2: -1, H1: 1 },
        names: [
          { text: 'nitrobenzene', at: [3.9, 5.45] },
          { text: 'hydrogen ion', at: [8.6, 2.3], tone: 'theta' },
        ],
      },
    },
    'apart',
    { attack: { phases: [{ dur: 1 }, ...go('attack', 2.4, 2.2), ...go('middle', 2.6, 2.2)] }, restore: { phases: go('product', 2.6, 1.5) } },
  );
};

/** The Haber process: one nitrogen molecule and three hydrogen molecules make two ammonia molecules (clip `go`). */
export const haber = (id: string): MoleculesEl =>
  el(
    id,
    { Na: 'N', Nb: 'N', H1: 'H', H2: 'H', H3: 'H', H4: 'H', H5: 'H', H6: 'H' },
    {
      apart: {
        at: { Na: [3.9, 3.0], Nb: [5.0, 3.0], H1: [1.2, 2.6], H2: [1.2, 3.4], H3: [7.7, 2.6], H4: [7.7, 3.4], H5: [4.05, 0.8], H6: [4.85, 0.8] },
        bonds: 'Na#Nb H1-H2 H3-H4 H5-H6',
        names: [
          { text: 'nitrogen', at: [4.45, 4.0] },
          { text: 'three hydrogen molecules', at: [4.45, 5.2], tone: 'adj' },
        ],
      },
      meet: {
        at: { Na: [3.9, 3.0], Nb: [5.0, 3.0], H1: [2.55, 2.6], H2: [2.55, 3.4], H3: [6.35, 2.6], H4: [6.35, 3.4], H5: [3.9, 1.75], H6: [5.0, 1.75] },
        bonds: 'Na#Nb H1-H2 H3-H4 H5-H6',
      },
      product: {
        at: { Na: [2.9, 3.0], Nb: [6.0, 3.0], H1: [2.2, 2.3], H2: [2.2, 3.7], H5: [3.6, 2.3], H3: [6.7, 2.3], H4: [6.7, 3.7], H6: [5.3, 2.3] },
        bonds: 'Na-H1 Na-H2 Na-H5 Nb-H3 Nb-H4 Nb-H6',
        names: [
          { text: 'ammonia', at: [2.9, 4.6] },
          { text: 'ammonia', at: [6.0, 4.6] },
        ],
      },
    },
    'apart',
    { go: { phases: [{ dur: 1 }, ...go('meet'), ...go('product', 3, 1.5)] } },
    [9, 5.8],
  );

/**
 * A hydrogen fuel cell with an acidic electrolyte (clips `cross`, splitting the hydrogen and moving its ions across, then `water`): at the negative
 * electrode each hydrogen molecule splits into two hydrogen ions (the electrons go round the
 * circuit); the ions cross to the positive electrode, where they join oxygen as water.
 */
export const fuelCell = (id: string): MoleculesEl => {
  const neg = { text: 'negative electrode', at: [2.2, 0.35] as [number, number] };
  const pos = { text: 'positive electrode', at: [8.8, 0.35] as [number, number] };
  return el(
    id,
    { Ha: 'H', Hb: 'H', Hc: 'H', Hd: 'H', O1: 'O', O2: 'O' },
    {
      apart: {
        at: { Ha: [1.7, 1.9], Hb: [2.5, 1.9], Hc: [1.7, 3.9], Hd: [2.5, 3.9], O1: [8.2, 2.9], O2: [9.4, 2.9] },
        bonds: 'Ha-Hb Hc-Hd O1=O2',
        names: [neg, pos, { text: 'hydrogen in', at: [2.2, 5.1], tone: 'adj' }, { text: 'oxygen in', at: [8.8, 5.1], tone: 'bad' }],
      },
      ions: {
        at: { Ha: [1.7, 1.3], Hb: [2.7, 2.3], Hc: [1.7, 4.5], Hd: [2.7, 3.5], O1: [8.2, 2.9], O2: [9.4, 2.9] },
        bonds: 'O1=O2',
        charges: { Ha: 1, Hb: 1, Hc: 1, Hd: 1 },
        names: [
          { text: 'electrons leave by the wire', at: [2.6, 0.35], tone: 'theta' },
          pos,
          { text: 'hydrogen ions', at: [2.2, 5.3], tone: 'adj' },
          { text: 'oxygen in', at: [8.8, 5.1], tone: 'bad' },
        ],
      },
      cross: {
        at: { Ha: [10.7, 2.2], Hb: [6.9, 2.2], Hc: [10.7, 3.6], Hd: [6.9, 3.6], O1: [8.2, 2.9], O2: [9.4, 2.9] },
        bonds: 'O1=O2',
        charges: { Ha: 1, Hb: 1, Hc: 1, Hd: 1 },
        names: [neg, pos, { text: 'the ions cross the electrolyte', at: [5.8, 5.1], tone: 'adj' }],
      },
      water: {
        at: { Ha: [10.7, 2.2], Hb: [6.9, 2.2], Hc: [10.7, 3.6], Hd: [6.9, 3.6], O1: [7.6, 2.9], O2: [10.0, 2.9] },
        bonds: 'O1-Hb O1-Hd O2-Ha O2-Hc',
        names: [neg, { text: 'electrons arrive by the wire', at: [8.8, 0.35], tone: 'theta' }, { text: 'water', at: [7.4, 4.5] }, { text: 'water', at: [10.2, 4.5] }],
      },
    },
    'apart',
    {
      cross: { phases: [{ dur: 0.5 }, ...go('ions', 2.6, 2.5), ...go('cross', 3, 0.6)] },
      water: { phases: go('water', 2.6, 1.5) },
    },
    [11.6, 5.8],
  );
};
