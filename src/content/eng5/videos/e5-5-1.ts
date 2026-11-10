import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e5-5-1',
  lessonId: 'e5-5-1',
  title: 'Parts of Speech',
  summary:
    'The parts of speech are the jobs words do in a sentence. Nouns name, pronouns replace nouns, verbs show action or being, adjectives describe nouns and adverbs describe verbs.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Grammar and Punctuation', title: 'Parts of Speech', subtitle: 'Every word has a job' }],
      lines: [
        { say: 'Every word in a sentence has a job. Some words name things, some tell what happens, and some describe.', show: 'title' },
        { say: 'In this lesson, you will learn five of these jobs. Knowing them helps you build clear sentences, and fix ones that sound wrong.' },
      ],
    },
    {
      chapter: 'Five parts of speech',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Parts of speech', md: 'The **parts of speech** are the jobs words do in a sentence.' },
        {
          kind: 'table',
          id: 't',
          head: ['Part of speech', 'Its job', 'Examples'],
          rows: [
            ['**Noun**', 'names a person, place, thing or idea', '*girl, city, pencil, kindness*'],
            ['**Pronoun**', 'takes the place of a noun', '*I, you, he, she, it, we, they*'],
            ['**Verb**', 'shows an action or a state of being', '*run, jump, think, is, was*'],
            ['**Adjective**', 'describes a noun', '*tall, blue, three, noisy*'],
            ['**Adverb**', 'describes a verb: how, when or where', '*quickly, yesterday, outside*'],
          ],
        },
      ],
      lines: [
        { say: 'The parts of speech are the jobs words do in a sentence.', show: 'def' },
        { say: 'A noun names a person, place, thing or idea, like girl, city, pencil or kindness.', show: 't', focus: 't.0' },
        { say: 'A pronoun takes the place of a noun, like I, you, she, it or they.', focus: 't.1' },
        { say: 'A verb shows an action, like run or jump, or a state of being, like is or was.', focus: 't.2' },
        { say: 'An adjective describes a noun. It tells what kind, which one, or how many, like tall, blue or three.', focus: 't.3' },
        { say: 'And an adverb describes a verb. It tells how, when or where, like quickly, yesterday or outside.', focus: 't.4' },
        { say: 'A noun that names one particular person, place or thing, like Maya or Monday, is a proper noun, and it always starts with a capital letter. Other nouns are common nouns.' },
      ],
    },
    {
      chapter: 'Labelling a sentence',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['The tired dog slept peacefully.'] },
        { kind: 'table', id: 't', head: ['tired', 'dog', 'slept', 'peacefully'], rows: [['adjective', 'noun', 'verb', 'adverb']] },
      ],
      lines: [
        { say: 'Let’s name the part of speech of each word after the.', show: 'q' },
        { say: 'Dog names an animal, so it is a noun. Tired describes the dog, so it is an adjective.', show: 't' },
        { say: 'Slept is what the dog did, so it is a verb. And peacefully tells how it slept, so it is an adverb.' },
        { say: 'Also, a word’s part of speech depends on its job. In we play outside, play is a verb. In we watched a play, it is a noun.' },
      ],
    },
    {
      chapter: 'Adjective or adverb?',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['Sam sang _____ at the concert. (*beautiful* or *beautifully*?)'] },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Good and well', md: '*Good* is an adjective; *well* is the adverb. *A* ***good*** *game*, but *she played* ***well***.' },
      ],
      lines: [
        { say: 'Adjectives describe nouns, and adverbs describe verbs. Many adverbs are made by adding L Y to an adjective: quiet becomes quietly.', caption: 'Adjectives describe nouns, and adverbs describe verbs. Many adverbs are made by adding -ly to an adjective: quiet becomes quietly.' },
        { say: 'Which word fits here? The word describes sang, which is a verb. A word that describes a verb is an adverb, so the answer is beautifully.', show: 'q', focus: 'q' },
        { say: 'Here is a common mistake. Good is an adjective, and well is the adverb. Say a good game, describing the noun game, but she played well, describing the verb played. She played good is wrong.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: '“The noisy crowd cheered loudly.” Which word is an adverb?',
          choices: ['noisy', 'loudly', 'crowd', 'cheered'],
          answer: 1,
          working: '“Loudly” tells how the crowd cheered, so it describes a verb. “Noisy” is an adjective, “crowd” a noun and “cheered” a verb.',
        },
      ],
      lines: [
        { say: 'Your turn. Which word in this sentence is an adverb? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is B, loudly. It tells how the crowd cheered, so it describes a verb. Noisy is an adjective, crowd is a noun, and cheered is a verb.', show: 'q2.answer' },
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
            '**Nouns** name; **pronouns** replace nouns; **verbs** show action or being.',
            '**Adjectives** describe nouns; **adverbs** describe verbs.',
            'Many adverbs end in *-ly*; *well* is the adverb for *good*.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Nouns name, pronouns replace nouns, and verbs show action or being.', show: 'sum.0' },
        { say: 'Adjectives describe nouns, and adverbs describe verbs: how, when or where.', show: 'sum.1' },
        { say: 'And many adverbs end in L Y, but well is the adverb for good.', caption: 'And many adverbs end in -ly, but well is the adverb for good.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
