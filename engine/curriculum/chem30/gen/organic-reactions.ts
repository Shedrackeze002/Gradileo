/**
 * Grade 12 Chemistry, Unit 3, lessons 3.5 to 3.7: addition, substitution and elimination,
 * esterification and polymerisation, and fossil fuels and combustion. Reactants and products are
 * skeletons (engine/chem/organic.ts), so their names and formulas agree, and every equation shown is
 * checked to balance; combustion equations take their coefficients from `balance()`.
 */
import { fixedChoice, mc, numPart, part, roundingPhrase, skill, type GenOutput } from '../../helpers.ts';
import { balance, isBalanced, molarMass, parseFormula } from '../../../chem/formula.ts';
import { condensed, hydrogens, isProper, molecularFormula, nameOf, type Halo, type Prefix, type Skeleton } from '../../../chem/organic.ts';
import { fmtFixed } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, Part, SkillDef } from '../../../types.ts';

const L = (n: number) => `c30-3-${n}`;
const cap = (s: string) => s[0].toUpperCase() + s.slice(1);
const ceMd = (s: string) => `$\\ce{${s}}$`;
const cf = (sk: Skeleton) => ceMd(condensed(sk));
const nm = (sk: Skeleton) => nameOf(sk).name;
const namePart = (sk: Skeleton, label?: string): Part => part({ kind: 'text', accepted: nameOf(sk).accepted }, { placeholder: 'IUPAC name', ...(label && { label }) });
const formulaPart = (f: string, label?: string): Part => part({ kind: 'formula', expected: f }, { placeholder: 'Formula', ...(label && { label }) });
const coef = (k: number) => (k === 1 ? '' : `${k}`);
/** A working value to four significant figures, as a solution writes it. */
const w = (v: number) => (Math.abs(v) >= 1e4 ? groups(Math.round(v)) : v.toPrecision(4));
/** A whole number with thin spaces between groups of three digits: 50\,000. */
function groups(v: number): string {
  const [i, f] = String(v).split('.');
  return i.replace(/\B(?=(\d{3})+(?!\d))/g, '\\,') + (f ? `.${f}` : '');
}
const TYPE_TIP = 'Type the name with its hyphens and commas, as in 1,2-dibromopropane or but-2-ene.';
const tipFor = (sk: Skeleton) => (/\d/.test(nm(sk)) ? ` ${TYPE_TIP}` : '');

function proper(make: () => Skeleton): Skeleton {
  for (let i = 0; i < 400; i++) {
    const sk = make();
    if (isProper(sk)) return sk;
  }
  throw new Error('No proper skeleton found.');
}
const subsOf = (sk: Skeleton) => sk.subs ?? [];

// ---------------------------------------------------------------------------- reactions on skeletons

type Reagent = 'H2' | 'Cl2' | 'Br2' | 'HCl' | 'HBr' | 'H2O';
const REAGENT_NAME: Record<Reagent, string> = { H2: 'hydrogen', Cl2: 'chlorine', Br2: 'bromine', HCl: 'hydrogen chloride', HBr: 'hydrogen bromide', H2O: 'water (steam)' };
const HALO: Record<'Cl' | 'Br', Halo> = { Cl: 'chloro', Br: 'bromo' };
/** The catalyst written over the arrow. */
const OVER: Partial<Record<Reagent, string>> = { H2: '[Pt]', H2O: '[H2SO4]' };
const MARKOVNIKOV = 'When the two carbons of the double bond differ, the hydrogen atom adds to the carbon that already has more hydrogen atoms.';

/** The carbon of the double bond that gets X when HX or water adds, or null when both choices give products with different names. */
function xCarbon(sk: Skeleton): number | null {
  const p = sk.bond!.at;
  const h = hydrogens(sk);
  if (h[p - 1] !== h[p]) return h[p - 1] < h[p] ? p : p + 1;
  return nm(addAt(sk, 'HBr', p)) === nm(addAt(sk, 'HBr', p + 1)) ? p : null;
}

function addAt(sk: Skeleton, r: Reagent, xAt: number): Skeleton {
  const b = sk.bond!;
  const rest = { chain: sk.chain, subs: [...subsOf(sk)], ...(b.order === 3 && { bond: { at: b.at, order: 2 as const } }) };
  if (r === 'Cl2' || r === 'Br2') rest.subs.push({ at: b.at, prefix: HALO[r === 'Cl2' ? 'Cl' : 'Br'] }, { at: b.at + 1, prefix: HALO[r === 'Cl2' ? 'Cl' : 'Br'] });
  if (r === 'HCl' || r === 'HBr') rest.subs.push({ at: xAt, prefix: HALO[r === 'HCl' ? 'Cl' : 'Br'] });
  if (r === 'H2O') return { ...rest, group: { kind: 'alcohol', at: xAt } };
  return rest;
}

/** The product of one addition across the multiple bond (an alkyne becomes an alkene). */
function addTo(sk: Skeleton, r: Reagent): Skeleton {
  const x = r === 'HCl' || r === 'HBr' || r === 'H2O' ? xCarbon(sk) : sk.bond!.at;
  if (x === null) throw new Error('Two products are possible.');
  return addAt(sk, r, x);
}

interface Rx {
  type: 'addition' | 'substitution' | 'elimination';
  /** The equation in mhchem, with condensed formulas. */
  ce: string;
  /** The same equation with molecular formulas. */
  molecular: string;
  why: string;
}

/** An equation, checked to balance: species as [condensed or formula text, molecular formula]. */
function equation(type: Rx['type'], left: Array<[string, string]>, over: string, right: Array<[string, string]>, why: string): Rx {
  if (!isBalanced(left.map((x) => x[1]), right.map((x) => x[1]), [...left, ...right].map(() => 1))) throw new Error(`Unbalanced: ${left.map((x) => x[1]).join(' + ')} -> ${right.map((x) => x[1]).join(' + ')}`);
  const shown = (xs: Array<[string, string]>, k: 0 | 1) => xs.map((x) => x[k].replace(/\^/g, '')).join(' + ');
  return { type, ce: `${shown(left, 0)} ->${over} ${shown(right, 0)}`, molecular: `${shown(left, 1)} ->${over} ${shown(right, 1)}`, why };
}
const sp = (sk: Skeleton, shown = condensed(sk)): [string, string] => [shown, molecularFormula(sk)];
/** Condensed formulas of a reactant and its product (numbered alike), written the same way round so the carbons line up. */
function aligned(r: Skeleton, p: Skeleton): [[string, string], [string, string]] {
  const shown = condensed(r);
  const fwd = condensed(r, { asWritten: true });
  const back = condensed(r, { asWritten: true, reverse: true });
  const pBack = condensed(p, { asWritten: true, reverse: true });
  const rev = shown === back && shown !== fwd ? true : shown === fwd && shown !== back ? false : condensed(p) === pBack;
  return [sp(r, condensed(r, { asWritten: true, reverse: rev })), sp(p, condensed(p, { asWritten: true, reverse: rev }))];
}
const small = (f: string): [string, string] => [f, f];
const ION: Record<string, [string, string]> = { OH: ['OH-', 'OH^-'], Cl: ['Cl-', 'Cl^-'], Br: ['Br-', 'Br^-'] };

