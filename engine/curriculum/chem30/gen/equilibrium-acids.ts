/**
 * Grade 12 Chemistry, Unit 4, lessons 4.4 to 4.8: Brønsted–Lowry acids and bases, predicting
 * acid–base reactions from a table of relative strengths, Ka and Kb, the pH of weak acids and
 * bases, buffers and titration curves. Every question gives the Ka, Kb and Kw values it needs, as
 * values at 25 °C for that question, and states any approximation it expects.
 */
import { fixedChoice, mc, numPart, part, skill, type GenOutput } from '../../helpers.ts';
import { ce } from '../../../chem/formula.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, Part, SkillDef, TableFigure } from '../../../types.ts';
import {
  $,
  ACID_TABLE,
  INDICATORS,
  KW,
  KW_TEXT,
  PH_SUM,
  SCI_TIP,
  WEAK_BASES,
  acidPair,
  cap,
  conc,
  curveFigure,
  indicatorTable,
  kaCell,
  kaNum,
  pairOfAcid,
  pairOfBase,
  phPart,
  q,
  sciTex,
  sigPart,
  sigRound,
  sigTex,
  titrationPh,
  titrationPoints,
  type AcidPair,
  type Analyte,
  type Indicator,
} from './equilibrium-tools.ts';

const L = (n: number) => `c30-4-${n}`;
/** A particle's state in water: water itself is a liquid. */
const st = (f: string) => `${f}(${f === 'H2O' ? 'l' : 'aq'})`;
/** A proton-transfer equation in mhchem: \ce{HF(aq) + NH3(aq) <=> F^-(aq) + NH4^+(aq)}. */
const transfer = (acid: string, base: string, conjBase: string, conjAcid: string, arrow = '<=>') => `$\\ce{${st(acid)} + ${st(base)} ${arrow} ${st(conjBase)} + ${st(conjAcid)}}$`;
/** A particle's name with its formula: "the fluoride ion, $\ce{F-}$". */
const named = (name: string, f: string) => `${name.endsWith('ion') ? 'the ' : ''}${name}, ${$(f)}`;

// ---------------------------------------------------------------------------- lesson 4.4: Brønsted–Lowry acids and bases

const BL_ACIDS = ['HF', 'HNO2', 'CH3COOH', 'HCOOH', 'HCN', 'NH4^+', 'H2O', 'HCO3^-', 'H2PO4^-', 'HSO4^-', 'H2CO3', 'HClO', 'H3O^+', 'HCl', 'HNO3', 'H2S', 'HPO4^2-', 'C6H5COOH'];
const BL_BASES = ['H2O', 'NH3', 'OH^-', 'CO3^2-', 'HCO3^-', 'F^-', 'CH3COO^-', 'CN^-', 'HPO4^2-', 'PO4^3-', 'ClO^-', 'NO2^-', 'H2PO4^-', 'HS^-', 'SO4^2-', 'HCOO^-'];

interface Transfer {
  acid: string;
  base: string;
  conjBase: string;
  conjAcid: string;
  strong: boolean;
}

/** A proton transfer between an acid and a base, with four different particles. */
function pickTransfer(rng: Rng, acids = BL_ACIDS, bases = BL_BASES): Transfer {
  for (;;) {
    const a = acidPair(rng.pick(acids));
    const b = pairOfBase(rng.pick(bases))!;
    const four = [a.acid, b.base, a.base, b.acid];
    if (new Set(four).size === 4) return { acid: a.acid, base: b.base, conjBase: a.base, conjAcid: b.acid, strong: a.ka === null };
  }
}
const tEq = (t: Transfer) => transfer(t.acid, t.base, t.conjBase, t.conjAcid, t.strong ? '->' : '<=>');

const AMPHI = ['HCO3^-', 'H2PO4^-', 'HPO4^2-', 'H2O', 'HSO3^-', 'HS^-'];
const AMPHI_EXTRA: Record<string, { acid: string; base: string; name: string }> = {
  'HCO3^-': { acid: 'H2CO3', base: 'CO3^2-', name: 'hydrogen carbonate ion' },
  'H2PO4^-': { acid: 'H3PO4', base: 'HPO4^2-', name: 'dihydrogen phosphate ion' },
  'HPO4^2-': { acid: 'H2PO4^-', base: 'PO4^3-', name: 'hydrogen phosphate ion' },
  'H2O': { acid: 'H3O^+', base: 'OH^-', name: 'water' },
  'HSO3^-': { acid: 'H2SO3', base: 'SO3^2-', name: 'hydrogen sulfite ion' },
  'HS^-': { acid: 'H2S', base: 'S^2-', name: 'hydrogen sulfide ion' },
  'HC2O4^-': { acid: 'H2C2O4', base: 'C2O4^2-', name: 'hydrogen oxalate ion' },
  'HSO4^-': { acid: 'H2SO4', base: 'SO4^2-', name: 'hydrogen sulfate ion' },
};
const BL_HINTS = ['A Brønsted–Lowry acid donates a proton ($\\ce{H+}$); a base accepts one.', 'Compare each reactant with the products: which one lost an $\\ce{H+}$, and which one gained it?'];

function blIdentify(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const t = pickTransfer(rng);
    const askAcid = rng.chance(0.5);
    const right = $(askAcid ? t.acid : t.base);
    return {
      prompt: `In the reaction ${tEq(t)}, which particle is the Brønsted–Lowry ${askAcid ? 'acid' : 'base'}?`,
      parts: [part(mc(rng, right, [t.acid, t.base, t.conjBase, t.conjAcid].map($).filter((x) => x !== right)))],
      hints: BL_HINTS,
      solution: [`${$(t.acid)} loses a proton and becomes ${$(t.conjBase)}, so it is the acid.`, `${$(t.base)} gains the proton and becomes ${$(t.conjAcid)}, so it is the base.`, `The ${askAcid ? 'acid' : 'base'} is ${right}.`],
    };
  }
  if (d === 2) {
    const t = pickTransfer(rng);
    const pair = (a: string, b: string) => `${$(a)} and ${$(b)}`;
    const first = rng.chance(0.5);
    const right = first ? pair(t.acid, t.conjBase) : pair(t.conjAcid, t.base);
    return {
      prompt: `Which is a conjugate acid–base pair in the reaction ${tEq(t)}?`,
      parts: [part(mc(rng, right, [pair(t.acid, t.base), pair(t.conjBase, t.conjAcid), pair(t.acid, t.conjAcid), pair(t.base, t.conjBase)]))],
      hints: ['A conjugate pair is two particles that differ by exactly one proton: one on each side of the equation.', ...BL_HINTS.slice(0, 1)],
      solution: [`${$(t.acid)} gives a proton and becomes ${$(t.conjBase)}: one conjugate pair.`, `${$(t.base)} takes the proton and becomes ${$(t.conjAcid)}: the other pair.`, `So ${right} is a conjugate pair.`],
    };
  }
  // An amphiprotic particle acting as an acid in one reaction and as a base in another.
  for (;;) {
    const x = rng.pick(AMPHI);
    const e = AMPHI_EXTRA[x];
    const b = rng.pick(['OH^-', 'NH3', 'CO3^2-', 'PO4^3-', 'CN^-']);
    const a = rng.pick(['H3O^+', 'HCl', 'CH3COOH', 'HF', 'HNO3', 'HSO4^-']);
    const bAcid = pairOfBase(b)!.acid;
    const aBase = acidPair(a).base;
    const r1 = [x, b, e.base, bAcid];
    const r2 = [a, x, aBase, e.acid];
    if (new Set(r1).size < 4 || new Set(r2).size < 4) continue;
    const eq1 = transfer(x, b, e.base, bAcid);
    const eq2 = transfer(a, x, aBase, e.acid, acidPair(a).ka === null ? '->' : '<=>');
    const opts = [`An acid; its conjugate base is ${$(e.base)}.`, `A base; its conjugate acid is ${$(e.acid)}.`, `An acid; its conjugate base is ${$(e.acid)}.`, `A base; its conjugate acid is ${$(e.base)}.`];
    return {
      prompt: `${cap(named(e.name, x))}, appears in both reactions.\n\nReaction 1: ${eq1}\n\nReaction 2: ${eq2}\n\nWhat does ${$(x)} do in each reaction?`,
      parts: [part(mc(rng, opts[0], opts.slice(1)), { label: 'Reaction 1' }), part(mc(rng, opts[1], [opts[0], opts[2], opts[3]]), { label: 'Reaction 2' })],
      hints: [...BL_HINTS, 'A particle that can donate or accept a proton is amphiprotic.'],
      solution: [`Reaction 1: ${$(x)} gives a proton to ${$(b)} and becomes ${$(e.base)}, so it is an acid.`, `Reaction 2: ${$(x)} accepts a proton from ${$(a)} and becomes ${$(e.acid)}, so it is a base.`, `${$(x)} is amphiprotic.`],
    };
  }
}

const CONJ_ACIDS = ACID_TABLE.filter((p) => p.acid !== 'H3O^+');
const CONJ_BASES = [...ACID_TABLE.filter((p) => !['ClO4^-', 'I^-', 'Br^-', 'NO3^-'].includes(p.base)).map((p) => ({ base: p.base, acid: p.acid, name: p.baseName })), ...WEAK_BASES.map((b) => ({ base: b.base, acid: b.acid, name: b.name }))];
const formulaPart = (expected: string, label?: string): Part => part({ kind: 'formula', expected }, { placeholder: 'Formula', ...(label ? { label } : {}) });
const TYPE_ION = 'Type a charge after the formula, such as `HSO4^-` or `NH4+`.';

function conjugate(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const p = rng.pick(CONJ_ACIDS);
    return {
      prompt: `Write the formula of the conjugate base of ${named(p.acidName, p.acid)}. ${TYPE_ION}`,
      parts: [formulaPart(p.base)],
      hints: ['The conjugate base is what is left when the acid has donated one proton, $\\ce{H+}$.', 'Remove one H and lower the charge by 1.'],
      solution: [`Remove one $\\ce{H+}$ from ${$(p.acid)}: one hydrogen fewer, and the charge goes down by 1.`, `The conjugate base is ${$(p.base)}.`],
    };
  }
  if (d === 2) {
    const b = rng.pick(CONJ_BASES);
    return {
      prompt: `Write the formula of the conjugate acid of ${named(b.name, b.base)}. ${TYPE_ION}`,
      parts: [formulaPart(b.acid)],
      hints: ['The conjugate acid is what the base becomes when it accepts one proton, $\\ce{H+}$.', 'Add one H and raise the charge by 1.'],
      solution: [`Add one $\\ce{H+}$ to ${$(b.base)}: one more hydrogen, and the charge goes up by 1.`, `The conjugate acid is ${$(b.acid)}.`],
    };
  }
  const x = rng.pick(Object.keys(AMPHI_EXTRA));
  const e = AMPHI_EXTRA[x];
  return {
    prompt: `${cap(named(e.name, x))}, is amphiprotic. Write the formulas of its conjugate acid and its conjugate base. ${TYPE_ION}`,
    parts: [formulaPart(e.acid, 'Conjugate acid:'), formulaPart(e.base, 'Conjugate base:')],
    hints: ['Amphiprotic means it can accept a proton (acting as a base) or donate one (acting as an acid).', 'Conjugate acid: add one H and raise the charge by 1. Conjugate base: remove one H and lower the charge by 1.'],
    solution: [`Accepting a proton: ${$(x)} becomes ${$(e.acid)}, its conjugate acid.`, `Donating a proton: ${$(x)} becomes ${$(e.base)}, its conjugate base.`],
  };
}

