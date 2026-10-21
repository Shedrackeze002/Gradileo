import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { dotGroups } from '@/content/math6/videos/lib/m6-4-figures.ts';
import { hundredGrid } from '@/content/math5/videos/lib/m5-6-figures.ts';
import { placeChart } from '@/content/math5/videos/lib/m5-1-figures.ts';
import { shift } from '@/content/math6/videos/lib/m6-11-figures.ts';
import { spare, tag } from './lib/m7-1-figures.ts';

// One ten shared two ways: 2 groups of 5, and 5 groups of 2.
const ten = figure('t', [
  dotGroups({ name: 'a', groups: 2, size: 5, cols: 5 }),
  tag('a-cap', [3.83, 0.6], '\\text{2 groups of 5}'),
  shift(dotGroups({ name: 'b', groups: 5, size: 2, cols: 1 }), 0.13, -2.4),
  tag('b-cap', [3.83, -4.75], '\\text{5 groups of 2}', { place: 'below' }),
], 430);

// A hundred grid in four blocks of 25: a hundred is divisible by 4.
const grid = figure('g', [hundredGrid({ block: [5, 5], shaded: 1, tone: 'theta', size: 0.6 })], 420);

// 5316 in a place value chart: the last two digits, then the last three.
const chart = figure('pc', [placeChart({ places: ['Thousands', 'Hundreds', 'Tens', 'Ones'], rows: [['5', '3', '1', '6']] })], 260);

// 34 counters in groups of 4: 8 groups, and 2 left over.
const thirtyFour = figure('h', [
  dotGroups({ groups: 8, size: 4, cols: 2, perRow: 4 }),
  spare({ count: 2, at: [3.85, -4.6], tex: '\\text{2 left over}' }),
], 400);

