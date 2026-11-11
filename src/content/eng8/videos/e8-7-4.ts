import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e8-7-4',
  lessonId: 'e8-7-4',
  title: 'Using Research',
  summary:
    'Quote when the exact words matter and paraphrase, in your own words and structure, the rest of the time. Introduce sources with signal phrases and explain the evidence afterwards. Plagiarism is passing off someone else’s words or ideas as your own, so cite every source in the text and list them alphabetically in a works cited list.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Writing', title: 'Using Research', subtitle: 'Quoting, paraphrasing and citing' }],
      lines: [
        { say: 'Research makes writing stronger, but only if you use it honestly and well.', show: 'title' },
        { say: 'In this video we bring sources into our writing by quoting and paraphrasing, and cite them so readers know where every borrowed idea came from.' },
      ],
    },
    {
      chapter: 'Plagiarism',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Plagiarism', md: '**Plagiarism** is presenting someone else’s words or ideas as your own. Even a paraphrase needs a **citation**, because the idea belongs to the source.' },
      ],
      lines: [
        { say: 'Plagiarism is presenting someone else’s words or ideas as your own.', show: 'def' },
        { say: 'Notice that it covers ideas, not just words. So even when you put an idea in your own words, you still need a citation, because the idea belongs to the source.', focus: 'def' },
      ],
    },
    {
      chapter: 'Quoting and paraphrasing',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Method', 'What it is', 'When to use it'],
          rows: [
            ['**Direct quotation**', 'the exact words, in quotation marks', 'when the exact words are powerful'],
            ['**Paraphrase**', 'the idea in your own words and structure', 'most of the time'],
          ],
        },
        { kind: 'text', id: 'e', size: 'md', md: 'Original: “Regular exercise significantly reduces the risk of heart disease.”\n\nParaphrase: *Exercising often can greatly lower a person’s chance of heart problems.*' },
      ],
      lines: [
        { say: 'A direct quotation uses the source’s exact words, in quotation marks. Use it when the exact words are powerful or important.', show: 't', focus: 't.0' },
        { say: 'A paraphrase gives the source’s idea in your own words and sentence structure. Use it most of the time, so your own voice comes through.', focus: 't.1' },
        { say: 'Here is an original: regular exercise significantly reduces the risk of heart disease. Changing one or two words is not enough. A good paraphrase is: exercising often can greatly lower a person’s chance of heart problems. Same meaning, new words, new structure.', show: 'e' },
      ],
    },
    {
      chapter: 'Signal phrases',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '*According to a survey by the town council, …*',
            '*As Dr. Okafor explains, …*',
            '*A report by the Riverbend Water Trust found that …*',
          ],
        },
        { kind: 'callout', id: 'k', tone: 'tip', title: 'Then explain it', md: 'After quoting or paraphrasing, always say **how** the evidence supports your point. (The sources here are invented examples.)' },
      ],
      lines: [
        { say: 'Introduce a source with a signal phrase, so readers know where the information comes from. According to a survey by the town council, most residents want more parks.', show: 'b.0' },
        { say: 'Other signal phrases include: as Doctor Okafor explains, or, a report by the Riverbend Water Trust found that. These sources are invented examples.', show: ['b.1', 'b.2'] },
        { say: 'And after quoting or paraphrasing, always explain how the evidence supports your point. Research evidence needs explanation, just like a quotation from a novel.', show: 'k' },
      ],
    },
    {
      chapter: 'Citing sources',
      layout: 'center',
      main: [
        { kind: 'text', id: 'e', size: 'md', md: 'In-text: Teenagers need about nine hours of sleep **(Okafor, 2023)**.' },
        {
          kind: 'table',
          id: 't',
          head: ['Works cited entry (invented)'],
          rows: [
            ['Okafor, Grace. *Why Teenagers Sleep Late*. Hilltop Books, 2023.'],
            ['Riverbend Water Trust. “Saving Water at Home.” *Riverbend Water Trust*, 12 May 2024, riverbend.example.'],
          ],
        },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Paraphrases need citations too', md: 'Changing the words does not make an idea yours. If a book gave you the idea, **cite the book**.' },
      ],
      lines: [
        { say: 'Citations credit the original author, and let readers check the information. They have two parts. First, an in-text citation, in brackets after the borrowed idea, giving the author’s surname and the year.', show: 'e' },
        { say: 'Second, a works cited list, or bibliography, at the end, listing every source in alphabetical order by the author’s surname. A website entry needs the author or organisation, the page title, the site name, the date and the web address.', show: 't' },
        { say: 'Follow the citation style your teacher asks for, and use it consistently. And remember, changing the words does not make an idea yours. If a book gave you the idea, cite the book.', show: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Sam reads an idea in a book and rewrites it fully in his own words. Does he need to cite the book?',
          choices: [
            'No, because the words are now his own.',
            'Yes, because the idea still belongs to the source.',
            'Only if he copies more than ten words.',
            'Only if the book is a website.',
          ],
          answer: 1,
          working: 'Plagiarism covers ideas as well as words. A paraphrase still needs a citation, because the idea came from the book.',
        },
      ],
      lines: [
        { say: 'Your turn. Sam reads an idea in a book, and rewrites it fully in his own words. Does he need to cite the book? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is B. Plagiarism covers ideas as well as words. So a paraphrase still needs a citation, because the idea came from the book.', show: 'q2.answer' },
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
            '**Quote** when the words matter; **paraphrase** the rest of the time.',
            'Use **signal phrases**, then explain the evidence.',
            '**Plagiarism** is passing off others’ words or ideas as your own.',
            'Cite in the text (author, year) and in a **works cited** list.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Quote when the exact words matter, and paraphrase in your own words the rest of the time.', show: 'sum.0' },
        { say: 'Introduce sources with signal phrases, then explain the evidence.', show: 'sum.1' },
        { say: 'Plagiarism is passing off someone else’s words or ideas as your own.', show: 'sum.2' },
        { say: 'So cite every source in the text, with the author and year, and list them alphabetically in a works cited list.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
