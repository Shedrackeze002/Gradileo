import type { Explainer } from '@/video/script.ts';
import { saltDissolving } from '../../chem20/videos/lib/c20-particles.ts';
import { sparked } from '../../chem30/videos/lib/c30-particles.ts';

const video: Explainer = {
  id: 'cx-24-1',
  lessonId: 'cx-24-1',
  title: 'Free Energy and Equilibrium',
  thumbnail: false,
  summary:
    'ΔG° = −RT ln K, so a negative ΔG° means K is greater than 1 and a positive one means K is less than 1. A favoured reaction with a high activation energy can be too slow to see: it is under kinetic control. Coupled reactions add their free energy changes, so a favoured reaction can drive one that is not, and whether a solid dissolves depends on the balance of three enthalpy changes and on the change in entropy.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'AP Chemistry', title: 'Free Energy and Equilibrium', subtitle: 'How far a reaction goes, and whether it goes at all' }],
      lines: [
        { say: 'The sign of delta G tells you whether a reaction is favoured. The equilibrium constant tells you how far it goes. The two must be connected.', caption: 'The sign of ΔG° tells you whether a reaction is favoured. The equilibrium constant tells you how far it goes. The two must be connected.', show: 'title' },
        { say: 'In this lesson, you will link delta G to K, and look at reactions that are favoured but slow, reactions driven by coupling, and the free energy of dissolving.', caption: 'In this lesson, you will link ΔG° to K, and look at reactions that are favoured but slow, reactions driven by coupling, and the free energy of dissolving.' },
      ],
    },
    {
      chapter: 'Free energy and K',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\Delta G^\\circ = -RT\\ln K', '\\ln K = -\\dfrac{-10\\,000}{8.314 \\times 298} = 4.04', 'K = e^{4.04} = 57'] },
      ],
      lines: [
        { say: 'Delta G standard equals negative R T times the natural log of K, with R equal to eight point three one four joules per mole per kelvin. So a negative delta G gives K greater than one, and a positive delta G gives K less than one.', caption: 'ΔG° = −RT ln K, with R = 8.314 J mol⁻¹ K⁻¹. So a negative ΔG° gives K greater than 1, and a positive ΔG° gives K less than 1.', show: 'm.0', focus: 'm.0' },
        { say: 'A reaction has a delta G of negative ten kilojoules per mole at two hundred ninety-eight kelvin. Change it to joules, and the log of K is four point zero four.', caption: 'A reaction has ΔG° = −10.0 kJ/mol at 298 K. Change it to joules, and ln K = 4.04.', show: 'm.1', focus: 'm.1' },
        { say: 'So K is about fifty-seven. A few kilojoules either way changes K by a large factor.', caption: 'So K is about 57. A few kilojoules either way changes K by a large factor.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Favoured but slow, up close',
      layout: 'center',
      main: [sparked('sk', { seed: 2 })],
      lines: [
        { say: 'Making water from hydrogen and oxygen has a large negative delta G, yet this mixture can sit for years. Here it is up close. The molecules collide all the time, but almost every collision is too gentle to react. Now a spark heats the mixture for a moment.', caption: 'Making water from hydrogen and oxygen has a large negative ΔG°, yet this mixture can sit for years. Here it is up close. The molecules collide all the time, but almost every collision is too gentle to react. Now a spark heats the mixture for a moment.', show: ['sk', 'sk.labels', 'sk.tally', 'sk.thermo'], play: 'sk.spark' },
        { say: 'The reaction takes off. It was favoured all along, but its activation energy was too high. Such a reaction is under kinetic control, and a mixture that is not changing is not necessarily at equilibrium.', focus: 'sk.tally' },
      ],
    },
    {
      chapter: 'Coupled reactions',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{glucose} + \\text{phosphate} \\to \\text{glucose 6-phosphate}\\quad +13.8', '\\text{ATP} + \\text{water} \\to \\text{ADP} + \\text{phosphate}\\quad {-30.5}', '\\Delta G^\\circ = 13.8 + (-30.5) = -16.7\\ \\text{kJ/mol}'] }],
      lines: [
        { say: 'A reaction that is not favoured can be driven by joining it to one that is. In a cell, adding phosphate to glucose has a delta G of plus thirteen point eight kilojoules per mole.', caption: 'A reaction that is not favoured can be driven by joining it to one that is. In a cell, adding phosphate to glucose has ΔG° = +13.8 kJ/mol.', show: 'm.0', focus: 'm.0' },
        { say: 'Breaking down A T P has a delta G of minus thirty point five.', caption: 'Breaking down ATP has ΔG° = −30.5 kJ/mol.', show: 'm.1', focus: 'm.1' },
        { say: 'Coupled together, the free energy changes add up to minus sixteen point seven, so the coupled process is favoured.', caption: 'Coupled together, the free energy changes add up to −16.7 kJ/mol, so the coupled process is favoured.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Dissolving, up close',
      layout: 'center',
      main: [{ ...saltDissolving('sd'), key: true }],
      lines: [
        { say: 'Here is a crystal of sodium chloride dropped into water. Dissolving it has three steps.', show: ['sd', 'sd.labels', 'sd.key'] },
        { say: 'Separating the ions takes in energy, and so does making room among the water molecules. The ions’ attraction to the water gives energy out. Whether a salt dissolves depends on that balance, and on the rise in entropy as the ions spread out, which is why some salts dissolve even though it takes in heat.', caption: 'Separating the ions takes in energy, and so does making room among the water molecules. The ions’ attraction to the water gives energy out. Whether a salt dissolves depends on that balance, and on the rise in entropy as the ions spread out, which is why some salts dissolve even though it takes in heat.', play: 'sd.drop' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A reaction has $\\Delta G^\\circ = +20$ kJ/mol at 298 K. What can you say about $K$?',
          choices: ['$K > 1$', '$K < 1$', '$K = 1$', '$K$ is negative'],
          answer: 1,
          working: '$\\ln K = -\\dfrac{\\Delta G^\\circ}{RT}$ is negative, so $K$ is between 0 and 1: reactants are favoured.',
        },
      ],
      lines: [
        { say: 'Your turn. A reaction has a delta G of plus twenty kilojoules per mole. What can you say about its equilibrium constant? Pause the video and try it.', caption: 'Your turn. A reaction has ΔG° = +20 kJ/mol. What can you say about its equilibrium constant? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, K is less than one. A positive delta G makes the log of K negative, so the reactants are favoured.', caption: 'The answer is B, K is less than 1. A positive ΔG° makes ln K negative, so the reactants are favoured.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['ΔG° = −RT ln K.', 'Negative ΔG°: K > 1. Positive ΔG°: K < 1.', 'Favoured but slow: kinetic control.', 'Coupled reactions add their ΔG° values.'] }],
      lines: [
        { say: 'Let’s sum up. Delta G standard equals negative R T log K.', caption: 'Let’s sum up. ΔG° = −RT ln K.', show: 'sum.0' },
        { say: 'A negative delta G means K is greater than one, and a positive one means K is less than one.', caption: 'A negative ΔG° means K is greater than 1, and a positive one means K is less than 1.', show: 'sum.1' },
        { say: 'A favoured reaction with a high activation energy can be too slow to see. It is under kinetic control.', show: 'sum.2' },
        { say: 'And coupled reactions add their free energy changes, so a favoured reaction can drive one that is not.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
