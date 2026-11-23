import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import esters from '@/content/chem30/videos/c30-3-6.ts';

// Exam question for Chemistry 30 lesson 3.6 (esterification and polymerisation): the percent yield
// when 10.0 g of acetic (ethanoic) acid gives 13.0 g of ethyl acetate (ethyl ethanoate). The
// question is OpenStax Chemistry 2e's own, word for word (end-of-chapter exercise 52, section 20.3,
// CC BY-NC-SA 4.0); the book prints answers to odd exercises only, so this one is worked here.
// CH3COOH + C2H5OH -> CH3COOC2H5 + H2O (1 : 1, the alcohol in excess);
// n = 10.0 / 60.05 = 0.1665 mol, theoretical = 0.1665 x 88.10 = 14.67 g, 13.0 / 14.67 = 88.6%.
//
// The picture is the lesson's esterification drawn atom by atom (src/video/molecules.ts): the OH of
// the acid and the H of the alcohol leave as water, and the two molecules join through an oxygen.

const QUESTION = 'Yields in organic reactions are sometimes low. What is the percent yield of a process that produces 13.0 g of ethyl acetate from 10.0 g of CH3CO2H?';

const video: Explainer = {
  id: 'xq-c30-3-6',
  lessonId: '',
  exam: {
    lesson: 'c30-3-6',
    source: 'OpenStax, Chemistry 2e, end-of-chapter exercise 52, section 20.3, Aldehydes, Ketones, Carboxylic Acids, and Esters',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/chemistry-2e/pages/20-exercises',
    question: QUESTION,
  },
  title: 'Exam Question: Percent Yield of Ethyl Acetate. Esterification and Polymerisation',
  thumbnailTitle: 'Percent Yield of an Ester',
  thumbnail: 'es',
  summary:
    'A real test question, solved one small step at a time: what is the percent yield when 10.0 g of acetic acid gives 13.0 g of ethyl acetate? We write the esterification, one acid to one ester, find the most ester the acid could make, 14.67 g, and compare: 88.6%.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Percent Yield of an Ester', subtitle: 'How much was made, out of how much could be' }],
      lines: [
        { say: 'In this video, we solve a real test question about making an ester. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Chemistry textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: 'Yields in organic reactions are sometimes low. What is the percent yield of a process that produces $13.0\\ \\text{g}$ of ethyl acetate from $10.0\\ \\text{g}$ of $\\ce{CH3CO2H}$?', answer: '88.6%' }],
      lines: [
        { say: 'Here is the question, exactly as it was printed. Yields in organic reactions are sometimes low. What is the percent yield of a process that produces thirteen point zero grams of ethyl acetate from ten point zero grams of C H three C O two H?', show: 'q', caption: 'Here is the question, exactly as it was printed. Yields in organic reactions are sometimes low. What is the percent yield of a process that produces 13.0 g of ethyl acetate from 10.0 g of CH₃CO₂H?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Out of the **most** ester $10.0\\ \\text{g}$ of acid could make, what **percent** did we get?' }],
      lines: [
        { say: 'Thirteen grams is what was actually made. The question wants that as a percent of the most ester ten grams of acid could ever make, which we have to work out.', show: 'plain' },
        { say: 'C H three C O two H is acetic acid, which our lessons call ethanoic acid, and ethyl acetate is ethyl ethanoate. The ethyl part comes from ethanol, which we take to be in excess.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(esters, 'es'), { kind: 'math', id: 'k', size: 'md', lines: ['\\text{acid} + \\text{alcohol} \\to \\text{ester} + \\text{water}'] }],
      lines: [
        { say: 'Here is what we need. Ethanoic acid on the left, and ethanol on the right. The atoms that will leave are shaded. Watch as they meet.', show: 'es', play: 'es.go' },
        { say: 'The O H of the acid and the H of the alcohol leave together as water, and the acid\'s carbon bonds to the alcohol\'s oxygen. That is ethyl ethanoate.' },
        { say: 'This is esterification: an acid and an alcohol give an ester and water, one molecule of each.', show: 'k.0' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write the **esterification**: one acid to one ester', 'Find the **theoretical yield** from $10.0\\ \\text{g}$ of acid', '**Percent yield** = actual ÷ theoretical × 100'] }],
      lines: [
        { say: 'Here is the plan. First, write the reaction, to see how many esters one acid molecule makes.', show: 'plan.0' },
        { say: 'Then find the theoretical yield: the mass of ester that ten grams of acid would make if every molecule reacted.', show: 'plan.1' },
        { say: 'Then the percent yield is the actual yield divided by the theoretical yield, times one hundred.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The reaction',
      layout: 'center',
      main: [{ kind: 'math', id: 'r', size: 'md', lines: ['\\ce{CH3COOH + C2H5OH -> CH3COOC2H5 + H2O}', '1\\ \\text{mol acid} \\to 1\\ \\text{mol ester}'] }],
      lines: [
        { say: 'Step one. Ethanoic acid and ethanol give ethyl ethanoate and water.', show: 'r.0', caption: 'Step one. CH₃COOH + C₂H₅OH → CH₃COOC₂H₅ + H₂O.' },
        { say: 'Every coefficient is one, so one mole of acid makes at most one mole of ester.', show: 'r.1', focus: 'r.1' },
      ],
    },
    {
      chapter: 'Step 2: The theoretical yield',
      layout: 'center',
      main: [{ kind: 'math', id: 't', size: 'md', lines: ['n = \\dfrac{10.0}{60.05} = 0.1665\\ \\text{mol}', 'M(\\ce{C4H8O2}) = 4(12.01) + 8(1.008) + 2(16.00) = 88.10\\ \\text{g/mol}', 'm = 0.1665 \\times 88.10 = \\good{14.67\\ \\text{g}}'] }],
      lines: [
        { say: 'Step two. Ethanoic acid is C two H four O two, sixty point zero five grams per mole, so ten point zero grams is zero point one six six five moles.', show: 't.0', caption: 'Step two. Ethanoic acid, C₂H₄O₂, is 60.05 g/mol, so 10.0 g ÷ 60.05 g/mol = 0.1665 mol.' },
        { say: 'So at most zero point one six six five moles of ester. Ethyl ethanoate is C four H eight O two: four carbons, eight hydrogens and two oxygens make eighty eight point one zero grams per mole.', show: 't.1', caption: 'So at most 0.1665 mol of ester. Ethyl ethanoate is C₄H₈O₂: 4(12.01) + 8(1.008) + 2(16.00) = 88.10 g/mol.' },
        { say: 'Zero point one six six five times eighty eight point one zero is fourteen point six seven grams. That is the theoretical yield.', show: 't.2', focus: 't.2', caption: '0.1665 mol × 88.10 g/mol = 14.67 g. That is the theoretical yield.' },
      ],
    },
    {
      chapter: 'Step 3: The percent yield',
      layout: 'center',
      main: [{ kind: 'math', id: 'p', size: 'lg', lines: ['\\%\\ \\text{yield} = \\dfrac{13.0}{14.67} \\times 100 = \\good{88.6\\%}'] }],
      lines: [
        { say: 'Step three. Thirteen point zero grams were actually made, out of fourteen point six seven grams possible. Thirteen point zero divided by fourteen point six seven, times one hundred, is eighty eight point six percent.', show: 'p.0', focus: 'p.0', caption: 'Step three. 13.0 g were made out of 14.67 g possible: 13.0 ÷ 14.67 × 100 = 88.6%.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'math', id: 'x', size: 'md', lines: ['13.0 < 14.67 \\quad\\Rightarrow\\quad \\text{yield} < 100\\%'] },
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: 'A percent yield of **88.6%**.' },
      ],
      lines: [
        { say: 'Does it make sense? The actual yield is a little less than the theoretical yield, so the percent should be a little under one hundred. Eighty eight point six percent fits.', show: 'x.0', caption: 'Does it make sense? 13.0 g is a little less than 14.67 g, so the percent should be a little under 100%. 88.6% fits.' },
        { say: 'So the percent yield is eighty eight point six percent.', show: 'ans' },
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
            ['$130\\%$', 'Divided the ester\'s mass by the **acid\'s** mass'],
            ['$113\\%$', 'Divided theoretical by actual, **upside down**'],
            ['$14.7\\ \\text{g}$', 'Stopped at the **theoretical yield**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'One hundred and thirty percent divides thirteen grams of ester by ten grams of acid. Grams of different substances cannot be compared like that, because the molecules have different masses.', focus: 'traps.0', caption: '130% divides 13.0 g of ester by 10.0 g of acid. Grams of different substances cannot be compared like that, because the molecules have different masses.' },
        { say: 'One hundred and thirteen percent puts the theoretical yield on top. A yield over one hundred percent is a sign something is upside down.', focus: 'traps.1', caption: '113% puts the theoretical yield on top. A yield over 100% is a sign something is upside down.' },
        { say: 'And fourteen point seven grams is the theoretical yield. The last step compares it with what was actually made.', focus: 'traps.2', caption: 'And 14.7 g is the theoretical yield. The last step compares it with what was actually made.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Ethanoic acid ($60.05\\ \\text{g/mol}$) reacts with excess methanol to make methyl ethanoate ($74.08\\ \\text{g/mol}$). From $6.00\\ \\text{g}$ of acid, $5.92\\ \\text{g}$ of ester is collected. What is the percent yield?',
          choices: ['$98.7\\%$', '$80.0\\%$', '$125\\%$', '$7.40\\ \\text{g}$'],
          answer: 1,
          working: '$6.00 \\div 60.05 = 0.09992$ mol, $0.09992 \\times 74.08 = 7.402\\ \\text{g}$, and $5.92 \\div 7.402 = 80.0\\%$.',
        },
      ],
      lines: [
        { say: 'Your turn. Ethanoic acid, sixty point zero five grams per mole, reacts with excess methanol to make methyl ethanoate, seventy four point zero eight grams per mole. From six point zero zero grams of acid, five point nine two grams of ester is collected. What is the percent yield? Pause the video and try it.', show: 'q2', wait: 6, caption: 'Your turn. Ethanoic acid (60.05 g/mol) reacts with excess methanol to make methyl ethanoate (74.08 g/mol). From 6.00 g of acid, 5.92 g of ester is collected. What is the percent yield? Pause the video and try it.' },
        { say: 'Six point zero zero over sixty point zero five is zero point zero nine nine nine two moles, so at most seven point four zero two grams of ester. Five point nine two over seven point four zero two is eighty point zero percent: choice B.', show: 'q2.answer', caption: '6.00 ÷ 60.05 = 0.09992 mol, so at most 0.09992 × 74.08 = 7.402 g of ester. 5.92 ÷ 7.402 = 80.0%: choice B.' },
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
          items: ['Acid + alcohol → **ester + water**, one to one', '**Theoretical yield**: grams → moles → moles → grams', '**Percent yield** = actual ÷ theoretical × 100'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. In esterification, one acid and one alcohol give one ester and one water.', show: 'sum.0' },
        { say: 'The theoretical yield comes from the usual path: grams to moles, the mole ratio, and moles back to grams.', show: 'sum.1' },
        { say: 'Then the percent yield is what you actually made divided by that, times one hundred. For more on esters and polymers, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
