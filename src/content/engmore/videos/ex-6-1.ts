import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'ex-6-1',
  lessonId: 'ex-6-1',
  title: 'Frankenstein',
  thumbnail: false,
  summary:
    'Mary Shelley’s Gothic novel, a story within a story, follows Victor Frankenstein as he gives life to a creature and abandons it in horror. Its key quotations show dangerous knowledge, a creator’s failed duty, rejection and revenge, drawing on the science of galvanism and the myth of Prometheus.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Nineteenth-Century Novels: Shelley, Brontë, Austen and Conan Doyle', title: 'Frankenstein', subtitle: 'Mary Shelley, 1818 and 1831' }],
      lines: [
        { say: 'A young scientist discovers how to give life to a body he has built, and then runs from it in horror. Mary Shelley’s Frankenstein asks who is truly to blame: the creature, or the man who made him.', show: 'title' },
        { say: 'In this lesson, you will learn the story and its characters, read its key quotations, and see the novel in its time.' },
      ],
    },
    {
      chapter: 'A story within a story',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['Walton’s letters, from the Arctic', 'Victor’s story', 'The creature’s story, at the centre'] }],
      lines: [
        { say: 'The novel is a frame narrative. The explorer Walton writes letters to his sister.', show: 'b.0' },
        { say: 'Inside them, Victor tells how he built the creature, abandoned it, and lost his brother William, his friend Clerval and his bride Elizabeth to its revenge.', show: 'b.1' },
        { say: 'And at the centre, the creature tells his own story: how he learned to speak, and how everyone he met rejected him.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Dangerous knowledge',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q1', md: '*“A new species would bless me as its creator and source”*' },
        { kind: 'text', id: 'q2', md: '*“the beauty of the dream vanished, and breathless horror and disgust filled my heart.”*' },
      ],
      lines: [
        { say: 'Victor dreamed that a new species would bless him as its creator. He wanted to be worshipped, so his science is driven by pride.', show: 'q1' },
        { say: 'But the moment the creature opens its eyes, Victor is filled with horror and disgust. He judges it by its looks before it has done anything.', show: 'q2' },
      ],
    },
    {
      chapter: 'Rejection and revenge',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: '*“I was benevolent and good; misery made me a fiend.”*' },
        { kind: 'callout', id: 'c', tone: 'key', title: 'His threat', md: '*“if I cannot inspire love, I will cause fear”*' },
      ],
      lines: [
        { say: 'The creature tells Victor that he was born good, and misery made him a fiend. Cruelty and loneliness changed him.', show: 'q' },
        { say: 'Refused a companion, he turns to revenge: if he cannot inspire love, he will cause fear.', show: 'c' },
      ],
    },
    {
      chapter: 'Context',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Galvanism', md: 'Experiments of Shelley’s time that made the muscles of dead animals twitch with **electricity**.' }],
      lines: [
        { say: 'Scientists of Shelley’s time made dead animals twitch with electric currents. Some wondered if electricity was the spark of life.', show: 'c' },
        { say: 'The subtitle, The Modern Prometheus, compares Victor to the Titan who stole fire from the gods, and was punished for it.' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [{ kind: 'callout', id: 'm', tone: 'mistake', title: 'The creature is not called Frankenstein', md: 'Frankenstein is **Victor**, the creator. The creature is never given a name.' }],
      lines: [{ say: 'A common mistake is to call the creature Frankenstein. Frankenstein is Victor, the creator. The creature is never even given a name, which is part of how he is rejected.', show: 'm' }],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The creature says: *“I ought to be thy Adam, but I am rather the fallen angel”*. What does he mean?',
          choices: ['He is more powerful than any man', 'He has sinned like Adam and wants forgiveness', 'He should have been loved by his maker, but was cast out for no wrong', 'He wants to become a priest'],
          answer: 2,
          working: 'Adam was made and loved by God; the fallen angel, Satan, was cast out of heaven.',
        },
      ],
      lines: [
        { say: 'Your turn. The creature tells Victor, I ought to be thy Adam, but I am rather the fallen angel. What does he mean? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Adam was made and loved by God. The fallen angel was cast out. The creature should have been loved by his maker, but Victor cast him out for no wrong he had done.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A frame narrative: Walton, Victor, the creature.', 'Dangerous knowledge: Victor’s pride.', 'Rejection turns the creature to revenge.', 'Context: galvanism and Prometheus.'] }],
      lines: [
        { say: 'Let’s sum up. The novel is a story within a story: Walton, then Victor, then the creature at the centre.', show: 'sum.0' },
        { say: 'Victor’s ambition is driven by pride, and he abandons what he made.', show: 'sum.1' },
        { say: 'The creature is born good, but rejection turns him to revenge.', show: 'sum.2' },
        { say: 'And the novel draws on the science of galvanism and the myth of Prometheus.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
