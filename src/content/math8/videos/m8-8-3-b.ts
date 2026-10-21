import type { Explainer } from '@/video/script.ts';
import { box, figure } from '@/video/solids.ts';

// A box labelled with letters, and the box of crackers: 12.5 cm by 8 cm by 4 cm (drawn at half size).
const letters = figure('lt', [box({ l: 6, w: 4, h: 3, labels: { l: 'l', w: 'w', h: 'h' } })], 400);
const crackers = (id: string) => figure(id, [box({ l: 6.25, w: 4, h: 2, labels: { l: '12.5\\text{ cm}', w: '8\\text{ cm}', h: '4\\text{ cm}' } })], 380);

const video: Explainer = {
  id: 'm8-8-3-b',
  lessonId: 'm8-8-3',
  title: 'Surface Area of Prisms, Part 2: A Formula for Rectangular Prisms',
  thumbnailTitle: 'SA = 2lw + 2lh + 2wh',
  thumbnail: 'cr',
  summary:
    'Each pair of matching faces of a rectangular prism gives one term, so SA = 2lw + 2lh + 2wh for length l, width w and height h. A box of crackers 12.5 cm long, 8 cm wide and 4 cm high has SA = 200 + 100 + 64 = 364 cm². Leaving out the 2s counts only three faces and gives half the answer.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Surface Area and Volume · Part 2', title: 'A Formula for Rectangular Prisms', subtitle: 'One term for each pair of faces' }],
      lines: [
        { say: 'In the last part, you found the surface area of a box by adding up its faces in matching pairs.', show: 'title' },
        { say: 'In this video, you will turn that method into a formula that works for any box, and use it step by step.' },
      ],
    },
    {
      chapter: 'One term for each pair',
      layout: 'split',
      leftWidth: 520,
      left: [letters],
      right: [{ kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['\\text{top, bottom: } 2lw', '\\text{front, back: } 2lh', '\\text{two ends: } 2wh', 'SA = 2lw + 2lh + 2wh'] }],
      lines: [
        { say: 'Here is a box with letters instead of numbers. Call its length l, its width w, and its height h.', show: ['lt.shape', 'lt.front-face', 'lt.top-face', 'lt.side-face', 'lt.l', 'lt.w', 'lt.h'] },
        { say: 'The top is l by w, so its area is l times w, written l w. The bottom matches it, so together they make two l w.', show: 'm.0', focus: ['m.0', 'lt.top-face'] },
        { say: 'The front is l by h. With the back, that makes two l h.', show: 'm.1', focus: ['m.1', 'lt.front-face'] },
        { say: 'Each end is w by h. The two ends make two w h.', show: 'm.2', focus: ['m.2', 'lt.side-face'] },
        { say: 'Add the three pairs. The surface area, S A for short, equals two l w plus two l h plus two w h.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'A box of crackers',
      layout: 'split',
      leftWidth: 520,
      left: [crackers('cr')],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['2lw = 2 \\times 12.5 \\times 8 = 200', '2lh = 2 \\times 12.5 \\times 4 = 100', '2wh = 2 \\times 8 \\times 4 = 64', 'SA = 200 + 100 + 64', '\\phantom{SA} = 364\\text{ cm}^2'] },
      ],
      lines: [
        { say: 'A box of crackers is twelve point five centimetres long, eight centimetres wide and four centimetres high. Find its surface area.', show: ['cr.shape', 'cr.front-face', 'cr.top-face', 'cr.side-face', 'cr.l', 'cr.w', 'cr.h'] },
        { say: 'Two l w is two times twelve point five times eight. Two times twelve point five is twenty-five, and twenty-five times eight is two hundred.', show: 'm.0', focus: ['m.0', 'cr.top-face'] },
        { say: 'Two l h is two times twelve point five times four, which is one hundred.', show: 'm.1', focus: ['m.1', 'cr.front-face'] },
        { say: 'Two w h is two times eight times four, which is sixty-four.', show: 'm.2', focus: ['m.2', 'cr.side-face'] },
        { say: 'Add them: two hundred plus one hundred plus sixty-four is three hundred sixty-four. The surface area is three hundred sixty-four square centimetres.', show: ['m.3', 'm.4'], focus: 'm.4' },
      ],
    },
    {
      chapter: 'Counting only three faces',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{12.5 \\times 8 + 12.5 \\times 4 + 8 \\times 4 = 182}', '\\good{2 \\times 182 = 364\\text{ cm}^2}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Counting only three faces', md: '$l \\times w + l \\times h + w \\times h$ covers only **three** faces, one of each pair. Remember the $2$ in front of each term, or the answer is half as big as it should be.' },
      ],
      lines: [
        { say: 'Here is a common mistake. It is easy to forget the twos, and work out l times w, plus l times h, plus w times h.', show: 'm.0' },
        { say: 'For the crackers, that gives one hundred plus fifty plus thirty-two, which is one hundred eighty-two. But that covers only three faces: one from each pair.', show: 'oops', focus: 'm.0' },
        { say: 'The box has six faces, so the real answer is twice as big: three hundred sixty-four square centimetres. Remember the two in front of each term.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A box is $6$ cm long, $5$ cm wide and $3$ cm high. Use $SA = 2lw + 2lh + 2wh$. What is its surface area?',
          choices: ['$126\\text{ cm}^2$', '$63\\text{ cm}^2$', '$90\\text{ cm}^2$', '$96\\text{ cm}^2$'],
          answer: 0,
          working: '$2lw = 2 \\times 6 \\times 5 = 60$, $2lh = 2 \\times 6 \\times 3 = 36$, $2wh = 2 \\times 5 \\times 3 = 30$. $SA = 60 + 36 + 30 = 126\\text{ cm}^2$.',
        },
      ],
      lines: [
        { say: 'Your turn. A box is six centimetres long, five centimetres wide and three centimetres high. Use the formula. What is its surface area? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, one hundred twenty-six square centimetres. Two l w is sixty, two l h is thirty-six, and two w h is thirty. Sixty plus thirty-six plus thirty is one hundred twenty-six. Choice B forgets the twos, so it counts only three of the six faces.', show: 'q.answer' },
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
          items: ['Rectangular prism: $SA = 2lw + 2lh + 2wh$.', 'Each term is one matching pair of faces.', 'Remember the $2$s, or you count only three faces.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. For a rectangular prism, the surface area is two l w plus two l h plus two w h.', show: 'sum.0' },
        { say: 'Each term is one matching pair of faces: top and bottom, front and back, and the two ends.', show: 'sum.1' },
        { say: 'Remember the twos, or you count only three faces. In the next part, you will find the surface area of a triangular prism. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
