import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { tallyChart } from './lib/m5-12-figures.ts';

// Students' numbers of pets: 0, 2, 1, 1, 3, 1, 0, 2, 1, 4, 1, 2.
const pets = () =>
  figure('p', [
    tallyChart({
      head: ['Pets', 'Tally', 'Frequency'],
      rows: [
        { label: '0', count: 2 },
        { label: '1', count: 5 },
        { label: '2', count: 3 },
        { label: '3', count: 1 },
        { label: '4', count: 1 },
      ],
      widths: [2.4, 3.2, 3.4],
    }),
  ]);

const video: Explainer = {
  id: 'm5-12-1-d',
  lessonId: 'm5-12-1',
  title: 'Frequency and the Mode, Part 4: Using the Mode',
  thumbnailTitle: 'Using the Mode',
  thumbnail: 'p',
  summary: 'A statistical question is answered by collecting data, and the mode is often the best answer. When the categories are numbers, such as how many pets students have (0, 2, 1, 1, 3, 1, 0, 2, 1, 4, 1, 2), the mode is 1 pet and its frequency is 5 students: the data value and the frequency are different things.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Frequency and Data · Part 4', title: 'Using the Mode', subtitle: 'Answering questions with data' }],
      lines: [
        { say: 'Should your class sell popcorn or crackers at the fun fair? You can answer a question like this with data, and the mode can help.', show: 'title' },
        { say: 'In this video, you will learn what a statistical question is, and find the mode when the categories are numbers.' },
      ],
    },
    {
      chapter: 'Statistical questions',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Statistical question', md: 'A **statistical question** is a question you answer by collecting data, such as "Which snack should our class sell?"' },
        { kind: 'bullets', id: 'b', items: ['"Which snack should our class sell?" Ask everyone, and count: **statistical**.', '"How many legs does a spider have?" One fact answers it: **not statistical**.'] },
      ],
      lines: [
        { say: 'A statistical question is a question you answer by collecting data. Which snack should our class sell? To answer it, you ask everyone, and count the answers.', show: ['def', 'b.0'] },
        { say: 'How many legs does a spider have? That question has one answer, eight, and you do not need to ask anyone. It is not a statistical question.', show: 'b.1' },
        { say: 'The mode is often the best answer to a statistical question, because more people chose it than any other answer. If crackers is the mode, sell crackers!' },
      ],
    },
    {
      chapter: 'Numbers as categories',
      layout: 'split',
      leftWidth: 540,
      left: [pets()],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Students said how many pets they have: $0,\\ 2,\\ 1,\\ 1,\\ 3,\\ 1,\\ 0,\\ 2,\\ 1,\\ 4,\\ 1,\\ 2$. What is the mode, and what is its frequency?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['2 + 5 + 3 + 1 + 1 = 12 \\;\\checkmark', '\\text{mode: } 1 \\text{ pet}', '\\text{frequency: } 5'] },
      ],
      lines: [
        { say: 'Twelve students said how many pets they have. This time, the answers are numbers. Each number is a category: zero pets, one pet, two pets, and so on.', show: ['q', 'p.frame', 'p.names'] },
        { say: 'Tally the answers. Zero appears two times. One appears five times. Two appears three times.', show: ['p.tally0', 'p.tally1', 'p.tally2', 'p.f0', 'p.f1', 'p.f2'] },
        { say: 'Three appears one time, and four appears one time. Check: two plus five plus three plus one plus one is twelve answers.', show: ['p.tally3', 'p.tally4', 'p.f3', 'p.f4', 'm.0'], focus: 'm.0' },
        { say: 'The value that appears most often is one. So the mode is one pet.', show: ['p.hl1', 'm.1'], focus: ['p.name1', 'm.1'] },
        { say: 'Its frequency is five: five students have one pet.', show: 'm.2', focus: ['p.f1', 'm.2'] },
      ],
    },
    {
      chapter: 'Value or frequency?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Data value or frequency?', md: 'When the categories are numbers, be careful. The **data value** ($1$ pet) is the category. The **frequency** ($5$ students) is how many times it appears.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{mode} = \\good{1 \\text{ pet}}', '\\text{its frequency} = \\opp{5 \\text{ students}}'] },
      ],
      lines: [
        { say: 'When the categories are numbers, it is easy to mix things up. There are two different numbers here.', show: 'tip' },
        { say: 'The data value, one pet, is the category. It is the answer the students gave. That is the mode.', show: 'm.0', focus: 'm.0' },
        { say: 'The frequency, five students, is how many times that answer appears. It is not the mode.', show: 'm.1', focus: 'm.1' },
        { say: 'Saying the units helps: the mode is one pet, and its frequency is five students.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Students said how many books they read last month: $2,\\ 3,\\ 3,\\ 1,\\ 3,\\ 2,\\ 0,\\ 3,\\ 1,\\ 2$. What is the mode?',
          choices: ['$4$ books', '$2$ books', '$10$ books', '$3$ books'],
          answer: 3,
          working: '$3$ appears $4$ times, more than any other value ($2$ appears $3$ times, $1$ twice and $0$ once). The mode is $3$ books.',
        },
      ],
      lines: [
        { say: 'Your turn. Students said how many books they read last month. The ten answers were two, three, three, one, three, two, zero, three, one and two, in that order. What is the mode? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, three books. Three appears four times, which is more than any other value. Choice A is the frequency of the mode: four students read three books.', show: 'q.answer' },
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
          items: ['A statistical question is answered by collecting data.', 'The mode is often the best answer: the most common one.', 'When the categories are numbers, the mode is a data value, not its frequency.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A statistical question is a question you answer by collecting data.', show: 'sum.0' },
        { say: 'The mode is often the best answer, because it is the most common one.', show: 'sum.1' },
        { say: 'And when the categories are numbers, the mode is the data value, not its frequency. Great work! Next, you will collect and display data of your own.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
