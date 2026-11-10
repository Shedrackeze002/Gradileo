import type { Explainer } from '@/video/script.ts';
import { arcPoints } from './lib/mx-figures.ts';

// A sector of radius 6 with an angle of 120°, standing upright like a slice of pizza.
const a = arcPoints('c', [0, 0], 6, 30, 150, 24);

const sector = (id: string, height: number) => ({
  kind: 'diagram' as const,
  id,
  height,
  points: { O: [0, 0] as [number, number], ...a.pts },
  items: [
    { kind: 'region' as const, id: 'sector', points: ['O', ...a.keys], tone: 'adj' as const, shade: 0.16 },
    { kind: 'line' as const, id: 'oa', from: 'O', to: 'c0', tone: 'ink' as const, label: '6\\text{ cm}', labelSide: 'right' as const },
    { kind: 'line' as const, id: 'ob', from: 'O', to: 'c24', tone: 'ink' as const, label: '6\\text{ cm}', labelSide: 'left' as const },
    { kind: 'curve' as const, id: 'arc', points: a.keys, tone: 'opp' as const, weight: 5 },
    { kind: 'angle' as const, id: 'ang', at: 'O', from: 'c0', to: 'c24', label: '120^\\circ', tone: 'theta' as const },
    { kind: 'label' as const, id: 'O', at: 'O', tex: 'O', place: 'below' as const, dot: true },
    { kind: 'region' as const, id: 'tri', points: ['O', 'c0', 'c24'], tone: 'bad' as const, shade: 0.2, group: 'seg' },
    { kind: 'line' as const, id: 'chord', from: 'c0', to: 'c24', tone: 'bad' as const, group: 'seg' },
    { kind: 'region' as const, id: 'segment', points: a.keys, tone: 'good' as const, shade: 0.35, group: 'seg' },
  ],
});

