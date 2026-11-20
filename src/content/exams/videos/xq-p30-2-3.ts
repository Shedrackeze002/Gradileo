import type { ChargesEl, Explainer } from '@/video/script.ts';

// Exam question for Grade 12 lesson 2.3 (electric field strength): a doorknob, a metal sphere of
// diameter 5.0 cm, carries −1.5 nC. What is the electric field 1.0 cm in front of it? The question
// is OpenStax Physics' own, word for word (the worked example "Electric field from doorknob",
// section 18.3, CC BY 4.0). The charge acts as if it were at the centre, so r = 2.5 + 1.0 = 3.5 cm
// and E = kQ ÷ r² = 8.99 × 10⁹ × 1.5 × 10⁻⁹ ÷ 0.035² = 1.1 × 10⁴ N/C, pointing towards the
// doorknob because its charge is negative.
//
// The picture (src/video/charges.ts) is the doorknob to scale, with its field lines and a point P
// carried in from 6.0 cm to 3.5 cm from the centre: the field there is worked out from the charge.

const knob: ChargesEl = {
  kind: 'charges',
  id: 'sim',
  view: [-0.07, 0.1, -0.034, 0.026],
  height: 400,
  notation: 'sci',
  unit: 'nC',
  decimals: 1,
  length: { metres: 0.01, symbol: 'cm' },
  fieldFigures: 2,
  spans: [['q', 'p']],
  bodies: [
    { id: 'q', shape: 'sphere', stand: false, charge: -1.5, x: 0, radius: 0.025, label: 'Doorknob', labelAt: 'left' },
    { id: 'p', charge: 0, x: 0.062, test: true, label: 'P' },
  ],
  poster: 'near',
  clips: { near: { reset: true, phases: [{ dur: 0.6 }, { dur: 2.4, to: { p: 0.035 } }] } },
};

const QUESTION =
  'A doorknob, which can be taken to be a spherical metal conductor, acquires a static electricity charge of q = −1.5 nC. What is the electric field 1.0 cm in front of the doorknob? The diameter of the doorknob is 5.0 cm.';