function additionRx(alkene: Skeleton, r: Reagent): Rx {
  const p = addTo(alkene, r);
  const [a, b] = aligned(alkene, p);
  return equation('addition', [a, small(r)], OVER[r] ?? '', [b], `Two reactants join to make one product: the ${r === 'H2O' ? 'H and OH' : r === 'H2' ? 'two hydrogen atoms' : r[0] === 'H' ? `H and ${r.slice(1)}` : `two ${r.slice(0, -1)} atoms`} add across the ${alkene.bond!.order === 2 ? 'double' : 'triple'} bond. Addition.`);
}
function halogenationRx(alkane: Skeleton, x: 'Cl' | 'Br', at: number): Rx {
  const p: Skeleton = { ...alkane, subs: [...subsOf(alkane), { at, prefix: HALO[x] }] };
  const [a, b] = aligned(alkane, p);
  return equation('substitution', [a, small(`${x}2`)], '[{light}]', [b, small(`H${x}`)], `A ${x === 'Cl' ? 'chlorine' : 'bromine'} atom takes the place of a hydrogen atom, which leaves as $\\ce{H${x}}$. Substitution.`);
}
/** The one chlorine or bromine atom of a haloalkane, and its other substituents. */
function halogenOf(halo: Skeleton) {
  const h = subsOf(halo).find((s) => s.prefix === 'chloro' || s.prefix === 'bromo')!;
  return { h, x: h.prefix === 'chloro' ? ('Cl' as const) : ('Br' as const), rest: subsOf(halo).filter((s) => s !== h) };
}
function hydroxideSubRx(halo: Skeleton): Rx {
  const { h, x, rest } = halogenOf(halo);
  const alcohol: Skeleton = { chain: halo.chain, subs: rest, group: { kind: 'alcohol', at: h.at } };
  const [a, b] = aligned(halo, alcohol);
  return equation('substitution', [a, ION.OH], '', [b, ION[x]], `The $\\ce{OH}$ takes the place of the ${x === 'Cl' ? 'chlorine' : 'bromine'} atom, which leaves as $\\ce{${x}-}$. Substitution.`);
}
/** An alkene made by removing the group on carbon `at` and a hydrogen from carbon `to`. */
const alkeneFrom = (sk: Skeleton, at: number, to: number, keep: Skeleton['subs'] = []): Skeleton => ({ chain: sk.chain, subs: keep, bond: { at: Math.min(at, to), order: 2 } });
/** The alkene an alcohol or haloalkane gives by elimination, when only one alkene can form. */
function eliminationProduct(sk: Skeleton, at: number, keep: Skeleton['subs'] = []): Skeleton | null {
  const h = hydrogens(sk);
  const options = [at - 1, at + 1].filter((c) => c >= 1 && c <= sk.chain && h[c - 1] > 0).map((c) => alkeneFrom(sk, at, c, keep));
  if (!options.length) return null;
  const names = new Set(options.map(nm));
  return names.size === 1 ? options[0] : null;
}
function dehydrationRx(alcohol: Skeleton): Rx | null {
  const g = alcohol.group as { kind: 'alcohol'; at: number };
  const p = eliminationProduct(alcohol, g.at, subsOf(alcohol));
  if (!p) return null;
  const [a, b] = aligned(alcohol, p);
  return equation('elimination', [a], '[H2SO4][{heat}]', [b, small('H2O')], 'One reactant loses a small molecule, water: the $\\ce{OH}$ and a hydrogen from the next carbon leave, and a double bond forms. Elimination.');
}
function dehydrohalogenationRx(halo: Skeleton): Rx | null {
  const { h, x, rest } = halogenOf(halo);
  const p = eliminationProduct(halo, h.at, rest);
  if (!p) return null;
  const [a, b] = aligned(halo, p);
  return equation('elimination', [a, ION.OH], '[{ethanol, heat}]', [b, small('H2O'), ION[x]], `The ${x === 'Cl' ? 'chlorine' : 'bromine'} atom and a hydrogen from the next carbon are removed, and a double bond forms. Elimination.`);
}
const BENZENE_RX: Rx = { type: 'substitution', ce: 'C6H6 + Br2 ->[FeBr3] C6H5Br + HBr', molecular: 'C6H6 + Br2 ->[FeBr3] C6H5Br + HBr', why: 'A bromine atom takes the place of a hydrogen atom on the benzene ring, which keeps its stable ring. Substitution.' };

/** An alkene; with `oneProduct`, one that gives a single product when HX or water adds. */
const alkeneOf = (rng: Rng, chain: [number, number], oneProduct = false): Skeleton =>
  proper(() => {
    const n = rng.int(chain[0], chain[1]);
    const sk: Skeleton = { chain: n, bond: { at: rng.int(1, n - 1), order: 2 }, ...(n >= 4 && rng.chance(0.25) && { subs: [{ at: rng.int(2, n - 1), prefix: 'methyl' as Prefix }] }) };
    return oneProduct && xCarbon(sk) === null ? { chain: 0 } : sk;
  });
const haloOf = (rng: Rng, chain: [number, number]): Skeleton => {
  const n = rng.int(chain[0], chain[1]);
  return proper(() => ({ chain: n, subs: [{ at: rng.int(1, Math.ceil(n / 2)), prefix: rng.pick(['chloro', 'bromo'] as const) }] }));
};

/** A reaction of a given type, small molecules for d = 1. */
function reactionOf(rng: Rng, type: Rx['type'], d: Difficulty): Rx {
  for (;;) {
    if (type === 'addition') {
      if (d > 1 && rng.chance(0.2)) {
        const n = rng.int(2, 4);
        return additionRx({ chain: n, bond: { at: 1, order: 3 } }, rng.pick(['H2', 'Br2', 'Cl2'] as const));
      }
      const alkene = alkeneOf(rng, d === 1 ? [2, 3] : [2, 6]);
      const r = rng.pick<Reagent>(d === 1 ? ['H2', 'Cl2', 'Br2'] : ['H2', 'Cl2', 'Br2', 'HCl', 'HBr', 'H2O']);
      if ((r === 'HCl' || r === 'HBr' || r === 'H2O') && xCarbon(alkene) === null) continue;
      return additionRx(alkene, r);
    }
    if (type === 'substitution') {
      const k = d === 1 ? 0 : rng.int(0, 3);
      if (k === 3) return BENZENE_RX;
      if (k === 0 || k === 1) {
        const n = rng.int(1, d === 1 ? 2 : 4);
        return halogenationRx({ chain: n }, rng.pick(['Cl', 'Br'] as const), rng.int(1, Math.ceil(n / 2)));
      }
      return hydroxideSubRx(haloOf(rng, [2, 5]));
    }
    const k = d === 1 ? 0 : rng.int(0, 1);
    const n = rng.int(2, d === 1 ? 3 : 6);
    if (k === 0) {
      const rx = dehydrationRx(proper(() => ({ chain: n, group: { kind: 'alcohol', at: rng.chance(0.6) ? 1 : rng.int(1, n) } })));
      if (rx) return rx;
    } else {
      const rx = dehydrohalogenationRx(haloOf(rng, [2, n]));
      if (rx) return rx;
    }
  }
}

const TYPES = ['Addition', 'Substitution', 'Elimination'];
const TYPE_INDEX: Record<Rx['type'], number> = { addition: 0, substitution: 1, elimination: 2 };
const TYPE_HINTS = [
  'Addition: two reactants join into one product, across a double or triple bond.',
  'Substitution: an atom or group takes the place of another, so there are two products.',
  'Elimination: one molecule loses a small molecule (such as water or HBr) and a double bond forms.',
];

