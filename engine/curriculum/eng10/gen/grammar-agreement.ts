/**
 * Grade 10 English, lesson 7.3: Agreement (10-G2). Subject–verb agreement, pronoun agreement and
 * case, and consistent verb tense. Collective nouns (where British and North American usage differ)
 * and singular "they" (accepted in both) are never tested.
 */
import { fixedChoice, mc, part, skill, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { block, cap, fill, people } from './common.ts';

const LESSON = 'e10-7-3';
const OUTCOMES = ['10-G2'];
const GAP = '\\_\\_\\_\\_\\_';
const gap = (s: string) => s.replace('___', GAP);

// ---------------------------------------------------------------------------- subject–verb agreement

type Num = 'sg' | 'pl';
type SvKind = 'phrase' | 'and' | 'indefinite' | 'one-of' | 'there' | 'or-nor' | 'along-with' | 'looks-plural';

interface Sv {
  s: string;
  /** Singular and plural verb forms. */
  v: [string, string];
  n: Num;
  /** The word the verb must agree with. */
  head: string;
  kind: SvKind;
}

const SV: Sv[] = [
  { s: 'The box of old photographs ___ on the top shelf.', v: ['sits', 'sit'], n: 'sg', head: 'box', kind: 'phrase' },
  { s: 'The keys to the science lab ___ missing again.', v: ['is', 'are'], n: 'pl', head: 'keys', kind: 'phrase' },
  { s: 'The paint on the old doors ___ starting to peel.', v: ['is', 'are'], n: 'sg', head: 'paint', kind: 'phrase' },
  { s: 'The players on the visiting side ___ arrived early.', v: ['has', 'have'], n: 'pl', head: 'players', kind: 'phrase' },
  { s: 'The list of chores on the fridge ___ longer every week.', v: ['gets', 'get'], n: 'sg', head: 'list', kind: 'phrase' },
  { s: 'The flowers in the window box ___ water every day.', v: ['needs', 'need'], n: 'pl', head: 'flowers', kind: 'phrase' },
  { s: 'A bag of ripe oranges ___ on the kitchen table.', v: ['was', 'were'], n: 'sg', head: 'bag', kind: 'phrase' },
  { s: 'The cost of the concert tickets ___ too high for most students.', v: ['is', 'are'], n: 'sg', head: 'cost', kind: 'phrase' },
  { s: 'The books on the top shelf ___ to NAME.', v: ['belongs', 'belong'], n: 'pl', head: 'books', kind: 'phrase' },
  { s: 'The sound of the drums ___ through the whole building.', v: ['echoes', 'echo'], n: 'sg', head: 'sound', kind: 'phrase' },
  { s: 'The leader of the hikers ___ a map and a compass.', v: ['carries', 'carry'], n: 'sg', head: 'leader', kind: 'phrase' },
  { s: 'The windows in NAME’s bedroom ___ out over the garden.', v: ['looks', 'look'], n: 'pl', head: 'windows', kind: 'phrase' },
  { s: 'NAME and NAME2 ___ in the school orchestra.', v: ['plays', 'play'], n: 'pl', head: 'NAME and NAME2', kind: 'and' },
  { s: 'The teacher and the students ___ planning a trip to the coast.', v: ['is', 'are'], n: 'pl', head: 'the teacher and the students', kind: 'and' },
  { s: 'NAME’s aunt and uncle ___ a bakery near the station.', v: ['runs', 'run'], n: 'pl', head: 'aunt and uncle', kind: 'and' },
  { s: 'Each of the students ___ a locker.', v: ['has', 'have'], n: 'sg', head: 'each', kind: 'indefinite' },
  { s: 'Everyone in the stands ___ the words to the song.', v: ['knows', 'know'], n: 'sg', head: 'everyone', kind: 'indefinite' },
  { s: 'Neither answer ___ correct.', v: ['is', 'are'], n: 'sg', head: 'neither answer', kind: 'indefinite' },
  { s: 'Both of the bridges ___ closed for repairs.', v: ['is', 'are'], n: 'pl', head: 'both', kind: 'indefinite' },
  { s: 'Several of the runners ___ blisters after the race.', v: ['has', 'have'], n: 'pl', head: 'several', kind: 'indefinite' },
  { s: 'Nobody in the class ___ the answer.', v: ['knows', 'know'], n: 'sg', head: 'nobody', kind: 'indefinite' },
  { s: 'Few of the visitors ___ about the hidden garden.', v: ['knows', 'know'], n: 'pl', head: 'few', kind: 'indefinite' },
  { s: 'Every one of the tomatoes ___ ripe.', v: ['is', 'are'], n: 'sg', head: 'every one', kind: 'indefinite' },
  { s: 'One of the windows ___ cracked.', v: ['is', 'are'], n: 'sg', head: 'one', kind: 'one-of' },
  { s: 'One of NAME’s cousins ___ in Mumbai.', v: ['lives', 'live'], n: 'sg', head: 'one', kind: 'one-of' },
  { s: 'One of the songs on the album ___ six minutes long.', v: ['is', 'are'], n: 'sg', head: 'one', kind: 'one-of' },
  { s: 'There ___ three letters on the hall table.', v: ['is', 'are'], n: 'pl', head: 'letters', kind: 'there' },
  { s: 'There ___ a strange noise coming from the engine.', v: ['is', 'are'], n: 'sg', head: 'noise', kind: 'there' },
  { s: 'There ___ two reasons for the delay.', v: ['was', 'were'], n: 'pl', head: 'reasons', kind: 'there' },
  { s: 'Here ___ the photos from the trip.', v: ['is', 'are'], n: 'pl', head: 'photos', kind: 'there' },
  { s: 'Either the coach or the players ___ the equipment.', v: ['carries', 'carry'], n: 'pl', head: 'players', kind: 'or-nor' },
  { s: 'Neither the players nor the coach ___ happy with the result.', v: ['was', 'were'], n: 'sg', head: 'coach', kind: 'or-nor' },
  { s: 'Either NAME or {his} parents ___ picking up the cake.', v: ['is', 'are'], n: 'pl', head: 'parents', kind: 'or-nor' },
  { s: 'Neither the shoes nor the jacket ___ NAME.', v: ['fits', 'fit'], n: 'sg', head: 'jacket', kind: 'or-nor' },
  { s: 'NAME, along with {his} teammates, ___ ready for the final.', v: ['is', 'are'], n: 'sg', head: 'NAME', kind: 'along-with' },
  { s: 'The principal, as well as the teachers, ___ the new timetable.', v: ['supports', 'support'], n: 'sg', head: 'principal', kind: 'along-with' },
  { s: 'The captain, together with the rest of the crew, ___ on deck.', v: ['was', 'were'], n: 'sg', head: 'captain', kind: 'along-with' },
  { s: 'The news from the hospital ___ good.', v: ['is', 'are'], n: 'sg', head: 'news', kind: 'looks-plural' },
  { s: 'Mathematics ___ the subject NAME enjoys most.', v: ['is', 'are'], n: 'sg', head: 'mathematics', kind: 'looks-plural' },
  { s: 'Physics ___ harder than NAME expected.', v: ['was', 'were'], n: 'sg', head: 'physics', kind: 'looks-plural' },
];

const SV_LEVEL: Record<Difficulty, SvKind[]> = {
  1: ['phrase', 'and'],
  2: ['indefinite', 'one-of', 'there', 'phrase'],
  3: ['or-nor', 'along-with', 'looks-plural', 'indefinite'],
};

const SV_WHY: Record<SvKind, string> = {
  phrase: 'A phrase between the subject and the verb does not change the subject: cover it up and match the verb to the main noun.',
  and: 'Two subjects joined by “and” make a plural subject.',
  indefinite: 'Each, every one, everyone, nobody and neither are singular; both, few, many and several are plural.',
  'one-of': 'The subject is “one”, not the plural noun after “of”, so the verb is singular.',
  there: 'In a sentence that begins with “there” or “here”, the subject comes after the verb, so look ahead to find it.',
  'or-nor': 'When subjects are joined by “or” or “nor”, the verb agrees with the nearer subject.',
  'along-with': 'Phrases such as “along with”, “as well as” and “together with” do not make the subject plural: the verb agrees with the subject before them.',
  'looks-plural': 'Some nouns end in s but are singular, such as news, mathematics and physics.',
};

function subjectVerb(rng: Rng, d: Difficulty): GenOutput {
  const cast = people(rng, 2);
  const f = (s: string) => fill(s, cast);
  const pool = SV.filter((x) => SV_LEVEL[d].includes(x.kind));
  if (d === 3 && rng.chance(0.35)) {
    // Choose the sentence with correct agreement: one right, three with the wrong verb.
    const items = rng.sample(pool, 4);
    const show = (x: Sv, right: boolean) => cap(f(x.s).replace('___', x.v[(x.n === 'sg') === right ? 0 : 1]));
    const correct = show(items[0], true);
    return {
      prompt: 'Which sentence has correct subject–verb agreement?',
      parts: [part(mc(rng, correct, items.slice(1).map((x) => show(x, false))))],
      hints: ['In each sentence, find the subject the verb belongs to, ignoring phrases between them.', 'Then check whether that subject is singular or plural.'],
      solution: [`“${correct}” is correct: the subject is **${f(items[0].head)}**, which is ${items[0].n === 'sg' ? 'singular' : 'plural'}. ${SV_WHY[items[0].kind]}`, 'Each of the other sentences uses a verb that does not agree with its subject.'],
    };
  }
  const x = rng.pick(pool);
  const right = x.v[x.n === 'sg' ? 0 : 1];
  return {
    prompt: `Choose the verb that agrees with its subject.\n\n${block(gap(f(x.s)))}`,
    parts: [part(mc(rng, right, [x.v[x.n === 'sg' ? 1 : 0]]))],
    hints: ['Find the subject: who or what is doing the action or being described?', SV_WHY[x.kind]],
    solution: [
      `The verb agrees with **${f(x.head)}**, which is ${x.n === 'sg' ? 'singular' : 'plural'}. ${SV_WHY[x.kind]}`,
      `So the sentence is: ${cap(f(x.s).replace('___', `**${right}**`))}`,
    ],
  };
}

// ---------------------------------------------------------------------------- pronouns

interface Pro {
  s: string;
  right: string;
  wrong: string[];
  why: string;
  level: Difficulty;
}

const PRONOUNS: Pro[] = [
  { level: 1, s: 'NAME and ___ walked to the bus stop together.', right: 'I', wrong: ['me'], why: 'The pronoun is part of the subject, so it takes the subject form “I”. Test it alone: “I walked”, not “me walked”.' },
  { level: 1, s: 'The coach gave the trophy to NAME and ___.', right: 'me', wrong: ['I'], why: 'After a preposition (“to”), use the object form “me”. Test it alone: “gave the trophy to me”.' },
  { level: 1, s: '___ and NAME are cousins.', right: 'He', wrong: ['Him'], why: 'The pronoun is part of the subject, so it takes the subject form “he”. Test it alone: “He is a cousin”, not “Him is”.' },
  { level: 1, s: 'The teacher asked NAME and ___ to hand out the books.', right: 'me', wrong: ['I'], why: 'The pronoun is an object of “asked”, so it takes the object form “me”. Test it alone: “asked me”.' },
  { level: 1, s: 'These tickets are for ___ and me.', right: 'him', wrong: ['he'], why: 'After the preposition “for”, use the object form “him”. Test it alone: “for him”.' },
  { level: 1, s: '___ and I will set up the chairs.', right: 'She', wrong: ['Her'], why: 'The pronoun is part of the subject, so it takes the subject form “she”. Test it alone: “She will set up the chairs”.' },
  { level: 1, s: 'Between you and ___, the test was easier than I expected.', right: 'me', wrong: ['I'], why: '“Between” is a preposition, so it takes the object form “me”.' },
  { level: 2, s: 'The students handed in ___ projects on time.', right: 'their', wrong: ['its', 'his'], why: 'The antecedent, “the students”, is plural, so the pronoun is the plural “their”.' },
  { level: 2, s: 'The tree has lost all of ___ leaves.', right: 'its', wrong: ['their', 'it’s'], why: 'The antecedent, “the tree”, is one thing, so the pronoun is “its”, with no apostrophe (“it’s” means “it is”).' },
  { level: 2, s: 'The twins forgot ___ lunch money.', right: 'their', wrong: ['its', 'there'], why: 'The antecedent, “the twins”, is plural, so the pronoun is “their”.' },
  { level: 2, s: 'The museum reopened ___ doors after the repairs.', right: 'its', wrong: ['their', 'it’s'], why: 'The antecedent, “the museum”, is one thing, so the pronoun is “its”.' },
  { level: 2, s: 'The puppies chased ___ tails around the garden.', right: 'their', wrong: ['its', 'it’s'], why: 'The antecedent, “the puppies”, is plural, so the pronoun is “their”.' },
  { level: 2, s: 'Every bicycle in the rack had ___ own lock.', right: 'its', wrong: ['their', 'it’s'], why: 'The antecedent, “every bicycle”, is one thing, so the pronoun is “its”.' },
  { level: 2, s: 'If a city wants more visitors, ___ needs good public transport.', right: 'it', wrong: ['they'], why: 'The antecedent, “a city”, is one thing, so the pronoun is “it”.' },
  { level: 2, s: '___ students ran the book sale ourselves.', right: 'We', wrong: ['Us'], why: 'The pronoun is part of the subject, so it takes the subject form “we”. Test it without “students”: “We ran the book sale”.' },
  { level: 2, s: 'The principal thanked ___ volunteers for our help.', right: 'us', wrong: ['we'], why: 'The pronoun is the object of “thanked”, so it takes the object form “us”. Test it without “volunteers”: “thanked us”.' },
  { level: 3, s: 'NAME is taller than ___ am.', right: 'I', wrong: ['me', 'myself'], why: 'The pronoun is the subject of “am” (“than I am”), so it takes the subject form “I”.' },
  { level: 3, s: 'Our cousins can swim faster than ___ can.', right: 'we', wrong: ['us', 'ourselves'], why: 'The pronoun is the subject of “can” (“than we can”), so it takes the subject form “we”.' },
  { level: 3, s: 'To ___ should I give the permission forms?', right: 'whom', wrong: ['who'], why: 'After a preposition (“to”), use the object form “whom”.' },
  { level: 3, s: 'Grandma sent a parcel to my brother and ___.', right: 'me', wrong: ['myself', 'I'], why: 'After the preposition “to”, use the object form “me”. “Myself” is used only when the subject does something to itself (“I hurt myself”).' },
  { level: 3, s: 'Please send the photos to NAME or ___.', right: 'me', wrong: ['myself', 'I'], why: 'After the preposition “to”, use the object form “me”. “Myself” needs an “I” earlier in the sentence.' },
  { level: 3, s: 'The parents said that ___ would help at the fair.', right: 'they', wrong: ['it', 'them'], why: 'The antecedent, “the parents”, is plural, and the pronoun is the subject of “would help”, so it is “they”.' },
  { level: 3, s: 'NAME and ___ have been friends since primary school.', right: 'she', wrong: ['her', 'herself'], why: 'The pronoun is part of the subject, so it takes the subject form “she”. Test it alone: “She has been a friend”.' },
];

function pronouns(rng: Rng, d: Difficulty): GenOutput {
  const cast = people(rng, 2);
  const f = (s: string) => fill(s, cast);
  const x = rng.pick(PRONOUNS.filter((p) => p.level === d));
  const sentence = f(x.s);
  const filled = sentence.replace('___', `**${x.right}**`);
  return {
    prompt: `Choose the pronoun that completes the sentence correctly.\n\n${block(gap(sentence))}`,
    parts: [part(mc(rng, x.right, x.wrong))],
    hints: [
      'Is the pronoun a subject (doing the action) or an object (receiving it, or after a word such as to, for or between)?',
      'With two people joined by “and”, cover up the other person and try the pronoun alone. For “its” and “their”, find the noun the pronoun stands for and check whether it is singular or plural.',
    ],
    solution: [x.why, `So the sentence is: ${filled}`],
  };
}

// ---------------------------------------------------------------------------- verb tense

/** Short narratives with each verb written as [past|present]. */
const NARRATIVES = [
  'NAME [opened|opens] the door and [looked|looks] around the empty classroom. On the desk, {he} [noticed|notices] a note and [picked|picks] it up.',
  'The storm [reached|reaches] the town at midnight. Trees [fell|fall] across the roads, and the rain [kept|keeps] everyone awake until dawn.',
  'NAME [ran|runs] onto the field as the crowd [cheered|cheers]. {He} [caught|catches] the ball and [scored|scores] in the final second.',
  'NAME [woke|wakes] up late and [rushed|rushes] to the station. The train [was|is] already pulling away when {he} [arrived|arrives].',
  'The hikers [reached|reach] the summit at noon. They [ate|eat] their sandwiches, [took|take] photos and [started|start] back down.',
  'NAME [planted|plants] tomato seeds in the spring. By summer, the plants [were|are] taller than the fence, and {he} [picked|picks] the first ripe tomato.',
  'The hall [fell|falls] silent as the lights [dimmed|dim]. A single violinist [walked|walks] onto the stage and [began|begins] to play.',
  'NAME [found|finds] an old map in the attic. {He} [laid|lays] it on the floor and [traced|traces] the faded paths with {his} finger.',
  'NAME [chopped|chops] the onions while the soup [simmered|simmers]. Then {he} [tasted|tastes] the soup and [added|adds] a pinch of salt.',
  'NAME [stepped|steps] onto the stage and [took|takes] a deep breath. The music [started|starts], and {he} [forgot|forgets] {his} nerves.',
];

interface Verb {
  past: string;
  present: string;
}

function parseNarrative(t: string) {
  const verbs: Verb[] = [];
  const parts = t.split(/\[([^\]|]+)\|([^\]]+)\]/);
  for (let i = 1; i < parts.length; i += 3) verbs.push({ past: parts[i], present: parts[i + 1] });
  /** The text with each verb in the tense given (true = past), optionally in bold. */
  const render = (tenses: boolean[], bold = false) => {
    let out = parts[0];
    for (let i = 1, v = 0; i < parts.length; i += 3, v++) {
      const w = tenses[v] ? parts[i] : parts[i + 1];
      out += (bold ? `**${w}**` : w) + parts[i + 2];
    }
    return out;
  };
  return { verbs, render };
}

