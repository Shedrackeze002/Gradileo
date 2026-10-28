import type { Explainer } from '@/video/script.ts';
import { particles } from '@/video/chem.ts';
import { figure } from '@/video/solids.ts';
import { link, rateArrows, tag, vessel } from './lib/c30-4a-figures.ts';

// A sealed tube of dinitrogen tetroxide: at the start 8 N₂O₄ molecules (grey pairs, each two NO₂
// units joined); later 5 N₂O₄ and 6 brown NO₂, the same 16 NO₂ units.
const tubes = figure(
  't',
  [
    particles({ name: 'a', size: 4.5, state: 'gas', kinds: [{ id: 'n2o4', tone: 'muted', count: 8, atoms: 2 }], seed: 3 }),
    particles({ name: 'b', at: [6.5, 0], size: 4.5, state: 'gas', kinds: [{ id: 'n2o4', tone: 'muted', count: 5, atoms: 2 }, { id: 'no2', tone: 'opp', count: 6 }], seed: 11 }),
    link('arr', [4.8, 2.25], [6.2, 2.25], { arrow: true, tone: 'muted' }),
    tag('la', [2.25, -0.2], '\\text{start}', { place: 'below' }),
    tag('lb', [8.75, -0.2], '\\text{later}', { place: 'below' }),
  ],
  420,
);

// The forward and reverse rates as arrows, at the lesson's rates: 0.80 and 0 at the start, about
// 0.43 and 0.23 at 20 s, and 0.30 each at equilibrium.
const rates = figure(
  'r',
  [
    rateArrows({
      stages: [
        { label: '\\text{start}', fwd: 0.8, rev: 0 },
        { label: '\\text{later}', fwd: 0.43, rev: 0.23 },
        { label: '\\text{at equilibrium}', fwd: 0.3, rev: 0.3 },
      ],
    }),
  ],
  260,
);

// An open glass of sparkling water, where the gas escapes, and a sealed bottle, where it dissolves back.
const glasses = figure('g', [vessel({ name: 'o', open: true, label: '\\text{open}' }), vessel({ name: 'c', at: [6, 0], open: false, label: '\\text{sealed}' })], 470);

