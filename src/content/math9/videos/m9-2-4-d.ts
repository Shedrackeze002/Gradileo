import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { pattern } from '@/video/numbers.ts';
import { tag } from './lib/m9-1-figures.ts';

// Each fold doubles the layers: 1, 2, 4, … 128 layers after 0 to 7 folds.
const layers = figure(
  'pt',
  [
    pattern({ top: ['0', '1', '2', '3', '4', '5', '6', '7'], values: ['1', '2', '4', '8', '16', '32', '64', '128'], step: '\\times 2', gap: 1.6 }),
    tag('t-name', [-0.9, 1.3], '\\text{folds}', { place: 'left', tone: 'brand' }),
    tag('v-name', [-0.9, 0], '\\text{layers}', { place: 'left', tone: 'ink' }),
    { points: { room: [-3.2, 0] }, items: [] },
  ],
  300,
);

const video: Explainer = {
  id: 'm9-2-4-d',
  lessonId: 'm9-2-4',
  title: 'Using Exponents to Solve Problems, Part 4: Folding Paper',
  thumbnailTitle: 'Folding Paper',
  thumbnail: 'pt',
  summary:
    'Folding paper in half doubles the number of layers, so after n folds there are 2ⁿ layers. A sheet 0.1 mm thick is 0.1 × 2ⁿ mm thick after n folds. To pass 1 cm = 10 mm, 2ⁿ must pass 100: 2⁶ = 64 is too small, but 2⁷ = 128 is enough (12.8 mm), so the least number of folds is 7. Put both lengths in the same unit first, then try powers until one is big enough.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Powers and Exponent Laws · Part 4', title: 'Folding Paper', subtitle: 'When does it pass the target?' }],
      lines: [
        { say: 'A sheet of paper is very thin. But fold it in half, then in half again, and again, and the stack gets thick surprisingly fast.', show: 'title' },
        { say: 'In this part, you will use powers of two to find the least number of folds that makes a stack thicker than a target.' },
      ],
    },
    {
      chapter: 'Layers double',
      layout: 'center',
      main: [layers, { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{after } n \\text{ folds: } 2^n \\text{ layers}'] }],
      lines: [
        { say: 'Start with one sheet: one layer, with no folds.', show: ['pt.t-name', 'pt.v-name', 'pt.c0'] },
        { say: 'Fold it in half, and there are two layers. Fold again, and each layer is doubled: four layers.', show: ['pt.c1', 'pt.c2'], focus: ['pt.c1', 'pt.c2'] },
        { say: 'Each fold doubles the layers: eight, sixteen, thirty-two, sixty-four, and after seven folds, one hundred twenty-eight.', show: ['pt.c3', 'pt.c4', 'pt.c5', 'pt.c6', 'pt.c7'] },
        { say: 'So after n folds, there are two to the power of n layers.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Thicker than 1 cm',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'A sheet of paper is $0.1$ mm thick. What is the least number of folds that makes the stack thicker than $1$ cm?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['1\\text{ cm} = 10\\text{ mm}', '\\text{thickness} = 0.1 \\times 2^n \\text{ mm}', '0.1 \\times 2^n > 10 \\quad \\Rightarrow \\quad 2^n > 100'] },
      ],
      lines: [
        { say: 'A sheet of paper is zero point one millimetres thick. What is the least number of folds that makes the stack thicker than one centimetre?', show: 'q' },
        { say: 'First, put both lengths in the same unit. One centimetre is ten millimetres.', show: 'm.0', focus: 'm.0' },
        { say: 'After n folds, there are two to the power of n layers, each zero point one millimetres thick. So the stack is zero point one times two to the power of n millimetres thick.', show: 'm.1', focus: 'm.1' },
        { say: 'We need that to be more than ten millimetres. Zero point one times one hundred is ten, so two to the power of n must be more than one hundred.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Try powers',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Folds', 'Layers', 'Thickness'],
          rows: [
            ['$5$', '$2^5 = 32$', '$3.2$ mm'],
            ['$6$', '$2^6 = 64$', '$6.4$ mm'],
            ['$7$', '$2^7 = 128$', '$12.8$ mm'],
          ],
        },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{least number of folds} = 7'] },
      ],
      lines: [
        { say: 'Now try powers of two. Five folds give thirty-two layers, only three point two millimetres.', show: 't.0', focus: 't.0' },
        { say: 'Six folds give sixty-four layers, which is six point four millimetres. Sixty-four is less than one hundred, so that is still too thin.', show: 't.1', focus: 't.1' },
        { say: 'Seven folds give one hundred twenty-eight layers, which is twelve point eight millimetres. That is more than ten millimetres.', show: 't.2', focus: 't.2' },
        { say: 'So the least number of folds is seven.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Same units first',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Mixing units', md: 'The sheet is measured in **millimetres** and the target in **centimetres**. Comparing $0.1 \\times 2^n$ with $1$ gives $2^n > 10$, and only $4$ folds, which is $1.6$ mm. Change to the same unit first.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{0.1 \\times 2^4 = 1.6\\text{ mm}}', '\\good{0.1 \\times 2^7 = 12.8\\text{ mm} > 10\\text{ mm}}'] },
      ],
      lines: [
        { say: 'Here is a common mistake. The sheet is measured in millimetres, but the target is in centimetres.', show: 'oops' },
        { say: 'If you compare zero point one times two to the power of n with one, you get only four folds. But four folds make just one point six millimetres, far less than a centimetre.', show: 'm.0', focus: 'm.0' },
        { say: 'Change to the same unit first. In millimetres, seven folds are needed.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A sheet of paper is $0.1$ mm thick. What is the least number of folds that makes the stack thicker than $5$ mm?',
          choices: ['$5$', '$6$', '$50$', '$7$'],
          answer: 1,
          working: 'We need $0.1 \\times 2^n > 5$, so $2^n > 50$. $2^5 = 32$ is too small; $2^6 = 64$ is enough: $0.1 \\times 64 = 6.4$ mm.',
        },
      ],
      lines: [
        { say: 'Your turn. A sheet of paper is zero point one millimetres thick. What is the least number of folds that makes the stack thicker than five millimetres? Pause the video and try it.', show: 'q', wait: 8 },
        { say: 'The answer is B, six folds. Two to the power of n must be more than fifty, and two to the power of six is sixty-four, which makes six point four millimetres. Choice A, five folds, gives thirty-two layers, which is only three point two millimetres.', show: 'q.answer' },
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
            'Each fold doubles the layers: after $n$ folds there are $2^n$ layers.',
            'Put both lengths in the same unit: $1$ cm $= 10$ mm.',
            'To find when an amount first passes a target, try powers until one is big enough: $2^7 = 128 > 100$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Each fold doubles the layers, so after n folds there are two to the power of n layers.', show: 'sum.0' },
        { say: 'Put both lengths in the same unit before you compare them.', show: 'sum.1' },
        { say: 'And to find when an amount first passes a target, try powers until one is big enough. Well done on finishing this unit on powers. See you in the next one!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
