import type { Explainer, MotionBody, MotionEl } from '@/video/script.ts';
import { collision } from '@/video/motion.ts';

// Exam question for Grade 12 lesson 1.4 (elastic and inelastic collisions): two hard steel carts
// collide head-on and ricochet. Cart 1 (0.350 kg) moves at 2 m/s and cart 2 (0.500 kg) at
// −0.500 m/s; afterwards cart 1 recoils at −0.94 m/s. What is cart 2's final velocity? The question
// is OpenStax Physics' own, word for word (the worked example "Calculating Final Velocity: Elastic
// Collision of Two Carts", section 8.3, CC BY 4.0, without its figure reference). The momentum
// before is 0.700 − 0.250 = 0.450 kg·m/s, so 0.500 v2′ = 0.450 + 0.329 and v2′ = 1.56 m/s. The
// kinetic energy, 0.762 J before and 0.761 J after, shows that the collision is elastic.
//
// The picture (src/video/motion.ts) is the head-on collision with no loss (restitution 1): it
// gives the book's −0.94 m/s for cart 1 and 1.56 m/s for cart 2, with the momentum bars and their
// total of 0.45 kg·m/s before and after.

const cart1: MotionBody = { id: 'one', shape: 'cart', mass: 0.35, x: 1.6, v: 2, label: 'Cart 1', tone: 'adj', width: 1.1 };
const cart2: MotionBody = { id: 'two', shape: 'cart', mass: 0.5, x: 6.4, v: -0.5, label: 'Cart 2', tone: 'opp', width: 1.1 };

const [approach, touch, away] = collision(cart1, cart2, { type: 'bounce', restitution: 1, after: 1.9, names: ['Force on cart 1', 'Force on cart 2'] });

const carts: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 10],
  height: 450,
  bodies: [cart1, cart2],
  momentumMax: 0.8,
  momentumMin: -0.4,
  forceScale: 24,
  velocityScale: 42,
  velocityDecimals: 2,
  momentumDecimals: 2,
  poster: 'crash',
  clips: {
    crash: { reset: true, phases: [approach, { ...touch, slow: 8, note: 'Slow motion' }, away] },
  },
};

const QUESTION =
  'Two hard, steel carts collide head-on and then ricochet off each other in opposite directions on a frictionless surface. Cart 1 has a mass of 0.350 kg and an initial velocity of 2 m/s. Cart 2 has a mass of 0.500 kg and an initial velocity of −0.500 m/s. After the collision, cart 1 recoils with a velocity of −0.94 m/s. What is the final velocity of cart 2?';

