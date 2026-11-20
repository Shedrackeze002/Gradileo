import type { Explainer, FlightEl } from '@/video/script.ts';

// Exam question for Grade 12 lesson 1.5 (collisions in two dimensions): a 0.250 kg object slides
// at 2 m/s into a dark room, strikes a 0.400 kg object at rest, and comes out at 1.50 m/s, 45°
// from its incoming direction. Find the speed and direction of the 0.400 kg object. The question is
// OpenStax Physics' own, word for word (the worked example "Calculating Final Velocity in a
// Two-Dimensional Collision", section 8.3, CC BY 4.0, without its figure reference). Momentum is kept
// along x and along y: 0.400 v2′x = 0.500 − 0.265 gives 0.587 m/s, and 0.400 v2′y = −0.265 gives
// −0.663 m/s, so v2′ = 0.886 m/s at θ2 = −48.5°.
//
// The picture (src/video/flight.ts) is the room seen from above. Object 1 is aimed off centre so
// that the line through the centres points 48.47° below the x-axis as they touch, and the objects
// part at 0.7363 of the speed at which they closed: that gives object 1 the book's 1.50 m/s at 45°,
// and object 2 0.886 m/s at −48.5°. The bars show the x and y momentum staying 0.5 and 0.

const RAD = Math.PI / 180;
const LINE = 48.4713 * RAD;
const R1 = 0.26;
const R2 = 0.32;
const OFFSET = (R1 + R2) * Math.sin(LINE);
const FROM = 3;
// The time object 1 takes to reach object 2 at 2 m/s.
const REACH = (FROM - (R1 + R2) * Math.cos(LINE)) / 2;

const room: FlightEl = {
  kind: 'flight',
  id: 'sim',
  scene: 'map',
  view: [-3.6, 3.4, -2.4, 3.0],
  poster: 'hit',
  height: 450,
  tick: 1,
  velocityScale: 60,
  angleDecimals: 1,
  speedDecimals: 2,
  collisions: { restitution: 0.7363 },
  momentum: { max: 0.6, min: -0.3 },
  bodies: [
    { id: 'one', shape: 'puck', label: '1', mass: 0.25, radius: R1, at: [-FROM, OFFSET], v: [2, 0], tone: 'adj' },
    { id: 'two', shape: 'puck', label: '2', mass: 0.4, radius: R2, at: [0, 0], tone: 'opp' },
  ],
  clips: { hit: { phases: [{ dur: REACH + 1.0, slow: 2, note: 'Slow motion' }] } },
};

const QUESTION =
  'Suppose the following experiment is performed. An object of mass 0.250 kg (m₁) is slid on a frictionless surface into a dark room, where it strikes an initially stationary object of mass 0.400 kg (m₂). The 0.250 kg object emerges from the room at an angle of 45° with its incoming direction. The speed of the 0.250 kg object is originally 2 m/s and is 1.50 m/s after the collision. Calculate the magnitude and direction of the velocity (v′₂ and θ₂) of the 0.400 kg object after the collision.';

