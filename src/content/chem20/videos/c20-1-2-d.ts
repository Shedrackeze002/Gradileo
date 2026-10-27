import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { arrow, ionBox, ionRow, lattice, tag } from './lib/c20-1a-figures.ts';

// A slice of an ionic lattice: each ion surrounded by ions of the opposite charge.
const crystal = figure('lat', [lattice({ cols: 5, rows: 5 })]);

// Two layers of an ionic crystal: + over − before a blow; after it, one layer has slid along one
// ion, so ions of the same charge face each other.
const layers = figure(
  'brittle',
  [
    ionRow({ name: 'b-top', count: 5, first: '+', at: [0, 1.2] }),
    ionRow({ name: 'b-bot', count: 5, first: '-', at: [0, 0] }),
    tag('before', [2.4, -1.1], '\\text{opposite charges attract}', { tone: 'good' }),
    arrow('blow', [5.7, 0.6], [7.3, 0.6], { tone: 'theta' }),
    ionRow({ name: 'a-top', count: 5, first: '+', at: [9.4, 1.2] }),
    ionRow({ name: 'a-bot', count: 5, first: '-', at: [8.2, 0] }),
    arrow('shift', [9.4, 2.3], [10.6, 2.3], { tone: 'theta' }),
    tag('after', [10.9, -1.1], '\\text{like charges repel}', { tone: 'bad' }),
  ],
  360,
);

// The same ionic compound as a solid (ions fixed in place) and molten (ions free to move).
const boxes = figure(
  'cond',
  [
    ionBox({ name: 's', at: [0, 0] }),
    tag('s-name', [2.5, -0.8], '\\text{solid: ions fixed}', { tone: 'bad' }),
    ionBox({ name: 'l', at: [7, 0], molten: true }),
    tag('l-name', [9.5, -0.8], '\\text{molten: ions move}', { tone: 'good' }),
  ],
  440,
);

