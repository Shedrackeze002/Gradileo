import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { dots, guide, numbers, plane, plot } from './lib/m302-6-graphs.ts';

// The truck's value, in thousands of dollars, t years after it is bought: V = 32 000(0.85)^t.
const g = plane({ x: [0, 10], y: [0, 35], yStep: 5, every: 0, width: 8, height: 7, titles: { x: '\\text{Years since bought}', y: '\\text{Value (thousands of \\$)}' } });
const v = (t: number) => 32 * 0.85 ** t;

const video: Explainer = {
  id: 'm302-6-1-d',
  lessonId: 'm302-6-1',
  title: 'Exponential Functions, Part 4: Exponential Models in Context',
  thumbnailTitle: 'Exponential Models',
  thumbnail: 'tr',
  summary: 'Writing percent growth and decay as y = a(1 + r)ˣ and y = a(1 − r)ˣ, reading the percent rate from the base (1.08 is 8% growth, 0.85 is 15% decay), and a pickup truck worth V = 32 000(0.85)ᵗ dollars: $32,000 new, losing 15% a year, and worth $19,652 after 3 years.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exponents and Logarithms · Part 4', title: 'Exponential Models', subtitle: 'Growth and decay by a percent' }],
      lines: [
        { say: 'Prices, populations and the value of a car often change by a percent each year. A percent change, repeated step after step, is exponential.', show: 'title' },
        { say: 'In this video, you will read the percent rate from the base of an exponential model, and use a model to find the value of a truck.' },
      ],
    },
    {
      chapter: 'Percent rates',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{Growth: } y = a(1 + r)^x', '\\text{Decay: } y = a(1 - r)^x'] },
        { kind: 'bullets', id: 'b', items: ['$r$ is the percent rate per step, written as a decimal.', 'Up 8%: multiply by $1 + 0.08 = 1.08$.', 'Down 15%: multiply by $1 - 0.15 = 0.85$.'] },
      ],
      lines: [
        { say: 'Many real situations are written as y equals "a" times one plus r, to the power x, for growth, or "a" times one minus r, to the power x, for decay.', show: ['m.0', 'm.1'] },
        { say: 'Here, r is the percent rate for each step, written as a decimal. Eight percent is 0.08, and fifteen percent is 0.15.', show: 'b.0' },
        { say: 'Why one plus r? An increase of eight percent keeps the whole amount, and adds eight percent of it. So the amount is multiplied by one plus 0.08, which is 1.08.', show: 'b.1', focus: 'b.1' },
        { say: 'A decrease of fifteen percent keeps 85 percent of the amount, and loses fifteen percent. So the amount is multiplied by one minus 0.15, which is 0.85.', show: 'b.2', focus: 'b.2' },
      ],
    },
    {
      chapter: 'Reading the base',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Base', 'Written as', 'Each step'],
          rows: [
            ['$1.08$', '$1 + 0.08$', '[[good:grows by 8%]]'],
            ['$0.85$', '$1 - 0.15$', '[[bad:loses 15%]]'],
            ['$1.5$', '$1 + 0.5$', '[[good:grows by 50%]]'],
            ['$0.97$', '$1 - 0.03$', '[[bad:loses 3%]]'],
          ],
        },
      ],
      lines: [
        { say: 'So you can read the percent rate straight from the base. A base of 1.08 is one plus 0.08: the quantity grows by eight percent each step.', show: 't.0', focus: 't.0' },
        { say: 'A base of 0.85 is one minus 0.15: the quantity loses fifteen percent each step.', show: 't.1', focus: 't.1' },
        { say: 'A base of 1.5 is one plus 0.5: growth of fifty percent each step.', show: 't.2', focus: 't.2' },
        { say: 'And a base of 0.97 is one minus 0.03: a loss of three percent each step. A base above one means growth, and a base below one means decay, just as before.', show: 't.3', focus: 't.3' },
      ],
    },
    {
      chapter: 'A truck loses value',
      layout: 'split',
      leftWidth: 540,
      left: [
        figure('tr', [
          g,
          numbers(g, 1, 5),
          plot(g, { id: 'curve', f: v, samples: 200 }),
          guide(g, 'g3', [3, 0], [3, v(3)], 'good', { group: 'three' }),
          dots(g, [
            { id: 'A', x: 0, y: 32, tex: '\\$32\\,000', tone: 'adj', place: 'right' },
            { id: 'B', x: 3, y: v(3), tex: '\\$19\\,652', tone: 'good', place: 'above right', group: 'three' },
          ]),
        ]),
      ],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A pickup truck is worth $V = 32\\,000(0.85)^t$ dollars $t$ years after it is bought.' },
        { kind: 'bullets', id: 'b', items: ['Base $0.85 = 1 - 0.15$: decay of 15% per year.', 'Initial value $32\\,000$: it cost \\$32,000.', 'After 3 years: $32\\,000(0.85)^3 = 19\\,652$.'] },
      ],
      lines: [
        { say: 'The value of a pickup truck t years after it is bought is modelled by V equals 32,000 times 0.85 to the power t, in dollars. Describe the model, and find the value after three years.', show: ['q', 'tr.grid', 'tr.axes', 'tr.curve'] },
        { say: 'The base, 0.85, is between zero and one, so this is exponential decay. And 0.85 is one minus 0.15, so the truck loses fifteen percent of its value each year.', show: 'b.0', focus: 'b.0' },
        { say: 'The initial value is 32,000, so the truck cost 32,000 dollars.', show: ['b.1', 'tr.A'], focus: ['b.1', 'tr.A'] },
        { say: 'After three years, V is 32,000 times 0.85 cubed. 0.85 cubed is 0.614125, and 32,000 times that is 19,652. So the truck is worth 19,652 dollars.', show: ['b.2', 'tr.three'], focus: ['b.2', 'tr.B'] },
        { say: 'Each year, the truck loses fifteen percent of what it was worth the year before. As the value shrinks, so does each year’s loss, and the curve flattens out.', focus: 'tr.curve' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The base is what is kept', md: 'A base of $0.85$ means the quantity **keeps** 85% and **loses** 15% each step, not that it loses 85%. Subtract the base from $1$ to find the rate of decay.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['1 - 0.85 = 0.15 \\;\\to\\; 15\\% \\text{ lost each year}'] },
      ],
      lines: [
        { say: 'Be careful with a decay base. A base of 0.85 does not mean the truck loses 85 percent each year. That would leave almost nothing after two years.', show: 'oops' },
        { say: 'The base is the part that is kept. So subtract it from one to find the rate of decay: one minus 0.85 is 0.15, a loss of fifteen percent each year.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A town’s population is modelled by $P = 12\\,000(1.03)^t$, where $t$ is the number of years from now. Which statement is true?',
          choices: ['The population grows by 103% each year.', 'The population starts at 12,000 and grows by 3% each year.', 'The population falls by 3% each year.', 'The population grows by 1.03 people each year.'],
          answer: 1,
          working: '$1.03 = 1 + 0.03$, so the population is multiplied by $1.03$ each year: growth of 3%. The initial value is $12\\,000$.',
        },
      ],
      lines: [
        { say: 'Your turn. A town’s population is modelled by P equals 12,000 times 1.03 to the power t, where t is the number of years from now. Which statement is true? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. The initial value is 12,000. The base, 1.03, is one plus 0.03, so the population grows by three percent each year. Choice A mistakes the base for the rate: multiplying by 1.03 keeps the whole population, and adds three percent.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Growth by a percent: $y = a(1 + r)^x$. Decay: $y = a(1 - r)^x$.', 'A base of $1.08$ means 8% growth; $0.85$ means 15% decay.', 'The base is the part kept; $a$ is the starting amount.'] }],
      lines: [
        { say: 'Let’s sum up. Growth by a percent is y equals "a" times one plus r, to the power x, and decay is "a" times one minus r, to the power x.', show: 'sum.0' },
        { say: 'So a base of 1.08 means eight percent growth, and a base of 0.85 means fifteen percent decay.', show: 'sum.1' },
        { say: 'The base is the part that is kept, and "a" is the starting amount. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
