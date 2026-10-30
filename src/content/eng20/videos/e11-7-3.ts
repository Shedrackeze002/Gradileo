import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e11-7-3',
  lessonId: 'e11-7-3',
  title: 'Active, Passive and the Subjunctive',
  thumbnailTitle: 'Active, Passive and Subjunctive',
  thumbnail: false,
  summary:
    'Choose between the active and passive voice on purpose, and use the subjunctive mood for wishes, imagined situations and demands in formal writing.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Grammar and Language', title: 'Active, Passive and the Subjunctive', subtitle: 'Choose your verbs on purpose' }],
      lines: [
        { say: 'Compare two sentences about one event. The striker scored the winning goal. The winning goal was scored by the striker.', show: 'title' },
        { say: 'The facts are the same, but the first puts the person in the spotlight and the second puts the goal there. In this lesson you will choose between active and passive voice, and use the subjunctive mood.' },
      ],
    },
    {
      chapter: 'Active and passive',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            'Active: *The volunteers cleaned the beach.*',
            'Passive: *The beach was cleaned by the volunteers.*',
            'Passive: *The new footbridge will be built next year.*',
            'Active: *A local artist was designing the new stamps.*',
          ],
        },
      ],
      lines: [
        { say: 'In the active voice, the subject does the action.', show: 'b.0', focus: 'b.0' },
        { say: 'In the passive voice, the subject receives it. The doer, if named at all, comes after by.', show: 'b.1', focus: 'b.1' },
        { say: 'A passive verb has two parts: a form of be, and a past participle. Will be built is passive, and no doer is named.', show: 'b.2', focus: 'b.2' },
        { say: 'But was does not always mean passive. Was designing is followed by an ing word, not a past participle, and the artist is doing the action, so this sentence is active.', show: 'b.3', focus: 'b.3' },
      ],
    },
    {
      chapter: 'When the passive is better',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'p',
          items: [
            'Doer unknown: *My bicycle was taken from outside the library.*',
            'Method matters: *The solution was heated to 80 °C and stirred for five minutes.*',
            'Save the doer: *The final was won by a fifteen-year-old who had never played in a stadium before.*',
          ],
        },
      ],
      lines: [
        { say: 'Use the active voice by default, because it is clearer and more direct. The passive is better when the doer is unknown or does not matter.', show: 'p.0' },
        { say: 'It also suits a scientific method, where the process matters more than the person.', show: 'p.1' },
        { say: 'And it lets you save the doer for the end, for emphasis. Read it critically, though, because it can hide who is responsible.', show: 'p.2' },
      ],
    },
    {
      chapter: 'The subjunctive mood',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 's',
          items: [
            'Wishes: *I wish my grandmother were here to see this.*',
            'Imagined: *If I were taller, I could reach the top shelf.*',
            'Demands: *The coach insisted that Nia be on time for every practice.*',
            'Demands: *The doctor recommended that Omar drink more water.*',
          ],
        },
      ],
      lines: [
        { say: 'The subjunctive presents something wished for, imagined or demanded, rather than real.', show: 's.0' },
        { say: 'After if, wish and as if, formal writing uses were for every subject.', show: 's.1', focus: 's.1' },
        { say: 'After words like insist, suggest and recommend, use the base form of the verb, with no s and no change for the past.', show: ['s.2', 's.3'], focus: ['s.2', 's.3'] },
        { say: 'In everyday speech, many people say if I was taller, and listeners understand. In formal writing, such as essays and applications, use were.' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'm', items: ['Wrong: *If I would have known about the party, I would have come.*', 'Right: *If I had known about the party, I would have come.*'] },
      ],
      lines: [
        { say: 'A common mistake is putting would have in both parts of an imagined past.', show: 'm.0', focus: 'm.0' },
        { say: 'For something that did not happen, put had and a past participle in the if part, and would have in the other. The same goes for wishes about the past: I wish I had bought the tickets.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q3',
          prompt: 'Which sentence is correct in formal writing?',
          choices: [
            'The doctor recommended that Omar drinks more water every day.',
            'The doctor recommended that Omar drink more water every day.',
            'I wish my grandmother was here to see this award today.',
            'If I would have known about the party, I would have come.',
          ],
          answer: 1,
          working: 'B uses the base form after recommended. A adds an s, C should say were, and D should say had known.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these sentences is correct in formal writing? Pause the video and try it.', show: 'q3', wait: 6 },
        { say: 'The answer is B. After recommended, the verb takes its base form: drink.', show: 'q3.answer' },
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
          items: ['Use the active voice by default; choose the passive on purpose.', 'Formal wishes and imagined situations take *were*.', 'After demands, use the base form; for an imagined past, use *had*.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Use the active voice by default, and choose the passive on purpose.', show: 'sum.0' },
        { say: 'In formal writing, wishes and imagined situations take were.', show: 'sum.1' },
        { say: 'And after demands, use the base form, while an imagined past uses had.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
