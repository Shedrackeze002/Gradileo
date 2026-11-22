import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { pick } from './lib/pick.ts';
import { settle, timeGraph } from '@/content/chem30/videos/lib/c30-4a-figures.ts';
import { n2o4 } from '@/content/chem30/videos/lib/c30-particles.ts';
import dynamic from '@/content/chem30/videos/c30-4-1.ts';

// Exam question for Chemistry 30 lesson 4.1 (dynamic equilibrium): if the concentrations of
// products and reactants are equal, is the system at equilibrium? The question is OpenStax
// Chemistry 2e's own, word for word (end-of-chapter exercise 5, section 13.1, CC BY-NC-SA 4.0).
// The answer, which matches the book's: not necessarily. At equilibrium the forward and reverse
// rates are equal, so the concentrations stay constant, at whatever values they settle; equal
// concentrations can happen on the way, and equilibrium concentrations are seldom equal.
//
// The pictures: the lesson's N2O4 and NO2 molecules splitting and pairing (src/video/chem.ts), its
// rate arrows, and its concentration graph for a flask that starts with 0.80 mol/L of N2O4, here
// with a mark where the two curves cross (about 27 s, at 0.53 mol/L) before they level off at
// 40 s (0.50 and 0.60 mol/L).

const QUESTION = 'If the concentrations of products and reactants are equal, is the system at equilibrium?';

const curves = timeGraph({
  x: [0, 80],
  y: [0, 1],
  xStep: 10,
  yStep: 0.1,
  titles: { x: '\\text{Time (s)}', y: '\\text{Concentration (mol/L)}' },
  curves: [
    { id: 'n2o4', points: settle(0.8, 0.5, 40, 80, 4), tone: 'adj', label: '[\\ce{N2O4}]', at: [62, 0.5], place: 'below' },
    { id: 'no2', points: settle(0, 0.6, 40, 80, 4), tone: 'opp', label: '[\\ce{NO2}]', at: [62, 0.6], place: 'above' },
  ],
  marks: [
    { id: 'cross', x: 26.7, tone: 'bad' },
    { id: 'eq', x: 40, tone: 'good' },
  ],
});
const graph = figure('g', [curves.part], 520);

