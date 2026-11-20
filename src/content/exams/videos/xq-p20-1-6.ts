import type { Explainer, FlightEl } from '@/video/script.ts';

// Exam question for lesson 1.6 (vectors in two dimensions): the magnitude of a vector at 30° to the
// horizontal whose x-component is 3 units. The question is OpenStax Physics' own, word for word
// (Practice Problem, section 5.2, CC BY 4.0). The x-component is the side next to the angle, so
// A cos 30° = 3 and A = 3 ÷ cos 30° = 3.46 units (choice c). 2.61 multiplies by cos 30° instead of
// dividing, 3.00 is the component itself, and 6.00 divides by sin 30°.
//
// The picture (src/video/flight.ts) is a map: a dot moves along the vector, and its displacement,
// the two legs (components) and the angle are drawn from where it has been.

const RAD = Math.PI / 180;
const MAG = 3 / Math.cos(30 * RAD);

const vec: FlightEl = {
  kind: 'flight',
  id: 'sim',
  scene: 'map',
  view: [-0.8, 4.6, -0.7, 2.6],
  height: 430,
  tick: 1,
  units: { length: 'unit', time: 's' },
  poster: 'go',
  bodies: [{ id: 'tip', shape: 'dot', label: 'Tip', labelAt: 'right', at: [0, 0], v: [MAG * Math.cos(30 * RAD), MAG * Math.sin(30 * RAD)], tone: 'theta' }],
  clips: { go: { phases: [{ dur: 1, slow: 3 }] } },
};