const video: Explainer = {
  id: 'xq-p30-1-4',
  lessonId: '',
  exam: {
    lesson: 'p30-1-4',
    source: 'OpenStax, Physics, Worked Example "Calculating Final Velocity: Elastic Collision of Two Carts", section 8.3',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/8-3-elastic-and-inelastic-collisions',
    question: QUESTION,
  },
  title: 'Exam Question: Two Steel Carts Collide Head-On. An Elastic Collision',
  thumbnailTitle: 'Two Carts Bounce Apart',
  thumbnail: 'sim',
  summary:
    'A real test question, solved one small step at a time: two steel carts collide head-on and bounce apart, and from cart 1\'s recoil we find cart 2\'s final velocity. We add up the momentum before, keeping the signs for direction, set it equal to the momentum after and solve. Then we check that kinetic energy is conserved too, so the collision is elastic, and look at the sign mistakes that catch people.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Two Carts Bounce Apart', subtitle: 'Elastic collisions, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about two steel carts that crash head-on and bounce apart. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          answer: '$1.56$ m/s',
          working: '$0.350(2) + 0.500(-0.500) = 0.350(-0.94) + 0.500\\,v_2\'$, so $0.450 = -0.329 + 0.500\\,v_2\'$ and $v_2\' = 1.56$ m/s.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Two hard, steel carts collide head-on and then ricochet off each other in opposite directions on a frictionless surface.' },
        { say: 'Cart 1 has a mass of 0.350 kilograms and an initial velocity of two metres per second. Cart 2 has a mass of 0.500 kilograms and an initial velocity of minus 0.500 metres per second.' },
        { say: 'After the collision, cart 1 recoils with a velocity of minus 0.94 metres per second. What is the final velocity of cart 2? If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [carts, { kind: 'text', id: 'plain', size: 'md', md: 'Cart 1 bounces back at $0.94$ m/s. How fast does **cart 2** go?' }],
      lines: [
        { say: 'Let us picture it. Cart 1 rolls to the right at two metres per second. Cart 2 rolls to the left at half a metre per second, so the minus sign means to the left. They meet head-on.', show: ['sim', 'sim.velocity'], play: 'sim.crash', playDelay: 0.5, wait: 3 },
        { say: 'They bounce apart. We are told that cart 1 comes back at 0.94 metres per second, to the left. The question asks for cart 2\'s velocity after the crash.', show: 'plain' },
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
          title: 'Momentum in a collision',
          md: 'On a frictionless surface, the **total momentum** is the same before and after: $m_1 v_1 + m_2 v_2 = m_1 v_1\' + m_2 v_2\'$. Velocity has a **sign**: to the right is $+$, to the left is $-$. In an **elastic** collision the total **kinetic energy**, $\\tfrac{1}{2}mv^2$, is kept too.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: '$2$ kg at $+3$ m/s and $1$ kg at $-2$ m/s: total $= 6 - 2 = 4$ kg·m/s.' },
      ],
      lines: [
        { say: 'Here is what we need. On a frictionless surface, the total momentum before the collision equals the total momentum after.', show: 'def' },
        { say: 'Velocity has a direction, so we give it a sign: plus for the right, minus for the left. And in an elastic collision, the total kinetic energy is kept as well.' },
        { say: 'For example, two kilograms at plus three and one kilogram at minus two have a total momentum of six minus two: four kilogram metres per second.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Total momentum **before**, with signs', 'Total momentum **after**, with $v_2\'$ unknown', 'Set them **equal** and solve', 'Check: is kinetic energy **kept**?'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, the total momentum before, keeping the signs.', show: 'plan.0' },
        { say: 'Second, the total momentum after, with cart 2\'s velocity unknown.', show: 'plan.1' },
        { say: 'Third, set them equal and solve.', show: 'plan.2' },
        { say: 'And finally, check the kinetic energy to see that the collision is elastic.', show: 'plan.3' },
      ],
    },
    {
      chapter: 'Step 1: Momentum before',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['m_1 v_1 = 0.350 \\times 2 = \\adj{0.700}', 'm_2 v_2 = 0.500 \\times (-0.500) = \\opp{-0.250}', 'p_{\\text{before}} = 0.700 - 0.250 = 0.450\\ \\text{kg·m/s}'] }],
      lines: [
        { say: 'Step one. Cart 1\'s momentum is 0.350 times two: 0.700 kilogram metres per second.', show: 'm.0' },
        { say: 'Cart 2\'s is 0.500 times minus 0.500: minus 0.250, because it moves to the left.', show: 'm.1' },
        { say: 'The total before is 0.700 minus 0.250: 0.450 kilogram metres per second.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: Momentum after',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['m_1 v_1\' = 0.350 \\times (-0.94) = \\adj{-0.329}', 'p_{\\text{after}} = -0.329 + 0.500\\,v_2\''] }],
      lines: [
        { say: 'Step two. After the collision, cart 1 moves at minus 0.94. Its momentum is 0.350 times minus 0.94: minus 0.329.', show: 'm.0' },
        { say: 'Cart 2\'s momentum is 0.500 times its unknown velocity. So the total after is minus 0.329 plus 0.500 v two prime.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Set equal and solve',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['-0.329 + 0.500\\,v_2\' = 0.450', '0.500\\,v_2\' = 0.450 + 0.329 = 0.779', 'v_2\' = \\dfrac{0.779}{0.500} = \\good{1.56\\ \\text{m/s}}'] }],
      lines: [
        { say: 'Step three. Momentum is conserved, so the total after equals the 0.450 we had before.', show: 'm.0' },
        { say: 'Add 0.329 to both sides: 0.500 v two prime is 0.779.', show: 'm.1' },
        { say: 'Divide by 0.500. Cart 2 moves off at 1.56 metres per second. It is positive, so cart 2 now moves to the right.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [carts, { kind: 'math', id: 'm', size: 'md', lines: ['p_{\\text{after}} = -0.329 + 0.500 \\times 1.56 = 0.451 \\approx 0.450\\ \\text{kg·m/s}\\ \\checkmark'] }],
      lines: [
        { say: 'Let us check it on the track. Here are the two carts with their momentum bars and the total.', show: ['sim', 'sim.velocity', 'sim.bars', 'sim.total'], play: 'sim.crash', playDelay: 0.4, wait: 3.4 },
        { say: 'The bars swap round in the collision, but the total stays at 0.45 the whole time. And cart 2 leaves at 1.56 metres per second, just what we found.', show: 'm.0' },
      ],
    },
    {
      chapter: 'Is it elastic?',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            'E_{\\text{before}} = \\tfrac{1}{2}(0.350)(2)^2 + \\tfrac{1}{2}(0.500)(0.500)^2 = 0.762\\ \\text{J}',
            'E_{\\text{after}} = \\tfrac{1}{2}(0.350)(0.94)^2 + \\tfrac{1}{2}(0.500)(1.56)^2 = 0.761\\ \\text{J}',
            '\\good{\\text{The same: the collision is elastic}}',
          ],
        },
      ],
      lines: [
        { say: 'Now the kinetic energy. Before the collision, the two carts have 0.762 joules between them.', show: 'm.0' },
        { say: 'After it, 0.761 joules. That is the same, apart from rounding.', show: 'm.1' },
        { say: 'Kinetic energy is kept, so this collision is elastic, just as we would expect from hard steel carts that ricochet.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Mistake', 'What you get'],
          rows: [
            ['Cart 2 starts at $+0.500$, not $-0.500$', '$v_2\' = 2.56$ m/s'],
            ['Cart 1 ends at $+0.94$, not $-0.94$', '$v_2\' = 0.24$ m/s'],
            ['Kept every sign', '$v_2\' = 1.56$ m/s, correct'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps in a question like this. Both of them are lost minus signs.', show: 'traps' },
        { say: 'Forget that cart 2 starts out moving left, and the total before becomes 0.950. Then you get 2.56 metres per second, which is far too fast.' },
        { say: 'Forget that cart 1 bounces back, and you get 0.24 metres per second. Check that one with the kinetic energy: it would leave the carts with much less energy than they had, and steel carts that ricochet do not lose that much.' },
        { say: 'In every collision question, draw an arrow for each velocity, and give the leftward ones a minus sign before you start.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A 1.0 kg cart at 4.0 m/s hits a 3.0 kg cart at rest. Afterwards the 1.0 kg cart moves at −2.0 m/s. What is the velocity of the 3.0 kg cart?',
          choices: ['2.0 m/s', '0.67 m/s', '1.3 m/s', '−2.0 m/s'],
          answer: 0,
          working: '$1.0(4.0) = 1.0(-2.0) + 3.0\\,v\'$, so $3.0\\,v\' = 6.0$ and $v\' = 2.0$ m/s.',
        },
      ],
      lines: [
        { say: 'Your turn. A 1.0 kilogram cart at 4.0 metres per second hits a 3.0 kilogram cart at rest. Afterwards the 1.0 kilogram cart moves at minus 2.0 metres per second. What is the velocity of the 3.0 kilogram cart? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The momentum before is four. After, it is minus two plus three v prime. So three v prime is six, and the 3.0 kilogram cart moves at 2.0 metres per second. That is choice A. 0.67 forgot the minus sign on the bounce, and 1.3 left the small cart out after the collision.', show: 'q2.answer' },
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
          items: ['Total momentum **before** = total **after**', 'Give every velocity a **sign**: right $+$, left $-$', 'Solve for the one unknown velocity', 'Elastic: the total **kinetic energy** is kept too'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. In a collision on a frictionless surface, the total momentum before equals the total after.', show: 'sum.0' },
        { say: 'Give every velocity a sign for its direction.', show: 'sum.1' },
        { say: 'Then solve for the one unknown velocity.', show: 'sum.2' },
        { say: 'And in an elastic collision, the total kinetic energy is kept as well, which makes a good check. For more on elastic and inelastic collisions, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
