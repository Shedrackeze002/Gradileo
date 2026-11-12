/** The Strange Case of Dr Jekyll and Mr Hyde, Robert Louis Stevenson (1886). Quotations from Project Gutenberg eBook #43. */
import type { LitText } from '../literature.ts';

export const JEKYLL: LitText = {
  title: 'The Strange Case of Dr Jekyll and Mr Hyde',
  author: 'Robert Louis Stevenson',
  date: '1886',
  source: 'Robert Louis Stevenson, The Strange Case of Dr Jekyll and Mr Hyde, 1886. Quoted from Project Gutenberg eBook #43.',
  part: 'Chapter',
  characters: [
    { name: 'Dr Jekyll', is: 'a respected, wealthy doctor and scientist who makes a drug that turns him into another man' },
    { name: 'Mr Hyde', is: 'a small, violent man who gives everyone who meets him a feeling of disgust, and who is really Jekyll’s other self' },
    { name: 'Mr Utterson', is: 'a serious, loyal lawyer who investigates Hyde to protect his friend, and through whose eyes we follow most of the story' },
    { name: 'Mr Enfield', is: 'Utterson’s cousin and walking companion, who tells the story of Hyde trampling a young girl' },
    { name: 'Dr Lanyon', is: 'a doctor and old friend of Jekyll who quarrelled with him over his “unscientific” ideas, and who dies after a terrible shock' },
    { name: 'Poole', is: 'Jekyll’s loyal butler, who fears something terrible has happened to his master and fetches Utterson' },
    { name: 'Sir Danvers Carew', is: 'an elderly, much-respected member of Parliament who is beaten to death in the street' },
    { name: 'Mr Guest', is: 'Utterson’s head clerk, an expert in handwriting, who notices that two letters were written by the same hand' },
  ],
  events: [
    { where: 'Chapter 1', what: 'Enfield tells Utterson how a man trampled over a young girl and paid her family with a cheque signed by someone respectable.' },
    { where: 'Chapter 2', what: 'Utterson rereads Jekyll’s will, which leaves everything to Edward Hyde if Jekyll disappears.' },
    { where: 'Chapter 2', what: 'Utterson waits by the door until he meets Hyde and sees his face.' },
    { where: 'Chapter 3', what: 'Jekyll tells Utterson that he can be rid of Hyde the moment he chooses.' },
    { where: 'Chapter 4', what: 'A maid at her window watches Hyde beat Sir Danvers Carew to death with a heavy cane.' },
    { where: 'Chapter 5', what: 'Mr Guest notices that Hyde’s letter is in almost the same handwriting as Jekyll’s.' },
    { where: 'Chapter 6', what: 'Lanyon falls ill after a shock and dies, leaving a letter to be opened only after Jekyll’s death or disappearance.' },
    { where: 'Chapter 7', what: 'Utterson and Enfield see Jekyll at his window, and his smile turns to a look of terror and despair.' },
    { where: 'Chapter 8', what: 'Poole and Utterson break down the door of the cabinet and find Hyde dead on the floor.' },
    { where: 'Chapter 9', what: 'Lanyon’s letter tells how he watched Hyde drink a potion and turn into Jekyll in front of him.' },
    { where: 'Chapter 10', what: 'Jekyll’s statement explains how he made the drug, and how Hyde began to take over without it.' },
  ],
  themes: ['Duality of human nature', 'Reputation and secrecy', 'Violence and evil', 'Civilisation and the primitive', 'Science and the supernatural', 'Repression', 'Friendship and loyalty'],
  quotations: [
    {
      text: 'I let my brother go to the devil in his own way.',
      who: 'Mr Utterson', where: 'Chapter 1', lead: 'Utterson says he inclines to “Cain’s heresy”, and explains:', theme: 'Friendship and loyalty',
      reading: 'Utterson does not judge his friends’ sins, so he stays loyal to them even when they go wrong, as he does with Jekyll.',
      misreadings: [
        'Utterson admits that he is jealous of his brother, as Cain was of Abel, and has stopped speaking to him for good.',
        'Utterson believes that wicked people should be punished severely, which is why he became a lawyer in the first place.',
        'Utterson is warning his friends that he will report any crime they commit, however much it may hurt them both.',
      ],
    },
    {
      text: 'It wasn’t like a man; it was like some damned Juggernaut.',
      who: 'Mr Enfield', where: 'Chapter 1', lead: 'Enfield describes Hyde trampling a young girl:', theme: 'Violence and evil',
      reading: 'Hyde crushes the child without feeling, like an unstoppable machine, so from the start he seems less than human.',
      misreadings: [
        'Hyde knocks the child over by accident because he is running so fast, and he is too frightened to stop and help.',
        'Hyde is a huge, powerful man who is too big to see the child, so Enfield excuses him as clumsy rather than cruel.',
        'Hyde is driving a carriage that runs the child down, and Enfield blames the horses more than the man himself.',
      ],
    },
    {
      text: 'Black Mail House is what I call the place with the door',
      who: 'Mr Enfield', where: 'Chapter 1', lead: 'Enfield explains why a respectable man’s cheque might pay for Hyde:', theme: 'Reputation and secrecy',
      reading: 'Enfield guesses that a respectable man is being blackmailed over a secret past, so the door hides something shameful.',
      misreadings: [
        'Enfield calls the house black because it is dirty and neglected, and he thinks the owner should be fined for it.',
        'Enfield believes that criminals use the house to plan robberies, and he wants Utterson to inform the police.',
        'Enfield is joking that the house belongs to a famous writer of letters, who sends his mail from that door.',
      ],
    },
    {
      text: 'Mr. Hyde was pale and dwarfish, he gave an impression of deformity without any nameable malformation',
      who: 'the narrator', where: 'Chapter 2', lead: 'Utterson thinks over his meeting with Hyde:', theme: 'Violence and evil',
      reading: 'Nobody can say what is wrong with Hyde’s body, so the evil inside him seems to show through in a way that cannot be named.',
      misreadings: [
        'Hyde was born with a disability that doctors had never seen before, which is why Jekyll became interested in him.',
        'Hyde is young and has been ill, so his pale skin and small size make Utterson feel sorry for him at first.',
        'Hyde is a perfectly ordinary man, and Utterson only imagines his ugliness because of what Enfield told him.',
      ],
    },
    {
      text: 'Something troglodytic, shall we say?',
      who: 'Mr Utterson', where: 'Chapter 2', lead: 'Utterson struggles to describe Hyde after meeting him:', theme: 'Civilisation and the primitive',
      reading: 'Utterson compares Hyde to a cave-dweller, so Hyde seems a throwback to a primitive, less evolved kind of human.',
      misreadings: [
        'Utterson means that Hyde lives underground in the cellars, hiding from the police who are searching the streets for him.',
        'Utterson means that Hyde is an educated man who studies ancient history, which surprises him in so rough a person.',
        'Utterson means that Hyde is unusually tall and strong, like the giants in old stories, and he is afraid of his power.',
      ],
    },
    {
      text: 'if ever I read Satan’s signature upon a face, it is on that of your new friend.',
      who: 'Mr Utterson', where: 'Chapter 2', lead: 'Utterson, alone, thinks about Jekyll’s friendship with Hyde:', theme: 'Violence and evil',
      reading: 'Utterson feels that Hyde’s face is marked by the devil, so his evil seems almost supernatural and written on his body.',
      misreadings: [
        'Utterson has found a letter that Hyde signed with a false name, and he means to show it to the police tomorrow.',
        'Utterson is joking about Jekyll’s new friend, whose handwriting is so untidy that it looks like a devil’s scrawl.',
        'Utterson believes that Jekyll himself is the devil, and that Hyde is an innocent friend who has fallen under his power.',
      ],
    },
    {
      text: 'the moment I choose, I can be rid of Mr. Hyde.',
      who: 'Dr Jekyll', where: 'Chapter 3', lead: 'Utterson asks Jekyll about his will:', theme: 'Duality of human nature',
      reading: 'Jekyll believes he controls his darker self, so his confidence is dramatic irony, since Hyde will soon control him.',
      misreadings: [
        'Jekyll is planning to have Hyde arrested for the trampling, and he is asking Utterson to help him draw up the charges.',
        'Jekyll means that Hyde is only a lodger in his house, and he can give him notice to leave whenever he wishes.',
        'Jekyll is admitting that he is tired of Hyde’s company, and he will cut him out of his will before the week is out.',
      ],
    },
    {
      text: 'with ape-like fury, he was trampling his victim under foot',
      who: 'the narrator', where: 'Chapter 4', lead: 'The maid sees Hyde attack Sir Danvers Carew:', theme: 'Civilisation and the primitive',
      reading: 'Hyde turns from a gentleman in the street into a wild animal, so the murder shows the beast under the civilised surface.',
      misreadings: [
        'Hyde is defending himself from the old man, who attacked him first with a cane, so his fury is understandable.',
        'Hyde is dressed in an ape costume as a joke, and the maid mistakes his game for a real and deadly attack.',
        'Hyde is so drunk that he does not know what he is doing, and the maid thinks he will be sorry in the morning.',
      ],
    },
    {
      text: 'I shall never recover. It is a question of weeks.',
      who: 'Dr Lanyon', where: 'Chapter 6', lead: 'Utterson visits Lanyon, who looks deathly ill:', theme: 'Science and the supernatural',
      reading: 'What Lanyon has seen is so far outside science that it destroys him, so his reason cannot survive the truth.',
      misreadings: [
        'Lanyon has caught a fever from one of his patients, and he knows from his medical training how long he has left.',
        'Lanyon has lost all his money in a failed investment, and he expects to be thrown out of his house in a few weeks.',
        'Lanyon is exaggerating to win sympathy from Utterson, and he makes a full recovery by the end of the novel.',
      ],
    },
    {
      text: 'all human beings, as we meet them, are commingled out of good and evil: and Edward Hyde, alone in the ranks of mankind, was pure evil.',
      who: 'Dr Jekyll', where: 'Chapter 10', lead: 'Jekyll describes seeing Hyde in the mirror for the first time:', theme: 'Duality of human nature',
      reading: 'Everyone is a mixture of good and evil, but the drug separated Jekyll’s evil out completely, and that is Hyde.',
      misreadings: [
        'Jekyll means that most people are entirely good, and Hyde is the one evil man he has ever met in his life.',
        'Jekyll means that Hyde is a separate person, a criminal he met in London, who frightened him into helping.',
        'Jekyll means that he is now entirely good, because the drug has sent all the evil out of him into Hyde.',
      ],
    },
    {
      text: 'I was the first that could plod in the public eye with a load of genial respectability, and in a moment, like a schoolboy, strip off these lendings and spring headlong into the sea of liberty.',
      who: 'Dr Jekyll', where: 'Chapter 10', lead: 'Jekyll describes the freedom that being Hyde gave him:', theme: 'Reputation and secrecy',
      reading: 'Respectability feels like a heavy load to Jekyll, so becoming Hyde lets him escape it without risking his good name.',
      misreadings: [
        'Jekyll enjoyed swimming in the sea as a boy, and he describes how much he misses it now that he is old and busy.',
        'Jekyll means that he was proud of his reputation, and he worked hard to keep it as heavy and solid as possible.',
        'Jekyll means that he gave up his career as a doctor in order to travel, and he regrets the choice he made.',
      ],
    },
    {
      text: 'My devil had been long caged, he came out roaring.',
      who: 'Dr Jekyll', where: 'Chapter 10', lead: 'Jekyll explains why Hyde was so violent when he killed Carew:', theme: 'Repression',
      reading: 'Because Jekyll held his desires down for so long, they burst out with greater violence, like a caged animal set free.',
      misreadings: [
        'Jekyll kept a dangerous animal in a cage in his laboratory, and it escaped on the night of the Carew murder.',
        'Jekyll means that he had been ill and in bed for a long time, and he was angry when he was finally allowed out.',
        'Jekyll means that he had been in prison for an earlier crime, and he came out wanting revenge on the judges.',
      ],
    },
    {
      text: 'that masked thing like a monkey jumped from among the chemicals',
      who: 'Poole', where: 'Chapter 8', lead: 'Poole describes the figure he saw in the cabinet:', theme: 'Civilisation and the primitive',
      reading: 'Poole sees Hyde as an animal rather than a man, so the creature in Jekyll’s rooms seems more beast than human.',
      misreadings: [
        'Poole has seen a pet monkey that Jekyll keeps for his experiments, and he is afraid that it will bite him.',
        'Poole has seen his master wearing a mask to protect his face from the fumes of the dangerous chemicals.',
        'Poole has seen a thief in a mask stealing Jekyll’s chemicals, and he wants Utterson to call the police.',
      ],
    },
    {
      text: 'Such unscientific balderdash',
      who: 'Dr Lanyon', where: 'Chapter 2', lead: 'Lanyon explains why he and Jekyll quarrelled:', theme: 'Science and the supernatural',
      reading: 'Lanyon dismisses Jekyll’s ideas as nonsense, so he stands for a narrow, rational science that cannot imagine Jekyll’s work.',
      misreadings: [
        'Lanyon is praising Jekyll’s new theories, and he is sorry that other scientists have refused to take them seriously.',
        'Lanyon is complaining about a book of fairy tales that Jekyll lent him, which he found childish and silly.',
        'Lanyon is admitting that his own experiments have failed, and he blames Jekyll for giving him poor advice.',
      ],
    },
  ],
  context: [
    {
      ask: 'Stevenson published *Jekyll and Hyde* in 1886. What did respectable Victorian gentlemen most fear losing?',
      right: 'Their reputation: a public scandal could ruin a gentleman, so many kept their private lives secret',
      wrong: ['Their right to vote, which Parliament was about to take away from professional men like doctors', 'Their country houses, which the new railways were buying up all over England to build stations', 'Their servants, who were all leaving domestic work to take better-paid jobs in the factories'],
      sol: 'Victorian society judged gentlemen by their respectability. That is why Utterson keeps quiet, Enfield refuses to gossip, and Jekyll hides his pleasures behind Hyde.',
    },
    {
      ask: 'How might Charles Darwin’s ideas about evolution (1859) have shaped the way Hyde is described?',
      right: 'Readers feared humans could slip back to a primitive state, so Hyde is ape-like, small and “troglodytic”',
      wrong: ['Darwin showed that apes were more intelligent than humans, so Hyde is cleverer than any other character', 'Darwin argued that evil was caused by illness, so Hyde is shown as a patient who needs treatment', 'Darwin proved that drugs could change a body, so Stevenson based the potion on one of his experiments'],
      sol: 'Darwin showed that humans had evolved from earlier animals. Many Victorians worried that people could “degenerate”, and Hyde’s animal descriptions play on that fear.',
    },
    {
      ask: 'Why is most of the novella seen through the eyes of **Utterson**?',
      right: 'He does not know the truth, so the reader shares his confusion and the mystery holds until the end',
      wrong: ['He is the murderer, and the final chapter reveals that he has been hiding the truth from the reader', 'He is a scientist like Jekyll, so he can explain each experiment to the reader as it happens', 'He is Hyde’s closest friend, so he can tell the reader what Hyde is thinking throughout the story'],
      sol: 'Utterson pieces the case together like a detective. Because he, and we, only learn the truth from the two letters at the end, the novella keeps its mystery.',
    },
    {
      ask: 'What is the effect of ending the novella with **Lanyon’s narrative** and **Jekyll’s statement**?',
      right: 'The truth comes in the characters’ own words after they are gone, so the reader must piece the whole case together',
      wrong: ['It lets Stevenson show that Utterson was lying all along, so none of the earlier chapters can be trusted', 'It gives the novel a happy ending, since both letters reveal that Jekyll escaped and is living abroad', 'It shows that the police solved the case, since both letters were found in their official records'],
      sol: 'The two documents are like evidence in a legal case. They answer the mystery only once both writers are dead, which makes the truth more shocking.',
    },
    {
      ask: 'What does the **setting** of foggy London add to the novella?',
      right: 'The fog hides and confuses, so the city itself seems to keep secrets, like the characters',
      wrong: ['The fog shows that it is summer, so the weather contrasts with the dark events of the story', 'The fog explains why nobody can see Hyde’s crimes, so Stevenson uses it only to make the plot work', 'The fog shows that London was a healthy, modern city, so it contrasts with Jekyll’s old laboratory'],
      sol: 'Stevenson’s London is full of fog, dark streets and closed doors. Like Jekyll’s respectable house with its secret back door, the city has a hidden side.',
    },
    {
      ask: 'Why are there almost **no women** in the novella’s main story?',
      right: 'It shows a closed world of professional men who protect each other’s secrets and reputations',
      wrong: ['Stevenson believed women should not read stories about crime, so he left them out of the book', 'Women were not allowed in London at night in the 1880s, so none could appear in the story', 'The women characters were cut by the publisher, who thought the novella was far too long'],
      sol: 'Utterson, Enfield, Lanyon, Jekyll and Guest are all bachelors and professional men. Their world values silence and discretion, which lets Jekyll’s secret grow.',
    },
  ],
};
