import type { Explainer } from '@/video/script.ts';
import { goldFoilShots } from '../../chem9/videos/lib/c9-scatter.ts';

const video: Explainer = {
  id: 'c10-2-1-b',
  lessonId: 'c10-2-1',
  title: 'Inside the Atom, Part 2: Mostly Empty Space',
  thumbnailTitle: 'Mostly Empty Space',
  thumbnail: 'foil',
  summary:
    'In the gold foil experiment almost all the particles passed straight through, showing that an atom is mostly empty space around a tiny, positive nucleus about 100 000 times smaller across than the atom. A neutral atom has as many electrons as protons, so its charges cancel; neutrons have no charge.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Atoms and the Periodic Table · Part 2', title: 'Mostly Empty Space', subtitle: 'The nucleus and the charges' }],
      lines: [
        { say: 'In part one, you met the three particles in an atom. But how do we know that the nucleus is so tiny?', show: 'title' },
        { say: 'In this part, you will see the experiment that showed it, and find out why an atom has no overall charge.' },
      ],
    },
    {
      chapter: 'The gold foil experiment',
      layout: 'center',
      main: [goldFoilShots('foil')],
      lines: [
        {
          say: 'In nineteen oh nine, a team working with Ernest Rutherford fired tiny, fast-moving positive particles at a sheet of gold foil, far thinner than a human hair.',
          caption: 'In 1909, a team working with Ernest Rutherford fired tiny, fast-moving positive particles at a sheet of gold foil, far thinner than a human hair.',
          show: ['foil', 'foil.labels'],
        },
        { say: 'Let’s fire them, one at a time. Almost all of the particles pass straight through, as if the foil were not there.', play: 'foil.first', show: 'foil.count' },
        { say: 'Keep firing. A few are pushed off course. And a very few bounce almost straight back.', play: 'foil.rest' },
        {
          say: 'Rutherford explained this in nineteen eleven. Each atom has a tiny, heavy, positive nucleus, with a great deal of empty space around it. Only particles that came close to a nucleus were pushed away by its positive charge.',
          caption: 'Rutherford explained this in 1911. Each atom has a tiny, heavy, positive nucleus, with a great deal of empty space around it. Only particles that came close to a nucleus were pushed away by its positive charge.',
          show: 'foil.atoms',
        },
      ],
    },
    {
      chapter: 'A pea in a stadium',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'The nucleus is tiny', md: 'The nucleus is about $100\\,000$ times smaller across than the whole atom.' },
        { kind: 'text', id: 'pea', size: 'lg', align: 'center', md: 'If an atom were a sports stadium, its nucleus would be a **pea** on the centre spot.' },
        { kind: 'callout', id: 'shells', tone: 'definition', title: 'Shells', md: 'Electrons move in **shells**, also called **energy levels**, at different distances from the nucleus.' },
      ],
      lines: [
        { say: 'The nucleus really is tiny. It is about one hundred thousand times smaller across than the whole atom.', show: 'key' },
        { say: 'If an atom were the size of a sports stadium, its nucleus would be about the size of a pea on the centre spot. The electrons would move through the stands, and the space above them.', show: 'pea' },
        { say: 'They are not scattered at random. Electrons move in shells, also called energy levels, at different distances from the nucleus.', show: 'shells' },
      ],
    },
    {
      chapter: 'Why an atom has no charge',
      layout: 'split',
      leftWidth: 600,
      left: [
        {
          kind: 'atoms',
          id: 'atom',
          span: [6, 5],
          atoms: [{ id: 'li', symbol: 'Li', protons: 3, electrons: 0, at: [3, 2.5], tone: 'opp', name: 'lithium' }],
          clips: { fill: { phases: [{ dur: 0.5 }, { dur: 3.5, fill: { li: 3 } }, { dur: 1 }] } },
          poster: 'fill',
          height: 460,
        },
      ],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['\\text{nucleus: } 3 \\times (+1) = \\opp{+3}', '\\text{electrons: } 3 \\times (-1) = \\adj{-3}', '\\text{atom: } (+3) + (-3) = 0'],
        },
      ],
      lines: [
        { say: 'The nucleus is positive, but an atom as a whole is neutral: it has no overall charge. Why?' },
        { say: 'Take the lithium atom again: three protons and four neutrons in its nucleus. On its own, the nucleus has a charge.', show: ['atom', 'atom.labels', 'atom.charges'] },
        { say: 'The three protons give plus three, and the neutrons add nothing. So the nucleus has a charge of plus three.', show: 'm.0', focus: 'm.0' },
        { say: 'Now add the electrons, one at a time. Each one brings minus one, and three of them give minus three.', show: 'm.1', play: 'atom.fill', focus: 'm.1' },
        { say: 'Plus three and minus three make zero. A neutral atom has exactly as many electrons as protons, so the charges cancel.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Neutrons do not cancel the charge',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Neutrons do not cancel the charge', md: 'Neutrons have **no charge** at all. It is the **electrons** that balance the charge of the protons.' },
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['\\text{3 protons and 4 neutrons: } (+3) + 0 = +3', '\\text{3 protons and 3 electrons: } (+3) + (-3) = 0 \\ \\good{\\checkmark}'],
        },
      ],
      lines: [
        { say: 'It is tempting to think the neutrons balance the protons, because they sit beside them in the nucleus.', show: 'oops' },
        { say: 'They cannot. Neutrons have no charge, so lithium’s protons and neutrons together still make plus three.', show: 'm.0', focus: 'm.0' },
        { say: 'It is the electrons that balance the protons, and bring the total to zero.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The nucleus of an atom of fluorine contains $9$ protons and $10$ neutrons. What is the relative charge of the nucleus?',
          choices: ['$+19$', '$0$', '$+9$', '$-9$'],
          answer: 2,
          working: 'The $9$ protons give $9 \\times (+1) = +9$. The $10$ neutrons have no charge, so they add nothing. The nucleus has a relative charge of $+9$.',
        },
      ],
      lines: [
        { say: 'Your turn. The nucleus of an atom of fluorine contains nine protons and ten neutrons. What is the relative charge of the nucleus? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, plus nine. Each proton is plus one, and neutrons have no charge. Choice B, zero, is the charge of the whole atom with its electrons, not of the nucleus.', show: 'q.answer' },
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
            'Most particles passed straight through gold foil: an atom is mostly **empty space** around a tiny, positive nucleus.',
            'The nucleus is about $100\\,000$ times smaller across than the atom.',
            'A neutral atom has as many electrons as protons, so its charges cancel. Neutrons have no charge.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Most particles passed straight through gold foil, so an atom is mostly empty space around a tiny, positive nucleus.', show: 'sum.0' },
        { say: 'The nucleus is about one hundred thousand times smaller across than the whole atom.', show: 'sum.1' },
        { say: 'And a neutral atom has as many electrons as protons, so its charges cancel. In part three, you will count the particles in an atom. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
