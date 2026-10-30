import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e12-7-4',
  lessonId: 'e12-7-4',
  title: 'Rhetorical Figures',
  thumbnailTitle: 'Rhetorical Figures',
  thumbnail: false,
  summary:
    'Rhetorical figures are ways of arranging or bending words that writers have used for over two thousand years. Learn chiasmus, hyperbaton, zeugma, litotes, synecdoche, metonymy, apostrophe, paradox and oxymoron, and what each one does.',
  scenes: [
    {
      layout: 'center',
      main: [
        { kind: 'title', id: 'title', kicker: 'Language', title: 'Rhetorical Figures', subtitle: 'Words arranged, or bent, for effect' }],
      lines: [
        { say: 'Frederick Douglass wrote a sentence that turns on itself. Man and slave come back as slave and man. The reversal is the whole story of his life in a dozen words.', show: 'title' },
        { say: 'Patterns like this are rhetorical figures. In this lesson you will recognize nine of them, and explain the effect each one has.' },
      ],
    },
    {
      chapter: 'Figures of order',
      layout: 'center',
      main: [
        {
          kind: 'quote',
          id: 'q',
          lines: ['The sabbath was made for man, and not man for the sabbath'],
          by: 'Mark 2:27, King James Bible (1611)',
          size: 'md',
        },
        {
          kind: 'text',
          id: 'h',
          md: '**Hyperbaton**: *Silver and gold have I none*',
          size: 'lg',
        },
      ],
      lines: [
        { say: 'Chiasmus is two phrases in which the key words of the first return in reverse order in the second. It makes an idea turn back on itself, so it feels complete and memorable.', show: 'q' },
        { say: 'Hyperbaton is words placed out of their usual order for emphasis. Peter puts the riches first, so their absence is far more striking. Inversion is one kind of hyperbaton.', hide: 'q', show: 'h' },
      ],
    },
    {
      chapter: 'Zeugma and litotes',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'z',
          items: [
            '**Zeugma**: *Leila lost her keys and her temper.*',
            '**Litotes**: *The exam was not easy* (it was hard).',
          ],
        },
      ],
      lines: [
        { say: 'Zeugma is one word, usually a verb, governing two others in two different senses at once. Lost works on keys, and on temper. It surprises the reader, and often deflates the grander sense.', show: 'z.0', focus: 'z.0' },
        { say: 'Litotes is understatement that affirms something by denying its opposite. Not easy means hard. It makes a point quietly, with modesty, irony or restrained force.', show: 'z.1', focus: 'z.1' },
      ],
    },
    {
      chapter: 'Synecdoche and metonymy',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 's',
          items: [
            '**Synecdoche**: *all hands on deck* (sailors)',
            '**Metonymy**: *the crown* (the monarch)',
          ],
        },
      ],
      lines: [
        { say: 'Synecdoche uses a part to stand for the whole. All hands on deck fixes attention on what a captain needs from a sailor.', show: 's.0', focus: 's.0' },
        { say: 'Metonymy names a thing by something closely associated with it. It turns a large or abstract idea into something concrete that the reader can picture.', show: 's.1', focus: 's.1' },
      ],
    },
    {
      chapter: 'Address and contradiction',
      layout: 'center',
      main: [
        {
          kind: 'quote',
          id: 'd',
          lines: ['And death shall be no more; death, thou shalt die.'],
          by: 'John Donne, “Death, be not proud” (1633)',
          size: 'md',
        },
        {
          kind: 'bullets',
          id: 'o',
          items: ['**Paradox**: *I must be cruel, only to be kind.*', '**Oxymoron**: *sweet sorrow*'],
        },
      ],
      lines: [
        { say: 'Apostrophe is a direct address to someone absent or dead, or to a thing or an idea. Donne speaks straight to death, which makes his feeling urgent. The line is also a paradox, because how can death die?', show: 'd' },
        { say: 'A paradox is a whole statement that seems to contradict itself yet expresses a truth. An oxymoron presses the contradiction into two words.', hide: 'd', show: 'o' },
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
          title: 'Part or association?',
          md: 'Ask whether the word names a **piece** of the thing. Hands are part of a sailor, so *hands* is synecdoche. A crown is only worn by a monarch, so *the crown* is metonymy.',
        },
      ],
      lines: [
        { say: 'Here is a common mistake: mixing up synecdoche and metonymy. Ask whether the word names a piece of the thing.', show: 'm' },
        { say: 'Hands are part of a sailor. A crown is not part of a monarch, only worn by one.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Why is “the crown” metonymy, not synecdoche?',
          choices: [
            'Because a crown is a part of a monarch, standing for the whole person.',
            'Because a crown is an understatement that affirms by denying the opposite.',
            'Because a crown is only worn by a monarch, and is not a piece of one.',
            'Because a crown is a direct address to someone who cannot answer back.',
          ],
          answer: 2,
          working: 'C is right: a crown is associated with a monarch, not a part of one. A describes synecdoche, B litotes and D apostrophe.',
        },
      ],
      lines: [
        { say: 'Your turn. Why is the crown metonymy, and not synecdoche? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is C. A crown is associated with a monarch, not a part of one. A describes synecdoche, B describes litotes, and D describes apostrophe.', show: 'q2.answer' },
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
            'Chiasmus reverses key words, and hyperbaton moves words out of order.',
            'Zeugma, litotes, synecdoche and metonymy bend meaning.',
            'Apostrophe, paradox and oxymoron address or contradict. Say what each one does.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Chiasmus reverses key words, and hyperbaton moves words out of their usual order.', show: 'sum.0' },
        { say: 'Zeugma, litotes, synecdoche and metonymy bend meaning in different ways.', show: 'sum.1' },
        { say: 'Apostrophe speaks to the absent, a paradox seems to contradict itself yet is true, and an oxymoron joins two contradictory words. Always say what the figure does.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
