import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { oval } from './lib/mx-figures.ts';
import { block, force, segment } from './lib/mx-mechanics.ts';

const video: Explainer = {
  id: 'mx-12-5',
  lessonId: 'mx-12-5',
  title: 'Connected Particles and Pulleys',
  thumbnail: 'p',
  summary: 'Objects joined by an inextensible string or a towbar move with the same acceleration. Treat the system as one object to find the acceleration, since the tension cancels, then look at one part to find the tension. A car and trailer with 2400 N driving force and 450 N of resistance accelerate at 1.3 m/s² with 800 N in the towbar, and 5 kg and 3 kg particles over a smooth pulley have a = 2.45 m/s² and T ≈ 36.8 N.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Mechanics: Kinematics and Forces', title: 'Connected Particles and Pulleys', subtitle: 'Two objects, one acceleration' }],
      lines: [
        { say: 'A car pulling a trailer, and two weights hanging over a pulley, have something in common. They are two objects joined together, moving with the same acceleration.', show: 'title' },
        { say: 'In this video, you will learn to look at the whole system and at each part, and to use both views together to find the acceleration and the force in the connection.' },
      ],
    },
    {
      chapter: 'Connected particles',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Connected particles', md: 'Objects joined by an **inextensible** string, rope or rod have the **same acceleration**. The force in the connection is a **tension** when it pulls and a **thrust** when a rod pushes.' },
        { kind: 'callout', id: 'key', tone: 'key', title: 'It cancels in the whole system', md: 'The connection pulls each object equally and oppositely, so for the system as one object the tension does not appear.' },
      ],
      lines: [
        { say: 'Connected particles are objects joined by a string, a rope or a rod, so that they move together. If the connection does not stretch, both objects have the same speed and the same acceleration.', show: 'def' },
        { say: 'The force in the connection is a tension when it pulls, and a thrust when a rigid rod pushes.' },
        { say: 'By Newton’s third law, the connection pulls on each object equally and in opposite directions. So when we treat the whole system as one object, those two forces cancel.', show: 'key' },
      ],
    },
    {
      chapter: 'A car and a trailer',
      layout: 'split',
      leftWidth: 620,
      left: [
        figure('ct', [
          segment('road', [-5.4, 0], [4.4, 0], { tone: 'muted' }),
          block('tr', [-2.6, 0], 2, 1.1, { tex: '500', tone: 'adj' }),
          block('car', [1.2, 0], 2.6, 1.3, { tex: '1000' }),
          segment('bar', [-1.6, 0.5], [-0.1, 0.5], { weight: 4 }),
          force('drive', [2.5, 0.65], 0, 1.6, '2400', { tone: 'good' }),
          force('rc', [1.4, 1.3], 180, 1.1, '300', { place: 'above' }),
          force('rt', [-3.6, 0.55], 180, 1.2, '150'),
          force('t1', [-1.6, 0.5], 0, 0.9, 'T', { tone: 'theta', place: 'above' }),
        ], 360),
      ],
      right: [
        { kind: 'math', id: 'm', size: 'md', lines: ['2400 - 300 - 150', '= 1500a', 'a = 1.3\\text{ m/s}^2', 'T - 150 = 500(1.3)', 'T = 800\\text{ N}'] },
      ],
      lines: [
        { say: 'A car of mass one thousand kilograms tows a trailer of mass five hundred kilograms with a light rigid towbar. The driving force is two thousand four hundred newtons.', caption: 'A car of mass 1,000 kilograms tows a trailer of mass 500 kilograms with a light rigid towbar. The driving force is 2,400 newtons.', show: ['ct.road', 'ct.tr', 'ct.car', 'ct.bar', 'ct.drive'] },
        { say: 'The resistances are three hundred newtons on the car and one hundred fifty newtons on the trailer. Find the acceleration and the tension in the towbar.', show: ['ct.rc', 'ct.rt'] },
        { say: 'First, the whole system: one object of mass one thousand five hundred kilograms. The tension cancels, so two thousand four hundred minus three hundred minus one hundred fifty equals one thousand five hundred "a", and "a" is one point three.', caption: 'First, the whole system: one object of mass 1,500 kilograms. The tension cancels, so 2,400 − 300 − 150 = 1,500a, and a = 1.3.', show: ['m.0', 'm.1', 'm.2'], focus: 'm.2' },
        { say: 'Now the trailer alone. The tension pulls it forwards and its resistance holds it back: T minus one hundred fifty equals five hundred times one point three.', show: ['ct.t1', 'm.3'], focus: ['ct.t1', 'm.3'] },
        { say: 'So the tension in the towbar is eight hundred newtons.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Pulleys',
      layout: 'split',
      leftWidth: 480,
      left: [
        figure('p', [
          oval('wheel', [0, 4], 1, 1, 'muted'),
          segment('sl', [-1, 4], [-1, 1.6]),
          segment('sr', [1, 4], [1, 0.4]),
          block('b', [-1, 0.6], 1, 1, { tex: '3', tone: 'adj' }),
          block('a', [1, -0.8], 1.2, 1.2, { tex: '5' }),
          force('tb', [-1, 1.6], 90, 1, 'T', { tone: 'theta', place: 'left' }),
          force('ta', [1, 0.4], 90, 1, 'T', { tone: 'theta', place: 'right' }),
          force('wb', [-1, 0.6], -90, 1.2, '3g', { place: 'left' }),
          force('wa', [1, -0.8], -90, 1.2, '5g', { place: 'right' }),
        ], 500),
      ],
      right: [
        { kind: 'math', id: 'm', size: 'md', lines: ['A\\ (\\text{down}): \\ 5g - T = 5a', 'B\\ (\\text{up}): \\ T - 3g = 3a', '\\text{Add: } 2g = 8a', 'a = 2.45\\text{ m/s}^2', 'T = 3(9.8 + 2.45) \\approx 36.8\\text{ N}'] },
      ],
      lines: [
        { say: 'Particles of five kilograms and three kilograms hang over a smooth pulley on a light inextensible string, and are released from rest. Find the acceleration and the tension.', show: ['p.wheel', 'p.sl', 'p.sr', 'p.a', 'p.b'] },
        { say: 'Over a smooth pulley, the tension is the same on both sides. Each particle has its weight pulling down and the tension pulling up.', show: ['p.ta', 'p.tb', 'p.wa', 'p.wb'] },
        { say: 'The heavier particle moves down, so write F equals m "a" for it downwards: five g minus T equals five "a".', show: 'm.0', focus: 'm.0' },
        { say: 'The lighter one moves up, so write its equation upwards: T minus three g equals three "a".', show: 'm.1', focus: 'm.1' },
        { say: 'Adding the two equations removes T: two g equals eight "a", so "a" is two point four five metres per second per second.', show: ['m.2', 'm.3'], focus: 'm.3' },
        { say: 'Then from the lighter particle, T is three times nine point eight plus two point four five, about thirty six point eight newtons.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Particles of mass $4$ kg and $6$ kg hang over a smooth pulley and are released from rest. Find the acceleration. Take $g = 9.8$ m/s².',
          choices: ['$9.8$ m/s²', '$1.96$ m/s²', '$3.92$ m/s²', '$0.98$ m/s²'],
          answer: 1,
          working: '$6g - T = 6a$ and $T - 4g = 4a$. Adding: $2g = 10a$, so $a = 1.96$ m/s².',
        },
      ],
      lines: [
        { say: 'Your turn. Particles of mass four kilograms and six kilograms hang over a smooth pulley and are released from rest. Find the acceleration. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Six g minus T equals six "a", and T minus four g equals four "a". Adding gives two g equals ten "a", so "a" is one point nine six metres per second per second.', show: 'q.answer' },
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
          items: ['Inextensible connections give both objects the same acceleration.', 'For the whole system, the tension cancels: find $a$ first.', 'Then look at one object alone to find the tension.', 'Over a smooth pulley, write $F = ma$ for each particle in its own direction.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Objects joined by an inextensible connection have the same acceleration.', show: 'sum.0' },
        { say: 'Treat the system as one object to find the acceleration, because the tension cancels.', show: 'sum.1' },
        { say: 'Then look at one object alone to find the tension.', show: 'sum.2' },
        { say: 'And over a smooth pulley, write F equals m "a" for each particle in its own direction of motion, and add. In the next lesson, we resolve forces that act at angles. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
