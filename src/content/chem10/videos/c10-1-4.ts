import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c10-1-4',
  lessonId: 'c10-1-4',
  title: 'Physical and Chemical Change, Part 1: Physical and Chemical Changes',
  thumbnailTitle: 'Physical or Chemical Change?',
  thumbnail: false,
  summary:
    'In a physical change no new substance is made, and the change is usually easy to reverse; in a chemical change new substances are made, and it is usually hard to reverse. Evidence of a chemical change: a gas given off when nothing is boiling, a colour change, a precipitate, or energy given out or taken in.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Matter and the Particle Model · Part 1', title: 'Physical and Chemical Changes', subtitle: 'Is a new substance made?' }],
      lines: [
        { say: 'Melt an ice cube, and freezing the water gets the ice cube back. But burn a piece of paper, and nothing will ever turn the ash and smoke back into paper.', show: 'title' },
        { say: 'Both are changes, but of very different kinds. In this part, you will tell physical changes from chemical changes by the evidence they leave.' },
      ],
    },
    {
      chapter: 'Physical changes',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Physical change', md: '**No new substance** is made. The substance may change its state, shape or size, or dissolve or mix, but it is still the same substance. Usually **easy to reverse**.' },
        { kind: 'text', id: 'ex', size: 'md', md: 'Melting, freezing, boiling, condensing, dissolving salt in water, cutting wood, bending a wire.' },
      ],
      lines: [
        { say: 'In a physical change, no new substance is made. The substance may change its state, shape or size, or dissolve or mix, but it is still the same substance.', show: 'def' },
        { say: 'Melting, freezing, boiling, condensing, dissolving salt in water, cutting wood and bending a wire are all physical changes.', show: 'ex' },
        { say: 'Physical changes are usually easy to reverse: melted ice is still water, and evaporating salt water gets the salt back.' },
      ],
    },
    {
      chapter: 'Chemical changes',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Chemical change', md: 'A chemical reaction: one or more **new substances** are made, with properties different from those of the starting substances. Usually **hard to reverse**.' },
        { kind: 'text', id: 'ex', size: 'md', md: 'Burning, rusting, cooking an egg, baking bread, milk going sour.' },
      ],
      lines: [
        { say: 'In a chemical change, also called a chemical reaction, one or more new substances are made, with properties different from those of the starting substances. Chemical changes are usually hard to reverse.', show: 'def' },
        { say: 'Burning, rusting, cooking an egg, baking bread and milk going sour are all chemical changes.', show: 'ex' },
        { say: 'Rust is a new substance, iron oxide. Unlike the iron it came from, rust is reddish brown, flaky, and not magnetic.' },
      ],
    },
    {
      chapter: 'The evidence',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Evidence of a chemical change', 'Example'],
          rows: [
            ['a gas given off, when nothing is boiling', 'zinc fizzes in dilute acid'],
            ['a colour change', 'green copper(II) carbonate turns black'],
            ['a precipitate forms', 'two clear solutions give a yellow solid'],
            ['energy given out or taken in', 'magnesium burns with a white light'],
            ['hard to reverse', 'a cooked egg cannot be uncooked'],
          ],
        },
      ],
      lines: [
        { say: 'You cannot see particles, so how can you tell that a new substance has been made? Look for evidence.' },
        { say: 'A gas given off, as bubbles or fizzing, when nothing is boiling. Zinc fizzes in dilute hydrochloric acid, giving hydrogen.', show: 't.0', focus: 't.0' },
        { say: 'A colour change. Green copper two carbonate turns black when it is heated.', caption: 'A colour change. Green copper(II) carbonate turns black when it is heated.', show: 't.1', focus: 't.1' },
        { say: 'A precipitate: a solid that forms when two solutions are mixed. Two colourless solutions can give a bright yellow solid.', show: 't.2', focus: 't.2' },
        { say: 'Energy given out or taken in, as heat, light or sound, or the mixture cools. Magnesium burns with a dazzling white light.', show: 't.3', focus: 't.3' },
        { say: 'And a change that is hard to reverse: a cooked egg cannot be uncooked.', show: 't.4', focus: 't.4' },
      ],
    },
    {
      chapter: 'Heating copper carbonate',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Green copper(II) carbonate is heated strongly. It turns black, and the gas given off turns limewater cloudy. Physical or chemical change?' },
        { kind: 'bullets', id: 'steps', items: ['The black powder is a new substance: copper(II) oxide.', 'The gas, carbon dioxide, is a new substance too.', 'The black powder does not turn green again when it cools.'] },
        { kind: 'math', id: 'eq', size: 'lg', lines: ['\\ce{CuCO3 -> CuO + CO2}'] },
      ],
      lines: [
        { say: 'Green copper two carbonate powder is heated strongly in a test tube. It turns black, and the gas given off turns limewater cloudy. Is this a physical or a chemical change?', caption: 'Green copper(II) carbonate powder is heated strongly in a test tube. It turns black, and the gas given off turns limewater cloudy. Is this a physical or a chemical change?', show: 'q' },
        { say: 'The black powder has a different colour, so it is a new substance: copper two oxide.', caption: 'The black powder has a different colour, so it is a new substance: copper(II) oxide.', show: 'steps.0' },
        { say: 'The gas, carbon dioxide, is a new substance too. And the black powder does not turn green again when it cools.', show: ['steps.1', 'steps.2'] },
        { say: 'So this is a chemical change. Copper two carbonate gives copper two oxide and carbon dioxide.', caption: 'So this is a chemical change. Copper(II) carbonate gives copper(II) oxide and carbon dioxide.', show: 'eq', focus: 'eq' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Vinegar is poured onto baking soda, and the mixture froths up. Which statement correctly classifies this change and gives the evidence?',
          choices: [
            'Chemical: a new gas is produced, seen as bubbles.',
            'Physical: the substances are only mixed.',
            'Physical: only the state changes.',
            'Chemical: a precipitate forms.',
          ],
          answer: 0,
          working: 'The bubbles appear when two substances are mixed and nothing is boiling, so a new gas (carbon dioxide) is being made: a chemical change.',
        },
      ],
      lines: [
        { say: 'Your turn. Vinegar is poured onto baking soda, and the mixture froths up. Which statement correctly classifies this change, and gives the evidence? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The bubbles appear when two substances are mixed, and nothing is boiling, so a new gas is being made. Choice D gives the wrong evidence: no solid forms.', show: 'q.answer' },
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
            '**Physical change**: no new substance; usually easy to reverse.',
            '**Chemical change**: new substances are made; usually hard to reverse.',
            'Evidence: a gas given off, a colour change, a precipitate, energy given out or taken in.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In a physical change, no new substance is made, and the change is usually easy to reverse.', show: 'sum.0' },
        { say: 'In a chemical change, new substances are made, and the change is usually hard to reverse.', show: 'sum.1' },
        { say: 'Evidence of a chemical change: a gas given off, a colour change, a precipitate, or energy given out or taken in. In part two, you will see how evidence can mislead you. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
