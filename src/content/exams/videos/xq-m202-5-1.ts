import type { Explainer } from '@/video/script.ts';

// Exam question for Math 20-2 lesson 5.1 (standard deviation). Gradileo wrote this one, in the style
// of a Grade 11 statistics unit test, because the free textbooks define the standard deviation with
// n − 1 (the sample standard deviation), while Math 20-2 uses the population standard deviation,
// dividing by N. Both players average 14 points; Amara's σ is √(20/5) = 2 and Ben's is
// √(184/5) = √36.8 ≈ 6.07, so Amara is more consistent.

const QUESTION =
  "Two basketball players scored these points in five games. Amara: 11, 15, 14, 13, 17. Ben: 6, 22, 10, 20, 12. (a) Find the mean and the population standard deviation of each player's points, to the nearest hundredth. (b) Which player is more consistent? Explain.";

const video: Explainer = {
  id: 'xq-m202-5-1',
  lessonId: '',
  exam: {
    lesson: 'm202-5-1',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 11 statistics unit test',
    licence: 'Written by Gradileo',
    question: QUESTION,
  },
  title: 'Exam Question: Which Player Is More Consistent? (Standard Deviation)',
  thumbnailTitle: 'Which Player Is More Consistent?',
  thumbnail: 'am',
  summary:
    "An exam-style question, solved one small step at a time: Amara scored 11, 15, 14, 13 and 17 points, and Ben scored 6, 22, 10, 20 and 12. Both average 14 points, but Amara's population standard deviation is 2 and Ben's is about 6.07, so Amara is more consistent. We find each standard deviation with a table of deviations, then check with a calculator and look at the traps.",
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Which Player Is More Consistent?', subtitle: 'Standard deviation, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam-style question about standard deviation. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'Gradileo wrote this question in the style of a Grade 11 statistics unit test. It says so at the bottom of the screen the whole way through.' },
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
          prompt: "Two basketball players scored these points in five games. Amara: $11, 15, 14, 13, 17$. Ben: $6, 22, 10, 20, 12$. (a) Find the mean and the population standard deviation of each player's points, to the nearest hundredth. (b) Which player is more consistent? Explain.",
          answer: '(a) Amara: $\\mu = 14$, $\\sigma = 2.00$; Ben: $\\mu = 14$, $\\sigma \\approx 6.07$. (b) Amara: her points are closer to the mean.',
          working: 'Amara: $\\sigma = \\sqrt{20 \\div 5} = 2$. Ben: $\\sigma = \\sqrt{184 \\div 5} \\approx 6.07$.',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'Two basketball players scored these points in five games. Amara scored 11, 15, 14, 13 and 17. Ben scored 6, 22, 10, 20 and 12.' },
        { say: 'Part "A": find the mean and the population standard deviation of each player\'s points, to the nearest hundredth. Part B: which player is more consistent? Explain.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'The **mean** is the typical score. The **standard deviation** measures how far the scores usually are from the mean. **Consistent** means the scores stay close together: a **small** standard deviation.' }],
      lines: [
        { say: 'The mean tells us a player\'s typical score. The standard deviation tells us how far the scores usually are from that mean.', show: 't' },
        { say: 'A consistent player scores about the same every game, so their scores stay close to the mean. That means a small standard deviation.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'mu', tone: 'definition', title: 'The mean', md: '$\\mu = \\dfrac{\\Sigma x}{N}$: add the values and divide by how many there are.' },
        { kind: 'callout', id: 'sd', tone: 'key', title: 'Population standard deviation', md: '$\\sigma = \\sqrt{\\dfrac{\\Sigma(x - \\mu)^2}{N}}$: square each distance from the mean, average them, then take the square root.' },
      ],
      lines: [
        { say: 'Here is what we need. The mean, mu, is the sum of the values divided by how many there are.', show: 'mu' },
        { say: 'The population standard deviation, sigma, takes each value\'s distance from the mean, squares it, averages the squares by dividing by N, and then takes the square root.', show: 'sd' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find each player\'s **mean**', 'Make a table of **squared deviations**', 'Divide by $N$, take the **square root**, and compare'] }],
      lines: [
        { say: 'Here is the plan. First, find each player\'s mean.', show: 'plan.0' },
        { say: 'Second, make a table of how far each score is from the mean, squared.', show: 'plan.1' },
        { say: 'Third, divide by N, take the square root, and compare the two players.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The means',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{Amara: } \\mu = \\dfrac{11 + 15 + 14 + 13 + 17}{5} = \\dfrac{70}{5} = 14', '\\text{Ben: } \\mu = \\dfrac{6 + 22 + 10 + 20 + 12}{5} = \\dfrac{70}{5} = 14'] }],
      lines: [
        { say: 'Step one. Amara\'s points add to 70, and 70 divided by 5 is 14.', show: 'm.0' },
        { say: 'Ben\'s points also add to 70, so his mean is also 14. The means are the same, so the mean cannot tell the players apart.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Amara\'s deviations',
      layout: 'split',
      leftWidth: 760,
      left: [
        {
          kind: 'table',
          id: 'am',
          head: ['$x$', '$x - \\mu$', '$(x - \\mu)^2$'],
          rows: [
            ['$11$', '$-3$', '$9$'],
            ['$15$', '$1$', '$1$'],
            ['$14$', '$0$', '$0$'],
            ['$13$', '$-1$', '$1$'],
            ['$17$', '$3$', '$9$'],
            ['', '**sum**', '$\\good{20}$'],
          ],
        },
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\sigma = \\sqrt{\\dfrac{20}{5}}', '\\sigma = \\sqrt{4} = \\good{2.00}'] }],
      lines: [
        { say: 'Step two, for Amara. Subtract the mean, 14, from each score. 11 minus 14 is negative 3, 15 minus 14 is 1, and so on.', show: 'am' },
        { say: 'Square each one, so the negatives do not cancel the positives: 9, 1, 0, 1 and 9. They add to 20.' },
        { say: 'Step three. Divide by N, which is 5, to get 4. The square root of 4 is 2. So Amara\'s standard deviation is 2.', show: ['m.0', 'm.1'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Ben\'s deviations',
      layout: 'split',
      leftWidth: 760,
      left: [
        {
          kind: 'table',
          id: 'ben',
          head: ['$x$', '$x - \\mu$', '$(x - \\mu)^2$'],
          rows: [
            ['$6$', '$-8$', '$64$'],
            ['$22$', '$8$', '$64$'],
            ['$10$', '$-4$', '$16$'],
            ['$20$', '$6$', '$36$'],
            ['$12$', '$-2$', '$4$'],
            ['', '**sum**', '$\\good{184}$'],
          ],
        },
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\sigma = \\sqrt{\\dfrac{184}{5}}', '\\sigma = \\sqrt{36.8}', '\\sigma \\approx \\good{6.07}'] }],
      lines: [
        { say: 'Now Ben. His scores are much further from 14: negative 8, 8, negative 4, 6 and negative 2.', show: 'ben' },
        { say: 'The squares are 64, 64, 16, 36 and 4. They add to 184.' },
        { say: 'Divide by 5 to get 36.8. The square root of 36.8 is about 6.07. So Ben\'s standard deviation is about 6.07.', show: ['m.0', 'm.1', 'm.2'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: Compare',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{Amara: } \\sigma = 2.00 \\qquad \\text{Ben: } \\sigma \\approx 6.07'] },
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '**Amara** is more consistent. Both average $14$ points, but her standard deviation is much **smaller**, so her scores stay closer to the mean.' },
      ],
      lines: [
        { say: 'Here are the two standard deviations side by side: 2 for Amara, and about 6.07 for Ben.', show: 'm.0' },
        { say: 'So Amara is more consistent. Both players average 14 points, but Amara\'s standard deviation is much smaller, so her scores stay closer to her mean. That is the answer.', show: 'ans', focus: 'ans' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'On a calculator, one-variable statistics gives $\\sigma x = 2$ for Amara and $\\sigma x \\approx 6.07$ for Ben. Use $\\sigma x$, which divides by $N$, not $Sx$, which divides by $N - 1$.' }],
      lines: [
        { say: 'Let us check with a calculator. Enter each player\'s points and run one-variable statistics. Sigma x is 2 for Amara and about 6.07 for Ben. They match.', show: 't' },
        { say: 'Be careful to read sigma x, which divides by N. The value S x divides by N minus 1, and gives a different number.' },
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
            ['$\\Sigma(x - \\mu) = 0$', 'the deviations **cancel**: square them first'],
            ['$\\sigma = 4$ for Amara', 'forgot the **square root** at the end'],
            ['"Ben is better: he scored $22$"', 'consistent means a **small** spread, not a high score'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'If you add the deviations without squaring, you always get 0, because the negatives cancel the positives.' },
        { say: '4 is the average of the squares, called the variance. Take its square root to get the standard deviation, 2.' },
        { say: 'And Ben\'s best game was higher, but the question asks who is consistent, and that means the smaller spread.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which data set has the larger standard deviation? P: $8, 9, 10, 11, 12$. Q: $2, 6, 10, 14, 18$.',
          choices: ['P', 'Q', 'They are equal', 'You cannot tell without more data'],
          answer: 1,
          working: 'Both have mean $10$, but Q is more spread out: $\\sigma_P = \\sqrt{2} \\approx 1.41$ and $\\sigma_Q = \\sqrt{32} \\approx 5.66$.',
        },
      ],
      lines: [
        { say: 'Your turn. Which data set has the larger standard deviation? P is 8, 9, 10, 11, 12. Q is 2, 6, 10, 14, 18. Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Both have a mean of 10, but the values in Q are much further from 10. Its standard deviation is about 5.66, and P\'s is about 1.41. So Q has the larger standard deviation: choice B.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$\\sigma$ measures the **spread** about the mean', 'Square the deviations, divide by $N$, take the root', 'Smaller $\\sigma$: **more consistent**', 'On a calculator, read $\\sigma x$'] }],
      lines: [
        { say: 'Here is what to remember. The standard deviation measures how spread out the data is about the mean.', show: 'sum.0' },
        { say: 'Square the deviations, divide by N, and take the square root.', show: 'sum.1' },
        { say: 'A smaller standard deviation means more consistent data.', show: 'sum.2' },
        { say: 'And on a calculator, read sigma x. For more on standard deviation, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
