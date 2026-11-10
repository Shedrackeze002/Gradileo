import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e6-1-4',
  lessonId: 'e6-1-4',
  title: 'Theme',
  summary:
    'A theme is a message about life or people that a story shows, written as a full sentence, while a topic is just a word or phrase. A theme is not a summary, and it is supported with evidence from the story.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Stories', title: 'Theme', subtitle: 'The bigger idea behind a story' }],
      lines: [
        { say: 'When you finish a good story, it often leaves you thinking about something bigger than the plot: about friendship, honesty, or growing up.', show: 'title' },
        { say: 'In this lesson, you will learn to state a story’s theme clearly, and to back it up with evidence from the story.' },
      ],
    },
    {
      chapter: 'Topic and theme',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Theme', md: 'A **theme** is a message about life or people that a story shows, written as a **full sentence**. A **topic** is just the subject, in a word or phrase.' },
        {
          kind: 'table',
          id: 't',
          head: ['Topic', 'Theme'],
          rows: [
            ['Friendship', 'True friends help each other in hard times.'],
            ['Courage', 'Being brave means acting even when you are afraid.'],
            ['Honesty', 'Telling the truth is worth the risk of trouble.'],
          ],
        },
      ],
      lines: [
        { say: 'A theme is a message about life or people that a story shows. It is written as a full sentence.', show: 'def' },
        { say: 'A topic is just the subject, in a word or phrase, like friendship, courage or honesty.', focus: 'def' },
        { say: 'Friendship is a topic. True friends help each other in hard times is a theme.', show: 't', focus: 't.0' },
        { say: 'Courage is a topic. Being brave means acting even when you are afraid is a theme.', focus: 't.1' },
      ],
    },
    {
      chapter: 'Finding the theme of a fable',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['The Hare laughed at the slow Tortoise and agreed to race him. Far ahead, the Hare lay down for a nap. When he woke, the Tortoise, who had never stopped, was crossing the finish line.'], by: 'Aesop, “The Tortoise and the Hare”, retold' },
        { kind: 'text', id: 'ans', size: 'md', md: '**Theme:** Slow and steady effort can beat speed.' },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'A theme is not a summary', md: '“A tortoise beats a hare in a race” retells the plot. A theme says something true about **people in general**.' },
      ],
      lines: [
        { say: 'What is the theme of this fable?', show: 'q' },
        { say: 'First, what happens? The fast but careless Hare loses, and the slow but steady Tortoise wins.', focus: 'q' },
        { say: 'Then ask what that shows about life in general, not just about these animals. Slow and steady effort can beat speed.', show: 'ans', focus: 'ans' },
        { say: 'Here is a common mistake. A tortoise beats a hare in a race only retells the plot. A theme steps back from the characters, and says something true about people in general.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Evidence for a theme',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Good evidence answers: **how does the story show this?**' },
        { kind: 'bullets', id: 'b', items: ['what the main character **learns**, or how they **change**', 'the **climax** and the **ending**', 'what characters **say** about the events'] },
      ],
      lines: [
        { say: 'A theme must be supported by evidence: events, actions or words from the story that show the message in action. Good evidence answers the question, how does the story show this?', show: 'q' },
        { say: 'To find evidence, look at what the main character learns, or how they change.', show: 'b.0' },
        { say: 'Look at the climax and the ending, where the message is often clearest.', show: 'b.1' },
        { say: 'And look at what characters say about the events.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: '“Mia stared at the broken cookie jar. She could blame the cat. Instead, she went to find her mother. ‘I broke it,’ she said.” Theme: It is brave to admit your mistakes. Which part best supports it?',
          choices: [
            'Mia stared at the broken cookie jar.',
            'She could blame the cat.',
            'There was a cookie jar in the kitchen.',
            'Instead, she went to find her mother. ‘I broke it,’ she said.',
          ],
          answer: 3,
          working: 'Going to her mother and admitting it is the brave act the theme describes. The first sentence only sets up the problem.',
        },
      ],
      lines: [
        { say: 'Your turn. Which part of the passage best supports the theme? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is D. Going to her mother and saying I broke it is the brave act the theme describes. Staring at the broken jar only sets up the problem.', show: 'q2.answer' },
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
            'A **topic** is a word or phrase; a **theme** is a full sentence about life.',
            'A theme is not a summary of the plot.',
            'Support a theme with **evidence**: what characters learn, the climax, the ending.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A topic is a word or phrase, and a theme is a full sentence about life.', show: 'sum.0' },
        { say: 'A theme is not a summary of the plot.', show: 'sum.1' },
        { say: 'And support a theme with evidence: what characters learn, the climax, the ending, and what characters say.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
