import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { tester } from './lib/c20-3a-figures.ts';

// The same tester in salt water (ions that move: the bulb lights) and in sugar water (whole
// molecules: the bulb stays dark).
const testers = figure(
  't',
  [
    tester({
      name: 'salt',
      at: [0, 0],
      lit: true,
      label: '\\text{salt water}',
      seed: 4,
      scatter: [
        { id: 'na', count: 3, tone: 'opp', sign: '+', r: 0.33 },
        { id: 'cl', count: 3, tone: 'adj', sign: '-', r: 0.41 },
      ],
    }),
    tester({ name: 'sugar', at: [6.0, 0], label: '\\text{sugar water}', seed: 9, scatter: [{ id: 'mol', count: 5, tone: 'good', r: 0.34 }] }),
  ],
  540,
);

const video: Explainer = {
  id: 'c20-3-1-b',
  lessonId: 'c20-3-1',
  title: 'Solutions, Electrolytes and Dissociation, Part 2: Electrolytes and Non-electrolytes',
  thumbnailTitle: 'Electrolytes and Non-electrolytes',
  thumbnail: 't',
  summary:
    'A solution conducts electricity only if it contains ions that can move. Ionic compounds (including hydroxide bases) and acids are electrolytes; molecular compounds such as sugars and alcohols are non-electrolytes, because their molecules stay whole.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Matter as Solutions, Acids and Bases · Part 2', title: 'Electrolytes and Non-electrolytes', subtitle: 'Which solutions conduct, and why' }],
      lines: [
        { say: 'Dip a pair of wires from a battery and a light bulb into salt water, and the bulb lights. Dip them into sugar water, and the bulb stays dark.', show: 'title' },
        { say: 'In this part, you will see what carries a current through a solution, and how to tell from a formula whether a solution will conduct.' },
      ],
    },
    {
      chapter: 'The conductivity test',
      layout: 'split',
      leftWidth: 620,
      left: [testers],
      right: [
        { kind: 'callout', id: 'el', tone: 'definition', title: 'Electrolyte', md: 'A substance whose solution **conducts** electricity, because the solution contains **ions that can move**.' },
        { kind: 'callout', id: 'non', tone: 'definition', title: 'Non-electrolyte', md: 'A substance whose solution does **not** conduct, because it contains **no ions** to carry a current.' },
      ],
      lines: [
        { say: 'An electric current is a flow of charged particles. In a metal wire, electrons carry it. In a solution, the current must be carried by ions moving through the liquid.' },
        { say: 'A conductivity tester has two metal electrodes, wired to a battery and a light bulb.', show: ['t.salt-glass', 't.salt-liquid', 't.salt-circuit', 't.salt-label'] },
        { say: 'In salt water, ions can move. They carry charge from one electrode to the other, the circuit is complete, and the bulb lights.', show: ['t.salt-na', 't.salt-cl', 't.salt-glow'], focus: ['t.salt-na', 't.salt-cl'] },
        { say: 'In sugar water, the bulb stays dark: there are no ions to carry the charge. Pure water conducts so poorly that the bulb stays dark in it, so any glow must come from the solute.', show: ['t.sugar-glass', 't.sugar-liquid', 't.sugar-circuit', 't.sugar-label', 't.sugar-mol'], focus: 't' },
        { say: 'So a substance whose solution conducts is an electrolyte: its solution contains ions that can move.', show: 'el' },
        { say: 'A non-electrolyte forms a solution with no ions, which does not conduct.', show: 'non' },
      ],
    },
    {
      chapter: 'Three kinds of solute',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Kind of solute', 'Examples', 'In water', 'Electrolyte?'],
          rows: [
            ['Ionic compound, including hydroxide bases', '$\\ce{NaCl}$, $\\ce{CaCl2}$, $\\ce{CuSO4}$, $\\ce{NH4Cl}$, $\\ce{NaOH}$, $\\ce{KOH}$', 'dissociates into ions that can move', 'yes'],
            ['Acid', '$\\ce{HCl}$, $\\ce{HNO3}$, $\\ce{CH3COOH}$', 'ionises, forming ions', 'yes'],
            ['Molecular compound that is not an acid', 'sugars such as glucose, $\\ce{C6H12O6}$; alcohols such as ethanol, $\\ce{C2H5OH}$', 'its molecules stay whole', 'no'],
          ],
        },
      ],
      lines: [
        { say: 'Whether a solute forms ions depends on what kind of substance it is. There are three cases.' },
        { say: 'Ionic compounds, including hydroxide bases, dissociate: their ions separate and can move, so they are electrolytes. Look for a metal ion, or the ammonium ion, at the start of the formula. Ammonium chloride has no metal, but the ammonium ion takes the place of one.', show: 't.0', focus: 't.0' },
        { say: 'Acids are molecular, but in water they ionise, forming ions, so they are electrolytes as well. An acid usually has its hydrogen written first, as in hydrogen chloride, or ends in C O O H, as acetic acid does.', caption: 'Acids are molecular, but in water they ionise, forming ions, so they are electrolytes as well. An acid usually has its hydrogen written first, as in HCl, or ends in COOH, as acetic acid, CH₃COOH, does.', show: 't.1', focus: 't.1' },
        { say: 'Other molecular compounds, such as sugars and alcohols, are made only of non-metals. Glucose dissolves easily, but each molecule stays whole: a non-electrolyte.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Two traps',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm1', tone: 'mistake', title: 'Dissolving is not conducting', md: 'Sugar dissolves just as completely as salt, yet sugar water does not conduct. A solution conducts only if it contains **ions**; it needs no metal.' },
        { kind: 'callout', id: 'm2', tone: 'mistake', title: 'The OH in an alcohol is not hydroxide', md: 'In ethanol, $\\ce{C2H5OH}$, the OH group is joined to carbon by a covalent bond, and there is no metal ion, so no $\\ce{OH-}$ ions are released.' },
        { kind: 'text', id: 'weak', size: 'md', align: 'center', md: 'Acetic acid, $\\ce{CH3COOH}$, is a **weak** acid: few molecules ionise, so the bulb glows dimly. It is still an electrolyte.' },
      ],
      lines: [
        { say: 'Two traps. First, sugar dissolves just as completely as salt, yet sugar water does not conduct. A solution conducts only if it contains ions. And it needs no metal: salt water conducts because of its moving ions, not because sodium is a metal.', show: 'm1' },
        { say: 'Second, ethanol and methanol end in O H, but they are not bases. The O H is joined to carbon by a covalent bond, and there is no metal ion, so no hydroxide ions are released.', show: 'm2' },
        { say: 'Last, acetic acid, the acid in vinegar, is a weak acid. Only a few of its molecules ionise, so the bulb glows dimly, but it is still an electrolyte.', show: 'weak' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which substance forms a solution in water that conducts electricity?',
          choices: ['Methanol, $\\ce{CH3OH}$', 'Sucrose, $\\ce{C12H22O11}$', 'Glucose, $\\ce{C6H12O6}$', 'Ammonium chloride, $\\ce{NH4Cl}$'],
          answer: 3,
          working: 'Ammonium chloride is an ionic compound: the ammonium ion takes the place of a metal ion. It dissociates into ions that can move. The other three are molecular compounds that stay whole in water.',
        },
      ],
      lines: [
        { say: 'Your turn. Which substance forms a solution in water that conducts electricity? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, ammonium chloride. The ammonium ion takes the place of a metal ion, so it is ionic. Choice A ends in O H, but methanol is an alcohol, and its molecules stay whole.', show: 'q.answer' },
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
            'An **electrolyte** forms a solution with ions that can move, so it conducts.',
            'Ionic compounds and hydroxide bases **dissociate**; acids **ionise**. Both are electrolytes.',
            'Sugars and alcohols stay as whole molecules: **non-electrolytes**.',
            'Dissolving is not conducting: only moving ions carry a current.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An electrolyte forms a solution with ions that can move, so it conducts.', show: 'sum.0' },
        { say: 'Ionic compounds and hydroxide bases dissociate, and acids ionise. Both are electrolytes.', show: 'sum.1' },
        { say: 'Sugars and alcohols stay as whole molecules: non-electrolytes.', show: 'sum.2' },
        { say: 'And dissolving is not conducting. In part three, you will write equations for ionic compounds coming apart in water. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