// ---------------------------------------------------------------------------- lesson 4.5: predicting acid–base reactions

/** A table of relative acid strengths, strongest acid first. */
function strengthTable(pairs: AcidPair[]): TableFigure {
  const rows = [...new Set(pairs)].sort((a, b) => kaNum(b) - kaNum(a)).map((p) => [`$${ce(p.acid)}$`, `$${ce(p.base)}$`, kaCell(p)]);
  return { type: 'table', headers: ['Acid', 'Conjugate base', '$K_a$ at $25^\\circ\\text{C}$'], rows };
}
const WEAK_PAIRS = ACID_TABLE.filter((p) => p.ka !== null && p.ka !== 1 && p.acid !== 'H2O');
const H3O_ROW = acidPair('H3O^+');
const H2O_ROW = acidPair('H2O');

interface Source {
  name: string;
  f: string;
  ents: string[];
}
const ACID_SOURCES: Source[] = [
  { name: 'acetic acid', f: 'CH3COOH', ents: ['CH3COOH'] },
  { name: 'methanoic acid', f: 'HCOOH', ents: ['HCOOH'] },
  { name: 'benzoic acid', f: 'C6H5COOH', ents: ['C6H5COOH'] },
  { name: 'hydrofluoric acid', f: 'HF', ents: ['HF'] },
  { name: 'nitrous acid', f: 'HNO2', ents: ['HNO2'] },
  { name: 'hypochlorous acid', f: 'HClO', ents: ['HClO'] },
  { name: 'hydrocyanic acid', f: 'HCN', ents: ['HCN'] },
  { name: 'phosphoric acid', f: 'H3PO4', ents: ['H3PO4'] },
  { name: 'hydrochloric acid', f: 'HCl', ents: ['H3O^+', 'Cl^-'] },
  { name: 'nitric acid', f: 'HNO3', ents: ['H3O^+', 'NO3^-'] },
  { name: 'ammonium chloride', f: 'NH4Cl', ents: ['NH4^+', 'Cl^-'] },
  { name: 'sodium hydrogen sulfate', f: 'NaHSO4', ents: ['Na^+', 'HSO4^-'] },
  { name: 'sodium dihydrogen phosphate', f: 'NaH2PO4', ents: ['Na^+', 'H2PO4^-'] },
];
const BASE_SOURCES: Source[] = [
  { name: 'sodium hydroxide', f: 'NaOH', ents: ['Na^+', 'OH^-'] },
  { name: 'ammonia', f: 'NH3', ents: ['NH3'] },
  { name: 'sodium acetate', f: 'NaCH3COO', ents: ['Na^+', 'CH3COO^-'] },
  { name: 'sodium fluoride', f: 'NaF', ents: ['Na^+', 'F^-'] },
  { name: 'sodium nitrite', f: 'NaNO2', ents: ['Na^+', 'NO2^-'] },
  { name: 'sodium hypochlorite', f: 'NaClO', ents: ['Na^+', 'ClO^-'] },
  { name: 'sodium cyanide', f: 'NaCN', ents: ['Na^+', 'CN^-'] },
  { name: 'sodium carbonate', f: 'Na2CO3', ents: ['Na^+', 'CO3^2-'] },
  { name: 'sodium hydrogen carbonate', f: 'NaHCO3', ents: ['Na^+', 'HCO3^-'] },
  { name: 'sodium hydrogen phosphate', f: 'Na2HPO4', ents: ['Na^+', 'HPO4^2-'] },
  { name: 'sodium phosphate', f: 'Na3PO4', ents: ['Na^+', 'PO4^3-'] },
  { name: 'sodium methanoate', f: 'NaHCOO', ents: ['Na^+', 'HCOO^-'] },
  { name: 'potassium benzoate', f: 'KC6H5COO', ents: ['K^+', 'C6H5COO^-'] },
  { name: 'sodium sulfate', f: 'Na2SO4', ents: ['Na^+', 'SO4^2-'] },
];

interface Mixture {
  acid: Source;
  base: Source;
  ents: string[];
  sa: string;
  sb: string;
  /** Pairs of the strongest acid and of the strongest base's conjugate acid. */
  pa: AcidPair;
  pb: AcidPair;
  products: boolean;
}

/** Two solutions mixed, with their strongest acid and base found from the table. */
function pickMixture(rng: Rng, opts: { minEnts: number; noStrongBase?: boolean }): Mixture {
  for (;;) {
    const acid = rng.pick(ACID_SOURCES);
    const base = rng.pick(BASE_SOURCES.filter((b) => !opts.noStrongBase || b.f !== 'NaOH'));
    const ents = [...new Set([...acid.ents, ...base.ents, 'H2O'])];
    if (ents.length < opts.minEnts) continue;
    const acids = ents.filter((e) => pairOfAcid(e));
    const bases = ents.filter((e) => pairOfBase(e));
    const sa = acids.reduce((m, e) => (kaNum(acidPair(e)) > kaNum(acidPair(m)) ? e : m));
    const sb = bases.reduce((m, e) => (kaNum(pairOfBase(e)!) < kaNum(pairOfBase(m)!) ? e : m));
    const pa = acidPair(sa);
    const pb = pairOfBase(sb)!;
    if (sa === sb || pa.base === pb.acid || sa === 'H2O' || sb === 'H2O') continue;
    const ratio = kaNum(pa) / kaNum(pb);
    if (ratio < 3 && ratio > 1 / 3) continue;
    return { acid, base, ents, sa, sb, pa, pb, products: ratio > 1 };
  }
}
const mixText = (m: Mixture) => `Solutions of ${m.acid.name}, $${ce(`${m.acid.f}(aq)`)}$, and ${m.base.name}, $${ce(`${m.base.f}(aq)`)}$, are mixed.`;
/** The table for a mixture: every pair its particles belong to, the water rows and a few others. */
function mixtureTable(rng: Rng, m: Mixture): TableFigure {
  const rows = new Set<AcidPair>([H3O_ROW, H2O_ROW]);
  for (const e of m.ents) {
    const a = pairOfAcid(e);
    const b = pairOfBase(e);
    if (a && e !== 'H2O') rows.add(a);
    if (b && e !== 'H2O') rows.add(b);
  }
  for (const p of rng.shuffle(WEAK_PAIRS)) if (rows.size < 8) rows.add(p);
  return strengthTable([...rows]);
}
const SPECTATORS = 'Sodium and potassium ions are spectators: they are neither acids nor bases.';
const PREDICT_HINTS = [
  'List every particle in the mixture, including water. Ionic compounds are present as separate ions, and strong acids as $\\ce{H3O+}$ ions.',
  'The strongest acid is the one highest in the left column; the strongest base is the one lowest in the right column.',
];

function acidBasePredict(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    for (;;) {
      const four = rng.shuffle(WEAK_PAIRS).slice(0, 4);
      const strongest = rng.chance(0.5);
      const askAcid = rng.chance(0.5);
      const ks = four.map((p) => p.ka!).sort((a, b) => b - a);
      // The answer must stand out: at least three times the next Ka.
      const want = askAcid === strongest ? ks[0] : ks[3];
      const next = askAcid === strongest ? ks[1] : ks[2];
      if (Math.max(want, next) / Math.min(want, next) < 3) continue;
      const p = four.find((x) => x.ka === want)!;
      const table = strengthTable([...four, ...rng.shuffle(WEAK_PAIRS.filter((x) => !four.includes(x))).slice(0, 2)]);
      const show = (x: AcidPair) => $(askAcid ? x.acid : x.base);
      const word = `${strongest ? 'strongest' : 'weakest'} ${askAcid ? 'acid' : 'base'}`;
      return {
        prompt: `Use the table of relative acid strengths. Which of these is the ${word}?`,
        figure: table,
        parts: [part(mc(rng, show(p), four.filter((x) => x !== p).map(show)))],
        hints: ['A larger $K_a$ means a stronger acid.', 'The stronger the acid, the weaker its conjugate base: the strongest bases are at the bottom of the right column.'],
        solution: [
          askAcid ? `The ${word} has the ${strongest ? 'largest' : 'smallest'} $K_a$: ${$(p.acid)}, $K_a = ${sciTex(p.ka!, 2)}$.` : `The ${word} is the conjugate base of the ${strongest ? 'weakest' : 'strongest'} acid, the one with the ${strongest ? 'smallest' : 'largest'} $K_a$ (${$(p.acid)}, $K_a = ${sciTex(p.ka!, 2)}$).`,
          `So the answer is ${show(p)}.`,
        ],
      };
    }
  }
  if (d === 2) {
    const m = pickMixture(rng, { minEnts: 4 });
    const choicesFor = (keep: string[]) => {
      const others = rng.shuffle(m.ents.filter((e) => !keep.includes(e)));
      return [...keep, ...others].slice(0, 4).map($);
    };
    const four = choicesFor([m.sa, m.sb, 'H2O']);
    return {
      prompt: `${mixText(m)} Use the table of relative acid strengths. (a) Which particle in the mixture is the strongest acid? (b) Which is the strongest base?`,
      figure: mixtureTable(rng, m),
      parts: [part(mc(rng, $(m.sa), four.filter((x) => x !== $(m.sa))), { label: '(a)' }), part(mc(rng, $(m.sb), four.filter((x) => x !== $(m.sb))), { label: '(b)' })],
      hints: [...PREDICT_HINTS, SPECTATORS],
      solution: [
        `Particles present: ${m.ents.map($).join(', ')}.`,
        `Of the particles that can act as acids, ${$(m.sa)} is highest in the table ($K_a = ${m.pa.ka === 1 ? '1' : sciTex(m.pa.ka!, 2)}$): the strongest acid.`,
        `Of the particles that can act as bases, ${$(m.sb)} is lowest in the right column: the strongest base.`,
      ],
    };
  }
  const m = pickMixture(rng, { minEnts: 4, noStrongBase: true });
  const right = transfer(m.sa, m.sb, m.pa.base, m.pb.acid);
  // Other proton transfers that could be written for the same mixture.
  const others: string[] = [];
  const acids = m.ents.filter((e) => pairOfAcid(e));
  const bases = m.ents.filter((e) => pairOfBase(e));
  for (const a of acids) {
    for (const b of bases) {
      if (a === m.sa && b === m.sb) continue;
      const pa = acidPair(a);
      const pb = pairOfBase(b)!;
      if (pa === pb || pa.base === pb.acid || a === b) continue;
      others.push(transfer(a, b, pa.base, pb.acid));
    }
  }
  if (others.length < 3) others.push(transfer('H2O', 'H2O', 'OH^-', 'H3O^+'));
  const ha = $(m.sa);
  const hb = $(m.pb.acid);
  const fav = [
    `Products, because ${ha} is a stronger acid than ${hb}.`,
    `Reactants, because ${hb} is a stronger acid than ${ha}.`,
    `Products, because ${hb} is a stronger acid than ${ha}.`,
    `Reactants, because ${ha} is a stronger acid than ${hb}.`,
  ];
  const favRight = m.products ? fav[0] : fav[1];
  const kaShow = (p: AcidPair) => (p.ka === 1 ? '1' : sciTex(p.ka!, 2));
  return {
    prompt: `${mixText(m)} Use the table of relative acid strengths. (a) Which equation shows the reaction between the strongest acid and the strongest base present? (b) Are products or reactants favoured at equilibrium?`,
    figure: mixtureTable(rng, m),
    parts: [part(mc(rng, right, rng.shuffle(others)), { label: '(a)' }), part(mc(rng, favRight, fav.filter((f) => f !== favRight)), { label: '(b)' })],
    hints: [...PREDICT_HINTS, 'Products are favoured when the acid on the left is stronger than the acid formed on the right.'],
    solution: [
      `Particles present: ${m.ents.map($).join(', ')}. ${m.ents.some((e) => /^(Na|K)\^\+$/.test(e)) ? SPECTATORS : ''}`.trim(),
      `Strongest acid: ${ha}. Strongest base: ${$(m.sb)}.`,
      `The acid gives a proton to the base: ${right}`,
      `Compare the two acids: ${ha} ($K_a = ${kaShow(m.pa)}$) and ${hb} ($K_a = ${kaShow(m.pb)}$). ${m.products ? `${ha} is stronger, so products are favoured.` : `${hb} is stronger, so reactants are favoured.`}`,
    ],
  };
}

