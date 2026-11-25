import type { Explainer } from '@/video/script.ts';
import { box, boxNet, figure } from '@/video/solids.ts';

// Exam question for Math 20-3 lesson 2.1 (surface area of prisms and cylinders). The question is a
// Your Turn from OpenStax Contemporary Mathematics, word for word (section 10.7, Volume and Surface
// Area, CC BY-NC-SA 4.0). SA = 2B + ph: the base is 12 × 25 = 300 ft², its perimeter is
// 2(12) + 2(25) = 74 ft, so SA = 2(300) + 74 × 8 = 600 + 592 = 1192 ft², as in the book's answer.
// Check, face by face: 2(300) + 2(25 × 8) + 2(12 × 8) = 600 + 400 + 192 = 1192.

const LABELS = { l: '25 \\text{ ft}', w: '12 \\text{ ft}', h: '8 \\text{ ft}' };
const house = (height = 360) => figure('gh', [box({ l: 25, w: 12, h: 8, labels: LABELS })], height);
const net = (height = 400) =>
  figure('net', [boxNet({ l: 25, w: 12, h: 8, labels: LABELS, areas: { top: '300', bottom: '300', front: '200', back: '200', left: '96', right: '96' } })], height);

const QUESTION = 'Calculate the surface area of a greenhouse with a flat roof measuring 12 ft wide, 25 ft long, and 8 ft high.';

