/** Math 20-3 Unit 5 — Scale and 3-D Objects (G2, G3, G4): scale drawings and scale factors, views of cube structures, and exploded views with parts lists. */
import { mc, mcFigures, numPart, retry, skill } from '../../helpers.ts';
import { fmtFixed, fmtGroupTex, roundTo, toFrac } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { AnswerSpec, Choice, Figure, Part, PlaneFigure, PlanePoint, PlaneSegment, SkillDef, TableFigure } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const NAMES = [
  'Amara', 'Jordan', 'Priya', 'Mateo', 'Aiyana', 'Kwame', 'Mei', 'Hamid', 'Sofia', 'Liam', 'Fatima', 'Raj',
  'Chloé', 'Tariq', 'Olivia', 'Ethan', 'Wei', 'Nadia', 'Darius', 'Talia', 'Malik', 'Simran', 'Jun', 'Isabelle',
  'Owen', 'Zainab', 'Kai', 'Ayesha', 'Mason', 'Grace', 'Emeka', 'Rosa', 'Dakota', 'Arjun', 'Hana', 'Lucas',
  'Yusuf', 'Maya', 'Kiona', 'Tyler', 'Ananya', 'Nathan', 'Lena', 'Diego', 'Harpreet', 'Noor',
];

type Out = { prompt: string; parts: Part[]; hints: string[]; solution: string[]; figure?: Figure; calculator?: boolean };
type P = [number, number];

