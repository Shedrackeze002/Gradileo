import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'mx-17-3',
  lessonId: 'mx-17-3',
  title: 'Sigma Notation and Recurrence Relations',
  thumbnail: 'm',
  summary: 'Sigma notation writes a sum in a few symbols: the sum of 3r + 2 from r = 1 to 20 is an arithmetic series from 5 to 62, so it is 10 × 67 = 670. Count terms carefully: r = 6 to 29 is 24 terms. A recurrence relation such as uₙ₊₁ = 2uₙ − 1 with u₁ = 3 gives 3, 5, 9, 17. Sequences can be increasing, decreasing or periodic.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Pure: Proof, Algebra and Vectors', title: 'Sigma Notation and Recurrence Relations', subtitle: 'Sums and sequences, in short' }],
      lines: [
        { say: 'Writing out five plus eight plus eleven, all the way to sixty two, is slow. Sigma notation says the same thing in a few symbols.', show: 'title' },
        { say: 'And many sequences are easiest to describe by how each term comes from the one before. In this video, you will use both.' },
      ],
    },
    {
      chapter: 'Sigma notation',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Sigma notation', md: '$\\sum_{r = 1}^{n} f(r)$ means $f(1) + f(2) + \\cdots + f(n)$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\sum_{r = 1}^{20} (3r + 2) = 5 + 8 + 11 + \\cdots + 62', '= \\tfrac{20}{2}(5 + 62) = 670'] },
        { kind: 'callout', id: 'mis', tone: 'mistake', title: 'Count the terms', md: '$\\sum_{r = 6}^{29}$ has $29 - 6 + 1 = 24$ terms, not $23$.' },
      ],
      lines: [
        { say: 'The Greek capital letter sigma means add up. The sum from r equals one to n of f of r means f of one, plus f of two, and so on up to f of n.', show: 'def' },
        { say: 'For example, the sum from r equals one to twenty of three r plus two. Putting in r equals one gives five, then eight, then eleven, up to r equals twenty, which gives sixty two.', show: 'm.0', focus: 'm.0' },
        { say: 'The terms go up by three each time, so this is an arithmetic series. Its sum is the number of terms over two, times the first plus the last: ten times sixty seven, which is six hundred seventy.', show: 'm.1', focus: 'm.1' },
        { say: 'Sums of powers, such as two to the r, are geometric series instead, and use the geometric series formula.' },
        { say: 'Count the terms carefully. From r equals six to twenty nine is twenty four terms, not twenty three, because both ends count.', show: 'mis' },
      ],
    },
    {
      chapter: 'Recurrence relations',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Recurrence relation', md: 'Defines each term from the one before, such as $u_{n + 1} = 2u_n - 1$. With a first term, it fixes the whole sequence.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['u_1 = 3', 'u_2 = 2(3) - 1 = 5, \\quad u_3 = 2(5) - 1 = 9', 'u_4 = 2(9) - 1 = 17'] },
      ],
      lines: [
        { say: 'A recurrence relation defines each term of a sequence from the one before. For example, u n plus one equals two u n minus one: to get the next term, double this one and take away one.', show: 'def' },
        { say: 'With a first term, it fixes the whole sequence. Start with u one equals three.', show: 'm.0', focus: 'm.0' },
        { say: 'Then u two is two times three minus one, which is five, and u three is two times five minus one, which is nine.', show: 'm.1', focus: 'm.1' },
        { say: 'And u four is two times nine minus one, which is seventeen.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Periodic sequences',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Type', 'Each term is…'], rows: [['increasing', 'larger than the one before'], ['decreasing', 'smaller than the one before'], ['periodic', 'part of a pattern that repeats']] },
        { kind: 'math', id: 'm', size: 'lg', lines: ['u_{n + 1} = \\dfrac{1}{1 - u_n}, \\ u_1 = 2: \\quad 2, \\ {-1}, \\ \\tfrac{1}{2}, \\ 2, \\ {-1}, \\ldots'] },
      ],
      lines: [
        { say: 'A sequence is increasing if each term is larger than the one before, and decreasing if each is smaller.', show: ['t.0', 't.1'], focus: ['t.0', 't.1'] },
        { say: 'It is periodic if it repeats. One over one minus u n, starting from two, gives two, negative one, one half, then two again. The pattern repeats every three terms, so its period is three.', show: ['t.2', 'm'], focus: 'm' },
        { say: 'To find a far-off term of a periodic sequence, divide its position by the period and use the remainder.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $\\displaystyle\\sum_{r = 1}^{10} (2r + 1)$.',
          choices: ['$110$', '$21$', '$240$', '$120$'],
          answer: 3,
          working: 'The terms run from $3$ to $21$, with $10$ terms: $\\tfrac{10}{2}(3 + 21) = 120$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the sum from r equals one to ten of two r plus one. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. The first term is three and the last is twenty one, with ten terms, so the sum is five times twenty four, which is one hundred twenty. Choice B is just the last term.', show: 'q.answer' },
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
          items: ['$\\displaystyle\\sum_{r = 1}^{n} f(r)$ adds $f(1)$ to $f(n)$.', 'Linear terms give arithmetic series; powers give geometric series.', 'A recurrence relation and a first term define a sequence.', 'Periodic sequences repeat: use the remainder.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Sigma notation adds f of r for each r in the range.', show: 'sum.0' },
        { say: 'Linear terms give arithmetic series, and powers give geometric series.', show: 'sum.1' },
        { say: 'A recurrence relation and a first term define a sequence, one term at a time.', show: 'sum.2' },
        { say: 'And periodic sequences repeat, so use the remainder on dividing by the period. In the next lesson, we expand brackets with any power. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
