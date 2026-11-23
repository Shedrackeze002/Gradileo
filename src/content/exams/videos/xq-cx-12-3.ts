import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import esters from '@/content/chemmore/videos/cx-12-3.ts';

// Exam question for More Chemistry Topics lesson 12.3 (esters and acyl chlorides): naming ethyl
// ethanoate, why alkaline hydrolysis goes to completion, and making the ester from ethanoyl
// chloride. Written by Gradileo in the style of an A level chemistry exam.
//
// The picture is the lesson's ethanoyl chloride meeting ethanol (src/video/molecules.ts).

const QUESTION = 'This question is about the ester CH₃COOCH₂CH₃. (a) Name the ester, and name the carboxylic acid and the alcohol it can be made from. (b) The ester is heated under reflux with sodium hydroxide solution. Name the products, and explain why this hydrolysis goes to completion while hydrolysis with dilute acid does not. (c) The ester can also be made by adding ethanoyl chloride to ethanol. Name the type of mechanism and the other product, and give one advantage of this method over using the carboxylic acid.';

const video: Explainer = {
  id: 'xq-cx-12-3',
  lessonId: '',
  exam: {
    lesson: 'cx-12-3',
    source: 'Exam-style question written by Gradileo, in the style of an A level chemistry exam',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Ethyl Ethanoate, Its Hydrolysis and Ethanoyl Chloride. Esters and Acyl Chlorides',
  thumbnailTitle: 'Esters',
  thumbnail: 'ac',
  summary:
    'A test-style question, solved one small step at a time: what is CH₃COOCH₂CH₃ called and what is it made from, why does alkaline hydrolysis go to completion, and why use ethanoyl chloride to make it? It is ethyl ethanoate, from ethanoic acid and ethanol; sodium hydroxide gives sodium ethanoate and ethanol, and the carboxylate ion cannot react back; and ethanoyl chloride reacts by nucleophilic addition–elimination, giving HCl, quickly and completely.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Esters', subtitle: 'Naming, hydrolysis and acyl chlorides' }],
      lines: [
        { say: 'In this video, we solve a test-style question about esters. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of an A level chemistry exam question, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'Ethyl ethanoate; sodium ethanoate and ethanol; addition–elimination, HCl, not reversible' }],
      lines: [
        { say: 'Here is the question. This question is about the ester C H three C O O C H two C H three. Part a: name the ester, and name the carboxylic acid and the alcohol it can be made from. Part b: the ester is heated under reflux with sodium hydroxide solution. Name the products, and explain why this hydrolysis goes to completion while hydrolysis with dilute acid does not. Part c: the ester can also be made by adding ethanoyl chloride to ethanol. Name the type of mechanism and the other product, and give one advantage of this method over using the carboxylic acid.', caption: 'Here is the question. This question is about the ester CH₃COOCH₂CH₃. Part a: name the ester, and name the carboxylic acid and the alcohol it can be made from. Part b: the ester is heated under reflux with sodium hydroxide solution. Name the products, and explain why this hydrolysis goes to completion while hydrolysis with dilute acid does not. Part c: the ester can also be made by adding ethanoyl chloride to ethanol. Name the type of mechanism and the other product, and give one advantage of this method over using the carboxylic acid.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Split the ester into its **acid** and **alcohol** parts, then ask which reactions can **go back**' }],
      lines: [
        { say: 'An ester is built from an acid part and an alcohol part. The key question in parts b and c is which reactions are reversible and which are not.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(esters, 'ac')],
      lines: [
        { say: 'Here is what we need. Here is ethanoyl chloride meeting ethanol, with every atom drawn.', show: 'ac' },
        { say: 'The chlorine atom and the alcohol’s hydrogen leave as hydrogen chloride, and the carbon bonds to the alcohol’s oxygen: the ester ethyl ethanoate.', play: 'ac.go' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Name: **alcohol part** first, then **-oate**', 'Alkali makes a **carboxylate ion**, which cannot react back', 'Acyl chloride: **addition–elimination**, not reversible'] }],
      lines: [
        { say: 'Here is the plan. An ester is named with the alcohol part first, then the acid part ending in oate.', show: 'plan.0' },
        { say: 'Hydrolysis with an alkali makes a carboxylate ion, which cannot react back with the alcohol.', show: 'plan.1' },
        { say: 'And an acyl chloride reacts with an alcohol by nucleophilic addition–elimination, which does not reverse.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The name',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Part', 'Formula', 'Comes from', 'In the name'],
          rows: [
            ['acid part', 'CH₃COO–', '**ethanoic acid**', 'ethan**oate**'],
            ['alcohol part', '–CH₂CH₃', '**ethanol**', '**ethyl**'],
          ],
        },
      ],
      lines: [
        { say: 'Step one. The C H three C O O part, with the C double bond O, comes from ethanoic acid, and gives the ending ethanoate.', caption: 'Step one. The CH₃COO part, with the C=O, comes from ethanoic acid, and gives the ending ethanoate.', show: ['t', 't.0'], focus: 't.0' },
        { say: 'The C H two C H three part comes from ethanol, and is named ethyl. So the ester is ethyl ethanoate, made from ethanoic acid and ethanol. That is part a.', caption: 'The CH₂CH₃ part comes from ethanol, and is named ethyl. So the ester is ethyl ethanoate, made from ethanoic acid and ethanol. That is part a.', show: 't.1', focus: 't.1' },
      ],
    },
    {
      chapter: 'Step 2: Alkaline hydrolysis',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\ce{CH3COOCH2CH3 + NaOH -> CH3COONa + CH3CH2OH}', '\\good{\\text{sodium ethanoate} + \\text{ethanol}}', '\\ce{CH3COO-} \\text{ cannot react with ethanol}'] }],
      lines: [
        { say: 'Step two. Sodium hydroxide breaks the ester into sodium ethanoate and ethanol.', show: ['m.0', 'm.1'] },
        { say: 'With dilute acid, the products are ethanoic acid and ethanol, and these can react back to make the ester, so an equilibrium forms.' },
        { say: 'With the alkali, the acid is turned into the ethanoate ion, which cannot react with ethanol. Nothing reacts back, so the hydrolysis goes to completion. That is part b.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: From ethanoyl chloride',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'c',
          head: ['Question', 'Answer'],
          rows: [
            ['mechanism', '**nucleophilic addition–elimination**'],
            ['other product', '**hydrogen chloride**, HCl'],
            ['advantage', '**fast**, at room temperature, and **not reversible**'],
          ],
        },
      ],
      lines: [
        { say: 'Step three. The ethanol’s oxygen attacks the slightly positive carbon and adds on, and then a chloride ion is eliminated. So the mechanism is nucleophilic addition–elimination.', show: ['c', 'c.0'], focus: 'c.0' },
        { say: 'The chlorine leaves with a hydrogen from the ethanol, as hydrogen chloride.', show: 'c.1', focus: 'c.1' },
        { say: 'The reaction is fast at room temperature, needs no catalyst, and does not reverse, so the yield is higher than from ethanoic acid. That is part c.', show: 'c.2', focus: 'c.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) **Ethyl ethanoate**, from **ethanoic acid** and **ethanol**. (b) **Sodium ethanoate** and **ethanol**; the **carboxylate ion cannot react** with the alcohol, so it is not reversible. (c) **Nucleophilic addition–elimination**; **HCl**; it is **fast** and **not reversible**.' },
      ],
      lines: [
        { say: 'Does it make sense? Both methods give the same ester, because the ethanoyl group is joined to the ethanol’s oxygen either way.', show: 'ans' },
        { say: 'So the ester is ethyl ethanoate, alkaline hydrolysis cannot reverse, and ethanoyl chloride makes the ester quickly and completely.' },
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
            ['**Ethanoyl ethyl** or ethyl ethan**ol**', 'Alcohol part **first**, then **-oate**'],
            ['NaOH gives **ethanoic acid**', 'It gives the **salt**, sodium ethanoate'],
            ['The other product is **water**', 'With an acyl chloride it is **HCl**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'The alcohol part, ethyl, comes first, and the acid part ends in oate.', focus: 'traps.0' },
        { say: 'In alkali, the acid is neutralised straight away, so the product is its salt.', focus: 'traps.1' },
        { say: 'And water is the by-product when the acid is used. With ethanoyl chloride, the by-product is hydrogen chloride.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'What does ethanoyl chloride form with ammonia?',
          choices: ['ethanol', 'ethanoic acid', 'ethanamide', 'ethylamine'],
          answer: 2,
          working: 'Ammonia attacks by addition–elimination, and NH₂ replaces the Cl: ethanamide, CH₃CONH₂.',
        },
      ],
      lines: [
        { say: 'Your turn. What does ethanoyl chloride form with ammonia? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Ammonia attacks by addition–elimination, and an N H two group replaces the chlorine, giving the amide, ethanamide: choice C.', caption: 'Ammonia attacks by addition–elimination, and an NH₂ group replaces the chlorine, giving the amide, ethanamide: choice C.', show: 'q2.answer' },
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
          items: ['Ester name: **alkyl alkanoate**', 'Alkaline hydrolysis: **carboxylate salt**, goes to completion', 'Acyl chloride + alcohol: ester + **HCl**, not reversible'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. An ester is named alkyl alkanoate, with the alcohol part first.', show: 'sum.0' },
        { say: 'Alkaline hydrolysis gives the carboxylate salt and goes to completion.', show: 'sum.1' },
        { say: 'And an acyl chloride with an alcohol gives the ester and hydrogen chloride, without reversing. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
