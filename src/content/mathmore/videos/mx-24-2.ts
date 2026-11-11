import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'mx-24-2',
  lessonId: 'mx-24-2',
  title: 'Joint and Partial Variation',
  thumbnail: 'm',
  summary: 'z varies jointly as x and y when z = kxy, and z varies directly as x and inversely as y when z = kx/y, with one constant k found from one set of values. In partial variation, y = a + bx: a constant part plus a part that varies, like a taxi fare with a fixed charge. Two pairs of values give two equations for a and b.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Formulae, Variation and Linear Programming', title: 'Joint and Partial Variation', subtitle: 'When one quantity depends on more than one thing' }],
      lines: [
        { say: 'A taxi fare is not simply proportional to the distance, because there is a fixed charge before the taxi moves at all. And the volume of a cylinder depends on two things at once.', show: 'title' },
        { say: 'In this video, you will learn to work with joint variation and partial variation.' },
      ],
    },
    {
      chapter: 'Joint variation',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Joint variation', md: '$z$ varies jointly as $x$ and $y$: $z = kxy$. $z$ varies directly as $x$ and inversely as $y$: $z = \\dfrac{kx}{y}$.' },
        { kind: 'text', id: 'q', md: '$z$ varies jointly as $x$ and $y$, and $z = 30$ when $x = 2$, $y = 5$. Find $z$ when $x = 4$, $y = 3$.', size: 'md' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['30 = k \\times 2 \\times 5 \\ \\Rightarrow \\ k = 3', 'z = 3 \\times 4 \\times 3 = 36'] },
      ],
      lines: [
        { say: 'A quantity varies jointly as two others when it is directly proportional to their product. It can also vary directly as one quantity and inversely as another. Either way, one constant, k, links them all.', show: 'def' },
        { say: 'We use three steps: write the rule with k, find k from the given values, and then use the rule.', show: 'q' },
        { say: 'Thirty equals k times two times five, which is ten k, so k is three.', show: 'm.0', focus: 'm.0' },
        { say: 'Then z is three times four times three, which is thirty-six.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Directly and inversely',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: '$z$ varies directly as $x$ and inversely as $y^2$, and $z = 9$ when $x = 3$, $y = 2$. Find $z$ when $x = 5$, $y = 3$.', size: 'md' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['z = \\dfrac{kx}{y^2}', '9 = \\dfrac{3k}{4} \\ \\Rightarrow \\ k = 12', 'z = \\dfrac{12 \\times 5}{9} \\approx 6.67'] },
      ],
      lines: [
        { say: 'Here z varies directly as x and inversely as the square of y.', show: 'q' },
        { say: 'So z equals k x over y squared. There is one constant, not one for x and another for y.', show: 'm.0', focus: 'm.0' },
        { say: 'Nine equals three k over four, so k is nine times four over three, which is twelve.', show: 'm.1', focus: 'm.1' },
        { say: 'Then z is twelve times five over nine, about six point six seven.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Partial variation',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Partial variation', md: 'A constant part plus a part that varies: $C = a + bd$.' },
        { kind: 'text', id: 'q', md: 'A taxi ride of $4$ km costs \\$11 and one of $10$ km costs \\$20. Find the cost of $16$ km.', size: 'md' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['11 = a + 4b, \\quad 20 = a + 10b', '9 = 6b \\ \\Rightarrow \\ b = 1.5, \\quad a = 5', 'C = 5 + 1.5 \\times 16 = 29'] },
      ],
      lines: [
        { say: 'In partial variation, a quantity is the sum of two parts: one part is constant, and the other varies directly. A taxi fare is a fixed charge plus a charge for each kilometre.', show: 'def' },
        { say: 'A ride of four kilometres costs eleven dollars, and a ride of ten kilometres costs twenty dollars. There are two constants, so we need these two pairs of values.', show: 'q' },
        { say: 'Each pair gives an equation.', show: 'm.0', focus: 'm.0' },
        { say: 'Subtracting the first from the second gives nine equals six b, so b is one point five. Then "a" is eleven minus six, which is five.', show: 'm.1', focus: 'm.1' },
        { say: 'So the fixed charge is five dollars, and each kilometre costs one dollar and fifty cents. Sixteen kilometres cost twenty-nine dollars.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: '$P$ varies jointly as $m$ and $n$, and $P = 24$ when $m = 2$, $n = 3$. Find $P$ when $m = 5$, $n = 2$.',
          choices: ['$40$', '$20$', '$60$', '$36$'],
          answer: 0,
          working: '$24 = 6k$, so $k = 4$. Then $P = 4 \\times 5 \\times 2 = 40$.',
        },
      ],
      lines: [
        { say: 'Your turn. P varies jointly as m and n. Find P when m is five and n is two. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Twenty-four equals six k, so k is four. Then P is four times five times two, which is forty. Choice B forgets the constant.', show: 'q.answer' },
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
          items: ['Jointly: $z = kxy$.', 'Directly as $x$, inversely as $y$: $z = \\dfrac{kx}{y}$.', 'Partial variation: $y = a + bx$.', 'One set of values finds $k$; two pairs find $a$ and $b$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. When z varies jointly as x and y, z equals k x y.', show: 'sum.0' },
        { say: 'When z varies directly as x and inversely as y, z equals k x over y.', show: 'sum.1' },
        { say: 'Partial variation has a constant part plus a part that varies. On a graph it is a straight line that does not pass through the origin.', show: 'sum.2' },
        { say: 'Joint variation needs one set of values to find k, while partial variation needs two pairs. See you in the next lesson!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
