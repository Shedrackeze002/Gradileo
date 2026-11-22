import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import addition from '@/content/chem30/videos/c30-3-5.ts';
import markovnikov from '@/content/chem30/videos/c30-3-5-b.ts';

// Exam question for Chemistry 30 lesson 3.5 (addition, substitution and elimination): the mass of
// 2-bromopropane made from 25.5 g of propene at 100% yield. The question is OpenStax Chemistry 2e's
// own, word for word (end-of-chapter exercise 27, section 20.1, CC BY-NC-SA 4.0). The answer, which
// matches the book's: C3H6 + HBr -> CH3CHBrCH3 (an addition, 1 : 1);
// n = 25.5 / 42.08 = 0.6060 mol, m = 0.6060 x 122.99 = 74.5 g.
//
// The pictures are atoms drawn as balls (src/video/molecules.ts): the lesson's ethene and bromine
// joining into one molecule, and propene and hydrogen bromide adding to give 2-bromopropane.

const QUESTION = 'What mass of 2-bromopropane could be prepared from 25.5 g of propene? Assume a 100% yield of product.';

const video: Explainer = {
  id: 'xq-c30-3-5',
  lessonId: '',
  exam: {
    lesson: 'c30-3-5',
    source: 'OpenStax, Chemistry 2e, end-of-chapter exercise 27, section 20.1, Hydrocarbons',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/chemistry-2e/pages/20-exercises',
    question: QUESTION,
  },
  title: 'Exam Question: 2-Bromopropane from Propene. Addition, Substitution and Elimination',
  thumbnailTitle: '2-Bromopropane from Propene',
  thumbnail: 'hb',
  summary:
    'A real test question, solved one small step at a time: what mass of 2-bromopropane can be made from 25.5 g of propene? We recognise an addition of hydrogen bromide across the double bond, one propene to one product, then change grams of propene to moles and moles of product to grams: 74.5 g.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: '2-Bromopropane from Propene', subtitle: 'An addition reaction, and the mass it makes' }],
      lines: [
        { say: 'In this video, we solve a real test question about organic reactions. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Chemistry textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: 'What mass of 2-bromopropane could be prepared from $25.5\\ \\text{g}$ of propene? Assume a $100\\%$ yield of product.', answer: '74.5 g' }],
      lines: [
        { say: 'Here is the question, exactly as it was printed. What mass of two bromopropane could be prepared from twenty five point five grams of propene? Assume a one hundred percent yield of product.', show: 'q', caption: 'Here is the question, exactly as it was printed. What mass of 2-bromopropane could be prepared from 25.5 g of propene? Assume a 100% yield of product.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'First the **reaction**: what turns propene into 2-bromopropane? Then the **stoichiometry**' }],
      lines: [
        { say: 'No equation is given, so first we work out the reaction: what has to be added to propene to make two bromopropane? Then it is a grams to grams calculation.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(addition, 'ba'), { kind: 'math', id: 'k', size: 'md', lines: ['\\text{addition: two molecules} \\to \\text{one}'] }],
      lines: [
        { say: 'Here is what we need. Ethene and a bromine molecule. Watch the bonds as the molecules meet.', show: 'ba', play: 'ba.go' },
        { say: 'One of the two bonds between the carbons breaks, and so does the bond between the two bromine atoms. Two new bonds form, one from each carbon to a bromine atom.' },
        { say: 'This is an addition reaction: an alkene and a small molecule join into one product, one molecule of each.', show: 'k.0' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write the **addition**: propene + **HBr**', 'Change grams of propene to **moles**', 'Use the **1 : 1** ratio, then the product\'s **molar mass**'] }],
      lines: [
        { say: 'Here is the plan. First, write the addition reaction that makes two bromopropane from propene.', show: 'plan.0' },
        { say: 'Then change the grams of propene to moles.', show: 'plan.1' },
        { say: 'Then use the one to one ratio, and the molar mass of the product to get grams.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The reaction',
      layout: 'center',
      main: [pick(markovnikov, 'hb'), { kind: 'math', id: 'r', size: 'md', lines: ['\\ce{CH2=CHCH3 + HBr -> CH3CHBrCH3}'] }],
      lines: [
        { say: 'Step one. Two bromopropane is propane with a bromine on the middle carbon, so we add a hydrogen and a bromine across the double bond: hydrogen bromide. Here is propene and hydrogen bromide. Watch which carbon the new hydrogen atom joins.', show: 'hb', play: 'hb.go' },
        { say: 'The hydrogen joins the end carbon, which already had more hydrogens, and the bromine joins the middle carbon. One propene and one hydrogen bromide give one two bromopropane.', show: 'r.0', focus: 'r.0', caption: 'The hydrogen joins the end carbon, which already had more hydrogens, and the bromine joins the middle carbon. CH₂=CHCH₃ + HBr → CH₃CHBrCH₃, one to one.' },
      ],
    },
    {
      chapter: 'Step 2: Moles of propene',
      layout: 'center',
      main: [{ kind: 'math', id: 'n', size: 'lg', lines: ['M(\\ce{C3H6}) = 3(12.01) + 6(1.008) = 42.08\\ \\text{g/mol}', 'n = \\dfrac{25.5}{42.08} = \\good{0.6060\\ \\text{mol}}'] }],
      lines: [
        { say: 'Step two. Propene is C three H six: three carbons at twelve point zero one and six hydrogens at one point zero zero eight make forty two point zero eight grams per mole.', show: 'n.0', caption: 'Step two. Propene is C₃H₆: 3(12.01) + 6(1.008) = 42.08 g/mol.' },
        { say: 'Twenty five point five grams divided by forty two point zero eight is zero point six zero six zero moles.', show: 'n.1', focus: 'n.1', caption: '25.5 g ÷ 42.08 g/mol = 0.6060 mol.' },
      ],
    },
    {
      chapter: 'Step 3: Grams of product',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['M(\\ce{C3H7Br}) = 3(12.01) + 7(1.008) + 79.90 = 122.99\\ \\text{g/mol}', 'm = 0.6060 \\times 122.99 = \\good{74.5\\ \\text{g}}'] }],
      lines: [
        { say: 'Step three. One to one means zero point six zero six zero moles of two bromopropane. Its formula is C three H seven B r, which is one hundred and twenty two point nine nine grams per mole.', show: 'm.0', caption: 'Step three. One to one means 0.6060 mol of 2-bromopropane. It is C₃H₇Br: 3(12.01) + 7(1.008) + 79.90 = 122.99 g/mol.' },
        { say: 'Zero point six zero six zero times one hundred and twenty two point nine nine is seventy four point five grams.', show: 'm.1', focus: 'm.1', caption: '0.6060 mol × 122.99 g/mol = 74.5 g.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'math', id: 'x', size: 'md', lines: ['25.5 \\times \\dfrac{122.99}{42.08} \\approx 25.5 \\times 2.92 \\approx 74.5'] },
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '**74.5 g** of 2-bromopropane.' },
      ],
      lines: [
        { say: 'Does it make sense? Each molecule of product is about two point nine times as heavy as a propene molecule, because it has gained a bromine atom. So the mass should grow by that factor: twenty five point five times two point nine two is about seventy four point five.', show: 'x.0', caption: 'Does it make sense? Each product molecule is about 2.92 times as heavy as a propene molecule, because it gained a bromine atom. So 25.5 × 2.92 ≈ 74.5.' },
        { say: 'So seventy four point five grams of two bromopropane could be made. That matches the book.', show: 'ans', caption: 'So 74.5 g of 2-bromopropane could be made. That matches the book.' },
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
            ['$25.5\\ \\text{g}$', 'Forgot the product **gains** the mass of HBr'],
            ['$8.72\\ \\text{g}$', 'Used the molar masses **upside down**'],
            ['$0.606$', 'Stopped at **moles**; the question asks for a **mass**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Twenty five point five grams assumes the mass stays the same. In an addition, the hydrogen bromide joins the molecule, so the product is heavier.', focus: 'traps.0', caption: '25.5 g assumes the mass stays the same. In an addition, the HBr joins the molecule, so the product is heavier.' },
        { say: 'Eight point seven two grams divides by the product\'s molar mass instead of multiplying, which makes the heavier product weigh less.', focus: 'traps.1', caption: '8.72 g divides by the product\'s molar mass instead of multiplying, which makes the heavier product weigh less.' },
        { say: 'And zero point six zero six is the moles. The last step turns them into grams.', focus: 'traps.2', caption: 'And 0.606 is the moles. The last step turns them into grams.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'What mass of 1,2-dibromoethane, $\\ce{C2H4Br2}$ ($187.86\\ \\text{g/mol}$), forms when $7.00\\ \\text{g}$ of ethene ($28.06\\ \\text{g/mol}$) reacts completely with bromine?',
          choices: ['$46.9\\ \\text{g}$', '$7.00\\ \\text{g}$', '$1.05\\ \\text{g}$', '$23.4\\ \\text{g}$'],
          answer: 0,
          working: '$7.00 \\div 28.06 = 0.2495$ mol, and $0.2495 \\times 187.86 = 46.9\\ \\text{g}$.',
        },
      ],
      lines: [
        { say: 'Your turn. What mass of one two dibromoethane, one hundred and eighty seven point eight six grams per mole, forms when seven point zero zero grams of ethene, twenty eight point zero six grams per mole, reacts completely with bromine? Pause the video and try it.', show: 'q2', wait: 6, caption: 'Your turn. What mass of 1,2-dibromoethane, C₂H₄Br₂ (187.86 g/mol), forms when 7.00 g of ethene (28.06 g/mol) reacts completely with bromine? Pause the video and try it.' },
        { say: 'Seven point zero zero over twenty eight point zero six is zero point two four nine five moles of ethene, and the addition is one to one. Times one hundred and eighty seven point eight six is forty six point nine grams: choice A.', show: 'q2.answer', caption: '7.00 ÷ 28.06 = 0.2495 mol of ethene, and the addition is 1 : 1. × 187.86 = 46.9 g: choice A.' },
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
          items: ['Work out the **reaction** first: what was **added**?', 'An addition is **one alkene to one product**', 'Grams → moles → moles → **grams**'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. When no equation is given, work out the reaction first by comparing the starting material and the product.', show: 'sum.0' },
        { say: 'An addition joins two molecules into one, so one alkene gives one product.', show: 'sum.1' },
        { say: 'Then it is the usual path: grams to moles, the mole ratio, and moles back to grams. For more on addition, substitution and elimination, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
