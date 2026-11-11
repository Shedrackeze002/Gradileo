import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'cx-12-3',
  lessonId: 'cx-12-3',
  title: 'Carboxylic Acid Derivatives and Acylation',
  thumbnail: false,
  summary:
    'Esters are named alkyl alkanoate, the alcohol part first. Acid hydrolysis gives the acid and alcohol reversibly, while alkaline hydrolysis gives the carboxylate salt and goes to completion. Fats with sodium hydroxide give soap, and with methanol give biodiesel. Acyl chlorides react with water, alcohols, ammonia and amines by nucleophilic addition–elimination, giving HCl; acid anhydrides react the same way but give a carboxylic acid.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'A Level Organic Chemistry', title: 'Esters and Acylation', subtitle: 'From pear drops to aspirin' }],
      lines: [
        { say: 'The smell of pear drops, the soap in your bathroom, biodiesel and aspirin all come from the same family of reactions.', show: 'title' },
        { say: 'In this lesson, you will name esters, predict how they are hydrolysed, and predict the products of acylation.' },
      ],
    },
    {
      chapter: 'Esters',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\ce{CH3COOH + CH3CH2OH <=> CH3COOCH2CH3 + H2O}'] },
        { kind: 'table', id: 't', head: ['Hydrolysis', 'Products', 'Reversible?'], rows: [['dilute acid', 'acid + alcohol', 'yes'], ['NaOH(aq)', 'carboxylate salt + alcohol', 'no']] },
      ],
      lines: [
        { say: 'An ester forms from a carboxylic acid and an alcohol. It is named with the alcohol part first: ethanoic acid and ethanol give ethyl ethanoate.', show: 'm', focus: 'm' },
        { say: 'Heating an ester with dilute acid splits it back into the acid and the alcohol, but the reaction is reversible.', show: 't.0', focus: 't.0' },
        { say: 'With sodium hydroxide, it goes to completion, giving the sodium salt of the acid and the alcohol.', show: 't.1', focus: 't.1' },
        { say: 'Fats are esters of propane-one-two-three-triol. With sodium hydroxide they give soap, and with methanol they give biodiesel.', caption: 'Fats are esters of propane-1,2,3-triol. With sodium hydroxide they give soap, and with methanol they give biodiesel.' },
      ],
    },
    {
      chapter: 'Acylation',
      layout: 'center',
      main: [{ kind: 'table', id: 't', head: ['With ethanoyl chloride', 'Product'], rows: [['water', 'ethanoic acid + HCl'], ['an alcohol', 'an ester + HCl'], ['ammonia', 'ethanamide + $\\ce{NH4Cl}$'], ['a primary amine', 'an N-substituted amide']] }],
      lines: [
        { say: 'Acyl chlorides, such as ethanoyl chloride, react with nucleophiles by nucleophilic addition elimination. The nucleophile adds to the carbon, then H C l is eliminated.', caption: 'Acyl chlorides, such as ethanoyl chloride, react with nucleophiles by nucleophilic addition–elimination. The nucleophile adds to the carbon, then HCl is eliminated.' },
        { say: 'With water, you get a carboxylic acid. With an alcohol, an ester.', show: ['t.0', 't.1'], focus: ['t.0', 't.1'] },
        { say: 'With ammonia, an amide, and with a primary amine, an N-substituted amide.', show: ['t.2', 't.3'], focus: ['t.2', 't.3'] },
        { say: 'Acid anhydrides react in the same way, but give a carboxylic acid instead of H C l. Aspirin is made with ethanoic anhydride, which is cheaper and less corrosive.', caption: 'Acid anhydrides react in the same way, but give a carboxylic acid instead of HCl. Aspirin is made with ethanoic anhydride, which is cheaper and less corrosive.' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [{ kind: 'callout', id: 'm', tone: 'mistake', title: 'Two products, every time', md: 'An acyl chloride gives HCl (or $\\ce{NH4Cl}$ with ammonia); an anhydride gives a carboxylic acid.' }],
      lines: [{ say: 'A common mistake is to forget the second product. An acyl chloride always gives H C l as well, and an anhydride gives a carboxylic acid.', caption: 'A common mistake is to forget the second product. An acyl chloride always gives HCl as well, and an anhydride gives a carboxylic acid.', show: 'm' }],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Methyl propanoate is heated under reflux with sodium hydroxide solution. Which products form?',
          choices: ['Propanoic acid and methanol', 'Sodium methanoate and propanol', 'Methanoic acid and propan-1-ol', 'Sodium propanoate and methanol'],
          answer: 3,
          working: 'The propanoate part came from propanoic acid, which forms as its **sodium salt**; the methyl part came from methanol.',
        },
      ],
      lines: [
        { say: 'Your turn. Methyl propanoate is heated under reflux with sodium hydroxide solution. Which products form? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, sodium propanoate and methanol. In alkali, the acid forms as its sodium salt.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Esters are named alkyl alkanoate.', 'Acid hydrolysis is reversible; alkaline hydrolysis gives a salt.', 'Fats give soap with NaOH and biodiesel with methanol.', 'Acyl chlorides give HCl; anhydrides give a carboxylic acid.'] }],
      lines: [
        { say: 'Let’s sum up. Esters are named alkyl alkanoate.', show: 'sum.0' },
        { say: 'Acid hydrolysis is reversible, and alkaline hydrolysis gives a carboxylate salt.', show: 'sum.1' },
        { say: 'Fats give soap with sodium hydroxide, and biodiesel with methanol.', show: 'sum.2' },
        { say: 'And acyl chlorides give H C l, while anhydrides give a carboxylic acid.', caption: 'And acyl chlorides give HCl, while anhydrides give a carboxylic acid.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
