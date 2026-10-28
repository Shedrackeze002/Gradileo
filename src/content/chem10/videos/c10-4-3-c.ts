import type { Explainer } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';
import { figure } from '@/video/solids.ts';
import { arrow, mol, plus, row } from './lib/c10-4-figures.ts';

// The reactivity order the lesson uses, most reactive at the top, with an arrow up the side.
const METALS = ['magnesium', 'zinc', 'iron', 'hydrogen', 'copper', 'silver'];
const seriesPart: Part = {
  points: Object.fromEntries([...METALS.map((m, i) => [m, [0, -i * 0.9] as [number, number]]), ['up-a', [-1.9, -4.7]], ['up-b', [-1.9, 0.4]]]),
  items: [
    { kind: 'line', id: 'up', from: 'up-a', to: 'up-b', arrow: true, tone: 'muted', weight: 3 },
    { kind: 'label', id: 'up-label', at: 'up-b', tex: '\\text{more reactive}', tone: 'muted', place: 'above' },
    ...METALS.map((m) => ({ kind: 'label' as const, id: m, at: m, tex: `\\text{${m}}`, place: 'center' as const, ...(m === 'hydrogen' ? { tone: 'theta' as const } : {}) })),
  ],
};
const series = () => figure('rs', [seriesPart], 480);

// Zinc takes the place of copper in copper(II) sulfate.
const tones = { Zn: 'adj', Cu: 'opp', SO_4: 'good' } as const;
const ion = (id: string, syms: Array<keyof typeof tones>) => mol(id, syms, { tones: syms.map((s) => tones[s]), r: 0.5 });
const swap = figure('zn', [row({ terms: [ion('zn', ['Zn']), plus('p1'), ion('cs', ['Cu', 'SO_4']), arrow('arr'), ion('zs', ['Zn', 'SO_4']), plus('p2'), ion('cu', ['Cu'])] })], 200);

