import type { MoleculesEl, MolAtom, MolPhase, MolStage } from '@/video/script.ts';

// Organic reactions as balls and sticks (src/video/molecules.ts): the reactants drift together,
// the bonds that break flash red and fade, and the new bonds come in green, so the bonds broken
// and made can be counted. Drawn flat, like a structural formula, with bonds about 1 unit long.

type At = [number, number];
interface Reaction {
  atoms: Record<string, MolAtom>;
  stages: Record<string, MolStage>;
  start: string;
  clips: Record<string, { phases: MolPhase[] }>;
}

const el = (id: string, r: Reaction, o: { span?: [number, number]; height?: number; poster?: string } = {}): MoleculesEl => ({
  kind: 'molecules',
  id,
  ...r,
  span: o.span ?? [11, 5.6],
  poster: o.poster ?? Object.keys(r.clips)[0],
  ...(o.height ? { height: o.height } : {}),
});

/** A move to a stage that takes `dur` seconds, then a pause. */
const go = (to: string, dur = 2.6, pause = 0.6): MolPhase[] => [{ dur, to }, { dur: pause }];

/** Ethene and bromine: the second carbon–carbon bond opens, bromine splits, and a bromine atom joins each carbon. */
const BROMINE: Reaction = {
  atoms: { C1: 'C', C2: 'C', H1: 'H', H2: 'H', H3: 'H', H4: 'H', Br1: 'Br', Br2: 'Br' },
  stages: {
    apart: {
      at: { C1: [4.4, 3.0], C2: [5.65, 3.0], H1: [3.75, 2.2], H2: [3.75, 3.8], H3: [6.3, 2.2], H4: [6.3, 3.8], Br1: [8.3, 1.3], Br2: [9.65, 1.3] },
      bonds: 'C1=C2 C1-H1 C1-H2 C2-H3 C2-H4 Br1-Br2',
      names: [
        { text: 'ethene', at: [5.0, 4.85] },
        { text: 'bromine', at: [9.0, 2.3], tone: 'opp' },
      ],
    },
    meet: {
      at: { C1: [4.4, 3.0], C2: [5.65, 3.0], H1: [3.75, 2.2], H2: [3.75, 3.8], H3: [6.3, 2.2], H4: [6.3, 3.8], Br1: [4.4, 1.3], Br2: [5.65, 1.3] },
      bonds: 'C1=C2 C1-H1 C1-H2 C2-H3 C2-H4 Br1-Br2',
    },
    product: {
      at: { C1: [4.4, 3.0], C2: [5.65, 3.0], H1: [3.4, 3.0], H2: [4.4, 4.0], H3: [6.65, 3.0], H4: [5.65, 4.0], Br1: [4.4, 1.7], Br2: [5.65, 1.7] },
      bonds: 'C1-C2 C1-H1 C1-H2 C2-H3 C2-H4 C1-Br1 C2-Br2',
      names: [{ text: '1,2-dibromoethane', at: [5.0, 4.95] }],
    },
  },
  start: 'apart',
  clips: { go: { phases: [{ dur: 1 }, ...go('meet'), ...go('product', 3, 1.5)] } },
};

export const bromineAdds = (id: string) => el(id, BROMINE);

