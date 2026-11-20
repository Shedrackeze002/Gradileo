import type { ChargesEl, Explainer } from '@/video/script.ts';

// Exam question for Grade 12 lesson 2.8 (the magnetic force on a moving charge): what is the size of
// the force on an electron moving at 1.0 × 10⁶ m/s at right angles to a 1.0 T field? The question is
// OpenStax Physics' own, word for word, with its four choices (a Problem for section 20.1, CC BY
// 4.0). F = qvB = (1.60 × 10⁻¹⁹)(1.0 × 10⁶)(1.0) = 1.6 × 10⁻¹³ N (choice d). 0.8 × 10⁻¹³ N halves
// it, and the two × 10⁻¹⁴ choices slip a power of ten.
//
// The picture (src/video/charges.ts) is the electron sent across a field of 1.0 T into the page, to
// scale in micrometres: the force qvB, worked out as it flies, turns it on a circle of radius
// mv ÷ qB = 5.7 μm, and its speed never changes.

const UM = { metres: 1e-6, symbol: 'μm' };
const ELECTRON = 9.11e-31;
/** One period of an electron in 1.0 T: 2πm ÷ qB, about 3.58 × 10⁻¹¹ s. */
const PERIOD = (2 * Math.PI * ELECTRON) / (1.6e-19 * 1.0);

const beam: ChargesEl = {
  kind: 'charges',
  id: 'sim',
  view: [-25e-6, 25e-6, -14.5e-6, 2.5e-6],
  height: 380,
  unit: 'e',
  length: UM,
  magnetic: { tesla: -1.0 },
  notation: 'sci',
  forceFigures: 2,
  forceScale: 80 / 1.6e-13,
  velocityScale: 70 / 1.0e6,
  speedFigures: 2,
  bodies: [{ id: 'e', charge: -1, x: -6e-6, y: 0, mass: ELECTRON, label: 'Electron', labelAt: 'right' }],
  poster: 'go',
  thumb: ['magnetic', 'charge', 'velocity', 'force', 'trail'],
  clips: {
    // A quarter of a circle, and then a quarter more.
    go: { reset: true, phases: [{ dur: 3, fly: true, launch: { e: [1.0e6, 0] }, rate: PERIOD / 4 / 3 }] },
    on: { phases: [{ dur: 3, fly: true, rate: PERIOD / 4 / 3 }] },
  },
};

const QUESTION = 'What is the magnitude of the force on an electron moving at 1.0 × 10⁶ m/s perpendicular to a 1.0-T magnetic field?';
const CHOICES = ['0.8 × 10⁻¹³ N', '1.6 × 10⁻¹⁴ N', '0.8 × 10⁻¹⁴ N', '1.6 × 10⁻¹³ N'];

