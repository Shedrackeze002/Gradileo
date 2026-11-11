import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'cx-9-1',
  lessonId: 'cx-9-1',
  title: 'Reaction Mechanisms with Curly Arrows',
  thumbnail: false,
  summary:
    'A mechanism shows which bonds break and form, with curly arrows for moving electron pairs. Nucleophiles donate electron pairs, electrophiles accept them, and radicals have an unpaired electron. The four first-year mechanisms are free-radical substitution, nucleophilic substitution, elimination and electrophilic addition, where the more stable carbocation gives the major product.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'A Level Organic Mechanisms and Analysis', title: 'Reaction Mechanisms', subtitle: 'Following the electrons' }],
      lines: [
        { say: 'An equation shows what goes in and what comes out. A mechanism tells the story in between: which bonds break, which form, and where the electrons go.', show: 'title' },
        { say: 'In this lesson, you will meet four mechanisms, and draw them with curly arrows.' },
      ],
    },
    {
      chapter: 'The cast',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Curly arrow', md: 'The movement of a **pair of electrons**, from a lone pair or a bond to an atom or a new bond.' },
        { kind: 'bullets', id: 'b', items: ['Nucleophile: an electron pair donor, such as $\\ce{OH-}$', 'Electrophile: an electron pair acceptor, such as $\\ce{H+}$', 'Free radical: an unpaired electron, such as $\\ce{Cl^.}$'] },
      ],
      lines: [
        { say: 'A curly arrow shows a pair of electrons moving. It starts at a lone pair or a bond, and points to where the pair goes.', show: 'def' },
        { say: 'A nucleophile donates an electron pair. It attacks a slightly positive carbon.', show: 'b.0' },
        { say: 'An electrophile accepts an electron pair. It is attacked by the electrons of a double bond.', show: 'b.1' },
        { say: 'And a free radical has an unpaired electron.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Four mechanisms',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Mechanism', 'Example'], rows: [['Free-radical substitution', 'methane + chlorine, in UV light'], ['Nucleophilic substitution', 'bromoethane + aqueous NaOH → ethanol'], ['Elimination', '2-bromopropane + hot KOH in ethanol → propene'], ['Electrophilic addition', 'ethene + HBr → bromoethane']] },
      ],
      lines: [
        { say: 'In free-radical substitution, ultraviolet light splits chlorine into radicals. They react with methane in a chain of propagation steps, until two radicals meet and the chain ends.', show: 't.0', focus: 't.0' },
        { say: 'In nucleophilic substitution, the hydroxide ion attacks the slightly positive carbon of a halogenoalkane, and the bromide ion leaves.', show: 't.1', focus: 't.1' },
        { say: 'In elimination, the same hydroxide ion, hot and in ethanol, acts as a base. It removes a hydrogen ion, and a double bond forms.', show: 't.2', focus: 't.2' },
        { say: 'In electrophilic addition, the double bond attacks the hydrogen of H B r. That leaves a carbocation, which the bromide ion then attacks.', caption: 'In electrophilic addition, the double bond attacks the hydrogen of HBr. That leaves a carbocation, which the bromide ion then attacks.', show: 't.3', focus: 't.3' },
      ],
    },
    {
      chapter: 'The major product',
      layout: 'center',
      main: [{ kind: 'callout', id: 'k', tone: 'key', title: 'Carbocation stability', md: 'tertiary > secondary > primary. The more stable carbocation gives the **major product**: propene + HBr gives mainly 2-bromopropane.' }],
      lines: [
        { say: 'With propene, two different carbocations are possible. Alkyl groups push electron density towards the positive carbon, so a carbocation with more of them is more stable.', show: 'k' },
        { say: 'The more stable, secondary carbocation forms more often, so the major product is two bromopropane.', caption: 'The more stable, secondary carbocation forms more often, so the major product is 2-bromopropane.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: '1-bromopropane is heated with potassium hydroxide dissolved in ethanol. What is the mechanism?',
          choices: ['Nucleophilic substitution', 'Electrophilic addition', 'Elimination', 'Free-radical substitution'],
          answer: 2,
          working: 'Hot hydroxide in **ethanol** acts as a **base**, removing $\\ce{H+}$ to form propene: elimination.',
        },
      ],
      lines: [
        { say: 'Your turn. One bromopropane is heated with potassium hydroxide dissolved in ethanol. What is the mechanism? Pause the video and try it.', caption: 'Your turn. 1-bromopropane is heated with potassium hydroxide dissolved in ethanol. What is the mechanism? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, elimination. In hot ethanol, the hydroxide ion acts as a base, and propene forms.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Curly arrows show electron pairs moving.', 'Nucleophiles donate pairs; electrophiles accept them.', 'Aqueous hydroxide substitutes; hot hydroxide in ethanol eliminates.', 'The more stable carbocation gives the major product.'] }],
      lines: [
        { say: 'Let’s sum up. Curly arrows show pairs of electrons moving.', show: 'sum.0' },
        { say: 'Nucleophiles donate electron pairs, and electrophiles accept them.', show: 'sum.1' },
        { say: 'Aqueous hydroxide substitutes, while hot hydroxide in ethanol eliminates.', show: 'sum.2' },
        { say: 'And in electrophilic addition, the more stable carbocation gives the major product.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
