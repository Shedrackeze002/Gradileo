import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e9-1-1',
  lessonId: 'e9-1-1',
  title: 'The Structure of a Novel',
  summary:
    'Structure is the order and shape in which a story is told: chronological order, flashbacks, parallel plots or multiple narrators, and starting at the end turns “what happens?” into “how and why?”. Pacing is the speed a story unfolds, controlled by sentence length, action, detail and summary; writers slow down at the moments that matter most.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Fiction', title: 'The Structure of a Novel', subtitle: 'Structure and pacing' }],
      lines: [
        { say: 'A short story can be read in one sitting, but a novel asks readers to stay with it for days or weeks. To keep them, novelists make careful choices about how the story is told.', show: 'title' },
        { say: 'In this video we name those choices, structure and pacing, and explain their effects.' },
      ],
    },
    {
      chapter: 'Structure',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Structure', md: 'A novel’s **structure** is the **order and shape** in which its story is told. The same events can be told in many orders, and each order changes what the reader feels and wonders.' },
      ],
      lines: [
        { say: 'A novel’s structure is the order and shape in which its story is told.', show: 'def' },
        { say: 'The same events can be told in many different orders, and each order changes what the reader feels and wonders about.', focus: 'def' },
      ],
    },
    {
      chapter: 'Kinds of structure',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Structure', 'What it is', 'Effect'],
          rows: [
            ['**Chronological**', 'events in the order they happen', 'clear and easy to follow'],
            ['**Flashback**', 'a jump back to an earlier time', 'reveals the past behind the present'],
            ['**Parallel plots**', 'two storylines side by side', 'invites us to compare them'],
            ['**Multiple narrators**', 'chapters told by different characters', 'shows how differently people see events'],
          ],
        },
        { kind: 'callout', id: 'k', tone: 'key', title: 'Starting at the end', md: 'A novel that opens with a funeral turns “What will happen?” into “**How did it come to this?**”' },
      ],
      lines: [
        { say: 'Chronological order tells events in the order they happen, so it is clear and easy to follow. A flashback jumps back to an earlier time, to reveal the past that explains the present.', show: 't', focus: ['t.0', 't.1'] },
        { say: 'Parallel plots run two or more storylines side by side, often in different times or places, so we keep comparing them.', focus: 't.2' },
        { say: 'And multiple narrators tell different chapters, showing how differently people see the same events.', focus: 't.3' },
        { say: 'Some novels begin at the end. A book that opens with a funeral replaces the question what will happen, with how did it come to this. So we read for causes and meaning, instead of surprises.', show: 'k' },
      ],
    },
    {
      chapter: 'Structure is a choice',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Structure is a choice', md: 'Don’t just name the structure. Ask **why** the writer chose it. A flashback placed just before a big decision can show exactly what is **driving** that decision.' },
      ],
      lines: [
        { say: 'A common mistake is to name the structure and stop. Always ask why the writer chose it.', show: 'm' },
        { say: 'For example, a flashback placed just before a big decision can show us exactly what is driving that decision.', focus: 'm' },
      ],
    },
    {
      chapter: 'Pacing',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Pacing', md: '**Pacing** is the speed at which a story unfolds for the reader. Writers speed up and slow down to control **tension** and **focus**.' },
        {
          kind: 'table',
          id: 't',
          head: ['To speed up', 'To slow down'],
          rows: [
            ['short sentences and paragraphs', 'long sentences and description'],
            ['quick action and dialogue', 'a character’s thoughts and memories'],
            ['summary: “Three years passed.”', 'stretching one moment over a page'],
          ],
        },
      ],
      lines: [
        { say: 'Pacing is the speed at which a story unfolds for the reader. Writers speed up and slow down to control tension and focus.', show: 'def' },
        { say: 'To speed up, they use short sentences, quick action and dialogue, and summary, like three years passed. A cliffhanger at the end of a chapter pulls us on.', show: 't' },
        { say: 'To slow down, they use long sentences, description, and a character’s thoughts and memories, or they stretch a single moment over a whole page.', focus: 't' },
        { say: 'Writers spend the most words on what matters most. So if a novel covers ten years in a paragraph, then spends a chapter on one afternoon, the afternoon is where the story really lies.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: '“The ball rose. It hung against the white sky for what felt like an hour. I could hear my own breath, the creak of the bench, a dog somewhere far away. Then it began to fall.” What is the effect of the pacing?',
          choices: [
            'It speeds up the action to show it is unimportant.',
            'It slows a key moment to build suspense.',
            'It summarises many years quickly.',
            'It is a flashback to the narrator’s childhood.',
          ],
          answer: 1,
          working: 'In real life this takes about two seconds. Sensory details stretch it out, so we wait with the narrator and feel how much it matters.',
        },
      ],
      lines: [
        { say: 'Your turn. The ball rose. It hung against the white sky for what felt like an hour. I could hear my own breath, the creak of the bench, a dog somewhere far away. Then it began to fall. What is the effect of the pacing? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is B. In real life this takes about two seconds, but the writer stretches it with sensory details. So we wait with the narrator, and feel how much the moment matters.', show: 'q2.answer' },
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
            '**Structure**: chronological, flashback, parallel plots, multiple narrators.',
            'Starting at the end turns “what happens?” into “how and why?”',
            '**Pacing** is controlled by sentence length, action, detail and summary.',
            'Writers slow down at key moments and use **cliffhangers** to pull us on.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Structures include chronological order, flashbacks, parallel plots and multiple narrators.', show: 'sum.0' },
        { say: 'Starting at the end turns what happens, into how and why.', show: 'sum.1' },
        { say: 'Pacing is controlled by sentence length, action, detail and summary.', show: 'sum.2' },
        { say: 'And writers slow down at the moments that matter, and use cliffhangers to pull readers on.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
