import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import spread from '@/content/chemmore/videos/cx-7-4.ts';

// Exam question for More Chemistry Topics lesson 7.4 (the Maxwell–Boltzmann distribution): why the
// curve starts at the origin and never meets the axis, why a small rise in temperature greatly
// raises the rate, and how a catalyst works on the distribution. Written by Gradileo in the style
// of an A level chemistry exam.
//
// The picture is the lesson's gas molecules at two temperatures, with their speeds counted
// (src/video/particles.ts).

const QUESTION = 'The Maxwell–Boltzmann distribution shows the energies of the molecules in a sample of gas. (a) Explain why the curve starts at the origin and why it never meets the energy axis at high energy. (b) Use the distribution to explain why a small rise in temperature causes a large increase in the rate of a reaction. (c) Use the distribution to explain how a catalyst increases the rate of a reaction.';

const video: Explainer = {
  id: 'xq-cx-7-4',
  lessonId: '',
  exam: {
    lesson: 'cx-7-4',
    source: 'Exam-style question written by Gradileo, in the style of an A level chemistry exam',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Temperature, Catalysts and the Energy Curve. The Maxwell–Boltzmann Distribution',
  thumbnailTitle: 'Reading the Energy Curve',
  thumbnail: 'ms',
  summary:
    'A test-style question, solved one small step at a time: why does the Maxwell–Boltzmann curve start at the origin and never meet the axis, why does a small temperature rise speed a reaction so much, and how does a catalyst work? No molecule has zero energy and there is no maximum energy; a higher temperature moves the curve right so many more molecules reach the activation energy; and a catalyst lowers the activation energy without changing the curve.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Reading the Energy Curve', subtitle: 'The Maxwell–Boltzmann distribution' }],
      lines: [
        { say: 'In this video, we solve a test-style question about the Maxwell Boltzmann distribution. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of an A level chemistry exam question, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'No molecule has zero energy, no maximum; many more molecules exceed Eₐ; lower Eₐ' }],
      lines: [
        { say: 'Here is the question. The Maxwell Boltzmann distribution shows the energies of the molecules in a sample of gas. Part a: explain why the curve starts at the origin and why it never meets the energy axis at high energy. Part b: use the distribution to explain why a small rise in temperature causes a large increase in the rate of a reaction. Part c: use the distribution to explain how a catalyst increases the rate of a reaction.', caption: 'Here is the question. The Maxwell–Boltzmann distribution shows the energies of the molecules in a sample of gas. Part a: explain why the curve starts at the origin and why it never meets the energy axis at high energy. Part b: use the distribution to explain why a small rise in temperature causes a large increase in the rate of a reaction. Part c: use the distribution to explain how a catalyst increases the rate of a reaction.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Count the molecules with **at least the activation energy**, and see what changes it' }],
      lines: [
        { say: 'Only molecules with at least the activation energy can react. So we look at how many are past that line, and what a temperature rise or a catalyst does to that number.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(spread, 'ms')],
      lines: [
        { say: 'Here is what we need. These are real gas molecules, moving at two temperatures. Each one has its own speed, and every collision changes it, so the speeds are always spread out.', show: ['ms', 'ms.labels', 'ms.thermo'] },
        { say: 'Under each box, the bars count how many molecules are moving at each speed. Very few are almost still, most are near the middle, and a few are very fast.', show: 'ms.spread' },
        { say: 'The dashed line marks the activation energy. In the cooler gas, hardly any molecules get past it. In the hotter gas, many more do.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Area under the curve = **total number** of molecules', 'Only molecules beyond **Eₐ** can react', 'Temperature **moves the curve**; a catalyst **moves Eₐ**'] }],
      lines: [
        { say: 'Here is the plan. The area under the curve is the total number of molecules, which does not change.', show: 'plan.0' },
        { say: 'Only the molecules beyond the activation energy can react.', show: 'plan.1' },
        { say: 'And a temperature rise changes the curve, while a catalyst moves the activation energy instead.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The two ends of the curve',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Feature', 'Because'],
          rows: [
            ['starts at the **origin**', '**no** molecule has zero energy'],
            ['never meets the **axis**', 'there is **no maximum** energy'],
          ],
        },
      ],
      lines: [
        { say: 'Step one. The curve starts at the origin because no molecule is completely still, with zero energy.', show: ['t', 't.0'], focus: 't.0' },
        { say: 'It never meets the axis at high energy because there is no maximum energy. A very few molecules always have very high energies. That is part a.', show: 't.1', focus: 't.1' },
      ],
    },
    {
      chapter: 'Step 2: A small rise in temperature',
      layout: 'center',
      main: [{ kind: 'bullets', id: 's', items: ['The peak moves **right** and gets **lower**; the area stays the **same**', 'The **tail** beyond Eₐ grows a lot', 'Many more **successful collisions** each second'] }],
      lines: [
        { say: 'Step two. At a higher temperature, the curve flattens and its peak moves to the right, but the area under it stays the same.', show: 's.0' },
        { say: 'The part of the curve beyond the activation energy grows a lot, even for a small rise, because that is the tail of the curve.', show: 's.1' },
        { say: 'So many more molecules have at least the activation energy, and there are many more successful collisions each second. That is part b.', show: 's.2', focus: 's.2' },
      ],
    },
    {
      chapter: 'Step 3: A catalyst',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'c', items: ['A catalyst gives a route with a **lower Eₐ**', 'The **curve does not change**', 'More molecules lie **beyond the new Eₐ**'] }],
      lines: [
        { say: 'Step three. A catalyst provides another route for the reaction with a lower activation energy.', show: 'c.0' },
        { say: 'The temperature is the same, so the curve does not change.', show: 'c.1' },
        { say: 'But the activation energy line moves left, so more molecules lie beyond it, and more collisions succeed. That is part c.', show: 'c.2', focus: 'c.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) **No molecule** has zero energy, and there is **no maximum** energy. (b) The curve shifts **right**, so **many more molecules** have E ≥ Eₐ. (c) It **lowers Eₐ**, so more molecules have **enough energy**; the curve is unchanged.' },
      ],
      lines: [
        { say: 'Does it make sense? Both a temperature rise and a catalyst work the same way in the end: more molecules beyond the activation energy.', show: 'ans' },
        { say: 'One moves the molecules, by changing the curve. The other moves the line.' },
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
            ['The curve gets **taller** when hotter', 'The peak gets **lower**; area is fixed'],
            ['A catalyst **shifts the curve**', 'It moves **Eₐ**, not the curve'],
            ['The curve **touches** the axis', 'There is **no** maximum energy'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'The number of molecules does not change, so the area stays the same. A curve that spreads out must get lower.', focus: 'traps.0' },
        { say: 'A catalyst does not change the temperature, so the curve is the same. It lowers the activation energy.', focus: 'traps.1' },
        { say: 'And the curve gets close to the axis at high energy, but never touches it.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'What happens to the area under the Maxwell–Boltzmann curve when the temperature of the gas rises?',
          choices: ['It increases', 'It decreases', 'It doubles', 'It stays the same'],
          answer: 3,
          working: 'The area is the total number of molecules, which does not change with temperature.',
        },
      ],
      lines: [
        { say: 'Your turn. What happens to the area under the Maxwell Boltzmann curve when the temperature of the gas rises? Pause the video and try it.', caption: 'Your turn. What happens to the area under the Maxwell–Boltzmann curve when the temperature of the gas rises? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The area is the total number of molecules, which does not change, so it stays the same: choice D.', show: 'q2.answer' },
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
          items: ['Starts at **zero**, never meets the axis, area **fixed**', 'Hotter: many more molecules beyond **Eₐ**', 'Catalyst: **lower Eₐ**, same curve'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The curve starts at zero, never meets the axis, and its area is fixed.', show: 'sum.0' },
        { say: 'A higher temperature puts many more molecules beyond the activation energy.', show: 'sum.1' },
        { say: 'And a catalyst lowers the activation energy, leaving the curve the same. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
