/**
 * Grade 5 English, Unit 5: Grammar and Punctuation (E5-E1, E5-E2). Parts of speech, adjectives
 * and adverbs, complete sentences, subjects and predicates, agreement and verb tense, capital
 * letters and end marks, commas and quotation marks. Sentences are tagged, so every question is
 * checked by its parts.
 */
import { mc, part, skill, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { atLevel, cap, fill, GAP, people, type Person } from './common.ts';

const E1 = ['E5-E1'];
const E2 = ['E5-E2'];

// ---------------------------------------------------------------------------- 5.1 parts of speech

/** Words tagged {n:…} noun, {v:…} verb, {a:…} adjective, {d:…} adverb, {p:…} pronoun. */
const TAGGED: Array<[string, Difficulty]> = [
  ['The {a:little} {n:dog} {v:barked} {d:loudly} at the mail carrier.', 1],
  ['NAME {v:painted} a {a:bright} {n:picture} of the sea.', 1],
  ['The {a:hungry} {n:cat} {v:ate} its dinner {d:quickly}.', 1],
  ['{p:We} {v:visited} the {a:old} {n:castle} on Saturday.', 1],
  ['The {n:children} {v:laughed} {d:happily} at the {a:funny} clown.', 1],
  ['A {a:gentle} {n:breeze} {v:blew} through the open window.', 2],
  ['NAME {d:carefully} {v:carried} the {a:heavy} box upstairs.', 2],
  ['{p:She} {v:wrote} a {a:long} {n:letter} to her grandmother.', 2],
  ['The {a:tired} {n:runners} {v:crossed} the finish line {d:slowly}.', 2],
  ['{p:They} {d:always} {v:eat} lunch under the {a:tall} {n:tree}.', 3],
  ['The {n:storm} {v:rattled} the windows {d:noisily} all night.', 3],
  ['NAME {v:felt} {a:nervous} before the {a:big} {n:test}.', 3],
  ['{p:He} {v:finished} the {a:difficult} {n:puzzle} {d:yesterday}.', 3],
];
const POS: Record<string, string> = { n: 'Noun', v: 'Verb', a: 'Adjective', d: 'Adverb', p: 'Pronoun' };
const POS_WHY: Record<string, string> = {
  n: 'names a person, place, thing or idea',
  v: 'shows an action or a state of being',
  a: 'describes a noun: it tells what kind, how many or which one',
  d: 'describes a verb (or an adjective): it tells how, when, where or how often',
  p: 'takes the place of a noun',
};

function partsOfSpeech(rng: Rng, d: Difficulty): GenOutput {
  const [t] = rng.pick(atLevel(TAGGED.map(([s, k]) => ({ s, d: k })), d).map((x) => [x.s] as const));
  const [who] = people(rng, 1);
  const tags = [...t.matchAll(/\{(\w):([^}]+)\}/g)].map((m) => ({ tag: m[1], word: m[2] }));
  const pick = rng.pick(d === 1 ? tags.filter((x) => x.tag !== 'p') : tags);
  let used = false;
  const s = fill(t, [who]).replace(/\{(\w):([^}]+)\}/g, (_m, tag: string, w: string) => {
    if (!used && tag === pick.tag && w === pick.word) {
      used = true;
      return `**${w}**`;
    }
    return w;
  });
  const options = d === 1 ? ['n', 'v', 'a', 'd'] : ['n', 'v', 'a', 'd', 'p'];
  return {
    prompt: `What part of speech is the word in bold?\n\n> ${s}`,
    parts: [part({ kind: 'mc', choices: options.map((k, i) => ({ id: 'abcde'[i], md: POS[k] })), correct: 'abcde'[options.indexOf(pick.tag)] })],
    hints: ['Noun: a person, place, thing or idea. Verb: an action. Adjective: describes a noun. Adverb: describes a verb (how, when, where).', 'Ask what the word does in this sentence.'],
    solution: [`“${pick.word}” ${POS_WHY[pick.tag]}, so it is ${pick.tag === 'a' || pick.tag === 'd' ? 'an' : 'a'} ${POS[pick.tag].toLowerCase()}.`],
  };
}

