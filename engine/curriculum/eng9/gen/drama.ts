/**
 * Grade 9 English, Unit 3: The Tempest (E9-C1). Plot and characters, themes and key lines, and
 * soliloquies, songs and language. Lines are quoted from William Shakespeare’s The Tempest (first
 * printed 1623), with act and scene.
 */
import { skill } from '../../helpers.ts';
import type { SkillDef } from '../../../types.ts';
import { bank, Q } from './common.ts';

const C1 = ['E9-C1'];
const T = (scene: string) => `William Shakespeare, The Tempest, ${scene}`;

// ---------------------------------------------------------------------------- 3.1 plot and characters

const PLOT = [
  Q(1, 'What happens at the very start of the play?', 'A ship is caught in a violent storm and seems to sink.', ['A wedding is held at the royal court of Naples.', 'Prospero is crowned as the new Duke of Milan.', 'Caliban rescues a group of sailors from the sea.'],
    'The play opens with the tempest itself, raised by Prospero’s magic.'),
  Q(1, 'How did Prospero and Miranda come to the island?', 'Prospero’s brother seized his dukedom and set them adrift at sea.', ['They sailed there on holiday and decided to stay forever.', 'They were shipwrecked in the storm at the start of the play.', 'Caliban invited them to come and rule the island with him.'],
    'Twelve years earlier, Antonio, helped by Alonso, King of Naples, usurped Prospero as Duke of Milan.'),
  Q(2, 'Who raises the storm, and why?', 'Prospero, with Ariel’s help, to bring his enemies to the island', ['Caliban, to drown Prospero and take back the island', 'Alonso, to punish his son Ferdinand for disobeying his orders', 'Miranda, because she is bored and wants to see a ship'],
    'The ship carries Antonio and Alonso. The storm brings them into Prospero’s power.'),
  Q(2, 'Which two plots are hatched against people in power during the play?', 'Antonio and Sebastian plot to kill Alonso; Caliban, Stephano and Trinculo plot to kill Prospero.', ['Miranda and Ferdinand plot to escape the island; Ariel and Prospero plot to sink the ship.', 'Gonzalo plots to rule the island; Ferdinand plots to marry Miranda in secret.', 'There are no plots: every character is loyal from beginning to end.'],
    'Both conspiracies echo Antonio’s original crime of seizing power.'),
  Q(3, 'How does the play end?', 'Prospero forgives his enemies, frees Ariel and gives up his magic.', ['Prospero takes revenge by drowning Antonio and Alonso at sea.', 'Caliban becomes the Duke of Milan and rules the whole island.', 'Miranda refuses to marry Ferdinand and stays on the island.'],
    'He chooses mercy, regains his dukedom and prepares to sail home.'),
  Q(3, 'Which order of events is correct?', 'The storm; Ferdinand meets Miranda; the plots fail; Prospero forgives.', ['Prospero forgives; the storm; the plots fail; Ferdinand meets Miranda.', 'The plots fail; the storm; Prospero forgives; Ferdinand meets Miranda.', 'Ferdinand meets Miranda; Prospero forgives; the storm; the plots fail.'],
    'The play moves from the storm and its confusion to love, failed plots and reconciliation.'),
];

