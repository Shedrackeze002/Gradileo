import type { Explainer } from '@/video/script.ts';

// Exam question for Math 10-3 lesson 1.4 (currency exchange). The question is an exercise from
// OpenStax Intermediate Algebra 2e, word for word (section 7.5, Solve Applications with Rational
// Equations, CC BY-NC-SA 4.0). $250 US × 1.3 = $325 Canadian, as in the book's answer. Check:
// $325 ÷ 1.3 = $250 going back. The video says the rate is the one given in the question, not
// today's rate.

const QUESTION =
  'Kyra is traveling to Canada and will change $250 US dollars into Canadian dollars. At the current exchange rate, $1 US is equal to $1.3 Canadian. How many Canadian dollars will she get for her trip?';

const video: Explainer = {
  id: 'xq-m103-1-4',
  lessonId: '',
  exam: {
    lesson: 'm103-1-4',
    source: 'OpenStax, Intermediate Algebra 2e, Exercise in section 7.5, Solve Applications with Rational Equations',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/intermediate-algebra-2e/pages/7-5-solve-applications-with-rational-equations',
    question: QUESTION,
  },
  title: 'Exam Question: Change 250 US Dollars into Canadian Dollars (Currency Exchange)',
  thumbnailTitle: 'US Dollars to Canadian Dollars',
  thumbnail: 'm',
  summary:
    'A real test question, solved one small step at a time: Kyra changes $250 US into Canadian dollars at a rate of $1 US = $1.3 Canadian. How many Canadian dollars does she get? Each US dollar buys 1.3 Canadian dollars, so she gets 250 × 1.3 = $325 Canadian. We also set it up as a proportion, check by converting back, and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'US Dollars to Canadian Dollars', subtitle: 'Currency exchange, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about exchanging money. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Intermediate Algebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'Kyra is traveling to Canada and will change \\$250 US dollars into Canadian dollars. At the current exchange rate, \\$1 US is equal to \\$1.3 Canadian. How many Canadian dollars will she get for her trip?',
          answer: '\\$325 Canadian',
          working: '$250 \\times 1.3$',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book\'s exercises.', show: 'q' },
        { say: 'Kyra is travelling to Canada, and will change 250 US dollars into Canadian dollars. The exchange rate is: 1 US dollar equals 1.3 Canadian dollars. How many Canadian dollars will she get?' },
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
          head: ['US dollars', 'Canadian dollars'],
          rows: [
            ['\\$1', '\\$1.30'],
            ['\\$250', '?'],
          ],
        },
        { kind: 'text', id: 't', size: 'md', md: 'Each US dollar buys **more** than one Canadian dollar, so the answer must be **more** than $250$.' },
      ],
      lines: [
        { say: 'Here is what we know. 1 US dollar buys 1 dollar 30 Canadian. We want what 250 US dollars buy.', show: 'tab' },
        { say: 'Each US dollar buys more than one Canadian dollar, so Kyra will get more than 250 Canadian dollars. That is a good way to spot a wrong answer.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\dfrac{\\$1 \\text{ US}}{\\$1.3 \\text{ CAD}} = \\dfrac{\\$250 \\text{ US}}{c \\text{ CAD}}'] },
        { kind: 'callout', id: 'c', tone: 'tip', title: 'Use the rate you are given', md: 'Exchange rates change every day. Always use the rate **stated in the question**.' },
      ],
      lines: [
        { say: 'Here is what we need. An exchange rate is a rate, so we can write a proportion: 1 US dollar is to 1.3 Canadian as 250 US dollars is to c Canadian.', show: 'f' },
        { say: 'Exchange rates change every day, so always use the rate the question gives you.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write the **proportion**', '**Cross-multiply**', 'Check that the answer is **more** than $250$'] }],
      lines: [
        { say: 'Here is the plan. Write the proportion.', show: 'plan.0' },
        { say: 'Cross-multiply to find c.', show: 'plan.1' },
        { say: 'Then check that the answer is more than 250.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The proportion',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{1}{1.3} = \\dfrac{250}{c}'] }],
      lines: [
        { say: 'Step one. US dollars on top and Canadian dollars on the bottom, on both sides: 1 over 1.3 equals 250 over c.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 2: Cross-multiply',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['1 \\times c = 1.3 \\times 250', 'c = \\good{325}'] }],
      lines: [
        { say: 'Step two. Cross-multiply: 1 times c equals 1.3 times 250.', show: 'm.0' },
        { say: '1.3 times 250 is 325. So c is 325. In short, just multiply the US dollars by 1.3.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Is it sensible?',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['325 > 250 \\ \\checkmark', '\\text{Kyra gets } \\good{\\$325 \\text{ Canadian}}'] }],
      lines: [
        { say: 'Step three. 325 is more than 250, as we expected.', show: 'm.0' },
        { say: 'So Kyra gets 325 Canadian dollars for her trip.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{back to US: } 325 \\div 1.3 = 250 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by changing the money back. Going from Canadian to US, we divide by 1.3. 325 divided by 1.3 is 250, the amount Kyra started with. It checks out.', show: 'm.0', focus: 'm.0' },
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
            ['$250 \\div 1.3 \\approx 192.31$', 'that is the **other** direction: Canadian to US'],
            ['$250 + 1.3$', 'the rate is **per dollar**: multiply'],
            ['"It is today\'s rate"', 'rates **change**: use the rate in the question'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Dividing by 1.3 gives about 192, which is less than 250. That is the conversion the other way, from Canadian to US.' },
        { say: 'The rate is for each dollar, so multiply. Do not add.' },
        { say: 'And exchange rates change all the time, so use the rate in the question, not a rate you remember.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'At \\$1 US $=$ \\$1.3 Canadian, how many US dollars do you get for \\$390 Canadian?',
          choices: ['\\$507', '\\$300', '\\$390', '\\$270'],
          answer: 1,
          working: 'Canadian to US: divide. $390 \\div 1.3 = 300$.',
        },
      ],
      lines: [
        { say: 'Your turn. At 1 US dollar equals 1.3 Canadian, how many US dollars do you get for 390 Canadian dollars? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'This time we go from Canadian to US, so divide by 1.3. 390 divided by 1.3 is 300 US dollars. Choice B. Multiplying gives 507, which is the trap.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['An exchange rate is a **rate**: use a proportion', 'Here: US to Canadian, **multiply** by $1.3$', 'Canadian to US, **divide** by $1.3$', 'Ask: should the answer be **more** or **less**?'] }],
      lines: [
        { say: 'Here is what to remember. An exchange rate is a rate, so you can use a proportion.', show: 'sum.0' },
        { say: 'With this rate, US to Canadian means multiply by 1.3.', show: 'sum.1' },
        { say: 'Canadian to US means divide by 1.3.', show: 'sum.2' },
        { say: 'And ask yourself whether the answer should be more or less than you started with. For more on currency exchange, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
