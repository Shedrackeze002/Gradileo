import type { Explainer, MotionEl } from '@/video/script.ts';
import { halt, run } from '@/content/phys10/videos/lib/track.ts';

// Exam question for Grade 10 lesson 1.5 (motion graphs): the average velocity of a jet-powered car
// from its position-time graph. The question is OpenStax Physics' own worked example (section 2.3,
// CC BY 4.0), word for word except that "in Figure 1.13" is left out, and the two points the book
// labels on its graph, (0.50 s, 525 m) and (6.4 s, 2000 m), are written in, since we draw our own
// graph. The slope is (2000 − 525) ÷ (6.4 − 0.50) = 1475 ÷ 5.9 = 250 m/s.
//
// The picture (src/video/motion.ts) runs the car at 250 m/s from 400 m, as on the book's graph,
// and the graph draws itself from the motion, so the line and the car always agree.

const jet: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 2200],
  height: 520,
  graph: { of: ['car'], seconds: 6.4, max: 2200, y: 'position' },
  lanes: [{ surface: 'smooth', label: 'A jet-powered car on the salt flats' }],
  bodies: [{ id: 'car', shape: 'cart', mass: 1, label: 'Jet car', x: 400, width: 160, tone: 'adj' }],
  velocityScale: 0.3,
  poster: 'go',
  clips: {
    go: { reset: true, phases: [{ ...run(6.4, { car: 250 }), slow: 1.2 }, halt('car')] },
  },
};

const QUESTION =
  'Find the average velocity of the car whose position is graphed. (The graph of position against time for a jet-powered car is a straight line through the points (0.50 s, 525 m) and (6.4 s, 2000 m).)';

