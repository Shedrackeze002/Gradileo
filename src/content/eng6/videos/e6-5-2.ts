import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e6-5-2',
  lessonId: 'e6-5-2',
  title: 'Denotation and Connotation',
  summary:
    'A word’s denotation is its dictionary meaning, and its connotation is the feeling or idea it suggests, which can be positive, negative or neutral. Writers choose words for their connotations.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Words', title: 'Denotation and Connotation', subtitle: 'The feelings words carry' }],
      lines: [
        { say: 'Slender, thin and scrawny all describe someone without much fat on them. But if a friend called you scrawny, you would probably feel very differently than if they called you slender.', show: 'title' },
        { say: 'Words have a dictionary meaning, and also a feeling attached to them. Choosing words for their feelings is one of a writer’s most powerful tools.' },
      ],
    },
    {
      chapter: 'Denotation and connotation',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Denotation and connotation', md: 'The **denotation** of a word is its dictionary meaning. The **connotation** is the feeling or idea it suggests: **positive**, **negative** or **neutral**.' },
        {
          kind: 'table',
          id: 't',
          head: ['Positive', 'Neutral', 'Negative'],
          rows: [
            ['slender', 'thin', 'scrawny'],
            ['curious', 'interested', 'nosy'],
            ['determined', 'firm', 'stubborn'],
            ['thrifty', 'careful with money', 'stingy'],
            ['aroma', 'smell', 'stench'],
          ],
        },
      ],
      lines: [
        { say: 'The denotation of a word is its dictionary meaning.', show: 'def' },
        { say: 'The connotation of a word is the feeling or idea it suggests. A connotation can be positive, negative or neutral.', focus: 'def' },
        { say: 'Slender is positive, thin is neutral, and scrawny is negative, but all three have nearly the same denotation.', show: 't', focus: 't.0' },
        { say: 'Curious is positive, but nosy is negative. Determined sounds admirable, while stubborn sounds difficult.', focus: ['t.1', 't.2'] },
        { say: 'And an aroma is a pleasant smell, while a stench is a horrible one.', focus: 't.4' },
      ],
    },
    {
      chapter: 'Naming a connotation',
      layout: 'center',
      main: [
        { kind: 'text', id: 'a', size: 'md', md: '*stubborn*: “not willing to change one’s mind”' },
        { kind: 'text', id: 'ans', size: 'lg', md: 'Connotation: **negative**' },
      ],
      lines: [
        { say: 'What is the connotation of stubborn? Its denotation is not willing to change one’s mind.', show: 'a' },
        { say: 'Would you be pleased to be called stubborn? Probably not. It suggests being difficult for no good reason, so its connotation is negative. Determined is a positive word for a similar trait.', show: 'ans', focus: 'ans' },
      ],
    },
    {
      chapter: 'Choosing words on purpose',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['a small house: *cosy*, not *cramped*', 'people at a match: *fans*, *crowd* or *mob*'] },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Synonyms are not always swappable', md: 'A thesaurus lists *stench* as a synonym for *smell*, but “the stench of baking bread” sounds disgusting.' },
      ],
      lines: [
        { say: 'Writers choose connotations on purpose. Someone selling a small house calls it cosy, not cramped.', show: 'b.0' },
        { say: 'A news report on an angry crowd might say mob. A friendly report might say crowd, or fans.', show: 'b.1' },
        { say: 'Here is a common mistake. A thesaurus lists stench as a synonym for smell, but the stench of baking bread sounds disgusting. Check the connotation before you swap one word for another.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A writer wants readers to admire a character who asks lots of questions. Which word fits best?',
          choices: ['nosy', 'prying', 'interfering', 'inquisitive'],
          answer: 3,
          working: '“Nosy”, “prying” and “interfering” suggest getting into other people’s business. “Inquisitive” suggests a healthy wish to learn.',
        },
      ],
      lines: [
        { say: 'Your turn. Which word fits best? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is D, inquisitive. Nosy, prying and interfering all suggest getting into other people’s business. Inquisitive suggests a healthy wish to learn.', show: 'q2.answer' },
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
            '**Denotation** is the dictionary meaning; **connotation** is the feeling a word carries.',
            'Connotations can be positive, negative or neutral.',
            'Choose words for the feeling you want, and check before swapping synonyms.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Denotation is the dictionary meaning, and connotation is the feeling a word carries.', show: 'sum.0' },
        { say: 'Connotations can be positive, negative or neutral.', show: 'sum.1' },
        { say: 'And choose words for the feeling you want the reader to have. Check connotations before swapping synonyms.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
