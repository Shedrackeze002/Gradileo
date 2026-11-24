import type { DiagramEl, DiagramItem, Explainer } from '@/video/script.ts';

// Exam question for Math 20-3 lesson 5.3 (exploded views and component parts). The free OpenStax
// books have no questions on exploded views, so this one is written by Gradileo in the style of a
// Grade 11 workplace mathematics unit test. Each of the 5 shelves takes 4 screws, so 5 × 4 = 20
// screws. The shelves sit between the two side panels, so the width is 76 + 2 × 1.8 = 79.6 cm.

/** Shelf heights in the drawing (it is a sketch, not to scale). */
const SHELVES = [0.5, 4, 7.5, 11, 14.5];

/**
 * The exploded view from the front: the two side panels pulled away from the five shelves, with
 * dashed lines showing where each shelf goes. Groups: `panels`, `shelves`, `guides`, `dims`.
 */
const kit = (height = 440): DiagramEl => {
  const points: Record<string, [number, number]> = {};
  const items: DiagramItem[] = [];
  const rect = (id: string, x0: number, y0: number, x1: number, y1: number, tone: 'brand' | 'adj', group: string) => {
    points[`${id}a`] = [x0, y0];
    points[`${id}b`] = [x1, y0];
    points[`${id}c`] = [x1, y1];
    points[`${id}d`] = [x0, y1];
    const corners = ['a', 'b', 'c', 'd'].map((k) => `${id}${k}`);
    items.push({ kind: 'region', id, points: corners, tone, shade: 0.35, group }, { kind: 'curve', id: `${id}e`, points: corners, closed: true, group });
  };
  rect('lp', 0, 0, 1.5, 16, 'adj', 'panels');
  rect('rp', 24.5, 0, 26, 16, 'adj', 'panels');
  SHELVES.forEach((y, i) => {
    rect(`s${i}`, 5, y, 21, y + 1, 'brand', 'shelves');
    points[`gl${i}a`] = [1.5, y + 0.5];
    points[`gl${i}b`] = [5, y + 0.5];
    points[`gr${i}a`] = [21, y + 0.5];
    points[`gr${i}b`] = [24.5, y + 0.5];
    items.push({ kind: 'line', id: `gl${i}`, from: `gl${i}b`, to: `gl${i}a`, tone: 'muted', dashed: true, group: 'guides' }, { kind: 'line', id: `gr${i}`, from: `gr${i}a`, to: `gr${i}b`, tone: 'muted', dashed: true, group: 'guides' });
  });
  points.wA = [5, 17];
  points.wB = [21, 17];
  points.tA = [0, -1];
  points.tB = [1.5, -1];
  points.ns = [16, -1];
  items.push(
    { kind: 'line', id: 'w', from: 'wA', to: 'wB', tone: 'brand', label: '76 \\text{ cm}', labelSide: 'left', group: 'dims' },
    { kind: 'line', id: 't', from: 'tB', to: 'tA', tone: 'adj', label: '1.8 \\text{ cm}', labelSide: 'left', group: 'dims' },
    { kind: 'label', id: 'ns', at: 'ns', tex: '\\text{(not to scale)}', tone: 'muted', place: 'below', group: 'dims' },
  );
  return { kind: 'diagram', id: 'kit', height, points, items };
};

const QUESTION =
  'The exploded view of a flat-pack bookshelf shows 2 side panels and 5 shelves. Each shelf is fixed to the side panels with 4 screws, 2 at each end. The parts list says each shelf is 76 cm long and each side panel is 1.8 cm thick. (a) How many screws are needed for the shelves? (b) How wide is the assembled bookshelf, from the outside of one side panel to the outside of the other?';

