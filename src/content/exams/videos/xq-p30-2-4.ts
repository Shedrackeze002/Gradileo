import type { ChargesEl, Explainer } from '@/video/script.ts';

// Exam question for Grade 12 lesson 2.4 (potential difference and the field between parallel
// plates): what is the electric field between two parallel conducting plates 1.00 cm apart with
// 1.50 × 10⁴ V between them? The question is OpenStax College Physics 2e's own, word for word (a
// Problem for section 19.2, CC BY-NC-SA 4.0; Gradileo is non-commercial). E = V ÷ d =
// 1.50 × 10⁴ ÷ 0.0100 = 1.50 × 10⁶ V/m.
//
// The picture (src/video/charges.ts) is the two plates to scale, with a point P carried about the
// gap: the field written there is worked out from the plates and is the same everywhere.

const CM = { metres: 0.01, symbol: 'cm' };

const plates: ChargesEl = {
  kind: 'charges',
  id: 'sim',
  view: [-0.004, 0.014, -0.0035, 0.0028],
  height: 400,
  unit: 'e',
  length: CM,
  figures: 3,
  notation: 'sci',
  fieldFigures: 3,
  plates: { at: [0, 0.01], span: [-0.002, 0.002], volts: 15000, lines: 5, levels: 4 },
  bodies: [{ id: 'p', charge: 0, x: 0.0025, test: true, label: 'P', labelAt: 'left' }],
  poster: 'tour',
  thumb: ['lines', 'field', 'potential'],
  clips: {
    tour: {
      reset: true,
      phases: [
        { dur: 1.4, to: { p: [0.0055, 0.001] } },
        { dur: 1.6, to: { p: [0.0025, -0.0009] } },
        { dur: 1.4, to: { p: [0.0045, 0] } },
      ],
    },
  },
};

const QUESTION =
  'What is the strength of the electric field between two parallel conducting plates separated by 1.00 cm and having a potential difference (voltage) between them of 1.50 × 10⁴ V?';

