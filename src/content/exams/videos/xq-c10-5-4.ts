import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { chargeBars, gasTest } from '@/content/chem10/videos/lib/c10-5-figures.ts';
import { marbleInAcid, neutralizing } from '@/content/chem10/videos/lib/c10-particles.ts';

// Exam question for Chemistry 10 lesson 5.4 (neutralization and salts): name a salt and write the
// word equation, write a salt's formula, and give the products of an acid with a carbonate and
// the test for the gas. Gradileo wrote this one in the style of a high-school chemistry unit test.
// Answers: (a) potassium chloride; hydrochloric acid + potassium hydroxide -> potassium chloride
// + water; (b) Na2SO4; (c) calcium nitrate, water and carbon dioxide, and carbon dioxide turns
// limewater cloudy.
//
// The pictures: hydrogen ions and hydroxide ions joining as water while a thermometer rises
// (src/video/particles.ts), the charges of sodium and sulfate ions as blocks that must balance,
// marble chips fizzing in acid, and the gas bubbled through limewater.

const QUESTION =
  '(a) Name the salt formed when hydrochloric acid reacts with potassium hydroxide, and write a word equation for the reaction. (b) Write the formula of the salt formed when sulfuric acid reacts with sodium hydroxide. (c) Dilute nitric acid is added to calcium carbonate. Name the three products, and describe a test that shows the gas is carbon dioxide.';

const sodium = figure('s', [
  chargeBars({
    pos: { tex: '\\ce{Na+}', charge: 1, count: 2, sum: '2+' },
    neg: { tex: '\\ce{SO4^2-}', charge: 2, count: 1, sum: '2-' },
  }),
]);
const test = figure('g', [gasTest()]);

