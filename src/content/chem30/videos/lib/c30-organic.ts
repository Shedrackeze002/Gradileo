import type { MoleculesEl, MolAtom, MolPhase, MolStage } from '@/video/script.ts';

// Organic structures as balls and sticks (src/video/molecules.ts): chains that grow, hydrogens that
// fade to leave a line formula, carbon skeletons that rearrange into isomers, and chains that close
// into rings. A bond that breaks turns red and fades; a bond that forms comes in green.

type At = [number, number];
const r3 = (v: number) => Math.round(v * 1000) / 1000;

/** A move to a stage, then a pause. */
const go = (to: string, dur = 2.6, pause = 0.8): MolPhase[] => [{ dur, to }, { dur: pause }];

const el = (id: string, atoms: Record<string, MolAtom>, stages: Record<string, MolStage>, start: string, clips: Record<string, { phases: MolPhase[] }>, span: [number, number], height: number): MoleculesEl => ({
  kind: 'molecules',
  id,
  atoms,
  stages,
  start,
  clips,
  span,
  poster: Object.keys(clips)[Object.keys(clips).length - 1],
  height,
});

/**
 * A straight-chain alkane with every hydrogen drawn: carbons C1…Cn left to right from `x0` (1.3
 * apart), a hydrogen above (`Ht1`…) and below (`Hb1`…) each, and one at each end (`Hl`, `Hr`).
 */
function alkane(n: number, x0: number, y: number): { at: Record<string, At>; bonds: string } {
  const at: Record<string, At> = {};
  const bonds: string[] = [];
  for (let k = 1; k <= n; k++) {
    const x = r3(x0 + (k - 1) * 1.3);
    at[`C${k}`] = [x, y];
    at[`Ht${k}`] = [x, r3(y - 1)];
    at[`Hb${k}`] = [x, r3(y + 1)];
    bonds.push(`C${k}-Ht${k}`, `C${k}-Hb${k}`);
    if (k > 1) bonds.push(`C${k - 1}-C${k}`);
  }
  at.Hl = [r3(x0 - 1), y];
  at.Hr = [r3(x0 + (n - 1) * 1.3 + 1), y];
  bonds.push('C1-Hl', `C${n}-Hr`);
  return { at, bonds: bonds.join(' ') };
}

const alkaneAtoms = (n: number): Record<string, MolAtom> => {
  const atoms: Record<string, MolAtom> = { Hl: 'H', Hr: 'H' };
  for (let k = 1; k <= n; k++) Object.assign(atoms, { [`C${k}`]: 'C', [`Ht${k}`]: 'H', [`Hb${k}`]: 'H' });
  return atoms;
};

const NAMES = ['', 'methane, CH₄', 'ethane, C₂H₆', 'propane, C₃H₈', 'butane, C₄H₁₀'];

/**
 * An alkane chain growing one carbon at a time, methane to butane (clip `grow`): each step a new
 * carbon with its two hydrogens comes in, and the end hydrogen moves out to the new end, so each
 * step adds CH₂.
 */
export const growingChain = (id: string, height = 400): MoleculesEl => {
  const stages: Record<string, MolStage> = {};
  for (let n = 1; n <= 4; n++) {
    const a = alkane(n, 1.6, 2.4);
    stages[`n${n}`] = { ...a, names: [{ text: NAMES[n], at: [4.0, 4.4] }] };
  }
  return el(id, alkaneAtoms(4), stages, 'n1', { grow: { phases: [{ dur: 0.6 }, ...go('n2', 2.2), ...go('n3', 2.2), ...go('n4', 2.2, 1.2)] } }, [8, 5], height);
};

/**
 * Butane drawn in full, then as a line formula (clip `line`): the hydrogens fade away, leaving the
 * carbon skeleton, which bends into the zigzag of a line formula.
 */
export const toLineFormula = (id: string, height = 400): MoleculesEl => {
  const full = alkane(4, 1.8, 2.4);
  const zig: Record<string, At> = { C1: [1.8, 2.9], C2: [2.95, 2.2], C3: [4.1, 2.9], C4: [5.25, 2.2] };
  return el(
    id,
    alkaneAtoms(4),
    {
      full: { ...full, names: [{ text: 'butane: every atom drawn', at: [3.75, 4.4] }] },
      bare: { at: { C1: full.at.C1, C2: full.at.C2, C3: full.at.C3, C4: full.at.C4 }, bonds: 'C1-C2 C2-C3 C3-C4', names: [{ text: 'leave out the hydrogens…', at: [3.75, 4.4] }] },
      line: { at: zig, bonds: 'C1-C2 C2-C3 C3-C4', names: [{ text: '…and zigzag the chain: a line formula', at: [3.75, 4.4] }] },
    },
    'full',
    { line: { phases: [{ dur: 0.6 }, ...go('bare', 2), ...go('line', 2.2, 1.2)] } },
    [7.5, 5],
    height,
  );
};

