import type { Explainer } from '@/video/script.ts';
import { n2o4 } from '@/content/chem30/videos/lib/c30-particles.ts';

// Exam question for Chemistry 30 lesson 4.2 (the equilibrium constant): Kc for the decomposition of
// PCl5 when 0.72 mol in a 1.00 L vessel leaves 0.40 mol each of PCl3 and Cl2 at equilibrium. The
// question is OpenStax Chemistry 2e's own, word for word (end-of-chapter exercise 54, section 13.4,
// CC BY-NC-SA 4.0); the book prints answers to odd exercises only, so this one is worked here.
// PCl5 <=> PCl3 + Cl2; ICE: 0.72 - 0.40 = 0.32 mol/L of PCl5; Kc = (0.40)(0.40) / 0.32 = 0.50.
//
// The picture is the lesson's tube of N2O4 molecules splitting into NO2 (src/video/chem.ts): the
// initial, change and equilibrium rows of an ICE table, happening.

const QUESTION = 'A 0.72-mol sample of PCl5 is put into a 1.00-L vessel and heated. At equilibrium, the vessel contains 0.40 mol of PCl3(g) and 0.40 mol of Cl2(g). Calculate the value of the equilibrium constant for the decomposition of PCl5 to PCl3 and Cl2 at this temperature.';

const HEAD = ['', '$[\\ce{PCl5}]$', '$[\\ce{PCl3}]$', '$[\\ce{Cl2}]$'];

