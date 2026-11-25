import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { crowd, join, lasso, note } from '@/content/math9/videos/lib/m9-10-figures.ts';

// Exam question for Math 9 lesson 10.1 (factors affecting data collection). The question is a Try
// It from OpenStax Introductory Statistics 2e, word for word (section 1.2, Data, Sampling, and
// Variation in Data and Sampling, CC BY-NC-SA 4.0). People at a music concert are more likely to
// prefer music, so the convenience sample is biased: 176 ÷ 200 = 88% music overstates what all
// 20,000 listeners want. It is not representative.

const QUESTION =
  'A local radio station has a fan base of 20,000 listeners. The station wants to know if its audience would prefer more music or more talk shows. Asking all 20,000 listeners is an almost impossible task. The station uses convenience sampling and surveys the first 200 people they meet at one of the station’s music concert events. 24 people said they’d prefer more talk shows, and 176 people said they’d prefer more music. Do you think that this sample is representative of (or is characteristic of) the entire 20,000 listener population?';

// The listeners as 60 dots, 12 to a row. About a third prefer talk shows, spread through the
// population, but the corner at the concert (columns 0 to 3 of rows 3 and 4) is all music fans.
const TALK = new Set([1, 4, 6, 9, 10, 13, 15, 19, 22, 26, 29, 31, 34, 41, 44, 47, 53, 56, 57, 59]);

const listeners = (id: string) =>
  figure(
    id,
    [
      join(
        crowd({ count: 60, cols: 12, groups: [{ id: 'music', tone: 'adj' }, { id: 'talk', tone: 'opp' }], groupOf: (i) => (TALK.has(i) ? 'talk' : 'music') }),
        lasso({ id: 'concert', c: [1.5, -3.5], rx: 2.3, ry: 1.2, tone: 'bad', label: '\\text{at the concert}', labelAt: [1.5, -4.7], place: 'below' }),
        note({ id: 'key', at: [-0.3, 1.1], tex: '\\adj{\\bullet}\\ \\text{prefers music}\\qquad \\opp{\\bullet}\\ \\text{prefers talk}', place: 'right' }),
      ),
    ],
    420,
  );

const PEOPLE = (id: string) => [`${id}.music`, `${id}.talk`, `${id}.key`];

