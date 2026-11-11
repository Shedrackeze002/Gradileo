import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'cx-9-4',
  lessonId: 'cx-9-4',
  title: 'Alcohols: Production, Oxidation and Elimination',
  thumbnail: false,
  summary:
    'Alcohols are primary, secondary or tertiary. Ethanol is made by fermentation, which is renewable but slow and impure, or by hydrating ethene, which is fast and pure but uses crude oil. Acidified dichromate oxidises primary alcohols to aldehydes (distil) or acids (reflux) and secondary alcohols to ketones, and does not oxidise tertiary alcohols. An acid catalyst dehydrates alcohols to alkenes.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'A Level Organic Mechanisms and Analysis', title: 'Alcohols', subtitle: 'Made, oxidised and dehydrated' }],
      lines: [
        { say: 'Ethanol is made in two very different ways: by yeast in a vat, and by reacting ethene with steam in a chemical plant. Once made, alcohols can become aldehydes, ketones, acids or alkenes.', show: 'title' },
        { say: 'In this lesson, you will compare the two ways of making ethanol, and predict what alcohols become.' },
      ],
    },
    {
      chapter: 'Making ethanol',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['', 'Fermentation', 'Hydration of ethene'], rows: [['Conditions', 'yeast, 35 °C, no air', 'steam, $\\ce{H3PO4}$, 300 °C, 60 atm'], ['Raw material', 'sugar: renewable', 'crude oil: finite'], ['Process', 'slow, batch', 'fast, continuous'], ['Product', 'dilute', 'almost pure']] },
      ],
      lines: [
        { say: 'Fermentation uses yeast at about thirty-five degrees, with air kept out so the ethanol is not oxidised. Its sugar comes from crops, so it is renewable.', caption: 'Fermentation uses yeast at about 35 °C, with air kept out so the ethanol is not oxidised. Its sugar comes from crops, so it is renewable.', show: ['t.0', 't.1'], focus: 't.0' },
        { say: 'But it is slow, made in batches, and the ethanol is dilute.', show: ['t.2', 't.3'], focus: ['t.2', 't.3'] },
        { say: 'Hydrating ethene with steam and a phosphoric acid catalyst is fast, continuous and gives almost pure ethanol, but the ethene comes from crude oil, which will run out.' },
      ],
    },
    {
      chapter: 'Oxidation',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Alcohol', 'With acidified dichromate'], rows: [['Primary, distil', 'aldehyde'], ['Primary, reflux', 'carboxylic acid'], ['Secondary', 'ketone'], ['Tertiary', 'no reaction: stays orange']] },
      ],
      lines: [
        { say: 'Warm an alcohol with acidified potassium dichromate, and the orange solution turns green as the alcohol is oxidised.' },
        { say: 'A primary alcohol gives an aldehyde, if you distil it off as it forms.', show: 't.0', focus: 't.0' },
        { say: 'Heat it under reflux instead, and the aldehyde is oxidised further, to a carboxylic acid.', show: 't.1', focus: 't.1' },
        { say: 'A secondary alcohol gives a ketone, and a tertiary alcohol does not react at all.', show: ['t.2', 't.3'], focus: ['t.2', 't.3'] },
      ],
    },
    {
      chapter: 'Elimination',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\ce{CH3CH(OH)CH3 -> CH3CH=CH2 + H2O}'] }],
      lines: [
        { say: 'Heating an alcohol with a concentrated acid catalyst removes water, giving an alkene. Propan-two-ol gives propene.', caption: 'Heating an alcohol with a concentrated acid catalyst removes water, giving an alkene. Propan-2-ol gives propene.', show: 'm' },
        { say: 'That means alkenes, and the polymers made from them, can come from crops instead of crude oil.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Butan-2-ol is warmed with acidified potassium dichromate(VI). What forms?',
          choices: ['Butanone, a ketone', 'Butanal, an aldehyde', 'Butanoic acid', 'Nothing: it does not react'],
          answer: 0,
          working: 'Butan-2-ol is a **secondary** alcohol, so it is oxidised to a ketone, butanone.',
        },
      ],
      lines: [
        { say: 'Your turn. Butan-two-ol is warmed with acidified potassium dichromate. What forms? Pause the video and try it.', caption: 'Your turn. Butan-2-ol is warmed with acidified potassium dichromate. What forms? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is choice A, butanone. Butan-two-ol is a secondary alcohol, so it is oxidised to a ketone.', caption: 'The answer is choice A, butanone. Butan-2-ol is a secondary alcohol, so it is oxidised to a ketone.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Fermentation: renewable but slow. Hydration: fast but uses crude oil.', 'Primary: aldehyde (distil) or acid (reflux).', 'Secondary: ketone. Tertiary: no reaction.', 'An acid catalyst dehydrates an alcohol to an alkene.'] }],
      lines: [
        { say: 'Let’s sum up. Fermentation is renewable but slow, while hydrating ethene is fast but uses crude oil.', show: 'sum.0' },
        { say: 'A primary alcohol gives an aldehyde when distilled, or an acid under reflux.', show: 'sum.1' },
        { say: 'A secondary alcohol gives a ketone, and a tertiary alcohol does not react.', show: 'sum.2' },
        { say: 'And an acid catalyst dehydrates an alcohol to an alkene.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
