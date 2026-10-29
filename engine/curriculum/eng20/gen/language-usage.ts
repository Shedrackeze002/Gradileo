/**
 * Grade 11 English, lesson 7.4: Usage and Pronoun Reference (11-G2). Who and whom, lie and lay,
 * fewer and less, between and among, comparisons and good and well, in formal writing; and pronouns
 * whose antecedent is unclear. Fixed exceptions ("less than ten kilometres", "five items or less")
 * are never tested, and singular "they" is never marked wrong: a "they" is only unclear when the
 * reader cannot tell who it means.
 */
import { mc, part, skill, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { block, cap, fill, PEOPLE, people, type Person } from '../../eng10/gen/common.ts';

const LESSON = 'e11-7-4';
const OUTCOMES = ['11-G2'];
const GAP = '\\_\\_\\_\\_\\_';

// ---------------------------------------------------------------------------- usage

type Topic = 'who' | 'lie' | 'fewer' | 'between' | 'compare' | 'well';
interface Gap {
  topic: Topic;
  s: string;
  right: string;
  wrong: string;
  /** Why the right word is right, in this sentence. */
  why: string;
  d: Difficulty;
}
const G = (d: Difficulty, topic: Topic, s: string, right: string, wrong: string, why: string): Gap => ({ d, topic, s, right, wrong, why });

const GAPS: Gap[] = [
  // who and whom
  G(1, 'who', 'To ___ should I address the letter?', 'whom', 'who', 'it is the object of the preposition “to”: “address the letter to him”, so “whom”'),
  G(1, 'who', '___ left the lights on in the science lab?', 'Who', 'Whom', 'it is the subject of “left”: “he left the lights on”, so “who”'),
  G(1, 'who', 'The artist ___ painted the mural is from Accra.', 'who', 'whom', 'it is the subject of “painted”: “she painted the mural”, so “who”'),
  G(2, 'who', 'The scientist ___ we interviewed works at the observatory.', 'whom', 'who', 'it is the object of “interviewed”: “we interviewed her”, so “whom”'),
  G(2, 'who', 'NAME is the student ___ the teachers chose as captain.', 'whom', 'who', 'it is the object of “chose”: “the teachers chose {him}”, so “whom”'),
  G(2, 'who', '___ did you invite to the concert?', 'Whom', 'Who', 'it is the object of “invite”: “you invited him”, so in formal writing “whom”'),
  G(3, 'who', 'Give the prize to ___ finishes the race first.', 'whoever', 'whomever', 'the word is the subject of “finishes” (“she finishes first”), even though the whole clause follows “to”, so “whoever”'),
  G(3, 'who', 'The candidate ___ I think will win is NAME.', 'who', 'whom', '“I think” is an aside; the word is the subject of “will win” (“he will win”), so “who”'),
  G(3, 'who', 'The man ___ I thought was a tourist turned out to be the mayor.', 'who', 'whom', '“I thought” is an aside; the word is the subject of “was” (“he was a tourist”), so “who”'),
  // lie and lay
  G(1, 'lie', 'Every afternoon the cat ___ in the sun on the windowsill.', 'lies', 'lays', '“lie” means to rest or recline and takes no object; the cat is not putting anything down'),
  G(1, 'lie', 'Please ___ the books on the table by the door.', 'lay', 'lie', '“lay” means to put something down and takes an object: lay the books'),
  G(2, 'lie', 'Yesterday NAME ___ down for a nap after lunch.', 'lay', 'laid', 'the past of “lie” (to rest) is “lay”; “laid” is the past of “lay” (to put something down)'),
  G(2, 'lie', 'NAME ___ the map on the table and traced the route.', 'laid', 'lay', 'NAME put the map down, so the verb is “lay”, and its past is “laid”'),
  G(2, 'lie', 'The hens ___ eggs almost every morning.', 'lay', 'lie', 'the hens produce something (eggs), so the verb is “lay”, which takes an object'),
  G(3, 'lie', 'The old letters had ___ in the drawer for decades.', 'lain', 'laid', 'the letters were resting, so the verb is “lie”; its past participle is “lain”'),
  G(3, 'lie', 'After the race, the runners ___ on the grass, too tired to move.', 'lay', 'laid', 'the runners rested; the past of “lie” is “lay”'),
  // fewer and less
  G(1, 'fewer', 'There are ___ students in the class this year.', 'fewer', 'less', 'students can be counted, so “fewer”'),
  G(1, 'fewer', 'We have ___ time than we thought.', 'less', 'fewer', 'time is an amount, not a number of separate things, so “less”'),
  G(1, 'fewer', 'This recipe uses ___ sugar than the old one.', 'less', 'fewer', 'sugar is an amount, not a number of separate things, so “less”'),
  G(2, 'fewer', 'NAME made ___ mistakes on the second test.', 'fewer', 'less', 'mistakes can be counted, so “fewer”'),
  G(2, 'fewer', '___ people came to the concert than last year.', 'Fewer', 'Less', 'people can be counted, so “fewer”'),
  // between and among
  G(1, 'between', 'The prize money was divided ___ the two winners.', 'between', 'among', 'there are two winners, so “between”'),
  G(1, 'between', 'You must choose ___ the red jacket and the blue one.', 'between', 'among', 'the choice is between two things, so “between”'),
  G(2, 'between', 'The rumour spread quickly ___ the students.', 'among', 'between', 'the rumour moved through a whole group, not along a line from one person to another, so “among”'),
  G(2, 'between', 'NAME felt at home ___ {his} new classmates.', 'among', 'between', 'NAME is part of a whole group, so “among”'),
  // comparisons
  G(2, 'compare', 'Of the two sisters, NAME is the ___.', 'taller', 'tallest', 'in formal writing, comparing two uses the comparative “-er” form; “-est” is for three or more'),
  G(1, 'compare', 'This is the ___ book I have ever read.', 'best', 'better', 'the book is compared with every other book, more than two, so the superlative “best”'),
  G(2, 'compare', 'The new bridge is ___ than the old one.', 'stronger', 'more stronger', '“stronger” is already the comparative; adding “more” doubles it'),
  G(3, 'compare', 'NAME runs faster than ___ in {his} class.', 'anyone else', 'anyone', 'NAME is in the class, so “anyone” would include NAME: NAME cannot be faster than {him}self'),
  G(3, 'compare', 'Mount Everest is higher than ___ mountain in the world.', 'any other', 'any', 'Everest is one of the mountains in the world, so it must be compared with “any other” mountain'),
  // good and well
  G(1, 'well', 'NAME played ___ in the final.', 'well', 'good', '“well” describes how NAME played (an adverb); “good” describes nouns'),
  G(2, 'well', 'The soup smells ___.', 'good', 'well', '“smells” here links the soup to a description of it, like “is”, so it takes the adjective “good”'),
  G(2, 'well', 'NAME feels ___ about {his} exam results.', 'good', 'well', '“feels” links NAME to a description of {his} mood, like “is”, so it takes the adjective “good”'),
  G(3, 'well', 'The new players fit in ___ with the rest of the team.', 'well', 'good', '“well” describes how they fit in (an adverb)'),
];

const TOPIC_HINT: Record<Topic, string> = {
  who: 'Replace the word with “he” or “him”. If “he” fits, use “who”; if “him” fits, use “whom”. Look only at the clause the word belongs to.',
  lie: '“Lie” (lay, lain) means to rest and takes no object. “Lay” (laid, laid) means to put something down and needs an object.',
  fewer: 'Use “fewer” for things you can count one by one, and “less” for amounts.',
  between: 'Use “between” for two people or things, or for separate, named choices; use “among” for a whole group.',
  compare: 'Compare two with “-er” or “more”; three or more with “-est” or “most”. When something is compared with its own group, add “else” or “other”.',
  well: '“Good” is an adjective and describes a noun. “Well” is an adverb and describes how something is done. After verbs such as “is”, “seems”, “smells” or “feels”, use the adjective.',
};

function usage(rng: Rng, d: Difficulty): GenOutput {
  const cast = people(rng, 1);
  const f = (s: string) => fill(s, cast);
  if (d === 3 && rng.chance(0.5)) {
    // Which sentence is correct? One sentence filled correctly, three filled wrongly, all different topics.
    const topics = rng.shuffle<Topic>(['who', 'lie', 'fewer', 'between', 'compare', 'well']).slice(0, 4);
    const items = topics.map((t) => rng.pick(GAPS.filter((g) => g.topic === t)));
    const correct = f(items[0].s.replace('___', items[0].right));
    const wrongs = items.slice(1).map((g) => f(g.s.replace('___', g.wrong)));
    return {
      prompt: 'Which sentence is correct **in formal writing**?',
      parts: [part(mc(rng, correct, wrongs))],
      hints: ['Check who and whom, lie and lay, fewer and less, between and among, comparisons, and good and well.'],
      solution: [`“${correct}” is correct: ${f(items[0].why)}.`, `In “${wrongs[0]}”, the word should be “${items[1].right}”: ${f(items[1].why)}.`],
    };
  }
  const g = rng.pick(GAPS.filter((x) => x.d === d || (d === 3 && x.d === 2)));
  return {
    prompt: `Which word completes the sentence correctly **in formal writing**?\n\n${block(f(g.s.replace('___', GAP)))}`,
    parts: [part(mc(rng, g.right, [g.wrong]))],
    hints: [TOPIC_HINT[g.topic]],
    solution: [`“${g.right}”: ${f(g.why)}.`, `So the sentence is: ${f(g.s.replace('___', `**${g.right}**`))}`],
  };
}

// ---------------------------------------------------------------------------- pronoun reference

/** Two different people who share pronouns, so "he" or "she" could mean either. */
function samePair(rng: Rng): Person[] {
  const a = rng.pick(PEOPLE);
  const b = rng.pick(PEOPLE.filter((p) => p.he === a.he && p.name !== a.name));
  return [a, b];
}

interface Ref {
  /** The sentence with the unclear pronoun. */
  bad: string;
  /** The unclear word itself, as it appears. */
  word: string;
  /** Other words in the sentence, as wrong answers to "which word is unclear?". */
  others: string[];
  /** Why the word is unclear. */
  why: string;
  /** What the writer means, for the revision question. */
  means: string;
  /** A clear revision. */
  fix: string;
  /** Revisions that are still unclear or wrong, and why. */
  wrong: Array<[string, string]>;
}

const REFS: Ref[] = [
  {
    bad: 'NAME told NAME2 that {he} had won the prize.',
    word: '{he}',
    others: ['NAME2', 'the prize', 'that'],
    why: '“{he}” could mean NAME or NAME2',
    means: 'NAME2 won the prize',
    fix: 'NAME said to NAME2, “You have won the prize.”',
    wrong: [
      ['NAME told NAME2 that they had won the prize.', '“they” could mean either of them, or both'],
      ['NAME told NAME2 that {he} had finally won the prize.', '“{he}” could still mean either person'],
      ['NAME2 told NAME that {he} had won the prize.', 'it swaps who spoke, and “{he}” is still unclear'],
    ],
  },
  {
    bad: 'When NAME met NAME2 at the station, {he} was carrying a huge suitcase.',
    word: '{he}',
    others: ['NAME2', 'the station', 'a huge suitcase'],
    why: '“{he}” could mean NAME or NAME2',
    means: 'NAME2 was carrying the suitcase',
    fix: 'When NAME met NAME2 at the station, NAME2 was carrying a huge suitcase.',
    wrong: [
      ['When NAME met NAME2 at the station, they were carrying a huge suitcase.', '“they” could mean either of them, or both'],
      ['NAME met NAME2 at the station, and {he} was carrying a huge suitcase.', '“{he}” could still mean either person'],
      ['When {he} met NAME2 at the station, NAME was carrying a huge suitcase.', 'it now says NAME carried the suitcase, and the opening “{he}” has no clear antecedent'],
    ],
  },
  {
    bad: 'When the glass hit the table, it broke.',
    word: 'it',
    others: ['glass', 'table', 'When'],
    why: '“it” could mean the glass or the table',
    means: 'the glass broke',
    fix: 'The glass broke when it hit the table.',
    wrong: [
      ['When the glass hit the table, it smashed.', '“it” could still mean the glass or the table'],
      ['It broke when the glass hit the table.', '“It” comes before anything it could refer to'],
      ['When the glass hit the table, they broke.', '“they” now suggests that both broke'],
    ],
  },
  {
    bad: 'In the newspaper, it says that the bridge will close next week.',
    word: 'it',
    others: ['newspaper', 'bridge', 'week'],
    why: '“it” has no antecedent: the sentence never names what “it” is',
    means: 'the newspaper reports the closure',
    fix: 'The newspaper reports that the bridge will close next week.',
    wrong: [
      ['In the newspaper, they say that the bridge will close next week.', '“they” has no antecedent: who are “they”?'],
      ['It says in the newspaper that the bridge will close next week.', '“It” still has no antecedent'],
      ['In the newspaper, this says that the bridge will close next week.', '“this” has no antecedent either'],
    ],
  },
  {
    bad: 'At the clinic, they told me to wait for an hour.',
    word: 'they',
    others: ['clinic', 'me', 'hour'],
    why: '“they” has no antecedent: the sentence never says who told the writer',
    means: 'a nurse gave the instruction',
    fix: 'At the clinic, the nurse told me to wait for an hour.',
    wrong: [
      ['At the clinic, they said I should wait for an hour.', '“they” still has no antecedent'],
      ['At the clinic, it told me to wait for an hour.', '“it” has no antecedent, and a clinic cannot speak'],
      ['They told me at the clinic to wait for an hour.', '“They” still has no antecedent'],
    ],
  },
  {
    bad: 'The council cut three bus routes and raised fares. This angered many residents.',
    word: 'This',
    others: ['council', 'fares', 'residents'],
    why: '“This” points at no single noun: was it the cuts, the fares, or both?',
    means: 'both changes angered residents',
    fix: 'The council cut three bus routes and raised fares. These changes angered many residents.',
    wrong: [
      ['The council cut three bus routes and raised fares. It angered many residents.', '“It” is just as vague as “This”'],
      ['The council cut three bus routes and raised fares. That angered many residents.', '“That” is just as vague as “This”'],
      ['The council cut three bus routes and raised fares. They angered many residents.', '“They” could mean the council or the changes'],
    ],
  },
  {
    bad: 'Take the cake out of the tin when it is cool.',
    word: 'it',
    others: ['cake', 'tin', 'cool'],
    why: '“it” could mean the cake or the tin',
    means: 'the cake must cool first',
    fix: 'When the cake is cool, take it out of the tin.',
    wrong: [
      ['Take it out of the tin when the cake is cool.', '“it” comes before anything it could refer to'],
      ['Take the cake out of the tin when they are cool.', '“they” now suggests that both must cool'],
      ['Take the cake out of the tin when it has cooled.', '“it” could still mean the cake or the tin'],
    ],
  },
  {
    bad: 'NAME’s mother called NAME2’s mother, and she agreed to drive the children to the match.',
    word: 'she',
    others: ['mother', 'children', 'match'],
    why: '“she” could mean either mother',
    means: 'NAME2’s mother agreed to drive',
    fix: 'NAME’s mother called NAME2’s mother, who agreed to drive the children to the match.',
    wrong: [
      ['NAME’s mother called NAME2’s mother, and they agreed to drive the children to the match.', '“they” now suggests that both mothers will drive'],
      ['NAME’s mother called NAME2’s mother, and she said she would drive the children to the match.', 'both uses of “she” could still mean either mother'],
      ['She called NAME2’s mother, and NAME’s mother agreed to drive the children to the match.', 'it now says NAME’s mother agreed to drive, and the opening “She” has no antecedent'],
    ],
  },
];

/** End a sentence with a period unless it already ends with a question mark. */
const end = (s: string) => (/[?!.]$/.test(s) ? s : `${s}.`);

function pronounReference(rng: Rng, d: Difficulty): GenOutput {
  const cast = samePair(rng);
  const f = (s: string) => fill(s, cast);
  const hint = 'A pronoun must point clearly to one noun, its antecedent. If it could mean two things, or nothing at all, name the noun instead or rebuild the sentence.';
  if (d === 1) {
    const r = rng.pick(REFS);
    const word = f(r.word);
    return {
      prompt: `Which word in this sentence has an unclear antecedent?\n\n${block(f(r.bad))}`,
      parts: [part(mc(rng, `“${word}”`, r.others.map((o) => `“${f(o)}”`)))],
      hints: [hint],
      solution: [end(cap(f(r.why)))],
    };
  }
  if (d === 2) {
    const r = rng.pick(REFS);
    const wrongs = rng.shuffle(r.wrong).slice(0, 3);
    return {
      prompt: `The writer means that ${f(r.means)}.\n\n${block(f(r.bad))}\n\nWhich revision makes the meaning clear?`,
      parts: [part(mc(rng, f(r.fix), wrongs.map((w) => f(w[0]))))],
      hints: [hint],
      solution: [end(`In the original, ${f(r.why)}`), `“${f(r.fix)}” is clear. In “${f(wrongs[0][0])}”, ${end(f(wrongs[0][1]))}`],
    };
  }
  // Difficulty 3: which sentence is clear?
  const [right, ...others] = rng.shuffle(REFS).slice(0, 4);
  return {
    prompt: 'Which sentence has **clear** pronoun reference?',
    parts: [part(mc(rng, f(right.fix), others.map((o) => f(o.bad))))],
    hints: [hint],
    solution: [`“${f(right.fix)}” is clear: the reader can tell exactly who or what each word refers to.`, end(`In “${f(others[0].bad)}”, ${f(others[0].why)}`)],
  };
}

export const USAGE_SKILLS: SkillDef[] = [
  skill({
    id: 'e11-usage',
    name: 'Usage in formal writing',
    description: 'Choose standard usage in formal writing: who and whom, lie and lay, fewer and less, between and among, comparisons, and good and well.',
    outcomes: OUTCOMES,
    lessonId: LESSON,
    format: 'mc',
    gen: usage,
  }),
  skill({
    id: 'e11-pronoun-reference',
    name: 'Clear pronoun reference',
    description: 'Find pronouns with vague or ambiguous antecedents and revise the sentence so each pronoun points clearly to one noun.',
    outcomes: OUTCOMES,
    lessonId: LESSON,
    format: 'mc',
    gen: pronounReference,
  }),
];