const video: Explainer = {
  id: 'xq-m9-10-1',
  lessonId: '',
  exam: {
    lesson: 'm9-10-1',
    source: 'OpenStax, Introductory Statistics 2e, Try It in section 1.2, Data, Sampling, and Variation in Data and Sampling',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/introductory-statistics-2e/pages/1-2-data-sampling-and-variation-in-data-and-sampling',
    question: QUESTION,
  },
  title: 'Exam Question: Is the Radio Survey Fair? (Factors Affecting Data Collection)',
  thumbnailTitle: 'Is the Radio Survey Fair?',
  thumbnail: 'st',
  summary:
    'A real test question, solved one small step at a time: a radio station with 20,000 listeners wants to know if its audience would prefer more music or more talk shows. It surveys the first 200 people it meets at one of its music concerts: 24 prefer more talk shows and 176 prefer more music. Is the sample representative of all 20,000 listeners? No. People at a music concert are more likely to prefer music, so the sample is biased toward music, and its 88% for music probably overstates what all the listeners want. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Is the Radio Survey Fair?', subtitle: 'Factors affecting data collection, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about factors affecting data collection. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'A local radio station has a fan base of 20,000 listeners. The station wants to know if its audience would prefer more music or more talk shows. Asking all 20,000 listeners is an almost impossible task. The station uses convenience sampling and surveys the first 200 people they meet at one of the station’s music concert events. 24 people said they’d prefer more talk shows, and 176 people said they’d prefer more music. Do you think that this sample is representative of (or is characteristic of) the entire 20,000 listener population?',
          answer: 'No: concert-goers are more likely to prefer music, so the sample is biased',
          working: 'who was asked, and who was left out?',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'A local radio station has a fan base of 20 thousand listeners. The station wants to know if its audience would prefer more music or more talk shows. Asking all 20 thousand listeners is an almost impossible task.', caption: 'A local radio station has a fan base of 20,000 listeners. The station wants to know if its audience would prefer more music or more talk shows. Asking all 20,000 listeners is an almost impossible task.' },
        { say: 'The station uses convenience sampling, and surveys the first 200 people they meet at one of the station\'s music concert events. 24 people said they\'d prefer more talk shows, and 176 people said they\'d prefer more music.' },
        { say: 'Do you think that this sample is representative of, or is characteristic of, the entire 20 thousand listener population?', caption: 'Do you think that this sample is representative of (or is characteristic of) the entire 20,000 listener population?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 620,
      left: [listeners('ask')],
      right: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Representative', md: 'A sample is **representative** when it is like the whole **population**: the same kinds of people, in about the same **proportions**.' }],
      lines: [
        { say: 'Picture the listeners as dots. Some prefer music, and some prefer talk shows, all mixed together.', show: PEOPLE('ask') },
        { say: 'A sample is representative when it is like the whole population: the same kinds of people, in about the same proportions. Is the concert crowd like that?', show: 'c' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{convenience sample: whoever is easy to reach}', '\\text{bias: some answers are favoured}'] }],
      lines: [
        { say: 'Here is what we need. A convenience sample asks whoever is easy to reach.', show: 'm.0' },
        { say: 'That can cause bias: the way the data is collected favours some answers over others. Then the sample does not represent the population.', show: 'm.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Name the **population**', 'Name the **sample**, and where it came from', 'Ask: is the sample **like** the population?'] }],
      lines: [
        { say: 'Here is the plan. Name the population.', show: 'plan.0' },
        { say: 'Name the sample, and where it came from.', show: 'plan.1' },
        { say: 'Then ask: is the sample like the population?', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Who was asked?',
      layout: 'split',
      leftWidth: 620,
      left: [listeners('st')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{population: } 20\\,000 \\text{ listeners}', '\\text{sample: } 200 \\text{ at a concert}', '176 \\div 200 = 88\\% \\text{ music}', '\\bad{\\text{not representative}}'] }],
      lines: [
        { say: 'Here are the listeners again.', show: PEOPLE('st') },
        { say: 'Step one. The population is everyone the station wants to know about: all 20 thousand listeners.', caption: 'Step one. The population is everyone the station wants to know about: all 20,000 listeners.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two. The sample is the 200 people met at one of the station\'s music concerts. They were easy to reach, so it is a convenience sample.', show: ['m.1', 'st.concert'], focus: ['m.1', 'st.concert'] },
        { say: 'Step three. People who go to a music concert are more likely to prefer music. In the sample, 176 out of 200 chose music. That is 88 percent.', show: 'm.2', focus: ['m.2', 'st.concert'] },
        { say: 'Listeners who prefer talk shows are less likely to be at a concert, so they are left out. The sample is biased toward music. No, it is not representative.', show: 'm.3', focus: ['m.3', 'st.talk'] },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{who was left out? talk-show fans}', '\\text{fairer: a } \\textbf{random} \\text{ sample of all listeners}'] }],
      lines: [
        { say: 'Let us check by asking who was left out. Listeners who prefer talk shows mostly stay home from music concerts, so they had little chance to be asked.', show: 'm.0', focus: 'm.0' },
        { say: 'A fairer way is a random sample of all the listeners, so that every listener has the same chance to be chosen. That confirms it: this sample is not representative.', show: 'm.1', focus: 'm.1' },
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
            ['"Yes, 200 is plenty"', 'a big sample can still be **biased**: **where** it came from matters'],
            ['"No, 200 is too few"', 'samples are always smaller: the problem is **who** was asked'],
            ['"88% of all listeners want music"', 'the sample was biased, so it **overstates** music'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '"Yes, 200 people is plenty" misses the point. Even a big sample is biased if it comes from the wrong place.' },
        { say: '"No, because 200 is too few" gives the wrong reason. A sample is always smaller than the population. The problem is who was asked.' },
        { say: 'And saying 88 percent of all listeners want music trusts a biased sample. The true share is probably lower.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A school wants to know how its students get to school. It surveys the students waiting at the bus stop. What is wrong with this sample?',
          choices: ['Nothing: it is a fair sample', 'It is too small to use', 'It was taken in the morning', 'It favours bus riders: it is biased'],
          answer: 3,
          working: 'Everyone at the bus stop takes the bus, so walkers and riders in cars are left out.',
        },
      ],
      lines: [
        { say: 'Your turn. A school wants to know how its students get to school. It surveys the students waiting at the bus stop. What is wrong with this sample? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Everyone at the bus stop takes the bus. Students who walk or get a ride are left out, so the sample favours bus riders. It is biased. Choice "D".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Name the **population** and the **sample**', 'A convenience sample can be **biased**', 'Ask: who was **left out**?', 'Fairer: a **random** sample'] }],
      lines: [
        { say: 'Here is what to remember. Name the population and the sample.', show: 'sum.0' },
        { say: 'A convenience sample, of whoever is easy to reach, can be biased.', show: 'sum.1' },
        { say: 'Ask who was left out.', show: 'sum.2' },
        { say: 'And a random sample is fairer. For more on factors affecting data collection, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
