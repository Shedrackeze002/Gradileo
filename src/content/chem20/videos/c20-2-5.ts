import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { arrow, container, tag } from './lib/c20-2b-figures.ts';

// The same gas before and after a change: a cylinder with a piston, then the piston lower down.
const states = figure(
  's',
  [
    container({ name: 'a', at: [0, 0], w: 3.2, h: 4.2, lid: 'piston', count: 6, seed: 3 }),
    tag('a-label', [1.6, -0.35], '\\begin{gathered}\\text{before}\\\\ P_1,\\ V_1,\\ T_1\\end{gathered}', { place: 'below' }),
    arrow('change', [3.9, 2.4], [5.7, 2.4], { tone: 'theta', label: '\\text{change}' }),
    container({ name: 'b', at: [6.4, 0], w: 3.2, h: 2.6, lid: 'piston', count: 6, seed: 4 }),
    tag('b-label', [8.0, -0.35], '\\begin{gathered}\\text{after}\\\\ P_2,\\ V_2,\\ T_2\\end{gathered}', { place: 'below' }),
  ],
  440,
);

const video: Explainer = {
  id: 'c20-2-5',
  lessonId: 'c20-2-5',
  title: 'The Combined Gas Law, Part 1: Three Laws in One',
  thumbnailTitle: 'Three Laws in One',
  thumbnail: 's',
  summary:
    "Boyle's, Charles's and Gay-Lussac's laws each hold one quantity fixed. The combined gas law, P₁V₁/T₁ = P₂V₂/T₂, links pressure, volume and Kelvin temperature for a fixed amount of gas, and holding one quantity constant cancels it to give each of the three earlier laws.",
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Forms of Matter: Gases · Part 1', title: 'Three Laws in One', subtitle: 'The combined gas law' }],
      lines: [
        { say: 'A weather balloon rises through the sky. As it climbs, the air pressure around it falls, which lets it swell, but the air also gets colder, which makes it shrink. Which effect wins?', show: 'title' },
        { say: 'Each gas law so far holds one quantity fixed. In this lesson, you will combine them into one equation that lets all three change.' },
        { say: 'This part builds the combined gas law. Later parts use it to find new values, and to predict changes.' },
      ],
    },
    {
      chapter: 'Three laws so far',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Law', 'Held constant', 'Relationship', 'Equation'],
          rows: [
            ["Boyle's law", 'temperature', '$V$ inversely proportional to $P$', '$P_1V_1 = P_2V_2$'],
            ["Charles's law", 'pressure', '$V$ directly proportional to $T$', '$\\dfrac{V_1}{T_1} = \\dfrac{V_2}{T_2}$'],
            ["Gay-Lussac's law", 'volume', '$P$ directly proportional to $T$', '$\\dfrac{P_1}{T_1} = \\dfrac{P_2}{T_2}$'],
          ],
        },
        { kind: 'text', id: 'k', size: 'md', md: 'Each law is for a fixed amount of gas, with temperatures in kelvins.' },
      ],
      lines: [
        { say: 'Boyle’s law: at constant temperature, the volume of a gas is inversely proportional to its pressure. P one V one equals P two V two.', caption: 'Boyle’s law: at constant temperature, the volume of a gas is inversely proportional to its pressure. P₁V₁ = P₂V₂.', show: 't.0', focus: 't.0' },
        { say: 'Charles’s law: at constant pressure, the volume is directly proportional to the Kelvin temperature.', show: 't.1', focus: 't.1' },
        { say: 'And Gay-Lussac’s law: at constant volume, the pressure is directly proportional to the Kelvin temperature.', show: 't.2', focus: 't.2' },
        { say: 'Each law is for a fixed amount of gas, and lets only two quantities change. In the weather balloon, all three change at once.', show: 'k', focus: 't' },
      ],
    },
    {
      chapter: 'The combined gas law',
      layout: 'split',
      leftWidth: 560,
      left: [states],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Combined gas law', md: 'For a fixed amount of gas, with both temperatures in kelvins:' },
        { kind: 'math', id: 'm', size: 'xl', lines: ['\\dfrac{P_1V_1}{T_1} = \\dfrac{P_2V_2}{T_2}'] },
        { kind: 'text', id: 'w', size: 'md', md: 'The pressure times the volume, divided by the Kelvin temperature, **stays the same**.' },
      ],
      lines: [
        { say: 'Picture a gas in a cylinder with a movable piston. Before a change, it has a pressure, P one, a volume, V one, and a temperature, T one.', caption: 'Picture a gas in a cylinder with a movable piston. Before a change, it has a pressure, P₁, a volume, V₁, and a temperature, T₁.', show: ['s.a-box', 's.a-piston', 's.a-p', 's.a-label'] },
        { say: 'After the change, all three can be different. No gas gets in or out, so the amount of gas is fixed.', show: ['s.change', 's.b-box', 's.b-piston', 's.b-p', 's.b-label'], focus: ['s.a-p', 's.b-p'] },
        { say: 'The combined gas law links them: P one V one over T one equals P two V two over T two.', caption: 'The combined gas law links them: P₁V₁/T₁ = P₂V₂/T₂.', show: ['def', 'm'], focus: 's' },
        { say: 'The pressure times the volume, divided by the Kelvin temperature, stays the same. Both temperatures must be in kelvins.', show: 'w' },
      ],
    },
    {
      chapter: 'Cancelling to the other laws',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Held constant', 'It cancels', 'Leaving'],
          rows: [
            ['temperature, $T_1 = T_2$', '$\\dfrac{P_1V_1}{\\cancel{T_1}} = \\dfrac{P_2V_2}{\\cancel{T_2}}$', "$P_1V_1 = P_2V_2$, Boyle's law"],
            ['pressure, $P_1 = P_2$', '$\\dfrac{\\cancel{P_1}V_1}{T_1} = \\dfrac{\\cancel{P_2}V_2}{T_2}$', "$\\dfrac{V_1}{T_1} = \\dfrac{V_2}{T_2}$, Charles's law"],
            ['volume, $V_1 = V_2$', '$\\dfrac{P_1\\cancel{V_1}}{T_1} = \\dfrac{P_2\\cancel{V_2}}{T_2}$', "$\\dfrac{P_1}{T_1} = \\dfrac{P_2}{T_2}$, Gay-Lussac's law"],
          ],
        },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'One law to remember', md: 'If you remember the combined gas law, you have all three of the others: cross out whatever stays the same.' },
      ],
      lines: [
        { say: 'Each earlier law is the combined gas law with one quantity held constant. That quantity appears on both sides, so it cancels.' },
        { say: 'Hold the temperature constant, and the temperatures cancel, leaving P one V one equals P two V two: Boyle’s law.', caption: 'Hold the temperature constant, and the temperatures cancel, leaving P₁V₁ = P₂V₂: Boyle’s law.', show: 't.0', focus: 't.0' },
        { say: 'Hold the pressure constant, and the pressures cancel. V one over T one equals V two over T two: Charles’s law.', caption: 'Hold the pressure constant, and the pressures cancel. V₁/T₁ = V₂/T₂: Charles’s law.', show: 't.1', focus: 't.1' },
        { say: 'Hold the volume constant, and the volumes cancel. P one over T one equals P two over T two: Gay-Lussac’s law.', caption: 'Hold the volume constant, and the volumes cancel. P₁/T₁ = P₂/T₂: Gay-Lussac’s law.', show: 't.2', focus: 't.2' },
        { say: 'So you need to remember only one law: cross out whatever stays the same.', show: 'tip', focus: 't' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A fixed amount of gas is heated in a sealed rigid container, so its **volume** stays the same. Which law is left when the volume cancels from $\\dfrac{P_1V_1}{T_1} = \\dfrac{P_2V_2}{T_2}$?',
          choices: ['$P_1V_1 = P_2V_2$', '$\\dfrac{V_1}{T_1} = \\dfrac{V_2}{T_2}$', '$\\dfrac{P_1}{T_1} = \\dfrac{P_2}{T_2}$', '$P_1T_1 = P_2T_2$'],
          answer: 2,
          working: "With $V_1 = V_2$, the volumes cancel, leaving $\\dfrac{P_1}{T_1} = \\dfrac{P_2}{T_2}$: Gay-Lussac's law.",
        },
      ],
      lines: [
        { say: 'Your turn. A gas is heated in a sealed rigid container, so its volume stays the same. Which law is left when the volume cancels? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, Gay-Lussac’s law: P one over T one equals P two over T two. Choice B is left when the pressure stays the same instead.', caption: 'The answer is C, Gay-Lussac’s law: P₁/T₁ = P₂/T₂. Choice B is left when the pressure stays the same instead.', show: 'q.answer' },
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
            '**Combined gas law**: $\\dfrac{P_1V_1}{T_1} = \\dfrac{P_2V_2}{T_2}$ for a fixed amount of gas.',
            'Both temperatures must be in kelvins.',
            "Hold the temperature, pressure or volume constant and it cancels, leaving Boyle's, Charles's or Gay-Lussac's law.",
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. For a fixed amount of gas, P one V one over T one equals P two V two over T two.', caption: 'Let’s sum up. For a fixed amount of gas, P₁V₁/T₁ = P₂V₂/T₂.', show: 'sum.0' },
        { say: 'Both temperatures must be in kelvins.', show: 'sum.1' },
        { say: 'Hold one quantity constant and it cancels, leaving an earlier law. In part two, you will use the combined gas law to find a new volume. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
