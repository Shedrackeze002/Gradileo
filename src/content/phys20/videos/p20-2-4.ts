import type { Explainer, RampEl } from '@/video/script.ts';

// Lesson 2.4: forces on an inclined plane. Every arrow is worked out from the mass, the tilt and
// the coefficients of friction (src/video/ramp.ts): the lesson's 8 kg block at 25° has 33.2 N of
// its weight along the ramp and 71.1 N into it; a ramp that tilts lets its block go at
// tan⁻¹(0.5) = 26.6°; and a block on a 30° ramp slides at 4.91 m/s² without friction and at
// 3.21 m/s² with a coefficient of kinetic friction of 0.2.

/** The lesson's block: 8 kg at rest on a 25° ramp, held by static friction. */
const rest: RampEl = {
  kind: 'ramp',
  id: 'ramp',
  angle: 25,
  length: 9,
  friction: [0.6, 0.4],
  bodies: [{ id: 'block', mass: 8, x: 5.4 }],
  label: 'At rest on a ramp',
  height: 470,
  pad: [150, 40],
  clips: {},
};

/** A ramp that tilts steadily from level. With a coefficient of static friction of 0.5, the block slips at 26.6°. */
const tip: RampEl = {
  kind: 'ramp',
  id: 'ramp',
  angle: 0,
  length: 9,
  friction: [0.5, 0.4],
  bodies: [{ id: 'block', mass: 8, x: 7.6 }],
  label: 'A ramp that tilts',
  height: 500,
  pad: [150, 40],
  poster: 'tip',
  clips: { tip: { phases: [{ dur: 8, tilt: 32 }, { dur: 0.8 }] } },
};

/** A 4 kg block let go on a 30° ramp: a = g sin θ = 4.91 m/s², or 3.21 m/s² with kinetic friction of 0.2. */
const slide = (label: string, dur: number, friction?: [number, number]): RampEl => ({
  kind: 'ramp',
  id: 'ramp',
  angle: 30,
  length: 10,
  friction,
  bodies: [{ id: 'block', mass: 4, x: 8.8 }],
  label,
  height: 500,
  pad: [150, 40],
  forceScale: 2.4,
  velocityScale: 14,
  clips: { go: { phases: [{ dur, slow: 2, note: 'Slow motion' }] } },
});

