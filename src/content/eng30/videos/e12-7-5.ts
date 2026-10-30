import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e12-7-5',
  lessonId: 'e12-7-5',
  title: 'Etymology and Academic Vocabulary',
  thumbnailTitle: 'Etymology and Vocabulary',
  thumbnail: false,
  summary:
    'Every word has a history, and knowing it helps you remember, work out and use words precisely. Learn how roots and meaning shifts work, then choose the precise verbs and nouns that strong literary analysis needs.',
  scenes: [
    {
      layout: 'center',
      main: [
        { kind: 'title', id: 'title', kicker: 'Language', title: 'Etymology and Academic Vocabulary', subtitle: 'Know where words come from, then choose them precisely' }],
      lines: [
        { say: 'The word disaster hides a belief that most people have long forgotten. It comes from Latin dis, meaning badly, and astrum, meaning star. A disaster was once a misfortune blamed on unlucky stars.', show: 'title' },
        { say: 'In this lesson you will use etymology to understand words, and then choose the precise academic vocabulary that strong literary analysis needs.' },
      ],
    },
    {
      chapter: 'Words have histories',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'e',
          items: [
            '**Companion**: com, with, and panis, bread',
            '**Sinister**: Latin for on the left',
            '**Silly**: once meant happy, blessed',
            '**Awful**: once meant full of awe',
          ],
        },
      ],
      lines: [
        { say: 'Etymology is the history of a word. A root is the core part that carries its basic meaning.', },
        { say: 'Companion comes from words for with and bread, so a companion is someone you share bread with. Sinister comes from the Latin word for on the left, because the left side was once thought unlucky.', show: ['e.0', 'e.1'] },
        { say: 'Meanings can shift completely. Silly once meant happy and blessed, and awful once meant inspiring awe. So in older texts, check what a word meant at the time.', show: ['e.2', 'e.3'] },
      ],
    },
    {
      chapter: 'Roots and cognates',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'r',
          items: [
            '**Nocturnal**: noct, night, and al, having to do with',
            '*Owls are nocturnal hunters.*',
            '**Cognates**: English *night*, German *Nacht*, Latin *nox*',
          ],
        },
      ],
      lines: [
        { say: 'Latin roots run through thousands of English words. Take nocturnal, in the sentence below. The root noct means night, and the ending makes an adjective.', show: ['r.0', 'r.1'], focus: 'r.0' },
        { say: 'Check it against the sentence. Owls hunt in the dark, so nocturnal means active at night.', focus: 'r.1' },
        { say: 'Cognates are words in related languages that descend from the same ancestral word. They are relatives, not borrowings.', show: 'r.2', focus: 'r.2' },
      ],
    },
    {
      chapter: 'Precise verbs for analysis',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'v',
          items: [
            '**juxtaposes**: places two things side by side',
            '**foreshadows**: hints at something that will happen later',
            '**undercuts**: weakens something by working against it',
            '**evokes**: calls up a memory or feeling',
          ],
        },
      ],
      lines: [
        { say: 'Weak analysis leans on a few vague verbs. A text shows, talks about or deals with something, and that could describe almost anything.', },
        { say: 'Precise verbs say exactly what the writer is doing. A text juxtaposes two things, or foreshadows what comes later.', show: ['v.0', 'v.1'] },
        { say: 'It undercuts an idea by working against it, or evokes a memory or feeling. Precise nouns help too, such as motif, foil, subtext and ambiguity.', show: ['v.2', 'v.3'] },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'm',
          tone: 'mistake',
          title: 'Length is not precision',
          md: 'Adding words is not the same as adding meaning. A precise sentence names what the text does and how: *His short, clipped replies suggest an anger that he is struggling to keep under control.*',
        },
      ],
      lines: [
        { say: 'Here is a common mistake: thinking that a longer sentence is a more precise one. Words like very and upset add words, not meaning.', show: 'm' },
        { say: 'Name the detail in the text, then say exactly what it suggests.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which sentence analyses the text most precisely?',
          choices: [
            'The writer talks about the storm and shows that it is bad for them.',
            'The opening storm foreshadows the loss that the family suffers later.',
            'The writer deals with the storm and shows how upset the family feels.',
            'The storm scene is very important and shows a lot about the family.',
          ],
          answer: 1,
          working: 'B uses a precise verb and names what the storm does. A, C and D lean on vague verbs and filler words.',
        },
      ],
      lines: [
        { say: 'Your turn. Which sentence analyses the text most precisely? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is B. It uses a precise verb, and names what the storm does. A, C and D lean on vague verbs and filler words.', show: 'q2.answer' },
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
            'Etymology is a word’s history, and meanings can shift.',
            'Trust a dictionary, and check a root before relying on it.',
            'Use precise verbs and nouns, and name what the text does.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Etymology is a word’s history, and a word’s meaning can shift completely over time.', show: 'sum.0' },
        { say: 'Trust a good dictionary over a clever story, and check a root before you rely on it.', show: 'sum.1' },
        { say: 'And in analysis, replace vague verbs with precise ones, and name exactly what the text does.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
