import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { gearTrain } from './lib/m31-4-figures.ts';

// Three linked gears: u turns 3 times as fast as x, and y turns 2 times as fast as u, so 6 times as fast as x.
const gears = figure('gs', [
  gearTrain([
    { id: 'gx', name: 'x', r: 2.4, teeth: 24, tone: 'adj', caption: '\\text{once}' },
    { id: 'gu', name: 'u', r: 0.8, teeth: 8, tone: 'theta', caption: '3\\text{ times}', captionY: -1.05 },
    { id: 'gy', name: 'y', r: 0.4, teeth: 4, tone: 'opp', caption: '6\\text{ times}', captionY: -1.9 },
  ]),
]);

const video: Explainer = {
  id: 'm31-4-3',
  lessonId: 'm31-4-3',
  title: 'The Chain Rule, Part 1: Rates That Multiply',
  thumbnailTitle: 'The Chain Rule',
  thumbnail: 'gs',
  summary: 'Rates of change multiply: if gear u turns 3 times as fast as gear x, and gear y turns 2 times as fast as u, then y turns 6 times as fast as x. A composite function y = f(g(x)) has an inside and an outside function, and the chain rule dy/dx = dy/du · du/dx, or f′(g(x)) · g′(x), says: differentiate the outside, leaving the inside alone, then multiply by the derivative of the inside.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Differentiation Rules · Part 1', title: 'Rates That Multiply', subtitle: 'The chain rule for a function inside a function' }],
      lines: [
        { say: 'To differentiate two x plus one, all to the tenth, with the power rule alone, you would have to multiply out ten brackets first. There is a much better way.', show: 'title' },
        { say: 'In this video, you will see how rates of change multiply, and meet the chain rule, which differentiates a function inside another function.' },
      ],
    },
    {
      chapter: 'Linked gears',
      layout: 'split',
      leftWidth: 600,
      left: [gears],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['x \\xrightarrow{\\ \\times 3\\ } u \\xrightarrow{\\ \\times 2\\ } y', '2 \\times 3 = 6'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Rates multiply', md: 'When one change causes another, which causes a third, the rates of change **multiply**.' },
      ],
      lines: [
        { say: 'Picture three linked gears. As the big gear, x, turns once, the smaller gear, u, turns three times. It turns three times as fast as x.', show: ['gs.gx', 'gs.gu', 'm.0'], focus: ['gs.gx', 'gs.gu'] },
        { say: 'The smallest gear, y, turns two times as fast as gear u.', show: 'gs.gy', focus: ['gs.gu', 'gs.gy'] },
        { say: 'So how fast does y turn compared with x? For each turn of x, u turns three times, and for each of those turns, y turns twice. That is two times three: six times as fast.', show: 'm.1', focus: ['gs', 'm.1'] },
        { say: 'Rates of change multiply in the same way. When one change causes a second, which causes a third, you multiply the rates.', show: 'key' },
      ],
    },
    {
      chapter: 'Inside and outside',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['y = \\left(\\adj{3x^{2} + 1}\\right)^{\\opp{4}}', '\\text{inside: } u = \\adj{3x^{2} + 1} \\qquad \\text{outside: } y = \\opp{u^{4}}'] },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Composite function', md: 'In $y = f(g(x))$, the **inside** function $g$ acts on $x$ first, and the **outside** function $f$ acts on the result.' },
      ],
      lines: [
        { say: 'Functions can be linked like gears. Take y equals three x squared plus one, all to the fourth.', show: 'm.0', focus: 'm.0' },
        { say: 'To work it out for a number x, you first find three x squared plus one. Call that the inside function, u. Then you raise u to the fourth. Call that the outside function.', show: 'm.1', focus: 'm.1' },
        { say: 'A function made this way is called a composite function: y equals f of g of x. The inside function, g, acts on x first, and the outside function, f, acts on the result.', show: 'def' },
        { say: 'Changing x changes u, and changing u changes y, just like the gears.' },
      ],
    },
    {
      chapter: 'The chain rule',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Chain rule', md: 'If $y = f(u)$ and $u = g(x)$, so that $y = f(g(x))$, then the derivative is below. Differentiate the **outside** function, leaving the inside alone, then multiply by the derivative of the **inside**.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{dy}{dx} = \\opp{\\dfrac{dy}{du}} \\cdot \\adj{\\dfrac{du}{dx}}', '\\dfrac{d}{dx}f(g(x)) = \\opp{f\'(g(x))} \\cdot \\adj{g\'(x)}'] },
      ],
      lines: [
        { say: 'Here is the chain rule. If y is a function of u, and u is a function of x, then d y by d x equals d y by d u, times d u by d x.', show: ['def', 'm.0'], focus: 'm.0' },
        { say: 'It is just like the gears: the rate of y compared with x is the rate of y compared with u, times the rate of u compared with x.' },
        { say: 'In function notation: the derivative of f of g of x is f prime of g of x, times g prime of x.', show: 'm.1', focus: 'm.1' },
        { say: 'In words: differentiate the outside function, leaving the inside alone. Then multiply by the derivative of the inside.', focus: 'def' },
      ],
    },
    {
      chapter: 'Why it works',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{\\Delta y}{\\Delta x} = \\dfrac{\\Delta y}{\\Delta u} \\cdot \\dfrac{\\Delta u}{\\Delta x}', '\\downarrow \\qquad\\quad \\downarrow \\qquad\\quad \\downarrow', '\\dfrac{dy}{dx} = \\dfrac{dy}{du} \\cdot \\dfrac{du}{dx}'] },
        { kind: 'text', id: 't', size: 'md', align: 'center', md: 'A complete proof also handles the case $\\Delta u = 0$.' },
      ],
      lines: [
        { say: 'Why does it work? A small change in x, delta x, causes a change in u, delta u, which causes a change in y, delta y.', show: 'm.0', focus: 'm.0' },
        { say: 'When delta u is not zero, delta y over delta x equals delta y over delta u, times delta u over delta x. The two delta u terms cancel, as with ordinary fractions.' },
        { say: 'As delta x approaches zero, delta u approaches zero too. So the three ratios approach d y by d x, d y by d u, and d u by d x.', show: ['m.1', 'm.2'], focus: 'm.2' },
        { say: 'This is the idea of the proof. A complete proof also has to handle the case where delta u is zero, but the result is the same.', show: 't' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'If $y$ changes $5$ times as fast as $u$, and $u$ changes $4$ times as fast as $x$, how many times as fast as $x$ does $y$ change?',
          choices: ['$9$', '$1.25$', '$20$', '$5$'],
          answer: 2,
          working: 'Rates of change multiply: $\\dfrac{dy}{dx} = \\dfrac{dy}{du}\\cdot\\dfrac{du}{dx} = 5 \\times 4 = 20$.',
        },
      ],
      lines: [
        { say: 'Your turn. If y changes five times as fast as u, and u changes four times as fast as x, how many times as fast as x does y change? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Rates of change multiply: d y by d x is d y by d u, times d u by d x, which is five times four: twenty. Choice A adds the rates instead of multiplying them.', show: 'q.answer' },
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
            'In $y = f(g(x))$, $g$ is the inside function and $f$ the outside function.',
            'Chain rule: $\\dfrac{dy}{dx} = \\dfrac{dy}{du}\\cdot\\dfrac{du}{dx}$, or $f\'(g(x))\\cdot g\'(x)$.',
            'Differentiate the outside, leaving the inside alone, then multiply by the derivative of the inside.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In a composite function, f of g of x, g is the inside function and f is the outside function.', show: 'sum.0' },
        { say: 'The chain rule says d y by d x equals d y by d u, times d u by d x: f prime of g of x, times g prime of x.', show: 'sum.1' },
        { say: 'In words: differentiate the outside, leaving the inside alone, then multiply by the derivative of the inside. In the next part, we use the chain rule on powers of polynomials. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
