/**
 * Grade 5 English, Unit 2: Poetry (E5-B1). Rhyme and rhythm, similes and metaphors, images and the
 * senses, and forms of poetry. Poems by Robert Louis Stevenson (A Child’s Garden of Verses, 1885),
 * Christina Rossetti (Sing-Song, 1872) and Edward Lear (A Book of Nonsense, 1846) are in the public
 * domain; the other verses are written for Gradileo.
 */
import { mc, part, skill, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { bank, people, Q, quote } from './common.ts';

const B1 = ['E5-B1'];

// ---------------------------------------------------------------------------- poems

interface Poem {
  lines: string[];
  /** Stanza breaks: the number of lines in each stanza. */
  stanzas?: number[];
  source: string;
  /** The rhyme pattern of the first four lines. */
  scheme?: string;
}

const RAIN: Poem = { lines: ['The rain is raining all around,', 'It falls on field and tree,', 'It rains on the umbrellas here,', 'And on the ships at sea.'], source: 'Robert Louis Stevenson, “Rain” (1885)', scheme: 'ABCB' };
const BED: Poem = { lines: ['In winter I get up at night', 'And dress by yellow candle-light.', 'In summer, quite the other way,', 'I have to go to bed by day.'], source: 'Robert Louis Stevenson, “Bed in Summer” (1885), first stanza', scheme: 'AABB' };
const WIND: Poem = {
  lines: ['Who has seen the wind?', 'Neither I nor you:', 'But when the leaves hang trembling,', 'The wind is passing through.', 'Who has seen the wind?', 'Neither you nor I:', 'But when the trees bow down their heads,', 'The wind is passing by.'],
  stanzas: [4, 4],
  source: 'Christina Rossetti, “Who Has Seen the Wind?” (1872)',
  scheme: 'ABCB',
};
const SHADOW: Poem = { lines: ['I have a little shadow that goes in and out with me,', 'And what can be the use of him is more than I can see.', 'He is very, very like me from the heels up to the head;', 'And I see him jump before me, when I jump into my bed.'], source: 'Robert Louis Stevenson, “My Shadow” (1885), first stanza', scheme: 'AABB' };
const WINDY: Poem = { lines: ['Whenever the moon and stars are set,', 'Whenever the wind is high,', 'All night long in the dark and wet,', 'A man goes riding by.'], source: 'Robert Louis Stevenson, “Windy Nights” (1885), first lines', scheme: 'ABAB' };
const BEARD: Poem = { lines: ['There was an Old Man with a beard,', 'Who said, “It is just as I feared!', 'Two Owls and a Hen,', 'Four Larks and a Wren,', 'Have all built their nests in my beard!”'], source: 'Edward Lear, A Book of Nonsense (1846)', scheme: 'AABBA' };
const OWN_AABB: Poem = { lines: ['The puppy chased a yellow ball', 'Across the yard and down the hall.', 'He skidded on the kitchen floor', 'And landed by the open door.'], source: 'written for Gradileo', scheme: 'AABB' };
const OWN_ABAB: Poem = { lines: ['The snow came softly in the night', 'And covered every street,', 'Until the town was white, all white,', 'Beneath our boots and feet.'], source: 'written for Gradileo', scheme: 'ABAB' };
const OWN_STANZAS: Poem = {
  lines: ['The bus is late, the sky is grey,', 'We stamp our feet and blow.', 'At last it rumbles round the bend', 'And splashes through the snow.', 'We tumble in and find our seats', 'And draw on misty glass;', 'The driver hums a cheerful tune', 'And lets the traffic pass.', 'At school we jump down one by one', 'And race in through the gate.'],
  stanzas: [4, 4, 2],
  source: 'written for Gradileo',
};

const show = (p: Poem) => {
  const parts: string[] = [];
  if (p.stanzas) {
    let i = 0;
    for (const n of p.stanzas) {
      parts.push(p.lines.slice(i, i + n).join('\n'));
      i += n;
    }
  } else parts.push(p.lines.join('\n'));
  return `${quote(parts.join('\n\n'))}\n>\n> — ${p.source}`;
};

// ---------------------------------------------------------------------------- 2.1 rhyme

const FAMILIES: string[][] = [
  ['cat', 'hat', 'mat', 'flat', 'bat', 'chat'],
  ['light', 'night', 'bright', 'kite', 'white', 'bite'],
  ['play', 'day', 'way', 'stay', 'grey', 'say'],
  ['tree', 'sea', 'free', 'bee', 'key', 'knee'],
  ['rain', 'train', 'lane', 'plane', 'chain', 'again'],
  ['moon', 'spoon', 'soon', 'tune', 'June', 'balloon'],
  ['snow', 'grow', 'slow', 'though', 'glow', 'below'],
  ['bear', 'chair', 'hair', 'where', 'stare', 'square'],
  ['sing', 'ring', 'spring', 'wing', 'king', 'thing'],
  ['boat', 'coat', 'goat', 'float', 'note', 'wrote'],
];
/** Words that look as if they rhyme but do not (or rhyme though they look different). */
const EYE: Array<{ w: string; looks: string; rhymes: string }> = [
  { w: 'love', looks: 'move', rhymes: 'glove' },
  { w: 'cough', looks: 'though', rhymes: 'off' },
  { w: 'bear', looks: 'fear', rhymes: 'chair' },
  { w: 'blood', looks: 'food', rhymes: 'mud' },
  { w: 'great', looks: 'treat', rhymes: 'late' },
  { w: 'shoe', looks: 'toe', rhymes: 'blue' },
];

function rhyme(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const [fam, other] = rng.sample(FAMILIES, 2);
    const [w, r] = rng.sample(fam, 2);
    const wrong = rng.sample(other, 3);
    return {
      prompt: `Which word rhymes with **${w}**?`,
      parts: [part(mc(rng, r, wrong))],
      hints: ['Words rhyme when they end with the same sound.', `Say “${w}” and each choice aloud, and listen to the ending.`],
      solution: [`“${w}” and “${r}” end with the same sound, so they rhyme.`],
    };
  }
  if (d === 2) {
    const e = rng.pick(EYE);
    const fam = rng.pick(FAMILIES);
    return {
      prompt: `Which word rhymes with **${e.w}**? Listen to the sounds, not the spelling.`,
      parts: [part(mc(rng, e.rhymes, [e.looks, ...rng.sample(fam, 2)]))],
      hints: ['Rhyme is about sound. Words can look alike and not rhyme, or look different and rhyme.', 'Say each word aloud.'],
      solution: [`“${e.w}” and “${e.rhymes}” end with the same sound. “${e.looks}” is spelled like “${e.w}”, but it sounds different.`],
    };
  }
  const p = rng.pick([RAIN, BED, SHADOW, WINDY, BEARD, OWN_AABB, OWN_ABAB, WIND]);
  const all = ['AABB', 'ABAB', 'ABCB', 'AABBA', 'ABBA'];
  const scheme = p.scheme!;
  const lines = p.lines.slice(0, scheme.length);
  return {
    prompt: `${show({ ...p, lines, stanzas: undefined })}\n\nWhich rhyme pattern do these lines follow? (Lines that rhyme get the same letter.)`,
    parts: [part(mc(rng, scheme, all.filter((s) => s !== scheme)))],
    hints: ['Give the first line the letter A. A line that rhymes with it is also A; a new ending sound gets the next letter, B.', 'Read the last word of every line aloud.'],
    solution: [`The last words are ${lines.map((l) => `“${l.replace(/[^A-Za-z’\- ]+$/, '').split(' ').pop()}”`).join(', ')}.`, `Matching sounds get matching letters, so the pattern is ${scheme}.`],
  };
}

