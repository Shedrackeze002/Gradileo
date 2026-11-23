import type { Explainer } from '@/video/script.ts';

// Exam question for Math 31 lesson 8.1 (antiderivatives). Two consecutive exercises from OpenStax
// Calculus Volume 1 (section 4.10, Antiderivatives, CC BY-NC-SA 4.0), word for word as parts (a)
// and (b); the second begins "In the preceding problem," in the book. 40 mph = 176/3 ft/s;
// v(t) = 176/3 − 10t = 0 at t = 88/15 ≈ 5.867 s, as in the book's answer to (a). s(t) =
// (176/3)t − 5t², so s(88/15) ≈ 172.1 ft (the book prints no answer for (b)). Check: with constant
// deceleration the average speed is half of 176/3, and (88/3)(88/15) ≈ 172.1 ft too.

const QUESTION =
  'A car is being driven at a rate of 40 mph when the brakes are applied. The car decelerates at a constant rate of 10 ft/sec². (a) How long before the car stops? (b) In the preceding problem, calculate how far the car travels in the time it takes to stop.';

const video: Explainer = {
  id: 'xq-m31-8-1',
  lessonId: '',
  exam: {
    lesson: 'm31-8-1',
    source: 'OpenStax, Calculus Volume 1, Exercises in section 4.10, Antiderivatives',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/calculus-volume-1/pages/4-10-antiderivatives',
    question: QUESTION,
  },
  title: 'Exam Question: How Long and How Far to Stop a Car? (Antiderivatives)',
  thumbnailTitle: 'Brakes On: How Far to Stop?',
  thumbnail: 'm',
  summary:
    'A real test question, solved one small step at a time: a car going 40 mph brakes with a constant deceleration of 10 ft/s². (a) How long does it take to stop? (b) How far does it travel while stopping? We change 40 mph to 176/3 ≈ 58.67 ft/s. Antidifferentiating a(t) = −10 gives v(t) = 176/3 − 10t, which is 0 at t ≈ 5.867 s. Antidifferentiating again gives s(t) = (176/3)t − 5t², so the car travels about 172.1 ft. Then we check with the average speed and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Brakes On: How Far to Stop?', subtitle: 'Antiderivatives, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about antiderivatives. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Calculus textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'A car is being driven at a rate of 40 mph when the brakes are applied. The car decelerates at a constant rate of 10 ft/sec². (a) How long before the car stops? (b) In the preceding problem, calculate how far the car travels in the time it takes to stop.',
          answer: '(a) about $5.867$ s (b) about $172.1$ ft',
          working: '$v(t) = \\dfrac{176}{3} - 10t$, $s(t) = \\dfrac{176}{3}t - 5t^2$',
        },
      ],
      lines: [
        { say: 'Here is the question. The book asks it as two exercises, so we call them parts "a" and b.', show: 'q' },
        { say: 'A car is being driven at 40 miles per hour when the brakes are applied. It decelerates at a constant 10 feet per second squared. Part "a": how long before the car stops? Part b: how far does it travel while it stops?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'tab',
          head: ['We know', 'We want'],
          rows: [
            ['$a(t) = -10$ ft/s²', 'when $v(t) = 0$'],
            ['$v(0) = 40$ mph, $s(0) = 0$', '$s$ at that time'],
          ],
        },
      ],
      lines: [
        { say: 'Here is what it is asking. We know the acceleration: negative 10, because the car is slowing down. We know the starting speed, and we start measuring distance from 0.', show: 'tab' },
        { say: 'We want the time when the speed reaches 0, and the distance travelled by then. We have to go backwards, from acceleration to velocity to position.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['v(t) = \\int a(t)\\,dt, \\quad s(t) = \\int v(t)\\,dt', '\\int k\\,dt = kt + C, \\quad \\int t\\,dt = \\dfrac{t^2}{2} + C'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Find the constant', md: 'Each antiderivative has a $+C$. Use the **starting value** to find it.' },
      ],
      lines: [
        { say: 'Here is what we need. Velocity is an antiderivative of acceleration, and position is an antiderivative of velocity.', show: 'f.0' },
        { say: 'The antiderivative of a constant k is k t, and of t is t squared over 2. Each one has a plus C.', show: 'f.1' },
        { say: 'We find each C from a starting value.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Change $40$ mph to **ft/s**', 'Antidifferentiate $a$ to get $v$; solve $v = 0$', 'Antidifferentiate $v$ to get $s$; evaluate'] }],
      lines: [
        { say: 'Here is the plan. Change 40 miles per hour to feet per second, to match the acceleration.', show: 'plan.0' },
        { say: 'Antidifferentiate the acceleration to get the velocity, and solve v equals 0.', show: 'plan.1' },
        { say: 'Antidifferentiate again to get the position, and evaluate it.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Change the units',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['40 \\text{ mph} = \\dfrac{40 \\times 5{,}280 \\text{ ft}}{3{,}600 \\text{ s}}', '= \\good{\\dfrac{176}{3} \\approx 58.67 \\text{ ft/s}}'] }],
      lines: [
        { say: 'Step one. A mile is 5,280 feet, and an hour is 3,600 seconds. So 40 miles per hour is 40 times 5,280 feet, over 3,600 seconds.', show: 'm.0' },
        { say: 'That simplifies to 176 thirds, about 58.67 feet per second.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: The stopping time',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['v(t) = -10t + C, \\quad v(0) = \\dfrac{176}{3} \\implies C = \\dfrac{176}{3}', '\\dfrac{176}{3} - 10t = 0 \\implies t = \\dfrac{176}{30} = \\good{\\dfrac{88}{15} \\approx 5.867 \\text{ s}}'] }],
      lines: [
        { say: 'Step two, part "a". The antiderivative of negative 10 is negative 10t plus C. At time 0, the speed is 176 thirds, so C is 176 thirds.', show: 'm.0' },
        { say: 'The car stops when v is 0: 10t equals 176 thirds, so t is 176 over 30, which is 88 fifteenths, about 5.867 seconds.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: The stopping distance',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['s(t) = \\dfrac{176}{3}t - 5t^2 + D, \\quad s(0) = 0 \\implies D = 0', 's\\left(\\tfrac{88}{15}\\right) = \\dfrac{176}{3} \\cdot \\dfrac{88}{15} - 5\\left(\\dfrac{88}{15}\\right)^2 \\approx \\good{172.1 \\text{ ft}}'] }],
      lines: [
        { say: 'Step three, part b. Antidifferentiate the velocity: 176 thirds t, minus 10 times t squared over 2, which is 5 t squared, plus a new constant. Distance starts at 0, so the constant is 0.', show: 'm.0' },
        { say: 'Put in the stopping time, 88 fifteenths: about 344.2 minus 172.1, which is about 172.1 feet.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{average speed} = \\dfrac{58.67 + 0}{2} \\approx 29.33 \\text{ ft/s}', '29.33 \\times 5.867 \\approx 172.1 \\text{ ft} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. With a constant deceleration, the speed falls evenly from 58.67 to 0, so the average speed is half of 58.67: about 29.33 feet per second.', show: 'm.0' },
        { say: 'Over 5.867 seconds, that covers about 172.1 feet. The same answer. It checks out.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Trap', 'What goes wrong'],
          rows: [
            ['$40 - 10t = 0$, so $t = 4$', 'mph and ft/s² do not mix: **convert** first'],
            ['$a = +10$', 'slowing down: the acceleration is **negative**'],
            ['Forget the $+C$', '$v(0) = 58.67$ fixes $C$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Miles per hour and feet per second squared do not mix. Convert first, or the answer is wrong.' },
        { say: 'The car is slowing down, so the acceleration is negative 10.' },
        { say: 'And do not forget the plus C. The starting speed fixes it.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A ball is thrown straight up at $20$ m/s, with $a(t) = -10$ m/s². When does it reach the top?',
          choices: ['$20$ s', '$2$ s', '$0.5$ s', '$10$ s'],
          answer: 1,
          working: '$v(t) = 20 - 10t = 0$ at $t = 2$ s.',
        },
      ],
      lines: [
        { say: 'Your turn. A ball is thrown straight up at 20 metres per second, with an acceleration of negative 10 metres per second squared. When does it reach the top? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Antidifferentiate: v is 20 minus 10t. At the top, the ball stops for an instant, so v is 0, and t is 2 seconds. Choice B.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$a \\to v \\to s$: **antidifferentiate**', 'Every antiderivative has a $+C$', 'Use **starting values** to find each $C$', 'Make the **units** match first'] }],
      lines: [
        { say: 'Here is what to remember. To go from acceleration to velocity to position, antidifferentiate.', show: 'sum.0' },
        { say: 'Every antiderivative has a plus C.', show: 'sum.1' },
        { say: 'Use the starting values to find each C.', show: 'sum.2' },
        { say: 'And make the units match first. For more on antiderivatives, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
