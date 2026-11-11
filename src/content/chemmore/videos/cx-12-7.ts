import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'cx-12-7',
  lessonId: 'cx-12-7',
  title: 'Organic Synthesis',
  thumbnail: false,
  summary:
    'A synthesis is a chain of reactions, each changing one functional group with a known reagent and conditions. Each step loses product, so the overall yield is the product of the step yields and short routes are better. Plan backwards from the target, count the carbons (only cyanide adds one), and choose distillation or reflux when oxidising a primary alcohol.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'A Level Organic Chemistry', title: 'Organic Synthesis', subtitle: 'Planning a route' }],
      lines: [
        { say: 'A chemist rarely finds the molecule they want ready-made. They plan a route: a short chain of reactions, from something cheap to something valuable.', show: 'title' },
        { say: 'In this lesson, you will choose the reagent for each step, and plan routes of two or three steps.' },
      ],
    },
    {
      chapter: 'Key conversions',
      layout: 'center',
      main: [{ kind: 'table', id: 't', head: ['Change', 'Reagent and conditions'], rows: [['alkene → alcohol', 'steam, phosphoric acid catalyst'], ['halogenoalkane → nitrile', 'KCN in ethanol'], ['primary alcohol → aldehyde', 'acidified dichromate, distil'], ['primary alcohol → acid', 'acidified dichromate, reflux'], ['secondary alcohol → ketone', 'acidified dichromate, reflux'], ['nitrile → amine', '$\\ce{H2}$ with a nickel catalyst']] }],
      lines: [
        { say: 'Each step changes one functional group, using a reagent you already know.' },
        { say: 'Steam adds to an alkene to give an alcohol, and potassium cyanide turns a halogenoalkane into a nitrile, one carbon longer.', show: ['t.0', 't.1'], focus: ['t.0', 't.1'] },
        { say: 'Acidified dichromate oxidises alcohols: to an aldehyde if you distil, to an acid under reflux, or to a ketone from a secondary alcohol.', show: ['t.2', 't.3', 't.4'], focus: ['t.2', 't.3', 't.4'] },
        { say: 'And hydrogen with a nickel catalyst reduces a nitrile to an amine.', show: 't.5', focus: 't.5' },
      ],
    },
    {
      chapter: 'Fewer steps',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['0.80 \\times 0.75 \\times 0.90 = 0.54'] }],
      lines: [
        { say: 'Every step loses some product, so multiply the yields. Three steps of eighty, seventy-five and ninety percent give only fifty-four percent overall.', caption: 'Every step loses some product, so multiply the yields. Three steps of 80%, 75% and 90% give only 54% overall.', show: 'm' },
        { say: 'Shorter routes are better, and greener routes also use reactions with a high atom economy and avoid hazardous solvents.' },
      ],
    },
    {
      chapter: 'Working backwards',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\ce{CH3CH=CH2 -> CH3CH(OH)CH3 -> CH3COCH3}'] }],
      lines: [
        { say: 'Plan backwards from the target. Suppose you want propanone from propene.', show: 'm' },
        { say: 'Propanone is a ketone, so it comes from oxidising a secondary alcohol, propan-two-ol.', caption: 'Propanone is a ketone, so it comes from oxidising a secondary alcohol, propan-2-ol.' },
        { say: 'And propan-two-ol forms when steam adds to propene. So the route is steam with phosphoric acid, then acidified dichromate under reflux.', caption: 'And propan-2-ol forms when steam adds to propene. So the route is steam with phosphoric acid, then acidified dichromate under reflux.' },
        { say: 'Keep count of the carbons too. Only the cyanide reactions add one.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which two steps make propylamine, $\\ce{CH3CH2CH2NH2}$, from bromoethane?',
          choices: ['Excess ammonia, then KCN', 'Aqueous NaOH, then ammonia', 'Steam, then $\\ce{H2}$ and nickel', 'KCN in ethanol, then $\\ce{H2}$ with a nickel catalyst'],
          answer: 3,
          working: 'Bromoethane has two carbons and propylamine three, so add one with **cyanide** (propanenitrile), then **reduce** the nitrile.',
        },
      ],
      lines: [
        { say: 'Your turn. Which two steps make propylamine from bromoethane? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Cyanide adds the third carbon, giving propanenitrile, and reducing the nitrile gives propylamine.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Each step changes one functional group.', 'Overall yield = the product of the step yields.', 'Plan backwards from the target.', 'Count the carbons: cyanide adds one.'] }],
      lines: [
        { say: 'Let’s sum up. Each step changes one functional group.', show: 'sum.0' },
        { say: 'The overall yield is the product of the step yields, so short routes are best.', show: 'sum.1' },
        { say: 'Plan backwards from the target molecule.', show: 'sum.2' },
        { say: 'And count the carbons, because only cyanide adds one.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
