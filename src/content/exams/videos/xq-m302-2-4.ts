import type { Explainer } from '@/video/script.ts';

// Exam question for Math 30-2 lesson 2.4 (combinations). The question is a Your Turn from OpenStax
// Contemporary Mathematics, word for word (section 7.3, Combinations, CC BY-NC-SA 4.0). The
// winners get the same prize, so order does not matter: 58C3 = (58 × 57 × 56)/3! = 185,136/6 =
// 30,856, as in the book's solution. The check lists the 4 groups of 3 from 4 people.

const QUESTION =
  'At a charity event with 58 people in attendance, 3 raffle winners are chosen. All receive the same prize, so order doesn’t matter. How many different groups of 3 winners can be chosen?';

const video: Explainer = {
  id: 'xq-m302-2-4',
  lessonId: '',
  exam: {
    lesson: 'm302-2-4',
    source: 'OpenStax, Contemporary Mathematics, Your Turn in section 7.3, Combinations',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/contemporary-mathematics/pages/7-3-combinations',
    question: QUESTION,
  },
  title: 'Exam Question: Groups of 3 Raffle Winners (Combinations)',
  thumbnailTitle: 'Groups of 3 Raffle Winners',
  thumbnail: 'm',
  summary:
    'A real test question, solved one small step at a time: 3 raffle winners are chosen from 58 people, and all get the same prize. How many different groups of winners are possible? Order does not matter, so it is a combination: 58C3 = (58 × 57 × 56)/3! = 185,136/6 = 30,856. Then we check with 4 people and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Groups of 3 Raffle Winners', subtitle: 'Combinations, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about combinations. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Contemporary Mathematics textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: QUESTION,
          answer: '${}_{58}C_3 = 30{,}856$ groups',
          working: 'Same prize, so order does not matter: $\\dfrac{58 \\times 57 \\times 56}{3!}$.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it.', show: 'q' },
        { say: 'At a charity event with 58 people in attendance, 3 raffle winners are chosen. All receive the same prize, so order doesn\'t matter. How many different groups of 3 winners can be chosen?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'We pick a **group** of $3$ people out of $58$. Drawing Ana, then Ben, then Cy gives the **same** group as Cy, then Ana, then Ben.' }],
      lines: [
        { say: 'We pick a group of 3 people out of 58.', show: 't' },
        { say: 'Everyone gets the same prize, so drawing Ana, then Ben, then Cy gives the same group of winners as Cy, then Ana, then Ben.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ncr', tone: 'definition', title: 'Combinations', md: 'Choosing $r$ of $n$ objects when order does **not** matter: $\\ {}_nC_r = \\dfrac{n!}{r! \\, (n - r)!}$' },
        { kind: 'callout', id: 'why', tone: 'tip', title: 'Why divide?', md: 'Each group of $r$ can be put in order $r!$ ways, so ${}_nP_r$ counts every group $r!$ times.' },
      ],
      lines: [
        { say: 'Here is what we need. The number of ways to choose r of n objects, when order does not matter, is n C r: n factorial over r factorial times n minus r factorial.', show: 'ncr' },
        { say: 'Why the extra r factorial? Each group of r can be put in order r factorial ways, so the permutation count counts every group r factorial times.', show: 'why' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Decide: does **order** matter?', 'Count the **ordered** draws', 'Divide by the orders of each group: $3!$'] }],
      lines: [
        { say: 'Here is the plan. First, decide whether order matters.', show: 'plan.0' },
        { say: 'Second, count the draws as if order did matter.', show: 'plan.1' },
        { say: 'Third, divide by the number of orders of each group, 3 factorial.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Does order matter?',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{same prize for all 3}', '\\Rightarrow \\ \\good{\\text{order does not matter: a combination}}'] }],
      lines: [
        { say: 'Step one. All 3 winners get the same prize.', show: 'm.0' },
        { say: 'So only the group matters, not the order of the draw. This is a combination.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Ordered draws',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['{}_{58}P_3 = 58 \\times 57 \\times 56 = 185{,}136'] }],
      lines: [
        { say: 'Step two. If order did matter, there would be 58 choices for the first draw, 57 for the second and 56 for the third: 58 times 57 times 56, which is 185,136.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Step 3: Divide by 3!',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['{}_{58}C_3 = \\dfrac{58!}{3! \\, 55!} = \\dfrac{185{,}136}{3!}', '= \\dfrac{185{,}136}{6} = \\good{30{,}856}'] }],
      lines: [
        { say: 'Step three. Each group of 3 winners shows up 3 factorial times in those ordered draws. So 58 C 3 is 185,136 over 3 factorial.', show: 'm.0' },
        { say: '3 factorial is 6, and 185,136 over 6 is 30,856 different groups of winners.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['4 \\text{ people, 3 winners: } {}_4C_3 = \\dfrac{4 \\times 3 \\times 2}{3!} = 4', '\\{A, B, C\\}, \\ \\{A, B, D\\}, \\ \\{A, C, D\\}, \\ \\{B, C, D\\} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check the method on a raffle small enough to list: 4 people and 3 winners. The method gives 4 times 3 times 2, over 3 factorial, which is 4.', show: 'm.0' },
        { say: 'Listing them: each group leaves out exactly one person, so there are 4 groups. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['${}_{58}P_3 = 185{,}136$', 'same prize: order does **not** matter'],
            ['$185{,}136 \\div 3$', 'divide by $3! = 6$, the orders of **3** people'],
            ['$58^3$', 'nobody can win **twice**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '185,136 counts every order of the same 3 winners. With the same prize, order does not matter.' },
        { say: 'Divide by 3 factorial, which is 6, not by 3. Three people can be ordered in 6 ways.' },
        { say: 'And 58 cubed lets the same person win more than once.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'In how many ways can a committee of $4$ be chosen from $9$ people?',
          choices: ['$3024$', '$36$', '$126$', '$252$'],
          answer: 2,
          working: '${}_9C_4 = \\dfrac{9 \\times 8 \\times 7 \\times 6}{4!} = \\dfrac{3024}{24} = 126$.',
        },
      ],
      lines: [
        { say: 'Your turn. In how many ways can a committee of 4 be chosen from 9 people? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Order does not matter. 9 times 8 times 7 times 6 is 3,024, and 4 factorial is 24. 3,024 over 24 is 126: choice C.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Same prize, same job, a group: order does **not** matter', '${}_nC_r = \\dfrac{n!}{r! \\, (n - r)!}$', '${}_nC_r = {}_nP_r \\div r!$', 'Check on a small case you can list'] }],
      lines: [
        { say: 'Here is what to remember. When everyone chosen is treated the same, order does not matter.', show: 'sum.0' },
        { say: 'n C r is n factorial over r factorial times n minus r factorial.', show: 'sum.1' },
        { say: 'It is the same as n P r divided by r factorial.', show: 'sum.2' },
        { say: 'And check on a small case you can list. For more on combinations, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
