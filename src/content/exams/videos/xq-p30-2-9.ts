import type { Explainer, MagnetsEl } from '@/video/script.ts';

// Exam question for Grade 12 lesson 2.9 (the force on a current-carrying wire): a straight 10 cm
// wire carries 0.40 A at right angles to a magnetic field and feels 0.022 N; how strong is the
// field? The question is OpenStax Physics' own, word for word, with its four choices (a Problem for
// section 20.1, CC BY 4.0). F = BIL, so B = F ÷ IL = 0.022 ÷ (0.40 × 0.10) = 0.55 T (choice d).
// 0.55 × 10⁻² T leaves the length in centimetres, and the two 1.10 choices are twice too big.
//
// The picture (src/video/magnets.ts) is the wire seen end-on, held between the poles of a magnet
// whose field is 0.55 T: switch on 0.40 A and the force on its 10 cm, worked out as BIL, is 0.022 N.

const CM = { metres: 0.01, symbol: 'cm' };

const held = (id: string): MagnetsEl => ({
  kind: 'magnets',
  id,
  view: [-7, 7, -2.2, 2.2],
  height: 357,
  length: CM,
  uniform: [0.55, 0],
  uniformLines: 6,
  yoke: { faces: [-3, 3], span: [-1.5, 1.5], thick: 2.4 },
  forceScale: 45 / 0.022,
  // Between two field lines, with room above for the force; labelled with the current it is switched to.
  wires: [{ id: 'w', at: [0, -0.9], amps: 0, metres: 0.1, label: '0.40 A', labelAt: 'right' }],
  poster: 'on',
  thumb: ['lines', 'force'],
  clips: { on: { phases: [{ dur: 0.6 }, { dur: 2, amps: { w: 0.4 } }] } },
});

const ask = held('sim');
const check = held('chk');

const QUESTION =
  'A straight 10 cm wire carries 0.40 A and is oriented perpendicular to a magnetic field. If the force on the wire is 0.022 N, what is the magnitude of the magnetic field?';
const CHOICES = ['1.10 × 10⁻² T', '0.55 × 10⁻² T', '1.10 T', '0.55 T'];

