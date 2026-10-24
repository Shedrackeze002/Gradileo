/** Math 30-2 Unit 8 — Puzzles, Games and the Research Project (LR1, RP1). */
import { mc, numPart, part, skill } from '../../helpers.ts';
import type { GenOutput } from '../../helpers.ts';
import { isPrime } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { PlaneFigure, PlanePoint, PlaneSegment, SkillDef } from '../../../types.ts';
import { textAt } from './setslogic.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const NAMES = [
  'Ava', 'Jayden', 'Harpreet', 'Lucas', 'Kiona', 'Mohammed', 'Elise', 'Darnell', 'Yuki', 'Rowan', 'Anika', 'Mateo', 'Sienna', 'Emeka', 'Talia',
  'Arjun', 'Maëlle', 'Connor', 'Layla', 'Nathaniel', 'Wren', 'Bao', 'Fiona', 'Ibrahim', 'Skye', 'Diego', 'Naomi', 'Kwame', 'Jessie', 'Parveen',
];

const PLACES = ['Riverton', 'Lakeside', 'Brookfield', 'Hillcrest', 'Pinewood', 'Maple Falls', 'Stonebridge', 'Westbury', 'Ashford', 'Clearwater', 'Oakridge', 'Elmwood'];

const range = (a: number, b: number) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
const cap = (s: string) => s[0].toUpperCase() + s.slice(1);
/** "a, b and c" */
const andList = (xs: string[]) => (xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`);
/** "a, b or c" */
const orList = (xs: string[]) => (xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} or ${xs[xs.length - 1]}`);
/** A list for a solution: written out when short, counted when long. */
const listOrCount = (xs: number[]) => (xs.length <= 12 ? xs.join(', ') : `${xs.slice(0, 4).join(', ')}, …, ${xs[xs.length - 1]} (${xs.length} numbers)`);

const PPU = 34;

/** A grid of square cells drawn on a plane canvas, with text centred in cells. */
export function gridFigure(nRows: number, cell: number, texts: string[][], opts: { box?: number; colLabels?: string[]; rowLabels?: string[]; caption?: string } = {}): PlaneFigure {
  const side = nRows * cell;
  const x0 = 5 - side / 2;
  const y0 = 0.45;
  const top = y0 + side;
  const h = top + (opts.colLabels ? 0.9 : 0.45);
  const segments: PlaneSegment[] = [];
  for (let i = 0; i <= nRows; i++) {
    const thick = i === 0 || i === nRows || (opts.box !== undefined && i % opts.box === 0);
    const color = thick ? 'brand' : 'muted';
    // Thick lines are drawn as two strokes side by side.
    for (const off of thick ? [-0.025, 0.025] : [0]) {
      segments.push({ from: [x0 + i * cell + off, y0], to: [x0 + i * cell + off, top], color });
      segments.push({ from: [x0, y0 + i * cell + off], to: [x0 + side, y0 + i * cell + off], color });
    }
  }
  const points: PlanePoint[] = [];
  texts.forEach((row, r) =>
    row.forEach((t, c) => {
      if (t) points.push(textAt(x0 + (c + 0.5) * cell, top - (r + 0.5) * cell, t, PPU));
    }),
  );
  opts.colLabels?.forEach((t, c) => points.push(textAt(x0 + (c + 0.5) * cell, top + 0.6, t, PPU)));
  opts.rowLabels?.forEach((t, r) => points.push(textAt(x0 - 0.4, top - (r + 0.5) * cell, t, PPU)));
  return {
    type: 'plane',
    grid: { xMin: 0, xMax: 10, yMin: 0, yMax: Math.round(h * 100) / 100, step: 10 },
    hideTickLabels: true,
    hideAxes: true,
    segments,
    points,
    ...(opts.caption ? { caption: opts.caption } : {}),
  };
}

// ---------------------------------------------------------------------------
// Puzzle 1 — Number riddles (checked against every two-digit number)
// ---------------------------------------------------------------------------

interface Clue {
  text: string;
  test: (m: number) => boolean;
}

const tens = (m: number) => Math.floor(m / 10);
const ones = (m: number) => m % 10;
const rev = (m: number) => 10 * ones(m) + tens(m);
const TWO_DIGIT = range(10, 99);

function digitClues(rng: Rng, n: number): Clue[] {
  const [a, b] = [tens(n), ones(n)];
  const out: Clue[] = [
    { text: `The sum of my digits is ${a + b}.`, test: (m) => tens(m) + ones(m) === a + b },
    { text: `The product of my digits is ${a * b}.`, test: (m) => tens(m) * ones(m) === a * b },
    { text: n % 2 === 0 ? 'I am even.' : 'I am odd.', test: (m) => m % 2 === n % 2 },
  ];
  if (a > b) out.push({ text: `My tens digit is ${a - b} more than my ones digit.`, test: (m) => tens(m) - ones(m) === a - b });
  if (b > a) out.push({ text: `My ones digit is ${b - a} more than my tens digit.`, test: (m) => ones(m) - tens(m) === b - a });
  if (b > 0 && a !== b) {
    const d = rev(n) - n;
    out.push({ text: d > 0 ? `If you reverse my digits, the new number is ${d} more than me.` : `If you reverse my digits, the new number is ${-d} less than me.`, test: (m) => rev(m) - m === d });
  }
  for (const k of [3, 4, 6, 7, 9]) if (n % k === 0) out.push({ text: `I am a multiple of ${k}.`, test: (m) => m % k === 0 });
  if (isPrime(n)) out.push({ text: 'I am a prime number.', test: isPrime });
  const lo = Math.max(10, n - rng.int(4, 25));
  const hi = Math.min(99, n + rng.int(4, 25));
  out.push({ text: `I am between ${lo} and ${hi}.`, test: (m) => m > lo && m < hi });
  return out;
}

const solutionsOf = (clues: Clue[]) => TWO_DIGIT.filter((m) => clues.every((c) => c.test(m)));

function riddle(rng: Rng, nClues: number): GenOutput {
  for (;;) {
    const n = rng.int(12, 98);
    const pool = rng.shuffle(digitClues(rng, n));
    if (pool.length < nClues) continue;
    const clues = pool.slice(0, nClues);
    const sols = solutionsOf(clues);
    if (sols.length !== 1) continue;
    // Every clue must be needed.
    if (clues.some((_, i) => solutionsOf(clues.filter((__, j) => j !== i)).length === 1)) continue;
    // Solve in the most helpful order: start with the clue that leaves the fewest numbers.
    const order = [...clues].sort((x, y) => TWO_DIGIT.filter(x.test).length - TWO_DIGIT.filter(y.test).length);
    const steps: string[] = [];
    let cands = TWO_DIGIT;
    order.forEach((c, i) => {
      cands = cands.filter(c.test);
      steps.push(`${i === 0 ? 'Start with' : 'Then use'} "${c.text}" ${i === 0 ? 'Two-digit numbers that fit' : 'Numbers left'}: ${listOrCount(cands)}.`);
    });
    return {
      prompt: `Find the two-digit number from the clues.\n\n${clues.map((c) => `- ${c.text}`).join('\n')}`,
      parts: [numPart(n, { label: 'Number:' })],
      hints: ['Start with the clue that allows the fewest two-digit numbers, and list them.', 'Test each number on your list against the other clues.'],
      solution: [...steps, `Only ${n} fits every clue, so the number is ${n}.`],
    };
  }
}

