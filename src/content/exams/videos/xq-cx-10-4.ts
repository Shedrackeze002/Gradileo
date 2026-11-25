import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import kp from '@/content/chemmore/videos/cx-10-4.ts';

// Exam question for More Chemistry Topics lesson 10.4 (Kp and gas equilibria): partial
// pressures and Kp for dinitrogen tetroxide and nitrogen dioxide, and what changes Kp. Written by
// Gradileo in the style of an A level chemistry exam.
//
// The picture is the lesson's two tubes of gas reaching the same mixture (src/video/particles.ts).

const QUESTION = 'Dinitrogen tetroxide dissociates: N₂O₄(g) ⇌ 2NO₂(g). The forward reaction is endothermic. At a certain temperature, an equilibrium mixture contains 0.60 mol of N₂O₄ and 0.40 mol of NO₂ at a total pressure of 200 kPa. (a) Calculate the partial pressure of each gas. (b) Write an expression for Kp and calculate its value, with units. (c) State how the value of Kp changes when the temperature is raised, and when the total pressure is raised at the same temperature.';

const video: Explainer = {
  id: 'xq-cx-10-4',
  lessonId: '',
  exam: {
    lesson: 'cx-10-4',
    source: 'Exam-style question written by Gradileo, in the style of an A level chemistry exam',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Partial Pressures and Kp for N₂O₄ and NO₂. Gas Equilibria',
  thumbnailTitle: 'Calculating Kp',
  thumbnail: 'bw',
  summary:
    'A test-style question, solved one small step at a time: an equilibrium mixture of 0.60 mol N₂O₄ and 0.40 mol NO₂ at 200 kPa. The partial pressures are 120 kPa and 80 kPa, Kp = p(NO₂)² ÷ p(N₂O₄) = 6400 ÷ 120 ≈ 53 kPa, and Kp rises with temperature because the forward reaction is endothermic, while a change of pressure leaves it unchanged.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Calculating Kp', subtitle: 'Partial pressures in a gas equilibrium' }],
      lines: [
        { say: 'In this video, we solve a test-style question about a gas equilibrium. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of an A level chemistry exam question, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: '120 kPa and 80 kPa; Kp ≈ 53 kPa; rises; unchanged' }],
      lines: [
        { say: 'Here is the question. Dinitrogen tetroxide dissociates reversibly into two nitrogen dioxide molecules. The forward reaction is endothermic. At a certain temperature, an equilibrium mixture contains 0.60 moles of dinitrogen tetroxide and 0.40 moles of nitrogen dioxide, at a total pressure of 200 kilopascals. Part a: calculate the partial pressure of each gas. Part b: write an expression for K p and calculate its value, with units. Part c: state how the value of K p changes when the temperature is raised, and when the total pressure is raised at the same temperature.', caption: 'Here is the question. Dinitrogen tetroxide dissociates: N₂O₄(g) ⇌ 2NO₂(g). The forward reaction is endothermic. At a certain temperature, an equilibrium mixture contains 0.60 mol of N₂O₄ and 0.40 mol of NO₂ at a total pressure of 200 kPa. Part a: calculate the partial pressure of each gas. Part b: write an expression for Kp and calculate its value, with units. Part c: state how the value of Kp changes when the temperature is raised, and when the total pressure is raised at the same temperature.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Moles → **mole fractions** → **partial pressures** → **Kp**' }],
      lines: [
        { say: 'We turn the moles of each gas into its share of the total, then its share of the pressure, and put those pressures into K p.', caption: 'We turn the moles of each gas into its share of the total, then its share of the pressure, and put those pressures into Kp.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(kp, 'bw')],
      lines: [
        { say: 'Here is what we need. Here are two tubes of gas at the same temperature. The left one starts as dinitrogen tetroxide only, and the right one as nitrogen dioxide only.', caption: 'Here is what we need. Here are two tubes of gas at the same temperature. The left one starts as N₂O₄ only, and the right one as NO₂ only.', show: ['bw', 'bw.labels', 'bw.key', 'bw.tally'], play: 'bw.go' },
        { say: 'Both settle to the same mixture. Every molecule of each gas adds to the pressure, so each gas has its own partial pressure.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Mole fraction = moles of gas ÷ **total** moles', 'Partial pressure = mole fraction × **total pressure**', 'Kp changes **only with temperature**'] }],
      lines: [
        { say: 'Here is the plan. The mole fraction of a gas is its moles divided by the total moles.', show: 'plan.0' },
        { say: 'Its partial pressure is the mole fraction times the total pressure.', show: 'plan.1' },
        { say: 'And K p depends only on temperature.', caption: 'And Kp depends only on temperature.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Partial pressures',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Gas', 'Moles', 'Mole fraction', 'Partial pressure'],
          rows: [
            ['N₂O₄', '0.60', '0.60 ÷ 1.00 = 0.60', '0.60 × 200 = **120 kPa**'],
            ['NO₂', '0.40', '0.40 ÷ 1.00 = 0.40', '0.40 × 200 = **80 kPa**'],
          ],
        },
      ],
      lines: [
        { say: 'Step one. The total is 0.60 plus 0.40, which is 1.00 mole. So the mole fraction of dinitrogen tetroxide is 0.60, and its partial pressure is 0.60 times 200, which is 120 kilopascals.', caption: 'Step one. The total is 0.60 + 0.40 = 1.00 mol. So the mole fraction of N₂O₄ is 0.60, and its partial pressure is 0.60 × 200 = 120 kPa.', show: ['t', 't.0'], focus: 't.0' },
        { say: 'The mole fraction of nitrogen dioxide is 0.40, and its partial pressure is 0.40 times 200, which is 80 kilopascals. That is part a.', caption: 'The mole fraction of NO₂ is 0.40, and its partial pressure is 0.40 × 200 = 80 kPa. That is part a.', show: 't.1', focus: 't.1' },
      ],
    },
    {
      chapter: 'Step 2: Kp',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['K_p = \\dfrac{p(\\ce{NO2})^2}{p(\\ce{N2O4})}', 'K_p = \\dfrac{80^2}{120} = \\dfrac{6400}{120}', '\\good{K_p \\approx 53 \\text{ kPa}}'] }],
      lines: [
        { say: 'Step two. K p is the partial pressure of nitrogen dioxide, squared because there are two moles of it in the equation, divided by the partial pressure of dinitrogen tetroxide.', caption: 'Step two. Kp is the partial pressure of NO₂, squared because there are two moles of it in the equation, divided by the partial pressure of N₂O₄.', show: 'm.0' },
        { say: '80 squared is 6,400, and 6,400 divided by 120 is 53.3.', caption: '80² = 6400, and 6400 ÷ 120 = 53.3.', show: 'm.1' },
        { say: 'For the units, kilopascals squared divided by kilopascals leaves kilopascals. So K p is about 53 kilopascals. That is part b.', caption: 'For the units, kPa² ÷ kPa leaves kPa. So Kp ≈ 53 kPa. That is part b.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: What changes Kp?',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'c',
          head: ['Change', 'Effect on Kp', 'Why'],
          rows: [
            ['raise the **temperature**', '**increases**', 'favours the **endothermic** forward reaction'],
            ['raise the **pressure**', '**no change**', 'the position shifts, but Kp is constant'],
          ],
        },
      ],
      lines: [
        { say: 'Step three. The forward reaction is endothermic, so raising the temperature shifts the equilibrium to the right. More nitrogen dioxide forms, and K p increases.', caption: 'Step three. The forward reaction is endothermic, so raising the temperature shifts the equilibrium to the right. More NO₂ forms, and Kp increases.', show: ['c', 'c.0'], focus: 'c.0' },
        { say: 'Raising the pressure shifts the position to the left, the side with fewer gas molecules, but the partial pressures readjust so that K p stays the same. Only temperature changes K p. That is part c.', caption: 'Raising the pressure shifts the position to the left, the side with fewer gas molecules, but the partial pressures readjust so that Kp stays the same. Only temperature changes Kp. That is part c.', show: 'c.1', focus: 'c.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) p(N₂O₄) = **120 kPa**, p(NO₂) = **80 kPa**. (b) Kp = p(NO₂)² ÷ p(N₂O₄) ≈ **53 kPa**. (c) Higher temperature: Kp **increases**. Higher pressure: Kp **unchanged**.' },
      ],
      lines: [
        { say: 'Does it make sense? The partial pressures, 120 and 80, add up to 200 kilopascals, the total pressure.', show: 'ans' },
        { say: 'So the partial pressures are 120 and 80 kilopascals, K p is about 53 kilopascals, and only a change of temperature changes it.', caption: 'So the partial pressures are 120 and 80 kPa, Kp ≈ 53 kPa, and only a change of temperature changes it.' },
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
            ['Kp = 80 ÷ 120 = **0.67**', 'p(NO₂) must be **squared**'],
            ['Kp has **no units**', 'kPa² ÷ kPa = **kPa**'],
            ['Higher pressure **lowers** Kp', 'Only **temperature** changes Kp'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'There are two moles of nitrogen dioxide in the equation, so its partial pressure is squared.', focus: 'traps.0' },
        { say: 'The powers on top and bottom are different, so K p has units here.', caption: 'The powers on top and bottom are different, so Kp has units here.', focus: 'traps.1' },
        { say: 'And a change of pressure moves the position of equilibrium without changing K p.', caption: 'And a change of pressure moves the position of equilibrium without changing Kp.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which change alters the value of Kp for a gas equilibrium?',
          choices: ['adding a catalyst', 'raising the pressure', 'adding more of a reactant', 'changing the temperature'],
          answer: 3,
          working: 'Kp depends only on temperature. Catalysts, pressure and amounts can move the position, but not the value of Kp.',
        },
      ],
      lines: [
        { say: 'Your turn. Which change alters the value of K p for a gas equilibrium? Pause the video and try it.', caption: 'Your turn. Which change alters the value of Kp for a gas equilibrium? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'K p depends only on temperature: choice D.', caption: 'Kp depends only on temperature: choice D.', show: 'q2.answer' },
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
          items: ['Partial pressure = mole fraction × total pressure', 'Kp uses partial pressures to the power of the **moles**', 'Only **temperature** changes Kp'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A partial pressure is the mole fraction times the total pressure.', show: 'sum.0' },
        { say: 'K p uses the partial pressures, each raised to the power of its moles in the equation.', caption: 'Kp uses the partial pressures, each raised to the power of its moles in the equation.', show: 'sum.1' },
        { say: 'And only a change of temperature changes K p. For more, watch this lesson\'s explainer video on Gradileo.', caption: 'And only a change of temperature changes Kp. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
