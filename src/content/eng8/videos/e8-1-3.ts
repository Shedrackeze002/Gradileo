import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e8-1-3',
  lessonId: 'e8-1-3',
  title: 'Narrator and Point of View',
  summary:
    'The narrator is the voice that tells a story, and the point of view is the position it tells from: first person, second person, third-person limited or third-person omniscient. The choice of narrator shapes what readers know, and an unreliable narrator cannot be fully trusted.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Fiction', title: 'Narrator and Point of View', subtitle: 'Who tells the story changes the story' }],
      lines: [
        { say: 'Every story is told by someone, and that someone decides what we see, what we know, and what stays hidden.', show: 'title' },
        { say: 'In this video we identify the main kinds of narrator, and explain how a narrator’s point of view, and their honesty, shape a story.' },
      ],
    },
    {
      chapter: 'Narrator and point of view',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Narrator and point of view', md: 'The **narrator** is the voice that tells the story. It is not always the author: a writer can invent a narrator who is a child, a villain or even an animal. The **point of view** is the position the narrator tells the story from.' },
        {
          kind: 'table',
          id: 't',
          head: ['Point of view', 'Clues', 'What it can show'],
          rows: [
            ['**First person**', '*I*, a character in the story', 'one character’s thoughts, from inside'],
            ['**Second person**', 'the reader is *you*', 'rare; puts the reader in the story'],
            ['**Third-person limited**', '*he, she, they*, one character', 'that character’s thoughts only'],
            ['**Third-person omniscient**', '*he, she, they*, many characters', 'anyone’s thoughts: “all-knowing”'],
          ],
        },
      ],
      lines: [
        { say: 'The narrator is the voice that tells the story. The narrator is not always the author. A writer can invent a narrator who is a child, a villain, or even an animal. The point of view is the position the narrator tells the story from.', show: 'def' },
        { say: 'A first-person narrator says I and takes part in the story. A second-person narrator calls the reader you, which is rare in fiction.', show: 't', focus: ['t.0', 't.1'] },
        { say: 'A third-person limited narrator uses he, she or they, but follows one character, and shows only that character’s thoughts.', focus: 't.2' },
        { say: 'And a third-person omniscient narrator moves between characters, and can show anyone’s thoughts. Omniscient means all-knowing.', focus: 't.3' },
      ],
    },
    {
      chapter: 'Limited or omniscient?',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['The town slept. In the bakery, Mr. Diaz worried about the rent; at the station, the night guard dreamed of the sea; and in the tallest house, a girl lay awake, planning her escape.'] },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Limited or omniscient?', md: 'Both use *he* and *she*. The test is **whose thoughts** we are told. One character’s head only: **limited**. Many characters’ heads: **omniscient**.' },
      ],
      lines: [
        { say: 'Which point of view is this? The narrator tells us what Mr. Diaz worries about, what the night guard dreams, and what the girl is planning.', show: 'q' },
        { say: 'It moves from one character’s mind to the next, so it is third-person omniscient.', focus: 'q' },
        { say: 'Limited and omniscient narrators both use the pronouns he and she, so the test is whose thoughts we are told. If we only ever get inside one character’s head, the narrator is limited.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'How the narrator shapes a story',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**first person**: we feel what one character feels, but know only what they know',
            '**omniscient**: readers learn secrets the characters do not, which builds **dramatic irony**',
            'a **young or innocent** narrator may not understand what they describe',
          ],
        },
        { kind: 'quote', id: 'q', size: 'md', lines: ['A house fire, “like fireworks, really exciting”'] },
      ],
      lines: [
        { say: 'A writer chooses a narrator for a reason. A first-person narrator lets us share one character’s thoughts closely, so we feel what they feel. But we only know what they know.', show: 'b.0' },
        { say: 'An omniscient narrator can show readers secrets the characters do not know, which is a good way to build dramatic irony.', show: 'b.1' },
        { say: 'And a young or innocent narrator may not understand what they describe. A child who calls a house fire like fireworks, really exciting, makes the danger feel more shocking, because we understand what the child does not.', show: ['b.2', 'q'] },
      ],
    },
    {
      chapter: 'The unreliable narrator',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Unreliable narrator', md: 'An **unreliable narrator** is one whose account we cannot fully trust. They may be lying, confused, too young to understand, or blind to their own faults.' },
        { kind: 'text', id: 'a', size: 'md', md: 'Read between the lines: the story is often in the **gap** between what the narrator says and what really happened.' },
      ],
      lines: [
        { say: 'An unreliable narrator is one whose account we cannot fully trust. They may be lying, confused, too young to understand, or blind to their own faults.', show: 'def' },
        { say: 'When you meet one, read between the lines. The story is often about the gap between what the narrator says, and what really happened.', show: 'a' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A narrator says: “I stayed perfectly calm. Fine, I shouted a bit, and a plate got broken, but I was calm.” What can we conclude?',
          choices: [
            'He is an omniscient narrator.',
            'He is a reliable narrator.',
            'He is a second-person narrator.',
            'He is an unreliable narrator: his own details contradict his claim.',
          ],
          answer: 3,
          working: 'He describes himself as calm, but in the same breath admits he shouted and broke a plate, so we should not trust his view of himself.',
        },
      ],
      lines: [
        { say: 'Your turn. A narrator says he stayed perfectly calm, then admits he shouted and a plate got broken. What can we conclude? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is D. He calls himself calm, but his own details contradict him. So he is an unreliable narrator, and we should not trust his view of himself.', show: 'q2.answer' },
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
            '**First person** (*I*), **second person** (*you*), **third-person limited** and **omniscient**.',
            'Limited shows one mind; omniscient shows any mind.',
            'Omniscient narration can reveal secrets and build dramatic irony.',
            'An **unreliable narrator** cannot be fully trusted; look for contradictions.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A story can be told in first person, second person, third-person limited, or third-person omniscient.', show: 'sum.0' },
        { say: 'A limited narrator shows one character’s mind, and an omniscient narrator can show any character’s mind.', show: 'sum.1' },
        { say: 'First person brings us close to one character, and omniscient narration can reveal secrets and build dramatic irony.', show: 'sum.2' },
        { say: 'And an unreliable narrator cannot be fully trusted, so look for details that contradict what they say.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
