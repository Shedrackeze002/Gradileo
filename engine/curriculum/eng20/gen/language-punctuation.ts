/**
 * Grade 11 English, lesson 7.2: Dashes, Colons, Parentheses and Ellipses (11-G1). Dashes are
 * written as unspaced em dashes throughout (one style, kept everywhere). Choices never differ only by
 * the kind of dash, or by whether punctuation sits inside a closing quotation mark, since varieties of
 * English differ on both.
 */
import { mc, part, skill, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { block, fill, people } from '../../eng10/gen/common.ts';

const LESSON = 'e11-7-2';
const OUTCOMES = ['11-G1'];

interface Choice4 {
  /** The correctly punctuated sentence. */
  right: string;
  /** Wrong versions, each with what is wrong. */
  wrong: Array<[string, string]>;
  /** Why the right one is right. */
  why: string;
  mark: 'dash' | 'colon' | 'parentheses';
}

const DASH_PAIRS: Choice4[] = [
  {
    mark: 'dash',
    right: 'The old bridge—built more than a century ago—still carries traffic every day.',
    why: 'a pair of dashes sets off the interruption “built more than a century ago”, and the sentence reads correctly without it',
    wrong: [
      ['The old bridge—built more than a century ago still carries traffic every day.', 'the interruption is opened with a dash but never closed'],
      ['The old bridge—built more than a century ago, still carries traffic every day.', 'an interruption opened with a dash must be closed with a dash, not a comma'],
      ['The old—bridge built more than a century ago—still carries traffic every day.', 'the first dash splits “old bridge”, so the words set off are not the interruption'],
    ],
  },
  {
    mark: 'dash',
    right: 'NAME’s grandmother—a champion swimmer in her youth—still swims every morning.',
    why: 'a pair of dashes sets off the extra detail about the grandmother',
    wrong: [
      ['NAME’s grandmother—a champion swimmer in her youth still swims every morning.', 'the interruption is opened with a dash but never closed'],
      ['NAME’s grandmother—a champion swimmer in her youth, still swims every morning.', 'an interruption opened with a dash must be closed with a dash, not a comma'],
      ['NAME’s grandmother—a champion swimmer—in her youth still swims every morning.', 'the second dash comes too early and cuts the detail in two'],
    ],
  },
  {
    mark: 'dash',
    right: 'Three things—patience, practice and a good teacher—helped NAME learn the guitar.',
    why: 'a list inside a sentence is set off with a pair of dashes, so its commas do not get confused with the sentence’s',
    wrong: [
      ['Three things, patience, practice and a good teacher helped NAME learn the guitar.', 'with commas it is unclear where the list ends, and the subject is cut from its verb'],
      ['Three things—patience, practice and a good teacher helped NAME learn the guitar.', 'the list is opened with a dash but never closed'],
      ['Three things: patience, practice and a good teacher—helped NAME learn the guitar.', 'a colon cannot come straight after an incomplete clause such as “Three things”'],
    ],
  },
  {
    mark: 'dash',
    right: 'NAME opened the door, ready for a surprise party—and found the room completely empty.',
    why: 'a single dash before the last part of the sentence creates a pause for a sudden turn',
    wrong: [
      ['NAME opened the door, ready for a surprise party—and found the room—completely empty.', 'the second dash interrupts the sentence for no reason'],
      ['NAME opened the door—ready for a surprise party, and found the room completely empty.', 'the dash opens an interruption that a comma then closes; one mark must match the other'],
      ['NAME opened the door, ready for a surprise party; and found the room completely empty.', 'a semicolon must join two independent clauses, and “and found the room completely empty” is not one'],
    ],
  },
];

const COLONS: Choice4[] = [
  {
    mark: 'colon',
    right: 'There was only one explanation for the missing cake: the dog had eaten it.',
    why: 'a colon after a complete clause introduces an explanation of it',
    wrong: [
      ['There was only one explanation for the missing cake, the dog had eaten it.', 'a comma alone cannot join two independent clauses: a comma splice'],
      ['There was only: one explanation for the missing cake the dog had eaten it.', 'the colon interrupts the clause instead of following it'],
      ['There was only one explanation for: the missing cake the dog had eaten it.', 'a colon never comes straight after a preposition such as “for”'],
    ],
  },
  {
    mark: 'colon',
    right: 'NAME had trained for one goal: a place in the national team.',
    why: 'a colon after a complete clause introduces the thing it points to',
    wrong: [
      ['NAME had trained for: one goal, a place in the national team.', 'a colon never comes straight after a preposition such as “for”'],
      ['NAME had: trained for one goal, a place in the national team.', 'the colon splits the verb “had trained”'],
      ['NAME had trained for one goal; a place in the national team.', 'a semicolon must join two independent clauses, and “a place in the national team” is not one'],
    ],
  },
  {
    mark: 'colon',
    right: 'The recipe needs just three spices: cumin, turmeric and chilli.',
    why: 'a colon after a complete clause introduces a list',
    wrong: [
      ['The recipe needs: cumin, turmeric and chilli.', 'a colon cannot come straight after a verb such as “needs”'],
      ['The recipe needs just three spices; cumin, turmeric and chilli.', 'a semicolon cannot introduce a list'],
      ['The recipe needs just three spices, such as: cumin, turmeric and chilli.', 'a colon cannot come straight after “such as”'],
    ],
  },
  {
    mark: 'colon',
    right: 'The coach’s advice was simple: rest well, eat well and never skip the warm-up.',
    why: 'a colon after a complete clause introduces what the advice was',
    wrong: [
      ['The coach’s advice was: simple, rest well, eat well and never skip the warm-up.', 'the colon cuts “was” from “simple”, the word that completes the clause'],
      ['The coach’s advice was simple, rest well, eat well and never skip the warm-up.', 'a comma alone cannot join two independent clauses (“rest well … warm-up” is a complete command): a comma splice'],
      ['The coach’s advice was simple: rest well, eat well: and never skip the warm-up.', 'a second colon inside the list breaks it up for no reason'],
    ],
  },
];

const PARENS: Choice4[] = [
  {
    mark: 'parentheses',
    right: 'The museum (which reopened last spring) has a new hall of dinosaur fossils.',
    why: 'the parentheses enclose the extra detail, and the sentence reads correctly without it',
    wrong: [
      ['The museum (which reopened last spring has a new hall of dinosaur fossils.)', 'the closing parenthesis is in the wrong place, so the main verb is trapped inside'],
      ['The museum, (which reopened last spring) has a new hall of dinosaur fossils.', 'a comma before the opening parenthesis is not needed, and it leaves a single comma between the subject and its verb'],
      ['The museum (which reopened) last spring has a new hall of dinosaur fossils.', 'the parentheses cut “last spring” off from the detail it belongs to'],
    ],
  },
  {
    mark: 'parentheses',
    right: 'We met at the old station (the one near the river).',
    why: 'the bracketed words are part of the sentence, so the period comes after the closing parenthesis',
    wrong: [
      ['We met at the old station (the one near the river.)', 'the period ends the whole sentence, so it belongs outside the closing parenthesis'],
      ['We met at the old station. (the one near the river)', 'the period ends the sentence before the detail, leaving the detail stranded'],
      ['We met at the old station (the one near the river', 'the opening parenthesis is never closed, and the sentence has no period'],
    ],
  },
  {
    mark: 'parentheses',
    right: 'NAME’s first novel (written when {he} was only sixteen) sold more than ten thousand copies.',
    why: 'the parentheses enclose the extra detail, and the sentence reads correctly without it',
    wrong: [
      ['NAME’s first novel (written when {he} was only sixteen sold more than ten thousand copies).', 'the closing parenthesis is in the wrong place, so the main verb is trapped inside'],
      ['NAME’s first novel, (written when {he} was only sixteen) sold more than ten thousand copies.', 'a comma before the opening parenthesis is not needed, and it leaves a single comma between the subject and its verb'],
      ['NAME’s first (novel written when {he} was only sixteen) sold more than ten thousand copies.', 'the parentheses swallow “novel”, the subject of the sentence'],
    ],
  },
];

/** Leaving words out of a quotation with an ellipsis, or changing them with square brackets. */
interface QuoteEdit {
  original: string;
  /** What the student wants to keep. */
  task: string;
  right: string;
  wrong: Array<[string, string]>;
}

const OMITS: QuoteEdit[] = [
  {
    original: 'The new park, which cost the city far more than expected, has become the most popular place in town.',
    task: 'leave out the words about the cost',
    right: '“The new park … has become the most popular place in town.”',
    wrong: [
      ['“The new park has become the most popular place in town.”', 'words are left out with no ellipsis, so it looks like the speaker’s exact words'],
      ['“The new park, which cost the city far more than expected … the most popular place in town.”', 'it leaves out the wrong words: the main verb is gone'],
      ['“The new park … has become the most expensive place in town.”', 'it changes the speaker’s words (“popular” to “expensive”), which a quotation must never do'],
    ],
  },
  {
    original: 'I did not think, at first, that the plan would work, but the results have proved me wrong.',
    task: 'leave out the words “at first”',
    right: '“I did not think … that the plan would work, but the results have proved me wrong.”',
    wrong: [
      ['“I did not think that the plan would work, but the results have proved me wrong.”', 'words are left out with no ellipsis, so it looks like the speaker’s exact words'],
      ['“I … think … that the plan would work, but the results have proved me wrong.”', 'leaving out “did not” reverses the meaning'],
      ['“I did not think … the results have proved me wrong.”', 'it leaves out too much, so it now seems the speaker doubted the results'],
    ],
  },
  {
    original: 'Our volunteers, most of them students, planted more than two thousand trees along the river this spring.',
    task: 'leave out the words about who the volunteers were',
    right: '“Our volunteers … planted more than two thousand trees along the river this spring.”',
    wrong: [
      ['“Our volunteers planted more than two thousand trees along the river this spring.”', 'words are left out with no ellipsis, so it looks like the speaker’s exact words'],
      ['“Our volunteers, most of them students … this spring.”', 'it leaves out the main point: what the volunteers did'],
      ['“Most of them students planted more than two thousand trees along the river this spring.”', 'it changes the speaker’s words without marking any change'],
    ],
  },
  {
    original: 'The bridge will close on Monday, for safety reasons, and will reopen when the repairs are complete.',
    task: 'leave out the words “for safety reasons”',
    right: '“The bridge will close on Monday … and will reopen when the repairs are complete.”',
    wrong: [
      ['“The bridge will close on Monday and will reopen when the repairs are complete.”', 'words are left out with no ellipsis, so it looks like the exact words'],
      ['“The bridge will close … when the repairs are complete.”', 'it now says the bridge will close when the repairs are complete: the meaning changes'],
      ['“The bridge will … reopen on Monday.”', 'it changes the meaning: the bridge closes on Monday, not reopens'],
    ],
  },
];

/** Adding or changing words in a quotation with square brackets. */
const BRACKETS: QuoteEdit[] = [
  {
    original: 'She has never lost a final.',
    task: 'make it clear that “She” is the tennis player Hana Sato',
    right: '“[Hana Sato] has never lost a final.”',
    wrong: [
      ['“(Hana Sato) has never lost a final.”', 'round brackets look like the speaker’s own words; changes to a quotation go in square brackets'],
      ['“Hana Sato has never lost a final.”', 'the words are changed without square brackets, so it misquotes the speaker'],
      ['“She [has never lost a final].”', 'brackets go around the words the writer changed, not the speaker’s own words'],
    ],
  },
  {
    original: 'They finally reached the summit at noon.',
    task: 'make it clear that “They” are the two climbers',
    right: '“[The two climbers] finally reached the summit at noon.”',
    wrong: [
      ['“(The two climbers) finally reached the summit at noon.”', 'round brackets look like the speaker’s own words; changes to a quotation go in square brackets'],
      ['“The two climbers finally reached the summit at noon.”', 'the words are changed without square brackets, so it misquotes the speaker'],
      ['“They finally reached [the summit at noon].”', 'brackets go around the words the writer changed, not the speaker’s own words'],
    ],
  },
  {
    original: 'It changed my life.',
    task: 'make it clear that “It” means the summer music program',
    right: '“[The summer music program] changed my life.”',
    wrong: [
      ['“(The summer music program) changed my life.”', 'round brackets look like the speaker’s own words; changes to a quotation go in square brackets'],
      ['“The summer music program changed my life.”', 'the words are changed without square brackets, so it misquotes the speaker'],
      ['“It [changed my life].”', 'brackets go around the words the writer changed, not the speaker’s own words'],
    ],
  },
];

/** What a mark does in a sentence (difficulty 3). */
type Job = 'interrupt' | 'turn' | 'explain' | 'list' | 'bracket' | 'omit' | 'trail';
const JOB_TEXT: Record<Job, string> = {
  interrupt: 'To set off an interruption or extra detail in the middle of the sentence',
  turn: 'To mark a sudden turn or add emphasis to what comes at the end',
  explain: 'To introduce an explanation of the complete clause before it',
  list: 'To introduce a list after a complete clause',
  bracket: 'To show words the writer has added to a quotation',
  omit: 'To show that words have been left out of a quotation',
  trail: 'To show a speaker’s voice trailing off',
};
/** Jobs that overlap (a dash before the end can also explain; a colon’s list also explains), never offered against each other. */
const OVERLAP: Partial<Record<Job, Job[]>> = { explain: ['list', 'turn'], list: ['explain'], turn: ['explain'], omit: ['trail'], trail: ['omit'] };
const JOB_ITEMS: Array<{ s: string; mark: string; job: Job }> = [
  { s: 'The final question—the hardest on the paper—was worth twenty marks.', mark: 'the dashes', job: 'interrupt' },
  { s: 'NAME’s cousins—all six of them—arrived at once.', mark: 'the dashes', job: 'interrupt' },
  { s: 'NAME checked the lock, the windows and the alarm—then realized the back door was wide open.', mark: 'the dash', job: 'turn' },
  { s: 'After years of practice, NAME finally had what {he} wanted—a place in the orchestra.', mark: 'the dash', job: 'turn' },
  { s: 'The reason for the delay was simple: the pilot was ill.', mark: 'the colon', job: 'explain' },
  { s: 'NAME had learned an important lesson: a promise is easy to make and hard to keep.', mark: 'the colon', job: 'explain' },
  { s: 'The kit contains everything a climber needs: a rope, a harness, a helmet and gloves.', mark: 'the colon', job: 'list' },
  { s: 'Bring three things to the exam: a pen, a pencil and your student card.', mark: 'the colon', job: 'list' },
  { s: 'The mayor said that “[the new library] will open in June” and thanked the builders.', mark: 'the square brackets', job: 'bracket' },
  { s: 'At the awards night, the coach called “[NAME] the hardest-working player on the team” to loud applause.', mark: 'the square brackets', job: 'bracket' },
  { s: 'The report warns that the river “has risen … higher than at any time in the last fifty years” and may flood again.', mark: 'the ellipsis', job: 'omit' },
  { s: '“I was going to tell you,” NAME said quietly, “but then …”', mark: 'the ellipsis', job: 'trail' },
];

function fromChoice(rng: Rng, c: Choice4, f: (s: string) => string, n: number): GenOutput {
  const wrongs = rng.shuffle(c.wrong).slice(0, n);
  const name = c.mark === 'dash' ? 'dashes' : c.mark === 'colon' ? 'the colon' : 'parentheses';
  return {
    prompt: `Which sentence uses ${name} correctly?`,
    parts: [part(mc(rng, f(c.right), wrongs.map((w) => f(w[0]))))],
    hints: [
      c.mark === 'dash'
        ? 'Dashes set off an interruption in pairs, like brackets, or one dash marks a sudden turn before the end of a sentence. An interruption opened with a dash must close with a dash.'
        : c.mark === 'colon'
          ? 'A colon comes after a complete clause, never straight after a verb or a preposition, and introduces a list, an explanation or the thing the clause points to.'
          : 'Parentheses enclose extra information. The sentence must still read correctly with the brackets and everything inside them taken out.',
    ],
    solution: [`“${f(c.right)}” is correct: ${f(c.why)}.`, `In “${f(wrongs[0][0])}”, ${f(wrongs[0][1])}.`],
  };
}

function quotation(rng: Rng, o: QuoteEdit, kind: 'ellipsis' | 'brackets', f: (s: string) => string): GenOutput {
  const wrongs = rng.shuffle(o.wrong).slice(0, 3);
  return {
    prompt: `The original sentence:\n\n${block(`“${f(o.original)}”`)}\n\nA student wants to ${f(o.task)}. Which version is correct?`,
    parts: [part(mc(rng, f(o.right), wrongs.map((w) => f(w[0]))))],
    hints: [
      kind === 'ellipsis'
        ? 'An ellipsis (…) shows exactly where words were left out. What is left must still say what the original said.'
        : 'Words a writer adds to or changes in a quotation go in square brackets, so the reader can tell them from the speaker’s own words.',
    ],
    solution: [`${f(o.right)} is correct.`, `In ${f(wrongs[0][0])}, ${f(wrongs[0][1])}.`],
  };
}

function advancedPunctuation(rng: Rng, d: Difficulty): GenOutput {
  const cast = people(rng, 1);
  const f = (s: string) => fill(s, cast);
  if (d === 1) return fromChoice(rng, rng.pick([...DASH_PAIRS, ...COLONS, ...PARENS]), f, 2);
  if (d === 2) {
    const pick = rng.int(0, 2);
    if (pick === 0) return quotation(rng, rng.pick(OMITS), 'ellipsis', f);
    if (pick === 1) return quotation(rng, rng.pick(BRACKETS), 'brackets', f);
    return fromChoice(rng, rng.pick([...DASH_PAIRS, ...COLONS, ...PARENS]), f, 3);
  }
  // Difficulty 3: what the mark does.
  const it = rng.pick(JOB_ITEMS);
  const near: Job[] = ['interrupt', 'turn', 'explain', 'list', 'bracket', 'omit', 'trail'];
  const others = rng.shuffle(near.filter((j) => j !== it.job && !(OVERLAP[it.job] ?? []).includes(j))).slice(0, 3);
  return {
    prompt: `What is the job of ${it.mark} in this sentence?\n\n${block(f(it.s))}`,
    parts: [part(mc(rng, JOB_TEXT[it.job], others.map((j) => JOB_TEXT[j])))],
    hints: [
      'A pair of dashes works like brackets; a single dash creates a pause before a surprise or emphasis. A colon follows a complete clause. Square brackets and ellipses appear inside quotations.',
    ],
    solution: [`${JOB_TEXT[it.job]}.`],
  };
}

export const PUNCTUATION_SKILLS: SkillDef[] = [
  skill({
    id: 'e11-advanced-punctuation',
    name: 'Dashes, colons, parentheses, brackets and ellipses',
    description: 'Use dashes, colons, parentheses, square brackets and ellipses correctly and for effect.',
    outcomes: OUTCOMES,
    lessonId: LESSON,
    format: 'mc',
    gen: advancedPunctuation,
  }),
];

