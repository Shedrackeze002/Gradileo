import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { hundredGrid } from '@/content/math5/videos/lib/m5-6-figures.ts';

// One hundred squares as four blocks of 25: 25 × 4 = 100.
const hundred = (id: string) => figure(id, [hundredGrid({ block: [5, 5], shaded: 4, tone: 'good' })]);

const video: Explainer = {
  id: 'm6-3-1-c',
  lessonId: 'm6-3-1',
  title: 'Prime Factorization, Part 3: A Product in Many Ways',
  thumbnailTitle: 'A Product in Many Ways',
  thumbnail: 'hg',
  summary:
    'A composite number can be written as a product in many ways: 60 = 2 × 30 = 3 × 4 × 5 = 2 × 2 × 15 = 2 × 2 × 3 × 5, and only the last uses just primes. The associative property says factors can be grouped in any way, so 25 × 13 × 4 = (25 × 4) × 13 = 1,300.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Prime Factorization and Powers · Part 3', title: 'A Product in Many Ways', subtitle: 'Grouping factors to make it easy' }],
      lines: [
        { say: 'Sixty is two times thirty. Sixty is also three times four times five. A composite number can be written as a product in many different ways.', show: 'title' },
        { say: 'In this part, you will write a number as a product in different ways, and group factors to make multiplying easier.' },
      ],
    },
    {
      chapter: 'Many products for 60',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['60 = 2 \\times 30', '60 = 3 \\times 4 \\times 5', '60 = 2 \\times 2 \\times 15', '60 = \\good{2 \\times 2 \\times 3 \\times 5}'] },
      ],
      lines: [
        { say: 'Here are some ways to write sixty as a product. Sixty is two times thirty.', show: 'm.0', focus: 'm.0' },
        { say: 'Sixty is three times four times five. Three times four is twelve, and twelve times five is sixty.', show: 'm.1', focus: 'm.1' },
        { say: 'Sixty is two times two times fifteen. Two times two is four, and four times fifteen is sixty.', show: 'm.2', focus: 'm.2' },
        { say: 'And sixty is two times two times three times five. Every factor in this one is prime, so it is the prime factorization of sixty.', show: 'm.3', focus: 'm.3' },
        { say: 'So a product can have two, three, four or more factors. But only one of them uses just prime numbers.', focus: 'm' },
      ],
    },
    {
      chapter: 'Grouping factors',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['(2 \\times 5) \\times 7 = 10 \\times 7 = 70', '2 \\times (5 \\times 7) = 2 \\times 35 = 70'] },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Associative property', md: 'When you multiply three or more numbers, you can group them in any way. The product stays the same: $(2 \\times 5) \\times 7 = 2 \\times (5 \\times 7) = 70$.' },
      ],
      lines: [
        { say: 'When you multiply three numbers, which two should you multiply first? Let’s try both ways with two times five times seven.' },
        { say: 'Brackets show which numbers to multiply first. Two times five is ten, and ten times seven is seventy.', show: 'm.0', focus: 'm.0' },
        { say: 'Now group it the other way. Five times seven is thirty-five, and two times thirty-five is seventy.', show: 'm.1', focus: 'm.1' },
        { say: 'The product is the same! This is called the associative property. When you multiply three or more numbers, you can group them in any way, and the product stays the same.', show: 'def' },
        { say: 'You can change the order of the factors as well. Two times seven is the same as seven times two.' },
      ],
    },
    {
      chapter: 'Group to make it easy',
      layout: 'split',
      leftWidth: 440,
      left: [hundred('hg')],
      right: [
        { kind: 'text', id: 't', size: 'md', md: 'Find $25 \\times 13 \\times 4$.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['25 \\times 13 \\times 4', '= (25 \\times 4) \\times 13', '= 100 \\times 13', '= 1{,}300'] },
      ],
      lines: [
        { say: 'Let’s use this to make multiplying easy. Find twenty-five times thirteen times four.', show: ['t', 'm.0'] },
        { say: 'Twenty-five times thirteen is hard to do in your head. But you can change the order and the grouping of the factors.' },
        { say: 'Look for a friendly pair. Twenty-five and four are friendly, so group them first.', show: 'm.1', focus: 'm.1' },
        { say: 'Here are four blocks of twenty-five squares. Together they make a grid of one hundred squares. So twenty-five times four is one hundred.', show: ['hg.grid', 'hg.blocks', 'hg.outline', 'hg.shade', 'm.2'], focus: ['hg.blocks', 'm.2'] },
        { say: 'And one hundred times thirteen is easy: one thousand three hundred.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Another friendly pair',
      layout: 'center',
      main: [
        { kind: 'text', id: 't', size: 'md', md: 'Find $5 \\times 9 \\times 2$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['5 \\times 9 \\times 2 = (5 \\times 2) \\times 9', '= 10 \\times 9 = 90'] },
      ],
      lines: [
        { say: 'Here is one more. Find five times nine times two.', show: 't' },
        { say: 'Five and two are a friendly pair, because five times two is ten. Group them first.', show: 'm.0', focus: 'm.0' },
        { say: 'Ten times nine is ninety. Grouping the friendly pair made it quick.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $4 \\times 19 \\times 25$.',
          choices: ['$190$', '$475$', '$48$', '$1{,}900$'],
          answer: 3,
          working: 'Group the friendly pair: $(4 \\times 25) \\times 19 = 100 \\times 19 = 1{,}900$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find four times nineteen times twenty-five. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, one thousand nine hundred. Group the friendly pair: four times twenty-five is one hundred, and one hundred times nineteen is one thousand nine hundred. Choice B, four hundred seventy-five, is only nineteen times twenty-five: it leaves out the four.', show: 'q.answer' },
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
            'A composite number can be written as a product in many ways: $60 = 2 \\times 30 = 3 \\times 4 \\times 5$.',
            'Only one product uses just primes: the prime factorization.',
            'The **associative property**: you can group factors in any way, and the product stays the same.',
            'Group friendly pairs first, like $25 \\times 4 = 100$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A composite number can be written as a product in many ways.', show: 'sum.0' },
        { say: 'Only one of those products uses just prime numbers: the prime factorization.', show: 'sum.1' },
        { say: 'The associative property says you can group factors in any way, and the product stays the same.', show: 'sum.2' },
        { say: 'So look for friendly pairs, like twenty-five and four, and multiply them first. In the next lesson, you will learn a short way to write a factor that repeats. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
