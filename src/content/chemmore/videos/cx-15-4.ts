import type { Explainer } from '@/video/script.ts';
import { noPrecipitate, precipitating } from '../../chem20/videos/lib/c20-particles.ts';

const video: Explainer = {
  id: 'cx-15-4',
  lessonId: 'cx-15-4',
  title: 'The Solubility Product',
  thumbnail: 'pr',
  summary:
    'The solubility product, Ksp, is the product of the ion concentrations of a sparingly soluble salt in a saturated solution, each raised to its coefficient, with the solid left out. For a 1 : 1 salt Ksp = s², and for a 1 : 2 salt Ksp = 4s³. If the ionic product Q is greater than Ksp a precipitate forms, and if it is less, none does. A common ion lowers solubility, and acid raises the solubility of a salt with a basic anion.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Solutions, Salts and Solubility', title: 'The Solubility Product', subtitle: 'How much of an insoluble salt dissolves' }],
      lines: [
        { say: 'Silver chloride is called insoluble, yet a tiny amount of it does dissolve, and that tiny amount follows strict rules.', show: 'title' },
        { say: 'In this lesson, you will write solubility product expressions, find molar solubility, and predict whether a precipitate forms.' },
      ],
    },
    {
      chapter: 'A precipitate forms',
      layout: 'center',
      main: [precipitating('pr')],
      lines: [
        { say: 'Here are silver nitrate and sodium chloride solutions, just mixed.', show: ['pr', 'pr.labels', 'pr.key'] },
        { say: 'Wherever a silver ion meets a chloride ion, the two lock together and sink as solid silver chloride. Far more of these ions are here than water can hold together, so they come out of solution.', play: 'pr.mix' },
        { say: 'A tiny number stay dissolved, in balance with the solid. That balance is what the solubility product describes.' },
      ],
    },
    {
      chapter: 'The expression',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Solubility product', md: '$K_{sp}$ is the product of the ion concentrations in a saturated solution, each raised to the power of its coefficient. The solid is left out.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['K_{sp}(\\ce{AgCl}) = [\\ce{Ag+}][\\ce{Cl-}]', 'K_{sp}(\\ce{PbI2}) = [\\ce{Pb^2+}][\\ce{I-}]^2'] },
      ],
      lines: [
        { say: 'The solubility product, K s p, is the equilibrium constant for a sparingly soluble salt dissolving. It is the product of the ion concentrations, each raised to the power of its coefficient. The solid is left out, because its concentration does not change.', caption: 'The solubility product, Ksp, is the equilibrium constant for a sparingly soluble salt dissolving. It is the product of the ion concentrations, each raised to the power of its coefficient. The solid is left out, because its concentration does not change.', show: 'def' },
        { say: 'So for silver chloride, it is the silver ion concentration times the chloride ion concentration. For lead two iodide, the iodide concentration is squared, because each formula unit gives two iodide ions.', caption: 'So for silver chloride, it is [Ag⁺][Cl⁻]. For lead(II) iodide, the iodide concentration is squared, because each formula unit gives two iodide ions.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Molar solubility',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{1 : 1 salt: } K_{sp} = s^2', '\\text{1 : 2 salt: } K_{sp} = s(2s)^2 = 4s^3', 's^3 = \\dfrac{7.1 \\times 10^{-9}}{4} \\quad\\Rightarrow\\quad s = 1.21 \\times 10^{-3}\\ \\text{mol dm}^{-3}'] },
      ],
      lines: [
        { say: 'If s moles per cubic decimetre dissolve, a one to one salt gives s of each ion, so K s p equals s squared.', caption: 'If s mol dm⁻³ dissolve, a 1 : 1 salt gives s of each ion, so Ksp = s².', show: 'm.0' },
        { say: 'Lead two iodide gives s of lead ions and two s of iodide ions, so K s p is s times two s squared, which is four s cubed.', caption: 'Lead(II) iodide gives s of lead ions and 2s of iodide ions, so Ksp = s(2s)² = 4s³.', show: 'm.1' },
        { say: 'With a K s p of seven point one times ten to the minus nine, s cubed is that over four, so s is one point two one times ten to the minus three moles per cubic decimetre.', caption: 'With a Ksp of 7.1 × 10⁻⁹, s³ is that over 4, so s = 1.21 × 10⁻³ mol dm⁻³.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Will it precipitate?',
      layout: 'center',
      main: [noPrecipitate('np'), { kind: 'math', id: 'm', size: 'md', lines: ['Q > K_{sp}: \\text{ precipitate} \\qquad Q < K_{sp}: \\text{ none}'] }],
      lines: [
        { say: 'Here, the ions in the mixture could only form salts that are soluble, so they just keep moving: no precipitate.', show: ['np', 'np.labels'] },
        { say: 'To predict precipitation, work out the ionic product Q from the concentrations in the mixture, in the same form as K s p. Mixing equal volumes halves each concentration. If Q is greater than K s p, a precipitate forms. If it is smaller, none does.', caption: 'To predict precipitation, work out the ionic product Q from the concentrations in the mixture, in the same form as Ksp. Mixing equal volumes halves each concentration. If Q > Ksp, a precipitate forms. If it is smaller, none does.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Common ions and pH',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'c', tone: 'key', title: 'The common ion effect', md: 'A salt is **less soluble** in a solution that already holds one of its ions: silver chloride dissolves less in sodium chloride solution.' },
        { kind: 'callout', id: 'p', tone: 'key', title: 'The effect of pH', md: 'A salt whose anion is a base (a hydroxide, carbonate or fluoride) is **more soluble in acid**.' },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Compare like with like', md: 'A smaller $K_{sp}$ means less soluble only for salts of the **same formula type**.' },
      ],
      lines: [
        { say: 'A salt is less soluble in a solution that already holds one of its ions. In sodium chloride solution, the chloride is already there, so less silver chloride can dissolve. This is the common ion effect.', show: 'c' },
        { say: 'And a salt whose anion is a base, such as a hydroxide or a carbonate, is more soluble in acid, because the hydrogen ions remove the anion and more solid dissolves to replace it.', show: 'p' },
        { say: 'One warning: compare K s p values directly only for salts of the same formula type, such as two one to one salts.', caption: 'One warning: compare Ksp values directly only for salts of the same formula type, such as two 1 : 1 salts.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: '$K_{sp}$ for silver bromide is $5.0 \\times 10^{-13}$. What is its molar solubility?',
          choices: ['$2.5 \\times 10^{-13}\\ \\text{mol dm}^{-3}$', '$7.1 \\times 10^{-7}\\ \\text{mol dm}^{-3}$', '$5.0 \\times 10^{-13}\\ \\text{mol dm}^{-3}$', '$1.0 \\times 10^{-6}\\ \\text{mol dm}^{-3}$'],
          answer: 1,
          working: 'AgBr is a 1 : 1 salt, so $s = \\sqrt{5.0 \\times 10^{-13}} = 7.1 \\times 10^{-7}$.',
        },
      ],
      lines: [
        { say: 'Your turn. K s p for silver bromide is five point zero times ten to the minus thirteen. What is its molar solubility? Pause the video and try it.', caption: 'Your turn. Ksp for silver bromide is 5.0 × 10⁻¹³. What is its molar solubility? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Silver bromide is a one to one salt, so s is the square root of K s p, which is seven point one times ten to the minus seven moles per cubic decimetre.', caption: 'The answer is B. Silver bromide is a 1 : 1 salt, so s is the square root of Ksp, which is 7.1 × 10⁻⁷ mol dm⁻³.', show: 'q.answer' },
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
            'Ksp is the product of the ion concentrations, with powers; the solid is left out.',
            '1 : 1 salt: Ksp = s². 1 : 2 salt: Ksp = 4s³.',
            'Q > Ksp: a precipitate forms. Q < Ksp: none.',
            'A common ion lowers solubility; acid raises it for basic anions.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. K s p is the product of the ion concentrations, each raised to its coefficient, with the solid left out.', caption: 'Let’s sum up. Ksp is the product of the ion concentrations, each raised to its coefficient, with the solid left out.', show: 'sum.0' },
        { say: 'For a one to one salt, K s p is s squared, and for a one to two salt, it is four s cubed.', caption: 'For a 1 : 1 salt, Ksp is s², and for a 1 : 2 salt, it is 4s³.', show: 'sum.1' },
        { say: 'If Q is greater than K s p, a precipitate forms; if it is smaller, none does.', caption: 'If Q is greater than Ksp, a precipitate forms; if it is smaller, none does.', show: 'sum.2' },
        { say: 'And a common ion lowers solubility, while acid raises the solubility of a salt with a basic anion.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
