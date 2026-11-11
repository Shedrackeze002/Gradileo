import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'cx-7-2',
  lessonId: 'cx-7-2',
  title: 'Electron Configurations and Ionisation Energies',
  thumbnail: false,
  summary:
    'Shells are split into s, p and d sub-shells, which fill in order of energy, with 4s before 3d. Chromium and copper break the pattern, and d-block atoms lose their 4s electrons first. Ionisation energies fall down a group and rise across a period, with dips that are evidence for sub-shells, and big jumps in successive ionisation energies show a new shell.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'A Level Atoms and Physical Chemistry', title: 'Electron Configurations', subtitle: 'Shells, sub-shells and ionisation energies' }],
      lines: [
        { say: 'At GCSE, electrons sit in shells of two, eight and eight. But that cannot explain why iron forms two different ions. For that, each shell has to be split into sub-shells.', show: 'title' },
        { say: 'In this lesson, you will write electron configurations, and use ionisation energies as evidence for them.' },
      ],
    },
    {
      chapter: 'Sub-shells',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Sub-shell', 'Orbitals', 'Electrons'], rows: [['s', '1', '2'], ['p', '3', '6'], ['d', '5', '10']] },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\mathrm{1s \\to 2s \\to 2p \\to 3s \\to 3p \\to 4s \\to 3d}', '\\text{S: } \\mathrm{1s^2\\,2s^2\\,2p^6\\,3s^2\\,3p^4}'] },
      ],
      lines: [
        { say: 'Each orbital holds two electrons. An s sub-shell has one orbital, a p sub-shell three, and a d sub-shell five.', show: 't', focus: 't' },
        { say: 'Sub-shells fill in order of energy. Notice that four s fills before three d.', show: 'm.0', focus: 'm.0' },
        { say: 'So sulfur, with sixteen electrons, is one s two, two s two, two p six, three s two, three p four.', caption: 'So sulfur, with 16 electrons, is 1s² 2s² 2p⁶ 3s² 3p⁴.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'The d-block',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['Iron: $\\mathrm{[Ar]\\,3d^6\\,4s^2}$', 'Chromium: $\\mathrm{[Ar]\\,3d^5\\,4s^1}$', 'Copper: $\\mathrm{[Ar]\\,3d^{10}\\,4s^1}$', '$\\ce{Fe^3+}$: $\\mathrm{[Ar]\\,3d^5}$, since 4s empties first'] },
      ],
      lines: [
        { say: 'Iron is the argon core, then three d six, four s two.', caption: 'Iron is the argon core, then 3d⁶ 4s².', show: 'b.0' },
        { say: 'Chromium and copper break the pattern. Each moves one electron from four s into three d, to make a half-full or full d sub-shell.', show: ['b.1', 'b.2'] },
        { say: 'When these atoms form ions, the four s electrons go first. So iron three plus is argon, three d five.', caption: 'When these atoms form ions, the 4s electrons go first. So Fe³⁺ is [Ar] 3d⁵.', show: 'b.3' },
      ],
    },
    {
      chapter: 'Ionisation energies',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['Down a group: falls (further away, more shielding)', 'Across a period: rises (more nuclear charge)', 'Dip at aluminium: its electron is in 3p', 'Dip at sulfur: paired 3p electrons repel'] },
      ],
      lines: [
        { say: 'The first ionisation energy is the energy to remove one mole of electrons from one mole of gaseous atoms.' },
        { say: 'Down a group it falls, because the outer electron is further from the nucleus and more shielded.', show: 'b.0' },
        { say: 'Across a period it rises, because the nuclear charge grows while the shielding stays about the same.', show: 'b.1' },
        { say: 'There are two dips across Period three. Aluminium’s outer electron is in a higher-energy p sub-shell, and in sulfur, two electrons share a p orbital and repel each other. Both are evidence for sub-shells.', caption: 'There are two dips across Period 3. Aluminium’s outer electron is in a higher-energy p sub-shell, and in sulfur, two electrons share a p orbital and repel each other. Both are evidence for sub-shells.', show: ['b.2', 'b.3'] },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [{ kind: 'callout', id: 'm', tone: 'mistake', title: '4s in first, 4s out first', md: '$\\ce{Fe^2+}$ is $\\mathrm{[Ar]\\,3d^6}$, not $\\mathrm{[Ar]\\,3d^4\\,4s^2}$.' }],
      lines: [{ say: 'A common mistake is to remove the three d electrons first. Four s fills first and empties first, so iron two plus is argon, three d six.', caption: 'A common mistake is to remove the 3d electrons first. 4s fills first and empties first, so Fe²⁺ is [Ar] 3d⁶.', show: 'm' }],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The first five ionisation energies of an element, in kJ mol⁻¹, are 578, 1817, 2745, 11 577 and 14 842. Which group is it in?',
          choices: ['Group 1', 'Group 2', 'Group 4', 'Group 3'],
          answer: 3,
          working: 'The big jump comes after the **third** electron, so there are three outer electrons: Group 3 (aluminium).',
        },
      ],
      lines: [
        { say: 'Your turn. The first five ionisation energies of an element, in kilojoules per mole, are five hundred seventy-eight, eighteen hundred seventeen, twenty-seven hundred forty-five, eleven thousand five hundred seventy-seven, and fourteen thousand eight hundred forty-two. Which group is it in? Pause the video and try it.', caption: 'Your turn. The first five ionisation energies of an element, in kJ mol⁻¹, are 578, 1817, 2745, 11 577 and 14 842. Which group is it in? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, Group three. The big jump comes after the third electron, so there are three outer electrons.', caption: 'The answer is D, Group 3. The big jump comes after the third electron, so there are three outer electrons.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['s holds 2, p holds 6, d holds 10; 4s fills before 3d.', 'Chromium and copper have one 4s electron.', 'd-block atoms lose 4s electrons first.', 'A big jump in ionisation energies shows a new shell.'] }],
      lines: [
        { say: 'Let’s sum up. s sub-shells hold two electrons, p six and d ten, and four s fills before three d.', caption: 'Let’s sum up. s sub-shells hold 2 electrons, p 6 and d 10, and 4s fills before 3d.', show: 'sum.0' },
        { say: 'Chromium and copper have only one four s electron.', caption: 'Chromium and copper have only one 4s electron.', show: 'sum.1' },
        { say: 'd-block atoms lose their four s electrons first.', caption: 'd-block atoms lose their 4s electrons first.', show: 'sum.2' },
        { say: 'And a big jump in successive ionisation energies shows an electron being taken from a new, inner shell.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
