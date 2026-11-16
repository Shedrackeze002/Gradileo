/**
 * Atoms drawn as a nucleus with its electrons circling in shells, for the chemistry videos on
 * electron arrangements, ions and bonding. Clips fill shells electron by electron (inside out),
 * pass outer electrons from one atom to another (making ions), slide atoms about, and share
 * pairs of outer electrons between two atoms (a covalent bond). Each electron keeps the colour of
 * the atom it came from, so a transferred or shared electron can be followed.
 *
 * Everything is worked out from the clips played and the time, so any frame can be drawn on its
 * own: each phase turns one arrangement into the next, and part way through a phase each
 * electron is drawn part way from where it was to where it is going.
 */
import type { AtomsEl, AtomsPhase } from './script.ts';

/** How many electrons each shell holds (the first twenty elements fill 2, 8, 8, then the fourth). */
export const SHELL_CAP = [2, 8, 8, 18];
/** Each shell's radius, in the element's units. */
export const SHELL_R = [1, 1.6, 2.2, 2.8];
/** How fast each shell turns, in radians a second (outer shells turn more slowly). */
const SPIN = [0.9, 0.6, 0.45, 0.35];
/** The order an 8-shell's places fill, so a part-filled shell stays balanced. */
const ORDER8 = [0, 4, 2, 6, 1, 5, 3, 7];

/** A clip started at an age (seconds since the element appeared). */
export type AtomsPlay = [clip: string, age: number];

interface Electron {
  /** The atom it started on (its colour). */
  home: number;
  /** The atom it is on now. */
  atom: number;
  shell: number;
  /** Its place in the shell (0 to the shell's size less 1). */
  slot: number;
  /** When it is shared: the other atom, and its place among the bond's electrons. */
  bond?: { other: number; k: number; n: number };
  /** When it is drifting off on its own (given to no atom), the direction it leaves in. */
  away?: number;
  /** Where it sits on its shell once its atom has bonded (kept clear of the bonds); it no longer turns. */
  angle?: number;
}

interface Arrangement {
  centres: Array<[number, number]>;
  electrons: Electron[];
  /** The time each atom's outer shell stopped turning (after it shared electrons). */
  frozen: Array<number | undefined>;
}

/** Where an electron is drawn, with its colour (the atom it came from) and how far it has appeared. */
export interface ElectronAt {
  x: number;
  y: number;
  home: number;
  opacity: number;
}

export interface AtomsFrame {
  centres: Array<[number, number]>;
  electrons: ElectronAt[];
  /** For each atom, how many electrons each of its shells holds (a shared electron counts for both). */
  shells: number[][];
  /** For each atom, its charge: protons less electrons. */
  charges: number[];
  /** For each atom, the electrons in each shell including any still appearing (so its ring is drawn). */
  rings: number[][];
}

function slotAngle(shell: number, slot: number): number {
  const cap = SHELL_CAP[shell];
  const place = cap === 8 ? ORDER8[slot] : slot;
  return -Math.PI / 2 + (2 * Math.PI * place) / cap;
}

/** The first empty place on an atom, inside shells first. */
function nextPlace(electrons: Electron[], atom: number): { shell: number; slot: number } {
  for (let shell = 0; shell < SHELL_CAP.length; shell++) {
    const used = new Set(electrons.filter((e) => e.atom === atom && e.shell === shell && !e.away).map((e) => e.slot));
    for (let slot = 0; slot < SHELL_CAP[shell]; slot++) if (!used.has(slot)) return { shell, slot };
  }
  throw new Error('An atom has more electrons than its shells hold.');
}

/** An atom's outermost shell with electrons in it. */
function outerShell(electrons: Electron[], atom: number): number {
  return Math.max(-1, ...electrons.filter((e) => e.atom === atom && !e.away).map((e) => e.shell));
}

function start(el: AtomsEl): Arrangement {
  const electrons: Electron[] = [];
  el.atoms.forEach((a, i) => {
    for (let k = 0; k < (a.electrons ?? a.protons); k++) electrons.push({ home: i, atom: i, ...nextPlace(electrons, i) });
  });
  return { centres: el.atoms.map((a) => a.at), electrons, frozen: el.atoms.map(() => undefined) };
}

