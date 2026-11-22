import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { dilutingAcid } from '@/content/chem10/videos/lib/c10-particles.ts';
import { phStrip } from '@/content/chem20/videos/lib/c20-3b-figures.ts';

// Exam question for Chemistry 20 lesson 3.7 (pH and pOH): the pH and pOH of 0.000259 M HClO4 and of
// 0.21 M NaOH, both ionising completely. The question is parts (a) and (b) of OpenStax Chemistry
// 2e's end-of-chapter exercise 19, section 14.2, word for word (CC BY-NC-SA 4.0); parts (c) and (d)
// are left out. The answers, which match the book's: (a) pH = -log(2.59 x 10^-4) = 3.587 and
// pOH = 10.413; (b) pOH = -log(0.21) = 0.68 and pH = 13.32.
//
// The pictures are simulated particles (src/video/particles.ts): the lesson's hydrogen ions
// spreading out as an acid is diluted, then the pH scale with its pOH row, the two answers marked.

/** The pH scale with a pOH row, and the two solutions of the question marked on it. */
const strip = figure(
  's',
  [
    phStrip({
      poh: true,
      marks: [
        { id: 'a', value: 3.587, tex: '\\text{(a) } \\ce{HClO4}', arrow: true },
        { id: 'b', value: 13.32, tex: '\\text{(b) } \\ce{NaOH}', arrow: true },
      ],
    }),
  ],
  300,
);

const QUESTION =
  'Calculate the pH and the pOH of each of the following solutions at 25 °C for which the substances ionize completely: (a) 0.000259 M HClO4 (b) 0.21 M NaOH';

