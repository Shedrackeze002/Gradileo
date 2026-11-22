import type { Explainer } from '@/video/script.ts';
import { ammoniaAndWater, waterAndWater } from '@/content/chem30/videos/lib/c30-protons.ts';

// Exam question for Chemistry 30 lesson 4.6 (Ka and Kb): Ka of the methylammonium ion, CH3NH3+,
// from Kb = 4.4e-4 for methylamine, CH3NH2. The question is OpenStax Chemistry 2e's own, word for
// word (end-of-chapter exercise 35, section 14.3, CC BY-NC-SA 4.0). The answer, which matches the
// book's: Ka x Kb = Kw for a conjugate pair, so Ka = 1.0e-14 / 4.4e-4 = 2.3e-11.
//
// The pictures are the lesson's protons changing hands (src/video/molecules.ts): one water molecule
// giving a proton to another (where Kw comes from), and water giving one to ammonia, the way
// methylamine takes one.

const QUESTION = 'What is the ionization constant at 25 °C for the weak acid CH3NH3+, the conjugate acid of the weak base CH3NH2, Kb = 4.4 × 10−4.';

const video: Explainer = {
  id: 'xq-c30-4-6',
  lessonId: '',
  exam: {
    lesson: 'c30-4-6',
    source: 'OpenStax, Chemistry 2e, end-of-chapter exercise 35, section 14.3, Relative Strengths of Acids and Bases',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/chemistry-2e/pages/14-exercises',
    question: QUESTION,
  },
  title: 'Exam Question: Ka of the Methylammonium Ion. Ka and Kb',
  thumbnailTitle: 'Ka from Kb',
  thumbnail: 'ww',
  summary:
    'A real test question, solved one small step at a time: what is Ka for the methylammonium ion, CH3NH3+, when Kb for methylamine is 4.4 × 10⁻⁴? The two form a conjugate pair, so Ka × Kb = Kw, and Ka = 1.0 × 10⁻¹⁴ ÷ 4.4 × 10⁻⁴ = 2.3 × 10⁻¹¹.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Ka from Kb', subtitle: 'A conjugate pair and water' }],
      lines: [
        { say: 'In this video, we solve a real test question about K a and K b. We will take it one small step at a time, so that every step makes sense.', show: 'title', caption: 'In this video, we solve a real test question about Ka and Kb. We will take it one small step at a time, so that every step makes sense.' },
        { say: 'The question comes from the free OpenStax Chemistry textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: 'What is the ionization constant at $25\\ ^\\circ\\text{C}$ for the weak acid $\\ce{CH3NH3+}$, the conjugate acid of the weak base $\\ce{CH3NH2}$, $K_b = 4.4 \\times 10^{-4}$.', answer: 'Ka = 2.3 × 10⁻¹¹' }],
      lines: [
        { say: 'Here is the question, exactly as it was printed. What is the ionization constant at twenty five degrees Celsius for the weak acid C H three N H three plus, the conjugate acid of the weak base C H three N H two, K b equals four point four times ten to the minus four.', show: 'q', caption: 'Here is the question, exactly as it was printed. What is the ionization constant at 25 °C for the weak acid CH₃NH₃⁺, the conjugate acid of the weak base CH₃NH₂, Kb = 4.4 × 10⁻⁴.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'We know $K_b$ for the **base**. Find $K_a$ for its **conjugate acid**' }],
      lines: [
        { say: 'We are given K b for methylamine, a weak base, and asked for K a of the methylammonium ion, which is the same particle with one more proton.', show: 'plain', caption: 'We are given Kb for methylamine, a weak base, and asked for Ka of the methylammonium ion, which is the same particle with one more proton.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [waterAndWater('ww'), { kind: 'math', id: 'k', size: 'md', lines: ['K_w = [\\ce{H3O+}][\\ce{OH-}] = 1.0 \\times 10^{-14}\\ \\text{at } 25\\ ^\\circ\\text{C}'] }],
      lines: [
        { say: 'Here is what we need. Two water molecules. Watch one give a proton to the other.', show: 'ww', play: 'ww.go' },
        { say: 'One becomes hydronium and the other hydroxide. In pure water this happens to a tiny fraction of the molecules, and the product of the two concentrations is K w, one point zero times ten to the minus fourteen at twenty five degrees.', show: 'k.0', caption: 'One becomes hydronium and the other hydroxide. In pure water this happens to a tiny fraction of the molecules, and [H₃O⁺][OH⁻] = Kw = 1.0 × 10⁻¹⁴ at 25 °C.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Check the two particles are a **conjugate pair**', 'Use $K_a \\times K_b = K_w$', '**Divide** to find $K_a$'] }],
      lines: [
        { say: 'Here is the plan. First, check that the base and the acid are a conjugate pair.', show: 'plan.0' },
        { say: 'Then use the link between them: K a times K b equals K w.', show: 'plan.1', caption: 'Then use the link between them: Ka × Kb = Kw.' },
        { say: 'Then divide to find K a.', show: 'plan.2', caption: 'Then divide to find Ka.' },
      ],
    },
    {
      chapter: 'Step 1: The conjugate pair',
      layout: 'center',
      main: [ammoniaAndWater('aw'), { kind: 'math', id: 'm', size: 'md', lines: ['\\ce{CH3NH2 + H2O <=> CH3NH3+ + OH-}\\quad K_b', '\\ce{CH3NH3+ + H2O <=> CH3NH2 + H3O+}\\quad K_a'] }],
      lines: [
        { say: 'Step one. Methylamine is a weak base, like ammonia: it takes a proton from water. Here is ammonia doing it.', show: 'aw', play: 'aw.go' },
        { say: 'Methylamine does the same, becoming methylammonium and leaving hydroxide. That reaction has K b.', show: 'm.0', caption: 'Methylamine does the same, becoming CH₃NH₃⁺ and leaving OH⁻. That reaction has Kb.' },
        { say: 'Methylammonium can give that proton back to water. That reaction has K a. The two differ by one proton, so they are a conjugate pair.', show: 'm.1', focus: 'm.1', caption: 'CH₃NH₃⁺ can give that proton back to water. That reaction has Ka. The two differ by one proton, so they are a conjugate pair.' },
      ],
    },
    {
      chapter: 'Step 2: The link through water',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['K_a \\times K_b = K_w', 'K_a = \\dfrac{K_w}{K_b}'] }],
      lines: [
        { say: 'Step two. Add those two reactions and the methylamine particles cancel, leaving water making hydronium and hydroxide. So K a times K b equals K w, for any conjugate pair.', show: 'm.0', focus: 'm.0', caption: 'Step two. Add those two reactions and the methylamine particles cancel, leaving water making hydronium and hydroxide. So Ka × Kb = Kw, for any conjugate pair.' },
        { say: 'Divide both sides by K b, and K a is K w over K b.', show: 'm.1', focus: 'm.1', caption: 'Divide both sides by Kb, and Ka = Kw ÷ Kb.' },
      ],
    },
    {
      chapter: 'Step 3: Divide',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['K_a = \\dfrac{1.0 \\times 10^{-14}}{4.4 \\times 10^{-4}} = \\good{2.3 \\times 10^{-11}}'] }],
      lines: [
        { say: 'Step three. One point zero times ten to the minus fourteen, divided by four point four times ten to the minus four, is two point three times ten to the minus eleven.', show: 'm.0', focus: 'm.0', caption: 'Step three. 1.0 × 10⁻¹⁴ ÷ 4.4 × 10⁻⁴ = 2.3 × 10⁻¹¹.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'math', id: 'x', size: 'md', lines: ['(2.3 \\times 10^{-11})(4.4 \\times 10^{-4}) \\approx 1.0 \\times 10^{-14}\\ \\checkmark'] },
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '$K_a = 2.3 \\times 10^{-11}$ for $\\ce{CH3NH3+}$.' },
      ],
      lines: [
        { say: 'Does it check? Multiply back: two point three times ten to the minus eleven, times four point four times ten to the minus four, gives about one point zero times ten to the minus fourteen. It also makes sense that a fairly strong weak base has a very weak conjugate acid.', show: 'x.0', caption: 'Does it check? Multiply back: (2.3 × 10⁻¹¹)(4.4 × 10⁻⁴) ≈ 1.0 × 10⁻¹⁴. It also makes sense that a fairly strong weak base has a very weak conjugate acid.' },
        { say: 'So K a for the methylammonium ion is two point three times ten to the minus eleven. That matches the book.', show: 'ans', caption: 'So Ka for CH₃NH₃⁺ is 2.3 × 10⁻¹¹. That matches the book.' },
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
            ['$4.4 \\times 10^{-4}$', 'Gave back $K_b$, the **base\'s** constant'],
            ['$4.4 \\times 10^{10}$', 'Divided $K_b$ by $K_w$, **upside down**'],
            ['$4.4 \\times 10^{-18}$', '**Multiplied** $K_w$ by $K_b$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Four point four times ten to the minus four is K b, the constant for the base. The question wants the acid\'s.', focus: 'traps.0', caption: '4.4 × 10⁻⁴ is Kb, the constant for the base. The question wants the acid\'s.' },
        { say: 'Four point four times ten to the ten divides K b by K w. A K a bigger than one would make methylammonium a strong acid.', focus: 'traps.1', caption: '4.4 × 10¹⁰ divides Kb by Kw. A Ka bigger than one would make methylammonium a strong acid.' },
        { say: 'And four point four times ten to the minus eighteen multiplies instead of dividing.', focus: 'traps.2', caption: 'And 4.4 × 10⁻¹⁸ multiplies instead of dividing.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Nitrous acid, $\\ce{HNO2}$, has $K_a = 4.5 \\times 10^{-4}$ at $25\\ ^\\circ\\text{C}$. What is $K_b$ for the nitrite ion, $\\ce{NO2-}$?',
          choices: ['$4.5 \\times 10^{-18}$', '$2.2 \\times 10^{-11}$', '$4.5 \\times 10^{10}$', '$4.5 \\times 10^{-4}$'],
          answer: 1,
          working: '$K_b = \\dfrac{K_w}{K_a} = \\dfrac{1.0 \\times 10^{-14}}{4.5 \\times 10^{-4}} = 2.2 \\times 10^{-11}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Nitrous acid has K a equal to four point five times ten to the minus four at twenty five degrees. What is K b for the nitrite ion? Pause the video and try it.', caption: 'Your turn. Nitrous acid, HNO₂, has Ka = 4.5 × 10⁻⁴ at 25 °C. What is Kb for the nitrite ion, NO₂⁻? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'They are a conjugate pair, so K b is K w over K a: one point zero times ten to the minus fourteen, over four point five times ten to the minus four, is two point two times ten to the minus eleven: choice B.', caption: 'They are a conjugate pair, so Kb = Kw ÷ Ka = 1.0 × 10⁻¹⁴ ÷ 4.5 × 10⁻⁴ = 2.2 × 10⁻¹¹: choice B.', show: 'q2.answer' },
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
          items: ['A **conjugate pair** differs by one proton', 'For the pair, $K_a \\times K_b = K_w$', 'The weaker the base, the **stronger** its conjugate acid'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A conjugate acid and base differ by exactly one proton.', show: 'sum.0' },
        { say: 'For the pair, K a times K b equals K w, so knowing one constant gives the other.', show: 'sum.1', caption: 'For the pair, Ka × Kb = Kw, so knowing one constant gives the other.' },
        { say: 'And because their product is fixed, the weaker the base, the stronger its conjugate acid. For more on K a and K b, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.2', caption: 'And because their product is fixed, the weaker the base, the stronger its conjugate acid. For more on Ka and Kb, watch this lesson\'s explainer videos on Gradileo.' },
      ],
    },
  ],
};

export default video;
