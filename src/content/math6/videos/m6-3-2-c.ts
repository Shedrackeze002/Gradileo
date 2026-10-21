import type { Explainer } from '@/video/script.ts';
import { factorTree } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';

// A factor tree for 72: 72 = 8 × 9, 8 = 2 × 4, 4 = 2 × 2 and 9 = 3 × 3.
const tree = (id: string) => figure(id, [factorTree({ tree: [72, [8, 2, [4, 2, 2]], [9, 3, 3]], gap: 1.5, drop: 1.5 })]);

const video: Explainer = {
  id: 'm6-3-2-c',
  lessonId: 'm6-3-2',
  title: 'Powers, Part 3: Powers in a Prime Factorization',
  thumbnailTitle: 'Powers in a Prime Factorization',
  thumbnail: 'ft',
  summary:
    'A factor tree gives 72 = 2 × 2 × 2 × 3 × 3, and writing the repeated primes as powers gives 72 = 2³ × 3². Going back, 2² × 3 × 5 = 4 × 3 × 5 = 60. Powers with different bases stay separate: 2³ × 3² is 8 × 9 = 72, not 6⁵.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Prime Factorization and Powers · Part 3', title: 'Powers in a Prime Factorization', subtitle: 'A shorter way to write the primes' }],
      lines: [
        { say: 'A prime factorization can use the same prime many times. Powers make it much shorter to write.', show: 'title' },
        { say: 'In this part, you will write a prime factorization with powers, and turn powers back into the number.' },
      ],
    },
    {
      chapter: 'A factor tree for 72',
      layout: 'split',
      leftWidth: 520,
      left: [tree('ft')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['72 = 8 \\times 9', '8 = 2 \\times 4', '4 = 2 \\times 2', '9 = 3 \\times 3', '72 = 2 \\times 2 \\times 2 \\times 3 \\times 3'] }],
      lines: [
        { say: 'Let’s find the prime factorization of seventy-two. Start a factor tree. Seventy-two is eight times nine.', show: ['ft.level0', 'ft.level1', 'm.0'], focus: 'm.0' },
        { say: 'Eight is composite. Eight is two times four.', show: ['ft.b00', 'ft.n00', 'ft.b01', 'ft.n01', 'm.1'], focus: 'm.1' },
        { say: 'Four is composite as well. Four is two times two.', show: ['ft.level3', 'm.2'], focus: 'm.2' },
        { say: 'Nine is composite. Nine is three times three.', show: ['ft.b10', 'ft.n10', 'ft.b11', 'ft.n11', 'm.3'], focus: 'm.3' },
        { say: 'Now every branch ends in a prime. Circle them: two, two, two, three and three. So seventy-two equals two times two times two times three times three.', show: ['ft.primes', 'm.4'], focus: ['ft.primes', 'm.4'] },
      ],
    },
    {
      chapter: 'Write it with powers',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['72 = \\adj{2 \\times 2 \\times 2} \\times \\opp{3 \\times 3}', '\\adj{2 \\times 2 \\times 2 = 2^3} \\qquad \\opp{3 \\times 3 = 3^2}', '72 = \\adj{2^3} \\times \\opp{3^2}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'A prime used once', md: 'A prime that appears only once needs no exponent: $60 = 2 \\times 2 \\times 3 \\times 5 = 2^2 \\times 3 \\times 5$.' },
      ],
      lines: [
        { say: 'Now write the repeated primes as powers. Look at the factors of two and the factors of three separately.', show: 'm.0', focus: 'm.0' },
        { say: 'Two is a factor three times, so two times two times two is two cubed. Three is a factor two times, so three times three is three squared.', show: 'm.1', focus: 'm.1' },
        { say: 'So seventy-two equals two cubed times three squared. That is much shorter!', show: 'm.2', focus: 'm.2' },
        { say: 'A prime that appears only once needs no exponent. For example, sixty is two times two times three times five. With powers, that is two squared times three times five.', show: 'tip' },
      ],
    },
    {
      chapter: 'From powers back to the number',
      layout: 'center',
      main: [
        { kind: 'text', id: 't', size: 'md', md: 'What number has the prime factorization $2^2 \\times 3 \\times 5$?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['2^2 = 2 \\times 2 = 4', '4 \\times 3 \\times 5 = 12 \\times 5 = 60'] },
      ],
      lines: [
        { say: 'You can go the other way as well. What number has the prime factorization two squared times three times five?', show: 't' },
        { say: 'First, find the value of the power. Two squared is two times two, which is four.', show: 'm.0', focus: 'm.0' },
        { say: 'Then multiply all the factors. Four times three is twelve, and twelve times five is sixty.', show: 'm.1', focus: 'm.1' },
        { say: 'So the number is sixty. That matches the prime factorization of sixty that we just wrote with powers.' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Multiplying the bases', md: '$2^3 \\times 3^2$ is not $6^5$. The bases are different, so they stay as separate powers: $8 \\times 9 = 72$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['2^3 \\times 3^2 \\ne \\bad{6^5}', '2^3 \\times 3^2 = 8 \\times 9 = \\good{72}'] },
      ],
      lines: [
        { say: 'Watch out for this mistake. Two cubed times three squared is not six to the power of five.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'The bases, two and three, are different. So you cannot join them into one power. Keep them as separate powers.' },
        { say: 'Find each value. Two cubed is eight, and three squared is nine. Eight times nine is seventy-two.', show: 'm.1', focus: 'm.1' },
        { say: 'Six to the power of five is seven thousand, seven hundred seventy-six. That is a very different number!' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What is the prime factorization of $48$, written with powers?',
          choices: ['$2^4 \\times 3$', '$2^3 \\times 6$', '$4^2 \\times 3$', '$2 \\times 3^4$'],
          answer: 0,
          working: '$48 = 2 \\times 2 \\times 2 \\times 2 \\times 3$. Two is a factor $4$ times, so $48 = 2^4 \\times 3$. Check: $16 \\times 3 = 48$.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the prime factorization of forty-eight, written with powers? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Forty-eight is two times two times two times two times three. Two is a factor four times, so that is two to the power of four, times three. Choice C, four squared times three, does make forty-eight, but four is not a prime number.', show: 'q.answer' },
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
            'In a prime factorization, write repeated primes as powers: $72 = 2^3 \\times 3^2$.',
            'A prime that appears once needs no exponent: $60 = 2^2 \\times 3 \\times 5$.',
            'To find the number, find the value of each power, then multiply.',
            'Powers with different bases stay separate: $2^3 \\times 3^2 = 8 \\times 9$, not $6^5$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In a prime factorization, write the repeated primes as powers. Seventy-two is two cubed times three squared.', show: 'sum.0' },
        { say: 'A prime that appears only once needs no exponent.', show: 'sum.1' },
        { say: 'To go back to the number, find the value of each power, then multiply.', show: 'sum.2' },
        { say: 'And powers with different bases stay separate. In the next lesson, you will use prime factorizations to find common factors. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
