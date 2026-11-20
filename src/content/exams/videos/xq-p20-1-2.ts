import type { Explainer, MotionEl } from '@/video/script.ts';
import { halt, run } from '@/content/phys10/videos/lib/track.ts';

// Exam question for lesson 1.2 (uniform motion): a bird flies 7.5 m/s east for 2.4 s, pauses, then
// flies 6.8 m/s east for 3.5 s. The question is OpenStax Physics' own, word for word (Practice
// Problem, section 2.2, CC BY 4.0). The two hops are 7.5 × 2.4 = 18 m and 6.8 × 3.5 = 23.8 m, both
// east, so the bird ends 41.8 m ≈ 42 m east of where it started (choice d). 6 m comes from taking
// one hop from the other, and the two "west" choices have the direction wrong.
//
// The picture (src/video/motion.ts) flies the bird along a track at the question's speeds, with a
// pause between the hops, and draws its displacement from the first branch.

const flight: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [-14, 46],
  height: 330,
  velocityScale: 14,
  lanes: [{ surface: 'smooth', label: 'East is positive' }],
  bodies: [{ id: 'bird', shape: 'ball', mass: 1, label: 'Bird', x: 0, tone: 'theta' }],
  poster: 'all',
  clips: {
    hop1: { phases: [run(2.4, { bird: 7.5 }), halt('bird')] },
    hop2: { phases: [run(3.5, { bird: 6.8 }), halt('bird')] },
    all: { phases: [run(2.4, { bird: 7.5 }), halt('bird'), { dur: 1.2 }, run(3.5, { bird: 6.8 }), halt('bird')] },
  },
};