const video: Explainer = {
  id: 'xq-c10-5-4',
  lessonId: '',
  exam: {
    lesson: 'c10-5-4',
    source: 'Exam-style question written by Gradileo, in the style of a high-school chemistry unit test',
    licence: 'Gradileo\'s own question',
    question: QUESTION,
  },
  title: 'Exam Question: Naming Salts and Testing for Carbon Dioxide. Neutralization',
  thumbnailTitle: 'Acid Meets Base',
  thumbnail: 'nz',
  summary:
    'An exam-style question, solved one small step at a time: we name the salt from hydrochloric acid and potassium hydroxide, write the formula of sodium sulfate by balancing the charges of its ions, and find the products of nitric acid with calcium carbonate. We watch hydrogen and hydroxide ions join as water, and see the carbon dioxide turn limewater cloudy.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Acid Meets Base', subtitle: 'Neutralization and salts, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam-style question about what acids make when they react with bases and carbonates. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: '(a) Name the salt formed when hydrochloric acid reacts with potassium hydroxide, and write a word equation for the reaction.<br>(b) Write the formula of the salt formed when sulfuric acid reacts with sodium hydroxide.<br>(c) Dilute nitric acid is added to calcium carbonate. Name the three products, and describe a test that shows the gas is carbon dioxide.',
          answer: '(a) potassium chloride (b) $\\ce{Na2SO4}$ (c) calcium nitrate, water, carbon dioxide; it turns limewater cloudy',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'Part a: name the salt formed when hydrochloric acid reacts with potassium hydroxide, and write a word equation for the reaction. Part b: write the formula of the salt formed when sulfuric acid reacts with sodium hydroxide.', caption: 'Part (a): name the salt formed when hydrochloric acid reacts with potassium hydroxide, and write a word equation for the reaction. Part (b): write the formula of the salt formed when sulfuric acid reacts with sodium hydroxide.' },
        { say: 'Part c: dilute nitric acid is added to calcium carbonate. Name the three products, and describe a test that shows the gas is carbon dioxide.', caption: 'Part (c): dilute nitric acid is added to calcium carbonate. Name the three products, and describe a test that shows the gas is carbon dioxide.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Every part is an **acid** reacting, so every part makes a **salt**' }],
      lines: [
        { say: 'All three parts start with an acid. In the first two parts it meets a base, a metal hydroxide, and in the last part it meets a metal carbonate.', show: 'plain' },
        { say: 'Either way, the acid is neutralized and a salt is made, so the key skill is working out which salt.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'facts',
          head: ['Reaction', 'Products'],
          rows: [
            ['acid + metal hydroxide', 'salt + water'],
            ['acid + metal carbonate', 'salt + water + carbon dioxide'],
          ],
        },
        {
          kind: 'table',
          id: 'names',
          head: ['Acid', 'Salt ending'],
          rows: [
            ['hydrochloric acid', '**chloride**'],
            ['sulfuric acid', '**sulfate**'],
            ['nitric acid', '**nitrate**'],
          ],
        },
      ],
      lines: [
        { say: 'Here is what we need. An acid and a metal hydroxide make a salt and water. An acid and a metal carbonate make a salt, water and carbon dioxide.', show: 'facts' },
        { say: 'The salt\'s name has two parts. The first part is the metal, from the base or carbonate. The second part comes from the acid: hydrochloric acid gives a chloride, sulfuric acid a sulfate, and nitric acid a nitrate.', show: 'names' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Metal** from the base, **ending** from the acid', 'Balance the **charges** for the formula', 'A carbonate also gives **carbon dioxide**: test with **limewater**'] }],
      lines: [
        { say: 'Here is the plan. Name each salt with the metal from the base, and the ending from the acid.', show: 'plan.0' },
        { say: 'For a formula, balance the charges of the ions.', show: 'plan.1' },
        { say: 'And remember that a carbonate gives carbon dioxide too, which we test with limewater.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Part (a)',
      layout: 'split',
      leftWidth: 620,
      left: [neutralizing('nz', 420)],
      right: [
        { kind: 'callout', id: 'a', tone: 'key', title: 'Part (a)', md: 'hydrochloric acid + potassium hydroxide → **potassium chloride** + water' },
      ],
      lines: [
        { say: 'Step one, part a. Here is an acid and a hydroxide up close, with a thermometer. The small yellow particles are hydrogen ions from the acid, and the red and yellow pairs are hydroxide ions from the base.', show: ['nz', 'nz.labels'] },
        { say: 'Each time a hydrogen ion meets a hydroxide ion, they join as a water molecule, and the temperature rises. The metal ions and the chloride ions are left behind: that is the salt.', show: 'nz.tally', play: 'nz.go' },
        { say: 'Here the base is sodium hydroxide. With potassium hydroxide, potassium ions take the place of sodium. So the metal is potassium, and hydrochloric acid gives a chloride: the salt is potassium chloride.' },
        { say: 'The word equation: hydrochloric acid plus potassium hydroxide makes potassium chloride plus water.', show: 'a' },
      ],
    },
    {
      chapter: 'Step 2: Part (b)',
      layout: 'split',
      leftWidth: 760,
      left: [sodium],
      right: [{ kind: 'math', id: 'b', size: 'lg', lines: ['\\ce{Na2SO4}'] }],
      lines: [
        { say: 'Step two, part b. Sodium hydroxide gives sodium ions, and sulfuric acid gives sulfate ions, so the salt is sodium sulfate.' },
        { say: 'A sodium ion is one plus. A sulfate ion, S O four, is two minus.', show: ['s.pos0', 's.neg0'], caption: 'A sodium ion is 1+. A sulfate ion, SO₄²⁻, is 2−.' },
        { say: 'To balance the two minus charge, we need two sodium ions. Now both rows are the same length.', show: ['s.pos1', 's.pos-sum', 's.neg-sum'] },
        { say: 'So the formula is N a two S O four.', show: 'b', caption: 'So the formula is Na₂SO₄.' },
      ],
    },
    {
      chapter: 'Step 3: Part (c)',
      layout: 'split',
      leftWidth: 620,
      left: [marbleInAcid('mc', 420)],
      right: [{ kind: 'callout', id: 'c', tone: 'key', title: 'Part (c) products', md: '**Calcium nitrate**, **water** and **carbon dioxide**' }],
      lines: [
        { say: 'Step three, part c. Here is calcium carbonate in dilute acid, up close.', show: ['mc', 'mc.labels'] },
        { say: 'Acid particles pull the carbonate apart at its surface. Calcium ions go into the solution, and carbon dioxide gas forms and bubbles out: that is the fizzing.', play: 'mc.fizz' },
        { say: 'The metal is calcium and the acid is nitric acid, so the salt is calcium nitrate. With a carbonate, the products are calcium nitrate, water and carbon dioxide.', show: 'c' },
      ],
    },
    {
      chapter: 'The limewater test',
      layout: 'split',
      leftWidth: 600,
      left: [test],
      right: [{ kind: 'callout', id: 'lime', tone: 'key', title: 'Part (c) test', md: 'Bubble the gas through **limewater**. Carbon dioxide turns it **cloudy**.' }],
      lines: [
        { say: 'To show that the gas is carbon dioxide, lead it from the fizzing tube through a delivery tube.', show: ['g.tube-a', 'g.label-a', 'g.fizz', 'g.pipe', 'g.gas'] },
        { say: 'Bubble it through limewater, a solution of calcium hydroxide.', show: ['g.tube-b', 'g.label-b', 'g.bubbles'] },
        { say: 'Carbon dioxide turns limewater cloudy, because tiny grains of solid calcium carbonate form. That is the test.', show: ['g.cloudy', 'lime'] },
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
            ['(a)', '**Potassium chloride**: hydrochloric acid + potassium hydroxide → potassium chloride + water'],
            ['(b)', '$\\ce{Na2SO4}$'],
            ['(c)', '**Calcium nitrate**, **water**, **carbon dioxide**; it turns limewater **cloudy**'],
          ],
        },
      ],
      lines: [
        { say: 'Here is the whole answer.', show: 'ans' },
        { say: 'A quick check on part b: two sodium ions at one plus each make two plus, and one sulfate ion is two minus, so the charges cancel.' },
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
            ['(a) potassium hydrochloride', 'The salt of hydrochloric acid is a **chloride**'],
            ['(b) $\\ce{NaSO4}$', 'Did not **balance** the charges'],
            ['(c) "hydrogen gas"', 'Mixed up carbonates with **metals**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Calling the salt potassium hydrochloride. The hydrogen of the acid ends up in water, so the salt is simply a chloride.', focus: 'traps.0' },
        { say: 'Writing N a S O four. One sodium ion cannot balance a sulfate ion\'s two minus charge.', focus: 'traps.1', caption: 'Writing NaSO₄. One sodium ion cannot balance a sulfate ion\'s 2− charge.' },
        { say: 'And naming hydrogen as the gas. Acids give hydrogen with metals, but with carbonates the gas is carbon dioxide.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which salt forms when **nitric acid** reacts with **magnesium hydroxide**?',
          choices: ['Magnesium chloride', 'Magnesium sulfate', 'Magnesium nitrate', 'Magnesium carbonate'],
          answer: 2,
          working: 'The metal is magnesium, and nitric acid gives a nitrate.',
        },
      ],
      lines: [
        { say: 'Your turn. Which salt forms when nitric acid reacts with magnesium hydroxide? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The metal comes from the base, magnesium, and the ending from the acid: nitric acid gives a nitrate. So it is magnesium nitrate, choice C.', show: 'q2.answer' },
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
          items: ['Acid + hydroxide → **salt + water**', 'Acid + carbonate → **salt + water + carbon dioxide**', 'Salt name: **metal** from the base, **ending** from the acid', 'Carbon dioxide turns limewater **cloudy**'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. An acid and a metal hydroxide make a salt and water.', show: 'sum.0' },
        { say: 'An acid and a metal carbonate make a salt, water and carbon dioxide.', show: 'sum.1' },
        { say: 'Name the salt with the metal from the base, and the ending from the acid.', show: 'sum.2' },
        { say: 'And carbon dioxide turns limewater cloudy. For more on neutralization, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
