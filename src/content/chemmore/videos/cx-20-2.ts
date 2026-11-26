import type { Explainer, PhotonsEl } from '@/video/script.ts';
import { fillRow } from '../../chem10/videos/lib/c10-atoms.ts';

// The photons are true to their numbers (src/video/photons.ts): ultraviolet light of 250 nm
// carries 4.97 eV, so on sodium (work function 2.36 eV) each photon frees an electron with up to
// 2.61 eV left over. Photoelectron spectroscopy uses the same balance on single atoms.

const group1 = fillRow(
  'g1',
  [
    ['li', 'Li', 3, 'lithium', 'opp'],
    ['na', 'Na', 11, 'sodium', 'opp'],
    ['k', 'K', 19, 'potassium', 'opp'],
  ],
  { gap: 4.6, each: 1.6, height: 400 },
);

const knockOut: PhotonsEl = {
  kind: 'photons',
  id: 'pe',
  nm: 250,
  rate: 3,
  metal: { name: 'Sodium', work: 2.36 },
  height: 400,
  clips: { a: { phases: [{ dur: 11.5 }] }, b: { phases: [{ dur: 12.5 }] }, c: { phases: [{ dur: 9.5 }] } },
  poster: 'b',
  thumb: ['names', 'bars'],
};

const video: Explainer = {
  id: 'cx-20-2',
  lessonId: 'cx-20-2',
  title: 'Coulomb’s Law and Photoelectron Spectroscopy',
  thumbnail: 'pe',
  summary:
    'The attraction between the nucleus and an electron follows Coulomb’s law: it grows with the charges and falls with the square of the distance. That explains why ionisation energy falls down a group and rises across a period. In photoelectron spectroscopy, photons knock electrons out of atoms; each occupied subshell gives a peak, its height counts the electrons, and peaks farther left are bound more strongly.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'AP Chemistry', title: 'Coulomb’s Law and Photoelectron Spectroscopy', subtitle: 'Seeing the pull of the nucleus' }],
      lines: [
        { say: 'Every trend in the periodic table, from the size of atoms to how easily they lose electrons, comes from one law of attraction between charges.', show: 'title' },
        { say: 'In this lesson, you will use Coulomb’s law to explain ionisation energies, and read photoelectron spectra to find an atom’s electron configuration.' },
      ],
    },
    {
      chapter: 'Coulomb’s law',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['F \\propto \\dfrac{q_1 q_2}{r^2}'] },
        { kind: 'bullets', id: 'b', items: ['More charge: a stronger pull', 'Twice as far: a quarter of the pull'] },
      ],
      lines: [
        { say: 'The force between two charges is proportional to the product of the charges, and inversely proportional to the square of the distance between them.', show: 'm' },
        { say: 'So the nucleus pulls harder on an electron when it has more protons.', show: 'b.0' },
        { say: 'And the pull falls quickly with distance. Twice as far away, the force is only a quarter as strong.', show: 'b.1' },
      ],
    },
    {
      chapter: 'Down a group, up close',
      layout: 'center',
      main: [group1],
      lines: [
        { say: 'Here are lithium, sodium and potassium, the first three alkali metals. Watch their electrons fill the shells.', show: ['g1', 'g1.labels'], play: 'g1.fill' },
        { say: 'Each has one outer electron, but each one is in a shell farther from the nucleus, with more inner shells shielding it.', show: 'g1.arrangement' },
        { say: 'So by Coulomb’s law, the outer electron is held less and less strongly going down the group, and the first ionisation energy falls. Across a period, the nuclear charge rises while the shell stays the same, so it rises.', focus: 'g1.k' },
      ],
    },
    {
      chapter: 'Knocking electrons out',
      layout: 'center',
      main: [knockOut],
      lines: [
        { say: 'Photoelectron spectroscopy measures how strongly each electron is held. Here, ultraviolet photons land on sodium, and each one knocks out an electron.', show: ['pe', 'pe.names', 'pe.values'], play: 'pe.a' },
        { say: 'Each photon’s energy pays to free the electron, and whatever is left over becomes its kinetic energy. So the binding energy is the photon energy minus the kinetic energy.', show: 'pe.bars', play: 'pe.b' },
        { say: 'In P E S, a beam of known energy hits single atoms, and measuring the electrons’ speeds gives the binding energy of each electron.', caption: 'In PES, a beam of known energy hits single atoms, and measuring the electrons’ speeds gives the binding energy of each electron.', play: 'pe.c' },
      ],
    },
    {
      chapter: 'Reading a spectrum',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'A photoelectron spectrum', md: 'Each **peak** is one occupied subshell. Its **height** counts the electrons in it. Peaks farther **left** have a higher binding energy: those electrons are closer to the nucleus.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{peaks } 2,\\ 2,\\ 6,\\ 1 \\;\\to\\; \\mathrm{1s^2\\,2s^2\\,2p^6\\,3s^1}', '2 + 2 + 6 + 1 = 11 \\;\\to\\; \\text{sodium}'] },
      ],
      lines: [
        { say: 'Electrons in the same subshell have the same binding energy, so each occupied subshell gives one peak. The height of a peak counts its electrons, and peaks farther to the left are held more strongly.', show: 'def' },
        { say: 'A spectrum with peaks of two, two, six and one electrons is one s two, two s two, two p six, three s one.', caption: 'A spectrum with peaks of 2, 2, 6 and 1 electrons is 1s² 2s² 2p⁶ 3s¹.', show: 'm.0', focus: 'm.0' },
        { say: 'That adds up to eleven electrons, so the element is sodium. Its small peak on the right is the single outer electron that sodium loses so easily.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'How many peaks does the photoelectron spectrum of magnesium ($1s^2\\,2s^2\\,2p^6\\,3s^2$) have?',
          choices: ['2', '3', '4', '12'],
          answer: 2,
          working: 'Each occupied subshell gives one peak: 1s, 2s, 2p and 3s, so 4 peaks.',
        },
      ],
      lines: [
        { say: 'Your turn. Magnesium is one s two, two s two, two p six, three s two. How many peaks does its photoelectron spectrum have? Pause the video and try it.', caption: 'Your turn. Magnesium is 1s² 2s² 2p⁶ 3s². How many peaks does its photoelectron spectrum have? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, four. There is one peak for each occupied subshell: one s, two s, two p and three s.', caption: 'The answer is C, 4. There is one peak for each occupied subshell: 1s, 2s, 2p and 3s.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Coulomb’s law: F ∝ q₁q₂ ÷ r².', 'Ionisation energy falls down a group and rises across a period.', 'In PES, each peak is a subshell and its height counts the electrons.', 'Peaks farther left are held more strongly.'] }],
      lines: [
        { say: 'Let’s sum up. Coulomb’s law says the force grows with the charges and falls with the square of the distance.', show: 'sum.0' },
        { say: 'So ionisation energy falls down a group and rises across a period.', show: 'sum.1' },
        { say: 'In a photoelectron spectrum, each peak is a subshell, and its height counts the electrons.', show: 'sum.2' },
        { say: 'And peaks farther to the left are held more strongly, closer to the nucleus.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
