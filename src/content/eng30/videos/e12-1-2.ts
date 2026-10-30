import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e12-1-2',
  lessonId: 'e12-1-2',
  title: 'Context and Society in Fiction',
  summary:
    'Context is the history, society, biography and literary conventions around a story. Use it to explain why the story’s own words matter, never to replace them, and trace how characters conform to, resist, are torn by or exploit the expectations of their society.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [
        { kind: 'title', id: 'title', kicker: 'Fiction', title: 'Context and Society in Fiction', subtitle: 'What surrounds a story, and what it asks of its characters' },
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['By accident, combined perhaps with some natural affinity, the society consisted of individuals who were, generally speaking, more white than black.'],
          by: 'Charles W. Chesnutt, “The Wife of His Youth”',
        },
      ],
      lines: [
        { say: 'Mr. Ryder, in Charles Chesnutt’s story, is the most respected member of a society of light-skinned Black Americans in a Northern city, soon after the Civil War.', show: 'title' },
        { say: 'To read this sentence well, you need to hear the irony in the words by accident, and to know something about colour and class after slavery. In this lesson, you will use context to deepen a reading, and analyse how characters are shaped by their society.', show: 'q' },
      ],
    },
    {
      chapter: 'Using context well',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Historical and social**: the history and beliefs of the time',
            '**Biographical**: the author’s life',
            '**Literary**: the conventions of the kind of writing',
          ],
        },
        { kind: 'text', id: 't', size: 'md', md: 'Context helps when it explains **why the words of the story matter**.' },
      ],
      lines: [
        { say: 'Context is what surrounds a text. It can be historical and social, the beliefs of the time and place.', show: 'b.0' },
        { say: 'It can be biographical, the author’s life, or literary, the conventions of that kind of writing.', show: ['b.1', 'b.2'] },
        { say: 'Context helps when it explains why the story’s words matter. Sui Sin Far wrote about Chinese American life while US law barred most Chinese immigration. That is why the word Americanized, in quotation marks, carries such weight in “Mrs. Spring Fragrance”.', show: 't', focus: 't' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Context replaces the text**: “Women in the 1890s had few rights, so Edna must be miserable throughout.”',
            '**Irrelevant context**: a true fact with no link to the point',
            '**The biographical trap**: treating a character as the author',
          ],
        },
      ],
      lines: [
        { say: 'Here are three common mistakes. First, letting context replace the text.', show: 'b.0', focus: 'b.0' },
        { say: 'Saying that women had few rights, so Edna must be miserable throughout, decides the story in advance. Context should explain what the story shows, not decide it.' },
        { say: 'Second, using a true fact that has nothing to do with your point. Third, the biographical trap, which treats a character as the author, or the plot as the author’s diary.', show: ['b.1', 'b.2'] },
      ],
    },
    {
      chapter: 'Characters and their societies',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['**Conform** to the expectations', '**Resist** them', 'Feel **torn** between them and their own wishes', '**Exploit** the rules for their own ends'],
        },
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['I would give up the unessential; I would give my money, I would give my life for my children; but I wouldn’t give myself.'],
          by: 'Kate Chopin, The Awakening',
        },
      ],
      lines: [
        { say: 'Characters may conform to the expectations around them, resist them, feel torn between them and their own wishes, or exploit the rules.', show: ['b.0', 'b.1', 'b.2', 'b.3'] },
        { say: 'Before you describe a character’s relationship with society, state the expectation exactly. In The Awakening, the mother-women are expected to efface themselves as individuals.', focus: 'b' },
        { say: 'Edna refuses. She will give her money and even her life for her children, but she will not give herself.', show: 'q', focus: 'q' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'At his ball, Mr. Ryder introduces the old woman as the wife of his youth. How does he answer his society’s expectations?',
          choices: [
            'He resists them, choosing loyalty to his past over the standing it prizes.',
            'He conforms to them, hiding his past so that his standing stays safe.',
            'He exploits them, using the guests’ approval to win more respect.',
            'He is torn by them, and leaves the question unanswered at the end.',
          ],
          answer: 0,
          working: 'He publicly acknowledges his wife from the days of slavery, so he chooses loyalty over the standing his society prizes. He resists.',
        },
      ],
      lines: [
        { say: 'Your turn. At his ball, Mr. Ryder introduces the old woman as the wife of his youth. How does he answer his society’s expectations? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is A. He publicly acknowledges his wife from the days of slavery, so he chooses loyalty over the standing his society prizes. He resists.', show: 'q2.answer' },
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
            'Context is the history, society, biography and conventions around a text.',
            'Use it to explain the story’s words, never to replace them.',
            'Name the expectation, then trace how the character responds.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Context is the history, society, biography and conventions around a text.', show: 'sum.0' },
        { say: 'Use it to explain why the story’s own words matter, and never let it replace them.', show: 'sum.1' },
        { say: 'And name the expectation first, then trace how the character conforms, resists, is torn, or exploits it.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
