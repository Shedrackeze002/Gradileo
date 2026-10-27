import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { flow } from './lib/c20-4b-figures.ts';

// Hydrochloric acid titrated with 0.150 mol/L sodium hydroxide: from the volume of base to the
// amount of acid (then c = n/V gives its concentration).
const path = figure(
  'w',
  [
    flow({
      nodes: [
        { id: 'v1', tex: 'V(\\ce{NaOH})', tone: 'adj', value: '0.02140\\ \\text{L}' },
        { id: 'n1', tex: 'n(\\ce{NaOH})', value: '0.003210\\ \\text{mol}' },
        { id: 'n2', tex: 'n(\\ce{HCl})', value: '0.003210\\ \\text{mol}' },
      ],
      arrows: [
        { id: 'a1', from: 'v1', to: 'n1', tex: '\\times 0.150', tone: 'good' },
        { id: 'a2', from: 'n1', to: 'n2', tex: '\\times \\dfrac{1}{1}', tone: 'theta' },
      ],
      width: 3.4,
      height: 1.5,
      gap: 3.6,
    }),
  ],
  250,
);

const video: Explainer = {
  id: 'c20-4-8-b',
  lessonId: 'c20-4-8',
  title: 'Titration, Part 2: From Data to a Concentration',
  thumbnailTitle: 'From Data to a Concentration',
  thumbnail: 'w',
  summary:
    'A titration is solution stoichiometry: n = cV for the titrant, the mole ratio to the sample, and c = n/V for the sample, with volumes in litres. 21.40 mL of 0.150 mol/L sodium hydroxide shows that a 25.00 mL sample of hydrochloric acid is 0.128 mol/L; sulfuric acid needs the 1 : 2 mole ratio, so c₁V₁ = c₂V₂ would give twice the right answer. Leave out the rough first trial, and average the trials that agree within 0.20 mL.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Quantitative Relationships in Chemical Changes · Part 2', title: 'From Data to a Concentration', subtitle: 'Solution stoichiometry in the lab' }],
      lines: [
        { say: 'A titration gives you a volume, but you want a concentration. Solution stoichiometry joins the two.', show: 'title' },
        { say: 'In this part, you will find the concentration of a sample from titration data, and handle several trials.' },
      ],
    },
    {
      chapter: 'Hydrochloric acid',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'A $25.00\\ \\text{mL}$ sample of $\\ce{HCl(aq)}$ is titrated with $0.150\\ \\text{mol/L}$ $\\ce{NaOH(aq)}$: $\\ce{HCl(aq) + NaOH(aq) -> NaCl(aq) + H2O(l)}$. The endpoint is reached after $21.40\\ \\text{mL}$. What is the concentration of the acid, to the nearest thousandth?' },
        path,
        { kind: 'math', id: 'm', size: 'md', lines: ['c = \\dfrac{n}{V} = \\dfrac{0.003210}{0.02500} = 0.1284\\ \\text{mol/L} \\approx \\good{0.128\\ \\text{mol/L}}'] },
      ],
      lines: [
        { say: 'The calculation is solution stoichiometry: n equals c V for the titrant, the mole ratio, and c equals n over V for the sample, with volumes in litres.' },
        { say: 'A twenty-five point zero zero millilitre sample of hydrochloric acid needs twenty-one point four zero millilitres of zero point one five zero moles per litre sodium hydroxide. Find its concentration.', show: ['q', 'w.v1', 'w.v1-value'] },
        { say: 'Zero point zero two one four zero litres, times zero point one five zero, is zero point zero zero three two one zero moles of sodium hydroxide.', show: ['w.a1', 'w.n1', 'w.n1-value'], focus: 'w.a1' },
        { say: 'The ratio is one to one, so the same amount of acid was in the sample.', show: ['w.a2', 'w.n2', 'w.n2-value'], focus: 'w.a2' },
        { say: 'Divide by the sample’s volume, zero point zero two five zero zero litres: zero point one two eight moles per litre.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Mind the mole ratio',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: '$20.00\\ \\text{mL}$ of $\\ce{H2SO4(aq)}$ needs $24.80\\ \\text{mL}$ of $0.150\\ \\text{mol/L}$ $\\ce{NaOH}$: $\\ce{H2SO4 + 2NaOH -> Na2SO4 + 2H2O}$. Find the acid’s concentration, to four decimal places.' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['n(\\ce{NaOH}) = 0.150 \\times 0.02480 = 0.003720\\ \\text{mol}', 'n(\\ce{H2SO4}) = 0.003720 \\times \\dfrac{1}{2} = 0.001860\\ \\text{mol}', 'c = \\dfrac{0.001860}{0.02000} = \\good{0.0930\\ \\text{mol/L}}'],
        },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Leaving out the mole ratio', md: 'Skipping the ratio gives $0.186\\ \\text{mol/L}$, twice the right answer. The shortcut $c_1V_1 = c_2V_2$ works only when the two coefficients are equal.' },
      ],
      lines: [
        { say: 'When the coefficients are not equal, the mole ratio matters. Sulfuric acid gives up two hydrogen ions, so each H two S O four needs two sodium hydroxide.', caption: 'When the coefficients are not equal, the mole ratio matters. Sulfuric acid gives up two hydrogen ions, so each H₂SO₄ needs two NaOH.', show: 'q' },
        { say: 'Here, twenty point zero zero millilitres of sulfuric acid needs zero point zero zero three seven two zero moles of sodium hydroxide.', show: 'm.0', focus: 'm.0' },
        { say: 'Half as much acid: zero point zero zero one eight six zero moles, in zero point zero two zero zero zero litres. That is zero point zero nine three zero moles per litre.', show: ['m.1', 'm.2'], focus: 'm.2' },
        { say: 'Skipping the ratio gives twice the right answer. That is why the shortcut from dilution fails here.', show: 'oops' },
      ],
    },
    {
      chapter: 'Several trials',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: '$25.00\\ \\text{mL}$ of $\\ce{Na2CO3(aq)}$ is titrated with $0.200\\ \\text{mol/L}$ $\\ce{HCl}$: $\\ce{Na2CO3 + 2HCl -> 2NaCl + H2O + CO2}$' },
        {
          kind: 'table',
          id: 't',
          head: ['Trial', '1', '2', '3', '4'],
          rows: [
            ['Final reading (mL)', '24.15', '23.95', '23.45', '24.80'],
            ['Initial reading (mL)', '0.50', '1.20', '0.65', '2.10'],
            ['Volume used (mL)', '[[bad:23.65]]', '22.75', '22.80', '22.70'],
          ],
        },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{average of trials 2 to 4} = \\dfrac{22.75 + 22.80 + 22.70}{3} = 22.75\\ \\text{mL}'] },
      ],
      lines: [
        { say: 'One titration could hide a mistake, such as an extra drop, so chemists repeat it. Here, sodium carbonate is titrated four times.', show: ['q', 't.0', 't.1'] },
        { say: 'First, the volume used in each trial: the final reading minus the initial reading.', show: 't.2', focus: 't.2' },
        { say: 'Trial one is the rough trial, so leave it out. Trials two to four agree within zero point two zero millilitres, and their average is twenty-two point seven five millilitres.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'From the average',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: [
            'n(\\ce{HCl}) = 0.200 \\times 0.02275 = 0.004550\\ \\text{mol}',
            'n(\\ce{Na2CO3}) = 0.004550 \\times \\dfrac{1}{2} = 0.002275\\ \\text{mol}',
            'c = \\dfrac{0.002275}{0.02500} = \\good{0.0910\\ \\text{mol/L}}',
          ],
        },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Averaging every trial', md: 'Including the rough trial gives an average of $22.98\\ \\text{mL}$ and $0.0919\\ \\text{mol/L}$, too high: the rough trial overshot the endpoint.' },
      ],
      lines: [
        { say: 'Then the same path. The acid used is zero point zero zero four five five zero moles.', show: 'm.0', focus: 'm.0' },
        { say: 'Half as much sodium carbonate, in zero point zero two five zero zero litres: zero point zero nine one zero moles per litre.', show: ['m.1', 'm.2'], focus: 'm.2' },
        { say: 'Averaging all four trials would give zero point zero nine one nine, too high, because the rough trial overshot the endpoint.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A $25.00\\ \\text{mL}$ sample of barium hydroxide is titrated with $0.200\\ \\text{mol/L}$ hydrochloric acid: $\\ce{Ba(OH)2(aq) + 2HCl(aq) -> BaCl2(aq) + 2H2O(l)}$. The endpoint is reached after $18.60\\ \\text{mL}$. What is the concentration of the barium hydroxide, to four decimal places?',
          choices: ['$0.0744\\ \\text{mol/L}$', '$0.1488\\ \\text{mol/L}$', '$0.2976\\ \\text{mol/L}$', '$0.1344\\ \\text{mol/L}$'],
          answer: 0,
          working: '$n(\\ce{HCl}) = 0.200 \\times 0.01860 = 0.003720\\ \\text{mol}$, $n(\\ce{Ba(OH)2}) = 0.003720 \\div 2 = 0.001860\\ \\text{mol}$, and $c = 0.001860 \\div 0.02500 = 0.0744\\ \\text{mol/L}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A twenty-five point zero zero millilitre sample of barium hydroxide needs eighteen point six zero millilitres of zero point two zero zero moles per litre hydrochloric acid. What is the concentration of the barium hydroxide? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, zero point zero seven four four moles per litre. The acid is zero point zero zero three seven two zero moles, and half as much barium hydroxide reacts with it. Choice B leaves out the mole ratio.', show: 'q.answer' },
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
          items: ['$n = cV$ for the titrant, the **mole ratio**, then $c = \\dfrac{n}{V}$ for the sample.', '$c_1V_1 = c_2V_2$ works only when the coefficients are equal.', 'Leave out the rough trial, and average the trials that agree within $0.20\\ \\text{mL}$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Use n equals c V for the titrant, the mole ratio, then c equals n over V for the sample.', show: 'sum.0' },
        { say: 'The shortcut c one V one equals c two V two works only when the coefficients are equal.', show: 'sum.1' },
        { say: 'And leave out the rough trial. In part three, you will follow a titration with a p H meter, and read a titration curve. See you there!', caption: 'And leave out the rough trial. In part three, you will follow a titration with a pH meter, and read a titration curve. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
