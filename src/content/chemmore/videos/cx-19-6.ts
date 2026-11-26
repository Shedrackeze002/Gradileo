import type { Explainer } from '@/video/script.ts';
import { nucleophilicSubstitution } from './lib/cx-molecules.ts';
import { fission } from './lib/cx-waec.ts';

const video: Explainer = {
  id: 'cx-19-6',
  lessonId: 'cx-19-6',
  title: 'Bond Fission and Electronic Effects',
  thumbnail: 'fi',
  summary:
    'In homolytic fission each atom keeps one electron of the bond, giving free radicals, and in heterolytic fission one atom takes both, giving ions. Nucleophiles donate lone pairs, electrophiles accept pairs and free radicals have an unpaired electron. The inductive effect makes electron-withdrawing groups such as chlorine strengthen an acid and electron-pushing alkyl groups weaken it, and the mesomeric effect spreads charge over several atoms, stabilising the phenoxide and carboxylate ions and making phenylamine a weaker base than ammonia.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Organic Chemistry and Biochemistry', title: 'Bond Fission and Electronic Effects', subtitle: 'Following the electrons' }],
      lines: [
        { say: 'Why is chloroethanoic acid about eighty times stronger than ethanoic acid, when the chlorine is two atoms away from the acidic hydrogen?', show: 'title' },
        { say: 'In this lesson, you will see how bonds break, classify reagents, and use the inductive and mesomeric effects to compare acids and bases.' },
      ],
    },
    {
      chapter: 'Two ways to break a bond',
      layout: 'center',
      main: [fission('fi')],
      lines: [
        { say: 'Here is a chlorine molecule, and a molecule of hydrogen bromide.', show: 'fi' },
        { say: 'In ultraviolet light, the chlorine bond breaks evenly: each atom keeps one electron of the shared pair. This is homolytic fission, and it gives two free radicals.', play: 'fi.homo' },
        { say: 'The hydrogen bromide bond is polar, so it breaks unevenly. The more electronegative bromine takes both electrons, giving a positive hydrogen ion and a negative bromide ion. This is heterolytic fission.', play: 'fi.hetero' },
      ],
    },
    {
      chapter: 'Kinds of reagent',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Reagent', 'What it is', 'Examples'], rows: [['Nucleophile', 'has a lone pair; attacks electron-poor carbon', 'OH⁻, CN⁻, NH₃, H₂O'], ['Electrophile', 'electron-poor; accepts a pair', 'H⁺, NO₂⁺, Br⁺, carbocations'], ['Free radical', 'has an unpaired electron', 'Cl•, CH₃•']] },
      ],
      lines: [
        { say: 'A nucleophile has a lone pair, and attacks a carbon that is short of electrons. Hydroxide, cyanide, ammonia and water are nucleophiles.', show: 't.0' },
        { say: 'An electrophile is short of electrons, and accepts a pair from an electron-rich site, such as a double bond or a benzene ring. A free radical has an unpaired electron.', show: ['t.1', 't.2'] },
      ],
    },
    {
      chapter: 'A nucleophile attacks',
      layout: 'center',
      main: [nucleophilicSubstitution('ns')],
      lines: [
        { say: 'Here is a hydroxide ion, a nucleophile, near bromoethane. The carbon bonded to bromine is slightly positive.', show: 'ns' },
        { say: 'The curly arrows show the electron pairs moving: the hydroxide’s lone pair goes to the carbon, and the carbon to bromine pair goes to the bromine.', play: 'ns.attack' },
        { say: 'The hydroxide joins on, and the bromine leaves as a bromide ion, by heterolytic fission.', play: 'ns.swap' },
      ],
    },
    {
      chapter: 'The inductive effect',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Inductive effect', md: 'The shift of electrons along σ bonds. Halogens **withdraw** electrons (−I); alkyl groups **push** them (+I). It fades quickly with distance.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\ce{CH3COOH} < \\ce{ClCH2COOH} < \\ce{Cl2CHCOOH} < \\ce{Cl3CCOOH}', '\\text{(stronger acid)}'] },
      ],
      lines: [
        { say: 'The inductive effect is the shift of electrons along a chain of single bonds. Halogens pull electrons, and alkyl groups push them. The effect fades quickly with distance.', show: 'def' },
        { say: 'An acid is stronger when its anion is more stable. A chlorine atom pulls electrons away and spreads out the negative charge of the anion, so each extra chlorine makes the acid stronger.', show: 'm', focus: 'm' },
        { say: 'Fluorine pulls harder, so fluoroethanoic acid is stronger still. Alkyl groups push electrons, so methanoic acid is stronger than ethanoic acid, which is stronger than propanoic acid.' },
      ],
    },
    {
      chapter: 'The mesomeric effect',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Mesomeric effect', md: 'The spreading of π electrons or lone pairs over several atoms, through overlapping p orbitals.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{ethanol} < \\text{phenol} < \\text{ethanoic acid} \\quad \\text{(acid strength)}', '\\text{phenylamine} < \\ce{NH3} < \\text{methylamine} \\quad \\text{(base strength)}'] },
      ],
      lines: [
        { say: 'The mesomeric effect spreads electrons over several atoms. In the ethanoate ion, the negative charge is shared by both oxygens, and in the phenoxide ion it spreads into the benzene ring. So phenol is more acidic than ethanol, but much less than ethanoic acid.', show: ['def', 'm.0'] },
        { say: 'For bases, the methyl group pushes electrons onto nitrogen, so methylamine’s lone pair is more available than ammonia’s. In phenylamine, the lone pair spreads into the ring, so it is a weaker base.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which is the strongest acid?',
          choices: ['$\\ce{CH3COOH}$', '$\\ce{ClCH2COOH}$', '$\\ce{FCH2COOH}$', '$\\ce{CH3CH2COOH}$'],
          answer: 2,
          working: 'Fluorine is the most electronegative, so it withdraws electrons most strongly (−I) and best stabilises the anion.',
        },
      ],
      lines: [
        { say: 'Your turn. Which is the strongest acid: ethanoic, chloroethanoic, fluoroethanoic or propanoic acid? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, fluoroethanoic acid. Fluorine is the most electronegative, so it pulls electrons hardest and best stabilises the anion. Propanoic acid is the weakest.', show: 'q.answer' },
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
            'Homolytic fission gives free radicals; heterolytic fission gives ions.',
            'Nucleophiles donate pairs; electrophiles accept them; radicals are unpaired.',
            '−I groups (halogens) strengthen acids; +I groups (alkyl) weaken them.',
            'Delocalisation stabilises phenoxide and carboxylate, and weakens phenylamine.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Homolytic fission gives free radicals, and heterolytic fission gives ions.', show: 'sum.0' },
        { say: 'Nucleophiles donate electron pairs, electrophiles accept them, and free radicals have an unpaired electron.', show: 'sum.1' },
        { say: 'Electron-withdrawing groups such as halogens strengthen acids, and alkyl groups weaken them.', show: 'sum.2' },
        { say: 'And delocalisation stabilises the phenoxide and carboxylate ions, and makes phenylamine a weaker base.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
