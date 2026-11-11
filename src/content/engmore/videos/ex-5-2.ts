import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'ex-5-2',
  lessonId: 'ex-5-2',
  title: 'Dr Jekyll and Mr Hyde',
  thumbnail: false,
  summary:
    'Stevenson’s novella of 1886 is a mystery told through Utterson, solved only by Lanyon’s letter and Jekyll’s statement: a respected doctor has made a drug that separates his evil self as Hyde. Its quotations show duality, reputation, repression and the primitive, set against Victorian respectability and fears of degeneration.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Nineteenth-Century Novels: Dickens and Stevenson', title: 'Dr Jekyll and Mr Hyde', subtitle: 'Robert Louis Stevenson, 1886' }],
      lines: [
        { say: 'A respected London doctor makes a drug that turns him into another man, through whom he can do what he likes without risking his good name. Robert Louis Stevenson published the story in eighteen eighty-six.', caption: 'A respected London doctor makes a drug that turns him into another man, through whom he can do what he likes without risking his good name. Robert Louis Stevenson published the story in 1886.', show: 'title' },
        { say: 'In this lesson, you will learn the story and its characters, read its key quotations, and see the novella in its time.' },
      ],
    },
    {
      chapter: 'A mystery',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['Utterson investigates the strange Mr Hyde', 'Hyde murders Sir Danvers Carew', 'Lanyon dies after a shock', 'Utterson and Poole find Hyde dead', 'Two letters reveal the truth'],
        },
      ],
      lines: [
        { say: 'The story is told as a mystery. We follow Utterson, a loyal lawyer, as he tries to understand why his friend Jekyll has left everything to Hyde.', show: 'b.0' },
        { say: 'Hyde beats an old man, Sir Danvers Carew, to death in the street.', show: 'b.1' },
        { say: 'Lanyon, another doctor, has a terrible shock and dies.', show: 'b.2' },
        { say: 'Utterson and the butler Poole break into Jekyll’s room, and find Hyde dead.', show: 'b.3' },
        { say: 'Only the last two chapters, Lanyon’s letter and Jekyll’s own statement, reveal that Jekyll and Hyde are one man.', show: 'b.4' },
      ],
    },
    {
      chapter: 'Less than human',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q1', md: '*“It wasn’t like a man; it was like some damned Juggernaut.”*' },
        { kind: 'text', id: 'q2', md: '*“Something troglodytic, shall we say?”*' },
      ],
      lines: [
        { say: 'Enfield describes Hyde trampling a young girl as like a Juggernaut, an unstoppable machine. From the start, Hyde seems less than human.', show: 'q1' },
        { say: 'Utterson calls him troglodytic, like a cave-dweller. Hyde seems a throwback to something primitive.', show: 'q2' },
      ],
    },
    {
      chapter: 'Duality',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: '*“man is not truly one, but truly two.”*' },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Repression', md: '*“My devil had been long caged, he came out roaring.”*' },
      ],
      lines: [
        { say: 'In his statement, Jekyll explains that man is not truly one, but truly two. Everyone is a mixture of good and evil, and the drug separated his evil out completely.', show: 'q' },
        { say: 'Because he held his desires down for so long, they burst out more violently. His devil had been long caged, and came out roaring.', show: 'c' },
      ],
    },
    {
      chapter: 'Context',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Respectability', md: 'Victorian gentlemen were judged by their reputation. A scandal could ruin them, so many kept their private lives **secret**.' }],
      lines: [
        { say: 'Victorian gentlemen were judged by their respectability. A scandal could ruin them, so many kept their private lives secret, as Jekyll does through Hyde.', show: 'c' },
        { say: 'Darwin’s theory of evolution also made some readers fear that people could slip back into a primitive state. That fear is in every ape-like description of Hyde.' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [{ kind: 'callout', id: 'm', tone: 'mistake', title: 'Hyde is not a separate villain', md: 'Hyde is part of Jekyll, and Jekyll **enjoyed** being Hyde. The evil was in the respectable man all along.' }],
      lines: [{ say: 'A common mistake is to see Hyde as a separate villain. Hyde is part of Jekyll, and Jekyll enjoyed being him. That is the real horror: the evil was in the respectable man all along.', show: 'm' }],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Jekyll tells Utterson: *“the moment I choose, I can be rid of Mr. Hyde.”* Why is this line important?',
          choices: ['Jekyll plans to have Hyde arrested', 'Hyde is only a lodger in Jekyll’s house', 'Jekyll is tired of Hyde’s company', 'It is dramatic irony: Hyde will soon control Jekyll'],
          answer: 3,
          working: 'Jekyll believes he controls his darker self; later Hyde appears without the drug.',
        },
      ],
      lines: [
        { say: 'Your turn. Jekyll tells Utterson, the moment I choose, I can be rid of Mister Hyde. Why is this line important? Pause the video and try it.', caption: 'Your turn. Jekyll tells Utterson, “the moment I choose, I can be rid of Mr. Hyde.” Why is this line important? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Jekyll believes he controls his darker self, but later Hyde appears without the drug. It is dramatic irony.', show: 'q.answer' },
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
          items: ['A mystery, solved by two letters at the end.', 'Hyde is described as less than human.', 'Duality: everyone is mixed good and evil.', 'Context: respectability, secrecy and Darwin.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The story is a mystery, solved by Lanyon’s letter and Jekyll’s statement at the end.', show: 'sum.0' },
        { say: 'Hyde is described as a machine, a cave-dweller and an ape: less than human.', show: 'sum.1' },
        { say: 'Jekyll shows that everyone is a mixture of good and evil.', show: 'sum.2' },
        { say: 'And the novella grows from Victorian respectability, secrecy, and fears raised by Darwin.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