const video: Explainer = {
  id: 'xq-p30-2-8',
  lessonId: '',
  exam: {
    lesson: 'p30-2-8',
    source: 'OpenStax, Physics, Problem for section 20.1, Magnetic Fields, Field Lines, and Force',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/20-1-magnetic-fields-field-lines-and-force',
    question: QUESTION,
    choices: CHOICES,
  },
  title: 'Exam Question: The Force on an Electron in a Magnetic Field. F = qvB',
  thumbnailTitle: 'The Force on an Electron',
  thumbnail: 'sim',
  summary:
    'A real test question, solved one small step at a time: an electron moves at 1.0 × 10⁶ m/s at right angles to a 1.0 T magnetic field, and we find the size of the force on it. We take the size of the electron’s charge and multiply, F = qvB, keeping careful track of the powers of ten. Then we watch the force bend the electron round in a circle, and look at the traps hidden in the wrong choices.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'The Force on an Electron', subtitle: 'Magnetic force on a moving charge, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the push a magnetic field gives a moving electron. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          choices: ['$0.8 \\times 10^{-13}$ N', '$1.6 \\times 10^{-14}$ N', '$0.8 \\times 10^{-14}$ N', '$1.6 \\times 10^{-13}$ N'],
          answer: 3,
          working: '$F = qvB = (1.60 \\times 10^{-19})(1.0 \\times 10^{6})(1.0) = 1.6 \\times 10^{-13}$ N.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'What is the magnitude of the force on an electron moving at 1.0 times ten to the six metres per second, perpendicular to a 1.0 tesla magnetic field?' },
        { say: 'The choices are 0.8 times ten to the minus thirteen, 1.6 times ten to the minus fourteen, 0.8 times ten to the minus fourteen, and 1.6 times ten to the minus thirteen newtons. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [beam, { kind: 'text', id: 'plain', size: 'md', md: 'How **strong** is the push on the electron?' }],
      lines: [
        { say: 'Let us picture it. Here is a magnetic field of one tesla. The crosses mean that it points into the page.', show: ['sim', 'sim.magnetic', 'sim.charge'] },
        { say: 'Send an electron across it, at right angles to the field. A force appears, at right angles to its velocity, and bends it off its straight path.', show: ['sim.velocity', 'sim.force', 'sim.trail'], play: 'sim.go', playDelay: 0.8 },
        { say: 'Perpendicular just means at right angles. The question asks only for the magnitude, the size, of that force.', show: 'plain' },
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
          title: 'The magnetic force on a moving charge',
          md: 'A charge $q$ moving at speed $v$ **at right angles** to a magnetic field $B$ feels a force $F = qvB$, at right angles to both. Every electron carries a charge of size $e = 1.60 \\times 10^{-19}$ C. The minus sign of its charge only **reverses** the direction of the force.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: 'A proton at $2.0 \\times 10^{5}$ m/s across $0.50$ T: $F = (1.60 \\times 10^{-19})(2.0 \\times 10^{5})(0.50) = 1.6 \\times 10^{-14}$ N.' },
      ],
      lines: [
        { say: 'Here is what we need. A charge moving at right angles to a magnetic field feels a force equal to the charge, times the speed, times the field strength. F equals q v B.', show: 'def' },
        { say: 'The charge of an electron is 1.60 times ten to the minus nineteen coulombs. It is negative, but the sign only flips the direction of the force. For the size, we use the number without its sign.' },
        { say: 'For example, a proton at two times ten to the five metres per second, across half a tesla, feels 1.6 times ten to the minus fourteen newtons.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Write down $q$, $v$ and $B$', 'Multiply: $F = qvB$', 'Handle the **powers of ten** with care'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, write down the charge, the speed and the field.', show: 'plan.0' },
        { say: 'Second, multiply them together.', show: 'plan.1' },
        { say: 'Third, take care with the powers of ten, because that is where the wrong choices come from.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The numbers',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['q = \\adj{1.60 \\times 10^{-19}\\ \\text{C}}', 'v = 1.0 \\times 10^{6}\\ \\text{m/s}, \\quad B = 1.0\\ \\text{T}'] }],
      lines: [
        { say: 'Step one. The charge is the size of the electron\'s charge: 1.60 times ten to the minus nineteen coulombs.', show: 'm.0', focus: 'm.0' },
        { say: 'The speed is 1.0 times ten to the six metres per second, and the field is 1.0 tesla. It is at right angles, so the whole speed counts.', show: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Multiply',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['F = qvB = (1.60 \\times 10^{-19})(1.0 \\times 10^{6})(1.0)', '= 1.6 \\times 10^{-19 + 6} = \\good{1.6 \\times 10^{-13}\\ \\text{N}}'] }],
      lines: [
        { say: 'Step two. Multiply the charge, the speed and the field.', show: 'm.0' },
        { say: 'The numbers in front give 1.6. When you multiply powers of ten, add the exponents: minus nineteen plus six is minus thirteen. The force is 1.6 times ten to the minus thirteen newtons. That is choice D.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [beam, { kind: 'math', id: 'm', size: 'md', lines: ['r = \\dfrac{mv}{qB} = \\dfrac{(9.11 \\times 10^{-31})(1.0 \\times 10^{6})}{(1.60 \\times 10^{-19})(1.0)} = 5.7\\ \\mu\\text{m}'] }],
      lines: [
        { say: 'Let us check it on the picture. The force on the electron is worked out as it flies, from its charge, its speed and the field. It reads 1.6 times ten to the minus thirteen newtons.', show: ['sim', 'sim.magnetic', 'sim.charge', 'sim.velocity', 'sim.force', 'sim.trail'], play: 'sim.go', playDelay: 0.3 },
        { say: 'Watch it keep going. The force always points across the path, so it turns the electron round in a circle, and its speed stays at 1.0 times ten to the six metres per second.', play: 'sim.on', playDelay: 0.3 },
        { say: 'The electron is so light that even this tiny force bends it round a circle with a radius of only 5.7 micrometres.', show: 'm.0' },
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
            ['$0.8 \\times 10^{-13}$ N', 'Half the force: an extra $\\sin 30^\\circ$'],
            ['$1.6 \\times 10^{-14}$ N', 'A slipped **power of ten**'],
            ['$0.8 \\times 10^{-14}$ N', 'Both slips at once'],
            ['$1.6 \\times 10^{-13}$ N', 'Correct'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps hidden in the wrong choices.', show: 'traps' },
        { say: '0.8 times ten to the minus thirteen is exactly half the answer. Perpendicular means the angle is ninety degrees, and sine ninety is one, so nothing is halved.' },
        { say: '1.6 times ten to the minus fourteen is ten times too small: a slip with the powers of ten. And 0.8 times ten to the minus fourteen makes both mistakes.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A proton (charge $1.60 \\times 10^{-19}$ C) moves at $3.0 \\times 10^{6}$ m/s at right angles to a magnetic field of 0.20 T. What is the size of the magnetic force on it?',
          choices: ['9.6 × 10⁻¹⁵ N', '2.4 × 10⁻¹² N', '4.8 × 10⁻¹³ N', '9.6 × 10⁻¹⁴ N'],
          answer: 3,
          working: '$F = qvB = (1.60 \\times 10^{-19})(3.0 \\times 10^{6})(0.20) = 9.6 \\times 10^{-14}$ N.',
        },
      ],
      lines: [
        { say: 'Your turn. A proton moves at 3.0 times ten to the six metres per second, at right angles to a magnetic field of 0.20 teslas. What is the size of the magnetic force on it? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: '1.60 times 3.0 times 0.20 is 0.96, and minus nineteen plus six is minus thirteen: 0.96 times ten to the minus thirteen, or 9.6 times ten to the minus fourteen newtons. That is choice D. 4.8 left out the field, and 2.4 divided by it.', show: 'q2.answer' },
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
          items: ['At right angles to the field: $F = qvB$', 'An electron’s charge has size $1.60 \\times 10^{-19}$ C', 'Multiplying powers of ten: **add** the exponents', 'The force turns the charge, and never changes its **speed**'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A charge moving at right angles to a magnetic field feels a force q v B.', show: 'sum.0' },
        { say: 'For an electron, the size of the charge is 1.60 times ten to the minus nineteen coulombs.', show: 'sum.1' },
        { say: 'When you multiply powers of ten, add the exponents.', show: 'sum.2' },
        { say: 'And the force bends the charge round, but never changes its speed. For more on the magnetic force on a moving charge, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
