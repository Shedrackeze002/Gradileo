import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e11-2-2',
  lessonId: 'e11-2-2',
  title: 'The Sonnet',
  summary:
    'A sonnet has fourteen lines, usually in iambic pentameter. Petrarchan and Shakespearean sonnets divide them differently, the volta is the turn in thought, and poets vary the beat for emphasis.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [
        { kind: 'title', id: 'title', kicker: 'Poetry', title: 'The Sonnet', subtitle: 'Fourteen lines, and a turn' },
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['If we must die, let it not be like hogs', 'Hunted and penned in an inglorious spot,', 'While round us bark the mad and hungry dogs,', 'Making their mock at our accursèd lot.'],
          by: 'Claude McKay, “If We Must Die”',
        },
      ],
      lines: [
        { say: 'In the summer of nineteen nineteen, mobs attacked Black neighbourhoods across the United States. The poet Claude McKay answered with fourteen lines.', show: ['title', 'q.0', 'q.1', 'q.2', 'q.3'] },
        { say: 'He chose one of the oldest and strictest forms in English poetry, the sonnet, for one of the angriest subjects. In this lesson, you will learn the two main kinds of sonnet, find the turn, and hear how poets bend the beat.' },
      ],
    },
    {
      chapter: 'Two shapes',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Sonnet', md: 'A poem of fourteen lines with a set rhyme scheme, usually in **iambic pentameter**: five iambs, da-DUM, to a line.' },
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Petrarchan**: an octave (8 lines), then a sestet (6 lines)',
            '**Shakespearean**: three quatrains (4 lines each), then a couplet (2 lines)',
          ],
        },
      ],
      lines: [
        { say: 'A sonnet has fourteen lines and a set rhyme scheme. In English, it is usually written in iambic pentameter, which is five da-DUM beats to a line.', show: 'def' },
        { say: 'A Petrarchan sonnet has an octave of eight lines and a sestet of six, and it usually turns at line nine.', show: 'b.0', focus: 'b.0' },
        { say: 'A Shakespearean sonnet has three quatrains and a closing couplet, rhyming A B A B, C D C D, E F E F, G G. McKay’s poem is Shakespearean.', show: 'b.1', focus: 'b.1' },
      ],
    },
    {
      chapter: 'The volta',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Volta', md: 'Italian for “turn”: the point where a sonnet’s thought or feeling shifts. Look for *but*, *yet*, *then* or *now*.' },
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['Like men we’ll face the murderous, cowardly pack,', 'Pressed to the wall, dying, but fighting back!'],
          by: 'Claude McKay, “If We Must Die”',
        },
      ],
      lines: [
        { say: 'The volta is the point where a sonnet turns, as a problem meets its answer or a complaint becomes a plea.', show: 'def' },
        { say: 'In a Shakespearean sonnet, the couplet often delivers the final turn. McKay ends with a promise.', show: 'q' },
        { say: 'The poem begins by picturing helpless victims, and ends with men who will die fighting back.', focus: 'q' },
      ],
    },
    {
      chapter: 'Bending the beat',
      layout: 'center',
      main: [
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['The world is too much with us; late and soon,', 'Getting and spending, we lay waste our powers:'],
          by: 'William Wordsworth, “The world is too much with us”',
        },
        { kind: 'text', id: 'ans', size: 'md', md: 'A **trochee**, DUM-da, opens the line, and stresses the busy life Wordsworth blames.' },
      ],
      lines: [
        { say: 'A sonnet with a perfect da-DUM through every line would sound like a metronome. So poets vary the beat, and the variations draw attention to the words they touch.', show: 'q.0' },
        { say: 'An iambic line begins da-DUM. But say the second line aloud. It begins GET-ting, which is DUM-da. That is a trochee.', show: 'q.1', focus: 'q.1' },
        { say: 'The stress lands on the very activity the poem condemns, so the grasping life of getting and spending hits the reader first.', show: 'ans' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Inventing variations', md: 'Do not hunt for a trochee in every line. Read naturally first, and mark a variation only where your voice **clearly** stresses a syllable the pattern would leave light.' },
      ],
      lines: [
        { say: 'Here is a common mistake. Do not hunt for a trochee in every line.', show: 'm' },
        { say: 'Read the line naturally first. Most lines in a good sonnet are regular, which is exactly why the variations stand out.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A sonnet has three quatrains and a couplet, rhyming ABAB CDCD EFEF GG. Which kind is it?',
          choices: [
            'Shakespearean, because it ends with a rhyming couplet.',
            'Petrarchan, because it is built from an octave and a sestet.',
            'Shakespearean, because it must turn at line nine.',
            'Petrarchan, because it uses only a few rhyme sounds.',
          ],
          answer: 0,
          working: 'Three quatrains and a closing couplet make a Shakespearean sonnet. A Petrarchan sonnet has an octave and a sestet.',
        },
      ],
      lines: [
        { say: 'Your turn. A sonnet has three quatrains and a couplet, rhyming A B A B, C D C D, E F E F, G G. Which kind is it? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is A. Three quatrains and a closing couplet make a Shakespearean sonnet. A Petrarchan sonnet has an octave and a sestet.', show: 'q2.answer' },
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
            'A sonnet has fourteen lines, usually in iambic pentameter.',
            'Petrarchan: octave and sestet. Shakespearean: three quatrains and a couplet.',
            'The volta is the turn; poets vary the metre for emphasis.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A sonnet has fourteen lines, usually in iambic pentameter.', show: 'sum.0' },
        { say: 'A Petrarchan sonnet has an octave and a sestet. A Shakespearean sonnet has three quatrains and a couplet.', show: 'sum.1' },
        { say: 'The volta is the turn in thought or feeling, and poets vary the beat to put weight on certain words.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
