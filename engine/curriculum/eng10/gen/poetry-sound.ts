/**
 * Grade 10 English, lesson 2.2: Sound and Rhythm (10-B1). Alliteration, assonance, consonance,
 * onomatopoeia and internal rhyme; rhyme schemes written as letters (a typed answer); stressed
 * syllables, feet and iambic metre. Only stanzas whose rhymes are plain in modern pronunciation, and
 * only lines whose scansion is not in dispute, are used.
 */
import { fixedChoice, mc, numPart, part, skill, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, Part, SkillDef } from '../../../types.ts';
import { block, fill, pair } from './common.ts';
import {
  AUTUMN_OPENING, ASTRONOMER_ALL, BEARD_ALL, DEATH_ALL, FLANDERS_ALL, HOPE_ALL, ROSE_ALL, SONNET18_ALL, SONNET73_ALL, BELLS_JINGLE, BELLS_TINKLE, BELLS_WEDDING, CLOUD_LAST, CLOUD_OPENING, DEATH_FIRST, DEATH_GRAIN, DULCE_FIRST,
  EAGLE_ALL, FLANDERS_FIRST, MARINER_BREEZE, MARINER_SHIP, MARINER_WATER, RAINS_FIRST, RAVEN_CURTAIN, RAVEN_FIRST, REMEMBER_ALL, ROSE_FIRST, SONNET18_BUDS,
  SONNET18_COUPLET, SONNET29_FIRST, SONNET73_FIRST, SONNET73_LINE1, SONNET73_LINE3, TIGER_OPENING, TIGER_SECOND, linesOf, verseBlock, withBold, type Verse,
} from './poems.ts';
import { titled } from './texts.ts';

const L = 'e10-2-2';
const OUT = ['10-B1'];

// ---------------------------------------------------------------------------- sound devices

type Sound = 'alliteration' | 'assonance' | 'consonance' | 'onomatopoeia' | 'internal';
const SOUNDS: Sound[] = ['alliteration', 'assonance', 'consonance', 'onomatopoeia', 'internal'];
const SOUND_NAME: Record<Sound, string> = {
  alliteration: 'Alliteration',
  assonance: 'Assonance',
  consonance: 'Consonance',
  onomatopoeia: 'Onomatopoeia',
  internal: 'Internal rhyme',
};
const SOUND_WHAT: Record<Sound, string> = {
  alliteration: 'alliteration is the same consonant sound repeated at the start of nearby words',
  assonance: 'assonance is the same vowel sound repeated in nearby words that do not rhyme',
  consonance: 'consonance is the same consonant sound repeated inside or at the end of nearby words',
  onomatopoeia: 'onomatopoeia is a word that imitates the sound it names',
  internal: 'internal rhyme is two or more words rhyming within the same line',
};

