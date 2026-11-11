import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'ex-7-3',
  lessonId: 'ex-7-3',
  title: 'Julius Caesar',
  thumbnail: false,
  summary:
    'Shakespeare’s tragedy follows the plot to kill Caesar, the funeral speeches that turn Rome against the conspirators, and the civil war that ends with Brutus’s death. Its key speeches show power and ambition, persuasion, honour and betrayal, and the play spoke to fears about the succession in 1599.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Shakespeare: Comedy, Justice and Tragedy', title: 'Julius Caesar', subtitle: 'William Shakespeare, 1599' }],
      lines: [
        { say: 'Some Roman senators fear that Caesar wants to be crowned king. They kill him in the Senate, and Rome falls into civil war. Shakespeare’s tragedy was first performed in fifteen ninety-nine.', caption: 'Some Roman senators fear that Caesar wants to be crowned king. They kill him in the Senate, and Rome falls into civil war. Shakespeare’s tragedy was first performed in 1599.', show: 'title' },
        { say: 'In this lesson, you will learn the plot and its characters, read its key speeches, and see the play in its time.' },
      ],
    },
    {
      chapter: 'The plot',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['The conspiracy: Cassius wins over Brutus', 'The murder, on the Ides of March', 'The funeral speeches', 'Civil war, and Brutus’s death'] }],
      lines: [
        { say: 'Cassius persuades the honourable Brutus that Caesar is a danger to Rome.', show: 'b.0' },
        { say: 'Ignoring the warnings, Caesar goes to the Senate on the Ides of March, and the conspirators stab him to death.', show: 'b.1' },
        { say: 'At the funeral, Brutus explains, but Mark Antony’s speech turns the crowd into a mob.', show: 'b.2' },
        { say: 'In the war that follows, Cassius and then Brutus take their own lives.', show: 'b.3' },
      ],
    },
    {
      chapter: 'Persuading Brutus',
      layout: 'center',
      main: [{ kind: 'text', id: 'q', md: '*“The fault, dear Brutus, is not in our stars,*\n*But in ourselves, that we are underlings.”*' }],
      lines: [
        { say: 'Cassius argues that people choose their own fate, not the stars. If they live under Caesar, it is their own fault. He pushes Brutus to act.', show: 'q' },
        { say: 'Brutus decides to kill Caesar, not for what he has done, but for what he might become: a serpent’s egg, to be killed in the shell.' },
      ],
    },
    {
      chapter: 'The funeral',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q1', md: '*“Not that I loved Caesar less, but that I loved Rome more.”*' },
        { kind: 'text', id: 'q2', md: '*“But Brutus says he was ambitious,*\n*And Brutus is an honourable man.”*' },
      ],
      lines: [
        { say: 'Brutus speaks to the crowd in calm, reasoned prose. He loved Caesar, but he loved Rome more.', show: 'q1' },
        { say: 'Antony speaks in verse. After each of Caesar’s good deeds he repeats that Brutus is an honourable man, until the word sounds false and the crowd turns.', show: 'q2' },
      ],
    },
    {
      chapter: 'Context',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'The succession', md: 'In 1599, Elizabeth I was old with **no heir**, and people feared civil war when she died.' }],
      lines: [
        { say: 'In fifteen ninety-nine, Elizabeth the First was old and had no heir. People feared what would happen when she died, as Rome fell into war after Caesar.', caption: 'In 1599, Elizabeth I was old and had no heir. People feared what would happen when she died, as Rome fell into war after Caesar.', show: 'c' },
        { say: 'Shakespeare took the story from Plutarch’s Lives, a history of famous Greeks and Romans.' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [{ kind: 'callout', id: 'm', tone: 'mistake', title: 'Caesar is not the main tragic hero', md: 'Caesar dies in Act 3. The play follows **Brutus**, the noble man brought down by his idealism.' }],
      lines: [{ say: 'A common mistake is to think Caesar is the tragic hero. He dies in Act three. The play follows Brutus, a noble man brought down by his own idealism and trust.', show: 'm' }],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Showing the crowd Brutus’s wound in Caesar’s body, Antony says: *“This was the most unkindest cut of all”*. What does he stress?',
          choices: ['That Brutus’s blow was the least serious', 'That Casca struck first and hardest', 'That Caesar’s cloak was badly made', 'That the blow from a friend hurt most'],
          answer: 3,
          working: 'The double superlative, “most unkindest”, stresses the betrayal of a friend.',
        },
      ],
      lines: [
        { say: 'Your turn. Showing the crowd the wound made by Brutus, Antony says, this was the most unkindest cut of all. What does he stress? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. The double superlative, most unkindest, stresses that the blow from a friend hurt most. Betrayal is the cruellest wound.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Conspiracy, murder, funeral, civil war.', 'Cassius persuades Brutus; Antony persuades Rome.', 'Brutus kills his friend for his country.', 'Context: fears about the succession in 1599.'] }],
      lines: [
        { say: 'Let’s sum up. The play moves from conspiracy to murder, to the funeral, to civil war.', show: 'sum.0' },
        { say: 'Cassius persuades Brutus, and Antony’s rhetoric turns all of Rome.', show: 'sum.1' },
        { say: 'Brutus betrays his friend for his country, and Antony calls him the noblest Roman of them all.', show: 'sum.2' },
        { say: 'And the play spoke to real fears about who would rule after Elizabeth.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
