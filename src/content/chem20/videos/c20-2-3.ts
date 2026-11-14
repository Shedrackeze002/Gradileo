import type { Explainer, ParticlesEl } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { boyleGraph } from './lib/c20-2a-figures.ts';

// The same air at 100, 200 and 400 kPa: a piston squeezes it, the gauge reads the pressure and the
// particles (simulated in src/video/particles.ts) are crowded into less space, hitting the walls
// more often. Each doubling of the pressure halves the volume.
const syringe: ParticlesEl = {
  kind: 'particles',
  id: 's',
  boxes: [{ id: 'a', state: 'gas', n: 16, width: 14, height: 16, piston: true }],
  gauge: { box: 'a', start: 100 },
  volume: { box: 'a', start: 2 },
  clips: {
    double: { phases: [{ dur: 5, lid: { a: 0.5 } }] },
    again: { phases: [{ dur: 4, lid: { a: 0.25 } }] },
  },
  height: 600,
};

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
      leftWidth: 600,
      left: [syringe],
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
        { say: 'Imagine a sample of air trapped in a gas syringe, sealed at the tip. No gas can get in or out, and the temperature is kept the same throughout.', show: ['s', 's.gauge', 's.volume'] },
        { say: 'The gauge reads the pressure on the gas: one hundred kilopascals to start with, and the gas takes up two point zero zero litres.', focus: 's.gauge' },
        { say: 'The pressure is raised step by step, and the volume is measured each time.', show: ['t', 't.0', 't.1', 't.2', 't.3', 't.4', 't.5'] },
        { say: 'Watch the walls as well. Each flash is a particle hitting them, and the number under the syringe counts the hits each second.', show: ['s.hits', 's.rate'] },
        { say: 'Watch the pressure double, from one hundred to two hundred kilopascals. The volume halves, from two point zero zero to one point zero zero litres.', play: 's.double', focus: ['t.2', 't.3'] },
        { say: 'Now multiply the pressure by four in all, to four hundred kilopascals. The volume is divided by four, to zero point five zero litres.', play: 's.again', focus: ['t.2', 't.5'] },
        { say: 'Squeezed into a quarter of the space, the particles hit the walls far more often. In part two, you will see how those hits make the pressure.', focus: 's.rate' },
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
