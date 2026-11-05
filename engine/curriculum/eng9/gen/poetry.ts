/**
 * Grade 9 English, Unit 2: Poetry (E9-B1). Close reading and imagery, the sonnet and sound, and metre
 * and rhythm. Poems quoted: William Shakespeare (Sonnet 116, 1609), Christina Rossetti (“Remember”,
 * 1862), Paul Laurence Dunbar (“We Wear the Mask”, 1895, first lines), Wilfred Owen (“Dulce et
 * Decorum Est”, 1920, first lines) and Edgar Allan Poe (“The Raven”, 1845, lines from it).
 */
import { skill } from '../../helpers.ts';
import type { SkillDef } from '../../../types.ts';
import { bank, Q } from './common.ts';

const B1 = ['E9-B1'];

export const SONNET116 = 'Let me not to the marriage of true minds\nAdmit impediments. Love is not love\nWhich alters when it alteration finds,\nOr bends with the remover to remove:\nO no! it is an ever-fixed mark\nThat looks on tempests and is never shaken;\nIt is the star to every wand’ring bark,\nWhose worth’s unknown, although his height be taken.\nLove’s not Time’s fool, though rosy lips and cheeks\nWithin his bending sickle’s compass come;\nLove alters not with his brief hours and weeks,\nBut bears it out even to the edge of doom.\n   If this be error and upon me proved,\n   I never writ, nor no man ever loved.';
const S116_SRC = 'William Shakespeare, Sonnet 116 (1609)';
export const REMEMBER = 'Remember me when I am gone away,\nGone far away into the silent land;\nWhen you can no more hold me by the hand,\nNor I half turn to go yet turning stay.\nRemember me when no more day by day\nYou tell me of our future that you planned:\nOnly remember me; you understand\nIt will be late to counsel then or pray.\nYet if you should forget me for a while\nAnd afterwards remember, do not grieve:\nFor if the darkness and corruption leave\nA vestige of the thoughts that once I had,\nBetter by far you should forget and smile\nThan that you should remember and be sad.';
const REM_SRC = 'Christina Rossetti, “Remember” (1862)';
export const MASK = 'We wear the mask that grins and lies,\nIt hides our cheeks and shades our eyes,—\nThis debt we pay to human guile;\nWith torn and bleeding hearts we smile,\nAnd mouth with myriad subtleties.';
const MASK_SRC = 'Paul Laurence Dunbar, “We Wear the Mask” (1895), first lines';
export const DULCE = 'Bent double, like old beggars under sacks,\nKnock-kneed, coughing like hags, we cursed through sludge,\nTill on the haunting flares we turned our backs\nAnd towards our distant rest began to trudge.\nMen marched asleep. Many had lost their boots\nBut limped on, blood-shod. All went lame; all blind;';
const DULCE_SRC = 'Wilfred Owen, “Dulce et Decorum Est” (1920), first lines';
const RAVEN = 'Once upon a midnight dreary, while I pondered, weak and weary,';
const RAVEN_SRC = 'Edgar Allan Poe, “The Raven” (1845), first line';
const RAVEN2 = 'And the silken, sad, uncertain rustling of each purple curtain';
const RAVEN2_SRC = 'Edgar Allan Poe, “The Raven” (1845)';

// ---------------------------------------------------------------------------- 2.1 close reading and imagery

const CLOSE = [
  Q(1, 'What is the first step in close reading a poem?', 'Read it through slowly, more than once, for its overall sense', ['Count the number of words in every line of the poem', 'Look up the poet’s date of birth and place of birth', 'Decide straight away whether or not you like the poem at all'],
    'Read for the whole picture first, then go back to look at details.'),
  Q(1, 'In Dunbar’s poem, what is “the mask”?', 'A smiling face worn to hide pain', ['A real mask worn at a party', 'A disguise used by a thief', 'A mask that protects from dust'],
    'The mask “grins and lies”, hiding “torn and bleeding hearts”.', MASK, MASK_SRC),
  Q(2, 'What contrast is at the heart of “With torn and bleeding hearts we smile”?', 'Inner suffering against an outward show of happiness', ['A happy past against an unhappy present day', 'Life in the busy city against life in the country', 'A strong body against a weak and tired mind'],
    'The smile on the outside hides the pain on the inside.', MASK, MASK_SRC),
  Q(2, 'Dunbar calls hiding behind the mask “this debt we pay to human guile”. What does this suggest?', 'A cruel, deceitful world forces people to hide their pain.', ['The speaker owes money and must pay it all back very soon.', 'The speaker enjoys tricking other people for fun.', 'Hiding feelings is a choice that costs nothing.'],
    '“Guile” means cunning deceit. The mask is a price paid to survive it.', MASK, MASK_SRC),
  Q(3, 'Dunbar was an African American poet writing in 1895. How might this context deepen the poem?', 'The mask can be read as the pain Black Americans had to hide under racism.', ['The poem must be about a costume party that Dunbar went to one evening.', 'Context never matters, so the poem can only be read one single way.', 'The poem is a cheerful celebration of life in America at that time.'],
    'Context does not replace the words, but it can open up a fuller reading.', MASK, MASK_SRC),
  Q(3, 'Why do close readers pay attention to a poem’s title?', 'The title often frames the meaning or points to the key image.', ['The title is always the first line of the poem repeated.', 'The title tells you how many stanzas the poem has.', 'The title is never connected to what the poem says.'],
    '“We Wear the Mask” names the central image before the poem begins.'),
];