const ADJ_ADV: Array<{ s: string; adj: string; adv: string; want: 'adj' | 'adv'; d: Difficulty }> = [
  { s: 'NAME sang ___ at the concert.', adj: 'beautiful', adv: 'beautifully', want: 'adv', d: 1 },
  { s: 'The ___ puppy wagged its tail.', adj: 'happy', adv: 'happily', want: 'adj', d: 1 },
  { s: 'The turtle moved ___ across the road.', adj: 'slow', adv: 'slowly', want: 'adv', d: 1 },
  { s: 'NAME gave a ___ answer.', adj: 'quick', adv: 'quickly', want: 'adj', d: 1 },
  { s: 'Please close the door ___.', adj: 'quiet', adv: 'quietly', want: 'adv', d: 2 },
  { s: 'The soup smells ___.', adj: 'delicious', adv: 'deliciously', want: 'adj', d: 2 },
  { s: 'NAME did ___ on the spelling test.', adj: 'good', adv: 'well', want: 'adv', d: 2 },
  { s: 'NAME is a ___ swimmer.', adj: 'good', adv: 'well', want: 'adj', d: 2 },
  { s: 'The milk tastes ___ today.', adj: 'bad', adv: 'badly', want: 'adj', d: 3 },
  { s: 'The team played ___ in the rain.', adj: 'bad', adv: 'badly', want: 'adv', d: 3 },
  { s: 'NAME feels ___ after {his} long sleep.', adj: 'good', adv: 'well', want: 'adj', d: 3 },
  { s: 'The baby slept ___ through the night.', adj: 'peaceful', adv: 'peacefully', want: 'adv', d: 3 },
];

function adjectiveAdverb(rng: Rng, d: Difficulty): GenOutput {
  const x = rng.pick(atLevel(ADJ_ADV, d));
  const [who] = people(rng, 1);
  const s = fill(x.s, [who]).replace('___', GAP);
  const right = x.want === 'adj' ? x.adj : x.adv;
  const linking = /\b(smells|tastes|feels|is)\b/.test(x.s);
  return {
    prompt: `Which word completes the sentence?\n\n> ${s}`,
    parts: [part(mc(rng, right, [x.want === 'adj' ? x.adv : x.adj], { keepOrder: false }))],
    hints: ['Use an adjective to describe a noun, and an adverb to describe how an action is done.', linking ? 'After words like is, feels, smells and tastes, use an adjective: it describes the subject.' : 'Ask: is the word describing a thing, or how something is done?'],
    solution: [x.want === 'adj' ? `The word describes ${linking ? 'the subject, after a linking verb' : 'a noun'}, so it must be the adjective “${right}”.` : `The word tells how the action is done, so it must be the adverb “${right}”.`],
  };
}

// ---------------------------------------------------------------------------- 5.2 complete sentences

const COMPLETE: Array<[string, Difficulty]> = [
  ['The bus arrived late.', 1], ['NAME found a shiny shell on the beach.', 1], ['Birds sing in the morning.', 1],
  ['Close the window, please.', 2], ['After lunch, the class went outside.', 2], ['NAME and NAME2 built a sandcastle.', 2],
  ['Stop!', 3], ['When the bell rang, everyone cheered.', 3], ['The old clock in the hall stopped at midnight.', 3],
];
const FRAGMENT: Array<[string, Difficulty]> = [
  ['Ran to the park after school.', 1], ['The big brown dog.', 1], ['In the morning.', 1],
  ['Because it was raining.', 2], ['Jumping over the puddles.', 2], ['The girl with the red umbrella.', 2],
  ['When the bell rang at the end of the day.', 3], ['After NAME finished {his} homework.', 3], ['Hoping for a sunny day at the lake.', 3],
];
const RUNON: Array<[string, Difficulty]> = [
  ['The dog barked the cat ran away.', 1], ['NAME likes apples {he} eats one every day.', 1],
  ['It was cold we wore our coats.', 2], ['The movie was long we watched all of it.', 2],
  ['NAME lost {his} keys {he} looked everywhere and finally {he} found them in {his} coat.', 3], ['The rain stopped the sun came out the children ran outside.', 3],
];

