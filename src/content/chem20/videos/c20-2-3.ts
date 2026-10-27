import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { boyleGraph, gasBox, tag } from './lib/c20-2a-figures.ts';

// The same air at 100, 200 and 400 kPa: each doubling of the pressure halves the volume.
const syringes = figure(
  's',
  [
    gasBox({ name: 'a', at: [0, 0], w: 3.2, h: 4.4, count: 6, r: 0.22, speed: 0, seed: 41, top: 'piston', walls: 5.4 }),
    tag('a-l', [1.6, -0.3], '\\begin{gathered}100\\ \\text{kPa}\\\\ 2.00\\ \\text{L}\\end{gathered}', { place: 'below', group: 'a-p' }),
    gasBox({ name: 'b', at: [4.4, 0], w: 3.2, h: 2.2, count: 6, r: 0.22, speed: 0, seed: 42, top: 'piston', walls: 5.4 }),
    tag('b-l', [6, -0.3], '\\begin{gathered}200\\ \\text{kPa}\\\\ 1.00\\ \\text{L}\\end{gathered}', { place: 'below', group: 'b-p' }),
    gasBox({ name: 'c', at: [8.8, 0], w: 3.2, h: 1.1, count: 6, r: 0.22, speed: 0, seed: 43, top: 'piston', walls: 5.4 }),
    tag('c-l', [10.4, -0.3], '\\begin{gathered}400\\ \\text{kPa}\\\\ 0.50\\ \\text{L}\\end{gathered}', { place: 'below', group: 'c-p' }),
  ],
  480,
);

const graph = figure('g', [boyleGraph()], 500);