const video: Explainer = {
  id: 'mx-10-3',
  lessonId: 'mx-10-3',
  title: 'Arcs and Sectors',
  thumbnail: 's',
  summary: 'A sector with angle θ is θ/360 of its circle. For radius 6 cm and 120°, the arc is 120/360 × 2π × 6 = 4π ≈ 12.6 cm, the perimeter adds two radii to make 24.6 cm, and the area is 120/360 × π × 6² = 12π cm². A segment is the sector take away the triangle ½r² sin θ.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Bearings, Loci and Measures', title: 'Arcs and Sectors', subtitle: 'A fraction of a circle' }],
      lines: [
        { say: 'A slice of pizza has a curved crust and two straight edges that meet at the centre. Its crust and its area are both a fraction of the whole pizza.', show: 'title' },
        { say: 'In this video, you will learn to find the length of an arc, the perimeter and area of a sector, and the area of a segment.' },
      ],
    },
    {
      chapter: 'Arcs and sectors',
      layout: 'split',
      leftWidth: 600,
      left: [sector('s', 440)],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Arc and sector', md: 'An **arc** is part of the circumference. A **sector** is the slice between two radii and an arc. With angle $\\theta$ at the centre, it is $\\dfrac{\\theta}{360}$ of the circle.' },
      ],
      lines: [
        { say: 'An arc is part of the circumference of a circle.', show: ['s.O', 's.arc'], focus: 's.arc' },
        { say: 'A sector is the slice between two radii and an arc. This one has a radius of six centimetres.', show: ['s.oa', 's.ob', 's.sector'], focus: 's.sector' },
        { say: 'The angle at the centre tells us what fraction of the circle the sector is. A whole turn is three hundred sixty degrees, so a sector with angle theta is theta over three hundred sixty of the circle. Here, one hundred twenty over three hundred sixty is one third.', show: ['s.ang', 'def'], focus: 's.ang' },
      ],
    },
    {
      chapter: 'Arc length',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{arc length} = \\frac{\\theta}{360} \\times 2\\pi r', '\\frac{120}{360} \\times 2 \\times \\pi \\times 6 = 4\\pi = 12.56\\ldots \\approx 12.6\\text{ cm}', '\\text{perimeter} = 12.57 + 6 + 6 \\approx 24.6\\text{ cm}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The perimeter of a sector', md: 'The perimeter is the arc **plus the two radii**, not just the arc.' },
      ],
      lines: [
        { say: 'The arc is the same fraction of the circumference. The circumference is two pi r, so the arc length is theta over three hundred sixty, times two pi r.', show: 'm.0', focus: 'm.0' },
        { say: 'For our sector, that is one hundred twenty over three hundred sixty, times two, times pi, times six. That is four pi, or about twelve point six centimetres.', show: 'm.1', focus: 'm.1' },
        { say: 'The perimeter of the sector is the distance all the way round it: the arc plus the two radii. Twelve point five seven plus six plus six is about twenty four point six centimetres.', show: 'm.2', focus: 'm.2' },
        { say: 'Do not give the arc length when you are asked for the perimeter. Remember to add the two straight edges.', show: 'oops' },
      ],
    },
    {
      chapter: 'Sector area',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{sector area} = \\frac{\\theta}{360} \\times \\pi r^2', '\\frac{120}{360} \\times \\pi \\times 6^2 = \\frac{1}{3} \\times 36\\pi = 12\\pi\\text{ cm}^2', '12\\pi = 37.69\\ldots \\approx 37.7\\text{ cm}^2'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'In terms of π', md: 'If a question asks for the answer **in terms of $\\pi$**, leave $\\pi$ in it: $12\\pi$ cm².' },
      ],
      lines: [
        { say: 'The area of a sector is the same fraction of the area of the circle: theta over three hundred sixty, times pi r squared.', show: 'm.0', focus: 'm.0' },
        { say: 'For our sector, that is one third of pi times six squared, which is one third of thirty six pi, or twelve pi square centimetres.', show: 'm.1', focus: 'm.1' },
        { say: 'If the question asks for the answer in terms of pi, stop there. Otherwise, twelve pi is about thirty seven point seven square centimetres.', show: ['m.2', 'tip'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Segments',
      layout: 'split',
      leftWidth: 600,
      left: [sector('g', 440)],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Segment', md: 'A **chord** joins two points on a circle. A **segment** is the region between a chord and its arc.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{triangle} = \\tfrac{1}{2} r^2 \\sin\\theta', '\\tfrac{1}{2} \\times 6^2 \\times \\sin 120^\\circ = 15.58\\ldots', '37.70 - 15.59 \\approx 22.1\\text{ cm}^2'] },
      ],
      lines: [
        { say: 'A chord is a straight line joining two points on a circle. The region between a chord and its arc is called a segment.', show: ['g.O', 'g.arc', 'g.oa', 'g.ob', 'g.sector', 'g.ang', 'g.seg', 'def'], focus: 'g.segment' },
        { say: 'To find its area, take the triangle away from the sector. The triangle has two sides of six, with the angle one hundred twenty degrees between them, so its area is one half r squared sine theta.', show: 'm.0', focus: ['m.0', 'g.tri'] },
        { say: 'One half times six squared times sine one hundred twenty is about fifteen point five nine.', show: 'm.1', focus: 'm.1' },
        { say: 'So the segment is thirty seven point seven zero take away fifteen point five nine, which is about twenty two point one square centimetres.', show: 'm.2', focus: ['m.2', 'g.segment'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A sector has radius $10$ cm and angle $72^\\circ$. What is its area, to $1$ decimal place?',
          choices: ['$12.6$ cm²', '$6.3$ cm²', '$314.2$ cm²', '$62.8$ cm²'],
          answer: 3,
          working: 'Area $= \\dfrac{72}{360} \\times \\pi \\times 10^2 = 20\\pi = 62.83\\ldots \\approx 62.8$ cm².',
        },
      ],
      lines: [
        { say: 'Your turn. A sector has a radius of ten centimetres and an angle of seventy two degrees. What is its area, to one decimal place? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Seventy two over three hundred sixty is one fifth, and one fifth of pi times ten squared is twenty pi, about sixty two point eight square centimetres. Choice A is the arc length, and choice C is the area of the whole circle.', show: 'q.answer' },
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
          items: ['A sector with angle $\\theta$ is $\\dfrac{\\theta}{360}$ of the circle.', 'Arc length $= \\dfrac{\\theta}{360} \\times 2\\pi r$; the perimeter adds two radii.', 'Sector area $= \\dfrac{\\theta}{360} \\times \\pi r^2$.', 'Segment $=$ sector $- \\tfrac{1}{2}r^2 \\sin\\theta$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A sector with angle theta is theta over three hundred sixty of the circle.', show: 'sum.0' },
        { say: 'The arc length is that fraction of two pi r, and the perimeter of the sector adds the two radii.', show: 'sum.1' },
        { say: 'The sector area is that fraction of pi r squared.', show: 'sum.2' },
        { say: 'And a segment is the sector take away the triangle. In the next lesson, we use Pythagoras’ theorem and trigonometry in three dimensions. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
