import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { diceGrid } from './lib/m302-3-figures.ts';

/** The cells of the dice grid with no six, and with at least one. */
const noSix: [number, number][] = [];
const aSix: [number, number][] = [];
for (let r = 1; r <= 6; r++) for (let c = 1; c <= 6; c++) (r === 6 || c === 6 ? aSix : noSix).push([r, c]);

const video: Explainer = {
  id: 'm302-3-2-c',
  lessonId: 'm302-3-2',
  title: 'Probability Using Counting Methods, Part 3: At Least One',
  thumbnailTitle: 'At Least One',
  thumbnail: 'dice',
  summary: 'Finding the probability of at least one by subtracting the probability of none from 1: at least one Grade 12 student on a random committee (1 − 20/120 = 5/6, checked by adding the cases), and at least one six on two dice (1 − 25/36 = 11/36).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Probability · Part 3', title: 'At Least One', subtitle: '$P(\\text{at least one}) = 1 - P(\\text{none})$' }],
      lines: [
        { say: 'What is the chance that a random committee has at least one Grade 12 student? Counting every way that can happen takes a long time. There is a shortcut: count the opposite.', show: 'title' },
        { say: 'In this video, you will find the probability of at least one by subtracting the probability of none from one, and check it the long way.' },
      ],
    },
    {
      chapter: 'None, or at least one',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{Grade 12 members: } \\ \\underbrace{\\bad{0}}_{\\text{none}} \\qquad \\underbrace{\\good{1, \\ \\ 2, \\ \\ 3}}_{\\text{at least one}}'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'The complement of “at least one”', md: '“At least one” means one or more. Its complement is “none”, so $P(\\text{at least one}) = 1 - P(\\text{none})$.' },
      ],
      lines: [
        { say: '“At least one” means one or more. A committee of three can have zero, one, two or three Grade 12 students.', show: 'm' },
        { say: 'At least one covers three of those cases: one, two or three. The only case left over is none.' },
        { say: 'So “none” is the complement of “at least one”. One of the two must happen, so P of at least one is one minus P of none.', show: 'key' },
      ],
    },
    {
      chapter: 'At least one Grade 12 student',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'A committee of 3 is chosen at random from 4 Grade 12 and 6 Grade 11 students. What is the probability that at least one member is in Grade 12?' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{none: } {}_{6}C_{3} = 20 \\text{ of the } {}_{10}C_{3} = 120 \\text{ committees}', 'P(\\text{none}) = \\dfrac{20}{120} = \\dfrac{1}{6}', 'P(\\text{at least one}) = 1 - \\dfrac{1}{6} = \\dfrac{5}{6}'] },
      ],
      lines: [
        { say: 'A committee of three is chosen at random from four Grade 12 students and six Grade 11 students. What is the probability that at least one member is in Grade 12?', show: 'p' },
        { say: 'Counting directly means three cases: exactly one, exactly two, or exactly three Grade 12 students. Instead, count the opposite: no Grade 12 students at all.' },
        { say: 'No Grade 12 students means all three come from the six Grade 11 students. Six choose three is twenty. And there are ten choose three, or 120, committees in all.', show: 'm.0', focus: 'm.0' },
        { say: 'So P of none is twenty over 120, which is one sixth.', show: 'm.1', focus: 'm.1' },
        { say: 'And P of at least one is one minus one sixth, which is five sixths.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the long way',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Grade 12 members', 'Count', 'Committees'],
          rows: [
            ['3', '${}_{4}C_{3} \\times {}_{6}C_{0} = 4 \\times 1$', '4'],
            ['2', '${}_{4}C_{2} \\times {}_{6}C_{1} = 6 \\times 6$', '36'],
            ['1', '${}_{4}C_{1} \\times {}_{6}C_{2} = 4 \\times 15$', '60'],
            ['0', '${}_{4}C_{0} \\times {}_{6}C_{3} = 1 \\times 20$', '20'],
          ],
        },
        { kind: 'math', id: 'm', size: 'md', lines: ['4 + 36 + 60 = 100, \\qquad \\dfrac{100}{120} = \\dfrac{5}{6} \\ \\checkmark'] },
      ],
      lines: [
        { say: 'Let’s check the long way. Exactly three in Grade 12: choose three of the four, and none of the Grade 11 students. That is four committees.', show: 't.0', focus: 't.0' },
        { say: 'Exactly two in Grade 12: six times six, or thirty-six committees.', show: 't.1', focus: 't.1' },
        { say: 'Exactly one: choose one of the four Grade 12 students and two of the six Grade 11 students. Four times fifteen is sixty.', show: 't.2', focus: 't.2' },
        { say: 'So at least one is four plus thirty-six plus sixty, which is 100 committees, and 100 over 120 is five sixths. It is the same answer, with three times the work.', show: 'm', focus: 'm' },
        { say: 'The twenty committees with none make up the rest: 100 plus twenty is all 120.', show: 't.3', focus: 't.3' },
      ],
    },
    {
      chapter: 'At least one six',
      layout: 'split',
      leftWidth: 540,
      left: [figure('dice', [diceGrid({ marks: [{ id: 'six', cells: aSix, tone: 'good' }, { id: 'none', cells: noSix, tone: 'muted' }] })], 470)],
      right: [
        { kind: 'text', id: 'p', size: 'md', align: 'left', md: 'Two dice are rolled. What is the probability that at least one of the dice shows a 6?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{all: } 6 \\times 6 = 36', '\\text{no six: } 5 \\times 5 = 25', 'P(\\text{no six}) = \\dfrac{25}{36}', 'P(\\text{at least one six}) = \\dfrac{11}{36}'] },
      ],
      lines: [
        { say: 'Here is another example. Two dice are rolled. What is the probability that at least one of the dice shows a six?', show: 'p' },
        { say: 'The grid shows all the outcomes: six for the first die, times six for the second, is thirty-six.', show: ['dice.grid', 'dice.heads', 'm.0'], focus: 'm.0' },
        { say: 'It is quicker to count the opposite: no six at all. Each die has five numbers that are not six, so there are five times five, or twenty-five, outcomes with no six.', show: ['dice.none', 'm.1'], focus: ['m.1', 'dice.none'] },
        { say: 'P of no six is twenty-five thirty-sixths. So the probability that at least one die shows a six is one minus that, which is eleven thirty-sixths.', show: ['m.2', 'm.3'], focus: ['m.2', 'm.3'] },
        { say: 'Count the green cells to check: six in the last column, and five more in the last row. That is eleven.', show: 'dice.six', focus: 'dice.six' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The wrong complement', md: 'The complement of “at least one” is “none”, not “all of them”. For the committee, $1 - P(\\text{all Grade 12}) = 1 - \\dfrac{1}{30}$ is the probability that **not all** members are in Grade 12.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{1 - \\dfrac{1}{30} = \\dfrac{29}{30}} \\qquad \\good{1 - \\dfrac{1}{6} = \\dfrac{5}{6}}'] },
      ],
      lines: [
        { say: 'A common mistake is to subtract the wrong probability from one.', show: 'oops' },
        { say: 'The complement of “at least one” is “none”, not “all of them”. One minus the probability that all three are in Grade 12 gives twenty-nine thirtieths. That is the probability that not all of them are in Grade 12, which is a different event.', show: 'm', focus: 'm' },
        { say: 'Before you subtract from one, say the complement in words, and check that it covers every case you do not want.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Three students are chosen at random from 5 boys and 4 girls. What is the probability that at least one girl is chosen?',
          choices: ['$\\dfrac{5}{42}$', '$\\dfrac{1}{21}$', '$\\dfrac{20}{21}$', '$\\dfrac{37}{42}$'],
          answer: 3,
          working: 'No girls: ${}_{5}C_{3} = 10$ of ${}_{9}C_{3} = 84$, so $P(\\text{none}) = \\dfrac{10}{84} = \\dfrac{5}{42}$ and $P(\\text{at least one}) = 1 - \\dfrac{5}{42} = \\dfrac{37}{42}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Three students are chosen at random from five boys and four girls. What is the probability that at least one girl is chosen? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, thirty-seven over forty-two. No girls means three boys: five choose three is ten, out of nine choose three, which is eighty-four. So P of none is five over forty-two, and P of at least one girl is one minus that. Choice A is P of none: it forgets to subtract from one.', show: 'q.answer' },
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
          items: ['“At least one” means one or more; its complement is “none”.', '$P(\\text{at least one}) = 1 - P(\\text{none})$', 'Check: the counts of all the cases add up to the total.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. At least one means one or more, and its complement is none.', show: 'sum.0' },
        { say: 'So P of at least one is one minus P of none. It saves counting many cases.', show: 'sum.1' },
        { say: 'And to check, the counts of all the cases add up to the total. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
