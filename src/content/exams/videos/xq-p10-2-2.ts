import type { Explainer, MotionEl, MotionForce } from '@/video/script.ts';

// Exam question for Grade 10 lesson 2.2 (Newton's first law): a box is pushed from left to right,
// let go, and slows down as it slides; which way is the net external force while it slides? The
// question is OpenStax Physics' own, word for word (Test Prep, section 4.2, CC BY 4.0). Once the
// push stops, only friction acts along the floor, so the net force is from right to left (choice b),
// against the motion, which is why the box slows down.
//
// The picture (src/video/motion.ts) pushes a 2 kg box with 14 N against 8 N of friction, then lets
// go: friction alone then slows it at 4 m/s² until it stops.

const push: MotionForce = { on: 'box', name: 'Push', n: 14, tone: 'opp' };
const friction: MotionForce = { on: 'box', name: 'Friction', n: -8, resist: true, tone: 'bad' };
const UPDOWN: MotionForce[] = [
  { on: 'box', name: 'Weight', n: -19.6, axis: 'y', tone: 'hyp' },
  { on: 'box', name: 'Normal force', n: 19.6, axis: 'y', tone: 'adj' },
];

const slide: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 9],
  height: 380,
  strobe: 0.5,
  lanes: [{ surface: 'rough', label: 'Pushed, then let go' }],
  bodies: [{ id: 'box', shape: 'block', mass: 2, label: 'box', x: 1.4 }],
  forceScale: 12,
  velocityScale: 24,
  poster: 'go',
  clips: {
    go: { reset: true, phases: [{ dur: 1.5, forces: [push, friction], note: 'Pushed' }, { dur: 1.6, forces: [friction], note: 'Sliding freely' }] },
  },
};

/** The box half way through its free slide, with every force on it drawn: the forces appear, then it slides on. */
const free: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 8],
  height: 440,
  lanes: [{ surface: 'rough', label: 'Sliding freely: the push has stopped' }],
  bodies: [{ id: 'box', shape: 'block', mass: 2, label: 'box', x: 2.2, v: 4 }],
  forceScale: 6.5,
  velocityScale: 26,
  poster: 'all',
  clips: {
    all: { phases: [{ dur: 1, freeze: true, forces: [...UPDOWN, friction] }] },
    along: { phases: [{ dur: 0.6, freeze: true, forces: [friction] }] },
    go: { phases: [{ dur: 0.6, forces: [friction] }] },
  },
};

const QUESTION =
  'A person pushes a box from left to right and then lets the box slide freely across the floor. The box slows down as it slides across the floor. When the box is sliding freely, what is the direction of the net external force?';
const CHOICES = [
  'The net external force acts from left to right.',
  'The net external force acts from right to left.',
  'The net external force acts upward.',
  'The net external force acts downward.',
];

