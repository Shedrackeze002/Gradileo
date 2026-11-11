/** Great Expectations, Charles Dickens (1861). Quotations from Project Gutenberg eBook #1400. */
import type { LitText } from '../literature.ts';

export const EXPECTATIONS: LitText = {
  title: 'Great Expectations',
  author: 'Charles Dickens',
  date: '1861',
  part: 'Chapter',
  characters: [
    { name: 'Pip', is: 'the novel’s narrator, an orphan raised by his sister who comes into a fortune and learns what it costs him' },
    { name: 'Joe Gargery', is: 'the gentle, loyal blacksmith married to Pip’s sister, who loves Pip like a son' },
    { name: 'Magwitch', is: 'the escaped convict Pip helps in the graveyard, who later turns out to be his secret benefactor' },
    { name: 'Miss Havisham', is: 'a rich woman, jilted on her wedding day, who still wears her wedding dress and has stopped every clock' },
    { name: 'Estella', is: 'Miss Havisham’s beautiful adopted daughter, raised to break men’s hearts' },
    { name: 'Mr Jaggers', is: 'a powerful London lawyer who tells Pip of his great expectations and manages his money' },
    { name: 'Herbert Pocket', is: 'Pip’s cheerful friend and roommate in London, whom Pip secretly helps into business' },
    { name: 'Biddy', is: 'a kind, clever village girl who teaches Pip and later marries Joe' },
    { name: 'Mrs Joe', is: 'Pip’s harsh older sister, who brings him up “by hand” and is later attacked and injured' },
  ],
  events: [
    { where: 'Chapter 1', what: 'An escaped convict seizes Pip in the churchyard and orders him to bring food and a file.' },
    { where: 'Chapter 8', what: 'Pip first visits Satis House, plays cards with Estella and is made ashamed of his hands and boots.' },
    { where: 'Chapter 13', what: 'Pip is apprenticed to Joe as a blacksmith, paid for by Miss Havisham.' },
    { where: 'Chapter 18', what: 'Mr Jaggers announces that Pip has great expectations and is to become a gentleman.' },
    { where: 'Chapter 27', what: 'Joe visits Pip in London, and Pip is embarrassed by his manners.' },
    { where: 'Chapter 38', what: 'Estella tells Miss Havisham, “I am what you have made me.”' },
    { where: 'Chapter 39', what: 'Magwitch returns from Australia and reveals that he is Pip’s benefactor.' },
    { where: 'Chapter 44', what: 'Estella tells Pip that she is going to marry Bentley Drummle.' },
    { where: 'Chapter 49', what: 'Miss Havisham begs Pip’s forgiveness, and her dress catches fire.' },
    { where: 'Chapter 54', what: 'Pip’s attempt to smuggle Magwitch abroad by boat fails, and Magwitch is captured.' },
    { where: 'Chapter 56', what: 'Magwitch dies in prison, with Pip holding his hand.' },
    { where: 'Chapter 57', what: 'Joe nurses Pip through a fever and quietly pays off his debts.' },
    { where: 'Chapter 59', what: 'Years later, Pip meets Estella again in the ruins of Satis House.' },
  ],
  themes: ['Social class and ambition', 'Wealth and gentility', 'Loyalty and affection', 'Guilt and crime', 'Revenge and its cost', 'Growing up and self-knowledge'],
  quotations: [
    {
      text: 'Keep still, you little devil, or I’ll cut your throat!',
      who: 'Magwitch', where: 'Chapter 1', lead: 'A man rises from among the graves:', theme: 'Guilt and crime',
      reading: 'The convict seems purely frightening at first, so the reader shares Pip’s terror before learning to see him differently.',
      misreadings: [
        'The convict is playing a game with Pip, so his threat is meant as a joke that the boy is too young to understand.',
        'The convict is Pip’s father returned from prison, and he speaks roughly because he is ashamed to be recognised.',
        'The convict is warning Pip about a real danger in the churchyard, and is trying to protect him from it.',
      ],
    },
    {
      text: 'And what coarse hands he has! And what thick boots!',
      who: 'Estella', where: 'Chapter 8', lead: 'Estella plays cards with Pip at Satis House:', theme: 'Social class and ambition',
      reading: 'Estella’s contempt makes Pip ashamed of being working class for the first time, which starts his wish to be a gentleman.',
      misreadings: [
        'Estella admires Pip’s strong hands and sturdy boots, since she knows he will make a fine blacksmith one day.',
        'Estella is worried that Pip will damage the cards, and she asks him to wash his hands before they carry on.',
        'Estella is teasing Pip in a friendly way, and he laughs, because he knows that she is fond of him really.',
      ],
    },
    {
      text: 'It was not because I was faithful, but because Joe was faithful, that I never ran away',
      who: 'Pip', where: 'Chapter 14', lead: 'The older Pip looks back on his unhappy apprenticeship:', theme: 'Loyalty and affection',
      reading: 'The older Pip gives Joe the credit for his good conduct, so the narrator’s hindsight shows Joe’s quiet goodness.',
      misreadings: [
        'Pip boasts that he was always loyal to Joe, so he never once thought of leaving the forge to seek his fortune.',
        'Pip explains that Joe watched him day and night, so he could not have run away even if he had tried.',
        'Pip complains that Joe trapped him at the forge, so he blames Joe for the years he wasted as an apprentice.',
      ],
    },
    {
      text: 'I want to be a gentleman.',
      who: 'Pip', where: 'Chapter 17', lead: 'Pip confides in Biddy as they walk by the river:', theme: 'Social class and ambition',
      reading: 'Pip’s ambition grows from shame and from Estella, not from any real wish to be better, so it is shaky from the start.',
      misreadings: [
        'Pip wants to be kinder and more polite to Biddy, so he is promising to change the way he treats his friends.',
        'Pip wants to join the army as an officer, which was the usual way for poor boys to become gentlemen.',
        'Pip is joking with Biddy, and he means that he is happy to stay a blacksmith for the rest of his life.',
      ],
    },
    {
      text: 'Pip, dear old chap, life is made of ever so many partings welded together',
      who: 'Joe Gargery', where: 'Chapter 27', lead: 'Joe leaves Pip’s rooms in London after an awkward visit:', theme: 'Loyalty and affection',
      reading: 'Joe uses the language of his own trade to accept that he and Pip now live apart, and he does it with dignity.',
      misreadings: [
        'Joe is angry with Pip for being rude, and he says that he never wants to see him or speak to him again.',
        'Joe is giving Pip advice about blacksmithing, since he hopes that Pip will return to the forge one day.',
        'Joe is telling Pip that he and Biddy are getting married, and he is sad that Pip will not be there.',
      ],
    },
    {
      text: 'If she favours you, love her. If she wounds you, love her. If she tears your heart to pieces,',
      who: 'Miss Havisham', where: 'Chapter 29', lead: 'Miss Havisham pulls Pip close and whispers about Estella:', theme: 'Revenge and its cost',
      reading: 'Miss Havisham wants Pip to suffer for love as she did, so her repeated command is a twisted kind of revenge.',
      misreadings: [
        'Miss Havisham is giving Pip kind advice about marriage, since she wants him and Estella to be happy together.',
        'Miss Havisham is warning Pip that Estella is dangerous, and she begs him to keep away from her for his own sake.',
        'Miss Havisham is reciting a love poem that she wrote as a girl, and she wants Pip to learn it by heart.',
      ],
    },
    {
      text: 'I am what you have made me.',
      who: 'Estella', where: 'Chapter 38', lead: 'Miss Havisham accuses Estella of being cold to her:', theme: 'Revenge and its cost',
      reading: 'Estella throws the blame back on the woman who raised her to be heartless, so Miss Havisham’s revenge turns on herself.',
      misreadings: [
        'Estella thanks Miss Havisham for her education, and promises to look after her in her old age with great care.',
        'Estella admits that she is cold by nature, and that nothing Miss Havisham did could have made her any warmer.',
        'Estella is telling Miss Havisham that she has made her own dress, so she does not need a new one for the ball.',
      ],
    },
    {
      text: 'Yes, Pip, dear boy, I’ve made a gentleman on you! It’s me wot has done it!',
      who: 'Magwitch', where: 'Chapter 39', lead: 'The convict returns and tells Pip where his money came from:', theme: 'Wealth and gentility',
      reading: 'Pip’s gentility was paid for by a convict, so the novel shows that being a gentleman is about money, not birth or merit.',
      misreadings: [
        'Magwitch is boasting about a stranger he helped in Australia, and he wants Pip to write the story down for him.',
        'Magwitch is admitting that he stole Pip’s money, and he has come back to beg the young man’s forgiveness.',
        'Magwitch is proud that Pip has become a blacksmith, which was the trade that he had always wanted for him.',
      ],
    },
    {
      text: 'though ever so long after my broken heart is dust pray do it!',
      who: 'Miss Havisham', where: 'Chapter 49', lead: 'Miss Havisham asks Pip to write “I forgive her” under her name:', theme: 'Revenge and its cost',
      reading: 'Miss Havisham finally sees the harm her revenge has done, so she begs for forgiveness she knows she may not deserve.',
      misreadings: [
        'Miss Havisham is asking Pip to write her will, since she wants to leave all her money to Estella after her death.',
        'Miss Havisham is ordering Pip to forget her, since she plans to leave Satis House and never return to it.',
        'Miss Havisham is asking Pip to forgive Estella, though she herself has done nothing that needs forgiving.',
      ],
    },
    {
      text: 'suffering has been stronger than all other teaching, and has taught me to understand what your heart used to be. I have been bent and broken, but—I hope—into a better shape.',
      who: 'Estella', where: 'Chapter 59', lead: 'Estella meets Pip again in the ruins of Satis House:', theme: 'Growing up and self-knowledge',
      reading: 'Estella has learned through pain to feel what Pip felt, so, like iron at the forge, she has been reshaped for the better.',
      misreadings: [
        'Estella has been injured in an accident, and she is telling Pip about the long months she spent recovering.',
        'Estella is blaming Pip for her unhappy marriage, and she wants him to understand how badly he treated her.',
        'Estella is proud that she has never been changed by anyone, and she warns Pip not to try to change her now.',
      ],
    },
    {
      text: 'I saw no shadow of another parting from her.',
      who: 'Pip', where: 'Chapter 59', lead: 'The last sentence of the novel:', theme: 'Growing up and self-knowledge',
      reading: 'The ending hopes that Pip and Estella will stay together, though the careful wording leaves room for doubt.',
      misreadings: [
        'The ending tells us plainly that Pip and Estella marry the next day and live happily for the rest of their lives.',
        'The ending tells us that Estella has died, and that Pip will never again see even her shadow in the garden.',
        'The ending tells us that Pip leaves for Egypt alone, and that he never thinks about Estella again after this.',
      ],
    },
  ],
  context: [
    {
      ask: 'What is the meaning of the novel’s title, *Great Expectations*?',
      right: 'Pip’s “expectations” are the fortune he is told he will inherit, and the hopes for his future that come with it',
      wrong: ['It names the coaching inn in London where Pip lives with Herbert when he first arrives in the city', 'It is the title of the book Pip writes about his life, which he publishes at the end of the novel', 'It means the great things that Joe expects Pip to achieve as a blacksmith in the village forge'],
      sol: 'In Victorian English, “expectations” meant an inheritance you expected to receive. The title is ironic, since Pip’s expectations bring him little happiness.',
    },
    {
      ask: 'How was *Great Expectations* first published?',
      right: 'In weekly parts in Dickens’s magazine, so chapters often end on a hook to bring readers back',
      wrong: ['As one large book that was too expensive for most readers, so only the rich could buy it', 'As a play performed in London theatres, which Dickens later turned into a novel', 'In secret, under a false name, since Dickens feared that it would damage his reputation'],
      sol: 'It appeared weekly in *All the Year Round* in 1860–61. Serial publication shaped its suspense and its cliffhangers.',
    },
    {
      ask: 'How does Dickens use **Joe** to challenge the idea of what makes a gentleman?',
      right: 'Joe has no money or polish, yet he is the most truly gentle and good man in the novel',
      wrong: ['Joe secretly inherits a title, which proves that only the well born can be true gentlemen', 'Joe becomes rich at the end, which shows that money is what makes a man a true gentleman', 'Joe is cruel to Pip, which shows that working men were rough and could never be gentle'],
      sol: 'Pip learns that goodness, loyalty and kindness, which Joe has in full, matter more than wealth and manners.',
    },
    {
      ask: 'Why is it important that Pip tells the story as an **older man** looking back?',
      right: 'The older Pip can judge his younger self’s snobbery and mistakes with regret and honesty',
      wrong: ['It means that Pip has forgotten most of what happened, so his account cannot be trusted', 'It means that Pip tells the story in the present tense, as if it were happening right now', 'It means that the story is told by Joe, who explains what Pip thought at every stage'],
      sol: 'The older narrator often criticises his younger self, for example for being ashamed of Joe. This makes the novel a story of moral growth.',
    },
    {
      ask: 'What does **Satis House**, with its stopped clocks and rotting wedding cake, suggest?',
      right: 'Miss Havisham has frozen her life at the moment of her pain, and refusing to move on has made her decay',
      wrong: ['Miss Havisham is too poor to repair her house, so its decay shows how little money she has', 'Miss Havisham is preparing for a new wedding, and the cake is ready for the guests to eat', 'Miss Havisham collects old clocks, and stops them at different times to keep them working'],
      sol: 'The clocks stopped at twenty to nine, the moment she was jilted. Her house, like her heart, has been left to rot.',
    },
    {
      ask: 'What do Victorian attitudes to **convicts** add to the shock of Magwitch being Pip’s benefactor?',
      right: 'Convicts were seen as the lowest of the low, so Pip’s gentlemanly life rests on what he thinks shameful',
      wrong: ['Convicts were admired as heroes, so Pip is proud to learn where his money came from', 'Convicts were not allowed to own money, so Pip’s fortune is taken away by the government', 'Convicts were usually rich men, so readers expected Magwitch to be the benefactor from the start'],
      sol: 'Transported convicts were treated as outcasts, and returning from transportation carried the death penalty. Pip is horrified, and must learn to see Magwitch’s love.',
    },
  ],
};