const video: Explainer = {
  id: 'xq-p30-2-9',
  lessonId: '',
  exam: {
    lesson: 'p30-2-9',
    source: 'OpenStax, Physics, Problem for section 20.1, Magnetic Fields, Field Lines, and Force',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/20-1-magnetic-fields-field-lines-and-force',
    question: QUESTION,
    choices: CHOICES,
  },
  title: 'Exam Question: Finding a Magnetic Field From the Force on a Wire. F = BIL',
  thumbnailTitle: 'The Force on a Wire',
  thumbnail: 'sim',
  summary:
    'A real test question, solved one small step at a time: a straight 10 cm wire carries 0.40 A across a magnetic field and feels a force of 0.022 N, and we find the strength of the field. We change the length to metres, rearrange F = BIL to make B the subject, and divide. Then we switch on the current between the poles of a magnet to check the force, and look at the traps hidden in the wrong choices.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'The Force on a Wire', subtitle: 'Current in a magnetic field, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the push a magnetic field gives a wire that carries a current. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          choices: ['$1.10 \\times 10^{-2}$ T', '$0.55 \\times 10^{-2}$ T', '$1.10$ T', '$0.55$ T'],
          answer: 3,
          working: '$B = \\dfrac{F}{IL} = \\dfrac{0.022}{(0.40)(0.10)} = 0.55$ T.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'A straight ten centimetre wire carries 0.40 amperes and is oriented perpendicular to a magnetic field. If the force on the wire is 0.022 newtons, what is the magnitude of the magnetic field?' },
        { say: 'The choices are 1.10 times ten to the minus two, 0.55 times ten to the minus two, 1.10, and 0.55 teslas. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [ask, { kind: 'text', id: 'plain', size: 'md', md: 'How **strong** is the field that gives this push?' }],
      lines: [
        { say: 'Let us picture it. Here are the poles of a magnet, and the wire seen end-on, held between them. Ten centimetres of it run through the field, at right angles to it.', show: ['sim', 'sim.lines'] },
        { say: 'Switch on a current of 0.40 amperes, coming out of the page. The field pushes the wire up with a force of 0.022 newtons.', show: 'sim.force', play: 'sim.on', playDelay: 0.5 },
        { say: 'We know the force, the current and the length. The question asks how strong the field must be.', show: 'plain' },
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
          title: 'The force on a current-carrying wire',
          md: 'A wire carrying a current $I$ **at right angles** to a magnetic field $B$, with a length $L$ in the field, feels a force $F = BIL$. The length must be in **metres**, and then $B$ comes out in teslas.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: '$0.30$ T, $4.0$ A, $0.50$ m: $F = (0.30)(4.0)(0.50) = 0.60$ N.' },
      ],
      lines: [
        { say: 'Here is what we need. A wire that carries a current across a magnetic field is pushed sideways with a force equal to the field strength, times the current, times the length of wire in the field. F equals B I L.', show: 'def' },
        { say: 'The length must be in metres. Then the field comes out in teslas.' },
        { say: 'For example, a field of 0.30 teslas, a current of 4.0 amperes and half a metre of wire give a force of 0.60 newtons.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Change the length to **metres**', 'Rearrange $F = BIL$ for $B$', 'Put in the numbers and divide'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, change the length to metres.', show: 'plan.0' },
        { say: 'Second, rearrange the formula so that the field is on its own.', show: 'plan.1' },
        { say: 'Third, put in the numbers and divide.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The length in metres',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['L = 10\\ \\text{cm} = \\dfrac{10}{100}\\ \\text{m} = \\adj{0.10\\ \\text{m}}'] }],
      lines: [
        { say: 'Step one. There are a hundred centimetres in a metre, so ten centimetres is 0.10 metres.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 2: Rearrange',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['F = BIL', 'B = \\dfrac{F}{IL}'] }],
      lines: [
        { say: 'Step two. Start from F equals B I L.', show: 'm.0' },
        { say: 'Divide both sides by I times L. The field is the force divided by the current times the length.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Divide',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['B = \\dfrac{0.022\\ \\text{N}}{(0.40\\ \\text{A})(0.10\\ \\text{m})}', '= \\dfrac{0.022}{0.040} = \\good{0.55\\ \\text{T}}'] }],
      lines: [
        { say: 'Step three. Put in the force of 0.022 newtons, the current of 0.40 amperes, and the length of 0.10 metres.', show: 'm.0' },
        { say: 'The bottom is 0.40 times 0.10, which is 0.040. And 0.022 divided by 0.040 is 0.55. The field is 0.55 teslas. That is choice D.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [check, { kind: 'math', id: 'm', size: 'md', lines: ['F = BIL = (0.55)(0.40)(0.10) = 0.022\\ \\text{N}\\ \\checkmark'] }],
      lines: [
        { say: 'Let us check it. Now the field between the poles is 0.55 teslas. Switch on 0.40 amperes again, and the force on the wire is worked out from the field, the current and the length.', show: ['chk', 'chk.lines', 'chk.force'], play: 'chk.on', playDelay: 0.5 },
        { say: 'It is 0.022 newtons, the force in the question. Multiplying back gives the same: 0.55 times 0.40 times 0.10 is 0.022.', show: 'm.0' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Choice', 'Where it comes from'],
          rows: [
            ['$0.55 \\times 10^{-2}$ T', '$L$ left in **centimetres**: $\\dfrac{0.022}{(0.40)(10)}$'],
            ['$1.10$ T', 'Twice too big: a slip in the division'],
            ['$1.10 \\times 10^{-2}$ T', 'Both slips at once'],
            ['$0.55$ T', 'Correct'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps hidden in the wrong choices.', show: 'traps' },
        { say: '0.55 times ten to the minus two comes from leaving the length as ten, in centimetres. The answer is then a hundred times too small.' },
        { say: '1.10 is twice the answer, from a slip in the division, and 1.10 times ten to the minus two makes both mistakes. Multiplying back, B I L, catches every one of them.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A wire with 0.20 m of its length in a magnetic field of 0.50 T carries a current of 3.0 A at right angles to the field. What is the force on it?',
          choices: ['0.30 N', '3.0 N', '7.5 N', '0.033 N'],
          answer: 0,
          working: '$F = BIL = (0.50)(3.0)(0.20) = 0.30$ N.',
        },
      ],
      lines: [
        { say: 'Your turn. A wire with 0.20 metres of its length in a magnetic field of 0.50 teslas carries a current of 3.0 amperes at right angles to the field. What is the force on it? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Multiply the field, the current and the length: 0.50 times 3.0 times 0.20 is 0.30 newtons. That is choice A.', show: 'q2.answer' },
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
          items: ['At right angles to the field: $F = BIL$', 'For the field: $B = \\dfrac{F}{IL}$', 'The length in **metres**', 'Check by multiplying back'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A wire carrying a current at right angles to a magnetic field feels a force B I L.', show: 'sum.0' },
        { say: 'To find the field, divide the force by the current times the length.', show: 'sum.1' },
        { say: 'Always put the length in metres.', show: 'sum.2' },
        { say: 'And check by multiplying back. For more on the force on a current-carrying wire, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