function reactionType(rng: Rng, d: Difficulty): GenOutput {
  const type = rng.pick<Rx['type']>(['addition', 'substitution', 'elimination']);
  if (d === 3 && rng.chance(0.5)) {
    // Four equations; one of the asked type.
    const others = (['addition', 'substitution', 'elimination'] as const).filter((t) => t !== type);
    const right = reactionOf(rng, type, 2);
    const wrong: Rx[] = [];
    for (let i = 0; wrong.length < 3 && i < 50; i++) {
      const rx = reactionOf(rng, others[wrong.length % 2], 2);
      if (!wrong.some((x) => x.ce === rx.ce)) wrong.push(rx);
    }
    return {
      prompt: `Which equation shows ${type === 'substitution' ? 'a' : 'an'} ${type} reaction?`,
      parts: [part(mc(rng, ceMd(right.ce), wrong.map((w) => ceMd(w.ce))))],
      hints: TYPE_HINTS,
      solution: [`${ceMd(right.ce)}: ${right.why}`, ...wrong.map((w) => `${ceMd(w.ce)}: ${w.why}`)],
    };
  }
  const rx = reactionOf(rng, type, d === 3 ? 2 : d);
  const molecular = d === 3;
  return {
    prompt: molecular
      ? `An organic reaction is written with molecular formulas only: ${ceMd(rx.molecular)}. What type of reaction is it?`
      : `What type of reaction is ${ceMd(rx.ce)}?`,
    parts: [part(fixedChoice(TYPES, TYPE_INDEX[rx.type]))],
    hints: molecular ? ['Count the reactants and products: two joining into one, two giving two, or one giving two.', 'Compare the hydrogens: does the organic product gain atoms, swap one atom for another, or lose a small molecule?'] : TYPE_HINTS,
    solution: [...(molecular ? [`With structures: ${ceMd(rx.ce)}.`] : []), rx.why],
  };
}

/** Wrong products a careless addition gives: both atoms on one carbon, on the wrong carbons, one atom only, or substitution. */
function wrongAdditionProducts(alkene: Skeleton, r: 'Cl2' | 'Br2'): Skeleton[] {
  const x: Halo = r === 'Cl2' ? 'chloro' : 'bromo';
  const p = alkene.bond!.at;
  const base = subsOf(alkene);
  const cands: Skeleton[] = [
    { chain: alkene.chain, subs: [...base, { at: p, prefix: x }, { at: p, prefix: x }] },
    { chain: alkene.chain, subs: [...base, { at: p + 1, prefix: x }, { at: p + 1, prefix: x }] },
    { chain: alkene.chain, subs: [...base, { at: p, prefix: x }] },
    { ...alkene, subs: [...base, { at: p, prefix: x }] },
    { chain: alkene.chain, subs: [...base, { at: p, prefix: x }, { at: Math.min(alkene.chain, p + 2), prefix: x }] },
    { chain: alkene.chain, subs: [...base, { at: Math.max(1, p - 1), prefix: x }, { at: p + 1, prefix: x }] },
  ];
  return cands;
}