// ---------------------------------------------------------------------------- lesson 4.6: Ka and Kb

const KA_ACIDS = WEAK_PAIRS.filter((p) => !['H2C2O4', 'H2SO3', 'H3PO4', 'H2CO3', 'H2S'].includes(p.acid));
/** Anion bases with Kb from the Ka of their conjugate acids. */
const ANION_BASES = ['F^-', 'CH3COO^-', 'CN^-', 'ClO^-', 'NO2^-', 'CO3^2-', 'HCOO^-', 'C6H5COO^-', 'PO4^3-'].map((f) => {
  const p = pairOfBase(f)!;
  return { base: f, acid: p.acid, kb: sigRound(KW / p.ka!, 2), name: p.baseName, acidName: p.acidName, ka: p.ka! };
});
const ALL_BASES = [...WEAK_BASES.map((b) => ({ ...b, ka: KW / b.kb })), ...ANION_BASES];
/** The salt that brings each anion base into a solution. */
const BASE_SALT: Record<string, { name: string; f: string }> = {
  'F^-': { name: 'sodium fluoride', f: 'NaF' },
  'CH3COO^-': { name: 'sodium acetate', f: 'NaCH3COO' },
  'CN^-': { name: 'potassium cyanide', f: 'KCN' },
  'ClO^-': { name: 'sodium hypochlorite', f: 'NaClO' },
  'NO2^-': { name: 'sodium nitrite', f: 'NaNO2' },
  'CO3^2-': { name: 'sodium carbonate', f: 'Na2CO3' },
  'HCOO^-': { name: 'sodium methanoate', f: 'NaHCOO' },
  'C6H5COO^-': { name: 'sodium benzoate', f: 'NaC6H5COO' },
  'PO4^3-': { name: 'sodium phosphate', f: 'Na3PO4' },
};
/** A weak base as a solution is named: a molecular base by itself, an anion by its salt. */
const baseSolution = (b: { base: string; name: string }) => {
  const salt = BASE_SALT[b.base];
  return salt ? { what: `${salt.name}, $${ce(`${salt.f}(aq)`)}$`, kb: `$K_b$ for ${named(b.name, b.base)}, is` } : { what: named(b.name, b.base), kb: '$K_b$ is' };
};

function kaExpression(rng: Rng, d: Difficulty): GenOutput {
  const frac = (a: string, b: string) => `\\dfrac{${a}}{${b}}`;
  if (d === 1) {
    const p = rng.pick(KA_ACIDS);
    const [h, a, ha] = [conc('H3O^+'), conc(p.base), conc(p.acid)];
    const right = `$K_a = ${frac(`${h}${a}`, ha)}$`;
    return {
      prompt: `${cap(p.acidName.endsWith('ion') ? `the ${p.acidName}` : p.acidName)} ionises in water: ${transfer(p.acid, 'H2O', p.base, 'H3O^+')}. Which is the expression for its acid ionisation constant, $K_a$?`,
      parts: [part(mc(rng, right, [`$K_a = ${frac(ha, `${h}${a}`)}$`, `$K_a = ${frac(`${h}${a}`, `${ha}${conc('H2O')}`)}$`, `$K_a = ${frac(`${conc('OH^-')}${a}`, ha)}$`, `$K_a = ${frac(`${h} + ${a}`, ha)}$`]))],
      hints: ['$K_a$ is the equilibrium law expression for the ionisation: products over reactants.', 'Water is the solvent, a pure liquid, so it is left out.'],
      solution: ['Products over reactants, leaving out liquid water:', right],
    };
  }
  if (d === 2) {
    const b = rng.pick(ALL_BASES);
    const [hb, oh, bb] = [conc(b.acid), conc('OH^-'), conc(b.base)];
    const right = `$K_b = ${frac(`${hb}${oh}`, bb)}$`;
    return {
      prompt: `Which is the base ionisation constant expression, $K_b$, for ${named(b.name, b.base)}, acting as a base in water?`,
      parts: [part(mc(rng, right, [`$K_b = ${frac(`${hb}${conc('H3O^+')}`, bb)}$`, `$K_b = ${frac(bb, `${hb}${oh}`)}$`, `$K_b = ${frac(`${hb}${oh}`, `${bb}${conc('H2O')}`)}$`, `$K_b = ${frac(oh, bb)}$`]))],
      hints: ['Write the reaction first: the base takes a proton from water, forming its conjugate acid and $\\ce{OH-}$.', 'Leave out liquid water.'],
      solution: [`${transfer('H2O', b.base, 'OH^-', b.acid)}`, 'Products over reactants, leaving out liquid water:', right],
    };
  }
  // Compare strengths from a table of constants.
  const variant = rng.int(0, 2);
  for (;;) {
    if (variant < 2) {
      const four = rng.shuffle(KA_ACIDS).slice(0, 4);
      const ks = four.map((p) => p.ka!).sort((x, y) => x - y);
      if (ks[1] / ks[0] < 3) continue;
      const weakest = four.find((p) => p.ka === ks[0])!;
      const table: TableFigure = { type: 'table', headers: ['Acid', '$K_a$ at $25^\\circ\\text{C}$'], rows: four.map((p) => [`${p.acidName}, $${ce(p.acid)}$`, `$${sciTex(p.ka!, 2)}$`]) };
      if (variant === 0) {
        return {
          prompt: 'The table gives $K_a$ for four weak acids. Which conjugate base is the strongest base?',
          figure: table,
          parts: [part(mc(rng, $(weakest.base), four.filter((p) => p !== weakest).map((p) => $(p.base))))],
          hints: ['The weaker an acid, the stronger its conjugate base.', 'Since $K_aK_b = K_w$, the smallest $K_a$ goes with the largest $K_b$.'],
          solution: [`The weakest acid has the smallest $K_a$: ${$(weakest.acid)}, $K_a = ${sciTex(weakest.ka!, 2)}$.`, `Its conjugate base, ${$(weakest.base)}, has the largest $K_b$: it is the strongest base.`],
        };
      }
      const c = rng.pick(['0.10', '0.050', '0.20']);
      return {
        prompt: `The table gives $K_a$ for four weak acids. Solutions of each acid are made at the same concentration, $${c}\\ \\text{mol/L}$. Which solution has the highest pH?`,
        figure: table,
        parts: [part(mc(rng, `${cap(weakest.acidName)}`, four.filter((p) => p !== weakest).map((p) => cap(p.acidName))))],
        hints: ['A larger $K_a$ means more ionisation and more $\\ce{H3O+}$ at the same concentration.', 'The highest pH has the least $\\ce{H3O+}$.'],
        solution: [`The smallest $K_a$ (${$(weakest.acid)}, $${sciTex(weakest.ka!, 2)}$) ionises least, so it makes the least $\\ce{H3O+}$.`, `${cap(weakest.acidName)} has the highest pH.`],
      };
    }
    const four = rng.shuffle(ALL_BASES.filter((b) => b.kb >= 1e-11)).slice(0, 4);
    const ks = four.map((b) => b.kb).sort((x, y) => x - y);
    if (ks[1] / ks[0] < 3) continue;
    const weakestB = four.find((b) => b.kb === ks[0])!;
    const table: TableFigure = { type: 'table', headers: ['Base', '$K_b$ at $25^\\circ\\text{C}$'], rows: four.map((b) => [`${b.name}, $${ce(b.base)}$`, `$${sciTex(b.kb, 2)}$`]) };
    return {
      prompt: 'The table gives $K_b$ for four weak bases. Which of their conjugate acids is the strongest acid?',
      figure: table,
      parts: [part(mc(rng, $(weakestB.acid), four.filter((b) => b !== weakestB).map((b) => $(b.acid))))],
      hints: ['The weaker a base, the stronger its conjugate acid.', 'Since $K_aK_b = K_w$, the smallest $K_b$ goes with the largest $K_a$.'],
      solution: [`The weakest base has the smallest $K_b$: ${$(weakestB.base)}, $K_b = ${sciTex(weakestB.kb, 2)}$.`, `So its conjugate acid, ${$(weakestB.acid)}, is the strongest acid.`],
    };
  }
}

const KAKB = '$K_aK_b = K_w$, and';

