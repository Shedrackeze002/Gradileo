import type { DiagramEl, DiagramItem, Explainer } from '@/video/script.ts';

// Exam question for Math 10-4 lesson 2.2 (fractions of a quantity). The free OpenStax books have no
// single-step "fraction of an amount" word problem at this level, so this one is written by
// Gradileo in the style of a Grade 10 workplace mathematics unit test, with every amount stated in
// the question. 3/8 of 24 kg: 24 ÷ 8 = 3 kg in each eighth, and 3 eighths is 3 × 3 = 9 kg.
// Check: the rest is 5/8 of 24 = 15 kg, and 9 + 15 = 24.

type P = [number, number];

/** The 24 kg bag as a bar of 8 equal parts of 3 kg, with the 3 parts of sand shaded. */
const bar = (height = 300): DiagramEl => {
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  for (let i = 0; i <= 8; i++) {
    points[`b${i}`] = [i, 0];
    points[`t${i}`] = [i, 1];
  }
  for (let i = 0; i < 8; i++) {
    points[`m${i}`] = [i + 0.5, 0.5];
    if (i < 3) items.push({ kind: 'region', id: `s${i}`, points: [`b${i}`, `b${i + 1}`, `t${i + 1}`, `t${i}`], tone: 'opp', shade: 0.55, group: 'sand' });
  }
  items.push({ kind: 'region', id: 'out', points: ['b0', 'b8', 't8', 't0'], tone: 'brand', shade: 0.08, group: 'bag' });
  items.push({ kind: 'line', id: 'top', from: 't0', to: 't8', tone: 'ink', weight: 3, label: '24 \\text{ kg}', labelSide: 'left', group: 'bag' });
  items.push({ kind: 'line', id: 'bot', from: 'b0', to: 'b8', tone: 'ink', weight: 3, group: 'bag' });
  items.push({ kind: 'line', id: 'l', from: 'b0', to: 't0', tone: 'ink', weight: 3, group: 'bag' });
  items.push({ kind: 'line', id: 'r', from: 'b8', to: 't8', tone: 'ink', weight: 3, group: 'bag' });
  for (let i = 1; i < 8; i++) items.push({ kind: 'line', id: `c${i}`, from: `b${i}`, to: `t${i}`, tone: 'muted', group: 'cuts' });
  for (let i = 0; i < 8; i++) items.push({ kind: 'label', id: `k${i}`, at: `m${i}`, tex: '3', place: 'center', group: 'each' });
  points.under = [1.5, 0];
  items.push({ kind: 'label', id: 'sl', at: 'under', tex: '\\text{sand} = 3 \\times 3 = 9 \\text{ kg}', tone: 'opp', place: 'below', group: 'total' });
  return { kind: 'diagram', id: 'bar', height, points, items };
};

const QUESTION = 'A 24 kg bag of concrete mix is 3/8 sand, by mass. How many kilograms of sand are in the bag?';

