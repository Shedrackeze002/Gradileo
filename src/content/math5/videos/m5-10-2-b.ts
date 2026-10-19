import type { Explainer } from '@/video/script.ts';
import { tiles } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';
import { note, rect } from './lib/m5-10-figures.ts';

const video: Explainer = {
  id: 'm5-10-2-b',
  lessonId: 'm5-10-2',
  title: 'Area and Perimeter of Rectangles, Part 2: Finding a Missing Side',
  thumbnailTitle: 'Finding a Missing Side',
  thumbnail: 'ban',
  summary: 'When you know the area of a rectangle and one side, divide the area by that side to find the other side: 12 cm² in 3 rows makes rows of 4, and a banner of 156 cm² that is 6 cm wide is 156 ÷ 6 = 26 cm long, checked by 26 × 6 = 156.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Area · Part 2', title: 'Finding a Missing Side', subtitle: 'Work backwards with division' }],
      lines: [
        { say: 'Sometimes you know the area of a rectangle, and one of its sides. Can you find the other side? Yes! You just work backwards.', show: 'title' },
        { say: 'In this video, you will use division to find a missing side of a rectangle, and check your answer by multiplying.' },
      ],
    },
    {
      chapter: 'Working backwards',
      layout: 'split',
      leftWidth: 520,
      left: [figure('t', [tiles({ cols: 4, rows: 3, labels: { width: '?', height: '3\\text{ cm}' } })])],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Area} = 12\\text{ cm}^2', '? \\times 3 = 12', '12 \\div 3 = 4', '\\text{length} = 4\\text{ cm}'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'A missing side', md: 'Divide the **area** by the side you know.' },
      ],
      lines: [
        { say: 'Here is a rectangle with an area of twelve square centimetres. It is three centimetres wide, so it has three rows of squares. How long is it?', show: ['t.outline', 't.height', 't.width', 'm.0'], focus: 'm.0' },
        { say: 'Length times width is the area. So some number times three is twelve.', show: 'm.1', focus: 'm.1' },
        { say: 'To undo multiplying by three, divide by three. Twelve divided by three is four.', show: 'm.2', focus: 'm.2' },
        { say: 'So each row has four squares, and the rectangle is four centimetres long. Let’s count to check: three rows of four is twelve squares.', show: ['t.grid', 'm.3'], focus: ['t.grid', 'm.3'] },
        { say: 'So when you know the area and one side, divide the area by the side you know.', show: 'key' },
      ],
    },
    {
      chapter: 'A paper banner',
      layout: 'split',
      leftWidth: 560,
      left: [figure('ban', [rect({ w: 26, h: 6, tone: 'theta', labels: { bottom: '?\\text{ cm}', left: '6\\text{ cm}' } }), note('area', [13, 3], '156\\text{ cm}^2', 'center', 'theta')], 300)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{length} \\times 6 = 156', '\\text{length} = 156 \\div 6', '6 \\times 20 = 120', '156 - 120 = 36', '6 \\times 6 = 36', '20 + 6 = 26'] }],
      lines: [
        { say: 'A rectangular paper banner has an area of one hundred and fifty-six square centimetres. It is six centimetres wide. How long is it?', show: ['ban.shape', 'ban.bottom', 'ban.left', 'ban.area'] },
        { say: 'The length times six is one hundred and fifty-six. So the length is one hundred and fifty-six divided by six.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'Let’s divide in friendly chunks. Six times twenty is one hundred and twenty. That leaves one hundred and fifty-six minus one hundred and twenty, which is thirty-six.', show: ['m.2', 'm.3'], focus: ['m.2', 'm.3'] },
        { say: 'And six times six is thirty-six. So we used twenty sixes, and then six more sixes.', show: 'm.4', focus: 'm.4' },
        { say: 'Twenty plus six is twenty-six. So one hundred and fifty-six divided by six is twenty-six, and the banner is twenty-six centimetres long.', show: 'm.5', focus: 'm.5' },
      ],
    },
    {
      chapter: 'Check by multiplying',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['26 \\times 6 = 20 \\times 6 + 6 \\times 6', '= 120 + 36 = 156 \\;\\checkmark'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Always check', md: 'Multiply your answer by the side you know. You should get the area back.' },
      ],
      lines: [
        { say: 'Always check your answer by multiplying. If the banner is twenty-six centimetres long and six centimetres wide, its area is twenty-six times six.', show: 'm.0', focus: 'm.0' },
        { say: 'Twenty times six is one hundred and twenty, and six times six is thirty-six. Together that is one hundred and fifty-six. It matches the area!', show: 'm.1', focus: 'm.1' },
        { say: 'Multiplying your answer by the side you know should always give you the area back.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A rectangular poster has an area of $72\\text{ cm}^2$. It is $8\\text{ cm}$ wide. How long is it?',
          choices: ['$64\\text{ cm}$', '$9\\text{ cm}$', '$576\\text{ cm}$', '$80\\text{ cm}$'],
          answer: 1,
          working: 'Length $= 72 \\div 8 = 9$, so it is $9\\text{ cm}$ long. Check: $9 \\times 8 = 72$ ✓',
        },
      ],
      lines: [
        { say: 'Your turn. A rectangular poster has an area of seventy-two square centimetres. It is eight centimetres wide. How long is it? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, nine centimetres. Seventy-two divided by eight is nine, and nine times eight is seventy-two, so it checks. Choice A subtracts eight instead of dividing by eight.', show: 'q.answer' },
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
          items: ['Area $=$ length $\\times$ width, so a missing side is area $\\div$ the side you know.', 'Divide in friendly chunks if the numbers are big.', 'Check: your answer $\\times$ the side you know gives the area.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To find a missing side, divide the area by the side you know.', show: 'sum.0' },
        { say: 'If the numbers are big, divide in friendly chunks, like twenty sixes and six more.', show: 'sum.1' },
        { say: 'And check by multiplying: you should get the area back. In the next part, you will meet perimeter. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
