import type { Explainer, ParticlesEl } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import boyle from '@/content/chem20/videos/c20-2-3.ts';

// Exam question for Chemistry 20 lesson 2.3 (Boyle's law): a new volume after a change of pressure
// at constant temperature. OpenStax Chemistry 2e has no plain Boyle's-law calculation of this kind,
// so Gradileo wrote this one in the style of a high-school chemistry unit test (our own situation,
// wording and numbers). Answer: V2 = 0.60 L × 95 kPa / 228 kPa = 0.25 L.
//
// The pictures are simulated particles (src/video/particles.ts): the lesson's sealed syringe whose
// pressure doubles as its volume halves, then the pump's cylinder pushed in until its gauge reads
// 228 kPa and its volume 0.25 L.

/** The pump: 0.60 L at 95 kPa, pushed in to 0.25 L (228 kPa). */
const pump: ParticlesEl = {
  kind: 'particles',
  id: 'pm',
  boxes: [{ id: 'b', state: 'gas', width: 8, height: 10, temp: 1.6, piston: true, kinds: [{ n: 14, bond: 0.15, heavy: 0 }] }],
  clips: { push: { phases: [{ dur: 5, lid: { b: 0.25 / 0.6 } }] } },
  gauge: { box: 'b', start: 95 },
  volume: { box: 'b', start: 0.6, decimals: 2 },
  thermometers: true,
  height: 460,
};

const QUESTION =
  'The outlet of a bicycle pump is blocked, and the pump holds 0.60 L of air at 95 kPa. The handle is pushed in until the pressure of the air reaches 228 kPa. If the temperature stays the same, what is the new volume of the air?';