/** Propene and hydrogen bromide: the hydrogen atom joins carbon 1 (which has more hydrogen atoms), the bromine atom carbon 2. */
export const hydrogenBromideAdds = (id: string): MoleculesEl =>
  el(id, {
    atoms: { C1: 'C', C2: 'C', C3: 'C', H1: 'H', H2: 'H', H3: 'H', H4: 'H', H5: 'H', H6: 'H', Hx: 'H', Br: 'Br' },
    stages: {
      apart: {
        at: { C1: [3.4, 3.0], C2: [4.65, 3.0], C3: [5.9, 3.0], H1: [2.75, 2.2], H2: [2.75, 3.8], H3: [4.65, 4.0], H4: [5.9, 2.0], H5: [6.9, 3.0], H6: [5.9, 4.0], Hx: [8.4, 1.3], Br: [9.65, 1.3] },
        bonds: 'C1=C2 C2-C3 C1-H1 C1-H2 C2-H3 C3-H4 C3-H5 C3-H6 Hx-Br',
        names: [
          { text: 'propene', at: [4.65, 4.95] },
          { text: 'hydrogen bromide', at: [9.0, 2.3], tone: 'opp' },
          { text: 'C1', at: [3.4, 1.55], tone: 'good' },
          { text: 'C2', at: [4.65, 1.55], tone: 'opp' },
        ],
      },
      meet: {
        at: { C1: [3.4, 3.0], C2: [4.65, 3.0], C3: [5.9, 3.0], H1: [2.75, 2.2], H2: [2.75, 3.8], H3: [4.65, 4.0], H4: [5.9, 2.0], H5: [6.9, 3.0], H6: [5.9, 4.0], Hx: [3.4, 1.35], Br: [4.65, 1.35] },
        bonds: 'C1=C2 C2-C3 C1-H1 C1-H2 C2-H3 C3-H4 C3-H5 C3-H6 Hx-Br',
      },
      product: {
        at: { C1: [3.4, 3.0], C2: [4.65, 3.0], C3: [5.9, 3.0], H1: [2.4, 3.0], H2: [3.4, 4.0], H3: [4.65, 4.0], H4: [5.9, 2.0], H5: [6.9, 3.0], H6: [5.9, 4.0], Hx: [3.4, 2.0], Br: [4.65, 1.7] },
        bonds: 'C1-C2 C2-C3 C1-H1 C1-H2 C2-H3 C3-H4 C3-H5 C3-H6 C1-Hx C2-Br',
        names: [{ text: '2-bromopropane', at: [4.65, 4.95] }],
      },
    },
    start: 'apart',
    clips: { go: { phases: [{ dur: 1 }, ...go('meet'), ...go('product', 3, 1.5)] } },
  });

/** Ethyne adds hydrogen twice: the triple bond becomes a double bond (ethene), then a single bond (ethane). Clips `first` and `second`. */
export const hydrogenAddsTwice = (id: string): MoleculesEl =>
  el(
    id,
    {
      atoms: { C1: 'C', C2: 'C', H1: 'H', H2: 'H', Ha: 'H', Hb: 'H', Hc: 'H', Hd: 'H' },
      stages: {
        apart: {
          at: { C1: [4.4, 3.0], C2: [5.65, 3.0], H1: [3.4, 3.0], H2: [6.65, 3.0], Ha: [8.4, 1.3], Hb: [9.4, 1.3], Hc: [8.4, 4.5], Hd: [9.4, 4.5] },
          bonds: 'C1#C2 C1-H1 C2-H2 Ha-Hb Hc-Hd',
          names: [
            { text: 'ethyne', at: [5.0, 4.3] },
            { text: 'hydrogen', at: [8.9, 2.2], tone: 'adj' },
            { text: 'hydrogen', at: [8.9, 3.6], tone: 'adj' },
          ],
        },
        meet1: {
          at: { C1: [4.4, 3.0], C2: [5.65, 3.0], H1: [3.4, 3.0], H2: [6.65, 3.0], Ha: [4.4, 1.4], Hb: [5.65, 1.4], Hc: [8.4, 4.5], Hd: [9.4, 4.5] },
          bonds: 'C1#C2 C1-H1 C2-H2 Ha-Hb Hc-Hd',
        },
        ethene: {
          at: { C1: [4.4, 3.0], C2: [5.65, 3.0], H1: [3.75, 3.8], H2: [6.3, 3.8], Ha: [3.75, 2.2], Hb: [6.3, 2.2], Hc: [8.4, 4.5], Hd: [9.4, 4.5] },
          bonds: 'C1=C2 C1-H1 C2-H2 C1-Ha C2-Hb Hc-Hd',
          names: [{ text: 'ethene', at: [5.0, 1.0] }],
        },
        meet2: {
          at: { C1: [4.4, 3.0], C2: [5.65, 3.0], H1: [3.75, 3.8], H2: [6.3, 3.8], Ha: [3.75, 2.2], Hb: [6.3, 2.2], Hc: [4.4, 4.6], Hd: [5.65, 4.6] },
          bonds: 'C1=C2 C1-H1 C2-H2 C1-Ha C2-Hb Hc-Hd',
          names: [{ text: 'ethene', at: [5.0, 1.0] }],
        },
        ethane: {
          at: { C1: [4.4, 3.0], C2: [5.65, 3.0], H1: [3.4, 3.0], H2: [6.65, 3.0], Ha: [4.4, 2.0], Hb: [5.65, 2.0], Hc: [4.4, 4.0], Hd: [5.65, 4.0] },
          bonds: 'C1-C2 C1-H1 C2-H2 C1-Ha C2-Hb C1-Hc C2-Hd',
          names: [{ text: 'ethane', at: [5.0, 1.0] }],
        },
      },
      start: 'apart',
      clips: {
        first: { phases: [{ dur: 1 }, ...go('meet1'), ...go('ethene', 3, 1.5)] },
        second: { phases: [...go('meet2'), ...go('ethane', 3, 1.5)] },
      },
    },
    { poster: 'first' },
  );

