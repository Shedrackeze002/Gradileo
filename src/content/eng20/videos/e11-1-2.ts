import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e11-1-2',
  lessonId: 'e11-1-2',
  title: 'Motive and Character Change',
  summary:
    'A motive is the reason behind an action, and writers rarely state it, so readers infer it. A dynamic character changes, often because of a catalyst, and an epiphany is a sudden moment of understanding.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [
        { kind: 'title', id: 'title', kicker: 'Fiction', title: 'Motive and Character Change', subtitle: 'Why characters act, and how they change' },
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['I’ll remember it again after the party’s over, she decided. And somehow that seemed quite the best plan....'],
          by: 'Katherine Mansfield, “The Garden Party”',
        },
      ],
      lines: [
        { say: 'In “The Garden Party”, Laura begs her family to call off the party after a young carter is killed. Then she sees herself in a beautiful new hat.', show: 'title' },
        { say: 'Laura never says she wants to enjoy herself more than to do what is right. The word “somehow” and the trailing dots say it for her. In this lesson, you will work out why characters act, and how they change.', show: 'q' },
      ],
    },
    {
      chapter: 'Motive',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Motive', md: 'The reason behind an action: a want, a fear, a belief or a duty.' },
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['Sylvia would have liked him vastly better without his gun; she could not understand why he killed the very birds he seemed to like so much.'],
          by: 'Sarah Orne Jewett, “A White Heron”',
        },
      ],
      lines: [
        { say: 'A motive is the reason behind an action. Writers rarely state it, so we infer it from what a character says, does and thinks.', show: 'def' },
        { say: 'Motives are often mixed. Nine-year-old Sylvia likes the young hunter, but something holds her back.', show: 'q' },
        { say: 'Her friendship with him pulls one way, and her love of the birds pulls the other. That is why her final choice feels hard.', focus: 'q' },
      ],
    },
    {
      chapter: 'Change',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Dynamic and static', md: 'A **dynamic** character changes in an important way. A **static** character stays the same. The **catalyst** is the event that starts the change.' },
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['On her way home she usually bought a slice of honey-cake at the baker’s. It was her Sunday treat.', 'But to-day she passed the baker’s by, climbed the stairs, went into the little dark room—her room like a cupboard—and sat down on the red eiderdown.'],
          by: 'Katherine Mansfield, “Miss Brill”',
        },
      ],
      lines: [
        { say: 'A dynamic character changes in what they believe, understand or do. A static character stays the same. The event that starts a change is the catalyst.', show: 'def' },
        { say: 'Writers often repeat a moment so we can see the character act differently the second time. Every Sunday, Miss Brill buys a honey-cake on her way home.', show: 'q.0' },
        { say: 'But on the day she overhears a young couple mocking her, she passes the baker’s by. Mansfield never says Miss Brill was hurt. The skipped treat and the little dark room show it.', show: 'q.1', focus: 'q.1' },
      ],
    },
    {
      chapter: 'Epiphany',
      layout: 'center',
      main: [
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['Gazing up into the darkness I saw myself as a creature driven and derided by vanity; and my eyes burned with anguish and anger.'],
          by: 'James Joyce, “Araby”',
        },
        { kind: 'text', id: 'ans', size: 'md', md: 'An **epiphany** is a sudden moment of understanding.' },
      ],
      lines: [
        { say: 'An epiphany is a sudden moment of understanding, when a character sees themselves in a new light. At the end of “Araby”, a boy reaches the bazaar as it closes.', show: 'q' },
        { say: 'He suddenly sees his grand romance as foolish self-importance.', show: 'ans', focus: 'q' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Words are not always the motive', md: 'Goodman Brown promises to be good “after this one night”, but the promise lets him hurry on to his “evil purpose” with a clear conscience. **Test** a stated reason against what the character does.' },
      ],
      lines: [
        { say: 'Here is a common mistake. What a character says is not always the motive.', show: 'm' },
        { say: 'Goodman Brown promises to be good after this one night. But that promise is what lets him hurry on to his evil purpose. Characters fool themselves, so test their words against their actions.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Miss Brill skips her honey-cake after a cruel remark. What is that remark called?',
          choices: [
            'A motive, because it is the reason behind her whole routine.',
            'An epiphany, because it is a sudden moment of understanding.',
            'A foil, because it is a contrast that makes her stand out.',
            'A catalyst, because it is the event that sets her change off.',
          ],
          answer: 3,
          working: 'The remark is the event that sets her change in motion, which is a catalyst. The other choices name different ideas.',
        },
      ],
      lines: [
        { say: 'Your turn. Miss Brill skips her honey-cake after a cruel remark. What is that remark called? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is D. The remark is the event that sets her change in motion, which is a catalyst. The other choices name different ideas.', show: 'q2.answer' },
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
            'A motive is the reason behind an action; infer it and expect it to be mixed.',
            'A dynamic character changes; a catalyst sets the change off.',
            'An epiphany is a sudden moment of understanding.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A motive is the reason behind an action, and we infer it, often as a mix of reasons.', show: 'sum.0' },
        { say: 'A dynamic character changes, and a catalyst sets the change off.', show: 'sum.1' },
        { say: 'And an epiphany is a sudden moment of understanding.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
