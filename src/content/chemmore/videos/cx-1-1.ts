import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'cx-1-1',
  lessonId: 'cx-1-1',
  title: 'The Reactivity Series and Displacement Reactions',
  thumbnailTitle: 'The Reactivity Series',
  thumbnail: false,
  summary:
    'The reactivity series ranks metals by how readily they react with water and dilute acids. A more reactive metal displaces a less reactive one from its compound, and in every displacement the more reactive metal is oxidised (it loses electrons) while the ions of the less reactive metal are reduced.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Metals and Their Reactions', title: 'The Reactivity Series', subtitle: 'Which metal wins?' }],
      lines: [
        { say: 'Drop a piece of potassium into water, and it bursts into a lilac flame. Drop in a gold ring, and nothing happens, however long you wait.', show: 'title' },
        { say: 'In this lesson, you will rank metals by how readily they react, and use the ranking to predict which reactions happen.' },
      ],
    },
    {
      chapter: 'The reactivity series',
      layout: 'split',
      left: [
        {
          kind: 'table',
          id: 't',
          head: ['Metal', 'With dilute acid'],
          rows: [
            ['Potassium, sodium', 'Too dangerous to try'],
            ['Calcium', 'Fizzes violently'],
            ['Magnesium', 'Fizzes quickly'],
            ['Zinc', 'Fizzes steadily'],
            ['Iron', 'A few slow bubbles'],
            ['*Hydrogen*', ''],
            ['Copper, silver, gold', 'No change'],
          ],
        },
      ],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Reactivity series', md: 'A list of metals in order of how readily they react, with the **most reactive at the top**.' },
        { kind: 'text', id: 'pat', size: 'md', md: 'metal + acid → salt + hydrogen' },
      ],
      lines: [
        { say: 'The reactivity series is a list of metals in order of how readily they react, with the most reactive at the top.', show: 'def' },
        { say: 'You can build it by watching each metal in dilute acid. Potassium and sodium are too dangerous to try. Calcium fizzes violently, magnesium quickly, zinc steadily, and iron gives only a few slow bubbles.', show: ['t.0', 't.1', 't.2', 't.3', 't.4'] },
        { say: 'The fizzing is hydrogen. A metal and an acid make a salt and hydrogen.', show: 'pat', focus: 'pat' },
        { say: 'Hydrogen is not a metal, but it has a place in the series. Only a metal above hydrogen reacts with a dilute acid, so copper, silver and gold do nothing.', show: ['t.5', 't.6'], focus: ['t.5', 't.6'] },
      ],
    },
    {
      chapter: 'Displacement reactions',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Displacement reaction', md: 'A **more reactive** metal takes the place of a **less reactive** metal in a compound.' },
        { kind: 'text', id: 'eq', size: 'md', md: 'iron + copper(II) sulfate → iron(II) sulfate + copper' },
        { kind: 'text', id: 'no', size: 'md', md: 'copper + iron(II) sulfate → no reaction' },
      ],
      lines: [
        { say: 'In a displacement reaction, a more reactive metal takes the place of a less reactive metal in a compound.', show: 'def' },
        { say: 'Put an iron nail into blue copper two sulfate solution. Iron is above copper in the series, so it pushes the copper out. A pink-brown coating of copper grows on the nail, and the blue colour fades.', caption: 'Put an iron nail into blue copper(II) sulfate solution. Iron is above copper in the series, so it pushes the copper out. A pink-brown coating of copper grows on the nail, and the blue colour fades.', show: 'eq', focus: 'eq' },
        { say: 'The reverse never happens. Copper in iron two sulfate solution does nothing, because a less reactive metal cannot displace a more reactive one.', caption: 'The reverse never happens. Copper in iron(II) sulfate solution does nothing, because a less reactive metal cannot displace a more reactive one.', show: 'no', focus: 'no' },
      ],
    },
    {
      chapter: 'Losing and gaining electrons',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{Zn + Cu^2+ -> Zn^2+ + Cu}'] },
        { kind: 'callout', id: 'oil', tone: 'definition', title: 'Oxidation and reduction', md: '**Oxidation** is the loss of electrons. **Reduction** is the gain of electrons. OIL RIG: Oxidation Is Loss, Reduction Is Gain.' },
      ],
      lines: [
        { say: 'When zinc displaces copper from copper two sulfate, the sulfate ions do not change. Leave them out, and you have the ionic equation.', caption: 'When zinc displaces copper from copper(II) sulfate, the sulfate ions do not change. Leave them out, and you have the ionic equation: Zn + Cu²⁺ → Zn²⁺ + Cu.', show: 'm' },
        { say: 'Each zinc atom loses two electrons and becomes a zinc ion. Each copper ion gains two electrons and becomes a copper atom.', focus: 'm' },
        { say: 'Oxidation is the loss of electrons, and reduction is the gain of electrons. Remember oil rig: oxidation is loss, reduction is gain.', show: 'oil', focus: 'oil' },
        { say: 'So zinc is oxidised, and the copper ions are reduced. In every displacement, the more reactive metal is the one that is oxidised.' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [{ kind: 'callout', id: 'm', tone: 'mistake', title: 'The ion is reduced, not the metal that appears', md: 'The particle that gains the electrons is the copper **ion**, $\\ce{Cu^2+}$. Name what is oxidised and reduced from the **left-hand side** of the equation.' }],
      lines: [
        { say: 'Here is a common mistake: pointing at the copper metal that forms and saying that copper is reduced.', show: 'm' },
        { say: 'The particle that gains the electrons is the copper ion. So name what is oxidised and what is reduced from the left-hand side of the equation.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Zinc is placed in magnesium sulfate solution. What happens?',
          choices: ['Zinc displaces the magnesium', 'Hydrogen gas is given off', 'No reaction happens', 'The zinc ions are reduced'],
          answer: 2,
          working: 'Magnesium is above zinc in the series, so zinc cannot displace it.',
        },
      ],
      lines: [
        { say: 'Your turn. Zinc is placed in magnesium sulfate solution. What happens? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, no reaction happens. Magnesium is above zinc in the series, and a less reactive metal cannot displace a more reactive one.', show: 'q.answer' },
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
            'The reactivity series lists metals from the most reactive to the least.',
            'Only metals above hydrogen react with dilute acids.',
            'A more reactive metal displaces a less reactive metal from its compound.',
            'Oxidation is the loss of electrons; reduction is the gain.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The reactivity series lists metals from the most reactive to the least.', show: 'sum.0' },
        { say: 'Only metals above hydrogen react with dilute acids.', show: 'sum.1' },
        { say: 'A more reactive metal displaces a less reactive metal from its compound, and never the other way round.', show: 'sum.2' },
        { say: 'And oxidation is the loss of electrons, while reduction is the gain. The more reactive metal is always the one oxidised.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
