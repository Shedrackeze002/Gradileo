import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { slots } from './lib/m302-2-counting.ts';

const video: Explainer = {
  id: 'm302-2-1-b',
  lessonId: 'm302-2-1',
  title: 'The Fundamental Counting Principle, Part 2: Multiplying the Choices',
  thumbnailTitle: 'The Counting Principle',
  thumbnail: 's',
  summary: 'The fundamental counting principle: m ways and n ways give m × n ways together. Worked examples: 5 hairstyles, 4 outfits and 3 pets give 60 game characters, and 10 true-or-false questions can be answered in 2¹⁰ = 1024 ways. Part 3 decides when to add instead of multiply.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Counting Methods · Part 2', title: 'The Fundamental Counting Principle', subtitle: 'Multiply the choices at each stage' }],
      lines: [
        { say: 'Tree diagrams get large quickly. A tree for a game character with five hairstyles, four outfits and three pets would end in sixty branches.', show: 'title' },
        { say: 'In this video, you will learn the fundamental counting principle, which counts the branches without drawing the tree.' },
      ],
    },
    {
      chapter: 'The counting principle',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Fundamental counting principle', md: 'If one choice can be made in $m$ ways and a second choice in $n$ ways, then the two choices together can be made in $m \\times n$ ways. For more choices, keep multiplying.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['m \\times n', 'm \\times n \\times p \\times \\cdots'] },
      ],
      lines: [
        { say: 'In part one, three sizes and two bases made three times two smoothies, because every size split into the same two bases. That idea works for any choices.', show: 'def' },
        { say: 'If one choice can be made in m ways, and a second choice in n ways, then the two choices together can be made in m times n ways.', show: 'm.0', focus: 'm.0' },
        { say: 'For three or more choices, keep multiplying. This is called the fundamental counting principle.', show: 'm.1', focus: 'm.1' },
        { say: 'It works when the choices are made together, and the number of options for one choice does not depend on what was picked for another.' },
      ],
    },
    {
      chapter: 'A video game character',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'A game lets you choose one of 5 hairstyles, one of 4 outfits and one of 3 pets. How many different characters are possible?' },
        figure('s', [slots({ values: ['5', '4', '3'], captions: ['\\text{hairstyle}', '\\text{outfit}', '\\text{pet}'] })], 230),
        { kind: 'math', id: 'm', size: 'md', lines: ['5 \\times 4 \\times 3 = 60'] },
      ],
      lines: [
        { say: 'A game lets you choose one of five hairstyles, one of four outfits, and one of three pets. How many different characters are possible?', show: 'p' },
        { say: 'A character is a hairstyle, and an outfit, and a pet: three choices made together. So draw one box for each choice.', show: ['s.boxes', 's.captions'] },
        { say: 'In each box, write the number of options: five hairstyles, four outfits and three pets.', show: 's.values', focus: 's.values' },
        { say: 'Multiply: five times four is twenty, and twenty times three is sixty. There are sixty different characters.', show: ['s.times', 'm.0'], focus: ['s', 'm.0'] },
      ],
    },
    {
      chapter: 'Guessing on a quiz',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'A quiz has 10 true-or-false questions. In how many ways can it be answered?' },
        figure('s', [slots({ values: Array(10).fill('2'), captions: Array.from({ length: 10 }, (_, i) => `\\text{Q${i + 1}}`), size: 1.2, gap: 0.65 })], 220),
        { kind: 'math', id: 'm', size: 'md', lines: ['2 \\times 2 \\times \\cdots \\times 2 = 2^{10} = 1024'] },
      ],
      lines: [
        { say: 'Here is another. A quiz has ten true-or-false questions. In how many ways can it be answered?', show: 'p' },
        { say: 'Draw a box for each question. Each question can be answered in two ways, true or false, so write two in every box.', show: ['s.boxes', 's.captions', 's.values'], focus: 's.values' },
        { say: 'Multiply ten twos together. That is two to the power of ten, which is 1,024 ways.', show: ['s.times', 'm.0'], focus: 'm.0' },
        { say: 'Only one of those 1,024 ways gets every question right. So guessing the whole quiz correctly is very unlikely.' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Two times ten, or two to the tenth?', md: 'Each of the 10 questions has 2 choices, so the 2s are multiplied together **10 times**: $2^{10}$, not $2 \\times 10$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{2 \\times 10 = 20}', '\\good{2^{10} = 1024}'] },
      ],
      lines: [
        { say: 'A common mistake is to multiply two by ten, and get twenty. Twenty would be the number of possible answers on the page: a true and a false for each question.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'But a way to answer the quiz picks one answer for every question. That is ten choices made together, each with two options, so the twos are multiplied together ten times: two to the tenth, or 1,024.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A product code has 2 letters (A to Z) followed by 3 digits (0 to 9). Letters and digits may repeat. How many codes are possible?',
          choices: ['$82$', '$676\\,000$', '$52\\,000$', '$1\\,757\\,600$'],
          answer: 1,
          working: '$26 \\times 26 \\times 10 \\times 10 \\times 10 = 676 \\times 1000 = 676\\,000$.',
        },
      ],
      lines: [
        { say: 'Your turn. A product code has two letters, from A to Z, followed by three digits, from zero to nine. Letters and digits may repeat. How many codes are possible? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, 676,000. There are twenty-six choices for each letter and ten for each digit, so multiply: twenty-six times twenty-six times ten times ten times ten. Choice A, eighty-two, adds the choices instead of multiplying them.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Fundamental counting principle: $m$ ways and $n$ ways give $m \\times n$ ways together.', 'Draw a box for each choice, write the number of options in it, and multiply.', 'The same choice repeated: $2$ options for each of $10$ questions give $2^{10}$.'] }],
      lines: [
        { say: 'Let’s sum up. If one choice can be made in m ways and a second in n ways, the two together can be made in m times n ways.', show: 'sum.0' },
        { say: 'Draw a box for each choice, write the number of options in it, and multiply.', show: 'sum.1' },
        { say: 'When the same choice is repeated, the product is a power, such as two to the tenth. In part three, we see when to add instead of multiply. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