function completeSentences(rng: Rng, d: Difficulty): GenOutput {
  const k = rng.int(0, d === 1 ? 1 : 2);
  const pool = [COMPLETE, FRAGMENT, RUNON][k];
  const [t] = rng.pick(atLevel(pool.map(([s, x]) => ({ s, d: x })), d).map((x) => [x.s]));
  const cast = people(rng, 2);
  const s = fill(t, cast);
  const labels = d === 1 ? ['A complete sentence', 'A fragment'] : ['A complete sentence', 'A fragment', 'A run-on sentence'];
  const why = [
    'It has a subject (who or what) and a predicate (what they do or are), and it expresses a complete thought.' + (/^(Close|Stop)/.test(s) ? ' In a command, the subject “you” is understood.' : ''),
    'It is missing a subject or a verb, or it does not express a complete thought, so it is a fragment.',
    'It joins two complete thoughts without the right punctuation or joining word, so it is a run-on. It could be split into two sentences.',
  ][k];
  return {
    prompt: `Is this a complete sentence, a fragment${d === 1 ? '' : ' or a run-on'}?\n\n> ${s}`,
    parts: [part({ kind: 'mc', choices: labels.map((md, i) => ({ id: 'abc'[i], md })), correct: 'abc'[k] })],
    hints: ['A complete sentence has a subject and a predicate and makes sense on its own.', 'A fragment is only part of a sentence. A run-on squashes two sentences together.'],
    solution: [why],
  };
}

/** Subject and predicate split by “|”; the simple subject is in [brackets]. */
const SPLIT: Array<[string, Difficulty]> = [
  ['The [dog] | chased the ball.', 1], ['[NAME] | sang a song.', 1], ['My little [sister] | loves bananas.', 1], ['The [sun] | rose over the hills.', 1],
  ['The tall [tree] by the river | fell in the storm.', 2], ['Our new [teacher] | told us a story.', 2], ['A flock of [geese] | flew over the lake.', 2],
  ['The [students] in the back row | could not see the board.', 3], ['Every morning, the [baker] on our street | opens at six.', 3], ['The old wooden [bridge] | creaked under our feet.', 3],
];

function subjectPredicate(rng: Rng, d: Difficulty): GenOutput {
  const [t] = rng.pick(atLevel(SPLIT.map(([s, x]) => ({ s, d: x })), d).map((x) => [x.s]));
  const [who] = people(rng, 1);
  const filled = fill(t, [who]);
  const [subj, pred] = filled.split(' | ');
  const plainSubj = subj.replace(/[[\]]/g, '');
  const simple = subj.match(/\[([^\]]+)\]/)![1];
  const sentence = `${plainSubj} ${pred}`;
  const words = sentence.replace(/[.,]/g, '').split(' ');
  const ask = d === 3 ? rng.pick(['simple', 'subject', 'predicate'] as const) : rng.pick(['subject', 'predicate'] as const);
  const intro = plainSubj.match(/^Every morning, /) ? 'Every morning, ' : '';
  const core = plainSubj.replace(intro, '');
  let right = '';
  let wrong: string[] = [];
  if (ask === 'subject') {
    right = core;
    wrong = [pred.replace(/\.$/, ''), `${core} ${pred.split(' ')[0]}`, words[words.length - 1]];
  } else if (ask === 'predicate') {
    right = pred.replace(/\.$/, '');
    wrong = [core, `${core.split(' ').slice(-1)[0]} ${pred.replace(/\.$/, '')}`, pred.split(' ').slice(1).join(' ').replace(/\.$/, '')];
  } else {
    right = simple;
    wrong = [core, pred.split(' ')[0], words.filter((w) => w !== simple && w.length > 3)[0] ?? 'the'];
  }
  const what = { subject: 'the complete subject', predicate: 'the complete predicate', simple: 'the simple subject' }[ask];
  return {
    prompt: `What is ${what} of this sentence?\n\n> ${sentence}`,
    parts: [part(mc(rng, right, wrong.filter((w) => w && w !== right)))],
    hints: ['The subject tells who or what the sentence is about. The predicate tells what the subject does or is, and begins with the verb.', ask === 'simple' ? 'The simple subject is the main noun or pronoun in the subject, without its describing words.' : 'Find the verb: everything from the verb on is the predicate.'],
    solution: [`Subject: “${core}”. Predicate: “${pred.replace(/\.$/, '')}”.${ask === 'simple' ? ` The main word in the subject is “${simple}”.` : ''}`, `So ${what} is “${right}”.`],
  };
}

