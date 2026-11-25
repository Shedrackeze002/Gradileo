import type { Explainer } from '@/video/script.ts';

// Exam question for Math 20-4 lesson 4.1 (making a budget). The question is a Your Turn from OpenStax
// Contemporary Mathematics, word for word (section 6.5, Making a Personal Budget, CC BY-NC-SA 4.0).
// 50% of $3,263.44 = $1,631.72, 30% = 979.032 ≈ $979.03 and 20% = 652.688 ≈ $652.69, as in the
// book's answer. Check: 1,631.72 + 979.03 + 652.69 = 3,263.44.

const QUESTION =
  'Elijah has finished an apprenticeship and is about to start his first job as an HVAC (heating, ventilation, and air conditioning) tech. He estimates that his net monthly income will be $3,263.44. Apply the 50-30-20 budget philosophy to his income to set guidelines for Elijah’s budget. How should Elijah use this information?';

const SPLIT = {
  kind: 'table' as const,
  id: 't',
  head: ['Part', 'Percent', 'Amount'],
  rows: [
    ['Needs', '$50\\%$', '\\$1,631.72'],
    ['Wants', '$30\\%$', '\\$979.03'],
    ['Savings and extra debt', '$20\\%$', '\\$652.69'],
    ['**Total**', '**$100\\%$**', '**\\$3,263.44**'],
  ],
};

