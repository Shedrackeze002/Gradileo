import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm302-6-3',
  lessonId: 'm302-6-3',
  title: 'Logarithms and the Laws of Logarithms, Part 1: What a Logarithm Is',
  thumbnailTitle: 'What Is a Logarithm?',
  summary: 'What a logarithm is (log_b x = y means b^y = x), the common logarithm log x with base 10, switching between exponential and logarithmic form, evaluating log₂ 32 = 5, log 0.01 = −2 and log₉ 3 = 1/2, and why log₅ 125 = 3 means 5³ = 125, not 3⁵.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exponents and Logarithms · Part 1', title: 'What Is a Logarithm?', subtitle: 'A logarithm is an exponent' }],
      lines: [
        { say: 'What power of ten gives one thousand? Ten times ten times ten is one thousand, so the answer is three. That exponent has a name: it is a logarithm.', show: 'title' },
        { say: 'In this video, you will see what a logarithm is, switch between exponential form and logarithmic form, and evaluate logarithms in your head.' },
      ],
    },
    {
      chapter: 'Logarithms',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Logarithm', md: 'For $b > 0$, $b \\ne 1$ and $x > 0$, $\\log_b x = y$ means $b^y = x$. The logarithm is the **exponent** you put on the base $b$ to get $x$. When no base is written, the base is $10$: $\\log x = \\log_{10} x$ is the **common logarithm**.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['10^{3} = 1000 \\quad\\Longleftrightarrow\\quad \\log 1000 = 3'] },
      ],
      lines: [
        { say: 'Here is the definition. Log base b of x equals y means b to the power y equals x. The base b is positive and not one, and x is positive.', show: 'def' },
        { say: 'In words, the logarithm is the exponent you put on the base, b, to get x. A logarithm is an exponent.' },
        { say: 'When no base is written, the base is ten. So log x means log base ten of x. It is called the common logarithm, and it is the log key on your calculator.' },
        { say: 'So log one thousand equals three, because ten cubed is one thousand. The two statements say exactly the same thing.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Two forms',
      layout: 'center',
      main: [
        { kind: 'math', id: 'k', size: 'md', lines: ['\\adj{b}^{\\opp{y}} = x \\quad\\Longleftrightarrow\\quad \\log_{\\adj{b}} x = \\opp{y}'] },
        {
          kind: 'table',
          id: 't',
          head: ['Exponential form', 'Logarithmic form'],
          rows: [
            ['$\\adj{2}^{\\opp{5}} = 32$', '$\\log_{\\adj{2}} 32 = \\opp{5}$'],
            ['$\\adj{10}^{\\opp{-2}} = 0.01$', '$\\log 0.01 = \\opp{-2}$'],
            ['$\\adj{9}^{\\opp{1/2}} = 3$', '$\\log_{\\adj{9}} 3 = \\opp{\\frac{1}{2}}$'],
          ],
        },
      ],
      lines: [
        { say: 'Every exponential equation has a logarithmic form, and every logarithmic equation has an exponential form. The blue base stays the base, and the orange exponent becomes the value of the logarithm.', show: 'k.0' },
        { say: 'Two to the power five equals 32 becomes log base two of 32 equals five.', show: 't.0', focus: 't.0' },
        { say: 'Ten to the power negative two equals 0.01 becomes log 0.01 equals negative two. The base is ten, so it is not written.', show: 't.1', focus: 't.1' },
        { say: 'And nine to the power one half equals three becomes log base nine of three equals one half.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Evaluating',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\log_2 32\\colon\\quad 2^{?} = 32,\\ \\ 2^{5} = 32 \\;\\to\\; 5', '\\log 0.01\\colon\\quad 10^{?} = 0.01 = \\tfrac{1}{100},\\ \\ 10^{-2} = 0.01 \\;\\to\\; -2', '\\log_9 3\\colon\\quad 9^{?} = 3,\\ \\ 9^{1/2} = \\sqrt{9} = 3 \\;\\to\\; \\tfrac{1}{2}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Ask the question', md: 'To evaluate $\\log_b x$, ask: $b$ to what power is $x$?' },
      ],
      lines: [
        { say: 'To evaluate a logarithm, ask a question: the base, to what power, gives the number?', show: 'tip' },
        { say: 'Log base two of 32: two to what power is 32? Two, four, eight, sixteen, 32. Two to the fifth is 32, so log base two of 32 is five.', show: 'm.0', focus: 'm.0' },
        { say: 'Log 0.01: ten to what power is 0.01? 0.01 is one over one hundred, which is ten to the power negative two. So log 0.01 is negative two. A logarithm can be negative.', show: 'm.1', focus: 'm.1' },
        { say: 'Log base nine of three: nine to what power is three? The square root of nine is three, and a square root is the power one half. So log base nine of three is one half. A logarithm can be a fraction too.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Mixing up the base and the argument', md: 'In $\\log_5 125 = 3$, the base is $5$ and the answer is the exponent, so the exponential form is $5^3 = 125$, not $3^5 = 125$. The base of the logarithm is always the base of the power.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\log_{\\adj{5}} 125 = \\opp{3} \\;\\to\\; \\adj{5}^{\\opp{3}} = 125 \\;\\checkmark', '\\bad{3^{5} = 243}, \\text{ not } 125'] },
      ],
      lines: [
        { say: 'A common mistake is to mix up the base and the argument, the number you take the log of. Look at log base five of 125 equals three.', show: 'oops' },
        { say: 'The base of the logarithm is five, and the answer, three, is the exponent. So the exponential form is five to the power three equals 125. And it is true: five cubed is 125.', show: 'm.0', focus: 'm.0' },
        { say: 'It is not three to the power five. Three to the fifth is 243. The base of the logarithm is always the base of the power.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Evaluate $\\log_2 \\frac{1}{8}$.',
          choices: ['$3$', '$-3$', '$\\frac{1}{3}$', '$-\\frac{1}{3}$'],
          answer: 1,
          working: '$2^{-3} = \\dfrac{1}{2^3} = \\dfrac{1}{8}$, so $\\log_2 \\frac{1}{8} = -3$.',
        },
      ],
      lines: [
        { say: 'Your turn. Evaluate log base two of one eighth. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Two to what power is one eighth? Two cubed is eight, and a reciprocal needs a negative exponent. So two to the power negative three is one eighth, and the logarithm is negative three. Choice A forgets the negative sign: log base two of eight is three.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$\\log_b x = y$ means $b^y = x$: a logarithm is an exponent.', '$\\log x$, with no base written, means $\\log_{10} x$.', 'To evaluate $\\log_b x$, ask: $b$ to what power is $x$?', 'The base of the logarithm is the base of the power.'] }],
      lines: [
        { say: 'Let’s sum up. Log base b of x equals y means b to the power y equals x. A logarithm is an exponent.', show: 'sum.0' },
        { say: 'Log x, with no base written, is the common logarithm, with base ten.', show: 'sum.1' },
        { say: 'To evaluate a logarithm, ask: the base, to what power, gives the number?', show: 'sum.2' },
        { say: 'And the base of the logarithm is always the base of the power. In the next part, we estimate logarithms, and find decimal values with the change of base formula. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
