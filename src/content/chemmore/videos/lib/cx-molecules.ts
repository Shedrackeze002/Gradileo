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

type At = [number, number];
const r3 = (v: number) => Math.round(v * 1000) / 1000;
const sized = (m: MoleculesEl, height: number): MoleculesEl => ({ ...m, height });

/**
 * Carbon atoms join into graphene (clip `join`): loose atoms come together into a sheet of
 * hexagons, each carbon bonded to three others, one atom thick.
 */
export const graphene = (id: string, height = 400): MoleculesEl => {
  const r = 1.1;
  const w = Math.sqrt(3) * r;
  const centres: At[] = [0, 1, 2].map((k): At => [k * w, 0]).concat([0, 1].map((k): At => [w / 2 + k * w, 1.5 * r]));
  const verts: At[] = [];
  const bonds = new Set<string>();
  const index = (p: At) => {
    const i = verts.findIndex((v) => Math.abs(v[0] - p[0]) < 0.01 && Math.abs(v[1] - p[1]) < 0.01);
    if (i >= 0) return i;
    verts.push(p);
    return verts.length - 1;
  };
  for (const [cx, cy] of centres) {
    const ring = [0, 1, 2, 3, 4, 5].map((j) => index([r3(cx + r * Math.cos(((90 + 60 * j) * Math.PI) / 180)), r3(cy + r * Math.sin(((90 + 60 * j) * Math.PI) / 180))]));
    ring.forEach((a, j) => {
      const b = ring[(j + 1) % 6];
      bonds.add(a < b ? `C${a}-C${b}` : `C${b}-C${a}`);
    });
  }
  const xs = verts.map((v) => v[0]);
  const ys = verts.map((v) => v[1]);
  const c: At = [(Math.max(...xs) + Math.min(...xs)) / 2, (Math.max(...ys) + Math.min(...ys)) / 2];
  const spread = verts.map(([x, y], i): At => [c[0] + (x - c[0]) * 1.4 + 0.35 * Math.sin(i * 2.3), c[1] + (y - c[1]) * 1.3 + 0.3 * Math.cos(i * 1.7)]);
  const all = [...verts, ...spread];
  const [dx, dy] = [0.7 - Math.min(...all.map((v) => v[0])), 0.7 - Math.min(...all.map((v) => v[1]))];
  const sheet = Object.fromEntries(verts.map((v, k) => [`C${k}`, [r3(v[0] + dx), r3(v[1] + dy)] as At]));
  const loose = Object.fromEntries(spread.map((v, k) => [`C${k}`, [r3(v[0] + dx), r3(v[1] + dy)] as At]));
  const mid: At = [r3(c[0] + dx), r3(c[1] + dy)];
  const ny = r3(Math.max(...all.map((v) => v[1])) + dy + 1.0);
  return sized(
    el(
      id,
      Object.fromEntries(verts.map((_, k) => [`C${k}`, 'C'])),
      {
        loose: { at: loose, bonds: '', names: [{ text: 'carbon atoms', at: [mid[0], ny] }] },
        sheet: { at: sheet, bonds: [...bonds].join(' '), names: [{ text: 'graphene: each carbon bonded to three others, a sheet one atom thick', at: [mid[0], ny], tone: 'good' }] },
      },
      'loose',
      { join: { phases: [{ dur: 0.6 }, ...go('sheet', 3, 1.2)] } },
      [r3(Math.max(...all.map((v) => v[0])) + dx + 0.7), r3(ny + 0.7)],
    ),
    height,
  );
};

/**
 * Sodium oxide in water (clip `go`): the oxide ion takes a hydrogen ion from a water molecule, and
 * the two become hydroxide ions, so the solution is alkaline. The sodium ions just stay dissolved.
 */
