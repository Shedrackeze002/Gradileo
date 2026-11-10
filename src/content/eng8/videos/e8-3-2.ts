import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e8-3-2',
  lessonId: 'e8-3-2',
  title: 'Shakespeare’s Language',
  summary:
    'Shakespeare’s English uses a handful of old words (thou = you, art = are, wherefore = why, ill = bad) and some words that have changed meaning (translated = transformed). Verse has a regular beat and prose does not: the court and lovers speak verse, the mechanicals speak prose, and the fairies often rhyme.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'A Midsummer Night’s Dream', title: 'Shakespeare’s Language', subtitle: 'Old words, verse and prose' }],
      lines: [
        { say: 'Shakespeare’s English is over four hundred years old, so it can look strange at first. But most of it is the same language we speak today.', show: 'title' },
        { say: 'In this video we learn the keys that unlock it, and see why some characters speak in verse and others in prose.' },
      ],
    },
    {
      chapter: 'Verse and prose',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Verse and prose', md: '**Verse** is writing set out in lines with a regular beat, like poetry. **Prose** is ordinary sentences, with no regular beat. Shakespeare’s plays mix the two, and his choice tells us about the characters.' },
      ],
      lines: [
        { say: 'Verse is writing set out in lines with a regular beat, like poetry. Prose is ordinary sentences, with no regular beat, like the sentences in a novel.', show: 'def' },
        { say: 'Shakespeare’s plays mix the two, and which one a character speaks tells us something about them. We will come back to that after the old words.', focus: 'def' },
      ],
    },
    {
      chapter: 'Old words',
      layout: 'split',
      leftWidth: 760,
      left: [
        {
          kind: 'table',
          id: 't',
          head: ['Shakespeare', 'Today'],
          rows: [
            ['thou, thee', 'you'],
            ['thy, thine', 'your, yours'],
            ['art', 'are'],
            ['hath, doth', 'has, does'],
            ['wherefore', 'why'],
            ['ere', 'before'],
            ['ill', 'bad, badly'],
          ],
        },
      ],
      right: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['Ill met by moonlight, proud Titania.'], by: 'Oberon' },
        { kind: 'text', id: 'e', size: 'md', md: '“It is **bad luck** to meet you here tonight, proud Titania.”' },
      ],
      lines: [
        { say: 'Here are the old words you will meet most. Thou and thee mean you, and thy and thine mean your and yours. Art means are, so thou art means you are.', show: 't', focus: ['t.0', 't.1', 't.2'] },
        { say: 'Hath and doth mean has and does. Wherefore means why. Ere means before, and ill means bad or badly.', focus: ['t.3', 't.4', 't.5', 't.6'] },
        { say: 'Let’s decode a line. When Oberon meets his queen in the wood, he says: Ill met by moonlight, proud Titania.', show: 'q' },
        { say: 'Ill means bad, and met means meeting. So he is saying, it is bad luck to meet you here tonight. The cold greeting shows how angry their quarrel has made them.', show: 'e' },
      ],
    },
    {
      chapter: 'Changed meanings',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Words that have shifted', md: '“Bless thee, Bottom! bless thee! thou art **translated**.” Here *translated* means **transformed**.\n\n“I’ll put a **girdle** round about the earth / In forty minutes.” A *girdle* is a **belt**.' },
        { kind: 'callout', id: 'm', tone: 'mistake', title: '“Wherefore” means “why”', md: '“Wherefore art thou Romeo?” means “**Why** are you Romeo?”, not “Where are you?”' },
      ],
      lines: [
        { say: 'Some words have changed meaning. When Quince sees Bottom with a donkey’s head, he cries: thou art translated. Here, translated means transformed, not put into another language.', show: 'tip' },
        { say: 'And when Puck boasts that he will put a girdle round about the earth in forty minutes, a girdle is a belt. He can fly all the way round the world very fast.', focus: 'tip' },
        { say: 'A common mistake is to think wherefore means where. It means why. So Juliet’s famous line, wherefore art thou Romeo, means why are you Romeo, not where are you.', show: 'm' },
      ],
    },
    {
      chapter: 'Who speaks what',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Kind', 'What it is', 'Who speaks it'],
          rows: [
            ['**Blank verse**', 'unrhymed iambic pentameter', 'the court and lovers, when serious'],
            ['**Rhyming verse**', 'rhymed lines, often couplets', 'the charmed lovers, and the fairies'],
            ['**Prose**', 'ordinary sentences', 'the mechanicals, such as Bottom'],
          ],
        },
        { kind: 'quote', id: 'q', size: 'md', lines: ['I have had a most rare vision. I have had a dream,', 'past the wit of man to say what dream it was.'], by: 'Bottom' },
      ],
      lines: [
        { say: 'The court and the lovers speak blank verse in serious moments. That is unrhymed iambic pentameter, as in: the course of true love never did run smooth.', show: 't', focus: 't.0' },
        { say: 'Under the potion, the lovers often speak in neat rhyming couplets, and the sing-song rhymes suit their silly romance. The fairies use short rhyming lines that sound magical.', focus: 't.1' },
        { say: 'The mechanicals speak prose, the language of ordinary working people in the play.', focus: 't.2' },
        { say: 'After his night as a donkey, Bottom wakes and says this. His prose reaches for something wonderful but keeps stumbling, so we see an ordinary man struggling to describe magic, which is both funny and touching.', show: 'q' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which kind of speech do the mechanicals, such as Bottom and Quince, usually use?',
          choices: [
            'Prose: ordinary sentences with no regular beat',
            'Blank verse: unrhymed iambic pentameter',
            'Rhyming couplets',
            'Short, sung fairy lines',
          ],
          answer: 0,
          working: 'The mechanicals, such as Bottom and Quince, speak prose, the language of ordinary working people in the play.',
        },
      ],
      lines: [
        { say: 'Your turn. Which kind of speech do the mechanicals, like Bottom and Quince, usually use? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is "A". The mechanicals speak prose, ordinary sentences with no regular beat, which marks them as ordinary working people.', caption: 'The answer is A. The mechanicals speak prose, ordinary sentences with no regular beat, which marks them as ordinary working people.', show: 'q2.answer' },
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
            '*thou* = you, *art* = are, *wherefore* = why, *ill* = bad.',
            'Some words shifted: *translated* = transformed, *girdle* = belt.',
            '**Verse** has a regular beat; **prose** is ordinary sentences.',
            'Court and lovers speak verse, mechanicals prose; fairies often rhyme.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Thou means you, art means are, wherefore means why, and ill means bad.', show: 'sum.0' },
        { say: 'Some words have shifted meaning: translated means transformed, and a girdle is a belt.', show: 'sum.1' },
        { say: 'Verse has a regular beat, and prose is ordinary sentences.', show: 'sum.2' },
        { say: 'The court and the lovers speak verse, the mechanicals speak prose, and the fairies often speak in rhyme.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