function verbTense(rng: Rng, d: Difficulty): GenOutput {
  const cast = people(rng, 2);
  const n = parseNarrative(rng.pick(NARRATIVES));
  const past = d === 1 ? true : rng.chance(0.5);
  const tenseName = past ? 'past' : 'present';
  const base = n.verbs.map(() => past);
  const shift = rng.int(1, n.verbs.length - 1);
  const shifted = base.map((t, i) => (i === shift ? !t : t));
  const word = (v: Verb, p: boolean) => (p ? v.past : v.present);
  const wrongWord = word(n.verbs[shift], !past);
  const rightWord = word(n.verbs[shift], past);
  if (d === 3) {
    const correct = fill(n.render(base), cast);
    const others = rng.sample(
      n.verbs.map((_, i) => i).filter((i) => i > 0),
      Math.min(3, n.verbs.length - 1),
    ).map((i) => fill(n.render(base.map((t, j) => (j === i ? !t : t))), cast));
    return {
      prompt: 'Which version keeps the verb tense consistent?',
      parts: [part(mc(rng, correct, others))],
      hints: ['Find the verbs in each version and check whether each is in the past or the present.', 'A story should stay in one tense unless the time of the action really changes.'],
      solution: [`Every verb in “${correct}” is in the ${tenseName} tense.`, 'Each of the other versions switches one verb to the other tense without a reason.'],
    };
  }
  const text = fill(n.render(shifted, d === 1), cast);
  const choices = n.verbs.map((v, i) => word(v, shifted[i]));
  return {
    prompt:
      d === 1
        ? `This passage is told in the past tense, but one verb shifts to the present without a reason.\n\n${block(text)}\n\nWhich verb should be changed?`
        : `One verb in this passage shifts tense without a reason.\n\n${block(text)}\n\nWhich verb should be changed?`,
    parts: [part(fixedChoice(choices, shift))],
    hints: ['Underline every verb, then decide which tense most of them are in.', 'The verb to change is the one that does not match the others.'],
    solution: [
      `The passage is told in the ${tenseName} tense, but “${wrongWord}” is in the ${past ? 'present' : 'past'} tense.`,
      `It should be “${rightWord}”.`,
    ],
  };
}

export const AGREEMENT_SKILLS: SkillDef[] = [
  skill({
    id: 'e10-subject-verb',
    name: 'Subject–verb agreement',
    description: 'Make a verb agree with its subject, including subjects with phrases after them, compound subjects, indefinite pronouns and inverted sentences.',
    outcomes: OUTCOMES,
    lessonId: LESSON,
    format: 'mc',
    gen: subjectVerb,
  }),
  skill({
    id: 'e10-pronouns',
    name: 'Pronoun agreement and case',
    description: 'Choose a pronoun that agrees in number with its antecedent and is in the right case (I or me, he or him, who or whom).',
    outcomes: OUTCOMES,
    lessonId: LESSON,
    format: 'mc',
    gen: pronouns,
  }),
  skill({
    id: 'e10-verb-tense',
    name: 'Consistent verb tense',
    description: 'Keep the verbs of a passage in one tense, and find a verb that shifts without a reason.',
    outcomes: OUTCOMES,
    lessonId: LESSON,
    format: 'mc',
    gen: verbTense,
  }),
];
