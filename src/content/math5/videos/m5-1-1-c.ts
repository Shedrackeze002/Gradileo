import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { placeChart } from './lib/m5-1-figures.ts';

// "Twelve and forty-five thousandths": 12, the point, 45 ending in the thousandths, and a 0 in the tenths.
const chart = figure('ch', [
  placeChart({
    places: ['Tens', 'Ones', '.', 'Tenths', 'Hundredths', 'Thousandths'],
    rows: [['1', '2', '.', '0', '4', '5']],
    headSize: '\\footnotesize',
    tones: { 'r0-3': 'theta', 'r0-4': 'good', 'r0-5': 'good' },
  }),
]);

const video: Explainer = {
  id: 'm5-1-1-c',
  lessonId: 'm5-1-1',
  title: 'Place Value to Millions and Thousandths, Part 3: Numbers in Words and Numerals',
  thumbnailTitle: 'Numbers in Words and Numerals',
  thumbnail: 'ch',
  summary: 'Reading big numbers in groups of three (4 060 308 is four million sixty thousand three hundred eight), saying “and” for the decimal point, and writing “twelve and forty-five thousandths” as 12.045, with a 0 in every place that is not named.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Place Value · Part 3', title: 'Numbers in Words and Numerals', subtitle: 'Reading and writing big numbers and decimals' }],
      lines: [
        { say: 'In a story, on a poster or in a news report, numbers are sometimes written in words. Can you turn the words into digits, and the digits into words?', show: 'title' },
        { say: 'In this video, you will read and write big numbers and decimals, both in words and with digits.' },
      ],
    },
    {
      chapter: 'Groups of three',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Numerals', md: '**Numerals** are numbers written with digits, like $4\\,060\\,308$.' },
        { kind: 'math', id: 'm', size: 'xl', lines: ['\\underbrace{\\opp{4}}_{\\opp{\\text{million}}}\\;\\;\\underbrace{\\adj{060}}_{\\adj{\\text{thousand}}}\\;\\;\\underbrace{\\good{308}}_{\\phantom{x}}'] },
      ],
      lines: [
        { say: 'Numerals are numbers written with digits, like this one.', show: 'def' },
        { say: 'To read a big number, split it into groups of three digits, starting from the right. The spaces show you where the groups are.', show: 'm.0' },
        { say: 'Then read each group, and say its name. The first group here is the millions. The next group is the thousands. The last group is read just as it is, with no name after it.', focus: 'm.0' },
      ],
    },
    {
      chapter: 'From numerals to words',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\opp{4}\\,\\adj{060}\\,\\good{308}', '\\opp{4} \\;\\to\\; \\opp{\\text{four million}}', '\\adj{060} \\;\\to\\; \\adj{\\text{sixty thousand}}', '\\good{308} \\;\\to\\; \\good{\\text{three hundred eight}}'] },
        { kind: 'text', id: 't', size: 'lg', md: '**Four million sixty thousand three hundred eight**' },
      ],
      lines: [
        { say: 'Let’s write this number in words. The groups are four, then zero six zero, then three zero eight.', show: 'm.0' },
        { say: 'The first group is four, and it is the millions group. So we say four million.', show: 'm.1', focus: 'm.1' },
        { say: 'The next group is zero six zero. That is sixty, and it is the thousands group, so we say sixty thousand.', show: 'm.2', focus: 'm.2' },
        { say: 'The last group is three zero eight, which is three hundred eight. We do not say a name after the last group.', show: 'm.3', focus: 'm.3' },
        { say: 'Put it together: four million, sixty thousand, three hundred eight. Notice that we did not say the word and. In this lesson, we save the word and for the decimal point.', show: 't' },
      ],
    },
    {
      chapter: 'Decimals in words',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Reading a decimal', md: 'Say **and** for the decimal point. Read the digits after the point as one number. Then say the place of the **last** digit.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['3.2\\good{5} \\;\\to\\; \\text{three and twenty-five } \\good{\\text{hundredths}}'] },
      ],
      lines: [
        { say: 'Now let’s read a decimal number. First, read the whole number part. Then say and for the decimal point.', show: 'key' },
        { say: 'Next, read the digits after the point as one number. Then say the place of the last digit.' },
        { say: 'For example, 3.25 is three and twenty-five hundredths. We say hundredths because the last digit, five, is in the hundredths place.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'From words to numerals',
      layout: 'center',
      main: [{ kind: 'text', id: 'q', size: 'lg', md: '“Twelve and forty-five thousandths”' }, chart, { kind: 'math', id: 'm', size: 'lg', lines: ['12.045'] }],
      lines: [
        { say: 'Now go the other way. Write twelve and forty-five thousandths with digits.', show: 'q' },
        { say: 'Twelve is the whole number part, so write 12. The word and is the decimal point.', show: ['ch.frame', 'ch.head', 'ch.r0-0', 'ch.r0-1', 'ch.r0-2'] },
        { say: 'Forty-five thousandths ends in the thousandths place. So the last digit, five, goes in the thousandths place, three places after the point. That puts the four in the hundredths place.', show: ['ch.r0-4', 'ch.r0-5'], focus: ['ch.col4', 'ch.col5'] },
        { say: 'Nothing is named for the tenths, so put a zero there. The number is 12.045.', show: ['ch.r0-3', 'ch.col3', 'm.0'], focus: ['ch.col3', 'm.0'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Leaving out zeros', md: '“Twelve and forty-five thousandths” is **not** $12.45$. That is forty-five hundredths. Put a $0$ in every place that is not named.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{12.45} = \\text{twelve and forty-five } \\bad{\\text{hundredths}}', '\\good{12.045} = \\text{twelve and forty-five } \\good{\\text{thousandths}}'] },
      ],
      lines: [
        { say: 'A common mistake is to write 12.45. But that number ends in the hundredths place, so it is twelve and forty-five hundredths.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'Twelve and forty-five thousandths needs three places after the point, so it is 12.045.', show: 'm.1', focus: 'm.1' },
        { say: 'Always check the place of the last digit, and put a zero in every place that is not named.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Write “seven and sixty-two thousandths” with digits.',
          choices: ['$7.062$', '$7.62$', '$762$', '$7.602$'],
          answer: 0,
          working: 'Thousandths needs three places after the point. The $2$ goes in the thousandths place and the $6$ in the hundredths, so the tenths get a $0$: $7.062$.',
        },
      ],
      lines: [
        { say: 'Your turn. Write seven and sixty-two thousandths with digits. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Thousandths needs three places after the point. The two goes in the thousandths place, the six in the hundredths place, and the tenths place gets a zero. Choice B is seven and sixty-two hundredths.', show: 'q.answer' },
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
          items: ['Read big numbers in groups of three: millions, thousands, then the rest.', 'Say **and** only for the decimal point.', 'After the point, say the place of the last digit, and put a $0$ in every place that is not named.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Read big numbers in groups of three, and say each group’s name: million, then thousand.', show: 'sum.0' },
        { say: 'Say and only for the decimal point.', show: 'sum.1' },
        { say: 'And after the point, say the place of the last digit. When you write a decimal, put a zero in every place that is not named. In the next part, we look at zeros at the end of a decimal. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
