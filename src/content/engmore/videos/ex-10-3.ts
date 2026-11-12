import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'ex-10-3',
  lessonId: 'ex-10-3',
  title: 'Lord of the Flies',
  thumbnail: false,
  summary:
    'William Golding’s novel, first published in 1954: schoolchildren stranded on an island try to govern themselves, and slide into fear, violence and murder. Its key moments, discussed in our own words, show civilisation and savagery, power, fear, and the evil Golding saw in human nature.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Modern Prose and Drama', title: 'Lord of the Flies', subtitle: 'William Golding, 1954' }],
      lines: [
        { say: 'Lord of the Flies is a novel by William Golding, first published in nineteen fifty-four. It is still in copyright, so this video tells its story in our own words.', caption: 'Lord of the Flies is a novel by William Golding, first published in 1954. It is still in copyright, so this video tells its story in our own words.', show: 'title' },
        { say: 'In this lesson, you will learn the plot and its characters, its key moments, and the novel’s view of human nature.' },
      ],
    },
    {
      chapter: 'The plot',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['A plane crash, and a conch', 'The fire goes out', 'The beast, and Simon’s death', 'Piggy’s death, and rescue'] }],
      lines: [
        { say: 'During a war, a plane carrying British schoolchildren crashes on an island. Ralph and Piggy use a conch shell to call a meeting, and Ralph is elected chief.', show: 'b.0' },
        { say: 'Jack leads the hunters. He lets the signal fire go out to go hunting, just as a ship passes.', show: 'b.1' },
        { say: 'Fear of a beast grows. Simon discovers the truth, but is killed by the others in a frenzied dance.', show: 'b.2' },
        { say: 'Roger kills Piggy, and the conch is smashed. Ralph is hunted across the island, until a naval officer arrives.', show: 'b.3' },
      ],
    },
    {
      chapter: 'Symbols',
      layout: 'center',
      main: [{ kind: 'table', id: 't', head: ['Symbol', 'It stands for'], rows: [['The conch', 'Order and democracy'], ['The signal fire', 'Hope of rescue'], ['The beast', 'The evil inside people']] }],
      lines: [
        { say: 'Whoever holds the conch may speak, so it stands for order. When it is smashed, civilisation on the island ends.', show: 't' },
        { say: 'Alone in the forest, Simon faces a pig’s head on a stick, and realises that the beast is part of them all.' },
      ],
    },
    {
      chapter: 'Context',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Golding and the war', md: 'Golding served in the Royal Navy in the **Second World War**, and came to believe that cruelty lies within ordinary people.' }],
      lines: [
        { say: 'Golding served in the Second World War. Older adventure stories showed shipwrecked children behaving well; Golding shows them turning savage.', show: 'c' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The naval officer is shocked to find the children at war. What is ironic about him?',
          choices: ['He is too young to be an officer', 'He is himself fighting a war', 'He has come to the wrong island', 'He does not speak their language'],
          answer: 1,
          working: 'The adult world has the same savagery, on a larger scale.',
        },
      ],
      lines: [
        { say: 'Your turn. The naval officer is shocked to find the children at war. What is ironic about him? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. He is himself fighting a war. The adult world has the same savagery, on a larger scale.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Civilisation against savagery.', 'Ralph’s order against Jack’s rule by fear.', 'The beast is the evil inside people.'] }],
      lines: [
        { say: 'Let’s sum up. The novel shows civilisation collapsing into savagery.', show: 'sum.0' },
        { say: 'Ralph leads by election and order; Jack rules by fear and the thrill of the hunt.', show: 'sum.1' },
        { say: 'And the beast they fear is really the evil inside themselves.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
