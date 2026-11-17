/**
 * Molecules as balls and sticks, for the organic chemistry videos: each stage of a molecules
 * element is an arrangement of its atoms and bonds, and a clip moves from one stage to the next.
 * The atoms glide to their new places; a bond that breaks turns red and fades over the first half
 * of the move, and a bond that forms fades in green over the second half and stays green for a
 * moment after, so the bonds broken and made can be followed.
 *
 * Everything is worked out from the clips played and the time, so any frame can be drawn on its
 * own.
 */
import type { MoleculesEl, MolPhase, MolStage, Tone } from './script.ts';

/** A clip started at an age (seconds since the element appeared). */
export type MolPlay = [clip: string, age: number];

/** How long a new bond stays green once it has formed, in seconds. */
export const FRESH = 2.5;

export interface MolAtomAt {
  name: string;
  el: string;
  x: number;
  y: number;
  opacity: number;
  charge: number;
  /** How far the charge is shown (it fades in and out as the charge changes). */
  chargeOpacity: number;
}

export interface MolBondLine {
  a: string;
  b: string;
  /** Sideways from the line between the atoms, in the element's units (for double and triple bonds). */
  offset: number;
  opacity: number;
  /** Breaking (red) or new (green), and how strongly. */
  tint?: { tone: 'bad' | 'good'; amount: number };
}

export interface MoleculesFrame {
  atoms: MolAtomAt[];
  bonds: MolBondLine[];
  names: Array<{ text: string; x: number; y: number; opacity: number; tone?: Tone }>;
}

const ease = (x: number) => {
  const v = Math.max(0, Math.min(1, x));
  return v < 0.5 ? 4 * v * v * v : 1 - (-2 * v + 2) ** 3 / 2;
};
const clamp01 = (x: number) => Math.max(0, Math.min(1, x));

/** The space between the lines of a double or triple bond, in the element's units. */
const GAP = 0.13;
const LAYOUT: Record<number, number[]> = { 0: [], 1: [0], 2: [-GAP, GAP], 3: [-2 * GAP, 0, 2 * GAP] };

const BOND = /^([A-Za-z0-9_']+)([-=#])([A-Za-z0-9_']+)$/;
const ORDER: Record<string, number> = { '-': 1, '=': 2, '#': 3 };

/** A stage's bonds as "a|b" (names in order) to their order. */
export function parseBonds(bonds: string): Map<string, number> {
  const out = new Map<string, number>();
  for (const tok of bonds.split(/\s+/).filter(Boolean)) {
    const m = tok.match(BOND);
    if (!m) continue;
    const [a, b] = [m[1], m[3]].sort();
    out.set(`${a}|${b}`, ORDER[m[2]]);
  }
  return out;
}

export function atomElement(el: MoleculesEl, name: string): string {
  const a = el.atoms[name];
  return typeof a === 'string' ? a : a.el;
}

/** Whether both atoms of a bond ("a|b") are in both stages. */
function inBoth(from: MolStage, to: MolStage, key: string): boolean {
  const [a, b] = key.split('|');
  return !!(from.at[a] && from.at[b] && to.at[a] && to.at[b]);
}

/** Each moved-to stage, in order, with when the move starts and how long it takes. */
function moves(el: MoleculesEl, played: MolPlay[], age: number): Array<{ to: string; at: number; dur: number }> {
  const out: Array<{ to: string; at: number; dur: number }> = [];
  for (const [clip, at0] of played) {
    let at = at0;
    for (const ph of (el.clips[clip]?.phases ?? []) as MolPhase[]) {
      if (at > age) break;
      if (ph.to) out.push({ to: ph.to, at, dur: ph.dur });
      at += ph.dur;
    }
  }
  return out;
}

/** A small steady jiggle for each atom, so the molecules never look frozen. */
function jiggle(name: string, age: number): [number, number] {
  let h = 2166136261;
  for (const c of name) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  const u = ((h >>> 0) % 1000) / 1000;
  const v = ((h >>> 10) % 1000) / 1000;
  const a = 0.035;
  return [a * Math.sin(2 * Math.PI * (0.55 + 0.3 * u) * age + 6.28 * v), a * Math.cos(2 * Math.PI * (0.5 + 0.3 * v) * age + 6.28 * u)];
}

