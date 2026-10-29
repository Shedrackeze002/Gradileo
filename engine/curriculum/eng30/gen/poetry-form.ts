/**
 * Grade 12 English, lesson 2.3: Modern Forms, Sound and Sense (12-B1). How poets from Hopkins to the
 * Imagists and the Harlem Renaissance reshaped the sonnet and freed the line, and how the sound of a line
 * (alliteration, onomatopoeia, enjambment, caesura, repetition) supports what it says.
 */
import { mc, part, skill, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { titled } from '../../eng10/gen/texts.ts';
import {
  AMERICA_ALL, AUTUMN_OOZINGS, AUTUMN_SONGS, BULLION_ALL, CAVALRY_ALL, DRUMS_FIRST, FROST_END, MARVEL_ALL, NIGHTINGALE_DARK, NIGHTINGALE_FORLORN, PATTERNS_END, PIED_ALL,
  TIME_RELIEF_ALL, TINTERN_PAST, WIND_THORNS, WINDHOVER_OCTAVE, WINDHOVER_SESTET, end, linesOf, verseBlock, withBold, type Verse,
} from './poems.ts';
import { itemQ, type Item } from './poetry-ode.ts';

const L = 'e12-2-3';
const OUT = ['12-B1'];

const by = (v: Verse) => `${titled(v.poem)} by ${v.poem.author}`;

// ============================================================================ modern forms

const FORM_HINT = 'Count the lines, mark the rhymes with letters and look for the turn. Then ask why this poem, saying this, takes this shape.';

const CURTAL = 'A curtal sonnet: a sonnet cut to ten and a half lines';
const PETRARCHAN = 'A Petrarchan sonnet: an eight-line octave and a sestet';
const SHAKESPEAREAN = 'A Shakespearean sonnet: three quatrains and a couplet';
const IMAGIST = 'Imagist free verse: short unrhymed lines on one image';
const FREE = 'Free verse: long, unrhymed lines with no regular metre';
const BALLAD = 'A ballad: rhyming quatrains that tell a simple story';
const VILLANELLE = 'A villanelle: nineteen lines that turn on two refrains';
const BLANK = 'Blank verse: unrhymed, regular iambic pentameter lines';

/** Which form the poem takes (difficulty 1). Each item’s wrong forms are ones the poem plainly is not. */
const FORMS: Item[] = [
  {
    verses: [PIED_ALL],
    lead: `${by(PIED_ALL)}, written in 1877 (“brinded” means streaked; “stipple” is a pattern of dots):`,
    ask: 'Which form does the poem take?',
    right: CURTAL,
    wrong: [PETRARCHAN, SHAKESPEAREAN, BALLAD],
    why: 'Six lines, then four and a half (“Praise him.” is the half line): Hopkins’s own name for this shortened sonnet was the curtal sonnet.',
  },
  {
    verses: [MARVEL_ALL],
    lead: `${by(MARVEL_ALL)}, a poet of the Harlem Renaissance (Tantalus and Sisyphus are figures from Greek myth, punished for ever):`,
    ask: 'Which form does the poem take?',
    right: SHAKESPEAREAN,
    wrong: [PETRARCHAN, CURTAL, BLANK],
    why: 'Fourteen rhymed lines that close on a rhyming couplet (“thing” / “sing”), the mark of the Shakespearean sonnet.',
  },
  {
    verses: [AMERICA_ALL],
    lead: `${by(AMERICA_ALL)}, a Jamaican-born poet of the Harlem Renaissance:`,
    ask: 'Which form does the poem take?',
    right: SHAKESPEAREAN,
    wrong: [PETRARCHAN, BALLAD, BLANK],
    why: 'Fourteen lines: three quatrains of alternate rhymes, then a closing couplet (“hand” / “sand”). That is a Shakespearean sonnet.',
  },
  {
    verses: [TIME_RELIEF_ALL],
    lead: `${by(TIME_RELIEF_ALL)}:`,
    ask: 'Which form does the poem take?',
    right: PETRARCHAN,
    wrong: [SHAKESPEAREAN, CURTAL, VILLANELLE],
    why: 'Eight lines rhyming ABBAABBA, a break, then six lines on new rhymes: an octave and a sestet, with no closing couplet.',
  },
  {
    verses: [BULLION_ALL],
    lead: `${by(BULLION_ALL)}, from the anthology *Some Imagist Poets*:`,
    ask: 'Which form does the poem take?',
    right: IMAGIST,
    wrong: [SHAKESPEAREAN, BALLAD, BLANK],
    why: 'Short, unrhymed lines of no set length, built on one picture: thoughts like “silver hail-stones” shut in the heart. Lowell was a leading Imagist.',
  },
  {
    verses: [CAVALRY_ALL],
    lead: `${by(CAVALRY_ALL)}, from *Drum-Taps* (a “guidon” is a small cavalry flag):`,
    ask: 'Which form does the poem take?',
    right: FREE,
    wrong: [BLANK, BALLAD, VILLANELLE],
    why: 'Long lines of very different lengths, no rhyme and no regular beat: Whitman’s free verse.',
  },
];

/** How the form carries the meaning (difficulty 2). */
const FORM_HOW: Item[] = [
  {
    verses: [MARVEL_ALL],
    lead: `${by(MARVEL_ALL)}, a Shakespearean sonnet (Tantalus and Sisyphus are figures from Greek myth, punished for ever):`,
    ask: 'What does the closing couplet do?',
    right: 'After twelve lines of God’s puzzles, it names the one that is his own',
    wrong: ['It answers every question the poem has raised and ends in simple praise', 'It turns from God to the beauty of the moles and trees of the natural world', 'It explains how Tantalus and Sisyphus were finally set free by God’s mercy'],
    why: 'Lines 1–12 grant that God is good but list cruelties no one can explain; the couplet adds the one that matters most to the speaker: “To make a poet black, and bid him sing!”',
  },
  {
    verses: [AMERICA_ALL],
    lead: `${by(AMERICA_ALL)}, a Shakespearean sonnet:`,
    ask: 'How does the strict sonnet form suit what the speaker says?',
    right: 'Its tight control matches a speaker who holds his love and anger in balance',
    wrong: ['Its loose, broken shape shows a speaker who has lost all control of his rage', 'Its love-sonnet form shows that he feels nothing but simple love for America', 'Its story-telling shape follows his long journey to America as a young boy'],
    why: 'He loves this “cultured hell” and stands in it “with not a shred / Of terror, malice”: fourteen controlled lines hold feelings that pull against each other.',
  },
  {
    verses: [PIED_ALL],
    lead: `${by(PIED_ALL)} (“brinded” means streaked; “stipple” is a pattern of dots):`,
    ask: 'How does the shape of the poem support its meaning?',
    right: 'Lists of dappled things lead to a short line praising their changeless maker',
    wrong: ['Long lines describe God, and the short lines describe the small things of nature', 'Regular, even stanzas show that everything in nature is really the same colour', 'A long story about a farmer ends with a moral about the value of hard work'],
    why: 'Line after line piles up “dappled things”; then “He fathers-forth whose beauty is past change: / Praise him.” The last line is cut to two words, for the one thing that does not change.',
  },
  {
    verses: [BULLION_ALL],
    lead: `${by(BULLION_ALL)}, an Imagist poem:`,
    ask: 'How does the poem’s Imagist form suit what it says?',
    right: 'It gives one unexplained image: thoughts as silver shut in the heart',
    wrong: ['It tells a long story in rhyming stanzas about a miser who hoards his silver', 'It argues in a strict sonnet that wealth is worth far more than any love', 'It explains in plain words why the speaker cannot tell her lover her thoughts'],
    why: 'Short, unrhymed lines build the one picture of thoughts that “Chink against my ribs” like “silver hail-stones”, and leave the reader to feel what it means.',
  },
  {
    verses: [TIME_RELIEF_ALL],
    lead: `${by(TIME_RELIEF_ALL)}, a Petrarchan sonnet:`,
    ask: 'What changes at the turn, after line 8?',
    right: 'She turns from what time cannot heal to the places that still hold him',
    wrong: ['She turns from grief to relief, as time has at last healed all her pain', 'She turns from her memories of him to her plans to leave the city for good', 'She turns from the mountains to the sea, describing her long journey home'],
    why: 'The octave says time brings no relief; the sestet turns to the places she fears, and even a place “Where never fell his foot” makes her remember him.',
  },
  {
    verses: [PATTERNS_END],
    lead: `The end of ${by(PATTERNS_END)}. A lady in a stiff gown walks in a formal garden; her fiancé has been killed in the war:`,
    ask: 'How do the short, clipped lines near the end suit the speaker’s situation?',
    right: 'Lines like “Boned and stayed” are as tight as the gown that holds her in',
    wrong: ['Lines like “Boned and stayed” are relaxed and free, as she is now that he is gone', 'The short lines show she is in a hurry to leave the garden and go to Flanders', 'The short lines are a song she sings to her footman while she waits in the garden'],
    why: 'Her body is “Boned and stayed” and “guarded from embrace / By each button, hook, and lace”: the lines are as cramped as the life the pattern allows her.',
  },
  {
    verses: [WINDHOVER_OCTAVE],
    lead: `The octave of ${by(WINDHOVER_OCTAVE)}, written in 1877 in what Hopkins called sprung rhythm, which counts only the stresses in a line (a “minion” is a favourite; a “dauphin” is a prince):`,
    ask: 'What is the effect of the crowded stresses and long run-on lines?',
    right: 'The rushing rhythm imitates the falcon’s swoop and the speaker’s breathless awe',
    wrong: ['The slow, even rhythm imitates a bird perched quietly on a branch at dusk', 'The flat, plain rhythm shows that the speaker is bored by the bird he watches', 'The short lines and pauses show the falcon stuck in the wind and unable to fly'],
    why: 'Stresses pile up (“dapple-dawn-drawn Falcon”) and lines run on, even through a word (“king- / dom”), as the bird rides, swings and sweeps: “My heart in hiding / Stirred for a bird”.',
  },
];

/** Harder questions on form: Lowell’s cadence, the curtal sonnet’s proportions, the turn and the close (difficulty 3). */
const FORM_DEEP: Item[] = [
  {
    verses: [BULLION_ALL],
    lead: 'In the preface to *Sword Blades and Poppy Seed* (1914), Amy Lowell called her free verse “unrhymed cadence”, built on “the rhythm of the speaking voice with its necessity for breathing” rather than on a strict metre. Here is a poem she published the next year:',
    ask: 'Which feature of the poem best shows her idea?',
    right: 'Its lines end where a speaking voice would pause for breath',
    wrong: ['Its lines all have ten syllables, so the rhythm stays perfectly regular', 'Its lines rhyme in pairs, so the cadence comes from the matching sounds', 'Its lines are prose sentences cut at random to fit the width of the page'],
    why: 'Each line is a breath: “My thoughts / Chink against my ribs”. Lowell said that merely chopping prose into lengths does not make cadence, and the lines neither rhyme nor keep a count.',
  },
  {
    verses: [PIED_ALL],
    lead: `Hopkins called ${titled(PIED_ALL.poem)} a curtal (shortened) sonnet: built in the proportions of a Petrarchan sonnet, but six lines and then four and a half instead of eight and six.`,
    ask: 'How does that shape divide the poem’s thought?',
    right: 'Lines 1–6 list dappled things; the last part widens to all changing things and their maker',
    wrong: ['Lines 1–6 describe the seasons; the last part turns to criticize farms and trades', 'Lines 1–6 describe one trout; the last part follows it as it swims down the river to the sea', 'Lines 1–6 ask questions; the last part answers each of them in the same order, one by one'],
    why: 'The first part names skies, trout, finches, fields and trades; the second gathers “All things counter, original, spare, strange” and ends on the God who “fathers-forth” them.',
  },
  {
    verses: [WINDHOVER_SESTET],
    lead: `The sestet of ${by(WINDHOVER_SESTET)}. The octave described a falcon riding the wind (“sillion” is the soil of a furrow; a “chevalier” is a knight):`,
    ask: 'What do the closing images of the furrow and the embers suggest?',
    right: 'Even plain toil and broken, falling things can shine with sudden glory',
    wrong: ['Farm work is dull and slowly destroys the beauty of the countryside', 'The fire has spread from the hearth and is burning the farmer’s field', 'The falcon has been shot down and falls burning into the furrow below'],
    why: '“No wonder of it”: the plough’s “shéer plód” makes the furrow “Shine”, and dull embers “gash gold-vermillion” as they fall. Glory breaks out of ordinary, even broken, things.',
  },
  {
    verses: [AMERICA_ALL],
    lead: `${by(AMERICA_ALL)}, a Shakespearean sonnet:`,
    ask: 'What does the closing couplet add to the sonnet?',
    right: 'A prophecy that time will wear away even America’s might and wonders',
    wrong: ['A promise that he will soon leave America and go back to his homeland', 'A wish that America’s treasures will be buried safely for the future', 'A memory of the beach where he first came ashore in America as a boy'],
    why: 'He sees her “might and granite wonders” sinking “Beneath the touch of Time’s unerring hand, / Like priceless treasures sinking in the sand”: no empire outlasts time.',
  },
  {
    verses: [TIME_RELIEF_ALL],
    lead: `${by(TIME_RELIEF_ALL)}:`,
    ask: 'Why does the last line undo the relief she feels?',
    right: 'Saying that a place holds no memory of him is itself remembering him',
    wrong: ['She realizes that he once lived in the quiet place she has just entered', 'She sees him walk into the quiet place and is struck dumb with shock', 'She is ashamed to have said aloud something that she knows is not true'],
    why: 'She enters a place “Where never fell his foot” and says “There is no memory of him here!”, and the words bring him back: “so remembering him!”',
  },
];

function formQ(rng: Rng, d: Difficulty): GenOutput {
  return itemQ(rng, rng.pick(d === 1 ? FORMS : d === 2 ? FORM_HOW : FORM_DEEP), FORM_HINT);
}

// ============================================================================ sound and sense

const SOUND_HINT = 'Say the words aloud. Listen for repeated sounds, pauses and speed, then ask how the sound fits what the words say.';

const ALLIT = 'Alliteration: the same first consonant repeated';
const ONOM = 'Onomatopoeia: a word that imitates the sound it names';
const ENJ = 'Enjambment: a sentence running past a line break';
const CAES = 'Caesura: a strong pause in the middle of a line';
const REP = 'Repetition: the same word used again close by';
const PARA = 'Pararhyme: the same consonants, a different vowel';

interface Device {
  verse: Verse;
  lead: string;
  ask: string;
  right: string;
  wrong: string[];
  why: string;
}

/** Name the device (difficulty 1). Wrong devices are ones the bold words plainly do not use. */
const DEVICES: Device[] = [
  {
    verse: withBold(linesOf(WINDHOVER_OCTAVE, 1, 3), 'dapple-dawn-drawn Falcon'),
    lead: `From ${by(WINDHOVER_OCTAVE)} (a “minion” is a favourite; a “dauphin” is a prince):`,
    ask: 'Which device do the bold words use?',
    right: ALLIT,
    wrong: [ONOM, PARA, REP],
    why: '“dapple”, “dawn”, “drawn”: the “d” sound begins word after word, as it does through the whole line (“daylight’s dauphin”).',
  },
  {
    verse: linesOf(WINDHOVER_OCTAVE, 1, 2),
    lead: `The opening of ${by(WINDHOVER_OCTAVE)} (a “minion” is a favourite; a “dauphin” is a prince):`,
    ask: 'Line 1 breaks off in the middle of a word: “king-” ends it, and “dom” begins line 2. What is this device?',
    right: ENJ,
    wrong: [CAES, ONOM, PARA],
    why: 'The sense (here, even a single word) runs on over the line break, so the line rushes forward like the bird.',
  },
  {
    verse: withBold(linesOf(NIGHTINGALE_DARK, 7, 10), 'murmurous'),
    lead: `From ${by(NIGHTINGALE_DARK)}, as the speaker sits in the dark on a May night:`,
    ask: 'Which device does the bold word use?',
    right: ONOM,
    wrong: [ENJ, CAES, PARA],
    why: '“Murmurous” sounds like the low murmur of the flies it describes.',
  },
  {
    verse: withBold(linesOf(DRUMS_FIRST, 5, 7), 'whirr'),
    lead: `From ${by(DRUMS_FIRST)}, written at the start of the American Civil War:`,
    ask: 'Which device does the bold word use?',
    right: ONOM,
    wrong: [ENJ, CAES, PARA],
    why: '“Whirr” imitates the rapid rolling sound of the drums.',
  },
  {
    verse: withBold(linesOf(FROST_END, 8, 10), 'Quietly shining to the quiet Moon'),
    lead: `The last lines of ${by(FROST_END)}, a poem spoken beside a sleeping baby on a frosty night:`,
    ask: 'Which device does the bold line use?',
    right: REP,
    wrong: [ONOM, ENJ, PARA],
    why: '“Quietly … quiet”: the same word returns within the line, deepening the hush on which the poem ends.',
  },
  {
    verse: withBold(linesOf(PIED_ALL, 1, 4), 'Fresh-firecoal chestnut-falls; finches’ wings'),
    lead: `From ${by(PIED_ALL)} (“brinded” means streaked; “stipple” is a pattern of dots):`,
    ask: 'Which device do the bold words use?',
    right: ALLIT,
    wrong: [ONOM, ENJ, REP],
    why: '“Fresh”, “firecoal”, “falls”, “finches”: the “f” sound begins word after word.',
  },
  {
    verse: withBold(WIND_THORNS, 'I fall upon the thorns of life! I bleed!'),
    lead: `From ${by(WIND_THORNS)}, as the speaker calls on the wind:`,
    ask: 'The bold line breaks sharply in two at “life!”. What is this device?',
    right: CAES,
    wrong: [ENJ, ONOM, PARA],
    why: 'A strong pause falls in the middle of the line, after “life!”, so “I bleed!” comes as a gasp.',
  },
];

/** The effect of the sound (difficulty 2). */
const EFFECTS: Device[] = [
  {
    verse: withBold(linesOf(NIGHTINGALE_DARK, 7, 10), 'The murmurous haunt of flies on summer eves'),
    lead: `From ${by(NIGHTINGALE_DARK)}, as the speaker sits in the dark on a May night:`,
    ask: 'What is the effect of the sounds in the bold line?',
    right: 'Soft “m” and “s” sounds hum drowsily, like insects on a warm, still evening',
    wrong: ['Harsh, clashing sounds suggest the flies are a threat to the sleeping speaker', 'Short, sharp stresses make the line quick, like a bird darting through the trees', 'Loud, ringing sounds imitate the church bells heard across the summer fields'],
    why: '“Murmurous”, “summer”, “flies”, “eves”: the line hums, and its slow rhythm matches the drowsy evening.',
  },
  {
    verse: withBold(linesOf(NIGHTINGALE_FORLORN, 1, 4), 'Forlorn!'),
    lead: `From ${by(NIGHTINGALE_FORLORN)}. The speaker has imagined himself flying away with the bird’s song:`,
    ask: 'What does the sound of the word “Forlorn!” do?',
    right: 'Its slow, tolling sound calls him back from the bird’s song to his lonely self',
    wrong: ['Its bright, cheerful sound lifts him up to fly away with the singing nightingale', 'Its harsh sound frightens the nightingale, which stops singing and flies off at once', 'Its soft sound sends him into a deep, peaceful sleep from which he never wakes'],
    why: 'The word is “like a bell / To toll me back from thee to my sole self”: its long, heavy sound rings like a funeral bell and breaks the dream.',
  },
  {
    verse: withBold(AUTUMN_OOZINGS, 'the last oozings hours by hours'),
    lead: `From ${by(AUTUMN_OOZINGS)}, which speaks to Autumn as a person (a “cyder-press” squeezes apples for cider):`,
    ask: 'What is the effect of the sounds in the bold words?',
    right: 'Long vowels and repetition slow the line, so time passes drop by drop',
    wrong: ['Quick, light sounds speed the line up, so the harvest seems rushed and busy', 'Harsh, clashing sounds show that Autumn is angry about the end of summer', 'Rhyming words make the line sound like a cheerful song sung at harvest time'],
    why: 'The long “oo” and “ou” sounds and the doubled “hours by hours” make us linger, as Autumn watches the slow drip of the press.',
  },
  {
    verse: withBold(linesOf(PIED_ALL, 7, 11), 'With swift, slow; sweet, sour; adazzle, dim;'),
    lead: `From ${by(PIED_ALL)}, a poem praising God for “dappled things”:`,
    ask: 'What is the effect of the sound and shape of the bold line?',
    right: 'Pairs of opposites, broken by pauses, make the line itself dappled',
    wrong: ['A smooth, flowing rhythm makes everything in the world sound exactly the same', 'Repeated sounds imitate the noise of the trades and tools named earlier on', 'The long pauses show that the speaker is unsure whether he should praise God'],
    why: 'Each pair sets one quality against its opposite (“swift, slow”), and the semicolons break the line into patches, like the dappled things it praises.',
  },
  {
    verse: withBold(linesOf(DRUMS_FIRST, 1, 3), 'Beat! beat! drums!—blow! bugles! blow!'),
    lead: `From ${by(DRUMS_FIRST)}, written at the start of the American Civil War:`,
    ask: 'What is the effect of the sounds in the bold words?',
    right: 'Hard “b” sounds and exclamations pound like the drums themselves',
    wrong: ['Soft, gentle sounds suggest a quiet hymn sung in the solemn church', 'Long, flowing vowels suggest the distant sound of a peaceful river', 'Rhyming words make the line sound like a cheerful children’s song'],
    why: '“Beat! beat! … blow! bugles! blow!”: the repeated “b” and the short, shouted words hammer like a drum.',
  },
  {
    verse: withBold(linesOf(TINTERN_PAST, 7, 9), 'The still, sad music of humanity'),
    lead: `From ${by(TINTERN_PAST)}, as the speaker describes how he now looks on nature:`,
    ask: 'What is the effect of the sounds in the bold line?',
    right: 'Soft “s” sounds and a slow pace give human suffering its quiet, mournful music',
    wrong: ['Harsh, loud sounds show the speaker’s anger at the noise of the busy city', 'A quick, bouncing rhythm shows the joy of the thoughtless youth he remembers', 'Clashing sounds imitate the din of the crowds in the streets of the towns'],
    why: '“still, sad … humanity”: the soft “s” sounds and the pause after “still” make the line hushed and slow, like the music it names.',
  },
  {
    verse: withBold(linesOf(FROST_END, 8, 10), 'Quietly shining to the quiet Moon'),
    lead: `The last lines of ${by(FROST_END)}, a poem spoken beside a sleeping baby on a frosty night:`,
    ask: 'What is the effect of the sound of the bold line?',
    right: 'The soft, repeated “quiet” ends the poem as still as the silent icicles',
    wrong: ['Sharp sounds imitate the icicles cracking and falling on the frozen ground', 'A quick rhythm shows the baby waking up suddenly in the cold of the night', 'A loud rhyme with the line before brings the poem to a happy, noisy close'],
    why: 'The line is soft and slow, and “Quietly … quiet” repeats the hush: the poem ends as still as the frost it describes.',
  },
  {
    verse: withBold(linesOf(PATTERNS_END, 14, 17), 'Christ! What are patterns for?'),
    lead: `The end of ${by(PATTERNS_END)}. Her fiancé has been killed in the war, and she has hidden her grief:`,
    ask: 'What is the effect of the bold line?',
    right: 'The sudden oath and blunt question break through her controlled speech',
    wrong: ['The gentle question shows she is calmly curious about the garden’s design', 'The repeated sounds imitate the rustle of her stiff, brocaded silk gown', 'The cheerful exclamation shows her pleasure at walking in the garden'],
    why: 'After lines that calmly describe her stiff, guarded life, the oath “Christ!” and the bare question burst out: the grief she has held in breaks the pattern.',
  },
  {
    verse: withBold(linesOf(WINDHOVER_SESTET, 1, 3), 'Buckle!'),
    lead: `From ${by(WINDHOVER_SESTET)}, as the speaker watches a falcon in flight (a “chevalier” is a knight):`,
    ask: 'What is the effect of the bold word, after the line before it?',
    right: 'The heaped-up nouns build pressure that breaks on one heavy, stressed word',
    wrong: ['Soft, smooth sounds suggest the bird gently settling down onto its nest', 'A neat rhyme with “here” ties the two lines together like a nursery rhyme', 'A long pause before it shows that the speaker has lost interest in the bird'],
    why: '“Brute beauty and valour and act, oh, air, pride, plume, here / Buckle!”: the list gathers, the line runs on, and everything lands on one word.',
  },
];

/** How sound and structure work together (difficulty 3). */
const PATTERNS: Device[] = [
  {
    verse: linesOf(TIME_RELIEF_ALL, 3, 4),
    lead: `From ${by(TIME_RELIEF_ALL)}, a poem of grief for a lost lover:`,
    ask: 'How does the sentence pattern of these two lines support their meaning?',
    right: 'The repeated pattern makes her longing return like the rain and tide',
    wrong: ['The changing pattern shows that her feelings grow weaker as time passes', 'The pattern imitates the sound of the rain, which she finds comforting', 'The two lines contradict each other, showing she is confused about him'],
    why: '“I miss him in the weeping of the rain; / I want him at the shrinking of the tide”: the lines repeat one shape, and her longing comes back as regularly as nature does.',
  },
  {
    verse: linesOf(AUTUMN_SONGS, 5, 7),
    lead: `From ${by(AUTUMN_SONGS)}, at the end of an autumn day (“sallows” are willows):`,
    ask: 'How do the sound and movement of the lines suit what they describe?',
    right: 'The lines rise and sink like the gnats, and “wailful” and “mourn” make a lament',
    wrong: ['Harsh, clashing sounds show the gnats attacking the harvesters out in the fields', 'The lines move in a straight, steady march, like soldiers going off to war', 'Bright, cheerful sounds show that autumn is the happiest season of the year'],
    why: '“borne aloft / Or sinking as the light wind lives or dies”: the lines lift and fall like the gnats, and the soft, sad sounds make their song a mourning for the year.',
  },
  {
    verse: withBold(linesOf(WINDHOVER_SESTET, 4, 6), 'Fall, gall themselves, and gash gold-vermillion'),
    lead: `The end of ${by(WINDHOVER_SESTET)} (“sillion” is the soil of a furrow):`,
    ask: 'How do the sounds of the bold words work with their meaning?',
    right: 'Harsh, heavy sounds of breaking lead to gold: the damage is where beauty shows',
    wrong: ['Soft, gentle sounds suggest the embers cooling and going out for good', 'Quick, light sounds show the fire is a happy, cosy one on a winter’s night', 'Rhyming sounds show that the fire is safely under control in the hearth'],
    why: '“Fall, gall … gash” are hard, hurting sounds, yet what they reveal is “gold-vermillion”: as the embers break, their fire shows.',
  },
  {
    verse: linesOf(NIGHTINGALE_FORLORN, 5, 8),
    lead: `From ${by(NIGHTINGALE_FORLORN)}, as the bird flies away:`,
    ask: 'How do the sound and structure of the lines suggest the song fading?',
    right: 'The farewell repeats, and a list of places draws the song farther off',
    wrong: ['The lines grow louder and faster, as the bird flies back closer to the speaker', 'Harsh sounds show the speaker angrily driving the nightingale away from him', 'One short, complete sentence shows the song stopping suddenly, all at once'],
    why: '“Adieu! adieu!”, then “Past the near meadows, over the still stream, / Up the hill-side” and “In the next valley-glades”: each phrase takes the song farther, until it is “buried deep”.',
  },
  {
    verse: linesOf(DRUMS_FIRST, 5, 7),
    lead: `From ${by(DRUMS_FIRST)}, written at the start of the American Civil War:`,
    ask: 'How do the long lines and the dashes support the meaning?',
    right: 'Long, crowded lines and dashes let the noise run into every part of life',
    wrong: ['Short, quiet lines show that war has stayed far away from ordinary people', 'Even, regular lines show the calm order of a well-planned military parade', 'Rhyming couplets show that the war is a cheerful game for the young men'],
    why: 'The lines sprawl past the bridegroom and the farmer, and the dashes break them like blows: no corner of life is left quiet.',
  },
];

function deviceQ(rng: Rng, it: Device): GenOutput {
  return {
    prompt: `${it.lead}\n\n${verseBlock(it.verse)}\n\n${it.ask}`,
    parts: [part(mc(rng, it.right, it.wrong))],
    hints: [SOUND_HINT],
    solution: [end(it.right), it.why],
  };
}

function soundQ(rng: Rng, d: Difficulty): GenOutput {
  return deviceQ(rng, rng.pick(d === 1 ? DEVICES : d === 2 ? EFFECTS : PATTERNS));
}

export const FORM_SKILLS: SkillDef[] = [
  skill({
    id: 'e12-modern-form',
    name: 'Modern and reshaped forms',
    description: 'Identify sonnet variations, Imagism and free verse, and explain how a poem’s form carries its meaning.',
    outcomes: OUT,
    lessonId: L,
    format: 'mc',
    gen: formQ,
  }),
  skill({
    id: 'e12-sound-sense',
    name: 'Sound and sense',
    description: 'Identify sound devices and explain how sound, pause and line movement support meaning.',
    outcomes: OUT,
    lessonId: L,
    format: 'mc',
    gen: soundQ,
  }),
];
