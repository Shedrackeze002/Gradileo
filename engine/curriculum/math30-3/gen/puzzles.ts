/**
 * Math 30-3 Unit 9 — Logic Puzzles and Games (N1): number pyramids, 4 × 4 Sudoku, KenKen cages,
 * logic grids, weighing and river-crossing puzzles, take-away games and the best move in tic-tac-toe.
 * Every answer is checked by brute force (all grids, all assignments, a full game-tree or state search).
 */
import { fixedChoice, mc, numPart, retry, skill, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { PlaneFigure, PlanePoint, PlaneSegment, SkillDef, TableFigure } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const NAMES = [
  'Amara', 'Liam', 'Priya', 'Mateo', 'Aiyana', 'Kwame', 'Mei', 'Hamid', 'Sofia', 'Owen', 'Fatima', 'Raj', 'Chloé', 'Tariq',
  'Olivia', 'Ethan', 'Wei', 'Nadia', 'Darius', 'Talia', 'Malik', 'Simran', 'Jun', 'Isabelle', 'Kai', 'Zainab', 'Mason',
  'Grace', 'Emeka', 'Rosa', 'Dakota', 'Arjun', 'Hana', 'Lucas', 'Kiona', 'Tyler', 'Gurpreet', 'Noor',
];

type Out = GenOutput;
type P = [number, number];
type Color = 'brand' | 'accent' | 'muted';

const keys = (n: number) => [...Array(n).keys()];
const sum = (a: number[]) => a.reduce((s, x) => s + x, 0);
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
/** "a, b and c" */
const andList = (xs: string[]) => (xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`);
/** "a, b or c" */
const orList = (xs: string[]) => (xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} or ${xs[xs.length - 1]}`);
const M = (x: number | string) => `$${x}$`;

// ---------------------------------------------------------------------------
// Drawing on a plain canvas (a plane figure with no axes or grid lines)
// ---------------------------------------------------------------------------

const r3 = (x: number) => Math.round(x * 1000) / 1000;

/** Approximate width in pixels of a 12px bold label. */
function textWidth(t: string): number {
  let w = 0;
  for (const ch of t) w += ch === ' ' ? 3.5 : /[mMwW×÷]/.test(ch) ? 10.5 : /[iljtfI1r]/.test(ch) ? 4.5 : 7.4;
  return w;
}

class Canvas {
  private segs: PlaneSegment[] = [];
  private polys: Array<{ points: P[]; color?: Color }> = [];
  private texts: Array<{ c: P; text: string }> = [];

  constructor(
    private W: number,
    private H: number,
  ) {}

  seg(a: P, b: P, opts: { dashed?: boolean; color?: Color } = {}) {
    this.segs.push({ from: [r3(a[0]), r3(a[1])], to: [r3(b[0]), r3(b[1])], ...opts });
    return this;
  }

  poly(points: P[], color?: Color) {
    this.polys.push({ points: points.map(([x, y]) => [r3(x), r3(y)] as P), ...(color ? { color } : {}) });
    return this;
  }

  rect(x: number, y: number, w: number, h: number, color?: Color) {
    return this.poly([[x, y], [x + w, y], [x + w, y + h], [x, y + h], [x, y]], color);
  }

  /** Text centred at c. */
  text(c: P, text: string) {
    this.texts.push({ c, text });
    return this;
  }

  build(): PlaneFigure {
    // The canvas is 340 px wide inside the figure, so this many pixels make one unit.
    const ppu = 340 / this.W;
    const points: PlanePoint[] = this.texts.map(({ c, text }) => ({
      x: r3(c[0] - (8 + textWidth(text) / 2) / ppu),
      y: r3(c[1] - 12.3 / ppu),
      label: text,
      color: 'muted',
      open: true,
    }));
    return {
      type: 'plane',
      grid: { xMin: 0, xMax: this.W, yMin: 0, yMax: this.H, step: Math.max(this.W, this.H) },
      hideTickLabels: true,
      ...(this.segs.length ? { segments: this.segs } : {}),
      ...(this.polys.length ? { polylines: this.polys } : {}),
      ...(points.length ? { points } : {}),
    };
  }
}

// ---------------------------------------------------------------------------
// Number pyramids: each brick is the sum of the two bricks under it
// ---------------------------------------------------------------------------

/** rows[0] is the bottom row. */
function pyramid(bottom: number[]): number[][] {
  const rows = [bottom];
  while (rows[rows.length - 1].length > 1) {
    const r = rows[rows.length - 1];
    rows.push(r.slice(1).map((v, i) => r[i] + v));
  }
  return rows;
}

type Cell = [number, number];
const cellKey = ([r, i]: Cell) => `${r},${i}`;

function pyramidFigure(n: number, label: (r: number, i: number) => string): PlaneFigure {
  const c = new Canvas(2 * n + 1, n + 1);
  for (let r = 0; r < n; r++) {
    for (let i = 0; i < n - r; i++) {
      const x0 = 0.5 + r + 2 * i;
      const y0 = 0.5 + r;
      c.rect(x0, y0, 2, 1);
      const t = label(r, i);
      if (t) c.text([x0 + 1, y0 + 0.5], t);
    }
  }
  return c.build();
}

const brickName = (n: number, [r, i]: Cell) => (r === n - 1 ? 'the top brick' : `row ${r + 1}, brick ${i + 1}`);

/** Solve by filling any brick whose two neighbours in a sum are known. Returns the steps, or null when stuck. */
function solvePyramid(n: number, known: Map<string, number>): { steps: string[]; order: Cell[]; vals: Map<string, number> } | null {
  const v = new Map(known);
  const steps: string[] = [];
  const order: Cell[] = [];
  const total = (n * (n + 1)) / 2;
  while (v.size < total) {
    let progress = false;
    for (let r = 0; r < n - 1 && !progress; r++) {
      for (let i = 0; i < n - r - 1 && !progress; i++) {
        const L: Cell = [r, i];
        const R: Cell = [r, i + 1];
        const T: Cell = [r + 1, i];
        const [l, rr, t] = [v.get(cellKey(L)), v.get(cellKey(R)), v.get(cellKey(T))];
        if (l !== undefined && rr !== undefined && t === undefined) {
          v.set(cellKey(T), l + rr);
          order.push(T);
          steps.push(`${cap(brickName(n, T))} sits on $${l}$ and $${rr}$: $${l} + ${rr} = ${l + rr}$.`);
          progress = true;
        } else if (l !== undefined && t !== undefined && rr === undefined) {
          v.set(cellKey(R), t - l);
          order.push(R);
          steps.push(`${cap(brickName(n, R))}: the brick above it is $${t}$ and its neighbour is $${l}$, so it is $${t} - ${l} = ${t - l}$.`);
          progress = true;
        } else if (rr !== undefined && t !== undefined && l === undefined) {
          v.set(cellKey(L), t - rr);
          order.push(L);
          steps.push(`${cap(brickName(n, L))}: the brick above it is $${t}$ and its neighbour is $${rr}$, so it is $${t} - ${rr} = ${t - rr}$.`);
          progress = true;
        }
      }
    }
    if (!progress) return null;
  }
  return { steps, order, vals: v };
}

/** Brute force: every bottom row of whole numbers 1 to max that fits the known bricks. Stops at `limit`. */
function countPyramids(n: number, known: Map<string, number>, max: number, limit = 2): number {
  let count = 0;
  const bottom = Array(n).fill(0);
  const fixed = keys(n).map((i) => known.get(cellKey([0, i])));
  // Brick (r, j) is the sum of bottom bricks j to j + r with binomial weights, so it can be checked once bottom[j + r] is set.
  const binom = (r: number, t: number): number => (t === 0 || t === r ? 1 : binom(r - 1, t - 1) + binom(r - 1, t));
  const checks = [...known].map(([k, val]) => {
    const [r, j] = k.split(',').map(Number);
    return { r, j, val, last: j + r };
  });
  const rec = (i: number): boolean => {
    if (i === n) return ++count >= limit;
    const opts = fixed[i] !== undefined ? [fixed[i]!] : keys(max).map((x) => x + 1);
    for (const o of opts) {
      bottom[i] = o;
      const ok = checks.every((c) => c.last !== i || sum(keys(c.r + 1).map((t) => binom(c.r, t) * bottom[c.j + t])) === c.val);
      if (ok && rec(i + 1)) return true;
    }
    return false;
  };
  rec(0);
  return count;
}

const PYR_INTRO = 'In a number pyramid, each brick is the sum of the two bricks directly below it.';

function pyramidItem(rng: Rng, d: 1 | 2 | 3): Out {
  if (d === 1) {
    const bottom = keys(3).map(() => rng.int(2, 15));
    const rows = pyramid(bottom);
    const mode = rng.pick(['top', 'missing'] as const);
    if (mode === 'top') {
      return {
        prompt: `${PYR_INTRO} Find the number on the top brick.`,
        figure: pyramidFigure(3, (r, i) => (r === 0 ? String(rows[0][i]) : r === 2 ? '?' : '')),
        parts: [numPart(rows[2][0], { label: 'Top brick:' })],
        hints: ['Fill in the middle row first: add each pair of bricks next to each other in the bottom row.', 'Then add the two middle bricks to get the top.'],
        solution: [
          `Middle row: $${bottom[0]} + ${bottom[1]} = ${rows[1][0]}$ and $${bottom[1]} + ${bottom[2]} = ${rows[1][1]}$.`,
          `Top: $${rows[1][0]} + ${rows[1][1]} = ${rows[2][0]}$.`,
          `Strategy: work up one row at a time. The top brick is $${rows[2][0]}$.`,
        ],
        calculator: false,
      };
    }
    const hide = rng.int(0, 2);
    return {
      prompt: `${PYR_INTRO} Find the missing number in the bottom row.`,
      figure: pyramidFigure(3, (r, i) => (r === 0 ? (i === hide ? '?' : String(rows[0][i])) : r === 1 ? String(rows[1][i]) : '')),
      parts: [numPart(bottom[hide], { label: '$? =$' })],
      hints: ['Find a brick in the middle row that sits on the missing brick and a brick you know.', 'Subtract: the brick above minus the known neighbour.'],
      solution: [
        hide === 0 ? `The brick above it is $${rows[1][0]}$, and its neighbour is $${bottom[1]}$.` : hide === 2 ? `The brick above it is $${rows[1][1]}$, and its neighbour is $${bottom[1]}$.` : `The brick above-left is $${rows[1][0]}$, and its neighbour on the left is $${bottom[0]}$.`,
        hide === 0 ? `$${rows[1][0]} - ${bottom[1]} = ${bottom[0]}$` : hide === 2 ? `$${rows[1][1]} - ${bottom[1]} = ${bottom[2]}$` : `$${rows[1][0]} - ${bottom[0]} = ${bottom[1]}$`,
        `Strategy: undo an addition with a subtraction. The missing number is $${bottom[hide]}$.`,
      ],
      calculator: false,
    };
  }
  if (d === 2) {
    const n = 4;
    const all: Cell[] = keys(n).flatMap((r) => keys(n - r).map((i) => [r, i] as Cell));
    for (let tries = 0; ; tries++) {
      const bottom = keys(n).map(() => rng.int(1, 12));
      const rows = pyramid(bottom);
      const givens = rng.sample(all, rng.int(4, 5));
      // At least one given above the bottom row, so some subtraction is needed.
      if (givens.every(([r]) => r === 0)) continue;
      const known = new Map(givens.map((c) => [cellKey(c), rows[c[0]][c[1]]] as const));
      const sol = solvePyramid(n, known);
      if (!sol || sol.order.length < 4) continue;
      if (countPyramids(n, known, 40) !== 1) continue;
      // The target is found late, so it needs several steps.
      const t = sol.order.length - 1 - rng.int(0, 1);
      const target = sol.order[t];
      const steps = sol.steps.slice(0, t + 1);
      const val = rows[target[0]][target[1]];
      return {
        prompt: `${PYR_INTRO} Find the number on the brick marked $?$. (Rows are counted from the bottom, and bricks from the left.)`,
        figure: pyramidFigure(n, (r, i) => (r === target[0] && i === target[1] ? '?' : known.has(cellKey([r, i])) ? String(rows[r][i]) : '')),
        parts: [numPart(val, { label: '$? =$' })],
        hints: ['Look for three bricks in a triangle (two side by side and the one on top of them) where you know two numbers.', 'If you know the two bottom bricks, add. If you know the top one and one bottom one, subtract.'],
        solution: [...steps, `Strategy: keep finding a triangle of three bricks with only one unknown. The brick marked $?$ is $${val}$.`],
        calculator: false,
      };
    }
  }
  // d3: a missing bottom brick that only algebra can find.
  const n = rng.pick([3, 4]);
  for (;;) {
    const bottom = keys(n).map(() => rng.int(2, 15));
    const rows = pyramid(bottom);
    const top = rows[n - 1][0];
    const x = rng.int(1, n - 2);
    const known = new Map<string, number>(keys(n).filter((i) => i !== x).map((i) => [cellKey([0, i]), bottom[i]] as const));
    known.set(cellKey([n - 1, 0]), top);
    if (countPyramids(n, known, 60) !== 1) continue;
    // Each brick as (coefficient of x, constant).
    let lin: Array<[number, number]> = bottom.map((v, i) => (i === x ? [1, 0] : [0, v]));
    const lines: string[] = [];
    const fmtLin = ([a, c]: [number, number]) => (a === 0 ? `${c}` : `${a === 1 ? '' : a}x${c ? ` + ${c}` : ''}`);
    for (let r = 1; r < n; r++) {
      lin = lin.slice(1).map((v, i) => [lin[i][0] + v[0], lin[i][1] + v[1]] as [number, number]);
      lines.push(r === n - 1 ? `Top: $${fmtLin(lin[0])}$.` : `Row ${r + 1}: ${andList(lin.map((v) => `$${fmtLin(v)}$`))}.`);
    }
    const [a, c] = lin[0];
    return {
      prompt: `${PYR_INTRO} Only the bottom row (with one brick missing) and the top brick are filled in. Find the missing number in the bottom row.`,
      figure: pyramidFigure(n, (r, i) => (r === 0 ? (i === x ? '?' : String(bottom[i])) : r === n - 1 ? String(top) : '')),
      parts: [numPart(bottom[x], { label: '$? =$' })],
      hints: ['No triangle of three bricks has two known numbers, so call the missing number $x$.', 'Write each brick above in terms of $x$, all the way to the top. Then set the top equal to the given number and solve.'],
      solution: [
        'Let the missing number be $x$. Add pairs of bricks as usual, keeping $x$ in each sum.',
        ...lines,
        `$${fmtLin([a, c])} = ${top}$, so $${a}x = ${top - c}$ and $x = ${bottom[x]}$.`,
        `Check: the bottom row $${bottom.join(',\\ ')}$ gives a top brick of $${top}$. ✓`,
        `Strategy: when no brick can be found directly, use a variable. The missing number is $${bottom[x]}$.`,
      ],
      calculator: false,
    };
  }
}

// ---------------------------------------------------------------------------
// 4 × 4 Sudoku
// ---------------------------------------------------------------------------

const ROW = (k: number) => Math.floor(k / 4);
const COL = (k: number) => k % 4;
const BOX = (k: number) => Math.floor(ROW(k) / 2) * 2 + Math.floor(COL(k) / 2);
const BOX_NAMES = ['top-left box', 'top-right box', 'bottom-left box', 'bottom-right box'];
const cellName = (k: number) => `row ${ROW(k) + 1}, column ${COL(k) + 1}`;

interface Unit {
  name: string;
  cells: number[];
}
const ROWS: Unit[] = keys(4).map((r) => ({ name: `row ${r + 1}`, cells: keys(4).map((c) => r * 4 + c) }));
const COLS: Unit[] = keys(4).map((c) => ({ name: `column ${c + 1}`, cells: keys(4).map((r) => r * 4 + c) }));
const BOXES: Unit[] = keys(4).map((b) => ({ name: `the ${BOX_NAMES[b]}`, cells: keys(16).filter((k) => BOX(k) === b) }));
const peers = (k: number) => keys(16).filter((j) => j !== k && (ROW(j) === ROW(k) || COL(j) === COL(k) || BOX(j) === BOX(k)));

let sudokuCache: number[][] | null = null;
/** Every 4 × 4 Sudoku solution (there are 288). */
function allSudokus(): number[][] {
  if (sudokuCache) return sudokuCache;
  const out: number[][] = [];
  const g = Array(16).fill(0);
  const place = (k: number) => {
    if (k === 16) {
      out.push(g.slice());
      return;
    }
    for (let v = 1; v <= 4; v++) {
      if (peers(k).some((j) => j < k && g[j] === v)) continue;
      g[k] = v;
      place(k + 1);
      g[k] = 0;
    }
  };
  place(0);
  sudokuCache = out;
  return out;
}

interface SStep {
  cell: number;
  value: number;
  text: string;
  deps: number[];
}

/** Solve with two simple rules (a cell with only one possible number; a number with only one possible cell in a row, column or box). */
function sudokuSteps(givens: number[]): SStep[] | null {
  const g = givens.slice();
  const steps: SStep[] = [];
  while (g.includes(0)) {
    let step: SStep | null = null;
    for (const k of keys(16)) {
      if (g[k]) continue;
      const groups: Array<{ name: string; digits: number[] }> = [];
      const seen = new Map<number, number>();
      for (const u of [ROWS[ROW(k)], COLS[COL(k)], BOXES[BOX(k)]]) {
        const ds: number[] = [];
        for (const j of u.cells) if (g[j] && !seen.has(g[j])) {
          seen.set(g[j], j);
          ds.push(g[j]);
        }
        if (ds.length) groups.push({ name: u.name, digits: ds.sort() });
      }
      if (seen.size === 3) {
        const v = [1, 2, 3, 4].find((x) => !seen.has(x))!;
        const parts = groups.map((gp, i) => `${i === 0 ? cap(gp.name) : gp.name} ${i === 0 ? 'already has' : 'has'} ${andList(gp.digits.map(M))}`);
        step = { cell: k, value: v, deps: [...seen.values()], text: `${parts.join('; ')}. The only number left for ${cellName(k)} is $${v}$.` };
        break;
      }
    }
    if (!step) {
      outer: for (const u of [...ROWS, ...COLS, ...BOXES]) {
        for (let dgt = 1; dgt <= 4; dgt++) {
          if (u.cells.some((j) => g[j] === dgt)) continue;
          const empty = u.cells.filter((j) => !g[j]);
          const cand = empty.filter((j) => !peers(j).some((p) => g[p] === dgt));
          if (cand.length !== 1) continue;
          const blocked = empty.filter((j) => j !== cand[0]).map((j) => {
            const p = peers(j).find((q) => g[q] === dgt)!;
            const why = ROW(p) === ROW(j) ? `row ${ROW(j) + 1}` : COL(p) === COL(j) ? `column ${COL(j) + 1}` : `the ${BOX_NAMES[BOX(j)]}`;
            return { j, p, why };
          });
          step = {
            cell: cand[0],
            value: dgt,
            deps: blocked.map((b) => b.p),
            text: `${cap(u.name)} needs a $${dgt}$. It cannot go in ${orList(blocked.map((b) => `${cellName(b.j)} (${b.why} already has a $${dgt}$)`))}, so it goes in ${cellName(cand[0])}.`,
          };
          break outer;
        }
      }
    }
    if (!step) return null;
    g[step.cell] = step.value;
    steps.push(step);
  }
  return steps;
}

/** The steps needed to reach the step at index t (its chain of earlier deductions), in order. */
function chainTo(steps: SStep[], t: number): SStep[] {
  const idx = new Map(steps.map((s, i) => [s.cell, i] as const));
  const need = new Set<number>();
  const visit = (i: number) => {
    if (need.has(i)) return;
    need.add(i);
    for (const d of steps[i].deps) {
      const j = idx.get(d);
      if (j !== undefined && j < i) visit(j);
    }
  };
  visit(t);
  return [...need].sort((a, b) => a - b).map((i) => steps[i]);
}

function sudokuFigure(givens: number[], target: number): PlaneFigure {
  const c = new Canvas(5, 5);
  const X = (col: number) => 0.5 + col;
  const Y = (row: number) => 4.5 - row;
  for (let k = 1; k < 4; k++) {
    if (k === 2) continue;
    c.seg([X(k), Y(0)], [X(k), Y(4)], { color: 'muted' });
    c.seg([X(0), Y(k)], [X(4), Y(k)], { color: 'muted' });
  }
  // Box borders are drawn twice, side by side, so they look thicker.
  for (const o of [0, 0.025]) {
    c.seg([X(2) + o, Y(0)], [X(2) + o, Y(4)]);
    c.seg([X(0), Y(2) - o], [X(4), Y(2) - o]);
  }
  c.rect(X(0), Y(4), 4, 4);
  keys(16).forEach((k) => {
    const t = k === target ? '?' : givens[k] ? String(givens[k]) : '';
    if (t) c.text([X(COL(k)) + 0.5, Y(ROW(k)) - 0.5], t);
  });
  return c.build();
}

function sudokuItem(rng: Rng, d: 1 | 2 | 3): Out {
  const blanks = d === 1 ? 5 : d === 2 ? 9 : rng.int(10, 11);
  const all = allSudokus();
  for (;;) {
    const sol = rng.pick(all);
    const g = sol.slice();
    let removed = 0;
    for (const k of rng.shuffle(keys(16))) {
      if (removed === blanks) break;
      const v = g[k];
      g[k] = 0;
      // Brute force: the puzzle must still have exactly one solution, and the two simple rules must finish it.
      const fits = all.filter((s) => g.every((x, i) => !x || s[i] === x)).length;
      if (fits !== 1 || !sudokuSteps(g)) g[k] = v;
      else removed++;
    }
    if (removed !== blanks) continue;
    const steps = sudokuSteps(g)!;
    const chains = steps.map((_, i) => chainTo(steps, i));
    const want = (n: number) => (d === 1 ? n === 1 : d === 2 ? n >= 2 && n <= 4 : n >= 3);
    const ok = keys(steps.length).filter((i) => want(chains[i].length));
    if (!ok.length) continue;
    const t = d === 3 ? ok.reduce((a, b) => (chains[b].length > chains[a].length ? b : a)) : rng.pick(ok);
    const target = steps[t].cell;
    const chain = chains[t];
    return {
      prompt: `Fill the grid so that each row, each column and each $2 \\times 2$ box (marked with heavier lines) contains $1$, $2$, $3$ and $4$ exactly once. What number goes in the cell marked $?$${d === 1 ? '' : ' (Rows are numbered from the top and columns from the left.)'}`,
      figure: sudokuFigure(g, target),
      parts: [numPart(sol[target], { label: '$? =$' })],
      hints: [
        'Look at the row, the column and the box of a cell. If together they already hold three different numbers, the cell must be the fourth.',
        'Or pick a row, column or box that is missing a number, and check which empty cells could take it. If only one can, it goes there.',
      ],
      solution: [
        ...chain.map((s, i) => (chain.length > 1 ? `Step ${i + 1}: ${s.text}` : s.text)),
        `Strategy: fill the cells that have only one possibility first; each one you fill can unlock another. The cell marked $?$ (${cellName(target)}) is $${sol[target]}$.`,
      ],
      calculator: false,
    };
  }
}

// ---------------------------------------------------------------------------
// KenKen: cages with an operation and a target
// ---------------------------------------------------------------------------

const latinCache = new Map<number, number[][]>();
/** Every n × n Latin square with the numbers 1 to n (12 when n = 3, 576 when n = 4). */
function latinSquares(n: number): number[][] {
  const hit = latinCache.get(n);
  if (hit) return hit;
  const out: number[][] = [];
  const g: number[] = Array(n * n).fill(0);
  const place = (k: number) => {
    if (k === n * n) {
      out.push(g.slice());
      return;
    }
    const r = Math.floor(k / n);
    const c = k % n;
    for (let v = 1; v <= n; v++) {
      let ok = true;
      for (let j = 0; j < c && ok; j++) if (g[r * n + j] === v) ok = false;
      for (let i = 0; i < r && ok; i++) if (g[i * n + c] === v) ok = false;
      if (!ok) continue;
      g[k] = v;
      place(k + 1);
      g[k] = 0;
    }
  };
  place(0);
  latinCache.set(n, out);
  return out;
}

/** Split the grid into connected cages of 1 to 3 cells; returns the cage number of each cell. */
function makeCages(rng: Rng, n: number): number[] {
  const id = Array(n * n).fill(-1);
  let next = 0;
  const nbrs = (k: number) => {
    const r = Math.floor(k / n);
    const c = k % n;
    return [r > 0 ? k - n : -1, r < n - 1 ? k + n : -1, c > 0 ? k - 1 : -1, c < n - 1 ? k + 1 : -1].filter((x) => x >= 0);
  };
  for (const start of rng.shuffle(keys(n * n))) {
    if (id[start] >= 0) continue;
    const size = rng.pick(n === 3 ? [1, 2, 2, 2, 3] : [1, 2, 2, 2, 2, 3, 3]);
    const cage = [start];
    id[start] = next;
    while (cage.length < size) {
      const free = [...new Set(cage.flatMap(nbrs))].filter((k) => id[k] < 0);
      if (!free.length) break;
      const k = rng.pick(free);
      id[k] = next;
      cage.push(k);
    }
    next++;
  }
  return id;
}

type Op = '+' | '−' | '×' | '÷' | '';
interface Cage {
  cells: number[];
  op: Op;
  target: number;
}

function cageValue(op: Op, vals: number[]): number {
  if (op === '' || op === '+') return sum(vals);
  if (op === '×') return vals.reduce((p, v) => p * v, 1);
  const [a, b] = [Math.max(...vals), Math.min(...vals)];
  return op === '−' ? a - b : a / b;
}

const cageLabel = (c: Cage) => (c.op === '' ? String(c.target) : `${c.target}${c.op}`);

/** The possible sets of numbers for a cage (as sorted lists), respecting rows and columns inside the cage. */
function cageSets(n: number, c: Cage): number[][] {
  const out = new Map<string, number[]>();
  const vals = Array(c.cells.length).fill(0);
  const rec = (i: number) => {
    if (i === c.cells.length) {
      if (cageValue(c.op, vals) === c.target) {
        const s = vals.slice().sort((a, b) => a - b);
        out.set(s.join(','), s);
      }
      return;
    }
    for (let v = 1; v <= n; v++) {
      const k = c.cells[i];
      if (c.cells.slice(0, i).some((j, t) => vals[t] === v && (Math.floor(j / n) === Math.floor(k / n) || j % n === k % n))) continue;
      vals[i] = v;
      rec(i + 1);
    }
  };
  rec(0);
  return [...out.values()];
}

function kenkenFigure(n: number, cageOf: number[], cages: Cage[], givens: Map<number, number>, target: number): PlaneFigure {
  const c = new Canvas(n + 1, n + 1);
  const X = (col: number) => 0.5 + col;
  const Y = (row: number) => n + 0.5 - row;
  c.rect(X(0), Y(n), n, n);
  for (let r = 0; r < n; r++) {
    for (let col = 0; col < n; col++) {
      const k = r * n + col;
      if (col < n - 1) {
        const same = cageOf[k] === cageOf[k + 1];
        c.seg([X(col + 1), Y(r)], [X(col + 1), Y(r + 1)], same ? { dashed: true, color: 'muted' } : {});
      }
      if (r < n - 1) {
        const same = cageOf[k] === cageOf[k + n];
        c.seg([X(col), Y(r + 1)], [X(col + 1), Y(r + 1)], same ? { dashed: true, color: 'muted' } : {});
      }
    }
  }
  for (const cg of cages) {
    const k = Math.min(...cg.cells);
    const lab = cageLabel(cg);
    // The label's invisible anchor sits 8px left of the text, so keep the text 15px from the cage border.
    c.text([X(k % n) + (15 + textWidth(lab) / 2) * ((n + 1) / 340), Y(Math.floor(k / n)) - 0.2], lab);
  }
  for (const [k, v] of givens) c.text([X(k % n) + 0.5, Y(Math.floor(k / n)) - 0.6], String(v));
  c.text([X(target % n) + 0.5, Y(Math.floor(target / n)) - 0.6], '?');
  return c.build();
}

function kenkenItem(rng: Rng, n: 3 | 4): Out {
  const all = latinSquares(n);
  for (;;) {
    const sol = rng.pick(all);
    const cageOf = makeCages(rng, n);
    const ids = [...new Set(cageOf)];
    const cages: Cage[] = ids.map((id) => {
      const cells = keys(n * n).filter((k) => cageOf[k] === id);
      const vals = cells.map((k) => sol[k]);
      let op: Op = '';
      if (cells.length === 2) {
        const [a, b] = [Math.max(...vals), Math.min(...vals)];
        op = rng.pick(a % b === 0 && rng.chance(0.6) ? (['÷', '−', '×'] as Op[]) : (['+', '−', '×'] as Op[]));
      } else if (cells.length === 3) op = rng.pick(['+', '×'] as Op[]);
      return { cells, op, target: cageValue(op, vals) };
    });
    const singles = cages.filter((c) => c.cells.length === 1).length;
    if (singles > (n === 3 ? 2 : 2)) continue;
    // Brute force: every Latin square that fits every cage.
    let fits = all.filter((sq) => cages.every((c) => cageValue(c.op, c.cells.map((k) => sq[k])) === c.target));
    const givens = new Map<number, number>();
    while (fits.length > 1 && givens.size < (n === 3 ? 1 : 1)) {
      const k = keys(n * n).find((x) => new Set(fits.map((sq) => sq[x])).size > 1)!;
      givens.set(k, sol[k]);
      fits = fits.filter((sq) => sq[k] === sol[k]);
    }
    if (fits.length !== 1) continue;
    const choices = keys(n * n).filter((k) => !givens.has(k) && cages[ids.indexOf(cageOf[k])].cells.length >= 2);
    if (!choices.length) continue;
    const target = rng.pick(choices);
    const sets = cages.filter((c) => c.cells.length > 1).map((c) => ({ c, s: cageSets(n, c) }));
    const forced = sets.filter((x) => x.s.length === 1);
    const tight = (forced.length ? forced : sets.slice().sort((a, b) => a.s.length - b.s.length)).slice(0, 3);
    const setText = (s: number[][]) => orList(s.map((x) => andList(x.map(M))));
    const rows = keys(n).map((r) => sol.slice(r * n, r * n + n));
    const singleCages = cages.filter((c) => c.cells.length === 1);
    const numbers = andList(keys(n).map((i) => M(i + 1)));
    return {
      prompt: `Fill the grid with the numbers ${numbers} so that each number appears once in every row and every column. Solid lines mark the cages. The numbers in each cage give the result in its corner using the operation shown: $+$ add, $-$ subtract, $\\times$ multiply, $\\div$ divide (for $-$ and $\\div$, start with the larger number). A cage of one cell just holds its number.${givens.size ? ' One number is filled in for you.' : ''} What number goes in the cell marked $?$`,
      figure: kenkenFigure(n, cageOf, cages, givens, target),
      parts: [numPart(sol[target], { label: '$? =$' })],
      hints: [
        n === 4 ? 'Start with the one-cell cages, then with cages that can only be made one way, like $3-$ in two cells ($4$ and $1$) or $12\\times$ in two cells ($3$ and $4$).' : 'Start with the one-cell cages, then with cages that can only be made one way, like $5+$ in two cells ($2$ and $3$) or $3\\times$ in two cells ($1$ and $3$).',
        `Each row and column holds ${numbers} once, so it adds to $${(n * (n + 1)) / 2}$. Use that to finish rows and columns, and check every cage as you go.`,
      ],
      solution: [
        ...(singleCages.length ? [`The one-cell ${singleCages.length === 1 ? 'cage holds' : 'cages hold'} ${andList(singleCages.map((c) => `$${c.target}$`))}.`] : []),
        `List what each cage could hold. ${tight.map((x) => `The “${cageLabel(x.c)}” cage starting at row ${Math.floor(Math.min(...x.c.cells) / n) + 1}, column ${(Math.min(...x.c.cells) % n) + 1} (${x.c.cells.length} cells) ${x.s.length === 1 ? 'must hold' : 'can hold'} ${setText(x.s)}.`).join(' ')}`,
        `Place those numbers so that no row or column repeats a number, and check the remaining cages. There is only one way to fill the grid:`,
        ...rows.map((row, r) => `Row ${r + 1}: $${row.join(',\\ ')}$`),
        `Check: every row and column uses each number once, and every cage gives its result.`,
        `Strategy: begin with the cages that have the fewest possibilities. The cell marked $?$ is in row ${Math.floor(target / n) + 1}, column ${(target % n) + 1}, so $? = ${sol[target]}$.`,
      ],
      calculator: false,
    };
  }
}

// ---------------------------------------------------------------------------
// Logic grids
// ---------------------------------------------------------------------------

interface Attr {
  opts: string[];
  ordered: boolean;
  head: (o: string) => string;
  /** Short name for crossing out: "welder", "red truck", "Monday". */
  word: (o: string) => string;
  /** Sentences without a final period. */
  is: (n: string, o: string) => string;
  isNot: (n: string, o: string) => string;
  neither: (o: string, a: string, b: string) => string;
  before?: (a: string, b: string) => string;
  rightAfter?: (a: string, b: string) => string;
  who: (o: string) => string;
  what: (n: string) => string;
  choice: (o: string) => string;
  setting: string;
}

const ATTRS: Attr[] = [
  {
    opts: ['electrician', 'plumber', 'carpenter', 'welder'], ordered: false, head: cap, word: (o) => o,
    is: (n, o) => `${n} is the ${o}`, isNot: (n, o) => `${n} is not the ${o}`, neither: (o, a, b) => `The ${o} is neither ${a} nor ${b}`,
    who: (o) => `Who is the ${o}?`, what: (n) => `What is ${n}’s trade?`, choice: (o) => `The ${o}`,
    setting: 'are the tradespeople on a house-building crew. Each has a different trade.',
  },
  {
    opts: ['red', 'white', 'blue', 'grey'], ordered: false, head: (o) => `${cap(o)} truck`, word: (o) => `the ${o} truck`,
    is: (n, o) => `${n} drives the ${o} truck`, isNot: (n, o) => `${n} does not drive the ${o} truck`, neither: (o, a, b) => `Neither ${a} nor ${b} drives the ${o} truck`,
    who: (o) => `Who drives the ${o} truck?`, what: (n) => `Which truck does ${n} drive?`, choice: (o) => `The ${o} truck`,
    setting: 'each drive one of the company trucks at a landscaping business. Each drives a different truck.',
  },
  {
    opts: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], ordered: true, head: (o) => o.slice(0, 3), word: (o) => o,
    is: (n, o) => `${n} works on ${o}`, isNot: (n, o) => `${n} does not work on ${o}`, neither: (o, a, b) => `Neither ${a} nor ${b} works on ${o}`,
    before: (a, b) => `${a} works earlier in the week than ${b}`, rightAfter: (a, b) => `${a} works the day right after ${b}`,
    who: (o) => `Who works on ${o}?`, what: (n) => `On which day does ${n} work?`, choice: (o) => o,
    setting: 'each work one day a week at a farm-supply store. Each works a different day.',
  },
  {
    opts: ['6:00 a.m.', '7:00 a.m.', '8:00 a.m.', '9:00 a.m.'], ordered: true, head: (o) => o.replace(':00', ''), word: (o) => o,
    is: (n, o) => `${n}’s shift starts at ${o}`, isNot: (n, o) => `${n}’s shift does not start at ${o}`, neither: (o, a, b) => `Neither ${a}’s nor ${b}’s shift starts at ${o}`,
    before: (a, b) => `${a} starts earlier than ${b}`, rightAfter: (a, b) => `${a} starts one hour after ${b}`,
    who: (o) => `Whose shift starts at ${o}?`, what: (n) => `When does ${n}’s shift start?`, choice: (o) => o,
    setting: 'work at a bakery. Their shifts start at different times.',
  },
  {
    opts: ['Riverton', 'Lakeside', 'Brookfield', 'Hillcrest'], ordered: false, head: (o) => o, word: (o) => o,
    is: (n, o) => `${n} is working in ${o}`, isNot: (n, o) => `${n} is not working in ${o}`, neither: (o, a, b) => `Neither ${a} nor ${b} is working in ${o}`,
    who: (o) => `Who is working in ${o}?`, what: (n) => `Where is ${n} working?`, choice: (o) => o,
    setting: 'are surveyors for an engineering company. Today each is working at a different job site.',
  },
];
/** A sentence with its final period. */
const stop = (s: string) => (/[.?]$/.test(s) ? s : `${s}.`);

