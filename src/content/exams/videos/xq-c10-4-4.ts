import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { reaction } from '@/content/chem10/videos/lib/c10-equations.ts';
import { energyLevels } from '@/content/chem10/videos/lib/c10-4-figures.ts';
import { hotAndCold } from '@/content/chem10/videos/lib/c10-particles.ts';

// Exam question for Chemistry 10 lesson 4.4 (energy in reactions): read the activation energy and
// the energy change of hydrogen and chlorine from an energy level diagram, say whether it is
// exothermic and what a thermometer shows, and explain the sign with bond breaking and making.
// Gradileo wrote this one in the style of a high-school chemistry unit test (OpenStax's
// thermochemistry exercises are calculations beyond this lesson). Answers: (a) 450 - 300 = 150 kJ;
// (b) 116 - 300 = -184 kJ; (c) exothermic, so the temperature rises; (d) more energy is given out
// making the H-Cl bonds than is taken in breaking the H-H and Cl-Cl bonds.
//
// The pictures: the energy level diagram with the climb and the drop marked; two reactions in
// solution mixing, one warming and one cooling, with a thermometer by each (src/video/particles.ts);
// and hydrogen and chlorine molecules coming apart (energy in) and joining up as hydrogen chloride
// (energy out), with every atom kept (src/video/molecules.ts).

const QUESTION =
  'Hydrogen reacts with chlorine to form hydrogen chloride: H2 + Cl2 → 2HCl. On an energy level diagram for the reaction, the reactants are at 300 kJ, the top of the curve is at 450 kJ and the products are at 116 kJ. (a) Find the activation energy. (b) Find the energy change, ΔH. (c) Is the reaction exothermic or endothermic? What would a thermometer in the reaction mixture show? (d) Explain the sign of ΔH in terms of breaking and making bonds.';

const diagram = () => figure('d', [energyLevels({ reactants: 300, peak: 450, products: 116, per: 100, step: 100, max: 500 })], 460);
const DIAGRAM = ['d.axes', 'd.curve', 'd.reactants', 'd.products'];