interface SoundItem {
  text?: string;
  verse?: Verse;
  lead?: string;
  /** Words to put in bold in a public-domain verse. */
  phrase?: string;
  device: Sound;
  leave?: Sound[];
  why: string;
}
const WRITTEN_SOUNDS: SoundItem[] = [
  { device: 'alliteration', text: '**Big brown bears bounded** through the **bushes**.', leave: ['consonance'], why: 'The “b” sound starts “big”, “brown”, “bears”, “bounded” and “bushes”.' },
  { device: 'alliteration', text: 'The **wild wind whipped** the **washing** on the line.', leave: ['consonance'], why: 'The “w” sound starts “wild”, “wind”, “whipped” and “washing”.' },
  { device: 'alliteration', text: '**Silent snow slid slowly** from the roof.', leave: ['consonance'], why: 'The “s” sound starts “silent”, “snow”, “slid” and “slowly”.' },
  { device: 'alliteration', text: '**Five friendly frogs found** a **fallen** log.', leave: ['consonance'], why: 'The “f” sound starts “five”, “friendly”, “frogs”, “found” and “fallen”.' },
  { device: 'alliteration', text: 'NAME **carefully carried** the **cake** to the **car**.', leave: ['consonance'], why: 'The hard “c” (k) sound starts “carefully”, “carried”, “cake” and “car”.' },
  { device: 'assonance', text: 'We heard the **low moan** of the **old boat**.', why: 'The long “o” vowel sound repeats in “low”, “moan”, “old” and “boat”, but the words do not rhyme.' },
  { device: 'assonance', text: 'A **green tree** stood in the **deep field**.', why: 'The long “e” vowel sound repeats in “green”, “tree”, “deep” and “field”, but the words do not rhyme.' },
  { device: 'assonance', text: 'The **sad man packed** his **bag**.', why: 'The short “a” vowel sound repeats in “sad”, “man”, “packed” and “bag”, but the words do not rhyme.' },
  { device: 'assonance', text: 'NAME **made** a **cake** for the **great** day.', why: 'The long “a” vowel sound repeats in “made”, “cake” and “great”, but the words do not rhyme.' },
  { device: 'consonance', text: 'The **old** dog **hid** under the **bed**.', why: 'The “d” sound ends “old”, “hid” and “bed”; the words do not start with it, and they do not rhyme.' },
  { device: 'consonance', text: 'Please **lock** the **black truck**.', why: 'The “k” sound ends “lock”, “black” and “truck”; the words do not start with it, and they do not rhyme.' },
  { device: 'consonance', text: '**Mist rests** on the **vast coast**.', why: 'The “st” sound ends “mist”, “rests”, “vast” and “coast”; the words do not rhyme.' },
  { device: 'consonance', text: 'NAME **dropped** the **cup** on the **step**.', why: 'The “p” sound comes at the end of “dropped”, “cup” and “step”; the words do not start with it, and they do not rhyme.' },
  { device: 'onomatopoeia', text: 'The bacon **sizzled** in the pan.', why: '“Sizzled” imitates the sound of food frying.' },
  { device: 'onomatopoeia', text: 'The door **creaked** open.', why: '“Creaked” imitates the sound of an old hinge.' },
  { device: 'onomatopoeia', text: '**Splash!** A pebble hit the water.', why: '“Splash” imitates the sound of something hitting water.' },
  { device: 'onomatopoeia', text: 'The fire **crackled** and **hissed**.', why: '“Crackled” and “hissed” imitate the sounds of the fire.' },
  { device: 'onomatopoeia', text: 'The bees **buzzed** around the hive.', why: '“Buzzed” imitates the sound bees make.' },
  { device: 'internal', text: 'The **night** was **bright** with silver **light**.', leave: ['assonance'], why: '“Night”, “bright” and “light” rhyme within one line.' },
  { device: 'internal', text: 'I **sat** on the **mat** with my **cat**.', leave: ['assonance'], why: '“Sat”, “mat” and “cat” rhyme within one line.' },
  { device: 'internal', text: 'We **sang** as the bells **rang** out at noon.', leave: ['assonance'], why: '“Sang” and “rang” rhyme within one line.' },
  { device: 'internal', text: 'The **cook** read a **book** while she waited.', leave: ['assonance'], why: '“Cook” and “book” rhyme within one line.' },
];
const PD_SOUNDS: SoundItem[] = [
  { device: 'alliteration', verse: MARINER_BREEZE, phrase: 'The furrow followed free', leave: ['consonance'], lead: `From ${titled(MARINER_BREEZE.poem)} by Samuel Taylor Coleridge:`, why: 'The “f” sound starts “furrow”, “followed” and “free”.' },
  { device: 'internal', verse: MARINER_BREEZE, phrase: 'The fair breeze blew, the white foam flew,', leave: ['assonance', 'alliteration'], lead: `From ${titled(MARINER_BREEZE.poem)} by Samuel Taylor Coleridge:`, why: '“Blew” and “flew” rhyme within the same line.' },
  { device: 'internal', verse: linesOf(RAVEN_FIRST, 1, 2), phrase: 'Once upon a midnight dreary, while I pondered, weak and weary,', leave: ['assonance', 'alliteration'], lead: `The opening of ${titled(RAVEN_FIRST.poem)} by Edgar Allan Poe:`, why: '“Dreary” and “weary” rhyme within the same line.' },
  { device: 'alliteration', verse: linesOf(RAVEN_FIRST, 3, 4), phrase: 'nodded, nearly napping', leave: ['consonance'], lead: `From ${titled(RAVEN_FIRST.poem)} by Edgar Allan Poe:`, why: 'The “n” sound starts “nodded”, “nearly” and “napping”.' },
  { device: 'alliteration', verse: RAVEN_CURTAIN, phrase: 'silken sad', leave: ['consonance'], lead: `From ${titled(RAVEN_CURTAIN.poem)} by Edgar Allan Poe:`, why: 'The “s” sound starts “silken” and “sad”.' },
  { device: 'onomatopoeia', verse: BELLS_TINKLE, phrase: 'tinkle, tinkle, tinkle', lead: `From ${titled(BELLS_TINKLE.poem)} by Edgar Allan Poe:`, why: '“Tinkle” imitates the light ringing of small bells.' },
  { device: 'onomatopoeia', verse: BELLS_JINGLE, phrase: 'the jingling and the tinkling', lead: `From ${titled(BELLS_JINGLE.poem)} by Edgar Allan Poe:`, why: '“Jingling” and “tinkling” imitate the sounds of the bells.' },
  { device: 'assonance', verse: BELLS_WEDDING, phrase: 'mellow wedding-bells', leave: ['consonance'], lead: `From ${titled(BELLS_WEDDING.poem)} by Edgar Allan Poe:`, why: 'The short “e” vowel sound repeats in “mellow”, “wedding” and “bells”.' },
  { device: 'alliteration', verse: linesOf(EAGLE_ALL, 1), phrase: 'clasps the crag with crooked', leave: ['consonance'], lead: `The first line of ${titled(EAGLE_ALL.poem)} by Alfred, Lord Tennyson:`, why: 'The hard “c” (k) sound starts “clasps”, “crag” and “crooked”.' },
  { device: 'alliteration', verse: linesOf(EAGLE_ALL, 2), phrase: 'lonely lands', leave: ['consonance'], lead: `From ${titled(EAGLE_ALL.poem)} by Alfred, Lord Tennyson:`, why: 'The “l” sound starts “lonely” and “lands”.' },
  { device: 'alliteration', verse: DEATH_GRAIN, phrase: 'gazing grain', leave: ['consonance'], lead: `From ${titled(DEATH_GRAIN.poem)} by Emily Dickinson:`, why: 'The “g” sound starts “gazing” and “grain”.' },
  { device: 'alliteration', verse: AUTUMN_OPENING, phrase: 'mists and mellow', leave: ['consonance'], lead: `The opening of ${titled(AUTUMN_OPENING.poem)} by John Keats:`, why: 'The “m” sound starts “mists” and “mellow”.' },
  { device: 'alliteration', verse: TIGER_OPENING, phrase: 'burning bright', leave: ['consonance'], lead: `The first line of ${titled(TIGER_OPENING.poem)} by William Blake:`, why: 'The “b” sound starts “burning” and “bright”.' },
];

