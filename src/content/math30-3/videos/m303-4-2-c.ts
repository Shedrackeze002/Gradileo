import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { squareGrid } from './lib/m303-4-figures.ts';

/** The quilt block, 10 in square, and its enlargement by 1.5, both split into 5 in squares. */
const quilt = (cells: boolean) =>
  figure('qb', [
    squareGrid({ name: 'a', at: [0, 0], size: 10, n: 2, tone: 'adj', side: '10\\text{ in}', ...(cells ? { cell: '25' } : {}), caption: '\\text{4 squares}', captionY: -5.6 }),
    squareGrid({ name: 'b', at: [14, 0], size: 15, n: 3, tone: 'opp', side: '15\\text{ in}', ...(cells ? { cell: '25' } : {}), caption: '\\text{9 squares}', captionY: -5.6 }),
  ]);

const video: Explainer = {
  id: 'm303-4-2-c',
  lessonId: 'm303-4-2',
  title: 'Dilations, Part 3: Perimeter and Area after a Dilation',
  thumbnailTitle: 'Perimeter and Area after a Dilation',
  thumbnail: 'qb',
  summary: 'A dilation with scale factor k multiplies every length, and so the perimeter, by k, but the area by k². A 10 in quilt block enlarged by 1.5 has its perimeter grow from 40 in to 60 in and its area from 100 in² to 225 in², not 150 in². To find k from two areas, take the square root of their ratio. Part 4 covers scale drawings and models.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Dilations · Part 3', title: 'Perimeter and Area after a Dilation', subtitle: 'k for lengths, k squared for area' }],
      lines: [
        { say: 'When a design is enlarged, the trim around its edge and the fabric inside it do not grow by the same amount. That surprises a lot of people.', show: 'title' },
        { say: 'In this video, you will see how a dilation changes perimeter and area, and why area grows by the square of the scale factor.' },
      ],
    },
    {
      chapter: 'Perimeter',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Perimeter after a dilation', md: 'Every length is multiplied by $k$, so the **perimeter** is multiplied by $k$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{new perimeter} = k \\times \\text{old perimeter}'] },
      ],
      lines: [
        { say: 'A dilation multiplies every length by the scale factor, k. The perimeter is just the sides added together, so the perimeter is multiplied by k too.', show: ['key', 'm'] },
        { say: 'If every side becomes twice as long, the distance around the shape becomes twice as long as well.' },
      ],
    },
    {
      chapter: 'Area',
      layout: 'split',
      leftWidth: 600,
      left: [quilt(true)],
      right: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Area after a dilation', md: 'Area uses two lengths (length $\\times$ width), so the **area** is multiplied by $k \\times k = k^2$.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['k = 1.5', '\\text{area} \\times 1.5^2 = \\times 2.25', '9 \\div 4 = 2.25 \\;\\checkmark'] },
      ],
      lines: [
        { say: 'Area is different. Area uses two lengths, the length and the width, and both of them are multiplied by k. So the area is multiplied by k times k, which is k squared.', show: 'key' },
        { say: 'Here is a square quilt block, ten inches on a side, split into four squares of five inches. Each small square is 25 square inches.', show: ['qb.a', 'qb.a-cells', 'qb.a-cap'] },
        { say: 'Enlarge it by a scale factor of 1.5. Each side becomes fifteen inches, which holds three of the five-inch squares across, and three down: nine squares in all.', show: ['qb.b', 'qb.b-cells', 'qb.b-cap', 'm.0'], focus: ['qb.b', 'm.0'] },
        { say: 'Four squares became nine, so the area was multiplied by nine quarters, which is 2.25. And 1.5 squared is 2.25. The area grew by k squared, not by k.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2'] },
      ],
    },
    {
      chapter: 'Enlarging a quilt block',
      layout: 'split',
      leftWidth: 600,
      left: [quilt(false)],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['P = 4 \\times 10 = 40\\text{ in}', 'A = 10 \\times 10 = 100\\text{ in}^2', 'P = 1.5 \\times 40 = 60\\text{ in}', 'A = 1.5^2 \\times 100 = 225\\text{ in}^2', '\\text{check: } 15 \\times 15 = 225 \\;\\checkmark'],
        },
      ],
      lines: [
        { say: 'Now the numbers. The quilt block is a ten-inch by ten-inch square, enlarged by a scale factor of 1.5. Find the new perimeter and area.', show: ['qb.a', 'qb.b'] },
        { say: 'First the original. Its perimeter is four times ten, which is forty inches, and its area is ten times ten, which is 100 square inches.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'The perimeter is multiplied by k: 1.5 times forty is sixty inches.', show: 'm.2', focus: 'm.2' },
        { say: 'The area is multiplied by k squared: 1.5 squared is 2.25, and 2.25 times 100 is 225 square inches.', show: 'm.3', focus: 'm.3' },
        { say: 'Check with the new block itself: it is fifteen inches by fifteen inches, and fifteen times fifteen is 225. It matches.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Multiplying the area by k', md: '$100 \\times 1.5 = 150$ is wrong. Both the length and the width grow by $1.5$, so the area grows by $1.5^2 = 2.25$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['100 \\times 1.5 = \\bad{150\\text{ in}^2} \\qquad 100 \\times 1.5^2 = \\good{225\\text{ in}^2}'] },
      ],
      lines: [
        { say: 'The most common mistake is to multiply the area by k, the way you do for a length. That would give 100 times 1.5, which is 150 square inches.', show: 'oops' },
        { say: 'But both the length and the width grew by 1.5, so the area grew by 1.5 times 1.5, which is 2.25. The right answer is 225 square inches.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'From two areas to k',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['k^2 = \\dfrac{\\text{image area}}{\\text{original area}}', 'k^2 = \\dfrac{200}{50} = 4', 'k = \\sqrt{4} = 2'] },
      ],
      lines: [
        { say: 'You can also work backwards. If you know two areas, divide the image area by the original area. That gives k squared, not k.', show: 'm.0', focus: 'm.0' },
        { say: 'For example, a design with an area of fifty square centimetres is enlarged to 200 square centimetres. 200 divided by fifty is four, so k squared is four.', show: 'm.1', focus: 'm.1' },
        { say: 'Take the square root: the scale factor is two. Every length doubled, and the area grew four times.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A rectangle with an area of $12\\text{ m}^2$ is dilated by a scale factor of $3$. What is the area of the image?',
          choices: ['$36\\text{ m}^2$', '$144\\text{ m}^2$', '$108\\text{ m}^2$', '$24\\text{ m}^2$'],
          answer: 2,
          working: 'Area is multiplied by $k^2 = 3^2 = 9$: $9 \\times 12 = 108\\text{ m}^2$.',
        },
      ],
      lines: [
        { say: 'Your turn. A rectangle with an area of twelve square metres is dilated by a scale factor of three. What is the area of the image? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, 108 square metres. The area is multiplied by three squared, which is nine, and nine times twelve is 108. Choice A, 36, multiplies the area by three instead of by nine.', show: 'q.answer' },
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
            'Lengths and the perimeter are multiplied by $k$.',
            'Area is multiplied by $k^2$, because it uses two lengths.',
            'From two areas: $k^2 = \\text{image area} \\div \\text{original area}$, then take the square root.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A dilation multiplies every length, and so the perimeter, by the scale factor k.', show: 'sum.0' },
        { say: 'It multiplies the area by k squared, because area uses two lengths.', show: 'sum.1' },
        { say: 'And from two areas, divide to get k squared, then take the square root to find k. In the next part, we use scale drawings and scale models. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