const video: Explainer = {
  id: 'p20-2-4',
  lessonId: 'p20-2-4',
  title: 'Forces on an Inclined Plane',
  thumbnailTitle: 'Forces on a Ramp',
  thumbnail: 'ramp',
  summary:
    'On a ramp, the weight splits into a part along the slope and a part into it. Watch the two parts change as a ramp tilts, see the block slip when static friction reaches its limit, and find the acceleration of a block that slides down, with friction and without it.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Dynamics', title: 'Forces on an Inclined Plane', subtitle: 'Splitting the weight on a ramp' }],
      lines: [
        { say: 'A ball on a gentle slope rolls away slowly. On a steep one, it races off. Gravity is the same on both.', show: 'title' },
        { say: 'What changes is how much of the weight points along the slope. This lesson shows how to find it.' },
      ],
    },
    {
      chapter: 'Splitting the weight',
      layout: 'center',
      main: [
        rest,
        {
          kind: 'math',
          id: 'parts',
          size: 'md',
          lines: ['\\hyp{mg\\sin\\theta = 78.5 \\sin 25^\\circ = 33.2\\ \\text{N}} \\qquad \\hyp{mg\\cos\\theta = 78.5 \\cos 25^\\circ = 71.1\\ \\text{N}}'],
        },
      ],
      lines: [
        { say: 'Here is a block of eight kilograms, at rest on a ramp tilted at twenty-five degrees. Its weight, m g, is 78.5 newtons, and it points straight down.', show: ['ramp', 'ramp.weight'] },
        { say: 'The block can only move along the surface. So we turn the axes: one along the ramp, and one at right angles to it. Then the weight splits into two parts.', show: 'ramp.components' },
        { say: 'The part along the ramp is m g sine theta: 33.2 newtons. This is the part that tries to slide the block down. The part into the ramp is m g cos theta: 71.1 newtons.', show: 'parts' },
        { say: 'The block does not sink into the ramp, so the normal force balances the part into it. The normal force is 71.1 newtons, which is less than the weight.', show: 'ramp.normal' },
        { say: 'And the block is not sliding, so something must balance the 33.2 newtons along the ramp. That is static friction, pointing up the slope.', show: 'ramp.friction', focus: 'ramp.block' },
      ],
    },
    {
      chapter: 'A steeper ramp',
      layout: 'center',
      main: [
        tip,
        { kind: 'math', id: 'slip', size: 'md', lines: ['mg\\sin\\theta = \\mu_s\\,mg\\cos\\theta \\quad\\Rightarrow\\quad \\tan\\theta = \\mu_s = 0.5 \\quad\\Rightarrow\\quad \\thc{\\theta = 26.6^\\circ}'] },
      ],
      lines: [
        {
          say: 'Now tilt a ramp slowly, and watch the arrows. The part of the weight along the ramp grows, and static friction grows to match it. Meanwhile, the normal force shrinks. And then the block slips.',
          show: ['ramp', 'ramp.weight', 'ramp.components', 'ramp.normal', 'ramp.friction'],
          play: 'ramp.tip',
          playDelay: 3,
        },
        { say: 'Static friction has a limit: the coefficient of static friction times the normal force. Here the coefficient is 0.5. The block slips when the part along the ramp passes that limit, and that happens when the tangent of the angle equals the coefficient: at 26.6 degrees.', show: 'slip' },
        { say: 'Notice that the mass cancelled. A heavy block and a light block, of the same material, slip at the same angle.', focus: 'ramp.block' },
      ],
    },
    {
      chapter: 'Sliding without friction',
      layout: 'center',
      main: [
        slide('A frictionless ramp', 1.3),
        { kind: 'math', id: 'free', size: 'md', lines: ['ma = mg\\sin\\theta \\quad\\Rightarrow\\quad a = g\\sin\\theta = 9.81 \\times \\sin 30^\\circ = \\good{4.91\\ \\text{m/s}^2}'] },
      ],
      lines: [
        { say: 'Now let a block go on a frictionless ramp, tilted at thirty degrees. The only force along the ramp is the part of the weight that points down it.', show: ['ramp', 'ramp.weight', 'ramp.components', 'ramp.normal', 'ramp.velocity', 'ramp.readout'], play: 'ramp.go', playDelay: 5.6 },
        { say: 'The net force is m g sine theta, so m "a" equals m g sine theta. The mass cancels, and "a" is g sine theta: 4.91 metres per second squared. That is half of g, because the sine of thirty degrees is one half.', show: 'free', focus: 'ramp.block' },
      ],
    },
    {
      chapter: 'Sliding with friction',
      layout: 'center',
      main: [
        slide('The same ramp, with friction', 1.5, [0.25, 0.2]),
        { kind: 'math', id: 'rough', size: 'md', lines: ['a = g(\\sin\\theta - \\mu_k\\cos\\theta) = 9.81 \\times (0.5 - 0.2 \\times 0.866) = \\good{3.21\\ \\text{m/s}^2}'] },
      ],
      lines: [
        { say: 'Here is the same ramp, with a coefficient of kinetic friction of 0.2. As the block slides down, friction points up the ramp, against the motion.', show: ['ramp', 'ramp.weight', 'ramp.components', 'ramp.normal', 'ramp.friction', 'ramp.velocity', 'ramp.readout'], play: 'ramp.go', playDelay: 5.4 },
        { say: 'Kinetic friction is the coefficient times the normal force. On a ramp, the normal force is m g cos theta, not m g. So the acceleration is g, times sine theta minus the coefficient times cos theta: 3.21 metres per second squared.', show: 'rough' },
        { say: 'The block still speeds up, but more slowly than before. And once again, the mass has cancelled.', focus: 'ramp.block' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A block slides down a frictionless ramp inclined at 20° to the horizontal. Use $g = 9.81\\ \\text{m/s}^2$. What is its acceleration?',
          choices: ['$9.22\\ \\text{m/s}^2$', '$9.81\\ \\text{m/s}^2$', '$3.36\\ \\text{m/s}^2$', '$3.57\\ \\text{m/s}^2$'],
          answer: 2,
          working: '$a = g\\sin\\theta = 9.81 \\times \\sin 20^\\circ = 3.36\\ \\text{m/s}^2$. (The cosine gives 9.22, which is the part of $g$ into the ramp.)',
        },
      ],
      lines: [
        { say: 'Your turn. A block slides down a frictionless ramp, inclined at twenty degrees to the horizontal. Use 9.81 metres per second squared for g. What is its acceleration? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'Without friction, the acceleration is g sine theta. 9.81 times the sine of twenty degrees is 3.36 metres per second squared. That is choice C. Take care to use the sine: it goes with the part along the ramp.', show: 'q.answer' },
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
          items: [
            'Along the ramp: $mg\\sin\\theta$. Into the ramp: $mg\\cos\\theta$',
            'The normal force is $mg\\cos\\theta$, **less than the weight**',
            'A block at rest slips when $\\tan\\theta$ passes $\\mu_s$',
            'Sliding down: $a = g\\sin\\theta$, or $a = g(\\sin\\theta - \\mu_k\\cos\\theta)$ with friction',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. On a ramp, the weight splits into m g sine theta along the ramp, and m g cos theta into it.', show: 'sum.0' },
        { say: 'The normal force equals the part into the ramp, so it is less than the weight.', show: 'sum.1' },
        { say: 'A block at rest slips when the tangent of the angle passes the coefficient of static friction.', show: 'sum.2' },
        { say: 'And a block that slides down has an acceleration of g sine theta, or less than that when there is friction.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