/** The arrangement a phase leaves (it ends at time `end`), and the electrons it adds. */
function apply(el: AtomsEl, prev: Arrangement, ph: AtomsPhase, end: number): { next: Arrangement; added: number[] } {
  const idx = (id: string) => el.atoms.findIndex((a) => a.id === id);
  const next: Arrangement = { centres: prev.centres.map((c) => [...c] as [number, number]), electrons: prev.electrons.map((e) => ({ ...e })), frozen: [...prev.frozen] };
  const added: number[] = [];
  for (const [id, at] of Object.entries(ph.move ?? {})) next.centres[idx(id)] = at;
  for (const [id, n] of Object.entries(ph.fill ?? {})) {
    const i = idx(id);
    while (next.electrons.filter((e) => e.atom === i && !e.away).length < n) {
      added.push(next.electrons.length);
      next.electrons.push({ home: i, atom: i, ...nextPlace(next.electrons, i) });
    }
  }
  for (const g of ph.give ?? []) {
    const from = idx(g.from);
    for (let k = 0; k < g.n; k++) {
      // The outer electron that goes is the last to have filled its shell.
      const shell = outerShell(next.electrons, from);
      const e = next.electrons.filter((x) => x.atom === from && x.shell === shell && !x.away && !x.bond).sort((p, q) => SHELL_CAP[shell] === 8 ? ORDER8.indexOf(q.slot) - ORDER8.indexOf(p.slot) : q.slot - p.slot)[0];
      if (!e) break;
      if (g.to === null) {
        const [cx, cy] = next.centres[from];
        e.away = Math.atan2(cy - el.span[1] / 2, cx - el.span[0] / 2) || -Math.PI / 2;
      } else {
        const to = idx(g.to);
        Object.assign(e, { atom: to }, nextPlace(next.electrons.filter((x) => x !== e), to));
      }
    }
  }
  for (const s of ph.share ?? []) {
    const [a, b] = [idx(s.a), idx(s.b)];
    // Each atom shares its outer electrons nearest the other atom (where they are as the phase ends).
    const pick = (i: number, j: number) => {
      const [cx, cy] = next.centres[i];
      const [ox, oy] = next.centres[j];
      const toward = Math.atan2(oy - cy, ox - cx);
      const shell = outerShell(next.electrons, i);
      const turn = SPIN[shell] * (next.frozen[i] ?? end);
      const gap = (e: Electron) => Math.abs(Math.atan2(Math.sin(slotAngle(e.shell, e.slot) + turn - toward), Math.cos(slotAngle(e.shell, e.slot) + turn - toward)));
      return next.electrons.filter((e) => e.atom === i && e.shell === shell && !e.bond && !e.away).sort((p, q) => gap(p) - gap(q)).slice(0, s.n);
    };
    const mine = pick(a, b);
    const theirs = pick(b, a);
    const pairs = [...mine, ...theirs];
    pairs.forEach((e, k) => (e.bond = { other: e.atom === a ? b : a, k, n: pairs.length }));
    next.frozen[a] ??= end;
    next.frozen[b] ??= end;
  }
  // A bonded atom's other outer electrons move round its shell, clear of its bonds.
  const bonded = new Set((ph.share ?? []).flatMap((s) => [idx(s.a), idx(s.b)]));
  for (const i of bonded) spreadLonePairs(next, i, end);
  return { next, added };
}

/**
 * Places a bonded atom's unshared outer electrons round its shell as far from its bonds (and one
 * another) as they can be, nearest first so they move as little as they can.
 */
