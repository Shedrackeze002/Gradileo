import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { machine } from './lib/m6-11-figures.ts';

const video: Explainer = {
  id: 'm6-11-2-c',
  lessonId: 'm6-11-2',
  title: 'Function Rules and Equations, Part 3: Finding the Dependent Value',
  thumbnailTitle: 'Finding the Dependent Value',
  thumbnail: 'mc',
  summary: 'To find y for a given x, replace x with its value (substitute) and calculate, multiplying first and then adding. For y = 4x + 5 and x = 12: 4 × 12 = 48, then 48 + 5 = 53. For the bean plant, h = 3w + 4 gives a height of 34 cm after 10 weeks. Adding first gives a wrong answer.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Function Rules and Equations · Part 3', title: 'Finding the Dependent Value', subtitle: 'Replace x, then calculate' }],
      lines: [
        { say: 'Once you have the equation of a function, you can find any value of the dependent variable, even one far beyond the table.', show: 'title' },
        { say: 'In this video, you will put a value of x into an equation, and work out y.' },
      ],
    },
    {
      chapter: 'Substituting',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Substitute', md: 'To find $y$ for a given $x$, **replace** $x$ with its value and calculate. Replacing a letter with a number is called **substituting**.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['y = 4\\adj{x} + 5', 'y = 4 \\times \\adj{12} + 5'] },
      ],
      lines: [
        { say: 'To find y for a given value of x, replace x with its value, and then calculate.', show: 'def' },
        { say: 'Replacing a letter with a number is called substituting. You put the number in where the letter was.', show: 'm.0', focus: 'm.0' },
        { say: 'For example, in y equals four x plus five, put twelve in place of x. Remember that four x means four times x.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Finding y',
      layout: 'center',
      main: [
        figure('mc', [machine({ steps: ['\\times 4', '+ 5'], titles: ['x', 'y'], sets: [{ in: '12', mids: ['48'], out: '53' }] })], 280),
        { kind: 'math', id: 'm', size: 'md', lines: ['y = 4 \\times 12 + 5', '4 \\times 12 = 48, \\quad 48 + 5 = 53', '\\text{When } x = 12, \\ y = 53.'] },
      ],
      lines: [
        { say: 'For y equals four x plus five, find y when x is twelve. Think of the equation as a machine: multiply by four, then add five.', show: ['mc.frame', 'mc.titles', 'mc.box0', 'mc.box1', 'mc.set0-in', 'm.0'] },
        { say: 'Multiply first: four times twelve is forty-eight.', show: 'mc.set0-mid0', focus: 'mc.box0' },
        { say: 'Then add: forty-eight plus five is fifty-three.', show: ['mc.set0-out', 'm.1'], focus: ['mc.box1', 'm.1'] },
        { say: 'So when x is twelve, y is fifty-three.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'The bean plant',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'lg', md: 'The bean plant’s height is $h = 3w + 4$. How tall is it after $10$ weeks?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['h = 3 \\times 10 + 4', '\\phantom{h} = 30 + 4 = 34', '\\text{After } 10 \\text{ weeks: } 34\\text{ cm}'] },
      ],
      lines: [
        { say: 'Back to the bean plant. Its height is h equals three w plus four. How tall is it after ten weeks?', show: 'q' },
        { say: 'Substitute ten for w: h equals three times ten, plus four.', show: 'm.0', focus: 'm.0' },
        { say: 'Three times ten is thirty, and thirty plus four is thirty-four.', show: 'm.1', focus: 'm.1' },
        { say: 'So after ten weeks, the plant is thirty-four centimetres tall. You did not need to extend the table week by week!', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Multiply first, then add', md: 'In $4 \\times 12 + 5$, multiply first. Adding first gives $4 \\times 17 = 68$, which is wrong.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\good{4 \\times 12 + 5 = 48 + 5 = 53} \\;\\checkmark', '\\bad{4 \\times (12 + 5) = 4 \\times 17 = 68}'] },
      ],
      lines: [
        { say: 'Be careful with the order. In four times twelve plus five, multiply first, then add. That gives fifty-three.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'If you add first, you get twelve plus five, which is seventeen, and then four times seventeen, which is sixty-eight. That is wrong!', show: 'm.1', focus: 'm.1' },
        { say: 'The rule says to multiply x by four first. So always multiply first, then add.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'For $y = 6x + 1$, find $y$ when $x = 7$.',
          choices: ['$13$', '$48$', '$42$', '$43$'],
          answer: 3,
          working: '$y = 6 \\times 7 + 1 = 42 + 1 = 43$.',
        },
      ],
      lines: [
        { say: 'Your turn. For y equals six x plus one, find y when x is seven. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, forty-three. Six times seven is forty-two, and forty-two plus one is forty-three. Choice C forgets to add the one.', show: 'q.answer' },
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
          items: ['To find $y$, replace $x$ with its value: this is called substituting.', 'Multiply first, then add.', 'An equation finds any value, without extending the table.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To find y, replace x with its value. This is called substituting.', show: 'sum.0' },
        { say: 'Then calculate: multiply first, then add.', show: 'sum.1' },
        { say: 'An equation lets you find any value, without extending the table. In the next part, you will work the other way, from y back to x. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
