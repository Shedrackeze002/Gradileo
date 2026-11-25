import type { Explainer } from '@/video/script.ts';

// Exam question for Math 31 lesson 8.4 (integration by substitution). The question is an exercise
// from OpenStax Calculus Volume 1 (section 5.5, Substitution, CC BY-NC-SA 4.0): the book's
// instruction "In the following exercises, use a change of variables to evaluate the definite
// integral." is put with the one integral it asks about. u = 1 + x², du = 2x dx, and the limits
// become 1 and 2, so the integral is (1/2)∫₁² u^(−1/2) du = √2 − 1, as in the book's answer.
// Check: d/dx √(1 + x²) = x/√(1 + x²), and √2 − 1 ≈ 0.414 is between 0 and 1/√2, the integrand's
// smallest and largest values on [0, 1].

const QUESTION = 'Use a change of variables to evaluate the definite integral ∫₀¹ x/√(1 + x²) dx.';

const I = '\\int_0^1 \\dfrac{x}{\\sqrt{1 + x^2}}\\,dx';

const video: Explainer = {
  id: 'xq-m31-8-4',
  lessonId: '',
  exam: {
    lesson: 'm31-8-4',
    source: 'OpenStax, Calculus Volume 1, Exercise in section 5.5, Substitution',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/calculus-volume-1/pages/5-5-substitution',
    question: QUESTION,
  },
  title: 'Exam Question: ∫₀¹ x/√(1 + x²) dx by Substitution (Change of Variables)',
  thumbnailTitle: 'Change the Variable, Change the Limits',
  thumbnail: 'm',
  summary:
    'A real test question, solved one small step at a time: use a change of variables to evaluate the integral from 0 to 1 of x/√(1 + x²) dx. We let u = 1 + x², so du = 2x dx and x dx = du/2. The limits change too: x = 0 gives u = 1, and x = 1 gives u = 2. The integral becomes (1/2)∫₁² u^(−1/2) du = [√u]₁² = √2 − 1 ≈ 0.414. Then we check by differentiating and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Change the Variable, Change the Limits', subtitle: 'Integration by substitution, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about integration by substitution. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Calculus textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          kicker: 'The question',
          prompt: `Use a change of variables to evaluate the definite integral $\\displaystyle${I}$.`,
          answer: '$\\sqrt{2} - 1 \\approx 0.414$',
          working: '$u = 1 + x^2$, $du = 2x\\,dx$',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book\'s exercises.', show: 'q' },
        { say: 'Use a change of variables to evaluate the integral from 0 to 1 of x over the square root of 1 plus x squared, dx.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: [I] },
        { kind: 'text', id: 't', size: 'md', md: 'There is no power rule for this as it stands. But the top, $x$, is almost the **derivative** of the inside, $1 + x^2$. That is the sign to **substitute**.' },
      ],
      lines: [
        { say: 'Here is the integral. As it stands, no simple rule fits it.', show: 'm' },
        { say: 'But look: the x on top is almost the derivative of the inside, 1 plus x squared. That is the sign to use substitution.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\int_a^b f\\big(g(x)\\big)g\'(x)\\,dx = \\int_{g(a)}^{g(b)} f(u)\\,du'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Change the limits too', md: 'In a definite integral, the limits are values of $x$. After the swap they must be values of $u$.' },
      ],
      lines: [
        { say: 'Here is what we need. Substitution is the chain rule backwards. With u equal to g of x, the integral of f of g of x, times g prime of x, becomes the integral of f of u, du.', show: 'f' },
        { say: 'And in a definite integral, change the limits too: they were values of x, and now they must be values of u.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Let $u = 1 + x^2$; find $du$', 'Change the **limits** to $u$-values', 'Integrate in $u$; **top minus bottom**'] }],
      lines: [
        { say: 'Here is the plan. Let u be 1 plus x squared, and find du.', show: 'plan.0' },
        { say: 'Change the limits to values of u.', show: 'plan.1' },
        { say: 'Integrate in u, and take top minus bottom.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Choose u',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['u = 1 + x^2 \\implies du = 2x\\,dx', '\\good{x\\,dx = \\tfrac{1}{2}\\,du}'] }],
      lines: [
        { say: 'Step one. Let u be 1 plus x squared. Then du is 2x dx.', show: 'm.0' },
        { say: 'The integral has x dx, not 2x dx, so divide by 2: x dx is one half du.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: The new limits',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['x = 0 \\implies u = 1, \\quad x = 1 \\implies u = 2', I + ' = \\good{\\dfrac{1}{2}\\int_1^2 u^{-1/2}\\,du}'] }],
      lines: [
        { say: 'Step two. When x is 0, u is 1 plus 0, which is 1. When x is 1, u is 1 plus 1, which is 2.', show: 'm.0' },
        { say: 'So the integral becomes one half, times the integral from 1 to 2 of u to the negative one half, du. Root u on the bottom is u to the one half, and it moves up as a negative power.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Integrate',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{1}{2} \\cdot \\dfrac{u^{1/2}}{1/2} = \\sqrt{u}', '\\Big[\\sqrt{u}\\Big]_1^2 = \\sqrt{2} - \\sqrt{1} = \\good{\\sqrt{2} - 1 \\approx 0.414}'] }],
      lines: [
        { say: 'Step three. Add 1 to the power: negative a half plus 1 is a half. Divide by a half. With the one half in front, that is just root u.', show: 'm.0' },
        { say: 'Top minus bottom: root 2 minus root 1. The answer is root 2 minus 1, about 0.414.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{d}{dx}\\sqrt{1 + x^2} = \\dfrac{2x}{2\\sqrt{1 + x^2}} = \\dfrac{x}{\\sqrt{1 + x^2}} \\ \\checkmark', '\\sqrt{2} - 1 = 0.414 \\text{ is between } 0 \\text{ and } \\tfrac{1}{\\sqrt{2}} \\approx 0.707 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. In x, the antiderivative is the square root of 1 plus x squared. Its derivative, by the chain rule, is 2x over 2 root of 1 plus x squared, which is our integrand.', show: 'm.0' },
        { say: 'And on 0 to 1, the integrand goes from 0 up to 1 over root 2, about 0.707. An area over a width of 1 must be between those, and 0.414 is. It checks out.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Trap', 'What goes wrong'],
          rows: [
            ['Keep the limits $0$ and $1$', 'they are $x$-values: use $u = 1$ to $2$'],
            ['$x\\,dx = du$', '$du = 2x\\,dx$, so $x\\,dx = \\tfrac{1}{2}du$'],
            ['$\\sqrt{2} - 0$', '$\\sqrt{1} = 1$, not $0$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Keeping 0 and 1 as limits for u gives 1, not root 2 minus 1. Change the limits.' },
        { say: 'du is 2x dx, so x dx is half of du. Forgetting the half doubles the answer.' },
        { say: 'And the square root of 1 is 1, not 0.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Evaluate $\\displaystyle\\int_0^1 2x\\left(x^2 + 1\\right)^3 dx$.',
          choices: ['$\\dfrac{15}{4}$', '$4$', '$\\dfrac{15}{8}$', '$\\dfrac{1}{4}$'],
          answer: 0,
          working: '$u = x^2 + 1$, $du = 2x\\,dx$: $\\displaystyle\\int_1^2 u^3\\,du = \\dfrac{16 - 1}{4} = \\dfrac{15}{4}$',
        },
      ],
      lines: [
        { say: 'Your turn. Evaluate the integral from 0 to 1 of 2x times x squared plus 1, cubed. Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Let u be x squared plus 1, so du is exactly 2x dx. The limits become 1 and 2. The integral of u cubed is u to the 4 over 4: 16 over 4 minus 1 over 4, which is 15 quarters. Choice "A". Keeping the old limits gives one quarter.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Choose $u$ = the **inside**, whose derivative is nearby', 'Find $du$, and fix any **number** in front', 'Change the **limits** to $u$-values', 'Check by **differentiating**'] }],
      lines: [
        { say: 'Here is what to remember. Choose u to be the inside, whose derivative appears nearby.', show: 'sum.0' },
        { say: 'Find du, and fix any number in front.', show: 'sum.1' },
        { say: 'In a definite integral, change the limits to values of u.', show: 'sum.2' },
        { say: 'And check by differentiating. For more on integration by substitution, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