function spreadLonePairs(arr: Arrangement, i: number, end: number) {
  const shell = outerShell(arr.electrons, i);
  const [cx, cy] = arr.centres[i];
  const bonds = [...new Set(arr.electrons.filter((e) => e.bond && (e.atom === i || e.bond.other === i)).map((e) => (e.atom === i ? e.bond!.other : e.atom)))].map((j) => Math.atan2(arr.centres[j][1] - cy, arr.centres[j][0] - cx));
  const lone = arr.electrons.filter((e) => e.atom === i && e.shell === shell && !e.bond && !e.away);
  if (!bonds.length || !lone.length) return;
  const gap = (a: number, b: number) => Math.abs(Math.atan2(Math.sin(a - b), Math.cos(a - b)));
  const taken = [...bonds];
  const chosen: number[] = [];
  const candidates = Array.from({ length: 36 }, (_, k) => (2 * Math.PI * k) / 36);
  for (let n = 0; n < lone.length; n++) {
    // Lone electrons come in pairs: the second of a pair sits beside the first.
    if (n % 2 === 1) {
      const first = chosen[n - 1];
      const side = [first + 0.32, first - 0.32].sort((p, q) => Math.min(...taken.map((t) => gap(q, t))) - Math.min(...taken.map((t) => gap(p, t))))[0];
      chosen.push(side);
      taken.push(side);
      continue;
    }
    const best = candidates.reduce((p, q) => (Math.min(...taken.map((t) => gap(q, t))) > Math.min(...taken.map((t) => gap(p, t))) ? q : p));
    chosen.push(best);
    taken.push(best);
  }
  // Each electron goes to the free place nearest to where it is.
  const turn = SPIN[shell] * (arr.frozen[i] ?? end);
  const left = [...chosen];
  for (const e of lone) {
    const now = e.angle ?? slotAngle(e.shell, e.slot) + turn;
    const k = left.reduce((p, q, qi) => (gap(q, now) < gap(left[p], now) ? qi : p), 0);
    e.angle = left.splice(k, 1)[0];
  }
}

/** Where an electron is at time `t` in an arrangement. */
function place(el: AtomsEl, arr: Arrangement, e: Electron, t: number): [number, number] {
  const [cx, cy] = arr.centres[e.atom];
  if (e.away !== undefined) {
    const r = SHELL_R[e.shell] + el.span[0];
    return [cx + r * Math.cos(e.away), cy + r * Math.sin(e.away)];
  }
  if (e.bond) {
    // Shared electrons sit side by side, across the bond, where the two atoms' outer shells
    // overlap: one from each atom in each pair, and a second pair (a double bond) beside the first.
    const [lo, hi] = [Math.min(e.atom, e.bond.other), Math.max(e.atom, e.bond.other)];
    const [ax, ay] = arr.centres[lo];
    const [bx, by] = arr.centres[hi];
    const d = Math.hypot(bx - ax, by - ay) || 1;
    const [ux, uy] = [(bx - ax) / d, (by - ay) / d];
    const mid = (SHELL_R[outerShell(arr.electrons, lo)] + d - SHELL_R[outerShell(arr.electrons, hi)]) / 2;
    const half = e.bond.n / 2;
    const at = 2 * (e.bond.k % half) + (e.bond.k < half ? 0 : 1);
    const off = (at - (e.bond.n - 1) / 2) * 0.42;
    return [ax + ux * mid - uy * off, ay + uy * mid + ux * off];
  }
  if (e.angle !== undefined) return [cx + SHELL_R[e.shell] * Math.cos(e.angle), cy + SHELL_R[e.shell] * Math.sin(e.angle)];
  const turn = SPIN[e.shell] * (arr.frozen[e.atom] !== undefined && e.shell === outerShell(arr.electrons, e.atom) ? Math.min(t, arr.frozen[e.atom]!) : t);
  const a = slotAngle(e.shell, e.slot) + turn;
  const r = SHELL_R[e.shell];
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
}

const ease = (x: number) => {
  const v = Math.max(0, Math.min(1, x));
  return v < 0.5 ? 4 * v * v * v : 1 - (-2 * v + 2) ** 3 / 2;
};

/** The phases played by `age`, in order, each with when it starts. */
function timedPhases(el: AtomsEl, played: AtomsPlay[], age: number): Array<{ ph: AtomsPhase; at: number }> {
  const out: Array<{ ph: AtomsPhase; at: number }> = [];
  for (const [clip, at0] of played) {
    let at = at0;
    for (const ph of el.clips[clip]?.phases ?? []) {
      if (at > age) break;
      out.push({ ph, at });
      at += ph.dur;
    }
  }
  return out;
}

function summary(el: AtomsEl, arr: Arrangement): Pick<AtomsFrame, 'shells' | 'charges'> {
  const shells = el.atoms.map((_, i) => {
    const counts = SHELL_CAP.map(() => 0);
    for (const e of arr.electrons) if (!e.away && (e.atom === i || e.bond?.other === i)) counts[e.atom === i ? e.shell : outerShell(arr.electrons, i)]++;
    while (counts.length && !counts[counts.length - 1]) counts.pop();
    return counts;
  });
  const charges = el.atoms.map((a, i) => a.protons - arr.electrons.filter((e) => e.atom === i && !e.away).length);
  return { shells, charges };
}

