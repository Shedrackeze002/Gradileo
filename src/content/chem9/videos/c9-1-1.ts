import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c9-1-1',
  lessonId: 'c9-1-1',
  title: 'Inside the Atom',
  thumbnail: 'parts',
  summary:
    'An atom has a tiny, dense nucleus of protons and neutrons, with electrons in shells around it. Equal numbers of protons and electrons make an atom neutral. Models of the atom changed with evidence, and the gold foil experiment showed that an atom is mostly empty space around a small positive nucleus.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Atomic Structure', title: 'Inside the Atom', subtitle: 'Protons, neutrons, electrons, and how we found them' }],
      lines: [
        { say: 'In Grade 8 you met atoms as the smallest particles of an element. But atoms are not solid little balls.', show: 'title' },
        { say: 'In this video, you will meet the three particles inside every atom, and see how scientists worked out the structure of something far too small to see.' },
      ],
    },
    {
      chapter: 'Three particles',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'parts',
          head: ['Particle', 'Relative charge', 'Relative mass', 'Where it is'],
          rows: [
            ['proton', '+1', '1', 'nucleus'],
            ['neutron', '0', '1', 'nucleus'],
            ['electron', '−1', 'about $\\dfrac{1}{2000}$', 'shells'],
          ],
        },
        { kind: 'callout', id: 'neutral', tone: 'key', title: 'No overall charge', md: 'An atom has the **same number of protons and electrons**, so the charges cancel.' },
      ],
      lines: [
        { say: 'At the centre of every atom is a tiny, dense nucleus. It holds two kinds of particle.', show: 'parts' },
        { say: 'Protons have a charge of plus one and a mass of one.', show: 'parts.0', focus: 'parts.0' },
        { say: 'Neutrons have the same mass, one, but no charge at all. They are neutral, which is where the name comes from.', show: 'parts.1', focus: 'parts.1' },
        { say: 'Around the nucleus, electrons move in shells. Each has a charge of minus one, but a mass of only about one two-thousandth. So almost all the mass of an atom is in its nucleus.', show: 'parts.2', focus: 'parts.2' },
        { say: 'An atom has the same number of protons and electrons, so the plus and minus charges cancel, and the atom has no overall charge.', show: 'neutral' },
      ],
    },
    {
      chapter: 'How the model changed',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'models',
          head: ['Year', 'Scientist', 'Model'],
          rows: [
            ['about 1803', 'Dalton', 'solid spheres'],
            ['1897', 'Thomson', 'plum pudding'],
            ['1911', 'Rutherford', 'tiny positive nucleus'],
            ['1913', 'Bohr', 'electrons in shells'],
          ],
        },
        { kind: 'callout', id: 'foil', tone: 'definition', title: 'The gold foil experiment', md: 'Most alpha particles went **straight through** the gold; a very few **bounced back**.' },
      ],
      lines: [
        { say: 'Nobody can see inside an atom, so scientists build models, and change them when new evidence does not fit.', show: 'models' },
        { say: 'Around eighteen oh three, John Dalton pictured atoms as solid spheres that could not be divided.', show: 'models.0', focus: 'models.0' },
        { say: 'In eighteen ninety-seven, J. J. Thomson discovered the electron. His plum pudding model was a ball of positive charge with electrons scattered through it.', show: 'models.1', focus: 'models.1' },
        { say: 'Then Ernest Rutherford’s team fired positive alpha particles at very thin gold foil. Most went straight through, so most of an atom is empty space. But a very few bounced back.', show: 'foil' },
        { say: 'Only a tiny, dense, positive centre could throw an alpha particle back. So in nineteen eleven, Rutherford proposed the nucleus.', show: 'models.2', focus: 'models.2' },
        { say: 'In nineteen thirteen, Niels Bohr put the electrons in fixed shells, and in nineteen thirty-two, James Chadwick found the neutron.', show: 'models.3', focus: 'models.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In the gold foil experiment, what did the few alpha particles that bounced back show?',
          choices: ['electrons are negative', 'there is a tiny, dense, positive nucleus', 'atoms are solid spheres', 'neutrons have no charge'],
          answer: 1,
          working: 'Spread-out positive charge could only nudge an alpha particle. Throwing it back needs a small, dense, positive centre.',
        },
      ],
      lines: [
        { say: 'Your turn. In the gold foil experiment, what did the few alpha particles that bounced back show? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Charge spread thinly through the atom could only nudge a fast alpha particle. To throw it straight back, the positive charge must be packed into a tiny, dense nucleus.', show: 'q.answer' },
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
            'Protons (+1) and neutrons (0) are in the **nucleus**; electrons (−1) are in **shells**.',
            'Equal protons and electrons: no overall charge.',
            'Models changed with evidence: Dalton, Thomson, Rutherford, Bohr.',
            'Gold foil: mostly empty space, with a tiny positive nucleus.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Protons and neutrons sit in the nucleus, and electrons move in shells around it.', show: 'sum.0' },
        { say: 'An atom has equal numbers of protons and electrons, so it has no overall charge.', show: 'sum.1' },
        { say: 'The model of the atom changed as new evidence arrived, from Dalton’s spheres to Bohr’s shells.', show: 'sum.2' },
        { say: 'And the gold foil experiment showed that an atom is mostly empty space, with a tiny positive nucleus. Next, you will learn to count the particles in any atom.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
