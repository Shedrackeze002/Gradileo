import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'ex-5-3',
  lessonId: 'ex-5-3',
  title: 'Great Expectations',
  thumbnail: false,
  summary:
    'Dickens’s novel of 1861 follows Pip from the forge to London and back, as a secret benefactor makes him a gentleman. Its key quotations show class and ambition, wealth and gentility, loyalty, and the cost of revenge, and the older Pip judges his younger self as he tells the story.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Nineteenth-Century Novels: Dickens and Stevenson', title: 'Great Expectations', subtitle: 'Charles Dickens, 1861' }],
      lines: [
        { say: 'Pip, an orphan raised by the village blacksmith, is suddenly told he has great expectations: someone will make him a gentleman. Charles Dickens published the novel in eighteen sixty-one.', caption: 'Pip, an orphan raised by the village blacksmith, is suddenly told he has great expectations: someone will make him a gentleman. Charles Dickens published the novel in 1861.', show: 'title' },
        { say: 'In this lesson, you will learn the story and its characters, read its key quotations, and see what the novel says about being a gentleman.' },
      ],
    },
    {
      chapter: 'Three stages',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['Childhood: the convict, Satis House, the forge', 'Expectations: London, and shame of Joe', 'Ruin and growth: the truth about the money'] }],
      lines: [
        { say: 'As a boy, Pip helps an escaped convict, visits the strange Miss Havisham and her adopted daughter Estella, and is apprenticed to Joe at the forge.', show: 'b.0' },
        { say: 'Then the lawyer Jaggers announces Pip’s expectations. Pip moves to London, and grows ashamed of Joe.', show: 'b.1' },
        { say: 'Finally the convict, Magwitch, returns and reveals that he paid for everything. Pip loses his fortune, and learns what really matters.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Shame and ambition',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q1', md: '*“And what coarse hands he has! And what thick boots!”*' },
        { kind: 'text', id: 'q2', md: '*“I want to be a gentleman.”*' },
      ],
      lines: [
        { say: 'At Satis House, Estella sneers at Pip’s hands and boots. For the first time, he is ashamed of being working class.', show: 'q1' },
        { say: 'Soon he tells his friend Biddy that he wants to be a gentleman. His ambition grows from shame, not from any wish to be better.', show: 'q2' },
      ],
    },
    {
      chapter: 'Who paid',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: '*“Yes, Pip, dear boy, I’ve made a gentleman on you! It’s me wot has done it!”*' },
        { kind: 'callout', id: 'c', tone: 'key', title: 'The true gentleman', md: 'Joe has no money or polish, yet he is the most **gentle** and good man in the novel.' },
      ],
      lines: [
        { say: 'When Magwitch reveals that he made Pip a gentleman, Pip is horrified. His gentility was bought with a convict’s money.', show: 'q' },
        { say: 'So Dickens asks what a gentleman really is. Joe, the blacksmith, has no money or polish, yet he is the truest gentleman of all.', show: 'c' },
      ],
    },
    {
      chapter: 'Revenge',
      layout: 'center',
      main: [{ kind: 'text', id: 'q', md: '*“I am what you have made me.”*' }],
      lines: [
        { say: 'Miss Havisham, jilted on her wedding day, raised Estella to break men’s hearts. When she complains that Estella is cold to her, Estella answers: I am what you have made me. The revenge has turned on Miss Havisham herself.', show: 'q' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [{ kind: 'callout', id: 'm', tone: 'mistake', title: 'The narrator judges himself', md: 'The **older Pip** tells the story, and often criticises his younger self, for example for being ashamed of Joe.' }],
      lines: [{ say: 'A common mistake is to take young Pip’s view as the novel’s view. The older Pip narrates, and he often criticises his younger self, for example for being ashamed of Joe.', show: 'm' }],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Leaving London, Joe says: *“Pip, dear old chap, life is made of ever so many partings welded together”*. What does this show?',
          choices: ['Joe accepts with dignity that he and Pip now live apart', 'Joe never wants to see Pip again', 'Joe hopes Pip will come back to work at the forge', 'Joe is announcing his own wedding'],
          answer: 0,
          working: '“Welded” is the language of Joe’s own trade: he speaks simply and kindly.',
        },
      ],
      lines: [
        { say: 'Your turn. Leaving London after an awkward visit, Joe says that life is made of ever so many partings welded together. What does this show? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Welded is the language of the forge. Joe accepts, with dignity, that he and Pip now live apart.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Three stages: childhood, expectations, ruin and growth.', 'Ambition grows from shame.', 'A convict paid; Joe is the true gentleman.', 'The older Pip judges his younger self.'] }],
      lines: [
        { say: 'Let’s sum up. The novel moves from Pip’s childhood, to his expectations, to his ruin and growth.', show: 'sum.0' },
        { say: 'His ambition grows from Estella’s scorn and his shame.', show: 'sum.1' },
        { say: 'His fortune came from a convict, and Joe turns out to be the true gentleman.', show: 'sum.2' },
        { say: 'And the older Pip looks back, judging the snob he became.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
