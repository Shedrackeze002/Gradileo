import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import mechanisms from '@/content/chemmore/videos/cx-9-1.ts';

// Exam question for More Chemistry Topics lesson 9.1 (reaction mechanisms with curly arrows): the
// mechanism of propene with hydrogen bromide, what the curly arrows show, and why 2-bromopropane is
// the major product. Written by Gradileo in the style of an A level chemistry exam.
//
// The picture is the lesson's electrophilic addition of HBr to ethene (src/video/molecules.ts).

const QUESTION = 'Propene, CH₃CH=CH₂, reacts with hydrogen bromide to give two products, 2-bromopropane and 1-bromopropane. (a) Name the type of mechanism. (b) Describe what the two curly arrows in the first step of the mechanism show. (c) Explain why 2-bromopropane is the major product.';

const video: Explainer = {
  id: 'xq-cx-9-1',
  lessonId: '',
  exam: {
    lesson: 'cx-9-1',
    source: 'Exam-style question written by Gradileo, in the style of an A level chemistry exam',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Propene and Hydrogen Bromide, with Curly Arrows. Reaction Mechanisms',
  thumbnailTitle: 'Curly Arrows',
  thumbnail: 'ea',
  summary:
    'A test-style question, solved one small step at a time: what type of mechanism does propene follow with hydrogen bromide, what do the first two curly arrows show, and why is 2-bromopropane the major product? It is electrophilic addition, the arrows show an electron pair moving from the double bond to the hydrogen and the H–Br bond pair moving to the bromine, and the secondary carbocation is more stable than the primary one.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Curly Arrows', subtitle: 'Propene and hydrogen bromide' }],
      lines: [
        { say: 'In this video, we solve a test-style question about a reaction mechanism. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of an A level chemistry exam question, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'Electrophilic addition; electron pairs moving; the secondary carbocation is more stable' }],
      lines: [
        { say: 'Here is the question. Propene reacts with hydrogen bromide to give two products, 2-bromopropane and 1-bromopropane. Part a: name the type of mechanism. Part b: describe what the two curly arrows in the first step of the mechanism show. Part c: explain why 2-bromopropane is the major product.', caption: 'Here is the question. Propene, CH₃CH=CH₂, reacts with hydrogen bromide to give two products, 2-bromopropane and 1-bromopropane. Part a: name the type of mechanism. Part b: describe what the two curly arrows in the first step of the mechanism show. Part c: explain why 2-bromopropane is the major product.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Follow the **electron pairs**, then compare the two **carbocations**' }],
      lines: [
        { say: 'A mechanism is the story of where the electron pairs go. Then, to find the major product, we compare the two positive ions that the reaction could pass through.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(mechanisms, 'ea')],
      lines: [
        { say: 'Here is what we need. This is ethene reacting with hydrogen bromide up close. Watch the first two curly arrows: one from the double bond to the hydrogen, and one from the hydrogen to bromine bond to the bromine.', caption: 'Here is what we need. This is ethene reacting with hydrogen bromide up close. Watch the first two curly arrows: one from the double bond to the hydrogen, and one from the H–Br bond to the bromine.', show: 'ea', play: 'ea.first' },
        { say: 'One carbon is left with a positive charge, a carbocation, and the bromide ion uses a lone pair to attack it. Propene reacts in exactly the same way.', play: 'ea.second' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['A double bond attacked by an **electrophile**', 'A curly arrow moves a **pair of electrons**', 'More alkyl groups make a **more stable** carbocation'] }],
      lines: [
        { say: 'Here is the plan. The electron-rich double bond is attacked by an electrophile, and the two molecules join.', show: 'plan.0' },
        { say: 'Each curly arrow shows a pair of electrons moving.', show: 'plan.1' },
        { say: 'And a carbocation with more alkyl groups around the positive carbon is more stable.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The mechanism',
      layout: 'center',
      main: [{ kind: 'bullets', id: 's1', items: ['H–Br is **polar**: the hydrogen is δ+', 'It **accepts** an electron pair: an **electrophile**', 'Two molecules join into one: **addition**'] }],
      lines: [
        { say: 'Step one. Bromine is more electronegative than hydrogen, so the hydrogen of H B r is slightly positive.', caption: 'Step one. Bromine is more electronegative than hydrogen, so the hydrogen of HBr is slightly positive.', show: 's1.0' },
        { say: 'It accepts a pair of electrons from the double bond, so hydrogen bromide is acting as an electrophile.', show: 's1.1' },
        { say: 'And propene and hydrogen bromide join to make a single product. So the mechanism is electrophilic addition. That is part a.', show: 's1.2', focus: 's1.2' },
      ],
    },
    {
      chapter: 'Step 2: The two curly arrows',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Arrow', 'Starts at', 'Ends at'],
          rows: [
            ['first', 'the **C=C** double bond', 'the **H** of H–Br'],
            ['second', 'the **H–Br** bond', 'the **Br** atom'],
          ],
        },
      ],
      lines: [
        { say: 'Step two. The first arrow starts at the double bond and points to the hydrogen. A pair of electrons from the double bond forms a new carbon to hydrogen bond.', show: ['t', 't.0'], focus: 't.0' },
        { say: 'The second arrow starts at the hydrogen to bromine bond and points to the bromine. That bond breaks, and both of its electrons go to the bromine, which leaves as a bromide ion. That is part b.', show: 't.1', focus: 't.1' },
      ],
    },
    {
      chapter: 'Step 3: The major product',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'c',
          head: ['H adds to', 'Carbocation', 'Alkyl groups on C⁺', 'Product'],
          rows: [
            ['the end carbon', '**secondary**, CH₃C⁺HCH₃', '**two**', '**2-bromopropane**, major'],
            ['the middle carbon', 'primary, CH₃CH₂C⁺H₂', 'one', '1-bromopropane, minor'],
          ],
        },
      ],
      lines: [
        { say: 'Step three. If the hydrogen adds to the end carbon, the positive charge sits on the middle carbon. That is a secondary carbocation, with two alkyl groups.', show: ['c', 'c.0'], focus: 'c.0' },
        { say: 'If the hydrogen adds to the middle carbon, we get a primary carbocation, with only one alkyl group.', show: 'c.1', focus: 'c.1' },
        { say: 'Alkyl groups push electrons towards the positive carbon and spread out its charge, so the secondary carbocation is more stable and forms more often. The bromide ion then joins the middle carbon, giving 2-bromopropane. That is part c.', focus: 'c.0' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) **Electrophilic addition**. (b) A **pair of electrons** moves from the **C=C** to the H, and the **H–Br** bond pair moves to the **Br**. (c) It forms through the **secondary carbocation**, which is **more stable** than the primary one.' },
      ],
      lines: [
        { say: 'Does it make sense? Both products have the formula C three H seven B r, so the only difference is where the bromine ends up, and that is decided by which carbocation forms.', caption: 'Does it make sense? Both products have the formula C₃H₇Br, so the only difference is where the bromine ends up, and that is decided by which carbocation forms.', show: 'ans' },
        { say: 'So the mechanism is electrophilic addition, the arrows show electron pairs moving, and the more stable secondary carbocation gives the major product.' },
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
            ['**Nucleophilic** addition', 'The double bond **gives** electrons'],
            ['Arrow from the **H** to the double bond', 'Arrows start at the **electrons**'],
            ['The **primary** carbocation is more stable', 'More alkyl groups, **more** stable'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'The double bond gives its electrons to the hydrogen, so the attacking species is an electrophile.', focus: 'traps.0' },
        { say: 'A curly arrow always starts where the electrons are, at a bond or a lone pair, never at the atom receiving them.', focus: 'traps.1' },
        { say: 'And the stability order is tertiary, then secondary, then primary, because each alkyl group helps to spread the positive charge.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which of these is a nucleophile?',
          choices: ['NH₃', 'H⁺', 'NO₂⁺', 'Br₂'],
          answer: 0,
          working: 'Ammonia has a lone pair on its nitrogen that it can donate, so it is a nucleophile. The other three accept electron pairs.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these is a nucleophile? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Ammonia has a lone pair on its nitrogen that it can donate to a slightly positive carbon, so it is a nucleophile: choice A.', show: 'q2.answer' },
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
          items: ['Alkene + HBr: **electrophilic addition**', 'Curly arrows start at **electron pairs**', 'Secondary carbocation: **more stable**, major product'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. An alkene reacts with hydrogen bromide by electrophilic addition.', show: 'sum.0' },
        { say: 'Each curly arrow starts at a pair of electrons, in a bond or a lone pair.', show: 'sum.1' },
        { say: 'And the more stable carbocation gives the major product. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
