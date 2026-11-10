import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e7-7-1',
  lessonId: 'e7-7-1',
  title: 'The Paragraph',
  summary:
    'A paragraph has a topic sentence, supporting details and a concluding sentence, and a good topic sentence is focused and makes a clear point. A paragraph has unity when every sentence supports the main idea, and coherence when its sentences follow a logical order.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Writing', title: 'The Paragraph', subtitle: 'The building block of writing' }],
      lines: [
        { say: 'A paragraph is a group of sentences about one main idea.', show: 'title' },
        { say: 'Strong paragraphs are the building blocks of every essay, report and story, and they share the same shape. In this video we learn that shape, and how to keep a paragraph on track.' },
      ],
    },
    {
      chapter: 'Parts of a paragraph',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Parts of a paragraph', md: 'The **topic sentence** states the main idea, usually first. **Supporting details** (reasons, facts, examples and explanations) back it up. The **concluding sentence** wraps up the point.' },
        {
          kind: 'table',
          id: 't',
          head: ['Topic sentence', 'Problem'],
          rows: [
            ['*The history of the whole world is interesting.*', 'far too broad'],
            ['*Bicycles were invented a long time ago.*', 'a single fact with nothing to support'],
            ['*Cycling to school has many benefits for students.*', '**just right**'],
          ],
        },
      ],
      lines: [
        { say: 'A paragraph has three parts. The topic sentence states the main idea of the paragraph, and it usually comes first.', show: 'def' },
        { say: 'Supporting details, such as reasons, facts, examples and explanations, back up the main idea. And the concluding sentence wraps up the point, and often links to the next idea.', focus: 'def' },
        { say: 'A good topic sentence is focused. The history of the whole world is interesting is far too broad for one paragraph.', show: 't', focus: 't.0' },
        { say: 'Bicycles were invented a long time ago is a single fact, with nothing to support. But cycling to school has many benefits for students is just right.', focus: ['t.1', 't.2'] },
      ],
    },
    {
      chapter: 'Choosing a topic sentence',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['They carry pollen from flower to flower. Without them, crops such as apples and almonds would produce far less fruit. Farmers even rent hives to pollinate their fields.'] },
        { kind: 'text', id: 'a', size: 'lg', md: '**Bees are vital to growing our food.**' },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Make a point, not an announcement', md: '*This paragraph is going to be about school uniforms* only announces a topic. *Uniforms reduce pressure to wear expensive clothes* makes a **point**.' },
      ],
      lines: [
        { say: 'These are the supporting details of a paragraph. What should its topic sentence be?', show: 'q' },
        { say: 'Every detail is about bees helping crops grow, so the topic sentence must make that point. Bees are vital to growing our food.', show: 'a' },
        { say: 'In an essay, a topic sentence should make a clear point, not just announce a topic. This paragraph is going to be about school uniforms only announces. Uniforms reduce pressure on students to wear expensive clothes makes a point.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Unity and coherence',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Unity and coherence', md: 'A paragraph has **unity** when every sentence supports the main idea. It has **coherence** when its sentences follow a logical order and connect smoothly, often with transitions such as *first*, *also*, *however* and *as a result*.' },
        {
          kind: 'table',
          id: 't',
          head: ['Order', 'Use it for'],
          rows: [
            ['**time order**: first, next, then, finally', 'instructions and stories'],
            ['**order of importance**', 'arguments'],
            ['**space order**', 'describing a place'],
          ],
        },
      ],
      lines: [
        { say: 'A paragraph has unity when every sentence supports the main idea.', show: 'def' },
        { say: 'It has coherence when its sentences follow a logical order and connect smoothly, often with transitions such as first, also, however and as a result.', focus: 'def' },
        { say: 'Choose an order that suits the paragraph. Use time order for instructions and stories, order of importance for arguments, and space order for describing a place.', show: 't' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A paragraph begins: “Parrots are a bigger commitment than most people realize.” Which of its sentences breaks the unity?',
          choices: ['Many parrots can live for more than fifty years.', 'Some parrots need hours of attention every day.', 'Parrots can be noisy, especially in the morning.', 'My grandmother has a parrot called Rio.'],
          answer: 3,
          working: 'The main idea is that parrots are a big commitment. A long life, needing attention and noise all support it, but Rio adds nothing to the point.',
        },
      ],
      lines: [
        { say: 'Your turn. A paragraph begins, parrots are a bigger commitment than most people realize. Which of its sentences breaks the unity? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is D. The main idea is that parrots are a big commitment. A long life, needing attention, and being noisy all support it, but grandmother’s parrot Rio adds nothing to the point.', show: 'q2.answer' },
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
            'A paragraph has a **topic sentence**, **supporting details** and a **concluding sentence**.',
            'A good topic sentence is focused and makes a clear point.',
            '**Unity**: every sentence supports the main idea.',
            '**Coherence**: a logical order, linked by transitions.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A paragraph has a topic sentence, supporting details and a concluding sentence.', show: 'sum.0' },
        { say: 'A good topic sentence is focused and makes a clear point.', show: 'sum.1' },
        { say: 'A paragraph has unity when every sentence supports the main idea.', show: 'sum.2' },
        { say: 'And it has coherence when its sentences follow a logical order, linked by transitions.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
