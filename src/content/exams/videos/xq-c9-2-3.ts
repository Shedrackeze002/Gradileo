import type { Explainer } from '@/video/script.ts';
import { reaction } from '../../chem10/videos/lib/c10-equations.ts';

// Exam question for Chemistry 9 lesson 2.3 (naming compounds): name two ionic compounds and two
// covalent ones, and explain why covalent names use prefixes and ionic names do not. Written by
// Gradileo in the style of a Grade 9 science unit test.
//
// The picture is nitrogen and oxygen molecules joining into dinitrogen tetroxide, atom by atom
// (src/content/chem10/videos/lib/c10-equations.ts).

const QUESTION = 'Name each compound. (a) The ionic compounds MgCl₂ and Na₂SO₄. (b) The covalent compounds N₂O₄ and PCl₃. (c) CO₂ is called carbon dioxide, but MgCl₂ is not called magnesium dichloride. Explain why covalent names use number prefixes but ionic names do not.';

const video: Explainer = {
  id: 'xq-c9-2-3',
  lessonId: '',
  exam: {
    lesson: 'c9-2-3',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 9 science unit test',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Magnesium Chloride to Dinitrogen Tetroxide. Naming Compounds',
  thumbnailTitle: 'Naming Ionic and Covalent Compounds',
  thumbnail: 'nt',
  summary:
    'A test-style question, solved one small step at a time: what are the names of MgCl₂, Na₂SO₄, N₂O₄ and PCl₃, and why do covalent names count atoms with prefixes? The ionic ones are magnesium chloride and sodium sulfate, the covalent ones are dinitrogen tetroxide and phosphorus trichloride, and prefixes are needed because two non-metals can join in more than one ratio, while the charges fix an ionic ratio.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Naming Ionic and Covalent Compounds', subtitle: 'Endings and prefixes' }],
      lines: [
        { say: 'In this video, we solve a test-style question about naming compounds. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of a grade nine science unit test, and everything you need is in the question.', caption: 'It is written in the style of a Grade 9 science unit test, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'Magnesium chloride, sodium sulfate; dinitrogen tetroxide, phosphorus trichloride' }],
      lines: [
        { say: 'Here is the question. Name each compound. Part a: the ionic compounds M g C l two and N a two S O four. Part b: the covalent compounds N two O four and P C l three. Part c: C O two is called carbon dioxide, but M g C l two is not called magnesium dichloride. Explain why covalent names use number prefixes but ionic names do not.', caption: 'Here is the question. Name each compound. (a) The ionic compounds MgCl₂ and Na₂SO₄. (b) The covalent compounds N₂O₄ and PCl₃. (c) CO₂ is carbon dioxide, but MgCl₂ is not magnesium dichloride. Explain why covalent names use number prefixes but ionic names do not.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Use the **ionic** rules for metal compounds and the **covalent** rules, with prefixes, for non-metals' }],
      lines: [
        { say: 'Ionic and covalent compounds are named by slightly different rules, so first we decide which kind each compound is, then apply the right rules.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [reaction('nt', { from: [{ t: 'N2' }, { t: 'O2', n: 2 }], to: [{ t: 'N2O4' }], counts: true })],
      lines: [
        { say: 'Here is what we need. These are one nitrogen molecule and two oxygen molecules, both non-metals.', show: 'nt' },
        { say: 'Watch them join. The atoms share electrons to make one molecule with two nitrogen atoms and four oxygen atoms. Nitrogen and oxygen can join in several other ratios too, so the name has to count the atoms: two is di, and four is tetra.', play: 'nt.go' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Ionic: metal first, then the negative ion, **no** prefixes', 'One element: **-ide**. Polyatomic ion: keeps its **name**', 'Covalent: **prefixes** count the atoms; second element ends in **-ide**'] }],
      lines: [
        { say: 'Here is the plan. Name an ionic compound with the metal first, then the negative ion, and no number prefixes.', show: 'plan.0' },
        { say: 'A single non-metal ion ends in i d e, and a polyatomic ion keeps its own name.', show: 'plan.1' },
        { say: 'Covalent names use prefixes to count the atoms: mono, di, tri, tetra, penta. The second element ends in i d e.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The ionic compounds',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Formula', 'Ions', 'Name'],
          rows: [
            ['MgCl₂', 'Mg²⁺ and Cl⁻', '**magnesium chloride**'],
            ['Na₂SO₄', 'Na⁺ and SO₄²⁻', '**sodium sulfate**'],
          ],
        },
      ],
      lines: [
        { say: 'Step one. M g C l two holds magnesium ions and chloride ions. Magnesium keeps its name, chlorine becomes chloride, and we do not say the two. So it is magnesium chloride.', caption: 'Step one. MgCl₂ holds magnesium ions and chloride ions. Magnesium keeps its name, chlorine becomes chloride, and we do not say the 2. So it is magnesium chloride.', show: ['t', 't.0'], focus: 't.0' },
        { say: 'N a two S O four holds sodium ions and the sulfate ion, a polyatomic ion that keeps its own name. So it is sodium sulfate. That is part a.', caption: 'Na₂SO₄ holds sodium ions and the sulfate ion, a polyatomic ion that keeps its own name. So it is sodium sulfate. That is part a.', show: 't.1', focus: 't.1' },
      ],
    },
    {
      chapter: 'Step 2: The covalent compounds',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'c',
          head: ['Formula', 'Count', 'Name'],
          rows: [
            ['N₂O₄', '2 N (**di**), 4 O (**tetra**)', '**dinitrogen tetroxide**'],
            ['PCl₃', '1 P (no prefix), 3 Cl (**tri**)', '**phosphorus trichloride**'],
          ],
        },
      ],
      lines: [
        { say: 'Step two. N two O four has two nitrogen atoms, so di nitrogen, and four oxygen atoms, so tetra oxide. Tetra-oxide is shortened to tetroxide: dinitrogen tetroxide.', caption: 'Step two. N₂O₄ has two N atoms, so dinitrogen, and four O atoms, so tetra-oxide, shortened to tetroxide: dinitrogen tetroxide.', show: ['c', 'c.0'], focus: 'c.0' },
        { say: 'P C l three has one phosphorus atom, and the first element takes no prefix when there is only one. Three chlorine atoms make trichloride. So it is phosphorus trichloride. That is part b.', caption: 'PCl₃ has one P atom, and the first element takes no prefix when there is only one. Three Cl atoms make trichloride. So it is phosphorus trichloride. That is part b.', show: 'c.1', focus: 'c.1' },
      ],
    },
    {
      chapter: 'Step 3: Why prefixes?',
      layout: 'center',
      main: [{ kind: 'bullets', id: 's', items: ['Carbon and oxygen make **CO** and **CO₂**: the name must say **which**', 'Mg²⁺ and Cl⁻ can only balance **one way**: MgCl₂', 'So ionic names need **no** prefixes'] }],
      lines: [
        { say: 'Step three. Two non-metals can join in more than one ratio. Carbon and oxygen make both carbon monoxide and carbon dioxide, so the name must count the atoms.', show: 's.0' },
        { say: 'In an ionic compound, the charges fix the ratio. Magnesium two plus and chloride one minus can only balance as one magnesium to two chlorides.', show: 's.1' },
        { say: 'So the name magnesium chloride already tells us the formula, and no prefix is needed. That is part c.', show: 's.2', focus: 's.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) **Magnesium chloride** and **sodium sulfate**. (b) **Dinitrogen tetroxide** and **phosphorus trichloride**. (c) Non-metals can join in **more than one ratio**, so the atoms must be counted; in ionic compounds the **charges fix** the ratio.' },
      ],
      lines: [
        { say: 'Does it make sense? Read each name back, and you can rebuild the formula from it, which is exactly what a name is for.', show: 'ans' },
        { say: 'So the ionic compounds are magnesium chloride and sodium sulfate, the covalent ones are dinitrogen tetroxide and phosphorus trichloride, and prefixes are only needed where the ratio could vary.' },
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
            ['Sodium **sulfide**', 'Sulf**ate** has oxygen; sulf**ide** is S alone'],
            ['**Mono**phosphorus trichloride', 'No mono on the **first** element'],
            ['Magnesium **di**chloride', 'Prefixes are for **covalent** names only'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'S O four is sulfate, sulfur with oxygen. Sulfide means sulfur alone.', caption: 'SO₄ is sulfate, sulfur with oxygen. Sulfide means sulfur alone.', focus: 'traps.0' },
        { say: 'When there is only one atom of the first element, it takes no prefix, so it is phosphorus trichloride.', focus: 'traps.1' },
        { say: 'And ionic names never take number prefixes. It is just magnesium chloride.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'What is the name of the covalent compound SO₃?',
          choices: ['Sulfur oxide', 'Sulfate', 'Sulfur trioxide', 'Trisulfur oxide'],
          answer: 2,
          working: 'One S takes no prefix, and three O make trioxide: sulfur trioxide.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the name of the covalent compound S O three? Pause the video and try it.', caption: 'Your turn. What is the name of the covalent compound SO₃? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'One sulfur atom takes no prefix, and three oxygen atoms make trioxide. So it is sulfur trioxide: choice C.', show: 'q2.answer' },
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
          items: ['Ionic: metal, then **-ide** or the polyatomic ion\'s name', 'Covalent: **prefixes** count the atoms', 'No **mono** on the first element; no prefixes in **ionic** names'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Ionic names give the metal, then the negative ion, ending in i d e or keeping a polyatomic ion\'s name.', show: 'sum.0' },
        { say: 'Covalent names use prefixes to count the atoms.', show: 'sum.1' },
        { say: 'And there is no mono on the first element, and no prefixes at all in ionic names. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
