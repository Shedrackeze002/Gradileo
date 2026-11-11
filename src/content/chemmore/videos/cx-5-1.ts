import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'cx-5-1',
  lessonId: 'cx-5-1',
  title: 'The Development of the Atom and the Periodic Table',
  thumbnail: false,
  summary:
    'The model of the atom changed as new evidence arrived: Dalton’s solid spheres, Thomson’s plum pudding, Rutherford’s nuclear model from alpha particle scattering, Bohr’s electron shells and Chadwick’s neutron. Mendeleev ordered the elements by properties, swapping some and leaving gaps; isotopes later explained why atomic number, not atomic weight, gives the right order.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Atoms, Structures and the Periodic Table', title: 'The Development of the Atom and the Periodic Table', subtitle: 'How evidence changed the models' }],
      lines: [
        { say: 'Nobody has ever looked inside an atom the way you look at a chair. Everything we know about it came from experiments, and each surprising result changed the picture.', show: 'title' },
        { say: 'In this lesson, you will see how the model of the atom developed, and how Mendeleev built the periodic table.' },
      ],
    },
    {
      chapter: 'Models of the atom',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Scientific model', md: 'A simplified picture that explains the evidence. When new evidence does not fit, the model is **changed or replaced**.' },
        { kind: 'table', id: 't', head: ['Scientist', 'Model'], rows: [['Dalton', 'Tiny solid spheres that cannot be divided'], ['Thomson', 'The electron; the plum pudding model'], ['Rutherford', 'A tiny, positive nucleus with mostly empty space'], ['Bohr', 'Electrons in shells at fixed distances'], ['Chadwick', 'The neutron, in the nucleus']] },
      ],
      lines: [
        { say: 'A scientific model is a simplified picture that explains the evidence. When new evidence does not fit, the model changes.', show: 'def' },
        { say: 'In the early eighteen hundreds, John Dalton pictured atoms as tiny solid spheres that could not be divided.', caption: 'In the early 1800s, John Dalton pictured atoms as tiny solid spheres that could not be divided.', show: 't.0', focus: 't.0' },
        { say: 'Then J. J. Thomson discovered the electron. Atoms could be divided, so he proposed the plum pudding model: a ball of positive charge with electrons embedded in it.', show: 't.1', focus: 't.1' },
        { say: 'Rutherford’s experiment led to the nuclear model, Bohr placed the electrons in shells, and Chadwick discovered the neutron.', show: ['t.2', 't.3', 't.4'], focus: ['t.2', 't.3', 't.4'] },
      ],
    },
    {
      chapter: 'Alpha particle scattering',
      layout: 'center',
      main: [{ kind: 'table', id: 't', head: ['What they saw', 'What it showed'], rows: [['Most passed straight through', 'Most of the atom is empty space'], ['A few were deflected', 'The centre is positively charged'], ['A very few bounced back', 'Mass and charge are in a tiny nucleus']] }],
      lines: [
        { say: 'Rutherford’s team fired positive alpha particles at very thin gold foil. Most passed straight through, so most of the atom is empty space.', show: 't.0', focus: 't.0' },
        { say: 'A few were deflected, so the centre must be positively charged.', show: 't.1', focus: 't.1' },
        { say: 'And a very few bounced straight back. Only something tiny, dense and charged could do that, so the mass and positive charge must be in a tiny nucleus. The plum pudding model could not explain this, so it was replaced.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Mendeleev’s periodic table',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['Early tables followed atomic weight strictly, and the pattern broke down', 'Mendeleev swapped some elements to keep similar ones together', 'He left gaps for undiscovered elements and predicted their properties', 'Isotopes later explained his swaps: the order is atomic number'] }],
      lines: [
        { say: 'Early periodic tables listed the elements strictly by atomic weight, which put some elements in groups with very different elements.', show: 'b.0' },
        { say: 'In eighteen sixty-nine, Dmitri Mendeleev swapped some pairs, so that each element sat with elements of similar properties.', caption: 'In 1869, Dmitri Mendeleev swapped some pairs, so that each element sat with elements of similar properties.', show: 'b.1' },
        { say: 'He also left gaps, and predicted the properties of the missing elements. When gallium and germanium were found, they matched.', show: 'b.2' },
        { say: 'Later, the discovery of isotopes explained the swaps. Atomic weight depends on the mix of isotopes, so the true order is atomic number, the number of protons.', show: 'b.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In the scattering experiment, a very few alpha particles bounced back from the gold foil. What did this show?',
          choices: ['Most of the atom is empty space', 'The mass is concentrated in a tiny, charged nucleus', 'Atoms cannot be divided', 'Electrons orbit in shells'],
          answer: 1,
          working: 'Only something small, dense and charged could turn an alpha particle back.',
        },
      ],
      lines: [
        { say: 'Your turn. In the scattering experiment, a very few alpha particles bounced back from the gold foil. What did this show? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Only a tiny, dense, charged nucleus could turn an alpha particle back. Choice A is what the particles that passed straight through showed.', show: 'q.answer' },
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
          items: ['Dalton, Thomson, Rutherford, Bohr, Chadwick: each changed the model.', 'Alpha scattering showed a tiny, dense, positive nucleus.', 'Mendeleev swapped elements and left gaps for undiscovered ones.', 'The modern table is in order of atomic number.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Dalton, Thomson, Rutherford, Bohr and Chadwick each changed the model of the atom, as new evidence arrived.', show: 'sum.0' },
        { say: 'Alpha particle scattering showed a tiny, dense, positive nucleus.', show: 'sum.1' },
        { say: 'Mendeleev swapped some elements and left gaps for ones not yet discovered.', show: 'sum.2' },
        { say: 'And the modern periodic table is in order of atomic number.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
