import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e11-2-1',
  lessonId: 'e11-2-1',
  title: 'Extended Metaphor, Conceit and Allusion',
  thumbnailTitle: 'Conceit and Allusion',
  summary:
    'An extended metaphor carries one comparison through a poem, and a conceit is a surprising, witty version of it, like Donne’s lovers as compasses. An allusion is a brief reference to a well-known person, place, event or text.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [
        { kind: 'title', id: 'title', kicker: 'Poetry', title: 'Extended Metaphor, Conceit and Allusion', subtitle: 'Comparisons that run through a poem' },
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['If they be two, they are two so', 'As stiffe twin compasses are two,', 'Thy soule the fixt foot, makes no show', 'To move, but doth, if the’other doe.'],
          by: 'John Donne, “A Valediction: Forbidding Mourning”',
        },
      ],
      lines: [
        { say: 'Before a long journey, the poet John Donne is said to have written a poem for his wife. Instead of a rose or a star, he compared the two of them to a pair of compasses, the tool for drawing circles.', show: ['title', 'q.0', 'q.1', 'q.2', 'q.3'] },
        { say: 'A drawing tool is a strange thing to find in a love poem, and that is the point. In this lesson, you will follow comparisons that run through a whole poem, and learn to explain allusions.' },
      ],
    },
    {
      chapter: 'Extended metaphor',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Extended metaphor', md: 'One comparison carried through several lines or a whole poem. Name the **subject**, then list the details drawn from the other thing.' },
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['There is no frigate like a book', 'To take us lands away,', 'Nor any coursers like a page', 'Of prancing poetry.'],
          by: 'Emily Dickinson, “There is no frigate like a book”',
        },
      ],
      lines: [
        { say: 'An extended metaphor carries one comparison through several lines. To follow one, name the subject, then list the words that all belong to the other thing.', show: 'def' },
        { say: 'Emily Dickinson turns a book into transport.', show: ['q.0', 'q.1', 'q.2', 'q.3'] },
        { say: 'A frigate is a fast ship, and coursers are swift horses. They are all ways of travelling, so a book carries the reader as far as any of them.', focus: 'q' },
      ],
    },
    {
      chapter: 'The conceit',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Conceit', md: 'An extended metaphor that compares two strikingly unlike things and works the comparison out in surprising, witty detail.' },
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['Such wilt thou be to mee, who must', 'Like th’other foot, obliquely runne;', 'Thy firmnes makes my circle just,', 'And makes me end, where I begunne.'],
          by: 'John Donne, “A Valediction: Forbidding Mourning”',
        },
      ],
      lines: [
        { say: 'A conceit compares two strikingly unlike things and works out the comparison in surprising detail. Why should two lovers be like compasses? Donne answers stanza by stanza.', show: 'def' },
        { say: 'A pair of compasses has a fixed foot at the centre and a moving foot that draws the circle. She is the fixed foot who stays at home, and he is the other foot who must travel.', show: ['q.0', 'q.1'], focus: ['q.0', 'q.1'] },
        { say: 'A perfect circle needs the centre foot to hold firm. So her constancy keeps him true, and brings him back to where he began.', show: ['q.2', 'q.3'], focus: ['q.2', 'q.3'] },
      ],
    },
    {
      chapter: 'Allusion',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Allusion', md: 'A brief reference to a well-known person, place, event or text. It borrows the meaning of that story without retelling it.' },
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Biblical**: a Good Samaritan',
            '**Classical**: a Herculean task',
            '**Historical**: met his Waterloo',
            '**Literary**: a Scrooge',
          ],
        },
      ],
      lines: [
        { say: 'An allusion is a brief reference to a well-known person, place, event or text. When someone calls a weakness an Achilles’ heel, the whole story of the Greek warrior comes with the phrase.', show: 'def' },
        { say: 'Most allusions come from the Bible, from ancient Greece and Rome, from history, or from later literature. What matters most is knowing the story behind the reference.', show: ['b.0', 'b.1', 'b.2', 'b.3'] },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Stopping at the label', md: 'Saying “this is a conceit” is only the start. Name **both halves** of the comparison, match the details, and say what it suggests.' },
      ],
      lines: [
        { say: 'Here is a common mistake. Saying this is a conceit is only the start.', show: 'm' },
        { say: 'Name both halves of the comparison, lovers and compasses. Match the details, and then say what it suggests: her faithfulness will bring him home.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A writer calls a hard job a “Herculean” task. What kind of allusion is that?',
          choices: [
            'Biblical, because it refers to a story from the Bible.',
            'Historical, because it refers to a real event in history.',
            'Classical, because it refers to a hero of Greek legend.',
            'Literary, because it refers to a character from a later novel.',
          ],
          answer: 2,
          working: 'Hercules is a hero of ancient Greek and Roman myth, so this is a classical allusion.',
        },
      ],
      lines: [
        { say: 'Your turn. A writer calls a hard job a Herculean task. What kind of allusion is that? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is C. Hercules is a hero of ancient Greek and Roman myth, so this is a classical allusion.', show: 'q2.answer' },
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
            'An extended metaphor carries one comparison through a poem.',
            'A conceit is a surprising extended metaphor; match every detail.',
            'An allusion borrows meaning from a well-known story.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An extended metaphor carries one comparison through a poem.', show: 'sum.0' },
        { say: 'A conceit is a surprising extended metaphor, so match each detail to the subject, then say what it suggests.', show: 'sum.1' },
        { say: 'And an allusion borrows its meaning from a story everyone is expected to know.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
