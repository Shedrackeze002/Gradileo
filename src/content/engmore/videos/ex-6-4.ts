import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'ex-6-4',
  lessonId: 'ex-6-4',
  title: 'The Sign of Four',
  thumbnail: false,
  summary:
    'Arthur Conan Doyle’s Sherlock Holmes novel of 1890 follows a trail of pearls, a locked-room murder and a chase down the Thames to a treasure stolen in British India. Its key quotations show Holmes’s cold reason, Watson’s feeling, and greed, and the novel reflects the attitudes of the British Empire.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Nineteenth-Century Novels: Shelley, Brontë, Austen and Conan Doyle', title: 'The Sign of Four', subtitle: 'Arthur Conan Doyle, 1890' }],
      lines: [
        { say: 'Every year for six years, someone has sent Mary Morstan a pearl. She asks Sherlock Holmes for help, and the trail leads to murder and a stolen treasure. Arthur Conan Doyle published the novel in eighteen ninety.', caption: 'Every year for six years, someone has sent Mary Morstan a pearl. She asks Sherlock Holmes for help, and the trail leads to murder and a stolen treasure. Arthur Conan Doyle published the novel in 1890.', show: 'title' },
        { say: 'In this lesson, you will learn the story and its characters, read its key quotations, and see the novel in its time.' },
      ],
    },
    {
      chapter: 'The case',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['Mary Morstan’s mystery, and the Agra treasure', 'A murder in a locked room', 'A chase down the Thames', 'An empty box, and Jonathan Small’s story'] }],
      lines: [
        { say: 'Mary’s mystery leads to Thaddeus Sholto, who tells them of a treasure from Agra, in India.', show: 'b.0' },
        { say: 'His brother Bartholomew is found dead in a locked room, and the treasure is gone.', show: 'b.1' },
        { say: 'Holmes tracks the thieves to a steam launch, and chases it down the Thames to capture Jonathan Small.', show: 'b.2' },
        { say: 'But the treasure box is empty, and Small tells how the treasure was stolen in India years before.', show: 'b.3' },
      ],
    },
    {
      chapter: 'Reason',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q1', md: '*“Detection is, or ought to be, an exact science, and should be treated in the same cold and unemotional manner.”*' },
        { kind: 'text', id: 'q2', md: '*“You really are an automaton,—a calculating-machine!”*' },
      ],
      lines: [
        { say: 'Holmes sees detection as pure logic, like a science, cold and unemotional.', show: 'q1' },
        { say: 'Watson thinks this makes him almost inhuman: an automaton, a calculating machine. Watson brings the feeling that Holmes lacks.', show: 'q2' },
      ],
    },
    {
      chapter: 'Treasure and love',
      layout: 'center',
      main: [{ kind: 'text', id: 'q', md: '*“a great shadow seemed to pass from my soul.”*' }],
      lines: [
        { say: 'When the box is found empty, Watson feels a great shadow pass from his soul. Without the treasure, Mary is no longer far richer than he is, and he can tell her he loves her.', show: 'q' },
        { say: 'The treasure ruins almost everyone who touches it. Small would rather throw it in the river than see anyone else have it.' },
      ],
    },
    {
      chapter: 'Context',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'The Empire', md: 'The treasure was stolen during the **Indian Rebellion of 1857**, when Indian soldiers rose against British rule.' }],
      lines: [
        { say: 'The treasure was stolen during the Indian Rebellion of eighteen fifty-seven, when Indian soldiers rose against British rule.', caption: 'The treasure was stolen during the Indian Rebellion of 1857, when Indian soldiers rose against British rule.', show: 'c' },
        { say: 'The novel shares the attitudes of the Empire. Its description of Tonga, Small’s companion from the Andaman Islands, is racist, and readers today recognise it as a colonial stereotype.' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [{ kind: 'callout', id: 'm', tone: 'mistake', title: 'The detective does not narrate', md: '**Watson** tells the story, so we are as puzzled as he is until Holmes explains.' }],
      lines: [{ say: 'A common mistake is to think Holmes tells the story. Watson does, so we are as puzzled as he is until Holmes explains. That is what makes each solution a surprise.', show: 'm' }],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Holmes says: *“when you have eliminated the impossible whatever remains, however improbable, must be the truth”*. How does he reason?',
          choices: ['He rules out what cannot be, and accepts what is left', 'He always chooses the most likely answer', 'He gives up when a crime seems impossible', 'He decides that a ghost must be to blame'],
          answer: 0,
          working: 'He rules out every way the killer could not have entered; the way that is left must be right.',
        },
      ],
      lines: [
        { say: 'Your turn. Holmes says that when you have eliminated the impossible, whatever remains, however improbable, must be the truth. How does he reason? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. He rules out every way the killer could not have entered. Whatever is left must be the answer, however strange it seems.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Pearls, a locked room, a chase, an empty box.', 'Holmes’s cold reason; Watson’s feeling.', 'Greed: the treasure ruins those who touch it.', 'Context: British India and the Empire’s prejudices.'] }],
      lines: [
        { say: 'Let’s sum up. The case moves from the pearls to a locked room, a river chase and an empty box.', show: 'sum.0' },
        { say: 'Holmes reasons coldly, and Watson brings the feeling.', show: 'sum.1' },
        { say: 'The treasure brings greed and ruin to almost everyone who touches it.', show: 'sum.2' },
        { say: 'And the story comes from British India, and shares the Empire’s prejudices.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
