/**
 * Grade 6 English, Unit 2: Poetry (E6-B1). Figures of speech, sound devices, stanzas and rhyme
 * scheme, and mood. Poems by Alfred Tennyson (“The Eagle”, 1851), William Wordsworth (“I Wandered
 * Lonely as a Cloud”, 1815 version), Emily Dickinson (“‘Hope’ is the thing with feathers”, written about
 * 1861), Carl Sandburg (“Fog”, 1916) and Robert Louis Stevenson (“From a Railway Carriage”, 1885)
 * are in the public domain; the other verses are written for Gradileo.
 */
import { skill } from '../../helpers.ts';
import type { SkillDef } from '../../../types.ts';
import { bank, Q } from './common.ts';

const B1 = ['E6-B1'];

export const EAGLE = 'He clasps the crag with crooked hands;\nClose to the sun in lonely lands,\nRing’d with the azure world, he stands.\n\nThe wrinkled sea beneath him crawls;\nHe watches from his mountain walls,\nAnd like a thunderbolt he falls.';
const EAGLE_SRC = 'Alfred Tennyson, “The Eagle” (1851)';
export const FOG = 'The fog comes\non little cat feet.\n\nIt sits looking\nover harbor and city\non silent haunches\nand then moves on.';
const FOG_SRC = 'Carl Sandburg, “Fog” (1916)';
export const DAFFODILS = 'I wandered lonely as a cloud\nThat floats on high o’er vales and hills,\nWhen all at once I saw a crowd,\nA host, of golden daffodils;\nBeside the lake, beneath the trees,\nFluttering and dancing in the breeze.';
const DAFFODILS_SRC = 'William Wordsworth, “I Wandered Lonely as a Cloud” (1815), first stanza';
const HOPE = '“Hope” is the thing with feathers -\nThat perches in the soul -\nAnd sings the tune without the words -\nAnd never stops - at all -';
const HOPE_SRC = 'Emily Dickinson, “‘Hope’ is the thing with feathers” (about 1861), first stanza';
const RAILWAY = 'Faster than fairies, faster than witches,\nBridges and houses, hedges and ditches;\nAnd charging along like troops in a battle,\nAll through the meadows the horses and cattle:';
const RAILWAY_SRC = 'Robert Louis Stevenson, “From a Railway Carriage” (1885), first lines';
const OWN = 'written for Gradileo';

// ---------------------------------------------------------------------------- 2.1 figures of speech

const FIGS = ['Simile', 'Metaphor', 'Personification', 'Hyperbole'];
const fig = (d: 1 | 2 | 3, line: string, k: number, why: string, source?: string) =>
  Q(d, 'Which figure of speech is used here?', FIGS[k], FIGS.filter((_, i) => i !== k), why, line, source);

const TYPE = [
  fig(1, 'The old car coughed and groaned up the hill.', 2, 'A car cannot really cough or groan; it is given human actions. That is personification.'),
  fig(1, 'I have told you a million times to shut the door!', 3, 'Nobody has said it a million times. A huge exaggeration for effect is hyperbole.'),
  fig(1, 'The pillow was as soft as a cloud.', 0, 'The pillow is compared to a cloud using as … as, so it is a simile.'),
  fig(1, 'My little brother is a whirlwind in the kitchen.', 1, 'The brother is said to be a whirlwind, with no like or as, so it is a metaphor.'),
  fig(2, 'The wrinkled sea beneath him crawls;', 2, 'The sea is described as crawling, something a living creature does. Giving it this action is personification.', EAGLE_SRC),
  fig(2, 'And like a thunderbolt he falls.', 0, 'The eagle’s dive is compared to a thunderbolt using like: a simile.', EAGLE_SRC),
  fig(2, 'This backpack weighs a ton.', 3, 'A backpack does not weigh a ton; the exaggeration shows how heavy it feels. That is hyperbole.'),
  fig(2, 'The fog comes\non little cat feet.', 1, 'The fog is spoken of as if it were a cat, walking on cat feet, without like or as. Sandburg’s whole poem is an extended metaphor.', FOG_SRC),
  fig(3, 'Fluttering and dancing in the breeze.', 2, 'The daffodils are described as dancing, a human action. Wordsworth personifies the flowers.', DAFFODILS_SRC),
  fig(3, '“Hope” is the thing with feathers -\nThat perches in the soul -', 1, 'Hope is said to be a bird (“the thing with feathers” that perches), with no like or as. That is a metaphor.', HOPE_SRC),
  fig(3, 'I wandered lonely as a cloud', 0, 'The speaker compares himself to a cloud using as: a simile.', DAFFODILS_SRC),
  fig(3, 'The homework stretched on for a hundred years.', 3, 'Homework cannot last a hundred years. The exaggeration shows how long it felt: hyperbole.'),
];