const video: Explainer = {
  id: 'xq-m203-5-3',
  lessonId: '',
  exam: {
    lesson: 'm203-5-3',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 11 workplace mathematics unit test',
    licence: 'Written by Gradileo',
    question: QUESTION,
  },
  title: 'Exam Question: Building a Flat-Pack Bookshelf (Exploded Views)',
  thumbnailTitle: 'How Wide Is the Bookshelf?',
  thumbnail: 'kit',
  summary:
    'An exam-style question, solved one small step at a time: the exploded view of a flat-pack bookshelf shows 2 side panels 1.8 cm thick and 5 shelves 76 cm long, each fixed with 4 screws. How many screws are needed, and how wide is the finished bookshelf? There are 5 × 4 = 20 screws. The shelves sit between the panels, so the width is 76 + 1.8 + 1.8 = 79.6 cm. Then we check the answer and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Wide Is the Bookshelf?', subtitle: 'Exploded views, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam-style question about an exploded view. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'Gradileo wrote this question in the style of a unit test, because the free textbooks we use have no question like it.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: '(a) $20$ screws (b) $79.6$ cm', working: '$5 \\times 4 = 20$, and $76 + 1.8 + 1.8 = 79.6$' }],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'The exploded view of a flat-pack bookshelf shows 2 side panels and 5 shelves. Each shelf is fixed to the side panels with 4 screws, 2 at each end.' },
        { say: 'The parts list says each shelf is 76 centimetres long, and each side panel is 1.8 centimetres thick.' },
        { say: 'Part a: how many screws are needed for the shelves? Part b: how wide is the assembled bookshelf, from the outside of one side panel to the outside of the other?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 760,
      left: [kit()],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'An **exploded view** pulls the parts apart, so you can see **every piece** and **where it goes**.' }],
      lines: [
        { say: 'Here is the exploded view, from the front. An exploded view pulls the parts apart, so you can see every piece and where it goes.', show: ['kit', 't'] },
        { say: 'Here are the two side panels, pulled out to the sides.', show: 'kit.panels' },
        { say: 'And here are the 5 shelves. The dashed lines show that each shelf fits between the two panels.', show: ['kit.shelves', 'kit.guides'] },
        { say: 'Each shelf is 76 centimetres long, and each panel is 1.8 centimetres thick. The drawing is a sketch, not to scale.', show: 'kit.dims' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['(a) **Shelves** $\\times$ screws per shelf', '(b) Picture the parts **pushed together**', 'Add **every** part across the width'] }],
      lines: [
        { say: 'Here is the plan. For part a, multiply the number of shelves by the screws for each shelf.', show: 'plan.0' },
        { say: 'For part b, picture the parts pushed back together.', show: 'plan.1' },
        { say: 'Then add every part that lies across the width.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Part (a): The screws',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['5 \\text{ shelves} \\times 4 \\text{ screws} = \\good{20 \\text{ screws}}'] }],
      lines: [
        { say: 'Part a. Each shelf takes 4 screws, 2 at each end, and there are 5 shelves.', show: 'm.0' },
        { say: '5 times 4 is 20. The shelves need 20 screws.', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Part (b): The width',
      layout: 'split',
      leftWidth: 760,
      left: [kit(420)],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['1.8 + 76 + 1.8', '= \\good{79.6 \\text{ cm}}'] }],
      lines: [
        { say: 'Part b. Push the parts back together. Going across the bookshelf, you cross the left panel, then a shelf, then the right panel.', show: ['kit', 'kit.panels', 'kit.shelves', 'kit.guides', 'kit.dims'] },
        { say: 'So the width is 1.8 plus 76 plus 1.8 centimetres.', show: 'm.0', focus: 'm.0' },
        { say: 'That is 79.6 centimetres.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['20 \\div 5 = 4 \\text{ screws per shelf} \\ \\checkmark', '79.6 - 2 \\times 1.8 = 76 \\text{ cm} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by working backwards. 20 screws shared among 5 shelves is 4 each.', show: 'm.0' },
        { say: 'And taking the two panels off the 79.6 centimetres leaves 76 centimetres, the length of a shelf. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['(a) $10$ screws', 'used $2$ screws per shelf: that is **each end**'],
            ['(b) $76$ cm', 'just the shelf: the **panels** add width too'],
            ['(b) $77.8$ cm', 'only **one** panel: there is one on **each** side'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '10 screws uses 2 per shelf. The 2 are for each end, and each shelf has two ends, so it takes 4.' },
        { say: '76 centimetres is only the shelf. The side panels sit outside the shelves, so they add to the width.' },
        { say: 'And 77.8 adds only one panel. There is a panel on each side.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'The exploded view of a shoe rack shows $2$ end panels, each $2$ cm thick, and $3$ shelves, each $60$ cm long, that fit between them. How wide is the assembled rack?',
          choices: ['$60$ cm', '$62$ cm', '$66$ cm', '$64$ cm'],
          answer: 3,
          working: '$2 + 60 + 2 = 64$ cm. The shelves are stacked one above another, so only one lies across the width.',
        },
      ],
      lines: [
        { say: 'Your turn. The exploded view of a shoe rack shows 2 end panels, each 2 centimetres thick, and 3 shelves, each 60 centimetres long, that fit between them. How wide is the assembled rack? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Across the rack, you cross one end panel, one shelf and the other end panel: 2 plus 60 plus 2 is 64 centimetres. Choice "D".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['An exploded view shows **every part**', 'Count parts: **how many** $\\times$ **each**', 'Picture the parts **pushed together**', 'Add **every** part across a length'] }],
      lines: [
        { say: 'Here is what to remember. An exploded view pulls an object apart to show every part and where it goes.', show: 'sum.0' },
        { say: 'To count fasteners, multiply how many parts by how many each one needs.', show: 'sum.1' },
        { say: 'To find a size, picture the parts pushed back together.', show: 'sum.2' },
        { say: 'And add every part that lies across that length. For more on exploded views and component parts, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