type Clue = { text: string; ok: (p: number[]) => boolean; kind: 'pos' | 'neg' | 'neither' | 'before' | 'after'; a: number; b: number; o: number };

function permutations(n: number): number[][] {
  if (n === 1) return [[0]];
  const out: number[][] = [];
  for (const p of permutations(n - 1)) for (let i = 0; i <= p.length; i++) out.push([...p.slice(0, i), n - 1, ...p.slice(i)]);
  return out;
}

/** Narrate a grid solution: cross out options clue by clue, then use "only one left" in rows and columns. Null when this is not enough. */
function narrateGrid(n: number, names: string[], opts: string[], clues: Clue[], attr: Attr): string[] | null {
  const poss = keys(n).map(() => keys(n).map(() => true));
  const steps: string[] = [];
  const fixedP = Array(n).fill(-1);
  const w = (o: number) => attr.word(opts[o]);
  const crossed = (i: number, o: number) => {
    if (!poss[i][o]) return false;
    poss[i][o] = false;
    return true;
  };
  const fix = (i: number, o: number) => {
    fixedP[i] = o;
    for (const j of keys(n)) if (j !== i) crossed(j, o);
    for (const q of keys(n)) if (q !== o) crossed(i, q);
  };
  const arc = (c: Clue): string[] => {
    const removed: string[] = [];
    const okPair = (oa: number, ob: number) => (c.kind === 'before' ? oa < ob : oa === ob + 1);
    for (const oa of keys(n)) if (poss[c.a][oa] && !keys(n).some((ob) => ob !== oa && poss[c.b][ob] && okPair(oa, ob)) && crossed(c.a, oa)) removed.push(`cross out ${w(oa)} for ${names[c.a]}`);
    for (const ob of keys(n)) if (poss[c.b][ob] && !keys(n).some((oa) => oa !== ob && poss[c.a][oa] && okPair(oa, ob)) && crossed(c.b, ob)) removed.push(`cross out ${w(ob)} for ${names[c.b]}`);
    return removed;
  };
  const relText = (c: Clue) => (c.kind === 'before' ? attr.before!(names[c.a], names[c.b]) : attr.rightAfter!(names[c.a], names[c.b]));
  clues.forEach((c, idx) => {
    const lead = `Clue ${idx + 1}:`;
    if (c.kind === 'pos') {
      fix(c.a, c.o);
      steps.push(`${lead} ${stop(attr.is(names[c.a], opts[c.o]))} Mark ✓, then cross out ${w(c.o)} for everyone else and every other option for ${names[c.a]}.`);
    } else if (c.kind === 'neg') {
      crossed(c.a, c.o);
      steps.push(`${lead} cross out ${w(c.o)} for ${names[c.a]}.`);
    } else if (c.kind === 'neither') {
      crossed(c.a, c.o);
      crossed(c.b, c.o);
      steps.push(`${lead} cross out ${w(c.o)} for ${names[c.a]} and for ${names[c.b]}.`);
    } else {
      const r = arc(c);
      steps.push(`${lead} ${relText(c)}${r.length ? `, so ${andList(r)}` : '. Keep this clue for later'}.`);
    }
  });
  const rel = clues.filter((c) => c.kind === 'before' || c.kind === 'after');
  for (let guard = 0; guard < 40 && fixedP.includes(-1); guard++) {
    let progress = false;
    for (const i of keys(n)) {
      if (fixedP[i] >= 0) continue;
      const left = keys(n).filter((o) => poss[i][o]);
      if (left.length === 1) {
        fix(i, left[0]);
        steps.push(`${names[i]} has only one option left, so ${stop(attr.is(names[i], opts[left[0]]))} Cross out ${w(left[0])} for everyone else.`);
        progress = true;
        break;
      }
    }
    if (progress) continue;
    for (const o of keys(n)) {
      if (fixedP.includes(o)) continue;
      const who = keys(n).filter((i) => poss[i][o]);
      if (who.length === 1) {
        fix(who[0], o);
        steps.push(`Only ${names[who[0]]} is left for ${w(o)}, so ${stop(attr.is(names[who[0]], opts[o]))}`);
        progress = true;
        break;
      }
    }
    if (progress) continue;
    for (const c of rel) {
      const r = arc(c);
      if (r.length) {
        steps.push(`Look at clue ${clues.indexOf(c) + 1} again (${relText(c)}): now ${andList(r)}.`);
        progress = true;
        break;
      }
    }
    if (!progress) return null;
  }
  return fixedP.includes(-1) ? null : steps;
}

