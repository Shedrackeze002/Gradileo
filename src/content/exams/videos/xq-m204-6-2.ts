import type { Explainer } from '@/video/script.ts';

// Exam question for Math 20-4 lesson 6.2 (converting between systems). The question is an Exercise
// from OpenStax Prealgebra 2e, word for word with its set's instruction (section 7.5, Systems of
// Measurement, CC BY-NC-SA 4.0). With the book's table, 1 m ≈ 3.28 ft, so 1.6 × 3.28 = 5.248 ≈ 5.2
// feet, as in the book's answer. Check through inches: 160 cm ÷ 2.54 ≈ 63.0 in, and 63.0 ÷ 12 ≈ 5.25,
// which is 5.2 to the nearest tenth (63.0 ÷ 12 = 5.249...).

const QUESTION = 'Make the unit conversion. Round to the nearest tenth. Kathryn is 1.6 meters tall. Convert her height to feet.';

const video: Explainer = {
  id: 'xq-m204-6-2',
  lessonId: '',
  exam: {
    lesson: 'm204-6-2',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 7.5, Systems of Measurement',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/7-5-systems-of-measurement',
    question: QUESTION,
  },
  title: 'Exam Question: A Height in Metres to Feet (Converting Between Systems)',
  thumbnailTitle: 'How Tall Is Kathryn in Feet?',
  summary:
    'A real test question, solved one small step at a time: Kathryn is 1.6 metres tall. What is her height in feet, to the nearest tenth? The book’s table gives 1 m ≈ 3.28 ft, so we multiply: 1.6 × 3.28 = 5.248, which rounds to 5.2 feet. Then we check by going through centimetres and inches, and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Tall Is Kathryn in Feet?', subtitle: 'Metric to imperial, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about changing metric units to imperial units. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Make the unit conversion. Round to the nearest tenth. Kathryn is $1.6$ meters tall. Convert her height to feet.',
          answer: '$5.2$ feet',
          working: '1.6 × 3.28 = 5.248 ≈ 5.2',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Kathryn is 1.6 metres tall. Convert her height to feet, and round to the nearest tenth.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Two systems', md: 'Metres are **SI** (metric) units, and feet are **imperial** units. In Canada we use both, so we often change one to the other.' }],
      lines: [
        { say: 'Metres are S I, or metric, units. Feet are imperial units.', show: 'c' },
        { say: 'In Canada we use both. A height is often given in feet and inches, so we change metres to feet.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['The book’s table', ''], rows: [['$1$ in', '$= 2.54$ cm'], ['$1$ ft', '$\\approx 0.305$ m'], ['$1$ m', '$\\approx 3.28$ ft']] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Which way?', md: 'A metre is **longer** than a foot, so there are **more** feet than metres: **multiply** by $3.28$.' },
      ],
      lines: [
        { say: 'Here is what we need. The book gives a table of conversions. The one we want says 1 metre is about 3.28 feet.', show: 't', focus: 't.2' },
        { say: 'A metre is longer than a foot, so a height will be a bigger number of feet than of metres. So we multiply by 3.28.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Multiply** the metres by $3.28$', 'Round to the nearest **tenth**'] }],
      lines: [
        { say: 'Here is the plan. Multiply the metres by 3.28.', show: 'plan.0' },
        { say: 'Then round to the nearest tenth.', show: 'plan.1' },
      ],
    },
    {
      chapter: 'Steps 1 and 2: Convert',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['1.6 \\text{ m} \\times 3.28 = 5.248 \\text{ ft}', '5.2\\underline{4}8 \\approx \\good{5.2 \\text{ ft}}'] }],
      lines: [
        { say: 'Step one. 1.6 times 3.28 is 5.248 feet.', show: 'm.0' },
        { say: 'Step two. To round to the nearest tenth, look at the next digit, the hundredths. It is a 4, which is less than 5, so we round down. Kathryn is about 5.2 feet tall.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['1.6 \\text{ m} = 160 \\text{ cm}', '160 \\div 2.54 \\approx 63.0 \\text{ in}', '63.0 \\div 12 \\approx 5.2 \\text{ ft} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check another way, with the exact inch. 1.6 metres is 160 centimetres.', show: 'm.0' },
        { say: '1 inch is 2.54 centimetres, so 160 divided by 2.54 is about 63 inches.', show: 'm.1' },
        { say: '12 inches make a foot, and 63 divided by 12 is about 5.2 feet. It checks out.', show: 'm.2', focus: 'm.2' },
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
            ['$0.5$ ft', '**divided** by $3.28$: there are **more** feet than metres'],
            ['$5.248$ ft', 'not rounded to the nearest **tenth**'],
            ['$5.3$ ft', 'rounded twice: look only at the **hundredths** digit, $4$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '0.5 feet divides by 3.28. No adult is half a foot tall. A foot is shorter than a metre, so there are more feet.' },
        { say: '5.248 is not rounded. The question asks for the nearest tenth.' },
        { say: 'And 5.3 rounds twice: first to 5.25, then up to 5.3. Round once, looking only at the hundredths digit, which is 4.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A hockey stick is $60$ inches long. Use $1$ in $= 2.54$ cm. How long is the stick in centimetres?',
          choices: ['$152.4$ cm', '$23.6$ cm', '$62.5$ cm', '$15.2$ cm'],
          answer: 0,
          working: '60 × 2.54 = 152.4.',
        },
      ],
      lines: [
        { say: 'Your turn. A hockey stick is 60 inches long. Use 1 inch equals 2.54 centimetres. How long is the stick in centimetres? Pause the video and try it.', caption: 'Your turn. A hockey stick is 60 inches long. Use 1 in = 2.54 cm. How long is the stick in centimetres? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'A centimetre is shorter than an inch, so there are more centimetres. 60 times 2.54 is 152.4 centimetres. Choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$1$ m $\\approx 3.28$ ft, $1$ in $= 2.54$ cm', 'To a **shorter** unit: **multiply**', 'To a **longer** unit: **divide**', 'Round once, at the **end**'] }],
      lines: [
        { say: 'Here is what to remember. 1 metre is about 3.28 feet, and 1 inch is exactly 2.54 centimetres.', show: 'sum.0' },
        { say: 'To change to a shorter unit, multiply, because there will be more of them.', show: 'sum.1' },
        { say: 'To change to a longer unit, divide.', show: 'sum.2' },
        { say: 'And round only once, at the end. For more on converting between systems, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
