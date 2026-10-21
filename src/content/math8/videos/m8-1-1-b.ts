import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { tileSquare } from './lib/m8-1-figures.ts';

// 81 tiles make a 9 by 9 square: the side is the square root of the area.
const eightyOne = figure('t', [tileSquare({ cols: 9, labels: { left: '9', bottom: '9', caption: '\\text{area} = 81' } })], 470);

const video: Explainer = {
  id: 'm8-1-1-b',
  lessonId: 'm8-1-1',
  title: 'Perfect Squares and Square Roots, Part 2: Square Roots',
  thumbnailTitle: 'Square Roots',
  thumbnail: 't',
  summary:
    'Squaring and taking the square root are opposite operations. The square root of a number is the number that multiplies by itself to give it: √81 = 9, because 9 × 9 = 81, so a square of 81 tiles has sides of 9. To find √196, note that it is between 10 and 20, and only numbers ending in 4 or 6 have squares ending in 6; 14 × 14 = 196, so √196 = 14. A square root is not half: √36 = 6, not 18.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Squares, Square Roots and the Pythagorean Theorem · Part 2', title: 'Square Roots', subtitle: 'Undoing squaring' }],
      lines: [
        { say: 'Squaring takes the side of a square and gives its area. Five squared is twenty-five. But what if you know the area, and you want the side?', show: 'title' },
        { say: 'In this part, you will learn about square roots, which undo squaring.' },
      ],
    },
    {
      chapter: 'Opposite operations',
      layout: 'split',
      leftWidth: 480,
      left: [eightyOne],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Square root', md: 'The **square root** of a number is the number that multiplies by itself to give it. The symbol is $\\sqrt{\\ }$.' },
        { kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['9^2 = 81', '\\sqrt{81} = 9'] },
      ],
      lines: [
        { say: 'Adding and subtracting are opposite operations: one undoes the other. Squaring has an opposite as well. It is called taking the square root.' },
        { say: 'Here is a square made of eighty-one tiles. How long is each side? You need a number that multiplies by itself to give eighty-one.', show: ['t.tiles', 't.caption'] },
        { say: 'Nine times nine is eighty-one. So each side is nine tiles long.', show: ['t.left', 't.bottom'], focus: ['t.left', 't.bottom'] },
        { say: 'The square root of a number is the number that multiplies by itself to give it. So the square root of eighty-one is nine.', show: 'def' },
        { say: 'The square root sign looks like a check mark with a long roof. The number goes under the roof.', show: 'm.1', focus: 'm.1' },
        { say: 'Squaring nine gives eighty-one. The square root of eighty-one takes you back to nine. Each one undoes the other.', show: 'm.0', focus: ['m.0', 'm.1'] },
      ],
    },
    {
      chapter: 'Square roots you know',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'tb',
          head: ['Squaring', 'Square root'],
          rows: [
            ['$2^2 = 4$', '$\\sqrt{4} = 2$'],
            ['$5^2 = 25$', '$\\sqrt{25} = 5$'],
            ['$7^2 = 49$', '$\\sqrt{49} = 7$'],
            ['$12^2 = 144$', '$\\sqrt{144} = 12$'],
          ],
        },
      ],
      lines: [
        { say: 'Every perfect square you know gives you a square root for free. Two squared is four, so the square root of four is two.', show: 'tb.0' },
        { say: 'Five squared is twenty-five, so the square root of twenty-five is five.', show: 'tb.1' },
        { say: 'Seven squared is forty-nine, so the square root of forty-nine is seven.', show: 'tb.2' },
        { say: 'And twelve squared is one hundred forty-four, so the square root of one hundred forty-four is twelve. That is why it helps to know the first twelve perfect squares by heart.', show: 'tb.3' },
      ],
    },
    {
      chapter: 'Between 10 and 20',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Find $\\sqrt{196}$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['10^2 = 100 \\qquad 20^2 = 400', '100 < 196 < 400, \\text{ so } \\sqrt{196} \\text{ is between } 10 \\text{ and } 20.'] },
        {
          kind: 'table',
          id: 'tb',
          head: ['A number ending in', '$1$', '$2$', '$3$', '$4$', '$5$', '$6$', '$7$', '$8$', '$9$'],
          rows: [['has a square ending in', '$1$', '$4$', '$9$', '$\\good{6}$', '$5$', '$\\good{6}$', '$9$', '$4$', '$1$']],
        },
      ],
      lines: [
        { say: 'Now a harder one. Find the square root of one hundred ninety-six. It is not one of our twelve, so let’s reason it out.', show: 'q' },
        { say: 'Ten squared is one hundred, and twenty squared is four hundred. One hundred ninety-six is between them, so its square root is between ten and twenty.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Next, look at the last digit. One hundred ninety-six ends in six. Which numbers have squares that end in six?', show: 'tb' },
        { say: 'Four times four is sixteen, and six times six is thirty-six. Only numbers that end in four or six have squares that end in six.', focus: 'tb.0' },
      ],
    },
    {
      chapter: 'Try 14 and 16',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Find $\\sqrt{196}$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{Try } 14 \\text{ or } 16', '14 \\times 14 = 196 \\ \\good{\\checkmark}', '16 \\times 16 = 256', '\\sqrt{196} = 14'] },
      ],
      lines: [
        { say: 'So the square root of one hundred ninety-six is a number between ten and twenty that ends in four or six. It must be fourteen or sixteen.', show: ['q', 'm.0'], focus: 'm.0' },
        { say: 'Try fourteen. Fourteen times fourteen is one hundred ninety-six. It works!', show: 'm.1', focus: 'm.1' },
        { say: 'Sixteen times sixteen is two hundred fifty-six, which is more than we need.', show: 'm.2', focus: 'm.2' },
        { say: 'So the square root of one hundred ninety-six is fourteen.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'A square root is not half',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'A square root is not half', md: '$\\sqrt{36}$ is $6$, not $18$. Dividing by $2$ gives a number that **adds** to itself to make $36$. A square root **multiplies** by itself.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['6 \\times 6 = 36, \\text{ so } \\sqrt{36} = 6 \\ \\good{\\checkmark}', '18 \\times 18 = 324'] },
      ],
      lines: [
        { say: 'Here is a common mistake. The square root of thirty-six is not eighteen.', show: 'oops' },
        { say: 'Dividing by two gives a number that adds to itself to make thirty-six: eighteen plus eighteen. A square root multiplies by itself instead.' },
        { say: 'Six times six is thirty-six, so the square root of thirty-six is six. Eighteen times eighteen is three hundred twenty-four, which is far from thirty-six.', show: 'm', focus: 'm.0' },
        { say: 'So always check a square root by multiplying it by itself.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $\\sqrt{256}$.',
          choices: ['$128$', '$14$', '$26$', '$16$'],
          answer: 3,
          working: '$10^2 = 100$ and $20^2 = 400$, so $\\sqrt{256}$ is between $10$ and $20$. $256$ ends in $6$, so try $14$ or $16$: $14 \\times 14 = 196$ and $16 \\times 16 = 256$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the square root of two hundred fifty-six. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, sixteen. The square root is between ten and twenty, and it ends in four or six. Fourteen times fourteen is one hundred ninety-six, but sixteen times sixteen is two hundred fifty-six. Choice A, one hundred twenty-eight, is half of two hundred fifty-six, and a square root is not half.', show: 'q.answer' },
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
            'The **square root** of a number multiplies by itself to give the number: $\\sqrt{81} = 9$.',
            'Squaring and taking the square root undo each other.',
            'For a bigger number, find the tens it is between, then use the last digit: $\\sqrt{196} = 14$.',
            'A square root is not half: $\\sqrt{36} = 6$, not $18$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The square root of a number is the number that multiplies by itself to give it. The square root of eighty-one is nine.', show: 'sum.0' },
        { say: 'Squaring and taking the square root undo each other.', show: 'sum.1' },
        { say: 'For a bigger number, find the two multiples of ten it is between, then use its last digit to make a smart guess, and check it.', show: 'sum.2' },
        { say: 'And a square root is not half the number. In the next part, you will use squares and square roots to find the area and the side of a square. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
