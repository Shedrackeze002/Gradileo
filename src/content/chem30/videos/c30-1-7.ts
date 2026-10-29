import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { peDiagram } from './lib/c30-1b-figures.ts';

// The lesson's exothermic reaction: reactants at 150 kJ, the activated complex at 225 kJ and
// products at 50 kJ.
const pe = figure('e', [peDiagram({ reactants: 150, products: 50, peak: 225, max: 250, step: 50, grid: 25 })], 560);

const video: Explainer = {
  id: 'c30-1-7',
  lessonId: 'c30-1-7',
  title: 'Activation Energy and Catalysts, Part 1: Activation Energy',
  thumbnailTitle: 'Activation Energy',
  thumbnail: 'e',
  summary:
    'Reacting particles must collide in the right orientation and with enough energy. At the top of the energy barrier they form the activated complex, a short-lived, unstable arrangement of atoms; the activation energy is the minimum energy needed to form it. A potential energy diagram plots potential energy against reaction progress: with reactants at 150 kJ and the activated complex at 225 kJ, the forward activation energy is 75 kJ.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Thermochemical Changes · Part 1', title: 'Activation Energy', subtitle: 'The energy barrier between reactants and products' }],
      lines: [
        { say: 'The fuel in a car’s tank and the oxygen in the air could react with a huge release of energy, yet they sit side by side for months. A spark is needed to start them.', show: 'title' },
        { say: 'Before reactants can become products, they must climb an energy barrier. In this part, you will see what that barrier is, and how a potential energy diagram shows it.' },
      ],
    },
    {
      chapter: 'The activated complex',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ac', tone: 'definition', title: 'Activated complex', md: 'The **activated complex** is the short-lived, unstable arrangement of atoms at the point of highest potential energy during a collision. It can go on to form the products or fall back to the reactants.' },
        { kind: 'callout', id: 'ea', tone: 'definition', title: 'Activation energy', md: 'The **activation energy**, $E_a$, is the minimum energy that colliding particles must have to form the activated complex and react: the height of the energy barrier above the reactants.' },
      ],
      lines: [
        { say: 'For particles to react, they must collide, in the right orientation and with enough energy.' },
        { say: 'As they meet, their bonds stretch and begin to break, while new bonds begin to form. For a moment, the atoms make an unstable arrangement with a high potential energy, partway between reactants and products.' },
        { say: 'That arrangement is the activated complex. It can go on to form the products, or fall back to the reactants.', show: 'ac' },
        { say: 'The activation energy is the minimum energy that colliding particles must have to form the activated complex and react. That is the height of the energy barrier.', show: 'ea' },
      ],
    },
    {
      chapter: 'Why a spark is needed',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            'Collisions with less energy than $E_a$ simply bounce apart.',
            'At room temperature, only a **small fraction** of collisions have enough energy.',
            'So a reaction with a large $E_a$ is slow, or does not start at all until something, such as a spark, supplies the energy.',
          ],
        },
      ],
      lines: [
        { say: 'Collisions with less energy than the activation energy simply bounce apart.', show: 'b.0', focus: 'b.0' },
        { say: 'At room temperature, only a small fraction of collisions have enough energy.', show: 'b.1', focus: 'b.1' },
        { say: 'That is why a reaction with a large activation energy is slow, or does not start at all, until something such as a spark supplies the energy.', show: 'b.2', focus: 'b.2' },
      ],
    },
    {
      chapter: 'Potential energy diagrams',
      layout: 'split',
      leftWidth: 680,
      left: [pe],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Potential energy diagram', md: 'Potential energy against reaction progress: the reactants, a hump at the activated complex, then the products.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['E_a(\\text{forward})', '= 225 - 150 = 75\\ \\text{kJ}'] },
      ],
      lines: [
        { say: 'A potential energy diagram plots the potential energy of the reacting particles against the progress of the reaction.', show: ['def', 'e.axes', 'e.grid'] },
        { say: 'Here the reactants start at one hundred fifty kilojoules.', show: 'e.reactants' },
        {
          say: 'As the particles collide, the potential energy rises to a hump at two hundred twenty-five kilojoules: that is the activated complex. Then it falls to the products, at fifty kilojoules.',
          show: ['e.curve', 'e.complex', 'e.products'],
        },
        { say: 'The activation energy of the forward reaction is the climb from the reactants to the top of the hump. Two hundred twenty-five minus one hundred fifty is seventy-five kilojoules.', show: ['e.fwd', 'm.0', 'm.1'], focus: ['e.fwd', 'm.1'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A potential energy diagram shows the reactants at $80\\ \\text{kJ}$, the activated complex at $230\\ \\text{kJ}$ and the products at $40\\ \\text{kJ}$. What is the activation energy of the forward reaction?',
          choices: ['$230\\ \\text{kJ}$', '$190\\ \\text{kJ}$', '$40\\ \\text{kJ}$', '$150\\ \\text{kJ}$'],
          answer: 3,
          working: 'The forward reaction climbs from the reactants to the top of the hump: $E_a(\\text{forward}) = 230 - 80 = 150\\ \\text{kJ}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A potential energy diagram shows the reactants at eighty kilojoules, the activated complex at two hundred thirty, and the products at forty. What is the activation energy of the forward reaction? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, one hundred fifty kilojoules: the climb from the reactants at eighty up to the top at two hundred thirty. Choice A is the height of the hump above zero, not above the reactants.', show: 'q.answer' },
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
            'Particles react only if they collide in the right orientation and with enough energy.',
            'The **activated complex** is the unstable arrangement at the top of the energy barrier.',
            'The **activation energy**, $E_a$, is the minimum energy needed to form it.',
            'On a **potential energy diagram**, $E_a(\\text{forward})$ = activated complex − reactants.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Particles react only if they collide in the right orientation and with enough energy.', show: 'sum.0' },
        { say: 'The activated complex is the unstable arrangement at the top of the energy barrier.', show: 'sum.1' },
        { say: 'The activation energy is the minimum energy needed to form it.', show: 'sum.2' },
        { say: 'On a potential energy diagram, the forward activation energy is the activated complex minus the reactants. In part two, you will read the reverse reaction and delta H from the same diagram. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
