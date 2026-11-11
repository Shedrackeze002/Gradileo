import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e7-1-1',
  lessonId: 'e7-1-1',
  title: 'Conflict and Suspense',
  summary:
    'A conflict is the struggle a character faces. External conflicts are with something outside the character and internal conflicts happen in the mind, and writers build suspense with cliffhangers, short sentences, unanswered questions, ticking clocks and slowed-down moments.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Short Stories', title: 'Conflict and Suspense', subtitle: 'The struggle that drives a story' }],
      lines: [
        { say: 'Every story is driven by a conflict, and the way a writer handles it decides whether you keep turning the pages.', show: 'title' },
        { say: 'In this video we sort conflicts into two big families, see how one kind can lead to the other, and look at five ways writers build suspense.' },
      ],
    },
    {
      chapter: 'Two families of conflict',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Conflict', md: 'A **conflict** is a struggle the main character has to face. An **external** conflict is with something outside the character. An **internal** conflict happens inside the character’s own mind.' },
        {
          kind: 'table',
          id: 't',
          head: ['Conflict', 'Family', 'Example'],
          rows: [
            ['Character against character', 'external', '*two rivals both want to be captain*'],
            ['Character against nature', 'external', '*a family escapes a flood*'],
            ['Character against society', 'external', '*a girl protests an unfair town rule*'],
            ['Character against technology', 'external', '*a robot vacuum that will not obey*'],
            ['Character against self', 'internal', '*a boy cannot decide whether to tell the truth*'],
          ],
        },
      ],
      lines: [
        { say: 'A conflict is a struggle the main character has to face. Without one, nothing much happens, and there is no story.', show: 'def' },
        { say: 'Conflicts fall into two families. An external conflict is a struggle with something outside the character. An internal conflict happens inside the character’s own mind: a fear, a doubt, or a hard choice.', focus: 'def' },
        { say: 'Four kinds are external: character against character, against nature, against society, and against technology.', show: 't', focus: ['t.0', 't.1', 't.2', 't.3'] },
        { say: 'Only one is internal: character against self, like a boy who cannot decide whether to tell the truth.', focus: 't.4' },
      ],
    },
    {
      chapter: 'Finding both conflicts',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['“Tell anyone and you’ll be sorry,” Leo hissed.', 'All through maths, Ana stared at her book. If she told the teacher, it might stop. Or it might get much worse.'] },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'The setting is not always the conflict', md: 'A story set at a race is not automatically about the race. If the passage stays inside a runner’s head, worrying about falling again, the main conflict is **internal**.' },
      ],
      lines: [
        { say: 'The best stories usually have both kinds. Look at this passage.', show: 'q.0' },
        { say: 'Leo threatens Ana, so there is an external conflict, character against character.', focus: 'q.0' },
        { say: 'But that threat creates a struggle inside Ana’s head. Should she tell, or stay silent? That is an internal conflict, character against self. The outside problem makes us care, and the inside struggle makes us care even more.', show: 'q.1', focus: 'q.1' },
        { say: 'Watch out for this mistake. A story set at a race is not automatically about the race. If the passage spends its time inside a runner’s head, the main conflict is internal.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Building suspense',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Suspense', md: '**Suspense** is the worry a reader feels about what will happen next.' },
        {
          kind: 'bullets',
          id: 'b',
          items: [
            'a **cliffhanger**: stop at a moment of danger',
            '**short, quick sentences**, like a racing heartbeat',
            'a **question left unanswered**',
            'a **ticking clock**: a deadline running out',
            '**slowing down a moment** with tiny details',
          ],
        },
        { kind: 'quote', id: 'q', size: 'md', lines: ['The door creaked open. Sam froze. Footsteps. Closer. Closer.'] },
      ],
      lines: [
        { say: 'Suspense is the worry a reader feels about what will happen next. It is what keeps you reading just one more page.', show: 'def' },
        { say: 'Writers build it in five main ways. A cliffhanger stops at a moment of danger, before we find out what happens. Short, quick sentences speed up the reading, like a racing heartbeat.', show: ['b.0', 'b.1'] },
        { say: 'A question left unanswered holds back a mystery. A ticking clock gives a deadline that is running out. And slowing down a moment stretches a few seconds with tiny details, so the reader has to wait.', show: ['b.2', 'b.3', 'b.4'] },
        { say: 'Here the sentences get shorter and shorter, and two are single words. Reading them feels like holding your breath.', show: 'q', focus: 'q' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: '“The bridge would close at midnight. It was 11:40, and the car still would not start.” Which way of building suspense is this?',
          choices: ['A cliffhanger', 'Slowing down a moment', 'A ticking clock', 'An internal conflict'],
          answer: 2,
          working: 'The bridge closes at midnight and time is running out, so the deadline creates the suspense.',
        },
      ],
      lines: [
        { say: 'Your turn. The bridge will close at midnight, it is eleven forty, and the car will not start. Which way of building suspense is this? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is C, a ticking clock. There is a deadline, and the minutes are running out.', show: 'q2.answer' },
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
            '**External** conflict is with something outside; **internal** conflict is in the mind.',
            'An external conflict often creates an internal one.',
            '**Suspense** is the reader’s worry about what comes next.',
            'Build it with cliffhangers, short sentences, unanswered questions, ticking clocks and slowed moments.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An external conflict is with something outside the character, and an internal conflict happens in the mind.', show: 'sum.0' },
        { say: 'An external conflict often creates an internal one, and good stories use both.', show: 'sum.1' },
        { say: 'Suspense is the reader’s worry about what comes next.', show: 'sum.2' },
        { say: 'And writers build it with cliffhangers, short sentences, unanswered questions, ticking clocks and slowed-down moments.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
