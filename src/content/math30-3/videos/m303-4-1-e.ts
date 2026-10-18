import type { Explainer } from '@/video/script.ts';
import { dots, plane } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { arrow, edgeNumbers, link, turn } from './lib/m303-4-figures.ts';

const g = plane({ x: [-6, 6], y: [-4, 4], every: 0 });
const h = plane({ x: [-6, 6], y: [-5, 5], every: 0 });

const video: Explainer = {
  id: 'm303-4-1-e',
  lessonId: 'm303-4-1',
  title: 'Translations, Reflections and Rotations, Part 5: Two Transformations in a Row',
  thumbnailTitle: 'Combining Moves',
  thumbnail: 'tw',
  summary: 'Applying two transformations one after the other, in order, writing the point down after each step: P(3, 2) reflected in the y-axis and then translated 4 units down ends at (−3, −2). The order matters: a quarter turn clockwise then 4 units left sends P(3, 2) to (−2, −3), but 4 units left then the quarter turn sends it to (2, 1).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Transformations · Part 5', title: 'Two Transformations in a Row', subtitle: 'One move after another' }],
      lines: [
        { say: 'Patterns in tiles, quilts and logos often use one move after another: a flip and then a slide, or a turn and then a slide.', show: 'title' },
        { say: 'In this video, you will apply two transformations in a row, and see why the order you apply them in matters.' },
      ],
    },
    {
      chapter: 'One step at a time',
      layout: 'center',
      main: [{ kind: 'callout', id: 'key', tone: 'key', title: 'Two transformations', md: 'Apply them **in order**, and write down the point after each step. The image after the first move is the starting point for the second.' }],
      lines: [
        { say: 'When a shape goes through two transformations, apply them in the order given, one at a time.', show: 'key' },
        { say: 'Write down the point after each step. The image after the first move becomes the starting point for the second move. Doing it in steps keeps the signs straight.' },
      ],
    },
    {
      chapter: 'A two-step tile pattern',
      layout: 'split',
      left: [
        figure('tw', [
          g,
          edgeNumbers(g),
          link(g, { id: 'k', from: [3, 2], to: [-3, 2], tone: 'opp' }),
          arrow(g, { id: 'd', from: [-3, 2], to: [-3, -2], tone: 'theta' }),
          dots(g, [
            { id: 'P', x: 3, y: 2, tex: 'P(3, 2)', tone: 'adj', place: 'above' },
            { id: 'P1', x: -3, y: 2, tex: '({-3}, 2)', tone: 'opp', place: 'above' },
            { id: 'P2', x: -3, y: -2, tex: '({-3}, {-2})', tone: 'theta', place: 'below' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{1. Reflect in the } y\\text{-axis:}', '(3, 2) \\to ({-3}, 2)', '\\text{2. Translate 4 down:}', '({-3}, 2) \\to ({-3},\\ 2 - 4)', '= ({-3}, {-2})'] }],
      lines: [
        { say: 'A corner of a tile is at P, three, two. It is reflected in the y-axis, and then the image is translated four units down. Where does it end up?', show: ['tw.grid', 'tw.axes', 'tw.P'] },
        { say: 'Step one: reflect in the y-axis. The x-coordinate changes sign, and y stays the same. Three, two goes to negative three, two.', show: ['m.0', 'm.1', 'tw.k', 'tw.P1'], focus: ['m.1', 'tw.P1'] },
        { say: 'Step two: start from that image, negative three, two, and translate it four units down. Subtract four from y: two minus four is negative two.', show: ['m.2', 'm.3', 'm.4', 'tw.d', 'tw.P2'], focus: ['m.3', 'm.4', 'tw.P2'] },
        { say: 'So the corner ends up at negative three, negative two.' },
      ],
    },
    {
      chapter: 'Turn, then slide',
      layout: 'split',
      left: [
        figure('ts', [
          h,
          edgeNumbers(h),
          turn(h, { id: 't', about: [0, 0], from: [3, 2], deg: -90, tone: 'opp', label: '90^\\circ', labelOut: 0.9 }),
          arrow(h, { id: 'l', from: [2, -3], to: [-2, -3], tone: 'theta' }),
          dots(h, [
            { id: 'O', x: 0, y: 0, tone: 'good' },
            { id: 'P', x: 3, y: 2, tex: 'P(3, 2)', tone: 'adj', place: 'above' },
            { id: 'Q', x: 2, y: -3, tex: '(2, {-3})', tone: 'opp', place: 'below right' },
            { id: 'R', x: -2, y: -3, tex: '({-2}, {-3})', tone: 'theta', place: 'below' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{1. } 90^\\circ \\text{ clockwise:}', '(x, y) \\to (y, -x)', '(3, 2) \\to (2, {-3})', '\\text{2. Translate 4 left:}', '(2, {-3}) \\to ({-2}, {-3})'] }],
      lines: [
        { say: 'Does the order matter? Try two moves on P, at three, two: a quarter turn clockwise about the origin, and a slide of four units left.', show: ['ts.grid', 'ts.axes', 'ts.O', 'ts.P'] },
        { say: 'First the turn. Ninety degrees clockwise maps x, y to y, negative x, so three, two goes to two, negative three.', show: ['m.0', 'm.1', 'm.2', 'ts.t', 'ts.Q'], focus: ['m.2', 'ts.Q'] },
        { say: 'Then the slide. Four units left subtracts four from x: two, negative three goes to negative two, negative three.', show: ['m.3', 'm.4', 'ts.l', 'ts.R'], focus: ['m.4', 'ts.R'] },
      ],
    },
    {
      chapter: 'Slide, then turn',
      layout: 'split',
      left: [
        figure('st', [
          h,
          edgeNumbers(h),
          arrow(h, { id: 'l', from: [3, 2], to: [-1, 2], tone: 'theta' }),
          turn(h, { id: 't', about: [0, 0], from: [-1, 2], deg: -90, tone: 'opp', label: '90^\\circ', labelOut: 0.9 }),
          dots(h, [
            { id: 'O', x: 0, y: 0, tone: 'good' },
            { id: 'P', x: 3, y: 2, tex: 'P(3, 2)', tone: 'adj', place: 'right' },
            { id: 'Q', x: -1, y: 2, tex: '({-1}, 2)', tone: 'theta', place: 'above left' },
            { id: 'R', x: 2, y: 1, tex: '(2, 1)', tone: 'opp', place: 'below right' },
          ]),
        ]),
      ],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{1. Translate 4 left:}', '(3, 2) \\to ({-1}, 2)', '\\text{2. } 90^\\circ \\text{ clockwise:}', '({-1}, 2) \\to (2, 1)'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Order matters', md: 'The same two moves in a different order can give a different image: $({-2}, {-3})$ one way, $(2, 1)$ the other.' },
      ],
      lines: [
        { say: 'Now do the same two moves the other way round. First the slide: four units left takes three, two to negative one, two.', show: ['st.grid', 'st.axes', 'st.O', 'st.P', 'm.0', 'm.1', 'st.l', 'st.Q'], focus: ['m.1', 'st.Q'] },
        { say: 'Then the quarter turn clockwise: y, negative x. Negative one, two goes to two, one.', show: ['m.2', 'm.3', 'st.t', 'st.R'], focus: ['m.3', 'st.R'] },
        { say: 'One order ended at negative two, negative three. The other ended at two, one. The same two moves, in a different order, gave a different answer. So always apply the moves in the order you are given.', show: 'key' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The point $Q(1, 4)$ is translated 3 units right, and then the image is reflected in the $x$-axis. Where does it end up?',
          choices: ['$(4, -4)$', '$(-4, 4)$', '$(4, 4)$', '$(1, -4)$'],
          answer: 0,
          working: 'Translate 3 right: $(1, 4) \\to (4, 4)$. Reflect in the $x$-axis: $(4, 4) \\to (4, -4)$.',
        },
      ],
      lines: [
        { say: 'Your turn. The point Q, at one, four, is translated three units right, and then the image is reflected in the x-axis. Where does it end up? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, four, negative four. Three right takes one, four to four, four. Then the reflection in the x-axis changes the sign of y: four, negative four. Choice C, four, four, stops after the first step.', show: 'q.answer' },
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
            'Apply two transformations in order, writing down the point after each step.',
            'The image after the first move is the start of the second.',
            'The order matters: the same moves in a different order can give a different image.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To apply two transformations, do them in order, and write down the point after each step.', show: 'sum.0' },
        { say: 'The image after the first move is the starting point for the second.', show: 'sum.1' },
        { say: 'And the order matters: the same moves in a different order can give a different image. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
