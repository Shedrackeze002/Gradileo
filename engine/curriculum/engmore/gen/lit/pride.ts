/** Pride and Prejudice, Jane Austen (1813). Quotations from Project Gutenberg eBook #1342. */
import type { LitText } from '../literature.ts';

export const PRIDE: LitText = {
  title: 'Pride and Prejudice',
  author: 'Jane Austen',
  date: '1813',
  source: 'Jane Austen, Pride and Prejudice, 1813. Quoted from Project Gutenberg eBook #1342.',
  part: 'Chapter',
  characters: [
    { name: 'Elizabeth Bennet', is: 'the lively, quick-witted second daughter of the Bennet family, who is too quick to judge' },
    { name: 'Mr Darcy', is: 'a very rich, proud gentleman who offends Elizabeth at a ball and later falls in love with her' },
    { name: 'Jane Bennet', is: 'the eldest and most beautiful Bennet sister, gentle and always willing to think well of others' },
    { name: 'Mr Bingley', is: 'a wealthy, friendly young man who rents Netherfield Park and falls for Jane' },
    { name: 'Mrs Bennet', is: 'a nervous, foolish mother whose one aim in life is to see her five daughters married' },
    { name: 'Mr Bennet', is: 'a clever, sarcastic father who prefers his library to his family and does not check his youngest daughter' },
    { name: 'Mr Collins', is: 'a pompous clergyman who will inherit the Bennets’ house, and who proposes to Elizabeth' },
    { name: 'Charlotte Lucas', is: 'Elizabeth’s sensible friend, who marries Mr Collins for a comfortable home' },
    { name: 'Mr Wickham', is: 'a charming officer who lies about Darcy and later runs away with Lydia' },
    { name: 'Lady Catherine de Bourgh', is: 'Darcy’s rich, overbearing aunt, who tries to stop him marrying Elizabeth' },
    { name: 'Lydia Bennet', is: 'the youngest, wildest Bennet sister, who runs away with Wickham' },
  ],
  events: [
    { where: 'Chapter 3', what: 'At the Meryton ball, Darcy refuses to dance with Elizabeth and calls her only “tolerable”.' },
    { where: 'Chapter 15', what: 'Wickham arrives in Meryton and charms Elizabeth with a story of how Darcy wronged him.' },
    { where: 'Chapter 19', what: 'Mr Collins proposes to Elizabeth, and she turns him down.' },
    { where: 'Chapter 22', what: 'Charlotte Lucas accepts Mr Collins’s proposal.' },
    { where: 'Chapter 34', what: 'Darcy proposes to Elizabeth at Hunsford, and she angrily refuses him.' },
    { where: 'Chapter 35', what: 'Darcy gives Elizabeth a letter explaining the truth about Wickham and about Jane and Bingley.' },
    { where: 'Chapter 43', what: 'Elizabeth visits Pemberley and meets a changed, courteous Darcy.' },
    { where: 'Chapter 46', what: 'Elizabeth learns that Lydia has run away with Wickham.' },
    { where: 'Chapter 52', what: 'Elizabeth discovers that Darcy secretly paid Wickham to marry Lydia.' },
    { where: 'Chapter 55', what: 'Bingley proposes to Jane, and she accepts.' },
    { where: 'Chapter 56', what: 'Lady Catherine visits Longbourn and demands that Elizabeth promise never to marry Darcy.' },
    { where: 'Chapter 58', what: 'Darcy proposes a second time, and Elizabeth accepts.' },
  ],
  themes: ['Pride', 'Prejudice and first impressions', 'Marriage and money', 'Social class', 'Love', 'Self-knowledge'],
  quotations: [
    {
      text: 'It is a truth universally acknowledged, that a single man in possession of a good fortune must be in want of a wife.',
      who: 'the narrator', where: 'Chapter 1', lead: 'The novel’s first sentence:', theme: 'Marriage and money',
      reading: 'The sentence is ironic: it is poor families who want a rich husband for their daughters, not rich men who need wives.',
      misreadings: [
        'The sentence is a serious rule of Regency society, which Austen states plainly so the reader knows what to expect.',
        'The sentence shows that rich men in the novel are lonely, so the story is mainly about their search for love.',
        'The sentence is a quotation from Mr Collins, who believes it, and the narrator agrees with him entirely.',
      ],
    },
    {
      text: 'The business of her life was to get her daughters married',
      who: 'the narrator', where: 'Chapter 1', lead: 'The narrator sums up Mrs Bennet:', theme: 'Marriage and money',
      reading: 'Calling marriage her “business” mocks Mrs Bennet, but it also shows how much her daughters’ futures depend on it.',
      misreadings: [
        'Mrs Bennet runs a business arranging marriages in Meryton, which is how the family earns its money.',
        'Mrs Bennet is a devoted mother who has no other interests, so the narrator praises her for her hard work.',
        'Mrs Bennet wants her daughters to marry for love, which shows how modern her views were for her time.',
      ],
    },
    {
      text: 'She is tolerable: but not handsome enough to tempt me',
      who: 'Mr Darcy', where: 'Chapter 3', lead: 'Bingley suggests that Darcy dance with Elizabeth:', theme: 'Pride',
      reading: 'Darcy’s cold judgement, spoken where she can hear, shows his pride and gives Elizabeth her first prejudice.',
      misreadings: [
        'Darcy is too shy to dance, so he makes an excuse and secretly hopes that Elizabeth will ask him herself.',
        'Darcy is joking with Bingley, and Elizabeth laughs because she knows that he does not mean what he says.',
        'Darcy has already promised the dance to Miss Bingley, so he politely explains why he cannot ask Elizabeth.',
      ],
    },
    {
      text: 'I could easily forgive his pride, if he had not mortified mine.',
      who: 'Elizabeth Bennet', where: 'Chapter 5', lead: 'The day after the ball, Charlotte says Darcy has a right to be proud:', theme: 'Pride',
      reading: 'Elizabeth admits, half joking, that her dislike of Darcy comes from her own hurt pride, not only from his.',
      misreadings: [
        'Elizabeth means that Darcy has insulted her family, and she will never forgive him for the shame he caused them.',
        'Elizabeth means that she is not proud at all, and that Darcy’s pride is the only fault in the whole affair.',
        'Elizabeth means that she has already forgiven Darcy, and she hopes that he will ask her to dance next time.',
      ],
    },
    {
      text: 'Happiness in marriage is entirely a matter of chance.',
      who: 'Charlotte Lucas', where: 'Chapter 6', lead: 'Charlotte and Elizabeth discuss Jane and Bingley:', theme: 'Marriage and money',
      reading: 'Charlotte treats marriage as a practical gamble rather than a matter of love, which prepares us for her choice of Mr Collins.',
      misreadings: [
        'Charlotte believes that couples must study each other for years before marrying, to be sure of their happiness.',
        'Charlotte is joking, and she later marries for passionate love, which proves that she did not mean it.',
        'Charlotte means that happiness depends on a large fortune, so she will only marry a very wealthy man.',
      ],
    },
    {
      text: 'An unhappy alternative is before you, Elizabeth. From this day you must be a stranger to one of your parents.',
      who: 'Mr Bennet', where: 'Chapter 20', lead: 'Mrs Bennet insists that Elizabeth accept Mr Collins:', theme: 'Marriage and money',
      reading: 'Mr Bennet uses wit to take Elizabeth’s side, so he supports her right to refuse a marriage made only for security.',
      misreadings: [
        'Mr Bennet orders Elizabeth to marry Mr Collins, and he threatens to send her away from home if she refuses.',
        'Mr Bennet is so upset by the quarrel that he leaves home, and he refuses to speak to his wife for a year.',
        'Mr Bennet means that Elizabeth must choose to live with one parent, since he and his wife are separating.',
      ],
    },
    {
      text: 'I am not romantic, you know. I never was. I ask only a comfortable home',
      who: 'Charlotte Lucas', where: 'Chapter 22', lead: 'Charlotte explains to Elizabeth why she accepted Mr Collins:', theme: 'Marriage and money',
      reading: 'For a woman with little money and few chances, marriage is security, so Charlotte’s choice is sensible if unromantic.',
      misreadings: [
        'Charlotte is secretly in love with Mr Collins, and she hides her feelings because she is embarrassed by them.',
        'Charlotte has been forced to marry by her father, and she is asking Elizabeth to help her escape the match.',
        'Charlotte means that she does not like reading novels, so she has no patience with Elizabeth’s silly ideas.',
      ],
    },
    {
      text: 'In vain have I struggled. It will not do. My feelings will not be repressed. You must allow me to tell you how ardently I admire and love you.',
      who: 'Mr Darcy', where: 'Chapter 34', lead: 'Darcy’s first proposal, at Hunsford:', theme: 'Love',
      reading: 'Darcy’s love is real, but he presents it as a battle he lost against his better judgement, which insults Elizabeth.',
      misreadings: [
        'Darcy has struggled to find the courage to speak, so his proposal is humble, gentle and well received.',
        'Darcy is proposing on behalf of his friend Bingley, who is too shy to speak to Jane Bennet himself.',
        'Darcy is apologising for his rudeness at the ball, and he asks only that Elizabeth accept his friendship.',
      ],
    },
    {
      text: 'you were the last man in the world whom I could ever be prevailed on to marry.',
      who: 'Elizabeth Bennet', where: 'Chapter 34', lead: 'Elizabeth refuses Darcy’s first proposal:', theme: 'Prejudice and first impressions',
      reading: 'Elizabeth’s refusal rests on her first impressions and Wickham’s lies, so her certainty shows how prejudiced she has become.',
      misreadings: [
        'Elizabeth is playing hard to get, and she expects Darcy to propose again the next day with a better offer.',
        'Elizabeth means that she has decided never to marry anyone, since she wants to stay at home with her father.',
        'Elizabeth is refusing because Darcy is not rich enough, since she has heard that he has lost his fortune.',
      ],
    },
    {
      text: 'Till this moment, I never knew myself.',
      who: 'Elizabeth Bennet', where: 'Chapter 36', lead: 'Elizabeth has read Darcy’s letter about Wickham:', theme: 'Self-knowledge',
      reading: 'Elizabeth sees that her own pride and prejudice blinded her, so this is the turning point of her character.',
      misreadings: [
        'Elizabeth realises that she has been in love with Wickham all along, and decides to tell him so at once.',
        'Elizabeth is angry with Darcy for writing such a rude letter, and she is more certain than ever that she was right.',
        'Elizabeth is confused because she cannot read Darcy’s handwriting, so she asks Jane to explain the letter.',
      ],
    },
    {
      text: 'He is a gentleman; I am a gentleman’s daughter; so far we are equal.',
      who: 'Elizabeth Bennet', where: 'Chapter 56', lead: 'Lady Catherine says Elizabeth would be quitting her proper sphere:', theme: 'Social class',
      reading: 'Elizabeth refuses to accept that rank makes her unworthy, so she stands up to Lady Catherine as Darcy’s equal.',
      misreadings: [
        'Elizabeth agrees that she is below Darcy in rank, and promises Lady Catherine that she will never marry him.',
        'Elizabeth boasts that her father is richer than Darcy, so she is the one who would be marrying beneath her.',
        'Elizabeth means that she and Darcy are cousins, so Lady Catherine has no reason to object to the match.',
      ],
    },
    {
      text: 'Are the shades of Pemberley to be thus polluted?',
      who: 'Lady Catherine de Bourgh', where: 'Chapter 56', lead: 'Lady Catherine objects to the idea of Elizabeth marrying Darcy:', theme: 'Social class',
      reading: 'Lady Catherine thinks a family with poorer connections would stain Darcy’s great estate, so her snobbery is exposed.',
      misreadings: [
        'Lady Catherine is worried about the pollution from new factories, which is spoiling the woods around Pemberley.',
        'Lady Catherine is praising Elizabeth’s good taste, and she hopes that Elizabeth will improve the gardens.',
        'Lady Catherine is afraid of ghosts at Pemberley, and she warns Elizabeth that the house is haunted.',
      ],
    },
    {
      text: 'I have been a selfish being all my life, in practice, though not in principle.',
      who: 'Mr Darcy', where: 'Chapter 58', lead: 'Darcy, engaged to Elizabeth at last, looks back:', theme: 'Self-knowledge',
      reading: 'Darcy admits his pride made him selfish, so he has changed too, and both of them have grown by the end.',
      misreadings: [
        'Darcy boasts that he has always been generous, so he means that Elizabeth was wrong to think him proud.',
        'Darcy is complaining that his family spoiled him, so he blames his parents for everything he did wrong.',
        'Darcy means that he plans to stay selfish after the wedding, and he is warning Elizabeth what to expect.',
      ],
    },
  ],
  context: [
    {
      ask: 'Why does Mrs Bennet worry so much about her daughters marrying?',
      right: 'The house is entailed to Mr Collins, so when Mr Bennet dies the women could be left with almost nothing',
      wrong: ['Mr Bennet has lost all his money gambling, so the family must sell their house by the end of the year', 'The law said that unmarried women over twenty-five had to leave their parents’ home and find work', 'The Bennets have promised the girls to rich families, and the weddings must happen before Christmas'],
      sol: 'Longbourn can only pass to a male heir, so it will go to Mr Collins. Daughters of the gentry could not easily earn a living, so a good marriage was their security.',
    },
    {
      ask: 'What is Austen’s narrator often doing when she says something that sounds approving?',
      right: 'Using irony: the narrator says one thing but means the reader to see the opposite',
      wrong: ['Stating her honest opinion, since Austen never jokes or hides her views from the reader', 'Repeating gossip she heard in Bath, which she includes to fill out the novel’s chapters', 'Copying the words of the characters exactly, since the narrator has no voice of her own'],
      sol: 'Austen’s narrator is famous for irony, as in the first sentence. Readers must notice the gap between what is said and what is meant.',
    },
    {
      ask: 'What was the novel’s first title, and what does it suggest about its theme?',
      right: '*First Impressions*, showing that the story is about judging people too quickly and learning better',
      wrong: ['*Five Sisters*, showing that each of the Bennet girls is meant to be the heroine in turn', '*Pemberley*, showing that the story is mainly about the history of Darcy’s great house', '*The Ball*, showing that most of the novel takes place at a single dance in Meryton'],
      sol: 'Austen first called the novel *First Impressions*. Both Elizabeth and Darcy judge each other on first sight and must learn to see more clearly.',
    },
    {
      ask: 'Why is Lydia’s elopement with Wickham such a disaster for the whole Bennet family?',
      right: 'A sister’s disgrace would ruin the reputation of all the Bennet girls and their chances of marrying well',
      wrong: ['Lydia had taken all the family’s money with her, so the Bennets could no longer pay their servants', 'Wickham was a criminal wanted by the army, so the whole family could be arrested for helping him', 'Lydia was already engaged to Mr Collins, so the Bennets would lose their claim to Longbourn'],
      sol: 'Living with a man unmarried would shame Lydia and, by connection, her sisters. Darcy’s secret payment saves the family’s respectability.',
    },
    {
      ask: 'What does Elizabeth’s visit to **Pemberley** show her?',
      right: 'Darcy’s tasteful house and his servants’ praise show a better man than the proud one she first met',
      wrong: ['Darcy’s house is cold and badly kept, which proves that she was right to refuse him at Hunsford', 'Darcy’s fortune is smaller than she thought, so she feels sorry that she misjudged his wealth', 'Darcy’s sister is unkind to the servants, so Elizabeth decides that the whole family is proud'],
      sol: 'The housekeeper calls Darcy the best master, and the house is elegant, not showy. Elizabeth begins to see what she had missed.',
    },
    {
      ask: 'How does Austen use **Mr Collins** in the novel?',
      right: 'As a comic figure whose pompous speeches and grovelling to Lady Catherine are gently mocked',
      wrong: ['As a romantic hero, whose love for Elizabeth is meant to be the most moving part of the novel', 'As a dangerous villain, who tries to steal the Bennets’ house before Mr Bennet has died', 'As the narrator, who tells the story of the Bennets as he heard it from his patroness'],
      sol: 'Mr Collins is ridiculous: he proposes in a prepared speech and flatters Lady Catherine. Through him Austen mocks snobbery and marriage without love.',
    },
  ],
};
