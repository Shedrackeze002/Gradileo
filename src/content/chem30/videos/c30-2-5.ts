import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { rig } from './lib/c30-2b-figures.ts';

// A burette of deep purple potassium permanganate over a flask of iron(II) ions, named part by
// part; the flask turns pale pink at the endpoint.
const setup = figure('r', [rig({ titrant: '\\ce{KMnO4(aq)}', sample: '\\ce{Fe^2+(aq)}' })], 560);
const apparatus = ['r.flask', 'r.sample', 'r.burette', 'r.titrant', 'r.scale', 'r.tap'];

const video: Explainer = {
  id: 'c30-2-5',
  lessonId: 'c30-2-5',
  title: 'Redox Titrations, Part 1: Titrating with Permanganate',
  thumbnailTitle: 'Titrating with Permanganate',
  thumbnail: 'r',
  summary:
    'A redox titration finds the amount of an oxidising or reducing agent in a sample by titrating it with a standard solution, the titrant. Acidified permanganate is a deep purple that is reduced to almost colourless manganese(II) ions, so the endpoint is the first pale pink that lasts: it needs no indicator. The sample is acidified with sulfuric acid, not hydrochloric acid, and dichromate titrations need a redox indicator.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Electrochemical Changes · Part 1', title: 'Titrating with Permanganate', subtitle: 'A titrant that is its own indicator' }],
      lines: [
        { say: 'How much iron is in an iron supplement tablet? How strong is a bottle of hydrogen peroxide disinfectant? A quality-control lab can answer both with one deep purple solution: potassium permanganate.', show: 'title' },
        { say: 'In this lesson, you will use redox titrations to find amounts and concentrations. This part shows how a permanganate titration works, and why it needs no indicator. Later parts turn titration data into concentrations, and analyse solid and diluted samples.' },
      ],
    },
    {
      chapter: 'Redox titrations',
      layout: 'split',
      leftWidth: 460,
      left: [setup],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Redox titration', md: 'Finds the amount of an oxidising or reducing agent in a sample, by reacting it with a solution of a reducing or oxidising agent of known concentration.' },
        { kind: 'callout', id: 'tit', tone: 'definition', title: 'Titrant', md: 'The solution added from the burette: a **standard solution**, whose concentration is known precisely, such as $\\ce{KMnO4}$ or $\\ce{K2Cr2O7}$.' },
      ],
      lines: [
        { say: 'A redox titration works like an acid-base titration, with the same burette, pipette and conical flask. Only the reaction is different: electrons are transferred, instead of hydrogen ions.', show: ['r.flask', 'r.sample', 'r.burette', 'r.scale', 'r.tap'] },
        { say: 'A redox titration finds the amount of an oxidising or reducing agent in a sample, by reacting it with a solution of a reducing or oxidising agent of known concentration.', show: 'def' },
        { say: 'The titrant is the solution added from the burette. It is a standard solution, whose concentration is known precisely.', show: ['tit', 'r.titrant'], focus: 'r.titrant' },
        { say: 'Two common oxidising titrants are potassium permanganate and potassium dichromate.', caption: 'Two common oxidising titrants are potassium permanganate, KMnO₄, and potassium dichromate, K₂Cr₂O₇.', focus: 'r' },
      ],
    },
    {
      chapter: 'Acidified permanganate',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\ce{MnO4^-(aq) + 8H+(aq) + 5e- -> Mn^2+(aq) + 4H2O(l)}'] },
        {
          kind: 'callout',
          id: 'tip',
          tone: 'tip',
          title: 'Acidify with sulfuric acid',
          md: 'The sample is acidified first, usually with dilute **sulfuric acid**. **Hydrochloric acid** is avoided: permanganate would oxidise its chloride ions to chlorine, and use up extra titrant.',
        },
      ],
      lines: [
        {
          say: 'Permanganate is a strong oxidising agent only in acidic solution. There, each permanganate ion takes five electrons, and is reduced to a manganese two ion.',
          caption: 'Permanganate is a strong oxidising agent only in acidic solution. There, each permanganate ion, MnO₄⁻, takes five electrons, and is reduced to a manganese(II) ion, Mn²⁺.',
          show: 'm',
        },
        { say: 'So the sample is acidified first, usually with dilute sulfuric acid.', show: 'tip' },
        { say: 'Hydrochloric acid is avoided. Permanganate would oxidise its chloride ions to chlorine, and use up extra titrant.' },
      ],
    },
    {
      chapter: 'Its own indicator',
      layout: 'split',
      leftWidth: 460,
      left: [setup],
      right: [
        {
          kind: 'callout',
          id: 'end',
          tone: 'definition',
          title: 'Endpoint',
          md: 'The moment a colour change shows that the reaction is complete. In a good titration it is at the **equivalence point**, when the titrant has reacted exactly with the sample, in the ratio of the balanced equation.',
        },
        {
          kind: 'bullets',
          id: 'b',
          items: ['[[brand:Purple]] $\\ce{MnO4^-}$ becomes almost colourless $\\ce{Mn^2+}$.', 'Endpoint: the first [[hyp:pale pink]] that lasts after swirling.'],
        },
      ],
      lines: [
        {
          say: 'The endpoint is the moment a colour change shows that the reaction is complete. In a good titration, it is at the equivalence point, when the titrant has reacted exactly with the sample, in the ratio of the balanced equation.',
          show: [...apparatus, 'end'],
        },
        { say: 'Permanganate ions are a deep purple, while the manganese two ions they become are almost colourless.', caption: 'Permanganate ions are a deep purple, while the manganese(II) ions they become are almost colourless.', show: 'b.0', focus: 'r.titrant' },
        { say: 'As the titrant runs into the flask, each drop meets reducing agent, reacts, and loses its colour at once.', show: 'r.drop', focus: ['r.drop', 'r.sample'] },
        { say: 'When the last of the reducing agent has reacted, the next drop has nothing to react with. Its purple stays, and the whole solution turns a pale pink that lasts after swirling.', show: ['r.pink', 'b.1'], focus: 'r.pink' },
        { say: 'That first lasting pink is the endpoint. Permanganate is its own indicator.', focus: 'r' },
      ],
    },
    {
      chapter: 'Dichromate needs help',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Titrant', 'Colour', 'Reduced to', 'Colour', 'Indicator'],
          rows: [
            ['$\\ce{MnO4^-}$', 'deep purple', '$\\ce{Mn^2+}$', 'almost colourless', 'none needed'],
            ['$\\ce{Cr2O7^2-}$', 'orange', '$\\ce{Cr^3+}$', 'green', 'diphenylamine sulfonate (violet)'],
          ],
        },
      ],
      lines: [
        { say: 'Compare the two titrants. Permanganate changes from deep purple to almost colourless, so it needs no indicator.', show: 't.0', focus: 't.0' },
        {
          say: 'Dichromate ions are orange, and chromium three ions are green, but the change from orange to green is gradual and hard to see.',
          caption: 'Dichromate ions are orange, and chromium(III) ions are green, but the change from orange to green is gradual and hard to see.',
          show: 't.1',
          focus: 't.1',
        },
        { say: 'So dichromate titrations use a redox indicator, such as dye-phenyl-amine sulfonate, which turns violet at the endpoint.', caption: 'So dichromate titrations use a redox indicator, such as diphenylamine sulfonate, which turns violet at the endpoint.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Acidified potassium permanganate is added from a burette to a colourless sample of hydrogen peroxide. What marks the endpoint?',
          choices: ['The solution turns from orange to green.', 'The purple solution in the flask suddenly turns colourless.', 'The first pale pink colour that lasts after swirling.', 'A few drops of indicator turn violet.'],
          answer: 2,
          working: 'While any hydrogen peroxide is left, each drop of purple permanganate reacts and becomes almost colourless $\\ce{Mn^2+}$. The first drop in excess stays, giving a lasting pale pink.',
        },
      ],
      lines: [
        { say: 'Your turn. Acidified potassium permanganate is added from a burette to a colourless sample of hydrogen peroxide. What marks the endpoint? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, the first pale pink colour that lasts after swirling, from a slight excess of permanganate. Choice A describes dichromate, and choice D an indicator that permanganate does not need.', show: 'q.answer' },
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
            'A **redox titration** finds an amount of an oxidising or reducing agent with a standard solution, the **titrant**.',
            'Acidify permanganate with **sulfuric acid**, not hydrochloric acid.',
            'Purple $\\ce{MnO4^-}$ becomes almost colourless $\\ce{Mn^2+}$: the **endpoint** is the first lasting pale pink.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A redox titration finds an amount of an oxidising or reducing agent, with a standard solution called the titrant.', show: 'sum.0' },
        { say: 'Permanganate is acidified with sulfuric acid, not hydrochloric acid.', show: 'sum.1' },
        { say: 'And since purple permanganate becomes almost colourless, the endpoint is the first lasting pale pink, with no indicator. In part two, you will turn titration data into a concentration. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
