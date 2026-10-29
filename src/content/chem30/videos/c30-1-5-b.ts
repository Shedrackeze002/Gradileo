import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { enthalpyLevels } from './lib/c30-1b-figures.ts';

// Carbon and oxygen to carbon dioxide, straight down or by way of carbon monoxide, to scale:
// 3.9 diagram units for 393.5 kJ.
const k = 3.9 / 393.5;
const TOP = 4.6;
const MID = TOP - 110.5 * k;
const BOT = TOP - 393.5 * k;
const routes = (height: number) =>
  figure(
    'd',
    [
      enthalpyLevels({
        top: 5.9,
        levels: [
          { id: 'top', y: TOP, from: 0.4, to: 9.2, tex: '\\ce{C(s) + O2(g)}' },
          { id: 'mid', y: MID, from: 2.6, to: 9.2, tex: '\\ce{CO(g) + 1/2 O2(g)}' },
          { id: 'bottom', y: BOT, from: 0.4, to: 9.2, tex: '\\ce{CO2(g)}', place: 'below right' },
        ],
        arrows: [
          { id: 'direct', from: [1.4, TOP], to: [1.4, BOT], tex: '-393.5\\ \\text{kJ}', side: 'east' },
          { id: 'step1', from: [8.7, TOP], to: [8.7, MID], tex: '-110.5\\ \\text{kJ}', side: 'east' },
          { id: 'step2', from: [8.7, MID], to: [8.7, BOT], tex: '-283.0\\ \\text{kJ}', side: 'east' },
        ],
        room: [[11.4, 0]],
      }),
    ],
    height,
  );

