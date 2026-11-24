import type { Explainer, NucleusEl } from '@/video/script.ts';

// Exam question for Grade 12 lesson 4.5 (radioactive decay): the beta-minus decay that produces
// barium-137. The question is OpenStax College Physics 2e's own, word for word, with the
// instruction that its problem set opens with (a Problem for section 31.4, CC BY-NC-SA 4.0;
// Gradileo is non-commercial). Barium is element 56, so the daughter is ¹³⁷₅₆Ba₈₁. A beta-minus
// decay keeps A and raises Z by 1, so the parent has Z = 55 (caesium) and N = 137 − 55 = 82:
// ¹³⁷₅₅Cs₈₂ → ¹³⁷₅₆Ba₈₁ + β⁻ + ν̄ₑ, as in the book's answer.
// Check: A 137 = 137 + 0; charge 55 = 56 − 1; electron family number 0 = +1 − 1.
//
// The picture is the nucleus of src/video/nucleus.ts: caesium-137, marked as unstable, in which
// one neutron becomes a proton while an electron and an antineutrino leave.

const nucleus = (id: string, clips: NucleusEl['clips'], more: Partial<NucleusEl> = {}): NucleusEl => ({ kind: 'nucleus', id, height: 380, scale: 24, clips, ...more });

/** Caesium-137, before its decay and then as it decays into barium-137. */
const caesium = nucleus(
  'cs',
  { a: { phases: [{ dur: 4 }] }, b: { phases: [{ dur: 1 }, { dur: 10, decay: 'beta-', symbol: 'Ba', name: 'Barium', shaky: false }] } },
  { z: 55, n: 82, symbol: 'Cs', name: 'Caesium', shaky: true, poster: 'b', posterAt: 0.6, thumb: ['symbol', 'counts'] },
);

const QUESTION =
  'Write the complete decay equation for the given nuclide in the complete ᴬ_Z X_N notation. Refer to the periodic table for values of Z. β⁻ decay producing ¹³⁷Ba. The parent nuclide is a major waste product of reactors and has chemistry similar to potassium and sodium, resulting in its concentration in your cells if ingested.';

const EQUATION = '{}^{137}_{55}\\text{Cs}_{82} \\rightarrow {}^{137}_{56}\\text{Ba}_{81} + \\beta^- + \\bar{\\nu}_e';

