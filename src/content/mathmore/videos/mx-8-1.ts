import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'mx-8-1',
  lessonId: 'mx-8-1',
  title: 'Quadratic Sequences',
  thumbnail: false,
  summary: 'In a quadratic sequence the second differences are all the same, and the nth term is an² + bn + c with a equal to half the second difference. For 4, 13, 26, 43, 64, … subtracting 2n² leaves 2, 5, 8, 11, 14, whose nth term is 3n − 1, so the nth term is 2n² + 3n − 1.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Sequences, Iteration and Graphs', title: 'Quadratic Sequences', subtitle: 'When the gaps grow by the same amount' }],
      lines: [
        { say: 'In a linear sequence, the terms go up by the same amount each time. In the square numbers, one, four, nine, sixteen, the gaps grow: three, then five, then seven.', show: 'title' },
        { say: 'But the gaps themselves grow by the same amount. Sequences like this are called quadratic. In this video, you will learn to spot them, continue them, and find their nth term.' },
      ],
    },
    {
      chapter: 'Second differences',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Quadratic sequence', md: 'A sequence whose $n$th term has an $n^2$ term and no higher power. Its **first differences** change, but its **second differences** are all the same.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['3,\\quad 6,\\quad 11,\\quad 18,\\quad 27', '\\text{First differences: } 3,\\ 5,\\ 7,\\ 9', '\\text{Second differences: } 2,\\ 2,\\ 2', '\\text{Next: } 27 + (9 + 2) = 38'] },
      ],
      lines: [
        { say: 'A quadratic sequence has an n squared term in its nth term. The differences between its terms, the first differences, change. But the differences between those, the second differences, are all the same.', show: 'def' },
        { say: 'Find the next term of three, six, eleven, eighteen, twenty seven.', show: 'm.0', focus: 'm.0' },
        { say: 'The first differences are three, five, seven and nine.', show: 'm.1', focus: 'm.1' },
        { say: 'The second differences are two, two and two. They are the same, so the sequence is quadratic.', show: 'm.2', focus: 'm.2' },
        { say: 'The next first difference is nine plus two, which is eleven. So the next term is twenty seven plus eleven, which is thirty eight.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Finding the nth term',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['$n$', '$1$', '$2$', '$3$', '$4$', '$5$'], rows: [['Term', '$4$', '$13$', '$26$', '$43$', '$64$'], ['$2n^2$', '$2$', '$8$', '$18$', '$32$', '$50$'], ['Term $- 2n^2$', '$2$', '$5$', '$8$', '$11$', '$14$']] },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Second difference } 4 \\Rightarrow 2n^2', '2,\\ 5,\\ 8,\\ 11,\\ 14 \\Rightarrow 3n - 1', 'n\\text{th term} = 2n^2 + 3n - 1'] },
      ],
      lines: [
        { say: 'The nth term of a quadratic sequence has the form "a" n squared, plus b n, plus c. Let’s find it for four, thirteen, twenty six, forty three, sixty four.', show: 't.0', focus: 't.0' },
        { say: 'The first differences are nine, thirteen, seventeen and twenty one, and the second differences are all four.' },
        { say: 'The second difference is always two times "a". So "a" is half of the second difference: half of four is two. The sequence starts with two n squared.', show: 'm.0', focus: 'm.0' },
        { say: 'Work out two n squared for each term: two, eight, eighteen, thirty two and fifty.', show: 't.1', focus: 't.1' },
        { say: 'Subtract these from the sequence. What is left is two, five, eight, eleven, fourteen: a linear sequence.', show: 't.2', focus: 't.2' },
        { say: 'It goes up by three, and three times one is three, which is one more than the first term, two. So its nth term is three n minus one.', show: 'm.1', focus: 'm.1' },
        { say: 'Put the parts together. The nth term is two n squared plus three n minus one.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Checking and a common mistake',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['n = 1: \\ 2 + 3 - 1 = 4 \\ \\checkmark', 'n = 2: \\ 8 + 6 - 1 = 13 \\ \\checkmark'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Half the second difference', md: 'A second difference of $4$ means $2n^2$, not $4n^2$. The square numbers have a second difference of $2$, so $an^2$ has a second difference of $2a$.' },
      ],
      lines: [
        { say: 'Always check. Put n equals one into the answer: two plus three minus one is four. And n equals two: eight plus six minus one is thirteen. Both match the sequence.', show: 'm', focus: 'm' },
        { say: 'The most common mistake is using the whole second difference. The square numbers have a second difference of two, so a second difference of four means two n squared, not four n squared.', show: 'oops' },
      ],
    },
    {
      chapter: 'Which term?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['n^2 + 2n - 5 = 58', 'n^2 + 2n - 63 = 0', '(n + 9)(n - 7) = 0', 'n = 7 \\quad (\\text{not } {-9})'] },
      ],
      lines: [
        { say: 'With the nth term, we can find which term has a given value. The nth term of a sequence is n squared plus two n minus five. Which term is fifty eight?', show: 'm.0', focus: 'm.0' },
        { say: 'Set the nth term equal to fifty eight, and make one side zero: n squared plus two n minus sixty three equals zero.', show: 'm.1', focus: 'm.1' },
        { say: 'Factorize: n plus nine, times n minus seven. So n is negative nine or seven.', show: 'm.2', focus: 'm.2' },
        { say: 'A term number must be a positive whole number, so fifty eight is the seventh term. If neither answer were a positive whole number, fifty eight would not be in the sequence at all.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find the $n$th term of the sequence $3,\\ 9,\\ 19,\\ 33,\\ 51,\\ \\ldots$',
          choices: ['$4n^2 - 1$', '$2n^2 + 1$', '$n^2 + 2$', '$2n^2 + 2n - 1$'],
          answer: 1,
          working: 'First differences $6, 10, 14, 18$; second differences $4$, so $2n^2$: $2, 8, 18, 32, 50$. The sequence minus $2n^2$ is $1, 1, 1, 1, 1$, so the $n$th term is $2n^2 + 1$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the nth term of three, nine, nineteen, thirty three, fifty one. Pause the video and try it.', show: 'q', wait: 8 },
        { say: 'The answer is B. The second differences are all four, so the sequence starts with two n squared. Taking two n squared away leaves one every time, so the nth term is two n squared plus one. Choice A uses the whole second difference.', show: 'q.answer' },
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
          items: ['In a quadratic sequence the second differences are all the same.', 'The $n$th term is $an^2 + bn + c$, where $a$ is half the second difference.', 'Subtract $an^2$ from each term, then find the $n$th term of the linear sequence left.', 'To find which term has a value, solve; the term number must be a positive whole number.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In a quadratic sequence, the second differences are all the same.', show: 'sum.0' },
        { say: 'The number in front of n squared is half of the second difference.', show: 'sum.1' },
        { say: 'Subtract that n squared part from each term, and find the nth term of the linear sequence that is left.', show: 'sum.2' },
        { say: 'And to find which term has a value, set the nth term equal to it and solve. In the next lesson, we solve equations by iteration. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
