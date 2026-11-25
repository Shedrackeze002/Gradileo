import type { Explainer } from '@/video/script.ts';

// Exam question for Math 30-3 lesson 1.1 (precision and accuracy). The question is a problem from
// OpenStax College Physics 2e, word for word (section 1.3, Accuracy, Precision, and Significant
// Figures, CC BY-NC-SA 4.0), with its section's instruction in front of it. 20 m = 2,000 cm, so the
// tape can be off by 0.50/2,000 = 0.00025 of the length, which is 0.025% (two significant figures,
// like 0.50).

const QUESTION =
  'Express your answers to problems in this section to the correct number of significant figures and proper units. A good-quality measuring tape can be off by 0.50 cm over a distance of 20 m. What is its percent uncertainty?';

const video: Explainer = {
  id: 'xq-m303-1-1',
  lessonId: '',
  exam: {
    lesson: 'm303-1-1',
    source: 'OpenStax, College Physics 2e, Problem for section 1.3, Accuracy, Precision, and Significant Figures',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-physics-2e/pages/1-3-accuracy-precision-and-significant-figures',
    question: QUESTION,
  },
  title: 'Exam Question: The Percent Uncertainty of a Measuring Tape (Precision and Accuracy)',
  thumbnailTitle: 'How Accurate Is the Tape?',
  thumbnail: 'f',
  summary:
    'A real test question, solved one small step at a time: a good measuring tape can be off by 0.50 cm over 20 m. What is its percent uncertainty? We write both lengths in centimetres (20 m = 2,000 cm), divide the error by the length, and multiply by 100%: 0.025%. Then we check by working backward and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Accurate Is the Tape?', subtitle: 'Precision and accuracy, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the accuracy of a measurement. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax College Physics textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'Express your answers to problems in this section to the correct number of significant figures and proper units. A good-quality measuring tape can be off by $0.50$ cm over a distance of $20$ m. What is its percent uncertainty?',
          answer: '$0.025\\%$',
          working: '$\\dfrac{0.50 \\text{ cm}}{2{,}000 \\text{ cm}} \\times 100\\% = 0.025\\%$',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it for this section.', show: 'q' },
        { say: 'Express your answers to problems in this section to the correct number of significant figures and proper units. A good-quality measuring tape can be off by 0.50 centimetres over a distance of 20 metres. What is its percent uncertainty?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'Half a centimetre sounds small, but small **compared to what**? A percent compares the possible error to the **whole** length measured.' }],
      lines: [
        { say: 'Half a centimetre of error sounds small. But small compared to what?', show: 't' },
        { say: 'A percent uncertainty compares the possible error to the whole length being measured.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\%\\,\\text{uncertainty} = \\dfrac{\\text{uncertainty}}{\\text{measurement}} \\times 100\\%'] },
        { kind: 'callout', id: 'u', tone: 'tip', title: 'Same units', md: 'Both lengths must be in the **same unit** before dividing: $1$ m $= 100$ cm.' },
      ],
      lines: [
        { say: 'Here is what we need. The percent uncertainty is the uncertainty divided by the measurement, times 100%.', show: 'f' },
        { say: 'And both lengths must be in the same unit before we divide. One metre is 100 centimetres.', show: 'u' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write both lengths in **centimetres**', '**Divide** the error by the length', 'Multiply by $100\\%$ and **round**'] }],
      lines: [
        { say: 'Here is the plan. First, write both lengths in centimetres.', show: 'plan.0' },
        { say: 'Second, divide the error by the length.', show: 'plan.1' },
        { say: 'Third, multiply by 100%, and round to the right number of significant figures.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Same units',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['20 \\text{ m} = 20 \\times 100 \\text{ cm} = \\good{2{,}000 \\text{ cm}}'] }],
      lines: [
        { say: 'Step one. The error is in centimetres, so change 20 metres to centimetres: 20 times 100 is 2,000 centimetres.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 2: Divide',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{0.50 \\text{ cm}}{2{,}000 \\text{ cm}} = \\good{0.00025}'] }],
      lines: [
        { say: 'Step two. Divide the error by the length: 0.50 over 2,000 is 0.00025. The units cancel, so it is just a number.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 3: As a percent',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['0.00025 \\times 100\\% = \\good{0.025\\%}', '0.50 \\text{ has } 2 \\text{ significant figures}'] }],
      lines: [
        { say: 'Step three. Multiply by 100%: the percent uncertainty is 0.025%.', show: 'm.0' },
        { say: 'The error, 0.50, has two significant figures, and so does 0.025. That is a very accurate tape.', show: 'm.1', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['0.025\\% \\text{ of } 2{,}000 \\text{ cm} = 0.00025 \\times 2{,}000', '= 0.50 \\text{ cm} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by working backward. 0.025% of 2,000 centimetres is 0.00025 times 2,000.', show: 'm.0' },
        { say: 'That is 0.50 centimetres, the error in the question. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$\\dfrac{0.50}{20} = 2.5\\%$', 'centimetres over **metres**: change to the same unit'],
            ['$0.00025\\%$', 'multiply by $100$ to get a **percent**'],
            ['$\\dfrac{20}{0.50}$', 'the error goes on **top**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Dividing 0.50 by 20 mixes centimetres and metres, and gives 2.5%, a hundred times too big.' },
        { say: '0.00025 is a fraction, not a percent. Multiply by 100 to get 0.025%.' },
        { say: 'And the error goes on top, divided by the measurement.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A scale can be off by $0.2$ kg when it weighs a $50$ kg bag. What is its percent uncertainty?',
          choices: ['$4\\%$', '$0.4\\%$', '$0.04\\%$', '$250\\%$'],
          answer: 1,
          working: '$\\dfrac{0.2}{50} = 0.004 = 0.4\\%$',
        },
      ],
      lines: [
        { say: 'Your turn. A scale can be off by 0.2 kilograms when it weighs a 50 kilogram bag. What is its percent uncertainty? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Both are in kilograms already. 0.2 over 50 is 0.004, which is 0.4%: choice B.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Put both amounts in the **same unit**', 'Uncertainty $\\div$ measurement', 'Times $100\\%$ for a **percent**', 'A smaller percent means a more **accurate** tool'] }],
      lines: [
        { say: 'Here is what to remember. Put both amounts in the same unit.', show: 'sum.0' },
        { say: 'Divide the uncertainty by the measurement.', show: 'sum.1' },
        { say: 'Multiply by 100 to get a percent.', show: 'sum.2' },
        { say: 'And a smaller percent means a more accurate tool. For more on precision and accuracy, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