const CHARACTERS = [
  Q(1, 'Who is Ariel?', 'A spirit who serves Prospero and longs to be free', ['Prospero’s brother, who stole his dukedom', 'The King of Naples, shipwrecked by the storm', 'A drunken butler who plots against Prospero'],
    'Prospero freed Ariel from a tree, where the witch Sycorax had trapped him, and Ariel now serves him in return.'),
  Q(1, 'Who is Caliban?', 'The son of the witch Sycorax, now Prospero’s servant', ['A young prince who falls in love with Miranda', 'An old lord who once helped Prospero escape', 'A fairy who sings songs to the shipwrecked men'],
    'Caliban says the island was his until Prospero took it.'),
  Q(2, 'Why does Prospero make Ferdinand carry heavy logs?', 'To test whether his love for Miranda is real', ['To punish him for causing the storm at sea', 'Because he needs firewood for the winter', 'Because Ferdinand has insulted Caliban'],
    'Prospero wants Ferdinand to value Miranda: “too light winning / Make the prize light.”'),
  Q(2, 'Who is Gonzalo?', 'A kind old lord who helped Prospero when he was cast out', ['The brother who stole Prospero’s dukedom in Milan', 'A sailor who drowns in the opening storm', 'Caliban’s mother, a powerful witch'],
    'Gonzalo secretly gave Prospero food, clothes and his books when he was set adrift.'),
  Q(3, 'How does Caliban see his situation?', 'As a native whose island was taken and who was then enslaved', ['As a grateful servant who loves working hard for Prospero', 'As a king who rules the island alongside Miranda', 'As a visitor waiting for a ship to take him home'],
    '“This island’s mine, by Sycorax my mother, / Which thou tak’st from me.” (1.2)'),
  Q(3, 'How does Miranda’s view of the world change when she meets the shipwrecked lords?', 'Having seen almost no one, she is amazed and sees only goodness in them.', ['She becomes suspicious of everyone and decides never to leave the island.', 'She recognizes them at once as the men who exiled her father.', 'She is bored by them and wishes to be alone with Caliban.'],
    'Her wonder is touching, but the audience knows some of them are villains.'),
];

// ---------------------------------------------------------------------------- 3.2 themes and key lines

const THEMES = [
  Q(1, 'Which theme is central to The Tempest?', 'Power and who has the right to rule', ['The dangers of travelling by train', 'The life of a family on a farm', 'A school competition and its winner'],
    'Prospero, Antonio, Caliban and the plotters all struggle over power.'),
  Q(1, 'What does Ariel want most?', 'Freedom', ['Revenge', 'Money', 'Fame'],
    'Ariel keeps reminding Prospero of his promise to set him free.'),
  Q(2, 'Prospero says, “The rarer action is / In virtue than in vengeance.” What does he decide?', 'To forgive his enemies instead of taking revenge', ['To punish his enemies even more harshly', 'To leave the island without seeing anyone again', 'To hand all his magic books to Antonio'],
    'Mercy, he says, is a rarer and nobler act than revenge.', 'The rarer action is\nIn virtue than in vengeance.', T('Act 5, Scene 1')),
  Q(2, 'Why do many modern readers link the play to colonialism?', 'A newcomer takes an island and rules its native, Caliban.', ['The play is set entirely in a large modern city.', 'The play is about building railways across a country.', 'Shakespeare wrote the play in the twentieth century.'],
    'Prospero’s rule over Caliban raises questions about who owns land and who has the right to rule.'),
  Q(3, 'How do the plots against Alonso and Prospero mirror Antonio’s past crime?', 'They repeat his attempt to seize power by betraying a ruler.', ['They show that everyone on the island is loyal and honest.', 'They prove that Antonio has changed and become a good man.', 'They have no link to anything that happened in the past.'],
    'The pattern of usurpation repeats, which makes Prospero’s final forgiveness more striking.'),
  Q(3, 'What might Prospero’s giving up his magic suggest?', 'He accepts the limits of power and returns to ordinary human life.', ['He has lost a battle against a stronger magician on the island.', 'He plans to use even greater magic once he is back in Milan.', 'He has forgotten how to do magic after twelve years away.'],
    'Many readers also see it as Shakespeare’s farewell to the stage.'),
];

