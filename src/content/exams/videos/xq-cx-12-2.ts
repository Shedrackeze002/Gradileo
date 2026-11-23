import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import carbonyls from '@/content/chemmore/videos/cx-12-2.ts';

// Exam question for More Chemistry Topics lesson 12.2 (aldehydes and ketones): telling propanal
// from propanone, reducing propanone with NaBH₄, and propanal with cyanide. Written by Gradileo in
// the style of an A level chemistry exam.
//
// The picture is the lesson's hydride ion reducing propanone (src/video/molecules.ts).

const QUESTION = 'Propanal, CH₃CH₂CHO, and propanone, CH₃COCH₃, are isomers. (a) Describe a chemical test that would give a positive result with propanal but not with propanone, and give the observation. (b) Propanone is reduced by sodium tetrahydridoborate, NaBH₄. Name the organic product, the type of mechanism, and the nucleophile. (c) Propanal reacts with potassium cyanide followed by dilute acid. Name the organic product.';

const video: Explainer = {
  id: 'xq-cx-12-2',
  lessonId: '',
  exam: {
    lesson: 'cx-12-2',
    source: 'Exam-style question written by Gradileo, in the style of an A level chemistry exam',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Propanal or Propanone? Tollens\', NaBH₄ and Cyanide. Aldehydes and Ketones',
  thumbnailTitle: 'Aldehyde or Ketone?',
  thumbnail: 'kr',
  summary:
    'A test-style question, solved one small step at a time: how do we tell propanal from propanone, what does NaBH₄ make from propanone, and what does propanal give with cyanide and acid? Warm Tollens\' reagent gives a silver mirror with propanal only; NaBH₄ reduces propanone to propan-2-ol by nucleophilic addition, with the hydride ion as the nucleophile; and cyanide adds a carbon, giving 2-hydroxybutanenitrile.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Aldehyde or Ketone?', subtitle: 'Propanal and propanone' }],
      lines: [
        { say: 'In this video, we solve a test-style question about aldehydes and ketones. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of an A level chemistry exam question, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'Tollens\', silver mirror; propan-2-ol, nucleophilic addition, H⁻; 2-hydroxybutanenitrile' }],
      lines: [
        { say: 'Here is the question. Propanal and propanone are isomers. Part a: describe a chemical test that would give a positive result with propanal but not with propanone, and give the observation. Part b: propanone is reduced by sodium tetrahydridoborate. Name the organic product, the type of mechanism, and the nucleophile. Part c: propanal reacts with potassium cyanide followed by dilute acid. Name the organic product.', caption: 'Here is the question. Propanal, CH₃CH₂CHO, and propanone, CH₃COCH₃, are isomers. Part a: describe a chemical test that would give a positive result with propanal but not with propanone, and give the observation. Part b: propanone is reduced by sodium tetrahydridoborate, NaBH₄. Name the organic product, the type of mechanism, and the nucleophile. Part c: propanal reacts with potassium cyanide followed by dilute acid. Name the organic product.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Only an **aldehyde** can be **oxidised**; both are **attacked** at the **C=O**' }],
      lines: [
        { say: 'An aldehyde has a hydrogen on its carbonyl carbon, so it can be oxidised, and a ketone cannot. But both have a slightly positive carbonyl carbon that nucleophiles attack.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(carbonyls, 'kr')],
      lines: [
        { say: 'Here is what we need. This is the reduction of propanone up close. The carbon of the C double bond O is slightly positive.', caption: 'Here is what we need. This is the reduction of propanone up close. The carbon of the C=O double bond is slightly positive.', show: 'kr' },
        { say: 'The hydride ion attacks that carbon, and the pi electrons move onto the oxygen. Then the oxygen takes a hydrogen ion from water.', caption: 'The hydride ion attacks that carbon, and the π electrons move onto the oxygen. Then the oxygen takes a hydrogen ion from water.', play: 'kr.go' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Tollens\' or Fehling\'s: **aldehydes only**', 'NaBH₄: ketone → **secondary alcohol**', 'CN⁻ then acid: a **hydroxynitrile**, one carbon longer'] }],
      lines: [
        { say: 'Here is the plan. Tollens\' reagent and Fehling\'s solution react only with aldehydes.', show: 'plan.0' },
        { say: 'Sodium tetrahydridoborate reduces a ketone to a secondary alcohol.', show: 'plan.1' },
        { say: 'And cyanide followed by acid gives a hydroxynitrile, with one more carbon.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The test',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Warm with Tollens\' reagent', 'Observation'],
          rows: [
            ['**propanal**', '**silver mirror**'],
            ['propanone', 'no change, stays colourless'],
          ],
        },
      ],
      lines: [
        { say: 'Step one. Warm each compound with Tollens\' reagent. Propanal is oxidised to propanoic acid, and the silver ions are reduced to silver, which coats the tube as a silver mirror.', show: ['t', 't.0'], focus: 't.0' },
        { say: 'Propanone cannot be oxidised, so nothing happens. Fehling\'s solution, turning from blue to a brick-red precipitate, works too. That is part a.', show: 't.1', focus: 't.1' },
      ],
    },
    {
      chapter: 'Step 2: Reducing propanone',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\ce{CH3COCH3 + 2[H] -> CH3CH(OH)CH3}', '\\good{\\text{propan-2-ol, by nucleophilic addition}}', '\\text{nucleophile: the hydride ion, } \\ce{H-}'] }],
      lines: [
        { say: 'Step two. Two hydrogen atoms add across the C double bond O of propanone.', caption: 'Step two. Two hydrogen atoms add across the C=O of propanone.', show: 'm.0' },
        { say: 'The product is propan-2-ol, a secondary alcohol. A nucleophile attacks the carbon and adds across the double bond, so the mechanism is nucleophilic addition.', show: 'm.1' },
        { say: 'The nucleophile is the hydride ion, H minus, from the sodium tetrahydridoborate. That is part b.', caption: 'The nucleophile is the hydride ion, H⁻, from the sodium tetrahydridoborate. That is part b.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: Adding cyanide',
      layout: 'center',
      main: [{ kind: 'math', id: 'c', size: 'md', lines: ['\\ce{CH3CH2CHO + HCN -> CH3CH2CH(OH)CN}', '\\good{\\text{2-hydroxybutanenitrile}}'] }],
      lines: [
        { say: 'Step three. The cyanide ion attacks the carbonyl carbon in the same way, and the dilute acid then gives a hydrogen to the oxygen. Overall, H C N adds across the C double bond O.', caption: 'Step three. The cyanide ion attacks the carbonyl carbon in the same way, and the dilute acid then gives a hydrogen to the oxygen. Overall, HCN adds across the C=O.', show: 'c.0' },
        { say: 'The chain now has four carbons, counting the nitrile carbon, with the O H on carbon 2. So the product is 2-hydroxybutanenitrile. That is part c.', caption: 'The chain now has four carbons, counting the nitrile carbon, with the OH on carbon 2. So the product is 2-hydroxybutanenitrile. That is part c.', show: 'c.1', focus: 'c.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) Warm with **Tollens\' reagent**: propanal gives a **silver mirror**. (b) **Propan-2-ol**; **nucleophilic addition**; the **hydride ion, H⁻**. (c) **2-Hydroxybutanenitrile**, CH₃CH₂CH(OH)CN.' },
      ],
      lines: [
        { say: 'Does it make sense? Propanone has its C double bond O in the middle of the chain, so reducing it puts the O H on carbon 2: propan-2-ol.', caption: 'Does it make sense? Propanone has its C=O in the middle of the chain, so reducing it puts the OH on carbon 2: propan-2-ol.', show: 'ans' },
        { say: 'So Tollens\' reagent picks out the aldehyde, hydride reduces the ketone to a secondary alcohol, and cyanide adds a carbon.' },
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
            ['Use **bromine water**', 'Neither has a **C=C**'],
            ['**Electrophilic** addition', 'H⁻ is a **nucleophile**'],
            ['**2-hydroxypropanenitrile**', 'The CN carbon makes **four**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Bromine water tests for a carbon to carbon double bond, which neither compound has.', focus: 'traps.0' },
        { say: 'The hydride ion brings a pair of electrons to the carbon, so it is a nucleophile.', focus: 'traps.1' },
        { say: 'And the nitrile carbon counts in the name, so three carbons become four: butanenitrile.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which alcohol forms when butanal is reduced by NaBH₄?',
          choices: ['butan-2-ol', 'butan-1-ol', '2-methylpropan-2-ol', 'propan-1-ol'],
          answer: 1,
          working: 'An aldehyde is reduced to a primary alcohol with the same carbon chain: butanal gives butan-1-ol.',
        },
      ],
      lines: [
        { say: 'Your turn. Which alcohol forms when butanal is reduced by sodium tetrahydridoborate? Pause the video and try it.', caption: 'Your turn. Which alcohol forms when butanal is reduced by NaBH₄? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'An aldehyde is reduced to a primary alcohol with the same carbon chain, so butanal gives butan-1-ol: choice B.', show: 'q2.answer' },
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
          items: ['Tollens\' silver mirror: **aldehydes only**', 'NaBH₄: **nucleophilic addition** of H⁻', 'CN⁻ then acid: **hydroxynitrile**, one carbon longer'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Tollens\' reagent gives a silver mirror only with aldehydes.', show: 'sum.0' },
        { say: 'Sodium tetrahydridoborate reduces carbonyls by nucleophilic addition of the hydride ion.', show: 'sum.1' },
        { say: 'And cyanide then acid gives a hydroxynitrile, one carbon longer. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
