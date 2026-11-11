import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e8-6-2',
  lessonId: 'e8-6-2',
  title: 'Misplaced and Dangling Modifiers',
  summary:
    'A modifier is a word or phrase that describes another word, and it should sit next to the word it describes. A misplaced modifier is next to the wrong word, so move it; words like only and almost change the meaning with their position. A dangling modifier has nothing to describe, so name the doer straight after the comma.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Grammar and Punctuation', title: 'Misplaced and Dangling Modifiers', subtitle: 'Was the deer driving?' }],
      lines: [
        { say: 'I saw a deer driving home from school. Was the deer driving?', show: 'title' },
        { say: 'In this video we find and fix modifiers that are in the wrong place, or have nothing to describe.' },
      ],
    },
    {
      chapter: 'What a modifier is',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Modifier', md: 'A **modifier** is a word or phrase that describes or limits another word: *in paper cups*, *with a leather wallet*, *only*, *almost*. A modifier should sit **next to** the word it describes.' },
        { kind: 'callout', id: 'mm', tone: 'key', title: 'Misplaced modifier', md: 'A **misplaced modifier** is next to the **wrong** word, so it seems to describe the wrong thing.' },
      ],
      lines: [
        { say: 'A modifier is a word or phrase that describes or limits another word, such as in paper cups, with a leather wallet, only or almost.', show: 'def' },
        { say: 'A modifier should sit next to the word it describes.', focus: 'def' },
        { say: 'A misplaced modifier is placed next to the wrong word, so it seems to describe the wrong thing.', show: 'mm' },
      ],
    },
    {
      chapter: 'Fixing misplaced modifiers',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Misplaced', 'Fixed'],
          rows: [
            ['The man sold a dog with a leather wallet to my neighbour.', 'The man with a leather wallet sold a dog to my neighbour.'],
            ['Leo served the guests in paper cups cold drinks.', 'Leo served the guests cold drinks in paper cups.'],
          ],
        },
        {
          kind: 'table',
          id: 'w',
          head: ['Sentence', 'Meaning'],
          rows: [
            ['**Only** Leo finished the essay.', 'nobody else finished it'],
            ['Leo finished **only** the essay.', 'he finished nothing else'],
          ],
        },
      ],
      lines: [
        { say: 'The man sold a dog with a leather wallet to my neighbour. Here, with a leather wallet sits next to dog, so it sounds as though the dog has the wallet. Move it next to the man.', show: 't', focus: 't.0' },
        { say: 'Leo served the guests in paper cups cold drinks. What is in paper cups? The drinks, not the guests. So move the phrase to sit right after drinks.', focus: 't.1' },
        { say: 'Small words like only, almost and just change the meaning depending on where they go. Only Leo finished the essay means nobody else finished it. Leo finished only the essay means he finished nothing else.', show: 'w' },
      ],
    },
    {
      chapter: 'Dangling modifiers',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Dangling modifier', md: 'A **dangling modifier** is usually an opening phrase with **no clear word** to describe. The doer is never named, so the phrase attaches to whatever comes after the comma.' },
        { kind: 'text', id: 'e', size: 'md', md: '*Running late, the bus left without me.* Was the bus running late?' },
      ],
      lines: [
        { say: 'A dangling modifier is usually an opening phrase that has no clear word to describe. The person doing the action is never named, so the phrase attaches itself to whatever comes after the comma.', show: 'def' },
        { say: 'Running late, the bus left without me. The phrase should describe the person who was late, but the word after the comma is the bus. So it sounds as though the bus was running late.', show: 'e' },
      ],
    },
    {
      chapter: 'Check the word after the comma',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Check the word after the comma', md: 'After an opening phrase, the next word must be the person or thing it describes.\n\n**Works:** *Tired after the match, Leo fell asleep on the bus.*\n\n**Doesn’t:** *Tired after the match, the bus took Leo home.*' },
      ],
      lines: [
        { say: 'Whenever a sentence opens with a phrase like tired after the match, look at the very next word. It must be the person or thing the phrase describes.', show: 'm' },
        { say: 'Tired after the match, Leo fell asleep on the bus works, because Leo was tired. Tired after the match, the bus took Leo home does not. The bus was not tired.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which sentence fixes “Walking to school, the rain started.”?',
          choices: [
            'The rain started, walking to school.',
            'Walking to school, the rain was starting.',
            'Walking to school, I felt the rain start.',
            'Walking to school the rain started.',
          ],
          answer: 2,
          working: 'The walker is never named in the original. Putting “I” straight after the comma gives the phrase the right word to describe.',
        },
      ],
      lines: [
        { say: 'Your turn. Walking to school, the rain started. Which sentence fixes it? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is C. The rain was not walking, and the walker is never named. Putting I straight after the comma gives the phrase the right word to describe. You could also write: as I was walking to school, the rain started.', show: 'q2.answer' },
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
            'A **modifier** should sit next to the word it describes.',
            'A **misplaced modifier** is next to the wrong word: move it.',
            'Watch where *only*, *almost* and *just* go.',
            'A **dangling modifier** has nothing to describe: name the doer after the comma.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A modifier should sit next to the word it describes.', show: 'sum.0' },
        { say: 'A misplaced modifier is next to the wrong word, so move it.', show: 'sum.1' },
        { say: 'Watch where only, almost and just go, because they change the meaning.', show: 'sum.2' },
        { say: 'And a dangling modifier has nothing to describe, so name the doer straight after the comma.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
