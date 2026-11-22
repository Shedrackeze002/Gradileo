import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import systems from '@/content/chem30/videos/c30-1-1.ts';
import exoEndo from '@/content/chem30/videos/c30-1-1-c.ts';
import bonds from '@/content/chem30/videos/c30-1-1-d.ts';

// Exam question for Chemistry 30 lesson 1.1 (energy in chemical systems): ammonium nitrate dissolving
// in water makes the water colder. Name the system and surroundings, classify the change, give the
// sign of delta H, and compare the energy of the bonds broken and formed. Gradileo's own question,
// with everything it needs stated in it. The answer: the ammonium nitrate is the system and the water
// (with the beaker and thermometer) the surroundings; the change is endothermic, so delta H is
// positive; and more energy is absorbed breaking bonds and attractions than is released forming new ones.
//
// The pictures are simulated particles (src/video/particles.ts) from the lesson: a reaction in water
// warming its surroundings, an exothermic and an endothermic reaction side by side, and bonds
// breaking in one tube and forming in another.

const QUESTION =
  'A student stirs solid ammonium nitrate into water in a beaker. As it dissolves, the thermometer in the water falls from 21.0 °C to 14.5 °C. (a) Identify the system and the surroundings. (b) Is the dissolving exothermic or endothermic? (c) What is the sign of ΔH for the dissolving? (d) Is more energy absorbed breaking bonds and attractions, or released forming new ones?';

