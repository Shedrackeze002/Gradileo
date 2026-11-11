/** More Mathematics Topics, lesson 1.7: the shape of a distribution, with histograms and dot plots. */
import { fixedChoice, numPart, part, skill, type GenOutput } from '../../helpers.ts';
import { fmt } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, Figure, SkillDef } from '../../../types.ts';

type Out = GenOutput;
type Pt = [number, number];
type Shape = 'symmetric' | 'right' | 'left' | 'uniform' | 'bimodal';

interface Ctx {
  /** "the masses of the parcels a courier delivered" */
  what: string;
  items: string;
  /** "took", so that "took less than 60 s" reads well */
  verb: string;
  label: string;
  unit: string;
  lo: number[];
  w: number[];
}

const CONTEXTS: Ctx[] = [
  { what: 'the masses of the parcels a courier delivered one morning', verb: 'have a mass of', items: 'parcels', label: 'Mass (kg)', unit: 'kg', lo: [0, 2], w: [2, 5] },
  { what: 'the times a group of students took to run one lap', items: 'students', verb: 'took', label: 'Time (s)', unit: 's', lo: [50, 60, 70], w: [5, 10] },
  { what: 'the heights of the seedlings in a greenhouse tray', verb: 'have a height of', items: 'seedlings', label: 'Height (cm)', unit: 'cm', lo: [0, 4, 10], w: [2, 4] },
  { what: 'the scores of a class on a quiz out of 70', items: 'students', verb: 'scored', label: 'Score', unit: 'marks', lo: [0], w: [10] },
  { what: 'the lengths of the phone calls to a help desk one afternoon', verb: 'lasted', items: 'calls', label: 'Length (min)', unit: 'min', lo: [0], w: [2, 3, 5] },
  { what: 'the daily high temperatures in a town over several weeks', verb: 'had a high of', items: 'days', label: 'Temperature (°C)', unit: '°C', lo: [0, 5, 10], w: [2, 5] },
];

const BASE: Record<Shape, number[][]> = {
  symmetric: [[1, 3, 6, 9, 6, 3, 1], [2, 4, 7, 10, 7, 4, 2], [1, 2, 5, 8, 8, 5, 2, 1], [2, 5, 9, 5, 2]],
  right: [[9, 7, 5, 3, 2, 1, 1], [4, 10, 7, 5, 3, 2, 1], [8, 6, 4, 2, 1, 1], [5, 11, 8, 4, 2, 1, 1]],
  left: [],
  uniform: [[5, 5, 5, 5, 5, 5], [4, 4, 4, 4, 4, 4, 4], [6, 6, 6, 6, 6], [3, 3, 3, 3, 3, 3, 3]],
  bimodal: [[2, 7, 4, 1, 4, 8, 2], [3, 9, 4, 2, 5, 9, 3], [1, 6, 3, 1, 3, 7, 2], [2, 8, 3, 1, 1, 4, 8, 2]],
};
BASE.left = BASE.right.map((f) => [...f].reverse());

const freqs = (rng: Rng, shape: Shape) => [...rng.pick(BASE[shape])];

function histogram(c: Ctx, lo: number, w: number, f: number[]): Figure {
  const top = Math.max(...f);
  return {
    type: 'plane',
    grid: { xMin: lo, xMax: lo + w * f.length, yMin: 0, yMax: top + 1, xStep: w, yStep: 1, xLabel: c.label, yLabel: 'Frequency' },
    polylines: f.map((y, i) => ({ points: [[lo + i * w, 0], [lo + i * w, y], [lo + (i + 1) * w, y], [lo + (i + 1) * w, 0]] as Pt[], color: 'brand' as const, fill: true })),
  };
}

function dotPlot(c: Ctx, lo: number, f: number[]): Figure {
  return { type: 'dotPlot', values: f.flatMap((n, i) => Array.from({ length: n }, () => lo + i)), min: lo, max: lo + f.length - 1, label: c.label };
}