const video: Explainer = {
  id: 'xq-p30-4-5',
  lessonId: '',
  exam: {
    lesson: 'p30-4-5',
    source: 'OpenStax, College Physics 2e, Problem for section 31.4, Nuclear Decay and Conservation Laws',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-physics-2e/pages/31-4-nuclear-decay-and-conservation-laws',
    question: QUESTION,
  },
  title: 'Exam Question: The Beta Decay That Makes Barium-137 (Radioactive Decay)',
  thumbnailTitle: 'What Makes Barium-137?',
  thumbnail: 'cs',
  summary:
    'A real test question, solved one small step at a time: write the complete decay equation for the β⁻ decay that produces barium-137, a decay whose parent is a major waste product of nuclear reactors. Barium is element 56, so the daughter has 137 − 56 = 81 neutrons. A beta-minus decay keeps the mass number and raises the atomic number by 1, so the parent has 55 protons: it is caesium-137, with 82 neutrons. We watch one of its neutrons become a proton, write ¹³⁷₅₅Cs₈₂ → ¹³⁷₅₆Ba₈₁ + β⁻ + ν̄ₑ, check that it balances and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'What Makes Barium-137?', subtitle: 'Radioactive decay, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about radioactive decay. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax College Physics textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt:
            'Write the complete decay equation for the given nuclide in the complete ${}^{A}_{Z}\\text{X}_{N}$ notation. Refer to the periodic table for values of $Z$. $\\beta^-$ decay producing ${}^{137}\\text{Ba}$. The parent nuclide is a major waste product of reactors and has chemistry similar to potassium and sodium, resulting in its concentration in your cells if ingested.',
          answer: `$${EQUATION}$`,
          working: 'Barium has $Z = 56$; a $\\beta^-$ decay raises $Z$ by $1$, so the parent has $Z = 55$: caesium.',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Write the complete decay equation, with the mass number, the atomic number and the neutron number of every nucleus. Use the periodic table for the atomic numbers.', caption: 'Write the complete decay equation, with A, Z and N for every nucleus. Use the periodic table for the atomic numbers.' },
        { say: 'The decay is a beta-minus decay that produces barium-137. The parent is a major waste product of nuclear reactors.', caption: 'The decay is a β⁻ decay that produces barium-137. The parent is a major waste product of nuclear reactors.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'n', size: 'lg', lines: ['{}^{A}_{Z}\\text{X}_{N}', '\\text{parent} \\rightarrow {}^{137}\\text{Ba} + \\beta^- + \\ ?'] },
        { kind: 'text', id: 't', size: 'md', md: '$A$ = **nucleons**, $Z$ = **protons**, $N$ = **neutrons**, so $N = A - Z$. We know the **daughter**, and must find the **parent**.' },
      ],
      lines: [
        { say: 'In this notation, the mass number, "A", sits at the top left, the atomic number, "Z", at the bottom left, and the neutron number, "N", at the bottom right.', caption: 'In this notation, the mass number, A, sits at the top left, the atomic number, Z, at the bottom left, and the neutron number, N, at the bottom right.', show: 'n.0' },
        { say: 'We are told the nucleus that is left, barium-137, which is the daughter. We must work backwards to the parent, and fill in every number.', show: ['n.1', 't'] },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\text{n} \\rightarrow \\text{p} + \\beta^- + \\bar{\\nu}_e', 'A \\text{ stays the same}, \\quad Z \\text{ goes up by } 1, \\quad N \\text{ goes down by } 1'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Everything balances', md: 'The **mass numbers** balance, the **charges** balance, and the electron family number balances: the electron comes with an **anti**neutrino, so $+1 - 1 = 0$.' },
      ],
      lines: [
        { say: 'Here is what we need. In a beta-minus decay, a neutron in the nucleus changes into a proton, and the nucleus gives out an electron and an antineutrino.', show: 'f.0' },
        { say: 'So the mass number stays the same, the atomic number goes up by 1, and the neutron number goes down by 1.', show: 'f.1' },
        { say: 'And the equation must balance: the mass numbers, the charges, and the electron family number. The electron counts plus 1, and the antineutrino minus 1.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find $Z$ and $N$ for **barium-137**', 'Work **backwards** to the parent', 'Write the equation and **check** it'] }],
      lines: [
        { say: 'Here is the plan. Find the atomic number and the neutron number of barium-137.', show: 'plan.0' },
        { say: 'Work backwards to the parent.', show: 'plan.1' },
        { say: 'Then write the equation, and check that it balances.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The daughter',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{barium: } Z = 56', 'N = 137 - 56 = 81', '{}^{137}_{56}\\text{Ba}_{81}'] }],
      lines: [
        { say: 'Step one. The periodic table gives barium the atomic number 56.', show: 'm.0' },
        { say: 'Its mass number is 137, so its neutron number is 137 minus 56, which is 81.', caption: 'Its mass number is 137, so its neutron number is 137 − 56 = 81.', show: 'm.1' },
        { say: 'So the daughter is barium-137, with 56 protons and 81 neutrons.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: The parent',
      layout: 'center',
      main: [caesium, { kind: 'math', id: 'm', size: 'md', lines: ['Z = 56 - 1 = 55 \\ (\\text{caesium}), \\quad A = 137, \\quad N = 137 - 55 = 82'] }],
      lines: [
        { say: 'Step two. The decay raised the atomic number by 1, so the parent had one proton fewer: 55. Element 55 is caesium.', caption: 'Step two. The decay raised the atomic number by 1, so the parent had one proton fewer: 55. Element 55 is caesium.', show: ['cs', 'cs.names', 'cs.symbol', 'cs.counts'], play: 'cs.a' },
        { say: 'The mass number does not change, so the parent is caesium-137, with 137 minus 55, which is 82 neutrons.', caption: 'The mass number does not change, so the parent is caesium-137, with 137 − 55 = 82 neutrons.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Step 3: The equation',
      layout: 'center',
      main: [caesium, { kind: 'math', id: 'm', size: 'md', lines: [EQUATION] }],
      lines: [
        { say: 'Step three. Watch caesium-137 decay. One of its neutrons changes into a proton, and an electron and an antineutrino fly out. What is left is barium-137.', show: ['cs', 'cs.names', 'cs.symbol', 'cs.counts'], play: 'cs.b' },
        { say: 'So the equation is caesium-137, with 55 protons and 82 neutrons, goes to barium-137, with 56 protons and 81 neutrons, plus a beta-minus particle and an antineutrino.', caption: 'So the equation is ¹³⁷₅₅Cs₈₂ → ¹³⁷₅₆Ba₈₁ + β⁻ + ν̄ₑ.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['A{:}\\ 137 = 137 + 0 \\ \\checkmark', '\\text{charge: } 55 = 56 + (-1) \\ \\checkmark', '\\text{electron family: } 0 = (+1) + (-1) \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check that it balances. The mass numbers: 137 on the left, and 137 plus 0 on the right.', caption: 'Let us check that it balances. The mass numbers: 137 on the left, and 137 + 0 on the right.', show: 'm.0' },
        { say: 'The charges: 55 on the left, and 56 plus negative 1 on the right, which is 55.', caption: 'The charges: 55 on the left, and 56 + (−1) on the right, which is 55.', show: 'm.1' },
        { say: 'And the electron family number: 0 on the left, and plus 1 minus 1 on the right. Everything balances.', caption: 'And the electron family number: 0 on the left, and +1 − 1 on the right. Everything balances.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Trap', 'What goes wrong'],
          rows: [
            ['${}^{137}_{56}\\text{Ba} \\rightarrow {}^{137}_{57}\\text{La}$', 'barium is the **daughter**, not the parent'],
            ['${}^{141}_{58}\\text{Ce}$ as parent', 'undid an **alpha** decay: $\\beta^-$ keeps $A$'],
            ['$\\nu_e$ instead of $\\bar{\\nu}_e$', 'with an electron comes an **anti**neutrino'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Some people start from barium and decay it into lanthanum. But barium is what the decay produces. It is the daughter, so the parent comes before it.' },
        { say: 'Cerium-141 as the parent undoes an alpha decay, adding 4 to the mass number. A beta-minus decay does not change the mass number at all.' },
        { say: 'And a neutrino instead of an antineutrino does not balance the electron family number. With an electron comes an antineutrino.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Strontium-90, ${}^{90}_{38}\\text{Sr}_{52}$, decays by $\\beta^-$ decay. Which nucleus is left? (Element $39$ is yttrium, Y.)',
          choices: ['${}^{90}_{37}\\text{Rb}_{53}$', '${}^{86}_{36}\\text{Kr}_{50}$', '${}^{90}_{39}\\text{Y}_{51}$', '${}^{90}_{39}\\text{Y}_{52}$'],
          answer: 2,
          working: '$A$ stays $90$, $Z$ goes up to $39$, and $N = 90 - 39 = 51$: ${}^{90}_{39}\\text{Y}_{51}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Strontium-90, with 38 protons and 52 neutrons, decays by beta-minus decay. Which nucleus is left? Pause the video and try it.', caption: 'Your turn. Strontium-90, ⁹⁰₃₈Sr₅₂, decays by β⁻ decay. Which nucleus is left? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The mass number stays 90, and the atomic number goes up to 39, which is yttrium. The neutron number is 90 minus 39, which is 51. Choice "C".', caption: 'The mass number stays 90, and the atomic number goes up to 39, which is yttrium. N = 90 − 39 = 51. Choice "C".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['In $\\beta^-$ decay a **neutron** becomes a **proton**', '$A$ stays, $Z$ goes **up** by $1$, $N$ goes **down** by $1$', '$N = A - Z$ for every nucleus', 'Check that $A$, charge and electron family **balance**'] }],
      lines: [
        { say: 'Here is what to remember. In a beta-minus decay, a neutron becomes a proton.', show: 'sum.0' },
        { say: 'So the mass number stays the same, the atomic number goes up by 1, and the neutron number goes down by 1.', show: 'sum.1' },
        { say: 'The neutron number of every nucleus is its mass number minus its atomic number.', show: 'sum.2' },
        { say: 'And check that the mass numbers, the charges and the electron family number all balance. For more on radioactive decay, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
