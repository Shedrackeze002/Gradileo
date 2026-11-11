import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e9-1-3',
  lessonId: 'e9-1-3',
  title: 'Symbol and Allegory',
  summary:
    'A symbol is an object, person or place that stands for a bigger idea while keeping its ordinary meaning, and a motif is an image or idea that keeps recurring. Every reading of a symbol needs evidence. An allegory works on two levels, with the whole story standing for a second meaning, as in Animal Farm.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Fiction', title: 'Symbol and Allegory', subtitle: 'Stories that mean more than they say' }],
      lines: [
        { say: 'Some stories mean more than they say. A locked gate can stand for grief, and a race between animals can stand for any challenge in life.', show: 'title' },
        { say: 'In this video we interpret symbols and motifs, and see how an allegory gives a whole story a second meaning.' },
      ],
    },
    {
      chapter: 'Symbol and motif',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Symbol and motif', md: 'A **symbol** is an object, person or place that stands for a **bigger idea**, while keeping its ordinary meaning. A **motif** is an image or idea that keeps **recurring** through a text.' },
      ],
      lines: [
        { say: 'A symbol is an object, person or place that stands for a bigger idea, while keeping its ordinary meaning.', show: 'def' },
        { say: 'A motif is an image or idea that keeps recurring through a text. For example, a caged bird that appears three times in a novel about a girl whose parents control her life mirrors her own lack of freedom.', focus: 'def' },
      ],
    },
    {
      chapter: 'Reading a symbol',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['The garden had been Grandpa’s. Since the funeral, Grandma had kept its gate locked, and nobody had seen her go in. Weeds climbed the walls.'], by: 'A passage written for this lesson' },
        {
          kind: 'bullets',
          id: 'b',
          items: [
            'The garden was Grandpa’s, and it has been **locked** since his death.',
            'The **weeds** show long neglect.',
            'So it stands for what Grandma has shut away: her **grief**.',
          ],
        },
      ],
      lines: [
        { say: 'Read this passage.', show: 'q' },
        { say: 'The garden belonged to the grandfather, and it has been locked since his death.', show: 'b.0' },
        { say: 'The weeds show it has been neglected for a long time.', show: 'b.1' },
        { say: 'So the locked, overgrown garden stands for something Grandma has shut away: her grief. And later, when she unlocks the gate and starts pulling up weeds, the change in the symbol shows she is beginning to heal.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Not everything is a symbol',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Not everything is a symbol', md: 'A good reading is supported by **evidence**: repetition, emphasis, or a clear link to a character or theme. Without that, the object may simply be part of the **setting**.' },
      ],
      lines: [
        { say: 'A common mistake is to treat every object as a symbol.', show: 'm' },
        { say: 'A good reading of a symbol is supported by evidence from the text, such as repetition, emphasis, or a clear link to a character or theme. If you cannot point to that evidence, the object may simply be part of the setting.', focus: 'm' },
      ],
    },
    {
      chapter: 'Allegory',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Allegory', md: 'An **allegory** is a story in which the characters and events stand for ideas or real events. It works on **two levels** at once: the surface story and its hidden meaning.' },
        {
          kind: 'table',
          id: 't',
          head: ['Allegory', 'Second meaning'],
          rows: [
            ['**The tortoise and the hare**', 'steady effort beats careless speed'],
            ['**Plato’s cave**: prisoners take shadows for reality', 'most people see only part of the truth'],
            ['***Animal Farm***: the pigs become tyrants', 'the Russian Revolution and Stalin’s dictatorship'],
          ],
        },
      ],
      lines: [
        { say: 'An allegory is a story in which the characters and events stand for ideas or real events. It works on two levels at once: the surface story, and its hidden meaning.', show: 'def' },
        { say: 'In Aesop’s fable, a slow tortoise beats a fast but careless hare, so steady effort beats careless speed in any challenge. A fable teaches a lesson through animals.', show: 't', focus: 't.0' },
        { say: 'In Plato’s allegory of the cave, prisoners take shadows on the wall for reality, so most people see only a limited picture of the truth.', focus: 't.1' },
        { say: 'And in George Orwell’s Animal Farm, farm animals overthrow their farmer, but the pigs become tyrants. The story stands for the Russian Revolution, which ended in Stalin’s dictatorship.', focus: 't.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A lonely boy keeps a broken kite in his room. In *Animal Farm*, nearly every animal and event maps onto history. Which is true?',
          choices: [
            'The kite is a symbol; Animal Farm is an allegory.',
            'Both are allegories.',
            'The kite is an allegory; Animal Farm is a motif.',
            'Neither has a second meaning.',
          ],
          answer: 0,
          working: 'The kite is one element standing for his lost hopes, so it is a symbol. In an allegory, the whole story is a system of meanings pointing to a second level.',
        },
      ],
      lines: [
        { say: 'Your turn. A lonely boy keeps a broken kite in his room. In Animal Farm, nearly every animal and event maps onto history. Which is true? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is "A". The kite is one element that stands for his lost hopes, so it is a symbol. In Animal Farm, the whole story points to a second level, so it is an allegory.', caption: 'The answer is A. The kite is one element that stands for his lost hopes, so it is a symbol. In Animal Farm, the whole story points to a second level, so it is an allegory.', show: 'q2.answer' },
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
            'A **symbol** stands for a bigger idea; a **motif** recurs.',
            'Support every reading of a symbol with evidence.',
            'Watch for **changes** to a symbol: they show change in a character.',
            'An **allegory** works on two levels; the whole story has a second meaning.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A symbol stands for a bigger idea, and a motif is an image or idea that recurs.', show: 'sum.0' },
        { say: 'Support every reading of a symbol with evidence from the text.', show: 'sum.1' },
        { say: 'Watch for changes to a symbol, because they often show a change in a character.', show: 'sum.2' },
        { say: 'And an allegory works on two levels, with the whole story standing for a second meaning.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