const video: Explainer = {
  id: 'xq-p20-1-2',
  lessonId: '',
  exam: {
    lesson: 'p20-1-2',
    source: 'OpenStax, Physics, Practice Problem for section 2.2, Speed and Velocity',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/2-2-speed-and-velocity',
    question:
      'A bird flies with an average velocity of 7.5 m/s east from one branch to another in 2.4 s. It then pauses before flying with an average velocity of 6.8 m/s east for 3.5 s to another branch. What is the bird\'s total displacement from its starting point?',
    choices: ['42 m west', '6 m west', '6 m east', '42 m east'],
  },
  title: 'Exam Question: How Far Did the Bird Fly? Velocity and Displacement',
  thumbnailTitle: 'Bird\'s Displacement',
  thumbnail: 'sim',
  summary:
    'A real test question, solved one small step at a time: a bird flies at 7.5 m/s east for 2.4 s, pauses, then flies at 6.8 m/s east for 3.5 s, and we find its total displacement. We find the displacement of each hop from velocity times time, add the two, and give the direction. Then we check the answer and look at the traps hidden in the wrong choices.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'A Bird Hops Between Branches', subtitle: 'Velocity, time and displacement, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about a bird flying from branch to branch. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
            'A bird flies with an average velocity of 7.5 m/s east from one branch to another in 2.4 s. It then pauses before flying with an average velocity of 6.8 m/s east for 3.5 s to another branch. What is the bird\'s total displacement from its starting point?',
          choices: ['42 m west', '6 m west', '6 m east', '42 m east'],
          answer: 3,
          working: '$7.5 \\times 2.4 = 18\\ \\text{m}$ and $6.8 \\times 3.5 = 23.8\\ \\text{m}$, both east: $41.8 \\approx 42\\ \\text{m}$ east.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'A bird flies with an average velocity of 7.5 metres per second east, from one branch to another, in 2.4 seconds. It pauses, then flies with an average velocity of 6.8 metres per second east for 3.5 seconds, to another branch. What is its total displacement from where it started?' },
        { say: 'The choices are 42 metres west, 6 metres west, 6 metres east, and 42 metres east. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [flight, { kind: 'text', id: 'plain', size: 'lg', md: 'How far from the **first branch** does the bird end up, and **which way**?' }],
      lines: [
        { say: 'Let us watch it. The bird flies east to a branch, rests for a moment, then flies east again to another branch.', show: ['sim', 'sim.velocity'], play: 'sim.all', playDelay: 0.5 },
        { say: 'The question asks: how far is the last branch from the first one, and in which direction?', show: 'plain' },
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
          title: 'Velocity and displacement',
          md: 'Average velocity is displacement divided by time, $v = \\dfrac{\\Delta d}{\\Delta t}$. So the displacement is **velocity times time**: $\\Delta d = v\\,\\Delta t$, in the direction of the velocity.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: '$3\\ \\text{m/s}$ east for $4\\ \\text{s}$: $\\Delta d = 3 \\times 4 = 12\\ \\text{m}$ east.' },
      ],
      lines: [
        { say: 'Here is the idea we need. Average velocity is displacement divided by time.', show: 'def' },
        { say: 'Turn it round, and the displacement is the velocity times the time, in the same direction as the velocity.' },
        { say: 'For example, three metres per second east for four seconds is a displacement of twelve metres east.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Find the displacement of the **first** hop: $v \\times t$', 'Find the displacement of the **second** hop', '**Add** them, and give the **direction**'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, find how far the first hop takes the bird: velocity times time.', show: 'plan.0' },
        { say: 'Second, do the same for the second hop.', show: 'plan.1' },
        { say: 'Third, add them together, and say which way. The pause in the middle adds nothing: the bird is not moving.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The first hop',
      layout: 'split',
      leftWidth: 900,
      left: [{ ...flight, height: 300 }],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['7.5 \\times 2.4', '= \\adj{18\\ \\text{m east}}'] }],
      lines: [
        { say: 'Step one. The first hop is 7.5 metres per second, for 2.4 seconds. Pause and try it: 7.5 times 2.4.', show: ['sim', 'sim.velocity', 'sim.clock', 'm.0'], play: 'sim.hop1', playDelay: 0.3, wait: 2 },
        { say: 'It is eighteen metres, east.', show: ['m.1', 'sim.displacement'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: The second hop',
      layout: 'split',
      leftWidth: 900,
      left: [{ ...flight, height: 300 }],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['6.8 \\times 3.5', '= \\opp{23.8\\ \\text{m east}}'] }],
      lines: [
        { say: 'Step two. After the pause, the bird flies at 6.8 metres per second for 3.5 seconds.', show: ['sim', 'sim.velocity', 'm.0'], play: 'sim.all', playDelay: 0.3 },
        { say: '6.8 times 3.5 is 23.8 metres, also east.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Add them',
      layout: 'split',
      leftWidth: 900,
      left: [{ ...flight, height: 300 }],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['18 + 23.8', '= 41.8\\ \\text{m}', '\\approx \\good{42\\ \\text{m east}}'] }],
      lines: [
        { say: 'Step three. Both hops point east, so they add: eighteen plus 23.8.', show: ['sim', 'sim.displacement', 'm.0'], play: 'sim.all', playDelay: 0.3 },
        { say: 'That is 41.8 metres. Rounded to two figures, like the numbers in the question, it is forty two metres, east.', show: ['m.1', 'm.2'], focus: 'm.2' },
        { say: 'So the answer is forty two metres east. That is choice D.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{about } 7\\ \\text{m/s} \\times 6\\ \\text{s of flying} \\approx 42\\ \\text{m}\\ \\checkmark'] }],
      lines: [
        { say: 'Let us check the size. The bird flies at about seven metres per second, for about six seconds in all. Seven times six is forty two metres. That matches.', show: 'm' },
        { say: 'And it always flies east, so the displacement must be east as well.' },
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
            ['42 m west', 'Right size, **wrong direction**: it always flew east'],
            ['6 m east', '$23.8 - 18$: takes one hop **away** from the other'],
            ['6 m west', 'Takes them away, **and** the wrong direction'],
            ['42 m east', 'Correct'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps in the wrong choices.', show: 'traps' },
        { say: 'Forty two metres west has the right size, but the wrong direction. A displacement needs both.' },
        { say: 'Six metres comes from taking one hop away from the other. You only take away a displacement when it points the opposite way. Here, both hops point east.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A cyclist rides at 5.0 m/s north for 12 s, stops at a crossing, then rides at 4.0 m/s north for 15 s. What is her total displacement?',
          choices: ['120 m south', '120 m north', '0 m', '9.0 m north'],
          answer: 1,
          working: '$5.0 \\times 12 = 60\\ \\text{m}$ and $4.0 \\times 15 = 60\\ \\text{m}$, both north: $120\\ \\text{m}$ north.',
        },
      ],
      lines: [
        { say: 'Your turn. A cyclist rides at 5.0 metres per second north for twelve seconds, stops at a crossing, then rides at 4.0 metres per second north for fifteen seconds. What is her total displacement? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Five times twelve is sixty metres. Four times fifteen is another sixty metres. Both are north, so she ends up a hundred and twenty metres north. That is choice B.', show: 'q2.answer' },
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
          items: ['Displacement $=$ velocity $\\times$ time', 'Hops the **same way** add; opposite ways take away', 'A pause adds **nothing**', 'Give the **direction** as well as the size'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Displacement is velocity times time.', show: 'sum.0' },
        { say: 'Displacements in the same direction add. Only one that points the opposite way is taken away.', show: 'sum.1' },
        { say: 'A pause adds nothing to the displacement.', show: 'sum.2' },
        { say: 'And always give the direction as well as the size. For more on uniform motion, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