// ---------------------------------------------------------------------------- 2.1 syllables

const WORDS: Array<[string, number]> = [
  ['cat', 1], ['tree', 1], ['jump', 1], ['night', 1], ['school', 1], ['bright', 1],
  ['rabbit', 2], ['garden', 2], ['window', 2], ['pencil', 2], ['happy', 2], ['river', 2], ['thunder', 2], ['yellow', 2],
  ['butterfly', 3], ['elephant', 3], ['beautiful', 3], ['banana', 3], ['tomorrow', 3], ['umbrella', 3], ['dinosaur', 3],
  ['caterpillar', 4], ['watermelon', 4], ['helicopter', 4], ['information', 4], ['television', 4], ['alligator', 4],
];

function syllables(rng: Rng, d: Difficulty): GenOutput {
  if (d <= 2) {
    const pool = WORDS.filter(([, n]) => (d === 1 ? n <= 3 : n >= 2));
    const [w, n] = rng.pick(pool);
    const opts = [1, 2, 3, 4, 5].filter((k) => k !== n);
    return {
      prompt: `How many syllables does the word **${w}** have?`,
      parts: [part(mc(rng, String(n), rng.sample(opts, 3).map(String)))],
      hints: ['A syllable is a beat in a word. Clap as you say the word slowly.', 'Each syllable has one vowel sound.'],
      solution: [`Clap it out: ${w} has ${n} syllable${n === 1 ? '' : 's'}.`],
    };
  }
  const lines: Array<[string, number]> = [
    ['The cat sat on the mat.', 6],
    ['Snowflakes fall softly', 5],
    ['Whenever the wind is high,', 7],
    ['The rain is raining all around,', 8],
    ['A frog jumps into the pond', 7],
    ['Over the hills the sun goes down', 8],
  ];
  const [l, n] = rng.pick(lines);
  return {
    prompt: `How many syllables are in this line of poetry?\n\n> ${l}`,
    parts: [part(mc(rng, String(n), [n - 1, n + 1, n + 2].map(String)))],
    hints: ['Clap once for every syllable as you read the line slowly.', 'Count each word’s syllables, then add them up.'],
    solution: [`Count word by word and add: the line has ${n} syllables.`],
  };
}