function logicGrid(rng: Rng, n: 3 | 4): Out {
  for (;;) {
    const attr = rng.pick(ATTRS);
    const start = attr.ordered ? rng.int(0, attr.opts.length - n) : 0;
    const opts = attr.ordered ? attr.opts.slice(start, start + n) : rng.sample(attr.opts, n);
    const names = rng.sample(NAMES, n);
    const sol = rng.shuffle(keys(n));
    const perms = permutations(n);
    const pool: Clue[] = [];
    for (const i of keys(n)) {
      pool.push({ text: stop(attr.is(names[i], opts[sol[i]])), ok: (p) => p[i] === sol[i], kind: 'pos', a: i, b: -1, o: sol[i] });
      for (const o of keys(n)) if (o !== sol[i]) pool.push({ text: stop(attr.isNot(names[i], opts[o])), ok: (p) => p[i] !== o, kind: 'neg', a: i, b: -1, o });
      for (const j of keys(n)) {
        if (j <= i) continue;
        for (const o of keys(n)) if (o !== sol[i] && o !== sol[j]) pool.push({ text: stop(attr.neither(opts[o], names[i], names[j])), ok: (p) => p[i] !== o && p[j] !== o, kind: 'neither', a: i, b: j, o });
      }
      if (attr.ordered) {
        for (const j of keys(n)) {
          if (j === i) continue;
          if (sol[i] < sol[j] && attr.before) pool.push({ text: stop(attr.before(names[i], names[j])), ok: (p) => p[i] < p[j], kind: 'before', a: i, b: j, o: -1 });
          if (sol[i] === sol[j] + 1 && attr.rightAfter) pool.push({ text: stop(attr.rightAfter(names[i], names[j])), ok: (p) => p[i] === p[j] + 1, kind: 'after', a: i, b: j, o: -1 });
        }
      }
    }
    // Pick clues in a random order, keeping each one that rules something out, until one arrangement is left.
    const askWho = rng.chance(0.5);
    const askI = rng.int(0, n - 1);
    const clues: Clue[] = [];
    let cand = perms;
    for (const c of rng.shuffle(pool)) {
      if (c.kind === 'pos' && (clues.some((x) => x.kind === 'pos') || c.a === askI)) continue;
      const next = cand.filter(c.ok);
      if (next.length === cand.length) continue;
      clues.push(c);
      cand = next;
      if (cand.length === 1) break;
    }
    // Brute force over every arrangement: exactly one fits all the clues.
    const fits = perms.filter((p) => clues.every((c) => c.ok(p)));
    if (fits.length !== 1 || clues.length > (n === 3 ? 4 : 6)) continue;
    if (n === 4 && attr.ordered && !clues.some((c) => c.kind === 'before' || c.kind === 'after')) continue;
    const steps = narrateGrid(n, names, opts, clues, attr);
    if (!steps) continue;
    const askO = sol[askI];
    const question = askWho ? attr.who(opts[askO]) : attr.what(names[askI]);
    const answer = askWho ? names[askI] : attr.choice(opts[askO]);
    const others = askWho ? names.filter((_, i) => i !== askI) : opts.filter((_, o) => o !== askO).map(attr.choice);
    const table: TableFigure = { type: 'table', headers: ['', ...opts.map(attr.head)], rows: names.map((nm) => [nm, ...opts.map(() => '')]) };
    return {
      prompt: `${andList(names)} ${attr.setting} Use the clues to answer the question.\n\n${clues.map((c, i) => `${i + 1}. ${c.text}`).join('\n')}\n\n${question}`,
      figure: table,
      parts: [{ answer: mc(rng, answer, others) }],
      hints: ['Use the grid: put an ✗ where a clue rules a match out and a ✓ where a clue confirms one.', 'Each row and each column has exactly one ✓. When only one box is left in a row or column, it must be the ✓.'],
      solution: [...steps, 'Check: every clue is true for this arrangement, and no other arrangement fits.', `Strategy: cross out what each clue rules out, then look for a row or column with only one choice left. ${stop(attr.is(names[askI], opts[askO]))}`],
      calculator: false,
    };
  }
}