const video: Explainer = {
  id: 'xq-m104-2-2',
  lessonId: '',
  exam: {
    lesson: 'm104-2-2',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 10 workplace mathematics unit test',
    licence: 'Written by Gradileo',
    question: QUESTION,
  },
  title: 'Exam Question: How Much Sand Is in the Bag? (Fractions of a Quantity)',
  thumbnailTitle: 'How Much Sand Is in the Bag?',
  thumbnail: 'bar',
  summary:
    'An exam-style question, solved one small step at a time: a 24 kg bag of concrete mix is 3/8 sand, by mass. How many kilograms of sand are in the bag? We split the bag into 8 equal parts of 24 ÷ 8 = 3 kg, then take 3 of them: 3 × 3 = 9 kg. Then we check with the rest of the bag and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Much Sand Is in the Bag?', subtitle: 'Fractions of a quantity, step by step' }],
      lines: [
        { say: 'In this video, we solve a test-style question about finding a fraction of an amount. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'Gradileo wrote this question in the style of a Grade 10 workplace maths test. You will see that at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          kicker: 'The question',
          prompt: 'A $24$ kg bag of concrete mix is $\\tfrac{3}{8}$ sand, by mass. How many kilograms of sand are in the bag?',
          answer: '$9$ kg',
          working: '$24 \\div 8 = 3$, and $3 \\times 3 = 9$',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'A 24 kilogram bag of concrete mix is three eighths sand, by mass. How many kilograms of sand are in the bag?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [bar(), { kind: 'text', id: 't', size: 'md', md: 'We want $\\tfrac{3}{8}$ **of** $24$ kg.' }],
      lines: [
        { say: 'Here is the bag as a bar. It holds 24 kilograms in all.', show: 'bar.bag' },
        { say: 'Three eighths means: cut the whole into 8 equal parts,', show: 'bar.cuts' },
        { say: 'and take 3 of them. Those 3 parts are the sand.', show: 'bar.sand' },
        { say: 'So we want three eighths of 24 kilograms.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\tfrac{3}{8} \\text{ of } 24: \\quad 24 \\div 8, \\text{ then } \\times 3'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Bottom first, then top', md: '**Divide** by the bottom number to find one part. **Multiply** by the top number to take that many parts.' },
      ],
      lines: [
        { say: 'Here is what we need. To find three eighths of 24, divide 24 by 8, then multiply by 3.', show: 'f' },
        { say: 'Divide by the bottom number to find the size of one part. Then multiply by the top number, to take that many parts.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Divide** by $8$: one eighth', '**Multiply** by $3$: three eighths', 'Check with the **rest** of the bag'] }],
      lines: [
        { say: 'Here is the plan. Divide by 8 to find one eighth of the bag.', show: 'plan.0' },
        { say: 'Multiply by 3 to find three eighths.', show: 'plan.1' },
        { say: 'Then check with the rest of the bag.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: One eighth',
      layout: 'center',
      main: [bar(320), { kind: 'math', id: 'm', size: 'md', lines: ['\\tfrac{1}{8} \\text{ of } 24 = 24 \\div 8 = 3 \\text{ kg}'] }],
      lines: [
        { say: 'Step one. Cut the 24 kilograms into 8 equal parts. 24 divided by 8 is 3, so each part is 3 kilograms.', show: ['bar.bag', 'bar.cuts', 'bar.each', 'm'] },
      ],
    },
    {
      chapter: 'Step 2: Three eighths',
      layout: 'center',
      main: [bar(320), { kind: 'math', id: 'm', size: 'md', lines: ['\\tfrac{3}{8} \\text{ of } 24 = 3 \\times 3 = \\good{9 \\text{ kg}}'] }],
      lines: [
        { say: 'Step two. The sand is 3 of those parts. 3 times 3 kilograms is 9 kilograms.', show: ['bar.bag', 'bar.cuts', 'bar.each', 'bar.sand', 'bar.total'] },
        { say: 'There are 9 kilograms of sand in the bag.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{rest: } \\tfrac{5}{8} \\text{ of } 24 = 5 \\times 3 = 15 \\text{ kg}', '9 + 15 = 24 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. The rest of the bag is the other 5 eighths: 5 times 3, which is 15 kilograms.', show: 'm.0' },
        { say: 'The sand and the rest add up to 9 plus 15, which is 24 kilograms, the whole bag. It checks out.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Trap', 'What goes wrong'],
          rows: [
            ['$3$ kg', 'that is only **one** eighth: multiply by $3$'],
            ['$24 \\times 3 = 72$ kg', 'more than the bag: you must also **divide** by $8$'],
            ['$24 \\div 3 \\times 8 = 64$ kg', 'the numbers are **swapped**: divide by the bottom'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '3 kilograms is just one eighth of the bag. The sand is three eighths, so multiply by 3.' },
        { say: '72 kilograms is more than the whole bag. That cannot be right. You must also divide by 8.' },
        { say: 'And dividing by 3 then multiplying by 8 swaps the numbers. Divide by the bottom number, and multiply by the top.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A training session lasts $120$ minutes. $\\tfrac{2}{5}$ of the session is about safety. How many minutes are about safety?',
          choices: ['$48$ min', '$24$ min', '$300$ min', '$40$ min'],
          answer: 0,
          working: '$120 \\div 5 = 24$, and $2 \\times 24 = 48$ minutes.',
        },
      ],
      lines: [
        { say: 'Your turn. A training session lasts 120 minutes. Two fifths of the session is about safety. How many minutes are about safety? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Divide 120 by 5 to get one fifth: 24 minutes. Two fifths is 2 times 24, which is 48 minutes. Choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['"$\\tfrac{3}{8}$ of" means: $8$ equal parts, take $3$', '**Divide** by the bottom number', '**Multiply** by the top number', 'A fraction less than $1$ gives **less** than the whole'] }],
      lines: [
        { say: 'Here is what to remember. Three eighths of an amount means: cut it into 8 equal parts, and take 3.', show: 'sum.0' },
        { say: 'So divide by the bottom number,', show: 'sum.1' },
        { say: 'then multiply by the top number.', show: 'sum.2' },
        { say: 'And a fraction less than 1 always gives less than the whole. For more on fractions of a quantity, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
