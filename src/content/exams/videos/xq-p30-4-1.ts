import type { ChargesEl, Explainer } from '@/video/script.ts';

// Exam question for Grade 12 lesson 4.1 (cathode rays): the radius of the path of an electron of a
// TV's cathode ray tube at 6.00 × 10⁷ m/s, across a magnetic field of 0.500 T. The question is
// OpenStax College Physics 2e's own, word for word but for a pointer to a figure (the worked
// example "Calculating the Curvature of the Path of an Electron Moving in a Magnetic Field: A
// Magnet on a TV Screen", section 22.5, CC BY-NC-SA 4.0; Gradileo is non-commercial).
// r = mv ÷ qB = (9.11 × 10⁻³¹)(6.00 × 10⁷) ÷ (1.60 × 10⁻¹⁹)(0.500) = 6.83 × 10⁻⁴ m.
//
// The picture (src/video/charges.ts) is the electron sent across a field of 0.500 T into the page,
// to scale in millimetres: the force qvB, worked out as it flies, turns it round a circle whose
// radius is written beside it.

const MM = { metres: 0.001, symbol: 'mm' };
const ELECTRON = 9.11e-31;
/** One period of an electron in 0.500 T: 2πm ÷ qB, about 7.15 × 10⁻¹¹ s. */
const PERIOD = (2 * Math.PI * ELECTRON) / (1.6e-19 * 0.5);

const beam: ChargesEl = {
  kind: 'charges',
  id: 'sim',
  view: [-3.4e-3, 3.0e-3, -1.85e-3, 0.5e-3],
  height: 380,
  unit: 'e',
  length: MM,
  magnetic: { tesla: -0.5 },
  figures: 3,
  speedFigures: 3,
  plain: true,
  velocityScale: 70 / 6.0e7,
  bodies: [{ id: 'e', charge: -1, x: -0.5e-3, y: 0, mass: ELECTRON, label: '' }],
  poster: 'go',
  thumb: ['magnetic', 'charge', 'velocity', 'trail', 'radius'],
  clips: {
    // Half a circle, then the other half.
    go: { reset: true, phases: [{ dur: 3.5, fly: true, launch: { e: [6.0e7, 0] }, rate: PERIOD / 2 / 3.5 }] },
    on: { phases: [{ dur: 3.5, fly: true, rate: PERIOD / 2 / 3.5 }] },
  },
};

const QUESTION =
  'A magnet brought near an old-fashioned TV screen (TV sets with cathode ray tubes instead of LCD screens) severely distorts its picture by altering the path of the electrons that make its phosphors glow. (Don’t try this at home, as it will permanently magnetize and ruin the TV.) To illustrate this, calculate the radius of curvature of the path of an electron having a velocity of 6.00 × 10⁷ m/s (corresponding to the accelerating voltage of about 10.0 kV used in some TVs) perpendicular to a magnetic field of strength B = 0.500 T (obtainable with permanent magnets).';

