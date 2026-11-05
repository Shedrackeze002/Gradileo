/**
 * Grade 8 English, Unit 2: Poetry (E8-B1). Figurative language and extended metaphor, form and
 * metre, and tone and shifts. Poems quoted: Percy Bysshe Shelley (“Ozymandias”, 1818), Emily
 * Dickinson (“Because I could not stop for Death”, 1890 printing, first stanza), Langston Hughes
 * (“Mother to Son”, 1922, and “Dreams”, 1923), Robert Frost (“Nothing Gold Can Stay”, 1923),
 * William Blake (“The Tyger”, 1794, first lines) and William Shakespeare. The haiku and other verses
 * are written for Gradileo.
 */
import { skill } from '../../helpers.ts';
import type { SkillDef } from '../../../types.ts';
import { bank, Q } from './common.ts';

const B1 = ['E8-B1'];

export const OZYMANDIAS = 'I met a traveller from an antique land,\nWho said—“Two vast and trunkless legs of stone\nStand in the desert. . . . Near them, on the sand,\nHalf sunk a shattered visage lies, whose frown,\nAnd wrinkled lip, and sneer of cold command,\nTell that its sculptor well those passions read\nWhich yet survive, stamped on these lifeless things,\nThe hand that mocked them, and the heart that fed;\nAnd on the pedestal, these words appear:\nMy name is Ozymandias, King of Kings;\nLook on my Works, ye Mighty, and despair!\nNothing beside remains. Round the decay\nOf that colossal Wreck, boundless and bare\nThe lone and level sands stretch far away.”';
const OZ_SRC = 'Percy Bysshe Shelley, “Ozymandias” (1818)';
export const DEATH = 'Because I could not stop for Death,\nHe kindly stopped for me;\nThe carriage held but just ourselves\nAnd Immortality.';
const DEATH_SRC = 'Emily Dickinson, “Because I could not stop for Death” (1890 printing), first stanza';
export const MOTHER = 'Well, son, I’ll tell you:\nLife for me ain’t been no crystal stair.\nIt’s had tacks in it,\nAnd splinters,\nAnd boards torn up,\nAnd places with no carpet on the floor—\nBare.';
const MOTHER_SRC = 'Langston Hughes, “Mother to Son” (1922), first lines';
export const DREAMS = 'Hold fast to dreams\nFor if dreams die\nLife is a broken-winged bird\nThat cannot fly.\n\nHold fast to dreams\nFor when dreams go\nLife is a barren field\nFrozen with snow.';
const DREAMS_SRC = 'Langston Hughes, “Dreams” (1923)';
export const GOLD = 'Nature’s first green is gold,\nHer hardest hue to hold.\nHer early leaf’s a flower;\nBut only so an hour.\nThen leaf subsides to leaf.\nSo Eden sank to grief,\nSo dawn goes down to day.\nNothing gold can stay.';
const GOLD_SRC = 'Robert Frost, “Nothing Gold Can Stay” (1923)';
const TYGER = 'Tyger Tyger, burning bright,\nIn the forests of the night;';
const TYGER_SRC = 'William Blake, “The Tyger” (1794), first lines';
const HAIKU = 'Old pond in the rain—\na frog’s single splash, and then\nthe rain, the rain, rain.';
const OWN = 'written for Gradileo';

// ---------------------------------------------------------------------------- 2.1 figurative language

const FIGS = ['Simile', 'Metaphor', 'Personification', 'Hyperbole'];
const fig = (d: 1 | 2 | 3, line: string, k: number, why: string, source?: string) =>
  Q(d, 'Which figure of speech is used here?', FIGS[k], FIGS.filter((_, i) => i !== k), why, line, source);

const FIGURATIVE = [
  fig(1, 'The classroom was a zoo after lunch.', 1, 'The classroom is said to be a zoo, with no like or as: a metaphor.'),
  fig(1, 'I’m so hungry I could eat a horse.', 3, 'Nobody could eat a horse. The exaggeration is hyperbole.'),
  fig(2, 'Because I could not stop for Death,\nHe kindly stopped for me;', 2, 'Death is given a human action and manners (he kindly stopped), which is personification.', DEATH_SRC),
  fig(2, 'Life is a broken-winged bird\nThat cannot fly.', 1, 'Life without dreams is said to be a broken bird, with no like or as: a metaphor.', DREAMS_SRC),
  fig(2, 'Her laugh rang out like a bell across the playground.', 0, 'The laugh is compared to a bell using like: a simile.'),
  fig(3, 'So dawn goes down to day.', 2, 'Dawn is given an action (going down), as if it were a person sinking: personification. The line also links to Eden sinking to grief.', GOLD_SRC),
  Q(3, 'In Frost’s poem, what does “gold” stand for?', 'The brief, precious beauty of new things', ['Money and the wish to become rich', 'The colour of the autumn leaves only', 'A real treasure buried in Eden'],
    'The first green of spring looks gold for an hour and then fades. Gold becomes a symbol of beauty and innocence that cannot last.', GOLD, GOLD_SRC),
];

