import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e12-1-1',
  lessonId: 'e12-1-1',
  title: 'Narrative Technique and Time',
  summary:
    'Modern fiction chooses whose mind the telling moves through, with stream of consciousness, multiple narrators, shifting focalization or external narration, and it shapes time by compressing, expanding, flashing back and flashing forward.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [
        { kind: 'title', id: 'title', kicker: 'Fiction', title: 'Narrative Technique and Time', subtitle: 'Whose mind are we in, and how does the telling move?' },
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['There was grace and mystery in her attitude as if she were a symbol of something. He asked himself what is a woman standing on the stairs in the shadow, listening to distant music, a symbol of.'],
          by: 'James Joyce, “The Dead”',
        },
      ],
      lines: [
        { say: 'Near the end of James Joyce’s “The Dead”, Gabriel watches his wife Gretta standing on the stairs.', show: 'title' },
        { say: 'We see a picture, a woman in shadow, listening to music. We do not see what she is feeling. That is a choice about whose mind the story moves through. In this lesson, you will analyse how modern fiction handles narrative technique, and how it handles time.', show: 'q' },
      ],
    },
    {
      chapter: 'Whose mind are we in?',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Stream of consciousness**: the flow of one mind',
            '**Multiple narrators**: the story passes from teller to teller',
            '**Shifting focalization**: the point of view moves between characters',
            '**External narration**: only what can be seen and heard',
          ],
        },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Focalization', md: 'Whose perceptions the narration is filtered through. It is not the same as **who narrates**.' },
      ],
      lines: [
        { say: 'There are four main techniques. Stream of consciousness follows the flow of one mind, with its memories and sensations drifting by association.', show: 'b.0', focus: 'b.0' },
        { say: 'Multiple narrators hand the story from one teller to the next.', show: 'b.1', focus: 'b.1' },
        { say: 'Shifting focalization keeps a third-person narrator, but moves the point of view from one character to another. And external narration reports only what could be seen and heard, never entering anyone’s thoughts.', show: ['b.2', 'b.3'] },
        { say: 'Focalization means whose perceptions the telling is filtered through. A third-person narrator can still see everything through one character’s eyes, as Joyce does with Gabriel.', show: 'def', focus: 'def' },
      ],
    },
    {
      chapter: 'Handling time',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Compression**: years pass in a few words',
            '**Expansion**: a brief moment drawn out in detail',
            '**Analepsis**: a flashback to an earlier time',
            '**Prolepsis**: a jump ahead, or an imagined future',
          ],
        },
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['Nine winters’ snows had buried deep that night when my old grandmother, together with my father and mother, designed my future with the glow of a camp fire upon it.'],
          by: 'Zitkala-Ša, “The Soft-Hearted Sioux”',
        },
      ],
      lines: [
        { say: 'Every story chooses how much of its time to show. It can compress years into a sentence, expand one moment into a page, or step out of order.', show: ['b.0', 'b.1'] },
        { say: 'A jump back is called analepsis, or flashback. A jump ahead is called prolepsis.', show: ['b.2', 'b.3'] },
        { say: 'In “The Soft-Hearted Sioux”, nine winters pass in a single sentence. The story skips the long change at the mission school, and lands us at its result, a young man who is a stranger in his father’s village.', show: 'q', focus: 'q' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'First person is not always stream of consciousness', md: '“I went to the shop and bought bread” is first person, but it is not stream of consciousness. Look at **how the thoughts move**, not only at the pronoun.' },
      ],
      lines: [
        { say: 'Here is a common mistake. A first-person story is not always stream of consciousness.', show: 'm' },
        { say: 'Stream of consciousness imitates a mind, with associations, half-finished thoughts and memories that interrupt the present. Always look at how the thoughts move, and then ask what the technique does for the reader.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'In “Kew Gardens”, a third-person narrator enters a man’s mind, then a snail’s, then two passers-by. What technique is this?',
          choices: [
            'Stream of consciousness, because one mind drifts freely by association.',
            'Multiple narrators, because each character takes a turn telling the story.',
            'Shifting focalization, because the point of view passes between perceivers.',
            'External narration, because the narrator reports only what can be seen.',
          ],
          answer: 2,
          working: 'The narration stays in the third person but passes from one perceiver to the next. That is shifting focalization.',
        },
      ],
      lines: [
        { say: 'Your turn. In “Kew Gardens”, a third-person narrator enters a man’s mind, then a snail’s, then two passers-by. What technique is this? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is C. The narration stays in the third person but passes from one perceiver to the next. That is shifting focalization.', show: 'q2.answer' },
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
            'Four techniques: stream of consciousness, multiple narrators, shifting focalization, external narration.',
            'Focalization is whose eyes we see through, which can differ from who tells.',
            'Stories compress, expand, flash back and flash forward.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Fiction can follow one mind, hand the telling around, shift between characters, or stay outside them all.', show: 'sum.0' },
        { say: 'Focalization is whose eyes we see through, and that can differ from who tells the story.', show: 'sum.1' },
        { say: 'And stories compress and expand time, and move back and forward. Always ask what each choice does.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