const EFFECT = [
  Q(1, 'What does the personification in “The wind howled angrily all night” suggest?', 'The wind was loud and wild.', ['The wind was soft and gentle.', 'The wind had stopped blowing.', 'Someone was howling outside.'],
    'Howling angrily is what an upset creature does. It makes the wind sound loud and fierce.'),
  Q(1, 'Why might a writer say “I’m so hungry I could eat a horse”?', 'To show how very hungry they are', ['To say that they really eat horses', 'To ask someone for a horse to ride', 'To describe a meal that they cooked'],
    'This is hyperbole: the exaggeration makes the feeling of hunger stronger. It is not meant literally.'),
  Q(2, 'In Tennyson’s poem, what does the eagle clasping the crag “with crooked hands” suggest about the bird?', 'It grips the rock tightly, like a strong old man.', ['It is injured and cannot fly any longer.', 'It is building a nest out of small rocks.', 'It is frightened of the height of the cliff.'],
    'Calling the claws hands personifies the eagle, and crooked suggests their curved, gripping shape. The eagle seems powerful and in control.',
    EAGLE, EAGLE_SRC),
  Q(2, 'What does Sandburg’s comparison of fog to a cat suggest about the fog?', 'It arrives silently and moves softly.', ['It is loud and frightening to animals.', 'It is dark grey like a stray cat’s fur.', 'It lasts for a very long time in cities.'],
    'Cats walk on quiet, padded feet and sit still before moving on. The comparison shows the fog creeping in quietly and leaving.', FOG, FOG_SRC),
  Q(3, 'What does Dickinson’s metaphor of hope as a bird that “never stops - at all” suggest?', 'Hope keeps going inside us even in hard times.', ['Hope flies away as soon as trouble comes along.', 'Birds are the most hopeful animals there are.', 'Hope can only be found in the songs of birds.'],
    'A bird singing without stopping, inside the soul, suggests that hope is always there, quietly keeping us going.', HOPE, HOPE_SRC),
  Q(3, 'Why does Wordsworth describe the daffodils as “a crowd” that is “dancing”?', 'To make the flowers seem joyful and full of life', ['To show that people were dancing near the lake', 'To warn that the flowers were being trampled', 'To explain how daffodils grow from bulbs'],
    'Crowd and dancing personify the flowers, making them seem like a lively, happy group. This contrasts with the speaker’s loneliness.', DAFFODILS, DAFFODILS_SRC),
];

// ---------------------------------------------------------------------------- 2.2 sound devices

const SOUNDS = ['Alliteration', 'Onomatopoeia', 'Assonance', 'Rhyme'];
const snd = (d: 1 | 2 | 3, line: string, k: number, why: string, source?: string) =>
  Q(d, 'Which sound device is used most in this line?', SOUNDS[k], SOUNDS.filter((_, i) => i !== k), why, line, source);

const SOUND = [
  snd(1, 'Silly Sally sang seven songs.', 0, 'Several nearby words begin with the same s sound. Repeating a beginning sound is alliteration.'),
  snd(1, 'Buzz! went the bee, and the fire went crackle and pop.', 1, 'Buzz, crackle and pop sound like the noises they name. That is onomatopoeia.'),
  snd(2, 'He clasps the crag with crooked hands;', 0, 'Clasps, crag and crooked all start with a hard k sound: alliteration.', EAGLE_SRC),
  snd(2, 'Each sweet green leaf in the deep, dim forest.', 2, 'The long e vowel sound repeats inside each, sweet, green, leaf and deep, though none of them rhyme. Repeated vowel sounds are assonance.'),
  snd(2, 'The brook went splish and splash and gurgle over the stones.', 1, 'Splish, splash and gurgle imitate the sounds of water.'),
  snd(3, 'Faster than fairies, faster than witches,', 0, 'Faster, fairies and faster begin with the same f sound. Stevenson uses it to make the line rush along like the train.', RAILWAY_SRC),
  snd(3, 'Hear the mellow wedding bells, golden bells.', 2, 'The short e sound repeats in mellow, wedding and bells. This echo of a vowel sound is assonance.', 'after Edgar Allan Poe, “The Bells” (1849)'),
  snd(3, 'The hiss and the sizzle of bacon at dawn.', 1, 'Hiss and sizzle sound like the noise of frying bacon: onomatopoeia.'),
];

