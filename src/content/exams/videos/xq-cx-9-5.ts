import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import analysis from '@/content/chemmore/videos/cx-9-5.ts';

// Exam question for More Chemistry Topics lesson 9.5 (organic analysis): identifying an unknown
// compound C₃H₆O from bromine water, its infrared spectrum and Tollens' reagent. Written by
// Gradileo in the style of an A level chemistry exam.
//
// The picture is the lesson's bromine adding across a double bond (src/video/molecules.ts).

const QUESTION = 'Compound X has the molecular formula C₃H₆O. (a) X does not decolourise bromine water. What does this tell you about X? (b) The infrared spectrum of X has a strong, sharp absorption at 1720 cm⁻¹ and no broad absorption between 3200 and 3600 cm⁻¹. Identify the bond that causes the absorption at 1720 cm⁻¹, and state which bond is missing. (c) X does not give a silver mirror when warmed with Tollens\' reagent. Identify X.';

const video: Explainer = {
  id: 'xq-cx-9-5',
  lessonId: '',
  exam: {
    lesson: 'cx-9-5',
    source: 'Exam-style question written by Gradileo, in the style of an A level chemistry exam',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Bromine Water, an IR Spectrum and Tollens\' Reagent. Identifying C₃H₆O',
  thumbnailTitle: 'Identify Compound X',
  thumbnail: 'ba',
  summary:
    'A test-style question, solved one small step at a time: compound X, C₃H₆O, leaves bromine water orange, absorbs at 1720 cm⁻¹ with no broad O–H band, and gives no silver mirror with Tollens\' reagent. So X has no C=C double bond, it has a C=O and no O–H, and it is a ketone rather than an aldehyde: propanone, CH₃COCH₃.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Identify Compound X', subtitle: 'Three tests on C₃H₆O' }],
      lines: [
        { say: 'In this video, we solve a test-style question about identifying an organic compound. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of an A level chemistry exam question, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'No C=C; C=O present, no O–H; propanone' }],
      lines: [
        { say: 'Here is the question. Compound X has the molecular formula C three H six O. Part a: X does not decolourise bromine water. What does this tell you about X? Part b: the infrared spectrum of X has a strong, sharp absorption at 1,720 wavenumbers, and no broad absorption between 3,200 and 3,600 wavenumbers. Identify the bond that causes the absorption at 1,720, and state which bond is missing. Part c: X does not give a silver mirror when warmed with Tollens\' reagent. Identify X.', caption: 'Here is the question. Compound X has the molecular formula C₃H₆O. Part a: X does not decolourise bromine water. What does this tell you about X? Part b: the infrared spectrum of X has a strong, sharp absorption at 1720 cm⁻¹ and no broad absorption between 3200 and 3600 cm⁻¹. Identify the bond that causes the absorption at 1720 cm⁻¹, and state which bond is missing. Part c: X does not give a silver mirror when warmed with Tollens\' reagent. Identify X.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Each test **rules out** some structures: keep the one that **fits all three**' }],
      lines: [
        { say: 'Several different molecules have the formula C three H six O. Each test rules some of them out, and we keep the one that fits every result.', caption: 'Several different molecules have the formula C₃H₆O. Each test rules some of them out, and we keep the one that fits every result.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(analysis, 'ba')],
      lines: [
        { say: 'Here is what we need for part a. This is why bromine water loses its colour with an alkene. The double bond opens, and a bromine atom joins each carbon.', show: 'ba', play: 'ba.go' },
        { say: 'The coloured bromine is used up, so the orange colour goes. If the colour stays, there is no carbon to carbon double bond.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'plan',
          head: ['Test', 'Looks for'],
          rows: [
            ['bromine water', 'a **C=C** double bond'],
            ['infrared spectrum', '**C=O** near 1700, broad **O–H** near 3200 to 3600'],
            ['Tollens\' reagent', 'an **aldehyde**'],
          ],
        },
      ],
      lines: [
        { say: 'Here is the plan. Bromine water tests for a carbon to carbon double bond.', show: ['plan', 'plan.0'] },
        { say: 'The infrared spectrum shows a C double bond O near 1,700 wavenumbers, and a broad O H band between 3,200 and 3,600.', caption: 'The infrared spectrum shows a C=O near 1700 cm⁻¹, and a broad O–H band between 3200 and 3600 cm⁻¹.', show: 'plan.1' },
        { say: 'And Tollens\' reagent gives a silver mirror only with an aldehyde.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Bromine water',
      layout: 'center',
      main: [{ kind: 'bullets', id: 's1', items: ['Bromine water stays **orange**', 'So X has **no C=C** double bond', 'Rules out **prop-2-en-1-ol**, CH₂=CHCH₂OH'] }],
      lines: [
        { say: 'Step one. The bromine water stays orange.', show: 's1.0' },
        { say: 'So X has no carbon to carbon double bond. That is part a.', show: 's1.1', focus: 's1.1' },
        { say: 'That rules out an alcohol like prop-2-en-1-ol, which has the same formula and a C double bond C.', caption: 'That rules out an alcohol like prop-2-en-1-ol, CH₂=CHCH₂OH, which has the same formula and a C=C.', show: 's1.2' },
      ],
    },
    {
      chapter: 'Step 2: The infrared spectrum',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Absorption', 'Bond', 'In X?'],
          rows: [
            ['strong, sharp, 1720 cm⁻¹', '**C=O**', '**yes**'],
            ['broad, 3200 to 3600 cm⁻¹', '**O–H**', '**no**'],
          ],
        },
      ],
      lines: [
        { say: 'Step two. A strong, sharp absorption near 1,720 wavenumbers is caused by a C double bond O, a carbonyl group.', caption: 'Step two. A strong, sharp absorption near 1720 cm⁻¹ is caused by a C=O, a carbonyl group.', show: ['t', 't.0'], focus: 't.0' },
        { say: 'There is no broad band between 3,200 and 3,600, so there is no O H bond. X is not an alcohol or a carboxylic acid. That is part b.', caption: 'There is no broad band between 3200 and 3600 cm⁻¹, so there is no O–H bond. X is not an alcohol or a carboxylic acid. That is part b.', show: 't.1', focus: 't.1' },
      ],
    },
    {
      chapter: 'Step 3: Tollens\' reagent',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'c',
          head: ['Carbonyl with C₃H₆O', 'Type', 'Tollens\''],
          rows: [
            ['propanal, CH₃CH₂CHO', 'aldehyde', 'silver mirror'],
            ['**propanone, CH₃COCH₃**', '**ketone**', '**no change**'],
          ],
        },
      ],
      lines: [
        { say: 'Step three. With three carbons and a C double bond O, X is either propanal or propanone.', caption: 'Step three. With three carbons and a C=O, X is either propanal or propanone.', show: ['c', 'c.0'] },
        { say: 'Propanal is an aldehyde and would give a silver mirror. X gives none, so X is the ketone, propanone. That is part c.', show: 'c.1', focus: 'c.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) X has **no C=C** double bond. (b) The absorption is from a **C=O**, and there is **no O–H**. (c) X is **propanone**, CH₃COCH₃.' },
      ],
      lines: [
        { say: 'Does it make sense? Propanone has three carbons, six hydrogens and one oxygen, a C double bond O, no O H, and no C double bond C. It fits every result.', caption: 'Does it make sense? Propanone has three carbons, six hydrogens and one oxygen, a C=O, no O–H, and no C=C. It fits every result.', show: 'ans' },
        { say: 'So bromine water rules out a double bond between carbons, the spectrum shows a carbonyl without an O H, and Tollens\' reagent shows it is a ketone.', caption: 'So bromine water rules out a double bond between carbons, the spectrum shows a carbonyl without an O–H, and Tollens\' reagent shows it is a ketone.' },
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
            ['C=O, so it **decolourises** bromine water', 'Only **C=C** does'],
            ['**Propanal**', 'That gives a **silver mirror**'],
            ['1720 cm⁻¹ is the **O–H**', 'O–H is broad, near **3300**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Bromine water tests for a carbon to carbon double bond, not a carbon to oxygen one.', focus: 'traps.0' },
        { say: 'Propanal fits the formula and the spectrum, but as an aldehyde it would reduce Tollens\' reagent to silver.', focus: 'traps.1' },
        { say: 'And the O H band is broad and sits much higher, around 3,300 wavenumbers.', caption: 'And the O–H band is broad and sits much higher, around 3300 cm⁻¹.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which compound gives a silver mirror with Tollens\' reagent?',
          choices: ['ethanal', 'propanone', 'ethanol', 'ethanoic acid'],
          answer: 0,
          working: 'Only aldehydes are oxidised by Tollens\' reagent, and ethanal, CH₃CHO, is an aldehyde.',
        },
      ],
      lines: [
        { say: 'Your turn. Which compound gives a silver mirror with Tollens\' reagent? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Only an aldehyde is oxidised by Tollens\' reagent, and ethanal is an aldehyde: choice A.', show: 'q2.answer' },
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
          items: ['Bromine water decolourised: **C=C**', 'IR: sharp **C=O** near 1700, broad **O–H** near 3300', 'Tollens\' silver mirror: **aldehyde**'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Bromine water loses its colour only with a carbon to carbon double bond.', show: 'sum.0' },
        { say: 'In an infrared spectrum, a C double bond O gives a sharp band near 1,700, and an O H a broad band near 3,300.', caption: 'In an infrared spectrum, a C=O gives a sharp band near 1700 cm⁻¹, and an O–H a broad band near 3300 cm⁻¹.', show: 'sum.1' },
        { say: 'And Tollens\' reagent gives a silver mirror only with an aldehyde. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
