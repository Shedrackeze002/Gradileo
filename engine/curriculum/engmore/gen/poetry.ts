/**
 * More English Topics, Units 8 and 9: the poems of a GCSE poetry anthology, read one by one. Each
 * poem (./poems/*.ts) gives its poet, date, what it is about and its form in our own words, the
 * themes it explores, and questions on its context. A poem in the public domain also gives key
 * quotations, copied exactly from the published edition named in `source`; a poem still in
 * copyright gives key moments in our own words instead, so the questions never reproduce it.
 */
import { mc, part, skill, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { AnswerSpec, Difficulty, SkillDef } from '../../../types.ts';
import { block } from '../../eng10/gen/common.ts';
import type { BankQuestion } from './literature.ts';

export interface PoemQuote {
  /** Copied exactly from the edition in `source`; line breaks shown as “ / ”. */
  text: string;
  /** The moment, to set the scene (“The traveller describes the broken statue:”). */
  lead: string;
  /** The theme it shows best, one of the cluster's themes. */
  theme: string;
  /** What it suggests, as a full sentence. */
  reading: string;
  /** Three plausible misreadings, each as full as `reading`. */
  misreadings: [string, string, string];
}

export interface PoemMoment {
  /** What happens in this part of the poem, in our own words. */
  what: string;
  theme: string;
  reading: string;
  misreadings: [string, string, string];
}

export interface Poem {
  title: string;
  poet: string;
  /** Year first published (“1818”), when it is certain. */
  date?: string;
  /** What the poem is about, in our own words, as a sentence that does not name the poem. */
  about: string;
  /** Its form, as a short phrase: “a sonnet”, “a dramatic monologue”. */
  form: string;
  /** The cluster themes it explores, the strongest first. */
  themes: string[];
  /** Key quotations: only for a poem in the public domain. */
  quotations?: PoemQuote[];
  /** Key moments in our own words: for a poem still in copyright. */
  moments?: PoemMoment[];
  context: BankQuestion[];
  /** Where it was first published, and the edition quoted (or “not quoted”). */
  source: string;
}

/** A group of poems taught together, within a cluster of the anthology. */
export interface PoemSet {
  /** The poems the lesson teaches. */
  poems: Poem[];
  /** Every poem of the cluster, for wrong answers and comparisons. */
  cluster: Poem[];
  /** The cluster's name, “Power and Conflict”. */
  name: string;
}

const title = (p: Poem) => `“${p.title}”`;
const dated = (p: Poem) => (p.date ? ` (${p.date})` : '');
const others = (s: PoemSet, p: Poem) => s.cluster.filter((q) => q !== p);
/** Choices that are poem titles or poets' names: short labels, set out in a grid. */
const labels = (rng: Rng, right: string, wrong: string[]): AnswerSpec => {
  const a = mc(rng, right, wrong);
  return a.kind === 'mc' ? { ...a, layout: 'grid' } : a;
};

/** Which poem is described? */
export function whichPoem(s: PoemSet) {
  return (rng: Rng): GenOutput => {
    const p = rng.pick(s.poems);
    return {
      prompt: `Which poem from the ${s.name} poems is this?\n\n${p.about}`,
      parts: [part(labels(rng, p.title, rng.sample(others(s, p), 3).map((q) => q.title)))],
      hints: ['Recall what each poem is about: its speaker, its setting and what happens.'],
      solution: [`It is ${title(p)} by ${p.poet}${dated(p)}. ${p.about}`],
    };
  };
}

/** Who wrote this poem? */
export function poetOf(s: PoemSet) {
  return (rng: Rng): GenOutput => {
    const p = rng.pick(s.poems);
    const poets = [...new Set(others(s, p).map((q) => q.poet))].filter((n) => n !== p.poet);
    return {
      prompt: `Who wrote ${title(p)}?`,
      parts: [part(labels(rng, p.poet, rng.sample(poets, 3)))],
      hints: [`Think about when ${title(p)} was written and what it is about.`],
      solution: [`${p.poet} wrote ${title(p)}${dated(p)}. ${p.about}`],
    };
  };
}

/** Which poem are these lines from? (A poem in the public domain.) */
export function quoteFrom(s: PoemSet) {
  return (rng: Rng): GenOutput => {
    const p = rng.pick(s.poems.filter((q) => q.quotations?.length));
    const x = rng.pick(p.quotations!);
    return {
      prompt: `Which poem are these lines from?\n\n${block(x.text)}`,
      parts: [part(labels(rng, p.title, rng.sample(others(s, p), 3).map((q) => q.title)))],
      hints: ['Listen to the voice and the subject of the lines: who could be speaking, and about what?'],
      solution: [`They are from ${title(p)} by ${p.poet}. ${x.lead.replace(/:$/, '.')} ${x.reading}`],
    };
  };
}

/** A key quotation or a key moment of one of the poems, with its poem. */
function keyLine(s: PoemSet, rng: Rng) {
  const p = rng.pick(s.poems);
  if (p.quotations?.length) {
    const x = rng.pick(p.quotations);
    return { p, theme: x.theme, reading: x.reading, misreadings: x.misreadings, set: `${x.lead}\n\n${block(x.text)}\n>\n> — ${p.poet}, ${title(p)}`, what: 'these lines' };
  }
  const m = rng.pick(p.moments!);
  return { p, theme: m.theme, reading: m.reading, misreadings: m.misreadings, set: `In ${title(p)} by ${p.poet}: ${m.what}`, what: 'this moment' };
}

/** Which theme do these lines (or this moment) show best? */
export function poemTheme(s: PoemSet) {
  return (rng: Rng): GenOutput => {
    const k = keyLine(s, rng);
    const themes = [...new Set(s.cluster.flatMap((q) => q.themes))].filter((t) => t !== k.theme);
    return {
      prompt: `${k.set}\n\nWhich theme do ${k.what} show best?`,
      parts: [part(mc(rng, k.theme, rng.sample(themes, 3)))],
      hints: ['Ask what the lines are really about, beyond what happens in them.', 'More than one theme may be nearby; choose the one these words show most clearly.'],
      solution: [`They show ${k.theme.toLowerCase()}. ${k.reading}`],
    };
  };
}

/** What do these lines (or this moment) suggest? */
export function poemReading(s: PoemSet) {
  return (rng: Rng): GenOutput => {
    const k = keyLine(s, rng);
    return {
      prompt: `${k.set}\n\nWhich is the best reading of ${k.what}?`,
      parts: [part(mc(rng, k.reading, k.misreadings))],
      hints: ['Read closely: which reading does every part of it support?', 'Wrong readings often fit only one word, or misjudge the speaker’s tone.'],
      solution: [k.reading],
    };
  };
}

/** Which poem, like this one, explores a theme? */
export function compare(s: PoemSet) {
  return (rng: Rng): GenOutput => {
    for (;;) {
      const p = rng.pick(s.poems);
      const theme = rng.pick(p.themes);
      const alike = others(s, p).filter((q) => q.themes.includes(theme));
      const unlike = others(s, p).filter((q) => !q.themes.includes(theme));
      if (!alike.length || unlike.length < 3) continue;
      const q = rng.pick(alike);
      return {
        prompt: `${title(p)} explores **${theme.toLowerCase()}**. Which other poem from the ${s.name} poems explores the same theme?`,
        parts: [part(labels(rng, q.title, rng.sample(unlike, 3).map((r) => r.title)))],
        hints: ['Recall what each poem is about, and which themes it explores.'],
        solution: [`${title(q)} by ${q.poet} also explores ${theme.toLowerCase()}. ${q.about}`],
      };
    }
  };
}

/** What is the form of this poem? */
export function formOf(s: PoemSet) {
  return (rng: Rng): GenOutput => {
    const p = rng.pick(s.poems);
    const forms = [...new Set(others(s, p).map((q) => q.form))].filter((f) => f !== p.form);
    return {
      prompt: `Which best describes the form of ${title(p)} by ${p.poet}?`,
      parts: [part(mc(rng, p.form, rng.sample(forms, 3)))],
      hints: ['Picture the poem on the page: its stanzas, its line lengths, its rhyme, and whose voice speaks.'],
      solution: [`${title(p)} is ${p.form}.`],
    };
  };
}

/** A question on a poem's context or the poet's methods. */
export function poemContext(s: PoemSet) {
  const bank = s.poems.flatMap((p) => p.context);
  return (rng: Rng): GenOutput => {
    const b = rng.pick(bank);
    return {
      prompt: b.ask,
      parts: [part(mc(rng, b.right, b.wrong))],
      hints: ['Think about when the poem was written, and what the poet wanted readers to see or feel.'],
      solution: [b.sol],
    };
  };
}

type PoemGen = (s: PoemSet) => (rng: Rng) => GenOutput;

/** A skill whose three difficulties use the three given kinds of question. */
export function poemSkill(s: PoemSet, id: string, name: string, description: string, outcomes: string[], lessonId: string, kinds: [PoemGen, PoemGen, PoemGen]): SkillDef {
  const gens = kinds.map((k) => k(s));
  return skill({ id, name, description, outcomes, lessonId, gen: (rng: Rng, d: Difficulty) => gens[d - 1](rng) });
}