function organicProduct(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const alkene = alkeneOf(rng, [2, 4]);
    const r = rng.pick(['Cl2', 'Br2'] as const);
    const right = addTo(alkene, r);
    const seen = new Set([nm(right)]);
    const wrong: Skeleton[] = [];
    for (const w of rng.shuffle(wrongAdditionProducts(alkene, r))) {
      try {
        const n = nm(w);
        if (seen.has(n)) continue;
        seen.add(n);
        wrong.push(w);
      } catch {
        continue;
      }
      if (wrong.length === 3) break;
    }
    return {
      prompt: `${cap(nm(alkene))}, ${cf(alkene)}, reacts with ${REAGENT_NAME[r]}, $\\ce{${r}}$. Which is the organic product?`,
      parts: [part(mc(rng, ceMd(aligned(alkene, right)[1][0]), wrong.map((w) => ceMd(aligned(alkene, w)[1][0]))))],
      hints: ['An alkene undergoes addition: the double bond opens and one atom adds to each of its two carbons.', 'Nothing else in the molecule changes.'],
      solution: [`The two ${r === 'Cl2' ? 'chlorine' : 'bromine'} atoms add to the two carbons of the double bond: ${ceMd(additionRx(alkene, r).ce)}.`, `The product is ${nm(right)}.`],
    };
  }
  if (d === 2) {
    const k = rng.int(0, 4);
    if (k <= 1) {
      const alkene = alkeneOf(rng, [2, 6], true);
      const r = rng.pick<Reagent>(['H2', 'Cl2', 'Br2', 'HCl', 'HBr', 'H2O']);
      const p = addTo(alkene, r);
      const h = hydrogens(alkene);
      const needsRule = (r === 'HCl' || r === 'HBr' || r === 'H2O') && h[alkene.bond!.at - 1] !== h[alkene.bond!.at];
      return {
        prompt: `${cap(nm(alkene))}, ${cf(alkene)}, reacts with ${REAGENT_NAME[r]}${OVER[r] ? ` with a catalyst` : ''}. ${needsRule ? `${MARKOVNIKOV} ` : ''}Name the organic product.${tipFor(p)}`,
        parts: [namePart(p)],
        hints: ['An alkene undergoes addition across its double bond.', r === 'H2' ? 'One hydrogen atom adds to each carbon of the double bond.' : r === 'H2O' ? 'An H adds to one carbon of the double bond and an OH to the other.' : r.startsWith('H') ? `An H adds to one carbon of the double bond and a ${r.slice(1) === 'Cl' ? 'Cl' : 'Br'} to the other.` : 'One halogen atom adds to each carbon of the double bond.'],
        solution: [`${ceMd(additionRx(alkene, r).ce)}`, `The product is **${nm(p)}**.`],
      };
    }
    if (k === 2) {
      const n = rng.int(1, 2);
      const x = rng.pick(['Cl', 'Br'] as const);
      const rx = halogenationRx({ chain: n }, x, 1);
      const p: Skeleton = { chain: n, subs: [{ at: 1, prefix: HALO[x] }] };
      return {
        prompt: `${n === 1 ? 'Methane' : 'Ethane'} reacts with ${x === 'Cl' ? 'chlorine' : 'bromine'} in ultraviolet light, and one hydrogen atom is replaced. Name the organic product.`,
        parts: [namePart(p)],
        hints: ['An alkane has no double bond, so it reacts by substitution.', `A ${x === 'Cl' ? 'chlorine' : 'bromine'} atom takes the place of one hydrogen atom; the hydrogen leaves as $\\ce{H${x}}$.`],
        solution: [ceMd(rx.ce), `The product is **${nm(p)}**.`],
      };
    }
    if (k === 3) {
      const halo = haloOf(rng, [2, 5]);
      const rx = hydroxideSubRx(halo);
      const p: Skeleton = { chain: halo.chain, group: { kind: 'alcohol', at: halogenOf(halo).h.at } };
      return {
        prompt: `${cap(nm(halo))}, ${cf(halo)}, is warmed with aqueous sodium hydroxide, a source of $\\ce{OH-}$ ions. Name the organic product.${tipFor(p)}`,
        parts: [namePart(p)],
        hints: ['A haloalkane with aqueous hydroxide ions reacts by substitution.', 'The $\\ce{OH}$ takes the place of the halogen atom, on the same carbon.'],
        solution: [ceMd(rx.ce), `The product is **${nm(p)}**.`],
      };
    }
    for (;;) {
      const n = rng.int(2, 6);
      const alcohol = proper((): Skeleton => ({ chain: n, group: { kind: 'alcohol', at: rng.int(1, n) } }));
      const rx = dehydrationRx(alcohol);
      if (!rx) continue;
      const p = eliminationProduct(alcohol, (alcohol.group as { at: number }).at)!;
      return {
        prompt: `${cap(nm(alcohol))}, ${cf(alcohol)}, is heated with concentrated sulfuric acid, which removes water from it. Name the organic product.${tipFor(p)}`,
        parts: [namePart(p)],
        hints: ['Removing water from an alcohol is an elimination.', 'The $\\ce{OH}$ and a hydrogen from the next carbon leave, and a double bond forms between those two carbons.'],
        solution: [ceMd(rx.ce), `The product is **${nm(p)}**.`],
      };
    }
  }
  if (rng.chance(0.5)) {
    // Working backwards: which alkene and reagent make a given product?
    for (;;) {
      const alkene = alkeneOf(rng, [3, 5], true);
      const r = rng.pick<Reagent>(['Cl2', 'Br2', 'HBr', 'HCl', 'H2O', 'H2']);
      const p = addTo(alkene, r);
      const other = { ...alkene, bond: { at: alkene.bond!.at === 1 ? 2 : alkene.bond!.at - 1, order: 2 as const } };
      if (!isProper(other)) continue;
      let otherProduct: string;
      try {
        otherProduct = nm(addTo(other, r));
      } catch {
        continue;
      }
      if (otherProduct === nm(p)) continue;
      const alkane: Skeleton = { chain: alkene.chain, subs: subsOf(alkene) };
      const swap: Reagent = r === 'Cl2' ? 'HCl' : r === 'Br2' ? 'HBr' : r === 'HBr' ? 'Br2' : r === 'HCl' ? 'Cl2' : r === 'H2O' ? 'H2' : 'H2O';
      let swapped: string;
      try {
        swapped = nm(addTo(alkene, swap));
      } catch {
        continue;
      }
      if (swapped === nm(p)) continue;
      const opt = (a: Skeleton, x: Reagent) => `${cap(nm(a))} and ${REAGENT_NAME[x].replace(' (steam)', '')}`;
      return {
        prompt: `Which reactants form ${nm(p)}, ${cf(p)}, in an addition reaction?${r === 'HCl' || r === 'HBr' || r === 'H2O' ? ` ${MARKOVNIKOV}` : ''}`,
        parts: [part(mc(rng, opt(alkene, r), [opt(other, r), opt(alkene, swap), `${cap(nm(alkane))} and ${REAGENT_NAME[r].replace(' (steam)', '')}`]))],
        hints: ['Addition needs a double bond. Find the two neighbouring carbons that gained the new atoms: the double bond was between them.', 'The atoms added tell you the reagent: two halogen atoms, an H and a halogen, an H and an OH, or two H.'],
        solution: [`The new atoms are on carbons that were joined by the double bond, so the alkene is ${nm(alkene)}, ${cf(alkene)}.`, `${ceMd(additionRx(alkene, r).ce)}`, `${cap(nm(other))} would give ${otherProduct}, and ${nm(alkane)} has no double bond, so it cannot add anything.`],
      };
    }
  }
  // Two steps.
  if (rng.chance(0.5)) {
    const alkene = alkeneOf(rng, [2, 5], true);
    const x = rng.pick(['Cl', 'Br'] as const);
    const halo = addTo(alkene, x === 'Cl' ? 'HCl' : 'HBr');
    const { h, rest } = halogenOf(halo);
    const alcohol: Skeleton = { chain: halo.chain, subs: rest, group: { kind: 'alcohol', at: h.at } };
    const hs = hydrogens(alkene);
    const needsRule = hs[alkene.bond!.at - 1] !== hs[alkene.bond!.at];
    return {
      prompt: `${cap(nm(alkene))} reacts with hydrogen ${x === 'Cl' ? 'chloride' : 'bromide'}. The organic product is then warmed with aqueous sodium hydroxide. ${needsRule ? `${MARKOVNIKOV} ` : ''}Name the final organic product.${tipFor(alcohol)}`,
      parts: [namePart(alcohol)],
      hints: ['Step 1: an alkene adds $\\ce{HX}$ across its double bond, making a haloalkane.', 'Step 2: hydroxide ions substitute an $\\ce{OH}$ for the halogen atom.'],
      solution: [`Addition: ${ceMd(additionRx(alkene, x === 'Cl' ? 'HCl' : 'HBr').ce)}, ${nm(halo)}.`, `Substitution: ${ceMd(hydroxideSubRx(halo).ce)}.`, `The final product is **${nm(alcohol)}**.`],
    };
  }
  for (;;) {
    const n = rng.int(2, 5);
    const alcohol = proper((): Skeleton => ({ chain: n, group: { kind: 'alcohol', at: rng.int(1, n) } }));
    const alkene = eliminationProduct(alcohol, (alcohol.group as { at: number }).at);
    if (!alkene) continue;
    const r = rng.pick(['Br2', 'Cl2', 'H2'] as const);
    const p = addTo(alkene, r);
    return {
      prompt: `${cap(nm(alcohol))} is heated with concentrated sulfuric acid, which removes water from it. The organic product then reacts with ${REAGENT_NAME[r]}${r === 'H2' ? ' and a catalyst' : ''}. Name the final organic product.${tipFor(p)}`,
      parts: [namePart(p)],
      hints: ['Step 1: removing water from an alcohol (elimination) makes an alkene.', 'Step 2: the alkene undergoes addition across its double bond.'],
      solution: [`Elimination: ${ceMd(dehydrationRx(alcohol)!.ce)}, ${nm(alkene)}.`, `Addition: ${ceMd(additionRx(alkene, r).ce)}.`, `The final product is **${nm(p)}**.`],
    };
  }
}

// ---------------------------------------------------------------------------- lesson 3.6: esterification and polymerisation

const acidOf = (n: number): Skeleton => ({ chain: n, group: { kind: 'acid' } });
const alcoholOf = (n: number): Skeleton => ({ chain: n, group: { kind: 'alcohol', at: 1 } });
const esterOf = (acid: number, alkyl: number): Skeleton => ({ chain: acid, group: { kind: 'ester', alkyl } });
function esterRx(acid: number, alkyl: number): string {
  const [a, b, e] = [acidOf(acid), alcoholOf(alkyl), esterOf(acid, alkyl)];
  if (!isBalanced([molecularFormula(a), molecularFormula(b)], [molecularFormula(e), 'H2O'], [1, 1, 1, 1])) throw new Error('Unbalanced esterification.');
  return `${condensed(a)} + ${condensed(b)} <=>[H2SO4] ${condensed(e)} + H2O`;
}
const ESTER_HINTS = ['The alcohol gives the first word of the name, as an alkyl group: methanol gives methyl, propan-1-ol gives propyl.', 'The acid gives the second word, with -oic acid changed to -oate: ethanoic acid gives ethanoate.'];

