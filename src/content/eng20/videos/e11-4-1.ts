import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e11-4-1',
  lessonId: 'e11-4-1',
  title: 'The Essay: Kinds and Central Ideas',
  thumbnailTitle: 'The Essay',
  thumbnail: false,
  summary:
    'Expository, argumentative, personal and satirical essays do different jobs, so ask what the writer is mainly doing. Then find the central idea, whether it is stated in one sentence or implied by the details.',
  scenes: [
    {
      layout: 'center',
      main: [
        { kind: 'title', id: 'title', kicker: 'The Essay and Rhetoric', title: 'Kinds of Essay and Central Ideas', subtitle: 'What is the writer doing?' },
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['Some books are to be tasted, others to be swallowed, and some few to be chewed and digested …'],
          by: 'Francis Bacon, “Of Studies” (1625)',
        },
      ],
      lines: [
        { say: 'In sixteen twenty-five, Francis Bacon began an essay with a sentence that still sounds like a teacher’s advice.', show: ['title', 'q'] },
        { say: 'The word essay comes from the French essayer, which means to try. An essay is an attempt to think something through on the page. In this lesson, you will tell the kinds of essay apart, and find an essay’s central idea.' },
      ],
    },
    {
      chapter: 'Four kinds of essay',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Expository**: explains or informs',
            '**Argumentative**: takes a position and supports it',
            '**Personal**: explores the writer’s own experience',
            '**Satirical**: mocks a target to criticize it',
          ],
        },
      ],
      lines: [
        { say: 'The quickest test is to ask what the writer is mainly doing. An expository essay explains or informs, setting out facts, causes or processes without arguing for one side.', show: 'b.0', focus: 'b.0' },
        { say: 'An argumentative essay takes a position and supports it with reasons and evidence.', show: 'b.1', focus: 'b.1' },
        { say: 'A personal essay explores the writer’s own experience, and what the writer has come to understand from it.', show: 'b.2', focus: 'b.2' },
        { say: 'And a satirical essay uses irony, exaggeration or mock seriousness to make a target look ridiculous.', show: 'b.3', focus: 'b.3' },
      ],
    },
    {
      chapter: 'The central idea',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Central idea', md: 'The main point the **whole** passage makes: **stated** in a sentence, or **implied** by the details.' },
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['Our life is frittered away by detail.', 'An honest man has hardly need to count more than his ten fingers, or in extreme cases he may add his ten toes, and lump the rest.', 'Simplicity, simplicity, simplicity!'],
          by: 'Henry David Thoreau, Walden (1854)',
        },
      ],
      lines: [
        { say: 'The central idea is the main point the whole passage makes. A stated idea appears in a sentence of its own. An implied idea is never stated, so the reader works it out from what all the details have in common.', show: 'def' },
        { say: 'Older essays often pack an idea into a striking image. Thoreau says an honest man need hardly count past his ten fingers.', show: ['q.0', 'q.1', 'q.2'], focus: ['q.1'] },
        { say: 'He does not really want readers to count on their toes. His point is that people waste their lives on unnecessary detail, and should simplify them.', focus: ['q.0', 'q.2'] },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'm',
          tone: 'mistake',
          title: 'Four ways to misread a central idea',
          md: 'Rule out statements that **repeat one detail**, are **too broad** to say anything, take a **figure of speech literally**, or say the **opposite** of the passage.',
        },
      ],
      lines: [
        { say: 'Here is a common mistake. A statement of the central idea must cover the whole passage.', show: 'm' },
        { say: 'For Thoreau, People should count on their fingers, repeats one detail and takes a figure literally. Life is complicated is too broad. And A busy life with many affairs is best says the opposite.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'An essay opens: “For a whole term I slept four hours a night and called it ambition.” What kind is it?',
          choices: [
            'Expository, because it explains how sleep works.',
            'Argumentative, because it takes a firm position.',
            'Satirical, because it mocks a target to criticize it.',
            'Personal, because it reflects on the writer’s own life.',
          ],
          answer: 3,
          working: 'The writer speaks as “I” and remembers his own experience, so the essay is personal.',
        },
      ],
      lines: [
        { say: 'Your turn. An essay opens: For a whole term I slept four hours a night and called it ambition. What kind of essay is it? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is D. The writer speaks as I and remembers his own experience, so the essay is personal.', show: 'q2.answer' },
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
            'Expository explains; argumentative argues; personal reflects; satirical mocks.',
            'The central idea is the main point of the whole passage, stated or implied.',
            'Test it against every detail.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An expository essay explains, an argumentative essay argues, a personal essay reflects, and a satirical essay mocks.', show: 'sum.0' },
        { say: 'The central idea is the main point of the whole passage, either stated in one sentence or implied by the details.', show: 'sum.1' },
        { say: 'And always test your statement of it against every detail.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