function kaKb(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const p = rng.pick(KA_ACIDS);
    const kb = KW / p.ka!;
    return {
      prompt: `At $25^\\circ\\text{C}$, $K_a$ for ${named(p.acidName, p.acid)}, is $${sciTex(p.ka!, 2)}$. What is $K_b$ for its conjugate base, ${$(p.base)}, to two significant figures? ${KAKB} ${KW_TEXT}. ${SCI_TIP}`,
      parts: [sigPart(kb, 2, { label: '$K_b =$' })],
      calculator: true,
      hints: ['For a conjugate pair, $K_aK_b = K_w$.', 'So $K_b = \\dfrac{K_w}{K_a}$.'],
      solution: [`$K_b = \\dfrac{K_w}{K_a} = \\dfrac{1.0 \\times 10^{-14}}{${sciTex(p.ka!, 2)}} = ${sciTex(kb, 2)}$`],
    };
  }
  if (d === 2) {
    if (rng.chance(0.5)) {
      const b = rng.pick(WEAK_BASES);
      const ka = KW / b.kb;
      return {
        prompt: `At $25^\\circ\\text{C}$, $K_b$ for ${named(b.name, b.base)}, is $${sciTex(b.kb, 2)}$. What is $K_a$ for its conjugate acid, ${named(b.acidName, b.acid)}, to two significant figures? ${KAKB} ${KW_TEXT}. ${SCI_TIP}`,
        parts: [sigPart(ka, 2, { label: '$K_a =$' })],
        calculator: true,
        hints: ['Find the conjugate acid first: add one proton to the base.', '$K_a = \\dfrac{K_w}{K_b}$.'],
        solution: [`The conjugate acid of ${$(b.base)} is ${$(b.acid)}.`, `$K_a = \\dfrac{K_w}{K_b} = \\dfrac{1.0 \\times 10^{-14}}{${sciTex(b.kb, 2)}} = ${sciTex(ka, 2)}$`],
      };
    }
    // A salt solution: the anion is the base, and its Ka is given only for the acid.
    const salts = [
      { salt: 'sodium fluoride', f: 'NaF', ion: 'F^-' },
      { salt: 'sodium acetate', f: 'NaCH3COO', ion: 'CH3COO^-' },
      { salt: 'sodium hypochlorite', f: 'NaClO', ion: 'ClO^-' },
      { salt: 'potassium cyanide', f: 'KCN', ion: 'CN^-' },
      { salt: 'sodium nitrite', f: 'NaNO2', ion: 'NO2^-' },
      { salt: 'sodium methanoate', f: 'NaHCOO', ion: 'HCOO^-' },
      { salt: 'sodium benzoate', f: 'NaC6H5COO', ion: 'C6H5COO^-' },
    ];
    const s = rng.pick(salts);
    const p = pairOfBase(s.ion)!;
    const kb = KW / p.ka!;
    return {
      prompt: `A solution of ${s.salt}, $${ce(`${s.f}(aq)`)}$, is basic because the anion reacts with water. At $25^\\circ\\text{C}$, $K_a$ for ${named(p.acidName, p.acid)}, is $${sciTex(p.ka!, 2)}$. What is $K_b$ for the base in the solution, to two significant figures? ${KAKB} ${KW_TEXT}. ${SCI_TIP}`,
      parts: [sigPart(kb, 2, { label: '$K_b =$' })],
      calculator: true,
      hints: ['The cation is a spectator; the anion is the conjugate base of the acid named.', '$K_b = \\dfrac{K_w}{K_a}$ for the conjugate pair.'],
      solution: [`The base is ${$(s.ion)}, the conjugate base of ${$(p.acid)}: ${transfer('H2O', s.ion, 'OH^-', p.acid)}`, `$K_b = \\dfrac{1.0 \\times 10^{-14}}{${sciTex(p.ka!, 2)}} = ${sciTex(kb, 2)}$`],
    };
  }
  // An amphiprotic ion: compare its Ka with its Kb.
  const ions = [
    { ion: 'HCO3^-', name: 'hydrogen carbonate ion', salt: 'sodium hydrogen carbonate', acid: 'H2CO3', acidName: 'carbonic acid', kaUp: 4.5e-7, kaOwn: 4.7e-11 },
    { ion: 'H2PO4^-', name: 'dihydrogen phosphate ion', salt: 'sodium dihydrogen phosphate', acid: 'H3PO4', acidName: 'phosphoric acid', kaUp: 6.9e-3, kaOwn: 6.2e-8 },
    { ion: 'HPO4^2-', name: 'hydrogen phosphate ion', salt: 'sodium hydrogen phosphate', acid: 'H2PO4^-', acidName: 'the dihydrogen phosphate ion', kaUp: 6.2e-8, kaOwn: 4.8e-13 },
    { ion: 'HSO3^-', name: 'hydrogen sulfite ion', salt: 'sodium hydrogen sulfite', acid: 'H2SO3', acidName: 'sulfurous acid', kaUp: 1.4e-2, kaOwn: 6.3e-8 },
    { ion: 'HC2O4^-', name: 'hydrogen oxalate ion', salt: 'sodium hydrogen oxalate', acid: 'H2C2O4', acidName: 'oxalic acid', kaUp: 5.6e-2, kaOwn: 1.5e-4 },
    { ion: 'HS^-', name: 'hydrogen sulfide ion', salt: 'sodium hydrogen sulfide', acid: 'H2S', acidName: 'hydrosulfuric acid', kaUp: 8.9e-8, kaOwn: 1.0e-19 },
  ];
  const x = rng.pick(ions);
  const kb = KW / x.kaUp;
  const basic = kb > x.kaOwn;
  const opts = [
    `Basic, because its $K_b$ is greater than its $K_a$.`,
    `Acidic, because its $K_a$ is greater than its $K_b$.`,
    `Basic, because its $K_a$ is greater than its $K_b$.`,
    `Acidic, because its $K_b$ is greater than its $K_a$.`,
  ];
  const right = basic ? opts[0] : opts[1];
  return {
    prompt: `${cap(named(x.name, x.ion))}, is amphiprotic. At $25^\\circ\\text{C}$, $K_a$ for ${x.acidName}, ${$(x.acid)}, is $${sciTex(x.kaUp, 2)}$, and $K_a$ for ${$(x.ion)} is $${sciTex(x.kaOwn, 2)}$. (a) What is $K_b$ for ${$(x.ion)}, to two significant figures? (b) Is a solution of ${x.salt} acidic or basic? ${KAKB} ${KW_TEXT}. ${SCI_TIP}`,
    parts: [sigPart(kb, 2, { label: '(a) $K_b =$' }), part(mc(rng, right, opts.filter((o) => o !== right)), { label: '(b)' })],
    calculator: true,
    hints: [`As a base, ${$(x.ion)} becomes ${$(x.acid)}, so use the $K_a$ of ${$(x.acid)}, not its own.`, 'Compare the two constants: the larger one decides whether the ion mostly gives protons or takes them.'],
    solution: [
      `${$(x.ion)} acting as a base forms its conjugate acid ${$(x.acid)}: $K_b = \\dfrac{K_w}{K_a(${ce(x.acid)})} = \\dfrac{1.0 \\times 10^{-14}}{${sciTex(x.kaUp, 2)}} = ${sciTex(kb, 2)}$`,
      `Its own $K_a$ is $${sciTex(x.kaOwn, 2)}$. ${basic ? '$K_b > K_a$: it accepts protons more than it donates them, so the solution is basic.' : '$K_a > K_b$: it donates protons more than it accepts them, so the solution is acidic.'}`,
    ],
  };
}

// ---------------------------------------------------------------------------- lesson 4.7: pH of weak acids and bases

/** [H3O+] (or [OH-]) of a weak acid (or base) from the quadratic: x^2 = K(c - x). */
const exactX = (k: number, c: number) => (-k + Math.sqrt(k * k + 4 * k * c)) / 2;
const pOf = (x: number) => -Math.log10(x);
const APPROX = 'Assume the ionisation is so small that the concentration of the un-ionised particle stays at its initial value (the approximation $c - x \\approx c$).';
const PH_DEF = '$\\text{pH} = -\\log[\\ce{H3O+}]$';
const POH_DEF = '$\\text{pOH} = -\\log[\\ce{OH-}]$';
const CONCS = [0.01, 0.02, 0.025, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.4, 0.5, 0.75, 1];
const PH_ACIDS = ['CH3COOH', 'HCOOH', 'C6H5COOH', 'HClO', 'HCN', 'HNO2', 'HF'].map(acidPair);

/** A concentration for which the approximation changes the pH by less than 0.004. */
function approxConc(rng: Rng, k: number): number | null {
  const ok = CONCS.filter((c) => c / k >= 1000 && Math.abs(pOf(Math.sqrt(k * c)) - pOf(exactX(k, c))) < 0.004);
  return ok.length ? rng.pick(ok) : null;
}

