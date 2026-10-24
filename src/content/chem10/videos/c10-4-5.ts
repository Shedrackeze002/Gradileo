import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { flaskOnBalance } from './lib/c10-4-figures.ts';

// Marble chips fizzing in an open flask on a balance: the mass falls as carbon dioxide escapes.
const flask = figure('fl', [flaskOnBalance({ readings: [] })], 480);

const video: Explainer = {
  id: 'c10-4-5',
  lessonId: 'c10-4-5',
  title: 'Rates of Reaction, Part 1: Measuring the Rate',
  thumbnailTitle: 'Measuring the Rate',
  thumbnail: 'fl',
  summary:
    'The rate of reaction is how quickly reactants are used up or products form. Measure a gas made, a mass lost or the time for a change, and find the mean rate as the amount divided by the time: 48 cm³ of hydrogen in 30 s is 1.6 cm³/s. Rearranged, time = amount ÷ mean rate.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Reactions · Part 1', title: 'Measuring the Rate', subtitle: 'How quickly does a reaction go?' }],
      lines: [
        { say: 'A firework explodes in a fraction of a second, while an iron gate takes years to rust. Both are chemical reactions, but they run at wildly different speeds.', show: 'title' },
        { say: 'In this lesson, you will measure and explain the rate of a reaction. This first part calculates a mean rate. Part two reads rates from data, part three explains them with collision theory, and part four compares experiments.' },
      ],
    },
    {
      chapter: 'Rate of reaction',
      layout: 'split',
      leftWidth: 460,
      left: [flask],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Rate of reaction', md: 'How quickly the reactants are used up or the products are formed.' },
        {
          kind: 'bullets',
          id: 'b',
          items: ['**Collect a gas** in a gas syringe, and read its volume every 10 or 20 seconds.', '**Weigh an open flask** as a gas escapes: the mass lost is the mass of gas made.', '**Time a colour change** or a cloudiness.'],
        },
      ],
      lines: [
        { say: 'The rate of reaction is how quickly the reactants are used up, or the products are formed.', show: 'def' },
        { say: 'To find a rate, measure how much of a product forms, or how much of a reactant is used up, over a measured time.' },
        { say: 'You can collect a gas in a gas syringe, or in an upside-down measuring cylinder full of water, and read its volume every ten or twenty seconds.', show: 'b.0' },
        { say: 'You can weigh an open flask on a balance as a gas escapes. The mass lost is the mass of gas made.', show: ['b.1', 'fl.balance', 'fl.flask', 'fl.acid', 'fl.chips', 'fl.bubbles', 'fl.gas'] },
        { say: 'Or you can time a colour change, or how long a mixture takes to turn so cloudy that a cross drawn under the flask disappears.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Mean rate',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Mean rate of reaction', md: 'The amount made, or used up, divided by the time taken.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{mean rate} = \\dfrac{\\text{amount of product formed}}{\\text{time taken}}', '\\text{or} \\quad \\text{mean rate} = \\dfrac{\\text{amount of reactant used}}{\\text{time taken}}'] },
        { kind: 'text', id: 'u', size: 'md', align: 'center', md: '$\\text{cm}^3 \\div \\text{s}$ gives $\\text{cm}^3\\text{/s}$; $\\ \\text{g} \\div \\text{s}$ gives $\\text{g/s}$.' },
      ],
      lines: [
        { say: 'The mean rate over a period of time is the amount made, or used up, divided by the time taken.', show: ['def', 'm'], focus: 'm' },
        { say: 'The unit comes from the measurements. A volume in cubic centimetres divided by a time in seconds gives cubic centimetres per second. A mass in grams divided by seconds gives grams per second.', show: 'u' },
      ],
    },
    {
      chapter: 'Hydrogen in a gas syringe',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Magnesium ribbon reacts with dilute hydrochloric acid, and $48\\ \\text{cm}^3$ of hydrogen is collected in a gas syringe in the first $30\\ \\text{s}$. What is the mean rate?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{mean rate} = \\dfrac{48\\ \\text{cm}^3}{30\\ \\text{s}} = 1.6\\ \\text{cm}^3\\text{/s}'] },
      ],
      lines: [
        { say: 'Magnesium ribbon reacts with dilute hydrochloric acid, and 48 cubic centimetres of hydrogen is collected in a gas syringe in the first 30 seconds.', show: 'q' },
        { say: 'The mean rate is 48 cubic centimetres divided by 30 seconds, which is 1.6 cubic centimetres per second.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'How long will it take?',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Oxygen is produced at a mean rate of $0.8\\ \\text{cm}^3\\text{/s}$. How long does it take to collect $60\\ \\text{cm}^3$?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{time} = \\dfrac{\\text{amount}}{\\text{mean rate}}', '\\text{time} = \\dfrac{60\\ \\text{cm}^3}{0.8\\ \\text{cm}^3\\text{/s}} = 75\\ \\text{s}'] },
      ],
      lines: [
        { say: 'The same relationship, rearranged, finds a time: time equals amount divided by mean rate.', show: 'm.0', focus: 'm.0' },
        { say: 'Oxygen is produced at a mean rate of 0.8 cubic centimetres per second. How long does it take to collect 60 cubic centimetres?', show: 'q' },
        { say: 'The time is 60 divided by 0.8, which is 75 seconds. If a rate is per second and a time is in minutes, change the minutes to seconds first.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Marble chips react with hydrochloric acid in an open flask on a balance. As carbon dioxide escapes, the mass reading falls by $0.90\\ \\text{g}$ in $60\\ \\text{s}$. What is the mean rate of reaction, as mass lost per second?',
          choices: ['$66.7\\ \\text{g/s}$', '$0.15\\ \\text{g/s}$', '$0.015\\ \\text{g/s}$', '$54\\ \\text{g/s}$'],
          answer: 2,
          working: 'Mean rate $= \\dfrac{0.90\\ \\text{g}}{60\\ \\text{s}} = 0.015\\ \\text{g/s}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Marble chips react with hydrochloric acid in an open flask on a balance. As carbon dioxide escapes, the mass reading falls by 0.90 grams in 60 seconds. What is the mean rate of reaction, as mass lost per second? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. The mean rate is 0.90 grams divided by 60 seconds, which is 0.015 grams per second. Choice A divides the time by the mass, the wrong way round.', show: 'q.answer' },
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
            'The **rate of reaction** is how quickly reactants are used up or products form.',
            '**Mean rate** $=$ amount formed (or used) $\\div$ time, in units such as $\\text{cm}^3\\text{/s}$ or $\\text{g/s}$.',
            'Rearranged: time $=$ amount $\\div$ mean rate.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The rate of reaction is how quickly the reactants are used up, or the products form.', show: 'sum.0' },
        { say: 'The mean rate is the amount formed, or used, divided by the time, in units such as cubic centimetres per second, or grams per second.', show: 'sum.1' },
        { say: 'Rearranged, the time is the amount divided by the mean rate. In part two, you will see how the rate changes as a reaction goes on. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