// ---------------------------------------------------------------------------
// Puzzle 2 — 3 × 3 magic squares (checked against every integer magic square)
// ---------------------------------------------------------------------------

/** Every 3 × 3 magic square is c + a·(…) + b·(…) for integers c, a, b. Coefficients of [c, a, b] for each cell. */
const MAGIC_COEF: number[][][] = [
  [[1, 0, -1], [1, 1, 1], [1, -1, 0]],
  [[1, -1, 1], [1, 0, 0], [1, 1, -1]],
  [[1, 1, 0], [1, -1, -1], [1, 0, 1]],
];

const LINES: Array<{ name: string; cells: Array<[number, number]> }> = [
  { name: 'the top row', cells: [[0, 0], [0, 1], [0, 2]] },
  { name: 'the middle row', cells: [[1, 0], [1, 1], [1, 2]] },
  { name: 'the bottom row', cells: [[2, 0], [2, 1], [2, 2]] },
  { name: 'the left column', cells: [[0, 0], [1, 0], [2, 0]] },
  { name: 'the middle column', cells: [[0, 1], [1, 1], [2, 1]] },
  { name: 'the right column', cells: [[0, 2], [1, 2], [2, 2]] },
  { name: 'the diagonal from top left to bottom right', cells: [[0, 0], [1, 1], [2, 2]] },
  { name: 'the diagonal from top right to bottom left', cells: [[0, 2], [1, 1], [2, 0]] },
];

const key = (r: number, c: number) => `${r},${c}`;
const SQUARE_NAMES = [
  ['top-left', 'top-middle', 'top-right'],
  ['middle-left', 'centre', 'middle-right'],
  ['bottom-left', 'bottom-middle', 'bottom-right'],
];

/** Every value the target cell can take in an integer magic square that matches the givens (and the sum, if given). */
function magicTargetValues(given: Map<string, number>, target: [number, number], sum: number | null): Set<number> {
  const vals = new Set<number>();
  const cells = [...given.entries()].map(([k, v]) => [...k.split(',').map(Number), v] as [number, number, number]);
  const [r0, c0, v0] = cells[0];
  for (let a = -60; a <= 60; a++) {
    for (let b = -60; b <= 60; b++) {
      const co = MAGIC_COEF[r0][c0];
      const c = v0 - co[1] * a - co[2] * b;
      const at = (r: number, k: number) => c + MAGIC_COEF[r][k][1] * a + MAGIC_COEF[r][k][2] * b;
      if (sum !== null && 3 * c !== sum) continue;
      if (cells.every(([r, k, v]) => at(r, k) === v)) vals.add(at(target[0], target[1]));
    }
  }
  return vals;
}

/** Solve the way a student would: find the magic sum from a full line, then fill lines with one blank. */
function magicSteps(square: number[][], given: Map<string, number>, target: [number, number], sum: number | null): string[] | null {
  const known = new Map(given);
  let S = sum;
  const steps: string[] = [];
  for (let guard = 0; guard < 12 && !known.has(key(...target)); guard++) {
    if (S === null) {
      const full = LINES.find((l) => l.cells.every(([r, c]) => known.has(key(r, c))));
      if (!full) return null;
      const vs = full.cells.map(([r, c]) => known.get(key(r, c))!);
      S = vs.reduce((s, v) => s + v, 0);
      steps.push(`${cap(full.name)} is complete, so the magic sum is $${vs.join(' + ')} = ${S}$.`);
      continue;
    }
    // Prefer a line through the target, then any line with one blank.
    const open = LINES.filter((l) => l.cells.filter(([r, c]) => !known.has(key(r, c))).length === 1);
    if (!open.length) return null;
    const line = open.find((l) => l.cells.some(([r, c]) => r === target[0] && c === target[1])) ?? open[0];
    const [br, bc] = line.cells.find(([r, c]) => !known.has(key(r, c)))!;
    const others = line.cells.filter(([r, c]) => known.has(key(r, c))).map(([r, c]) => known.get(key(r, c))!);
    const v = S - others[0] - others[1];
    if (v !== square[br][bc]) return null;
    known.set(key(br, bc), v);
    const isTarget = br === target[0] && bc === target[1];
    steps.push(isTarget ? `In ${line.name}: $x = ${S} - ${others[0]} - ${others[1]} = ${v}$.` : `In ${line.name}, the ${SQUARE_NAMES[br][bc]} square is $${S} - ${others[0]} - ${others[1]} = ${v}$.`);
  }
  return known.has(key(...target)) ? steps : null;
}

function magicSquare(rng: Rng, d: 1 | 2 | 3): GenOutput {
  for (;;) {
    const c = rng.int(d === 1 ? 5 : 8, d === 1 ? 15 : 30);
    const a = rng.nonZero(-7, 7);
    const b = rng.nonZero(-7, 7);
    const sq = MAGIC_COEF.map((row) => row.map(([, ka, kb]) => c + ka * a + kb * b));
    const flat = sq.flat();
    if (new Set(flat).size !== 9 || flat.some((v) => v < 1)) continue;
    const target: [number, number] = [rng.int(0, 2), rng.int(0, 2)];
    const S = 3 * c;
    const given = new Map<string, number>();
    const others = rng.shuffle(range(0, 8).map((i) => [Math.floor(i / 3), i % 3] as [number, number]).filter(([r, k]) => r !== target[0] || k !== target[1]));
    const nGiven = d === 1 ? rng.int(3, 4) : d === 2 ? rng.int(5, 6) : rng.int(4, 5);
    for (const [r, k] of others.slice(0, nGiven)) given.set(key(r, k), sq[r][k]);
    const sumGiven = d === 1 ? S : null;
    const steps = magicSteps(sq, given, target, sumGiven);
    if (!steps) continue;
    const nFill = steps.filter((s) => s.startsWith('In ')).length;
    if (d === 1 && nFill !== 1) continue;
    if (d === 2 && (nFill < 1 || nFill > 2)) continue;
    if (d === 3 && nFill < 3) continue;
    const vals = magicTargetValues(given, target, sumGiven);
    if (vals.size !== 1 || !vals.has(sq[target[0]][target[1]])) continue;
    const texts = sq.map((row, r) => row.map((v, k) => (r === target[0] && k === target[1] ? 'x' : given.has(key(r, k)) ? String(v) : '')));
    return {
      prompt: `In a magic square, every row, every column and both diagonals add to the same number, the **magic sum**.${sumGiven ? ` The magic sum of this square is ${S}.` : ''} What number is $x$?`,
      figure: gridFigure(3, 1.5, texts, { caption: 'A 3 by 3 magic square with some numbers missing.' }),
      parts: [numPart(sq[target[0]][target[1]], { label: '$x =$' })],
      hints: [
        sumGiven ? 'Find a row, column or diagonal through $x$ in which the other two numbers are known.' : 'First find the magic sum: look for a row, column or diagonal that is complete.',
        'In any line with only one blank, the blank is the magic sum minus the other two numbers. Fill blanks one at a time until you reach $x$.',
      ],
      solution: [...steps, `$x = ${sq[target[0]][target[1]]}$`],
    };
  }
}

