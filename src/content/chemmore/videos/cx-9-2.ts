import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'cx-9-2',
  lessonId: 'cx-9-2',
  title: 'Halogenoalkanes and Ozone Depletion',
  thumbnail: false,
  summary:
    'Halogenoalkanes are primary, secondary or tertiary. Aqueous hydroxide, cyanide and ammonia substitute the halogen, giving alcohols, nitriles and amines, while hot hydroxide in ethanol eliminates to give alkenes. The rate depends on the carbon–halogen bond enthalpy, so iodoalkanes react fastest. In the upper atmosphere UV light breaks the C–Cl bond in CFCs, and chlorine radicals catalyse the breakdown of ozone.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'A Level Organic Mechanisms and Analysis', title: 'Halogenoalkanes and Ozone', subtitle: 'Too unreactive for their own good' }],
      lines: [
        { say: 'Halogenoalkanes are useful because they are reactive. But one family of them, the C F C gases, was so unreactive at ground level that it drifted up to the ozone layer and began to destroy it.', caption: 'Halogenoalkanes are useful because they are reactive. But one family of them, the CFCs, was so unreactive at ground level that it drifted up to the ozone layer and began to destroy it.', show: 'title' },
        { say: 'In this lesson, you will predict the reactions of halogenoalkanes, compare their rates, and explain how C F C gases deplete ozone.', caption: 'In this lesson, you will predict the reactions of halogenoalkanes, compare their rates, and explain how CFCs deplete ozone.' },
      ],
    },
    {
      chapter: 'Substitution and elimination',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Reagent', 'Product from 1-bromopropane'], rows: [['NaOH(aq), warm', 'propan-1-ol'], ['KCN in ethanol', 'butanenitrile (one carbon longer)'], ['Excess $\\ce{NH3}$ in ethanol', 'propylamine'], ['Hot KOH in ethanol', 'propene']] },
      ],
      lines: [
        { say: 'With warm aqueous hydroxide, the halogen is replaced by O H, giving an alcohol.', caption: 'With warm aqueous hydroxide, the halogen is replaced by OH, giving an alcohol.', show: 't.0', focus: 't.0' },
        { say: 'With potassium cyanide, it gives a nitrile, one carbon longer. That is a useful way to lengthen a chain.', show: 't.1', focus: 't.1' },
        { say: 'With excess ammonia, it gives an amine.', show: 't.2', focus: 't.2' },
        { say: 'But with hot hydroxide in ethanol, the hydroxide acts as a base, and an alkene forms instead.', show: 't.3', focus: 't.3' },
      ],
    },
    {
      chapter: 'Which reacts fastest?',
      layout: 'center',
      main: [{ kind: 'table', id: 't', head: ['Bond', 'Bond enthalpy'], rows: [['C–F', '467 kJ mol⁻¹'], ['C–Cl', '346 kJ mol⁻¹'], ['C–Br', '290 kJ mol⁻¹'], ['C–I', '228 kJ mol⁻¹']] }],
      lines: [
        { say: 'The carbon fluorine bond is the most polar, but the rate depends on how hard the bond is to break.', caption: 'The C–F bond is the most polar, but the rate depends on how hard the bond is to break.', show: 't' },
        { say: 'The carbon iodine bond is the weakest, so iodoalkanes react fastest. With silver nitrate, yellow silver iodide appears first.', caption: 'The C–I bond is the weakest, so iodoalkanes react fastest. With silver nitrate, yellow silver iodide appears first.' },
      ],
    },
    {
      chapter: 'CFCs and ozone',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\ce{CCl3F -> ^.CCl2F + Cl^.}', '\\ce{Cl^. + O3 -> ClO^. + O2}', '\\ce{ClO^. + O3 -> 2O2 + Cl^.}'] }],
      lines: [
        { say: 'Ozone in the upper atmosphere absorbs harmful ultraviolet radiation. High up, that same light breaks the weakest bond in a C F C, the carbon chlorine bond, making chlorine radicals.', caption: 'Ozone in the upper atmosphere absorbs harmful ultraviolet radiation. High up, that same light breaks the weakest bond in a CFC, the C–Cl bond, making chlorine radicals.', show: 'm.0', focus: 'm.0' },
        { say: 'A chlorine radical reacts with ozone, and the chlorine oxide radical then reacts with another ozone molecule, giving the chlorine radical back.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2'] },
        { say: 'So chlorine is a catalyst, and one radical can destroy thousands of ozone molecules. That is why C F C gases were replaced by chlorine-free H F C gases.', caption: 'So chlorine is a catalyst, and one radical can destroy thousands of ozone molecules. That is why CFCs were replaced by chlorine-free HFCs.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which halogenoalkane reacts fastest with aqueous silver nitrate?',
          choices: ['1-chlorobutane', '1-iodobutane', '1-fluorobutane', '1-bromobutane'],
          answer: 1,
          working: 'The C–I bond has the **lowest bond enthalpy**, so it breaks most easily.',
        },
      ],
      lines: [
        { say: 'Your turn. Which halogenoalkane reacts fastest with aqueous silver nitrate? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, one iodobutane. Its carbon iodine bond is the weakest, so it breaks most easily.', caption: 'The answer is B, 1-iodobutane. Its C–I bond is the weakest, so it breaks most easily.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Hydroxide, cyanide and ammonia substitute; hot hydroxide in ethanol eliminates.', 'The weakest bond, C–I, reacts fastest.', 'UV light breaks C–Cl in CFCs, making chlorine radicals.', 'Chlorine radicals catalyse the breakdown of ozone.'] }],
      lines: [
        { say: 'Let’s sum up. Hydroxide, cyanide and ammonia substitute the halogen, while hot hydroxide in ethanol eliminates.', show: 'sum.0' },
        { say: 'The weakest carbon halogen bond, to iodine, reacts fastest.', caption: 'The weakest carbon–halogen bond, C–I, reacts fastest.', show: 'sum.1' },
        { say: 'Ultraviolet light breaks the carbon chlorine bond in C F C gases.', caption: 'Ultraviolet light breaks the C–Cl bond in CFCs.', show: 'sum.2' },
        { say: 'And the chlorine radicals catalyse the breakdown of ozone.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
