import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e11-6-3',
  lessonId: 'e11-6-3',
  title: 'Using Sources',
  thumbnailTitle: 'Using Sources',
  thumbnail: false,
  summary:
    'Decide when to quote, paraphrase or summarize, paraphrase without plagiarism or patchwriting, and synthesize several sources into one point of your own without stretching them.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Writing', title: 'Using Sources', subtitle: 'Honest, accurate, connected' }],
      lines: [
        { say: 'Many Grade eleven essays draw on outside sources: a study, a report, an expert’s article.', show: 'title' },
        { say: 'Using sources well is a skill of honesty as much as of writing. Show which ideas are yours and which are borrowed, report each source accurately, and then connect them into an argument of your own. The sources in this lesson are invented.' },
      ],
    },
    {
      chapter: 'Quote, paraphrase or summarize',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Quotation**: the exact words, inside quotation marks',
            '**Paraphrase**: all the ideas, in your own words and structure',
            '**Summary**: only the main idea, much shorter',
          ],
        },
      ],
      lines: [
        { say: 'A quotation uses the source’s exact words, inside quotation marks. Use it when the exact wording matters.', show: 'b.0', focus: 'b.0' },
        { say: 'A paraphrase restates all of a passage’s ideas in your own words and sentence structure, at about the same length. A summary gives only the main idea, and is much shorter.', show: ['b.1', 'b.2'], focus: ['b.1', 'b.2'] },
        { say: 'All three need attribution: you must say where the idea comes from.' },
      ],
    },
    {
      chapter: 'Paraphrasing safely',
      layout: 'center',
      main: [
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['Teenagers who sleep fewer than eight hours on school nights are more likely to report trouble concentrating in morning lessons.'],
          by: 'Lakeside Youth Health Centre (invented source)',
        },
        {
          kind: 'bullets',
          id: 'f',
          items: ['**Copying**: exact words without quotation marks', '**Patchwriting**: the source’s structure with a few synonyms swapped in', '**No credit**: your own words, but no source named', '**A changed meaning**: a claim the source never made'],
        },
      ],
      lines: [
        { say: 'Here is part of a passage from an invented report by the Lakeside Youth Health Centre.', show: 'q' },
        { say: 'An acceptable paraphrase changes the words and the structure, keeps the meaning, and gives credit. To write one, read until you understand, cover the passage, write from memory, then compare.', focus: 'q' },
        { say: 'There are four ways a paraphrase goes wrong. Copying, patchwriting, no credit, and a changed meaning.', hide: 'q', show: 'f' },
        { say: 'Patchwriting keeps the source’s sentence structure and swaps in a few synonyms. Even with the source named, it is plagiarism, because the writing is still mostly the source’s.', focus: 'f.1' },
      ],
    },
    {
      chapter: 'Synthesis',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'src',
          items: ['**Source A**, a sleep researcher: teenagers’ body clocks shift later, so many cannot fall asleep before eleven.', '**Source B**, a district report: moving the start from 8:00 to 9:00 raised first-period attendance by six per cent.'],
        },
        {
          kind: 'quote',
          id: 's',
          size: 'md',
          lines: ['Because teenagers’ body clocks make early sleep difficult (Source A), it is not surprising that a later start brought more students to first-period classes (Source B).'],
        },
      ],
      lines: [
        { say: 'When you use several sources, it is tempting to report them one after another: Source A says, Source B says. That is a list, not an argument.' },
        { say: 'Synthesis connects sources into one point of your own, and shows how they relate. Take two invented findings.', show: 'src' },
        { say: 'A synthesis explains why they belong together.', hide: 'src', show: 's' },
        { say: 'It never stretches them. Claiming that a later start makes every student get better marks goes far beyond what either source measured.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which of these best describes patchwriting?',
          choices: [
            'Copying the source’s exact words without using any quotation marks.',
            'Using your own words and structure but never naming the source.',
            'Changing a source’s meaning so it says something it never said.',
            'Keeping the source’s sentence structure and swapping in synonyms.',
          ],
          answer: 3,
          working: 'Patchwriting keeps the source’s sentence structure and swaps in a few synonyms. A is copying, B is no credit and C is a changed meaning.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these four best describes patchwriting? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is D. Patchwriting keeps the source’s sentence structure and just swaps in synonyms. A is copying, B has no credit, and C changes the meaning.', show: 'q2.answer' },
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
          items: ['Quote for exact wording, paraphrase for all the ideas, summarize for the main idea; credit every source.', 'A paraphrase changes the words and the structure and keeps the meaning.', 'Synthesis connects sources into one point of your own.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Quote for exact wording, paraphrase for all the ideas, summarize for the main idea, and credit every source.', show: 'sum.0' },
        { say: 'A good paraphrase changes both the words and the structure, and keeps the meaning.', show: 'sum.1' },
        { say: 'And synthesis connects sources into one point of your own, without stretching any of them.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