// ---------------------------------------------------------------------------- 5.3 agreement and tense

const SUBJECTS: Array<{ s: string; plural: boolean; d: Difficulty; why?: string }> = [
  { s: 'The dog', plural: false, d: 1 }, { s: 'The dogs', plural: true, d: 1 }, { s: 'NAME', plural: false, d: 1 }, { s: 'My friends', plural: true, d: 1 },
  { s: 'NAME and NAME2', plural: true, d: 2, why: 'Two subjects joined by “and” are plural.' },
  { s: 'Each of the students', plural: false, d: 3, why: '“Each” is singular, even with “of the students” after it.' },
  { s: 'The box of crayons', plural: false, d: 3, why: 'The subject is “box”, which is singular; “of crayons” just describes it.' },
  { s: 'The children in the park', plural: true, d: 3, why: 'The subject is “children”, which is plural.' },
  { s: 'Everyone in my class', plural: false, d: 3, why: '“Everyone” is singular.' },
  { s: 'The flowers in the vase', plural: true, d: 2, why: 'The subject is “flowers”, which is plural.' },
];
const VERBS: Array<[string, string, string]> = [
  ['plays', 'play', 'in the garden every day.'], ['runs', 'run', 'to the bus stop each morning.'], ['likes', 'like', 'chocolate ice cream.'],
  ['is', 'are', 'ready for the trip.'], ['was', 'were', 'late for school yesterday.'], ['has', 'have', 'a new bike.'], ['does', 'do', 'homework after dinner.'],
];

function agreement(rng: Rng, d: Difficulty): GenOutput {
  const subj = rng.pick(atLevel(SUBJECTS, d));
  const [sing, plur, rest] = rng.pick(VERBS);
  const cast = people(rng, 2);
  const s = fill(subj.s, cast);
  const right = subj.plural ? plur : sing;
  return {
    prompt: `Which verb agrees with the subject?\n\n> ${s} ${GAP} ${rest}`,
    parts: [part(mc(rng, right, [subj.plural ? sing : plur]))],
    hints: ['A singular subject takes a singular verb (the dog runs); a plural subject takes a plural verb (the dogs run).', 'Find the main word of the subject, and ignore any words between it and the verb.'],
    solution: [subj.why ?? `“${s}” is ${subj.plural ? 'plural' : 'singular'}.`, `So the verb is “${right}”: ${s} ${right} ${rest}`],
  };
}

const IRREGULAR: Array<[string, string, Difficulty]> = [
  ['go', 'went', 1], ['eat', 'ate', 1], ['see', 'saw', 1], ['run', 'ran', 1], ['come', 'came', 1], ['sit', 'sat', 1],
  ['bring', 'brought', 2], ['catch', 'caught', 2], ['write', 'wrote', 2], ['swim', 'swam', 2], ['think', 'thought', 2], ['fly', 'flew', 2],
  ['teach', 'taught', 3], ['freeze', 'froze', 3], ['choose', 'chose', 3], ['shake', 'shook', 3], ['dig', 'dug', 3], ['sting', 'stung', 3],
];
const WRONG_PAST = (v: string) => (v.endsWith('e') ? `${v}d` : `${v}ed`);

