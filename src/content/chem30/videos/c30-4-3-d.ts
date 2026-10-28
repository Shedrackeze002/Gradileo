import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c30-4-3-d',
  lessonId: 'c30-4-3',
  title: "Le Châtelier's Principle, Part 4: Temperature, K and Catalysts",
  thumbnailTitle: 'Temperature, K and Catalysts',
  thumbnail: false,
  summary:
    'Treat energy as a product of an exothermic reaction and a reactant of an endothermic one: raising the temperature shifts an equilibrium in the endothermic direction, so heating N₂O₄ ⇌ 2NO₂ (ΔH = +57 kJ) makes more brown NO₂. Only a change in temperature changes Kc: it increases with temperature for an endothermic reaction and decreases for an exothermic one. A catalyst speeds up both reactions equally, so equilibrium arrives sooner, but its position and Kc do not change.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Equilibrium Focusing on Acid–Base Systems · Part 4', title: 'Temperature, K and Catalysts', subtitle: 'The one change that moves K' }],
      lines: [
        { say: 'Put a sealed flask of brown nitrogen dioxide in hot water, and its colour darkens. In ice, it fades. Temperature shifts an equilibrium too, but unlike any other change, it also changes K C.', caption: 'Put a sealed flask of brown nitrogen dioxide in hot water, and its colour darkens. In ice, it fades. Temperature shifts an equilibrium too, but unlike any other change, it also changes Kc.', show: 'title' },
        { say: 'In this part, you will predict the effect of temperature, see why it changes K C, and what a catalyst does.', caption: 'In this part, you will predict the effect of temperature, see why it changes Kc, and what a catalyst does.' },
      ],
    },
    {
      chapter: 'Energy as a reactant or product',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'm',
          head: ['Equilibrium', '$\\Delta H$', 'Energy is'],
          rows: [
            ['$\\ce{N2(g) + 3H2(g) <=> 2NH3(g)} + \\text{energy}$', '$-92\\ \\text{kJ}$', 'a product (exothermic)'],
            ['$\\text{energy} + \\ce{N2O4(g) <=> 2NO2(g)}$', '$+57\\ \\text{kJ}$', 'a reactant (endothermic)'],
          ],
        },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Temperature', md: '**Raising** the temperature adds energy: the system shifts in the **endothermic** direction, which uses energy up. **Lowering** it shifts the system in the **exothermic** direction.' },
      ],
      lines: [
        { say: 'To predict the effect of temperature, treat energy as if it were a reactant or a product.' },
        { say: 'An exothermic forward reaction, with a negative delta H, gives out energy, so energy is a product. The ammonia reaction, with delta H equal to minus ninety-two kilojoules, is one.', caption: 'An exothermic forward reaction, with a negative ΔH, gives out energy, so energy is a product. The ammonia reaction, with ΔH = −92 kJ, is one.', show: 'm.0', focus: 'm.0' },
        { say: 'An endothermic forward reaction, with a positive delta H, takes energy in, so energy is a reactant.', caption: 'An endothermic forward reaction, with a positive ΔH, takes energy in, so energy is a reactant.', show: 'm.1', focus: 'm.1' },
        { say: 'Raising the temperature adds energy, so the system shifts in the direction that uses energy up: the endothermic direction. Lowering the temperature shifts it the exothermic way.', show: 'key', focus: 'key' },
        { say: 'For dye-nitrogen tetroxide, delta H is plus fifty-seven kilojoules, so energy is a reactant. In hot water, the system shifts right to use the energy up. More brown nitrogen dioxide forms, and the colour darkens.', caption: 'For dinitrogen tetroxide, ΔH is +57 kJ, so energy is a reactant. In hot water, the system shifts right to use the energy up. More brown nitrogen dioxide forms, and the colour darkens.', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Temperature changes K',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'tb',
          head: ['Forward reaction', 'Heating shifts it', 'At the new equilibrium', '$K_c$'],
          rows: [
            ['Endothermic', 'right', 'more products, fewer reactants', '**increases**'],
            ['Exothermic', 'left', 'fewer products, more reactants', '**decreases**'],
          ],
        },
      ],
      lines: [
        { say: 'After a change in concentration or volume, the system shifts until the ratio in the expression is back at the same K C. A change in temperature is different: it changes the value of K C itself.', caption: 'After a change in concentration or volume, the system shifts until the ratio in the expression is back at the same Kc. A change in temperature is different: it changes the value of Kc itself.' },
        { say: 'If heating shifts an equilibrium to the right, there are more products and fewer reactants at the new equilibrium, so K C increases. That happens for endothermic reactions.', caption: 'If heating shifts an equilibrium to the right, there are more products and fewer reactants at the new equilibrium, so Kc increases. That happens for endothermic reactions.', show: 'tb.0', focus: 'tb.0' },
        { say: 'If heating shifts it to the left, K C decreases. That happens for exothermic reactions.', caption: 'If heating shifts it to the left, Kc decreases. That happens for exothermic reactions.', show: 'tb.1', focus: 'tb.1' },
      ],
    },
    {
      chapter: 'Catalysts',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'cat', tone: 'definition', title: 'Catalysts and equilibrium', md: 'A **catalyst** lowers the activation energy of the forward and the reverse reactions by the same amount, so it speeds both up equally. Equilibrium arrives **sooner**, but its position and $K_c$ do not change.' },
        {
          kind: 'table',
          id: 'tb',
          head: ['Change', 'Shift', 'Effect on $K_c$'],
          rows: [
            ['Add a reactant, or remove a product', 'right', 'none'],
            ['Decrease the volume', 'towards fewer gas molecules', 'none'],
            ['Raise the temperature', 'endothermic direction', '**changes**'],
            ['Add a catalyst', 'none', 'none'],
          ],
        },
      ],
      lines: [
        { say: 'A catalyst lowers the activation energy of the forward and reverse reactions by the same amount, so it speeds both up equally.', show: 'cat' },
        { say: 'Equilibrium arrives sooner, but its position and K C do not change.', caption: 'Equilibrium arrives sooner, but its position and Kc do not change.' },
        { say: 'Here are the changes together. Only a change in temperature changes K C.', caption: 'Here are the changes together. Only a change in temperature changes Kc.', show: ['tb.0', 'tb.1', 'tb.2', 'tb.3'], focus: 'tb.2' },
        { say: 'That is why making ammonia is a compromise. A low temperature gives a bigger yield, but is too slow. So manufacturers use a moderate temperature, a high pressure and a catalyst, and remove the ammonia as it forms.', focus: 'tb' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'For $\\ce{2SO2(g) + O2(g) <=> 2SO3(g)}$, $K_c$ is $2.5 \\times 10^{3}$ at $300^\\circ\\text{C}$ and $34$ at $500^\\circ\\text{C}$ (values for this question). Is the forward reaction exothermic or endothermic?',
          choices: ['Endothermic: $K_c$ falls as the temperature rises.', 'Exothermic: $K_c$ is greater than 1.', 'Neither: $K_c$ does not depend on temperature.', 'Exothermic: $K_c$ falls as the temperature rises.'],
          answer: 3,
          working: '$K_c$ falls as the temperature rises, so heating shifts the equilibrium left: the reverse reaction is endothermic, and the forward reaction exothermic.',
        },
      ],
      lines: [
        { say: 'Your turn. For the sulfur trioxide reaction, K C is two point five times ten cubed at three hundred degrees Celsius, and thirty-four at five hundred degrees Celsius. Is the forward reaction exothermic or endothermic? Pause the video and try it.', caption: 'Your turn. For 2SO₂ + O₂ ⇌ 2SO₃, Kc is 2.5 × 10³ at 300 °C, and 34 at 500 °C. Is the forward reaction exothermic or endothermic? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. K C gets smaller as the temperature rises, so heating shifts the equilibrium left. Heating favours the endothermic direction, so the reverse reaction is endothermic, and the forward reaction is exothermic.', caption: 'The answer is D. Kc gets smaller as the temperature rises, so heating shifts the equilibrium left. Heating favours the endothermic direction, so the reverse reaction is endothermic, and the forward reaction is exothermic.', show: 'q.answer' },
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
            'Treat energy as a product (exothermic) or a reactant (endothermic): heating shifts the equilibrium in the **endothermic** direction.',
            'Only a change in **temperature** changes $K_c$: up for endothermic, down for exothermic.',
            'A **catalyst** makes equilibrium arrive sooner, but changes neither its position nor $K_c$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Treat energy as a product or a reactant. Heating shifts an equilibrium in the endothermic direction.', show: 'sum.0' },
        { say: 'Only a change in temperature changes K C: it increases for an endothermic reaction, and decreases for an exothermic one.', caption: 'Only a change in temperature changes Kc: it increases for an endothermic reaction, and decreases for an exothermic one.', show: 'sum.1' },
        { say: 'A catalyst makes equilibrium arrive sooner, but changes neither its position nor K C. That completes this lesson. Next, you will meet acids and bases as proton donors and acceptors.', caption: 'A catalyst makes equilibrium arrive sooner, but changes neither its position nor Kc. That completes this lesson. Next, you will meet acids and bases as proton donors and acceptors.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
