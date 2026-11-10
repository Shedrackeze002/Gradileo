import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e7-1-4',
  lessonId: 'e7-1-4',
  title: 'Foreshadowing and Flashback',
  summary:
    'Foreshadowing is a hint about something that will happen later, which builds suspense and makes the ending feel planned. A flashback interrupts the present to show a scene from the past, often to explain a character.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Short Stories', title: 'Foreshadowing and Flashback', subtitle: 'Looking forward and looking back' }],
      lines: [
        { say: 'Stories do not always move in a straight line from beginning to end.', show: 'title' },
        { say: 'A writer can drop a hint about the future, or jump back into the past. In this video we look at both tools: foreshadowing and flashback.' },
      ],
    },
    {
      chapter: 'Foreshadowing',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Foreshadowing', md: '**Foreshadowing** is a hint or clue about something that will happen later in a story.' },
        {
          kind: 'table',
          id: 't',
          head: ['Kind of hint', 'Example'],
          rows: [
            ['a **warning**', '*“Stay off the pond.”*'],
            ['an **odd detail**', '*a crack in a bridge*'],
            ['a **narrator’s hint**', '*She didn’t know it yet, but…*'],
            ['a **change in the weather**', '*black clouds creeping in*'],
          ],
        },
      ],
      lines: [
        { say: 'Foreshadowing is a hint or clue about something that will happen later in a story.', show: 'def' },
        { say: 'It does two jobs. It builds suspense, because the reader starts to wonder, and it makes later events feel believable, because the writer has prepared us for them.', focus: 'def' },
        { say: 'Foreshadowing often comes as a warning, like stay off the pond, or an odd detail, like a crack in a bridge.', show: 't', focus: ['t.0', 't.1'] },
        { say: 'It can also be a narrator’s hint, she didn’t know it yet, but, or a change in the weather, with black clouds creeping in.', focus: ['t.2', 't.3'] },
      ],
    },
    {
      chapter: 'Spotting foreshadowing',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['As the cart rolled over the old bridge, Ravi heard it creak.', 'He noticed a long crack running through the middle plank, but he said nothing.'] },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'A planted object is not just luck', md: 'If a character pockets a small key in chapter 1 and escapes a locked cellar in chapter 9, the key was **foreshadowing**, planted so the escape does not feel like luck.' },
      ],
      lines: [
        { say: 'Read this passage and ask a simple question. Why would the writer mention a creak and a crack unless they matter?', show: ['q.0', 'q.1'] },
        { say: 'The detail hints that the bridge may fail. So the crack foreshadows the bridge breaking later in the story.', focus: 'q.1' },
        { say: 'Do not dismiss these details as luck. If a character pockets a small key in chapter one and escapes a locked cellar in chapter nine, the key was foreshadowing. A good writer plants it early, so the escape feels earned.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Flashback',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Flashback', md: 'A **flashback** is a scene that interrupts the present story to show events from the past.' },
        { kind: 'quote', id: 'q', size: 'md', lines: ['The dog trotted towards them, wagging its tail. Kenji stepped back.', 'He was five again, in the park, and the big brown dog was lunging, teeth flashing. He still had the scar on his arm.'] },
      ],
      lines: [
        { say: 'A flashback is a scene that interrupts the present story to show events from the past. Writers use flashbacks to explain a character’s fear, a secret, or a relationship.', show: 'def' },
        { say: 'Watch for signal words that take us back, like remembered, years before, and back then. And watch for words that bring us home again, like now, and years later.', focus: 'def' },
        { say: 'Here a friendly dog trots towards Kenji, and he steps back. Why?', show: 'q.0', focus: 'q.0' },
        { say: 'He was five again takes us into the past. The memory of being bitten explains why Kenji is afraid of even a friendly dog.', show: 'q.1', focus: 'q.1' },
      ],
    },
    {
      chapter: 'Forward or back?',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Foreshadowing', 'Flashback'],
          rows: [
            ['hints at the **future**', 'shows the **past**'],
            ['stays in the present scene', 'interrupts it with an earlier scene'],
            ['builds suspense about what will happen', 'explains why things are as they are'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the two side by side. Foreshadowing hints at the future, and a flashback shows the past.', show: 't', focus: 't.0' },
        { say: 'Foreshadowing stays in the present scene, while a flashback interrupts it with an earlier one.', focus: 't.1' },
        { say: 'And foreshadowing builds suspense about what will happen, while a flashback explains why things are as they are.', focus: 't.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: '“As Grandpa handed her the old violin, Amara remembered the summer she was seven, sitting on his porch while he played until the stars came out.” What is the writer using?',
          choices: ['Foreshadowing', 'A flashback', 'A cliffhanger', 'A symbol of the future'],
          answer: 1,
          working: '“Remembered the summer she was seven” takes us back to an earlier scene, so this is a flashback.',
        },
      ],
      lines: [
        { say: 'Your turn. As Grandpa hands her the old violin, Amara remembers the summer she was seven. What is the writer using? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is B, a flashback. The signal word remembered takes us back to an earlier scene on Grandpa’s porch.', show: 'q2.answer' },
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
            '**Foreshadowing** hints at later events and makes the ending feel planned.',
            'A **flashback** shows a scene from the past, often to explain a character.',
            '*Remembered* and *years before* start a flashback; *now* ends it.',
            'Foreshadowing looks forward; flashback looks back.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Foreshadowing hints at later events. It builds suspense and makes the ending feel planned.', show: 'sum.0' },
        { say: 'A flashback shows a scene from the past, often to explain a character.', show: 'sum.1' },
        { say: 'Signal words such as remembered and years before start a flashback, and words like now bring us back.', show: 'sum.2' },
        { say: 'So foreshadowing looks forward, and flashback looks back.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
