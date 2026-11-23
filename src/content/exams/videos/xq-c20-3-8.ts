import type { Explainer, ParticlesEl } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import strength from '@/content/chem20/videos/c20-3-8.ts';
import { strongAndWeak } from '@/content/chem20/videos/lib/c20-particles.ts';

// Exam question for Chemistry 20 lesson 3.8 (strong and weak acids): list every species in 1 M
// acetic acid in order of descending concentration. The question is OpenStax Chemistry 2e's own,
// word for word (end-of-chapter exercise 29, section 14.3, CC BY-NC-SA 4.0). The answer, which
// matches the book's: H2O > CH3CO2H > H3O+ = CH3CO2- > OH-. Water is the solvent (about 55.5 mol in
// a litre), a weak acid is mostly un-ionised, each ionised molecule gives one hydronium ion and one
// acetate ion, and in an acidic solution hydroxide ions are scarcest of all.
//
// The pictures are simulated particles (src/video/particles.ts): the lesson's hydrochloric acid
// and acetic acid side by side, then acetic acid alone, where only about one molecule is ionised at
// any moment.

/** The lesson's acetic acid box on its own: only about one molecule ionised at a time. */
const acetic = ((): ParticlesEl => {
  const both = strongAndWeak('aw', 380);
  return { ...both, boxes: [both.boxes[1]], clips: { go: { phases: [{ dur: 1, release: ['w'] }, { dur: 14 }] } } };
})();

const QUESTION =
  'The odor of vinegar is due to the presence of acetic acid, CH3CO2H, a weak acid. List, in order of descending concentration, all of the ionic and molecular species present in a 1-M aqueous solution of this acid.';