const video: Explainer = {
  id: 'xq-p10-1-5',
  lessonId: '',
  exam: {
    lesson: 'p10-1-5',
    source: 'OpenStax, Physics, worked example in section 2.3, Position vs. Time Graphs',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/2-3-position-vs-time-graphs',
    question: QUESTION,
  },
  title: 'Exam Question: Velocity From a Position-Time Graph. The Jet Car',
  thumbnailTitle: 'Velocity From a Graph',
  thumbnail: 'sim',
  summary:
    'A real test question, solved one small step at a time: the position of a jet-powered car is graphed against time, a straight line through (0.50 s, 525 m) and (6.4 s, 2000 m), and we find its average velocity. We see why the slope of a position-time graph is the velocity, pick two points, and work out the rise over the run. Then we check the answer and look at the traps that catch people.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Velocity From a Graph', subtitle: 'Position-time graphs, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about reading a car\'s velocity from a graph. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          answer: '$250$ m/s',
          working: '$v = \\dfrac{\\Delta d}{\\Delta t} = \\dfrac{2000 - 525}{6.4 - 0.50} = \\dfrac{1475}{5.9} = 250$ m/s.',
        },
      ],
      lines: [
        { say: 'Here is the question. The book shows its graph in a figure, so we have written in the two points it marks.', show: 'q' },
        { say: 'Find the average velocity of the car whose position is graphed. The graph of position against time for a jet-powered car is a straight line, through the points 0.50 seconds, 525 metres, and 6.4 seconds, 2,000 metres.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [jet],
      lines: [
        { say: 'Let us picture it. Here is the jet car racing along the salt flats. Watch the graph draw itself as the car moves: time along the bottom, position up the side.', show: ['sim', 'sim.clock', 'sim.graph'], play: 'sim.go', playDelay: 0.5 },
        { say: 'Notice that the line does not start at zero. When the clock starts, the car is already 400 metres along.' },
        { say: 'The question asks: from this graph, what is the car\'s average velocity?' },
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
          title: 'The slope of a position-time graph',
          md: 'The **slope** of a line is its **rise over run**. On a graph of position against time, the rise is the change in position $\\Delta d$ and the run is the change in time $\\Delta t$, so the slope **is the velocity**: $v = \\dfrac{\\Delta d}{\\Delta t}$.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: 'From $(1\\ \\text{s}, 10\\ \\text{m})$ to $(3\\ \\text{s}, 30\\ \\text{m})$: $v = 20 \\div 2 = 10$ m/s.' },
      ],
      lines: [
        { say: 'Here is what we need. The slope of a line is how steep it is: its rise over its run.', show: 'def' },
        { say: 'On a position-time graph, the rise is the change in position, and the run is the change in time. Change in position over change in time is the velocity. So the slope of the line is the velocity.' },
        { say: 'For example, from one second and ten metres, to three seconds and thirty metres: a rise of twenty over a run of two is ten metres per second.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Pick **two points** on the line', 'Find the **rise**: $\\Delta d$', 'Find the **run**: $\\Delta t$', 'Divide: rise $\\div$ run'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, pick two points on the line. The line is straight, so any two will do, and the question gives us two.', show: 'plan.0' },
        { say: 'Second, find the rise: the change in position.', show: 'plan.1' },
        { say: 'Third, find the run: the change in time.', show: 'plan.2' },
        { say: 'Then divide the rise by the run.', show: 'plan.3' },
      ],
    },
    {
      chapter: 'Step 1: Two points',
      layout: 'center',
      main: [jet, { kind: 'math', id: 'm', size: 'md', lines: ['(0.50\\ \\text{s},\\ 525\\ \\text{m}) \\qquad (6.4\\ \\text{s},\\ 2000\\ \\text{m})'] }],
      lines: [
        { say: 'Step one. Here are our two points. The first: at 0.50 seconds, the car is at 525 metres.', show: ['sim', 'sim.graph', 'm.0'], play: 'sim.go', playDelay: 0.3 },
        { say: 'The second: at 6.4 seconds, it is at 2,000 metres.' },
      ],
    },
    {
      chapter: 'Step 2: Rise and run',
      layout: 'center',
      main: [jet, { kind: 'math', id: 'm', size: 'md', lines: ['\\Delta d = 2000 - 525 = \\adj{1475\\ \\text{m}} \\qquad \\Delta t = 6.4 - 0.50 = \\opp{5.9\\ \\text{s}}'] }],
      lines: [
        { say: 'Step two. The rise is the final position minus the first: 2,000 minus 525.', show: ['sim', 'sim.graph', 'm.0'], play: 'sim.go', playDelay: 0.3 },
        { say: '1,475 metres.' },
        { say: 'The run is the final time minus the first: 6.4 minus 0.50. That is 5.9 seconds.' },
      ],
    },
    {
      chapter: 'Step 3: Divide',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['v = \\dfrac{\\Delta d}{\\Delta t} = \\dfrac{1475\\ \\text{m}}{5.9\\ \\text{s}}', '= \\good{250\\ \\text{m/s}}'] }],
      lines: [
        { say: 'Step three. Divide the rise by the run: 1,475 metres over 5.9 seconds.', show: 'm.0' },
        { say: '250 metres per second. That is the slope of the line, and the car\'s average velocity.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [jet, { kind: 'math', id: 'm', size: 'md', lines: ['400 + 250 \\times 6.4 = 2000\\ \\text{m}\\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. The car started at 400 metres. Going 250 metres every second for 6.4 seconds adds 1,600 metres.', show: ['sim', 'sim.graph', 'sim.velocity', 'm.0'], play: 'sim.go', playDelay: 0.3 },
        { say: '400 plus 1,600 is 2,000 metres, which is where the graph says the car is at 6.4 seconds.' },
        { say: '250 metres per second is about 900 kilometres per hour: as fast as a jet airliner, which is right for a jet-powered car.' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Wrong answer', 'Where it comes from'],
          rows: [
            ['313 m/s', '$2000 \\div 6.4$: the line does **not** start at $0$ m'],
            ['1050 m/s', '$525 \\div 0.50$: the same mistake'],
            ['0.0040', '$5.9 \\div 1475$: run over rise, **upside down**'],
            ['250 m/s', 'Correct'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: '313 divides one position by one time, as if the car started at zero metres at zero seconds. But it started at 400 metres. Always use the changes: final minus first.' },
        { say: '1,050 is the same mistake, with the other point.' },
        { say: 'And 0.0040 is run over rise, upside down. Slope is always rise over run.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A cart\'s position-time graph is a straight line from (1.0 s, 5.0 m) to (4.0 s, 17 m). What is its velocity?',
          choices: ['4.0 m/s', '4.25 m/s', '5.0 m/s', '0.25 m/s'],
          answer: 0,
          working: '$v = \\dfrac{17 - 5.0}{4.0 - 1.0} = \\dfrac{12}{3.0} = 4.0$ m/s.',
        },
      ],
      lines: [
        { say: 'Your turn. A cart\'s position-time graph is a straight line from one second and five metres, to four seconds and seventeen metres. What is its velocity? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The rise is seventeen minus five: twelve metres. The run is four minus one: three seconds. Twelve over three is 4.0 metres per second. That is choice A. 4.25 divides seventeen by four, using only one point.', show: 'q2.answer' },
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
          items: ['Slope $=$ rise $\\div$ run', 'Position-time graph: the **slope is the velocity**', 'Use **changes**: final minus first', 'A straight line: any two points give the same slope'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The slope of a line is its rise over its run.', show: 'sum.0' },
        { say: 'On a position-time graph, the slope is the velocity.', show: 'sum.1' },
        { say: 'Use the changes, final minus first, never a single point on its own.', show: 'sum.2' },
        { say: 'And on a straight line, any two points give the same slope. For more on motion graphs, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
