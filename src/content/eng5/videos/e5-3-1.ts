import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e5-3-1',
  lessonId: 'e5-3-1',
  title: 'Main Idea and Supporting Details',
  summary:
    'The topic is what a paragraph is about, in a word or two, and the main idea is the writer’s most important point about it. Supporting details are the facts, examples and reasons that explain or prove the main idea.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Reading for Information', title: 'Main Idea and Supporting Details', subtitle: 'What is this mostly about?' }],
      lines: [
        { say: 'Stories are not the only things we read. Every day, we also read to learn: a page about volcanoes, a sign at the zoo, or an article about a new playground. These are informational texts.', show: 'title' },
        { say: 'The first question to ask about any of them is: what is this mostly about? In this lesson, you will learn to find the main idea, and the details that support it.' },
      ],
    },
    {
      chapter: 'Topic and main idea',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Topic and main idea', md: 'The **topic** is the subject, in a word or two: *bees*. The **main idea** is the most important point the writer makes about it, as a full sentence: *Bees are important because they help plants grow.*' },
      ],
      lines: [
        { say: 'The topic is the subject of a paragraph, in a word or two. For example, bees.', show: 'def' },
        { say: 'The main idea is the most important point the writer makes about the topic, written as a full sentence. Bees are important because they help plants grow.', focus: 'def' },
        { say: 'The main idea is often stated in the first or last sentence of a paragraph, but not always. If it is not stated, ask: what do all the sentences have in common?' },
      ],
    },
    {
      chapter: 'Finding the main idea',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['Camels are well suited to life in the desert. Their humps store fat, which their bodies can use for energy when food is hard to find. Thick eyelashes keep sand out of their eyes, and wide feet stop them from sinking into soft sand.'] },
        { kind: 'text', id: 'ans', size: 'md', md: '**Main idea:** Camels are well suited to life in the desert.' },
      ],
      lines: [
        { say: 'What is the main idea of this paragraph?', show: 'q' },
        { say: 'First, find the topic. Every sentence is about camels.' },
        { say: 'Then look at what the sentences share. Every sentence after the first gives one way that camels cope with the desert.' },
        { say: 'So the main idea is the first sentence: camels are well suited to life in the desert.', show: 'ans', focus: 'ans' },
      ],
    },
    {
      chapter: 'Supporting details',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Supporting details', md: '**Supporting details** are the facts, examples and reasons that explain or prove the main idea.' },
        { kind: 'table', id: 't', head: ['Main idea', 'Supporting details'], rows: [['Camels are suited to the desert.', 'Humps store fat. Eyelashes keep out sand. Wide feet do not sink.']] },
      ],
      lines: [
        { say: 'Supporting details are the facts, examples and reasons that explain or prove the main idea.', show: 'def' },
        { say: 'Think of a table. The main idea is the tabletop, and the details are the legs holding it up.', show: 't' },
        { say: 'In the camel paragraph, the humps, the eyelashes and the wide feet are the three legs. Each one shows how camels cope with the desert.', focus: 't' },
      ],
    },
    {
      chapter: 'Common mistakes',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'A detail is not the main idea', md: '“Camels have thick eyelashes” is true, but it is only one small part. The main idea covers the **whole** paragraph.' },
        { kind: 'callout', id: 'm2', tone: 'tip', title: 'Interesting is not the same as supporting', md: '“Camels can live for about forty years” is a fact about camels, but it does not show how they cope with the desert.' },
      ],
      lines: [
        { say: 'Here is a common mistake. Camels have thick eyelashes is true, and it is in the paragraph, but it is only one small part. The main idea covers the whole paragraph, not just one sentence of it.', show: 'm' },
        { say: 'Also, a sentence that is interesting but does not explain the main idea is not a supporting detail. Camels can live for about forty years is a fact about camels, but it does not show how they cope with the desert.', show: 'm2', focus: 'm2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: '“Owls are skilled night hunters. Their large eyes see in dim light. Their soft feathers let them fly silently. Their sharp hearing finds mice under snow.” What is the main idea?',
          choices: [
            'Owls have large eyes.',
            'Owls have soft feathers.',
            'Owls are skilled night hunters.',
            'Mice live under the snow.',
          ],
          answer: 2,
          working: 'Every other sentence gives one reason owls hunt well at night. Choices A and B are supporting details.',
        },
      ],
      lines: [
        { say: 'Your turn. Read the paragraph about owls, and choose the main idea. Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is C. Owls are skilled night hunters. Every other sentence gives one reason why, so Choices A and B are supporting details.', show: 'q2.answer' },
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
            'The **topic** is the subject; the **main idea** is the writer’s most important point about it.',
            'Look in the first or last sentence, or ask what all the sentences share.',
            '**Supporting details** explain or prove the main idea.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The topic is the subject, and the main idea is the writer’s most important point about it.', show: 'sum.0' },
        { say: 'Look for the main idea in the first or last sentence, or ask what all the sentences share.', show: 'sum.1' },
        { say: 'And supporting details explain or prove the main idea.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