function esterification(rng: Rng, d: Difficulty): GenOutput {
  const a = rng.int(1, 5);
  const k = rng.int(1, 5);
  const [acid, alcohol, ester] = [acidOf(a), alcoholOf(k), esterOf(a, k)];
  if (d === 1) {
    return {
      prompt: `${cap(nm(acid))} reacts with ${nm(alcohol)}, with a little concentrated sulfuric acid as a catalyst. Name the ester that forms.`,
      parts: [namePart(ester)],
      hints: ESTER_HINTS,
      solution: [`${cap(nm(alcohol))} gives ${nm(ester).split(' ')[0]}; ${nm(acid)} gives ${nm(ester).split(' ')[1]}.`, ceMd(esterRx(a, k)), `The ester is **${nm(ester)}**, and water also forms.`],
    };
  }
  const twoParts = (prompt: string, extraHint: string): GenOutput => ({
    prompt,
    parts: [namePart(acid, 'Acid'), namePart(alcohol, 'Alcohol')],
    hints: [extraHint, 'The -oate part comes from the acid (-oic acid); the alkyl part comes from the alcohol (-ol).'],
    solution: [`${cap(nm(ester))}: ${nm(ester).split(' ')[0]} comes from ${nm(alcohol)}, and ${nm(ester).split(' ')[1]} from ${nm(acid)}.`, ceMd(esterRx(a, k))],
  });
  if (d === 2) {
    if (rng.chance(0.5)) return twoParts(`Which carboxylic acid and which alcohol react to make ${nm(ester)}?`, 'Split the name into its two words.');
    return {
      prompt: `What is the IUPAC name of the ester ${cf(ester)}?`,
      parts: [namePart(ester)],
      hints: ['Find the $\\ce{-COO-{}}$ link. The side with the $\\ce{C=O}$ carbon came from the acid; count its carbons, including that one.', 'The side joined through the other oxygen came from the alcohol: name it as an alkyl group, first.'],
      solution: [`The acid part is the $\\ce{C=O}$ carbon and the carbons on its side: ${a} carbon${a === 1 ? '' : 's'}, so ${nm(acidOf(a))} becomes ${nm(ester).split(' ')[1]}.`, `The alcohol part, joined through the other oxygen, has ${k} carbon${k === 1 ? '' : 's'}: ${nm(ester).split(' ')[0]}, from ${nm(alcoholOf(k))}.`, `Name: **${nm(ester)}**.`],
    };
  }
  if (rng.chance(0.5)) {
    const shown = ceMd(condensed(ester, { reverse: rng.chance(0.5) }));
    return twoParts(`An ester has the condensed formula ${shown}. Name the carboxylic acid and the alcohol that form it.`, 'Find the $\\ce{C=O}$ carbon of the $\\ce{-COO-{}}$ link: its side came from the acid, the other side from the alcohol. The formula may be written either way round.');
  }
  return {
    prompt: `${cap(nm(acid))} reacts with ${nm(alcohol)} to form an ester and water. What is the molecular formula of the ester? Write C, then H, then O.`,
    parts: [formulaPart(molecularFormula(ester))],
    hints: ['The ester is the acid and the alcohol joined, less one molecule of water.', 'Add the molecular formulas of the acid and the alcohol, then take away $\\ce{H2O}$.'],
    solution: [`${cap(nm(acid))} is ${ceMd(molecularFormula(acid))} and ${nm(alcohol)} is ${ceMd(molecularFormula(alcohol))}.`, ceMd(esterRx(a, k)), `The ester, ${nm(ester)}, is ${ceMd(molecularFormula(ester))}.`],
  };
}

interface AddPolymer {
  monomer: string;
  monomerCe: string;
  polymer: string;
  unit: string;
  /** Wrong repeating units and wrong monomers, as mhchem. */
  wrongUnits: string[];
  wrongMonomers: string[];
  formula: string;
  use: string;
}
const ADDITION_POLYMERS: AddPolymer[] = [
  { monomer: 'ethene', monomerCe: 'CH2=CH2', polymer: 'poly(ethene)', unit: 'CH2-CH2', wrongUnits: ['CH2=CH2', 'CH3-CH3', 'CH2-CH2-CH2'], wrongMonomers: ['CH3-CH3', 'CH#CH', 'CH2=CH-CH3'], formula: 'C2H4', use: 'plastic bags and bottles' },
  { monomer: 'propene', monomerCe: 'CH2=CH-CH3', polymer: 'poly(propene)', unit: 'CH2-CH(CH3)', wrongUnits: ['CH2=CH(CH3)', 'CH2-CH2-CH2', 'CH(CH3)-CH(CH3)'], wrongMonomers: ['CH3-CH2-CH3', 'CH2=CH2', 'CH#C-CH3'], formula: 'C3H6', use: 'ropes, crates and food containers' },
  { monomer: 'chloroethene', monomerCe: 'CH2=CHCl', polymer: 'poly(chloroethene)', unit: 'CH2-CHCl', wrongUnits: ['CH2=CHCl', 'CHCl-CHCl', 'CH2-CCl2'], wrongMonomers: ['CH3-CH2Cl', 'CHCl=CHCl', 'CH2=CH2'], formula: 'C2H3Cl', use: 'water pipes and window frames (PVC)' },
  { monomer: 'tetrafluoroethene', monomerCe: 'CF2=CF2', polymer: 'poly(tetrafluoroethene)', unit: 'CF2-CF2', wrongUnits: ['CF2=CF2', 'CF3-CF3', 'CHF-CHF'], wrongMonomers: ['CF3-CF3', 'CHF=CHF', 'CH2=CF2'], formula: 'C2F4', use: 'non-stick coatings (PTFE)' },
  { monomer: 'phenylethene', monomerCe: 'CH2=CH(C6H5)', polymer: 'poly(phenylethene)', unit: 'CH2-CH(C6H5)', wrongUnits: ['CH2=CH(C6H5)', 'CH2-CH2-C6H5', 'CH(C6H5)-CH(C6H5)'], wrongMonomers: ['CH3-CH2(C6H5)', 'C6H6', 'CH2=CH2'], formula: 'C8H8', use: 'foam packaging and cups (polystyrene)' },
];
const unitCe = (u: string) => `$\\ce{-[${u}]_{n}-{}}$`;
/** Three repeating units of an addition polymer, as a segment of its chain. */
const segment = (u: string) => `$\\ce{-${u}-${u}-${u}-{}}$`;

interface CondPolymer {
  monomers: string;
  kind: string;
  segmentCe: string;
  wrong: string[];
  link: string;
}
const CONDENSATION_POLYMERS: CondPolymer[] = [
  { monomers: 'ethane-1,2-diol, $\\ce{HO-CH2-CH2-OH}$, and hexanedioic acid, $\\ce{HOOC-(CH2)4-COOH}$', kind: 'a polyester', segmentCe: '-O-CH2-CH2-O-CO-(CH2)4-CO-O-CH2-CH2-O-CO-(CH2)4-CO-{}', wrong: ['Ethene and hexanedioic acid', 'Ethane-1,2-diol and hexane-1,6-diamine', 'Ethanol and hexanoic acid'], link: 'ester links, $\\ce{-COO-{}}$' },
  { monomers: 'hexane-1,6-diamine, $\\ce{H2N-(CH2)6-NH2}$, and hexanedioic acid, $\\ce{HOOC-(CH2)4-COOH}$', kind: 'a polyamide (nylon)', segmentCe: '-NH-(CH2)6-NH-CO-(CH2)4-CO-NH-(CH2)6-NH-CO-(CH2)4-CO-{}', wrong: ['Hexane-1,6-diol and hexanedioic acid', 'Hexane-1,6-diamine and hexane-1,6-diol', 'Hexene and hexanedioic acid'], link: 'amide links, $\\ce{-CO-NH-{}}$' },
];
const CORRECT_COND = ['Ethane-1,2-diol and hexanedioic acid', 'Hexane-1,6-diamine and hexanedioic acid'];