// ---------------------------------------------------------------------------- 2.2 similes and metaphors

const COMPARISONS: Array<{ s: string; kind: 'simile' | 'metaphor' | 'neither'; d: Difficulty }> = [
  { s: 'The baby’s cheeks were as red as apples.', kind: 'simile', d: 1 },
  { s: 'NAME ran like the wind.', kind: 'simile', d: 1 },
  { s: 'The classroom was a zoo after lunch.', kind: 'metaphor', d: 1 },
  { s: 'NAME’s bedroom is a pigsty.', kind: 'metaphor', d: 1 },
  { s: 'The lake was as smooth as glass.', kind: 'simile', d: 1 },
  { s: 'The stars were diamonds in the sky.', kind: 'metaphor', d: 1 },
  { s: 'The old dog was as slow as a snail.', kind: 'simile', d: 2 },
  { s: 'Time is a thief that steals our summers.', kind: 'metaphor', d: 2 },
  { s: 'Her voice was music to his ears.', kind: 'metaphor', d: 2 },
  { s: 'The clouds looked like cotton balls.', kind: 'simile', d: 2 },
  { s: 'NAME likes pizza more than pasta.', kind: 'neither', d: 2 },
  { s: 'The snow was a white blanket over the town.', kind: 'metaphor', d: 3 },
  { s: 'The runner shot off the line like a rocket.', kind: 'simile', d: 3 },
  { s: 'Like many children, NAME loves the park.', kind: 'neither', d: 3 },
  { s: 'NAME’s brother is taller than their father.', kind: 'neither', d: 3 },
  { s: 'The moon was a silver coin in the dark pocket of the night.', kind: 'metaphor', d: 3 },
];

