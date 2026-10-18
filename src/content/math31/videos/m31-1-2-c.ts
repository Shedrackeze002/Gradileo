import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { unitCircle } from '@/video/trig.ts';
import { radian } from './lib/m31-1-figures.ts';

// The four angles with reference angle π/6, with their radii.
const family = figure('u', [
  unitCircle({
    r: 4,
    points: [
      { deg: 30, tex: '\\tfrac{\\pi}{6}' },
      { deg: 150, tex: '\\tfrac{5\\pi}{6}' },
      { deg: 210, tex: '\\tfrac{7\\pi}{6}' },
      { deg: 330, tex: '\\tfrac{11\\pi}{6}' },
    ],
  }),
  {
    points: {},
    items: [30, 150, 210, 330].map((d) => ({ kind: 'line' as const, id: `r${d}`, from: 'O', to: `p${d}`, tone: 'muted' as const, weight: 2.5, group: 'radii' })),
  },
]);

const at150 = figure('a', [unitCircle({ r: 4, arm: 150, armLabel: '\\tfrac{5\\pi}{6}', drop: true, points: [{ deg: 150, tex: '' }] })]);
const at315 = figure('b', [unitCircle({ r: 4, arm: 315, armLabel: '\\tfrac{7\\pi}{4}', drop: true, points: [{ deg: 315, tex: '' }] })]);

