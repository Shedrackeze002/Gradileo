import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e5-3-4',
  lessonId: 'e5-3-4',
  title: 'Fact, Opinion and the Author’s Purpose',
  thumbnailTitle: 'Fact, Opinion and Purpose',
  summary:
    'A fact can be proved true or false, and an opinion tells what someone thinks or feels. Authors write to persuade, inform or entertain, which is easy to remember as PIE.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Reading for Information', title: 'Fact, Opinion and the Author’s Purpose', subtitle: 'Two questions a careful reader asks' }],
      lines: [
        { say: 'A careful reader asks two questions about everything they read. Is this true, or is it just what someone thinks? And why did the author write this?', show: 'title' },
        { say: 'In this lesson, you will learn to tell facts from opinions, and to name an author’s purpose.' },
      ],
    },
    {
      chapter: 'Fact and opinion',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Fact and opinion', md: 'A **fact** can be **proved** true or false, by measuring, counting, looking it up or seeing it. An **opinion** tells what someone **thinks, feels or believes**; people can disagree with it.' },
        {
          kind: 'table',
          id: 't',
          head: ['Fact', 'Opinion'],
          rows: [
            ['A spider has eight legs.', 'Spiders are creepy.'],
            ['The library opens at 9 a.m.', 'The library should open earlier.'],
            ['Water freezes at 0 °C.', 'Winter is the best season.'],
          ],
        },
      ],
      lines: [
        { say: 'A fact can be proved true or false, by measuring, counting, looking it up, or seeing it.', show: 'def' },
        { say: 'An opinion tells what someone thinks, feels or believes. People can disagree with it.', focus: 'def' },
        { say: 'A spider has eight legs is a fact: we can count them. Spiders are creepy is an opinion. Some people love spiders!', show: 't', focus: 't.0' },
        { say: 'The library opens at nine in the morning is a fact. The library should open earlier is an opinion. And water freezes at zero degrees Celsius is a fact, while winter is the best season is an opinion.', caption: 'The library opens at 9 a.m. is a fact. The library should open earlier is an opinion. And water freezes at 0 °C is a fact, while winter is the best season is an opinion.', focus: ['t.1', 't.2'] },
        { say: 'Opinion clue words include best, worst, beautiful, boring, should, I think, I believe, and everyone loves.' },
      ],
    },
    {
      chapter: 'Testing a sentence',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['Soccer is the most exciting sport in the world.'] },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'A wrong fact is still a fact statement', md: '“A spider has six legs” is false, but it can be checked and proved wrong. It is a (false) fact statement, not an opinion.' },
      ],
      lines: [
        { say: 'Is this a fact or an opinion?', show: 'q' },
        { say: 'Could we prove it with a measurement or a reference book? No. Exciting depends on the person, and many people would disagree. So it is an opinion.', focus: 'q' },
        { say: 'Here is a common mistake. A spider has six legs is false, but it is still the kind of statement that can be checked and proved wrong. That makes it a false fact statement, not an opinion.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'The author’s purpose',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Purpose', 'The author wants to', 'Examples'],
          rows: [
            ['**P**ersuade', 'make you think or do something', 'an advertisement, a letter asking for a park'],
            ['**I**nform', 'teach you facts', 'a textbook page, a news report'],
            ['**E**ntertain', 'make you enjoy, laugh or feel', 'a story, a comic, a funny poem'],
          ],
        },
      ],
      lines: [
        { say: 'The author’s purpose is the reason an author writes. There are three main reasons, and an easy way to remember them is PIE.', show: 't' },
        { say: 'To persuade means to make you think or do something, like an advertisement, or a letter asking for a new park.', focus: 't.0' },
        { say: 'To inform means to teach you facts, like a textbook page, a news report, or instructions.', focus: 't.1' },
        { say: 'And to entertain means to make you enjoy, laugh or feel something, like a story, a comic, or a funny poem.', focus: 't.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: '“Come to Maple Street Bakery! Our cinnamon rolls are the softest in the city, and this week every second roll is free.” What is the author’s purpose?',
          choices: ['To persuade', 'To inform', 'To entertain', 'To describe a setting'],
          answer: 0,
          working: 'It uses an opinion word (“softest”) and offers a deal, because it wants the reader to go to the bakery.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the author’s purpose in this text? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is A, to persuade. The text uses an opinion word, softest, and offers a deal, because it wants you to go to the bakery.', show: 'q2.answer' },
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
            'A **fact** can be proved; an **opinion** is what someone thinks or feels.',
            'Opinion clue words: *best, should, I think, beautiful, boring*.',
            'An author writes to **persuade**, **inform** or **entertain** (PIE).',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A fact can be proved, and an opinion is what someone thinks or feels.', show: 'sum.0' },
        { say: 'Opinion clue words include best, should, I think, beautiful and boring.', show: 'sum.1' },
        { say: 'And an author writes to persuade, inform or entertain. Remember it as PIE.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
