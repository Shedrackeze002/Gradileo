/**
 * Grade 12 Chemistry, Unit 3, lessons 3.1 to 3.4: organic compounds and how they are drawn, naming
 * hydrocarbons, isomers, and functional groups. Every name, condensed formula, line formula and
 * molecular formula comes from one skeleton (engine/chem/organic.ts), so they always agree.
 */
import { fixedChoice, mc, multi, numPart, part, skill, type GenOutput } from '../../helpers.ts';
import { molarMass } from '../../../chem/formula.ts';
import {
  STEMS, canonical, condensed, depictions, familyOf, hydrocarbonIsomers as findIsomers, hydrogens, isAlkyl, isProper, molecularFormula, nameAsWritten, nameOf, nameParts, numbered,
  type Family, type Halo, type NameParts, type Prefix, type Skeleton,
} from '../../../chem/organic.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, Part, PlaneFigure, SkillDef } from '../../../types.ts';
import { lineFormula, ringFormula, type RingKind } from './organic-draw.ts';

const L = (n: number) => `c30-3-${n}`;
const cap = (s: string) => s[0].toUpperCase() + s.slice(1);
const ceMd = (s: string) => `$\\ce{${s}}$`;
/** A condensed formula in maths, carbon 1 where the IUPAC numbering puts it, or written the other way round. */
const cf = (sk: Skeleton, reverse = false) => ceMd(condensed(sk, { reverse }));
const nm = (sk: Skeleton) => nameOf(sk).name;
const namePart = (sk: Skeleton, label?: string): Part => part({ kind: 'text', accepted: nameOf(sk).accepted }, { placeholder: 'IUPAC name', ...(label && { label }) });
const formulaPart = (f: string): Part => part({ kind: 'formula', expected: f }, { placeholder: 'Molecular formula' });
const TYPE_TIP = 'Type the name with its hyphens and commas, as in 2,3-dimethylpentane or but-2-ene.';
/** "a, b and c" */
const andList = (xs: string[]) => (xs.length <= 1 ? xs.join('') : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`);
const NUMBER_WORDS = ['', 'one', 'two', 'three', 'four'];

/** A skeleton from `make` that is on its parent chain (so it is named as written). */
function proper(make: () => Skeleton): Skeleton {
  for (let i = 0; i < 400; i++) {
    const sk = make();
    if (isProper(sk)) return sk;
  }
  throw new Error('No proper skeleton found.');
}

/** Alkyl branches (methyl, or methyl and ethyl) on inner carbons of a chain, with an optional multiple bond. */
function branched(rng: Rng, chain: [number, number], nSubs: [number, number], opts: { ethyl?: boolean; bond?: 2 | 3 } = {}): Skeleton {
  return proper(() => {
    const n = rng.int(chain[0], chain[1]);
    const k = rng.int(nSubs[0], nSubs[1]);
    const subs = Array.from({ length: k }, () => ({ at: rng.int(2, Math.max(2, n - 1)), prefix: (opts.ethyl && rng.chance(0.35) ? 'ethyl' : 'methyl') as Prefix }));
    return { chain: n, subs, ...(opts.bond && { bond: { at: rng.int(1, n - 1), order: opts.bond } }) };
  });
}

/** Whether carbon 1 of the IUPAC numbering is at the left of the condensed formula as shown. */
function c1AtLeft(sk: Skeleton, reverse: boolean): boolean {
  const c = numbered(canonical(sk) ?? sk);
  return condensed(c, { asWritten: true }) === condensed(sk, { reverse });
}

const PREFIX_WORD: Record<string, string> = { methyl: 'methyl group', ethyl: 'ethyl group', propyl: 'propyl group', fluoro: 'fluorine atom', chloro: 'chlorine atom', bromo: 'bromine atom', iodo: 'iodine atom', methoxy: 'methoxy group', ethoxy: 'ethoxy group' };
/** "a methyl group on carbon 2 and two chlorine atoms on carbons 1 and 3" */
function describeSubs(p: NameParts): string {
  return andList(
    p.prefixes.map((x) => {
      const k = x.locants.length;
      const where = k > 1 && new Set(x.locants).size === 1 ? `${k === 2 ? 'both' : 'all'} on carbon ${x.locants[0]}` : `on carbon${k === 1 ? '' : 's'} ${andList(x.locants.map(String))}`;
      return `${k === 1 ? (/^[aeiou]/.test(PREFIX_WORD[x.prefix]) ? 'an' : 'a') : NUMBER_WORDS[k] ?? k} ${PREFIX_WORD[x.prefix]}${k === 1 ? '' : 's'}${k > 1 && new Set(x.locants).size === 1 ? ',' : ''} ${where}`;
    }),
  );
}

/** The steps of naming a compound shown as a condensed formula, carbon 1 at the left or the right. */
function namingSteps(sk: Skeleton, left: boolean): string[] {
  const c = canonical(sk)!;
  const p = nameParts(c);
  const stem = STEMS[p.chain];
  const end = left ? 'left' : 'right';
  const kind = p.group?.kind;
  const steps: string[] = [];
  if (kind === 'acid' || kind === 'aldehyde' || kind === 'ester') {
    const what = kind === 'acid' ? 'the carbon of the $\\ce{-COOH}$ group' : kind === 'aldehyde' ? 'the carbon of the $\\ce{-CHO}$ group' : 'the carbon of the $\\ce{C=O}$ in $\\ce{-COO-{}}$';
    steps.push(`The chain includes ${what}, which is carbon 1: ${p.chain} carbon${p.chain === 1 ? '' : 's'}, so the stem is ${stem}-.`);
  } else if (p.bond) {
    steps.push(`The longest chain holding the ${p.bond.order === 2 ? 'double' : 'triple'} bond has ${p.chain} carbons: the stem is ${stem}-, with the ending -${p.bond.order === 2 ? 'ene' : 'yne'}.`);
    if (p.chain > 3) steps.push(`Number from the ${end} end, nearer the ${p.bond.order === 2 ? 'double' : 'triple'} bond: it starts at carbon ${p.bond.locant}, so the parent is ${stem}-${p.bond.locant}-${p.bond.order === 2 ? 'ene' : 'yne'}.`);
  } else if (kind === 'alcohol' || kind === 'amine' || kind === 'ketone') {
    const g = kind === 'alcohol' ? '$\\ce{-OH}$ group' : kind === 'amine' ? '$\\ce{-NH2}$ group' : '$\\ce{C=O}$ group';
    steps.push(`The longest chain holding the carbon with the ${g} has ${p.chain} carbon${p.chain === 1 ? '' : 's'}: the stem is ${stem}-.`);
    if (p.chain > 2) steps.push(`Number from the ${end} end, nearer the ${g}: it is on carbon ${p.group!.locant}.`);
  } else {
    steps.push(`The longest chain has ${p.chain} carbon${p.chain === 1 ? '' : 's'}: the parent is ${stem}ane.`);
  }
  if (p.prefixes.length) {
    const numberedHere = !(kind === 'acid' || kind === 'aldehyde' || kind === 'ester' || p.bond || kind === 'alcohol' || kind === 'amine' || kind === 'ketone');
    if (numberedHere && p.chain > 2) steps.push(`Number from the ${end} end, nearer the first substituent, so the locants are as low as possible.`);
    steps.push(`Substituents: ${describeSubs(p)}.${p.prefixes.length > 1 ? ' The prefixes go in alphabetical order, ignoring di-, tri- and tetra-.' : ''}`);
  }
  steps.push(`Name: **${nm(c)}**.`);
  return steps;
}

// ---------------------------------------------------------------------------- lesson 3.1: organic compounds and their formulas

const ORGANIC: Array<[string, string]> = [
  ['methane', 'CH4'], ['ethanol', 'C2H5OH'], ['glucose', 'C6H12O6'], ['propane', 'C3H8'], ['ethanoic acid', 'CH3COOH'], ['octane', 'C8H18'],
  ['sucrose', 'C12H22O11'], ['chloromethane', 'CH3Cl'], ['benzene', 'C6H6'], ['ethene', 'C2H4'], ['methanol', 'CH3OH'], ['propanone', 'CH3COCH3'],
];
const INORGANIC_C: Array<[string, string]> = [
  ['carbon dioxide', 'CO2'], ['carbon monoxide', 'CO'], ['calcium carbonate', 'CaCO3'], ['sodium hydrogen carbonate', 'NaHCO3'],
  ['potassium cyanide', 'KCN'], ['calcium carbide', 'CaC2'], ['sodium carbonate', 'Na2CO3'],
];
const INORGANIC: Array<[string, string]> = [['sodium chloride', 'NaCl'], ['water', 'H2O'], ['ammonia', 'NH3'], ['sulfuric acid', 'H2SO4'], ['magnesium oxide', 'MgO'], ['potassium nitrate', 'KNO3']];
const compound = ([name, f]: [string, string]) => `${cap(name)}, ${ceMd(f)}`;
const ORGANIC_RULE = 'Organic compounds contain carbon, nearly always bonded to hydrogen. A few carbon compounds are classed as inorganic: the oxides of carbon, carbonates and hydrogen carbonates, cyanides and carbides.';

type Hc = 'alkane' | 'alkene' | 'alkyne' | 'cycloalkane' | 'cycloalkene' | 'aromatic';
const HC_LABEL: Record<Hc, string> = {
  alkane: 'An alkane: saturated',
  alkene: 'An alkene: unsaturated',
  alkyne: 'An alkyne: unsaturated',
  cycloalkane: 'A cycloalkane: saturated',
  cycloalkene: 'A cycloalkene: unsaturated',
  aromatic: 'An aromatic hydrocarbon',
};
const HC_NEAR: Record<Hc, Hc[]> = {
  alkane: ['alkene', 'cycloalkane', 'alkyne'],
  alkene: ['alkane', 'alkyne', 'cycloalkene'],
  alkyne: ['alkene', 'alkane', 'aromatic'],
  cycloalkane: ['alkane', 'cycloalkene', 'aromatic'],
  cycloalkene: ['cycloalkane', 'alkene', 'aromatic'],
  aromatic: ['cycloalkene', 'cycloalkane', 'alkene'],
};
const HC_WHY: Record<Hc, string> = {
  alkane: 'The carbons form a chain joined only by single bonds: an alkane. It holds as many hydrogen atoms as it can, so it is saturated.',
  alkene: 'The chain has a carbon–carbon double bond: an alkene. A multiple bond means it could hold more hydrogen, so it is unsaturated.',
  alkyne: 'The chain has a carbon–carbon triple bond: an alkyne, which is unsaturated.',
  cycloalkane: 'The carbons form a ring joined only by single bonds: a cycloalkane, which is saturated.',
  cycloalkene: 'The carbons form a ring with one double bond: a cycloalkene, which is unsaturated.',
  aromatic: 'A six-carbon benzene ring, drawn with a circle for its shared (delocalised) electrons, makes it an aromatic hydrocarbon.',
};
const RINGS: Array<{ name: string; formula: string; n: number; kind: RingKind; methyl?: boolean; cls: Hc }> = [
  { name: 'cyclopropane', formula: 'C3H6', n: 3, kind: 'cycloalkane', cls: 'cycloalkane' },
  { name: 'cyclobutane', formula: 'C4H8', n: 4, kind: 'cycloalkane', cls: 'cycloalkane' },
  { name: 'cyclopentane', formula: 'C5H10', n: 5, kind: 'cycloalkane', cls: 'cycloalkane' },
  { name: 'cyclohexane', formula: 'C6H12', n: 6, kind: 'cycloalkane', cls: 'cycloalkane' },
  { name: 'methylcyclohexane', formula: 'C7H14', n: 6, kind: 'cycloalkane', methyl: true, cls: 'cycloalkane' },
  { name: 'cyclopentene', formula: 'C5H8', n: 5, kind: 'cycloalkene', cls: 'cycloalkene' },
  { name: 'cyclohexene', formula: 'C6H10', n: 6, kind: 'cycloalkene', cls: 'cycloalkene' },
  { name: 'benzene', formula: 'C6H6', n: 6, kind: 'benzene', cls: 'aromatic' },
  { name: 'methylbenzene', formula: 'C7H8', n: 6, kind: 'benzene', methyl: true, cls: 'aromatic' },
];
const ringFig = (r: (typeof RINGS)[number]) => ringFormula(r.n, r.kind, { methyl: r.methyl, caption: 'A line formula' });

/** A hydrocarbon to classify: a chain shown as a condensed or line formula, or a ring as a line formula. */
function hydrocarbonSubject(rng: Rng): { cls: Hc; shown: string; figure?: PlaneFigure } {
  const cls = rng.pick<Hc>(['alkane', 'alkene', 'alkyne', 'cycloalkane', 'cycloalkene', 'aromatic']);
  if (cls === 'cycloalkane' || cls === 'cycloalkene' || cls === 'aromatic') {
    return { cls, shown: 'the hydrocarbon in the line formula', figure: ringFig(rng.pick(RINGS.filter((r) => r.cls === cls))) };
  }
  const sk = branched(rng, [3, 7], [0, 1], cls === 'alkane' ? {} : { bond: cls === 'alkene' ? 2 : 3 });
  if (cls !== 'alkyne' && sk.chain >= 4 && rng.chance(0.5)) return { cls, shown: 'the hydrocarbon in the line formula', figure: lineFormula(sk, { mirror: rng.chance(0.5), caption: 'A line formula' }) };
  return { cls, shown: cf(sk, rng.chance(0.5)) };
}

function organicClassify(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    if (rng.chance(0.5)) {
      const right = rng.pick(ORGANIC);
      const wrong = [...rng.sample(INORGANIC_C, rng.int(1, 2)), ...rng.sample(INORGANIC, 2)].slice(0, 3);
      return {
        prompt: 'Which of these compounds is organic?',
        parts: [part(mc(rng, compound(right), wrong.map(compound)))],
        hints: ['An organic compound contains carbon, nearly always bonded to hydrogen.', 'Oxides of carbon, carbonates, cyanides and carbides contain carbon but are classed as inorganic.'],
        solution: [`${cap(right[0])}, ${ceMd(right[1])}, has carbon bonded to hydrogen, so it is organic.`, `The others are inorganic: ${andList(wrong.map((w) => w[0]))}.`],
      };
    }
    const right = rng.pick(INORGANIC_C);
    const wrong = rng.sample(ORGANIC, 3);
    return {
      prompt: 'Which of these carbon compounds is inorganic?',
      parts: [part(mc(rng, compound(right), wrong.map(compound)))],
      hints: ['Most compounds of carbon are organic.', 'The exceptions are the oxides of carbon, carbonates and hydrogen carbonates, cyanides and carbides.'],
      solution: [`${cap(right[0])}, ${ceMd(right[1])}, contains carbon, but the oxides of carbon, carbonates and hydrogen carbonates, cyanides and carbides are classed as inorganic.`, `${cap(andList(wrong.map((w) => w[0])))} have carbon bonded to hydrogen: they are organic.`],
    };
  }
  if (d === 2) {
    const s = hydrocarbonSubject(rng);
    return {
      prompt: `Which describes ${s.shown}?`,
      ...(s.figure && { figure: s.figure }),
      parts: [part(mc(rng, HC_LABEL[s.cls], HC_NEAR[s.cls].map((c) => HC_LABEL[c])))],
      hints: ['Look at the carbon–carbon bonds: all single, or a double or triple bond?', 'Then check whether the carbons form a chain or a ring. A benzene ring is aromatic.', ...(s.figure ? ['In a line formula, each corner and each end of a line is a carbon atom.'] : [])],
      solution: [HC_WHY[s.cls]],
    };
  }
  if (rng.chance(0.5)) {
    const nOrg = rng.int(2, 3);
    const opts = [...rng.sample(ORGANIC, nOrg).map((c) => ({ c, correct: true })), ...rng.sample(INORGANIC_C, 4 - nOrg).map((c) => ({ c, correct: false })), { c: rng.pick(INORGANIC), correct: false }];
    return {
      prompt: 'Select every organic compound.',
      parts: [part(multi(rng, opts.map((o) => ({ md: compound(o.c), correct: o.correct }))))],
      hints: ['Organic compounds contain carbon, nearly always bonded to hydrogen.', 'Carbon in an oxide, carbonate, hydrogen carbonate, cyanide or carbide does not make a compound organic.'],
      solution: [ORGANIC_RULE, `Organic: ${andList(opts.filter((o) => o.correct).map((o) => o.c[0]))}. Inorganic: ${andList(opts.filter((o) => !o.correct).map((o) => o.c[0]))}.`],
    };
  }
  // Unsaturated hydrocarbons among five, by condensed formula or by name.
  const kinds = rng.shuffle<Hc>(['alkane', 'alkene', 'alkyne', 'cycloalkane', 'cycloalkene', rng.pick<Hc>(['alkane', 'alkene', 'cycloalkane'])]).slice(0, 5);
  // An explicit boolean, so `every` does not narrow `kinds` to the saturated kinds.
  if (kinds.every((k): boolean => k === 'alkane' || k === 'cycloalkane')) kinds[0] = 'alkene';
  const one = (k: Hc) => {
    if (k === 'cycloalkane' || k === 'cycloalkene') {
      const r = rng.pick(RINGS.filter((x) => x.cls === k));
      return { md: `${cap(r.name)}, ${ceMd(r.formula)}`, correct: k === 'cycloalkene', why: `${r.name}: ${k === 'cycloalkene' ? 'a ring with a double bond, unsaturated' : 'a ring with single bonds only, saturated'}` };
    }
    const sk = branched(rng, [3, 6], [0, 1], k === 'alkane' ? {} : { bond: k === 'alkene' ? 2 : 3 });
    return { md: cf(sk, rng.chance(0.5)), correct: k !== 'alkane', why: `${nm(sk)}: ${k === 'alkane' ? 'single bonds only, saturated' : `a ${k === 'alkene' ? 'double' : 'triple'} bond, unsaturated`}` };
  };
  const opts: Array<ReturnType<typeof one>> = [];
  for (const k of kinds) {
    let o = one(k);
    for (let i = 0; i < 20 && opts.some((x) => x.md === o.md); i++) o = one(k);
    opts.push(o);
  }
  return {
    prompt: 'Select every unsaturated hydrocarbon.',
    parts: [part(multi(rng, opts.map((o) => ({ md: o.md, correct: o.correct }))))],
    hints: ['An unsaturated hydrocarbon has at least one carbon–carbon double or triple bond.', 'In a name, -ene means a double bond, -yne a triple bond and -ane single bonds only.'],
    solution: opts.map((o) => `${cap(o.why)}.`),
  };
}

const GENERAL = '$\\text{C}_n\\text{H}_{2n+2}$ for alkanes, $\\text{C}_n\\text{H}_{2n}$ for alkenes and $\\text{C}_n\\text{H}_{2n-2}$ for alkynes (with one multiple bond)';
const BRANCH_C: Record<string, number> = { methyl: 1, ethyl: 2, propyl: 3 };

/** Counting the atoms of a hydrocarbon from its condensed formula, carbon 1 first. */
function countingSteps(sk: Skeleton): string[] {
  const s = numbered(canonical(sk) ?? sk);
  const chainH = hydrogens(s);
  const branches = (s.subs ?? []).filter((x) => isAlkyl(x.prefix)).map((x) => BRANCH_C[x.prefix]);
  const cBranch = branches.reduce((a, b) => a + b, 0);
  const hTerms = [...chainH, ...branches.map((k) => 2 * k + 1)];
  const mf = molecularFormula(s);
  return [
    `Carbon atoms: ${s.chain} in the main chain${cBranch ? ` and ${cBranch} in the branch${branches.length > 1 ? 'es' : ''}, ${s.chain + cBranch} in all` : ''}.`,
    `Hydrogen atoms: $${hTerms.join(' + ')} = ${hTerms.reduce((a, b) => a + b, 0)}$.`,
    `Molecular formula: ${ceMd(mf)}.`,
  ];
}

const HC_FAMILY: Array<{ fam: 'alkane' | 'alkene' | 'alkyne'; h: (n: number) => number; formula: string }> = [
  { fam: 'alkane', h: (n) => 2 * n + 2, formula: '$\\text{C}_n\\text{H}_{2n+2}$' },
  { fam: 'alkene', h: (n) => 2 * n, formula: '$\\text{C}_n\\text{H}_{2n}$' },
  { fam: 'alkyne', h: (n) => 2 * n - 2, formula: '$\\text{C}_n\\text{H}_{2n-2}$' },
];
const hcFormula = (n: number, h: number) => `C${n > 1 ? n : ''}H${h}`;

function hydrocarbonFormula(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Count the carbon atoms, including those in branches.', 'Add up the hydrogen atoms on every carbon.', `Check with the general formulas: ${GENERAL}.`];
  if (d === 1) {
    if (rng.chance(0.5)) {
      const fam = rng.pick(HC_FAMILY);
      const n = rng.int(fam.fam === 'alkane' ? 1 : 2, 10);
      const h = fam.h(n);
      return {
        prompt: `An ${fam.fam} molecule has ${n} carbon atom${n === 1 ? '' : 's'}${fam.fam === 'alkane' ? '' : ` and one ${fam.fam === 'alkene' ? 'double' : 'triple'} bond`}. What is its molecular formula?`,
        parts: [formulaPart(hcFormula(n, h))],
        hints: [`The general formula of the ${fam.fam}s is ${fam.formula}.`],
        solution: [`${cap(fam.fam)}s: ${fam.formula}. With $n = ${n}$, the molecule has $${fam.fam === 'alkane' ? `2(${n}) + 2` : fam.fam === 'alkene' ? `2(${n})` : `2(${n}) - 2`} = ${h}$ hydrogen atoms.`, `Molecular formula: ${ceMd(hcFormula(n, h))}.`],
      };
    }
    const order = rng.pick([1, 2, 2, 3] as const);
    const sk = branched(rng, [2, 8], [0, 0], order === 1 ? {} : { bond: order });
    return {
      prompt: `What is the molecular formula of ${cf(sk, rng.chance(0.5))}?`,
      parts: [formulaPart(molecularFormula(sk))],
      hints,
      solution: countingSteps(sk),
    };
  }
  if (d === 2) {
    const kind = rng.int(0, 2);
    if (kind === 0) {
      const sk = branched(rng, [4, 7], [1, 2], { ethyl: true, ...(rng.chance(0.4) && { bond: 2 as const }) });
      return { prompt: `What is the molecular formula of ${cf(sk, rng.chance(0.5))}?`, parts: [formulaPart(molecularFormula(sk))], hints, solution: countingSteps(sk) };
    }
    if (kind === 1) {
      const r = rng.pick(RINGS);
      const n = Number(/^C(\d+)/.exec(r.formula)![1]);
      return {
        prompt: 'The line formula shows a hydrocarbon. What is its molecular formula?',
        figure: ringFig(r),
        parts: [formulaPart(r.formula)],
        hints: ['Each corner of the ring, and the end of a branch, is a carbon atom.', 'Each carbon makes four bonds; the hydrogens fill the bonds not drawn.', ...(r.kind === 'benzene' ? ['In a benzene ring each ring carbon has one hydrogen, or none where a branch is joined.'] : [])],
        solution: [`It is ${r.name}: ${n} carbon atoms.`, r.kind === 'benzene' ? `Each ring carbon has one hydrogen${r.methyl ? ', except the one joined to the methyl group, which has three' : ''}.` : `${r.methyl ? 'The ring carbon with the branch has one hydrogen, the branch three, and each other ring carbon two.' : r.kind === 'cycloalkene' ? 'The two carbons of the double bond have one hydrogen each; the others have two.' : 'Each ring carbon has two hydrogens.'}`, `Molecular formula: ${ceMd(r.formula)}.`],
      };
    }
    const sk = branched(rng, [4, 7], [0, 2], { ethyl: true, ...(rng.chance(0.5) && { bond: 2 as const }) });
    return {
      prompt: 'The line formula shows a hydrocarbon. What is its molecular formula?',
      figure: lineFormula(sk, { mirror: rng.chance(0.5), caption: 'A line formula' }),
      parts: [formulaPart(molecularFormula(sk))],
      hints: ['Each corner and each end of a line is a carbon atom.', 'Each carbon makes four bonds; the hydrogens fill the bonds not drawn. A double line is a double bond.'],
      solution: [`The line formula is ${cf(sk)}, ${nm(sk)}.`, ...countingSteps(sk)],
    };
  }
  const kind = rng.int(0, 2);
  if (kind === 0) {
    const fam = rng.pick(HC_FAMILY);
    const n = rng.int(3, 9);
    const h = fam.h(n);
    const M = Number((n * 12.01 + h * 1.01).toFixed(2));
    const per = fam.fam === 'alkane' ? `14.03n + 2.02` : fam.fam === 'alkene' ? '14.03n' : '14.03n - 2.02';
    const solveN = fam.fam === 'alkane' ? `\\dfrac{${M.toFixed(2)} - 2.02}{14.03}` : fam.fam === 'alkene' ? `\\dfrac{${M.toFixed(2)}}{14.03}` : `\\dfrac{${M.toFixed(2)} + 2.02}{14.03}`;
    return {
      prompt: `An ${fam.fam}${fam.fam === 'alkane' ? '' : ` with one ${fam.fam === 'alkene' ? 'double' : 'triple'} bond`} has a molar mass of $${M.toFixed(2)}\\ \\text{g/mol}$. What is its molecular formula? Use the molar masses C $12.01\\ \\text{g/mol}$ and H $1.01\\ \\text{g/mol}$.`,
      parts: [formulaPart(hcFormula(n, h))],
      calculator: true,
      hints: [`Write the general formula of the ${fam.fam}s, ${fam.formula}, and its molar mass in terms of $n$.`, 'Solve for $n$, the number of carbon atoms.'],
      solution: [`${cap(fam.fam)}s are ${fam.formula}, so $M = 12.01n + 1.01(${fam.fam === 'alkane' ? '2n + 2' : fam.fam === 'alkene' ? '2n' : '2n - 2'}) = ${per}$.`, `$n = ${solveN} = ${n}$`, `Molecular formula: ${ceMd(hcFormula(n, h))}.`],
    };
  }
  if (kind === 1) {
    const fam = rng.pick(HC_FAMILY);
    const n = rng.int(3, 10);
    const h = fam.h(n);
    return {
      prompt: `A molecule of an ${fam.fam}${fam.fam === 'alkane' ? '' : ` with one ${fam.fam === 'alkene' ? 'double' : 'triple'} bond`} has ${h} hydrogen atoms. What is its molecular formula?`,
      parts: [formulaPart(hcFormula(n, h))],
      hints: [`The general formula of the ${fam.fam}s is ${fam.formula}.`, 'Set the number of hydrogens equal to the expression and solve for $n$.'],
      solution: [`${fam.formula}: $${fam.fam === 'alkane' ? '2n + 2' : fam.fam === 'alkene' ? '2n' : '2n - 2'} = ${h}$, so $n = ${n}$.`, `Molecular formula: ${ceMd(hcFormula(n, h))}.`],
    };
  }
  const sk = branched(rng, [5, 8], [2, 3], { ethyl: true, ...(rng.chance(0.3) && { bond: 2 as const }) });
  return {
    prompt: `What is the molecular formula of ${nm(sk)}?`,
    parts: [formulaPart(molecularFormula(sk))],
    hints: ['Draw the compound from its name: the parent chain first, then the branches on the numbered carbons.', 'Then count the carbons and the hydrogens on each carbon.'],
    solution: [`${cap(nm(sk))} is ${cf(sk)}.`, ...countingSteps(sk)],
  };
}

// ---------------------------------------------------------------------------- lesson 3.2: naming hydrocarbons

/** Other compounds a careless reading of a name gives: a branch or bond moved, the chain one carbon longer or shorter, a branch swapped. */
function mutations(sk: Skeleton): Skeleton[] {
  const subs = sk.subs ?? [];
  const out: Skeleton[] = [];
  subs.forEach((s, i) => {
    for (const dt of [-1, 1, 2]) out.push({ ...sk, subs: subs.map((x, j) => (j === i ? { ...x, at: x.at + dt } : x)) });
    if (isAlkyl(s.prefix)) out.push({ ...sk, subs: subs.map((x, j) => (j === i ? { ...x, prefix: (x.prefix === 'methyl' ? 'ethyl' : 'methyl') as Prefix } : x)) });
  });
  for (const dn of [-1, 1]) out.push({ ...sk, chain: sk.chain + dn });
  if (sk.bond) {
    for (const dt of [-1, 1]) out.push({ ...sk, bond: { ...sk.bond, at: sk.bond.at + dt } });
    out.push({ ...sk, bond: { ...sk.bond, order: sk.bond.order === 2 ? 3 : 2 } });
  }
  const g = sk.group;
  if (g && 'at' in g) for (const dt of [-1, 1]) out.push({ ...sk, group: { ...g, at: g.at + dt } });
  return out;
}

/** Three structures with names unlike the target's (and each other's), from small changes to it. */
function nearStructures(rng: Rng, sk: Skeleton): Skeleton[] {
  const target = nm(sk);
  const seen = new Set([target]);
  const out: Skeleton[] = [];
  const first = rng.shuffle(mutations(sk));
  // Two small changes when one is not enough (a small molecule has few near neighbours).
  for (const m of [...first, ...rng.shuffle(first.flatMap(mutations))]) {
    if (!isProper(m)) continue;
    const n = nm(m);
    if (seen.has(n)) continue;
    seen.add(n);
    out.push(m);
    if (out.length === 3) break;
  }
  return out;
}

function fromName(rng: Rng, sk: Skeleton, what: string): GenOutput {
  const wrong = nearStructures(rng, sk);
  const p = nameParts(sk);
  return {
    prompt: `Which condensed formula shows ${nm(sk)}?`,
    parts: [part(mc(rng, cf(sk, rng.chance(0.5)), wrong.map((w) => cf(w, rng.chance(0.5)))))],
    hints: [`Draw the parent chain first: ${STEMS[p.chain]}- means ${p.chain} carbons.`, `Then put ${what} on the numbered carbons. A formula can be written from either end.`],
    solution: [`${cap(nm(sk))}: a chain of ${p.chain} carbons${p.bond ? ` with a ${p.bond.order === 2 ? 'double' : 'triple'} bond starting at carbon ${p.bond.locant}` : ''}${p.prefixes.length ? `, with ${describeSubs(p)}` : ''}.`, `That is ${cf(sk)}.`],
  };
}

/** A name that breaks a rule for the compound: a bent chain named as written, or the chain numbered from the wrong end. */
function wrongName(rng: Rng, sk: Skeleton): { wrong: string; drawn: string; why: string } | null {
  const right = nm(sk);
  const options: Array<{ wrong: string; drawn: string; why: string }> = [];
  for (const dep of depictions(sk)) {
    if (isProper(dep)) continue;
    const w = nameAsWritten(dep);
    if (w !== right) options.push({ wrong: w, drawn: ceMd(condensed(dep, { asWritten: true })), why: `That chain is not the longest. The longest chain runs through the branch and has ${canonical(sk)!.chain} carbons.` });
  }
  const w = nameAsWritten(sk, { wrongEnd: true });
  if (w !== right) options.push({ wrong: w, drawn: cf(sk, !c1AtLeft(sk, true)), why: `The chain was numbered from the wrong end. Numbering from the other end gives the ${sk.bond ? 'multiple bond' : 'substituents'} lower numbers.` });
  return options.length ? rng.pick(options) : null;
}

function fixName(rng: Rng, make: () => Skeleton): GenOutput {
  for (let i = 0; i < 100; i++) {
    const sk = make();
    const w = wrongName(rng, sk);
    if (!w) continue;
    return {
      prompt: `A student named a compound ${w.wrong}. The name describes a real compound but breaks a naming rule. What is its correct IUPAC name? ${TYPE_TIP}`,
      parts: [namePart(sk)],
      hints: ['Draw the structure the name describes.', 'Find the longest chain (it may bend through a branch), and number it from the end that gives the lowest numbers.'],
      solution: [`${cap(w.wrong)} describes ${w.drawn}.`, w.why, `The correct name is **${nm(sk)}**.`],
    };
  }
  throw new Error('No wrong name found.');
}

function nameAlkane(rng: Rng, d: Difficulty): GenOutput {
  if (d === 3) {
    const make = () => branched(rng, [4, 7], [1, 3], { ethyl: true });
    if (rng.chance(0.5)) return fromName(rng, branched(rng, [5, 7], [2, 3], { ethyl: true }), 'the branches');
    return fixName(rng, make);
  }
  const sk = d === 1 ? (rng.chance(0.45) ? { chain: rng.int(1, 10) } : branched(rng, [4, 7], [1, 1])) : branched(rng, [5, 8], [2, 3], { ethyl: true });
  const rev = d === 2 && rng.chance(0.5);
  const hasLocant = (sk.subs ?? []).length > 0;
  return {
    prompt: `What is the IUPAC name of ${cf(sk, rev)}?${hasLocant ? ` ${TYPE_TIP}` : ''}`,
    parts: [namePart(sk)],
    hints: hasLocant
      ? ['Find the longest continuous chain of carbons: it gives the parent name.', 'Number the chain from the end nearer the first branch, and give each branch its carbon number.', ...(d === 2 ? ['List the branches in alphabetical order, with di- or tri- for more than one of the same kind.'] : [])]
      : ['Count the carbons in the chain.', 'meth 1, eth 2, prop 3, but 4, pent 5, hex 6, hept 7, oct 8, non 9, dec 10, with -ane for an alkane.'],
    solution: namingSteps(sk, c1AtLeft(sk, rev)),
  };
}

function nameUnsaturated(rng: Rng, d: Difficulty): GenOutput {
  const order = rng.chance(0.65) ? 2 : 3;
  if (d === 3) {
    if (rng.chance(0.5)) return fromName(rng, branched(rng, [4, 7], [1, 2], { bond: order }), 'the multiple bond and the branches');
    return fixName(rng, () => branched(rng, [4, 7], [0, 1], { bond: order }));
  }
  const sk = d === 1 ? branched(rng, [2, 7], [0, 0], { bond: order }) : branched(rng, [4, 7], [1, 2], { bond: order });
  const rev = rng.chance(0.5);
  return {
    prompt: `What is the IUPAC name of ${cf(sk, rev)}?${/\d/.test(nm(sk)) ? ` ${TYPE_TIP}` : ''}`,
    parts: [namePart(sk)],
    hints: [
      `The parent chain is the longest chain that contains the ${order === 2 ? 'double' : 'triple'} bond; its name ends in ${order === 2 ? '-ene' : '-yne'}.`,
      'Number from the end nearer the multiple bond, and give its position by the lower of its two carbon numbers.',
      ...(d === 2 ? ['Then give each branch its carbon number, in the same numbering.'] : []),
    ],
    solution: namingSteps(sk, c1AtLeft(sk, rev)),
  };
}

// ---------------------------------------------------------------------------- lesson 3.3: isomers

const ISOMER_CACHE = new Map<string, Skeleton[]>();
/** The isomers of an acyclic hydrocarbon, worked out once. */
function hydrocarbonIsomers(n: number, kind: 'alkane' | 'alkene' = 'alkane'): Skeleton[] {
  const key = `${n}${kind}`;
  if (!ISOMER_CACHE.has(key)) ISOMER_CACHE.set(key, findIsomers(n, kind));
  return ISOMER_CACHE.get(key)!;
}

const ISOMER_CHOICES = ['Isomers: the same molecular formula, different structures', 'The same compound, drawn two ways', 'Not isomers: different molecular formulas'];

/** Every way of writing a compound as a condensed formula: along any of its chains, from either end. */
const waysOf = (sk: Skeleton) => [...new Set(depictions(sk).flatMap((d) => [condensed(d, { asWritten: true }), condensed(d, { asWritten: true, reverse: true })]))].map(ceMd);
/** One way of writing a compound, unlike `not` when it can be. */
function drawnAnyWay(rng: Rng, sk: Skeleton, not?: string): string {
  const ways = waysOf(sk);
  const others = ways.filter((w) => w !== not);
  return rng.pick(others.length ? others : ways);
}

function isomers(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    if (rng.chance(0.4)) {
      const n = rng.int(4, 6);
      const list = hydrocarbonIsomers(n);
      return {
        prompt: `How many structural isomers have the molecular formula ${ceMd(`C${n}H${2 * n + 2}`)}? Draw them to count them.`,
        parts: [numPart(list.length, { suffix: 'isomers' })],
        hints: ['Start with the straight chain, then shorten the chain by one carbon and place the extra carbon as a branch, then by two.', 'Name each structure: two drawings with the same name are the same compound.'],
        solution: [`The isomers of ${ceMd(`C${n}H${2 * n + 2}`)}: ${andList(list.map((s) => `${nm(s)}, ${cf(s)}`))}.`, `There are ${list.length}.`],
      };
    }
    const n = rng.int(4, 6);
    const list = hydrocarbonIsomers(n);
    const a = rng.pick(list);
    const iso = rng.chance(0.65);
    const b = iso ? rng.pick(list.filter((s) => nm(s) !== nm(a))) : rng.pick(hydrocarbonIsomers(n + rng.pick([-1, 1])));
    return {
      prompt: `How are ${nm(a)} (${cf(a)}) and ${nm(b)} (${cf(b)}) related?`,
      parts: [part(fixedChoice(ISOMER_CHOICES, iso ? 0 : 2))],
      hints: ['Write the molecular formula of each: count the carbons and the hydrogens.', 'Isomers have the same molecular formula but different structures, so different names.'],
      solution: [`${cap(nm(a))} is ${ceMd(molecularFormula(a))} and ${nm(b)} is ${ceMd(molecularFormula(b))}.`, iso ? 'Same formula, different structures: they are isomers.' : 'The formulas differ, so they are not isomers.'],
    };
  }
  if (d === 2) {
    const n = rng.int(5, 7);
    const list = hydrocarbonIsomers(n);
    const a = rng.pick(list.filter((s) => (s.subs ?? []).length > 0));
    const right = rng.pick(list.filter((s) => nm(s) !== nm(a)));
    const same = drawnAnyWay(rng, a, cf(a));
    const longer = rng.pick(hydrocarbonIsomers(n + 1));
    const alkene = rng.pick(hydrocarbonIsomers(n, 'alkene'));
    const wrong = [same, cf(longer, rng.chance(0.5)), cf(alkene, rng.chance(0.5))];
    return {
      prompt: `Which compound is an isomer of ${nm(a)}, ${cf(a)}?`,
      parts: [part(mc(rng, cf(right, rng.chance(0.5)), wrong))],
      hints: ['An isomer has the same molecular formula, so count the carbons and hydrogens of each choice.', 'It must also be a different compound: a different structure, with a different name.'],
      solution: [
        `${cap(nm(a))} is ${ceMd(molecularFormula(a))}.`,
        `${cf(right)} is ${nm(right)}, also ${ceMd(molecularFormula(right))}, but a different structure: an isomer.`,
        `${same} is ${nm(a)} itself, drawn another way; ${cf(longer)} is ${ceMd(molecularFormula(longer))} and ${cf(alkene)} is ${ceMd(molecularFormula(alkene))}.`,
      ],
    };
  }
  if (rng.chance(0.55)) {
    const n = rng.int(5, 7);
    const list = hydrocarbonIsomers(n);
    // A compound that can be written in more than one way, so "drawn two ways" shows two drawings.
    const a = rng.pick(list.filter((s) => waysOf(s).length > 1));
    const r = rng.next();
    const kind = r < 0.45 ? 1 : r < 0.85 ? 0 : 2;
    const b = kind === 1 ? a : kind === 0 ? rng.pick(list.filter((s) => nm(s) !== nm(a))) : rng.pick(hydrocarbonIsomers(n + 1).filter((s) => (s.subs ?? []).length > 0));
    const shownA = drawnAnyWay(rng, a);
    const shownB = drawnAnyWay(rng, b, shownA);
    return {
      prompt: `How are ${shownA} and ${shownB} related?`,
      parts: [part(fixedChoice(ISOMER_CHOICES, kind))],
      hints: ['Find the longest chain in each drawing; it may bend through a branch.', 'Name each one. The same name means the same compound; the same formula with different names means isomers.'],
      solution: [`${shownA} is ${nm(a)}, ${ceMd(molecularFormula(a))}.`, `${shownB} is ${nm(b)}, ${ceMd(molecularFormula(b))}.`, kind === 1 ? 'The same name: the same compound, drawn two ways.' : kind === 0 ? 'The same formula but different names: isomers.' : 'Different formulas: not isomers.'],
    };
  }
  // Isomers in different families.
  const groups = FUNCTIONAL_ISOMERS.filter((g) => g.length >= 2);
  const g = rng.pick(groups);
  const [a, right] = rng.sample(g, 2);
  const others = rng.shuffle(FUNCTIONAL_ISOMERS.filter((x) => x !== g && Math.abs(atomsC(x[0]) - atomsC(a)) <= 1).flat()).map((s) => cf(s));
  const self = ceMd(condensed(a, { reverse: true }));
  const selfShown = self !== cf(a);
  const wrong = selfShown ? [self, ...others.slice(0, 2)] : others.slice(0, 3);
  return {
    prompt: `Which compound is an isomer of ${nm(a)}, ${cf(a)}?`,
    parts: [part(mc(rng, cf(right), wrong))],
    hints: ['Write the molecular formula of each, counting the oxygen atoms too.', 'Isomers can belong to different families, as long as the molecular formula is the same.'],
    solution: [
      `${cap(nm(a))} is ${ceMd(molecularFormula(a))}.`,
      `${cf(right)} is ${nm(right)}, also ${ceMd(molecularFormula(right))}: an isomer${familyOf(right) !== familyOf(a) ? `, even though it is ${/^[aeiou]/.test(familyOf(right)) ? 'an' : 'a'} ${familyOf(right)} and ${nm(a)} is ${/^[aeiou]/.test(familyOf(a)) ? 'an' : 'a'} ${familyOf(a)}` : ''}.`,
      selfShown ? `${self} is ${nm(a)} itself, written from the other end, so it is not an isomer of it. The other choices have different molecular formulas.` : 'The other choices have different molecular formulas.',
    ],
  };
}

const atomsC = (sk: Skeleton) => Number(/^C(\d*)/.exec(molecularFormula(sk))![1] || 1);

/** Oxygen compounds grouped by molecular formula: alcohols and ethers, aldehydes and ketones, acids and esters. */
const FUNCTIONAL_ISOMERS: Skeleton[][] = (() => {
  const all: Skeleton[] = [
    { chain: 2, group: { kind: 'alcohol', at: 1 } }, { chain: 1, subs: [{ at: 1, prefix: 'methoxy' }] },
    { chain: 3, group: { kind: 'alcohol', at: 1 } }, { chain: 3, group: { kind: 'alcohol', at: 2 } }, { chain: 2, subs: [{ at: 1, prefix: 'methoxy' }] },
    { chain: 4, group: { kind: 'alcohol', at: 1 } }, { chain: 4, group: { kind: 'alcohol', at: 2 } }, { chain: 3, subs: [{ at: 2, prefix: 'methyl' }], group: { kind: 'alcohol', at: 2 } }, { chain: 2, subs: [{ at: 1, prefix: 'ethoxy' }] }, { chain: 3, subs: [{ at: 1, prefix: 'methoxy' }] },
    { chain: 3, group: { kind: 'aldehyde' } }, { chain: 3, group: { kind: 'ketone', at: 2 } },
    { chain: 4, group: { kind: 'aldehyde' } }, { chain: 4, group: { kind: 'ketone', at: 2 } },
    { chain: 3, group: { kind: 'acid' } }, { chain: 2, group: { kind: 'ester', alkyl: 1 } }, { chain: 1, group: { kind: 'ester', alkyl: 2 } },
    { chain: 4, group: { kind: 'acid' } }, { chain: 3, group: { kind: 'ester', alkyl: 1 } }, { chain: 2, group: { kind: 'ester', alkyl: 2 } }, { chain: 1, group: { kind: 'ester', alkyl: 3 } },
    { chain: 2, group: { kind: 'acid' } }, { chain: 1, group: { kind: 'ester', alkyl: 1 } },
  ];
  const by = new Map<string, Skeleton[]>();
  for (const s of all) by.set(molecularFormula(s), [...(by.get(molecularFormula(s)) ?? []), s]);
  return [...by.values()];
})();

// ---------------------------------------------------------------------------- lesson 3.4: functional groups

type FG = Exclude<Family, 'alkane' | 'alkene' | 'alkyne'>;
const FGS: FG[] = ['alcohol', 'haloalkane', 'carboxylic acid', 'ester', 'aldehyde', 'ketone', 'ether', 'amine'];
const FG_LABEL: Record<FG, string> = { alcohol: 'Alcohol', haloalkane: 'Haloalkane', 'carboxylic acid': 'Carboxylic acid', ester: 'Ester', aldehyde: 'Aldehyde', ketone: 'Ketone', ether: 'Ether', amine: 'Amine' };
const FG_WHY: Record<FG, string> = {
  alcohol: 'a hydroxyl group, $\\ce{-OH}$, on a carbon: an alcohol (names end in -ol)',
  haloalkane: 'a halogen atom in place of a hydrogen: a haloalkane (prefixes fluoro, chloro, bromo, iodo)',
  'carboxylic acid': 'a carboxyl group, $\\ce{-COOH}$, at the end of the chain: a carboxylic acid (names end in -oic acid)',
  ester: 'the $\\ce{-COO-{}}$ link between two carbon chains: an ester (names end in -oate)',
  aldehyde: 'a $\\ce{-CHO}$ group at the end of the chain: an aldehyde (names end in -al)',
  ketone: 'a $\\ce{C=O}$ group inside the chain, written $\\ce{-CO-{}}$: a ketone (names end in -one)',
  ether: 'an oxygen atom between two carbon chains, $\\ce{-O-{}}$: an ether',
  amine: 'an amino group, $\\ce{-NH2}$: an amine (names end in -amine)',
};
const HALOS: Halo[] = ['fluoro', 'chloro', 'bromo', 'iodo'];

/** A small compound of a family. */
function example(rng: Rng, f: FG): Skeleton {
  return proper((): Skeleton => {
    switch (f) {
      case 'alcohol': {
        const n = rng.int(1, 5);
        return { chain: n, group: { kind: 'alcohol', at: rng.int(1, n) } };
      }
      case 'haloalkane': {
        const n = rng.int(1, 4);
        return { chain: n, subs: [{ at: rng.int(1, n), prefix: rng.pick(HALOS) }] };
      }
      case 'carboxylic acid':
        return { chain: rng.int(1, 5), group: { kind: 'acid' } };
      case 'ester':
        return { chain: rng.int(1, 4), group: { kind: 'ester', alkyl: rng.int(1, 3) } };
      case 'aldehyde':
        return { chain: rng.int(1, 5), group: { kind: 'aldehyde' } };
      case 'ketone': {
        const n = rng.int(3, 6);
        return { chain: n, group: { kind: 'ketone', at: rng.int(2, n - 1) } };
      }
      case 'ether': {
        const n = rng.int(1, 3);
        return { chain: n, subs: [{ at: rng.int(1, n), prefix: rng.pick(['methoxy', 'ethoxy'] as const) }] };
      }
      case 'amine': {
        const n = rng.int(1, 4);
        return { chain: n, group: { kind: 'amine', at: rng.int(1, n) } };
      }
    }
  });
}

/** Families that are easy to confuse, for "which one is ..." questions. */
const CONFUSABLE: FG[][] = [
  ['ester', 'carboxylic acid', 'ketone', 'aldehyde'],
  ['ether', 'alcohol', 'ester', 'ketone'],
  ['amine', 'alcohol', 'haloalkane', 'ether'],
  ['aldehyde', 'ketone', 'alcohol', 'carboxylic acid'],
];

const S = (chain: number, extra: Partial<Skeleton> = {}): Skeleton => ({ chain, ...extra });
/** Compounds of similar molar mass, by family, and how their boiling points rank. */
const SIMILAR: Array<Array<{ sk: Skeleton; rank: number }>> = [
  [
    { sk: S(4), rank: 0 }, { sk: S(2, { subs: [{ at: 1, prefix: 'methoxy' }] }), rank: 1 }, { sk: S(3, { group: { kind: 'aldehyde' } }), rank: 2 },
    { sk: S(3, { group: { kind: 'ketone', at: 2 } }), rank: 2 }, { sk: S(3, { group: { kind: 'alcohol', at: 1 } }), rank: 3 }, { sk: S(2, { group: { kind: 'acid' } }), rank: 4 },
  ],
  [
    // No ether here: ethoxyethane happens to boil a little below pentane.
    { sk: S(5), rank: 0 }, { sk: S(4, { group: { kind: 'aldehyde' } }), rank: 2 },
    { sk: S(4, { group: { kind: 'ketone', at: 2 } }), rank: 2 }, { sk: S(4, { group: { kind: 'alcohol', at: 1 } }), rank: 3 }, { sk: S(3, { group: { kind: 'acid' } }), rank: 4 },
  ],
];
const BP_WHY = [
  'an alkane has only weak London dispersion forces between its molecules',
  'an ether is slightly polar, but its molecules cannot hydrogen bond to each other',
  'the polar $\\ce{C=O}$ group gives dipole–dipole forces, but no hydrogen bonding between molecules',
  'the $\\ce{-OH}$ group lets the molecules hydrogen bond to each other',
  'the $\\ce{-COOH}$ group hydrogen bonds strongly, and pairs of molecules hold together',
];
const mmText = (sk: Skeleton) => `${nm(sk)} $${molarMass(molecularFormula(sk)).toFixed(2)}\\ \\text{g/mol}$`;

function functionalGroup(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const f = rng.pick(FGS);
    const sk = example(rng, f);
    return {
      prompt: `Which family does ${cf(sk, rng.chance(0.3))} belong to?`,
      parts: [part(mc(rng, FG_LABEL[f], rng.sample(FGS.filter((x) => x !== f), 3).map((x) => FG_LABEL[x])))],
      hints: ['Look for the atoms other than carbon and hydrogen, and how they are joined.', 'An $\\ce{O}$ can be in $\\ce{-OH}$, $\\ce{-CHO}$, $\\ce{-CO-{}}$, $\\ce{-COOH}$, $\\ce{-COO-{}}$ or $\\ce{-O-{}}$, and each is a different family.'],
      solution: [`It has ${FG_WHY[f]}. It is ${nm(sk)}.`],
    };
  }
  if (d === 2) {
    if (rng.chance(0.5)) {
      const f = rng.pick(FGS);
      const sk = example(rng, f);
      return {
        prompt: `Which family does ${nm(sk)} belong to?`,
        parts: [part(mc(rng, FG_LABEL[f], rng.sample(FGS.filter((x) => x !== f), 3).map((x) => FG_LABEL[x])))],
        hints: ['The ending of a name gives the family: -ol, -al, -one, -oic acid, -oate, -amine.', 'Halogen prefixes (chloro, bromo ...) and alkoxy prefixes (methoxy, ethoxy) name haloalkanes and ethers.'],
        solution: [`${cap(nm(sk))} is ${cf(sk)}: it has ${FG_WHY[f]}.`],
      };
    }
    const set = rng.pick(CONFUSABLE);
    const f = rng.pick(set);
    const sks = set.map((x) => ({ x, sk: example(rng, x) }));
    const right = sks.find((s) => s.x === f)!;
    return {
      prompt: `Which compound is ${/^[aeiou]/.test(f) ? 'an' : 'a'} ${f}?`,
      parts: [part(mc(rng, cf(right.sk), sks.filter((s) => s.x !== f).map((s) => cf(s.sk))))],
      hints: ['Find the group with oxygen, nitrogen or a halogen in each formula.', `${cap(f)}s have ${FG_WHY[f].split(': ')[0]}.`],
      solution: sks.map((s) => `${cf(s.sk)}: ${FG_WHY[s.x]}.`),
    };
  }
  const kind = rng.int(0, 2);
  if (kind === 0) {
    const set = rng.pick(SIMILAR);
    const ranks = rng.sample([...new Set(set.map((x) => x.rank))], 4).sort();
    const chosen = ranks.map((r) => rng.pick(set.filter((x) => x.rank === r)));
    const high = rng.chance(0.6);
    const right = high ? chosen[chosen.length - 1] : chosen[0];
    return {
      prompt: `These compounds have similar molar masses: ${andList(chosen.map((c) => mmText(c.sk)))}. Which has the ${high ? 'highest' : 'lowest'} boiling point?`,
      parts: [part(mc(rng, cap(nm(right.sk)), chosen.filter((c) => c !== right).map((c) => cap(nm(c.sk)))))],
      hints: ['With similar molar masses, the London dispersion forces are similar, so the other intermolecular forces decide.', 'Hydrogen bonding ($\\ce{-OH}$, $\\ce{-COOH}$) is stronger than dipole–dipole forces, which are stronger than dispersion forces alone.'],
      solution: [...chosen.map((c) => `${cap(nm(c.sk))}: ${BP_WHY[c.rank]}.`), `So ${nm(right.sk)} has the ${high ? 'highest' : 'lowest'} boiling point.`],
    };
  }
  if (kind === 1) {
    const lengths = [...rng.sample([1, 2, 3, 4], 3), rng.int(5, 7)].sort((a, b) => a - b);
    const alcohols = lengths.map((n) => ({ chain: n, group: { kind: 'alcohol' as const, at: 1 } }));
    const soluble = rng.chance(0.5);
    const right = alcohols[alcohols.length - 1];
    return {
      prompt: soluble ? `Which of these alcohols is the least soluble in water: ${andList(alcohols.map(nm))}?` : `Which of these alcohols has the highest boiling point: ${andList(alcohols.map(nm))}?`,
      parts: [part(mc(rng, cap(nm(right)), alcohols.slice(0, -1).map((s) => cap(nm(s)))))],
      hints: ['All of them have one $\\ce{-OH}$ group, which can hydrogen bond.', 'What changes is the length of the hydrocarbon chain.'],
      solution: soluble
        ? ['The $\\ce{-OH}$ group hydrogen bonds with water, but the hydrocarbon chain is non-polar and does not.', `The longer the chain, the less soluble the alcohol: ${nm(right)}, with ${right.chain} carbons, is the least soluble.`]
        : ['Each has one $\\ce{-OH}$ group for hydrogen bonding, and a longer chain adds stronger London dispersion forces.', `${cap(nm(right))}, with the longest chain, has the highest boiling point.`],
    };
  }
  const polar = rng.pick<Skeleton>([{ chain: 1, group: { kind: 'alcohol', at: 1 } }, { chain: 2, group: { kind: 'alcohol', at: 1 } }, { chain: 2, group: { kind: 'acid' } }, { chain: 3, group: { kind: 'alcohol', at: 1 } }, { chain: 1, group: { kind: 'acid' } }]);
  const nonpolar = rng.sample<Skeleton>([{ chain: 6 }, { chain: 5 }, { chain: 8 }, { chain: 3, subs: [{ at: 1, prefix: 'chloro' }] }, { chain: 4, subs: [{ at: 1, prefix: 'bromo' }] }, { chain: 6, bond: { at: 1, order: 2 } }, { chain: 2, subs: [{ at: 1, prefix: 'chloro' }, { at: 2, prefix: 'chloro' }] }], 3);
  return {
    prompt: `Which of these compounds is the most soluble in water: ${andList(rng.shuffle([polar, ...nonpolar]).map((s) => `${nm(s)} (${cf(s)})`))}?`,
    parts: [part(mc(rng, cap(nm(polar)), nonpolar.map((s) => cap(nm(s)))))],
    hints: ['"Like dissolves like": water is polar and hydrogen bonds.', 'Look for a group that can hydrogen bond with water, on a short carbon chain.'],
    solution: [`${cap(nm(polar))} has ${familyOf(polar) === 'alcohol' ? 'an $\\ce{-OH}$' : 'a $\\ce{-COOH}$'} group that hydrogen bonds with water, and only a short non-polar chain.`, `${cap(andList(nonpolar.map(nm)))} cannot hydrogen bond with water, so they dissolve very little.`],
  };
}

function nameFunctional(rng: Rng, d: Difficulty): GenOutput {
  const fam = rng.pick(['alcohol', 'haloalkane', 'carboxylic acid'] as const);
  const make = (): Skeleton => {
    if (fam === 'alcohol') {
      if (d === 1) {
        const n = rng.int(1, 5);
        return { chain: n, group: { kind: 'alcohol', at: rng.int(1, Math.ceil(n / 2)) } };
      }
      const n = rng.int(3, 6);
      return { chain: n, subs: [{ at: rng.int(2, n - 1), prefix: 'methyl' }], group: { kind: 'alcohol', at: rng.int(1, n - 1) } };
    }
    if (fam === 'haloalkane') {
      const n = rng.int(d === 1 ? 1 : 2, 4);
      const subs: Array<{ at: number; prefix: Prefix }> = [{ at: rng.int(1, n), prefix: rng.pick(HALOS) }];
      if (d > 1) subs.push(rng.chance(0.5) && n >= 3 ? { at: rng.int(2, n - 1), prefix: 'methyl' } : { at: rng.int(1, n), prefix: rng.chance(0.6) ? subs[0].prefix : rng.pick(HALOS) });
      return { chain: n, subs };
    }
    if (d === 1) return { chain: rng.int(1, 6), group: { kind: 'acid' } };
    const n = rng.int(3, 6);
    return { chain: n, subs: [{ at: rng.int(2, n - 1), prefix: rng.chance(0.75) ? 'methyl' : rng.pick(HALOS) }], group: { kind: 'acid' } };
  };
  if (d === 3) {
    const sk = proper(make);
    if (rng.chance(0.5)) return fromName(rng, sk, fam === 'alcohol' ? 'the $\\ce{-OH}$ group and the branch' : fam === 'haloalkane' ? 'the halogen atoms and branches' : 'the branch, counting from the $\\ce{-COOH}$ carbon');
    return {
      prompt: `What is the molecular formula of ${nm(sk)}? Write the carbon, then hydrogen, then the other elements in alphabetical order.`,
      parts: [formulaPart(molecularFormula(sk))],
      hints: ['Draw the compound from its name.', 'Count every atom, including the hydrogen of an $\\ce{-OH}$ or $\\ce{-COOH}$ group.'],
      solution: [`${cap(nm(sk))} is ${cf(sk)}.`, `Molecular formula: ${ceMd(molecularFormula(sk))}.`],
    };
  }
  const sk = proper(make);
  const rev = d === 2 && rng.chance(0.5);
  const hints =
    fam === 'alcohol'
      ? ['An alcohol takes the alkane name with -e replaced by -ol, and the number of the carbon with the $\\ce{-OH}$ group: propan-2-ol.', 'Number the chain from the end nearer the $\\ce{-OH}$ group.']
      : fam === 'haloalkane'
        ? ['A halogen is named as a prefix: fluoro, chloro, bromo, iodo, with the number of its carbon.', 'Number from the end nearer the first substituent, and list the prefixes alphabetically.']
        : ['A carboxylic acid takes the alkane name with -e replaced by -oic acid.', 'The carbon of the $\\ce{-COOH}$ group is carbon 1 and counts in the chain.'];
  return {
    prompt: `What is the IUPAC name of ${cf(sk, rev)}?${/\d/.test(nm(sk)) ? ` ${TYPE_TIP}` : ''}`,
    parts: [namePart(sk)],
    hints,
    solution: namingSteps(sk, c1AtLeft(sk, rev)),
  };
}

// ----------------------------------------------------------------------------

export const ORGANIC_STRUCTURE_SKILLS: SkillDef[] = [
  skill({ id: 'c30-organic-classify', name: 'Classifying organic compounds', description: 'Tell organic from inorganic compounds, and classify hydrocarbons as alkanes, alkenes, alkynes, cyclic or aromatic, saturated or unsaturated.', outcomes: ['12-C1'], lessonId: L(1), format: 'mc', gen: organicClassify }),
  skill({ id: 'c30-hydrocarbon-formula', name: 'Formulas of hydrocarbons', description: 'Find molecular formulas from condensed and line formulas, from names, and with the general formulas of alkanes, alkenes and alkynes.', outcomes: ['12-C1'], lessonId: L(1), gen: hydrocarbonFormula }),
  skill({ id: 'c30-name-alkane', name: 'Naming alkanes', description: 'Name straight-chain and branched alkanes, draw them from their names, and correct names that break the rules.', outcomes: ['12-C1'], lessonId: L(2), gen: nameAlkane }),
  skill({ id: 'c30-name-unsaturated', name: 'Naming alkenes and alkynes', description: 'Name alkenes and alkynes, numbering the multiple bond from the nearer end, and draw them from their names.', outcomes: ['12-C1'], lessonId: L(2), gen: nameUnsaturated }),
  skill({ id: 'c30-isomers', name: 'Isomers', description: 'Recognise structural isomers, count the isomers of small alkanes, and tell isomers from one compound drawn two ways.', outcomes: ['12-C1'], lessonId: L(3), format: 'mc', gen: isomers }),
  skill({ id: 'c30-functional-group', name: 'Functional groups', description: 'Identify alcohols, haloalkanes, carboxylic acids, esters, aldehydes, ketones, ethers and amines, and relate their groups to boiling points and solubility.', outcomes: ['12-C1'], lessonId: L(4), format: 'mc', gen: functionalGroup }),
  skill({ id: 'c30-name-functional', name: 'Naming alcohols, haloalkanes and acids', description: 'Name simple alcohols, haloalkanes and carboxylic acids, and draw them from their names.', outcomes: ['12-C1'], lessonId: L(4), gen: nameFunctional }),
];
