import type { Explainer } from '@/video/script.ts';
import { dots, plane, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { poly } from './lib/mx-figures.ts';

const g = plane({ x: [0, 7], y: [0, 16], xStep: 1, yStep: 2, width: 8, height: 5.5, titles: { x: 't\\text{ (s)}', y: 'v\\text{ (m/s)}' } });
const sx = 8 / 7;
const sy = 5.5 / 16;

const video: Explainer = {
  id: 'mx-12-2',
  lessonId: 'mx-12-2',
  title: 'The Constant Acceleration Formulae',
  thumbnail: 'gr',
  summary: 'With constant acceleration, five quantities describe a motion: s, u, v, a and t, and five formulas (suvat) link them. Write down the three you know and the one you want, and use the formula without the fifth. A car at 4 m/s accelerating at 2 m/s² for 5 s travels 45 m, and a cyclist braking from 20 m/s to rest in 50 m has a = −4 m/s².',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Mechanics: Kinematics and Forces', title: 'The Constant Acceleration Formulae', subtitle: 'Five quantities, five formulas' }],
      lines: [
        { say: 'When something speeds up or slows down at a steady rate, its motion along a straight line follows five simple formulas.', show: 'title' },
        { say: 'In this video, you will see where the formulas come from, and the one trick that tells you which formula to use every time.' },
      ],
    },
    {
      chapter: 'The five quantities',
      layout: 'split',
      leftWidth: 600,
      left: [
        figure('gr', [g, poly('area', [[0, 0], [0, 4 * sy], [5 * sx, 14 * sy], [5 * sx, 0]], 'adj'), polyline(g, { id: 'v', points: [[0, 4], [5, 14]] }), dots(g, [{ id: 'u', x: 0, y: 4, tex: 'u', place: 'left' }, { id: 'vv', x: 5, y: 14, tex: 'v', place: 'above' }])], 500),
      ],
      right: [
        {
          kind: 'table',
          id: 't',
          head: ['Letter', 'Meaning', 'Unit'],
          rows: [
            ['$s$', 'displacement', 'm'],
            ['$u$', 'initial velocity', 'm/s'],
            ['$v$', 'final velocity', 'm/s'],
            ['$a$', 'acceleration', 'm/s²'],
            ['$t$', 'time', 's'],
          ],
        },
      ],
      lines: [
        { say: 'An object has constant acceleration when its velocity changes by the same amount every second. Five quantities describe its motion, and their letters spell suvat.', show: 't.0', focus: 't.0' },
        { say: 's is the displacement: how far the object is from where it started, with a direction. u is the velocity at the start, and v is the velocity at the end.', show: ['t.1', 't.2'], focus: ['t.0', 't.1', 't.2'] },
        { say: '"a" is the acceleration, which is negative when the object slows down, and t is the time taken.', show: ['t.3', 't.4'], focus: ['t.3', 't.4'] },
        { say: 'On a velocity–time graph, constant acceleration is a straight line, here from u equals four up to v equals fourteen, over five seconds.', show: ['gr.grid', 'gr.axes', 'gr.v', 'gr.u', 'gr.vv'] },
        { say: 'The gradient of that line is the acceleration, and the area under it is the displacement.', show: 'gr.area', focus: 'gr.area' },
      ],
    },
    {
      chapter: 'The formulas',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['v = u + at', 's = \\tfrac{1}{2}(u + v)t', 's = ut + \\tfrac{1}{2}at^2', 's = vt - \\tfrac{1}{2}at^2', 'v^2 = u^2 + 2as'] },
      ],
      lines: [
        { say: 'The gradient is the change in velocity over the time, so "a" equals v minus u, over t. Rearranging gives our first formula: v equals u plus "a" t.', show: 'm.0', focus: 'm.0' },
        { say: 'The area under the graph is a trapezium, so s equals one half of u plus v, times t.', show: 'm.1', focus: 'm.1' },
        { say: 'Taking one letter out at a time from those two gives three more. s equals u t plus a half "a" t squared.', show: 'm.2', focus: 'm.2' },
        { say: 's equals v t minus a half "a" t squared.', show: 'm.3', focus: 'm.3' },
        { say: 'And v squared equals u squared plus two "a" s. Look closely: each formula leaves out exactly one of the five letters.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Choosing the formula',
      layout: 'split',
      leftWidth: 620,
      left: [
        { kind: 'text', id: 'q', md: 'A car moving at $4$ m/s accelerates at $2$ m/s² for $5$ s. How far does it travel?' },
        { kind: 'math', id: 'm', size: 'md', lines: ['u = 4,\\ a = 2,\\ t = 5,\\ s = \\,?', 's = ut + \\tfrac{1}{2}at^2', '= 4(5) + \\tfrac{1}{2}(2)(5^2)', '= 20 + 25 = 45\\text{ m}'] },
      ],
      right: [
        { kind: 'callout', id: 'tip', tone: 'key', title: 'Leave out the fifth letter', md: 'Write the three you know and the one you want. Use the formula **without** the letter you neither know nor want.' },
      ],
      lines: [
        { say: 'Here is the trick. Write down the three letters you know and the one you want. The fifth letter is missing from exactly one formula, and that is the formula to use.', show: 'tip' },
        { say: 'A car moving at four metres per second accelerates at two metres per second per second for five seconds. How far does it travel?', show: 'q' },
        { say: 'We know u, "a" and t, and we want s. We neither know nor want v.', show: 'm.0', focus: 'm.0' },
        { say: 'The formula without v is s equals u t plus a half "a" t squared.', show: 'm.1', focus: 'm.1' },
        { say: 'That is four times five, plus a half of two times twenty five, which is twenty plus twenty five. The car travels forty five metres.', show: ['m.2', 'm.3'], focus: 'm.3' },
      ],
    },
    {
      chapter: 'Slowing down',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A cyclist moving at $20$ m/s brakes steadily and stops in $50$ m. Find the acceleration.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['u = 20,\\ v = 0,\\ s = 50,\\ a = \\,?', 'v^2 = u^2 + 2as', '0 = 400 + 100a', 'a = {-4}\\text{ m/s}^2'] },
      ],
      lines: [
        { say: 'A cyclist moving at twenty metres per second brakes steadily and stops in fifty metres. Find the acceleration.', show: 'q' },
        { say: 'Stopping means the final velocity is zero. So u is twenty, v is zero, s is fifty, and we want "a". The time is not needed.', show: 'm.0', focus: 'm.0' },
        { say: 'The formula without t is v squared equals u squared plus two "a" s, so zero equals four hundred plus one hundred "a".', show: ['m.1', 'm.2'], focus: 'm.2' },
        { say: 'So "a" is negative four. The minus sign tells us the acceleration acts against the motion: a deceleration of four metres per second per second.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Two vehicles',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A lorry passes $O$ at a steady $15$ m/s. At that moment a car starts from rest at $O$ with acceleration $2$ m/s². When does the car catch the lorry?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{Lorry: } 15t \\qquad \\text{Car: } \\tfrac{1}{2}(2)t^2 = t^2', 't^2 = 15t \\;\\Rightarrow\\; t(t - 15) = 0', 't = 15\\text{ s}, \\quad 15 \\times 15 = 225\\text{ m}'] },
      ],
      lines: [
        { say: 'Some problems have two objects. A lorry passes a point O at a steady fifteen metres per second. At that moment, a car starts from rest at O and accelerates at two metres per second per second. When does the car catch the lorry?', show: 'q' },
        { say: 'After t seconds the lorry has gone fifteen t metres. The car starts with u equal to zero, so it has gone a half times two times t squared, which is t squared.', show: 'm.0', focus: 'm.0' },
        { say: 'They meet when the distances are equal: t squared equals fifteen t. Factorising gives t times t minus fifteen equals zero.', show: 'm.1', focus: 'm.1' },
        { say: 't equals zero is the start, so the car catches the lorry after fifteen seconds, two hundred twenty five metres from O.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A train speeds up steadily from $10$ m/s to $30$ m/s over $400$ m. Find its acceleration.',
          choices: ['$0.05$ m/s²', '$2$ m/s²', '$1$ m/s²', '$0.5$ m/s²'],
          answer: 2,
          working: '$v^2 = u^2 + 2as$: $900 = 100 + 800a$, so $a = 1$ m/s².',
        },
      ],
      lines: [
        { say: 'Your turn. A train speeds up steadily from ten metres per second to thirty metres per second over four hundred metres. Find its acceleration. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. We know u, v and s, and the time is not needed, so use v squared equals u squared plus two "a" s. Nine hundred equals one hundred plus eight hundred "a", so "a" is one metre per second per second.', show: 'q.answer' },
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
          items: ['The suvat formulas hold only for constant acceleration.', 'Use the formula without the letter you neither know nor want.', 'Choose a positive direction: slowing down makes $a$ negative.', 'The area under a velocity–time graph is the displacement.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The suvat formulas hold only when the acceleration is constant.', show: 'sum.0' },
        { say: 'List the three letters you know and the one you want, and use the formula without the fifth.', show: 'sum.1' },
        { say: 'Choose a positive direction first. An object slowing down has a negative acceleration.', show: 'sum.2' },
        { say: 'And the area under a velocity–time graph is the displacement. In the next lesson, we use these formulas for objects moving up and down under gravity. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