const QUOTES = [
  Q(1, 'Who says “O brave new world, / That has such people in’t!”?', 'Miranda', ['Ariel', 'Caliban', 'Antonio'],
    'Miranda says it on seeing the lords for the first time (5.1).'),
  Q(2, 'Miranda says “O brave new world, / That has such people in’t!” and Prospero replies, “’Tis new to thee.” What does his reply suggest?', 'He knows these men are not as good as she thinks.', ['He agrees that they are the finest men alive.', 'He has never met any of these men before.', 'He wants Miranda to marry one of the lords.'],
    'His dry reply reminds us that some of them are traitors.', 'MIRANDA: O brave new world,\nThat has such people in’t!\nPROSPERO: ’Tis new to thee.', T('Act 5, Scene 1')),
  Q(2, 'Caliban says to Prospero and Miranda, “You taught me language, and my profit on’t / Is, I know how to curse.” What does he mean?', 'The only use he has found for their language is to curse them.', ['He is grateful for the many patient lessons they gave him.', 'He wants them to teach him to read and write.', 'He has forgotten every word they taught him.'],
    'His bitterness shows how he feels about being “taught” and ruled.', 'You taught me language, and my profit on’t\nIs, I know how to curse.', T('Act 1, Scene 2')),
  Q(3, 'Prospero says, “We are such stuff / As dreams are made on, and our little life / Is rounded with a sleep.” What idea does this express?', 'Life is brief and unreal, like a dream that ends in sleep.', ['Dreams are more important than waking life.', 'People should sleep more to stay healthy.', 'The island is a real place that will last forever and ever.'],
    'After the masque vanishes, Prospero reflects that all of life will fade too.', 'We are such stuff\nAs dreams are made on, and our little life\nIs rounded with a sleep.', T('Act 4, Scene 1')),
  Q(3, 'Of Caliban, Prospero says, “This thing of darkness I / Acknowledge mine.” What might this admission suggest?', 'Prospero accepts some responsibility for Caliban, and perhaps for his own darker side.', ['Prospero is proud that he has finally defeated Caliban for good, without any help.', 'Prospero is announcing that Caliban is his long-lost son.', 'Prospero is claiming to own the darkness of the night sky.'],
    'The line can be read as owning Caliban as his servant, and as recognizing something of himself in him.', 'This thing of darkness I\nAcknowledge mine.', T('Act 5, Scene 1')),
];

// ---------------------------------------------------------------------------- 3.3 soliloquies, songs and language

const SOLILOQUY = [
  Q(1, 'What is a soliloquy?', 'A speech in which a character alone on stage speaks their thoughts aloud', ['A song sung by a group of characters together', 'A conversation between two characters in secret', 'The list of all the characters that is printed at the start of a play'],
    'Soliloquies let the audience hear a character’s private thoughts.'),
  Q(1, 'What is an aside?', 'A line spoken to the audience that other characters do not hear', ['A long speech given to a crowd on stage', 'A stage direction that tells the actors where they should stand', 'A scene set at the side of the stage in the dark'],
    'Asides share secrets with the audience, often creating dramatic irony.'),
  Q(2, 'In Act 5, Prospero declares, “I’ll break my staff, / Bury it certain fathoms in the earth, / And deeper than did ever plummet sound / I’ll drown my book.” What is he doing?', 'Giving up his magic for good', ['Planning a new and greater spell', 'Hiding his books from Caliban', 'Building a boat to leave the island'],
    'Breaking his staff and drowning his book mean renouncing his power.', 'I’ll break my staff,\nBury it certain fathoms in the earth,\nAnd deeper than did ever plummet sound\nI’ll drown my book.', T('Act 5, Scene 1')),
  Q(2, 'What is the epilogue of The Tempest?', 'Prospero’s speech to the audience, asking them to set him free with their applause', ['The opening storm scene, before any of the characters speaks to the audience', 'Ariel’s song about a drowned father lying on the bed of the sea', 'The list of actors who first performed the play in 1611'],
    'Without his magic, he says, only the audience’s applause can release him.'),
  Q(3, 'Why might Shakespeare give Prospero’s farewell to magic as a long, solemn speech?', 'It lets the audience share a turning point in his inner life.', ['It fills time while the other actors change their costumes.', 'It shows Prospero is lying to the other characters.', 'It proves that Prospero is the villain of the play.'],
    'A long speech at a turning point invites the audience into his decision.'),
];

