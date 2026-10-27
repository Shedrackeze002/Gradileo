import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c20-3-8-b',
  lessonId: 'c20-3-8',
  title: 'Strong and Weak Acids and Bases, Part 2: Strength and Concentration',
  thumbnailTitle: 'Strength and Concentration',
  thumbnail: false,
  summary:
    'Concentration says how much acid was dissolved; strength says how much of it ionises, so a strong acid can be dilute and a weak acid concentrated. At the same concentration, a strong acid has a much higher [H₃O⁺] than a weak acid: a lower pH, better conductivity and a faster reaction with magnesium. 0.10 mol/L hydrochloric acid has a pH of 1.00, and 0.10 mol/L acetic acid about 2.9.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Matter as Solutions, Acids and Bases · Part 2', title: 'Strength and Concentration', subtitle: 'Two different ideas' }],
      lines: [
        { say: 'A strong cup of coffee has plenty dissolved in it. In everyday speech, strong often means concentrated. In chemistry, strong and concentrated mean different things.', show: 'title' },
        { say: 'In this part, you will tell strength from concentration, and compare a strong and a weak acid of the same concentration.' },
      ],
    },
    {
      chapter: 'Two different ideas',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Strength and concentration', md: '**Concentration** says how much acid was dissolved: the moles of acid per litre of solution. **Strength** says how much of it ionises: all of it for a strong acid, a small fraction for a weak one.' },
        {
          kind: 'table',
          id: 't',
          head: ['', 'Strong acid', 'Weak acid'],
          rows: [
            ['Concentrated', '$6.0\\ \\text{mol/L}$ $\\ce{HCl}$', '$6.0\\ \\text{mol/L}$ $\\ce{CH3COOH}$'],
            ['Dilute', '$0.0010\\ \\text{mol/L}$ $\\ce{HCl}$', '$0.0010\\ \\text{mol/L}$ $\\ce{CH3COOH}$'],
          ],
        },
      ],
      lines: [
        { say: 'Concentration says how much acid was dissolved: the moles of acid per litre of solution. Strength says how much of it ionises: all of it for a strong acid, a small fraction for a weak one.', show: 'def' },
        { say: 'Any acid can be made concentrated or dilute, by changing how much of it is dissolved. But nothing you do to the solution changes whether the acid is strong or weak.' },
        { say: 'So all four combinations exist. Six point zero moles per litre hydrochloric acid is strong and concentrated. Zero point zero zero one zero moles per litre acetic acid is weak and dilute.', caption: 'So all four combinations exist. 6.0 mol/L hydrochloric acid is strong and concentrated. 0.0010 mol/L acetic acid is weak and dilute.', show: 't' },
        { say: 'A dilute strong acid can even hold fewer hydronium ions than a concentrated weak acid. So to compare strengths fairly, compare solutions of the same concentration.' },
      ],
    },
    {
      chapter: 'Same concentration, different acids',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['$0.10\\ \\text{mol/L}$ solution', 'Hydrochloric acid', 'Acetic acid'],
          rows: [
            ['$[\\ce{H3O+}]$', '$0.10\\ \\text{mol/L}$', 'about $1.3 \\times 10^{-3}\\ \\text{mol/L}$'],
            ['pH', '1.00', 'about 2.9'],
            ['Conductivity', 'high', 'low'],
            ['With magnesium ribbon', 'fast fizzing', 'slow bubbling'],
          ],
        },
      ],
      lines: [
        { say: 'At the same concentration, a strong acid makes far more hydronium ions than a weak acid, because every one of its molecules ionises.' },
        { say: 'In zero point one zero moles per litre hydrochloric acid, the hydronium ion concentration is zero point one zero. In acetic acid, it is only about one point three times ten to the minus three.', caption: 'In 0.10 mol/L hydrochloric acid, [H₃O⁺] = 0.10 mol/L. In acetic acid, it is only about 1.3 × 10⁻³ mol/L.', show: 't.0', focus: 't.0' },
        { say: 'That one fact explains every difference you can measure. The much higher hydronium ion concentration gives the strong acid a lower p H: one point zero zero, against about two point nine.', caption: 'That one fact explains every difference you can measure. The much higher [H₃O⁺] gives the strong acid a lower pH: 1.00, against about 2.9.', show: 't.1', focus: 't.1' },
        { say: 'Its solution holds more ions to carry charge, so it conducts electricity better.', show: 't.2', focus: 't.2' },
        { say: 'And more hydronium ions collide with the metal each second, so it reacts faster with magnesium ribbon.', show: 't.3', focus: 't.3' },
      ],
    },
    {
      chapter: 'Which has the higher pH?',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Solutions of nitric acid and nitrous acid both have a concentration of $0.50\\ \\text{mol/L}$. Which solution has the higher pH?' },
        { kind: 'text', id: 'a', size: 'md', align: 'center', md: 'Nitric acid is strong: more $\\ce{H3O+}$, lower pH. Nitrous acid is weak: fewer $\\ce{H3O+}$, so **nitrous acid**, $\\ce{HNO2}$, has the higher pH.' },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Equal concentrations, equal pH?', md: '"They are the same, because the concentrations are equal" is wrong. At the same concentration, the strong acid always has the higher $[\\ce{H3O+}]$ and the lower pH.' },
      ],
      lines: [
        { say: 'Solutions of nitric acid and nitrous acid both have a concentration of zero point five zero moles per litre. Which has the higher p H?', caption: 'Solutions of nitric acid and nitrous acid both have a concentration of 0.50 mol/L. Which has the higher pH?', show: 'q' },
        { say: 'Nitric acid is strong, and nitrous acid is weak, so nitric acid has more hydronium ions. The solution with fewer hydronium ions, nitrous acid, has the higher p H.', caption: 'Nitric acid is strong, and nitrous acid is weak, so nitric acid has more hydronium ions. The solution with fewer hydronium ions, nitrous acid, has the higher pH.', show: 'a' },
        { say: 'Saying they are the same, because the concentrations are equal, is wrong. At the same concentration, the strong acid always has more hydronium ions, and the lower p H.', caption: 'Saying they are the same, because the concentrations are equal, is wrong. At the same concentration, the strong acid always has more hydronium ions, and the lower pH.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solutions of hydrochloric acid and hydrofluoric acid both have a concentration of $0.10\\ \\text{mol/L}$. Which statement is true?',
          choices: [
            'Both have the same pH, because their concentrations are equal.',
            'The hydrofluoric acid has the higher $[\\ce{H3O+}]$, because it ionises more.',
            'The hydrochloric acid conducts electricity better, because it ionises completely.',
            'The hydrochloric acid has the higher pH, because it has more ions.',
          ],
          answer: 2,
          working: 'Hydrochloric acid is strong and hydrofluoric acid is weak, so the hydrochloric acid has far more ions: better conductivity, a higher $[\\ce{H3O+}]$ and a lower pH.',
        },
      ],
      lines: [
        { say: 'Your turn. Solutions of hydrochloric acid and hydrofluoric acid both have a concentration of zero point one zero moles per litre. Which statement is true? Pause the video and try it.', caption: 'Your turn. Solutions of hydrochloric acid and hydrofluoric acid both have a concentration of 0.10 mol/L. Which statement is true? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Hydrochloric acid is strong, so it ionises completely, and its solution holds more ions to carry charge. Choice D gets the p H backwards: more hydronium ions means a lower p H.', caption: 'The answer is C. Hydrochloric acid is strong, so it ionises completely, and its solution holds more ions to carry charge. Choice D gets the pH backwards: more hydronium ions means a lower pH.', show: 'q.answer' },
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
            'Concentration says how much acid was dissolved; strength says how much of it ionises.',
            'A strong acid can be dilute, and a weak acid can be concentrated.',
            'At the same concentration, a strong acid has a much higher $[\\ce{H3O+}]$: a lower pH, better conductivity and a faster reaction with magnesium.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Concentration says how much acid was dissolved. Strength says how much of it ionises.', show: 'sum.0' },
        { say: 'So a strong acid can be dilute, and a weak acid can be concentrated.', show: 'sum.1' },
        { say: 'At the same concentration, a strong acid has far more hydronium ions: a lower p H, better conductivity, and a faster reaction with magnesium. In part three, you will meet strong bases. See you there!', caption: 'At the same concentration, a strong acid has far more hydronium ions: a lower pH, better conductivity, and a faster reaction with magnesium. In part three, you will meet strong bases. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
