import type { Explainer, FlightEl } from '@/video/script.ts';

// Exam question for lesson 1.7 (relative velocity): a boat heads straight across a river at
// 3.8 m/s while the current flows at 6.1 m/s. The question is OpenStax Physics' own worked example,
// word for word ("Adding Velocities: A Boat on a River", section 5.1, CC BY 4.0), which solves it
// with a ruler and protractor: 7.2 m/s at 32.0° to the shore. We solve it with Pythagoras and the
// tangent: √(3.8² + 6.1²) = 7.19 m/s and tan⁻¹(3.8 ÷ 6.1) = 31.9°, the same answer to the
// drawing's accuracy. The question has no choices.
//
// The river in the picture (src/video/flight.ts) is 38 m wide, our choice, so the boat crosses in
// 10 s and lands 61 m downstream; every position is its own velocity plus the current's.

const river: FlightEl = {
  kind: 'flight',
  id: 'sim',
  scene: 'river',
  view: [-14, 82, -10, 52],
  height: 440,
  stream: { v: [6.1, 0], band: [0, 38] },
  tick: 10,
  strobe: 2,
  velocityScale: 16,
  poster: 'go',
  bodies: [{ id: 'boat', shape: 'boat', at: [0, 0], v: [0, 3.8], tone: 'theta' }],
  clips: {
    name: { phases: [{ dur: 5, freeze: true }] },
    go: { reset: true, phases: [{ dur: 10, slow: 0.6 }] },
  },
};

