import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'mx-19-4',
  lessonId: 'mx-19-4',
  title: 'Integration by Parts',
  thumbnail: 'f',
  summary: 'Reading the product rule backwards gives integration by parts: ∫u (dv/dx) dx = uv − ∫v (du/dx) dx. Let u be the power of x, so ∫x eˣ dx = x eˣ − eˣ + C, except when there is a ln x: then u = ln x, so ∫ln x dx = x ln x − x + C and ∫₁ᵉ ln x dx = 1. For x² times something, use parts twice.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Pure: Further Calculus and Numerical Methods', title: 'Integration by Parts', subtitle: 'The product rule, backwards' }],
      lines: [
        { say: 'The product rule tells us how to differentiate a product, such as x times e to the x. But how do we integrate one?', show: 'title' },
        { say: 'Reading the product rule backwards gives a method called integration by parts. In this video, you will learn the formula, and how to choose the parts.' },
      ],
    },
    {
      chapter: 'The formula',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\int u\\frac{dv}{dx}\\,dx = uv - \\int v\\frac{du}{dx}\\,dx'] },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Choosing u', md: 'Let $u$ be the part that gets **simpler** when differentiated, and $\\dfrac{dv}{dx}$ a part you can **integrate**.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['u = x, \\quad \\frac{dv}{dx} = e^x \\quad\\Rightarrow\\quad \\frac{du}{dx} = 1, \\quad v = e^x', '\\int xe^x\\,dx = xe^x - \\int e^x\\,dx = xe^x - e^x + C'] },
      ],
      lines: [
        { say: 'Integrating the product rule gives this formula. The integral of u times d v by d x is u v, minus the integral of v times d u by d x.', show: 'f', focus: 'f' },
        { say: 'The trick is to choose u so that it gets simpler when you differentiate it, and d v by d x so that you can integrate it.', show: 'def' },
        { say: 'Find the integral of x e to the x. Let u be x, which differentiates to one, and let d v by d x be e to the x, so v is also e to the x.', show: 'm.0', focus: 'm.0' },
        { say: 'Then the integral is x e to the x, minus the integral of e to the x. That leaves x e to the x, minus e to the x, plus C.', show: 'm.1', focus: 'm.1' },
        { say: 'You can check it by differentiating with the product rule: you get back x e to the x.' },
      ],
    },
    {
      chapter: 'Logs and limits',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'mis', tone: 'mistake', title: 'With ln x, let u = ln x', md: '$\\ln x$ is hard to integrate but easy to differentiate. Even $\\displaystyle\\int \\ln x\\,dx$ works, with $\\dfrac{dv}{dx} = 1$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\int \\ln x\\,dx = x\\ln x - \\int x \\cdot \\frac{1}{x}\\,dx = x\\ln x - x + C', '\\int_1^e \\ln x\\,dx = \\big[x\\ln x - x\\big]_1^e = (e - e) - (0 - 1) = 1'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Twice for x²', md: 'For $\\displaystyle\\int x^2e^x\\,dx$, the first step leaves $\\displaystyle\\int 2xe^x\\,dx$, so use parts again.' },
      ],
      lines: [
        { say: 'There is one exception to letting u be the power of x. When there is a log, let u be ln x, because ln x is easy to differentiate but hard to integrate.', show: 'mis' },
        { say: 'Even the integral of ln x on its own works this way. Let u be ln x and d v by d x be one, so v is x. The integral is x ln x minus the integral of one, which is x ln x minus x, plus C.', show: 'm.0', focus: 'm.0' },
        { say: 'With limits, work out u v between the limits as well. From one to e, the integral of ln x is e minus e, minus zero minus one, which is exactly one.', show: 'm.1', focus: 'm.1' },
        { say: 'For x squared times e to the x, the first step leaves an integral of two x e to the x. So use integration by parts a second time.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $\\displaystyle\\int x\\cos x\\,dx$.',
          choices: ['$x\\sin x + \\cos x + C$', '$x\\sin x - \\cos x + C$', '$-x\\sin x + \\cos x + C$', '$\\tfrac{1}{2}x^2\\sin x + C$'],
          answer: 0,
          working: 'Let $u = x$ and $\\dfrac{dv}{dx} = \\cos x$, so $v = \\sin x$: $x\\sin x - \\displaystyle\\int \\sin x\\,dx = x\\sin x + \\cos x + C$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the integral of x cos x. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Let u be x and d v by d x be cos x, so v is sine x. That gives x sine x, minus the integral of sine x, which is x sine x plus cos x, plus C. Choice B gets the sign of the last term wrong, and choice D integrates each part separately.', show: 'q.answer' },
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
          items: ['$\\displaystyle\\int u\\frac{dv}{dx}\\,dx = uv - \\int v\\frac{du}{dx}\\,dx$.', 'Let $u$ be the power of $x$, unless there is a $\\ln x$: then $u = \\ln x$.', 'Check by differentiating with the product rule.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The integral of u times d v by d x is u v, minus the integral of v times d u by d x.', show: 'sum.0' },
        { say: 'Let u be the power of x, unless there is a log: then u is ln x.', show: 'sum.1' },
        { say: 'And check your answer by differentiating it. In the next lesson, we integrate fractions by splitting them into partial fractions. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