function weakPh(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    for (;;) {
      const p = rng.pick(PH_ACIDS);
      const c = approxConc(rng, p.ka!);
      if (c === null) continue;
      const h = Math.sqrt(p.ka! * c);
      const ph = pOf(h);
      return {
        prompt: `What is the pH of a $${sigTex(c, 3)}\\ \\text{mol/L}$ solution of ${p.acidName}, ${$(p.acid)}, to two decimal places? At $25^\\circ\\text{C}$, $K_a = ${sciTex(p.ka!, 2)}$. ${APPROX} ${PH_DEF}.`,
        parts: [phPart(ph)],
        calculator: true,
        hints: ['Write $K_a = \\dfrac{[\\ce{H3O+}][\\ce{A-}]}{[\\ce{HA}]} = \\dfrac{x^2}{c - x}$, where $x = [\\ce{H3O+}]$.', 'With the approximation, $x^2 = K_a c$, so $x = \\sqrt{K_a c}$.'],
        solution: [
          `${transfer(p.acid, 'H2O', p.base, 'H3O^+')}`,
          `$K_a = \\dfrac{x^2}{${sigTex(c, 3)} - x} \\approx \\dfrac{x^2}{${sigTex(c, 3)}}$`,
          `$x = [\\ce{H3O+}] = \\sqrt{${sciTex(p.ka!, 2)} \\times ${sigTex(c, 3)}} = ${sciTex(h, 3)}\\ \\text{mol/L}$`,
          `$\\text{pH} = -\\log(${sciTex(h, 3)}) = ${ph.toFixed(2)}$`,
        ],
      };
    }
  }
  if (d === 2) {
    for (;;) {
      const b = rng.pick(ALL_BASES.filter((x) => x.kb >= 1e-10));
      const c = approxConc(rng, b.kb);
      if (c === null) continue;
      const oh = Math.sqrt(b.kb * c);
      const poh = pOf(oh);
      const ph = 14 - poh;
      const sol = baseSolution(b);
      return {
        prompt: `What is the pH of a $${sigTex(c, 3)}\\ \\text{mol/L}$ solution of ${sol.what}, to two decimal places? At $25^\\circ\\text{C}$, ${sol.kb} $${sciTex(b.kb, 2)}$. ${APPROX} ${POH_DEF}. ${PH_SUM}`,
        parts: [phPart(ph)],
        calculator: true,
        hints: ['A base makes $\\ce{OH-}$: $K_b = \\dfrac{x^2}{c - x}$, where $x = [\\ce{OH-}]$.', 'Find $[\\ce{OH-}]$, then the pOH, then the pH.'],
        solution: [
          `${transfer('H2O', b.base, 'OH^-', b.acid)}`,
          `$x = [\\ce{OH-}] = \\sqrt{K_b c} = \\sqrt{${sciTex(b.kb, 2)} \\times ${sigTex(c, 3)}} = ${sciTex(oh, 3)}\\ \\text{mol/L}$`,
          `$\\text{pOH} = -\\log(${sciTex(oh, 3)}) = ${poh.toFixed(2)}$`,
          `$\\text{pH} = 14.00 - ${poh.toFixed(2)} = ${ph.toFixed(2)}$`,
        ],
      };
    }
  }
  const variant = rng.int(0, 2);
  if (variant === 0) {
    // The quadratic: the approximation is not good enough.
    const sys = rng.pick([
      { p: acidPair('HF'), cs: [0.01, 0.02, 0.025, 0.05] },
      { p: acidPair('HNO2'), cs: [0.01, 0.02, 0.025, 0.05] },
      { p: acidPair('HSO4^-'), cs: [0.05, 0.1, 0.15, 0.2], salt: { name: 'sodium hydrogen sulfate', f: 'NaHSO4' } },
      { p: acidPair('H3PO4'), cs: [0.05, 0.1, 0.15, 0.2], first: true },
      { p: acidPair('HCOOH'), cs: [0.005, 0.01, 0.0125] },
    ]);
    const c = rng.pick(sys.cs);
    const k = sys.p.ka!;
    const h = exactX(k, c);
    const ph = pOf(h);
    const what = 'salt' in sys && sys.salt ? `${sys.salt.name}, $${ce(`${sys.salt.f}(aq)`)}$ (the acid is ${$(sys.p.acid)})` : `${sys.p.acidName}, ${$(sys.p.acid)}`;
    return {
      prompt: `What is the pH of a $${sigTex(c, 3)}\\ \\text{mol/L}$ solution of ${what}, to two decimal places? At $25^\\circ\\text{C}$, $K_a = ${sciTex(k, 2)}$${'first' in sys ? ' for the first ionisation; ignore the others' : ''}. The acid ionises too much for the approximation, so solve the quadratic equation. ${PH_DEF}.`,
      parts: [phPart(ph)],
      calculator: true,
      hints: ['Set up $K_a = \\dfrac{x^2}{c - x}$ and rearrange into $x^2 + K_ax - K_ac = 0$.', 'Use the quadratic formula and keep the positive root: $x = \\dfrac{-K_a + \\sqrt{K_a^2 + 4K_ac}}{2}$.'],
      solution: [
        `$${sciTex(k, 2)} = \\dfrac{x^2}{${sigTex(c, 3)} - x}$, so $x^2 + ${sciTex(k, 2)}x - ${sciTex(k * c, 3)} = 0$`,
        `$x = \\dfrac{-${sciTex(k, 2)} + \\sqrt{(${sciTex(k, 2)})^2 + 4(${sciTex(k * c, 3)})}}{2} = ${sciTex(h, 3)}\\ \\text{mol/L}$`,
        `$\\text{pH} = -\\log(${sciTex(h, 3)}) = ${ph.toFixed(2)}$ (the approximation would give $${pOf(Math.sqrt(k * c)).toFixed(2)}$).`,
      ],
    };
  }
  if (variant === 1) {
    // A salt of a weak acid: find Kb first.
    const salts = [
      { salt: 'sodium acetate', f: 'NaCH3COO', ion: 'CH3COO^-' },
      { salt: 'sodium fluoride', f: 'NaF', ion: 'F^-' },
      { salt: 'sodium hypochlorite', f: 'NaClO', ion: 'ClO^-' },
      { salt: 'potassium cyanide', f: 'KCN', ion: 'CN^-' },
      { salt: 'sodium nitrite', f: 'NaNO2', ion: 'NO2^-' },
      { salt: 'sodium benzoate', f: 'NaC6H5COO', ion: 'C6H5COO^-' },
    ];
    const s = rng.pick(salts);
    const p = pairOfBase(s.ion)!;
    const kb = KW / p.ka!;
    const c = rng.pick([0.05, 0.1, 0.15, 0.2, 0.25, 0.5]);
    const oh = Math.sqrt(kb * c);
    const poh = pOf(oh);
    const ph = 14 - poh;
    return {
      prompt: `What is the pH of a $${sigTex(c, 3)}\\ \\text{mol/L}$ solution of ${s.salt}, $${ce(`${s.f}(aq)`)}$, to two decimal places? At $25^\\circ\\text{C}$, $K_a$ for ${p.acidName}, ${$(p.acid)}, is $${sciTex(p.ka!, 2)}$; ${KW_TEXT}. ${APPROX} ${POH_DEF}. ${PH_SUM}`,
      parts: [phPart(ph)],
      calculator: true,
      hints: [`The anion ${$(s.ion)} is a weak base. Find its $K_b$ from $K_aK_b = K_w$.`, 'Then $[\\ce{OH-}] = \\sqrt{K_b c}$, the pOH, and the pH.'],
      solution: [
        `${transfer('H2O', s.ion, 'OH^-', p.acid)}`,
        `$K_b = \\dfrac{1.0 \\times 10^{-14}}{${sciTex(p.ka!, 2)}} = ${sciTex(kb, 3)}$`,
        `$[\\ce{OH-}] = \\sqrt{${sciTex(kb, 3)} \\times ${sigTex(c, 3)}} = ${sciTex(oh, 3)}\\ \\text{mol/L}$, so $\\text{pOH} = ${poh.toFixed(2)}$`,
        `$\\text{pH} = 14.00 - ${poh.toFixed(2)} = ${ph.toFixed(2)}$`,
      ],
    };
  }
  // An acidic salt: the conjugate acid of a weak base.
  const b = rng.pick(WEAK_BASES.filter((x) => x.kb > 1e-7));
  const salt = { NH3: { name: 'ammonium chloride', f: 'NH4Cl' }, CH3NH2: { name: 'methylammonium chloride', f: 'CH3NH3Cl' }, N2H4: { name: 'hydrazinium chloride', f: 'N2H5Cl' } }[b.base as 'NH3' | 'CH3NH2' | 'N2H4'];
  const ka = KW / b.kb;
  const c = rng.pick([0.05, 0.1, 0.15, 0.2, 0.25, 0.5]);
  const h = Math.sqrt(ka * c);
  const ph = pOf(h);
  return {
    prompt: `What is the pH of a $${sigTex(c, 3)}\\ \\text{mol/L}$ solution of ${salt.name}, $${ce(`${salt.f}(aq)`)}$, to two decimal places? At $25^\\circ\\text{C}$, $K_b$ for ${b.name}, ${$(b.base)}, is $${sciTex(b.kb, 2)}$; ${KW_TEXT}. ${APPROX} ${PH_DEF}.`,
    parts: [phPart(ph)],
    calculator: true,
    hints: [`The cation ${$(b.acid)} is a weak acid, the conjugate acid of ${$(b.base)}. Find its $K_a$ from $K_aK_b = K_w$.`, 'Then $[\\ce{H3O+}] = \\sqrt{K_a c}$ and the pH.'],
    solution: [
      `${transfer(b.acid, 'H2O', b.base, 'H3O^+')}`,
      `$K_a = \\dfrac{1.0 \\times 10^{-14}}{${sciTex(b.kb, 2)}} = ${sciTex(ka, 3)}$`,
      `$[\\ce{H3O+}] = \\sqrt{${sciTex(ka, 3)} \\times ${sigTex(c, 3)}} = ${sciTex(h, 3)}\\ \\text{mol/L}$`,
      `$\\text{pH} = -\\log(${sciTex(h, 3)}) = ${ph.toFixed(2)}$`,
    ],
  };
}

/** A measured pH, to two decimal places, for a weak acid of known Ka. */
const measuredPh = (k: number, c: number) => Math.round(pOf(exactX(k, c)) * 100) / 100;
const pctAnswer = (v: number) => ({ part: sigPart(v, 3, { suffix: '%' }), phrase: 'to three significant figures', shown: sigTex(v, 3) });
const PCT = 'Percent ionisation $= \\dfrac{[\\ce{H3O+}]_{eq}}{c_{\\text{initial}}} \\times 100\\%$.';

function kaFromPh(rng: Rng, d: Difficulty): GenOutput {
  const p = rng.pick(PH_ACIDS);
  const c = rng.pick([0.05, 0.1, 0.15, 0.2, 0.25, 0.5]);
  const ph = measuredPh(p.ka!, c);
  const x = 10 ** -ph;
  const C = sigTex(c, 3);
  const intro = `A $${C}\\ \\text{mol/L}$ solution of ${p.acidName}, ${$(p.acid)}, has a pH of ${ph.toFixed(2)} at $25^\\circ\\text{C}$.`;
  if (d === 1) {
    const pct = (100 * x) / c;
    const a = pctAnswer(pct);
    return {
      prompt: `${intro} What is the percent ionisation of the acid, ${a.phrase}? ${PCT}`,
      parts: [a.part],
      calculator: true,
      hints: ['Find $[\\ce{H3O+}] = 10^{-\\text{pH}}$.', 'Divide by the initial concentration of the acid and multiply by 100%.'],
      solution: [`$[\\ce{H3O+}] = 10^{-${ph.toFixed(2)}} = ${sciTex(x, 3)}\\ \\text{mol/L}$`, `$\\dfrac{${sciTex(x, 3)}}{${C}} \\times 100\\% = ${a.shown}\\%$`],
    };
  }
  if (d === 2) {
    const ka = (x * x) / (c - x);
    return {
      prompt: `${intro} What is $K_a$ for ${p.acidName}, to two significant figures? ${SCI_TIP}`,
      parts: [sigPart(ka, 2, { label: '$K_a =$' })],
      calculator: true,
      hints: ['Find $x = [\\ce{H3O+}] = 10^{-\\text{pH}}$. The conjugate base has the same concentration.', 'At equilibrium the acid is $c - x$, so $K_a = \\dfrac{x^2}{c - x}$. Keep the unrounded $x$ until the end.'],
      solution: [
        `$x = [\\ce{H3O+}] = [${ce(p.base)}] = 10^{-${ph.toFixed(2)}} = ${sciTex(x, 3)}\\ \\text{mol/L}$`,
        `$[${ce(p.acid)}] = ${C} - ${sciTex(x, 3)} = ${sigTex(c - x, 3)}\\ \\text{mol/L}$`,
        `$K_a = \\dfrac{(${sciTex(x, 3)})^2}{${sigTex(c - x, 3)}} = ${sciTex(ka, 2)}$`,
      ],
    };
  }
  const variant = rng.int(0, 2);
  if (variant === 0) {
    // A weak base: Kb and percent ionisation from the pH.
    const b = rng.pick(WEAK_BASES.filter((w) => w.kb > 1e-7));
    const cb = rng.pick([0.05, 0.1, 0.15, 0.2, 0.25, 0.5]);
    const phb = Math.round((14 - pOf(exactX(b.kb, cb))) * 100) / 100;
    const poh = 14 - phb;
    const oh = 10 ** -poh;
    const kb = (oh * oh) / (cb - oh);
    const pct = (100 * oh) / cb;
    const a = pctAnswer(pct);
    return {
      prompt: `A $${sigTex(cb, 3)}\\ \\text{mol/L}$ solution of ${b.name}, ${$(b.base)}, has a pH of ${phb.toFixed(2)} at $25^\\circ\\text{C}$. (a) What is $K_b$, to two significant figures? (b) What percent of the base has reacted with water, ${a.phrase}? ${PH_SUM} ${SCI_TIP}`,
      parts: [sigPart(kb, 2, { label: '(a) $K_b =$' }), { ...a.part, label: '(b)' }],
      calculator: true,
      hints: ['A base makes $\\ce{OH-}$: find the pOH, then $[\\ce{OH-}] = 10^{-\\text{pOH}}$.', '$K_b = \\dfrac{x^2}{c - x}$ with $x = [\\ce{OH-}]$; the percent is $\\dfrac{x}{c} \\times 100\\%$.'],
      solution: [
        `$\\text{pOH} = 14.00 - ${phb.toFixed(2)} = ${poh.toFixed(2)}$, so $x = [\\ce{OH-}] = 10^{-${poh.toFixed(2)}} = ${sciTex(oh, 3)}\\ \\text{mol/L}$`,
        `$K_b = \\dfrac{(${sciTex(oh, 3)})^2}{${sigTex(cb, 3)} - ${sciTex(oh, 3)}} = ${sciTex(kb, 2)}$`,
        `Percent: $\\dfrac{${sciTex(oh, 3)}}{${sigTex(cb, 3)}} \\times 100\\% = ${a.shown}\\%$`,
      ],
    };
  }
  if (variant === 1) {
    // Working backwards from the percent ionisation.
    const pctGiven = sigRound((100 * exactX(p.ka!, c)) / c, 3);
    const xx = (pctGiven / 100) * c;
    const ka = (xx * xx) / (c - xx);
    const ph2 = pOf(xx);
    return {
      prompt: `In a $${C}\\ \\text{mol/L}$ solution of ${p.acidName}, ${$(p.acid)}, ${sigTex(pctGiven, 3)}% of the acid molecules are ionised at $25^\\circ\\text{C}$. (a) What is the pH, to two decimal places? (b) What is $K_a$, to two significant figures? ${PCT} ${SCI_TIP}`,
      parts: [phPart(ph2, '(a) $\\text{pH} =$'), sigPart(ka, 2, { label: '(b) $K_a =$' })],
      calculator: true,
      hints: ['$[\\ce{H3O+}]$ is that percent of the initial concentration.', 'Then $\\text{pH} = -\\log[\\ce{H3O+}]$ and $K_a = \\dfrac{x^2}{c - x}$.'],
      solution: [
        `$x = [\\ce{H3O+}] = \\dfrac{${sigTex(pctGiven, 3)}}{100} \\times ${C} = ${sciTex(xx, 3)}\\ \\text{mol/L}$`,
        `$\\text{pH} = -\\log(${sciTex(xx, 3)}) = ${ph2.toFixed(2)}$`,
        `$K_a = \\dfrac{(${sciTex(xx, 3)})^2}{${C} - ${sciTex(xx, 3)}} = ${sciTex(ka, 2)}$`,
      ],
    };
  }
  // Identify an unknown acid from its Ka.
  for (;;) {
    const options = rng.shuffle(PH_ACIDS.filter((o) => o !== p)).slice(0, 3);
    if (![p, ...options].every((a, i, all) => all.every((b, j) => i === j || Math.max(a.ka!, b.ka!) / Math.min(a.ka!, b.ka!) >= 2.5))) continue;
    const ka = (x * x) / (c - x);
    const table = ['| Acid | $K_a$ at $25^\\circ\\text{C}$ |', '|---|---|', ...[p, ...options].sort((a, b) => b.ka! - a.ka!).map((a) => `| ${a.acidName}, $${ce(a.acid)}$ | $${sciTex(a.ka!, 2)}$ |`)].join('\n');
    return {
      prompt: `A $${C}\\ \\text{mol/L}$ solution of an unknown weak monoprotic acid has a pH of ${ph.toFixed(2)} at $25^\\circ\\text{C}$. (a) What is its $K_a$, to two significant figures? (b) Which acid in the table could it be?\n\n${table}\n\n${SCI_TIP}`,
      parts: [sigPart(ka, 2, { label: '(a) $K_a =$' }), part(mc(rng, cap(p.acidName), options.map((o) => cap(o.acidName))), { label: '(b)' })],
      calculator: true,
      hints: ['$x = [\\ce{H3O+}] = 10^{-\\text{pH}}$, and $K_a = \\dfrac{x^2}{c - x}$.', 'Pick the acid whose $K_a$ is closest to yours.'],
      solution: [
        `$x = 10^{-${ph.toFixed(2)}} = ${sciTex(x, 3)}\\ \\text{mol/L}$`,
        `$K_a = \\dfrac{(${sciTex(x, 3)})^2}{${C} - ${sciTex(x, 3)}} = ${sciTex(ka, 2)}$`,
        `The closest value in the table is ${p.acidName}, $K_a = ${sciTex(p.ka!, 2)}$.`,
      ],
    };
  }
}