const video: Explainer = {
  id: 'xq-c20-3-7',
  lessonId: '',
  exam: {
    lesson: 'c20-3-7',
    source: 'OpenStax, Chemistry 2e, end-of-chapter exercise 19 (a) and (b), section 14.2, pH and pOH',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/chemistry-2e/pages/14-exercises',
    question: QUESTION,
  },
  title: 'Exam Question: pH and pOH of an Acid and a Base. pH and pOH',
  thumbnailTitle: 'pH and pOH of an Acid and a Base',
  thumbnail: 's',
  summary:
    'A real test question, solved one small step at a time: what are the pH and pOH of 0.000259 M perchloric acid and of 0.21 M sodium hydroxide? We take the negative log of the right ion\'s concentration, use pH + pOH = 14.00, and place both answers on the pH scale.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'pH and pOH of an Acid and a Base', subtitle: 'Logs of concentrations, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the p H and p O H of an acid and a base. We will take it one small step at a time, so that every step makes sense.', show: 'title', caption: 'In this video, we solve a real test question about the pH and pOH of an acid and a base. We will take it one small step at a time, so that every step makes sense.' },
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
            'Calculate the pH and the pOH of each of the following solutions at $25\\ ^\\circ\\text{C}$ for which the substances ionize completely:<br>(a) 0.000259 M $\\ce{HClO4}$<br>(b) 0.21 M $\\ce{NaOH}$',
          answer: '(a) pH 3.587, pOH 10.413; (b) pH 13.32, pOH 0.68',
        },
      ],
      lines: [
        { say: 'Here is the question, from the first two parts of the exercise.', show: 'q' },
        { say: 'Calculate the p H and the p O H of each of the following solutions at twenty five degrees Celsius, for which the substances ionise completely.', caption: 'Calculate the pH and the pOH of each of the following solutions at 25 °C for which the substances ionize completely:' },
        { say: 'Part a: zero point zero zero zero two five nine molar perchloric acid, H C l O four. Part b: zero point two one molar sodium hydroxide.', caption: '(a) 0.000259 M HClO₄ (b) 0.21 M NaOH' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Find the **hydronium** or **hydroxide** concentration, then turn it into **pH** and **pOH**' }],
      lines: [
        { say: 'Capital M means moles per litre. Ionising completely means every molecule or formula unit forms its ions.', show: 'plain' },
        { say: 'So we can read off the concentration of hydronium ions from the acid, or hydroxide ions from the base, and turn each into a p H and a p O H.', caption: 'So we can read off the concentration of hydronium ions from the acid, or hydroxide ions from the base, and turn each into a pH and a pOH.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'split',
      leftWidth: 600,
      left: [dilutingAcid('dl', 380)],
      right: [{ kind: 'math', id: 'k', size: 'md', lines: ['\\text{pH} = -\\log[\\ce{H3O+}]', '\\text{pOH} = -\\log[\\ce{OH-}]', '\\text{pH} + \\text{pOH} = 14.00'] }],
      lines: [
        { say: 'Here is what we need. These are the hydrogen ions in a little acid. Add water, and they spread out, so their concentration falls.', show: ['dl', 'dl.labels', 'dl.key', 'dl.volume'], play: 'dl.dilute' },
        { say: 'These concentrations span many powers of ten, so we use p H: the negative log of the hydronium ion concentration.', show: 'k.0', caption: 'These concentrations span many powers of ten, so we use pH: the negative log of the hydronium ion concentration.' },
        { say: 'In the same way, p O H is the negative log of the hydroxide ion concentration.', show: 'k.1', caption: 'In the same way, pOH is the negative log of the hydroxide ion concentration.' },
        { say: 'And at twenty five degrees Celsius, p H plus p O H equals fourteen point zero zero.', show: 'k.2', focus: 'k.2', caption: 'And at 25 °C, pH + pOH = 14.00.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Read off $[\\ce{H3O+}]$ for the **acid**, $[\\ce{OH-}]$ for the **base**', 'Take the **negative log**', 'Subtract from **14.00** for the other one'] }],
      lines: [
        { say: 'Here is the plan. For the acid, the hydronium ion concentration equals the acid\'s concentration. For the base, the hydroxide ion concentration equals the base\'s.', show: 'plan.0' },
        { say: 'Take the negative log of that concentration.', show: 'plan.1' },
        { say: 'Then subtract from fourteen point zero zero to get the other value.', show: 'plan.2', caption: 'Then subtract from 14.00 to get the other value.' },
      ],
    },
    {
      chapter: 'Step 1: Part (a), the acid',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'a',
          size: 'lg',
          lines: ['[\\ce{H3O+}] = 0.000259 = 2.59 \\times 10^{-4}\\ \\text{mol/L}', '\\text{pH} = -\\log(2.59 \\times 10^{-4}) = \\good{3.587}', '\\text{pOH} = 14.000 - 3.587 = \\good{10.413}'],
        },
      ],
      lines: [
        { say: 'Step one, part a. Perchloric acid ionises completely, so the hydronium ion concentration is the same as the acid\'s: two point five nine times ten to the minus four moles per litre.', show: 'a.0', caption: 'Step one, part (a). Perchloric acid ionises completely, so [H₃O⁺] is the same as the acid\'s concentration: 2.59 × 10⁻⁴ mol/L.' },
        { say: 'The p H is the negative log of that: three point five eight seven. The concentration has three significant figures, so the p H has three decimal places.', show: 'a.1', caption: 'The pH is the negative log of that: 3.587. The concentration has three significant figures, so the pH has three decimal places.' },
        { say: 'Then the p O H is fourteen minus three point five eight seven, which is ten point four one three.', show: 'a.2', caption: 'Then the pOH is 14.000 − 3.587 = 10.413.' },
      ],
    },
    {
      chapter: 'Step 2: Part (b), the base',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'b',
          size: 'lg',
          lines: ['\\ce{NaOH -> Na+ + OH-}: \\quad [\\ce{OH-}] = 0.21\\ \\text{mol/L}', '\\text{pOH} = -\\log(0.21) = \\good{0.68}', '\\text{pH} = 14.00 - 0.68 = \\good{13.32}'],
        },
      ],
      lines: [
        { say: 'Step two, part b. Each formula unit of sodium hydroxide gives one hydroxide ion, so the hydroxide ion concentration is zero point two one moles per litre.', show: 'b.0', caption: 'Step two, part (b). Each formula unit of NaOH gives one OH⁻ ion, so [OH⁻] = 0.21 mol/L.' },
        { say: 'This time we start with p O H: the negative log of zero point two one is zero point six eight, to two decimal places for two significant figures.', show: 'b.1', caption: 'This time we start with pOH: −log(0.21) = 0.68, to two decimal places for two significant figures.' },
        { say: 'Then the p H is fourteen point zero zero minus zero point six eight, which is thirteen point three two.', show: 'b.2', caption: 'Then the pH is 14.00 − 0.68 = 13.32.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        strip,
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '**(a)** pH $= 3.587$, pOH $= 10.413$ &nbsp;&nbsp; **(b)** pH $= 13.32$, pOH $= 0.68$' },
      ],
      lines: [
        { say: 'Let us check the answers on the p H scale, with the p O H written under each p H.', show: ['s', 's.scale', 's.acidic', 's.neutral', 's.basic', 's.poh'], caption: 'Let us check the answers on the pH scale, with the pOH written under each pH.' },
        { say: 'The perchloric acid sits at about three and a half, well into the acidic end, which makes sense for an acid.', show: 's.a', focus: 's.a' },
        { say: 'The sodium hydroxide sits above thirteen, far into the basic end, as a fairly concentrated base should.', show: 's.b', focus: 's.b' },
        { say: 'So for part a, the p H is three point five eight seven and the p O H is ten point four one three. For part b, the p H is thirteen point three two and the p O H is zero point six eight. These match the book.', show: 'ans', caption: 'So for part (a), the pH is 3.587 and the pOH is 10.413. For part (b), the pH is 13.32 and the pOH is 0.68. These match the book.' },
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
            ['(a) pH $= -3.587$', 'Forgot the **minus** sign in $-\\log$'],
            ['(b) pH $= 0.68$', 'Took $[\\ce{OH-}]$ as if it were $[\\ce{H3O+}]$'],
            ['(b) pH $= 14.00 - 0.21 = 13.79$', 'Subtracted the **concentration**, not the pOH'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'A negative p H in part a comes from forgetting the minus sign. The log of a small number is negative, and the minus sign makes the p H positive.', focus: 'traps.0', caption: 'A negative pH in part (a) comes from forgetting the minus sign. The log of a small number is negative, and the minus sign makes the pH positive.' },
        { say: 'A p H of zero point six eight for sodium hydroxide uses the hydroxide concentration as if it were hydronium. A base must have a p H above seven.', focus: 'traps.1', caption: 'A pH of 0.68 for sodium hydroxide uses the hydroxide concentration as if it were hydronium. A base must have a pH above 7.' },
        { say: 'And thirteen point seven nine comes from subtracting the concentration from fourteen. Only p O H can be subtracted from fourteen.', focus: 'traps.2', caption: 'And 13.79 comes from subtracting the concentration from 14. Only pOH can be subtracted from 14.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'What is the pH of a $0.050\\ \\text{mol/L}$ solution of $\\ce{KOH}$ at $25\\ ^\\circ\\text{C}$? It dissociates completely.',
          choices: ['$1.30$', '$13.95$', '$12.70$', '$7.05$'],
          answer: 2,
          working: '$\\text{pOH} = -\\log(0.050) = 1.30$, so $\\text{pH} = 14.00 - 1.30 = 12.70$.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the p H of a zero point zero five zero moles per litre solution of potassium hydroxide, at twenty five degrees Celsius? It dissociates completely. Pause the video and try it.', show: 'q2', wait: 6, caption: 'Your turn. What is the pH of a 0.050 mol/L solution of KOH at 25 °C? It dissociates completely. Pause the video and try it.' },
        { say: 'The p O H is the negative log of zero point zero five zero, which is one point three zero. So the p H is fourteen minus one point three zero, twelve point seven zero: choice C.', show: 'q2.answer', caption: 'The pOH is −log(0.050) = 1.30. So the pH is 14.00 − 1.30 = 12.70: choice C.' },
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
          items: ['Acid: $\\text{pH} = -\\log[\\ce{H3O+}]$ first', 'Base: $\\text{pOH} = -\\log[\\ce{OH-}]$ first', 'Then $\\text{pH} + \\text{pOH} = 14.00$ at $25\\ ^\\circ\\text{C}$'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. For an acid, start with the p H: the negative log of the hydronium ion concentration.', show: 'sum.0', caption: 'Here is what to remember. For an acid, start with the pH: the negative log of the hydronium ion concentration.' },
        { say: 'For a base, start with the p O H: the negative log of the hydroxide ion concentration.', show: 'sum.1', caption: 'For a base, start with the pOH: the negative log of the hydroxide ion concentration.' },
        { say: 'Then use p H plus p O H equals fourteen point zero zero. For more on p H, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.2', caption: 'Then use pH + pOH = 14.00. For more on pH, watch this lesson\'s explainer videos on Gradileo.' },
      ],
    },
  ],
};

export default video;
