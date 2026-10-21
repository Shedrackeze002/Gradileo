import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { balance } from '@/content/math5/videos/lib/m5-7-figures.ts';

// n + 3 = 7 on a level balance: a bag and 3 marbles on the left, 7 marbles on the right.
const scale = (id: string) =>
  figure(
    id,
    [
      balance({
        left: { bags: 1, marbles: [{ id: 'three', count: 3 }] },
        right: { marbles: [{ id: 'seven', count: 7 }] },
        labels: ['n + 3', '7'],
      }),
    ],
    330,
  );
const scaleAll = (id: string) => [`${id}.stand`, `${id}.lbags`, `${id}.l-three`, `${id}.r-seven`, `${id}.labels`];

const video: Explainer = {
  id: 'm7-6-1-b',
  lessonId: 'm7-6-1',
  title: 'Expressions and Equations, Part 2: Expressions and Equations',
  thumbnailTitle: 'Expression or Equation?',
  thumbnail: 'sc',
  summary:
    'An equation says that two expressions have the same value, so it always has an equals sign, like 6g + 4 = 22; an expression, like 6g + 4, has none. Only the equals sign decides: 5x + 2 has a variable but is still an expression, and 8 + 5 = 13 has no variable but is an equation.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Expressions and Equations · Part 2', title: 'Expressions and Equations', subtitle: 'It all depends on the equals sign' }],
      lines: [
        { say: 'Six g plus four is an expression. It gives the cost of bowling g games. But what if you know that the total cost was twenty-two dollars?', show: 'title' },
        { say: 'Then you can write an equation. In this video, you will learn how an equation is different from an expression, and how to tell them apart.' },
      ],
    },
    {
      chapter: 'Equations',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Equation', md: 'An **equation** says that two expressions have the same value, such as $6g + 4 = 22$. It always has an **equals sign**.' },
        scale('sc'),
      ],
      lines: [
        { say: 'An equation makes a statement. It says that two things are equal, so it always has an equals sign.', show: 'def' },
        { say: 'For example, six g plus four equals twenty-two says that the cost of the games and the shoes is twenty-two dollars.', focus: 'def' },
        { say: 'You can picture an equation as a level balance. Here, a bag of n marbles and three more marbles balance seven marbles.', show: scaleAll('sc') },
        { say: 'The balance shows the equation n plus three equals seven. The left side and the right side have the same value, so the balance is level.' },
      ],
    },
    {
      chapter: 'Expression or equation?',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Expressions (no equals sign)', 'Equations (equals sign)'],
          rows: [
            ['$6g + 4$', '$6g + 4 = 22$'],
            ['$3n$', '$3n = 15$'],
            ['$8 + 5$', '$8 + 5 = 13$'],
          ],
        },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Look for the equals sign', md: 'An expression **names** an amount. An equation **says** that two amounts are equal.' },
      ],
      lines: [
        { say: 'Here are some expressions on the left, and some equations on the right.', show: 't' },
        { say: 'Six g plus four is an expression. Six g plus four equals twenty-two is an equation.', focus: 't.0' },
        { say: 'Three n is an expression. Three n equals fifteen is an equation.', focus: 't.1' },
        { say: 'Eight plus five is an expression. Eight plus five equals thirteen is an equation.', focus: 't.2' },
        { say: 'An expression is like a phrase: it names an amount. An equation is like a whole sentence: it says that two amounts are equal.', show: 'key', focus: 'key' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'A variable does not make an equation', md: '$5x + 2$ has a variable, but it is still an **expression**, because it has no equals sign. $8 + 5 = 13$ has no variable, but it is an **equation**.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['5x + 2 \\quad \\to \\quad \\text{expression}', '8 + 5 = 13 \\quad \\to \\quad \\text{equation}'] },
      ],
      lines: [
        { say: 'Watch out for this mistake. Some people think that anything with a letter in it is an equation.', show: 'oops' },
        { say: 'Five x plus two has a variable, but it has no equals sign. So it is an expression, not an equation.', show: 'm.0', focus: 'm.0' },
        { say: 'And eight plus five equals thirteen has no variable at all. But it has an equals sign, so it is an equation.', show: 'm.1', focus: 'm.1' },
        { say: 'The letters do not decide. Only the equals sign decides.' },
      ],
    },
    {
      chapter: 'Sort them',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['', 'Equals sign?', 'Expression or equation?'],
          rows: [
            ['$2x = 10$', 'Yes', 'Equation'],
            ['$y - 4$', 'No', 'Expression'],
            ['$7 + 2 = 9$', 'Yes', 'Equation'],
            ['$\\dfrac{m}{3} + 1$', 'No', 'Expression'],
          ],
        },
      ],
      lines: [
        { say: 'Let’s sort a few more. For each one, just ask: is there an equals sign?', show: 't' },
        { say: 'Two x equals ten has an equals sign, so it is an equation.', focus: 't.0' },
        { say: 'Next comes y minus four. It has no equals sign, so it is an expression.', focus: 't.1' },
        { say: 'Seven plus two equals nine has an equals sign, so it is an equation, even with no variable.', focus: 't.2' },
        { say: 'And m over three, plus one, has no equals sign, so it is an expression.', focus: 't.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which one is an **equation**?',
          choices: ['$4x + 7$', '$9 - 2y$', '$3 \\times 5 + 1$', '$6 + 2 = 8$'],
          answer: 3,
          working: '$6 + 2 = 8$ is the only one with an equals sign, so it is the only equation. The others are expressions.',
        },
      ],
      lines: [
        { say: 'Your turn. Which one of these is an equation? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, six plus two equals eight. It is the only one with an equals sign. Choice A has a variable, but no equals sign, so it is an expression.', show: 'q.answer' },
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
          items: ['An **equation** says that two expressions have the same value. It always has an equals sign.', 'An **expression** names an amount. It has no equals sign.', 'Only the equals sign decides, not the letters.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An equation says that two expressions have the same value, so it always has an equals sign. It is like a level balance.', show: 'sum.0' },
        { say: 'An expression names an amount, and it has no equals sign.', show: 'sum.1' },
        { say: 'Only the equals sign decides, not the letters. In the next part, you will learn the names of the parts of an expression. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
