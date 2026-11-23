import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import ions from '@/content/chemmore/videos/cx-11-3.ts';

// Exam question for More Chemistry Topics lesson 11.3 (metal ions in solution): why 3+ aqua ions
// are more acidic, copper(II) with a little hydroxide, and the copper hydroxide dissolving in excess
// ammonia. Written by Gradileo in the style of an A level chemistry exam.
//
// The picture is the lesson's copper(II) ions meeting hydroxide ions (src/video/particles.ts).

const QUESTION = 'This question is about metal aqua ions. (a) Explain why a solution containing [Fe(H₂O)₆]³⁺ is more acidic than a solution containing [Fe(H₂O)₆]²⁺ of the same concentration. (b) A few drops of sodium hydroxide solution are added to a solution of [Cu(H₂O)₆]²⁺. Describe what you would see and write an equation for the reaction. (c) Excess concentrated ammonia solution is then added. Describe what you would see and give the formula of the copper complex formed.';

const video: Explainer = {
  id: 'xq-cx-11-3',
  lessonId: '',
  exam: {
    lesson: 'cx-11-3',
    source: 'Exam-style question written by Gradileo, in the style of an A level chemistry exam',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Iron Aqua Ions, Copper Hydroxide and Excess Ammonia. Metal Ions in Solution',
  thumbnailTitle: 'Metal Aqua Ions',
  thumbnail: 'cu',
  summary:
    'A test-style question, solved one small step at a time: why is the iron(III) aqua ion more acidic than the iron(II) one, what happens when hydroxide is added to copper(II), and what does excess ammonia do? Fe³⁺ is smaller with a higher charge, so it polarises the water ligands more; a pale blue precipitate of [Cu(H₂O)₄(OH)₂] forms; and with excess ammonia it dissolves to a deep blue solution of [Cu(NH₃)₄(H₂O)₂]²⁺.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Metal Aqua Ions', subtitle: 'Acidity, precipitates and ammonia' }],
      lines: [
        { say: 'In this video, we solve a test-style question about metal ions in solution. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of an A level chemistry exam question, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'Higher charge density; pale blue precipitate; deep blue solution, [Cu(NH₃)₄(H₂O)₂]²⁺' }],
      lines: [
        { say: 'Here is the question. This question is about metal aqua ions. Part a: explain why a solution of the iron three aqua ion is more acidic than a solution of the iron two aqua ion of the same concentration. Part b: a few drops of sodium hydroxide solution are added to a solution of the copper two aqua ion. Describe what you would see and write an equation for the reaction. Part c: excess concentrated ammonia solution is then added. Describe what you would see and give the formula of the copper complex formed.', caption: 'Here is the question. This question is about metal aqua ions. Part a: explain why a solution containing [Fe(H₂O)₆]³⁺ is more acidic than a solution containing [Fe(H₂O)₆]²⁺ of the same concentration. Part b: a few drops of sodium hydroxide solution are added to a solution of [Cu(H₂O)₆]²⁺. Describe what you would see and write an equation for the reaction. Part c: excess concentrated ammonia solution is then added. Describe what you would see and give the formula of the copper complex formed.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Follow the **water ligands** as they lose H⁺ or are **replaced**' }],
      lines: [
        { say: 'In each part, something happens to the water ligands around the metal ion. They either lose hydrogen ions, or they are replaced by other ligands.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(ions, 'cu')],
      lines: [
        { say: 'Here is what we need. Here is copper two sulfate solution meeting sodium hydroxide, up close.', caption: 'Here is what we need. Here is copper(II) sulfate solution meeting sodium hydroxide, up close.', show: ['cu', 'cu.labels', 'cu.key'] },
        { say: 'Each copper two ion collects two hydroxide ions, and the neutral copper two hydroxide sinks: the blue precipitate.', caption: 'Each Cu²⁺ ion collects two OH⁻ ions, and the neutral Cu(OH)₂ sinks: the blue precipitate.', show: 'cu.tally', play: 'cu.mix' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Higher **charge density** pulls harder on the water ligands', 'OH⁻ removes H⁺: a **neutral** hydroxide **precipitates**', 'Excess NH₃ **replaces** water ligands'] }],
      lines: [
        { say: 'Here is the plan. A metal ion with a higher charge density pulls harder on the electrons of its water ligands.', show: 'plan.0' },
        { say: 'Hydroxide ions remove hydrogen ions from the water ligands, leaving a neutral complex that precipitates.', show: 'plan.1' },
        { say: 'And excess ammonia can replace water ligands to form a new complex that dissolves.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Iron three versus iron two',
      layout: 'center',
      main: [{ kind: 'bullets', id: 's', items: ['Fe³⁺ is **smaller** with a **higher charge**', 'It **polarises** the O–H bonds of its water ligands more', 'They release **H⁺** more easily: more **acidic**'] }],
      lines: [
        { say: 'Step one. The iron three ion is smaller than the iron two ion and has a higher charge, so its charge density is higher.', caption: 'Step one. The Fe³⁺ ion is smaller than the Fe²⁺ ion and has a higher charge, so its charge density is higher.', show: 's.0' },
        { say: 'It pulls electron density from the oxygen of each water ligand, which weakens the O H bonds.', caption: 'It pulls electron density from the oxygen of each water ligand, which weakens the O–H bonds.', show: 's.1' },
        { say: 'So the water ligands release hydrogen ions more easily, and the solution is more acidic. That is part a.', show: 's.2', focus: 's.2' },
      ],
    },
    {
      chapter: 'Step 2: A little hydroxide',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\ce{[Cu(H2O)6]^2+ + 2OH- -> [Cu(H2O)4(OH)2] + 2H2O}', '\\good{\\text{pale blue precipitate}}'] }],
      lines: [
        { say: 'Step two. Two hydroxide ions each take a hydrogen ion from a water ligand. The complex loses its charge and becomes copper two with four waters and two hydroxides.', caption: 'Step two. Two OH⁻ ions each take a hydrogen ion from a water ligand. The complex loses its charge: [Cu(H₂O)₆]²⁺ + 2OH⁻ → [Cu(H₂O)₄(OH)₂] + 2H₂O.', show: 'm.0' },
        { say: 'A neutral complex does not dissolve, so we see a pale blue precipitate. That is part b.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Excess ammonia',
      layout: 'center',
      main: [{ kind: 'math', id: 'n', size: 'md', lines: ['\\text{precipitate dissolves: } \\good{\\text{deep blue solution}}', '\\good{\\ce{[Cu(NH3)4(H2O)2]^2+}}'] }],
      lines: [
        { say: 'Step three. With excess concentrated ammonia, the precipitate dissolves and the solution turns a deep, dark blue.', show: 'n.0' },
        { say: 'Four ammonia ligands replace four of the ligands, giving copper two with four ammonias and two waters, a charged complex that dissolves. That is part c.', caption: 'Four ammonia ligands replace four of the ligands, giving [Cu(NH₃)₄(H₂O)₂]²⁺, a charged complex that dissolves. That is part c.', show: 'n.1', focus: 'n.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) Fe³⁺ has a **higher charge density**, so it **polarises** its water ligands more and they lose **H⁺** more easily. (b) A **pale blue precipitate**; **[Cu(H₂O)₆]²⁺ + 2OH⁻ → [Cu(H₂O)₄(OH)₂] + 2H₂O**. (c) It **dissolves** to a **deep blue** solution of **[Cu(NH₃)₄(H₂O)₂]²⁺**.' },
      ],
      lines: [
        { say: 'Does it make sense? The copper complex keeps six ligands throughout: six waters, then four waters and two hydroxides, then four ammonias and two waters.', show: 'ans' },
        { say: 'So charge density explains the acidity, hydroxide gives a pale blue precipitate, and excess ammonia gives a deep blue solution.' },
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
            ['Fe³⁺ has **more water** ligands', 'Both have **six**'],
            ['Precipitate is **[Cu(OH)₂]²⁺**', 'It is **neutral**: that is why it precipitates'],
            ['**Six** NH₃ ligands', 'Four NH₃ and **two water**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Both iron ions have six water ligands. The difference is the charge and size of the metal ion.', focus: 'traps.0' },
        { say: 'The hydroxide complex has no overall charge, and that is exactly why it comes out of solution.', focus: 'traps.1' },
        { say: 'And only four of the ligands are replaced by ammonia. Two water ligands stay.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which hydroxide precipitate dissolves in excess sodium hydroxide?',
          choices: ['copper(II) hydroxide', 'iron(II) hydroxide', 'aluminium hydroxide', 'iron(III) hydroxide'],
          answer: 2,
          working: 'Aluminium hydroxide is amphoteric: excess OH⁻ removes more H⁺ and gives the soluble [Al(OH)₄]⁻ ion.',
        },
      ],
      lines: [
        { say: 'Your turn. Which hydroxide precipitate dissolves in excess sodium hydroxide? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Aluminium hydroxide is amphoteric. Excess hydroxide removes more hydrogen ions and gives a soluble, negatively charged ion: choice C.', show: 'q2.answer' },
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
          items: ['3+ aqua ions are **more acidic** than 2+', 'Cu²⁺ + OH⁻: **pale blue precipitate**', 'Excess NH₃: **deep blue** [Cu(NH₃)₄(H₂O)₂]²⁺'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Three plus aqua ions are more acidic than two plus ones, because of their higher charge density.', show: 'sum.0' },
        { say: 'Copper two ions with hydroxide give a pale blue precipitate.', show: 'sum.1' },
        { say: 'And excess ammonia dissolves it to a deep blue solution. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