// ---------------------------------------------------------------------------
// Weighing puzzles (balance scale, one lighter item)
// ---------------------------------------------------------------------------

const weighMemo = new Map<number, number>();
/** Brute force over every way to split the items: the fewest weighings that always find one lighter item among n. */
function weighings(n: number): number {
  if (n <= 1) return 0;
  const hit = weighMemo.get(n);
  if (hit !== undefined) return hit;
  let best = Infinity;
  for (let a = 1; 2 * a <= n; a++) best = Math.min(best, 1 + Math.max(weighings(a), weighings(n - 2 * a)));
  weighMemo.set(n, best);
  return best;
}

const WEIGH_CTX = [
  { things: 'steel bolts', one: 'bolt', why: 'one is lighter because it was machined wrong' },
  { things: 'bags of grass seed', one: 'bag', why: 'one bag was underfilled, so it is lighter' },
  { things: 'ball bearings', one: 'bearing', why: 'one is hollow, so it is lighter' },
  { things: 'boxes of deck screws', one: 'box', why: 'one box is short a few screws, so it is lighter' },
  { things: 'brass fittings', one: 'fitting', why: 'one is a cheap knock-off that is lighter' },
];

function weighItem(rng: Rng, d: 2 | 3): Out {
  const c = rng.pick(WEIGH_CTX);
  const name = rng.pick(NAMES);
  if (d === 3 && rng.chance(0.5)) {
    const W = rng.int(2, 4);
    const most = 3 ** W;
    // Brute force check: the largest n with weighings(n) <= W.
    const check = keys(100).filter((x) => x >= 1 && weighings(x) <= W).pop();
    const distract = [2 ** W, 3 * W, 2 * 3 ** (W - 1)].filter((x) => x !== most);
    return {
      prompt: `${name} has a balance scale and a pile of ${c.things} that look the same, but ${c.why}. What is the greatest number of ${c.things} for which $${W}$ weighings are always enough to find the light ${c.one}?`,
      parts: [{ answer: mc(rng, M(check ?? most), distract.map(M)) }],
      hints: ['A weighing has three possible results: the left side is lighter, the right side is lighter, or they balance.', 'Split the items into three equal groups. One weighing tells you which group has the light one.'],
      solution: [
        'Each weighing has $3$ outcomes, so one weighing can pick out the light item from $3$ groups: weigh two groups against each other, and leave the third off the scale.',
        `So $1$ weighing handles $3$ items, $2$ weighings handle $3 \\times 3 = 9$, and each extra weighing multiplies by $3$.`,
        `With $${W}$ weighings: $3^{${W}} = ${most}$. With $${most + 1}$ items, $${W}$ weighings could not always tell them apart.`,
        `Strategy: divide into three groups, not two. The greatest number is $${most}$.`,
      ],
      calculator: false,
    };
  }
  const N = retry(
    () => rng.int(d === 2 ? 5 : 10, d === 2 ? 27 : 80),
    (x) => ![9, 27, 81].includes(x) && weighings(x) >= 2,
    100,
  );
  const w = weighings(N);
  const halving = Math.ceil(Math.log2(N));
  const distract = [halving, w + 1, w - 1, Math.ceil(N / 3)].filter((x, i, a) => x !== w && x >= 1 && a.indexOf(x) === i).slice(0, 3);
  // The plan: three groups as equal as possible; follow the biggest group that could hold the light one.
  const plan: string[] = [];
  let left = N;
  let k = 1;
  while (left > 1) {
    const a = Math.ceil(left / 3);
    const off = left - 2 * a;
    const worst = Math.max(a, off);
    plan.push(
      off
        ? `Weighing ${k}: put $${a}$ on each side and leave $${off}$ off. If one side rises, the light ${c.one} is among its $${a}$; if they balance, it is among the $${off}$ left off. At worst $${worst}$ ${worst === 1 ? c.one : c.things} remain.`
        : `Weighing ${k}: put $${a}$ on each side. The side that rises holds the light ${c.one}${a === 1 ? '' : `, so $${a}$ remain`}.`,
    );
    left = Math.max(a, off);
    k++;
  }
  return {
    prompt: `${name} has $${N}$ ${c.things} that look the same, but ${c.why}. Using only a balance scale, what is the fewest number of weighings that is always enough to find the light ${c.one}?`,
    parts: [{ answer: mc(rng, M(w), distract.map(M)) }],
    hints: ['Do not just split the pile in half. A weighing can also tell you about the items left off the scale.', 'Split into three groups as equal as possible: weigh two of them. Each weighing leaves about a third of the items.'],
    solution: [
      ...plan,
      `That is $${w}$ weighings. Fewer is not possible: each weighing has only $3$ outcomes, so $${w - 1}$ weighing${w - 1 === 1 ? '' : 's'} can tell apart at most $3^{${w - 1}} = ${3 ** (w - 1)}$ items, fewer than $${N}$.`,
      `Strategy: split into three groups each time. The fewest weighings is $${w}$.`,
    ],
    calculator: false,
  };
}

