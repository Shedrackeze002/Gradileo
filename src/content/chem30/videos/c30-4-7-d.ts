import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { ionisedGrid } from './lib/c30-4b-figures.ts';

// A hundred acetic acid molecules at each concentration: about 1 ionised at 0.100 mol/L (1.3%)
// and about 4 at 0.0100 mol/L (4.2%).
const grids = figure(
  'g',
  [
    ionisedGrid({ name: 'a', at: [0, 0], ionised: 1, label: '\\begin{gathered}0.100\\ \\text{mol/L}\\\\ 1.3\\%\\ \\text{ionised}\\end{gathered}' }),
    ionisedGrid({ name: 'b', at: [15, 0], ionised: 4, label: '\\begin{gathered}0.0100\\ \\text{mol/L}\\\\ 4.2\\%\\ \\text{ionised}\\end{gathered}' }),
  ],
  400,
);

const video: Explainer = {
  id: 'c30-4-7-d',
  lessonId: 'c30-4-7',
  title: 'pH of Weak Acids and Bases, Part 4: Ka from a Measured pH',
  thumbnailTitle: 'Ka from a Measured pH',
  thumbnail: 'g',
  summary:
    'A measured pH gives x = [H₃O⁺] = 10^(−pH), and from it Ka = x²/(c − x) and the percent ionisation, x/c × 100%: 0.100 mol/L methanoic acid at pH 2.38 has Ka = 1.8 × 10⁻⁴ and is 4.17% ionised. Diluting a weak acid raises its percent ionisation, and a known percent gives x, the pH and Ka in turn.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Equilibrium Focusing on Acid–Base Systems · Part 4', title: 'Ka from a Measured pH', subtitle: 'Working backwards' }],
      lines: [
        { say: 'A p H meter measures the hydronium ion concentration directly.', caption: 'A pH meter measures the hydronium ion concentration directly.', show: 'title' },
        {
          say: 'So measuring the p H of a weak acid of known concentration gives x, and from x, K A and the percent ionisation. This part works backwards.',
          caption: 'So measuring the pH of a weak acid of known concentration gives x, and from x, Ka and the percent ionisation. This part works backwards.',
        },
      ],
    },
    {
      chapter: 'Percent ionisation',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'def',
          tone: 'definition',
          title: 'Percent ionisation',
          md: 'The fraction of a weak acid’s molecules that have ionised: $\\text{percent ionisation} = \\dfrac{[\\ce{H3O+}]_{eq}}{c_{\\text{initial}}} \\times 100\\%$',
        },
        { kind: 'math', id: 'm', size: 'lg', lines: ['x = [\\ce{H3O+}] = 10^{-\\text{pH}} \\qquad K_a = \\dfrac{x^2}{c - x}'] },
      ],
      lines: [
        {
          say: 'The percent ionisation is the fraction of the acid’s molecules that have ionised: the equilibrium hydronium ion concentration over the initial concentration, times one hundred percent.',
          show: 'def',
        },
        {
          say: 'From a measured p H, x is ten to the minus p H. Then K A is x squared over c minus x, as before.',
          caption: 'From a measured pH, x is 10 to the −pH. Then Ka is x² over (c − x), as before.',
          show: 'm',
          focus: 'm',
        },
      ],
    },
    {
      chapter: 'Methanoic acid',
      layout: 'center',
      main: [
        {
          kind: 'text',
          id: 'q',
          size: 'md',
          align: 'center',
          md: 'A $0.100\\ \\text{mol/L}$ solution of methanoic acid, $\\ce{HCOOH}$, has a pH of 2.38 at $25^\\circ\\text{C}$. Find $K_a$, to two significant figures, and the percent ionisation, to three.',
        },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            'x = [\\ce{H3O+}] = [\\ce{HCOO-}] = 10^{-2.38} = 4.17 \\times 10^{-3}\\ \\text{mol/L}',
            '[\\ce{HCOOH}] = 0.100 - 0.00417 = 0.0958\\ \\text{mol/L}',
            'K_a = \\dfrac{(4.17 \\times 10^{-3})^2}{0.0958} = \\good{1.8 \\times 10^{-4}}',
            '\\dfrac{4.17 \\times 10^{-3}}{0.100} \\times 100\\% = \\good{4.17\\%}',
          ],
        },
      ],
      lines: [
        {
          say: 'Zero point one zero zero moles per litre methanoic acid has a p H of two point three eight.',
          caption: '0.100 mol/L methanoic acid has a pH of 2.38.',
          show: 'q',
        },
        {
          say: 'So x is ten to the minus two point three eight: four point one seven times ten to the minus three moles per litre.',
          caption: 'So x is 10 to the −2.38: 4.17 × 10⁻³ mol/L.',
          show: 'm.0',
          focus: 'm.0',
        },
        {
          say: 'The acid left is zero point zero nine five eight moles per litre, so K A is x squared over that: one point eight times ten to the minus four.',
          caption: 'The acid left is 0.0958 mol/L, so Ka is x² over that: 1.8 × 10⁻⁴.',
          show: ['m.1', 'm.2'],
          focus: 'm.2',
        },
        {
          say: 'And the percent ionisation is x over zero point one zero zero, times one hundred: four point one seven percent.',
          caption: 'And the percent ionisation is x over 0.100, times 100: 4.17%.',
          show: 'm.3',
          focus: 'm.3',
        },
        {
          say: 'Keep the unrounded x until the end. Rounding it to four times ten to the minus three before squaring changes K A by about eight percent.',
          caption: 'Keep the unrounded x until the end. Rounding it to 4 × 10⁻³ before squaring changes Ka by about 8%.',
          focus: 'm.0',
        },
      ],
    },
    {
      chapter: 'Diluting raises it',
      layout: 'center',
      main: [grids],
      lines: [
        {
          say: 'Percent ionisation also depends on the concentration. Zero point one zero zero moles per litre acetic acid is one point three percent ionised: about one molecule in a hundred.',
          caption: 'Percent ionisation also depends on the concentration. 0.100 mol/L acetic acid is 1.3% ionised: about one molecule in a hundred.',
          show: ['g.a-whole', 'g.a-ionised', 'g.a-label'],
        },
        {
          say: 'Dilute it ten times, to zero point zero one zero zero moles per litre, and four point two percent ionises: about four in a hundred.',
          caption: 'Dilute it ten times, to 0.0100 mol/L, and 4.2% ionises: about four in a hundred.',
          show: ['g.b-whole', 'g.b-ionised', 'g.b-label'],
          focus: 'g.b-ionised',
        },
        {
          say: 'As Le Chatelier’s principle predicts, diluting favours the side with more dissolved particles: the ions.',
          caption: 'As Le Châtelier’s principle predicts, diluting favours the side with more dissolved particles: the ions.',
        },
      ],
    },
    {
      chapter: 'Working backwards',
      layout: 'center',
      main: [
        {
          kind: 'text',
          id: 'q',
          size: 'md',
          align: 'center',
          md: 'In a $0.500\\ \\text{mol/L}$ solution of acetic acid, 0.600% of the acid molecules are ionised at $25^\\circ\\text{C}$. Find the pH, to two decimal places, and $K_a$, to two significant figures.',
        },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            'x = \\dfrac{0.600}{100} \\times 0.500 = 3.00 \\times 10^{-3}\\ \\text{mol/L}',
            '\\text{pH} = -\\log(3.00 \\times 10^{-3}) = \\good{2.52}',
            'K_a = \\dfrac{(3.00 \\times 10^{-3})^2}{0.500 - 0.00300} = \\good{1.8 \\times 10^{-5}}',
          ],
        },
      ],
      lines: [
        {
          say: 'Now from a percent: in zero point five zero zero moles per litre acetic acid, zero point six zero zero percent is ionised.',
          caption: 'Now from a percent: in 0.500 mol/L acetic acid, 0.600% is ionised.',
          show: 'q',
        },
        {
          say: 'So x is three point zero zero times ten to the minus three moles per litre, and the p H is two point five two.',
          caption: 'So x is 3.00 × 10⁻³ mol/L, and the pH is 2.52.',
          show: ['m.0', 'm.1'],
          focus: 'm.1',
        },
        {
          say: 'And K A is x squared over zero point five zero zero minus x: one point eight times ten to the minus five.',
          caption: 'And Ka is x² over (0.500 − x): 1.8 × 10⁻⁵.',
          show: 'm.2',
          focus: 'm.2',
        },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt:
            'A $0.0500\\ \\text{mol/L}$ solution of benzoic acid has a pH of 2.76 at $25^\\circ\\text{C}$. What is the percent ionisation of the acid, to three significant figures? Percent ionisation $= \\dfrac{[\\ce{H3O+}]_{eq}}{c_{\\text{initial}}} \\times 100\\%$.',
          choices: ['$0.174\\%$', '$3.60\\%$', '$3.48\\%$', '$96.5\\%$'],
          answer: 2,
          working: '$[\\ce{H3O+}] = 10^{-2.76} = 1.74 \\times 10^{-3}\\ \\text{mol/L}$, and $\\dfrac{1.74 \\times 10^{-3}}{0.0500} \\times 100\\% = 3.48\\%$.',
        },
      ],
      lines: [
        {
          say: 'Your turn. Zero point zero five zero zero moles per litre benzoic acid has a p H of two point seven six. What is its percent ionisation? Pause the video and try it.',
          caption: 'Your turn. 0.0500 mol/L benzoic acid has a pH of 2.76. What is its percent ionisation? Pause the video and try it.',
          show: 'q',
          wait: 6,
        },
        {
          say: 'The answer is C, three point four eight percent: ten to the minus two point seven six, over zero point zero five zero zero, times one hundred. Choice B divides by the acid left, not the initial concentration.',
          caption: 'The answer is C, 3.48%: 10 to the −2.76, over 0.0500, times 100. Choice B divides by the acid left, not the initial concentration.',
          show: 'q.answer',
        },
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
            'From a measured pH: $x = [\\ce{H3O+}] = 10^{-\\text{pH}}$.',
            '$K_a = \\dfrac{x^2}{c - x}$, and percent ionisation $= \\dfrac{x}{c} \\times 100\\%$.',
            'Keep the unrounded $x$. Diluting a weak acid raises its percent ionisation.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. From a measured p H, x is ten to the minus p H.', caption: 'Let’s sum up. From a measured pH, x is 10 to the −pH.', show: 'sum.0' },
        {
          say: 'Then K A is x squared over c minus x, and the percent ionisation is x over c, times one hundred percent.',
          caption: 'Then Ka is x² over (c − x), and the percent ionisation is x over c, times 100%.',
          show: 'sum.1',
        },
        {
          say: 'Keep the unrounded x; and diluting raises the percent ionisation. That completes this lesson. Next, you will meet buffers and titration curves.',
          show: 'sum.2',
        },
      ],
    },
  ],
};

export default video;
