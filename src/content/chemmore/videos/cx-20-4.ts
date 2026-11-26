import type { Explainer } from '@/video/script.ts';
import { ozoneResonance } from './lib/cx-ap.ts';

const video: Explainer = {
  id: 'cx-20-4',
  lessonId: 'cx-20-4',
  title: 'Resonance and Formal Charge',
  thumbnail: 'oz',
  summary:
    'Formal charge is valence electrons minus lone pair electrons minus bonds, and the charges in a structure add up to its overall charge. The best Lewis structure keeps formal charges near zero, with any negative charge on the most electronegative atom. When a molecule can be drawn in several structures that differ only in where the electrons are, the real molecule is their average, with delocalised electrons, and each bond order is the average number of bonds.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'AP Chemistry', title: 'Resonance and Formal Charge', subtitle: 'Choosing between Lewis structures' }],
      lines: [
        { say: 'For many molecules you can draw more than one reasonable Lewis structure. Chemists need a way to choose the best one, and a way to describe molecules such as ozone, where no single structure is right.', show: 'title' },
        { say: 'In this lesson, you will calculate formal charges, and describe molecules with resonance.' },
      ],
    },
    {
      chapter: 'Formal charge',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Formal charge', md: 'valence electrons − lone pair electrons − bonds' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\ce{C#O}:\\quad \\text{C} = 4 - 2 - 3 = -1', '\\text{O} = 6 - 2 - 3 = +1'] },
      ],
      lines: [
        { say: 'The formal charge on an atom is its valence electrons, minus its lone pair electrons, minus its bonds. A double bond counts as two, and a triple bond as three.', show: 'def' },
        { say: 'In carbon monoxide, carbon has one lone pair and three bonds. Four minus two minus three is negative one.', caption: 'In carbon monoxide, carbon has one lone pair and three bonds: 4 − 2 − 3 = −1.', show: 'm.0', focus: 'm.0' },
        { say: 'Oxygen also has one lone pair and three bonds. Six minus two minus three is positive one. The charges add up to zero, as they must for a neutral molecule.', caption: 'Oxygen also has one lone pair and three bonds: 6 − 2 − 3 = +1. The charges add up to zero, as they must for a neutral molecule.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'The best structure',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['Formal charges as close to zero as possible', 'Any negative charge on the most electronegative atom'] }],
      lines: [
        { say: 'When several structures are possible, the best one usually has formal charges as close to zero as possible.', show: 'b.0' },
        { say: 'And it puts any negative formal charge on the most electronegative atom, which holds the extra electron best.', show: 'b.1' },
      ],
    },
    {
      chapter: 'Ozone, up close',
      layout: 'center',
      main: [ozoneResonance('oz')],
      lines: [
        { say: 'Here is ozone, O three, with one double bond and one single bond. The middle oxygen has a formal charge of plus one, and the singly bonded oxygen has minus one.', caption: 'Here is ozone, O₃, with one double bond and one single bond. The middle oxygen has a formal charge of +1, and the singly bonded oxygen has −1.', show: 'oz' },
        { say: 'Watch the curly arrows. A lone pair on the right moves in to make a new double bond, while the old double bond on the left becomes a lone pair.', play: 'oz.flip' },
        { say: 'Now the double bond is on the other side, and the negative charge has moved with it. It can move back just as easily.', play: 'oz.back' },
      ],
    },
    {
      chapter: 'Resonance',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Resonance', md: 'When a molecule can be drawn in two or more Lewis structures that differ only in where the electrons are, the real molecule is an **average** of them, with its electrons **delocalised**.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{bond order in } \\ce{O3} = \\dfrac{2 + 1}{2} = 1.5', '\\text{bond order in } \\ce{NO3-} = \\dfrac{2 + 1 + 1}{3} = 1.33'] },
      ],
      lines: [
        { say: 'Experiments show that both bonds in ozone are the same length, between a single and a double bond. The real molecule does not flip between the two structures. It is always their average, with the electrons spread over both bonds.', show: 'def' },
        { say: 'So each bond in ozone has a bond order of one and a half.', caption: 'So each bond in ozone has a bond order of 1.5.', show: 'm.0', focus: 'm.0' },
        { say: 'The nitrate ion has three resonance structures, so each of its bonds has an order of four thirds, about one point three three.', caption: 'The nitrate ion has three resonance structures, so each of its bonds has an order of 4/3, about 1.33.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What is the formal charge on a nitrogen atom with four bonds and no lone pairs, as in the ammonium ion? (N has 5 valence electrons.)',
          choices: ['−1', '0', '+4', '+1'],
          answer: 3,
          working: 'Formal charge $= 5 - 0 - 4 = +1$.',
        },
      ],
      lines: [
        { say: 'Your turn. In the ammonium ion, nitrogen has four bonds and no lone pairs. Nitrogen has five valence electrons. What is its formal charge? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, plus one. Five, minus no lone pair electrons, minus four bonds, is one. That is why ammonium carries a positive charge.', caption: 'The answer is D, +1. Five, minus no lone pair electrons, minus four bonds, is 1. That is why ammonium carries a positive charge.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Formal charge = valence − lone pair electrons − bonds.', 'Best structure: charges near zero, negative on the most electronegative atom.', 'Resonance: the real molecule is the average of its structures.', 'Bond order = the average number of bonds.'] }],
      lines: [
        { say: 'Let’s sum up. Formal charge is valence electrons, minus lone pair electrons, minus bonds.', show: 'sum.0' },
        { say: 'The best structure keeps charges near zero, with any negative charge on the most electronegative atom.', show: 'sum.1' },
        { say: 'With resonance, the real molecule is the average of its structures, with delocalised electrons.', show: 'sum.2' },
        { say: 'And the bond order is the average number of bonds across the structures.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
