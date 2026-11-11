/** The Merchant of Venice, William Shakespeare (first performed about 1597). Quotations from Project Gutenberg eBook #1515. */
import type { LitText } from '../literature.ts';

export const MERCHANT: LitText = {
  title: 'The Merchant of Venice',
  author: 'William Shakespeare',
  date: 'first performed about 1597',
  part: 'Act',
  characters: [
    { name: 'Shylock', is: 'a Jewish moneylender in Venice, scorned by the Christians, who lends money on the bond of a pound of flesh' },
    { name: 'Antonio', is: 'the melancholy merchant of the title, who borrows from Shylock to help his friend and openly despises him' },
    { name: 'Bassanio', is: 'Antonio’s young friend, who borrows money to travel to Belmont and win Portia' },
    { name: 'Portia', is: 'a rich, clever heiress of Belmont who must marry whoever chooses the right casket, and who later disguises herself as a lawyer' },
    { name: 'Jessica', is: 'Shylock’s daughter, who runs away with a Christian and takes her father’s money and jewels' },
    { name: 'Gratiano', is: 'Bassanio’s loud, talkative friend, who jeers at Shylock in the courtroom' },
    { name: 'Nerissa', is: 'Portia’s waiting-woman, who disguises herself as the lawyer’s clerk' },
    { name: 'Lorenzo', is: 'a young Christian man who elopes with Jessica' },
    { name: 'the Prince of Morocco', is: 'one of Portia’s suitors, who chooses the gold casket and loses' },
  ],
  events: [
    { where: 'Act 1, Scene 1', what: 'Bassanio asks Antonio for money so that he can woo Portia.' },
    { where: 'Act 1, Scene 2', what: 'Portia complains to Nerissa about her suitors and her father’s casket test.' },
    { where: 'Act 1, Scene 3', what: 'Shylock agrees to lend Antonio three thousand ducats on the bond of a pound of flesh.' },
    { where: 'Act 2, Scene 6', what: 'Jessica escapes from her father’s house disguised as a boy and elopes with Lorenzo.' },
    { where: 'Act 2, Scene 7', what: 'The Prince of Morocco chooses the gold casket and finds a skull inside.' },
    { where: 'Act 3, Scene 1', what: 'Shylock asks whether a Jew does not bleed like anyone else, and vows revenge on Antonio.' },
    { where: 'Act 3, Scene 2', what: 'Bassanio chooses the lead casket and wins Portia, and then learns that Antonio’s ships are lost.' },
    { where: 'Act 4, Scene 1', what: 'In court, Portia, disguised as a lawyer, shows that the bond allows no blood, and Shylock is forced to convert.' },
    { where: 'Act 5, Scene 1', what: 'At Belmont, Portia and Nerissa tease their husbands about the rings, and the lovers are reunited.' },
  ],
  themes: ['Prejudice and religion', 'Mercy and justice', 'Money and greed', 'Appearance and reality', 'Love and friendship', 'Revenge'],
  quotations: [
    {
      text: 'In sooth I know not why I am so sad,',
      who: 'Antonio', where: 'Act 1, Scene 1', lead: 'The first line of the play:', theme: 'Love and friendship',
      reading: 'Antonio’s unexplained sadness hints at his deep attachment to Bassanio, whom he is about to lose to marriage.',
      misreadings: [
        'Antonio is sad because he has just heard that all his ships have sunk, and he expects to be ruined.',
        'Antonio is pretending to be sad so that his friends will lend him money for a voyage of his own.',
        'Antonio is sad because Shylock has refused him a loan, and he does not know where else to borrow.',
      ],
    },
    {
      text: 'How like a fawning publican he looks!\nI hate him for he is a Christian,',
      who: 'Shylock', where: 'Act 1, Scene 3', lead: 'Antonio enters, and Shylock speaks aside:', theme: 'Prejudice and religion',
      reading: 'Shylock’s hatred is open from his first aside, but the play soon shows that it answers the Christians’ scorn for him.',
      misreadings: [
        'Shylock is praising Antonio’s humble manner, and he looks forward to doing honest business with him.',
        'Shylock is speaking to Bassanio, and warns him that Antonio is a tax collector who will cheat him.',
        'Shylock is joking with his friend Tubal, and he means none of what he says about the merchant Antonio.',
      ],
    },
    {
      text: 'The devil can cite Scripture for his purpose.',
      who: 'Antonio', where: 'Act 1, Scene 3', lead: 'Shylock uses a story from the Bible to defend lending at interest:', theme: 'Prejudice and religion',
      reading: 'Antonio dismisses Shylock as a devil twisting holy words, so his own contempt for Shylock is shown openly.',
      misreadings: [
        'Antonio admires Shylock’s knowledge of the Bible, and he asks him to explain the story again more slowly.',
        'Antonio is warning Bassanio about a priest in Venice who has been preaching against merchants.',
        'Antonio means that he himself has misused the Bible, and he apologises to Shylock for his past behaviour.',
      ],
    },
    {
      text: 'You call me misbeliever, cut-throat dog,\nAnd spet upon my Jewish gaberdine,',
      who: 'Shylock', where: 'Act 1, Scene 3', lead: 'Antonio asks Shylock for a loan:', theme: 'Prejudice and religion',
      reading: 'Shylock reminds Antonio of the public abuse he has suffered, so the audience sees why he resents him.',
      misreadings: [
        'Shylock is describing a quarrel with a customer who refused to pay, and asks Antonio to take his side.',
        'Shylock is complaining about the Venetian weather, which has spoiled his coat on the way to the Rialto.',
        'Shylock is listing the names that he has called Antonio, and he is apologising for each of them in turn.',
      ],
    },
    {
      text: 'All that glisters is not gold,',
      who: 'the Prince of Morocco', where: 'Act 2, Scene 7', lead: 'Morocco opens the gold casket and reads the scroll inside:', theme: 'Appearance and reality',
      reading: 'The scroll warns that outward show can hide something worthless, so Morocco is punished for judging by appearance.',
      misreadings: [
        'The scroll praises Morocco for his wise choice, and promises him that he will marry Portia that very day.',
        'The scroll means that the gold casket is made of brass, so Portia’s father had been cheated by a goldsmith.',
        'The scroll tells Morocco that Portia is not as rich as he thinks, since her father left most of his money to charity.',
      ],
    },
    {
      text: 'If you prick us, do we not bleed? If you tickle us, do we not laugh? If you poison us, do we not die? And if you wrong us, shall we not revenge?',
      who: 'Shylock', where: 'Act 3, Scene 1', lead: 'Salarino asks what use Antonio’s flesh will be to Shylock:', theme: 'Revenge',
      reading: 'Shylock claims the same humanity as Christians, then argues that revenge is what they have taught him.',
      misreadings: [
        'Shylock is describing a medical experiment, and he asks the Christians to take part in it with him.',
        'Shylock is admitting that Jews are weaker than Christians, and he begs Salarino to show him some pity.',
        'Shylock is joking with Salarino about a game they played as boys, and he means no harm by any of it.',
      ],
    },
    {
      text: 'The villainy you teach me I will execute, and it shall go hard but I will better the instruction.',
      who: 'Shylock', where: 'Act 3, Scene 1', lead: 'Shylock ends his speech to Salarino and Solanio:', theme: 'Revenge',
      reading: 'Shylock says the Christians taught him cruelty and he will outdo them, so his revenge mirrors how he was treated.',
      misreadings: [
        'Shylock is offering to teach Salarino and Solanio his trade, so that they can become moneylenders too.',
        'Shylock is promising to give up revenge, since he has learned from the Christians how to forgive.',
        'Shylock is talking about his daughter’s school, and he complains that her teachers have taught her badly.',
      ],
    },
    {
      text: 'The quality of mercy is not strain’d,\nIt droppeth as the gentle rain from heaven\nUpon the place beneath.',
      who: 'Portia', where: 'Act 4, Scene 1', lead: 'Disguised as a lawyer, Portia asks Shylock to be merciful:', theme: 'Mercy and justice',
      reading: 'Portia says mercy must be given freely, like rain from heaven, so it is higher than the strict justice of the bond.',
      misreadings: [
        'Portia is describing the weather in Belmont, where it has rained every day since Bassanio left her.',
        'Portia means that mercy must be forced on Shylock by the law, so the Duke should order him to show it.',
        'Portia argues that mercy is weak and foolish, so the court must give Shylock exactly what the bond says.',
      ],
    },
    {
      text: 'Tarry a little, there is something else.\nThis bond doth give thee here no jot of blood.',
      who: 'Portia', where: 'Act 4, Scene 1', lead: 'Shylock prepares to cut Antonio’s flesh:', theme: 'Mercy and justice',
      reading: 'Portia beats Shylock with the exact wording of his own bond, so the strict law he demanded is turned against him.',
      misreadings: [
        'Portia asks Shylock to wait while she sends for a doctor, so that Antonio will not bleed to death.',
        'Portia reminds the court that the bond has expired, since three months have passed since it was signed.',
        'Portia asks for a break in the trial, since she needs time to read the rest of the bond before deciding.',
      ],
    },
    {
      text: 'you take my life\nWhen you do take the means whereby I live.',
      who: 'Shylock', where: 'Act 4, Scene 1', lead: 'The court takes half of Shylock’s wealth:', theme: 'Money and greed',
      reading: 'Shylock says that taking his living is the same as killing him, so the Christians’ “mercy” leaves him with nothing.',
      misreadings: [
        'Shylock thanks the court for its mercy, and promises to live more simply now that he has less money.',
        'Shylock threatens to kill himself if the court takes his house, so the Duke changes his mind out of pity.',
        'Shylock means that he will leave Venice and start a new business, since he has plenty of money elsewhere.',
      ],
    },
    {
      text: 'How far that little candle throws his beams!\nSo shines a good deed in a naughty world.',
      who: 'Portia', where: 'Act 5, Scene 1', lead: 'Portia returns to Belmont at night and sees a light in her hall:', theme: 'Mercy and justice',
      reading: 'Portia compares one good act to a candle in the dark, so after the harsh trial the play turns towards light and harmony.',
      misreadings: [
        'Portia is angry that her servants have wasted a candle, since she told them to save money while she was away.',
        'Portia is frightened by the light, since she thinks that thieves have broken into her house at Belmont.',
        'Portia means that the world is too wicked for good deeds to matter, so she will stop trying to help others.',
      ],
    },
  ],
  context: [
    {
      ask: 'What was the position of Jewish people in England when Shakespeare wrote the play?',
      right: 'They had been expelled from England in 1290, so few in the audience had met a Jewish person',
      wrong: ['They made up most of London’s merchants, so Shylock was based on the playwright’s neighbours', 'They had just been given full rights as citizens, which the play was written to celebrate', 'They ran the theatres where Shakespeare worked, so the play was written to please its owners'],
      sol: 'Jewish people were expelled from England in 1290 and not readmitted until the 1650s. Many in Shakespeare’s audience knew Jews only through prejudiced stereotypes.',
    },
    {
      ask: 'Why was Shylock a **moneylender**, a job the Christians in the play despise?',
      right: 'Christians thought lending at interest was a sin, and Jews were barred from many other trades',
      wrong: ['The Duke of Venice had appointed him as the city’s official banker, as a reward for his loyalty', 'Shylock had inherited the business from Antonio’s father, who had been a moneylender before him', 'Moneylending was the best-paid job in Venice, so Shylock chose it over becoming a merchant'],
      sol: 'The Church condemned usury, and in many European cities Jews were barred from guilds and land. Moneylending was one of the few trades open to them.',
    },
    {
      ask: 'Why do many modern productions present Shylock more sympathetically than Elizabethan ones did?',
      right: 'After the Holocaust, audiences see clearly how the Christians’ antisemitism shapes Shylock and is cruel',
      wrong: ['A later version of the play was discovered in which Shylock is the hero and Antonio the villain', 'Modern actors are not allowed to play villains, so every character must now be made likeable', 'Shakespeare’s first draft showed Shylock as a comic hero, and modern productions use that draft'],
      sol: 'Early productions often played Shylock as a comic villain. Since the twentieth century, and especially after the Holocaust, productions have focused on the abuse he suffers.',
    },
    {
      ask: 'Why is *The Merchant of Venice* usually called a **comedy**?',
      right: 'It ends with marriages and harmony at Belmont, though Shylock’s ruin makes the comedy uncomfortable',
      wrong: ['It is full of jokes, and Shylock is a clown whose part was always played for laughs', 'It ends with Antonio’s death, and in Shakespeare’s time any play about death counted as a comedy', 'It was written to be performed at Christmas, and all Christmas plays were called comedies'],
      sol: 'The play follows the comic pattern of love and marriage, and ends happily for the Christians. Shylock’s forced conversion leaves a dark shadow over that ending.',
    },
    {
      ask: 'What does the **casket test** show about the theme of appearance and reality?',
      right: 'The gold and silver caskets look rich but hold nothing worth having, while plain lead holds Portia’s picture',
      wrong: ['The gold casket holds Portia’s picture, which shows that the most beautiful choice is always right', 'All three caskets are empty, which shows that Portia’s father did not want her to marry at all', 'The caskets hold money, and the suitor who chooses the most money wins the right to marry Portia'],
      sol: 'Morocco chooses gold for its look, and Arragon chooses silver for what he “deserves”. Bassanio sees through outward show and chooses lead.',
    },
    {
      ask: 'How does Portia’s **disguise as a lawyer** matter in the play?',
      right: 'As a woman she could not practise law, so only in disguise can she use her intelligence to save Antonio',
      wrong: ['She disguises herself to escape her father’s will, since she does not want to marry Bassanio after all', 'She is a trained lawyer already, and the disguise only hides her from her angry suitors in Venice', 'She wears the disguise as a joke, and the court knows from the start that she is really Portia'],
      sol: 'Women could not be lawyers in Shakespeare’s time. Portia’s disguise lets her outwit every man in the court, which shows her cleverness.',
    },
  ],
};
