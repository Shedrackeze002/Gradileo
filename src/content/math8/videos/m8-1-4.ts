import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { rectangle } from '@/video/triangles.ts';

// A TV screen 43.6 in wide with a 50 in diagonal, drawn to scale: about 24.5 in tall.
const tv = figure('tv', [rectangle({ w: 43.6, h: Math.sqrt(599.04), labels: { w: '43.6 \\text{ in}', h: 'h', d: '50 \\text{ in}' } })], 380);

const video: Explainer = {
  id: 'm8-1-4',
  lessonId: 'm8-1-4',
  title: 'Using the Pythagorean Theorem, Part 1: Ladders and Screens',
  thumbnailTitle: 'Ladders and Screens',
  thumbnail: 'lad',
  summary:
    'A plan for problems: sketch and mark the right angle, label the sides, decide whether the unknown is the hypotenuse or a leg, then use a² + b² = c² and check. A 5 m ladder with its foot 1.4 m from a wall reaches h² = 25 − 1.96 = 23.04, so h = 4.8 m up the wall. A TV screen with a 50 in diagonal and a width of 43.6 in has h² = 2,500 − 1,900.96 = 599.04, so it is about 24.5 in tall.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Squares, Square Roots and the Pythagorean Theorem · Part 1', title: 'Ladders and Screens', subtitle: 'A plan for problems' }],
      lines: [
        { say: 'Ladders, ramps, TV screens and sports fields all hide right triangles. Once you spot the right triangle, the Pythagorean theorem finds the missing length.', show: 'title' },
        { say: 'In this lesson, you will use the theorem to solve problems. This first part follows a plan to solve a ladder problem and a TV screen problem.' },
      ],
    },
    {
      chapter: 'A plan for problems',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**1.** Sketch the situation and mark the right angle.',
            '**2.** Label the sides you know and the side you want.',
            '**3.** Decide: is the unknown side the **hypotenuse** or a **leg**?',
            '**4.** Use $a^2 + b^2 = c^2$, then check that your answer makes sense.',
          ],
        },
      ],
      lines: [
        { say: 'Here is a plan for any problem like this. One: sketch the situation, and mark the right angle. It is often where a wall meets the ground, or at the corner of a rectangle.', show: 'b.0' },
        { say: 'Two: label the sides you know, and the side you want to find.', show: 'b.1' },
        { say: 'Three: decide whether the unknown side is the hypotenuse, across from the right angle, or a leg.', show: 'b.2' },
        { say: 'Four: use the Pythagorean theorem. Add the squares for the hypotenuse, or subtract them for a leg. Then check that your answer makes sense.', show: 'b.3' },
      ],
    },
    {
      chapter: 'A ladder against a wall',
      layout: 'split',
      leftWidth: 420,
      left: [{ kind: 'triangle', id: 'lad', adj: 1.4, opp: 4.8, setting: 'ladder', labels: { hyp: '5 \\text{ m}', adj: '1.4 \\text{ m}', opp: 'h' } }],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A $5\\ \\text{m}$ ladder leans against a wall. Its foot is $1.4\\ \\text{m}$ from the wall. How high up the wall does it reach?' },
        { kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['h^2 = 5^2 - 1.4^2', 'h^2 = 25 - 1.96 = 23.04', 'h = \\sqrt{23.04} = 4.8'] },
        { kind: 'text', id: 'a', size: 'md', md: 'The ladder reaches $4.8\\ \\text{m}$ up the wall.' },
      ],
      lines: [
        { say: 'A five metre ladder leans against a wall. The foot of the ladder is one point four metres from the wall. How high up the wall does the ladder reach?', show: ['q', 'lad.shape', 'lad.hyp', 'lad.adj'] },
        { say: 'Sketch it. The wall and the ground meet at a right angle. The ladder is across from it, so the ladder is the hypotenuse. The height, h, is a leg.', show: 'lad.opp', focus: ['lad.hyp', 'lad.opp'] },
        { say: 'For a leg, subtract: h squared is five squared minus one point four squared.', show: 'm.0', focus: 'm.0' },
        { say: 'That is twenty-five minus one point nine six, which is twenty-three point zero four.', show: 'm.1', focus: 'm.1' },
        { say: 'The square root of twenty-three point zero four is exactly four point eight. The ladder reaches four point eight metres up the wall.', show: ['m.2', 'a'], focus: 'm.2' },
        { say: 'Does it make sense? The height is a little less than the ladder’s length of five metres. Yes, it does.' },
      ],
    },
    {
      chapter: 'A TV screen',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'A TV screen has a $50\\ \\text{in}$ diagonal and is $43.6\\ \\text{in}$ wide. How tall is it, to the nearest tenth of an inch?' },
        tv,
      ],
      lines: [
        { say: 'TV sizes are measured along the diagonal of the screen. A TV screen has a fifty-inch diagonal, and it is forty-three point six inches wide. How tall is it, to the nearest tenth of an inch?', show: ['q', 'tv.shape'] },
        { say: 'The width, the height and the diagonal make a right triangle. The right angle is at the corner of the screen.', show: ['tv.right', 'tv.w', 'tv.h'], focus: 'tv.right' },
        { say: 'The diagonal is across from that right angle, so it is the hypotenuse. The height, h, is a leg.', show: 'tv.d', focus: ['tv.d', 'tv.h'] },
      ],
    },
    {
      chapter: 'Finding the height',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['h^2 = 50^2 - 43.6^2', 'h^2 = 2{,}500 - 1{,}900.96 = 599.04', 'h = \\sqrt{599.04} \\approx 24.48'] },
        { kind: 'text', id: 'a', size: 'md', align: 'center', md: 'The screen is about $24.5\\ \\text{in}$ tall.' },
      ],
      lines: [
        { say: 'For a leg, subtract: h squared is fifty squared minus forty-three point six squared.', show: 'm.0', focus: 'm.0' },
        { say: 'Fifty squared is two thousand five hundred. Forty-three point six squared is one thousand nine hundred point nine six. The difference is five hundred ninety-nine point zero four.', show: 'm.1', focus: 'm.1' },
        { say: 'Its square root is about twenty-four point four eight.', show: 'm.2', focus: 'm.2' },
        { say: 'Rounded to the nearest tenth, the screen is about twenty-four point five inches tall. That is shorter than the width and the diagonal, so it makes sense.', show: 'a' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A kite string is $25\\ \\text{m}$ long and pulled straight. The kite is straight above a point on the ground $7\\ \\text{m}$ from where the string is tied down. How high is the kite?',
          choices: ['$24\\ \\text{m}$', '$26\\ \\text{m}$', '$18\\ \\text{m}$', '$32\\ \\text{m}$'],
          answer: 0,
          working: 'The string is the hypotenuse and the height is a leg: $h^2 = 25^2 - 7^2 = 625 - 49 = 576$, so $h = \\sqrt{576} = 24\\ \\text{m}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A kite string is twenty-five metres long and pulled straight. The kite is straight above a point on the ground seven metres from where the string is tied down. How high is the kite? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, twenty-four metres. The string is the hypotenuse, so subtract: six hundred twenty-five minus forty-nine is five hundred seventy-six, and its square root is twenty-four. Choice B adds the squares, which makes the height longer than the string.', show: 'q.answer' },
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
            'Sketch, mark the right angle, and label what you know and what you want.',
            'Decide: hypotenuse (**add** the squares) or leg (**subtract**).',
            'A ladder is the hypotenuse; so is the diagonal of a screen.',
            'Check that your answer makes sense.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Sketch the situation, mark the right angle, and label what you know and what you want.', show: 'sum.0' },
        { say: 'Decide whether you want the hypotenuse, which means adding the squares, or a leg, which means subtracting.', show: 'sum.1' },
        { say: 'A leaning ladder and the diagonal of a screen are both hypotenuses.', show: 'sum.2' },
        { say: 'And always check that your answer makes sense. In the next part, you will find distances between points on a grid. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