const EXTENDED = [
  Q(1, 'What is an extended metaphor?', 'A metaphor that is developed over several lines or a whole poem', ['A metaphor that uses the word like or as', 'A metaphor printed in a very long book', 'A metaphor that is repeated word for word in every stanza'],
    'An extended metaphor keeps building the same comparison, adding details as the poem goes on.'),
  Q(1, 'In “Mother to Son”, what is life compared to?', 'A staircase', ['A river', 'A garden', 'A journey by sea'],
    'The mother says life “ain’t been no crystal stair”. She keeps developing the stair image: tacks, splinters, torn-up boards.', MOTHER, MOTHER_SRC),
  Q(2, 'What do the “tacks” and “splinters” stand for in the mother’s life?', 'Hardships and pain she has faced', ['Tools she uses in her daily work', 'Gifts she has given her son', 'Money she has saved for years'],
    'Within the extended metaphor of the stair, the tacks and splinters are the painful difficulties of her life.', MOTHER, MOTHER_SRC),
  Q(2, 'Why does the mother say her life “ain’t been no crystal stair”?', 'Her life has been hard, not smooth and shining.', ['She has never lived in a house with stairs.', 'She dislikes glass and prefers wood.', 'Her son broke a crystal staircase.'],
    'A crystal stair would be beautiful and easy. Saying her life was not one shows it has been rough and difficult.', MOTHER, MOTHER_SRC),
  Q(3, 'In Dickinson’s stanza, death is pictured as a gentleman driving a carriage. How does the extended metaphor change the usual picture of death?', 'It makes death seem polite and calm, not frightening.', ['It makes death seem violent and very cruel.', 'It shows that death is a kind of illness.', 'It shows that the speaker is a carriage driver.'],
    'Death “kindly stopped”, like a courteous caller. The image makes dying seem like a quiet drive, which is unsettling in its calm.', DEATH, DEATH_SRC),
  Q(3, 'Hughes’s “Dreams” uses two metaphors, a broken-winged bird and a barren field. What do they share?', 'Both show life without dreams as unable to grow or rise.', ['Both show that dreams are dangerous things to keep.', 'Both describe a real farm in winter.', 'Both show that life is full of joy.'],
    'A bird that cannot fly and a frozen field that cannot grow both stand for a life that has lost hope.', DREAMS, DREAMS_SRC),
];

// ---------------------------------------------------------------------------- 2.2 form and metre

const FORMS = ['A haiku', 'A sonnet', 'Free verse', 'Rhyming couplets'];
const form = (d: 1 | 2 | 3, text: string, k: number, why: string, source?: string) =>
  Q(d, 'Which form is this poem written in?', FORMS[k], FORMS.filter((_, i) => i !== k), why, text, source);

const POEM_FORM = [
  Q(1, 'How many syllables are in the three lines of a traditional English haiku?', '5, 7 and 5', ['7, 5 and 7', '4, 4 and 4', '10, 10 and 10'],
    'In English, a haiku is often written in three lines of 5, 7 and 5 syllables, usually about nature and a moment in time.'),
  form(1, HAIKU, 0, 'Three lines of 5, 7 and 5 syllables, capturing one moment in nature: a haiku.', OWN),
  form(2, GOLD, 3, 'The lines rhyme in pairs (gold / hold, flower / hour, leaf / grief, day / stay): rhyming couplets.', GOLD_SRC),
  form(2, OZYMANDIAS, 1, 'Fourteen lines of iambic pentameter with a set rhyme pattern: a sonnet. (Shelley’s rhyme scheme is unusual, but the form is a sonnet.)', OZ_SRC),
  Q(3, 'What is blank verse?', 'Unrhymed lines of iambic pentameter', ['Poetry with no words on some lines', 'Rhymed lines of any length at all', 'Lines with no regular beat or rhyme'],
    'Blank verse has a regular beat (iambic pentameter) but no rhyme. Shakespeare wrote most of his plays in it. Free verse has neither rhyme nor regular beat.'),
  Q(3, 'Why might a poet write about something that fades quickly in short, tight rhyming couplets, as Frost does?', 'The brief, neat form matches how short the beauty lasts.', ['Couplets make a poem as long as possible.', 'Couplets are needed for poems about nature.', 'The form has no link at all to the poem’s meaning.'],
    'An eight-line poem of quick couplets is over almost as soon as it begins, like the gold of early spring.'),
];