// ---------------------------------------------------------------------------
// River crossings (searched completely, crossing by crossing)
// ---------------------------------------------------------------------------

interface Crossing {
  names: string[];
  /** Can this group be in the boat (it must include someone who paddles)? */
  boat: (group: number[]) => boolean;
  /** Is this group safe on a bank without the boat? */
  safe: (group: number[]) => boolean;
}

/** Breadth-first search over every state: the fewest crossings and one shortest plan (the people in the boat each time). */
function crossings(p: Crossing): { count: number; plan: number[][] } | null {
  const n = p.names.length;
  const full = (1 << n) - 1;
  const start = full * 2; // everyone on the near bank, boat near (bit 0 = 0)
  const enc = (near: number, boatFar: number) => near * 2 + boatFar;
  const prev = new Map<number, { from: number; load: number }>();
  prev.set(start, { from: -1, load: 0 });
  const queue = [start];
  const members = (mask: number) => keys(n).filter((i) => mask & (1 << i));
  while (queue.length) {
    const s = queue.shift()!;
    const near = s >> 1;
    const boatFar = s & 1;
    if (near === 0 && boatFar === 1) {
      const plan: number[][] = [];
      let cur = s;
      while (prev.get(cur)!.from >= 0) {
        plan.unshift(members(prev.get(cur)!.load));
        cur = prev.get(cur)!.from;
      }
      return { count: plan.length, plan };
    }
    const side = boatFar ? full & ~near : near;
    for (let load = side; load > 0; load = (load - 1) & side) {
      if (!p.boat(members(load))) continue;
      const nearNext = boatFar ? near | load : near & ~load;
      const farNext = full & ~nearNext;
      // The bank the boat leaves must be safe without it.
      const left = boatFar ? farNext : nearNext;
      if (!p.safe(members(left))) continue;
      const t = enc(nearNext, 1 - boatFar);
      if (prev.has(t)) continue;
      prev.set(t, { from: s, load });
      queue.push(t);
    }
  }
  return null;
}

