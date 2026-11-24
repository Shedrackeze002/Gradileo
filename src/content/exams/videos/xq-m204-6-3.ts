import type { Explainer } from '@/video/script.ts';

// Exam question for Math 20-4 lesson 6.3 (temperature). The question is an Exercise from OpenStax
// Prealgebra 2e, word for word with its set's instruction (section 7.5, Systems of Measurement, CC
// BY-NC-SA 4.0). C = 5/9 (F − 32) = 5/9 (4 − 32) = 5/9 (−28) = −140/9 = −15.555... ≈ −15.6 °C, as in the
// book's answer. Check the other way: F = 9/5 C + 32 = 9/5 (−15.6) + 32 = −28.08 + 32 = 3.92 ≈ 4 °F.

const QUESTION = 'Convert the Fahrenheit temperature to degrees Celsius. Round to the nearest tenth. 4 °F';

const video: Explainer = {
  id: 'xq-m204-6-3',
  lessonId: '',
  exam: {
    lesson: 'm204-6-3',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 7.5, Systems of Measurement',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/7-5-systems-of-measurement',
    question: QUESTION,
  },
  title: 'Exam Question: A Cold Day in Fahrenheit (Temperature)',
  thumbnailTitle: 'What Is 4 °F in Celsius?',
  summary:
    'A real test question, solved one small step at a time: convert 4 °F to degrees Celsius, to the nearest tenth. With C = 5/9 (F − 32), we subtract first: 4 − 32 = −28. Then 5/9 × (−28) = −140/9 = −15.555…, which rounds to −15.6 °C. Then we check by changing back to Fahrenheit, and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'What Is 4 °F in Celsius?', subtitle: 'Temperature, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about temperature. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Convert the Fahrenheit temperature to degrees Celsius. Round to the nearest tenth. $4^\\circ\\text{F}$',
          answer: '$-15.6^\\circ\\text{C}$',
          working: '5/9 × (4 − 32) = 5/9 × (−28) = −15.555… ≈ −15.6',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Convert 4 degrees Fahrenheit to degrees Celsius. Round to the nearest tenth.', caption: 'Convert 4 °F to degrees Celsius. Round to the nearest tenth.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Two temperature scales', md: 'Canada uses degrees **Celsius**, and the United States uses degrees **Fahrenheit**. Water freezes at $0^\\circ\\text{C}$, which is $32^\\circ\\text{F}$.' }],
      lines: [
        { say: 'Canada uses degrees Celsius, and the United States uses degrees Fahrenheit.', show: 'c' },
        { say: 'Water freezes at 0 degrees Celsius, which is 32 degrees Fahrenheit. So 4 degrees Fahrenheit is well below freezing, and the answer must be a negative number of degrees Celsius.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['C = \\dfrac{5}{9}(F - 32)'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Brackets first', md: 'Work **inside the brackets** first: subtract $32$, **then** multiply by $\\tfrac{5}{9}$.' },
      ],
      lines: [
        { say: 'Here is what we need. To change Fahrenheit to Celsius, subtract 32, then multiply by 5 ninths.', show: 'm' },
        { say: 'The order matters. Work inside the brackets first, then multiply.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Substitute** $F = 4$', '**Subtract** $32$ inside the brackets', '**Multiply** by $\\tfrac{5}{9}$ and **round**'] }],
      lines: [
        { say: 'Here is the plan. Substitute 4 for F.', show: 'plan.0' },
        { say: 'Subtract 32 inside the brackets.', show: 'plan.1' },
        { say: 'Then multiply by 5 ninths, and round to the nearest tenth.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Convert',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['C = \\dfrac{5}{9}(4 - 32)', 'C = \\dfrac{5}{9}(-28) = -\\dfrac{140}{9}', 'C = -15.\\underline{5}55\\ldots \\approx \\good{-15.6^\\circ\\text{C}}'] }],
      lines: [
        { say: 'Step one. Put 4 in place of F.', show: 'm.0' },
        { say: 'Step two. Inside the brackets, 4 minus 32 is negative 28. Then 5 ninths of negative 28 is negative 140 ninths.', show: 'm.1' },
        { say: 'Step three. 140 divided by 9 is 15.555, and so on. The hundredths digit is 5, so we round up. 4 degrees Fahrenheit is about negative 15.6 degrees Celsius.', caption: 'Step three. 140 ÷ 9 = 15.555… The hundredths digit is 5, so we round up. 4 °F is about −15.6 °C.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['F = \\dfrac{9}{5}C + 32', '\\dfrac{9}{5}(-15.6) + 32 = -28.08 + 32 = 3.92 \\approx 4 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by changing back. To go from Celsius to Fahrenheit, multiply by 9 fifths, then add 32.', show: 'm.0' },
        { say: '9 fifths of negative 15.6 is negative 28.08. Add 32: 3.92, which is about 4 degrees Fahrenheit. It is not exactly 4 because we rounded, but it checks out.', caption: '9/5 × (−15.6) = −28.08. Add 32: 3.92, which is about 4 °F. It is not exactly 4 because we rounded, but it checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$-29.8^\\circ\\text{C}$', 'multiplied **first**: subtract $32$ inside the brackets first'],
            ['$-50.4^\\circ\\text{C}$', 'used $\\tfrac{9}{5}$: that is for Celsius to Fahrenheit'],
            ['$-15.5^\\circ\\text{C}$', 'cut off: $-15.555\\ldots$ **rounds** to $-15.6$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Negative 29.8 multiplies 4 by 5 ninths first, then subtracts 32. Work inside the brackets first.' },
        { say: 'Negative 50.4 multiplies by 9 fifths. That fraction is for going the other way, from Celsius to Fahrenheit.' },
        { say: 'And negative 15.5 cuts off the digits instead of rounding. The next digit is 5, so it rounds to negative 15.6.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'On a hot day in Arizona it is $95^\\circ\\text{F}$. Use $C = \\tfrac{5}{9}(F - 32)$. What is the temperature in degrees Celsius?',
          choices: ['$63^\\circ\\text{C}$', '$35^\\circ\\text{C}$', '$20.8^\\circ\\text{C}$', '$171^\\circ\\text{C}$'],
          answer: 1,
          working: '95 − 32 = 63, and 5/9 × 63 = 35.',
        },
      ],
      lines: [
        { say: 'Your turn. On a hot day in Arizona it is 95 degrees Fahrenheit. Use C equals 5 ninths of F minus 32. What is the temperature in degrees Celsius? Pause the video and try it.', caption: 'Your turn. On a hot day in Arizona it is 95 °F. Use C = 5/9 (F − 32). What is the temperature in degrees Celsius? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '95 minus 32 is 63, and 5 ninths of 63 is 35 degrees Celsius. Choice "B".', caption: '95 − 32 = 63, and 5/9 × 63 = 35 °C. Choice "B".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$C = \\tfrac{5}{9}(F - 32)$', '**Brackets** first, then multiply', 'Below $32^\\circ\\text{F}$ is **below** $0^\\circ\\text{C}$', '**Check** by changing back'] }],
      lines: [
        { say: 'Here is what to remember. Celsius is 5 ninths of the Fahrenheit temperature minus 32.', show: 'sum.0' },
        { say: 'Subtract inside the brackets first, then multiply.', show: 'sum.1' },
        { say: 'Anything below 32 degrees Fahrenheit is below 0 degrees Celsius.', show: 'sum.2' },
        { say: 'And check by changing back. For more on temperature, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
