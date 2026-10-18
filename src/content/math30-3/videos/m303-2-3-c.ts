import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { elevationFigure, turnFigure } from './lib/m303-2-figures.ts';

// A survey boat: 9 km from the dock D to T, a 50° turn to the right, then 5 km to E. DE ≈ 12.8 km.
const boat = (id: string, gap: boolean) =>
  figure(
    id,
    [
      turnFigure({
        legs: [9, 5],
        turn: 50,
        names: ['D', 'T', 'E'],
        labels: { leg1: '9\\text{ km}', leg2: '5\\text{ km}', turn: '50^\\circ', inside: '130^\\circ', ...(gap ? { gap: '?' } : {}) },
      }),
    ],
    380,
  );

// From A the top of a tower is at 28°; 40 m closer, at B, it is at 47°. h ≈ 42.2 m.
const tower = () =>
  figure('tower', [
    elevationFigure({
      d: 40,
      far: 28,
      near: 47,
      names: ['A', 'B', 'T'],
      labels: { d: '40\\text{ m}', far: '28^\\circ', near: '47^\\circ', inside: '133^\\circ', top: '19^\\circ', h: 'h' },
    }),
  ]);

const video: Explainer = {
  id: 'm303-2-3-c',
  lessonId: 'm303-2-3',
  title: 'Solving Problems with Oblique Triangles, Part 3: Turns and Angles of Elevation',
  thumbnailTitle: 'Turns and Angles of Elevation',
  thumbnail: 'tower',
  summary: 'Angles given outside the triangle: a turn is measured from straight ahead, so a survey boat that goes 9 km, turns 50° and goes 5 km has an inside angle of 130° and ends about 12.8 km from its dock; and the height of a tower from angles of elevation of 28° and 47°, 40 m apart (the sine law, then a right triangle: about 42.2 m).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Oblique Triangles · Part 3', title: 'Turns and Angles of Elevation', subtitle: 'When the angle is outside the triangle' }],
      lines: [
        { say: 'Sometimes the angle you are given is not inside the triangle. Directions give a turn, and a surveyor measures an angle of elevation from the ground.', show: 'title' },
        { say: 'In this video, you will turn those angles into angles inside the triangle, then find how far a survey boat is from its dock, and the height of a tower you cannot reach.' },
      ],
    },
    {
      chapter: 'Turns',
      layout: 'center',
      main: [
        boat('turn', false),
        { kind: 'callout', id: 'key', tone: 'key', title: 'A turn is measured from straight ahead', md: 'The angle inside the triangle and the turn make a straight line, so the inside angle is $180^\\circ$ minus the turn.' },
      ],
      lines: [
        { say: 'Directions often give a turn, measured from the straight-ahead direction. Picture a boat that travels along this first line, then turns 50 degrees to the right.', show: ['turn.leg1', 'turn.names'] },
        { say: 'The dashed line shows where the boat was heading. The turn, 50 degrees, is the angle between that dashed line and the new path.', show: ['turn.ahead', 'turn.leg2'], focus: 'turn.ahead' },
        { say: 'The angle inside the triangle and the turn together make a straight line, 180 degrees. So the inside angle is 180 minus 50, which is 130 degrees.', show: ['turn.inside', 'key'], focus: 'turn.inside' },
      ],
    },
    {
      chapter: 'A survey boat',
      layout: 'center',
      main: [
        boat('boat', true),
        { kind: 'math', id: 'm', size: 'md', lines: ['DE^2 = 9^2 + 5^2 - 2(9)(5)\\cos 130^\\circ \\approx 81 + 25 + 57.85 = 163.85', 'DE \\approx \\sqrt{163.85} \\approx 12.8\\text{ km}'] },
      ],
      lines: [
        { say: 'A survey boat leaves a dock, D, and travels nine kilometres to point T. It turns 50 degrees to the right, and travels five kilometres to point E. How far is the boat from the dock, to the nearest tenth of a kilometre?', show: ['boat.leg1', 'boat.leg2', 'boat.ahead', 'boat.names', 'boat.gap'] },
        { say: 'First, the inside angle at T: 180 minus 50, which is 130 degrees.', show: 'boat.inside', focus: 'boat.inside' },
        { say: 'Now we know two sides, nine and five kilometres, and the angle between them. That calls for the cosine law: DE squared equals nine squared plus five squared, minus two times nine times five times cosine 130.', show: 'm.0', focus: 'm.0' },
        { say: 'Two times nine times five is 90, and 90 times cosine 130 is about negative 57.85. So DE squared is about 81 plus 25 plus 57.85, which is 163.85.', focus: 'm.0' },
        { say: 'Its square root is about 12.800. The boat is about 12.8 kilometres from the dock.', show: 'm.1', focus: ['m.1', 'boat.gap'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Using the turn as the inside angle', md: 'The turn is outside the triangle. Using $50^\\circ$ in the cosine law gives about $6.9\\text{ km}$, far too short for a path that turned only a little.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{9^2 + 5^2 - 90\\cos 50^\\circ \\approx 48.15, \\text{ so } DE \\approx 6.9}', '\\good{9^2 + 5^2 - 90\\cos 130^\\circ \\approx 163.85, \\text{ so } DE \\approx 12.8}'] },
      ],
      lines: [
        { say: 'The most common mistake is to put the turn, 50 degrees, into the cosine law as if it were the inside angle. That gives DE squared of about 48.15, and about 6.9 kilometres.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'Does that make sense? The boat went nine kilometres, then turned only a little and kept heading away. With no turn at all it would be fourteen kilometres out, so seven is far too close. Always change a turn into the inside angle first.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Angles of elevation',
      layout: 'split',
      leftWidth: 620,
      left: [tower()],
      right: [{ kind: 'callout', id: 'key', tone: 'key', title: 'The angle outside the triangle', md: 'The angle of elevation at the closer point $B$ is outside $\\triangle ABT$, so the angle inside the triangle at $B$ is $180^\\circ$ minus it.' }],
      lines: [
        { say: 'To find the height of a tower you cannot reach, measure the angle of elevation from two points in line with its base. From point A, the angle of elevation of the top is 28 degrees.', show: ['tower.tower', 'tower.ground', 'tower.sight1', 'tower.far', 'tower.nA', 'tower.nT'], focus: 'tower.far' },
        { say: 'Walk forty metres toward the tower, to point B, and the angle of elevation is 47 degrees.', show: ['tower.sight2', 'tower.near', 'tower.nB'], focus: ['tower.near', 'tower.d'] },
        { say: 'Look at triangle ABT, the oblique triangle with the forty metre side. The 47 degree angle at B is outside it.', show: 'key', focus: ['tower.d', 'tower.sight1', 'tower.sight2'] },
        { say: 'The angle inside the triangle at B and the 47 degrees make a straight line. So the inside angle is 180 minus 47, which is 133 degrees.', show: 'tower.inside', focus: 'tower.inside' },
      ],
    },
    {
      chapter: 'The height of the tower',
      layout: 'split',
      leftWidth: 520,
      left: [tower()],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\angle T = 180^\\circ - 28^\\circ - 133^\\circ = 19^\\circ', 'BT = \\dfrac{40\\sin 28^\\circ}{\\sin 19^\\circ} \\approx 57.680', 'h = BT\\sin 47^\\circ \\approx 42.18', 'h \\approx 42.2\\text{ m}'] }],
      lines: [
        { say: 'Now solve it in two steps. In triangle ABT, the angle at B is 133 degrees, so the angle at the top, T, is 180 minus 28 minus 133, which is 19 degrees.', show: ['tower.tower', 'tower.ground', 'tower.sight1', 'tower.sight2', 'tower.far', 'tower.near', 'tower.inside', 'tower.names', 'tower.top', 'm.0'], focus: ['tower.top', 'm.0'] },
        { say: 'The forty metre side, AB, is across from angle T, so they are a matching pair. The side BT is across from angle A, 28 degrees.', focus: ['tower.d', 'tower.top', 'tower.sight2', 'tower.far'] },
        { say: 'By the sine law, BT over sine 28 equals forty over sine 19. So BT equals forty sine 28, over sine 19, which is about 57.680 metres.', show: 'm.1', focus: 'm.1' },
        { say: 'Second step: the right triangle under the tower. BT is its hypotenuse, and the height, h, is opposite the 47 degree angle. So h equals BT sine 47.', show: ['tower.h', 'm.2'], focus: ['tower.h', 'tower.near', 'm.2'] },
        { say: 'Using the full value of BT, h is about 42.18. The tower is about 42.2 metres tall.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A hiker walks $6\\text{ km}$, turns $35^\\circ$ to the left, and walks $4\\text{ km}$. Which equation gives the distance $d$ back to the start?',
          choices: ['$d^2 = 6^2 + 4^2 - 2(6)(4)\\cos 145^\\circ$', '$d^2 = 6^2 + 4^2 - 2(6)(4)\\cos 35^\\circ$', '$d^2 = 6^2 + 4^2$', '$\\dfrac{d}{\\sin 145^\\circ} = \\dfrac{6}{\\sin 35^\\circ}$'],
          answer: 0,
          working: 'The inside angle is $180^\\circ - 35^\\circ = 145^\\circ$, between the two known sides, so use the cosine law: $d \\approx 9.6\\text{ km}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A hiker walks six kilometres, turns 35 degrees to the left, and walks four kilometres. Which equation gives the distance, d, back to the start? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The inside angle is 180 minus 35, which is 145 degrees, and it is between the two known sides, so use the cosine law with cosine 145. Choice B uses the turn itself as the inside angle.', show: 'q.answer' },
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
            'A turn is measured from straight ahead: the inside angle is $180^\\circ$ minus the turn.',
            'An angle of elevation outside the triangle: the inside angle is $180^\\circ$ minus it.',
            'Some problems take two steps: the sine law, then SOH CAH TOA in a right triangle.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A turn is measured from straight ahead, so the angle inside the triangle is 180 minus the turn.', show: 'sum.0' },
        { say: 'An angle of elevation outside the triangle works the same way: the inside angle is 180 minus it.', show: 'sum.1' },
        { say: 'And some problems take two steps, such as the sine law in an oblique triangle, then SOH CAH TOA in a right triangle. Keep full values between the steps. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
