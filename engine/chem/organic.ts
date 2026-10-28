/**
 * Organic molecules for questions. A small model of a carbon skeleton: a main chain, with alkyl,
 * halogen and alkoxy substituents, at most one double or triple bond, and at most one functional
 * group named as a suffix (an alcohol, amine, ketone, aldehyde, carboxylic acid or ester). From the
 * same skeleton come its IUPAC name (with the other spellings a student may type: but-2-ene and
 * 2-butene), its condensed formula and its molecular formula, so the name and the structure in a
 * question always agree.
 *
 * The main chain is the parent chain when it is the longest chain, contains the multiple bond and
 * the functional group, and carries the most substituents; `isProper` checks that, and `nameOf`
 * finds the parent chain of any skeleton (a chain drawn bent is named by its longest chain).
 * Geometric (cis–trans) isomers are not told apart: but-2-ene is one compound here.
 */

export type Alkyl = 'methyl' | 'ethyl' | 'propyl';
export type Halo = 'fluoro' | 'chloro' | 'bromo' | 'iodo';
export type Alkoxy = 'methoxy' | 'ethoxy';
export type Prefix = Alkyl | Halo | Alkoxy;

/** The functional group named as a suffix. An aldehyde, acid or ester group is on carbon 1. */
export type Group =
  | { kind: 'alcohol' | 'amine' | 'ketone'; at: number }
  | { kind: 'aldehyde' | 'acid' }
  /** An ester: the chain is the acid part, carbon 1 being the C of COO, and `alkyl` carbons are the alcohol part. */
  | { kind: 'ester'; alkyl: number };

export interface Skeleton {
  /** Carbons in the main chain, numbered 1 to `chain` in the order written. */
  chain: number;
  /** Substituents on carbons of the main chain. */
  subs?: Array<{ at: number; prefix: Prefix }>;
  /** A double (2) or triple (3) bond between carbon `at` and carbon `at + 1`. */
  bond?: { at: number; order: 2 | 3 };
  group?: Group;
}

export type Family = 'alkane' | 'alkene' | 'alkyne' | 'haloalkane' | 'alcohol' | 'ether' | 'aldehyde' | 'ketone' | 'carboxylic acid' | 'ester' | 'amine';

export const STEMS = ['', 'meth', 'eth', 'prop', 'but', 'pent', 'hex', 'hept', 'oct', 'non', 'dec'];
/** methyl, ethyl ... for an alkyl group (an ester's alcohol part) of n carbons. */
export const alkylName = (n: number) => `${STEMS[n]}yl`;

const ALKYL_C: Record<Alkyl, number> = { methyl: 1, ethyl: 2, propyl: 3 };
const ALKOXY_C: Record<Alkoxy, number> = { methoxy: 1, ethoxy: 2 };
const HALO_SYMBOL: Record<Halo, string> = { fluoro: 'F', chloro: 'Cl', bromo: 'Br', iodo: 'I' };
const MULT = ['', '', 'di', 'tri', 'tetra', 'penta', 'hexa', 'hepta', 'octa'];

export const isAlkyl = (p: Prefix): p is Alkyl => p in ALKYL_C;
export const isHalo = (p: Prefix): p is Halo => p in HALO_SYMBOL;
export const isAlkoxy = (p: Prefix): p is Alkoxy => p in ALKOXY_C;
export const haloSymbol = (p: Halo) => HALO_SYMBOL[p];

const subsOf = (sk: Skeleton) => sk.subs ?? [];
/** The chain carbon that carries the functional group, if any. */
function groupCarbon(sk: Skeleton): number | null {
  const g = sk.group;
  if (!g) return null;
  return g.kind === 'alcohol' || g.kind === 'amine' || g.kind === 'ketone' ? g.at : 1;
}
/** The order of the bond between chain carbons p and p + 1. */
const bondOrder = (sk: Skeleton, p: number) => (sk.bond && sk.bond.at === p ? sk.bond.order : 1);