// ---------------------------------------------------------------------------
// Puzzle 3 — 4 × 4 Sudoku (checked against all 288 completed grids)
// ---------------------------------------------------------------------------

let SUDOKU4: number[][][] | null = null;

/** Every completed 4 × 4 Sudoku grid (there are 288). */
function allSudoku4(): number[][][] {
  if (SUDOKU4) return SUDOKU4;
  const out: number[][][] = [];
  const g = Array.from({ length: 4 }, () => [0, 0, 0, 0]);
  const ok = (r: number, c: number, v: number) => {
    for (let i = 0; i < 4; i++) if (g[r][i] === v || g[i][c] === v) return false;
    const br = r - (r % 2);
    const bc = c - (c % 2);
    for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) if (g[br + i][bc + j] === v) return false;
    return true;
  };
  const fill = (i: number) => {
    if (i === 16) return void out.push(g.map((row) => [...row]));
    const [r, c] = [Math.floor(i / 4), i % 4];
    for (let v = 1; v <= 4; v++) {
      if (!ok(r, c, v)) continue;
      g[r][c] = v;
      fill(i + 1);
      g[r][c] = 0;
    }
  };
  fill(0);
  SUDOKU4 = out;
  return out;
}

const COLS = ['A', 'B', 'C', 'D'];
const cellName = (r: number, c: number) => `${COLS[c]}${r + 1}`;

/** Fill cells that have only one possible digit (row, column and 2 × 2 box), recording the reasons, until the target is filled. */
function sudokuSteps(grid: number[][], givens: boolean[][], target: [number, number]): string[] | null {
  const g = grid.map((row, r) => row.map((v, c) => (givens[r][c] ? v : 0)));
  const steps: string[] = [];
  for (let guard = 0; guard < 16 && !g[target[0]][target[1]]; guard++) {
    let done = false;
    // Prefer the target cell when it is ready.
    const cells = [target, ...range(0, 15).map((i) => [Math.floor(i / 4), i % 4] as [number, number])];
    for (const [r, c] of cells) {
      if (g[r][c]) continue;
      const row = g[r].filter(Boolean);
      const col = g.map((x) => x[c]).filter(Boolean);
      const br = r - (r % 2);
      const bc = c - (c % 2);
      const box = [g[br][bc], g[br][bc + 1], g[br + 1][bc], g[br + 1][bc + 1]].filter(Boolean);
      const seen = new Set([...row, ...col, ...box]);
      const left = range(1, 4).filter((v) => !seen.has(v));
      if (left.length !== 1) continue;
      g[r][c] = left[0];
      const why = [row.length ? `row ${r + 1} has ${andList([...new Set(row)].sort().map(String))}` : '', col.length ? `column ${COLS[c]} has ${andList([...new Set(col)].sort().map(String))}` : '', box.length ? `its box has ${andList([...new Set(box)].sort().map(String))}` : ''].filter(Boolean);
      steps.push(`${cellName(r, c)}: ${andList(why)}, so ${cellName(r, c)} $= ${left[0]}$.`);
      done = true;
      break;
    }
    if (!done) return null;
  }
  return g[target[0]][target[1]] === grid[target[0]][target[1]] ? steps : null;
}

function sudoku(rng: Rng, d: 1 | 2 | 3): GenOutput {
  const all = allSudoku4();
  for (;;) {
    const grid = rng.pick(all);
    const target: [number, number] = [rng.int(0, 3), rng.int(0, 3)];
    const givens = grid.map((row) => row.map(() => true));
    givens[target[0]][target[1]] = false;
    const consistent = () => all.filter((x) => x.every((row, r) => row.every((v, c) => !givens[r][c] || v === grid[r][c]))).length;
    const want = d === 1 ? rng.int(9, 10) : d === 2 ? rng.int(7, 8) : 5;
    for (const i of rng.shuffle(range(0, 15))) {
      const [r, c] = [Math.floor(i / 4), i % 4];
      if (!givens[r][c]) continue;
      if (givens.flat().filter(Boolean).length <= want) break;
      givens[r][c] = false;
      if (consistent() !== 1) givens[r][c] = true;
    }
    const n = givens.flat().filter(Boolean).length;
    if (d === 3 ? n > 6 : n !== want) continue;
    if (consistent() !== 1) continue;
    const steps = sudokuSteps(grid, givens, target);
    if (!steps) continue;
    if (d === 1 && steps.length !== 1) continue;
    if (d === 2 && steps.length < 2) continue;
    if (d === 3 && steps.length < 3) continue;
    const texts = grid.map((row, r) => row.map((v, c) => (givens[r][c] ? String(v) : '')));
    const name = cellName(...target);
    return {
      prompt: `Complete this 4 by 4 Sudoku: each row, each column and each 2 by 2 box (outlined) must contain the digits 1, 2, 3 and 4 exactly once. What digit goes in cell ${name} (column ${COLS[target[1]]}, row ${target[0] + 1})?`,
      figure: gridFigure(4, 1.3, texts, { box: 2, colLabels: COLS, rowLabels: ['1', '2', '3', '4'], caption: 'A 4 by 4 Sudoku with columns A to D and rows 1 to 4.' }),
      parts: [numPart(grid[target[0]][target[1]], { label: `${name}:` })],
      hints: [`Look at row ${target[0] + 1}, column ${COLS[target[1]]} and the box that contains ${name}. Which digits are already used?`, 'If a cell has only one digit left, fill it in. Filling easy cells first can unlock the cell you need.'],
      solution: [...steps, `The digit in ${name} is ${grid[target[0]][target[1]]}.`],
    };
  }
}

// ---------------------------------------------------------------------------
// Puzzle 4 — Take-away games (checked by searching the whole game tree)
// ---------------------------------------------------------------------------

/** Win/lose for the player about to move with p counters left. */
function gameTable(N: number, k: number, lastLoses: boolean): boolean[] {
  const win: boolean[] = [];
  win[0] = lastLoses; // with no counters left, the previous player took the last one
  for (let p = 1; p <= N; p++) {
    win[p] = false;
    for (let m = 1; m <= Math.min(k, p); m++) if (!win[p - m]) win[p] = true;
  }
  return win;
}

const GAME_THEMES = [
  { things: 'counters', place: 'pile', take: 'take' },
  { things: 'toothpicks', place: 'pile', take: 'take' },
  { things: 'stones', place: 'row', take: 'remove' },
  { things: 'chips', place: 'pile', take: 'take' },
];