function verbTense(rng: Rng, d: Difficulty): GenOutput {
  if (rng.chance(0.5)) {
    const [base, past] = rng.pick(atLevel(IRREGULAR.map(([b, p, k]) => ({ b, p, d: k })), d).map((x) => [x.b, x.p]));
    const [who] = people(rng, 1);
    const wrong = [WRONG_PAST(base), base, `${base}s`].filter((w) => w !== past);
    return {
      prompt: `Which verb correctly completes the sentence?\n\n> Yesterday, ${who.name} ${GAP} (${base}) to the library.`,
      parts: [part(mc(rng, past, wrong))],
      hints: ['“Yesterday” tells you the action is in the past.', 'Some verbs are irregular: they do not add -ed in the past.'],
      solution: [`“${base}” is irregular: its past tense is “${past}”, not “${WRONG_PAST(base)}”.`],
    };
  }
  const sentences: Array<[string, number, Difficulty]> = [
    ['NAME walked to school.', 0, 1], ['NAME walks to school.', 1, 1], ['NAME will walk to school.', 2, 1],
    ['The bell rang at noon.', 0, 1], ['We will visit the zoo tomorrow.', 2, 1], ['The baby sleeps in the afternoon.', 1, 1],
    ['They swam in the lake last summer.', 0, 2], ['NAME will bring snacks to the party.', 2, 2], ['Our teacher reads us a story every Friday.', 1, 2],
    ['The geese flew south before the snow came.', 0, 3], ['By next year, the new library will open.', 2, 3], ['The river freezes every winter.', 1, 3],
  ];
  const [t, k] = rng.pick(atLevel(sentences.map(([s, x, l]) => ({ s, x, d: l })), d).map((x) => [x.s, x.x] as const));
  const [who] = people(rng, 1);
  const tenses = ['Past', 'Present', 'Future'];
  return {
    prompt: `What is the tense of the verb in this sentence?\n\n> ${fill(t, [who])}`,
    parts: [part({ kind: 'mc', choices: tenses.map((md, i) => ({ id: 'abc'[i], md })), correct: 'abc'[k] })],
    hints: ['Past: it already happened. Present: it happens now or regularly. Future: it will happen.', '“Will” before a verb shows the future.'],
    solution: [['The verb tells about something that already happened, so it is in the past tense.', 'The verb tells about something that happens now or regularly, so it is in the present tense.', '“Will” shows the action has not happened yet, so it is in the future tense.'][k]],
  };
}

// ---------------------------------------------------------------------------- 5.4 capitals and end marks

/** Proper nouns marked with ^; common nouns that students wrongly capitalize marked with ~. */
const CAPS: Array<[string, Difficulty]> = [
  ['^on ^monday, ^NAME went to the ~park.', 1], ['^my ~dog is called ^rex.', 1], ['^we visited ^toronto in ^july.', 1], ['^our ~school is on ^maple ^street.', 1],
  ['^last ^friday, ^NAME and ^i went to the ~library.', 2], ['^the ~river ^nile is in ^africa.', 2], ['^my ~aunt lives in ^lagos, ^nigeria.', 2],
  ['^in ^december, ^NAME read ^charlotte’s ^web.', 3], ['^we sang at the ~concert on ^new ^year’s ^day.', 3], ['^my ~teacher, ^ms. ^patel, grew up in ^india.', 3],
];

function capitalize(t: string, cast: Person[], break_: { lower?: number; upper?: number } = {}): string {
  let i = 0;
  let j = 0;
  const filled = fill(t, cast);
  return filled.replace(/([\^~])([\wÀ-ÿ’.]+)/g, (_m, mark: string, w: string) => {
    if (mark === '^') {
      const k = i++;
      return k === break_.lower ? w.toLowerCase() : cap(w);
    }
    const k = j++;
    return k === break_.upper ? cap(w) : w;
  });
}

