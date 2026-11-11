import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e8-2-3',
  lessonId: 'e8-2-3',
  title: 'Tone and Shifts in Poetry',
  summary:
    'Tone is the speaker’s attitude to the subject, and it is best described with precise words such as wistful, defiant, arrogant or ironic. A shift is a change in tone, speaker, time or idea, often signalled by but, yet or then, and it is often where a poem’s meaning lies.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Poetry', title: 'Tone and Shifts in Poetry', subtitle: 'When a poem changes direction' }],
      lines: [
        { say: 'The tone of a poem is not always steady. Many poems change direction partway through, and that change is often where the meaning lies.', show: 'title' },
        { say: 'In this video we describe tone precisely, and find where and why it shifts.' },
      ],
    },
    {
      chapter: 'Naming the tone precisely',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Tone', md: '**Tone** is the speaker’s attitude towards the subject: proud, bitter, fond, mocking.' },
        {
          kind: 'table',
          id: 't',
          head: ['Instead of…', 'try…'],
          rows: [
            ['happy', 'joyful, playful, celebratory, content'],
            ['sad', '**wistful**, mournful, bitter, **nostalgic**'],
            ['angry', '**defiant**, indignant, scornful'],
            ['proud', 'arrogant, boastful, confident'],
            ['saying the opposite', 'ironic, sarcastic, mocking'],
          ],
        },
      ],
      lines: [
        { say: 'Tone is the speaker’s attitude towards the subject. Happy and sad are rarely enough, so a precise word shows that you have read closely.', show: 'def' },
        { say: 'Instead of happy, try joyful, playful or content. Instead of sad, try wistful, which names a gentle, longing sadness, or nostalgic, which means looking back fondly on happy times that are gone.', show: 't', focus: ['t.0', 't.1'] },
        { say: 'Instead of angry, try defiant, which means refusing to give in. Instead of proud, try arrogant or boastful.', focus: ['t.2', 't.3'] },
        { say: 'And when a speaker says the opposite of what they mean, the tone is ironic, sarcastic or mocking. To find the tone, look at word choice, images and punctuation.', focus: 't.4' },
      ],
    },
    {
      chapter: 'Shifts',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Shift', md: 'A **shift** (or **turn**) is a change in a poem’s tone, speaker, time or idea. Words like *but*, *yet*, *then* and *now* often signal one.' },
      ],
      lines: [
        { say: 'A shift, or turn, is a change in a poem’s tone, speaker, time or idea.', show: 'def' },
        { say: 'Words like but, yet, then and now often signal one. So when you see them, slow down and ask what has changed.', focus: 'def' },
      ],
    },
    {
      chapter: 'Ozymandias',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['And on the pedestal, these words appear:', 'My name is Ozymandias, King of Kings;', 'Look on my Works, ye Mighty, and despair!', 'Nothing beside remains. Round the decay', 'Of that colossal Wreck, boundless and bare', 'The lone and level sands stretch far away.'], by: 'Percy Bysshe Shelley, “Ozymandias”, last lines' },
      ],
      lines: [
        { say: 'In Shelley’s poem Ozymandias, a traveller describes a broken statue of an ancient king, standing in the desert. On its base are these words.', show: ['q.0', 'q.1', 'q.2'] },
        { say: 'The king calls himself the king of all kings, and tells other powerful rulers to despair, because they can never match him. The tone is arrogant.', focus: ['q.1', 'q.2'] },
        { say: 'Then the poem shifts. Nothing beside remains. The great works are gone, and only a broken statue and empty sand are left.', show: ['q.3', 'q.4', 'q.5'], focus: 'q.3' },
        { say: 'Now the boast sounds ironic. The mighty should despair, but for a different reason: all power fades. The lone and level sands mock the king’s boast.', focus: ['q.4', 'q.5'] },
      ],
    },
    {
      chapter: 'Say why, not just where',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Don’t just say where; say why', md: '“The tone shifts in line 12” is only half an answer. Say what it shifts **from** and **to**, and what the change makes us **understand**.' },
        { kind: 'text', id: 'e', size: 'md', md: '*Mother to Son*: a hard life, then “But all the time / I’se been a-climbin’ on”: **determination**.' },
      ],
      lines: [
        { say: 'When you write about a shift, the tone shifts in line twelve is only half an answer. Say what it shifts from and to, and what the change makes us understand.', show: 'm' },
        { say: 'In Mother to Son, the mother describes her hard life, then turns with the word but: all the time she has been climbing on. The shift shows her determination to keep going.', show: 'e' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Frost’s poem delights in spring’s first gold, then says, “But only so an hour.” How does the tone shift?',
          choices: [
            'From anger to joy',
            'From mocking to arrogant',
            'From delight to sad acceptance',
            'It does not shift at all.',
          ],
          answer: 2,
          working: '“But” signals the turn: the poem moves from delight in spring’s beauty to sad acceptance that it cannot last.',
        },
      ],
      lines: [
        { say: 'Your turn. Frost’s poem delights in spring’s first gold, then says, but only so an hour. How does the tone shift? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is C. The word but signals the turn. The poem moves from delight in spring’s beauty, to sad acceptance that it cannot last.', show: 'q2.answer' },
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
            '**Tone** is the speaker’s attitude; name it precisely.',
            'Try *wistful*, *defiant*, *arrogant* or *ironic*, not just happy or sad.',
            'A **shift** is a change in tone, speaker, time or idea, often after *but* or *yet*.',
            'Say what the tone shifts from and to, and why it matters.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Tone is the speaker’s attitude, so name it precisely.', show: 'sum.0' },
        { say: 'Try words like wistful, defiant, arrogant or ironic, not just happy or sad.', show: 'sum.1' },
        { say: 'A shift is a change in tone, speaker, time or idea, often signalled by but, yet or then.', show: 'sum.2' },
        { say: 'And always say what the tone shifts from and to, and why it matters.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
