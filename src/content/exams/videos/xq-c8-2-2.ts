import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import metals from '@/content/chem8/videos/c8-2-2.ts';

// Exam question for Chemistry 8 lesson 2.2 (metals and non-metals): two unknown solids sorted by
// their properties, why a metal can be hammered (its layers of atoms slide), and silicon as a
// metalloid. Written by Gradileo in the style of a Grade 8 science unit test.
//
// The picture is the lesson's bar of copper hammered up close (src/video/particles.ts): its layers
// of atoms slide over one another but stay held together.

const QUESTION = 'A student tests two unknown solid elements. Solid X is shiny, bends when it is hammered, and conducts electricity. Solid Y is dull, crumbles when it is hammered, and does not conduct electricity. (a) Which is a metal and which is a non-metal? (b) Use the particle model to explain why X bends instead of breaking. (c) Silicon is shiny like a metal, but brittle, and conducts electricity only a little. What kind of element is silicon?';

const video: Explainer = {
  id: 'xq-c8-2-2',
  lessonId: '',
  exam: {
    lesson: 'c8-2-2',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 8 science unit test',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Two Unknown Solids. Metals and Non-metals',
  thumbnailTitle: 'Two Unknown Solids',
  thumbnail: 'hit',
  summary:
    'A test-style question, solved one small step at a time: one solid is shiny, bends and conducts, and another is dull, crumbles and does not conduct. Which is the metal, why does it bend, and what is silicon, which is shiny but brittle? X is a metal whose layers of atoms slide without breaking apart, Y is a non-metal, and silicon is a metalloid.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Two Unknown Solids', subtitle: 'Telling metals from non-metals' }],
      lines: [
        { say: 'In this video, we solve a test-style question about metals and non-metals. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of a grade eight science unit test, and everything you need is in the question.', caption: 'It is written in the style of a Grade 8 science unit test, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'X metal, Y non-metal; layers slide; a metalloid' }],
      lines: [
        { say: 'Here is the question. A student tests two unknown solid elements. Solid X is shiny, bends when it is hammered, and conducts electricity. Solid Y is dull, crumbles when it is hammered, and does not conduct electricity. Part a: which is a metal and which is a non-metal? Part b: use the particle model to explain why X bends instead of breaking. Part c: silicon is shiny like a metal, but brittle, and conducts electricity only a little. What kind of element is silicon?', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Match each set of **properties** to metal or non-metal, then explain one of them with **particles**' }],
      lines: [
        { say: 'We are given properties, not names. We match them to metals or non-metals, then explain the bending with particles, and place silicon, which has a bit of both.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'table', id: 'props', head: ['Property', 'Metals', 'Non-metals'], rows: [['appearance', 'shiny', 'usually dull'], ['when hammered', '**bend** (malleable)', '**shatter** (brittle)'], ['electricity', '**conduct**', 'do not conduct']] }],
      lines: [
        { say: 'Here is what we need. Metals are shiny, and non-metals are usually dull.', show: ['props', 'props.0'], focus: 'props.0' },
        { say: 'Metals bend when hammered, which we call malleable. Solid non-metals shatter, which we call brittle.', show: 'props.1', focus: 'props.1' },
        { say: 'And metals conduct electricity, while non-metals do not.', show: 'props.2', focus: 'props.2' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Shiny, bends, conducts: **metal**', 'Dull, brittle, does not conduct: **non-metal**', 'Some of each: **metalloid**'] }],
      lines: [
        { say: 'Here is the plan. Shiny, bending and conducting point to a metal.', show: 'plan.0' },
        { say: 'Dull, brittle and not conducting point to a non-metal.', show: 'plan.1' },
        { say: 'And an element with some properties of each is a metalloid.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Sort them',
      layout: 'center',
      main: [{ kind: 'table', id: 't', head: ['Solid', 'Properties', 'So it is'], rows: [['X', 'shiny, bends, conducts', 'a **metal**'], ['Y', 'dull, crumbles, does not conduct', 'a **non-metal**']] }],
      lines: [
        { say: 'Step one. X is shiny, bends and conducts, all three metal properties. So X is a metal.', show: ['t', 't.0'], focus: 't.0' },
        { say: 'Y is dull, brittle and does not conduct, all three non-metal properties. So Y is a non-metal. That is part a.', show: 't.1', focus: 't.1' },
      ],
    },
    {
      chapter: 'Step 2: Why X bends',
      layout: 'center',
      main: [pick(metals, 'hit')],
      lines: [
        { say: 'Step two. Here are the atoms of a metal bar, up close. They sit in neat layers.', show: ['hit', 'hit.labels', 'hit.key'] },
        { say: 'Now hit it. The layers of atoms slide over one another, but they stay held together, so the metal changes shape instead of breaking. That is why X bends. That is part b.', play: 'hit.hit' },
      ],
    },
    {
      chapter: 'Step 3: Silicon',
      layout: 'center',
      main: [{ kind: 'table', id: 's', head: ['Silicon', 'Like a…'], rows: [['shiny', 'metal'], ['brittle', 'non-metal'], ['conducts a **little**', 'in between']] }],
      lines: [
        { say: 'Step three. Silicon is shiny, like a metal. But it is brittle, like a non-metal. And it conducts electricity only a little, in between the two.', show: 's' },
        { say: 'An element with properties of both is called a metalloid. Silicon sits right next to the zigzag line on the periodic table, between the metals and the non-metals. That is part c.', focus: ['s.0', 's.1', 's.2'] },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) X is a **metal**, Y is a **non-metal**. (b) X\'s atoms are in **layers** that **slide** over one another but stay held together. (c) A **metalloid**.' },
      ],
      lines: [
        { say: 'Does it make sense? Silicon\'s in between behaviour is exactly why it is used in computer chips, where a material that conducts only a little is just what is needed.', show: 'ans' },
        { say: 'So X is a metal because its layers slide, Y is a non-metal, and silicon is a metalloid.' },
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
            ['Silicon is a **metal**', 'Judged it on **one** property, shininess'],
            ['The atoms get **squashed**', 'The layers **slide**; the atoms do not change'],
            ['Y is a metal because it is **solid**', 'Many non-metals are solids too'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Shininess alone does not make a metal. Silicon is brittle and a poor conductor, so it is a metalloid.', focus: 'traps.0' },
        { say: 'The atoms are not squashed or bent. Whole layers of atoms slide past each other.', focus: 'traps.1' },
        { say: 'And being solid does not make something a metal. Carbon, sulfur and iodine are solid non-metals.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which property shows that an element is a metal?',
          choices: ['It is a gas', 'It conducts electricity', 'It is dull', 'It shatters when hit'],
          answer: 1,
          working: 'Conducting electricity is a metal property. The other three are typical of non-metals.',
        },
      ],
      lines: [
        { say: 'Your turn. Which property shows that an element is a metal? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Conducting electricity is a metal property: choice B. Being a gas, dull or brittle are all typical of non-metals.', show: 'q2.answer' },
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
          items: ['Metals: **shiny**, **malleable**, **conduct**', 'Non-metals: **dull**, **brittle**, **insulators**', 'Metalloids, like **silicon**, are in between'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Metals are shiny, they bend because their layers of atoms slide, and they conduct.', show: 'sum.0' },
        { say: 'Non-metals are usually dull, brittle, and do not conduct.', show: 'sum.1' },
        { say: 'And metalloids, like silicon, are in between. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
