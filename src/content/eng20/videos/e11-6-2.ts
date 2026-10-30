import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e11-6-2',
  lessonId: 'e11-6-2',
  title: 'Comparative Essays',
  thumbnailTitle: 'Comparative Essays',
  thumbnail: false,
  summary:
    'Write a comparative thesis that connects two texts and says why the comparison matters, and choose between block and point-by-point structure, keeping the comparison alive in every paragraph.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Writing', title: 'Comparative Essays', subtitle: 'One argument about two texts' }],
      lines: [
        { say: 'Two of Poe’s narrators confess to murder, but one is undone by guilt and the other calmly boasts.', show: 'title' },
        { say: 'Put the stories side by side and each becomes clearer: Montresor’s calm is more chilling because we have heard the Tell-Tale narrator’s panic. A comparative essay is one argument about what we see when two texts are read together.' },
      ],
    },
    {
      chapter: 'The comparative thesis',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'w',
          items: [
            '“The Tell-Tale Heart” and “The Cask of Amontillado” have many similarities and differences.',
            'In “The Tell-Tale Heart”, Poe’s frantic narrator shows how guilt destroys the mind.',
            'The narrator of “The Tell-Tale Heart” feels guilty, but Montresor does not.',
          ],
        },
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['Both of Poe’s murderers tell their own stories, but the narrator of “The Tell-Tale Heart” is destroyed by guilt while Montresor is untouched by it, a contrast that makes Montresor’s calm the more chilling of the two.'],
        },
      ],
      lines: [
        { say: 'A comparative thesis connects two texts through a shared subject, says how they are alike or different, and says why the comparison matters.' },
        { say: 'Weak ones fail in predictable ways. Many similarities and differences is true of any two texts, so it says nothing.', show: 'w.0', focus: 'w.0' },
        { say: 'Discussing only one text is not a comparison. And a real difference, such as one narrator feeling guilty and the other not, still needs a so what.', show: ['w.1', 'w.2'], focus: ['w.1', 'w.2'] },
        { say: 'A strong thesis finds what they share, the key difference, and what the contrast reveals.', hide: 'w', show: 'q' },
      ],
    },
    {
      chapter: 'Block and point by point',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Block**: all of one text, then all of the other, linking back',
            '**Point by point**: one point of comparison at a time, both texts under each',
          ],
        },
        { kind: 'quote', id: 'p', size: 'md', lines: ['Both narrators speak directly to the reader, but in opposite tones.'] },
      ],
      lines: [
        { say: 'There are two standard ways to organize a comparison. In block structure, you discuss all of one text, then all of the other, linking the second back to the first.', show: 'b.0', focus: 'b.0' },
        { say: 'In point-by-point structure, each body section takes one point, such as the narrator’s voice, and discusses both texts under it.', show: 'b.1', focus: 'b.1' },
        { say: 'Block suits short texts and short essays. Point by point keeps the comparison in view all the way through, which suits longer essays with several points.' },
        { say: 'Transitions do much of the work. Use similarly, likewise and both for likenesses, and whereas, by contrast and unlike for differences. A model paragraph on the narrators’ voices begins like this.', hide: 'b', show: 'p' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Two essays stapled together', md: 'In a block essay, the second half never mentions the first. Keep linking back:' },
        { kind: 'quote', id: 'u', size: 'md', lines: ['Unlike the Tell-Tale narrator, Montresor…'] },
      ],
      lines: [
        { say: 'Here is a common mistake. In a block essay, the second half never mentions the first, so the comparison appears only in the conclusion.', show: 'm' },
        { say: 'It becomes two essays stapled together. Instead, discuss the same points in the same order, and keep linking back, with words like these.', show: 'u', focus: 'u' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'What is wrong with: “The narrator of ‘The Tell-Tale Heart’ feels guilty, but Montresor does not.”?',
          choices: [
            'It discusses only one of the two texts.',
            'It is a real difference, but never says so what.',
            'It makes two claims that are never connected.',
            'It is true of any two texts, so says nothing.',
          ],
          answer: 1,
          working: 'The difference is real and covers both texts, but the thesis never says what the contrast reveals, so it needs a so what.',
        },
      ],
      lines: [
        { say: 'Your turn. Here is a thesis: the narrator of “The Tell-Tale Heart” feels guilty, but Montresor does not. What is wrong with it? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is B. The difference is real, and it covers both texts, but the thesis never says why the contrast matters.', show: 'q2.answer' },
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
          items: ['A comparative thesis connects two texts and says why the comparison matters.', 'Block discusses one text then the other; point by point takes one point at a time.', 'Link back and use transitions that compare.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A comparative thesis connects two texts, states how they differ or agree, and says why the comparison matters.', show: 'sum.0' },
        { say: 'Block structure discusses one text, then the other. Point by point takes one point at a time across both texts.', show: 'sum.1' },
        { say: 'In either structure, keep linking the texts together with transitions that compare.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
