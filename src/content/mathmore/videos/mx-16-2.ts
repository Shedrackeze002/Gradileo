import type { Explainer } from '@/video/script.ts';

const s40 = Math.sin((40 * Math.PI) / 180);
const c40 = Math.cos((40 * Math.PI) / 180);

const video: Explainer = {
  id: 'mx-16-2',
  lessonId: 'mx-16-2',
  title: 'The Area of a Triangle',
  thumbnail: 'tri',
  summary: 'For a triangle with sides a and b and the angle C between them, the area is ½ab sin C, because the height is a sin C. With a = 7 cm, b = 9 cm and C = 40°, the area is about 20.2 cm². Since sin C = sin(180° − C), an area and two sides give two angles: area 12 with sides 5 and 8 gives C ≈ 36.9° or 143.1°.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Pure: Proof, Triangles and Logarithmic Graphs', title: 'The Area of a Triangle', subtitle: 'Area = ½ab sin C' }],
      lines: [
        { say: 'Half the base times the height needs the height of a triangle, which is often not given.', show: 'title' },
        { say: 'When two sides and the angle between them are known, trigonometry gives the height, and with it the area. In this video, you will see the formula and use it both ways.' },
      ],
    },
    {
      chapter: 'Area = ½ab sin C',
      layout: 'split',
      leftWidth: 560,
      left: [
        {
          kind: 'diagram',
          id: 'tri',
          height: 420,
          points: { C: [0, 0], B: [9, 0], A: [7 * c40, 7 * s40], F: [7 * c40, 0] },
          items: [
            { kind: 'region', id: 'fill', points: ['A', 'B', 'C'], tone: 'brand', shade: 0.15 },
            { kind: 'line', id: 'b', from: 'C', to: 'B', tone: 'adj', label: 'b = 9', labelSide: 'right' },
            { kind: 'line', id: 'a', from: 'C', to: 'A', tone: 'hyp', label: 'a = 7', labelSide: 'left' },
            { kind: 'line', id: 'c', from: 'A', to: 'B', tone: 'muted' },
            { kind: 'angle', id: 'ang', at: 'C', from: 'B', to: 'A', label: '40^\\circ', tone: 'theta' },
            { kind: 'line', id: 'h', from: 'A', to: 'F', tone: 'opp', dashed: true, label: 'a\\sin C', labelSide: 'left' },
            { kind: 'right', id: 'r', at: 'F', from: 'A', to: 'B' },
          ],
        },
      ],
      right: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\text{Area} = \\tfrac{1}{2}ab\\sin C'] },
        { kind: 'math', id: 'm', size: 'md', lines: ['= \\tfrac{1}{2} \\times 7 \\times 9 \\times \\sin 40^\\circ', '\\approx 20.2\\text{ cm}^2'] },
      ],
      lines: [
        { say: 'Here is a triangle with sides "a" and b, and the angle C between them.', show: ['tri.fill', 'tri.a', 'tri.b', 'tri.c', 'tri.ang'] },
        { say: 'Drop a height from the top to side b. It is opposite the angle C in a right-angled triangle with hypotenuse "a", so the height is "a" sine C.', show: ['tri.h', 'tri.r'], focus: 'tri.h' },
        { say: 'Half the base times the height is a half times b times "a" sine C. So the area is a half "a" b sine C.', show: 'f', focus: 'f' },
        { say: 'With "a" equal to seven centimetres, b equal to nine, and C equal to forty degrees, the area is a half times seven times nine times sine forty, about twenty point two square centimetres.', show: 'm', focus: 'm.1' },
        { say: 'The angle must be the included angle, the one between the two sides you use. If the angle you know is opposite one of them, find the included angle first.' },
      ],
    },
    {
      chapter: 'Two possible angles',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A triangle has $a = 5$ cm, $b = 8$ cm and area $12$ cm². Find the possible values of $C$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['12 = \\tfrac{1}{2} \\times 5 \\times 8 \\times \\sin C \\;\\Rightarrow\\; \\sin C = 0.6', 'C \\approx 36.9^\\circ \\quad \\text{or} \\quad C \\approx 180^\\circ - 36.9^\\circ = 143.1^\\circ'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'More shapes', md: 'Three sides: find an angle with the cosine rule first. A parallelogram with sides $a$, $b$ and angle $\\theta$ has area $ab\\sin\\theta$.' },
      ],
      lines: [
        { say: 'The formula also works backwards. A triangle has sides of five and eight centimetres, and an area of twelve square centimetres. Find the angle between those sides.', show: 'q' },
        { say: 'Twelve equals a half times five times eight times sine C, which is twenty sine C. So sine C is zero point six.', show: 'm.0', focus: 'm.0' },
        { say: 'The inverse sine gives thirty six point nine degrees. But sine C equals sine of one hundred eighty minus C, so one hundred forty three point one degrees works as well. Both triangles have the same area.', show: 'm.1', focus: 'm.1' },
        { say: 'With three sides, use the cosine rule to find an angle first. And a parallelogram is two such triangles, so its area is "a" b sine theta.', show: 'key' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A triangle has sides $6$ cm and $10$ cm with an angle of $30^\\circ$ between them. Find its area.',
          choices: ['$30$ cm²', '$60$ cm²', '$25.98$ cm²', '$15$ cm²'],
          answer: 3,
          working: '$\\tfrac{1}{2} \\times 6 \\times 10 \\times \\sin 30^\\circ = 30 \\times 0.5 = 15$ cm².',
        },
      ],
      lines: [
        { say: 'Your turn. A triangle has sides of six centimetres and ten centimetres, with an angle of thirty degrees between them. Find its area. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. A half times six times ten is thirty, and sine thirty is a half, so the area is fifteen square centimetres. Choice A forgets the sine.', show: 'q.answer' },
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
          items: ['Area $= \\tfrac{1}{2}ab\\sin C$, with $C$ between $a$ and $b$.', 'From an area, $\\sin C$ gives two angles: $C$ and $180^\\circ - C$.', 'Three sides: the cosine rule first.', 'A parallelogram has area $ab\\sin\\theta$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The area of a triangle is a half "a" b sine C, where C is the angle between "a" and b.', show: 'sum.0' },
        { say: 'Working backwards from an area, sine C gives two angles, an acute one and an obtuse one.', show: 'sum.1' },
        { say: 'With three sides, use the cosine rule first.', show: 'sum.2' },
        { say: 'And a parallelogram has area "a" b sine theta. In the next lesson, we use logarithms to turn curves into straight lines. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
