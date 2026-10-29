import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c30-3-7-d',
  lessonId: 'c30-3-7',
  title: 'Fossil Fuels and Combustion, Part 4: Burning Fossil Fuels and the Environment',
  thumbnailTitle: 'Fossil Fuels and the Environment',
  thumbnail: false,
  summary:
    'Burning fossil fuels releases carbon dioxide (the enhanced greenhouse effect and climate change), carbon monoxide (poisonous), soot, sulfur dioxide and nitrogen oxides (acid deposition and smog). Sulfur can be removed from fuels and catalytic converters treat exhaust, but carbon dioxide can only be cut by burning less: 1.00 kg of octane makes about 3.08 kg of it.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Changes of Organic Compounds · Part 4', title: 'Fossil Fuels and the Environment', subtitle: 'What comes out when fuels burn' }],
      lines: [
        { say: 'Burning a fossil fuel releases the energy stored in its bonds, along with carbon dioxide, water and some less welcome products.', show: 'title' },
        { say: 'In this part, you will see what each product does, how some can be reduced, and how to work out the mass of carbon dioxide that a fuel makes.' },
      ],
    },
    {
      chapter: 'What burning releases',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Product', 'Comes from', 'Effect'],
          rows: [
            ['carbon dioxide, $\\ce{CO2}$', 'complete combustion', 'traps heat: climate change'],
            ['carbon monoxide, $\\ce{CO}$', 'incomplete combustion', 'poisonous'],
            ['soot (carbon)', 'incomplete combustion', 'blackens buildings, damages lungs'],
            ['sulfur dioxide, $\\ce{SO2}$', 'sulfur impurities in coal and oil', 'acid deposition'],
            ['$\\ce{NO}$ and $\\ce{NO2}$', 'air, in a hot engine', 'acid deposition, smog'],
          ],
        },
      ],
      lines: [
        { say: 'Every fossil fuel makes carbon dioxide when it burns completely. Carbon dioxide absorbs infrared radiation and traps heat in the atmosphere: the enhanced greenhouse effect, and climate change.', show: 't.0', focus: 't.0' },
        { say: 'Incomplete combustion makes carbon monoxide, which is poisonous: it binds to haemoglobin in the blood more strongly than oxygen does. It also makes soot, which blackens buildings and damages the lungs.', show: ['t.1', 't.2'], focus: ['t.1', 't.2'] },
        { say: 'Sulfur impurities in coal and oil burn to sulfur dioxide. It dissolves in water in the air to form acids: acid deposition, or acid rain.', show: 't.3', focus: 't.3' },
        { say: 'And at the high temperature of an engine, nitrogen and oxygen from the air react to form nitrogen oxides, which cause acid deposition and smog.', show: 't.4', focus: 't.4' },
      ],
    },
    {
      chapter: 'Reducing the damage',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            'Sulfur is removed from fuels before they are sold.',
            'A **catalytic converter** turns carbon monoxide and nitrogen oxides into carbon dioxide and nitrogen.',
            'Carbon dioxide cannot be removed this way: every carbon atom in the fuel ends up in it.',
            'The only way to make less is to burn less fuel, or use energy sources that release no carbon dioxide.',
          ],
        },
      ],
      lines: [
        { say: 'Some of these effects can be reduced. Sulfur is removed from fuels before they are sold.', show: 'b.0' },
        { say: 'And a catalytic converter in a car’s exhaust turns carbon monoxide and nitrogen oxides into carbon dioxide and nitrogen.', show: 'b.1' },
        { say: 'But carbon dioxide cannot be removed this way, because every carbon atom in the fuel ends up in it.', show: 'b.2' },
        { say: 'Burning less fuel, or using energy sources that release no carbon dioxide, is the only way to make less.', show: 'b.3' },
      ],
    },
    {
      chapter: 'Carbon dioxide from a fuel',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'What mass of $\\ce{CO2}$ forms when $1.00\\ \\text{kg}$ of octane burns completely? $\\ce{2C8H18 + 25O2 -> 16CO2 + 18H2O}$, $M(\\ce{C8H18}) = 114.26\\ \\text{g/mol}$, $M(\\ce{CO2}) = 44.01\\ \\text{g/mol}$' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            'n(\\ce{C8H18}) = \\dfrac{1000\\ \\text{g}}{114.26\\ \\text{g/mol}} = 8.752\\ \\text{mol}',
            'n(\\ce{CO2}) = 8.752 \\times \\dfrac{16}{2} = 70.02\\ \\text{mol}',
            'm = 70.02 \\times 44.01 = 3081\\ \\text{g} \\approx 3.08\\ \\text{kg}',
          ],
        },
      ],
      lines: [
        { say: 'How much carbon dioxide does a fuel make? Take one kilogram of octane, burning completely. The molar masses are on the screen: 114.26 grams per mole for octane, and 44.01 for carbon dioxide.', caption: 'How much carbon dioxide does a fuel make? Take 1.00 kg of octane, burning completely. The molar masses are on the screen: 114.26 grams per mole for octane, and 44.01 for carbon dioxide.', show: 'q' },
        { say: 'First, moles of octane: one thousand grams divided by 114.26 grams per mole is 8.752 moles.', show: 'm.0', focus: 'm.0' },
        { say: 'The equation says two moles of octane give sixteen moles of carbon dioxide. So multiply by sixteen over two: 70.02 moles of carbon dioxide.', show: 'm.1', focus: 'm.1' },
        { say: 'Then the mass: 70.02 moles times 44.01 grams per mole is about 3,081 grams, or 3.08 kilograms.', show: 'm.2', focus: 'm.2' },
        { say: 'That is three times the mass of the fuel, because each carbon atom picks up two oxygen atoms from the air.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Methane burns completely: $\\ce{CH4 + 2O2 -> CO2 + 2H2O}$. What mass of carbon dioxide forms when $100\\ \\text{g}$ of methane burns? Use $M(\\ce{CH4}) = 16.05\\ \\text{g/mol}$ and $M(\\ce{CO2}) = 44.01\\ \\text{g/mol}$.',
          choices: ['$36.5\\ \\text{g}$', '$274\\ \\text{g}$', '$137\\ \\text{g}$', '$548\\ \\text{g}$'],
          answer: 1,
          working: '$n(\\ce{CH4}) = 100 \\div 16.05 = 6.231\\ \\text{mol}$, which gives $6.231\\ \\text{mol}$ of $\\ce{CO2}$ (1 to 1). $m = 6.231 \\times 44.01 = 274\\ \\text{g}$.',
        },
      ],
      lines: [
        { say: 'Your turn. What mass of carbon dioxide forms when one hundred grams of methane burns completely? The molar masses are on the screen. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, 274 grams. One hundred grams divided by 16.05 is 6.231 moles of methane, which gives the same number of moles of carbon dioxide. Times 44.01 is 274 grams. Choice D uses the two in front of oxygen by mistake.', show: 'q.answer' },
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
            'Carbon dioxide traps heat: the enhanced greenhouse effect and climate change.',
            'Carbon monoxide is poisonous; soot damages the lungs.',
            'Sulfur dioxide and nitrogen oxides cause acid deposition; nitrogen oxides also cause smog.',
            'Mass of $\\ce{CO2}$: moles of fuel, mole ratio from the equation, then mass.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Carbon dioxide traps heat in the atmosphere, causing the enhanced greenhouse effect and climate change.', show: 'sum.0' },
        { say: 'Carbon monoxide is poisonous, and soot damages the lungs.', show: 'sum.1' },
        { say: 'Sulfur dioxide and nitrogen oxides cause acid deposition, and nitrogen oxides also cause smog.', show: 'sum.2' },
        { say: 'And the mass of carbon dioxide comes from moles of fuel, the mole ratio, and the mass. Now you can explain where fuels come from, and what burning them does. Well done!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
