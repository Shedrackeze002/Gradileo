import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import amines from '@/content/chemmore/videos/cx-12-5.ts';

// Exam question for More Chemistry Topics lesson 12.5 (amines): why ethylamine is a base, the
// order of base strength of ammonia, ethylamine and phenylamine, and why making ethylamine from
// bromoethane gives a mixture. Written by Gradileo in the style of an A level chemistry exam.
//
// The picture is the lesson's ammonia taking a hydrogen ion from water (src/video/protons.ts).

const QUESTION = 'This question is about amines. (a) Explain why ethylamine, CH₃CH₂NH₂, is a base. (b) Put ammonia, ethylamine and phenylamine, C₆H₅NH₂, in order of base strength, strongest first, and explain the order. (c) Ethylamine can be made by heating bromoethane with ammonia, but the product is impure. Explain why, and name the nitrile that can be reduced to give ethylamine only.';

const video: Explainer = {
  id: 'xq-cx-12-5',
  lessonId: '',
  exam: {
    lesson: 'cx-12-5',
    source: 'Exam-style question written by Gradileo, in the style of an A level chemistry exam',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Ethylamine, Ammonia and Phenylamine as Bases. Amines',
  thumbnailTitle: 'Amines as Bases',
  thumbnail: 'pt',
  summary:
    'A test-style question, solved one small step at a time: why is ethylamine a base, how do ammonia, ethylamine and phenylamine compare, and why does bromoethane with ammonia give an impure product? The nitrogen lone pair accepts a proton; ethylamine is strongest because the ethyl group pushes electrons onto the nitrogen, and phenylamine weakest because its lone pair is delocalised into the ring; and ethylamine reacts further with bromoethane, so ethanenitrile is reduced instead.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Amines as Bases', subtitle: 'The nitrogen lone pair' }],
      lines: [
        { say: 'In this video, we solve a test-style question about amines. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of an A level chemistry exam question, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'Lone pair accepts H⁺; ethylamine > ammonia > phenylamine; further substitution, ethanenitrile' }],
      lines: [
        { say: 'Here is the question. This question is about amines. Part a: explain why ethylamine is a base. Part b: put ammonia, ethylamine and phenylamine in order of base strength, strongest first, and explain the order. Part c: ethylamine can be made by heating bromoethane with ammonia, but the product is impure. Explain why, and name the nitrile that can be reduced to give ethylamine only.', caption: 'Here is the question. This question is about amines. Part a: explain why ethylamine, CH₃CH₂NH₂, is a base. Part b: put ammonia, ethylamine and phenylamine, C₆H₅NH₂, in order of base strength, strongest first, and explain the order. Part c: ethylamine can be made by heating bromoethane with ammonia, but the product is impure. Explain why, and name the nitrile that can be reduced to give ethylamine only.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Everything depends on how **available** the nitrogen’s **lone pair** is' }],
      lines: [
        { say: 'An amine’s nitrogen has a lone pair. How easily that pair can be shared decides how strong a base it is, and it also explains why the amine keeps reacting.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(amines, 'pt')],
      lines: [
        { say: 'Here is what we need. Here is the simplest base of this kind, ammonia, meeting water.', show: 'pt' },
        { say: 'The nitrogen’s lone pair takes a hydrogen ion from a water molecule, leaving a hydroxide ion. Amines do the same, and the more available the lone pair, the more readily it happens.', play: 'pt.go' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Base: the N **lone pair accepts H⁺**', 'Alkyl groups **push** electrons onto N; a benzene ring **pulls** them away', 'An amine is also a **nucleophile**'] }],
      lines: [
        { say: 'Here is the plan. A base accepts a hydrogen ion, and the nitrogen’s lone pair does the accepting.', show: 'plan.0' },
        { say: 'Alkyl groups push electron density onto the nitrogen, while a benzene ring draws the lone pair into itself.', show: 'plan.1' },
        { say: 'And the same lone pair makes an amine a nucleophile.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Why ethylamine is a base',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\ce{CH3CH2NH2 + H2O <=> CH3CH2NH3+ + OH-}', '\\good{\\text{the N lone pair accepts } \\ce{H+}}'] }],
      lines: [
        { say: 'Step one. The nitrogen of ethylamine has a lone pair of electrons. It uses it to form a coordinate bond to a hydrogen ion, taken from water.', show: 'm.0' },
        { say: 'Accepting a hydrogen ion is what a base does, so ethylamine is a base. That is part a.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: The order',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Base', 'Group on N', 'Lone pair', 'Strength'],
          rows: [
            ['ethylamine', 'ethyl **pushes** electrons in', '**more** available', '**strongest**'],
            ['ammonia', 'only H', 'in between', 'middle'],
            ['phenylamine', 'lone pair **delocalised** into the ring', '**less** available', '**weakest**'],
          ],
        },
      ],
      lines: [
        { say: 'Step two. The ethyl group pushes electron density onto the nitrogen, so its lone pair is more available to accept a hydrogen ion. Ethylamine is the strongest base.', show: ['t', 't.0'], focus: 't.0' },
        { say: 'Ammonia has only hydrogen atoms on its nitrogen, so it sits in the middle.', show: 't.1', focus: 't.1' },
        { say: 'In phenylamine, the lone pair is partly delocalised into the benzene ring, so it is less available. Phenylamine is the weakest. The order is ethylamine, ammonia, phenylamine. That is part b.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Step 3: An impure product',
      layout: 'center',
      main: [{ kind: 'bullets', id: 's', items: ['Ethylamine’s lone pair attacks **more bromoethane**', 'Gives **secondary** and **tertiary** amines, and a **quaternary** salt', 'Reducing **ethanenitrile**, CH₃CN, gives **only** ethylamine'] }],
      lines: [
        { say: 'Step three. Once ethylamine forms, its nitrogen still has a lone pair, so it acts as a nucleophile and attacks more bromoethane.', show: 's.0' },
        { say: 'That gives diethylamine, then triethylamine, and finally a quaternary ammonium salt, so the product is a mixture.', show: 's.1' },
        { say: 'Reducing ethanenitrile, C H three C N, with hydrogen and a nickel catalyst gives only ethylamine, because no halogenoalkane is there to react further. That is part c.', caption: 'Reducing ethanenitrile, CH₃CN, with hydrogen and a nickel catalyst gives only ethylamine, because no halogenoalkane is there to react further. That is part c.', show: 's.2', focus: 's.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) The **N lone pair accepts H⁺**. (b) **Ethylamine > ammonia > phenylamine**: the ethyl group **pushes** electrons onto N, and phenylamine’s lone pair is **delocalised** into the ring. (c) Ethylamine **reacts further** with bromoethane; reduce **ethanenitrile**.' },
      ],
      lines: [
        { say: 'Does it make sense? Ethanenitrile, C H three C N, has two carbons, and reducing the C triple bond N to C H two N H two keeps both, giving ethylamine.', caption: 'Does it make sense? Ethanenitrile, CH₃CN, has two carbons, and reducing the C≡N to CH₂NH₂ keeps both, giving ethylamine.', show: 'ans' },
        { say: 'So the lone pair makes amines bases, its availability sets the order, and it also makes ethylamine keep reacting with bromoethane.' },
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
            ['A base because it **gives** H⁺', 'A base **accepts** H⁺'],
            ['Phenylamine is **strongest**: a big group', 'The ring **delocalises** the lone pair'],
            ['Reduce **propanenitrile**', 'That gives **propylamine**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'An acid gives hydrogen ions, and a base accepts them.', focus: 'traps.0' },
        { say: 'Size does not help here. The benzene ring takes some of the lone pair into its delocalised system.', focus: 'traps.1' },
        { say: 'And the nitrile carbon becomes part of the chain, so we need a two-carbon nitrile, ethanenitrile.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which of these is the weakest base?',
          choices: ['phenylamine', 'ammonia', 'methylamine', 'diethylamine'],
          answer: 0,
          working: 'In phenylamine, the nitrogen lone pair is delocalised into the benzene ring, so it is the least available.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these is the weakest base? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'In phenylamine, the nitrogen’s lone pair is delocalised into the ring, so it is the least available: choice A.', show: 'q2.answer' },
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
          items: ['Amines are bases: the **lone pair** accepts H⁺', 'Alkyl amines > ammonia > **phenylamine**', 'From a nitrile: **one** amine only'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Amines are bases because the nitrogen lone pair accepts a hydrogen ion.', show: 'sum.0' },
        { say: 'Alkyl amines are stronger bases than ammonia, and phenylamine is weaker.', show: 'sum.1' },
        { say: 'And reducing a nitrile gives a single primary amine. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
