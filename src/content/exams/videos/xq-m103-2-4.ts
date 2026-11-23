import type { Explainer } from '@/video/script.ts';

// Exam question for Math 10-3 lesson 2.4 (payroll deductions and net pay). The free OpenStax books
// only have US payroll taxes, so this one is written by Gradileo in the style of a Grade 10
// workplace mathematics unit test. Every rate is stated in the question (they are made up for the
// question, not current official rates). CPP: 5% of ($1,250 − $150) = $55.00; EI: 1.5% of $1,250
// = $18.75; income tax $140.00; deductions $213.75, so net pay is $1,250.00 − $213.75 = $1,036.25.
// Check: $1,036.25 + $213.75 = $1,250.00.

const QUESTION =
  'Priya earns $1,250.00 in gross pay for a two-week pay period. Her employer deducts Canada Pension Plan (CPP) contributions of 5% of her gross pay above $150, Employment Insurance (EI) premiums of 1.5% of her gross pay, and $140.00 in income tax. Use these rates. What is Priya’s net pay?';

const video: Explainer = {
  id: 'xq-m103-2-4',
  lessonId: '',
  exam: {
    lesson: 'm103-2-4',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 10 workplace mathematics unit test',
    licence: 'Written by Gradileo',
    question: QUESTION,
  },
  title: 'Exam Question: From Gross Pay to Net Pay (Payroll Deductions)',
  thumbnailTitle: 'Gross Pay to Take-Home Pay',
  thumbnail: 'm',
  summary:
    'An exam-style question, solved one small step at a time: Priya earns $1,250.00 gross pay. Her employer deducts CPP at 5% of her pay above $150, EI at 1.5% of her pay, and $140.00 income tax (rates given in the question). What is her net pay? CPP is 5% of $1,100 = $55.00, EI is $18.75, so the deductions total $213.75 and the net pay is $1,036.25. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Gross Pay to Take-Home Pay', subtitle: 'Payroll deductions, step by step' }],
      lines: [
        { say: 'In this video, we solve a test-style question about payroll deductions and net pay. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'Gradileo wrote this question in the style of a Grade 10 workplace maths test. You will see that at the bottom of the screen the whole way through.' },
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
          prompt: 'Priya earns \\$1,250.00 in gross pay for a two-week pay period. Her employer deducts Canada Pension Plan (CPP) contributions of $5\\%$ of her gross pay above \\$150, Employment Insurance (EI) premiums of $1.5\\%$ of her gross pay, and \\$140.00 in income tax. Use these rates. What is Priya’s net pay?',
          answer: '\\$1,036.25',
          working: 'Deductions: \\$55.00 + \\$18.75 + \\$140.00 = \\$213.75',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'Priya earns 1,250 dollars in gross pay for two weeks. Her employer deducts Canada Pension Plan contributions of 5 percent of her gross pay above 150 dollars, Employment Insurance premiums of 1.5 percent of her gross pay, and 140 dollars in income tax. Use these rates. What is her net pay?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'tab',
          head: ['Deduction', 'The rule in the question'],
          rows: [
            ['CPP', '$5\\%$ of the pay **above** \\$150'],
            ['EI', '$1.5\\%$ of **all** the gross pay'],
            ['Income tax', '\\$140.00'],
          ],
        },
        { kind: 'text', id: 't', size: 'md', md: '**Net pay** is what is left of the gross pay after the deductions.' },
      ],
      lines: [
        { say: 'Here are the three deductions. CPP is 5 percent, but only of the pay above 150 dollars. EI is 1.5 percent of all the pay. And the income tax is 140 dollars.', show: 'tab' },
        { say: 'Net pay is what is left of the gross pay after all the deductions. It is the take-home pay.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\text{net pay} = \\text{gross pay} - \\text{total deductions}'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'An exemption', md: '"Above \\$150" means the first \\$150 is **exempt**: take it off **before** finding the percent.' },
        { kind: 'callout', id: 'r', tone: 'tip', title: 'Rates change', md: 'Real CPP and EI rates change every year. Use the rates **in the question**.' },
      ],
      lines: [
        { say: 'Here is what we need. Net pay is the gross pay minus the total deductions.', show: 'f' },
        { say: 'Above 150 dollars means the first 150 dollars is exempt. Take it off before you find the percent.', show: 'c' },
        { say: 'Real CPP and EI rates change every year, so always use the rates given in the question.', show: 'r' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the **CPP** and the **EI**', '**Add** all the deductions', '**Subtract** from the gross pay'] }],
      lines: [
        { say: 'Here is the plan. Find the CPP and the EI.', show: 'plan.0' },
        { say: 'Add up all the deductions.', show: 'plan.1' },
        { say: 'Then subtract them from the gross pay.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: CPP and EI',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{CPP: } 0.05 \\times (1{,}250 - 150) = 0.05 \\times 1{,}100 = \\$55.00', '\\text{EI: } 0.015 \\times 1{,}250 = \\$18.75'] }],
      lines: [
        { say: 'Step one. CPP: take off the 150 dollar exemption, which leaves 1,100 dollars. 5 percent of 1,100 is 55 dollars.', show: 'm.0' },
        { say: 'EI: 1.5 percent of all 1,250 dollars is 0.015 times 1,250, which is 18 dollars 75.', show: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Total deductions',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\$55.00 + \\$18.75 + \\$140.00 = \\good{\\$213.75}'] }],
      lines: [
        { say: 'Step two. Add the three deductions: 55 plus 18.75 plus 140 is 213 dollars 75.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 3: Net pay',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\$1{,}250.00 - \\$213.75 = \\good{\\$1{,}036.25}'] }],
      lines: [
        { say: 'Step three. Subtract from the gross pay: 1,250 minus 213.75 is 1,036 dollars 25. That is Priya\'s net pay.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\$1{,}036.25 + \\$213.75 = \\$1{,}250.00 \\ \\checkmark', '\\tfrac{213.75}{1{,}250} \\approx 17\\% \\text{ deducted: sensible}'] }],
      lines: [
        { say: 'Let us check. Net pay plus deductions should give back the gross pay: 1,036.25 plus 213.75 is 1,250 dollars.', show: 'm.0' },
        { say: 'And the deductions are about 17 percent of the pay, which is a sensible amount. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['CPP $= 5\\%$ of \\$1,250 $=$ \\$62.50', 'forgot the **exemption**: only pay above \\$150'],
            ['EI $= 1.5 \\times 1{,}250$', '$1.5\\%$ is $0.015$, not $1.5$'],
            ['Net pay $=$ \\$1,250.00', 'that is the **gross** pay, before deductions'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'CPP is only on the pay above 150 dollars. Taking 5 percent of all the pay gives 62 dollars 50, which is too much.' },
        { say: '1.5 percent is 0.015 as a decimal, not 1.5.' },
        { say: 'And the gross pay is the pay before deductions. The net pay is what is left.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Gross pay is \\$800. Deductions: EI at $1.5\\%$ of the gross pay, CPP at $5\\%$ of the pay above \\$100, and \\$60 income tax. What is the net pay?',
          choices: ['\\$693', '\\$740', '\\$688', '\\$107'],
          answer: 0,
          working: 'EI \\$12, CPP $0.05 \\times 700 =$ \\$35, tax \\$60: \\$107 off, so \\$693.',
        },
      ],
      lines: [
        { say: 'Your turn. Gross pay is 800 dollars. Deductions: EI at 1.5 percent of the gross pay, CPP at 5 percent of the pay above 100 dollars, and 60 dollars of income tax. What is the net pay? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'EI is 12 dollars. CPP is 5 percent of 700, which is 35 dollars. With the tax, that is 107 dollars of deductions, so the net pay is 693 dollars. Choice A.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Net pay $=$ gross pay $-$ deductions', 'An **exemption** comes off **before** the percent', 'Change percents to **decimals**', 'Use the rates **given** in the question'] }],
      lines: [
        { say: 'Here is what to remember. Net pay is the gross pay minus all the deductions.', show: 'sum.0' },
        { say: 'An exemption comes off before you find the percent.', show: 'sum.1' },
        { say: 'Change each percent to a decimal.', show: 'sum.2' },
        { say: 'And use the rates given in the question. For more on payroll deductions and net pay, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
