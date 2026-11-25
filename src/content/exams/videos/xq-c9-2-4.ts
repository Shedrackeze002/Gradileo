import type { Explainer } from '@/video/script.ts';
import { reaction } from '../../chem10/videos/lib/c10-equations.ts';

// Exam question for Chemistry 9 lesson 2.4 (relative formula mass): the relative formula masses
// of ammonia and calcium carbonate, and the percentage of nitrogen in ammonia. Written by Gradileo
// in the style of a Grade 9 science unit test.
//
// The picture is a nitrogen atom and three hydrogen atoms joining into ammonia, with their masses
// added up (src/content/chem10/videos/lib/c10-equations.ts).

const QUESTION = 'Use these relative atomic masses: H = 1, C = 12, N = 14, O = 16, Ca = 40. (a) Calculate the relative formula mass of ammonia, NH₃. (b) Calculate the relative formula mass of calcium carbonate, CaCO₃. (c) Ammonia is used to make fertilizers. Calculate the percentage by mass of nitrogen in ammonia, to one decimal place.';

const video: Explainer = {
  id: 'xq-c9-2-4',
  lessonId: '',
  exam: {
    lesson: 'c9-2-4',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 9 science unit test',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Ammonia, Calcium Carbonate and Percentage Nitrogen. Relative Formula Mass',
  thumbnailTitle: 'Adding Up the Atoms',
  thumbnail: 'ma',
  summary:
    'A test-style question, solved one small step at a time: what are the relative formula masses of ammonia and calcium carbonate, and what percentage of ammonia is nitrogen? Ammonia is 14 + 3 = 17, calcium carbonate is 40 + 12 + 48 = 100, and nitrogen makes up 14 out of 17, which is 82.4% of ammonia\'s mass.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Adding Up the Atoms', subtitle: 'Relative formula mass and percentage' }],
      lines: [
        { say: 'In this video, we solve a test-style question about relative formula mass. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of a grade nine science unit test, and everything you need is in the question.', caption: 'It is written in the style of a Grade 9 science unit test, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: '17; 100; 82.4%' }],
      lines: [
        { say: 'Here is the question. Use these relative atomic masses: hydrogen one, carbon twelve, nitrogen fourteen, oxygen sixteen, and calcium forty. Part a: calculate the relative formula mass of ammonia, N H three. Part b: calculate the relative formula mass of calcium carbonate, C a C O three. Part c: ammonia is used to make fertilizers. Calculate the percentage by mass of nitrogen in ammonia, to one decimal place.', caption: 'Here is the question. Use these relative atomic masses: H = 1, C = 12, N = 14, O = 16, Ca = 40. (a) Calculate the relative formula mass of ammonia, NH₃. (b) Calculate the relative formula mass of calcium carbonate, CaCO₃. (c) Calculate the percentage by mass of nitrogen in ammonia, to one decimal place.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Add up the masses of **every atom** in each formula, then find nitrogen\'s **share**' }],
      lines: [
        { say: 'A relative formula mass is the total of the masses of every atom in the formula. Then we find what fraction of that total is nitrogen.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [reaction('ma', { from: [{ t: 'N', label: 'N = 14' }, { t: 'H', n: 3, label: 'H = 1 each' }], to: [{ t: 'NH3', label: 'NH₃' }], foot: { after: 'Mr = 14 + 1 + 1 + 1 = 17' } })],
      lines: [
        { say: 'Here is what we need. A nitrogen atom, with a relative atomic mass of fourteen, and three hydrogen atoms, one each.', show: 'ma' },
        { say: 'Watch them join into one ammonia molecule. No atom is lost, so the molecule has all their mass: fourteen plus one plus one plus one.', play: 'ma.go' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Count **every** atom, using the small numbers', 'Add their **relative atomic masses**', '% of element = (its mass ÷ **Mr**) × 100'] }],
      lines: [
        { say: 'Here is the plan. Count every atom in the formula, using the small numbers.', show: 'plan.0' },
        { say: 'Add up their relative atomic masses.', show: 'plan.1' },
        { say: 'And to find an element\'s percentage, divide its mass in the formula by the relative formula mass, and multiply by one hundred.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Ammonia',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\ce{NH3}: 1 \\text{ N}, 3 \\text{ H}', 'M_r = 14 + 3 \\times 1 = \\good{17}'] }],
      lines: [
        { say: 'Step one. N H three has one nitrogen atom and three hydrogen atoms.', caption: 'Step one. NH₃ has one nitrogen atom and three hydrogen atoms.', show: 'm.0' },
        { say: 'Fourteen plus three times one is seventeen. That is part a.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Calcium carbonate',
      layout: 'center',
      main: [{ kind: 'math', id: 'c', size: 'md', lines: ['\\ce{CaCO3}: 1 \\text{ Ca}, 1 \\text{ C}, 3 \\text{ O}', 'M_r = 40 + 12 + 3 \\times 16', '= 40 + 12 + 48 = \\good{100}'] }],
      lines: [
        { say: 'Step two. C a C O three has one calcium, one carbon, and three oxygen atoms.', caption: 'Step two. CaCO₃ has one calcium, one carbon and three oxygen atoms.', show: 'c.0' },
        { say: 'That is forty, plus twelve, plus three times sixteen.', show: 'c.1' },
        { say: 'Three times sixteen is forty eight, and forty plus twelve plus forty eight is one hundred. That is part b.', show: 'c.2', focus: 'c.2' },
      ],
    },
    {
      chapter: 'Step 3: Percentage of nitrogen',
      layout: 'center',
      main: [{ kind: 'math', id: 'p', size: 'md', lines: ['\\%\\,\\text{N} = \\dfrac{14}{17} \\times 100', '= 82.35\\ldots \\approx \\good{82.4\\%}'] }],
      lines: [
        { say: 'Step three. Nitrogen contributes fourteen out of ammonia\'s seventeen.', show: 'p.0' },
        { say: 'Fourteen divided by seventeen, times one hundred, is eighty two point three five, which rounds to eighty two point four percent. That is part c.', show: 'p.1', focus: 'p.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) **17**. (b) **100**. (c) **82.4%** nitrogen.' },
      ],
      lines: [
        { say: 'Does it make sense? Nitrogen is by far the heaviest atom in ammonia, so it should make up most of the mass, and eighty two percent fits.', show: 'ans' },
        { say: 'So ammonia is seventeen, calcium carbonate is one hundred, and ammonia is eighty two point four percent nitrogen.' },
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
            ['NH₃ = **15**', 'Counted only **one** hydrogen'],
            ['CaCO₃ = **68**', 'Counted only **one** oxygen'],
            ['**21.4%**', 'Divided the **wrong way**: 3 ÷ 14'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'The three in N H three means three hydrogen atoms, so add three, not one.', caption: 'The 3 in NH₃ means three hydrogen atoms, so add 3, not 1.', focus: 'traps.0' },
        { say: 'The three in C a C O three applies to the oxygen, so the oxygen counts forty eight, not sixteen.', caption: 'The 3 in CaCO₃ applies to the oxygen, so the oxygen counts 48, not 16.', focus: 'traps.1' },
        { say: 'And the percentage is the element\'s mass divided by the whole formula mass. Mixing up the numbers gives an answer that is far too small.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'H = 1, S = 32, O = 16. What is the relative formula mass of sulfuric acid, H₂SO₄?',
          choices: ['49', '50', '96', '98'],
          answer: 3,
          working: '2 × 1 + 32 + 4 × 16 = 2 + 32 + 64 = 98.',
        },
      ],
      lines: [
        { say: 'Your turn. Hydrogen is one, sulfur is thirty two and oxygen is sixteen. What is the relative formula mass of sulfuric acid, H two S O four? Pause the video and try it.', caption: 'Your turn. H = 1, S = 32, O = 16. What is the relative formula mass of sulfuric acid, H₂SO₄? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Two hydrogens make two, one sulfur is thirty two, and four oxygens make sixty four. Two plus thirty two plus sixty four is ninety eight: choice D.', show: 'q2.answer' },
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
          items: ['Mr = sum of **every** atom\'s relative atomic mass', 'A small number counts the atom **before** it', '% of element = (its mass ÷ Mr) × **100**'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The relative formula mass is the sum of the relative atomic masses of every atom.', show: 'sum.0' },
        { say: 'A small number in a formula counts the atom just before it.', show: 'sum.1' },
        { say: 'And an element\'s percentage is its mass divided by the relative formula mass, times one hundred. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