const POLY_CHOICES = ['An addition polymer; no other product forms', 'A condensation polymer; water also forms', 'An addition polymer; water also forms', 'A condensation polymer; no other product forms'];
const MONOMER_SETS: Array<{ what: string; addition: boolean; why: string }> = [
  ...ADDITION_POLYMERS.map((p) => ({ what: `Many molecules of ${p.monomer}, $\\ce{${p.monomerCe}}$, join into one long chain.`, addition: true, why: `${p.monomer[0].toUpperCase()}${p.monomer.slice(1)} has a double bond, which opens so the molecules join end to end without losing any atoms.` })),
  { what: 'Ethane-1,2-diol, $\\ce{HO-CH2-CH2-OH}$, and benzene-1,4-dicarboxylic acid, $\\ce{HOOC-C6H4-COOH}$, link into long chains (a polyester used for drink bottles).', addition: false, why: 'Each $\\ce{-OH}$ of the diol reacts with a $\\ce{-COOH}$ of the acid, forming an ester link and releasing water.' },
  { what: 'Hexane-1,6-diamine, $\\ce{H2N-(CH2)6-NH2}$, and hexanedioic acid, $\\ce{HOOC-(CH2)4-COOH}$, link into long chains (nylon).', addition: false, why: 'Each $\\ce{-NH2}$ reacts with a $\\ce{-COOH}$, forming an amide link and releasing water.' },
  { what: 'Amino acids, each with an $\\ce{-NH2}$ and a $\\ce{-COOH}$ group, link into a protein.', addition: false, why: 'The $\\ce{-NH2}$ of one amino acid reacts with the $\\ce{-COOH}$ of the next, releasing water.' },
  { what: 'Glucose molecules, $\\ce{C6H12O6}$, link into starch in a plant.', addition: false, why: 'Two $\\ce{-OH}$ groups on neighbouring glucose molecules join through an oxygen atom, releasing water.' },
  { what: 'Lactic acid, $\\ce{CH3-CH(OH)-COOH}$, which has an $\\ce{-OH}$ and a $\\ce{-COOH}$ group, links into a biodegradable plastic.', addition: false, why: 'The $\\ce{-OH}$ of one molecule reacts with the $\\ce{-COOH}$ of the next, forming an ester link and releasing water.' },
];

function polymer(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const p = rng.pick(ADDITION_POLYMERS);
    if (rng.chance(0.5)) {
      return {
        prompt: `${cap(p.monomer)}, $\\ce{${p.monomerCe}}$, forms the addition polymer ${p.polymer}, used for ${p.use}. Which is its repeating unit?`,
        parts: [part(mc(rng, unitCe(p.unit), p.wrongUnits.map(unitCe)))],
        hints: ['In addition polymerisation the double bond opens, and each monomer links to the next.', 'The repeating unit has the same atoms as the monomer, joined by single bonds, with a bond out at each end.'],
        solution: [`The double bond of ${p.monomer} opens, and the two carbons link to the neighbouring units: ${ceMd(`n ${p.monomerCe} -> -[${p.unit}]_{n}-{}`)}.`],
      };
    }
    return {
      prompt: `Which monomer forms ${p.polymer}, used for ${p.use}?`,
      parts: [part(mc(rng, `$\\ce{${p.monomerCe}}$`, p.wrongMonomers.map((m) => `$\\ce{${m}}$`)))],
      hints: ['An addition polymer forms from monomers with a carbon–carbon double bond.', 'The name poly(...) gives the monomer in brackets.'],
      solution: [`${cap(p.polymer)} is made from ${p.monomer}, $\\ce{${p.monomerCe}}$: its double bond opens to link the molecules into a chain.`],
    };
  }
  if (d === 2) {
    const s = rng.pick(MONOMER_SETS);
    return {
      prompt: `${s.what} What kind of polymer forms?`,
      parts: [part(fixedChoice(POLY_CHOICES, s.addition ? 0 : 1))],
      hints: ['Monomers with a carbon–carbon double bond form addition polymers, with no other product.', 'Monomers with two reacting groups (such as $\\ce{-OH}$, $\\ce{-NH2}$ and $\\ce{-COOH}$) form condensation polymers, and a small molecule, usually water, is released at each link.'],
      solution: [s.why, s.addition ? 'An addition polymer; nothing else forms.' : 'A condensation polymer; water also forms.'],
    };
  }
  const k = rng.int(0, 2);
  if (k === 0) {
    const p = rng.pick(ADDITION_POLYMERS);
    return {
      prompt: `A segment of a polymer chain is ${segment(p.unit)}. Which monomer was it made from?`,
      parts: [part(mc(rng, `$\\ce{${p.monomerCe}}$`, p.wrongMonomers.map((m) => `$\\ce{${m}}$`)))],
      hints: ['Find the repeating unit: the shortest piece that repeats along the chain.', 'For an addition polymer, put a double bond back between the two carbons of the repeating unit.'],
      solution: [`The repeating unit is ${unitCe(p.unit)}.`, `Restoring the double bond gives the monomer ${p.monomer}, $\\ce{${p.monomerCe}}$.`],
    };
  }
  if (k === 1) {
    const i = rng.int(0, CONDENSATION_POLYMERS.length - 1);
    const p = CONDENSATION_POLYMERS[i];
    return {
      prompt: `A segment of a condensation polymer is $\\ce{${p.segmentCe}}$. Which monomers was it made from?`,
      parts: [part(mc(rng, CORRECT_COND[i], p.wrong))],
      hints: ['Find the links between the units: $\\ce{-CO-O-{}}$ is an ester link, $\\ce{-CO-NH-{}}$ an amide link.', 'Break each link and add back the water: an $\\ce{-OH}$ to the $\\ce{C=O}$ side, and an $\\ce{H}$ to the $\\ce{O}$ or $\\ce{N}$ side.'],
      solution: [`It is ${p.kind}, with ${p.link}.`, `Breaking each link and adding back water gives ${p.monomers}.`],
    };
  }
  const p = rng.pick(ADDITION_POLYMERS);
  const units = rng.pick([500, 800, 1000, 1200, 1500, 2000, 2500, 3000, 4000]);
  const M = molarMass(p.formula);
  const total = Number((units * M).toFixed(2));
  return {
    prompt: `A chain of ${p.polymer} has a molar mass of $${groups(total)}\\ \\text{g/mol}$. How many ${p.monomer} units are in the chain, to the nearest whole number? The molar mass of ${p.monomer}, $\\ce{${p.formula}}$, is $${M.toFixed(2)}\\ \\text{g/mol}$.`,
    parts: [numPart(units, { decimals: 0, suffix: 'units' })],
    calculator: true,
    hints: ['In an addition polymer, nothing is lost when the monomers join, so each unit has the molar mass of the monomer.', 'Number of units = molar mass of the chain ÷ molar mass of the monomer.'],
    solution: [`$\\dfrac{${groups(total)}\\ \\text{g/mol}}{${M.toFixed(2)}\\ \\text{g/mol}} = ${units}$ units`],
  };
}

// ---------------------------------------------------------------------------- lesson 3.7: combustion and fuels

