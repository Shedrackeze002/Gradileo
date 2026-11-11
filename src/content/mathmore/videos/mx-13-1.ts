import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { along, block, force, segment } from './lib/mx-mechanics.ts';

const c30 = 3.4 * Math.cos(Math.PI / 6);
const lampR = along([0, 0], 60, 2.4);
const lampL: [number, number] = [-lampR[1] * Math.sqrt(3), lampR[1]];

const video: Explainer = {
  id: 'mx-13-1',
  lessonId: 'mx-13-1',
  title: 'Resolving Forces and Equilibrium',
  thumbnail: 'lamp',
  summary: 'A force F at an angle θ to the horizontal has components F cos θ horizontally and F sin θ vertically, so 20 N at 30° gives about 17.3 N and 10 N. To find a resultant, add components and use Pythagoras: 8 N and 6 N at right angles give 10 N at 36.9°. In equilibrium the components balance, so a 50 N lamp on strings at 30° and 60° has tensions 25 N and about 43.3 N.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Mechanics: Forces at Angles, Projectiles and Moments', title: 'Resolving Forces and Equilibrium', subtitle: 'Splitting forces at right angles' }],
      lines: [
        { say: 'Forces rarely line up neatly. A rope pulls at an angle, a slope pushes at an angle, and two cables hold a sign from different sides.', show: 'title' },
        { say: 'In this video, you will learn to split a force into two parts at right angles, add forces by adding their parts, and use that to find the forces on an object that stays still.' },
      ],
    },
    {
      chapter: 'Resolving a force',
      layout: 'split',
      leftWidth: 560,
      left: [
        figure('f', [
          force('F', [0, 0], 30, 3.4, '20\\text{ N}', { tone: 'hyp' }),
          segment('x', [0, 0], [c30, 0], { tone: 'adj', weight: 4, dashed: true, label: '20\\cos 30^\\circ', labelSide: 'right' }),
          segment('y', [c30, 0], [c30, 1.7], { tone: 'opp', weight: 4, dashed: true, label: '20\\sin 30^\\circ', labelSide: 'left' }),
          { points: { X: [1.5, 0] }, items: [{ kind: 'angle', id: 'ang', at: 'F-a', from: 'X', to: 'F-b', label: '30^\\circ', tone: 'theta' }] },
        ], 400),
      ],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Resolving', md: 'Split a force into two **components** at right angles. At $\\theta$ to the horizontal: $F\\cos\\theta$ across and $F\\sin\\theta$ up.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['20\\cos 30^\\circ \\approx 17.3\\text{ N}', '20\\sin 30^\\circ = 10\\text{ N}'] },
      ],
      lines: [
        { say: 'A force of twenty newtons acts at thirty degrees above the horizontal. It pulls partly across and partly up.', show: ['f.F', 'f.ang'] },
        { say: 'Resolving the force means splitting it into two components at right angles that together have the same effect. The force is the hypotenuse of a right-angled triangle.', show: ['def', 'f.x', 'f.y'] },
        { say: 'The side next to the angle is twenty cos thirty, about seventeen point three newtons horizontally.', show: 'm.0', focus: ['f.x', 'm.0'] },
        { say: 'The side opposite the angle is twenty sine thirty, which is ten newtons vertically.', show: 'm.1', focus: ['f.y', 'm.1'] },
      ],
    },
    {
      chapter: 'The resultant',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Forces of $8$ N along the $x$-direction and $6$ N along the $y$-direction act on a particle. Find the resultant.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['X = 8, \\quad Y = 6', 'R = \\sqrt{8^2 + 6^2} = 10\\text{ N}', '\\theta = \\tan^{-1}\\left(\\tfrac{6}{8}\\right) \\approx 36.9^\\circ'] },
      ],
      lines: [
        { say: 'To add several forces, resolve every force in the same two directions, add the components, and put the totals back together.', show: 'q' },
        { say: 'Here the forces are already at right angles: eight newtons along x and six newtons along y.', show: 'm.0', focus: 'm.0' },
        { say: 'The resultant is the hypotenuse, so by Pythagoras’ theorem it is the square root of sixty four plus thirty six, which is ten newtons.', show: 'm.1', focus: 'm.1' },
        { say: 'Its direction is the inverse tangent of six over eight, about thirty six point nine degrees to the x direction.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Equilibrium',
      layout: 'split',
      leftWidth: 560,
      left: [
        figure('lamp', [
          segment('ceil', [lampL[0] - 0.5, lampR[1]], [lampR[0] + 0.5, lampR[1]], { tone: 'muted' }),
          segment('s1', [0, 0], lampL, { tone: 'muted' }),
          segment('s2', [0, 0], lampR, { tone: 'muted' }),
          block('body', [0, -0.5], 0.8, 0.5, { tone: 'theta' }),
          force('t1', [0, 0], 150, 1.6, 'T_1', { tone: 'good', place: 'above' }),
          force('t2', [0, 0], 60, 1.4, 'T_2', { tone: 'good', place: 'right' }),
          force('w', [0, -0.5], -90, 1.4, '50\\text{ N}'),
          { points: { H1: [-1.4, 0], H2: [1.4, 0] }, items: [{ kind: 'angle', id: 'a1', at: 't1-a', from: 'H1', to: 't1-b', label: '30^\\circ', tone: 'theta' }, { kind: 'angle', id: 'a2', at: 't2-a', from: 'H2', to: 't2-b', label: '60^\\circ', tone: 'theta' }] },
        ], 440),
      ],
      right: [
        { kind: 'math', id: 'm', size: 'md', lines: ['T_1\\cos 30^\\circ = T_2\\cos 60^\\circ', 'T_2 = \\sqrt{3}\\,T_1', 'T_1\\sin 30^\\circ + T_2\\sin 60^\\circ = 50', '\\tfrac{1}{2}T_1 + \\tfrac{3}{2}T_1 = 50', 'T_1 = 25\\text{ N},\\ T_2 \\approx 43.3\\text{ N}'] },
      ],
      lines: [
        { say: 'An object is in equilibrium when the resultant force on it is zero. Then the forces balance in every direction: up equals down, and left equals right.' },
        { say: 'A lamp of weight fifty newtons hangs from two strings, one at thirty degrees and one at sixty degrees to the horizontal. Find the tensions.', show: ['lamp.ceil', 'lamp.s1', 'lamp.s2', 'lamp.body', 'lamp.w', 'lamp.t1', 'lamp.t2', 'lamp.a1', 'lamp.a2'] },
        { say: 'Horizontally, the two pulls balance: T one cos thirty equals T two cos sixty. That simplifies to T two equals root three times T one.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Vertically, the two upward parts hold up the weight: T one sine thirty plus T two sine sixty equals fifty.', show: 'm.2', focus: 'm.2' },
        { say: 'Substituting gives a half T one plus three halves T one equals fifty, so T one is twenty five newtons, and T two is twenty five root three, about forty three point three newtons.', show: ['m.3', 'm.4'], focus: 'm.4' },
        { say: 'Watch the angle. The side next to the angle uses cosine and the side opposite uses sine, so mark the angle on a diagram before you resolve.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A force of $10$ N acts at $60^\\circ$ above the horizontal. Find its horizontal component.',
          choices: ['$8.66$ N', '$10$ N', '$5$ N', '$0.5$ N'],
          answer: 2,
          working: 'The horizontal side is next to the angle: $10\\cos 60^\\circ = 5$ N.',
        },
      ],
      lines: [
        { say: 'Your turn. A force of ten newtons acts at sixty degrees above the horizontal. Find its horizontal component. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. The horizontal side is next to the sixty degree angle, so it is ten cos sixty, which is five newtons. Choice A uses sine, which gives the vertical component.', show: 'q.answer' },
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
          items: ['$F$ at $\\theta$ to a direction: $F\\cos\\theta$ along it and $F\\sin\\theta$ across it.', 'Resultant: add components, then $R = \\sqrt{X^2 + Y^2}$ and $\\tan\\theta = \\tfrac{Y}{X}$.', 'In equilibrium, the components balance in each direction.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A force at an angle theta has a component F cos theta along that direction, and F sine theta at right angles to it.', show: 'sum.0' },
        { say: 'To find a resultant, add the components, then use Pythagoras’ theorem and the inverse tangent.', show: 'sum.1' },
        { say: 'And in equilibrium, the components balance in each direction. In the next lesson, we add a new force: friction. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
