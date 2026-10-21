import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { dotGroups } from '@/content/math6/videos/lib/m6-4-figures.ts';
import { spare } from './lib/m7-1-figures.ts';

// 28 counters in groups of 6: 4 groups, and 4 left over.
const twentyEight = figure('h', [
  dotGroups({ groups: 4, size: 6, cols: 3, perRow: 2 }),
  spare({ count: 4, at: [1.65, -4.6], tex: '\\text{4 left over}' }),
], 430);

const video: Explainer = {
  id: 'm7-1-1-c',
  lessonId: 'm7-1-1',
  title: 'Divisibility Rules, Part 3: Rules That Use the Digit Sum',
  thumbnailTitle: 'Rules That Use the Digit Sum',
  thumbnail: false,
  summary:
    'A number is divisible by 3 when its digit sum is divisible by 3, and by 9 when its digit sum is divisible by 9, because every ten and every hundred is a group of nines plus 1. A number is divisible by 6 when it passes the tests for both 2 and 3. 4536 is divisible by 3, 6 and 9; 7341 by 3 only; 28 is even but not divisible by 6; and 52□4 is divisible by 9 when the box is 7.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Number Relationships · Part 3', title: 'Rules That Use the Digit Sum', subtitle: 'Divisible by 3, 9 and 6' }],
      lines: [
        { say: 'Here is a trick that seems like magic. To find out whether a big number is divisible by three or by nine, you just add up its digits.', show: 'title' },
        { say: 'In this part, you will learn the divisibility rules for three, nine and six. You will see why the trick works, and use it to find a missing digit.' },
      ],
    },
    {
      chapter: 'The digit sum',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Divisible by 3 or 9', md: 'Add the digits to get the **digit sum**. If the digit sum is divisible by $3$, so is the number. If the digit sum is divisible by $9$, so is the number.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['234: \\quad 2 + 3 + 4 = 9', '9 \\div 9 = 1 \\quad \\good{\\checkmark}', '234 \\div 9 = 26'] },
      ],
      lines: [
        { say: 'When you add up the digits of a number, you get its digit sum. If the digit sum is divisible by three, so is the number. If the digit sum is divisible by nine, so is the number.', show: 'key' },
        { say: 'Remember the students from the start? Can two hundred thirty-four be split into teams of nine? Add the digits: two plus three plus four is nine.', show: 'm.0', focus: 'm.0' },
        { say: 'Nine is divisible by nine. So two hundred thirty-four is divisible by nine as well.', show: 'm.1', focus: 'm.1' },
        { say: 'A calculator agrees. Two hundred thirty-four divided by nine is exactly twenty-six.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Why it works',
      layout: 'center',
      main: [
        { kind: 'text', id: 't', size: 'md', align: 'center', md: 'Take out as many nines as you can. What is left over?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['200 = 2 \\times 99 + \\opp{2}', '30 = 3 \\times 9 + \\opp{3}', '4 = \\opp{4}', '\\text{Left over: } \\opp{2 + 3 + 4} = 9'] },
      ],
      lines: [
        { say: 'Why does adding the digits work? Let’s take out as many groups of nine as we can from two hundred thirty-four, and see what is left over.', show: 't' },
        { say: 'A hundred is ninety-nine plus one, and ninety-nine is eleven groups of nine. So two hundreds are two groups of ninety-nine, with two left over.', show: 'm.0', focus: 'm.0' },
        { say: 'A ten is nine plus one. So three tens are three nines, with three left over.', show: 'm.1', focus: 'm.1' },
        { say: 'And the four ones are all left over.', show: 'm.2', focus: 'm.2' },
        { say: 'The nines all share evenly. What is left over is two plus three plus four, which is just the digit sum! Here it is nine, one more group of nine, so nothing is left at all.', show: 'm.3', focus: 'm.3' },
        { say: 'Nine is divisible by three, so the same idea works for three. Only the digit sum decides.' },
      ],
    },
    {
      chapter: 'The rule for 6',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Divisible by 6', md: 'A number is divisible by $6$ when it passes **both** tests: the test for $2$ (the last digit is even) **and** the test for $3$ (the digit sum is divisible by $3$).' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['6 = 2 \\times 3'] },
      ],
      lines: [
        { say: 'Now for six. Six is two times three. So a number that shares into groups of six must share into twos, and into threes as well.', show: 'm' },
        { say: 'That gives the rule. A number is divisible by six when it passes both tests: the test for two, and the test for three.', show: 'key' },
        { say: 'The last digit must be even, and the digit sum must be divisible by three. Passing just one of the tests is not enough.' },
      ],
    },
    {
      chapter: 'Testing 4536',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Which of $3$, $6$ and $9$ divide $4536$?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['4 + 5 + 3 + 6 = 18', '18 \\text{ is divisible by } 3 \\text{ and by } 9', '\\text{Last digit } 6 \\text{ is even, so divisible by } 2', '\\text{By } 2 \\text{ and by } 3, \\text{ so by } 6'] },
        { kind: 'text', id: 'a', size: 'md', align: 'center', md: '$4536$ is divisible by $3$, $6$ and $9$.' },
      ],
      lines: [
        { say: 'Which of three, six and nine divide four thousand five hundred thirty-six?', show: 'q' },
        { say: 'Add the digits: four plus five plus three plus six is eighteen.', show: 'm.0', focus: 'm.0' },
        { say: 'Eighteen is divisible by three, and by nine. So four thousand five hundred thirty-six is divisible by three and by nine.', show: 'm.1', focus: 'm.1' },
        { say: 'Now the test for two. The last digit is six, which is even. So the number is divisible by two.', show: 'm.2', focus: 'm.2' },
        { say: 'It passes the test for two and the test for three, so it is divisible by six. The answer: three, six and nine all divide it.', show: ['m.3', 'a'], focus: 'a' },
      ],
    },
    {
      chapter: 'Testing 7341',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Is $7341$ divisible by $3$? By $9$? By $6$?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['7 + 3 + 4 + 1 = 15', '15 \\text{ is divisible by } 3, \\text{ but not by } 9', '\\text{Last digit } 1 \\text{ is odd, so not by } 2 \\text{ or } 6'] },
        { kind: 'text', id: 'a', size: 'md', align: 'center', md: '$7341$ is divisible by $3$ only.' },
      ],
      lines: [
        { say: 'Here is another one. Is seven thousand three hundred forty-one divisible by three? By nine? By six?', show: 'q' },
        { say: 'Add the digits: seven plus three plus four plus one is fifteen.', show: 'm.0', focus: 'm.0' },
        { say: 'Fifteen is five groups of three, so it is divisible by three. But fifteen is not divisible by nine. So the number is divisible by three, but not by nine.', show: 'm.1', focus: 'm.1' },
        { say: 'The last digit is one, which is odd. So the number is not divisible by two, and that means it is not divisible by six either.', show: 'm.2', focus: 'm.2' },
        { say: 'So seven thousand three hundred forty-one is divisible by three only.', show: 'a', focus: 'a' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'split',
      leftWidth: 520,
      left: [twentyEight],
      right: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Even is not enough for 6', md: '$28$ is even, but its digit sum is $2 + 8 = 10$, which is not divisible by $3$. So $28$ is **not** divisible by $6$. Check both rules every time.' },
      ],
      lines: [
        { say: 'Watch out for this mistake. Twenty-eight is even, so it passes the test for two. It is tempting to stop there.', show: 'oops' },
        { say: 'But its digit sum is two plus eight, which is ten. Ten is not divisible by three, so twenty-eight fails the test for three.' },
        { say: 'Share twenty-eight counters into groups of six, and you can see it. You get four groups, with four counters left over.', show: ['h.g0', 'h.g1', 'h.g2', 'h.g3', 'h.spare'], focus: 'h.spare' },
        { say: 'So twenty-eight is not divisible by six. For six, always check both rules.' },
      ],
    },
    {
      chapter: 'A missing digit',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'The number $52\\square4$ is divisible by $9$. What digit goes in the box?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['5 + 2 + 4 = 11', '\\text{Multiples of } 9: \\ 9,\\ 18,\\ 27, \\ldots', '18 - 11 = 7', '5274: \\quad 5 + 2 + 7 + 4 = 18 \\quad \\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'The rule for nine can find a missing digit. The number five, two, box, four is divisible by nine. What digit goes in the box?', show: 'q' },
        { say: 'Add the digits you know: five plus two plus four is eleven.', show: 'm.0', focus: 'm.0' },
        { say: 'The whole digit sum must be a multiple of nine: nine, eighteen, twenty-seven, and so on. The digit sum is already eleven, so the next multiple of nine is eighteen.', show: 'm.1', focus: 'm.1' },
        { say: 'Eighteen minus eleven is seven. So the missing digit is seven.', show: 'm.2', focus: 'm.2' },
        { say: 'Check it. Five thousand two hundred seventy-four has digit sum five plus two plus seven plus four, which is eighteen. It works!', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which number is divisible by $6$?',
          choices: ['$412$', '$735$', '$928$', '$654$'],
          answer: 3,
          working: '$654$ ends in $4$, so it is even, and its digit sum is $6 + 5 + 4 = 15$, which is divisible by $3$. It passes both tests, so it is divisible by $6$. $735$ passes the test for $3$, but it is odd.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these numbers is divisible by six? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, six hundred fifty-four. It is even, and its digit sum is fifteen, which is divisible by three. Choice B passes the test for three, but it is odd, so it is not divisible by six.', show: 'q.answer' },
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
            'Divisible by $3$: the digit sum is divisible by $3$.',
            'Divisible by $9$: the digit sum is divisible by $9$.',
            'Divisible by $6$: the number passes the tests for $2$ **and** $3$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A number is divisible by three when its digit sum is divisible by three.', show: 'sum.0' },
        { say: 'A number is divisible by nine when its digit sum is divisible by nine.', show: 'sum.1' },
        { say: 'And a number is divisible by six when it passes both tests, for two and for three. In the next part, you will use the rules to sort numbers and share things equally. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