/** Bonds from carbon p to everything but hydrogen. */
function usedValence(sk: Skeleton, p: number): number {
  let v = 0;
  if (p > 1) v += bondOrder(sk, p - 1);
  if (p < sk.chain) v += bondOrder(sk, p);
  v += subsOf(sk).filter((s) => s.at === p).length;
  if (groupCarbon(sk) === p) {
    const k = sk.group!.kind;
    v += k === 'alcohol' || k === 'amine' ? 1 : k === 'ketone' || k === 'aldehyde' ? 2 : 3;
  }
  return v;
}

/** Hydrogen atoms on each chain carbon, carbon 1 first. */
export function hydrogens(sk: Skeleton): number[] {
  return Array.from({ length: sk.chain }, (_, i) => 4 - usedValence(sk, i + 1));
}

/** Why a skeleton is not a possible molecule in this model, or null when it is. */
export function structureError(sk: Skeleton): string | null {
  const n = sk.chain;
  if (!Number.isInteger(n) || n < 1 || n > 10) return 'The chain has 1 to 10 carbons.';
  for (const s of subsOf(sk)) if (!Number.isInteger(s.at) || s.at < 1 || s.at > n) return `No carbon ${s.at} for ${s.prefix}.`;
  if (sk.bond) {
    if (sk.bond.at < 1 || sk.bond.at >= n) return 'The multiple bond is between two chain carbons.';
    if (sk.group) return 'A multiple bond and a functional group together are not modelled.';
  }
  const g = sk.group;
  if (g) {
    if ((g.kind === 'alcohol' || g.kind === 'amine') && (g.at < 1 || g.at > n)) return 'The group is on a chain carbon.';
    if (g.kind === 'ketone' && (n < 3 || g.at < 2 || g.at > n - 1)) return 'A ketone group is on an inner carbon.';
    if (g.kind === 'ester' && (g.alkyl < 1 || g.alkyl > 5)) return 'The alcohol part of an ester has 1 to 5 carbons.';
    const gc = groupCarbon(sk)!;
    if (subsOf(sk).some((s) => s.at === gc && !isAlkyl(s.prefix))) return 'No halogen or alkoxy group on the carbon of the functional group.';
  }
  const alkoxy = subsOf(sk).filter((s) => isAlkoxy(s.prefix));
  if (alkoxy.length > 1 || (alkoxy.length && (sk.group || sk.bond))) return 'An ether here has one alkoxy group and nothing else.';
  if (hydrogens(sk).some((h) => h < 0)) return 'A carbon has more than four bonds.';
  return null;
}

// ---------------------------------------------------------------------------- the carbon graph

interface CNode {
  adj: number[];
  /** Position in the main chain (1-based), for chain carbons. */
  main?: number;
}

/** The carbon atoms of a skeleton as a tree: the chain is nodes 0 to chain − 1, then the alkyl branches. */
function carbonGraph(sk: Skeleton): CNode[] {
  const nodes: CNode[] = Array.from({ length: sk.chain }, (_, i) => ({ adj: [], main: i + 1 }));
  const link = (a: number, b: number) => {
    nodes[a].adj.push(b);
    nodes[b].adj.push(a);
  };
  for (let i = 0; i + 1 < sk.chain; i++) link(i, i + 1);
  for (const s of subsOf(sk)) {
    if (!isAlkyl(s.prefix)) continue;
    let prev = s.at - 1;
    for (let k = 0; k < ALKYL_C[s.prefix]; k++) {
      nodes.push({ adj: [] });
      link(prev, nodes.length - 1);
      prev = nodes.length - 1;
    }
  }
  return nodes;
}

/** Every chain from one end carbon to another (in a tree, one path joins each pair of ends). */
function leafPaths(nodes: CNode[]): number[][] {
  if (nodes.length === 1) return [[0]];
  const leaves = nodes.map((n, i) => (n.adj.length <= 1 ? i : -1)).filter((i) => i >= 0);
  const out: number[][] = [];
  for (let a = 0; a < leaves.length; a++) {
    for (let b = a + 1; b < leaves.length; b++) {
      const prev = new Map<number, number>([[leaves[a], -1]]);
      const queue = [leaves[a]];
      while (queue.length) {
        const x = queue.shift()!;
        for (const y of nodes[x].adj) if (!prev.has(y)) (prev.set(y, x), queue.push(y));
      }
      const path: number[] = [];
      for (let x = leaves[b]; x !== -1; x = prev.get(x)!) path.push(x);
      out.push(path.reverse());
    }
  }
  return out;
}

