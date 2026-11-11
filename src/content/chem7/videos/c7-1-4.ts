import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c7-1-4',
  lessonId: 'c7-1-4',
  title: 'Density',
  thumbnail: 't',
  summary:
    'Density is mass divided by volume, in grams per cubic centimetre, and it tells how tightly matter is packed. Every piece of the same substance has the same density, whatever its size. A solid less dense than a liquid floats on it and a denser one sinks; water’s density is 1 g/cm³. Liquids that do not mix form layers, densest at the bottom.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Matter and Measurement', title: 'Density', subtitle: 'Why a huge ship floats and a tiny pebble sinks' }],
      lines: [
        { say: 'Which is heavier, a kilogram of feathers or a kilogram of iron? Neither: they have the same mass. But the feathers fill a big sack, and the iron fits in your hand.', show: 'title' },
        { say: 'The difference is density. In this video, you will calculate density, and use it to predict what floats and what sinks.' },
      ],
    },
    {
      chapter: 'What density is',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Density', md: 'The mass of a substance in each unit of its volume: how tightly its matter is packed.' },
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\text{density} = \\dfrac{\\text{mass}}{\\text{volume}}', '\\dfrac{54\\ \\text{g}}{20\\ \\text{cm}^3} = 2.7\\ \\text{g/cm}^3'] },
      ],
      lines: [
        { say: 'Density is the mass of a substance in each unit of its volume. It tells us how tightly its matter is packed.', show: 'def' },
        { say: 'To find it, divide the mass by the volume. With the mass in grams and the volume in cubic centimetres, the density is in grams per cubic centimetre.', show: 'f.0', focus: 'f.0' },
        { say: 'A metal block has a mass of fifty-four grams and a volume of twenty cubic centimetres. Fifty-four divided by twenty is two point seven grams per cubic centimetre.', show: 'f.1', focus: 'f.1' },
      ],
    },
    {
      chapter: 'Identifying a substance',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Substance', 'Density (g/cm³)'], rows: [['cork', '0.24'], ['ice', '0.92'], ['water', '1.00'], ['aluminium', '2.7'], ['iron', '7.9'], ['gold', '19.3']] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Size does not matter', md: 'Cut a block in half: half the mass and half the volume, so the **same** density.' },
      ],
      lines: [
        { say: 'Every substance has its own density, so we can use it to identify a substance. Our block, at two point seven, could be aluminium.', show: 't', focus: 't.3' },
        { say: 'Density does not depend on the size of the piece. Cut a block in half, and each half has half the mass and half the volume, so mass divided by volume stays the same.', show: 'oops' },
        { say: 'The formula also turns round. Mass is density times volume, so ten cubic centimetres of iron has a mass of seven point nine times ten, which is seventy-nine grams.', focus: 't.4' },
      ],
    },
    {
      chapter: 'Floating and sinking',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'rule', tone: 'key', title: 'Floating', md: 'A solid **floats** on a liquid if it is **less dense** than the liquid, and **sinks** if it is **denser**.' },
        { kind: 'math', id: 'toy', size: 'lg', lines: ['\\dfrac{30\\ \\text{g}}{40\\ \\text{cm}^3} = 0.75\\ \\text{g/cm}^3 < 1'] },
        { kind: 'bullets', id: 'lay', items: ['Liquids that do not mix form **layers**: the densest at the bottom.'] },
      ],
      lines: [
        { say: 'A solid floats on a liquid if it is less dense than the liquid, and sinks if it is denser. Water has a density of one gram per cubic centimetre.', show: 'rule' },
        { say: 'So a huge log floats while a small pebble sinks. Floating depends on density, not on size. Ice, at zero point nine two, floats just below the surface, which is why most of an iceberg is underwater.' },
        { say: 'A toy has a mass of thirty grams and a volume of forty cubic centimetres. Its density is zero point seven five, which is less than one, so it floats.', show: 'toy', focus: 'toy' },
        { say: 'Liquids that do not mix stack up the same way. Honey sinks below water, and vegetable oil floats on top.', show: 'lay' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A stone has a mass of 60 g and a volume of 24 cm³. What is its density, and does it float in water?',
          choices: ['0.4 g/cm³, so it floats', '2.5 g/cm³, so it floats', '2.5 g/cm³, so it sinks', '36 g/cm³, so it sinks'],
          answer: 2,
          working: '60 ÷ 24 = 2.5 g/cm³. That is more than 1 g/cm³, the density of water, so the stone sinks.',
        },
      ],
      lines: [
        { say: 'Your turn. A stone has a mass of sixty grams and a volume of twenty-four cubic centimetres. What is its density, and does it float? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Sixty divided by twenty-four is two point five grams per cubic centimetre. That is denser than water, so the stone sinks.', show: 'q.answer' },
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
            '**Density = mass ÷ volume**, in g/cm³.',
            'Every piece of the same substance has the same density.',
            'Less dense than the liquid: **floats**. Denser: **sinks**.',
            'Water’s density is 1 g/cm³.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Density is mass divided by volume, in grams per cubic centimetre.', show: 'sum.0' },
        { say: 'Every piece of the same substance has the same density, whatever its size.', show: 'sum.1' },
        { say: 'A solid that is less dense than a liquid floats on it, and a denser one sinks.', show: 'sum.2' },
        { say: 'And water’s density is one gram per cubic centimetre. Next, you will meet the particle model, which explains solids, liquids and gases.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
