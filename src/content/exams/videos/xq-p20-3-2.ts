import type { CircleEl, Explainer } from '@/video/script.ts';

// Exam question for lesson 3.2 (centripetal force): the centripetal force on a 1,600 kg car that
// rounds a 100 m curve at 12 m/s. The question is OpenStax Physics' own, word for word (Problems,
// section 6.2, CC BY 4.0). a = v² ÷ r = 144 ÷ 100 = 1.44 m/s², so F = ma = 1,600 × 1.44 = 2,304 N,
// about 2,300 N (choice c). 192 N forgets to square the speed, 1,111 N turns v² ÷ r upside down,
// and 13,333 N divides the radius by the speed.
//
// The picture (src/video/circle.ts) drives the car round the curve, seen from above, with the
// friction of the road on its tyres turning it.

const bend: CircleEl = {
  kind: 'circle',
  id: 'sim',
  bodies: [{ id: 'car', mass: 1600, label: '', r: 100, speed: 12, at: -150, shape: 'car', tone: 'opp' }],
  by: 'friction',
  span: 140,
  velocityScale: 6,
  accelScale: 50,
  forceScale: 0.035,
  height: 520,
  poster: 'drive',
  clips: {
    drive: { phases: [{ dur: 14, slow: 0.4 }] },
    part: { phases: [{ dur: 8, slow: 0.4 }] },
  },
};