const METRE = [
  Q(1, 'What is a trochee?', 'A stressed syllable followed by an unstressed one (DUM-da)', ['An unstressed syllable followed by a stressed one (da-DUM)', 'Three stressed syllables in a row', 'A line of poetry with no stresses at all'],
    'A trochee is DUM-da, as in GAR-den. An iamb is the reverse, da-DUM, as in to-DAY.'),
  Q(1, 'How many feet are in a line of pentameter?', '5', ['3', '4', '6'],
    'Penta means five, so pentameter has five feet (beats). Tetrameter has four.'),
  Q(2, 'Which metre is “Tyger Tyger, burning bright”?', 'Trochaic', ['Iambic', 'Free verse', 'No metre'],
    'TY-ger TY-ger, BURN-ing BRIGHT: DUM-da DUM-da DUM-da DUM. The pattern is trochaic, with the last weak syllable dropped.', TYGER, TYGER_SRC),
  Q(2, 'How many feet are in “The course of true love never did run smooth”?', '5 (iambic pentameter)', ['4 (iambic tetrameter)', '3 (iambic trimeter)', '6 (iambic hexameter)'],
    'the COURSE | of TRUE | love NEV | er DID | run SMOOTH: five iambs.', 'The course of true love never did run smooth.', 'William Shakespeare, A Midsummer Night’s Dream, Act 1, Scene 1'),
  Q(3, 'Why is iambic pentameter often said to sound like natural speech?', 'English speech often falls into da-DUM patterns.', ['It has no beat at all, just like speech.', 'Each line has only one syllable in it.', 'It always rhymes, just as everyday conversations do.'],
    'English words and phrases naturally alternate weak and strong syllables, so the iambic beat sounds close to talk.'),
  Q(3, 'A poet suddenly breaks a steady iambic beat with a heavy stressed word at the start of a line. Why?', 'To make that word stand out and draw attention to it', ['Because the poet has made a mistake in counting', 'To make the line sound smoother and quieter', 'To show that the poem is ending at that point'],
    'A change in the beat surprises the ear, so poets use it to stress important words.'),
];

// ---------------------------------------------------------------------------- 2.3 tone and shifts

const TONES = ['Arrogant', 'Nostalgic', 'Defiant', 'Ironic'];
const tone = (d: 1 | 2 | 3, text: string, k: number, why: string, source?: string) => Q(d, 'Which word best describes the tone?', TONES[k], TONES.filter((_, i) => i !== k), why, text, source);

const TONE_WORDS = [
  tone(1, 'My name is Ozymandias, King of Kings;\nLook on my Works, ye Mighty, and despair!', 0,
    'The king boasts that he is King of Kings and tells the mighty to despair at his works: an arrogant tone.', OZ_SRC),
  tone(1, 'We used to race our bikes down Maple Hill,\nthose summers when the evenings never ended.', 1,
    'The speaker looks back fondly on happy times that are gone: a nostalgic tone. (Lines written for Gradileo.)'),
  tone(2, 'So boy, don’t you turn back.\nDon’t you set down on the steps\n’Cause you finds it’s kinder hard.', 2,
    'The mother refuses to let hardship stop her son, and urges him on: a determined, defiant tone.', 'Langston Hughes, “Mother to Son” (1922)'),
  tone(3, 'Oh yes, a lovely new car park, how green,\nwhere once there stood the oldest oak in town.', 3,
    'The speaker praises the car park but clearly means the opposite (“how green”), so the tone is ironic. (Lines written for Gradileo.)'),
  Q(2, 'Which word is the most precise way to describe a tone of gentle sadness about loss?', 'Wistful', ['Sad', 'Bad', 'Nice'],
    'Wistful names a soft, longing sadness. Sad is true but vague, and the others do not fit.'),
  Q(3, 'Why should you use precise tone words like “bitter” or “reverent” instead of “happy” or “sad”?', 'Precise words capture the exact attitude and show close reading.', ['Long words always earn more marks than short, simple words.', 'Happy and sad are not allowed in any essays.', 'Precise words are needed to count the syllables.'],
    'Many poems are not simply happy or sad. A precise word explains the attitude more exactly.'),
];