export const oxideInWater = (id: string, height = 380): MoleculesEl =>
  sized(
    el(
      id,
      { Na1: 'Na', Na2: 'Na', Ox: 'O', Ow: 'O', Ha: 'H', Hb: 'H' },
      {
        start: {
          at: { Na1: [1.0, 1.5], Na2: [1.0, 3.7], Ox: [2.4, 2.6], Ow: [6.4, 2.8], Ha: [5.65, 2.2], Hb: [7.15, 2.2] },
          bonds: 'Ow-Ha Ow-Hb',
          charges: { Na1: 1, Na2: 1, Ox: -2 },
          names: [
            { text: 'sodium oxide: Na⁺ and O²⁻ ions', at: [1.8, 5.0] },
            { text: 'water', at: [6.4, 5.0] },
          ],
        },
        meet: {
          at: { Na1: [1.0, 1.5], Na2: [1.0, 3.7], Ox: [3.9, 2.6], Ow: [6.4, 2.8], Ha: [5.65, 2.2], Hb: [7.15, 2.2] },
          bonds: 'Ow-Ha Ow-Hb',
          charges: { Na1: 1, Na2: 1, Ox: -2 },
        },
        after: {
          at: { Na1: [1.0, 1.5], Na2: [1.0, 3.7], Ox: [3.3, 2.6], Ha: [4.05, 2.0], Ow: [6.9, 2.8], Hb: [7.65, 2.2] },
          bonds: 'Ox-Ha Ow-Hb',
          charges: { Na1: 1, Na2: 1, Ox: -1, Ow: -1 },
          names: [{ text: 'two hydroxide ions, OH⁻: an alkaline solution', at: [4.6, 5.0], tone: 'theta' }],
        },
      },
      'start',
      { go: { phases: [{ dur: 0.6 }, ...go('meet', 1.6, 0.2), ...go('after', 2, 1.2)] } },
      [8.6, 5.6],
    ),
    height,
  );

/**
 * A copper(II) ion and six water molecules (clip `bind`): each water molecule turns its oxygen
 * towards the ion and donates a lone pair, forming six coordinate bonds: [Cu(H₂O)₆]²⁺.
 */
export const aquaIon = (id: string, height = 440): MoleculesEl => {
  const c: At = [5, 3.9];
  const atoms: Record<string, MolAtom> = { Cu: { el: 'Cu', tone: 'opp' } };
  const far: Record<string, At> = { Cu: c };
  const near: Record<string, At> = { Cu: c };
  const water: string[] = [];
  const dative: string[] = [];
  for (let k = 0; k < 6; k++) {
    const a = (k * 60 * Math.PI) / 180;
    const at = (d: number, off = 0): At => [r3(c[0] + d * Math.cos(a + off)), r3(c[1] + d * Math.sin(a + off))];
    Object.assign(atoms, { [`O${k}`]: 'O', [`Ha${k}`]: 'H', [`Hb${k}`]: 'H' });
    Object.assign(far, { [`O${k}`]: at(2.9), [`Ha${k}`]: at(3.45, 0.2), [`Hb${k}`]: at(3.45, -0.2) });
    Object.assign(near, { [`O${k}`]: at(1.75), [`Ha${k}`]: at(2.35, 0.3), [`Hb${k}`]: at(2.35, -0.3) });
    water.push(`O${k}-Ha${k}`, `O${k}-Hb${k}`);
    dative.push(`Cu-O${k}`);
  }
  return sized(
    el(
      id,
      atoms,
      {
        far: { at: far, bonds: water.join(' '), charges: { Cu: 2 }, names: [{ text: 'a copper(II) ion, and water molecules with lone pairs', at: [5, 8.0] }] },
        near: { at: near, bonds: `${water.join(' ')} ${dative.join(' ')}`, charges: { Cu: 2 }, names: [{ text: '[Cu(H₂O)₆]²⁺: six coordinate bonds', at: [5, 8.0], tone: 'good' }] },
      },
      'far',
      { bind: { phases: [{ dur: 0.6 }, ...go('near', 3, 1.2)] } },
      [10, 8.6],
    ),
    height,
  );
};

/**
 * Rotation about a single bond and a double bond (clips `single` and `double`). In
 * 1,2-dichloroethane (hydrogen atoms left out) the CH₂Cl group turns freely. In Z-1,2-dichloroethene
 * the groups can only swap if the π bond breaks first, and the result is a different compound, the
 * E isomer.
 */
