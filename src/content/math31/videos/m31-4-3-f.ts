import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm31-4-3-f',
  lessonId: 'm31-4-3',
  title: 'The Chain Rule, Part 6: Nested Functions and Applications',
  thumbnailTitle: 'Nested Functions',
  thumbnail: false,
  summary: 'Applying the chain rule once for each layer, from the outside in: y = [(2x − 5)² − 2]⁴ has dy/dx = 16(2x − 5)[(2x − 5)² − 2]³. Then a rate of change: with the model v(T) = 20√(T + 273) m/s for the speed of sound at T °C, v′(16) = 10/17 ≈ 0.59 m/s per degree Celsius.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Differentiation Rules · Part 6', title: 'Nested Functions', subtitle: 'One chain rule for each layer' }],
      lines: [
        { say: 'Some functions have a function inside a function inside a function, like the layers of an onion. The chain rule still works: you use it once for each layer.', show: 'title' },
        { say: 'In this video, you will differentiate a function with three layers, and use the chain rule to find how fast the speed of sound changes with temperature.' },
      ],
    },
    {
      chapter: 'Three layers',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Differentiate $y = \\left[(2x - 5)^{2} - 2\\right]^{4}$.' },
        {
          kind: 'table',
          id: 't',
          head: ['Layer', 'Function', 'Its derivative'],
          rows: [
            ['outside', '$[\\ \\cdot\\ ]^{4}$', '$4\\left[(2x - 5)^{2} - 2\\right]^{3}$'],
            ['middle', '$(\\ \\cdot\\ )^{2} - 2$', '$2(2x - 5)$'],
            ['inside', '$2x - 5$', '$2$'],
          ],
        },
      ],
      lines: [
        { say: 'Differentiate y equals: two x minus five, squared, minus two, all to the fourth.', show: 'q' },
        { say: 'Peel the layers from the outside in. The outside layer raises everything to the fourth. Its derivative brings the four down and lowers the power to three, leaving everything inside as it is.', show: 't.0', focus: 't.0' },
        { say: 'The middle layer squares two x minus five, then subtracts two. Its derivative is two times two x minus five. The minus two is a constant, so it has derivative zero.', show: 't.1', focus: 't.1' },
        { say: 'And the inside layer is two x minus five, with derivative two.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Multiply the layers',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\dfrac{dy}{dx} = \\opp{4\\left[(2x - 5)^{2} - 2\\right]^{3}} \\cdot \\thc{2(2x - 5)} \\cdot \\adj{2}',
            '= \\good{16(2x - 5)\\left[(2x - 5)^{2} - 2\\right]^{3}}',
          ],
        },
        { kind: 'callout', id: 'key', tone: 'key', title: 'One factor per layer', md: 'Apply the chain rule once for each layer, from the outside in, and multiply all the factors.' },
      ],
      lines: [
        { say: 'The chain rule multiplies the derivatives of all the layers: four times the outside cubed, times two times two x minus five, times two.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiply the numbers: four times two times two is sixteen. So d y by d x is sixteen times two x minus five, times the outside bracket, cubed.', show: 'm.1', focus: 'm.1' },
        { say: 'So with several layers, use the chain rule once for each layer, from the outside in, and multiply all the factors.', show: 'key' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Stopping one layer early', md: 'Every layer gives a factor. Forgetting the innermost one, the $2$ from $2x - 5$, gives half the right answer.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{4\\left[(2x - 5)^{2} - 2\\right]^{3}\\cdot 2(2x - 5) = 8(2x - 5)\\left[(2x - 5)^{2} - 2\\right]^{3}}', '\\good{16(2x - 5)\\left[(2x - 5)^{2} - 2\\right]^{3}}'] },
      ],
      lines: [
        { say: 'With several layers, it is easy to stop one layer too early. A common mistake is to differentiate the outside and the middle, but forget the inside, two x minus five.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'That loses the factor of two, and gives eight instead of sixteen. Keep going until you reach plain x.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'The speed of sound',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'A model for the speed of sound in air at $T$ °C is $v(T) = 20\\sqrt{T + 273}$ m/s. How fast does the speed change with temperature at $16$ °C?' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['v(T) = 20(T + 273)^{1/2}', 'v\'(T) = 20\\cdot\\tfrac{1}{2}(T + 273)^{-1/2}\\cdot 1 = \\dfrac{10}{\\sqrt{T + 273}}', 'v\'(16) = \\dfrac{10}{\\sqrt{289}} = \\dfrac{10}{17} \\approx \\good{0.59}'],
        },
      ],
      lines: [
        { say: 'Now an application. A model for the speed of sound in air, at T degrees Celsius, is v of T equals twenty times the square root of T plus 273, in metres per second. How fast does the speed change with temperature at sixteen degrees?', show: 'q' },
        { say: 'Rewrite the root as a power: twenty times T plus 273, to the one half.', show: 'm.0', focus: 'm.0' },
        { say: 'By the chain rule: twenty times one half, times T plus 273 to the negative one half, times the derivative of the inside, which is one. That simplifies to ten over the square root of T plus 273.', show: 'm.1', focus: 'm.1' },
        { say: 'At sixteen degrees, T plus 273 is 289, whose square root is seventeen. So v prime of sixteen is ten over seventeen, which is about 0.59.', show: 'm.2', focus: 'm.2' },
        { say: 'The units are metres per second, per degree Celsius. So at sixteen degrees, the speed of sound increases by about 0.59 metres per second for each degree warmer.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Using the model $v(T) = 20\\sqrt{T + 273}$ m/s, with $v\'(T) = \\dfrac{10}{\\sqrt{T + 273}}$, find $v\'(127)$.',
          choices: ['$0.5$ m/s per °C', '$20$ m/s per °C', '$0.025$ m/s per °C', '$1$ m/s per °C'],
          answer: 0,
          working: '$v\'(127) = \\dfrac{10}{\\sqrt{127 + 273}} = \\dfrac{10}{\\sqrt{400}} = \\dfrac{10}{20} = 0.5$ m/s per °C.',
        },
      ],
      lines: [
        { say: 'Your turn. Using the same model, with v prime of T equals ten over the square root of T plus 273, find v prime of 127. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. 127 plus 273 is 400, whose square root is twenty. Ten over twenty is 0.5 metres per second, per degree. Choice C forgets the square root, and divides ten by 400.', show: 'q.answer' },
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
            'With several layers, apply the chain rule once for each layer, from the outside in.',
            'Multiply all the factors, and keep going until you reach plain $x$.',
            'A derivative’s units are (units of the output) per (unit of the input).',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. With several layers, apply the chain rule once for each layer, from the outside in.', show: 'sum.0' },
        { say: 'Multiply all the factors, and keep going until you reach plain x.', show: 'sum.1' },
        { say: 'And give a rate of change its units: units of the output, per unit of the input. In the next unit, we find the derivatives of trigonometric, exponential and logarithmic functions. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
