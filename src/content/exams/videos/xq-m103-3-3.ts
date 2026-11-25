import type { DiagramItem, Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';

// Exam question for Math 10-3 lesson 3.3 (converting between SI and imperial). The question is an
// exercise from OpenStax Prealgebra 2e, word for word (section 7.5, Systems of Measurement,
// CC BY-NC-SA 4.0), with its set's instruction in front of it. The book's table gives
// 1 yd = 0.914 m, so 9 yd = 9 × 0.914 = 8.226 m, which rounds to 8.2 m, as in the book's answer.
// Check: 8.2 ÷ 0.914 ≈ 9.0 yards.

/** A metre and a yard side by side, to scale. */
function bars(): Part {
  const points: Record<string, [number, number]> = { M0: [0, 0.7], M1: [10, 0.7], Y0: [0, 0], Y1: [9.14, 0] };
  const items: DiagramItem[] = [
    { kind: 'line', id: 'm', from: 'M0', to: 'M1', tone: 'adj', weight: 8, label: '1 \\text{ m}', labelSide: 'left' },
    { kind: 'line', id: 'yd', from: 'Y0', to: 'Y1', tone: 'opp', weight: 8, label: '1 \\text{ yd}', labelSide: 'right' },
  ];
  return { points, items };
}

const QUESTION =
  'In the following exercises, make the unit conversions. Round to the nearest tenth. Connie bought 9 yards of fabric to make drapes. Convert the fabric length to meters.';

const video: Explainer = {
  id: 'xq-m103-3-3',
  lessonId: '',
  exam: {
    lesson: 'm103-3-3',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 7.5, Systems of Measurement',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/7-5-systems-of-measurement',
    question: QUESTION,
  },
  title: 'Exam Question: 9 Yards of Fabric in Metres (Converting Between SI and Imperial)',
  thumbnailTitle: 'Yards to Metres',
  thumbnail: 'bars',
  summary:
    'A real test question, solved one small step at a time: Connie bought 9 yards of fabric to make drapes. Convert the length to metres, to the nearest tenth. Using 1 yd ≈ 0.914 m, we multiply: 9 × 0.914 = 8.226 m, which rounds to 8.2 m. Then we check the size of the answer, since a metre is a little longer than a yard, and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Yards to Metres', subtitle: 'Converting between SI and imperial, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about converting between imperial and SI units. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'In the following exercises, make the unit conversions. Round to the nearest tenth. Connie bought $9$ yards of fabric to make drapes. Convert the fabric length to meters.',
          answer: '$8.2$ meters',
          working: '$9 \\times 0.914 = 8.226 \\approx 8.2$',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book\'s exercises.', show: 'q' },
        { say: 'Make the unit conversion, and round to the nearest tenth. Connie bought 9 yards of fabric to make drapes. Convert the length of the fabric to metres.' },
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
          head: ['We know', 'We want'],
          rows: [
            ['$9$ yards of fabric', 'the same length in **metres**'],
            ['yards are **imperial**', 'metres are **SI**'],
          ],
        },
        { kind: 'text', id: 't', size: 'md', md: 'Round the answer to the **nearest tenth**.' },
      ],
      lines: [
        { say: 'Here is what we know: 9 yards. Yards are an imperial unit.', show: 'tab' },
        { say: 'We want the same length in metres, which is an SI unit, rounded to the nearest tenth.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        figure('bars', [bars()], 190),
        { kind: 'math', id: 'f', size: 'lg', lines: ['1 \\text{ yd} \\approx 0.914 \\text{ m}'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'A metre is a bit longer', md: 'A metre is a little **longer** than a yard, so $9$ yards is a little **less** than $9$ metres.' },
      ],
      lines: [
        { say: 'Here is a metre in blue and a yard in orange, drawn to scale.', show: ['bars.m', 'bars.yd'] },
        { say: 'One yard is about 0.914 metres.', show: 'f' },
        { say: 'A metre is a little longer than a yard. So 9 yards should come out a little less than 9 metres.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write the **conversion factor**', '**Multiply** so the yards cancel', '**Round** to the nearest tenth'] }],
      lines: [
        { say: 'Here is the plan. Write the conversion factor.', show: 'plan.0' },
        { say: 'Multiply so that the yards cancel.', show: 'plan.1' },
        { say: 'Then round to the nearest tenth.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The conversion factor',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{0.914 \\text{ m}}{1 \\text{ yd}}'] }],
      lines: [
        { say: 'Step one. We have yards and want metres, so we put metres on top and yards on the bottom: 0.914 metres over 1 yard.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 2: Multiply',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['9 \\text{ yd} \\times \\dfrac{0.914 \\text{ m}}{1 \\text{ yd}} = 9 \\times 0.914 \\text{ m}', '= 8.226 \\text{ m}'] }],
      lines: [
        { say: 'Step two. Multiply 9 yards by 0.914 metres over 1 yard. The yards cancel.', show: 'm.0' },
        { say: '9 times 0.914 is 8.226 metres.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Round',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['8.2\\underline{2}6 \\to \\good{8.2 \\text{ m}}'] }],
      lines: [
        { say: 'Step three. Round to the nearest tenth. The digit after the tenths place is 2, which is less than 5, so we round down. Connie bought about 8.2 metres of fabric.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['8.2 \\div 0.914 \\approx 9.0 \\text{ yd} \\ \\checkmark', '8.2 \\text{ m} < 9 \\text{ m}: \\text{ a bit less, as expected} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by going back. 8.2 divided by 0.914 is about 9.0 yards, the length Connie bought.', show: 'm.0' },
        { say: 'And 8.2 is a little less than 9, just as we expected, because a metre is a little longer than a yard. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$9 \\div 0.914 = 9.8$ m', 'more metres than yards: the factor is **upside down**'],
            ['$9 \\times 3 = 27$', 'that is **feet**, not metres'],
            ['$8.226$ m', 'the question says **round** to the nearest tenth'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Dividing by 0.914 gives 9.8 metres. That is more than 9, which cannot be right, because a metre is longer than a yard.' },
        { say: '9 times 3 is 27, but that is the length in feet, not metres.' },
        { say: 'And the question asks you to round, so give 8.2 metres, not 8.226.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A race is $10$ kilometres long. Using $1$ mi $\\approx 1.61$ km, how many miles is the race? Round to the nearest tenth.',
          choices: ['$16.1$ mi', '$6.2$ mi', '$0.6$ mi', '$62.1$ mi'],
          answer: 1,
          working: '$10 \\text{ km} \\times \\dfrac{1 \\text{ mi}}{1.61 \\text{ km}} = 6.21 \\approx 6.2$ mi.',
        },
      ],
      lines: [
        { say: 'Your turn. A race is 10 kilometres long. Using 1 mile is about 1.61 kilometres, how many miles is the race? Round to the nearest tenth. Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Multiply by 1 mile over 1.61 kilometres, so the kilometres cancel. 10 divided by 1.61 is about 6.2 miles. Choice B. A mile is longer than a kilometre, so the number gets smaller.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$1$ yd $\\approx 0.914$ m', 'Put the unit you **want** on top of the factor', 'The units you have should **cancel**', 'Round as the question asks, then check the size'] }],
      lines: [
        { say: 'Here is what to remember. One yard is about 0.914 metres.', show: 'sum.0' },
        { say: 'Put the unit you want on top of the conversion factor.', show: 'sum.1' },
        { say: 'The units you have should cancel.', show: 'sum.2' },
        { say: 'And round as the question asks, then check the size of your answer. For more on converting between SI and imperial units, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
