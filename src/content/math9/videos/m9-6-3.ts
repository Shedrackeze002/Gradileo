import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm9-6-3',
  lessonId: 'm9-6-3',
  title: 'Solving Problems with Linear Equations, Part 1: A Plan for Word Problems',
  thumbnailTitle: 'A Plan for Word Problems',
  thumbnail: false,
  summary:
    'A six-step plan turns words into an equation: define a variable (with units), write an expression for each quantity, write an equation for what is equal, solve, verify in the words of the problem, and answer in a sentence. Plan A costs $20 a month plus $4 per GB and Plan B $35 plus $1.50 per GB: 20 + 4g = 35 + 1.5g gives g = 6, and both plans cost $44 for 6 GB. A table of costs shows the same thing.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Linear Equations and Inequalities · Part 1', title: 'A Plan for Word Problems', subtitle: 'From words to an equation' }],
      lines: [
        { say: 'Which phone plan is the better deal? Which taxi should you call? Linear equations answer real questions like these.', show: 'title' },
        { say: 'The hard part is usually not solving the equation, but writing it. In this lesson, you will follow a plan that turns words into an equation. In this part, you will learn the plan and use it once.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**1. Define** a variable: say exactly what it stands for, with units.',
            '**2. Write** an expression for each quantity.',
            '**3. Write** an equation that says what is equal.',
            '**4. Solve** the equation.',
            '**5. Verify** the answer in the words of the problem.',
            '**6. Answer** the question in a sentence, with units.',
          ],
        },
      ],
      lines: [
        { say: 'Here is the plan. Step one: define a variable. Say exactly what it stands for, with units.', show: 'b.0' },
        { say: 'Step two: write an expression for each quantity in the problem.', show: 'b.1' },
        { say: 'Step three: write an equation that says what is equal.', show: 'b.2' },
        { say: 'Step four: solve the equation.', show: 'b.3' },
        { say: 'Step five: verify the answer in the words of the problem, not only in your equation. If the equation itself is wrong, checking it will not catch the mistake.', show: 'b.4' },
        { say: 'Step six: answer the question in a sentence, with units.', show: 'b.5' },
      ],
    },
    {
      chapter: 'Two phone plans',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Plan A costs \\$20 per month plus \\$4 per gigabyte (GB) of data. Plan B costs \\$35 per month plus \\$1.50 per GB. For how many gigabytes do the two plans cost the same?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{Let } g = \\text{the number of GB used in a month.}', '\\text{Plan A: } 20 + 4g \\qquad \\text{Plan B: } 35 + 1.5g', '20 + 4g = 35 + 1.5g'] },
      ],
      lines: [
        { say: 'Plan A costs twenty dollars per month, plus four dollars per gigabyte of data. Plan B costs thirty-five dollars per month, plus one dollar and fifty cents per gigabyte. For how many gigabytes do the two plans cost the same?', show: 'q' },
        { say: 'Step one: define a variable. Let g stand for the number of gigabytes used in a month.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two: write an expression for each cost. In dollars, Plan A costs twenty plus four g, and Plan B costs thirty-five plus one point five g.', show: 'm.1', focus: 'm.1' },
        { say: 'Step three: the costs are equal, so twenty plus four g equals thirty-five plus one point five g.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Solve and verify',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['20 + 2.5g = 35 \\qquad \\text{subtract } 1.5g', '2.5g = 15 \\qquad \\text{subtract } 20', 'g = 6 \\qquad \\text{divide by } 2.5', '\\text{A: } 20 + 4(6) = 44 \\qquad \\text{B: } 35 + 1.5(6) = 44 \\;\\good{\\checkmark}'] },
        { kind: 'callout', id: 'ans', tone: 'key', title: 'Answer', md: 'Both plans cost \\$44 when 6 GB of data are used.' },
      ],
      lines: [
        { say: 'Step four: solve. Subtract one point five g from both sides: twenty plus two point five g equals thirty-five.', show: 'm.0', focus: 'm.0' },
        { say: 'Subtract twenty: two point five g equals fifteen. Divide by two point five: g equals six.', show: ['m.1', 'm.2'], focus: 'm.2' },
        { say: 'Step five: verify in the words of the problem. Plan A costs twenty plus four times six, which is forty-four dollars. Plan B costs thirty-five plus one point five times six, which is forty-four dollars as well. They match.', show: 'm.3', focus: 'm.3' },
        { say: 'Step six: answer in a sentence. Both plans cost forty-four dollars when six gigabytes of data are used.', show: 'ans' },
      ],
    },
    {
      chapter: 'A table of costs',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Data (GB)', '$0$', '$2$', '$4$', '$6$', '$8$'],
          rows: [
            ['Plan A (\\$)', '$20$', '$28$', '$36$', '$44$', '$52$'],
            ['Plan B (\\$)', '$35$', '$38$', '$41$', '$44$', '$47$'],
          ],
        },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Before and after', md: 'Below 6 GB, Plan A is cheaper. Above 6 GB, Plan B is cheaper.' },
      ],
      lines: [
        { say: 'A table of costs shows the same answer. Plan A starts at twenty dollars and goes up by eight dollars for every two gigabytes.', show: 't.0', focus: 't.0' },
        { say: 'Plan B starts at thirty-five dollars and goes up by only three dollars for every two gigabytes.', show: 't.1', focus: 't.1' },
        { say: 'At six gigabytes, both cost forty-four dollars. Below six gigabytes, Plan A is cheaper. Above six, Plan B is cheaper. The equation found the exact point where they switch.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Gym A charges a \\$40 joining fee plus \\$25 per month. Gym B charges a \\$100 joining fee plus \\$15 per month. Which equation gives the number of months, $m$, for which the total costs are equal?',
          choices: ['$40m + 25 = 100m + 15$', '$40 + 25m = 100 - 15m$', '$40 + 25m = 100 + 15m$', '$65m = 115m$'],
          answer: 2,
          working: 'Each total is the joining fee plus the monthly price times $m$: $40 + 25m = 100 + 15m$. Then $10m = 60$, so $m = 6$ months, and both cost \\$190.',
        },
      ],
      lines: [
        { say: 'Your turn. Gym A charges a forty dollar joining fee, plus twenty-five dollars per month. Gym B charges a one hundred dollar joining fee, plus fifteen dollars per month. Which equation gives the number of months, m, for which the total costs are equal? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Each total is the joining fee, plus the monthly price times m. Solving gives m equals six months, when both gyms cost one hundred ninety dollars. Choice A mixes up the fees and the monthly prices.', show: 'q.answer' },
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
            'Define a variable, with units.',
            'Write an expression for each quantity, then an equation for what is equal.',
            'Solve the equation.',
            'Verify in the words of the problem, and answer in a sentence with units.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. First, define a variable, with units.', show: 'sum.0' },
        { say: 'Write an expression for each quantity, and then an equation that says what is equal.', show: 'sum.1' },
        { say: 'Solve the equation.', show: 'sum.2' },
        { say: 'Then verify in the words of the problem, and answer in a sentence with units. In the next part, you will compare two options, like two taxi companies. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