function soundPrompt(s: SoundItem, cast: ReturnType<typeof pair>): string {
  if (s.verse) return `${s.lead}\n\n${verseBlock(s.phrase ? withBold(s.verse, s.phrase) : s.verse)}`;
  return block(fill(s.text!, cast));
}

function soundQ(rng: Rng, d: Difficulty): GenOutput {
  const cast = pair(rng);
  const hints = ['Say the words in bold aloud. Is a sound repeated at the start of words, in the vowels, or inside and at the end of words? Does a word imitate a sound? Do two words rhyme inside the line?'];
  if (d === 3 && rng.chance(0.4)) {
    const want = rng.pick(SOUNDS);
    const right = fill(rng.pick(WRITTEN_SOUNDS.filter((w) => w.device === want)).text!, cast);
    // Leave out devices whose examples might also show the one asked for (rhymes share vowels; alliteration is a kind of consonance).
    const others = rng.sample(SOUNDS.filter((x) => x !== want && !WRITTEN_SOUNDS.some((w) => w.device === x && (w.leave ?? []).includes(want))), 3);
    const wrong = others.map((x) => fill(rng.pick(WRITTEN_SOUNDS.filter((w) => w.device === x)).text!, cast));
    return {
      prompt: `Which sentence uses **${SOUND_NAME[want].toLowerCase()}** in the words in bold?`,
      parts: [part(mc(rng, right, wrong))],
      hints: [`Remember: ${SOUND_WHAT[want]}.`],
      solution: [`“${right.replace(/\*\*/g, '')}” uses ${SOUND_NAME[want].toLowerCase()}: ${SOUND_WHAT[want]}.`, `The others use ${others.map((x) => SOUND_NAME[x].toLowerCase()).join(', ').replace(/, ([^,]*)$/, ' and $1')}.`],
    };
  }
  let s: SoundItem;
  if (d === 1) s = rng.pick(WRITTEN_SOUNDS.filter((w) => w.device === 'alliteration' || w.device === 'onomatopoeia' || w.device === 'internal'));
  else if (d === 2) s = rng.chance(0.65) ? rng.pick(PD_SOUNDS) : rng.pick(WRITTEN_SOUNDS.filter((w) => w.device !== 'consonance'));
  else s = rng.chance(0.6) ? rng.pick(WRITTEN_SOUNDS.filter((w) => w.device === 'assonance' || w.device === 'consonance')) : rng.pick(PD_SOUNDS);
  const pool = (d === 1 ? (['alliteration', 'assonance', 'onomatopoeia', 'internal'] as Sound[]) : SOUNDS).filter((x) => x !== s.device && !(s.leave ?? []).includes(x));
  return {
    prompt: `${soundPrompt(s, cast)}\n\nWhich sound device do the words in bold use?`,
    parts: [part(mc(rng, SOUND_NAME[s.device], rng.sample(pool, 3).map((x) => SOUND_NAME[x])))],
    hints,
    solution: [`This is ${SOUND_NAME[s.device].toLowerCase()}: ${SOUND_WHAT[s.device]}.`, fill(s.why, cast)],
  };
}

// ---------------------------------------------------------------------------- rhyme scheme

