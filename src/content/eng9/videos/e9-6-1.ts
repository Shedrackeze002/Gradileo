import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e9-6-1',
  lessonId: 'e9-6-1',
  title: 'Verbals',
  summary:
    'A verbal is a verb form used as a noun, an adjective or an adverb rather than as the main verb: a gerund is an -ing noun, a participle works as an adjective, and an infinitive is to + verb. Verbal phrases combine short sentences smoothly, but a participial phrase at the start must describe the word after the comma, or it dangles.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Grammar and Punctuation', title: 'Verbals', subtitle: 'Gerunds, participles and infinitives' }],
      lines: [
        { say: 'Some words look like verbs, but do a different job in the sentence. They let you pack more action into fewer words.', show: 'title' },
        { say: 'In this video we identify the three kinds of verbal, and use verbal phrases to combine sentences.' },
      ],
    },
    {
      chapter: 'Three kinds of verbal',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Verbal', md: 'A **verbal** is a verb form used as a **noun**, an **adjective** or an **adverb**, rather than as the main verb.' },
        {
          kind: 'table',
          id: 't',
          head: ['Verbal', 'What it does', 'Example'],
          rows: [
            ['**Gerund**', 'an -ing form used as a noun', '**Swimming** is my favourite sport.'],
            ['**Participle**', 'a verb form used as an adjective', 'The **crying** baby fell asleep. The **broken** window let in the cold.'],
            ['**Infinitive**', '*to* + a verb', 'Amara wants **to travel** the world.'],
          ],
        },
      ],
      lines: [
        { say: 'A verbal is a verb form used as a noun, an adjective or an adverb, rather than as the main verb of the sentence.', show: 'def' },
        { say: 'A gerund is an ing form used as a noun. Swimming is my favourite sport. Swimming is the thing the sentence is about.', show: 't', focus: 't.0' },
        { say: 'A participle is a verb form used as an adjective. It can end in ing, as in the crying baby, or be a past form, as in the broken window.', focus: 't.1' },
        { say: 'And an infinitive is to plus a verb. Amara wants to travel the world.', focus: 't.2' },
      ],
    },
    {
      chapter: 'Gerund or participle?',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Sentence', 'Job of *solving*', 'So it is a…'],
          rows: [
            ['Leo is good at **solving** puzzles.', 'names an activity', '**gerund** (noun)'],
            ['The **solving** team won a prize.', 'describes *team*', '**participle** (adjective)'],
          ],
        },
        { kind: 'callout', id: 'k', tone: 'key', title: 'Look at the job', md: 'The same -ing word can do either job, so look at **what it does** in the sentence.' },
      ],
      lines: [
        { say: 'An ing word can be a gerund or a participle. Leo is good at solving puzzles. Here solving comes after at, and names an activity, so it is a gerund, a noun.', show: 't', focus: 't.0' },
        { say: 'The solving team won a prize. Here solving describes the noun team, so it is a participle, an adjective.', focus: 't.1' },
        { say: 'The same word can do either job, so always look at what it does in the sentence.', show: 'k' },
      ],
    },
    {
      chapter: 'Verbal phrases',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Two sentences', 'Combined'],
          rows: [
            ['Amara opened the letter. She was trembling.', '**Trembling**, Amara opened the letter.'],
            ['The team won the cup. The team celebrated all night.', '**Having won the cup**, the team celebrated all night.'],
          ],
        },
        { kind: 'text', id: 'e', size: 'md', md: 'Purpose: **To win the final**, we must defend well.' },
      ],
      lines: [
        { say: 'A verbal can lead a whole phrase, and these phrases are useful for combining short sentences. Amara opened the letter. She was trembling. Combined: trembling, Amara opened the letter.', show: 't', focus: 't.0' },
        { say: 'The team won the cup. The team celebrated all night. Combined: having won the cup, the team celebrated all night. Having won shows that one action came before the other.', focus: 't.1' },
        { say: 'And an infinitive phrase often explains purpose: to win the final, we must defend well.', show: 'e' },
      ],
    },
    {
      chapter: 'Don’t let it dangle',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Don’t let it dangle', md: 'A participial phrase at the start must describe the word straight after the comma. *Running for the bus, my bag fell open* says the bag was running. Write: *Running for the bus, I dropped my bag.*' },
      ],
      lines: [
        { say: 'A participial phrase at the start of a sentence must describe the word straight after the comma.', show: 'm' },
        { say: 'Running for the bus, my bag fell open, says the bag was running. Write instead: running for the bus, I dropped my bag.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'In “Reading late at night keeps me awake”, what is “Reading”?',
          choices: [
            'A participle describing “night”',
            'An infinitive',
            'A gerund: an -ing form used as a noun',
            'The main verb of the sentence',
          ],
          answer: 2,
          working: '“Reading late at night” is the subject of the sentence: the thing that keeps me awake. An -ing form used as a noun is a gerund. The main verb is “keeps”.',
        },
      ],
      lines: [
        { say: 'Your turn. In reading late at night keeps me awake, what is reading? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is C. Reading late at night is the subject of the sentence, the thing that keeps me awake. An ing form used as a noun is a gerund. The main verb is keeps.', show: 'q2.answer' },
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
            'A **gerund** is an -ing form used as a noun.',
            'A **participle** works as an adjective; an **infinitive** is *to* + verb.',
            'Verbal phrases can combine sentences smoothly.',
            'A participial phrase must describe the word after the comma.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A gerund is an ing form used as a noun.', show: 'sum.0' },
        { say: 'A participle works as an adjective, and an infinitive is to plus a verb.', show: 'sum.1' },
        { say: 'Verbal phrases can combine short sentences smoothly.', show: 'sum.2' },
        { say: 'And a participial phrase at the start must describe the word after the comma, or it dangles.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
