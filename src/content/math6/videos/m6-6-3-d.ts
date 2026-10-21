import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { bars } from './lib/m6-6-figures.ts';

// The class trip: the bus ($50) and the students ($4 each, 4s) make $102 in all.
const trip = (id: string) =>
  figure(
    id,
    [
      bars({
        rows: [
          {
            id: 'r',
            pieces: [
              { w: 5, tex: '\\text{bus: } \\$50', tone: 'opp' },
              { w: 5.2, tex: '\\text{students: } 4s', tone: 'adj' },
            ],
          },
        ],
        total: '\\text{total: } \\$102',
      }),
    ],
    200,
  );

// Two ages: Ben is b, and Anna is b + 3; together they make 25.
const ages = (id: string) =>
  figure(
    id,
    [
      bars({
        rows: [
          { id: 'ben', label: '\\text{Ben}', pieces: [{ w: 3.5, tex: 'b', tone: 'adj' }] },
          {
            id: 'anna',
            label: '\\text{Anna}',
            pieces: [
              { w: 3.5, tex: 'b', tone: 'adj' },
              { w: 1.2, tex: '3', tone: 'opp' },
            ],
          },
        ],
        total: '25',
      }),
    ],
    250,
  );

const video: Explainer = {
  id: 'm6-6-3-d',
  lessonId: 'm6-6-3',
  title: 'Solving Equations, Part 4: Writing Equations for Problems',
  thumbnailTitle: 'Equations for Problems',
  thumbnail: 'tp',
  summary:
    'Solving a word problem in three steps: choose a letter for the unknown, write an equation that tells the story, then solve it and check the answer in the story. A class trip costs $50 for the bus plus $4 a student, $102 in all: 4s + 50 = 102, so s = 13 students. Anna is 3 years older than Ben and their ages add to 25: b + (b + 3) = 25, so Ben is 11.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Expressions and Equations · Part 4', title: 'Writing Equations for Problems', subtitle: 'Turn a story into an equation' }],
      lines: [
        { say: 'Remember the class trip? The bus costs fifty dollars, plus four dollars for each student, and the total is one hundred two dollars. How many students are going?', show: 'title' },
        { say: 'In this video, you will write an equation that tells a story like this one, solve it, and check the answer in the story.' },
      ],
    },
    {
      chapter: 'Three steps',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['**Step 1:** Choose a letter for the unknown number.', '**Step 2:** Write an equation that tells the story.', '**Step 3:** Solve it, and check your answer in the story.'],
        },
      ],
      lines: [
        { say: 'To solve a word problem with an equation, follow three steps.', show: 'b' },
        { say: 'Step one. Choose a letter for the number you do not know. Say what the letter stands for.', focus: 'b.0' },
        { say: 'Step two. Write an equation that tells the story. Each part of the story becomes a part of the equation.', focus: 'b.1' },
        { say: 'Step three. Solve the equation. Then check your answer in the story, to make sure it makes sense.', focus: 'b.2' },
      ],
    },
    {
      chapter: 'The class trip',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'A class trip costs \\$50 for the bus plus \\$4 for each student. The total cost is \\$102. How many students are going?' },
        trip('tp'),
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{Let } s = \\text{the number of students.}', '4s + 50 = 102'] },
      ],
      lines: [
        { say: 'Here is the class trip. We do not know the number of students. So for step one, let the letter s stand for the number of students.', show: ['q', 'm.0'] },
        { say: 'The bus costs fifty dollars.', show: 'tp.r-p0' },
        { say: 'Each student costs four dollars, so s students cost four times s, or four s dollars.', show: 'tp.r-p1' },
        { say: 'Together they make the total, one hundred two dollars.', show: 'tp.total' },
        { say: 'So for step two, the equation is four s plus fifty equals one hundred two.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Solve and check',
      layout: 'split',
      leftWidth: 560,
      left: [{ kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['4s + 50 = 102', '4s = 102 - 50 = 52', 's = 52 \\div 4 = 13'] }],
      right: [
        { kind: 'callout', id: 'chk', tone: 'tip', title: 'Check in the story', md: '$13$ students cost $4 \\times 13 = 52$ dollars. Add \\$50 for the bus: $52 + 50 = 102$ dollars. That is the total. ✓' },
      ],
      lines: [
        { say: 'Step three: solve four s plus fifty equals one hundred two.', show: 'm.0' },
        { say: 'Fifty is added last, so undo it first. Subtract fifty from both sides. One hundred two minus fifty is fifty-two, so four s equals fifty-two.', show: 'm.1', focus: 'm.1' },
        { say: 'Then divide both sides by four. Fifty-two divided by four is thirteen. So s equals thirteen.', show: 'm.2', focus: 'm.2' },
        { say: 'Check it in the story. Thirteen students at four dollars each cost fifty-two dollars. Add fifty dollars for the bus, and you get one hundred two dollars. That matches the total.', show: 'chk' },
        { say: 'So thirteen students are going on the trip. Always answer the question in words, with the units.' },
      ],
    },
    {
      chapter: 'Two ages',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Anna is $3$ years older than Ben. The sum of their ages is $25$. How old is Ben?' },
        ages('ag'),
        { kind: 'math', id: 'm', size: 'md', lines: ['b + (b + 3) = 25', '2b + 3 = 25'] },
      ],
      lines: [
        { say: 'Here is another story. Anna is three years older than Ben. The sum of their ages is twenty-five. How old is Ben?', show: 'q' },
        { say: 'Step one: we do not know Ben’s age, so let the letter b stand for Ben’s age.', show: ['ag.ben-p0', 'ag.ben-label'] },
        { say: 'Anna is three years older, so Anna’s age is b plus three.', show: ['ag.anna-p0', 'ag.anna-p1', 'ag.anna-label'] },
        { say: 'Step two: the sum of their ages is twenty-five. So b, plus b plus three, equals twenty-five.', show: ['ag.total', 'm.0'], focus: 'm.0' },
        { say: 'Simplify the left side first. On the left, b plus b is two b, so the equation is two b plus three equals twenty-five.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Solve the ages',
      layout: 'split',
      leftWidth: 560,
      left: [{ kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['2b + 3 = 25', '2b = 22', 'b = 11'] }],
      right: [{ kind: 'callout', id: 'chk', tone: 'tip', title: 'Check in the story', md: 'Ben is $11$, so Anna is $11 + 3 = 14$. The sum is $11 + 14 = 25$. ✓' }],
      lines: [
        { say: 'Step three: solve two b plus three equals twenty-five.', show: 'm.0' },
        { say: 'Subtract three from both sides: two b equals twenty-two.', show: 'm.1', focus: 'm.1' },
        { say: 'Divide both sides by two: b equals eleven. So Ben is eleven years old.', show: 'm.2', focus: 'm.2' },
        { say: 'Check it in the story. If Ben is eleven, Anna is three years older, so Anna is fourteen. Eleven plus fourteen is twenty-five. That matches the story.', show: 'chk' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Pens cost \\$4 each. Maya buys some pens and one \\$6 notebook, and pays \\$30 in all. How many pens did Maya buy?',
          choices: ['$24$', '$6$', '$9$', '$5$'],
          answer: 1,
          working: 'Let $p$ be the number of pens: $4p + 6 = 30$. Subtract $6$: $4p = 24$. Divide by $4$: $p = 6$. Check: $6$ pens cost \\$24, and $24 + 6 = 30$.',
        },
      ],
      lines: [
        { say: 'Your turn. Pens cost four dollars each. Maya buys some pens and one notebook for six dollars, and pays thirty dollars in all. How many pens did Maya buy? Pause the video and try it.', show: 'q', wait: 6 },
        {
          say: 'The answer is B, six pens. Let the letter p stand for the number of pens. Then four p plus six equals thirty. Subtract six: four p equals twenty-four. Divide by four: p equals six. Check: six pens cost twenty-four dollars, plus six is thirty. Choice A forgets to divide by four.',
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
          items: ['Choose a letter for the unknown number.', 'Write an equation that tells the story.', 'Solve it, and check the answer in the story.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To solve a word problem, first choose a letter for the unknown number.', show: 'sum.0' },
        { say: 'Then write an equation that tells the story.', show: 'sum.1' },
        { say: 'Then solve it, and check the answer in the story. Well done: you can now turn a story into an equation, and solve it!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
