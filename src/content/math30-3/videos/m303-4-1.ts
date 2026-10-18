import type { Explainer } from '@/video/script.ts';
import { dots, plane } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { arrow, edgeNumbers, shape } from './lib/m303-4-figures.ts';

type P = [number, number];

const g = plane({ x: [-6, 6], y: [-6, 6], every: 0 });
/** The gusset plate and its image, 5 left and 3 down. */
const plate: P[] = [[1, 2], [4, 2], [1, 4]];
const moved: P[] = plate.map(([x, y]) => [x - 5, y - 3]);

const g2 = plane({ x: [-6, 4], y: [-4, 4], every: 0 });

const video: Explainer = {
  id: 'm303-4-1',
  lessonId: 'm303-4-1',
  title: 'Translations, Reflections and Rotations, Part 1: Translations',
  thumbnailTitle: 'Translations',
  thumbnail: 'tr',
  summary: 'What a transformation and its image are, translations that slide every point the same distance in the same direction, mapping notation (x, y) → (x + a, y + b), and a triangular plate on a cutting table moved 5 units left and 3 units down, from A(1, 2), B(4, 2), C(1, 4) to A′(−4, −1), B′(−1, −1), C′(−4, 1). Part 2 covers reflections.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Transformations · Part 1', title: 'Translations', subtitle: 'Sliding a shape on a grid' }],
      lines: [
        { say: 'A computer-controlled cutter moves its torch around a grid. A sign maker flips a logo so it reads from the other side of a window. A tile setter turns the same tile to make a pattern.', show: 'title' },
        { say: 'Each of these is a transformation: a rule that moves every point of a shape. In this video, you will slide shapes on a grid, and write the slide as a rule.' },
      ],
    },
    {
      chapter: 'Transformations and images',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Transformation and image', md: 'A **transformation** moves or changes a shape. The new shape is the **image**. The image of point $A$ is called $A\'$ ("A prime").' },
        { kind: 'callout', id: 'tr', tone: 'definition', title: 'Translation', md: 'A **translation** slides every point the same distance in the same direction. The shape keeps its size and still faces the same way.' },
      ],
      lines: [
        { say: 'A transformation moves or changes a shape. The shape you start with is the original, and the new shape is called the image.', show: 'def' },
        { say: 'We name the image of a point with a small mark after its letter. The image of point A is written A prime, the image of B is B prime, and so on.' },
        { say: 'The simplest transformation is a translation. A translation slides every point of a shape the same distance, in the same direction. The shape keeps its size, and it still faces the same way. Nothing turns or flips.', show: 'tr' },
      ],
    },
    {
      chapter: 'Mapping notation',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['(x, y) \\to (x + \\adj{a},\\ y + \\opp{b})'] },
        { kind: 'bullets', id: 'b', items: ['[[adj:a]]: right is $+$, left is $-$.', '[[opp:b]]: up is $+$, down is $-$.', '3 right and 2 down: $(x, y) \\to (x + 3,\\ y - 2)$'] },
      ],
      lines: [
        { say: 'A translation of "a" units across and b units up or down can be written as a rule, in mapping notation. The point x, y maps to x plus "a", y plus b.', show: 'm' },
        { say: 'The number "a" moves the point across: positive for right, and negative for left.', show: 'b.0', focus: 'b.0' },
        { say: 'The number b moves the point up or down: positive for up, and negative for down.', show: 'b.1', focus: 'b.1' },
        { say: 'For example, a slide of three units right and two units down is written x, y maps to x plus three, y minus two.', show: 'b.2', focus: 'b.2' },
      ],
    },
    {
      chapter: 'Moving a part on a cutting table',
      layout: 'split',
      left: [
        figure('tr', [
          g,
          edgeNumbers(g),
          shape(g, { id: 'abc', pts: plate, names: ['A', 'B', 'C'], tone: 'adj', places: ['below', 'below', 'above'] }),
          shape(g, { id: 'img', pts: moved, names: ["A'", "B'", "C'"], tone: 'opp', places: ['below left', 'below', 'above left'] }),
          ...plate.map((p, i) => arrow(g, { id: `m${i}`, from: p, to: moved[i], group: 'moves' })),
        ]),
      ],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['(x, y) \\to (x - 5,\\ y - 3)', 'A(1, 2) \\to ({-4}, {-1})', 'B(4, 2) \\to ({-1}, {-1})', 'C(1, 4) \\to ({-4}, 1)'],
        },
      ],
      lines: [
        { say: 'A triangular metal plate has corner A at one, two, corner B at four, two, and corner C at one, four. The cutting program translates it five units left and three units down. Find the image of each corner.', show: ['tr.grid', 'tr.axes', 'tr.abc', 'tr.abc-names'] },
        { say: 'Five left means subtract five from x. Three down means subtract three from y. So the rule is x, y maps to x minus five, y minus three.', show: 'm.0', focus: 'm.0' },
        { say: 'For A: one minus five is negative four, and two minus three is negative one. So A prime is at negative four, negative one.', show: 'm.1', focus: 'm.1' },
        { say: 'For B: four minus five is negative one, and two minus three is negative one. B prime is at negative one, negative one.', show: 'm.2', focus: 'm.2' },
        { say: 'For C: one minus five is negative four, and four minus three is one. C prime is at negative four, one.', show: 'm.3', focus: 'm.3' },
        { say: 'Join the image points, and the plate has slid down and to the left. Every corner moved the same distance in the same direction, the arrows are all parallel, and the plate still faces the same way.', show: ['tr.img', 'tr.img-names', 'tr.moves'], focus: ['tr.img', 'tr.moves'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'split',
      left: [
        figure('wo', [
          g2,
          edgeNumbers(g2),
          dots(g2, [
            { id: 'P', x: 1, y: 2, tex: '(1, 2)', tone: 'adj', place: 'above right' },
            { id: 'R', x: -4, y: 2, tex: '({-4}, 2)', tone: 'good', place: 'above' },
            { id: 'W', x: 1, y: -3, tex: '(1, {-3})', tone: 'bad', place: 'right' },
          ]),
          arrow(g2, { id: 'go', from: [1, 2], to: [-4, 2], tone: 'good' }),
        ]),
      ],
      right: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Changing the wrong coordinate', md: 'Left and right change only $x$. Up and down change only $y$. Moving $(1, 2)$ five units left gives $(-4, 2)$, not $(1, -3)$.' }],
      lines: [
        { say: 'Take care to change the right coordinate. Left and right change only x, the first number. Up and down change only y, the second number.', show: ['oops', 'wo.grid', 'wo.axes', 'wo.P'] },
        { say: 'Moving the point at one, two, five units left subtracts five from x. That gives negative four, two: the same height, five squares to the left.', show: ['wo.go', 'wo.R'], focus: 'wo.R' },
        { say: 'It is not one, negative three. That point is five squares down, not five squares left.', show: 'wo.W', focus: 'wo.W' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The point $P(-2, 3)$ is translated 4 units right and 5 units down. Where is its image $P\'$?',
          choices: ['$(2, 8)$', '$(-6, -2)$', '$(-6, 8)$', '$(2, -2)$'],
          answer: 3,
          working: 'The rule is $(x, y) \\to (x + 4,\\ y - 5)$, so $(-2, 3) \\to (-2 + 4,\\ 3 - 5) = (2, -2)$.',
        },
      ],
      lines: [
        { say: 'Your turn. The point P, at negative two, three, is translated four units right and five units down. Where is its image, P prime? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, two, negative two. Right four adds four to x: negative two plus four is two. Down five subtracts five from y: three minus five is negative two. Choice A moves P five units up instead of down.', show: 'q.answer' },
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
            'A transformation moves a shape; the new shape is the image, and the image of $A$ is $A\'$.',
            'A translation slides every point the same distance in the same direction.',
            'Mapping notation: $(x, y) \\to (x + a,\\ y + b)$. Right and left change $x$; up and down change $y$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A transformation moves a shape. The new shape is the image, and the image of point A is called A prime.', show: 'sum.0' },
        { say: 'A translation slides every point the same distance in the same direction, so the shape keeps its size and faces the same way.', show: 'sum.1' },
        { say: 'And in mapping notation, x, y maps to x plus "a", y plus b. Right and left change x, and up and down change y. In the next part, we flip shapes with reflections. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
