import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e10-6-4',
  lessonId: 'e10-6-4',
  title: 'Narrative Writing',
  thumbnail: false,
  summary:
    'Learn to show instead of tell, use sensory detail and pacing, and punctuate dialogue so the reader always knows who is speaking.',
  scenes: [
    {
      layout: 'center',
      main: [
        { kind: 'title', id: 'title', kicker: 'Writing', title: 'Narrative Writing', subtitle: 'Show, don’t tell' },
        { kind: 'quote', id: 'pass', lines: ['Della finished her cry and attended to her cheeks with the powder rag. She stood by the window and looked out dully at a gray cat walking a gray fence in a gray backyard.'], by: 'O. Henry, “The Gift of the Magi”', size: 'md' },
      ],
      lines: [
        { say: 'O. Henry could have written that Della was sad. Instead, after she has cried, he shows her looking out at a gray cat on a gray fence in a gray backyard.', show: ['title', 'pass'] },
        { say: 'We never read the word sad, yet we feel it in every gray thing she sees. In this lesson you will use the same tools: showing, sensory detail, pacing, and dialogue.' },
      ],
    },
    {
      chapter: 'Show, don’t tell',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Showing and telling', md: '**Telling** names a feeling: *Liam was nervous.* **Showing** lets the reader work it out from actions and details: *Liam wiped his damp palms on his jeans for the third time.*' },
        { kind: 'bullets', id: 'steps', items: ['Ask what exhaustion looks like from the outside.', 'Choose one or two specific actions.', 'Leave out the word *exhausted*.'] },
        { kind: 'bullets', id: 'ans', items: ['Telling: *Amara was exhausted after the long day.*', 'Showing: *Amara dropped her bag in the hall, kicked off her shoes and fell asleep on the sofa with the lights still on.*'] },
      ],
      lines: [
        { say: 'Telling names a feeling outright. Showing lets the reader work it out from actions, body language and details.', show: 'def' },
        { say: 'Let’s turn “Amara was exhausted after the long day” into showing. Ask what exhaustion looks like from the outside, and choose one or two specific actions.', hide: 'def', show: ['steps.0', 'steps.1'] },
        { say: 'Then write the sentence without the word exhausted.', show: 'steps.2' },
        { say: 'Amara dropped her bag in the hall, kicked off her shoes and fell asleep on the sofa with the lights still on.', hide: 'steps', show: 'ans' },
      ],
    },
    {
      chapter: 'Details, openings and pacing',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['**Sensory detail**: what the reader can see, hear, smell, taste or touch', '**Strong opening**: drop the reader into something urgent or mysterious', '**Pacing**: hurry through small moments, slow down the key one'] }],
      lines: [
        { say: 'A scene comes alive when the reader can see, hear, smell, taste or touch it. “The market was busy” gives nothing to experience.', show: 'b.0' },
        { say: 'Your first sentence decides whether the reader keeps going. Begin with something urgent or mysterious, not with “Hi, my name is”.', show: 'b.1' },
        { say: 'Pacing is the speed of your story. Hurry through moments that matter less, and slow down the moment that matters most, with small actions and sensory details.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Writing dialogue',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['Spoken words go inside quotation marks.', 'Tag after the words: a comma ends them, and the tag starts with a small letter.', 'Tag first: a comma after the tag, then a capital letter.', 'A new speaker starts a new paragraph.'] },
        { kind: 'bullets', id: 'ans', items: ['Punctuate: *if we leave now Wei said we can still catch the bus*', 'Punctuated: *“If we leave now,” Wei said, “we can still catch the bus.”*'] },
      ],
      lines: [
        { say: 'Spoken words go inside quotation marks.', show: 'b.0' },
        { say: 'When the tag comes after the words, a comma ends them and the tag starts with a small letter. When the tag comes first, a comma follows the tag and the speech starts with a capital.', show: ['b.1', 'b.2'] },
        { say: 'A new speaker always starts a new paragraph.', show: 'b.3' },
        { say: 'Now a tag in the middle. The spoken words make one sentence, interrupted by the tag Wei said, so there is a comma at the end of the first part, another after the tag, and the second part begins with a small letter.', hide: 'b', show: 'ans' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [{ kind: 'callout', id: 'm', tone: 'mistake', title: 'Slowing down the wrong moment', md: 'Twenty minutes of a character choosing socks, then one quick sentence for the moment they open their exam results. Find the key moment and **spend your words there**.' }],
      lines: [
        { say: 'A common mistake is slowing down the wrong moment. Imagine pages about a character choosing socks, then one quick sentence for the moment they open their exam results.', show: 'm' },
        { say: 'Find your story’s key moment, and spend your words there.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Tomás says two separate sentences: I’m not going. It’s far too cold. Which version is punctuated correctly?',
          choices: [
            '“I’m not going,” Tomás said. “it’s far too cold.”',
            '“I’m not going,” Tomás said, “It’s far too cold.”',
            '“I’m not going,” Tomás said. “It’s far too cold.”',
            '“I’m not going.” Tomás said, “it’s far too cold.”',
          ],
          answer: 2,
          working: 'The tag ends the first sentence with a period, so the second spoken sentence starts with a capital letter.',
        },
      ],
      lines: [
        { say: 'Your turn. Tomás says two separate sentences: I’m not going. It’s far too cold. Which of these four versions is punctuated correctly? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. These are two separate sentences, so a period ends the tag, and the second one starts with a capital letter. Choice A has a small letter there.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Show feelings through actions and details; tell only what matters less.', 'Use sensory detail, a strong opening and careful pacing.', 'Punctuate dialogue so the reader knows who speaks.'] }],
      lines: [
        { say: 'Let’s sum up. Show feelings through actions and details, and tell only what matters less.', show: 'sum.0' },
        { say: 'Use sensory detail, a strong opening and careful pacing.', show: 'sum.1' },
        { say: 'And punctuate dialogue so the reader always knows who is speaking.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
