import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { arrow, ionBox, ionRow, lattice, tag } from './lib/c10-3-figures.ts';

// A slice of an ionic lattice: every ion is held by the oppositely charged ions around it.
const crystal = figure('lat', [lattice({ cols: 5, rows: 5 }), tag('key-na', [0.6, -1.25], '\\ce{Na+}', { tone: 'opp' }), tag('key-cl', [4.2, -1.25], '\\ce{Cl-}', { tone: 'adj' })], 470);

// Sodium chloride as a solid (ions held in place) and molten (ions free to move).
const states = figure(
  'st',
  [
    ionBox({ name: 'solid', at: [0, 0] }),
    ionBox({ name: 'molten', at: [8, 0], molten: true, seed: 4 }),
    tag('solid-name', [2.5, -0.75], '\\text{solid: ions held in place}'),
    tag('molten-name', [10.5, -0.75], '\\text{molten: ions free to move}'),
  ],
  460,
);

// Two layers of ions, before and after a sharp blow shifts the top layer along by one ion.
const layers = figure(
  'ly',
  [
    ionRow({ name: 'bottom', count: 5, first: '+' }),
    ionRow({ name: 'top', count: 5, first: '-', at: [0, 1.2] }),
    ionRow({ name: 'shift', count: 5, first: '-', at: [1.2, 1.2] }),
    arrow('push', [-1.4, 1.2], [-0.6, 1.2], { tone: 'theta' }),
    ...[1.2, 2.4, 3.6, 4.8].flatMap((x, i) => [arrow(`up${i}`, [x, 2.0], [x, 2.6], { tone: 'bad', group: 'repel' }), arrow(`down${i}`, [x, -0.8], [x, -1.4], { tone: 'bad', group: 'repel' })]),
  ],
  400,
);