/** Ethane loses two hydrogen atoms, and the carbons share a second pair: ethene, unsaturated (clip `go`). */
export const ethaneToEthene = (id: string, height = 400): MoleculesEl => {
  const ethane = alkane(2, 3.2, 2.4);
  return el(
    id,
    { ...alkaneAtoms(2) },
    {
      ethane: { ...ethane, names: [{ text: 'ethane, C₂H₆: saturated, single bonds only', at: [3.85, 4.4] }] },
      ethene: {
        at: { C1: [3.2, 2.4], C2: [4.5, 2.4], Hl: [2.5, 1.7], Hb1: [2.5, 3.1], Hr: [5.2, 1.7], Hb2: [5.2, 3.1], Ht1: [3.45, 0.5], Ht2: [4.25, 0.5] },
        bonds: 'C1=C2 C1-Hl C1-Hb1 C2-Hr C2-Hb2 Ht1-Ht2',
        names: [
          { text: 'ethene, C₂H₄: unsaturated, a double bond', at: [3.85, 4.4] },
          { text: 'H₂', at: [5.0, 0.5] },
        ],
      },
    },
    'ethane',
    { go: { phases: [{ dur: 0.6 }, ...go('ethene', 3, 1.2)] } },
    [7.7, 5],
    height,
  );
};

/** Carbons only: `n` carbon atoms named `C1`… */
const carbons = (n: number): Record<string, MolAtom> => Object.fromEntries(Array.from({ length: n }, (_, k) => [`C${k + 1}`, 'C']));

/** Six carbon atoms join into a chain, then the chain closes into a ring (clips `chain` and `ring`). */
export const chainsAndRings = (id: string, height = 400): MoleculesEl => {
  const loose: Record<string, At> = { C1: [1.2, 1.4], C2: [2.9, 3.6], C3: [4.2, 1.2], C4: [5.6, 3.4], C5: [6.9, 1.5], C6: [8.2, 3.3] };
  const chain: Record<string, At> = { C1: [1.6, 2.8], C2: [2.75, 2.1], C3: [3.9, 2.8], C4: [5.05, 2.1], C5: [6.2, 2.8], C6: [7.35, 2.1] };
  const ring: Record<string, At> = {};
  for (let k = 0; k < 6; k++) {
    const a = ((90 + 60 * k) * Math.PI) / 180;
    ring[`C${k + 1}`] = [r3(4.5 - 1.25 * Math.cos(a)), r3(2.5 - 1.25 * Math.sin(a))];
  }
  return el(
    id,
    carbons(6),
    {
      loose: { at: loose, bonds: '', names: [{ text: 'six carbon atoms', at: [4.7, 4.5] }] },
      chain: { at: chain, bonds: 'C1-C2 C2-C3 C3-C4 C4-C5 C5-C6', names: [{ text: 'a chain', at: [4.5, 4.5] }] },
      ring: { at: ring, bonds: 'C1-C2 C2-C3 C3-C4 C4-C5 C5-C6 C6-C1', names: [{ text: 'a ring', at: [4.5, 4.5] }] },
    },
    'loose',
    { chain: { phases: [{ dur: 0.4 }, ...go('chain', 2.6)] }, ring: { phases: go('ring', 2.6, 1) } },
    [9.4, 5],
    height,
  );
};

/**
 * Carbon skeletons (hydrogens not drawn) that rearrange into isomers. Each step moves one end
 * carbon off its chain (`off`, the old bond breaking red) and then into its new place on the chain
 * (the new bond coming in green), so the same carbons end up in a new arrangement.
 */
interface Skeleton {
  n: number;
  /** The arrangements, in order: each has its carbons' places, its bonds and its name. */
  steps: Array<{ key: string; at: Record<string, At>; bonds: string; name: string; off?: Record<string, At> }>;
}

const skeleton = (id: string, s: Skeleton, span: [number, number], height: number): MoleculesEl => {
  const stages: Record<string, MolStage> = {};
  const phases: MolPhase[] = [{ dur: 0.6 }];
  const clips: Record<string, { phases: MolPhase[] }> = {};
  const nameAt: At = [span[0] / 2, span[1] - 0.5];
  s.steps.forEach((st, i) => {
    stages[st.key] = { at: st.at, bonds: st.bonds, names: [{ text: st.name, at: nameAt, tone: i === 0 ? undefined : 'good' }] };
    if (i === 0) return;
    const prev = s.steps[i - 1];
    if (st.off) {
      // Off the chain: the moving carbons at their `off` places, with only the bonds both shapes share.
      const keep = prev.bonds.split(' ').filter((b) => st.bonds.split(' ').includes(b)).join(' ');
      stages[`${st.key}-off`] = { at: { ...prev.at, ...st.off }, bonds: keep };
      clips[st.key] = { phases: [...go(`${st.key}-off`, 1.6, 0.2), ...go(st.key, 2, 1)] };
    } else clips[st.key] = { phases: go(st.key, 2.6, 1) };
  });
  // The first clip starts with a short pause.
  const first = Object.keys(clips)[0];
  clips[first] = { phases: [...phases, ...clips[first].phases] };
  return el(id, carbons(s.n), stages, s.steps[0].key, clips, span, height);
};