function capitals(rng: Rng, d: Difficulty): GenOutput {
  const [t] = rng.pick(atLevel(CAPS.map(([s, k]) => ({ s, d: k })), d).map((x) => [x.s]));
  const cast = people(rng, 2);
  const proper = (t.match(/\^/g) ?? []).length;
  const common = (t.match(/~/g) ?? []).length;
  const right = capitalize(t, cast);
  const wrongs = new Set<string>();
  for (let k = 0; k < 20 && wrongs.size < 3; k++) {
    const w = rng.chance(0.6) || !common ? capitalize(t, cast, { lower: rng.int(0, proper - 1) }) : capitalize(t, cast, { upper: rng.int(0, common - 1) });
    if (w !== right) wrongs.add(w);
  }
  return {
    prompt: 'Which sentence uses capital letters correctly?',
    parts: [part(mc(rng, right, [...wrongs]))],
    hints: ['Capitalize the first word of a sentence, the word I, and proper nouns: names of people, places, days, months, holidays and titles.', 'Common nouns, such as park, dog and teacher, are not capitalized.'],
    solution: [`“${right}” capitalizes the first word and every proper noun, and nothing else.`],
  };
}

const END: Array<[string, number, Difficulty]> = [
  ['Where is my pencil', 1, 1], ['The sky is blue', 0, 1], ['Wow, that was amazing', 3, 1], ['Please sit down', 2, 1], ['Do you like pizza', 1, 1], ['We went to the beach', 0, 1],
  ['Watch out for that car', 3, 2], ['Pass me the salt, please', 2, 2], ['How many legs does a spider have', 1, 2], ['I can’t believe we won', 3, 2],
  ['I wonder where my pencil is', 0, 3], ['Can you believe how tall he has grown', 1, 3], ['Hand in your tests at the end of the lesson', 2, 3], ['What a beautiful sunset that is', 3, 3],
];
const KINDS = ['A statement (.)', 'A question (?)', 'A command (. or !)', 'An exclamation (!)'];

function endMarks(rng: Rng, d: Difficulty): GenOutput {
  const [s, k] = rng.pick(atLevel(END.map(([t, x, l]) => ({ t, x, d: l })), d).map((x) => [x.t, x.x] as const));
  const why = [
    'It tells something, so it is a statement and ends with a period (full stop).' + (s.startsWith('I wonder') ? ' “I wonder where…” tells what you are wondering; it does not ask a question.' : ''),
    'It asks something, so it is a question and ends with a question mark.' + (s.startsWith('Can you believe') ? ' It shows surprise, but it is still a question.' : ''),
    'It tells someone to do something, so it is a command. It ends with a period, or an exclamation mark if it is said strongly.',
    'It shows strong feeling, so it is an exclamation and ends with an exclamation mark.' + (s.startsWith('What a') ? ' It begins with “What”, but it does not ask anything.' : ''),
  ][k];
  return {
    prompt: `What kind of sentence is this? (Its end mark is missing.)\n\n> ${s}`,
    parts: [part({ kind: 'mc', choices: KINDS.map((md, i) => ({ id: 'abcd'[i], md })), correct: 'abcd'[k] })],
    hints: ['Statements tell, questions ask, commands tell someone to do something, and exclamations show strong feeling.', 'Read it aloud: does your voice rise at the end, as in a question?'],
    solution: [why],
  };
}

// ---------------------------------------------------------------------------- 5.5 commas and quotation marks