function takeAway(rng: Rng, d: 2 | 3): GenOutput {
  for (;;) {
    const k = rng.int(2, 5);
    const lastLoses = d === 3 && rng.chance(0.6);
    const th = rng.pick(GAME_THEMES);
    const name = rng.pick(NAMES);
    const rule = `Two players take turns. On each turn, a player must ${th.take} 1 to ${k} ${th.things} from the ${th.place}. The player who takes the last ${th.things.replace(/s$/, '')} ${lastLoses ? '**loses**' : '**wins**'}.`;
    if (d === 3 && !lastLoses) {
      // Find a losing starting position.
      const lo = rng.int(20, 40);
      const win = gameTable(lo + 2 * (k + 1), k, false);
      const ans = range(lo + 1, lo + 2 * (k + 1)).find((p) => !win[p])!;
      const losing = range(0, lo).filter((p) => !win[p]);
      return {
        prompt: `${rule}\n\nIf both players play perfectly, some starting sizes are a sure loss for the player who goes first. What is the smallest starting number of ${th.things}, greater than ${lo}, for which the first player is sure to lose?`,
        parts: [numPart(ans, { label: `${cap(th.things)}:` })],
        hints: ['Work backward from small piles. With 0 left on your turn, you have already lost.', `A position is a loss for the player to move if every move (1 to ${k}) leaves the other player in a winning position.`],
        solution: [
          `With 1 to ${k} ${th.things}, the player to move takes them all and wins. With ${k + 1}, every move leaves 1 to ${k} for the other player, so ${k + 1} is a losing position.`,
          `In the same way, the losing positions are the multiples of ${k + 1}: ${listOrCount(losing.slice(0, 8))}, … From any other position you can move to a multiple of ${k + 1}.`,
          `The first multiple of ${k + 1} greater than ${lo} is ${ans}.`,
          `The answer is ${ans} ${th.things}.`,
        ],
      };
    }
    const n = rng.int(12, 35);
    const win = gameTable(n, k, lastLoses);
    const moves = range(1, k).filter((m) => m <= n && !win[n - m]);
    if (moves.length !== 1) continue;
    const m = moves[0];
    const losing = range(0, n).filter((p) => !win[p] && (lastLoses ? p >= 1 : true));
    const target = n - m;
    return {
      prompt: `${rule}\n\n${name} goes first, with ${n} ${th.things} in the ${th.place}. How many ${th.things} should ${name} ${th.take} on the first turn to be sure of winning, no matter what the other player does?`,
      parts: [numPart(m, { label: `${cap(th.things)}:` })],
      hints: [
        lastLoses ? 'Work backward. Leaving exactly 1 for the other player wins, because they must take it.' : 'Work backward. Leaving the other player with 0 wins, so which small piles can you not win from?',
        `Each round, if your opponent takes $t$, you can take $${k + 1} - t$. So aim to leave a pile that is ${lastLoses ? `1 more than a multiple of ${k + 1}` : `a multiple of ${k + 1}`}.`,
      ],
      solution: [
        lastLoses
          ? `Leaving 1 ${th.things.replace(/s$/, '')} wins: the other player must take it. From 1 more than any multiple of ${k + 1}, the other player cannot avoid this, because you can always make each round total ${k + 1}.`
          : `Leaving 0 wins. A pile that is a multiple of ${k + 1} is a loss for the player to move: whatever they take ($t$), you take $${k + 1} - t$ and keep the pile a multiple of ${k + 1}.`,
        `Losing positions for the player to move: ${listOrCount(losing)}.`,
        `${name} should leave ${target}: $${n} - ${m} = ${target}$.`,
        `${name} should ${th.take} ${m} ${m === 1 ? th.things.replace(/s$/, '') : th.things}.`,
      ],
    };
  }
}

// ---------------------------------------------------------------------------
// Puzzle 5 — Logic puzzles (checked against every possible matching)
// ---------------------------------------------------------------------------

const THEMES = [
  { items: ['hockey', 'soccer', 'curling', 'volleyball', 'badminton'], verb: 'plays', not: 'does not play', must: 'must play', can: 'can play', what: 'sport', has: 'plays a different sport' },
  { items: ['guitar', 'piano', 'drums', 'violin', 'trumpet'], verb: 'plays the', not: 'does not play the', must: 'must play the', can: 'can play the', what: 'instrument', has: 'plays a different instrument' },
  { items: ['Riverton', 'Lakeside', 'Maple Falls', 'Stonebridge', 'Clearwater'], verb: 'is visiting', not: 'is not visiting', must: 'must be visiting', can: 'can be visiting', what: 'place', has: 'is visiting a different place this summer' },
  { items: ['lifeguard', 'cashier', 'camp counsellor', 'farmhand', 'barista'], verb: 'works as a', not: 'does not work as a', must: 'must work as a', can: 'can work as a', what: 'summer job', has: 'has a different summer job' },
];

/** A clue: its text, a test on a full matching, and what it rules out directly (person, items still allowed). */
type LogicClue = { text: string; apply: (perm: number[]) => boolean; kind: 'neg' | 'or' | 'pos' | 'neither'; cut: (poss: Array<Set<number>>) => void };

function permutations(n: number): number[][] {
  if (n === 1) return [[0]];
  return permutations(n - 1).flatMap((p) => range(0, n - 1).map((i) => [...p.slice(0, i), n - 1, ...p.slice(i)]));
}

function logicPuzzle(rng: Rng, nPeople: 3 | 4): GenOutput {
  const perms = permutations(nPeople);
  for (;;) {
    const th = rng.pick(THEMES);
    const people = rng.sample(NAMES, nPeople);
    const items = rng.sample(th.items, nPeople);
    const truth = rng.pick(perms); // person i has item truth[i]
    const ask = rng.int(0, nPeople - 1); // item index asked about
    const owner = truth.indexOf(ask);
    const v = th.verb;
    const pool: LogicClue[] = [];
    for (let i = 0; i < nPeople; i++) {
      for (let j = 0; j < nPeople; j++) {
        if (truth[i] === j) {
          if (j !== ask) pool.push({ text: `${people[i]} ${v} ${items[j]}.`, apply: (p) => p[i] === j, kind: 'pos', cut: (ps) => ps[i].forEach((x) => x !== j && ps[i].delete(x)) });
          continue;
        }
        pool.push({ text: `${people[i]} ${th.not} ${items[j]}.`, apply: (p) => p[i] !== j, kind: 'neg', cut: (ps) => void ps[i].delete(j) });
        const k = truth[i];
        if (k !== ask || rng.chance(0.5)) pool.push({ text: `${people[i]} ${v} ${rng.chance(0.5) ? `${items[j]} or ${items[k]}` : `${items[k]} or ${items[j]}`}.`, apply: (p) => p[i] === j || p[i] === k, kind: 'or', cut: (ps) => ps[i].forEach((x) => x !== j && x !== k && ps[i].delete(x)) });
      }
    }
    for (let j = 0; j < nPeople; j++) {
      const notOwners = range(0, nPeople - 1).filter((i) => truth[i] !== j);
      if (notOwners.length >= 2) {
        const [x, y] = rng.sample(notOwners, 2);
        pool.push({ text: `The person who ${v} ${items[j]} is neither ${people[x]} nor ${people[y]}.`, apply: (p) => p[x] !== j && p[y] !== j, kind: 'neither', cut: (ps) => void (ps[x].delete(j), ps[y].delete(j)) });
      }
    }
    const clues: LogicClue[] = [];
    const fits = (cs: LogicClue[]) => perms.filter((p) => cs.every((c) => c.apply(p)));
    for (const c of rng.shuffle(pool.filter((x) => x.kind !== 'pos' || rng.chance(0.3)))) {
      if (fits(clues).length === 1) break;
      clues.push(c);
    }
    if (fits(clues).length !== 1) continue;
    for (let i = clues.length - 1; i >= 0; i--) {
      const without = clues.filter((_, j) => j !== i);
      if (fits(without).length === 1) clues.splice(i, 1);
    }
    if (clues.length < nPeople - 1 || clues.length > nPeople + 2) continue;
    // A student's solution: list each person's options, then use "only one option" and "only one person" reasoning.
    const poss = people.map(() => new Set(range(0, nPeople - 1)));
    for (const c of clues) c.cut(poss);
    const steps: string[] = [`Cross out what each clue rules out. The choices left are: ${people.map((nm, i) => `${nm}: ${orList([...poss[i]].map((j) => items[j]))}`).join('; ')}.`];
    let progress = true;
    let guard = 0;
    while (progress && poss.some((s) => s.size > 1) && guard++ < 20) {
      progress = false;
      const single = poss.findIndex((s, i) => s.size === 1 && poss.some((t, k) => k !== i && t.has([...s][0])));
      if (single >= 0) {
        const j = [...poss[single]][0];
        poss.forEach((t, k) => k !== single && t.delete(j));
        steps.push(`${people[single]} ${th.must} ${items[j]}, so no one else can.`);
        progress = true;
        continue;
      }
      for (let j = 0; j < nPeople && !progress; j++) {
        const holders = range(0, nPeople - 1).filter((i) => poss[i].has(j));
        if (holders.length === 1 && poss[holders[0]].size > 1) {
          poss[holders[0]] = new Set([j]);
          steps.push(`Only ${people[holders[0]]} ${th.can} ${items[j]}.`);
          progress = true;
        }
      }
    }
    if (poss.some((s) => s.size !== 1)) continue;
    if (steps.length < (nPeople === 3 ? 2 : 3)) continue;
    const answer = people[owner];
    return {
      prompt: `${andList(people)}: each ${th.has}, one of ${andList(items)}. Use the clues to match each person with ${/^[aeiou]/.test(th.what) ? 'an' : 'a'} ${th.what}.\n\n${clues.map((c) => `- ${c.text}`).join('\n')}\n\nWho ${v} ${items[ask]}?`,
      parts: [part(mc(rng, answer, people.filter((p) => p !== answer)))],
      hints: ['Make a grid with the people down the side and the choices across the top. Cross out every pairing a clue rules out.', 'When a person has only one choice left, or a choice has only one possible person, fill it in and cross it out everywhere else.'],
      solution: [...steps, `So ${people.map((nm, i) => `${nm} ${v} ${items[truth[i]]}`).join(', ')}.`, `${answer} ${v} ${items[ask]}.`],
    };
  }
}

