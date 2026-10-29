/**
 * Grade 12 English, lesson 7.2: Grammar in Context (12-G2). Agreement after "the number" and
 * "a number", in "one of those who" and "the only one of those who", after "there", and with
 * "either … or" and "neither … nor"; parallel structure in long sentences; the place of "only";
 * complete comparisons; and elliptical clauses that dangle. Only points on which international and
 * North American standard English agree are tested; collective nouns, which the varieties treat
 * differently, never appear. In the choose-the-correct-sentence questions every version is the same
 * sentence with one change, and at least one wrong version is as long as the right one.
 */
import { mc, part, skill, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { block, fill, people } from '../../eng10/gen/common.ts';

const LESSON = 'e12-7-2';
const OUTCOMES = ['12-G2'];
const GAP = '\\_\\_\\_\\_\\_';

// ---------------------------------------------------------------------------- choose the word

interface Gap {
  d: Difficulty;
  s: string;
  right: string;
  wrong: string;
  rule: string;
}
const G = (d: Difficulty, s: string, right: string, wrong: string, rule: string): Gap => ({ d, s, right, wrong, rule });

const NUMBER = '“The number of …” is one number, so it takes a singular verb; “a number of …” means “several”, so it takes a plural verb.';
const THERE = 'After “there is” or “there are”, the verb agrees with the subject that follows it.';
const NEAR = 'With “either … or” and “neither … nor”, the verb agrees with the nearer subject, the one after “or” or “nor”.';
const ONE_OF = 'In “one of those … who”, the clause describes the whole group, so its verb is plural; in “the only one of those … who”, it describes the one, so its verb is singular.';

const GAPS: Gap[] = [
  G(1, 'The number of applicants ___ risen every year since the school opened.', 'has', 'have', NUMBER),
  G(1, 'A number of applicants ___ withdrawn their names this week.', 'have', 'has', NUMBER),
  G(1, 'The number of students who walk to school ___ fallen since the new road opened.', 'has', 'have', NUMBER),
  G(1, 'A number of trees ___ been planted along the river this spring.', 'have', 'has', NUMBER),
  G(1, 'There ___ several reasons for the delay to the train.', 'are', 'is', THERE),
  G(1, 'There ___ only one reason for the delay to the train.', 'is', 'are', THERE),
  G(1, 'There ___ fewer buses on Sundays than on weekdays.', 'are', 'is', THERE),
  G(1, 'There ___ a strong case for opening the library on Sundays.', 'is', 'are', THERE),
  G(2, 'Neither the teachers nor the principal ___ signed the letter yet.', 'has', 'have', NEAR),
  G(2, 'Either the twins or their father ___ going to drive us to the match.', 'is', 'are', NEAR),
  G(2, 'Neither the captain nor the players ___ ready for the rain.', 'were', 'was', NEAR),
  G(2, 'Either the coach or the parents ___ bringing the oranges at half-time.', 'are', 'is', NEAR),
  G(2, 'NAME is one of those students who ___ always early for class.', 'are', 'is', ONE_OF),
  G(2, 'This is one of the books that ___ changed the way I think.', 'have', 'has', ONE_OF),
  G(2, 'NAME is one of the players who ___ trained all summer.', 'have', 'has', ONE_OF),
  G(3, 'NAME is the only one of the students who ___ always early for class.', 'is', 'are', ONE_OF),
  G(3, 'This is the only one of her novels that ___ been translated into Swahili.', 'has', 'have', ONE_OF),
  G(3, 'Neither NAME nor I ___ going to the concert on Friday.', 'am', 'is', NEAR),
  G(3, 'Either you or NAME ___ responsible for locking the hall tonight.', 'is', 'are', NEAR),
  G(3, 'Neither NAME nor you ___ to blame for the broken window.', 'are', 'is', NEAR),
];

// ---------------------------------------------------------------------------- choose the sentence

type Topic = 'parallel' | 'compare' | 'dangling' | 'agree';
const TOPIC_NAME: Record<Topic, string> = {
  parallel: 'Faulty parallel structure',
  compare: 'An incomplete or illogical comparison',
  dangling: 'A dangling elliptical clause',
  agree: 'A verb that does not agree with its subject',
};

interface Fix {
  topic: Topic;
  right: string;
  /** Three versions with one error each; at least one is as long as the right one. */
  wrong: [string, string, string];
  /** The one-error version used to ask what is wrong (difficulty 3). */
  faulty: string;
  why: string;
}
const F = (topic: Topic, right: string, wrong: [string, string, string], faulty: string, why: string): Fix => ({ topic, right, wrong, faulty, why });

const FIXES: Fix[] = [
  F('parallel', 'The committee recommended that the library extend its hours, hire two more staff and buy new computers.',
    ['The committee recommended that the library extend its hours, hire two more staff and that it should buy new computers.', 'The committee recommended that the library extend its hours, the hiring of two more staff and buy new computers.', 'The committee recommended that the library extending its hours, hire two more staff and buy new computers.'],
    'The committee recommended that the library extend its hours, hire two more staff and that it should buy new computers.',
    'The three recommendations should share one form: “extend …, hire … and buy …”.'),
  F('parallel', 'The report found that the river was cleaner, that the fish had returned and that the herons were nesting again.',
    ['The report found that the river was cleaner, that the fish had returned and the return of the herons to their nests.', 'The report found the river being cleaner, that the fish had returned and that the herons were nesting again.', 'The report found that the river was cleaner, that the fish had returned and that the herons was nesting again.'],
    'The report found that the river was cleaner, that the fish had returned and the return of the herons to their nests.',
    'Each finding is a “that” clause; the last one must be a clause too, not a noun phrase.'),
  F('parallel', 'Our coach values not only talent but also hard work.',
    ['Our coach not only values talent but also hard work.', 'Our coach values not only talent but also working very hard.', 'Our coach value not only talent but also hard work.'],
    'Our coach not only values talent but also hard work.',
    'What follows “not only” must match what follows “but also”: two nouns, “talent” and “hard work”.'),
  F('parallel', 'The job involves answering the phone, filing reports and greeting visitors.',
    ['The job involves answering the phone, filing reports and to greet any visitors.', 'The job involves answering the phone, the filing of reports and greeting visitors.', 'The job involve answering the phone, filing reports and greeting visitors.'],
    'The job involves answering the phone, filing reports and to greet any visitors.',
    'All three duties should be “-ing” forms after “involves”: answering, filing and greeting.'),
  F('parallel', 'The scholarship rewards students who work hard, who help others and who lead by example.',
    ['The scholarship rewards students who work hard, who help others and leading by example.', 'The scholarship rewards students who work hard, helping others and who lead by example.', 'The scholarship reward students who work hard, who help others and who lead by example.'],
    'The scholarship rewards students who work hard, who help others and leading by example.',
    'The three qualities are all “who” clauses: who work, who help and who lead.'),
  F('compare', 'The climate of Lagos is warmer than that of Toronto.',
    ['The climate of Lagos is warmer than Toronto.', 'The climate of Lagos is more warmer than that of Toronto.', 'The climate of Lagos are warmer than that of Toronto.'],
    'The climate of Lagos is warmer than Toronto.',
    'Compare a climate with a climate: “than that of Toronto”, not “than Toronto”, a city.'),
  F('compare', 'NAME’s essay was better than anyone else’s in the class.',
    ['NAME’s essay was better than anyone in the class.', 'NAME’s essay was more better than anyone else’s in the class.', 'NAME’s essay were better than anyone else’s in the class.'],
    'NAME’s essay was better than anyone in the class.',
    'Compare an essay with essays (“anyone else’s”), not with the people in the class.'),
  F('compare', 'This year’s harvest is as good as, if not better than, last year’s.',
    ['This year’s harvest is as good, if not better than, last year’s.', 'This year’s harvest is as good as, if not more better than, last year’s.', 'This year’s harvest are as good as, if not better than, last year’s.'],
    'This year’s harvest is as good, if not better than, last year’s.',
    'Each part must be complete on its own: “as good as last year’s” and “better than last year’s”, so the first “as” cannot be dropped.'),
  F('compare', 'The population of Nairobi grew faster than that of any other city in the region.',
    ['The population of Nairobi grew faster than any city in the region.', 'The population of Nairobi grew more faster than that of any other city in the region.', 'The population of Nairobi grow faster than that of any other city in the region.'],
    'The population of Nairobi grew faster than any city in the region.',
    'Compare a population with populations, and with the other cities: “than that of any other city”.'),
  F('dangling', 'While NAME was driving to work, {his} phone rang twice.',
    ['While driving to work, NAME’s phone rang twice.', 'While NAME were driving to work, {his} phone rang twice.', 'While NAME was driving to work, {his} phone rung twice.'],
    'While driving to work, NAME’s phone rang twice.',
    'An elliptical clause such as “While driving” takes its subject from the main clause; here that would be the phone, which was not driving.'),
  F('dangling', 'When NAME was only five, {his} family moved to Nairobi.',
    ['When only five, NAME’s family moved to Nairobi.', 'When NAME were only five, {his} family moved to Nairobi.', 'When NAME was only five, {his} family moving to Nairobi.'],
    'When only five, NAME’s family moved to Nairobi.',
    '“When only five” would describe the family, not NAME; name NAME in the clause.'),
  F('dangling', 'Though tired after the long climb, NAME finished the race.',
    ['Though tired after the long climb, the race was finished by NAME.', 'Though tired after the long climb, NAME finish the race.', 'Though tired after the long climb, NAME were finishing the race.'],
    'Though tired after the long climb, the race was finished by NAME.',
    '“Though tired” must describe the subject of the main clause: NAME, not the race.'),
  F('dangling', 'Once NAME had signed the form, the coach handed {him} the kit.',
    ['Once signed, the coach handed NAME the kit for the season.', 'Once NAME had signed the form, the coach hand {him} the kit.', 'Once NAME had signed the form, the coach handed he the kit.'],
    'Once signed, the coach handed NAME the kit for the season.',
    '“Once signed” would describe the coach; say who signed what.'),
  F('agree', 'The number of entries has doubled since the prize was announced.',
    ['The number of entries have doubled since the prize was announced.', 'The number of entries has doubled since the prize were announced.', 'A number of entries has doubled since the prize was announced.'],
    'The number of entries have doubled since the prize was announced.',
    '“The number” is one number: it “has” doubled.'),
  F('agree', 'Neither the manager nor the players were told about the change.',
    ['Neither the manager nor the players was told about the change.', 'Neither the manager or the players were told about the change.', 'Neither the manager nor the players were telled about the change.'],
    'Neither the manager nor the players was told about the change.',
    'The verb agrees with the nearer subject, “the players”: they “were” told.'),
];

// ---------------------------------------------------------------------------- the place of "only"

interface Only {
  meaning: string;
  right: string;
  /** Versions that clearly mean something else. */
  wrong: [string, string];
}
const ONLY: Only[] = [
  { meaning: 'no one else saw the comet', right: 'Only NAME saw the comet last night.', wrong: ['NAME saw only the comet last night.', 'NAME saw the comet only last night.'] },
  { meaning: 'the comet was the one thing NAME saw', right: 'NAME saw only the comet last night.', wrong: ['Only NAME saw the comet last night.', 'NAME saw the comet only last night.'] },
  { meaning: 'NAME saw the comet as recently as last night', right: 'NAME saw the comet only last night.', wrong: ['Only NAME saw the comet last night.', 'NAME saw only the comet last night.'] },
  { meaning: 'no other student passed the test', right: 'Only NAME passed the history test.', wrong: ['NAME passed only the history test.', 'NAME passed the only history test.'] },
  { meaning: 'the history test was the one test NAME passed', right: 'NAME passed only the history test.', wrong: ['Only NAME passed the history test.', 'NAME passed the only history test.'] },
  { meaning: 'NAME ate two pieces of cake and no more', right: 'NAME ate only two pieces of cake.', wrong: ['Only NAME ate two pieces of cake.', 'NAME ate two pieces of the only cake.'] },
  { meaning: 'the shop opens on Saturdays and on no other day', right: 'The shop opens only on Saturdays.', wrong: ['Only the shop opens on Saturdays.', 'The only shop opens on Saturdays.'] },
];

function advancedGrammar(rng: Rng, d: Difficulty): GenOutput {
  const cast = people(rng, 1);
  const f = (s: string) => fill(s, cast);
  const gapItem = (g: Gap): GenOutput => {
    const s = f(g.s);
    return {
      prompt: `Choose the verb that is correct in formal writing.\n\n${block(s.replace('___', GAP))}`,
      parts: [part(mc(rng, g.right, [g.wrong]))],
      hints: [g.rule],
      solution: [g.rule, `So the sentence is: ${s.replace('___', `**${g.right}**`)}`],
    };
  };
  if (d === 1) return gapItem(rng.pick(GAPS.filter((g) => g.d === 1)));
  if (d === 2) {
    if (rng.chance(0.5)) return gapItem(rng.pick(GAPS.filter((g) => g.d === 2)));
    const fx = rng.pick(FIXES);
    return {
      prompt: 'Which sentence is correct in formal written English?',
      parts: [part(mc(rng, f(fx.right), fx.wrong.map(f)))],
      hints: ['Read each version slowly. Check that the verbs agree with their subjects, that the items in a series match, that comparisons compare like with like, and that each opening phrase describes the subject that follows it.'],
      solution: [`“${f(fx.right)}” is correct.`, f(fx.why)],
    };
  }
  const mode = rng.pick(['gap', 'which', 'only', 'what'] as const);
  if (mode === 'gap') return gapItem(rng.pick(GAPS.filter((g) => g.d === 3)));
  if (mode === 'only') {
    const o = rng.pick(ONLY);
    return {
      prompt: `The writer means that ${f(o.meaning)}. Which sentence says exactly that?`,
      parts: [part(mc(rng, f(o.right), o.wrong.map(f)))],
      hints: ['In careful writing, “only” goes right before the word or phrase it limits.'],
      solution: [`“${f(o.right)}”: “only” sits next to what it limits.`, `Moving “only” changes the meaning: “${f(o.wrong[0])}” and “${f(o.wrong[1])}” say something else.`],
    };
  }
  if (mode === 'what') {
    const fx = rng.pick(FIXES.filter((x) => x.topic !== 'agree'));
    const topics: Topic[] = ['parallel', 'compare', 'dangling', 'agree'];
    return {
      prompt: `What is wrong with this sentence in formal writing?\n\n${block(f(fx.faulty))}`,
      parts: [part(mc(rng, TOPIC_NAME[fx.topic], topics.filter((t) => t !== fx.topic).map((t) => TOPIC_NAME[t])))],
      hints: ['Look at how the parts of the sentence fit together: a series, a comparison, an opening phrase, or a subject and its verb.'],
      solution: [`${TOPIC_NAME[fx.topic]}.`, f(fx.why), `Correct: “${f(fx.right)}”`],
    };
  }
  const fx = rng.pick(FIXES);
  return {
    prompt: 'Which sentence is correct in formal written English?',
    parts: [part(mc(rng, f(fx.right), fx.wrong.map(f)))],
    hints: ['Each version differs from the others in one small way. Find the differences first, then decide which version gets each one right.'],
    solution: [`“${f(fx.right)}” is correct.`, f(fx.why)],
  };
}

export const GRAMMAR_SKILLS: SkillDef[] = [
  skill({
    id: 'e12-advanced-grammar',
    name: 'Grammar in context',
    description: 'Apply advanced agreement, parallel structure, the placement of “only”, complete comparisons and attached elliptical clauses in formal writing.',
    outcomes: OUTCOMES,
    lessonId: LESSON,
    format: 'mc',
    gen: advancedGrammar,
  }),
];
