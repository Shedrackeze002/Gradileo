import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { phStrip, tag } from './lib/c20-3b-figures.ts';

// The pH scale with some everyday solutions at their approximate pH.
const everyday = figure(
  's',
  [
    phStrip({
      names: true,
      marks: [
        { id: 'lemon', value: 2, tex: '\\text{lemon juice}' },
        { id: 'coffee', value: 5, tex: '\\text{black coffee}', level: 2 },
        { id: 'water', value: 7, tex: '\\begin{gathered}\\text{pure}\\\\ \\text{water}\\end{gathered}' },
        { id: 'sea', value: 8, tex: '\\text{seawater}', level: 2 },
        { id: 'ammonia', value: 11.5, tex: '\\text{household ammonia}' },
      ],
    }),
  ],
  360,
);

// From pH 5 down to pH 3: two steps, each ten times as much hydronium ion.
const hops = figure(
  's',
  [
    phStrip({
      hops: [
        { id: 'hop1', from: 5, to: 4, tex: '\\times 10' },
        { id: 'hop2', from: 4, to: 3, tex: '\\times 10', high: true },
      ],
    }),
    tag('a', [3.5, -0.75], '\\text{A}', { place: 'below', tone: 'theta' }),
    tag('b', [5.5, -0.75], '\\text{B}', { place: 'below', tone: 'theta' }),
  ],
  280,
);

