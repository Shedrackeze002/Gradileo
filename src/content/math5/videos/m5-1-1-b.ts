import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { hundredGrid, placeChart } from './lib/m5-1-figures.ts';

const PLACES = ['Thousands', 'Hundreds', 'Tens', 'Ones', '.', 'Tenths', 'Hundredths', 'Thousandths'];
const DIGITS = ['5', '2', '7', '3', '.', '4', '6', '8'];

// 5273.468: the places mirror each other around the ones (tens and tenths, hundreds and
// hundredths, thousands and thousandths), and the 6 is in the hundredths place.
const mirror = figure('mr', [
  placeChart({
    places: PLACES,
    rows: [DIGITS],
    headSize: '\\footnotesize',
    arcs: [
      { id: 'm1', from: 2, to: 5, tone: 'adj' },
      { id: 'm2', from: 1, to: 6, tone: 'opp' },
      { id: 'm3', from: 0, to: 7, tone: 'good' },
    ],
    notes: [
      { id: 'n2', col: 2, tex: '1', tone: 'adj' },
      { id: 'n5', col: 5, tex: '1', tone: 'adj' },
      { id: 'n1', col: 1, tex: '2', tone: 'opp' },
      { id: 'n6', col: 6, tex: '2', tone: 'opp' },
      { id: 'n0', col: 0, tex: '3', tone: 'good' },
      { id: 'n7', col: 7, tex: '3', tone: 'good' },
    ],
  }),
]);

const value = figure('val', [placeChart({ places: PLACES, rows: [DIGITS], headSize: '\\footnotesize', tones: { 'r0-6': 'opp' }, notes: [{ id: 'v6', col: 6, tex: '0.06', tone: 'opp' }] })]);