const video: Explainer = {
  id: 'xq-m203-2-1',
  lessonId: '',
  exam: {
    lesson: 'm203-2-1',
    source: 'OpenStax, Contemporary Mathematics, Your Turn in section 10.7, Volume and Surface Area',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/contemporary-mathematics/pages/10-7-volume-and-surface-area',
    question: QUESTION,
  },
  title: 'Exam Question: The Surface Area of a Greenhouse (Surface Area of Prisms)',
  thumbnailTitle: 'How Much Surface Has the Greenhouse?',
  thumbnail: 'net',
  summary:
    'A real test question, solved one small step at a time: calculate the surface area of a greenhouse with a flat roof, 12 ft wide, 25 ft long and 8 ft high. The greenhouse is a rectangular prism, so its surface area is 2B + ph. The base is 12 × 25 = 300 square feet and its perimeter is 74 feet, so the surface area is 2 × 300 + 74 × 8 = 600 + 592 = 1192 square feet. We unfold it into a net to check face by face, and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'The Surface Area of a Greenhouse', subtitle: 'Surface area, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about surface area. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Contemporary Mathematics textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'Calculate the surface area of a greenhouse with a flat roof measuring $12$ ft wide, $25$ ft long, and $8$ ft high.',
          answer: '$1192\\ \\text{ft}^2$',
          working: '$2(300) + 74 \\times 8 = 600 + 592 = 1192$',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Calculate the surface area of a greenhouse with a flat roof, measuring 12 feet wide, 25 feet long, and 8 feet high.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [house(), { kind: 'text', id: 't', size: 'md', md: 'A flat roof makes the greenhouse a **rectangular prism**. Its **surface area** is the total area of all **six** faces.' }],
      lines: [
        { say: 'With a flat roof, the greenhouse is a box shape, a rectangular prism: 25 feet long, 12 feet wide and 8 feet high.', show: 'gh' },
        { say: 'Its surface area is the total area of all six faces: the floor, the roof, and the four walls.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['SA = 2B + ph'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Two bases and a wrap', md: '$B$ is the area of the **base**, and there are **two** of them. $p$ is the **perimeter** of the base: the walls wrap all the way round it, $h$ high.' },
      ],
      lines: [
        { say: 'Here is what we need. The surface area of a prism is 2 B plus p h.', show: 'f' },
        { say: 'B is the area of the base, and there are two bases, the floor and the roof. p is the perimeter of the base. The walls wrap all the way round it, h feet high, so together they are p times h.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the **base** area $B$', 'Find the **perimeter** $p$', 'Put them into $SA = 2B + ph$'] }],
      lines: [
        { say: 'Here is the plan. Find the base area.', show: 'plan.0' },
        { say: 'Find the perimeter of the base.', show: 'plan.1' },
        { say: 'Then put them into the formula.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Base and perimeter',
      layout: 'center',
      main: [house(320), { kind: 'math', id: 'm', size: 'md', lines: ['B = 12 \\times 25 = 300 \\text{ ft}^2', 'p = 2(12) + 2(25) = 74 \\text{ ft}'] }],
      lines: [
        { say: 'Step one. The floor is 12 feet by 25 feet. 12 times 25 is 300 square feet.', show: ['gh', 'm.0'], focus: 'm.0' },
        { say: 'Step two. Walk round the floor: 12 plus 25 plus 12 plus 25 is 74 feet. That is the perimeter.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: The surface area',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['SA = 2(300) + 74 \\times 8', '= 600 + 592 = \\good{1192 \\text{ ft}^2}'] }],
      lines: [
        { say: 'Step three. Two bases of 300 square feet, plus 74 feet of wall going round, 8 feet high.', show: 'm.0' },
        { say: '2 times 300 is 600, and 74 times 8 is 592. Together, that is 1 thousand 192 square feet.', caption: '2 × 300 = 600, and 74 × 8 = 592. Together, that is 1192 square feet.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [net(), { kind: 'math', id: 'm', size: 'md', lines: ['300 + 300 + 200 + 200 + 96 + 96 = 1192 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by unfolding the greenhouse into a net, and adding the six faces one by one.', show: 'net' },
        { say: 'The floor and roof are 300 each, the long walls are 25 times 8, which is 200 each, and the end walls are 12 times 8, which is 96 each. They add up to 1 thousand 192 square feet. It checks out.', caption: 'The floor and roof are 300 each, the long walls are 25 × 8 = 200 each, and the end walls are 12 × 8 = 96 each. They add up to 1192 square feet. It checks out.', show: 'm', focus: 'm' },
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
            ['$2400$', 'multiplied all three: that is the **volume**, in ft³'],
            ['$592\\ \\text{ft}^2$', 'only the **walls**: add the floor and the roof'],
            ['$596\\ \\text{ft}^2$', 'one of each face: every face has a **twin**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '2 thousand 400 multiplies 12, 25 and 8. That is the volume, in cubic feet, not the surface area.', caption: '2400 multiplies 12, 25 and 8. That is the volume, in cubic feet, not the surface area.' },
        { say: '592 is only the four walls. The surface area includes the floor and the roof as well.' },
        { say: 'And 596 adds just one of each face, 300 plus 200 plus 96. Every face of a box has a twin on the opposite side.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A wooden shipping crate is $4$ ft long, $3$ ft wide and $2$ ft high. What is its surface area?',
          choices: ['$52\\ \\text{ft}^2$', '$24\\ \\text{ft}^2$', '$26\\ \\text{ft}^2$', '$40\\ \\text{ft}^2$'],
          answer: 0,
          working: '$2(4 \\times 3) + (2 \\times 4 + 2 \\times 3) \\times 2 = 24 + 28 = 52\\ \\text{ft}^2$.',
        },
      ],
      lines: [
        { say: 'Your turn. A wooden shipping crate is 4 feet long, 3 feet wide and 2 feet high. What is its surface area? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The base is 4 times 3, which is 12, so two bases are 24. The perimeter is 14, and 14 times 2 is 28. 24 plus 28 is 52 square feet. Choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Surface area: **all** the faces', 'Prism: $SA = 2B + ph$', 'Base $B$ **twice**, walls $p \\times h$', 'Check with the **net**'] }],
      lines: [
        { say: 'Here is what to remember. Surface area is the total area of all the faces.', show: 'sum.0' },
        { say: 'For a prism, it is 2 B plus p h.', show: 'sum.1' },
        { say: 'The base counts twice, and the walls are the perimeter times the height.', show: 'sum.2' },
        { say: 'And you can check by unfolding the shape into a net. For more on surface area, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
