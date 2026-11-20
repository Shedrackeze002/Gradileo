import type { CircleEl, Explainer } from '@/video/script.ts';

// Exam question for lesson 3.1 (uniform circular motion): a mini CD, a regular CD and a vinyl
// record spin at the same angular velocity; whose edge moves fastest? The question is OpenStax
// Physics' own, word for word (Test Prep, section 6.1, CC BY 4.0). Spinning at the same rate means
// the same period, and the speed of the edge is v = 2πr ÷ T, so the largest radius wins: the vinyl
// record (choice c).
//
// The picture (src/video/circle.ts) puts a dot on the edge of each: radii of 4 cm, 6 cm and 15 cm
// (a mini CD is 8 cm across, a CD 12 cm and an LP 30 cm), all turning once every 1.8 s, which is
// an LP's 33⅓ turns a minute. Their speeds are 0.14, 0.21 and 0.52 m/s.

const T = 1.8;

const discs: CircleEl = {
  kind: 'circle',
  id: 'sim',
  bodies: [
    { id: 'mini', mass: 0.01, label: 'Mini CD', r: 0.04, period: T, at: 90, tone: 'adj' },
    { id: 'cd', mass: 0.01, label: 'CD', r: 0.06, period: T, at: 210, tone: 'opp' },
    { id: 'lp', mass: 0.01, label: 'Record', r: 0.15, period: T, at: 330, tone: 'theta' },
  ],
  span: 0.2,
  velocityScale: 260,
  height: 520,
  poster: 'turn',
  clips: {
    turn: { phases: [{ dur: T * 2 }] },
    once: { phases: [{ dur: T }] },
  },
};

