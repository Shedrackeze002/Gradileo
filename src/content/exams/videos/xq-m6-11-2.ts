import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { machine } from '@/content/math6/videos/lib/m6-11-figures.ts';

// Exam question for Math 6 lesson 11.2 (function rules and equations). The free OpenStax books have
// no question like this at this level, so this one is written by Gradileo in the style of a Grade 6
// mathematics unit test. The fees are stated in the question. A $25 joining fee plus $10 a month:
// c = 10m + 25. (b) m = 6: c = 60 + 25 = 85. (c) c = 95: 10m = 70, so m = 7.

const QUESTION =
  'A gym charges a $25 joining fee plus $10 for each month. (a) Write an equation for the total cost c, in dollars, for m months. (b) Use your equation to find the total cost for 6 months. (c) After how many months will the total cost be $95?';

const gym = (id: string) =>
  figure(id, [machine({ steps: ['\\times 10', '+ 25'], titles: ['m', 'c'], sets: [{ in: '6', mids: ['60'], out: '85' }, { in: '?', mids: ['70'], out: '95', tone: 'opp' }] })], 260);

const video: Explainer = {
  id: 'xq-m6-11-2',
  lessonId: '',
  exam: {
    lesson: 'm6-11-2',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 6 mathematics unit test',
    licence: 'Written by Gradileo',
    question: QUESTION,
  },
  title: 'Exam Question: An Equation for the Cost of a Gym (Function Rules and Equations)',
  thumbnailTitle: 'The Gym Equation',
  thumbnail: 'gm',
  summary:
    'An exam-style question, solved one small step at a time: a gym charges a $25 joining fee plus $10 for each month. (a) Write an equation for the total cost c for m months. (b) Find the cost for 6 months. (c) After how many months is the total $95? The cost is 10 times the months plus 25, so c = 10m + 25. For 6 months, c = 60 + 25 = 85 dollars. For a total of 95 dollars, 10m = 70, so m = 7 months. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'The Gym Equation', subtitle: 'Function rules and equations, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam-style question about writing and using an equation. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'Gradileo wrote this question in the style of a unit test, because the free textbooks we use have no question like it.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          kicker: 'The question',
          prompt: 'A gym charges a \\$25 joining fee plus \\$10 for each month. (a) Write an equation for the total cost $c$, in dollars, for $m$ months. (b) Use your equation to find the total cost for $6$ months. (c) After how many months will the total cost be \\$95?',
          answer: '(a) $c = 10m + 25$ (b) \\$85 (c) $7$ months',
          working: '10 × 6 + 25 = 85; 10m + 25 = 95, so m = 7',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'A gym charges a 25 dollar joining fee, plus 10 dollars for each month. Part a. Write an equation for the total cost "c", in dollars, for "m" months. Part b. Use your equation to find the total cost for 6 months. Part c. After how many months will the total cost be 95 dollars?', caption: 'A gym charges a $25 joining fee plus $10 for each month. (a) Write an equation for the total cost c, in dollars, for m months. (b) Find the total cost for 6 months. (c) After how many months will the total cost be $95?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Joining fee and monthly fee', md: 'A **joining fee** is paid **once**, when you join. The **monthly fee** is paid **every** month. The total cost $c$ **depends** on the number of months $m$.' }],
      lines: [
        { say: 'A joining fee is paid once, when you join. The monthly fee is paid every month.', show: 'c' },
        { say: 'So the total cost "c" depends on the number of months "m".' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'key', title: 'From words to an equation', md: 'Something paid **each** month is **multiplied** by the number of months. Something paid **once** is **added** once. To undo the rule, work **backwards**: subtract, then divide.' }],
      lines: [
        { say: 'Here is what we need. An amount paid each month is multiplied by the number of months. An amount paid once is added once.', show: 'c' },
        { say: 'And to go from the cost back to the months, undo the rule backwards: subtract first, then divide.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['(a) Write the **rule** as an equation', '(b) **Substitute** $m = 6$', '(c) Set $c = 95$ and work **backwards**'] }],
      lines: [
        { say: 'Here is the plan. For part a, write the rule as an equation.', show: 'plan.0' },
        { say: 'For part b, substitute 6 for "m".', show: 'plan.1' },
        { say: 'For part c, set the cost to 95 and work backwards.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Write it, use it, undo it',
      layout: 'split',
      leftWidth: 500,
      left: [gym('mc')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{(a) } \\good{c = 10m + 25}', '\\text{(b) } c = 10(6) + 25 = \\good{\\$85}', '\\text{(c) } 10m + 25 = 95', '10m = 70', 'm = \\good{7 \\text{ months}}'] }],
      lines: [
        { say: 'Step one. Each month costs 10 dollars, so the months are multiplied by 10. The joining fee of 25 dollars is added once. The rule is: times 10, then plus 25.', show: ['mc.frame', 'mc.box0', 'mc.box1', 'mc.titles'], focus: ['mc.box0', 'mc.box1'] },
        { say: 'As an equation: "c" equals 10 "m" plus 25.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two. Put 6 into the machine. 10 times 6 is 60, and 60 plus 25 is 85. Six months cost 85 dollars.', show: ['mc.set0', 'm.1'], focus: 'm.1' },
        { say: 'Step three. Now we know the cost, 95 dollars, and want the months. Set 10 "m" plus 25 equal to 95.', show: 'm.2', hide: 'mc.set0', focus: 'm.2' },
        { say: 'Work backwards. Undo the plus 25: 95 minus 25 is 70. So 10 "m" is 70.', show: ['mc.set1', 'm.3'], focus: 'm.3' },
        { say: 'Undo the times 10: 70 divided by 10 is 7. The total cost will be 95 dollars after 7 months.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['10(7) + 25 = 70 + 25 = 95 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check part c. Put 7 into the equation: 10 times 7 is 70, and 70 plus 25 is 95. It checks out.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Trap', 'What goes wrong'],
          rows: [
            ['$c = 25m + 10$', 'swapped the fees: the **monthly** fee is multiplied'],
            ['(b) \\$160', 'used $25m + 10$: $25 \\times 6 + 10$'],
            ['(c) $9.5$ months', 'divided $95$ by $10$: **subtract** the joining fee first'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '"c" equals 25 "m" plus 10 swaps the fees. The fee paid every month is the one multiplied by the months.' },
        { say: '160 dollars for part b comes from that swapped equation: 25 times 6 plus 10.', caption: '$160 for part b comes from that swapped equation: 25 × 6 + 10.' },
        { say: '9 and a half months divides 95 by 10 straight away. Subtract the joining fee first, then divide.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A taxi charges \\$3 to start plus \\$2 for each kilometre. Which equation gives the cost $c$, in dollars, for $k$ kilometres?',
          choices: ['$c = 3k + 2$', '$c = 5k$', '$c = 2k + 3$', '$c = 2 + 3 + k$'],
          answer: 2,
          working: 'The \\$2 is paid for each kilometre, so it multiplies k; the \\$3 is paid once, so it is added.',
        },
      ],
      lines: [
        { say: 'Your turn. A taxi charges 3 dollars to start, plus 2 dollars for each kilometre. Which equation gives the cost "c" for "k" kilometres? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The 2 dollars is paid for each kilometre, so it multiplies "k". The 3 dollars is paid once, so it is added. "c" equals 2 "k" plus 3. Choice "C".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Paid **each** time: **multiply**', 'Paid **once**: **add**', '**Substitute** to find the output', 'Work **backwards** to find the input'] }],
      lines: [
        { say: 'Here is what to remember. An amount paid each time is multiplied.', show: 'sum.0' },
        { say: 'An amount paid once is added.', show: 'sum.1' },
        { say: 'Substitute a value into the equation to find the output.', show: 'sum.2' },
        { say: 'And work backwards to find the input. For more on function rules and equations, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
