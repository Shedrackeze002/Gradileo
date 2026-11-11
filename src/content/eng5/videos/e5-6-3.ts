import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e5-6-3',
  lessonId: 'e5-6-3',
  title: 'Opinion Writing',
  summary:
    'An opinion piece states a clear opinion, gives reasons backed by evidence, and ends with a conclusion. A strong reason matters to the reader, and linking words such as because, for example and however join the ideas.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Writing', title: 'Opinion Writing', subtitle: 'Convincing your reader' }],
      lines: [
        { say: 'An opinion on its own is easy to ignore. An opinion with strong reasons is hard to argue with.', show: 'title' },
        { say: 'In this lesson, you will learn how to build an opinion piece, and how to link its ideas together.' },
      ],
    },
    {
      chapter: 'The parts of an opinion piece',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Opinion piece', md: 'In an **opinion piece** you tell the reader what you think and try to convince them to agree. It has an **opinion**, **reasons** backed by **evidence**, and a **conclusion**.' },
        { kind: 'bullets', id: 'b', items: ['**Opinion:** *Our school should have a vegetable garden.*', '**Reasons**, each backed by a fact, an example or an expert’s words', '**Conclusion:** the opinion again, and something to think about'] },
      ],
      lines: [
        { say: 'In an opinion piece, you tell the reader what you think, and try to convince them to agree.', show: 'def' },
        { say: 'The opinion states clearly what you think. Our school should have a vegetable garden.', show: 'b.0' },
        { say: 'The reasons explain why. Each reason is backed by evidence: a fact, an example, or an expert’s words.', show: 'b.1' },
        { say: 'And the conclusion restates the opinion, and leaves the reader with something to think about.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Strong and weak reasons',
      layout: 'center',
      main: [
        { kind: 'text', id: 'op', size: 'md', md: '**Opinion:** *Our class should go to the science centre for our field trip.*' },
        { kind: 'table', id: 't', head: ['Weak', 'Strong'], rows: [['*I just want to.*', '*We are studying electricity, and the science centre has a hands-on electricity exhibit.*']] },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Repeating the opinion is not a reason', md: '“We should go because it is the best place to go” just says the opinion again. A reason must explain *why*.' },
      ],
      lines: [
        { say: 'Here is an opinion. Which reason is stronger?', show: 'op' },
        { say: 'I just want to is about the writer’s wish, not a reason the reader can share.', show: 't' },
        { say: 'We are studying electricity, and the science centre has a hands-on electricity exhibit, connects to the class, and it can be checked. A strong reason matters to the reader, not only to the writer.', focus: 't' },
        { say: 'Here is a common mistake. We should go to the science centre because it is the best place to go just says the opinion again in different words. A reason must explain why.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Linking words',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['To do this', 'Use'],
          rows: [
            ['give a reason', '*because, since, so that*'],
            ['add another reason', '*also, in addition, another reason is*'],
            ['give an example', '*for example, for instance, such as*'],
            ['show the other side', '*however, but, although*'],
            ['conclude', '*for these reasons, in conclusion, that is why*'],
          ],
        },
      ],
      lines: [
        { say: 'Linking words join your opinion, reasons and examples, so the reader can follow your thinking.', show: 't' },
        { say: 'Because and since give a reason. Also and in addition add another one.', focus: ['t.0', 't.1'] },
        { say: 'For example and for instance give an example. However and although show the other side.', focus: ['t.2', 't.3'] },
        { say: 'And for these reasons, or in conclusion, start your conclusion.', focus: 't.4' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: '“Dogs make great pets. ____, they can be trained to fetch, sit and shake hands.” Which linking word fits best?',
          choices: ['For example', 'However', 'In conclusion', 'Although'],
          answer: 0,
          working: 'The second sentence gives an example of why dogs are great pets.',
        },
      ],
      lines: [
        { say: 'Your turn. Which linking word fits the gap best? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is A, for example. The second sentence gives an example of why dogs make great pets.', show: 'q2.answer' },
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
            'An opinion piece has an **opinion**, **reasons** backed by **evidence**, and a **conclusion**.',
            'A strong reason matters to the reader; repeating the opinion is not a reason.',
            '**Linking words** (*because, for example, however*) join the ideas.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An opinion piece has a clear opinion, reasons backed by evidence, and a conclusion.', show: 'sum.0' },
        { say: 'A strong reason matters to the reader, and can be supported. Repeating the opinion is not a reason.', show: 'sum.1' },
        { say: 'And linking words such as because, for example and however join the ideas.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
