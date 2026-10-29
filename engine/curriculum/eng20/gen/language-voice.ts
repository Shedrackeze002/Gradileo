/**
 * Grade 11 English, lesson 7.3: Voice and Mood (11-G2). Active and passive voice, built from a bank
 * of actions so that a sentence and its rewrites always match, and the subjunctive mood. "If I was"
 * and "as if he was" are common in speech, so subjunctive questions ask what formal writing uses,
 * and "should" with the mandative ("insisted that he should be") is never offered as wrong.
 */
import { fixedChoice, mc, part, skill, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { block, cap, fill, people } from '../../eng10/gen/common.ts';

const LESSON = 'e11-7-3';
const OUTCOMES = ['11-G2'];
const GAP = '\\_\\_\\_\\_\\_';

// ---------------------------------------------------------------------------- active and passive

interface Verb {
  base: string;
  s: string;
  past: string;
  pp: string;
  ing: string;
}
const V = (base: string, s: string, past: string, pp: string, ing: string): Verb => ({ base, s, past, pp, ing });

interface Action {
  agent: string;
  agentPlural: boolean;
  verb: Verb;
  obj: string;
  objPlural: boolean;
}
const A = (agent: string, agentPlural: boolean, verb: Verb, obj: string, objPlural = false): Action => ({ agent, agentPlural, verb, obj, objPlural });

const PAINT = V('paint', 'paints', 'painted', 'painted', 'painting');
const PLANT = V('plant', 'plants', 'planted', 'planted', 'planting');
const COOK = V('cook', 'cooks', 'cooked', 'cooked', 'cooking');
const CHOOSE = V('choose', 'chooses', 'chose', 'chosen', 'choosing');
const BUILD = V('build', 'builds', 'built', 'built', 'building');
const WRITE = V('write', 'writes', 'wrote', 'written', 'writing');
const CATCH = V('catch', 'catches', 'caught', 'caught', 'catching');
const REPAIR = V('repair', 'repairs', 'repaired', 'repaired', 'repairing');
const BAKE = V('bake', 'bakes', 'baked', 'baked', 'baking');
const DESIGN = V('design', 'designs', 'designed', 'designed', 'designing');
const SING = V('sing', 'sings', 'sang', 'sung', 'singing');
const CLEAN = V('clean', 'cleans', 'cleaned', 'cleaned', 'cleaning');
const FIND = V('find', 'finds', 'found', 'found', 'finding');
const SCORE = V('score', 'scores', 'scored', 'scored', 'scoring');
const DELIVER = V('deliver', 'delivers', 'delivered', 'delivered', 'delivering');
const DRAW = V('draw', 'draws', 'drew', 'drawn', 'drawing');
const TAKE = V('take', 'takes', 'took', 'taken', 'taking');
const GIVE = V('give', 'gives', 'gave', 'given', 'giving');

const ACTIONS: Action[] = [
  A('NAME', false, PAINT, 'the mural in the school hall'),
  A('the students', true, PLANT, 'the trees along the river', true),
  A('the chef', false, COOK, 'the meal'),
  A('the judges', true, CHOOSE, 'the winning design'),
  A('the builders', true, BUILD, 'the new footbridge'),
  A('NAME', false, WRITE, 'the poem on the board'),
  A('the goalkeeper', false, CATCH, 'the ball'),
  A('the city engineers', true, REPAIR, 'the broken water main'),
  A('NAME’s grandmother', false, BAKE, 'the wedding cake'),
  A('a local artist', false, DESIGN, 'the new stamps', true),
  A('the soloist', false, SING, 'the final song'),
  A('the volunteers', true, CLEAN, 'the beach'),
  A('a passing cyclist', false, FIND, 'the lost wallet'),
  A('the striker', false, SCORE, 'the winning goal'),
  A('a delivery driver', false, DELIVER, 'the parcels', true),
  A('NAME', false, DRAW, 'the map of the island'),
  A('the photographer', false, TAKE, 'the team photos', true),
  A('the head teacher', false, GIVE, 'the prizes', true),
];

const be = (plural: boolean) => (plural ? 'were' : 'was');
const hasHave = (plural: boolean) => (plural ? 'have' : 'has');

/** A sentence in a given form. */
function form(a: Action, kind: 'activePast' | 'passivePast' | 'passiveNoAgent' | 'activeProgressive' | 'passivePerfect' | 'passiveFuture' | 'activePresent'): string {
  const { agent, verb: v, obj } = a;
  switch (kind) {
    case 'activePast':
      return `${cap(agent)} ${v.past} ${obj}.`;
    case 'activePresent':
      return `${cap(agent)} ${a.agentPlural ? v.base : v.s} ${obj}.`;
    case 'activeProgressive':
      return `${cap(agent)} ${be(a.agentPlural)} ${v.ing} ${obj}.`;
    case 'passivePast':
      return `${cap(obj)} ${be(a.objPlural)} ${v.pp} by ${agent}.`;
    case 'passiveNoAgent':
      return `${cap(obj)} ${be(a.objPlural)} ${v.pp} yesterday.`;
    case 'passivePerfect':
      return `${cap(obj)} ${hasHave(a.objPlural)} been ${v.pp} by ${agent}.`;
    case 'passiveFuture':
      return `${cap(obj)} will be ${v.pp} by ${agent}.`;
  }
}

const ACTIVE_FORMS = ['activePast', 'activeProgressive', 'activePresent'] as const;
const PASSIVE_FORMS = ['passivePast', 'passiveNoAgent', 'passivePerfect', 'passiveFuture'] as const;

/** Sentences in the passive and why the writer chose it (difficulty 3). */
type Why = 'unknown' | 'procedure' | 'blame' | 'focus';
const WHY_TEXT: Record<Why, string> = {
  unknown: 'The person who did the action is unknown, or it does not matter who did it',
  procedure: 'In a scientific report, the steps matter more than who carried them out',
  blame: 'It avoids saying who is responsible for something that went wrong',
  focus: 'It keeps attention on what was done and saves the doer for the end, for emphasis',
};
const WHY_ITEMS: Array<{ lead: string; s: string; why: Why }> = [
  { lead: 'A police report about a theft:', s: 'The bicycle was taken from outside the library sometime during the night.', why: 'unknown' },
  { lead: 'A notice at a museum:', s: 'The temple was built more than two thousand years ago.', why: 'unknown' },
  { lead: 'A news report about damage in a city park:', s: 'Two benches and the old fountain were damaged overnight.', why: 'unknown' },
  { lead: 'From a student’s chemistry report:', s: 'The solution was heated to 80 °C and stirred for five minutes.', why: 'procedure' },
  { lead: 'From the method section of a biology report:', s: 'Each seedling was measured every morning for two weeks.', why: 'procedure' },
  { lead: 'From a physics lab report:', s: 'The ball was dropped from a height of two metres, and its bounce was recorded.', why: 'procedure' },
  { lead: 'A company’s statement after its delivery app failed:', s: 'Mistakes were made, and some orders were lost.', why: 'blame' },
  { lead: 'A school letter to parents after the trip was cancelled:', s: 'The bus booking was not confirmed in time.', why: 'blame' },
  { lead: 'A sports report about a surprising winner:', s: 'The final was won by a fifteen-year-old who had never played in a stadium before.', why: 'focus' },
  { lead: 'A review of an exhibition:', s: 'The most striking painting in the show was made by a self-taught artist from a small fishing village.', why: 'focus' },
];

function activePassive(rng: Rng, d: Difficulty): GenOutput {
  const cast = people(rng, 1);
  const f = (s: string) => fill(s, cast);
  if (d === 3 && rng.chance(0.6)) {
    const it = rng.pick(WHY_ITEMS);
    const order: Why[] = ['unknown', 'procedure', 'blame', 'focus'];
    return {
      prompt: `${it.lead}\n\n${block(it.s)}\n\nWhy does the writer most likely use the passive voice here?`,
      parts: [part(fixedChoice(order.map((w) => WHY_TEXT[w]), order.indexOf(it.why)))],
      hints: ['The passive is the better choice when the doer is unknown or unimportant, in a scientific method, or to put the doer last for emphasis. It can also be used to avoid naming who is to blame.'],
      solution: [`${WHY_TEXT[it.why]}.`, it.why === 'focus' ? 'Here the doer is named, but at the end of the sentence, where the surprise lands.' : it.why === 'blame' ? 'No one is named, although someone must have done it.' : 'Naming the doer would add nothing the reader needs.'],
    };
  }
  const a = rng.pick(ACTIONS);
  if (d === 1 || d === 3) {
    const passive = rng.chance(0.5);
    const kind = passive ? rng.pick(d === 1 ? (['passivePast', 'passiveNoAgent'] as const) : PASSIVE_FORMS) : rng.pick(d === 1 ? (['activePast'] as const) : ACTIVE_FORMS);
    const s = f(form(a, kind));
    const subject = passive ? cap(a.obj) : cap(f(a.agent));
    return {
      prompt: `Is this sentence in the **active** or the **passive** voice?\n\n${block(s)}`,
      parts: [part(fixedChoice(['Active: the subject does the action', 'Passive: the subject receives the action'], passive ? 1 : 0))],
      hints: ['Find the subject, then ask: does the subject do the action, or does something happen to it? A passive verb is a form of “be” followed by a past participle (was painted, has been chosen, will be built).'],
      solution: passive
        ? [`The subject, “${subject}”, receives the action instead of doing it.`, `The verb is a form of “be” with the past participle “${a.verb.pp}”, so the sentence is passive.`]
        : [`The subject, “${subject}”, does the action.`, kind === 'activeProgressive' ? `“${be(a.agentPlural)} ${a.verb.ing}” has a form of “be”, but with an -ing word, not a past participle, so the sentence is still active.` : 'So the sentence is active.'],
    };
  }
  // Difficulty 2: rewrite a passive sentence in the active voice.
  const passive = f(form(a, 'passivePast'));
  const right = f(form(a, 'activePast'));
  const swapped: Action = { ...a, agent: a.obj, obj: a.agent, agentPlural: a.objPlural, objPlural: a.agentPlural };
  const wrongs = [
    [f(form(swapped, 'activePast')), 'it swaps who did what'],
    [f(form(a, 'activePresent')), 'it changes the tense from past to present'],
    [f(form(swapped, 'passivePast')), 'it is still passive, and it swaps who did what'],
  ];
  return {
    prompt: `Which sentence says the same thing in the **active** voice?\n\n${block(passive)}`,
    parts: [part(mc(rng, right, wrongs.map((w) => w[0])))],
    hints: ['Find the doer of the action (after “by”) and make it the subject. Keep the same tense and the same meaning.'],
    solution: [`The doer, “${f(a.agent)}”, becomes the subject: “${right}”`, `“${wrongs[0][0]}” is wrong: ${wrongs[0][1]}.`],
  };
}

// ---------------------------------------------------------------------------- the subjunctive

type Kind = 'were' | 'mandative' | 'past' | 'negative';
interface Gap {
  s: string;
  right: string;
  wrong: string[];
  kind: Kind;
}
const G = (kind: Kind, s: string, right: string, wrong: string[]): Gap => ({ kind, s, right, wrong });

const GAPS: Gap[] = [
  G('were', 'If I ___ taller, I could reach the top shelf.', 'were', ['was', 'am']),
  G('were', 'If NAME ___ the captain, {he} would change the training schedule.', 'were', ['was', 'is']),
  G('were', 'I wish my grandmother ___ here to see this.', 'were', ['was', 'is']),
  G('were', 'NAME wishes that {he} ___ better at chess.', 'were', ['was', 'is']),
  G('were', 'If the museum ___ open on Mondays, we could visit after school.', 'were', ['was', 'is']),
  G('were', 'NAME acts as if {he} ___ in charge of the whole team.', 'were', ['was', 'is']),
  G('were', 'If it ___ not for the bridge, the village would be cut off every winter.', 'were', ['was', 'is']),
  G('were', 'If I ___ you, I would apply for the scholarship.', 'were', ['was', 'am']),
  G('mandative', 'It is essential that every cyclist ___ a helmet.', 'wear', ['wears', 'wore']),
  G('mandative', 'The coach insisted that NAME ___ on time for every practice.', 'be', ['is', 'was']),
  G('mandative', 'The doctor recommended that NAME ___ more water.', 'drink', ['drinks', 'drank']),
  G('mandative', 'I suggest that NAME ___ for the scholarship before Friday.', 'apply', ['applies', 'applied']),
  G('mandative', 'The rules require that each player ___ a signed form.', 'bring', ['brings', 'brought']),
  G('mandative', 'It is important that the report ___ finished by Monday.', 'be', ['is', 'was']),
  G('mandative', 'The teacher asked that every phone ___ switched off during the exam.', 'be', ['is', 'was']),
  G('mandative', 'The judges demanded that the race ___ run again.', 'be', ['is', 'was']),
  G('past', 'If I ___ about the party, I would have come.', 'had known', ['would have known', 'have known']),
  G('past', 'If NAME ___ the early bus, {he} would have arrived on time.', 'had caught', ['would have caught', 'has caught']),
  G('past', 'If we ___ earlier, we would have seen the parade.', 'had left', ['would have left', 'have left']),
  G('past', 'I wish I ___ the tickets when they were cheaper.', 'had bought', ['would have bought', 'have bought']),
  G('negative', 'It is vital that the gate ___ left open.', 'not be', ['is not', 'not is']),
  G('negative', 'The coach insisted that the players ___ late again.', 'not be', ['are not', 'not are']),
  G('negative', 'The doctor recommended that NAME ___ on the injured ankle for a week.', 'not walk', ['does not walk', 'not walks']),
];

const RULE: Record<Kind, string> = {
  were: 'In formal writing, a wish or a condition that is not true (if, wish, as if) takes “were” for every subject: “If I were”, “I wish she were”.',
  mandative: 'After words of demanding, requiring or recommending (insist, suggest, recommend, require, essential that, important that), formal writing uses the base form of the verb for every subject: “that he be”, “that she apply”.',
  past: 'A condition that did not happen in the past takes “had” and a past participle in the “if” part: “If I had known, I would have come.” The “would have” goes in the other part.',
  negative: 'With the subjunctive after “insist”, “recommend” or “vital that”, “not” comes before the base form: “that the gate not be left open”.',
};

const HINT: Record<Kind, string> = {
  were: 'Is the situation real, or only wished for or imagined? Formal writing uses a special form of “be” for an imagined or wished-for situation, the same for every subject.',
  mandative: 'After a word of demanding, requiring or recommending, formal writing uses the plain form of the verb, with no -s ending and no past tense.',
  past: 'The situation did not happen, and it is in the past. Which part of the sentence takes “would have”, and which part takes “had”?',
  negative: 'In the subjunctive, “not” comes straight before the plain form of the verb, with no “do” or “does”.',
};

const fillGap = (g: Gap, word: string) => g.s.replace('___', `**${word}**`);

function subjunctive(rng: Rng, d: Difficulty): GenOutput {
  const cast = people(rng, 1);
  const f = (s: string) => fill(s, cast);
  if (d === 3 && rng.chance(0.5)) {
    // Which sentence is correct? One correct sentence and three errors from other gaps.
    const kinds: Kind[] = ['were', 'mandative', 'past', 'negative'];
    const want = rng.pick(kinds);
    const right = rng.pick(GAPS.filter((g) => g.kind === want));
    // Wrong choices only from errors that hold in every variety of English: "If I was" for a wish or an
    // unreal condition, and "would have" in the "if" part. (British English often accepts "that he
    // wears" after "essential", so a mandative error is never offered as the wrong one here.)
    const pool = rng.shuffle(GAPS.filter((x) => (x.kind === 'were' || x.kind === 'past') && x !== right));
    const wrongs = [pool.find((x) => x.kind === 'were')!, pool.find((x) => x.kind === 'past')!, pool.filter((x) => x.kind === 'were')[1]].map((g) => f(g.s.replace('___', g.wrong[0])));
    const correct = f(right.s.replace('___', right.right));
    return {
      prompt: 'Which sentence is correct **in formal writing**?',
      parts: [part(mc(rng, correct, wrongs))],
      hints: ['Check each verb after “if”, “wish”, “as if” and after words of demanding or recommending. Informal speech often breaks these rules; formal writing does not.'],
      solution: [`“${correct}” is correct. ${RULE[want]}`, `“${wrongs[0]}” needs “were” in formal writing, and “${wrongs[1]}” needs “had” and a past participle for something that did not happen.`],
    };
  }
  const kinds: Kind[] = d === 1 ? ['were'] : d === 2 ? ['mandative', 'were'] : ['past', 'negative', 'mandative'];
  const g = rng.pick(GAPS.filter((x) => kinds.includes(x.kind)));
  const wrong = d === 1 ? g.wrong.slice(0, 1) : g.wrong;
  return {
    prompt: `${g.kind === 'mandative' || g.kind === 'negative' ? 'Which completes the sentence in the **subjunctive mood**, as formal writing uses it?' : 'Which completes the sentence correctly **in formal writing**?'}\n\n${block(f(g.s.replace('___', GAP)))}`,
    parts: [part(mc(rng, g.right, wrong))],
    hints: [HINT[g.kind]],
    solution: [RULE[g.kind], `So the sentence is: ${f(fillGap(g, g.right))}`],
  };
}

export const VOICE_SKILLS: SkillDef[] = [
  skill({
    id: 'e11-active-passive',
    name: 'Active and passive voice',
    description: 'Tell active from passive voice, rewrite a passive sentence in the active, and explain when the passive is the better choice.',
    outcomes: OUTCOMES,
    lessonId: LESSON,
    format: 'mc',
    gen: activePassive,
  }),
  skill({
    id: 'e11-subjunctive',
    name: 'The subjunctive mood',
    description: 'Use the subjunctive in formal writing: “if I were”, “I wish she were”, “insisted that he be” and “if I had known”.',
    outcomes: OUTCOMES,
    lessonId: LESSON,
    format: 'mc',
    gen: subjunctive,
  }),
];