/** The same molecule written with `path` as its main chain, or null when the rest cannot be written as simple substituents. */
function skeletonFromPath(sk: Skeleton, nodes: CNode[], path: number[]): Skeleton | null {
  const gc = groupCarbon(sk);
  const g = sk.group;
  if (g && (g.kind === 'aldehyde' || g.kind === 'acid' || g.kind === 'ester') && path[path.length - 1] === 0) path = [...path].reverse();
  const on = new Set(path);
  const bondNodes = sk.bond ? [sk.bond.at - 1, sk.bond.at] : null;
  const isBondEdge = (a: number, b: number) => !!bondNodes && ((a === bondNodes[0] && b === bondNodes[1]) || (a === bondNodes[1] && b === bondNodes[0]));
  const subs: Array<{ at: number; prefix: Prefix }> = [];
  let group: Group | undefined;
  let bond: Skeleton['bond'];
  for (let i = 0; i < path.length; i++) {
    const node = nodes[path[i]];
    const pos = i + 1;
    if (node.main) {
      for (const s of subsOf(sk)) if (s.at === node.main && !isAlkyl(s.prefix)) subs.push({ at: pos, prefix: s.prefix });
      if (gc === node.main) {
        if (g!.kind === 'alcohol' || g!.kind === 'amine' || g!.kind === 'ketone') group = { kind: g!.kind, at: pos };
        else if (pos !== 1) return null;
        else group = g;
      }
    }
    if (i + 1 < path.length && isBondEdge(path[i], path[i + 1])) bond = { at: pos, order: sk.bond!.order };
    for (const q of node.adj) {
      if (on.has(q)) continue;
      // A branch must be a plain alkyl chain: unbranched, with nothing on it.
      let len = 0;
      let prev = path[i];
      let cur = q;
      for (;;) {
        if (isBondEdge(prev, cur)) return null;
        const c = nodes[cur];
        if (c.main && (gc === c.main || subsOf(sk).some((s) => s.at === c.main && !isAlkyl(s.prefix)))) return null;
        len++;
        const next = c.adj.filter((y) => y !== prev);
        if (next.length > 1) return null;
        if (!next.length) break;
        prev = cur;
        cur = next[0];
      }
      const name = (['methyl', 'ethyl', 'propyl'] as const)[len - 1];
      if (!name) return null;
      subs.push({ at: pos, prefix: name });
    }
  }
  if (sk.bond && !bond) return null;
  return { chain: path.length, subs, ...(bond && { bond }), ...(group && { group }) };
}

const pathHas = (path: number[], node: number) => path.includes(node);
/** How many substituents a chain would carry: atoms and groups on it, and branches off it. */
function substituentCount(sk: Skeleton, nodes: CNode[], path: number[]): number {
  const on = new Set(path);
  let n = 0;
  for (const x of path) {
    const node = nodes[x];
    if (node.main) n += subsOf(sk).filter((s) => s.at === node.main && !isAlkyl(s.prefix)).length;
    n += node.adj.filter((y) => !on.has(y)).length;
  }
  return n;
}

/**
 * Whether the main chain as written is the parent chain: the longest chain that holds the
 * functional group and the multiple bond, with the most substituents. A different chain that ties
 * on all of these must give the same name.
 */