const row = (n: number, x0: number, y: number): Record<string, At> => Object.fromEntries(Array.from({ length: n }, (_, k) => [`C${k + 1}`, [r3(x0 + 1.2 * k), y] as At]));
const chainBonds = (n: number) => Array.from({ length: n - 1 }, (_, k) => `C${k + 1}-C${k + 2}`).join(' ');

/** Butane rearranges into methylpropane (clip `iso`): the end carbon moves to the middle of the chain. */
export const butaneIsomers = (id: string, height = 400): MoleculesEl =>
  skeleton(
    id,
    {
      n: 4,
      steps: [
        { key: 'butane', at: row(4, 2.2, 2.2), bonds: chainBonds(4), name: 'butane, C₄H₁₀: a chain of four' },
        { key: 'iso', at: { ...row(3, 2.2, 2.2), C4: [3.4, 3.4] }, bonds: 'C1-C2 C2-C3 C2-C4', name: 'methylpropane, C₄H₁₀: a chain of three, with a branch', off: { C4: [5.8, 3.4] } },
      ],
    },
    [8.4, 5],
    height,
  );

/** The three isomers of C₅H₁₂ (clips `one` and `two`): pentane, then methylbutane, then dimethylpropane. */
export const pentaneIsomers = (id: string, height = 400): MoleculesEl =>
  skeleton(
    id,
    {
      n: 5,
      steps: [
        { key: 'pentane', at: row(5, 1.8, 2.4), bonds: chainBonds(5), name: 'pentane: a chain of five' },
        { key: 'one', at: { ...row(4, 1.8, 2.4), C5: [3.0, 3.6] }, bonds: 'C1-C2 C2-C3 C3-C4 C2-C5', name: 'methylbutane: a chain of four, one branch', off: { C5: [6.6, 3.6] } },
        { key: 'two', at: { ...row(3, 1.8, 2.4), C5: [3.0, 3.6], C4: [3.0, 1.2] }, bonds: 'C1-C2 C2-C3 C2-C5 C2-C4', name: 'dimethylpropane: a chain of three, two branches', off: { C4: [5.4, 1.2] } },
      ],
    },
    [8.6, 5.4],
    height,
  );

/** Hexane loses carbons from its main chain into branches (clips `one` and `two`): methylpentane, then dimethylbutane. */
export const hexaneIsomers = (id: string, height = 400): MoleculesEl =>
  skeleton(
    id,
    {
      n: 6,
      steps: [
        { key: 'hexane', at: row(6, 1.6, 2.4), bonds: chainBonds(6), name: 'hexane: a chain of six' },
        { key: 'one', at: { ...row(5, 1.6, 2.4), C6: [2.8, 3.6] }, bonds: 'C1-C2 C2-C3 C3-C4 C4-C5 C2-C6', name: '2-methylpentane: a chain of five', off: { C6: [7.6, 3.6] } },
        { key: 'two', at: { ...row(4, 1.6, 2.4), C6: [2.8, 3.6], C5: [4.0, 3.6] }, bonds: 'C1-C2 C2-C3 C3-C4 C2-C6 C3-C5', name: '2,3-dimethylbutane: a chain of four', off: { C5: [6.4, 3.6] } },
      ],
    },
    [9.2, 5.4],
    height,
  );

/**
 * Pentane bent into a new shape, with no bond broken (clip `bend`): still pentane. Then a carbon
 * moves to a new place, breaking one bond and making another (clip `iso`): an isomer.
 */
export const bendOrIsomer = (id: string, height = 400): MoleculesEl => {
  const straight = row(5, 1.8, 2.4);
  const bent: Record<string, At> = { C1: [1.8, 3.4], C2: [2.8, 2.7], C3: [4.0, 2.7], C4: [5.0, 1.9], C5: [6.2, 1.9] };
  return el(
    id,
    carbons(5),
    {
      straight: { at: straight, bonds: chainBonds(5), names: [{ text: 'pentane', at: [4.2, 4.8] }] },
      bent: { at: bent, bonds: chainBonds(5), names: [{ text: 'bent, no bond broken: still pentane', at: [4.2, 4.8] }] },
      off: { at: { ...bent, C5: [6.2, 3.9] }, bonds: 'C1-C2 C2-C3 C3-C4' },
      iso: { at: { ...bent, C5: [4.0, 3.9] }, bonds: 'C1-C2 C2-C3 C3-C4 C3-C5', names: [{ text: 'a bond broken and a new one made: an isomer', at: [4.2, 4.8], tone: 'good' }] },
    },
    'straight',
    { bend: { phases: [{ dur: 0.6 }, ...go('bent', 2.4, 1)] }, iso: { phases: [...go('off', 1.6, 0.2), ...go('iso', 2.2, 1)] } },
    [8.4, 5.4],
    height,
  );
};

