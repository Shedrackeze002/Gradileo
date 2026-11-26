import type { MolAtom, MoleculesEl, MolStage, ParticlesEl, Tone } from '@/video/script.ts';

// Equations and counting as moving pictures, for the calculation lessons (src/video/molecules.ts
// draws the balls and sticks): the atoms of the reactants come apart and join up again as the
// products, every atom kept, so the picture shows why an equation balances; nuclei built from
// protons and neutrons; and a sample of two isotopes.

type At = [number, number];
const r3 = (v: number) => Math.round(v * 1000) / 1000;

/** A molecule's atoms ([symbol, x, y, charge]) about its centre, and its bonds by atom index ("0-1 0=2"). */
interface Template {
  atoms: Array<[string, number, number, number?]>;
  bonds: string;
  formula: string;
}

const T: Record<string, Template> = {
  H: { atoms: [['H', 0, 0]], bonds: '', formula: 'H' },
  C: { atoms: [['C', 0, 0]], bonds: '', formula: 'C' },
  O: { atoms: [['O', 0, 0]], bonds: '', formula: 'O' },
  N: { atoms: [['N', 0, 0]], bonds: '', formula: 'N' },
  Na: { atoms: [['Na', 0, 0]], bonds: '', formula: 'Na' },
  Mg: { atoms: [['Mg', 0, 0]], bonds: '', formula: 'Mg' },
  H2: { atoms: [['H', -0.37, 0], ['H', 0.37, 0]], bonds: '0-1', formula: 'H₂' },
  O2: { atoms: [['O', -0.6, 0], ['O', 0.6, 0]], bonds: '0=1', formula: 'O₂' },
  N2: { atoms: [['N', -0.55, 0], ['N', 0.55, 0]], bonds: '0#1', formula: 'N₂' },
  F: { atoms: [['F', 0, 0]], bonds: '', formula: 'F' },
  F2: { atoms: [['F', -0.6, 0], ['F', 0.6, 0]], bonds: '0-1', formula: 'F₂' },
  Cl2: { atoms: [['Cl', -0.7, 0], ['Cl', 0.7, 0]], bonds: '0-1', formula: 'Cl₂' },
  H2O: { atoms: [['O', 0, -0.2], ['H', -0.78, 0.4], ['H', 0.78, 0.4]], bonds: '0-1 0-2', formula: 'H₂O' },
  H2O2: { atoms: [['O', -0.6, 0], ['O', 0.6, 0], ['H', -1.2, -0.6], ['H', 1.2, 0.6]], bonds: '0-1 0-2 1-3', formula: 'H₂O₂' },
  CO: { atoms: [['C', -0.55, 0], ['O', 0.55, 0]], bonds: '0#1', formula: 'CO' },
  CO2: { atoms: [['O', -1.15, 0], ['C', 0, 0], ['O', 1.15, 0]], bonds: '0=1 1=2', formula: 'CO₂' },
  CH4: { atoms: [['C', 0, 0], ['H', 0, -0.95], ['H', 0.95, 0], ['H', 0, 0.95], ['H', -0.95, 0]], bonds: '0-1 0-2 0-3 0-4', formula: 'CH₄' },
  NH3: { atoms: [['N', 0, 0.05], ['H', -0.85, 0.5], ['H', 0.85, 0.5], ['H', 0, -0.9]], bonds: '0-1 0-2 0-3', formula: 'NH₃' },
  HCl: { atoms: [['H', -0.6, 0], ['Cl', 0.5, 0]], bonds: '0-1', formula: 'HCl' },
  C2H4: { atoms: [['C', -0.65, 0], ['C', 0.65, 0], ['H', -1.25, -0.8], ['H', -1.25, 0.8], ['H', 1.25, -0.8], ['H', 1.25, 0.8]], bonds: '0=1 0-2 0-3 1-4 1-5', formula: 'C₂H₄' },
  NO2: { atoms: [['N', 0, 0.3], ['O', -1.0, -0.3], ['O', 1.0, -0.3]], bonds: '0=1 0-2', formula: 'NO₂' },
  N2O4: { atoms: [['N', -0.6, 0], ['N', 0.6, 0], ['O', -1.25, -0.85], ['O', -1.25, 0.85], ['O', 1.25, -0.85], ['O', 1.25, 0.85]], bonds: '0-1 0=2 0-3 1=4 1-5', formula: 'N₂O₄' },
  NaCl: { atoms: [['Na', -0.65, 0, 1], ['Cl', 0.7, 0, -1]], bonds: '', formula: 'NaCl' },
  MgO: { atoms: [['Mg', -0.65, 0, 2], ['O', 0.65, 0, -2]], bonds: '', formula: 'MgO' },
  CaO: { atoms: [['Ca', -0.7, 0, 2], ['O', 0.7, 0, -2]], bonds: '', formula: 'CaO' },
  CaCO3: {
    atoms: [['Ca', -1.55, 0.1, 2], ['C', 0.45, 0.1], ['O', 0.45, -0.95], ['O', -0.45, 0.65, -1], ['O', 1.35, 0.65, -1]],
    bonds: '1=2 1-3 1-4',
    formula: 'CaCO₃',
  },
  BaO: { atoms: [['Ba', -0.7, 0, 2], ['O', 0.7, 0, -2]], bonds: '', formula: 'BaO' },
  BaO2: { atoms: [['Ba', -1.15, 0, 2], ['O', 0.3, 0, -1], ['O', 1.45, 0, -1]], bonds: '1-2', formula: 'BaO₂' },
  NaOH: { atoms: [['Na', -1.05, 0, 1], ['O', 0.35, 0, -1], ['H', 1.15, 0]], bonds: '1-2', formula: 'NaOH' },
  MgCl2: { atoms: [['Cl', -1.5, 0, -1], ['Mg', 0, 0, 2], ['Cl', 1.5, 0, -1]], bonds: '', formula: 'MgCl₂' },
  MgOH2: {
    atoms: [['Mg', 0, 0, 2], ['O', -1.4, 0, -1], ['H', -2.15, -0.45], ['O', 1.4, 0, -1], ['H', 2.15, -0.45]],
    bonds: '1-2 3-4',
    formula: 'Mg(OH)₂',
  },
  NaN3: { atoms: [['Na', -1.7, 0, 1], ['N', -0.35, 0, -1], ['N', 0.65, 0], ['N', 1.65, 0]], bonds: '1=2 2=3', formula: 'NaN₃' },
  Clm: { atoms: [['Cl', 0, 0, -1]], bonds: '', formula: 'Cl⁻' },
  CaCl2: { atoms: [['Cl', -1.5, 0, -1], ['Ca', 0, 0, 2], ['Cl', 1.5, 0, -1]], bonds: '', formula: 'CaCl₂' },
  Ca2: { atoms: [['Ca', 0, 0, 2]], bonds: '', formula: 'Ca²⁺' },
  OH: { atoms: [['O', -0.35, 0, -1], ['H', 0.45, 0]], bonds: '0-1', formula: 'OH⁻' },
  S: { atoms: [['S', 0, 0]], bonds: '', formula: 'S' },
  SO2: { atoms: [['S', 0, -0.25], ['O', -1.1, 0.4], ['O', 1.1, 0.4]], bonds: '0=1 0=2', formula: 'SO₂' },
  SO3: { atoms: [['S', 0, 0.1], ['O', 0, -1.1], ['O', -1.05, 0.7], ['O', 1.05, 0.7]], bonds: '0=1 0=2 0=3', formula: 'SO₃' },
  Fe: { atoms: [['Fe', 0, 0]], bonds: '', formula: 'Fe' },
  Fe2O3: {
    atoms: [['Fe', -0.8, -0.6, 3], ['Fe', 0.8, -0.6, 3], ['O', -1.55, 0.65, -2], ['O', 0, 0.65, -2], ['O', 1.55, 0.65, -2]],
    bonds: '',
    formula: 'Fe₂O₃',
  },
  MgCO3: {
    atoms: [['Mg', -1.55, 0.1, 2], ['C', 0.45, 0.1], ['O', 0.45, -0.95], ['O', -0.45, 0.65, -1], ['O', 1.35, 0.65, -1]],
    bonds: '1=2 1-3 1-4',
    formula: 'MgCO₃',
  },
  CaOH2: {
    atoms: [['Ca', 0, 0, 2], ['O', -1.45, 0, -1], ['H', -2.2, -0.45], ['O', 1.45, 0, -1], ['H', 2.2, -0.45]],
    bonds: '1-2 3-4',
    formula: 'Ca(OH)₂',
  },
};

