import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { crowd, join, note, picks } from '@/content/math9/videos/lib/m9-10-figures.ts';

// Exam question for Math 9 lesson 10.3 (developing a project plan). The question is a Try It from
// OpenStax Introductory Statistics 2e, word for word (section 1.1, Definitions of Statistics,
// Probability, and Key Terms, CC BY-NC-SA 4.0). Population: all families with children at Knoll
// Academy. Sample: the 100 families surveyed. Parameter: the mean for all of them. Statistic: the
// mean for the sample. Variable: the amount one family spends. Data: $65, $75, $95.

const QUESTION =
  'Determine what the key terms refer to in the following study. We want to know the average (mean) amount of money spent on school uniforms each year by families with children at Knoll Academy. We randomly survey 100 families with children in the school. Three of the families spent $65, $75, and $95, respectively.';

// The school's families as 60 dots; the 10 ringed ones stand for the 100 surveyed at random.
const PICKED = [2, 9, 13, 18, 27, 31, 36, 44, 51, 57];

const families = (id: string) =>
  figure(
    id,
    [
      join(
        crowd({ count: 60, cols: 12, groups: [{ id: 'all', tone: 'adj' }] }),
        picks({ id: 'pick', which: PICKED, cols: 12, tone: 'theta' }),
        note({ id: 'key', at: [-0.3, 1.1], tex: '\\adj{\\bullet}\\ \\text{a family at Knoll}\\qquad \\thc{\\bigcirc}\\ \\text{surveyed}', place: 'right' }),
      ),
    ],
    400,
  );

