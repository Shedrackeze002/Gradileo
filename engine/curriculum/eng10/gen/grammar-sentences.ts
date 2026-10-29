/**
 * Grade 10 English, lesson 7.1: Sentences: Fragments, Run-ons and Comma Splices (10-G1).
 * Sentences are built from pairs of related independent clauses, so the same two ideas appear as a
 * complete sentence, a fragment, a run-on or a comma splice, and every fix is checked by its form.
 */
import { fixedChoice, mc, part, skill, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { block, cap, fill, lowerFirst, people, type Person } from './common.ts';

const LESSON = 'e10-7-1';
const OUTCOMES = ['10-G1'];

type Rel = 'so' | 'but' | 'and';

interface Pair {
  /** The first independent clause (the cause in a "so" pair). */
  a: string;
  /** The second independent clause. */
  b: string;
  rel: Rel;
  /** A subordinating conjunction that can introduce `a`: "Because a, b." */
  sub?: 'because' | 'although' | 'while';
  /** A third independent clause and the conjunction that joins it, for compound-complex sentences. */
  c?: string;
  cj?: 'and' | 'but' | 'so';
}

const PAIRS: Pair[] = [
  { a: 'the bus broke down on the bridge', b: 'NAME was late for the science test', rel: 'so', sub: 'because', c: '{his} teacher let {him} take it at lunch', cj: 'but' },
  { a: 'NAME forgot {his} umbrella', b: '{he} got soaked on the walk home', rel: 'so', sub: 'because', c: '{his} shoes were still wet the next morning', cj: 'and' },
  { a: 'the library closes at six', b: 'we will finish the project at home', rel: 'so', sub: 'because', c: 'NAME will bring the poster paper', cj: 'and' },
  { a: 'the power went out during the storm', b: 'the whole street was dark for hours', rel: 'so', sub: 'because', c: 'the shops closed early', cj: 'and' },
  { a: 'NAME rehearsed {his} piano piece every evening', b: 'the recital went smoothly', rel: 'so', sub: 'because', c: '{his} family cheered loudly at the end', cj: 'and' },
  { a: 'the tickets sold out in an hour', b: 'many fans could not get into the stadium', rel: 'so', sub: 'because', c: 'some of them watched the match on a big screen outside', cj: 'but' },
  { a: 'the river had flooded the main road', b: 'the delivery truck took a long detour', rel: 'so', sub: 'because', c: 'the groceries arrived after dark', cj: 'and' },
  { a: 'NAME had stayed up late reading', b: '{he} was tired the next morning', rel: 'so', sub: 'because', c: '{he} still finished {his} chores before lunch', cj: 'but' },
  { a: 'NAME’s flight landed late', b: '{he} missed the last train into the city', rel: 'so', sub: 'because', c: '{he} took a taxi instead', cj: 'so' },
  { a: 'the stray cat looked hungry', b: 'NAME gave it some leftover fish', rel: 'so', sub: 'because', c: 'now it visits every evening', cj: 'and' },
  { a: 'the recipe looked simple', b: 'the cake collapsed in the oven', rel: 'but', sub: 'although', c: 'NAME made pancakes instead', cj: 'so' },
  { a: 'NAME studied for weeks', b: 'the final exam still surprised {him}', rel: 'but', sub: 'although', c: '{he} needed extra time for the last question', cj: 'and' },
  { a: 'the museum is free on Sundays', b: 'few people know about it', rel: 'but', sub: 'although', c: 'the galleries are often quiet', cj: 'so' },
  { a: 'the phone was brand new', b: 'its battery died by lunchtime', rel: 'but', sub: 'although', c: 'NAME had to borrow a charger', cj: 'so' },
  { a: 'NAME wanted to join the choir', b: 'the auditions had already finished', rel: 'but', sub: 'although', c: '{he} signed up for next term', cj: 'so' },
  { a: 'the forecast promised sunshine', b: 'it rained all afternoon', rel: 'but', sub: 'although', c: 'the picnic moved indoors', cj: 'so' },
  { a: 'the old bridge looks fragile', b: 'it has stood for two hundred years', rel: 'but', sub: 'although' },
  { a: 'the hiking trail was steep', b: 'the view from the top was worth the climb', rel: 'but', sub: 'although', c: 'everyone took photos', cj: 'and' },
  { a: 'NAME cleared the table', b: 'NAME2 washed the dishes', rel: 'and', sub: 'while', c: 'their grandmother made tea', cj: 'and' },
  { a: 'NAME plays the violin', b: '{his} brother plays the drums', rel: 'and', sub: 'while', c: 'their house is rarely quiet', cj: 'so' },
  { a: 'NAME entered the science fair', b: '{his} project on solar ovens won second prize', rel: 'and' },
  { a: 'the market opens at dawn', b: 'the best mangoes are gone by eight', rel: 'and' },
];

/** Phrases and dependent clauses that look like sentences but are not. */
const FRAGMENTS: Array<{ s: string; why: string }> = [
  { s: 'Running down the hall to catch the last bus.', why: '“Running” is not a complete verb on its own, and there is no subject: who was running?' },
  { s: 'The book that NAME left on the train.', why: 'It names a thing (the book) but never says what the book did or was: “that NAME left on the train” is a dependent clause describing it.' },
  { s: 'After the long match on Saturday afternoon.', why: 'It is a phrase that tells when, with no subject and no verb.' },
  { s: 'Hoping for a sunny day at the beach.', why: '“Hoping” is not a complete verb on its own, and there is no subject.' },
  { s: 'A tall glass of cold mango juice with ice.', why: 'It names a thing but has no verb.' },
  { s: 'Which made everyone in the room laugh.', why: '“Which” starts a dependent clause; it needs a main clause to attach to.' },
  { s: 'Such as maps, compasses and water bottles.', why: '“Such as” introduces examples of something that is never named; there is no subject or verb.' },
  { s: 'Especially the songs from the final act.', why: 'It is a phrase with no verb; it needs a sentence to attach to.' },
  { s: 'NAME, who had never seen snow before.', why: 'It names a person and describes them in a “who” clause, but never says what NAME did.' },
  { s: 'To finish the painting before the art show.', why: '“To finish” is an infinitive, not a complete verb, and there is no subject.' },
  { s: 'Because of the heavy traffic on the highway.', why: '“Because of” begins a phrase giving a reason; there is no subject or verb.' },
  { s: 'The old house at the end of the street with the broken gate and the overgrown garden.', why: 'It is a long description of a house, but it has no verb.' },
  { s: 'While NAME and {his} friends were waiting outside the cinema in the rain.', why: '“While” makes the clause dependent: the sentence never says what happened while they were waiting.' },
];

/** Complete sentences that students often mistake for errors. */
const TRICKY_COMPLETE: Array<{ s: string; why: string }> = [
  { s: 'Close the window before the rain comes in.', why: 'It is a command. The subject “you” is understood, so it is a complete sentence.' },
  { s: 'Bring a water bottle and a hat on the field trip.', why: 'It is a command with the understood subject “you”, so it is a complete sentence.' },
  { s: 'NAME laughed.', why: 'It is short, but it has a subject (NAME) and a verb (laughed) and expresses a complete thought.' },
  { s: 'Stop!', why: 'It is a command with the understood subject “you”, so it is a complete sentence.' },
  { s: 'NAME and NAME2 painted the fence, washed the car and swept the driveway on Saturday.', why: 'It is long, but it is one independent clause: one subject (NAME and NAME2) with three verbs.' },
];

/** Simple sentences with compound subjects or verbs (difficulty 3). */
const SIMPLE_COMPOUND = [
  'NAME and NAME2 painted the fence and washed the car.',
  'The coach and the players celebrated after the final whistle.',
  'NAME finished {his} homework and went to bed early.',
  'After lunch, the students and their teacher walked to the museum.',
  'During the storm, the lights flickered and went out.',
  'NAME and {his} cousins swam in the lake and cooked dinner on the beach.',
  'Every morning, NAME feeds the chickens and collects the eggs.',
];

const ADVERB: Record<'so' | 'but', string> = { so: 'as a result', but: 'however' };

/** The clauses of a pair, filled with a cast. */
function clauses(p: Pair, cast: Person[]) {
  const a = fill(p.a, cast);
  const b = fill(p.b, cast);
  return {
    A: cap(a),
    a: lowerFirst(a),
    B: cap(b),
    b: lowerFirst(b),
    c: p.c ? lowerFirst(fill(p.c, cast)) : '',
  };
}

const form = {
  conj: (p: Pair, k: ReturnType<typeof clauses>) => `${k.A}, ${p.rel} ${k.b}.`,
  semi: (k: ReturnType<typeof clauses>) => `${k.A}; ${k.b}.`,
  period: (k: ReturnType<typeof clauses>) => `${k.A}. ${k.B}.`,
  subFirst: (p: Pair, k: ReturnType<typeof clauses>) => `${cap(p.sub!)} ${k.a}, ${k.b}.`,
  splice: (k: ReturnType<typeof clauses>) => `${k.A}, ${k.b}.`,
  runon: (k: ReturnType<typeof clauses>) => `${k.A} ${k.b}.`,
  fragment: (p: Pair, k: ReturnType<typeof clauses>) => `${cap(p.sub!)} ${k.a}.`,
};

const ERROR_CHOICES = ['A complete sentence', 'A fragment', 'A run-on (fused) sentence', 'A comma splice'];
type ErrorKind = 0 | 1 | 2 | 3;

const COORD = 'a coordinating conjunction (for, and, nor, but, or, yet, so)';

function sentenceErrors(rng: Rng, d: Difficulty): GenOutput {
  const kind = rng.int(0, 3) as ErrorKind;
  const cast = people(rng, 2);
  const withSub = PAIRS.filter((p) => p.sub);
  const p = rng.pick(kind === 1 ? withSub : PAIRS);
  const k = clauses(p, cast);
  let s = '';
  let why = '';
  if (kind === 0) {
    const options: Array<[string, string]> = [
      [form.conj(p, k), `It has two independent clauses joined correctly, by a comma and the coordinating conjunction “${p.rel}”.`],
      ...(p.sub ? ([[form.subFirst(p, k), `“${cap(p.sub)} ${k.a}” is a dependent clause, and it is attached to the independent clause “${k.b}”, so the thought is complete.`]] as Array<[string, string]>) : []),
    ];
    if (d >= 2) {
      options.push([form.semi(k), 'It has two independent clauses joined correctly, by a semicolon.']);
      if (p.sub === 'because') options.push([`${k.B} because ${k.a}.`, `“${k.B}” is an independent clause, and “because ${k.a}” is a dependent clause attached to it.`]);
    }
    if (d === 3) {
      if (p.rel !== 'and') options.push([`${k.A}; ${ADVERB[p.rel]}, ${k.b}.`, `The semicolon joins the two independent clauses; “${ADVERB[p.rel]}” after it is followed by a comma.`]);
      const t = rng.pick(TRICKY_COMPLETE);
      // Twice, so the tricky complete sentences come up as often as the others.
      options.push([fill(t.s, cast), fill(t.why, cast)], [fill(t.s, cast), fill(t.why, cast)]);
    }
    [s, why] = rng.pick(options);
  } else if (kind === 1) {
    if (d >= 2 && rng.chance(d === 3 ? 0.7 : 0.5)) {
      const f = rng.pick(FRAGMENTS);
      s = fill(f.s, cast);
      why = fill(f.why, cast);
    } else {
      s = form.fragment(p, k);
      why = `“${cap(p.sub!)}” makes the clause dependent: it leaves the reader waiting for the main idea, so on its own it is a fragment.`;
    }
  } else if (kind === 2) {
    s = form.runon(k);
    why = `“${k.A}” and “${k.b}” are both independent clauses, and nothing joins them: no punctuation and no conjunction. That is a run-on (fused) sentence.`;
  } else {
    if (d === 3 && p.rel !== 'and' && rng.chance(0.6)) {
      const adv = p.rel === 'but' ? 'however' : 'therefore';
      s = `${k.A}, ${adv}, ${k.b}.`;
      why = `“${cap(adv)}” is not a coordinating conjunction, so the two independent clauses are joined only by commas: a comma splice. A semicolon is needed before “${adv}”.`;
    } else if (d === 3 && rng.chance(0.4)) {
      s = `${k.A}, then ${k.b}.`;
      why = '“Then” is not a coordinating conjunction, so the two independent clauses are joined only by a comma: a comma splice.';
    } else {
      s = form.splice(k);
      why = `“${k.A}” and “${k.b}” are both independent clauses, joined only by a comma. That is a comma splice.`;
    }
  }
  return {
    prompt: `Is this a complete sentence, a fragment, a run-on sentence or a comma splice?\n\n${block(s)}`,
    parts: [part(fixedChoice(ERROR_CHOICES, kind))],
    hints: [
      'Find each independent clause: a subject and a verb that make sense on their own.',
      `A sentence needs at least one independent clause. Two independent clauses need a period, a semicolon, or a comma with ${COORD} between them.`,
    ],
    solution: [why, `So it is ${ERROR_CHOICES[kind][0].toLowerCase()}${ERROR_CHOICES[kind].slice(1)}.`],
  };
}

/** Wrong ways to fix a comma splice or run-on, each with what is wrong with it. */
function wrongJoins(p: Pair, k: ReturnType<typeof clauses>): Array<[string, string]> {
  const out: Array<[string, string]> = [
    [form.splice(k), 'a comma alone cannot join two independent clauses (a comma splice)'],
    [form.runon(k), 'nothing joins the two independent clauses (a run-on)'],
    [`${k.A} ${p.rel}, ${k.b}.`, `the comma belongs before “${p.rel}”, not after it`],
    [`${k.A}, ${p.rel}, ${k.b}.`, `there should be no comma after “${p.rel}”`],
  ];
  if (p.sub) out.push([`${k.B}. ${cap(p.sub)} ${k.a}.`, `“${cap(p.sub)} ${k.a}.” is a dependent clause standing alone: a new fragment`]);
  if (p.rel !== 'and') out.push([`${k.A}, ${ADVERB[p.rel]} ${k.b}.`, `“${ADVERB[p.rel]}” is not a coordinating conjunction, so this is still a comma splice`]);
  return out;
}

function sentenceFixes(rng: Rng, d: Difficulty): GenOutput {
  const cast = people(rng, 2);
  const fragment = d === 3 && rng.chance(0.5);
  const pool = fragment ? PAIRS.filter((p) => p.sub && p.sub !== 'while') : PAIRS;
  const p = rng.pick(pool);
  const k = clauses(p, cast);
  if (fragment) {
    const original = `${k.B}. ${cap(p.sub!)} ${k.a}.`;
    const correct = form.subFirst(p, k);
    const wrongs: Array<[string, string]> = [
      [`${k.B}; ${p.sub} ${k.a}.`, 'a semicolon cannot join a dependent clause to a sentence'],
      [`${k.B}. ${cap(p.sub!)}, ${k.a}.`, 'the dependent clause is still a fragment on its own'],
      [`${k.B}, ${k.a}.`, `dropping “${p.sub}” leaves two independent clauses joined by a comma: a comma splice`],
    ];
    return {
      prompt: `The second part of this is a fragment:\n\n${block(original)}\n\nWhich revision fixes it correctly?`,
      parts: [part(mc(rng, correct, wrongs.map((w) => w[0])))],
      hints: [`A clause that starts with “${p.sub}” is dependent: it must be attached to an independent clause.`, 'When the dependent clause comes first, put a comma after it.'],
      solution: [
        `“${cap(p.sub!)} ${k.a}” cannot stand alone. Attaching it to “${k.b}” gives a complete sentence: “${correct}”`,
        `In the other choices, ${wrongs[0][1]}; ${wrongs[1][1]}; and ${wrongs[2][1]}.`,
      ],
    };
  }
  const isSplice = d === 1 || (d === 3 ? rng.chance(0.5) : false);
  const original = isSplice ? form.splice(k) : form.runon(k);
  const corrects: Array<[string, string]> = [
    [form.period(k), 'a period makes two separate sentences'],
    [form.semi(k), 'a semicolon can join two closely related independent clauses'],
    [form.conj(p, k), `a comma with the coordinating conjunction “${p.rel}” joins the two independent clauses`],
  ];
  if (p.sub) corrects.push([form.subFirst(p, k), `“${p.sub}” turns the first clause into a dependent clause, followed by a comma`]);
  if (d === 3 && p.rel !== 'and') corrects.push([`${k.A}; ${ADVERB[p.rel]}, ${k.b}.`, `a semicolon before “${ADVERB[p.rel]}” and a comma after it join the clauses`]);
  const [correct, how] = rng.pick(corrects);
  const wrongs = rng.shuffle(wrongJoins(p, k).filter(([w]) => w !== original && w !== correct)).slice(0, 3);
  return {
    prompt: `This is ${isSplice ? 'a comma splice' : 'a run-on (fused) sentence'}:\n\n${block(original)}\n\nWhich revision fixes it correctly?`,
    parts: [part(mc(rng, correct, wrongs.map((w) => w[0])))],
    hints: [
      'There are two independent clauses. Find where one ends and the next begins.',
      `They can be separated with a period, joined with a semicolon or with a comma and ${COORD}, or one can be made dependent with a word such as because, although or while.`,
    ],
    solution: [`“${correct}” is correct: ${how}.`, `“${wrongs[0][0]}” is wrong because ${wrongs[0][1]}.`],
  };
}

const TYPE_CHOICES = ['Simple', 'Compound', 'Complex', 'Compound-complex'];

function sentenceTypes(rng: Rng, d: Difficulty): GenOutput {
  const type = rng.int(0, 3);
  const cast = people(rng, 2);
  let s = '';
  let why = '';
  if (type === 0) {
    if (d === 3 || (d === 2 && rng.chance(0.4))) {
      s = fill(rng.pick(SIMPLE_COMPOUND), cast);
      why = 'It has only one independent clause. A compound subject (two people or things doing the action) or a compound verb (two actions) does not make a second clause, so it is simple.';
    } else {
      const p = rng.pick(PAIRS);
      const k = clauses(p, cast);
      s = rng.chance(0.5) ? `${k.A}.` : `${k.B}.`;
      why = 'It has one independent clause and no dependent clause, so it is simple.';
    }
  } else if (type === 1) {
    const p = rng.pick(PAIRS);
    const k = clauses(p, cast);
    s = d >= 2 && rng.chance(0.4) ? form.semi(k) : form.conj(p, k);
    why = `It has two independent clauses (“${k.A}” and “${k.b}”) and no dependent clause, so it is compound.`;
  } else if (type === 2) {
    const p = rng.pick(PAIRS.filter((x) => x.sub));
    const k = clauses(p, cast);
    s = p.sub === 'because' && rng.chance(0.4) ? `${k.B} because ${k.a}.` : form.subFirst(p, k);
    why = `It has one independent clause (“${k.b}”) and one dependent clause (“${p.sub} ${k.a}”), so it is complex.`;
  } else {
    const p = rng.pick(PAIRS.filter((x) => x.sub && x.c));
    const k = clauses(p, cast);
    s = `${cap(p.sub!)} ${k.a}, ${k.b}, ${p.cj} ${k.c}.`;
    why = `It has two independent clauses (“${k.b}” and “${k.c}”) and a dependent clause (“${p.sub} ${k.a}”), so it is compound-complex.`;
  }
  return {
    prompt: `What kind of sentence is this?\n\n${block(s)}`,
    parts: [part(fixedChoice(TYPE_CHOICES, type))],
    hints: [
      'Count the independent clauses, then look for a dependent clause: one that begins with a word such as because, although, when or while.',
      'Simple: one independent clause. Compound: two or more independent clauses. Complex: one independent clause and a dependent clause. Compound-complex: two or more independent clauses and a dependent clause.',
    ],
    solution: [why],
  };
}

export const SENTENCE_SKILLS: SkillDef[] = [
  skill({
    id: 'e10-sentence-errors',
    name: 'Fragments, run-ons and comma splices',
    description: 'Tell a complete sentence from a fragment, a run-on (fused) sentence and a comma splice.',
    outcomes: OUTCOMES,
    lessonId: LESSON,
    format: 'mc',
    gen: sentenceErrors,
  }),
  skill({
    id: 'e10-sentence-fixes',
    name: 'Fixing sentence errors',
    description: 'Choose a correct way to fix a comma splice, a run-on or a fragment.',
    outcomes: OUTCOMES,
    lessonId: LESSON,
    format: 'mc',
    gen: sentenceFixes,
  }),
  skill({
    id: 'e10-sentence-types',
    name: 'Simple, compound and complex sentences',
    description: 'Classify a sentence as simple, compound, complex or compound-complex by its clauses.',
    outcomes: OUTCOMES,
    lessonId: LESSON,
    format: 'mc',
    gen: sentenceTypes,
  }),
];