const video: Explainer = {
  id: 'xq-p10-2-2',
  lessonId: '',
  exam: {
    lesson: 'p10-2-2',
    source: 'OpenStax, Physics, Test Prep for section 4.2, Newton\'s First Law of Motion: Inertia',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/4-2-newtons-first-law-of-motion-inertia',
    question: QUESTION,
    choices: CHOICES,
  },
  title: 'Exam Question: The Sliding Box. Which Way Is the Net Force?',
  thumbnailTitle: 'The Sliding Box',
  thumbnail: 'sim',
  summary:
    'A real test question, solved one small step at a time: a box is pushed from left to right, let go, and slows down as it slides across the floor. Which way does the net force on it point? We list every force on the sliding box, see that the up and down forces cancel, and find that friction alone sets the net force. Then we check the answer with Newton\'s first law and look at the traps hidden in the wrong choices.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'The Sliding Box', subtitle: 'Newton\'s first law, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about a box sliding across a floor. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          choices: CHOICES,
          answer: 1,
          working: 'Once the push stops, only friction acts along the floor, and it points against the sliding: from right to left. The weight and the normal force cancel.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'A person pushes a box from left to right, and then lets the box slide freely across the floor. The box slows down as it slides. When the box is sliding freely, what is the direction of the net external force?' },
        { say: 'The choices are: from left to right, from right to left, upward, or downward. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [slide, { kind: 'text', id: 'plain', size: 'lg', md: 'After the push stops: which way is the **net force**?' }],
      lines: [
        { say: 'Let us picture it. The person pushes the box to the right, then lets go. Watch the box slide on, slower and slower, until it stops.', show: ['sim', 'sim.velocity', 'sim.strobe'], play: 'sim.go', playDelay: 0.5 },
        { say: 'The question is about the sliding part, after the push has stopped. Which way does the net force point then?', show: 'plain' },
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
          title: 'Newton\'s first law',
          md: 'An object stays at rest, or keeps moving at a **steady velocity**, unless a **net force** acts on it. So a **change** in motion, speeding up or **slowing down**, needs a net force. **Friction** acts **against** sliding.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: 'A book on a table stays still: no net force, **no change**.' },
      ],
      lines: [
        { say: 'Here is what we need: Newton\'s first law. An object stays at rest, or keeps moving at a steady velocity, unless a net force acts on it.', show: 'def' },
        { say: 'So if the motion changes, if the object speeds up or slows down, there must be a net force. And friction always acts against the sliding.' },
        { say: 'For example, a book lying on a table stays still. There is no net force on it, so nothing changes.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['List **every force** on the sliding box', 'Add the **up and down** forces', 'Add the forces **along the floor**'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, list every force on the box while it slides.', show: 'plan.0' },
        { say: 'Second, add up the forces that act up and down.', show: 'plan.1' },
        { say: 'Third, add up the forces that act along the floor.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The forces',
      layout: 'center',
      main: [free, { kind: 'text', id: 't', size: 'md', md: 'Weight, normal force, friction. **No push**: the hand has let go.' }],
      lines: [
        { say: 'Step one. While the box slides, the Earth pulls it down: its weight. The floor pushes it up: the normal force. And friction acts along the floor, against the sliding.', show: 'sim', play: 'sim.all', playDelay: 0.3 },
        { say: 'Notice what is missing. The person has let go, so there is no push any more.', show: 't' },
      ],
    },
    {
      chapter: 'Step 2: Up and down',
      layout: 'center',
      main: [free, { kind: 'text', id: 't', size: 'md', md: 'Weight $=$ normal force, so they **cancel**: nothing up or down.' }],
      lines: [
        { say: 'Step two. The weight and the normal force are the same size, in opposite directions, so they cancel.', show: 'sim', play: 'sim.all', playDelay: 0.3 },
        { say: 'We know they must, because the box does not sink into the floor or float up off it. So the net force is not upward, and not downward.', show: 't' },
      ],
    },
    {
      chapter: 'Step 3: Along the floor',
      layout: 'center',
      main: [free, { kind: 'text', id: 't', size: 'md', md: 'Only **friction** is left: the net force acts **from right to left**.' }],
      lines: [
        { say: 'Step three. Along the floor, only one force is left: friction, acting against the sliding. The box slides to the right, so friction points to the left.', show: 'sim', play: 'sim.along', playDelay: 0.3 },
        { say: 'So the net force acts from right to left. That is choice B.', show: ['sim.net', 't'] },
        { say: 'Watch what it does: the box slows down.', show: 'sim.velocity', play: 'sim.go' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [slide, { kind: 'text', id: 't', size: 'md', md: 'Moving **right**, net force **left**: the box **slows down** ✓' }],
      lines: [
        { say: 'Let us check with Newton\'s first law. The box slows down, so its motion changes, so there must be a net force.', show: ['sim', 'sim.velocity', 'sim.strobe'], play: 'sim.go', playDelay: 0.3 },
        { say: 'A net force in the direction of motion would speed the box up. To slow it down, the net force must point backwards, against the motion: from right to left. That is what we found.', show: 't' },
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
            ['Left to right', 'The **push** has stopped: no force **keeps** it going'],
            ['Upward', 'The normal force is **cancelled** by the weight'],
            ['Downward', 'The weight is **cancelled** by the normal force'],
            ['Right to left', 'Correct'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps hidden in the wrong choices.', show: 'traps' },
        { say: 'Left to right is the most tempting. It feels as if something must keep the box going. But the push has stopped, and an object needs no force to keep moving. The net force points the way the motion changes, not the way the box moves.' },
        { say: 'Upward and downward each pick one of the up and down forces. But they cancel each other, so neither is the net force.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A puck slides across smooth ice at a steady 3 m/s in a straight line. What is the net force on the puck?',
          choices: ['Zero', 'In the direction it moves', 'Opposite to its motion', 'Downward'],
          answer: 0,
          working: 'Its velocity does not change, so by Newton\'s first law the net force is zero.',
        },
      ],
      lines: [
        { say: 'Your turn. A puck slides across smooth ice at a steady three metres per second, in a straight line. What is the net force on the puck? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Its speed and direction never change, so by Newton\'s first law the net force is zero. That is choice A. It needs no force to keep moving.', show: 'q2.answer' },
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
          items: ['No net force: **no change** in motion', 'Slowing down needs a net force **against** the motion', 'Friction acts **against** sliding', 'No force is needed to **keep** something moving'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. With no net force, motion does not change.', show: 'sum.0' },
        { say: 'Slowing down needs a net force pointing against the motion.', show: 'sum.1' },
        { say: 'Friction acts against sliding.', show: 'sum.2' },
        { say: 'And no force is needed to keep something moving. For more on Newton\'s first law, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
