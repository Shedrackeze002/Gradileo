import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { gasGraph } from '@/content/chem10/videos/lib/c10-4-figures.ts';
import { runsOut, surface } from '@/content/chem10/videos/lib/c10-rates.ts';

// Exam question for Chemistry 10 lesson 4.5 (rates of reaction): marble chips in acid, the volume
// of carbon dioxide every 20 s (the lesson's lumps curve, src/content/chem10/videos/lib/
// c10-4-figures.ts). Gradileo wrote this one in the style of a high-school chemistry unit test.
// Answers: (a) 28.7 / 20 = 1.4 cm3/s; (b) the reactants are used up, so there are fewer
// collisions each second; (c) faster at the start, because the powder's larger surface area makes
// collisions more frequent, but the same final volume; (d) for example warm the acid, or use more
// concentrated acid.
//
// The pictures: the graph of the lumps curve (then the powder curve beside it), two gases reacting
// with a count that climbs more and more slowly as they are used up, and a lump and small pieces of
// the same solid in a gas, with the pieces reacting far faster (src/video/particles.ts).

const QUESTION =
  'A student adds marble chips to dilute hydrochloric acid and measures the total volume of carbon dioxide given off. Time (s): 0, 20, 40, 60, 80, 100, 120. Volume (cm³): 0, 28.7, 47.1, 58.9, 66.5, 71.3, 74.4. (a) Calculate the mean rate of reaction over the first 20 s. (b) Explain, using collision theory, why the rate decreases as the reaction goes on. (c) The experiment is repeated with the same mass of powdered marble. How would the results change? Explain your answer. (d) State one other change that would increase the rate.';

const graph = () => figure('g', [gasGraph({ lumps: true })], 480);

