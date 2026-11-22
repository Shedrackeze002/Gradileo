import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import balancing from '@/content/chem30/videos/c30-2-4.ts';
import combining from '@/content/chem30/videos/c30-2-4-d.ts';

// Exam question for Chemistry 30 lesson 2.4 (balancing redox equations): balance
// MnO4- + H2C2O4 -> Mn2+ + CO2 in acidic solution by half-reactions. Gradileo wrote the question in
// the style of a unit test. The answer: MnO4- + 8H+ + 5e- -> Mn2+ + 4H2O (x2) and
// H2C2O4 -> 2CO2 + 2H+ + 2e- (x5), which add to 2MnO4- + 5H2C2O4 + 6H+ -> 2Mn2+ + 10CO2 + 8H2O,
// with 10 electrons transferred (Mn 2, C 10, O 28, H 16 and charge +4 on each side).
//
// The pictures are simulated particles (src/video/particles.ts): the lesson's iron in copper(II)
// sulfate solution, electrons changing hands; and a zinc-copper cell, where the two
// half-reactions happen in separate beakers.

const QUESTION = 'Permanganate ions oxidise oxalic acid in acidic solution: MnO₄⁻(aq) + H₂C₂O₄(aq) → Mn²⁺(aq) + CO₂(g). Using half-reactions, write the balanced equation for the reaction in acidic solution. How many electrons are transferred?';