const IMAGERY = [
  Q(1, 'What is imagery?', 'Language that appeals to the senses to create a picture', ['The pictures printed alongside a poem in a book', 'A list of the poet’s favourite words and phrases', 'The rhyme scheme that a poem follows from start to end'],
    'Imagery can appeal to sight, sound, touch, taste or smell.'),
  Q(1, 'What picture of the soldiers does the simile “like old beggars under sacks” create?', 'They are bent, exhausted and wretched.', ['They are proud, strong and marching well.', 'They are wealthy and carrying treasure.', 'They are young, cheerful and relaxed.'],
    'Comparing young soldiers to old beggars shows how war has broken them.', DULCE, DULCE_SRC),
  Q(2, 'What does the image “blood-shod” suggest?', 'The soldiers’ feet are so wounded that blood covers them like shoes.', ['The soldiers have been given new red boots to wear.', 'The soldiers have stepped in red paint on the muddy road ahead.', 'The soldiers are wearing heavy boots made of iron.'],
    'Having lost their boots, they march on feet covered in blood.', DULCE, DULCE_SRC),
  Q(2, 'Which senses does “coughing like hags, we cursed through sludge” appeal to?', 'Sound and touch', ['Taste and smell', 'Sight only', 'None at all'],
    'We hear the coughing and cursing and feel the thick sludge.', DULCE, DULCE_SRC),
  Q(3, 'How does Owen’s imagery challenge the idea that war is glorious?', 'It shows soldiers as broken, filthy and suffering, not heroic.', ['It shows soldiers as brave heroes winning a famous battle.', 'It shows that war is exciting and full of adventure.', 'It describes the beautiful countryside behind the lines.'],
    'Every image strips away glory: beggars, hags, sludge, blood.', DULCE, DULCE_SRC),
  Q(3, 'In Sonnet 116, love is “the star to every wand’ring bark” (ship). What does this image suggest?', 'Love is a fixed guide that keeps lost people on course.', ['Love is a danger that sinks ships at sea.', 'Love is bright but disappears by morning.', 'Love is a ship that wanders far away from its home.'],
    'Sailors steered by the stars, so love is pictured as constant guidance.', SONNET116, S116_SRC),
];

// ---------------------------------------------------------------------------- 2.2 the sonnet and sound

const SONNET = [
  Q(1, 'How many lines does a sonnet have?', '14', ['12', '10', '16'],
    'A sonnet is a 14-line poem, usually in iambic pentameter.'),
  Q(1, 'How is a Shakespearean sonnet usually divided?', 'Three quatrains and a rhyming couplet', ['An octave of eight lines and a sestet of six', 'Seven pairs of lines that all rhyme together', 'Two stanzas of seven lines with no rhyme'],
    'ABAB CDCD EFEF GG: three four-line quatrains and a final couplet.'),
  Q(2, 'What is the volta in a sonnet?', 'The turn, where the poem shifts in argument or tone', ['The title of the sonnet, printed in bold above it', 'The very first line of the sonnet', 'The name of the person the sonnet is for'],
    'In a Petrarchan sonnet the volta usually comes at line 9; in a Shakespearean one, often at the couplet.'),
  Q(2, 'Rossetti’s “Remember” has an octave and a sestet. Where is the volta?', 'At “Yet if you should forget me for a while”', ['At the very first line, “Remember me”', 'At “You tell me of our future that you planned”', 'There is no turn anywhere in this sonnet'],
    'The first eight lines ask to be remembered; “Yet” turns to say forgetting is better than grief.', REMEMBER, REM_SRC),
  Q(3, 'How does the speaker’s request change after the volta in “Remember”?', 'From “remember me” to “forget me if remembering makes you sad”', ['From “forget me” to “remember me every single day”', 'From praising love to attacking the person she loves', 'It does not change: she asks the same thing throughout'],
    'The turn shows a selfless love: she would rather be forgotten than cause pain.', REMEMBER, REM_SRC),
  Q(3, 'What does the final couplet of Sonnet 116 do?', 'It stakes the poet’s whole reputation on the poem’s claim about love.', ['It admits that everything the poem said about love was a mistake.', 'It begins a brand new subject that has nothing to do with love.', 'It describes a ship sinking in a storm out at sea.'],
    'If this is wrong, he says, he never wrote and no one ever loved: an absolute claim.', SONNET116, S116_SRC),
];