const video: Explainer = {
  id: 'xq-c30-1-1',
  lessonId: '',
  exam: {
    lesson: 'c30-1-1',
    source: 'Exam-style question written by Gradileo, in the style of a high-school chemistry unit test',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Why Does a Cold Pack Get Cold? Energy in Chemical Systems',
  thumbnailTitle: 'Why Does a Cold Pack Get Cold?',
  thumbnail: 'hc',
  summary:
    'A test-style question, solved one small step at a time: ammonium nitrate dissolving in water makes the water colder. We name the system and the surroundings, decide that the change is endothermic with a positive ΔH, and explain it with the energy of the bonds broken and formed.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Why Does a Cold Pack Get Cold?', subtitle: 'System, surroundings and the sign of ΔH' }],
      lines: [
        { say: 'In this video, we solve a test-style question about where the energy goes when something dissolves. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of a high school chemistry unit test, and everything you need is in the question.' },
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
          prompt:
            'A student stirs solid ammonium nitrate into water in a beaker. As it dissolves, the thermometer in the water falls from $21.0\\ ^\\circ\\text{C}$ to $14.5\\ ^\\circ\\text{C}$. (a) Identify the system and the surroundings. (b) Is the dissolving exothermic or endothermic? (c) What is the sign of $\\Delta H$? (d) Is more energy absorbed breaking bonds and attractions, or released forming new ones?',
          answer: 'System: the ammonium nitrate; surroundings: the water. Endothermic, ΔH positive; more energy is absorbed breaking.',
        },
      ],
      lines: [
        { say: 'Here is the question. A student stirs solid ammonium nitrate into water in a beaker. As it dissolves, the thermometer in the water falls from twenty one point zero to fourteen point five degrees Celsius.', show: 'q', caption: 'Here is the question. A student stirs solid ammonium nitrate into water in a beaker. As it dissolves, the thermometer in the water falls from 21.0 °C to 14.5 °C.' },
        { say: 'Part a: identify the system and the surroundings. Part b: is the dissolving exothermic or endothermic? Part c: what is the sign of delta H? Part d: is more energy absorbed breaking bonds and attractions, or released forming new ones?', caption: '(a) Identify the system and the surroundings. (b) Is the dissolving exothermic or endothermic? (c) What is the sign of ΔH? (d) Is more energy absorbed breaking bonds and attractions, or released forming new ones?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'The **water** got colder. Where did its energy **go**, and **why**?' }],
      lines: [
        { say: 'The thermometer sits in the water, so it tells us the water lost energy. We must decide where that energy went, and what that says about the dissolving.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(systems, 'sw')],
      lines: [
        { say: 'Here is what we need. A reaction in a cup of water, up close. The red and yellow particles are the reactants, the system. The blue water particles are part of the surroundings, and so is the thermometer.', show: ['sw', 'sw.labels', 'sw.key', 'sw.thermo'], play: 'sw.go' },
        { say: 'Each pair that reacts here releases energy into the water around it, so the water warms. The thermometer reads the surroundings, never the system directly.', focus: 'sw.thermo' },
        { say: 'If the system gives energy out, the change is exothermic and delta H is negative. If it takes energy in, it is endothermic and delta H is positive.', caption: 'If the system gives energy out, the change is exothermic and ΔH is negative. If it takes energy in, it is endothermic and ΔH is positive.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Decide what is **reacting**: that is the system', 'Read the **thermometer** to see which way energy flowed', 'Turn the direction into **exo** or **endo**, the **sign of ΔH**, and the **bond** energies'] }],
      lines: [
        { say: 'Here is the plan. First, decide what is changing. That is the system, and everything else is the surroundings.', show: 'plan.0' },
        { say: 'Then read the thermometer to see which way the energy flowed.', show: 'plan.1' },
        { say: 'Then turn that direction into exothermic or endothermic, the sign of delta H, and a statement about the bonds.', show: 'plan.2', caption: 'Then turn that direction into exothermic or endothermic, the sign of ΔH, and a statement about the bonds.' },
      ],
    },
    {
      chapter: 'Step 1: System and surroundings',
      layout: 'center',
      main: [{ kind: 'math', id: 's', size: 'lg', lines: ['\\text{system: } \\ce{NH4NO3} \\text{ dissolving}', '\\text{surroundings: the water, beaker, thermometer and air}'] }],
      lines: [
        { say: 'Step one. The ammonium nitrate is what changes, as it breaks up into ions. That is the system.', show: 's.0', caption: 'Step one. The ammonium nitrate is what changes, as it breaks up into ions. That is the system.' },
        { say: 'Everything else is the surroundings: the water, the beaker, the thermometer and the air. The thermometer is in the water, so it measures the surroundings.', show: 's.1', focus: 's.1' },
      ],
    },
    {
      chapter: 'Step 2: Exothermic or endothermic?',
      layout: 'center',
      main: [pick(exoEndo, 'hc'), { kind: 'math', id: 'e', size: 'md', lines: ['21.0\\ ^\\circ\\text{C} \\to 14.5\\ ^\\circ\\text{C}: \\ \\text{surroundings lose energy} \\Rightarrow \\good{\\text{endothermic}}'] }],
      lines: [
        { say: 'Step two. Here are two reactions side by side. Watch the two thermometers as the reactants meet.', show: ['hc', 'hc.labels', 'hc.thermo'], play: 'hc.mix' },
        { say: 'On the left the particles speed up and the water warms: the system gave energy out, so it is exothermic. On the right they slow down and the water cools: the system took energy in, so it is endothermic.' },
        { say: 'Our water cooled, just like the right box. The dissolving ammonium nitrate took energy from the water, so the dissolving is endothermic.', show: 'e.0', focus: 'e.0', caption: 'Our water cooled from 21.0 °C to 14.5 °C, just like the right box. The dissolving took energy from the water, so it is endothermic.' },
      ],
    },
    {
      chapter: 'Step 3: The sign of ΔH',
      layout: 'center',
      main: [{ kind: 'math', id: 'h', size: 'lg', lines: ['\\text{energy into the system} \\Rightarrow \\Delta H > 0', '\\good{\\Delta H \\text{ is positive}}'] }],
      lines: [
        { say: 'Step three. Delta H is the change in the system\'s enthalpy. The system gained energy, so its enthalpy went up.', show: 'h.0', caption: 'Step three. ΔH is the change in the system\'s enthalpy. The system gained energy, so its enthalpy went up.' },
        { say: 'So delta H for the dissolving is positive.', show: 'h.1', focus: 'h.1', caption: 'So ΔH for the dissolving is positive.' },
      ],
    },
    {
      chapter: 'Step 4: Bonds broken and formed',
      layout: 'center',
      main: [pick(bonds, 'bf'), { kind: 'math', id: 'b', size: 'md', lines: ['\\text{energy to break} > \\text{energy from forming} \\Rightarrow \\good{\\text{net energy absorbed}}'] }],
      lines: [
        { say: 'Step four. Here, on the left, bonds break, and on the right, the same bonds form. Watch the two thermometers.', show: ['bf', 'bf.labels', 'bf.key', 'bf.tally', 'bf.thermo'], play: 'bf.go' },
        { say: 'Breaking bonds absorbs energy, so the left tube cools. Forming bonds releases energy, so the right tube warms.' },
        { say: 'Dissolving breaks the attractions in the solid and between water molecules, and forms new attractions between the ions and water. Overall it absorbed energy, so more energy went into breaking than came out of forming.', show: 'b.0', focus: 'b.0' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'k',
          head: ['Part', 'Answer'],
          rows: [
            ['(a)', 'System: the ammonium nitrate. Surroundings: the water, beaker, thermometer and air'],
            ['(b)', 'Endothermic'],
            ['(c)', '$\\Delta H$ is **positive**'],
            ['(d)', 'More energy is **absorbed breaking** than released forming'],
          ],
        },
      ],
      lines: [
        { say: 'Here are all four answers together. They tell one story: the water got colder because its energy went into the ammonium nitrate.', show: ['k', 'k.0', 'k.1', 'k.2', 'k.3'] },
        { say: 'That is how a cold pack works. Squeeze it, a salt like this dissolves, and the pack takes energy from your skin.', focus: 'k.1' },
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
            ['Exothermic, because it got **cold**', 'Read the thermometer as the **system**'],
            ['$\\Delta H$ is **negative**', 'Gave the sign for the **water**, not the system'],
            ['The **water** is the system', 'The system is what **changes**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Thinking the cold means energy left the system. The thermometer reads the water, the surroundings. Cold water means the system took energy in.', focus: 'traps.0' },
        { say: 'Giving delta H a negative sign. The water lost energy, but delta H is always for the system, and the system gained it.', focus: 'traps.1', caption: 'Giving ΔH a negative sign. The water lost energy, but ΔH is always for the system, and the system gained it.' },
        { say: 'And calling the water the system. The system is the substance that changes, here the ammonium nitrate.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Calcium chloride dissolves in water, and the water warms from $20.0\\ ^\\circ\\text{C}$ to $31.5\\ ^\\circ\\text{C}$. Which describes the dissolving?',
          choices: ['Endothermic, $\\Delta H > 0$', 'Endothermic, $\\Delta H < 0$', 'Exothermic, $\\Delta H > 0$', 'Exothermic, $\\Delta H < 0$'],
          answer: 3,
          working: 'The surroundings warmed, so the system gave energy out: exothermic, and its enthalpy fell, so $\\Delta H < 0$.',
        },
      ],
      lines: [
        { say: 'Your turn. Calcium chloride dissolves in water, and the water warms from twenty to thirty one and a half degrees Celsius. Which describes the dissolving? Pause the video and try it.', show: 'q2', wait: 6, caption: 'Your turn. Calcium chloride dissolves in water, and the water warms from 20.0 °C to 31.5 °C. Which describes the dissolving? Pause the video and try it.' },
        { say: 'The surroundings warmed, so the system gave energy out. That is exothermic, and the system\'s enthalpy fell, so delta H is negative: choice D.', show: 'q2.answer', caption: 'The surroundings warmed, so the system gave energy out. That is exothermic, and the system\'s enthalpy fell, so ΔH < 0: choice D.' },
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
          items: ['The **system** is what changes; the thermometer reads the **surroundings**', 'Surroundings cool: **endothermic**, $\\Delta H > 0$', 'Endothermic: more energy to **break** than from **forming**'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The system is what changes, and the thermometer reads the surroundings.', show: 'sum.0' },
        { say: 'If the surroundings cool, the change is endothermic and delta H is positive. If they warm, it is exothermic and delta H is negative.', show: 'sum.1', caption: 'If the surroundings cool, the change is endothermic and ΔH is positive. If they warm, it is exothermic and ΔH is negative.' },
        { say: 'An endothermic change absorbs more energy breaking bonds than it releases forming them. For more on energy in chemical systems, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