function similes(rng: Rng, d: Difficulty): GenOutput {
  const pool = COMPARISONS.filter((c) => c.d <= d && (d > 1 || c.kind !== 'neither'));
  const c = rng.pick(pool);
  const [who] = people(rng, 1);
  const s = c.s.replace(/NAME/g, who.name);
  const labels = d === 1 ? ['A simile', 'A metaphor'] : ['A simile', 'A metaphor', 'Neither'];
  const right = c.kind === 'simile' ? 'A simile' : c.kind === 'metaphor' ? 'A metaphor' : 'Neither';
  const why =
    c.kind === 'simile'
      ? 'It compares two different things using “like” or “as”, so it is a simile.'
      : c.kind === 'metaphor'
        ? 'It compares two different things by saying one thing is the other, without “like” or “as”, so it is a metaphor.'
        : 'It compares, or uses “like”, but it does not compare two different kinds of things to show how they are alike, so it is neither a simile nor a metaphor. (“More than” and “like” meaning “enjoy” or “such as” do not make a simile.)';
  return {
    prompt: `Is this sentence a simile or a metaphor?\n\n> ${s}`,
    parts: [part({ kind: 'mc', choices: labels.map((md, i) => ({ id: 'abc'[i], md })), correct: 'abc'[labels.indexOf(right)] })],
    hints: ['A simile compares two different things using “like” or “as”.', 'A metaphor says one thing is another.'],
    solution: [why],
  };
}

const MEANINGS: Q[] = [
  Q(1, 'What does the simile tell you about NAME?', 'NAME was very hungry', ['NAME was very tired', 'NAME was very angry', 'NAME was very shy'],
    '“Ate like a hungry wolf” compares NAME to a wolf gulping its food, so NAME was eating fast because {he} was very hungry.',
    'After the long hike, NAME ate like a hungry wolf.'),
  Q(1, 'What does the metaphor mean?', 'The room was very hot', ['The room was very large', 'The room was very noisy', 'The room was very clean'],
    'An oven is very hot. Saying the classroom “was an oven” means it was very hot.',
    'With the heater stuck on, the classroom was an oven.'),
  Q(1, 'What does the simile mean?', 'The water was very cold', ['The water was very deep', 'The water was very dirty', 'The water was very loud'],
    'Ice is very cold, so “as cold as ice” means the water was very cold.',
    'NAME dipped a toe into the lake. The water was as cold as ice.'),
  Q(2, 'What does the metaphor suggest about NAME?', 'NAME is always moving and full of energy', ['NAME is always tired and ready for bed', 'NAME is always quiet and very still', 'NAME is always cross and in a bad mood'],
    'A whirlwind spins fast and never stops, so calling NAME a whirlwind suggests {he} is always busy and energetic.',
    'On Saturday mornings, NAME is a whirlwind: up early, out on {his} bike, and back for breakfast before anyone else is awake.'),
  Q(2, 'What does the simile tell you about the old man’s hands?', 'They were rough and dry', ['They were soft and warm', 'They were small and pale', 'They were wet and cold'],
    'Sandpaper is rough and dry. Saying the hands felt “like sandpaper” means they were rough.',
    'The old farmer shook NAME’s hand. His hands felt like sandpaper.'),
  Q(2, 'Why does the poet compare the moon to a lamp?', 'To show that the moon gives light at night', ['To show that the moon is very small', 'To show that the moon is made of glass', 'To show that the moon is far away'],
    'A lamp gives light in the dark. The comparison shows the moon lighting up the night.',
    'The moon, a lamp above the town,\nShone softly as the night came down.', 'written for Gradileo'),
  Q(3, 'What does the metaphor in these lines suggest?', 'The road is long and winds through the land', ['The road is shiny and smooth like silk', 'The road is short and easy to walk', 'The road is busy with ribbons and flags'],
    'A ribbon is long and thin and curls this way and that. Calling the road a ribbon suggests a long, winding road.',
    'The road was a ribbon of grey\nThat curled through the hills far away.', 'written for Gradileo'),
  Q(3, 'What feeling does the simile create?', 'Lonely, because the house stands empty and forgotten', ['Cheerful, because the house is bright and full of noise', 'Excited, because the house is about to have a party', 'Angry, because the house has been damaged in a storm'],
    'An old shoe left by the road is unwanted and forgotten. Comparing the house to one makes it feel lonely and abandoned.',
    'At the end of the lane stood the old house, like a shoe that someone had left by the road.'),
];