interface Fuel {
  name: string;
  formula: string;
  shown: string;
}
const alcoholFormula = (n: number) => `C${n > 1 ? n : ''}H${2 * n + 1}OH`;
function fuelOf(sk: Skeleton): Fuel {
  const g = sk.group;
  const formula = g && g.kind === 'alcohol' && g.at === 1 ? alcoholFormula(sk.chain) : molecularFormula(sk);
  return { name: nm(sk), formula, shown: condensed(sk) };
}
function pickFuel(rng: Rng, d: Difficulty): Fuel {
  if (d === 1) return fuelOf({ chain: rng.int(1, 5) });
  const k = rng.int(0, 3);
  if (k === 0) return fuelOf({ chain: rng.int(6, 10) });
  if (k === 1) return fuelOf({ chain: rng.int(2, 6), bond: { at: 1, order: 2 } });
  if (k === 2) return fuelOf({ chain: rng.int(2, 5), bond: { at: 1, order: 3 } });
  return fuelOf(alcoholOf(rng.int(1, 5)));
}
/** "Check: C 8 = 8, H 18 = 18, O 25 = 25." */
function atomCheck(r: string[], p: string[], c: number[]): string {
  const fs = [...r, ...p].map(parseFormula);
  const els = [...new Set(fs.flatMap((f) => [...f.atoms.keys()]))];
  const count = (from: number, to: number, el: string) => fs.slice(from, to).reduce((s, f, i) => s + (f.atoms.get(el) ?? 0) * c[from + i], 0);
  return `Check: ${els.map((el) => `${el} ${count(0, r.length, el)} = ${count(r.length, fs.length, el)}`).join(', ')}.`;
}
const eqText = (r: string[], p: string[], c: number[]) => `${r.map((f, i) => `${coef(c[i])}${f}`).join(' + ')} -> ${p.map((f, i) => `${coef(c[r.length + i])}${f}`).join(' + ')}`;

function combustion(rng: Rng, d: Difficulty): GenOutput {
  const f = pickFuel(rng, d);
  const incomplete = d === 3;
  const carbonProduct = incomplete ? rng.pick(['CO', 'C']) : 'CO2';
  const r = [f.formula, 'O2'];
  const p = [carbonProduct, 'H2O'];
  const c = balance(r, p)!;
  const what = !incomplete
    ? 'burns completely in plenty of oxygen, forming carbon dioxide and water'
    : carbonProduct === 'CO'
      ? 'burns in a limited supply of oxygen, forming only carbon monoxide and water'
      : 'burns in a very limited supply of oxygen, forming only carbon (soot) and water';
  return {
    prompt: `${cap(f.name)}, ${ceMd(f.shown)}, ${what}. Balance the equation ${ceMd(`${r.join(' + ')} -> ${p.join(' + ')}`)} with the smallest whole-number coefficients.`,
    parts: [part({ kind: 'coefficients', reactants: r, products: p })],
    hints: ['Balance carbon first, then hydrogen, and oxygen last.', ...(f.formula.includes('O') && f.formula !== 'O2' ? ['Count the oxygen atom in the fuel when you balance oxygen.'] : []), 'If oxygen needs half a molecule, double every coefficient.'],
    solution: [ceMd(eqText(r, p, c)), atomCheck(r, p, c)],
  };
}

const FUEL_FACTS: Array<{ q: string; right: string; wrong: string[]; why: string }> = [
  { q: 'In a fractionating column, where are the fractions with the lowest boiling points collected?', right: 'At the top, where the column is coolest', wrong: ['At the bottom, where the column is hottest', 'At the top, where the column is hottest', 'At the bottom, where the column is coolest'], why: 'The column is hottest at the bottom and coolest at the top. Small molecules with low boiling points stay as gases until they reach the cool top, where they condense.' },
  { q: 'In fractional distillation, which fraction has the largest molecules?', right: 'The fraction collected at the bottom of the column', wrong: ['The fraction collected at the top of the column', 'The fraction with the lowest boiling point', 'The fraction that is a gas at room temperature'], why: 'Larger molecules have stronger intermolecular forces and higher boiling points, so they condense low in the column, where it is hottest.' },
  { q: 'Why do the fractions of crude oil have different boiling points?', right: 'Larger molecules have stronger London dispersion forces between them, so they boil at higher temperatures', wrong: ['Larger molecules have weaker forces between them, so they boil at higher temperatures', 'Boiling breaks the covalent bonds inside the molecules, and larger molecules have more of them', 'Smaller molecules are heavier, so they need more energy to boil'], why: 'Boiling separates molecules from each other; it does not break covalent bonds. Longer molecules have more surface to attract each other by London dispersion forces.' },
  { q: 'What does cracking do?', right: 'It breaks large hydrocarbon molecules into smaller ones, including alkenes', wrong: ['It separates crude oil into fractions by boiling point', 'It joins small alkene molecules into long polymer chains', 'It removes sulfur from a fuel before it is burned'], why: 'Cracking uses heat and a catalyst to break long alkanes into shorter alkanes and alkenes.' },
  { q: 'Why is cracking carried out?', right: 'Smaller molecules such as those in petrol are in greater demand, and the alkenes made are used to make polymers', wrong: ['To remove carbon dioxide from crude oil before it is sold', 'To turn alkenes into alkanes, which burn more cleanly', 'To make the molecules larger so they release more energy'], why: 'Crude oil holds more large molecules than are needed. Cracking turns them into petrol-sized molecules and into alkenes such as ethene for making plastics.' },
  { q: 'Which pollutant, made by incomplete combustion, is a poisonous gas that stops blood from carrying oxygen?', right: 'Carbon monoxide, $\\ce{CO}$', wrong: ['Carbon dioxide, $\\ce{CO2}$', 'Sulfur dioxide, $\\ce{SO2}$', 'Water vapour, $\\ce{H2O}$'], why: 'With too little oxygen, carbon burns to carbon monoxide. It binds to haemoglobin in the blood more strongly than oxygen does.' },
  { q: 'Which gas from burning fossil fuels adds most to the enhanced greenhouse effect?', right: 'Carbon dioxide, $\\ce{CO2}$', wrong: ['Carbon monoxide, $\\ce{CO}$', 'Sulfur dioxide, $\\ce{SO2}$', 'Nitrogen, $\\ce{N2}$'], why: 'Every carbon atom in a fossil fuel ends up as carbon dioxide when it burns completely. Carbon dioxide absorbs infrared radiation and traps heat in the atmosphere.' },
  { q: 'Burning fuels that contain sulfur impurities releases which gas, a cause of acid rain?', right: 'Sulfur dioxide, $\\ce{SO2}$', wrong: ['Carbon monoxide, $\\ce{CO}$', 'Methane, $\\ce{CH4}$', 'Hydrogen, $\\ce{H2}$'], why: 'Sulfur burns to sulfur dioxide, which dissolves in water in the air to form acids.' },
  { q: 'How do nitrogen oxides form in a car engine?', right: 'Nitrogen and oxygen from the air react at the high temperature inside the engine', wrong: ['Nitrogen atoms in the hydrocarbons of the fuel burn', 'The fuel burns incompletely in too little oxygen', 'Carbon dioxide reacts with the nitrogen in the air'], why: 'Hydrocarbons contain no nitrogen. At the very high temperature of the engine, nitrogen and oxygen from the air combine.' },
  { q: 'Which observation shows that a fuel is burning incompletely?', right: 'A yellow, smoky flame that leaves soot', wrong: ['A blue flame with no smoke', 'Water forms as the fuel burns', 'The flame gives out heat'], why: 'A yellow, sooty flame means unburned carbon: there is not enough oxygen for complete combustion, so carbon and carbon monoxide form.' },
  { q: 'What is crude oil (petroleum)?', right: 'A mixture of many hydrocarbons, formed over millions of years from the remains of ancient marine organisms', wrong: ['A single compound that is separated into fuels by cracking', 'A mixture of hydrocarbons made from plants over a few years', 'A renewable fuel, because new oil forms as fast as it is used'], why: 'Crude oil is a fossil fuel: a mixture of hydrocarbons formed from buried organisms over millions of years, so it is non-renewable.' },
];

