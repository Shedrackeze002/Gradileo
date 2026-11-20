import type { Explainer, MotionEl } from '@/video/script.ts';

// Exam question for Grade 12 lesson 1.1 (momentum): the momentum of a 110 kg football player
// running at 8 m/s, compared with a 0.410 kg football thrown at 25 m/s. The question is OpenStax
// Physics' own, word for word (the worked example "Calculating Momentum: A Football Player and a
// Football", section 8.1, CC BY 4.0), with the four choices of its OpenStax exercise. p = mv =
// 110 × 8 = 880 kg·m/s, the ball has 0.410 × 25 = 10.25 kg·m/s, and 880 ÷ 10.25 ≈ 86 (choice d).
// 13.75 divides the mass by the speed, and m/s is the unit of a velocity, not a momentum.
//
// The picture (src/video/motion.ts) runs the player and the ball side by side at their speeds,
// with a momentum bar for each measured from the motion.

const pair: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 60],
  height: 530,
  lanes: [{ label: 'Football player, 110 kg' }, { label: 'Football, 0.410 kg' }],
  bodies: [
    { id: 'player', shape: 'block', mass: 110, label: '110 kg', x: 3, v: 8, width: 3.2, tone: 'adj', lane: 0 },
    { id: 'ball', shape: 'ball', mass: 0.41, label: '', x: 3, v: 25, width: 1.2, tone: 'opp', lane: 1 },
  ],
  momentumMax: 900,
  velocityScale: 0.9,
  poster: 'run',
  clips: {
    run: { reset: true, phases: [{ dur: 1.8 }] },
  },
};

const QUESTION =
  '(a) Calculate the momentum of a 110 kg football player running at 8 m/s. (b) Compare the player’s momentum with the momentum of a 0.410 kg football thrown hard at a speed of 25 m/s.';
const CHOICES = [
  '13.75 m/s; the momentum of the player is about 838 times greater than the momentum of the football.',
  '13.75 kg⋅m/s; the momentum of the player is about 838 times greater than the momentum of the football.',
  '880 m/s; the momentum of the player is about 86 times greater than the momentum of the football.',
  '880 kg⋅m/s; the momentum of the player is about 86 times greater than the momentum of the football.',
];

