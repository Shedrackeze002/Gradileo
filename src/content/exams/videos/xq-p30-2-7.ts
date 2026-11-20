import type { Explainer, MagnetsEl } from '@/video/script.ts';

// Exam question for Grade 12 lesson 2.7 (the magnetic field of a current): how far from a straight
// wire carrying 0.45 A is the magnetic field 0.040 T? The question is OpenStax Physics' own, word
// for word, with its four choices (a Problem for section 20.1, CC BY 4.0). B = μ₀I ÷ 2πr, so
// r = μ₀I ÷ 2πB = (4π × 10⁻⁷ × 0.45) ÷ (2π × 0.040) = 2.25 × 10⁻⁶ m ≈ 2.3 μm (choice c).
// 7.2 μm leaves out the π, 0.72 μm divides by π twice, and 0.23 μm slips a power of ten.
//
// The picture (src/video/magnets.ts) is the wire seen end-on, with its circular field lines and a
// point P carried in from 4.0 μm to 2.25 μm: the field there is worked out from μ₀I ÷ 2πr.

const UM = { metres: 1e-6, symbol: 'μm' };

const wire: MagnetsEl = {
  kind: 'magnets',
  id: 'sim',
  view: [-6, 6, -1.8, 1.8],
  height: 340,
  length: UM,
  fieldScale: 70 / 0.04,
  wires: [{ id: 'w', at: [-3, 0], amps: 0.45, labelAt: 'left' }],
  probes: [{ id: 'p', at: [1, 0], label: 'P', labelAt: 'right' }],
  seeds: [
    [-2.5, 0],
    [-1.9, 0],
    [-0.75, 0],
    [0.4, 0],
  ],
  poster: 'in',
  clips: { in: { phases: [{ dur: 0.6 }, { dur: 2.6, to: { p: [-0.75, 0] } }] } },
};

const QUESTION = 'How far from a straight wire carrying 0.45 A is the magnetic field strength 0.040 T?';
const CHOICES = ['0.23 μm', '0.72 μm', '2.3 μm', '7.2 μm'];