const video: Explainer = {
  id: 'xq-m204-4-1',
  lessonId: '',
  exam: {
    lesson: 'm204-4-1',
    source: 'OpenStax, Contemporary Mathematics, Your Turn in section 6.5, Making a Personal Budget',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/contemporary-mathematics/pages/6-5-making-a-personal-budget',
    question: QUESTION,
  },
  title: 'Exam Question: A First Budget With the 50-30-20 Rule (Making a Budget)',
  thumbnailTitle: 'Split a Paycheque 50-30-20',
  thumbnail: 't',
  summary:
    'A real test question, solved one small step at a time: Elijah is starting his first job as an HVAC tech, with a take-home pay of $3,263.44 a month. The 50-30-20 rule gives 50% for needs, $1,631.72, 30% for wants, $979.03, and 20% for savings and extra debt payments, $652.69. Then we see how Elijah can use these limits, check that the parts add back to his pay, and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Split a Paycheque 50-30-20', subtitle: 'Budgets, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about making a budget. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt:
            'Elijah has finished an apprenticeship and is about to start his first job as an HVAC (heating, ventilation, and air conditioning) tech. He estimates that his net monthly income will be \\$3,263.44. Apply the 50-30-20 budget philosophy to his income to set guidelines for Elijah’s budget. How should Elijah use this information?',
          answer: 'Needs \\$1,631.72, wants \\$979.03, savings \\$652.69',
          working: '0.5 × 3,263.44 = 1,631.72; 0.3 × 3,263.44 = 979.03; 0.2 × 3,263.44 = 652.69',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Elijah has finished an apprenticeship and is about to start his first job as an HVAC tech, which means heating, ventilation and air conditioning.' },
        { say: 'His net monthly income will be 3 thousand 263 dollars and 44 cents. Apply the 50-30-20 budget philosophy to his income. How should Elijah use this information?', caption: 'His net monthly income will be $3,263.44. Apply the 50-30-20 budget philosophy to his income. How should Elijah use this information?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'a', tone: 'definition', title: 'Net monthly income', md: '**Net** income is the **take-home pay**: what lands in the bank after deductions. A budget is built on this amount.' },
        { kind: 'callout', id: 'b', tone: 'definition', title: 'The 50-30-20 rule', md: 'Split the take-home pay into **$50\\%$ needs**, **$30\\%$ wants** and **$20\\%$ savings** and extra debt payments.' },
      ],
      lines: [
        { say: 'Net income is take-home pay. It is what lands in the bank after deductions, and a budget is built on this amount.', show: 'a' },
        { say: 'The 50-30-20 rule splits the take-home pay into three parts. 50 percent for needs, 30 percent for wants, and 20 percent for savings and extra debt payments.', show: 'b' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'k', items: ['**Needs**: rent, food, utilities, gas, insurance, loan payments', '**Wants**: eating out, hobbies, trips, streaming', '**Savings**: an emergency fund, retirement, paying debt off faster'] },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{part} = \\text{percent (as a decimal)} \\times \\text{take-home pay}'] },
      ],
      lines: [
        { say: 'Needs are the things you must pay for: rent, food, utilities, gas, insurance and the minimum loan payments.', show: 'k.0' },
        { say: 'Wants are the things you choose: eating out, hobbies, trips and streaming.', show: 'k.1' },
        { say: 'And savings means an emergency fund, retirement, or paying debt off faster.', show: 'k.2' },
        { say: 'Each part is its percent, as a decimal, times the take-home pay.', show: 'm' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find **$50\\%$** for needs', 'Find **$30\\%$** for wants', 'Find **$20\\%$** for savings', 'Say how Elijah **uses** the limits'] }],
      lines: [
        { say: 'Here is the plan. Find 50 percent of his pay, for needs.', show: 'plan.0' },
        { say: 'Find 30 percent, for wants.', show: 'plan.1' },
        { say: 'Find 20 percent, for savings.', show: 'plan.2' },
        { say: 'Then say how Elijah can use these numbers.', show: 'plan.3' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: The split',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: [
            '0.5 \\times \\$3{,}263.44 = \\good{\\$1{,}631.72}',
            '0.3 \\times \\$3{,}263.44 = 979.032 \\approx \\good{\\$979.03}',
            '0.2 \\times \\$3{,}263.44 = 652.688 \\approx \\good{\\$652.69}',
          ],
        },
      ],
      lines: [
        { say: 'Step one. Needs: 0.5 times 3 thousand 263 dollars 44 is 1 thousand 631 dollars and 72 cents.', caption: 'Step one. Needs: 0.5 × $3,263.44 = $1,631.72.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two. Wants: 0.3 times the pay is 979.032. Rounded to the cent, that is 979 dollars and 3 cents.', caption: 'Step two. Wants: 0.3 × $3,263.44 = 979.032. Rounded to the cent, that is $979.03.', show: 'm.1', focus: 'm.1' },
        { say: 'Step three. Savings: 0.2 times the pay is 652.688. The next digit is an 8, so we round up, to 652 dollars and 69 cents.', caption: 'Step three. Savings: 0.2 × $3,263.44 = 652.688. The next digit is an 8, so we round up, to $652.69.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 4: Using the limits',
      layout: 'center',
      main: [SPLIT, { kind: 'callout', id: 'c', tone: 'key', title: 'How Elijah uses it', md: 'These are **limits**: keep needs **under \\$1,631.72**, wants **under \\$979.03**, and put **\\$652.69** into savings each month.' }],
      lines: [
        { say: 'Here is Elijah’s budget guide.', show: 't' },
        { say: 'He should use these amounts as limits. When he chooses where to live, what to drive and what to eat, he keeps those needs under 1 thousand 631 dollars 72 a month.', caption: 'He should use these amounts as limits. When he chooses where to live, what to drive and what to eat, he keeps those needs under $1,631.72 a month.', show: 'c', focus: 't.0' },
        { say: 'He keeps his wants under 979 dollars 3 cents.', caption: 'He keeps his wants under $979.03.', focus: 't.1' },
        { say: 'And he puts 652 dollars 69 into savings or extra debt payments every month.', caption: 'And he puts $652.69 into savings or extra debt payments every month.', focus: 't.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\$1{,}631.72 + \\$979.03 + \\$652.69 = \\$3{,}263.44 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. The three parts are 50, 30 and 20 percent, which make 100 percent, so they must add back to the whole paycheque.', show: 'm.0' },
        { say: '1 thousand 631.72, plus 979.03, plus 652.69, is 3 thousand 263 dollars 44. It checks out.', caption: '$1,631.72 + $979.03 + $652.69 = $3,263.44. It checks out.', focus: 'm.0' },
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
            ['\\$65.27 for needs', 'divided by $50$: $50\\%$ means **times** $0.5$'],
            ['\\$97.90 for wants', 'used $0.03$: $30\\%$ is $0.3$'],
            ['\\$652.68 to save', 'cut off a digit: $652.688$ **rounds up** to \\$652.69'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '65 dollars 27 for needs divides the pay by 50. 50 percent means half, so multiply by 0.5.', caption: '$65.27 for needs divides the pay by 50. 50% means half, so multiply by 0.5.' },
        { say: '97 dollars 90 for wants uses 0.03. 30 percent is 0.3.', caption: '$97.90 for wants uses 0.03. 30% is 0.3.' },
        { say: 'And 652 dollars 68 cuts off the last digit. The next digit is 8, so round up to 652 dollars 69.', caption: 'And $652.68 cuts off the last digit. The next digit is 8, so round up to $652.69.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Rosa follows the 50-30-20 rule, and her take-home pay is \\$2,840 a month. How much should she budget for **wants** each month?',
          choices: ['\\$568', '\\$852', '\\$1,420', '\\$1,988'],
          answer: 1,
          working: '30% of 2,840 = 0.3 × 2,840 = 852.',
        },
      ],
      lines: [
        { say: 'Your turn. Rosa’s take-home pay is 2 thousand 840 dollars a month. She follows the 50-30-20 rule. How much should she budget for wants? Pause the video and try it.', caption: 'Your turn. Rosa’s take-home pay is $2,840 a month. She follows the 50-30-20 rule. How much should she budget for wants? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Wants are 30 percent. 0.3 times 2 thousand 840 is 852 dollars. Choice "B".', caption: 'Wants are 30%. 0.3 × $2,840 = $852. Choice "B".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Use **take-home** pay', '$50\\%$ needs, $30\\%$ wants, $20\\%$ savings', 'Round each part to the **cent**', 'The parts **add back** to the pay'] }],
      lines: [
        { say: 'Here is what to remember. Build a budget on take-home pay.', show: 'sum.0' },
        { say: 'The 50-30-20 rule gives 50 percent to needs, 30 percent to wants and 20 percent to savings.', show: 'sum.1' },
        { say: 'Round each part to the cent.', show: 'sum.2' },
        { say: 'And check that the parts add back to the pay. For more on making a budget, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