const video: Explainer = {
  id: 'm5-1-1-b',
  lessonId: 'm5-1-1',
  title: 'Place Value to Millions and Thousandths, Part 2: Tenths, Hundredths and Thousandths',
  thumbnailTitle: 'Tenths, Hundredths and Thousandths',
  thumbnail: 'g',
  summary: 'Decimal places: one whole cut into tenths, hundredths and thousandths, how the place names mirror each other around the ones, and the value of a decimal digit: the 6 in 5273.468 is worth 0.06. Tens or tenths?',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Place Value · Part 2', title: 'Tenths, Hundredths and Thousandths', subtitle: 'Places to the right of the ones' }],
      lines: [
        { say: 'A ski racer can win a race by just four thousandths of a second. That is a tiny amount of time! To write tiny amounts like that, we need places to the right of the ones.', show: 'title' },
        { say: 'In this video, you will learn the names and the values of the places after the decimal point.' },
      ],
    },
    {
      chapter: 'The decimal point',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Decimal number', md: 'A **decimal number** has a decimal point. The digits after the point are parts of one whole.' },
        { kind: 'math', id: 'm', size: 'xl', lines: ['3\\good{.}5'] },
      ],
      lines: [
        { say: 'A decimal number has a dot in it, called the decimal point.', show: 'def' },
        { say: 'The digits before the point are whole ones, tens, hundreds and so on. The digits after the point are parts of one whole.', show: 'm.0' },
        { say: 'For example, 3.5 means three whole ones, and five parts of another whole. But what size are those parts? Let’s find out.', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Parts of a whole',
      layout: 'split',
      leftWidth: 600,
      left: [figure('g', [hundredGrid({ size: 5, tenths: 1, label: '\\text{1 whole}', zoom: { at: [6.3, 2.2], size: 2.8 } })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\adj{\\text{one tenth}} = 0.1', '\\opp{\\text{one hundredth}} = 0.01', '\\thc{\\text{one thousandth}} = 0.001'] }],
      lines: [
        { say: 'Let’s picture one whole as this big square.', show: ['g.frame', 'g.label'] },
        { say: 'Cut it into ten equal strips. Each strip is one tenth of the whole. We write one tenth as 0.1.', show: ['g.cols', 'g.tenths', 'm.0'], focus: ['g.tenths', 'm.0'] },
        { say: 'Now cut every strip into ten small squares. The whole now has one hundred small squares. Each small square is one hundredth, and we write it as 0.01.', show: ['g.rows', 'g.cell', 'm.1'], focus: ['g.cell', 'm.1'] },
        { say: 'Cut one small square into ten thin slivers. Each sliver is one thousandth of the whole, written 0.001. It is so small that we have to zoom in to see it!', show: ['g.zoom', 'g.thousandth', 'm.2'], focus: ['g.thousandth', 'm.2'] },
        { say: 'Each new piece is one tenth of the piece before it. Ten thousandths make one hundredth, ten hundredths make one tenth, and ten tenths make one whole.', focus: 'g' },
      ],
    },
    {
      chapter: 'A mirror around the ones',
      layout: 'center',
      main: [mirror],
      lines: [
        { say: 'Here is a place value chart with places on both sides of the decimal point. The first place after the point is tenths. The second is hundredths. The third is thousandths.', show: ['mr.frame', 'mr.head', 'mr.row0'] },
        { say: 'Look at the names. They match on each side of the ones place, like a mirror. Tens and tenths are both one place away from the ones.', show: ['mr.m1', 'mr.n2', 'mr.n5'], focus: 'mr.m1' },
        { say: 'Hundreds and hundredths are both two places away.', show: ['mr.m2', 'mr.n1', 'mr.n6'], focus: 'mr.m2' },
        { say: 'And thousands and thousandths are both three places away. The places keep going forever, in both directions.', show: ['mr.m3', 'mr.n0', 'mr.n7'], focus: 'mr.m3' },
      ],
    },
    {
      chapter: 'The value of a decimal digit',
      layout: 'center',
      main: [value, { kind: 'math', id: 'm', size: 'md', lines: ['6 \\times 0.01 = 0.06'] }],
      lines: [
        { say: 'What is the value of the six in 5,273.468?', show: ['val.frame', 'val.head', 'val.row0'] },
        { say: 'The six is the second digit after the decimal point. So it is in the hundredths place.', show: 'val.col6', focus: 'val.col6' },
        { say: 'Its value is six hundredths. Six times 0.01 is 0.06.', show: ['m.0', 'val.v6'], focus: 'm.0' },
        { say: 'In the same way, the four is worth four tenths, which is 0.4. And the eight is worth eight thousandths, which is 0.008.', show: ['val.col5', 'val.col7'], focus: ['val.col5', 'val.col7'] },
      ],
    },
    {
      chapter: 'Tens or tenths?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Tens or tenths?', md: 'The $4$ in $5273.468$ is in the **tenths** place, not the tens place. A place to the right of the decimal point always ends in **-ths**.' },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'The mirror', md: 'Thousands is $3$ places left of the ones. Thousandths is $3$ places right of the ones.' },
      ],
      lines: [
        { say: 'Be careful with tens and tenths. They sound almost the same! The four in our number is in the tenths place, not the tens place.', show: 'oops' },
        { say: 'Every place to the right of the decimal point has a name that ends with the letters T H S. Tens are big: ten whole ones. Tenths are small: it takes ten of them to make just one.' },
        { say: 'Here is a tip. Use the ones place as a mirror. Thousands is three places to the left of the ones, and thousandths is three places to the right.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What is the value of the $9$ in $41.239$?',
          choices: ['$0.9$', '$900$', '$0.09$', '$0.009$'],
          answer: 3,
          working: 'The $9$ is the third digit after the decimal point, so it is in the thousandths place. It is worth $9 \\times 0.001 = 0.009$.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the value of the nine in 41.239? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. The nine is the third digit after the decimal point, so it is in the thousandths place. It is worth nine thousandths, 0.009. Choice C is nine hundredths, the second place after the point.', show: 'q.answer' },
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
          items: ['After the decimal point come tenths, hundredths and thousandths.', 'They mirror tens, hundreds and thousands around the ones place.', 'The value of a digit is the digit times its place: a $6$ in the hundredths place is worth $0.06$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. After the decimal point come tenths, hundredths and thousandths. Each is one tenth of the place before it.', show: 'sum.0' },
        { say: 'Their names mirror tens, hundreds and thousands around the ones place.', show: 'sum.1' },
        { say: 'And the value of a digit is the digit times its place. In the next part, we read and write numbers in words. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