const video: Explainer = {
  id: 'c30-1-5-b',
  lessonId: 'c30-1-5',
  title: "Hess's Law, Part 2: One Step or Several",
  thumbnailTitle: 'One Step or Several',
  thumbnail: 'd',
  summary:
    "Carbon can burn straight to carbon dioxide (ΔH = −393.5 kJ) or first to carbon monoxide (−110.5 kJ) and then to carbon dioxide (−283.0 kJ); both routes give the same total. Hess's law: the enthalpy change of a reaction is the same in one step or in several, so when equations add up to a target equation, their enthalpy changes add up too. It follows from the conservation of energy.",
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Thermochemical Changes · Part 2', title: 'One Step or Several', subtitle: "Hess's law, and why it must be true" }],
      lines: [
        { say: 'A mountain top can be reached by a steep path or by a long winding one. Either way, the climb is the same height, because height depends only on where you start and where you finish.', show: 'title' },
        { say: "Enthalpy works in the same way. In this part, you will meet Hess's law, and see why it must be true." },
      ],
    },
    {
      chapter: 'Two routes to carbon dioxide',
      layout: 'center',
      main: [routes(430), { kind: 'math', id: 'm', size: 'md', lines: ['(-110.5) + (-283.0) = -393.5\\ \\text{kJ}'] }],
      lines: [
        { say: 'Here are two routes from carbon and oxygen to carbon dioxide, drawn to scale.', show: ['d.axis', 'd.top', 'd.bottom'] },
        { say: 'Carbon can burn straight to carbon dioxide, releasing three hundred ninety-three point five kilojoules.', show: 'd.direct', focus: 'd.direct' },
        {
          say: 'Or carbon can burn first to carbon monoxide, releasing one hundred ten point five kilojoules, and the carbon monoxide can then burn to carbon dioxide, releasing two hundred eighty-three.',
          show: ['d.mid', 'd.step1', 'd.step2'],
          focus: ['d.step1', 'd.step2'],
        },
        { say: 'Both routes start at the same level and finish at the same level, so the two steps must add up to the one-step value. And they do.', show: 'm', focus: ['d.direct', 'd.step1', 'd.step2'] },
      ],
    },
    {
      chapter: "Hess's law",
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: "Hess's law", md: 'The enthalpy change of a reaction is the same whether the reaction takes place in **one step** or in a **series of steps**. If equations add up to a target equation, their enthalpy changes add up to its enthalpy change.' },
        {
          kind: 'table',
          id: 't',
          head: ['', 'Equation', '$\\Delta_r H$ (kJ)'],
          rows: [
            ['step 1', '$\\ce{C(s) + 1/2 O2(g) -> CO(g)}$', '$-110.5$'],
            ['step 2', '$\\ce{CO(g) + 1/2 O2(g) -> CO2(g)}$', '$-283.0$'],
            ['sum', '$\\ce{C(s) + O2(g) -> CO2(g)}$', '$-393.5$'],
          ],
        },
      ],
      lines: [
        { say: "This is Hess's law. The enthalpy change of a reaction is the same whether the reaction takes place in one step, or in a series of steps.", show: 'def' },
        {
          say: 'Here it is with equations: carbon burns to carbon monoxide, which then burns to carbon dioxide.',
          show: ['t.0', 't.1'],
        },
        { say: 'Add the two equations. Carbon monoxide is made and then used up, so it cancels, and the two half moles of oxygen make one mole. What is left is the one-step equation.', show: 't.2', focus: 't.2' },
        { say: 'So when equations add up to a target equation, their enthalpy changes add up as well.', focus: 't' },
      ],
    },
    {
      chapter: 'Why it must be true',
      layout: 'center',
      main: [routes(380), { kind: 'callout', id: 'why', tone: 'key', title: 'Conservation of energy', md: 'Down one route and back up another would make energy from nothing, unless both routes have the same $\\Delta H$.' }],
      lines: [
        { say: 'Why must this be true? Suppose the two routes had different enthalpy changes.', show: 'd' },
        { say: 'You could go down to carbon dioxide by the route that releases more energy, and back up by the route that absorbs less.', focus: ['d.direct', 'd.step1', 'd.step2'] },
        { say: 'You would end where you started, with energy left over. That would make energy from nothing, which never happens.', show: 'why', focus: 'd' },
        { say: "So Hess's law is the law of conservation of energy, applied to chemical reactions." },
      ],
    },
    {
      chapter: 'The target equation',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Target equation', md: 'The **target equation** is the reaction whose enthalpy change you want to find. The given equations are rearranged so that, when they are added, everything except the target cancels.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Target: } \\ce{C(s) + 1/2 O2(g) -> CO(g)}', '\\text{Measured: } \\ce{C(s) + O2(g) -> CO2(g)}', '\\text{and } \\ce{CO(g) + 1/2 O2(g) -> CO2(g)}'] },
      ],
      lines: [
        { say: 'That makes Hess’s law very useful. Carbon burning to carbon monoxide cannot be measured cleanly, but carbon and carbon monoxide burning to carbon dioxide can both be measured.', show: ['m.0', 'm.1', 'm.2'] },
        { say: 'The reaction you want is called the target equation. Its delta H is found from equations that can be measured.', show: 'def', focus: 'm.0' },
        { say: 'They are reversed or multiplied so that, when they are added, everything except the target cancels. Then their enthalpy changes are added.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt:
            'Nitrogen dioxide can form in one step, $\\ce{N2(g) + 2O2(g) -> 2NO2(g)}$, or in two: $\\ce{N2(g) + O2(g) -> 2NO(g)}$, $\\Delta_r H = +182.6\\ \\text{kJ}$, then $\\ce{2NO(g) + O2(g) -> 2NO2(g)}$, $\\Delta_r H = -116.2\\ \\text{kJ}$. What is $\\Delta_r H$ for the one-step reaction?',
          choices: ['$+298.8\\ \\text{kJ}$', '$+66.4\\ \\text{kJ}$', '$-66.4\\ \\text{kJ}$', '$-298.8\\ \\text{kJ}$'],
          answer: 1,
          working: 'The two steps add up to the one-step equation ($\\ce{2NO}$ cancels), so their enthalpy changes add: $+182.6 + (-116.2) = +66.4\\ \\text{kJ}$.',
        },
      ],
      lines: [
        {
          say: 'Your turn. Nitrogen dioxide can form from nitrogen and oxygen in one step, or in two steps through nitrogen monoxide, with the delta H values on the screen. What is delta H for the one-step reaction? Pause the video and try it.',
          show: 'q',
          wait: 6,
        },
        { say: 'The answer is B, positive sixty-six point four kilojoules. The two steps add up to the one-step equation, so their enthalpy changes add. Choice A subtracts them instead.', show: 'q.answer' },
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
            'Enthalpy depends only on the start and the finish, not on the route.',
            "**Hess's law**: if equations add up to a **target equation**, their $\\Delta H$ values add up to its $\\Delta H$.",
            'It follows from the conservation of energy, and finds $\\Delta H$ for reactions that are hard to measure.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Enthalpy depends only on the start and the finish, not on the route.', show: 'sum.0' },
        { say: "Hess's law: if equations add up to a target equation, their enthalpy changes add up to its enthalpy change.", show: 'sum.1' },
        { say: "Hess's law follows from the conservation of energy, and it finds delta H for reactions that are hard to measure. In part three, you will combine equations step by step. See you there!", show: 'sum.2' },
      ],
    },
  ],
};

export default video;
