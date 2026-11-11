import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'cx-12-5',
  lessonId: 'cx-12-5',
  title: 'Amines',
  thumbnail: false,
  summary:
    'Amines are primary, secondary or tertiary by the number of carbons on the nitrogen, and quaternary ammonium ions have four. The nitrogen lone pair makes them bases: alkyl amines are stronger than ammonia, and phenylamine is weaker because its lone pair is delocalised into the ring. Halogenoalkanes and excess ammonia give a mixture of amines, reducing a nitrile gives only the primary amine, and nitrobenzene is reduced to phenylamine with tin and hydrochloric acid.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'A Level Organic Chemistry', title: 'Amines', subtitle: 'Ammonia with carbon attached' }],
      lines: [
        { say: 'Amines are what you get when the hydrogens of ammonia are swapped for carbon groups. They keep ammonia’s lone pair, so they are bases.', show: 'title' },
        { say: 'In this lesson, you will classify amines, compare their base strengths, and describe how they are made.' },
      ],
    },
    {
      chapter: 'Classifying amines',
      layout: 'center',
      main: [{ kind: 'table', id: 't', head: ['Type', 'Carbons on the N', 'Example'], rows: [['primary', '1', '$\\ce{CH3CH2NH2}$'], ['secondary', '2', '$\\ce{(CH3)2NH}$'], ['tertiary', '3', '$\\ce{(CH3)3N}$'], ['quaternary ion', '4', '$\\ce{(CH3)4N+}$']] }],
      lines: [
        { say: 'An amine is primary, secondary or tertiary by the number of carbons bonded to the nitrogen.', show: ['t.0', 't.1', 't.2'] },
        { say: 'A quaternary ammonium ion has four. With a long carbon chain, these are cationic surfactants, used in fabric softeners and hair conditioners.', show: 't.3', focus: 't.3' },
      ],
    },
    {
      chapter: 'Base strength',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\ce{CH3CH2NH2 + HCl -> CH3CH2NH3+Cl-}', '\\text{methylamine} > \\text{ammonia} > \\text{phenylamine}'] },
      ],
      lines: [
        { say: 'The lone pair on the nitrogen accepts a hydrogen ion, so amines are bases.', show: 'm.0', focus: 'm.0' },
        { say: 'The more available the lone pair, the stronger the base. Alkyl groups push electron density onto the nitrogen, so alkyl amines are stronger bases than ammonia.', show: 'm.1', focus: 'm.1' },
        { say: 'In phenylamine, the lone pair is partly drawn into the benzene ring, so it is a weaker base than ammonia.' },
      ],
    },
    {
      chapter: 'Making amines',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['Halogenoalkane + excess $\\ce{NH3}$: a mixture of amines', 'Nitrile + $\\ce{H2}$/Ni or $\\ce{LiAlH4}$: only the primary amine', 'Nitrobenzene + Sn and conc. HCl, then NaOH: phenylamine'] }],
      lines: [
        { say: 'Heating a halogenoalkane with excess ammonia gives an amine, but the amine can react again, so you get a mixture.', show: 'b.0' },
        { say: 'Reducing a nitrile, with hydrogen and a nickel catalyst, gives only the primary amine, so it is a better route to a pure product.', show: 'b.1' },
        { say: 'And aromatic amines are made by reducing nitrobenzene with tin and concentrated hydrochloric acid, then adding sodium hydroxide.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which is the strongest base?',
          choices: ['Phenylamine', 'Ammonia', 'Ethylamine', 'Water'],
          answer: 2,
          working: 'The ethyl group pushes electron density onto the nitrogen, so its lone pair is the **most available**.',
        },
      ],
      lines: [
        { say: 'Your turn. Which is the strongest base? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, ethylamine. Its ethyl group pushes electrons onto the nitrogen, making the lone pair most available.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Primary, secondary, tertiary: 1, 2 or 3 carbons on the N.', 'The N lone pair makes amines bases.', 'Alkyl amines > ammonia > phenylamine.', 'Reducing a nitrile gives a pure primary amine.'] }],
      lines: [
        { say: 'Let’s sum up. Primary, secondary and tertiary amines have one, two or three carbons on the nitrogen.', show: 'sum.0' },
        { say: 'The lone pair on the nitrogen makes amines bases.', show: 'sum.1' },
        { say: 'Alkyl amines are stronger bases than ammonia, and phenylamine is weaker.', show: 'sum.2' },
        { say: 'And reducing a nitrile gives a pure primary amine.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