const video: Explainer = {
  id: 'xq-c10-4-4',
  lessonId: '',
  exam: {
    lesson: 'c10-4-4',
    source: 'Exam-style question written by Gradileo, in the style of a high-school chemistry unit test',
    licence: 'Gradileo\'s own question',
    question: QUESTION,
  },
  title: 'Exam Question: Reading an Energy Level Diagram. Energy in Reactions',
  thumbnailTitle: 'Read the Energy Diagram',
  thumbnail: 'd',
  summary:
    'An exam-style question, solved one small step at a time: from an energy level diagram for hydrogen and chlorine we read the activation energy and the energy change, decide that the reaction is exothermic, and explain why with the bonds that break and form. We watch a reaction warm its surroundings and see the molecules come apart and join up again.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Read the Energy Diagram', subtitle: 'Energy in reactions, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam-style question about the energy change when hydrogen reacts with chlorine. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'Gradileo wrote this question in the style of a high-school chemistry test. You will see that at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          kicker: 'The question',
          prompt: 'Hydrogen reacts with chlorine to form hydrogen chloride: $\\ce{H2 + Cl2 -> 2HCl}$. On an energy level diagram for the reaction, the reactants are at $300\\ \\text{kJ}$, the top of the curve is at $450\\ \\text{kJ}$ and the products are at $116\\ \\text{kJ}$.<br>(a) Find the activation energy.<br>(b) Find the energy change, $\\Delta H$.<br>(c) Is the reaction exothermic or endothermic? What would a thermometer in the reaction mixture show?<br>(d) Explain the sign of $\\Delta H$ in terms of breaking and making bonds.',
          answer: '(a) 150 kJ (b) −184 kJ (c) exothermic: the temperature rises (d) more energy out making bonds than in breaking them',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'Hydrogen reacts with chlorine to form hydrogen chloride. On an energy level diagram for the reaction, the reactants are at 300 kilojoules, the top of the curve is at 450 kilojoules, and the products are at 116 kilojoules.' },
        { say: 'Part a: find the activation energy. Part b: find the energy change, delta H. Part c: is the reaction exothermic or endothermic, and what would a thermometer in the reaction mixture show? Part d: explain the sign of delta H in terms of breaking and making bonds.', caption: 'Part (a): find the activation energy. Part (b): find the energy change, ΔH. Part (c): is the reaction exothermic or endothermic, and what would a thermometer in the reaction mixture show? Part (d): explain the sign of ΔH in terms of breaking and making bonds.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 760,
      left: [diagram()],
      right: [{ kind: 'text', id: 'plain', size: 'md', md: 'Three heights on one diagram: **reactants**, the **top of the curve**, and **products**' }],
      lines: [
        { say: 'Let us draw what we are told. Energy goes up the side, and the reaction runs from left to right.', show: ['d.axes', 'plain'] },
        { say: 'The reactants start at 300 kilojoules. The curve climbs to 450, then drops to the products at 116.', show: ['d.curve', 'd.reactants', 'd.products'] },
        { say: 'The first two parts ask for differences between these heights, and the last two ask what they mean.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'facts',
          head: ['Term', 'Meaning'],
          rows: [
            ['Activation energy', 'The **climb** from the reactants to the top of the curve'],
            ['Energy change, $\\Delta H$', '**Products − reactants**'],
            ['Exothermic', '$\\Delta H$ **negative**: energy given out, surroundings **warm up**'],
            ['Endothermic', '$\\Delta H$ **positive**: energy taken in, surroundings **cool down**'],
          ],
        },
      ],
      lines: [
        { say: 'Here is what we need. The activation energy is the climb from the reactants to the top of the curve: the energy the particles need to start reacting.', show: 'facts.0' },
        { say: 'The energy change, delta H, is the energy of the products minus the energy of the reactants.', show: 'facts.1', caption: 'The energy change, ΔH, is the energy of the products minus the energy of the reactants.' },
        { say: 'If delta H is negative, energy is given out to the surroundings, and the reaction is exothermic.', show: 'facts.2', caption: 'If ΔH is negative, energy is given out to the surroundings, and the reaction is exothermic.' },
        { say: 'If delta H is positive, energy is taken in from the surroundings, and the reaction is endothermic.', show: 'facts.3', caption: 'If ΔH is positive, energy is taken in from the surroundings, and the reaction is endothermic.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Activation energy: **top − reactants**', 'Energy change: **products − reactants**', 'Use the **sign** to name the type, then explain it with **bonds**'] }],
      lines: [
        { say: 'Here is the plan. First, the activation energy: the top of the curve minus the reactants.', show: 'plan.0' },
        { say: 'Second, the energy change: the products minus the reactants.', show: 'plan.1' },
        { say: 'Third, use the sign of the energy change to name the type of reaction, and explain it with the bonds that break and form.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Parts (a) and (b)',
      layout: 'split',
      leftWidth: 760,
      left: [diagram()],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['E_a = 450 - 300', '\\phantom{E_a} = \\adj{150\\ \\text{kJ}}', '\\Delta H = 116 - 300', '\\phantom{\\Delta H} = \\opp{-184\\ \\text{kJ}}'],
        },
      ],
      lines: [
        { say: 'Step one. Part a: the activation energy is the climb from the reactants to the top of the curve.', show: DIAGRAM },
        { say: 'That is 450 minus 300, which is 150 kilojoules.', show: ['d.ea', 'm.0', 'm.1'], focus: ['d.ea', 'm.1'] },
        { say: 'Part b: the energy change is the products minus the reactants: 116 minus 300, which is negative 184 kilojoules.', show: ['d.dh', 'm.2', 'm.3'], focus: ['d.dh', 'm.3'] },
        { say: 'The minus sign matters. The products end up lower than the reactants, so energy has left the chemicals.' },
      ],
    },
    {
      chapter: 'Step 2: Part (c)',
      layout: 'split',
      leftWidth: 760,
      left: [hotAndCold('hc', 420)],
      right: [{ kind: 'callout', id: 'c', tone: 'key', title: 'Part (c)', md: '$\\Delta H$ is negative, so the reaction is **exothermic**. The thermometer shows the temperature **rising**.' }],
      lines: [
        { say: 'Step two, part c. Here are two reactions in solution, each with a thermometer, starting at the same temperature.', show: ['hc', 'hc.labels', 'hc.thermo'] },
        { say: 'Mix them. On the left, every pair of particles that reacts gives out energy, so the particles around them speed up and the temperature rises. That is an exothermic reaction. On the right, the temperature falls: that one is endothermic.', play: 'hc.mix', focus: 'hc.ex' },
        { say: 'Our energy change is negative, so hydrogen and chlorine behave like the left-hand box. The reaction is exothermic, and a thermometer in the mixture shows the temperature rising.', show: 'c' },
      ],
    },
    {
      chapter: 'Step 3: Part (d)',
      layout: 'center',
      main: [
        reaction('hcl', { from: [{ t: 'H2' }, { t: 'Cl2' }], to: [{ t: 'HCl', n: 2 }], foot: { before: 'breaking bonds: energy in', after: 'making bonds: energy out' }, height: 360 }),
        { kind: 'callout', id: 'd', tone: 'key', title: 'Part (d)', md: 'More energy is **given out** making the H–Cl bonds than is **taken in** breaking the H–H and Cl–Cl bonds, so $\\Delta H$ is negative.' },
      ],
      lines: [
        { say: 'Step three, part d. Here are a hydrogen molecule and a chlorine molecule. To react, their bonds must break, and breaking a bond takes energy in, because the atoms have to be pulled apart.', show: 'hcl', play: 'hcl.split', playDelay: 0.3 },
        { say: 'Then the atoms join up as two hydrogen chloride molecules. Making a bond gives energy out, as the atoms pull together.', play: 'hcl.join' },
        { say: 'Since delta H is negative, more energy is given out making the new H Cl bonds than is taken in breaking the old H H and Cl Cl bonds. The extra energy warms the surroundings.', show: 'd', caption: 'Since ΔH is negative, more energy is given out making the new H–Cl bonds than is taken in breaking the old H–H and Cl–Cl bonds. The extra energy warms the surroundings.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'ans',
          head: ['Part', 'Answer'],
          rows: [
            ['(a)', '$E_a = 450 - 300 = $ **150 kJ**'],
            ['(b)', '$\\Delta H = 116 - 300 = $ **−184 kJ**'],
            ['(c)', '**Exothermic**: the temperature **rises**'],
            ['(d)', 'Energy out making bonds **>** energy in breaking bonds'],
          ],
        },
      ],
      lines: [
        { say: 'Here is the whole answer.', show: 'ans' },
        { say: 'A quick check: the products are drawn below the reactants, which always means a negative energy change and an exothermic reaction, so parts b and c agree.' },
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
            ['(a) 450 kJ', 'Read the **height** of the top, not the **climb**'],
            ['(b) +184 kJ', 'Did reactants − products: the **sign** flips'],
            ['(d) "Breaking bonds gives out energy"', 'Breaking bonds always takes energy **in**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Giving 450 kilojoules as the activation energy. That is the height of the top of the curve above zero. The activation energy is the climb from the reactants.', focus: 'traps.0' },
        { say: 'Subtracting the wrong way round and getting positive 184. Always do products minus reactants, so the sign tells you which way the energy went.', focus: 'traps.1' },
        { say: 'And saying that breaking bonds gives out energy. Breaking a bond always takes energy in. The energy given out comes from making the new bonds.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A reaction\'s reactants are at $80\\ \\text{kJ}$ and its products at $140\\ \\text{kJ}$. Which is true?',
          choices: ['$\\Delta H = -60\\ \\text{kJ}$, exothermic', '$\\Delta H = +220\\ \\text{kJ}$, endothermic', '$\\Delta H = +60\\ \\text{kJ}$, endothermic', '$\\Delta H = +60\\ \\text{kJ}$, exothermic'],
          answer: 2,
          working: 'ΔH = 140 − 80 = +60 kJ. Positive, so energy is taken in: endothermic.',
        },
      ],
      lines: [
        { say: 'Your turn. A reaction\'s reactants are at 80 kilojoules, and its products at 140 kilojoules. Which statement is true? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Delta H is 140 minus 80, which is positive 60 kilojoules. Positive means energy was taken in, so the reaction is endothermic: choice C.', show: 'q2.answer', caption: 'ΔH is 140 − 80, which is +60 kJ. Positive means energy was taken in, so the reaction is endothermic: choice C.' },
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
          items: ['Activation energy: **top − reactants**', '$\\Delta H$ = **products − reactants**', 'Negative: **exothermic**, warms up. Positive: **endothermic**, cools down', 'Breaking bonds takes energy **in**, making bonds gives it **out**'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The activation energy is the climb from the reactants to the top of the curve.', show: 'sum.0' },
        { say: 'The energy change is the products minus the reactants.', show: 'sum.1' },
        { say: 'A negative energy change is exothermic, and the surroundings warm up. A positive one is endothermic, and they cool down.', show: 'sum.2' },
        { say: 'And breaking bonds takes energy in, while making bonds gives it out. For more on energy in reactions, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
