import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import alcohols from '@/content/chemmore/videos/cx-9-4.ts';

// Exam question for More Chemistry Topics lesson 9.4 (alcohols): oxidising propan-1-ol under
// reflux, keeping the aldehyde by distilling, and dehydrating the alcohol with an acid catalyst.
// Written by Gradileo in the style of an A level chemistry exam.
//
// The picture is the lesson's water leaving ethanol to make ethene (src/video/molecules.ts).

const QUESTION = 'Propan-1-ol, CH₃CH₂CH₂OH, is a primary alcohol. (a) Propan-1-ol is heated under reflux with excess acidified potassium dichromate(VI). Give the colour change and name the organic product. (b) State how the method must be changed to obtain propanal instead, and explain why. (c) Propan-1-ol is heated with concentrated phosphoric acid. Name the type of reaction and the organic product.';

const video: Explainer = {
  id: 'xq-cx-9-4',
  lessonId: '',
  exam: {
    lesson: 'cx-9-4',
    source: 'Exam-style question written by Gradileo, in the style of an A level chemistry exam',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Propan-1-ol, Dichromate and Phosphoric Acid. Alcohols',
  thumbnailTitle: 'Oxidising Alcohols',
  thumbnail: 'wl',
  summary:
    'A test-style question, solved one small step at a time: what does propan-1-ol give under reflux with acidified dichromate, how do we stop at propanal, and what does concentrated phosphoric acid do? The dichromate turns from orange to green and makes propanoic acid, distilling the aldehyde off as it forms stops it being oxidised further, and the acid catalyst dehydrates the alcohol to propene.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Oxidising Alcohols', subtitle: 'Reflux, distillation and dehydration' }],
      lines: [
        { say: 'In this video, we solve a test-style question about alcohols. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of an A level chemistry exam question, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'Orange to green, propanoic acid; distil it off as it forms; dehydration, propene' }],
      lines: [
        { say: 'Here is the question. Propan-1-ol is a primary alcohol. Part a: propan-1-ol is heated under reflux with excess acidified potassium dichromate six. Give the colour change and name the organic product. Part b: state how the method must be changed to obtain propanal instead, and explain why. Part c: propan-1-ol is heated with concentrated phosphoric acid. Name the type of reaction and the organic product.', caption: 'Here is the question. Propan-1-ol, CH₃CH₂CH₂OH, is a primary alcohol. Part a: propan-1-ol is heated under reflux with excess acidified potassium dichromate(VI). Give the colour change and name the organic product. Part b: state how the method must be changed to obtain propanal instead, and explain why. Part c: propan-1-ol is heated with concentrated phosphoric acid. Name the type of reaction and the organic product.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'A primary alcohol oxidises **twice**: the **apparatus** decides where it stops' }],
      lines: [
        { say: 'A primary alcohol is oxidised first to an aldehyde and then to a carboxylic acid. The way we heat it decides which one we collect.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(alcohols, 'wl')],
      lines: [
        { say: 'Here is what we need for part c. This is elimination up close, with ethanol. The O H group and a hydrogen atom from the next carbon leave together as water, and the two carbons form a double bond.', caption: 'Here is what we need for part c. This is elimination up close, with ethanol. The OH group and a hydrogen atom from the next carbon leave together as water, and the two carbons form a double bond.', show: 'wl', play: 'wl.go' },
        { say: 'Ethanol gives ethene. Propan-1-ol loses water in the same way.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Primary alcohol → **aldehyde** → **carboxylic acid**', 'Reflux keeps it in; distillation takes it **out**', 'Acid catalyst + heat: **lose water**'] }],
      lines: [
        { say: 'Here is the plan. A primary alcohol is oxidised to an aldehyde, and the aldehyde is oxidised again to a carboxylic acid.', show: 'plan.0' },
        { say: 'Reflux keeps everything in the flask, while distillation removes a product as soon as it forms.', show: 'plan.1' },
        { say: 'And an acid catalyst with heat removes a water molecule.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Under reflux',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{orange } \\ce{Cr2O7^2-} \\rightarrow \\text{green } \\ce{Cr^3+}', '\\ce{CH3CH2CH2OH -> CH3CH2CHO -> CH3CH2COOH}', '\\good{\\text{propanoic acid}}'] }],
      lines: [
        { say: 'Step one. The dichromate ions are orange. As they oxidise the alcohol, they are reduced to chromium three ions, which are green.', caption: 'Step one. The dichromate ions are orange. As they oxidise the alcohol, they are reduced to Cr³⁺ ions, which are green.', show: 'm.0' },
        { say: 'Under reflux, the propanal that forms first keeps dripping back into the flask, with plenty of dichromate.', show: 'm.1' },
        { say: 'So it is oxidised again, and the product is propanoic acid. The colour change is orange to green. That is part a.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: Stopping at propanal',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Change', 'Why'],
          rows: [
            ['**distil** the product off as it forms', 'propanal boils **lower** than the alcohol and the acid'],
            ['use **excess alcohol**, not excess dichromate', 'leaves little oxidising agent for the aldehyde'],
          ],
        },
      ],
      lines: [
        { say: 'Step two. Instead of refluxing, we heat the mixture with distillation apparatus, so propanal is removed as soon as it forms. Propanal has no O H group, so it has no hydrogen bonding and boils at a lower temperature than the alcohol and the acid.', caption: 'Step two. Instead of refluxing, we heat the mixture with distillation apparatus, so propanal is removed as soon as it forms. Propanal has no OH group, so it has no hydrogen bonding and boils at a lower temperature than the alcohol and the acid.', show: ['t', 't.0'], focus: 't.0' },
        { say: 'Using the alcohol in excess also helps. The aldehyde leaves the flask before it can be oxidised to the acid. That is part b.', show: 't.1', focus: 't.1' },
      ],
    },
    {
      chapter: 'Step 3: With phosphoric acid',
      layout: 'center',
      main: [{ kind: 'math', id: 'e', size: 'md', lines: ['\\ce{CH3CH2CH2OH -> CH3CH=CH2 + H2O}', '\\good{\\text{dehydration (elimination): propene}}'] }],
      lines: [
        { say: 'Step three. With the acid catalyst, the O H group and a hydrogen from the next carbon leave as water.', caption: 'Step three. With the acid catalyst, the OH group and a hydrogen from the next carbon leave as water.', show: 'e.0' },
        { say: 'A double bond forms, so the reaction is dehydration, a type of elimination, and the product is propene. That is part c.', show: 'e.1', focus: 'e.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) **Orange to green**; **propanoic acid**. (b) **Distil** the propanal off **as it forms**, so it is not oxidised further. (c) **Dehydration** (elimination), giving **propene**.' },
      ],
      lines: [
        { say: 'Does it make sense? The carbon chain stays three carbons long all the way through, so every product is named from propane: propanal, propanoic acid and propene.', show: 'ans' },
        { say: 'So reflux gives the acid, distillation catches the aldehyde, and an acid catalyst removes water to make the alkene.' },
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
            ['Green to **orange**', 'Dichromate **starts** orange'],
            ['**Propanal** under reflux', 'Reflux oxidises it **again**'],
            ['Acid gives **propanoic acid**', 'Phosphoric acid **dehydrates**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'The dichromate is orange to begin with, and turns green as it is used up.', focus: 'traps.0' },
        { say: 'Under reflux, the aldehyde cannot escape, so it ends up as the carboxylic acid.', focus: 'traps.1' },
        { say: 'And concentrated phosphoric acid is a catalyst for dehydration. It does not oxidise the alcohol.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which alcohol is not oxidised by acidified potassium dichromate?',
          choices: ['ethanol', 'propan-2-ol', 'butan-1-ol', '2-methylpropan-2-ol'],
          answer: 3,
          working: '2-Methylpropan-2-ol is a tertiary alcohol: the carbon holding the OH has no hydrogen atom to lose.',
        },
      ],
      lines: [
        { say: 'Your turn. Which alcohol is not oxidised by acidified potassium dichromate? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: '2-methylpropan-2-ol is a tertiary alcohol. The carbon holding the O H group has no hydrogen atom to lose, so it is not oxidised: choice D.', caption: '2-Methylpropan-2-ol is a tertiary alcohol. The carbon holding the OH group has no hydrogen atom to lose, so it is not oxidised: choice D.', show: 'q2.answer' },
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
          items: ['Dichromate: **orange to green**', 'Reflux: **acid**; distil: **aldehyde**', 'Acid catalyst: **dehydration** to an alkene'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Acidified dichromate turns from orange to green as it oxidises an alcohol.', show: 'sum.0' },
        { say: 'A primary alcohol under reflux gives a carboxylic acid, and distilling as it forms gives an aldehyde.', show: 'sum.1' },
        { say: 'And an acid catalyst dehydrates an alcohol to an alkene. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