// ---------------------------------------------------------------------------- 2.3 images and the senses

const SENSES = ['Sight', 'Hearing', 'Smell', 'Taste', 'Touch'];
const IMAGES: Array<[string, number, Difficulty]> = [
  ['The bright red balloon floated over the green field.', 0, 1],
  ['The thunder boomed and rumbled across the sky.', 1, 1],
  ['The smell of fresh bread drifted out of the bakery.', 2, 1],
  ['The lemon was so sour that NAME’s mouth puckered.', 3, 1],
  ['The kitten’s fur was soft and warm against NAME’s cheek.', 4, 1],
  ['Golden sunlight sparkled on the waves.', 0, 1],
  ['The leaves crunched and crackled under our boots.', 1, 2],
  ['A sharp whiff of smoke came from the campfire.', 2, 2],
  ['The icy wind stung NAME’s ears.', 4, 2],
  ['The hot chocolate was sweet and creamy.', 3, 2],
  ['Bees buzzed lazily among the flowers.', 1, 2],
  ['The rough bark scratched NAME’s palms as {he} climbed.', 4, 3],
  ['The salty spray left a tang on NAME’s lips.', 3, 3],
  ['Long purple shadows crept across the snow.', 0, 3],
  ['The damp cellar smelled of earth and old potatoes.', 2, 3],
];

function senses(rng: Rng, d: Difficulty): GenOutput {
  const pool = IMAGES.filter(([, , k]) => k === d);
  const [t, k] = rng.pick(pool);
  const [who] = people(rng, 1);
  const s = t.replace(/NAME/g, who.name).replace(/\{he\}/g, who.he);
  return {
    prompt: `Which sense does this image appeal to most?\n\n> ${s}`,
    parts: [part({ kind: 'mc', choices: SENSES.map((md, i) => ({ id: 'abcde'[i], md })), correct: 'abcde'[k] })],
    hints: ['Imagery is language that helps you see, hear, smell, taste or feel something.', 'Find the key describing words and ask which part of your body would notice them.'],
    solution: [`The image is mostly about ${['what you see', 'what you hear', 'what you smell', 'what you taste', 'what you feel or touch'][k]}, so it appeals to ${SENSES[k].toLowerCase()}.`],
  };
}

const VIVID: Q[] = [
  Q(1, 'Which word makes this sentence most vivid? “The dog ___ across the yard.”', 'raced', ['went', 'moved', 'got'],
    '“Raced” shows exactly how the dog moved: fast. “Went”, “moved” and “got” are vague.'),
  Q(1, 'Which word makes this sentence most vivid? “NAME ___ the cold juice.”', 'gulped', ['had', 'got', 'took'],
    '“Gulped” shows how NAME drank: quickly, in big swallows. The other words could mean almost anything.'),
  Q(1, 'Which word is the most vivid way to describe a big storm?', 'fierce', ['nice', 'okay', 'fine'],
    '“Fierce” paints a picture of a wild, powerful storm. The others are weak, general words.'),
  Q(2, 'Which sentence uses the most vivid words?', 'The kitten pounced on the wriggling string.', ['The kitten went at the string that moved.', 'The kitten got the string that was there.', 'The kitten did something with the string.'],
    '“Pounced” and “wriggling” help the reader picture exactly what happens. The other sentences use vague words like went, got and did.'),
  Q(2, 'Which sentence helps you picture the scene best?', 'Waves crashed against the jagged rocks.', ['The sea was there beside some of the rocks.', 'Water went near the rocks on the beach.', 'There were rocks and also some water nearby.'],
    'Strong verbs (crashed) and exact adjectives (jagged, black) create a clear picture.'),
  Q(3, 'Which revision makes the sentence more vivid? “The old car went down the road.”', 'The rusty car rattled down the bumpy road.', ['The car that was old went on the road.', 'The old car went down the road quickly.', 'The car went down the road, and it was old.'],
    '“Rusty”, “rattled” and “bumpy” let the reader see and hear the car. The other versions only rearrange the same vague words.'),
  Q(3, 'Which revision appeals to the most senses? “It was a nice day at the fair.”', 'Music blared, popcorn sizzled and the bright rides spun.', ['It was a really very nice and good day at the fair.', 'The fair was nice, and we had a nice day there.', 'We went to the fair, and it was a nice day out.'],
    'The revision lets you hear the music, smell and hear the popcorn, and see the rides, so it appeals to several senses.'),
];

