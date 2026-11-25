import type { Explainer } from '@/video/script.ts';
import { bufferVsWater } from '@/content/chem30/videos/lib/c30-particles.ts';

// Exam question for Chemistry 30 lesson 4.8 (buffers and titration curves): [H3O+] in a buffer of
// 0.075 M HNO2 and 0.030 M NaNO2, with the Ka the question prints (4.5e-5). The question is
// OpenStax Chemistry 2e's own, word for word (end-of-chapter exercise 81, section 14.6,
// CC BY-NC-SA 4.0). The answer, which matches the book's: [H3O+] = Ka x [HNO2] / [NO2-]
// = 4.5e-5 x 0.075 / 0.030 = 1.1e-4 M (the nitrite already present keeps the ionisation tiny, so
// both concentrations stay as made).
//
// The picture is the lesson's sodium hydroxide dripping into water and into a buffer side by side
// (src/video/chem.ts): the buffer's acid takes up the hydroxide ions.

const QUESTION = 'What is [H3O+] in a solution of 0.075 M HNO2 and 0.030 M NaNO2? HNO2(aq) + H2O(l) ⇌ H3O+(aq) + NO2−(aq), Ka = 4.5 × 10−5';

const video: Explainer = {
  id: 'xq-c30-4-8',
  lessonId: '',
  exam: {
    lesson: 'c30-4-8',
    source: 'OpenStax, Chemistry 2e, end-of-chapter exercise 81, section 14.6, Buffers',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/chemistry-2e/pages/14-exercises',
    question: QUESTION,
  },
  title: 'Exam Question: Hydronium in a Nitrite Buffer. Buffers and Titration Curves',
  thumbnailTitle: 'Hydronium in a Buffer',
  thumbnail: 'bw',
  summary:
    'A real test question, solved one small step at a time: what is [H3O+] in a solution of 0.075 M HNO2 and 0.030 M NaNO2? A weak acid with its conjugate base is a buffer, so we rearrange Ka to [H3O+] = Ka × [acid] ÷ [base] and substitute: 1.1 × 10⁻⁴ M.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Hydronium in a Buffer', subtitle: 'A weak acid and its conjugate base together' }],
      lines: [
        { say: 'In this video, we solve a real test question about buffers. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Chemistry textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: 'What is $[\\ce{H3O+}]$ in a solution of $0.075$ M $\\ce{HNO2}$ and $0.030$ M $\\ce{NaNO2}$? $\\ce{HNO2(aq) + H2O(l) <=> H3O+(aq) + NO2-(aq)}$, $K_a = 4.5 \\times 10^{-5}$', answer: '1.1 × 10⁻⁴ M' }],
      lines: [
        { say: 'Here is the question, exactly as it was printed. What is the hydronium ion concentration in a solution of zero point zero seven five molar nitrous acid and zero point zero three zero molar sodium nitrite? Nitrous acid ionises in water with K a equal to four point five times ten to the minus five.', show: 'q', caption: 'Here is the question, exactly as it was printed. What is [H₃O⁺] in a solution of 0.075 M HNO₂ and 0.030 M NaNO₂? HNO₂(aq) + H₂O(l) ⇌ H₃O⁺(aq) + NO₂⁻(aq), Ka = 4.5 × 10⁻⁵.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'A weak acid **and** its conjugate base, mixed. How much **hydronium** is there?' }],
      lines: [
        { say: 'This is not a weak acid on its own: the solution also holds nitrite ions from the salt. We need the hydronium concentration in that mixture.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [bufferVsWater('bw', { seed: 2 })],
      lines: [
        { say: 'Here is what we need. Sodium hydroxide drips into pure water on the left, and into a buffer of a weak acid and its conjugate base on the right. Watch the count of hydroxide ions in each.', show: ['bw', 'bw.labels', 'bw.key', 'bw.tally'], play: 'bw.drip' },
        { say: 'In the water, the count climbs. In the buffer, each hydroxide ion takes a hydrogen from an acid molecule, so it never builds up. A weak acid together with its conjugate base is a buffer, and its hydronium level is set by the ratio of the two.', focus: 'bw.tally' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Spot the **acid** and the **conjugate base**: a buffer', 'Rearrange $K_a$ for $[\\ce{H3O+}]$', '**Substitute** the two concentrations'] }],
      lines: [
        { say: 'Here is the plan. First, spot the weak acid and its conjugate base, which makes this a buffer.', show: 'plan.0' },
        { say: 'Then rearrange the K a expression to give the hydronium concentration.', show: 'plan.1', caption: 'Then rearrange the Ka expression to give [H₃O⁺].' },
        { say: 'Then substitute the two concentrations.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The buffer pair',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\ce{NaNO2 -> Na+ + NO2-}', '\\text{acid: } \\ce{HNO2} = 0.075\\ \\text{M} \\qquad \\text{conjugate base: } \\ce{NO2-} = 0.030\\ \\text{M}'] }],
      lines: [
        { say: 'Step one. Sodium nitrite is a salt, so it splits completely into sodium ions and nitrite ions. The sodium ion is a spectator.', show: 'm.0', caption: 'Step one. NaNO₂ is a salt, so it splits completely into Na⁺ and NO₂⁻ ions. The sodium ion is a spectator.' },
        { say: 'So the solution holds zero point zero seven five molar nitrous acid, the weak acid, and zero point zero three zero molar nitrite, its conjugate base. That pair is a buffer.', show: 'm.1', focus: 'm.1', caption: 'So the solution holds 0.075 M HNO₂, the weak acid, and 0.030 M NO₂⁻, its conjugate base. That pair is a buffer.' },
      ],
    },
    {
      chapter: 'Step 2: Rearrange Ka',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['K_a = \\dfrac{[\\ce{H3O+}][\\ce{NO2-}]}{[\\ce{HNO2}]}', '[\\ce{H3O+}] = K_a \\times \\dfrac{[\\ce{HNO2}]}{[\\ce{NO2-}]}'] }],
      lines: [
        { say: 'Step two. Write the K a expression for nitrous acid.', show: 'm.0', caption: 'Step two. Write the Ka expression for HNO₂.' },
        { say: 'Rearrange it: the hydronium concentration is K a times the acid over the conjugate base. The nitrite already present pushes the ionisation back, so so little acid ionises that both concentrations stay as they were made.', show: 'm.1', focus: 'm.1', caption: 'Rearrange it: [H₃O⁺] = Ka × [acid] ÷ [conjugate base]. The nitrite already present pushes the ionisation back, so so little acid ionises that both concentrations stay as they were made.' },
      ],
    },
    {
      chapter: 'Step 3: Substitute',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['[\\ce{H3O+}] = 4.5 \\times 10^{-5} \\times \\dfrac{0.075}{0.030}', '= 4.5 \\times 10^{-5} \\times 2.5 = \\good{1.1 \\times 10^{-4}\\ \\text{M}}'] }],
      lines: [
        { say: 'Step three. Zero point zero seven five over zero point zero three zero is two point five.', show: 'm.0', caption: 'Step three. 0.075 ÷ 0.030 = 2.5.' },
        { say: 'Four point five times ten to the minus five, times two point five, is one point one times ten to the minus four molar.', show: 'm.1', focus: 'm.1', caption: '4.5 × 10⁻⁵ × 2.5 = 1.1 × 10⁻⁴ M.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'math', id: 'x', size: 'md', lines: ['\\text{more acid than base} \\Rightarrow [\\ce{H3O+}] > K_a\\ \\checkmark', '\\dfrac{1.1 \\times 10^{-4}}{0.075} = 0.15\\%\\ \\text{ionised}\\ \\checkmark'] },
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '$[\\ce{H3O+}] = 1.1 \\times 10^{-4}$ M, a pH of about $3.95$.' },
      ],
      lines: [
        { say: 'Does it make sense? There is more acid than conjugate base, so the hydronium concentration should be a little above K a, and it is two and a half times it.', show: 'x.0', caption: 'Does it make sense? There is more acid than conjugate base, so [H₃O⁺] should be a little above Ka, and it is 2.5 times it.' },
        { say: 'And the hydronium is only zero point one five percent of the acid, so taking the concentrations as made was fair.', show: 'x.1', caption: 'And the hydronium is only 0.15% of the acid, so taking the concentrations as made was fair.' },
        { say: 'So the hydronium concentration is one point one times ten to the minus four molar, a p H of about three point nine five. That matches the book.', show: 'ans', caption: 'So [H₃O⁺] = 1.1 × 10⁻⁴ M, a pH of about 3.95. That matches the book.' },
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
            ['$1.8 \\times 10^{-5}$ M', 'Put the ratio **upside down**: base over acid'],
            ['$1.8 \\times 10^{-3}$ M', '**Ignored** the nitrite: $\\sqrt{K_a c}$'],
            ['$4.5 \\times 10^{-5}$ M', 'Assumed **equal** acid and base'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'One point eight times ten to the minus five puts the conjugate base on top. It is the acid that makes hydronium, so the acid goes on top.', focus: 'traps.0', caption: '1.8 × 10⁻⁵ puts the conjugate base on top. It is the acid that makes hydronium, so the acid goes on top.' },
        { say: 'One point eight times ten to the minus three treats it as the weak acid alone. The nitrite already there holds the ionisation back, so there is far less hydronium.', focus: 'traps.1', caption: '1.8 × 10⁻³ treats it as the weak acid alone. The nitrite already there holds the ionisation back, so there is far less hydronium.' },
        { say: 'And four point five times ten to the minus five is right only when the acid and conjugate base are equal. Here they are not.', focus: 'traps.2', caption: 'And 4.5 × 10⁻⁵ is right only when the acid and conjugate base are equal. Here they are not.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A buffer holds $0.20$ M $\\ce{CH3COOH}$ and $0.10$ M $\\ce{CH3COONa}$, with $K_a = 1.8 \\times 10^{-5}$. What is $[\\ce{H3O+}]$?',
          choices: ['$9.0 \\times 10^{-6}$ M', '$1.8 \\times 10^{-5}$ M', '$1.9 \\times 10^{-3}$ M', '$3.6 \\times 10^{-5}$ M'],
          answer: 3,
          working: '$[\\ce{H3O+}] = 1.8 \\times 10^{-5} \\times \\dfrac{0.20}{0.10} = 3.6 \\times 10^{-5}$ M.',
        },
      ],
      lines: [
        { say: 'Your turn. A buffer holds zero point two zero molar acetic acid and zero point one zero molar sodium acetate, with K a equal to one point eight times ten to the minus five. What is the hydronium concentration? Pause the video and try it.', caption: 'Your turn. A buffer holds 0.20 M CH₃COOH and 0.10 M CH₃COONa, with Ka = 1.8 × 10⁻⁵. What is [H₃O⁺]? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'K a times acid over base: one point eight times ten to the minus five, times zero point two zero over zero point one zero, is three point six times ten to the minus five molar: choice D.', caption: 'Ka × [acid] ÷ [base] = 1.8 × 10⁻⁵ × 0.20 ÷ 0.10 = 3.6 × 10⁻⁵ M: choice D.', show: 'q2.answer' },
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
          items: ['Weak acid + its **conjugate base** = a buffer', '$[\\ce{H3O+}] = K_a \\times \\dfrac{[\\text{acid}]}{[\\text{base}]}$', 'Equal amounts give $[\\ce{H3O+}] = K_a$'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A weak acid together with its conjugate base makes a buffer.', show: 'sum.0' },
        { say: 'Its hydronium concentration is K a times the acid concentration over the conjugate base concentration.', show: 'sum.1', caption: 'Its [H₃O⁺] is Ka times [acid] over [conjugate base].' },
        { say: 'And when the two are equal, the hydronium concentration equals K a. For more on buffers and titration curves, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.2', caption: 'And when the two are equal, [H₃O⁺] = Ka. For more on buffers and titration curves, watch this lesson\'s explainer videos on Gradileo.' },
      ],
    },
  ],
};

export default video;