/**
 * A functional group in place of a hydrogen atom: ethane (clip `oh`) becomes ethanol, the end
 * hydrogen replaced by a hydroxyl group, and then (clip `cl`) chloroethane, with a chlorine atom
 * in its place.
 */
export const swapGroups = (id: string, height = 400): MoleculesEl => {
  const ethane = alkane(2, 3.0, 2.4);
  const rest = Object.fromEntries(Object.entries(ethane.at).filter(([k]) => k !== 'Hr'));
  const restBonds = ethane.bonds.replace(' C2-Hr', '');
  const y = 4.4;
  return el(
    id,
    { ...alkaneAtoms(2), O: 'O', Ho: 'H', Cl: 'Cl' },
    {
      ethane: { ...ethane, names: [{ text: 'ethane: an alkane', at: [4.2, y] }] },
      ethanol: { at: { ...rest, O: [5.55, 2.4], Ho: [6.3, 1.75] }, bonds: `${restBonds} C2-O O-Ho`, names: [{ text: 'ethanol: a hydroxyl group, so an alcohol', at: [4.4, y], tone: 'good' }] },
      chloro: { at: { ...rest, Cl: [5.7, 2.4] }, bonds: `${restBonds} C2-Cl`, names: [{ text: 'chloroethane: a halogen atom, so a haloalkane', at: [4.4, y], tone: 'good' }] },
    },
    'ethane',
    { oh: { phases: [{ dur: 0.6 }, ...go('ethanol', 2.4, 1)] }, cl: { phases: go('chloro', 2.4, 1) } },
    [8.8, 5],
    height,
  );
};

/** The hydroxyl group moves from the end carbon to the middle one (clip `move`): propan-1-ol becomes propan-2-ol. */
export const movingGroup = (id: string, height = 400): MoleculesEl => {
  const propane = alkane(3, 2.2, 2.2);
  const at = { ...propane.at };
  delete (at as Record<string, At>).Hr;
  const y = 4.9;
  const base = propane.bonds.replace(' C3-Hr', '');
  const noHb2 = Object.fromEntries(Object.entries(at).filter(([k]) => k !== 'Hb2'));
  return el(
    id,
    { ...alkaneAtoms(3), O: 'O', Ho: 'H' },
    {
      one: { at: { ...at, O: [6.05, 2.2], Ho: [6.8, 1.55] }, bonds: `${base} C3-O O-Ho`, names: [{ text: 'propan-1-ol: the OH on carbon 1', at: [4.3, y] }] },
      off: { at: { ...noHb2, Hr: propane.at.Hr, O: [6.05, 3.9], Ho: [6.8, 4.5] }, bonds: `${base.replace(' C2-Hb2', '')} C3-Hr O-Ho` },
      two: { at: { ...noHb2, Hr: propane.at.Hr, O: [3.5, 3.45], Ho: [4.2, 4.05] }, bonds: `${base.replace(' C2-Hb2', '')} C3-Hr C2-O O-Ho`, names: [{ text: 'propan-2-ol: the OH on carbon 2', at: [4.3, y], tone: 'good' }] },
    },
    'one',
    { move: { phases: [{ dur: 0.6 }, ...go('off', 1.6, 0.2), ...go('two', 2, 1)] } },
    [8.4, 5.6],
    height,
  );
};

/**
 * Sodium hydroxide and ethanol in water (clip `water`): the sodium hydroxide comes apart into a
 * sodium ion and a hydroxide ion, while ethanol's OH group stays bonded to its carbon atom.
 */
export const notAHydroxide = (id: string, height = 400): MoleculesEl => {
  const ethane = alkane(2, 6.3, 2.4);
  const eth = { ...Object.fromEntries(Object.entries(ethane.at).filter(([k]) => k !== 'Hr')), O: [8.85, 2.4] as At, Ho: [9.6, 1.75] as At };
  const ethBonds = `${ethane.bonds.replace(' C2-Hr', '')} C2-O O-Ho`;
  const y = 4.4;
  return el(
    id,
    { ...alkaneAtoms(2), O: 'O', Ho: 'H', Na: { el: 'Na', tone: 'hyp' }, Ob: 'O', Hb: 'H' },
    {
      solid: {
        at: { ...eth, Na: [1.1, 2.4], Ob: [2.6, 2.4], Hb: [3.35, 1.75] },
        bonds: `${ethBonds} Ob-Hb`,
        charges: { Na: 1, Ob: -1 },
        names: [
          { text: 'sodium hydroxide, NaOH', at: [2.2, y] },
          { text: 'ethanol, C₂H₅OH', at: [7.6, y] },
        ],
      },
      water: {
        at: { ...eth, Na: [1.0, 1.2], Ob: [3.0, 3.0], Hb: [3.75, 2.35] },
        bonds: `${ethBonds} Ob-Hb`,
        charges: { Na: 1, Ob: -1 },
        names: [
          { text: 'ions come apart: OH⁻ set free', at: [2.2, y], tone: 'good' },
          { text: 'the OH stays bonded: no OH⁻', at: [7.6, y], tone: 'opp' },
        ],
      },
    },
    'solid',
    { water: { phases: [{ dur: 0.6 }, ...go('water', 2.6, 1)] } },
    [10.4, 5],
    height,
  );
};