const REPEAT = [
  Q(1, 'A line or group of lines that repeats through a poem, like a chorus, is called…', 'A refrain', ['A stanza', 'A simile', 'A rhyme'],
    'A refrain is repeated at regular points in a poem or song, like a chorus.'),
  Q(1, 'Why might a poet repeat “Faster than fairies, faster than witches”?', 'To make the line feel quick, like the train', ['To show that fairies and witches are real', 'To slow the poem down so it feels calm', 'To fill space because nothing else rhymed'],
    'Repeating faster than gives the line a fast, rushing beat, like the speeding train in the poem.', RAILWAY, RAILWAY_SRC),
  Q(2, 'What is the effect of the repetition in this verse?', 'It stresses how long and tiring the wait is.', ['It shows that the bus came early that day.', 'It makes the waiting seem fun and exciting.', 'It tells the reader exactly what time it is.'],
    'Saying “we waited” three times makes the reader feel the long, tiring wait.',
    'We waited and we waited,\nAs the cold rain came down,\nWe waited for the last bus\nTo carry us to town.', OWN),
  Q(2, 'In a poem, every stanza ends “And still the river runs.” What does this refrain most likely suggest?', 'That some things go on whatever happens', ['That the river is about to flood the town', 'That the poet has forgotten what to write', 'That the river has finally dried up'],
    'A refrain that returns after every change in the poem suggests something that stays the same, no matter what else happens.'),
  Q(3, 'Which choice explains how repetition and sound work together in “Bridges and houses, hedges and ditches”?', 'The repeated pairs echo the train’s steady rhythm.', ['The words are listed in order of their size, smallest first.', 'The line slows down to show the train coming to a stop.', 'The pairs show that the train is travelling backwards.'],
    'The line repeats the pattern “___ and ___”, with a steady beat, like the clatter of wheels on the rails.', RAILWAY, RAILWAY_SRC),
  Q(3, 'Why might a poet repeat the first line of a poem as its last line?', 'To bring the poem full circle and stress its idea', ['To make the poem long enough to be published in a book', 'To show that the poem has no real ending of its own', 'To introduce a brand new idea at the very end of it'],
    'Ending where you began gives the poem a sense of completeness and leaves the key line in the reader’s mind.'),
];

// ---------------------------------------------------------------------------- 2.3 stanzas and rhyme scheme

const RHYME = [
  Q(1, 'What is the rhyme scheme of this stanza?', 'AABB', ['ABAB', 'ABCB', 'ABBA'],
    'witches / ditches rhyme (A A), and battle / cattle rhyme (B B).', RAILWAY, RAILWAY_SRC),
  Q(1, 'What is the rhyme scheme of this stanza?', 'ABAB', ['AABB', 'ABCB', 'AAAA'],
    'night (A), street (B), white (A), feet (B): the first and third lines rhyme, and so do the second and fourth.',
    'The snow came softly in the night\nAnd covered every street,\nUntil the town was white, all white,\nBeneath our boots and feet.', OWN),
  Q(2, 'What is the rhyme scheme of the first stanza of “The Eagle”?', 'AAA', ['ABA', 'AAB', 'ABC'],
    'hands, lands and stands all rhyme, so every line is A. A three-line stanza that all rhymes is a rhyming tercet.', EAGLE, EAGLE_SRC),
  Q(2, 'What is the rhyme scheme of this stanza?', 'ABCB', ['ABAB', 'AABB', 'ABBA'],
    'Only the second and fourth lines rhyme (bright / night). The first and third lines end with new sounds, C and A.',
    'The lantern swung above the door,\nIts little flame was bright,\nAnd every moth for miles around\nCame dancing through the night.', OWN),
  Q(3, 'What is the rhyme scheme of this stanza?', 'ABABCC', ['AABBCC', 'ABABAB', 'ABCABC'],
    'cloud (A), hills (B), crowd (A), daffodils (B), trees (C), breeze (C). Wordsworth ends with a rhyming couplet.', DAFFODILS, DAFFODILS_SRC),
  Q(3, 'What is the rhyme scheme of this stanza?', 'ABBA', ['ABAB', 'AABB', 'ABCA'],
    'door (A) and floor (A) frame the stanza, with chair (B) and stair (B) in between. This is an enclosed rhyme.',
    'The cat sat waiting by the door,\nShe would not settle on her chair,\nShe watched the shadow on the stair,\nThen dropped, asleep, upon the floor.', OWN),
];

