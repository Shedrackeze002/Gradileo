import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { block, force, segment } from './lib/mx-mechanics.ts';

const video: Explainer = {
  id: 'mx-13-2',
  lessonId: 'mx-13-2',
  title: 'Friction',
  thumbnail: 's',
  summary: 'Friction acts along a surface against motion, and F ≤ μR, with F = μR when the object is moving or on the point of moving. A 10 kg box with μ = 0.3 can take up to 29.4 N of friction, so a 20 N push does not move it. A 20 kg sledge pulled by 80 N at 30° has R = 156 N, friction 39 N, and an acceleration of about 1.51 m/s².',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Mechanics: Forces at Angles, Projectiles and Moments', title: 'Friction', subtitle: 'The force that resists sliding' }],
      lines: [
        { say: 'Push a heavy box gently and nothing happens. Push harder, and suddenly it slides.', show: 'title' },
        { say: 'Friction explains both. It grows to match a small push, but only up to a limit. In this video, you will learn that limit, and how to use it when an object slides.' },
      ],
    },
    {
      chapter: 'The friction law',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Friction', md: 'A force along the surfaces, against motion or the tendency to move, with $F \\le \\mu R$. It is **limiting**, $F = \\mu R$, when the object is moving or on the point of moving.' },
        { kind: 'math', id: 'm', size: 'xl', lines: ['F \\le \\mu R'] },
      ],
      lines: [
        { say: 'Friction is a force between two surfaces in contact. It acts along the surfaces, against the motion, or against the way the object would move.', show: 'def' },
        { say: 'Its size F is at most mu times R. R is the normal reaction, and mu is the coefficient of friction, a number that depends on the two surfaces.', show: 'm', focus: 'm' },
        { say: 'When the object is sliding, or just on the point of sliding, friction has reached its limit, so F equals mu R. An object on the point of moving is in limiting equilibrium.' },
      ],
    },
    {
      chapter: 'Does it move?',
      layout: 'split',
      leftWidth: 560,
      left: [
        figure('b', [
          segment('gnd', [-3, 0], [3, 0], { tone: 'muted' }),
          block('box', [0, 0], 1.8, 1.4, { tex: '10\\text{ kg}' }),
          force('p', [-2.8, 1.05], 0, 1.9, '20\\text{ N}', { tone: 'good', tail: true }),
          force('f', [-0.9, 0.2], 180, 1.4, 'F', { place: 'below' }),
          force('r', [0, 1.4], 90, 1.2, 'R', { tone: 'muted' }),
          force('w', [-0.4, 0], -90, 1.2, '98\\text{ N}', { tone: 'muted' }),
        ], 400),
      ],
      right: [
        { kind: 'math', id: 'm', size: 'md', lines: ['R = 10 \\times 9.8 = 98\\text{ N}', '\\mu R = 0.3 \\times 98 = 29.4\\text{ N}', '20 < 29.4: \\text{ stays at rest}', 'F = 20\\text{ N}'] },
        { kind: 'callout', id: 'mis', tone: 'mistake', title: 'Friction is not always μR', md: '$\\mu R$ is the **greatest** friction can be.' },
      ],
      lines: [
        { say: 'A box of mass ten kilograms rests on rough ground, with mu equal to zero point three. A horizontal force of twenty newtons pushes it. Does it move?', show: ['b.gnd', 'b.box', 'b.p'] },
        { say: 'Vertically, the reaction balances the weight, so R is ten times nine point eight, which is ninety eight newtons.', show: ['b.r', 'b.w', 'm.0'], focus: 'm.0' },
        { say: 'The greatest friction can be is mu R: zero point three times ninety eight, which is twenty nine point four newtons.', show: ['b.f', 'm.1'], focus: 'm.1' },
        { say: 'The push of twenty newtons is less than that, so the box stays at rest. Friction is just twenty newtons, enough to balance the push.', show: ['m.2', 'm.3'], focus: 'm.3' },
        { say: 'So friction is not always mu R. That is only the greatest it can be. Use F equals mu R only when the object is moving or on the point of moving.', show: 'mis' },
      ],
    },
    {
      chapter: 'A pull at an angle',
      layout: 'split',
      leftWidth: 560,
      left: [
        figure('s', [
          segment('gnd', [-3, 0], [3.2, 0], { tone: 'muted' }),
          block('sl', [0, 0], 2, 1, { tex: '20\\text{ kg}' }),
          force('t', [1, 0.6], 30, 2, '80\\text{ N}', { tone: 'good' }),
          force('f', [-1, 0.3], 180, 1.4, '0.25R'),
          force('r', [-0.3, 1], 90, 1.3, 'R', { tone: 'muted', place: 'left' }),
          force('w', [0, 0], -90, 1.3, '20g', { tone: 'muted' }),
          { points: { H: [2.4, 0.6] }, items: [{ kind: 'angle', id: 'ang', at: 't-a', from: 'H', to: 't-b', label: '30^\\circ', tone: 'theta' }] },
        ], 420),
      ],
      right: [
        { kind: 'math', id: 'm', size: 'md', lines: ['R + 80\\sin 30^\\circ = 196', 'R = 156\\text{ N}', 'F = 0.25 \\times 156 = 39\\text{ N}', '80\\cos 30^\\circ - 39 = 20a', 'a \\approx 1.51\\text{ m/s}^2'] },
      ],
      lines: [
        { say: 'A sledge of mass twenty kilograms is pulled across rough ground, with mu equal to zero point two five, by a rope at thirty degrees above the horizontal. The tension is eighty newtons. Find the acceleration.', show: ['s.gnd', 's.sl', 's.t', 's.ang'] },
        { say: 'The rope pulls partly upwards, which lifts some of the weight. So first resolve vertically: R plus eighty sine thirty equals one hundred ninety six, and R is one hundred fifty six newtons.', show: ['s.r', 's.w', 'm.0', 'm.1'], focus: 'm.1' },
        { say: 'The sledge is sliding, so friction is limiting: zero point two five times one hundred fifty six, which is thirty nine newtons, against the motion.', show: ['s.f', 'm.2'], focus: ['s.f', 'm.2'] },
        { say: 'Now F equals m "a" horizontally: eighty cos thirty minus thirty nine equals twenty "a". That is sixty nine point three minus thirty nine, so "a" is about one point five one metres per second per second.', show: ['m.3', 'm.4'], focus: 'm.4' },
        { say: 'This is the pattern every time: resolve at right angles to the surface to find R, then find the friction, then use F equals m "a" along the surface.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A box of mass $5$ kg rests on rough horizontal ground with $\\mu = 0.4$. What horizontal force puts it on the point of moving?',
          choices: ['$2$ N', '$49$ N', '$12.25$ N', '$19.6$ N'],
          answer: 3,
          working: '$R = 5 \\times 9.8 = 49$ N, and limiting friction is $0.4 \\times 49 = 19.6$ N.',
        },
      ],
      lines: [
        { say: 'Your turn. A box of mass five kilograms rests on rough horizontal ground, with mu equal to zero point four. What horizontal force puts it on the point of moving? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. R is five times nine point eight, which is forty nine newtons, and the limiting friction is zero point four times forty nine, which is nineteen point six newtons. Choice A forgets g.', show: 'q.answer' },
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
          items: ['Friction acts along the surface, against motion or the tendency to move.', '$F \\le \\mu R$, and $F = \\mu R$ when moving or on the point of moving.', 'Find $R$ by resolving at right angles to the surface.', 'Then use $F = ma$ along the surface.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Friction acts along the surface, against the motion or the tendency to move.', show: 'sum.0' },
        { say: 'F is at most mu R, and equals mu R when the object is moving or on the point of moving.', show: 'sum.1' },
        { say: 'Find the normal reaction by resolving at right angles to the surface. A pull at an angle changes it.', show: 'sum.2' },
        { say: 'Then use F equals m "a" along the surface. In the next lesson, we put objects on slopes. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