const video: Explainer = {
  id: 'xq-p20-1-6',
  lessonId: '',
  exam: {
    lesson: 'p20-1-6',
    source: 'OpenStax, Physics, Practice Problem for section 5.2, Vector Addition and Subtraction: Analytical Methods',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/5-2-vector-addition-and-subtraction-analytical-methods',
    question: 'What is the magnitude of a vector that makes an angle of 30° to the horizontal and whose x-component is 3 units?',
    choices: ['2.61 units', '3.00 units', '3.46 units', '6.00 units'],
  },
  title: 'Exam Question: A Vector at 30° Has an x-Component of 3 Units. How Long Is It?',
  thumbnailTitle: 'Vector From Its Component',
  thumbnail: 'sim',
  summary:
    'A real test question, solved one small step at a time: a vector makes an angle of 30° with the horizontal and its x-component is 3 units, and we find its magnitude. We draw the right-angled triangle of the vector and its components, see that cosine links the x-component to the magnitude, and divide. Then we check the answer and look at the traps hidden in the wrong choices.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'A Vector From One Component', subtitle: 'Components and trigonometry, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about a vector and its components. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'What is the magnitude of a vector that makes an angle of $30^\\circ$ to the horizontal and whose $x$-component is 3 units?',
          choices: ['2.61 units', '3.00 units', '3.46 units', '6.00 units'],
          answer: 2,
          working: '$A\\cos 30^\\circ = 3$, so $A = 3 \\div \\cos 30^\\circ = 3.46$ units.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'What is the magnitude of a vector that makes an angle of thirty degrees to the horizontal, and whose x component is three units?' },
        { say: 'The choices are 2.61 units, 3.00 units, 3.46 units, and 6.00 units. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [vec, { kind: 'text', id: 'plain', size: 'lg', md: 'We know the **shadow** on the $x$-axis and the **angle**. How long is the arrow?' }],
      lines: [
        { say: 'Let us draw it. Here is the vector, an arrow slanting up at thirty degrees.', show: ['sim', 'sim.displacement'], play: 'sim.go', playDelay: 0.5 },
        { say: 'Its x component is how far it reaches along the horizontal: its shadow on the x axis. We know that is three units. The question asks: how long is the arrow itself?', show: ['sim.legs', 'sim.angle', 'plain'] },
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
          title: 'Components of a vector',
          md: 'A vector $A$ at an angle $\\theta$ to the horizontal has $A_x = A\\cos\\theta$ (the side **next to** the angle) and $A_y = A\\sin\\theta$ (the side **opposite** it). The vector is the **hypotenuse**, the longest side.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: '$A = 10$ at $60^\\circ$: $A_x = 10\\cos 60^\\circ = 5$.' },
      ],
      lines: [
        { say: 'Here is what we need. A vector and its two components make a right-angled triangle. The vector is the hypotenuse, the longest side.', show: 'def' },
        { say: 'The x component is the side next to the angle, so it is the vector times the cosine of the angle. The y component is the side opposite the angle: the vector times the sine.' },
        { say: 'For example, a vector of ten at sixty degrees has an x component of ten times cos sixty: five.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Write the link: $A_x = A\\cos\\theta$', '**Rearrange** for $A$: $A = A_x \\div \\cos\\theta$', 'Put in the numbers'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, write down how the x component is linked to the magnitude.', show: 'plan.0' },
        { say: 'Second, rearrange it to find the magnitude.', show: 'plan.1' },
        { say: 'Third, put in the numbers.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The link',
      layout: 'split',
      leftWidth: 760,
      left: [vec],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['A_x = A\\cos\\theta', '3 = A\\cos 30^\\circ'] }],
      lines: [
        { say: 'Step one. The x component is next to the thirty degree angle, so it is A times cos thirty.', show: ['sim', 'sim.displacement', 'sim.legs', 'sim.angle', 'm.0'], play: 'sim.go', playDelay: 0.3 },
        { say: 'We know it is three units. So three equals A times cos thirty degrees.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Rearrange',
      layout: 'split',
      leftWidth: 760,
      left: [vec],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['A = \\dfrac{3}{\\cos 30^\\circ}'] }],
      lines: [
        { say: 'Step two. To get A on its own, divide both sides by cos thirty degrees.', show: ['sim', 'sim.displacement', 'sim.legs', 'sim.angle', 'm.0'], play: 'sim.go', playDelay: 0.3 },
        { say: 'A is three divided by cos thirty degrees. Notice that we divide, not multiply.', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 3: The numbers',
      layout: 'split',
      leftWidth: 760,
      left: [vec],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\cos 30^\\circ = 0.866', 'A = 3 \\div 0.866', '= \\good{3.46\\ \\text{units}}'] }],
      lines: [
        { say: 'Step three. Cos thirty degrees is 0.866. Check that your calculator is in degrees.', show: ['sim', 'sim.displacement', 'sim.legs', 'sim.angle', 'm.0'], play: 'sim.go', playDelay: 0.3 },
        { say: 'Three divided by 0.866 is 3.46. The vector is 3.46 units long. That is choice C.', show: ['m.1', 'm.2'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['3.46 \\times \\cos 30^\\circ = 3.00\\ \\checkmark', '3.46 > 3\\ \\checkmark \\quad \\text{(the hypotenuse is the longest side)}'] }],
      lines: [
        { say: 'Let us check it by working forwards. 3.46 times cos thirty is 3.00. That is the x component we were given.', show: 'm.0' },
        { say: 'And 3.46 is longer than three. It has to be, because the vector is the hypotenuse, the longest side of the triangle.', show: 'm.1' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Choice', 'Why it is wrong'],
          rows: [
            ['2.61 units', '$3 \\times \\cos 30^\\circ$: **multiplied** instead of dividing, and shorter than a side'],
            ['3.00 units', 'That is the **component**, not the vector'],
            ['6.00 units', '$3 \\div \\sin 30^\\circ$: used **sine** for the side next to the angle'],
            ['3.46 units', 'Correct'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps in the wrong choices.', show: 'traps' },
        { say: '2.61 comes from multiplying by cos thirty instead of dividing. It is shorter than the component, so it cannot be the hypotenuse.' },
        { say: '3.00 is just the component we were given.' },
        { say: 'And 6.00 divides by sine thirty instead. Sine goes with the side opposite the angle, the y component, not the x component.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A vector makes an angle of $40^\\circ$ with the horizontal. Its $y$-component is 5.0 units. What is its magnitude?',
          choices: ['6.53 units', '7.78 units', '3.21 units', '5.96 units'],
          answer: 1,
          working: '$A\\sin 40^\\circ = 5.0$, so $A = 5.0 \\div 0.643 = 7.78$ units.',
        },
      ],
      lines: [
        { say: 'Your turn. A vector makes an angle of forty degrees with the horizontal. Its y component is 5.0 units. What is its magnitude? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'This time we know the y component, the side opposite the angle, so use sine. A is five divided by sine forty: five divided by 0.643, which is 7.78 units. That is choice B.', show: 'q2.answer' },
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
          items: ['$A_x = A\\cos\\theta$ and $A_y = A\\sin\\theta$ (angle from the horizontal)', 'From a component back to the vector: **divide**', 'The vector is the **hypotenuse**: longer than either component', 'Calculator in **degrees**'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. With the angle measured from the horizontal, the x component is A cos theta, and the y component is A sine theta.', show: 'sum.0' },
        { say: 'To go from a component back to the vector, divide.', show: 'sum.1' },
        { say: 'The vector is the hypotenuse, so it must be longer than either component.', show: 'sum.2' },
        { say: 'And keep your calculator in degrees. For more on vectors in two dimensions, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
