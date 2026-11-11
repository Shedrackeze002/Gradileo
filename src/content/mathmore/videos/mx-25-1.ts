import type { Explainer } from '@/video/script.ts';

/** Points round a circle of radius 3 about the origin, as diagram points c0, c1, … */
const ring: Record<string, [number, number]> = Object.fromEntries(
  Array.from({ length: 48 }, (_, i) => [`c${i}`, [3 * Math.cos((i * Math.PI) / 24), 3 * Math.sin((i * Math.PI) / 24)] as [number, number]]),
);
/** The minor arc from A (at −20°) to B (at 90°), for the shaded segment. */
const arc: Record<string, [number, number]> = Object.fromEntries(
  Array.from({ length: 23 }, (_, i) => {
    const t = ((-20 + i * 5) * Math.PI) / 180;
    return [`s${i}`, [3 * Math.cos(t), 3 * Math.sin(t)] as [number, number]];
  }),
);
const A = arc.s0;
const B = arc.s22;

const video: Explainer = {
  id: 'mx-25-1',
  lessonId: 'mx-25-1',
  title: 'Segments of a Circle',
  thumbnail: 'm',
  summary: 'A segment is the region between a chord and its arc. The minor segment is the sector minus the triangle: (θ/360)πr² − ½r² sin θ. For θ = 90° and r = 8 cm it is 50.2655 − 32 = 18.27 cm². The major segment is the circle minus the minor segment. The chord is 2r sin(θ/2), and the perimeter of a segment is its arc plus its chord.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Circles, Solids and the Earth', title: 'Segments of a Circle', subtitle: 'A sector minus a triangle' }],
      lines: [
        { say: 'A straight cut across a pizza, away from the centre, leaves two pieces, each with one straight edge and one curved edge.', show: 'title' },
        { say: 'In this video, you will learn to find the area and the perimeter of these pieces, which are called segments.' },
      ],
    },
    {
      chapter: 'What a segment is',
      layout: 'split',
      left: [
        {
          kind: 'diagram',
          id: 'g',
          height: 440,
          points: { ...ring, ...arc, O: [0, 0], A, B },
          items: [
            { kind: 'curve', id: 'circ', points: Object.keys(ring), closed: true, weight: 3 },
            { kind: 'region', id: 'seg', points: Object.keys(arc), tone: 'brand', shade: 0.35 },
            { kind: 'line', id: 'oa', from: 'O', to: 'A', label: 'r' },
            { kind: 'line', id: 'ob', from: 'O', to: 'B', label: 'r' },
            { kind: 'line', id: 'ab', from: 'A', to: 'B', tone: 'brand', weight: 3 },
            { kind: 'angle', id: 'th', at: 'O', from: 'A', to: 'B', label: '\\theta' },
            { kind: 'label', id: 'lo', at: 'O', tex: 'O', place: 'left', dot: true },
            { kind: 'label', id: 'la', at: 'A', tex: 'A', place: 'right' },
            { kind: 'label', id: 'lb', at: 'B', tex: 'B', place: 'above' },
          ],
        },
      ],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Segment', md: 'The region between a chord and the arc it cuts off.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{segment} = \\text{sector} - \\text{triangle}', '= \\dfrac{\\theta}{360} \\pi r^2 - \\dfrac{1}{2} r^2 \\sin\\theta'] },
      ],
      lines: [
        { say: 'A segment of a circle is the region between a chord and the arc that the chord cuts off. The smaller one is the minor segment, and the larger one is the major segment.', show: ['g.circ', 'g.ab', 'g.seg', 'def'] },
        { say: 'The two radii and the arc make a sector, with angle theta at the centre. The two radii and the chord make a triangle.', show: ['g.oa', 'g.ob', 'g.th', 'g.lo', 'g.la', 'g.lb'] },
        { say: 'So the minor segment is what is left of the sector when the triangle is taken away.', show: 'm.0', focus: 'm.0' },
        { say: 'The sector is theta over three hundred and sixty times pi r squared, and the triangle is a half r squared sine theta, from a half "a" b sine C.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Finding the area',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A chord subtends $110°$ at the centre of a circle of radius $6$ cm.', size: 'md' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{sector} = \\dfrac{110}{360} \\times \\pi \\times 6^2 \\approx 34.5575', '\\text{triangle} = \\dfrac{1}{2} \\times 6^2 \\times \\sin 110° \\approx 16.9145', '\\text{segment} \\approx 17.64 \\text{ cm}^2', '\\text{major segment} \\approx 113.0973 - 17.6430 = 95.45 \\text{ cm}^2'] },
      ],
      lines: [
        { say: 'A chord subtends a hundred and ten degrees at the centre of a circle of radius six centimetres.', show: 'q' },
        { say: 'The sector is a hundred and ten over three hundred and sixty times pi times thirty-six, about thirty-four point five five seven five.', show: 'm.0', focus: 'm.0' },
        { say: 'The triangle is a half times thirty-six times sine a hundred and ten degrees, about sixteen point nine one four five.', show: 'm.1', focus: 'm.1' },
        { say: 'The difference is the minor segment, seventeen point six four square centimetres. Keep four decimal places until the end, and round only once.', show: 'm.2', focus: 'm.2' },
        { say: 'The major segment is the rest of the circle: the whole circle minus the minor segment, about ninety-five point four five square centimetres.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Chord and perimeter',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{chord} = 2r\\sin\\dfrac{\\theta}{2}', '\\text{chord} = 2 \\times 9 \\times \\sin 60° \\approx 15.59', '\\text{arc} = \\dfrac{120}{360} \\times 2\\pi \\times 9 \\approx 18.85', '\\text{perimeter} \\approx 34.44 \\text{ cm}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Half the angle, not the whole angle', md: 'The chord uses $\\sin\\dfrac{\\theta}{2}$. The triangle’s area uses $\\sin\\theta$.' },
      ],
      lines: [
        { say: 'The line from the centre to the middle of the chord makes two right-angled triangles, each with half the angle at the centre. So half the chord is r sine of half theta, and the chord is twice that.', show: 'm.0', focus: 'm.0' },
        { say: 'For an angle of a hundred and twenty degrees in a circle of radius nine centimetres, the chord is eighteen times sine sixty degrees, about fifteen point five nine centimetres.', show: 'm.1', focus: 'm.1' },
        { say: 'The perimeter of the segment is the arc plus the chord. The arc is a third of the circumference, about eighteen point eight five.', show: 'm.2', focus: 'm.2' },
        { say: 'So the perimeter is about thirty-four point four four centimetres.', show: 'm.3', focus: 'm.3' },
        { say: 'The chord uses half the angle, but the area of the triangle uses the whole angle. Mixing them up is the most common slip.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A chord subtends $90°$ at the centre of a circle of radius $8$ cm. Find the area of the minor segment.',
          choices: ['$50.27$ cm²', '$18.27$ cm²', '$32.00$ cm²', '$82.27$ cm²'],
          answer: 1,
          working: 'Sector $\\approx 50.2655$, triangle $= \\frac{1}{2} \\times 64 \\times \\sin 90° = 32$. Segment $\\approx 18.27$ cm².',
        },
      ],
      lines: [
        { say: 'Your turn. A chord subtends ninety degrees at the centre of a circle of radius eight centimetres. Find the area of the minor segment. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. The sector is a quarter of the circle, about fifty point two six five five, and the triangle is a half times sixty-four times one, which is thirty-two. The difference is eighteen point two seven square centimetres. Choice D adds them instead.', show: 'q.answer' },
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
          items: ['A segment lies between a chord and its arc.', 'Minor segment $= \\dfrac{\\theta}{360}\\pi r^2 - \\dfrac{1}{2}r^2\\sin\\theta$.', 'Major segment $=$ circle $-$ minor segment.', 'Chord $= 2r\\sin\\dfrac{\\theta}{2}$; perimeter $=$ arc $+$ chord.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A segment is the region between a chord and its arc.', show: 'sum.0' },
        { say: 'The minor segment is the sector minus the triangle.', show: 'sum.1' },
        { say: 'The major segment is the whole circle minus the minor segment.', show: 'sum.2' },
        { say: 'The chord is two r sine of half theta, and the perimeter of a segment is its arc plus its chord. See you in the next lesson!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