interface Stanza {
  verse?: Verse;
  lines?: string[];
  lead?: string;
  scheme: string;
}
const W = (text: string, scheme: string): Stanza => ({ lines: text.split('\n'), scheme });
const WRITTEN_STANZAS: Stanza[] = [
  W(`The morning sun came up so bright,
It chased away the last of night;
The birds began their busy song
And sang it loudly all day long.`, 'AABB'),
  W(`I walked along the empty shore
Beneath a sky of grey;
I listened to the ocean’s roar
And watched it wash away.`, 'ABAB'),
  W(`My grandmother’s garden
Was full of beans and peas,
And every summer evening
Was loud with buzzing bees.`, 'ABCB'),
  W(`The city wakes at early light;
The buses rumble down the street,
And hurried people, quick of feet,
Are glad to leave behind the night.`, 'ABBA'),
  W(`The storm came in on Monday night,
It shook the trees with all its might;
I lay in bed and heard it roar,
And did not sleep till it was light.`, 'AABA'),
  W(`The kite flew high, the kite flew free,
Above the fields, above the sea;
It danced along for all to see,
Then landed softly in a tree.`, 'AAAA'),
  W(`The snow fell softly on the town
And covered every street;
It drifted gently, settling down
In silence at our feet.`, 'ABAB'),
  W(`My little brother likes to play
With paper boats on any day
When rain has filled the gutter stream,
And watch them as they float and gleam.`, 'AABB'),
  W(`The old dog by the fire
Lay dreaming of the chase;
He twitched his paws and whimpered,
A smile upon his face.`, 'ABCB'),
  W(`The moon rose slowly in the east
And silvered all the bay;
The fishermen sat down to feast
Upon the catch of day.`, 'ABAB'),
  W(`The puppy chased its tail around,
Then tumbled, rolling on the ground;
It barked at birds and chewed a shoe,
And napped the whole long morning through.`, 'AABB'),
  W(`The train pulled out at midnight,
The platform cold and grey;
I watched the city lights grow small
And slowly fade away.`, 'ABCB'),
  W(`I found a letter in the drawer,
Its paper thin and yellow-white,
Its ink still dark, its words still bright,
From someone I had loved before.`, 'ABBA'),
  W(`We climbed the hill to see the view,
The sky above was clear and blue;
We ate our lunch beside a stream,
And watched the hawks the whole day through.`, 'AABA'),
];
const LONG_STANZAS: Stanza[] = [
  W(`We packed the car before the dawn
And drove across the dewy lawn;
We sang along to every tune
And reached the beach by early noon;
We built a castle by the bay
And watched the tide wash it away.`, 'AABBCC'),
  W(`The clock upon the classroom wall
Ticked slowly through the day;
I heard the rain begin to fall
And longed to run away.
But when at last I heard the bell,
I knew I’d learned the lesson well.`, 'ABABCC'),
  { lines: `A baker who lived by the sea
Baked bread for the fish, and for free;
Each morning at eight
He would wait at the gate
With a loaf and a large pot of tea.`.split('\n'), scheme: 'AABBA', lead: 'A limerick written for Gradileo:' },
  { verse: EAGLE_ALL, scheme: 'AAABBB', lead: `${titled(EAGLE_ALL.poem)} by Alfred, Lord Tennyson:` },
  { verse: FLANDERS_FIRST, scheme: 'AABBA', lead: `The first stanza of ${titled(FLANDERS_FIRST.poem)} by John McCrae:` },
  { verse: BEARD_ALL, scheme: 'AABBA', lead: `A limerick by Edward Lear:` },
  { verse: linesOf(REMEMBER_ALL, 1, 8), scheme: 'ABBAABBA', lead: `The first eight lines of ${titled(REMEMBER_ALL.poem)}, a sonnet by Christina Rossetti:` },
  { verse: CLOUD_LAST, scheme: 'ABABCC', lead: `The last stanza of ${titled(CLOUD_LAST.poem)} by William Wordsworth:` },
  { verse: linesOf(REMEMBER_ALL, 9, 14), scheme: 'ABBCAC', lead: `The last six lines of ${titled(REMEMBER_ALL.poem)}, a sonnet by Christina Rossetti:` },
  { verse: linesOf(FLANDERS_ALL, 6, 9), scheme: 'AABC', lead: `The second stanza of ${titled(FLANDERS_ALL.poem)} by John McCrae:` },
  { lines: `There once was a cat named Lou
Who wanted a hat and a shoe;
She bought them in town,
In purple and brown,
And wore them to sleep at the zoo.`.split('\n'), scheme: 'AABBA', lead: 'A limerick written for Gradileo:' },
  W(`The leaves have turned to red and gold,
The mornings come in late;
The wind outside is sharp and cold,
And frost is on the gate.

But in the kitchen, warm and bright,
The kettle starts to sing,
And we sit talking through the night
Of plans for early spring.`, 'ABABCDCD'),
];
const PD_STANZAS: Stanza[] = [
  { verse: SONNET29_FIRST, scheme: 'ABAB', lead: `The first four lines of Shakespeare’s ${titled(SONNET29_FIRST.poem)}:` },
  { verse: SONNET73_FIRST, scheme: 'ABAB', lead: `The first four lines of Shakespeare’s ${titled(SONNET73_FIRST.poem)}:` },
  { verse: SONNET18_COUPLET, scheme: 'AA', lead: `The last two lines of Shakespeare’s ${titled(SONNET18_COUPLET.poem)}:` },
  { verse: DULCE_FIRST, scheme: 'ABAB', lead: `The first four lines of ${titled(DULCE_FIRST.poem)} by Wilfred Owen:` },
  { verse: MARINER_SHIP, scheme: 'ABCB', lead: `From ${titled(MARINER_SHIP.poem)} by Samuel Taylor Coleridge:` },
  { verse: MARINER_BREEZE, scheme: 'ABCB', lead: `From ${titled(MARINER_BREEZE.poem)} by Samuel Taylor Coleridge:` },
  { verse: MARINER_WATER, scheme: 'ABAB', lead: `From ${titled(MARINER_WATER.poem)} by Samuel Taylor Coleridge:` },
  { verse: TIGER_SECOND, scheme: 'AABB', lead: `The second stanza of ${titled(TIGER_SECOND.poem)} by William Blake:` },
  { verse: RAINS_FIRST, scheme: 'AABB', lead: `The first lines of ${titled(RAINS_FIRST.poem)} by Sara Teasdale:` },
  { verse: ROSE_FIRST, scheme: 'ABCB', lead: `The first stanza of ${titled(ROSE_FIRST.poem)} by Robert Burns (“Luve” is Scots for “love”):` },
  { verse: linesOf(ROSE_ALL, 5, 8), scheme: 'ABCB', lead: `The second stanza of ${titled(ROSE_ALL.poem)} by Robert Burns (“bonie lass” means pretty girl; “gang” means go):` },
  { verse: linesOf(ROSE_ALL, 13, 16), scheme: 'ABAB', lead: `The last stanza of ${titled(ROSE_ALL.poem)} by Robert Burns (“fare-thee-weel” means farewell):` },
  { verse: linesOf(SONNET18_ALL, 5, 8), scheme: 'ABAB', lead: `Lines 5 to 8 of Shakespeare’s ${titled(SONNET18_ALL.poem)}:` },
  { verse: linesOf(SONNET18_ALL, 9, 12), scheme: 'ABAB', lead: `Lines 9 to 12 of Shakespeare’s ${titled(SONNET18_ALL.poem)}:` },
  { verse: linesOf(SONNET73_ALL, 5, 8), scheme: 'ABAB', lead: `Lines 5 to 8 of Shakespeare’s ${titled(SONNET73_ALL.poem)}:` },
  { verse: linesOf(SONNET73_ALL, 9, 12), scheme: 'ABAB', lead: `Lines 9 to 12 of Shakespeare’s ${titled(SONNET73_ALL.poem)}:` },
  { verse: linesOf(HOPE_ALL, 5, 8), scheme: 'ABAB', lead: `The second stanza of ${titled(HOPE_ALL.poem)} by Emily Dickinson:` },
  { verse: linesOf(DEATH_ALL, 9, 12), scheme: 'ABCB', lead: `A stanza of ${titled(DEATH_ALL.poem)} by Emily Dickinson:` },
  { verse: linesOf(DEATH_ALL, 13, 16), scheme: 'ABCB', lead: `A stanza of ${titled(DEATH_ALL.poem)} by Emily Dickinson:` },
];