// ---------------------------------------------------------------------------- lesson 4.8: buffers

interface Buffer {
  acid: string;
  base: string;
  ka: number;
  acidSrc: { name: string; f: string };
  baseSrc: { name: string; f: string };
  /** Kb given instead of Ka (ammonia). */
  kb?: number;
}
const BUFFERS: Buffer[] = [
  { acid: 'CH3COOH', base: 'CH3COO^-', ka: 1.8e-5, acidSrc: { name: 'acetic acid', f: 'CH3COOH' }, baseSrc: { name: 'sodium acetate', f: 'NaCH3COO' } },
  { acid: 'HF', base: 'F^-', ka: 6.6e-4, acidSrc: { name: 'hydrofluoric acid', f: 'HF' }, baseSrc: { name: 'sodium fluoride', f: 'NaF' } },
  { acid: 'HNO2', base: 'NO2^-', ka: 5.6e-4, acidSrc: { name: 'nitrous acid', f: 'HNO2' }, baseSrc: { name: 'sodium nitrite', f: 'NaNO2' } },
  { acid: 'HCOOH', base: 'HCOO^-', ka: 1.8e-4, acidSrc: { name: 'methanoic acid', f: 'HCOOH' }, baseSrc: { name: 'sodium methanoate', f: 'NaHCOO' } },
  { acid: 'NH4^+', base: 'NH3', ka: 5.6e-10, kb: 1.8e-5, acidSrc: { name: 'ammonium chloride', f: 'NH4Cl' }, baseSrc: { name: 'ammonia', f: 'NH3' } },
  { acid: 'H2CO3', base: 'HCO3^-', ka: 4.5e-7, acidSrc: { name: 'carbonic acid', f: 'H2CO3' }, baseSrc: { name: 'sodium hydrogen carbonate', f: 'NaHCO3' } },
  { acid: 'H2PO4^-', base: 'HPO4^2-', ka: 6.2e-8, acidSrc: { name: 'sodium dihydrogen phosphate', f: 'NaH2PO4' }, baseSrc: { name: 'sodium hydrogen phosphate', f: 'Na2HPO4' } },
  { acid: 'HClO', base: 'ClO^-', ka: 4.0e-8, acidSrc: { name: 'hypochlorous acid', f: 'HClO' }, baseSrc: { name: 'sodium hypochlorite', f: 'NaClO' } },
  { acid: 'C6H5COOH', base: 'C6H5COO^-', ka: 6.3e-5, acidSrc: { name: 'benzoic acid', f: 'C6H5COOH' }, baseSrc: { name: 'sodium benzoate', f: 'NaC6H5COO' } },
  { acid: 'HCN', base: 'CN^-', ka: 6.2e-10, acidSrc: { name: 'hydrocyanic acid', f: 'HCN' }, baseSrc: { name: 'sodium cyanide', f: 'NaCN' } },
];
const NOT_BUFFERS: Array<[string, string, string, string]> = [
  ['hydrochloric acid', 'HCl', 'sodium chloride', 'NaCl'],
  ['nitric acid', 'HNO3', 'potassium nitrate', 'KNO3'],
  ['sodium hydroxide', 'NaOH', 'sodium chloride', 'NaCl'],
  ['hydrochloric acid', 'HCl', 'acetic acid', 'CH3COOH'],
  ['sodium chloride', 'NaCl', 'potassium chloride', 'KCl'],
  ['sodium hydroxide', 'NaOH', 'ammonia', 'NH3'],
  ['acetic acid', 'CH3COOH', 'hydrofluoric acid', 'HF'],
  ['sodium acetate', 'NaCH3COO', 'sodium fluoride', 'NaF'],
  ['nitric acid', 'HNO3', 'sodium nitrate', 'NaNO3'],
];
const mixName = (a: string, af: string, b: string, bf: string) => `${a}, $${ce(`${af}(aq)`)}$, and ${b}, $${ce(`${bf}(aq)`)}$`;
const BUFFER_DEF = 'A buffer holds a weak acid and its conjugate base in similar amounts.';

function buffer(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const b = rng.pick(BUFFERS);
    const right = cap(mixName(b.acidSrc.name, b.acidSrc.f, b.baseSrc.name, b.baseSrc.f));
    const wrong = rng.shuffle(NOT_BUFFERS).slice(0, 3).map(([a, af, c, cf]) => cap(mixName(a, af, c, cf)));
    return {
      prompt: 'Each solution contains equal amounts of the two substances named. Which solution is a buffer?',
      parts: [part(mc(rng, right, wrong))],
      hints: [BUFFER_DEF, 'A strong acid with its own salt is not a buffer: its anion is far too weak a base to react with added acid.'],
      solution: [`${right}: ${$(b.acid)} is a weak acid and ${$(b.base)} is its conjugate base.`, 'The other mixtures lack a weak acid with its conjugate base.'],
    };
  }
  if (d === 2) {
    const b = rng.pick(BUFFERS);
    const addAcid = rng.chance(0.5);
    const what = addAcid ? 'a small amount of hydrochloric acid' : 'a small amount of sodium hydroxide solution';
    const toBase = `$\\ce{${st(b.base)} + H3O^+(aq) -> ${st(b.acid)} + H2O(l)}$`;
    const toAcid = `$\\ce{${st(b.acid)} + OH^-(aq) -> ${st(b.base)} + H2O(l)}$`;
    const ionise = transfer(b.acid, 'H2O', b.base, 'H3O^+');
    const hydrolyse = transfer('H2O', b.base, 'OH^-', b.acid);
    const intro = `A buffer contains ${mixName(b.acidSrc.name, b.acidSrc.f, b.baseSrc.name, b.baseSrc.f)}.`;
    if (rng.chance(0.4)) {
      const right = addAcid ? `$${conc(b.base)}$ decreases a little and $${conc(b.acid)}$ increases a little.` : `$${conc(b.acid)}$ decreases a little and $${conc(b.base)}$ increases a little.`;
      const wrong = [
        addAcid ? `$${conc(b.acid)}$ decreases a little and $${conc(b.base)}$ increases a little.` : `$${conc(b.base)}$ decreases a little and $${conc(b.acid)}$ increases a little.`,
        'Both concentrations stay exactly the same.',
        `Both $${conc(b.acid)}$ and $${conc(b.base)}$ decrease.`,
      ];
      return {
        prompt: `${intro} When ${what} is added, the pH hardly changes. What happens to the concentrations of the buffer's acid and base?`,
        parts: [part(mc(rng, right, wrong))],
        hints: [addAcid ? 'Added $\\ce{H3O+}$ is used up by the base of the buffer.' : 'Added $\\ce{OH-}$ is used up by the acid of the buffer.', 'Whatever reacts turns into its conjugate.'],
        solution: [addAcid ? toBase : toAcid, right],
      };
    }
    const right = addAcid ? toBase : toAcid;
    return {
      prompt: `${intro} Which equation shows how the buffer keeps the pH nearly constant when ${what} is added?`,
      parts: [part(mc(rng, right, [addAcid ? toAcid : toBase, ionise, hydrolyse]))],
      hints: [addAcid ? 'Added acid means extra $\\ce{H3O+}$. Which buffer particle can take a proton from it?' : 'Added base means extra $\\ce{OH-}$. Which buffer particle can give it a proton?', 'The reaction goes almost to completion, so the added ion is used up.'],
      solution: [addAcid ? `The base of the buffer, ${$(b.base)}, reacts with the added $\\ce{H3O+}$:` : `The acid of the buffer, ${$(b.acid)}, reacts with the added $\\ce{OH-}$:`, right, 'The added ion is used up, and the ratio of acid to base changes only a little, so the pH hardly changes.'],
    };
  }
  if (rng.chance(0.55)) {
    // The pH of a buffer.
    const b = rng.pick(BUFFERS.filter((x) => x.acid !== 'H2CO3'));
    const ca = rng.int(5, 30) / 100;
    let cb = ca;
    while (Math.abs(cb - ca) < 0.02) cb = rng.int(5, 30) / 100;
    const ka = b.kb ? KW / b.kb : b.ka;
    const h = (ka * ca) / cb;
    const ph = pOf(h);
    const rule = '$[\\ce{H3O+}] = K_a \\times \\dfrac{[\\text{acid}]}{[\\text{conjugate base}]}$';
    return {
      prompt: `A buffer contains $${sigTex(ca, 2)}\\ \\text{mol/L}$ of ${b.acidSrc.name}, $${ce(b.acidSrc.f)}$, and $${sigTex(cb, 2)}\\ \\text{mol/L}$ of ${b.baseSrc.name}, $${ce(b.baseSrc.f)}$. What is its pH, to two decimal places? At $25^\\circ\\text{C}$, ${b.kb ? `$K_b$ for ${$(b.base)} is $${sciTex(b.kb, 2)}$ and ${KW_TEXT}` : `$K_a$ for ${$(b.acid)} is $${sciTex(b.ka, 2)}$`}. In a buffer, ${rule}. ${PH_DEF}.`,
      parts: [phPart(ph)],
      calculator: true,
      hints: [b.kb ? `The acid of this buffer is ${$(b.acid)}. Find its $K_a$ from $K_aK_b = K_w$ first.` : `The acid is ${$(b.acid)} and the conjugate base is ${$(b.base)}.`, 'Substitute into the buffer equation, then take $-\\log$.'],
      solution: [
        ...(b.kb ? [`$K_a(${ce(b.acid)}) = \\dfrac{1.0 \\times 10^{-14}}{${sciTex(b.kb, 2)}} = ${sciTex(ka, 3)}$`] : []),
        `$[\\ce{H3O+}] = ${sciTex(ka, b.kb ? 3 : 2)} \\times \\dfrac{${sigTex(ca, 2)}}{${sigTex(cb, 2)}} = ${sciTex(h, 3)}\\ \\text{mol/L}$`,
        `$\\text{pH} = -\\log(${sciTex(h, 3)}) = ${ph.toFixed(2)}$`,
      ],
    };
  }
  // Choose the buffer for a target pH.
  for (;;) {
    const four = rng.shuffle(BUFFERS.filter((x) => !x.kb)).slice(0, 4);
    const pk = four.map((x) => pOf(x.ka));
    const sorted = [...pk].sort((a, b) => a - b);
    if (sorted.some((v, i) => i > 0 && v - sorted[i - 1] < 1.2)) continue;
    const i = rng.int(0, 3);
    const target = Math.round((pk[i] + rng.float(-0.4, 0.4, 1)) * 10) / 10;
    const b = four[i];
    const show = (x: Buffer) => cap(mixName(x.acidSrc.name, x.acidSrc.f, x.baseSrc.name, x.baseSrc.f));
    const table: TableFigure = { type: 'table', headers: ['Weak acid', '$K_a$ at $25^\\circ\\text{C}$'], rows: four.map((x) => [`$${ce(x.acid)}$`, `$${sciTex(x.ka, 2)}$`]) };
    return {
      prompt: `A buffer is needed to hold the pH near ${target.toFixed(1)}. Which mixture, with equal amounts of each substance, should be used? A buffer works best when the pH is close to the $\\text{p}K_a$ of its weak acid, where $\\text{p}K_a = -\\log K_a$.`,
      figure: table,
      parts: [part(mc(rng, show(b), four.filter((x) => x !== b).map(show)))],
      calculator: true,
      hints: ['Work out $\\text{p}K_a = -\\log K_a$ for each weak acid.', `Choose the acid whose $\\text{p}K_a$ is closest to ${target.toFixed(1)}.`],
      solution: [four.map((x, j) => `$\\text{p}K_a(${ce(x.acid)}) = ${pk[j].toFixed(2)}$`).join(', '), `${$(b.acid)} has the $\\text{p}K_a$ closest to ${target.toFixed(1)}, so use ${show(b).replace(/^./, (s) => s.toLowerCase())}.`],
    };
  }
}

