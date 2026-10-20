import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { heightFor } from '@/content/math5/videos/lib/m5-4-figures.ts';
import { bar } from '@/content/math5/videos/lib/m5-5-figures.ts';
import { note } from './lib/m6-1-figures.ts';
import { decimalDivision } from './lib/m6-2-figures.ts';

// A 7.82 m rope cut into 17 equal pieces; one piece is shaded.
const rope = figure(
  'rp',
  [
    bar({ parts: 17, shaded: 1, tone: 'theta', width: 12, height: 1, label: '7.82\\text{ m}', labelPlace: 'above' }),
    note({ id: 'piece', at: [12 / 34, -0.25], tex: '\\text{one piece?}', tone: 'theta', place: 'below right' }),
  ],
  240,
);

// 7.82 ÷ 17 = 0.46: 0 in the ones, 78 − 68 = 10, bring down 2 to make 102, 102 − 102 = 0.
const work = (() => {
  const part = decimalDivision({
    divisor: '17',
    dividend: '7.82',
    quotient: '046',
    steps: [
      { prod: '68', at: 1, diff: '10', down: true },
      { prod: '102', at: 2, diff: '0' },
    ],
  });
  return figure('ld', [part], heightFor(part, 50));
})();

const video: Explainer = {
  id: 'm6-2-3-b',
  lessonId: 'm6-2-3',
  title: 'Dividing Decimal and Natural Numbers, Part 2: Dividing a Decimal Number',
  thumbnailTitle: 'Dividing a Decimal',
  thumbnail: 'ld',
  summary: 'Dividing a decimal number by long division: put the decimal point in the quotient right above the point in the dividend, then divide as usual. A 7.82 m rope cut into 17 equal pieces gives pieces 0.46 m long (a 0 in the ones place, then 78 ÷ 17 and 102 ÷ 17), checked by multiplying 0.46 × 17 = 7.82.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Operations and Problem Solving · Part 2', title: 'Dividing a Decimal Number', subtitle: 'The point goes straight up' }],
      lines: [
        { say: 'A rope that is 7.82 metres long is cut into seventeen equal pieces. How long is each piece?', show: 'title' },
        { say: 'In this video, you will divide a decimal number with long division, and see exactly where the decimal point goes in the quotient.' },
      ],
    },
    {
      chapter: 'The rope',
      layout: 'center',
      main: [rope, { kind: 'math', id: 'm', size: 'lg', lines: ['7.82 \\div 17 = \\; ?'] }],
      lines: [
        { say: 'Picture the rope, 7.82 metres long, cut into seventeen equal pieces. Splitting into equal pieces means divide: 7.82 divided by 17.', show: ['rp.frame', 'rp.label', 'm.0'] },
        { say: 'Before we start, think about the size of the answer. Seventeen pieces of one metre would need seventeen metres of rope. We only have about eight.', show: ['rp.shade', 'rp.piece'], focus: 'rp.shade' },
        { say: 'So each piece must be less than one metre long. The quotient should be less than one.' },
      ],
    },
    {
      chapter: 'Where the point goes',
      layout: 'center',
      main: [{ kind: 'callout', id: 'key', tone: 'key', title: 'Dividing a decimal number', md: 'Divide the same way as with whole numbers. Put the decimal point in the quotient **right above** the decimal point in the dividend.' }],
      lines: [
        { say: 'To divide a decimal number, use long division, just as with whole numbers. Divide, multiply, subtract, bring down.', show: 'key' },
        { say: 'There is just one new thing. Put the decimal point in the quotient right above the decimal point in the dividend. Do it first, before you divide, so you do not forget.' },
      ],
    },
    {
      chapter: 'Divide 7.82 by 17',
      layout: 'split',
      leftWidth: 480,
      left: [work],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['17,\\ 34,\\ 51,\\ \\thc{68},\\ 85,\\ \\thc{102}', '4 \\times 17 = 68, \\quad 78 - 68 = 10', '6 \\times 17 = 102, \\quad 102 - 102 = 0', '7.82 \\div 17 = 0.46'] }],
      lines: [
        { say: 'Write 7.82 inside the bracket, and 17 outside. First, put the decimal point in the quotient, right above the point in 7.82.', show: ['ld.bracket', 'ld.dividend', 'ld.dv', 'ld.qp'], focus: ['ld.dp', 'ld.qp'] },
        { say: 'Here are the multiples of 17 again: 17, 34, 51, 68, 85, 102.', show: 'm.0' },
        { say: 'Seventeen does not go into seven. So write a zero in the ones place, and use the first two digits, 78.', show: 'ld.q0', focus: ['ld.q0', 'ld.dd0', 'ld.dd1'] },
        { say: 'Divide: four groups of 17 make 68, and five groups would make 85, which is too big. Write the four above the eight. Multiply: four times 17 is 68. Subtract: 78 minus 68 is ten.', show: ['ld.q1', 'ld.s0-prod', 'ld.s0-rule', 'ld.s0-diff', 'm.1'], focus: ['ld.q1', 'm.1'] },
        { say: 'Bring down the two to make 102.', show: ['ld.s0-arrow', 'ld.s0-down'], focus: ['ld.s0-diff', 'ld.s0-down'] },
        { say: 'Divide: six groups of 17 make 102 exactly. Write the six above the two. Subtract: 102 minus 102 is zero.', hide: 'ld.s0-arrow', show: ['ld.q2', 'ld.s1-prod', 'ld.s1-rule', 'ld.s1-diff', 'm.2'], focus: ['ld.q2', 'm.2'] },
        { say: 'So 7.82 divided by 17 is 0.46. Each piece of rope is 0.46 metres long, less than one metre, just as we expected.', show: 'm.3', focus: ['ld.quotient', 'm.3'] },
      ],
    },
    {
      chapter: 'Check',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['46 \\times 17 = 782', '0.46 \\times 17 = 7.82 \\;\\good{\\checkmark}'] }],
      lines: [
        { say: 'Check by multiplying the quotient by the divisor. 46 times 17 is 782.', show: 'm.0', focus: 'm.0' },
        { say: '0.46 has two decimal places, so 0.46 times 17 is 7.82. That is the length of the whole rope, so the answer is right.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting the decimal point', md: '$7.82 \\div 17$ is not $46$. A $7.82$ m rope cannot be cut into pieces $46$ m long! Put the point in the quotient **first**, right above the point in the dividend.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{46} \\quad \\bad{\\times} \\qquad \\good{0.46} \\quad \\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'Watch out for this mistake. If you forget the decimal point, you might write the quotient as 46.', show: ['oops', 'm.0'] },
        { say: 'But a rope 7.82 metres long cannot be cut into pieces 46 metres long! Always put the point in the quotient first, and check that the size of the answer makes sense.', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A $9.75$ m ribbon is cut into $15$ equal pieces. How long is each piece?',
          choices: ['$65$ m', '$6.5$ m', '$0.65$ m', '$0.75$ m'],
          answer: 2,
          working: 'Put the point above the point in $9.75$. $15$ does not go into $9$, so write $0$. $15$ goes into $97$ six times ($90$), leaving $7$. Bring down the $5$: $15$ goes into $75$ five times. So $9.75 \\div 15 = 0.65$.',
        },
      ],
      lines: [
        { say: 'Your turn. A ribbon 9.75 metres long is cut into fifteen equal pieces. How long is each piece? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, 0.65 metres. Fifteen does not go into nine, so write a zero in the ones place. Fifteen goes into 97 six times, leaving seven. Bring down the five: fifteen goes into 75 five times. Choice A forgets the decimal point.', show: 'q.answer' },
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
          items: ['Divide a decimal number with long division, as with whole numbers.', 'Put the decimal point in the quotient right above the point in the dividend.', 'If the divisor does not go into the first digit, write a $0$ there.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Divide a decimal number with long division, just as with whole numbers.', show: 'sum.0' },
        { say: 'Put the decimal point in the quotient right above the decimal point in the dividend.', show: 'sum.1' },
        { say: 'And if the divisor does not go into the first digit, write a zero there. In the next part, we turn a remainder into a decimal. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
