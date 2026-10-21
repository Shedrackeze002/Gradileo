import type { Explainer } from '@/video/script.ts';
import { numberLine } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';
import { bar } from '@/content/math5/videos/lib/m5-5-figures.ts';
import { dotGroups } from './lib/m6-4-figures.ts';

// 12 times a fraction less than, equal to and more than 1, on a number line.
const line = (id: string) =>
  figure(id, [
    numberLine({
      min: 0,
      max: 16,
      step: 1,
      length: 14,
      points: [
        { id: 'a', value: 9, tex: '12 \\times \\tfrac34', tone: 'adj' },
        { id: 'b', value: 12, tex: '12 \\times \\tfrac44', tone: 'good' },
        { id: 'c', value: 15, tex: '12 \\times \\tfrac54', tone: 'opp' },
      ],
    }),
  ], 190);

// Six batches, each with three quarters of a cup of milk.
const cups = (id: string) =>
  figure(id, [0, 1, 2, 3, 4, 5].map((k) => bar({ name: `c${k}`, parts: 4, shaded: 3, tone: 'adj', at: [(k % 2) * 3.8, (2 - Math.floor(k / 2)) * 1.6], width: 3.2 })));

// 28 students in 4 equal groups of 7; three groups bring a lunch.
const lunch = (id: string) => figure(id, [dotGroups({ groups: 4, size: 7, cols: 7, perRow: 1, tones: ['good', 'good', 'good', 'muted'] })]);

