import type { Explainer } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';
import { figure } from '@/video/solids.ts';
import { reaction } from '@/content/chem10/videos/lib/c10-equations.ts';
import { arrow, LETTER_TONE, mol, plus, row } from '@/content/chem10/videos/lib/c10-4-figures.ts';
import { displacement } from '@/content/chemmore/videos/lib/cx-particles.ts';
import { precipitate } from '@/content/chem20/videos/lib/c20-particles.ts';
import { methaneBurning } from '@/content/chem30/videos/lib/c30-organic.ts';

// Exam question for Chemistry 10 lesson 4.3 (types of reactions): classify five equations as
// synthesis, decomposition, single displacement, double displacement or combustion. OpenStax
// Chemistry 2e prints its classification equations as images and sorts them differently
// (acid-base, redox), so Gradileo wrote this one in the style of a high-school chemistry unit
// test. Answers: (a) synthesis, (b) decomposition, (c) single displacement, (d) double
// displacement, (e) combustion.
//
// The pictures: the four patterns as lettered balls (the lesson's figure), then each reaction
// moving: hydrogen peroxide coming apart into water and oxygen (src/video/molecules.ts), iron
// pushing copper out of copper(II) sulfate solution, barium and sulfate ions locking together as
// a solid, and a methane molecule burning.

const QUESTION =
  'Classify each reaction as synthesis, decomposition, single displacement, double displacement or combustion. (a) N2 + 3H2 → 2NH3 (b) 2H2O2 → 2H2O + O2 (c) Fe + CuSO4 → FeSO4 + Cu (d) BaCl2 + Na2SO4 → BaSO4 + 2NaCl (e) CH4 + 2O2 → CO2 + 2H2O';

// The four patterns as balls: each letter is an element, and touching balls are a compound.
const L = (id: string, letters: string[]) => mol(id, letters, { tones: letters.map((l) => LETTER_TONE[l]) });
const rows = [
  row({ y: 0, title: { id: 'syn-t', tex: '\\text{Synthesis}' }, terms: [L('syn-a', ['A']), plus('syn-p'), L('syn-b', ['B']), arrow('syn-arr'), L('syn-ab', ['A', 'B'])] }),
  row({ y: -1.6, title: { id: 'dec-t', tex: '\\text{Decomposition}' }, terms: [L('dec-ab', ['A', 'B']), arrow('dec-arr'), L('dec-a', ['A']), plus('dec-p'), L('dec-b', ['B'])] }),
  row({ y: -3.2, title: { id: 'sd-t', tex: '\\text{Single displacement}' }, terms: [L('sd-a', ['A']), plus('sd-p1'), L('sd-bc', ['B', 'C']), arrow('sd-arr'), L('sd-ac', ['A', 'C']), plus('sd-p2'), L('sd-b', ['B'])] }),
  row({ y: -4.8, title: { id: 'dd-t', tex: '\\text{Double displacement}' }, terms: [L('dd-ab', ['A', 'B']), plus('dd-p1'), L('dd-cd', ['C', 'D']), arrow('dd-arr'), L('dd-ad', ['A', 'D']), plus('dd-p2'), L('dd-cb', ['C', 'B'])] }),
];
const room: Part = { points: { 'room-l': [-5, 0] }, items: [] };
const patterns = figure('pat', [room, ...rows], 440);
/** Every part of a row (each molecule's group, each plus sign, the arrow and the title). */
const rowParts = (k: number) => [...new Set(rows[k].items.map((i) => `pat.${i.group ?? i.id}`))];

