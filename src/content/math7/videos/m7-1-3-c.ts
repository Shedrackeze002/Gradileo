import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { numberLine } from '@/video/numbers.ts';
import { tickLabels } from '@/content/math5/videos/lib/m5-1-figures.ts';

// 5/8 = 0.625 and 0.62 on a number line from 0.6 to 0.65, numbered only at its ends.
const eighths = figure('pc', [
  numberLine({
    min: 0.6,
    max: 0.65,
    step: 0.005,
    every: 0,
    length: 13,
    points: [
      { id: 'a', value: 0.625, tex: '\\dfrac58', tone: 'opp' },
      { id: 'b', value: 0.62, tex: '0.62', tone: 'adj', below: true },
    ],
  }),
  tickLabels({ min: 0.6, max: 0.65, length: 13, values: [{ id: 'lo', value: 0.6, tex: '0.6' }, { id: 'hi', value: 0.65, tex: '0.65' }] }),
], 240);

// 2/3 = 0.666… and 0.67 on a number line from 0.6 to 0.7.
const thirds = figure('nl', [
  numberLine({
    min: 0.6,
    max: 0.7,
    step: 0.01,
    every: 5,
    length: 13,
    points: [
      { id: 'a', value: 2 / 3, tex: '\\dfrac23', tone: 'opp' },
      { id: 'b', value: 0.67, tex: '0.67', tone: 'adj', below: true },
    ],
  }),
], 240);

// The two jumps on a number line from 2.3 to 2.45.
const jumps = figure('j', [
  numberLine({
    min: 2.3,
    max: 2.45,
    step: 0.025,
    every: 2,
    length: 13,
    points: [
      { id: 'k', value: 2.375, tex: '\\text{Kiona}', tone: 'opp' },
      { id: 'u', value: 2.4, tex: '\\text{Jun}', tone: 'adj' },
    ],
  }),
], 240);