const SOUNDS = ['Alliteration', 'Assonance', 'Sibilance', 'Onomatopoeia'];
const sound = (d: 1 | 2 | 3, line: string, k: number, why: string, source?: string) =>
  Q(d, 'Which sound device is strongest in this line?', SOUNDS[k], SOUNDS.filter((_, i) => i !== k), why, line, source);

const SOUND = [
  sound(1, 'The bees went buzz, the frogs went plop.', 3, 'Buzz and plop imitate the sounds they name: onomatopoeia.'),
  sound(1, 'Men marched asleep. Many had lost their boots', 0, 'Repeated m sounds at the start of words: alliteration.', DULCE_SRC),
  sound(2, RAVEN2, 2, 'The repeated soft s sounds (silken, sad, uncertain) create a hushed, whispering sound: sibilance.', RAVEN2_SRC),
  sound(2, 'The low moan of the lonely road', 1, 'The repeated long o vowel (low, moan, lonely, road): assonance.'),
  Q(3, 'What is the effect of the m sounds in “Men marched asleep. Many had lost their boots”?', 'The heavy, repeated sound mimics the slow, dull trudge of the march.', ['The quick, light sound makes the march seem cheerful and fast.', 'The sound has no link at all to the meaning of the line.', 'The sound makes the soldiers seem wide awake and alert.'],
    'Sound devices often echo the meaning of the words.', DULCE, DULCE_SRC),
  Q(3, 'Why might a poet use harsh sounds such as k and g, as in “Knock-kneed, coughing like hags”?', 'Harsh sounds make the experience feel ugly and painful.', ['Harsh sounds make a scene feel soft and peaceful.', 'Harsh sounds are needed for the lines to rhyme.', 'Harsh sounds show that the speaker is very happy.'],
    'Hard consonants (cacophony) suit an ugly subject.', DULCE, DULCE_SRC),
];

// ---------------------------------------------------------------------------- 2.3 metre and rhythm

const SCANSION = [
  Q(1, 'What is scansion?', 'Marking the stressed and unstressed syllables in a line', ['Counting how many stanzas a poem contains', 'Finding all of the rhyming words in a poem', 'Reading a poem aloud as quickly as you possibly can'],
    'Scanning a line shows its metre.'),
  Q(1, 'Where are the stresses in “to-DAY”?', 'On the second syllable', ['On the first syllable', 'On both syllables', 'On neither syllable'],
    'to-DAY is da-DUM: an iamb.'),
  Q(2, 'Which metre is “Once upon a midnight dreary, while I pondered, weak and weary”?', 'Trochaic', ['Iambic', 'Free verse', 'No metre at all'],
    'ONCE up-ON a MID-night DREAR-y: DUM-da DUM-da. Poe uses eight trochees a line.', RAVEN, RAVEN_SRC),
  Q(2, 'How many feet are in “Let me not to the marriage of true minds”?', '5', ['4', '6', '3'],
    'Like most of the sonnet, the line has five beats (pentameter), though its stresses are not all regular.', 'Let me not to the marriage of true minds', S116_SRC),
  Q(3, 'Sonnet 116 opens “LET me NOT”, starting on a stress rather than the expected da-DUM. Why might Shakespeare do this?', 'The forceful opening stress makes the speaker sound firm and certain.', ['He has made an error, since every line must begin unstressed.', 'The stress shows that the speaker is unsure and hesitant.', 'It signals that the poem is about to end very soon.'],
    'Breaking the pattern at the start gives the opening authority.', SONNET116, S116_SRC),
  Q(3, 'What is a spondee?', 'A foot of two stressed syllables in a row', ['A foot of two unstressed syllables', 'A line with no stresses in it at all', 'A pause in the middle of a line'],
    'Spondees (DUM-DUM) slow a line and add weight, as in “true minds”.'),
];

