import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { shift } from '@/content/math6/videos/lib/m6-11-figures.ts';
import { factorRings } from './lib/m9-2-figures.ts';
import { tag } from './lib/m9-1-figures.ts';

// (−2)⁴ is four rings of −2; −2⁴ is four rings of 2 with the minus sign outside them.
const rings = figure(
  'rg',
  [
    tag('a-name', [-1.6, 0], '(-2)^4', { place: 'left', tone: 'theta' }),
    factorRings({ name: 'a', groups: [{ id: 'f', values: ['{-2}', '{-2}', '{-2}', '{-2}'], tone: 'opp' }], gap: 1.5, r: 0.62 }),
    tag('a-eq', [5.35, 0], '= 16', { place: 'right' }),
    tag('b-name', [-1.6, -2.4], '-2^4', { place: 'left', tone: 'theta' }),
    tag('b-minus', [-1.05, -2.4], '\\Large -', { tone: 'bad' }),
    shift(factorRings({ name: 'b', groups: [{ id: 'f', values: ['2', '2', '2', '2'], tone: 'adj' }], gap: 1.5, r: 0.62 }), 0, -2.4),
    tag('b-eq', [5.35, -2.4], '= {-16}', { place: 'right' }),
    { points: { room: [-3.8, 0] }, items: [] },
  ],
  360,
);

