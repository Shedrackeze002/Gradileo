import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { oblique } from './lib/m303-2-figures.ts';

// An acute triangle (50°, 60°, 70°) beside an obtuse one (25°, 35°, 120°).
const kinds = () =>
  figure(
    'kinds',
    [
      oblique({ name: 'ac', corners: ['P', 'Q', 'R'], angles: [60, 50], base: 5, angleLabels: { P: '60^\\circ', Q: '50^\\circ', R: '70^\\circ' } }),
      oblique({ name: 'ob', corners: ['S', 'T', 'U'], angles: [25, 35], base: 7, at: [7, 0], angleLabels: { S: '25^\\circ', T: '35^\\circ', U: '120^\\circ' } }),
    ],
    340,
  );

// Triangle ABC as in the lesson: C at the bottom left (50°), A at the bottom right (58°), B at the top (72°).
const abc = (id: string, o: { pairs?: boolean; angles?: boolean; sides?: boolean } = {}) =>
  figure(id, [
    oblique({
      corners: ['C', 'A', 'B'],
      angles: [50, 58],
      sides: o.sides ? { a: '8.9\\text{ cm}', b: '10.0\\text{ cm}', c: '8.1\\text{ cm}' } : { a: 'a', b: 'b', c: 'c' },
      angleLabels: o.angles ? { A: '58^\\circ', B: '72^\\circ', C: '50^\\circ' } : { A: '', B: '', C: '' },
      pairs: o.pairs ? { A: 'opp', B: 'adj', C: 'hyp' } : undefined,
    }),
  ]);