const stanzaLines = (s: Stanza) => (s.verse ? s.verse.lines : s.lines!);
/** Every way of typing the letters that the answer accepts. */
function schemeVariants(scheme: string, lines: readonly string[]): string[] {
  const lower = scheme.toLowerCase();
  const letters = lower.split('');
  const groups: string[] = [];
  let i = 0;
  let cur = '';
  for (const l of lines) {
    if (l === '') { if (cur) groups.push(cur); cur = ''; continue; }
    cur += letters[i++];
  }
  if (cur) groups.push(cur);
  if (groups.length === 1 && lower.length === 8) groups.splice(0, 1, lower.slice(0, 4), lower.slice(4));
  if (groups.length === 1 && lower.length === 6) groups.splice(0, 1, lower.slice(0, 4), lower.slice(4));
  const v = new Set<string>();
  for (const sep of ['', ' ', '-', ', ', ',', ' - ', '/', '. ']) v.add(letters.join(sep));
  if (groups.length > 1) for (const sep of [' ', ', ', ' / ', '/', ' - ', '-']) v.add(groups.join(sep));
  return [...v];
}
function endWord(line: string): string {
  const words = line.replace(/[*“”‘’"!?.,;:—–-]+\s*$/u, '').replace(/[*]/g, '').trim().split(/\s+/);
  return words[words.length - 1].replace(/^[“‘"(]+|[”’")!?.,;:—–]+$/gu, '');
}

function rhymeQ(rng: Rng, d: Difficulty): GenOutput {
  const s = d === 1 ? rng.pick(WRITTEN_STANZAS) : d === 2 ? (rng.chance(0.7) ? rng.pick(PD_STANZAS) : rng.pick(WRITTEN_STANZAS)) : rng.pick(LONG_STANZAS);
  const lines = stanzaLines(s);
  const real = lines.filter((l) => l !== '');
  if (real.length !== s.scheme.length) throw new Error(`rhyme scheme ${s.scheme} does not fit ${real.length} lines`);
  const shown = s.verse ? verseBlock(s.verse) : block(lines.map((l, i) => (l && lines[i + 1] ? `${l}\\` : l)).join('\n'));
  const ends = real.map(endWord);
  const byLetter = new Map<string, string[]>();
  s.scheme.split('').forEach((ch, i) => byLetter.set(ch, [...new Set([...(byLetter.get(ch) ?? []), ends[i]])]));
  const times = (ch: string) => s.scheme.split('').filter((x) => x === ch).length;
  const groups = [...byLetter.entries()].map(([ch, ws]) =>
    ws.length > 1
      ? `${ch}: ${ws.map((w) => `“${w}”`).join(', ').replace(/, ([^,]*)$/, ' and $1')} rhyme`
      : times(ch) > 1
        ? `${ch}: “${ws[0]}” ends ${times(ch) === 2 ? 'two lines' : `${times(ch)} lines`} (the same word repeated)`
        : `${ch}: “${ws[0]}” rhymes with no other line`,
  );
  return {
    prompt: `${s.lead ? `${s.lead}\n\n` : ''}${shown}\n\nWrite the **rhyme scheme** of these lines: one capital letter for each line, with the same letter for lines that rhyme.`,
    parts: [{ answer: { kind: 'text', accepted: schemeVariants(s.scheme, lines) }, label: 'Rhyme scheme', placeholder: 'One letter per line' } as Part],
    hints: ['Give the first line’s end sound the letter A. Each line that rhymes with it is also A; the next new end sound is B, then C, and so on.'],
    solution: [`The last words are ${ends.map((w) => `“${w}”`).join(', ').replace(/, ([^,]*)$/, ' and $1')}.`, `${groups.join('; ')}.`, `So the rhyme scheme is **${s.scheme}**.`],
    answerDisplay: s.scheme,
  };
}

// ---------------------------------------------------------------------------- metre

interface Word {
  syl: string[];
  /** The stressed syllable, counting from 1. */
  stress: number;
}
const Wd = (s: string, stress: number): Word => ({ syl: s.split('·'), stress });
const TWO: Word[] = [
  Wd('gar·den', 1), Wd('win·dow', 1), Wd('hap·py', 1), Wd('sud·den', 1), Wd('riv·er', 1), Wd('moun·tain', 1), Wd('pa·per', 1), Wd('sis·ter', 1),
  Wd('be·lieve', 2), Wd('ho·tel', 2), Wd('a·way', 2), Wd('en·joy', 2), Wd('re·peat', 2), Wd('be·gin', 2), Wd('for·get', 2), Wd('a·lone', 2),
];
const THREE: Word[] = [
  Wd('to·mor·row', 2), Wd('ba·na·na', 2), Wd('im·por·tant', 2), Wd('com·pu·ter', 2), Wd('vol·ca·no', 2), Wd('Sep·tem·ber', 2), Wd('um·brel·la', 2), Wd('po·ta·to', 2),
  Wd('beau·ti·ful', 1), Wd('el·e·phant', 1), Wd('fam·i·ly', 1), Wd('cin·e·ma', 1),
  Wd('af·ter·noon', 3), Wd('un·der·stand', 3), Wd('dis·ap·pear', 3), Wd('in·tro·duce', 3),
];
const ORD = ['first', 'second', 'third'];
const plain = (w: Word) => w.syl.join('');
const marked = (w: Word) => w.syl.map((s, i) => (i + 1 === w.stress ? s.toUpperCase() : s)).join('·');

type Foot = 'iamb' | 'trochee' | 'anapest' | 'dactyl';
const FOOT_PATTERN: Record<Foot, string> = { iamb: 'da-DUM', trochee: 'DUM-da', anapest: 'da-da-DUM', dactyl: 'DUM-da-da' };
const footOf = (w: Word): Foot | null => (w.syl.length === 2 ? (w.stress === 2 ? 'iamb' : 'trochee') : w.stress === 3 ? 'anapest' : w.stress === 1 ? 'dactyl' : null);

interface MetreLine {
  text?: string;
  verse?: Verse;
  lead?: string;
  feet: 3 | 4 | 5;
}
const METRE_LINES: MetreLine[] = [
  { text: 'The morning sun came up across the hill', feet: 5 },
  { text: 'I walked along the river after school', feet: 5 },
  { text: 'The rain began to fall upon the town', feet: 5 },
  { verse: SONNET73_LINE1, lead: `The first line of Shakespeare’s ${titled(SONNET73_LINE1.poem)}:`, feet: 5 },
  { verse: SONNET73_LINE3, lead: `A line from Shakespeare’s ${titled(SONNET73_LINE3.poem)}:`, feet: 5 },
  { verse: SONNET18_BUDS, lead: `A line from Shakespeare’s ${titled(SONNET18_BUDS.poem)}:`, feet: 5 },
  { verse: linesOf(CLOUD_OPENING, 1), lead: `The first line of ${titled(CLOUD_OPENING.poem)} by William Wordsworth:`, feet: 4 },
  { verse: linesOf(EAGLE_ALL, 1), lead: `The first line of ${titled(EAGLE_ALL.poem)} by Alfred, Lord Tennyson:`, feet: 4 },
  { text: 'The rain began to fall at night', feet: 4 },
  { verse: linesOf(DEATH_GRAIN, 1), lead: `A line from ${titled(DEATH_GRAIN.poem)} by Emily Dickinson:`, feet: 4 },
  { verse: linesOf(DEATH_FIRST, 2), lead: `A line from ${titled(DEATH_FIRST.poem)} by Emily Dickinson:`, feet: 3 },
  { verse: linesOf(DEATH_GRAIN, 2), lead: `A line from ${titled(DEATH_GRAIN.poem)} by Emily Dickinson:`, feet: 3 },
  { text: 'I saw the ship at sea', feet: 3 },
];
const METRE_NAME: Record<number, string> = { 3: 'iambic trimeter', 4: 'iambic tetrameter', 5: 'iambic pentameter', 6: 'iambic hexameter' };
const metreLineText = (m: MetreLine) => (m.verse ? m.verse.lines[0] : m.text!);
const metrePrompt = (m: MetreLine) => (m.verse ? `${m.lead}\n\n${verseBlock(m.verse)}` : block(m.text!));

function metreQ(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    if (rng.chance(0.3)) {
      const ask = rng.pick([
        { q: 'How many syllables are in a regular line of **iambic pentameter**?', a: 10, why: 'Pentameter has five feet, and each iamb has two syllables (da-DUM): 5 × 2 = 10.' },
        { q: 'How many stressed syllables are in a regular line of **iambic pentameter**?', a: 5, why: 'Pentameter has five feet, and each iamb has one stressed syllable: five stresses.' },
        { q: 'How many syllables are in a regular line of **iambic tetrameter**?', a: 8, why: 'Tetrameter has four feet, and each iamb has two syllables: 4 × 2 = 8.' },
        { q: 'How many feet are in a line of **iambic trimeter**?', a: 3, why: '“Tri-” means three: trimeter has three feet.' },
      ]);
      return {
        prompt: ask.q,
        parts: [numPart(ask.a)],
        hints: ['An iamb is one unstressed syllable followed by one stressed syllable (da-DUM). The metre’s name tells you how many feet a line has: trimeter 3, tetrameter 4, pentameter 5.'],
        solution: [ask.why],
      };
    }
    const w = rng.pick([...TWO, ...THREE]);
    return {
      prompt: `Which syllable of **${plain(w)}** is stressed (said more strongly)?`,
      parts: [part(fixedChoice(w.syl.map((s, i) => `The ${ORD[i]} syllable, “${s}”`), w.stress - 1))],
      hints: ['Say the word aloud and tap the beat on the table, or try stressing each syllable in turn: only one way sounds right.'],
      solution: [`It is said ${marked(w)}: the ${ORD[w.stress - 1]} syllable, “${w.syl[w.stress - 1]}”, is stressed.`],
    };
  }
  if (d === 2) {
    if (rng.chance(0.5)) {
      const want: Foot = rng.pick(['iamb', 'trochee']);
      const right = rng.pick(TWO.filter((w) => footOf(w) === want));
      const wrong = rng.sample(TWO.filter((w) => footOf(w) !== want), 3);
      return {
        prompt: `Which word is ${want === 'iamb' ? 'an **iamb**' : 'a **trochee**'} (${FOOT_PATTERN[want]})?`,
        parts: [part(mc(rng, plain(right), wrong.map(plain)))],
        hints: ['An iamb is unstressed then stressed (da-DUM, as in “a·WAY”); a trochee is stressed then unstressed (DUM-da, as in “GAR·den”).'],
        solution: [`“${plain(right)}” is said ${marked(right)}: ${want === 'iamb' ? 'unstressed, then stressed' : 'stressed, then unstressed'}, so it is ${want === 'iamb' ? 'an iamb' : 'a trochee'}.`, `The other words are stressed the other way round: ${wrong.map(marked).join(', ')}.`],
      };
    }
    const m = rng.pick(METRE_LINES);
    return {
      prompt: `${metrePrompt(m)}\n\nHow many syllables does this line have?`,
      parts: [numPart(m.feet * 2)],
      hints: ['Say the line slowly and count each beat, stressed or not. A word like “morning” has two syllables; “the” has one.'],
      solution: [`Counting the syllables of “${metreLineText(m).replace(/[,;:]$/, '')}” gives ${m.feet * 2}.`, `Read with the stresses on every second syllable, it is ${m.feet} iambs: ${METRE_NAME[m.feet]}.`],
    };
  }
  // difficulty 3
  if (rng.chance(0.4)) {
    const want: Foot = rng.pick(['anapest', 'dactyl']);
    const right = rng.pick(THREE.filter((w) => footOf(w) === want));
    const others = [...rng.sample(THREE.filter((w) => footOf(w) !== want && footOf(w) !== null), 2), rng.pick(THREE.filter((w) => footOf(w) === null))];
    return {
      prompt: `Which word follows the pattern **${FOOT_PATTERN[want]}** (${want === 'anapest' ? 'an anapest' : 'a dactyl'})?`,
      parts: [part(mc(rng, plain(right), others.map(plain)))],
      hints: ['Find the stressed syllable of each word: an anapest ends on its stress (da-da-DUM); a dactyl begins with it (DUM-da-da).'],
      solution: [`“${plain(right)}” is said ${marked(right)}, which is ${FOOT_PATTERN[want]}.`, `The others are said ${others.map(marked).join(', ')}.`],
    };
  }
  if (rng.chance(0.5)) {
    const m = rng.pick(METRE_LINES);
    return {
      prompt: `${metrePrompt(m)}\n\nThis line is written in regular iambic metre (da-DUM). What is its metre?`,
      parts: [part(fixedChoice(['Iambic trimeter (three feet)', 'Iambic tetrameter (four feet)', 'Iambic pentameter (five feet)', 'Iambic hexameter (six feet)'], m.feet - 3))],
      hints: ['Count the syllables and divide by two: each iamb has two syllables.'],
      solution: [`The line has ${m.feet * 2} syllables, so ${m.feet} iambs.`, `So it is ${METRE_NAME[m.feet]}.`],
    };
  }
  const right = rng.pick(METRE_LINES.filter((m) => m.feet === 5));
  const tetra = rng.pick(METRE_LINES.filter((m) => m.feet === 4));
  const trim = (t: string) => t.replace(/[,;:]$/, '');
  const options = [trim(metreLineText(right)), trim(metreLineText(tetra)), TIGER_OPENING.lines[0], trim(ASTRONOMER_ALL.lines[0])];
  return {
    prompt: 'Which line is written in **iambic pentameter**?',
    parts: [part(mc(rng, options[0], options.slice(1)))],
    hints: ['Iambic pentameter has ten syllables in five da-DUM pairs.'],
    solution: [`“${options[0]}” has ten syllables, stressed on every second one: five iambs.`, `“${options[1]}” has only eight syllables (tetrameter); “${options[2]}” starts on a stress, DUM-da (Blake’s trochees); “${options[3]}” has no regular beat (Whitman’s free verse).`],
  };
}

export const SOUND_SKILLS: SkillDef[] = [
  skill({
    id: 'e10-sound-devices',
    name: 'Alliteration, assonance, consonance and onomatopoeia',
    description: 'Identify alliteration, assonance, consonance, onomatopoeia and internal rhyme in poems.',
    outcomes: OUT,
    lessonId: L,
    format: 'mc',
    gen: soundQ,
  }),
  skill({
    id: 'e10-rhyme-scheme',
    name: 'Rhyme scheme',
    description: 'Write the rhyme scheme of a stanza with letters.',
    outcomes: OUT,
    lessonId: L,
    format: 'free',
    gen: rhymeQ,
  }),
  skill({
    id: 'e10-meter',
    name: 'Stress, feet and iambic metre',
    description: 'Find the stressed syllables of words, name iambs and other feet, and recognize and count iambic metre.',
    outcomes: OUT,
    lessonId: L,
    format: 'free',
    gen: metreQ,
  }),
];