export function moleculesAt(el: MoleculesEl, played: MolPlay[], age: number): MoleculesFrame {
  let cur: MolStage = el.stages[el.start];
  // When each line of each bond formed (for its green), by "a|b" and the line's place.
  const formed = new Map<string, number[]>();
  let move: { from: MolStage; to: MolStage; k: number } | null = null;
  for (const m of moves(el, played, age)) {
    const to = el.stages[m.to];
    if (!to) continue;
    const end = m.at + m.dur;
    if (age < end) {
      move = { from: cur, to, k: clamp01((age - m.at) / m.dur) };
      break;
    }
    // A finished move: note the lines it added.
    const before = parseBonds(cur.bonds);
    for (const [key, n] of parseBonds(to.bonds)) {
      // A bond that comes in with its atoms (a new molecule fading in) is not a bond being made.
      if (!inBoth(cur, to, key)) {
        formed.delete(key);
        continue;
      }
      const was = before.get(key) ?? 0;
      const times = (formed.get(key) ?? []).slice(0, Math.min(was, n));
      for (let i = was; i < n; i++) times[i] = end;
      formed.set(key, times);
    }
    for (const key of before.keys()) if (!parseBonds(to.bonds).has(key)) formed.delete(key);
    cur = to;
  }

  const from = move?.from ?? cur;
  const to = move?.to ?? cur;
  const k = move?.k ?? 1;
  const e = ease(k);
  const names = Object.keys(el.atoms);
  const pos = new Map<string, [number, number]>();
  const atoms: MolAtomAt[] = [];
  for (const name of names) {
    const a = from.at[name];
    const b = to.at[name];
    if (!a && !b) continue;
    const p0 = a ?? b!;
    const p1 = b ?? a!;
    const [jx, jy] = jiggle(name, age);
    const x = p0[0] + (p1[0] - p0[0]) * e + jx;
    const y = p0[1] + (p1[1] - p0[1]) * e + jy;
    pos.set(name, [x, y]);
    const opacity = a && b ? 1 : a ? 1 - clamp01(k * 2) : clamp01(k * 2 - 1);
    const q0 = from.charges?.[name] ?? 0;
    const q1 = to.charges?.[name] ?? 0;
    // A charge that changes fades out in the first half and the new one in over the second.
    const charge = k < 0.5 ? q0 : q1;
    const chargeOpacity = q0 === q1 ? 1 : k < 0.5 ? 1 - clamp01(k * 2) : clamp01(k * 2 - 1);
    atoms.push({ name, el: atomElement(el, name), x, y, opacity, charge, chargeOpacity });
  }

  const b0 = parseBonds(from.bonds);
  const b1 = parseBonds(to.bonds);
  const bonds: MolBondLine[] = [];
  for (const key of new Set([...b0.keys(), ...b1.keys()])) {
    const [a, b] = key.split('|');
    if (!pos.has(a) || !pos.has(b)) continue;
    const n0 = move ? (b0.get(key) ?? 0) : (b1.get(key) ?? 0);
    const n1 = b1.get(key) ?? 0;
    const L0 = LAYOUT[n0];
    const L1 = LAYOUT[n1];
    if (move && !inBoth(from, to, key)) {
      // The bond's molecule is fading in or out as a whole: no red or green.
      for (const off of n1 ? L1 : L0) bonds.push({ a, b, offset: off, opacity: 1 });
      continue;
    }
    const times = formed.get(key) ?? [];
    for (let i = 0; i < Math.max(n0, n1); i++) {
      if (i < Math.min(n0, n1)) {
        const born = times[i];
        const fresh = born !== undefined ? 1 - clamp01((age - born) / FRESH) : 0;
        bonds.push({ a, b, offset: L0[i] + (L1[i] - L0[i]) * e, opacity: 1, ...(fresh > 0 ? { tint: { tone: 'good', amount: fresh } } : {}) });
      } else if (i < n0) {
        // Breaking: red at once, fading over the first half.
        bonds.push({ a, b, offset: L0[i], opacity: 1 - clamp01(k * 2), tint: { tone: 'bad', amount: 1 } });
      } else {
        // Forming: fading in green over the second half.
        bonds.push({ a, b, offset: L1[i], opacity: clamp01(k * 2 - 1), tint: { tone: 'good', amount: 1 } });
      }
    }
  }

  const nameRows: MoleculesFrame['names'] = [];
  const same = from === to;
  for (const nm of from.names ?? []) {
    const kept = (to.names ?? []).some((m) => m.text === nm.text && m.at[0] === nm.at[0] && m.at[1] === nm.at[1]);
    nameRows.push({ text: nm.text, x: nm.at[0], y: nm.at[1], tone: nm.tone, opacity: same || kept ? 1 : 1 - clamp01(k * 2) });
  }
  if (!same)
    for (const nm of to.names ?? []) {
      const kept = (from.names ?? []).some((m) => m.text === nm.text && m.at[0] === nm.at[0] && m.at[1] === nm.at[1]);
      if (!kept) nameRows.push({ text: nm.text, x: nm.at[0], y: nm.at[1], tone: nm.tone, opacity: clamp01(k * 2 - 1) });
    }
  return { atoms, bonds, names: nameRows.filter((r) => r.opacity > 0) };
}

export function checkMolecules(el: MoleculesEl): string[] {
  const problems: string[] = [];
  const atoms = new Set(Object.keys(el.atoms));
  if (!el.stages[el.start]) problems.push(`there is no stage "${el.start}" to start from.`);
  for (const [name, st] of Object.entries(el.stages)) {
    for (const a of Object.keys(st.at)) {
      if (!atoms.has(a)) problems.push(`stage "${name}" places no atom "${a}".`);
      const [x, y] = st.at[a];
      if (x < 0 || x > el.span[0] || y < 0 || y > el.span[1]) problems.push(`stage "${name}": atom "${a}" is outside the span.`);
    }
    for (const tok of st.bonds.split(/\s+/).filter(Boolean)) {
      const m = tok.match(BOND);
      if (!m) problems.push(`stage "${name}": cannot read the bond "${tok}" (write it like C1-H1, C1=C2 or C1#C2).`);
      else if (!st.at[m[1]] || !st.at[m[3]]) problems.push(`stage "${name}": the bond "${tok}" joins an atom the stage does not place.`);
    }
    for (const a of Object.keys(st.charges ?? {})) if (!st.at[a]) problems.push(`stage "${name}" gives a charge to an atom it does not place ("${a}").`);
  }
  for (const [name, clip] of Object.entries(el.clips))
    clip.phases.forEach((ph, pi) => {
      if (!(ph.dur > 0)) problems.push(`clip "${name}", phase ${pi + 1} needs a length (dur).`);
      if (ph.to && !el.stages[ph.to]) problems.push(`clip "${name}", phase ${pi + 1} moves to no stage "${ph.to}".`);
    });
  if (el.poster && !el.clips[el.poster]) problems.push(`the poster names no clip "${el.poster}".`);
  return problems;
}