/** The atoms at `age` seconds after the element appeared, with these clips started. */
export function atomsAt(el: AtomsEl, played: AtomsPlay[], age: number): AtomsFrame {
  let arr = start(el);
  for (const { ph, at } of timedPhases(el, played, age)) {
    const end = at + ph.dur;
    const { next, added } = apply(el, arr, ph, end);
    if (age >= end) {
      arr = next;
      continue;
    }
    // Part way through: each electron part way from where it was to where it is going; added
    // electrons appear one after another.
    const k = (age - at) / ph.dur;
    const e = ease(k);
    const centres = arr.centres.map((c, i) => [c[0] + (next.centres[i][0] - c[0]) * e, c[1] + (next.centres[i][1] - c[1]) * e] as [number, number]);
    const electrons: ElectronAt[] = next.electrons.map((n, j) => {
      const [nx, ny] = place(el, next, n, age);
      const ai = added.indexOf(j);
      if (ai >= 0) {
        // Added electrons come in one by one, each over its share of the phase.
        const f = Math.max(0, Math.min(1, k * added.length - ai));
        return { x: nx, y: ny, home: n.home, opacity: f };
      }
      const [px, py] = place(el, arr, arr.electrons[j], age);
      // An electron passed to another atom lifts in an arc on its way.
      const moved = arr.electrons[j].atom !== n.atom;
      const lift = moved ? Math.sin(Math.PI * e) * 1.2 : 0;
      return { x: px + (nx - px) * e, y: py + (ny - py) * e - lift, home: n.home, opacity: n.away !== undefined ? 1 - e : 1 };
    });
    // An added electron counts once it is half way in; its shell's ring shows as soon as it starts.
    const shown = (cut: number) => ({ ...next, electrons: next.electrons.filter((_, j) => added.indexOf(j) < 0 || k * added.length - added.indexOf(j) > cut) });
    const now = summary(el, added.length ? shown(0.5) : k < 0.5 ? arr : next);
    return { centres, electrons, ...now, rings: summary(el, added.length ? shown(0) : k < 0.5 ? arr : next).shells };
  }
  return {
    centres: arr.centres,
    electrons: arr.electrons.filter((e) => e.away === undefined).map((e) => {
      const [x, y] = place(el, arr, e, age);
      return { x, y, home: e.home, opacity: 1 };
    }),
    ...summary(el, arr),
    rings: summary(el, arr).shells,
  };
}

/** How long a clip lasts, in seconds. */
export function atomsClipSeconds(el: AtomsEl, clip: string): number {
  return el.clips[clip].phases.reduce((n, ph) => n + ph.dur, 0);
}

/** Problems with an atoms element: clips that name no atom, more electrons than the shells hold. */
export function checkAtoms(el: AtomsEl): string[] {
  const problems: string[] = [];
  const ids = new Set(el.atoms.map((a) => a.id));
  const total = SHELL_CAP.reduce((s, c) => s + c, 0);
  for (const a of el.atoms) {
    if ((a.electrons ?? a.protons) > total) problems.push(`atom "${a.id}" has more electrons than its shells hold.`);
    if (a.at[0] < 0 || a.at[0] > el.span[0] || a.at[1] < 0 || a.at[1] > el.span[1]) problems.push(`atom "${a.id}" is outside the span.`);
  }
  for (const [name, clip] of Object.entries(el.clips)) {
    clip.phases.forEach((ph, pi) => {
      const named = [...Object.keys(ph.move ?? {}), ...Object.keys(ph.fill ?? {}), ...(ph.give ?? []).flatMap((g) => [g.from, ...(g.to ? [g.to] : [])]), ...(ph.share ?? []).flatMap((s) => [s.a, s.b])];
      for (const id of named) if (!ids.has(id)) problems.push(`clip "${name}", phase ${pi + 1} names no atom "${id}".`);
      if (!(ph.dur > 0)) problems.push(`clip "${name}", phase ${pi + 1} needs a length (dur).`);
      for (const [id, n] of Object.entries(ph.fill ?? {})) if (n > total) problems.push(`clip "${name}", phase ${pi + 1} fills atom "${id}" past what its shells hold.`);
    });
  }
  return problems;
}
