import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { factorRings } from './lib/m9-2-figures.ts';

const N = '{-2}';
// (−2)⁶: three pairs of negative twos, each pair making 4.
const even = figure(
  'ev',
  [
    factorRings({
      groups: [
        { id: 'p0', values: [N, N], tone: 'opp', below: '4' },
        { id: 'p1', values: [N, N], tone: 'opp', below: '4' },
        { id: 'p2', values: [N, N], tone: 'opp', below: '4' },
      ],
      gap: 1.5,
      groupGap: 0.8,
      r: 0.62,
      over: '(-2)^6 = 4 \\times 4 \\times 4 = 64',
    }),
  ],
  300,
);
// (−2)⁵: two pairs, and one negative two left over.
const odd = figure(
  'od',
  [
    factorRings({
      groups: [
        { id: 'p0', values: [N, N], tone: 'opp', below: '4' },
        { id: 'p1', values: [N, N], tone: 'opp', below: '4' },
        { id: 'p2', values: [N], tone: 'bad', below: '\\text{left over}' },
      ],
      gap: 1.5,
      groupGap: 0.8,
      r: 0.62,
      over: '(-2)^5 = 4 \\times 4 \\times (-2) = -32',
    }),
  ],
  300,
);

const video: Explainer = {
  id: 'm9-2-1-d',
  lessonId: 'm9-2-1',
  title: 'Using Exponents to Describe Numbers, Part 4: Even and Odd Exponents',
  thumbnailTitle: 'Even and Odd Exponents',
  thumbnail: 'ev',
  summary:
    'Negative factors cancel in pairs, because (−2) × (−2) = 4. So a negative base with an even exponent gives a positive value, (−2)⁶ = 64, and with an odd exponent one negative factor is left over, so the value is negative, (−2)⁵ = −32. (−7)⁹ is negative (odd exponent), and −7¹⁰ is negative too, because its base is 7 and the minus sign is in front.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Powers and Exponent Laws · Part 4', title: 'Even and Odd Exponents', subtitle: 'Predicting the sign of a power' }],
      lines: [
        { say: 'Negative seven, all to the power of nine, is a huge number. Can you tell whether it is positive or negative without working it out?', show: 'title' },
        { say: 'Yes, you can. In this part, you will see how the exponent decides the sign of a power with a negative base.' },
      ],
    },
    {
      chapter: 'Pairs of negatives',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['(-2) \\times (-2) = 4'] }, even],
      lines: [
        { say: 'Start with one pair. Negative two times negative two is positive four. Two negative factors make a positive product.', show: 'm', focus: 'm' },
        { say: 'Now take negative two, all to the power of six. That is six factors of negative two.', show: ['ev.p0', 'ev.p1', 'ev.p2'] },
        { say: 'Group them in pairs. Each pair makes positive four.', show: ['ev.p0-b', 'ev.p1-b', 'ev.p2-b'], focus: ['ev.p0-b', 'ev.p1-b', 'ev.p2-b'] },
        { say: 'Six factors make three pairs, with nothing left over. Four times four times four is sixty-four, which is positive.', show: 'ev.over', focus: 'ev.over' },
      ],
    },
    {
      chapter: 'One left over',
      layout: 'center',
      main: [odd],
      lines: [
        { say: 'Now take negative two, all to the power of five: five factors of negative two.', show: ['od.p0', 'od.p1', 'od.p2'] },
        { say: 'Group them in pairs again. Two pairs each make four, but one negative two is left over, with no partner.', show: ['od.p0-b', 'od.p1-b', 'od.p2-b'], focus: 'od.p2-b' },
        { say: 'Four times four is sixteen, and sixteen times negative two is negative thirty-two. The value is negative.', show: 'od.over', focus: 'od.over' },
      ],
    },
    {
      chapter: 'Even or odd?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Negative base, even exponent', md: 'The negative factors pair up, so the value is **positive**: $(-2)^6 = 64$.' },
        { kind: 'callout', id: 'odd', tone: 'key', title: 'Negative base, odd exponent', md: 'One negative factor is left over, so the value is **negative**: $(-2)^5 = -32$.' },
      ],
      lines: [
        { say: 'So here is the rule for a negative base. With an even exponent, like two, four or six, the negative factors pair up, and the value is positive.', show: 'key' },
        { say: 'With an odd exponent, like one, three or five, one negative factor is left over, so the value is negative.', show: 'odd' },
        { say: 'The exponent alone tells you the sign, without any multiplying.' },
      ],
    },
    {
      chapter: 'Predicting the sign',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Is $(-7)^9$ positive or negative? Is $-7^{10}$ positive or negative?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['(-7)^9\\colon \\ \\text{base } {-7}, \\text{ odd exponent, so negative}', '-7^{10} = -\\left(7^{10}\\right)\\colon \\ \\text{base } 7, \\text{ so negative}'] },
      ],
      lines: [
        { say: 'Is negative seven, all to the power of nine, positive or negative? And what about the negative of seven to the power of ten?', show: 'q' },
        { say: 'In the first, the brackets make the base negative seven. Nine is odd, so one negative factor is left over. The value is negative.', show: 'm.0', focus: 'm.0' },
        { say: 'In the second, there are no brackets, so the base is seven. Seven to the power of ten is positive, and the minus sign in front makes it negative.', show: 'm.1', focus: 'm.1' },
        { say: 'So both values are negative.' },
      ],
    },
    {
      chapter: 'Check the base first',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Check the base first', md: 'The even and odd rule is for a **negative base** in brackets. $-7^{10}$ has an even exponent, but its base is $7$, and the minus sign in front makes it **negative**.' },
      ],
      lines: [
        { say: 'Here is a trap. The negative of seven to the power of ten has an even exponent, so it is tempting to say it is positive.', show: 'oops' },
        { say: 'But the even and odd rule is only for a negative base inside brackets. Here the base is seven. So check the base first, and then use the exponent.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which of these has a positive value?',
          choices: ['$(-3)^5$', '$(-3)^4$', '$-3^4$', '$-3^5$'],
          answer: 1,
          working: '$(-3)^4$ has base $-3$ and an even exponent, so it is positive: $81$. $(-3)^5 = -243$, $-3^4 = -81$ and $-3^5 = -243$.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these has a positive value? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, negative three, all to the power of four. Its base is negative three, and four is even. Choice C, the negative of three to the power of four, also has an even exponent, but its base is three, and the minus sign in front makes it negative.', show: 'q.answer' },
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
            'Negative factors cancel in pairs: $(-2) \\times (-2) = 4$.',
            'Negative base, **even** exponent: positive. $(-2)^6 = 64$',
            'Negative base, **odd** exponent: negative. $(-2)^5 = -32$',
            'Check the base first: $-7^{10}$ is negative.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Negative factors cancel in pairs.', show: 'sum.0' },
        { say: 'A negative base with an even exponent gives a positive value.', show: 'sum.1' },
        { say: 'A negative base with an odd exponent gives a negative value.', show: 'sum.2' },
        { say: 'And always check the base first. In the next lesson, you will learn the exponent laws, shortcuts for multiplying and dividing powers. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
