import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c7-3-2',
  lessonId: 'c7-3-2',
  title: 'Solutions and Concentration',
  thumbnail: 'f',
  summary:
    'A solute dissolves in a solvent to make a solution. Dissolved particles spread out but are not destroyed, so the mass of the solution is the mass of the solute plus the mass of the solvent. Concentration in grams per litre is the mass of solute divided by the volume of solution in litres; change millilitres to litres first.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Mixtures and Solutions', title: 'Solutions and Concentration', subtitle: 'Solute, solvent, and how strong a solution is' }],
      lines: [
        { say: 'Stir a spoonful of sugar into water, and it vanishes. But it is still there: the water tastes sweet, and nothing has been lost.', show: 'title' },
        { say: 'In this video, you will learn the words for the parts of a solution, and how to say exactly how strong a solution is.' },
      ],
    },
    {
      chapter: 'Solute, solvent and solution',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'parts',
          head: ['Word', 'Meaning', 'In sugary water'],
          rows: [
            ['solute', 'the substance that dissolves', 'the sugar'],
            ['solvent', 'the substance it dissolves in', 'the water'],
            ['solution', 'the mixture that forms', 'the sugary water'],
          ],
        },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Dissolving is not melting', md: 'Sugar in tea does not melt. Its particles **spread out** between the water particles.' },
      ],
      lines: [
        { say: 'A solution forms when one substance dissolves in another. The solute is the substance that dissolves, like the sugar.', show: ['parts', 'parts.0'], focus: 'parts.0' },
        { say: 'The solvent is the substance it dissolves in, like the water. Water dissolves so many things that it is called the universal solvent.', show: 'parts.1', focus: 'parts.1' },
        { say: 'And the solution is the mixture that forms. A substance that dissolves is soluble, and one that does not, like sand in water, is insoluble.', show: 'parts.2', focus: 'parts.2' },
        { say: 'Dissolving is not melting. Sugar would need over one hundred and eighty degrees to melt. In tea, its particles simply spread out between the water particles.', show: 'oops' },
      ],
    },
    {
      chapter: 'Mass is conserved',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{mass of solution} = \\text{mass of solute} + \\text{mass of solvent}', '25\\ \\text{g} + 200\\ \\text{g} = 225\\ \\text{g}'] },
      ],
      lines: [
        { say: 'When a solute dissolves, its particles become too small to see, but they are not destroyed. So mass is conserved. The mass of the solution is the mass of the solute plus the mass of the solvent.', show: 'm.0', focus: 'm.0' },
        { say: 'Dissolve twenty-five grams of salt in two hundred grams of water, and the solution has a mass of two hundred and twenty-five grams.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Concentration',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\text{concentration} = \\dfrac{\\text{mass of solute (g)}}{\\text{volume of solution (L)}}', '250\\ \\text{mL} = 0.25\\ \\text{L}', '\\dfrac{4}{0.25} = 16\\ \\text{g/L}'] },
        { kind: 'callout', id: 'dil', tone: 'tip', title: 'Diluting', md: 'Adding more solvent spreads the same solute through a bigger volume, so each litre holds less.' },
      ],
      lines: [
        { say: 'A cup of tea with three spoonfuls of sugar is sweeter than one with a single spoonful. The amount of solute in each litre of solution is its concentration, in grams per litre.', show: 'f.0', focus: 'f.0' },
        { say: 'Four grams of salt is dissolved to make two hundred and fifty millilitres of solution. First, change the volume to litres: two hundred and fifty millilitres is zero point two five litres.', show: 'f.1', focus: 'f.1' },
        { say: 'Four divided by zero point two five is sixteen, so the concentration is sixteen grams per litre.', show: 'f.2', focus: 'f.2' },
        { say: 'A concentrated solution has a lot of solute in each litre, and a dilute one has only a little. Adding more solvent makes a solution more dilute.', show: 'dil' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: '10 g of sugar is dissolved to make 500 mL of solution. What is the concentration?',
          choices: ['5 g/L', '20 g/L', '0.02 g/L', '50 g/L'],
          answer: 1,
          working: '500 mL = 0.5 L, and 10 ÷ 0.5 = 20 g/L.',
        },
      ],
      lines: [
        { say: 'Your turn. Ten grams of sugar is dissolved to make five hundred millilitres of solution. What is the concentration? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Five hundred millilitres is zero point five litres, and ten divided by zero point five is twenty grams per litre.', show: 'q.answer' },
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
            'The **solute** dissolves in the **solvent** to make a **solution**.',
            'Mass of solution = mass of solute + mass of solvent.',
            '**Concentration** (g/L) = mass of solute ÷ volume in litres.',
            'Change mL to L first.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The solute dissolves in the solvent to make a solution.', show: 'sum.0' },
        { say: 'Nothing is lost, so the mass of the solution is the mass of the solute plus the mass of the solvent.', show: 'sum.1' },
        { say: 'Concentration in grams per litre is the mass of solute divided by the volume in litres.', show: 'sum.2' },
        { say: 'So always change millilitres to litres first. Next, you will find out how much of a solute can dissolve.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
