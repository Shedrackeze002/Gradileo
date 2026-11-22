import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { LADDER_ROWS, ladder } from '@/content/chem30/videos/lib/c30-4b-figures.ts';
import { hfAndWater } from '@/content/chem30/videos/lib/c30-protons.ts';

// Exam question for Chemistry 30 lesson 4.5 (predicting acid-base reactions): hydrofluoric acid
// added to sodium cyanide solution. Written by Gradileo in the style of a high-school unit test,
// with both Ka values given in the question. The strongest acid present is HF and the strongest
// base CN- (Na+ is a spectator, and CN- is a stronger base than water), so
// HF(aq) + CN-(aq) <=> F-(aq) + HCN(aq); HF (6.6e-4) is a far stronger acid than HCN (6.2e-10),
// so products are favoured.
//
// The pictures: the lesson's hydrogen fluoride giving its proton to water (src/video/molecules.ts),
// and its table of relative acid strengths with the proton's path from HF down to CN-.

const QUESTION = 'Hydrofluoric acid is added to a solution of sodium cyanide. Ka(HF) = 6.6 × 10⁻⁴ and Ka(HCN) = 6.2 × 10⁻¹⁰. (a) Write the equation for the main proton transfer that occurs. (b) Are the reactants or the products favoured? Explain.';

const table = figure(
  'lad',
  [
    ladder({
      rows: LADDER_ROWS.filter((r) => ['hcl', 'h3o', 'hf', 'hac', 'hcn', 'h2o'].includes(r.id)),
      marks: [
        { id: 'a-hf', row: 'hf', col: 'acid', tone: 'good' },
        { id: 'b-cn', row: 'hcn', col: 'base', tone: 'adj' },
        { id: 'b-h2o', row: 'h3o', col: 'base', tone: 'muted' },
        { id: 'a-hcn', row: 'hcn', col: 'acid' },
      ],
      moves: [{ id: 'down', from: 'hf', to: 'hcn' }],
    }),
  ],
);
const head = ['lad.head', 'lad.rows'];

