import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e6-7-1',
  lessonId: 'e6-7-1',
  title: 'Narrative Writing: Hooks and Dialogue',
  thumbnailTitle: 'Hooks and Dialogue',
  summary:
    'A hook is a story’s first sentence, which grabs the reader with action, dialogue, a question, a mysterious detail or a sound. Good dialogue shows character or moves the plot, and each new speaker starts a new paragraph.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Writing', title: 'Hooks and Dialogue', subtitle: 'Making a story grip its reader' }],
      lines: [
        { say: 'Some stories grab you from the very first line, and their characters seem to talk like real people.', show: 'title' },
        { say: 'In this lesson, you will learn two ways to make a story grip its reader: a strong opening, and lively dialogue.' },
      ],
    },
    {
      chapter: 'Hooking the reader',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Hook', md: 'The **hook** is the first sentence of a story. It should make the reader want to read the second sentence.' },
        {
          kind: 'table',
          id: 't',
          head: ['Kind of hook', 'Example'],
          rows: [
            ['**Action**', '*The floor beneath me cracked, and I was falling.*'],
            ['**Dialogue**', '*“Don’t open that box!” Grandma shouted.*'],
            ['**A question**', '*Have you ever wondered what it would be like to fly?*'],
            ['**A mysterious detail**', '*The letter had no name on it, only a black feather.*'],
            ['**A sound**', '*Crash! The whole shelf of plates hit the floor.*'],
          ],
        },
      ],
      lines: [
        { say: 'The first sentence of a story is its hook. It should make the reader want to read the second sentence.', show: 'def' },
        { say: 'You can start with action: the floor beneath me cracked, and I was falling. Or with dialogue: don’t open that box, Grandma shouted.', show: 't', focus: ['t.0', 't.1'] },
        { say: 'You can ask a question, or give a mysterious detail: the letter had no name on it, only a black feather.', focus: ['t.2', 't.3'] },
        { say: 'Or start with a sound. Crash! The whole shelf of plates hit the floor.', focus: 't.4' },
      ],
    },
    {
      chapter: 'Choosing a hook',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Weak', 'Strong'], rows: [['*This is a story about a girl and a long trip she took.*', '*The floor beneath me cracked, and I was falling.*']] },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Don’t explain everything first', md: 'You do not need to start with the narrator’s name, age and home. Begin in the action, and slip the background in later.' },
      ],
      lines: [
        { say: 'Which is the stronger opening?', show: 't' },
        { say: 'The first announces that a story is coming, but nothing happens. The second drops the reader into danger, and raises a question: what happens next? So the second is stronger.', focus: 't' },
        { say: 'Here is a common mistake. You do not need to start with the narrator’s name, age and home. Begin in the action, and slip the background in later, a sentence at a time.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Writing dialogue',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Dialogue', md: '**Dialogue** is the words characters say to each other. Good dialogue **shows character** or **moves the plot**.' },
        {
          kind: 'table',
          id: 't',
          head: ['Dull dialogue', 'Dialogue that works'],
          rows: [
            ['*“Hello. How are you?” “Fine, thanks.”*', '*“The bridge is out. We’ll have to swim across.”*'],
            ['*“I won,” said Sam.*', '*“I won,” Sam whispered, tears in his eyes.*'],
          ],
        },
      ],
      lines: [
        { say: 'Dialogue is the words characters say to each other. Good dialogue does at least one of two jobs. It shows character, meaning how someone feels or what they are like, or it moves the plot.', show: 'def' },
        { say: 'Hello, how are you, fine, thanks, does neither. The bridge is out, we’ll have to swim across, gives new information and creates a problem, so it moves the plot.', show: 't', focus: 't.0' },
        { say: 'And I won, Sam whispered, tears in his eyes, shows us how Sam feels.', focus: 't.1' },
      ],
    },
    {
      chapter: 'Punctuating dialogue',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            'Put the spoken words inside quotation marks.',
            'Tag after the speech: end the speech with a comma inside the marks: *“Let’s go,” said Nia.*',
            'Tag in the middle: commas on both sides: *“Wait,” Nia said, “I forgot my bag.”*',
            'Start a **new paragraph** each time a different character speaks.',
          ],
        },
      ],
      lines: [
        { say: 'Put the spoken words inside quotation marks.', show: 'b.0' },
        { say: 'If the dialogue tag, like said Nia, comes after the speech, end the speech with a comma, or a question mark or exclamation mark, inside the quotation marks.', show: 'b.1' },
        { say: 'If the tag interrupts a sentence, use commas on both sides of it.', show: 'b.2' },
        { say: 'And start a new paragraph each time a different character speaks, so the reader always knows who is talking.', show: 'b.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: '“Oh, sure, I’d love to clean the bathroom,” Omar muttered, rolling his eyes. What does this show about Omar?',
          choices: [
            'He loves cleaning.',
            'He is excited about the bathroom.',
            'He is too tired to speak.',
            'He does not want to clean it: he is being sarcastic.',
          ],
          answer: 3,
          working: 'His words say he would love to, but “muttered” and “rolling his eyes” say the opposite.',
        },
      ],
      lines: [
        { say: 'Your turn. What does this dialogue show about Omar? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is D. His words say he would love to, but muttered, and rolling his eyes, say the opposite. He is being sarcastic.', show: 'q2.answer' },
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
            'A **hook** grabs the reader: action, dialogue, a question, a mysterious detail or a sound.',
            'Good dialogue shows character or moves the plot.',
            'Speech goes inside quotation marks; start a new paragraph for each new speaker.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A hook grabs the reader. Start with action, dialogue, a question, a mysterious detail, or a sound.', show: 'sum.0' },
        { say: 'Good dialogue shows character or moves the plot.', show: 'sum.1' },
        { say: 'And punctuate speech inside quotation marks, starting a new paragraph for each new speaker.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
