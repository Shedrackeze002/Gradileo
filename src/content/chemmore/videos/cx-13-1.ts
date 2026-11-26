import type { Explainer } from '@/video/script.ts';
import { temperature } from '../../chem10/videos/lib/c10-rates.ts';

const video: Explainer = {
  id: 'cx-13-1',
  lessonId: 'cx-13-1',
  title: 'Measurement and the Scientific Method',
  thumbnail: 'tp',
  summary:
    'Every quantity has one SI base unit, and chemists also use dm³ and mol dm⁻³. Significant figures start at the first non-zero digit, and a calculated answer has as many as the least precise measurement. Accuracy is closeness to the true value, precision is closeness of repeats to each other, and science moves from observation to hypothesis to experiment, then to a law or a theory.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Measurement, Chemical Laws and Orbitals', title: 'Measurement and the Scientific Method', subtitle: 'How good is a number?' }],
      lines: [
        { say: 'A chemist who writes zero point two four eight moles per cubic decimetre has told you two things: the value, and how carefully it was measured.', caption: 'A chemist who writes 0.248 mol dm⁻³ has told you two things: the value, and how carefully it was measured.', show: 'title' },
        { say: 'In this lesson, you will use S I units and significant figures, tell accuracy from precision, and follow the steps of the scientific method.', caption: 'In this lesson, you will use SI units and significant figures, tell accuracy from precision, and follow the steps of the scientific method.' },
      ],
    },
    {
      chapter: 'An experiment tests an idea',
      layout: 'center',
      main: [temperature('tp', 420)],
      lines: [
        { say: 'Science starts with an observation: food goes off faster in a warm kitchen. A hypothesis explains it, and it must be testable. Here, the hypothesis is that a reaction goes faster when it is hotter.', show: ['tp', 'tp.labels', 'tp.tally', 'tp.thermo'] },
        { say: 'So we test it. The same reaction runs in two boxes with the same particles, and only the temperature is changed. Watch the counts of new molecules.', play: 'tp.go', focus: 'tp.b' },
        { say: 'The hot box makes new molecules faster, so the result supports the hypothesis. When many experiments agree, the pattern can be stated as a law, and a wide explanation that survives many tests becomes a theory.' },
      ],
    },
    {
      chapter: 'SI units',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Quantity', 'SI base unit', 'Symbol'],
          rows: [['Mass', 'kilogram', 'kg'], ['Length', 'metre', 'm'], ['Temperature', 'kelvin', 'K'], ['Amount of substance', 'mole', 'mol']],
        },
        { kind: 'text', id: 'dm', size: 'md', md: 'Chemists also use $\\text{dm}^3$ (a litre) and $\\text{mol dm}^{-3}$. Kelvin = Celsius + 273.' },
      ],
      lines: [
        { say: 'Every quantity has one S I base unit: the kilogram for mass, the metre for length, the kelvin for temperature and the mole for amount of substance.', caption: 'Every quantity has one SI base unit: the kilogram for mass, the metre for length, the kelvin for temperature and the mole for amount of substance.', show: 't' },
        { say: 'Chemists also use the cubic decimetre, which is a litre, and moles per cubic decimetre for concentration. A temperature in kelvin is the Celsius temperature plus two hundred seventy-three.', caption: 'Chemists also use the cubic decimetre, which is a litre, and mol dm⁻³ for concentration. A temperature in kelvin is the Celsius temperature plus 273.', show: 'dm' },
      ],
    },
    {
      chapter: 'Significant figures',
      layout: 'center',
      main: [
        { kind: 'math', id: 'c', size: 'md', lines: ['25.40 \\ \\to\\ 4', '0.0036 \\ \\to\\ 2', '1.005 \\ \\to\\ 4'] },
        { kind: 'text', id: 'q', size: 'md', md: 'Mass $12.46\\ \\text{g}$, volume $9.8\\ \\text{cm}^3$. Density $= 12.46 \\div 9.8 = 1.2714\\ldots$' },
        { kind: 'math', id: 'a', size: 'lg', lines: ['1.3\\ \\text{g cm}^{-3}'] },
      ],
      lines: [
        { say: 'Significant figures are counted from the first digit that is not zero. Twenty-five point four zero has four: that last zero shows the reading was made to the nearest hundredth.', caption: 'Significant figures are counted from the first digit that is not zero. 25.40 has four: that last zero shows the reading was made to the nearest hundredth.', show: 'c.0' },
        { say: 'Zero point zero zero three six has only two, because the leading zeros just place the decimal point. And one point zero zero five has four, because zeros between digits count.', caption: '0.0036 has only two, because the leading zeros just place the decimal point. And 1.005 has four, because zeros between digits count.', show: ['c.1', 'c.2'] },
        { say: 'When you multiply or divide, give the answer to the fewest significant figures you used. A liquid of mass twelve point four six grams has a volume of nine point eight cubic centimetres.', caption: 'When you multiply or divide, give the answer to the fewest significant figures you used. A liquid of mass 12.46 g has a volume of 9.8 cm³.', show: 'q' },
        { say: 'The calculator gives one point two seven one four. The volume has only two significant figures, so the density is one point three grams per cubic centimetre.', caption: 'The calculator gives 1.2714. The volume has only two significant figures, so the density is 1.3 g cm⁻³.', show: 'a', focus: 'a' },
      ],
    },
    {
      chapter: 'Accuracy and precision',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'acc', tone: 'definition', title: 'Accuracy', md: 'How close a result is to the **true value**.' },
        { kind: 'callout', id: 'pre', tone: 'definition', title: 'Precision', md: 'How close **repeated results** are to each other.' },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Precise is not the same as correct', md: 'A balance that always reads $0.20\\ \\text{g}$ high gives results that agree closely, and are all wrong: a **systematic error**.' },
      ],
      lines: [
        { say: 'Accuracy is how close a result is to the true value. Precision is how close repeated results are to each other.', show: ['acc', 'pre'] },
        { say: 'Titres of twenty-four point one zero, twenty-four point one five and twenty-four point one zero are precise. Random errors, like misreading a meniscus, scatter results either way, and repeating and averaging reduces them.', caption: 'Titres of 24.10, 24.15 and 24.10 cm³ are precise. Random errors, like misreading a meniscus, scatter results either way, and repeating and averaging reduces them.' },
        { say: 'But a balance that always reads zero point two grams high shifts every result the same way. That is a systematic error: the results agree closely, yet none of them is accurate.', caption: 'But a balance that always reads 0.20 g high shifts every result the same way. That is a systematic error: the results agree closely, yet none of them is accurate.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'How many significant figures are there in $0.02050$?',
          choices: ['2', '3', '4', '5'],
          answer: 2,
          working: 'Start at the first non-zero digit, the 2: the digits $2, 0, 5, 0$ all count, so there are 4.',
        },
      ],
      lines: [
        { say: 'Your turn. How many significant figures are there in zero point zero two zero five zero? Pause the video and try it.', caption: 'Your turn. How many significant figures are there in 0.02050? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, four. Start at the first digit that is not zero, the two. Then the zero between the two and the five counts, and so does the final zero after the decimal point.', show: 'q.answer' },
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
          items: [
            'Each quantity has one SI base unit; chemists also use dm³ and mol dm⁻³.',
            'Count significant figures from the first non-zero digit; answer to the fewest used.',
            'Accuracy is closeness to the true value; precision is closeness of repeats.',
            'Observation, hypothesis, experiment, then a law or a theory.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Each quantity has one S I base unit, and chemists also use cubic decimetres and moles per cubic decimetre.', caption: 'Let’s sum up. Each quantity has one SI base unit, and chemists also use dm³ and mol dm⁻³.', show: 'sum.0' },
        { say: 'Count significant figures from the first digit that is not zero, and give an answer to the fewest you used.', show: 'sum.1' },
        { say: 'Accuracy is closeness to the true value, and precision is how closely repeats agree.', show: 'sum.2' },
        { say: 'And science moves from an observation to a hypothesis, tested by experiment, and then to a law or a theory.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