const video: Explainer = {
  id: 'xq-c10-4-3',
  lessonId: '',
  exam: {
    lesson: 'c10-4-3',
    source: 'Exam-style question written by Gradileo, in the style of a high-school chemistry unit test',
    licence: 'Gradileo\'s own question',
    question: QUESTION,
  },
  title: 'Exam Question: Name the Type of Each Reaction. Types of Chemical Reactions',
  thumbnailTitle: 'Name the Reaction Type',
  thumbnail: 'pat',
  summary:
    'An exam-style question, solved one small step at a time: we sort five reactions into synthesis, decomposition, single displacement, double displacement and combustion. We match each one to its pattern and watch it happen, from hydrogen peroxide breaking down to iron pushing copper out of a solution and methane burning.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Name the Reaction Type', subtitle: 'Spotting the pattern, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam-style question that asks us to name the type of five reactions. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'Gradileo wrote this question in the style of a high-school chemistry test. You will see that at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          kicker: 'The question',
          prompt: 'Classify each reaction as synthesis, decomposition, single displacement, double displacement or combustion.<br>(a) $\\ce{N2 + 3H2 -> 2NH3}$<br>(b) $\\ce{2H2O2 -> 2H2O + O2}$<br>(c) $\\ce{Fe + CuSO4 -> FeSO4 + Cu}$<br>(d) $\\ce{BaCl2 + Na2SO4 -> BaSO4 + 2NaCl}$<br>(e) $\\ce{CH4 + 2O2 -> CO2 + 2H2O}$',
          answer: '(a) synthesis (b) decomposition (c) single displacement (d) double displacement (e) combustion',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'Classify each reaction as synthesis, decomposition, single displacement, double displacement or combustion. Part a: nitrogen and hydrogen make ammonia. Part b: hydrogen peroxide makes water and oxygen. Part c: iron and copper two sulfate make iron two sulfate and copper.', caption: 'Classify each reaction as synthesis, decomposition, single displacement, double displacement or combustion. Part (a): nitrogen and hydrogen make ammonia. Part (b): hydrogen peroxide makes water and oxygen. Part (c): iron and copper(II) sulfate make iron(II) sulfate and copper.' },
        { say: 'Part d: barium chloride and sodium sulfate make barium sulfate and sodium chloride. Part e: methane and oxygen make carbon dioxide and water.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Count the reactants and products, and look for **elements** on their own' }],
      lines: [
        { say: 'We are not asked to balance anything. The equations are already balanced. We only need to spot the pattern in each one.', show: 'plain' },
        { say: 'Two clues give the pattern away: how many substances there are on each side, and whether any of them is an element on its own.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [patterns],
      lines: [
        { say: 'Here are the patterns, with each letter an element. In a synthesis, two or more reactants combine into one product.', caption: 'Here are the patterns, with each letter an element. In a synthesis, two or more reactants combine into one product: A + B → AB.', show: rowParts(0) },
        { say: 'A decomposition is the reverse: one reactant breaks down into two or more products.', caption: 'A decomposition is the reverse: one reactant breaks down into two or more products. AB → A + B.', show: rowParts(1) },
        { say: 'In a single displacement, an element pushes another element out of a compound.', show: rowParts(2) },
        { say: 'In a double displacement, two compounds swap partners. And the fifth type, combustion, is a fuel burning in oxygen, which for a compound of carbon and hydrogen makes carbon dioxide and water.', show: rowParts(3) },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Is it a fuel with **oxygen**, making carbon dioxide and water? **Combustion**', 'One product? **Synthesis**. One reactant? **Decomposition**', 'An element swaps in? **Single**. Two compounds swap? **Double**'] }],
      lines: [
        { say: 'Here is the plan, for each part. First, check for combustion: a fuel reacting with oxygen to make carbon dioxide and water.', show: 'plan.0' },
        { say: 'Next, count. Only one product means synthesis. Only one reactant means decomposition.', show: 'plan.1' },
        { say: 'Otherwise, look for an element on its own. An element swapping into a compound is a single displacement. Two compounds swapping partners is a double displacement.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Parts (a) and (b)',
      layout: 'center',
      main: [
        { kind: 'math', id: 'ab', size: 'md', lines: ['\\text{(a)}\\quad \\ce{N2 + 3H2 -> 2NH3} \\quad \\good{\\text{one product: synthesis}}', '\\text{(b)}\\quad \\ce{2H2O2 -> 2H2O + O2} \\quad \\good{\\text{one reactant: decomposition}}'] },
        reaction('hp', { from: [{ t: 'H2O2', n: 2 }], to: [{ t: 'H2O', n: 2 }, { t: 'O2' }], height: 320 }),
      ],
      lines: [
        { say: 'Step one. In part a, nitrogen and hydrogen, two elements, combine into a single product, ammonia. One product, so it is a synthesis.', show: 'ab.0' },
        { say: 'In part b, there is only one reactant, hydrogen peroxide, and it breaks down into water and oxygen. One reactant, so it is a decomposition.', show: 'ab.1' },
        { say: 'Watch it happen. Two hydrogen peroxide molecules come apart, and their atoms join up again as two water molecules and one oxygen molecule.', show: 'hp', play: 'hp.go', playDelay: 0.3 },
      ],
    },
    {
      chapter: 'Step 2: Part (c)',
      layout: 'center',
      main: [displacement('dp', { seed: 3, height: 440 })],
      lines: [
        { say: 'Step two, part c. Iron is an element on its own, and it ends up in a compound, iron two sulfate, while copper comes out as an element.', show: ['dp', 'dp.labels', 'dp.key'], caption: 'Step two, part (c). Iron is an element on its own, and it ends up in a compound, iron(II) sulfate, while copper comes out as an element.' },
        { say: 'Here it is up close, on the left. Each copper ion that hits the iron takes an iron atom\'s place, so copper builds up as a solid and iron goes into the solution. On the right, copper in iron sulfate does nothing, because copper is the less reactive metal.', show: 'dp.tally', play: 'dp.go' },
        { say: 'An element pushing another element out of a compound is a single displacement.' },
      ],
    },
    {
      chapter: 'Step 3: Part (d)',
      layout: 'center',
      main: [
        precipitate(
          'bs',
          {
            cation: { name: 'barium ion', tone: 'theta' },
            anion: { name: 'sulfate ion', tone: 'bad', size: 1.2 },
            withCation: { name: 'chloride ion', tone: 'good', size: 1.1 },
            withAnion: { name: 'sodium ion', tone: 'hyp' },
          },
          { label: 'barium chloride + sodium sulfate', solid: 'barium sulfate', seed: 3 },
        ),
      ],
      lines: [
        { say: 'Step three, part d. Two compounds, barium chloride and sodium sulfate, both dissolved. Here are their ions, just mixed.', show: ['bs', 'bs.labels', 'bs.key'], play: 'bs.mix' },
        { say: 'Each barium ion that meets a sulfate ion locks on to it, and they sink together as solid barium sulfate. The sodium and chloride ions are left together in the solution.', show: 'bs.tally' },
        { say: 'Barium has swapped its chloride partner for sulfate, and sodium has swapped sulfate for chloride. Two compounds swapping partners is a double displacement.' },
      ],
    },
    {
      chapter: 'Step 4: Part (e)',
      layout: 'center',
      main: [methaneBurning('mb', 380), { kind: 'math', id: 'e', size: 'md', lines: ['\\ce{CH4 + 2O2 -> CO2 + 2H2O} \\quad \\good{\\text{combustion}}'] }],
      lines: [
        { say: 'Step four, part e. Methane is a fuel made of carbon and hydrogen, and it reacts with oxygen to make carbon dioxide and water. Watch it burn.', show: 'mb', play: 'mb.burn', playDelay: 0.3 },
        { say: 'The carbon atom ends up in carbon dioxide, and the four hydrogen atoms in two water molecules. A fuel burning in oxygen is a combustion.', show: 'e' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'ans',
          head: ['Part', 'Clue', 'Type'],
          rows: [
            ['(a)', 'One product', '**Synthesis**'],
            ['(b)', 'One reactant', '**Decomposition**'],
            ['(c)', 'Element swaps into a compound', '**Single displacement**'],
            ['(d)', 'Two compounds swap partners', '**Double displacement**'],
            ['(e)', 'Fuel + oxygen → carbon dioxide + water', '**Combustion**'],
          ],
        },
      ],
      lines: [
        { say: 'Here is the whole answer: synthesis, decomposition, single displacement, double displacement and combustion.', show: 'ans' },
        { say: 'A quick check: each type turns up exactly once, and each answer rests on a clue we can point to in the equation.' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Wrong answer', 'Where it comes from'],
          rows: [
            ['(b) synthesis', 'Saw $\\ce{O2}$ and thought of **burning**'],
            ['(c) double displacement', 'Missed that iron starts as an **element**'],
            ['(e) double displacement', 'Two in, two out, but it is a **fuel** in oxygen'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Seeing oxygen in part b and calling it a synthesis or a burning. Oxygen is a product there, not a reactant. Count the reactants: there is only one.', focus: 'traps.0' },
        { say: 'Calling part c a double displacement because there are two substances on each side. Iron starts as an element on its own, so only one swap happens.', focus: 'traps.1' },
        { say: 'And calling part e a double displacement. Check for combustion first: a fuel and oxygen making carbon dioxide and water.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'What type of reaction is $\\ce{Cl2 + 2KBr -> 2KCl + Br2}$?',
          choices: ['Single displacement', 'Double displacement', 'Synthesis', 'Decomposition'],
          answer: 0,
          working: 'Chlorine, an element, pushes bromine out of potassium bromide.',
        },
      ],
      lines: [
        { say: 'Your turn. Chlorine reacts with potassium bromide to make potassium chloride and bromine. What type of reaction is it? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Chlorine is an element on its own, and it pushes bromine out of the compound. So it is a single displacement, choice A.', show: 'q2.answer' },
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
          items: ['Fuel + oxygen → carbon dioxide + water: **combustion**', 'One product: **synthesis**. One reactant: **decomposition**', 'Element swaps in: **single**. Two compounds swap: **double**'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Check for combustion first: a fuel and oxygen making carbon dioxide and water.', show: 'sum.0' },
        { say: 'Then count. One product is a synthesis, and one reactant is a decomposition.', show: 'sum.1' },
        { say: 'An element swapping into a compound is a single displacement, and two compounds swapping partners is a double displacement. For more on types of reactions, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
