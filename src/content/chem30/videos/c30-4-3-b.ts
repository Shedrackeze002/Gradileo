import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { tag, timeGraph } from './lib/c30-4a-figures.ts';

// The lesson's graph: H₂ + I₂ ⇌ 2HI at equilibrium (Kc = 49.0) with [H₂] = [I₂] = 0.10 and
// [HI] = 0.70 mol/L. At 20 s hydrogen is added, raising [H₂] to 0.30; the system shifts right
// until [H₂] ≈ 0.25, [I₂] ≈ 0.05 and [HI] ≈ 0.80 mol/L.
const flat = (v: number): [number, number][] => [[0, v], [5, v], [10, v], [15, v], [19.99, v]];
const tail = (v: number): [number, number][] => [[40, v], [45, v], [50, v], [55, v], [60, v]];
const hi = timeGraph({
  x: [0, 60],
  y: [0, 1],
  xStep: 10,
  yStep: 0.1,
  titles: { x: '\\text{Time (s)}', y: '\\text{Concentration (mol/L)}' },
  curves: [
    { id: 'hi', points: [...flat(0.7), [20, 0.7], [22, 0.718], [24, 0.735], [26, 0.749], [28, 0.762], [30, 0.773], [32, 0.781], [34, 0.788], [36, 0.793], [38, 0.796], ...tail(0.797)], tone: 'opp', label: '[\\ce{HI}]', at: [50, 0.797], place: 'above' },
    { id: 'i2', points: [...flat(0.1), [20, 0.1], [22, 0.091], [24, 0.083], [26, 0.075], [28, 0.069], [30, 0.064], [32, 0.059], [34, 0.056], [36, 0.053], [38, 0.052], ...tail(0.052)], tone: 'theta', label: '[\\ce{I2}]', at: [50, 0.052], place: 'above' },
    { id: 'h2', points: [...flat(0.1), [20, 0.3], [22, 0.291], [24, 0.283], [26, 0.275], [28, 0.269], [30, 0.264], [32, 0.259], [34, 0.256], [36, 0.253], [38, 0.252], ...tail(0.252)], tone: 'adj', label: '[\\ce{H2}]', at: [50, 0.252], place: 'above' },
  ],
  marks: [{ id: 'add', x: 20 }],
});
const graph = figure('g', [hi.part, tag('start', hi.g.map(1, 0.11), '[\\ce{H2}] = [\\ce{I2}]', { place: 'above right', tone: 'muted' })], 520);