export function isProper(sk: Skeleton): boolean {
  if (structureError(sk)) return false;
  const alkoxy = subsOf(sk).find((s) => isAlkoxy(s.prefix));
  if (alkoxy && ALKOXY_C[alkoxy.prefix as Alkoxy] > sk.chain) return false;
  const nodes = carbonGraph(sk);
  const gc = groupCarbon(sk);
  const g = sk.group;
  const terminal = g && (g.kind === 'aldehyde' || g.kind === 'acid' || g.kind === 'ester');
  const candidates = leafPaths(nodes).filter((p) => gc === null || (terminal ? p[0] === 0 || p[p.length - 1] === 0 : pathHas(p, gc - 1)));
  const longest = Math.max(...candidates.map((p) => p.length));
  if (sk.chain < longest) return false;
  const mainCount = subsOf(sk).length;
  let mainName: string | null = null;
  for (const p of candidates) {
    // The main chain itself is the one path of its length made only of chain carbons.
    if (p.length < sk.chain || p.every((x) => x < sk.chain)) continue;
    if (sk.bond && !(pathHas(p, sk.bond.at - 1) && pathHas(p, sk.bond.at))) continue;
    const c = substituentCount(sk, nodes, p);
    if (c < mainCount) continue;
    if (c > mainCount) return false;
    const alt = skeletonFromPath(sk, nodes, p);
    mainName ??= formatName(nameParts(sk), PREFERRED);
    if (!alt || structureError(alt) || formatName(nameParts(alt), PREFERRED) !== mainName) return false;
  }
  return true;
}

/** The same molecule written on its parent chain (in the order written), or null when this model cannot write it. */
export function canonical(sk: Skeleton): Skeleton | null {
  if (structureError(sk)) return null;
  if (isProper(sk)) return sk;
  const nodes = carbonGraph(sk);
  for (const p of leafPaths(nodes)) {
    const alt = skeletonFromPath(sk, nodes, p);
    if (alt && isProper(alt)) return alt;
  }
  return null;
}

/**
 * Every way of writing the molecule along one of its chains, the main chain included: a branched
 * alkane drawn with its longest chain bent. Each is the same compound.
 */
export function depictions(sk: Skeleton): Skeleton[] {
  const nodes = carbonGraph(sk);
  const out: Skeleton[] = [];
  for (const p of leafPaths(nodes)) {
    const alt = skeletonFromPath(sk, nodes, p);
    if (alt && !structureError(alt)) out.push(alt);
  }
  return out;
}

// ---------------------------------------------------------------------------- numbering and names

/** The locants that decide the numbering, in the order the rules compare them. */
function numberingKey(sk: Skeleton, reverse: boolean): number[][] {
  const n = sk.chain;
  const L = (p: number) => (reverse ? n + 1 - p : p);
  const gc = groupCarbon(sk);
  const group = gc === null ? [] : [L(gc)];
  const bond = sk.bond ? [reverse ? n - sk.bond.at : sk.bond.at] : [];
  const prefixes = subsOf(sk).map((s) => L(s.at)).sort((a, b) => a - b);
  const names = [...new Set(subsOf(sk).map((s) => s.prefix))].sort();
  const alpha = names.flatMap((nm) => subsOf(sk).filter((s) => s.prefix === nm).map((s) => L(s.at)).sort((a, b) => a - b));
  return [group, bond, prefixes, alpha];
}

function compareKeys(a: number[][], b: number[][]): number {
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a[i].length; j++) if (a[i][j] !== b[i][j]) return a[i][j] - b[i][j];
  }
  return 0;
}

/** Whether IUPAC numbering runs from the other end of the chain as written. */
function reversedNumbering(sk: Skeleton): boolean {
  const g = sk.group;
  if (g && (g.kind === 'aldehyde' || g.kind === 'acid' || g.kind === 'ester')) return false;
  return compareKeys(numberingKey(sk, true), numberingKey(sk, false)) < 0;
}

/** The skeleton written the other way round: carbon 1 becomes the last carbon. */
export function reversed(sk: Skeleton): Skeleton {
  const n = sk.chain;
  const g = sk.group;
  if (g && (g.kind === 'aldehyde' || g.kind === 'acid' || g.kind === 'ester')) return sk;
  return {
    chain: n,
    subs: subsOf(sk).map((s) => ({ at: n + 1 - s.at, prefix: s.prefix })),
    ...(sk.bond && { bond: { at: n - sk.bond.at, order: sk.bond.order } }),
    ...(g && { group: { kind: g.kind, at: n + 1 - (g as { at: number }).at } as Group }),
  };
}

/** The skeleton numbered as IUPAC numbers it: carbon 1 at the end that gives the lowest locants. */
export function numbered(sk: Skeleton): Skeleton {
  return reversedNumbering(sk) ? reversed(sk) : sk;
}