// ---------------------------------------------------------------------------- 2.4 forms

const HAIKU: Poem = { lines: ['A frog on a stone,', 'still as the green pond around,', 'then a splash, and gone.'], source: 'written for Gradileo' };
const ACROSTIC: Poem = { lines: ['**S**and between my toes,', '**E**very wave runs up the beach and slides back down again,', '**A** seagull watches.'], source: 'written for Gradileo' };
const FREE: Poem = { lines: ['The city wakes slowly:', 'a bus sighs at the corner,', 'shop shutters rattle up,', 'and somewhere a radio', 'starts to sing.'], source: 'written for Gradileo' };

const FORMS: Q[] = [
  Q(1, 'What kind of poem is this?', 'A haiku', ['A limerick', 'An acrostic', 'A ballad'],
    'A haiku has three lines of 5, 7 and 5 syllables and is often about nature. Count: A-frog-on-a-stone (5), still-as-the-green-pond-a-round (7), then-a-splash-and-gone (5).',
    HAIKU.lines.join('\n'), HAIKU.source),
  Q(1, 'What kind of poem is this?', 'A limerick', ['A haiku', 'An acrostic', 'Free verse'],
    'A limerick is a funny five-line poem. Lines 1, 2 and 5 rhyme (beard, feared, beard), and the short lines 3 and 4 rhyme with each other (Hen, Wren).',
    BEARD.lines.join('\n'), BEARD.source),
  Q(1, 'What kind of poem is this?', 'An acrostic', ['A haiku', 'A limerick', 'A ballad'],
    'In an acrostic poem, the first letters of the lines spell a word: here, S-E-A spells “sea”.',
    ACROSTIC.lines.join('\n'), ACROSTIC.source),
  Q(2, 'What kind of poem is this?', 'Free verse', ['A haiku', 'A limerick', 'An acrostic'],
    'Free verse has no regular rhyme or rhythm; its lines can be any length. This poem does not rhyme and does not follow a set pattern.',
    FREE.lines.join('\n'), FREE.source),
  Q(2, 'Which pattern belongs to a haiku?', 'Three lines of 5, 7 and 5 syllables', ['Five lines that rhyme AABBA', 'First letters that spell a word', 'Any number of lines that do not rhyme'],
    'A haiku is three lines long, with 5, 7 and 5 syllables. The others describe a limerick, an acrostic and free verse.'),
  Q(2, 'Which lines of a limerick rhyme with each other?', 'Lines 1, 2 and 5, and then lines 3 and 4', ['Lines 1 and 3, and then lines 2 and 4', 'Every line rhymes with every other line', 'None of the lines rhyme with each other'],
    'A limerick rhymes AABBA: the long lines 1, 2 and 5 rhyme, and the two short lines 3 and 4 rhyme.'),
  Q(3, 'A poet wants to write a short poem about a moment in nature, with a set number of syllables. Which form fits best?', 'A haiku', ['A limerick', 'An acrostic', 'Free verse'],
    'A haiku captures a single moment, often in nature, in three lines of 5, 7 and 5 syllables.'),
  Q(3, 'Why might a poet choose free verse instead of a rhyming form?', 'To sound more like natural speech, with no rules to follow', ['To make sure every line has exactly seven syllables', 'To spell out a hidden word with the first letters', 'To tell a funny story in five lines with a twist'],
    'Free verse has no fixed rhyme or rhythm, so the poet can shape the lines like natural speech. The other answers describe a haiku-like count, an acrostic and a limerick.'),
];

