/**
 * More English Topics, Units 5 to 7: the set texts of GCSE English Literature that Gradileo's grade
 * courses do not teach. Each text (./lit/*.ts) gives its characters, its main events in order, key
 * quotations with the theme each shows and how to read it, and questions on its context; the
 * generators here turn any text into the same kinds of question. Every quotation is copied exactly
 * from the text's Project Gutenberg edition (named in the text's file), so all of them are in the
 * public domain.
 */
import { mc, part, skill, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { block } from '../../eng10/gen/common.ts';

export interface Character {
  name: string;
  /** Who they are, as a sentence ending (“Scrooge’s underpaid clerk, who …”), lower case. */
  is: string;
}

export interface Quotation {
  /** Copied exactly from the Gutenberg text (curly quotation marks and apostrophes). */
  text: string;
  /** Who says or writes it, as named in `characters`, or “the narrator”. */
  who: string;
  /** Where it comes from: “Stave 1”, “Chapter 10”, “Act 3, Scene 1”. */
  where: string;
  /** The moment, to set the scene (“Turning away two gentlemen collecting for the poor:”). */
  lead: string;
  /** The theme it shows best, one of the text's `themes`. */
  theme: string;
  /** What it suggests, as a full sentence. */
  reading: string;
  /** Three plausible misreadings, each as full as `reading`. */
  misreadings: [string, string, string];
}

export interface BankQuestion {
  ask: string;
  right: string;
  wrong: [string, string, string];
  sol: string;
}

export interface LitText {
  title: string;
  author: string;
  /** “1843”, or “first performed about 1599”. */
  date: string;
  /** What the text is divided into: Stave, Chapter, Act. */
  part: string;
  characters: Character[];
  /** The main events, in the order they happen, each with where it happens. */
  events: Array<{ where: string; what: string }>;
  themes: string[];
  quotations: Quotation[];
  /** Questions on the text's context and the writer's methods. */
  context: BankQuestion[];
}

const cap = (s: string) => s[0].toUpperCase() + s.slice(1);
const ital = (t: LitText) => `*${t.title}*`;
/** A quotation as a block, with its speaker and place unless `anon`. */
const quoteOf = (t: LitText, x: Quotation, anon = false) =>
  `${block(x.text)}\n>\n> — ${anon ? '' : `${x.who === 'the narrator' ? 'The narrator' : x.who}, `}${ital(t)}, ${x.where}`;

// ---------------------------------------------------------------------------- characters and plot

/** Who is this character? */
export function whoIs(t: LitText) {
  return (rng: Rng): GenOutput => {
    const [c, ...others] = rng.sample(t.characters, 4);
    return {
      prompt: `In ${ital(t)}, who is **${cap(c.name)}**?`,
      parts: [part(mc(rng, cap(c.is), others.map((o) => cap(o.is))))],
      hints: [`Think about what ${c.name} does in the ${t.part.toLowerCase()}s where they appear.`, 'Each choice describes one of the characters; match the description to the name.'],
      solution: [`${cap(c.name)} is ${c.is}.`],
    };
  };
}

/** Who says these words? */
export function whoSays(t: LitText) {
  return (rng: Rng): GenOutput => {
    const spoken = t.quotations.filter((x) => x.who !== 'the narrator');
    const x = rng.pick(spoken);
    const names = [...new Set(t.characters.map((c) => c.name))].filter((n) => n !== x.who);
    // The lead often names the speaker, so the question gives only the place in the text.
    return {
      prompt: `In ${ital(t)}, who says these words?\n\n${quoteOf(t, x, true)}`,
      parts: [part(mc(rng, cap(x.who), rng.sample(names, 3).map(cap)))],
      hints: [`Recall what happens in ${x.where}: who is there, and who would speak like this?`, 'The words show the speaker’s attitude; match it to a character.'],
      solution: [`${cap(x.who)} says this, in ${x.where}.`, `${x.lead.replace(/:$/, '.')} ${x.reading}`],
    };
  };
}

/** Which of these events happens first (or last)? */
export function order(t: LitText) {
  return (rng: Rng): GenOutput => {
    const idx = rng.sample(t.events.map((_, i) => i), 4).sort((a, b) => a - b);
    const first = rng.chance(0.5);
    const right = first ? idx[0] : idx[3];
    const wrong = idx.filter((i) => i !== right);
    return {
      prompt: `In ${ital(t)}, which of these events happens **${first ? 'first' : 'last'}**?`,
      parts: [part(mc(rng, t.events[right].what, wrong.map((i) => t.events[i].what)))],
      hints: [`Put the four events in order through the ${t.part.toLowerCase()}s.`, 'Ask what each event depends on: what must already have happened?'],
      solution: [
        `In order: ${idx.map((i) => `${t.events[i].what.replace(/\.$/, '')} (${t.events[i].where})`).join('; then ')}.`,
        `So the ${first ? 'first' : 'last'} is: ${t.events[right].what}`,
      ],
    };
  };
}

/** Where in the text does this event happen? */
export function whereIs(t: LitText) {
  return (rng: Rng): GenOutput => {
    const e = rng.pick(t.events);
    const places = [...new Set(t.events.map((x) => x.where))].filter((w) => w !== e.where);
    return {
      prompt: `In ${ital(t)}, where does this happen?\n\n${e.what}`,
      parts: [part(mc(rng, e.where, rng.sample(places, Math.min(3, places.length))))],
      hints: [`Recall the order of the ${t.part.toLowerCase()}s, and what each one is about.`],
      solution: [`It happens in ${e.where}.`],
    };
  };
}

// ---------------------------------------------------------------------------- quotations and themes

/** Which theme does this quotation show best? */
export function themeOf(t: LitText) {
  return (rng: Rng): GenOutput => {
    const x = rng.pick(t.quotations);
    return {
      prompt: `${x.lead}\n\n${quoteOf(t, x)}\n\nWhich theme does this quotation show best?`,
      parts: [part(mc(rng, x.theme, rng.sample(t.themes.filter((th) => th !== x.theme), 3)))],
      hints: ['Ask what the quotation is really about, beyond the moment in the story.', 'More than one theme may be nearby; choose the one the words themselves show.'],
      solution: [`It shows ${x.theme.toLowerCase()}. ${x.reading}`],
    };
  };
}

/** What does this quotation suggest? */
export function readingOf(t: LitText) {
  return (rng: Rng): GenOutput => {
    const x = rng.pick(t.quotations);
    return {
      prompt: `${x.lead}\n\n${quoteOf(t, x)}\n\nWhich is the best reading of this quotation?`,
      parts: [part(mc(rng, x.reading, x.misreadings))],
      hints: ['Read the words closely: which reading does every part of the quotation support?', 'Wrong readings often fit only one word, or misjudge the speaker’s tone.'],
      solution: [x.reading],
    };
  };
}

/** A question on context or the writer's methods. */
export function contextQ(t: LitText) {
  return (rng: Rng): GenOutput => {
    const b = rng.pick(t.context);
    return {
      prompt: b.ask,
      parts: [part(mc(rng, b.right, b.wrong))],
      hints: [`Think about when ${ital(t)} was written (${t.date}) and what ${t.author} wanted readers to see.`],
      solution: [b.sol],
    };
  };
}

type Gen = (t: LitText) => (rng: Rng) => GenOutput;

/** A skill whose three difficulties use the three given kinds of question. */
export function litSkill(t: LitText, id: string, name: string, description: string, outcomes: string[], lessonId: string, kinds: [Gen, Gen, Gen]): SkillDef {
  const gens = kinds.map((k) => k(t));
  return skill({ id, name, description, outcomes, lessonId, gen: (rng: Rng, d: Difficulty) => gens[d - 1](rng) });
}