const RHYTHM = [
  Q(1, 'What is enjambment?', 'When a sentence runs on from one line to the next without a pause', ['When every line ends with a full stop', 'When two lines in a row rhyme with each other at the very end', 'When a poem has no title above it'],
    'Enjambment pulls the reader on into the next line.'),
  Q(1, 'What is a caesura?', 'A pause in the middle of a line, often marked by punctuation', ['A pause between two separate stanzas', 'A word that rhymes with the last word of the line before', 'The final line of a poem or a song'],
    'In “Men marched asleep. Many had lost their boots”, the full stop is a caesura.'),
  Q(2, 'What is the effect of the caesuras in “All went lame; all blind;”?', 'The short, broken phrases feel like exhausted, halting steps.', ['They make the line flow smoothly and quickly to the end.', 'They show that the soldiers are marching in time together.', 'They have no effect on how the line is read aloud at all.'],
    'Pauses break the rhythm, mirroring the soldiers’ broken march.', DULCE, DULCE_SRC),
  Q(2, 'Sonnet 116 runs “true minds / Admit impediments” across a line break. What is the effect?', 'The enjambment pushes the reader straight into the next line, so the sense flows on.', ['The line break makes the reader stop and start a brand new idea.', 'It shows that the two lines come from two different poems by different poets.', 'It makes the two lines rhyme with each other at the end.'],
    'The thought carries over, so the reader keeps going.', SONNET116, S116_SRC),
  Q(3, 'Why might a poet use mostly end-stopped lines in a poem about order and control?', 'Lines that end with punctuation feel neat, complete and controlled.', ['End-stopped lines make a poem sound wild and chaotic.', 'End-stopped lines are the only kind of line allowed in sonnets.', 'End-stopped lines speed up a poem and remove pauses.'],
    'Form can mirror meaning: neat lines for a neat world.'),
  Q(3, 'How does the steady rhythm of “The Raven” contribute to its effect?', 'The hypnotic beat creates a haunting, chant-like mood.', ['The rhythm makes the poem sound light and comic.', 'The rhythm is broken, so the poem sounds like prose.', 'The rhythm hides the poem’s sad and dark subject.'],
    'Poe’s insistent trochees and rhymes feel like a spell.'),
];

// ---------------------------------------------------------------------------- skills

export const POETRY_SKILLS: SkillDef[] = [
  skill({ id: 'e9-close-reading', name: 'Close reading', description: 'Read a poem closely for its meaning, contrasts and context.', outcomes: B1, lessonId: 'e9-2-1', format: 'mc', gen: bank(CLOSE, ['Read the whole poem first, then zoom in.', 'Look for contrasts and key images.']) }),
  skill({ id: 'e9-imagery-effect', name: 'The effect of imagery', description: 'Explain how sensory images create effects in a poem.', outcomes: B1, lessonId: 'e9-2-1', format: 'mc', gen: bank(IMAGERY, ['Ask: which sense does the image appeal to, and what feeling does it create?']) }),
  skill({ id: 'e9-sonnet', name: 'The sonnet', description: 'Identify Shakespearean and Petrarchan sonnets and explain the volta.', outcomes: B1, lessonId: 'e9-2-2', format: 'mc', gen: bank(SONNET, ['Shakespearean: three quatrains and a couplet.', 'Petrarchan: an octave and a sestet, with a turn at line 9.']) }),
  skill({ id: 'e9-sound-effects', name: 'Sound devices', description: 'Identify alliteration, assonance, sibilance and onomatopoeia, and explain their effects.', outcomes: B1, lessonId: 'e9-2-2', format: 'mc', gen: bank(SOUND, ['Alliteration repeats first consonants; assonance repeats vowels; sibilance repeats s sounds.']) }),
  skill({ id: 'e9-scansion', name: 'Scansion', description: 'Scan a line to find its stresses, feet and metre.', outcomes: B1, lessonId: 'e9-2-3', format: 'mc', gen: bank(SCANSION, ['Read the line aloud and tap the beats.', 'Iamb: da-DUM. Trochee: DUM-da.']) }),
  skill({ id: 'e9-metre-effect', name: 'Rhythm, enjambment and caesura', description: 'Explain how rhythm, enjambment and caesura shape a poem.', outcomes: B1, lessonId: 'e9-2-3', format: 'mc', gen: bank(RHYTHM, ['Enjambment runs on; a caesura pauses.', 'Ask: how does the rhythm match the meaning?']) }),
];
