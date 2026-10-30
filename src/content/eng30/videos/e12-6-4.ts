import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e12-6-4',
  lessonId: 'e12-6-4',
  title: 'Reflective Writing',
  thumbnailTitle: 'Reflective Writing',
  thumbnail: false,
  summary:
    'A reflective essay moves from a specific moment to an insight that the moment has earned. Learn to avoid narration without thinking, vague generalities and tacked-on morals, and to let the then voice and the now voice both be heard.',
  scenes: [
    {
      layout: 'center',
      main: [
        { kind: 'title', id: 'title', kicker: 'Writing', title: 'Reflective Writing', subtitle: 'From a moment to an insight' },
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['Every Thursday an old man paid for his groceries in coins, counting them out of a cloth purse one at a time while the line behind him grew. For months I hurried him, sliding the coins into my palm before he had finished. One week he paused, smiled and said that counting was the only arithmetic he still did. I had thought I was saving him time. I had been taking away the one part of the errand that was still his.'],
        },
      ],
      lines: [
        { say: 'Here is a paragraph from a reflective essay about a part-time job. Notice where the detail is, and where the thinking begins.', show: ['title', 'q'] },
        { say: 'A reflective essay tells a piece of your own experience and thinks about what it meant. In this lesson, you will learn to move from a specific moment to an insight that the moment has earned.' },
      ],
    },
    {
      chapter: 'From experience to insight',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Experience**: the coins, the cloth purse, the growing line',
            '**Insight**: I had been taking away the one part of the errand that was still his',
          ],
        },
      ],
      lines: [
        { say: 'Reflective writing moves between two things: a specific experience, told in precise detail, and an insight into what it meant.', show: 'b.0', focus: 'b.0' },
        { say: 'In the paragraph, the first three sentences are the experience. The last two are the insight, and they are earned, because they come from a particular moment, his remark about arithmetic, and turn back on the writer’s own behaviour.', show: 'b.1', focus: 'b.1' },
        { say: 'Nothing in them could have been written by someone who was not there. An insight can also be a changed understanding of another person, of yourself, or of an idea.' },
      ],
    },
    {
      chapter: 'Three ways reflection fails',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Narration only**: a vivid account that never says what it meant',
            '**Vague generality**: large truths about life, with no specific detail',
            '**Tacked-on moral**: a lesson that has nothing to do with the details',
          ],
        },
      ],
      lines: [
        { say: 'Reflection fails in three common ways.' },
        { say: 'Narration only gives a vivid account of what happened, and never says what it meant. A vague generality offers large truths about courage or family, with no specific detail at all.', show: ['b.0', 'b.1'] },
        { say: 'And a tacked-on moral follows a real story with a lesson that has nothing to do with its details.', show: 'b.2', focus: 'b.2' },
      ],
    },
    {
      chapter: 'Then and now',
      layout: 'center',
      main: [
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['At the time, I thought the coach had benched me to punish me. Only later did I see that she had kept me off the court so that I would watch how the others moved without the ball.'],
        },
        {
          kind: 'bullets',
          id: 'b',
          items: ['**Then**: *at the time*, *I had thought*', '**Now**: *only later*'],
        },
      ],
      lines: [
        { say: 'A reflective essay has two narrators: the person you were then, inside the experience, and the person you are now, looking back.', show: 'b' },
        { say: 'The then voice gives the experience its freshness. The now voice gives it meaning. Signals such as at the time and only later mark the move from one to the other.', hide: 'b', show: 'q' },
        { say: 'Specific detail matters too. My grandmother was a kind person tells the reader what to feel. A jar of mint sweets by the door for the mail carrier lets the reader see.' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['**Unearned**: In the end, this experience taught me that family is the most important thing.', '**Earned**: What this experience showed me that no other could.'],
        },
      ],
      lines: [
        { say: 'Here is a common mistake: the lesson in the last line. A sentence like this could end almost any essay, which is the problem.', show: 'b.0' },
        { say: 'If your final sentence could be pasted onto someone else’s story, it has not been earned. Replace it with what this experience showed you that no other could.', show: 'b.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A writer hurried an old man who paid in coins. Which sentence is an earned insight?',
          choices: [
            'This taught me that patience is a virtue, and everyone deserves kindness.',
            'I thought I was saving him time, but I had taken the last part of the errand that was his.',
            'It was a very emotional moment, and I felt so many powerful things at once.',
            'He counted each coin from a cloth purse while the line behind him grew longer.',
          ],
          answer: 1,
          working: 'B grows from a particular detail and turns back on the writer. A is a tacked-on moral, C is a vague generality and D is narration only.',
        },
      ],
      lines: [
        { say: 'Your turn. A writer hurried an old man who paid in coins. Which sentence is an earned insight? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is B. It grows from a particular detail and turns back on the writer. A is a tacked-on moral, C is a vague generality, and D is narration only.', show: 'q2.answer' },
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
            'Join a specific experience to an earned insight.',
            'Avoid narration alone, vague generality and tacked-on morals.',
            'Let the reader hear both the then voice and the now voice.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Reflective writing joins a specific experience to an insight that the detail has earned.', show: 'sum.0' },
        { say: 'Narration alone, vague generality and a tacked-on moral all fall short.', show: 'sum.1' },
        { say: 'And let the reader hear both the then voice and the now voice.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