const video: Explainer = {
  id: 'c10-3-4',
  lessonId: 'c10-3-4',
  title: 'Bonding and Properties, Part 1: Ionic Compounds',
  thumbnailTitle: 'Ionic Compounds',
  thumbnail: 'st',
  summary:
    'Two questions explain most properties: how strong are the forces that must be overcome, and are there charged particles free to move? Ionic compounds are lattices held by strong attractions, so they have high melting points (sodium chloride 801 °C). They conduct only when molten or dissolved, when their ions can move, are often soluble in water, and are hard but brittle.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Bonding, Names and Formulas · Part 1', title: 'Ionic Compounds', subtitle: 'Two questions that explain properties' }],
      lines: [
        { say: 'Why does salt stay solid in a hot frying pan, while candle wax melts in the gentle heat of its own flame? Why are electrical wires made of copper, and why can diamond cut glass?', show: 'title' },
        { say: 'The answers come from the particles a substance is made of, and how strongly they hold on to each other. This part answers two questions for ionic compounds. The later parts cover the other kinds of structure, and how to tell them apart.' },
      ],
    },
    {
      chapter: 'Two questions',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'q1', tone: 'key', title: 'How strong are the forces that must be overcome?', md: 'Strong forces between particles mean a high **melting point**, the temperature at which a solid turns into a liquid. Weak forces mean a low one.' },
        { kind: 'callout', id: 'q2', tone: 'key', title: 'Are there charged particles that are free to move?', md: 'A substance conducts electricity only if it contains charged particles, electrons or ions, that can move through it. **Electrical conductivity** is how well it lets a current pass.' },
      ],
      lines: [
        { say: 'Almost every property in this lesson comes down to two questions. First: how strong are the forces that must be overcome?', show: 'q1' },
        { say: 'To melt a solid, its particles must be shaken loose from their fixed places. Strong forces take a lot of energy to overcome, so the melting point, the temperature at which a solid turns into a liquid, is high.' },
        { say: 'Weak forces mean a low melting point: the substance may even be a liquid or a gas at room temperature.' },
        { say: 'Second: are there charged particles that are free to move? An electric current is a flow of charge, so a substance conducts electricity only if it contains charged particles, electrons or ions, that can move through it.', show: 'q2' },
      ],
    },
    {
      chapter: 'High melting points',
      layout: 'split',
      leftWidth: 500,
      left: [crystal],
      right: [
        {
          kind: 'table',
          id: 'mp',
          head: ['Ionic compound', 'Melting point'],
          rows: [
            ['sodium chloride, $\\ce{NaCl}$', '801\u00a0°C'],
            ['magnesium oxide, $\\ce{MgO}$', 'about 2800\u00a0°C'],
          ],
        },
      ],
      lines: [
        { say: 'An ionic compound is a giant lattice of positive and negative ions, and every ion is attracted to all the oppositely charged ions around it.', show: 'lat' },
        { say: 'Pulling the ions out of the lattice means overcoming a huge number of strong attractions. So ionic compounds have high melting points. Sodium chloride melts at eight hundred and one degrees Celsius.', show: 'mp.0', focus: 'mp.0' },
        { say: 'Magnesium oxide, with its ions of two plus and two minus, melts at about two thousand eight hundred degrees Celsius.', show: 'mp.1', focus: 'mp.1' },
      ],
    },
    {
      chapter: 'Conducting electricity',
      layout: 'center',
      main: [states],
      lines: [
        { say: 'Ions carry charge, but in the solid they are locked in place. So solid sodium chloride does not conduct electricity.', show: ['st.solid-box', 'st.solid-ions', 'st.solid-name'] },
        { say: 'When the compound melts, we say it is molten. Now the ions are free to move, and it conducts.', show: ['st.molten-box', 'st.molten-ions', 'st.molten-name'] },
        { say: 'The same happens when it dissolves in water: the ions move through the water, and the solution conducts.' },
      ],
    },
    {
      chapter: 'Soluble but brittle',
      layout: 'split',
      leftWidth: 560,
      left: [layers],
      right: [
        { kind: 'text', id: 'sol', size: 'md', md: '**Often soluble in water:** sodium chloride, potassium nitrate. Some are not: calcium carbonate.' },
        { kind: 'text', id: 'hard', size: 'md', md: '**Hard but brittle:** a blow brings ions of the same charge face to face, and they repel.' },
      ],
      lines: [
        { say: 'Many ionic compounds, such as sodium chloride and potassium nitrate, dissolve in water. Some, such as calcium carbonate, do not.', show: 'sol' },
        { say: 'Ionic compounds are hard but brittle. Here are two layers of ions, each ion next to ions of the opposite charge.', show: ['ly.bottom-row', 'ly.top-row', 'hard'] },
        { say: 'A sharp blow shifts one layer along the next.', show: 'ly.push', hide: 'ly.top-row' },
        { say: 'Now ions of the same charge are face to face. They repel, and the crystal shatters.', show: ['ly.shift-row', 'ly.repel'], focus: 'ly.repel' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Why does solid sodium chloride not conduct electricity, while molten sodium chloride does?',
          choices: [
            'In the solid its ions are held in place; in the liquid they are free to move and carry the current.',
            'Melting releases electrons from its covalent bonds.',
            'In the solid its ions are too far apart to carry a current.',
            'Molten sodium chloride is made of metal atoms, which conduct.',
          ],
          answer: 0,
          working: 'A current needs charged particles that can move. Sodium chloride’s ions are fixed in the solid lattice, but free to move when it melts.',
        },
      ],
      lines: [
        { say: 'Your turn. Why does solid sodium chloride not conduct electricity, while molten sodium chloride does? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. A current needs charged particles that can move, and the ions are fixed in the solid lattice but free to move in the liquid. Choice B is wrong, because sodium chloride has ionic bonds, not covalent ones.', show: 'q.answer' },
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
            'Strong forces between particles mean a high melting point; weak forces mean a low one.',
            'A substance conducts only if it has charged particles that can move.',
            'Ionic compounds: high melting points, because of strong attractions between ions.',
            'They conduct when molten or dissolved, not as solids; they are often soluble, and brittle.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Strong forces between particles mean a high melting point, and weak forces a low one.', show: 'sum.0' },
        { say: 'A substance conducts only if it has charged particles that can move.', show: 'sum.1' },
        { say: 'Ionic compounds have high melting points, because of the strong attractions between their ions.', show: 'sum.2' },
        { say: 'They conduct only when molten or dissolved, and they are brittle. In part two, you will compare molecules with giant covalent structures. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