export interface NameParts {
  chain: number;
  prefixes: Array<{ prefix: Prefix; locants: number[] }>;
  bond?: { locant: number; order: 2 | 3 };
  group?: { kind: Group['kind']; locant?: number; alkyl?: number };
}

/** The pieces of the name of a skeleton whose main chain is its parent chain. */
export function nameParts(sk: Skeleton): NameParts {
  return partsAsNumbered(numbered(sk));
}

/** The pieces of a name with the chain numbered as written, carbon 1 first. */
function partsAsNumbered(s: Skeleton): NameParts {
  const names = [...new Set(subsOf(s).map((x) => x.prefix))].sort();
  const g = s.group;
  return {
    chain: s.chain,
    prefixes: names.map((prefix) => ({ prefix, locants: subsOf(s).filter((x) => x.prefix === prefix).map((x) => x.at).sort((a, b) => a - b) })),
    ...(s.bond && { bond: { locant: s.bond.at, order: s.bond.order } }),
    ...(g && { group: { kind: g.kind, ...('at' in g && { locant: g.at }), ...(g.kind === 'ester' && { alkyl: g.alkyl }) } }),
  };
}

interface Style {
  /** 2-butene, 1-propanol: the locant of the bond or group before the stem. */
  old: boolean;
  /** Which locants to write: the usual ones, all of them, or none. */
  locants: 'usual' | 'all' | 'none';
}
const PREFERRED: Style = { old: false, locants: 'usual' };

function formatName(p: NameParts, style: Style): string {
  const nPrefixes = p.prefixes.reduce((k, x) => k + x.locants.length, 0);
  const kind = p.group?.kind;
  const all = style.locants === 'all';
  const none = style.locants === 'none';
  // Locants that no one writes: on methane, and one substituent on ethane (chloroethane, chloroethene).
  const subLocants = !none && p.chain > 1 && (all || p.chain > 2 || nPrefixes > 1 || kind === 'alcohol' || kind === 'amine');
  const bondLocant = !none && (all ? p.chain > 2 : p.chain > 3);
  // Locants of a group: none for methanol, ethanol, propanone or butanone; propan-1-ol needs one.
  const groupLocant = !none && p.group?.locant !== undefined && (all ? p.chain > 1 : kind === 'ketone' ? p.chain > 4 || (p.chain === 4 && nPrefixes > 0) : p.chain > 2);
  const prefix = p.prefixes.map((x) => `${subLocants ? `${x.locants.join(',')}-` : ''}${MULT[x.locants.length]}${x.prefix}`).join(subLocants ? '-' : '');
  const stem = STEMS[p.chain];
  let parent: string;
  if (p.bond) {
    const ending = p.bond.order === 2 ? 'ene' : 'yne';
    parent = !bondLocant ? `${stem}${ending}` : style.old ? `${p.bond.locant}-${stem}${ending}` : `${stem}-${p.bond.locant}-${ending}`;
  } else if (kind === 'alcohol' || kind === 'amine' || kind === 'ketone') {
    const ending = kind === 'alcohol' ? 'ol' : kind === 'amine' ? 'amine' : 'one';
    parent = !groupLocant ? `${stem}an${ending}` : style.old ? `${p.group!.locant}-${stem}an${ending}` : `${stem}an-${p.group!.locant}-${ending}`;
  } else if (kind === 'aldehyde') parent = `${stem}anal`;
  else if (kind === 'acid') parent = `${stem}anoic acid`;
  else if (kind === 'ester') parent = `${stem}anoate`;
  else parent = `${stem}ane`;
  const joined = prefix && /^\d/.test(parent) ? `${prefix}-${parent}` : `${prefix}${parent}`;
  return kind === 'ester' ? `${alkylName(p.group!.alkyl!)} ${joined}` : joined;
}

