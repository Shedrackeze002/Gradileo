import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c7-1-1',
  lessonId: 'c7-1-1',
  title: 'Working Safely in the Lab',
  thumbnail: 'syms',
  summary:
    'Hazard symbols in red diamonds warn of a chemical’s dangers: a flame means flammable, a flame over a circle means an oxidizer, a skull means toxic, and dripping liquid means corrosive. Wear goggles, tie back hair, never eat or taste anything in a lab, waft to smell, point heated test tubes away from people, and report every accident.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Matter and Measurement', title: 'Working Safely in the Lab', subtitle: 'Reading hazard symbols, and the rules that prevent accidents' }],
      lines: [
        { say: 'A science lab is full of useful things that can also hurt you: flames, hot glass, and chemicals that burn, poison or catch fire.', show: 'title' },
        { say: 'In this video, you will learn to read the warning symbols on chemical labels, and the few simple rules that keep everyone safe.' },
      ],
    },
    {
      chapter: 'Hazard symbols',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Hazard symbol', md: 'A small picture in a **red-bordered diamond** on a chemical’s label. Each picture warns of one kind of danger.' },
        {
          kind: 'table',
          id: 'syms',
          head: ['The picture shows', 'It warns'],
          rows: [
            ['a flame', 'flammable: catches fire easily'],
            ['a flame above a circle', 'oxidizer: makes other things burn fiercely'],
            ['liquid dripping onto a hand', 'corrosive: attacks skin, eyes and metals'],
            ['a skull and crossbones', 'toxic: a small amount can poison'],
            ['an exclamation mark', 'harmful or irritant'],
          ],
        },
      ],
      lines: [
        { say: 'Every bottle of a dangerous chemical carries hazard symbols. Each one is a small picture inside a red diamond, and each picture warns of one kind of danger, in any language.', show: 'def' },
        { say: 'A plain flame means the substance is flammable. It catches fire easily, so keep it away from flames, sparks and heat.', show: ['syms', 'syms.0'], focus: 'syms.0' },
        { say: 'A flame sitting on a circle is different. It marks an oxidizer, which may not burn itself, but makes other things burn far more fiercely.', show: 'syms.1', focus: 'syms.1' },
        { say: 'Liquid dripping onto a hand means corrosive, so wear goggles and gloves. A skull and crossbones means toxic, and an exclamation mark means harmful or irritating.', show: ['syms.2', 'syms.3', 'syms.4'], focus: ['syms.2', 'syms.3', 'syms.4'] },
      ],
    },
    {
      chapter: 'Rules for working safely',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'rules',
          items: [
            '**Goggles on** whenever chemicals are out or anything is heated.',
            '**Tie back long hair**, and stand up when using a burner.',
            '**Never eat, drink or taste** in a lab. **Waft** to smell.',
            'Point a heated test tube **away from everyone**.',
            '**Tell your teacher at once** about any spill, breakage or injury.',
          ],
        },
      ],
      lines: [
        { say: 'Most accidents in a school lab come from a few careless moments, and these rules prevent nearly all of them.', show: 'rules.0' },
        { say: 'Tie back long hair, and tuck in anything loose, so that nothing can fall into a flame.', show: 'rules.1' },
        { say: 'Never eat, drink or taste anything in a lab. To smell a chemical, never sniff it directly. Waft the air towards your nose with your hand.', show: 'rules.2' },
        { say: 'When you heat a test tube, point its open end away from everyone, in case the liquid spits out.', show: 'rules.3' },
        { say: 'And tell your teacher straight away about any spill, breakage, cut or burn. If acid splashes on your skin, rinse it under running water for several minutes.', show: 'rules.4' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A bottle’s label shows a flame sitting on top of a circle. What does it warn?',
          choices: [
            'The substance catches fire very easily by itself.',
            'The substance makes other things burn more fiercely.',
            'The substance is poisonous if swallowed.',
            'The substance is a gas kept under pressure.',
          ],
          answer: 1,
          working: 'A flame over a circle marks an oxidizer: it feeds a fire. A plain flame would mean flammable.',
        },
      ],
      lines: [
        { say: 'Your turn. A label shows a flame sitting on top of a circle. What does it warn? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. A flame over a circle marks an oxidizer, which makes other things burn more fiercely. Choice A would be shown by a plain flame.', show: 'q.answer' },
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
            '**Hazard symbols** in red diamonds warn of a chemical’s dangers.',
            'A flame means flammable; a flame over a circle means an oxidizer.',
            'Wear goggles, tie back hair, never eat or taste, and waft to smell.',
            'Report every spill, breakage and injury straight away.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Hazard symbols in red diamonds warn of the dangers of a chemical, so read every label before you use it.', show: 'sum.0' },
        { say: 'A plain flame means flammable, and a flame over a circle means an oxidizer.', show: 'sum.1' },
        { say: 'Wear goggles, tie back long hair, never eat or taste anything, and waft to smell.', show: 'sum.2' },
        { say: 'And report every accident to your teacher at once. Next, you will find out what counts as matter.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