const shift = (at: Record<string, At>, dx: number, dy = 0): Record<string, At> => Object.fromEntries(Object.entries(at).map(([k, [x, y]]) => [k, [r3(x + dx), r3(y + dy)] as At]));

/**
 * Esterification with every atom drawn (clip `go`): a carboxylic acid with `n` carbons and an
 * alcohol with `m` carbons (or, with `chloride`, an acyl chloride, which loses HCl instead of
 * water). The alcohol comes up to the acid, the acid's OH and the alcohol's H
 * (shaded) leave together as water, and the acid's carbon bonds to the alcohol's oxygen.
 */
export const esterification = (id: string, o: { n: number; m: number; acid: string; alcohol: string; ester: string; height?: number; chloride?: boolean }): MoleculesEl => {
  const { n, m } = o;
  // An acyl chloride (`chloride`) loses its Cl instead of an OH, so hydrogen chloride leaves, not water.
  const cl = !!o.chloride;
  const y = 2.4;
  const x0 = 1.2;
  const acid: Record<string, At> = { Al: [r3(x0 - 1), y] };
  const atoms: Record<string, MolAtom> = { Al: 'H', Cb: 'C', Od: 'O', Oa: { el: cl ? 'Cl' : 'O', tone: 'theta' }, ...(cl ? {} : { Hx: { el: 'H', tone: 'theta' } as MolAtom }), Ob: 'O', Hy: { el: 'H', tone: 'theta' }, Mr: 'H' };
  const acidBonds: string[] = [];
  for (let k = 1; k < n; k++) {
    const x = r3(x0 + (k - 1) * 1.3);
    Object.assign(acid, { [`A${k}`]: [x, y], [`At${k}`]: [x, y - 1], [`Ab${k}`]: [x, y + 1] });
    Object.assign(atoms, { [`A${k}`]: 'C', [`At${k}`]: 'H', [`Ab${k}`]: 'H' });
    acidBonds.push(`A${k}-At${k}`, `A${k}-Ab${k}`, k > 1 ? `A${k - 1}-A${k}` : `Al-A${k}`);
  }
  const cb = r3(x0 + (n - 1) * 1.3);
  acidBonds.push(n > 1 ? `A${n - 1}-Cb` : 'Al-Cb', 'Cb=Od');
  Object.assign(acid, { Cb: [cb, y], Od: [cb, 1.25] });
  const oa = r3(cb + 1.15);
  const oh: Record<string, At> = cl ? { Oa: [r3(oa + 0.1), y] } : { Oa: [oa, y], Hx: [r3(oa + 0.7), 3.0] };
  const leave = cl ? 'Cb-Oa' : 'Cb-Oa Oa-Hx';
  const small = cl ? 'Oa-Hy' : 'Oa-Hx Oa-Hy';
  const lost = (x: number, wy: number): Record<string, At> => (cl ? { Oa: [r3(x - 0.5), wy], Hy: [r3(x + 0.5), wy] } : { Oa: [x, wy], Hx: [r3(x - 0.7), r3(wy + 0.55)], Hy: [r3(x + 0.7), r3(wy + 0.55)] });
  // The alcohol, with its oxygen at x = 0.
  const alc: Record<string, At> = { Ob: [0, y], Hy: [0, 3.15] };
  const alcBonds: string[] = ['Ob-M1'];
  for (let k = 1; k <= m; k++) {
    const x = r3(k * 1.3);
    Object.assign(alc, { [`M${k}`]: [x, y], [`Mt${k}`]: [x, y - 1], [`Mb${k}`]: [x, y + 1] });
    Object.assign(atoms, { [`M${k}`]: 'C', [`Mt${k}`]: 'H', [`Mb${k}`]: 'H' });
    alcBonds.push(`M${k}-Mt${k}`, `M${k}-Mb${k}`);
    if (k > 1) alcBonds.push(`M${k - 1}-M${k}`);
  }
  alc.Mr = [r3(m * 1.3 + 1), y];
  alcBonds.push(`M${m}-Mr`);
  const ny = 5.6;
  const acidMid = r3((x0 - 1 + oa + 0.7) / 2);
  const apartAlc = shift(alc, oa + 3.4);
  const meetAlc = shift(alc, oa + 1.8);
  const esterAlc = shift(alc, oa);
  const wx = r3(oa + m * 1.3 + 2.4);
  const width = r3(oa + 3.4 + m * 1.3 + 1.8);
  const A = acidBonds.join(' ');
  const B = alcBonds.join(' ');
  return el(
    id,
    atoms,
    {
      apart: {
        at: { ...acid, ...oh, ...apartAlc },
        bonds: `${A} ${leave} Ob-Hy ${B}`,
        names: [
          { text: o.acid, at: [acidMid, ny] },
          { text: o.alcohol, at: [r3(oa + 3.4 + (m * 1.3 + 1) / 2), ny] },
        ],
      },
      meet: { at: { ...acid, ...oh, ...meetAlc }, bonds: `${A} ${leave} Ob-Hy ${B}` },
      split: {
        at: { ...acid, ...meetAlc, ...(cl ? lost(r3(oa + 0.9), 4.4) : lost(r3(oa + 0.9), 4.25)) },
        bonds: `${A} ${small} ${B}`,
        names: [{ text: cl ? 'the Cl and the alcohol’s H leave as HCl' : 'the acid’s OH and the alcohol’s H leave as water', at: [r3(width / 2), ny], tone: 'theta' }],
      },
      ester: {
        at: { ...acid, ...esterAlc, ...lost(wx, cl ? 4.0 : 3.7) },
        bonds: `${A} Cb-Ob ${small} ${B}`,
        names: [
          { text: o.ester, at: [r3((x0 - 1 + oa + m * 1.3 + 1) / 2), ny], tone: 'good' },
          { text: cl ? 'hydrogen chloride' : 'water', at: [wx, ny] },
        ],
      },
    },
    'apart',
    { go: { phases: [{ dur: 0.6 }, ...go('meet', 2, 0.6), ...go('split', 2.4, 0.8), ...go('ester', 2.4, 1.2)] } },
    [width, 6.2],
    o.height ?? 400,
  );
};

