/**
 * Grade 5 English, Unit 4: Words (E5-D1). Prefixes and suffixes, synonyms, antonyms and shades of
 * meaning, context clues, and homophones and multiple-meaning words. Words spelled differently in
 * different countries are left out.
 */
import { mc, part, skill, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { atLevel, bank, fill, GAP, order, people, Q } from './common.ts';

const D1 = ['E5-D1'];

// ---------------------------------------------------------------------------- 4.1 prefixes and suffixes

interface Affix {
  affix: string;
  means: string;
  words: Array<[string, string]>;
  d: Difficulty;
}

const PREFIXES: Affix[] = [
  { affix: 'un-', means: 'not', words: [['unhappy', 'not happy'], ['unkind', 'not kind'], ['unlocked', 'not locked'], ['unsafe', 'not safe']], d: 1 },
  { affix: 're-', means: 'again', words: [['retell', 'tell again'], ['rewrite', 'write again'], ['reheat', 'heat again'], ['rebuild', 'build again']], d: 1 },
  { affix: 'pre-', means: 'before', words: [['preheat', 'heat before'], ['preview', 'see before'], ['prewash', 'wash before']], d: 2 },
  { affix: 'mis-', means: 'wrongly', words: [['misspell', 'spell wrongly'], ['misread', 'read wrongly'], ['misplace', 'put in the wrong place']], d: 2 },
  { affix: 'dis-', means: 'not, or the opposite of', words: [['disagree', 'not agree'], ['dishonest', 'not honest'], ['disappear', 'the opposite of appear']], d: 2 },
  { affix: 'non-', means: 'not', words: [['nonstop', 'without stopping'], ['nonfiction', 'writing that is not made up']], d: 3 },
  { affix: 'over-', means: 'too much', words: [['overcooked', 'cooked too much'], ['overflow', 'flow over the top'], ['overslept', 'slept too long']], d: 3 },
  { affix: 'sub-', means: 'under', words: [['submarine', 'a ship that goes under the sea'], ['subway', 'a railway under the ground']], d: 3 },
];

const SUFFIXES: Affix[] = [
  { affix: '-ful', means: 'full of', words: [['hopeful', 'full of hope'], ['joyful', 'full of joy'], ['careful', 'full of care']], d: 1 },
  { affix: '-less', means: 'without', words: [['fearless', 'without fear'], ['homeless', 'without a home'], ['careless', 'without care'], ['endless', 'without an end']], d: 1 },
  { affix: '-er', means: 'a person who', words: [['teacher', 'a person who teaches'], ['painter', 'a person who paints'], ['farmer', 'a person who farms']], d: 1 },
  { affix: '-able', means: 'able to be', words: [['washable', 'able to be washed'], ['breakable', 'able to be broken'], ['readable', 'able to be read']], d: 2 },
  { affix: '-ly', means: 'in a … way', words: [['quickly', 'in a quick way'], ['softly', 'in a soft way'], ['bravely', 'in a brave way']], d: 2 },
  { affix: '-ness', means: 'the state of being', words: [['kindness', 'the state of being kind'], ['darkness', 'the state of being dark'], ['sadness', 'the state of being sad']], d: 3 },
  { affix: '-ment', means: 'the act or result of', words: [['enjoyment', 'the act of enjoying'], ['movement', 'the act of moving'], ['payment', 'the act of paying']], d: 3 },
];

function affixQ(rng: Rng, d: Difficulty, set: Affix[], kind: 'prefix' | 'suffix'): GenOutput {
  const a = rng.pick(atLevel(set, d));
  const [w, m] = rng.pick(a.words.filter(([, x]) => x));
  const others = set.filter((x) => x !== a);
  if (d === 3 && rng.chance(0.5)) {
    const wrong = rng.sample(others, 3).map((x) => x.means);
    return {
      prompt: `What does the ${kind} **${a.affix}** mean in the word **${w}**?`,
      parts: [part(mc(rng, a.means, wrong))],
      hints: [`A ${kind} is a word part added to the ${kind === 'prefix' ? 'beginning' : 'end'} of a base word to change its meaning.`, `Think of other words with ${a.affix}.`],
      solution: [`${a.affix} means “${a.means}”, so ${w} means “${m}”.`],
    };
  }
  const wrong = rng.sample(others, 3).map((x) => rng.pick(x.words.filter(([, y]) => y))[1]);
  return {
    prompt: `What does the word **${w}** mean?`,
    parts: [part(mc(rng, m, wrong))],
    hints: [`Find the ${kind} and the base word.`, `${a.affix} means “${a.means}”.`],
    solution: [`${w} = ${kind === 'prefix' ? `${a.affix.replace('-', '')} + ${w.slice(a.affix.length - 1)}` : `${w.slice(0, w.length - (a.affix.length - 1))} + ${a.affix.replace('-', '')}`}. ${a.affix} means “${a.means}”, so ${w} means “${m}”.`],
  };
}

// ---------------------------------------------------------------------------- 4.2 synonyms, antonyms and shades of meaning

const PAIRS: Array<{ w: string; syn: string; ant: string; d: Difficulty }> = [
  { w: 'big', syn: 'large', ant: 'small', d: 1 }, { w: 'happy', syn: 'glad', ant: 'sad', d: 1 }, { w: 'fast', syn: 'quick', ant: 'slow', d: 1 },
  { w: 'begin', syn: 'start', ant: 'finish', d: 1 }, { w: 'shout', syn: 'yell', ant: 'whisper', d: 1 }, { w: 'cold', syn: 'chilly', ant: 'hot', d: 1 },
  { w: 'brave', syn: 'bold', ant: 'cowardly', d: 2 }, { w: 'ancient', syn: 'old', ant: 'modern', d: 2 }, { w: 'tiny', syn: 'little', ant: 'huge', d: 2 },
  { w: 'generous', syn: 'giving', ant: 'selfish', d: 2 }, { w: 'calm', syn: 'peaceful', ant: 'excited', d: 2 }, { w: 'difficult', syn: 'hard', ant: 'easy', d: 2 },
  { w: 'rare', syn: 'unusual', ant: 'common', d: 3 }, { w: 'timid', syn: 'shy', ant: 'confident', d: 3 }, { w: 'vacant', syn: 'empty', ant: 'occupied', d: 3 },
  { w: 'reveal', syn: 'show', ant: 'hide', d: 3 }, { w: 'cautious', syn: 'careful', ant: 'reckless', d: 3 }, { w: 'frequent', syn: 'regular', ant: 'occasional', d: 3 },
];

function synonymsAntonyms(rng: Rng, d: Difficulty): GenOutput {
  const p = rng.pick(atLevel(PAIRS, d));
  const want = rng.chance(0.5) ? 'synonym' : 'antonym';
  const right = want === 'synonym' ? p.syn : p.ant;
  const tricky = want === 'synonym' ? p.ant : p.syn;
  const others = rng.sample(PAIRS.filter((x) => x !== p), 2).map((x) => rng.pick([x.syn, x.ant]));
  return {
    prompt: `Which word is ${want === 'synonym' ? 'a **synonym** of' : 'an **antonym** of'} **${p.w}**?`,
    parts: [part(mc(rng, right, [tricky, ...others]))],
    hints: ['A synonym means the same, or nearly the same. An antonym means the opposite.', `Try each word in a sentence in place of “${p.w}”.`],
    solution: [`“${right}” ${want === 'synonym' ? 'means nearly the same as' : 'means the opposite of'} “${p.w}”. (“${tricky}” is ${want === 'synonym' ? 'its antonym' : 'its synonym'}.)`],
  };
}

const SHADES: Array<{ words: string[]; scale: [string, string]; d: Difficulty }> = [
  { words: ['warm', 'hot', 'boiling'], scale: ['least hot', 'most hot'], d: 1 },
  { words: ['cool', 'cold', 'freezing'], scale: ['least cold', 'most cold'], d: 1 },
  { words: ['big', 'huge', 'gigantic'], scale: ['smallest', 'largest'], d: 1 },
  { words: ['walk', 'jog', 'sprint'], scale: ['slowest', 'fastest'], d: 1 },
  { words: ['whisper', 'talk', 'shout'], scale: ['quietest', 'loudest'], d: 2 },
  { words: ['glad', 'happy', 'thrilled'], scale: ['least happy', 'most happy'], d: 2 },
  { words: ['annoyed', 'angry', 'furious'], scale: ['least angry', 'most angry'], d: 2 },
  { words: ['nibble', 'eat', 'gobble'], scale: ['smallest bites', 'biggest bites'], d: 2 },
  { words: ['drizzle', 'shower', 'rain', 'downpour'], scale: ['lightest', 'heaviest'], d: 3 },
  { words: ['uneasy', 'nervous', 'scared', 'terrified'], scale: ['least afraid', 'most afraid'], d: 3 },
  { words: ['tap', 'knock', 'pound', 'hammer'], scale: ['softest', 'hardest'], d: 3 },
];

function shades(rng: Rng, d: Difficulty): GenOutput {
  const s = rng.pick(atLevel(SHADES, d));
  return {
    ...order(rng, `Put these words in order, from **${s.scale[0]}** to **${s.scale[1]}**.`, s.words, ['Words with similar meanings can differ in strength: these are shades of meaning.', 'Find the weakest word and the strongest word first, then place the rest.'], [`From ${s.scale[0]} to ${s.scale[1]}: ${s.words.join(', ')}.`]),
  };
}

// ---------------------------------------------------------------------------- 4.3 context clues

const CONTEXT: Q[] = [
  Q(1, 'What does **enormous** mean in this sentence?', 'very large', ['very fast', 'very old', 'very loud'],
    'The clue is “it barely fit through the barn door”: something that barely fits is very large.',
    'The farmer’s prize pumpkin was enormous; it barely fit through the barn door.'),
  Q(1, 'What does **drowsy** mean in this sentence?', 'sleepy', ['hungry', 'angry', 'noisy'],
    'The clues are the warm room, yawning and closed eyes: a drowsy person is sleepy.',
    'The room was warm, and after lunch NAME felt drowsy. {He} yawned and {his} eyes began to close.'),
  Q(1, 'What does **damp** mean in this sentence?', 'a little wet', ['very dry', 'very hot', 'brand new'],
    'The towel “had not dried yet”, so damp means a little wet.',
    'NAME’s towel was still damp because it had not dried yet after {his} swim.'),
  Q(2, 'What does **fragile** mean? Look for the clue that tells you.', 'easily broken', ['very heavy', 'very shiny', 'easily lost'],
    'The sentence gives a definition clue after the comma: “it could break easily.”',
    'Be careful with that vase. It is fragile, which means it could break easily.'),
  Q(2, 'What does **ravenous** mean in this sentence?', 'extremely hungry', ['very sleepy', 'very cheerful', 'extremely cold'],
    'The clue is that NAME “ate three bowls of soup”: only someone extremely hungry would do that.',
    'After the long hike, NAME was ravenous and ate three bowls of soup.'),
  Q(2, 'What does **cautious** mean in this sentence? Use the opposite clue.', 'careful', ['careless', 'cheerful', 'clumsy'],
    'The sentence contrasts the reckless brother with NAME, who is the opposite: careful.',
    'Unlike {his} reckless brother, NAME was cautious and always checked the ice before skating.'),
  Q(3, 'What does **reluctant** mean in this sentence?', 'not wanting to do something', ['very eager to start', 'too tired to move', 'unable to hear well'],
    'NAME “dragged {his} feet” and “sighed”: both show {he} did not want to clean {his} room.',
    'NAME was reluctant to clean {his} room. {He} dragged {his} feet up the stairs and sighed loudly at the door.'),
  Q(3, 'What does **abundant** mean in this sentence? Use the example clue.', 'plentiful', ['rare', 'dried up', 'expensive'],
    'The examples (apples, pears and plums filling every basket) show that the fruit was plentiful.',
    'Fruit was abundant that autumn: apples, pears and plums filled every basket at the market.'),
  Q(3, 'What does **perplexed** mean in this sentence?', 'confused', ['delighted', 'frightened', 'exhausted'],
    'NAME scratches {his} head and reads the instructions three times without understanding: {he} is confused.',
    'NAME scratched {his} head and read the instructions for the third time. {He} was perplexed: none of the pieces seemed to fit.'),
];

// ---------------------------------------------------------------------------- 4.4 homophones and multiple-meaning words

interface Gap {
  s: string;
  right: string;
  set: string[];
  d: Difficulty;
}
const HOMOPHONES: Gap[] = [
  { s: 'NAME ate ___ pancakes for breakfast.', right: 'eight', set: ['ate', 'eight'], d: 1 },
  { s: 'The wind ___ the leaves off the trees.', right: 'blew', set: ['blew', 'blue'], d: 1 },
  { s: 'Can you ___ the birds singing?', right: 'hear', set: ['hear', 'here'], d: 1 },
  { s: 'Please put the books over ___.', right: 'here', set: ['hear', 'here'], d: 1 },
  { s: 'NAME ___ the answer to the riddle.', right: 'knew', set: ['knew', 'new'], d: 1 },
  { s: 'We bought a ___ kite at the fair.', right: 'new', set: ['knew', 'new'], d: 1 },
  { s: 'The ___ sank into the soft sand.', right: 'son', set: ['son', 'sun'], d: 2 },
  { s: 'The baker sold us a fresh loaf of ___.', right: 'bread', set: ['bread', 'bred'], d: 2 },
  { s: 'NAME tied a ___ in the rope.', right: 'knot', set: ['knot', 'not'], d: 2 },
  { s: 'The children ___ their bikes to the park.', right: 'rode', set: ['road', 'rode', 'rowed'], d: 2 },
  { s: 'The ___ in the forest was steep and narrow.', right: 'road', set: ['road', 'rode', 'rowed'], d: 2 },
  { s: 'Which ___ will win the race?', right: 'horse', set: ['horse', 'hoarse'], d: 3 },
  { s: 'After cheering all night, NAME’s voice was ___.', right: 'hoarse', set: ['horse', 'hoarse'], d: 3 },
  { s: 'The baker needs more ___ to make the cake.', right: 'flour', set: ['flour', 'flower'], d: 3 },
  { s: 'A red ___ bloomed in the window box.', right: 'flower', set: ['flour', 'flower'], d: 3 },
  { s: 'NAME ate a whole ___ of pie.', right: 'piece', set: ['peace', 'piece'], d: 3 },
  { s: 'After the storm, the town was quiet and at ___.', right: 'peace', set: ['peace', 'piece'], d: 3 },
  { s: 'NAME felt ___ after being ill for days.', right: 'weak', set: ['weak', 'week'], d: 3 },
  { s: 'The dog dug a deep ___ in the garden.', right: 'hole', set: ['hole', 'whole'], d: 3 },
  { s: 'The children left ___ coats on the bus.', right: 'their', set: ['their', 'there', 'they’re'], d: 3 },
  { s: '___ going to the beach tomorrow.', right: 'they’re', set: ['their', 'there', 'they’re'], d: 3 },
];


const MEANS: Record<string, string> = {
  ate: '“ate” is the past of eat', eight: '“eight” is the number 8', blew: '“blew” is the past of blow', blue: '“blue” is a colour',
  hear: '“hear” is what you do with your ears', here: '“here” means in this place', knew: '“knew” is the past of know', new: '“new” means not old',
  son: '“son” is a boy or man in a family', sun: '“sun” is the star that lights the day', bread: '“bread” is a baked food', bred: '“bred” means raised (animals)',
  knot: '“knot” is a tie in a rope', not: '“not” means no', road: '“road” is a way for cars', rode: '“rode” is the past of ride', rowed: '“rowed” means moved a boat with oars',
  horse: '“horse” is an animal', hoarse: '“hoarse” means rough-sounding (a voice)', flour: '“flour” is ground grain for baking', flower: '“flower” is a bloom on a plant',
  piece: '“piece” is a part of something', peace: '“peace” means calm, with no fighting', weak: '“weak” means not strong', week: '“week” is seven days',
  hole: '“hole” is an opening or a pit', whole: '“whole” means all of something', their: '“their” means belonging to them', there: '“there” means in that place', 'they’re': '“they’re” is short for “they are”',
};

function homophones(rng: Rng, d: Difficulty): GenOutput {
  const g = rng.pick(atLevel(HOMOPHONES, d));
  const [who] = people(rng, 1);
  const s = fill(g.s, [who]).replace('___', GAP);
  return {
    prompt: `Which word completes the sentence?\n\n> ${s}`,
    parts: [part(mc(rng, g.right, g.set.filter((w) => w !== g.right)))],
    hints: ['Homophones sound the same but have different spellings and meanings.', 'Think about what the sentence needs the word to mean.'],
    solution: [g.set.map((w) => MEANS[w]).join('; ') + '.', `The sentence needs “${g.right}”.`],
  };
}

const MULTI: Q[] = [
  Q(1, 'What does **bat** mean in this sentence?', 'a flying animal', ['a stick for hitting a ball', 'to blink your eyes', 'a turn to play'],
    'The bat flew out of the cave at dusk, so it is the flying animal.',
    'At dusk, a bat flew out of the cave.'),
  Q(1, 'What does **bark** mean in this sentence?', 'the outer covering of a tree', ['the sound a dog makes', 'a kind of small boat', 'to shout an order'],
    'NAME runs {his} hand over the tree, so bark means the outer covering of a tree.',
    'NAME ran {his} hand over the rough bark of the old oak.'),
  Q(1, 'What does **light** mean in this sentence?', 'not heavy', ['not dark', 'to set on fire', 'a lamp'],
    'The box is easy to carry, so light means not heavy.',
    'The box was so light that NAME carried it with one hand.'),
  Q(2, 'What does **park** mean in this sentence?', 'to leave a car in a place', ['an area of grass and trees', 'a place for sports games', 'a kind of nature reserve'],
    'Here park is a verb: Dad looked for a place to leave the car.',
    'Dad drove around for ten minutes looking for a place to park.'),
  Q(2, 'What does **fair** mean in this sentence?', 'treating everyone equally', ['a festival with rides', 'light in colour', 'sunny and clear'],
    'The rule gives everyone the same number of turns, so it is fair: it treats everyone equally.',
    'Everyone gets three turns, so the rule is fair.'),
  Q(2, 'In which sentence does **ring** mean a sound?', 'NAME heard the phone ring twice.', ['NAME wore a silver ring on {his} finger.', 'The children stood in a ring to play.', 'The boxers stepped into the ring.'],
    'A phone ringing makes a sound. In the other sentences, ring means a piece of jewellery, a circle and a boxing area.'),
  Q(3, 'In which sentence does **match** mean a contest?', 'Our team won the soccer match.', ['NAME struck a match to light the candle.', 'Those socks do not match each other.', 'Find a word to match each picture.'],
    'A soccer match is a contest between teams. The other sentences use match as a stick for lighting fires, and as a verb meaning go together or pair up.'),
  Q(3, 'What does **left** mean in this sentence?', 'went away from', ['the side opposite right', 'still remaining', 'put down and forgotten'],
    'NAME “left the party” means {he} went away from it.',
    'NAME left the party early because {he} had a match the next morning.'),
];

export const WORD_SKILLS: SkillDef[] = [
  skill({ id: 'e5-prefixes', name: 'Prefixes', description: 'Use prefixes such as un-, re-, pre-, mis- and dis- to work out a word’s meaning.', outcomes: D1, lessonId: 'e5-4-1', format: 'mc', gen: (rng, d) => affixQ(rng, d, PREFIXES, 'prefix') }),
  skill({ id: 'e5-suffixes', name: 'Suffixes', description: 'Use suffixes such as -ful, -less, -er, -able and -ness to work out a word’s meaning.', outcomes: D1, lessonId: 'e5-4-1', format: 'mc', gen: (rng, d) => affixQ(rng, d, SUFFIXES, 'suffix') }),
  skill({ id: 'e5-synonyms-antonyms', name: 'Synonyms and antonyms', description: 'Choose a synonym or an antonym for a word.', outcomes: D1, lessonId: 'e5-4-2', format: 'mc', gen: synonymsAntonyms }),
  skill({ id: 'e5-shades-of-meaning', name: 'Shades of meaning', description: 'Order words with similar meanings by their strength.', outcomes: D1, lessonId: 'e5-4-2', format: 'free', gen: shades }),
  skill({ id: 'e5-context-clues', name: 'Context clues', description: 'Work out the meaning of an unfamiliar word from the words around it.', outcomes: D1, lessonId: 'e5-4-3', format: 'mc', gen: bank(CONTEXT, ['Read the whole sentence, and the one after it.', 'Look for a definition, an example, an opposite or what the characters do.', 'Try each answer in place of the word: which one makes sense?']) }),
  skill({ id: 'e5-homophones', name: 'Homophones', description: 'Choose the right homophone for a sentence.', outcomes: D1, lessonId: 'e5-4-4', format: 'mc', gen: homophones }),
  skill({ id: 'e5-multiple-meaning', name: 'Multiple-meaning words', description: 'Tell which meaning of a word a sentence uses.', outcomes: D1, lessonId: 'e5-4-4', format: 'mc', gen: bank(MULTI, ['Many words have more than one meaning. The other words in the sentence tell you which one is meant.']) }),
];