const video: Explainer = {
  id: 'm31-1-2-c',
  lessonId: 'm31-1-2',
  title: 'Trigonometry and Logarithms for Calculus, Part 3: Radians and Exact Values',
  thumbnailTitle: 'Radians and Exact Values',
  thumbnail: 'rad',
  summary: 'A radian is the angle that cuts off an arc as long as the radius, so π rad = 180°. Converting 135° to 3π/4 and 7π/6 to 210°, why calculus works in radians, and exact values from a reference angle and the quadrant: cos(5π/6) = −√3/2 and sin(7π/4) = −√2/2.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Precalculus Review · Part 3', title: 'Radians and Exact Values', subtitle: 'Measuring angles the calculus way' }],
      lines: [
        { say: 'You probably measure angles in degrees, with 360 degrees in a full turn. That number was chosen by people long ago. Calculus uses a more natural unit, the radian.', show: 'title' },
        { say: 'In this video, you will see what a radian is, convert between degrees and radians, and find exact values of sine and cosine for angles in radians.' },
      ],
    },
    {
      chapter: 'What a radian is',
      layout: 'split',
      leftWidth: 520,
      left: [figure('rad', [radian({ r: 4 })])],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Radian', md: 'The angle at the centre of a circle that cuts off an arc **as long as the radius**.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{full turn} = 2\\pi \\text{ radians} = 360^\\circ', '\\pi \\text{ rad} = 180^\\circ', '1 \\text{ rad} \\approx 57.3^\\circ'] },
      ],
      lines: [
        { say: 'Draw a circle with radius r, and mark off an arc along the circle that is exactly as long as the radius.', show: ['rad.circle', 'rad.centre', 'rad.r1', 'rad.arc'], focus: 'rad.arc' },
        { say: 'Join the ends of the arc to the centre. The angle between these two radii is one radian.', show: ['rad.r2', 'rad.angle', 'def'], focus: 'rad.angle' },
        { say: 'How many radians make a full turn? The whole circumference is two pi r, which is two pi radius-lengths. So a full turn is two pi radians, which is 360 degrees.', show: 'm.0', focus: 'm.0' },
        { say: 'Half of that gives the key fact: pi radians equals 180 degrees.', show: 'm.1', focus: 'm.1' },
        { say: 'So one radian is 180 over pi degrees, about 57.3 degrees. That matches the picture: a little less than sixty degrees.', show: 'm.2', focus: ['m.2', 'rad.angle'] },
      ],
    },
    {
      chapter: 'Converting',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{degrees} \\to \\text{radians: multiply by } \\dfrac{\\pi}{180^\\circ}', '135^\\circ = \\dfrac{135\\pi}{180} = \\dfrac{3\\pi}{4}', '\\text{radians} \\to \\text{degrees: multiply by } \\dfrac{180^\\circ}{\\pi}', '\\dfrac{7\\pi}{6} = \\dfrac{7(180^\\circ)}{6} = 210^\\circ'] },
      ],
      lines: [
        { say: 'Because pi radians is 180 degrees, you can convert either way. To change degrees to radians, multiply by pi over 180.', show: 'm.0', focus: 'm.0' },
        { say: 'For example, 135 degrees is 135 pi over 180. Both numbers divide by 45, so it simplifies to three pi over four.', show: 'm.1', focus: 'm.1' },
        { say: 'To change radians to degrees, multiply by 180 over pi. The pi cancels.', show: 'm.2', focus: 'm.2' },
        { say: 'For example, seven pi over six is seven times 180, over six. That is seven times thirty, which is 210 degrees.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Why radians?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Calculus works in radians', md: 'Calculus formulas, such as the rate of change of $\\sin x$ being $\\cos x$, are true only when $x$ is in radians.' },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Your calculator', md: 'Set your calculator to **radian mode** for calculus.' },
      ],
      lines: [
        { say: 'Why bother with radians? Because the formulas of calculus come out simple only in radians.', show: 'key' },
        { say: 'For example, later you will learn that the rate of change of sine x is cosine x. That simple fact is true only when x is measured in radians. In degrees, an awkward factor of pi over 180 appears everywhere.' },
        { say: 'So for calculus, set your calculator to radian mode, and keep it there.', show: 'tip' },
      ],
    },
    {
      chapter: 'Reference angles',
      layout: 'split',
      leftWidth: 520,
      left: [family],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\dfrac{\\pi}{6}\\colon \\ \\left(\\dfrac{\\sqrt{3}}{2}, \\dfrac{1}{2}\\right)', '\\dfrac{5\\pi}{6}\\colon \\ \\left(-\\dfrac{\\sqrt{3}}{2}, \\dfrac{1}{2}\\right)', '\\dfrac{7\\pi}{6}\\colon \\ \\left(-\\dfrac{\\sqrt{3}}{2}, -\\dfrac{1}{2}\\right)', '\\dfrac{11\\pi}{6}\\colon \\ \\left(\\dfrac{\\sqrt{3}}{2}, -\\dfrac{1}{2}\\right)'] },
        { kind: 'text', id: 't', size: 'md', md: 'A point on the unit circle is $(\\cos x, \\sin x)$.' },
      ],
      lines: [
        { say: 'Exact values come from the unit circle, the circle of radius one. The point at angle x on it is cosine x, sine x.', show: ['u.axes', 'u.circle', 't'] },
        { say: 'Here are four angles: pi over six, five pi over six, seven pi over six, and eleven pi over six. Each one makes the same angle, pi over six, with the x-axis. That angle is called the reference angle.', show: ['u.pts', 'u.radii'], focus: 'u.radii' },
        { say: 'At pi over six, the point is root three over two, one half. So at the other three angles, the coordinates have the same sizes: root three over two, and one half.', show: 'm.0', focus: ['m.0', 'u.p30'] },
        { say: 'Only the signs change, and the quadrant decides them. Left of the y-axis, cosine is negative. Below the x-axis, sine is negative.', show: ['m.1', 'm.2', 'm.3'], focus: ['m.1', 'm.2', 'm.3'] },
      ],
    },
    {
      chapter: 'Cosine of 5π/6',
      layout: 'split',
      leftWidth: 520,
      left: [at150],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\dfrac{5\\pi}{6} \\text{ is in quadrant II}', '\\text{reference angle } \\pi - \\dfrac{5\\pi}{6} = \\dfrac{\\pi}{6}', '\\cos\\dfrac{5\\pi}{6} = -\\cos\\dfrac{\\pi}{6} = -\\dfrac{\\sqrt{3}}{2}'] }],
      lines: [
        { say: 'Find the exact value of cosine of five pi over six.', show: ['a.axes', 'a.circle', 'a.one'] },
        { say: 'Five pi over six is a little less than pi, a half turn. So it is in quadrant two, the upper left.', show: ['a.arm', 'a.arc', 'm.0'], focus: ['a.arm', 'm.0'] },
        { say: 'Its reference angle is the gap to the x-axis: pi minus five pi over six, which is pi over six.', show: 'm.1', focus: 'm.1' },
        { say: 'Cosine is the x-coordinate, and in quadrant two, x is negative. So cosine of five pi over six is negative cosine of pi over six: negative root three over two.', show: ['a.tri', 'a.pts', 'm.2'], focus: ['m.2', 'a.pts'] },
      ],
    },
    {
      chapter: 'Sine of 7π/4',
      layout: 'split',
      leftWidth: 520,
      left: [at315],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\dfrac{7\\pi}{4} \\text{ is in quadrant IV}', '\\text{reference angle } 2\\pi - \\dfrac{7\\pi}{4} = \\dfrac{\\pi}{4}', '\\sin\\dfrac{7\\pi}{4} = -\\sin\\dfrac{\\pi}{4} = -\\dfrac{\\sqrt{2}}{2}'] }],
      lines: [
        { say: 'Now find the exact value of sine of seven pi over four.', show: ['b.axes', 'b.circle', 'b.one'] },
        { say: 'Seven pi over four is a little less than two pi, a full turn. So it is in quadrant four, the lower right.', show: ['b.arm', 'b.arc', 'm.0'], focus: ['b.arm', 'm.0'] },
        { say: 'Its reference angle is two pi minus seven pi over four, which is pi over four.', show: 'm.1', focus: 'm.1' },
        { say: 'Sine is the y-coordinate, and in quadrant four, y is negative. So sine of seven pi over four is negative root two over two.', show: ['b.tri', 'b.pts', 'm.2'], focus: ['m.2', 'b.pts'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find the exact value of $\\sin\\dfrac{4\\pi}{3}$.',
          choices: ['$\\dfrac{\\sqrt{3}}{2}$', '$-\\dfrac{1}{2}$', '$-\\dfrac{\\sqrt{3}}{2}$', '$\\dfrac{1}{2}$'],
          answer: 2,
          working: '$\\dfrac{4\\pi}{3}$ is in quadrant III, with reference angle $\\dfrac{4\\pi}{3} - \\pi = \\dfrac{\\pi}{3}$. Sine is negative there, so $\\sin\\dfrac{4\\pi}{3} = -\\sin\\dfrac{\\pi}{3} = -\\dfrac{\\sqrt{3}}{2}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the exact value of sine of four pi over three. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Four pi over three is a little more than pi, so it is in quadrant three, with reference angle pi over three. Sine is negative in quadrant three, so the value is negative root three over two. Choice B is the cosine of four pi over three, not the sine.', show: 'q.answer' },
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
          items: ['A radian cuts off an arc as long as the radius: $\\pi \\text{ rad} = 180^\\circ$.', 'Multiply by $\\dfrac{\\pi}{180^\\circ}$ to get radians, and by $\\dfrac{180^\\circ}{\\pi}$ to get degrees.', 'Calculus works in radians: use radian mode.', 'Exact values: the reference angle gives the size, the quadrant gives the sign.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A radian is the angle that cuts off an arc as long as the radius, and pi radians is 180 degrees.', show: 'sum.0' },
        { say: 'To convert, multiply by pi over 180, or by 180 over pi.', show: 'sum.1' },
        { say: 'Calculus works in radians, so use radian mode.', show: 'sum.2' },
        { say: 'And for an exact value, the reference angle gives the size, and the quadrant gives the sign. In the next part, we review the identities that calculus uses most. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
