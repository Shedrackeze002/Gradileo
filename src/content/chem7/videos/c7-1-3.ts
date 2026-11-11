import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c7-1-3',
  lessonId: 'c7-1-3',
  title: 'Measuring Mass and Volume',
  thumbnail: 'disp',
  summary:
    'Mass is measured with a balance and the volume of a liquid with a measuring cylinder, read at the bottom of the meniscus with your eye level. One millilitre is one cubic centimetre. The volume of an irregular solid is the rise in the water level when it sinks (displacement). Multiply by 1000 to change to the smaller unit and divide by 1000 to change to the bigger one.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Matter and Measurement', title: 'Measuring Mass and Volume', subtitle: 'Reading a scale, displacement, and changing units' }],
      lines: [
        { say: 'Chemists measure all the time: how much solid to weigh out, and how much water to add. A measurement is only useful if it is read correctly and has the right unit.', show: 'title' },
        { say: 'In this video, you will read a measuring cylinder, find the volume of an odd-shaped object, and change between units.' },
      ],
    },
    {
      chapter: 'Reading a measuring cylinder',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'tools', items: ['**Mass**: a balance, in grams or kilograms.', '**Volume of a liquid**: a measuring cylinder, in millilitres or litres.', '$1\\ \\text{mL} = 1\\ \\text{cm}^3$'] },
        { kind: 'callout', id: 'men', tone: 'key', title: 'The meniscus', md: 'Water curves up at the glass. Put your eye **level** with it and read the **bottom** of the curve.' },
      ],
      lines: [
        { say: 'We measure mass with a balance, in grams or kilograms, and the volume of a liquid with a measuring cylinder, in millilitres or litres.', show: ['tools.0', 'tools.1'] },
        { say: 'Solids are measured in cubic centimetres, and one cubic centimetre is exactly the same volume as one millilitre.', show: 'tools.2', focus: 'tools.2' },
        { say: 'In a narrow cylinder, water curves up where it touches the glass. This curve is called the meniscus. Crouch so your eye is level with it, and read the scale at the bottom of the curve.', show: 'men' },
        { say: 'Looking down from above makes the reading too high, and looking up from below makes it too low.' },
      ],
    },
    {
      chapter: 'Volume by displacement',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Displacement', md: 'A solid that sinks pushes aside its own volume of water, so the rise in the level is its volume.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{volume} = \\text{final reading} - \\text{first reading}', '= 48 - 35 = 13\\ \\text{cm}^3'] },
      ],
      lines: [
        { say: 'A box has a volume you can calculate. But what about a stone or a key? For a solid that sinks, we use displacement.', show: 'def' },
        { say: 'A sinking solid pushes aside, or displaces, a volume of water equal to its own volume. So its volume is the final reading minus the first reading.', show: 'm.0', focus: 'm.0' },
        { say: 'A cylinder holds thirty-five millilitres of water. A stone is lowered in, and the level rises to forty-eight. The stone’s volume is thirteen cubic centimetres.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Changing units',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Mass', 'Volume'], rows: [['1 kg = 1000 g', '1 L = 1000 mL'], ['1 g = 1000 mg', '1 mL = 1 cm³']] },
        { kind: 'math', id: 'c', size: 'lg', lines: ['2.5\\ \\text{L} = 2.5 \\times 1000 = 2500\\ \\text{mL}', '750\\ \\text{g} = 750 \\div 1000 = 0.75\\ \\text{kg}'] },
      ],
      lines: [
        { say: 'Units of mass and volume are linked by thousands. One kilogram is a thousand grams, and one litre is a thousand millilitres.', show: 't', focus: 't' },
        { say: 'To change to a smaller unit, multiply by a thousand, because there will be more of the smaller units. Two point five litres is two thousand five hundred millilitres.', show: 'c.0', focus: 'c.0' },
        { say: 'To change to a bigger unit, divide by a thousand. Seven hundred and fifty grams is zero point seven five kilograms.', show: 'c.1', focus: 'c.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A measuring cylinder holds 60 mL of water. A key is dropped in and the level rises to 67 mL. What is the volume of the key?',
          choices: ['7 cm³', '67 cm³', '127 cm³', '60 cm³'],
          answer: 0,
          working: 'The rise in the level is the key’s volume: 67 − 60 = 7 mL, and 1 mL = 1 cm³.',
        },
      ],
      lines: [
        { say: 'Your turn. A cylinder holds sixty millilitres of water. A key is dropped in, and the level rises to sixty-seven. What is the volume of the key? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The rise is sixty-seven minus sixty, which is seven millilitres, or seven cubic centimetres.', show: 'q.answer' },
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
            'Read a measuring cylinder at the **bottom of the meniscus**, eye level.',
            '$1\\ \\text{mL} = 1\\ \\text{cm}^3$',
            '**Displacement**: the rise in water level is the volume of a sinking solid.',
            'Multiply by 1000 for the smaller unit; divide by 1000 for the bigger one.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Read a measuring cylinder with your eye level, at the bottom of the meniscus.', show: 'sum.0' },
        { say: 'One millilitre is one cubic centimetre.', show: 'sum.1' },
        { say: 'The volume of an irregular solid is the rise in the water level when it sinks.', show: 'sum.2' },
        { say: 'And multiply by a thousand to change to the smaller unit, or divide by a thousand for the bigger one. Next, you will put mass and volume together to find density.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
