import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c30-4-2',
  lessonId: 'c30-4-2',
  title: 'The Equilibrium Constant, Part 1: The Equilibrium Law',
  thumbnailTitle: 'The Equilibrium Law',
  thumbnail: false,
  summary:
    'Three equilibrium mixtures of hydrogen, iodine and hydrogen iodide have different concentrations, but [HI]² / ([H₂][I₂]) is 49.0 every time. The equilibrium law: Kc is the products over the reactants, each concentration raised to the power of its coefficient, and it has the same value at the same temperature. For N₂ + 3H₂ ⇌ 2NH₃, Kc = [NH₃]² / ([N₂][H₂]³).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Equilibrium Focusing on Acid–Base Systems · Part 1', title: 'The Equilibrium Law', subtitle: 'One ratio that stays the same' }],
      lines: [
        { say: 'A factory that makes ammonia needs to know how far its reaction goes. Will the equilibrium mixture be mostly ammonia, or mostly unreacted gas? One number, the equilibrium constant, answers that.', show: 'title' },
        { say: 'This part shows where that number comes from. Later parts cover solids and liquids, what the size of K tells you, ICE tables, and working backwards.' },
      ],
    },
    {
      chapter: 'Three experiments',
      layout: 'center',
      main: [
        { kind: 'math', id: 'eq', size: 'md', lines: ['\\ce{H2(g) + I2(g) <=> 2HI(g)}', '\\text{Ratio 1} = \\dfrac{[\\ce{HI}]}{[\\ce{H2}][\\ce{I2}]} \\qquad \\text{Ratio 2} = \\dfrac{[\\ce{HI}]^2}{[\\ce{H2}][\\ce{I2}]}'] },
        {
          kind: 'table',
          id: 'tb',
          head: ['Experiment', '$[\\ce{H2}]$ (mol/L)', '$[\\ce{I2}]$ (mol/L)', '$[\\ce{HI}]$ (mol/L)', 'Ratio 1', 'Ratio 2'],
          rows: [
            ['1', '0.100', '0.100', '0.700', '$\\bad{70.0}$', '$\\good{49.0}$'],
            ['2', '0.250', '0.0360', '0.664', '$\\bad{73.8}$', '$\\good{49.0}$'],
            ['3', '0.0400', '0.160', '0.560', '$\\bad{87.5}$', '$\\good{49.0}$'],
          ],
        },
      ],
      lines: [
        { say: 'Hydrogen and iodine react to form hydrogen iodide. The table shows three equilibrium mixtures, all at the same temperature, that started with different amounts of gas.', show: ['eq.0', 'tb.0', 'tb.1', 'tb.2'] },
        { say: 'The equilibrium concentrations are different every time. Is anything the same?' },
        { say: 'Divide the hydrogen iodide concentration by the hydrogen and iodine concentrations multiplied together, and you get seventy, then seventy-three point eight, then eighty-seven point five. Not constant.', show: 'eq.1' },
        { say: 'Now square the hydrogen iodide concentration first, using its coefficient, two, as the power. The ratio is forty-nine point zero every time.', focus: ['tb', 'eq.1'] },
        { say: 'That constant ratio is the equilibrium constant.' },
      ],
    },
    {
      chapter: 'The equilibrium law',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['a\\text{A} + b\\text{B} \\rightleftharpoons c\\text{C} + d\\text{D}', 'K_c = \\dfrac{[\\text{C}]^c[\\text{D}]^d}{[\\text{A}]^a[\\text{B}]^b}'] },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Equilibrium constant', md: '$K_c$ is the value of the equilibrium law expression at equilibrium. It is the same for every equilibrium mixture of a reaction **at the same temperature**, and here it is written without units.' },
      ],
      lines: [
        { say: 'Here is the general rule, the equilibrium law. For any reaction, take the products over the reactants, and raise each concentration to the power of its coefficient.', show: 'm.0' },
        { say: 'At equilibrium, the value of this expression is K C, the equilibrium constant.', caption: 'At equilibrium, the value of this expression is Kc, the equilibrium constant.', show: 'm.1', focus: 'm.1' },
        { say: 'K C has the same value for every equilibrium mixture of a reaction, as long as the temperature is the same. Here, it is written without units.', caption: 'Kc has the same value for every equilibrium mixture of a reaction, as long as the temperature is the same. Here, it is written without units.', show: 'def' },
      ],
    },
    {
      chapter: 'Writing an expression',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['\\ce{N2(g) + 3H2(g) <=> 2NH3(g)}', '\\text{Top: } [\\ce{NH3}]^2', '\\text{Bottom: } [\\ce{N2}][\\ce{H2}]^3', 'K_c = \\dfrac{[\\ce{NH3}]^2}{[\\ce{N2}][\\ce{H2}]^3}'],
        },
      ],
      lines: [
        { say: 'Write the expression for the ammonia reaction: nitrogen plus three hydrogen, in equilibrium with two ammonia.', caption: 'Write the expression for the ammonia reaction: N₂ + 3H₂ ⇌ 2NH₃.', show: 'm.0' },
        { say: 'The product, ammonia, goes on top, raised to the power two.', show: 'm.1', focus: 'm.1' },
        { say: 'The reactants go on the bottom, multiplied together: nitrogen to the power one, which is not written, and hydrogen to the power three.', show: 'm.2', focus: 'm.2' },
        { say: 'So K C equals the ammonia concentration squared, over the nitrogen concentration times the hydrogen concentration cubed.', caption: 'So Kc = [NH₃]² over [N₂][H₂]³.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Powers, not multipliers',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{\\dfrac{2[\\ce{NH3}]}{[\\ce{N2}] \\times 3[\\ce{H2}]}} \\qquad \\bad{\\dfrac{[\\ce{NH3}]^2}{[\\ce{N2}] + [\\ce{H2}]^3}}', '\\good{\\dfrac{[\\ce{NH3}]^2}{[\\ce{N2}][\\ce{H2}]^3}}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Powers, not multipliers', md: 'The coefficient 3 in front of $\\ce{H2}$ becomes the power in $[\\ce{H2}]^3$, and the concentrations are **multiplied**. Any other expression is not constant.' },
      ],
      lines: [
        { say: 'Watch for two mistakes. The first writes the coefficients as multipliers: three times the hydrogen concentration, instead of the concentration cubed.', show: 'm.0', focus: 'm.0' },
        { say: 'The second adds the reactant concentrations instead of multiplying them. Neither expression gives a constant value.', show: 'oops' },
        { say: 'Coefficients become powers, and the concentrations on each side are multiplied.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which is the equilibrium law expression for $\\ce{2SO2(g) + O2(g) <=> 2SO3(g)}$?',
          choices: ['$K_c = \\dfrac{[\\ce{SO3}]^2}{[\\ce{SO2}]^2[\\ce{O2}]}$', '$K_c = \\dfrac{[\\ce{SO2}]^2[\\ce{O2}]}{[\\ce{SO3}]^2}$', '$K_c = \\dfrac{2[\\ce{SO3}]}{2[\\ce{SO2}][\\ce{O2}]}$', '$K_c = \\dfrac{[\\ce{SO3}]}{[\\ce{SO2}][\\ce{O2}]}$'],
          answer: 0,
          working: 'Products over reactants, each to the power of its coefficient: $[\\ce{SO3}]^2$ on top, $[\\ce{SO2}]^2[\\ce{O2}]$ on the bottom.',
        },
      ],
      lines: [
        { say: 'Your turn. Which is the equilibrium law expression for two sulfur dye-oxide plus oxygen, in equilibrium with two sulfur trioxide? Pause the video and try it.', caption: 'Your turn. Which is the equilibrium law expression for 2SO₂ + O₂ ⇌ 2SO₃? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A: sulfur trioxide squared on top, over sulfur dye-oxide squared times oxygen. Choice B is upside down, and choice C writes the coefficients as multipliers.', caption: 'The answer is A: sulfur trioxide squared on top, over sulfur dioxide squared times oxygen. Choice B is upside down, and choice C writes the coefficients as multipliers.', show: 'q.answer' },
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
            '$K_c = \\dfrac{[\\text{C}]^c[\\text{D}]^d}{[\\text{A}]^a[\\text{B}]^b}$: products over reactants, each to the power of its coefficient.',
            '$K_c$ is the same for every equilibrium mixture of a reaction **at the same temperature**.',
            'Coefficients become **powers**; concentrations are **multiplied**.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The equilibrium law: products over reactants, each concentration raised to the power of its coefficient.', show: 'sum.0' },
        { say: 'K C is the same for every equilibrium mixture of a reaction, at the same temperature.', caption: 'Kc is the same for every equilibrium mixture of a reaction, at the same temperature.', show: 'sum.1' },
        { say: 'Coefficients become powers, and concentrations are multiplied. In part two, you will see what to leave out of the expression, and what the size of K tells you. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