const video: Explainer = {
  id: 'xq-p30-2-3',
  lessonId: '',
  exam: {
    lesson: 'p30-2-3',
    source: 'OpenStax, Physics, Worked Example "Electric field from doorknob", section 18.3',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/18-3-electric-field',
    question: QUESTION,
  },
  title: 'Exam Question: The Electric Field in Front of a Doorknob. E = kQ/r²',
  thumbnailTitle: 'A Doorknob’s Electric Field',
  thumbnail: 'sim',
  summary:
    'A real test question, solved one small step at a time: a metal doorknob 5.0 cm across carries −1.5 nC, and we find the electric field 1.0 cm in front of it. We measure the distance from the centre of the doorknob, use E = kQ/r², and decide which way the field points. Then we check the answer on the field around the doorknob and look at the traps that catch people.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'A Doorknob’s Electric Field', subtitle: 'Electric field strength, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the static charge on a doorknob, the kind that gives you a small shock. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Physics textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          answer: '$1.1 \\times 10^{4}$ N/C, towards the doorknob',
          working: '$r = 2.5 + 1.0 = 3.5$ cm, so $E = \\dfrac{kQ}{r^2} = \\dfrac{(8.99 \\times 10^{9})(1.5 \\times 10^{-9})}{0.035^2} = 1.1 \\times 10^{4}$ N/C.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'A doorknob, which can be taken to be a spherical metal conductor, acquires a static electricity charge of minus 1.5 nanocoulombs.' },
        { say: 'What is the electric field 1.0 centimetres in front of the doorknob? The diameter of the doorknob is 5.0 centimetres. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [knob, { kind: 'text', id: 'plain', size: 'md', md: 'How strong is the field at P, **1.0 cm** from the surface?' }],
      lines: [
        { say: 'Let us picture it, at full size. The doorknob is a metal ball 5.0 centimetres across, with a negative charge spread over its surface. Its field lines all point in towards it.', show: ['sim', 'sim.charge', 'sim.lines'] },
        { say: 'Now bring a point P in, until it is 1.0 centimetres from the surface. The question asks how strong the electric field is there, and which way it points.', show: ['sim.field', 'plain'], play: 'sim.near', playDelay: 0.3 },
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
          title: 'The field of a charged sphere',
          md: 'Outside a charged sphere, the field is the same as if all the charge sat at its **centre**: $E = \\dfrac{k|Q|}{r^2}$, where $r$ is measured **from the centre**, in metres. The field points **away** from a positive charge and **towards** a negative one.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: '$+2.0$ nC, $0.10$ m from the centre: $E = \\dfrac{(8.99 \\times 10^{9})(2.0 \\times 10^{-9})}{0.10^2} = 1.8 \\times 10^{3}$ N/C, outwards.' },
      ],
      lines: [
        { say: 'Here is what we need. Outside a charged metal sphere, the field is just as if all the charge were a point at the centre. So we use the field of a point charge: k times the charge, over the distance squared.', show: 'def' },
        { say: 'The distance is measured from the centre, in metres. And the field points away from a positive charge, and towards a negative one.' },
        { say: 'For example, 2.0 nanocoulombs, 0.10 metres from the centre, gives 1.8 times ten to the three newtons per coulomb, pointing outwards.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Find $r$ from the **centre**, in metres', 'Use $E = \\dfrac{k|Q|}{r^2}$', 'Find the **direction** from the sign of $Q$'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, find the distance from the centre, in metres.', show: 'plan.0' },
        { say: 'Second, put the numbers into the field of a point charge.', show: 'plan.1' },
        { say: 'Third, find the direction from the sign of the charge.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The distance',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{radius} = \\dfrac{5.0\\ \\text{cm}}{2} = 2.5\\ \\text{cm}', 'r = 2.5 + 1.0 = 3.5\\ \\text{cm} = \\adj{0.035\\ \\text{m}}'] }],
      lines: [
        { say: 'Step one. The diameter is 5.0 centimetres, so the radius is 2.5.', show: 'm.0' },
        { say: 'The point is 1.0 centimetres beyond the surface, so it is 2.5 plus 1.0: 3.5 centimetres from the centre. In metres, that is 0.035.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: The field strength',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['E = \\dfrac{k|Q|}{r^2} = \\dfrac{(8.99 \\times 10^{9})(1.5 \\times 10^{-9})}{(0.035)^2}', '= \\dfrac{13.5}{0.001225} = \\good{1.1 \\times 10^{4}\\ \\text{N/C}}'] }],
      lines: [
        { say: 'Step two. k is 8.99 times ten to the nine, and the size of the charge is 1.5 times ten to the minus nine coulombs. Divide by 0.035 squared.', show: 'm.0' },
        { say: 'The top is 13.5, and 0.035 squared is 0.001225. The field is 1.1 times ten to the four newtons per coulomb.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: The direction',
      layout: 'center',
      main: [knob, { kind: 'callout', id: 'dir', tone: 'tip', title: 'Direction', md: '$Q$ is **negative**, so the field at P points **towards** the doorknob.' }],
      lines: [
        { say: 'Step three. The doorknob\'s charge is negative, so the field lines point in towards it. At P, the field points back towards the doorknob.', show: ['sim', 'sim.charge', 'sim.lines', 'sim.field', 'dir'], play: 'sim.near', playDelay: 0.3 },
        { say: 'So the answer is 1.1 times ten to the four newtons per coulomb, towards the doorknob.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [knob, { kind: 'text', id: 't', size: 'md', md: 'At $r = 3.5$ cm the field is $1.1 \\times 10^{4}$ N/C, **inwards**.' }],
      lines: [
        { say: 'Let us check it on the picture. As P comes in from six centimetres, the field there grows, because it goes as one over the distance squared.', show: ['sim', 'sim.lines', 'sim.field', 'sim.distance'], play: 'sim.near', playDelay: 0.3, wait: 2 },
        { say: 'At 3.5 centimetres from the centre, the field is 1.1 times ten to the four newtons per coulomb, pointing in. It agrees.', show: 't' },
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
            ['$r = 1.0$ cm, from the **surface**', '$1.3 \\times 10^{5}$ N/C, twelve times too big'],
            ['$r = 5.0 + 1.0$ cm, using the **diameter**', '$3.7 \\times 10^{3}$ N/C, too small'],
            ['$r$ left in **centimetres**', '$1.1$ N/C, ten thousand times too small'],
            ['Field **away** from the doorknob', 'Right size, wrong direction'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps in this question.', show: 'traps' },
        { say: 'The distance must be measured from the centre, not from the surface. Using one centimetre gives a field twelve times too big. Using the diameter instead of the radius gives one too small.' },
        { say: 'Leaving the distance in centimetres gives 1.1 newtons per coulomb, ten thousand times too small. And the charge is negative, so the field points in, not out.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'What is the size of the electric field 0.30 m from a +2.0 nC point charge?',
          choices: ['60 N/C', '20 N/C', '200 N/C', '2000 N/C'],
          answer: 2,
          working: '$E = \\dfrac{(8.99 \\times 10^{9})(2.0 \\times 10^{-9})}{0.30^2} = \\dfrac{18}{0.09} = 200$ N/C.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the size of the electric field 0.30 metres from a positive 2.0 nanocoulomb point charge? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'k times the charge is eighteen. Divide by 0.30 squared, which is 0.09: two hundred newtons per coulomb. That is choice C. Sixty forgot to square the distance.', show: 'q2.answer' },
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
          items: ['Field of a point charge or sphere: $E = \\dfrac{k|Q|}{r^2}$', '$r$ from the **centre**, in **metres**', 'Negative charge: field points **in**; positive: **out**', 'Give the size **and** the direction'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The field of a point charge, or outside a charged sphere, is k times the charge over the distance squared.', show: 'sum.0' },
        { say: 'Measure the distance from the centre, in metres.', show: 'sum.1' },
        { say: 'The field points in towards a negative charge, and out from a positive one.', show: 'sum.2' },
        { say: 'And a field has a size and a direction, so give both. For more on electric fields, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
