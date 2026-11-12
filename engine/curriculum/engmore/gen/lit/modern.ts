/**
 * The modern prose and drama most often set for GCSE English Literature. All four texts are still in
 * copyright (or are in some countries), so they are never quoted: the characters, the events and the
 * key moments are told in our own words, and each lesson credits the author and the first edition.
 */
import type { LitText } from '../literature.ts';

export const INSPECTOR: LitText = {
  title: 'An Inspector Calls',
  author: 'J. B. Priestley',
  date: 'first performed in 1945',
  source: 'J. B. Priestley, An Inspector Calls, first performed in 1945. In copyright, so it is described here in our own words and not quoted.',
  part: 'Act',
  characters: [
    { name: 'Arthur Birling', is: 'a wealthy factory owner and former mayor, who believes in looking after only his own family' },
    { name: 'Sybil Birling', is: 'Arthur’s wife, a cold and snobbish woman who chairs a charity committee for women in need' },
    { name: 'Sheila Birling', is: 'the Birlings’ daughter, newly engaged, who is the first to accept her share of the blame' },
    { name: 'Eric Birling', is: 'the Birlings’ son, who drinks too much and keeps a secret from his family' },
    { name: 'Gerald Croft', is: 'Sheila’s fiancé, the son of a rival business owner, who had an affair with the young woman' },
    { name: 'Inspector Goole', is: 'the mysterious visitor who questions each member of the family about a young woman’s death' },
    { name: 'Eva Smith', is: 'the young working woman, never seen on stage, whose death the family is questioned about' },
    { name: 'Edna', is: 'the Birlings’ maid, who shows the Inspector into the dining room' },
  ],
  events: [
    { where: 'Act 1', what: 'The Birlings celebrate Sheila’s engagement to Gerald with a dinner party.' },
    { where: 'Act 1', what: 'Mr Birling tells Gerald and Eric that there will be no war and that the Titanic is unsinkable.' },
    { where: 'Act 1', what: 'The Inspector arrives and announces that a young woman has died in the infirmary.' },
    { where: 'Act 1', what: 'Mr Birling admits that he sacked Eva Smith for leading a strike for higher wages.' },
    { where: 'Act 1', what: 'Sheila admits that she had Eva sacked from a shop out of jealousy.' },
    { where: 'Act 2', what: 'Gerald admits that he kept the young woman, then calling herself Daisy Renton, as his mistress.' },
    { where: 'Act 2', what: 'Mrs Birling admits that she persuaded her charity committee to refuse the pregnant girl help.' },
    { where: 'Act 2', what: 'Mrs Birling insists that the father of the child is to blame, not realising that it is her own son.' },
    { where: 'Act 3', what: 'Eric admits that he got the young woman pregnant and stole money from his father’s office.' },
    { where: 'Act 3', what: 'The Inspector warns the family that people are responsible for each other, and leaves.' },
    { where: 'Act 3', what: 'A telephone call to the infirmary reveals that no young woman has died there that night.' },
    { where: 'Act 3', what: 'The telephone rings to say that a girl has died and that an inspector is on his way.' },
  ],
  themes: ['Social responsibility', 'Class', 'Age and youth', 'Gender', 'Guilt and blame'],
  quotations: [],
  moments: [
    {
      what: 'At the dinner, Mr Birling confidently predicts that there will be no war and calls the Titanic unsinkable.',
      where: 'Act 1',
      theme: 'Social responsibility',
      reading: 'The audience knows he is wrong, so dramatic irony shows that his views on society cannot be trusted either.',
      misreadings: [
        'His predictions show that he is a wise businessman whose advice the audience should follow closely.',
        'His speech shows that he is afraid of war and wants his son to stay safely at home in Brumley.',
        'His speech shows that he has invested in the Titanic and expects to make a fortune from it.',
      ],
    },
    {
      what: 'Sheila admits that she had Eva sacked from a shop because the girl smiled when Sheila tried on a dress.',
      where: 'Act 1',
      theme: 'Class',
      reading: 'Sheila used her wealth and status to punish a poorer girl, but her shame shows that she can change.',
      misreadings: [
        'Sheila was right to complain, because Eva was rude to customers and a poor worker in the shop.',
        'Sheila is proud of what she did, and she refuses to accept any blame for the girl’s death.',
        'Sheila only complained because the dress did not fit, so the sacking was an accident.',
      ],
    },
    {
      what: 'Mrs Birling insists that the father of the child should be punished, unaware that she is condemning her own son.',
      where: 'Act 2',
      theme: 'Guilt and blame',
      reading: 'Dramatic irony exposes her hypocrisy: she blames others for faults that belong to her own family.',
      misreadings: [
        'Mrs Birling knows that the father is Eric, and she wants him punished to teach him a lesson.',
        'Mrs Birling is right to blame the father, so the play agrees that she carries no blame herself.',
        'Mrs Birling is confused and does not understand what the Inspector is asking her about.',
      ],
    },
    {
      what: 'Before leaving, the Inspector warns that people will learn their responsibility to each other through suffering.',
      where: 'Act 3',
      theme: 'Social responsibility',
      reading: 'His speech carries Priestley’s message: we are all responsible for each other, or society will suffer.',
      misreadings: [
        'The Inspector threatens to arrest the whole family for murder unless they pay him to stay quiet.',
        'The Inspector admits that the young woman’s death was nobody’s fault and closes the case.',
        'The Inspector tells the family that only the police are responsible for looking after the poor.',
      ],
    },
    {
      what: 'When the Inspector seems to be a hoax, Mr and Mrs Birling celebrate, but Sheila and Eric stay ashamed.',
      where: 'Act 3',
      theme: 'Age and youth',
      reading: 'The young can learn and change, while the old refuse to, so Priestley places his hope in the young.',
      misreadings: [
        'The young are foolish to stay upset, and the play agrees with their parents that nothing happened.',
        'The parents have learned the most, and they promise to change the way they treat their workers.',
        'All four of them agree to forget the evening and carry on with the engagement party as planned.',
      ],
    },
  ],
  context: [
    {
      ask: 'Why did Priestley set *An Inspector Calls* in 1912 but write it in 1945?',
      right: 'So the 1945 audience could see how wrong the selfish Birlings were',
      wrong: ['Because he had written it in 1912 and waited to publish it', 'Because the play was based on a real murder case of 1945', 'Because the 1912 setting let him avoid writing about class'],
      sol: 'The audience of 1945 had lived through two world wars. Setting the play in 1912 lets Priestley use dramatic irony against Mr Birling and argue for a fairer society after the war.',
    },
    {
      ask: 'What political view did Priestley hold, which shapes the play?',
      right: 'He was a socialist who believed we share responsibility',
      wrong: ['He believed that each family should look after only itself', 'He wanted the country to return to the society of 1912', 'He thought that the police should run the whole country'],
      sol: 'Priestley was a socialist. Mr Birling speaks for selfish capitalism, and the Inspector speaks for Priestley’s belief that we are all responsible for each other.',
    },
    {
      ask: 'What is the effect of the final telephone call in *An Inspector Calls*?',
      right: 'It suggests the family must face the truth again',
      wrong: ['It proves that the Inspector was a hoax all along', 'It tells the family that Eva Smith is alive and well', 'It invites the family to another engagement party'],
      sol: 'Just as the parents relax, the cycle threatens to begin again. The twist leaves the audience with the message that the lesson must be learned.',
    },
    {
      ask: 'What does the Inspector’s name, Goole, suggest to many readers?',
      right: 'It sounds like “ghoul”, hinting he may be a ghost',
      wrong: ['It is the name of a famous detective of the time', 'It is a town in Yorkshire where the play is set', 'It was Priestley’s own middle name at birth'],
      sol: 'Goole sounds like “ghoul”. With his knowledge of the future and his mysterious arrival, the Inspector may be more than a real policeman: a kind of conscience.',
    },
  ],
};