// ---------------------------------------------------------------------------
// Puzzle 6 — Measuring with two jugs (shortest solution by breadth-first search)
// ---------------------------------------------------------------------------

function jugs(rng: Rng): GenOutput {
  for (;;) {
    const [A, B] = rng.pick([[3, 5], [4, 7], [3, 7], [5, 8], [4, 9], [5, 7], [3, 8], [2, 7], [5, 9], [7, 9]]);
    const t = rng.int(1, B - 1);
    if (t === A) continue;
    type S = [number, number];
    const seen = new Map<string, { prev: string | null; move: string }>();
    const start: S = [0, 0];
    seen.set('0,0', { prev: null, move: '' });
    let queue: S[] = [start];
    let found: string | null = null;
    while (queue.length && !found) {
      const next: S[] = [];
      for (const [x, y] of queue) {
        const moves: Array<[S, string]> = [
          [[A, y], `Fill the ${A} L jug`],
          [[x, B], `Fill the ${B} L jug`],
          [[0, y], `Empty the ${A} L jug`],
          [[x, 0], `Empty the ${B} L jug`],
          [[x - Math.min(x, B - y), y + Math.min(x, B - y)], `Pour the ${A} L jug into the ${B} L jug`],
          [[x + Math.min(y, A - x), y - Math.min(y, A - x)], `Pour the ${B} L jug into the ${A} L jug`],
        ];
        for (const [s, mv] of moves) {
          const k = s.join(',');
          if (seen.has(k)) continue;
          seen.set(k, { prev: `${x},${y}`, move: mv });
          if (s[0] === t || s[1] === t) {
            found = k;
            break;
          }
          next.push(s);
        }
        if (found) break;
      }
      queue = next;
    }
    if (!found) continue;
    const path: string[] = [];
    for (let k: string | null = found; k && seen.get(k)!.prev !== null; k = seen.get(k)!.prev) {
      const [x, y] = k.split(',').map(Number);
      path.unshift(`${seen.get(k)!.move}: (${x} L, ${y} L)`);
    }
    if (path.length < 3 || path.length > 8) continue;
    const name = rng.pick(NAMES);
    return {
      prompt: `${name} is at a campsite near ${rng.pick(PLACES)} with an empty ${A} L jug, an empty ${B} L jug and a water tap. The jugs have no markings. Each step is one of these: fill a jug from the tap, empty a jug onto the ground, or pour from one jug into the other until the first is empty or the second is full. What is the **fewest** number of steps needed to have exactly ${t} L in one of the jugs?`,
      parts: [numPart(path.length, { label: 'Steps:' })],
      hints: ['Keep track of the amounts as a pair: (water in the small jug, water in the large jug), starting at (0 L, 0 L).', 'Try both strategies: keep filling the small jug and pouring it into the large one, or keep filling the large jug and pouring it into the small one. Count the steps of the shorter one.'],
      solution: [
        `Write the state as (${A} L jug, ${B} L jug). One shortest sequence, found by checking every possible sequence of steps in order of length:`,
        ...path.map((p, i) => `Step ${i + 1}. ${p}`),
        `No sequence with fewer steps works, so the fewest number of steps is ${path.length}.`,
      ],
    };
  }
}

const puzzles = skill({
  id: 'm302-puzzles',
  name: 'Puzzles and games',
  description: 'Solve number riddles, magic squares, Sudoku and logic puzzles, and find winning strategies for take-away games.',
  outcomes: ['LR1'],
  lessonId: 'm302-8-1',
  gen: (rng, d) => {
    if (d === 1) return rng.pick([() => riddle(rng, 2), () => magicSquare(rng, 1), () => sudoku(rng, 1)])();
    if (d === 2) return rng.pick([() => riddle(rng, 3), () => magicSquare(rng, 2), () => sudoku(rng, 2), () => takeAway(rng, 2), () => logicPuzzle(rng, 3)])();
    return rng.pick([() => magicSquare(rng, 3), () => sudoku(rng, 3), () => takeAway(rng, 3), () => logicPuzzle(rng, 4), () => jugs(rng)])();
  },
});

// ---------------------------------------------------------------------------
// Lesson 8.2 — The mathematics research project
// ---------------------------------------------------------------------------

interface ResearchQ {
  good: string;
  broad: string;
  opinion: string;
  vague: string;
}

