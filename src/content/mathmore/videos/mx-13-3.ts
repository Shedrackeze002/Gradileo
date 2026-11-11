import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { along, block, force, segment } from './lib/mx-mechanics.ts';

const top: [number, number] = along([0, 0], 30, 6);
const foot = along([0, 0], 30, 3.2);
const mid = along(foot, 120, 0.45);

const video: Explainer = {
  id: 'mx-13-3',
  lessonId: 'mx-13-3',
  title: 'Inclined Planes',
  thumbnail: 'sl',
  summary: 'On a slope at angle α, resolve parallel and perpendicular to the slope: the weight gives mg sin α down the slope and mg cos α into it, and R = mg cos α. On a smooth 30° slope, a = g sin 30° = 4.9 m/s². On a rough slope with μ = 0.2, a 5 kg particle sliding down has friction of about 8.49 N up the slope and a ≈ 3.20 m/s². For a particle on a slope joined over a pulley to a hanging one, write F = ma for each and add.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Mechanics: Forces at Angles, Projectiles and Moments', title: 'Inclined Planes', subtitle: 'Forces on a slope' }],
      lines: [
        { say: 'On a slope, gravity still pulls straight down, but an object can only move along the slope.', show: 'title' },
        { say: 'The trick is to resolve in two new directions: parallel to the slope, where the motion happens, and perpendicular to it, where the forces balance. In this video, you will see how.' },
      ],
    },
    {
      chapter: 'Resolving on a slope',
      layout: 'split',
      leftWidth: 620,
      left: [
        figure('sl', [
          segment('base', [0, 0], [top[0], 0], { tone: 'muted' }),
          segment('slope', [0, 0], top, { tone: 'ink' }),
          block('p', foot, 1.2, 0.9, { angle: 30 }),
          force('w', mid, -90, 2, 'mg'),
          force('down', mid, 210, 1, 'mg\\sin\\alpha', { tone: 'opp', dashed: true, place: 'above left' }),
          force('into', mid, 300, 1.73, 'mg\\cos\\alpha', { tone: 'adj', dashed: true, place: 'below right' }),
          force('r', along(foot, 120, 0.9), 120, 1.4, 'R', { tone: 'good' }),
          { points: { O: [0, 0], E: [2, 0] }, items: [{ kind: 'angle', id: 'ang', at: 'O', from: 'E', to: 'slope-b', label: '\\alpha', tone: 'theta' }] },
        ], 460),
      ],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'On a slope at α', md: 'The weight $mg$ gives $mg\\sin\\alpha$ **down the slope** and $mg\\cos\\alpha$ **into the slope**.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['R = mg\\cos\\alpha'] },
      ],
      lines: [
        { say: 'An inclined plane is a flat surface at an angle alpha to the horizontal. A particle on it has its weight, m g, acting straight down.', show: ['sl.base', 'sl.slope', 'sl.ang', 'sl.p', 'sl.w'] },
        { say: 'Resolve the weight along the slope and at right angles to it. The part down the slope is m g sine alpha.', show: ['sl.down', 'def'], focus: 'sl.down' },
        { say: 'The part into the slope is m g cos alpha.', show: 'sl.into', focus: 'sl.into' },
        { say: 'The normal reaction R is at right angles to the slope. Nothing moves into the slope, so R balances that part of the weight: R equals m g cos alpha.', show: ['sl.r', 'm'], focus: ['sl.r', 'm'] },
      ],
    },
    {
      chapter: 'Smooth and rough slopes',
      layout: 'center',
      main: [
        { kind: 'math', id: 's', size: 'md', lines: ['\\text{Smooth, } 30^\\circ: \\ mg\\sin 30^\\circ = ma \\;\\Rightarrow\\; a = 4.9\\text{ m/s}^2'] },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Rough, } \\mu = 0.2,\\ 5\\text{ kg}: \\ R = 5(9.8)\\cos 30^\\circ \\approx 42.4\\text{ N}', '\\text{Friction} = 0.2R \\approx 8.49\\text{ N up the slope}', '24.5 - 8.49 = 5a \\;\\Rightarrow\\; a \\approx 3.20\\text{ m/s}^2'] },
        { kind: 'callout', id: 'mis', tone: 'mistake', title: 'Friction is always against the motion', md: 'Sliding down: friction acts **up** the slope. Moving up: it acts **down** the slope.' },
      ],
      lines: [
        { say: 'A particle is released on a smooth slope at thirty degrees. Down the slope, the only force is m g sine thirty, so m g sine thirty equals m "a".', show: 's', focus: 's' },
        { say: 'The mass cancels, so "a" is g sine thirty, which is four point nine metres per second per second, whatever the mass.' },
        { say: 'Now a rough slope. A particle of mass five kilograms slides down a thirty degree slope with mu equal to zero point two. At right angles to the slope, R is five g cos thirty, about forty two point four newtons.', show: 'm.0', focus: 'm.0' },
        { say: 'The particle slides down, so friction acts up the slope, and it is limiting: zero point two R, about eight point four nine newtons.', show: 'm.1', focus: 'm.1' },
        { say: 'Along the slope, twenty four point five minus eight point four nine equals five "a", so "a" is about three point two zero metres per second per second.', show: 'm.2', focus: 'm.2' },
        { say: 'Friction changes direction with the motion. A box pushed up a slope has friction acting down the slope; once it slides back, friction acts up the slope.', show: 'mis' },
      ],
    },
    {
      chapter: 'A slope and a pulley',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: '$A$ ($4$ kg) is on a smooth slope with $\\tan\\alpha = \\tfrac{3}{4}$, joined over a smooth pulley at the top to $B$ ($6$ kg) hanging freely.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\sin\\alpha = \\tfrac{3}{5}, \\quad \\cos\\alpha = \\tfrac{4}{5}', 'A: \\ T - 4g\\left(\\tfrac{3}{5}\\right) = 4a \\qquad B: \\ 6g - T = 6a', '3.6g = 10a \\;\\Rightarrow\\; a \\approx 3.53\\text{ m/s}^2', 'T = 6(9.8 - 3.528) \\approx 37.6\\text{ N}'] },
      ],
      lines: [
        { say: 'Particle "A", of mass four kilograms, is on a smooth slope with tan alpha equal to three quarters. A string runs over a smooth pulley at the top to particle B, of mass six kilograms, hanging freely.', show: 'q' },
        { say: 'A right-angled triangle with sides three and four has a hypotenuse of five, so sine alpha is three fifths and cos alpha is four fifths, exactly.', show: 'm.0', focus: 'm.0' },
        { say: 'Write F equals m "a" for each particle in its own direction. "A" moves up the slope: T minus four g times three fifths equals four "a". B moves down: six g minus T equals six "a".', show: 'm.1', focus: 'm.1' },
        { say: 'Adding removes T: three point six g equals ten "a", so "a" is about three point five three metres per second per second.', show: 'm.2', focus: 'm.2' },
        { say: 'Then from B, the tension is about thirty seven point six newtons.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A particle slides down a smooth slope at $20^\\circ$ to the horizontal. Find its acceleration. Take $g = 9.8$ m/s².',
          choices: ['$3.35$ m/s²', '$9.21$ m/s²', '$9.8$ m/s²', '$4.9$ m/s²'],
          answer: 0,
          working: '$a = g\\sin 20^\\circ = 9.8 \\times 0.342 \\approx 3.35$ m/s².',
        },
      ],
      lines: [
        { say: 'Your turn. A particle slides down a smooth slope at twenty degrees to the horizontal. Find its acceleration. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. On a smooth slope, "a" equals g sine alpha: nine point eight times sine twenty, about three point three five metres per second per second. Choice B uses cos instead of sine.', show: 'q.answer' },
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
          items: ['Resolve along and at right angles to the slope.', 'The weight gives $mg\\sin\\alpha$ down the slope and $mg\\cos\\alpha$ into it.', 'Friction is at most $\\mu R$, against the motion.', 'Connected particles: $F = ma$ for each, then add.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. On a slope, resolve along the slope and at right angles to it.', show: 'sum.0' },
        { say: 'The weight gives m g sine alpha down the slope, and m g cos alpha into it.', show: 'sum.1' },
        { say: 'Friction is at most mu R, and always against the motion.', show: 'sum.2' },
        { say: 'And for connected particles, write F equals m "a" for each one in its own direction, then add. In the next lesson, we launch projectiles. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
