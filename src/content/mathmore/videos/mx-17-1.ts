import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'mx-17-1',
  lessonId: 'mx-17-1',
  title: 'Proof by Contradiction',
  thumbnail: 'm',
  summary: 'A proof by contradiction assumes the statement is false and reasons until something impossible appears. Assuming √2 = a/b in lowest terms gives a² = 2b², which makes a and b both even: a contradiction, so √2 is irrational. If there were only finitely many primes, their product plus 1 would have a prime factor missing from the list, so there are infinitely many primes.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Pure: Proof, Algebra and Vectors', title: 'Proof by Contradiction', subtitle: 'Assume the opposite' }],
      lines: [
        { say: 'Some statements are hard to prove directly. How could we show that no fraction at all is equal to root two?', show: 'title' },
        { say: 'Instead, we suppose there is one, and show that this leads to something impossible. In this video, you will see two of the most famous proofs in mathematics.' },
      ],
    },
    {
      chapter: 'How it works',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Proof by contradiction', md: 'Assume the statement is **false** (its **negation**), and reason until you reach a **contradiction**. So the assumption was wrong, and the statement is true.' },
        { kind: 'table', id: 't', head: ['Statement', 'Negation'], rows: [['every … is …', 'there is one that is not'], ['if $A$, then $B$', '$A$ is true and $B$ is false'], ['$\\sqrt{2}$ is irrational', '$\\sqrt{2}$ is rational']] },
      ],
      lines: [
        { say: 'A proof by contradiction begins by assuming that the statement is false. We call that its negation.', show: 'def' },
        { say: 'Then we reason from the assumption until we reach a contradiction: something impossible, or something that clashes with the assumption. So the assumption was wrong, and the statement must be true.' },
        { say: 'The first line must be the exact negation. The negation of every one is, is there is one that is not.', show: 't.0', focus: 't.0' },
        { say: 'The negation of if this, then that, is this is true and that is false. And the negation of root two is irrational, is root two is rational.', show: ['t.1', 't.2'], focus: ['t.1', 't.2'] },
      ],
    },
    {
      chapter: 'Root 2 is irrational',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\sqrt{2} = \\frac{a}{b} \\quad (\\text{no common factor})', 'a^2 = 2b^2 \\;\\Rightarrow\\; a \\text{ is even}, \\ a = 2c', '4c^2 = 2b^2 \\;\\Rightarrow\\; b^2 = 2c^2 \\;\\Rightarrow\\; b \\text{ is even}', '\\text{Common factor } 2: \\text{ a contradiction}'] },
      ],
      lines: [
        { say: 'Prove that root two is irrational. Assume it is rational: root two equals "a" over b, where "a" and b are integers with no common factor. Any fraction can be cancelled down like that.', show: 'm.0', focus: 'm.0' },
        { say: 'Squaring gives "a" squared equals two b squared. So "a" squared is even, and that means "a" itself is even. Write "a" as two c.', show: 'm.1', focus: 'm.1' },
        { say: 'Then four c squared equals two b squared, so b squared equals two c squared. So b squared is even, and b is even too.', show: 'm.2', focus: 'm.2' },
        { say: 'Now "a" and b are both even, so they have a common factor of two. But we said they had no common factor. That is a contradiction, so root two is irrational.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Infinitely many primes',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{Assume the only primes are } p_1, p_2, \\ldots, p_n', 'N = p_1p_2\\cdots p_n + 1', '2 \\times 3 \\times 5 \\times 7 + 1 = 211'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'N need not be prime', md: '$2 \\times 3 \\times 5 \\times 7 \\times 11 \\times 13 + 1 = 30031 = 59 \\times 509$. Its prime factors are still new.' },
      ],
      lines: [
        { say: 'Now prove that there are infinitely many primes. Assume the opposite: there are only finitely many, p one, p two, up to p n.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiply them all together and add one. Call that N.', show: 'm.1', focus: 'm.1' },
        { say: 'Every prime on the list divides the product, so N leaves a remainder of one when divided by any of them. But N is bigger than one, so it has a prime factor, and that factor is not on the list. The list was meant to hold every prime: a contradiction.' },
        { say: 'For example, two times three times five times seven, plus one, is two hundred eleven, which leaves remainder one on dividing by each of them.', show: 'm.2', focus: 'm.2' },
        { say: 'N need not be prime itself. The proof only needs its prime factors to be missing from the list.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'To prove “there is no largest even number” by contradiction, what do you assume first?',
          choices: ['Every even number is large', 'There is a largest even number, $N$', 'There is no largest odd number', '$N + 2$ is even'],
          answer: 1,
          working: 'Assume the exact negation: there is a largest even number $N$. Then $N + 2$ is even and larger, a contradiction.',
        },
      ],
      lines: [
        { say: 'Your turn. To prove that there is no largest even number by contradiction, what do you assume first? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Assume the exact negation: there is a largest even number, N. Then N plus two is even and larger than N, which is a contradiction.', show: 'q.answer' },
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
          items: ['Assume the exact negation, and reach something impossible.', '$\\sqrt{2} = \\tfrac{a}{b}$ in lowest terms makes $a$ and $b$ both even.', '$p_1p_2\\cdots p_n + 1$ has a prime factor missing from any finite list.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A proof by contradiction assumes the exact negation of the statement, and reaches something impossible.', show: 'sum.0' },
        { say: 'Root two is irrational, because writing it as a fraction in lowest terms forces both parts to be even.', show: 'sum.1' },
        { say: 'And there are infinitely many primes, because the product of any finite list, plus one, has a new prime factor. In the next lesson, we split fractions into partial fractions. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
