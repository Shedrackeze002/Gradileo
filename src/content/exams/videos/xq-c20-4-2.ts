import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import netIonic from '@/content/chem20/videos/c20-4-2.ts';
import { precipitate } from '@/content/chem20/videos/lib/c20-particles.ts';

// Exam question for Chemistry 20 lesson 4.2 (net ionic equations): write the complete and net ionic
// equations for calcium chloride and sodium fluoride solutions making calcium fluoride. The question
// is part (b) of OpenStax Chemistry 2e's end-of-chapter exercise 9, section 4.1, word for word
// (CC BY-NC-SA 4.0); part (a) is left out. The answers, which match the book's: complete ionic
// Ca2+ + 2Cl- + 2Na+ + 2F- -> CaF2(s) + 2Na+ + 2Cl-, and net ionic Ca2+(aq) + 2F-(aq) -> CaF2(s).
//
// The pictures are simulated particles (src/video/particles.ts): the lesson's silver bromide
// precipitating, then calcium ions each collecting two fluoride ions and sinking as calcium
// fluoride while the sodium and chloride ions keep moving.

/** Calcium chloride and sodium fluoride just mixed (clip `mix`): calcium fluoride forms and sinks. */
const fluoride = precipitate(
  'cf',
  {
    cation: { name: 'calcium ion', tone: 'hyp', size: 1.15 },
    anion: { name: 'fluoride ion', tone: 'good', size: 0.9 },
    withCation: { name: 'chloride ion', tone: 'opp', size: 1.1 },
    withAnion: { name: 'sodium ion', tone: 'brand' },
  },
  { ratio: 2, n: 4, label: 'calcium chloride + sodium fluoride', solid: 'calcium fluoride', seed: 2 },
  360,
);

const QUESTION =
  'The mineral fluorite (calcium fluoride) occurs extensively in Illinois. Solid calcium fluoride can also be prepared by the reaction of aqueous solutions of calcium chloride and sodium fluoride, yielding aqueous sodium chloride as the other product. Write complete and net ionic equations for this reaction.';