const SHAPES = ['Symmetric', 'Skewed to the right', 'Skewed to the left', 'Uniform'];
const SHAPE_WHY: Record<Shape, string> = {
  symmetric: 'The left half and the right half are close to mirror images, with the peak in the middle.',
  right: 'Most of the data are on the left, and a long tail stretches out to the right. A distribution is named for the side its tail is on.',
  left: 'Most of the data are on the right, and a long tail stretches out to the left. A distribution is named for the side its tail is on.',
  uniform: 'Every bar is the same height, so the data are spread evenly with no peak.',
  bimodal: 'There are two separate peaks with a dip between them.',
};

function distributionShape(rng: Rng, d: Difficulty): Out {
  const c = rng.pick(CONTEXTS);
  const lo = rng.pick(c.lo);
  const w = rng.pick(c.w);
  if (d === 1) {
    const shape = rng.pick<Shape>(['symmetric', 'right', 'left', 'uniform']);
    const f = freqs(rng, shape);
    const index = ['symmetric', 'right', 'left', 'uniform'].indexOf(shape);
    return {
      prompt: `The histogram shows ${c.what}. Which word best describes the shape of the distribution?`,
      parts: [part(fixedChoice(SHAPES, index))],
      figure: histogram(c, lo, w, f),
      hints: ['Look for the peak, and then for a tail: a side where the bars get lower and stretch further out.', 'A skewed distribution is named for the side its tail is on, not the side its peak is on.'],
      solution: [SHAPE_WHY[shape], `The distribution is ${SHAPES[index]!.toLowerCase()}.`],
    };
  }
  if (d === 2) {
    const shape = rng.pick<Shape>(['symmetric', 'right', 'left', 'uniform', 'bimodal', 'bimodal']);
    const f = freqs(rng, shape);
    const index = shape === 'bimodal' ? 1 : shape === 'uniform' ? 2 : 0;
    return {
      prompt: `The dot plot shows ${c.what}. How many modes (peaks) does the distribution have?`,
      parts: [part(fixedChoice(['One mode', 'Two modes', 'No mode: it is uniform'], index))],
      figure: dotPlot(c, lo, f),
      hints: ['A mode shows as a peak: a value with a taller stack of dots than the values beside it.', 'Count the separate peaks. If every stack is the same height, there is no peak at all.'],
      solution: [SHAPE_WHY[shape], shape === 'bimodal' ? 'The distribution has two modes: it is bimodal.' : shape === 'uniform' ? 'The distribution is uniform, with no mode.' : 'The distribution has one mode: it is unimodal.'],
    };
  }
  const shape = rng.pick<Shape>(['symmetric', 'right', 'left']);
  const f = freqs(rng, shape);
  const index = shape === 'right' ? 0 : shape === 'left' ? 1 : 2;
  return {
    prompt: `The histogram shows ${c.what}. Without calculating, how do the mean and the median compare?`,
    parts: [part(fixedChoice(['The mean is greater than the median', 'The mean is less than the median', 'The mean and the median are about equal'], index))],
    figure: histogram(c, lo, w, f),
    hints: ['First decide the shape: symmetric, skewed to the right or skewed to the left.', 'The few extreme values in a tail pull the mean towards them. The median is hardly affected.'],
    solution: [
      SHAPE_WHY[shape],
      shape === 'symmetric' ? 'With no tail pulling to one side, the mean and the median are about equal.' : `The tail on the ${shape} pulls the mean ${shape === 'right' ? 'up' : 'down'}, so the mean is ${shape === 'right' ? 'greater' : 'less'} than the median.`,
    ],
  };
}

