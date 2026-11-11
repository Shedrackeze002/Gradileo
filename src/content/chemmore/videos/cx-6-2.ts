import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'cx-6-2',
  lessonId: 'cx-6-2',
  title: 'The Haber Process and Fertilisers',
  thumbnail: false,
  summary:
    'The Haber process makes ammonia from nitrogen (from the air) and hydrogen (from natural gas) in a reversible reaction, over an iron catalyst at about 450 °C and 200 atmospheres; these are compromises between yield, rate and cost. NPK fertilisers supply nitrogen, phosphorus and potassium.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Materials and Industry', title: 'The Haber Process and Fertilisers', subtitle: 'Turning the air into food' }],
      lines: [
        { say: 'The air is mostly nitrogen, and every plant needs nitrogen to grow. But plants cannot use the nitrogen in the air. Turning it into fertiliser is one of the most important reactions in industry.', show: 'title' },
        { say: 'In this lesson, you will describe the Haber process and its compromise conditions, and see what N P K fertilisers supply.', caption: 'In this lesson, you will describe the Haber process and its compromise conditions, and see what NPK fertilisers supply.' },
      ],
    },
    {
      chapter: 'The Haber process',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'The Haber process', md: 'Makes **ammonia** from nitrogen and hydrogen in a reversible reaction.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{N2 + 3H2 <=> 2NH3}'] },
        { kind: 'bullets', id: 'b', items: ['Nitrogen from the air; hydrogen from natural gas', 'Iron catalyst, about 450 °C and 200 atmospheres', 'Ammonia cooled and removed; unreacted gases recycled'] },
      ],
      lines: [
        { say: 'The Haber process makes ammonia from nitrogen and hydrogen. One nitrogen molecule reacts with three hydrogen molecules to make two ammonia molecules, and the reaction is reversible.', caption: 'The Haber process makes ammonia: N₂ + 3H₂ ⇌ 2NH₃. The reaction is reversible.', show: ['def', 'm'], focus: 'm' },
        { say: 'The nitrogen comes from the air, and the hydrogen is made from natural gas.', show: 'b.0' },
        { say: 'The gases pass over an iron catalyst at about four hundred fifty degrees Celsius and two hundred atmospheres.', caption: 'The gases pass over an iron catalyst at about 450 °C and 200 atmospheres.', show: 'b.1' },
        { say: 'Only some react on each pass. The ammonia is cooled, so it liquefies and is removed, and the unreacted gases are recycled.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Compromise conditions',
      layout: 'center',
      main: [{ kind: 'table', id: 't', head: ['Condition', 'For yield', 'But'], rows: [['Temperature', 'Lower is better (exothermic)', 'Too slow'], ['Pressure', 'Higher is better (fewer gas molecules)', 'Expensive, less safe'], ['Catalyst', 'No effect', 'Speeds it up']] }],
      lines: [
        { say: 'The forward reaction is exothermic, so a lower temperature would give a higher yield. But then the reaction would be far too slow, so a moderate temperature is a compromise.', show: 't.0', focus: 't.0' },
        { say: 'Four molecules of gas become two, so a higher pressure gives a higher yield. But very high pressures need expensive, strong equipment and more energy, so two hundred atmospheres is a compromise too.', caption: 'Four molecules of gas become two, so a higher pressure gives a higher yield. But very high pressures need expensive, strong equipment and more energy, so 200 atmospheres is a compromise too.', show: 't.1', focus: 't.1' },
        { say: 'The iron catalyst does not change the yield. It just makes the reaction faster.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'NPK fertilisers',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'NPK fertiliser', md: 'Supplies **nitrogen** (N), **phosphorus** (P) and **potassium** (K), the elements plants need most.' },
        { kind: 'bullets', id: 'b', items: ['Ammonia + acid → ammonium salts', 'Potassium chloride and sulfate are mined', 'Phosphate rock is treated with acid'] },
      ],
      lines: [
        { say: 'An N P K fertiliser supplies nitrogen, phosphorus and potassium, the three elements plants need most.', caption: 'An NPK fertiliser supplies nitrogen, phosphorus and potassium, the three elements plants need most.', show: 'def' },
        { say: 'Ammonia is neutralised by nitric or sulfuric acid to make ammonium salts.', show: 'b.0' },
        { say: 'Potassium chloride and potassium sulfate are mined and used directly.', show: 'b.1' },
        { say: 'Phosphate rock is mined too, but it does not dissolve, so it is treated with acid to make soluble salts.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Why is the Haber process **not** run at a low temperature, which would give a higher yield?',
          choices: ['The catalyst would melt', 'The yield would fall', 'The reaction would be too slow', 'Ammonia would not form at all'],
          answer: 2,
          working: 'A moderate temperature is a **compromise**: a lower yield, but ammonia is made fast enough.',
        },
      ],
      lines: [
        { say: 'Your turn. Why is the Haber process not run at a low temperature, which would give a higher yield? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. At a low temperature, the reaction would be far too slow. A moderate temperature is a compromise between yield and rate.', show: 'q.answer' },
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
          items: ['N₂ + 3H₂ ⇌ 2NH₃: nitrogen from air, hydrogen from natural gas.', 'Iron catalyst, about 450 °C and 200 atmospheres.', 'The conditions are compromises between yield, rate and cost.', 'NPK fertilisers supply nitrogen, phosphorus and potassium.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The Haber process makes ammonia from nitrogen in the air and hydrogen from natural gas.', show: 'sum.0' },
        { say: 'It uses an iron catalyst, at about four hundred fifty degrees and two hundred atmospheres.', caption: 'It uses an iron catalyst, at about 450 °C and 200 atmospheres.', show: 'sum.1' },
        { say: 'These conditions are compromises between yield, rate and cost.', show: 'sum.2' },
        { say: 'And N P K fertilisers supply nitrogen, phosphorus and potassium.', caption: 'And NPK fertilisers supply nitrogen, phosphorus and potassium.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
