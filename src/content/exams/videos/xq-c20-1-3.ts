import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import prefixes from '@/content/chem20/videos/c20-1-3-b.ts';
import acids from '@/content/chem20/videos/c20-1-3-d.ts';

// Exam question for Chemistry 20 lesson 1.3 (molecular compounds and acids): name two molecular
// compounds, write two formulas from names, and name two acids. OpenStax Chemistry 2e mixes ionic
// and molecular names and leaves acids out, so Gradileo wrote this one in the style of a
// high-school chemistry unit test. Answers: (a) dinitrogen tetraoxide (or tetroxide), phosphorus
// pentachloride; (b) N2O, SO3; (c) hydrochloric acid, sulfurous acid.
//
// The pictures are the lessons' own: two nitrogen dioxide molecules joining into one dinitrogen
// tetraoxide molecule (src/video/molecules.ts), and hydrogen chloride handing its hydrogen to
// water as hydrogen ions, which makes it an acid (src/video/particles.ts).

const QUESTION =
  '(a) Name the molecular compounds N2O4 and PCl5. (b) Write the formulas of dinitrogen monoxide and sulfur trioxide. (c) Name the acids HCl(aq) and H2SO3(aq).';

const video: Explainer = {
  id: 'xq-c20-1-3',
  lessonId: '',
  exam: {
    lesson: 'c20-1-3',
    source: 'Exam-style question written by Gradileo, in the style of a high-school chemistry unit test',
    licence: 'Gradileo\'s own question',
    question: QUESTION,
  },
  title: 'Exam Question: Naming Molecular Compounds and Acids',
  thumbnailTitle: 'Prefixes and Acids',
  thumbnail: 'no',
  summary:
    'An exam-style question, solved one small step at a time: we name dinitrogen tetraoxide and phosphorus pentachloride with prefixes, turn two names back into formulas, and name hydrochloric acid and sulfurous acid from their anions. We watch two nitrogen dioxide molecules join into one bigger molecule, and see hydrogen chloride become an acid in water.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Prefixes and Acids', subtitle: 'Naming molecular compounds, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam-style question about naming molecular compounds and acids. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'Gradileo wrote this question in the style of a high-school chemistry test. You will see that at the bottom of the screen the whole way through.' },
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
          prompt: '(a) Name the molecular compounds $\\ce{N2O4}$ and $\\ce{PCl5}$.<br>(b) Write the formulas of dinitrogen monoxide and sulfur trioxide.<br>(c) Name the acids $\\ce{HCl(aq)}$ and $\\ce{H2SO3(aq)}$.',
          answer: '(a) dinitrogen tetraoxide, phosphorus pentachloride (b) $\\ce{N2O}$, $\\ce{SO3}$ (c) hydrochloric acid, sulfurous acid',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'Part a: name the molecular compounds N two O four and P C l five. Part b: write the formulas of dinitrogen monoxide and sulfur trioxide. Part c: name the acids H C l aqueous and H two S O three aqueous.', caption: 'Part (a): name the molecular compounds N₂O₄ and PCl₅. Part (b): write the formulas of dinitrogen monoxide and sulfur trioxide. Part (c): name the acids HCl(aq) and H₂SO₃(aq).' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Formula → name, name → formula, then **acids**' }],
      lines: [
        { say: 'Part a goes from formula to name, and part b goes the other way, from name to formula. All four compounds are made of non-metals only, so they are molecular.', show: 'plain' },
        { say: 'Part c is about acids, which have names of their own, built from the negative ion they contain.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(prefixes, 'no')],
      lines: [
        { say: 'Here is why molecular compounds need prefixes. Two molecules of nitrogen dioxide, one nitrogen and two oxygens each.', show: 'no' },
        { say: 'Watch them pair up into one bigger molecule, with two nitrogens and four oxygens. The same two elements make a different compound, so the name has to count the atoms.', play: 'no.go', playDelay: 0.3 },
      ],
    },
    {
      chapter: 'The prefixes',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'pre',
          head: ['Prefix', 'mono', 'di', 'tri', 'tetra', 'penta', 'hexa'],
          rows: [['Number', '1', '2', '3', '4', '5', '6']],
        },
        { kind: 'bullets', id: 'rules', items: ['First element: prefix only for **two or more**', 'Second element: ending **-ide**, always with a prefix'] },
      ],
      lines: [
        { say: 'These are the prefixes: mono for one, di for two, tri for three, tetra for four, penta for five and hexa for six.', show: 'pre' },
        { say: 'The first element takes a prefix only when there are two or more of it. It never takes mono.', show: 'rules.0' },
        { say: 'The second element gets the ending ide, as in oxide or chloride, and always has a prefix, even mono.', show: 'rules.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Formula → name: turn each subscript into a **prefix**', 'Name → formula: turn each prefix back into a **subscript**', 'Acid: name it from its **anion**'] }],
      lines: [
        { say: 'Here is the plan. For part a, turn each subscript into a prefix.', show: 'plan.0' },
        { say: 'For part b, turn each prefix back into a subscript.', show: 'plan.1' },
        { say: 'For part c, find the negative ion in each acid, and change its ending.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Part (a)',
      layout: 'center',
      main: [{ kind: 'math', id: 'a', size: 'lg', lines: ['\\ce{N2O4} \\to \\adj{\\text{di}}\\text{nitrogen } \\opp{\\text{tetra}}\\text{oxide}', '\\ce{PCl5} \\to \\text{phosphorus } \\opp{\\text{penta}}\\text{chloride}'] }],
      lines: [
        { say: 'Step one, part a. N two O four has two nitrogen atoms, so di nitrogen, and four oxygen atoms, so tetra oxide: dinitrogen tetraoxide. Many books shorten it to dinitrogen tetroxide, and both are accepted.', show: 'a.0', caption: 'Step one, part (a). N₂O₄ has two nitrogen atoms, so dinitrogen, and four oxygen atoms, so tetraoxide: dinitrogen tetraoxide. Many books shorten it to dinitrogen tetroxide, and both are accepted.' },
        { say: 'P C l five has one phosphorus atom, so no prefix, and five chlorine atoms, so penta chloride: phosphorus pentachloride.', show: 'a.1', caption: 'PCl₅ has one phosphorus atom, so no prefix, and five chlorine atoms, so pentachloride: phosphorus pentachloride.' },
      ],
    },
    {
      chapter: 'Step 2: Part (b)',
      layout: 'center',
      main: [{ kind: 'math', id: 'b', size: 'lg', lines: ['\\adj{\\text{di}}\\text{nitrogen } \\opp{\\text{mono}}\\text{xide} \\to \\ce{N2O}', '\\text{sulfur } \\opp{\\text{tri}}\\text{oxide} \\to \\ce{SO3}'] }],
      lines: [
        { say: 'Step two, part b. Dinitrogen monoxide: di means two nitrogen atoms, and mono means one oxygen atom. The formula is N two O. A subscript of one is never written.', show: 'b.0', caption: 'Step two, part (b). Dinitrogen monoxide: di means two nitrogen atoms, and mono means one oxygen atom. The formula is N₂O. A subscript of 1 is never written.' },
        { say: 'Sulfur trioxide: no prefix on sulfur, so one sulfur atom, and tri means three oxygen atoms. The formula is S O three.', show: 'b.1', caption: 'Sulfur trioxide: no prefix on sulfur, so one sulfur atom, and tri means three oxygen atoms. The formula is SO₃.' },
      ],
    },
    {
      chapter: 'Step 3: Part (c)',
      layout: 'center',
      main: [pick(acids, 'ai')],
      lines: [
        { say: 'Step three, part c. An acid is a compound that gives hydrogen ions in water. Here is hydrogen chloride dissolving, up close.', show: ['ai', 'ai.labels', 'ai.key'] },
        { say: 'Each molecule hands over its hydrogen as a hydrogen ion and leaves a chloride ion behind. The acid is named from that negative ion.', show: 'ai.tally', play: 'ai.go' },
      ],
    },
    {
      chapter: 'Naming the acids',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'rule',
          head: ['Anion ending', 'Acid name'],
          rows: [
            ['-ide', 'hydro-…-ic acid'],
            ['-ate', '-ic acid'],
            ['-ite', '-ous acid'],
          ],
        },
        { kind: 'math', id: 'c', size: 'md', lines: ['\\ce{Cl-}\\ \\text{chlor\\adj{ide}} \\to \\text{\\adj{hydro}chlor\\adj{ic} acid}', '\\ce{SO3^2-}\\ \\text{sulf\\opp{ite}} \\to \\text{sulfur\\opp{ous} acid}'] },
      ],
      lines: [
        { say: 'Here are the rules. An anion ending in ide gives an acid named hydro, ic acid. Ate gives ic acid, and ite gives ous acid.', show: 'rule' },
        { say: 'H C l contains the chloride ion, which ends in ide. So it is hydrochloric acid.', show: 'c.0', caption: 'HCl contains the chloride ion, which ends in -ide. So it is hydrochloric acid.' },
        { say: 'H two S O three contains S O three two minus, the sulfite ion, which ends in ite. So it is an ous acid, and the stem grows a little: sulfurous acid.', show: 'c.1', caption: 'H₂SO₃ contains SO₃²⁻, the sulfite ion, which ends in -ite. So it is an -ous acid, and the stem grows a little: sulfurous acid.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'ans',
          head: ['Part', 'Answer'],
          rows: [
            ['(a)', '**dinitrogen tetraoxide**, **phosphorus pentachloride**'],
            ['(b)', '$\\ce{N2O}$, $\\ce{SO3}$'],
            ['(c)', '**hydrochloric acid**, **sulfurous acid**'],
          ],
        },
      ],
      lines: [
        { say: 'Here is the whole answer.', show: 'ans' },
        { say: 'A quick check: turning our names from part a back into formulas gives N two O four and P C l five again, so the names and formulas match.', caption: 'A quick check: turning our names from part (a) back into formulas gives N₂O₄ and PCl₅ again, so the names and formulas match.' },
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
            ['"monophosphorus pentachloride"', 'The first element **never** takes mono'],
            ['"nitrogen oxide" for $\\ce{N2O4}$', 'Left out the **prefixes**'],
            ['"sulfuric acid" for $\\ce{H2SO3}$', 'Sulfite ends in **-ite**, so **-ous**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Writing monophosphorus. The first element never takes mono.', focus: 'traps.0' },
        { say: 'Leaving out the prefixes, as if it were an ionic compound. Nitrogen and oxygen make several compounds, so the name must count the atoms.', focus: 'traps.1' },
        { say: 'And calling H two S O three sulfuric acid. Sulfuric acid is H two S O four, from sulfate. Sulfite, with one oxygen fewer, gives sulfurous acid.', focus: 'traps.2', caption: 'And calling H₂SO₃ sulfuric acid. Sulfuric acid is H₂SO₄, from sulfate. Sulfite, with one oxygen fewer, gives sulfurous acid.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'What is the name of $\\ce{HNO3(aq)}$? (It contains the nitrate ion, $\\ce{NO3-}$.)',
          choices: ['hydronitric acid', 'nitrous acid', 'nitric acid', 'hydrogen nitrate acid'],
          answer: 2,
          working: 'Nitrate ends in -ate, so the acid is an -ic acid: nitric acid.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the name of H N O three aqueous? It contains the nitrate ion. Pause the video and try it.', show: 'q2', wait: 6, caption: 'Your turn. What is the name of HNO₃(aq)? It contains the nitrate ion. Pause the video and try it.' },
        { say: 'Nitrate ends in ate, and ate gives ic acid. So it is nitric acid, choice C.', show: 'q2.answer' },
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
          items: ['Molecular names count atoms with **prefixes**', 'The first element **never** takes mono', 'Acids: -ide → **hydro-…-ic**, -ate → **-ic**, -ite → **-ous**'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A molecular compound\'s name counts its atoms with prefixes.', show: 'sum.0' },
        { say: 'The first element never takes mono, but the second element always has a prefix.', show: 'sum.1' },
        { say: 'And an acid is named from its anion: ide gives hydro, ic acid, ate gives ic acid, and ite gives ous acid. For more on naming, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
