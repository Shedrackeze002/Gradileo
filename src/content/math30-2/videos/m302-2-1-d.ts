import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { slots } from './lib/m302-2-counting.ts';

const char = '\\text{character}';

const video: Explainer = {
  id: 'm302-2-1-d',
  lessonId: 'm302-2-1',
  title: 'The Fundamental Counting Principle, Part 4: Counting What You Do Not Want',
  thumbnailTitle: 'Counting What You Do Not Want',
  thumbnail: 'all',
  summary: 'For "at least one" problems, count every outcome and subtract the outcomes with none. Worked example: of the 36³ = 46 656 three-character codes made from letters and digits, 26³ = 17 576 have no digits, so 29 080 have at least one digit. Why counting each position separately counts some codes twice.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Counting Methods · Part 4', title: 'Counting What You Do Not Want', subtitle: '“At least one” is everything minus none' }],
      lines: [
        { say: 'How many three-character codes contain at least one digit? Counting them directly means splitting into many cases: one digit, two digits or three, in different places.', show: 'title' },
        { say: 'In this video, you will learn a shortcut: count everything, then subtract the outcomes you do not want.' },
      ],
    },
    {
      chapter: 'All the codes',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'A 3-character code uses the letters A to Z and the digits 0 to 9, and characters may repeat. How many codes contain at least one digit?' },
        figure('all', [slots({ values: ['36', '36', '36'], captions: [char, char, char] })], 220),
        { kind: 'math', id: 'm', size: 'md', lines: ['26 + 10 = 36 \\text{ choices for each character}', '36 \\times 36 \\times 36 = 36^3 = 46\\,656'] },
      ],
      lines: [
        { say: 'A three-character code uses the letters A to Z and the digits zero to nine, and characters may repeat. How many codes contain at least one digit?', show: 'p' },
        { say: 'Start by counting all the codes, with no rule at all. Each character is a letter or a digit, so it has twenty-six plus ten, or thirty-six, choices.', show: ['all.boxes', 'all.captions', 'm.0'], focus: 'm.0' },
        { say: 'Write thirty-six in each of the three boxes, and multiply. Thirty-six to the power of three is 46,656 codes in all.', show: ['all.values', 'all.times', 'm.1'], focus: ['all', 'm.1'] },
      ],
    },
    {
      chapter: 'Subtract the codes with none',
      layout: 'center',
      main: [
        figure('none', [slots({ values: ['26', '26', '26'], captions: ['\\text{letter}', '\\text{letter}', '\\text{letter}'] })], 220),
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{No digits: } 26^3 = 17\\,576', '\\text{At least one digit: } 46\\,656 - 17\\,576 = 29\\,080'] },
      ],
      lines: [
        { say: 'Now count the codes you do not want: the ones with no digits at all. In those codes, every character is a letter, so each box has twenty-six choices.', show: ['none.boxes', 'none.captions', 'none.values'], focus: 'none.values' },
        { say: 'Twenty-six to the power of three is 17,576 codes with no digits.', show: ['none.times', 'm.0'], focus: 'm.0' },
        { say: 'Every other code has at least one digit. So subtract: 46,656 minus 17,576 is 29,080 codes with at least one digit.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Why it works',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{all codes} = \\text{at least one digit} + \\text{no digits}', '\\text{at least one digit} = \\text{all codes} - \\text{no digits}'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'At least one', md: 'To count outcomes with **at least one** of something, count all the outcomes, then subtract the outcomes with **none**.' },
      ],
      lines: [
        { say: 'Why does this work? Every code either has at least one digit, or it has no digits. There is no third kind, and no code is both.', show: 'm.0', focus: 'm.0' },
        { say: 'So the two groups together make up all the codes. Subtracting the codes with no digits from all the codes leaves exactly the ones with at least one.', show: 'm.1', focus: 'm.1' },
        { say: 'The group with none is usually much easier to count, because it has just one case. So whenever a problem says at least one, count everything, then subtract the outcomes with none.', show: 'key' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Counting each position separately', md: 'Putting a digit in each position in turn and filling the rest freely gives $3 \\times 10 \\times 36 \\times 36$, which counts a code like 5, 7, K **twice**: once for each of its digits.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{3 \\times 10 \\times 36^2 = 38\\,880}', '\\good{36^3 - 26^3 = 29\\,080}'] },
      ],
      lines: [
        { say: 'Here is a tempting shortcut that does not work. Put a digit in the first position, and let the other two be anything. Then do the same for the second position and the third.', show: 'oops' },
        { say: 'That gives three times ten times thirty-six squared, which is 38,880: too many.', show: 'm.0', focus: 'm.0' },
        { say: 'The problem is that a code with two digits, such as five, then seven, then the letter K, is counted twice: once with its digit five in the first position, and again with its digit seven in the second. Subtracting the codes with no digits counts each code exactly once.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A 3-digit lock code uses the digits 0 to 9, and digits may repeat. How many codes contain at least one 7?',
          choices: ['$271$', '$300$', '$729$', '$1000$'],
          answer: 0,
          working: 'All codes: $10^3 = 1000$. Codes with no 7: each digit has 9 choices, $9^3 = 729$. At least one 7: $1000 - 729 = 271$.',
        },
      ],
      lines: [
        { say: 'Your turn. A three-digit lock code uses the digits zero to nine, and digits may repeat. How many codes contain at least one seven? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, 271. There are ten to the third, or one thousand, codes in all. With no seven, each digit has nine choices, so nine to the third, or 729, codes have no seven. One thousand minus 729 is 271. Choice C, 729, is the number of codes to subtract, not the answer.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['For “at least one”, count all the outcomes, then subtract the outcomes with none.', 'All 3-character codes: $36^3$. No digits: $26^3$. At least one digit: $36^3 - 26^3$.', 'Counting each position separately counts some outcomes more than once.'] }],
      lines: [
        { say: 'Let’s sum up. For at least one, count all the outcomes, then subtract the outcomes with none.', show: 'sum.0' },
        { say: 'For the codes, that was thirty-six cubed minus twenty-six cubed.', show: 'sum.1' },
        { say: 'Counting each position separately counts some outcomes more than once. In the next lesson, we count arrangements where order matters: permutations. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
