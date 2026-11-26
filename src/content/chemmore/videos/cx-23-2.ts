import type { Explainer } from '@/video/script.ts';
import { strongAndWeak } from '../../chem20/videos/lib/c20-particles.ts';
import { hfAndWater } from '../../chem30/videos/lib/c30-protons.ts';

const video: Explainer = {
  id: 'cx-23-2',
  lessonId: 'cx-23-2',
  title: 'Acid Strength, Structure and pKa',
  thumbnail: false,
  summary:
    'An acid is stronger when its conjugate base is more stable. A more electronegative atom, extra oxygen atoms in an oxoacid and resonance in the conjugate base all make an acid stronger. pKa = −log Ka, and a smaller pKa means a stronger acid. Below the pKa the protonated form dominates, at the pKa the two forms are equal, and above it the deprotonated form dominates, so the best indicator for a titration has a pKa close to the pH at the equivalence point.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'AP Chemistry', title: 'Acid Strength, Structure and pKa', subtitle: 'Why some acids let go more easily' }],
      lines: [
        { say: 'Hydrochloric acid gives up its proton completely in water, while acetic acid barely does. The difference lies in the structure of each acid, and above all in how stable its conjugate base is.', show: 'title' },
        { say: 'In this lesson, you will explain acid strength from structure, and use p K a to decide which form of an acid is present.', caption: 'In this lesson, you will explain acid strength from structure, and use pKa to decide which form of an acid is present.' },
      ],
    },
    {
      chapter: 'Strong and weak, up close',
      layout: 'center',
      main: [strongAndWeak('sw')],
      lines: [
        { say: 'Here are seven molecules of hydrochloric acid in water on the left, and seven of acetic acid on the right.', show: ['sw', 'sw.labels', 'sw.key'] },
        { say: 'Every hydrogen chloride molecule hands its proton to a water molecule, so all seven ionise. Hydrochloric acid is strong.', play: 'sw.go', focus: 'sw.s', show: 'sw.tally' },
        { say: 'Acetic acid holds on to its proton much more tightly. Only now and then does a molecule ionise, and the proton often goes back. Acetic acid is weak.', focus: 'sw.w' },
      ],
    },
    {
      chapter: 'A proton moves',
      layout: 'center',
      main: [hfAndWater('pt')],
      lines: [
        { say: 'Here is a hydrogen fluoride molecule and a water molecule. Watch the proton move.', show: 'pt', play: 'pt.go' },
        { say: 'What decides how readily this happens is the stability of the conjugate base left behind. The more stable the base, the more easily the acid lets go of its proton, and the stronger the acid.' },
      ],
    },
    {
      chapter: 'What makes a strong acid',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['**Electronegativity**: $\\ce{HCl}$ is stronger than $\\ce{H2S}$', '**Extra oxygens**: $\\ce{HClO4} > \\ce{HClO3} > \\ce{HClO}$', '**Resonance**: ethanoic acid is far stronger than ethanol'] }],
      lines: [
        { say: 'Three features make the conjugate base more stable. Across a period, a more electronegative atom holds the negative charge better, so hydrogen chloride is a stronger acid than hydrogen sulfide.', show: 'b.0' },
        { say: 'In oxoacids, each extra oxygen pulls electron density away from the O H bond and spreads out the charge, so perchloric acid is the strongest of these.', caption: 'In oxoacids, each extra oxygen pulls electron density away from the O–H bond and spreads out the charge, so perchloric acid is the strongest of these.', show: 'b.1' },
        { say: 'And the ethanoate ion spreads its charge over two oxygen atoms by resonance, while the ethoxide ion keeps it on one. So ethanoic acid is far stronger than ethanol.', show: 'b.2' },
      ],
    },
    {
      chapter: 'pH and pKa',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{p}K_a = -\\log K_a'] },
        { kind: 'bullets', id: 'b', items: ['pH < pKa: mostly HA, the protonated form', 'pH = pKa: HA and A⁻ in equal amounts', 'pH > pKa: mostly A⁻, the conjugate base'] },
      ],
      lines: [
        { say: 'The p K a is the negative log of K a. A smaller p K a means a stronger acid.', caption: 'pKa = −log Ka. A smaller pKa means a stronger acid.', show: 'm' },
        { say: 'Comparing the p H with the p K a tells you which form dominates. Below the p K a, the protonated form is present in the larger amount.', caption: 'Comparing the pH with the pKa tells you which form dominates. Below the pKa, the protonated form is present in the larger amount.', show: 'b.0' },
        { say: 'At the p K a, the two forms are equal.', caption: 'At the pKa, the two forms are equal.', show: 'b.1' },
        { say: 'And above it, the conjugate base dominates. In blood at p H seven point four, a carboxyl group with a p K a of about two is almost all deprotonated.', caption: 'And above it, the conjugate base dominates. In blood at pH 7.4, a carboxyl group with a pKa of about 2 is almost all deprotonated.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Choosing an indicator',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'tip', title: 'Indicators', md: 'An indicator is a weak acid whose two forms have different colours. It changes colour around its own pKa, so choose one whose **pKa is close to the pH at the equivalence point**.' }],
      lines: [{ say: 'An indicator is a weak acid whose two forms have different colours, so it changes colour around its own p K a. For a titration, choose an indicator whose p K a is close to the p H at the equivalence point.', caption: 'An indicator is a weak acid whose two forms have different colours, so it changes colour around its own pKa. For a titration, choose an indicator whose pKa is close to the pH at the equivalence point.', show: 'c' }],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Benzoic acid has $\\text{p}K_a = 4.20$. In a solution of pH 6.0, which form is present in the larger amount?',
          choices: ['The protonated form', 'Both, equally', 'The conjugate base', 'Neither form'],
          answer: 2,
          working: 'pH 6.0 is above the pKa of 4.20, so the deprotonated form, the conjugate base, dominates.',
        },
      ],
      lines: [
        { say: 'Your turn. Benzoic acid has a p K a of four point two. In a solution of p H six, which form is present in the larger amount? Pause the video and try it.', caption: 'Your turn. Benzoic acid has a pKa of 4.20. In a solution of pH 6.0, which form is present in the larger amount? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, the conjugate base. The p H is above the p K a, so most of the acid has lost its proton.', caption: 'The answer is C, the conjugate base. The pH is above the pKa, so most of the acid has lost its proton.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A more stable conjugate base means a stronger acid.', 'Electronegativity, extra oxygens and resonance all help.', 'pKa = −log Ka; smaller pKa, stronger acid.', 'Below pKa: HA. At pKa: equal. Above pKa: A⁻.'] }],
      lines: [
        { say: 'Let’s sum up. An acid is stronger when its conjugate base is more stable.', show: 'sum.0' },
        { say: 'Electronegativity, extra oxygen atoms and resonance all make the conjugate base more stable.', show: 'sum.1' },
        { say: 'The p K a is the negative log of K a, and a smaller p K a means a stronger acid.', caption: 'pKa = −log Ka, and a smaller pKa means a stronger acid.', show: 'sum.2' },
        { say: 'And below the p K a the protonated form dominates, at the p K a the two are equal, and above it the conjugate base dominates.', caption: 'And below the pKa the protonated form dominates, at the pKa the two are equal, and above it the conjugate base dominates.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