const video: Explainer = {
  id: 'xq-p30-4-1',
  lessonId: '',
  exam: {
    lesson: 'p30-4-1',
    source: 'OpenStax, College Physics 2e, Worked Example "A Magnet on a TV Screen", section 22.5',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-physics-2e/pages/22-5-force-on-a-moving-charge-in-a-magnetic-field-examples-and-applications',
    question: QUESTION,
  },
  title: 'Exam Question: How Tightly Does a Magnet Bend a Cathode Ray? r = mv/qB',
  thumbnailTitle: 'Bending a Cathode Ray',
  thumbnail: 'sim',
  summary:
    'A real test question, solved one small step at a time: the electrons that light up an old TV screen travel at 6.00 × 10⁷ m/s, and a magnet of 0.500 T bends their path. We find the radius of the curve by setting the magnetic force equal to the centripetal force, r = mv/qB. Then we watch an electron go round its circle in the field, and look at the traps that catch people.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Bending a Cathode Ray', subtitle: 'Cathode rays in a magnetic field, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the beam of electrons inside an old television, a cathode ray, and what a magnet does to it. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          answer: '$6.83 \\times 10^{-4}$ m, about $0.683$ mm',
          working: '$r = \\dfrac{mv}{qB} = \\dfrac{(9.11 \\times 10^{-31})(6.00 \\times 10^{7})}{(1.60 \\times 10^{-19})(0.500)} = 6.83 \\times 10^{-4}$ m.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'A magnet brought near an old-fashioned TV screen, TV sets with cathode ray tubes instead of LCD screens, severely distorts its picture by altering the path of the electrons that make its phosphors glow. Don\'t try this at home, as it will permanently magnetise and ruin the TV.' },
        { say: 'To illustrate this, calculate the radius of curvature of the path of an electron having a velocity of 6.00 times ten to the seven metres per second, corresponding to the accelerating voltage of about 10.0 kilovolts used in some TVs, perpendicular to a magnetic field of strength 0.500 teslas, obtainable with permanent magnets. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [beam, { kind: 'text', id: 'plain', size: 'md', md: 'How **tight** is the curve the magnet bends the electron into?' }],
      lines: [
        { say: 'Let us picture it. Here is the magnet\'s field, half a tesla, pointing into the page. A cathode ray is a beam of electrons, and here is one of them.', show: ['sim', 'sim.magnetic', 'sim.charge'] },
        { say: 'Send it across the field at 6.00 times ten to the seven metres per second, a fifth of the speed of light. The magnetic force is always at right angles to its velocity, so it bends the electron round a circle.', show: ['sim.velocity', 'sim.trail'], play: 'sim.go', playDelay: 1 },
        { say: 'The radius of curvature is the radius of that circle. The question asks how big it is.', show: 'plain' },
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
          title: 'A charge on a circle in a magnetic field',
          md: 'The magnetic force $qvB$ is the **centripetal force** that keeps the charge on its circle: $qvB = \\dfrac{mv^2}{r}$. One $v$ cancels, so the radius is $r = \\dfrac{mv}{qB}$. An electron has $m = 9.11 \\times 10^{-31}$ kg and $q = 1.60 \\times 10^{-19}$ C.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: 'A proton at $3.0 \\times 10^{6}$ m/s in $0.50$ T: $r = \\dfrac{(1.67 \\times 10^{-27})(3.0 \\times 10^{6})}{(1.60 \\times 10^{-19})(0.50)} = 0.063$ m.' },
      ],
      lines: [
        { say: 'Here is what we need. The magnetic force on the electron, q v B, is the centripetal force that keeps it on its circle, m v squared over r.', show: 'def' },
        { say: 'Set them equal, and one v cancels. The radius is m v over q B. A faster or heavier particle swings wider, and a stronger field or a bigger charge makes the circle tighter.' },
        { say: 'For example, a proton at three times ten to the six metres per second, in half a tesla, goes round a circle of 6.3 centimetres.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Use $r = \\dfrac{mv}{qB}$ with the **electron’s** mass and charge', 'Multiply out the top and the bottom', 'Divide, and change to **millimetres**'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, write down the radius formula with the electron\'s mass and charge.', show: 'plan.0' },
        { say: 'Second, multiply out the top and the bottom.', show: 'plan.1' },
        { say: 'Third, divide, and change the answer to millimetres to picture it.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The formula',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['r = \\dfrac{mv}{qB} = \\dfrac{(9.11 \\times 10^{-31}\\ \\text{kg})(6.00 \\times 10^{7}\\ \\text{m/s})}{(1.60 \\times 10^{-19}\\ \\text{C})(0.500\\ \\text{T})}'] }],
      lines: [
        { say: 'Step one. Put in the electron\'s mass, 9.11 times ten to the minus 31 kilograms, its speed, its charge, 1.60 times ten to the minus nineteen coulombs, and the field of 0.500 teslas.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 2: Top and bottom',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['mv = 5.47 \\times 10^{-23}\\ \\text{kg·m/s}', 'qB = 8.00 \\times 10^{-20}\\ \\text{C·T}'] }],
      lines: [
        { say: 'Step two. On top, 9.11 times six is 54.7, and minus 31 plus seven is minus 24: 5.47 times ten to the minus 23. That is the electron\'s momentum.', show: 'm.0' },
        { say: 'On the bottom, 1.60 times 0.500 is 0.800: 8.00 times ten to the minus twenty.', show: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Divide',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['r = \\dfrac{5.47 \\times 10^{-23}}{8.00 \\times 10^{-20}} = \\good{6.83 \\times 10^{-4}\\ \\text{m}}', '= 0.683\\ \\text{mm}'] }],
      lines: [
        { say: 'Step three. 5.47 divided by 8.00 is 0.683, and minus 23 minus minus twenty is minus three. That is 0.683 times ten to the minus three, or 6.83 times ten to the minus four metres.', show: 'm.0', focus: 'm.0' },
        { say: 'That is less than a millimetre. The magnet bends the electrons into very tight curves, which is why the picture is so badly spoiled.', show: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [beam, { kind: 'math', id: 'm', size: 'md', lines: ['qvB = (1.60 \\times 10^{-19})(6.00 \\times 10^{7})(0.500) = 4.80 \\times 10^{-12}\\ \\text{N} = \\dfrac{mv^2}{r}\\ \\checkmark'] }],
      lines: [
        { say: 'Let us check it on the picture. The electron is turned step by step by the force on it, worked out from its charge, its speed and the field.', show: ['sim', 'sim.magnetic', 'sim.charge', 'sim.velocity', 'sim.trail'], play: 'sim.go', playDelay: 0.3 },
        { say: 'It comes round a circle, and the radius of that circle is 0.683 millimetres. Its speed never changes, because the force is always across its path.', show: 'sim.radius', play: 'sim.on', playDelay: 0.3 },
        { say: 'The force is 4.80 times ten to the minus twelve newtons, and m v squared over 0.683 millimetres gives the same.', show: 'm.0' },
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
            ['The **proton’s** mass', '$1.25$ m: nearly two thousand times too big'],
            ['Upside down: $\\dfrac{qB}{mv}$', '$1460$, and not even a length'],
            ['Used the $10.0$ kV in the formula', 'The voltage only told us the speed'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps in this question.', show: 'traps' },
        { say: 'A cathode ray is made of electrons, so use the electron\'s mass. The proton\'s mass gives a circle more than a metre wide.' },
        { say: 'Turning the formula upside down gives 1,460, in units of one over metres, which is not a length at all.' },
        { say: 'And the ten kilovolts is only there to explain the speed. The formula needs the speed itself, which the question gives.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A proton (mass $1.67 \\times 10^{-27}$ kg, charge $1.60 \\times 10^{-19}$ C) moves at $2.0 \\times 10^{6}$ m/s at right angles to a magnetic field of 0.50 T. What is the radius of its path?',
          choices: ['4.2 cm', '2.3 × 10⁻⁵ m', '8.4 cm', '24 m'],
          answer: 0,
          working: '$r = \\dfrac{mv}{qB} = \\dfrac{(1.67 \\times 10^{-27})(2.0 \\times 10^{6})}{(1.60 \\times 10^{-19})(0.50)} = 0.042$ m $= 4.2$ cm.',
        },
      ],
      lines: [
        { say: 'Your turn. A proton moves at 2.0 times ten to the six metres per second, at right angles to a magnetic field of 0.50 teslas. What is the radius of its path? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'm v is 3.34 times ten to the minus 21, and q B is 8.0 times ten to the minus twenty. Dividing gives 0.042 metres: 4.2 centimetres. That is choice A. 2.3 times ten to the minus five used the electron\'s mass, and 24 metres is upside down.', show: 'q2.answer' },
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
          items: ['Magnetic force = centripetal force: $qvB = \\dfrac{mv^2}{r}$', 'The radius: $r = \\dfrac{mv}{qB}$', 'Cathode rays are **electrons**: use their mass', 'Faster or heavier, wider; stronger field, **tighter**'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. In a magnetic field, the magnetic force is the centripetal force.', show: 'sum.0' },
        { say: 'So the radius of the path is m v over q B.', show: 'sum.1' },
        { say: 'Cathode rays are electrons, so use the electron\'s mass and charge.', show: 'sum.2' },
        { say: 'And a faster or heavier particle swings wider, while a stronger field makes the circle tighter. For more on cathode rays, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
