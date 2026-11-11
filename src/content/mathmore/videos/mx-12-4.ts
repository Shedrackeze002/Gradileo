import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { block, force, segment } from './lib/mx-mechanics.ts';

const video: Explainer = {
  id: 'mx-12-4',
  lessonId: 'mx-12-4',
  title: 'Forces and Newton’s Laws',
  thumbnail: 'car',
  summary: 'Newton’s second law says the resultant force equals mass times acceleration, F = ma. A 1200 kg car with a 3000 N driving force and 600 N resistance accelerates at 2 m/s². With vectors, add the forces component by component: (3i + 4j) N and (5i − 2j) N on 2 kg give a = 4i + j. A 70 kg man in a lift accelerating upwards at 1.2 m/s² feels a reaction of 770 N.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Mechanics: Kinematics and Forces', title: 'Forces and Newton’s Laws', subtitle: 'What makes things accelerate' }],
      lines: [
        { say: 'The suvat formulas describe how things move, but they do not say why. Newton’s laws connect motion to its cause.', show: 'title' },
        { say: 'In this video, you will meet Newton’s three laws, use F equals m "a" for a car and for forces written as vectors, and find out why you feel heavier in a lift going up.' },
      ],
    },
    {
      chapter: 'Newton’s three laws',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Resultant force', md: 'The single force that has the same effect as all the forces on an object together.' },
        { kind: 'bullets', id: 'laws', items: ['**First law:** with no resultant force, an object stays at rest or moves at a constant velocity.', '**Second law:** $F = ma$, and the acceleration is in the direction of the resultant force.', '**Third law:** if one object pushes on another, the second pushes back equally and oppositely.'] },
      ],
      lines: [
        { say: 'A force is a push or a pull, measured in newtons. The resultant force on an object is the single force that has the same effect as all the forces on it together.', show: 'def' },
        { say: 'Newton’s first law says that with no resultant force, an object stays at rest, or keeps moving at a constant velocity. It does not need a force to keep moving.', show: 'laws.0', focus: 'laws.0' },
        { say: 'Newton’s second law says the resultant force equals the mass times the acceleration, F equals m "a". The acceleration is in the direction of the resultant force.', show: 'laws.1', focus: 'laws.1' },
        { say: 'Newton’s third law says that when one object pushes on another, the second pushes back with an equal and opposite force.', show: 'laws.2', focus: 'laws.2' },
      ],
    },
    {
      chapter: 'A car on a level road',
      layout: 'split',
      leftWidth: 620,
      left: [
        figure('car', [
          segment('road', [-4, 0], [4, 0], { tone: 'muted' }),
          block('body', [0, 0], 3, 1.4, { tex: '1200\\text{ kg}' }),
          force('drive', [1.5, 0.7], 0, 1.8, '3000', { tone: 'good' }),
          force('res', [-1.5, 0.7], 180, 1.4, '600'),
          force('w', [0, 0], -90, 1.4, 'mg', { tone: 'muted' }),
          force('r', [0, 1.4], 90, 1.4, 'R', { tone: 'muted' }),
        ], 420),
      ],
      right: [
        { kind: 'math', id: 'm', size: 'md', lines: ['F = 3000 - 600 = 2400', '2400 = 1200a', 'a = 2\\text{ m/s}^2'] },
      ],
      lines: [
        { say: 'A car of mass one thousand two hundred kilograms has a driving force of three thousand newtons, and moves against a resistance of six hundred newtons. Find its acceleration.', caption: 'A car of mass 1,200 kilograms has a driving force of 3,000 newtons, and moves against a resistance of 600 newtons. Find its acceleration.', show: ['car.road', 'car.body', 'car.drive', 'car.res'] },
        { say: 'The car’s weight acts down and the road pushes up with a normal reaction. The car does not move up or down, so these two cancel.', show: ['car.w', 'car.r'], focus: ['car.w', 'car.r'] },
        { say: 'Forwards, the resultant force is three thousand minus six hundred, which is two thousand four hundred newtons.', caption: 'Forwards, the resultant force is 3,000 minus 600, which is 2,400 newtons.', show: 'm.0', focus: 'm.0' },
        { say: 'F equals m "a" gives two thousand four hundred equals one thousand two hundred times "a", so the acceleration is two metres per second per second.', caption: 'F = ma gives 2,400 = 1,200a, so the acceleration is 2 metres per second per second.', show: ['m.1', 'm.2'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Forces as vectors',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Forces $(3\\mathbf{i} + 4\\mathbf{j})$ N and $(5\\mathbf{i} - 2\\mathbf{j})$ N act on a particle of mass $2$ kg. Find its acceleration.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\mathbf{F} = 8\\mathbf{i} + 2\\mathbf{j}', '\\mathbf{a} = \\tfrac{1}{2}(8\\mathbf{i} + 2\\mathbf{j}) = 4\\mathbf{i} + \\mathbf{j}', '|\\mathbf{a}| = \\sqrt{4^2 + 1^2} = \\sqrt{17} \\approx 4.12\\text{ m/s}^2'] },
      ],
      lines: [
        { say: 'Forces are vectors, so the second law works with vectors too. Two forces act on a particle of mass two kilograms: three i plus four j, and five i minus two j newtons.', show: 'q' },
        { say: 'Add them component by component. The resultant is eight i plus two j newtons.', show: 'm.0', focus: 'm.0' },
        { say: 'Divide by the mass: the acceleration is four i plus j metres per second per second.', show: 'm.1', focus: 'm.1' },
        { say: 'Its magnitude, by Pythagoras’ theorem, is the square root of seventeen, about four point one two metres per second per second.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'In a lift',
      layout: 'split',
      leftWidth: 480,
      left: [
        figure('lift', [
          segment('floor', [-2, 0], [2, 0], { tone: 'muted' }),
          block('man', [0, 0], 1.7, 2.2, { tex: '70\\text{ kg}' }),
          force('r', [0, 2.2], 90, 1.5, 'R', { tone: 'good' }),
          force('w', [0, 0], -90, 1.5, '70g'),
          force('acc', [1.6, 0.6], 90, 1.2, '1.2\\text{ m/s}^2', { tone: 'theta', place: 'right' }),
        ], 460),
      ],
      right: [
        { kind: 'math', id: 'm', size: 'md', lines: ['R - 70(9.8) = 70(1.2)', 'R = 70 \\times 11', '= 770\\text{ N}', '\\text{Weight: } 686\\text{ N}'] },
        { kind: 'callout', id: 'mis', tone: 'mistake', title: 'The reaction is not always the weight', md: 'Up: $R = m(g + a)$. Down: $R = m(g - a)$.' },
      ],
      lines: [
        { say: 'A man of mass seventy kilograms stands in a lift that is accelerating upwards at one point two metres per second per second. Find the reaction of the floor on him.', show: ['lift.floor', 'lift.man', 'lift.acc'] },
        { say: 'Look only at the man. The floor pushes him up with a reaction R, and his weight, seventy g, pulls him down.', show: ['lift.r', 'lift.w'], focus: ['lift.r', 'lift.w'] },
        { say: 'He accelerates upwards, so the resultant force is upwards: R minus seventy times nine point eight equals seventy times one point two.', show: 'm.0', focus: 'm.0' },
        { say: 'So R is seventy times eleven, which is seven hundred seventy newtons. That is more than his weight of six hundred eighty six newtons, so he feels heavier.', show: ['m.1', 'm.2', 'm.3'], focus: 'm.2' },
        { say: 'The reaction equals the weight only when there is no acceleration. Accelerating upwards, it is m times g plus "a"; accelerating downwards, it is m times g minus "a".', show: 'mis' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A box of mass $5$ kg is pulled along the floor by a horizontal force of $20$ N against a resistance of $5$ N. Find its acceleration.',
          choices: ['$3$ m/s²', '$4$ m/s²', '$5$ m/s²', '$75$ m/s²'],
          answer: 0,
          working: 'Resultant force $= 20 - 5 = 15$ N, and $15 = 5a$, so $a = 3$ m/s².',
        },
      ],
      lines: [
        { say: 'Your turn. A box of mass five kilograms is pulled along the floor by a horizontal force of twenty newtons, against a resistance of five newtons. Find its acceleration. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The resultant force is twenty minus five, which is fifteen newtons. Fifteen equals five times "a", so "a" is three metres per second per second. Choice B ignores the resistance.', show: 'q.answer' },
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
          items: ['A resultant force causes an acceleration: $F = ma$.', 'With no resultant force, the velocity does not change.', 'With vectors, add the forces component by component.', 'In a lift, $R = m(g + a)$ going up and $m(g - a)$ going down.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A resultant force causes an acceleration, and F equals m "a".', show: 'sum.0' },
        { say: 'With no resultant force, an object stays at rest or keeps a constant velocity.', show: 'sum.1' },
        { say: 'With vectors, add the forces component by component, then divide by the mass.', show: 'sum.2' },
        { say: 'And in a lift accelerating upwards, the reaction is bigger than the weight. In the next lesson, we look at objects joined together: connected particles and pulleys. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
