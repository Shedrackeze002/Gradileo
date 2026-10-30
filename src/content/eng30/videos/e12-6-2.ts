import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e12-6-2',
  lessonId: 'e12-6-2',
  title: 'The Comparative Literary Essay',
  thumbnailTitle: 'The Comparative Essay',
  thumbnail: false,
  summary:
    'A comparison is worth writing only when the pairing teaches something. Learn to build a comparative thesis from a shared ground, a difference and a revelation, and to organize the essay point by point.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Writing', title: 'The Comparative Literary Essay', subtitle: 'What two texts show together' }],
      lines: [
        { say: 'Two stories about lonely women. Two poems about suffering. The likeness is easy to spot, and it is not yet an argument.', show: 'title' },
        { say: 'A comparison is worth writing when it shows what you would miss in either text alone.' },
      ],
    },
    {
      chapter: 'The comparative thesis',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['**Ground**: what the texts share', '**Difference**: where they differ within that ground', '**Revelation**: what the difference shows'],
        },
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['Chopin and Mansfield each give a woman a private happiness that collapses when someone else intrudes, but Mrs. Mallard’s joy is real and Miss Brill’s is imagined: together, the stories suggest that the world breaks a true freedom as carelessly as a false one.'],
        },
      ],
      lines: [
        { say: 'A comparative thesis connects two texts on a shared ground, names a meaningful difference or likeness within it, and says what the comparison reveals.', show: 'b' },
        { say: 'Here is one on “The Story of an Hour” and “Miss Brill.” The ground is a private happiness broken from outside. The difference is that one joy is real and the other imagined. And the revelation is that the world breaks a true freedom as carelessly as a false one.', hide: 'b', show: 'q' },
      ],
    },
    {
      chapter: 'Building the thesis',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Ground**: both narrators are murderers who pride themselves on control',
            '**Difference**: one confesses within hours; the other tells his tale calmly, half a century later',
            '**Revelation**: the more frightening guilt is the kind that never surfaces',
          ],
        },
      ],
      lines: [
        { say: 'Let’s build one on two stories by Poe, “The Tell-Tale Heart” and “The Cask of Amontillado.”' },
        { say: 'The shared ground is that both are told by murderers who pride themselves on their control and cleverness.', show: 'b.0', focus: 'b.0' },
        { say: 'Within that ground, the first narrator breaks down and confesses within hours. Montresor tells his story calmly, half a century after the crime, and has never been caught.', show: 'b.1', focus: 'b.1' },
        { say: 'And what does the difference reveal? Perhaps that the more frightening guilt is the kind that never surfaces.', show: 'b.2', focus: 'b.2' },
      ],
    },
    {
      chapter: 'Organizing the comparison',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Text by text**: all of one, then all of the other',
            '**Point by point**: each paragraph discusses both texts',
          ],
        },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Words that keep both texts in play', md: '*where Chopin …, Mansfield …*; *both …, but only one …*; *by contrast*; *read together*' },
      ],
      lines: [
        { say: 'There are two ways to organize. Text by text discusses all of one text, then all of the other, so the comparison is squeezed into the conclusion.', show: 'b.0' },
        { say: 'Point by point discusses both texts in each body paragraph. For a Grade twelve essay, this is usually stronger.', show: 'b.1', focus: 'b.1' },
        { say: 'Transitions such as these do much of the joining for you. If a paragraph has none of them, check whether it has drifted into one text.', show: 'tip' },
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
          title: 'The two-essays essay',
          md: 'Half the essay on one text and half on the other is really **two short essays stapled together**. Join the texts in the claim itself.',
        },
      ],
      lines: [
        { say: 'Here is a common mistake: the two-essays essay. If you spend the first half on one text and the second half on the other, you have written two short essays stapled together.', show: 'm' },
        { say: 'If your thesis could be split into two sentences with no loss, it is a list. Join the texts in the claim itself, with words such as but, while, where and together.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which Poe thesis has a ground, a difference and a revelation?',
          choices: [
            'Both boast of control, but one confesses and one never does: calm guilt scares more.',
            'Both stories have murderers who boast of control, so they are very similar.',
            'One narrator confesses within hours, while the other tells his tale calmly years later.',
            'The first story is about a haunted man. The second is about a revenge.',
          ],
          answer: 0,
          working: 'A has a ground, a difference and a revelation. B shows a likeness, C a bare difference and D two separate claims.',
        },
      ],
      lines: [
        { say: 'Your turn. Which Poe thesis has a ground, a difference and a revelation? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is A. It names the ground, a difference within it, and what it reveals. B shows only a likeness, C stops at a bare difference, and D makes two separate claims.', show: 'q2.answer' },
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
            'A comparative thesis has a ground, a difference and a revelation.',
            'Organize point by point, so both texts are in every paragraph.',
            'Join the texts in the claim itself.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A comparative thesis has a shared ground, a difference, and a statement of what the comparison reveals.', show: 'sum.0' },
        { say: 'Organize point by point, so both texts appear in every paragraph.', show: 'sum.1' },
        { say: 'And join the texts in the claim itself, instead of writing two essays in one.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
