import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { valueTable } from './lib/m303-5-graphs.ts';

// Concrete prices: $175 a cubic metre plus $120, from 2 to 6 m³, then carried on to 9 m³.
const concrete = () =>
  figure('t', [
    valueTable({
      x: { title: '\\text{Concrete (m}^3\\text{)}', values: [2, 3, 4, 5, 6] },
      y: { title: '\\text{Cost (\\$)}', values: [470, 645, 820, 995, 1170] },
      dx: Array(4).fill('+1'),
      dy: Array(4).fill('+175'),
      titleW: 3.8,
    }),
  ]);
const further = () =>
  figure('u', [
    valueTable({
      x: { title: '\\text{Concrete (m}^3\\text{)}', values: [6, 7, 8, 9] },
      y: { title: '\\text{Cost (\\$)}', values: [1170, 1345, 1520, 1695] },
      dx: Array(3).fill('+1'),
      dy: Array(3).fill('+175'),
      titleW: 3.8,
      extra: 3,
    }),
  ]);

const video: Explainer = {
  id: 'm303-5-3-b',
  lessonId: 'm303-5-3',
  title: 'Interpolating and Extrapolating, Part 2: Extrapolating with the Rate or the Equation',
  thumbnailTitle: 'Extrapolating with the Rate',
  thumbnail: 't',
  summary: 'Extrapolating beyond a table by adding the rate of change ($175 a cubic metre takes a $1,170 order for 6 m³ to $1,695 for 9 m³) or with the equation C = 175v + 120; finding when a 400 L tank burning 18 L an hour runs dry (about 22.2 hours); and rounding to fit the situation: down for a budget, up to reach a goal.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Linear Relations · Part 2', title: 'Extrapolating with the Rate', subtitle: 'Going beyond the table' }],
      lines: [
        { say: 'A price list only goes so far. What does a bigger order cost? When will a tank run dry? How many hours can you afford?', show: 'title' },
        { say: 'In this video, you will extrapolate beyond the data with the rate of change and with an equation, and round each answer to fit the situation.' },
      ],
    },
    {
      chapter: 'A bigger concrete order',
      layout: 'center',
      main: [concrete()],
      lines: [
        { say: 'A contractor has these prices for ready-mixed concrete, from two to six cubic metres. Predict the cost of nine cubic metres.', show: ['t.frame', 't.xs', 't.ys'] },
        { say: 'First find the pattern. Each extra cubic metre adds 175 dollars to the cost, every time.', show: ['t.dxs', 't.dys'], focus: 't.dys' },
        { say: 'Nine cubic metres is beyond the table, so this is extrapolation. The simplest way is to keep adding the rate of change.' },
      ],
    },
    {
      chapter: 'Keep adding the rate',
      layout: 'center',
      main: [further(), { kind: 'math', id: 'm', size: 'md', lines: ['1170 + 3 \\times 175 = 1170 + 525 = 1695'] }],
      lines: [
        { say: 'Start from the last column of the table: six cubic metres for 1,170 dollars.', show: ['u.frame', 'u.xs', 'u.ys'] },
        { say: 'Keep adding 175 dollars. Seven cubic metres costs 1,345 dollars, eight costs 1,520, and nine costs 1,695.', show: 'u.more', focus: 'u.more' },
        { say: 'Or do it in one step. From six to nine is three more cubic metres. So add three times 175, which is 525, to 1,170. That is 1,695 dollars.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Check with the equation',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['b = 470 - 2 \\times 175 = 120', 'C = 175v + 120', 'C = 175(9) + 120 = 1575 + 120 = 1695'] },
        { kind: 'text', id: 'a', size: 'md', md: 'If the pricing stays the same, $9\\ \\text{m}^3$ costs \\$1,695. This is extrapolation.' },
      ],
      lines: [
        { say: 'You can also check with the equation. The rate is 175 dollars per cubic metre. To find the initial value, work back from two cubic metres: 470 minus two times 175 is 120.', show: 'm.0', focus: 'm.0' },
        { say: 'So the cost is C equals 175 v, plus 120, where v is the volume in cubic metres.', show: 'm.1', focus: 'm.1' },
        { say: 'For nine cubic metres: 175 times nine is 1,575, plus 120 is 1,695 dollars. The same answer.', show: 'm.2', focus: 'm.2' },
        { say: 'Nine cubic metres is beyond the data, so this is extrapolation. It is a good prediction only if the pricing stays the same for a bigger order.', show: 'a' },
      ],
    },
    {
      chapter: 'When will it run dry?',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'A tractor starts with $400$ L of diesel and burns $18$ L an hour, so $V = 400 - 18h$. When is the tank empty?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['0 = 400 - 18h', '18h = 400', 'h = 400 \\div 18 \\approx 22.2 \\text{ hours}'] },
      ],
      lines: [
        { say: 'You can also extrapolate to find when something happens. A tractor starts with 400 litres of diesel and burns eighteen litres an hour, so the diesel left is V equals 400 minus eighteen h.', show: 'q' },
        { say: 'The tank is empty when V is zero. So set V equal to zero.', show: 'm.0', focus: 'm.0' },
        { say: 'Add eighteen h to both sides: eighteen h equals 400.', show: 'm.1', focus: 'm.1' },
        { say: 'Divide by eighteen: h is about 22.2 hours. If the tractor keeps working the same way, the tank runs dry after about 22.2 hours.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Rounding for a budget',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'A rental costs $C = 45h + 60$ dollars for $h$ hours. You have \\$300. How many hours can you afford?' },
        { kind: 'math', id: 'm', size: 'md', lines: ['300 = 45h + 60 \\quad\\Rightarrow\\quad 240 = 45h', 'h = 240 \\div 45 \\approx 5.3', '5 \\text{ h: } 45(5) + 60 = 285 \\qquad 6 \\text{ h: } 45(6) + 60 = 330'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Round to fit the situation', md: 'For a budget, round **down**: you can afford only $5$ whole hours.' },
      ],
      lines: [
        { say: 'An answer often needs rounding, and the situation tells you which way. A rental costs C equals 45 h, plus 60 dollars. You have 300 dollars. How many hours can you afford?', show: 'q' },
        { say: 'Set C equal to 300 and solve. Subtract 60: 240 equals 45 h. Divide by 45: h is about 5.3.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Think about what the hours cost. Five hours costs 285 dollars, which you can afford. Six hours costs 330 dollars, which is over your budget.', show: 'm.2', focus: 'm.2' },
        { say: 'So for a budget, round down. You can afford five whole hours. Even if the answer had been 5.9, you could still afford only five.', show: 'tip' },
      ],
    },
    {
      chapter: 'Rounding for a goal',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'A driver earns $P = 1.50n + 90$ dollars for $n$ packages. How many packages must the driver deliver to earn **at least** \\$250?' },
        { kind: 'math', id: 'm', size: 'md', lines: ['250 = 1.50n + 90 \\quad\\Rightarrow\\quad 160 = 1.50n', 'n = 160 \\div 1.50 \\approx 106.7', '\\text{106: } 1.50(106) + 90 = 249 \\qquad \\text{107: } 1.50(107) + 90 = 250.50'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Round to fit the situation', md: 'To reach a goal, round **up**: the driver needs $107$ packages.' },
      ],
      lines: [
        { say: 'Now a goal. A driver earns P equals 1.50 n, plus 90 dollars for n packages. How many packages must the driver deliver to earn at least 250 dollars?', show: 'q' },
        { say: 'Set P equal to 250. Subtract 90: 160 equals 1.50 n. Divide by 1.50: n is about 106.7.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Check the whole numbers on either side. 106 packages earn only 249 dollars, just short of the goal. 107 packages earn 250 dollars and 50 cents.', show: 'm.2', focus: 'm.2' },
        { say: 'So to reach a goal, round up. The driver needs 107 packages. Even if the answer had been 106.1, the driver would still need 107.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A print shop charges $C = 0.12p + 15$ dollars for $p$ pages. You have \\$40. How many pages can you print?',
          choices: ['$208$ pages', '$209$ pages', '$333$ pages', '$125$ pages'],
          answer: 0,
          working: '$40 = 0.12p + 15$, so $25 = 0.12p$ and $p \\approx 208.3$. A budget means rounding down: $208$ pages cost \\$39.96, but $209$ pages cost \\$40.08.',
        },
      ],
      lines: [
        { say: 'Your turn. A print shop charges C equals 0.12 p, plus 15 dollars, for p pages. You have 40 dollars. How many pages can you print? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Forty minus 15 leaves 25 dollars for pages, and 25 divided by 0.12 is about 208.3. You cannot print part of a page, and 209 pages would cost 40 dollars and 8 cents, so round down to 208. Choice B rounds up, which goes over the budget.', show: 'q.answer' },
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
          items: ['Extrapolate by adding the rate of change, or with the equation.', 'For “when”, set $y$ to the target and solve.', 'Round to fit: **down** for a budget, **up** to reach a goal.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To go beyond the data, keep adding the rate of change, or use the equation.', show: 'sum.0' },
        { say: 'To find when something happens, set y equal to the target and solve for x.', show: 'sum.1' },
        { say: 'And round to fit the situation: down for a budget, and up to reach a goal. In the next part, we estimate from real data with a line of best fit. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