const video: Explainer = {
  id: 'xq-c20-2-3',
  lessonId: '',
  exam: {
    lesson: 'c20-2-3',
    source: 'Exam-style question written by Gradileo, in the style of a high-school chemistry unit test',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: "Exam Question: Squeezing the Air in a Pump. Boyle's Law",
  thumbnailTitle: 'Squeeze the Pump',
  thumbnail: 'pm',
  summary:
    "An exam-style question, solved one small step at a time: the air in a blocked bicycle pump is squeezed from 0.60 L at 95 kPa until its pressure is 228 kPa. We use Boyle's law, P1V1 = P2V2, to find the new volume, 0.25 L, check that a higher pressure gave a smaller volume, and watch the gauge climb as the piston goes in.",
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Squeeze the Pump', subtitle: "Boyle's law, step by step" }],
      lines: [
        { say: 'In this video, we solve a test question about squeezing the air in a bicycle pump. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'Gradileo wrote this question in the style of a high-school chemistry unit test. You will see that at the bottom of the screen the whole way through.' },
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
          prompt: 'The outlet of a bicycle pump is blocked, and the pump holds $0.60\\ \\text{L}$ of air at $95\\ \\text{kPa}$. The handle is pushed in until the pressure of the air reaches $228\\ \\text{kPa}$. If the temperature stays the same, what is the new volume of the air?',
          answer: '$0.25\\ \\text{L}$',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'The outlet of a bicycle pump is blocked, and the pump holds zero point six zero litres of air at 95 kilopascals. The handle is pushed in until the pressure of the air reaches 228 kilopascals. If the temperature stays the same, what is the new volume of the air?', caption: 'The outlet of a bicycle pump is blocked, and the pump holds 0.60 L of air at 95 kPa. The handle is pushed in until the pressure of the air reaches 228 kPa. If the temperature stays the same, what is the new volume of the air?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Same air, same temperature, **higher pressure**: find the **new volume**' }],
      lines: [
        { say: 'The air is trapped, so the amount of gas is fixed, and the temperature does not change.', show: 'plain' },
        { say: 'Only the pressure and the volume change. We know the starting volume, and both pressures, and we must find the new volume.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(boyle, 's')],
      lines: [
        { say: 'Here is what we need. Air is sealed in a syringe at constant temperature. It starts at 100 kilopascals and two point zero zero litres.', show: ['s', 's.gauge', 's.volume'], caption: 'Here is what we need. Air is sealed in a syringe at constant temperature. It starts at 100 kPa and 2.00 L.' },
        { say: 'Watch the pressure double, to 200 kilopascals. The particles have half the room, so they hit the walls twice as often, and the volume halves, to one point zero zero litres.', play: 's.double', caption: 'Watch the pressure double, to 200 kPa. The particles have half the room, so they hit the walls twice as often, and the volume halves, to 1.00 L.' },
        { say: 'Pressure times volume stays the same: 100 times two is 200, and 200 times one is 200. That is Boyle\'s law: P one V one equals P two V two.', caption: 'Pressure times volume stays the same: 100 × 2.00 = 200, and 200 × 1.00 = 200. That is Boyle\'s law: P₁V₁ = P₂V₂.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write down $P_1$, $V_1$ and $P_2$', 'Rearrange $P_1V_1 = P_2V_2$ for $V_2$', 'Calculate, then check the **direction**'] }],
      lines: [
        { say: 'Here is the plan. First, write down what we know: P one, V one and P two.', show: 'plan.0', caption: 'Here is the plan. First, write down what we know: P₁, V₁ and P₂.' },
        { say: 'Second, rearrange Boyle\'s law to give V two.', show: 'plan.1', caption: 'Second, rearrange Boyle\'s law to give V₂.' },
        { say: 'Third, calculate, and check that the answer moves the right way: a higher pressure must give a smaller volume.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: What we know',
      layout: 'center',
      main: [{ kind: 'math', id: 'k', size: 'lg', lines: ['P_1 = \\adj{95\\ \\text{kPa}} \\qquad V_1 = \\adj{0.60\\ \\text{L}}', 'P_2 = \\opp{228\\ \\text{kPa}} \\qquad V_2 = \\ ?'] }],
      lines: [
        { say: 'Step one. At the start, P one is 95 kilopascals and V one is zero point six zero litres.', show: 'k.0', caption: 'Step one. At the start, P₁ is 95 kPa and V₁ is 0.60 L.' },
        { say: 'At the end, P two is 228 kilopascals, and V two is what we want. Both pressures are in kilopascals, so the units match.', show: 'k.1', caption: 'At the end, P₂ is 228 kPa, and V₂ is what we want. Both pressures are in kPa, so the units match.' },
      ],
    },
    {
      chapter: 'Step 2: Rearrange and calculate',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'c',
          size: 'lg',
          lines: ['P_1V_1 = P_2V_2 \\;\\Rightarrow\\; V_2 = \\dfrac{P_1V_1}{P_2}', 'V_2 = \\dfrac{\\adj{95\\ \\cancel{\\text{kPa}}} \\times \\adj{0.60\\ \\text{L}}}{\\opp{228\\ \\cancel{\\text{kPa}}}}', '= \\good{0.25\\ \\text{L}}'],
        },
      ],
      lines: [
        { say: 'Step two. Divide both sides of Boyle\'s law by P two, and V two equals P one V one over P two.', show: 'c.0', caption: 'Step two. Divide both sides of Boyle\'s law by P₂, and V₂ = P₁V₁ / P₂.' },
        { say: 'Put in the numbers: 95 kilopascals times zero point six zero litres, divided by 228 kilopascals. The kilopascals cancel, leaving litres.', show: 'c.1', caption: 'Put in the numbers: 95 kPa × 0.60 L ÷ 228 kPa. The kPa cancel, leaving litres.' },
        { say: '95 times zero point six zero is 57, and 57 divided by 228 is zero point two five. The new volume is zero point two five litres.', show: 'c.2', focus: 'c.2', caption: '95 × 0.60 = 57, and 57 ÷ 228 = 0.25. The new volume is 0.25 L.' },
      ],
    },
    {
      chapter: 'Step 3: Watch it happen',
      layout: 'center',
      main: [pump],
      lines: [
        { say: 'Step three: watch the pump. The air starts at 95 kilopascals and zero point six zero litres, and the thermometer shows the temperature.', show: ['pm', 'pm.gauge', 'pm.volume', 'pm.thermo'], caption: 'Step three: watch the pump. The air starts at 95 kPa and 0.60 L, and the thermometer shows the temperature.' },
        { say: 'Push the handle in. The same particles have less room, so they hit the walls more often, and the gauge climbs. At 228 kilopascals, the volume reads zero point two five litres, and the temperature has not changed.', play: 'pm.push', focus: ['pm.gauge', 'pm.volume'], caption: 'Push the handle in. The same particles have less room, so they hit the walls more often, and the gauge climbs. At 228 kPa, the volume reads 0.25 L, and the temperature has not changed.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'ch', size: 'lg', lines: ['V_2 = \\good{0.25\\ \\text{L}}', '95 \\times 0.60 = 57 \\qquad 228 \\times 0.25 = 57 \\;\\good{\\checkmark}'] }],
      lines: [
        { say: 'Here is the whole answer: the new volume is zero point two five litres.', show: 'ch.0', caption: 'Here is the whole answer: the new volume is 0.25 L.' },
        { say: 'A quick check: P times V is 57 before and 57 after, and the pressure went up while the volume went down, which is the right direction.', show: 'ch.1', focus: 'ch.1' },
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
            ['$1.44\\ \\text{L}$', 'Fraction **upside down**: a higher pressure must **shrink** the gas'],
            ['$0.43\\ \\text{L}$', 'Used the **change**, $228 - 95 = 133\\ \\text{kPa}$, as $P_2$'],
            ['$0.25\\ \\text{kPa}$', 'The answer is a **volume**, in litres'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Getting one point four four litres, from 228 times zero point six zero over 95. The pressure went up, so the volume must go down, and this answer went up.', focus: 'traps.0', caption: 'Getting 1.44 L, from 228 × 0.60 ÷ 95. The pressure went up, so the volume must go down, and this answer went up.' },
        { say: 'Using the change in pressure, 133 kilopascals, as P two. Boyle\'s law needs the new pressure itself, 228 kilopascals.', focus: 'traps.1', caption: 'Using the change in pressure, 133 kPa, as P₂. Boyle\'s law needs the new pressure itself, 228 kPa.' },
        { say: 'And giving the answer in kilopascals. The kilopascals cancel, so the answer is a volume, in litres.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A gas occupies $3.0\\ \\text{L}$ at $100\\ \\text{kPa}$. At constant temperature, it is squeezed to $1.5\\ \\text{L}$. What is its new pressure?',
          choices: ['$50\\ \\text{kPa}$', '$150\\ \\text{kPa}$', '$200\\ \\text{kPa}$', '$450\\ \\text{kPa}$'],
          answer: 2,
          working: 'P₂ = P₁V₁ / V₂ = 100 kPa × 3.0 L ÷ 1.5 L = 200 kPa.',
        },
      ],
      lines: [
        { say: 'Your turn. A gas occupies three point zero litres at 100 kilopascals. At constant temperature, it is squeezed to one point five litres. What is its new pressure? Pause the video and try it.', show: 'q2', wait: 6, caption: 'Your turn. A gas occupies 3.0 L at 100 kPa. At constant temperature, it is squeezed to 1.5 L. What is its new pressure? Pause the video and try it.' },
        { say: 'The volume halved, so the pressure doubles: 100 times three point zero, divided by one point five, is 200 kilopascals, choice C.', show: 'q2.answer', caption: 'The volume halved, so the pressure doubles: 100 × 3.0 ÷ 1.5 = 200 kPa, choice C.' },
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
          items: ["Boyle's law: $P_1V_1 = P_2V_2$, at constant temperature", 'New volume: $V_2 = P_1V_1 / P_2$', 'Higher pressure, **smaller** volume'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. For a fixed amount of gas at constant temperature, P one V one equals P two V two.', show: 'sum.0', caption: 'Here is what to remember. For a fixed amount of gas at constant temperature, P₁V₁ = P₂V₂.' },
        { say: 'Rearranged, the new volume is P one V one over P two.', show: 'sum.1', caption: 'Rearranged, the new volume is P₁V₁ / P₂.' },
        { say: 'And a higher pressure always gives a smaller volume. For more on Boyle\'s law, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
