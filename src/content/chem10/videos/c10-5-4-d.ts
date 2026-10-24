import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { gasTest, phStrip } from './lib/c10-5-figures.ts';

// The gas from an acid and a metal carbonate, bubbled through limewater.
const test = figure('g', [gasTest()]);

// Adding alkali to acid with universal indicator: from red, stop at green.
const titrate = figure(
  'u',
  [
    phStrip({
      colours: 'universal',
      shade: 0.7,
      marks: [{ id: 'over', value: 10, tex: '\\text{too much alkali}', tone: 'adj' }],
      hops: [{ id: 'rise', from: 1, to: 7, tex: '\\text{add alkali until green}', tone: 'good' }],
    }),
  ],
  320,
);

const video: Explainer = {
  id: 'c10-5-4-d',
  lessonId: 'c10-5-4',
  title: 'Neutralization, Part 4: Carbonates and Neutralizing Safely',
  thumbnailTitle: 'Carbonates and Safety',
  thumbnail: 'g',
  summary:
    'Metal carbonates neutralize acids too: acid + metal carbonate → salt + water + carbon dioxide, and the carbon dioxide turns limewater cloudy. To make a neutral salt solution, add alkali to acid a little at a time with universal indicator, and stop when it just turns green. Use a weak base such as sodium hydrogen carbonate on a small acid spill, and only plenty of cold running water on skin.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Moles, Acids and Bases · Part 4', title: 'Carbonates and Neutralizing Safely', subtitle: 'Fizzing, limewater and lab safety' }],
      lines: [
        { say: 'Drop a piece of chalk into an acid, and it fizzes. Chalk is calcium carbonate, and it neutralizes the acid, giving off a gas.', show: 'title' },
        { say: 'In this last part, you will see what acids and metal carbonates make, how to test for the gas, and how to neutralize an acid safely.' },
      ],
    },
    {
      chapter: 'Acids and metal carbonates',
      layout: 'split',
      leftWidth: 600,
      left: [test],
      right: [
        { kind: 'callout', id: 'rule', tone: 'key', title: 'Acids and metal carbonates', md: 'acid + metal carbonate → salt + water + **carbon dioxide**' },
        { kind: 'callout', id: 'lime', tone: 'tip', title: 'Testing for carbon dioxide', md: 'Bubble the gas through **limewater**, a solution of calcium hydroxide. Carbon dioxide turns limewater **cloudy**.' },
      ],
      lines: [
        { say: 'Metal carbonates, such as calcium carbonate, also neutralize acids. They make a salt and water, and a gas as well: carbon dioxide.', show: ['rule', 'g.tube-a', 'g.label-a'] },
        { say: 'That is why a carbonate fizzes when it is dropped into an acid.', show: 'g.fizz', focus: 'g.fizz' },
        { say: 'To show that the gas is carbon dioxide, bubble it through limewater, a solution of calcium hydroxide.', show: ['lime', 'g.pipe', 'g.gas', 'g.tube-b', 'g.label-b', 'g.bubbles'] },
        { say: 'Carbon dioxide turns limewater cloudy, because tiny grains of solid calcium carbonate form.', show: 'g.cloudy' },
      ],
    },
    {
      chapter: 'Calcium carbonate and hydrochloric acid',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'What forms when calcium carbonate reacts with hydrochloric acid?' },
        { kind: 'text', id: 'w', size: 'md', align: 'center', md: '[[brand:calcium]] carbonate + hydrochloric acid → [[brand:calcium]] [[good:chloride]] + water + carbon dioxide' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{CaCO3 + 2HCl -> CaCl2 + H2O + CO2}', '\\text{1 Ca, 1 C, 3 O, 2 H and 2 Cl each side} \\ \\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'What forms when calcium carbonate reacts with hydrochloric acid?', show: 'q' },
        { say: 'A metal carbonate and an acid make a salt, water and carbon dioxide. The salt has calcium from the carbonate, and chloride from hydrochloric acid: calcium chloride.', show: 'w' },
        { say: 'In symbols, each calcium carbonate needs two hydrochloric acid.', show: 'm.0', focus: 'm.0' },
        { say: 'Check: one calcium, one carbon, three oxygen, two hydrogen and two chlorine atoms on each side.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Making a neutral solution',
      layout: 'center',
      main: [
        { kind: 'text', id: 'uses', size: 'md', align: 'center', md: 'An **antacid** neutralizes some of the acid in the stomach. **Lime** neutralizes soil that is too acidic.' },
        titrate,
      ],
      lines: [
        { say: 'Neutralization is useful wherever there is too much acid. An antacid tablet contains a base, such as magnesium hydroxide, that neutralizes some of the acid in the stomach. Farmers spread lime on soil that is too acidic.', show: 'uses' },
        { say: 'To make a neutral salt solution in the laboratory, add an alkali to an acid a little at a time, stirring, with a few drops of universal indicator.', show: ['u.scale', 'u.red', 'u.orange', 'u.yellow', 'u.green', 'u.blue', 'u.purple'], focus: 'u.red' },
        { say: 'As the acid is used up, the p H rises, and the indicator changes from red towards green.', caption: 'As the acid is used up, the pH rises, and the indicator changes from red towards green.', show: 'u.rise', focus: 'u.rise' },
        { say: 'Stop as soon as it just turns green, at p H seven. Too much alkali makes the solution basic, and the indicator turns blue or purple.', caption: 'Stop as soon as it just turns green, at pH 7. Too much alkali makes the solution basic, and the indicator turns blue or purple.', show: 'u.over', focus: 'u.green' },
        { say: 'Evaporating some of the water from the neutral solution, then leaving it to cool, gives crystals of the salt.' },
      ],
    },
    {
      chapter: 'Spills and splashes',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Acid spill on the bench**: sprinkle on a weak base, such as sodium hydrogen carbonate powder. When the fizzing stops, wipe it up with plenty of water.',
            '**Acid or alkali on skin**: rinse it off at once with plenty of cold running water, and tell the teacher.',
          ],
        },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'More base is not safer', md: 'A concentrated alkali on a spill, or on skin, adds a second corrosive chemical, and neutralization gives out heat.' },
      ],
      lines: [
        { say: 'A small spill of dilute acid on a bench can be neutralized with a weak base, such as sodium hydrogen carbonate powder. When the fizzing stops, the acid is used up: wipe it up with plenty of water.', show: 'b.0' },
        { say: 'Acid or alkali on skin is different. Rinse it off at once with plenty of cold running water, and tell the teacher.', show: 'b.1' },
        { say: 'Never pour a concentrated alkali onto an acid spill, or onto skin. It adds a second corrosive chemical, and neutralization gives out heat.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A little dilute hydrochloric acid is spilled on the bench. After telling the teacher, what is the safest way to deal with it?',
          choices: [
            'Pour concentrated sodium hydroxide on it.',
            'Wipe it up with bare hands.',
            'Leave it to evaporate.',
            'Add sodium hydrogen carbonate powder until the fizzing stops, then wipe it up with water.',
          ],
          answer: 3,
          working: 'A weak base neutralizes the acid safely: when the fizzing stops, the acid is used up. Concentrated sodium hydroxide is corrosive itself.',
        },
      ],
      lines: [
        { say: 'Your turn. A little dilute hydrochloric acid is spilled on the bench. After telling the teacher, what is the safest way to deal with it? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. A weak base neutralizes the acid safely, and when the fizzing stops, the acid is used up. Choice A adds a second corrosive chemical, and gives out heat.', show: 'q.answer' },
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
          items: [
            'Acid + metal carbonate → salt + water + carbon dioxide.',
            'Carbon dioxide turns limewater cloudy.',
            'To make a neutral salt solution, add alkali to acid a little at a time, and stop when universal indicator just turns green.',
            'Use a weak base on a bench spill, and only plenty of cold running water on skin.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An acid and a metal carbonate make a salt, water and carbon dioxide.', show: 'sum.0' },
        { say: 'Carbon dioxide turns limewater cloudy.', show: 'sum.1' },
        { say: 'To make a neutral salt solution, add alkali to acid a little at a time, and stop when universal indicator just turns green.', show: 'sum.2' },
        { say: 'And use a weak base on a bench spill, but only water on skin. That completes this unit on moles, acids and bases. Thanks for watching!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