export const restrictedRotation = (id: string, height = 400): MoleculesEl => {
  const L = { C1: [1.6, 2.6] as At, C2: [2.9, 2.6] as At, Cl1: [1.0, 1.55] as At };
  const R = { C3: [8.0, 2.6] as At, C4: [9.3, 2.6] as At, Cl3: [7.4, 1.55] as At, H5: [7.4, 3.65] as At };
  const lb = 'C1-C2 C1-Cl1 C2-Cl2';
  const rb = 'C3-Cl3 C3-H5 C4-Cl4 C4-H6';
  const up: At = [3.5, 1.55];
  const ny = 5.0;
  const lName = (text: string, tone?: 'good' | 'bad') => ({ text, at: [2.3, ny] as At, ...(tone ? { tone } : {}) });
  const rName = (text: string, tone?: 'good' | 'bad') => ({ text, at: [8.7, ny] as At, ...(tone ? { tone } : {}) });
  const zR = { ...R, Cl4: [9.9, 1.55] as At, H6: [9.9, 3.65] as At };
  const leftDown = { ...L, Cl2: [3.5, 3.65] as At };
  return sized(
    el(
      id,
      { C1: 'C', C2: 'C', Cl1: 'Cl', Cl2: 'Cl', C3: 'C', C4: 'C', Cl3: 'Cl', Cl4: 'Cl', H5: 'H', H6: 'H' },
      {
        start: { at: { ...L, Cl2: up, ...zR }, bonds: `${lb} C3=C4 ${rb}`, names: [lName('single bond (H not drawn)'), rName('double bond: the Z isomer')] },
        l1: { at: { ...L, Cl2: [3.95, 2.6], ...zR }, bonds: `${lb} C3=C4 ${rb}` },
        l2: { at: { ...leftDown, ...zR }, bonds: `${lb} C3=C4 ${rb}`, names: [lName('turns freely: same compound', 'good'), rName('double bond: the Z isomer')] },
        r1: { at: { ...leftDown, ...zR }, bonds: `${lb} C3-C4 ${rb}`, names: [lName('turns freely: same compound'), rName('first the π bond breaks', 'bad')] },
        r2: { at: { ...leftDown, ...R, Cl4: [10.35, 2.6], H6: [11.2, 2.6] }, bonds: `${lb} C3-C4 ${rb}` },
        r3: { at: { ...leftDown, ...R, Cl4: [9.9, 3.65], H6: [9.9, 1.55] }, bonds: `${lb} C3=C4 ${rb}`, names: [lName('turns freely: same compound'), rName('E isomer: a new compound', 'good')] },
      },
      'start',
      {
        single: { phases: [{ dur: 0.6 }, { dur: 1.2, to: 'l1' }, ...go('l2', 1.2, 1)] },
        double: { phases: [...go('r1', 1.4, 0.6), { dur: 1.4, to: 'r2' }, ...go('r3', 1.6, 1.2)] },
      },
      [12, 5.6],
    ),
    height,
  );
};

/**
 * Propanone reduced by a hydride ion (clip `go`): the hydride ion attacks the slightly positive
 * carbon, the π pair moves onto the oxygen, and the oxygen then takes a hydrogen ion from water:
 * propan-2-ol.
 */
export const ketoneReduced = (id: string, height = 420): MoleculesEl => {
  const frame: Record<string, At> = { C1: [2.5, 2.8], C2: [3.7, 2.8], C3: [4.9, 2.8], H1: [1.5, 2.8], H2: [2.5, 1.8], H3: [2.5, 3.8], H4: [5.9, 2.8], H5: [4.9, 1.8], H6: [4.9, 3.8], O: [3.7, 1.6] };
  const fb = 'C1-C2 C2-C3 C1-H1 C1-H2 C1-H3 C3-H4 C3-H5 C3-H6';
  const water = { Ow: [6.9, 1.2] as At, Hw: [6.2, 0.75] as At, Hv: [7.6, 0.75] as At };
  const partial = [
    { text: 'δ+', at: [4.15, 3.25] as At, tone: 'adj' as const },
    { text: 'δ−', at: [4.25, 1.3] as At, tone: 'bad' as const },
  ];
  return sized(
    el(
      id,
      { C1: 'C', C2: 'C', C3: 'C', H1: 'H', H2: 'H', H3: 'H', H4: 'H', H5: 'H', H6: 'H', O: 'O', Hh: { el: 'H', tone: 'theta' }, Ow: 'O', Hw: { el: 'H', tone: 'theta' }, Hv: 'H' },
      {
        start: {
          at: { ...frame, Hh: [3.7, 5.4], ...water },
          bonds: `${fb} C2=O Ow-Hw Ow-Hv`,
          charges: { Hh: -1 },
          names: [{ text: 'propanone', at: [1.6, 0.9] }, { text: 'hydride ion, H⁻', at: [5.75, 5.4], tone: 'theta' }, ...partial],
        },
        arrows: {
          at: { ...frame, Hh: [3.7, 4.75], ...water },
          bonds: `${fb} C2=O Ow-Hw Ow-Hv`,
          charges: { Hh: -1 },
          names: partial,
          arrows: [
            { from: 'Hh', to: 'C2', bend: 0.5 },
            { from: 'C2=O', to: 'O', bend: 0.6 },
          ],
        },
        added: {
          at: { ...frame, Hh: [3.7, 3.85], ...water },
          bonds: `${fb} C2-O C2-Hh Ow-Hw Ow-Hv`,
          charges: { O: -1 },
          names: [{ text: 'the π pair moves onto the oxygen', at: [3.7, 5.4] }],
        },
        done: {
          at: { ...frame, Hh: [3.7, 3.85], Hw: [4.35, 1.0], Ow: [7.3, 1.2], Hv: [8.0, 0.75] },
          bonds: `${fb} C2-O C2-Hh O-Hw Ow-Hv`,
          charges: { Ow: -1 },
          names: [
            { text: 'propan-2-ol', at: [3.7, 5.4], tone: 'good' },
            { text: 'OH⁻', at: [7.3, 2.1] },
          ],
        },
      },
      'start',
      { go: { phases: [{ dur: 0.6 }, ...go('arrows', 1.6, 1.4), ...go('added', 2, 1), ...go('done', 2.2, 1.2)] } },
      [8.8, 6],
    ),
    height,
  );
};

