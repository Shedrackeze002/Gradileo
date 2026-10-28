import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { rateArrows } from './lib/c30-4a-figures.ts';

// A shift to the right: equal rates at equilibrium, a faster forward reaction just after a
// reactant is added, then equal rates again at the new equilibrium.
const shift = figure(
  'r',
  [
    rateArrows({
      stages: [
        { label: '\\text{equilibrium}', fwd: 0.3, rev: 0.3 },
        { label: '\\text{after the stress}', fwd: 0.6, rev: 0.3 },
        { label: '\\text{new equilibrium}', fwd: 0.4, rev: 0.4 },
      ],
      gap: 6.5,
    }),
  ],
  300,
);

const video: Explainer = {
  id: 'c30-4-3',
  lessonId: 'c30-4-3',
  title: "Le Châtelier's Principle, Part 1: Stress and Shift",
  thumbnailTitle: 'Stress and Shift',
  thumbnail: 'r',
  summary:
    "Le Châtelier's principle: when a system at equilibrium is subjected to a stress, it shifts in the direction that partly counteracts the change, until a new equilibrium is reached. Adding a reactant or removing a product shifts it to the right; adding a product or removing a reactant shifts it to the left. Removing ammonia from N₂ + 3H₂ ⇌ 2NH₃ shifts it right, so [H₂] decreases.",
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Equilibrium Focusing on Acid–Base Systems · Part 1', title: 'Stress and Shift', subtitle: 'How an equilibrium pushes back' }],
      lines: [
        { say: 'Paper soaked in cobalt two chloride is blue when the air is dry, and pink when the air is damp. Behind the colour is an equilibrium between a pink and a blue cobalt ion, which responds to the water around it.', caption: 'Paper soaked in cobalt(II) chloride is blue when the air is dry, and pink when the air is damp. Behind the colour is an equilibrium between a pink and a blue cobalt ion, which responds to the water around it.', show: 'title' },
        { say: 'Every equilibrium responds to changes in its conditions, and one principle predicts how. This part covers that principle and changes in concentration. Later parts read a shift on a graph, then change the volume and the temperature.' },
      ],
    },
    {
      chapter: "Le Châtelier's principle",
      layout: 'center',
      main: [
        shift,
        { kind: 'callout', id: 'def', tone: 'definition', title: "Le Châtelier's principle", md: 'When a system at equilibrium is subjected to a change in conditions (a **stress**), it **shifts** in the direction that **partly** counteracts the change, until a new equilibrium is reached.' },
        { kind: 'text', id: 't', size: 'md', align: 'center', md: '**Shift right**: the forward reaction runs faster for a while, making more products. **Shift left**: the reverse reaction does, making more reactants.' },
      ],
      lines: [
        { say: 'A system at equilibrium is balanced: the forward and reverse rates are equal.', show: 'r.stage-0' },
        { say: 'Disturb it, by adding a substance, squeezing it or heating it, and the balance is lost for a while. The system reacts until it reaches a new equilibrium.', show: ['r.stage-1', 'r.stage-2'], focus: 'r.stage-1' },
        { say: 'This is Le Chatelier’s principle. When a system at equilibrium is subjected to a change in conditions, called a stress, it shifts in the direction that partly counteracts the change.', caption: 'This is Le Châtelier’s principle. When a system at equilibrium is subjected to a change in conditions, called a stress, it shifts in the direction that partly counteracts the change.', show: 'def', focus: 'r' },
        { say: 'A shift to the right means the forward reaction runs faster for a while, making more products. A shift to the left means the reverse reaction does, making more reactants.', show: 't' },
        { say: 'The word partly matters. Add more of a reactant, and some of it is used up, but not all of it.', focus: 'def' },
      ],
    },
    {
      chapter: 'Changing a concentration',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'tb',
          head: ['Change', 'Shift', 'Why'],
          rows: [
            ['Add a reactant', '**right**', 'Uses up some of what was added'],
            ['Remove a product', '**right**', 'Replaces some of what was removed'],
            ['Add a product', '**left**', 'Uses up some of what was added'],
            ['Remove a reactant', '**left**', 'Replaces some of what was removed'],
          ],
        },
      ],
      lines: [
        { say: 'Adding a reactant speeds up the forward reaction, so the system shifts right, using up some of what was added.', show: 'tb.0', focus: 'tb.0' },
        { say: 'Removing a product slows the reverse reaction, so the system also shifts right, replacing some of what was removed.', show: 'tb.1', focus: 'tb.1' },
        { say: 'Adding a product, or removing a reactant, does the opposite: the system shifts left.', show: ['tb.2', 'tb.3'], focus: ['tb.2', 'tb.3'] },
      ],
    },
    {
      chapter: 'Removing a product',
      layout: 'center',
      main: [
        { kind: 'math', id: 'eq', size: 'lg', lines: ['\\ce{N2(g) + 3H2(g) <=> 2NH3(g)}'] },
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'The system is at equilibrium. Some ammonia is removed at constant volume. How does it respond, and what happens to $[\\ce{H2}]$?' },
        { kind: 'bullets', id: 'b', items: ['Removing a product lowers $[\\ce{NH3}]$: the system shifts to replace some of it.', 'A shift to the **right** uses up $\\ce{N2}$ and $\\ce{H2}$.', 'So $[\\ce{H2}]$ **decreases**.'] },
      ],
      lines: [
        { say: 'Nitrogen and hydrogen are at equilibrium with ammonia. Some ammonia is removed at constant volume. How does the equilibrium respond, and what happens to the hydrogen concentration?', show: ['eq', 'q'] },
        { say: 'Removing a product lowers the ammonia concentration, and the system shifts to replace some of it: to the right.', show: 'b.0', focus: 'b.0' },
        { say: 'A shift to the right makes ammonia from nitrogen and hydrogen, so it uses them up. The hydrogen concentration decreases.', show: ['b.1', 'b.2'], focus: ['b.1', 'b.2'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The system $\\ce{PCl5(g) <=> PCl3(g) + Cl2(g)}$ is at equilibrium. More chlorine is added at constant volume. How does the equilibrium respond, and what happens to $[\\ce{PCl5}]$?',
          choices: ['Shifts right; $[\\ce{PCl5}]$ decreases.', 'Shifts left; $[\\ce{PCl5}]$ increases.', 'Shifts left; $[\\ce{PCl5}]$ decreases.', 'No shift; $[\\ce{PCl5}]$ stays the same.'],
          answer: 1,
          working: 'Chlorine is a product, so adding it shifts the equilibrium left, using up some of the added chlorine. A shift left makes more $\\ce{PCl5}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Phosphorus pentachloride is at equilibrium with phosphorus trichloride and chlorine. More chlorine is added. How does the equilibrium respond, and what happens to the phosphorus pentachloride? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Chlorine is a product, so adding it shifts the equilibrium left, to use some of it up. A shift to the left makes more phosphorus pentachloride.', show: 'q.answer' },
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
            "**Le Châtelier's principle**: a system at equilibrium shifts to partly counteract a stress.",
            'Adding a reactant or removing a product shifts it **right**.',
            'Adding a product or removing a reactant shifts it **left**.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Le Chatelier’s principle: a system at equilibrium shifts to partly counteract a stress.', caption: 'Let’s sum up. Le Châtelier’s principle: a system at equilibrium shifts to partly counteract a stress.', show: 'sum.0' },
        { say: 'Adding a reactant or removing a product shifts it right.', show: 'sum.1' },
        { say: 'Adding a product or removing a reactant shifts it left. In part two, you will watch a shift happen on a graph, and see why it happens. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
