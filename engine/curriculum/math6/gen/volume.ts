/** Math 6 Unit 10 — Volume (M2): cubic units, cubic centimetres and cubic metres, and right rectangular prisms. */
import { mc, numPart, skill } from '../../helpers.ts';
import { fmt } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { CubesFigure, SkillDef, SolidFigure } from '../../../types.ts';
import { NAMES } from './congruence.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

type HMap = number[][];

const clean = (x: number) => Math.round(x * 1e6) / 1e6;
/** A number inside maths, with a thin space in numbers of 5 or more digits. */
const n = (x: number) => {
  const s = fmt(clean(x));
  const [i, f] = s.split('.');
  return (i.length > 4 ? i.replace(/\B(?=(\d{3})+(?!\d))/g, '\\,') : i) + (f ? `.${f}` : '');
};
const ms = (x: number, u: string) => `${n(x)}\\ \\text{${u}}`;
const cu = (x: number, u: string) => `${n(x)}\\ \\text{${u}}^3`;
const lab = (x: number, u: string) => `${fmt(clean(x))} ${u}`;
const volPart = (v: number, u: string, label = 'Volume =') => numPart(clean(v), { suffix: `${u}³`, label });

const cubesFig = (h: HMap, front = false): CubesFigure => ({ type: 'cubes', heights: h.map((r) => [...r]), ...(front && { showFront: true }) });
const prismHeights = (rows: number, cols: number, layers: number): HMap => Array.from({ length: rows }, () => Array.from({ length: cols }, () => layers));
const total = (h: HMap) => h.flat().reduce((s, v) => s + v, 0);

/**
 * How many small triangles of each cube still show in the isometric drawing (front right view).
 * Follows the painter's order of the cubes figure: farther cubes first.
 */
function cubeVisibility(h: HMap): Array<{ x: number; y: number; z: number; shown: number }> {
  const cubes: Array<[number, number, number]> = [];
  h.forEach((r, y) => r.forEach((ht, x) => {
    for (let z = 0; z < ht; z++) cubes.push([x, y, z]);
  }));
  cubes.sort((a, b) => a[0] + a[1] + a[2] - (b[0] + b[1] + b[2]) || a[2] - b[2]);
  const owner = new Map<string, number>();
  cubes.forEach(([x, y, z], i) => {
    const a = x - y;
    const c = x + y - 2 * z;
    for (const k of [
      [a, c - 2, -1],
      [a, c - 2, 1],
      [a - 1, c - 1, 1],
      [a, c, -1],
      [a + 1, c - 1, -1],
      [a, c, 1],
    ])
      owner.set(k.join(','), i);
  });
  const count = new Array<number>(cubes.length).fill(0);
  for (const i of owner.values()) count[i]++;
  return cubes.map(([x, y, z], i) => ({ x, y, z, shown: count[i] }));
}

/** The top cube of every stack shows in the picture, so each stack can be found. */
const topsVisible = (h: HMap) => cubeVisibility(h).every((c) => c.z !== h[c.y][c.x] - 1 || c.shown >= 1);

/** A back row of stacks behind a front row one cube high. Every stack stands on the table. */
function stepStacks(rng: Rng): HMap {
  for (;;) {
    const cols = rng.int(2, 4);
    const back = Array.from({ length: cols }, () => rng.int(1, 4));
    if (new Set(back).size < 2) continue;
    const h: HMap = [back, Array.from({ length: cols }, () => 1)];
    if (topsVisible(h)) return h;
  }
}

const SMALL_THINGS = [
  { thing: 'a juice box', u: 'cm' },
  { thing: 'a pencil case', u: 'cm' },
  { thing: 'a shoebox', u: 'cm' },
  { thing: 'a number cube (die)', u: 'cm' },
  { thing: 'an eraser', u: 'cm' },
  { thing: 'a cereal box', u: 'cm' },
  { thing: 'a lunch box', u: 'cm' },
  { thing: 'a classroom', u: 'm' },
  { thing: 'a shipping container', u: 'm' },
  { thing: 'a school gym', u: 'm' },
  { thing: 'a moving truck', u: 'm' },
  { thing: 'a backyard swimming pool', u: 'm' },
  { thing: 'a garage', u: 'm' },
];

