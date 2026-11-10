import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e8-1-4',
  lessonId: 'e8-1-4',
  title: 'Theme Statements and Comparing Themes',
  summary:
    'A theme statement is a full, specific sentence about life, not a topic word or a cliché. Universal themes appear across many times and cultures, and to compare two texts you name the shared topic, say what each suggests, and explain how the writers’ choices create the difference.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Fiction', title: 'Theme Statements and Comparing Themes', subtitle: 'Saying exactly what a story means' }],
      lines: [
        { say: 'A theme is a story’s message about life. In earlier grades you found themes and supported them with evidence.', show: 'title' },
        { say: 'In this video we make theme statements more precise, and compare how two texts treat the same theme.' },
      ],
    },
    {
      chapter: 'The theme statement',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Theme statement', md: 'A **theme statement** is a full sentence that says what a text suggests about a big idea. *Courage* is a topic; *Real courage can mean admitting you are wrong* is a theme.' },
        {
          kind: 'bullets',
          id: 'b',
          items: ['a **complete sentence**, not a single word', 'a **point about life** beyond the plot, so it does not name the characters', '**specific** to this text, not a vague cliché'],
        },
      ],
      lines: [
        { say: 'A theme statement is a full sentence that says what a text suggests about a big idea. Courage is a topic. Real courage can mean admitting you are wrong is a theme.', show: 'def' },
        { say: 'A strong theme statement has three qualities. It is a complete sentence, not a single word.', show: 'b.0' },
        { say: 'It makes a point about life that goes beyond the plot, so it does not name the characters.', show: 'b.1' },
        { say: 'And it is specific to this text, not a vague cliché.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Sharpening a theme',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['Two sisters have not spoken for years. When their father falls ill, they meet at the hospital and slowly begin to talk again.'] },
        {
          kind: 'table',
          id: 't',
          head: ['First try', 'Sharper'],
          rows: [['*Family is important.*', '*Family bonds can survive even long silences and old arguments.*']],
        },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Avoid clichés', md: '*Never give up* and *Family is important* could describe thousands of stories. Ask what **this** story shows *about* the idea.' },
      ],
      lines: [
        { say: 'Here is a story. Two sisters have not spoken for years, and when their father falls ill, they slowly begin to talk again.', show: 'q' },
        { say: 'A first try might be, family is important. This is true, but vague. It could fit any family story.', show: 't', focus: 't.0' },
        { say: 'So ask what the story shows about family. The bond lasts, even through silence and old arguments. Family bonds can survive even long silences and old arguments.', focus: 't.0' },
        { say: 'Clichés like never give up could describe thousands of stories. Always ask what this particular story shows about the idea.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Comparing themes',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Universal theme', md: 'A **universal theme** appears across many times and cultures: love and loss, the cost of ambition, growing up, good against evil.' },
        {
          kind: 'table',
          id: 't',
          head: ['', 'Story A', 'Story B'],
          rows: [
            ['**Topic**', 'ambition', 'ambition'],
            ['**What it shows**', 'it ruins a king who will do anything for power', 'it helps a poor girl build a business'],
            ['**Message**', 'unchecked ambition destroys', 'ambition with hard work lifts people up'],
          ],
        },
      ],
      lines: [
        { say: 'Some themes appear across many times and cultures, such as love and loss, the cost of ambition, and growing up. These are universal themes.', show: 'def' },
        { say: 'To compare two texts, follow three steps. First, name the shared topic. Here, both stories are about ambition.', show: 't', focus: 't.0' },
        { say: 'Second, say what each text suggests about it. In one, ambition ruins a king. In the other, it helps a poor girl build a business.', focus: ['t.1', 't.2'] },
        { say: 'Third, explain how the writers’ choices, such as plot, character, imagery and ending, create the difference.', focus: 't.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Two stories are about loneliness. In the first, the main character ends still alone; in the second, she finds a friend. Which is the strongest comparison?',
          choices: [
            'The first story is longer than the second.',
            'I liked the second story more.',
            'Both stories explore loneliness, but only the second suggests it can be overcome.',
            'Both stories have a main character.',
          ],
          answer: 2,
          working: 'C names the shared theme and the difference in one sentence. A and D describe surface details, and B is only a personal preference.',
        },
      ],
      lines: [
        { say: 'Your turn. Two stories are about loneliness, but they end differently. Which is the strongest comparison? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is C. It names the shared theme and the difference in one sentence. Choices A and D describe surface details, and B is only a personal preference.', show: 'q2.answer' },
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
            'A **theme statement** is a full, specific sentence about life.',
            'Avoid topic words and clichés; ask what this story shows.',
            '**Universal themes** appear across many times and cultures.',
            'Compare: shared topic, what each suggests, how the choices differ.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A theme statement is a full, specific sentence about life.', show: 'sum.0' },
        { say: 'Avoid single topic words and clichés, and ask what this story shows about the idea.', show: 'sum.1' },
        { say: 'Universal themes appear across many times and cultures.', show: 'sum.2' },
        { say: 'And to compare, name the shared topic, say what each text suggests, and explain how the writers’ choices create the difference.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
