import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'cx-10-4',
  lessonId: 'cx-10-4',
  title: 'The Equilibrium Constant Kp',
  thumbnail: false,
  summary:
    'For gas equilibria, Kp uses partial pressures: the mole fraction of each gas times the total pressure, raised to its number of moles in the equation. Use the moles at equilibrium. Kp depends only on temperature: for an exothermic forward reaction a higher temperature lowers it, while pressure changes and catalysts leave it unchanged.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'A Level Physical Chemistry', title: 'The Equilibrium Constant Kp', subtitle: 'Equilibrium in pressures' }],
      lines: [
        { say: 'For reactions between gases, it is easier to measure pressures than concentrations. So for gas equilibria, such as the Haber process, chemists use an equilibrium constant written in pressures, called K p.', caption: 'For reactions between gases, it is easier to measure pressures than concentrations. So for gas equilibria, such as the Haber process, chemists use an equilibrium constant written in pressures, called Kp.', show: 'title' },
        { say: 'In this lesson, you will calculate partial pressures and K p, and explain what changes it.', caption: 'In this lesson, you will calculate partial pressures and Kp, and explain what changes it.' },
      ],
    },
    {
      chapter: 'Partial pressures',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{mole fraction} = \\dfrac{\\text{moles of the gas}}{\\text{total moles of gas}}', 'p(\\ce{A}) = \\text{mole fraction of A} \\times \\text{total pressure}'] }],
      lines: [
        { say: 'The partial pressure of a gas is the pressure it would exert if it filled the container on its own.' },
        { say: 'First find its mole fraction: its moles divided by the total moles of gas.', show: 'm.0', focus: 'm.0' },
        { say: 'Then multiply by the total pressure.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Calculating Kp',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\ce{N2O4 <=> 2NO2}', '0.80\\text{ mol } \\ce{N2O4},\\ 0.40\\text{ mol } \\ce{NO2},\\ 1.20\\text{ mol in all}', 'K_p = \\dfrac{p(\\ce{NO2})^2}{p(\\ce{N2O4})} = \\dfrac{33.3^2}{66.7} = 16.7\\ \\text{kPa}'] }],
      lines: [
        { say: 'One mole of dinitrogen tetroxide is heated until twenty percent has dissociated. The total pressure is one hundred kilopascals.', caption: 'One mole of N₂O₄ is heated until 20% has dissociated. The total pressure is 100 kPa.', show: 'm.0', focus: 'm.0' },
        { say: 'At equilibrium there are zero point eight moles left, and zero point four moles of nitrogen dioxide, which is one point two moles in all.', caption: 'At equilibrium there are 0.80 mol of N₂O₄ left, and 0.40 mol of NO₂, which is 1.20 mol in all.', show: 'm.1', focus: 'm.1' },
        { say: 'So the partial pressures are sixty-six point seven and thirty-three point three. Square the nitrogen dioxide, because there are two moles of it, and divide. K p is sixteen point seven kilopascals.', caption: 'So the partial pressures are 66.7 and 33.3 kPa. Square the NO₂, because there are two moles of it, and divide. Kp is 16.7 kPa.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'What changes Kp?',
      layout: 'center',
      main: [{ kind: 'table', id: 't', head: ['Change', 'Effect on Kp'], rows: [['Temperature', 'changes it'], ['Pressure', 'no change'], ['Catalyst', 'no change']] }],
      lines: [
        { say: 'Only temperature changes K p. If the forward reaction is exothermic, raising the temperature moves the equilibrium left, and K p falls.', caption: 'Only temperature changes Kp. If the forward reaction is exothermic, raising the temperature moves the equilibrium left, and Kp falls.', show: 't.0', focus: 't.0' },
        { say: 'Changing the pressure may move the position of equilibrium, but the partial pressures adjust and K p stays the same.', caption: 'Changing the pressure may move the position of equilibrium, but the partial pressures adjust and Kp stays the same.', show: 't.1', focus: 't.1' },
        { say: 'And a catalyst speeds up both directions equally, so it does not change K p either.', caption: 'And a catalyst speeds up both directions equally, so it does not change Kp either.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'An equilibrium mixture has 1.0 mol of nitrogen, 3.0 mol of hydrogen and 1.0 mol of ammonia at 200 kPa. What is the partial pressure of hydrogen?',
          choices: ['600 kPa', '67 kPa', '120 kPa', '3.0 kPa'],
          answer: 2,
          working: 'Mole fraction $= \\dfrac{3.0}{5.0} = 0.60$, so $p = 0.60 \\times 200 = 120$ kPa.',
        },
      ],
      lines: [
        { say: 'Your turn. An equilibrium mixture has one mole of nitrogen, three moles of hydrogen and one mole of ammonia, at two hundred kilopascals. What is the partial pressure of hydrogen? Pause the video and try it.', caption: 'Your turn. An equilibrium mixture has 1.0 mol of nitrogen, 3.0 mol of hydrogen and 1.0 mol of ammonia, at 200 kPa. What is the partial pressure of hydrogen? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, one hundred twenty kilopascals. Hydrogen is three moles out of five, a mole fraction of zero point six, and zero point six times two hundred is one hundred twenty.', caption: 'The answer is C, 120 kPa. Hydrogen is 3 mol out of 5, a mole fraction of 0.60, and 0.60 × 200 = 120.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Partial pressure = mole fraction × total pressure.', 'Kp uses partial pressures of the gases at equilibrium.', 'Only temperature changes Kp.', 'Pressure and catalysts leave Kp unchanged.'] }],
      lines: [
        { say: 'Let’s sum up. A partial pressure is the mole fraction times the total pressure.', show: 'sum.0' },
        { say: 'K p uses the partial pressures of the gases at equilibrium.', caption: 'Kp uses the partial pressures of the gases at equilibrium.', show: 'sum.1' },
        { say: 'Only temperature changes K p.', caption: 'Only temperature changes Kp.', show: 'sum.2' },
        { say: 'And pressure and catalysts leave it unchanged.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
