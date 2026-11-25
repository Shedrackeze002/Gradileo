import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import halogenoalkanes from '@/content/chemmore/videos/cx-9-2.ts';

// Exam question for More Chemistry Topics lesson 9.2 (halogenoalkanes): substitution of
// 1-bromobutane by aqueous hydroxide, why an iodoalkane reacts faster than a chloroalkane, and
// elimination with hydroxide in ethanol. Written by Gradileo in the style of an A level chemistry exam.
//
// The picture is the lesson's hydroxide ion substituting bromoethane (src/video/molecules.ts).

const QUESTION = '1-Bromobutane, CH₃CH₂CH₂CH₂Br, is warmed with aqueous sodium hydroxide. (a) Name the type of mechanism and the organic product. (b) The mean bond enthalpies are C–Cl 346 kJ mol⁻¹ and C–I 228 kJ mol⁻¹. Explain why 1-iodobutane reacts faster than 1-chlorobutane in the same reaction. (c) When 1-bromobutane is heated with potassium hydroxide dissolved in ethanol, a different reaction happens. Name the type of reaction and the organic product.';

const video: Explainer = {
  id: 'xq-cx-9-2',
  lessonId: '',
  exam: {
    lesson: 'cx-9-2',
    source: 'Exam-style question written by Gradileo, in the style of an A level chemistry exam',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: 1-Bromobutane with Hydroxide, in Water and in Ethanol. Halogenoalkanes',
  thumbnailTitle: 'Halogenoalkanes',
  thumbnail: 'ns',
  summary:
    'A test-style question, solved one small step at a time: what does 1-bromobutane make with aqueous hydroxide, why does an iodoalkane react faster than a chloroalkane, and what happens with hydroxide in ethanol instead? Aqueous hydroxide gives butan-1-ol by nucleophilic substitution, the weaker C–I bond breaks more easily, and in hot ethanol the hydroxide acts as a base, eliminating HBr to give but-1-ene.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Halogenoalkanes', subtitle: 'Substitution and elimination' }],
      lines: [
        { say: 'In this video, we solve a test-style question about halogenoalkanes. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of an A level chemistry exam question, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'Nucleophilic substitution, butan-1-ol; weaker C–I bond; elimination, but-1-ene' }],
      lines: [
        { say: 'Here is the question. 1-bromobutane is warmed with aqueous sodium hydroxide. Part a: name the type of mechanism and the organic product. Part b: the mean bond enthalpies are 346 kilojoules per mole for carbon to chlorine, and 228 kilojoules per mole for carbon to iodine. Explain why 1-iodobutane reacts faster than 1-chlorobutane in the same reaction. Part c: when 1-bromobutane is heated with potassium hydroxide dissolved in ethanol, a different reaction happens. Name the type of reaction and the organic product.', caption: 'Here is the question. 1-Bromobutane, CH₃CH₂CH₂CH₂Br, is warmed with aqueous sodium hydroxide. Part a: name the type of mechanism and the organic product. Part b: the mean bond enthalpies are C–Cl 346 kJ mol⁻¹ and C–I 228 kJ mol⁻¹. Explain why 1-iodobutane reacts faster than 1-chlorobutane in the same reaction. Part c: when 1-bromobutane is heated with potassium hydroxide dissolved in ethanol, a different reaction happens. Name the type of reaction and the organic product.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Hydroxide can **substitute** the halogen or **eliminate** it: the **solvent** decides' }],
      lines: [
        { say: 'The same hydroxide ion can do two different jobs. In water it swaps places with the halogen, and in hot ethanol it pulls off a hydrogen bromide molecule instead.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(halogenoalkanes, 'ns')],
      lines: [
        { say: 'Here is what we need. This is substitution by hydroxide up close, with bromoethane. The carbon bonded to the bromine is slightly positive, so the hydroxide ion’s lone pair attacks it.', show: 'ns', play: 'ns.attack' },
        { say: 'The new bond forms as the carbon to bromine bond breaks, and the bromide ion leaves. 1-bromobutane reacts in exactly the same way.', play: 'ns.swap' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Aqueous OH⁻: **nucleophilic substitution**', 'Rate depends on breaking the **C–halogen bond**', 'OH⁻ in hot ethanol: **elimination**'] }],
      lines: [
        { say: 'Here is the plan. In water, hydroxide is a nucleophile and replaces the bromine.', show: 'plan.0' },
        { say: 'How fast that happens depends on how easily the carbon to halogen bond breaks.', show: 'plan.1' },
        { say: 'And in hot ethanol, hydroxide acts as a base, and the reaction is elimination.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Substitution',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\ce{CH3CH2CH2CH2Br + OH- -> CH3CH2CH2CH2OH + Br-}', '\\good{\\text{nucleophilic substitution: butan-1-ol}}'] }],
      lines: [
        { say: 'Step one. The hydroxide ion attacks the slightly positive carbon, and the bromide ion leaves.', show: 'm.0' },
        { say: 'An O H group has taken the place of the bromine, so the mechanism is nucleophilic substitution and the product is butan-1-ol. That is part a.', caption: 'An OH group has taken the place of the bromine, so the mechanism is nucleophilic substitution and the product is butan-1-ol. That is part a.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Iodide versus chloride',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Bond', 'Bond enthalpy', 'Breaks', 'Rate'],
          rows: [
            ['C–Cl', '346 kJ mol⁻¹', 'less easily', 'slower'],
            ['C–I', '**228** kJ mol⁻¹', '**more easily**', '**faster**'],
          ],
        },
      ],
      lines: [
        { say: 'Step two. To react, the carbon to halogen bond must break. The carbon to chlorine bond needs 346 kilojoules per mole.', caption: 'Step two. To react, the carbon–halogen bond must break. The C–Cl bond needs 346 kJ mol⁻¹.', show: ['t', 't.0'], focus: 't.0' },
        { say: 'The carbon to iodine bond needs only 228, because the iodine atom is bigger and its bond is longer and weaker. A weaker bond breaks more easily, so 1-iodobutane reacts faster. That is part b.', caption: 'The C–I bond needs only 228, because the iodine atom is bigger and its bond is longer and weaker. A weaker bond breaks more easily, so 1-iodobutane reacts faster. That is part b.', show: 't.1', focus: 't.1' },
      ],
    },
    {
      chapter: 'Step 3: Elimination',
      layout: 'center',
      main: [{ kind: 'math', id: 'e', size: 'md', lines: ['\\ce{CH3CH2CH2CH2Br + OH- -> CH3CH2CH=CH2 + H2O + Br-}', '\\good{\\text{elimination: but-1-ene}}'] }],
      lines: [
        { say: 'Step three. In hot ethanol, the hydroxide ion acts as a base. It takes a hydrogen from the carbon next to the one holding the bromine, and the bromide ion leaves.', show: 'e.0' },
        { say: 'A double bond forms between those two carbons, so the reaction is elimination and the product is but-1-ene. That is part c.', show: 'e.1', focus: 'e.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) **Nucleophilic substitution**, giving **butan-1-ol**. (b) The **C–I bond is weaker**, so it breaks more easily. (c) **Elimination**, giving **but-1-ene**.' },
      ],
      lines: [
        { say: 'Does it make sense? The bromine is on the end carbon, which has only one neighbour, so the double bond can only form in one place, and but-1-ene is the only alkene.', show: 'ans' },
        { say: 'So water gives substitution and an alcohol, ethanol gives elimination and an alkene, and the weakest bond reacts fastest.' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Wrong answer', 'Where it comes from'],
          rows: [
            ['**Electrophilic** substitution', 'OH⁻ **donates** a lone pair'],
            ['Chlorine is more **electronegative**, so faster', 'The **bond enthalpy** decides'],
            ['**But-2-ene** from 1-bromobutane', 'Only C1 and C2 can join'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Hydroxide gives an electron pair to the carbon, so it is a nucleophile.', focus: 'traps.0' },
        { say: 'The C to chlorine bond is the most polar, yet chloroalkanes react slowest, because the strength of the bond matters more.', caption: 'The C–Cl bond is the most polar, yet chloroalkanes react slowest, because the strength of the bond matters more.', focus: 'traps.1' },
        { say: 'And the double bond forms next to the carbon that held the bromine, so 1-bromobutane gives but-1-ene.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which halogenoalkane reacts fastest with aqueous sodium hydroxide?',
          choices: ['1-chlorobutane', '1-iodobutane', '1-bromobutane', '1-fluorobutane'],
          answer: 1,
          working: 'The C–I bond is the weakest carbon–halogen bond, so 1-iodobutane reacts fastest.',
        },
      ],
      lines: [
        { say: 'Your turn. Which halogenoalkane reacts fastest with aqueous sodium hydroxide? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The carbon to iodine bond is the weakest, so 1-iodobutane reacts fastest: choice B.', show: 'q2.answer' },
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
          items: ['Aqueous OH⁻: **substitution**, an **alcohol**', 'Weaker C–X bond: **faster** reaction', 'OH⁻ in hot ethanol: **elimination**, an **alkene**'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Aqueous hydroxide substitutes the halogen and gives an alcohol.', show: 'sum.0' },
        { say: 'The weaker the carbon to halogen bond, the faster the reaction.', show: 'sum.1' },
        { say: 'And hydroxide in hot ethanol eliminates instead, giving an alkene. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
