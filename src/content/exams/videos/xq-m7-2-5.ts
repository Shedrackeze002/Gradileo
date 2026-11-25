import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { stackBar } from '@/content/math6/videos/lib/m6-12-figures.ts';

// Exam question for Math 7 lesson 2.5 (solving percent problems). The question is a Try It from
// OpenStax Prealgebra 2e, word for word (section 6.2, Solve General Applications of Percent,
// CC BY-NC-SA 4.0). What percent of 230 is 60? p = 60 ÷ 230 = 0.2608…, about 0.26, so 26%.

const QUESTION =
  'Veronica is planning to make muffins from a mix. The package says each muffin will be 230 calories and 60 calories will be from fat. What percent of the total calories is from fat? (Round to the nearest whole percent.)';

const bar = (id: string) =>
  figure(
    id,
    [
      stackBar({
        width: 12,
        whole: '230 \\text{ calories} = 100\\%',
        parts: [
          { id: 'fat', value: 60, tone: 'adj', label: '60', below: '\\text{fat} \\approx 26\\%' },
          { id: 'rest', value: 170, tone: 'theta', label: '170', below: '\\text{the rest} \\approx 74\\%' },
        ],
      }),
    ],
    220,
  );

const video: Explainer = {
  id: 'xq-m7-2-5',
  lessonId: '',
  exam: {
    lesson: 'm7-2-5',
    source: 'OpenStax, Prealgebra 2e, Try It in section 6.2, Solve General Applications of Percent',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/6-2-solve-general-applications-of-percent',
    question: QUESTION,
  },
  title: 'Exam Question: What Percent of a Muffin Is Fat? (Solving Percent Problems)',
  thumbnailTitle: 'What Percent Is Fat?',
  thumbnail: 'sb',
  summary:
    'A real test question, solved one small step at a time: each muffin has 230 calories, and 60 of them are from fat. What percent of the calories is from fat, to the nearest whole percent? Ask: what percent of 230 is 60? Divide the part by the whole: 60 ÷ 230 = 0.2608…, which rounds to 0.26, or 26%. Then we check with a bar and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'What Percent Is Fat?', subtitle: 'Solving percent problems, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about percents. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Veronica is planning to make muffins from a mix. The package says each muffin will be $230$ calories and $60$ calories will be from fat. What percent of the total calories is from fat? (Round to the nearest whole percent.)',
          answer: 'about $26\\%$',
          working: '60 ÷ 230 = 0.2608… ≈ 0.26 = 26%',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Veronica is planning to make muffins from a mix. The package says each muffin will be 230 calories, and 60 calories will be from fat. What percent of the total calories is from fat? Round to the nearest whole percent.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Part and whole', md: 'The **whole** is all $230$ calories in a muffin. The **part** is the $60$ calories from fat. The question asks: **what percent of $230$ is $60$?**' }],
      lines: [
        { say: 'The whole is all 230 calories in one muffin. The part is the 60 calories that come from fat.', show: 'c' },
        { say: 'So the question asks: what percent of 230 is 60?' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{percent} = \\dfrac{\\text{part}}{\\text{whole}} \\times 100\\%'] }],
      lines: [
        { say: 'Here is what we need. To find what percent a part is of a whole, divide the part by the whole.', show: 'm.0' },
        { say: 'Then multiply by 100 to turn the decimal into a percent.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Divide the **part** by the **whole**', 'Change the decimal to a **percent**', 'Round to the nearest **whole percent**'] }],
      lines: [
        { say: 'Here is the plan. Divide the part by the whole.', show: 'plan.0' },
        { say: 'Change the decimal to a percent.', show: 'plan.1' },
        { say: 'Then round to the nearest whole percent.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Divide, then round',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{60}{230} = 60 \\div 230 = 0.2608\\ldots', '0.2608\\ldots \\times 100\\% = 26.08\\ldots\\%', '\\approx \\good{26\\%}'] }],
      lines: [
        { say: 'Step one. Divide the part by the whole: 60 divided by 230. That is 0.2608, and the digits keep going.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two. Multiply by 100 to make a percent. Move the decimal point 2 places to the right: 26.08 percent.', show: 'm.1', focus: 'm.1' },
        { say: 'Step three. Round to the nearest whole percent. The digit after the 26 is a 0, so we round down. About 26 percent of the calories are from fat.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'split',
      leftWidth: 560,
      left: [bar('sb')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['0.26 \\times 230 = 59.8', '59.8 \\approx 60 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check with a bar. The whole bar is 230 calories, which is 100 percent. The fat is a bit more than a quarter of it.', show: ['sb.fat', 'sb.rest', 'sb.whole'] },
        { say: 'Now go backwards: 26 percent of 230 is 0.26 times 230, which is 59.8.', show: 'm.0', focus: 'm.0' },
        { say: '59.8 is very close to 60, so our rounded answer fits. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$383\\%$', 'divided the **whole** by the part: divide the **part** by the whole'],
            ['$0.26\\%$', 'stopped at the decimal: multiply by **$100$** to make a percent'],
            ['$74\\%$', 'that is the part that is **not** fat'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '383 percent comes from 230 divided by 60. That is the wrong way round. The fat is only part of the muffin, so the answer must be less than 100 percent.' },
        { say: '0.26 percent forgets to multiply by 100. 0.26 is the decimal, and as a percent it is 26 percent.' },
        { say: 'And 74 percent is the part of the calories that is not from fat. The question asks about the fat.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A test has $40$ questions, and Sam gets $34$ of them right. What percent of the questions did Sam get right?',
          choices: ['$34\\%$', '$118\\%$', '$85\\%$', '$0.85\\%$'],
          answer: 2,
          working: '34 ÷ 40 = 0.85, and 0.85 × 100% = 85%.',
        },
      ],
      lines: [
        { say: 'Your turn. A test has 40 questions, and Sam gets 34 of them right. What percent of the questions did Sam get right? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Divide the part by the whole: 34 divided by 40 is 0.85. Times 100 is 85 percent. Choice "C".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Find the **part** and the **whole**', 'Divide **part ÷ whole**', 'Multiply by **$100$** for a percent', '**Round**, then check backwards'] }],
      lines: [
        { say: 'Here is what to remember. Find the part and the whole.', show: 'sum.0' },
        { say: 'Divide the part by the whole.', show: 'sum.1' },
        { say: 'Multiply by 100 to make a percent.', show: 'sum.2' },
        { say: 'Then round, and check by working backwards. For more on solving percent problems, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
