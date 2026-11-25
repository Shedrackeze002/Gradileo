import type { Explainer } from '@/video/script.ts';
import { strongAndWeak } from '@/content/chem20/videos/lib/c20-particles.ts';

// Exam question for Chemistry 30 lesson 4.7 (pH of weak acids and bases): the pH of 0.698 mol/L
// propionic acid, Ka = 1.34e-5. The question is OpenStax Chemistry 2e's own, word for word
// (end-of-chapter exercise 61, section 14.3, CC BY-NC-SA 4.0). The answer, which matches the
// book's: x = sqrt(1.34e-5 x 0.698) = 3.06e-3 mol/L, pH = 2.51 (x is 0.44% of c, so c - x = c).
//
// The picture is the lesson's strong and weak acids meeting water (src/video/chem.ts): all of the
// strong acid ionises, and only a few weak acid molecules do.

const QUESTION = 'Propionic acid, C2H5CO2H (Ka = 1.34 × 10−5), is used in the manufacture of calcium propionate, a food preservative. What is the pH of a 0.698-M solution of C2H5CO2H?';

const video: Explainer = {
  id: 'xq-c30-4-7',
  lessonId: '',
  exam: {
    lesson: 'c30-4-7',
    source: 'OpenStax, Chemistry 2e, end-of-chapter exercise 61, section 14.3, Relative Strengths of Acids and Bases',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/chemistry-2e/pages/14-exercises',
    question: QUESTION,
  },
  title: 'Exam Question: The pH of Propionic Acid. pH of Weak Acids and Bases',
  thumbnailTitle: 'The pH of a Weak Acid',
  thumbnail: 'sw',
  summary:
    'A real test question, solved one small step at a time: what is the pH of 0.698 mol/L propionic acid, Ka = 1.34 × 10⁻⁵? Only a little of a weak acid ionises, so an ICE table and the approximation c − x ≈ c give [H₃O⁺] = √(Ka c) = 3.06 × 10⁻³ mol/L, and a pH of 2.51.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'The pH of a Weak Acid', subtitle: 'Propionic acid, the food preservative' }],
      lines: [
        { say: 'In this video, we solve a real test question about the p H of a weak acid. We will take it one small step at a time, so that every step makes sense.', show: 'title', caption: 'In this video, we solve a real test question about the pH of a weak acid. We will take it one small step at a time, so that every step makes sense.' },
        { say: 'The question comes from the free OpenStax Chemistry textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: 'Propionic acid, $\\ce{C2H5CO2H}$ $(K_a = 1.34 \\times 10^{-5})$, is used in the manufacture of calcium propionate, a food preservative. What is the pH of a $0.698$-M solution of $\\ce{C2H5CO2H}$?', answer: 'pH = 2.51' }],
      lines: [
        { say: 'Here is the question, exactly as it was printed. Propionic acid, with K a equal to one point three four times ten to the minus five, is used in the manufacture of calcium propionate, a food preservative. What is the p H of a zero point six nine eight molar solution of propionic acid?', show: 'q', caption: 'Here is the question, exactly as it was printed. Propionic acid, C₂H₅CO₂H (Ka = 1.34 × 10⁻⁵), is used in the manufacture of calcium propionate, a food preservative. What is the pH of a 0.698-M solution of C₂H₅CO₂H?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'How much **hydronium** does a **weak** acid make, and what pH is that?' }],
      lines: [
        { say: 'The p H depends on the hydronium ion concentration. The acid is weak, so we cannot just take the hydronium as zero point six nine eight. We have to work out how much of the acid actually ionises.', show: 'plain', caption: 'The pH depends on [H₃O⁺]. The acid is weak, so we cannot just take [H₃O⁺] as 0.698. We have to work out how much of the acid actually ionises.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [strongAndWeak('sw')],
      lines: [
        { say: 'Here is what we need. Hydrochloric acid on the left, a strong acid, and acetic acid on the right, a weak acid like propionic acid.', show: ['sw', 'sw.labels', 'sw.key'] },
        { say: 'Watch them meet water. All of the strong acid ionises, but only a few weak acid molecules do. So a weak acid makes far less hydronium than its concentration.', show: 'sw.tally', play: 'sw.go' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Set up an **ICE table** with $x = [\\ce{H3O+}]$', 'Use $c - x \\approx c$ to find $x$', 'Take $\\text{pH} = -\\log x$, then **check** the approximation'] }],
      lines: [
        { say: 'Here is the plan. Set up an ICE table, with x for the hydronium ion concentration.', show: 'plan.0' },
        { say: 'Use the approximation that very little ionises to find x.', show: 'plan.1' },
        { say: 'Then take the p H, and check the approximation was fair.', show: 'plan.2', caption: 'Then take the pH, and check the approximation was fair.' },
      ],
    },
    {
      chapter: 'Step 1: The ICE table',
      layout: 'center',
      main: [
        { kind: 'math', id: 'e', size: 'md', lines: ['\\ce{C2H5COOH + H2O <=> H3O+ + C2H5COO-}'] },
        {
          kind: 'table',
          id: 't',
          head: ['', '$[\\ce{C2H5COOH}]$', '$[\\ce{H3O+}]$', '$[\\ce{C2H5COO-}]$'],
          rows: [
            ['Initial', '$0.698$', '$0$', '$0$'],
            ['Change', '$-x$', '$+x$', '$+x$'],
            ['Equilibrium', '$0.698 - x$', '$x$', '$x$'],
          ],
        },
        { kind: 'math', id: 'k', size: 'md', lines: ['1.34 \\times 10^{-5} = \\dfrac{x^2}{0.698 - x}'] },
      ],
      lines: [
        { say: 'Step one. Propionic acid gives a proton to water, making hydronium and the propanoate ion.', show: 'e.0', caption: 'Step one. Propionic acid gives a proton to water, making H₃O⁺ and the propanoate ion.' },
        { say: 'It starts at zero point six nine eight. Then x of it ionises, making x of each ion.', show: ['t.0', 't.1', 't.2'], focus: 't.2', caption: 'It starts at 0.698. Then x of it ionises, making x of each ion.' },
        { say: 'Put the equilibrium row into K a: x squared, over zero point six nine eight minus x.', show: 'k.0', focus: 'k.0', caption: 'Put the equilibrium row into Ka: x² over (0.698 − x).' },
      ],
    },
    {
      chapter: 'Step 2: Find x',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['0.698 - x \\approx 0.698', 'x = \\sqrt{1.34 \\times 10^{-5} \\times 0.698} = \\good{3.06 \\times 10^{-3}\\ \\text{mol/L}}'] }],
      lines: [
        { say: 'Step two. So little ionises that x is tiny next to zero point six nine eight, so zero point six nine eight minus x is about zero point six nine eight.', show: 'm.0', caption: 'Step two. So little ionises that x is tiny next to 0.698, so 0.698 − x ≈ 0.698.' },
        { say: 'Then x squared is K a times zero point six nine eight, and x is its square root: three point zero six times ten to the minus three moles per litre of hydronium.', show: 'm.1', focus: 'm.1', caption: 'Then x² = Ka × 0.698, and x is its square root: 3.06 × 10⁻³ mol/L of H₃O⁺.' },
      ],
    },
    {
      chapter: 'Step 3: The pH',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{pH} = -\\log(3.06 \\times 10^{-3}) = \\good{2.51}'] }],
      lines: [
        { say: 'Step three. The p H is the negative log of three point zero six times ten to the minus three: two point five one.', show: 'm.0', focus: 'm.0', caption: 'Step three. The pH is −log(3.06 × 10⁻³) = 2.51.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'math', id: 'x', size: 'md', lines: ['\\dfrac{3.06 \\times 10^{-3}}{0.698} \\times 100\\% = 0.44\\% \\ \\text{ionised}\\ \\checkmark'] },
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '$\\text{pH} = 2.51$' },
      ],
      lines: [
        { say: 'Check the approximation. x is only zero point four four percent of zero point six nine eight, well under the few percent where it starts to matter. And a p H between that of a strong acid, about zero point two, and neutral seven makes sense for a weak acid.', show: 'x.0', caption: 'Check the approximation. x is only 0.44% of 0.698, well under the few percent where it starts to matter. And a pH between that of a strong acid, about 0.2, and neutral 7 makes sense for a weak acid.' },
        { say: 'So the p H is two point five one. That matches the book.', show: 'ans', caption: 'So the pH is 2.51. That matches the book.' },
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
            ['$0.16$', 'Treated the acid as **strong**: $-\\log 0.698$'],
            ['$5.03$', 'Forgot the **square root**'],
            ['$4.87$', 'Took $-\\log K_a$, the $\\text{p}K_a$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Zero point one six assumes all the acid ionises. Only zero point four four percent does.', focus: 'traps.0', caption: '0.16 assumes all the acid ionises. Only 0.44% does.' },
        { say: 'Five point zero three takes the log of x squared, forgetting the square root.', focus: 'traps.1', caption: '5.03 takes the log of x², forgetting the square root.' },
        { say: 'And four point eight seven is the negative log of K a itself, which is the p K a, not the p H.', focus: 'traps.2', caption: 'And 4.87 is −log Ka, which is the pKa, not the pH.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'What is the pH of $0.0500\\ \\text{mol/L}$ acetic acid, $K_a = 1.8 \\times 10^{-5}$? Use the approximation.',
          choices: ['$1.30$', '$4.74$', '$3.02$', '$6.05$'],
          answer: 2,
          working: '$x = \\sqrt{1.8 \\times 10^{-5} \\times 0.0500} = 9.49 \\times 10^{-4}$, and $-\\log(9.49 \\times 10^{-4}) = 3.02$.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the p H of zero point zero five zero zero moles per litre acetic acid, with K a equal to one point eight times ten to the minus five? Use the approximation. Pause the video and try it.', caption: 'Your turn. What is the pH of 0.0500 mol/L acetic acid, Ka = 1.8 × 10⁻⁵? Use the approximation. Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'x is the square root of one point eight times ten to the minus five times zero point zero five zero zero: nine point four nine times ten to the minus four. The negative log is three point zero two: choice C.', caption: 'x = √(1.8 × 10⁻⁵ × 0.0500) = 9.49 × 10⁻⁴, and −log(9.49 × 10⁻⁴) = 3.02: choice C.', show: 'q2.answer' },
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
          items: ['A weak acid **barely** ionises', '$[\\ce{H3O+}] \\approx \\sqrt{K_a c}$ when $c - x \\approx c$', 'Then $\\text{pH} = -\\log[\\ce{H3O+}]$, and **check** the percent'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A weak acid barely ionises, so its hydronium concentration is much less than the acid concentration.', show: 'sum.0' },
        { say: 'When so little ionises that c minus x is about c, the hydronium concentration is the square root of K a times c.', show: 'sum.1', caption: 'When so little ionises that c − x ≈ c, [H₃O⁺] is the square root of Ka times c.' },
        { say: 'Then the p H is the negative log, and check that the percent ionised is small. For more on the p H of weak acids and bases, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.2', caption: 'Then the pH is −log[H₃O⁺], and check that the percent ionised is small. For more on the pH of weak acids and bases, watch this lesson\'s explainer videos on Gradileo.' },
      ],
    },
  ],
};

export default video;