const video: Explainer = {
  id: 'c30-4-1',
  lessonId: 'c30-4-1',
  title: 'Dynamic Equilibrium, Part 1: Reversible Reactions',
  thumbnailTitle: 'Reversible Reactions',
  thumbnail: 'r',
  summary:
    'A reversible reaction goes both ways: colourless dinitrogen tetroxide splits into brown nitrogen dioxide, and nitrogen dioxide pairs up again. In a sealed tube the forward reaction slows and the reverse reaction speeds up until their rates are equal: dynamic equilibrium, where both reactions continue but nothing changes overall. It needs a reversible reaction, a closed system and a constant temperature.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Equilibrium Focusing on Acid–Base Systems · Part 1', title: 'Reversible Reactions', subtitle: 'Change that never stops' }],
      lines: [
        { say: 'A sealed bottle of sparkling water stays fizzy for months, even though carbon dye-oxide leaves the liquid all the time. Inside, gas dissolves back exactly as fast as it escapes. This balance is called dynamic equilibrium.', caption: 'A sealed bottle of sparkling water stays fizzy for months, even though carbon dioxide leaves the liquid all the time. Inside, gas dissolves back exactly as fast as it escapes. This balance is called dynamic equilibrium.', show: 'title' },
        { say: 'This first part shows reversible reactions and how a system reaches dynamic equilibrium. Later parts cover its features, and graphs of concentration and of rate.' },
      ],
    },
    {
      chapter: 'Reversible reactions',
      layout: 'split',
      leftWidth: 600,
      left: [tubes],
      right: [
        { kind: 'math', id: 'eq', size: 'md', lines: ['\\ce{N2O4(g) <=> 2NO2(g)}'] },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Reversible reaction', md: 'Goes both ways: the reactants form products (the **forward reaction**) and the products re-form the reactants (the **reverse reaction**). The double arrow, $\\rightleftharpoons$, shows both.' },
      ],
      lines: [
        { say: 'Most reactions you have met go one way, until a reactant runs out. Many can also run backwards. Dye-nitrogen tetroxide, a colourless gas, splits into brown nitrogen dioxide, and nitrogen dioxide pairs up again.', caption: 'Most reactions you have met go one way, until a reactant runs out. Many can also run backwards. Dinitrogen tetroxide, a colourless gas, splits into brown nitrogen dioxide, and nitrogen dioxide pairs up again.', show: 'eq', focus: 'eq' },
        { say: 'This is a reversible reaction. The forward reaction makes the products, the reverse reaction re-forms the reactants, and the double arrow shows both.', show: 'def' },
        { say: 'Seal colourless dye-nitrogen tetroxide in a glass tube at constant temperature. A brown colour slowly appears as nitrogen dioxide forms.', caption: 'Seal colourless dinitrogen tetroxide in a glass tube at constant temperature. A brown colour slowly appears as nitrogen dioxide forms.', show: ['t.a-box', 't.a-n2o4', 't.la', 't.arr', 't.b-box', 't.b-n2o4', 't.b-no2', 't.lb'], focus: 't.b-no2' },
        { say: 'After a while, the colour stops changing. The tube never turns completely brown: some dye-nitrogen tetroxide is always left.', caption: 'After a while, the colour stops changing. The tube never turns completely brown: some dinitrogen tetroxide is always left.', focus: 't.b-n2o4' },
      ],
    },
    {
      chapter: 'Dynamic equilibrium',
      layout: 'center',
      main: [
        rates,
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Dynamic equilibrium', md: 'The forward and reverse reactions happen at **equal rates**, so the amounts of reactants and products stay constant. *Dynamic*: both reactions keep going. *Equilibrium*: nothing changes overall.' },
      ],
      lines: [
        { say: 'Why does the colour stop changing? At the start, only dye-nitrogen tetroxide is present, so only the forward reaction happens, and quickly.', caption: 'Why does the colour stop changing? At the start, only dinitrogen tetroxide is present, so only the forward reaction happens, and quickly.', show: 'r.stage-0' },
        { say: 'As dye-nitrogen tetroxide is used up, the forward reaction slows down. Meanwhile nitrogen dioxide builds up, so the reverse reaction speeds up.', caption: 'As dinitrogen tetroxide is used up, the forward reaction slows down. Meanwhile nitrogen dioxide builds up, so the reverse reaction speeds up.', show: 'r.stage-1' },
        { say: 'Eventually the two rates are equal. Nitrogen dioxide is made exactly as fast as it is used up, and so is dye-nitrogen tetroxide.', caption: 'Eventually the two rates are equal. Nitrogen dioxide is made exactly as fast as it is used up, and so is dinitrogen tetroxide.', show: 'r.stage-2', focus: 'r.stage-2' },
        { say: 'This is dynamic equilibrium: equal forward and reverse rates, so the amounts stay constant. Dynamic, because both reactions keep going. Equilibrium, because nothing changes overall.', show: 'def', focus: 'r' },
      ],
    },
    {
      chapter: 'Three conditions',
      layout: 'split',
      leftWidth: 560,
      left: [glasses],
      right: [
        { kind: 'bullets', id: 'b', items: ['The reaction is **reversible**.', 'The system is **closed**: no matter enters or leaves.', 'The **temperature** stays constant.'] },
        { kind: 'callout', id: 'closed', tone: 'definition', title: 'Closed system', md: 'Can exchange energy with its surroundings, but not matter. A sealed flask is closed; an open beaker is not.' },
      ],
      lines: [
        { say: 'Three conditions are needed for dynamic equilibrium. First, the reaction must be reversible. Second, the system must be closed: no matter can enter or leave.', show: ['b.0', 'b.1'] },
        { say: 'In an open glass, carbon dye-oxide escapes into the air, so gas dissolving back can never catch up. The water goes flat.', caption: 'In an open glass, carbon dioxide escapes into the air, so gas dissolving back can never catch up. The water goes flat.', show: ['g.o-box', 'g.o-liquid', 'g.o-gas', 'g.o-arrows', 'g.o-label'], focus: 'g.o-arrows' },
        { say: 'In a sealed bottle, the gas cannot escape. It dissolves back as fast as it leaves, so the system can reach equilibrium.', show: ['g.c-box', 'g.c-liquid', 'g.c-gas', 'g.c-arrows', 'g.c-label'], focus: 'g.c-arrows' },
        { say: 'A closed system can exchange energy with its surroundings, but not matter. And third, the temperature must stay constant.', show: ['closed', 'b.2'], focus: 'g' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which of these systems can reach dynamic equilibrium?',
          choices: ['Water evaporating from an open beaker', 'A candle burning in open air', 'Water and water vapour in a sealed bottle at constant temperature', 'Carbonated water losing its bubbles in an open glass'],
          answer: 2,
          working: 'The sealed bottle is a closed system at constant temperature, so evaporation and condensation can reach equal rates. In the open systems a product escapes, so the reverse process cannot keep up.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these systems can reach dynamic equilibrium? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. The bottle is sealed at constant temperature, so evaporation and condensation can reach equal rates. In the other three, something escapes into the air, so the reverse process never catches up.', show: 'q.answer' },
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
            'A **reversible reaction** goes both ways: $\\ce{N2O4 <=> 2NO2}$.',
            'At **dynamic equilibrium** the forward and reverse rates are equal: amounts stay constant, but both reactions continue.',
            'It needs a reversible reaction, a **closed system** and a constant temperature.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A reversible reaction goes both ways, and the double arrow shows the forward and reverse reactions.', show: 'sum.0' },
        { say: 'At dynamic equilibrium, the forward and reverse rates are equal. The amounts stay constant, but both reactions continue.', show: 'sum.1' },
        { say: 'It needs a reversible reaction, a closed system and a constant temperature. In part two, you will see what stays constant at equilibrium, and what does not. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
