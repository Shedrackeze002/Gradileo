import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import series from '@/content/chemmore/videos/cx-1-1.ts';

// Exam question for More Chemistry Topics lesson 1.1 (the reactivity series and displacement):
// ordering three metals by how they fizz in acid, what an iron nail does in copper(II) sulfate
// solution, and which particle is oxidised. Written by Gradileo in the style of a GCSE chemistry exam.
//
// The pictures are the lesson's metals in acid and its iron nail in copper(II) sulfate solution
// (src/video/particles.ts).

const QUESTION = 'A student adds equal pieces of magnesium, zinc and copper to dilute hydrochloric acid. Magnesium fizzes quickly, zinc fizzes slowly and copper shows no change. (a) Put the three metals in order of reactivity, most reactive first. (b) The student then places an iron nail in blue copper(II) sulfate solution. Give two things the student would see. (c) In this reaction, iron atoms change into iron(II) ions. Is iron oxidised or reduced? Explain your answer in terms of electrons.';

const video: Explainer = {
  id: 'xq-cx-1-1',
  lessonId: '',
  exam: {
    lesson: 'cx-1-1',
    source: 'Exam-style question written by Gradileo, in the style of a GCSE chemistry exam',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Three Metals in Acid and an Iron Nail in Copper Sulfate. The Reactivity Series',
  thumbnailTitle: 'Which Metal Wins?',
  thumbnail: 'dp',
  summary:
    'A test-style question, solved one small step at a time: how do three metals in acid show their reactivity, what happens to an iron nail in copper(II) sulfate solution, and which particle is oxidised? The order is magnesium, zinc, copper; the nail gains a brown coating of copper while the blue colour fades; and iron is oxidised because each atom loses two electrons.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Which Metal Wins?', subtitle: 'Reactivity and displacement' }],
      lines: [
        { say: 'In this video, we solve a test-style question about the reactivity series. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of a GCSE chemistry exam question, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'Mg, Zn, Cu; a brown coating and the blue fades; oxidised, it loses electrons' }],
      lines: [
        { say: 'Here is the question. A student adds equal pieces of magnesium, zinc and copper to dilute hydrochloric acid. Magnesium fizzes quickly, zinc fizzes slowly and copper shows no change. Part a: put the three metals in order of reactivity, most reactive first. Part b: the student then places an iron nail in blue copper two sulfate solution. Give two things the student would see. Part c: in this reaction, iron atoms change into iron two ions. Is iron oxidised or reduced? Explain your answer in terms of electrons.', caption: 'Here is the question. A student adds equal pieces of magnesium, zinc and copper to dilute hydrochloric acid. Magnesium fizzes quickly, zinc fizzes slowly and copper shows no change. Part a: put the three metals in order of reactivity, most reactive first. Part b: the student then places an iron nail in blue copper(II) sulfate solution. Give two things the student would see. Part c: in this reaction, iron atoms change into iron(II) ions. Is iron oxidised or reduced? Explain your answer in terms of electrons.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Rank the metals by their **fizzing**, then follow the **electrons** in a displacement' }],
      lines: [
        { say: 'The faster a metal fizzes in acid, the more reactive it is. Then we need to see what a more reactive metal does to the ions of a less reactive one.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(series, 'ma')],
      lines: [
        { say: 'Here is what we need. These are magnesium, zinc and copper in the same dilute acid, up close. Watch the acid particles hit each metal, and count the hydrogen bubbles that rise.', show: ['ma', 'ma.labels', 'ma.key'], play: 'ma.fizz' },
        { say: 'Magnesium fizzes fast, zinc reacts more slowly, and copper does nothing at all.' },
      ],
    },
    {
      layout: 'center',
      main: [pick(series, 'dp')],
      lines: [
        { say: 'And here is an iron nail in blue copper two sulfate solution, beside a piece of copper in iron two sulfate solution.', caption: 'And here is an iron nail in blue copper(II) sulfate solution, beside a piece of copper in iron(II) sulfate solution.', show: ['dp', 'dp.labels', 'dp.key', 'dp.tally'], play: 'dp.go' },
        { say: 'Each copper ion that hits the iron becomes a copper atom on the nail, while an iron atom leaves as an iron two ion. On the right, nothing happens, because copper cannot push out the more reactive iron.', caption: 'Each copper ion that hits the iron becomes a copper atom on the nail, while an iron atom leaves as an iron(II) ion. On the right, nothing happens, because copper cannot push out the more reactive iron.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Faster fizzing = **more reactive**', 'A more reactive metal **displaces** a less reactive one', 'Losing electrons is **oxidation**; gaining them is **reduction**'] }],
      lines: [
        { say: 'Here is the plan. The faster a metal fizzes, the more reactive it is.', show: 'plan.0' },
        { say: 'A more reactive metal displaces a less reactive metal from a solution of its compound.', show: 'plan.1' },
        { say: 'And losing electrons is oxidation, while gaining electrons is reduction.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The order',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Metal', 'In acid', 'Reactivity'],
          rows: [
            ['magnesium', 'fizzes **quickly**', '**most** reactive'],
            ['zinc', 'fizzes **slowly**', 'middle'],
            ['copper', '**no change**', '**least** reactive'],
          ],
        },
      ],
      lines: [
        { say: 'Step one. Magnesium fizzes quickly, so it reacts most readily with the acid.', show: ['t', 't.0'], focus: 't.0' },
        { say: 'Zinc fizzes slowly, so it comes next.', show: 't.1', focus: 't.1' },
        { say: 'And copper does not react at all, so it is the least reactive. The order is magnesium, zinc, copper. That is part a.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Step 2: The iron nail',
      layout: 'center',
      main: [{ kind: 'bullets', id: 's', items: ['Iron is **more reactive** than copper, so it displaces it', 'A **brown coating** of copper forms on the nail', 'The **blue colour fades** as copper ions are used up'] }],
      lines: [
        { say: 'Step two. Iron is more reactive than copper, so iron displaces copper from the solution.', show: 's.0' },
        { say: 'The copper comes out as metal, so a brown coating forms on the nail.', show: 's.1' },
        { say: 'The blue colour comes from the copper ions, so as they are used up, the blue fades. Those are the two observations for part b.', show: 's.2', focus: 's.2' },
      ],
    },
    {
      chapter: 'Step 3: Oxidised or reduced?',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\ce{Fe -> Fe^2+ + 2e-}', '\\text{electrons lost} \\Rightarrow \\good{\\text{oxidised}}'] }],
      lines: [
        { say: 'Step three. Each iron atom becomes an iron two ion by giving away two electrons.', caption: 'Step three. Each iron atom becomes an iron(II) ion by giving away two electrons.', show: 'm.0' },
        { say: 'Losing electrons is oxidation, so iron is oxidised. The copper ions take those electrons, so they are reduced. That is part c.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) **magnesium, zinc, copper**. (b) A **brown coating** forms on the nail and the **blue colour fades**. (c) **Oxidised**: each iron atom **loses two electrons**.' },
      ],
      lines: [
        { say: 'Does it make sense? Iron sits between zinc and copper in the reactivity series, so it should push copper out but not zinc.', show: 'ans' },
        { say: 'So the order is magnesium, zinc, copper, the nail turns brown as the blue fades, and iron is oxidised because it loses electrons.' },
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
            ['Copper is **most** reactive', 'Read the list the wrong way up'],
            ['The nail **turns blue**', 'The blue belongs to the **copper ions**'],
            ['Iron is **reduced**', 'Losing electrons is **oxidation**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'No fizzing means no reaction, so copper is the least reactive of the three.', focus: 'traps.0' },
        { say: 'The blue colour belongs to the copper ions in the solution, and it fades as they turn into copper metal.', focus: 'traps.1' },
        { say: 'And oxidation is loss of electrons, reduction is gain. Iron loses electrons, so it is oxidised.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which metal would displace zinc from zinc sulfate solution?',
          choices: ['magnesium', 'copper', 'silver', 'gold'],
          answer: 0,
          working: 'Only a metal more reactive than zinc can displace it, and of these only magnesium is.',
        },
      ],
      lines: [
        { say: 'Your turn. Which metal would displace zinc from zinc sulfate solution? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Only a metal more reactive than zinc can push it out, and of these only magnesium is: choice A.', show: 'q2.answer' },
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
          items: ['Faster fizzing in acid means **more reactive**', 'A more reactive metal **displaces** a less reactive one', 'The metal that loses electrons is **oxidised**'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The faster a metal fizzes in acid, the more reactive it is.', show: 'sum.0' },
        { say: 'A more reactive metal displaces a less reactive one from a solution of its compound.', show: 'sum.1' },
        { say: 'And the metal that loses electrons is oxidised. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