/** Colours for elements the molecules element has no colour of its own for. */
const TONE: Record<string, Tone> = { Mg: 'opp', Ca: 'hyp', S: 'opp', Fe: 'hyp' };

const size = (t: Template) => {
  const xs = t.atoms.map((a) => a[1]);
  const ys = t.atoms.map((a) => a[2]);
  const pad = 0.5;
  return { x0: Math.min(...xs) - pad, x1: Math.max(...xs) + pad, y0: Math.min(...ys) - pad, y1: Math.max(...ys) + pad };
};

/** A group in an equation: `n` molecules of the template `t`, with its own label if `label` is given. */
export interface Group {
  t: keyof typeof T;
  n?: number;
  label?: string;
  tone?: Tone;
}

/**
 * A reaction with every atom drawn (clip `go`, or `split` then `join`): the reactants on the left,
 * each group of molecules stacked in a column so a coefficient is the number of molecules you see.
 * The bonds break and the atoms loosen, then the same atoms move across and join up as the
 * products, so no atom is made or lost. Under each group its formula with its coefficient, and
 * with `counts` the atoms of each element on each side ("4 H, 2 O"). `foot` writes a line under
 * the scene before and after (a sum of masses, a ratio). With `whole`, nothing comes apart: the
 * groups move together as they are (ions joining a compound). The equation must balance.
 */
