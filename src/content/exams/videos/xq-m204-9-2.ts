import type { Explainer } from '@/video/script.ts';

// Exam question for Math 20-4 lesson 9.2 (analyzing data). The question is an Exercise from OpenStax
// Prealgebra 2e, word for word (section 5.5, Averages and Probability, CC BY-NC-SA 4.0). The 8 pays are
// 236.25 four times, 315 three times and 393.75 once. Mean: 2,283.75 ÷ 8 = 285.468... ≈ $285.47.
// Median: the 4th and 5th of the sorted list are 236.25 and 315, so (236.25 + 315) ÷ 2 = 275.625 ≈
// $275.63. Mode: $236.25 (4 times). All as in the book's answers. Check: 4 × 236.25 + 3 × 315 + 393.75
// = 945 + 945 + 393.75 = 2,283.75.

const QUESTION =
  'Joaquin gets paid every Friday. His paychecks for the past 8 Fridays were $315, $236.25, $236.25, $236.25, $315, $315, $236.25, $393.75. Find the (a) mean, (b) median, and (c) mode.';

const SORTED = ['236.25', '236.25', '236.25', '236.25', '315', '315', '315', '393.75'];

const video: Explainer = {
  id: 'xq-m204-9-2',
  lessonId: '',
  exam: {
    lesson: 'm204-9-2',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 5.5, Averages and Probability',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/5-5-averages-and-probability',
    question: QUESTION,
  },
  title: 'Exam Question: Mean, Median and Mode of Paycheques (Analyzing Data)',
  thumbnailTitle: 'Mean, Median and Mode of Pay',
  summary:
    'A real test question, solved one small step at a time: Joaquin’s last 8 Friday paycheques were $315, $236.25, $236.25, $236.25, $315, $315, $236.25 and $393.75. (a) The mean is $2,283.75 ÷ 8 ≈ $285.47. (b) In order, the two middle pays are $236.25 and $315, so the median is $275.63. (c) The mode, the most common pay, is $236.25. Then we check the total and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Mean, Median and Mode of Pay', subtitle: 'Analyzing data, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the mean, median and mode. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt:
            'Joaquin gets paid every Friday. His paychecks for the past $8$ Fridays were \\$315, \\$236.25, \\$236.25, \\$236.25, \\$315, \\$315, \\$236.25, \\$393.75. Find the (a) mean, (b) median, and (c) mode.',
          answer: '(a) \\$285.47 (b) \\$275.63 (c) \\$236.25',
          working: '2,283.75 ÷ 8 ≈ 285.47; (236.25 + 315) ÷ 2 ≈ 275.63; 236.25 appears 4 times',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Joaquin gets paid every Friday. His paycheques for the past 8 Fridays were 315 dollars, 236 dollars 25 three times, 315 twice more, 236.25 again, and 393 dollars 75.', caption: 'Joaquin gets paid every Friday. His paycheques for the past 8 Fridays were $315, $236.25, $236.25, $236.25, $315, $315, $236.25 and $393.75.' },
        { say: 'Find the mean, the median and the mode.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Three averages', md: 'Each one describes a **typical** paycheque in a different way: the **mean** shares the total out evenly, the **median** is the **middle** value, and the **mode** is the **most common** value.' }],
      lines: [
        { say: 'The mean, median and mode are three kinds of average. Each one describes a typical paycheque in a different way.', show: 'c' },
        { say: 'The mean shares the total out evenly. The median is the middle value. And the mode is the most common value.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{mean} = \\dfrac{\\text{sum of the values}}{\\text{number of values}}'] },
        { kind: 'bullets', id: 'k', items: ['**Median**: put the values **in order** and take the middle. With an **even** number of values, average the **two** middle ones.', '**Mode**: the value that appears **most often**.'] },
      ],
      lines: [
        { say: 'Here is what we need. The mean is the sum of the values, divided by how many values there are.', show: 'm' },
        { say: 'For the median, put the values in order and take the middle one. With an even number of values, there are two in the middle, so take the mean of those two.', show: 'k.0' },
        { say: 'And the mode is the value that appears most often.', show: 'k.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Put the pays **in order**', '(a) **Add** and **divide** by $8$', '(b) Average the **two middle** pays', '(c) Find the **most common** pay'] }],
      lines: [
        { say: 'Here is the plan. First, put the pays in order. It helps with all three parts.', show: 'plan.0' },
        { say: 'For part a, add them up and divide by 8.', show: 'plan.1' },
        { say: 'For part b, average the two middle pays.', show: 'plan.2' },
        { say: 'For part c, find the most common pay.', show: 'plan.3' },
      ],
    },
    {
      chapter: 'Step 1: In order',
      layout: 'center',
      main: [{ kind: 'table', id: 't', head: ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'], rows: [SORTED.map((v) => `\\$${v}`)] }],
      lines: [
        { say: 'Step one. In order from smallest to largest: four pays of 236 dollars 25, then three of 315, then 393 dollars 75.', caption: 'Step one. In order from smallest to largest: four pays of $236.25, then three of $315, then $393.75.', show: 't' },
        { say: 'That is 8 pays, so none is missing.' },
      ],
    },
    {
      chapter: 'Part (a): The mean',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['4 \\times 236.25 + 3 \\times 315 + 393.75', '= 945 + 945 + 393.75 = 2{,}283.75', '2{,}283.75 \\div 8 = 285.468\\ldots \\approx \\good{\\$285.47}'] }],
      lines: [
        { say: 'Part a. Add the pays. With repeats, multiplying is quicker: 4 times 236.25, plus 3 times 315, plus 393.75.', show: 'm.0' },
        { say: 'That is 945 plus 945 plus 393.75, which is 2 thousand 283 dollars 75.', caption: 'That is 945 + 945 + 393.75 = $2,283.75.', show: 'm.1' },
        { say: 'Divide by the 8 pays: 285.468, which rounds to 285 dollars 47. That is the mean.', caption: 'Divide by the 8 pays: 285.468…, which rounds to $285.47. That is the mean.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Part (b): The median',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'], rows: [SORTED.map((v, i) => (i === 3 || i === 4 ? `**\\$${v}**` : `\\$${v}`))] },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{236.25 + 315}{2} = \\dfrac{551.25}{2} = 275.625 \\approx \\good{\\$275.63}'] },
      ],
      lines: [
        { say: 'Part b. There are 8 pays, an even number, so there are two middle values: the 4th and the 5th. They are 236.25 and 315.', show: 't' },
        { say: 'Their mean is 551.25 divided by 2, which is 275.625. Rounded to the cent, the median is 275 dollars 63.', caption: 'Their mean is 551.25 ÷ 2 = 275.625. Rounded to the cent, the median is $275.63.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Part (c): The mode',
      layout: 'center',
      main: [{ kind: 'table', id: 'f', head: ['Pay', 'How many times'], rows: [['\\$236.25', '$4$'], ['\\$315', '$3$'], ['\\$393.75', '$1$']] }],
      lines: [
        { say: 'Part c. Count how often each pay appears. 236.25 appears 4 times, 315 appears 3 times, and 393.75 once.', show: 'f' },
        { say: '236.25 appears most often, so the mode is 236 dollars 25.', caption: '$236.25 appears most often, so the mode is $236.25.', focus: 'f.0' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['285.47 \\times 8 = 2{,}283.76 \\approx 2{,}283.75 \\ \\checkmark', '236.25 \\le \\text{all three} \\le 393.75 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. The mean times 8 should give back the total. 285.47 times 8 is 2 thousand 283.76, just a cent off because we rounded.', caption: 'Let us check. The mean times 8 should give back the total. 285.47 × 8 = 2,283.76, just a cent off because we rounded.', show: 'm.0' },
        { say: 'And all three averages lie between the smallest pay and the largest pay, as they must. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['(a) \\$315', 'averaged only the $3$ **different** pays: use all $8$'],
            ['(b) \\$236.25', 'took one middle pay: with $8$, average the **two** middle ones'],
            ['(c) \\$315', 'it appears $3$ times, but \\$236.25 appears $4$ times'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'A mean of 315 averages only the three different pays. Every one of the 8 paycheques counts.' },
        { say: 'A median of 236.25 takes just one middle value. With 8 values, average the 4th and the 5th.' },
        { say: 'And 315 is not the mode: it appears 3 times, but 236.25 appears 4 times.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A server’s tips for $5$ shifts were \\$42, \\$55, \\$38, \\$55 and \\$60. What is the **median**?',
          choices: ['\\$55', '\\$50', '\\$38', '\\$22'],
          answer: 0,
          working: 'In order: 38, 42, 55, 55, 60. The middle (3rd) value is 55.',
        },
      ],
      lines: [
        { say: 'Your turn. A server’s tips for 5 shifts were 42, 55, 38, 55 and 60 dollars. What is the median? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'In order: 38, 42, 55, 55, 60. With 5 values, the middle one is the 3rd, which is 55 dollars. Choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Mean $=$ sum $\\div$ number of values', 'Median: **in order**, then the middle', 'Even count: average the **two** middle values', 'Mode: the **most common** value'] }],
      lines: [
        { say: 'Here is what to remember. The mean is the sum divided by the number of values.', show: 'sum.0' },
        { say: 'For the median, put the values in order and take the middle.', show: 'sum.1' },
        { say: 'With an even number of values, average the two middle ones.', show: 'sum.2' },
        { say: 'And the mode is the most common value. For more on analyzing data, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