/** Methane and chlorine: one chlorine atom takes a hydrogen atom away as hydrogen chloride, and the other takes its place. */
const CHLORINE: Reaction = {
  atoms: { C: 'C', H1: 'H', H2: 'H', H3: 'H', H4: 'H', Cla: 'Cl', Clb: 'Cl' },
  stages: {
    apart: {
      at: { C: [3.6, 3.0], H1: [3.6, 2.0], H2: [2.6, 3.0], H3: [3.6, 4.0], H4: [4.6, 3.0], Cla: [7.6, 3.0], Clb: [8.95, 3.0] },
      bonds: 'C-H1 C-H2 C-H3 C-H4 Cla-Clb',
      names: [
        { text: 'methane', at: [3.6, 4.95] },
        { text: 'chlorine', at: [8.3, 4.0], tone: 'good' },
      ],
    },
    meet: {
      at: { C: [3.6, 3.0], H1: [3.6, 2.0], H2: [2.6, 3.0], H3: [3.6, 4.0], H4: [4.6, 3.0], Cla: [5.75, 3.0], Clb: [7.1, 3.0] },
      bonds: 'C-H1 C-H2 C-H3 C-H4 Cla-Clb',
    },
    taken: {
      at: { C: [3.6, 3.0], H1: [3.6, 2.0], H2: [2.6, 3.0], H3: [3.6, 4.0], H4: [6.4, 1.5], Cla: [7.65, 1.5], Clb: [7.1, 3.0] },
      bonds: 'C-H1 C-H2 C-H3 H4-Cla',
    },
    product: {
      at: { C: [3.6, 3.0], H1: [3.6, 2.0], H2: [2.6, 3.0], H3: [3.6, 4.0], H4: [6.4, 1.5], Cla: [7.65, 1.5], Clb: [4.9, 3.0] },
      bonds: 'C-H1 C-H2 C-H3 H4-Cla C-Clb',
      names: [
        { text: 'chloromethane', at: [3.8, 4.95] },
        { text: 'hydrogen chloride', at: [7.0, 2.5], tone: 'good' },
      ],
    },
  },
  start: 'apart',
  clips: { go: { phases: [{ dur: 1 }, ...go('meet'), ...go('taken'), ...go('product', 2.6, 1.5)] } },
};

export const chlorineSwaps = (id: string) => el(id, CHLORINE);