function narratePlan(names: string[], plan: number[][]): string {
  return plan.map((g, i) => `(${i + 1}) ${cap(andList(g.map((x) => names[x])))} ${i % 2 === 0 ? 'cross' + (g.length === 1 ? 'es' : '') : 'come' + (g.length === 1 ? 's' : '') + ' back'}`).join('; ') + '.';
}

function riverItem(rng: Rng): Out {
  const kind = rng.pick(['classic', 'crew', 'mass'] as const);
  if (kind === 'classic') {
    const set = rng.pick([
      { who: 'A rancher', a: 'a guard dog', b: 'a lamb', c: 'a sack of feed', A: 'the dog', B: 'the lamb', C: 'the feed', boat: 'a canoe' },
      { who: 'A farmer', a: 'a fox', b: 'a hen', c: 'a bag of corn', A: 'the fox', B: 'the hen', C: 'the corn', boat: 'a small boat' },
      { who: 'A trail guide', a: 'a coyote pup (being taken to a rescue centre)', b: 'a rabbit', c: 'a box of lettuce', A: 'the coyote', B: 'the rabbit', C: 'the lettuce', boat: 'a raft' },
    ]);
    const names = [set.who.replace(/^A /, 'the '), set.A, set.B, set.C];
    const p: Crossing = {
      names,
      boat: (g) => g.includes(0) && g.length <= 2,
      safe: (g) => g.includes(0) || !((g.includes(1) && g.includes(2)) || (g.includes(2) && g.includes(3))),
    };
    const res = crossings(p)!;
    const askFirst = rng.chance(0.5);
    const firstItem = res.plan[0].filter((x) => x !== 0)[0];
    const rule = `${set.who} must take ${set.a}, ${set.b} and ${set.c} across a creek in ${set.boat} that holds the ${set.who.replace(/^A /, '').toLowerCase()} and only one other thing. ${cap(set.A)} cannot be left alone with ${set.B}, and ${set.B} cannot be left alone with ${set.C}.`;
    return {
      prompt: askFirst ? `${rule} What must go across on the first trip?` : `${rule} What is the fewest number of crossings needed (counting each trip across the creek, in either direction)?`,
      parts: [
        {
          answer: askFirst
            ? mc(rng, cap(names[firstItem]), [cap(set.A), cap(set.C), `Nothing: the ${set.who.replace(/^A /, '').toLowerCase()} crosses alone`])
            : mc(rng, M(res.count), [M(5), M(9), M(3)]),
        },
      ],
      hints: [`${cap(set.B)} is in conflict with both of the others. What happens if anything else goes first?`, `The trick: something may have to come back across.`],
      solution: [
        `If ${set.A} or ${set.C} goes first, ${set.B} is left with the other one. So ${set.B} must go first.`,
        `A shortest plan: ${narratePlan(names, res.plan)}`,
        `The key move is bringing ${set.B} back on trip $4$, so it is never left with ${set.A} or ${set.C}.`,
        askFirst ? `Strategy: move the item that conflicts with everything first. ${cap(set.B)} goes first.` : `Strategy: think about what can safely be left behind. The fewest crossings is $${res.count}$ (a full search of every possible plan finds none shorter).`,
      ],
      calculator: false,
    };
  }
  if (kind === 'crew') {
    const k = rng.int(2, 5);
    const crew = rng.pick([
      { big: 'surveyors', one: 'surveyor', small: 'summer students', s1: 'student', boat: 'a small inflatable raft' },
      { big: 'linemen', one: 'lineman', small: 'apprentices', s1: 'apprentice', boat: 'a small aluminum boat' },
      { big: 'forestry workers', one: 'forestry worker', small: 'junior rangers', s1: 'junior ranger', boat: 'a canoe' },
    ]);
    const names = [...keys(k).map((i) => `${crew.one} ${i + 1}`), `${crew.s1} A`, `${crew.s1} B`];
    const isBig = (i: number) => i < k;
    const p: Crossing = {
      names,
      boat: (g) => (g.length === 1) || (g.length === 2 && !g.some(isBig)),
      safe: () => true,
    };
    const res = crossings(p)!;
    const correct = res.count;
    return {
      prompt: `$${k}$ ${crew.big} and $2$ ${crew.small} must cross a river in ${crew.boat}. It can carry one ${crew.one}, or one or two ${crew.small}, but not a ${crew.one} with anyone else. Anyone can paddle. What is the fewest number of crossings (trips in either direction) to get everyone across?`,
      parts: [{ answer: mc(rng, M(correct), [M(2 * k + 1), M(4 * k - 1), M(4 * k + 3)]) }],
      hints: [`Someone has to bring the boat back after a ${crew.one} crosses. Who should be waiting on the far side?`, `Find a pattern of crossings that gets one ${crew.one} across and the boat back where it started.`],
      solution: [
        `Pattern: the two ${crew.small} cross; one ${crew.s1} comes back; a ${crew.one} crosses; the other ${crew.s1} comes back. After these $4$ crossings, one ${crew.one} is across and the boat and both ${crew.small} are back at the start.`,
        `Repeat for each ${crew.one}: $${k} \\times 4 = ${4 * k}$ crossings. Then the two ${crew.small} cross together: $1$ more.`,
        `Total: $${4 * k} + 1 = ${correct}$ crossings. A full search of every possible plan confirms none is shorter.`,
        `Strategy: use the ${crew.small} to bring the boat back each time. The fewest crossings is $${correct}$.`,
      ],
      calculator: false,
    };
  }
  // Mass limit: everyone paddles; the boat holds at most `cap` kilograms.
  for (;;) {
    const people = rng.sample(NAMES, 4);
    const masses = [rng.int(40, 55), rng.int(45, 60), rng.int(70, 85), rng.int(80, 95)];
    const capKg = rng.pick([100, 110, 120, 130, 140, 150]);
    const p: Crossing = {
      names: people,
      boat: (g) => g.length >= 1 && sum(g.map((i) => masses[i])) <= capKg,
      safe: () => true,
    };
    const res = crossings(p);
    if (!res || res.count < 5 || res.count > 13) continue;
    const label = people.map((nm, i) => `${nm} ($${masses[i]}\\ \\text{kg}$)`);
    const options = [res.count - 2, res.count + 2, res.count + 4].filter((x) => x >= 3);
    return {
      prompt: `Four workers on a fishing trip up north must cross a lake in a canoe that holds at most $${capKg}\\ \\text{kg}$: ${andList(label)}. The canoe needs at least one person to paddle it. What is the fewest number of crossings (trips in either direction) to get everyone across?`,
      parts: [{ answer: mc(rng, M(res.count), options.map(M)) }],
      hints: ['After each trip across (except the last), someone has to paddle the canoe back.', 'Let the lightest people do the shuttling, and send heavier people across when they cannot ride together.'],
      solution: [
        `Which pairs fit? ${andList(keys(4).flatMap((i) => keys(4).filter((j) => j > i && masses[i] + masses[j] <= capKg).map((j) => `${people[i]} and ${people[j]} ($${masses[i] + masses[j]}\\ \\text{kg}$)`))) || 'No two people fit together'}.`,
        `A shortest plan: ${narratePlan(people, res.plan)}`,
        `That is $${res.count}$ crossings. A full search of every possible plan finds none shorter.`,
        `Strategy: someone must paddle back after every trip except the last, so plan each trip and each return together. The fewest crossings is $${res.count}$.`,
      ],
      calculator: false,
    };
  }
}