const video: Explainer = {
  id: 'm9-2-1-c',
  lessonId: 'm9-2-1',
  title: 'Using Exponents to Describe Numbers, Part 3: Negative Bases and Brackets',
  thumbnailTitle: 'Negative Bases and Brackets',
  thumbnail: 'rg',
  summary:
    'Brackets decide what the base is. In (−2)⁴ the base is −2, so (−2)⁴ = (−2) × (−2) × (−2) × (−2) = 16. In −2⁴ the base is 2: work out 2⁴ = 16 first, then take the opposite, −16. In the same way (−3)⁴ = 81 but −3⁴ = −81, and −5² = −25, not 25; only (−5)² = 25.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Powers and Exponent Laws · Part 3', title: 'Negative Bases and Brackets', subtitle: 'Brackets decide the base' }],
      lines: [
        { say: 'Is negative two to the power of four a positive number or a negative number? The answer depends on something small: brackets.', show: 'title' },
        { say: 'In this part, you will see how brackets decide what the base is, and how to evaluate powers with negative numbers.' },
      ],
    },
    {
      chapter: 'With brackets',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['(-2)^4 = (-2) \\times (-2) \\times (-2) \\times (-2)', '= \\good{4} \\times (-2) \\times (-2)', '= {-8} \\times (-2)', '= 16'] },
      ],
      lines: [
        { say: 'Look at negative two, all to the power of four. The brackets hold negative two, so the base is negative two. It is a factor four times.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiply one factor at a time. Negative two times negative two is positive four, because a negative times a negative is positive.', show: 'm.1', focus: 'm.1' },
        { say: 'Four times negative two is negative eight.', show: 'm.2', focus: 'm.2' },
        { say: 'And negative eight times negative two is positive sixteen. So negative two, all to the power of four, is sixteen.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Without brackets',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['-2^4 = -(2 \\times 2 \\times 2 \\times 2)', '= -(16)', '= {-16}'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'No brackets', md: 'Without brackets, the exponent belongs to the number only. Work out the power first, then take the opposite.' },
      ],
      lines: [
        { say: 'Now look at the same symbols without brackets. Here the exponent belongs to the two only. The base is two, not negative two.', show: 'm.0', focus: 'm.0' },
        { say: 'So we say the negative of two to the power of four. Work out the power first: two to the power of four is sixteen.', show: 'm.1', focus: 'm.1' },
        { say: 'Then take the opposite. The answer is negative sixteen.', show: ['m.2', 'key'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'What is the base?',
      layout: 'center',
      main: [rings],
      lines: [
        { say: 'Picture each factor in a ring. In negative two, all to the power of four, the brackets put negative two in every ring.', show: ['rg.a-name', 'rg.a-f'] },
        { say: 'Four negative twos multiply to positive sixteen.', show: 'rg.a-eq', focus: 'rg.a-eq' },
        { say: 'In the negative of two to the power of four, each ring holds just two. The minus sign stays outside the rings.', show: ['rg.b-name', 'rg.b-f', 'rg.b-minus'], focus: 'rg.b-minus' },
        { say: 'So multiply the twos first, to get sixteen, and then apply the minus sign. The value is negative sixteen.', show: 'rg.b-eq', focus: 'rg.b-eq' },
      ],
    },
    {
      chapter: 'Compare them',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Power', 'Base', 'Meaning', 'Value'],
          rows: [
            ['$(-2)^4$', '$-2$', '$(-2) \\times (-2) \\times (-2) \\times (-2)$', '$16$'],
            ['$-2^4$', '$2$', '$-(2 \\times 2 \\times 2 \\times 2)$', '$-16$'],
            ['$(-2)^3$', '$-2$', '$(-2) \\times (-2) \\times (-2)$', '$-8$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are three powers side by side. Negative two, all to the power of four, has the base negative two. Its value is sixteen.', show: 't.0', focus: 't.0' },
        { say: 'The negative of two to the power of four has the base two. Its value is negative sixteen.', show: 't.1', focus: 't.1' },
        { say: 'And negative two, all cubed, has the base negative two, used three times. Negative two times negative two is four, and four times negative two is negative eight.', show: 't.2', focus: 't.2' },
        { say: 'So always ask first: what is the base? Look for brackets.', focus: 't' },
      ],
    },
    {
      chapter: 'Negative three',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Evaluate $(-3)^4$ and $-3^4$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['(-3)^4 = (-3) \\times (-3) \\times (-3) \\times (-3) = 81', '-3^4 = -(3 \\times 3 \\times 3 \\times 3) = {-81}'] },
      ],
      lines: [
        { say: 'Evaluate negative three, all to the power of four, and the negative of three to the power of four.', show: 'q' },
        { say: 'In the first, the base is negative three, a factor four times. Four negative factors make a positive product, so the value is eighty-one.', show: 'm.0', focus: 'm.0' },
        { say: 'In the second, there are no brackets, so the base is three. Three to the power of four is eighty-one, and its opposite is negative eighty-one.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Is the minus sign in the base?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Is the minus sign part of the base?', md: '$-5^2$ is **not** $25$. Without brackets, the exponent belongs to $5$ only: $-5^2 = -(5 \\times 5) = -25$. Only $(-5)^2 = 25$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['-5^2 = -(5 \\times 5) = {-25}', '(-5)^2 = (-5) \\times (-5) = 25'] },
      ],
      lines: [
        { say: 'Here is a very common mistake. The negative of five squared is not twenty-five.', show: 'oops' },
        { say: 'Without brackets, the exponent belongs to the five only. Five times five is twenty-five, and the minus sign in front makes it negative twenty-five.', show: 'm.0', focus: 'm.0' },
        { say: 'Only negative five, all squared, is twenty-five, because the brackets put the minus sign inside the base.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Evaluate $-4^2$.',
          choices: ['$16$', '$8$', '$-8$', '$-16$'],
          answer: 3,
          working: 'There are no brackets, so the base is $4$: $-4^2 = -(4 \\times 4) = -16$.',
        },
      ],
      lines: [
        { say: 'Your turn. Evaluate the negative of four squared. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, negative sixteen. There are no brackets, so the base is four. Four times four is sixteen, and its opposite is negative sixteen. Choice A, sixteen, is negative four, all squared, but that needs brackets.', show: 'q.answer' },
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
            'Brackets decide the base: in $(-2)^4$ the base is $-2$; in $-2^4$ it is $2$.',
            '$(-2)^4 = 16$, but $-2^4 = -(2^4) = -16$.',
            'Without brackets, work out the power first, then take the opposite: $-5^2 = -25$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Brackets decide the base. With brackets, the negative number is the base. Without them, the base is just the number.', show: 'sum.0' },
        { say: 'So negative two, all to the power of four, is sixteen, but the negative of two to the power of four is negative sixteen.', show: 'sum.1' },
        { say: 'Without brackets, work out the power first, then take the opposite. In the next part, you will predict the sign of a power from its exponent. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