export const BLOOD_BROTHERS: LitText = {
  title: 'Blood Brothers',
  author: 'Willy Russell',
  date: 'first performed as a musical in 1983',
  source: 'Willy Russell, Blood Brothers, first performed as a musical in 1983. In copyright, so it is described here in our own words and not quoted.',
  part: 'Act',
  characters: [
    { name: 'Mrs Johnstone', is: 'a poor, hard-working mother in Liverpool who gives away one of her newborn twins' },
    { name: 'Mrs Lyons', is: 'the wealthy woman Mrs Johnstone cleans for, who longs for a child and takes one of the twins' },
    { name: 'Mickey', is: 'the twin brought up by Mrs Johnstone, who grows up poor and loses his job and his hope' },
    { name: 'Eddie', is: 'the twin brought up by Mrs Lyons, who goes to university and becomes a councillor' },
    { name: 'Linda', is: 'a girl who grows up with both twins, marries Mickey, and later turns to Eddie' },
    { name: 'Sammy', is: 'Mickey’s older brother, who drifts into crime and leads Mickey into a robbery' },
    { name: 'the Narrator', is: 'the figure who comments on the action and warns that a terrible price must be paid' },
    { name: 'Mr Lyons', is: 'Mrs Lyons’s husband, a businessman who is often away and who later lays off workers' },
  ],
  events: [
    { where: 'Act 1', what: 'Mrs Johnstone, already struggling, learns that she is expecting twins.' },
    { where: 'Act 1', what: 'Mrs Lyons persuades Mrs Johnstone to give her one of the twins and makes her swear on the Bible.' },
    { where: 'Act 1', what: 'Mrs Lyons sacks Mrs Johnstone and warns her that twins separated at birth die if they learn the truth.' },
    { where: 'Act 1', what: 'At seven years old, Mickey and Eddie meet, discover they share a birthday, and become blood brothers.' },
    { where: 'Act 1', what: 'The Johnstones are rehoused away from the city, where Mrs Johnstone hopes for a better life.' },
    { where: 'Act 2', what: 'As teenagers, Mickey and Eddie meet again near their new homes and rebuild their friendship.' },
    { where: 'Act 2', what: 'Eddie leaves for university while Mickey works in a factory and marries Linda.' },
    { where: 'Act 2', what: 'Mickey loses his job and joins Sammy in a robbery in which a man is killed.' },
    { where: 'Act 2', what: 'Mickey is sent to prison and comes out depressed and dependent on pills.' },
    { where: 'Act 2', what: 'Mrs Lyons shows Mickey that Linda has been meeting Eddie.' },
    { where: 'Act 2', what: 'Mickey confronts Eddie with a gun, Mrs Johnstone reveals they are twins, and both brothers are shot dead.' },
  ],
  themes: ['Class', 'Fate and superstition', 'Friendship', 'Nature and nurture', 'Motherhood'],
  quotations: [],
  moments: [
    {
      what: 'Mrs Lyons makes Mrs Johnstone swear on the Bible never to tell anyone about the twins.',
      where: 'Act 1',
      theme: 'Fate and superstition',
      reading: 'The oath binds the mothers to a secret that drives the tragedy, and it plays on Mrs Johnstone’s fears.',
      misreadings: [
        'The oath shows that the two women have become close friends who trust each other completely.',
        'The oath is a legal contract that a judge later forces both women to keep in court.',
        'The oath is a joke, and neither woman takes it seriously or thinks about it again.',
      ],
    },
    {
      what: 'At seven, Mickey and Eddie cut their hands, mix their blood and promise to be brothers for ever.',
      where: 'Act 1',
      theme: 'Friendship',
      reading: 'Unaware that they are twins, the boys choose each other, so the bond is innocent and ironic.',
      misreadings: [
        'The boys know that they are twins and want to keep the secret from both of their mothers.',
        'The boys are fighting each other, and the cut hands show that they will always be enemies.',
        'The boys are playing a game they saw on television, and they forget it straight away.',
      ],
    },
    {
      what: 'Mickey and Eddie take very different paths: Eddie goes to university, while Mickey is laid off and turns to crime.',
      where: 'Act 2',
      theme: 'Nature and nurture',
      reading: 'Twins with the same nature end up with very different lives, so Russell shows that class and money shape us.',
      misreadings: [
        'Eddie is naturally cleverer than Mickey, so the play shows that some people are born to succeed.',
        'Mickey chooses crime because he is lazy, so the play blames him alone for what happens to him.',
        'The twins end up living the same kind of life, showing that upbringing makes no difference.',
      ],
    },
    {
      what: 'At the end, Mrs Johnstone tells Mickey that Eddie is his twin, and Mickey asks why he was not the one given away.',
      where: 'Act 2',
      theme: 'Class',
      reading: 'Mickey sees he could have had Eddie’s chances, so the ending shows class deciding their fates.',
      misreadings: [
        'Mickey is happy to learn the truth and forgives his mother at once for giving Eddie away.',
        'Mickey is jealous only of Eddie’s house, and the revelation has nothing to do with class.',
        'Mickey already knew the truth, so the revelation does not change how he feels at all.',
      ],
    },
  ],
  context: [
    {
      ask: 'What does the Narrator do in *Blood Brothers*?',
      right: 'He comments on the action and warns of the tragedy',
      wrong: ['He plays the twins’ father, who returns at the end', 'He is a police officer who solves the robbery', 'He sings only at the very start of the play'],
      sol: 'Like the chorus of a Greek tragedy, the Narrator reminds the audience of the deal the mothers made and that the ending is coming, building tension and a sense of fate.',
    },
    {
      ask: 'Why does Russell show the audience the twins’ deaths at the very start?',
      right: 'So the audience watches to see why, not what, happens',
      wrong: ['Because the play was far too short without it', 'To show that the twins both survive in the end', 'To surprise the audience with a happy ending'],
      sol: 'The play opens with the end, so the audience knows the twins will die. Attention turns to the causes: class, superstition and the choices of the adults.',
    },
    {
      ask: 'What was happening in Liverpool and the North of England when Russell wrote *Blood Brothers*?',
      right: 'Many factories were closing and unemployment was high',
      wrong: ['The city was enjoying a boom in new factory jobs', 'The Second World War had just begun', 'Liverpool had just become the capital city'],
      sol: 'In the early 1980s, many industries closed and unemployment rose sharply. Mickey’s loss of his job reflects what happened to many working-class people.',
    },
  ],
};

