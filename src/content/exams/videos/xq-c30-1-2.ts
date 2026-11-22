import type { Explainer, ParticlesEl } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import heatLost from '@/content/chem30/videos/c30-1-2-d.ts';

// Exam question for Chemistry 30 lesson 1.2 (calorimetry): how much a cup of coffee cools when a
// room-temperature silver spoon is put in it. The question is OpenStax Chemistry 2e's own, word for
// word (end-of-chapter exercise 19, section 5.2, CC BY-NC-SA 4.0). The answer, which matches the
// book's: heat lost by the coffee = heat gained by the spoon, 180 x 4.184 x (95 - T) =
// 45 x 0.24 x (T - 25), so T = 94.0 °C and the coffee cools by about 1 °C.
//
// The pictures are simulated particles (src/video/particles.ts), coloured by speed: the lesson's hot
// copper lump cooling in cold water, then this question's cold spoon in hot coffee, where the few
// spoon particles warm a lot and the many coffee particles barely cool.

/** A small cold spoon in a cup of hot coffee (clip `go`): the spoon warms a lot, the coffee cools a little. */
const spoon: ParticlesEl = {
  kind: 'particles',
  id: 'sp',
  boxes: [
    {
      id: 'c',
      state: 'liquid',
      width: 12,
      height: 9,
      temp: 0.85,
      insulated: true,
      lump: true,
      cross: 0.6,
      heatColor: [0.1, 1],
      kinds: [
        { n: 8, bond: 4, heavy: 3 / 20, mass: 20, size: 1.2, tone: 'theta', name: 'silver spoon', temp: 0.08 },
        { n: 56, tone: 'adj', name: 'coffee' },
      ],
      label: 'a cool silver spoon in hot coffee',
    },
  ],
  clips: { go: { phases: [{ dur: 18 }] } },
  thermometers: true,
  seed: 4,
  height: 400,
};

const QUESTION =
  'How much will the temperature of a cup (180 g) of coffee at 95 °C be reduced when a 45 g silver spoon (specific heat 0.24 J/g °C) at 25 °C is placed in the coffee and the two are allowed to reach the same temperature? Assume that the coffee has the same density and specific heat as water.';