const video: Explainer = {
  id: 'xq-p30-1-1',
  lessonId: '',
  exam: {
    lesson: 'p30-1-1',
    source: 'OpenStax, Physics, Worked Example "Calculating Momentum: A Football Player and a Football", section 8.1',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/8-1-linear-momentum-force-and-impulse',
    question: QUESTION,
    choices: CHOICES,
  },
  title: 'Exam Question: A Football Player and a Football. Momentum p = mv',
  thumbnailTitle: 'Player and Ball',
  thumbnail: 'sim',
  summary:
    'A real test question, solved one small step at a time: we find the momentum of a 110 kg football player running at 8 m/s, and compare it with the momentum of a 0.410 kg football thrown at 25 m/s. We use p = mv for each, divide one by the other, and watch the two momentum bars side by side. Then we look at the traps hidden in the wrong choices, from a flipped division to the wrong unit.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Player and Ball', subtitle: 'Momentum, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the momentum of a football player and a football. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          choices: [
            '$13.75$ **m/s**; about $838$ times greater',
            '$13.75$ **kg·m/s**; about $838$ times greater',
            '$880$ **m/s**; about $86$ times greater',
            '$880$ **kg·m/s**; about $86$ times greater',
          ],
          answer: 3,
          working: '$p = mv = 110 \\times 8 = 880$ kg·m/s. The ball: $0.410 \\times 25 = 10.25$ kg·m/s, and $880 \\div 10.25 \\approx 86$.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Part A. Calculate the momentum of a 110 kilogram football player running at eight metres per second. Part B. Compare the player\'s momentum with the momentum of a 0.410 kilogram football thrown hard at a speed of 25 metres per second.' },
        { say: 'Each choice gives the player\'s momentum and how many times greater it is than the ball\'s: 13.75 metres per second or kilogram metres per second, about 838 times, or 880 metres per second or kilogram metres per second, about 86 times. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [pair, { kind: 'text', id: 'plain', size: 'md', md: 'Heavy player or fast ball: which has more **momentum**?' }],
      lines: [
        { say: 'Let us picture it. On the top track, the player runs at eight metres per second. On the bottom track, the ball flies at 25 metres per second, more than three times as fast.', show: ['sim', 'sim.velocity'], play: 'sim.run', playDelay: 0.5 },
        { say: 'The ball is much faster, but the player is much heavier. The question asks how much momentum the player has, and how it compares with the ball\'s.', show: 'plain' },
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
          title: 'Momentum',
          md: '**Momentum** is mass times velocity: $p = mv$. It is a vector, pointing the way the object moves. With $m$ in kg and $v$ in m/s, $p$ is in **kilogram metres per second (kg·m/s)**. It measures how hard a moving object is to stop.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: 'A $2$ kg cart at $3$ m/s: $p = 2 \\times 3 = 6$ kg·m/s.' },
      ],
      lines: [
        { say: 'Here is what we need. Momentum is mass times velocity. It points the same way as the velocity.', show: 'def' },
        { say: 'Its unit is the kilogram times the metre per second: kilogram metres per second. It measures how hard a moving object is to stop.' },
        { say: 'For example, a two kilogram cart at three metres per second has a momentum of six kilogram metres per second.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Part A: the player’s momentum, $p = mv$', 'The ball’s momentum, the same way', 'Part B: **divide** to compare'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, the player\'s momentum: mass times velocity.', show: 'plan.0' },
        { say: 'Second, the ball\'s momentum, the same way.', show: 'plan.1' },
        { say: 'Third, divide one by the other to see how many times greater the player\'s is.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The player',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['p_{\\text{player}} = mv = 110\\ \\text{kg} \\times 8\\ \\text{m/s}', '= \\adj{880\\ \\text{kg·m/s}}'] }],
      lines: [
        { say: 'Step one. The player\'s momentum is the mass times the velocity: 110 kilograms times eight metres per second.', show: 'm.0' },
        { say: '880 kilogram metres per second. That is part A.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: The ball',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['p_{\\text{ball}} = mv = 0.410\\ \\text{kg} \\times 25\\ \\text{m/s}', '= \\opp{10.25\\ \\text{kg·m/s}}'] }],
      lines: [
        { say: 'Step two. The ball\'s momentum: 0.410 kilograms times 25 metres per second.', show: 'm.0' },
        { say: '10.25 kilogram metres per second. Fast, but very light.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Compare',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{p_{\\text{player}}}{p_{\\text{ball}}} = \\dfrac{880}{10.25}', '\\approx \\good{86}'] }],
      lines: [
        { say: 'Step three. How many times greater is the player\'s momentum? Divide 880 by 10.25.', show: 'm.0' },
        { say: 'About 86. So the player has 880 kilogram metres per second, about 86 times the ball\'s momentum. That is choice D.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [pair, { kind: 'text', id: 't', size: 'md', md: 'The player’s bar is about **86 times** as long as the ball’s.' }],
      lines: [
        { say: 'Let us check it on the picture. Here are the two momentum bars, measured from the motion.', show: ['sim', 'sim.velocity', 'sim.bars'], play: 'sim.run', playDelay: 0.3 },
        { say: 'The player\'s bar reaches 880. The ball\'s bar is barely there, at about ten. Even though the ball is three times faster, the player is 268 times heavier, so the player\'s momentum wins easily.', show: 't' },
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
            ['$13.75$, $838$ times', '$110 \\div 8$: **divided** mass by speed'],
            ['$880$ **m/s**', 'Right number, but m/s is a **velocity** unit'],
            ['$13.75$ **m/s**', 'Both mistakes'],
            ['$880$ **kg·m/s**, $86$ times', 'Correct'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps hidden in the wrong choices.', show: 'traps' },
        { say: '13.75 is 110 divided by eight. Momentum is mass times velocity, not mass divided by velocity.' },
        { say: 'Choice C has the right number, 880, but the wrong unit. Metres per second is the unit of a velocity. Momentum is in kilogram metres per second, because it is a mass times a velocity.' },
        { say: 'Units are worth checking every time. They often decide between two choices with the same number.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A 0.15 kg baseball travels at 40 m/s. A 1500 kg car rolls at 0.5 m/s. Which has more momentum?',
          choices: ['The baseball', 'The car', 'They are equal', 'Neither has any momentum'],
          answer: 1,
          working: 'Baseball: $0.15 \\times 40 = 6$ kg·m/s. Car: $1500 \\times 0.5 = 750$ kg·m/s, far more.',
        },
      ],
      lines: [
        { say: 'Your turn. A 0.15 kilogram baseball travels at forty metres per second. A 1,500 kilogram car rolls at 0.5 metres per second. Which has more momentum? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The baseball has 0.15 times forty: six kilogram metres per second. The slow car has 1,500 times 0.5: 750. The car has far more. That is choice B.', show: 'q2.answer' },
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
          items: ['Momentum: $p = mv$', 'Unit: **kg·m/s**, not m/s', 'A heavy, slow object can have **more** momentum than a light, fast one', 'To compare, **divide** one momentum by the other'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Momentum is mass times velocity.', show: 'sum.0' },
        { say: 'Its unit is the kilogram metre per second.', show: 'sum.1' },
        { say: 'A heavy, slow object can have far more momentum than a light, fast one.', show: 'sum.2' },
        { say: 'And to compare two momenta, divide one by the other. For more on momentum, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