const video: Explainer = {
  id: 'xq-c10-4-5',
  lessonId: '',
  exam: {
    lesson: 'c10-4-5',
    source: 'Exam-style question written by Gradileo, in the style of a high-school chemistry unit test',
    licence: 'Gradileo\'s own question',
    question: QUESTION,
  },
  title: 'Exam Question: Marble Chips in Acid. Rates of Reaction',
  thumbnailTitle: 'How Fast Does It Fizz?',
  thumbnail: 'g',
  summary:
    'An exam-style question, solved one small step at a time: from the volume of carbon dioxide given off by marble chips in acid we find the mean rate, explain with collision theory why the reaction slows down, and predict what powdered marble would do. We watch the particles react ever more slowly as they are used up, and see small pieces react far faster than a lump.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Fast Does It Fizz?', subtitle: 'Rates of reaction, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam-style question about how fast marble chips react with acid. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'A student adds marble chips to dilute hydrochloric acid and measures the total volume of carbon dioxide given off.<br>Time (s): 0, 20, 40, 60, 80, 100, 120<br>Volume (cm³): 0, 28.7, 47.1, 58.9, 66.5, 71.3, 74.4<br>(a) Calculate the mean rate of reaction over the first 20 s.<br>(b) Explain, using collision theory, why the rate decreases as the reaction goes on.<br>(c) The experiment is repeated with the same mass of powdered marble. How would the results change? Explain your answer.<br>(d) State one other change that would increase the rate.',
          answer: '(a) 1.4 cm³/s (b) reactants used up, fewer collisions (c) faster, same final volume (d) e.g. warmer acid',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'A student adds marble chips to dilute hydrochloric acid, and measures the total volume of carbon dioxide given off every 20 seconds, from 0 up to 74.4 cubic centimetres.' },
        { say: 'Part a: calculate the mean rate of reaction over the first 20 seconds. Part b: explain, using collision theory, why the rate decreases as the reaction goes on.', caption: 'Part (a): calculate the mean rate of reaction over the first 20 s. Part (b): explain, using collision theory, why the rate decreases as the reaction goes on.' },
        { say: 'Part c: the experiment is repeated with the same mass of powdered marble. How would the results change? Explain your answer. Part d: state one other change that would increase the rate.', caption: 'Part (c): the experiment is repeated with the same mass of powdered marble. How would the results change? Explain your answer. Part (d): state one other change that would increase the rate.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 700,
      left: [graph()],
      right: [{ kind: 'text', id: 'plain', size: 'md', md: 'A **steep** curve means a **fast** reaction' }],
      lines: [
        { say: 'Let us plot the results. Time goes along, and the total volume of gas goes up.', show: ['g.grid', 'g.axes'] },
        { say: 'Here is the student\'s curve. It climbs steeply at first, then less and less steeply.', show: ['g.lumps', 'g.lumps-label'] },
        { say: 'The steeper the curve, the more gas is made each second, so the faster the reaction. Every part of the question is about that steepness.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'rate', size: 'lg', lines: ['\\text{mean rate} = \\dfrac{\\text{amount of product made}}{\\text{time taken}}'] },
        { kind: 'callout', id: 'coll', tone: 'key', title: 'Collision theory', md: 'Particles react only when they **collide** with at least the **activation energy**. More collisions each second means a faster reaction.' },
      ],
      lines: [
        { say: 'Here is what we need. The mean rate of a reaction is the amount of product made, divided by the time it took.', show: 'rate' },
        { say: 'And collision theory: particles react only when they collide, and only if they collide with at least the activation energy.', show: 'coll' },
        { say: 'So anything that gives more successful collisions each second makes the reaction faster.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Divide the **volume** by the **time** for the mean rate', 'Explain each change by how it affects **collisions**', 'Remember the **amount** of product depends only on the reactants'] }],
      lines: [
        { say: 'Here is the plan. First, divide the volume of gas by the time for the mean rate.', show: 'plan.0' },
        { say: 'Second, explain every change in rate by what it does to the collisions.', show: 'plan.1' },
        { say: 'Third, keep in mind that how much product is made depends only on how much reactant there is, not on how fast it reacts.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Part (a)',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['\\text{mean rate} = \\dfrac{\\adj{28.7\\ \\text{cm}^3}}{\\hyp{20\\ \\text{s}}}', '= 1.435 \\approx \\brand{1.4\\ \\text{cm}^3\\text{/s}}'],
        },
      ],
      lines: [
        { say: 'Step one, part a. In the first 20 seconds, the volume rose from 0 to 28.7 cubic centimetres.', show: 'm.0' },
        { say: '28.7 divided by 20 is 1.435, which is about 1.4 cubic centimetres of gas per second.', show: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Part (b)',
      layout: 'split',
      leftWidth: 560,
      left: [runsOut('ro', 420)],
      right: [{ kind: 'callout', id: 'b', tone: 'key', title: 'Part (b)', md: 'The acid and marble are **used up**, so there are fewer reacting particles and **fewer collisions** each second.' }],
      lines: [
        { say: 'Step two, part b. The numbers show it: 28.7 cubic centimetres in the first 20 seconds, but only 3.1 in the last 20.', show: ['ro', 'ro.labels', 'ro.tally'] },
        { say: 'Here are reacting particles with a count of the new molecules made. At first there are plenty of them, so they collide often and the count shoots up. As they are used up, collisions get rarer, and the count climbs more and more slowly.', play: 'ro.go' },
        { say: 'So for part b: as the acid and the marble are used up, there are fewer reacting particles left, so there are fewer collisions each second, and the rate falls.', show: 'b' },
      ],
    },
    {
      chapter: 'Step 3: Part (c)',
      layout: 'center',
      main: [surface('sa', 400)],
      lines: [
        { say: 'Step three, part c. Here is the same solid as one lump, and broken into small pieces, with a count of the particles that have reacted.', show: ['sa', 'sa.labels', 'sa.tally'] },
        { say: 'The other particles can only reach the outside of the lump. The small pieces show far more surface, so collisions happen more often, and the count races ahead.', play: 'sa.go', focus: 'sa.b' },
      ],
    },
    {
      chapter: 'Powder on the graph',
      layout: 'split',
      leftWidth: 700,
      left: [graph()],
      right: [{ kind: 'bullets', id: 'c', items: ['**Steeper** at the start: larger surface area, more frequent collisions', '**Same** final volume: same mass of marble'] }],
      lines: [
        { say: 'So powdered marble gives a steeper curve at the start. Its much larger surface area exposes more marble particles to the acid, so collisions are more frequent.', show: ['g.grid', 'g.axes', 'g.lumps', 'g.lumps-label', 'g.powder', 'g.powder-label', 'c.0'], focus: 'g.powder' },
        { say: 'But the same mass of marble makes the same amount of carbon dioxide in the end, so both curves level off at the same volume. The powder just gets there sooner.', show: ['c.1', 'g.top'], focus: 'g.top' },
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
            ['(a)', '$28.7 \\div 20 = $ **1.4 cm³/s**'],
            ['(b)', 'Reactants **used up**: fewer collisions each second'],
            ['(c)', '**Faster** at first (larger surface area), **same** final volume'],
            ['(d)', 'Warm the acid, or use **more concentrated** acid'],
          ],
        },
      ],
      lines: [
        { say: 'Here is the whole answer.', show: 'ans' },
        { say: 'For part d, any one change will do. Warming the acid makes the particles move faster, so they collide more often and harder. More concentrated acid puts more acid particles in the same space, so they collide more often.' },
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
            ['(a) 0.62 cm³/s', 'Used the **whole** reaction, not the first 20 s'],
            ['(c) "More gas is made"', 'Mixed up **faster** with **more**'],
            ['(c) "The particles collide harder"', 'Surface area changes **how often** they collide'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Dividing 74.4 by 120 to get 0.62. That is the mean rate over the whole two minutes, but the question asks about the first 20 seconds.', focus: 'traps.0' },
        { say: 'Saying the powder makes more gas. It makes the same gas sooner, because the amount of product depends only on the amount of marble.', focus: 'traps.1' },
        { say: 'And saying that the particles collide harder. A larger surface area means more frequent collisions. Only a higher temperature makes them harder.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which change would **not** speed up the reaction of magnesium with hydrochloric acid?',
          choices: ['Warming the acid', 'Using a larger beaker', 'Using more concentrated acid', 'Using magnesium powder'],
          answer: 1,
          working: 'A bigger beaker holding the same acid does not change how often particles collide.',
        },
      ],
      lines: [
        { say: 'Your turn. Which change would not speed up the reaction of magnesium with hydrochloric acid? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Warming the acid, making it more concentrated and powdering the magnesium all mean more collisions each second. A larger beaker with the same acid changes nothing, so the answer is choice B.', show: 'q2.answer' },
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
          items: ['Mean rate = **product made ÷ time**', 'The rate falls as reactants are **used up**', 'Powder, heat or concentration: **more collisions** each second', 'The **amount** of product depends only on the reactants'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The mean rate is the amount of product made divided by the time taken.', show: 'sum.0' },
        { say: 'A reaction slows down as its reactants are used up, because there are fewer collisions.', show: 'sum.1' },
        { say: 'A larger surface area, a higher temperature or a higher concentration all give more collisions each second.', show: 'sum.2' },
        { say: 'And the amount of product depends only on how much reactant there is. For more on rates of reaction, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
