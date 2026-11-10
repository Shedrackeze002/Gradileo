import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e5-6-1',
  lessonId: 'e5-6-1',
  title: 'The Paragraph',
  summary:
    'A paragraph is a group of sentences about one main idea, with a topic sentence, body sentences and a closing sentence. The topic sentence must be wide enough to cover every detail, and every sentence should stay on topic.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Writing', title: 'The Paragraph', subtitle: 'One main idea, three parts' }],
      lines: [
        { say: 'Good paragraphs make writing easy to follow, because the reader always knows what each part is about.', show: 'title' },
        { say: 'In this lesson, you will learn the three parts of a paragraph, and how to keep every sentence on topic.' },
      ],
    },
    {
      chapter: 'The parts of a paragraph',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Paragraph', md: 'A **paragraph** is a group of sentences about one main idea. The **topic sentence** states the main idea; the **body** sentences support it; the **closing sentence** wraps it up.' },
      ],
      lines: [
        { say: 'A paragraph is a group of sentences about one main idea. It has three parts.', show: 'def' },
        { say: 'The topic sentence states the main idea. It usually comes first.', focus: 'def' },
        { say: 'The body sentences give details, examples and reasons that support the main idea.' },
        { say: 'And the closing sentence wraps up the paragraph, often by restating the main idea in new words.' },
      ],
    },
    {
      chapter: 'A paragraph about recess',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['**Recess is the best part of the school day.**', 'It gives us time to run around after sitting still all morning. We can play games with friends from other classes. Fresh air also helps us feel awake for the afternoon.', '**For all these reasons, recess is the part of the day I look forward to most.**'] },
      ],
      lines: [
        { say: 'Here is a paragraph. The first sentence is the topic sentence. Recess is the best part of the school day.', show: 'q.0', focus: 'q.0' },
        { say: 'The three sentences in the middle are the body. Each gives one reason: time to run around, games with friends, and fresh air.', show: 'q.1', focus: 'q.1' },
        { say: 'And the last sentence is the closing sentence. It says the main idea again, in new words.', show: 'q.2', focus: 'q.2' },
      ],
    },
    {
      chapter: 'Choosing a topic sentence',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['Some dogs guide people who cannot see. Others sniff out lost hikers in the mountains. Many dogs visit hospitals to cheer up patients.'] },
        { kind: 'text', id: 'ans', size: 'md', md: 'Topic sentence: *Dogs do many jobs that help people.*' },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'A topic sentence is not a detail', md: '“Some dogs guide people who cannot see” covers only one of the three jobs. A topic sentence must be wide enough to hold every detail.' },
      ],
      lines: [
        { say: 'Which topic sentence fits this body?', show: 'q' },
        { say: 'Every body sentence describes a way that dogs help people. The topic sentence must cover all three, not just one. Dogs do many jobs that help people.', show: 'ans', focus: 'ans' },
        { say: 'Here is a common mistake. Some dogs guide people who cannot see is too narrow to be the topic sentence, because it covers only one of the three jobs.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Keeping to the topic',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'key', title: 'Unity', md: 'A paragraph has **unity** when every sentence supports the main idea.' },
      ],
      lines: [
        { say: 'A paragraph has unity when every sentence supports the main idea.', show: 'def' },
        { say: 'A sentence that wanders off topic distracts the reader, even if it is interesting. So when you check a paragraph, hold each sentence up against the topic sentence, and take out any that do not belong.', focus: 'def' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: '“Penguins are birds that cannot fly. Their wings work like flippers for swimming. They waddle on land and slide on their bellies over ice. My uncle saw a penguin at the zoo last year.” Which sentence does not belong?',
          choices: [
            'Penguins are birds that cannot fly.',
            'Their wings work like flippers for swimming.',
            'They waddle on land and slide on their bellies over ice.',
            'My uncle saw a penguin at the zoo last year.',
          ],
          answer: 3,
          working: 'The paragraph is about how penguins move, since they cannot fly. The sentence about the writer’s uncle wanders off topic.',
        },
      ],
      lines: [
        { say: 'Your turn. Which sentence does not belong in this paragraph? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is D. The paragraph is about how penguins move, since they cannot fly. The sentence about the writer’s uncle is not about how penguins move, so it wanders off topic.', show: 'q2.answer' },
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
            'A paragraph has a **topic sentence**, **body** sentences and a **closing sentence**.',
            'The topic sentence must be wide enough to cover every detail.',
            'Every sentence should support the main idea.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A paragraph has a topic sentence, body sentences and a closing sentence.', show: 'sum.0' },
        { say: 'The topic sentence must be wide enough to cover every detail.', show: 'sum.1' },
        { say: 'And every sentence should support the main idea. Take out any that wander off topic.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