const video: Explainer = {
  id: 'xq-p20-3-1',
  lessonId: '',
  exam: {
    lesson: 'p20-3-1',
    source: 'OpenStax, Physics, Test Prep for section 6.1, Angle of Rotation and Angular Velocity',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/6-1-angle-of-rotation-and-angular-velocity',
    question: 'If the following objects are spinning at the same angular velocities, the edge of which one would have the highest speed?',
    choices: ['Mini CD', 'Regular CD', 'Vinyl record'],
  },
  title: 'Exam Question: A CD and a Record Spin Together. Which Edge Moves Fastest?',
  thumbnailTitle: 'Which Edge Is Fastest?',
  thumbnail: 'sim',
  summary:
    'A real test question, solved one small step at a time: a mini CD, a regular CD and a vinyl record spin at the same angular velocity, and we find which edge moves fastest. We see that the same spin means the same period, work out how far each edge travels in one turn, and turn that into a speed with v = 2πr ÷ T. Then we check the answer and look at the traps hidden in the wrong choices.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Which Edge Is Fastest?', subtitle: 'Period, radius and speed, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about things that spin. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'If the following objects are spinning at the same angular velocities, the edge of which one would have the highest speed?',
          choices: ['Mini CD', 'Regular CD', 'Vinyl record'],
          answer: 2,
          working: 'The same spin means the same period $T$. $v = \\dfrac{2\\pi r}{T}$, so the largest radius gives the highest speed.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'If the following objects are spinning at the same angular velocities, the edge of which one would have the highest speed?' },
        { say: 'The choices are a mini CD, a regular CD, and a vinyl record. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [discs, { kind: 'text', id: 'plain', size: 'lg', md: 'All three turn at the **same rate**. Whose **edge** moves fastest?' }],
      lines: [
        { say: 'Let us picture it. Here is a dot on the edge of each one: a mini CD, a regular CD, and a big vinyl record.', show: 'sim', play: 'sim.turn', playDelay: 0.5 },
        { say: 'Same angular velocity just means they all turn at the same rate. Each one makes a full turn in the same time.' },
        { say: 'The question asks: which edge is moving fastest?', show: 'plain' },
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
          title: 'Speed round a circle',
          md: 'The **period** $T$ is the time for one turn. In one turn, a point on the edge travels one circumference, $2\\pi r$. So its speed is $v = \\dfrac{2\\pi r}{T}$.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: '$r = 1.5$ m, $T = 2.5$ s: $v = \\dfrac{2\\pi \\times 1.5}{2.5} = 3.77$ m/s.' },
      ],
      lines: [
        { say: 'Here is the idea we need. The period is the time for one full turn.' , show: 'def' },
        { say: 'In one turn, a point on the edge goes once round the circle, a distance of two pi r. So its speed is two pi r, divided by the period.' },
        { say: 'For example, a child 1.5 metres from the centre of a roundabout that turns once every 2.5 seconds moves at 3.77 metres per second.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Spot what is the **same**: the period $T$', 'Find how far each edge goes in **one turn**: $2\\pi r$', 'Turn each into a **speed**: $v = 2\\pi r \\div T$'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, spot what is the same for all three: the time for one turn.', show: 'plan.0' },
        { say: 'Second, find how far each edge travels in one turn.', show: 'plan.1' },
        { say: 'Third, turn those distances into speeds, and compare.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The same period',
      layout: 'split',
      leftWidth: 760,
      left: [discs],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{same spin}', '\\Rightarrow \\text{same } T', 'T = 1.8\\ \\text{s each}'] }],
      lines: [
        { say: 'Step one. All three spin at the same rate, so they all take the same time to go round once. Watch them: they finish each turn together.', show: ['sim', 'm.0', 'm.1'], play: 'sim.once', playDelay: 0.3 },
        { say: 'Let us give that a number, to make it real. A record player turns a record about thirty three times a minute, which is once every 1.8 seconds. So all three have a period of 1.8 seconds.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: One turn',
      layout: 'split',
      leftWidth: 760,
      left: [discs],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['2\\pi \\times 0.04 = 0.25\\ \\text{m}', '2\\pi \\times 0.06 = 0.38\\ \\text{m}', '2\\pi \\times 0.15 = 0.94\\ \\text{m}'] }],
      lines: [
        { say: 'Step two. How far does each edge travel in one turn? One circumference: two pi times the radius.', show: ['sim', 'sim.trail'], play: 'sim.once', playDelay: 0.3 },
        { say: 'A mini CD is eight centimetres across, so its radius is four centimetres. Its edge goes 0.25 metres each turn.', show: 'm.0' },
        { say: 'A regular CD is twelve centimetres across, a radius of six centimetres: 0.38 metres each turn.', show: 'm.1' },
        { say: 'A record is thirty centimetres across, a radius of fifteen centimetres: 0.94 metres each turn. The biggest circle is the longest trip.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: The speeds',
      layout: 'split',
      leftWidth: 760,
      left: [discs],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['v\\ \\text{in m/s}', '0.25 \\div 1.8 = 0.14', '0.38 \\div 1.8 = 0.21', '0.94 \\div 1.8 = \\good{0.52}'] }],
      lines: [
        { say: 'Step three. Each edge covers its trip in the same 1.8 seconds, so divide each distance by 1.8.', show: ['sim', 'sim.velocity', 'm.0'], play: 'sim.turn', playDelay: 0.3 },
        { say: 'The mini CD\'s edge moves at 0.14 metres per second, and the CD\'s at 0.21.', show: ['m.1', 'm.2'] },
        { say: 'The record\'s edge moves at 0.52 metres per second, the fastest by far. Look at the green arrows: the record\'s is the longest.', show: 'm.3', focus: 'm.3' },
        { say: 'So the answer is the vinyl record. That is choice C.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{15\\ \\text{cm}}{6\\ \\text{cm}} = 2.5', '0.21 \\times 2.5 = 0.52\\ \\text{m/s}\\ \\checkmark'] }],
      lines: [
        { say: 'Let us check it another way. With the same period, the speed goes up in step with the radius. The record\'s radius is 2.5 times the CD\'s.', show: 'm.0' },
        { say: 'So its edge should be 2.5 times as fast. 0.21 times 2.5 is 0.52. That matches.', show: 'm.1' },
        { say: 'Notice that we did not even need the 1.8 seconds to choose. Any period gives the same order, because the period is the same for all three.' },
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
            ['Mini CD', 'The **smallest** circle: the shortest trip each turn, so the **slowest** edge'],
            ['Regular CD', 'In between: a bigger circle than the mini CD, but smaller than the record'],
            ['"All the same"', 'Not a choice, but a common thought: the **same spin** is not the same **speed**'],
            ['Vinyl record', 'Correct'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'The mini CD has the smallest circle, so its edge has the shortest trip each turn. It is the slowest, not the fastest.' },
        { say: 'The regular CD sits in between.' },
        { say: 'And watch out for the idea that they must all move at the same speed because they spin together. They turn at the same rate, but the outer edges have further to go in the same time.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A roundabout turns once every 6.0 s. One child sits 1.0 m from the centre and another sits 3.0 m from the centre. How fast is the outer child moving?',
          choices: ['3.1 m/s', '1.0 m/s', '0.50 m/s', '19 m/s'],
          answer: 0,
          working: '$v = \\dfrac{2\\pi \\times 3.0}{6.0} = 3.1$ m/s, three times the inner child\'s 1.0 m/s.',
        },
      ],
      lines: [
        { say: 'Your turn. A roundabout turns once every 6.0 seconds. One child sits 1.0 metres from the centre, and another sits 3.0 metres from the centre. How fast is the outer child moving? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Two pi times three, divided by six, is 3.1 metres per second. That is three times as fast as the inner child, who moves at 1.0. That is choice A.', show: 'q2.answer' },
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
          items: ['Same spin means the same **period** $T$', 'Speed round a circle: $v = \\dfrac{2\\pi r}{T}$', 'Same $T$: the **larger** radius moves **faster**', 'Same rate of turning is not the same speed'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Things that spin at the same rate have the same period.', show: 'sum.0' },
        { say: 'The speed round a circle is two pi r, divided by the period.', show: 'sum.1' },
        { say: 'So with the same period, the larger the radius, the faster the edge moves.', show: 'sum.2' },
        { say: 'Turning together does not mean moving at the same speed. For more on circular motion, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
