import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { energyLevels } from './lib/c10-4-figures.ts';

// The lesson's worked example: reactants 120 kJ, top of the hump 200 kJ, products 40 kJ.
const read = figure('d', [energyLevels({ reactants: 120, peak: 200, products: 40, per: 40, step: 40, max: 240 })], 460);
// The same exothermic reaction without a catalyst (hump at 400 kJ) and with one (300 kJ).
const cat = figure('c', [energyLevels({ reactants: 250, peak: 400, products: 100, per: 100, step: 100, max: 500, catalyst: 300 })], 460);

const video: Explainer = {
  id: 'c10-4-4-c',
  lessonId: 'c10-4-4',
  title: 'Energy in Reactions, Part 3: Reading Energy Diagrams and Catalysts',
  thumbnailTitle: 'Energy Diagrams and Catalysts',
  thumbnail: 'c',
  summary:
    'Read the levels of an energy level diagram against its scale: the activation energy is the top of the hump minus the reactants, and the energy change is the products minus the reactants. A catalyst gives a route with a lower hump, so it lowers the activation energy, but the reactants and products stay where they were and the energy change does not change.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Reactions · Part 3', title: 'Reading Energy Diagrams', subtitle: 'Activation energy and catalysts' }],
      lines: [
        { say: 'Hydrogen peroxide breaks down very slowly on its own, but add a pinch of the right powder and it froths at once. The powder is a catalyst.', show: 'title' },
        { say: 'In this part, you will read the activation energy and the energy change from a diagram, and see what a catalyst does to it.' },
      ],
    },
    {
      chapter: 'Reading a diagram',
      layout: 'split',
      leftWidth: 640,
      left: [read],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Reactants $120\\ \\text{kJ}$, top of the hump $200\\ \\text{kJ}$, products $40\\ \\text{kJ}$.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\opp{\\text{activation energy}}', '\\opp{200 - 120 = 80\\ \\text{kJ}}', '\\good{\\text{energy change}}', '\\good{40 - 120 = -80\\ \\text{kJ}}'] },
        { kind: 'text', id: 'a', size: 'md', md: 'Products lower than reactants: **exothermic**.' },
      ],
      lines: [
        { say: 'On this energy level diagram, the reactants are at 120 kilojoules, the top of the hump is at 200 kilojoules, and the products are at 40 kilojoules.', show: ['d.axes', 'd.curve', 'd.reactants', 'd.products', 'q'] },
        { say: 'The activation energy is the climb from the reactants to the top of the hump: 200 minus 120, or 80 kilojoules.', show: ['d.ea', 'm.0', 'm.1'], focus: ['d.ea', 'm.1'] },
        { say: 'The energy change is products minus reactants: 40 minus 120, or negative 80 kilojoules.', show: ['d.dh', 'm.2', 'm.3'], focus: ['d.dh', 'm.3'] },
        { say: 'The products are lower than the reactants, so energy was given out, and the reaction is exothermic.', show: 'a' },
      ],
    },
    {
      chapter: 'Measure from the reactants',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Measure the hump from the reactants', md: 'The activation energy is the climb **from the reactants** to the top of the hump: not the height of the hump above zero, and not the climb from the products. Here the hump tops out at $200\\ \\text{kJ}$, but the activation energy is only $80\\ \\text{kJ}$.' }],
      lines: [
        { say: 'Take care here. The activation energy is the climb from the reactants to the top of the hump.', show: 'oops' },
        { say: 'It is not the height of the hump above zero, and not the climb from the products. In this example, the top of the hump is at 200 kilojoules, but the activation energy is only 80.' },
      ],
    },
    {
      chapter: 'Catalysts',
      layout: 'split',
      leftWidth: 640,
      left: [cat],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Catalyst', md: 'Speeds up a reaction without being used up, by giving it a **different route** with a **lower activation energy**.' },
        { kind: 'callout', id: 'k', tone: 'key', title: 'On the diagram', md: 'The hump is lower, but the reactants and products stay where they were: the **energy change does not change**.' },
      ],
      lines: [
        { say: 'A catalyst speeds up a reaction without being used up. It does this by giving the reaction a different route, with a lower activation energy.', show: 'def' },
        { say: 'The grey curve is a reaction without a catalyst. The green curve is the same reaction with a catalyst: its hump is lower.', show: ['c.axes', 'c.curve', 'c.reactants', 'c.products', 'c.no-cat', 'c.cat-curve', 'c.cat'], focus: 'c.cat-curve' },
        { say: 'But the reactants and the products stay exactly where they were. So a catalyst does not change the energy change.', show: 'k', focus: ['c.reactants', 'c.products'] },
      ],
    },
    {
      chapter: 'The effect of a catalyst',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: [
            '\\text{without the catalyst: } 400 - 250 = 150\\ \\text{kJ}',
            '\\text{with the catalyst: } 300 - 250 = 50\\ \\text{kJ}',
            '\\text{lowered by } 150 - 50 = 100\\ \\text{kJ}',
            '\\text{energy change: } 100 - 250 = -150\\ \\text{kJ on both}',
          ],
        },
      ],
      lines: [
        { say: 'Read it from the diagram. Without the catalyst, the activation energy is 400 minus 250, or 150 kilojoules. With it, 300 minus 250, or 50 kilojoules.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'So the catalyst lowers the activation energy by 150 minus 50, or 100 kilojoules.', show: 'm.2', focus: 'm.2' },
        { say: 'The energy change is 100 minus 250, or negative 150 kilojoules, on both routes.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The reactants are at $200\\ \\text{kJ}$ and the products at $140\\ \\text{kJ}$. Without a catalyst the hump reaches $320\\ \\text{kJ}$; with one, $260\\ \\text{kJ}$. What is the activation energy with the catalyst, and what happens to the energy change?',
          choices: ['$60\\ \\text{kJ}$; it stays the same', '$60\\ \\text{kJ}$; it becomes smaller', '$120\\ \\text{kJ}$; it stays the same', '$260\\ \\text{kJ}$; it stays the same'],
          answer: 0,
          working: 'With the catalyst: $260 - 200 = 60\\ \\text{kJ}$. The reactants and products do not move, so the energy change stays $140 - 200 = -60\\ \\text{kJ}$.',
        },
      ],
      lines: [
        { say: 'Your turn. The reactants are at 200 kilojoules and the products at 140. Without a catalyst, the hump reaches 320 kilojoules. With one, it reaches 260. What is the activation energy with the catalyst, and what happens to the energy change? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. With the catalyst, the climb from the reactants is 260 minus 200, or 60 kilojoules, and the energy change stays the same. Choice C, 120, is the activation energy without the catalyst, and D measures the hump from zero.', show: 'q.answer' },
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
            'Activation energy $=$ top of the hump $-$ reactants.',
            'Energy change $=$ products $-$ reactants: negative when the products are lower.',
            'A **catalyst** lowers the hump but does not change the energy change.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The activation energy is the top of the hump minus the reactants.', show: 'sum.0' },
        { say: 'The energy change is products minus reactants, and it is negative when the products are lower.', show: 'sum.1' },
        { say: 'And a catalyst lowers the hump, but does not change the energy change. That completes this lesson on energy in reactions.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