const video: Explainer = {
  id: 'xq-c30-1-2',
  lessonId: '',
  exam: {
    lesson: 'c30-1-2',
    source: 'OpenStax, Chemistry 2e, end-of-chapter exercise 19, section 5.2, Calorimetry',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/chemistry-2e/pages/5-exercises',
    question: QUESTION,
  },
  title: 'Exam Question: How Much Does a Spoon Cool Your Coffee? Calorimetry',
  thumbnailTitle: 'A Spoon in Hot Coffee',
  thumbnail: 'sp',
  summary:
    'A real test question, solved one small step at a time: a 45 g silver spoon at 25 °C goes into 180 g of coffee at 95 °C. We set the heat the coffee loses equal to the heat the spoon gains, solve for the final temperature of 94.0 °C, and find the coffee cools by only about 1 °C.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Much Does a Spoon Cool Your Coffee?', subtitle: 'Heat lost equals heat gained, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about heat moving between two things at different temperatures. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Chemistry textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
            'How much will the temperature of a cup ($180\\ \\text{g}$) of coffee at $95\\ ^\\circ\\text{C}$ be reduced when a $45\\ \\text{g}$ silver spoon (specific heat $0.24\\ \\text{J/g}\\,^\\circ\\text{C}$) at $25\\ ^\\circ\\text{C}$ is placed in the coffee and the two are allowed to reach the same temperature? Assume that the coffee has the same density and specific heat as water.',
          answer: 'About 1 °C (to 94.0 °C)',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed. How much will the temperature of a cup, one hundred and eighty grams, of coffee at ninety five degrees Celsius be reduced when a forty five gram silver spoon at twenty five degrees is placed in the coffee?', show: 'q', caption: 'Here is the question, exactly as it was printed. How much will the temperature of a cup (180 g) of coffee at 95 °C be reduced when a 45 g silver spoon at 25 °C is placed in the coffee?' },
        { say: 'The spoon\'s specific heat is zero point two four joules per gram degree Celsius, and the coffee has the same density and specific heat as water. The two are allowed to reach the same temperature.', caption: 'The spoon\'s specific heat is 0.24 J/(g·°C), and the coffee has the same density and specific heat as water. The two are allowed to reach the same temperature.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Hot coffee meets a cool spoon. Find the **final temperature** they share, then how far the **coffee** dropped' }],
      lines: [
        { say: 'Heat flows from the hot coffee into the cool spoon until they reach the same final temperature. We want how far the coffee\'s temperature drops on the way.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(heatLost, 'hm'), { kind: 'math', id: 'k', size: 'md', lines: ['Q = mc\\Delta t \\qquad Q_{\\text{lost}} = Q_{\\text{gained}}'] }],
      lines: [
        { say: 'Here is what we need. A hot copper lump in cold water, in an insulated cup. Particles are coloured by speed: red is hot and blue is cold.', show: ['hm', 'hm.labels', 'hm.thermo'], play: 'hm.go' },
        { say: 'Every bit of energy the copper loses goes into the water, until both reach the same temperature. So the heat lost by one equals the heat gained by the other.', focus: 'hm.thermo' },
        { say: 'Each heat is Q equals m c delta t: the mass, times the specific heat capacity, times the change in temperature.', show: 'k.0', caption: 'Each heat is Q = mcΔt: the mass, times the specific heat capacity, times the change in temperature.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Call the final temperature $T$', 'Write **heat lost by the coffee** $=$ **heat gained by the spoon**', 'Solve for $T$, then subtract it from $95\\ ^\\circ\\text{C}$'] }],
      lines: [
        { say: 'Here is the plan. Call the final temperature T.', show: 'plan.0' },
        { say: 'Write the heat the coffee loses equal to the heat the spoon gains, each as m c delta t.', show: 'plan.1', caption: 'Write the heat the coffee loses equal to the heat the spoon gains, each as mcΔt.' },
        { say: 'Then solve for T, and subtract it from ninety five degrees.', show: 'plan.2', caption: 'Then solve for T, and subtract it from 95 °C.' },
      ],
    },
    {
      chapter: 'Step 1: Set up the balance',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 's',
          size: 'md',
          lines: ['\\underbrace{180 \\times 4.184 \\times (95 - T)}_{\\text{lost by coffee}} = \\underbrace{45 \\times 0.24 \\times (T - 25)}_{\\text{gained by spoon}}'],
        },
      ],
      lines: [
        { say: 'Step one. The coffee is water as far as heat goes, so its specific heat is four point one eight four. It cools from ninety five down to T, a change of ninety five minus T.', show: 's.0', caption: 'Step one. The coffee has the specific heat of water, 4.184 J/(g·°C). It cools from 95 °C down to T, a change of 95 − T.' },
        { say: 'The spoon warms from twenty five up to T, a change of T minus twenty five. Writing each change as the larger temperature minus the smaller keeps both heats positive.', focus: 's.0', caption: 'The spoon warms from 25 °C up to T, a change of T − 25. Writing each change as the larger temperature minus the smaller keeps both heats positive.' },
      ],
    },
    {
      chapter: 'Step 2: Multiply out',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['753.1\\,(95 - T) = 10.8\\,(T - 25)', '71\\,546 - 753.1\\,T = 10.8\\,T - 270'] }],
      lines: [
        { say: 'Step two. One hundred and eighty times four point one eight four is seven hundred and fifty three point one. Forty five times zero point two four is ten point eight.', show: 'm.0', caption: 'Step two. 180 × 4.184 = 753.1, and 45 × 0.24 = 10.8.' },
        { say: 'Multiply out both brackets.', show: 'm.1', caption: 'Multiply out both brackets: 753.1 × 95 = 71 546, and 10.8 × 25 = 270.' },
      ],
    },
    {
      chapter: 'Step 3: Solve for T',
      layout: 'center',
      main: [{ kind: 'math', id: 't', size: 'lg', lines: ['71\\,546 + 270 = 10.8\\,T + 753.1\\,T', '71\\,816 = 763.9\\,T \\quad\\Rightarrow\\quad T = 94.0\\ ^\\circ\\text{C}', '95 - 94.0 = \\good{1.0\\ ^\\circ\\text{C}}'] }],
      lines: [
        { say: 'Step three. Gather the T terms on one side and the numbers on the other.', show: 't.0' },
        { say: 'Seventy one thousand eight hundred and sixteen equals seven hundred and sixty three point nine T, so T is ninety four point zero degrees Celsius.', show: 't.1', caption: '71 816 = 763.9 T, so T = 71 816 ÷ 763.9 = 94.0 °C.' },
        { say: 'So the coffee cools from ninety five to ninety four, a drop of only about one degree.', show: 't.2', focus: 't.2', caption: 'So the coffee cools from 95 °C to 94.0 °C, a drop of only about 1 °C.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        spoon,
        { kind: 'math', id: 'k2', size: 'md', lines: ['753.1 \\times 0.99 \\approx 745\\ \\text{J} \\qquad 10.8 \\times 69 \\approx 745\\ \\text{J}\\ \\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'Here is our cup up close: a few spoon particles, cool and blue, among many hot coffee particles. Watch the spoon.', show: ['sp', 'sp.labels', 'sp.thermo'], play: 'sp.go' },
        { say: 'The spoon warms almost all the way to the coffee\'s temperature, while the coffee hardly changes. The coffee has four times the mass and about seventeen times the specific heat, so the same energy barely moves its temperature.', focus: 'sp.thermo' },
        { say: 'And the two heats agree: the coffee loses about seven hundred and forty five joules, and the spoon gains the same. The drop is about one degree, which matches the book.', show: 'k2.0', caption: 'And the two heats agree: the coffee loses about 745 J, and the spoon gains the same. The drop is about 1 °C, which matches the book.' },
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
            ['$35\\ ^\\circ\\text{C}$', '**Averaged** 95 and 25, ignoring mass and specific heat'],
            ['$14\\ ^\\circ\\text{C}$', 'Weighted by **mass** only, ignoring specific heat'],
            ['$69\\ ^\\circ\\text{C}$', 'Gave the **spoon\'s** change, not the coffee\'s'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Thirty five degrees comes from averaging the two temperatures to sixty. That only works for equal masses of the same substance.', focus: 'traps.0' },
        { say: 'Fourteen degrees comes from weighting by mass but leaving out the specific heats. Water takes far more energy per degree than silver.', focus: 'traps.1' },
        { say: 'And sixty nine degrees is how far the spoon warms. The question asks about the coffee.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A $50.0\\ \\text{g}$ copper block ($c = 0.385\\ \\text{J/(g·°C)}$) at $100.0\\ ^\\circ\\text{C}$ is placed in $200.0\\ \\text{g}$ of water at $20.0\\ ^\\circ\\text{C}$ in an insulated cup. What is the final temperature?',
          choices: ['$21.8\\ ^\\circ\\text{C}$', '$60.0\\ ^\\circ\\text{C}$', '$78.2\\ ^\\circ\\text{C}$', '$36.0\\ ^\\circ\\text{C}$'],
          answer: 0,
          working: '$19.25\\,(100.0 - T) = 836.8\\,(T - 20.0)$, so $18\\,661 = 856.05\\,T$ and $T = 21.8\\ ^\\circ\\text{C}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A fifty gram copper block at one hundred degrees is placed in two hundred grams of water at twenty degrees, in an insulated cup. Copper\'s specific heat is zero point three eight five. What is the final temperature? Pause the video and try it.', show: 'q2', wait: 6, caption: 'Your turn. A 50.0 g copper block (c = 0.385 J/(g·°C)) at 100.0 °C is placed in 200.0 g of water at 20.0 °C. What is the final temperature? Pause the video and try it.' },
        { say: 'Nineteen point two five times one hundred minus T equals eight hundred and thirty six point eight times T minus twenty, so T is twenty one point eight degrees: choice A.', show: 'q2.answer', caption: '19.25 (100.0 − T) = 836.8 (T − 20.0), so T = 21.8 °C: choice A.' },
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
          items: ['In an insulated cup, **heat lost** $=$ **heat gained**', 'Each heat is $mc\\Delta t$, with $\\Delta t$ written to be **positive**', 'Solve for the **shared final temperature**'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. When nothing escapes, the heat lost by the hot object equals the heat gained by the cold one.', show: 'sum.0' },
        { say: 'Write each heat as m c delta t, with each temperature change written so it is positive.', show: 'sum.1', caption: 'Write each heat as mcΔt, with each temperature change written so it is positive.' },
        { say: 'Then solve for the final temperature they share. For more on calorimetry, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
