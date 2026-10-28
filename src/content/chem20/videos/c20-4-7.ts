import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { yieldBars } from './lib/c20-4b-figures.ts';

// Lead(II) iodide: 4.61 g could form, and 4.02 g is collected.
const bars = figure('y', [yieldBars({ theoretical: 4.61, actual: 4.02, values: ['4.61\\ \\text{g}', '4.02\\ \\text{g}'] })], 270);

const video: Explainer = {
  id: 'c20-4-7',
  lessonId: 'c20-4-7',
  title: 'Percent Yield, Part 1: Theoretical, Actual and Percent Yield',
  thumbnailTitle: 'Theoretical, Actual and Percent Yield',
  thumbnail: 'y',
  summary:
    'The theoretical yield is the mass of product the stoichiometry predicts from the limiting reagent; the actual yield is the mass collected. Percent yield = actual yield ÷ theoretical yield × 100%, with the actual yield on top: 4.02 g of lead(II) iodide collected from a theoretical 4.61 g is a percent yield of 87.2%.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Quantitative Relationships in Chemical Changes · Part 1', title: 'Theoretical, Actual and Percent Yield', subtitle: 'What you collect, against what could form' }],
      lines: [
        { say: 'A recipe that promises twenty-four cookies rarely gives exactly twenty-four. Some dough sticks to the bowl, one cookie burns, and another breaks on the way to the plate.', show: 'title' },
        { say: 'Chemical reactions are the same: the mass of product a chemist collects is almost always less than the stoichiometry predicts.' },
        { say: 'In this lesson, you will calculate the percent yield. This part names the yields and compares them. Later parts explain why yields fall short, find a theoretical yield, and plan for a known yield.' },
      ],
    },
    {
      chapter: 'Theoretical and actual yield',
      layout: 'center',
      main: [
        bars,
        { kind: 'callout', id: 'theo', tone: 'definition', title: 'Theoretical yield', md: 'The mass of product that the stoichiometry predicts from the amount of limiting reagent: the most that could form.' },
        { kind: 'callout', id: 'act', tone: 'definition', title: 'Actual yield', md: 'The mass of product actually collected and measured in an experiment.' },
      ],
      lines: [
        { say: 'Every stoichiometry calculation so far predicted the most product that could possibly form, if every particle of the limiting reagent reacted, and every bit of product were collected.' },
        { say: 'That prediction is the theoretical yield: the mass of product the stoichiometry predicts from the limiting reagent.', show: ['theo', 'y.theo', 'y.full'] },
        { say: 'The actual yield is the mass of product actually collected and measured in an experiment. It is usually smaller.', show: ['act', 'y.actual'] },
        { say: 'Here, four point zero two grams of lead two iodide was collected, out of the four point six one grams that could have formed.', caption: 'Here, 4.02 g of lead(II) iodide was collected, out of the 4.61 g that could have formed.', focus: ['y.actual', 'y.theo'] },
      ],
    },
    {
      chapter: 'Percent yield',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Percent yield', md: '$\\text{percent yield} = \\dfrac{\\text{actual yield}}{\\text{theoretical yield}} \\times 100\\%$' },
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Lead(II) nitrate reacts with excess potassium iodide: $\\ce{Pb(NO3)2 + 2KI -> PbI2 + 2KNO3}$. The theoretical yield is $4.61\\ \\text{g}$ of $\\ce{PbI2}$, and $4.02\\ \\text{g}$ is collected. What is the percent yield, to the nearest tenth?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{4.02}{4.61} \\times 100\\% = \\good{87.2\\%}'] },
      ],
      lines: [
        { say: 'The percent yield compares the two: the actual yield over the theoretical yield, times one hundred percent.', show: 'def' },
        { say: 'Lead two nitrate reacts with excess potassium iodide, and the yellow precipitate of lead two iodide is filtered and dried. The theoretical yield is four point six one grams, and four point zero two grams is collected. What is the percent yield?', caption: 'Lead(II) nitrate reacts with excess potassium iodide, and the yellow precipitate of lead(II) iodide is filtered and dried. The theoretical yield is 4.61 g, and 4.02 g is collected. What is the percent yield?', show: 'q' },
        { say: 'Four point zero two over four point six one, times one hundred percent, is eighty-seven point two percent.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Upside down',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{4.02}{4.61} \\times 100\\% = 87.2\\% \\quad \\good{\\checkmark}', '\\dfrac{4.61}{4.02} \\times 100\\% = 114.7\\% \\quad \\bad{\\times}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Upside down', md: 'The actual yield goes on **top**. A percent yield above 100% would claim that more product was collected than could possibly form.' },
      ],
      lines: [
        { say: 'The actual yield goes on top. Dividing the other way gives one hundred fourteen point seven percent.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'That would claim that more product was collected than could possibly form. A percent yield above one hundred percent is a warning sign, as the next part explains.', show: 'oops', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Magnesium ribbon is burned in air: $\\ce{2Mg + O2 -> 2MgO}$. The theoretical yield is $8.06\\ \\text{g}$ of $\\ce{MgO}$, and $7.10\\ \\text{g}$ is collected. What is the percent yield, to the nearest tenth?',
          choices: ['$113.5\\%$', '$88.1\\%$', '$11.9\\%$', '$0.88\\%$'],
          answer: 1,
          working: '$\\dfrac{7.10}{8.06} \\times 100\\% = 88.1\\%$',
        },
      ],
      lines: [
        { say: 'Your turn. Magnesium ribbon is burned in air. The theoretical yield is eight point zero six grams of magnesium oxide, and seven point one zero grams is collected. What is the percent yield? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, eighty-eight point one percent: seven point one zero over eight point zero six, times one hundred percent. Choice A divides the wrong way, and gives a yield above one hundred percent. Choice C is the percent that was lost.', show: 'q.answer' },
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
          items: ['**Theoretical yield**: the mass of product predicted from the limiting reagent.', '**Actual yield**: the mass of product collected.', '$\\text{percent yield} = \\dfrac{\\text{actual yield}}{\\text{theoretical yield}} \\times 100\\%$, actual on top.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The theoretical yield is the mass of product predicted from the limiting reagent.', show: 'sum.0' },
        { say: 'The actual yield is the mass of product collected.', show: 'sum.1' },
        { say: 'And the percent yield is the actual over the theoretical, times one hundred percent. In part two, you will see why the actual yield is usually lower, and what a yield above one hundred percent means. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
