import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'cx-6-3',
  lessonId: 'cx-6-3',
  title: 'Hydrogen Fuel Cells and Batteries',
  thumbnail: false,
  summary:
    'A cell makes electricity from a chemical reaction, and a battery is cells in series, whose voltages add. Non-rechargeable cells stop when a reactant runs out; rechargeable ones are reversed by a current. A hydrogen fuel cell makes only water: hydrogen is oxidised at the negative electrode and oxygen reduced at the positive one.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Materials and Industry', title: 'Hydrogen Fuel Cells and Batteries', subtitle: 'Electricity from chemical reactions' }],
      lines: [
        { say: 'A torch battery is thrown away when it goes flat. A phone battery is plugged in to charge. And a hydrogen bus is simply refilled.', show: 'title' },
        { say: 'In this lesson, you will compare cells, batteries and fuel cells, and write the half equations for a hydrogen fuel cell.' },
      ],
    },
    {
      chapter: 'Cells and batteries',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Cell and battery', md: 'A **cell** makes electricity from a chemical reaction. A **battery** is two or more cells in series, whose voltages add.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['4 \\times 1.5\\ \\text{V} = 6\\ \\text{V}'] },
      ],
      lines: [
        { say: 'A cell contains chemicals that react to produce a voltage. A battery is two or more cells connected in series, so their voltages add up.', show: 'def' },
        { say: 'Four cells of one point five volts each make a battery of six volts.', caption: 'Four cells of 1.5 V each make a battery of 6 V.', show: 'm', focus: 'm' },
        { say: 'In a non-rechargeable cell, the reaction stops when one reactant is used up. In a rechargeable cell, the reaction can be reversed by an external current.' },
      ],
    },
    {
      chapter: 'Hydrogen fuel cells',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Fuel cell', md: 'Supplied continuously with a fuel and oxygen; the fuel is oxidised to produce a voltage, for as long as it is supplied.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{2H2 + O2 -> 2H2O}'] },
      ],
      lines: [
        { say: 'A fuel cell is supplied continuously with a fuel and oxygen, and keeps working as long as the fuel is supplied.', show: 'def' },
        { say: 'In a hydrogen fuel cell, hydrogen and oxygen react to make water. Water is the only product.', caption: 'In a hydrogen fuel cell, hydrogen and oxygen react to make water: 2H₂ + O₂ → 2H₂O. Water is the only product.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'The half equations',
      layout: 'center',
      main: [{ kind: 'table', id: 't', head: ['Electrode', 'Half equation', ''], rows: [['Negative', '$\\ce{2H2 -> 4H+ + 4e-}$', 'Oxidation'], ['Positive', '$\\ce{O2 + 4H+ + 4e- -> 2H2O}$', 'Reduction']] }],
      lines: [
        { say: 'With an acidic electrolyte, at the negative electrode, hydrogen loses electrons and forms hydrogen ions. Losing electrons is oxidation.', caption: 'With an acidic electrolyte, at the negative electrode, hydrogen loses electrons: 2H₂ → 4H⁺ + 4e⁻. Losing electrons is oxidation.', show: 't.0', focus: 't.0' },
        { say: 'At the positive electrode, oxygen gains those electrons and joins the hydrogen ions to make water. Gaining electrons is reduction.', caption: 'At the positive electrode, oxygen gains the electrons: O₂ + 4H⁺ + 4e⁻ → 2H₂O. Gaining electrons is reduction.', show: 't.1', focus: 't.1' },
        { say: 'Add the two halves, and the hydrogen ions and electrons cancel, leaving the overall equation.' },
      ],
    },
    {
      chapter: 'Fuel cell or battery?',
      layout: 'center',
      main: [{ kind: 'table', id: 't', head: ['', 'Fuel cell', 'Rechargeable battery'], rows: [['Products', 'Only water', 'Toxic metals to dispose of'], ['Topping up', 'Refilled in minutes', 'Slow to recharge'], ['Drawback', 'Hydrogen is hard to store', 'Heavy; wears out']] }],
      lines: [
        { say: 'A fuel cell produces only water, while old batteries contain toxic metals that must be disposed of safely.', show: 't.0', focus: 't.0' },
        { say: 'A fuel cell is refilled in minutes, while a battery takes much longer to recharge.', show: 't.1', focus: 't.1' },
        { say: 'But hydrogen is flammable and hard to store, and it is often made from fossil fuels.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In a hydrogen fuel cell, what happens to the hydrogen at the negative electrode?',
          choices: ['It is reduced: it gains electrons', 'It is oxidised: $\\ce{2H2 -> 4H+ + 4e-}$', 'It is reduced: $\\ce{O2 + 4H+ + 4e- -> 2H2O}$', 'It is unchanged'],
          answer: 1,
          working: 'Hydrogen **loses** electrons, which is oxidation.',
        },
      ],
      lines: [
        { say: 'Your turn. In a hydrogen fuel cell, what happens to the hydrogen at the negative electrode? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Hydrogen loses electrons and forms hydrogen ions, which is oxidation. Choice C is the half equation at the positive electrode.', show: 'q.answer' },
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
          items: ['A battery is cells in series; their voltages add.', 'A hydrogen fuel cell makes only water.', 'Negative electrode: hydrogen is oxidised.', 'Positive electrode: oxygen is reduced.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A battery is cells in series, and their voltages add.', show: 'sum.0' },
        { say: 'A hydrogen fuel cell makes only water, and works as long as hydrogen is supplied.', show: 'sum.1' },
        { say: 'At the negative electrode, hydrogen is oxidised.', show: 'sum.2' },
        { say: 'And at the positive electrode, oxygen is reduced. Remember: oxidation is loss, reduction is gain.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