const RESEARCH_QS: ResearchQ[] = [
  { good: 'Is there a relationship between daily screen time and hours of sleep for Grade 12 students at my school?', broad: 'How does technology affect people?', opinion: 'Is too much screen time bad for you?', vague: 'Why do teenagers love their phones?' },
  { good: 'How has the number of transit riders per month in our city changed over the past ten years?', broad: 'What is public transportation?', opinion: 'Is taking the bus better than driving?', vague: 'Do people enjoy riding the bus?' },
  { good: 'How is the rainfall in a growing season related to canola yield per hectare on farms near our town?', broad: 'What is farming like in our region?', opinion: 'Is canola the best crop to grow?', vague: 'Why do farmers choose canola?' },
  { good: 'Do students at my school who work more than 15 hours a week have a lower average mark than students who work less?', broad: 'What are part-time jobs like?', opinion: 'Should high school students have jobs?', vague: 'How do jobs make students feel about school?' },
  { good: 'How much electricity could solar panels on our school roof produce in each month of the year?', broad: 'What is solar energy?', opinion: 'Is solar power better than wind power?', vague: 'Why do people like solar panels?' },
  { good: 'How has the total area burned by wildfires in our region each year changed over the past 20 years?', broad: 'What causes fires?', opinion: 'Are wildfires getting scarier?', vague: 'How do wildfires make communities feel?' },
  { good: 'Is there a relationship between the price of a used pickup truck and its distance driven, for trucks advertised in our town?', broad: 'How do cars work?', opinion: 'Are pickup trucks the best vehicles?', vague: 'Why do people in our town like trucks?' },
];

const SOURCES = [
  { text: 'surveys 60 students at their school about how much they sleep', primary: true },
  { text: 'times 30 cars passing through a school zone with a stopwatch and a measured distance', primary: true },
  { text: 'counts the birds at a feeder every morning for a month', primary: true },
  { text: 'measures the height of bean plants every day in a class experiment', primary: true },
  { text: 'records the price of a litre of milk at five stores in their town', primary: true },
  { text: 'downloads ten years of temperature records from a government weather website', primary: false },
  { text: 'uses population tables published by Statistics Canada', primary: false },
  { text: 'uses team statistics posted on a sports league website', primary: false },
  { text: 'quotes the results of a survey reported in a newspaper article', primary: false },
  { text: 'uses data tables from a published research study', primary: false },
];

const DATA_KINDS = [
  { text: 'the number of minutes each student spends travelling to school', quant: true },
  { text: 'the mass of each bag of flour leaving a mill', quant: true },
  { text: 'the number of goals scored by each team in a season', quant: true },
  { text: 'the temperature at noon each day in January', quant: true },
  { text: 'the price of each used bike for sale online', quant: true },
  { text: 'each student’s favourite type of music', quant: false },
  { text: 'the colour of each car in a parking lot', quant: false },
  { text: 'the province or territory where each person was born', quant: false },
  { text: 'whether each customer rated the service as poor, fair, good or excellent', quant: false },
  { text: 'the brand of phone each student owns', quant: false },
];

function researchD1(rng: Rng): GenOutput {
  const mode = rng.pick(['question', 'question', 'source', 'kind'] as const);
  if (mode === 'question') {
    const q = rng.pick(RESEARCH_QS);
    return {
      prompt: 'Which is the best research question for a mathematics research project?',
      parts: [part(mc(rng, q.good, [q.broad, q.opinion, q.vague]))],
      hints: ['A good research question is specific, and it can be answered by collecting and analyzing numerical data.', 'Rule out questions that are too broad, that ask for an opinion, or that cannot be measured.'],
      solution: [
        `"${q.broad}" is too broad: it has no clear focus and no data that would answer it.`,
        `"${q.opinion}" asks for an opinion, and "${q.vague}" is about feelings or reasons that are hard to measure.`,
        `"${q.good}" names a clear population and quantities that can be measured and compared.`,
        `The best research question is: "${q.good}"`,
      ],
    };
  }
  if (mode === 'source') {
    const wantPrimary = rng.chance(0.5);
    const right = rng.pick(SOURCES.filter((x) => x.primary === wantPrimary));
    const wrong = rng.sample(SOURCES.filter((x) => x.primary !== wantPrimary), 3);
    const names = rng.sample(NAMES, 4);
    const opts = [right, ...wrong].map((x, i) => `${names[i]} ${x.text}.`);
    return {
      prompt: `Which student is using **${wantPrimary ? 'primary' : 'secondary'}** data?`,
      parts: [part(mc(rng, opts[0], opts.slice(1)))],
      hints: ['Primary data are collected first-hand by the researcher. Secondary data were collected by someone else.', 'For each student, ask: did this student collect the data personally?'],
      solution: [
        'Primary data are collected by the researcher (surveys, counts, measurements, experiments). Secondary data come from someone else (websites, published tables, articles).',
        `${opts[0]} This is ${wantPrimary ? 'collected first-hand, so it is primary' : 'collected by someone else, so it is secondary'} data.`,
        `The other three students are using ${wantPrimary ? 'secondary' : 'primary'} data.`,
        `The answer is ${names[0]}.`,
      ],
    };
  }
  const wantQuant = rng.chance(0.5);
  const right = rng.pick(DATA_KINDS.filter((x) => x.quant === wantQuant));
  const wrong = rng.sample(DATA_KINDS.filter((x) => x.quant !== wantQuant), 3);
  return {
    prompt: `Which data set is **${wantQuant ? 'quantitative (numerical)' : 'qualitative (categorical)'}**?`,
    parts: [part(mc(rng, cap(right.text), wrong.map((x) => cap(x.text))))],
    hints: ['Quantitative data are numbers you can measure or count. Qualitative data are categories or descriptions.', 'Ask whether it makes sense to find an average of the data.'],
    solution: [
      `${cap(right.text)}: ${wantQuant ? 'these are measured or counted numbers, so the data are quantitative' : 'these are categories, not measurements, so the data are qualitative'}.`,
      `The other choices are ${wantQuant ? 'categories (qualitative)' : 'numbers (quantitative)'}.`,
      `The answer is: ${right.text}.`,
    ],
  };
}

const BIAS_TYPES = {
  sampling: 'Sampling bias: the sample does not represent the whole population.',
  nonresponse: 'Non-response bias: the people who answered may differ from those who did not.',
  response: 'Response bias: the wording or setting pushes people toward certain answers.',
  measurement: 'Measurement bias: the measuring tool or method gives values that are consistently off.',
};