// ---------------------------------------------------------------------------
// 10.1 Volume and cubic units
// ---------------------------------------------------------------------------

const volumeUnits = skill({
  id: 'm6-volume-units',
  name: 'Volume and cubic units',
  description: 'Choose cubic centimetres or cubic metres, and find the volume of a model built from cubes by counting or by layers × rows × columns.',
  outcomes: ['M2'],
  lessonId: 'm6-10-1',
  gen(rng, d) {
    const who = rng.pick(NAMES);
    const mode =
      d === 1
        ? rng.weighted([['count', 3], ['unit', 2]] as const)
        : d === 2
          ? rng.weighted([['layers', 3], ['stacks', 2]] as const)
          : rng.weighted([['rearrange', 2], ['complete', 2], ['sugar', 2]] as const);

    if (mode === 'count') {
      const full = rng.chance(0.5);
      const h: HMap = full ? prismHeights(rng.int(1, 2), rng.int(2, 4), rng.int(2, 3)) : [Array.from({ length: rng.int(3, 5) }, () => rng.int(1, 4))];
      if (!full && new Set(h[0]).size < 2) h[0][0] = h[0][0] === 4 ? 3 : h[0][0] + 1;
      const t = total(h);
      const unit = rng.pick([
        { say: 'Each cube is $1\\ \\text{cm}^3$.', suffix: 'cm³', end: (v: number) => `$${v}\\ \\text{cm}^3$`, q: 'What is the volume of the model?' },
        { say: 'Each cube is one cubic unit.', suffix: 'cubic units', end: (v: number) => `$${v}$ cubic units`, q: 'What is the volume of the model in cubic units?' },
      ]);
      const ctx = rng.pick([`${who} built this model with centimetre cubes.`, `${who} stacked linking cubes to make this model.`, `${who} built a tower model from small wooden cubes.`]);
      return {
        prompt: `${ctx} ${unit.say} ${full ? 'The model is a full rectangular prism, with no hidden gaps.' : 'Every cube can be seen in the picture.'} ${unit.q}`,
        figure: cubesFig(h),
        parts: [numPart(t, { suffix: unit.suffix, label: 'Volume =' })],
        hints: [
          'Volume is the amount of space an object takes up. Count the cubes.',
          full ? 'Count the cubes in the top layer, then count the layers.' : 'Count the cubes in each stack, then add.',
        ],
        solution: full
          ? [
              `Each layer has $${h.length} \\times ${h[0].length} = ${h.length * h[0].length}$ cube${h.length * h[0].length === 1 ? '' : 's'}.`,
              `There ${h[0][0] === 1 ? 'is $1$ layer' : `are $${h[0][0]}$ layers`}: $${h.length * h[0].length} \\times ${h[0][0]} = ${t}$.`,
              `The volume is ${unit.end(t)}.`,
            ]
          : [`The stacks have ${h[0].map((v) => `$${v}$`).join(', ')} cubes.`, `$${h[0].join(' + ')} = ${t}$`, `The volume is ${unit.end(t)}.`],
      };
    }

    if (mode === 'unit') {
      const it = rng.pick(SMALL_THINGS);
      const correct = it.u === 'cm' ? 'cubic centimetres ($\\text{cm}^3$)' : 'cubic metres ($\\text{m}^3$)';
      const other = it.u === 'cm' ? 'cubic metres ($\\text{m}^3$)' : 'cubic centimetres ($\\text{cm}^3$)';
      const area = it.u === 'cm' ? 'square centimetres ($\\text{cm}^2$)' : 'square metres ($\\text{m}^2$)';
      const len = it.u === 'cm' ? 'centimetres ($\\text{cm}$)' : 'metres ($\\text{m}$)';
      return {
        prompt: `${who} wants to measure the **volume** of ${it.thing}. Which unit is the best choice?`,
        parts: [{ answer: mc(rng, correct, [other, area, len]) }],
        hints: ['Volume is measured in cubic units: cubes that fill the space.', 'A cubic centimetre is about the size of a sugar cube. A cubic metre is a cube $1\\ \\text{m}$ long, $1\\ \\text{m}$ wide and $1\\ \\text{m}$ high: big enough for a few students to sit inside.'],
        solution: [
          'Volume needs a cubic unit, so square units (for area) and plain centimetres or metres (for length) do not work.',
          it.u === 'cm'
            ? `${it.thing.charAt(0).toUpperCase() + it.thing.slice(1)} is small. A cubic metre would be far too big, so use cubic centimetres.`
            : `${it.thing.charAt(0).toUpperCase() + it.thing.slice(1)} is large. It would take a huge number of cubic centimetres, so use cubic metres.`,
          `The best unit is ${correct}.`,
        ],
        answerDisplay: correct,
      };
    }

    if (mode === 'layers') {
      const rows = rng.int(2, 4);
      const cols = rng.int(2, 5);
      const layers = rng.int(2, 4);
      const per = rows * cols;
      const V = per * layers;
      return {
        prompt: `${who} built a rectangular prism from centimetre cubes. Each cube is $1\\ \\text{cm}^3$. There are no hidden gaps. Find the number of cubes in one layer, the number of layers, and the volume.`,
        figure: cubesFig(prismHeights(rows, cols, layers), true),
        parts: [
          numPart(per, { label: 'Cubes in one layer =' }),
          numPart(layers, { label: 'Number of layers =' }),
          numPart(V, { label: 'Volume =', suffix: 'cm³' }),
        ],
        hints: ['Look at the top layer. Count the rows from front to back and the cubes in each row.', 'Volume = (cubes in one layer) × (number of layers).'],
        solution: [
          `The top layer has $${rows}$ row${rows === 1 ? '' : 's'} of $${cols}$ cubes: $${rows} \\times ${cols} = ${per}$ cubes in each layer.`,
          `The prism is $${layers}$ cubes tall, so there are $${layers}$ layers.`,
          `$${per} \\times ${layers} = ${V}$`,
          `The volume is $${V}\\ \\text{cm}^3$.`,
        ],
      };
    }

    if (mode === 'stacks') {
      const h = stepStacks(rng);
      const t = total(h);
      const cols = h[0].length;
      const backSum = h[0].reduce((s, v) => s + v, 0);
      return {
        prompt: `${who} stacked cubes on a table to make this model: a back row of stacks and a front row that is one cube high. Each cube is $1\\ \\text{cm}^3$. Every stack goes all the way down to the table, so some cubes in the back row are hidden behind the front row. What is the volume of the model?`,
        figure: cubesFig(h, true),
        parts: [numPart(t, { label: 'Volume =', suffix: 'cm³' })],
        hints: [
          'Work one stack at a time. Each back stack reaches down to the table, so it has one cube hidden behind the front row.',
          'Count the cubes in each back stack (including the hidden bottom cube), then add the front row.',
        ],
        solution: [
          `Front row: $${cols}$ stacks of $1$ cube, so $${cols}$ cubes.`,
          `Back row: the stacks have ${h[0].map((v) => `$${v}$`).join(', ')} cubes (each counts the hidden bottom cube): $${h[0].join(' + ')} = ${backSum}$.`,
          `$${backSum} + ${cols} = ${t}$`,
          `The volume is $${t}\\ \\text{cm}^3$.`,
        ],
      };
    }

    if (mode === 'rearrange') {
      for (;;) {
        const l = rng.int(2, 6);
        const w = rng.int(2, 5);
        const h = rng.int(2, 4);
        const V = l * w * h;
        const l2 = rng.int(2, 8);
        const w2 = rng.int(2, 6);
        if (V % (l2 * w2) !== 0) continue;
        const h2 = V / (l2 * w2);
        if ((l2 === l && w2 === w) || (l2 === w && w2 === l) || h2 < 1 || h2 > 12) continue;
        return {
          prompt: `${who} builds a rectangular prism from centimetre cubes. It is $${l}$ cubes long, $${w}$ cubes wide and $${h}$ cubes high. Then ${who} takes it apart and uses **all** the cubes to build a new rectangular prism that is $${l2}$ cubes long and $${w2}$ cubes wide. How many cubes high is the new prism?`,
          figure: cubesFig(prismHeights(w, l, h)),
          parts: [numPart(h2, { label: 'Height =', suffix: 'cubes' })],
          hints: ['Volume stays the same when you take the cubes apart and rearrange them. First find the volume of the first prism.', 'Find how many cubes are in one layer of the new prism. How many layers does it take to use all the cubes?'],
          solution: [
            `First prism: $${l} \\times ${w} \\times ${h} = ${V}$ cubes, so its volume is $${V}\\ \\text{cm}^3$.`,
            `The new prism has the same volume. One layer has $${l2} \\times ${w2} = ${l2 * w2}$ cubes.`,
            `$${V} \\div ${l2 * w2} = ${h2}$`,
            `The new prism is $${h2}$ cubes high.`,
          ],
        };
      }
    }

    if (mode === 'complete') {
      for (;;) {
        const rows = rng.int(2, 3);
        const cols = rng.int(2, 4);
        const full = rng.int(1, 2);
        const target = full + 1;
        const h = prismHeights(rows, cols, full);
        let placed = 0;
        for (let r = 0; r < rows; r++)
          for (let c = 0; c < cols; c++)
            if (rng.chance(0.45)) {
              h[r][c] = target;
              placed++;
            }
        const per = rows * cols;
        if (placed === 0 || placed === per) continue;
        const need = per * target - total(h);
        return {
          prompt: `${who} is building a rectangular prism from centimetre cubes. The bottom ${full === 1 ? 'layer is' : `$${full}$ layers are`} full, with no hidden gaps, and some cubes are on the top layer. How many more cubes does ${who} need to make a full rectangular prism $${target}$ layers high? What will its volume be?`,
          figure: cubesFig(h, true),
          parts: [numPart(need, { label: 'More cubes =' }), numPart(per * target, { label: 'Volume =', suffix: 'cm³' })],
          hints: [`Each full layer has (rows) × (cubes in each row) cubes. Find how many cubes the full prism needs.`, 'Count the cubes that are already there, then subtract.'],
          solution: [
            `One layer has $${rows} \\times ${cols} = ${per}$ cubes. The full prism needs $${per} \\times ${target} = ${per * target}$ cubes.`,
            `Already there: $${per} \\times ${full} = ${per * full}$ in the full layer${full === 1 ? '' : 's'}, plus $${placed}$ on top, so $${per * full + placed}$ cubes.`,
            `$${per * target} - ${per * full + placed} = ${need}$`,
            `${who} needs $${need}$ more cubes. The finished prism has a volume of $${per * target}\\ \\text{cm}^3$.`,
          ],
        };
      }
    }

    // Non-standard units: sugar cubes, dice or blocks in a box.
    const rows = rng.int(3, 9);
    const cols = rng.int(4, 12);
    const layers = rng.int(2, 6);
    const per = rows * cols;
    const V = per * layers;
    const item = rng.pick([
      { what: 'sugar cubes', box: 'a box', the: 'the box' },
      { what: 'number cubes', box: 'a game box', the: 'the game box' },
      { what: 'wooden blocks', box: 'a toy chest', the: 'the toy chest' },
      { what: 'bouillon cubes', box: 'a carton', the: 'the carton' },
    ]);
    return {
      prompt: `${who} packs ${item.what} into ${item.box} with no gaps, and the ${item.what} fill it exactly. Each layer has $${rows}$ rows of $${cols}$ ${item.what}, and there are $${layers}$ layers. What is the volume of ${item.the}, measured in ${item.what}?`,
      parts: [numPart(V, { label: 'Volume =', suffix: item.what })],
      hints: ['First find how many fit in one layer: rows × (number in each row).', 'Then multiply by the number of layers.'],
      solution: [
        `One layer: $${rows} \\times ${cols} = ${per}$ ${item.what}.`,
        `$${layers}$ layers: $${per} \\times ${layers} = ${V}$`,
        `The volume is $${V}$ ${item.what}.`,
      ],
    };
  },
});