/**
 * Three ethene molecules become a piece of poly(ethene) (clip `go`): each double bond opens, then
 * the carbons link to their neighbours, and no other product forms.
 */
export const ethenePolymer = (id: string, height = 400): MoleculesEl => {
  const atoms: Record<string, MolAtom> = {};
  const mono: Record<string, At> = {};
  const chain: Record<string, At> = {};
  const dbl: string[] = [];
  const sgl: string[] = [];
  const links: string[] = [];
  for (let k = 1; k <= 3; k++) {
    const cx = 1.9 + (k - 1) * 3.4;
    const [a, b] = [`C${k}a`, `C${k}b`];
    Object.assign(atoms, { [a]: 'C', [b]: 'C', [`H${k}1`]: 'H', [`H${k}2`]: 'H', [`H${k}3`]: 'H', [`H${k}4`]: 'H' });
    Object.assign(mono, { [a]: [r3(cx - 0.65), 2.4], [b]: [r3(cx + 0.65), 2.4], [`H${k}1`]: [r3(cx - 1.15), 1.55], [`H${k}2`]: [r3(cx - 1.15), 3.25], [`H${k}3`]: [r3(cx + 1.15), 1.55], [`H${k}4`]: [r3(cx + 1.15), 3.25] });
    const xa = r3(2.05 + (2 * k - 2) * 1.3);
    const xb = r3(xa + 1.3);
    Object.assign(chain, { [a]: [xa, 2.4], [b]: [xb, 2.4], [`H${k}1`]: [xa, 1.4], [`H${k}2`]: [xa, 3.4], [`H${k}3`]: [xb, 1.4], [`H${k}4`]: [xb, 3.4] });
    const hs = `${a}-H${k}1 ${a}-H${k}2 ${b}-H${k}3 ${b}-H${k}4`;
    dbl.push(`${a}=${b} ${hs}`);
    sgl.push(`${a}-${b} ${hs}`);
    if (k > 1) links.push(`C${k - 1}b-${a}`);
  }
  const ny = 4.6;
  return el(
    id,
    atoms,
    {
      mono: { at: mono, bonds: dbl.join(' '), names: [{ text: 'three ethene molecules, each with a C=C double bond', at: [5.3, ny] }] },
      open: { at: mono, bonds: sgl.join(' '), names: [{ text: 'each double bond opens…', at: [5.3, ny] }] },
      chain: {
        at: chain,
        bonds: `${sgl.join(' ')} ${links.join(' ')}`,
        names: [
          { text: '…and the carbons link up: poly(ethene), and nothing else forms', at: [5.3, ny], tone: 'good' },
          { text: '⋯', at: [1.2, 2.4] },
          { text: '⋯', at: [9.4, 2.4] },
        ],
      },
    },
    'mono',
    { go: { phases: [{ dur: 0.6 }, ...go('open', 1.6, 0.8), ...go('chain', 2.6, 1.2)] } },
    [10.6, 5.2],
    height,
  );
};

/**
 * A diol, a dicarboxylic acid and another diol join into a piece of polyester (clip `go`): at each
 * link the acid's OH and the diol's H (shaded) leave as water, then the monomers close up and an
 * ester link forms. R stands for the rest of each monomer.
 */