const video: Explainer = {
  id: 'c20-2-3',
  lessonId: 'c20-2-3',
  title: "Boyle's Law, Part 1: Pressure and Volume",
  thumbnailTitle: 'Pressure and Volume',
  thumbnail: 'g',
  summary:
    "For a fixed amount of gas at constant temperature, doubling the pressure halves the volume, and pressure times volume stays the same. A graph of volume against pressure is a curve that falls steeply and levels off. This is Boyle's law: P₁V₁ = P₂V₂.",
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Forms of Matter: Gases · Part 1', title: 'Pressure and Volume', subtitle: 'Squeeze a gas, and it shrinks' }],
      lines: [
        { say: 'Hold a finger over the tip of a syringe and push the plunger in. The trapped air is squeezed into a smaller space, and the further you push, the harder it pushes back.', show: 'title' },
        { say: 'In this lesson, you will see how the volume of a gas depends on the pressure on it, explain why, and use Boyle’s law to find a new volume or pressure. This first part looks at the measurements, and the law.' },
      ],
    },
    {
      chapter: 'Measuring pressure and volume',
      layout: 'split',
      leftWidth: 560,
      left: [syringes],
      right: [
        {
          kind: 'table',
          id: 't',
          head: ['Pressure (kPa)', 'Volume (L)', '$P \\times V$ (kPa·L)'],
          rows: [
            ['$50$', '$4.00$', '$200$'],
            ['$80$', '$2.50$', '$200$'],
            ['$100$', '$2.00$', '$200$'],
            ['$200$', '$1.00$', '$200$'],
            ['$250$', '$0.80$', '$200$'],
            ['$400$', '$0.50$', '$200$'],
          ],
        },
      ],
      lines: [
        { say: 'Imagine a sample of air trapped in a gas syringe, sealed at the tip. No gas can get in or out, and the temperature is kept the same throughout.' },
        { say: 'The pressure on the gas is raised step by step, and its volume is measured each time.', show: ['t', 't.0', 't.1', 't.2', 't.3', 't.4', 't.5'] },
        { say: 'When the pressure doubles, from one hundred to two hundred kilopascals, the volume halves, from two point zero zero to one point zero zero litres.', show: ['s.a-box', 's.a-piston', 's.a-p', 's.a-l', 's.b-box', 's.b-piston', 's.b-p', 's.b-l'], focus: ['t.2', 't.3'] },
        { say: 'When the pressure is multiplied by four, from one hundred to four hundred kilopascals, the volume is divided by four.', show: ['s.c-box', 's.c-piston', 's.c-p', 's.c-l'], focus: ['t.2', 't.5'] },
        { say: 'And in every row, the pressure times the volume comes to the same number: two hundred kilopascal litres.', focus: 't' },
      ],
    },
    {
      chapter: 'The graph',
      layout: 'split',
      leftWidth: 760,
      left: [graph],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['From A to B, the pressure **doubles** and the volume **halves**.', 'From B to C, the same again.', 'The curve **levels off**: it comes closer and closer to the pressure axis, but never reaches it.'],
        },
      ],
      lines: [
        { say: 'On a graph of volume against pressure, the points lie on a curve that falls steeply at first, and then levels off.', show: ['g.grid', 'g.axes', 'g.pv'] },
        { say: 'From A to B, the pressure doubles, from fifty to one hundred kilopascals, and the volume halves, from four litres to two.', show: ['g.A', 'g.B', 'b.0'], focus: ['g.A', 'g.B'] },
        { say: 'From B to C, the same thing happens again: the pressure doubles, and the volume halves, to one litre.', show: ['g.C', 'b.1'], focus: ['g.B', 'g.C'] },
        { say: 'Each doubling of the pressure squeezes the gas by a smaller amount in litres, which is why the curve flattens out. It comes closer and closer to the pressure axis, but never reaches it.', show: 'b.2', focus: 'g.pv' },
      ],
    },
    {
      chapter: 'Boyle’s law',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'inv', tone: 'definition', title: 'Inversely proportional', md: 'Two quantities are **inversely proportional** when their product stays the same. If one is multiplied by a factor, the other is divided by the same factor.' },
        { kind: 'callout', id: 'law', tone: 'key', title: 'Boyle’s law', md: 'For a fixed amount of gas at constant temperature, the volume is inversely proportional to the pressure.' },
        { kind: 'math', id: 'm', size: 'xl', lines: ['P_1V_1 = P_2V_2'] },
      ],
      lines: [
        { say: 'Two quantities are inversely proportional when their product stays the same. If one is multiplied by a factor, the other is divided by the same factor. Double one, and the other halves. Triple one, and the other falls to a third.', show: 'inv' },
        { say: 'Boyle’s law says that for a fixed amount of gas at constant temperature, the volume is inversely proportional to the pressure.', show: 'law' },
        { say: 'In symbols, P one V one equals P two V two. P one and V one are the pressure and volume before a change. P two and V two are the pressure and volume after it.', caption: 'In symbols, P₁V₁ = P₂V₂. P₁ and V₁ are the pressure and volume before a change. P₂ and V₂ are the pressure and volume after it.', show: 'm', focus: 'm' },
        { say: 'The law is named after Robert Boyle, who published his measurements on air trapped in a glass tube in sixteen sixty-two.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A gas has a volume of $6.0\\ \\text{L}$. The pressure on it is **tripled**, while the temperature and the amount of gas stay the same. What is its new volume?',
          choices: ['$18\\ \\text{L}$', '$3.0\\ \\text{L}$', '$9.0\\ \\text{L}$', '$2.0\\ \\text{L}$'],
          answer: 3,
          working: 'Volume is inversely proportional to pressure: when the pressure is multiplied by $3$, the volume is divided by $3$. $6.0 \\div 3 = 2.0\\ \\text{L}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A gas has a volume of six point zero litres. The pressure on it is tripled, while the temperature and the amount of gas stay the same. What is its new volume? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, two point zero litres. Volume is inversely proportional to pressure, so tripling the pressure divides the volume by three. Choice A multiplies by three instead: a higher pressure can never give a larger volume.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'sum',
          check: true,
          items: [
            'At constant temperature, doubling the pressure on a gas **halves** its volume.',
            'Pressure and volume are **inversely proportional**: their product stays the same.',
            'A graph of volume against pressure falls steeply, then levels off.',
            '**Boyle’s law**: $P_1V_1 = P_2V_2$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. At constant temperature, doubling the pressure on a gas halves its volume.', show: 'sum.0' },
        { say: 'Pressure and volume are inversely proportional: their product stays the same.', show: 'sum.1' },
        { say: 'A graph of volume against pressure falls steeply, then levels off.', show: 'sum.2' },
        { say: 'And Boyle’s law says P one V one equals P two V two. In part two, you will see why squeezing a gas raises its pressure. See you there!', caption: 'And Boyle’s law says P₁V₁ = P₂V₂. In part two, you will see why squeezing a gas raises its pressure. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