// ---------------------------------------------------------------------------
// 10.2 Volume of right rectangular prisms
// ---------------------------------------------------------------------------

const prismFig = (l: string, w: string, h: string): SolidFigure => ({ type: 'solid', shape: 'rectPrism', labels: { l, w, h } });

const PRISM_CTX: Array<[string, (w: string) => string]> = [
  ['cm', (w) => `${w} has a box of crayons shaped like a rectangular prism.`],
  ['cm', () => 'A tissue box is a right rectangular prism.'],
  ['cm', (w) => `${w} is building a wooden jewellery box shaped like a rectangular prism.`],
  ['m', () => 'A storage shed is shaped like a right rectangular prism.'],
  ['m', (w) => `${w}'s family rents a storage unit shaped like a rectangular prism.`],
  ['m', () => 'The inside of a moving truck is a rectangular prism.'],
];

const volumePrism = skill({
  id: 'm6-volume-prism',
  name: 'Volume of a rectangular prism',
  description: 'Find the volume of a right rectangular prism with V = l × w × h (or base area × height), find a missing dimension, and solve volume problems.',
  outcomes: ['M2'],
  lessonId: 'm6-10-2',
  gen(rng, d) {
    const who = rng.pick(NAMES);
    const [u, mk] = rng.pick(PRISM_CTX);
    const ctx = mk(who);
    const mode =
      d === 1 ? 'volume' : d === 2 ? rng.weighted([['volume-big', 1], ['base-area', 1], ['missing', 2]] as const) : rng.weighted([['problem', 3], ['compare', 2]] as const);

    if (mode === 'volume' || mode === 'volume-big') {
      const big = mode === 'volume-big';
      const l = big ? rng.int(8, 15) : rng.int(3, 9);
      const w = big ? rng.int(4, 10) : rng.int(2, 6);
      const h = u === 'm' ? rng.int(2, 4) : big ? rng.pick([2, 3, 4, 5, 10]) : rng.int(2, 6);
      const V = l * w * h;
      return {
        prompt: `${ctx} Find its volume.`,
        figure: prismFig(lab(l, u), lab(w, u), lab(h, u)),
        parts: [volPart(V, u)],
        hints: ['Volume of a right rectangular prism = length × width × height.', 'Multiply two of the numbers first (length × width gives the area of the base), then multiply by the third.'],
        solution: [
          `Area of the base: $${l} \\times ${w} = ${l * w}$, so $${l * w}\\ \\text{${u}}^2$.`,
          `$V = (l \\times w) \\times h = ${l * w} \\times ${h} = ${n(V)}$`,
          `The volume is $${cu(V, u)}$.`,
        ],
      };
    }

    if (mode === 'base-area') {
      const l = rng.int(3, 9);
      const w = rng.int(2, 8);
      const B = l * w;
      const h = u === 'm' ? rng.int(2, 4) : rng.int(3, 12);
      const V = B * h;
      return {
        prompt: `${ctx} The area of its base is $${B}\\ \\text{${u}}^2$ and its height is $${ms(h, u)}$. Find its volume.`,
        figure: prismFig('', '', lab(h, u)),
        parts: [volPart(V, u)],
        hints: ['A prism is made of layers the same size as its base. Each unit of height adds one more layer.', 'Volume = area of the base × height.'],
        solution: [
          `Each layer one ${u === 'cm' ? 'centimetre' : 'metre'} thick holds $${B}$ cubic ${u === 'cm' ? 'centimetres' : 'metres'}, and there are $${h}$ layers.`,
          `$V = ${B} \\times ${h} = ${V}$`,
          `The volume is $${cu(V, u)}$.`,
        ],
      };
    }

    if (mode === 'missing') {
      const l = rng.int(3, 10);
      const w = rng.int(2, 8);
      const h = u === 'm' ? rng.int(2, 4) : rng.int(2, 9);
      const V = l * w * h;
      const which = rng.pick(['l', 'w', 'h'] as const);
      const known = which === 'l' ? [w, h] : which === 'w' ? [l, h] : [l, w];
      const ans = which === 'l' ? l : which === 'w' ? w : h;
      const name = which === 'l' ? 'length' : which === 'w' ? 'width' : 'height';
      return {
        prompt: `${ctx} Its volume is $${cu(V, u)}$. What is its ${name}?`,
        figure: prismFig(which === 'l' ? '?' : lab(l, u), which === 'w' ? '?' : lab(w, u), which === 'h' ? '?' : lab(h, u)),
        parts: [numPart(ans, { label: `${name.charAt(0).toUpperCase() + name.slice(1)} =`, suffix: u })],
        hints: ['Volume = length × width × height. Multiply the two dimensions you know.', `Then divide the volume by that product to find the ${name}.`],
        solution: [
          `The two known dimensions: $${known[0]} \\times ${known[1]} = ${known[0] * known[1]}$.`,
          `$${V} \\div ${known[0] * known[1]} = ${ans}$`,
          `Check: $${l} \\times ${w} \\times ${h} = ${V}$ ✓`,
          `The ${name} is $${ms(ans, u)}$.`,
        ],
      };
    }

    if (mode === 'problem') {
      const kind = rng.pick(['sandbox', 'aquarium', 'container'] as const);
      if (kind === 'aquarium') {
        const l = rng.pick([40, 50, 60, 80]);
        const w = rng.pick([20, 30]);
        const h = rng.pick([20, 30, 40]);
        const V = l * w * h;
        return {
          prompt: `${who}'s class has an aquarium shaped like a right rectangular prism. It is $${l}\\ \\text{cm}$ long, $${w}\\ \\text{cm}$ wide and $${h}\\ \\text{cm}$ high. What is the volume of the aquarium in cubic centimetres?`,
          figure: prismFig(lab(l, 'cm'), lab(w, 'cm'), lab(h, 'cm')),
          parts: [volPart(V, 'cm')],
          hints: ['Volume = length × width × height.', `Multiply the digits first, then put back the zeros: for example, $${l} \\times ${w} = ${l / 10} \\times ${w / 10} \\times 100$.`],
          solution: [
            `$${l} \\times ${w} = ${l * w}$ (the base is $${n(l * w)}\\ \\text{cm}^2$).`,
            `$${n(l * w)} \\times ${h} = ${n(V)}$`,
            `The volume of the aquarium is $${cu(V, 'cm')}$.`,
          ],
        };
      }
      if (kind === 'container') {
        const l = rng.pick([6, 9, 12]);
        const w = rng.int(2, 3);
        const h = rng.int(2, 3);
        const V = l * w * h;
        const box = rng.pick([1, 2]);
        const per = box === 1 ? 1 : 2;
        return {
          prompt: `A shipping container is $${l}\\ \\text{m}$ long, $${w}\\ \\text{m}$ wide and $${h}\\ \\text{m}$ high. ${per === 1 ? 'Crates that each take up $1\\ \\text{m}^3$ are packed inside with no gaps. How many crates fit?' : `It is packed with crates that each take up $2\\ \\text{m}^3$, with no gaps. How many crates fit?`}`,
          figure: prismFig(lab(l, 'm'), lab(w, 'm'), lab(h, 'm')),
          parts: [numPart(V / per, { label: 'Crates =' })],
          hints: ['Find the volume of the container: length × width × height.', per === 1 ? 'Each crate is $1\\ \\text{m}^3$, so the number of crates equals the volume.' : 'Each crate takes up $2\\ \\text{m}^3$. Divide the volume by $2$.'],
          solution: [
            `$V = ${l} \\times ${w} \\times ${h} = ${V}$, so the container holds $${V}\\ \\text{m}^3$.`,
            per === 1 ? `Each crate is $1\\ \\text{m}^3$, so $${V}$ crates fit.` : `$${V} \\div 2 = ${V / 2}$`,
            `$${V / per}$ crates fit in the container.`,
          ],
        };
      }
      // Sandbox: sand to a depth.
      const l = rng.int(2, 5);
      const w = rng.int(2, 4);
      const depth = 0.5;
      const V = l * w * depth;
      return {
        prompt: `${who}'s school is building a sandbox shaped like a rectangular prism. It is $${l}\\ \\text{m}$ long and $${w}\\ \\text{m}$ wide. Sand will fill it to a depth of $${n(depth)}\\ \\text{m}$. How many cubic metres of sand are needed?`,
        figure: prismFig(lab(l, 'm'), lab(w, 'm'), lab(depth, 'm')),
        parts: [volPart(V, 'm', 'Sand =')],
        hints: ['The sand is a rectangular prism. Its height is the depth of the sand.', 'Volume = length × width × height.'],
        solution: [
          `Area of the base: $${l} \\times ${w} = ${l * w}\\ \\text{m}^2$.`,
          `$V = ${l * w} \\times ${n(depth)} = ${n(V)}$`,
          `The sandbox needs $${cu(V, 'm')}$ of sand.`,
        ],
      };
    }

    // Compare two boxes.
    for (;;) {
      const a = [rng.int(3, 10), rng.int(2, 8), rng.int(2, 6)];
      const b = [rng.int(3, 10), rng.int(2, 8), rng.int(2, 6)];
      const Va = a[0] * a[1] * a[2];
      const Vb = b[0] * b[1] * b[2];
      if (Va === Vb) continue;
      const diff = Math.abs(Va - Vb);
      const big = Va > Vb ? 'A' : 'B';
      const things = rng.pick([
        ['toy box', 'toy boxes'],
        ['storage bin', 'storage bins'],
        ['gift box', 'gift boxes'],
        ['planter', 'planters'],
      ]);
      const unit = 'cm';
      return {
        prompt: `${who} is choosing between two ${things[1]} shaped like rectangular prisms. Box A is $${a[0]}$ by $${a[1]}$ by $${a[2]}\\ \\text{${unit}}$. Box B is $${b[0]}$ by $${b[1]}$ by $${b[2]}\\ \\text{${unit}}$. How much greater is the volume of the larger box?`,
        parts: [volPart(diff, unit, 'Difference =')],
        hints: ['Find the volume of each box: length × width × height.', 'Then subtract the smaller volume from the larger one.'],
        solution: [
          `Box A: $${a[0]} \\times ${a[1]} \\times ${a[2]} = ${Va}$, so $${cu(Va, unit)}$.`,
          `Box B: $${b[0]} \\times ${b[1]} \\times ${b[2]} = ${Vb}$, so $${cu(Vb, unit)}$.`,
          `Box ${big} is larger: $${Math.max(Va, Vb)} - ${Math.min(Va, Vb)} = ${diff}$`,
          `The larger box has $${cu(diff, unit)}$ more volume.`,
        ],
      };
    }
  },
});

export const VOLUME_SKILLS: SkillDef[] = [volumeUnits, volumePrism];