/** Whether the name with every locant left out could only mean this compound (methylpropane, propanone). */
function locantFreeIsClear(sk: Skeleton): boolean {
  const n = sk.chain;
  const subs = subsOf(sk);
  if (n > 4 || subs.length > 3) return n === 1;
  const g = sk.group;
  const groupSpots: Array<Group | undefined> = !g ? [undefined] : 'at' in g ? Array.from({ length: n }, (_, i) => ({ kind: g.kind, at: i + 1 }) as Group) : [g];
  const bondSpots: Array<Skeleton['bond']> = sk.bond ? Array.from({ length: n - 1 }, (_, i) => ({ at: i + 1, order: sk.bond!.order })) : [undefined];
  const names = new Set<string>();
  const place = (k: number, acc: Array<{ at: number; prefix: Prefix }>) => {
    if (k === subs.length) {
      for (const group of groupSpots) {
        for (const bond of bondSpots) {
          const alt: Skeleton = { chain: n, subs: acc, ...(bond && { bond }), ...(group && { group }) };
          if (isProper(alt)) names.add(formatName(nameParts(alt), PREFERRED));
        }
      }
      return;
    }
    for (let at = 1; at <= n; at++) place(k + 1, [...acc, { at, prefix: subs[k].prefix }]);
  };
  place(0, []);
  return names.size === 1;
}

export interface OrganicName {
  /** The name as the questions write it: but-2-ene, propan-1-ol, 2-methylpropane, ethanoic acid. */
  name: string;
  /** Every spelling a student may type for it (lower case), the name first. */
  accepted: string[];
}

/** The name of a skeleton whose main chain is its parent chain. */
function namesOfProper(sk: Skeleton): OrganicName {
  const p = nameParts(sk);
  const name = formatName(p, PREFERRED);
  const forms = [name, formatName(p, { old: true, locants: 'usual' }), formatName(p, { old: false, locants: 'all' }), formatName(p, { old: true, locants: 'all' })];
  if (locantFreeIsClear(sk)) forms.push(formatName(p, { old: false, locants: 'none' }));
  const out = new Set<string>();
  for (const f of forms) {
    out.add(f);
    out.add(f.replace(/,/g, ', '));
  }
  return { name, accepted: [...out] };
}

/** The IUPAC name of any skeleton, found on its parent chain. Throws when the model cannot name it. */
export function nameOf(sk: Skeleton): OrganicName {
  const c = canonical(sk);
  if (!c) throw new Error(`Cannot name ${JSON.stringify(sk)}: ${structureError(sk) ?? 'no parent chain in this model'}`);
  return namesOfProper(c);
}

/** Just the name. */
export const iupacName = (sk: Skeleton) => nameOf(sk).name;

/**
 * The name a skeleton would get if its main chain as written were the parent chain, numbered the
 * IUPAC way or from the wrong end: the slips a student makes (2-ethylbutane, 4-methylpentane,
 * but-3-ene). The result may be the correct name, when the slip changes nothing.
 */
export function nameAsWritten(sk: Skeleton, opts: { wrongEnd?: boolean } = {}): string {
  const s = numbered(sk);
  return formatName(partsAsNumbered(opts.wrongEnd ? reversed(s) : s), PREFERRED);
}

// ---------------------------------------------------------------------------- formulas

/** The molecular formula in Hill order (C, H, then the rest alphabetically): C4H10, C2H4Br2, C3H6O2. */
export function molecularFormula(sk: Skeleton): string {
  const count = new Map<string, number>();
  const add = (el: string, k: number) => count.set(el, (count.get(el) ?? 0) + k);
  add('C', sk.chain);
  add('H', hydrogens(sk).reduce((a, b) => a + b, 0));
  for (const s of subsOf(sk)) {
    if (isAlkyl(s.prefix)) (add('C', ALKYL_C[s.prefix]), add('H', 2 * ALKYL_C[s.prefix] + 1));
    else if (isHalo(s.prefix)) add(HALO_SYMBOL[s.prefix], 1);
    else (add('O', 1), add('C', ALKOXY_C[s.prefix]), add('H', 2 * ALKOXY_C[s.prefix] + 1));
  }
  const g = sk.group;
  if (g) {
    if (g.kind === 'alcohol') (add('O', 1), add('H', 1));
    if (g.kind === 'amine') (add('N', 1), add('H', 2));
    if (g.kind === 'ketone' || g.kind === 'aldehyde') add('O', 1);
    if (g.kind === 'acid') (add('O', 2), add('H', 1));
    if (g.kind === 'ester') (add('O', 2), add('C', g.alkyl), add('H', 2 * g.alkyl + 1));
  }
  const order = ['C', 'H', ...[...count.keys()].filter((e) => e !== 'C' && e !== 'H').sort()];
  return order.map((el) => `${el}${count.get(el)! > 1 ? count.get(el) : ''}`).join('');
}

