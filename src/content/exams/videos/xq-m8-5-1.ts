import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { tape } from '@/content/math8/videos/lib/m8-3-figures.ts';

// Exam question for Math 8 lesson 5.1 (multiplying integers). The question is an exercise from
// OpenStax Prealgebra 2e, word for word (section 3.4, Multiply and Divide Integers, CC BY-NC-SA
// 4.0). A drop is negative: 300 × (−12) = −3,600, so the portfolio changed by −$3,600.

const QUESTION = 'Javier owns 300 shares of stock in one company. On Tuesday, the stock price dropped $12 per share. What was the total effect on Javier’s portfolio?';

const shares = (id: string) =>
  figure(
    id,
    [tape({ unit: 3.2, parts: [{ id: 's', count: 3, tone: 'opp', name: '\\text{3 groups of 100 shares}', value: '-\\$1{,}200' }], total: '300 \\text{ shares}' })],
    240,
  );

const video: Explainer = {
  id: 'xq-m8-5-1',
  lessonId: '',
  exam: {
    lesson: 'm8-5-1',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 3.4, Multiply and Divide Integers',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/3-4-multiply-and-divide-integers',
    question: QUESTION,
  },
  title: 'Exam Question: Javier’s Falling Shares (Multiplying Integers)',
  thumbnailTitle: 'Javier’s Falling Shares',
  thumbnail: 'ck',
  summary:
    'A real test question, solved one small step at a time: Javier owns 300 shares of stock, and on Tuesday the price dropped $12 per share. What was the total effect on his portfolio? A drop is a negative change, so each share changed by −$12. The total change is 300 × (−12). A positive times a negative is negative, and 300 × 12 = 3,600, so the effect was −$3,600: Javier’s shares lost $3,600 in value. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Javier’s Falling Shares', subtitle: 'Multiplying integers, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about multiplying integers. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Javier owns $300$ shares of stock in one company. On Tuesday, the stock price dropped \\$12 per share. What was the total effect on Javier’s portfolio?',
          answer: '−\\$3,600 (a loss of \\$3,600)',
          working: '300 × (−12) = −3,600',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Javier owns 300 shares of stock in one company. On Tuesday, the stock price dropped 12 dollars per share. What was the total effect on Javier\'s portfolio?', caption: 'Javier owns 300 shares of stock in one company. On Tuesday, the stock price dropped $12 per share. What was the total effect on Javier’s portfolio?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [shares('ask'), { kind: 'callout', id: 'c', tone: 'definition', title: 'Shares and a portfolio', md: 'A **share** is a small piece of a company that people can buy. A **portfolio** is everything someone owns like this. Each of Javier\'s $300$ shares **dropped** by \\$12, so each changed by $-12$ dollars.' }],
      lines: [
        { say: 'A share is a small piece of a company that people can buy. A portfolio is everything someone owns like this.', show: 'c' },
        { say: 'Javier has 300 shares, and each one dropped by 12 dollars. A drop is a negative change, so each share changed by negative 12 dollars. What is the total change?', caption: 'Javier has 300 shares, and each one dropped by $12. A drop is a negative change, so each share changed by −$12. What is the total change?', show: ['ask.s', 'ask.total'] },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{total change} = \\text{number} \\times \\text{change each}', '(+) \\times (-) = (-)', '(-) \\times (-) = (+)'] }],
      lines: [
        { say: 'Here is what we need. The total change is the number of shares times the change in each one.', show: 'm.0' },
        { say: 'A positive times a negative is negative.', show: 'm.1' },
        { say: 'And, though we will not need it here, a negative times a negative is positive.', show: 'm.2' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write the drop as a **negative**: $-12$', '**Multiply** by the number of shares', 'Decide the **sign**'] }],
      lines: [
        { say: 'Here is the plan. Write the drop as a negative number: negative 12.', show: 'plan.0' },
        { say: 'Multiply by the number of shares.', show: 'plan.1' },
        { say: 'Then decide the sign of the answer.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Multiply, then the sign',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['300 \\times (\\opp{-12})', '300 \\times 12 = 3{,}600', '(+) \\times (-) = (-) \\ \\Rightarrow \\ \\good{-\\$3{,}600}'] }],
      lines: [
        { say: 'Step one. 300 shares each change by negative 12 dollars: 300 times negative 12.', caption: 'Step one. 300 shares each change by −$12: 300 × (−12).', show: 'm.0', focus: 'm.0' },
        { say: 'Step two. Multiply the numbers without their signs. 3 times 12 is 36, so 300 times 12 is 3 thousand 600.', caption: 'Step two. Multiply the numbers without their signs. 3 × 12 = 36, so 300 × 12 = 3,600.', show: 'm.1', focus: 'm.1' },
        { say: 'Step three. A positive times a negative is negative. So the total effect is negative 3 thousand 600 dollars. Javier\'s shares lost 3 thousand 600 dollars in value.', caption: 'Step three. A positive times a negative is negative. So the total effect is −$3,600. Javier’s shares lost $3,600 in value.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [shares('ck'), { kind: 'math', id: 'm', size: 'md', lines: ['100 \\times (-12) = -1{,}200', '3 \\times (-1{,}200) = -3{,}600 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by splitting the 300 shares into 3 groups of 100. Each group of 100 shares changes by 100 times negative 12: negative 1 thousand 200 dollars.', caption: 'Let us check by splitting the 300 shares into 3 groups of 100. Each group of 100 shares changes by 100 × (−12): −$1,200.', show: ['ck.s', 'ck.total', 'ck.s-v', 'm.0'], focus: 'm.0' },
        { say: '3 groups of negative 1 thousand 200 make negative 3 thousand 600. It checks out.', caption: '3 groups of −1,200 make −3,600. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['\\$3,600', 'lost the sign: a drop is a **negative** change'],
            ['−\\$12', 'that is the change in **one** share'],
            ['−\\$36,000', 'one zero too many: $300 \\times 12 = 3{,}600$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Positive 3 thousand 600 dollars would be a gain. The price dropped, so the change is negative.', caption: '+$3,600 would be a gain. The price dropped, so the change is negative.' },
        { say: 'Negative 12 dollars is the change in just one share. Javier has 300.', caption: '−$12 is the change in just one share. Javier has 300.' },
        { say: 'And negative 36 thousand dollars has one zero too many. 3 times 12 is 36, and 300 has two zeros, so the answer is 3 thousand 600.', caption: 'And −$36,000 has one zero too many. 3 × 12 = 36, and 300 has two zeros, so the answer is 3,600.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A diver goes down $4$ m every minute. What is the change in the diver’s depth after $6$ minutes?',
          choices: ['$-24$ m', '$24$ m', '$-10$ m', '$2$ m'],
          answer: 0,
          working: 'Going down is negative: 6 × (−4) = −24 m.',
        },
      ],
      lines: [
        { say: 'Your turn. A diver goes down 4 metres every minute. What is the change in the diver\'s depth after 6 minutes? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Going down is negative, so each minute is a change of negative 4. 6 times negative 4 is negative 24 metres. Choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A drop or loss is **negative**', 'Total change $=$ number $\\times$ change each', '$(+) \\times (-) = (-)$', 'Check: split into **easy** groups'] }],
      lines: [
        { say: 'Here is what to remember. A drop or a loss is a negative change.', show: 'sum.0' },
        { say: 'The total change is the number of items times the change in each.', show: 'sum.1' },
        { say: 'A positive times a negative is negative.', show: 'sum.2' },
        { say: 'And check by splitting into easy groups. For more on multiplying integers, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