const video: Explainer = {
  id: 'xq-c20-3-8',
  lessonId: '',
  exam: {
    lesson: 'c20-3-8',
    source: 'OpenStax, Chemistry 2e, end-of-chapter exercise 29, section 14.3, Relative Strengths of Acids and Bases',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/chemistry-2e/pages/14-exercises',
    question: QUESTION,
  },
  title: 'Exam Question: What Is in a Weak Acid Solution? Strong and Weak Acids',
  thumbnailTitle: 'What Is in Vinegar?',
  thumbnail: 'aw',
  summary:
    'A real test question, solved one small step at a time: list every molecule and ion in 1 M acetic acid, from most to least concentrated. We watch a weak acid ionise only a little, and reason out the order: water, acetic acid, hydronium and acetate ions equally, then hydroxide ions.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'What Is in Vinegar?', subtitle: 'The particles in a weak acid, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about what is actually in a solution of a weak acid. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'The odor of vinegar is due to the presence of acetic acid, $\\ce{CH3CO2H}$, a weak acid. List, in order of descending concentration, all of the ionic and molecular species present in a 1-M aqueous solution of this acid.',
          answer: 'H₂O > CH₃CO₂H > H₃O⁺ = CH₃CO₂⁻ > OH⁻',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'The odour of vinegar is due to the presence of acetic acid, a weak acid.', caption: 'The odor of vinegar is due to the presence of acetic acid, CH₃CO₂H, a weak acid.' },
        { say: 'List, in order of descending concentration, all of the ionic and molecular species present in a one molar aqueous solution of this acid.', caption: 'List, in order of descending concentration, all of the ionic and molecular species present in a 1-M aqueous solution of this acid.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Name every kind of **molecule** and **ion** in the solution, from the **most** to the **fewest** per litre' }],
      lines: [
        { say: 'A species is any one kind of particle: a kind of molecule or a kind of ion. One molar means one mole of acetic acid was dissolved per litre.', show: 'plain' },
        { say: 'So we must name every kind of particle in the solution and put them in order, from the most per litre to the fewest.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(strength, 'sw')],
      lines: [
        { say: 'Here is what we need. On the left, seven molecules of hydrochloric acid, a strong acid. On the right, seven of acetic acid, a weak acid.', show: ['sw', 'sw.labels', 'sw.key'] },
        { say: 'Watch them in water. Every hydrogen chloride molecule gives its hydrogen to a water molecule, so the strong acid ionises completely.', play: 'sw.go', focus: 'sw.s' },
        { say: 'Acetic acid holds on to its hydrogen. Only now and then does a molecule ionise, and the ions soon join back together. So a weak acid is only slightly ionised: most of its molecules stay whole.', focus: 'sw.w' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**List** every species, from the water and the acid\'s ionisation', 'Compare the **solvent** with the **acid**', 'Compare the acid with its **ions**, then find the **scarcest**'] }],
      lines: [
        { say: 'Here is the plan. First, we list every species: the water, and everything the acid\'s ionisation gives.', show: 'plan.0' },
        { say: 'Then we compare the water with the acid.', show: 'plan.1' },
        { say: 'Then we compare the acid with its ions, and find which species is scarcest.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: List the species',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'e',
          size: 'md',
          lines: ['\\ce{CH3CO2H(aq) + H2O(l) <=> H3O+(aq) + CH3CO2-(aq)}', '\\ce{H2O},\\ \\ce{CH3CO2H},\\ \\ce{H3O+},\\ \\ce{CH3CO2-},\\ \\ce{OH-}'],
        },
      ],
      lines: [
        { say: 'Step one. When acetic acid ionises, it gives a hydrogen to a water molecule, forming a hydronium ion and an acetate ion. The double arrow shows the ions can join back up again.', show: 'e.0', caption: 'Step one. When acetic acid ionises, it gives a hydrogen to a water molecule, forming a hydronium ion (H₃O⁺) and an acetate ion (CH₃CO₂⁻). The double arrow shows the ions can join back up again.' },
        { say: 'So the species are water, acetic acid molecules, hydronium ions and acetate ions. And any water also contains a very few hydroxide ions, so they count too: five species in all.', show: 'e.1', focus: 'e.1', caption: 'So the species are H₂O, CH₃CO₂H, H₃O⁺ and CH₃CO₂⁻. And any water also contains a very few hydroxide ions (OH⁻), so they count too: five species in all.' },
      ],
    },
    {
      chapter: 'Step 2: Water comes first',
      layout: 'center',
      main: [{ kind: 'math', id: 'w', size: 'lg', lines: ['1\\ \\text{L of water} \\approx 1000\\ \\text{g}', '\\dfrac{1000\\ \\text{g}}{18.02\\ \\text{g/mol}} \\approx \\good{55.5\\ \\text{mol}} \\gg 1\\ \\text{mol of acid}'] }],
      lines: [
        { say: 'Step two. Water is the solvent. A litre of solution is mostly water, about a thousand grams of it.', show: 'w.0' },
        { say: 'Divided by water\'s molar mass, eighteen point zero two grams per mole, that is about fifty five and a half moles of water, far more than the one mole of acid. So water comes first.', show: 'w.1', focus: 'w.1', caption: 'Divided by water\'s molar mass, 18.02 g/mol, that is about 55.5 mol of water, far more than the 1 mol of acid. So water comes first.' },
      ],
    },
    {
      chapter: 'Step 3: The acid and its ions',
      layout: 'split',
      leftWidth: 620,
      left: [acetic],
      right: [{ kind: 'math', id: 'i', size: 'md', lines: ['\\ce{CH3CO2H} > \\ce{H3O+}', '\\ce{H3O+} = \\ce{CH3CO2-}'] }],
      lines: [
        { say: 'Step three. Here is acetic acid on its own. Count the hydronium ions as it goes: only about one molecule is ionised at any moment.', show: ['aw', 'aw.labels', 'aw.key', 'aw.tally'], play: 'aw.go' },
        { say: 'A weak acid is mostly un-ionised, so the whole acetic acid molecules far outnumber the ions they form.', show: 'i.0', caption: 'A weak acid is mostly un-ionised, so the whole CH₃CO₂H molecules far outnumber the ions they form.' },
        { say: 'And each molecule that ionises gives exactly one hydronium ion and one acetate ion, so those two have equal concentrations.', show: 'i.1', focus: 'i.1' },
      ],
    },
    {
      chapter: 'Step 4: The scarcest',
      layout: 'center',
      main: [{ kind: 'math', id: 'h', size: 'lg', lines: ['\\text{acidic: pH} < 7 \\Rightarrow \\text{pOH} > 7', '[\\ce{OH-}] < 10^{-7}\\ \\text{mol/L}: \\good{\\text{the fewest}}'] }],
      lines: [
        { say: 'Step four. The solution is acidic, so its p H is below seven, and its p O H must be above seven, since they add up to fourteen.', show: 'h.0', caption: 'Step four. The solution is acidic, so its pH is below 7, and its pOH must be above 7, since they add up to 14.' },
        { say: 'So the hydroxide ion concentration is less than ten to the minus seven moles per litre, far below even the hydronium ions. Hydroxide ions are the fewest of all.', show: 'h.1', focus: 'h.1', caption: 'So [OH⁻] is less than 10⁻⁷ mol/L, far below even the hydronium ions. Hydroxide ions are the fewest of all.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'math', id: 'ans', size: 'md', lines: ['\\ce{H2O} > \\ce{CH3CO2H} > \\ce{H3O+} = \\ce{CH3CO2-} > \\ce{OH-}'] },
        { kind: 'text', id: 'why', size: 'md', md: 'solvent, then the mostly **un-ionised** acid, then its ions **one for one**, then a trace of hydroxide' },
      ],
      lines: [
        { say: 'Here is the whole answer: water, then acetic acid, then hydronium ions and acetate ions equally, then hydroxide ions.', show: 'ans.0', caption: 'Here is the whole answer: H₂O > CH₃CO₂H > H₃O⁺ = CH₃CO₂⁻ > OH⁻.' },
        { say: 'The solvent comes first, then the mostly un-ionised acid, then its ions one for one, then a trace of hydroxide. That matches the book.', show: 'why' },
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
            ['$\\ce{H3O+}$ and $\\ce{CH3CO2-}$ above $\\ce{CH3CO2H}$', 'Treated it as **strong**; a weak acid is mostly **whole**'],
            ['$\\ce{H3O+} > \\ce{CH3CO2-}$', 'Each ionisation makes **one of each**'],
            ['water left out', 'The **solvent** is a species too, and the most common one'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Putting the ions above the acid treats acetic acid as if it were strong. A weak acid stays mostly as whole molecules.', focus: 'traps.0' },
        { say: 'Putting hydronium above acetate. Each ionisation makes one of each, so they are equal.', focus: 'traps.1' },
        { say: 'And leaving water out. It is a molecular species in the solution, and by far the most common one.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'In a 1 mol/L solution of acetic acid, which statement is true?',
          choices: ['$[\\ce{H3O+}] = 1\\ \\text{mol/L}$', '$[\\ce{CH3CO2-}] > [\\ce{CH3CO2H}]$', '$[\\ce{OH-}] > [\\ce{H3O+}]$', '$[\\ce{H3O+}] = [\\ce{CH3CO2-}]$'],
          answer: 3,
          working: 'Each molecule that ionises gives one $\\ce{H3O+}$ and one $\\ce{CH3CO2-}$. Only a small fraction ionises, and the solution is acidic.',
        },
      ],
      lines: [
        { say: 'Your turn. In a one mole per litre solution of acetic acid, which statement is true? Pause the video and try it.', show: 'q2', wait: 6, caption: 'Your turn. In a 1 mol/L solution of acetic acid, which statement is true? Pause the video and try it.' },
        { say: 'Each molecule that ionises gives one hydronium ion and one acetate ion, so their concentrations are equal: choice D. The others would need a strong acid, or a basic solution.', show: 'q2.answer' },
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
          items: ['The **solvent**, water, is always the most concentrated', 'A **weak** acid stays mostly as **whole molecules**', 'Its ions form **one for one**; in an acid, $\\ce{OH-}$ is scarcest'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The solvent, water, is always the most concentrated species.', show: 'sum.0' },
        { say: 'A weak acid ionises only slightly, so most of it stays as whole molecules.', show: 'sum.1' },
        { say: 'Its ions form one for one, and in an acidic solution, hydroxide ions are the scarcest. For more on strong and weak acids, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