/** An unbranched alkyl group of k carbons, written from its point of attachment (right) or towards it (left). */
const alkylChain = (k: number, side: 'right' | 'left') => {
  const atoms = Array.from({ length: k }, (_, i) => (i === k - 1 ? 'CH3' : 'CH2'));
  return (side === 'right' ? atoms : atoms.reverse()).join('-');
};
const hText = (h: number) => (h === 0 ? '' : h === 1 ? 'H' : `H${h}`);

/** One chain carbon as a condensed formula writes it, given where it sits in the written chain. */
function carbonText(sk: Skeleton, p: number, h: number, end: 'left' | 'right' | 'mid' | 'only'): string {
  const here = subsOf(sk).filter((s) => s.at === p);
  const halos = here.filter((s) => isHalo(s.prefix)).map((s) => HALO_SYMBOL[s.prefix as Halo]);
  const haloText = [...new Set(halos)].sort().map((x) => `${x}${halos.filter((y) => y === x).length > 1 ? halos.filter((y) => y === x).length : ''}`).join('');
  const alkyls = here.filter((s) => isAlkyl(s.prefix)).map((s) => alkylChain(ALKYL_C[s.prefix as Alkyl], 'right').replace(/-/g, ''));
  const alkylText = [...new Set(alkyls)].map((x) => `(${x})${alkyls.filter((y) => y === x).length > 1 ? alkyls.filter((y) => y === x).length : ''}`).join('');
  let core = `C${hText(h)}${haloText}`;
  const g = groupCarbon(sk) === p ? sk.group! : null;
  const alkoxy = here.find((s) => isAlkoxy(s.prefix));
  const right = end === 'right' || end === 'only';
  if (g) {
    if (g.kind === 'alcohol' || g.kind === 'amine') {
      const x = g.kind === 'alcohol' ? 'OH' : 'NH2';
      if (end === 'mid') return `${core}(${x})${alkylText}`;
      return right ? `${core}${alkylText}-${x}` : `${g.kind === 'alcohol' ? 'HO' : 'H2N'}-${core}${alkylText}`;
    }
    if (g.kind === 'ketone') return `CO${alkylText}`;
    // Carbon 1 of an aldehyde, acid or ester; with only one carbon, the hydrogen is written first.
    const lone = sk.chain === 1;
    if (g.kind === 'aldehyde') return lone ? 'HCHO' : right ? 'CHO' : 'OHC';
    if (g.kind === 'acid') return lone ? 'HCOOH' : right ? 'COOH' : 'HOOC';
    if (g.kind !== 'ester') throw new Error(`no condensed formula for a ${g.kind} at this end`);
    if (lone) return `HCOO-${alkylChain(g.alkyl, 'right')}`;
    return right ? `COO-${alkylChain(g.alkyl, 'right')}` : `${alkylChain(g.alkyl, 'left')}-OOC`;
  }
  if (alkoxy) {
    const k = ALKOXY_C[alkoxy.prefix as Alkoxy];
    if (end === 'mid') return `${core}(O${alkylChain(k, 'right').replace(/-/g, '')})${alkylText}`;
    return right ? `${core}${alkylText}-O-${alkylChain(k, 'right')}` : `${alkylChain(k, 'left')}-O-${core}${alkylText}`;
  }
  core += alkylText;
  return core;
}

export interface CondensedOptions {
  /** Write the chain exactly as the skeleton numbers it (by default it is numbered first, the IUPAC way). */
  asWritten?: boolean;
  /** Write it from the last carbon to carbon 1. */
  reverse?: boolean;
}

