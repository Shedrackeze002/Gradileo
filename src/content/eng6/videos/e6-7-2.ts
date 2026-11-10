import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e6-7-2',
  lessonId: 'e6-7-2',
  title: 'Informational Writing',
  summary:
    'An informational piece teaches the reader about a topic, with an introduction, body paragraphs that each cover one subtopic, and a conclusion. Transitions show time, examples, addition, contrast, cause and effect, and conclusions.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Writing', title: 'Informational Writing', subtitle: 'Structure and transitions' }],
      lines: [
        { say: 'A report on wolves, or an article about the solar system, teaches the reader about a topic.', show: 'title' },
        { say: 'To do that well, it needs a clear structure, and words that lead the reader from one idea to the next.' },
      ],
    },
    {
      chapter: 'Introduction, body and conclusion',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Informational writing', md: 'An **informational** piece teaches the reader about a topic. It has an **introduction**, **body paragraphs** and a **conclusion**.' },
        {
          kind: 'table',
          id: 't',
          head: ['Part', 'Its job'],
          rows: [
            ['**Introduction**', 'names the topic, hooks the reader with a fact or question, and says what the piece will cover'],
            ['**Body paragraphs**', 'each covers one **subtopic**, starting with a topic sentence'],
            ['**Conclusion**', 'sums up the main ideas and leaves a final thought'],
          ],
        },
      ],
      lines: [
        { say: 'An informational piece teaches the reader about a topic. It has three parts.', show: 'def' },
        { say: 'The introduction names the topic, hooks the reader with an interesting fact or question, and often says what the piece will cover.', show: 't', focus: 't.0' },
        { say: 'Each body paragraph covers one subtopic. It starts with a topic sentence, and gives facts, examples and details.', focus: 't.1' },
        { say: 'And the conclusion sums up the main ideas, and leaves the reader with a final thought.', focus: 't.2' },
      ],
    },
    {
      chapter: 'Planning a report',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Plan 1', 'Plan 2'], rows: [['Intro; Mars; the Sun; Saturn; Earth; my opinion', 'Intro; the Sun; the rocky planets; the gas giants; conclusion']] },
        { kind: 'callout', id: 'm', tone: 'mistake', title: '“The end” is not a conclusion', md: '“Thank you for reading my report” tells the reader nothing. Remind them of the big idea instead.' },
      ],
      lines: [
        { say: 'A student is writing about the solar system. Which plan is clearer?', show: 't' },
        { say: 'The first jumps between topics in no clear order, and ends with an opinion. The second groups related planets together, and moves from the centre outwards. So the second plan is clearer.', focus: 't' },
        { say: 'Here is a common mistake. Thank you for reading my report tells the reader nothing. A conclusion should remind them of the big idea, like recycling is a small habit that makes a big difference.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Transitions',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Transitions', md: '**Transitions** are words and phrases that show how ideas connect.' },
        {
          kind: 'table',
          id: 't',
          head: ['To show', 'Transitions'],
          rows: [
            ['time or order', '*first, next, then, afterwards, finally*'],
            ['an example', '*for example, for instance, such as*'],
            ['addition', '*also, in addition, furthermore, another*'],
            ['contrast', '*however, in contrast, on the other hand, instead*'],
            ['cause and effect', '*because, as a result, therefore, so*'],
            ['a conclusion', '*in summary, in conclusion, overall*'],
          ],
        },
      ],
      lines: [
        { say: 'Transitions are words and phrases that show how ideas connect.', show: 'def' },
        { say: 'First, next and finally show time or order. For example and for instance give an example.', show: 't', focus: ['t.0', 't.1'] },
        { say: 'Also and in addition add another idea. However and in contrast show a difference.', focus: ['t.2', 't.3'] },
        { say: 'As a result and therefore show cause and effect. And in summary, or in conclusion, begin a conclusion.', focus: ['t.4', 't.5'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: '“Frogs have smooth skin. ____, toads have dry, bumpy skin.” Which transition fits best?',
          choices: ['For example', 'In contrast', 'As a result', 'First'],
          answer: 1,
          working: 'The second sentence shows a difference from the first, so it needs a contrast transition.',
        },
      ],
      lines: [
        { say: 'Your turn. Which transition fits the gap best? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is B, in contrast. The second sentence shows a difference from the first, so it needs a contrast transition. However would also work.', show: 'q2.answer' },
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
            'An **introduction**, **body paragraphs** (one subtopic each) and a **conclusion**.',
            'Each body paragraph starts with a topic sentence.',
            '**Transitions** show time, examples, addition, contrast, cause and effect.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An informational piece has an introduction, body paragraphs with one subtopic each, and a conclusion.', show: 'sum.0' },
        { say: 'Each body paragraph starts with a topic sentence.', show: 'sum.1' },
        { say: 'And transitions show time, examples, addition, contrast, cause and effect, and conclusions.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
