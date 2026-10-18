import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { oblique } from './lib/m303-2-figures.ts';

// Triangle ABC with the height h dropped from C to side c.
const proof = () =>
  figure('proof', [
    oblique({
      corners: ['A', 'B', 'C'],
      angles: [55, 65],
      sides: { a: 'a', b: 'b' },
      angleLabels: { A: '', B: '' },
      pairs: { A: 'opp', B: 'adj' },
      altitude: 'C',
      altitudeLabel: 'h',
    }),
  ]);

const video: Explainer = {
  id: 'm303-2-1-b',
  lessonId: 'm303-2-1',
  title: 'The Sine Law, Part 2: The Law and Why It Works',
  thumbnailTitle: 'The Sine Law',
  thumbnail: 'proof',
  summary: 'Why the sine law is true, from the height of a triangle (h = b sin A = a sin B), the law a/sin A = b/sin B = c/sin C and its flipped form, using two ratios at a time with the unknown on top, and checking that the calculator is in degree mode (sin 74 is 0.961, not −0.985).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Oblique Triangles · Part 2', title: 'The Sine Law', subtitle: 'Each side over the sine of its opposite angle' }],
      lines: [
        { say: 'In every triangle, each side and the angle across from it are tied together in the same way. That connection is called the sine law.', show: 'title' },
        { say: 'In this video, you will see why the sine law is true, which way up to write it, and one calculator setting that matters.' },
      ],
    },
    {
      chapter: 'Why it works',
      layout: 'split',
      leftWidth: 520,
      left: [proof()],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\sin A = \\dfrac{h}{b} \\;\\Rightarrow\\; h = b\\sin A', '\\sin B = \\dfrac{h}{a} \\;\\Rightarrow\\; h = a\\sin B', 'b\\sin A = a\\sin B', '\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B}'] }],
      lines: [
        { say: 'Take any triangle ABC, and draw the height, h, from C straight down to side c. It splits the triangle into two right triangles, so SOH CAH TOA works in each of them.', show: ['proof.shape', 'proof.names', 'proof.alt'], focus: 'proof.alt' },
        { say: 'In the triangle on the left, the hypotenuse is side b, and h is opposite angle A. So the sine of A is h over b, which means h equals b sine A.', show: ['proof.A', 'proof.b', 'm.0'], focus: ['proof.A', 'proof.b', 'm.0'] },
        { say: 'In the triangle on the right, the hypotenuse is side "a", and h is opposite angle B. So h also equals "a" sine B.', show: ['proof.B', 'proof.a', 'm.1'], focus: ['proof.B', 'proof.a', 'm.1'] },
        { say: 'Both expressions equal the same height, so b sine A equals "a" sine B.', show: 'm.2', focus: 'm.2' },
        { say: 'Divide both sides by sine A times sine B. The sine A cancels on the left, and the sine B on the right: "a" over sine A equals b over sine B.', show: 'm.3', focus: 'm.3' },
        { say: 'A height drawn from a different corner brings in side c and angle C in the same way.', focus: 'proof' },
      ],
    },
    {
      chapter: 'The sine law',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'The sine law', md: 'In any $\\triangle ABC$, each side divided by the sine of its opposite angle gives the same number.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B} = \\dfrac{c}{\\sin C}', '\\dfrac{\\sin A}{a} = \\dfrac{\\sin B}{b} = \\dfrac{\\sin C}{c}'] },
      ],
      lines: [
        { say: 'So in any triangle, side "a" over sine A, b over sine B, and c over sine C are all equal. This is the sine law. Each fraction is a matching pair: a side, and the sine of the angle across from it.', show: ['def', 'm.0'], focus: 'm.0' },
        { say: 'Flip every fraction over, and you get another true form: sine A over "a" equals sine B over b equals sine C over c.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Using the law',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'key', title: 'Two ratios, unknown on top', md: 'Use only **two** of the ratios at a time. Put the unknown on top: **sides on top** to find a side, **sines on top** to find an angle. You need one complete matching pair, plus one more side or angle.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{find a side: } \\dfrac{b}{\\sin B} = \\dfrac{a}{\\sin A} \\qquad \\text{find an angle: } \\dfrac{\\sin B}{b} = \\dfrac{\\sin A}{a}'] },
      ],
      lines: [
        { say: 'Use only two of the ratios at a time. That gives an equation with one unknown, which you can solve.', show: 'tip' },
        { say: 'Put the unknown on top. To find a side, use the form with the sides on top. To find an angle, use the form with the sines on top. Then there is less rearranging to do.', show: 'm.0', focus: 'm.0' },
        { say: 'And to use the law at all, you need one complete matching pair, a side and the angle across from it, plus one more side or angle.', focus: 'tip' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Calculator in the wrong mode', md: 'Every angle in this unit is in degrees. In radian mode, $\\sin 74$ gives $-0.985$ instead of $0.961$. Check for DEG on the screen before you start.' },
        { kind: 'calc', id: 'c', keys: 'sin(74)', result: '0.961261696' },
      ],
      lines: [
        { say: 'Before you use the law, check your calculator. Every angle in this unit is measured in degrees.', show: 'oops' },
        { say: 'In degree mode, the sine of 74 degrees is about 0.961.', show: 'c' },
        { say: 'But in radian mode, the calculator treats 74 as a different kind of angle measure, and gives about negative 0.985. A negative sine for an angle in a triangle, or an answer that makes no sense, is a sign of the wrong mode.' },
        { say: 'So look for the letters D, E, G on the screen before you start.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In $\\triangle ABC$, $\\angle A = 50^\\circ$, $\\angle B = 65^\\circ$ and $a = 12\\text{ cm}$. Which equation can find side $b$?',
          choices: ['$\\dfrac{b}{\\sin 65^\\circ} = \\dfrac{12}{\\sin 50^\\circ}$', '$\\dfrac{b}{\\sin 50^\\circ} = \\dfrac{12}{\\sin 65^\\circ}$', '$\\dfrac{\\sin 65^\\circ}{b} = \\dfrac{12}{\\sin 50^\\circ}$', '$b = 12\\sin 65^\\circ$'],
          answer: 0,
          working: 'Side $a = 12$ pairs with $\\angle A = 50^\\circ$, and side $b$ pairs with $\\angle B = 65^\\circ$. With the sides on top, $\\dfrac{b}{\\sin 65^\\circ} = \\dfrac{12}{\\sin 50^\\circ}$.',
        },
      ],
      lines: [
        { say: 'Your turn. In triangle ABC, angle A is fifty degrees, angle B is 65 degrees, and side "a" is twelve centimetres. Which equation can find side b? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Side "a", twelve, pairs with angle A, fifty degrees, and side b pairs with angle B, 65 degrees. Choice B pairs each side with the wrong angle.', show: 'q.answer' },
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
            'Sine law: $\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B} = \\dfrac{c}{\\sin C}$, or the same with every fraction flipped.',
            'Use two ratios at a time, with the unknown on top.',
            'You need one complete matching pair. Check that the calculator is in degrees.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The sine law says each side over the sine of its opposite angle gives the same number. You can also flip every fraction.', show: 'sum.0' },
        { say: 'Use two ratios at a time, with the unknown on top.', show: 'sum.1' },
        { say: 'You need one complete matching pair to start, and your calculator must be in degrees. In part three, we use the sine law to find sides. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