// ---------------------------------------------------------------------------
// Take-away games (brute force over every position)
// ---------------------------------------------------------------------------

/** win[n] is true when the player to move with n counters left can force a win (taking the last counter wins). */
function winTable(N: number, moves: number[]): boolean[] {
  const win: boolean[] = [];
  for (let n = 0; n <= N; n++) win[n] = moves.some((m) => m <= n && !win[n - m]);
  return win;
}

const COUNTERS = [
  { things: 'bolts', where: 'in a bin at the shop', one: 'bolt' },
  { things: 'washers', where: 'on a workbench', one: 'washer' },
  { things: 'sandbags', where: 'in a pile', one: 'sandbag' },
  { things: 'fence posts', where: 'in a stack', one: 'post' },
  { things: 'wood chips', where: 'on the lunch table', one: 'chip' },
];

function nimOnePile(rng: Rng, d: 1 | 3): Out {
  const ctx = rng.pick(COUNTERS);
  const [a, b] = rng.sample(NAMES, 2);
  for (;;) {
    const moves = d === 1 ? keys(rng.pick([2, 3])).map((i) => i + 1) : rng.pick([[1, 3, 4], [1, 2, 5], [2, 3], [1, 4], [2, 5], [1, 2, 6]]);
    const N = rng.int(d === 1 ? 7 : 12, d === 1 ? 20 : 30);
    const win = winTable(N, moves);
    const good = moves.filter((m) => m <= N && !win[N - m]);
    if (good.length !== 1) continue;
    const m = good[0];
    const losing = keys(N + 1).filter((x) => !win[x]);
    const moveText = orList(moves.map(M));
    const simple = d === 1;
    return {
      prompt: `${a} and ${b} play a game with $${N}$ ${ctx.things} ${ctx.where}. They take turns removing ${moveText} ${ctx.things}${d === 3 ? ' (no other amounts)' : ''}. The player who takes the last ${ctx.one} wins${d === 3 ? ', and a player who cannot move loses' : ''}. It is ${a}’s turn. How many ${ctx.things} should ${a} take to be sure of winning?`,
      parts: [numPart(m, { suffix: ctx.things })],
      hints: simple
        ? [`Work backward. If ${b} faces $${moves.length + 1}$ ${ctx.things}, can ${b} win?`, `Leave ${b} a multiple of $${moves.length + 1}$.`]
        : ['Work backward from $0$. A position is losing if every move from it leads to a winning position for the other player, and winning if some move leads to a losing one.', 'List the losing positions up to the number of counters, then move to one of them.'],
      solution: simple
        ? [
            `If ${b} faces $${moves.length + 1}$ ${ctx.things}, whatever ${b} takes (${moveText}), ${a} can take the rest.`,
            `So the safe numbers to leave are multiples of $${moves.length + 1}$: ${andList(losing.filter((x) => x > 0).slice(0, 5).map(M))}${losing.length > 6 ? ', and so on' : ''}.`,
            `From $${N}$, taking $${m}$ leaves $${N - m}$, a multiple of $${moves.length + 1}$. Each round after that, ${a} takes enough to make $${moves.length + 1}$ with what ${b} took.`,
            `Strategy: leave your opponent a multiple of $${moves.length + 1}$. ${a} should take $${m}$.`,
          ]
        : [
            `Work backward. With $0$ left, the player to move has lost. A position is losing when every allowed move (${orList(moves.map(M))}) leads to a winning position for the other player.`,
            `Checking each number in turn, the losing positions up to $${N}$ are ${andList(losing.map(M))}.`,
            `From $${N}$, the moves leave ${andList(moves.filter((x) => x <= N).map((x) => `$${N - x}$`))}. Only $${N - m}$ is a losing position.`,
            `Strategy: always leave your opponent a losing position. ${a} should take $${m}$.`,
          ],
      calculator: false,
    };
  }
}

/** Two piles; take any number from one pile; taking the last counter wins. */
function nimTwoPiles(rng: Rng): Out {
  const ctx = rng.pick(COUNTERS);
  const [a, b] = rng.sample(NAMES, 2);
  const [p, q] = retry(
    () => [rng.int(3, 12), rng.int(2, 11)],
    ([x, y]) => x > y && x - y !== y,
    100,
  );
  // Brute force over every two-pile position.
  const win = keys(p + 1).map(() => keys(p + 1).map(() => false));
  for (let s = 0; s <= 2 * p; s++) for (let x = 0; x <= p; x++) {
    const y = s - x;
    if (y < 0 || y > p) continue;
    win[x][y] = keys(x).some((t) => !win[t][y]) || keys(y).some((t) => !win[x][t]);
  }
  const moveOk = (from: 'p' | 'q', take: number) => (from === 'p' ? !win[p - take][q] : !win[p][q - take]);
  const best = `Take $${p - q}$ from the pile of $${p}$`;
  const cands: Array<[string, 'p' | 'q', number]> = [
    [`Take $${p - q}$ from the pile of $${q}$`, 'q', p - q],
    [`Take all $${p}$ from the pile of $${p}$`, 'p', p],
    [`Take $1$ from the pile of $${p}$`, 'p', 1],
    [`Take all $${q}$ from the pile of $${q}$`, 'q', q],
  ];
  const distract = cands.filter(([t, f, k]) => t !== best && k >= 1 && k <= (f === 'p' ? p : q) && !moveOk(f, k)).map((c) => c[0]).slice(0, 3);
  return {
    prompt: `${a} and ${b} play a game with two piles of ${ctx.things}: one pile has $${p}$ and the other has $${q}$. On a turn, a player takes as many ${ctx.things} as they like (at least one) from **one** pile. The player who takes the last ${ctx.one} wins. It is ${a}’s turn. Which move guarantees that ${a} can win?`,
    parts: [{ answer: mc(rng, best, distract) }],
    hints: ['Think about what happens when the two piles are equal and it is your opponent’s turn.', 'If the piles are equal, whatever your opponent takes from one pile, you can take the same from the other.'],
    solution: [
      `When the piles are equal and it is ${b}’s turn, ${a} can copy: whatever ${b} takes from one pile, ${a} takes from the other. The piles stay equal, so ${a} always has a move and takes the last ${ctx.one}.`,
      `So ${a} should make the piles equal now: take $${p} - ${q} = ${p - q}$ from the pile of $${p}$, leaving $${q}$ and $${q}$.`,
      `Any other move leaves unequal piles, and then ${b} can use the same copying strategy against ${a}.`,
      `Strategy: make the piles equal, then copy. ${best}.`,
    ],
    calculator: false,
  };
}