export const reaction = (
  id: string,
  o: { from: Group[]; to: Group[]; counts?: boolean; whole?: boolean; foot?: { before?: string; after?: string }; height?: number },
): MoleculesEl => {
  const GAP = 0.45;
  const SIGN = 1.3;
  const groups = [...o.from.map((g) => ({ ...g, side: 0 })), ...o.to.map((g) => ({ ...g, side: 1 }))];
  const tallest = Math.max(...groups.map((g) => (size(T[g.t]).y1 - size(T[g.t]).y0) * (g.n ?? 1) + GAP * ((g.n ?? 1) - 1)));
  const top = 0.35;
  const mid = top + tallest / 2;
  const labelY = top + tallest + 0.55;
  const countY = labelY + 0.75;
  const footY = (o.counts ? countY : labelY) + 0.8;
  const height = (o.foot ? footY : o.counts ? countY : labelY) + 0.5;

  const atoms: Record<string, MolAtom> = {};
  const used: Record<string, number> = {};
  const sides: Array<Array<{ name: string; el: string; at: At; centre: At; charge?: number }>> = [[], []];
  const bonds: string[][] = [[], []];
  const labels: Array<Array<{ text: string; at: At; tone?: Tone }>> = [[], []];
  const signs: Array<Array<{ text: string; at: At }>> = [[], []];
  const edges: Array<[number, number]> = [
    [0, 0],
    [0, 0],
  ];
  let x = 0.5;
  groups.forEach((g, gi) => {
    const t = T[g.t];
    const s = size(t);
    const n = g.n ?? 1;
    const label = g.label ?? `${n > 1 ? n : ''}${t.formula}`;
    // A long label gets room of its own, with the molecules centred over it.
    const w = Math.max(s.x1 - s.x0, 0.2 * label.length);
    const inset = (w - (s.x1 - s.x0)) / 2;
    const h = (s.y1 - s.y0) * n + GAP * (n - 1);
    if (gi > 0) {
      const sideChange = groups[gi - 1].side !== g.side;
      signs[sideChange ? 0 : g.side].push({ text: sideChange ? '→' : '+', at: [r3(x + SIGN / 2), r3(mid)] });
      x += SIGN + (sideChange ? 0.5 : 0);
    }
    if (gi === 0 || groups[gi - 1].side !== g.side) edges[g.side][0] = x;
    for (let k = 0; k < n; k++) {
      const cy = mid - h / 2 + k * (s.y1 - s.y0 + GAP) - s.y0;
      const cx = x + inset - s.x0;
      const names = t.atoms.map(([sym, ax, ay, charge]) => {
        used[sym] = (used[sym] ?? 0) + 1;
        const name = `${sym}${used[sym]}`;
        atoms[name] = TONE[sym] ? { el: sym, tone: TONE[sym] } : sym;
        sides[g.side].push({ name, el: sym, at: [r3(cx + ax), r3(cy + ay)], centre: [cx, cy], charge });
        return name;
      });
      for (const b of t.bonds.split(' ').filter(Boolean)) {
        const [i, op, j] = b.split(/([-=#])/);
        bonds[g.side].push(`${names[+i]}${op}${names[+j]}`);
      }
    }
    labels[g.side].push({ text: label, at: [r3(x + w / 2), r3(labelY)], tone: g.tone });
    x += w;
    edges[g.side][1] = x;
  });
  const width = x + 0.5;

  // Each product atom is a reactant atom of the same element: the nearest one, measured within its side.
  const norm = (side: number, p: At): At => [(p[0] - edges[side][0]) / (edges[side][1] - edges[side][0]), (p[1] - mid) / tallest];
  const left = [...sides[0]];
  const rename: Record<string, string> = {};
  for (const p of sides[1]) {
    const q = norm(1, p.at);
    let best = -1;
    let dist = Infinity;
    left.forEach((r, i) => {
      if (r.el !== p.el) return;
      const v = norm(0, r.at);
      const d = Math.hypot(v[0] - q[0], v[1] - q[1]);
      if (d < dist) [best, dist] = [i, d];
    });
    if (best < 0) throw new Error(`reaction ${id}: no ${p.el} atom left on the left`);
    rename[p.name] = left[best].name;
    left.splice(best, 1);
  }
  if (left.length) throw new Error(`reaction ${id}: ${left.map((a) => a.el).join(', ')} left over`);
  for (const p of sides[1]) delete atoms[p.name];

  const count = (side: number) => {
    // Elements in the order they first appear among the reactants, on both sides.
    const c = new Map<string, number>(sides[0].map((a) => [a.el, 0]));
    for (const a of sides[side]) c.set(a.el, (c.get(a.el) ?? 0) + 1);
    return [...c].map(([e, k]) => `${k} ${e}`).join(', ');
  };
  const counted = (side: number) => (o.counts ? [{ text: count(side), at: [r3((edges[side][0] + edges[side][1]) / 2), r3(countY)] as At, tone: 'theta' as Tone }] : []);
  const foot = (text?: string) => (text ? [{ text, at: [r3(width / 2), r3(footY)] as At, tone: 'adj' as Tone }] : []);
  const arrow = signs[0].filter((s) => s.text === '→');
  const charges = (list: typeof sides[0], name: (a: (typeof sides)[0][0]) => string) => Object.fromEntries(list.filter((a) => a.charge).map((a) => [name(a), a.charge!]));

  const before: MolStage = {
    at: Object.fromEntries(sides[0].map((a) => [a.name, a.at])),
    bonds: bonds[0].join(' '),
    charges: charges(sides[0], (a) => a.name),
    names: [...labels[0], ...signs[0], ...counted(0), ...foot(o.foot?.before)],
  };
  const apart: MolStage = {
    at: Object.fromEntries(sides[0].map((a) => [a.name, o.whole ? a.at : [r3(a.centre[0] + (a.at[0] - a.centre[0]) * 1.3), r3(a.centre[1] + (a.at[1] - a.centre[1]) * 1.3)] as At])),
    bonds: o.whole ? before.bonds : '',
    charges: o.whole ? before.charges : undefined,
    names: [...labels[0], ...signs[0], ...counted(0), ...foot(o.foot?.before)],
  };
  const after: MolStage = {
    at: Object.fromEntries(sides[1].map((a) => [rename[a.name], a.at])),
    bonds: bonds[1].map((b) => b.replace(/[A-Za-z]+\d+/g, (n) => rename[n])).join(' '),
    charges: charges(sides[1], (a) => rename[a.name]),
    names: [...labels[1], ...signs[1], ...arrow, ...(o.counts ? [...counted(0), ...counted(1)] : []), ...foot(o.foot?.after)],
  };
  return {
    kind: 'molecules',
    id,
    atoms,
    stages: { before, apart, after },
    start: 'before',
    clips: {
      go: { phases: [{ dur: 0.8 }, { dur: 1.8, to: 'apart' }, { dur: 0.5 }, { dur: 2.8, to: 'after' }, { dur: 1.2 }] },
      split: { phases: [{ dur: 0.4 }, { dur: 1.8, to: 'apart' }, { dur: 0.6 }] },
      join: { phases: [{ dur: 2.8, to: 'after' }, { dur: 1.2 }] },
    },
    span: [r3(width), r3(height)],
    poster: 'go',
    height: o.height ?? 400,
  };
};

/**
 * Nuclei built from their protons (p) and neutrons (n), side by side (clip `build`): the loose
 * particles fly together into each nucleus, and the name and count of each appear under it.
 */
export const nuclei = (id: string, list: Array<{ label: string; p: number; n: number }>, height = 380): MoleculesEl => {
  const COL = 5;
  const atoms: Record<string, MolAtom> = {};
  const loose: Record<string, At> = {};
  const built: Record<string, At> = {};
  const names: Array<{ text: string; at: At; tone?: Tone }> = [];
  // Places on a close-packed grid, nearest the centre first.
  const grid: At[] = [];
  for (let j = -4; j <= 4; j++) for (let i = -4; i <= 4; i++) grid.push([0.8 * (i + (j % 2 ? 0.5 : 0)), 0.8 * 0.866 * j]);
  grid.sort((a, b) => Math.hypot(...a) - Math.hypot(...b) || a[1] - b[1] || a[0] - b[0]);
  let seed = 7;
  const rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
  list.forEach((nu, k) => {
    const cx = COL / 2 + k * COL;
    const cy = 2.4;
    const total = nu.p + nu.n;
    // Protons and neutrons mixed through the nucleus.
    const kinds = Array.from({ length: total }, (_, i) => (Math.floor(((i + 1) * nu.p) / total) > Math.floor((i * nu.p) / total) ? 'p' : 'n'));
    kinds.forEach((kind, i) => {
      const name = `${kind}${k}x${i}`;
      atoms[name] = { el: kind, tone: kind === 'p' ? 'bad' : 'theta' };
      built[name] = [r3(cx + grid[i][0]), r3(cy + grid[i][1])];
      const a = (2 * Math.PI * i) / total + rand() * 0.25;
      const r = Math.min(1.6, 0.8 + 0.12 * total) + rand() * 0.25;
      loose[name] = [r3(cx + r * Math.cos(a)), r3(cy + 0.9 * r * Math.sin(a))];
    });
    names.push({ text: nu.label, at: [cx, 4.75] });
  });
  const counts = list.map((nu, k) => ({ text: `${nu.p} p, ${nu.n} n`, at: [COL / 2 + k * COL, 5.45] as At, tone: 'theta' as Tone }));
  const key = { text: 'p = proton  ·  n = neutron', at: [r3((COL * list.length) / 2), 0.0] as At, tone: 'adj' as Tone };
  return {
    kind: 'molecules',
    id,
    atoms,
    stages: { loose: { at: loose, bonds: '', names: [...names, key] }, built: { at: built, bonds: '', names: [...names, ...counts, key] } },
    start: 'loose',
    clips: { build: { phases: [{ dur: 0.6 }, { dur: 2.8, to: 'built' }, { dur: 1.2 }] } },
    span: [COL * list.length, 5.9],
    poster: 'build',
    height,
  };
};

/**
 * A sample of an element as a gas of two isotopes, mixed in their natural proportions, each kind
 * coloured and named in the key: the atoms look and behave the same, and only their masses differ.
 */
export const isotopeMix = (id: string, a: { name: string; n: number }, b: { name: string; n: number }, label: string, height = 380): ParticlesEl => ({
  kind: 'particles',
  id,
  boxes: [
    {
      id: 's',
      state: 'gas',
      width: 14,
      height: 7,
      temp: 0.7,
      kinds: [
        { n: a.n, bond: 0.15, heavy: 0, size: 0.8, tone: 'adj', name: a.name },
        { n: b.n, bond: 0.15, heavy: 0, size: 0.9, tone: 'opp', name: b.name },
      ],
      label,
    },
  ],
  clips: {},
  key: true,
  seed: 3,
  height,
});
