import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'cx-8-1',
  lessonId: 'cx-8-1',
  title: 'Periodicity: Trends Across Period 3',
  thumbnail: false,
  summary:
    'Across Period 3 the nuclear charge rises while the shielding stays the same, so atoms get smaller and first ionisation energy generally rises, with dips at aluminium and sulfur. Melting points follow structure: metallic sodium to aluminium rise, giant covalent silicon is highest, and simple molecular phosphorus, sulfur and chlorine are low, set by van der Waals forces.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'A Level Inorganic Chemistry', title: 'Trends Across Period 3', subtitle: 'From a soft metal to a green gas' }],
      lines: [
        { say: 'Walk along Period three, from sodium to argon, and the elements change completely: a soft metal, a hard grey solid, a yellow powder, a green gas. The pattern repeats in every period.', caption: 'Walk along Period 3, from sodium to argon, and the elements change completely: a soft metal, a hard grey solid, a yellow powder, a green gas. The pattern repeats in every period.', show: 'title' },
        { say: 'In this lesson, you will explain the trends in atomic radius, ionisation energy and melting point across Period three.', caption: 'In this lesson, you will explain the trends in atomic radius, ionisation energy and melting point across Period 3.' },
      ],
    },
    {
      chapter: 'Radius and ionisation energy',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['Nuclear charge rises; shielding stays the same', 'So atomic radius falls', 'So first ionisation energy generally rises', 'Dips at Al (3p electron) and S (paired 3p electrons)'] },
      ],
      lines: [
        { say: 'Across the period, each element has one more proton, but its outer electrons stay in the third shell, with the same inner electrons shielding them.', show: 'b.0' },
        { say: 'So the bigger nuclear charge pulls the outer electrons closer, and the atoms get smaller.', show: 'b.1' },
        { say: 'For the same reason, the first ionisation energy generally rises.', show: 'b.2' },
        { say: 'There are two small dips. Aluminium’s outer electron is in the three p sub-shell, and sulfur has two electrons paired in one orbital, which repel.', caption: 'There are two small dips. Aluminium’s outer electron is in the 3p sub-shell, and sulfur has two electrons paired in one orbital, which repel.', show: 'b.3' },
      ],
    },
    {
      chapter: 'Melting points',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Element', 'Structure', 'Melting point'], rows: [['Na, Mg, Al', 'metallic', 'rising: 98, 650, 660 °C'], ['Si', 'giant covalent', 'highest: 1414 °C'], ['P, S, Cl', 'simple molecular', 'low: 44, 115, −101 °C'], ['Ar', 'single atoms', 'lowest: −189 °C']] },
      ],
      lines: [
        { say: 'Melting points follow the structure of each element.' },
        { say: 'Sodium, magnesium and aluminium are metallic. Their ions get smaller and more charged, with more delocalised electrons, so the bonding gets stronger and the melting point rises.', show: 't.0', focus: 't.0' },
        { say: 'Silicon is giant covalent. Melting it breaks many strong covalent bonds, so it melts highest of all, at fourteen hundred fourteen degrees.', caption: 'Silicon is giant covalent. Melting it breaks many strong covalent bonds, so it melts highest of all, at 1414 °C.', show: 't.1', focus: 't.1' },
        { say: 'Phosphorus, sulfur and chlorine are simple molecules, held only by weak van der Waals forces. Sulfur’s rings of eight atoms are the biggest, so it melts highest of the three.', show: 't.2', focus: 't.2' },
        { say: 'And argon is single atoms, with the weakest forces of all.', show: 't.3', focus: 't.3' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [{ kind: 'callout', id: 'm', tone: 'mistake', title: 'No covalent bonds break', md: 'When sulfur melts, the S–S bonds inside each $\\ce{S8}$ ring stay intact. Only the weak forces **between** molecules are overcome.' }],
      lines: [{ say: 'A common mistake is to say that melting sulfur breaks covalent bonds. The bonds inside each ring stay intact. Only the weak forces between the molecules are overcome.', show: 'm' }],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which Period 3 element has the highest melting point, and why?',
          choices: ['Aluminium: it has the most delocalised electrons', 'Silicon: many strong covalent bonds must break', 'Sulfur: its $\\ce{S8}$ molecules are large', 'Argon: it has the most protons'],
          answer: 1,
          working: 'Silicon has a **giant covalent** structure, so melting it breaks many strong covalent bonds.',
        },
      ],
      lines: [
        { say: 'Your turn. Which Period three element has the highest melting point, and why? Pause the video and try it.', caption: 'Your turn. Which Period 3 element has the highest melting point, and why? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Silicon is giant covalent, so many strong covalent bonds must break before it melts.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Across Period 3, radius falls and ionisation energy rises.', 'Dips in ionisation energy at aluminium and sulfur.', 'Metallic melting points rise from Na to Al.', 'Silicon is highest; P, S and Cl are low.'] }],
      lines: [
        { say: 'Let’s sum up. Across Period three, the atomic radius falls and the first ionisation energy rises.', caption: 'Let’s sum up. Across Period 3, the atomic radius falls and the first ionisation energy rises.', show: 'sum.0' },
        { say: 'The ionisation energy dips at aluminium and at sulfur.', show: 'sum.1' },
        { say: 'Metallic melting points rise from sodium to aluminium.', show: 'sum.2' },
        { say: 'And giant covalent silicon melts highest, while the simple molecules melt low.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