/**
 * Building a chiral centre (clip `swap`): starting from methane, three of carbon's hydrogen atoms are
 * replaced in turn by CH₃, OH and COOH, until the carbon holds four different groups (lactic acid).
 */
export const chiralCentre = (id: string, height = 420): MoleculesEl => {
  const C: At = [4.2, 2.9];
  const base = { C, Hd: [4.2, 4.0] as At };
  const H = { Hu: [4.2, 1.8] as At, Hl: [3.1, 2.9] as At, Hr: [5.3, 2.9] as At };
  const me = { Cm: [2.9, 2.9] as At, Hm1: [1.9, 2.9] as At, Hm2: [2.9, 1.9] as At, Hm3: [2.9, 3.9] as At };
  const oh = { Oh: [5.4, 2.9] as At, Ho: [6.05, 3.5] as At };
  const acid = { Cc: [4.2, 1.6] as At, Oc: [3.3, 0.95] as At, Od: [5.1, 0.95] as At, Hc: [5.85, 1.35] as At };
  const ny = 5.0;
  const name = (text: string, tone?: 'good') => [{ text, at: [4.2, ny] as At, ...(tone ? { tone } : {}) }];
  return sized(
    el(
      id,
      { C: 'C', Hd: 'H', Hu: 'H', Hl: 'H', Hr: 'H', Cm: 'C', Hm1: 'H', Hm2: 'H', Hm3: 'H', Oh: 'O', Ho: 'H', Cc: 'C', Oc: 'O', Od: 'O', Hc: 'H' },
      {
        s0: { at: { ...base, ...H }, bonds: 'C-Hd C-Hu C-Hl C-Hr', names: name('methane: four identical groups') },
        s1: { at: { ...base, Hu: H.Hu, Hr: H.Hr, ...me }, bonds: 'C-Hd C-Hu C-Hr C-Cm Cm-Hm1 Cm-Hm2 Cm-Hm3', names: name('swap one H for CH₃…') },
        s2: { at: { ...base, Hu: H.Hu, ...me, ...oh }, bonds: 'C-Hd C-Hu C-Cm Cm-Hm1 Cm-Hm2 Cm-Hm3 C-Oh Oh-Ho', names: name('…one for OH…') },
        s3: {
          at: { ...base, ...me, ...oh, ...acid },
          bonds: 'C-Hd C-Cm Cm-Hm1 Cm-Hm2 Cm-Hm3 C-Oh Oh-Ho C-Cc Cc=Oc Cc-Od Od-Hc',
          names: name('…and one for COOH: four different groups, a chiral centre', 'good'),
        },
      },
      's0',
      { swap: { phases: [{ dur: 0.6 }, ...go('s1', 1.8, 0.8), ...go('s2', 1.8, 0.8), ...go('s3', 1.8, 1.4)] } },
      [8.4, 5.6],
    ),
    height,
  );
};