const video: Explainer = {
  id: 'xq-c30-4-5',
  lessonId: '',
  exam: {
    lesson: 'c30-4-5',
    source: 'Exam-style question written by Gradileo, in the style of a high-school chemistry unit test',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Hydrofluoric Acid Meets Cyanide. Predicting Acid–Base Reactions',
  thumbnailTitle: 'HF Meets Cyanide',
  thumbnail: 'lad',
  summary:
    'A test-style question, solved one small step at a time: hydrofluoric acid is added to sodium cyanide solution. What is the main proton transfer, and which side is favoured? We find the strongest acid and the strongest base, write HF + CN⁻ ⇌ F⁻ + HCN, and compare the two acids: HF is far stronger, so products are favoured.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'HF Meets Cyanide', subtitle: 'Which way does the proton go?' }],
      lines: [
        { say: 'In this video, we solve a test-style question about predicting an acid-base reaction. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of a high school chemistry unit test, and everything you need is in the question.' },
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
          prompt: 'Hydrofluoric acid is added to a solution of sodium cyanide. $K_a(\\ce{HF}) = 6.6 \\times 10^{-4}$ and $K_a(\\ce{HCN}) = 6.2 \\times 10^{-10}$. (a) Write the equation for the main proton transfer that occurs. (b) Are the reactants or the products favoured? Explain.',
          answer: 'HF + CN⁻ ⇌ F⁻ + HCN; products favoured, because HF is the stronger acid',
        },
      ],
      lines: [
        { say: 'Here is the question. Hydrofluoric acid is added to a solution of sodium cyanide. K a for H F is six point six times ten to the minus four, and K a for H C N is six point two times ten to the minus ten. Part a: write the equation for the main proton transfer. Part b: are the reactants or the products favoured? Explain.', show: 'q', caption: 'Here is the question. Hydrofluoric acid is added to a solution of sodium cyanide. Ka(HF) = 6.6 × 10⁻⁴ and Ka(HCN) = 6.2 × 10⁻¹⁰. (a) Write the equation for the main proton transfer that occurs. (b) Are the reactants or the products favoured? Explain.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Which particle **gives** a proton, which one **takes** it, and does the reaction mostly **go**?' }],
      lines: [
        { say: 'Part a asks which particle gives a proton and which takes it. Part b asks whether that transfer mostly happens, or mostly turns back.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [hfAndWater('pt'), { kind: 'math', id: 'k', size: 'md', lines: ['\\text{acid} + \\text{base} \\rightleftharpoons \\text{conjugate base} + \\text{conjugate acid}'] }],
      lines: [
        { say: 'Here is what we need. A hydrogen fluoride molecule and a water molecule. Watch the green hydrogen.', show: 'pt' },
        { say: 'It leaves as a bare proton and bonds to the water. Every acid-base reaction is one proton moving like this, from an acid to a base.', play: 'pt.go' },
        { say: 'And it can move back, so every proton transfer is an equilibrium, with an acid on each side.', show: 'k.0' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['List the particles and find the **strongest acid** and **strongest base**', 'Move **one proton** from one to the other', 'Compare the **acid on each side**'] }],
      lines: [
        { say: 'Here is the plan. List the particles in the mixture, and find the strongest acid and the strongest base.', show: 'plan.0' },
        { say: 'Move one proton from that acid to that base.', show: 'plan.1' },
        { say: 'Then compare the acid on each side: the stronger acid gives its proton away.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The particles',
      layout: 'split',
      leftWidth: 560,
      left: [table],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\ce{HF},\\ \\ce{Na+},\\ \\ce{CN-},\\ \\ce{H2O}', '\\text{strongest acid: } \\good{\\ce{HF}}', '\\text{strongest base: } \\ce{CN-}'] }],
      lines: [
        { say: 'Step one. The mixture holds hydrogen fluoride molecules, sodium ions, cyanide ions and water. The sodium ion is a spectator: it neither gives nor takes a proton.', show: ['m.0', ...head], caption: 'Step one. The mixture holds HF molecules, Na⁺ ions, CN⁻ ions and water. The sodium ion is a spectator: it neither gives nor takes a proton.' },
        { say: 'On the table, hydrogen fluoride is the highest acid in the mixture, above water.', show: ['m.1', 'lad.a-hf'], focus: 'lad.a-hf', caption: 'On the table, HF is the highest acid in the mixture, above water.' },
        { say: 'And the cyanide ion is the lowest base, below water in the right column, so it is the strongest base.', show: ['m.2', 'lad.b-cn', 'lad.b-h2o'], focus: 'lad.b-cn', caption: 'And the CN⁻ ion is the lowest base, below water in the right column, so it is the strongest base.' },
      ],
    },
    {
      chapter: 'Step 2: The equation',
      layout: 'center',
      main: [{ kind: 'math', id: 'e', size: 'lg', lines: ['\\ce{HF(aq) + CN-(aq) <=> F-(aq) + HCN(aq)}'] }],
      lines: [
        { say: 'Step two. Hydrogen fluoride gives one proton to the cyanide ion. It becomes the fluoride ion, and cyanide becomes hydrogen cyanide. That is part a.', show: 'e.0', focus: 'e.0', caption: 'Step two. HF gives one proton to CN⁻. It becomes F⁻, and CN⁻ becomes HCN. That is part a.' },
      ],
    },
    {
      chapter: 'Step 3: Which side is favoured?',
      layout: 'split',
      leftWidth: 560,
      left: [table],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{left: } \\ce{HF},\\ 6.6 \\times 10^{-4}', '\\text{right: } \\ce{HCN},\\ 6.2 \\times 10^{-10}', '\\good{\\text{products favoured}}'] }],
      lines: [
        { say: 'Step three. There is an acid on each side: hydrogen fluoride on the left, and hydrogen cyanide on the right.', show: [...head, 'lad.a-hf', 'lad.a-hcn', 'm.0', 'm.1'], caption: 'Step three. There is an acid on each side: HF on the left, and HCN on the right.' },
        { say: 'Hydrogen fluoride\'s K a is about a million times larger, so it is the stronger acid. The reaction runs mostly the way the stronger acid gives its proton away: to the right. Products are favoured. That is part b.', show: 'm.2', focus: 'm.2', caption: 'HF\'s Ka is about a million times larger, so it is the stronger acid. The reaction runs mostly the way the stronger acid gives its proton away: to the right. Products are favoured. That is part b.' },
        { say: 'On the table, the acid is above the base, so the proton goes downhill.', show: 'lad.down', focus: 'lad.down' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'math', id: 'x', size: 'md', lines: ['\\text{stronger acid} + \\text{stronger base} \\to \\text{weaker acid} + \\text{weaker base}\\ \\checkmark'] },
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) $\\ce{HF(aq) + CN-(aq) <=> F-(aq) + HCN(aq)}$. (b) **Products** are favoured, because $\\ce{HF}$ is a stronger acid than $\\ce{HCN}$.' },
      ],
      lines: [
        { say: 'Does it make sense? Reactions favour the side with the weaker acid and the weaker base. Hydrogen cyanide is a weaker acid than hydrogen fluoride, and fluoride is a weaker base than cyanide, so the products side is the weaker side.', show: 'x.0' },
        { say: 'So the main reaction is hydrogen fluoride plus cyanide, in equilibrium with fluoride plus hydrogen cyanide, and products are favoured, because hydrogen fluoride is the stronger acid.', show: 'ans', caption: 'So the main reaction is HF + CN⁻ ⇌ F⁻ + HCN, and products are favoured, because HF is the stronger acid.' },
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
            ['$\\ce{HF + H2O}$', 'Chose **water** as the base, not the stronger $\\ce{CN-}$'],
            ['$\\ce{HF + Na+}$', 'Gave the proton to a **spectator** ion'],
            ['**Reactants** favoured', 'Took the **smaller** $K_a$ as the stronger acid'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Hydrogen fluoride plus water is a real reaction, but cyanide is a much stronger base than water, so it takes the proton.', focus: 'traps.0' },
        { say: 'Hydrogen fluoride plus sodium ion gives the proton to a spectator. A positive metal ion cannot take a proton.', focus: 'traps.1' },
        { say: 'And reactants favoured reads the K a values the wrong way round. The larger K a is the stronger acid.', focus: 'traps.2', caption: 'And reactants favoured reads the Ka values the wrong way round. The larger Ka is the stronger acid.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: '$\\ce{NH4+(aq) + CO3^2-(aq) <=> NH3(aq) + HCO3-(aq)}$, with $K_a(\\ce{NH4+}) = 5.6 \\times 10^{-10}$ and $K_a(\\ce{HCO3-}) = 4.7 \\times 10^{-11}$. Which side is favoured?',
          choices: ['Products: $\\ce{NH4+}$ is the stronger acid', 'Reactants: $\\ce{HCO3-}$ is the stronger acid', 'Reactants: $\\ce{CO3^2-}$ is the weaker base', 'Neither: the two sides are equal'],
          answer: 0,
          working: '$5.6 \\times 10^{-10} > 4.7 \\times 10^{-11}$, so $\\ce{NH4+}$, on the left, is the stronger acid and gives its proton away.',
        },
      ],
      lines: [
        { say: 'Your turn. The ammonium ion and the carbonate ion are in equilibrium with ammonia and the hydrogen carbonate ion. K a for ammonium is five point six times ten to the minus ten, and for hydrogen carbonate four point seven times ten to the minus eleven. Which side is favoured? Pause the video and try it.', caption: 'Your turn. NH₄⁺ + CO₃²⁻ ⇌ NH₃ + HCO₃⁻, with Ka(NH₄⁺) = 5.6 × 10⁻¹⁰ and Ka(HCO₃⁻) = 4.7 × 10⁻¹¹. Which side is favoured? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Five point six times ten to the minus ten is larger than four point seven times ten to the minus eleven, so ammonium, on the left, is the stronger acid. Products are favoured, just: choice A.', caption: '5.6 × 10⁻¹⁰ is larger than 4.7 × 10⁻¹¹, so NH₄⁺, on the left, is the stronger acid. Products are favoured, just: choice A.', show: 'q2.answer' },
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
          items: ['The main reaction: **strongest acid** to **strongest base**', 'Spectator ions like $\\ce{Na+}$ take **no part**', 'The side with the **weaker acid** is favoured'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The main reaction moves one proton from the strongest acid present to the strongest base.', show: 'sum.0' },
        { say: 'Spectator ions, like sodium, take no part.', show: 'sum.1' },
        { say: 'And the equilibrium favours the side with the weaker acid and weaker base. For more on predicting acid-base reactions, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.2', caption: 'And the equilibrium favours the side with the weaker acid and weaker base. For more on predicting acid–base reactions, watch this lesson\'s explainer videos on Gradileo.' },
      ],
    },
  ],
};

export default video;