const video: Explainer = {
  id: 'xq-p20-1-7',
  lessonId: '',
  exam: {
    lesson: 'p20-1-7',
    source: 'OpenStax, Physics, worked example in section 5.1, Vector Addition and Subtraction: Graphical Methods',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/5-1-vector-addition-and-subtraction-graphical-methods',
    question:
      'A boat attempts to travel straight across a river at a speed of 3.8 m/s. The river current flows at a speed v(river) of 6.1 m/s to the right. What is the total velocity and direction of the boat? You can represent each meter per second of velocity as one centimeter of vector length in your drawing.',
  },
  title: 'Exam Question: A Boat Crosses a River. What Is Its Total Velocity?',
  thumbnailTitle: 'Boat Across a River',
  thumbnail: 'sim',
  summary:
    'A real textbook question, solved one small step at a time: a boat heads straight across a river at 3.8 m/s while the current flows at 6.1 m/s, and we find the boat\'s total velocity and its direction. We add the two velocities head to tail, find the size with Pythagoras and the direction with the tangent, and watch the boat cross. Then we check the answer and look at the common mistakes.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'A Boat on a River', subtitle: 'Adding velocities at right angles, step by step' }],
      lines: [
        { say: 'In this video, we solve a real textbook question about a boat crossing a river while the current pushes it sideways. We will take it one small step at a time.', show: 'title' },
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
          prompt:
            'A boat attempts to travel straight across a river at a speed of $3.8\\ \\text{m/s}$. The river current flows at a speed $v_{\\text{river}}$ of $6.1\\ \\text{m/s}$ to the right. What is the total velocity and direction of the boat? You can represent each meter per second of velocity as one centimeter of vector length in your drawing.',
          answer: '$7.2\\ \\text{m/s}$ at $32^\\circ$ to the shore, downstream',
          working: '$\\sqrt{3.8^2 + 6.1^2} = 7.2\\ \\text{m/s}$; $\\tan^{-1}(3.8 \\div 6.1) = 32^\\circ$.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'A boat tries to travel straight across a river at 3.8 metres per second. The current flows at 6.1 metres per second, to the right. What is the boat\'s total velocity, and its direction? The book suggests a scale drawing. We will calculate it instead, which is more exact. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [river],
      lines: [
        { say: 'Let us watch. The boat points straight across, and its engine moves it through the water at 3.8 metres per second. That is the blue arrow.', show: ['sim', 'sim.own'], play: 'sim.name' },
        { say: 'But the whole river is flowing to the right at 6.1 metres per second, the pink arrow, and it carries the boat with it.' },
        { say: 'Watch where the boat really goes. It points across, but it slides downstream at a slant. The question asks for that slanting velocity: how fast, and in which direction?', show: ['sim.velocity', 'sim.trail'], play: 'sim.go', playDelay: 0.5 },
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
          title: 'Adding velocities',
          md: 'The velocity relative to the bank is the boat\'s velocity **through the water** plus the water\'s velocity: $\\vec v_{\\text{total}} = \\vec v_{\\text{boat}} + \\vec v_{\\text{river}}$. Add them **head to tail**. At right angles they make a right-angled triangle.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: 'Size: $v = \\sqrt{a^2 + b^2}$ (Pythagoras). Direction: $\\tan\\theta = \\dfrac{\\text{opposite}}{\\text{adjacent}}$.' },
      ],
      lines: [
        { say: 'Here is the idea. The boat\'s velocity relative to the bank is its velocity through the water, plus the velocity of the water itself.', show: 'def' },
        { say: 'We add the two arrows head to tail. Here they are at right angles, so they make a right-angled triangle, and the total velocity is its hypotenuse.' },
        { say: 'So Pythagoras gives the size, and the tangent gives the angle.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Draw the two velocities **head to tail**', 'Find the **size** with Pythagoras', 'Find the **direction** with the tangent'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, draw the boat\'s velocity and the river\'s velocity head to tail.', show: 'plan.0' },
        { say: 'Second, find the size of the total with Pythagoras.', show: 'plan.1' },
        { say: 'Third, find its direction with the tangent.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Head to tail',
      layout: 'split',
      leftWidth: 760,
      left: [river],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\adj{3.8} \\text{ across}', '\\hyp{6.1} \\text{ along}'] }],
      lines: [
        { say: 'Step one. The blue arrow is the boat\'s 3.8 metres per second, straight across.', show: ['sim', 'sim.own', 'm.0'], play: 'sim.name' },
        { say: 'From its tip, the pink arrow is the river\'s 6.1 metres per second, downstream. The green arrow, from the start of the blue one to the tip of the pink one, is the total velocity.', show: ['m.1', 'sim.velocity'] },
      ],
    },
    {
      chapter: 'Step 2: The size',
      layout: 'split',
      leftWidth: 760,
      left: [river],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\sqrt{3.8^2 + 6.1^2}', '= \\sqrt{51.65}', '= \\good{7.2\\ \\text{m/s}}'] }],
      lines: [
        { say: 'Step two. The green arrow is the hypotenuse. By Pythagoras, it is the square root of 3.8 squared plus 6.1 squared.', show: ['sim', 'sim.own', 'sim.velocity', 'm.0'], play: 'sim.name' },
        { say: '3.8 squared is 14.44, and 6.1 squared is 37.21. Together, 51.65.', show: 'm.1' },
        { say: 'Its square root is 7.19. So the boat moves at about 7.2 metres per second.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: The direction',
      layout: 'split',
      leftWidth: 760,
      left: [river],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\tan\\theta = 3.8 \\div 6.1', '= 0.623', '\\theta = \\good{32^\\circ}'] }],
      lines: [
        { say: 'Step three. Measure the angle from the shore, which runs along the current. Opposite that angle is the 3.8, and next to it is the 6.1. So tan theta is 3.8 over 6.1.', show: ['sim', 'sim.own', 'sim.velocity', 'm.0'], play: 'sim.name' },
        { say: 'That is 0.623.', show: 'm.1' },
        { say: 'The inverse tangent of 0.623 is 31.9 degrees: about thirty two degrees. So the boat moves at 7.2 metres per second, at thirty two degrees to the shore, heading downstream and across. That matches the book\'s drawing: 7.2 metres per second at 32.0 degrees.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'split',
      leftWidth: 760,
      left: [river],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['6.1 < 7.2 < 9.9\\ \\checkmark', '32^\\circ < 45^\\circ\\ \\checkmark'] }],
      lines: [
        { say: 'Two size checks. The total must be bigger than either arrow on its own, but smaller than the two added straight together. 7.2 is between 6.1 and 9.9.', show: ['sim', 'm.0'] },
        { say: 'And the current is faster than the boat, so the boat is carried along more than across. The angle to the shore must be less than forty five degrees. Thirty two is.', show: 'm.1' },
        { say: 'Watch the boat cross once more. It travels along the green arrow the whole way.', show: ['sim.own', 'sim.velocity', 'sim.trail', 'sim.strobe'], play: 'sim.go', playDelay: 0.3 },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Mistake', 'Why it is wrong'],
          rows: [
            ['$3.8 + 6.1 = 9.9\\ \\text{m/s}$', 'Velocities at right angles do **not** simply add'],
            ['$6.1 - 3.8 = 2.3\\ \\text{m/s}$', 'Only for velocities in **opposite** directions'],
            ['$58^\\circ$ to the shore', 'That is the angle from the line **straight across**'],
            ['$7.2\\ \\text{m/s}$, $32^\\circ$', 'Correct'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the common mistakes.', show: 'traps' },
        { say: 'Adding 3.8 and 6.1 to get 9.9 only works when the velocities point the same way. These are at right angles, so we need Pythagoras.' },
        { say: 'Taking one from the other only works when they point in opposite directions.' },
        { say: 'And fifty eight degrees is the other angle of the triangle: the angle from the line straight across, not from the shore. Always say which line you measured the angle from.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A swimmer swims straight across a river at 1.5 m/s. The current flows at 2.0 m/s. What is the swimmer\'s velocity relative to the bank?',
          choices: ['3.5 m/s at 37° to the bank', '0.5 m/s at 37° to the bank', '2.5 m/s at 37° to the bank', '2.5 m/s at 53° to the bank'],
          answer: 2,
          working: '$\\sqrt{1.5^2 + 2.0^2} = 2.5\\ \\text{m/s}$; $\\tan^{-1}(1.5 \\div 2.0) = 37^\\circ$ to the bank.',
        },
      ],
      lines: [
        { say: 'Your turn. A swimmer swims straight across a river at 1.5 metres per second. The current flows at 2.0 metres per second. What is the swimmer\'s velocity relative to the bank? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The size is the square root of 1.5 squared plus two squared: 2.5 metres per second. The angle to the bank is the inverse tangent of 1.5 over two: thirty seven degrees. That is choice C.', show: 'q2.answer' },
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
          items: ['Total velocity $=$ velocity through the water $+$ the current', 'At right angles: size by **Pythagoras**', 'Direction by the **tangent**; say which line it is from', 'Size check: between the larger arrow and the plain sum'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The total velocity is the velocity through the water, plus the velocity of the current.', show: 'sum.0' },
        { say: 'When the two are at right angles, find the size with Pythagoras.', show: 'sum.1' },
        { say: 'Find the direction with the tangent, and always say which line the angle is measured from.', show: 'sum.2' },
        { say: 'And check the size: it lies between the larger arrow and the two added together. For more on relative velocity, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
