import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { papers, phStrip } from './lib/c10-5-figures.ts';

// Litmus papers: blue turns red in an acid, red turns blue in a base.
const litmus = figure('p', [
  papers({
    tests: [
      { id: 'blue', before: 'adj', after: 'bad', label: '\\text{blue litmus}', afterLabel: '\\text{red}', dip: '\\text{acid}' },
      { id: 'red', before: 'bad', after: 'adj', label: '\\text{red litmus}', afterLabel: '\\text{blue}', dip: '\\text{base}' },
    ],
  }),
]);

// The colours of universal indicator on the course's chart.
const universal = figure('u', [phStrip({ colours: 'universal', names: true, shade: 0.7 })], 300);

// The same chart, with pH 12 marked.
const twelve = figure('u', [phStrip({ colours: 'universal', names: true, shade: 0.7, marks: [{ id: 'twelve', value: 12, tex: '\\text{pH } 12', arrow: true }] })], 280);

const video: Explainer = {
  id: 'c10-5-3-c',
  lessonId: 'c10-5-3',
  title: 'Acids, Bases and the pH Scale, Part 3: Indicators',
  thumbnailTitle: 'Indicators',
  thumbnail: 'u',
  summary:
    'An indicator is a dye with different colours in acidic and basic solutions. Acids turn blue litmus red and bases turn red litmus blue; phenolphthalein is colourless in acidic and neutral solutions and pink in basic ones. Universal indicator shows roughly what the pH is: red, orange or yellow in acids, green at pH 7, and blue or purple in bases.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Moles, Acids and Bases · Part 3', title: 'Indicators', subtitle: 'Dyes that change colour' }],
      lines: [
        { say: 'You should never taste a solution to find out whether it is acidic. So how can you tell? Use a dye that changes colour.', show: 'title' },
        { say: 'In this part, you will predict the colours of litmus, phenolphthalein and universal indicator. An electronic p H meter measures more precisely, but indicators are quick and easy.', caption: 'In this part, you will predict the colours of litmus, phenolphthalein and universal indicator. An electronic pH meter measures more precisely, but indicators are quick and easy.' },
      ],
    },
    {
      chapter: 'Litmus',
      layout: 'split',
      leftWidth: 680,
      left: [litmus],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Indicator', md: 'An **indicator** is a dye that has a different colour in acidic and basic solutions. Litmus, phenolphthalein and universal indicator are common indicators.' }],
      lines: [
        { say: 'An indicator is a dye that has a different colour in acidic and basic solutions.', show: 'def' },
        { say: 'Litmus comes as red or blue paper. Acids turn blue litmus red.', show: ['p.blue', 'p.blue-after'] },
        { say: 'Bases turn red litmus blue.', show: ['p.red', 'p.red-after'] },
        { say: 'In a neutral solution, neither paper changes colour.' },
      ],
    },
    {
      chapter: 'Phenolphthalein',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Indicator', 'Acidic', 'Neutral', 'Basic'],
          rows: [
            ['blue litmus paper', '[[bad:turns red]]', '[[adj:stays blue]]', '[[adj:stays blue]]'],
            ['red litmus paper', '[[bad:stays red]]', '[[bad:stays red]]', '[[adj:turns blue]]'],
            ['phenolphthalein', 'colourless', 'colourless', '[[hyp:pink]]'],
          ],
        },
      ],
      lines: [
        { say: 'Here is litmus in a table. Blue litmus turns red only in an acid. Red litmus turns blue only in a base.', show: ['t.0', 't.1'] },
        { say: 'Phenolphthalein is a liquid indicator. A few drops are colourless in acidic and neutral solutions, and turn pink in basic ones.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Universal indicator',
      layout: 'center',
      main: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Universal indicator', md: 'A mixture of dyes that changes through a whole range of colours, so it shows roughly what the pH is.' }, universal],
      lines: [
        { say: 'Universal indicator is a mixture of dyes. It changes through a whole range of colours, so it shows roughly what the p H is, not just whether a solution is acidic or basic.', caption: 'Universal indicator is a mixture of dyes. It changes through a whole range of colours, so it shows roughly what the pH is, not just whether a solution is acidic or basic.', show: ['def', 'u.scale'] },
        { say: 'Charts differ a little from one maker to another. In this course, it is red from p H zero to two, orange at three and four, and yellow at five and six.', caption: 'Charts differ a little from one maker to another. In this course, it is red from pH 0 to 2, orange at 3 and 4, and yellow at 5 and 6.', show: ['u.red', 'u.orange', 'u.yellow'] },
        { say: 'It is green at seven, blue from eight to ten, and purple from eleven to fourteen.', caption: 'It is green at 7, blue from 8 to 10, and purple from 11 to 14.', show: ['u.green', 'u.blue', 'u.purple'] },
        { say: 'So red is the most acidic, and purple the most basic.', focus: ['u.red', 'u.purple'] },
      ],
    },
    {
      chapter: 'Predicting colours',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'A solution has a pH of 12. What colour does it turn red litmus paper, phenolphthalein and universal indicator?' },
        twelve,
        {
          kind: 'table',
          id: 't',
          head: ['Red litmus', 'Phenolphthalein', 'Universal indicator'],
          rows: [['[[adj:turns blue]]', '[[hyp:pink]]', '[[brand:purple]]']],
        },
      ],
      lines: [
        { say: 'A solution has a p H of twelve. What colour does it turn red litmus paper, phenolphthalein and universal indicator?', caption: 'A solution has a pH of 12. What colour does it turn red litmus paper, phenolphthalein and universal indicator?', show: ['q', 'u.scale', 'u.red', 'u.orange', 'u.yellow', 'u.green', 'u.blue', 'u.purple'] },
        { say: 'Twelve is above seven, so the solution is basic. Bases turn red litmus blue, and phenolphthalein pink.', show: 't', focus: 't' },
        { say: 'On the chart, p H twelve is in the range from eleven to fourteen. So universal indicator turns purple.', caption: 'On the chart, pH 12 is in the range from 11 to 14. So universal indicator turns purple.', show: 'u.twelve', focus: ['u.twelve', 'u.purple'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What colour is phenolphthalein when a few drops are added to a solution with a pH of 7?',
          choices: ['Red', 'Blue', 'Colourless', 'Pink'],
          answer: 2,
          working: 'A pH of 7 is neutral, and phenolphthalein is colourless in acidic and neutral solutions. It turns pink only in basic ones.',
        },
      ],
      lines: [
        { say: 'Your turn. What colour is phenolphthalein, when a few drops are added to a solution with a p H of seven? Pause the video and try it.', caption: 'Your turn. What colour is phenolphthalein, when a few drops are added to a solution with a pH of 7? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, colourless. A p H of seven is neutral, and phenolphthalein is colourless in neutral solutions as well as acidic ones. Choice D, pink, is its colour only in a base.', caption: 'The answer is C, colourless. A pH of 7 is neutral, and phenolphthalein is colourless in neutral solutions as well as acidic ones. Choice D, pink, is its colour only in a base.', show: 'q.answer' },
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
            'An **indicator** is a dye with different colours in acidic and basic solutions.',
            '**Litmus**: acids turn blue litmus red, and bases turn red litmus blue.',
            '**Phenolphthalein** is colourless in acidic and neutral solutions, and pink in basic ones.',
            '**Universal indicator** is red, orange or yellow in acids, green at pH 7, and blue or purple in bases.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An indicator is a dye with different colours in acidic and basic solutions.', show: 'sum.0' },
        { say: 'Acids turn blue litmus red, and bases turn red litmus blue.', show: 'sum.1' },
        { say: 'Phenolphthalein is colourless in acidic and neutral solutions, and pink in basic ones.', show: 'sum.2' },
        { say: 'And universal indicator shows roughly what the p H is. In part four, you will use two indicators together to narrow down a p H. See you there!', caption: 'And universal indicator shows roughly what the pH is. In part four, you will use two indicators together to narrow down a pH. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
