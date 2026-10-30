import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e10-1-4',
  lessonId: 'e10-1-4',
  title: 'Point of View',
  summary:
    'The narrator’s point of view decides what we learn and whom we trust. Stories are told in first, second or third person, and third person may be limited, omniscient or objective; unreliable narrators cannot be fully trusted.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [
        { kind: 'title', id: 'title', kicker: 'Short Stories', title: 'Point of View', subtitle: 'Who is telling the story?' },
        { kind: 'quote', id: 'q', size: 'md', lines: ['How, then, am I mad?', 'Hearken! and observe how healthily—how calmly I can tell you the whole story.'], by: 'Edgar Allan Poe, “The Tell-Tale Heart”' },
      ],
      lines: [
        { say: '“The Tell-Tale Heart” begins with a voice talking straight at you.', show: 'title' },
        { say: 'Who is speaking, and can we believe him?', show: 'q' },
        { say: 'Every story is told by a narrator, and the narrator’s point of view decides what we learn, what stays hidden, and whom we trust. In this lesson, you will identify the main points of view.' },
      ],
    },
    {
      chapter: 'First, second and third person',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**First person**: a character in the story says “I”',
            '**Second person**: the story is told to “you”',
            '**Third person**: an outside narrator uses names and “he”, “she” or “they”',
          ],
        },
      ],
      lines: [
        { say: 'The narrator is the voice that tells the story, and the point of view is the position it is told from.' },
        { say: 'In first person, the narrator is a character in the story and says “I”. Poe’s narrator is a first-person narrator.', show: 'b.0', focus: 'b.0' },
        { say: 'In second person, the story is told to “you”, as if you were the main character. It is rare in short stories.', show: 'b.1', focus: 'b.1' },
        { say: 'In third person, the narrator stands outside the story and uses names, and words like he, she and they.', show: 'b.2', focus: 'b.2' },
      ],
    },
    {
      chapter: 'Three kinds of third person',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Third person', 'Whose thoughts we learn', 'Like …'],
          rows: [
            ['**Limited**', 'one character’s only', 'a shoulder to ride on'],
            ['**Omniscient**', 'any character’s, and more', 'looking down from above'],
            ['**Objective**', 'no one’s', 'a camera and a microphone'],
          ],
        },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Count the minds', md: 'One mind is limited. More than one is omniscient. None is objective.' },
      ],
      lines: [
        { say: 'There are three kinds of third person. Third person limited reveals the thoughts of one character only, like riding on that character’s shoulder.', show: 't.0', focus: 't.0' },
        { say: 'Omniscient reveals any character’s thoughts, and things no character knows, like looking down from above.', show: 't.1', focus: 't.1' },
        { say: 'Objective reveals no one’s thoughts, only what can be seen and heard, like a camera and a microphone.', show: 't.2', focus: 't.2' },
        { say: 'To tell them apart, count the minds the narrator enters.', show: 'tip', focus: 'tip' },
      ],
    },
    {
      chapter: 'What a narrator can know',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'ex',
          items: [
            'Amara slid the letter across the kitchen table to Wei.',
            'Amara had rehearsed what to say all morning, but now the words would not come.',
            'Wei recognized the handwriting at once and felt a sudden drop inside.',
          ],
        },
        { kind: 'text', id: 'ans', size: 'md', md: 'In a story limited to Amara, **sentence 3** cannot appear.' },
      ],
      lines: [
        { say: 'A story is told in third person limited from Amara’s point of view. Which of these sentences could not appear in it?' },
        { say: 'Sentence one is an action anyone could see. Sentence two shows Amara’s own thoughts, which this narrator can enter.', show: ['ex.0', 'ex.1'], focus: ['ex.0', 'ex.1'] },
        { say: 'Sentence three shows what Wei feels inside, and a limited narrator cannot enter Wei’s mind. That sentence breaks the point of view.', show: ['ex.2', 'ans'], focus: 'ex.2' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: '“You” and “I” in dialogue do not decide the point of view', md: 'Characters say “I” and “you” in every kind of story. Look at the narration **outside** the quotation marks.' },
      ],
      lines: [
        { say: 'Here is a common mistake. Characters say “I” and “you” to each other in every kind of story, so dialogue does not decide the point of view.', show: 'm' },
        { say: 'Look at the narration outside the quotation marks. O. Henry’s narrator in “The Gift of the Magi” speaks to the reader as “you”, but the story is still told in the third person.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A story is told in third person limited from Amara’s point of view. Which sentence could not appear in it?',
          choices: [
            'Amara slid the letter across the kitchen table to Wei, in silence.',
            'Amara had practised the words all morning, but none would come.',
            'Wei knew the handwriting at once and felt a sudden drop inside.',
            'Amara felt a warm flush rise as the whole kitchen went quiet.',
          ],
          answer: 2,
          working: 'A limited narrator can enter only Amara’s mind, so Wei’s inner feelings cannot appear.',
        },
      ],
      lines: [
        { say: 'Your turn. A story is told in third person limited from Amara’s point of view. Which sentence could not appear in it? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is C. A limited narrator can enter only Amara’s mind, so Wei’s inner feelings cannot appear.', show: 'q2.answer' },
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
            'First person says “I”; second person speaks to “you”; third person stands outside.',
            'Third person is limited, omniscient or objective.',
            'An unreliable narrator cannot be fully trusted.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. First person says “I”, second person speaks to “you”, and third person stands outside the story.', show: 'sum.0' },
        { say: 'Third person can be limited, omniscient or objective, depending on how many minds the narrator enters.', show: 'sum.1' },
        { say: 'And an unreliable narrator, like Poe’s, cannot be fully trusted, so look for contradictions between what they claim and what they show.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