// ---------------------------------------------------------------------------
// Tic-tac-toe: the best move (full game tree)
// ---------------------------------------------------------------------------

const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];
const LINE_NAMES = ['top row', 'middle row', 'bottom row', 'left column', 'middle column', 'right column', 'diagonal from top left to bottom right', 'diagonal from top right to bottom left'];
const SQ_NAMES = ['top-left', 'top-middle', 'top-right', 'middle-left', 'centre', 'middle-right', 'bottom-left', 'bottom-middle', 'bottom-right'];

function winner(b: number[]): number {
  for (const l of LINES) if (b[l[0]] && b[l[0]] === b[l[1]] && b[l[1]] === b[l[2]]) return b[l[0]];
  return 0;
}

const ttMemo = new Map<string, number>();
/** Value for X (1 = X wins, 0 = draw, -1 = O wins) with best play; `turn` is 1 for X, 2 for O. */
function value(b: number[], turn: number): number {
  const key = b.join('') + turn;
  const hit = ttMemo.get(key);
  if (hit !== undefined) return hit;
  const w = winner(b);
  let v: number;
  if (w) v = w === 1 ? 1 : -1;
  else if (!b.includes(0)) v = 0;
  else {
    const vals = keys(9).filter((k) => !b[k]).map((k) => {
      const nb = b.slice();
      nb[k] = turn;
      return value(nb, 3 - turn);
    });
    v = turn === 1 ? Math.max(...vals) : Math.min(...vals);
  }
  ttMemo.set(key, v);
  return v;
}

/** Lines where `who` has two and the third square is empty: the empty squares. */
function threats(b: number[], who: number): Array<{ line: number; sq: number }> {
  const out: Array<{ line: number; sq: number }> = [];
  LINES.forEach((l, i) => {
    const mine = l.filter((k) => b[k] === who).length;
    const empty = l.filter((k) => !b[k]);
    if (mine === 2 && empty.length === 1) out.push({ line: i, sq: empty[0] });
  });
  return out;
}

function boardFigure(b: number[], letters: Map<number, string>): PlaneFigure {
  const c = new Canvas(4, 4);
  const X = (col: number) => 0.5 + col;
  const Y = (row: number) => 3.5 - row;
  for (const k of [1, 2]) {
    c.seg([X(k), Y(0)], [X(k), Y(3)], { color: 'muted' });
    c.seg([X(0), Y(k)], [X(3), Y(k)], { color: 'muted' });
  }
  keys(9).forEach((k) => {
    const cx = X(k % 3) + 0.5;
    const cy = Y(Math.floor(k / 3)) - 0.5;
    if (b[k] === 1) {
      c.seg([cx - 0.28, cy - 0.28], [cx + 0.28, cy + 0.28]);
      c.seg([cx - 0.28, cy + 0.28], [cx + 0.28, cy - 0.28]);
    } else if (b[k] === 2) {
      c.poly(keys(25).map((t) => [cx + 0.3 * Math.cos((t * 2 * Math.PI) / 24), cy + 0.3 * Math.sin((t * 2 * Math.PI) / 24)] as P), 'accent');
    } else if (letters.has(k)) c.text([cx, cy], letters.get(k)!);
  });
  return c.build();
}

function bestMove(rng: Rng, d: 2 | 3): Out {
  const [xName, oName] = rng.sample(NAMES, 2);
  for (;;) {
    const b = Array(9).fill(0);
    const pieces = d === 2 ? rng.pick([4, 4, 6]) : rng.pick([2, 4, 4]);
    let bad = false;
    for (let i = 0; i < pieces; i++) {
      const free = keys(9).filter((k) => !b[k]);
      b[rng.pick(free)] = i % 2 === 0 ? 1 : 2;
      if (winner(b)) bad = true;
    }
    if (bad) continue;
    const empty = keys(9).filter((k) => !b[k]);
    const vals = empty.map((k) => {
      const nb = b.slice();
      nb[k] = 1;
      return value(nb, 2);
    });
    const top = Math.max(...vals);
    const bestSq = empty.filter((_, i) => vals[i] === top);
    if (bestSq.length !== 1) continue;
    const m = bestSq[0];
    const xWin = threats(b, 1);
    const oWin = threats(b, 2);
    let kind: 'win' | 'block' | 'fork';
    if (xWin.some((t) => t.sq === m)) kind = 'win';
    else if (oWin.some((t) => t.sq === m)) kind = 'block';
    else kind = 'fork';
    if (d === 2 && kind === 'fork') continue;
    if (d === 3 && kind !== 'fork') continue;
    const after = b.slice();
    after[m] = 1;
    const forks = threats(after, 1);
    if (kind === 'fork' && (top !== 1 || forks.length < 2)) continue;
    const wrong = rng.shuffle(empty.filter((k) => k !== m)).slice(0, Math.min(3, empty.length - 1));
    if (wrong.length < 2) continue;
    const shown = [m, ...wrong].sort((x, y) => x - y);
    const letters = new Map(shown.map((k, i) => [k, 'ABCD'[i]] as const));
    // Why each other square is worse: O's best reply.
    const why = wrong.slice().sort((x, y) => x - y).map((k) => {
      const nb = b.slice();
      nb[k] = 1;
      const oNow = threats(nb, 2).filter((t) => !nb[t.sq]);
      if (oNow.length) return `${letters.get(k)}: ${oName} wins at the ${SQ_NAMES[oNow[0].sq]} square (the ${LINE_NAMES[oNow[0].line]}).`;
      const v = value(nb, 2);
      return `${letters.get(k)}: with best play by ${oName}, the game ends in a ${v === 0 ? 'draw' : 'loss for ' + xName}.`;
    });
    const L = letters.get(m)!;
    const explain =
      kind === 'win'
        ? `Square ${L} completes the ${LINE_NAMES[xWin.find((t) => t.sq === m)!.line]} for ${xName}, who wins right away.`
        : kind === 'block'
          ? `${oName} has two in the ${LINE_NAMES[oWin.find((t) => t.sq === m)!.line]} and will win at square ${L} next turn. ${xName} has no winning move, so ${xName} must block at ${L}.`
          : `Square ${L} gives ${xName} two lines with two X’s and an empty square: the ${LINE_NAMES[forks[0].line]} and the ${LINE_NAMES[forks[1].line]}. ${oName} can block only one, so ${xName} wins next turn. This is called a fork.`;
    return {
      prompt: `${xName} (X) and ${oName} (O) are playing tic-tac-toe on a whiteboard in the lunchroom. It is ${xName}’s turn. Which square should ${xName} choose to get the best result?`,
      figure: boardFigure(b, letters),
      parts: [{ answer: fixedChoice(shown.map((k) => `Square ${letters.get(k)}`), shown.indexOf(m)) }],
      hints: ['First, can X win right now? If not, can O win on the next turn? If so, X must block.', d === 3 ? 'If neither, look for a square that makes two threats at once (two lines with two X’s each and an empty square).' : 'Check every line through each lettered square.'],
      solution: [explain, `The other choices are worse. ${why.join(' ')}`, `Strategy: win if you can; block if you must; otherwise make two threats at once. ${xName} should choose square ${L}.`],
      calculator: false,
    };
  }
}

// ---------------------------------------------------------------------------
// The skill
// ---------------------------------------------------------------------------

const logicPuzzle = skill({
  id: 'm303-logic-puzzle',
  name: 'Logic puzzles and games',
  description: 'Solve number pyramids, 4 × 4 Sudoku, KenKen cages and logic grids, reason through weighing and river-crossing puzzles, and find the winning move in take-away games and tic-tac-toe, explaining the strategy.',
  outcomes: ['N1'],
  lessonId: 'm303-9-1',
  calculator: false,
  format: 'free',
  gen(rng, d) {
    if (d === 1) {
      const m = rng.pick(['pyramid', 'sudoku', 'nim'] as const);
      if (m === 'pyramid') return pyramidItem(rng, 1);
      if (m === 'sudoku') return sudokuItem(rng, 1);
      return nimOnePile(rng, 1);
    }
    if (d === 2) {
      const m = rng.pick(['pyramid', 'sudoku', 'kenken', 'grid', 'nim', 'weigh', 'move'] as const);
      if (m === 'pyramid') return pyramidItem(rng, 2);
      if (m === 'sudoku') return sudokuItem(rng, 2);
      if (m === 'kenken') return kenkenItem(rng, 3);
      if (m === 'grid') return logicGrid(rng, 3);
      if (m === 'nim') return nimTwoPiles(rng);
      if (m === 'weigh') return weighItem(rng, 2);
      return bestMove(rng, 2);
    }
    const m = rng.pick(['pyramid', 'sudoku', 'kenken', 'grid', 'nim', 'weigh', 'river', 'move'] as const);
    if (m === 'pyramid') return pyramidItem(rng, 3);
    if (m === 'sudoku') return sudokuItem(rng, 3);
    if (m === 'kenken') return kenkenItem(rng, 4);
    if (m === 'grid') return logicGrid(rng, 4);
    if (m === 'nim') return nimOnePile(rng, 3);
    if (m === 'weigh') return weighItem(rng, 3);
    if (m === 'river') return riverItem(rng);
    return bestMove(rng, 3);
  },
});

export const PUZZLES_SKILLS: SkillDef[] = [logicPuzzle];