const video: Explainer = {
  id: 'xq-c30-4-2',
  lessonId: '',
  exam: {
    lesson: 'c30-4-2',
    source: 'OpenStax, Chemistry 2e, end-of-chapter exercise 54, section 13.4, Equilibrium Calculations',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/chemistry-2e/pages/13-exercises',
    question: QUESTION,
  },
  title: 'Exam Question: K for the Decomposition of PCl5. The Equilibrium Constant',
  thumbnailTitle: 'K for PCl5 with an ICE Table',
  thumbnail: 'eq',
  summary:
    'A real test question, solved one small step at a time: 0.72 mol of PCl5 in a 1.00 L vessel leaves 0.40 mol each of PCl3 and Cl2 at equilibrium. What is K? We write the equilibrium law, fill in an ICE table to find the PCl5 left, 0.32 mol/L, and substitute: Kc = 0.50.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'K for PCl₅ with an ICE Table', subtitle: 'Initial, change, equilibrium' }],
      lines: [
        { say: 'In this video, we solve a real test question about the equilibrium constant. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Chemistry textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: 'A $0.72$-mol sample of $\\ce{PCl5}$ is put into a $1.00$-L vessel and heated. At equilibrium, the vessel contains $0.40$ mol of $\\ce{PCl3(g)}$ and $0.40$ mol of $\\ce{Cl2(g)}$. Calculate the value of the equilibrium constant for the decomposition of $\\ce{PCl5}$ to $\\ce{PCl3}$ and $\\ce{Cl2}$ at this temperature.', answer: 'Kc = 0.50' }],
      lines: [
        { say: 'Here is the question, exactly as it was printed. A zero point seven two mole sample of P C l five is put into a one point zero zero litre vessel and heated. At equilibrium, the vessel contains zero point four zero moles of P C l three gas and zero point four zero moles of chlorine gas. Calculate the value of the equilibrium constant for the decomposition of P C l five to P C l three and C l two at this temperature.', show: 'q', caption: 'Here is the question, exactly as it was printed. A 0.72-mol sample of PCl₅ is put into a 1.00-L vessel and heated. At equilibrium, the vessel contains 0.40 mol of PCl₃(g) and 0.40 mol of Cl₂(g). Calculate the value of the equilibrium constant for the decomposition of PCl₅ to PCl₃ and Cl₂ at this temperature.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'We know the **start** and two **equilibrium** amounts. Find the **missing** one, then $K_c$' }],
      lines: [
        { say: 'We are told how much phosphorus pentachloride we start with, and how much of each product there is at equilibrium. The one thing missing is how much phosphorus pentachloride is left. Once we have it, we can find K C.', show: 'plain', caption: 'We are told how much PCl₅ we start with, and how much of each product there is at equilibrium. The one thing missing is how much PCl₅ is left. Once we have it, we can find Kc.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [n2o4('eq', { seed: 6 }), { kind: 'math', id: 'k', size: 'md', lines: ['\\text{initial} \\to \\text{change} \\to \\text{equilibrium}'] }],
      lines: [
        { say: 'Here is what we need. A tube of dye-nitrogen tetroxide with nothing else at the start: that is the initial row of an ICE table.', caption: 'Here is what we need. A tube of dinitrogen tetroxide with nothing else at the start: that is the initial row of an ICE table.', show: ['eq', 'eq.labels', 'eq.key', 'eq.tally'], play: 'eq.go' },
        { say: 'Each pair that splits makes two nitrogen dioxide molecules: that is the change row, in the ratio of the equation. Where the count settles is the equilibrium row, and those are the values that go into K.', focus: 'eq.tally', show: 'k.0' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write the **equation** and the **equilibrium law**', 'Fill in an **ICE table** to find the $\\ce{PCl5}$ left', 'Substitute the **equilibrium** concentrations'] }],
      lines: [
        { say: 'Here is the plan. First, write the equation and the equilibrium law for it.', show: 'plan.0' },
        { say: 'Then use an ICE table to find how much phosphorus pentachloride is left.', show: 'plan.1', caption: 'Then use an ICE table to find how much PCl₅ is left.' },
        { say: 'Then substitute the equilibrium concentrations into the law.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The equilibrium law',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{PCl5(g) <=> PCl3(g) + Cl2(g)}', 'K_c = \\dfrac{[\\ce{PCl3}][\\ce{Cl2}]}{[\\ce{PCl5}]}'] }],
      lines: [
        { say: 'Step one. Phosphorus pentachloride decomposes into phosphorus trichloride and chlorine, one of each.', show: 'm.0', caption: 'Step one. PCl₅ decomposes into PCl₃ and Cl₂, one of each.' },
        { say: 'So K C is the product concentrations multiplied, over the reactant concentration. Every coefficient is one, so there are no powers.', show: 'm.1', focus: 'm.1', caption: 'So Kc is [PCl₃][Cl₂] over [PCl₅]. Every coefficient is one, so there are no powers.' },
      ],
    },
    {
      chapter: 'Step 2: The ICE table',
      layout: 'center',
      main: [
        { kind: 'math', id: 'v', size: 'md', lines: ['\\text{volume} = 1.00\\ \\text{L, so mol} = \\text{mol/L}'] },
        {
          kind: 'table',
          id: 'tb',
          head: HEAD,
          rows: [
            ['Initial', '$0.72$', '$0$', '$0$'],
            ['Change', '$-0.40$', '$+0.40$', '$+0.40$'],
            ['Equilibrium', '$\\good{0.32}$', '$0.40$', '$0.40$'],
          ],
        },
      ],
      lines: [
        { say: 'Step two. The vessel holds one litre, so each number of moles is also the concentration in moles per litre.', show: 'v.0' },
        { say: 'At the start there is zero point seven two of phosphorus pentachloride, and none of either product.', show: 'tb.0', focus: 'tb.0', caption: 'At the start there is 0.72 mol/L of PCl₅, and none of either product.' },
        { say: 'Each product rose by zero point four zero. The ratio is one to one to one, so phosphorus pentachloride fell by zero point four zero too.', show: 'tb.1', focus: 'tb.1', caption: 'Each product rose by 0.40. The ratio is 1 : 1 : 1, so PCl₅ fell by 0.40 too.' },
        { say: 'Zero point seven two minus zero point four zero leaves zero point three two moles per litre of phosphorus pentachloride.', show: 'tb.2', focus: 'tb.2', caption: '0.72 − 0.40 leaves 0.32 mol/L of PCl₅.' },
      ],
    },
    {
      chapter: 'Step 3: Substitute',
      layout: 'center',
      main: [{ kind: 'math', id: 's', size: 'lg', lines: ['K_c = \\dfrac{(0.40)(0.40)}{0.32} = \\dfrac{0.16}{0.32} = \\good{0.50}'] }],
      lines: [
        { say: 'Step three. Zero point four zero times zero point four zero is zero point one six. Divided by zero point three two, K C is zero point five zero.', show: 's.0', focus: 's.0', caption: 'Step three. 0.40 × 0.40 = 0.16. Divided by 0.32, Kc = 0.50.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'math', id: 'x', size: 'md', lines: ['0.32 + 0.40 = 0.72\\ \\checkmark', '0.32 \\times 0.50 = 0.16 = (0.40)(0.40)\\ \\checkmark'] },
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '$K_c = 0.50$' },
      ],
      lines: [
        { say: 'Does it check? The phosphorus pentachloride left plus the amount used, zero point three two plus zero point four zero, gives back the zero point seven two we started with.', show: 'x.0', caption: 'Does it check? The PCl₅ left plus the amount used, 0.32 + 0.40, gives back the 0.72 we started with.' },
        { say: 'And K times the reactant gives the product of the products: zero point three two times zero point five zero is zero point one six. So K C is zero point five zero.', show: ['x.1', 'ans'], caption: 'And K times [PCl₅] gives [PCl₃][Cl₂]: 0.32 × 0.50 = 0.16. So Kc = 0.50.' },
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
            ['$0.22$', 'Used the **initial** $0.72$, not the $0.32$ left'],
            ['$2.0$', 'Put the reactant on **top**'],
            ['$0.16$', 'Forgot to **divide** by $[\\ce{PCl5}]$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Zero point two two divides by zero point seven two, the starting amount. K only ever uses equilibrium concentrations, and some of the phosphorus pentachloride has been used up.', focus: 'traps.0', caption: '0.22 divides by 0.72, the starting amount. K only ever uses equilibrium concentrations, and some of the PCl₅ has been used up.' },
        { say: 'Two point zero puts the reactant on top. Products always go on top.', focus: 'traps.1', caption: '2.0 puts the reactant on top. Products always go on top.' },
        { say: 'And zero point one six is only the top of the fraction.', focus: 'traps.2', caption: 'And 0.16 is only the top of the fraction.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: '$0.50\\ \\text{mol}$ of $\\ce{N2O4}$ is sealed in a $1.00\\ \\text{L}$ flask: $\\ce{N2O4(g) <=> 2NO2(g)}$. At equilibrium the flask holds $0.20\\ \\text{mol}$ of $\\ce{NO2}$. What is $K_c$?',
          choices: ['$0.50$', '$0.10$', '$0.080$', '$10$'],
          answer: 1,
          working: '$\\ce{NO2}$ rose by $0.20$, so $\\ce{N2O4}$ fell by $0.10$ to $0.40$. $K_c = \\dfrac{(0.20)^2}{0.40} = 0.10$.',
        },
      ],
      lines: [
        { say: 'Your turn. Zero point five zero moles of dye-nitrogen tetroxide is sealed in a one litre flask. At equilibrium the flask holds zero point two zero moles of nitrogen dioxide. What is K C? Pause the video and try it.', caption: 'Your turn. 0.50 mol of N₂O₄ is sealed in a 1.00 L flask: N₂O₄ ⇌ 2NO₂. At equilibrium the flask holds 0.20 mol of NO₂. What is Kc? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Nitrogen dioxide rose by zero point two zero, so dye-nitrogen tetroxide fell by half that, zero point one zero, to zero point four zero. Zero point two zero squared, over zero point four zero, is zero point one zero: choice B.', caption: 'NO₂ rose by 0.20, so N₂O₄ fell by half that, 0.10, to 0.40. 0.20² ÷ 0.40 = 0.10: choice B.', show: 'q2.answer' },
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
          items: ['$K_c$ = **products** over **reactants**, each to its coefficient', 'An **ICE table** finds the amounts you are not told', 'Only **equilibrium** concentrations go into $K$'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. K C is the product concentrations over the reactant concentrations, each raised to its coefficient.', show: 'sum.0', caption: 'Here is what to remember. Kc is the product concentrations over the reactant concentrations, each raised to its coefficient.' },
        { say: 'An ICE table, initial, change and equilibrium, finds the amounts the question does not give you.', show: 'sum.1' },
        { say: 'And only equilibrium concentrations go into K. For more on the equilibrium constant, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
