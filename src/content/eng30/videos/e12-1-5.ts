import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e12-1-5',
  lessonId: 'e12-1-5',
  title: 'Style, Tone and Irony',
  summary:
    'Style is how a writer writes: diction, syntax, imagery, and rhythm and sound. Tone is the narrator’s attitude, and irony is a gap between what is said or expected and what is meant or happens.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [
        { kind: 'title', id: 'title', kicker: 'Fiction', title: 'Style, Tone and Irony', subtitle: 'Not what a writer says, but how' },
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['His soul swooned slowly as he heard the snow falling faintly through the universe and faintly falling, like the descent of their last end, upon all the living and the dead.'],
          by: 'James Joyce, “The Dead”',
        },
      ],
      lines: [
        { say: 'Read the last sentence of James Joyce’s “The Dead” aloud, slowly.', show: ['title', 'q'] },
        { say: 'The soft s and f sounds, the words falling faintly turned around into faintly falling, and the long, unhurried sentence all make the prose itself fall like snow. That is style: not what a writer says, but how. In this lesson, you will analyse style, and recognize tone and irony.' },
      ],
    },
    {
      chapter: 'Style',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['**Diction**: word choice, from plain to grand', '**Syntax**: sentence length and structure', '**Imagery**', '**Rhythm and sound**'],
        },
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['Soon, soon I shall know, for now I see the east is growing red.', 'My heart is strong.', 'My face is calm.', 'My eyes are dry and eager for new scenes.'],
          by: 'Zitkala-Ša, “The Soft-Hearted Sioux”',
        },
      ],
      lines: [
        { say: 'A writer’s style is their characteristic way of using language. It includes diction, syntax, imagery, and the rhythm and sound of the prose. The personality we sense behind those choices is the authorial voice.', show: ['b.0', 'b.1', 'b.2', 'b.3'] },
        { say: 'Style is easiest to see by contrast. Zitkala-Sha ends “The Soft-Hearted Sioux” very differently from Joyce, as the narrator waits for dawn and the gallows.', show: 'q.0' },
        { say: 'The sentences are short and plain, and each one is a statement of control. The bare style matches the composure the narrator is claiming in the face of death.', show: ['q.1', 'q.2', 'q.3'] },
        { say: 'Always name the feature, and then say what it does. The effect is where the marks are.', focus: 'b' },
      ],
    },
    {
      chapter: 'Tone and irony',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['**Verbal irony**: the words say one thing, the speaker means another', '**Situational irony**: the outcome reverses what was expected', '**Dramatic irony**: the reader knows what a character does not'],
        },
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['By accident, combined perhaps with some natural affinity, the society consisted of individuals who were, generally speaking, more white than black.'],
          by: 'Charles W. Chesnutt, “The Wife of His Youth”',
        },
      ],
      lines: [
        { say: 'Tone is the attitude a narrator’s words carry towards the subject, such as ironic, sympathetic, detached or admiring. It can shift as the story moves.' },
        { say: 'Irony is a gap between what is said or expected and what is meant or happens. It can be verbal, situational or dramatic.', show: ['b.0', 'b.1', 'b.2'] },
        { say: 'Chesnutt’s narrator says this with a straight face, but we are meant to doubt the words by accident. The society chose its members by colour, and the mild words let us see through its own excuse.', show: 'q', focus: 'q' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Irony is not bad luck', md: 'Rain on the day of a picnic is unlucky, not ironic. Irony needs a **gap** between expectation and outcome, or between words and meaning.' },
      ],
      lines: [
        { say: 'Here is a common mistake. Irony is not bad luck.', show: 'm' },
        { say: 'Rain on the day of a picnic is only unlucky. Rain on the day of a picnic held to celebrate the end of a drought would be ironic. Look for the reversal, not just the misfortune.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which of these is ironic, and not merely unlucky?',
          choices: [
            'Rain falls on a picnic held to celebrate the end of a drought.',
            'Rain falls on a picnic the whole family had planned for weeks.',
            'A traveller is caught in a storm and has a cold, wet journey.',
            'A farmer misses the bus in the rain and arrives late to work.',
          ],
          answer: 0,
          working: 'The rain reverses what the picnic was meant to celebrate. The other choices are only misfortunes, with no gap between expectation and outcome.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these is ironic, and not merely unlucky? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is A. The rain reverses what the picnic was meant to celebrate. The other choices are only misfortunes, with no gap between expectation and outcome.', show: 'q2.answer' },
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
            'Style is how a writer writes: diction, syntax, imagery, rhythm and sound.',
            'Name a feature, then explain its effect.',
            'Tone is the narrator’s attitude; irony is a gap between what is said or expected and what happens.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Style is how a writer writes: diction, syntax, imagery, and rhythm and sound.', show: 'sum.0' },
        { say: 'Name a feature of style, then explain its effect on meaning or feeling.', show: 'sum.1' },
        { say: 'Tone is the narrator’s attitude, and irony is a gap between what is said or expected and what is meant or happens.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
