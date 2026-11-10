import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e7-7-4',
  lessonId: 'e7-7-4',
  title: 'Research and Citing Sources',
  summary:
    'A good research question is focused, neither too broad nor too narrow, and needs several sources to answer. Quote exact words, paraphrase ideas in your own words, and always cite your sources, because plagiarism is presenting others’ words or ideas as your own.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Writing', title: 'Research and Citing Sources', subtitle: 'Finding out, and giving credit' }],
      lines: [
        { say: 'Research is how we find out what we do not already know.', show: 'title' },
        { say: 'A good research project starts with a focused question, uses reliable sources, and gives credit to every source it uses. In this video we learn each step.' },
      ],
    },
    {
      chapter: 'The research question',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Research question', md: 'A **research question** is the question your research sets out to answer. It focuses your search for information.' },
        {
          kind: 'table',
          id: 't',
          head: ['A good question is…', 'Not like this'],
          rows: [
            ['**focused**: *How do bees find their way back to their hive?*', '*Bees*'],
            ['**not too broad**', '*What is the history of science?*'],
            ['**not too narrow**', '*What year was the Eiffel Tower finished?*'],
            ['**open**: it needs several sources', 'a question one fact can answer'],
          ],
        },
      ],
      lines: [
        { say: 'A research question is the question your research sets out to answer. It focuses your search for information.', show: 'def' },
        { say: 'A good research question is focused. How do bees find their way back to their hive is focused. Just bees is not a question at all.', show: 't', focus: 't.0' },
        { say: 'It is not too broad. What is the history of science would take a lifetime. And it is not too narrow. When the Eiffel Tower was finished can be answered in seconds.', focus: ['t.1', 't.2'] },
        { say: 'And it is open: it needs information from several sources to answer.', focus: 't.3' },
      ],
    },
    {
      chapter: 'Improving a question',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['Is pollution bad?'] },
        { kind: 'text', id: 'a', size: 'lg', md: 'How does **plastic pollution** affect **sea turtles** in the **Mediterranean**?' },
      ],
      lines: [
        { say: 'Is pollution bad? The answer is obviously yes, and pollution is a huge subject.', show: 'q' },
        { say: 'So narrow it to one kind of pollution, one living thing and one place. How does plastic pollution affect sea turtles in the Mediterranean?', show: 'a' },
      ],
    },
    {
      chapter: 'Using sources',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Word', 'Meaning'],
          rows: [
            ['**quote**', 'use a source’s exact words, inside quotation marks'],
            ['**paraphrase**', 'put a source’s idea into your own words and sentence structure'],
            ['**cite**', 'say where an idea or quotation came from'],
            ['**plagiarism**', 'using someone else’s words or ideas without saying where they came from'],
          ],
        },
      ],
      lines: [
        { say: 'When you use a source, there are four words to know. To quote is to use a source’s exact words, inside quotation marks.', show: 't', focus: 't.0' },
        { say: 'To paraphrase is to put a source’s idea into your own words and your own sentence structure.', focus: 't.1' },
        { say: 'To cite is to say where an idea or quotation came from. And plagiarism is using someone else’s words or ideas without saying where they came from.', focus: ['t.2', 't.3'] },
      ],
    },
    {
      chapter: 'A paraphrase',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['Honeybees perform a “waggle dance” to tell other bees where flowers are. The angle of the dance shows the direction, and its length shows the distance.'] },
        { kind: 'text', id: 'p', size: 'md', md: '**Paraphrase:** Bees share the location of food by dancing: the angle of the dance gives the direction, and how long it lasts gives the distance.' },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Changing a few words is not paraphrasing', md: 'Swapping one or two synonyms is still too close. Read, **look away**, write the idea your own way, then check the meaning.' },
      ],
      lines: [
        { say: 'Here is a source about honeybees.', show: 'q' },
        { say: 'And here is a paraphrase. It keeps the meaning but changes the words and the order. It still needs a citation, because the idea belongs to the original author.', show: 'p', focus: 'p' },
        { say: 'Quote when the exact words are especially powerful, and paraphrase the rest. And remember that changing a few words is not paraphrasing. Read the passage, look away, and write the idea in your own way.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which is the best research question for a two-page report?',
          choices: ['Animals', 'What is the history of every animal on Earth?', 'How many legs does a spider have?', 'How do Arctic foxes survive the winter?'],
          answer: 3,
          working: 'A is not a question, B is far too broad, and C is answered by one fact. D is focused and needs several sources.',
        },
      ],
      lines: [
        { say: 'Your turn. Which is the best research question for a two-page report? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is D. Choice A is not a question, B is far too broad, and C is answered by one fact. How do Arctic foxes survive the winter is focused, and needs several sources.', show: 'q2.answer' },
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
            'A good **research question** is focused, neither too broad nor too narrow.',
            '**Quote** exact words; **paraphrase** ideas in your own words.',
            'Always **cite** your sources, whether you quote or paraphrase.',
            '**Plagiarism** is presenting others’ words or ideas as your own.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A good research question is focused, neither too broad nor too narrow, and needs several sources.', show: 'sum.0' },
        { say: 'Quote exact words, and paraphrase ideas in your own words.', show: 'sum.1' },
        { say: 'Always cite your sources, whether you quote or paraphrase.', show: 'sum.2' },
        { say: 'Because plagiarism is presenting other people’s words or ideas as your own.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