// ---------------------------------------------------------------------------- lesson 4.8: titration curves

type CurveType = 'SA' | 'WA' | 'SB' | 'WB';
const CURVE_TYPES: Record<CurveType, string> = {
  SA: 'A strong acid titrated with a strong base',
  WA: 'A weak acid titrated with a strong base',
  SB: 'A strong base titrated with a strong acid',
  WB: 'A weak base titrated with a strong acid',
};
// Acids and bases whose equivalence points fall well inside an indicator's range.
const T_WEAK_ACIDS = [
  { name: 'acetic acid', f: 'CH3COOH', ka: 1.8e-5 },
  { name: 'benzoic acid', f: 'C6H5COOH', ka: 6.3e-5 },
  { name: 'hypochlorous acid', f: 'HClO', ka: 4.0e-8 },
];
const T_WEAK_BASES = [
  { name: 'ammonia', f: 'NH3', kb: 1.8e-5 },
  { name: 'hydrazine', f: 'N2H4', kb: 1.3e-6 },
];

interface Titration {
  type: CurveType;
  name: string;
  f: string;
  a: Analyte;
  ca: number;
  va: number;
  ct: number;
  base: boolean;
  titrant: string;
  titrantName: string;
  veq: number;
  /** Ka of the weak acid (or of the weak base's conjugate acid). */
  ka?: number;
}

function pickTitration(rng: Rng, type: CurveType): Titration {
  const veq = rng.pick([15, 20, 25, 30, 35]);
  const va = rng.pick([20, 25]);
  const ct = rng.pick([0.1, 0.1, 0.2, 0.15]);
  const ca = (ct * veq) / va;
  const byBase = type === 'SA' || type === 'WA';
  const titrant = byBase ? rng.pick(['NaOH', 'KOH']) : rng.pick(['HCl', 'HNO3']);
  const titrantName = { NaOH: 'sodium hydroxide', KOH: 'potassium hydroxide', HCl: 'hydrochloric acid', HNO3: 'nitric acid' }[titrant]!;
  const common = { type, ca, va, ct, base: byBase, titrant, titrantName, veq };
  if (type === 'SA') {
    const x = rng.pick([{ name: 'hydrochloric acid', f: 'HCl' }, { name: 'nitric acid', f: 'HNO3' }, { name: 'hydrobromic acid', f: 'HBr' }]);
    return { ...common, ...x, a: { kas: [1e8], z0: 0, cations: 0 } };
  }
  if (type === 'WA') {
    const x = rng.pick(T_WEAK_ACIDS);
    return { ...common, name: x.name, f: x.f, ka: x.ka, a: { kas: [x.ka], z0: 0, cations: 0 } };
  }
  if (type === 'SB') {
    const x = rng.pick([{ name: 'sodium hydroxide', f: 'NaOH' }, { name: 'potassium hydroxide', f: 'KOH' }, { name: 'lithium hydroxide', f: 'LiOH' }]);
    return { ...common, ...x, a: { kas: [], z0: 0, cations: 1 } };
  }
  const x = rng.pick(T_WEAK_BASES);
  return { ...common, name: x.name, f: x.f, ka: KW / x.kb, a: { kas: [KW / x.kb], z0: 1, cations: 0 } };
}
const tPh = (t: Titration, v: number) => titrationPh(t.a, t.ca, t.va, t.ct, t.base, v);
const tFigure = (t: Titration, eqs = [t.veq]) => curveFigure(titrationPoints(t.a, t.ca, t.va, t.ct, t.base, 50, eqs), t.titrant, 50, 'pH against the volume of titrant added');
const tIntro = (t: Titration) => `The graph shows the titration of $${t.va.toFixed(2)}\\ \\text{mL}$ of ${t.name}, $${ce(`${t.f}(aq)`)}$, with $${t.ct.toFixed(3)}\\ \\text{mol/L}$ ${t.titrantName}, $${ce(`${t.titrant}(aq)`)}$.`;

/** An indicator whose range contains the pH (as centrally as possible), and three whose ranges stay clear of it. */
function indicatorChoice(rng: Rng, ph: number): { right: Indicator; list: Indicator[] } {
  const margin = (i: Indicator) => Math.min(ph - i.lo, i.hi - ph);
  const inside = INDICATORS.filter((i) => margin(i) >= 0.15);
  const right = inside.length ? rng.pick(inside) : [...INDICATORS].sort((a, b) => margin(b) - margin(a))[0];
  const others = rng.shuffle(INDICATORS.filter((i) => ph < i.lo - 0.2 || ph > i.hi + 0.2)).slice(0, 3);
  return { right, list: [right, ...others].sort((a, b) => a.lo - b.lo) };
}
const INDICATOR_RULE = 'Choose the indicator whose colour-change range includes the pH at the equivalence point.';

