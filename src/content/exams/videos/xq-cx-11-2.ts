import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import complexes from '@/content/chemmore/videos/cx-11-2.ts';

// Exam question for More Chemistry Topics lesson 11.2 (transition metal complexes): water as a
// ligand in [Cu(H₂O)₆]²⁺, why the solution is coloured, and the change to [CuCl₄]²⁻. Written by
// Gradileo in the style of an A level chemistry exam.
//
// The picture is the lesson's six water molecules binding to a copper(II) ion
// (src/video/molecules.ts).

const QUESTION = 'Copper(II) sulfate dissolves in water to form the blue complex ion [Cu(H₂O)₆]²⁺. (a) Explain how a water molecule acts as a ligand, and state the coordination number and the shape of this complex. (b) Explain why the solution is coloured. (c) When concentrated hydrochloric acid is added, the solution turns yellow-green as [CuCl₄]²⁻ forms. State the coordination number and shape of [CuCl₄]²⁻, and explain why the coordination number changes.';

const video: Explainer = {
  id: 'xq-cx-11-2',
  lessonId: '',
  exam: {
    lesson: 'cx-11-2',
    source: 'Exam-style question written by Gradileo, in the style of an A level chemistry exam',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Water and Chloride Ligands on Copper(II). Transition Metal Complexes',
  thumbnailTitle: 'Copper Complexes',
  thumbnail: 'aq',
  summary:
    'A test-style question, solved one small step at a time: how does water act as a ligand in [Cu(H₂O)₆]²⁺, why is the solution coloured, and what changes when it becomes [CuCl₄]²⁻? Each water donates a lone pair to form a coordinate bond, giving an octahedral complex with coordination number 6, the split d orbitals absorb some visible light, and chloride ligands are larger, so only four fit around the ion in a tetrahedral shape.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Copper Complexes', subtitle: 'Ligands, colour and shape' }],
      lines: [
        { say: 'In this video, we solve a test-style question about transition metal complexes. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of an A level chemistry exam question, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'Lone pair donated, 6, octahedral; d electrons absorb visible light; 4, tetrahedral, Cl⁻ is larger' }],
      lines: [
        { say: 'Here is the question. Copper two sulfate dissolves in water to form a blue complex ion: copper two with six water ligands. Part a: explain how a water molecule acts as a ligand, and state the coordination number and the shape of this complex. Part b: explain why the solution is coloured. Part c: when concentrated hydrochloric acid is added, the solution turns yellow-green as a complex of copper two with four chloride ligands forms. State its coordination number and shape, and explain why the coordination number changes.', caption: 'Here is the question. Copper(II) sulfate dissolves in water to form the blue complex ion [Cu(H₂O)₆]²⁺. Part a: explain how a water molecule acts as a ligand, and state the coordination number and the shape of this complex. Part b: explain why the solution is coloured. Part c: when concentrated hydrochloric acid is added, the solution turns yellow-green as [CuCl₄]²⁻ forms. State the coordination number and shape of [CuCl₄]²⁻, and explain why the coordination number changes.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Count the **coordinate bonds**, and link **colour** to the **d electrons**' }],
      lines: [
        { say: 'We count the bonds from the ligands to the metal ion to find the shape, and we explain the colour with the copper ion’s d electrons.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(complexes, 'aq')],
      lines: [
        { say: 'Here is what we need. Here is a copper two ion in water, up close.', caption: 'Here is what we need. Here is a Cu²⁺ ion in water, up close.', show: 'aq' },
        { say: 'Six water molecules turn their oxygen atoms towards it, and each donates a lone pair, forming a coordinate bond. That makes the complex ion: its coordination number is six.', play: 'aq.bind' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['A ligand **donates a lone pair**', '6 bonds: **octahedral**; 4 bonds: often **tetrahedral**', 'Split d orbitals **absorb** some visible light'] }],
      lines: [
        { say: 'Here is the plan. A ligand donates a lone pair of electrons to the metal ion.', show: 'plan.0' },
        { say: 'Six coordinate bonds give an octahedral shape, and four often give a tetrahedral one.', show: 'plan.1' },
        { say: 'And the ligands split the d orbitals, so the ion absorbs some visible light.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Water as a ligand',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Question', 'Answer'],
          rows: [
            ['How does water bond?', 'O donates a **lone pair**: a **coordinate bond**'],
            ['Coordination number', '**6**'],
            ['Shape', '**octahedral**, bond angles 90°'],
          ],
        },
      ],
      lines: [
        { say: 'Step one. The oxygen atom of each water molecule has a lone pair, and it donates that pair to the copper ion, forming a coordinate bond.', show: ['t', 't.0'], focus: 't.0' },
        { say: 'Six water molecules bond in this way, so the coordination number is 6.', show: 't.1', focus: 't.1' },
        { say: 'Six bonds arranged around the ion give an octahedral shape, with bond angles of 90 degrees. That is part a.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Step 2: Why it is coloured',
      layout: 'center',
      main: [{ kind: 'bullets', id: 's', items: ['Ligands **split** the d orbitals into two energies', 'A d electron **absorbs** light of energy **ΔE = hν** and jumps up', 'The rest is **transmitted**: we see **blue**'] }],
      lines: [
        { say: 'Step two. The ligands split the copper ion’s d orbitals into two groups with slightly different energies.', show: 's.0' },
        { say: 'A d electron absorbs light whose energy matches the gap, delta E equals h nu, and moves to the higher level. For this ion, that light is in the red and orange part of the spectrum.', caption: 'A d electron absorbs light whose energy matches the gap, ΔE = hν, and moves to the higher level. For this ion, that light is in the red and orange part of the spectrum.', show: 's.1' },
        { say: 'The remaining light passes through, and we see the complementary colour, blue. That is part b.', show: 's.2', focus: 's.2' },
      ],
    },
    {
      chapter: 'Step 3: The chloride complex',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'c',
          head: ['', '[Cu(H₂O)₆]²⁺', '[CuCl₄]²⁻'],
          rows: [
            ['ligand', 'H₂O, small', 'Cl⁻, **larger**'],
            ['coordination number', '6', '**4**'],
            ['shape', 'octahedral', '**tetrahedral**'],
          ],
        },
      ],
      lines: [
        { say: 'Step three. Chloride ions are much larger than water molecules.', show: ['c', 'c.0'], focus: 'c.0' },
        { say: 'Only four of them fit around the copper ion, so the coordination number falls to 4.', show: 'c.1', focus: 'c.1' },
        { say: 'Four ligands spread as far apart as possible give a tetrahedral shape, with bond angles of 109.5 degrees. That is part c.', show: 'c.2', focus: 'c.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) Each O **donates a lone pair** (coordinate bond); **6**, **octahedral**. (b) Split **d orbitals**: electrons **absorb** some visible light, and the rest is seen. (c) **4**, **tetrahedral**: Cl⁻ is **larger**, so only four fit.' },
      ],
      lines: [
        { say: 'Does it make sense? Check the charge: copper two is plus 2, and four chloride ions add minus 4, so the complex is two minus, as the question says.', caption: 'Does it make sense? Check the charge: Cu²⁺ is +2, and four Cl⁻ add −4, so the complex is 2−, as the question says.', show: 'ans' },
        { say: 'So water donates lone pairs to give an octahedral complex, d electrons absorbing light give the colour, and the larger chloride ligands give a tetrahedral complex.' },
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
            ['The **metal** donates electrons', 'The **ligand** donates the pair'],
            ['It **absorbs blue** light', 'Blue is what is **transmitted**'],
            ['[CuCl₄]²⁻ is **square planar**', 'Four large ligands: **tetrahedral**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'In a coordinate bond, both electrons come from the ligand.', focus: 'traps.0' },
        { say: 'The solution looks blue because blue light is not absorbed and reaches our eyes.', focus: 'traps.1' },
        { say: 'And square planar is found for some four-coordinate complexes, such as cisplatin, but this chloride complex is tetrahedral.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'What is the shape of [Ag(NH₃)₂]⁺, used in Tollens\' reagent?',
          choices: ['octahedral', 'linear', 'tetrahedral', 'square planar'],
          answer: 1,
          working: 'Two ligands on opposite sides of the silver ion give a linear complex, with a bond angle of 180°.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the shape of the silver complex with two ammonia ligands, used in Tollens\' reagent? Pause the video and try it.', caption: 'Your turn. What is the shape of [Ag(NH₃)₂]⁺, used in Tollens\' reagent? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Two ligands on opposite sides of the silver ion give a linear complex, with a bond angle of 180 degrees: choice B.', show: 'q2.answer' },
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
          items: ['Ligand: donates a **lone pair**', '6 ligands **octahedral**, 4 chlorides **tetrahedral**', 'Colour: d electrons **absorb** part of the visible light'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A ligand donates a lone pair to the metal ion, forming a coordinate bond.', show: 'sum.0' },
        { say: 'Six small ligands give an octahedral complex, and four large chloride ligands a tetrahedral one.', show: 'sum.1' },
        { say: 'And complexes are coloured because d electrons absorb part of the visible light. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
