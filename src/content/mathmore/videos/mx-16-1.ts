import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'mx-16-1',
  lessonId: 'mx-16-1',
  title: 'Proof by Exhaustion',
  thumbnail: 'm',
  summary: 'A proof by exhaustion splits a statement into cases that cover every possibility, and proves each one. Every integer is 2k or 2k + 1, so n² + n is even for every integer: 2(2k² + k) or 2(2k² + 3k + 1). One counterexample disproves a statement: n² − n + 11 is prime for n = 1 to 10, but n = 11 gives 121 = 11².',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Pure: Proof, Triangles and Logarithmic Graphs', title: 'Proof by Exhaustion', subtitle: 'Checking every case' }],
      lines: [
        { say: 'How can we be sure that n squared plus n is even for every integer, when there are infinitely many integers to check?', show: 'title' },
        { say: 'Every integer is either even or odd, so checking those two cases checks them all. In this video, you will prove statements by exhausting the cases, and disprove them with a single counterexample.' },
      ],
    },
    {
      chapter: 'Cases that cover everything',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Proof by exhaustion', md: 'Split a statement into a **finite number of cases** that cover every possibility, and prove it in each case.' },
        { kind: 'table', id: 't', head: ['Split by', 'Cases'], rows: [['even or odd', '$n = 2k$, $\\ 2k + 1$'], ['remainder on dividing by 3', '$n = 3k$, $\\ 3k + 1$, $\\ 3k + 2$']] },
      ],
      lines: [
        { say: 'A proof by exhaustion splits a statement into a finite number of cases that between them cover every possibility, and proves the statement in each case.', show: 'def' },
        { say: 'Useful cases come from remainders. Every integer is even or odd, so it can be written as two k, or two k plus one, for some integer k.', show: 't.0', focus: 't.0' },
        { say: 'Or, by its remainder when divided by three: three k, three k plus one, or three k plus two.', show: 't.1', focus: 't.1' },
      ],
    },
    {
      chapter: 'Two cases',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Prove that $n^2 + n$ is even for every integer $n$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['n = 2k: \\ 4k^2 + 2k = 2(2k^2 + k)', 'n = 2k + 1: \\ 4k^2 + 4k + 1 + 2k + 1', '= 2(2k^2 + 3k + 1)'] },
        { kind: 'callout', id: 'mis', tone: 'mistake', title: 'Examples are not a proof', md: 'Checking $n = 1$ to $100$ proves nothing about **every** integer.' },
      ],
      lines: [
        { say: 'Prove that n squared plus n is even for every integer n.', show: 'q' },
        { say: 'If n is even, write n as two k. Then n squared plus n is four k squared plus two k, which is two times two k squared plus k. That is two times an integer, so it is even.', show: 'm.0', focus: 'm.0' },
        { say: 'If n is odd, write n as two k plus one. Expanding gives four k squared plus four k plus one, plus two k plus one.', show: 'm.1', focus: 'm.1' },
        { say: 'That is two times two k squared plus three k plus one, which is also even. Every integer is even or odd, so n squared plus n is always even.', show: 'm.2', focus: 'm.2' },
        { say: 'Checking lots of examples does not do this. However many values you try, they never cover every integer. Only cases that cover every possibility make a proof.', show: 'mis' },
      ],
    },
    {
      chapter: 'Counterexamples',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Show that “$n^2 - n + 11$ is prime for every positive integer $n$” is false.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['n = 1, 2, \\ldots, 10: \\ 11, 13, 17, \\ldots, 101 \\text{ (all prime)}', 'n = 11: \\ 121 - 11 + 11 = 121 = 11^2'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Counterexample', md: 'One example for which a statement is false is enough to **disprove** it.' },
      ],
      lines: [
        { say: 'To show a statement is false, one example is enough. That example is a counterexample.', show: 'key' },
        { say: 'Is n squared minus n plus eleven prime for every positive integer n?', show: 'q' },
        { say: 'For n from one to ten, the values are eleven, thirteen, seventeen, and so on up to one hundred one. Every one of them is prime, so the statement looks true.', show: 'm.0', focus: 'm.0' },
        { say: 'But when n is eleven, the value is one hundred twenty one, which is eleven squared. It is not prime, so n equals eleven is a counterexample, and the statement is false.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which value of $n$ is a counterexample to “$2^n + 1$ is prime for every positive integer $n$”?',
          choices: ['$n = 1$', '$n = 2$', '$n = 3$', '$n = 4$'],
          answer: 2,
          working: '$2^1 + 1 = 3$, $2^2 + 1 = 5$ and $2^4 + 1 = 17$ are prime, but $2^3 + 1 = 9 = 3^2$ is not.',
        },
      ],
      lines: [
        { say: 'Your turn. Which value of n is a counterexample to the statement that two to the power n, plus one, is prime for every positive integer n? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Two cubed plus one is nine, which is three squared, so it is not prime. The other choices give three, five and seventeen, which are all prime.', show: 'q.answer' },
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
          items: ['Proof by exhaustion proves every case, and the cases cover all possibilities.', 'Cases often come from remainders: $2k$, $2k + 1$, or $3k$, $3k + 1$, $3k + 2$.', 'One counterexample disproves a statement.', 'Any number of examples cannot prove one.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A proof by exhaustion proves every case, and the cases must cover every possibility.', show: 'sum.0' },
        { say: 'Cases often come from remainders, such as even and odd.', show: 'sum.1' },
        { say: 'A single counterexample disproves a statement.', show: 'sum.2' },
        { say: 'But no number of examples can prove one. In the next lesson, we find the area of a triangle with trigonometry. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