const SHIFT = [
  Q(1, 'What is a shift in a poem?', 'A change in tone, speaker, time or idea', ['A line that is longer than the rest', 'The title printed above the poem', 'A rhyme between two words'],
    'A shift, or turn, is where a poem changes direction. Words like but, yet and then often signal it.'),
  Q(1, 'Which word often signals a shift in a poem?', 'But', ['And', 'The', 'A'],
    'But marks a contrast, so it often begins a turn.'),
  Q(2, 'Where does the tone of “Ozymandias” shift?', 'At “Nothing beside remains”, from the king’s boast to the empty desert', ['At the first line, when the traveller is introduced', 'At “Two vast and trunkless legs”, when the broken statue is first found', 'At no point, because the tone never changes'],
    'After the proud inscription, “Nothing beside remains” turns the boast into irony: his works have vanished.', OZYMANDIAS, OZ_SRC),
  Q(2, 'How does the tone change in “Nothing Gold Can Stay”?', 'From delight in new beauty to sad acceptance that it fades', ['From anger at nature to great joy about the coming spring', 'From fear of the dark to calm about the light', 'It stays cheerful and light the whole way through'],
    'The poem opens admiring spring’s gold, then turns (“But only so an hour”) to loss, ending in “Nothing gold can stay.”', GOLD, GOLD_SRC),
  Q(3, 'Why does Shelley end “Ozymandias” with the “lone and level sands” stretching away?', 'The empty desert mocks the king’s boast and shows that power does not last.', ['To describe the best place to build a new statue.', 'To show that the traveller is lost in the desert and needs someone’s help.', 'To praise the king for his very great works.'],
    'The endless, empty sand is the final irony: the “King of Kings” is forgotten, and only the desert remains.', OZYMANDIAS, OZ_SRC),
  Q(3, 'In “Mother to Son”, the mother first describes her hard life, then says “But all the time / I’se been a-climbin’ on”. What does this shift show?', 'Her determination to keep going despite hardship', ['That her life has been easy from the start', 'That she has decided to stop climbing', 'That the son has already given up'],
    'But turns from hardship to perseverance: she has kept climbing, and wants her son to do the same.'),
];

// ---------------------------------------------------------------------------- skills

export const POETRY_SKILLS: SkillDef[] = [
  skill({ id: 'e8-figurative', name: 'Figurative language in poems', description: 'Identify simile, metaphor, personification, hyperbole and symbol in poems.', outcomes: B1, lessonId: 'e8-2-1', format: 'mc', gen: bank(FIGURATIVE, ['Like or as: simile. Is or was: metaphor.', 'Human actions for non-human things: personification.']) }),
  skill({ id: 'e8-extended-metaphor', name: 'Extended metaphor', description: 'Follow an extended metaphor through a poem and explain what it shows.', outcomes: B1, lessonId: 'e8-2-1', format: 'mc', gen: bank(EXTENDED, ['Find the main comparison, then follow its details.', 'Ask: what does each detail stand for?']) }),
  skill({ id: 'e8-poem-form', name: 'Poetic forms', description: 'Identify the haiku, rhyming couplets, the sonnet, blank verse and free verse, and link form to meaning.', outcomes: B1, lessonId: 'e8-2-2', format: 'mc', gen: bank(POEM_FORM, ['Count lines and syllables; listen for rhyme.', 'Blank verse: iambic pentameter with no rhyme.']) }),
  skill({ id: 'e8-metre', name: 'Metre', description: 'Name iambic and trochaic metre and count the feet in a line.', outcomes: B1, lessonId: 'e8-2-2', format: 'mc', gen: bank(METRE, ['Iamb: da-DUM. Trochee: DUM-da.', 'Tetrameter has four feet; pentameter has five.']) }),
  skill({ id: 'e8-tone-words', name: 'Precise tone words', description: 'Describe a poem’s tone with precise words.', outcomes: B1, lessonId: 'e8-2-3', format: 'mc', gen: bank(TONE_WORDS, ['Tone is the speaker’s attitude.', 'Choose an exact word, not just happy or sad.']) }),
  skill({ id: 'e8-tone-shift', name: 'Shifts in tone', description: 'Find where and why a poem’s tone shifts.', outcomes: B1, lessonId: 'e8-2-3', format: 'mc', gen: bank(SHIFT, ['Look for but, yet, then and now.', 'Compare the tone before and after the turn.']) }),
];