const video: Explainer = {
  id: 'c30-4-3-b',
  lessonId: 'c30-4-3',
  title: "Le Châtelier's Principle, Part 2: Reading a Shift",
  thumbnailTitle: 'Reading a Shift',
  thumbnail: 'g',
  summary:
    'When hydrogen is added to H₂ + I₂ ⇌ 2HI at equilibrium, [H₂] jumps from 0.10 to 0.30 mol/L and the system shifts right: [H₂] falls only to about 0.25, [I₂] falls to about 0.05 and [HI] rises to about 0.80 mol/L. Just after the stress the reaction quotient Q = (0.70)² / ((0.30)(0.10)) = 16.3 is less than Kc = 49.0, so the forward reaction runs faster until the ratio is back at 49. Adding thiocyanate ions to the blood-red iron(III) thiocyanate equilibrium shifts it right and darkens the colour.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Equilibrium Focusing on Acid–Base Systems · Part 2', title: 'Reading a Shift', subtitle: 'What happens, and why' }],
      lines: [
        { say: 'Adding a reactant shifts an equilibrium to the right. But what does that look like, and why does it happen at all?', show: 'title' },
        { say: 'In this part, you will follow a shift on a graph of concentration against time, explain it with the reaction quotient, and predict a change of colour.' },
      ],
    },
    {
      chapter: 'Adding hydrogen',
      layout: 'split',
      leftWidth: 580,
      left: [graph],
      right: [
        { kind: 'math', id: 'eq', size: 'md', align: 'left', lines: ['\\ce{H2(g) + I2(g) <=> 2HI(g)}', 'K_c = 49.0'] },
        { kind: 'bullets', id: 'b', items: ['At $20\\ \\text{s}$, $[\\ce{H2}]$ jumps from $0.10$ to $0.30$: the **stress**.', 'Shift right: $[\\ce{H2}]$ falls to about $0.25$, still higher than before.', '$[\\ce{I2}]$ falls to about $0.05$; $[\\ce{HI}]$ rises to about $0.80$.'] },
      ],
      lines: [
        { say: 'Hydrogen and iodine form hydrogen iodide, with K C equal to forty-nine point zero. The system starts at equilibrium.', caption: 'Hydrogen and iodine form hydrogen iodide, with Kc = 49.0. The system starts at equilibrium.', show: ['eq', 'g.grid', 'g.axes', 'g.hi', 'g.i2', 'g.start'] },
        { say: 'At twenty seconds, hydrogen is added at constant volume. Its concentration jumps from zero point one zero to zero point three zero moles per litre: the stress.', caption: 'At twenty seconds, hydrogen is added at constant volume. Its concentration jumps from 0.10 to 0.30 mol/L: the stress.', show: ['g.add', 'g.h2', 'b.0'], focus: ['g.h2', 'b.0'] },
        { say: 'The system shifts right. Hydrogen falls, but only to about zero point two five, still higher than before. The change is only partly undone.', caption: 'The system shifts right. Hydrogen falls, but only to about 0.25, still higher than before. The change is only partly undone.', show: ['g.h2-lab', 'b.1'], focus: ['g.h2-lab', 'b.1'] },
        { say: 'Iodine falls to about zero point zero five, because it reacts with the extra hydrogen. And hydrogen iodide rises to about zero point eight zero.', caption: 'Iodine falls to about 0.05, because it reacts with the extra hydrogen. And hydrogen iodide rises to about 0.80.', show: ['g.i2-lab', 'g.hi-lab', 'b.2'], focus: ['g.i2', 'g.hi', 'b.2'] },
      ],
    },
    {
      chapter: 'The reaction quotient',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: [
            'Q = \\dfrac{[\\ce{HI}]^2}{[\\ce{H2}][\\ce{I2}]} = \\dfrac{(0.70)^2}{(0.30)(0.10)} = 16.3',
            'Q = 16.3 < K_c = 49.0 \\quad \\Rightarrow \\quad \\text{forward reaction faster}',
            '\\text{New equilibrium: } \\dfrac{(0.797)^2}{(0.252)(0.0515)} \\approx 49',
          ],
        },
      ],
      lines: [
        { say: 'Why does the system shift? Just after the hydrogen is added, the ratio in the expression, called the reaction quotient, Q, is no longer equal to K C.', caption: 'Why does the system shift? Just after the hydrogen is added, the ratio in the expression, called the reaction quotient, Q, is no longer equal to Kc.' },
        { say: 'Q is zero point seven zero squared, over zero point three zero times zero point one zero: sixteen point three.', caption: 'Q is 0.70² over 0.30 × 0.10: 16.3.', show: 'm.0', focus: 'm.0' },
        { say: 'Q is less than forty-nine, so the forward reaction runs faster, making hydrogen iodide, until the ratio is back at forty-nine.', show: 'm.1', focus: 'm.1' },
        { say: 'Check with the new concentrations: zero point seven nine seven squared, over zero point two five two times zero point zero five one five, is about forty-nine. The same K C as before.', caption: 'Check with the new concentrations: 0.797² over 0.252 × 0.0515 is about 49. The same Kc as before.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A colour change',
      layout: 'center',
      main: [
        { kind: 'math', id: 'eq', size: 'lg', lines: ['\\ce{Fe^3+(aq) + SCN^-(aq) <=> FeSCN^2+(aq)}', '\\text{blood-red}'] },
        { kind: 'bullets', id: 'b', items: ['$\\ce{KSCN}$ dissolves, adding $\\ce{SCN-}$ ions, a reactant. ($\\ce{K+}$ ions take no part.)', 'The system shifts **right**, using up some of the added $\\ce{SCN-}$ and making more $\\ce{FeSCN^2+}$.', 'The red colour gets **darker**.'] },
      ],
      lines: [
        { say: 'Iron three ions and thiocyanate ions form a blood-red complex ion. A few crystals of potassium thiocyanate are dissolved in the mixture. What happens to the colour?', caption: 'Iron(III) ions and thiocyanate ions form a blood-red complex ion. A few crystals of potassium thiocyanate are dissolved in the mixture. What happens to the colour?', show: 'eq' },
        { say: 'Potassium thiocyanate adds thiocyanate ions, a reactant. The potassium ions take no part.', show: 'b.0', focus: 'b.0' },
        { say: 'The system shifts right, using up some of the added thiocyanate and making more of the red complex ion. The red colour gets darker.', show: ['b.1', 'b.2'], focus: ['b.1', 'b.2'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The system $\\ce{Fe^3+(aq) + SCN^-(aq) <=> FeSCN^2+(aq)}$ is at equilibrium; the red colour comes from $\\ce{FeSCN^2+}$. Sodium hydroxide solution is added, which removes $\\ce{Fe^3+}$ ions as solid iron(III) hydroxide. What happens?',
          choices: ['Shifts left; the red colour gets paler.', 'Shifts right; the red colour gets darker.', 'Shifts left; the red colour gets darker.', 'No shift; the colour does not change.'],
          answer: 0,
          working: 'Removing a reactant, $\\ce{Fe^3+}$, shifts the equilibrium left to replace some of it. That uses up $\\ce{FeSCN^2+}$, so the red colour gets paler.',
        },
      ],
      lines: [
        { say: 'Your turn. Sodium hydroxide is added to the red mixture, removing iron three ions as a solid. How does the equilibrium respond, and what happens to the colour? Pause the video and try it.', caption: 'Your turn. Sodium hydroxide is added to the red mixture, removing iron(III) ions as a solid. How does the equilibrium respond, and what happens to the colour? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Removing a reactant shifts the equilibrium left, to replace some of it. That uses up the red complex ion, so the colour gets paler.', show: 'q.answer' },
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
            'After a stress, the shift **partly** undoes the change: $[\\ce{H2}]$ ends above where it started.',
            'Just after the stress, $Q \\ne K_c$; the system shifts until the ratio is back at $K_c$.',
            'A shift towards a coloured particle deepens the colour; a shift away pales it.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. After a stress, the shift only partly undoes the change: the added hydrogen ends higher than where it started.', show: 'sum.0' },
        { say: 'Just after the stress, Q is not equal to K C. The system shifts until the ratio is back at the same K C.', caption: 'Just after the stress, Q is not equal to Kc. The system shifts until the ratio is back at the same Kc.', show: 'sum.1' },
        { say: 'A shift towards a coloured particle deepens its colour. In part three, you will change the volume and pressure of gases. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
