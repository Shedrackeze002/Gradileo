import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e12-6-1',
  lessonId: 'e12-6-1',
  title: 'The Critical Essay',
  thumbnailTitle: 'The Critical Essay',
  thumbnail: false,
  summary:
    'A strong critical essay finds the place where a text is double and argues about that tension. Learn to write a sophisticated thesis, find where tensions gather, and write commentary that weighs a counter-reading.',
  scenes: [
    {
      layout: 'center',
      main: [
        { kind: 'title', id: 'title', kicker: 'Writing', title: 'The Critical Essay', subtitle: 'Argue about the tension in the text' },
        { kind: 'quote', id: 'q', size: 'md', lines: ['My heart grew sick'] },
      ],
      lines: [
        { say: 'Near the end of “The Cask of Amontillado,” as he lays the last stones, Montresor admits this. And at once, he blames it on the dampness of the catacombs.', show: ['title', 'q'] },
        { say: 'A rich text rarely means just one thing. A strong critical essay finds the place where the text is double, where two readings pull against each other, and argues about that tension instead of settling it too soon.' },
      ],
    },
    {
      chapter: 'The sophisticated thesis',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Obvious**: Poe uses the dark catacombs to show that Montresor’s revenge is cruel and terrifying.',
            '**Sophisticated**: Poe has Montresor blame his sick heart on “the dampness of the catacombs”, so the narrator who boasts of a perfect revenge fifty years on may be confessing a guilt he still refuses to name.',
          ],
        },
      ],
      lines: [
        { say: 'A sophisticated thesis is an arguable claim about how and why a text means, which takes on a tension or complexity in it.' },
        { say: 'Compare these two. The first is accurate, but it states a meaning that nearly every reader already shares.', show: 'b.0', focus: 'b.0' },
        { say: 'The second says something a thoughtful reader could argue with, because it notices something difficult. The narrator boasts of a perfect revenge, yet fifty years later he still explains away a moment of feeling.', show: 'b.1', focus: 'b.1' },
      ],
    },
    {
      chapter: 'Where tensions gather',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**A divided character**: grief and relief at once',
            '**A narrator** who knows more or less than the reader',
            '**A symbol** that points two ways',
            '**An ending** that closes the plot but not the meaning',
          ],
        },
      ],
      lines: [
        { say: 'Tensions tend to gather in the same places, so look there first.' },
        { say: 'A divided character wants two things, or feels grief and relief at once. A narrator may know more or less than the reader, which leaves a gap between the telling and the truth.', show: ['b.0', 'b.1'] },
        { say: 'A symbol may point two ways. And an ending may close the plot but not the meaning.', show: ['b.2', 'b.3'] },
        { say: 'Then test your thesis: could a thoughtful classmate argue the opposite? If no one could, it is obvious. If only a careless reader would, it overreaches.' },
      ],
    },
    {
      chapter: 'Commentary that weighs complexity',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['There was something coming to her and she was waiting for it, fearfully.'], by: 'Chopin, “The Story of an Hour”' },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Counter-reading', md: 'A second, reasonable interpretation of the same words.' },
      ],
      lines: [
        { say: 'Critical commentary explains how the words work, then weighs a counter-reading: a second, reasonable interpretation of the same words.', show: 'def' },
        { say: 'Take this moment from Chopin’s story. The vague word something, and the word fearfully, make the feeling approach like a threat.', hide: 'def', show: 'q' },
        { say: 'But moments later, Mrs. Mallard whispers that she is free. So the fear may come from the feeling itself, or from how forbidden it is for a new widow to feel it. Say what the tension reveals, without claiming more than the words support.' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['**Extreme**: Gilman proves that every husband of her time set out to drive his wife mad.', '**Inside the text**: Notice what is double in the story itself.'],
        },
      ],
      lines: [
        { say: 'Here is a common mistake: mistaking an extreme claim for a bold one. It sounds daring, but it is a claim about the world that one story cannot prove.', show: 'b.0' },
        { say: 'Sophistication lives in what you notice inside the text, not in how large your claim about the world becomes.', show: 'b.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which thesis on “The Cask of Amontillado” is sophisticated?',
          choices: [
            'Poe uses the dark catacombs to show how cruel Montresor is.',
            'Poe proves that every man who seeks revenge is full of guilt.',
            'Montresor blames his sick heart on dampness, so his boast may hide guilt.',
            'Montresor lures Fortunato into the catacombs and walls him in.',
          ],
          answer: 2,
          working: 'C is arguable and takes on a tension. A is obvious, B overreaches and D only summarizes.',
        },
      ],
      lines: [
        { say: 'Your turn. Which thesis on “The Cask of Amontillado” is sophisticated? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is C. It is arguable, and it takes on a tension. A is obvious, B overreaches, and D only summarizes.', show: 'q2.answer' },
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
            'A sophisticated thesis is arguable and takes on a tension.',
            'Look for tension in divided characters, narrators, symbols and endings.',
            'Commentary weighs a counter-reading.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A sophisticated thesis is arguable, and it takes on a tension in the text.', show: 'sum.0' },
        { say: 'Look for tension in divided characters, narrators, symbols and endings.', show: 'sum.1' },
        { say: 'And commentary explains how the words work, weighs a counter-reading, and says what the tension reveals.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