const video: Explainer = {
  id: 'c20-3-7-d',
  lessonId: 'c20-3-7',
  title: 'pH and pOH, Part 4: Reading the pH Scale',
  thumbnailTitle: 'Reading the pH Scale',
  thumbnail: 's',
  summary:
    'At 25 °C, a pH below 7 is acidic, 7 is neutral and above 7 is basic, and the lower the pH, the more acidic the solution. Each step of 1 is a factor of 10 in [H₃O⁺], so a pH of 3 has 100 times the hydronium ion concentration of a pH of 5. A solution with more H₃O⁺ than neutral water’s 1.0 × 10⁻⁷ mol/L is acidic, and one with less is basic.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Matter as Solutions, Acids and Bases · Part 4', title: 'Reading the pH Scale', subtitle: 'Acidic, neutral, basic, and factors of ten' }],
      lines: [
        { say: 'Lemon juice has a p H of about two, and black coffee about five. Is lemon juice two and a half times as acidic? It is far more than that.', caption: 'Lemon juice has a pH of about 2, and black coffee about 5. Is lemon juice two and a half times as acidic? It is far more than that.', show: 'title' },
        { say: 'In this part, you will read the p H scale, compare two solutions on it, and classify a solution from its concentration.', caption: 'In this part, you will read the pH scale, compare two solutions on it, and classify a solution from its concentration.' },
      ],
    },
    {
      chapter: 'Acidic, neutral and basic',
      layout: 'center',
      main: [everyday],
      lines: [
        { say: 'At twenty-five degrees Celsius, a p H below seven is acidic, seven is neutral, and above seven is basic. The lower the p H, the more acidic the solution.', caption: 'At 25 °C, a pH below 7 is acidic, 7 is neutral, and above 7 is basic. The lower the pH, the more acidic the solution.', show: ['s.scale', 's.acidic', 's.neutral', 's.basic'] },
        { say: 'Lemon juice is about two, and black coffee about five.', caption: 'Lemon juice is about 2, and black coffee about 5.', show: ['s.lemon', 's.coffee'] },
        { say: 'Pure water is seven, seawater is about eight, and household ammonia about eleven and a half.', caption: 'Pure water is 7, seawater is about 8, and household ammonia about 11.5.', show: ['s.water', 's.sea', 's.ammonia'] },
      ],
    },
    {
      chapter: 'Both ions on one table',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['pH', '$[\\ce{H3O+}]$ (mol/L)', '$[\\ce{OH-}]$ (mol/L)', 'pOH', 'Solution'],
          rows: [
            ['2.00', '$1.0 \\times 10^{-2}$', '$1.0 \\times 10^{-12}$', '12.00', '[[bad:acidic]]'],
            ['7.00', '$1.0 \\times 10^{-7}$', '$1.0 \\times 10^{-7}$', '7.00', '[[good:neutral]]'],
            ['12.00', '$1.0 \\times 10^{-12}$', '$1.0 \\times 10^{-2}$', '2.00', '[[adj:basic]]'],
          ],
        },
      ],
      lines: [
        { say: 'At p H two, the hydronium ion concentration is ten to the minus two, the hydroxide ion concentration ten to the minus twelve, and the p O H twelve: acidic.', caption: 'At pH 2.00, [H₃O⁺] = 1.0 × 10⁻² and [OH⁻] = 1.0 × 10⁻¹², and the pOH is 12.00: acidic.', show: 't.0', focus: 't.0' },
        { say: 'At p H seven, both ions are at ten to the minus seven: neutral.', caption: 'At pH 7.00, both ions are at 1.0 × 10⁻⁷: neutral.', show: 't.1', focus: 't.1' },
        { say: 'At p H twelve, the numbers swap: basic.', caption: 'At pH 12.00, the numbers swap: basic.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Factors of ten',
      layout: 'center',
      main: [
        hops,
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'A difference of 2 is not twice as much', md: 'Each pH unit is a factor of ten, so a pH of 3 has $10 \\times 10 = 100$ times the hydronium ion concentration of a pH of 5. A difference of 3 is a factor of $10^3 = 1000$.' },
      ],
      lines: [
        { say: 'Because the scale is logarithmic, each step of one on the p H scale is a factor of ten in hydronium ion concentration.', caption: 'Because the scale is logarithmic, each step of 1 on the pH scale is a factor of 10 in [H₃O⁺].', show: ['s.scale', 's.acidic', 's.neutral', 's.basic'] },
        { say: 'Solution A has a p H of three, and solution B a p H of five. How many times greater is the hydronium ion concentration in A?', caption: 'Solution A has a pH of 3, and solution B a pH of 5. How many times greater is [H₃O⁺] in A?', show: ['s.a', 's.b'] },
        { say: 'The p H values differ by two, so the concentrations differ by ten times ten: a factor of one hundred. The lower p H has more hydronium ions, so A has one hundred times as much.', caption: 'The pH values differ by 2, so the concentrations differ by 10 × 10: a factor of 100. The lower pH has more hydronium ions, so A has 100 times as much.', show: ['s.hop1', 's.hop2'], focus: ['s.hop1', 's.hop2'] },
        { say: 'Two p H units apart does not mean twice as much. And a difference of three is a factor of a thousand.', caption: 'Two pH units apart does not mean twice as much. And a difference of 3 is a factor of 1000.', show: 'oops' },
      ],
    },
    {
      chapter: 'Acidic or basic?',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'At $25^\\circ\\text{C}$, a solution has $[\\ce{H3O+}] = 4.6 \\times 10^{-9}\\ \\text{mol/L}$. Is it acidic, basic or neutral? In neutral water, $[\\ce{H3O+}] = 1.0 \\times 10^{-7}\\ \\text{mol/L}$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['4.6 \\times 10^{-9} < 1.0 \\times 10^{-7}', '\\text{fewer } \\ce{H3O+} \\text{ than neutral water: } \\good{\\text{basic}} \\quad (\\text{pH} = 8.34)'] },
      ],
      lines: [
        { say: 'You can also classify a solution without finding its p H. In neutral water at twenty-five degrees, the hydronium ion concentration is one point zero times ten to the minus seven. More than that is acidic; less is basic.', caption: 'You can also classify a solution without finding its pH. In neutral water at 25 °C, [H₃O⁺] = 1.0 × 10⁻⁷ mol/L. More than that is acidic; less is basic.', show: 'q' },
        { say: 'This solution has four point six times ten to the minus nine. A larger negative exponent means a smaller number, so it is less than ten to the minus seven.', caption: 'This solution has 4.6 × 10⁻⁹. A larger negative exponent means a smaller number, so it is less than 10⁻⁷.', show: 'm.0', focus: 'm.0' },
        { say: 'Fewer hydronium ions than neutral water means a p H above seven: the solution is basic. Its p H is eight point three four.', caption: 'Fewer hydronium ions than neutral water means a pH above 7: the solution is basic. Its pH is 8.34.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solution A has a pH of 2, and solution B has a pH of 6. How many times greater is $[\\ce{H3O+}]$ in solution A than in solution B?',
          choices: ['$10\\,000$ times', '$4$ times', '$40$ times', '$3$ times'],
          answer: 0,
          working: 'The pH values differ by 4, so $[\\ce{H3O+}]$ differs by a factor of $10^4 = 10\\,000$. The lower pH, A, has the greater concentration.',
        },
      ],
      lines: [
        { say: 'Your turn. Solution A has a p H of two, and solution B a p H of six. How many times greater is the hydronium ion concentration in A? Pause the video and try it.', caption: 'Your turn. Solution A has a pH of 2, and solution B a pH of 6. How many times greater is [H₃O⁺] in A? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, ten thousand times. The p H values differ by four, so the factor is ten to the fourth. Choice D divides six by two, but each p H unit multiplies by ten.', caption: 'The answer is A, 10,000 times. The pH values differ by 4, so the factor is 10⁴. Choice D divides 6 by 2, but each pH unit multiplies by 10.', show: 'q.answer' },
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
            'At $25^\\circ\\text{C}$, a pH below 7 is acidic, 7 is neutral and above 7 is basic.',
            'Each step of 1 is a factor of 10 in $[\\ce{H3O+}]$; the lower pH has the greater concentration.',
            'Compare $[\\ce{H3O+}]$ with $1.0 \\times 10^{-7}\\ \\text{mol/L}$: greater is acidic, less is basic.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. At twenty-five degrees Celsius, a p H below seven is acidic, seven is neutral, and above seven is basic.', caption: 'Let’s sum up. At 25 °C, a pH below 7 is acidic, 7 is neutral, and above 7 is basic.', show: 'sum.0' },
        { say: 'Each step of one is a factor of ten, and the lower p H has the greater hydronium ion concentration.', caption: 'Each step of 1 is a factor of 10, and the lower pH has the greater hydronium ion concentration.', show: 'sum.1' },
        { say: 'And a hydronium ion concentration greater than ten to the minus seven is acidic, while less is basic. That completes this lesson on p H and p O H. Well done!', caption: 'And a hydronium ion concentration greater than 1.0 × 10⁻⁷ mol/L is acidic, while less is basic. That completes this lesson on pH and pOH. Well done!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