const LANGUAGE = [
  Q(1, 'Ariel sings, “Full fathom five thy father lies.” What does “fathom” measure?', 'The depth of water', ['The length of a song', 'The weight of a person', 'The width of an island'],
    'A fathom is about six feet (1.8 metres) of water depth, so the father lies drowned, thirty feet down.'),
  Q(2, 'Caliban says, “Be not afeard; the isle is full of noises, / Sounds and sweet airs, that give delight and hurt not.” What does this show?', 'Caliban, often called a monster, has a deep love for the island’s beauty.', ['Caliban is terrified of the island and wants to escape at once.', 'Caliban is warning the others that the island is very dangerous.', 'Caliban is complaining that the island is too noisy to sleep.'],
    'Some of the play’s most beautiful verse is given to Caliban, which complicates the idea that he is only a beast.', 'Be not afeard; the isle is full of noises,\nSounds and sweet airs, that give delight and hurt not.', T('Act 3, Scene 2')),
  Q(2, 'Caliban usually speaks in verse, while Stephano and Trinculo speak in prose. What might this contrast suggest?', 'Caliban has more depth and feeling than the two comic drunks.', ['Caliban is secretly a member of the royal family of Naples.', 'Stephano and Trinculo are the play’s main heroes.', 'Verse and prose have no meaning in Shakespeare.'],
    'Shakespeare often gives verse to serious feeling and prose to comedy.'),
  Q(3, 'Ariel reports that a man leapt from the ship crying, “Hell is empty, / And all the devils are here.” What does this convey?', 'The storm is so terrifying that it seems as if every devil has come up from hell.', ['The sailors are calmly enjoying the storm as it passes over them.', 'The ship has sailed into a real underground cave that is full of devils.', 'Ariel is describing a peaceful island with no people on it at all.'],
    'Hyperbole captures the panic of the shipwreck.', 'Hell is empty,\nAnd all the devils are here.', T('Act 1, Scene 2')),
  Q(3, 'How does Shakespeare create the island on a bare stage?', 'Through characters’ descriptions, music and songs rather than scenery', ['Through detailed painted scenery of every part of the island', 'Through a narrator who reads out a description of the island', 'Through printed programmes handed to the audience beforehand'],
    'Shakespeare’s stage had little scenery, so language and music build the setting.'),
];

// ---------------------------------------------------------------------------- skills

export const DRAMA_SKILLS: SkillDef[] = [
  skill({ id: 'e9-tempest-plot', name: 'The Tempest: the plot', description: 'Follow the storm, the love story, the two conspiracies and the reconciliation.', outcomes: C1, lessonId: 'e9-3-1', format: 'mc', gen: bank(PLOT, ['Prospero’s magic drives the plot.', 'Two plots against rulers echo Antonio’s past crime.']) }),
  skill({ id: 'e9-tempest-characters', name: 'The Tempest: the characters', description: 'Explain the motives and relationships of the main characters.', outcomes: C1, lessonId: 'e9-3-1', format: 'mc', gen: bank(CHARACTERS, ['Ask: what does this character want, and what stands in the way?']) }),
  skill({ id: 'e9-tempest-themes', name: 'The Tempest: themes', description: 'Explain the play’s themes of power, freedom and forgiveness.', outcomes: C1, lessonId: 'e9-3-2', format: 'mc', gen: bank(THEMES, ['Power, freedom and forgiveness run through the play.']) }),
  skill({ id: 'e9-tempest-quotes', name: 'The Tempest: key lines', description: 'Explain what key lines reveal about character and theme.', outcomes: C1, lessonId: 'e9-3-2', format: 'mc', gen: bank(QUOTES, ['Ask who speaks, when, and to whom.']) }),
  skill({ id: 'e9-soliloquy', name: 'Soliloquies, asides and the epilogue', description: 'Explain the purpose of soliloquies, asides and the epilogue.', outcomes: C1, lessonId: 'e9-3-3', format: 'mc', gen: bank(SOLILOQUY, ['A soliloquy is spoken alone; an aside is shared with the audience.']) }),
  skill({ id: 'e9-tempest-language', name: 'The Tempest: language and staging', description: 'Analyse how language, verse and song create the island and its characters.', outcomes: C1, lessonId: 'e9-3-3', format: 'mc', gen: bank(LANGUAGE, ['Verse for feeling, prose for comedy.', 'Language builds the setting on a bare stage.']) }),
];