/** Ethanol loses water: the OH group and a hydrogen atom from the next carbon leave together, and the carbons form a double bond. */
const DEHYDRATION: Reaction = {
  atoms: { C1: 'C', C2: 'C', Ha: 'H', Hb: 'H', Hc: 'H', Hd: 'H', He: 'H', O: 'O', Ho: 'H' },
  stages: {
    ethanol: {
      at: { C1: [3.9, 2.6], C2: [5.15, 2.6], Ha: [3.9, 1.6], Hb: [2.9, 2.6], Hc: [3.9, 3.6], Hd: [5.15, 1.6], He: [6.15, 2.6], O: [5.15, 3.85], Ho: [5.95, 4.45] },
      bonds: 'C1-C2 C1-Ha C1-Hb C1-Hc C2-Hd C2-He C2-O O-Ho',
      names: [{ text: 'ethanol', at: [4.5, 0.6] }],
    },
    split: {
      at: { C1: [3.9, 2.6], C2: [5.15, 2.6], Ha: [3.25, 1.8], Hb: [3.25, 3.4], Hc: [3.85, 4.95], Hd: [5.8, 1.8], He: [5.8, 3.4], O: [4.6, 4.45], Ho: [5.35, 4.95] },
      bonds: 'C1=C2 C1-Ha C1-Hb C2-Hd C2-He O-Ho O-Hc',
    },
    apart: {
      at: { C1: [3.9, 2.6], C2: [5.15, 2.6], Ha: [3.25, 1.8], Hb: [3.25, 3.4], Hc: [7.45, 4.35], Hd: [5.8, 1.8], He: [5.8, 3.4], O: [8.2, 3.8], Ho: [8.95, 4.35] },
      bonds: 'C1=C2 C1-Ha C1-Hb C2-Hd C2-He O-Ho O-Hc',
      names: [
        { text: 'ethene', at: [4.5, 0.6] },
        { text: 'water', at: [8.2, 5.15], tone: 'bad' },
      ],
    },
  },
  start: 'ethanol',
  clips: { go: { phases: [{ dur: 1.5 }, ...go('split', 3, 0.8), ...go('apart', 2, 1.5)] } },
};

export const waterLeaves = (id: string) => el(id, DEHYDRATION);

/** Several reactions in one element, one after another: each clip fades the last reaction out and plays the next. */
export function oneAfterAnother(id: string, parts: Array<{ key: string; r: Reaction }>, o: { height?: number } = {}): MoleculesEl {
  const atoms: Record<string, MolAtom> = {};
  const stages: Record<string, MolStage> = {};
  const clips: Record<string, { phases: MolPhase[] }> = {};
  for (const { key, r } of parts) {
    const p = (n: string) => `${key}${n}`;
    for (const [n, a] of Object.entries(r.atoms)) atoms[p(n)] = a;
    for (const [n, st] of Object.entries(r.stages))
      stages[`${key}:${n}`] = {
        at: Object.fromEntries(Object.entries(st.at).map(([a, xy]) => [p(a), xy as At])),
        bonds: st.bonds.replace(/[A-Za-z0-9_']+/g, (a) => p(a)),
        ...(st.charges ? { charges: Object.fromEntries(Object.entries(st.charges).map(([a, q]) => [p(a), q])) } : {}),
        ...(st.names ? { names: st.names } : {}),
      };
  }
  parts.forEach(({ key, r }, i) => {
    const phases = Object.values(r.clips).flatMap((c) => c.phases.map((ph) => (ph.to ? { ...ph, to: `${key}:${ph.to}` } : ph)));
    clips[key] = { phases: i === 0 ? phases : [{ dur: 1.4, to: `${key}:${r.start}` }, ...phases] };
  });
  return el(id, { atoms, stages, start: `${parts[0].key}:${parts[0].r.start}`, clips }, { ...o, poster: parts[0].key });
}

/** Addition, substitution and elimination, one after another (clips `add`, `sub` and `elim`). */
export const threeKinds = (id: string) =>
  oneAfterAnother(id, [
    { key: 'add', r: BROMINE },
    { key: 'sub', r: CHLORINE },
    { key: 'elim', r: DEHYDRATION },
  ]);