/**
 * The condensed formula, for mhchem: CH3-CH(CH3)-CH2-CH3, CH2=CH-CH3, CH3-CH2-COOH. By default the
 * chain is written from carbon 1, except that a group at the end of the chain (an acid, an aldehyde,
 * an ester or a group on carbon 1) is written last, at the right.
 */
export function condensed(sk: Skeleton, opts: CondensedOptions = {}): string {
  const s = opts.asWritten ? sk : numbered(canonical(sk) ?? sk);
  const h = hydrogens(s);
  let order = Array.from({ length: s.chain }, (_, i) => i + 1);
  // A functional group on carbon 1, or a halogen on carbon 1 alone, is written at the right: CH3-CH2-OH,
  // CH3-COOH, CH3-CH2-CH2Br, CH2=CHCl.
  const halo = (p: number) => subsOf(s).some((x) => x.at === p && isHalo(x.prefix));
  const flip = !opts.asWritten && s.chain > 1 && (groupCarbon(s) === 1 || (!s.group && halo(1) && !halo(s.chain)));
  if (flip !== !!opts.reverse) order = order.reverse();
  const parts = order.map((p, i) => carbonText(s, p, h[p - 1], s.chain === 1 ? 'only' : i === 0 ? 'left' : i === order.length - 1 ? 'right' : 'mid'));
  let out = parts[0];
  for (let i = 1; i < order.length; i++) {
    const a = Math.min(order[i - 1], order[i]);
    const b = bondOrder(s, a);
    out += `${b === 2 ? '=' : b === 3 ? '#' : '-'}${parts[i]}`;
  }
  return out;
}

/** The family a compound belongs to, by its functional group. */
export function familyOf(sk: Skeleton): Family {
  const g = sk.group;
  if (g) return g.kind === 'acid' ? 'carboxylic acid' : g.kind;
  if (subsOf(sk).some((s) => isAlkoxy(s.prefix))) return 'ether';
  if (subsOf(sk).some((s) => isHalo(s.prefix))) return 'haloalkane';
  return sk.bond ? (sk.bond.order === 2 ? 'alkene' : 'alkyne') : 'alkane';
}

/** Whether two skeletons are the same compound (the same name, however each is drawn). */
export const sameCompound = (a: Skeleton, b: Skeleton) => iupacName(a) === iupacName(b);

// ---------------------------------------------------------------------------- isomers

/**
 * The structural isomers among acyclic hydrocarbons with `carbons` carbons: alkanes, or alkenes or
 * alkynes with one multiple bond. One skeleton per compound, each on its parent chain, ordered by
 * name. (Ring compounds, which share the alkenes' formula, are not included.)
 */
export function hydrocarbonIsomers(carbons: number, kind: 'alkane' | 'alkene' | 'alkyne' = 'alkane'): Skeleton[] {
  const found = new Map<string, Skeleton>();
  const order = kind === 'alkene' ? 2 : 3;
  for (let chain = carbons; chain >= 1; chain--) {
    const extra = carbons - chain;
    // Branches as methyl and ethyl groups on inner carbons, in non-decreasing order of position.
    const place = (left: number, from: number, acc: Array<{ at: number; prefix: Prefix }>) => {
      if (left === 0) {
        const bonds: Array<Skeleton['bond']> = kind === 'alkane' ? [undefined] : Array.from({ length: chain - 1 }, (_, i) => ({ at: i + 1, order: order as 2 | 3 }));
        for (const bond of bonds) {
          const sk: Skeleton = { chain, subs: acc, ...(bond && { bond }) };
          if (!isProper(sk)) continue;
          const name = formatName(nameParts(sk), PREFERRED);
          if (!found.has(name)) found.set(name, numbered(sk));
        }
        return;
      }
      for (let at = from; at <= chain; at++) {
        for (const prefix of ['methyl', 'ethyl'] as const) {
          if (ALKYL_C[prefix] > left) continue;
          place(left - ALKYL_C[prefix], at, [...acc, { at, prefix }]);
        }
      }
    };
    if (chain >= 1) place(extra, 1, []);
  }
  return [...found.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([, sk]) => sk);
}