interface Punct {
  right: string;
  wrong: string[];
  why: string;
  d: Difficulty;
}
const COMMAS: Punct[] = [
  { right: 'We bought apples, pears and grapes.', wrong: ['We bought apples pears and grapes.', 'We bought, apples, pears and grapes.', 'We bought apples, pears, and, grapes.'], why: 'Commas separate the items in a list. (A comma before “and” is also correct in many styles.)', d: 1 },
  { right: 'NAME packed a hat, a towel and sunscreen.', wrong: ['NAME packed a hat a towel and sunscreen.', 'NAME packed, a hat a towel, and sunscreen.', 'NAME, packed a hat, a towel and sunscreen.'], why: 'Commas separate the items in a list.', d: 1 },
  { right: 'Yes, I would like to come.', wrong: ['Yes I would like to come.', 'Yes I would like, to come.', 'Yes I, would like to come.'], why: 'A comma follows an introductory word such as yes, no or well.', d: 1 },
  { right: 'After dinner, we played a board game.', wrong: ['After dinner we, played a board game.', 'After, dinner we played a board game.', 'After dinner we played, a board game.'], why: 'A comma follows an introductory phrase such as “After dinner”.', d: 2 },
  { right: 'NAME, can you help me with this box?', wrong: ['NAME can you help me, with this box?', 'NAME can, you help me with this box?', 'NAME can you, help me with this box?'], why: 'A comma sets off the name of the person being spoken to.', d: 2 },
  { right: 'The party is on Saturday, June 14, 2025.', wrong: ['The party is on Saturday June 14 2025.', 'The party is on, Saturday June 14, 2025.', 'The party is on Saturday June, 14 2025.'], why: 'In a date written this way, commas go after the day of the week and between the day and the year.', d: 2 },
  { right: 'My cousin lives in Halifax, Nova Scotia.', wrong: ['My cousin lives in Halifax Nova Scotia.', 'My cousin lives, in Halifax Nova Scotia.', 'My cousin, lives in Halifax Nova Scotia.'], why: 'A comma goes between a city and its province, state or country.', d: 2 },
  { right: 'Well, I think the answer is seven.', wrong: ['Well I think, the answer is seven.', 'Well I think the answer, is seven.', 'Well I, think the answer is seven.'], why: 'A comma follows an introductory word such as well.', d: 3 },
  { right: 'When the rain stopped, the children ran outside.', wrong: ['When the rain stopped the children, ran outside.', 'When, the rain stopped the children ran outside.', 'When the rain, stopped the children ran outside.'], why: 'A comma follows an introductory clause such as “When the rain stopped”.', d: 3 },
  { right: 'NAME wanted to swim, but the pool was closed.', wrong: ['NAME wanted to swim but, the pool was closed.', 'NAME wanted, to swim but the pool was closed.', 'NAME wanted to swim but the pool, was closed.'], why: 'A comma goes before “but”, “and” or “so” when it joins two complete sentences.', d: 3 },
];

const QUOTES: Punct[] = [
  { right: '“I love this song,” said NAME.', wrong: ['“I love this song” said NAME.', 'I love this song, said NAME.', '“I love this song,” “said NAME.”'], why: 'Quotation marks go around the exact words spoken, and a comma ends the spoken part before “said”.', d: 1 },
  { right: 'NAME said, “Let’s go to the park.”', wrong: ['NAME said, Let’s go to the park.', 'NAME said “Let’s go to the park”.', '“NAME said, Let’s go to the park.”'], why: 'A comma follows “said” before the quotation, and the end mark goes inside the closing quotation mark.', d: 1 },
  { right: '“Where are my shoes?” asked NAME.', wrong: ['“Where are my shoes,” asked NAME?', '“Where are my shoes”? asked NAME.', 'Where are my shoes? “asked NAME.”'], why: 'A question mark inside the quotation marks ends a spoken question; there is no extra comma.', d: 2 },
  { right: '“Watch out!” shouted NAME.', wrong: ['“Watch out,” shouted NAME!', '“Watch out”! shouted NAME.', 'Watch out! “shouted NAME.”'], why: 'An exclamation mark inside the quotation marks ends a spoken exclamation.', d: 2 },
  { right: '“If we hurry,” said NAME, “we can catch the bus.”', wrong: ['“If we hurry,” said NAME, “We can catch the bus.”', '“If we hurry, said NAME, we can catch the bus.”', '“If we hurry” said NAME “we can catch the bus.”'], why: 'When a quotation is split, each part gets its own quotation marks, and the second part does not begin with a capital because it continues the same sentence.', d: 3 },
  { right: '“I finished my book,” said NAME. “It was great.”', wrong: ['“I finished my book,” said NAME, “it was great.”', '“I finished my book” said NAME. “It was great”.', '“I finished my book,” said NAME. “it was great.”'], why: 'When the speaker says two sentences, the second starts a new sentence with a capital letter, inside new quotation marks.', d: 3 },
];

