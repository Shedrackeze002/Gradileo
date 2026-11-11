import type { Explainer } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';
import { figure } from '@/video/solids.ts';
import { block, force } from './lib/mx-mechanics.ts';

/** A triangular support with its tip at (x, 0). */
const support = (name: string, x: number): Part => ({
  points: { [`${name}-t`]: [x, 0], [`${name}-l`]: [x - 0.25, -0.45], [`${name}-r`]: [x + 0.25, -0.45] },
  items: [{ kind: 'region', id: name, points: [`${name}-t`, `${name}-l`, `${name}-r`], tone: 'muted', shade: 0.6 }],
});

const video: Explainer = {
  id: 'mx-13-6',
  lessonId: 'mx-13-6',
  title: 'Moments',
  thumbnail: 'bm',
  summary: 'The moment of a force about a point is the force times the perpendicular distance to its line of action, in N m, clockwise or anticlockwise. A 40 N force on a spanner 0.25 m from the nut has a moment of 10 N m. A beam in equilibrium has no resultant force and no resultant moment: for a 4 m, 20 kg beam on supports at its ends with 30 kg 1 m from A, R_B = 171.5 N and R_A = 318.5 N.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Mechanics: Forces at Angles, Projectiles and Moments', title: 'Moments', subtitle: 'The turning effect of a force' }],
      lines: [
        { say: 'A door opens easily when you push the handle, and hardly at all when you push near the hinge. The same force has a bigger turning effect the further it acts from the pivot.', show: 'title' },
        { say: 'That turning effect is the moment of the force. In this video, you will calculate moments, and use them to find the forces holding up a beam.' },
      ],
    },
    {
      chapter: 'The moment of a force',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Moment', md: 'The turning effect of a force about a point: $\\text{moment} = F \\times d$, where $d$ is the **perpendicular** distance from the point to the line of the force. Measured in N m, clockwise or anticlockwise.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['40 \\times 0.25 = 10\\text{ N m}', '\\text{At } \\theta \\text{ to a rod of length } L: \\ FL\\sin\\theta'] },
      ],
      lines: [
        { say: 'The moment of a force about a point is the force times the perpendicular distance from the point to the line the force acts along. It is measured in newton metres, and it turns either clockwise or anticlockwise.', show: 'def' },
        { say: 'A force of forty newtons acts at right angles to a spanner, zero point two five metres from the centre of a nut. Its moment about the nut is forty times zero point two five, which is ten newton metres.', show: 'm.0', focus: 'm.0' },
        { say: 'To add several moments, choose one direction as positive, usually anticlockwise, give each moment a sign, and add.' },
        { say: 'If a force acts at an angle theta to a rod, only its part at right angles to the rod turns it. So its moment about the end of a rod of length L is F L sine theta.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'A beam in equilibrium',
      layout: 'split',
      leftWidth: 540,
      left: [
        figure('bm', [
          block('beam', [2, 0], 4.4, 0.3, { tone: 'adj' }),
          support('sa', 0),
          support('sb', 4),
          force('ra', [0, 0.3], 90, 1.3, 'R_A', { tone: 'good' }),
          force('rb', [4, 0.3], 90, 1.3, 'R_B', { tone: 'good' }),
          force('w', [2, 0], -90, 1.3, '20g'),
          force('load', [1, 0], -90, 1.3, '30g', { tone: 'theta' }),
          { points: { A: [0, -0.5], B: [4, -0.5] }, items: [{ kind: 'label', id: 'A', at: 'A', tex: 'A', place: 'below' }, { kind: 'label', id: 'B', at: 'B', tex: 'B', place: 'below' }] },
        ], 380),
      ],
      right: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{About } A:', '4R_B = 2(20g) + 1(30g)', 'R_B = 17.5g = 171.5\\text{ N}', 'R_A + R_B = 50g = 490', 'R_A = 318.5\\text{ N}'] },
      ],
      lines: [
        { say: 'A rigid body such as a beam is in equilibrium when the resultant force is zero, and the resultant moment about every point is zero as well.', show: ['bm.beam', 'bm.sa', 'bm.sb', 'bm.A', 'bm.B'] },
        { say: 'A uniform beam "A" B, four metres long with mass twenty kilograms, rests on supports at its ends. A load of thirty kilograms sits one metre from "A". Find the reactions.', show: ['bm.w', 'bm.load', 'bm.ra', 'bm.rb'] },
        { say: 'The beam is uniform, so its weight acts at the middle, two metres from "A". Take moments about "A": the reaction at "A" passes through that point, so it drops out.', focus: ['bm.w', 'bm.ra'] },
        { say: 'Anticlockwise, R B times four. Clockwise, twenty g times two, plus thirty g times one. So R B is seventeen point five g, which is one hundred seventy one point five newtons.', show: ['m.0', 'm.1', 'm.2'], focus: 'm.2' },
        { say: 'Then resolve vertically: the two reactions hold up fifty g, so R "A" is three hundred eighteen point five newtons. The support nearer the load carries more.', show: ['m.3', 'm.4'], focus: 'm.4' },
      ],
    },
    {
      chapter: 'On the point of tilting',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'On the point of tilting', md: 'As a load moves out past a support, the reaction at the **other** support shrinks. When it reaches zero, the beam is on the point of tilting.' },
        { kind: 'callout', id: 'mis', tone: 'mistake', title: 'Take moments about the right point', md: 'On the point of tilting about $D$, take moments about $D$. The reaction at $D$ drops out, and the other reaction is zero.' },
      ],
      lines: [
        { say: 'Imagine a load moving towards the end of a beam, out beyond one of its supports. The reaction at the other support gets smaller and smaller.', show: 'key' },
        { say: 'When that reaction reaches zero, the beam is on the point of tilting about the nearer support.' },
        { say: 'So take moments about the support it would tilt about. Its reaction drops out, the other reaction is zero, and the only moments left are the weights on either side.', show: 'mis' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A uniform rod $2$ m long with weight $30$ N is pivoted at one end and held horizontal. Find the moment of its weight about the pivot.',
          choices: ['$60$ N m', '$15$ N m', '$30$ N m', '$32$ N m'],
          answer: 2,
          working: 'The weight acts at the midpoint, $1$ m from the pivot: $30 \\times 1 = 30$ N m.',
        },
      ],
      lines: [
        { say: 'Your turn. A uniform rod two metres long, with weight thirty newtons, is pivoted at one end and held horizontal. Find the moment of its weight about the pivot. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. The rod is uniform, so its weight acts at the midpoint, one metre from the pivot. The moment is thirty times one, which is thirty newton metres. Choice A uses the whole length.', show: 'q.answer' },
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
          items: ['Moment $=$ force $\\times$ perpendicular distance, in N m.', 'At angle $\\theta$ to a rod of length $L$: $FL\\sin\\theta$.', 'In equilibrium: resolve vertically and take moments.', 'Take moments about the point where an unknown force acts.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A moment is the force times the perpendicular distance, in newton metres.', show: 'sum.0' },
        { say: 'For a force at an angle theta to a rod, the moment about the end is F L sine theta.', show: 'sum.1' },
        { say: 'A beam in equilibrium has no resultant force and no resultant moment, so resolve vertically and take moments.', show: 'sum.2' },
        { say: 'And take moments about the point where an unknown force acts, so it drops out. That completes mechanics. Next, we turn to statistics, starting with sampling. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
