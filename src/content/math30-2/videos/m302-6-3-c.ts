import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm302-6-3-c',
  lessonId: 'm302-6-3',
  title: 'Logarithms and the Laws of Logarithms, Part 3: The Laws of Logarithms',
  thumbnailTitle: 'The Laws of Logarithms',
  summary: 'The product, quotient and power laws of logarithms and why they follow from the exponent laws, using them to evaluate log₆ 4 + log₆ 9 = 2, log₂ 48 − log₂ 3 = 4 and 3 log₅ 10 − log₅ 8 = 3, and why log(M + N) is not log M + log N.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exponents and Logarithms · Part 3', title: 'The Laws of Logarithms', subtitle: 'Product, quotient and power' }],
      lines: [
        { say: 'Logarithms are exponents, so the laws of exponents have twins: the laws of logarithms.', show: 'title' },
        { say: 'In this video, you will meet the product, quotient and power laws, see why they work, and use them to evaluate logarithms that look impossible on their own.' },
      ],
    },
    {
      chapter: 'Exponents become logarithms',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['8 \\times 4 = 32\\colon\\quad 2^{\\opp{3}} \\times 2^{\\opp{2}} = 2^{\\opp{3 + 2}} = 2^{\\opp{5}}', '\\log_2 8 + \\log_2 4 = 3 + 2 = 5 = \\log_2 32', '\\log_2 (8 \\times 4) = \\log_2 8 + \\log_2 4'] },
      ],
      lines: [
        { say: 'Start with a law you know: multiplying powers adds their exponents. Eight times four is 32, and in powers of two, that is two cubed times two squared, which is two to the power three plus two: two to the fifth.', show: 'm.0', focus: 'm.0' },
        { say: 'Now write the exponents as logarithms. Log base two of eight is three, log base two of four is two, and log base two of 32 is five. Three plus two is five.', show: 'm.1', focus: 'm.1' },
        { say: 'So the log of a product is the sum of the logs. Every law of logarithms comes from an exponent law in this way.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'The three laws',
      layout: 'center',
      main: [
        { kind: 'text', id: 'cond', size: 'md', md: 'For $M > 0$, $N > 0$, $b > 0$ and $b \\ne 1$:' },
        { kind: 'callout', id: 'p', tone: 'definition', title: 'Product law', md: '$\\log_b (MN) = \\log_b M + \\log_b N$' },
        { kind: 'callout', id: 'q', tone: 'definition', title: 'Quotient law', md: '$\\log_b \\dfrac{M}{N} = \\log_b M - \\log_b N$' },
        { kind: 'callout', id: 'w', tone: 'definition', title: 'Power law', md: '$\\log_b M^n = n\\log_b M$' },
      ],
      lines: [
        { say: 'Here are the three laws. They work for any base b that is positive and not one, and for positive numbers M and N.', show: 'cond' },
        { say: 'The product law. Log base b of M times N equals log base b of M, plus log base b of N. Multiplying powers adds exponents, so the log of a product is a sum.', show: 'p' },
        { say: 'The quotient law. Log base b of M over N equals log base b of M, minus log base b of N. Dividing powers subtracts exponents, so the log of a quotient is a difference.', show: 'q' },
        { say: 'The power law. Log base b of M to the power n equals n times log base b of M. A power of a power multiplies the exponents, so the exponent comes down in front.', show: 'w' },
      ],
    },
    {
      chapter: 'Combine, then evaluate',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\log_6 4 + \\log_6 9 = \\log_6 (4 \\times 9) = \\log_6 36 = 2', '\\log_2 48 - \\log_2 3 = \\log_2 \\dfrac{48}{3} = \\log_2 16 = 4', '3\\log_5 10 - \\log_5 8 = \\log_5 10^{3} - \\log_5 8 = \\log_5 1000 - \\log_5 8', '= \\log_5 \\dfrac{1000}{8} = \\log_5 125 = 3'] },
      ],
      lines: [
        { say: 'Evaluate log base six of four, plus log base six of nine. Neither one is a whole number on its own.', show: 'm.0', focus: 'm.0' },
        { say: 'But the product law combines them into log base six of four times nine, which is log base six of 36. Six squared is 36, so the answer is two.' },
        { say: 'Next, log base two of 48, minus log base two of three. The quotient law gives log base two of 48 over three, which is log base two of sixteen. Two to the fourth is sixteen, so the answer is four.', show: 'm.1', focus: 'm.1' },
        { say: 'Last, three log base five of ten, minus log base five of eight. First, the power law moves the three up as an exponent: log base five of ten cubed, which is log base five of one thousand.', show: 'm.2', focus: 'm.2' },
        { say: 'Then the quotient law: one thousand over eight is 125. Five cubed is 125, so the answer is three.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Laws that do not exist', md: '$\\log(M + N)$ is **not** $\\log M + \\log N$, and $\\dfrac{\\log M}{\\log N}$ is **not** $\\log \\dfrac{M}{N}$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\log 2 + \\log 8 = \\log 16 \\approx 1.204', '\\log (2 + 8) = \\log 10 = 1'] },
      ],
      lines: [
        { say: 'Be careful: the laws are about products, quotients and powers, not sums. The log of M plus N is not log M plus log N. And log M divided by log N is not the log of M over N.', show: 'oops' },
        { say: 'Test it with numbers. Log two plus log eight is log sixteen, by the product law. That is about 1.204.', show: 'm.0', focus: 'm.0' },
        { say: 'But the log of two plus eight is log ten, which is exactly one. The two answers are different, so there is no law for the log of a sum.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Evaluate $\\log_3 6 + \\log_3 4.5$.',
          choices: ['$3$', '$\\log_3 10.5$', '$27$', '$2$'],
          answer: 0,
          working: 'Product law: $\\log_3 (6 \\times 4.5) = \\log_3 27 = 3$, because $3^3 = 27$.',
        },
      ],
      lines: [
        { say: 'Your turn. Evaluate log base three of six, plus log base three of 4.5. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The product law multiplies the numbers: six times 4.5 is 27. Three cubed is 27, so the answer is three. Choice B adds the numbers instead, but there is no law for the log of a sum.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Product law: $\\log_b MN = \\log_b M + \\log_b N$.', 'Quotient law: $\\log_b \\frac{M}{N} = \\log_b M - \\log_b N$.', 'Power law: $\\log_b M^n = n\\log_b M$.', 'There is no law for $\\log(M + N)$ or for $\\dfrac{\\log M}{\\log N}$.'] }],
      lines: [
        { say: 'Let’s sum up. The product law: the log of a product is the sum of the logs.', show: 'sum.0' },
        { say: 'The quotient law: the log of a quotient is the difference of the logs.', show: 'sum.1' },
        { say: 'The power law: the exponent comes down in front as a factor.', show: 'sum.2' },
        { say: 'And there is no law for the log of a sum, or for one log divided by another. In the next part, we use the laws to combine, expand and solve. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
