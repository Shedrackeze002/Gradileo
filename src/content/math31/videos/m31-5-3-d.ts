import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm31-5-3-d',
  lessonId: 'm31-5-3',
  title: 'Implicit Differentiation and Higher Derivatives, Part 4: Patterns in Derivatives',
  thumbnailTitle: 'Patterns in Derivatives',
  thumbnail: false,
  summary: 'The derivatives of sin x repeat every four: cos x, −sin x, −cos x, sin x. Since 27 = 4(6) + 3, the 27th derivative of sin x equals the third, −cos x. Each derivative of e²ˣ multiplies by 2, so the nth derivative is 2ⁿe²ˣ.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Transcendental Functions and Implicit Differentiation · Part 4', title: 'Patterns in Derivatives', subtitle: 'The 27th derivative without 27 steps' }],
      lines: [
        { say: 'What is the 27th derivative of sine x? Differentiating 27 times would take a while.', show: 'title' },
        { say: 'In this video, you will spot the patterns in repeated derivatives, and use them to jump straight to any derivative you need.' },
      ],
    },
    {
      chapter: 'The derivatives of sine',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Derivative', '1st', '2nd', '3rd', '4th'],
          rows: [['of $\\sin x$', '$\\cos x$', '$-\\sin x$', '$-\\cos x$', '$\\sin x$']],
        },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\sin x \\ \\to\\ \\cos x \\ \\to\\ -\\sin x \\ \\to\\ -\\cos x \\ \\to\\ \\sin x \\ \\to\\ \\cdots'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'A cycle of four', md: 'The derivatives of $\\sin x$ repeat every $4$: the 5th is the 1st again, the 6th is the 2nd, and so on.' },
      ],
      lines: [
        { say: 'Start differentiating sine x. The first derivative is cosine x.', show: 't' },
        { say: 'The second derivative is the derivative of cosine x: negative sine x. The third is negative cosine x.' },
        { say: 'And the fourth is the derivative of negative cosine x, which is sine x: right back where we started.', show: 'm.0', focus: 'm.0' },
        { say: 'So the derivatives of sine x repeat in a cycle of four. The fifth derivative is the same as the first, the sixth is the same as the second, and so on.', show: 'key' },
      ],
    },
    {
      chapter: 'The 27th derivative',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['27 = 4(6) + \\opp{3}', '\\frac{d^{27}}{dx^{27}}\\sin x = \\frac{d^{\\opp{3}}}{dx^{\\opp{3}}}\\sin x = -\\cos x'],
        },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Divide by the length of the cycle', md: 'Divide by $4$. The **remainder** tells you where in the cycle you land; a remainder of $0$ means the 4th derivative, $\\sin x$ itself.' },
      ],
      lines: [
        { say: 'Now the 27th derivative. Every four derivatives bring us back to sine x, so divide 27 by four. Four goes into 27 six times, with a remainder of three.', show: 'm.0', focus: 'm.0' },
        { say: 'After 24 derivatives, six full cycles, we are back at sine x. Three more derivatives remain, so the 27th derivative equals the third derivative: negative cosine x.', show: 'm.1', focus: 'm.1' },
        { say: 'In general, divide by the length of the cycle, and the remainder tells you where you land. A remainder of zero means a whole number of cycles: you are back at sine x itself.', show: 'tip' },
      ],
    },
    {
      chapter: 'Powers of two',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\frac{d}{dx}e^{2x} = 2e^{2x}',
            '\\frac{d^{2}}{dx^{2}}e^{2x} = 4e^{2x} = 2^{2}e^{2x}',
            '\\frac{d^{3}}{dx^{3}}e^{2x} = 8e^{2x} = 2^{3}e^{2x}',
            '\\frac{d^{n}}{dx^{n}}e^{2x} = 2^{n}e^{2x}',
          ],
        },
      ],
      lines: [
        { say: 'Here is another pattern. By the chain rule, the derivative of e to the two x is two e to the two x.', show: 'm.0', focus: 'm.0' },
        { say: 'Differentiate again, and the chain rule multiplies by two once more: four e to the two x, which is two squared times e to the two x.', show: 'm.1', focus: 'm.1' },
        { say: 'The third derivative is eight e to the two x: two cubed times e to the two x.', show: 'm.2', focus: 'm.2' },
        { say: 'Each derivative multiplies by another two. So the n-th derivative of e to the two x is two to the n, times e to the two x.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find the 50th derivative of $\\cos x$.',
          choices: ['$\\cos x$', '$-\\cos x$', '$-\\sin x$', '$\\sin x$'],
          answer: 1,
          working: 'The derivatives of $\\cos x$ are $-\\sin x$, $-\\cos x$, $\\sin x$, $\\cos x$, repeating every $4$. $50 = 4(12) + 2$, so the 50th derivative equals the 2nd: $-\\cos x$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the fiftieth derivative of cosine x. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. The derivatives of cosine x are negative sine x, negative cosine x, sine x and cosine x, and then they repeat. Fifty is four times twelve, plus two, so the fiftieth derivative equals the second: negative cosine x. Choice A would be right for the 48th derivative.', show: 'q.answer' },
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
            'The derivatives of $\\sin x$ and $\\cos x$ repeat every $4$.',
            'Divide by $4$: the remainder tells you which derivative you land on.',
            'Each derivative of $e^{2x}$ multiplies by $2$: $\\dfrac{d^{n}}{dx^{n}}e^{2x} = 2^{n}e^{2x}$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The derivatives of sine x and cosine x repeat every four.', show: 'sum.0' },
        { say: 'To find a high derivative, divide by four: the remainder tells you which derivative you land on.', show: 'sum.1' },
        { say: 'And each derivative of e to the two x multiplies by two, so the n-th derivative is two to the n, times e to the two x. In the next part, we find second derivatives implicitly. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
