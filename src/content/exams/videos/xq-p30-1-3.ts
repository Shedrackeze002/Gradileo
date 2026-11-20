import type { Explainer, MotionBody, MotionEl } from '@/video/script.ts';
import { collision } from '@/video/motion.ts';

// Exam question for Grade 12 lesson 1.3 (conservation of momentum): the recoil velocity of a 65 kg
// ice hockey goalie at rest who catches a 0.15 kg puck slapped at 50 m/s. The question is
// OpenStax Physics' own, word for word (a Problem for section 8.3, CC BY 4.0), with its four
// choices. The total momentum before is 0.15 × 50 = 7.5 kg·m/s, and afterwards the goalie and
// puck move together: v′ = 7.5 ÷ 65.15 = 0.115 ≈ 0.12 m/s (choice c), in the puck's direction.
// 7.5 m/s is the momentum itself, −0.12 m/s has the wrong direction, and 0 m/s loses the momentum.
//
// The picture (src/video/motion.ts) is the catch: the puck flies in (slowed down), the two push on
// each other while they touch, and they slide off together, with the momentum bars showing the
// puck's 7.5 kg·m/s passing to the pair.

const puck: MotionBody = { id: 'puck', shape: 'ball', mass: 0.15, x: 1, v: 50, label: 'Puck', tone: 'opp', width: 0.7 };
const goalie: MotionBody = { id: 'goalie', shape: 'block', mass: 65, x: 7.4, v: 0, label: 'Goalie', tone: 'adj', width: 1.3 };

const [approach, touch, away] = collision(puck, goalie, { type: 'stick', after: 3, squeeze: 0.02, hidden: true });

const ice: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 10],
  height: 440,
  bodies: [puck, goalie],
  momentumMax: 8,
  velocityScale: 2.4,
  velocityDecimals: 2,
  poster: 'catch',
  clips: {
    catch: { reset: true, phases: [{ ...approach, slow: 10, note: 'Slow motion' }, { ...touch, slow: 10, note: 'Slow motion' }, away] },
  },
};

const QUESTION =
  'Find the recoil velocity of a 65 kg ice hockey goalie who catches a 0.15 kg hockey puck slapped at him at a velocity of 50 m/s. Assume that the goalie is at rest before catching the puck, and friction between the ice and the puck-goalie system is negligible.';
const CHOICES = ['−0.12 m/s', '0 m/s', '0.12 m/s', '7.5 m/s'];