const tx = (u: string) => `\\text{${u}}`;
const clean = (x: number) => roundTo(x, 9);
/** A number inside maths, thousands grouped. */
const num = (x: number, dp = 4) => fmtGroupTex(clean(x), dp);
/** A measurement inside maths: 12\ \text{cm}. */
const ms = (x: number, u: string, dp = 4) => `${num(x, dp)}\\ ${tx(u)}`;
/** A measurement as inline maths: $12\ \text{cm}$. */
const M = (x: number, u: string, dp = 4) => `$${ms(x, u, dp)}$`;
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const sq = (u: string) => `${tx(u)}^2`;
const cu = (u: string) => `${tx(u)}^3`;
const isWhole = (x: number) => Math.abs(x - Math.round(x)) < 1e-9;
/** "a, b and c" */
const andList = (xs: string[]) => (xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`);

/** An exact answer (graded by value; metric decimals and imperial fractions display naturally). */
const ans = (v: number, suffix?: string, label?: string): Part => numPart(clean(v), { suffix, label });

/** A length in inches as LaTeX, with eighths written as a mixed number: 5\tfrac{1}{4}. */
function inchTex(x: number): string {
  const w = Math.floor(x + 1e-9);
  const f = toFrac(clean(x - w), 64);
  if (!f || f.n === 0) return `${w}`;
  return `${w || ''}\\tfrac{${f.n}}{${f.d}}`;
}
const IN = (x: number) => `$${inchTex(x)}\\ ${tx('in')}$`;

/** Money in prose (never inside $...$): \$12.50. */
function money(x: number): string {
  const [i, f] = fmtFixed(x, 2).split('.');
  return `\\$${i.length > 4 ? i.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : i}.${f}`;
}
/** Money inside maths, without a dollar sign. */
const mv = (x: number) => fmtGroupTex(roundTo(x, 2), 2).replace(/\.(\d)$/, '.$10').replace(/^(-?[\d{},]+)$/, '$1.00');
/** Money in a table cell (cells are plain text). */
const cell = (x: number) => `$${fmtFixed(x, 2)}`;
const CENT = 'to the nearest cent';
const moneyPart = (v: number): Part => numPart(roundTo(v, 2), { decimals: 2, tolerance: 0.011, label: '\\$' });

// ---------------------------------------------------------------------------
// Drawing on a plain canvas (a plane figure with no axes or grid lines)
// ---------------------------------------------------------------------------

const r3 = (x: number) => Math.round(x * 1000) / 1000;

/** Approximate width in pixels of a 12px bold label. */
function textWidth(t: string): number {
  let w = 0;
  for (const ch of t) w += ch === ' ' ? 3.5 : /[mMwW]/.test(ch) ? 10.5 : /[iljtfI1r]/.test(ch) ? 4.5 : 7.4;
  return w;
}

class Canvas {
  private segs: PlaneSegment[] = [];
  private polys: Array<{ points: Array<[number, number]>; color?: 'brand' | 'accent' | 'muted' }> = [];
  private texts: Array<{ c: P; text: string }> = [];

  constructor(
    private W: number,
    private H: number,
  ) {}

  seg(a: P, b: P, opts: { dashed?: boolean; color?: 'brand' | 'accent' | 'muted' } = {}) {
    this.segs.push({ from: [r3(a[0]), r3(a[1])], to: [r3(b[0]), r3(b[1])], ...opts });
    return this;
  }

  rect(x: number, y: number, w: number, h: number, color?: 'brand' | 'accent' | 'muted') {
    const pts: Array<[number, number]> = [
      [x, y],
      [x + w, y],
      [x + w, y + h],
      [x, y + h],
      [x, y],
    ];
    this.polys.push({ points: pts.map(([a, b]) => [r3(a), r3(b)]), ...(color ? { color } : {}) });
    return this;
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

/** A rectangular plan with its drawing lengths written beside two sides. */
function planFigure(a: number, b: number, aLabel: string, bLabel: string, room: string): PlaneFigure {
  const k = 6 / Math.max(a, b);
  const w = a * k;
  const h = b * k;
  const W = 9;
  const H = Math.ceil(h + 2.4);
  const x0 = (W - w) / 2 + 0.3;
  const y0 = (H - h) / 2 + 0.2;
  const c = new Canvas(W, H).rect(x0, y0, w, h);
  c.text([x0 + w / 2, y0 - 0.5], aLabel);
  c.text([x0 - 0.35 - (textWidth(bLabel) / 2) * (W / 340), y0 + h / 2], bLabel);
  c.text([x0 + w / 2, y0 + h / 2], room);
  return c.build();
}

// ---------------------------------------------------------------------------
// 5.1 Scale drawings: lengths
// ---------------------------------------------------------------------------

interface PlanCtx {
  plan: string;
  part: string;
  /** Metres that 1 cm stands for (friendly scales). */
  k: number[];
  /** Ratio scales 1 : n. */
  n: number[];
  /** Range of real lengths in metres. */
  lo: number;
  hi: number;
  room: string;
}

const METRIC_PLANS: PlanCtx[] = [
  { plan: 'the floor plan of a house', part: 'the living-room wall', k: [0.5, 1, 2], n: [50, 100], lo: 3, hi: 8, room: 'Living room' },
  { plan: 'a blueprint for a detached garage', part: 'the back wall of the garage', k: [0.5, 1, 2], n: [50, 100], lo: 5, hi: 9, room: 'Garage' },
  { plan: 'a plan of a machine shed on a farm', part: 'the long wall of the shed', k: [2, 4, 5], n: [200, 250, 500], lo: 15, hi: 40, room: 'Shed' },
  { plan: 'a landscape plan for a backyard', part: 'the back fence', k: [1, 2], n: [100, 200], lo: 8, hi: 20, room: 'Yard' },
  { plan: 'a site plan for a well pad', part: 'the access road', k: [5, 10, 20], n: [1000, 2000], lo: 60, hi: 200, room: 'Well pad' },
  { plan: 'a plan of a restaurant kitchen', part: 'the prep counter', k: [0.5, 1], n: [20, 25, 50], lo: 2, hi: 5, room: 'Kitchen' },
];

interface ImpCtx {
  plan: string;
  part: string;
  lo: number;
  hi: number;
}

const IMPERIAL_PLANS: ImpCtx[] = [
  { plan: 'a plan for a backyard deck', part: 'the long side of the deck', lo: 10, hi: 24 },
  { plan: 'a blueprint for a two-car garage', part: 'the side wall', lo: 20, hi: 28 },
  { plan: 'a plan for a tool shed', part: 'the front wall', lo: 8, hi: 16 },
  { plan: 'a floor plan of a basement suite', part: 'the bedroom wall', lo: 9, hi: 15 },
  { plan: 'a plan for a horse barn', part: 'the centre aisle', lo: 36, hi: 72 },
];

/** Architectural scales: inches on the drawing for 1 ft. */
const ARCH: Array<{ f: number; n: number }> = [
  { f: 1 / 8, n: 96 },
  { f: 1 / 4, n: 48 },
  { f: 3 / 8, n: 32 },
  { f: 1 / 2, n: 24 },
  { f: 3 / 4, n: 16 },
  { f: 1, n: 12 },
  { f: 3 / 2, n: 8 },
];
const archTex = (f: number) => `${inchTex(f)}\\ ${tx('in')} : 1\\ ${tx('ft')}`;

/** A whole number of drawing units (or multiples of `step`) whose real length k × d lies in [lo, hi]. */
function pickDrawing(rng: Rng, k: number, lo: number, hi: number, step = 1, maxD = 15): number {
  const a = Math.max(Math.ceil(lo / k / step - 1e-9), Math.ceil(1 / step));
  const b = Math.max(a, Math.min(Math.floor(hi / k / step + 1e-9), Math.floor(maxD / step)));
  return clean(rng.int(a, b) * step);
}

const repr = (k: number) => `$1\\ ${tx('cm')}$ on the drawing represents ${M(k, 'm')}`;

function lengthD1(rng: Rng, name: string): Out {
  const mode = rng.pick(['actual', 'actual', 'drawing', 'imperial'] as const);
  if (mode === 'imperial') {
    const c = rng.pick(IMPERIAL_PLANS);
    const k = rng.pick([2, 4, 5, 8, 10].filter((x) => c.hi / x >= 2));
    const d = pickDrawing(rng, k, c.lo, c.hi);
    const real = d * k;
    return {
      prompt: `On ${c.plan}, $1\\ ${tx('in')}$ on the drawing represents ${M(k, 'ft')}. On the drawing, ${c.part} is ${M(d, 'in')} long. How long is it in real life?`,
      parts: [ans(real, 'ft')],
      hints: [`Every inch on the drawing stands for ${M(k, 'ft')}.`, `Multiply the drawing length by ${k}.`],
      solution: [`Each $1\\ ${tx('in')}$ on the drawing is ${M(k, 'ft')} in real life.`, `$${d} \\times ${k} = ${real}$`, `${cap(c.part)} is ${M(real, 'ft')} long.`],
    };
  }
  const c = rng.pick(METRIC_PLANS);
  // A scale of 1 cm to 1 m makes the question trivial.
  const k = rng.pick(c.k.filter((x) => x !== 1));
  const d = pickDrawing(rng, k, c.lo, c.hi, k < 1 ? 1 : 0.5);
  const real = clean(d * k);
  if (mode === 'drawing') {
    return {
      prompt: `${name} is drawing ${c.plan}. The scale is: ${repr(k)}. In real life, ${c.part} is ${M(real, 'm')} long. How long should ${name} draw it?`,
      parts: [ans(d, 'cm')],
      hints: [`Every centimetre on the drawing stands for ${M(k, 'm')}.`, `Find how many groups of ${M(k, 'm')} fit in ${M(real, 'm')}: divide.`],
      solution: [`Each $1\\ ${tx('cm')}$ on the drawing is ${M(k, 'm')} in real life.`, `$${num(real)} \\div ${num(k)} = ${num(d)}$`, `${name} should draw ${c.part} ${M(d, 'cm')} long.`],
    };
  }
  return {
    prompt: `On ${c.plan}, ${repr(k)}. On the drawing, ${c.part} is ${M(d, 'cm')} long. How long is it in real life?`,
    parts: [ans(real, 'm')],
    hints: [`Every centimetre on the drawing stands for ${M(k, 'm')}.`, `Multiply the drawing length by ${num(k)}.`],
    solution: [`Each $1\\ ${tx('cm')}$ on the drawing is ${M(k, 'm')} in real life.`, `$${num(d)} \\times ${num(k)} = ${num(real)}$`, `${cap(c.part)} is ${M(real, 'm')} long.`],
  };
}

const MAPS = [
  { map: 'A hiking map of a mountain park', what: 'two campsites', n: 50000 },
  { map: 'A topographic map of the foothills', what: 'two lookout points', n: 50000 },
  { map: 'A road map of the region', what: 'two towns', n: 250000 },
  { map: 'A map of a large cattle ranch', what: 'the two gates', n: 20000 },
  { map: 'A map of the trails in a provincial park', what: 'two trailheads', n: 25000 },
];

function lengthD2(rng: Rng, name: string): Out {
  const mode = rng.pick(['ratio', 'ratio', 'ratioDraw', 'arch', 'archDraw', 'map'] as const);
  if (mode === 'map') {
    const m = rng.pick(MAPS);
    const cm = retry(() => rng.int(m.n >= 250000 ? 12 : 25, m.n >= 250000 ? 90 : 160) / 10, (x) => !isWhole(x) || rng.chance(0.3));
    const realCm = clean(cm * m.n);
    const km = clean(realCm / 100000);
    return {
      prompt: `${m.map} has a scale of $1 : ${num(m.n)}$. On the map, ${m.what} are ${M(cm, 'cm')} apart. How far apart are they in real life, in kilometres?`,
      parts: [ans(km, 'km')],
      hints: [`$1 : ${num(m.n)}$ means $1\\ ${tx('cm')}$ on the map is $${num(m.n)}\\ ${tx('cm')}$ in real life.`, `Multiply by ${num(m.n)} to get centimetres, then divide by $100\\,000$ to change centimetres to kilometres ($1\\ ${tx('km')} = 100\\,000\\ ${tx('cm')}$).`],
      solution: [
        `Real distance in centimetres: $${num(cm)} \\times ${num(m.n)} = ${num(realCm)}\\ ${tx('cm')}$`,
        `There are $100\\,000\\ ${tx('cm')}$ in $1\\ ${tx('km')}$: $${num(realCm)} \\div 100\\,000 = ${num(km)}$`,
        `${cap(m.what)} are ${M(km, 'km')} apart.`,
      ],
    };
  }
  if (mode === 'arch' || mode === 'archDraw') {
    const c = rng.pick(IMPERIAL_PLANS);
    const s = rng.pick(ARCH.filter((a) => a.f <= 1 / 2 && c.hi * a.f >= 2 && c.lo * a.f <= 12));
    const ft = rng.int(c.lo, c.hi);
    const d = clean(ft * s.f);
    if (mode === 'archDraw') {
      return {
        prompt: `${name} is drawing ${c.plan} with a scale of $${archTex(s.f)}$. In real life, ${c.part} is ${M(ft, 'ft')} long. How long should it be on the drawing, in inches?`,
        parts: [ans(d, 'in')],
        hints: [`Every ${IN(s.f)} on the drawing stands for $1\\ ${tx('ft')}$.`, `Multiply the number of feet by ${IN(s.f)}.`],
        solution: [`Each foot in real life is drawn ${IN(s.f)} long.`, `$${ft} \\times ${inchTex(s.f)} = ${inchTex(d)}$`, `${cap(c.part)} should be ${IN(d)} long on the drawing.`],
      };
    }
    return {
      prompt: `${cap(c.plan)} uses a scale of $${archTex(s.f)}$. On the drawing, ${c.part} measures ${IN(d)}. How long is it in real life, in feet?`,
      parts: [ans(ft, 'ft')],
      hints: [`Every ${IN(s.f)} on the drawing stands for $1\\ ${tx('ft')}$.`, `Find how many ${IN(s.f)} pieces fit in ${IN(d)}: divide ${IN(d)} by ${IN(s.f)}.`],
      solution: [
        `Each ${IN(s.f)} on the drawing is $1\\ ${tx('ft')}$ in real life.`,
        `Write the lengths as decimals: $${inchTex(d)} = ${num(d)}$ and $${inchTex(s.f)} = ${num(s.f)}$.`,
        `$${num(d)} \\div ${num(s.f)} = ${ft}$`,
        `${cap(c.part)} is ${M(ft, 'ft')} long.`,
      ],
    };
  }
  const c = rng.pick(METRIC_PLANS);
  const n = rng.pick(c.n);
  const { cm, realM } = retry(
    () => {
      const cm = clean(Math.round(rng.float((c.lo * 100) / n, (c.hi * 100) / n, 2) * 10) / 10);
      return { cm, realM: clean((cm * n) / 100) };
    },
    (o) => o.cm >= 1.5 && o.cm <= 30 && !isWhole(o.cm),
  );
  const realCm = clean(cm * n);
  if (mode === 'ratioDraw') {
    return {
      prompt: `${name} is drawing ${c.plan} with a scale of $1 : ${n}$. In real life, ${c.part} is ${M(realM, 'm')} long. How long should it be on the drawing, in centimetres?`,
      parts: [ans(cm, 'cm')],
      hints: ['Change the real length to centimetres first: multiply metres by $100$.', `Then divide by ${n}, because every $${n}\\ ${tx('cm')}$ in real life is $1\\ ${tx('cm')}$ on the drawing.`],
      solution: [`${M(realM, 'm')} $= ${num(realM)} \\times 100 = ${num(realCm)}\\ ${tx('cm')}$`, `$${num(realCm)} \\div ${n} = ${num(cm)}$`, `${cap(c.part)} should be ${M(cm, 'cm')} long on the drawing.`],
    };
  }
  const h = clean(Math.max(1.5, roundTo(cm * rng.pick([0.5, 0.6, 0.7]), 1)));
  return {
    prompt: `${cap(c.plan)} uses a scale of $1 : ${n}$. On the drawing, ${c.part} is ${M(cm, 'cm')} long. How long is it in real life, in metres?`,
    figure: c.room === 'Well pad' ? undefined : planFigure(cm, h, `${num(cm).replace('{,}', ',')} cm`, '', c.room),
    parts: [ans(realM, 'm')],
    hints: [`A scale of $1 : ${n}$ means $1\\ ${tx('cm')}$ on the drawing is $${n}\\ ${tx('cm')}$ in real life.`, `Multiply by ${n} to get centimetres. Then divide by $100$ to change centimetres to metres.`],
    solution: [`Multiply by ${n}: $${num(cm)} \\times ${n} = ${num(realCm)}\\ ${tx('cm')}$`, `Change to metres: $${num(realCm)} \\div 100 = ${num(realM)}$`, `${cap(c.part)} is ${M(realM, 'm')} long.`],
  };
}

const MODELS = [
  { thing: 'A model pickup truck', lo: 5.2, hi: 6.2 },
  { thing: 'A model of a combine harvester', lo: 8, hi: 11 },
  { thing: 'A model of a grain bin', lo: 6, hi: 10 },
  { thing: 'A model of a semi-trailer', lo: 14, hi: 16.2 },
  { thing: 'A model of a farm tractor', lo: 4.5, hi: 6.5 },
  { thing: 'A model of a house for a building permit', lo: 10, hi: 16 },
];

const SMALL_PARTS = [
  { thing: 'the head of a hex bolt', dim: 'width', lo: 8, hi: 24 },
  { thing: 'a blade fuse from a truck', dim: 'length', lo: 15, hi: 30 },
  { thing: 'a gear from a small engine', dim: 'diameter', lo: 10, hi: 30 },
  { thing: 'a chip on a circuit board', dim: 'length', lo: 6, hi: 20 },
  { thing: 'a watch battery', dim: 'diameter', lo: 6, hi: 20 },
];

function lengthD3(rng: Rng, name: string): Out {
  const mode = rng.pick(['model', 'arch', 'detail', 'perimeter'] as const);
  if (mode === 'model') {
    const mo = rng.pick(MODELS);
    const { n, cm, realM } = retry(
      () => {
        const n = rng.pick([16, 20, 24, 25, 32, 40, 50, 64, 100]);
        const cm = rng.int(Math.ceil((mo.lo * 200) / n), Math.floor((mo.hi * 200) / n)) / 2;
        return { n, cm, realM: clean((cm * n) / 100) };
      },
      (o) => o.cm >= 5 && o.cm <= 60 && o.realM >= mo.lo && o.realM <= mo.hi,
      200,
    );
    const realCm = clean(realM * 100);
    return {
      prompt: `${mo.thing} is ${M(cm, 'cm')} long. The real one is ${M(realM, 'm')} long. What is the scale of the model? Write it as $1 : n$ and give the value of $n$.`,
      parts: [numPart(n, { label: 'Scale $1 :$' })],
      hints: ['Both lengths must be in the same unit. Change the real length to centimetres: multiply by $100$.', 'Then divide the real length by the model length to see how many times as long the real one is.'],
      solution: [`${M(realM, 'm')} $= ${num(realM)} \\times 100 = ${num(realCm)}\\ ${tx('cm')}$`, `$${num(realCm)} \\div ${num(cm)} = ${n}$`, `The real one is $${n}$ times as long as the model, so the scale is $1 : ${n}$.`],
    };
  }
  if (mode === 'arch') {
    const s = rng.pick(ARCH);
    const item = rng.pick([
      { what: 'a kitchen', part: 'the island', lo: 4, hi: 9 },
      { what: 'a garage', part: 'the overhead door', lo: 8, hi: 16 },
      { what: 'a bathroom', part: 'the vanity', lo: 3, hi: 6 },
      { what: 'a deck', part: 'the stairs', lo: 3, hi: 6 },
      { what: 'a workshop', part: 'the workbench', lo: 6, hi: 12 },
    ]);
    const ft = rng.int(item.lo, item.hi);
    const d = clean(ft * s.f);
    return {
      prompt: `An architect’s drawing of ${item.what} uses the scale $${archTex(s.f)}$.\n\n(a) Write this scale as a ratio $1 : n$ (both parts in inches). What is $n$?\n\n(b) On the drawing, ${item.part} is ${IN(d)} wide. How wide is it in real life, in feet?`,
      parts: [numPart(s.n, { label: '(a) $n =$' }), ans(ft, 'ft', '(b)')],
      hints: [`A ratio needs the same unit on both sides. Write $1\\ ${tx('ft')}$ as $12\\ ${tx('in')}$, then divide $12$ by ${IN(s.f)}.`, `For (b), every ${IN(s.f)} on the drawing is $1\\ ${tx('ft')}$, so divide the drawing length by ${IN(s.f)}.`],
      solution: [
        `(a) $1\\ ${tx('ft')} = 12\\ ${tx('in')}$, so the scale is $${inchTex(s.f)} : 12$ in inches.`,
        `Divide both sides by $${inchTex(s.f)}$: $12 \\div ${num(s.f)} = ${s.n}$, so the scale is $1 : ${s.n}$ and $n = ${s.n}$.`,
        `(b) $${inchTex(d)} \\div ${inchTex(s.f)} = ${num(d)} \\div ${num(s.f)} = ${ft}$`,
        `(a) $n = ${s.n}$. (b) ${cap(item.part)} is ${M(ft, 'ft')} wide.`,
      ],
    };
  }
  if (mode === 'detail') {
    const p = rng.pick(SMALL_PARTS);
    const k = rng.pick([2, 4, 5, 10]);
    const { draw, real } = retry(
      () => {
        const draw = rng.int(Math.ceil(p.lo * k), Math.floor(p.hi * k));
        return { draw, real: clean(draw / k) };
      },
      (o) => o.draw >= 20 && o.draw <= 160 && !isWhole(o.real) === (k !== 10 || rng.chance(0.5)),
      200,
    );
    return {
      prompt: `A technical drawing of ${p.thing} uses a scale of $${k} : 1$. On the drawing, its ${p.dim} is ${M(draw, 'mm')}. What is the ${p.dim} of the real part, in millimetres?`,
      parts: [ans(real, 'mm')],
      hints: [`In the scale $${k} : 1$, the first number is the drawing. The drawing is ${k} times as large as the real part.`, `Divide the drawing length by ${k}.`],
      solution: [
        `A scale of $${k} : 1$ means $${k}\\ ${tx('mm')}$ on the drawing stands for $1\\ ${tx('mm')}$ on the real part. This is an enlargement.`,
        `$${draw} \\div ${k} = ${num(real)}$`,
        `The real ${p.dim} is ${M(real, 'mm')}.`,
      ],
    };
  }
  // Perimeter of a room for baseboard.
  const n = rng.pick([50, 100]);
  const room = rng.pick(['bedroom', 'office', 'family room', 'dining room', 'den']);
  const { a, b } = retry(
    () => ({ a: rng.int(n === 50 ? 70 : 35, n === 50 ? 120 : 60) / 10, b: rng.int(n === 50 ? 55 : 28, n === 50 ? 90 : 45) / 10 }),
    (o) => o.a > o.b + 0.5 && (!isWhole(o.a) || !isWhole(o.b)),
  );
  const A = clean((a * n) / 100);
  const B = clean((b * n) / 100);
  const door = rng.pick([0.8, 0.9]);
  const P = clean(2 * (A + B));
  const need = clean(P - door);
  return {
    prompt: `${name} is putting baseboard around a ${room}. On the floor plan, the ${room} is a rectangle ${M(a, 'cm')} by ${M(b, 'cm')}, and the scale is $1 : ${n}$. The baseboard goes all the way around the room except across a doorway ${M(door, 'm')} wide. How many metres of baseboard does ${name} need?`,
    figure: planFigure(a, b, `${num(a)} cm`, `${num(b)} cm`, cap(room)),
    parts: [ans(need, 'm')],
    hints: [`Find the real length and width first: multiply each drawing length by ${n}, then divide by $100$ to get metres.`, 'The distance around the room is the perimeter: $P = 2(l + w)$. Then subtract the doorway.'],
    solution: [
      `Real length: $${num(a)} \\times ${n} = ${num(a * n)}\\ ${tx('cm')} = ${ms(A, 'm')}$`,
      `Real width: $${num(b)} \\times ${n} = ${num(b * n)}\\ ${tx('cm')} = ${ms(B, 'm')}$`,
      `Perimeter: $2(${num(A)} + ${num(B)}) = ${num(P)}\\ ${tx('m')}$`,
      `Subtract the doorway: $${num(P)} - ${num(door)} = ${num(need)}$`,
      `${name} needs ${M(need, 'm')} of baseboard.`,
    ],
  };
}

const scaleLength = skill({
  id: 'm203-scale-length',
  name: 'Scale drawings and lengths',
  description: 'Use a scale written as a ratio (1:50), in words (1 cm represents 2 m) or with imperial units (1/4 in : 1 ft) to find real lengths, drawing lengths and the scale itself.',
  outcomes: ['G2'],
  lessonId: 'm203-5-1',
  calculator: true,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    if (d === 1) return { ...lengthD1(rng, name), calculator: false };
    if (d === 2) return lengthD2(rng, name);
    return lengthD3(rng, name);
  },
});

// ---------------------------------------------------------------------------
// 5.1 Scale factors for area and volume
// ---------------------------------------------------------------------------

const AREA_CTX = [
  { obj: 'a rectangular sign for a farm stand', thing: 'the sign', u: 'm', range: [0.4, 1.6] },
  { obj: 'a company logo decal for a work truck', thing: 'the decal', u: 'cm', range: [150, 600] },
  { obj: 'a vegetable garden bed', thing: 'the garden bed', u: 'm', range: [2, 8] },
  { obj: 'a concrete patio', thing: 'the patio', u: 'm', range: [6, 16] },
  { obj: 'a photo', thing: 'the photo', u: 'cm', range: [80, 200] },
  { obj: 'a vinyl banner for a hockey tournament', thing: 'the banner', u: 'm', range: [1, 3] },
];

const VOL_CTX = [
  { obj: 'a water tank for a cattle trough', noun: 'water tank', amt: 'holds', of: 'water', u: 'L', range: [40, 400] },
  { obj: 'a sandbox at a daycare', noun: 'sandbox', amt: 'holds', of: 'sand', u: 'L', range: [100, 600] },
  { obj: 'a concrete footing', noun: 'concrete footing', amt: 'uses', of: 'concrete', u: 'm³', range: [0.2, 1.2] },
  { obj: 'a shipping box', noun: 'shipping box', amt: 'holds', of: 'packing', u: 'L', range: [12, 60] },
  { obj: 'a planter box', noun: 'planter box', amt: 'holds', of: 'soil', u: 'L', range: [20, 90] },
];

/** A unit for an area or capacity in maths. */
const areaU = (u: string) => sq(u);
const volU = (u: string) => (u === 'm³' ? cu('m') : tx(u));
const volSuffix = (u: string) => u;

function areaVolD1(rng: Rng): Out {
  const mode = rng.pick(['area', 'area', 'vol', 'vol', 'reduce'] as const);
  if (mode === 'area') {
    const c = rng.pick(AREA_CTX);
    const k = rng.pick([2, 3, 4, 5, 10]);
    return {
      prompt: `${cap(c.obj)} is enlarged by a scale factor of $${k}$: every length is $${k}$ times as long. How many times as large is the area of the enlarged ${c.thing.replace('the ', '')}?`,
      parts: [numPart(k * k, { suffix: 'times' })],
      hints: ['Area uses two lengths (length and width), and each one is multiplied by the scale factor.', `The area is multiplied by $k^2 = ${k} \\times ${k}$.`],
      solution: [`Both the length and the width are multiplied by $${k}$.`, `The area is multiplied by $${k} \\times ${k} = ${k}^2 = ${k * k}$.`, `The enlarged area is $${k * k}$ times as large.`],
    };
  }
  if (mode === 'reduce') {
    const k = rng.pick([2, 3, 4, 5]);
    const c = rng.pick(AREA_CTX.filter((x) => x.u === 'cm'));
    return {
      prompt: `A copy of ${c.obj} is reduced so every length is $\\tfrac{1}{${k}}$ as long as the original. What fraction of the original area is the area of the copy?`,
      parts: [numPart(1 / (k * k), { display: 'fraction' })],
      hints: [`The scale factor is $k = \\tfrac{1}{${k}}$.`, 'The area is multiplied by $k^2$.'],
      solution: [`The scale factor is $k = \\tfrac{1}{${k}}$.`, `$k^2 = \\tfrac{1}{${k}} \\times \\tfrac{1}{${k}} = \\tfrac{1}{${k * k}}$`, `The copy has $\\tfrac{1}{${k * k}}$ of the original area.`],
    };
  }
  const c = rng.pick(VOL_CTX);
  const k = rng.pick([2, 3, 4, 5]);
  const how = c.amt === 'holds' ? `How many times as much ${c.of === 'packing' ? '' : `${c.of} `}does the larger one hold?` : `How many times as much ${c.of} does the larger one use?`;
  return {
    prompt: `A larger version of ${c.obj} is built with the same shape: every length (length, width and height) is $${k}$ times as long. ${how}`,
    parts: [numPart(k ** 3, { suffix: 'times' })],
    hints: ['Volume uses three lengths, and each one is multiplied by the scale factor.', `The volume is multiplied by $k^3 = ${k} \\times ${k} \\times ${k}$.`],
    solution: [`The length, width and height are each multiplied by $${k}$.`, `The volume is multiplied by $${k} \\times ${k} \\times ${k} = ${k}^3 = ${k ** 3}$.`, `The larger one ${c.amt} $${k ** 3}$ times as much.`],
  };
}

function areaVolD2(rng: Rng): Out {
  const mode = rng.pick(['area', 'area', 'vol', 'vol', 'findK'] as const);
  if (mode === 'findK') {
    const vol = rng.chance(0.5);
    const k = vol ? rng.pick([2, 3, 4, 5]) : rng.pick([2, 3, 4, 5, 1.5, 2.5]);
    const f = clean(vol ? k ** 3 : k * k);
    const cv = rng.pick(VOL_CTX);
    const ca = rng.pick(AREA_CTX);
    return {
      prompt: vol
        ? `A larger version of ${cv.obj} has the same shape and ${cv.amt} $${num(f)}$ times as much. By what scale factor were its lengths multiplied?`
        : `An enlargement of ${ca.obj} has the same shape and $${num(f)}$ times the area. By what scale factor were its lengths multiplied?`,
      parts: [numPart(k, { label: '$k =$' })],
      hints: [vol ? 'Volume is multiplied by $k^3$.' : 'Area is multiplied by $k^2$.', vol ? `Find the number that multiplies by itself three times to make $${num(f)}$: the cube root.` : `Find the number that multiplies by itself to make $${num(f)}$: the square root.`],
      solution: vol
        ? [`Volume is multiplied by $k^3$, so $k^3 = ${num(f)}$.`, `$k = \\sqrt[3]{${num(f)}} = ${num(k)}$, because $${num(k)} \\times ${num(k)} \\times ${num(k)} = ${num(f)}$.`, `The scale factor is $${num(k)}$.`]
        : [`Area is multiplied by $k^2$, so $k^2 = ${num(f)}$.`, `$k = \\sqrt{${num(f)}} = ${num(k)}$, because $${num(k)} \\times ${num(k)} = ${num(f)}$.`, `The scale factor is $${num(k)}$.`],
    };
  }
  if (mode === 'area') {
    const c = rng.pick(AREA_CTX);
    const k = rng.pick([2, 3, 1.5, 2.5, 0.5]);
    const A = c.u === 'cm' ? rng.int(c.range[0] / 10, c.range[1] / 10) * 10 : clean(rng.int(c.range[0] * 10, c.range[1] * 10) / 10);
    const k2 = clean(k * k);
    const A2 = clean(A * k2);
    return {
      prompt: `${cap(c.obj)} has an area of $${num(A)}\\ ${areaU(c.u)}$. A ${k < 1 ? 'smaller' : 'larger'} one is made with the same shape, using a scale factor of $${num(k)}$. What is the area of the ${k < 1 ? 'smaller' : 'larger'} one?`,
      parts: [ans(A2, `${c.u}²`)],
      hints: ['When lengths are multiplied by $k$, the area is multiplied by $k^2$.', `Find $k^2 = ${num(k)}^2$, then multiply the area by it.`],
      solution: [`The area is multiplied by $k^2 = ${num(k)}^2 = ${num(k2)}$.`, `$${num(A)} \\times ${num(k2)} = ${num(A2)}$`, `The ${k < 1 ? 'smaller' : 'larger'} one has an area of $${num(A2)}\\ ${areaU(c.u)}$.`],
    };
  }
  const c = rng.pick(VOL_CTX);
  const k = rng.pick([2, 3, 1.5, 0.5]);
  const V = c.u === 'm³' ? clean(rng.int(c.range[0] * 10, c.range[1] * 10) / 10) : rng.int(c.range[0] / 2, c.range[1] / 2) * 2;
  const k3 = clean(k ** 3);
  const V2 = clean(V * k3);
  const big = k > 1;
  return {
    prompt: `${cap(c.obj)} ${c.amt} $${num(V)}\\ ${volU(c.u)}$. A ${big ? 'larger' : 'smaller'} one with the same shape is made using a scale factor of $${num(k)}$. How much does the ${big ? 'larger' : 'smaller'} one ${c.amt === 'holds' ? 'hold' : 'use'}?`,
    parts: [ans(V2, volSuffix(c.u))],
    hints: ['When lengths are multiplied by $k$, the volume is multiplied by $k^3$.', `Find $k^3 = ${num(k)}^3$, then multiply.`],
    solution: [`The volume is multiplied by $k^3 = ${num(k)} \\times ${num(k)} \\times ${num(k)} = ${num(k3)}$.`, `$${num(V)} \\times ${num(k3)} = ${num(V2)}$`, `The ${big ? 'larger' : 'smaller'} one ${c.amt} $${num(V2)}\\ ${volU(c.u)}$.`],
  };
}

/** Real areas in square metres that are realistic for each model. */
const AREA_MODELS = [
  { thing: 'barn', part: 'the floor', lo: 150, hi: 600 },
  { thing: 'house', part: 'the roof', lo: 120, hi: 300 },
  { thing: 'machine shed', part: 'the floor', lo: 200, hi: 900 },
  { thing: 'hockey arena', part: 'the ice surface', lo: 1400, hi: 1900 },
  { thing: 'grain elevator', part: 'one wall', lo: 150, hi: 500 },
];

/** Real capacities in cubic metres that are realistic for each model. */
const VOL_MODELS = [
  { thing: 'grain bin', what: 'holds', of: 'grain', lo: 60, hi: 600 },
  { thing: 'water tower', what: 'holds', of: 'water', lo: 300, hi: 3000 },
  { thing: 'oil storage tank', what: 'holds', of: 'oil', lo: 200, hi: 5000 },
  { thing: 'swimming pool', what: 'holds', of: 'water', lo: 150, hi: 2500 },
];

/** "a" or "an" before a word. */
const article = (w: string) => (/^[aeiou]/i.test(w) ? 'an' : 'a');

function areaVolD3(rng: Rng, name: string): Out {
  const mode = rng.pick(['modelArea', 'modelVol', 'cost', 'kLength'] as const);
  if (mode === 'modelArea') {
    const m = rng.pick(AREA_MODELS);
    const { n, a, realM2 } = retry(
      () => {
        const n = rng.pick([20, 25, 50, 100, 200]);
        const step = n >= 100 ? 1 : n >= 50 ? 2 : 10;
        const a = rng.int(Math.ceil((m.lo * 10000) / (n * n) / step), Math.max(1, Math.floor((m.hi * 10000) / (n * n) / step))) * step;
        return { n, a, realM2: clean((a * n * n) / 10000) };
      },
      (o) => o.realM2 >= m.lo && o.realM2 <= m.hi && o.a >= 10 && o.a <= 6000 && isWhole(o.realM2 * 10),
      300,
    );
    const realCm2 = a * n * n;
    return {
      prompt: `${name} builds a $1 : ${n}$ model of ${article(m.thing)} ${m.thing}. On the model, ${m.part} has an area of $${num(a)}\\ ${sq('cm')}$. What is the area of ${m.part} of the real ${m.thing}, in square metres?`,
      parts: [ans(realM2, 'm²')],
      hints: [`Real lengths are $${n}$ times the model lengths, so real areas are $${n}^2$ times the model areas.`, `Then change square centimetres to square metres: $1\\ ${sq('m')} = 100 \\times 100 = 10\\,000\\ ${sq('cm')}$.`],
      solution: [
        `The scale factor from the model to the real ${m.thing} is $k = ${n}$, so areas are multiplied by $k^2 = ${num(n * n)}$.`,
        `$${num(a)} \\times ${num(n * n)} = ${num(realCm2)}\\ ${sq('cm')}$`,
        `$1\\ ${sq('m')} = 10\\,000\\ ${sq('cm')}$, so $${num(realCm2)} \\div 10\\,000 = ${num(realM2)}$.`,
        `The real area is $${num(realM2)}\\ ${sq('m')}$.`,
      ],
    };
  }
  if (mode === 'modelVol') {
    const m = rng.pick(VOL_MODELS);
    const { n, v, realM3 } = retry(
      () => {
        const n = rng.pick([20, 25, 50, 100]);
        const step = n >= 50 ? 1 : n === 25 ? 4 : 10;
        const v = rng.int(Math.ceil((m.lo * 1e6) / n ** 3 / step), Math.max(1, Math.floor((m.hi * 1e6) / n ** 3 / step))) * step;
        return { n, v, realM3: clean((v * n ** 3) / 1e6) };
      },
      (o) => o.realM3 >= m.lo && o.realM3 <= m.hi && o.v >= 20 && isWhole(o.realM3 * 10),
      300,
    );
    const realCm3 = v * n ** 3;
    return {
      prompt: `A $1 : ${n}$ model of ${article(m.thing)} ${m.thing} ${m.what} $${num(v)}\\ ${cu('cm')}$. How many cubic metres of ${m.of} would the real ${m.thing} hold?`,
      parts: [ans(realM3, 'm³')],
      hints: [`Real lengths are $${n}$ times the model lengths, so real volumes are $${n}^3$ times the model volume.`, `Then change cubic centimetres to cubic metres: $1\\ ${cu('m')} = 100 \\times 100 \\times 100 = 1\\,000\\,000\\ ${cu('cm')}$.`],
      solution: [
        `The scale factor is $k = ${n}$, so volumes are multiplied by $k^3 = ${num(n ** 3)}$.`,
        `$${num(v)} \\times ${num(n ** 3)} = ${num(realCm3)}\\ ${cu('cm')}$`,
        `$1\\ ${cu('m')} = 1\\,000\\,000\\ ${cu('cm')}$, so $${num(realCm3)} \\div 1\\,000\\,000 = ${num(realM3)}$.`,
        `The real ${m.thing} would hold $${num(realM3)}\\ ${cu('m')}$ of ${m.of}.`,
      ],
    };
  }
  if (mode === 'cost') {
    const item = rng.pick([
      { what: 'a vinyl banner', size: [2, 3], u: 'ft', verb: 'print' },
      { what: 'a sign', size: [3, 4], u: 'ft', verb: 'make' },
      { what: 'a sheet-metal cover', size: [40, 60], u: 'cm', verb: 'make' },
      { what: 'a glass tabletop', size: [50, 80], u: 'cm', verb: 'cut' },
    ]);
    const k = rng.pick([1.5, 2, 2.5, 3]);
    const cost = retry(() => rng.int(1200, 6500) / 100, (c0) => !isWhole(c0) && !isWhole(c0 * k * k * 100));
    const k2 = clean(k * k);
    const big = cost * k2;
    const [w, h] = item.size;
    return {
      prompt: `It costs ${money(cost)} to ${item.verb} ${item.what} that is ${M(w, item.u)} by ${M(h, item.u)}. The price is based on area. How much would it cost to ${item.verb} ${item.what} with the same shape that is ${M(clean(w * k), item.u)} by ${M(clean(h * k), item.u)}? Give your answer ${CENT}.`,
      parts: [moneyPart(big)],
      hints: [`Find the scale factor first: $${num(clean(w * k))} \\div ${w}$.`, 'The cost depends on area, so multiply the cost by $k^2$.'],
      solution: [`Scale factor: $k = ${num(clean(w * k))} \\div ${w} = ${num(k)}$`, `Area is multiplied by $k^2 = ${num(k2)}$, and so is the cost.`, `$${mv(cost)} \\times ${num(k2)} = ${num(big, 4)}$`, `It would cost about ${money(big)}.`],
    };
  }
  // Find k from an area or volume ratio, then a length.
  const vol = rng.chance(0.5);
  if (vol) {
    const k = rng.pick([2, 3, 1.5, 2.5]);
    const f = clean(k ** 3);
    const c = rng.pick([
      { what: 'water tank', whats: 'water tanks', dim: 'height', u: 'm', lo: 0.6, hi: 1.6 },
      { what: 'cardboard box', whats: 'cardboard boxes', dim: 'height', u: 'cm', lo: 20, hi: 50 },
      { what: 'compost bin', whats: 'compost bins', dim: 'width', u: 'cm', lo: 60, hi: 100 },
    ]);
    const L = c.u === 'm' ? clean(rng.int(c.lo * 10, c.hi * 10) / 10) : rng.int(c.lo / 2, c.hi / 2) * 2;
    const L2 = clean(L * k);
    return {
      prompt: `Two ${c.whats} have the same shape. The larger one holds $${num(f)}$ times as much as the smaller one. The ${c.dim} of the smaller one is ${M(L, c.u)}. What is the ${c.dim} of the larger one?`,
      parts: [ans(L2, c.u)],
      hints: ['Capacity (volume) is multiplied by $k^3$. Find $k$ with a cube root.', 'Then multiply the length by $k$.'],
      solution: [`$k^3 = ${num(f)}$, so $k = \\sqrt[3]{${num(f)}} = ${num(k)}$.`, `Lengths are multiplied by $k$: $${num(L)} \\times ${num(k)} = ${num(L2)}$`, `The ${c.dim} of the larger one is ${M(L2, c.u)}.`],
    };
  }
  const k = rng.pick([1.5, 2, 2.5, 3, 4]);
  const f = clean(k * k);
  const c = rng.pick([
    { what: 'sign', dim: 'width', u: 'cm', lo: 40, hi: 120, need: 'paint' },
    { what: 'logo on a trailer', dim: 'height', u: 'cm', lo: 30, hi: 80, need: 'vinyl' },
    { what: 'garden bed', dim: 'length', u: 'm', lo: 1.5, hi: 4, need: 'soil to cover its surface' },
  ]);
  const L = c.u === 'm' ? clean(rng.int(c.lo * 10, c.hi * 10) / 10) : rng.int(c.lo / 5, c.hi / 5) * 5;
  const L2 = clean(L * k);
  return {
    prompt: `A new ${c.what} has the same shape as an old one, but it needs $${num(f)}$ times as much ${c.need}, because its area is $${num(f)}$ times as large. The ${c.dim} of the old ${c.what} is ${M(L, c.u)}. What is the ${c.dim} of the new one?`,
    parts: [ans(L2, c.u)],
    hints: ['Area is multiplied by $k^2$. Find $k$ with a square root.', 'Then multiply the length by $k$.'],
    solution: [`$k^2 = ${num(f)}$, so $k = \\sqrt{${num(f)}} = ${num(k)}$.`, `Lengths are multiplied by $k$: $${num(L)} \\times ${num(k)} = ${num(L2)}$`, `The new ${c.dim} is ${M(L2, c.u)}.`],
  };
}

const scaleAreaVolume = skill({
  id: 'm203-scale-area-volume',
  name: 'Scale factors for area and volume',
  description: 'Use a scale factor k to find how area (k²) and volume (k³) change for enlargements, reductions and scale models, and find k from an area or volume ratio.',
  outcomes: ['G2'],
  lessonId: 'm203-5-1',
  calculator: true,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    if (d === 1) return { ...areaVolD1(rng), calculator: false };
    if (d === 2) return areaVolD2(rng);
    return areaVolD3(rng, name);
  },
});

// ---------------------------------------------------------------------------
// 5.2 Views of cube structures
// ---------------------------------------------------------------------------

/** Heights of the stacks: rows from back to front, columns from left to right. */
type HMap = number[][];

const frontOf = (h: HMap) => h[0].map((_, c) => Math.max(...h.map((row) => row[c])));
/** Right side view: the front row is on the left of the drawing. */
const sideOf = (h: HMap) => h.map((row) => Math.max(...row)).reverse();
const colSums = (h: HMap) => h[0].map((_, c) => h.reduce((s, row) => s + row[c], 0));
const rowSums = (h: HMap) => h.map((row) => row.reduce((s, x) => s + x, 0)).reverse();
const totalOf = (h: HMap) => h.flat().reduce((s, x) => s + x, 0);
const vkey = (v: number[]) => v.join(',');
const hkey = (h: HMap) => h.map((r) => r.join(',')).join('/');

const COL_NAMES: Record<number, string[]> = { 2: ['Left', 'Right'], 3: ['Left', 'Centre', 'Right'] };
const ROW_NAMES: Record<number, string[]> = { 2: ['Back', 'Front'], 3: ['Back', 'Middle', 'Front'] };

function topTable(h: HMap): TableFigure {
  return { type: 'table', headers: ['', ...COL_NAMES[h[0].length]], rows: h.map((row, r) => [ROW_NAMES[h.length][r], ...row.map(String)]) };
}

/** Unit squares of a view (heights left to right) with the bottom-left corner at (x0, y0). */
function drawView(c: Canvas, hs: number[], x0: number, y0: number) {
  const seen = new Set<string>();
  const edge = (a: P, b: P) => {
    const k = `${a}|${b}`;
    if (seen.has(k)) return;
    seen.add(k);
    c.seg(a, b);
  };
  hs.forEach((h, i) => {
    for (let j = 0; j < h; j++) {
      const x = x0 + i;
      const y = y0 + j;
      edge([x, y], [x + 1, y]);
      edge([x, y + 1], [x + 1, y + 1]);
      edge([x, y], [x, y + 1]);
      edge([x + 1, y], [x + 1, y + 1]);
    }
  });
}

/** One view, centred on a canvas of the given size (so every choice uses the same scale). */
function viewFigure(hs: number[], W: number, H: number): PlaneFigure {
  const c = new Canvas(W, H);
  drawView(c, hs, (W - hs.length) / 2, (H - Math.max(...hs)) / 2);
  return c.build();
}

/** The front and right side views next to each other, labelled. */
function twoViews(front: number[], side: number[]): PlaneFigure {
  const gap = 2;
  const W = Math.max(front.length + side.length + gap + 2, Math.max(...front, ...side) + 3);
  const H = Math.max(...front, ...side) + 3;
  const x1 = (W - (front.length + side.length + gap)) / 2;
  const x2 = x1 + front.length + gap;
  const c = new Canvas(W, H);
  drawView(c, front, x1, 1.6);
  drawView(c, side, x2, 1.6);
  c.text([x1 + front.length / 2, 0.75], 'Front');
  c.text([x2 + side.length / 2, 0.75], 'Right side');
  return c.build();
}

/** A random structure: every row and column has at least one cube. */
function randomHMap(rng: Rng, R: number, C: number, maxH: number, zeros: boolean): HMap {
  return retry(
    () => Array.from({ length: R }, () => Array.from({ length: C }, () => (zeros && rng.chance(0.25) ? 0 : rng.int(1, maxH)))),
    (h) => h.every((row) => row.some((x) => x > 0)) && h[0].every((_, c) => h.some((row) => row[c] > 0)) && Math.max(...h.flat()) >= 2,
    200,
  );
}

const CUBE_CTX = [
  { who: (n: string) => `${n} builds a structure from linking cubes.`, unit: 'cubes', one: 'cube' },
  { who: () => 'Cube-shaped boxes are stacked in a warehouse.', unit: 'boxes', one: 'box' },
  { who: () => 'Cube-shaped crates are stacked in a storage yard.', unit: 'crates', one: 'crate' },
  { who: () => 'Wooden blocks are stacked at a daycare.', unit: 'blocks', one: 'block' },
  { who: () => 'Cube-shaped concrete blocks are stacked on a job site.', unit: 'blocks', one: 'block' },
];

const TOP_NOTE = 'The table is a top view: each number tells how many are stacked in that spot, and the front of the stack is at the bottom of the table.';
const FRONT_HINT = 'From the front, you see each column of the top view, from Left to Right. The height you see is the tallest stack in that column, because shorter stacks hide behind it.';
const SIDE_HINT = 'From the right side, you see each row of the top view as one column, and the front row is on your left. The height you see is the tallest stack in that row.';

function viewsD1(rng: Rng, name: string): Out {
  const ctx = rng.pick(CUBE_CTX);
  if (rng.chance(0.35)) {
    // A wall one unit deep, seen from the front.
    const hs = retry(() => Array.from({ length: rng.int(3, 5) }, () => rng.int(1, 4)), (v) => new Set(v).size >= 2);
    const t = hs.reduce((s, x) => s + x, 0);
    return {
      prompt: `${ctx.who(name)} They form a wall that is only one ${ctx.one} deep. The figure shows the front view. How many ${ctx.unit} are in the wall?`,
      figure: viewFigure(hs, hs.length + 2, Math.max(...hs) + 2),
      parts: [numPart(t, { suffix: ctx.unit })],
      hints: ['The wall is one deep, so every square in the front view is one whole ' + ctx.one + '.', 'Count the squares in each column, then add.'],
      solution: [`Count the squares in each column from left to right: ${hs.map((x) => `$${x}$`).join(', ')}.`, `$${hs.join(' + ')} = ${t}$`, `There are $${t}$ ${ctx.unit} in the wall.`],
    };
  }
  const R = rng.int(2, 3);
  const C = rng.int(2, 3);
  const h = randomHMap(rng, R, C, 3, false);
  const t = totalOf(h);
  const rows = h.map((row) => row.reduce((s, x) => s + x, 0));
  return {
    prompt: `${ctx.who(name)} ${TOP_NOTE} How many ${ctx.unit} are there in all?`,
    figure: topTable(h),
    parts: [numPart(t, { suffix: ctx.unit })],
    hints: ['Each number in the top view is one stack.', 'Add all the numbers in the table.'],
    solution: [...h.map((row, r) => `${ROW_NAMES[R][r]} row: $${row.join(' + ')} = ${rows[r]}$`), `Total: $${rows.join(' + ')} = ${t}$`, `There are $${t}$ ${ctx.unit} in all.`],
  };
}

/** Multiple choice with view drawings: the correct view plus distinct distractors. */
function viewChoices(rng: Rng, correct: number[], wrong: number[][]): AnswerSpec {
  const all = [correct, ...wrong];
  const W = Math.max(...all.map((v) => v.length)) + 2;
  const H = Math.max(...all.flat()) + 2;
  const size = Math.max(W, H);
  return mcFigures(rng, all.map((v, i) => ({ md: '', figure: viewFigure(v, size, size), correct: i === 0 })));
}

/** Up to three distractor views that differ from the answer and each other. */
function distinctViews(correct: number[], cands: number[][]): number[][] {
  const seen = new Set([vkey(correct)]);
  const out: number[][] = [];
  for (const v of cands) {
    if (v.every((x) => x === 0) || seen.has(vkey(v))) continue;
    seen.add(vkey(v));
    out.push(v);
    if (out.length === 3) break;
  }
  return out;
}

function frontItem(rng: Rng, name: string): Out {
  const ctx = rng.pick(CUBE_CTX);
  const { h, wrong } = retry(
    () => {
      const h = randomHMap(rng, rng.int(2, 3), rng.int(2, 3), 3, true);
      const f = frontOf(h);
      const frontRow = h[h.length - 1];
      return { h, wrong: distinctViews(f, rng.shuffle([colSums(h), f.slice().reverse(), frontRow, sideOf(h)])) };
    },
    (o) => o.wrong.length === 3,
    300,
  );
  const f = frontOf(h);
  const C = f.length;
  return {
    prompt: `${ctx.who(name)} ${TOP_NOTE} Which drawing is the front view?`,
    figure: topTable(h),
    parts: [{ answer: viewChoices(rng, f, wrong) }],
    hints: [FRONT_HINT, 'Check the left-to-right order too: the Left column of the table is on the left of the front view.'],
    solution: [
      ...COL_NAMES[C].map((cn, c) => `${cn} column: the stacks are ${h.map((row) => `$${row[c]}$`).join(', ')}, so the tallest is $${f[c]}$.`),
      `The front view has columns of heights ${f.map((x) => `$${x}$`).join(', ')} from left to right.`,
      'The answer is the drawing with those column heights.',
    ],
  };
}

function sideItem(rng: Rng, name: string): Out {
  const ctx = rng.pick(CUBE_CTX);
  const { h, wrong } = retry(
    () => {
      const h = randomHMap(rng, rng.int(2, 3), rng.int(2, 3), 3, true);
      const s = sideOf(h);
      const rightCol = h.map((row) => row[row.length - 1]).reverse();
      return { h, wrong: distinctViews(s, rng.shuffle([s.slice().reverse(), rowSums(h), rightCol, frontOf(h)])) };
    },
    (o) => o.wrong.length === 3 && vkey(sideOf(o.h)) !== vkey(sideOf(o.h).slice().reverse()),
    300,
  );
  const s = sideOf(h);
  const R = h.length;
  const rowsFrontFirst = h.map((row, r) => ({ name: ROW_NAMES[R][r], row })).reverse();
  return {
    prompt: `${ctx.who(name)} ${TOP_NOTE} Which drawing is the right side view (the view you see when you stand at the right side and look at the stack)?`,
    figure: topTable(h),
    parts: [{ answer: viewChoices(rng, s, wrong) }],
    hints: [SIDE_HINT, 'Picture walking around to the right side: the front of the stack is now on your left and the back is on your right.'],
    solution: [
      ...rowsFrontFirst.map(({ name: rn, row }, i) => `${rn} row: the stacks are ${row.map((x) => `$${x}$`).join(', ')}, so the tallest is $${s[i]}$.`),
      'From the right side, the front row is on the left and the back row is on the right.',
      `The right side view has columns of heights ${s.map((x) => `$${x}$`).join(', ')} from left to right.`,
    ],
  };
}

function matchItem(rng: Rng): Out {
  const { h, wrong } = retry(
    () => {
      const R = rng.int(2, 3);
      const C = rng.int(2, 3);
      const h = randomHMap(rng, R, C, 3, true);
      const f = vkey(frontOf(h));
      const s = vkey(sideOf(h));
      const cands: HMap[] = [h.slice().reverse(), h.map((row) => row.slice().reverse()), h.slice().reverse().map((row) => row.slice().reverse())];
      for (let i = 0; i < 12; i++) {
        const g = h.map((row) => row.slice());
        const r = rng.int(0, R - 1);
        const c = rng.int(0, C - 1);
        g[r][c] = rng.intExcept(0, 3, [g[r][c]]);
        cands.push(g);
      }
      const seen = new Set([hkey(h)]);
      const wrong: HMap[] = [];
      for (const g of rng.shuffle(cands.slice(0, 3)).concat(cands.slice(3))) {
        const ok = g.every((row) => row.some((x) => x > 0)) && g[0].every((_, c) => g.some((row) => row[c] > 0));
        // A distractor must NOT match both views.
        if (!ok || seen.has(hkey(g)) || (vkey(frontOf(g)) === f && vkey(sideOf(g)) === s)) continue;
        seen.add(hkey(g));
        wrong.push(g);
        if (wrong.length === 3) break;
      }
      return { h, wrong };
    },
    (o) => o.wrong.length === 3,
    300,
  );
  const f = frontOf(h);
  const s = sideOf(h);
  const opts = [h, ...wrong].map((g, i) => ({ g, md: '', figure: topTable(g), correct: i === 0 }));
  const answer = mcFigures(rng, opts) as Extract<AnswerSpec, { kind: 'mc' }>;
  const heights = (v: number[]) => v.map((x) => `$${x}$`).join(', ');
  // Explain each wrong choice by its letter.
  const why = answer.choices
    .filter((c) => c.id !== answer.correct)
    .map((c) => {
      const g = opts.find((o) => o.figure === c.figure)!.g;
      const fg = frontOf(g);
      const sg = sideOf(g);
      const bad: string[] = [];
      if (vkey(fg) !== vkey(f)) bad.push(`its front view would be ${heights(fg)}`);
      if (vkey(sg) !== vkey(s)) bad.push(`its side view would be ${heights(sg)}`);
      return `Choice ${c.id}): ${andList(bad)}, so it does not match.`;
    });
  return {
    prompt: 'The figure shows the front view and the right side view of a structure made of cubes. Which top view could belong to this structure? (Each number tells how many cubes are stacked in that spot; the front is at the bottom of each table.)',
    figure: twoViews(f, s),
    parts: [{ answer }],
    hints: ['For each choice, find the tallest stack in each column (Left to Right). Those heights must match the front view.', 'Then find the tallest stack in each row. Reading from Front to Back, they must match the right side view.'],
    solution: [
      `The front view has heights ${f.map((x) => `$${x}$`).join(', ')} from left to right, so the tallest stacks in the columns must be ${f.map((x) => `$${x}$`).join(', ')}.`,
      `The right side view has heights ${s.map((x) => `$${x}$`).join(', ')} from left to right, so the tallest stacks in the rows, from front to back, must be ${s.map((x) => `$${x}$`).join(', ')}.`,
      ...why,
      `The answer is choice ${answer.correct}): its rows, from back to front, are ${h.map((row) => `$${row.join(',\\ ')}$`).join('; ')}.`,
    ],
  };
}

const views = skill({
  id: 'm203-views',
  name: 'Views of 3-D objects',
  description: 'Count the cubes in a structure from a top view with stack heights, choose the front or right side view of a cube structure, and match a structure to its views.',
  outcomes: ['G3'],
  lessonId: 'm203-5-2',
  format: 'mc',
  calculator: false,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    if (d === 1) return viewsD1(rng, name);
    if (d === 2) return frontItem(rng, name);
    return rng.chance(0.5) ? sideItem(rng, name) : matchItem(rng);
  },
});

// ---------------------------------------------------------------------------
// 5.3 Exploded views and parts lists
// ---------------------------------------------------------------------------

interface KitPart {
  name: string;
  plural: string;
  qty: number[];
  /** Price range in dollars. */
  lo: number;
  hi: number;
}

interface Kit {
  kit: string;
  thing: string;
  parts: KitPart[];
}

const KITS: Kit[] = [
  {
    kit: 'a bookshelf kit',
    thing: 'bookshelf',
    parts: [
      { name: 'Side panel', plural: 'side panels', qty: [2], lo: 14, hi: 22 },
      { name: 'Shelf', plural: 'shelves', qty: [3, 4, 5], lo: 6, hi: 11 },
      { name: 'Top panel', plural: 'top panels', qty: [1], lo: 9, hi: 14 },
      { name: 'Back panel', plural: 'back panels', qty: [1], lo: 8, hi: 13 },
      { name: 'Shelf pin', plural: 'shelf pins', qty: [12, 16, 20], lo: 0.05, hi: 0.15 },
      { name: 'Wood screw', plural: 'wood screws', qty: [12, 16, 20], lo: 0.08, hi: 0.25 },
    ],
  },
  {
    kit: 'a birdhouse kit',
    thing: 'birdhouse',
    parts: [
      { name: 'Floor', plural: 'floors', qty: [1], lo: 1.5, hi: 3 },
      { name: 'Side wall', plural: 'side walls', qty: [2], lo: 2, hi: 3.5 },
      { name: 'Front panel', plural: 'front panels', qty: [1], lo: 2.5, hi: 4 },
      { name: 'Back panel', plural: 'back panels', qty: [1], lo: 2.5, hi: 4 },
      { name: 'Roof panel', plural: 'roof panels', qty: [2], lo: 3, hi: 4.5 },
      { name: 'Nail', plural: 'nails', qty: [16, 20, 24, 30], lo: 0.03, hi: 0.08 },
      { name: 'Hanger hook', plural: 'hanger hooks', qty: [1], lo: 1.25, hi: 2.5 },
    ],
  },
  {
    kit: 'a bike wheel kit',
    thing: 'bike wheel',
    parts: [
      { name: 'Rim', plural: 'rims', qty: [1], lo: 35, hi: 60 },
      { name: 'Hub', plural: 'hubs', qty: [1], lo: 40, hi: 80 },
      { name: 'Spoke', plural: 'spokes', qty: [28, 32, 36], lo: 0.45, hi: 0.95 },
      { name: 'Spoke nipple', plural: 'spoke nipples', qty: [28, 32, 36], lo: 0.1, hi: 0.3 },
      { name: 'Rim tape', plural: 'rolls of rim tape', qty: [1], lo: 4, hi: 8 },
      { name: 'Inner tube', plural: 'inner tubes', qty: [1], lo: 7, hi: 12 },
      { name: 'Tire', plural: 'tires', qty: [1], lo: 30, hi: 55 },
    ],
  },
  {
    kit: 'a small deck kit',
    thing: 'deck',
    parts: [
      { name: 'Post', plural: 'posts', qty: [4, 6], lo: 14, hi: 22 },
      { name: 'Beam', plural: 'beams', qty: [2], lo: 30, hi: 45 },
      { name: 'Joist', plural: 'joists', qty: [6, 7, 8, 9], lo: 12, hi: 19 },
      { name: 'Deck board', plural: 'deck boards', qty: [15, 16, 17, 18], lo: 8, hi: 14 },
      { name: 'Joist hanger', plural: 'joist hangers', qty: [12, 14, 16, 18], lo: 1.1, hi: 1.9 },
      { name: 'Carriage bolt', plural: 'carriage bolts', qty: [8, 12], lo: 0.9, hi: 1.6 },
    ],
  },
  {
    kit: 'a picnic table kit',
    thing: 'picnic table',
    parts: [
      { name: 'Top board', plural: 'top boards', qty: [5, 6], lo: 9, hi: 15 },
      { name: 'Seat board', plural: 'seat boards', qty: [4], lo: 8, hi: 13 },
      { name: 'Leg', plural: 'legs', qty: [4], lo: 7, hi: 12 },
      { name: 'Cross brace', plural: 'cross braces', qty: [2], lo: 5, hi: 9 },
      { name: 'Carriage bolt', plural: 'carriage bolts', qty: [8, 12], lo: 0.9, hi: 1.6 },
      { name: 'Deck screw', plural: 'deck screws', qty: [24, 32, 40], lo: 0.06, hi: 0.15 },
    ],
  },
  {
    kit: 'a raised garden bed kit',
    thing: 'garden bed',
    parts: [
      { name: 'Side board', plural: 'side boards', qty: [4, 6], lo: 9, hi: 16 },
      { name: 'End board', plural: 'end boards', qty: [4, 6], lo: 5, hi: 9 },
      { name: 'Corner post', plural: 'corner posts', qty: [4], lo: 4, hi: 8 },
      { name: 'Bottom slat', plural: 'bottom slats', qty: [5, 6, 8], lo: 3, hi: 6 },
      { name: 'Screw', plural: 'screws', qty: [24, 32, 40], lo: 0.06, hi: 0.15 },
    ],
  },
];

interface LinePart {
  label: string;
  name: string;
  plural: string;
  q: number;
  /** Unit price in cents. */
  c: number;
}

const CENTS_ENDINGS = [0, 25, 49, 50, 75, 95, 99];

function priceCents(rng: Rng, lo: number, hi: number): number {
  if (hi < 1) return rng.int(Math.round(lo * 100), Math.round(hi * 100));
  if (hi - lo < 1.5) return rng.int(Math.round(lo * 100), Math.round(hi * 100));
  return rng.int(Math.floor(lo), Math.max(Math.floor(lo), Math.floor(hi) - 1)) * 100 + rng.pick(CENTS_ENDINGS);
}

/** A parts list with letter labels as in the exploded view of the instructions. */
function makeList(rng: Rng, kit: Kit, count: number): LinePart[] {
  const chosen = kit.parts.length <= count ? kit.parts : kit.parts.filter((_, i) => i < 2 || rng.chance(count / kit.parts.length));
  const parts = chosen.slice(0, Math.max(3, Math.min(count, chosen.length)));
  return parts.map((p, i) => ({ label: 'ABCDEFG'[i], name: p.name, plural: p.plural, q: rng.pick(p.qty), c: priceCents(rng, p.lo, p.hi) }));
}

const howMany = (p: LinePart, q: number) => (q === 0 ? `no ${p.plural}` : `$${q}$ ${q === 1 ? p.name.toLowerCase() : p.plural}`);
const listTable = (ps: LinePart[], prices: boolean): TableFigure => ({
  type: 'table',
  headers: prices ? ['Label', 'Part', 'Quantity', 'Unit price'] : ['Label', 'Part', 'Quantity'],
  rows: ps.map((p) => (prices ? [p.label, p.name, String(p.q), cell(p.c / 100)] : [p.label, p.name, String(p.q)])),
});

const LIST_INTRO = (kit: Kit) => `The instructions for ${kit.kit} have an exploded view with each part labelled by a letter. The parts list is shown.`;

/** Exploded front view of a bookshelf: two side panels (A), n shelves (B) and a top (C). */
function shelfExploded(n: number): PlaneFigure {
  const c = new Canvas(14, 12);
  c.rect(1.2, 1, 0.7, 8).rect(12.1, 1, 0.7, 8);
  for (let i = 0; i < n; i++) {
    const y = 1.3 + (i * 7.1) / (n - 1);
    c.rect(4, y, 6, 0.45);
    c.seg([1.9, y + 0.22], [4, y + 0.22], { dashed: true, color: 'muted' });
    c.seg([10, y + 0.22], [12.1, y + 0.22], { dashed: true, color: 'muted' });
  }
  c.rect(1.2, 10, 11.6, 0.5);
  c.seg([1.55, 9], [1.55, 10], { dashed: true, color: 'muted' });
  c.seg([12.45, 9], [12.45, 10], { dashed: true, color: 'muted' });
  c.text([0.55, 5], 'A').text([13.6, 5], 'A').text([7, 0.75], 'B').text([7, 11.4], 'C');
  return c.build();
}

function explodedD1(rng: Rng, name: string): Out {
  const mode = rng.pick(['count', 'missing', 'times', 'figure'] as const);
  if (mode === 'figure') {
    const n = rng.int(3, 6);
    const pins = rng.chance(0.5);
    const per = rng.pick([4, 4, 6]);
    if (pins) {
      return {
        prompt: `The exploded view shows the wooden parts of a bookshelf: side panels (A), shelves (B) and a top (C). The dashed lines show where the parts join. Each shelf rests on $${per}$ metal shelf pins. How many shelf pins does the bookshelf need?`,
        figure: shelfExploded(n),
        parts: [numPart(n * per, { suffix: 'pins' })],
        hints: ['Count the parts labelled B in the exploded view.', `Each shelf needs $${per}$ pins, so multiply.`],
        solution: [`The exploded view shows $${n}$ shelves (B).`, `$${n} \\times ${per} = ${n * per}$`, `The bookshelf needs $${n * per}$ shelf pins.`],
        calculator: false,
      };
    }
    return {
      prompt: 'The exploded view shows the wooden parts of a bookshelf: side panels (A), shelves (B) and a top (C). The dashed lines show where the parts join. How many wooden parts are there in all?',
      figure: shelfExploded(n),
      parts: [numPart(n + 3, { suffix: 'parts' })],
      hints: ['Count each kind of part: A, then B, then C.', 'Add the counts.'],
      solution: [`Side panels (A): $2$. Shelves (B): $${n}$. Top (C): $1$.`, `$2 + ${n} + 1 = ${n + 3}$`, `There are $${n + 3}$ wooden parts.`],
      calculator: false,
    };
  }
  const kit = rng.pick(KITS);
  const ps = makeList(rng, kit, rng.int(4, 5));
  if (mode === 'count') {
    const t = ps.reduce((s, p) => s + p.q, 0);
    return {
      prompt: `${LIST_INTRO(kit)} How many parts are in the kit in all?`,
      figure: listTable(ps, false),
      parts: [numPart(t, { suffix: 'parts' })],
      hints: ['The Quantity column tells how many of each part there are.', 'Add all the quantities.'],
      solution: [`Add the Quantity column: $${ps.map((p) => p.q).join(' + ')} = ${t}$`, `There are $${t}$ parts in the kit.`],
      calculator: false,
    };
  }
  if (mode === 'times') {
    const k = rng.int(2, 6);
    const many = ps.filter((x) => x.q > 1);
    const p = rng.pick(many.length ? many : ps);
    return {
      prompt: `${LIST_INTRO(kit)} A shop class is building $${k}$ of these ${kit.thing === 'deck' ? 'decks' : `${kit.thing}s`}. How many ${p.plural} (part ${p.label}) do they need in all?`,
      figure: listTable(ps, false),
      parts: [numPart(p.q * k, { suffix: p.plural })],
      hints: [`Find the quantity of part ${p.label} for one ${kit.thing}.`, `Multiply by $${k}$.`],
      solution: [`One ${kit.thing} needs ${howMany(p, p.q)}.`, `$${p.q} \\times ${k} = ${p.q * k}$`, `They need $${p.q * k}$ ${p.plural}.`],
      calculator: false,
    };
  }
  // missing
  const short = rng.pick(ps);
  const got = ps.map((p) => (p === short ? p.q - rng.int(1, Math.min(3, p.q)) : p.q));
  const answer = mc(rng, short.name, rng.shuffle(ps.filter((p) => p !== short)).map((p) => p.name));
  return {
    prompt: `${LIST_INTRO(kit)} When ${name} opens the box, ${name} counts ${andList(ps.map((p, i) => howMany(p, got[i])))}. Which part is short?`,
    figure: listTable(ps, false),
    parts: [{ answer }],
    hints: ['Compare each count with the Quantity column of the parts list.', 'The part with fewer than the list says is short.'],
    solution: [
      ...ps.filter((p) => p !== short).slice(0, 2).map((p) => `${p.name}: the list says $${p.q}$ and the box has $${p.q}$. That is fine.`),
      `${short.name}: the list says $${short.q}$, but the box has only $${got[ps.indexOf(short)]}$.`,
      `The ${short.name.toLowerCase()} (part ${short.label}) is short by $${short.q - got[ps.indexOf(short)]}$.`,
    ],
  };
}

interface Seq {
  thing: string;
  steps: Array<[string, string]>;
}

const SEQUENCES: Seq[] = [
  {
    thing: 'a backyard deck',
    steps: [
      ['Pour the concrete footings', 'everything else rests on them'],
      ['Set the posts on the footings', 'the beams are bolted to the posts'],
      ['Bolt the beams to the posts', 'the joists rest on the beams'],
      ['Fasten the joists to the beams', 'the deck boards are screwed to the joists'],
      ['Screw the deck boards to the joists', 'the railing goes around the finished floor'],
      ['Attach the railing', 'it is the last part'],
    ],
  },
  {
    thing: 'a garden shed',
    steps: [
      ['Level the skids on the ground', 'the floor frame sits on them'],
      ['Build the floor frame on the skids', 'the plywood floor is nailed to it'],
      ['Nail the plywood floor to the frame', 'the walls stand on the floor'],
      ['Raise the wall frames', 'the roof trusses sit on top of the walls'],
      ['Set the roof trusses on the walls', 'the roof sheathing is nailed to the trusses'],
      ['Nail the roof sheathing to the trusses', 'the shingles are nailed to the sheathing'],
      ['Nail on the shingles', 'they are the outside layer'],
    ],
  },
  {
    thing: 'an insulated basement wall',
    steps: [
      ['Frame the wall with studs', 'everything else fits on or between the studs'],
      ['Fit insulation between the studs', 'the vapour barrier covers the insulation'],
      ['Staple the vapour barrier over the studs', 'the drywall goes over the vapour barrier'],
      ['Screw the drywall to the studs', 'the joints can only be taped once the drywall is up'],
      ['Tape and mud the drywall joints', 'the joints must be smooth before painting'],
      ['Prime and paint the wall', 'paint is the outside layer'],
    ],
  },
  {
    thing: 'a bike wheel',
    steps: [
      ['Put the spokes through the hub', 'the hub is the centre that the spokes come out of'],
      ['Thread the spokes into the rim with spoke nipples', 'the rim tape covers the spoke holes in the rim'],
      ['Put the rim tape over the spoke holes', 'the tape protects the tube from the spoke ends'],
      ['Fit the inner tube and the tire on the rim', 'the tube sits inside the tire on the rim'],
      ['Pump up the tire', 'the tire must be on the rim first'],
    ],
  },
  {
    thing: 'a laminate floor',
    steps: [
      ['Pull up the old carpet', 'the subfloor must be bare'],
      ['Level the subfloor', 'the underlay must lie flat on it'],
      ['Roll out the foam underlay', 'the planks sit on the underlay'],
      ['Click the laminate planks together', 'the baseboards cover the edges of the planks'],
      ['Nail the baseboards to the wall', 'they go on last, over the edges'],
    ],
  },
  {
    thing: 'a shingled roof',
    steps: [
      ['Set the roof trusses on the walls', 'they hold up everything else'],
      ['Nail the plywood sheathing to the trusses', 'the underlayment is rolled out over the plywood'],
      ['Roll out the underlayment', 'the shingles go over the underlayment'],
      ['Nail on the shingles', 'the ridge cap covers the top edges of the shingles'],
      ['Nail the ridge cap along the peak', 'it is the last layer at the top'],
    ],
  },
];

function orderItem(rng: Rng, count: number): Out {
  const seq = rng.pick(SEQUENCES.filter((s) => s.steps.length >= count));
  const idx = rng
    .sample(
      seq.steps.map((_, i) => i),
      count,
    )
    .sort((a, b) => a - b);
  const steps = idx.map((i) => seq.steps[i]);
  const shown = retry(
    () => rng.shuffle(steps),
    (s) => s.some((x, i) => x !== steps[i]),
  );
  const items: Choice[] = shown.map(([md], i) => ({ id: 'abcdefg'[i], md }));
  const idOf = (st: [string, string]) => items[shown.indexOf(st)].id;
  return {
    prompt: `The exploded view of ${seq.thing} shows how its parts fit together. Put these steps in the order you would do them, from first to last.`,
    parts: [{ answer: { kind: 'order', items, correctOrder: steps.map(idOf) } }],
    hints: ['A part can only go on once the part it sits on, or attaches to, is already in place.', 'Start with the part that holds everything else up, and finish with the outside layer.'],
    solution: [...steps.map(([md, why], i) => `${i + 1}. ${md}: ${why}.`), `The order is: ${steps.map(([md]) => md.charAt(0).toLowerCase() + md.slice(1)).join(', then ')}.`],
    calculator: false,
  };
}

function costSolution(ps: LinePart[]): { lines: string[]; total: number } {
  const lines = ps.map((p) => `${p.name}: $${p.q} \\times ${mv(p.c / 100)} = ${mv((p.q * p.c) / 100)}$`);
  const total = ps.reduce((s, p) => s + p.q * p.c, 0) / 100;
  return { lines, total };
}

function explodedD2(rng: Rng, name: string): Out {
  const mode = rng.pick(['cost', 'cost', 'order', 'scale'] as const);
  if (mode === 'order') return orderItem(rng, 4);
  if (mode === 'scale') {
    const item = rng.pick([
      { what: 'a birdhouse', part: 'the roof panel', n: [2, 4, 5], lo: 15, hi: 30 },
      { what: 'a bookshelf', part: 'a shelf', n: [10, 20], lo: 60, hi: 120 },
      { what: 'a picnic table', part: 'a top board', n: [20, 25], lo: 150, hi: 240 },
      { what: 'a garden bed', part: 'a side board', n: [20, 25], lo: 120, hi: 240 },
      { what: 'a toolbox', part: 'the handle', n: [2, 4, 5], lo: 30, hi: 60 },
    ]);
    const n = rng.pick(item.n);
    const d = clean(Math.round(rng.float(item.lo / n, item.hi / n, 2) * 2) / 2);
    const real = clean(d * n);
    return {
      prompt: `The exploded view of ${item.what} in a set of plans is drawn to a scale of $1 : ${n}$. On the drawing, ${item.part} is ${M(d, 'cm')} long. How long is the real part, in centimetres?`,
      parts: [ans(real, 'cm')],
      hints: [`A scale of $1 : ${n}$ means real lengths are $${n}$ times the drawing lengths.`, `Multiply ${M(d, 'cm')} by ${n}.`],
      solution: [`Real length $= ${num(d)} \\times ${n} = ${num(real)}$`, `${cap(item.part)} is ${M(real, 'cm')} long.`],
      calculator: false,
    };
  }
  const kit = rng.pick(KITS);
  const ps = makeList(rng, kit, rng.int(4, 5));
  const { lines, total } = costSolution(ps);
  return {
    prompt: `${LIST_INTRO(kit)} ${name} wants to buy every part separately. What is the total cost of the parts for one ${kit.thing}, ${CENT}? (Ignore tax.)`,
    figure: listTable(ps, true),
    parts: [moneyPart(total)],
    hints: ['For each part, multiply the quantity by the unit price.', 'Then add the costs of all the parts.'],
    solution: [...lines, `Add: $${ps.map((p) => mv((p.q * p.c) / 100)).join(' + ')} = ${mv(total)}$`, `The parts cost ${money(total)}.`],
  };
}

function explodedD3(rng: Rng, name: string): Out {
  const mode = rng.pick(['tax', 'replace', 'compare', 'order'] as const);
  if (mode === 'order') return orderItem(rng, rng.int(5, 6));
  const kit = rng.pick(KITS);
  const ps = makeList(rng, kit, rng.int(4, 5));
  const { lines, total } = costSolution(ps);
  if (mode === 'tax') {
    const k = rng.int(2, 4);
    const sub = clean(total * k);
    const tax = sub * 0.05;
    const grand = sub + tax;
    return {
      prompt: `${LIST_INTRO(kit)} A youth group is buying the parts to build $${k}$ ${kit.thing === 'bike wheel' ? 'bike wheels' : `${kit.thing}s`}. Add $5\\%$ GST to the total. What is the total cost, ${CENT}?`,
      figure: listTable(ps, true),
      parts: [moneyPart(grand)],
      hints: ['Find the cost of the parts for one, then multiply by the number they are building.', 'GST is $5\\%$ of the cost: multiply by $0.05$ and add it, or multiply the cost by $1.05$.'],
      solution: [...lines, `One ${kit.thing}: ${money(total)}`, `For $${k}$: $${mv(total)} \\times ${k} = ${mv(sub)}$`, `GST: $${mv(sub)} \\times 0.05 = ${num(tax, 4)}$`, `Total: $${mv(sub)} + ${num(tax, 4)} = ${num(grand, 4)}$`, `The total cost is ${money(grand)}.`],
    };
  }
  if (mode === 'replace') {
    const [p1, p2] = rng.sample(ps, 2);
    const m1 = rng.int(1, Math.min(2, p1.q));
    const m2 = rng.int(1, Math.min(p2.q, p2.q > 6 ? 6 : 2));
    const fee = rng.pick([4.95, 5.99, 7.5, 9.95]);
    const c1 = (m1 * p1.c) / 100;
    const c2 = (m2 * p2.c) / 100;
    const grand = c1 + c2 + fee;
    const got = ps.map((p) => (p === p1 ? p.q - m1 : p === p2 ? p.q - m2 : p.q));
    return {
      prompt: `${LIST_INTRO(kit)} When ${name} opens the box, ${name} counts ${andList(ps.map((p, i) => howMany(p, got[i])))}. The store sends missing parts at the unit prices in the list, plus a shipping fee of ${money(fee)}. How much will the missing parts cost, ${CENT}?`,
      figure: listTable(ps, true),
      parts: [moneyPart(grand)],
      hints: ['Compare each count with the Quantity column to find what is missing and how many.', 'Multiply each missing number by its unit price, add, then add the shipping fee once.'],
      solution: [
        `Missing: ${howMany(p1, m1)} (the list says $${p1.q}$, the box has $${p1.q - m1}$) and ${howMany(p2, m2)} (the list says $${p2.q}$, the box has $${p2.q - m2}$).`,
        `${p1.name}: $${m1} \\times ${mv(p1.c / 100)} = ${mv(c1)}$`,
        `${p2.name}: $${m2} \\times ${mv(p2.c / 100)} = ${mv(c2)}$`,
        `Total: $${mv(c1)} + ${mv(c2)} + ${mv(fee)} = ${mv(grand)}$`,
        `The missing parts will cost ${money(grand)}.`,
      ],
    };
  }
  const kitPrice = retry(
    () => Math.round(total * rng.float(0.78, 0.92, 2)) - 0.01,
    (x) => x > 1 && x < total - 1,
  );
  const diff = total - kitPrice;
  return {
    prompt: `${LIST_INTRO(kit)} A hardware store sells the complete kit for ${money(kitPrice)}. How much more would it cost to buy all the parts separately at the unit prices shown? Give your answer ${CENT}.`,
    figure: listTable(ps, true),
    parts: [moneyPart(diff)],
    hints: ['Find the total cost of the parts: multiply each quantity by its unit price and add.', 'Subtract the price of the complete kit.'],
    solution: [...lines, `Parts total: $${ps.map((p) => mv((p.q * p.c) / 100)).join(' + ')} = ${mv(total)}$`, `Difference: $${mv(total)} - ${mv(kitPrice)} = ${mv(diff)}$`, `Buying the parts separately costs ${money(diff)} more.`],
  };
}

const explodedViews = skill({
  id: 'm203-exploded-views',
  name: 'Exploded views and parts lists',
  description: 'Read an exploded view and its parts list to count parts, find a missing part, put assembly steps in order, find a real part length from a scale diagram, and find the cost of a kit.',
  outcomes: ['G4'],
  lessonId: 'm203-5-3',
  calculator: true,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    if (d === 1) return { calculator: false, ...explodedD1(rng, name) };
    if (d === 2) return explodedD2(rng, name);
    return explodedD3(rng, name);
  },
});

export const SCALE_SKILLS: SkillDef[] = [scaleLength, scaleAreaVolume, views, explodedViews];
