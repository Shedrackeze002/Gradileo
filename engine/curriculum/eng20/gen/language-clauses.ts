/**
 * Grade 11 English, lesson 7.1: Clauses and Sentence Combining (11-G1). Noun, adjective (relative)
 * and adverb clauses, what each does in its sentence, and combining short sentences so that the
 * combination shows how the ideas relate. Every wrong combination has one definite error: a comma
 * splice, a fragment, a wrong relation, a dangling modifier or a changed meaning.
 */
import { fixedChoice, mc, part, skill, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { block, fill, people } from '../../eng10/gen/common.ts';

const LESSON = 'e11-7-1';
const OUTCOMES = ['11-G1'];

// ---------------------------------------------------------------------------- kinds of clause

type Kind = 'noun' | 'adjective' | 'adverb';
const KIND_NAME: Record<Kind, string> = { noun: 'A noun clause', adjective: 'An adjective (relative) clause', adverb: 'An adverb clause' };
const KINDS: Kind[] = ['noun', 'adjective', 'adverb'];

/** What a noun clause does, what an adverb clause tells. */
type NounJob = 'subject' | 'object' | 'complement' | 'preposition';
type AdverbJob = 'time' | 'reason' | 'condition' | 'contrast';
const NOUN_JOB: Record<NounJob, string> = {
  subject: 'It is the subject of the sentence',
  object: 'It is the object of the verb',
  complement: 'It follows “is” or “was” and says what the subject is (a subject complement)',
  preposition: 'It is the object of a preposition',
};
const ADVERB_JOB: Record<AdverbJob, string> = {
  time: 'When the main action happens',
  reason: 'Why the main action happens',
  condition: 'Under what condition the main action happens',
  contrast: 'A contrast: in spite of what the main action happens',
};

interface ClauseItem {
  /** The sentence, with the clause between [[ and ]]. */
  s: string;
  kind: Kind;
  /** For a noun clause, its job; for an adverb clause, what it tells; for an adjective clause, the noun it describes. */
  job: NounJob | AdverbJob | string;
  /** Other nouns in the sentence (adjective clauses only), as wrong answers to "which word does it describe?". */
  others?: string[];
}

const C = (s: string, kind: Kind, job: string, others?: string[]): ClauseItem => ({ s, kind, job, others });

const CLAUSES: ClauseItem[] = [
  // Noun clauses.
  C('[[What NAME said at the meeting]] surprised everyone.', 'noun', 'subject'),
  C('[[Whoever finishes the puzzle first]] wins a free lunch.', 'noun', 'subject'),
  C('[[That the bridge was unsafe]] was clear to the engineers.', 'noun', 'subject'),
  C('[[Whether the match goes ahead]] depends on the weather.', 'noun', 'subject'),
  C('NAME admitted [[that {he} had forgotten the tickets]].', 'noun', 'object'),
  C('Nobody knows [[why the old clock stopped]].', 'noun', 'object'),
  C('The coach asked [[whether anyone had seen the spare ball]].', 'noun', 'object'),
  C('I cannot remember [[where I left my keys]].', 'noun', 'object'),
  C('NAME wondered [[how the magician had done the trick]].', 'noun', 'object'),
  C('The problem is [[that the shop closes at five]].', 'noun', 'complement'),
  C('The question was [[whether the team could win away from home]].', 'noun', 'complement'),
  C('This park is [[where my grandparents first met]].', 'noun', 'complement'),
  C('NAME was curious about [[what the letter said]].', 'noun', 'preposition'),
  C('The prize will go to [[whoever writes the best story]].', 'noun', 'preposition'),
  C('We argued about [[how the money should be spent]].', 'noun', 'preposition'),
  // Adjective (relative) clauses.
  C('The woman [[who lives next door]] is a pilot.', 'adjective', 'woman', ['door', 'pilot']),
  C('The song [[that NAME wrote]] won first prize at the festival.', 'adjective', 'song', ['prize', 'festival']),
  C('We visited the village [[where my mother grew up]].', 'adjective', 'village', ['mother']),
  C('The bicycle, [[which NAME bought second-hand]], still rides like new.', 'adjective', 'bicycle'),
  C('The students [[whose projects won]] will travel to the national final.', 'adjective', 'students', ['projects', 'final']),
  C('I still remember the summer [[when we learned to swim]].', 'adjective', 'summer'),
  C('The doctor [[whom NAME visited]] gave {him} good advice.', 'adjective', 'doctor', ['advice']),
  C('Our teacher recommended a novel [[that changed the way I see my city]].', 'adjective', 'novel', ['teacher', 'city']),
  C('The bakery on the corner, [[which opens at six]], sells the best bread in town.', 'adjective', 'bakery', ['corner', 'bread', 'town']),
  C('The volunteers [[who cleaned the beach]] were thanked by the mayor.', 'adjective', 'volunteers', ['beach', 'mayor']),
  // Adverb clauses.
  C('[[When the bell rang]], the students rushed outside.', 'adverb', 'time'),
  C('NAME waited at the gate [[until the last bus had gone]].', 'adverb', 'time'),
  C('[[After the storm passed]], the whole village came out to clear the roads.', 'adverb', 'time'),
  C('[[As soon as the results arrive]], I will call you.', 'adverb', 'time'),
  C('The match was cancelled [[because the pitch was flooded]].', 'adverb', 'reason'),
  C('[[Since the museum was closed]], we went to the market instead.', 'adverb', 'reason'),
  C('NAME stayed home [[because {he} had a fever]].', 'adverb', 'reason'),
  C('[[If the ferry is running]], we will cross to the island tomorrow.', 'adverb', 'condition'),
  C('You will not get in [[unless you show your ticket]].', 'adverb', 'condition'),
  C('[[If you water the seeds every day]], they will sprout within a week.', 'adverb', 'condition'),
  C('[[Although the road was icy]], the ambulance arrived on time.', 'adverb', 'contrast'),
  C('NAME kept running [[even though {his} ankle hurt]].', 'adverb', 'contrast'),
  C('[[Although NAME practised for months]], {he} still felt nervous on stage.', 'adverb', 'contrast'),
];

/** The same opening word starting clauses of different kinds (difficulty 3). */
const SAME_WORD: Array<{ word: string; items: ClauseItem[] }> = [
  {
    word: 'when',
    items: [
      C('No one knows [[when the storm will reach the coast]].', 'noun', 'object'),
      C('I still remember the day [[when we moved to the city]].', 'adjective', 'day'),
      C('Call your grandmother [[when you get home]].', 'adverb', 'time'),
    ],
  },
  {
    word: 'where',
    items: [
      C('Nobody could tell us [[where the old mill used to stand]].', 'noun', 'object'),
      C('This is the café [[where my parents first met]].', 'adjective', 'café'),
      C('[[Where the river bends]], the water runs deep and slow.', 'adverb', 'place'),
    ],
  },
  {
    word: 'that',
    items: [
      C('NAME promised [[that {he} would bring the snacks]].', 'noun', 'object'),
      C('The film [[that we watched last night]] was based on a true story.', 'adjective', 'film'),
    ],
  },
  {
    word: 'if',
    items: [
      C('NAME asked [[if the library was open on Sundays]].', 'noun', 'object'),
      C('[[If the library is open]], we will study there after lunch.', 'adverb', 'condition'),
    ],
  },
  {
    word: 'who',
    items: [
      C('Nobody knows [[who left the gate open]].', 'noun', 'object'),
      C('The girl [[who left the gate open]] apologized to the farmer.', 'adjective', 'girl'),
    ],
  },
];

const bold = (s: string) => s.replace('[[', '**').replace(']]', '**');
const plain = (s: string) => s.replace('[[', '').replace(']]', '');
const clauseText = (s: string) => /\[\[(.+?)\]\]/.exec(s)![1];
const ARTICLE: Record<Kind, string> = { noun: 'a noun clause', adjective: 'an adjective (relative) clause', adverb: 'an adverb clause' };

const KIND_HINTS = [
  'A noun clause does the job of a noun: it can be the subject, the object, or what follows “is”. Try replacing it with “something”.',
  'An adjective (relative) clause describes a noun, usually the one just before it, and often begins with who, whom, whose, which, that, where or when.',
  'An adverb clause tells when, where, why, under what condition or in spite of what the main action happens, and begins with a word such as because, although, when, if or until.',
];

/** The words that open the adverb clauses in the bank, longest first. */
const OPENERS = ['as soon as', 'even though', 'although', 'because', 'since', 'until', 'after', 'when', 'unless', 'if', 'where'];
const opener = (text: string) => OPENERS.find((o) => text.toLowerCase().startsWith(o)) ?? text.split(' ')[0].toLowerCase();

function tells(it: ClauseItem): string {
  return it.job === 'place' ? 'where the main action happens' : ADVERB_JOB[it.job as AdverbJob].toLowerCase();
}

function kindWhy(it: ClauseItem, text: string): string {
  if (it.kind === 'noun') return `“${text}” does the job of a noun: you could replace it with “something”. ${NOUN_JOB[it.job as NounJob].replace(/^It/, 'Here it')}.`;
  if (it.kind === 'adjective') return `“${text}” describes the noun “${it.job}”, like an adjective, so it is an adjective (relative) clause.`;
  return `“${text}” tells ${tells(it)}, like an adverb, so it is an adverb clause.`;
}

/** The sentence with the clause replaced by “something”. */
function withSomething(s: string): string {
  const t = s.replace(/\[\[.+?\]\]/, '**something**');
  return `“${t.replace(/^\*\*something\*\*/, '**Something**')}”`;
}

const has = (sentence: string, word: string) => new RegExp(`(^|[^\\p{L}])${word}([^\\p{L}]|$)`, 'u').test(sentence);

function clauses(rng: Rng, d: Difficulty): GenOutput {
  const cast = people(rng, 1);
  const f = (s: string) => fill(s, cast);
  if (d === 3) {
    // The same opening word in clauses of different kinds: the job decides the kind, not the word.
    const group = rng.pick(SAME_WORD);
    const want = rng.pick(group.items);
    const others = group.items.filter((x) => x !== want);
    if (others.length < 2) {
      const missing = KINDS.find((k) => k !== want.kind && !others.some((o) => o.kind === k))!;
      others.push(rng.pick(CLAUSES.filter((x) => x.kind === missing)));
    }
    return {
      prompt: `In which sentence is the clause in bold **${ARTICLE[want.kind]}**?`,
      parts: [part(mc(rng, f(bold(want.s)), others.map((x) => f(bold(x.s)))))],
      hints: ['The word that opens a clause does not decide its kind: its job in the sentence does.', KIND_HINTS[KINDS.indexOf(want.kind)]],
      solution: [kindWhy(want, f(clauseText(want.s))), `The other clauses in bold are ${others.map((o) => ARTICLE[o.kind]).join(' and ')}.`],
    };
  }
  if (d === 1) {
    const it = rng.pick(CLAUSES);
    const text = f(clauseText(it.s));
    return {
      prompt: `What kind of clause is in bold?\n\n${block(f(bold(it.s)))}`,
      parts: [part(fixedChoice(KINDS.map((k) => KIND_NAME[k]), KINDS.indexOf(it.kind)))],
      hints: KIND_HINTS,
      solution: [kindWhy(it, text)],
    };
  }
  // Difficulty 2: what the clause does in its sentence.
  const it = rng.pick(CLAUSES.filter((x) => x.kind !== 'adjective' || (x.others?.length ?? 0) > 0));
  const text = f(clauseText(it.s));
  const sentence = block(f(bold(it.s)));
  if (it.kind === 'noun') {
    const jobs: NounJob[] = ['subject', 'object', 'complement', 'preposition'];
    return {
      prompt: `The clause in bold is a noun clause. What job does it do in the sentence?\n\n${sentence}`,
      parts: [part(fixedChoice(jobs.map((j) => NOUN_JOB[j]), jobs.indexOf(it.job as NounJob)))],
      hints: ['Replace the clause with “something” and read the sentence again: is “something” doing the action, receiving it, following “is”, or following a word such as “about”, “to” or “of”?'],
      solution: [`Replace the clause with “something”: ${f(withSomething(it.s))}`, `${NOUN_JOB[it.job as NounJob]}.`],
    };
  }
  if (it.kind === 'adverb') {
    const jobs: AdverbJob[] = ['time', 'reason', 'condition', 'contrast'];
    return {
      prompt: `The clause in bold is an adverb clause. What does it tell the reader?\n\n${sentence}`,
      parts: [part(fixedChoice(jobs.map((j) => ADVERB_JOB[j]), jobs.indexOf(it.job as AdverbJob)))],
      hints: ['Look at the word that opens the clause: when, until and after show time; because and since show a reason; if and unless show a condition; although and even though show a contrast.'],
      solution: [`“${text}” tells ${tells(it)}.`, `The word that opens it, “${opener(text)}”, signals this.`],
    };
  }
  const full = f(plain(it.s));
  const wrong = [...(it.others ?? []), cast[0].name].filter((w) => w !== it.job && has(full, w));
  return {
    prompt: `The clause in bold is an adjective (relative) clause. Which noun does it describe?\n\n${sentence}`,
    parts: [part(mc(rng, `“${it.job}”`, wrong.map((w) => `“${w}”`)))],
    hints: ['A relative clause usually comes straight after the noun it describes. Ask: which one is meant, or what extra detail is given, and about what?'],
    solution: [`The clause “${text}” tells us more about the ${it.job}: it describes “${it.job}”.`],
  };
}

// ---------------------------------------------------------------------------- sentence combining

interface Combo {
  d: Difficulty;
  sents: string[];
  best: string;
  how: string;
  wrong: Array<[string, string]>;
}

const COMBOS: Combo[] = [
  {
    d: 1,
    sents: ['NAME trained every morning for a year.', '{He} did not qualify for the final.'],
    best: 'Although NAME trained every morning for a year, {he} did not qualify for the final.',
    how: '“Although” shows the contrast: the result is not what the training would lead you to expect',
    wrong: [
      ['Because NAME trained every morning for a year, {he} did not qualify for the final.', '“because” wrongly says the training caused the failure'],
      ['NAME trained every morning for a year, {he} did not qualify for the final.', 'it joins two independent clauses with only a comma: a comma splice'],
      ['NAME trained every morning for a year, so {he} did not qualify for the final.', '“so” wrongly says the training caused the failure'],
    ],
  },
  {
    d: 1,
    sents: ['The bridge was closed for repairs.', 'The buses took the long way round.'],
    best: 'Because the bridge was closed for repairs, the buses took the long way round.',
    how: '“Because” shows that the closed bridge caused the detour',
    wrong: [
      ['Although the bridge was closed for repairs, the buses took the long way round.', '“although” wrongly suggests a contrast where there is a cause'],
      ['The bridge was closed for repairs, the buses took the long way round.', 'it joins two independent clauses with only a comma: a comma splice'],
      ['The bridge was closed for repairs, but the buses took the long way round.', '“but” wrongly suggests a contrast where there is a cause'],
    ],
  },
  {
    d: 1,
    sents: ['The forecast promised sunshine.', 'It rained all afternoon.'],
    best: 'Although the forecast promised sunshine, it rained all afternoon.',
    how: '“Although” shows the contrast between the forecast and the weather',
    wrong: [
      ['Because the forecast promised sunshine, it rained all afternoon.', '“because” wrongly says the forecast caused the rain'],
      ['The forecast promised sunshine, it rained all afternoon.', 'it joins two independent clauses with only a comma: a comma splice'],
      ['Although the forecast promised sunshine.', 'it is a dependent clause standing alone: a fragment, and the rain is lost'],
    ],
  },
  {
    d: 1,
    sents: ['NAME found a stray kitten in the rain.', '{He} took it home and dried it.'],
    best: 'When NAME found a stray kitten in the rain, {he} took it home and dried it.',
    how: '“When” shows the order of events: finding the kitten, then taking it home',
    wrong: [
      ['Although NAME found a stray kitten in the rain, {he} took it home and dried it.', '“although” wrongly suggests a contrast'],
      ['NAME found a stray kitten in the rain, {he} took it home and dried it.', 'it joins two independent clauses with only a comma: a comma splice'],
      ['When NAME found a stray kitten in the rain.', 'it is a dependent clause standing alone: a fragment'],
    ],
  },
  {
    d: 1,
    sents: ['The library extended its opening hours.', 'More students came to study in the evenings.'],
    best: 'The library extended its opening hours, so more students came to study in the evenings.',
    how: '“so” shows that the longer hours led to more students coming',
    wrong: [
      ['The library extended its opening hours, but more students came to study in the evenings.', '“but” wrongly suggests a contrast where there is a result'],
      ['The library extended its opening hours more students came to study in the evenings.', 'nothing joins the two independent clauses: a run-on'],
      ['Although the library extended its opening hours, more students came to study in the evenings.', '“although” wrongly suggests a contrast'],
    ],
  },
  {
    d: 2,
    sents: ['My aunt is a marine biologist.', 'She lives in Mombasa.'],
    best: 'My aunt, who lives in Mombasa, is a marine biologist.',
    how: 'the relative clause “who lives in Mombasa” adds the detail inside the sentence, set off by a pair of commas',
    wrong: [
      ['My aunt is a marine biologist, she lives in Mombasa.', 'it joins two independent clauses with only a comma: a comma splice'],
      ['My aunt, who is a marine biologist in Mombasa.', 'it never says what the aunt does: a fragment'],
      ['My aunt is a marine biologist which lives in Mombasa.', '“which” is used for things, not people'],
    ],
  },
  {
    d: 2,
    sents: ['Lagos is the largest city in Nigeria.', 'Lagos is home to millions of people.'],
    best: 'Lagos, the largest city in Nigeria, is home to millions of people.',
    how: 'the appositive “the largest city in Nigeria” renames Lagos and is set off by a pair of commas',
    wrong: [
      ['Lagos, the largest city in Nigeria is home to millions of people.', 'the closing comma after the appositive is missing, so a single comma splits the subject from its verb'],
      ['Lagos is the largest city in Nigeria, it is home to millions of people.', 'it joins two independent clauses with only a comma: a comma splice'],
      ['Lagos, the largest city in Nigeria and home to millions of people.', 'it has no main verb: a fragment'],
    ],
  },
  {
    d: 2,
    sents: ['The old lighthouse was built in 1880.', 'It still guides ships into the harbour.'],
    best: 'The old lighthouse, which was built in 1880, still guides ships into the harbour.',
    how: 'the relative clause “which was built in 1880” adds the detail, set off by a pair of commas',
    wrong: [
      ['The old lighthouse, which was built in 1880 still guides ships into the harbour.', 'the closing comma is missing, so a single comma splits the subject from its verb'],
      ['The old lighthouse was built in 1880, it still guides ships into the harbour.', 'it joins two independent clauses with only a comma: a comma splice'],
      ['The old lighthouse, who was built in 1880, still guides ships into the harbour.', '“who” is used for people, not things'],
    ],
  },
  {
    d: 2,
    sents: ['NAME is our team captain.', '{He} scored the winning goal.'],
    best: 'NAME, our team captain, scored the winning goal.',
    how: 'the appositive “our team captain” renames NAME and is set off by a pair of commas',
    wrong: [
      ['NAME our team captain scored the winning goal.', 'the appositive needs a comma before and after it'],
      ['NAME is our team captain, {he} scored the winning goal.', 'it joins two independent clauses with only a comma: a comma splice'],
      ['NAME, our team captain who scored the winning goal.', 'it has no main verb: a fragment'],
    ],
  },
  {
    d: 2,
    sents: ['The museum reopened last spring.', 'The museum has a new hall of dinosaur fossils.'],
    best: 'The museum, which reopened last spring, has a new hall of dinosaur fossils.',
    how: 'the relative clause “which reopened last spring” adds the detail inside the sentence',
    wrong: [
      ['The museum reopened last spring, it has a new hall of dinosaur fossils.', 'it joins two independent clauses with only a comma: a comma splice'],
      ['The museum, which reopened last spring and has a new hall of dinosaur fossils.', 'it has no main verb: a fragment'],
      ['The museum has a new hall of dinosaur fossils, which reopened last spring.', '“which” now seems to describe the fossils, as if they had reopened: the meaning changes'],
    ],
  },
  {
    d: 2,
    sents: ['The volunteers cleaned the beach.', 'The mayor thanked the volunteers.'],
    best: 'The mayor thanked the volunteers who cleaned the beach.',
    how: 'the relative clause “who cleaned the beach” comes straight after “volunteers”, the noun it describes',
    wrong: [
      ['The mayor thanked the volunteers, they cleaned the beach.', 'it joins two independent clauses with only a comma: a comma splice'],
      ['The mayor who cleaned the beach thanked the volunteers.', 'the clause now describes the mayor, so it says the mayor cleaned the beach: the meaning changes'],
      ['The volunteers who cleaned the beach.', 'it has no main verb and loses the mayor: a fragment'],
    ],
  },
  {
    d: 3,
    sents: ['NAME opened the envelope.', '{He} found two tickets to the final.'],
    best: 'Opening the envelope, NAME found two tickets to the final.',
    how: 'the participial phrase “Opening the envelope” describes NAME, the subject straight after the comma',
    wrong: [
      ['Opening the envelope, two tickets to the final were inside.', 'the tickets did not open the envelope: a dangling modifier'],
      ['NAME opened the envelope, {he} found two tickets to the final.', 'it joins two independent clauses with only a comma: a comma splice'],
      ['Although NAME opened the envelope, {he} found two tickets to the final.', '“although” wrongly suggests a contrast'],
    ],
  },
  {
    d: 3,
    sents: ['NAME was exhausted after the long shift.', '{He} fell asleep on the bus.', '{He} missed {his} stop.'],
    best: 'Exhausted after the long shift, NAME fell asleep on the bus and missed {his} stop.',
    how: 'the phrase “Exhausted after the long shift” describes NAME, and the compound verb “fell asleep … and missed” joins the last two ideas',
    wrong: [
      ['Exhausted after the long shift, the bus carried NAME past {his} stop while {he} slept.', 'the bus was not exhausted: a dangling modifier'],
      ['NAME was exhausted after the long shift, {he} fell asleep on the bus, {he} missed {his} stop.', 'it joins three independent clauses with only commas: comma splices'],
      ['Although NAME was exhausted after the long shift, {he} fell asleep on the bus and missed {his} stop.', '“although” wrongly suggests a contrast where there is a cause'],
    ],
  },
  {
    d: 3,
    sents: ['The storm knocked down power lines.', 'The town was dark for two days.', 'Volunteers handed out candles and blankets.'],
    best: 'Because the storm knocked down power lines, the town was dark for two days, and volunteers handed out candles and blankets.',
    how: '“Because” shows that the storm caused the blackout, and “, and” adds the volunteers’ response as a second independent clause',
    wrong: [
      ['Although the storm knocked down power lines, the town was dark for two days, and volunteers handed out candles and blankets.', '“although” wrongly suggests a contrast where there is a cause'],
      ['The storm knocked down power lines, the town was dark for two days, volunteers handed out candles and blankets.', 'it joins three independent clauses with only commas: comma splices'],
      ['Because the storm knocked down power lines and the town was dark for two days.', 'it is all dependent clause, with no main clause: a fragment'],
    ],
  },
  {
    d: 3,
    sents: ['The scientists studied the coral reef for five years.', 'They discovered a new species of fish.', 'The species is bright orange.'],
    best: 'Studying the coral reef for five years, the scientists discovered a new species of fish, which is bright orange.',
    how: 'the participial phrase describes the scientists, and the relative clause “which is bright orange” describes the new species',
    wrong: [
      ['Studying the coral reef for five years, a new species of fish was discovered, which is bright orange.', 'the species did not study the reef: a dangling modifier'],
      ['The scientists studied the coral reef for five years, they discovered a new species of fish, it is bright orange.', 'it joins three independent clauses with only commas: comma splices'],
      ['Studying the coral reef for five years, the scientists discovered a new species of fish, who is bright orange.', '“who” is used for people, not fish'],
    ],
  },
  {
    d: 3,
    sents: ['NAME’s grandmother is a retired engineer.', 'She designed the footbridge over the river.', 'The footbridge opened in 1995.'],
    best: 'NAME’s grandmother, a retired engineer, designed the footbridge over the river, which opened in 1995.',
    how: 'the appositive “a retired engineer” renames the grandmother, and the relative clause “which opened in 1995” describes the footbridge',
    wrong: [
      ['NAME’s grandmother, a retired engineer, designed the footbridge over the river, who opened it in 1995.', '“who” now seems to describe the river and makes no sense: the meaning is lost'],
      ['NAME’s grandmother is a retired engineer, she designed the footbridge over the river, it opened in 1995.', 'it joins three independent clauses with only commas: comma splices'],
      ['NAME’s grandmother, a retired engineer who designed the footbridge over the river that opened in 1995.', 'it has no main verb: a fragment'],
    ],
  },
  {
    d: 3,
    sents: ['The orchestra rehearsed for months.', 'The first concert sold out.', 'Many people could not get tickets.'],
    best: 'After the orchestra rehearsed for months, the first concert sold out, so many people could not get tickets.',
    how: '“After” shows the order of events, and “so” shows that the sell-out left people without tickets',
    wrong: [
      ['After the orchestra rehearsed for months, the first concert sold out, although many people could not get tickets.', '“although” wrongly says the concert sold out in spite of people missing tickets, when the sell-out is the reason they missed them'],
      ['The orchestra rehearsed for months, the first concert sold out, many people could not get tickets.', 'it joins three independent clauses with only commas: comma splices'],
      ['Rehearsing for months, the first concert sold out, so many people could not get tickets.', 'the concert did not rehearse: a dangling modifier'],
    ],
  },
];

function sentenceCombining(rng: Rng, d: Difficulty): GenOutput {
  const cast = people(rng, 1);
  const f = (s: string) => fill(s, cast);
  const pool = COMBOS.filter((c) => c.d === d);
  const c = rng.pick(pool);
  const wrongs = rng.shuffle(c.wrong).slice(0, d === 1 ? 2 : 3);
  const listed = c.sents.map(f).join(' ');
  return {
    prompt: `Which sentence combines these ${c.sents.length === 2 ? 'two' : 'three'} sentences correctly, showing how the ideas relate?\n\n${block(listed)}`,
    parts: [part(mc(rng, f(c.best), wrongs.map((w) => f(w[0]))))],
    hints: [
      'First decide how the ideas relate: a cause, a contrast, a time order, or extra detail about someone or something.',
      'Then check each choice for a comma splice, a fragment, a dangling modifier, or a word such as “who” or “which” that attaches to the wrong noun.',
    ],
    solution: [`“${f(c.best)}” is correct: ${f(c.how)}.`, `“${f(wrongs[0][0])}” is wrong: ${f(wrongs[0][1])}.`],
  };
}

export const CLAUSE_SKILLS: SkillDef[] = [
  skill({
    id: 'e11-clauses',
    name: 'Noun, adjective and adverb clauses',
    description: 'Identify noun, adjective (relative) and adverb clauses and the job each does in its sentence.',
    outcomes: OUTCOMES,
    lessonId: LESSON,
    format: 'mc',
    gen: clauses,
  }),
  skill({
    id: 'e11-sentence-combining',
    name: 'Sentence combining',
    description: 'Combine short sentences with subordinate clauses, relative clauses, appositives and participial phrases that show how the ideas relate.',
    outcomes: OUTCOMES,
    lessonId: LESSON,
    format: 'mc',
    gen: sentenceCombining,
  }),
];

