import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import bornHaber from '@/content/chemmore/videos/cx-10-1.ts';

// Exam question for More Chemistry Topics lesson 10.1 (Born–Haber cycles and lattice enthalpy):
// the lattice enthalpy of sodium chloride from a cycle, why the first electron affinity of chlorine
// is exothermic, and why magnesium oxide has a larger lattice enthalpy. Written by Gradileo in the
// style of an A level chemistry exam.
//
// The picture is the lesson's sodium atom giving its electron to a chlorine atom (src/video/atoms.ts).

const QUESTION = 'Use these data, in kJ mol⁻¹, for sodium chloride: enthalpy of formation of NaCl(s) −411; enthalpy of atomisation of sodium +107; first ionisation energy of sodium +496; enthalpy of atomisation of chlorine +122; first electron affinity of chlorine −349. (a) Use a Born–Haber cycle to calculate the enthalpy of lattice formation of sodium chloride. (b) Explain why the first electron affinity of chlorine is exothermic. (c) Explain why the enthalpy of lattice formation of magnesium oxide is much more exothermic than that of sodium chloride.';

const video: Explainer = {
  id: 'xq-cx-10-1',
  lessonId: '',
  exam: {
    lesson: 'cx-10-1',
    source: 'Exam-style question written by Gradileo, in the style of an A level chemistry exam',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: The Lattice Enthalpy of Sodium Chloride. Born–Haber Cycles',
  thumbnailTitle: 'Born–Haber Cycle',
  thumbnail: 'nc',
  summary:
    'A test-style question, solved one small step at a time: what is the enthalpy of lattice formation of sodium chloride, why is chlorine’s first electron affinity exothermic, and why is magnesium oxide’s lattice enthalpy so much larger? By Hess’s law the lattice enthalpy is −411 − (107 + 496 + 122 − 349) = −787 kJ mol⁻¹, the incoming electron is attracted to the chlorine nucleus, and Mg²⁺ and O²⁻ have double the charges and are smaller.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Born–Haber Cycle', subtitle: 'The lattice enthalpy of sodium chloride' }],
      lines: [
        { say: 'In this video, we solve a test-style question about a Born–Haber cycle. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of an A level chemistry exam question, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: '−787 kJ mol⁻¹; attraction to the nucleus; bigger charges, smaller ions' }],
      lines: [
        { say: 'Here is the question. Use these data, in kilojoules per mole, for sodium chloride. The enthalpy of formation of solid sodium chloride is minus 411. The enthalpy of atomisation of sodium is plus 107. The first ionisation energy of sodium is plus 496. The enthalpy of atomisation of chlorine is plus 122. And the first electron affinity of chlorine is minus 349. Part a: use a Born–Haber cycle to calculate the enthalpy of lattice formation of sodium chloride. Part b: explain why the first electron affinity of chlorine is exothermic. Part c: explain why the enthalpy of lattice formation of magnesium oxide is much more exothermic than that of sodium chloride.', caption: 'Here is the question. Use these data, in kJ mol⁻¹, for sodium chloride: enthalpy of formation of NaCl(s) −411; enthalpy of atomisation of sodium +107; first ionisation energy of sodium +496; enthalpy of atomisation of chlorine +122; first electron affinity of chlorine −349. Part a: use a Born–Haber cycle to calculate the enthalpy of lattice formation of sodium chloride. Part b: explain why the first electron affinity of chlorine is exothermic. Part c: explain why the enthalpy of lattice formation of magnesium oxide is much more exothermic than that of sodium chloride.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Two routes from the **elements** to the **solid** give the **same** total' }],
      lines: [
        { say: 'We can make solid sodium chloride from its elements in one step, or by first making gaseous ions and then bringing them together. By Hess’s law, both routes have the same total enthalpy change.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(bornHaber, 'nc')],
      lines: [
        { say: 'Here is what we need. Here are a sodium atom and a chlorine atom, both gaseous and far apart.', show: ['nc', 'nc.labels', 'nc.arrangement'] },
        { say: 'Watch the electron move. Removing it from sodium takes energy, the ionisation energy, and chlorine taking it gives some back, the electron affinity. Then the ions come together to form the lattice.', play: 'nc.give' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Elements → gaseous **atoms** → gaseous **ions** → **lattice**', 'Formation = sum of the steps', 'Lattice enthalpy grows with **charge** and shrinks with **size**'] }],
      lines: [
        { say: 'Here is the plan. The long route turns the elements into gaseous atoms, then gaseous ions, and then the ions form the lattice.', show: 'plan.0' },
        { say: 'The enthalpy of formation equals the sum of all the steps on the long route.', show: 'plan.1' },
        { say: 'And the size of a lattice enthalpy depends on the charges and the sizes of the ions.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The cycle',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\Delta_f H = 107 + 496 + 122 + (-349) + \\Delta_{\\text{latt}} H', '-411 = 376 + \\Delta_{\\text{latt}} H', '\\good{\\Delta_{\\text{latt}} H = -787 \\text{ kJ mol}^{-1}}'] }],
      lines: [
        { say: 'Step one. The enthalpy of formation equals the atomisation of sodium, plus its ionisation energy, plus the atomisation of chlorine, plus its electron affinity, plus the lattice enthalpy we want.', show: 'm.0' },
        { say: '107 plus 496 plus 122 minus 349 is plus 376. So minus 411 equals 376 plus the lattice enthalpy.', show: 'm.1' },
        { say: 'Subtracting 376 from both sides, the enthalpy of lattice formation is minus 787 kilojoules per mole. That is part a.', caption: 'Subtracting 376 from both sides, the enthalpy of lattice formation is −787 kJ mol⁻¹. That is part a.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: The electron affinity',
      layout: 'center',
      main: [{ kind: 'bullets', id: 's', items: ['The electron enters chlorine’s **outer shell**', 'It is **attracted** to the positive **nucleus**', 'Forming an attraction **releases** energy: **exothermic**'] }],
      lines: [
        { say: 'Step two. When a chlorine atom gains an electron, the electron goes into its outer shell.', show: 's.0' },
        { say: 'There it is attracted by the positive nucleus, which is only partly shielded.', show: 's.1' },
        { say: 'Forming an attraction releases energy, so the first electron affinity is exothermic. That is part b.', show: 's.2', focus: 's.2' },
      ],
    },
    {
      chapter: 'Step 3: Magnesium oxide',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['', 'NaCl', 'MgO'],
          rows: [
            ['ion charges', '1+ and 1−', '**2+ and 2−**'],
            ['ion size', 'larger', '**smaller**'],
            ['attraction between ions', 'weaker', '**much stronger**'],
          ],
        },
      ],
      lines: [
        { say: 'Step three. Magnesium and oxide ions carry charges of two plus and two minus, double those of sodium and chloride ions.', show: ['t', 't.0'], focus: 't.0' },
        { say: 'They are also smaller, so their centres get closer together.', show: 't.1', focus: 't.1' },
        { say: 'Higher charges and smaller ions give a much stronger attraction, so far more energy is released when the lattice forms. That is part c.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) **−787 kJ mol⁻¹**. (b) The added electron is **attracted to the nucleus**, so energy is **released**. (c) Mg²⁺ and O²⁻ have **larger charges** and are **smaller**, so they attract **more strongly**.' },
      ],
      lines: [
        { say: 'Does it make sense? Lattice formation brings oppositely charged ions together, so it must be strongly exothermic, and minus 787 is a large negative number, as we expect.', caption: 'Does it make sense? Lattice formation brings oppositely charged ions together, so it must be strongly exothermic, and −787 is a large negative number, as we expect.', show: 'ans' },
        { say: 'So the cycle gives minus 787 kilojoules per mole, the electron is pulled in by the nucleus, and bigger charges on smaller ions mean a bigger lattice enthalpy.', caption: 'So the cycle gives −787 kJ mol⁻¹, the electron is pulled in by the nucleus, and bigger charges on smaller ions mean a bigger lattice enthalpy.' },
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
            ['**+787** kJ mol⁻¹', 'Formation of a lattice is **exothermic**'],
            ['**−35** kJ mol⁻¹', 'Added **all** the values together'],
            ['Doubled the **chlorine** atomisation', 'It is already **per mole of Cl atoms**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Plus 787 is the lattice dissociation enthalpy, the reverse process. The question asks for formation.', caption: '+787 is the lattice dissociation enthalpy, the reverse process. The question asks for formation.', focus: 'traps.0' },
        { say: 'Adding all five values, including the enthalpy of formation, gives minus 35, which mixes up the two routes.', caption: 'Adding all five values, including the enthalpy of formation, gives −35, which mixes up the two routes.', focus: 'traps.1' },
        { say: 'And the atomisation enthalpy is already for one mole of chlorine atoms, which is exactly what one mole of sodium chloride needs.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which compound has the most exothermic enthalpy of lattice formation?',
          choices: ['MgO', 'NaCl', 'KCl', 'NaBr'],
          answer: 0,
          working: 'MgO has 2+ and 2− ions, and they are small, so the attraction between them is the strongest.',
        },
      ],
      lines: [
        { say: 'Your turn. Which compound has the most exothermic enthalpy of lattice formation? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Magnesium oxide has ions with two plus and two minus charges, and they are small, so it wins: choice A.', show: 'q2.answer' },
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
          items: ['Formation = sum of the steps (Hess’s law)', 'NaCl: lattice formation **−787 kJ mol⁻¹**', 'Bigger **charges**, smaller **ions**: larger lattice enthalpy'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. By Hess’s law, the enthalpy of formation equals the sum of the steps around the cycle.', show: 'sum.0' },
        { say: 'For sodium chloride, the enthalpy of lattice formation is minus 787 kilojoules per mole.', caption: 'For sodium chloride, the enthalpy of lattice formation is −787 kJ mol⁻¹.', show: 'sum.1' },
        { say: 'And bigger charges on smaller ions give a larger lattice enthalpy. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
