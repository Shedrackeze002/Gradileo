/**
 * Grade 12 English, lesson 2.4: Reading an Unseen Poem (12-B1). A whole poem the student has not
 * studied, with two or three questions that move from what happens, through structure and imagery, to
 * tone and meaning: Millay, McKay, Rossetti, Dickinson, Edward Thomas and Housman.
 */
import { mc, part, skill, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { titled } from '../../eng10/gen/texts.ts';
import { ADLESTROP_ALL, ATHLETE_ALL, CASUAL_ALL, FLY_ALL, TROPICS_ALL, UPHILL_ALL, end, verseBlock, type Verse } from './poems.ts';
import type { Ask } from './poetry-ode.ts';

const L = 'e12-2-4';
const OUT = ['12-B1'];
const HINT = 'Read the poem twice. First settle who is speaking and what is happening; then look at how it is built (stanzas, turns, repeated words) and at its images; only then decide its tone and meaning.';

interface Unseen {
  verse: Verse;
  lead: string;
  /** What is happening (difficulty 1). */
  basic: Ask[];
  /** Structure and imagery (difficulty 2). */
  close: Ask[];
  /** Tone and meaning (difficulty 3). */
  deep: Ask[];
}

const UNSEEN: Unseen[] = [
  {
    verse: CASUAL_ALL,
    lead: `${titled(CASUAL_ALL.poem)}, a sonnet by ${CASUAL_ALL.poem.author}:`,
    basic: [
      {
        ask: 'What situation does the speaker imagine?',
        right: 'Learning by chance from a stranger’s newspaper that her lover was killed',
        wrong: ['Reading in the newspaper that her lover has married someone else in the city', 'Meeting her lover by chance on a subway train after many years apart', 'Writing a newspaper story about a stranger who was killed on a city street'],
        why: 'She imagines reading, “from the back-page of a paper”, that “A hurrying man—who happened to be you— / At noon to-day had happened to be killed”.',
      },
      {
        ask: 'Where does she imagine reading the news?',
        right: 'In a paper held by the person beside her on a subway train',
        wrong: ['In a letter delivered to her door by a messenger at noon', 'On a poster pasted to the wall at the corner of the avenue', 'In a telegram handed to her at the station by a stranger'],
        why: 'The paper is “Held by a neighbor in a subway train”: a neighbour here is simply the person sitting next to her.',
      },
    ],
    close: [
      {
        ask: 'How does the poem divide at line 9?',
        right: 'Lines 1–8 imagine the news; lines 9–14, how calmly she would behave in public',
        wrong: ['Lines 1–8 imagine the news; lines 9–14, how loudly she would weep and cry out', 'Lines 1–8 describe the city; lines 9–14 describe her childhood in the country', 'Lines 1–8 are spoken by her; lines 9–14 by the hurrying man himself'],
        why: 'Lines 1–8 build the scene of the news; line 9 turns: “I should not cry aloud”. She would only watch the lights “With a more careful interest on my face”.',
      },
      {
        ask: 'What do the furs and the hair in the last line suggest?',
        right: 'She fixes on trivial ads to hold back a grief she cannot show',
        wrong: ['She is more interested in fashion than in the man she has lost', 'She plans to sell her furs to pay for her lover’s funeral', 'She has stopped caring about him and is planning a new life'],
        why: 'She would read “with greater care / Where to store furs and how to treat the hair”: the care is a mask, and the trivial words show how much she must hold in.',
      },
    ],
    deep: [
      {
        ask: 'What is the tone of the poem?',
        right: 'Restrained and understated: the calm surface sharpens the grief',
        wrong: ['Openly despairing: she pours out her grief in loud and wild lament', 'Light and comic: she makes fun of people who read the newspapers', 'Angry and accusing: she blames the city for her lover’s death'],
        why: 'Nothing is cried aloud; the speaker describes only what she would not do and the small things she would look at, and the restraint lets us feel what she hides.',
      },
      {
        ask: 'Why might the poet use offhand words like “say” and “happened to be”?',
        right: 'The offhand words mirror the careless way such news would reach her',
        wrong: ['They show that she does not care whether her lover lives or dies', 'They show the poem is a joke and the death is not to be taken seriously', 'They show she is reading the news aloud to the person beside her'],
        why: '“Read from the back-page of a paper, say” and “happened to be killed”: the casual words copy how a city paper would report a stranger’s death, which makes it more painful.',
      },
    ],
  },
  {
    verse: TROPICS_ALL,
    lead: `${titled(TROPICS_ALL.poem)} by ${TROPICS_ALL.poem.author}, who was born in Jamaica and moved to the United States in 1912:`,
    basic: [
      {
        ask: 'What sets off the speaker’s feelings?',
        right: 'Tropical fruit set out for sale in a shop window in New York',
        wrong: ['A letter from home describing the harvest at the parish fair', 'A painting of tropical hills hanging in a New York gallery', 'A song about his homeland sung by a woman in the street'],
        why: 'The bananas, ginger-root, mangoes and tangerines are “Set in the window”, and they bring the memories.',
      },
      {
        ask: 'What does the speaker do at the end?',
        right: 'He turns aside, bows his head and weeps with longing for home',
        wrong: ['He buys the fruit and takes it home to share with his friends', 'He decides to sail home to the tropics on the next ship out', 'He goes into the shop and talks to the owner about his home'],
        why: '“I turned aside and bowed my head and wept.”',
      },
    ],
    close: [
      {
        ask: 'How does the poem move across its three stanzas?',
        right: 'From fruit he sees, to memories, to grief felt in his body',
        wrong: ['From his childhood, to his voyage, to his arrival in New York', 'From a question about home, to an answer, to a closing moral', 'From the city at night, to morning, to evening of the same day'],
        why: 'Stanza 1 lists the fruit; stanza 2 opens into “memories” of hills and dawns; stanza 3 turns to his body: dim eyes, “A wave of longing”, weeping.',
      },
      {
        ask: 'What do “benediction” and “nun-like hills” suggest about his homeland?',
        right: 'A peaceful, almost holy place, blessed by the skies above it',
        wrong: ['A strict and joyless place where the church ruled every life', 'A cold, distant place that he was glad to have left behind', 'A busy, crowded place full of markets and noisy parish fairs'],
        why: 'A benediction is a blessing, and the hills are “nun-like”: the skies seem to bless a quiet, sacred landscape.',
      },
    ],
    deep: [
      {
        ask: 'What is the tone of the last stanza?',
        right: 'Overwhelming homesickness: longing sweeps through his whole body',
        wrong: ['Quiet satisfaction: he is content with his new life in New York', 'Bitter anger: he resents the city for taking him away from home', 'Cheerful nostalgia: he smiles at happy memories of the parish fair'],
        why: '“My eyes grew dim … A wave of longing through my body swept … I turned aside and bowed my head and wept”: the feeling is too strong to look at the fruit any longer.',
      },
      {
        ask: 'Why might the poem open with a plain list of fruits?',
        right: 'The crowded, plain list makes the fruit vivid before it opens into memory',
        wrong: ['The list is the shop’s price list, showing how costly food is in the city', 'The list shows that he hopes to open a fruit shop of his own one day', 'The list proves that tropical fruit is better than any fruit grown in America'],
        why: 'Four lines of things, with no feeling named, set the fruit before us; the memories and grief come only after, as they did for him.',
      },
    ],
  },
  {
    verse: UPHILL_ALL,
    lead: `${titled(UPHILL_ALL.poem)} by ${UPHILL_ALL.poem.author}:`,
    basic: [
      {
        ask: 'How is the poem set out?',
        right: 'As a dialogue: a traveller asks and another voice answers',
        wrong: ['As a letter from a traveller to a friend who is waiting at the inn', 'As a story told by an innkeeper about the travellers he has met', 'As a song sung together by a group of travellers on a hill'],
        why: 'In every stanza a question is followed by an answer: “Does the road wind up-hill all the way? / Yes, to the very end.”',
      },
      {
        ask: 'What does the traveller learn about the journey?',
        right: 'It is uphill all the way, but there is rest at the end',
        wrong: ['It is short and easy, and will be over well before the night', 'It must be made alone, with no one else at all on the road', 'It leads to a locked inn where all travellers are turned away'],
        why: 'The road climbs “to the very end” and takes “the whole long day”, but there is “a resting-place”, and “You cannot miss that inn.”',
      },
    ],
    close: [
      {
        ask: 'What might the journey and the inn stand for?',
        right: 'Life as a hard road, and death as the rest and the welcome at its end',
        wrong: ['A real walking holiday through the hills to a famous country inn', 'A soldier’s long march to battle and the camp where he will sleep', 'A pilgrim’s visit to a church to ask forgiveness for a crime'],
        why: 'A journey “From morn to night”, “the slow dark hours”, “Those who have gone before” and “beds for all who come”: the road is life and the inn is death, or the rest after it.',
      },
      {
        ask: 'Who are “Those who have gone before”?',
        right: 'The dead, who made the journey before the traveller',
        wrong: ['Guides whom the traveller has hired to lead the way up the hill', 'Thieves who wait on the road to rob travellers after dark', 'The innkeeper’s family, who live at the inn all year round'],
        why: 'If the journey is life, those who have finished it before are the dead, and they will not keep the traveller “standing at that door”.',
      },
    ],
    deep: [
      {
        ask: 'What is the tone of the answers?',
        right: 'Calm and reassuring: they admit the hardship but promise rest',
        wrong: ['Cold and threatening: they warn of the dangers on the road', 'Mocking and cruel: they laugh at the weakness of the traveller', 'Anxious and uncertain: they are as frightened as the traveller'],
        why: 'The answers never deny the climb (“Yes, to the very end”), but they promise comfort: “You cannot miss that inn”, “Yea, beds for all who come.”',
      },
      {
        ask: 'How does the shape of each stanza support the meaning?',
        right: 'Each pairs two questions with two answers, a rhythm of doubt and comfort',
        wrong: ['Each stanza tells a new part of a story, and no questions are asked at all', 'The stanzas grow longer and longer as the traveller climbs the steep hill', 'Each stanza ends with the same refrain, sung by all of the travellers'],
        why: 'Question, answer, question, answer, four times over: each worry is met at once by a calm reply, and the last answer is the fullest promise.',
      },
    ],
  },
  {
    verse: FLY_ALL,
    lead: `${titled(FLY_ALL.poem)} by ${FLY_ALL.poem.author}:`,
    basic: [
      {
        ask: 'What is unusual about the speaker’s situation?',
        right: 'She describes the moment of her own death, as if looking back on it',
        wrong: ['She describes the death of a friend she sat beside through the night', 'She describes a dream of a storm, from which she wakes up safely', 'She describes killing a fly that annoyed her in a quiet room'],
        why: '“I heard a fly buzz when I died”: the speaker tells of her own deathbed.',
      },
      {
        ask: 'Who are “The eyes beside”, and what are they doing?',
        right: 'Mourners at the deathbed, cried dry, waiting for the end',
        wrong: ['Doctors watching closely, hopeful that she will recover', 'Servants sorting her keepsakes, glad to take what she leaves', 'Strangers at the window, curious about the coming storm'],
        why: 'The eyes “had wrung them dry”, and the breaths “were gathering sure / For that last onset”: the family have finished weeping and wait for death.',
      },
    ],
    close: [
      {
        ask: 'What do the mourners expect, and what comes instead?',
        right: 'They await “the king”, death in his power; a buzzing fly comes instead',
        wrong: ['They await a doctor with a cure; a storm breaks over the house instead', 'They await her last words; she sings a hymn to the mourners instead', 'They await a priest; a king and all his court arrive at the door instead'],
        why: 'They wait for “the king” to be “witnessed in his power”; what “interposed” was a fly “With blue, uncertain, stumbling buzz”.',
      },
      {
        ask: 'What does “I could not see to see” suggest?',
        right: 'Her sight, and with it her life and understanding, fails',
        wrong: ['The room has grown too dark because someone closed the window', 'The fly has flown out of the window, and she cannot see where', 'She has closed her eyes on purpose so that she can fall asleep'],
        why: '“And then the windows failed”: the windows are her eyes. She can no longer see, nor “see” in the sense of understand: she has died.',
      },
    ],
    deep: [
      {
        ask: 'What is the effect of the fly’s interruption?',
        right: 'A trivial noise breaks into a solemn moment, unsettling grand ideas of death',
        wrong: ['It adds humour, showing that she found the whole deathbed scene ridiculous', 'It shows she was too busy signing her will to notice that she was dying', 'It wakes her from the dream, so that she finds she is still alive after all'],
        why: 'Everyone waits for “the king … in his power”; what comes is a fly, “Between the light and me”. The last thing she knows is small and ordinary.',
      },
      {
        ask: 'What is the effect of the repeated “and then” in the last stanza?',
        right: 'The flat, repeated “and then” marks each stage as her senses shut down',
        wrong: ['The repetition speeds the poem up, as she rushes to finish her will', 'The repetition shows she is telling a children’s story to the mourners', 'The repetition shows that the fly keeps leaving and then coming back'],
        why: '“And then the windows failed, and then / I could not see to see”: plain steps, one after another, as sight and life go out.',
      },
    ],
  },
  {
    verse: ADLESTROP_ALL,
    lead: `${titled(ADLESTROP_ALL.poem)} by ${ADLESTROP_ALL.poem.author}, about a train journey in June 1914 (Adlestrop is a village; “unwontedly” means unusually):`,
    basic: [
      {
        ask: 'What is the situation?',
        right: 'An express train stops briefly, and unusually, at a quiet little country station',
        wrong: ['The speaker waits all afternoon at a station for a friend who never comes', 'The speaker gets off the train to spend a summer holiday in the village', 'The train breaks down, and its passengers walk on across the fields'],
        why: '“The express-train drew up there / Unwontedly”, “No one left and no one came”: an unscheduled stop of “that minute”.',
      },
      {
        ask: 'What does the speaker see on the platform?',
        right: 'No one: the platform is bare, with only the station’s name',
        wrong: ['A crowd of passengers waiting to board the train for London', 'A porter loading baskets of hay and flowers onto the train', 'A stationmaster waving the express train on its way again'],
        why: '“No one left and no one came / On the bare platform. What I saw / Was Adlestrop—only the name”.',
      },
    ],
    close: [
      {
        ask: 'How does the focus widen in the last stanza?',
        right: 'From one blackbird close by to all the birds of two counties',
        wrong: ['From the whole sky down to a single flower on the platform', 'From the station’s name to the names of people on the train', 'From the train to the town, and then on to the city of London'],
        why: '“a blackbird sang / Close by, and round him, mistier, / Farther and farther, all the birds / Of Oxfordshire and Gloucestershire.”',
      },
      {
        ask: 'What is the effect of “The steam hissed. Someone cleared his throat.”?',
        right: 'Short sentences record small sounds that make the silence felt',
        wrong: ['Loud, busy sounds show that the station is crowded and noisy', 'The sounds show that the engine is about to break down for good', 'The sounds show that the speaker is angry about the long delay'],
        why: 'Only a hiss and a cough are heard: the tiny sounds make us notice how still everything else is.',
      },
    ],
    deep: [
      {
        ask: 'What is the mood of the poem?',
        right: 'Still and timeless: a single remembered minute of peace',
        wrong: ['Restless and impatient: he cannot wait for the train to go on', 'Sad and lonely: he regrets that no one came to meet him there', 'Tense and fearful: he senses danger in the empty station'],
        why: 'Heat, stillness, flowers and “high cloudlets”, then birdsong spreading outward: one minute held in memory, “No whit less still and lonely fair”.',
      },
      {
        ask: 'Why might the poem open “Yes. I remember Adlestrop—”?',
        right: 'It sounds like a reply in conversation, so the memory feels personal',
        wrong: ['It shows that he has forgotten most of the journey and recalls nothing else', 'It shows that Adlestrop is his home town, where he grew up as a young boy', 'It shows that he is answering a question in an exam on English geography'],
        why: '“Yes.” answers someone, as if he had been asked about the place; the plain, spoken start makes the poem a memory shared with us.',
      },
    ],
  },
  {
    verse: ATHLETE_ALL,
    lead: `${titled(ATHLETE_ALL.poem)} by ${ATHLETE_ALL.poem.author} (to be “chaired” is to be carried in triumph; a laurel crown was the prize for a winner):`,
    basic: [
      {
        ask: 'What two journeys home does the poem compare?',
        right: 'Carried home shoulder-high as a winner, and carried home in his coffin',
        wrong: ['His first race as a young boy, and the last race he won as a grown man', 'His journey to the city to race, and his journey home after losing', 'The day he left to fight in a war, and the day he came home a hero'],
        why: '“home we brought you shoulder-high” after the race; “To-day … Shoulder-high we bring you home” to be buried.',
      },
      {
        ask: 'What is the “stiller town” in the second stanza?',
        right: 'The grave: he is now one of the quiet dead',
        wrong: ['A quieter village nearby where he has moved', 'The town at night, after the cheering is over', 'A town where racing has been banned for good'],
        why: 'He is set down at his threshold as “Townsman of a stiller town”: the place of the dead.',
      },
    ],
    close: [
      {
        ask: 'Why does the speaker call him “Smart lad”?',
        right: 'He has died before his glory fades, so he will never outlive his fame',
        wrong: ['He was clever enough to win the race by playing a trick on the others', 'He studied hard at school as well as winning races for the town', 'He left the town just before the people turned against him'],
        why: '“Smart lad, to slip betimes away / From fields where glory does not stay”: dying young, he escapes seeing his record broken.',
      },
      {
        ask: 'What does the image of the laurel and the rose suggest?',
        right: 'Glory withers faster even than beauty, which is short-lived',
        wrong: ['The athlete loved gardening and grew both plants beside his door', 'Glory lasts far longer than beauty, which fades in a single day', 'The winner’s crown was made of roses, as was the custom then'],
        why: '“early though the laurel grows / It withers quicker than the rose”: the winner’s laurel fades even faster than a rose.',
      },
    ],
    deep: [
      {
        ask: 'What is the tone of the poem?',
        right: 'Gently ironic: it consoles the dead youth by praising his early death',
        wrong: ['Angrily grieving: it blames the town for the young man’s death', 'Openly joyful: it celebrates another great victory for the town', 'Coldly indifferent: it shows that no one cares about the dead'],
        why: 'It treats dying young as a lucky escape from “lads that wore their honours out”: a tender irony that is also a lament.',
      },
      {
        ask: 'What is the effect of “shoulder-high” in both the first and second stanzas?',
        right: 'The same words for his victory and his funeral make the two mirror each other',
        wrong: ['The repetition shows that the townsmen are tired of carrying the athlete about', 'The repetition shows that the athlete was the tallest young man in the town', 'The repetition shows that he won the same race twice in the same summer'],
        why: '“home we brought you shoulder-high” becomes “Shoulder-high we bring you home”: the words are reversed, as his fortune is.',
      },
    ],
  },
];

function unseenQ(rng: Rng, d: Difficulty): GenOutput {
  const u = rng.pick(UNSEEN);
  const asks = d === 1 ? u.basic : d === 2 ? u.close : [rng.pick(u.close), ...u.deep];
  return {
    prompt: `${u.lead}\n\n${verseBlock(u.verse)}\n\nAnswer ${asks.length === 2 ? 'both questions' : 'all three questions'}.`,
    parts: asks.map((a, i) => part(mc(rng, a.right, a.wrong), { label: `${i + 1}. ${a.ask}` })),
    hints: [HINT],
    solution: asks.map((a, i) => `${i + 1}. ${end(a.right)} ${a.why}`),
  };
}

export const UNSEEN_SKILLS: SkillDef[] = [
  skill({
    id: 'e12-unseen-poem',
    name: 'Reading an unseen poem',
    description: 'Read a poem you have not studied and answer questions on its situation, structure, imagery, tone and meaning.',
    outcomes: OUT,
    lessonId: L,
    format: 'mc',
    gen: unseenQ,
  }),
];