const video: Explainer = {
  id: 'xq-p30-1-3',
  lessonId: '',
  exam: {
    lesson: 'p30-1-3',
    source: 'OpenStax, Physics, Problem for section 8.3, Elastic and Inelastic Collisions',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/8-3-elastic-and-inelastic-collisions',
    question: QUESTION,
    choices: CHOICES,
  },
  title: 'Exam Question: A Goalie Catches a Puck. Conservation of Momentum',
  thumbnailTitle: 'The Goalie and the Puck',
  thumbnail: 'sim',
  summary:
    'A real test question, solved one small step at a time: a 65 kg goalie at rest catches a 0.15 kg puck slapped at 50 m/s, and we find how fast the goalie recoils. We add up the momentum before the catch, share it out over the goalie and puck together, and divide. Then we watch the momentum pass from the puck to the goalie and look at the traps hidden in the wrong choices.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'The Goalie and the Puck', subtitle: 'Conservation of momentum, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about an ice hockey goalie who catches a puck. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          choices: ['$-0.12$ m/s', '$0$ m/s', '$0.12$ m/s', '$7.5$ m/s'],
          answer: 2,
          working: 'Before: $0.15 \\times 50 = 7.5$ kg·m/s. After: $(65 + 0.15)\\,v\' = 7.5$, so $v\' = \\dfrac{7.5}{65.15} \\approx 0.12$ m/s.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Find the recoil velocity of a 65 kilogram ice hockey goalie who catches a 0.15 kilogram hockey puck slapped at him at a velocity of fifty metres per second.' },
        { say: 'Assume that the goalie is at rest before catching the puck, and friction between the ice and the puck-goalie system is negligible.' },
        { say: 'The choices are minus 0.12 metres per second, zero, 0.12 metres per second, and 7.5 metres per second. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [ice, { kind: 'text', id: 'plain', size: 'md', md: 'After the catch, how fast does the goalie **slide back**?' }],
      lines: [
        { say: 'Let us picture it. The goalie stands still on the ice. The puck flies in at fifty metres per second, slowed down here so that we can follow it. The goalie catches it, and the two slide off together.', show: ['sim', 'sim.velocity'], play: 'sim.catch', playDelay: 0.5, wait: 2 },
        { say: 'Recoil means the goalie is pushed back by the catch, in the direction the puck was going. The question asks: how fast?', show: 'plain' },
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
          title: 'Conservation of momentum',
          md: 'When no outside force acts, the **total momentum** before a collision equals the total momentum **after**. If the two objects **stick together**, they share one velocity: $m_1 v_1 + m_2 v_2 = (m_1 + m_2)\\,v\'$.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: '$1$ kg at $6$ m/s sticks to $2$ kg at rest: $v\' = \\dfrac{1 \\times 6}{1 + 2} = 2$ m/s.' },
      ],
      lines: [
        { say: 'Here is what we need. When no outside force acts, the total momentum before a collision is the same as the total momentum after it. Here the ice has negligible friction, so no outside force pushes along the ice.', show: 'def' },
        { say: 'When the two objects stick together, they move off with one shared velocity. So the total momentum after is their total mass times that velocity.' },
        { say: 'For example, one kilogram at six metres per second sticks to two kilograms at rest. The total momentum is six, shared over three kilograms: two metres per second.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Add up the momentum **before** the catch', 'Write the momentum **after**: both move together', 'Set them **equal** and solve for $v\'$'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, add up the momentum before the catch.', show: 'plan.0' },
        { say: 'Second, write the momentum after the catch, with the goalie and puck moving together.', show: 'plan.1' },
        { say: 'Third, set the two equal and solve for the recoil velocity.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Momentum before',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['p_{\\text{puck}} = 0.15\\ \\text{kg} \\times 50\\ \\text{m/s} = \\opp{7.5\\ \\text{kg·m/s}}', 'p_{\\text{goalie}} = 65 \\times 0 = 0', 'p_{\\text{before}} = \\adj{7.5\\ \\text{kg·m/s}}'] }],
      lines: [
        { say: 'Step one. Take the direction the puck flies as positive. The puck\'s momentum is 0.15 times fifty: 7.5 kilogram metres per second.', show: 'm.0' },
        { say: 'The goalie is at rest, so the goalie has no momentum.', show: 'm.1' },
        { say: 'The total before the catch is 7.5 kilogram metres per second.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: Momentum after',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['p_{\\text{after}} = (m_{\\text{goalie}} + m_{\\text{puck}})\\,v\'', '= (65 + 0.15)\\,v\' = 65.15\\,v\''] }],
      lines: [
        { say: 'Step two. After the catch, the puck is in the goalie\'s glove, so they move together with one velocity, v prime.', show: 'm.0' },
        { say: 'Their total mass is 65 plus 0.15: 65.15 kilograms. So the momentum after is 65.15 times v prime.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Set equal and solve',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['65.15\\,v\' = 7.5', 'v\' = \\dfrac{7.5}{65.15} = 0.115\\ \\text{m/s}', '\\approx \\good{0.12\\ \\text{m/s}}'] }],
      lines: [
        { say: 'Step three. Momentum is conserved, so the momentum after equals the 7.5 we had before.', show: 'm.0' },
        { say: 'Divide both sides by 65.15. The recoil velocity is 0.115 metres per second.', show: 'm.1' },
        { say: 'About 0.12 metres per second, in the direction the puck was going. That is choice C.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [ice, { kind: 'math', id: 'm', size: 'md', lines: ['65.15 \\times 0.115 = 7.5\\ \\text{kg·m/s}\\ \\checkmark'] }],
      lines: [
        { say: 'Let us check it with the momentum bars. Before the catch, all 7.5 kilogram metres per second belong to the puck. Watch where it goes.', show: ['sim', 'sim.velocity', 'sim.bars', 'sim.total'], play: 'sim.catch', playDelay: 0.4, wait: 2.5 },
        { say: 'After the catch, the goalie and puck carry the same 7.5 between them, and they slide at 0.12 metres per second. 65.15 times 0.115 gives back the 7.5 we started with.', show: 'm.0' },
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
            ['$7.5$ m/s', 'The **momentum**, $0.15 \\times 50$, never divided by the mass'],
            ['$-0.12$ m/s', 'The right size, but the **wrong direction**'],
            ['$0$ m/s', 'As if the momentum could **vanish**'],
            ['$0.12$ m/s', 'Correct'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps hidden in the wrong choices.', show: 'traps' },
        { say: '7.5 is the puck\'s momentum, in kilogram metres per second. It is not a velocity until we divide it by the mass that carries it.' },
        { say: 'Minus 0.12 has the right size but the wrong direction. The goalie is pushed the way the puck was flying, and we called that direction positive.' },
        { say: 'And zero would mean the heavy goalie does not move at all. But the puck\'s momentum cannot just disappear. It is shared, so the goalie must slide back, even if only slowly.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A 3.0 kg cart moving at 4.0 m/s runs into a 5.0 kg cart at rest, and they stick together. How fast do they move off?',
          choices: ['4.0 m/s', '2.4 m/s', '12 m/s', '1.5 m/s'],
          answer: 3,
          working: 'Before: $3.0 \\times 4.0 = 12$ kg·m/s. After: $(3.0 + 5.0)\\,v\' = 12$, so $v\' = 1.5$ m/s.',
        },
      ],
      lines: [
        { say: 'Your turn. A 3.0 kilogram cart moving at 4.0 metres per second runs into a 5.0 kilogram cart at rest, and they stick together. How fast do they move off? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The momentum before is three times four: twelve. Afterwards it is shared over eight kilograms, so they move off at 1.5 metres per second. That is choice D. 2.4 divided by the resting cart\'s mass only, and twelve is the momentum, not a velocity.', show: 'q2.answer' },
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
          items: ['No outside force: total momentum **before** = **after**', 'Stuck together: $m_1 v_1 + m_2 v_2 = (m_1 + m_2)\\,v\'$', 'Divide the momentum by the **total** mass', 'Keep the **direction**: the recoil follows the puck'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. With no outside force, the total momentum before a collision equals the total after.', show: 'sum.0' },
        { say: 'When two objects stick together, they share one velocity.', show: 'sum.1' },
        { say: 'So divide the total momentum by the total mass.', show: 'sum.2' },
        { say: 'And keep track of the direction. For more on conservation of momentum, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
