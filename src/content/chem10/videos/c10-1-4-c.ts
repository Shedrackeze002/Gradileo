import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c10-1-4-c',
  lessonId: 'c10-1-4',
  title: 'Physical and Chemical Change, Part 3: Density',
  thumbnailTitle: 'Density',
  thumbnail: false,
  summary:
    'Density is mass per unit volume: ρ = m/V, in g/cm³ for solids and g/mL for liquids (1 mL = 1 cm³). Rearranged, m = ρV and V = m/ρ. A block of metal of mass 81.0 g and volume 30.0 cm³ has a density of 2.70 g/cm³, which identifies it as aluminium; 250 mL of ethanol at 0.79 g/mL has a mass of 197.5 g.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Matter and the Particle Model · Part 3', title: 'Density', subtitle: 'Mass per unit volume' }],
      lines: [
        { say: 'A brick is heavier than a sponge of the same size. In the same volume, the brick has more mass. That property is called density.', show: 'title' },
        { say: 'In this part, you will calculate a density, a mass or a volume, and use density to identify a substance.' },
      ],
    },
    {
      chapter: 'What density is',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Density', md: 'The **density** of a substance is its **mass per unit volume**. Solids: $\\text{g/cm}^3$. Liquids: $\\text{g/mL}$. Since $1\\ \\text{mL} = 1\\ \\text{cm}^3$, the two units are the same.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\rho = \\dfrac{m}{V} \\qquad m = \\rho V \\qquad V = \\dfrac{m}{\\rho}'] },
      ],
      lines: [
        { say: 'The density of a substance is its mass per unit volume. Its symbol is rho, a Greek letter, and rho equals m over V: the mass divided by the volume.', caption: 'The density of a substance is its mass per unit volume. Its symbol is ρ (rho), a Greek letter, and ρ = m/V: the mass divided by the volume.', show: ['def', 'm'] },
        { say: 'For solids, density is usually measured in grams per cubic centimetre, and for liquids, in grams per millilitre. One millilitre is one cubic centimetre, so the two units are the same.' },
        { say: 'Rearranging the formula gives the mass, which is density times volume, or the volume, which is mass divided by density.', focus: 'm' },
      ],
    },
    {
      chapter: 'Identifying a substance',
      layout: 'split',
      leftWidth: 460,
      left: [
        {
          kind: 'table',
          id: 't',
          head: ['Substance', '$\\rho\\ (\\text{g/cm}^3)$'],
          rows: [
            ['ethanol', '0.79'],
            ['ice', '0.92'],
            ['water', '1.00'],
            ['aluminium', '2.70'],
            ['iron', '7.87'],
            ['copper', '8.96'],
            ['lead', '11.34'],
            ['gold', '19.32'],
          ],
        },
      ],
      right: [
        { kind: 'text', id: 'q', size: 'md', align: 'left', md: 'A block of metal has a mass of $81.0\\ \\text{g}$ and a volume of $30.0\\ \\text{cm}^3$. Find its density, and identify the metal.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\rho = \\dfrac{m}{V} = \\dfrac{81.0\\ \\text{g}}{30.0\\ \\text{cm}^3}', '= 2.70\\ \\text{g/cm}^3'] },
        { kind: 'text', id: 'ans', size: 'md', align: 'left', md: 'The metal is **aluminium**.' },
      ],
      lines: [
        { say: 'Every pure substance has its own density at a given temperature, whatever the size of the sample. So density helps to identify a substance.', show: 't' },
        { say: 'A block of metal has a mass of eighty-one point zero grams, and a volume of thirty point zero cubic centimetres. Find its density, and identify the metal.', show: 'q' },
        { say: 'Density is mass over volume: eighty-one point zero divided by thirty point zero is two point seven zero grams per cubic centimetre.', show: 'm', focus: 'm' },
        { say: 'In the table, the metal with a density of two point seven zero grams per cubic centimetre is aluminium.', show: 'ans', focus: 't.3' },
      ],
    },
    {
      chapter: 'Finding a mass',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'What is the mass of $250\\ \\text{mL}$ of ethanol (density $0.79\\ \\text{g/mL}$)?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['m = \\rho V = 0.79 \\times 250', '= 197.5\\ \\text{g} \\approx 198\\ \\text{g}'] },
      ],
      lines: [
        { say: 'What is the mass of two hundred fifty millilitres of ethanol? Its density is zero point seven nine grams per millilitre.', show: 'q' },
        { say: 'Mass is density times volume: zero point seven nine times two hundred fifty.', show: 'm.0', focus: 'm.0' },
        { say: 'That is one hundred ninety-seven point five grams, or about one hundred ninety-eight grams. The millilitres cancel, leaving grams.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Same substance, same density',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Size does not change density', md: 'Cut a block in half: each half has half the mass **and** half the volume, so the density is the same.' }],
      lines: [
        { say: 'Cutting a substance into pieces does not change its density. Half a block has half the mass, and half the volume, so mass divided by volume stays the same.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Copper has a density of $8.96\\ \\text{g/cm}^3$. What volume of copper has a mass of $44.8\\ \\text{g}$?',
          choices: ['$401.4\\ \\text{cm}^3$', '$0.20\\ \\text{cm}^3$', '$5.00\\ \\text{cm}^3$', '$35.84\\ \\text{cm}^3$'],
          answer: 2,
          working: '$V = \\dfrac{m}{\\rho} = \\dfrac{44.8}{8.96} = 5.00\\ \\text{cm}^3$.',
        },
      ],
      lines: [
        { say: 'Your turn. Copper has a density of eight point nine six grams per cubic centimetre. What volume of copper has a mass of forty-four point eight grams? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Volume is mass divided by density: forty-four point eight divided by eight point nine six is five point zero zero cubic centimetres. Choice A multiplies instead of dividing, and B divides the wrong way round.', show: 'q.answer' },
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
            'Density is mass per unit volume: $\\rho = \\dfrac{m}{V}$, in $\\text{g/cm}^3$ or $\\text{g/mL}$.',
            'Rearranged: $m = \\rho V$ and $V = \\dfrac{m}{\\rho}$.',
            'Each pure substance has its own density, so a measured density can identify it.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Density is mass per unit volume: mass divided by volume, in grams per cubic centimetre or grams per millilitre.', show: 'sum.0' },
        { say: 'Mass is density times volume, and volume is mass divided by density.', show: 'sum.1' },
        { say: 'Each pure substance has its own density, so a measured density can identify it. In part four, you will find the volume of an odd-shaped object, and see why some things float. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