/**
 * Two glycine molecules join by condensation (clip `go`): the OH of one's carboxyl group and an H
 * of the other's amine group (shaded) leave as water, and a peptide link, –CONH–, forms.
 */
export const peptideLink = (id: string, height = 400): MoleculesEl => {
  const gly = (p: string, b: number): Record<string, At> => ({
    [`${p}N`]: [b, 2.6],
    [`${p}Hn1`]: [r3(b - 0.7), 2.0],
    [`${p}Hn2`]: [r3(b - 0.7), 3.2],
    [`${p}Ca`]: [r3(b + 1.2), 2.6],
    [`${p}Hc1`]: [r3(b + 1.2), 1.6],
    [`${p}Hc2`]: [r3(b + 1.2), 3.6],
    [`${p}Cc`]: [r3(b + 2.4), 2.6],
    [`${p}Od`]: [r3(b + 2.4), 1.45],
    [`${p}Oh`]: [r3(b + 3.5), 2.6],
    [`${p}Ho`]: [r3(b + 4.1), 3.15],
  });
  const bonds = (p: string) => `${p}N-${p}Hn1 ${p}N-${p}Ca ${p}Ca-${p}Hc1 ${p}Ca-${p}Hc2 ${p}Ca-${p}Cc ${p}Cc=${p}Od ${p}Cc-${p}Oh ${p}Oh-${p}Ho`;
  const atoms: Record<string, MolAtom> = {};
  for (const p of ['a', 'b']) {
    Object.assign(atoms, { [`${p}N`]: 'N', [`${p}Hn1`]: 'H', [`${p}Hn2`]: 'H', [`${p}Ca`]: 'C', [`${p}Hc1`]: 'H', [`${p}Hc2`]: 'H', [`${p}Cc`]: 'C', [`${p}Od`]: 'O', [`${p}Oh`]: 'O', [`${p}Ho`]: 'H' });
  }
  Object.assign(atoms, { aOh: { el: 'O', tone: 'theta' }, aHo: { el: 'H', tone: 'theta' }, bHn2: { el: 'H', tone: 'theta' } });
  const a = gly('a', 1.0);
  const keep = (g: Record<string, At>, drop: string[]) => Object.fromEntries(Object.entries(g).filter(([k]) => !drop.includes(k)));
  const ny = 5.6;
  const water = (x: number, y: number) => ({ aOh: [x, y] as At, aHo: [r3(x - 0.7), r3(y + 0.55)] as At, bHn2: [r3(x + 0.7), r3(y + 0.55)] as At });
  const b2 = { ...gly('b', 4.5), bHn1: [4.5, 1.55] as At };
  return sized(
    el(
      id,
      atoms,
      {
        apart: { at: { ...a, ...gly('b', 7.6) }, bonds: `${bonds('a')} aN-aHn2 ${bonds('b')} bN-bHn2`, names: [{ text: 'glycine', at: [3.0, ny] }, { text: 'glycine', at: [9.6, ny] }] },
        meet: { at: { ...a, ...gly('b', 6.7) }, bonds: `${bonds('a')} aN-aHn2 ${bonds('b')} bN-bHn2` },
        split: {
          at: { ...keep(a, ['aOh', 'aHo']), ...keep(gly('b', 6.7), ['bHn2']), ...water(5.4, 4.3) },
          bonds: `${bonds('a').replace(' aCc-aOh aOh-aHo', '')} aN-aHn2 ${bonds('b')} aOh-aHo aOh-bHn2`,
          names: [{ text: 'water leaves', at: [5.4, ny], tone: 'theta' }],
        },
        joined: {
          at: { ...keep(a, ['aOh', 'aHo']), ...keep(b2, ['bHn2']), ...water(10.4, 3.9) },
          bonds: `${bonds('a').replace(' aCc-aOh aOh-aHo', '')} aN-aHn2 ${bonds('b')} aCc-bN aOh-aHo aOh-bHn2`,
          names: [
            { text: 'a dipeptide, joined by a peptide link', at: [4.8, ny], tone: 'good' },
            { text: 'water', at: [10.4, ny] },
          ],
        },
      },
      'apart',
      { go: { phases: [{ dur: 0.6 }, ...go('meet', 1.8, 0.4), ...go('split', 2.2, 0.8), ...go('joined', 2.4, 1.2)] } },
      [12.4, 6.2],
    ),
    height,
  );
};