const STANZA = [
  Q(1, 'What is a two-line stanza called?', 'A couplet', ['A tercet', 'A quatrain', 'A sestet'],
    'A couplet is two lines, usually rhyming. A tercet has three lines, a quatrain four and a sestet six.'),
  Q(1, 'What is a four-line stanza called?', 'A quatrain', ['A couplet', 'A tercet', 'A sestet'],
    'Quatrain comes from the French for four. It is the most common stanza in English poetry.'),
  Q(2, 'Each stanza of “The Eagle” has three lines. What is each stanza called?', 'A tercet', ['A couplet', 'A quatrain', 'A sestet'],
    'A three-line stanza is a tercet.', EAGLE, EAGLE_SRC),
  Q(2, 'How many stanzas does Sandburg’s “Fog” have, and how long are they?', 'Two: a couplet and a quatrain', ['One stanza of six lines', 'Two quatrains of four lines', 'Three couplets of two lines'],
    'The first stanza has two lines (a couplet) and the second has four (a quatrain). Free verse can mix stanza lengths.', FOG, FOG_SRC),
  Q(3, 'The first stanza of Wordsworth’s poem has six lines. What is it called?', 'A sestet', ['A quatrain', 'A tercet', 'A couplet'],
    'A six-line stanza is a sestet. Its last two lines (trees / breeze) form a rhyming couplet inside it.', DAFFODILS, DAFFODILS_SRC),
  Q(3, 'A poem has three quatrains and a final couplet. How many lines does it have?', '14', ['12', '10', '16'],
    'Three quatrains give 3 × 4 = 12 lines, and the couplet adds 2: 14 lines. (This is the shape of a Shakespearean sonnet.)'),
];

// ---------------------------------------------------------------------------- 2.4 mood

const MOOD = [
  Q(1, 'What is the mood of this passage?', 'Cheerful', ['Gloomy', 'Frightening', 'Angry'],
    'Sunshine, laughter, a bright kite and music create a happy, cheerful feeling.',
    'Sunshine spilled over the meadow. Children laughed as a bright red kite danced overhead, and somewhere an ice-cream van played its tinkling tune.', OWN),
  Q(1, 'What is the mood of this passage?', 'Frightening', ['Peaceful', 'Silly', 'Joyful'],
    'Darkness, a creaking door, a cold draught and footsteps that stop suddenly create fear.',
    'The candle flickered and went out. Somewhere in the dark house a door creaked open, a cold draught crept across the floor, and the footsteps on the stairs stopped.', OWN),
  Q(2, 'What mood does the last line of “The Eagle” create?', 'Tense and powerful', ['Calm and sleepy', 'Silly and playful', 'Sad and lonely'],
    'The eagle watches from high walls, then falls “like a thunderbolt”. The sudden, powerful dive creates tension and a sense of power.', EAGLE, EAGLE_SRC),
  Q(2, 'What is the mood of Sandburg’s “Fog”?', 'Quiet and calm', ['Loud and exciting', 'Angry and harsh', 'Happy and lively'],
    'Little cat feet, sitting, silent haunches and moving on are soft, slow images. The mood is quiet and calm.', FOG, FOG_SRC),
  Q(3, 'How does the mood change in this passage?', 'From peaceful to alarmed', ['From alarmed to peaceful', 'From cheerful to bored', 'It stays gloomy throughout'],
    'The first sentences (still water, birdsong, a gentle breeze) are peaceful. The crack of thunder and the scramble for shore make the mood alarmed.',
    'The lake lay still as glass. Birds sang in the reeds, and a gentle breeze rocked the boat. Then thunder cracked overhead, and we scrambled for the oars.', OWN),
  Q(3, 'Wordsworth’s speaker begins “lonely as a cloud”, then sees the daffodils. How does the mood change?', 'From lonely to delighted', ['From delighted to lonely', 'From calm to frightened', 'From angry to sorry'],
    'The speaker starts out lonely, but the sudden sight of the golden, dancing flowers brings delight.', DAFFODILS, DAFFODILS_SRC),
];

