import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { phDrops } from './lib/c30-4b-figures.ts';

// The same 0.010 mol of HCl added to 1.00 L of an acetic acid–acetate buffer (pH 4.74 to 4.66)
// and to 1.00 L of pure water (pH 7.00 to 2.00).
const drops = figure('d', [phDrops({ buffer: [4.74, 4.66], water: [7.0, 2.0] })], 520);

const video: Explainer = {
  id: 'c30-4-8-b',
  lessonId: 'c30-4-8',
  title: 'Buffers and Titration Curves, Part 2: The pH of a Buffer',
  thumbnailTitle: 'The pH of a Buffer',
  thumbnail: 'd',
  summary:
    'In a buffer, [H₃O⁺] = Ka × [acid]/[conjugate base], so with equal amounts the pH equals the pKa. A buffer of 0.100 mol/L acetic acid and sodium acetate has a pH of 4.74, and 0.010 mol of HCl added to 1.00 L of it lowers the pH only to 4.66, while the same acid takes pure water from 7.00 to 2.00. To hold a chosen pH, pick a weak acid whose pKa is close to it.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Equilibrium Focusing on Acid–Base Systems · Part 2', title: 'The pH of a Buffer', subtitle: 'pH = pKa when the acid and base are equal' }],
      lines: [
        { say: 'How little does the p H of a buffer change? This part puts numbers on it.', caption: 'How little does the pH of a buffer change? This part puts numbers on it.', show: 'title' },
        {
          say: 'You will find the p H of a buffer from K A, and see how to choose a buffer for the p H you want.',
          caption: 'You will find the pH of a buffer from Ka, and see how to choose a buffer for the pH you want.',
        },
      ],
    },
    {
      chapter: 'The buffer equation',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['[\\ce{H3O+}] = K_a \\times \\dfrac{[\\text{acid}]}{[\\text{conjugate base}]}', '[\\text{acid}] = [\\text{conjugate base}] \\ \\Rightarrow\\ \\text{pH} = \\text{p}K_a = -\\log K_a'],
        },
      ],
      lines: [
        {
          say: 'Rearrange the K A expression of the buffer’s weak acid: the hydronium ion concentration is K A times the acid concentration over the conjugate base concentration.',
          caption: 'Rearrange the Ka expression of the buffer’s weak acid: [H₃O⁺] is Ka times [acid] over [conjugate base].',
          show: 'm.0',
          focus: 'm.0',
        },
        {
          say: 'When the acid and its conjugate base are equal, the hydronium ion concentration equals K A, so the p H equals the p K A.',
          caption: 'When the acid and its conjugate base are equal, [H₃O⁺] equals Ka, so the pH equals the pKa.',
          show: 'm.1',
          focus: 'm.1',
        },
      ],
    },
    {
      chapter: 'How well a buffer resists',
      layout: 'split',
      leftWidth: 420,
      left: [drops],
      right: [
        {
          kind: 'text',
          id: 'q',
          size: 'md',
          md: 'Buffer: $0.100\\ \\text{mol/L}$ each of acetic acid and sodium acetate, $K_a = 1.8 \\times 10^{-5}$. Add $0.010\\ \\text{mol}$ of $\\ce{HCl}$ to $1.00\\ \\text{L}$.',
        },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: [
            '\\text{before: } \\text{pH} = \\text{p}K_a = 4.74',
            '[\\ce{H3O+}] = 1.8 \\times 10^{-5} \\times \\dfrac{0.110}{0.090}',
            '= 2.2 \\times 10^{-5}, \\ \\text{pH} = \\good{4.66}',
            '\\text{water: } [\\ce{H3O+}] = 0.010, \\ \\text{pH} = \\bad{2.00}',
          ],
        },
      ],
      lines: [
        {
          say: 'A buffer holds zero point one zero zero moles per litre each of acetic acid and sodium acetate. With equal amounts, the hydronium ion concentration is just K A, so the p H is four point seven four.',
          caption: 'A buffer holds 0.100 mol/L each of acetic acid and sodium acetate. With equal amounts, [H₃O⁺] is just Ka, so the pH is 4.74.',
          show: ['q', 'm.0', 'd.axis', 'd.buffer'],
        },
        {
          say: 'Now add zero point zero one zero moles of hydrochloric acid to one litre. It turns zero point zero one zero moles per litre of acetate into acetic acid, giving zero point one one zero and zero point zero nine zero.',
          caption: 'Now add 0.010 mol of hydrochloric acid to 1.00 L. It turns 0.010 mol/L of acetate into acetic acid, giving 0.110 and 0.090 mol/L.',
          show: 'm.1',
          focus: 'm.1',
        },
        {
          say: 'The hydronium ion concentration becomes two point two times ten to the minus five, and the p H four point six six: a fall of less than zero point one.',
          caption: '[H₃O⁺] becomes 2.2 × 10⁻⁵ mol/L, and the pH 4.66: a fall of less than 0.1.',
          show: ['m.2', 'd.buffer-drop'],
          focus: ['m.2', 'd.buffer-drop'],
        },
        {
          say: 'Add the same acid to one litre of pure water, and the hydronium ion concentration is zero point zero one zero: the p H falls from seven point zero zero to two point zero zero.',
          caption: 'Add the same acid to 1.00 L of pure water, and [H₃O⁺] is 0.010 mol/L: the pH falls from 7.00 to 2.00.',
          show: ['m.3', 'd.water', 'd.water-drop'],
          focus: ['m.3', 'd.water-drop'],
        },
      ],
    },
    {
      chapter: 'Choosing a buffer',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'tip',
          tone: 'tip',
          title: 'Choosing a buffer',
          md: 'A buffer works best within about one pH unit of the $\\text{p}K_a$ of its weak acid. To hold a chosen pH, pick a weak acid whose $\\text{p}K_a$ is close to it.',
        },
        {
          kind: 'table',
          id: 't',
          head: ['Buffer', '$K_a$ of the weak acid', '$\\text{p}K_a$'],
          rows: [
            ['acetic acid and sodium acetate', '$1.8 \\times 10^{-5}$', '$4.74$'],
            ['$\\ce{NaH2PO4}$ and $\\ce{Na2HPO4}$', '$6.2 \\times 10^{-8}$', '$7.21$'],
            ['ammonium chloride and ammonia', '$5.6 \\times 10^{-10}$', '$9.25$'],
          ],
        },
      ],
      lines: [
        {
          say: 'A buffer works best within about one p H unit of the p K A of its weak acid. So to hold a chosen p H, pick a weak acid whose p K A is close to it.',
          caption: 'A buffer works best within about one pH unit of the pKa of its weak acid. So to hold a chosen pH, pick a weak acid whose pKa is close to it.',
          show: 'tip',
        },
        {
          say: 'Acetic acid suits a p H near four point seven, the phosphate pair a p H near seven point two, and ammonium ions with ammonia a p H near nine point three.',
          caption: 'Acetic acid suits a pH near 4.7, the phosphate pair a pH near 7.2, and ammonium ions with ammonia a pH near 9.3.',
          show: 't',
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
            'A buffer contains $0.20\\ \\text{mol/L}$ acetic acid and $0.10\\ \\text{mol/L}$ sodium acetate. At $25^\\circ\\text{C}$, $K_a = 1.8 \\times 10^{-5}$. What is its pH, to two decimal places? Use $[\\ce{H3O+}] = K_a \\times \\dfrac{[\\text{acid}]}{[\\text{conjugate base}]}$.',
          choices: ['$4.44$', '$5.05$', '$4.74$', '$2.72$'],
          answer: 0,
          working: '$[\\ce{H3O+}] = 1.8 \\times 10^{-5} \\times \\dfrac{0.20}{0.10} = 3.6 \\times 10^{-5}\\ \\text{mol/L}$, so $\\text{pH} = -\\log(3.6 \\times 10^{-5}) = 4.44$.',
        },
      ],
      lines: [
        {
          say: 'Your turn. A buffer has zero point two zero moles per litre acetic acid and zero point one zero moles per litre sodium acetate. What is its p H? Pause the video and try it.',
          caption: 'Your turn. A buffer has 0.20 mol/L acetic acid and 0.10 mol/L sodium acetate. What is its pH? Pause the video and try it.',
          show: 'q',
          wait: 6,
        },
        {
          say: 'The answer is A, four point four four. The hydronium ion concentration is K A times two: three point six times ten to the minus five. Choice B turns the ratio upside down, and choice C ignores it.',
          caption: 'The answer is A, 4.44. [H₃O⁺] is Ka times 2: 3.6 × 10⁻⁵ mol/L. Choice B turns the ratio upside down, and choice C ignores it.',
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
            '$[\\ce{H3O+}] = K_a \\times \\dfrac{[\\text{acid}]}{[\\text{conjugate base}]}$; with equal amounts, $\\text{pH} = \\text{p}K_a$.',
            'Added acid changes the ratio only a little: $4.74$ to $4.66$, where pure water goes from $7.00$ to $2.00$.',
            'Choose a weak acid whose $\\text{p}K_a$ is close to the pH wanted.',
          ],
        },
      ],
      lines: [
        {
          say: 'Let’s sum up. In a buffer, the hydronium ion concentration is K A times the ratio of acid to conjugate base. With equal amounts, the p H equals the p K A.',
          caption: 'Let’s sum up. In a buffer, [H₃O⁺] is Ka times the ratio of acid to conjugate base. With equal amounts, the pH equals the pKa.',
          show: 'sum.0',
        },
        { say: 'Added acid changes that ratio only a little, so the p H barely moves.', caption: 'Added acid changes that ratio only a little, so the pH barely moves.', show: 'sum.1' },
        {
          say: 'And to hold a chosen p H, pick a weak acid whose p K A is close to it. In part three, you will read titration curves. See you there!',
          caption: 'And to hold a chosen pH, pick a weak acid whose pKa is close to it. In part three, you will read titration curves. See you there!',
          show: 'sum.2',
        },
      ],
    },
  ],
};

export default video;