const video: Explainer = {
  id: 'c20-1-2-d',
  lessonId: 'c20-1-2',
  title: 'Ionic Compounds, Part 4: Properties of Ionic Compounds',
  thumbnailTitle: 'Properties of Ionic Compounds',
  thumbnail: 'brittle',
  summary:
    'Every ion in an ionic lattice is held by strong attractions to the oppositely charged ions around it, so ionic compounds have high melting points (sodium chloride melts at 801 °C). They are hard but brittle, because a blow brings ions of the same charge face to face, and they conduct only when melted or dissolved, when the ions can move. A solid that melts at 770 °C and conducts only in solution is an ionic compound.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Diversity of Matter and Chemical Bonding · Part 4', title: 'Properties of Ionic Compounds', subtitle: 'What the lattice explains' }],
      lines: [
        { say: 'A grain of salt will not melt in a hot frying pan: it needs 801 degrees Celsius. Yet hit a salt crystal with a hammer, and it shatters.', show: 'title' },
        { say: 'In this part, you will see how the lattice of ions explains these properties, and how to tell an ionic compound from a molecular compound or a metal.' },
      ],
    },
    {
      chapter: 'High melting points',
      layout: 'split',
      leftWidth: 460,
      left: [crystal],
      right: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Strong attractions all round', md: 'Every ion is attracted to **all** the oppositely charged ions around it. Melting means pulling the ions away from their places.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\ce{NaCl}\\text{: melts at } 801\\ ^{\\circ}\\text{C}', '\\ce{MgO}\\text{: melts at over } 2800\\ ^{\\circ}\\text{C}'] },
      ],
      lines: [
        { say: 'Every ion in the lattice is held by strong attractions to all the oppositely charged ions around it.', show: ['lat.cations', 'lat.anions', 'key'] },
        { say: 'Melting means pulling the ions away from their places, which takes a lot of energy. Sodium chloride melts at 801 degrees Celsius.', show: 'm.0', focus: 'm.0' },
        { say: 'Magnesium oxide, with ions of two plus and two minus, holds together even more strongly, and melts at over 2,800 degrees Celsius.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Hard but brittle',
      layout: 'center',
      main: [
        layers,
        { kind: 'text', id: 't', size: 'md', align: 'center', md: 'A blow shifts one layer of ions along, bringing ions of the **same charge** face to face. They repel, and the crystal splits.' },
      ],
      lines: [
        { say: 'The strong attractions also make ionic crystals hard. But a sharp blow shatters them. Why?' },
        { say: 'In the crystal, each layer of ions sits against ions of the opposite charge, which attract.', show: ['brittle.b-top-row', 'brittle.b-bot-row', 'brittle.before'] },
        { say: 'A blow shifts one layer along by one ion. Now ions of the same charge are face to face.', show: ['brittle.blow', 'brittle.a-top-row', 'brittle.a-bot-row', 'brittle.shift'], focus: 'brittle.shift' },
        { say: 'They repel each other, and the crystal splits apart.', show: ['brittle.after', 't'] },
      ],
    },
    {
      chapter: 'Conducting electricity',
      layout: 'center',
      main: [
        boxes,
        { kind: 'text', id: 't', size: 'md', align: 'center', md: 'A current needs **charged particles that can move**. Ionic compounds conduct only when **melted or dissolved**.' },
      ],
      lines: [
        { say: 'An electric current needs charged particles that can move.', show: 't' },
        { say: 'In a solid, the ions are locked in the lattice, so a solid ionic compound does not conduct.', show: ['cond.s-box', 'cond.s-ions', 'cond.s-name'] },
        { say: 'When the compound is melted, or dissolved in water, the ions are free to move, and it conducts.', show: ['cond.l-box', 'cond.l-ions', 'cond.l-name'] },
      ],
    },
    {
      chapter: 'Ionic, molecular or metal?',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['', 'Ionic compound', 'Molecular compound', 'Metal'],
          rows: [
            ['Particles', 'a lattice of ions', 'separate molecules', 'metal ions, moving electrons'],
            ['Melting point', 'high', 'low', 'usually high'],
            ['The solid', 'hard and brittle', 'often soft', 'can be bent or hammered'],
            ['Conducts as a solid?', 'no', 'no', 'yes'],
            ['Melted or dissolved?', 'yes', 'no', 'yes, when melted'],
          ],
        },
      ],
      lines: [
        { say: 'Here is how ionic compounds compare with molecular compounds and metals.', show: 't', focus: 't' },
        { say: 'Molecular compounds are made of separate, neutral molecules. They have low melting points, and they do not conduct.' },
        { say: 'Metals are metal ions in a sea of moving electrons, so they conduct even as solids, and can be bent or hammered into shape.' },
        { say: 'Acids, in the next lesson, are the exception among molecular compounds: they form ions in water, so their solutions conduct.' },
      ],
    },
    {
      chapter: 'Which kind of substance?',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'A white solid melts at $770\\ ^{\\circ}\\text{C}$. It does not conduct as a solid, but its solution in water does. What kind of substance is it?' },
        { kind: 'bullets', id: 'b', items: ['Conducts as a solid? No, so it is **not a metal**.', 'High melting point, and its solution conducts, so it is **not molecular**.', 'Ions fixed in the solid, free to move in water: an **ionic compound**.'] },
      ],
      lines: [
        { say: 'A white solid melts at 770 degrees Celsius. It does not conduct as a solid, but its solution in water does. What kind of substance is it?', show: 'q' },
        { say: 'A metal would conduct as a solid, so it is not a metal.', show: 'b.0', focus: 'b.0' },
        { say: 'A molecular compound would melt at a low temperature, and its solution would not conduct.', show: 'b.1', focus: 'b.1' },
        { say: 'So its ions are fixed in the solid, but free to move in water. It is an ionic compound.', show: 'b.2', focus: 'b.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Potassium bromide, $\\ce{KBr}$, is an ionic compound. Which property would you expect it to have?',
          choices: ['It conducts electricity as a solid.', 'It conducts electricity when melted or dissolved in water.', 'It is soft and melts at a low temperature.', 'It bends instead of shattering when struck.'],
          answer: 1,
          working: 'Its ions are fixed in the solid lattice, but free to move when it is melted or dissolved, so only then does it conduct.',
        },
      ],
      lines: [
        { say: 'Your turn. Potassium bromide is an ionic compound. Which property would you expect it to have? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Its ions are locked in place in the solid, but free to move when it is melted or dissolved. Choice A describes a metal, and Choice D does too.', show: 'q.answer' },
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
            'Strong attractions between ions give **high melting points**.',
            'Ionic crystals are **hard but brittle**: a blow brings like charges face to face.',
            'They conduct only when **melted or dissolved**, when the ions can move.',
            'Metals conduct as solids; molecular compounds melt low and do not conduct.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Strong attractions between ions give ionic compounds high melting points.', show: 'sum.0' },
        { say: 'They are hard but brittle, because a blow brings ions of the same charge face to face.', show: 'sum.1' },
        { say: 'They conduct only when melted or dissolved, when the ions are free to move.', show: 'sum.2' },
        { say: 'And metals conduct as solids, while molecular compounds melt at low temperatures and do not conduct. That completes this lesson. Next, you will meet compounds whose atoms share electrons instead.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
