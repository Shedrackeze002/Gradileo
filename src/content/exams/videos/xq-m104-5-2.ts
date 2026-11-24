import type { Explainer } from '@/video/script.ts';

// Exam question for Math 10-4 lesson 5.2 (expressions and formulas). The question is a Try It from
// OpenStax Prealgebra 2e, word for word (section 9.7, Solve a Formula for a Specific Variable,
// CC BY-NC-SA 4.0). d = rt = 60 × 5.5 = 330 miles, as in the book's answer. Check: 60 × 5 = 300 and
// half an hour at 60 is 30 more, so 330.

const QUESTION = 'Lindsay drove for 5 1/2 hours at 60 miles per hour. How much distance did she travel?';

const video: Explainer = {
  id: 'xq-m104-5-2',
  lessonId: '',
  exam: {
    lesson: 'm104-5-2',
    source: 'OpenStax, Prealgebra 2e, Try It in section 9.7, Solve a Formula for a Specific Variable',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/9-7-solve-a-formula-for-a-specific-variable',
    question: QUESTION,
  },
  title: 'Exam Question: How Far Did Lindsay Drive? (Expressions and Formulas)',
  thumbnailTitle: 'How Far Did Lindsay Drive?',
  summary:
    'A real test question, solved one small step at a time: Lindsay drove for 5 1/2 hours at 60 miles per hour. How much distance did she travel? We use the formula distance = rate × time, write 5 1/2 as 5.5, and get 60 × 5.5 = 330 miles. Then we check hour by hour and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Far Did Lindsay Drive?', subtitle: 'Expressions and formulas, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about using a formula. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Prealgebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'Lindsay drove for $5\\tfrac{1}{2}$ hours at $60$ miles per hour. How much distance did she travel?',
          answer: '$330$ miles',
          working: '$d = rt = 60 \\times 5.5 = 330$',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Lindsay drove for 5 and a half hours at 60 miles per hour. How much distance did she travel?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{rate} = 60 \\text{ mi/h}, \\quad \\text{time} = 5\\tfrac{1}{2} \\text{ h}, \\quad \\text{distance} = \\ ?'] },
        { kind: 'text', id: 't', size: 'md', md: '"$60$ miles per hour" means she covers $60$ miles in **each** hour.' },
      ],
      lines: [
        { say: 'We know her speed, or rate: 60 miles per hour. We know the time: 5 and a half hours. We want the distance.', show: 'm' },
        { say: '60 miles per hour means she covers 60 miles in each hour of driving.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['d = r \\times t'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Distance, rate and time', md: '$d$ is the **distance**, $r$ is the **rate** (speed) and $t$ is the **time**. The units must match: miles per **hour** goes with time in **hours**.' },
      ],
      lines: [
        { say: 'Here is what we need: the formula d equals r times t.', show: 'f' },
        { say: 'd is the distance, r is the rate, or speed, and t is the time. The units must match: a speed in miles per hour goes with a time in hours.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write $5\\tfrac{1}{2}$ as a **decimal**', '**Substitute** into $d = rt$', '**Multiply**'] }],
      lines: [
        { say: 'Here is the plan. Write 5 and a half as a decimal.', show: 'plan.0' },
        { say: 'Substitute the numbers into the formula.', show: 'plan.1' },
        { say: 'Then multiply.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The time',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['5\\tfrac{1}{2} = 5.5 \\text{ hours}'] }],
      lines: [
        { say: 'Step one. A half is 0.5, so 5 and a half hours is 5.5 hours.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 2: Substitute',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['d = r \\times t', 'd = 60 \\times 5.5'] }],
      lines: [
        { say: 'Step two. Start from the formula.', show: 'm.0' },
        { say: 'Put 60 in place of r, and 5.5 in place of t.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Multiply',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['60 \\times 5.5 = \\good{330 \\text{ miles}}'] }],
      lines: [
        { say: 'Step three. 60 times 5.5 is 330. Lindsay travelled 330 miles.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['5 \\text{ hours}: \\ 5 \\times 60 = 300', '\\tfrac{1}{2} \\text{ hour}: \\ 60 \\div 2 = 30', '300 + 30 = 330 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check hour by hour. In 5 full hours, she drives 5 times 60, which is 300 miles.', show: 'm.0' },
        { say: 'In the last half hour, she drives half of 60, which is 30 miles.', show: 'm.1' },
        { say: '300 plus 30 is 330 miles. It checks out.', show: 'm.2', focus: 'm.2' },
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
            ['$300$ miles', 'forgot the **half** hour'],
            ['$65.5$ miles', '**added**: distance is rate **times** time'],
            ['$10.9$ miles', '**divided**: that is not how far she goes'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '300 miles leaves out the last half hour of driving.' },
        { say: '65.5 adds the speed and the time. The formula multiplies them.' },
        { say: 'And 60 divided by 5.5 gives about 10.9, far less than one hour of driving. Distance is rate times time.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A train travels at $80$ km/h for $2\\tfrac{1}{2}$ hours. How far does it go?',
          choices: ['$200$ km', '$160$ km', '$82.5$ km', '$32$ km'],
          answer: 0,
          working: '$d = 80 \\times 2.5 = 200$ km.',
        },
      ],
      lines: [
        { say: 'Your turn. A train travels at 80 kilometres per hour for 2 and a half hours. How far does it go? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'd equals r times t: 80 times 2.5, which is 200 kilometres. Choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$d = r \\times t$', 'Write mixed numbers as **decimals**', '**Substitute**, then calculate', 'Check the **units** match'] }],
      lines: [
        { say: 'Here is what to remember. Distance is rate times time.', show: 'sum.0' },
        { say: 'Write a mixed number like 5 and a half as a decimal.', show: 'sum.1' },
        { say: 'Substitute the numbers into the formula, then calculate.', show: 'sum.2' },
        { say: 'And check that the units match. For more on expressions and formulas, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