const video: Explainer = {
  id: 'xq-c30-4-1',
  lessonId: '',
  exam: {
    lesson: 'c30-4-1',
    source: 'OpenStax, Chemistry 2e, end-of-chapter exercise 5, section 13.1, Chemical Equilibria',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/chemistry-2e/pages/13-exercises',
    question: QUESTION,
  },
  title: 'Exam Question: Equal Concentrations and Equilibrium. Dynamic Equilibrium',
  thumbnailTitle: 'Equal Amounts, Equilibrium?',
  thumbnail: 'eq',
  summary:
    'A real test question, solved one small step at a time: if the concentrations of products and reactants are equal, is the system at equilibrium? We look at what equilibrium really means, equal forward and reverse rates, and use a concentration graph to see that the answer is: not necessarily.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Equal Amounts, Equilibrium?', subtitle: 'What equilibrium really means' }],
      lines: [
        { say: 'In this video, we solve a real test question about dynamic equilibrium. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Chemistry textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'Not necessarily' }],
      lines: [
        { say: 'Here is the question, exactly as it was printed. If the concentrations of products and reactants are equal, is the system at equilibrium?', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Does **equilibrium** mean equal **amounts**, or something else?' }],
      lines: [
        { say: 'The word equilibrium sounds like balance, and it is tempting to think that means equal amounts. The question checks whether we know what is actually equal at equilibrium.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [n2o4('eq', { seed: 6 })],
      lines: [
        { say: 'Here is what we need. Each blue pair is a dye-nitrogen tetroxide molecule, and each orange particle is a nitrogen dioxide molecule. At first there are only pairs, so molecules can only split, and the orange count climbs quickly.', caption: 'Here is what we need. Each blue pair is a dinitrogen tetroxide molecule, and each orange particle is a nitrogen dioxide molecule. At first there are only pairs, so molecules can only split, and the orange count climbs quickly.', show: ['eq', 'eq.labels', 'eq.key', 'eq.tally'], play: 'eq.go' },
        { say: 'Then the count flickers up and down by a few, but stays around the same value. Pairs split as fast as new pairs form. That is dynamic equilibrium.', focus: 'eq.tally' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Say what is **equal** at equilibrium', 'Look at a **concentration graph**', 'Test equal concentrations against the **rule**'] }],
      lines: [
        { say: 'Here is the plan. First, say exactly what is equal at equilibrium.', show: 'plan.0' },
        { say: 'Then look at a concentration graph to see what the amounts do.', show: 'plan.1' },
        { say: 'Then test a moment of equal concentrations against that rule.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Equal rates',
      layout: 'center',
      main: [pick(dynamic, 'r'), { kind: 'callout', id: 'def', tone: 'key', title: 'At equilibrium', md: 'The forward and reverse **rates** are equal, so the **concentrations stay constant**.' }],
      lines: [
        { say: 'Step one. At the start, only the forward reaction happens. As the reactant is used up, it slows, and the reverse reaction speeds up.', show: ['r.stage-0', 'r.stage-1'] },
        { say: 'At equilibrium, the two rates are equal.', show: 'r.stage-2', focus: 'r.stage-2' },
        { say: 'So what is equal at equilibrium is the rates. Because each substance is made as fast as it is used up, its concentration stops changing. Nothing says the concentrations equal each other.', show: 'def' },
      ],
    },
    {
      chapter: 'Step 2: The graph',
      layout: 'split',
      leftWidth: 560,
      left: [graph],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\ce{N2O4(g) <=> 2NO2(g)}', '[\\ce{N2O4}] = 0.50\\ \\text{mol/L}', '[\\ce{NO2}] = 0.60\\ \\text{mol/L}'] }],
      lines: [
        { say: 'Step two. Here is the lesson\'s flask, which starts with zero point eight zero moles per litre of dye-nitrogen tetroxide. Its concentration falls, while nitrogen dioxide rises from zero.', caption: 'Step two. Here is the lesson\'s flask, which starts with 0.80 mol/L of dinitrogen tetroxide. Its concentration falls, while nitrogen dioxide rises from zero.', show: ['g.grid', 'g.axes', 'g.n2o4', 'g.n2o4-lab', 'g.no2', 'g.no2-lab', 'm.0'] },
        { say: 'Both curves go flat at forty seconds. That is equilibrium, and the concentrations there are zero point five zero and zero point six zero moles per litre: constant, but not equal.', caption: 'Both curves go flat at 40 s. That is equilibrium, and the concentrations there are 0.50 and 0.60 mol/L: constant, but not equal.', show: ['g.eq', 'm.1', 'm.2'], focus: 'g.eq' },
      ],
    },
    {
      chapter: 'Step 3: The moment they match',
      layout: 'split',
      leftWidth: 560,
      left: [graph],
      right: [{ kind: 'callout', id: 'cross', tone: 'mistake', title: 'Equal, but still changing', md: 'At about **27 s** both are about $0.53\\ \\text{mol/L}$, but the curves are still **moving**, so the rates are **not** equal yet.' }],
      lines: [
        { say: 'Step three. Look earlier, at about twenty seven seconds. The two curves cross, so here the concentrations are equal, about zero point five three moles per litre each.', caption: 'Step three. Look earlier, at about 27 s. The two curves cross, so here the concentrations are equal, about 0.53 mol/L each.', show: ['g.grid', 'g.axes', 'g.n2o4', 'g.n2o4-lab', 'g.no2', 'g.no2-lab', 'g.eq', 'g.cross'], focus: 'g.cross' },
        { say: 'But the curves are still moving there. Dye-nitrogen tetroxide is still being used up faster than it forms, so the system is not at equilibrium yet.', caption: 'But the curves are still moving there. Dinitrogen tetroxide is still being used up faster than it forms, so the system is not at equilibrium yet.', show: 'cross' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'math', id: 'x', size: 'md', lines: ['\\text{equal concentrations at } 27\\ \\text{s, not equilibrium}', '\\text{unequal concentrations at } 40\\ \\text{s, equilibrium}'] },
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '**Not necessarily.** At equilibrium the **rates** are equal and the concentrations are **constant**; the concentrations themselves can be any values.' },
      ],
      lines: [
        { say: 'Does it hold up? The one graph shows both ways it can fail: equal concentrations that are not at equilibrium, and an equilibrium where the concentrations are not equal.', show: ['x.0', 'x.1'] },
        { say: 'So the answer is: not necessarily. At equilibrium the forward and reverse rates are equal, so the concentrations stay constant, but they can settle at any values. That matches the book.', show: 'ans' },
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
            ['Yes, always', 'Mixed up equal **amounts** with equal **rates**'],
            ['Yes, the reaction **stopped**', 'Forgot equilibrium is **dynamic**'],
            ['No, never', 'Equal values **can** happen, just by **chance**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Yes, always, mixes up the amounts with the rates. It is the rates that are equal at equilibrium.', focus: 'traps.0' },
        { say: 'Yes, because the reaction stopped, forgets that equilibrium is dynamic. Both reactions keep going at the same rate.', focus: 'traps.1' },
        { say: 'And no, never, goes too far. An equilibrium could settle with equal concentrations, but only by chance. That is why the answer is not necessarily.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A sealed flask of $\\ce{N2O4(g) <=> 2NO2(g)}$ is kept at constant temperature, and its brown colour stops changing. Which statement is true?',
          choices: ['The forward and reverse reactions go on at **equal rates**', 'Both reactions have **stopped**', '$[\\ce{N2O4}]$ equals $[\\ce{NO2}]$', 'All the $\\ce{N2O4}$ has **reacted**'],
          answer: 0,
          working: 'A constant colour means constant concentrations, which comes from equal forward and reverse rates.',
        },
      ],
      lines: [
        { say: 'Your turn. A sealed flask of dye-nitrogen tetroxide and nitrogen dioxide is kept at constant temperature, and its brown colour stops changing. Which statement is true? Pause the video and try it.', caption: 'Your turn. A sealed flask of N₂O₄ ⇌ 2NO₂ is kept at constant temperature, and its brown colour stops changing. Which statement is true? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'A constant colour means the concentrations are constant, and that comes from the forward and reverse reactions going on at equal rates: choice A.', show: 'q2.answer' },
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
          items: ['At equilibrium the **rates** are equal', 'So concentrations are **constant**, at any values', 'Equal concentrations **≠** equilibrium'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. At equilibrium, the forward and reverse rates are equal.', show: 'sum.0' },
        { say: 'So the concentrations stay constant, at whatever values they settle.', show: 'sum.1' },
        { say: 'Equal concentrations do not tell you a system is at equilibrium. Constant ones do. For more on dynamic equilibrium, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