const video: Explainer = {
  id: 'xq-c30-2-4',
  lessonId: '',
  exam: {
    lesson: 'c30-2-4',
    source: 'Exam-style question written by Gradileo, in the style of a high-school chemistry unit test',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Permanganate Meets Oxalic Acid. Balancing Redox Equations',
  thumbnailTitle: 'Permanganate Meets Oxalic Acid',
  thumbnail: 've',
  summary:
    'A test-style question, solved one small step at a time: permanganate ions oxidise oxalic acid to carbon dioxide in acidic solution. We balance each half-reaction with water, hydrogen ions and electrons, multiply them so that 10 electrons are lost and gained, and add them to get 2MnO₄⁻ + 5H₂C₂O₄ + 6H⁺ → 2Mn²⁺ + 10CO₂ + 8H₂O.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Permanganate Meets Oxalic Acid', subtitle: 'Balancing a redox equation with half-reactions' }],
      lines: [
        { say: 'In this video, we solve a test-style question about balancing redox equations. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'We wrote this question in the style of a high-school chemistry unit test, and everything you need is given in it.' },
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
          prompt: 'Permanganate ions oxidise oxalic acid in acidic solution: $\\ce{MnO4^-(aq) + H2C2O4(aq) -> Mn^2+(aq) + CO2(g)}$. Using half-reactions, write the balanced equation for the reaction in acidic solution. How many electrons are transferred?',
          answer: '2MnO₄⁻ + 5H₂C₂O₄ + 6H⁺ → 2Mn²⁺ + 10CO₂ + 8H₂O; 10 electrons',
        },
      ],
      lines: [
        { say: 'Here is the question. Permanganate ions oxidise oxalic acid in acidic solution. M n O four minus plus H two C two O four gives M n two plus and carbon dioxide. Using half-reactions, write the balanced equation for the reaction in acidic solution. How many electrons are transferred?', show: 'q', caption: 'Here is the question. Permanganate ions oxidise oxalic acid in acidic solution: MnO₄⁻(aq) + H₂C₂O₄(aq) → Mn²⁺(aq) + CO₂(g). Using half-reactions, write the balanced equation in acidic solution. How many electrons are transferred?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Balance **atoms** and **charge**, using $\\ce{H2O}$, $\\ce{H+}$ and **electrons**' }],
      lines: [
        { say: 'The skeleton equation is missing water, hydrogen ions and the right numbers in front. We have to add them so that every kind of atom and the total charge balance.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(balancing, 'dp'), { kind: 'math', id: 'k', size: 'md', lines: ['\\text{electrons lost} = \\text{electrons gained}'] }],
      lines: [
        { say: 'Here is what we need. Iron in copper two sulfate solution, beside copper in iron two sulfate solution. Watch the iron.', caption: 'Here is what we need. Iron in copper(II) sulfate solution, beside copper in iron(II) sulfate solution. Watch the iron.', show: ['dp', 'dp.labels', 'dp.key', 'dp.tally'], play: 'dp.go' },
        { say: 'Iron atoms give electrons to copper two ions, and every electron one atom loses, an ion gains. No electron is left over.', caption: 'Iron atoms give electrons to copper(II) ions, and every electron one atom loses, an ion gains. No electron is left over.' },
        { say: 'So a balanced redox equation has the electrons lost equal to the electrons gained, and that is why we balance each half on its own first.', show: 'k.0' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Split into a **reduction** and an **oxidation** half', 'Balance each: other atoms, then **O** with $\\ce{H2O}$, **H** with $\\ce{H+}$, **charge** with $e^-$', 'Multiply to match electrons, **add**, and **cancel**'] }],
      lines: [
        { say: 'Here is the plan. First, split the reaction into a reduction half and an oxidation half.', show: 'plan.0' },
        { say: 'Then balance each half: the atoms other than oxygen and hydrogen first, then oxygen with water, hydrogen with hydrogen ions, and the charge with electrons.', show: 'plan.1' },
        { say: 'Then multiply the halves so the electrons match, add them, and cancel anything that appears on both sides.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Two halves',
      layout: 'center',
      main: [pick(combining, 've'), { kind: 'math', id: 's', size: 'md', lines: ['\\ce{MnO4^- -> Mn^2+} \\qquad \\ce{H2C2O4 -> CO2}'] }],
      lines: [
        { say: 'Step one. In this cell the two halves of a reaction happen in separate beakers. Zinc gives up electrons on one side, and copper ions take them on the other.', show: ['ve', 've.labels', 've.key', 've.tally'], play: 've.run' },
        { say: 'Our reaction splits the same way. Manganese goes from plus seven to plus two, so permanganate going to manganese two plus is the reduction. Carbon goes from plus three to plus four, so oxalic acid going to carbon dioxide is the oxidation.', show: 's.0', caption: 'Our reaction splits the same way. Mn goes from +7 to +2, so MnO₄⁻ → Mn²⁺ is the reduction. C goes from +3 to +4, so H₂C₂O₄ → CO₂ is the oxidation.' },
      ],
    },
    {
      chapter: 'Step 2: The reduction',
      layout: 'center',
      main: [{ kind: 'math', id: 'r', size: 'lg', lines: ['\\ce{MnO4^- -> Mn^2+ + 4H2O}', '\\ce{MnO4^- + 8H+ -> Mn^2+ + 4H2O}', '\\good{\\ce{MnO4^- + 8H+ + 5e^- -> Mn^2+ + 4H2O}}'] }],
      lines: [
        { say: 'Step two. Manganese is already balanced. Permanganate has four oxygens, so add four waters on the right.', show: 'r.0', focus: 'r.0' },
        { say: 'Four waters have eight hydrogens, so add eight hydrogen ions on the left.', show: 'r.1', focus: 'r.1' },
        { say: 'Now the charge. The left is minus one plus eight, which is plus seven, and the right is plus two. Five electrons on the left bring plus seven down to plus two.', show: 'r.2', focus: 'r.2', caption: 'Now the charge. The left is −1 + 8 = +7, and the right is +2. Five electrons on the left bring +7 down to +2.' },
      ],
    },
    {
      chapter: 'Step 3: The oxidation',
      layout: 'center',
      main: [{ kind: 'math', id: 'o', size: 'lg', lines: ['\\ce{H2C2O4 -> 2CO2}', '\\ce{H2C2O4 -> 2CO2 + 2H+}', '\\good{\\ce{H2C2O4 -> 2CO2 + 2H+ + 2e^-}}'] }],
      lines: [
        { say: 'Step three. Oxalic acid has two carbons, so it makes two carbon dioxide molecules. That also balances the four oxygens.', show: 'o.0', focus: 'o.0' },
        { say: 'Oxalic acid has two hydrogens, so add two hydrogen ions on the right.', show: 'o.1', focus: 'o.1' },
        { say: 'The left has no charge, and the right is plus two. Two electrons on the right bring it down to zero.', show: 'o.2', focus: 'o.2' },
      ],
    },
    {
      chapter: 'Step 4: Match, add and cancel',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\times 2:\\ \\ce{2MnO4^- + 16H+ + 10e^- -> 2Mn^2+ + 8H2O}', '\\times 5:\\ \\ce{5H2C2O4 -> 10CO2 + 10H+ + 10e^-}', '\\good{\\ce{2MnO4^- + 5H2C2O4 + 6H+ -> 2Mn^2+ + 10CO2 + 8H2O}}'] },
      ],
      lines: [
        { say: 'Step four. The reduction takes five electrons and the oxidation gives two. Ten is the smallest number both go into, so multiply the reduction by two and the oxidation by five. Now ten electrons are lost and ten are gained.', show: ['m.0', 'm.1'] },
        { say: 'Add the halves. The ten electrons cancel. There are sixteen hydrogen ions on the left and ten on the right, so ten cancel and six stay on the left.', show: 'm.2', focus: 'm.2', caption: 'Add the halves. The ten electrons cancel. There are 16 H⁺ on the left and 10 H⁺ on the right, so ten cancel and 6 H⁺ stay on the left.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'c',
          head: ['', 'Left', 'Right'],
          rows: [
            ['Mn, C', '2, 10', '2, 10'],
            ['O', '8 + 20 = 28', '20 + 8 = 28'],
            ['H', '10 + 6 = 16', '16'],
            ['Charge', '−2 + 6 = +4', '+4'],
          ],
        },
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '$\\ce{2MnO4^- + 5H2C2O4 + 6H+ -> 2Mn^2+ + 10CO2 + 8H2O}$, with **10 electrons** transferred.' },
      ],
      lines: [
        { say: 'Does it make sense? Count everything on both sides. Manganese and carbon match. Oxygen is twenty eight on each side, hydrogen is sixteen, and the charge is plus four on each side.', show: 'c' },
        { say: 'So the balanced equation is two permanganate plus five oxalic acid plus six hydrogen ions gives two manganese two plus, ten carbon dioxide and eight water, and ten electrons are transferred.', show: 'ans', caption: 'So the balanced equation is 2MnO₄⁻ + 5H₂C₂O₄ + 6H⁺ → 2Mn²⁺ + 10CO₂ + 8H₂O, and ten electrons are transferred.' },
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
            ['$\\ce{16H+}$ on the left', 'Forgot to **cancel** the $\\ce{10H+}$ made on the right'],
            ['$\\ce{MnO4^- + H2C2O4}$ in a 1 : 1 ratio', 'Added the halves **without matching** the electrons'],
            ['$\\ce{5CO2}$', 'Missed that each $\\ce{H2C2O4}$ has **two** carbons'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Sixteen hydrogen ions on the left leaves hydrogen ions on both sides. The ten made by the oxidation cancel ten of them.', focus: 'traps.0' },
        { say: 'A one to one ratio comes from adding the halves as they are. Then five electrons are gained but only two are lost, and the charge cannot balance.', focus: 'traps.1' },
        { say: 'And five carbon dioxide forgets that each oxalic acid molecule has two carbon atoms, so five of them make ten.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'When $\\ce{Cr2O7^2- + Fe^2+ -> Cr^3+ + Fe^3+}$ is balanced in acidic solution with the smallest whole numbers, what is the coefficient of $\\ce{H+}$?',
          choices: ['$7$', '$6$', '$8$', '$14$'],
          answer: 3,
          working: '$\\ce{Cr2O7^2- + 14H+ + 6e^- -> 2Cr^3+ + 7H2O}$ and $\\ce{6Fe^2+ -> 6Fe^3+ + 6e^-}$ add to $\\ce{Cr2O7^2- + 6Fe^2+ + 14H+ -> 2Cr^3+ + 6Fe^3+ + 7H2O}$.',
        },
      ],
      lines: [
        { say: 'Your turn. When dichromate plus iron two plus gives chromium three plus and iron three plus is balanced in acidic solution, with the smallest whole numbers, what is the coefficient of the hydrogen ion? Pause the video and try it.', show: 'q2', wait: 6, caption: 'Your turn. When Cr₂O₇²⁻ + Fe²⁺ → Cr³⁺ + Fe³⁺ is balanced in acidic solution with the smallest whole numbers, what is the coefficient of H⁺? Pause the video and try it.' },
        { say: 'Seven oxygens need seven waters, which need fourteen hydrogen ions, and six electrons balance the charge. Six iron two plus ions give the six electrons, and no hydrogen ions appear on the other side, so the coefficient is fourteen: choice D.', show: 'q2.answer', caption: 'Seven O need 7 H₂O, which need 14 H⁺, and 6 e⁻ balance the charge. Six Fe²⁺ give the 6 e⁻, and no H⁺ appears on the other side, so the coefficient is 14: choice D.' },
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
          items: ['Balance each half: atoms, then **O** with $\\ce{H2O}$, **H** with $\\ce{H+}$, **charge** with $e^-$', 'Multiply the halves so the **electrons match**', 'Add, then **cancel** what appears on both sides'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Balance each half-reaction on its own: the main atoms, then oxygen with water, hydrogen with hydrogen ions, and charge with electrons.', show: 'sum.0' },
        { say: 'Multiply the halves so the electrons lost equal the electrons gained.', show: 'sum.1' },
        { say: 'Then add them and cancel anything that appears on both sides, and check the atoms and the charge. For more on balancing redox equations, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