const video: Explainer = {
  id: 'xq-p20-3-2',
  lessonId: '',
  exam: {
    lesson: 'p20-3-2',
    source: 'OpenStax, Physics, Problem for section 6.2, Uniform Circular Motion',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/6-2-uniform-circular-motion',
    question: 'What is the centripetal force exerted on a 1,600 kg car that rounds a 100 m radius curve at 12 m/s?',
    choices: ['192 N', '1,111 N', '2,300 N', '13,333 N'],
  },
  title: 'Exam Question: The Centripetal Force on a Car Rounding a Curve',
  thumbnailTitle: 'Car on a Curve',
  thumbnail: 'sim',
  summary:
    'A real test question, solved one small step at a time: a 1,600 kg car rounds a curve of radius 100 m at 12 m/s, and we find the centripetal force on it. We find the centripetal acceleration from the speed and the radius, multiply by the mass, and see that the road\'s friction supplies the force. Then we check the answer and look at the traps hidden in the wrong choices.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'A Car Rounds a Curve', subtitle: 'Centripetal force, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about a car going round a bend. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'What is the centripetal force exerted on a 1,600 kg car that rounds a 100 m radius curve at 12 m/s?',
          choices: ['192 N', '1,111 N', '2,300 N', '13,333 N'],
          answer: 2,
          working: '$a = \\dfrac{12^2}{100} = 1.44\\ \\text{m/s}^2$, so $F = 1600 \\times 1.44 = 2304 \\approx 2300$ N.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'What is the centripetal force exerted on a 1,600 kilogram car that rounds a 100 metre radius curve at twelve metres per second?' },
        { say: 'The choices are 192 newtons, 1,111 newtons, 2,300 newtons, and 13,333 newtons. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [bend, { kind: 'text', id: 'plain', size: 'lg', md: 'What **sideways push** keeps the car on the curve?' }],
      lines: [
        { say: 'Let us watch it from above. The car drives round a curve that is part of a circle a hundred metres in radius, at a steady twelve metres per second.', show: ['sim', 'sim.velocity'], play: 'sim.drive', playDelay: 0.5 },
        { say: 'Its speed never changes, but its direction does, all the time. Something must keep pushing it towards the centre of the circle.' },
        { say: 'The question asks: how big is that push, the centripetal force?', show: 'plain' },
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
          title: 'Centripetal acceleration and force',
          md: 'A body moving at speed $v$ round a circle of radius $r$ accelerates **towards the centre** with $a_c = v^2/r$. The net force that causes it is the **centripetal force**, $F_c = m a_c = mv^2/r$.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: '$v = 10$ m/s, $r = 50$ m: $a_c = 100 \\div 50 = 2$ m/s$^2$.' },
      ],
      lines: [
        { say: 'Here is what we need. Something going round a circle at a steady speed is still accelerating, because its direction keeps changing.', show: 'def' },
        { say: 'That acceleration points towards the centre, and its size is the speed squared, divided by the radius.' },
        { say: 'Newton\'s second law then gives the force that causes it: the mass times that acceleration. We call it the centripetal force.' },
        { say: 'For example, ten metres per second round a circle of fifty metres is an acceleration of a hundred divided by fifty: two metres per second squared.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Find the centripetal **acceleration**: $a_c = v^2 \\div r$', 'Multiply by the **mass**: $F_c = m a_c$', 'Match it to the **choices**'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, find the centripetal acceleration from the speed and the radius.', show: 'plan.0' },
        { say: 'Second, multiply by the mass to get the force.', show: 'plan.1' },
        { say: 'Third, match the answer to the choices.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The acceleration',
      layout: 'split',
      leftWidth: 760,
      left: [bend],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['a_c = \\dfrac{v^2}{r} = \\dfrac{12^2}{100}', '= \\dfrac{144}{100}', '= \\adj{1.44\\ \\text{m/s}^2}'] }],
      lines: [
        { say: 'Step one. The acceleration is the speed squared, divided by the radius: twelve squared, over a hundred.', show: ['sim', 'sim.velocity', 'sim.accel', 'm.0'], play: 'sim.part', playDelay: 0.3 },
        { say: 'Twelve squared is 144. Remember to square the speed.', show: 'm.1' },
        { say: '144 divided by a hundred is 1.44 metres per second squared, pointing towards the centre of the curve. That is the yellow arrow.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: The force',
      layout: 'split',
      leftWidth: 760,
      left: [bend],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['F_c = m a_c', '= 1600 \\times 1.44', '= \\opp{2304\\ \\text{N}}'] }],
      lines: [
        { say: 'Step two. The force is the mass times the acceleration.', show: ['sim', 'sim.velocity', 'sim.force', 'm.0'], play: 'sim.part', playDelay: 0.3 },
        { say: '1,600 times 1.44.', show: 'm.1' },
        { say: 'That is 2,304 newtons. On a flat road, it comes from the friction between the tyres and the road, pushing the car sideways, towards the centre.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: Match the choices',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['2304\\ \\text{N} \\approx \\good{2300\\ \\text{N}}'] }],
      lines: [
        { say: 'Step three. 2,304 newtons, rounded to two significant figures like the twelve metres per second, is 2,300 newtons.', show: 'm', focus: 'm' },
        { say: 'So the answer is 2,300 newtons. That is choice C.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{weight} = 1600 \\times 9.8 = 15\\,680\\ \\text{N}', '2304 \\div 15\\,680 \\approx 0.15\\ \\checkmark'] }],
      lines: [
        { say: 'Let us check the size. The car\'s weight is 1,600 times 9.8: about 15,700 newtons.', show: 'm.0' },
        { say: 'So the sideways push is only about a seventh of the car\'s weight. That is about right for a gentle curve at a modest speed, and well within what the friction of a dry road can give.', show: 'm.1' },
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
            ['192 N', '$1600 \\times 12 \\div 100$: forgot to **square** the speed'],
            ['1,111 N', '$1600 \\times 100 \\div 144$: $\\dfrac{r}{v^2}$ is **upside down**'],
            ['13,333 N', '$1600 \\times 100 \\div 12$: radius divided by speed'],
            ['2,300 N', 'Correct'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps in the wrong choices.', show: 'traps' },
        { say: '192 newtons comes from forgetting to square the speed.' },
        { say: '1,111 newtons turns the fraction upside down: the radius over the speed squared, instead of the speed squared over the radius.' },
        { say: 'And 13,333 newtons divides the radius by the speed. All three would come from mixing up the formula, so write it down before you put the numbers in.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A 900 kg car rounds a curve of radius 50 m at a steady 10 m/s. What centripetal force acts on it?',
          choices: ['180 N', '1,800 N', '450 N', '90,000 N'],
          answer: 1,
          working: '$a_c = \\dfrac{10^2}{50} = 2.0\\ \\text{m/s}^2$, so $F_c = 900 \\times 2.0 = 1800$ N.',
        },
      ],
      lines: [
        { say: 'Your turn. A 900 kilogram car rounds a curve of radius fifty metres at a steady ten metres per second. What centripetal force acts on it? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The acceleration is ten squared over fifty: two metres per second squared. Times 900 kilograms, that is 1,800 newtons. That is choice B.', show: 'q2.answer' },
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
          items: ['Centripetal acceleration: $a_c = \\dfrac{v^2}{r}$, towards the centre', 'Centripetal force: $F_c = m a_c = \\dfrac{mv^2}{r}$', '**Square** the speed', 'On a flat road, **friction** gives the force'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Round a circle, the acceleration is v squared over r, towards the centre.', show: 'sum.0' },
        { say: 'The centripetal force is the mass times that acceleration: m v squared over r.', show: 'sum.1' },
        { say: 'Always square the speed.', show: 'sum.2' },
        { say: 'And on a flat road, it is friction that turns the car. For more on centripetal force, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