const video: Explainer = {
  id: 'm7-1-1-b',
  lessonId: 'm7-1-1',
  title: 'Divisibility Rules, Part 2: Rules That Use the Last Digits',
  thumbnailTitle: 'Rules That Use the Last Digits',
  thumbnail: 'pc',
  summary:
    'Any number of tens is divisible by 2, 5 and 10, so only the last digit decides those; 100 is divisible by 4, so only the last two digits decide 4; and 1000 is divisible by 8, so only the last three digits decide 8. 5316 is divisible by 4 (16 = 4 × 4) but not by 8 (316 is not a multiple of 8), and 34 ends in 4 but is not divisible by 4.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Number Relationships · Part 2', title: 'Rules That Use the Last Digits', subtitle: 'Divisible by 2, 5, 10, 4 and 8' }],
      lines: [
        { say: 'Is five thousand three hundred sixteen divisible by four? Is it divisible by eight? You can tell without dividing, just by looking at the end of the number.', show: 'title' },
        { say: 'In this part, you will learn the divisibility rules for two, five, ten, four and eight, and see why they work.' },
      ],
    },
    {
      chapter: 'Every ten shares evenly',
      layout: 'split',
      leftWidth: 560,
      left: [ten],
      right: [{ kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['347 = 34 \\text{ tens} + 7', '10 = 2 \\times 5', '10 = 5 \\times 2', '10 = 10 \\times 1'] }],
      lines: [
        { say: 'Every whole number is made of tens, plus a ones digit. For example, three hundred forty-seven is thirty-four tens, plus seven ones.', show: 'm.0', focus: 'm.0' },
        { say: 'Look at one ten. Ten counters share into two equal groups of five, with nothing left over.', show: ['t.a-g0', 't.a-g1', 't.a-cap', 'm.1'], focus: 'm.1' },
        { say: 'They also share into five equal groups of two. And ten shares into ten groups of one.', show: ['t.b-g0', 't.b-g1', 't.b-g2', 't.b-g3', 't.b-g4', 't.b-cap', 'm.2', 'm.3'], focus: ['m.2', 'm.3'] },
        { say: 'So every ten is divisible by two, by five and by ten. Then any number of tens is as well. That means only the ones digit, the last digit, can leave a remainder.', focus: 'm' },
      ],
    },
    {
      chapter: 'Rules for 2, 5 and 10',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'r',
          items: [
            'Divisible by $2$: the last digit is **even**, $0$, $2$, $4$, $6$ or $8$.',
            'Divisible by $5$: the last digit is $0$ or $5$.',
            'Divisible by $10$: the last digit is $0$.',
          ],
        },
        {
          kind: 'table',
          id: 't',
          head: ['Number', 'By 2?', 'By 5?', 'By 10?'],
          rows: [
            ['$347$', 'no', 'no', 'no'],
            ['$1250$', 'yes', 'yes', 'yes'],
            ['$86$', 'yes', 'no', 'no'],
            ['$935$', 'no', 'yes', 'no'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the three rules. A number is divisible by two when its last digit is even: zero, two, four, six or eight.', show: 'r.0' },
        { say: 'A number is divisible by five when its last digit is zero or five. And it is divisible by ten when its last digit is zero.', show: ['r.1', 'r.2'] },
        { say: 'Let’s try them. Three hundred forty-seven ends in seven. Seven is odd, and it is not zero or five. So three hundred forty-seven is not divisible by two, five or ten.', show: 't.0', focus: 't.0' },
        { say: 'One thousand two hundred fifty ends in zero. Zero passes all three tests, so it is divisible by two, by five and by ten.', show: 't.1', focus: 't.1' },
        { say: 'Eighty-six ends in six, which is even. So it is divisible by two, but not by five or ten. Nine hundred thirty-five ends in five, so it is divisible by five only.', show: ['t.2', 't.3'], focus: ['t.2', 't.3'] },
      ],
    },
    {
      chapter: 'Why the last two digits for 4',
      layout: 'split',
      leftWidth: 520,
      left: [grid],
      right: [{ kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['100 = 4 \\times 25', '5316 = 5300 + 16', '1000 = 8 \\times 125'] }],
      lines: [
        { say: 'The rule for four is different. A ten does not share into four equal groups. But a hundred does.', show: ['g.grid', 'g.outline'] },
        { say: 'Split a hundred grid into four equal blocks. Each block has twenty-five squares, because four times twenty-five is one hundred.', show: ['g.blocks', 'g.shade', 'm.0'], focus: 'm.0' },
        { say: 'So every hundred is divisible by four, and so are all the hundreds and thousands in a number. Only the last two digits are left to check.' },
        { say: 'Five thousand three hundred sixteen is fifty-three hundreds, plus sixteen. The hundreds share evenly into fours. So we only need to check sixteen.', show: 'm.1', focus: 'm.1' },
        { say: 'Eight works the same way, one place further along. Eight times one hundred twenty-five is one thousand. So all the thousands are divisible by eight, and only the last three digits matter.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Testing 5316',
      layout: 'center',
      main: [
        chart,
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Is $5316$ divisible by $4$? By $8$?' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Last two digits: } 16 = 4 \\times 4 \\quad \\good{\\checkmark}', '\\text{Last three digits: } 316', '8 \\times 39 = 312 \\qquad 8 \\times 40 = 320'] },
      ],
      lines: [
        { say: 'Now let’s answer the question from the start. Is five thousand three hundred sixteen divisible by four? Is it divisible by eight?', show: ['q', 'pc.frame', 'pc.head', 'pc.row0'] },
        { say: 'For four, look at the last two digits: the tens and the ones. They make sixteen. Sixteen is four times four, so five thousand three hundred sixteen is divisible by four.', show: ['pc.col2', 'pc.col3', 'm.0'], focus: 'm.0' },
        { say: 'For eight, look at the last three digits. They make three hundred sixteen. Is that a multiple of eight? A multiple of eight is a number you get by multiplying eight by a whole number.', show: ['pc.col1', 'm.1'], focus: 'm.1' },
        { say: 'Eight times thirty-nine is three hundred twelve, and eight times forty is three hundred twenty. Three hundred sixteen is in between, so it is not a multiple of eight.', show: 'm.2', focus: 'm.2' },
        { say: 'So five thousand three hundred sixteen is divisible by four, but not by eight.' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'split',
      leftWidth: 560,
      left: [thirtyFour],
      right: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Looking at only the last digit for 4', md: '$34$ ends in $4$, but $34$ is **not** divisible by $4$: $4 \\times 8 = 32$ and $4 \\times 9 = 36$. For $4$, look at the last **two** digits.' },
      ],
      lines: [
        { say: 'Watch out for this mistake. Thirty-four ends in a four, so it is tempting to say it is divisible by four.', show: 'oops' },
        { say: 'But share thirty-four counters into groups of four. You get eight groups, and two counters are left over.', show: ['h.g0', 'h.g1', 'h.g2', 'h.g3', 'h.g4', 'h.g5', 'h.g6', 'h.g7', 'h.spare'], focus: 'h.spare' },
        { say: 'Four times eight is thirty-two, and four times nine is thirty-six. Thirty-four is not a multiple of four. For four, always look at the last two digits, not just the last one.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which number is divisible by $4$?',
          choices: ['$2516$', '$3418$', '$5730$', '$1126$'],
          answer: 0,
          working: 'The last two digits of $2516$ make $16 = 4 \\times 4$, so $2516$ is divisible by $4$. The others end in $18$, $30$ and $26$, which are not multiples of $4$.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these numbers is divisible by four? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, two thousand five hundred sixteen. Its last two digits make sixteen, and sixteen is four times four. Choice D ends in an even digit, but twenty-six is not a multiple of four.', show: 'q.answer' },
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
            'Last digit: by $2$ if it is even, by $5$ if it is $0$ or $5$, by $10$ if it is $0$.',
            'Last two digits for $4$, because $100 = 4 \\times 25$.',
            'Last three digits for $8$, because $1000 = 8 \\times 125$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Every ten shares evenly into twos, fives and tens, so the last digit decides those three rules.', show: 'sum.0' },
        { say: 'A hundred is divisible by four, so for four you look at the last two digits.', show: 'sum.1' },
        { say: 'And a thousand is divisible by eight, so for eight you look at the last three digits. In the next part, you will learn rules that add up the digits. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