export const LORD_FLIES: LitText = {
  title: 'Lord of the Flies',
  author: 'William Golding',
  date: '1954',
  source: 'William Golding, Lord of the Flies, first published in 1954. In copyright, so it is described here in our own words and not quoted.',
  part: 'Chapter',
  characters: [
    { name: 'Ralph', is: 'the boy elected chief, who wants to keep a signal fire burning and be rescued' },
    { name: 'Piggy', is: 'the clever, asthmatic boy with glasses, who values rules and is mocked by the others' },
    { name: 'Jack', is: 'the leader of the choirboys, who becomes obsessed with hunting and power' },
    { name: 'Simon', is: 'a quiet, thoughtful boy who goes off alone and discovers the truth about the beast' },
    { name: 'Roger', is: 'a secretive boy whose cruelty grows until he kills without remorse' },
    { name: 'Samneric', is: 'the twins Sam and Eric, loyal to Ralph until they are captured by Jack’s tribe' },
    { name: 'the naval officer', is: 'the adult who arrives at the end and finds the boys at war' },
  ],
  events: [
    { where: 'Chapter 1', what: 'After a plane crash, Ralph and Piggy find a conch shell on the beach and use it to call the other boys.' },
    { where: 'Chapter 1', what: 'The boys elect Ralph as chief, and Jack’s choir become the hunters.' },
    { where: 'Chapter 2', what: 'The boys light a fire with Piggy’s glasses, and a small boy with a birthmark goes missing in the blaze.' },
    { where: 'Chapter 4', what: 'Jack takes the fire-watchers hunting, the fire goes out, and a ship passes without seeing them.' },
    { where: 'Chapter 8', what: 'Jack breaks away to form his own tribe, and the hunters put a pig’s head on a stick as a gift for the beast.' },
    { where: 'Chapter 8', what: 'Alone in the forest, Simon faces the pig’s head, which seems to tell him that the beast is inside them.' },
    { where: 'Chapter 9', what: 'Simon runs out of the forest with the truth about the beast and is killed by the boys in a frenzied dance.' },
    { where: 'Chapter 10', what: 'Jack’s tribe raids Ralph’s shelter at night and steals Piggy’s glasses.' },
    { where: 'Chapter 11', what: 'At Jack’s camp, Roger sends a boulder down on Piggy, killing him and smashing the conch.' },
    { where: 'Chapter 12', what: 'Hunted by Jack’s tribe through a burning island, Ralph reaches the beach and finds a naval officer.' },
  ],
  themes: ['Civilisation vs savagery', 'Power and leadership', 'Fear', 'Loss of innocence', 'Evil in human nature'],
  quotations: [],
  moments: [
    {
      what: 'The boys agree that whoever holds the conch may speak at their meetings.',
      where: 'Chapter 1',
      theme: 'Civilisation vs savagery',
      reading: 'The conch stands for order and democracy, so its later destruction shows civilisation collapsing.',
      misreadings: [
        'The conch is just a toy that the boys play with, and it has no meaning for the rest of the novel.',
        'The conch is a weapon that Ralph uses to frighten the other boys into obeying all of his orders.',
        'The conch stands for Jack’s power, since he is the boy who finds it and blows it first.',
      ],
    },
    {
      what: 'Jack lets the signal fire go out to go hunting, just as a ship passes the island.',
      where: 'Chapter 4',
      theme: 'Power and leadership',
      reading: 'Jack puts the thrill of hunting before the hope of rescue, showing the clash between his values and Ralph’s.',
      misreadings: [
        'Jack lets the fire go out on purpose because he has seen that the ship belongs to the enemy.',
        'The fire goes out because of the rain, so nobody on the island is to blame for missing the ship.',
        'Jack is a better leader than Ralph, because bringing back meat matters more than any fire.',
      ],
    },
    {
      what: 'The pig’s head on a stick, covered in flies, seems to speak to Simon and tell him that the beast is part of the boys.',
      where: 'Chapter 8',
      theme: 'Evil in human nature',
      reading: 'Simon realises that the beast they fear is the evil within themselves, not a creature on the island.',
      misreadings: [
        'The pig’s head is a real monster that controls the island and has been hunting the boys.',
        'Simon is dreaming about a feast, and the pig’s head shows how hungry all the boys are.',
        'The pig’s head shows that the hunters are skilled at feeding the group, so things are going well.',
      ],
    },
    {
      what: 'At the end, Ralph breaks down in tears for the innocence the boys have lost and the evil he has seen in them, as the officer turns away.',
      where: 'Chapter 12',
      theme: 'Loss of innocence',
      reading: 'Rescue cannot undo what the boys learned: that ordinary people, even children, can be savage.',
      misreadings: [
        'Ralph cries with joy because he is going home, and the island was only a happy adventure.',
        'Ralph cries because he will miss the island and wishes he could stay there for ever.',
        'Ralph cries because he has been punished by the officer for starting the fire on the island.',
      ],
    },
  ],
  context: [
    {
      ask: 'How did Golding’s experiences shape *Lord of the Flies*?',
      right: 'He served in the Second World War and saw its cruelty',
      wrong: ['He was shipwrecked on a desert island as a child', 'He was a choirboy who ran away to sea at twelve', 'He was a naval officer who rescued stranded boys'],
      sol: 'Golding served in the Royal Navy during the Second World War. The war convinced him that cruelty lies within ordinary people, not only in other nations.',
    },
    {
      ask: 'Why does Golding set the novel among boys from respectable British schools?',
      right: 'To show that even “civilised” children can turn savage without rules',
      wrong: ['Because he wanted to write a simple adventure story for children', 'To show that British schoolboys are always good leaders', 'Because the novel is based on a true story of a shipwreck'],
      sol: 'Earlier island adventures showed British boys behaving well. Golding overturns that idea: without rules and adults, his schoolboys slide into violence.',
    },
    {
      ask: 'What is ironic about the naval officer who rescues the boys?',
      right: 'He disapproves of their fighting, yet is fighting a war',
      wrong: ['He is Ralph’s father, who has been searching for him', 'He refuses to rescue any of the boys at all', 'He joins Jack’s tribe and stays on the island'],
      sol: 'The officer is shocked by the boys, but he is himself fighting a war. The adult world has the same savagery, on a larger scale.',
    },
  ],
};

