import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { flask } from './lib/c20-3b-figures.ts';

// A volumetric flask with the mark on its neck, and a pipette above it.
const lab = figure('f', [flask({ label: '\\text{volumetric flask}' })], 560);

const video: Explainer = {
  id: 'c20-3-5-d',
  lessonId: 'c20-3-5',
  title: 'Dilution, Part 4: Making a Dilution in the Lab',
  thumbnailTitle: 'Making a Dilution in the Lab',
  thumbnail: 'f',
  summary:
    'A dilution is made with a pipette, which delivers an exact volume of stock solution, and a volumetric flask, which holds an exact volume when filled to the mark: calculate V₁, half-fill the flask with distilled water, pipette in the stock solution, fill to the mark, then stopper and mix. Always add acid to water, never water to acid.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Matter as Solutions, Acids and Bases · Part 4', title: 'Making a Dilution in the Lab', subtitle: 'Pipette, flask, and acid to water' }],
      lines: [
        { say: 'A dilution is only as accurate as the two volumes in it: the stock solution you measure out, and the final volume you make.', show: 'title' },
        { say: 'In this part, you will see the glassware and the steps of a dilution, and the safety rule for acids. Then you will plan a dilution.' },
      ],
    },
    {
      chapter: 'Five steps',
      layout: 'split',
      leftWidth: 460,
      left: [lab],
      right: [
        {
          kind: 'bullets',
          id: 's',
          items: [
            '**Calculate** $V_1$ with $c_1V_1 = c_2V_2$.',
            '**Half-fill** a volumetric flask of volume $V_2$ with distilled water.',
            '**Pipette** $V_1$ of stock solution into the flask (rinse the pipette with stock first).',
            '**Fill to the mark**: swirl, then add distilled water until the bottom of the meniscus sits on the mark.',
            '**Mix**: stopper the flask and turn it upside down several times.',
          ],
        },
      ],
      lines: [
        { say: 'Both volumes are measured with precise glassware. A volumetric flask, which you met in lesson three point four, holds an exact volume when it is filled to the mark on its neck.', show: ['f.flask', 'f.label', 'f.mark'], focus: 'f.mark' },
        { say: 'A pipette measures and delivers an exact volume of liquid.', show: 'f.pipette', focus: 'f.pipette' },
        { say: 'Step one: calculate the volume of stock solution, V one, with the dilution equation.', caption: 'Step one: calculate the volume of stock solution, V₁, with the dilution equation.', show: 's.0', focus: 's.0' },
        { say: 'Step two: half-fill a volumetric flask, of the final volume, with distilled water.', show: ['s.1', 'f.half'], focus: ['s.1', 'f.half'] },
        { say: 'Step three: pipette the stock solution into the flask. Rinse the pipette first with a little of the stock solution, so that water left inside it does not dilute what you measure.', show: 's.2', focus: ['s.2', 'f.pipette'] },
        { say: 'Step four: swirl to mix, then add distilled water until the bottom of the meniscus sits on the mark. Use a dropper for the last few drops.', show: ['s.3', 'f.full'], hide: 'f.half', focus: ['s.3', 'f.full', 'f.mark'] },
        { say: 'Step five: stopper the flask, and turn it upside down several times, so the concentration is the same throughout.', show: ['s.4', 'f.stopper'], hide: 'f.pipette', focus: ['s.4', 'f.stopper'] },
        { say: 'You do not measure the water separately: filling to the mark makes the final volume exact.', focus: 's' },
      ],
    },
    {
      chapter: 'Add acid to water',
      layout: 'center',
      main: [{ kind: 'callout', id: 'safe', tone: 'mistake', title: 'Safety: add acid to water', md: 'Diluting a concentrated acid, especially sulfuric acid, releases a lot of heat. Always add the acid **slowly to water**, never water to acid. Wear eye protection whenever you dilute an acid or a base.' }],
      lines: [
        { say: 'Diluting a concentrated acid, especially sulfuric acid, releases a lot of heat. So always add the acid slowly to water, never water to acid.', show: 'safe' },
        { say: 'If water is poured into a concentrated acid, the first small amount of water can boil at once, and spatter acid out of the container.' },
        { say: 'That is why the flask is half-filled with water first. And wear eye protection whenever you dilute an acid or a base.' },
      ],
    },
    {
      chapter: 'Planning a dilution',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Describe how to make $250.0\\ \\text{mL}$ of a $0.0800\\ \\text{mol/L}$ copper(II) sulfate solution from a $0.800\\ \\text{mol/L}$ stock solution.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['V_1 = \\dfrac{c_2V_2}{c_1} = \\dfrac{0.0800 \\times 250.0}{0.800} = \\good{25.0\\ \\text{mL}}'] },
        { kind: 'text', id: 'a', size: 'md', align: 'center', md: 'Pipette $25.0\\ \\text{mL}$ of stock solution into a $250\\ \\text{mL}$ volumetric flask half-filled with distilled water, fill to the mark, then stopper and invert.' },
      ],
      lines: [
        { say: 'Describe how to make two hundred fifty point zero millilitres of a zero point zero eight zero zero moles per litre copper two sulfate solution, from a zero point eight zero zero moles per litre stock solution.', caption: 'Describe how to make 250.0 mL of a 0.0800 mol/L copper(II) sulfate solution, from a 0.800 mol/L stock solution.', show: 'q' },
        { say: 'First, calculate. V one is zero point zero eight times two hundred fifty, over zero point eight: twenty-five point zero millilitres. This is a tenfold dilution.', caption: 'First, calculate. V₁ = 0.0800 × 250.0, over 0.800: 25.0 mL. This is a tenfold dilution.', show: 'm', focus: 'm' },
        { say: 'Half-fill a two hundred fifty millilitre volumetric flask with distilled water. Pipette in twenty-five point zero millilitres of stock solution, fill to the mark, then stopper and invert.', caption: 'Half-fill a 250 mL volumetric flask with distilled water. Pipette in 25.0 mL of stock solution, fill to the mark, then stopper and invert.', show: 'a' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'How do you make $100.0\\ \\text{mL}$ of a $0.150\\ \\text{mol/L}$ solution from a $1.50\\ \\text{mol/L}$ stock solution, in a $100\\ \\text{mL}$ volumetric flask? When a solution is diluted, $c_1V_1 = c_2V_2$.',
          choices: [
            'Pipette in $10.0\\ \\text{mL}$ of stock, then add $100.0\\ \\text{mL}$ of water.',
            'Pipette in $1.00\\ \\text{mL}$ of stock, then fill to the mark.',
            'Pipette in $10.0\\ \\text{mL}$ of stock, then fill to the mark.',
            'Pipette in $15.0\\ \\text{mL}$ of stock, then fill to the mark.',
          ],
          answer: 2,
          working: '$V_1 = \\dfrac{0.150 \\times 100.0}{1.50} = 10.0\\ \\text{mL}$. Filling a $100\\ \\text{mL}$ flask to the mark makes the final volume exactly $100.0\\ \\text{mL}$.',
        },
      ],
      lines: [
        { say: 'Your turn. How do you make one hundred point zero millilitres of a zero point one five zero moles per litre solution, from a one point five zero moles per litre stock solution, in a one hundred millilitre volumetric flask? Pause the video and try it.', caption: 'Your turn. How do you make 100.0 mL of a 0.150 mol/L solution, from a 1.50 mol/L stock solution, in a 100 mL volumetric flask? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. V one is zero point one five times one hundred, over one point five: ten millilitres. Choice A adds too much water: it makes one hundred ten millilitres of solution, not one hundred.', caption: 'The answer is C. V₁ = 0.150 × 100.0, over 1.50: 10.0 mL. Choice A adds too much water: it makes 110 mL of solution, not 100.0 mL.', show: 'q.answer' },
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
            'A **pipette** delivers an exact volume; a **volumetric flask** holds an exact volume when filled to the mark.',
            'Calculate $V_1$, half-fill the flask with water, pipette in the stock, fill to the mark, then stopper and mix.',
            'Always add acid to water, never water to acid.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A pipette delivers an exact volume, and a volumetric flask holds an exact volume when it is filled to the mark.', show: 'sum.0' },
        { say: 'To make a dilution, calculate V one, half-fill the flask with distilled water, pipette in the stock solution, fill to the mark, then stopper and mix.', caption: 'To make a dilution, calculate V₁, half-fill the flask with distilled water, pipette in the stock solution, fill to the mark, then stopper and mix.', show: 'sum.1' },
        { say: 'And always add acid to water, never water to acid. That completes this lesson on dilution. Well done!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