function punct(list: Punct[], ask: string, hints: string[]) {
  return (rng: Rng, d: Difficulty): GenOutput => {
    const x = rng.pick(atLevel(list, d));
    const cast = people(rng, 1);
    return {
      prompt: ask,
      parts: [part(mc(rng, fill(x.right, cast), x.wrong.map((w) => fill(w, cast))))],
      hints,
      solution: [x.why, `Correct: ${fill(x.right, cast)}`],
    };
  };
}

export const GRAMMAR_SKILLS: SkillDef[] = [
  skill({ id: 'e5-parts-of-speech', name: 'Parts of speech', description: 'Name the nouns, verbs, adjectives, adverbs and pronouns in a sentence.', outcomes: E1, lessonId: 'e5-5-1', format: 'mc', gen: partsOfSpeech }),
  skill({ id: 'e5-adjective-adverb', name: 'Adjective or adverb', description: 'Choose between an adjective and an adverb, including good and well.', outcomes: E1, lessonId: 'e5-5-1', format: 'mc', gen: adjectiveAdverb }),
  skill({ id: 'e5-complete-sentences', name: 'Complete sentences', description: 'Tell a complete sentence from a fragment or a run-on.', outcomes: E1, lessonId: 'e5-5-2', format: 'mc', gen: completeSentences }),
  skill({ id: 'e5-subject-predicate', name: 'Subject and predicate', description: 'Find the subject and the predicate of a sentence.', outcomes: E1, lessonId: 'e5-5-2', format: 'mc', gen: subjectPredicate }),
  skill({ id: 'e5-agreement', name: 'Subject-verb agreement', description: 'Make a verb agree with its subject.', outcomes: E1, lessonId: 'e5-5-3', format: 'mc', gen: agreement }),
  skill({ id: 'e5-verb-tense', name: 'Verb tense', description: 'Tell past, present and future tense, and use irregular past forms.', outcomes: E1, lessonId: 'e5-5-3', format: 'mc', gen: verbTense }),
  skill({ id: 'e5-capitals', name: 'Capital letters', description: 'Use capital letters for the first word of a sentence, I, and proper nouns.', outcomes: E2, lessonId: 'e5-5-4', format: 'mc', gen: capitals }),
  skill({ id: 'e5-end-marks', name: 'Kinds of sentences and end marks', description: 'Tell statements, questions, commands and exclamations apart, and choose their end marks.', outcomes: E2, lessonId: 'e5-5-4', format: 'mc', gen: endMarks }),
  skill({ id: 'e5-commas', name: 'Commas', description: 'Use commas in lists, after introductory words, with names, and in dates and addresses.', outcomes: E2, lessonId: 'e5-5-5', format: 'mc', gen: punct(COMMAS, 'Which sentence uses commas correctly?', ['Commas separate items in a list, follow introductory words and phrases, set off names and go in dates and places.', 'Read each sentence aloud and listen for the natural pauses.']) }),
  skill({ id: 'e5-quotation-marks', name: 'Quotation marks', description: 'Punctuate dialogue with quotation marks, commas and end marks.', outcomes: E2, lessonId: 'e5-5-5', format: 'mc', gen: punct(QUOTES, 'Which sentence is punctuated correctly?', ['Quotation marks go around the exact words someone says.', 'The comma, question mark or exclamation mark that ends the spoken words goes inside the closing quotation mark.']) }),
];
