/** Julius Caesar, William Shakespeare (first performed 1599). Quotations from Project Gutenberg eBook #1522. */
import type { LitText } from '../literature.ts';

export const CAESAR: LitText = {
  title: 'Julius Caesar',
  author: 'William Shakespeare',
  date: 'first performed in 1599',
  part: 'Act',
  characters: [
    { name: 'Julius Caesar', is: 'the great Roman general and ruler, whom some fear wants to be crowned king' },
    { name: 'Brutus', is: 'Caesar’s friend, an honourable senator who joins the plot because he believes it is for Rome’s good' },
    { name: 'Cassius', is: 'the envious, persuasive senator who organises the conspiracy and wins Brutus to it' },
    { name: 'Mark Antony', is: 'Caesar’s loyal friend, whose funeral speech turns the people of Rome against the conspirators' },
    { name: 'Casca', is: 'the blunt, sarcastic conspirator who strikes the first blow at Caesar' },
    { name: 'Calphurnia', is: 'Caesar’s wife, who dreams of his murder and begs him not to go to the Senate' },
    { name: 'Portia', is: 'Brutus’s wife, who wounds herself to prove she can keep his secret, and later dies' },
    { name: 'the Soothsayer', is: 'the fortune-teller who warns Caesar to beware the Ides of March' },
    { name: 'Octavius', is: 'Caesar’s young adopted heir, who joins Antony to defeat the conspirators' },
  ],
  events: [
    { where: 'Act 1, Scene 2', what: 'A soothsayer warns Caesar to beware the Ides of March, and Cassius begins to sound out Brutus.' },
    { where: 'Act 1, Scene 3', what: 'During a storm full of strange omens, Cassius recruits Casca to the conspiracy.' },
    { where: 'Act 2, Scene 1', what: 'Brutus decides that Caesar must die, and the conspirators meet in his orchard at night.' },
    { where: 'Act 2, Scene 2', what: 'Calphurnia begs Caesar to stay at home after dreaming of his murder, but Decius persuades him to go.' },
    { where: 'Act 3, Scene 1', what: 'The conspirators stab Caesar to death in the Senate.' },
    { where: 'Act 3, Scene 2', what: 'Brutus and then Antony speak at Caesar’s funeral, and Antony turns the crowd into a mob.' },
    { where: 'Act 3, Scene 3', what: 'The mob tears apart Cinna the poet because he has the same name as a conspirator.' },
    { where: 'Act 4, Scene 3', what: 'Brutus and Cassius quarrel in Brutus’s tent, and Caesar’s ghost appears to Brutus.' },
    { where: 'Act 5, Scene 3', what: 'Cassius, wrongly believing the battle lost, has his servant kill him.' },
    { where: 'Act 5, Scene 5', what: 'Brutus runs on his own sword, and Antony calls him the noblest Roman of them all.' },
  ],
  themes: ['Power and ambition', 'Honour and loyalty', 'Persuasion and rhetoric', 'Fate and free will', 'Betrayal'],
  quotations: [
    {
      text: 'Beware the Ides of March.',
      who: 'the Soothsayer', where: 'Act 1, Scene 2', lead: 'A voice calls to Caesar from the crowd:', theme: 'Fate and free will',
      reading: 'The warning hints that Caesar’s death is fated, and his dismissal of it shows a pride that helps bring it about.',
      misreadings: [
        'The soothsayer is warning Caesar about bad weather in March, so he advises him to delay his journey to Rome.',
        'The soothsayer is a spy for Cassius, and he is giving Caesar a coded message to meet the conspirators.',
        'The soothsayer is reminding Caesar of a festival in March, which he wants Caesar to attend and pay for.',
      ],
    },
    {
      text: 'he doth bestride the narrow world\nLike a Colossus, and we petty men\nWalk under his huge legs',
      who: 'Cassius', where: 'Act 1, Scene 2', lead: 'Cassius complains to Brutus about Caesar’s power:', theme: 'Power and ambition',
      reading: 'Cassius pictures Caesar as a giant statue looming over everyone, so he stirs up Brutus’s resentment of his power.',
      misreadings: [
        'Cassius admires Caesar’s greatness, and he hopes that Brutus will help him build a statue in Caesar’s honour.',
        'Cassius is describing a real statue in Rome, which he thinks is too large and should be taken down.',
        'Cassius means that Caesar is very tall, and he finds it difficult to speak to him without looking up.',
      ],
    },
    {
      text: 'The fault, dear Brutus, is not in our stars,\nBut in ourselves, that we are underlings.',
      who: 'Cassius', where: 'Act 1, Scene 2', lead: 'Cassius urges Brutus to act against Caesar:', theme: 'Fate and free will',
      reading: 'Cassius argues that men choose their own fate, not the stars, so he pushes Brutus to take action against Caesar.',
      misreadings: [
        'Cassius believes that the stars control everything, so he tells Brutus there is no point in resisting Caesar.',
        'Cassius blames Brutus for a mistake in their astronomy lessons, and he asks him to study the stars again.',
        'Cassius admits that he is jealous of Brutus, and he apologises for speaking unkindly to his friend.',
      ],
    },
    {
      text: 'Yond Cassius has a lean and hungry look;\nHe thinks too much: such men are dangerous.',
      who: 'Julius Caesar', where: 'Act 1, Scene 2', lead: 'Caesar speaks to Antony as Cassius watches:', theme: 'Power and ambition',
      reading: 'Caesar reads Cassius’s ambition correctly, so it is ironic that he does nothing to protect himself.',
      misreadings: [
        'Caesar is worried that Cassius is ill and not eating, so he asks Antony to invite him to dinner.',
        'Caesar admires Cassius as a thinker, and he plans to make him his chief adviser in the Senate.',
        'Caesar is joking with Antony about Cassius’s thin face, and he has no suspicion of him at all.',
      ],
    },
    {
      text: 'And therefore think him as a serpent’s egg\nWhich hatch’d, would, as his kind grow mischievous;\nAnd kill him in the shell.',
      who: 'Brutus', where: 'Act 2, Scene 1', lead: 'Alone in his orchard, Brutus decides what to do about Caesar:', theme: 'Power and ambition',
      reading: 'Brutus kills Caesar for what he might become, not for what he has done, so his reasoning rests on fear of the future.',
      misreadings: [
        'Brutus has found a snake’s nest in his orchard, and he tells his servant to destroy the eggs before they hatch.',
        'Brutus decides that Caesar is harmless, like an egg, so there is no need to join the plot against him.',
        'Brutus means that Cassius is the real danger, so he plans to warn Caesar about the conspiracy in time.',
      ],
    },
    {
      text: 'When beggars die, there are no comets seen;\nThe heavens themselves blaze forth the death of princes.',
      who: 'Calphurnia', where: 'Act 2, Scene 2', lead: 'Calphurnia begs Caesar not to go to the Senate:', theme: 'Fate and free will',
      reading: 'Calphurnia believes the omens point to Caesar’s death, since only great men’s deaths are marked in the heavens.',
      misreadings: [
        'Calphurnia complains that Caesar gives nothing to beggars, so she asks him to be more generous to the poor.',
        'Calphurnia is describing a comet she saw last year, and she thinks it means that Caesar will soon be crowned.',
        'Calphurnia is reassuring Caesar that the omens mean nothing, since the stars only notice the deaths of beggars.',
      ],
    },
    {
      text: 'Cowards die many times before their deaths;\nThe valiant never taste of death but once.',
      who: 'Julius Caesar', where: 'Act 2, Scene 2', lead: 'Caesar answers Calphurnia’s fears:', theme: 'Fate and free will',
      reading: 'Caesar sees fear of death as cowardice, so his courage is also a fatal pride that sends him to the Senate.',
      misreadings: [
        'Caesar admits that he is afraid, and he decides to stay at home with Calphurnia to keep himself safe.',
        'Caesar means that cowards are often killed in battle, so he warns his soldiers to fight bravely.',
        'Caesar is mocking Calphurnia for her bad dream, and he tells her that she is a coward for believing it.',
      ],
    },
    {
      text: 'But I am constant as the northern star,',
      who: 'Julius Caesar', where: 'Act 3, Scene 1', lead: 'The conspirators kneel to Caesar with a petition, moments before they strike:', theme: 'Power and ambition',
      reading: 'Caesar compares himself to the fixed star in the heavens, so his pride is at its height just before he falls.',
      misreadings: [
        'Caesar admits that he often changes his mind, and he promises to think again about the conspirators’ request.',
        'Caesar is describing the stars he saw on the way to the Senate, which he took as a good sign for the day.',
        'Caesar means that he is loyal to his friends, and he thanks the conspirators for their constant support.',
      ],
    },
    {
      text: 'Not that I loved Caesar less, but that I loved Rome more.',
      who: 'Brutus', where: 'Act 3, Scene 2', lead: 'Brutus explains to the crowd why he killed Caesar:', theme: 'Honour and loyalty',
      reading: 'Brutus claims he put Rome before his friend, so his honest but plain reasoning wins the crowd only for a while.',
      misreadings: [
        'Brutus admits that he never loved Caesar at all, and that he killed him out of jealousy of his power.',
        'Brutus says that he loves Rome less than Caesar did, so he offers to leave the city for good.',
        'Brutus is describing his love of Rome’s buildings, and he promises to rebuild the Senate after the fire.',
      ],
    },
    {
      text: 'Friends, Romans, countrymen, lend me your ears;\nI come to bury Caesar, not to praise him.',
      who: 'Mark Antony', where: 'Act 3, Scene 2', lead: 'Antony begins his speech at Caesar’s funeral:', theme: 'Persuasion and rhetoric',
      reading: 'Antony pretends he will not praise Caesar, so he wins the crowd’s trust before turning it against the conspirators.',
      misreadings: [
        'Antony really does mean to bury Caesar quietly, and he asks the crowd to leave the funeral to his family.',
        'Antony agrees with Brutus that Caesar was ambitious, and he asks the crowd to forgive the conspirators.',
        'Antony is asking the crowd for money to pay for the funeral, since Caesar has left his family nothing.',
      ],
    },
    {
      text: 'But Brutus says he was ambitious,\nAnd Brutus is an honourable man.',
      who: 'Mark Antony', where: 'Act 3, Scene 2', lead: 'Antony describes Caesar’s good deeds to the crowd:', theme: 'Persuasion and rhetoric',
      reading: 'By repeating “honourable” after each good deed of Caesar’s, Antony makes the word sound false, so the crowd turns.',
      misreadings: [
        'Antony sincerely praises Brutus’s honour, and he asks the crowd to make Brutus the new ruler of Rome.',
        'Antony is confused about what Brutus said, so he repeats the words to make sure he has understood them.',
        'Antony is warning the crowd that Brutus is ambitious, and he tells them that Brutus wants to be king.',
      ],
    },
    {
      text: 'This was the most unkindest cut of all;',
      who: 'Mark Antony', where: 'Act 3, Scene 2', lead: 'Antony shows the crowd the wound made by Brutus’s dagger:', theme: 'Betrayal',
      reading: 'The double superlative stresses that the blow from Brutus, a friend, hurt most, so betrayal is the cruellest wound.',
      misreadings: [
        'Antony is complaining that Caesar’s cloak was badly made, and the tailor cut the cloth unkindly.',
        'Antony is saying that Brutus’s blow was the least serious, since it only scratched Caesar’s arm.',
        'Antony means that Casca struck first and hardest, so the crowd should look for Casca and not for Brutus.',
      ],
    },
    {
      text: 'Now let it work. Mischief, thou art afoot,\nTake thou what course thou wilt!',
      who: 'Mark Antony', where: 'Act 3, Scene 2', lead: 'The crowd rushes off to burn the conspirators’ houses:', theme: 'Persuasion and rhetoric',
      reading: 'Antony is pleased that his words have unleashed a riot, so his grief was also a calculated political move.',
      misreadings: [
        'Antony is horrified by the riot and begs the crowd to come back and listen to reason before it is too late.',
        'Antony is talking to his dog, who has run off into the crowd, and he tells it to find its own way home.',
        'Antony is ordering his soldiers to stop the riot, and he blames Brutus for stirring up the angry crowd.',
      ],
    },
    {
      text: 'There is a tide in the affairs of men,\nWhich, taken at the flood, leads on to fortune;',
      who: 'Brutus', where: 'Act 4, Scene 3', lead: 'Brutus argues that they must march to Philippi at once:', theme: 'Fate and free will',
      reading: 'Brutus believes chances must be seized at the right moment, but his decision to march leads to defeat.',
      misreadings: [
        'Brutus is planning to escape from Rome by ship, and he is waiting for the high tide so that he can sail.',
        'Brutus means that the gods control everything, so there is no point in making any plans for the battle.',
        'Brutus is advising Cassius to wait until the enemy is weaker, so that they can win without a fight.',
      ],
    },
    {
      text: 'This was the noblest Roman of them all.',
      who: 'Mark Antony', where: 'Act 5, Scene 5', lead: 'Antony stands over Brutus’s body:', theme: 'Honour and loyalty',
      reading: 'Even his enemy admits that Brutus acted for Rome, not envy, so the play ends by honouring his good intentions.',
      misreadings: [
        'Antony is speaking about Caesar, and he means that Caesar was the greatest of all the Roman rulers.',
        'Antony is mocking Brutus, and he means that Brutus was the most foolish of all the conspirators.',
        'Antony is praising Octavius, who has won the battle, and he names him the next ruler of Rome.',
      ],
    },
  ],
  context: [
    {
      ask: 'Why might the play’s subject, the killing of a ruler, have mattered to Shakespeare’s first audience in 1599?',
      right: 'Elizabeth I was old with no heir, so people feared what would happen to the country when she died',
      wrong: ['England had just become a republic, so the audience was celebrating the end of rule by monarchs', 'Shakespeare had been asked by the Queen to write a play explaining her plans for the succession', 'The audience had never heard of Julius Caesar, so the story was completely new and surprising'],
      sol: 'Elizabeth I was in her sixties and childless. Fear of civil war after a ruler’s fall, as in Rome after Caesar, was very real.',
    },
    {
      ask: 'Where did Shakespeare find the story of *Julius Caesar*?',
      right: 'In Plutarch’s *Lives*, a history of famous Greeks and Romans, translated into English by Thomas North',
      wrong: ['In a Roman play about Caesar that he translated word for word from Latin into English', 'In a newspaper report about a murder in Rome, which he turned into a play set in the past', 'In a story his grandfather told him, since no written history of Caesar survived from Rome'],
      sol: 'Shakespeare drew closely on North’s 1579 translation of Plutarch, but he shaped the events and the speeches for the stage.',
    },
    {
      ask: 'Why is Antony’s funeral speech more persuasive than Brutus’s?',
      right: 'Antony uses emotion, irony, Caesar’s will and his wounds, while Brutus appeals only to plain reason',
      wrong: ['Antony speaks first, so the crowd has already decided by the time Brutus is allowed to speak', 'Antony bribes the crowd with money before the funeral, so they cheer for him whatever he says', 'Antony has a louder voice, so the crowd at the back cannot hear what Brutus says at all'],
      sol: 'Brutus speaks in calm prose. Antony speaks in verse, repeats “honourable” with irony, shows the body and reads the will, and turns the crowd’s feelings.',
    },
    {
      ask: 'Why is *Julius Caesar* a **tragedy**?',
      right: 'Its tragic hero, Brutus, is a noble man brought down by a flaw, here his trust and idealism',
      wrong: ['It is set in Rome, and every play Shakespeare set in Rome was called a tragedy', 'It ends with a wedding, which in Shakespeare’s time was the sign of a tragedy', 'It has no heroes at all, only villains, so the audience cannot feel sorry for anyone'],
      sol: 'Brutus means well, but his idealism lets Cassius manipulate him and Antony outplay him. His fall and death are the tragedy.',
    },
    {
      ask: 'What is the effect of the **storm and omens** in Act 1, Scene 3 and Act 2?',
      right: 'They suggest the natural world is disturbed by the plot, which builds tension before the murder',
      wrong: ['They show that the play takes place in winter, which is when the Romans held their elections', 'They prove that the gods support the conspirators, so the murder is shown to be right', 'They are a comic interlude, since Elizabethan audiences laughed at stories of ghosts and omens'],
      sol: 'Elizabethans believed disorder in the state was mirrored in nature. Lions in the streets, fiery men and a stormy night foreshadow Caesar’s death.',
    },
    {
      ask: 'What does the killing of **Cinna the poet** show?',
      right: 'Once Antony unleashes it, the mob is violent and irrational, so persuasion can lead to chaos',
      wrong: ['The conspirators planned to kill every poet in Rome, to stop them writing about the murder', 'Cinna was secretly a conspirator, so the mob was right to punish him for his part in it', 'Poets were hated in Rome, so the crowd attacked him for his bad poems and not for his name'],
      sol: 'The mob kill Cinna for sharing a conspirator’s name: “Tear him for his bad verses.” It shows the danger of a crowd stirred by rhetoric.',
    },
  ],
};
