import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { factorTree } from '@/video/numbers.ts';

// Factor trees for 20 = 2 × 2 × 5 and 12 = 2 × 2 × 3.
const trees = figure('ft', [factorTree({ name: 'a', tree: [20, [4, 2, 2], 5] }), factorTree({ name: 'b', tree: [12, [4, 2, 2], 3], at: [5.6, 0] })], 330);

// A factor tree for 20 alone, for the reminder about prime factors.
const twenty = figure('tw', [factorTree({ tree: [20, [4, 2, 2], 5] })], 330);

const video: Explainer = {
  id: 'm7-1-2-d',
  lessonId: 'm7-1-2',
  title: 'Fractions and Decimals, Part 4: Which Fractions Terminate?',
  thumbnailTitle: 'Which Fractions Terminate?',
  thumbnail: 'ft',
  summary:
    'Write the fraction in lowest terms and find the prime factors of its denominator. Only 2s and 5s: the decimal terminates, because 10 = 2 × 5 and the denominator can be grown into 10, 100 or 1000. Any other prime factor, such as 3, 7 or 11: the decimal repeats. 7/20 = 0.35 terminates, 5/12 = 0.41666… repeats, and 9/12 = 3/4 = 0.75 terminates once it is simplified.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Number Relationships · Part 4', title: 'Which Fractions Terminate?', subtitle: 'Look at the denominator' }],
      lines: [
        { say: 'Will a fraction make a decimal that stops, or one that repeats forever? You can tell before you divide, just by looking at the denominator.', show: 'title' },
        { say: 'In this part, you will learn the test, see why it works, and use it on three fractions.' },
      ],
    },
    {
      chapter: 'Prime factors',
      layout: 'split',
      leftWidth: 480,
      left: [twenty],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Prime factors', md: 'A **prime number** has exactly two factors: $1$ and itself, like $2$, $3$, $5$, $7$ and $11$. The **prime factors** of a number are the primes that multiply to make it.' },
        { kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['20 = 2 \\times 2 \\times 5'] },
      ],
      lines: [
        { say: 'First, a reminder. A prime number has exactly two factors: one and itself. Two, three, five, seven and eleven are prime.', show: 'def' },
        { say: 'The prime factors of a number are the primes that multiply to make it. A factor tree finds them. Twenty is four times five.', show: ['tw.level0', 'tw.level1'] },
        { say: 'Five is prime, so its branch stops. Four is two times two, and two is prime.', show: ['tw.level2', 'tw.primes'] },
        { say: 'So the prime factors of twenty are two, two and five.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'The test',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Terminate or repeat?', md: 'Write the fraction in **lowest terms**. Then find the prime factors of the denominator.' },
        {
          kind: 'bullets',
          id: 'b',
          items: ['Only $2$s and $5$s: the decimal **terminates**.', 'Any other prime factor, like $3$, $7$ or $11$: the decimal **repeats**.'],
        },
      ],
      lines: [
        { say: 'Here is the test. First, write the fraction in lowest terms. That means the numerator and the denominator have no common factor except one.', show: 'key' },
        { say: 'Then find the prime factors of the denominator. If they are only twos and fives, the decimal terminates.', show: 'b.0' },
        { say: 'If there is any other prime factor, like three, seven or eleven, the decimal repeats.', show: 'b.1' },
      ],
    },
    {
      chapter: 'Why it works',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['10 = 2 \\times 5', '100 = 2 \\times 2 \\times 5 \\times 5', '1000 = 2 \\times 2 \\times 2 \\times 5 \\times 5 \\times 5', '20 \\times 5 = 2 \\times 2 \\times 5 \\times \\good{5} = 100'] },
      ],
      lines: [
        { say: 'Why does this work? Ten is two times five. And one hundred and one thousand are made of only twos and fives as well.', show: ['m.0', 'm.1', 'm.2'] },
        { say: 'A denominator made of twos and fives can always be grown into ten, one hundred or one thousand. Twenty is two times two times five. Multiply by one more five, and you get one hundred.', show: 'm.3', focus: 'm.3' },
        { say: 'So a fraction over twenty can be written in hundredths, and its decimal stops.' },
        { say: 'But no whole number times three makes ten, one hundred or one thousand, because they have no threes in them. A denominator with a three can never become tenths or hundredths, so its decimal never stops.' },
      ],
    },
    {
      chapter: 'Terminate or repeat?',
      layout: 'split',
      leftWidth: 560,
      left: [trees],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Which of $\\dfrac{7}{20}$, $\\dfrac{5}{12}$ and $\\dfrac{9}{12}$ are terminating decimals?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\dfrac{7}{20}: \\ 2 \\times 2 \\times 5 \\ \\rightarrow \\ 0.35', '\\dfrac{5}{12}: \\ 2 \\times 2 \\times \\bad{3} \\ \\rightarrow \\ 0.41\\overline{6}'] },
      ],
      lines: [
        { say: 'Which of these are terminating decimals: seven twentieths, five twelfths and nine twelfths?', show: 'q' },
        { say: 'Seven twentieths is in lowest terms. Twenty is two times two times five: only twos and fives. So it terminates. Seven twentieths is thirty-five hundredths, or zero point three five.', show: ['ft.a-level0', 'ft.a-level1', 'ft.a-level2', 'ft.a-primes', 'm.0'], focus: 'm.0' },
        { say: 'Five twelfths is in lowest terms as well. Twelve is two times two times three. There is a three, so it repeats. Dividing gives zero point four one, then six repeating.', show: ['ft.b-level0', 'ft.b-level1', 'ft.b-level2', 'ft.b-primes', 'm.1'], focus: ['m.1', 'ft.b-n1'] },
      ],
    },
    {
      chapter: 'Simplify first',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{9}{12} = \\dfrac{9 \\div 3}{12 \\div 3} = \\dfrac{3}{4}', '4 = 2 \\times 2 \\ \\rightarrow \\ \\dfrac34 = 0.75'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Simplify first', md: '$\\dfrac{9}{12}$ has a $3$ in its denominator, but it still terminates. Always write the fraction in lowest terms **before** you look at the denominator.' },
      ],
      lines: [
        { say: 'Now nine twelfths. Twelve has a three in it, so you might think it repeats. But wait: nine twelfths is not in lowest terms.', show: 'tip' },
        { say: 'Nine and twelve are both divisible by three. Divide both by three, and nine twelfths becomes three quarters.', show: 'm.0', focus: 'm.0' },
        { say: 'Four is two times two, only twos. So three quarters terminates. It is zero point seven five.', show: 'm.1', focus: 'm.1' },
        { say: 'So seven twentieths and nine twelfths terminate, and five twelfths repeats. Always simplify first!' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which fraction is a **terminating** decimal?',
          choices: ['$\\dfrac{1}{7}$', '$\\dfrac{2}{15}$', '$\\dfrac{6}{15}$', '$\\dfrac{4}{9}$'],
          answer: 2,
          working: '$\\dfrac{6}{15} = \\dfrac{2}{5}$ in lowest terms, and $5$ is the only prime factor of the denominator, so it terminates: $0.4$. $\\dfrac{2}{15}$ is already in lowest terms, and $15 = 3 \\times 5$ has a $3$, so it repeats.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these fractions is a terminating decimal? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Six fifteenths simplifies to two fifths, so it terminates: zero point four. Choice B is already in lowest terms, and fifteen is three times five. The three makes it repeat.', show: 'q.answer' },
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
            'Write the fraction in **lowest terms** first.',
            'Denominator with only $2$s and $5$s as prime factors: the decimal **terminates**.',
            'Any other prime factor, like $3$, $7$ or $11$: the decimal **repeats**.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. First, write the fraction in lowest terms.', show: 'sum.0' },
        { say: 'If the prime factors of the denominator are only twos and fives, the decimal terminates.', show: 'sum.1' },
        { say: 'If there is any other prime factor, the decimal repeats. In the next part, you will go the other way, and change decimals into fractions. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