const video: Explainer = {
  id: 'm303-2-1',
  lessonId: 'm303-2-1',
  title: 'The Sine Law, Part 1: Oblique Triangles and Matching Pairs',
  thumbnailTitle: 'Oblique Triangles and Matching Pairs',
  thumbnail: 'pairs',
  summary: 'Oblique triangles (acute or obtuse, with no right angle), naming each side with the lower-case letter of the angle opposite it, matching pairs of a side and its opposite angle, and the check that the longest side is always opposite the largest angle. Part 2 states and proves the sine law.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Oblique Triangles · Part 1', title: 'Oblique Triangles and Matching Pairs', subtitle: 'Naming the parts of any triangle' }],
      lines: [
        { say: 'A surveyor marking a property corner, a framer laying out a roof truss, and a crew planning a pipeline around a pond all work with triangles that have no right angle.', show: 'title' },
        { say: 'SOH CAH TOA only works in right triangles. In this video, you will name the parts of any triangle, and meet matching pairs, the idea that the sine law is built on.' },
      ],
    },
    {
      chapter: 'Oblique triangles',
      layout: 'center',
      main: [
        kinds(),
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Oblique triangle', md: 'An **oblique triangle** is any triangle with no $90^\\circ$ angle. It can be **acute** (all three angles less than $90^\\circ$) or **obtuse** (one angle greater than $90^\\circ$).' },
      ],
      lines: [
        { say: 'An oblique triangle is any triangle with no ninety-degree angle.', show: 'def' },
        { say: 'It can be acute, with all three angles less than ninety degrees, like this one: sixty, fifty and seventy degrees.', show: ['kinds.ac-shape', 'kinds.ac-P', 'kinds.ac-Q', 'kinds.ac-R'] },
        { say: 'Or it can be obtuse, with one angle greater than ninety degrees, like this one, with an angle of 120 degrees.', show: ['kinds.ob-shape', 'kinds.ob-S', 'kinds.ob-T', 'kinds.ob-U'], focus: 'kinds.ob-U' },
        { say: 'A triangle can never have two obtuse angles. Its three angles add to 180 degrees, and two angles over ninety would already add to more than that.', focus: 'kinds' },
      ],
    },
    {
      chapter: 'Naming the sides',
      layout: 'split',
      leftWidth: 560,
      left: [abc('tri')],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['Corners: capital letters $A$, $B$, $C$.', 'Side $a$ is across from $\\angle A$.', 'Side $b$ is across from $\\angle B$.', 'Side $c$ is across from $\\angle C$.'],
        },
      ],
      lines: [
        { say: 'Name the vertices, the corners, with capital letters: A, B and C.', show: ['tri.shape', 'tri.names', 'b.0'] },
        { say: 'Name each side with the lower-case letter of the angle opposite it, right across the triangle. Side "a" is across from angle A.', show: ['tri.A', 'tri.a', 'b.1'], focus: ['tri.A', 'tri.a'] },
        { say: 'Side b is across from angle B.', show: ['tri.B', 'tri.b', 'b.2'], focus: ['tri.B', 'tri.b'] },
        { say: 'And side c is across from angle C.', show: ['tri.C', 'tri.c', 'b.3'], focus: ['tri.C', 'tri.c'] },
        { say: 'Notice that side "a" does not touch angle A at all. It is the side that the angle faces.', focus: ['tri.A', 'tri.a'] },
      ],
    },
    {
      chapter: 'Matching pairs',
      layout: 'split',
      leftWidth: 560,
      left: [abc('pairs', { pairs: true })],
      right: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Matching pairs', md: 'A side and the angle **opposite** it make a **matching pair**: [[opp:$a$ and $\\angle A$]], [[adj:$b$ and $\\angle B$]], [[hyp:$c$ and $\\angle C$]].' },
      ],
      lines: [
        { say: 'A side and the angle opposite it make a matching pair. Side "a" and angle A are one pair.', show: ['pairs.shape', 'pairs.names', 'pairs.A', 'key'], focus: ['pairs.A', 'pairs.a'] },
        { say: 'Side b and angle B are another pair.', show: 'pairs.B', focus: ['pairs.B', 'pairs.b'] },
        { say: 'And side c and angle C are the third pair.', show: 'pairs.C', focus: ['pairs.C', 'pairs.c'] },
        { say: 'In these videos, the two parts of a pair share a colour, so you can see that they go together. The sine law is built from matching pairs, so finding them is always your first step.', focus: 'pairs' },
      ],
    },
    {
      chapter: 'Biggest across from biggest',
      layout: 'split',
      leftWidth: 560,
      left: [abc('size', { pairs: true, angles: true, sides: true })],
      right: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Biggest across from biggest', md: 'The longest side is always opposite the largest angle, and the shortest side is opposite the smallest angle. Use this to check every answer.' },
      ],
      lines: [
        { say: 'Here is a fact you can use to check every answer. The longest side is always opposite the largest angle, and the shortest side is opposite the smallest angle.', show: ['size.shape', 'size.names', 'size.A', 'size.B', 'size.C', 'tip'] },
        { say: 'In this triangle, the largest angle is B, at 72 degrees. The longest side, b, ten centimetres, is right across from it.', focus: ['size.B', 'size.b'] },
        { say: 'The smallest angle is C, at fifty degrees. Across from it is the shortest side, c, at 8.1 centimetres.', focus: ['size.C', 'size.c'] },
        { say: 'And the middle angle, A, at 58 degrees, is across from the middle side, "a", at 8.9 centimetres. So if you ever find a long side across from a small angle, go back and look for a mistake.', focus: ['size.A', 'size.a'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In $\\triangle PQR$, $\\angle P = 40^\\circ$, $\\angle Q = 75^\\circ$ and $\\angle R = 65^\\circ$. Which side is the longest?',
          choices: ['side $p$', 'side $r$', 'side $q$', 'You cannot tell without a side length.'],
          answer: 2,
          working: 'The largest angle is $\\angle Q = 75^\\circ$, so the longest side is the one across from it: side $q$.',
        },
      ],
      lines: [
        { say: 'Your turn. In triangle PQR, angle P is forty degrees, angle Q is 75 degrees, and angle R is 65 degrees. Which side is the longest? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. The largest angle is Q, at 75 degrees, so the longest side is the one across from it, side q. Choice A, side p, is across from the smallest angle, forty degrees, so it is the shortest side.', show: 'q.answer' },
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
            'An oblique triangle has no right angle. It can be acute or obtuse.',
            'Label each side with the lower-case letter of its opposite angle: a side and its opposite angle are a matching pair.',
            'The longest side is opposite the largest angle, and the shortest side opposite the smallest.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An oblique triangle has no right angle. It can be acute, or it can be obtuse.', show: 'sum.0' },
        { say: 'Label each side with the lower-case letter of the angle opposite it. A side and its opposite angle are a matching pair.', show: 'sum.1' },
        { say: 'And the longest side is always opposite the largest angle, and the shortest side opposite the smallest. In part two, we meet the sine law. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
