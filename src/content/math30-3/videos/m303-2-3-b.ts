import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { oblique } from './lib/m303-2-figures.ts';

// Rafters TL = 4.2 m and TR = 5.5 m meeting at 112°: LR ≈ 8.1 m.
const truss = () =>
  figure(
    'truss',
    [
      oblique({
        corners: ['L', 'R', 'T'],
        angles: [39.17, 28.83],
        sides: { r: '4.2\\text{ m}', l: '5.5\\text{ m}', t: '?' },
        angleLabels: { T: '112^\\circ' },
        pairs: { T: 'opp' },
      }),
    ],
    240,
  );

// Towers A and B 12.5 km apart, angles 52° and 63° to the fire F: AF ≈ 12.3 km.
const fire = () =>
  figure('fire', [
    oblique({
      corners: ['A', 'B', 'F'],
      angles: [52, 63],
      sides: { f: '12.5\\text{ km}', b: '?' },
      angleLabels: { A: '52^\\circ', B: '63^\\circ', F: '65^\\circ' },
      pairs: { F: 'opp', B: 'adj' },
    }),
  ]);

const video: Explainer = {
  id: 'm303-2-3-b',
  lessonId: 'm303-2-3',
  title: 'Solving Problems with Oblique Triangles, Part 2: A Truss and Two Lookout Towers',
  thumbnailTitle: 'A Truss and Two Lookout Towers',
  thumbnail: 'fire',
  summary: 'The five-step plan with each law: the bottom chord of a roof truss with rafters of 4.2 m and 5.5 m meeting at 112° (the cosine law, about 8.1 m), and the distance from a fire to one of two lookout towers 12.5 km apart that sight it at 52° and 63° (the angle sum, then the sine law, about 12.3 km).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Oblique Triangles · Part 2', title: 'A Truss and Two Lookout Towers', subtitle: 'The plan, with each law' }],
      lines: [
        { say: 'Now put the plan to work on two real problems: one that needs the cosine law, and one that needs the sine law.', show: 'title' },
        { say: 'In this video, you will find the bottom chord of a roof truss, and the distance from a lookout tower to a forest fire.' },
      ],
    },
    {
      chapter: 'The bottom chord of a truss',
      layout: 'center',
      main: [
        truss(),
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['LR^2 = 4.2^2 + 5.5^2 - 2(4.2)(5.5)\\cos 112^\\circ', '2(4.2)(5.5)\\cos 112^\\circ \\approx -17.31', 'LR^2 \\approx 17.64 + 30.25 + 17.31 = 65.20', 'LR \\approx \\sqrt{65.20} \\approx 8.1\\text{ m}'],
        },
      ],
      lines: [
        { say: 'The framer’s rafters are TL, 4.2 metres, and TR, 5.5 metres, and they meet at angle T, 112 degrees. How long is the bottom chord, LR, to the nearest tenth of a metre?', show: ['truss.shape', 'truss.names', 'truss.T'] },
        { say: 'The sketch is drawn, and what we know is marked. Two sides and the contained angle, so the cosine law fits. The side we want, LR, is across from angle T.', focus: ['truss.T', 'truss.t'] },
        { say: 'LR squared equals 4.2 squared plus 5.5 squared, minus two times 4.2 times 5.5 times cosine 112.', show: 'm.0', focus: 'm.0' },
        { say: 'Find the last term first. Two times 4.2 times 5.5 is 46.2, and 46.2 times cosine 112 is about negative 17.31. It is negative because 112 degrees is obtuse.', show: 'm.1', focus: 'm.1' },
        { say: '4.2 squared is 17.64, and 5.5 squared is 30.25. So LR squared is about 17.64 plus 30.25 plus 17.31, which is 65.20, and its square root is about 8.074.', show: ['m.2', 'm.3'], focus: ['m.2', 'm.3'] },
        { say: 'The bottom chord is about 8.1 metres long. Check: it is across from the largest angle, so it should be the longest side, and 8.1 metres is longer than 5.5 metres.', focus: ['truss.t', 'm.3'] },
      ],
    },
    {
      chapter: 'Two fire lookout towers',
      layout: 'split',
      leftWidth: 520,
      left: [fire()],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['\\angle F = 180^\\circ - 52^\\circ - 63^\\circ = 65^\\circ', '\\dfrac{AF}{\\sin 63^\\circ} = \\dfrac{12.5}{\\sin 65^\\circ}', 'AF = \\dfrac{12.5\\sin 63^\\circ}{\\sin 65^\\circ} \\approx 12.289', 'AF \\approx 12.3\\text{ km}'],
        },
      ],
      lines: [
        { say: 'Fire lookout towers A and B are 12.5 kilometres apart, and both spot smoke at F. At tower A, the angle between the line to B and the line to the fire is 52 degrees. At tower B, it is 63 degrees. How far is the fire from tower A, to the nearest tenth of a kilometre?', show: ['fire.shape', 'fire.names', 'fire.A', 'fire.B'] },
        { say: 'Sketch triangle ABF, and mark the 12.5 kilometre side and the two angles. The side we want, AF, is marked with a question mark.', focus: ['fire.f', 'fire.b'] },
        { say: 'Decide. We know two angles and a side, so use the angle sum, then the sine law. The known side, AB, is across from angle F, and angle F is 180 minus 52 minus 63, which is 65 degrees.', show: ['fire.F', 'm.0'], focus: ['fire.F', 'fire.f', 'm.0'] },
        { say: 'Now AB and angle F are a matching pair. The side we want, AF, is across from angle B, so AF over sine 63 equals 12.5 over sine 65.', show: 'm.1', focus: ['m.1', 'fire.b', 'fire.B'] },
        { say: 'So AF equals 12.5 sine 63, over sine 65, which is about 12.289. The fire is about 12.3 kilometres from tower A.', show: ['m.2', 'm.3'], focus: 'm.3' },
        { say: 'Check: angle B, 63 degrees, is a little smaller than angle F, 65 degrees, so AF should be a little shorter than AB. And 12.3 kilometres is a little shorter than 12.5. It makes sense.', focus: ['fire.B', 'fire.F'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Lookout towers $P$ and $Q$ are $20\\text{ km}$ apart. A fire $F$ makes $\\angle P = 48^\\circ$ and $\\angle Q = 57^\\circ$. Which equation finds $QF$?',
          choices: ['$\\dfrac{QF}{\\sin 57^\\circ} = \\dfrac{20}{\\sin 75^\\circ}$', '$\\dfrac{QF}{\\sin 48^\\circ} = \\dfrac{20}{\\sin 57^\\circ}$', '$\\dfrac{QF}{\\sin 48^\\circ} = \\dfrac{20}{\\sin 75^\\circ}$', '$\\dfrac{QF}{\\sin 75^\\circ} = \\dfrac{20}{\\sin 48^\\circ}$'],
          answer: 2,
          working: '$\\angle F = 180^\\circ - 48^\\circ - 57^\\circ = 75^\\circ$, across from $PQ = 20$. $QF$ is across from $\\angle P = 48^\\circ$, so $QF \\approx 15.4\\text{ km}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Lookout towers P and Q are twenty kilometres apart. A fire, F, makes angle P 48 degrees and angle Q 57 degrees. Which equation finds QF? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Angle F is 180 minus 48 minus 57, which is 75 degrees, and it is across from the twenty kilometre side. QF is across from angle P, 48 degrees. Choice A uses sine 57: that equation finds PF, the distance from tower P.', show: 'q.answer' },
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
            'Two sides and the contained angle: the cosine law, with $2ab\\cos C$ worked out first.',
            'Two angles and a side: the angle sum, then the sine law.',
            'Answer in a sentence with units, and check sizes against angles.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. With two sides and the contained angle, use the cosine law, and work out the last term first.', show: 'sum.0' },
        { say: 'With two angles and a side, use the angle sum to complete a matching pair, then the sine law.', show: 'sum.1' },
        { say: 'And answer in a sentence with units, then check that longer sides are across from larger angles. In part three, we handle turns and angles of elevation. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