export const polyesterChain = (id: string, height = 400): MoleculesEl => {
  const y = 2.6;
  const leave = (e: string): MolAtom => ({ el: e, tone: 'theta' });
  const atoms: Record<string, MolAtom> = {
    Ha: 'H', Oa: 'O', R1: { el: 'R', tone: 'good' }, Ob: 'O', Hb: leave('H'),
    Oc: leave('O'), Hc: leave('H'), Cc: 'C', Ec: 'O', RA: { el: 'R', tone: 'hyp' }, Cd: 'C', Ed: 'O', Od: leave('O'), Hd: leave('H'),
    He: leave('H'), Oe: 'O', R2: { el: 'R', tone: 'good' }, Of: 'O', Hf: 'H',
  };
  const diol1: Record<string, At> = { Ha: [0.6, 3.25], Oa: [1.1, y], R1: [2.2, y], Ob: [3.3, y] };
  const acid: Record<string, At> = { Cc: [6.4, y], Ec: [6.4, 1.5], RA: [7.5, y], Cd: [8.6, y], Ed: [8.6, 1.5] };
  const diol2: Record<string, At> = { Oe: [11.7, y], R2: [12.8, y], Of: [13.9, y], Hf: [14.4, 3.25] };
  const inner = 'Ha-Oa Oa-R1 R1-Ob Cc=Ec Cc-RA RA-Cd Cd=Ed Oe-R2 R2-Of Of-Hf';
  const ends = { Hb: [3.8, 3.25] as At, Oc: [5.4, y] as At, Hc: [4.9, 3.25] as At, Od: [9.6, y] as At, Hd: [10.1, 3.25] as At, He: [11.2, 3.25] as At };
  const w1 = (x: number, wy: number) => ({ Oc: [x, wy] as At, Hb: [r3(x - 0.7), r3(wy + 0.55)] as At, Hc: [r3(x + 0.7), r3(wy + 0.55)] as At });
  const w2 = (x: number, wy: number) => ({ Od: [x, wy] as At, Hd: [r3(x - 0.7), r3(wy + 0.55)] as At, He: [r3(x + 0.7), r3(wy + 0.55)] as At });
  const water = 'Oc-Hb Oc-Hc Od-Hd Od-He';
  const ny = 5.9;
  return el(
    id,
    atoms,
    {
      apart: {
        at: { ...diol1, ...acid, ...diol2, ...ends },
        bonds: `${inner} Ob-Hb Oc-Hc Cc-Oc Cd-Od Od-Hd He-Oe`,
        names: [
          { text: 'a diol', at: [2.2, ny] },
          { text: 'a dicarboxylic acid', at: [7.5, ny] },
          { text: 'a diol', at: [12.8, ny] },
        ],
      },
      split: {
        at: { ...diol1, ...acid, ...diol2, ...w1(4.35, 4.3), ...w2(10.65, 4.3) },
        bonds: `${inner} ${water}`,
        names: [{ text: 'water leaves at each link', at: [7.5, ny], tone: 'theta' }],
      },
      chain: {
        at: { ...diol1, ...shift(acid, -2.1), ...shift(diol2, -4.2), ...w1(4.9, 4.3), ...w2(8.1, 4.3) },
        bonds: `${inner} Ob-Cc Cd-Oe ${water}`,
        names: [{ text: 'ester links join the monomers: a polyester', at: [5.4, ny], tone: 'good' }],
      },
    },
    'apart',
    { go: { phases: [{ dur: 0.6 }, ...go('split', 2.6, 0.8), ...go('chain', 2.6, 1.2)] } },
    [15, 6.5],
    height,
  );
};

/**
 * Hexane cracked into butane and ethene, every atom drawn (clip `crack`): the bond between carbons
 * 4 and 5 breaks, a hydrogen atom moves from carbon 6 to carbon 4, and carbons 5 and 6 share a
 * second pair. No atom is lost.
 */
export const cracking = (id: string, height = 400): MoleculesEl => {
  const hex = alkane(6, 1.2, 2.4);
  const atoms = alkaneAtoms(6);
  const left = ['C1', 'C2', 'C3', 'C4', 'Hl', 'Ht1', 'Hb1', 'Ht2', 'Hb2', 'Ht3', 'Hb3', 'Ht4', 'Hb4'];
  const pick = (keys: string[], dx: number) => Object.fromEntries(keys.map((k) => [k, [r3(hex.at[k][0] + dx), hex.at[k][1]] as At]));
  const butBonds = 'Hl-C1 C1-Ht1 C1-Hb1 C1-C2 C2-Ht2 C2-Hb2 C2-C3 C3-Ht3 C3-Hb3 C3-C4 C4-Ht4 C4-Hb4';
  const ny = 4.9;
  return el(
    id,
    atoms,
    {
      hexane: { ...hex, names: [{ text: 'hexane, C₆H₁₄', at: [4.45, ny] }] },
      off: {
        at: { ...pick(left, -0.1), C5: [6.9, 2.4], Ht5: [6.9, 1.4], Hb5: [6.9, 3.4], C6: [8.2, 2.4], Ht6: [8.2, 1.4], Hr: [9.2, 2.4], Hb6: [7.0, 4.3] },
        bonds: `${butBonds} C5-Ht5 C5-Hb5 C5-C6 C6-Ht6 C6-Hr`,
        names: [{ text: 'heat breaks a C–C bond…', at: [4.45, ny] }],
      },
      after: {
        at: { ...pick(left, -0.1), Hb6: [6.0, 2.4], C5: [7.75, 2.4], C6: [9.05, 2.4], Ht5: [7.25, 1.55], Hb5: [7.25, 3.25], Ht6: [9.55, 1.55], Hr: [9.55, 3.25] },
        bonds: `${butBonds} C4-Hb6 C5=C6 C5-Ht5 C5-Hb5 C6-Ht6 C6-Hr`,
        names: [
          { text: 'butane, C₄H₁₀', at: [3.05, ny] },
          { text: 'ethene, C₂H₄', at: [8.4, ny], tone: 'good' },
        ],
      },
    },
    'hexane',
    { crack: { phases: [{ dur: 0.6 }, ...go('off', 2, 0.6), ...go('after', 2.4, 1.2)] } },
    [10.4, 5.4],
    height,
  );
};

