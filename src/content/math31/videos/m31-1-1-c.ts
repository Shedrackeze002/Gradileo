import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { domainLine } from './lib/m31-1-figures.ts';
import { numbers, piece, plane, spot, tag } from './lib/m31-2-graphs.ts';

// y = √(5 − x): it starts at (5, 0) and runs to the left.
const g = plane({ x: [-3, 7], y: [-1, 4], every: 0 });
const root = (id: string) =>
  figure(id, [
    g,
    numbers(g, 1, 1),
    piece(g, { id: 'c', f: (x) => Math.sqrt(5 - x), from: -3, to: 5, samples: 400 }),
    spot(g, 'end', 5, 0, { tex: '(5, 0)', place: 'above right', tone: 'theta' }),
    tag(g, 'name', 1.2, 3.4, 'y = \\sqrt{5 - x}', 'right', 'brand'),
    tag(g, 'none', 6, 2.4, '\\text{nothing}', 'center', 'bad'),
  ]);

const video: Explainer = {
  id: 'm31-1-1-c',
  lessonId: 'm31-1-1',
  title: 'Functions for Calculus, Part 3: The Domain of a Composite Function',
  thumbnailTitle: 'The Domain of a Composite',
  thumbnail: 'r1',
  summary: 'A composite function f(g(x)) is defined only when x is in the domain of g and g(x) is in the domain of f. The domain of √(5 − x) is x ≤ 5, the domain of 1/(√x − 3) is x ≥ 0 with x ≠ 9, and the domain of (√x)² is x ≥ 0 even though it simplifies to x: find the domain before simplifying.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Precalculus Review · Part 3', title: 'The Domain of a Composite Function', subtitle: 'Both steps have to work' }],
      lines: [
        { say: 'Some functions cannot accept every number. You cannot take the square root of a negative number, and you cannot divide by zero.', show: 'title' },
        { say: 'When two functions are put together, either one can refuse an input. In this video, you will find the domain of a composite function: every x for which it gives an answer.' },
      ],
    },
    {
      chapter: 'Both steps must work',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'The domain of f ∘ g', md: '$(f \\circ g)(x) = f(g(x))$ is defined only when **both** steps work: $x$ is in the domain of $g$, **and** the output $g(x)$ is in the domain of $f$.' },
        { kind: 'bullets', id: 'b', items: ['Step 1: can $g$ accept $x$?', 'Step 2: can $f$ accept the output $g(x)$?'] },
      ],
      lines: [
        { say: 'Think of the two machines again. The number x goes into g first, and the output, g of x, goes into f.', show: 'key' },
        { say: 'If g cannot accept x, there is nothing to pass on, and the composite gives no answer.', show: 'b.0', focus: 'b.0' },
        { say: 'And even when g gives an output, f might not be able to accept it. Then the composite gives no answer either.', show: 'b.1', focus: 'b.1' },
        { say: 'So x is in the domain of f circle g only when both steps work.', focus: 'key' },
      ],
    },
    {
      chapter: 'A square root',
      layout: 'split',
      leftWidth: 600,
      left: [root('r1')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['f(x) = \\sqrt{x}, \\quad g(x) = 5 - x', '(f \\circ g)(x) = \\sqrt{5 - x}', '5 - x \\ge 0', 'x \\le 5', '(-\\infty,\\, 5]'] }],
      lines: [
        { say: 'Let f of x equal the square root of x, and g of x equal five minus x. Find the domain of f circle g.', show: 'm.0', focus: 'm.0' },
        { say: 'First, write the composite. f of g of x is the square root of five minus x.', show: 'm.1', focus: 'm.1' },
        { say: 'The function g, five minus x, accepts every number. But f is a square root, so its input cannot be negative. The number under the root, five minus x, must be zero or more.', show: 'm.2', focus: 'm.2' },
        { say: 'Five minus x is at least zero when x is at most five. So the domain is x less than or equal to five.', show: 'm.3', focus: 'm.3' },
        { say: 'In interval notation, that is negative infinity to five, with a square bracket at five, because five is included.', show: 'm.4', focus: 'm.4' },
        { say: 'The graph agrees. It starts at the point at five, zero, and runs to the left. To the right of five, there is nothing: the root of a negative number is not a real number.', show: ['r1.grid', 'r1.axes', 'r1.c', 'r1.name', 'r1.end', 'r1.none'], focus: ['r1.end', 'r1.c'] },
      ],
    },
    {
      chapter: 'Two restrictions',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['f(x) = \\dfrac{1}{x - 3}, \\quad g(x) = \\sqrt{x} \\qquad (f \\circ g)(x) = \\dfrac{1}{\\sqrt{x} - 3}', '\\text{Step 1: } x \\ge 0 \\qquad \\text{Step 2: } \\sqrt{x} \\ne 3, \\text{ so } x \\ne 9'] },
        figure('nl', [domainLine({ min: 0, max: 12, length: 14, spans: [{ id: 's1', from: 0, to: 9, closedFrom: true }, { id: 's2', from: 9, to: Infinity }] })], 130),
        { kind: 'math', id: 'ans', size: 'md', lines: ['[0, 9) \\cup (9, \\infty)'] },
      ],
      lines: [
        { say: 'Now a function with two restrictions. Let f of x equal one over x minus three, and g of x equal the square root of x. Then f of g of x is one over the square root of x, minus three.', show: 'm.0', focus: 'm.0' },
        { say: 'Step one: can g accept x? g is a square root, so x must be zero or more.', show: 'm.1', focus: 'm.1' },
        { say: 'Step two: can f accept the output? f divides by its input minus three, so its input cannot be three. The input is the square root of x, and the square root of x is three when x is nine. So x cannot be nine.', focus: 'm.1' },
        { say: 'Put them together: x is zero or more, but not nine.', show: ['nl.axis', 'nl.s1', 'nl.s2'] },
        { say: 'In interval notation, that is zero to nine, and nine to infinity. The square bracket at zero includes it; the round brackets at nine leave nine out.', show: 'ans', focus: 'ans' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Simplifying away a restriction', md: 'Find the domain **before** you simplify. For $f(x) = x^2$ and $g(x) = \\sqrt{x}$, the formula simplifies to $x$, but $g$ still only accepts $x \\ge 0$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['(f \\circ g)(x) = (\\sqrt{x})^2 = x', '(f \\circ g)(-4) = (\\sqrt{-4})^2 \\quad \\bad{\\text{undefined}}', '\\text{Domain: } x \\ge 0'] },
      ],
      lines: [
        { say: 'Here is a trap. Let f of x equal x squared, and g of x equal the square root of x. Then f of g of x is the square root of x, squared, which simplifies to just x.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'The simplified formula, x, looks as if it accepts every number. But try x equals negative four. The first step is the square root of negative four, which is not a real number. So the composite gives no answer.', show: 'm.1', focus: 'm.1' },
        { say: 'The domain is still x greater than or equal to zero. Find the domain from the original steps, before you simplify.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Let $f(x) = \\sqrt{x}$ and $g(x) = 8 - 2x$. Find the domain of $f \\circ g$.',
          choices: ['$x \\le 4$', '$x \\ge 4$', '$x \\ge 0$', '$x \\le 8$'],
          answer: 0,
          working: '$(f \\circ g)(x) = \\sqrt{8 - 2x}$ needs $8 - 2x \\ge 0$, so $8 \\ge 2x$, and $x \\le 4$.',
        },
      ],
      lines: [
        { say: 'Your turn. Let f of x equal the square root of x, and g of x equal eight minus two x. Find the domain of f circle g. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The composite is the square root of eight minus two x, so eight minus two x must be zero or more. That means two x is at most eight, so x is at most four. Choice B forgets to reverse the inequality when dividing by negative two.', show: 'q.answer' },
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
          items: ['$x$ is in the domain of $f \\circ g$ when $g$ accepts $x$ **and** $f$ accepts $g(x)$.', 'Square roots need an input of zero or more; a denominator cannot be zero.', 'Find the domain before you simplify the formula.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A number x is in the domain of f circle g when g accepts x, and f accepts the output, g of x.', show: 'sum.0' },
        { say: 'Watch for square roots, which need an input of zero or more, and for denominators, which cannot be zero.', show: 'sum.1' },
        { say: 'And find the domain before you simplify. In the next part, we meet the difference quotient, the expression that leads to the derivative. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