function histogramFrequencies(rng: Rng, d: Difficulty): Out {
  const c = rng.pick(CONTEXTS);
  const lo = rng.pick(c.lo);
  const w = rng.pick(c.w);
  const f = freqs(rng, rng.pick<Shape>(['symmetric', 'right', 'left', 'bimodal'])).map((n) => Math.max(1, n + rng.int(-1, 1)));
  const figure = histogram(c, lo, w, f);
  const edge = (i: number) => lo + i * w;
  const total = f.reduce((s, n) => s + n, 0);
  const note = `Each bar includes its left end but not its right end, so a value of $${edge(1)}$ is counted in the second bar.`;
  if (d === 1) {
    const i = rng.int(0, f.length - 1);
    return {
      prompt: `The histogram shows ${c.what}. How many ${c.items} are in the interval from $${edge(i)}$ to $${edge(i + 1)}$ ${c.unit}?`,
      parts: [numPart(f[i]!, { suffix: c.items })],
      figure,
      hints: ['Find the bar that sits over the interval on the horizontal axis.', 'Read the height of the bar on the frequency axis.'],
      solution: [`The bar from $${edge(i)}$ to $${edge(i + 1)}$ reaches a frequency of $${f[i]}$.`, `There are $${f[i]}$ ${c.items} in that interval.`],
    };
  }
  const cut = rng.int(2, f.length - 2);
  const below = f.slice(0, cut).reduce((s, n) => s + n, 0);
  if (d === 2) {
    if (rng.chance(0.3)) {
      return {
        prompt: `The histogram shows ${c.what}. How many ${c.items} are there altogether?`,
        parts: [numPart(total, { suffix: c.items })],
        figure,
        hints: ['Each bar shows how many values are in its interval.', 'Add the heights of all the bars.'],
        solution: [`$${f.join(' + ')} = ${total}$`, `There are $${total}$ ${c.items} altogether.`],
      };
    }
    const more = rng.chance(0.5);
    return {
      prompt: `The histogram shows ${c.what}. How many ${c.items} ${c.verb} ${more ? `$${edge(cut)}$ ${c.unit} or more` : `less than $${edge(cut)}$ ${c.unit}`}? ${note}`,
      parts: [numPart(more ? total - below : below, { suffix: c.items })],
      figure,
      hints: [`Find $${edge(cut)}$ on the horizontal axis. Use every bar to the ${more ? 'right' : 'left'} of it.`, 'Add the heights of those bars.'],
      solution: [`$${(more ? f.slice(cut) : f.slice(0, cut)).join(' + ')} = ${more ? total - below : below}$`, `$${more ? total - below : below}$ ${c.items} ${c.verb} ${more ? `$${edge(cut)}$ ${c.unit} or more` : `less than $${edge(cut)}$ ${c.unit}`}.`],
    };
  }
  const pct = (below / total) * 100;
  return {
    prompt: `The histogram shows ${c.what}. What percent of the ${c.items} ${c.verb} less than $${edge(cut)}$ ${c.unit}? Give your answer to 1 decimal place. ${note}`,
    parts: [numPart(pct, { decimals: 1, suffix: '%' })],
    figure,
    hints: [`Add the bars to the left of $${edge(cut)}$, then add all the bars to find the total.`, 'Percent $=$ part $\\div$ total $\\times 100$.'],
    solution: [`Less than $${edge(cut)}$: $${f.slice(0, cut).join(' + ')} = ${below}$`, `Total: $${f.join(' + ')} = ${total}$`, `$\\dfrac{${below}}{${total}} \\times 100 \\approx ${fmt(pct, 1)}\\%$`],
    calculator: true,
  };
}

export const DISTRIBUTION_SKILLS: SkillDef[] = [
  skill({ id: 'mx-distribution-shape', name: 'The shape of a distribution', description: 'Describe a distribution as symmetric, skewed or uniform, count its modes, and compare its mean and median from its shape', outcomes: ['ST7'], lessonId: 'mx-1-7', format: 'mc', gen: distributionShape }),
  skill({ id: 'mx-histogram-frequencies', name: 'Reading histograms', description: 'Read frequencies, totals and percents from a histogram with equal intervals', outcomes: ['ST7'], lessonId: 'mx-1-7', gen: histogramFrequencies }),
];