function linesStanzas(rng: Rng, d: Difficulty): GenOutput {
  const p = d === 1 ? rng.pick([RAIN, BED, HAIKU]) : d === 2 ? WIND : OWN_STANZAS;
  const ask = d === 1 || rng.chance(0.5) ? 'lines' : 'stanzas';
  const n = ask === 'lines' ? p.lines.length : (p.stanzas ?? [p.lines.length]).length;
  const wrong = (ask === 'lines' ? [n - 2, n - 1, n + 1, n + 2] : [n + 1, n + 2, n + 3]).filter((k) => k > 0 && k !== n);
  return {
    prompt: `${show(p)}\n\nHow many **${ask}** does this poem have?`,
    parts: [part(mc(rng, String(n), rng.sample(wrong, 3).map(String)))],
    hints: ['A line is one row of words in a poem.', 'A stanza is a group of lines, separated from the next group by a blank space.'],
    solution: [ask === 'lines' ? `Count each row of words: there are ${n} lines.` : `Count the groups of lines separated by blank spaces: there ${n === 1 ? 'is 1 stanza' : `are ${n} stanzas`}.`],
  };
}

export const POETRY_SKILLS: SkillDef[] = [
  skill({ id: 'e5-rhyme', name: 'Rhyme and rhyme pattern', description: 'Find rhyming words, and the rhyme pattern of a verse.', outcomes: B1, lessonId: 'e5-2-1', format: 'mc', gen: rhyme }),
  skill({ id: 'e5-syllables', name: 'Syllables and beats', description: 'Count the syllables in a word and in a line of poetry.', outcomes: B1, lessonId: 'e5-2-1', format: 'mc', gen: syllables }),
  skill({ id: 'e5-simile-metaphor', name: 'Simile or metaphor', description: 'Tell a simile, which uses like or as, from a metaphor.', outcomes: B1, lessonId: 'e5-2-2', format: 'mc', gen: similes }),
  skill({ id: 'e5-figurative-meaning', name: 'What a comparison means', description: 'Explain what a simile or metaphor tells the reader.', outcomes: B1, lessonId: 'e5-2-2', format: 'mc', gen: bank(MEANINGS, ['Think about what the two things being compared have in common.', 'Then ask what that tells you about the person, place or thing.']) }),
  skill({ id: 'e5-senses', name: 'Images and the senses', description: 'Name the sense an image appeals to.', outcomes: B1, lessonId: 'e5-2-3', format: 'mc', gen: senses }),
  skill({ id: 'e5-vivid-words', name: 'Vivid words', description: 'Choose exact, vivid words that help a reader picture a scene.', outcomes: B1, lessonId: 'e5-2-3', format: 'mc', gen: bank(VIVID, ['Vivid words are exact: “raced” instead of “went”, “jagged” instead of “big”.', 'Choose the words that help you picture, hear or feel the scene.']) }),
  skill({ id: 'e5-poem-forms', name: 'Forms of poetry', description: 'Recognize haiku, limericks, acrostic poems and free verse.', outcomes: B1, lessonId: 'e5-2-4', format: 'mc', gen: bank(FORMS, ['Count the lines, check the rhymes and the first letters, and count syllables if there are three lines.']) }),
  skill({ id: 'e5-lines-stanzas', name: 'Lines and stanzas', description: 'Count the lines and stanzas of a poem.', outcomes: B1, lessonId: 'e5-2-4', format: 'mc', gen: linesStanzas }),
];
