/** Jane Eyre, Charlotte Brontë (1847). Quotations from Project Gutenberg eBook #1260. */
import type { LitText } from '../literature.ts';

export const JANE_EYRE: LitText = {
  title: 'Jane Eyre',
  author: 'Charlotte Brontë',
  date: '1847',
  source: 'Charlotte Brontë, Jane Eyre: An Autobiography, 1847. Quoted from Project Gutenberg eBook #1260.',
  part: 'Chapter',
  characters: [
    { name: 'Jane', is: 'the novel’s narrator, an orphan who grows from a rebellious child into an independent governess' },
    { name: 'Mr Rochester', is: 'the moody, wealthy master of Thornfield Hall, who falls in love with his children’s governess' },
    { name: 'Mrs Reed', is: 'Jane’s aunt by marriage, who brings her up unkindly and sends her away to school' },
    { name: 'John Reed', is: 'Jane’s spoilt, bullying cousin, who throws a book at her and then blames her for fighting back' },
    { name: 'Helen Burns', is: 'Jane’s patient, deeply religious friend at Lowood School, who dies of consumption' },
    { name: 'Mr Brocklehurst', is: 'the harsh, hypocritical clergyman who runs Lowood School and calls Jane a liar in front of everyone' },
    { name: 'Bertha Mason', is: 'Rochester’s first wife, who is kept locked in the attic at Thornfield' },
    { name: 'St John Rivers', is: 'a cold, ambitious clergyman, Jane’s cousin, who asks her to marry him and become a missionary' },
    { name: 'Miss Temple', is: 'the kind superintendent of Lowood School, who clears Jane’s name and becomes like a mother to her' },
  ],
  events: [
    { where: 'Chapter 2', what: 'Jane is locked in the red-room as a punishment and faints in terror.' },
    { where: 'Chapter 4', what: 'Mr Brocklehurst visits Gateshead to arrange for Jane to go to Lowood School.' },
    { where: 'Chapter 7', what: 'Mr Brocklehurst makes Jane stand on a stool and calls her a liar in front of the school.' },
    { where: 'Chapter 9', what: 'Helen Burns dies in Jane’s arms during the typhus epidemic at Lowood.' },
    { where: 'Chapter 12', what: 'Jane meets Mr Rochester when his horse slips on the ice and he falls.' },
    { where: 'Chapter 15', what: 'Jane saves Mr Rochester when his bed is set on fire in the night.' },
    { where: 'Chapter 23', what: 'Rochester proposes to Jane in the orchard on midsummer eve, and she accepts.' },
    { where: 'Chapter 26', what: 'The wedding is stopped when it is revealed that Rochester is already married.' },
    { where: 'Chapter 27', what: 'Jane leaves Thornfield secretly at dawn, with almost nothing.' },
    { where: 'Chapter 34', what: 'St John asks Jane to marry him and go with him to India as a missionary.' },
    { where: 'Chapter 35', what: 'Jane hears Rochester’s voice calling her name across the miles.' },
    { where: 'Chapter 36', what: 'Jane learns that Thornfield has burned down and that Rochester has been blinded.' },
    { where: 'Chapter 38', what: 'Jane marries Rochester, who later regains some of his sight.' },
  ],
  themes: ['Freedom and equality', 'Social class', 'Love and passion', 'Religion', 'Gender', 'Injustice and cruelty'],
  quotations: [
    {
      text: 'You are like a murderer—you are like a slave-driver—you are like the Roman emperors!',
      who: 'Jane', where: 'Chapter 1', lead: 'John Reed has thrown a book at Jane and cut her head. She calls him “Wicked and cruel”:', theme: 'Injustice and cruelty',
      reading: 'Even as a child, Jane names cruelty and injustice out loud, so her outburst shows the fierce spirit she will keep.',
      misreadings: [
        'Jane is repeating a lesson from her history book, so she is showing off her reading to impress her cousins.',
        'Jane is joking with her cousin as they play a game, so the names she calls him are not meant seriously.',
        'Jane admits that she is a wicked child who deserves punishment, and she begs John Reed to forgive her.',
      ],
    },
    {
      text: 'You have no business to take our books; you are a dependent, mama says; you have no money',
      who: 'John Reed', where: 'Chapter 1', lead: 'John Reed finds Jane reading behind a curtain:', theme: 'Social class',
      reading: 'John reminds Jane that, without money, she has no place in the family, so her poverty is used to keep her down.',
      misreadings: [
        'John is worried that Jane will damage the books, since she is too young to handle them carefully by herself.',
        'John is kindly reminding Jane to ask before borrowing, since the books belong to his mother’s library.',
        'John explains that Jane will inherit a fortune, so she should buy her own books instead of borrowing his.',
      ],
    },
    {
      text: 'Life appears to me too short to be spent in nursing animosity or registering wrongs.',
      who: 'Helen Burns', where: 'Chapter 6', lead: 'Jane tells Helen how badly Mrs Reed treated her:', theme: 'Religion',
      reading: 'Helen’s faith teaches her to forgive and endure, which challenges Jane’s angry wish to fight back.',
      misreadings: [
        'Helen knows that she is dying, so she wants to spend her last weeks taking revenge on her enemies.',
        'Helen agrees that Mrs Reed was cruel, and she advises Jane to write down every wrong she has suffered.',
        'Helen thinks that Jane is lying about Mrs Reed, and she tells her to stop complaining about her family.',
      ],
    },
    {
      text: 'Women are supposed to be very calm generally: but women feel just as men feel',
      who: 'Jane', where: 'Chapter 12', lead: 'Jane paces the corridor at Thornfield, longing for a wider life:', theme: 'Gender',
      reading: 'Jane argues that women need action and purpose as much as men, so she challenges the narrow lives women were given.',
      misreadings: [
        'Jane agrees that women should be calm, and she is ashamed of her restlessness as a fault she must correct.',
        'Jane complains that the men at Thornfield are too emotional, and wishes they would behave more calmly.',
        'Jane is describing the weather on the roof of Thornfield, which is calm in the morning and wild at night.',
      ],
    },
    {
      text: 'it is as if I had a string somewhere under my left ribs, tightly and inextricably knotted to a similar string situated in the corresponding quarter of your little frame.',
      who: 'Mr Rochester', where: 'Chapter 23', lead: 'Rochester tells Jane how he feels when she is near:', theme: 'Love and passion',
      reading: 'Rochester feels joined to Jane heart to heart, so the image suggests a deep and almost physical bond between them.',
      misreadings: [
        'Rochester has injured his ribs in the fall from his horse, and he is asking Jane to help him with a bandage.',
        'Rochester is complaining that Jane follows him everywhere like a puppet, and he wants her to leave him alone.',
        'Rochester is describing a sewing lesson he once saw, and he wants Jane to teach his ward Adèle to sew.',
      ],
    },
    {
      text: 'Do you think, because I am poor, obscure, plain, and little, I am soulless and heartless?',
      who: 'Jane', where: 'Chapter 23', lead: 'Jane believes Rochester is about to marry Blanche Ingram:', theme: 'Freedom and equality',
      reading: 'Jane insists that her worth does not depend on money, rank or beauty, so she claims equality with Rochester.',
      misreadings: [
        'Jane admits that she is too poor and plain for Rochester, and she asks him to find her a new place quickly.',
        'Jane accuses Rochester of being heartless towards Blanche, whom she thinks he has treated very badly.',
        'Jane is asking Rochester to raise her wages, since she cannot afford to dress as well as his guests.',
      ],
    },
    {
      text: 'I am no bird; and no net ensnares me; I am a free human being with an independent will',
      who: 'Jane', where: 'Chapter 23', lead: 'Rochester tells Jane to be still, like a wild frantic bird:', theme: 'Freedom and equality',
      reading: 'Jane rejects the image of a trapped bird and asserts her own free will, so she refuses to be possessed by anyone.',
      misreadings: [
        'Jane is upset that Rochester compared her to a bird, because she thinks birds are ugly and foolish creatures.',
        'Jane is telling Rochester that she wants to travel abroad, since she is tired of being shut up at Thornfield.',
        'Jane means that she has escaped from Lowood School, and she warns Rochester not to send her back there.',
      ],
    },
    {
      text: 'Bertha Mason is mad; and she came of a mad family',
      who: 'Mr Rochester', where: 'Chapter 26', lead: 'Rochester explains why the wedding cannot go ahead:', theme: 'Gender',
      reading: 'Rochester blames his wife and her family, so Bertha is locked away and given no voice to tell her own side.',
      misreadings: [
        'Rochester is joking to calm the guests, and he means that Bertha is only angry that she was not invited.',
        'Rochester is defending Bertha, and he asks the guests to show kindness to a woman who is unwell.',
        'Rochester is talking about his sister, and he explains that she has come to stop the wedding out of jealousy.',
      ],
    },
    {
      text: 'I care for myself. The more solitary, the more friendless, the more unsustained I am, the more I will respect myself.',
      who: 'Jane', where: 'Chapter 27', lead: 'Jane decides to leave Rochester, though no one would know if she stayed:', theme: 'Freedom and equality',
      reading: 'Jane chooses her self-respect over love and comfort, so being alone becomes a test of her strength and principles.',
      misreadings: [
        'Jane decides that she does not need friends at all, and she plans to live alone for the rest of her life.',
        'Jane complains that nobody cares for her, and she is hoping that Rochester will follow her and beg her to stay.',
        'Jane decides to look after her health, since she has been ill and needs rest away from Thornfield.',
      ],
    },
    {
      text: 'you are formed for labour, not for love.',
      who: 'St John Rivers', where: 'Chapter 34', lead: 'St John asks Jane to marry him and go to India:', theme: 'Religion',
      reading: 'St John wants Jane as a useful partner in his mission, not as a wife he loves, so his faith is cold and controlling.',
      misreadings: [
        'St John is shy about his feelings, and he hides his passionate love for Jane behind talk of hard work.',
        'St John is warning Jane that India is dangerous, and he wants her to stay safely at home in England.',
        'St John is offering Jane a well-paid job as a teacher, since he knows how much she needs the money.',
      ],
    },
    {
      text: 'Reader, I married him.',
      who: 'Jane', where: 'Chapter 38', lead: 'The opening of the final chapter:', theme: 'Freedom and equality',
      reading: 'Jane is the one who acts: she marries him, rather than being married, so she ends the novel in control of her life.',
      misreadings: [
        'Jane is apologising to the reader for marrying Rochester, since she knows that the reader disapproves of him.',
        'Jane means that she married St John after all, since Rochester has died in the fire at Thornfield Hall.',
        'Jane tells the reader that the wedding was forced on her by her family, against her own wishes.',
      ],
    },
    {
      text: 'it snatched and growled like some strange wild animal',
      who: 'Jane', where: 'Chapter 26', lead: 'Jane sees Bertha for the first time:', theme: 'Gender',
      reading: 'Bertha is described as an animal, not a woman, so the novel shows how a wife could be shut away and dehumanised.',
      misreadings: [
        'Jane has seen a dog that Rochester keeps in the attic, and she is afraid that it will escape into the house.',
        'Jane is describing Grace Poole, the servant, who is angry at being disturbed during her dinner.',
        'Jane is describing a painting of an animal in the attic, which Rochester brought back from the West Indies.',
      ],
    },
  ],
  context: [
    {
      ask: 'What was the position of a **governess** like Jane in Victorian England?',
      right: 'Awkward: she was educated like a lady but paid like a servant, so she belonged neither upstairs nor below',
      wrong: ['Powerful: she ran the whole household and gave orders to the master as well as the servants', 'Well paid: she earned more than a doctor, so many wealthy women chose the work for its income', 'Simple: she was treated exactly like the other servants, and ate with them in the kitchen'],
      sol: 'Governesses were often educated women with no money. They taught the family’s children but were not family, which left them isolated.',
    },
    {
      ask: 'Why did Charlotte Brontë first publish *Jane Eyre* under the name **Currer Bell**?',
      right: 'Women writers were often judged harshly, so a name that could be a man’s helped the book be taken seriously',
      wrong: ['She had already published a novel under her own name that failed, and her publisher wanted a fresh start', 'Currer Bell was her married name, which she used for all her writing after her wedding', 'She wrote the novel with her brother, and Currer Bell was the name the two of them shared'],
      sol: 'Charlotte, Emily and Anne Brontë wrote as Currer, Ellis and Acton Bell. Charlotte later said they knew women authors were “looked on with prejudice”.',
    },
    {
      ask: 'What is **Lowood School** based on?',
      right: 'The Clergy Daughters’ School that Charlotte Brontë attended, where two of her sisters fell fatally ill',
      wrong: ['A famous London boarding school for boys, which was known for its excellent teachers and food', 'An imaginary school that Brontë invented, since she was taught at home and never went to school', 'A school in Brussels where Brontë worked as a teacher, which she hated for its strict rules'],
      sol: 'At Cowan Bridge, Charlotte’s elder sisters Maria and Elizabeth became ill and later died. Helen Burns is partly based on Maria.',
    },
    {
      ask: 'What is the effect of Jane being the **first-person narrator**, looking back as an adult?',
      right: 'We share her feelings closely, while the older Jane can also judge what her younger self did and felt',
      wrong: ['We never learn what Jane thinks, since she only reports the words and actions of other characters', 'We cannot trust anything she says, since she admits at the end that the whole story is invented', 'We see events from every character’s point of view, since Jane can read the minds of the others'],
      sol: 'The adult Jane narrates her own life, often speaking to the reader directly. This makes the novel feel like an intimate autobiography.',
    },
    {
      ask: 'How does the novel’s **structure** follow Jane’s life?',
      right: 'Each place, from Gateshead to Lowood, Thornfield, Moor House and Ferndean, marks a stage in her growth',
      wrong: ['The story is told backwards, starting with Jane’s marriage and ending with her childhood at Gateshead', 'Every chapter takes place at Thornfield, so the reader watches Jane in one house for the whole novel', 'The chapters jump between Jane and Rochester, who take turns to narrate the events of the story'],
      sol: 'Jane moves through five homes. At each she faces a new test: cruelty, faith and suffering, love and temptation, duty, and finally a marriage of equals.',
    },
    {
      ask: 'Why might a modern reader see **Bertha Mason** differently from many readers in 1847?',
      right: 'She is locked away with no voice, so readers now ask how race, marriage law and mental illness shaped her fate',
      wrong: ['She turns out to be the narrator’s mother, a twist that most readers in 1847 found impossible to believe', 'She is shown as the heroine of the novel, though most readers in 1847 did not notice her importance', 'She was cut from the first edition, so readers in 1847 never knew that Rochester was married at all'],
      sol: 'Bertha, a Creole woman from Jamaica, is confined by her husband and described as an animal. Later writers, such as Jean Rhys in *Wide Sargasso Sea*, gave her a voice.',
    },
  ],
};