const video: Explainer = {
  id: 'm7-1-3-c',
  lessonId: 'm7-1-3',
  title: 'Comparing and Ordering Numbers, Part 3: Fractions and Decimals Together',
  thumbnailTitle: 'Fractions and Decimals Together',
  thumbnail: 'j',
  summary:
    'To compare a fraction with a decimal, write them in the same form, usually by changing the fraction to a decimal. 5/8 = 0.625 > 0.62; 2/3 = 0.666… < 0.67; and 2 3/8 m = 2.375 m is less than 2.4 m, so Jun jumped farther than Kiona.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Number Relationships · Part 3', title: 'Fractions and Decimals Together', subtitle: 'Write them in the same form' }],
      lines: [
        { say: 'How do you compare a fraction with a decimal? It is a bit like comparing a length in metres with one in centimetres. First, you write them the same way.', show: 'title' },
        { say: 'In this part, you will change fractions into decimals, and then compare them. And you will find out who jumped farther at the track meet.' },
      ],
    },
    {
      chapter: 'The same form',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Write them in the same form', md: 'When one number is a fraction and the other is a decimal, write them in the same form. Changing the fraction to a **decimal** usually works best.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{3}{4} = 3 \\div 4 = 0.75'] },
      ],
      lines: [
        { say: 'When one number is a fraction and the other is a decimal, write them both in the same form.', show: 'key' },
        { say: 'Changing the fraction into a decimal usually works best. Remember, a fraction is a division: divide the numerator by the denominator. Three quarters is three divided by four, which is zero point seven five. Then compare the decimals place by place.', show: 'm' },
      ],
    },
    {
      chapter: 'Five eighths and 0.62',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Compare $\\dfrac{5}{8}$ and $0.62$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{5}{8} = 5 \\div 8 = 0.625', '0.62\\good{5} \\quad \\text{and} \\quad 0.62\\bad{0} \\qquad \\text{so} \\quad \\dfrac{5}{8} > 0.62'] },
        eighths,
      ],
      lines: [
        { say: 'Compare five eighths and zero point six two.', show: 'q' },
        { say: 'Change five eighths to a decimal. Five divided by eight is zero point six two five.', show: 'm.0', focus: 'm.0' },
        { say: 'Now compare zero point six two five with zero point six two. Give it three places: zero point six two zero. The tenths and hundredths are the same. In the thousandths place, five is greater than zero.', show: 'm.1', focus: 'm.1' },
        { say: 'So five eighths is greater than zero point six two. On a number line, five eighths sits just to the right of zero point six two, by five thousandths.', show: ['pc.axis', 'pc.ticks', 'pc.a', 'pc.b'] },
      ],
    },
    {
      chapter: 'Two thirds and 0.67',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Compare $\\dfrac{2}{3}$ and $0.67$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{2}{3} = 0.\\overline{6} = 0.6666\\ldots', '0.6\\bad{6}66\\ldots \\quad \\text{and} \\quad 0.6\\good{7}0 \\qquad \\text{so} \\quad \\dfrac{2}{3} < 0.67'] },
        thirds,
      ],
      lines: [
        { say: 'Now compare two thirds and zero point six seven.', show: 'q' },
        { say: 'Two thirds is a repeating decimal: zero point six repeating, or zero point six six six six, and so on.', show: 'm.0', focus: 'm.0' },
        { say: 'Compare it with zero point six seven zero. The tenths are both six. In the hundredths place, six is less than seven. So two thirds is less than zero point six seven.', show: 'm.1', focus: 'm.1' },
        { say: 'On a number line, two thirds sits just before zero point six seven. It does not matter that the sixes go on forever. They never reach seven hundredths.', show: ['nl.axis', 'nl.a', 'nl.b'] },
      ],
    },
    {
      chapter: 'Who jumped farther?',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Kiona jumps $2\\dfrac{3}{8}$ m and Jun jumps $2.4$ m. Who jumped farther?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['2\\dfrac{3}{8} = 2 + 0.375 = 2.375', '2.\\bad{3}75 \\quad \\text{and} \\quad 2.\\good{4}00'] },
        jumps,
      ],
      lines: [
        { say: 'Back to the track meet. Kiona jumps two and three eighths metres, and Joon jumps two point four metres. Who jumped farther?', caption: 'Back to the track meet. Kiona jumps two and three eighths metres, and Jun jumps two point four metres. Who jumped farther?', show: 'q' },
        { say: 'Change the mixed number to a decimal. The two stays. Three eighths is zero point three seven five, so Kiona jumped two point three seven five metres.', show: 'm.0', focus: 'm.0' },
        { say: 'Compare two point three seven five with two point four zero zero. The ones are both two. In the tenths place, three is less than four.', show: 'm.1', focus: 'm.1' },
        { say: 'So Kiona’s jump is shorter. Joon jumped farther, by a little.', caption: 'So Kiona’s jump is shorter. Jun jumped farther, by a little.', show: ['j.axis', 'j.k', 'j.u'], focus: 'j.u' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which statement is **true**?',
          choices: ['$\\dfrac{3}{4} > 0.8$', '$\\dfrac{1}{3} > 0.34$', '$\\dfrac{7}{8} > 0.86$', '$\\dfrac{2}{5} > 0.45$'],
          answer: 2,
          working: '$\\dfrac78 = 0.875$, and $0.875 > 0.860$ because $7 > 6$ in the hundredths place. The others are false: $0.75 < 0.8$, $0.333\\ldots < 0.34$ and $0.4 < 0.45$.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these statements is true? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Seven eighths is zero point eight seven five, and in the hundredths place, seven is more than six. Choice B is false: one third is zero point three three three, and so on, which is less than zero point three four.', show: 'q.answer' },
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
            'To compare a fraction and a decimal, write them in the same form.',
            'Changing the fraction to a decimal usually works best: $\\dfrac58 = 0.625 > 0.62$.',
            'A repeating decimal still compares place by place: $\\dfrac23 = 0.666\\ldots < 0.67$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To compare a fraction and a decimal, write them in the same form.', show: 'sum.0' },
        { say: 'Changing the fraction to a decimal usually works best. Then compare place by place.', show: 'sum.1' },
        { say: 'A repeating decimal compares the same way. In the next part, you will put a whole set of numbers in order. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
