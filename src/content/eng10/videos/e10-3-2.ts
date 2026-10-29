import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e10-3-2',
  lessonId: 'e10-3-2',
  title: 'Character and Motive',
  thumbnail: false,
  summary:
    'Meet the Montagues and Capulets, follow the play act by act, and learn to explain a character’s motive with evidence, using foils to see each character more clearly.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Shakespeare', title: 'Character and Motive', subtitle: 'Why do the characters act as they do?' }],
      lines: [
        { say: 'The first scene of Romeo and Juliet begins with a rude gesture. One servant asks another, Do you bite your thumb at us, sir? Within minutes, the heads of both families are calling for their swords.', show: 'title' },
        { say: 'The feud is so old that no one remembers how it began, yet it drives everything that follows. In this lesson, you will meet the characters on each side and explain why they act as they do.' },
      ],
    },
    {
      chapter: 'The two households',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['The Montagues', 'The Capulets', 'Outside the families'],
          rows: [
            ['Romeo', 'Juliet', 'Prince Escalus'],
            ['Benvolio, Romeo’s cousin', 'Tybalt, Juliet’s cousin', 'Mercutio, Romeo’s friend'],
            ['Balthasar, Romeo’s servant', 'The Nurse', 'Friar Lawrence'],
          ],
        },
      ],
      lines: [
        { say: 'On one side are the Montagues. Romeo is their son, and Benvolio is his cousin and friend.', show: 't.0', focus: 't.0' },
        { say: 'On the other side are the Capulets. Juliet is their daughter, and Tybalt is her hot-tempered cousin.', show: 't.1', focus: 't.1' },
        { say: 'Mercutio, the Prince and Friar Lawrence stand outside the families. The Nurse has looked after Juliet since she was a baby.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Motive and evidence',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Motive', md: 'The **reason** behind what a character does. Support it with **evidence**: the character’s words, what others say, or what they do.' },
        { kind: 'text', id: 'q', size: 'md', md: '> In one respect I’ll thy assistant be;\\\n> For this alliance may so happy prove,\\\n> To turn your households’ rancour to pure love.' },
        { kind: 'text', id: 'ans', size: 'md', md: '**Motive:** he hopes the marriage will turn hatred into love.' },
      ],
      lines: [
        { say: 'A motive is the reason behind what a character does. To explain one, you need evidence.', show: 'def' },
        { say: 'Why does Friar Lawrence agree to marry Romeo and Juliet in secret? He has just teased Romeo for forgetting Rosaline so quickly, so he clearly doubts that the love is deep. Then he says this.', show: 'q' },
        { say: 'Notice the words in one respect. He agrees for one reason only. An alliance is a joining of families, and rancour is bitter hatred.', focus: 'q' },
        { say: 'So his motive is not trust in Romeo’s love. He hopes that marrying a Montague to a Capulet will turn the two families’ hatred into love.', show: 'ans' },
      ],
    },
    {
      chapter: 'Foils',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Foil', md: 'A character whose **differences** from another character make that character’s qualities stand out.' },
        {
          kind: 'bullets',
          id: 'b',
          items: ['Benvolio keeps the peace; Tybalt hates the word peace.', 'Mercutio jokes about love; Romeo is lovesick.', 'The Nurse is warm and chatty; Lady Capulet is distant and formal.'],
        },
      ],
      lines: [
        { say: 'A foil is a character whose differences from another character make that character’s qualities stand out. Shakespeare places several pairs side by side.', show: 'def' },
        { say: 'Benvolio tries to stop the first fight, while Tybalt hates the very word peace.', show: 'b.0', focus: 'b.0' },
        { say: 'Mercutio jokes about love, while Romeo is lovesick.', show: 'b.1', focus: 'b.1' },
        { say: 'And the Nurse is warm and close to Juliet, while her mother is distant and formal.', show: 'b.2', focus: 'b.2' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'mis', tone: 'mistake', title: 'Characters only know what they have seen', md: 'Tybalt, Mercutio, Lady Capulet and Paris never learn of the secret marriage. Explain a motive using **only what that character knows**.' },
      ],
      lines: [
        { say: 'Here is a trap. The audience knows that Romeo and Juliet are married, but Tybalt, Mercutio, Lady Capulet and Paris never find out.', show: 'mis' },
        { say: 'So when you explain a character’s motive, use only what that character knows. Tybalt challenges Romeo because Romeo came uninvited to the Capulets’ feast, not because of Juliet.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In Romeo and Juliet, Tybalt challenges Romeo to a fight. Which is Tybalt’s motive, based on what Tybalt actually knows?',
          choices: [
            'He has learned that Romeo secretly married his cousin Juliet.',
            'He wants to help Friar Lawrence bring the feud to an end.',
            'He is jealous because Romeo once loved a woman named Rosaline.',
            'He is furious that Romeo came to the Capulet feast uninvited.',
          ],
          answer: 3,
          working: 'Tybalt never learns of the marriage. His anger comes from Romeo’s uninvited visit to the Capulets’ feast.',
        },
      ],
      lines: [
        { say: 'Your turn. Tybalt challenges Romeo to a fight. Which is his motive, based on what he actually knows? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Tybalt is furious that Romeo came to the Capulet feast uninvited. Choice A cannot be right, because Tybalt never learns of the marriage.', show: 'q.answer' },
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
            'The Montagues and Capulets are at feud; Mercutio, the Prince and Friar Lawrence stand outside both.',
            'A **motive** is the reason behind an action. Support it with the character’s words and deeds.',
            'A **foil** makes another character’s qualities stand out by contrast.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The play follows two feuding families, with Mercutio, the Prince and Friar Lawrence outside both.', show: 'sum.0' },
        { say: 'A motive is the reason behind an action. Support it with the character’s own words and deeds, and remember what the character knows.', show: 'sum.1' },
        { say: 'And a foil, such as Benvolio beside Tybalt, makes another character’s qualities stand out by contrast.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