const video: Explainer = {
  id: 'xq-p30-2-7',
  lessonId: '',
  exam: {
    lesson: 'p30-2-7',
    source: 'OpenStax, Physics, Problem for section 20.1, Magnetic Fields, Field Lines, and Force',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/20-1-magnetic-fields-field-lines-and-force',
    question: QUESTION,
    choices: CHOICES,
  },
  title: 'Exam Question: Where Is the Field of a Wire 0.040 T? B = μ₀I/2πr',
  thumbnailTitle: 'The Field of a Wire',
  thumbnail: 'sim',
  summary:
    'A real test question, solved one small step at a time: a straight wire carries 0.45 A, and we find how far from it the magnetic field is 0.040 T. We rearrange the field of a long straight wire, B = μ₀I/2πr, to make r the subject, and let the π cancel. Then we carry a point towards the wire to check the field, and look at the traps hidden in the wrong choices.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'The Field of a Wire', subtitle: 'The magnetic field of a current, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the magnetic field around a wire that carries a current. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          choices: ['$0.23\\ \\mu$m', '$0.72\\ \\mu$m', '$2.3\\ \\mu$m', '$7.2\\ \\mu$m'],
          answer: 2,
          working: '$r = \\dfrac{\\mu_0 I}{2\\pi B} = \\dfrac{(4\\pi \\times 10^{-7})(0.45)}{2\\pi (0.040)} = 2.25 \\times 10^{-6}$ m $\\approx 2.3\\ \\mu$m.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'How far from a straight wire carrying 0.45 amperes is the magnetic field strength 0.040 teslas?' },
        { say: 'The choices are 0.23, 0.72, 2.3, and 7.2 micrometres. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [wire, { kind: 'text', id: 'plain', size: 'md', md: 'How close to the wire is the field **0.040 T**?' }],
      lines: [
        { say: 'Let us picture it. Here is the wire seen end-on, with the current coming out of the page. Its magnetic field lines are circles around it.', show: ['sim', 'sim.lines'] },
        { say: 'The field gets stronger as you come closer to the wire. Bring a point P in, and watch the field there grow. The question asks how close P must be for the field to reach 0.040 teslas.', show: ['sim.field', 'plain'], play: 'sim.in', playDelay: 0.3 },
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
          title: 'The field of a long straight wire',
          md: 'A wire carrying a current $I$ makes circular field lines around it. At a distance $r$ the field is $B = \\dfrac{\\mu_0 I}{2\\pi r}$, where $\\mu_0 = 4\\pi \\times 10^{-7}$ T·m/A. Closer means **stronger**: half the distance, twice the field.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: '$5.0$ A at $2.0$ cm: $B = \\dfrac{(4\\pi \\times 10^{-7})(5.0)}{2\\pi(0.020)} = 5.0 \\times 10^{-5}$ T.' },
      ],
      lines: [
        { say: 'Here is what we need. A wire carrying a current makes circular magnetic field lines around it.', show: 'def' },
        { say: 'At a distance r, the field is mu nought times the current, divided by two pi r. Mu nought is four pi times ten to the minus seven. The field is stronger closer in: halve the distance, and the field doubles.' },
        { say: 'For example, five amperes, two centimetres away, gives five times ten to the minus five teslas, about the strength of the Earth\'s field.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Rearrange $B = \\dfrac{\\mu_0 I}{2\\pi r}$ for $r$', 'Put in the numbers: the $\\pi$ **cancels**', 'Change metres to **micrometres**'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, rearrange the formula so that the distance is on its own.', show: 'plan.0' },
        { say: 'Second, put in the numbers, and let the pi cancel.', show: 'plan.1' },
        { say: 'Third, change the answer to micrometres to match the choices.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Rearrange',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['B = \\dfrac{\\mu_0 I}{2\\pi r}', 'r = \\dfrac{\\mu_0 I}{2\\pi B}'] }],
      lines: [
        { say: 'Step one. Start from the field of a wire.', show: 'm.0' },
        { say: 'Multiply both sides by r, and divide both sides by B. The distance is mu nought I over two pi B.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: The numbers',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['r = \\dfrac{(4\\pi \\times 10^{-7})(0.45)}{2\\pi\\,(0.040)}', '= \\dfrac{2 \\times 10^{-7} \\times 0.45}{0.040} = \\adj{2.25 \\times 10^{-6}\\ \\text{m}}'] }],
      lines: [
        { say: 'Step two. Put in four pi times ten to the minus seven, the current of 0.45 amperes, and the field of 0.040 teslas.', show: 'm.0' },
        { say: 'Four pi over two pi is just two, so the pi cancels. Two times ten to the minus seven, times 0.45, divided by 0.040: 2.25 times ten to the minus six metres.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Micrometres',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['1\\ \\mu\\text{m} = 10^{-6}\\ \\text{m}', 'r = 2.25\\ \\mu\\text{m} \\approx \\good{2.3\\ \\mu\\text{m}}'] }],
      lines: [
        { say: 'Step three. A micrometre is a millionth of a metre, ten to the minus six.', show: 'm.0' },
        { say: 'So the distance is 2.25 micrometres, about 2.3. That is choice C. A strong field like this is found only very close to a wire.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [wire, { kind: 'math', id: 'm', size: 'md', lines: ['B = \\dfrac{(4\\pi \\times 10^{-7})(0.45)}{2\\pi(2.25 \\times 10^{-6})} = 0.040\\ \\text{T}\\ \\checkmark'] }],
      lines: [
        { say: 'Let us check it on the picture. P starts four micrometres from the wire. Carry it in to 2.25 micrometres and watch the field.', show: ['sim', 'sim.lines', 'sim.field', 'sim.distance'], play: 'sim.in', playDelay: 0.3, wait: 2.6 },
        { say: 'At 2.25 micrometres, the field is 0.040 teslas, just as the question says.', show: 'm.0' },
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
            ['$7.2\\ \\mu$m', '$\\dfrac{\\mu_0 I}{2B}$: left out the $\\pi$ under the line'],
            ['$0.72\\ \\mu$m', 'Divided by $\\pi$ **again**'],
            ['$0.23\\ \\mu$m', 'A slipped **power of ten**'],
            ['$2.3\\ \\mu$m', 'Correct'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps hidden in the wrong choices.', show: 'traps' },
        { say: '7.2 micrometres comes from leaving out the pi in two pi r. Then the pi on top does not cancel, and the answer is pi times too big.' },
        { say: '0.72 divides by pi once too often, and 0.23 is ten times too small: a slip with the power of ten.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'What is the magnetic field 0.10 m from a long straight wire carrying 5.0 A?',
          choices: ['1.0 × 10⁻⁴ T', '3.1 × 10⁻⁵ T', '1.0 × 10⁻⁵ T', '6.3 × 10⁻⁵ T'],
          answer: 2,
          working: '$B = \\dfrac{(4\\pi \\times 10^{-7})(5.0)}{2\\pi(0.10)} = 1.0 \\times 10^{-5}$ T.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the magnetic field 0.10 metres from a long straight wire carrying 5.0 amperes? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Mu nought over two pi is two times ten to the minus seven. Times five, divided by 0.10: one times ten to the minus five teslas. That is choice C. 3.1 left out the pi, and 6.3 left out the two pi.', show: 'q2.answer' },
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
          items: ['Field of a straight wire: $B = \\dfrac{\\mu_0 I}{2\\pi r}$', '$\\dfrac{\\mu_0}{2\\pi} = 2 \\times 10^{-7}$ T·m/A: the $\\pi$ cancels', 'For the distance: $r = \\dfrac{\\mu_0 I}{2\\pi B}$', 'Closer to the wire, **stronger** field'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The field of a straight wire is mu nought I over two pi r.', show: 'sum.0' },
        { say: 'Mu nought over two pi is just two times ten to the minus seven, so the pi cancels.', show: 'sum.1' },
        { say: 'To find the distance, swap r and B.', show: 'sum.2' },
        { say: 'And the field is stronger closer to the wire. For more on the magnetic field of a current, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
