import type { Explainer } from '@/video/script.ts';
import { fillRow } from '../../chem10/videos/lib/c10-atoms.ts';

const video: Explainer = {
  id: 'cx-13-3',
  lessonId: 'cx-13-3',
  title: 'Orbitals and the Rules for Filling Them',
  thumbnail: 'fr',
  summary:
    'Shell n has n sub-levels and holds 2n² electrons, and the s, p and d sub-levels have 1, 3 and 5 orbitals of two electrons each. Electrons fill the lowest energy orbitals first (Aufbau), two to an orbital with opposite spins (Pauli), and singly with parallel spins before pairing (Hund). Chromium is 3d⁵ 4s¹, copper is 3d¹⁰ 4s¹, and a transition metal ion loses its 4s electrons first.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Measurement, Chemical Laws and Orbitals', title: 'Orbitals and the Rules for Filling Them', subtitle: 'Where each electron goes' }],
      lines: [
        { say: 'Shells of two, eight and eight work well for the first twenty elements. But they cannot explain why iron forms two different ions.', show: 'title' },
        { say: 'In this lesson, you will write electron configurations with s, p and d orbitals, using three rules for filling them.' },
      ],
    },
    {
      chapter: 'Filling from the inside',
      layout: 'center',
      main: [
        fillRow('fr', [
          ['li', 'Li', 3, 'lithium', 'opp'],
          ['n', 'N', 7, 'nitrogen', 'adj'],
          ['o', 'O', 8, 'oxygen', 'bad'],
          ['na', 'Na', 11, 'sodium', 'brand'],
        ], { height: 360 }),
      ],
      lines: [
        { say: 'Here are four atoms with no electrons yet: lithium, nitrogen, oxygen and sodium.', show: ['fr', 'fr.labels'] },
        { say: 'Watch the electrons arrive. Each one goes into the lowest energy place still free, so the shell nearest the nucleus fills first, then the next.', play: 'fr.fill', show: 'fr.arrangement' },
        { say: 'This is the Aufbau principle: electrons fill the lowest energy levels first. Inside each shell, there are smaller levels called sub-levels and orbitals.', caption: 'This is the Aufbau principle: electrons fill the lowest energy levels first. Inside each shell, there are smaller levels called sub-levels and orbitals.' },
      ],
    },
    {
      chapter: 'Sub-levels and orbitals',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Orbital', md: 'A region round the nucleus where an electron is likely to be found. Each orbital holds **at most two** electrons.' },
        {
          kind: 'table',
          id: 't',
          head: ['Sub-level', 'Orbitals', 'Electrons'],
          rows: [['s', '1', '2'], ['p', '3', '6'], ['d', '5', '10']],
        },
        { kind: 'text', id: 'n', size: 'md', md: 'Shell $n$ has $n$ sub-levels and holds $2n^2$ electrons.' },
      ],
      lines: [
        { say: 'An orbital is a region round the nucleus where an electron is likely to be found, and each one holds at most two electrons.', show: 'def' },
        { say: 'An s sub-level has one orbital, so it holds two electrons. A p sub-level has three orbitals, holding six, and a d sub-level has five, holding ten.', show: 't', focus: 't' },
        { say: 'Shell number n has n sub-levels, and holds two n squared electrons. So the third shell has s, p and d, and holds eighteen.', show: 'n' },
      ],
    },
    {
      chapter: 'Three rules',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'r',
          items: [
            '**Aufbau:** lowest energy first: 1s, 2s, 2p, 3s, 3p, 4s, 3d.',
            '**Pauli:** at most two electrons in an orbital, with opposite spins.',
            '**Hund:** in a sub-level, fill orbitals singly with parallel spins before pairing.',
          ],
        },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{N, 2p: } [\\uparrow][\\uparrow][\\uparrow] \\qquad \\text{O, 2p: } [\\uparrow\\downarrow][\\uparrow][\\uparrow]'] },
      ],
      lines: [
        { say: 'The Aufbau order is one s, two s, two p, three s, three p, then four s before three d.', caption: 'The Aufbau order is 1s, 2s, 2p, 3s, 3p, then 4s before 3d.', show: 'r.0' },
        { say: 'The Pauli principle says an orbital holds at most two electrons, spinning in opposite directions.', show: 'r.1' },
        { say: 'And Hund’s rule says electrons in a sub-level spread out one to an orbital, with parallel spins, before any pair up.', show: 'r.2' },
        { say: 'So nitrogen’s three two p electrons sit one in each orbital. Oxygen’s fourth has to pair up.', caption: 'So nitrogen’s three 2p electrons sit one in each orbital. Oxygen’s fourth has to pair up.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'The configuration of iron',
      layout: 'center',
      main: [
        { kind: 'math', id: 'fe', size: 'md', lines: ['\\text{Fe } (26):\\ 1s^2\\,2s^2\\,2p^6\\,3s^2\\,3p^6\\,3d^6\\,4s^2', '\\text{Fe}^{3+}:\\ 1s^2\\,2s^2\\,2p^6\\,3s^2\\,3p^6\\,3d^5'] },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'The 4s electrons leave first', md: '4s fills before 3d, but a transition metal ion loses its **4s** electrons first. Chromium is $3d^5\\,4s^1$ and copper is $3d^{10}\\,4s^1$.' },
      ],
      lines: [
        { say: 'Iron has twenty-six electrons. The first eighteen fill up to three p, four s takes two more, and the last six go into three d.', caption: 'Iron has 26 electrons. The first 18 fill up to 3p, 4s takes two more, and the last six go into 3d.', show: 'fe.0' },
        { say: 'To make the iron three plus ion, iron loses both four s electrons first, then one three d electron. That leaves three d five.', caption: 'To make Fe³⁺, iron loses both 4s electrons first, then one 3d electron. That leaves 3d⁵.', show: 'fe.1', focus: 'fe.1' },
        { say: 'Here is a common mistake: taking the ion’s electrons from three d. Four s fills first, and it empties first too. And two elements break the order: chromium and copper take one electron from four s, because a half-full or full d sub-level is especially stable.', caption: 'Here is a common mistake: taking the ion’s electrons from 3d. 4s fills first, and it empties first too. And two elements break the order: chromium and copper take one electron from 4s, because a half-full or full d sub-level is especially stable.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A phosphorus atom ends in $3p^3$. How many unpaired electrons does it have?',
          choices: ['3', '1', '0', '5'],
          answer: 0,
          working: 'By Hund’s rule the three 3p electrons go one to each 3p orbital: $[\\uparrow][\\uparrow][\\uparrow]$, all unpaired.',
        },
      ],
      lines: [
        { say: 'Your turn. Phosphorus ends in three p three. How many unpaired electrons does a phosphorus atom have? Pause the video and try it.', caption: 'Your turn. Phosphorus ends in 3p³. How many unpaired electrons does a phosphorus atom have? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, three. By Hund’s rule, the three electrons go one to each of the three p orbitals, so none of them is paired.', caption: 'The answer is A, three. By Hund’s rule, the three electrons go one to each of the three 3p orbitals, so none of them is paired.', show: 'q.answer' },
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
            'Shell n has n sub-levels and holds 2n² electrons; s, p and d have 1, 3 and 5 orbitals.',
            'Aufbau: lowest energy first. Pauli: two per orbital, opposite spins.',
            'Hund: singly, with parallel spins, before pairing.',
            'Ions of transition metals lose their 4s electrons first.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Shell n has n sub-levels and holds two n squared electrons, and the s, p and d sub-levels have one, three and five orbitals.', show: 'sum.0' },
        { say: 'Electrons fill the lowest energy orbitals first, with at most two to an orbital, spinning in opposite directions.', show: 'sum.1' },
        { say: 'In a sub-level, they spread out singly with parallel spins before they pair.', show: 'sum.2' },
        { say: 'And a transition metal ion loses its four s electrons first.', caption: 'And a transition metal ion loses its 4s electrons first.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