const MOODWORDS = [
  Q(1, 'Which group of words would best create a gloomy mood?', 'grey, drizzle, empty, silent', ['bright, giggle, sparkle, sunny', 'zoom, rush, cheer, race', 'warm, cosy, glowing, snug'],
    'Grey, drizzle, empty and silent make a scene feel dull and sad. The other groups are lively or cosy.'),
  Q(1, 'Which word in the passage most helps create a peaceful mood?', 'gently', ['clock', 'room', 'cat'],
    'Gently describes slow, soft movement, which makes the scene feel peaceful. The other words are just things in the scene.',
    'The clock ticked softly, and the cat purred as snow fell gently past the window of the warm room.', OWN),
  Q(2, 'Which words in the passage create a feeling of fear?', 'creaked, cold draught, crept', ['candle, house, floor, stairs', 'door, stairs, somewhere, house', 'the, and, on, a, somewhere'],
    'Creaked, cold draught and crept are sounds and sensations that make the reader uneasy.',
    'The candle flickered and went out. Somewhere in the dark house a door creaked open, a cold draught crept across the floor, and the footsteps on the stairs stopped.', OWN),
  Q(2, 'A writer wants a joyful mood. Which sentence works best?', 'Balloons bobbed and music rang out across the square.', ['Balloons drifted over the empty, silent square.', 'The square was quiet except for one barking dog.', 'Rain dripped from the stalls in the grey square.'],
    'Bobbing balloons and ringing music are lively and happy. The other sentences feel empty, quiet or dreary.'),
  Q(3, 'Which word from “The Eagle” most adds to its lonely, majestic mood?', 'lonely', ['crooked', 'wrinkled', 'falls'],
    'The eagle stands “Close to the sun in lonely lands”: high, alone and grand. Lonely names that feeling directly.', EAGLE, EAGLE_SRC),
  Q(3, 'How does the writer create suspense in this passage?', 'Short sentences and a sound that suddenly stops', ['Long descriptions of sunny weather and flowers', 'Jokes and silly names for every character', 'A list of facts about how houses are built'],
    'The short sentences slow the reader down, and the sound stopping suddenly leaves the reader waiting to find out what comes next.',
    'Tap. Tap. Tap. Something was at the window. NAME held {his} breath. Then the tapping stopped.', OWN),
];

// ---------------------------------------------------------------------------- skills

export const POETRY_SKILLS: SkillDef[] = [
  skill({ id: 'e6-figure-type', name: 'Figures of speech', description: 'Tell similes, metaphors, personification and hyperbole apart.', outcomes: B1, lessonId: 'e6-2-1', format: 'mc', gen: bank(TYPE, ['Like or as means a simile; saying one thing is another is a metaphor.', 'Human actions for a thing: personification. A huge exaggeration: hyperbole.']) }),
  skill({ id: 'e6-figure-effect', name: 'What a figure of speech adds', description: 'Explain what a simile, metaphor, personification or hyperbole tells the reader.', outcomes: B1, lessonId: 'e6-2-1', format: 'mc', gen: bank(EFFECT, ['Ask: what do the two things being compared have in common?', 'Think about the feeling the words create.']) }),
  skill({ id: 'e6-sound-devices', name: 'Sound devices', description: 'Identify alliteration, onomatopoeia, assonance and rhyme.', outcomes: B1, lessonId: 'e6-2-2', format: 'mc', gen: bank(SOUND, ['Alliteration repeats beginning sounds; assonance repeats vowel sounds inside words.', 'Onomatopoeia sounds like what it names.']) }),
  skill({ id: 'e6-repetition', name: 'Repetition and refrain', description: 'Explain the effect of repetition and refrain in a poem.', outcomes: B1, lessonId: 'e6-2-2', format: 'mc', gen: bank(REPEAT, ['Repetition makes an idea or feeling stronger.', 'A refrain returns like a chorus.']) }),
  skill({ id: 'e6-rhyme-scheme', name: 'Rhyme scheme', description: 'Write the rhyme scheme of a stanza with letters.', outcomes: B1, lessonId: 'e6-2-3', format: 'mc', gen: bank(RHYME, ['Give the first end sound A; every new sound gets the next letter.', 'Say the last word of each line aloud.']) }),
  skill({ id: 'e6-stanza-names', name: 'Kinds of stanza', description: 'Name couplets, tercets, quatrains and sestets.', outcomes: B1, lessonId: 'e6-2-3', format: 'mc', gen: bank(STANZA, ['Couplet 2, tercet 3, quatrain 4, sestet 6.', 'Count the lines between the blank spaces.']) }),
  skill({ id: 'e6-mood', name: 'Mood', description: 'Describe the mood of a poem or passage, and how it changes.', outcomes: B1, lessonId: 'e6-2-4', format: 'mc', gen: bank(MOOD, ['Mood is the feeling a text gives the reader.', 'Look at the images, sounds and weather.']) }),
  skill({ id: 'e6-mood-words', name: 'Words that create mood', description: 'Find and choose the words and techniques that create a mood.', outcomes: B1, lessonId: 'e6-2-4', format: 'mc', gen: bank(MOODWORDS, ['Look for describing words and verbs that carry feeling.', 'Sentence length can create mood too.']) }),
];
