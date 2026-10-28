import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c30-2-5-c',
  lessonId: 'c30-2-5',
  title: 'Redox Titrations, Part 3: Several Trials and a Solid Sample',
  thumbnailTitle: 'Several Trials and a Solid Sample',
  thumbnail: false,
  summary:
    'A titration is repeated until three careful trials agree within 0.20 mL, and the rough first trial is left out of the average. A 0.500 g iron ore titrated with 0.0200 mol/L permanganate (an average of 22.70 mL) holds 0.1268 g of iron, so it is 25.4% iron by mass. A sample diluted before titrating is found by multiplying the diluted concentration by the dilution factor.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Electrochemical Changes · Part 3', title: 'Several Trials and a Solid Sample', subtitle: 'Averages, ores and dilutions' }],
      lines: [
        { say: 'One titration can hide a mistake, such as an extra drop. And many samples are solids, like an iron ore, or too concentrated to titrate as they are.', show: 'title' },
        { say: 'In this part, you will average several trials, find the percent of iron in an ore, and handle a diluted sample.' },
      ],
    },
    {
      chapter: 'Several trials',
      layout: 'center',
      main: [
        {
          kind: 'text',
          id: 'q',
          size: 'md',
          align: 'center',
          md: 'A $0.500\\ \\text{g}$ sample of iron ore is dissolved in acid, and all of its iron is turned into $\\ce{Fe^2+}$. It is titrated with $0.0200\\ \\text{mol/L}$ $\\ce{KMnO4}$: $\\ce{MnO4^- + 5Fe^2+ + 8H+ -> Mn^2+ + 5Fe^3+ + 4H2O}$.',
        },
        {
          kind: 'table',
          id: 't',
          head: ['Trial', '1', '2', '3', '4'],
          rows: [
            ['Final reading (mL)', '24.10', '23.75', '24.20', '23.40'],
            ['Initial reading (mL)', '0.50', '1.05', '1.45', '0.75'],
            ['Volume used (mL)', '[[bad:23.60]]', '22.70', '22.75', '22.65'],
          ],
        },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{average of trials 2 to 4} = \\dfrac{22.70 + 22.75 + 22.65}{3} = 22.70\\ \\text{mL}'] },
      ],
      lines: [
        {
          say: 'Here is a full analysis. A zero point five zero zero gram sample of iron ore is dissolved in acid, and all of its iron is turned into iron two ions. The solution is titrated with zero point zero two zero zero moles per litre permanganate.',
          caption: 'Here is a full analysis. A 0.500 g sample of iron ore is dissolved in acid, and all of its iron is turned into iron(II) ions. The solution is titrated with 0.0200 mol/L permanganate.',
          show: ['q', 't.0', 't.1'],
        },
        { say: 'The volume used in each trial is the final burette reading minus the initial reading.', show: 't.2', focus: 't.2' },
        {
          say: 'The first trial is a quick, rough one, so leave it out. Careful trials are repeated until three agree within zero point two zero millilitres. Trials two to four agree, and their average is twenty-two point seven zero millilitres.',
          show: 'm',
          focus: 'm',
        },
      ],
    },
    {
      chapter: 'Percent of iron',
      layout: 'center',
      main: [
        { kind: 'text', id: 'given', size: 'md', align: 'center', md: 'Average volume $22.70\\ \\text{mL}$ of $0.0200\\ \\text{mol/L}$ $\\ce{KMnO4}$; ore $0.500\\ \\text{g}$; Fe $55.85\\ \\text{g/mol}$' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            'n(\\ce{MnO4^-}) = 0.0200 \\times 0.02270 = 4.540 \\times 10^{-4}\\ \\text{mol}',
            'n(\\ce{Fe^2+}) = 4.540 \\times 10^{-4} \\times 5 = 2.270 \\times 10^{-3}\\ \\text{mol}',
            'm(\\ce{Fe}) = 2.270 \\times 10^{-3} \\times 55.85 = 0.1268\\ \\text{g}',
            '\\text{percent by mass} = \\dfrac{0.1268}{0.500} \\times 100\\% = \\good{25.4\\%}',
          ],
        },
      ],
      lines: [
        { say: 'Now the same path as before. The permanganate used is four point five four zero times ten to the negative four moles.', show: ['given', 'm.0'], focus: 'm.0' },
        {
          say: 'Each permanganate ion reacts with five iron two ions, so there are two point two seven zero times ten to the negative three moles of iron.',
          caption: 'Each permanganate ion reacts with five iron(II) ions, so there are 2.270 × 10⁻³ moles of iron.',
          show: 'm.1',
          focus: 'm.1',
        },
        { say: 'For a solid, change the amount to a mass. Multiply by the molar mass of iron, fifty-five point eight five grams per mole: zero point one two six eight grams.', show: 'm.2', focus: 'm.2' },
        { say: 'The percent by mass is the mass of iron over the mass of the ore, times one hundred percent. The ore is twenty-five point four percent iron.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Diluted samples',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'tip',
          tone: 'tip',
          title: 'Diluted samples',
          md: 'Find the concentration of the **diluted** solution first, then multiply by the **dilution factor**. Diluting $10.00\\ \\text{mL}$ to $250.0\\ \\text{mL}$ makes a solution $25$ times weaker, so the original was $25$ times more concentrated.',
        },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{250.0\\ \\text{mL}}{10.00\\ \\text{mL}} = 25', 'c(\\text{disinfectant}) = 0.0865\\ \\text{mol/L} \\times 25 = \\good{2.16\\ \\text{mol/L}}'] },
      ],
      lines: [
        { say: 'A concentrated sample, such as a disinfectant, is often diluted before it is titrated. Find the concentration of the diluted solution first, then multiply by the dilution factor.', show: 'tip' },
        { say: 'Say ten point zero zero millilitres of hydrogen peroxide disinfectant is diluted to two hundred fifty point zero millilitres. That makes it twenty-five times weaker.', show: 'm.0', focus: 'm.0' },
        {
          say: 'If the diluted solution titrates at zero point zero eight six five moles per litre, the disinfectant was twenty-five times more concentrated: two point one six moles per litre.',
          show: 'm.1',
          focus: 'm.1',
        },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt:
            'A $1.200\\ \\text{g}$ iron tablet is dissolved, and all its iron is turned into $\\ce{Fe^2+}$. It needs an average of $21.50\\ \\text{mL}$ of $0.0200\\ \\text{mol/L}$ $\\ce{KMnO4}$: $\\ce{MnO4^- + 5Fe^2+ + 8H+ -> Mn^2+ + 5Fe^3+ + 4H2O}$. What is the percent by mass of iron (Fe $55.85\\ \\text{g/mol}$)?',
          choices: ['$2.0\\%$', '$0.4\\%$', '$0.18\\%$', '$10.0\\%$'],
          answer: 3,
          working: '$n(\\ce{Fe}) = 5 \\times 0.0200 \\times 0.02150 = 2.150 \\times 10^{-3}$ mol, so $m = 0.1201$ g, and $0.1201 \\div 1.200 \\times 100\\% = 10.0\\%$.',
        },
      ],
      lines: [
        {
          say: 'Your turn. A one point two zero zero gram iron tablet is dissolved in acid, and all of its iron is turned into iron two ions. Three careful trials need an average of twenty-one point five zero millilitres of zero point zero two zero zero moles per litre permanganate. What is the percent by mass of iron? Pause the video and try it.',
          caption: 'Your turn. A 1.200 g iron tablet is dissolved in acid, and all of its iron is turned into iron(II) ions. Three careful trials need an average of 21.50 mL of 0.0200 mol/L permanganate. What is the percent by mass of iron? Pause the video and try it.',
          show: 'q',
          wait: 6,
        },
        {
          say: 'The answer is D, ten point zero percent. The iron is two point one five zero times ten to the negative three moles, or zero point one two zero one grams. Choice A leaves out the mole ratio of five.',
          caption: 'The answer is D, 10.0%. The iron is 2.150 × 10⁻³ moles, or 0.1201 grams. Choice A leaves out the mole ratio of five.',
          show: 'q.answer',
        },
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
            'Leave out the rough trial, and average the trials that agree within $0.20\\ \\text{mL}$.',
            'For a solid: amount $\\to$ mass $\\to$ percent by mass.',
            'For a diluted sample, multiply by the **dilution factor**.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Leave out the rough trial, and average the trials that agree within zero point two zero millilitres.', show: 'sum.0' },
        { say: 'For a solid sample, change the amount to a mass, and then to a percent by mass.', show: 'sum.1' },
        { say: 'And for a diluted sample, multiply by the dilution factor. That completes this lesson on redox titrations. Next, you will see how a redox reaction can drive an electric current. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
