import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import synthesis from '@/content/chemmore/videos/cx-12-7.ts';

// Exam question for More Chemistry Topics lesson 12.7 (organic synthesis): a two-step route from
// bromoethane to propanoic acid, its overall yield, and why a route through ethanol cannot work.
// Written by Gradileo in the style of an A level chemistry exam.
//
// The picture is the lesson's three kinds of reaction step (src/video/molecules.ts).

const QUESTION = 'A student plans to make propanoic acid, CH₃CH₂COOH, from bromoethane, CH₃CH₂Br, in two steps. In step 1, bromoethane is converted into propanenitrile, CH₃CH₂CN. In step 2, propanenitrile is heated under reflux with dilute hydrochloric acid to give propanoic acid. (a) Give the reagent for step 1 and name the type of mechanism. (b) The yield of step 1 is 80% and the yield of step 2 is 65%. Calculate the overall yield. (c) Explain why propanoic acid cannot be made from bromoethane by first making ethanol and then oxidising it.';

const video: Explainer = {
  id: 'xq-cx-12-7',
  lessonId: '',
  exam: {
    lesson: 'cx-12-7',
    source: 'Exam-style question written by Gradileo, in the style of an A level chemistry exam',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: From Bromoethane to Propanoic Acid in Two Steps. Organic Synthesis',
  thumbnailTitle: 'Planning a Synthesis',
  thumbnail: 'tk',
  summary:
    'A test-style question, solved one small step at a time: how is bromoethane turned into propanenitrile, what is the overall yield of the two steps, and why can a route through ethanol not give propanoic acid? Potassium cyanide in ethanol substitutes the bromine by nucleophilic substitution; the overall yield is 0.80 × 0.65 = 52%; and oxidising ethanol keeps two carbons, giving ethanoic acid, because only cyanide adds a carbon.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Planning a Synthesis', subtitle: 'From bromoethane to propanoic acid' }],
      lines: [
        { say: 'In this video, we solve a test-style question about planning an organic synthesis. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of an A level chemistry exam question, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'KCN in ethanol, nucleophilic substitution; 52%; ethanol keeps only two carbons' }],
      lines: [
        { say: 'Here is the question. A student plans to make propanoic acid from bromoethane in two steps. In step 1, bromoethane is converted into propanenitrile. In step 2, propanenitrile is heated under reflux with dilute hydrochloric acid to give propanoic acid. Part a: give the reagent for step 1 and name the type of mechanism. Part b: the yield of step 1 is 80 percent and the yield of step 2 is 65 percent. Calculate the overall yield. Part c: explain why propanoic acid cannot be made from bromoethane by first making ethanol and then oxidising it.', caption: 'Here is the question. A student plans to make propanoic acid, CH₃CH₂COOH, from bromoethane, CH₃CH₂Br, in two steps. In step 1, bromoethane is converted into propanenitrile, CH₃CH₂CN. In step 2, propanenitrile is heated under reflux with dilute hydrochloric acid to give propanoic acid. Part a: give the reagent for step 1 and name the type of mechanism. Part b: the yield of step 1 is 80% and the yield of step 2 is 65%. Calculate the overall yield. Part c: explain why propanoic acid cannot be made from bromoethane by first making ethanol and then oxidising it.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Count the **carbons**, name each **step**, and multiply the **yields**' }],
      lines: [
        { say: 'Bromoethane has two carbons and propanoic acid has three, so one step must add a carbon. Then we combine the yields of the two steps.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(synthesis, 'tk')],
      lines: [
        { say: 'Here is what we need. Most steps in a synthesis are one of three kinds. In addition, two molecules join into one.', show: 'tk', play: 'tk.add' },
        { say: 'In substitution, one atom or group swaps for another. Step 1 of our route is a substitution.', play: 'tk.sub' },
        { say: 'And in elimination, a small molecule leaves, and a double bond forms.', play: 'tk.elim' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Cyanide** adds one carbon', 'Overall yield = **product** of the step yields', 'Oxidation keeps the **same** number of carbons'] }],
      lines: [
        { say: 'Here is the plan. The cyanide ion is the reagent that adds one carbon to a chain.', show: 'plan.0' },
        { say: 'The overall yield is the step yields multiplied together.', show: 'plan.1' },
        { say: 'And oxidising an alcohol never changes the number of carbons.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Bromoethane to propanenitrile',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\ce{CH3CH2Br + KCN -> CH3CH2CN + KBr}', '\\good{\\text{KCN in ethanol: nucleophilic substitution}}'] }],
      lines: [
        { say: 'Step one. The reagent is potassium cyanide, dissolved in ethanol and heated under reflux.', show: 'm.0' },
        { say: 'The cyanide ion uses its lone pair to attack the slightly positive carbon, and the bromide ion leaves. That is nucleophilic substitution. That is part a.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: The overall yield',
      layout: 'center',
      main: [{ kind: 'math', id: 'y', size: 'md', lines: ['\\text{overall} = 0.80 \\times 0.65', '\\good{= 0.52 = 52\\%}'] }],
      lines: [
        { say: 'Step two. Step 1 keeps 80 percent of the material, and step 2 keeps 65 percent of what is left. So we multiply: 0.80 times 0.65.', caption: 'Step two. Step 1 keeps 80% of the material, and step 2 keeps 65% of what is left. So we multiply: 0.80 × 0.65.', show: 'y.0' },
        { say: 'That is 0.52, an overall yield of 52 percent. That is part b.', caption: 'That is 0.52, an overall yield of 52%. That is part b.', show: 'y.1', focus: 'y.1' },
      ],
    },
    {
      chapter: 'Step 3: Why not through ethanol?',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Route', 'Carbons', 'Product'],
          rows: [
            ['bromoethane → ethanol → acid', '2 → 2 → **2**', '**ethanoic acid**'],
            ['bromoethane → nitrile → acid', '2 → **3** → 3', '**propanoic acid**'],
          ],
        },
      ],
      lines: [
        { say: 'Step three. Bromoethane has two carbons. Turning it into ethanol and oxidising it keeps two carbons all the way, so the product would be ethanoic acid.', show: ['t', 't.0'], focus: 't.0' },
        { say: 'Propanoic acid needs three carbons, and only the cyanide step adds the extra one. That is part c.', show: 't.1', focus: 't.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) **KCN in ethanol**; **nucleophilic substitution**. (b) 0.80 × 0.65 = **52%**. (c) Through ethanol the chain keeps **two carbons**, giving **ethanoic acid**; only **cyanide** adds the third.' },
      ],
      lines: [
        { say: 'Does it make sense? The overall yield is lower than either step on its own, as it must be, because every step loses some product.', show: 'ans' },
        { say: 'So cyanide adds the carbon by nucleophilic substitution, the overall yield is 52 percent, and the ethanol route ends with the wrong acid.', caption: 'So cyanide adds the carbon by nucleophilic substitution, the overall yield is 52%, and the ethanol route ends with the wrong acid.' },
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
            ['Overall yield **72.5%**', 'That is the **average**: multiply'],
            ['Overall yield **145%**', 'That is the **sum**: multiply'],
            ['**Aqueous** KCN', 'Use KCN in **ethanol**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Averaging the two yields gives 72.5 percent, but the losses build on each other.', caption: 'Averaging the two yields gives 72.5%, but the losses build on each other.', focus: 'traps.0' },
        { say: 'Adding them gives more than 100 percent, which cannot be right.', caption: 'Adding them gives more than 100%, which cannot be right.', focus: 'traps.1' },
        { say: 'And the potassium cyanide is dissolved in ethanol. In water, hydroxide ions would compete and make ethanol instead.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which reagent adds one carbon atom to a carbon chain?',
          choices: ['NaOH(aq)', 'NH₃', 'KCN', 'H₂SO₄'],
          answer: 2,
          working: 'The cyanide ion, CN⁻, brings its own carbon atom with it when it substitutes or adds.',
        },
      ],
      lines: [
        { say: 'Your turn. Which reagent adds one carbon atom to a carbon chain? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The cyanide ion brings its own carbon atom with it, so potassium cyanide: choice C.', show: 'q2.answer' },
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
          items: ['Count the carbons: **cyanide** adds one', 'Overall yield = **product** of step yields', 'Fewer steps: **higher** overall yield'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Count the carbons in the start and the target, and use cyanide to add one.', show: 'sum.0' },
        { say: 'The overall yield is the step yields multiplied together.', show: 'sum.1' },
        { say: 'So shorter routes usually give a higher overall yield. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
