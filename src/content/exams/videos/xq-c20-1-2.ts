import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import ionic from '@/content/chem20/videos/c20-1-2.ts';
import molecular from '@/content/chem20/videos/c20-1-3.ts';

// Exam question for Chemistry 20 lesson 1.2 (ionic compounds): say whether six compounds are ionic
// or covalent, and give the ions of the ionic ones. The question is OpenStax Chemistry 2e's own,
// word for word (end-of-chapter exercise 47, section 2.6, CC BY-NC-SA 4.0). The book's answers:
// (a) covalent; (b) ionic, Ba2+, O2-; (c) ionic, NH4+, CO3 2-; (d) ionic, Sr2+, H2PO4-;
// (e) covalent; (f) ionic, Na+, O2-.
//
// The pictures are the lessons' own (src/video/atoms.ts): a sodium atom handing its electron to a
// chlorine atom and the two ions pulling together, then carbon and hydrogen atoms sharing pairs.

const QUESTION =
  'For each of the following compounds, state whether it is ionic or covalent. If it is ionic, write the symbols for the ions involved: (a) NF3 (b) BaO (c) (NH4)2CO3 (d) Sr(H2PO4)2 (e) IBr (f) Na2O';

const video: Explainer = {
  id: 'xq-c20-1-2',
  lessonId: '',
  exam: {
    lesson: 'c20-1-2',
    source: 'OpenStax, Chemistry 2e, end-of-chapter exercise 47, section 2.6, Molecular and Ionic Compounds',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/chemistry-2e/pages/2-exercises',
    question: QUESTION,
  },
  title: 'Exam Question: Ionic or Covalent? Naming the Ions. Ionic Compounds',
  thumbnailTitle: 'Ionic or Covalent?',
  thumbnail: 'tr',
  summary:
    'A real test question, solved one small step at a time: we decide whether six compounds are ionic or covalent, and write the ions in each ionic one, including the polyatomic ions ammonium, carbonate and dihydrogen phosphate. We watch sodium hand an electron to chlorine, and carbon and hydrogen share theirs.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Ionic or Covalent?', subtitle: 'Spotting ions, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question that asks whether six compounds are ionic or covalent. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Chemistry textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          kicker: 'The question',
          prompt: 'For each of the following compounds, state whether it is ionic or covalent. If it is ionic, write the symbols for the ions involved:<br>(a) $\\ce{NF3}$ (b) $\\ce{BaO}$ (c) $\\ce{(NH4)2CO3}$<br>(d) $\\ce{Sr(H2PO4)2}$ (e) $\\ce{IBr}$ (f) $\\ce{Na2O}$',
          answer: '(a) covalent (b) $\\ce{Ba^2+}$, $\\ce{O^2-}$ (c) $\\ce{NH4+}$, $\\ce{CO3^2-}$ (d) $\\ce{Sr^2+}$, $\\ce{H2PO4-}$ (e) covalent (f) $\\ce{Na+}$, $\\ce{O^2-}$',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'For each of the following compounds, state whether it is ionic or covalent. If it is ionic, write the symbols for the ions involved. N F three, B a O, ammonium carbonate, strontium dihydrogen phosphate, I B r, and N a two O.', caption: 'For each of the following compounds, state whether it is ionic or covalent. If it is ionic, write the symbols for the ions involved: (a) NF₃, (b) BaO, (c) (NH₄)₂CO₃, (d) Sr(H₂PO₄)₂, (e) IBr, (f) Na₂O.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Look for a **metal** or the **ammonium** ion: that makes it ionic' }],
      lines: [
        { say: 'For each formula, we decide how its atoms are held together: by ions, or by shared electrons.', show: 'plain' },
        { say: 'The quick test is to look for a metal, or for the ammonium ion, N H four. Either one means the compound is ionic.', caption: 'The quick test is to look for a metal, or for the ammonium ion, NH₄⁺. Either one means the compound is ionic.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(ionic, 'tr')],
      lines: [
        { say: 'Here is what we need. A metal atom and a non-metal atom, sodium and chlorine, with all their electrons.', show: ['tr', 'tr.labels', 'tr.arrangement'] },
        { say: 'The metal\'s outer electron moves across to the non-metal. Now both are ions, with opposite charges.', show: 'tr.charges', play: 'tr.give' },
        { say: 'Opposite charges pull together. That is an ionic compound: a metal with a non-metal, held by ions.', play: 'tr.pull' },
      ],
    },
    {
      chapter: 'Non-metals share',
      layout: 'center',
      main: [pick(molecular, 'ch4')],
      lines: [
        { say: 'Two non-metals are different. Both pull strongly on electrons, so neither can take one from the other.', show: ['ch4', 'ch4.labels'] },
        { say: 'Instead they share pairs of electrons, like this carbon atom with four hydrogen atoms. That is a covalent compound: non-metals only, held by shared pairs.', play: 'ch4.share' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Only **non-metals**? Covalent', 'A **metal** or **ammonium**? Ionic', 'Split an ionic formula into its **ions**, keeping polyatomic ions whole'] }],
      lines: [
        { say: 'Here is the plan, for each part. If every element is a non-metal, the compound is covalent.', show: 'plan.0' },
        { say: 'If there is a metal, or the ammonium ion, it is ionic.', show: 'plan.1' },
        { say: 'For an ionic compound, split the formula into its ions. A group in brackets is a polyatomic ion, and it stays in one piece.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The covalent ones',
      layout: 'center',
      main: [{ kind: 'math', id: 'cv', size: 'lg', lines: ['\\text{(a) } \\ce{NF3}: \\text{ N, F non-metals} \\to \\good{\\text{covalent}}', '\\text{(e) } \\ce{IBr}: \\text{ I, Br non-metals} \\to \\good{\\text{covalent}}'] }],
      lines: [
        { say: 'Step one: the easy ones. In part a, nitrogen and fluorine are both non-metals, so N F three is covalent.', show: 'cv.0', caption: 'Step one: the easy ones. In part (a), nitrogen and fluorine are both non-metals, so NF₃ is covalent.' },
        { say: 'In part e, iodine and bromine are both halogens, non-metals, so I B r is covalent too.', show: 'cv.1', caption: 'In part (e), iodine and bromine are both halogens, non-metals, so IBr is covalent too.' },
      ],
    },
    {
      chapter: 'Step 2: Simple ions',
      layout: 'center',
      main: [{ kind: 'math', id: 'si', size: 'lg', lines: ['\\text{(b) } \\ce{BaO} \\to \\adj{\\ce{Ba^2+}} + \\opp{\\ce{O^2-}}', '\\text{(f) } \\ce{Na2O} \\to 2\\,\\adj{\\ce{Na+}} + \\opp{\\ce{O^2-}}'] }],
      lines: [
        { say: 'Step two. Part b, B a O: barium is a metal in group 2, so it forms a two plus ion, and oxygen in group 16 forms a two minus ion. One of each balances.', show: 'si.0', caption: 'Step two. Part (b), BaO: barium is a metal in group 2, so it forms Ba²⁺, and oxygen in group 16 forms O²⁻. One of each balances.' },
        { say: 'Part f, N a two O: sodium in group 1 forms a one plus ion, so it takes two of them to balance one oxide ion, two minus.', show: 'si.1', caption: 'Part (f), Na₂O: sodium in group 1 forms Na⁺, so it takes two of them to balance one O²⁻ ion.' },
      ],
    },
    {
      chapter: 'Step 3: Polyatomic ions',
      layout: 'center',
      main: [{ kind: 'math', id: 'pi', size: 'lg', lines: ['\\text{(c) } \\ce{(NH4)2CO3} \\to 2\\,\\adj{\\ce{NH4+}} + \\opp{\\ce{CO3^2-}}', '\\text{(d) } \\ce{Sr(H2PO4)2} \\to \\adj{\\ce{Sr^2+}} + 2\\,\\opp{\\ce{H2PO4-}}'] }],
      lines: [
        { say: 'Step three. Part c has no metal, but it contains the ammonium ion, N H four plus, so it is ionic. Its ions are two ammonium ions and one carbonate ion, C O three two minus.', show: 'pi.0', caption: 'Step three. Part (c) has no metal, but it contains the ammonium ion, NH₄⁺, so it is ionic. Its ions are two ammonium ions and one carbonate ion, CO₃²⁻.' },
        { say: 'Part d contains strontium, a group 2 metal, so it is ionic. Its ions are one strontium ion, two plus, and two dihydrogen phosphate ions, H two P O four minus. The bracket shows that group stays together.', show: 'pi.1', caption: 'Part (d) contains strontium, a group 2 metal, so it is ionic. Its ions are Sr²⁺ and two H₂PO₄⁻ ions. The bracket shows that group stays together.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'ans',
          head: ['Part', 'Type', 'Ions'],
          rows: [
            ['(a) $\\ce{NF3}$', 'covalent', '-'],
            ['(b) $\\ce{BaO}$', '**ionic**', '$\\ce{Ba^2+}$, $\\ce{O^2-}$'],
            ['(c) $\\ce{(NH4)2CO3}$', '**ionic**', '$\\ce{NH4+}$, $\\ce{CO3^2-}$'],
            ['(d) $\\ce{Sr(H2PO4)2}$', '**ionic**', '$\\ce{Sr^2+}$, $\\ce{H2PO4-}$'],
            ['(e) $\\ce{IBr}$', 'covalent', '-'],
            ['(f) $\\ce{Na2O}$', '**ionic**', '$\\ce{Na+}$, $\\ce{O^2-}$'],
          ],
        },
      ],
      lines: [
        { say: 'Here is the whole answer. It matches the book.', show: 'ans' },
        { say: 'A quick check: in every ionic compound the charges cancel. For example, two ammonium ions at one plus each balance one carbonate ion at two minus.' },
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
            ['(c) covalent', 'No metal, but **ammonium** is an ion'],
            ['(c) $\\ce{N^3-}$, $\\ce{H+}$, $\\ce{C^4+}$...', 'Broke up a **polyatomic** ion'],
            ['(f) $\\ce{Na2^2+}$', 'The 2 counts **how many** sodium ions'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Calling ammonium carbonate covalent because it has no metal. The ammonium ion behaves like a metal ion, so the compound is ionic.', focus: 'traps.0' },
        { say: 'Breaking ammonium or carbonate into single atoms. A polyatomic ion is held together by shared electrons and stays in one piece.', focus: 'traps.1' },
        { say: 'And writing sodium as one ion with a two plus charge. The two in N a two O counts two separate sodium ions, each one plus.', focus: 'traps.2', caption: 'And writing sodium as one ion with a 2+ charge. The 2 in Na₂O counts two separate sodium ions, each 1+.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which compound is **ionic**?',
          choices: ['$\\ce{CO2}$', '$\\ce{KBr}$', '$\\ce{NH3}$', '$\\ce{SO2}$'],
          answer: 1,
          working: 'Potassium is a metal, so KBr is made of K⁺ and Br⁻ ions.',
        },
      ],
      lines: [
        { say: 'Your turn. Which compound is ionic: C O two, K B r, N H three, or S O two? Pause the video and try it.', show: 'q2', wait: 6, caption: 'Your turn. Which compound is ionic: CO₂, KBr, NH₃ or SO₂? Pause the video and try it.' },
        { say: 'Only K B r contains a metal, potassium, so it is made of potassium and bromide ions: choice B. The others are all non-metals.', show: 'q2.answer', caption: 'Only KBr contains a metal, potassium, so it is made of K⁺ and Br⁻ ions: choice B. The others are all non-metals.' },
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
          items: ['Non-metals only: **covalent**', 'A metal or **ammonium**: **ionic**', 'Polyatomic ions stay **whole**, and the charges **cancel**'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A compound of non-metals only is covalent.', show: 'sum.0' },
        { say: 'A compound with a metal, or with the ammonium ion, is ionic.', show: 'sum.1' },
        { say: 'And when you split an ionic compound into ions, keep each polyatomic ion whole, and check that the charges cancel. For more on ionic compounds, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