const video: Explainer = {
  id: 'm6-4-3-c',
  lessonId: 'm6-4-3',
  title: 'Multiplying Fractions and Natural Numbers, Part 3: Bigger or Smaller?',
  thumbnailTitle: 'Bigger or Smaller?',
  thumbnail: 'nl',
  summary:
    'Multiplying by a fraction less than 1 gives a smaller number (12 × 3/4 = 9), by a fraction more than 1 a bigger one (12 × 5/4 = 15), and by a fraction equal to 1 the same number. Problems: 6 batches of 3/4 cup of milk is 18/4 = 9/2 = 4 1/2 cups, and if 3/4 of 28 students bring a lunch, 21 do and 7 do not.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Fractions · Part 3', title: 'Bigger or Smaller?', subtitle: 'Fractions in problems' }],
      lines: [
        { say: 'Does multiplying always make a number bigger? Not when you multiply by a fraction!', show: 'title' },
        { say: 'In this part, you will see when multiplying by a fraction makes a number bigger or smaller, and use this to solve problems.' },
      ],
    },
    {
      chapter: 'Bigger or smaller?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['12 \\times \\dfrac34 = 9 \\quad \\text{less than } 12', '12 \\times \\dfrac44 = 12 \\quad \\text{equal to } 12', '12 \\times \\dfrac54 = 15 \\quad \\text{more than } 12'] },
        line('nl'),
      ],
      lines: [
        { say: 'Let’s multiply twelve by three different fractions. First, twelve times three quarters. One quarter of twelve is three, so three quarters is nine. Nine is less than twelve.', show: ['m.0', 'nl.axis', 'nl.a'], focus: ['m.0', 'nl.a'] },
        { say: 'Next, twelve times four quarters. Four quarters is one whole, so the answer is twelve itself.', show: ['m.1', 'nl.b'], focus: ['m.1', 'nl.b'] },
        { say: 'Last, twelve times five quarters. Five quarters of twelve is five times three, which is fifteen. Fifteen is more than twelve.', show: ['m.2', 'nl.c'], focus: ['m.2', 'nl.c'] },
      ],
    },
    {
      chapter: 'The rule',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Bigger or smaller?', md: 'Multiplying by a fraction **less than** $1$ gives a smaller number. A fraction **more than** $1$ gives a bigger number. A fraction **equal to** $1$ keeps the number the same.' },
      ],
      lines: [
        { say: 'So here is the rule. Multiplying by a fraction less than one gives a smaller number, because you take only part of it.', show: 'key' },
        { say: 'Multiplying by a fraction more than one gives a bigger number. And multiplying by a fraction equal to one keeps the number the same.' },
        { say: 'This rule helps you check your answers. Let’s use it in some problems.' },
      ],
    },
    {
      chapter: 'Milk for muffins',
      layout: 'split',
      leftWidth: 520,
      left: [cups('cp')],
      right: [
        { kind: 'text', id: 't', size: 'md', md: 'A muffin recipe uses $\\dfrac{3}{4}$ cup of milk for each batch. Leilani makes $6$ batches. How much milk is needed?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['6 \\times \\dfrac34 = \\dfrac{6 \\times 3}{4} = \\dfrac{18}{4}', '\\dfrac{18}{4} = \\dfrac{9}{2}', '9 \\div 2 = 4 \\text{ R } 1 \\;\\to\\; 4\\dfrac12'] },
      ],
      lines: [
        { say: 'A muffin recipe uses three quarters of a cup of milk for each batch. Leilani makes six batches. How much milk is needed?', show: 't' },
        { say: 'Each cup shows three quarters of a cup of milk, one for each batch. Six batches means six groups of three quarters: six times three quarters.', show: ['cp.c0-frame', 'cp.c0-shade', 'cp.c1-frame', 'cp.c1-shade', 'cp.c2-frame', 'cp.c2-shade', 'cp.c3-frame', 'cp.c3-shade', 'cp.c4-frame', 'cp.c4-shade', 'cp.c5-frame', 'cp.c5-shade'] },
        { say: 'Multiply the numerator by six: six times three is eighteen. That is eighteen quarters.', show: 'm.0', focus: 'm.0' },
        { say: 'Simplify. Eighteen and four share the factor two, so eighteen quarters equals nine halves.', show: 'm.1', focus: 'm.1' },
        { say: 'Nine divided by two is four, remainder one. So nine halves is four and one half. Leilani needs four and a half cups of milk.', show: 'm.2', focus: 'm.2' },
        { say: 'Check: three quarters is less than one, so six batches need less than six cups. Four and a half is less than six, so the answer makes sense.' },
      ],
    },
    {
      chapter: 'Who does not bring a lunch?',
      layout: 'split',
      leftWidth: 520,
      left: [lunch('lu')],
      right: [
        { kind: 'text', id: 't', size: 'md', md: 'There are $28$ students in a class. $\\dfrac{3}{4}$ of them bring a lunch from home. How many do **not** bring a lunch?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['28 \\div 4 = 7', '3 \\times 7 = 21 \\text{ bring a lunch}', '28 - 21 = 7 \\text{ do not}'] },
      ],
      lines: [
        { say: 'There are twenty-eight students in a class. Three quarters of them bring a lunch from home. How many students do not bring a lunch?', show: 't' },
        { say: 'First find three quarters of twenty-eight. Split twenty-eight into four equal groups. Twenty-eight divided by four is seven in each group.', show: ['lu.g0', 'lu.g1', 'lu.g2', 'lu.g3', 'm.0'], focus: 'm.0' },
        { say: 'Three groups bring a lunch. Three times seven is twenty-one students.', show: 'm.1', focus: ['m.1', 'lu.g0', 'lu.g1', 'lu.g2'] },
        { say: 'But the question asks how many do not bring a lunch. That is the rest: twenty-eight minus twenty-one, which is seven students. It is the one group left over.', show: 'm.2', focus: ['m.2', 'lu.g3'] },
      ],
    },
    {
      chapter: 'Does it make sense?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Check that it makes sense', md: '$\\dfrac{3}{4}$ is less than $1$, so $\\dfrac{3}{4}$ of $28$ must be less than $28$. $21$ is less than $28$, so the answer makes sense.' },
      ],
      lines: [
        { say: 'Always check that your answer makes sense. Three quarters is less than one, so three quarters of twenty-eight must be less than twenty-eight.', show: 'tip' },
        { say: 'Twenty-one is less than twenty-eight. And three quarters is more than one half, so the answer should be more than fourteen, which is half of twenty-eight. Twenty-one is more than fourteen as well, so the answer makes sense.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A recipe uses $\\dfrac{2}{3}$ cup of oats for each batch. How many cups of oats do $6$ batches need?',
          choices: ['$\\dfrac{12}{18}$ cup', '$4$ cups', '$9$ cups', '$\\dfrac{2}{18}$ cup'],
          answer: 1,
          working: '$6 \\times \\tfrac{2}{3} = \\tfrac{6 \\times 2}{3} = \\tfrac{12}{3} = 4$ cups. Since $\\tfrac23$ is less than $1$, the answer is less than $6$.',
        },
      ],
      lines: [
        { say: 'Your turn. A recipe uses two thirds of a cup of oats for each batch. How many cups of oats do six batches need? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, four cups. Six times two is twelve, so that is twelve thirds, and twelve divided by three is four. Choice A multiplies the denominator as well: twelve eighteenths is less than one cup, which cannot be right for six batches.', show: 'q.answer' },
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
            'A fraction less than $1$ gives a smaller number; more than $1$, a bigger number; equal to $1$, the same number.',
            'For “each batch” problems, multiply: $6 \\times \\dfrac34 = 4\\dfrac12$.',
            'For a fraction of a group, divide into equal groups, then take some.',
            'Check that the answer makes sense.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Multiplying by a fraction less than one gives a smaller number, more than one gives a bigger number, and equal to one keeps the number the same.', show: 'sum.0' },
        { say: 'When the same amount is used for each batch, multiply.', show: 'sum.1' },
        { say: 'To find a fraction of a group, divide it into equal groups, then take some of them.', show: 'sum.2' },
        { say: 'And always check that your answer makes sense. Well done on finishing fractions!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
