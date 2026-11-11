import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'cx-12-2',
  lessonId: 'cx-12-2',
  title: 'Aldehydes and Ketones',
  thumbnail: false,
  summary:
    'The C=O carbon is slightly positive, so aldehydes and ketones undergo nucleophilic addition. Tollens’ reagent and Fehling’s solution react only with aldehydes. Sodium tetrahydridoborate reduces aldehydes to primary alcohols and ketones to secondary alcohols, with the hydride ion as the nucleophile, and potassium cyanide then dilute acid gives hydroxynitriles, one carbon longer.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'A Level Organic Chemistry', title: 'Aldehydes and Ketones', subtitle: 'Nucleophiles meet the carbonyl group' }],
      lines: [
        { say: 'Aldehydes and ketones both contain the C double bond O group. It is polar, so nucleophiles attack its carbon, turning these compounds into alcohols or longer-chain hydroxynitriles.', caption: 'Aldehydes and ketones both contain the C=O group. It is polar, so nucleophiles attack its carbon, turning these compounds into alcohols or longer-chain hydroxynitriles.', show: 'title' },
        { say: 'In this lesson, you will predict the products of these nucleophilic addition reactions.' },
      ],
    },
    {
      chapter: 'Telling them apart',
      layout: 'center',
      main: [{ kind: 'table', id: 't', head: ['Test', 'Aldehyde', 'Ketone'], rows: [['Tollens’ reagent', 'silver mirror', 'no change'], ['Fehling’s solution', 'brick-red precipitate', 'no change']] }],
      lines: [
        { say: 'Only aldehydes can be oxidised further. So an aldehyde gives a silver mirror with Tollens’ reagent, and turns blue Fehling’s solution into a brick-red precipitate.', show: 't', focus: 't' },
        { say: 'Ketones give no change with either.' },
      ],
    },
    {
      chapter: 'Reduction',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\ce{CH3CHO + 2[H] -> CH3CH2OH}', '\\ce{CH3COCH3 + 2[H] -> CH3CH(OH)CH3}'] }],
      lines: [
        { say: 'Sodium tetrahydridoborate is a source of hydride ions, which act as the nucleophile.' },
        { say: 'An aldehyde is reduced to a primary alcohol.', show: 'm.0', focus: 'm.0' },
        { say: 'A ketone is reduced to a secondary alcohol. Propanone gives propan-two-ol.', caption: 'A ketone is reduced to a secondary alcohol. Propanone gives propan-2-ol.', show: 'm.1', focus: 'm.1' },
        { say: 'In the mechanism, the hydride ion attacks the slightly positive carbon, the pi electrons move onto the oxygen, and the oxygen then takes a hydrogen ion from water.', caption: 'In the mechanism, the hydride ion attacks the δ+ carbon, the π electrons move onto the oxygen, and the oxygen then takes H⁺ from water.' },
      ],
    },
    {
      chapter: 'Hydroxynitriles',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\ce{CH3CHO + HCN -> CH3CH(OH)CN}', '\\text{2-hydroxypropanenitrile}'] }],
      lines: [
        { say: 'With potassium cyanide and then dilute acid, the cyanide ion adds to the C double bond O. The chain gets one carbon longer.', caption: 'With potassium cyanide and then dilute acid, the cyanide ion adds to the C=O. The chain gets one carbon longer.', show: 'm.0', focus: 'm.0' },
        { say: 'Ethanal gives two hydroxypropanenitrile. The nitrile carbon counts as carbon one.', caption: 'Ethanal gives 2-hydroxypropanenitrile. The nitrile carbon counts as carbon 1.', show: 'm.1', focus: 'm.1' },
        { say: 'Potassium cyanide is used rather than hydrogen cyanide, which is a very toxic gas. Even so, it must be handled with great care.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What forms when butanone, $\\ce{CH3COCH2CH3}$, is reduced with $\\ce{NaBH4}$?',
          choices: ['Butan-1-ol', 'Butan-2-ol', 'Butanoic acid', 'Butanal'],
          answer: 1,
          working: 'Butanone is a **ketone**, so it is reduced to a secondary alcohol: butan-2-ol.',
        },
      ],
      lines: [
        { say: 'Your turn. What forms when butanone is reduced with sodium tetrahydridoborate? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, butan-two-ol. Butanone is a ketone, so it gives a secondary alcohol.', caption: 'The answer is B, butan-2-ol. Butanone is a ketone, so it gives a secondary alcohol.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['The C=O carbon is attacked by nucleophiles.', 'Tollens’ and Fehling’s react only with aldehydes.', 'NaBH₄: aldehyde to primary alcohol, ketone to secondary.', 'KCN then acid gives a hydroxynitrile, one carbon longer.'] }],
      lines: [
        { say: 'Let’s sum up. The C double bond O carbon is attacked by nucleophiles.', caption: 'Let’s sum up. The C=O carbon is attacked by nucleophiles.', show: 'sum.0' },
        { say: 'Tollens’ reagent and Fehling’s solution react only with aldehydes.', show: 'sum.1' },
        { say: 'Sodium tetrahydridoborate reduces aldehydes to primary alcohols, and ketones to secondary alcohols.', show: 'sum.2' },
        { say: 'And potassium cyanide then acid gives a hydroxynitrile, one carbon longer.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
