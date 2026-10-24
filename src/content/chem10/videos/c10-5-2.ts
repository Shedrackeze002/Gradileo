import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { flow } from './lib/c10-5-figures.ts';

// Mass and moles, with the way from one to the other.
const bridge = figure(
  'f',
  [
    flow({
      nodes: [
        { id: 'm', tex: '\\text{mass, } m \\ (\\text{g})', tone: 'opp' },
        { id: 'n', tex: '\\text{moles, } n \\ (\\text{mol})', tone: 'brand' },
      ],
      arrows: [
        { id: 'divide', from: 'm', to: 'n', tex: '\\div M', tone: 'good' },
        { id: 'times', from: 'n', to: 'm', tex: '\\times M', tone: 'theta' },
      ],
      width: 3.6,
      gap: 4,
    }),
  ],
  230,
);

const video: Explainer = {
  id: 'c10-5-2',
  lessonId: 'c10-5-2',
  title: 'Moles, Mass and Particles, Part 1: Mass and Moles',
  thumbnailTitle: 'Mass and Moles',
  thumbnail: 'f',
  summary:
    'The molar mass links the mass you can weigh to the amount in moles: n = m/M and m = n × M. 54.0 g of water (18.0 g/mol) is 3.00 mol, and 0.25 mol of sodium chloride (58.5 g/mol) is 14.6 g. If you are not sure whether to multiply or divide, let the units decide.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Moles, Acids and Bases · Part 1', title: 'Mass and Moles', subtitle: 'Weighing out particles' }],
      lines: [
        {
          say: 'A chemist who needs half a mole of water cannot count out three point zero one times ten to the twenty-third molecules. But a balance can weigh out nine grams of water in a few seconds.',
          caption: 'A chemist who needs half a mole of water cannot count out 3.01 × 10²³ molecules. But a balance can weigh out nine grams of water in a few seconds.',
          show: 'title',
        },
        { say: 'The molar mass is the bridge between the mass you can weigh and the particles you cannot see. In this video, you will change mass into moles, and back. Later parts go on to particles, and to balanced equations.' },
      ],
    },
    {
      chapter: 'Amount of substance',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Amount of substance', md: 'The **amount of substance**, $n$, is how much of a substance there is, measured in moles. It is found from the mass, $m$, in grams, and the molar mass, $M$, in grams per mole.' },
        bridge,
        { kind: 'math', id: 'm', size: 'lg', lines: ['n = \\dfrac{m}{M} \\qquad m = n \\times M'] },
      ],
      lines: [
        { say: 'The amount of substance, small n, is how much of a substance there is, measured in moles.', show: 'def' },
        { say: 'It comes from the mass, small m, in grams, and the molar mass, capital M, in grams per mole.', show: ['f.m', 'f.n'] },
        { say: 'To change a mass into moles, divide by the molar mass. To change moles into a mass, multiply by the molar mass.', show: ['f.divide', 'f.times'], focus: ['f.divide', 'f.times'] },
        { say: 'As formulas: n equals m over capital M, and m equals n times capital M.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Mass to moles',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'How many moles are in $54.0\\ \\text{g}$ of water, $\\ce{H2O}$? Give the answer to the nearest hundredth. The molar mass of water is $18.0\\ \\text{g/mol}$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['n = \\dfrac{m}{M} = \\dfrac{54.0\\ \\text{g}}{18.0\\ \\text{g/mol}}', '= \\good{3.00\\ \\text{mol}}'] },
      ],
      lines: [
        { say: 'How many moles are in fifty-four point zero grams of water? The molar mass of water is eighteen point zero grams per mole.', show: 'q' },
        { say: 'We have a mass, and we want moles, so divide by the molar mass: fifty-four point zero grams over eighteen point zero grams per mole.', show: 'm.0', focus: 'm.0' },
        { say: 'That is three point zero zero moles. It makes sense: each mole of water is eighteen grams, and fifty-four grams is three lots of eighteen.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Moles to mass',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'What is the mass of $0.25\\ \\text{mol}$ of sodium chloride, $\\ce{NaCl}$, to the nearest tenth? The molar mass of sodium chloride is $58.5\\ \\text{g/mol}$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['m = n \\times M = 0.25\\ \\text{mol} \\times 58.5\\ \\text{g/mol}', '= 14.625\\ \\text{g} \\approx \\good{14.6\\ \\text{g}}'] },
      ],
      lines: [
        { say: 'Now the other way. What is the mass of zero point two five moles of sodium chloride? Its molar mass is fifty-eight point five grams per mole.', show: 'q' },
        { say: 'We have moles, and we want a mass, so multiply by the molar mass: zero point two five times fifty-eight point five.', show: 'm.0', focus: 'm.0' },
        { say: 'That is fourteen point six two five grams, or fourteen point six grams to the nearest tenth.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Let the units decide',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Let the units decide', md: '$\\text{g} \\div \\text{g/mol} = \\text{mol}$, and $\\text{mol} \\times \\text{g/mol} = \\text{g}$. If your units come out as $\\text{mol/g}$ or $\\text{g}^2/\\text{mol}$, you have divided the wrong way round.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{\\text{g}}{\\text{g/mol}} = \\cancel{\\text{g}} \\times \\dfrac{\\text{mol}}{\\cancel{\\text{g}}} = \\good{\\text{mol}}', '\\text{mol} \\times \\dfrac{\\text{g}}{\\text{mol}} = \\cancel{\\text{mol}} \\times \\dfrac{\\text{g}}{\\cancel{\\text{mol}}} = \\good{\\text{g}}'] },
      ],
      lines: [
        { say: 'Not sure whether to multiply or divide? Let the units decide.', show: 'tip' },
        { say: 'Dividing grams by grams per mole is the same as multiplying grams by moles per gram. The grams cancel, and moles are left.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiplying moles by grams per mole cancels the moles, and leaves grams.', show: 'm.1', focus: 'm.1' },
        { say: 'If your units come out as moles per gram, or grams squared per mole, you have divided the wrong way round.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'How many moles are in $88.0\\ \\text{g}$ of carbon dioxide, $\\ce{CO2}$? The molar mass of carbon dioxide is $44.0\\ \\text{g/mol}$.',
          choices: ['$0.50\\ \\text{mol}$', '$3\\,872\\ \\text{mol}$', '$2.00\\ \\text{mol}$', '$132.0\\ \\text{mol}$'],
          answer: 2,
          working: '$n = \\dfrac{m}{M} = \\dfrac{88.0\\ \\text{g}}{44.0\\ \\text{g/mol}} = 2.00\\ \\text{mol}$',
        },
      ],
      lines: [
        { say: 'Your turn. How many moles are in eighty-eight point zero grams of carbon dioxide? Its molar mass is forty-four point zero grams per mole. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, two point zero zero moles. Divide the mass by the molar mass: eighty-eight over forty-four is two. Choice A divides the wrong way round, and choice B multiplies, which gives grams squared per mole.', show: 'q.answer' },
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
            'The **amount of substance**, $n$, is measured in moles.',
            'Mass to moles: $n = \\dfrac{m}{M}$. Moles to mass: $m = n \\times M$.',
            'Let the units decide: $\\text{g} \\div \\text{g/mol} = \\text{mol}$ and $\\text{mol} \\times \\text{g/mol} = \\text{g}$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The amount of substance, n, is measured in moles.', show: 'sum.0' },
        { say: 'To change a mass into moles, divide by the molar mass. To change moles into a mass, multiply by it.', show: 'sum.1' },
        { say: 'And let the units decide. In part two, you will work out the molar mass first, and go on from a mass to a number of particles. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