const video: Explainer = {
  id: 'c10-4-3-c',
  lessonId: 'c10-4-3',
  title: 'Types of Reactions, Part 3: Displacement and Reactivity',
  thumbnailTitle: 'Displacement and Reactivity',
  thumbnail: 'zn',
  summary:
    'A more reactive metal displaces a less reactive metal from a solution of its compound; a less reactive metal cannot, so there is no reaction. A metal above hydrogen in the reactivity order reacts with a dilute acid to give a salt and hydrogen, and a more reactive halogen displaces a less reactive one.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Reactions · Part 3', title: 'Displacement and Reactivity', subtitle: 'Will it react?' }],
      lines: [
        { say: 'Dip a strip of zinc into blue copper two sulfate solution, and it is soon coated with copper. Dip a strip of silver in, and nothing happens at all.', caption: 'Dip a strip of zinc into blue copper(II) sulfate solution, and it is soon coated with copper. Dip a strip of silver in, and nothing happens at all.', show: 'title' },
        { say: 'In this part, you will use a reactivity order to predict whether a single displacement happens, and what it makes.' },
      ],
    },
    {
      chapter: 'A reactivity series',
      layout: 'split',
      leftWidth: 440,
      left: [series()],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Reactivity series', md: 'A list of metals from the **most reactive** to the least.' },
        { kind: 'callout', id: 'rule', tone: 'key', title: 'Displacement', md: 'A **more reactive** metal displaces a less reactive metal from a solution of its compound. A less reactive metal cannot: **no reaction**.' },
      ],
      lines: [
        { say: 'Whether a single displacement happens depends on how reactive the elements are. A reactivity series lists metals from the most reactive to the least.', show: ['def', 'rs.up', 'rs.up-label', ...METALS.map((m) => `rs.${m}`)] },
        { say: 'Here is the order this lesson uses, most reactive first: magnesium, zinc, iron, hydrogen, copper and silver. A question always gives you the order to use.' },
        { say: 'A more reactive metal displaces a less reactive metal from a solution of its compound. A less reactive metal cannot displace a more reactive one, so then there is no reaction.', show: 'rule' },
      ],
    },
    {
      chapter: 'Zinc, then silver',
      layout: 'center',
      main: [
        swap,
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{Zn(s) + CuSO4(aq) -> ZnSO4(aq) + Cu(s)}', '\\text{silver} + \\text{copper(II) sulfate} \\rightarrow \\text{no reaction}'] },
      ],
      lines: [
        { say: 'A piece of zinc is placed in copper two sulfate solution. Zinc is above copper in the order, so it is more reactive, and it displaces the copper.', caption: 'A piece of zinc is placed in copper(II) sulfate solution. Zinc is above copper in the order, so it is more reactive, and it displaces the copper.', show: ['zn.zn', 'zn.p1', 'zn.cs'] },
        { say: 'The zinc takes the place of the copper beside the sulfate. Zinc sulfate forms in the solution, and copper coats the zinc.', show: ['zn.arr', 'zn.zs', 'zn.p2', 'zn.cu', 'm.0'], focus: ['zn.zs', 'zn.cu'] },
        { say: 'Now a piece of silver in the same solution. Silver is below copper, so it is less reactive, and cannot displace the copper. No reaction happens.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Metals in acid',
      layout: 'split',
      leftWidth: 440,
      left: [series()],
      right: [
        { kind: 'callout', id: 'rule', tone: 'key', title: 'Metals and acids', md: 'A metal **above hydrogen** reacts with a dilute acid to make a **salt and hydrogen**. A metal below hydrogen does not react.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\ce{Fe + 2HCl -> FeCl2 + H2}'] },
      ],
      lines: [
        { say: 'Hydrogen is in the list because metals react with acids by displacing the hydrogen of the acid.', show: ['rs.up', 'rs.up-label', ...METALS.map((m) => `rs.${m}`)], focus: 'rs.hydrogen' },
        { say: 'A metal above hydrogen reacts with a dilute acid to make a salt and hydrogen. A metal below hydrogen, such as copper, does not react.', show: 'rule' },
        { say: 'Iron filings are added to dilute hydrochloric acid. Iron is above hydrogen, so it displaces the hydrogen. Iron forms iron two compounds here, so iron plus hydrochloric acid gives iron two chloride plus hydrogen.', caption: 'Iron filings are added to dilute hydrochloric acid. Iron is above hydrogen, so it displaces the hydrogen. Iron forms iron(II) compounds here, so iron plus hydrochloric acid gives iron(II) chloride plus hydrogen.', show: 'm', focus: ['m', 'rs.iron'] },
      ],
    },
    {
      chapter: 'Halogens',
      layout: 'center',
      main: [
        { kind: 'text', id: 't', size: 'md', align: 'center', md: 'The halogens get **less reactive** down group 17: chlorine displaces bromine and iodine, and bromine displaces iodine.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{Br2 + 2KI -> 2KBr + I2}'] },
      ],
      lines: [
        { say: 'Non-metals can displace each other too. The halogens get less reactive down group seventeen.', show: 't' },
        { say: 'So chlorine displaces bromine and iodine, and bromine displaces iodine. Bromine plus potassium iodide gives potassium bromide plus iodine.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A piece of copper is placed in silver nitrate solution. Use this reactivity order, most reactive first: magnesium, zinc, iron, copper, silver. What forms?',
          choices: ['No reaction happens', 'Copper(II) nitrate and silver', 'Copper(II) nitrate and hydrogen', 'Copper(II) oxide and silver'],
          answer: 1,
          working: 'Copper is more reactive than silver, so it displaces it: $\\ce{Cu + 2AgNO3 -> Cu(NO3)2 + 2Ag}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A piece of copper is placed in silver nitrate solution. Use this reactivity order, most reactive first: magnesium, zinc, iron, copper, silver. What forms? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Copper is above silver, so it is more reactive and displaces the silver. Copper two nitrate forms in the solution, and silver forms on the copper. Choice A would be right only if copper were below silver.', caption: 'The answer is B. Copper is above silver, so it is more reactive and displaces the silver. Copper(II) nitrate forms in the solution, and silver forms on the copper. Choice A would be right only if copper were below silver.', show: 'q.answer' },
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
            'A **more reactive** metal displaces a less reactive one from its compound; otherwise there is **no reaction**.',
            'A metal **above hydrogen** reacts with a dilute acid to give a salt and hydrogen.',
            'A more reactive halogen displaces a less reactive one.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A more reactive metal displaces a less reactive metal from its compound. Otherwise, there is no reaction.', show: 'sum.0' },
        { say: 'A metal above hydrogen reacts with a dilute acid to give a salt and hydrogen.', show: 'sum.1' },
        { say: 'And a more reactive halogen displaces a less reactive one. In part four, you will mix two solutions and predict a precipitate. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