const video: Explainer = {
  id: 'xq-p30-2-4',
  lessonId: '',
  exam: {
    lesson: 'p30-2-4',
    source: 'OpenStax, College Physics 2e, Problem for section 19.2, Electric Potential in a Uniform Electric Field',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-physics-2e/pages/19-2-electric-potential-in-a-uniform-electric-field',
    question: QUESTION,
  },
  title: 'Exam Question: The Field Between Two Charged Plates. E = V/d',
  thumbnailTitle: 'The Field Between Plates',
  thumbnail: 'sim',
  summary:
    'A real test question, solved one small step at a time: two parallel plates 1.00 cm apart have 1.50 × 10⁴ V between them, and we find the strength of the electric field in the gap. We change the gap to metres and divide the voltage by it, E = V/d. Then we check that the field is the same everywhere between the plates and look at the traps that catch people.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'The Field Between Plates', subtitle: 'Potential difference, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the electric field between two charged metal plates. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: QUESTION,
          answer: '$1.50 \\times 10^{6}$ V/m',
          working: '$E = \\dfrac{V}{d} = \\dfrac{1.50 \\times 10^{4}\\ \\text{V}}{0.0100\\ \\text{m}} = 1.50 \\times 10^{6}$ V/m.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'What is the strength of the electric field between two parallel conducting plates separated by 1.00 centimetres and having a potential difference, or voltage, between them of 1.50 times ten to the four volts? If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [plates, { kind: 'text', id: 'plain', size: 'md', md: 'How strong is the field in the **gap**?' }],
      lines: [
        { say: 'Let us picture it, at full size. Two metal plates, one centimetre apart. The left one is fifteen thousand volts above the right one, so the field lines run straight across from left to right.', show: ['sim', 'sim.lines', 'sim.gap'] },
        { say: 'The question asks how strong the electric field is in the gap.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'def',
          tone: 'definition',
          title: 'The field between parallel plates',
          md: 'Between two parallel plates the field is **uniform**: the same strength everywhere in the gap. Its strength is the **potential difference** divided by the **separation**: $E = \\dfrac{V}{d}$, with $d$ in metres. One **volt per metre** is the same as one newton per coulomb.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: '$600$ V across $3.0$ cm: $E = \\dfrac{600}{0.030} = 2.0 \\times 10^{4}$ V/m.' },
      ],
      lines: [
        { say: 'Here is what we need. Between two parallel plates, the electric field is uniform: it has the same strength everywhere in the gap.', show: 'def' },
        { say: 'Its strength is the potential difference divided by the distance between the plates, in metres. The unit is volts per metre, which is the same as newtons per coulomb.' },
        { say: 'For example, six hundred volts across three centimetres gives six hundred divided by 0.030: two times ten to the four volts per metre.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Change the gap to **metres**', 'Divide: $E = \\dfrac{V}{d}$', 'Check: the potential falls **evenly** across the gap'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, change the gap to metres.', show: 'plan.0' },
        { say: 'Second, divide the voltage by the gap.', show: 'plan.1' },
        { say: 'Third, check it with the way the potential falls across the gap.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The gap in metres',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['d = 1.00\\ \\text{cm} = \\dfrac{1.00}{100}\\ \\text{m} = \\adj{0.0100\\ \\text{m}}'] }],
      lines: [
        { say: 'Step one. There are a hundred centimetres in a metre, so 1.00 centimetres is 0.0100 metres.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 2: Divide',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['E = \\dfrac{V}{d} = \\dfrac{1.50 \\times 10^{4}\\ \\text{V}}{1.00 \\times 10^{-2}\\ \\text{m}}', '= 1.50 \\times 10^{4 - (-2)} = \\good{1.50 \\times 10^{6}\\ \\text{V/m}}'] }],
      lines: [
        { say: 'Step two. Divide the voltage, 1.50 times ten to the four volts, by the gap, one times ten to the minus two metres.', show: 'm.0' },
        { say: 'For the powers of ten, four minus minus two is six. The field is 1.50 times ten to the six volts per metre: one and a half million.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [plates, { kind: 'text', id: 't', size: 'md', md: 'Every $0.25$ cm the potential falls $3750$ V: $\\dfrac{3750}{0.0025} = 1.50 \\times 10^{6}$ V/m.' }],
      lines: [
        { say: 'Let us check it. Here are the plates again, with dashed lines of equal potential. Each step of a quarter of a centimetre drops the potential by a quarter of the voltage: 3,750 volts.', show: ['sim', 'sim.lines', 'sim.potential', 't'] },
        { say: 'Now carry a point P around the gap. The field is the same everywhere: 1.50 times ten to the six newtons per coulomb, which is volts per metre.', show: 'sim.field', play: 'sim.tour', playDelay: 0.3 },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Mistake', 'What you get'],
          rows: [
            ['$d$ left in **centimetres**', '$1.50 \\times 10^{4}$ V/m, a hundred times too small'],
            ['**Multiplied** $V \\times d$', '$150$ V·m, the wrong unit altogether'],
            ['Powers of ten **added**', '$1.50 \\times 10^{2}$ V/m'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps in this question.', show: 'traps' },
        { say: 'Forgetting to change centimetres into metres gives a field a hundred times too small.' },
        { say: 'Multiplying the voltage by the gap gives volt metres, which is not a field at all. The unit tells you to divide: volts per metre.' },
        { say: 'And when you divide powers of ten, subtract the exponents. Adding them gives four plus minus two: ten to the two, which is far too small.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Two parallel plates 2.0 mm apart have a potential difference of 12 V between them. What is the electric field between them?',
          choices: ['24 V/m', '6.0 V/m', '0.024 V/m', '6000 V/m'],
          answer: 3,
          working: '$d = 2.0$ mm $= 0.0020$ m, so $E = \\dfrac{12}{0.0020} = 6000$ V/m.',
        },
      ],
      lines: [
        { say: 'Your turn. Two parallel plates 2.0 millimetres apart have a potential difference of twelve volts between them. What is the electric field between them? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Two millimetres is 0.0020 metres. Twelve divided by 0.0020 is six thousand volts per metre. That is choice D. Six left the gap in millimetres, and 24 and 0.024 multiplied.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'sum',
          check: true,
          items: ['Between parallel plates the field is **uniform**', '$E = \\dfrac{V}{d}$, with $d$ in **metres**', 'V/m is the same as N/C', 'The potential falls **evenly** across the gap'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Between parallel plates, the field is the same everywhere.', show: 'sum.0' },
        { say: 'Its strength is the voltage divided by the gap, in metres.', show: 'sum.1' },
        { say: 'Volts per metre and newtons per coulomb are the same unit.', show: 'sum.2' },
        { say: 'And the potential falls evenly from one plate to the other. For more on potential difference and parallel plates, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