const video: Explainer = {
  id: 'xq-m9-10-3',
  lessonId: '',
  exam: {
    lesson: 'm9-10-3',
    source: 'OpenStax, Introductory Statistics 2e, Try It in section 1.1, Definitions of Statistics, Probability, and Key Terms',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/introductory-statistics-2e/pages/1-1-definitions-of-statistics-probability-and-key-terms',
    question: QUESTION,
  },
  title: 'Exam Question: The Key Terms of a Study (Developing a Project Plan)',
  thumbnailTitle: 'The Key Terms of a Study',
  thumbnail: 'ask',
  summary:
    'A real test question, solved one small step at a time: determine what the key terms refer to in this study. We want to know the average (mean) amount of money spent on school uniforms each year by families with children at Knoll Academy. We randomly survey 100 families with children in the school. Three of the families spent $65, $75, and $95. The population is all families with children at Knoll Academy, and the sample is the 100 families surveyed. The parameter is the mean amount for all the families, and the statistic is the mean for the 100 in the sample. The variable is the amount one family spends, and the data are the amounts, such as $65, $75 and $95. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'The Key Terms of a Study', subtitle: 'Developing a project plan, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about developing a project plan. Every plan for a study starts with its key terms. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Introductory Statistics textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'Determine what the key terms refer to in the following study. We want to know the average (mean) amount of money spent on school uniforms each year by families with children at Knoll Academy. We randomly survey $100$ families with children in the school. Three of the families spent \\$65, \\$75, and \\$95, respectively.',
          answer: 'population: all Knoll families; sample: the 100 surveyed; parameter: mean of all; statistic: mean of the sample; variable: amount one family spends; data: \\$65, \\$75, \\$95',
          working: 'population ↔ parameter, sample ↔ statistic',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Determine what the key terms refer to in the following study. We want to know the average, or mean, amount of money spent on school uniforms each year by families with children at Knoll Academy.' },
        { say: 'We randomly survey 100 families with children in the school. Three of the families spent 65 dollars, 75 dollars, and 95 dollars, respectively.', caption: 'We randomly survey 100 families with children in the school. Three of the families spent $65, $75, and $95, respectively.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 620,
      left: [families('ask')],
      right: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Key terms', md: 'The **key terms** of a study are **population**, **sample**, **parameter**, **statistic**, **variable** and **data**. We match each one to a part of this study.' }],
      lines: [
        { say: 'Picture each family at Knoll Academy as a dot. The ringed dots stand for the families who were surveyed at random.', show: ['ask.all', 'ask.key', 'ask.pick'] },
        { say: 'The question asks us to match six key terms to parts of this study: population, sample, parameter, statistic, variable and data.', show: 'c' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'terms',
          head: ['Term', 'Meaning'],
          rows: [
            ['population', 'the **whole** group we want to know about'],
            ['sample', 'the **part** we collect data from'],
            ['parameter', 'a number that describes the **population**'],
            ['statistic', 'a number that describes the **sample**'],
            ['variable', 'what we measure, which **changes** from member to member'],
            ['data', 'the actual **values** we collect'],
          ],
        },
      ],
      lines: [
        { say: 'Here is what we need. The population is the whole group we want to know about. The sample is the part of it we actually collect data from.', show: 'terms' },
        { say: 'A parameter is a number that describes the population. A statistic is a number that describes the sample. Population goes with parameter, and sample goes with statistic.' },
        { say: 'The variable is what we measure, which changes from one member to the next. And the data are the actual values we collect.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Who** do we want to know about? Who was **asked**?', 'Which number is for **all**, which for the **sample**?', 'What is **measured**, and what values came back?'] }],
      lines: [
        { say: 'Here is the plan. Who do we want to know about, and who was asked? That gives the population and the sample.', show: 'plan.0' },
        { say: 'Which number describes everyone, and which describes the sample? That gives the parameter and the statistic.', show: 'plan.1' },
        { say: 'What is measured, and what values came back? That gives the variable and the data.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Match the terms',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: [
            '\\text{population: all Knoll families}',
            '\\text{sample: the } 100 \\text{ surveyed}',
            '\\text{parameter: mean of } \\textbf{all}',
            '\\text{statistic: mean of the } \\textbf{sample}',
            '\\text{variable: what one family spends}',
            '\\text{data: } \\$65,\\ \\$75,\\ \\$95',
          ],
        },
      ],
      lines: [
                { say: 'Step one. We want to know about all the families with children at Knoll Academy. That is the population.', show: 'm.0', focus: 'm.0' },
        { say: 'We surveyed 100 of them at random. Those 100 families are the sample.', show: 'm.1', focus: 'm.1' },
        { say: 'Step two. The mean amount spent by all the families at the school is what we want to know. It describes the population, so it is the parameter.', show: 'm.2', focus: 'm.2' },
        { say: 'The mean amount spent by the 100 families in the sample describes the sample, so it is the statistic. We use it to estimate the parameter.', show: 'm.3', focus: 'm.3' },
        { say: 'Step three. What we measure is the amount of money one family spends on uniforms in a year. It changes from family to family, so it is the variable.', show: 'm.4', focus: 'm.4' },
        { say: 'And the actual amounts, 65 dollars, 75 dollars and 95 dollars, are the data.', caption: 'And the actual amounts, $65, $75 and $95, are the data.', show: 'm.5', focus: 'm.5' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\textbf{P}\\text{opulation} \\leftrightarrow \\textbf{P}\\text{arameter} \\ \\checkmark', '\\textbf{S}\\text{ample} \\leftrightarrow \\textbf{S}\\text{tatistic} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check with a memory trick. Population and parameter both start with "P", and the parameter is the mean of all the families. Yes.', show: 'm.0', focus: 'm.0' },
        { say: 'Sample and statistic both start with "S", and the statistic is the mean of the 100 surveyed. It checks out.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Trap', 'What goes wrong'],
          rows: [
            ['population: the $100$ families', 'those were **asked**: they are the **sample**'],
            ['parameter: mean of the $100$', 'that describes the sample: it is a **statistic**'],
            ['variable: \\$65', 'one **value** is data; the variable is the **amount spent**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'The 100 families are not the population. They are the ones who were asked, so they are the sample.' },
        { say: 'The mean of the 100 families describes the sample, so it is a statistic, not the parameter.' },
        { say: 'And 65 dollars is one value: a piece of data. The variable is the amount spent, which can take many values.', caption: 'And $65 is one value: a piece of data. The variable is the amount spent, which can take many values.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'In a survey of $500$ teenagers chosen at random from a city, $62\\%$ have a part-time job. In this study, what is $62\\%$?',
          choices: ['a statistic', 'a parameter', 'a population', 'a variable'],
          answer: 0,
          working: '62% describes the 500 in the sample, so it is a statistic.',
        },
      ],
      lines: [
        { say: 'Your turn. In a survey of 500 teenagers chosen at random from a city, 62 percent have a part-time job. In this study, what is 62 percent? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '62 percent describes the 500 teenagers who were surveyed: the sample. A number that describes a sample is a statistic. Choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['**Population**: everyone; **sample**: those asked', '**Parameter** describes the population', '**Statistic** describes the sample', '**Variable**: what is measured; **data**: the values'] }],
      lines: [
        { say: 'Here is what to remember. The population is everyone we want to know about, and the sample is those we ask.', show: 'sum.0' },
        { say: 'A parameter describes the population.', show: 'sum.1' },
        { say: 'A statistic describes the sample.', show: 'sum.2' },
        { say: 'And the variable is what is measured, while the data are the values. For more on developing a project plan, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