export const ANIMAL_FARM: LitText = {
  title: 'Animal Farm',
  author: 'George Orwell',
  date: '1945',
  source: 'George Orwell, Animal Farm: A Fairy Story, first published in 1945. Not quoted here, because it is still in copyright in some countries; it is described in our own words.',
  part: 'Chapter',
  characters: [
    { name: 'Old Major', is: 'the old prize boar whose dream inspires the animals to rebel against humans' },
    { name: 'Napoleon', is: 'the fierce boar who takes power after the rebellion and rules as a tyrant' },
    { name: 'Snowball', is: 'the clever, lively pig who plans the windmill and is driven out by Napoleon’s dogs' },
    { name: 'Squealer', is: 'the persuasive pig who explains away every one of Napoleon’s decisions' },
    { name: 'Boxer', is: 'the strong, loyal cart-horse who works harder and harder for the farm' },
    { name: 'Benjamin', is: 'the old, cynical donkey who understands what is happening but rarely speaks' },
    { name: 'Mr Jones', is: 'the drunken farmer whom the animals drive out of Manor Farm' },
    { name: 'Mollie', is: 'the vain white mare who misses ribbons and sugar and leaves the farm' },
  ],
  events: [
    { where: 'Chapter 1', what: 'Old Major tells the animals of his dream of a world without humans.' },
    { where: 'Chapter 2', what: 'The animals rebel, drive out Mr Jones and rename the farm.' },
    { where: 'Chapter 2', what: 'The pigs paint the Seven Commandments on the wall of the barn.' },
    { where: 'Chapter 3', what: 'The pigs keep the milk and the apples for themselves.' },
    { where: 'Chapter 4', what: 'The animals beat off Mr Jones’s attempt to retake the farm at the Battle of the Cowshed.' },
    { where: 'Chapter 5', what: 'Napoleon’s dogs chase Snowball off the farm, and Napoleon ends the Sunday meetings.' },
    { where: 'Chapter 6', what: 'The half-built windmill falls in a storm, and Napoleon blames Snowball.' },
    { where: 'Chapter 7', what: 'Animals who confess to plotting with Snowball are killed by the dogs.' },
    { where: 'Chapter 9', what: 'Boxer collapses and is taken away in a van belonging to a horse slaughterer.' },
    { where: 'Chapter 10', what: 'The pigs walk on two legs, and at a dinner with farmers the animals cannot tell pigs from men.' },
  ],
  themes: ['Power and corruption', 'Propaganda', 'Class and equality', 'Revolution', 'Ignorance'],
  quotations: [],
  moments: [
    {
      what: 'Squealer explains to the other animals that the pigs need the milk and apples to keep their brains working for everyone.',
      where: 'Chapter 3',
      theme: 'Propaganda',
      reading: 'Squealer twists the truth so the pigs’ greed sounds like a sacrifice: propaganda serves power.',
      misreadings: [
        'Squealer is right, and the pigs share the milk and apples fairly with all the other animals.',
        'Squealer is joking, and the other animals laugh because they know the pigs are being greedy.',
        'Squealer is apologising, and he promises that the pigs will never take extra food again.',
      ],
    },
    {
      what: 'Napoleon’s dogs, which he raised in secret, chase Snowball off the farm.',
      where: 'Chapter 5',
      theme: 'Power and corruption',
      reading: 'Napoleon seizes power by force, not argument, so a tyrant takes over the revolution.',
      misreadings: [
        'The dogs chase Snowball away because he tried to steal food from the other animals.',
        'Snowball leaves the farm by choice to start a new farm of his own in the next valley.',
        'The dogs are playing a game with Snowball, and he comes back the next morning.',
      ],
    },
    {
      what: 'Boxer, worn out from work, is taken away in a slaughterer’s van, while Squealer claims he died in hospital.',
      where: 'Chapter 9',
      theme: 'Class and equality',
      reading: 'The pigs sell their most loyal worker, exploiting the working class they claim to serve.',
      misreadings: [
        'Boxer retires to a peaceful field, as the pigs had promised him from the very start.',
        'Boxer runs away from the farm because he is tired of the other animals’ laziness.',
        'Boxer is taken to a real hospital, and the pigs pay for him to have the best care.',
      ],
    },
    {
      what: 'At the end, the animals watching through a window can no longer see any difference between the pigs and the human farmers.',
      where: 'Chapter 10',
      theme: 'Revolution',
      reading: 'The pigs have become the tyrants they replaced, so the revolution has come full circle.',
      misreadings: [
        'The pigs and men have become friends, so the farm will now be a peaceful and fair place.',
        'The animals are tired and cannot see clearly through the window in the dark.',
        'The men have been turned into pigs by the animals, as a punishment for their cruelty.',
      ],
    },
  ],
  context: [
    {
      ask: 'What is *Animal Farm* an allegory of?',
      right: 'The Russian Revolution and the rise of Stalin',
      wrong: ['The English Civil War and the rule of Cromwell', 'The French Revolution and the rise of Napoleon', 'The Second World War and the fall of Hitler'],
      sol: 'Orwell based the story on Russia after 1917: Old Major suggests Marx and Lenin, Napoleon suggests Stalin and Snowball suggests Trotsky.',
    },
    {
      ask: 'Why did Orwell write *Animal Farm* as a fable about animals?',
      right: 'So a simple story shows how revolutions are betrayed',
      wrong: ['Because it was written for very young children only', 'Because Orwell was a farmer who loved animals', 'To avoid saying anything about politics at all'],
      sol: 'Orwell called it a fairy story. The simple animal fable makes the pattern of power and betrayal clear to any reader, in any time or country.',
    },
    {
      ask: 'How do the Seven Commandments change during *Animal Farm*?',
      right: 'The pigs quietly rewrite them to suit themselves',
      wrong: ['The animals vote to add more commandments', 'Mr Jones paints over them when he returns', 'They stay exactly the same to the very end'],
      sol: 'As the pigs break each rule, it is altered, until a single commandment is left, openly placing the pigs above the others. The changes show propaganda rewriting the past.',
    },
  ],
};

export const MODERN_TEXTS = [INSPECTOR, BLOOD_BROTHERS, LORD_FLIES, ANIMAL_FARM];
