import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { note, parallelogram } from './lib/m6-9-figures.ts';

const video: Explainer = {
  id: 'm6-9-1-c',
  lessonId: 'm6-9-1',
  title: 'Area of a Parallelogram, Part 3: Finding a Missing Base or Height',
  thumbnailTitle: 'A Missing Base or Height',
  thumbnail: 'mh',
  summary: 'When you know the area of a parallelogram and one of its two lengths, divide the area by the length you know. An area of 54 m² with a base of 9 m gives a height of 54 ÷ 9 = 6 m; an area of 42 cm² with a height of 6 cm gives a base of 7 cm. Check by multiplying.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Area of Parallelograms and Triangles · Part 3', title: 'Finding a Missing Base or Height', subtitle: 'Divide to work backwards' }],
      lines: [
        { say: 'Sometimes you already know the area of a parallelogram, but one of its lengths is missing. Can you still find it?', show: 'title' },
        { say: 'Yes, you can! In this video, you will work backwards from the area to find a missing height or a missing base.' },
      ],
    },
    {
      chapter: 'Multiply and divide',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{Area} = \\adj{\\text{base}} \\times \\opp{\\text{height}}', '\\adj{9} \\times \\opp{6} = 54', '54 \\div \\adj{9} = \\opp{6}', '54 \\div \\opp{6} = \\adj{9}'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Work backwards', md: 'If you know the **area** and one of the two lengths, **divide** the area by the length you know. The answer is the other length.' },
      ],
      lines: [
        { say: 'The rule says that area equals base times height. It links three numbers: the base, the height, and the area.', show: 'm.0' },
        { say: 'Multiplying and dividing undo each other. For example, nine times six is fifty-four.', show: 'm.1', focus: 'm.1' },
        { say: 'So fifty-four divided by nine is six, and fifty-four divided by six is nine.', show: ['m.2', 'm.3'], focus: ['m.2', 'm.3'] },
        { say: 'That means if you know the area and one of the two lengths, you can divide the area by the length you know. The answer is the other length.', show: 'key' },
      ],
    },
    {
      chapter: 'A missing height',
      layout: 'split',
      leftWidth: 520,
      left: [figure('mh', [parallelogram({ b: 9, h: 6, s: -4.5, heights: [4.5], labels: { b: '9\\text{ m}', h: '?' } }), note('area', [1.8, 3], '54\\text{ m}^2')])],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['A = b \\times h', '54 = 9 \\times h', 'h = 54 \\div 9 = 6', '\\text{Check: } 9 \\times 6 = 54 \\;\\checkmark', '\\text{Height} = 6\\text{ m}'] },
      ],
      lines: [
        { say: 'A parallelogram has an area of fifty-four square metres and a base of nine metres. Find its height.', show: ['mh.shape', 'mh.base', 'mh.h0', 'mh.area'] },
        { say: 'Start with the rule: area equals base times height. Put in the numbers you know: fifty-four equals nine times the height.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Nine times what number makes fifty-four? To find out, divide the area by the base. Fifty-four divided by nine is six.', show: 'm.2', focus: 'm.2' },
        { say: 'Always check by multiplying. Nine times six is fifty-four, which matches the area.', show: 'm.3', focus: 'm.3' },
        { say: 'So the height is six metres.', show: 'm.4', focus: ['m.4', 'mh.h0'] },
      ],
    },
    {
      chapter: 'A missing base',
      layout: 'split',
      leftWidth: 520,
      left: [figure('mb', [parallelogram({ b: 7, h: 6, s: 2.5, tone: 'good', labels: { b: '?', h: '6\\text{ cm}' } }), note('area', [6, 2.2], '42\\text{ cm}^2')])],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['A = b \\times h', '42 = b \\times 6', 'b = 42 \\div 6 = 7', '\\text{Check: } 7 \\times 6 = 42 \\;\\checkmark', '\\text{Base} = 7\\text{ cm}'] },
      ],
      lines: [
        { say: 'This time, the base is missing. A parallelogram has an area of forty-two square centimetres and a height of six centimetres. What is its base?', show: ['mb.shape', 'mb.base', 'mb.h0', 'mb.area'] },
        { say: 'Area equals base times height. So forty-two equals the base times six.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Divide the area by the length you know, the height. Forty-two divided by six is seven.', show: 'm.2', focus: 'm.2' },
        { say: 'Check: seven times six is forty-two. It matches!', show: 'm.3', focus: 'm.3' },
        { say: 'So the base is seven centimetres.', show: 'm.4', focus: ['m.4', 'mb.base'] },
      ],
    },
    {
      chapter: 'Does it make sense?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Divide, do not multiply', md: 'Multiplying the area by a length gives a number that is far too big: $54 \\times 9 = 486$ is not a height. To find a missing length, **divide** the area.' },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Check by multiplying', md: 'Multiply the two lengths. If you get the area back, your answer is right.' },
      ],
      lines: [
        { say: 'Be careful to divide, and not to multiply. Fifty-four times nine is four hundred and eighty-six. A height of four hundred and eighty-six metres would make the area far too big!', show: 'oops' },
        { say: 'To find a missing length, divide the area by the length you know.', focus: 'oops' },
        { say: 'Then check by multiplying the two lengths. If you get the area back, your answer is right.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A parallelogram has an area of $72\\text{ cm}^2$ and a height of $8\\text{ cm}$. What is its base?',
          choices: ['$9\\text{ cm}$', '$64\\text{ cm}$', '$576\\text{ cm}$', '$80\\text{ cm}$'],
          answer: 0,
          working: '$72 = b \\times 8$, so $b = 72 \\div 8 = 9$. Check: $9 \\times 8 = 72$ ✓',
        },
      ],
      lines: [
        { say: 'Your turn. A parallelogram has an area of seventy-two square centimetres and a height of eight centimetres. What is its base? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, nine centimetres. Seventy-two divided by eight is nine, and nine times eight is seventy-two. Choice C multiplies instead of dividing, which gives a base far too long.', show: 'q.answer' },
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
          items: ['Area $=$ base $\\times$ height links three numbers.', 'To find a missing base or height, divide the area by the length you know.', 'Check by multiplying: you should get the area back.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Area equals base times height links three numbers: the base, the height and the area.', show: 'sum.0' },
        { say: 'To find a missing base or height, divide the area by the length you know.', show: 'sum.1' },
        { say: 'Then check by multiplying. In the next part, you will see that any side of a parallelogram can be its base. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