/**
 * Methane burning in plenty of oxygen (clip `burn`): every bond breaks, the carbon atom ends up in
 * carbon dioxide and the four hydrogen atoms in two water molecules.
 */
export const methaneBurning = (id: string, height = 400): MoleculesEl =>
  el(
    id,
    { C: 'C', H1: 'H', H2: 'H', H3: 'H', H4: 'H', O1: 'O', O2: 'O', O3: 'O', O4: 'O' },
    {
      before: {
        at: { C: [4.0, 2.7], H1: [4.0, 1.7], H2: [4.0, 3.7], H3: [3.0, 2.7], H4: [5.0, 2.7], O1: [1.4, 2.0], O2: [1.4, 3.4], O3: [6.6, 2.0], O4: [6.6, 3.4] },
        bonds: 'C-H1 C-H2 C-H3 C-H4 O1=O2 O3=O4',
        names: [
          { text: 'O₂', at: [1.4, 4.5] },
          { text: 'methane, CH₄', at: [4.0, 4.5] },
          { text: 'O₂', at: [6.6, 4.5] },
        ],
      },
      after: {
        at: { C: [4.0, 2.7], O2: [2.8, 2.7], O3: [5.2, 2.7], O1: [1.7, 1.3], H3: [1.0, 1.85], H1: [2.4, 1.85], O4: [6.3, 4.1], H2: [5.6, 4.65], H4: [7.0, 4.65] },
        bonds: 'O2=C C=O3 O1-H3 O1-H1 O4-H2 O4-H4',
        names: [
          { text: 'carbon dioxide', at: [4.0, 3.6], tone: 'good' },
          { text: 'water', at: [1.7, 0.4], tone: 'theta' },
          { text: 'water', at: [6.3, 5.6], tone: 'theta' },
        ],
      },
    },
    'before',
    { burn: { phases: [{ dur: 0.6 }, ...go('after', 3, 1.4)] } },
    [8, 6.1],
    height,
  );

/**
 * A sulfur atom from an impurity in a fuel burns to sulfur dioxide (clip `burn`), which then reacts
 * with water in the air to make sulfurous acid, H₂SO₃ (clip `rain`).
 */
export const sulfurToAcid = (id: string, height = 400): MoleculesEl =>
  el(
    id,
    { S: { el: 'S', tone: 'opp' }, O1: 'O', O2: 'O', Ow: 'O', H1: 'H', H2: 'H' },
    {
      fuel: {
        at: { S: [1.6, 2.6], O1: [4.4, 2.0], O2: [4.4, 3.4], Ow: [8.0, 2.6], H1: [7.3, 3.2], H2: [8.7, 3.2] },
        bonds: 'O1=O2 Ow-H1 Ow-H2',
        names: [
          { text: 'sulfur, in the fuel', at: [1.6, 4.6] },
          { text: 'O₂', at: [4.4, 4.6] },
          { text: 'water in the air', at: [8.0, 4.6] },
        ],
      },
      so2: {
        at: { S: [3.6, 2.6], O1: [2.7, 1.9], O2: [4.5, 1.9], Ow: [8.0, 2.6], H1: [7.3, 3.2], H2: [8.7, 3.2] },
        bonds: 'S=O1 S=O2 Ow-H1 Ow-H2',
        names: [
          { text: 'sulfur dioxide, SO₂', at: [3.6, 4.6], tone: 'opp' },
          { text: 'water in the air', at: [8.0, 4.6] },
        ],
      },
      acid: {
        at: { S: [5.0, 2.4], O1: [3.9, 1.8], O2: [5.6, 3.5], H1: [6.4, 3.9], Ow: [6.1, 1.9], H2: [6.9, 1.5] },
        bonds: 'S=O1 S-O2 O2-H1 S-Ow Ow-H2',
        names: [{ text: 'sulfurous acid, H₂SO₃: acid rain', at: [5.0, 4.6], tone: 'bad' }],
      },
    },
    'fuel',
    { burn: { phases: [{ dur: 0.6 }, ...go('so2', 2.4, 1)] }, rain: { phases: go('acid', 2.6, 1.2) } },
    [10, 5.2],
    height,
  );
