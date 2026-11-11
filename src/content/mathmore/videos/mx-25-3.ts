import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'mx-25-3',
  lessonId: 'mx-25-3',
  title: 'Heron’s Formula',
  thumbnail: 'm',
  summary: 'Heron’s formula gives the area of a triangle from its three sides. Find the semi-perimeter s = (a + b + c)/2, then Area = √(s(s − a)(s − b)(s − c)). For sides 13, 14 and 15, s = 21 and the area is √7056 = 84. The height from a side is 2 × Area ÷ base, and a quadrilateral splits into two triangles along a diagonal.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Circles, Solids and the Earth', title: 'Heron’s Formula', subtitle: 'The area from three sides' }],
      lines: [
        { say: 'A surveyor can measure the three sides of a triangular field with a tape, but measuring its height or an angle is much harder.', show: 'title' },
        { say: 'In this video, you will learn Heron’s formula, which gives the area of a triangle from its three sides alone.' },
      ],
    },
    {
      chapter: 'The formula',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Heron’s formula', md: 'For sides $a$, $b$ and $c$, with semi-perimeter $s = \\dfrac{a + b + c}{2}$:' },
        { kind: 'math', id: 'm', size: 'xl', lines: ['\\text{Area} = \\sqrt{s(s - a)(s - b)(s - c)}'] },
      ],
      lines: [
        { say: 'First find the semi-perimeter, s, which is half the perimeter.', show: 'def' },
        { say: 'Then multiply s by s minus each side in turn, and take the square root. That is the area.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'A whole-number answer',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Find the area of a triangle with sides $13$, $14$ and $15$ cm.', size: 'md' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['s = \\dfrac{13 + 14 + 15}{2} = 21', '\\text{Area} = \\sqrt{21 \\times 8 \\times 7 \\times 6}', '= \\sqrt{7056} = 84 \\text{ cm}^2'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Use half the perimeter', md: '$s$ is $21$, not the perimeter $42$.' },
      ],
      lines: [
        { say: 'Find the area of a triangle with sides thirteen, fourteen and fifteen centimetres.', show: 'q' },
        { say: 'The perimeter is forty-two, so the semi-perimeter is twenty-one.', show: 'm.0', focus: 'm.0' },
        { say: 'Twenty-one minus each side gives eight, seven and six.', show: 'm.1', focus: 'm.1' },
        { say: 'Their product with twenty-one is seven thousand and fifty-six, and its square root is eighty-four. The area is eighty-four square centimetres.', show: 'm.2', focus: 'm.2' },
        { say: 'Make sure to use half the perimeter. Using the whole perimeter gives a much larger, wrong answer.', show: 'oops' },
      ],
    },
    {
      chapter: 'Heights and plots',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['84 = \\dfrac{1}{2} \\times 15 \\times h \\ \\Rightarrow \\ h = \\dfrac{2 \\times 84}{15} = 11.2'] },
        { kind: 'math', id: 'n', size: 'lg', lines: ['5, 12, 13: \\ s = 15, \\ \\sqrt{15 \\times 10 \\times 3 \\times 2} = 30', '10, 13, 13: \\ s = 18, \\ \\sqrt{18 \\times 8 \\times 5 \\times 5} = 60', '\\text{plot} = 30 + 60 = 90 \\text{ m}^2'] },
      ],
      lines: [
        { say: 'The area is also a half times the base times the height. So once Heron’s formula gives the area, we can find the height from any side. From the fifteen centimetre side, the height is eleven point two centimetres.', show: 'm.0', focus: 'm.0' },
        { say: 'A diagonal splits a quadrilateral into two triangles. A plot with sides five, twelve, ten and thirteen metres has a diagonal of thirteen metres.', show: 'n.0', focus: 'n.0' },
        { say: 'The first triangle has sides five, twelve and thirteen, and its area is thirty. The second has sides ten, thirteen and thirteen, and its area is sixty.', show: 'n.1', focus: 'n.1' },
        { say: 'So the plot has an area of ninety square metres.', show: 'n.2', focus: 'n.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A field has sides $8$ m, $11$ m and $13$ m. Find its area.',
          choices: ['$43.82$ m²', '$32.00$ m²', '$87.64$ m²', '$1920$ m²'],
          answer: 0,
          working: '$s = 16$, so the area is $\\sqrt{16 \\times 8 \\times 5 \\times 3} = \\sqrt{1920} \\approx 43.82$ m².',
        },
      ],
      lines: [
        { say: 'Your turn. A field has sides of eight, eleven and thirteen metres. Find its area. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The semi-perimeter is sixteen, so the area is the square root of sixteen times eight times five times three, which is the square root of one thousand nine hundred and twenty, about forty-three point eight two square metres. Choice D forgets the square root.', show: 'q.answer' },
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
          items: ['$s = \\dfrac{a + b + c}{2}$, half the perimeter.', 'Area $= \\sqrt{s(s - a)(s - b)(s - c)}$.', 'Height from a side $= \\dfrac{2 \\times \\text{Area}}{\\text{base}}$.', 'Split a quadrilateral along a diagonal and add.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The semi-perimeter is half the perimeter.', show: 'sum.0' },
        { say: 'Heron’s formula gives the area as the square root of s times s minus each side.', show: 'sum.1' },
        { say: 'The height from a side is twice the area divided by that side.', show: 'sum.2' },
        { say: 'And a quadrilateral splits into two triangles along a diagonal, so add their areas. See you in the next lesson!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