function biasScenarios(rng: Rng): Array<{ text: string; type: keyof typeof BIAS_TYPES; why: string; fix: string; bad: [string, string] }> {
  const name = rng.pick(NAMES);
  const place = rng.pick(PLACES);
  return [
    { text: `To find out whether residents of ${place} support building a new arena, ${name} surveys fans as they leave a hockey game.`, type: 'sampling', why: 'hockey fans are more likely than other residents to want an arena', fix: 'choose residents at random from the whole town', bad: ['survey fans at two hockey games instead of one', 'ask the fans to answer anonymously'] },
    { text: `To estimate the typical height of Grade 12 students, ${name} measures only the players on the senior basketball team.`, type: 'sampling', why: 'basketball players tend to be taller than other students', fix: 'measure a random sample of all Grade 12 students', bad: ['measure each player twice and use the average', 'use a more accurate measuring tape'] },
    { text: 'A survey asks students: "Don\'t you agree that the cafeteria should serve healthier food?"', type: 'response', why: 'the leading question suggests the answer "yes"', fix: 'reword it as a neutral question, such as asking students to rate the cafeteria food from 1 to 5', bad: ['give the same question to every grade', 'ask the question to students as they leave the cafeteria'] },
    { text: `${name} asks classmates out loud, in front of the teacher, whether they have ever copied homework.`, type: 'response', why: 'people may not answer a sensitive question honestly when others can hear', fix: 'use an anonymous written survey', bad: ['ask the question to another class in the same way', 'ask the question twice to check the answers'] },
    { text: 'A town council mails 2000 surveys about a new bike lane, and only 150 are returned, mostly from people who strongly oppose it.', type: 'nonresponse', why: 'the few people who replied may feel much more strongly than the people who did not', fix: 'follow up with the people who did not reply, or survey a smaller random sample in person', bad: ['use only the 150 replies, since they came from a random mailing', 'mail the same survey to 2000 different homes'] },
    { text: 'A club emails a survey about meeting times to all 300 members; only 40 reply, and most of them already attend every meeting.', type: 'nonresponse', why: 'members who rarely attend did not reply, and they are the ones the meeting time might affect', fix: 'follow up with the members who did not reply', bad: ['ask the 40 who replied to answer again', 'count each reply from a regular attendee twice'] },
    { text: `For a science fair, ${name} weighs every sample on a kitchen scale that reads 50 g too heavy.`, type: 'measurement', why: 'every mass is recorded 50 g too high', fix: 'check the scale against a known mass and correct the readings (subtract 50 g)', bad: ['weigh more samples on the same scale', 'weigh each sample twice and use the average'] },
    { text: `${name} measures a hallway several times with a measuring tape that has the first 2 cm torn off, starting each measurement at the torn end.`, type: 'measurement', why: 'every length is recorded 2 cm too long', fix: 'subtract 2 cm from each measurement, or use an undamaged tape', bad: ['measure the hallway more times with the same tape', 'measure a longer hallway instead'] },
  ];
}

const GRAPHS = [
  { text: 'how the population of Lakeside changed each year from 2005 to 2025', best: 'Line graph', why: 'a line graph shows change over time' },
  { text: 'the percent of a family’s monthly budget spent on housing, food, transportation and other costs', best: 'Circle graph', why: 'a circle graph shows how a whole is divided into parts' },
  { text: 'the relationship between hours studied and test marks for 40 students', best: 'Scatter plot', why: 'a scatter plot shows the relationship between two numerical variables' },
  { text: 'the number of students who chose each of five lunch options', best: 'Bar graph', why: 'a bar graph compares counts for separate categories' },
  { text: 'how the heights of 120 Grade 12 students are distributed in 5 cm intervals', best: 'Histogram', why: 'a histogram shows how one numerical variable is distributed across intervals' },
  { text: 'the relationship between the age of a used car and its price', best: 'Scatter plot', why: 'a scatter plot shows the relationship between two numerical variables' },
  { text: 'the monthly rainfall in Ashford over the past two years', best: 'Line graph', why: 'a line graph shows change over time' },
];

function researchD2(rng: Rng): GenOutput {
  const mode = rng.pick(['bias', 'bias', 'fix', 'graph', 'sample'] as const);
  if (mode === 'bias' || mode === 'fix') {
    const sc = rng.pick(biasScenarios(rng));
    if (mode === 'bias') {
      const correct = BIAS_TYPES[sc.type];
      return {
        prompt: `${sc.text}\n\nWhich kind of bias is the biggest problem here?`,
        parts: [part(mc(rng, correct, Object.values(BIAS_TYPES).filter((t) => t !== correct)))],
        hints: ['Bias is a problem in how data are collected that pushes the results in one direction.', 'Ask: who was asked (sampling), who answered (non-response), how they were asked (response), or how it was measured (measurement)?'],
        solution: [`The problem: ${sc.why}.`, correct, `A better plan: ${sc.fix}.`],
      };
    }
    return {
      prompt: `${sc.text}\n\nWhich change would best reduce the bias?`,
      parts: [part(mc(rng, `${cap(sc.fix)}.`, [...sc.bad.map((b) => `${cap(b)}.`), 'Collect the data the same way, but from more people.']))],
      hints: ['First decide what is causing the bias.', 'A good fix removes the cause. Collecting more data the same way repeats the same bias.'],
      solution: [`The problem: ${sc.why}.`, 'Asking more people in the same way would not remove the bias.', `The best change is to ${sc.fix}.`],
    };
  }
  if (mode === 'graph') {
    const g = rng.pick(GRAPHS);
    const all = ['Line graph', 'Circle graph', 'Scatter plot', 'Bar graph', 'Histogram'];
    return {
      prompt: `A student wants to display ${g.text}. Which type of graph is best?`,
      parts: [part(mc(rng, g.best, rng.shuffle(all.filter((x) => x !== g.best)).slice(0, 3)))],
      hints: ['Ask what the graph needs to show: change over time, parts of a whole, a relationship, a comparison of categories, or a distribution.', 'Line: change over time. Circle: parts of a whole. Scatter: relationship between two variables. Bar: categories. Histogram: distribution of one numerical variable.'],
      solution: [`The data are ${g.text}.`, `${cap(g.why)}.`, `The best choice is a ${g.best.toLowerCase()}.`],
    };
  }
  const place = rng.pick(PLACES);
  const n = rng.pick([40, 50, 60, 80, 100]);
  const correct = `Use a random number generator to choose ${n} students from the school's full list of students.`;
  return {
    prompt: `A student council in ${place} wants to know what all ${rng.int(6, 15) * 100} students at the school think about a new schedule. Which sampling method is most likely to give a representative sample?`,
    parts: [part(mc(rng, correct, [`Ask the first ${n} students who arrive at school one morning.`, `Post an online poll and use the first ${n} responses.`, `Ask ${n} students who are in the library at lunch.`]))],
    hints: ['A representative sample looks like the whole population.', 'In a random sample, every member of the population has the same chance of being chosen.'],
    solution: [
      'Early arrivals, library users and volunteers who answer online polls are not typical of all students, so those samples are likely to be biased.',
      'A random sample from the full list gives every student the same chance of being chosen.',
      `The best method: ${correct}`,
    ],
  };
}

const LURKING = [
  { a: 'the number of ice rinks in a town', b: 'the number of pharmacies in the town', c: 'the population of the town' },
  { a: 'ice cream sales in a month', b: 'the number of sunburns treated in the month', c: 'the temperature and hours of sunshine' },
  { a: 'the number of firefighters sent to a fire', b: 'the amount of damage the fire causes', c: 'the size of the fire' },
  { a: 'shoe size of elementary students', b: 'reading level of the students', c: 'the age of the students' },
  { a: 'the number of hockey arenas in a city', b: 'the number of traffic accidents in the city', c: 'the population of the city' },
];

