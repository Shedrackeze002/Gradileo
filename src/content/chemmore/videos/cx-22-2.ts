import type { Explainer } from '@/video/script.ts';
import { catalysed } from '../../chem30/videos/lib/c30-particles.ts';
import { no2Mechanism } from './lib/cx-ap.ts';

const video: Explainer = {
  id: 'cx-22-2',
  lessonId: 'cx-22-2',
  title: 'Reaction Mechanisms and Rate Laws',
  thumbnail: 'mc',
  summary:
    'A mechanism is a series of elementary steps that add up to the overall equation, and each elementary step’s rate law comes from its own equation. Intermediates are made and then used; catalysts are used and then made again. The slowest step decides the rate, so a slow first step gives the rate law directly, and when a fast equilibrium comes first its intermediate is replaced using that equilibrium. On an energy profile, troughs are intermediates and the largest climb is the slow step.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'AP Chemistry', title: 'Reaction Mechanisms and Rate Laws', subtitle: 'The steps behind an equation' }],
      lines: [
        { say: 'The balanced equation for a reaction shows where it starts and ends, but most reactions get there through a series of simpler steps. That series decides the rate law.', show: 'title' },
        { say: 'In this lesson, you will find intermediates and catalysts in a mechanism, and work out the rate law a mechanism predicts.' },
      ],
    },
    {
      chapter: 'A mechanism, up close',
      layout: 'center',
      main: [no2Mechanism('mc')],
      lines: [
        { say: 'Here is the reaction of nitrogen dioxide with carbon monoxide, which makes nitrogen monoxide and carbon dioxide. It happens in two steps.', caption: 'Here is the reaction of nitrogen dioxide with carbon monoxide, NO₂ + CO → NO + CO₂. It happens in two steps.', show: 'mc' },
        { say: 'In the first step, two nitrogen dioxide molecules collide, and one takes an oxygen atom from the other. This step is slow.', caption: 'In the first step, two NO₂ molecules collide, and one takes an oxygen atom from the other. This step is slow.', play: 'mc.one' },
        { say: 'It makes N O three. In the fast second step, N O three hands that oxygen atom to carbon monoxide.', caption: 'It makes NO₃. In the fast second step, NO₃ hands that oxygen atom to CO.', play: 'mc.two' },
        { say: 'N O three was made in one step and used up in the next, so it never appears in the overall equation. It is an intermediate.', caption: 'NO₃ was made in one step and used up in the next, so it never appears in the overall equation. It is an intermediate.' },
      ],
    },
    {
      chapter: 'Intermediates and catalysts',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Elementary steps', md: 'For an elementary step, and only for one, the rate law comes from its equation: $\\ce{A + B -> products}$ has rate $= k[\\text{A}][\\text{B}]$.' },
        { kind: 'bullets', id: 'b', items: ['**Intermediate**: made in one step, used up in a later one', '**Catalyst**: used up in one step, made again in a later one'] },
      ],
      lines: [
        { say: 'Each step of a mechanism is an elementary step: a single collision, or a single molecule breaking apart. Its rate law comes straight from its equation.', show: 'def' },
        { say: 'An intermediate is made in one step and used up in a later one.', show: 'b.0' },
        { say: 'A catalyst is the other way round: used up in one step and made again in a later one. Neither appears in the overall equation.', show: 'b.1' },
      ],
    },
    {
      chapter: 'The slow step decides',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\ce{NO2 + NO2 -> NO3 + NO}\\quad\\text{(slow)}', '\\ce{NO3 + CO -> NO2 + CO2}\\quad\\text{(fast)}', '\\text{rate} = k[\\ce{NO2}]^2'] }],
      lines: [
        { say: 'The slowest step limits how fast the whole reaction can go, so it is called the rate determining step.', caption: 'The slowest step limits how fast the whole reaction can go, so it is called the rate-determining step.', show: 'm.0', focus: 'm.0' },
        { say: 'The second step is fast, so it waits on the first.', show: 'm.1', focus: 'm.1' },
        { say: 'So the rate law is the rate law of the slow first step: rate equals k times the concentration of nitrogen dioxide squared. Carbon monoxide does not appear in it, although it is a reactant.', caption: 'So the rate law is the rate law of the slow first step: rate = k[NO₂]². CO does not appear in it, although it is a reactant.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A fast equilibrium first',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\ce{2NO <=> N2O2}\\ \\text{(fast)};\\quad \\ce{N2O2 + O2 -> 2NO2}\\ \\text{(slow)}', '\\text{rate} = k_2[\\ce{N2O2}][\\ce{O2}],\\quad [\\ce{N2O2}] = K[\\ce{NO}]^2', '\\text{rate} = k[\\ce{NO}]^2[\\ce{O2}]'] }],
      lines: [
        { say: 'When a fast, reversible step comes first, it stays close to equilibrium, and the slow step’s rate law contains an intermediate.', show: 'm.0', focus: 'm.0' },
        { say: 'Here the slow step gives a rate in terms of N two O two. The fast equilibrium says that N two O two equals K times N O squared.', caption: 'Here the slow step gives a rate in terms of N₂O₂. The fast equilibrium says that [N₂O₂] = K[NO]².', show: 'm.1', focus: 'm.1' },
        { say: 'Substitute, and the rate law is k times N O squared times O two, with only reactants in it.', caption: 'Substitute, and the rate law is k[NO]²[O₂], with only reactants in it.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Catalysts, up close',
      layout: 'center',
      main: [catalysed('ct', { seed: 4 })],
      lines: [
        { say: 'A catalyst gives a new mechanism with a lower barrier. Here is the same mixture of hydrogen and oxygen in two boxes at the same temperature. The right box has a lower barrier, as a catalyst would give. Watch the count of water molecules.', show: ['ct', 'ct.labels', 'ct.tally', 'ct.thermo'], play: 'ct.go' },
        { say: 'The particles move at the same speeds in both boxes, but on the right many more collisions get over the lower barrier, so the reaction is much faster. On an energy profile, each step has its own peak, and the step with the largest climb is the slow one.', focus: 'ct.tally' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Step 1: $\\ce{H2O2 + I- -> H2O + IO-}$ (slow). Step 2: $\\ce{H2O2 + IO- -> H2O + O2 + I-}$ (fast). What rate law does this predict?',
          choices: ['$k[\\ce{H2O2}]^2$', '$k[\\ce{IO-}][\\ce{H2O2}]$', '$k[\\ce{H2O2}]$', '$k[\\ce{H2O2}][\\ce{I-}]$'],
          answer: 3,
          working: 'The slow first step is one $\\ce{H2O2}$ meeting one $\\ce{I-}$, so rate $= k[\\ce{H2O2}][\\ce{I-}]$.',
        },
      ],
      lines: [
        { say: 'Your turn. Hydrogen peroxide reacts with iodide ions in a slow step, then with I O minus in a fast step. What rate law does this mechanism predict? Pause the video and try it.', caption: 'Your turn. H₂O₂ reacts with I⁻ in a slow step, then with IO⁻ in a fast step. What rate law does this mechanism predict? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. The slow first step is one hydrogen peroxide molecule meeting one iodide ion. Iodide is used, then made again, so it is a catalyst.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A mechanism is a series of elementary steps.', 'Intermediates: made then used. Catalysts: used then made.', 'The slowest step decides the rate law.', 'With a fast equilibrium first, replace the intermediate.'] }],
      lines: [
        { say: 'Let’s sum up. A mechanism is a series of elementary steps that add up to the overall equation.', show: 'sum.0' },
        { say: 'Intermediates are made then used, and catalysts are used then made again.', show: 'sum.1' },
        { say: 'The slowest step decides the rate law.', show: 'sum.2' },
        { say: 'And when a fast equilibrium comes first, replace the intermediate using that equilibrium.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