const video: Explainer = {
  id: 'xq-p30-1-5',
  lessonId: '',
  exam: {
    lesson: 'p30-1-5',
    source: 'OpenStax, Physics, Worked Example "Calculating Final Velocity in a Two-Dimensional Collision", section 8.3',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/8-3-elastic-and-inelastic-collisions',
    question: QUESTION,
  },
  title: 'Exam Question: A Collision in a Dark Room. Momentum in Two Dimensions',
  thumbnailTitle: 'A Collision in the Dark',
  thumbnail: 'sim',
  summary:
    'A real test question, solved one small step at a time: a 0.250 kg object slides into a dark room, strikes a 0.400 kg object at rest and comes out at 45°, and we find the speed and direction of the object we cannot see. We keep momentum along x and along y separately, solve for the two components and combine them with Pythagoras and the inverse tangent. Then we watch the collision from above and look at the traps that catch people.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'A Collision in the Dark', subtitle: 'Momentum in two dimensions, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about a collision that happens where nobody can see it. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          answer: '$v_2\' = 0.886$ m/s, $\\theta_2 = -48.5°$',
          working: '$x$: $0.500 = 0.265 + 0.400\\,v\'_{2x}$, so $v\'_{2x} = 0.587$. $y$: $0 = 0.265 + 0.400\\,v\'_{2y}$, so $v\'_{2y} = -0.663$. Then $v_2\' = 0.886$ m/s at $-48.5°$.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Suppose the following experiment is performed. An object of mass 0.250 kilograms, m one, is slid on a frictionless surface into a dark room, where it strikes an initially stationary object of mass 0.400 kilograms, m two.' },
        { say: 'The 0.250 kilogram object emerges from the room at an angle of 45 degrees with its incoming direction. Its speed is two metres per second at first, and 1.50 metres per second after the collision.' },
        { say: 'Calculate the magnitude and direction of the velocity, v two prime and theta two, of the 0.400 kilogram object after the collision. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [room, { kind: 'text', id: 'plain', size: 'md', md: 'We see object 1 go in and come out. Where did **object 2** go?' }],
      lines: [
        { say: 'Let us look inside the dark room, from above. Object 1 slides in at two metres per second and clips object 2 off centre.', show: ['sim', 'sim.velocity', 'sim.trail'], play: 'sim.hit', playDelay: 0.5, wait: 3.5 },
        { say: 'Object 1 comes out at 1.50 metres per second, turned 45 degrees. In the experiment, that is all we can measure. The question asks for the speed and direction of object 2, which we cannot see.', show: 'plain' },
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
          title: 'Momentum in two dimensions',
          md: 'Momentum is a vector, so it is kept **along each direction separately**. Put $x$ along the incoming path and $y$ across it: the total $p_x$ and the total $p_y$ are each the same before and after. A velocity $v$ at angle $\\theta$ has components $v\\cos\\theta$ and $v\\sin\\theta$.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: 'Back together: $v = \\sqrt{v_x^2 + v_y^2}$ and $\\theta = \\tan^{-1}\\dfrac{v_y}{v_x}$.' },
      ],
      lines: [
        { say: 'Here is what we need. Momentum is a vector, so it is kept along each direction separately.', show: 'def' },
        { say: 'We put the x axis along the incoming path, and the y axis across it. Then the total momentum along x is the same before and after, and so is the total along y. A velocity at an angle splits into a cosine part along x and a sine part along y.' },
        { say: 'And to put two components back together, we use Pythagoras for the size and the inverse tangent for the angle.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Momentum **before**: all along $x$', 'Split object 1’s momentum **after** into $x$ and $y$', 'Keep $p_x$ and $p_y$: solve for $v\'_{2x}$ and $v\'_{2y}$', 'Combine into $v_2\'$ and $\\theta_2$'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, the momentum before, which is all along x.', show: 'plan.0' },
        { say: 'Second, split object 1\'s momentum after the collision into its x and y parts.', show: 'plan.1' },
        { say: 'Third, keep the momentum along x and along y, and solve for object 2\'s two velocity components.', show: 'plan.2' },
        { say: 'Fourth, combine them into a speed and a direction.', show: 'plan.3' },
      ],
    },
    {
      chapter: 'Step 1: Before',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['p_x = m_1 v_1 = 0.250 \\times 2 = \\adj{0.500\\ \\text{kg·m/s}}', 'p_y = 0'] }],
      lines: [
        { say: 'Step one. Before the collision, only object 1 moves, straight along x. Its momentum is 0.250 times two: 0.500 kilogram metres per second.', show: 'm.0' },
        { say: 'Nothing moves across, so the momentum along y is zero. That will matter.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Object 1 after',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['m_1 v_1\' \\cos 45° = 0.250 \\times 1.50 \\times 0.707 = 0.265', 'm_1 v_1\' \\sin 45° = 0.250 \\times 1.50 \\times 0.707 = 0.265'] }],
      lines: [
        { say: 'Step two. After the collision, object 1 moves at 1.50 metres per second at 45 degrees. Its momentum along x is 0.250 times 1.50 times the cosine of 45 degrees: 0.265.', show: 'm.0' },
        { say: 'Its momentum along y uses the sine of 45 degrees. At 45 degrees, sine and cosine are equal, so it is 0.265 as well.', show: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Keep x and y',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['x:\\quad 0.500 = 0.265 + 0.400\\,v\'_{2x} \\ \\Rightarrow\\ v\'_{2x} = \\dfrac{0.235}{0.400} = \\adj{0.587\\ \\text{m/s}}', 'y:\\quad 0 = 0.265 + 0.400\\,v\'_{2y} \\ \\Rightarrow\\ v\'_{2y} = \\dfrac{-0.265}{0.400} = \\opp{-0.663\\ \\text{m/s}}'],
        },
      ],
      lines: [
        { say: 'Step three. Along x: the 0.500 before equals object 1\'s 0.265 plus object 2\'s 0.400 times its x velocity. Take 0.265 away and divide by 0.400: 0.587 metres per second.', show: 'm.0' },
        { say: 'Along y: zero before, so zero after. Object 1 carries plus 0.265, so object 2 must carry minus 0.265. Divide by 0.400: minus 0.663 metres per second. Object 2 goes off on the other side of the line.', show: 'm.1' },
      ],
    },
    {
      chapter: 'Step 4: Combine',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['v_2\' = \\sqrt{0.587^2 + 0.663^2} = \\good{0.886\\ \\text{m/s}}', '\\theta_2 = \\tan^{-1}\\!\\left(\\dfrac{-0.663}{0.587}\\right) = \\good{-48.5°}'] }],
      lines: [
        { say: 'Step four. The speed comes from Pythagoras: the square root of 0.587 squared plus 0.663 squared. 0.886 metres per second.', show: 'm.0' },
        { say: 'The angle comes from the inverse tangent of y over x: minus 48.5 degrees. Object 2 moves off at 0.886 metres per second, 48.5 degrees below its incoming direction, on the opposite side from object 1.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [room, { kind: 'text', id: 't', size: 'md', md: 'Total $p_x$ stays $0.5$, and total $p_y$ stays $0$.' }],
      lines: [
        { say: 'Let us check it inside the room. Here is the collision again, with the momentum bars along x and along y.', show: ['sim', 'sim.velocity', 'sim.trail', 'sim.bars', 'sim.total'], play: 'sim.hit', playDelay: 0.3, wait: 3.5 },
        { say: 'Object 2 leaves at 0.886 metres per second, 48.5 degrees below the line. The total momentum along x stays at 0.5, and the y momentum of the two objects cancels, so the total along y stays at zero.', show: 't' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Mistake', 'What goes wrong'],
          rows: [
            ['Adding **speeds** in one equation', '$0.250(2) = 0.250(1.50) + 0.400\\,v$ gives $0.313$ m/s, with no direction'],
            ['Forgetting $p_y = 0$ before', 'Object 2 cannot be found, or ends up on the **same** side'],
            ['$\\tan^{-1}$ of $x$ over $y$', 'Gives $41.5°$: the angle from the **wrong** axis'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps in a question like this.', show: 'traps' },
        { say: 'The biggest is to treat momentum like a plain number and write one equation with the speeds. That gives 0.313 metres per second and no direction at all. Momentum is a vector: x and y must balance separately.' },
        { say: 'The second is to forget that the y momentum was zero before. That zero is what sends object 2 off on the other side.' },
        { say: 'And the third is to flip the fraction in the inverse tangent. Y over x gives the angle from the x axis. X over y gives 41.5 degrees, measured from the wrong axis.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A 1.0 kg puck moving east at 4.0 m/s strikes a 2.0 kg puck at rest. Afterwards the 1.0 kg puck moves north at 2.0 m/s. What is the velocity of the 2.0 kg puck?',
          choices: ['2.24 m/s, 26.6° north of east', '2.24 m/s, 26.6° south of east', '3.0 m/s, east', '1.0 m/s, south'],
          answer: 1,
          working: 'East: $4.0 = 2.0\\,v_x$, so $v_x = 2.0$. North: $0 = 2.0 + 2.0\\,v_y$, so $v_y = -1.0$. Then $v = \\sqrt{5} = 2.24$ m/s at $\\tan^{-1}(1/2) = 26.6°$ south of east.',
        },
      ],
      lines: [
        { say: 'Your turn. A 1.0 kilogram puck moving east at 4.0 metres per second strikes a 2.0 kilogram puck at rest. Afterwards the 1.0 kilogram puck moves north at 2.0 metres per second. What is the velocity of the 2.0 kilogram puck? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'East: four equals two times v x, so v x is two. North: zero equals two plus two times v y, so v y is minus one. Combined, that is 2.24 metres per second, 26.6 degrees south of east. That is choice B. North of east forgot the minus sign: the north momentum must cancel.', show: 'q2.answer' },
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
          items: ['Momentum is kept along $x$ **and** along $y$, separately', 'Split each velocity: $v\\cos\\theta$ and $v\\sin\\theta$', 'Zero $p_y$ before means the $y$ parts **cancel** after', 'Combine: $\\sqrt{v_x^2 + v_y^2}$ and $\\tan^{-1}\\dfrac{v_y}{v_x}$'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. In two dimensions, momentum is kept along x and along y, separately.', show: 'sum.0' },
        { say: 'Split each velocity into its cosine and sine parts.', show: 'sum.1' },
        { say: 'If there was no y momentum before, the y parts must cancel afterwards.', show: 'sum.2' },
        { say: 'And put the components back together with Pythagoras and the inverse tangent. For more on collisions in two dimensions, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
