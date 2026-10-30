import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e11-1-5',
  lessonId: 'e11-1-5',
  title: 'Diction, Tone and Syntax',
  summary:
    'Diction is word choice, and connotation does much of its work. Tone is the narrator’s attitude, built mostly from diction, and syntax is sentence structure. A strong answer names the technique, quotes the example and explains the effect.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [
        { kind: 'title', id: 'title', kicker: 'Fiction', title: 'Diction, Tone and Syntax', subtitle: 'Every word and every sentence is a choice' },
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['The great Pullman was whirling onward with such dignity of motion that a glance from the window seemed simply to prove that the plains of Texas were pouring eastward.'],
          by: 'Stephen Crane, “The Bride Comes to Yellow Sky”',
        },
      ],
      lines: [
        { say: 'Stephen Crane could have written that the train went fast. Instead, he writes about a train with dignity of motion.', show: 'title' },
        { say: 'That is a grand phrase for a train, and the joke that Texas pours past makes us smile at the couple’s awe. In this lesson, you will explain how diction creates tone, and how syntax creates effects.', show: 'q' },
      ],
    },
    {
      chapter: 'Diction',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Diction', md: 'A writer’s choice of words. A word has a **denotation**, its dictionary meaning, and often a **connotation**, the feelings it carries.' },
        {
          kind: 'table',
          id: 't',
          head: ['Positive', 'Neutral', 'Negative'],
          rows: [['slender', 'thin', 'scrawny'], ['thrifty', 'careful with money', 'stingy'], ['curious', 'interested', 'nosy']],
        },
      ],
      lines: [
        { say: 'Diction is a writer’s choice of words. Every word has a denotation, its dictionary meaning, and often a connotation, the feelings it carries.', show: 'def' },
        { say: 'The words in each row point to the same thing, but each one makes the reader feel differently about it.', show: 't', focus: 't' },
      ],
    },
    {
      chapter: 'Tone',
      layout: 'center',
      main: [
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['The other houses of the street, conscious of decent lives within them, gazed at one another with brown imperturbable faces.'],
          by: 'James Joyce, “Araby”',
        },
        { kind: 'text', id: 'ans', size: 'md', md: 'The tone is **quietly mocking**: smug, respectable and dull.' },
      ],
      lines: [
        { say: 'Tone is the narrator’s attitude toward the subject, and it is built mostly from diction. Here is the end of the opening of “Araby”.', show: 'q' },
        { say: 'The houses are conscious of decent lives within them, and their faces are brown and imperturbable, which means calm and unbothered.', focus: 'q' },
        { say: 'Joyce makes the houses look smug and dull, proud of being respectable. So the tone is quietly mocking.', show: 'ans' },
      ],
    },
    {
      chapter: 'Syntax',
      layout: 'center',
      main: [
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['There lay a young man, fast asleep—sleeping so soundly, so deeply, that he was far, far away from them both.', 'Oh, so remote, so peaceful.', 'He was dreaming.'],
          by: 'Katherine Mansfield, “The Garden Party”',
        },
      ],
      lines: [
        { say: 'Syntax is the way words are arranged into sentences: their length, their order and their patterns. Laura has gone into the cottage where the young carter lies dead.', show: 'q.0' },
        { say: 'The repetitions, so soundly, so deeply, far, far away, slow the pace to a hush. Then comes a fragment, which sounds like Laura’s own wondering thought.', show: 'q.1', focus: ['q.0', 'q.1'] },
        { say: 'The very short last sentence ends the moment in stillness. Laura sees death as deep, distant peace.', show: 'q.2', focus: 'q.2' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Tone is not mood', md: '**Tone** is the narrator’s attitude. **Mood** is the feeling the reader gets. Choose precise tone words: try “bitter”, “wistful” or “mocking” instead of “sad”.' },
      ],
      lines: [
        { say: 'Here is a common mistake. Tone is not mood.', show: 'm' },
        { say: 'Tone is the narrator’s attitude, and mood is the feeling the reader gets. Also choose precise words. Try bitter, wistful or mocking instead of just sad.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'One writer calls a man “thrifty”. Another calls the same man “stingy”. How do the two words differ?',
          choices: [
            'Their denotation, because the two dictionary meanings are far apart.',
            'Their connotation, because each word carries different feelings.',
            'Their syntax, because each word has a different sentence pattern.',
            'Their mood, because each word names the reader’s feeling.',
          ],
          answer: 1,
          working: 'Both words describe someone careful with money, but they carry different feelings. That difference is connotation.',
        },
      ],
      lines: [
        { say: 'Your turn. One writer calls a man thrifty. Another calls the same man stingy. How do the two words differ? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is B. Both words describe someone careful with money, but they carry different feelings. That difference is connotation.', show: 'q2.answer' },
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
            'Diction is word choice; connotation is the feeling a word carries.',
            'Tone is the narrator’s attitude; mood is the reader’s feeling.',
            'Syntax is sentence structure. Name the technique, quote it, explain the effect.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Diction is word choice, and connotation is the feeling a word carries.', show: 'sum.0' },
        { say: 'Tone is the narrator’s attitude, and mood is the reader’s feeling.', show: 'sum.1' },
        { say: 'And syntax is sentence structure. Always name the technique, quote an example and explain its effect.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
