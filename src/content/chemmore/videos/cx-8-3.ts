import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'cx-8-3',
  lessonId: 'cx-8-3',
  title: 'Group 7, the Halogens',
  thumbnail: false,
  summary:
    'Down Group 7, boiling points rise while electronegativity and oxidising ability fall, so a halogen displaces the halide ions below it. Chlorine disproportionates in water, killing bacteria, and makes bleach with cold sodium hydroxide. Silver nitrate identifies halide ions by the colour of the precipitate, and halide ions become stronger reducing agents down the group.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'A Level Inorganic Chemistry', title: 'Group 7, the Halogens', subtitle: 'A poison that keeps water safe' }],
      lines: [
        { say: 'Chlorine is a poisonous gas, yet it is added to drinking water and is the active part of bleach. Bromine and iodine follow the same patterns, each a little more weakly.', show: 'title' },
        { say: 'In this lesson, you will explain the trends down Group seven, predict displacement reactions, and identify halide ions.', caption: 'In this lesson, you will explain the trends down Group 7, predict displacement reactions, and identify halide ions.' },
      ],
    },
    {
      chapter: 'Trends and displacement',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['Boiling points rise: bigger molecules, stronger van der Waals forces', 'Electronegativity and oxidising ability fall'] },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\ce{Cl2 + 2I- -> 2Cl- + I2}'] },
      ],
      lines: [
        { say: 'Down the group, the molecules get bigger, with more electrons, so the boiling points rise.', show: 'b.0' },
        { say: 'The atoms get bigger too, so they attract electrons less strongly. Electronegativity and oxidising ability both fall.', show: 'b.1' },
        { say: 'So a halogen displaces the halide ions below it. Chlorine oxidises iodide ions to iodine, and the solution turns brown.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Chlorine in water',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\ce{Cl2 + H2O <=> HCl + HClO}', '\\ce{Cl2 + 2NaOH -> NaClO + NaCl + H2O}'] }],
      lines: [
        { say: 'Chlorine reacts with water. It is oxidised to plus one and reduced to minus one at the same time, which is called disproportionation. The chloric one acid kills bacteria.', caption: 'Chlorine reacts with water. It is oxidised to +1 and reduced to −1 at the same time, which is called disproportionation. The chloric(I) acid kills bacteria.', show: 'm.0', focus: 'm.0' },
        { say: 'Chlorine is toxic, but the amounts used are small, and preventing diseases such as cholera outweighs the risk.' },
        { say: 'With cold, dilute sodium hydroxide, chlorine makes bleach.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Testing for halides',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Halide', 'With silver nitrate', 'Ammonia'], rows: [['Chloride', 'white', 'dissolves in dilute'], ['Bromide', 'cream', 'dissolves in concentrated'], ['Iodide', 'yellow', 'does not dissolve']] },
      ],
      lines: [
        { say: 'To identify a halide ion, add dilute nitric acid, then silver nitrate.' },
        { say: 'Chloride gives a white precipitate, which dissolves in dilute ammonia.', show: 't.0', focus: 't.0' },
        { say: 'Bromide gives cream, which dissolves only in concentrated ammonia.', show: 't.1', focus: 't.1' },
        { say: 'And iodide gives yellow, which does not dissolve at all.', show: 't.2', focus: 't.2' },
        { say: 'Down the group, the halide ions are also stronger reducing agents, so iodide reduces concentrated sulfuric acid all the way to hydrogen sulfide.' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [{ kind: 'callout', id: 'm', tone: 'mistake', title: 'Not hydrochloric acid', md: 'Acidify with **nitric** acid. Hydrochloric acid adds chloride ions, giving a white precipitate whatever the sample.' }],
      lines: [{ say: 'A common mistake is to acidify with hydrochloric acid. That adds chloride ions, which give a white precipitate whatever the sample was. Use nitric acid.', show: 'm' }],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Bromine water is added to potassium iodide solution. What happens?',
          choices: ['Iodine forms and the solution turns brown', 'No reaction, as bromine is below iodine', 'Chlorine gas is given off', 'A cream precipitate forms'],
          answer: 0,
          working: 'Bromine is **above** iodine, so it is the stronger oxidising agent: $\\ce{Br2 + 2I- -> 2Br- + I2}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Bromine water is added to potassium iodide solution. What happens? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is choice A. Bromine is above iodine, so it oxidises the iodide ions, and brown iodine forms.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Down Group 7: higher boiling points, weaker oxidising agents.', 'A halogen displaces the halide ions below it.', 'Chlorine disproportionates in water; with NaOH it makes bleach.', 'Silver nitrate: chloride white, bromide cream, iodide yellow.'] }],
      lines: [
        { say: 'Let’s sum up. Down Group seven, boiling points rise and the halogens become weaker oxidising agents.', caption: 'Let’s sum up. Down Group 7, boiling points rise and the halogens become weaker oxidising agents.', show: 'sum.0' },
        { say: 'A halogen displaces the halide ions below it.', show: 'sum.1' },
        { say: 'Chlorine disproportionates in water, and makes bleach with sodium hydroxide.', show: 'sum.2' },
        { say: 'And with silver nitrate, chloride is white, bromide cream, and iodide yellow.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
