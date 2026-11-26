import type { Explainer } from '@/video/script.ts';
import { voltaic } from '../../chem30/videos/lib/c30-cells.ts';

const video: Explainer = {
  id: 'cx-24-2',
  lessonId: 'cx-24-2',
  title: 'Cell Potential, Free Energy and Nonstandard Conditions',
  thumbnail: false,
  summary:
    'ΔG° = −nFE°, so a positive cell potential means a favoured reaction, and a negative one needs an electrolytic cell. E° applies when Q = 1: conditions that make Q smaller push the cell farther from equilibrium and raise its potential, those that make Q larger lower it, and the potential falls to zero at equilibrium. Le Chatelier’s principle does not apply to a working cell, and in a concentration cell the dilute side is the anode.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'AP Chemistry', title: 'Cell Potential, Free Energy and Nonstandard Conditions', subtitle: 'What a battery’s voltage really measures' }],
      lines: [
        { say: 'A battery’s voltage measures how hard its reaction pushes electrons around a circuit. That push is the same driving force that free energy describes.', show: 'title' },
        { say: 'In this lesson, you will link cell potential to free energy, and predict how a cell’s potential changes away from standard conditions.' },
      ],
    },
    {
      chapter: 'A cell at work, up close',
      layout: 'center',
      main: [voltaic('vc', { seed: 1 })],
      lines: [
        { say: 'Here is a zinc and copper cell up close. On the left, zinc stands in zinc nitrate solution. On the right, copper stands in copper two nitrate solution, and a wire joins the two. Watch the zinc electrode, and the copper two ions near the copper.', caption: 'Here is a zinc and copper cell up close. On the left, zinc stands in zinc nitrate solution. On the right, copper stands in copper(II) nitrate solution, and a wire joins the two. Watch the zinc electrode, and the copper(II) ions near the copper.', show: ['vc', 'vc.labels', 'vc.key', 'vc.tally'], play: 'vc.run' },
        { say: 'Zinc atoms leave as ions, and their electrons travel through the wire to the copper, where copper two ions take them. The reaction runs by itself, because its free energy change is negative.', caption: 'Zinc atoms leave as ions, and their electrons travel through the wire to the copper, where copper(II) ions take them. The reaction runs by itself, because its free energy change is negative.' },
      ],
    },
    {
      chapter: 'Cell potential and free energy',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\Delta G^\\circ = -nFE^\\circ', '\\Delta G^\\circ = -2 \\times 96\\,485 \\times 1.10', '\\Delta G^\\circ = -212\\,267\\ \\text{J/mol} = -212\\ \\text{kJ/mol}'] }],
      lines: [
        { say: 'Delta G standard equals negative n F E standard, where n is the moles of electrons transferred, and F is the Faraday constant, ninety-six thousand four hundred eighty-five coulombs per mole.', caption: 'ΔG° = −nFE°, where n is the moles of electrons transferred, and F is the Faraday constant, 96 485 C/mol.', show: 'm.0', focus: 'm.0' },
        { say: 'For the zinc and copper cell, E standard is one point one zero volts and two electrons are transferred.', caption: 'For the zinc and copper cell, E° = 1.10 V and two electrons are transferred.', show: 'm.1', focus: 'm.1' },
        { say: 'So delta G is minus two hundred twelve kilojoules per mole. A positive cell potential always means a negative delta G, a favoured reaction.', caption: 'So ΔG° = −212 kJ/mol. A positive cell potential always means a negative ΔG°, a favoured reaction.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Away from standard conditions',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['$Q = 1$: the potential is $E^\\circ$', '$Q < 1$: farther from equilibrium, $E > E^\\circ$', '$Q > 1$: closer to equilibrium, $E < E^\\circ$', '$Q = K$: at equilibrium, $E = 0$'] }],
      lines: [
        { say: 'E standard is the potential when every solution is at one mole per litre, so the reaction quotient Q is one.', caption: 'E° is the potential when every solution is at 1 mol/L, so the reaction quotient Q is 1.', show: 'b.0' },
        { say: 'The potential measures how far the cell is from equilibrium. If the conditions make Q smaller than one, the cell is farther from equilibrium, and its potential is greater.', caption: 'The potential measures how far the cell is from equilibrium. If the conditions make Q smaller than 1, the cell is farther from equilibrium, and its potential is greater.', show: 'b.1' },
        { say: 'If they make Q larger than one, the potential is smaller.', caption: 'If they make Q larger than 1, the potential is smaller.', show: 'b.2' },
        { say: 'As the cell runs, Q rises towards K, and the potential falls, reaching zero at equilibrium. The battery is flat.', show: 'b.3' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [{ kind: 'callout', id: 'm', tone: 'mistake', title: 'Not Le Chatelier', md: 'A working cell is **not at equilibrium**, so Le Chatelier’s principle does not apply. Ask whether a change moves the cell closer to equilibrium or farther from it.' }],
      lines: [{ say: 'Do not use Le Chatelier’s principle for a working cell. It is not at equilibrium. Ask instead whether a change moves the cell closer to equilibrium, or farther from it. In a concentration cell, with the same ion on both sides, the dilute side makes more ions, so it is the anode.', show: 'm' }],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In a zinc–copper cell, $[\\ce{Cu^2+}]$ is raised to 2.0 mol/L with $[\\ce{Zn^2+}]$ at 1.0 mol/L. How does $E$ compare with $E^\\circ$?',
          choices: ['Greater than $E^\\circ$', 'Less than $E^\\circ$', 'Equal to $E^\\circ$', 'It becomes zero'],
          answer: 0,
          working: '$Q = \\dfrac{[\\ce{Zn^2+}]}{[\\ce{Cu^2+}]} = 0.5$, less than 1, so the cell is farther from equilibrium and $E > E^\\circ$.',
        },
      ],
      lines: [
        { say: 'Your turn. In a zinc and copper cell, the copper ion concentration is raised to two moles per litre, with zinc ions at one. How does the potential compare with E standard? Pause the video and try it.', caption: 'Your turn. In a zinc and copper cell, [Cu²⁺] is raised to 2.0 mol/L, with [Zn²⁺] at 1.0 mol/L. How does the potential compare with E°? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is choice A, greater. Q is zinc ions over copper ions, which is one half. That is less than one, so the cell is farther from equilibrium.', caption: 'The answer is choice A, greater. Q = [Zn²⁺] ÷ [Cu²⁺] = 0.5. That is less than 1, so the cell is farther from equilibrium.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['ΔG° = −nFE°: positive E°, favoured reaction.', 'Smaller Q: larger E. Larger Q: smaller E.', 'E = 0 at equilibrium.', 'In a concentration cell, the dilute side is the anode.'] }],
      lines: [
        { say: 'Let’s sum up. Delta G standard equals negative n F E standard, so a positive cell potential means a favoured reaction.', caption: 'Let’s sum up. ΔG° = −nFE°, so a positive cell potential means a favoured reaction.', show: 'sum.0' },
        { say: 'A smaller Q gives a larger potential, and a larger Q a smaller one.', show: 'sum.1' },
        { say: 'The potential falls to zero at equilibrium.', show: 'sum.2' },
        { say: 'And in a concentration cell, the dilute side is the anode.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