function researchD3(rng: Rng): GenOutput {
  const mode = rng.pick(['cause', 'outlier', 'margin', 'axis', 'claim'] as const);
  if (mode === 'cause') {
    const L = rng.pick(LURKING);
    const correct = `${cap(L.a)} and ${L.b} are related, but one does not cause the other: both probably depend on ${L.c}.`;
    return {
      prompt: `A study finds a strong positive correlation between ${L.a} and ${L.b}. Which conclusion is best supported?`,
      parts: [part(mc(rng, correct, [`Increasing ${L.a} causes ${L.b} to increase.`, `Increasing ${L.b} causes ${L.a} to increase.`, `There is no relationship between ${L.a} and ${L.b}.`]))],
      hints: ['Correlation means two variables change together. It does not prove that one causes the other.', 'Look for a third variable that could make both go up together.'],
      solution: ['A strong positive correlation means the two variables tend to rise together.', `But a third variable, ${L.c}, can raise both of them.`, `So the best conclusion is: ${correct}`],
    };
  }
  if (mode === 'outlier') {
    for (;;) {
      const base = rng.int(38, 55);
      const vals = rng.shuffle([...rng.sample(range(base, base + 14), 6), rng.int(180, 320)]);
      const sorted = [...vals].sort((x, y) => x - y);
      const mean = vals.reduce((s, x) => s + x, 0) / vals.length;
      const median = sorted[3];
      if (Math.abs(mean * 10 - Math.round(mean * 10)) > 1e-9) continue;
      const what = rng.pick([
        { what: 'annual salaries (in thousands of dollars) of the seven employees at a small business in', unit: 'thousand dollars' },
        { what: 'selling prices (in thousands of dollars) of seven used trucks at a dealership in', unit: 'thousand dollars' },
      ]);
      const place = rng.pick(PLACES);
      const correct = `The median, ${median}, because the outlier pulls the mean up to ${fmtNum(mean)}.`;
      return {
        prompt: `A student's project uses these ${what.what} ${place}:\n\n${vals.join(', ')}\n\nWhich value best represents a typical value in the data?`,
        parts: [part(mc(rng, correct, [`The mean, ${fmtNum(mean)}, because it uses every value.`, `The range, ${sorted[6] - sorted[0]}, because it shows how spread out the data are.`, `The largest value, ${sorted[6]}, because it is the most important one.`]))],
        hints: ['Look for an outlier: a value far from the others.', 'An outlier pulls the mean toward it, but it barely changes the median.'],
        solution: [`In order: ${sorted.join(', ')}. The value ${sorted[6]} is an outlier.`, `Mean: $\\frac{${vals.reduce((s, x) => s + x, 0)}}{7} = ${fmtNum(mean)}$. Median (the middle value): ${median}.`, `Six of the seven values are below the mean, so it is not typical. ${correct}`],
      };
    }
  }
  if (mode === 'margin') {
    const p = rng.int(46, 62);
    const m = rng.pick([2, 3, 4, 5]);
    const topic = rng.pick(['a proposal to build a new library', 'a plan to change school start times', 'a new recycling program', 'a bylaw to add more bike lanes']);
    const place = rng.pick(PLACES);
    const correct = `The percent of all residents who support it is likely between ${p - m}% and ${p + m}%.`;
    return {
      prompt: `A poll of residents of ${place} reports that ${p}% support ${topic}, with a margin of error of ${m} percentage points, 19 times out of 20. Which statement is the best interpretation?`,
      parts: [part(mc(rng, correct, [`Exactly ${p}% of all residents support it.`, `The poll is wrong 19 times out of 20.`, `Between ${p - m}% and ${p + m}% of the people polled support it.`]))],
      hints: ['The poll asked a sample; the margin of error describes how far the whole population could be from the sample result.', `Add and subtract ${m} percentage points from ${p}%.`],
      solution: [
        `The confidence interval is ${p}% $\\pm$ ${m}%, which is ${p - m}% to ${p + m}%.`,
        '"19 times out of 20" is the confidence level: this method captures the true population percent about 95% of the time.',
        `${correct}${p - m <= 50 ? ' Because the interval includes 50% or less, the poll does not show that a majority supports it.' : ''}`,
      ],
    };
  }
  if (mode === 'axis') {
    for (;;) {
      const base = rng.pick([50, 80, 90, 100, 200]);
      const a = base + rng.int(1, 5);
      const k = rng.int(2, 4);
      const b = base + k * (a - base);
      const pct = ((b - a) / a) * 100;
      if (Math.abs(pct * 10 - Math.round(pct * 10)) < 1e-9 && pct === Math.round(pct)) continue;
      const shown = (Math.round(pct * 10) / 10).toFixed(1);
      const thing = rng.pick(['monthly sales (in thousands of units)', 'the number of members', 'average daily visitors']);
      const correct = `About ${shown}%. The vertical axis starts at ${base}, which makes the change look much bigger than it is.`;
      return {
        prompt: `A company's bar graph shows ${thing} rising from ${a} last year to ${b} this year. The vertical axis starts at ${base}, so the second bar looks ${k} times as tall as the first. By about what percent did the value actually increase?`,
        parts: [part(mc(rng, correct, [`About ${(k - 1) * 100}%, because the second bar is ${k} times as tall.`, `About ${k * 100}%, because the second bar is ${k} times as tall.`, `About ${b - a}%, because the value went up by ${b - a}.`]))],
        hints: ['Use the actual values, not the heights of the bars.', 'Percent increase = (new − old) ÷ old × 100.'],
        solution: [`Percent increase $= \\frac{${b} - ${a}}{${a}} \\times 100 \\approx ${shown}\\%$`, `The bars compare ${b} − ${base} = ${b - base} with ${a} − ${base} = ${a - base}, which is why one looks ${k} times as tall.`, correct],
      };
    }
  }
  const n = rng.int(12, 30);
  const claims = [
    { claim: `most people in ${rng.pick(PLACES)} prefer winter to summer`, sample: `${n} members of a ski club` },
    { claim: `most Canadian teenagers play video games every day`, sample: `${n} people at a video game store` },
    { claim: `most drivers in ${rng.pick(PLACES)} want lower parking fees`, sample: `${n} people parking downtown on one Saturday` },
    { claim: `most students at the school want a longer lunch break`, sample: `${n} friends in the student's math class` },
  ];
  const c = rng.pick(claims);
  const correct = `Not valid: the sample is small and is not representative of the population in the claim.`;
  return {
    prompt: `A student's project claims that ${c.claim}, based on a survey of ${c.sample}. Which is the best assessment of the claim?`,
    parts: [part(mc(rng, correct, ['Valid: the survey asked real people, so the conclusion is reliable.', 'Valid, as long as more than half of the people surveyed agreed.', 'Not valid: surveys can never be used to make claims about a population.']))],
    hints: ['Compare the people surveyed with the whole group the claim is about.', 'A sample must be large enough and chosen fairly (ideally at random) from the population.'],
    solution: [`The claim is about a large population, but only ${c.sample} were asked.`, 'This small, self-selected group is likely to differ from the population, so the sample is biased.', `${correct} Surveys can support claims when the sample is random and large enough.`],
  };
}

/** A number without float noise (up to one decimal place). */
const fmtNum = (x: number) => String(Math.round(x * 10) / 10);

const research = skill({
  id: 'm302-research-project',
  name: 'Planning a research project',
  description: 'Choose a good research question and data sources, recognize bias, choose suitable displays, and evaluate claims based on data.',
  outcomes: ['RP1'],
  lessonId: 'm302-8-2',
  format: 'mc',
  gen: (rng, d) => (d === 1 ? researchD1(rng) : d === 2 ? researchD2(rng) : researchD3(rng)),
});

export const PUZZLES_SKILLS: SkillDef[] = [puzzles, research];
