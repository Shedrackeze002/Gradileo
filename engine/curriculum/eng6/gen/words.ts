/**
 * Grade 6 English, Unit 5: Words (E6-E1). Greek and Latin roots, connotation and idioms.
 */
import { mc, part, skill, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { bank, Q } from './common.ts';

const E1 = ['E6-E1'];

// ---------------------------------------------------------------------------- 5.1 roots

interface Root { root: string; from: 'Greek' | 'Latin'; means: string; words: string[]; d: Difficulty }
const ROOTS: Root[] = [
  { root: 'bio', from: 'Greek', means: 'life', words: ['biology', 'biography', 'biome'], d: 1 },
  { root: 'geo', from: 'Greek', means: 'earth', words: ['geography', 'geology', 'geode'], d: 1 },
  { root: 'graph', from: 'Greek', means: 'write or draw', words: ['autograph', 'paragraph', 'graphic'], d: 1 },
  { root: 'tele', from: 'Greek', means: 'far', words: ['telescope', 'telephone', 'television'], d: 1 },
  { root: 'aqua', from: 'Latin', means: 'water', words: ['aquarium', 'aquatic', 'aqueduct'], d: 1 },
  { root: 'port', from: 'Latin', means: 'carry', words: ['transport', 'portable', 'export'], d: 2 },
  { root: 'aud', from: 'Latin', means: 'hear', words: ['audience', 'audio', 'audible'], d: 2 },
  { root: 'vis', from: 'Latin', means: 'see', words: ['vision', 'visible', 'visit'], d: 2 },
  { root: 'micro', from: 'Greek', means: 'small', words: ['microscope', 'microphone', 'microchip'], d: 2 },
  { root: 'phon', from: 'Greek', means: 'sound', words: ['phonics', 'symphony', 'microphone'], d: 2 },
  { root: 'dict', from: 'Latin', means: 'say or speak', words: ['dictionary', 'predict', 'dictate'], d: 3 },
  { root: 'rupt', from: 'Latin', means: 'break', words: ['erupt', 'interrupt', 'rupture'], d: 3 },
  { root: 'struct', from: 'Latin', means: 'build', words: ['construct', 'structure', 'instruct'], d: 3 },
  { root: 'auto', from: 'Greek', means: 'self', words: ['automatic', 'autobiography', 'autograph'], d: 3 },
  { root: 'scrib', from: 'Latin', means: 'write', words: ['scribble', 'describe', 'inscribe'], d: 3 },
];

function rootMeaning(rng: Rng, d: Difficulty): GenOutput {
  const pool = ROOTS.filter((r) => r.d <= d);
  const r = rng.pick(pool.filter((x) => x.d === d).length ? pool.filter((x) => x.d === d) : pool);
  const wrong = rng.shuffle(ROOTS.filter((x) => x.means !== r.means && !x.means.includes(r.means) && !r.means.includes(x.means)).map((x) => x.means)).slice(0, 3);
  const ex = rng.shuffle(r.words).slice(0, 2);
  return {
    prompt: d === 1
      ? `The ${r.from} root **${r.root}** appears in *${ex[0]}* and *${ex[1]}*. What does it mean?`
      : `What does the root **${r.root}** mean, as in *${ex[0]}* and *${ex[1]}*?`,
    parts: [part(mc(rng, r.means, wrong))],
    hints: ['Think of other words with the same root, and what they share.', `The root comes from ${r.from}.`],
    solution: [`**${r.root}** is a ${r.from} root meaning “${r.means}”: ${r.words.join(', ')}.`, `The answer is: ${r.means}.`],
  };
}

const ROOTWORDS = [
  Q(1, 'The root *bio* means life, and *-logy* means the study of. What is *biology*?', 'The study of living things', ['The study of the Earth’s rocks', 'The study of stars and planets', 'The study of very old books'],
    'bio (life) + logy (study of) = the study of living things.'),
  Q(1, 'The root *aqua* means water. Which word names a tank where fish are kept?', 'aquarium', ['auditorium', 'planetarium', 'gymnasium'],
    'aqua (water) + -arium (a place for) = a place for water creatures.'),
  Q(1, 'The root *tele* means far, and *scope* means see. What does a *telescope* do?', 'It helps you see things that are far away.', ['It helps you hear sounds that are very quiet.', 'It helps you write messages to friends.', 'It helps you measure how heavy things are.'],
    'tele (far) + scope (see) = an instrument for seeing far.'),
  Q(2, 'The root *port* means carry. What does *portable* mean?', 'Able to be carried', ['Able to be broken', 'Able to be heard', 'Able to be eaten'],
    'port (carry) + -able (able to be) = able to be carried.'),
  Q(2, 'The root *aud* means hear. Which word means “loud enough to be heard”?', 'audible', ['visible', 'edible', 'portable'],
    'aud (hear) + -ible (able to be) = able to be heard.'),
  Q(2, 'The root *geo* means earth, and *graph* means write. What does *geography* study?', 'The Earth’s surface, places and people', ['The way people write their letters', 'The planets and stars in space', 'The lives of famous writers'],
    'geo (earth) + graphy (writing about) = writing about, or the study of, the Earth.'),
  Q(3, 'The root *rupt* means break, and *inter-* means between. What does *interrupt* mean?', 'To break in while someone is speaking', ['To speak slowly and very clearly', 'To carry a message between people', 'To build something between two walls'],
    'inter (between) + rupt (break) = to break into the middle of something, such as a conversation.'),
  Q(3, 'The root *dict* means say, and *pre-* means before. What does *predict* mean?', 'To say what will happen before it happens', ['To say something again and again out loud', 'To look a word up in a large dictionary', 'To break a promise that you have made'],
    'pre (before) + dict (say) = to say before: to tell what will happen.'),
  Q(3, 'The roots *auto* (self), *bio* (life) and *graph* (write) make *autobiography*. What is it?', 'A life story written by its own subject', ['A life story written about someone by another person', 'A book about cars, engines and how they work', 'A drawing or a photograph of a living plant'],
    'auto (self) + bio (life) + graphy (writing) = writing about your own life.'),
];

// ---------------------------------------------------------------------------- 5.2 connotation

const CONN = ['Positive', 'Negative', 'Neutral'];
const conn = (d: 1 | 2 | 3, word: string, k: number, why: string) =>
  Q(d, `What is the connotation of the word **${word}**?`, CONN[k], CONN.filter((_, i) => i !== k), why);

const CONNOTATION = [
  conn(1, 'slender', 0, 'Slender means thin in an attractive, graceful way, so it has a positive connotation.'),
  conn(1, 'scrawny', 1, 'Scrawny means thin in an unhealthy or unattractive way: negative.'),
  conn(1, 'thin', 2, 'Thin simply describes size without any feeling attached: neutral.'),
  conn(2, 'curious', 0, 'Curious suggests a healthy wish to learn: positive.'),
  conn(2, 'nosy', 1, 'Nosy suggests poking into other people’s business: negative.'),
  conn(2, 'house', 2, 'House names a building with no feeling attached. Home, by contrast, feels warm.'),
  conn(3, 'stubborn', 1, 'Stubborn suggests refusing to change one’s mind for no good reason: negative. Determined is a positive word for a similar trait.'),
  conn(3, 'determined', 0, 'Determined suggests sticking at a goal: positive. Stubborn is the negative word for a similar trait.'),
  conn(3, 'old', 2, 'Old only states age. Ancient or antique can feel grand; elderly is respectful; outdated is negative.'),
];

const CHOICE = [
  Q(1, 'Which word gives the most positive description of a person who saves money?', 'thrifty', ['stingy', 'cheap', 'mean'],
    'Thrifty suggests sensible saving. Stingy, cheap and mean suggest refusing to share.'),
  Q(1, 'Which word makes the smell sound most pleasant? “The kitchen was filled with the ___ of baking bread.”', 'aroma', ['stench', 'odour', 'reek'],
    'Aroma suggests a pleasant smell. Stench and reek are strongly negative; odour often sounds unpleasant too.'),
  Q(2, 'A writer wants readers to admire a character. Which word fits best? “NAME was ___ in {his} questions.”', 'inquisitive', ['nosy', 'prying', 'meddling'],
    'Inquisitive is a positive word for asking questions. The others suggest interfering.'),
  Q(2, 'Which word would an estate agent most likely use to describe a small house?', 'cosy', ['cramped', 'poky', 'tiny'],
    'An agent selling the house would choose cosy, which makes small sound warm and inviting. Cramped and poky are negative.'),
  Q(3, 'Which sentence gives the most negative picture of the same event?', '“The mob stormed into the hall.”', ['“The crowd hurried into the hall.”', '“The fans streamed into the hall.”', '“The audience filed into the hall.”'],
    'Mob and stormed suggest an angry, dangerous crowd. The others describe the same movement more neutrally or positively.'),
  Q(3, 'Why might a writer call a dog “a loyal companion” instead of “a pet”?', 'To make readers feel warmly towards the dog', ['To show that the dog belongs to nobody', 'To show that the dog is badly behaved', 'To make the sentence shorter and simpler'],
    'Loyal companion carries warm, positive connotations of friendship. Pet is neutral.'),
];

// ---------------------------------------------------------------------------- 5.3 idioms

const IDIOMS = [
  Q(1, 'What does the idiom mean? “It’s raining cats and dogs.”', 'It is raining very heavily.', ['Animals are falling from the sky.', 'It is a good day for walking pets.', 'The rain has just stopped falling.'],
    'An idiom means something different from its words. “Raining cats and dogs” means raining hard.'),
  Q(1, 'What does the idiom mean? “That test was a piece of cake.”', 'The test was very easy.', ['The test was about baking.', 'The test was very long.', 'The test was given at a party.'],
    '“A piece of cake” means something easy to do.'),
  Q(1, 'What does the idiom mean? “Break a leg!”', 'Good luck!', ['Be careful!', 'Hurry up!', 'Sit down!'],
    'Actors say “break a leg” to wish each other good luck before a show.'),
  Q(2, 'What does the idiom mean? “NAME let the cat out of the bag about the party.”', '{He} told the secret by mistake.', ['{He} set {his} pet free at the party.', '{He} cancelled the party at the last minute.', '{He} brought a cat with {him} to the party.'],
    '“Let the cat out of the bag” means to reveal a secret.'),
  Q(2, 'What does the idiom mean? “We’re in the same boat.”', 'We are in the same difficult situation.', ['We are both going sailing together.', 'We both own the same kind of boat.', 'We are both waiting for the ferry.'],
    'Being “in the same boat” means sharing a problem or situation.'),
  Q(2, 'What does the idiom mean? “Hold your horses!”', 'Wait and slow down.', ['Go riding today.', 'Hold on tightly.', 'Feed the animals.'],
    '“Hold your horses” means be patient and do not rush.'),
  Q(3, 'What does the idiom mean? “NAME bit off more than {he} could chew.”', '{He} took on more than {he} could manage.', ['{He} ate too much food too quickly.', '{He} said something rude to a friend.', '{He} lost a tooth while eating lunch.'],
    'To “bite off more than you can chew” is to take on a task that is too big.'),
  Q(3, 'What does the idiom mean? “The new rule is a double-edged sword.”', 'It has both good and bad effects.', ['It is very sharp and dangerous.', 'It was made by two different people.', 'It is twice as strict as the old one.'],
    'A double-edged sword cuts both ways: something with good and bad sides.'),
  Q(3, 'What does the idiom mean? “NAME is on the fence about joining the team.”', '{He} has not decided yet.', ['{He} is sitting outside the gym.', '{He} has already said yes to it.', '{He} is scared of falling over.'],
    '“On the fence” means undecided between two choices.'),
];

const LITERAL = [
  Q(1, 'Which sentence uses the words literally (meaning exactly what they say)?', '“The cat jumped onto the fence.”', ['“I’m on the fence about the trip.”', '“Grandpa is as fit as a fiddle.”', '“Keep your eyes peeled for the bus.”'],
    'A real cat really jumping onto a real fence is literal. The others are idioms or figures of speech.'),
  Q(1, 'In “My feet are killing me”, the words are…', 'figurative: my feet hurt a lot', ['literal: my feet are attacking me', 'literal: I have hurt someone’s feet', 'figurative: I am running very fast'],
    'The feet are not really killing anyone. Figuratively, the sentence means the feet hurt badly.'),
  Q(2, 'Which sentence uses “cold feet” literally?', '“After the snowball fight, NAME had cold feet.”', ['“NAME got cold feet right before the school concert.”', '“Don’t get cold feet about the big test now.”', '“The groom had cold feet and ran away from the church.”'],
    'After a snowball fight, NAME’s feet were actually cold. In the others, “cold feet” is an idiom meaning nervous.'),
  Q(2, 'Which sentence uses “a piece of cake” figuratively?', '“Learning to ride a bike was a piece of cake.”', ['“Mum cut me a big piece of cake for my lunch.”', '“A piece of cake fell off the plate onto the floor.”', '“The very last piece of cake was chocolate.”'],
    'Riding a bike was not a real piece of cake: here the phrase means easy.'),
  Q(3, 'Why might a writer use an idiom instead of a literal phrase?', 'To make the writing sound natural and vivid', ['To make every sentence easier to translate', 'To show that the writer is being exact', 'To make the writing sound more formal'],
    'Idioms make speech and writing lively and natural. They are not exact and do not translate word for word.'),
  Q(3, 'A learner of English hears “It costs an arm and a leg.” Why might this confuse them?', 'Its meaning cannot be worked out from its words.', ['It uses words that are far too long and difficult.', 'It is usually spoken much too quickly by people.', 'It is a sentence that has no verb in it at all.'],
    'Idioms have meanings (here: very expensive) that do not come from the individual words.'),
];

export const WORD_SKILLS: SkillDef[] = [
  skill({ id: 'e6-roots', name: 'Greek and Latin roots', description: 'Know the meanings of common Greek and Latin roots.', outcomes: E1, lessonId: 'e6-5-1', format: 'mc', gen: rootMeaning }),
  skill({ id: 'e6-root-words', name: 'Words from roots', description: 'Work out the meaning of a word from its root and affixes.', outcomes: E1, lessonId: 'e6-5-1', format: 'mc', gen: bank(ROOTWORDS, ['Split the word into its root and any prefix or suffix.', 'Put the meanings of the parts together.']) }),
  skill({ id: 'e6-connotation', name: 'Connotation', description: 'Tell positive, negative and neutral connotations apart.', outcomes: E1, lessonId: 'e6-5-2', format: 'mc', gen: bank(CONNOTATION, ['Denotation is the dictionary meaning; connotation is the feeling a word carries.', 'Would you like to be described with this word?']) }),
  skill({ id: 'e6-word-choice', name: 'Choosing words for their connotation', description: 'Choose a word with the right connotation for a purpose.', outcomes: E1, lessonId: 'e6-5-2', format: 'mc', gen: bank(CHOICE, ['Think about how the writer wants the reader to feel.']) }),
  skill({ id: 'e6-idioms', name: 'Idioms', description: 'Explain what common idioms mean.', outcomes: E1, lessonId: 'e6-5-3', format: 'mc', gen: bank(IDIOMS, ['An idiom means something different from its separate words.', 'Use the rest of the sentence as a clue.']) }),
  skill({ id: 'e6-literal-figurative', name: 'Literal and figurative', description: 'Tell literal from figurative meaning.', outcomes: E1, lessonId: 'e6-5-3', format: 'mc', gen: bank(LITERAL, ['Literal: the words mean exactly what they say.', 'Figurative: the words mean something beyond what they say.']) }),
];
