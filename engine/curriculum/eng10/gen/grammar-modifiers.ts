/**
 * Grade 10 English, lesson 7.4: Modifiers and Parallel Structure (10-G2). Dangling modifiers here
 * always leave out the person doing the action, so "dangling" and "misplaced" never overlap.
 */
import { fixedChoice, mc, part, skill, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { block, fill, people, type Person } from './common.ts';

const LESSON = 'e10-7-4';
const OUTCOMES = ['10-G2'];

// ---------------------------------------------------------------------------- modifiers

interface Mod {
  bad: string;
  type: 'dangling' | 'misplaced';
  /** The modifier and what it seems to describe in the faulty sentence. */
  modifier: string;
  seems: string;
  fix: string;
  /** Revisions that still have the error or change the meaning. */
  wrong: [string, string];
}

const MODS: Mod[] = [
  {
    bad: 'Walking to school in the storm, the umbrella blew inside out.',
    type: 'dangling', modifier: 'Walking to school in the storm', seems: 'the umbrella',
    fix: 'While NAME was walking to school in the storm, {his} umbrella blew inside out.',
    wrong: ['Walking to school in the storm, the umbrella of NAME blew inside out.', 'The umbrella blew inside out, walking to school in the storm.'],
  },
  {
    bad: 'After finishing the essay, the television was switched on.',
    type: 'dangling', modifier: 'After finishing the essay', seems: 'the television',
    fix: 'After finishing the essay, NAME switched on the television.',
    wrong: ['After finishing the essay, the television was switched on by NAME.', 'The television was switched on after finishing the essay.'],
  },
  {
    bad: 'Hoping to win the race, the training began at dawn every day.',
    type: 'dangling', modifier: 'Hoping to win the race', seems: 'the training',
    fix: 'Hoping to win the race, NAME began training at dawn every day.',
    wrong: ['Hoping to win the race, NAME’s training began at dawn every day.', 'The training began at dawn every day, hoping to win the race.'],
  },
  {
    bad: 'To catch the early train, the alarm was set for five o’clock.',
    type: 'dangling', modifier: 'To catch the early train', seems: 'the alarm',
    fix: 'To catch the early train, NAME set the alarm for five o’clock.',
    wrong: ['To catch the early train, the alarm was set by NAME for five o’clock.', 'To catch the early train, NAME’s alarm was set for five o’clock.'],
  },
  {
    bad: 'While cooking dinner, the smoke alarm went off.',
    type: 'dangling', modifier: 'While cooking dinner', seems: 'the smoke alarm',
    fix: 'While NAME was cooking dinner, the smoke alarm went off.',
    wrong: ['While cooking dinner, the smoke alarm went off in NAME’s kitchen.', 'The smoke alarm went off while cooking dinner.'],
  },
  {
    bad: 'Exhausted after the match, the bus ride home was silent.',
    type: 'dangling', modifier: 'Exhausted after the match', seems: 'the bus ride',
    fix: 'Exhausted after the match, the players rode home in silence.',
    wrong: ['Exhausted after the match, the bus ride home was silent for the players.', 'The bus ride home was silent, exhausted after the match.'],
  },
  {
    bad: 'Having lost the map, the forest seemed endless.',
    type: 'dangling', modifier: 'Having lost the map', seems: 'the forest',
    fix: 'Having lost the map, the hikers felt that the forest was endless.',
    wrong: ['Having lost the map, the forest seemed endless to the hikers.', 'The forest seemed endless, having lost the map.'],
  },
  {
    bad: 'NAME bought a bicycle from a man at the market with a broken bell.',
    type: 'misplaced', modifier: 'with a broken bell', seems: 'the man (or the market)',
    fix: 'NAME bought a bicycle with a broken bell from a man at the market.',
    wrong: ['With a broken bell, NAME bought a bicycle from a man at the market.', 'NAME, with a broken bell, bought a bicycle from a man at the market.'],
  },
  {
    bad: 'The waiter brought a cake to the table covered in candles.',
    type: 'misplaced', modifier: 'covered in candles', seems: 'the table',
    fix: 'The waiter brought a cake covered in candles to the table.',
    wrong: ['Covered in candles, the waiter brought a cake to the table.', 'The waiter, covered in candles, brought a cake to the table.'],
  },
  {
    bad: 'NAME found a wallet walking home from the market.',
    type: 'misplaced', modifier: 'walking home from the market', seems: 'the wallet',
    fix: 'Walking home from the market, NAME found a wallet.',
    wrong: ['A wallet walking home from the market was found by NAME.', 'NAME found a wallet that was walking home from the market.'],
  },
  {
    bad: 'NAME gave the puppy to {his} cousin wrapped in a blanket.',
    type: 'misplaced', modifier: 'wrapped in a blanket', seems: 'the cousin',
    fix: 'NAME gave the puppy, wrapped in a blanket, to {his} cousin.',
    wrong: ['Wrapped in a blanket, NAME gave the puppy to {his} cousin.', 'NAME gave the puppy to {his} cousin, who was wrapped in a blanket.'],
  },
  {
    bad: 'We saw a herd of elephants driving through the national park.',
    type: 'misplaced', modifier: 'driving through the national park', seems: 'the elephants',
    fix: 'Driving through the national park, we saw a herd of elephants.',
    wrong: ['A herd of elephants driving through the national park was seen by us.', 'We saw a herd of elephants that were driving through the national park.'],
  },
  {
    bad: 'NAME almost ate the whole pizza.',
    type: 'misplaced', modifier: 'almost', seems: 'the verb “ate”, so it sounds as if NAME nearly ate the pizza but did not',
    fix: 'NAME ate almost the whole pizza.',
    wrong: ['Almost NAME ate the whole pizza.', 'NAME ate the whole pizza almost.'],
  },
  {
    bad: 'The teacher handed out the tests to the students marked in red pen.',
    type: 'misplaced', modifier: 'marked in red pen', seems: 'the students',
    fix: 'The teacher handed the students the tests marked in red pen.',
    wrong: ['Marked in red pen, the teacher handed out the tests to the students.', 'The teacher, marked in red pen, handed out the tests to the students.'],
  },
  {
    bad: 'NAME saw a fox on the way to school with a bushy tail.',
    type: 'misplaced', modifier: 'with a bushy tail', seems: 'the school',
    fix: 'On the way to school, NAME saw a fox with a bushy tail.',
    wrong: ['With a bushy tail, NAME saw a fox on the way to school.', 'NAME, with a bushy tail, saw a fox on the way to school.'],
  },
];

const MOD_CHOICES = ['A dangling modifier', 'A misplaced modifier', 'No modifier error'];
const MOD_DEF = {
  dangling: 'A dangling modifier describes someone who is not in the sentence at all: the person doing the action is missing.',
  misplaced: 'A misplaced modifier is too far from the word it describes, so it seems to describe something else.',
};

function modifiers(rng: Rng, d: Difficulty): GenOutput {
  const cast = people(rng, 2);
  const f = (s: string) => fill(s, cast);
  const hints = [
    'For each describing phrase, ask: who or what is it describing, and is that person or thing right next to it?',
    'An opening phrase such as “Walking home, …” describes the subject that comes straight after the comma.',
  ];
  if (d === 1) {
    const [m, ...others] = rng.sample(MODS, 4);
    return {
      prompt: 'Which sentence has a dangling or misplaced modifier?',
      parts: [part(mc(rng, f(m.bad), others.map((o) => f(o.fix))))],
      hints,
      solution: [
        `In “${f(m.bad)}”, the phrase “${m.modifier}” seems to describe ${f(m.seems)}. ${MOD_DEF[m.type]}`,
        `A clear version: “${f(m.fix)}”`,
      ],
    };
  }
  const m = rng.pick(MODS);
  if (d === 2) {
    return {
      prompt: `This sentence has a modifier error:\n\n${block(f(m.bad))}\n\nWhich revision fixes it so that the sentence says what the writer means?`,
      parts: [part(mc(rng, f(m.fix), m.wrong.map(f)))],
      hints,
      solution: [
        `“${m.modifier}” should describe the right person or thing, but here it seems to describe ${f(m.seems)}.`,
        `“${f(m.fix)}” puts it right. In “${f(m.wrong[0])}”, the modifier still describes the wrong thing.`,
      ],
    };
  }
  // Difficulty 3: name the error, or see that there is none.
  const none = rng.chance(0.3);
  const s = none ? f(m.fix) : f(m.bad);
  const idx = none ? 2 : m.type === 'dangling' ? 0 : 1;
  return {
    prompt: `What, if anything, is wrong with this sentence?\n\n${block(s)}`,
    parts: [part(fixedChoice(MOD_CHOICES, idx))],
    hints: [hints[0], 'If the person or thing being described is missing from the sentence, the modifier is dangling; if it is there but the modifier is in the wrong place, it is misplaced.'],
    solution: none
      ? ['Every describing phrase sits next to the word it describes, so there is no modifier error.']
      : [`“${m.modifier}” seems to describe ${f(m.seems)}. ${MOD_DEF[m.type]}`, `A clear version: “${f(m.fix)}”`],
  };
}

// ---------------------------------------------------------------------------- parallel structure

/** Activities as a gerund phrase and a base verb phrase. */
const ACTIVITIES: Array<[string, string]> = [
  ['hiking in the hills', 'hike in the hills'],
  ['swimming in the lake', 'swim in the lake'],
  ['reading mystery novels', 'read mystery novels'],
  ['playing chess', 'play chess'],
  ['baking bread', 'bake bread'],
  ['painting landscapes', 'paint landscapes'],
  ['learning new languages', 'learn new languages'],
  ['writing short stories', 'write short stories'],
  ['fixing old radios', 'fix old radios'],
  ['playing the guitar', 'play the guitar'],
  ['cooking for friends', 'cook for friends'],
  ['watching old films', 'watch old films'],
  ['visiting museums', 'visit museums'],
  ['growing vegetables', 'grow vegetables'],
];

const PARALLEL_BANK: Array<{ level: 2 | 3; correct: string; wrong: string[]; why: string }> = [
  {
    level: 2, correct: 'The job requires patience, honesty and hard work.',
    wrong: ['The job requires patience, honesty and that you work hard.', 'The job requires patience, being honest and hard work.', 'The job requires being patient, honesty and to work hard.'],
    why: 'All three items are nouns: patience, honesty and hard work.',
  },
  {
    level: 2, correct: 'The new library is bright, quiet and spacious.',
    wrong: ['The new library is bright, quiet and has a lot of space.', 'The new library is bright, has quiet rooms and spacious.', 'The new library is bright, quietly and spacious.'],
    why: 'All three items are adjectives describing the library: bright, quiet and spacious.',
  },
  {
    level: 2, correct: 'It is better to arrive early than to rush at the last minute.',
    wrong: ['It is better to arrive early than rushing at the last minute.', 'Arriving early is better than to rush at the last minute.', 'It is better arriving early than to rush at the last minute.'],
    why: 'The two things compared have the same form: “to arrive” and “to rush”.',
  },
  {
    level: 2, correct: 'NAME would rather walk to school than take the bus.',
    wrong: ['NAME would rather walk to school than taking the bus.', 'NAME would rather walking to school than take the bus.', 'NAME would rather walk to school than to be taking the bus.'],
    why: 'The two choices compared have the same form: “walk” and “take”.',
  },
  {
    level: 2, correct: 'The coach told us to stretch, to drink water and to rest before the game.',
    wrong: ['The coach told us to stretch, drinking water and to rest before the game.', 'The coach told us to stretch, to drink water and that we should rest before the game.', 'The coach told us stretching, to drink water and rest before the game.'],
    why: 'All three instructions have the same form: to stretch, to drink and to rest.',
  },
  {
    level: 2, correct: 'Volunteers cleaned the beach, painted the benches and planted trees.',
    wrong: ['Volunteers cleaned the beach, painted the benches and were planting trees.', 'Volunteers cleaned the beach, painting the benches and planted trees.', 'Volunteers cleaning the beach, painted the benches and to plant trees.'],
    why: 'All three actions are past-tense verbs: cleaned, painted and planted.',
  },
  {
    level: 2, correct: 'NAME spoke clearly, confidently and briefly.',
    wrong: ['NAME spoke clearly, confidently and in a brief way.', 'NAME spoke clearly, with confidence and briefly.', 'NAME spoke clear, confidently and briefly.'],
    why: 'All three words are adverbs describing how NAME spoke: clearly, confidently and briefly.',
  },
  {
    level: 3, correct: 'NAME is not only a talented singer but also a gifted songwriter.',
    wrong: ['NAME is not only a talented singer but also writes songs.', 'NAME not only is a talented singer but also a gifted songwriter.', 'NAME is not only a talented singer, but also {he} writes gifted songs.'],
    why: 'The words after “not only” and after “but also” have the same form: “a talented singer” and “a gifted songwriter”.',
  },
  {
    level: 3, correct: 'We can either leave now or wait until the rain stops.',
    wrong: ['We can either leave now or waiting until the rain stops.', 'Either we can leave now or wait until the rain stops.', 'We can either leave now or we wait until the rain stops.'],
    why: 'The words after “either” and after “or” have the same form: “leave now” and “wait until the rain stops”.',
  },
  {
    level: 3, correct: 'The prize goes to whoever is both fast and accurate.',
    wrong: ['The prize goes to whoever is both fast and has accuracy.', 'The prize goes to whoever is both fast and accurately.', 'The prize goes to whoever is both being fast and accurate.'],
    why: 'The words after “both” and after “and” are both adjectives: “fast” and “accurate”.',
  },
  {
    level: 3, correct: 'NAME wants to study either medicine or law.',
    wrong: ['NAME wants to study either medicine or to become a lawyer.', 'NAME either wants to study medicine or law.', 'NAME wants to study either medicine or studying law.'],
    why: 'The words after “either” and after “or” are both nouns: “medicine” and “law”.',
  },
  {
    level: 3, correct: 'The film was neither funny nor exciting.',
    wrong: ['The film was neither funny nor did it excite anyone.', 'The film was neither funny nor excitement.', 'The film neither was funny nor exciting.'],
    why: 'The words after “neither” and after “nor” are both adjectives: “funny” and “exciting”.',
  },
  {
    level: 3, correct: 'NAME enjoys both cooking and eating.',
    wrong: ['NAME enjoys both cooking and to eat.', 'NAME enjoys both to cook and eating.', 'NAME both enjoys cooking and eating.'],
    why: 'The words after “both” and after “and” are both gerunds: “cooking” and “eating”.',
  },
];

/** A sentence listing three activities with one of them, optionally, in the wrong form. */
function activityList(rng: Rng, cast: Person[]) {
  const acts = rng.sample(ACTIVITIES, 3);
  const gerund = rng.chance(0.5);
  const p = cast[0];
  const frame = gerund
    ? (items: string[]) => `In ${p.his} free time, ${p.name} enjoys ${items[0]}, ${items[1]} and ${items[2]}.`
    : (items: string[]) => `This summer, ${p.name} plans to ${items[0]}, ${items[1]} and ${items[2]}.`;
  const right = acts.map(([g, b]) => (gerund ? g : b));
  const broken = (i: number) => right.map((r, j) => (j === i ? (gerund ? `to ${acts[j][1]}` : acts[j][0]) : r));
  return {
    correct: frame(right),
    wrong: [0, 1, 2].map((i) => frame(broken(i))),
    why: gerund ? 'After “enjoys”, every activity is a gerund (an -ing form).' : 'After “plans to”, every activity is a base verb sharing the one “to”.',
  };
}

function parallel(rng: Rng, d: Difficulty): GenOutput {
  const cast = people(rng, 2);
  const f = (s: string) => fill(s, cast);
  const item = d === 1 ? activityList(rng, cast) : (() => {
    const b = rng.pick(PARALLEL_BANK.filter((x) => x.level === d));
    return { correct: f(b.correct), wrong: b.wrong.map(f), why: f(b.why) };
  })();
  const askBroken = d >= 2 && rng.chance(0.3);
  if (askBroken) {
    // One faulty sentence among correct ones of the same level.
    const others = rng.sample(PARALLEL_BANK.filter((x) => x.level === d && f(x.correct) !== item.correct), 3).map((x) => f(x.correct));
    const bad = rng.pick(item.wrong);
    return {
      prompt: 'Which sentence is NOT written in parallel form?',
      parts: [part(mc(rng, bad, others))],
      hints: ['In each sentence, find the items in a list or the two parts joined by a pair such as either…or, both…and or not only…but also.', 'Parallel items have the same grammatical form.'],
      solution: [`“${bad}” mixes forms. A parallel version: “${item.correct}” ${item.why}`],
    };
  }
  return {
    prompt: 'Which sentence is written in parallel form?',
    parts: [part(mc(rng, item.correct, item.wrong))],
    hints: ['Find the items in the list, or the parts joined by a pair such as either…or or not only…but also.', 'Parallel items have the same grammatical form: all nouns, all adjectives, all -ing words, all “to” verbs, and so on.'],
    solution: [`“${item.correct}” is parallel. ${item.why}`, `“${item.wrong[0]}” switches to a different form for one item.`],
  };
}

export const MODIFIER_SKILLS: SkillDef[] = [
  skill({
    id: 'e10-modifiers',
    name: 'Dangling and misplaced modifiers',
    description: 'Find and fix modifiers that are dangling (describing someone missing from the sentence) or misplaced (too far from the word they describe).',
    outcomes: OUTCOMES,
    lessonId: LESSON,
    format: 'mc',
    gen: modifiers,
  }),
  skill({
    id: 'e10-parallel',
    name: 'Parallel structure',
    description: 'Write the items in a list, a comparison or a correlative pair in the same grammatical form.',
    outcomes: OUTCOMES,
    lessonId: LESSON,
    format: 'mc',
    gen: parallel,
  }),
];
