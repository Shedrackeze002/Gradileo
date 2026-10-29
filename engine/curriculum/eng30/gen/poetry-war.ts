/**
 * Grade 12 English, lesson 2.2: Poetry of War and Witness (12-B1). How poets bear witness to war
 * through form, imagery and irony: Owen (“Futility”, “Strange Meeting”, “The Send-off”), Rosenberg,
 * Hardy’s “Channel Firing”, Whitman’s Drum-Taps, Edward Thomas and Amy Lowell’s “Patterns”, one poem at
 * a time and in pairs.
 */
import { mc, part, skill, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { titled } from '../../eng10/gen/texts.ts';
import {
  BREAK_OF_DAY_ALL, CAVALRY_ALL, CHANNEL_END, CHANNEL_GOD, CHANNEL_OPENING, DRUMS_FIRST, FUTILITY_ALL, IN_MEMORIAM_ALL, OWL_ALL, PATTERNS_END, PATTERNS_LETTER,
  SEND_OFF_ALL, STRANGE_END, STRANGE_OPENING, STRANGE_TRUTH, VIGIL_OPENING, VIGIL_SILENCE, end, verseBlock, type Verse,
} from './poems.ts';
import { itemQ, type Ask, type Item } from './poetry-ode.ts';

const L = 'e12-2-2';
const OUT = ['12-B1'];
const HINT = 'Ask what the poem lets you see of war, from where (the front, home, the grave), and whether it states its feeling or makes you feel it through image, form and irony.';

const by = (v: Verse) => `${titled(v.poem)} by ${v.poem.author}`;

/** One poem at a time: what it shows (difficulty 1) and how it bears witness (difficulty 2). */
const SEEN: Item[] = [
  {
    verses: [FUTILITY_ALL],
    lead: `${by(FUTILITY_ALL)}, a soldier, written in France (“fatuous” means foolish):`,
    ask: 'What is happening in the poem?',
    right: 'Soldiers lay a dead comrade in the sun, hoping that it will wake him',
    wrong: ['A soldier wakes at home in the sun after a long dream of France', 'Farm workers sow their fields as the sun melts the morning snow', 'A wounded soldier is carried home from France to be buried'],
    why: '“Move him into the sun … If anything might rouse him now / The kind old sun will know”: the man is dead, “too hard to stir”.',
  },
  {
    verses: [CHANNEL_OPENING],
    lead: `The opening of ${by(CHANNEL_OPENING)}, dated April 1914 (a “chancel” is the part of a church near the altar; the “glebe” is church land):`,
    ask: 'Who is speaking?',
    right: 'One of the dead, buried in a churchyard by the sea',
    wrong: ['A sailor aboard a warship firing its guns out at sea', 'A priest standing alone in the chancel late at night', 'A farmer whose cow and hounds are woken by the guns'],
    why: 'The guns “Shook all our coffins as we lay”, and the dead “sat upright”, thinking it was Judgment Day.',
  },
  {
    verses: [VIGIL_OPENING],
    lead: `The opening of ${by(VIGIL_OPENING)}, from *Drum-Taps*, his poems of the American Civil War:`,
    ask: 'What is the speaker’s situation?',
    right: 'He keeps watch all night by a young comrade killed in battle',
    wrong: ['He guards a prisoner through the night while the battle goes on', 'He waits through the night for news of his son’s regiment', 'He stands on sentry duty, watching for the enemy to return'],
    why: 'The comrade, whom he calls “my son”, “dropt at my side”; the speaker fights on, then returns to keep a “Vigil strange” beside the body.',
  },
  {
    verses: [IN_MEMORIAM_ALL],
    lead: `${by(IN_MEMORIAM_ALL)}, written in 1915 while Thomas was waiting to go to the war:`,
    ask: 'What do the flowers in the wood make the speaker think of?',
    right: 'The young men away at war who will never gather them again',
    wrong: ['The Easter service he will go to that night in the village', 'The sweethearts who picked them to send to the soldiers', 'The gardeners who planted the wood many years ago'],
    why: 'The flowers “call into mind the men, / Now far from home, who … should / Have gathered them and will do never again.”',
  },
  {
    verses: [SEND_OFF_ALL],
    lead: `${by(SEND_OFF_ALL)}, about soldiers leaving a country station for the front:`,
    ask: 'What does the comparison “As men’s are, dead” suggest about the soldiers?',
    right: 'The flowers on their chests already mark them out as dead men',
    wrong: ['They are ashamed of the flowers the women have given them', 'The flowers will be given to the families of men who have died', 'They are taking flowers to lay on a friend’s grave in France'],
    why: 'Their breasts are “stuck all white with wreath and spray / As men’s are, dead”: the send-off flowers look like funeral flowers.',
  },
];

const HOW: Item[] = [
  {
    verses: [FUTILITY_ALL],
    lead: `${by(FUTILITY_ALL)} (“fatuous” means foolish):`,
    ask: 'How does the speaker’s thought change from the first stanza to the second?',
    right: 'From hope that the sun can wake him to bitter questioning of why life exists',
    wrong: ['From grief at the death to calm acceptance that the young man is now at rest', 'From anger at the enemy to forgiveness of the soldiers who killed the young man', 'From fear of the cold and the snow to joy at the warmth of the morning sun'],
    why: 'The first stanza trusts “The kind old sun”; the second asks “Was it for this the clay grew tall? / —O what made fatuous sunbeams toil / To break earth’s sleep at all?”',
  },
  {
    verses: [STRANGE_END],
    lead: `The end of ${by(STRANGE_END)}. The speaker has escaped from battle down a tunnel to a hall where a dead man speaks to him (“loath” means unwilling):`,
    ask: 'What does the end of the poem reveal?',
    right: 'The dead man is an enemy soldier whom the speaker killed the day before',
    wrong: ['The dead man is the speaker’s brother, killed in an earlier battle', 'The speaker is only dreaming, and wakes up safe in his trench', 'The dead man is a prisoner the speaker had helped to escape'],
    why: '“I am the enemy you killed, my friend … for so you frowned / Yesterday through me as you jabbed and killed.” Calling him “friend” makes the enemy a brother.',
  },
  {
    verses: [STRANGE_OPENING],
    lead: `The opening of ${by(STRANGE_OPENING)}. Look at the endings of the lines: escaped / scooped, groined / groaned, bestirred / stared:`,
    ask: 'What are these line endings, and what is their effect?',
    right: 'Pararhyme: the consonants match but the vowels clash, an unsettling echo',
    wrong: ['Perfect rhyme: the words chime exactly, like a hymn sung in a church', 'Alliteration: each pair begins with the same sound, like gunfire', 'Internal rhyme: words inside the lines chime, like a marching song'],
    why: 'In “escaped / scooped” and “groined / groaned” the consonants match and the vowels differ: pararhyme, which Owen used so that the echo never quite resolves, like the meeting itself.',
  },
  {
    verses: [STRANGE_TRUTH],
    lead: `In ${by(STRANGE_TRUTH)}, the dead man describes what died with him:`,
    ask: 'What does he say has been lost?',
    right: 'The truth about war, its pity, which he can no longer tell',
    wrong: ['The gold and the land he had saved for his family before the war', 'His faith in God, which the long years of fighting have destroyed', 'The love of the woman who has waited for him at home all these years'],
    why: '“I mean the truth untold, / The pity of war, the pity war distilled”: what dies with him is the witness he could have given.',
  },
  {
    verses: [SEND_OFF_ALL],
    lead: `${by(SEND_OFF_ALL)}:`,
    ask: 'What is the effect of “So secretly, like wrongs hushed-up, they went”?',
    right: 'It suggests that sending the men away is a shameful, hidden act',
    wrong: ['It shows that the soldiers are spies setting off on a secret mission', 'It suggests that the men have done wrong and are being punished for it', 'It shows that the station is quiet because the train leaves so early'],
    why: 'The simile compares the departure itself to “wrongs hushed-up”: the wrong is done to the men, quietly, by those who send them.',
  },
  {
    verses: [BREAK_OF_DAY_ALL],
    lead: `${by(BREAK_OF_DAY_ALL)}, a private soldier killed in 1918 (a “parapet” is the top of a trench; “druid” suggests ancient and pagan):`,
    ask: 'Why are the soldiers “Less chanced than you for life”?',
    right: 'The rat can cross freely between the lines, while fine young men die',
    wrong: ['The rat has found food in the trenches, while the soldiers go hungry', 'The rat is safe from the poppies, which are poisonous to the soldiers', 'The rat will be kept as a pet by the soldiers once the war has ended'],
    why: 'The rat touches “this English hand” and will touch a German one, crossing “the sleeping green between”, while “haughty athletes” lie “Sprawled in the bowels of the earth”.',
  },
  {
    verses: [CHANNEL_GOD],
    lead: `From ${by(CHANNEL_GOD)}, dated April 1914. God tells the dead that the noise is only gunnery practice:`,
    ask: 'What does God’s reply suggest about the living?',
    right: 'Nations are as mad for war as ever, with no thought of Christ’s teaching',
    wrong: ['The world has grown much kinder and more peaceful since the dead were buried', 'The guns are a sure sign that the Day of Judgment has finally come', 'God is pleased that the nations are growing so strong and so well armed'],
    why: '“All nations striving strong to make / Red war yet redder. Mad as hatters / They do no more for Christés sake / Than you who are helpless in such matters.”',
  },
  {
    verses: [VIGIL_SILENCE],
    lead: `From ${by(VIGIL_SILENCE)}, as the speaker sits by the body through the night:`,
    ask: 'How does Whitman show the speaker’s grief?',
    right: 'Through silence and long, slow lines: no tears, only a vigil',
    wrong: ['Through angry shouts at the enemy, set out in short, sharp lines', 'Through a formal rhyming elegy that praises the boy’s courage', 'Through a prayer asking God to bring the young soldier back to life'],
    why: '“But not a tear fell, not even a long-drawn sigh … not a tear, not a word, / Vigil of silence, love and death”: grief shown by stillness, in long, unrhymed lines.',
  },
  {
    verses: [CAVALRY_ALL],
    lead: `${by(CAVALRY_ALL)}, from *Drum-Taps* (a “guidon” is a small cavalry flag):`,
    ask: 'How does the poem bear witness to the war?',
    right: 'Like a painting: vivid colour and movement, with no comment',
    wrong: ['Like a sermon: it tells the reader what to believe about the war', 'Like a ballad: it tells one soldier’s story from beginning to end', 'Like a protest: it angrily lists the names of the war’s dead'],
    why: '“Behold … each person a picture”: the soldiers, horses and flags are shown in colour and motion, and the poet adds no judgement.',
  },
  {
    verses: [DRUMS_FIRST],
    lead: `The first stanza of ${by(DRUMS_FIRST)}, written at the start of the American Civil War:`,
    ask: 'What does the stanza show war doing?',
    right: 'Bursting into every part of ordinary life and ending its peace',
    wrong: ['Bringing a town together for a joyful parade and a village wedding', 'Taking place far away, where ordinary people never even hear it', 'Being stopped by the prayers of a church full of worshippers'],
    why: 'The drums burst “Into the solemn church”, “Into the school”, leave “not the bridegroom quiet” and give the farmer no peace.',
  },
  {
    verses: [PATTERNS_LETTER],
    lead: `From ${by(PATTERNS_LETTER)}. A lady walks in a formal garden in her stiff gown (“Thursday se’nnight” means a week last Thursday):`,
    ask: 'From where does the poem bear witness to war?',
    right: 'From home: a woman learns her fiancé has died and hides her grief',
    wrong: ['From the front: a soldier writes his last letter to the woman he loves', 'From the Duke’s view: he regrets sending her lover away to Flanders', 'From the footman’s view: he watches his mistress weep over a letter'],
    why: 'She is told that “Lord Hartwell / Died in action”, and answers only, “No, no answer”: the war is witnessed in a garden, through a grief she keeps hidden.',
  },
  {
    verses: [OWL_ALL],
    lead: `${by(OWL_ALL)}, written in 1915:`,
    ask: 'What does the owl’s cry make the speaker realize?',
    right: 'His warmth and food contrast with soldiers and the poor in the cold',
    wrong: ['He should have stayed out on the cold hill to watch the winter stars', 'The inn is haunted, and he will not be able to sleep there that night', 'Winter is nearly over, and he will soon be able to travel home again'],
    why: 'The cry tells him “what I escaped / And others could not”, and his food and rest are “Salted and sobered” by the voice “Speaking for all who lay under the stars, / Soldiers and poor”.',
  },
];

/** What a closing image or line suggests (difficulty 3). */
const CLOSE: Item[] = [
  {
    verses: [BREAK_OF_DAY_ALL],
    lead: `${by(BREAK_OF_DAY_ALL)} (a “parapet” is the top of a trench wall):`,
    ask: 'What is ironic about the poppy at the end?',
    right: 'The flower he picked survives behind his ear while the men around him die',
    wrong: ['Poppies stand for peace, though these ones grow on a battlefield in France', 'The poppy is bright red, but the dust has turned it completely white', 'He picks the poppy as a gift for the rat, but the rat runs off with it'],
    why: 'Poppies “whose roots are in man’s veins / Drop, and are ever dropping; / But mine in my ear is safe, / Just a little white with the dust”: as safe, the reader feels, as he is.',
  },
  {
    verses: [CHANNEL_END],
    lead: `The last stanza of ${by(CHANNEL_END)}, dated April 1914 (Stourton Tower is an eighteenth-century tower; Camelot is King Arthur’s legendary court):`,
    ask: 'What does the closing list of places suggest?',
    right: 'War echoes through history and legend: it has always been with us',
    wrong: ['They are the towns where the dead in the churchyard lived before they died', 'They are the targets the gunners hope to destroy when the real war comes', 'They mark the route the soldiers will march along on their way to the coast'],
    why: 'The guns’ “readiness to avenge” reaches Stourton Tower, Camelot and “starlit Stonehenge”: the modern guns join a past of war as old as legend.',
  },
  {
    verses: [PATTERNS_END],
    lead: `The end of ${by(PATTERNS_END)}. Her fiancé, Lord Hartwell, has been killed fighting in Flanders:`,
    ask: 'What does the last line suggest?',
    right: 'She questions every pattern, from her gown to the war that killed him',
    wrong: ['She wants to plant a new garden with no paths or patterns in it at all', 'She regrets that she wore the wrong gown on the day she heard he had died', 'She asks the Duke to explain the battle plan that ended in his death'],
    why: 'Her life is “Boned and stayed”, the paths are “patterned”, and he died “In a pattern called a war”: “Christ! What are patterns for?” turns on all of them.',
  },
];

interface Pair {
  a: Verse;
  aNote: string;
  b: Verse;
  bNote: string;
  asks: Ask[];
}

/** Pairs of poems compared (difficulty 3). The first question is what they share. */
const PAIRS: Pair[] = [
  {
    a: FUTILITY_ALL,
    aNote: 'Owen, a soldier in France, 1918',
    b: VIGIL_SILENCE,
    bNote: 'Whitman, the American Civil War; the speaker sits by a dead young comrade',
    asks: [
      {
        ask: 'What do both poems respond to?',
        right: 'A young soldier’s death, seen by a comrade beside his body',
        wrong: ['A soldier’s journey home from the war to his waiting family', 'A battle seen from far away by people who are safe at home', 'The burial of a famous general with music and flags'],
        why: 'Poem A’s soldiers try to wake a dead man with the sun; Poem B’s speaker keeps a vigil beside the body of “my son and my soldier”.',
      },
      {
        ask: 'How do the speakers’ responses differ?',
        right: 'Poem A ends in bitter questions about why life was made; Poem B in silent love',
        wrong: ['Poem A ends in calm acceptance of the death; Poem B ends in angry, bitter questions', 'Both poems end by blaming the enemy generals who sent the young men to fight', 'Both poems end in a prayer that the dead man will rise again on the next morning'],
        why: 'Poem A asks “O what made fatuous sunbeams toil / To break earth’s sleep at all?”; Poem B’s speaker sits “not a tear, not a word”, in a “Vigil of silence, love and death”.',
      },
      {
        ask: 'How do their forms differ?',
        right: 'Poem A has two short, half-rhymed stanzas; Poem B long, unrhymed lines',
        wrong: ['Both poems are sonnets, each with fourteen lines and a turn at line nine', 'Poem A uses long, unrhymed lines; Poem B uses two short, rhyming stanzas', 'Both poems use the same short, regular stanza with a refrain at the end'],
        why: 'Poem A rhymes loosely (“sun” / “once”, “seeds” / “sides”) in two compact stanzas; Poem B’s long Whitman lines unroll like the night itself.',
      },
    ],
  },
  {
    a: STRANGE_END,
    aNote: 'Owen; the speaker meets a dead man in an underground hall',
    b: BREAK_OF_DAY_ALL,
    bNote: 'Rosenberg, a private soldier killed in 1918',
    asks: [
      {
        ask: 'What idea do both poems share?',
        right: 'The line between enemies is false: both sides are alike',
        wrong: ['The enemy is cruel and must be defeated at any cost to win the war', 'Animals suffer more in war than any of the soldiers who fight it', 'The war will soon be over and everyone will go home together'],
        why: 'In Poem A the enemy he killed calls him “my friend”; in Poem B the rat touches an English hand and “will do the same to a German”.',
      },
      {
        ask: 'How does each poem make that point?',
        right: 'Poem A through a dead enemy’s words; Poem B through a rat that crosses no man’s land',
        wrong: ['Poem A through a rat that crosses no man’s land; Poem B through a dead enemy’s words', 'Both poems through a general’s speech to his troops on the eve of a battle', 'Both poems through a letter home from a soldier who is about to die'],
        why: 'Owen gives the dead enemy the poem’s last words; Rosenberg lets a “queer sardonic rat” do what no soldier can.',
      },
    ],
  },
  {
    a: IN_MEMORIAM_ALL,
    aNote: 'Edward Thomas, 1915, at home in England',
    b: SEND_OFF_ALL,
    bNote: 'Owen; soldiers leave a country station for the front',
    asks: [
      {
        ask: 'What image do both poems use?',
        right: 'Flowers, as a sign of men who will not come back',
        wrong: ['Guns, which stand for the power and pride of the army', 'Bells, which ring out to celebrate the end of the war', 'The sea, which carries the soldiers away to France'],
        why: 'Poem A’s flowers will never be gathered by the absent men; Poem B’s wreaths make the soldiers look like “men’s are, dead”.',
      },
      {
        ask: 'How do the poems bear witness differently?',
        right: 'Poem A through an absence in a wood; Poem B through a secret departure',
        wrong: ['Poem A through a battle in France; Poem B through a funeral held at home', 'Poem A through a soldier’s letter; Poem B through a general’s orders', 'Both poems through graphic scenes of fighting on the front line'],
        why: 'Poem A finds the war in what is missing at home; Poem B watches men leave “like wrongs hushed-up” and wonders how few will return.',
      },
    ],
  },
  {
    a: DRUMS_FIRST,
    aNote: 'Whitman, written in 1861 at the start of the American Civil War',
    b: CHANNEL_OPENING,
    bNote: 'Hardy, dated April 1914, four months before the First World War',
    asks: [
      {
        ask: 'What do both poems show?',
        right: 'War’s noise breaking into a church and into the peace of ordinary life',
        wrong: ['A great victory celebrated with bells and bands in a crowded town', 'Soldiers fighting hand to hand in the mud of a muddy battlefield', 'A quiet countryside untouched by the war going on far away'],
        why: 'Poem A’s drums burst “Into the solemn church”; Poem B’s guns break “the chancel window-squares” and wake the dead.',
      },
      {
        ask: 'How do their tones differ?',
        right: 'Poem A commands the drums with urgent energy; Poem B treats the guns with grim irony',
        wrong: ['Poem A treats the drums with grim irony; Poem B commands the guns with urgent energy', 'Both poems are gentle and calm, describing a peaceful summer evening in the country', 'Both poems are joyful, celebrating the coming of war as a great adventure for the young'],
        why: 'Poem A shouts “Beat! beat! drums!—blow! bugles! blow!”; in Poem B the dead mistake gunnery practice for Judgment Day, and God calls the nations “Mad as hatters”.',
      },
    ],
  },
];

function pairQ(rng: Rng): GenOutput {
  const p = rng.pick(PAIRS);
  const asks = p.asks.length > 2 ? [p.asks[0], ...rng.sample(p.asks.slice(1), 1)] : p.asks;
  const head = (v: Verse, label: string, note: string) => `**${label}:** ${titled(v.poem)} by ${v.poem.author} (${note})`;
  return {
    prompt: [`Read the two poems, then answer both questions.`, head(p.a, 'Poem A', p.aNote), verseBlock(p.a), head(p.b, 'Poem B', p.bNote), verseBlock(p.b)].join('\n\n'),
    parts: asks.map((a, i) => part(mc(rng, a.right, a.wrong), { label: `${i + 1}. ${a.ask}` })),
    hints: [HINT],
    solution: asks.map((a, i) => `${i + 1}. ${end(a.right)} ${a.why}`),
  };
}

function warQ(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) return itemQ(rng, rng.pick(SEEN), HINT);
  if (d === 2) return itemQ(rng, rng.pick(HOW), HINT);
  return rng.chance(0.55) ? pairQ(rng) : itemQ(rng, rng.pick(CLOSE), HINT);
}

export const WAR_SKILLS: SkillDef[] = [
  skill({
    id: 'e12-war-poetry',
    name: 'Poetry of war and witness',
    description: 'Analyse and compare how poets bear witness to war through situation, form, imagery and irony.',
    outcomes: OUT,
    lessonId: L,
    format: 'mc',
    gen: warQ,
  }),
];