function titrationCurve(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const type = rng.pick(['SA', 'WA', 'SB', 'WB'] as CurveType[]);
    const t = pickTitration(rng, type);
    const eqPh = tPh(t, t.veq);
    if (rng.chance(0.5)) {
      return {
        prompt: `${tIntro(t)} What volume of ${t.titrantName} has been added at the equivalence point, to the nearest millilitre?`,
        figure: tFigure(t),
        parts: [numPart(t.veq, { decimals: 0, tolerance: 1, suffix: 'mL' })],
        hints: ['The equivalence point is in the middle of the steep, nearly vertical part of the curve.', 'Read straight down from it to the volume axis.'],
        solution: [`The steep part is centred on ${q(t.veq, 'mL')}, at about pH ${eqPh.toFixed(1)}.`, `The equivalence point is at ${q(t.veq, 'mL')}.`],
      };
    }
    const start = tPh(t, 0);
    return {
      prompt: `The graph shows a titration curve: the pH of the solution in the flask as the titrant is added. Which titration does it show?`,
      figure: tFigure(t),
      parts: [part(fixedChoice(Object.values(CURVE_TYPES), ['SA', 'WA', 'SB', 'WB'].indexOf(type)))],
      hints: ['If the curve starts low and rises, an acid is in the flask; if it starts high and falls, a base is.', 'A strong acid and a strong base have their equivalence point at pH 7. A weak acid gives an equivalence point above 7, and a weak base one below 7.'],
      solution: [
        `The curve starts at about pH ${start.toFixed(1)} and ${t.base ? 'rises' : 'falls'}, so ${t.base ? 'an acid is in the flask and a base is being added' : 'a base is in the flask and an acid is being added'}.`,
        `The equivalence point is at about pH ${eqPh.toFixed(1)}: ${Math.abs(eqPh - 7) < 0.3 ? 'pH 7, so both are strong' : eqPh > 7 ? 'above 7, so the acid is weak' : 'below 7, so the base is weak'}.`,
        `${CURVE_TYPES[type]}.`,
      ],
    };
  }
  if (d === 2) {
    const type = rng.pick(['SA', 'WA', 'WA', 'SB', 'WB', 'WB'] as CurveType[]);
    const t = pickTitration(rng, type);
    const eqPh = tPh(t, t.veq);
    if (rng.chance(0.5)) {
      const { right, list } = indicatorChoice(rng, eqPh);
      return {
        prompt: `${tIntro(t)} Which indicator should be used for this titration? ${INDICATOR_RULE}\n\n${indicatorTable(list)}`,
        figure: tFigure(t),
        parts: [part(mc(rng, cap(right.name), list.filter((i) => i !== right).map((i) => cap(i.name))))],
        hints: ['Find the equivalence point: the middle of the steep part of the curve.', 'Read the pH there, and find the indicator range that includes it.'],
        solution: [`The equivalence point is at ${q(t.veq, 'mL')} and about pH ${eqPh.toFixed(1)}.`, `${cap(right.name)} changes colour from pH ${right.lo.toFixed(1)} to ${right.hi.toFixed(1)}, which includes ${eqPh.toFixed(1)}.`],
      };
    }
    const intro = tIntro(t).replace(`${t.name}, $${ce(`${t.f}(aq)`)}$,`, `${t.name}, $${ce(`${t.f}(aq)`)}$, of unknown concentration,`);
    return {
      prompt: `${intro} Use the equivalence point to find the concentration of the ${t.name}, to three significant figures. One mole of ${$(t.titrant)} reacts with one mole of ${$(t.f)}.`,
      figure: tFigure(t),
      parts: [sigPart(t.ca, 3, { suffix: 'mol/L' })],
      calculator: true,
      hints: ['Read the volume of titrant at the equivalence point: the middle of the steep part.', 'At the equivalence point the moles of titrant equal the moles in the flask: $n = cV$, then $c = \\dfrac{n}{V}$.'],
      solution: [
        `Equivalence point: ${q(t.veq, 'mL')} of ${t.titrantName}.`,
        `$n(${ce(t.titrant)}) = ${t.ct.toFixed(3)} \\times ${(t.veq / 1000).toFixed(4)} = ${sigTex((t.ct * t.veq) / 1000, 3)}\\ \\text{mol} = n(${ce(t.f)})$`,
        `$c = \\dfrac{${sigTex((t.ct * t.veq) / 1000, 3)}}{${(t.va / 1000).toFixed(5)}} = ${sigTex(t.ca, 3)}\\ \\text{mol/L}$`,
      ],
    };
  }
  const variant = rng.int(0, 2);
  if (variant === 0) {
    // A polyprotic acid: two equivalence points.
    const acid = rng.pick([
      { name: 'phosphoric acid', f: 'H3PO4', kas: [6.9e-3, 6.2e-8, 4.8e-13] },
      { name: 'sulfurous acid', f: 'H2SO3', kas: [1.4e-2, 6.3e-8] },
    ]);
    const v1 = rng.pick([10, 15, 20]);
    const va = rng.pick([20, 25]);
    const ct = rng.pick([0.1, 0.2]);
    const ca = (ct * v1) / va;
    const a: Analyte = { kas: acid.kas, z0: 0, cations: 0 };
    const titrant = rng.pick(['NaOH', 'KOH']);
    const tName = titrant === 'NaOH' ? 'sodium hydroxide' : 'potassium hydroxide';
    const fig = curveFigure(titrationPoints(a, ca, va, ct, true, 50, [v1, 2 * v1]), titrant, 50, 'pH against the volume of titrant added');
    return {
      prompt: `The graph shows the titration of $${va.toFixed(2)}\\ \\text{mL}$ of ${acid.name}, $${ce(`${acid.f}(aq)`)}$, with $${ct.toFixed(3)}\\ \\text{mol/L}$ ${tName}. The acid loses its protons one at a time. (a) What volume of ${tName} has been added at the first equivalence point, to the nearest millilitre? (b) What is the concentration of the ${acid.name}, to three significant figures?`,
      figure: fig,
      parts: [numPart(v1, { decimals: 0, tolerance: 1, suffix: 'mL', label: '(a)' }), sigPart(ca, 3, { suffix: 'mol/L', label: '(b)' })],
      calculator: true,
      hints: ['A polyprotic acid gives one steep rise for each proton removed. The first one is at the smaller volume.', `At the first equivalence point, one mole of ${$(titrant)} has reacted with each mole of ${$(acid.f)}: $${ce(`${acid.f} + OH^- -> ${acid.f === 'H3PO4' ? 'H2PO4^-' : 'HSO3^-'} + H2O`)}$.`],
      solution: [
        `The first steep rise is centred on ${q(v1, 'mL')}; the second is at ${q(2 * v1, 'mL')}, twice as far.`,
        `$n(${ce(titrant)}) = ${ct.toFixed(3)} \\times ${(v1 / 1000).toFixed(4)} = ${sigTex((ct * v1) / 1000, 3)}\\ \\text{mol} = n(${ce(acid.f)})$`,
        `$c = \\dfrac{${sigTex((ct * v1) / 1000, 3)}}{${(va / 1000).toFixed(5)}} = ${sigTex(ca, 3)}\\ \\text{mol/L}$`,
      ],
    };
  }
  if (variant === 1) {
    // Sodium carbonate titrated with hydrochloric acid: an indicator for each equivalence point.
    const v1 = rng.pick([10, 15, 20]);
    const va = 25;
    const ct = 0.1;
    const ca = (ct * v1) / va;
    const a: Analyte = { kas: [4.5e-7, 4.7e-11], z0: 0, cations: 2 };
    const ph1 = titrationPh(a, ca, va, ct, false, v1);
    const ph2 = titrationPh(a, ca, va, ct, false, 2 * v1);
    const pick = (ph: number) => INDICATORS.filter((i) => i.lo + 0.1 <= ph && ph <= i.hi - 0.1);
    const r1 = rng.pick(pick(ph1));
    const r2 = rng.pick(pick(ph2));
    const clear = (i: Indicator, ph: number) => ph < i.lo - 0.2 || ph > i.hi + 0.2;
    const others = rng.shuffle(INDICATORS.filter((i) => clear(i, ph1) && clear(i, ph2))).slice(0, 2);
    const list = [r1, r2, ...others].sort((x, y) => x.lo - y.lo);
    const fig = curveFigure(titrationPoints(a, ca, va, ct, false, 50, [v1, 2 * v1]), 'HCl', 50, 'pH against the volume of titrant added');
    const names = list.map((i) => cap(i.name));
    return {
      prompt: `The graph shows the titration of $25.00\\ \\text{mL}$ of sodium carbonate, $\\ce{Na2CO3(aq)}$, with $0.100\\ \\text{mol/L}$ hydrochloric acid. The carbonate ion takes two protons, one at a time: first $\\ce{CO3^2- + H3O+ -> HCO3- + H2O}$, then $\\ce{HCO3- + H3O+ -> H2CO3 + H2O}$. Which indicator should be used for each equivalence point? ${INDICATOR_RULE}\n\n${indicatorTable(list)}`,
      figure: fig,
      parts: [part(mc(rng, cap(r1.name), names.filter((n) => n !== cap(r1.name))), { label: 'First equivalence point' }), part(mc(rng, cap(r2.name), names.filter((n) => n !== cap(r2.name))), { label: 'Second equivalence point' })],
      hints: ['Find the two steep drops. The middle of each is an equivalence point.', 'Read the pH at each one and match it to an indicator range.'],
      solution: [
        `First equivalence point: ${q(v1, 'mL')}, about pH ${ph1.toFixed(1)}. ${cap(r1.name)} (${r1.lo.toFixed(1)} to ${r1.hi.toFixed(1)}) includes it.`,
        `Second equivalence point: ${q(2 * v1, 'mL')}, about pH ${ph2.toFixed(1)}. ${cap(r2.name)} (${r2.lo.toFixed(1)} to ${r2.hi.toFixed(1)}) includes it.`,
      ],
    };
  }
  // A weak acid: Ka from the pH at half the equivalence volume.
  const t = pickTitration(rng, 'WA');
  const half = t.veq / 2;
  const vols = [...new Set([5, half, t.veq - 5, t.veq + 5].filter((v) => v > 0 && v < 50))].sort((a, b) => a - b);
  const reading = (v: number) => Math.round(tPh(t, v) * 100) / 100;
  const phHalf = reading(half);
  const ka = 10 ** -phHalf;
  const table = ['| Volume of titrant (mL) | pH |', '|---|---|', ...vols.map((v) => `| ${v.toFixed(2)} | ${reading(v).toFixed(2)} |`)].join('\n');
  return {
    prompt: `${tIntro(t)} A pH meter gave the readings in the table. Halfway to the equivalence point, half of the acid has been turned into its conjugate base, so $[\\text{acid}] = [\\text{conjugate base}]$ and $K_a = [\\ce{H3O+}]$. Use the graph and the table to find $K_a$ for ${t.name}, to two significant figures.\n\n${table}\n\n${SCI_TIP}`,
    figure: tFigure(t),
    parts: [sigPart(ka, 2, { label: '$K_a =$' })],
    calculator: true,
    hints: ['Read the equivalence point volume from the graph, and halve it.', 'Find the pH at that volume in the table; then $K_a = [\\ce{H3O+}] = 10^{-\\text{pH}}$.'],
    solution: [
      `The equivalence point is at ${q(t.veq, 'mL')}, so halfway is ${q(half.toFixed(2), 'mL')}.`,
      `There the pH is ${phHalf.toFixed(2)}, so $K_a = [\\ce{H3O+}] = 10^{-${phHalf.toFixed(2)}} = ${sciTex(ka, 2)}$.`,
    ],
  };
}

export const ACID_BASE_SKILLS: SkillDef[] = [
  skill({ id: 'c30-bl-identify', name: 'Brønsted–Lowry acids and bases', description: 'Identify the Brønsted–Lowry acid, base and conjugate pairs in a reaction, including amphiprotic particles.', outcomes: ['12-D2'], lessonId: L(4), format: 'mc', gen: blIdentify }),
  skill({ id: 'c30-conjugate', name: 'Conjugate acids and bases', description: 'Write the formula of the conjugate acid or base of a particle, including both conjugates of an amphiprotic particle.', outcomes: ['12-D2'], lessonId: L(4), gen: conjugate }),
  skill({ id: 'c30-acid-base-predict', name: 'Predicting acid–base reactions', description: 'Use a table of relative acid strengths to find the strongest acid and base, write their reaction and say which side is favoured.', outcomes: ['12-D2'], lessonId: L(5), format: 'mc', gen: acidBasePredict }),
  skill({ id: 'c30-ka-expression', name: 'Ka and Kb expressions', description: 'Write Ka and Kb expressions, and compare the strengths of acids, bases and their conjugates.', outcomes: ['12-D2'], lessonId: L(6), format: 'mc', gen: kaExpression }),
  skill({ id: 'c30-ka-kb', name: 'Ka × Kb = Kw', description: 'Use Ka × Kb = Kw to find the Kb of a conjugate base or the Ka of a conjugate acid, and decide how an amphiprotic ion behaves.', outcomes: ['12-D2'], lessonId: L(6), calculator: true, gen: kaKb }),
  skill({ id: 'c30-weak-ph', name: 'pH of weak acids and bases', description: 'Calculate the pH of a weak acid, weak base or salt solution, with the approximation or the quadratic formula.', outcomes: ['12-D2'], lessonId: L(7), calculator: true, gen: weakPh }),
  skill({ id: 'c30-ka-from-ph', name: 'Ka and percent ionisation from pH', description: 'Find Ka or Kb and the percent ionisation from a measured pH, and work backwards from the percent ionisation.', outcomes: ['12-D2'], lessonId: L(7), calculator: true, gen: kaFromPh }),
  skill({ id: 'c30-buffer', name: 'Buffers', description: 'Identify buffers, show how they react with added acid or base, find their pH and choose one for a target pH.', outcomes: ['12-D2'], lessonId: L(8), format: 'mc', gen: buffer }),
  skill({ id: 'c30-titration-curve', name: 'Titration curves', description: 'Read titration curves of strong, weak and polyprotic acids and bases, find concentrations and Ka from them, and choose indicators.', outcomes: ['12-D2'], lessonId: L(8), calculator: true, gen: titrationCurve }),
];
