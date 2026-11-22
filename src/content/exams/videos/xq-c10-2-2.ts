import type { Explainer } from '@/video/script.ts';
import { isotopeMix, nuclei } from '@/content/chem10/videos/lib/c10-equations.ts';

// Exam question for Chemistry 10 lesson 2.2 (isotopes and relative atomic mass): the average atomic
// mass of bromine from its two isotopes. The question is OpenStax Chemistry 2e's own, word for word
// (end-of-chapter exercise 23, section 2.3, CC BY-NC-SA 4.0). 78.9183 × 0.5069 + 80.9163 × 0.4931
// = 40.0037 + 39.8998 = 79.9035, which the book gives as 79.904 amu.
//
// The pictures: three carbon nuclei built side by side (isotopes: 6 protons, 6 to 8 neutrons), and
// a sample of bromine atoms as a gas, the two isotopes mixed almost half and half.

const QUESTION =
  'Average atomic masses listed by IUPAC are based on a study of experimental results. Bromine has two isotopes, 79Br and 81Br, whose masses (78.9183 and 80.9163 amu, respectively) and abundances (50.69% and 49.31%, respectively) were determined in earlier experiments. Calculate the average atomic mass of bromine based on these experiments.';

const video: Explainer = {
  id: 'xq-c10-2-2',
  lessonId: '',
  exam: {
    lesson: 'c10-2-2',
    source: 'OpenStax, Chemistry 2e, end-of-chapter exercise 23, section 2.3, Atomic Structure and Symbolism',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/chemistry-2e/pages/2-exercises',
    question: QUESTION,
  },
  title: 'Exam Question: The Average Atomic Mass of Bromine from Its Isotopes',
  thumbnailTitle: 'The Mass of Bromine',
  thumbnail: 'mix',
  summary:
    'A real test question, solved one small step at a time: bromine is a mixture of bromine-79 and bromine-81, and we find its average atomic mass from their masses and abundances. We see why the average is a weighted one, multiply each mass by its fraction, and add, to get 79.904 amu.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'The Mass of Bromine', subtitle: 'Average atomic mass, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the mass of a bromine atom. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
            'Average atomic masses listed by IUPAC are based on a study of experimental results. Bromine has two isotopes, $\\ce{^{79}Br}$ and $\\ce{^{81}Br}$, whose masses (78.9183 and 80.9163 amu, respectively) and abundances (50.69% and 49.31%, respectively) were determined in earlier experiments. Calculate the average atomic mass of bromine based on these experiments.',
          answer: '$79.904\\ \\text{amu}$',
          working: '$78.9183 \\times 0.5069 + 80.9163 \\times 0.4931 = 79.904$ amu.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Average atomic masses listed by eye-you-pack are based on a study of experimental results. Bromine has two isotopes, bromine-79 and bromine-81, whose masses, 78.9183 and 80.9163 atomic mass units, and abundances, 50.69 percent and 49.31 percent, were determined in earlier experiments. Calculate the average atomic mass of bromine based on these experiments.', caption: 'Average atomic masses listed by IUPAC are based on a study of experimental results. Bromine has two isotopes, bromine-79 and bromine-81, whose masses (78.9183 and 80.9163 amu) and abundances (50.69% and 49.31%) were determined in earlier experiments. Calculate the average atomic mass of bromine based on these experiments.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [isotopeMix('mix', { name: 'bromine-79', n: 13 }, { name: 'bromine-81', n: 12 }, 'a sample of bromine atoms', 380), { kind: 'text', id: 'plain', size: 'lg', md: 'What is the mass of an **average** bromine atom?' }],
      lines: [
        { say: 'Here is a sample of bromine atoms. There are two kinds mixed together: bromine-79 and bromine-81, in almost equal numbers.', show: ['mix', 'mix.labels', 'mix.key'] },
        { say: 'Any real sample of bromine is a mix like this. So the question asks: if we averaged the masses of all the atoms, what would we get?', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        nuclei('nu', [{ label: 'carbon-12', p: 6, n: 6 }, { label: 'carbon-13', p: 6, n: 7 }, { label: 'carbon-14', p: 6, n: 8 }], 360),
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{average mass} = (\\text{mass}_1 \\times \\text{fraction}_1) + (\\text{mass}_2 \\times \\text{fraction}_2)'] },
      ],
      lines: [
        { say: 'Here is what we need. Isotopes are atoms of the same element with different numbers of neutrons. Here are three carbon nuclei: each has 6 protons, but 6, 7 or 8 neutrons.', show: 'nu', play: 'nu.build', playDelay: 0.3 },
        { say: 'Bromine works the same way. Both of its isotopes have 35 protons, but bromine-79 has 44 neutrons and bromine-81 has 46, so a bromine-81 atom is a little heavier.' },
        { say: 'The average atomic mass is a weighted average: each isotope\'s mass counts in proportion to how common it is. Multiply each mass by its fraction, then add.', show: 'm.0' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Turn each **percentage** into a **fraction**', 'Multiply each **mass** by its fraction', '**Add** the two results'] }],
      lines: [
        { say: 'Here is the plan. First, turn each percentage into a decimal fraction.', show: 'plan.0' },
        { say: 'Second, multiply each isotope\'s mass by its fraction.', show: 'plan.1' },
        { say: 'Third, add the two results together.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Fractions',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['50.69\\% = \\dfrac{50.69}{100} = \\opp{0.5069}', '49.31\\% = \\dfrac{49.31}{100} = \\adj{0.4931}', '0.5069 + 0.4931 = 1.0000\\ \\checkmark'] }],
      lines: [
        { say: 'Step one. A percentage is out of one hundred, so we divide by one hundred. 50.69 percent is 0.5069.', show: 'm.0' },
        { say: '49.31 percent is 0.4931.', show: 'm.1' },
        { say: 'Quick check: the two fractions add up to exactly 1, so every atom is counted once.', show: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: Multiply',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['78.9183 \\times \\opp{0.5069} = 40.0037', '80.9163 \\times \\adj{0.4931} = 39.8998'] }],
      lines: [
        { say: 'Step two. Bromine-79: 78.9183 times 0.5069 is 40.0037 atomic mass units.', show: 'm.0' },
        { say: 'Bromine-81: 80.9163 times 0.4931 is 39.8998.', show: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Add',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['40.0037 + 39.8998 = 79.9035', '\\approx \\good{79.904\\ \\text{amu}}'] }],
      lines: [
        { say: 'Step three. Add them: 40.0037 plus 39.8998 is 79.9035.', show: 'm.0' },
        { say: 'Rounded to the precision of the data, the average atomic mass of bromine is 79.904 atomic mass units.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [isotopeMix('mix', { name: 'bromine-79', n: 13 }, { name: 'bromine-81', n: 12 }, 'a sample of bromine atoms', 340), { kind: 'math', id: 'm', size: 'md', lines: ['78.9 < \\good{79.904} < 80.9'] }],
      lines: [
        { say: 'Does it make sense? The average must lie between the two masses, and it does.', show: ['mix', 'mix.labels', 'mix.key', 'm.0'] },
        { say: 'And since the two isotopes are almost equally common, the average sits almost exactly halfway, just a little closer to bromine-79, the slightly more common one. The periodic table gives bromine as 79.904, the same.' },
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
            ['$79.9173$', 'A plain average: added the masses and **halved**'],
            ['$7990.35$', 'Used **50.69** instead of 0.5069'],
            ['$80$', 'Rounded the masses to 79 and 81 first'],
            ['$79.904$', 'Correct'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: '79.9173 is a plain average: the two masses added and halved. That would only be right if the isotopes were exactly fifty-fifty.' },
        { say: '7,990.35 forgets to turn the percentages into fractions. The answer is a hundred times too big, far heavier than either isotope.' },
        { say: 'And 80 rounds too early. Keep every digit until the end.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Copper is 69.2% copper-63 (mass 62.93 amu) and 30.8% copper-65 (mass 64.93 amu). What is its average atomic mass?',
          choices: ['$63.93$ amu', '$64.31$ amu', '$63.55$ amu', '$127.86$ amu'],
          answer: 2,
          working: '$62.93 \\times 0.692 + 64.93 \\times 0.308 = 43.55 + 20.00 = 63.55$ amu.',
        },
      ],
      lines: [
        { say: 'Your turn. Copper is 69.2 percent copper-63, with mass 62.93, and 30.8 percent copper-65, with mass 64.93. What is its average atomic mass? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: '62.93 times 0.692 is 43.55, and 64.93 times 0.308 is 20.00. Together they make 63.55 atomic mass units, choice C. 63.93 is the plain average, which ignores that copper-63 is more common.', show: 'q2.answer' },
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
          items: ['Isotopes: same protons, different neutrons', 'Average atomic mass is a **weighted** average', 'Multiply each mass by its **fraction**, then add', 'The answer lies between the masses, nearer the commoner one'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Isotopes of an element have the same number of protons but different numbers of neutrons.', show: 'sum.0' },
        { say: 'The average atomic mass is a weighted average of their masses.', show: 'sum.1' },
        { say: 'Multiply each mass by its fraction, then add.', show: 'sum.2' },
        { say: 'And the answer always lies between the masses, nearer the more common isotope. For more on isotopes, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