function fuels(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const f = rng.pick(FUEL_FACTS);
    return {
      prompt: f.q,
      parts: [part(mc(rng, f.right, f.wrong))],
      hints: ['Think about what happens to the molecules, and where the energy or the atoms go.'],
      solution: [f.why],
    };
  }
  if (d === 2 || rng.chance(0.5)) {
    // Cracking an alkane into a smaller alkane and alkene molecules.
    const k = d === 2 ? 1 : rng.int(2, 3);
    const alkeneC = d === 2 ? rng.int(2, 6) : rng.int(2, 4);
    const n = rng.int(Math.max(8, k * alkeneC + 4), 18);
    const m = n - k * alkeneC;
    const big = `C${n}H${2 * n + 2}`;
    const alkane = `C${m}H${2 * m + 2}`;
    const alkene = `C${alkeneC}H${2 * alkeneC}`;
    const askAlkene = rng.chance(0.6);
    const shownEq = askAlkene ? `${big} -> ${alkane} + ${coef(k)}X` : `${big} -> X + ${coef(k)}${alkene}`;
    const answer = askAlkene ? alkene : alkane;
    if (!isBalanced([big], [alkane, alkene], [1, 1, k])) throw new Error('Unbalanced cracking equation.');
    return {
      prompt: `Cracking breaks a large alkane into smaller molecules: ${ceMd(shownEq)}. What is the formula of X?`,
      parts: [formulaPart(answer, 'X =')],
      hints: ['Atoms are conserved: count the carbons and hydrogens on each side.', ...(k > 1 ? [`The coefficient ${k} means ${k} molecules, so divide what is left by ${k}.`] : []), 'One product of cracking is an alkane, $\\text{C}_n\\text{H}_{2n+2}$, and the other an alkene, $\\text{C}_n\\text{H}_{2n}$.'],
      solution: [
        askAlkene
          ? `Carbon: $${n} - ${m} = ${n - m}$${k > 1 ? `, shared by ${k} molecules: ${alkeneC} each` : ''}. Hydrogen: $${2 * n + 2} - ${2 * m + 2} = ${2 * n - 2 * m}$${k > 1 ? `, ${2 * alkeneC} each` : ''}.`
          : `Carbon: $${n} - ${k > 1 ? `${k} \\times ` : ''}${alkeneC} = ${m}$. Hydrogen: $${2 * n + 2} - ${k > 1 ? `${k} \\times ` : ''}${2 * alkeneC} = ${2 * m + 2}$.`,
        `X is ${ceMd(answer)}: ${ceMd(eqText([big], [alkane, alkene], [1, 1, k]))}.`,
      ],
    };
  }
  // Carbon dioxide from burning a mass of fuel.
  const f = rng.pick([{ chain: 1 }, { chain: 3 }, { chain: 4 }, { chain: 8 }, alcoholOf(2), alcoholOf(1)].map(fuelOf));
  const atoms = parseFormula(f.formula).atoms;
  const nC = atoms.get('C')!;
  const M = molarMass(f.formula);
  const kg = rng.chance(0.5);
  const mass = kg ? rng.pick([1.0, 1.5, 2.0, 2.5, 5.0, 10.0, 20.0, 50.0]) : rng.pick([100, 150, 250, 400, 500, 750]);
  const grams = kg ? mass * 1000 : mass;
  const nFuel = grams / M;
  const nCO2 = nFuel * nC;
  const mCO2 = nCO2 * 44.01;
  const out = kg ? mCO2 / 1000 : mCO2;
  const dp = out >= 100 ? 0 : out >= 10 ? 1 : 2;
  const els = [...atoms.keys()];
  const masses = { C: 12.01, H: 1.01, O: 16.0 } as Record<string, number>;
  const c = balance([f.formula, 'O2'], ['CO2', 'H2O'])!;
  return {
    prompt: `${cap(f.name)}, ${ceMd(f.formula)}, burns completely: ${ceMd(eqText([f.formula, 'O2'], ['CO2', 'H2O'], c))}. What mass of carbon dioxide forms when ${kg ? `$${mass.toPrecision(3)}\\ \\text{kg}$` : `$${mass}\\ \\text{g}$`} of ${f.name} burns? Give the answer in ${kg ? 'kilograms' : 'grams'}, ${roundingPhrase(dp)}. Use the molar masses ${els.map((e) => `${e} $${masses[e].toFixed(2)}\\ \\text{g/mol}$`).join(', ')}${els.includes('O') ? '' : `, O $16.00\\ \\text{g/mol}$`}.`,
    parts: [numPart(out, { decimals: dp, suffix: kg ? 'kg' : 'g' })],
    calculator: true,
    hints: ['Change the mass of fuel to moles with its molar mass.', `Use the mole ratio from the equation: ${c[0]} mol of fuel gives ${c[2]} mol of $\\ce{CO2}$.`, 'Change the moles of carbon dioxide to a mass.'],
    solution: [
      `$M(\\ce{${f.formula}}) = ${M.toFixed(2)}\\ \\text{g/mol}$ and $M(\\ce{CO2}) = 44.01\\ \\text{g/mol}$.`,
      `$n(\\ce{${f.formula}}) = \\dfrac{${groups(grams)}\\ \\text{g}}{${M.toFixed(2)}\\ \\text{g/mol}} = ${w(nFuel)}\\ \\text{mol}$`,
      `$n(\\ce{CO2}) = ${w(nFuel)} \\times \\dfrac{${c[2]}}{${c[0]}} = ${w(nCO2)}\\ \\text{mol}$`,
      `$m = ${w(nCO2)} \\times 44.01 = ${w(mCO2)}\\ \\text{g}${kg ? ` = ${w(mCO2 / 1000)}\\ \\text{kg}` : ''}$${(kg ? w(mCO2 / 1000) : w(mCO2)) === fmtFixed(out, dp) ? '' : `, which is $${fmtFixed(out, dp)}\\ \\text{${kg ? 'kg' : 'g'}}$ ${roundingPhrase(dp)}`}.`,
    ],
  };
}

// ----------------------------------------------------------------------------

export const ORGANIC_REACTION_SKILLS: SkillDef[] = [
  skill({ id: 'c30-organic-reaction-type', name: 'Addition, substitution and elimination', description: 'Classify organic reactions as addition, substitution or elimination from their equations.', outcomes: ['12-C2'], lessonId: L(5), format: 'mc', gen: reactionType }),
  skill({ id: 'c30-organic-product', name: 'Products of organic reactions', description: 'Predict and name the products of addition, substitution and elimination reactions, and work back to the reactants.', outcomes: ['12-C2'], lessonId: L(5), gen: organicProduct }),
  skill({ id: 'c30-esterification', name: 'Esterification', description: 'Name the ester formed from a carboxylic acid and an alcohol, and the acid and alcohol that form an ester.', outcomes: ['12-C2'], lessonId: L(6), gen: esterification }),
  skill({ id: 'c30-polymer', name: 'Polymers', description: 'Tell addition from condensation polymers, draw repeating units, and find the monomers of a polymer.', outcomes: ['12-C2'], lessonId: L(6), format: 'mc', gen: polymer }),
  skill({ id: 'c30-combustion', name: 'Combustion equations', description: 'Balance equations for the complete and incomplete combustion of hydrocarbons and alcohols.', outcomes: ['12-C2'], lessonId: L(7), gen: combustion }),
  skill({ id: 'c30-fuels', name: 'Fossil fuels', description: 'Explain fractional distillation and cracking, complete cracking equations, and relate burning fossil fuels to pollution and carbon dioxide.', outcomes: ['12-C2'], lessonId: L(7), gen: fuels }),
];
