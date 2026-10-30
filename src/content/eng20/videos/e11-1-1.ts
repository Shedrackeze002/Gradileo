import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e11-1-1',
  lessonId: 'e11-1-1',
  title: 'Structure and Pacing',
  summary:
    'A story can be chronological, non-linear, a frame narrative, circular or parallel, and each structure has an effect on the reader. Writers also control pacing by choosing between scene and summary.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [
        { kind: 'title', id: 'title', kicker: 'Fiction', title: 'Structure and Pacing', subtitle: 'How a story is arranged in time' },
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['He never smiled, he never frowned, he never changed his voice from the gentle-flowing key to which he tuned the initial sentence, he never betrayed the slightest suspicion of enthusiasm;'],
          by: 'Mark Twain, “The Celebrated Jumping Frog of Calaveras County”',
        },
      ],
      lines: [
        { say: 'In Mark Twain’s “The Celebrated Jumping Frog”, the narrator asks old Simon Wheeler one simple question, and then Wheeler talks and talks.', show: 'title' },
        { say: 'Wheeler’s tale sits inside the narrator’s story like a picture inside a frame. How a writer arranges events in time shapes what we feel. In this lesson, you will learn the main kinds of structure, and how writers control pacing.', show: 'q' },
      ],
    },
    {
      chapter: 'Five structures',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Structure', md: 'The way a story’s events are arranged and ordered.' },
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Chronological**: events in the order they happen',
            '**Non-linear**: jumps back and forth in time',
            '**Frame narrative**: a story told inside another story',
            '**Circular**: the ending returns to the opening',
            '**Parallel**: two storylines told in turn',
          ],
        },
      ],
      lines: [
        { say: 'A story’s structure is the way its events are arranged. The order things happen and the order we learn about them are not always the same.', show: 'def' },
        { say: 'A chronological story tells events in order, like “Araby”. A non-linear story jumps in time. “Désirée’s Baby” opens with a visit, then goes back years to the day Désirée was found as a toddler.', show: ['b.0', 'b.1'], focus: ['b.0', 'b.1'] },
        { say: 'A frame narrative tells one story inside another. A circular story ends where it began, and a parallel story tells two storylines in turn.', show: ['b.2', 'b.3', 'b.4'], focus: ['b.2', 'b.3', 'b.4'] },
      ],
    },
    {
      chapter: 'The effect of structure',
      layout: 'center',
      main: [
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['The California Express on the Southron Railway was due at Yellow Sky in twenty-one minutes.'],
          by: 'Stephen Crane, “The Bride Comes to Yellow Sky”',
        },
        { kind: 'text', id: 'ans', size: 'md', md: 'The reader sees the clash coming before the characters do, so a parallel structure builds **suspense**.' },
      ],
      lines: [
        { say: 'Stephen Crane’s “The Bride Comes to Yellow Sky” is parallel. He leaves the newly married marshal on his train, and jumps to the town ahead.', show: 'q' },
        { say: 'The precise twenty-one minutes tells us both storylines are running at once, and are about to meet. Each time we return to the gunman, Scratchy Wilson, we know something the marshal does not: danger is waiting, and he has no gun.', focus: 'q' },
        { say: 'So every minute of the train ride feels tense. That is the effect of the structure.', show: 'ans' },
      ],
    },
    {
      chapter: 'Pacing',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Scene and summary', md: 'A **scene** shows events moment by moment. A **summary** covers a long stretch of time in a few words. **Pacing** is the speed at which a story moves through time.' },
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['And when he had lived long, and was borne to his grave a hoary corpse, followed by Faith, an aged woman, and children and grandchildren, a goodly procession, besides neighbors not a few, they carved no hopeful verse upon his tombstone, for his dying hour was gloom.'],
          by: 'Nathaniel Hawthorne, “Young Goodman Brown”',
        },
      ],
      lines: [
        { say: 'Pacing is the speed at which a story moves through time. A scene shows events moment by moment, and a summary covers a long stretch in a few words.', show: 'def' },
        { say: 'Hawthorne spends almost all of “Young Goodman Brown” on a single night in the forest. Then he covers the rest of Brown’s life in one sentence.', show: 'q' },
        { say: 'Decades pass in a breath, because for Brown nothing after that night mattered except its gloom. The pacing itself makes the point.', focus: 'q' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Labels that overlap', md: 'A circular story is often told in order, and a story inside a frame usually is too. Choose the feature that makes the story **distinctive**, and call it chronological only when none of the others apply.' },
      ],
      lines: [
        { say: 'Here is a common mistake. Some labels describe the same story.', show: 'm' },
        { say: 'A circular story is often told in order. So choose the feature that makes the story distinctive, and call it chronological only when none of the others apply.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A story opens with a visit, then goes back years to explain how it began. Which structure is it?',
          choices: [
            'Chronological, because every event comes in the order it happened.',
            'Non-linear, because the story jumps back to an earlier time.',
            'Circular, because the story returns to the scene where it began.',
            'Parallel, because two storylines are told in turn at once.',
          ],
          answer: 1,
          working: 'A jump back in time is the mark of a non-linear story. Choices A, C and D each describe a different structure.',
        },
      ],
      lines: [
        { say: 'Your turn. A story opens with a visit, then goes back years to explain how it began. Which structure is it? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is B. A jump back in time is the mark of a non-linear story. Choices A, C and D each describe a different structure.', show: 'q2.answer' },
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
            'Structure can be chronological, non-linear, frame, circular or parallel.',
            'Each structure has an effect, such as suspense.',
            'A scene slows time down; a summary speeds it up.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A story can be chronological, non-linear, a frame narrative, circular or parallel.', show: 'sum.0' },
        { say: 'Each structure has an effect on the reader, such as the suspense of parallel storylines.', show: 'sum.1' },
        { say: 'And writers slow down the moments that matter with scenes.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
