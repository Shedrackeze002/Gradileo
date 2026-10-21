import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { ineqLine } from './lib/m9-6-figures.ts';

// h ≥ 120: a closed dot at 120 and an arrow to the right, numbered every 10 cm.
const height = (id: string) => figure(id, [ineqLine({ min: 90, max: 150, step: 5, every: 2, boundary: { value: 120, closed: true, dir: 'right' } })], 200);

const video: Explainer = {
  id: 'm9-6-4-c',
  lessonId: 'm9-6-4',
  title: 'Representing Inequalities, Part 3: Writing Inequalities',
  thumbnailTitle: 'Writing Inequalities',
  thumbnail: 'ht',
  summary:
    'To write an inequality for a situation, choose a variable, find the boundary value and pick the symbol from the key words. “At least 120 cm” means 120 or more: h ≥ 120, a closed dot at 120 with an arrow to the right. One side can be an expression: a taxi that charges $4 plus $2 per km, with at most $30 to spend, gives 4 + 2k ≤ 30. “At least” sounds small but means ≥; “at most” and “no more than” mean ≤.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Linear Equations and Inequalities · Part 3', title: 'Writing Inequalities', subtitle: 'From words to symbols' }],
      lines: [
        { say: 'Height rules, weight limits, budgets: many real rules are inequalities in disguise.', show: 'title' },
        { say: 'In this part, you will turn words into an inequality, and show it on a number line.' },
      ],
    },
    {
      chapter: 'Three steps',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['**1.** Choose a variable, and say what it stands for, with units.', '**2.** Find the boundary value.', '**3.** Pick the symbol from the key words.'],
        },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Key words', md: '“At least” means $\\ge$. “At most” and “no more than” mean $\\le$. “More than” means $>$, and “less than” means $<$.' },
      ],
      lines: [
        { say: 'Use three steps. Step one: choose a variable, and say what it stands for, with units.', show: 'b.0' },
        { say: 'Step two: find the boundary value, the number where the allowed values start or stop.', show: 'b.1' },
        { say: 'Step three: pick the symbol from the key words.', show: 'b.2' },
        { say: 'At least means greater than or equal to. At most, and no more than, mean less than or equal to. More than means greater than, and less than means less than.', show: 'key' },
      ],
    },
    {
      chapter: 'A height rule',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'To ride a roller coaster at a summer fair, a rider must be **at least** 120 cm tall. Write an inequality and show it on a number line.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Let } h = \\text{a rider’s height in centimetres.}', 'h \\ge 120'] },
        height('ht'),
      ],
      lines: [
        { say: 'To ride a roller coaster at a summer fair, a rider must be at least one hundred twenty centimetres tall. Write an inequality, and show it on a number line.', show: 'q' },
        { say: 'Step one: let h stand for the height of a rider, in centimetres.', show: 'm.0' },
        { say: 'Step two: the boundary value is one hundred twenty.' },
        { say: 'Step three: at least one hundred twenty means one hundred twenty or more. So the symbol is greater than or equal to: h is greater than or equal to one hundred twenty.', show: 'm.1', focus: 'm.1' },
        { say: 'On the number line, a rider who is exactly one hundred twenty centimetres tall is allowed, so draw a closed dot at one hundred twenty. Taller riders are allowed as well, so draw an arrow to the right.', show: ['ht.axis', 'ht.dot', 'ht.ray'], focus: ['ht.dot', 'ht.ray'] },
      ],
    },
    {
      chapter: 'A taxi budget',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'A taxi charges \\$4 plus \\$2 per kilometre. Maya can spend **at most** \\$30. Write an inequality for the distance $k$, in kilometres, that Maya can travel.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{cost} = 4 + 2k', '4 + 2k \\le 30'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'An expression on one side', md: 'One side of an inequality can be an expression, such as the cost $4 + 2k$.' },
      ],
      lines: [
        { say: 'Sometimes one side of the inequality is an expression. A taxi charges four dollars, plus two dollars per kilometre. Maya can spend at most thirty dollars. Write an inequality for the distance k, in kilometres, that Maya can travel.', show: 'q' },
        { say: 'The cost, in dollars, is four plus two k: the four dollar fee, plus two dollars for each of the k kilometres.', show: 'm.0', focus: 'm.0' },
        { say: 'At most thirty dollars means the cost is less than or equal to thirty. So four plus two k is less than or equal to thirty.', show: 'm.1', focus: 'm.1' },
        { say: 'In the next lesson, you will solve inequalities like this one, to find the greatest distance Maya can travel.', show: 'tip' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'At least and at most', md: '“At least” sounds small, but it means that number **or more**: $\\ge$. “At most” means that number **or less**: $\\le$. “No more than” also means $\\le$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{at least } 120\\text{: } h \\ge 120', '\\text{at most } 30\\text{: } \\text{cost} \\le 30'] },
      ],
      lines: [
        { say: 'Watch out for at least and at most. At least sounds small, but it means that number or more. So at least one hundred twenty means greater than or equal to one hundred twenty.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'At most means that number or less. So at most thirty means less than or equal to thirty. No more than means the same thing.', show: 'm.1', focus: 'm.1' },
        { say: 'A quick test: is the boundary itself allowed? A rider exactly one hundred twenty centimetres tall may ride, so the symbol includes equal to.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A phone plan costs \\$15 plus \\$2 per GB of data. Sam can spend at most \\$35. Which inequality fits the number of GB, $g$?',
          choices: ['$15 + 2g \\le 35$', '$15 + 2g \\ge 35$', '$2 + 15g \\le 35$', '$15 + 2g < 35$'],
          answer: 0,
          working: 'The cost is $15 + 2g$ dollars. “At most \\$35” means \\$35 or less: $15 + 2g \\le 35$.',
        },
      ],
      lines: [
        { say: 'Your turn. A phone plan costs fifteen dollars, plus two dollars per gigabyte of data. Sam can spend at most thirty-five dollars. Which inequality fits the number of gigabytes, g? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The cost in dollars is fifteen plus two g, and at most thirty-five means thirty-five or less. Choice B uses greater than or equal to, which would mean at least thirty-five dollars.', show: 'q.answer' },
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
            'Choose a variable, find the boundary, and pick the symbol from the key words.',
            '“At least” means $\\ge$; “at most” and “no more than” mean $\\le$.',
            'One side can be an expression: $4 + 2k \\le 30$.',
            'Show it on a number line with a dot and an arrow.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To write an inequality, choose a variable, find the boundary, and pick the symbol from the key words.', show: 'sum.0' },
        { say: 'At least means greater than or equal to. At most, and no more than, mean less than or equal to.', show: 'sum.1' },
        { say: 'One side can be an expression, like a cost.', show: 'sum.2' },
        { say: 'And show it on a number line, with a dot and an arrow. In the next lesson, you will solve inequalities. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