const video: Explainer = {
  id: 'xq-c20-4-2',
  lessonId: '',
  exam: {
    lesson: 'c20-4-2',
    source: 'OpenStax, Chemistry 2e, end-of-chapter exercise 9 (b), section 4.1, Writing and Balancing Chemical Equations',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/chemistry-2e/pages/4-exercises',
    question: QUESTION,
  },
  title: 'Exam Question: The Net Ionic Equation for Calcium Fluoride. Net Ionic Equations',
  thumbnailTitle: 'Net Ionic Equation for Calcium Fluoride',
  thumbnail: 'cf',
  summary:
    'A real test question, solved one small step at a time: write the complete and net ionic equations for calcium chloride and sodium fluoride solutions making solid calcium fluoride. We balance the formula equation, split the dissolved compounds into ions, cross out the spectators, and watch the solid form.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Net Ionic Equation for Calcium Fluoride', subtitle: 'Total ionic and net ionic equations, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about writing ionic equations for a precipitation. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt:
            'The mineral fluorite (calcium fluoride) occurs extensively in Illinois. Solid calcium fluoride can also be prepared by the reaction of aqueous solutions of calcium chloride and sodium fluoride, yielding aqueous sodium chloride as the other product. Write complete and net ionic equations for this reaction.',
          answer: 'Net ionic: Ca²⁺(aq) + 2F⁻(aq) → CaF₂(s)',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed. The mineral fluorite, calcium fluoride, occurs extensively in Illinois.', show: 'q' },
        { say: 'Solid calcium fluoride can also be prepared by the reaction of aqueous solutions of calcium chloride and sodium fluoride, yielding aqueous sodium chloride as the other product.' },
        { say: 'Write complete and net ionic equations for this reaction.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Show every **ion** in the reaction, then only the ones that **actually change**' }],
      lines: [
        { say: 'A complete ionic equation, which this course calls a total ionic equation, shows every dissolved ionic compound as its separate ions.', show: 'plain' },
        { say: 'A net ionic equation then keeps only the particles that actually change, leaving out the ions that just watch.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(netIonic, 'ab')],
      lines: [
        { say: 'Here is what we need. Silver nitrate and potassium bromide solutions, just mixed: silver, nitrate, potassium and bromide ions among water molecules.', show: ['ab', 'ab.labels', 'ab.key'], play: 'ab.mix' },
        { say: 'Each silver ion that meets a bromide ion locks on to it, and they sink together as a solid. Those two ions react.', focus: 'ab.p', show: 'ab.tally' },
        { say: 'The potassium and nitrate ions keep moving just as before. They are spectator ions, and the net ionic equation leaves them out.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write the balanced **formula equation** with states', '**Split** every (aq) ionic compound into ions', '**Cross out** the spectators; what is left is the **net** equation'] }],
      lines: [
        { say: 'Here is the plan. First, write the balanced formula equation, with state symbols.', show: 'plan.0' },
        { say: 'Then split every dissolved ionic compound into its ions. That is the complete ionic equation.', show: 'plan.1' },
        { say: 'Then cross out the ions that are the same on both sides. What is left is the net ionic equation.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The formula equation',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'f',
          size: 'lg',
          lines: ['\\ce{Ca^2+} \\text{ and } \\ce{F-} \\Rightarrow \\ce{CaF2}', '\\ce{CaCl2(aq) + 2NaF(aq) -> CaF2(s) + 2NaCl(aq)}'],
        },
      ],
      lines: [
        { say: 'Step one. Calcium ions have a charge of two plus and fluoride ions one minus, so calcium fluoride is C a F two.', show: 'f.0', caption: 'Step one. Calcium ions are Ca²⁺ and fluoride ions are F⁻, so calcium fluoride is CaF₂.' },
        { say: 'Calcium chloride plus sodium fluoride gives calcium fluoride and sodium chloride. Two fluorine atoms on the right need two sodium fluoride, and then two sodium chloride.', show: 'f.1', focus: 'f.1', caption: 'CaCl₂(aq) + 2NaF(aq) → CaF₂(s) + 2NaCl(aq). Two F on the right need 2NaF, and then 2NaCl.' },
      ],
    },
    {
      chapter: 'Step 2: The complete ionic equation',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'c',
          size: 'md',
          lines: [
            '\\ce{Ca^2+(aq) + 2Cl-(aq) + 2Na+(aq) + 2F-(aq)}',
            '\\ce{-> CaF2(s) + 2Na+(aq) + 2Cl-(aq)}',
          ],
        },
      ],
      lines: [
        { say: 'Step two. Split each dissolved ionic compound. Calcium chloride gives one calcium ion and two chloride ions. Two sodium fluoride give two sodium ions and two fluoride ions.', show: 'c.0', caption: 'Step two. Split each dissolved ionic compound. CaCl₂ gives Ca²⁺ and 2Cl⁻. 2NaF gives 2Na⁺ and 2F⁻.' },
        { say: 'On the right, calcium fluoride is a solid, so it stays whole. Two sodium chloride give two sodium ions and two chloride ions. This is the complete ionic equation.', show: 'c.1', caption: 'On the right, CaF₂ is a solid, so it stays whole. 2NaCl gives 2Na⁺ and 2Cl⁻. This is the complete ionic equation.' },
      ],
    },
    {
      chapter: 'Step 3: Cross out the spectators',
      layout: 'center',
      main: [fluoride, { kind: 'math', id: 'n', size: 'md', lines: ['\\text{spectators: } 2\\,\\ce{Na+},\\ 2\\,\\ce{Cl-}', '\\good{\\ce{Ca^2+(aq) + 2F-(aq) -> CaF2(s)}}'] }],
      lines: [
        { say: 'Step three. Here are the four kinds of ion just after mixing. Watch each calcium ion collect two fluoride ions and sink as calcium fluoride.', show: ['cf', 'cf.labels', 'cf.key', 'cf.tally'], play: 'cf.mix' },
        { say: 'The sodium ions and the chloride ions keep moving, unchanged. They appear the same on both sides, so they are the spectators.', show: 'n.0', caption: 'The sodium ions and the chloride ions keep moving, unchanged. They appear the same on both sides, so they are the spectators: 2Na⁺ and 2Cl⁻.' },
        { say: 'Cross them out, and what is left is the net ionic equation: C a two plus plus two F minus gives C a F two, solid.', show: 'n.1', focus: 'n.1', caption: 'Cross them out, and what is left is the net ionic equation: Ca²⁺(aq) + 2F⁻(aq) → CaF₂(s).' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'k',
          head: ['', 'Left', 'Right'],
          rows: [
            ['Ca atoms', '1', '1'],
            ['F atoms', '2', '2'],
            ['Charge', '$(+2) + 2 \\times (-1) = 0$', '0 (a neutral solid)'],
          ],
        },
      ],
      lines: [
        { say: 'Check the net ionic equation. One calcium on each side, and two fluorine on each side.', show: ['k', 'k.0', 'k.1'] },
        { say: 'And the charges balance too: two plus and two one minus ions make zero on the left, and the solid on the right is neutral. Both equations match the book.', focus: 'k.2' },
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
            ['$\\ce{Ca^2+ + 2F- -> Ca^2+ + 2F-}$', 'Split the **solid**; a precipitate stays whole'],
            ['$\\ce{Ca^2+ + F2^2- -> CaF2}$', 'Two fluoride ions are **2F⁻**, not one ion'],
            ['$\\ce{2Na+ + 2Cl- -> 2NaCl(aq)}$', 'Those are the **spectators**; nothing happens to them'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Splitting the solid calcium fluoride into ions. It is a precipitate, so it stays as a whole formula.', focus: 'traps.0' },
        { say: 'Joining the two fluoride ions into one ion. They are separate ions, each with a charge of one minus, so the two goes in front.', focus: 'traps.1' },
        { say: 'And writing an equation for the spectators. Sodium and chloride ions stay dissolved before and after, so nothing happens to them.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Solutions of lead(II) nitrate and potassium iodide react: $\\ce{Pb(NO3)2(aq) + 2KI(aq) -> PbI2(s) + 2KNO3(aq)}$. What is the net ionic equation?',
          choices: [
            '$\\ce{2K+ + 2NO3- -> 2KNO3}$',
            '$\\ce{Pb^2+ + I2^2- -> PbI2}$',
            '$\\ce{Pb^2+ + 2I- -> PbI2}$',
            '$\\ce{Pb(NO3)2 + 2I- -> PbI2}$',
          ],
          answer: 2,
          working: 'The potassium and nitrate ions are spectators; lead(II) ions and iodide ions form the solid.',
        },
      ],
      lines: [
        { say: 'Your turn. Solutions of lead two nitrate and potassium iodide react to form solid lead two iodide. What is the net ionic equation? Pause the video and try it.', show: 'q2', wait: 6, caption: 'Your turn. Solutions of lead(II) nitrate and potassium iodide react to form solid lead(II) iodide. What is the net ionic equation? Pause the video and try it.' },
        { say: 'The potassium and nitrate ions are spectators. A lead two ion and two separate iodide ions form the solid: choice C.', show: 'q2.answer', caption: 'The potassium and nitrate ions are spectators. A Pb²⁺ ion and two separate I⁻ ions form the solid: choice C.' },
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
          items: ['**Split** (aq) ionic compounds; keep **solids** whole', '**Spectators** appear unchanged on both sides', 'The **net** equation keeps only the ions that react'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. In the complete ionic equation, split every dissolved ionic compound into its ions, and keep solids whole.', show: 'sum.0' },
        { say: 'Spectator ions appear unchanged on both sides.', show: 'sum.1' },
        { say: 'Cross them out, and the net ionic equation keeps only the ions that react. For more on net ionic equations, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
