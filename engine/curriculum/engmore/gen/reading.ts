/**
 * More English Topics, Unit 1: evaluating and comparing texts. Evaluating a statement about a
 * fiction extract (evidence for and against, and a judgement), summarising the differences
 * between two texts with evidence and an inference, and comparing two writers' viewpoints and
 * the methods that convey them. Every text was written for these lessons (see texts.ts).
 */
import { mc, part, skill, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { block, q } from '../../eng10/gen/common.ts';
import { EXTRACTS, PAIRS, type Extract, type Pair, type Source } from './texts.ts';

const L = (n: number) => `ex-1-${n}`;
const lower = (s: string) => s[0].toLowerCase() + s.slice(1);
/** A quotation inside a sentence: its own full stop is dropped, so the sentence's punctuation follows it. */
const qt = (s: string) => q(s.replace(/\.$/, ''));
/** A quotation that ends a sentence: it keeps its own end mark, or is given a full stop. */
const qe = (s: string) => (/[.?!]$/.test(s) ? q(s) : `${q(s)}.`);

// ---------------------------------------------------------------------------- lesson 1.1: evaluating a statement

const showExtract = (e: Extract) => `**${e.title}**\n\n${block(e.text)}\n\nA student said: ${q(e.statement)}`;

const GENERIC_COMMENT = 'This is a good quotation because the language is effective and makes the reader want to carry on reading.';
const LIKED_OPEN = 'I really enjoyed reading this extract, and I would like to find out what happens next in the rest of the story.';
const VAGUE_OPEN = 'The writer uses lots of interesting language techniques in this extract, which makes it effective for the reader.';
const FENCE = 'I am not sure: some readers might agree with the statement and some might not, so it depends on each person’s opinion.';

function evaluateEvidence(rng: Rng, d: Difficulty): GenOutput {
  const e = rng.pick(EXTRACTS);
  const s = rng.pick(e.supports);
  if (d === 1) {
    return {
      prompt: `${showExtract(e)}\n\nWhich quotation best **supports** the student’s statement?`,
      parts: [part(mc(rng, q(s.quote), [q(e.against.quote), q(e.neutral[0]), q(e.neutral[1])]))],
      hints: ['Look for the detail that makes a reader think or feel what the statement says.', 'One of these details pulls the other way, and two are only part of the scene.'],
      solution: [`${qt(s.quote)} supports the statement. ${s.why}`, `${qt(e.against.quote)} pulls the other way: ${e.against.point}.`],
    };
  }
  if (d === 2) {
    return {
      prompt: `${showExtract(e)}\n\nA good evaluation also weighs the evidence **against** a statement. Which quotation could be used to argue that the statement is only partly true?`,
      parts: [part(mc(rng, q(e.against.quote), [q(e.supports[0].quote), q(e.supports[1].quote), q(rng.pick(e.neutral))]))],
      hints: ['Find the detail that does not fit the statement.', 'Two of these quotations are the strongest evidence for the statement, so they cannot be used against it.'],
      solution: [`${qt(e.against.quote)} pulls against the statement: ${e.against.point}.`, 'Weighing a detail like this lets you say how far you agree, instead of simply agreeing.'],
    };
  }
  return {
    prompt: `${showExtract(e)}\n\nA student who agrees quotes ${qe(s.quote)} Which comment best explains how this quotation supports the statement?`,
    parts: [part(mc(rng, s.why, [s.retell, s.wrongWhy, GENERIC_COMMENT]))],
    hints: ['A strong comment names what the writer does and says what effect it has on the reader.', 'One comment only repeats what the quotation says, and one could be written about any quotation at all.'],
    solution: [s.why, 'This comment names the writer’s method and links its effect on the reader to the statement. Repeating what the quotation says is not evaluation.'],
  };
}

const WEAKNESS = {
  retell: 'It retells the events instead of judging the statement',
  noEvidence: 'It gives an opinion with no evidence from the text',
  noEffect: 'It names methods without explaining their effect',
  good: 'Nothing: it judges the statement, quotes and explains',
} as const;

function evaluateResponse(rng: Rng, d: Difficulty): GenOutput {
  const e = rng.pick(EXTRACTS);
  if (d === 1) {
    return {
      prompt: `${showExtract(e)}\n\nThe question asks: **how far do you agree?** Which is the best opening sentence for an answer?`,
      parts: [part(mc(rng, e.judge, [e.aboutOpen, LIKED_OPEN, VAGUE_OPEN]))],
      hints: ['The question asks for a judgement about the statement.', 'The best opening says how far the student agrees, and why.'],
      solution: [e.judge, 'This opening answers the question at once: it says how far the student agrees and gives a reason from the writer’s choices. The others describe the extract or the student’s enjoyment without judging the statement.'],
    };
  }
  if (d === 2) {
    const s = rng.pick(e.supports);
    const kind = rng.pick(['retell', 'noEvidence', 'noEffect', 'good'] as const);
    const response = kind === 'good' ? `${e.judge} For example, the writer says ${qe(s.quote)} ${s.why}` : e[kind];
    const labels = Object.values(WEAKNESS);
    return {
      prompt: `${showExtract(e)}\n\nAnother student wrote this in response:\n\n${block(response)}\n\nWhat is the main weakness of this response?`,
      parts: [part(mc(rng, WEAKNESS[kind], labels.filter((l) => l !== WEAKNESS[kind]), { keepOrder: false }))],
      hints: ['An evaluation needs three things: a judgement about the statement, evidence from the text, and an explanation of the writer’s methods and their effect.', 'Check the response for each of the three.'],
      solution: [
        kind === 'good'
          ? 'The response says how far the student agrees, quotes the text and explains how the writer’s method affects the reader. It has all three parts of an evaluation.'
          : kind === 'retell'
            ? 'The response tells the story again. It never says whether the statement is true, and it never looks at how the writer creates the effect.'
            : kind === 'noEvidence'
              ? 'The response gives an opinion, but it does not quote or refer to a single detail of the text, so nothing supports the opinion.'
              : 'The response lists methods, but it does not say what any of them makes the reader think or feel, or link them to the statement.',
      ],
    };
  }
  return {
    prompt: `${showExtract(e)}\n\nA student has noted evidence for the statement, such as ${qt(e.supports[0].quote)}, and evidence against it: ${qe(e.against.quote)} Which is the best conclusion?`,
    parts: [part(mc(rng, e.conclusion, [e.overAgree, e.overDisagree, FENCE]))],
    hints: ['The best conclusion weighs both kinds of evidence and still reaches a judgement.', 'Be wary of a conclusion that says “every” detail or “nothing” in the text.'],
    solution: [e.conclusion, 'This conclusion reaches a clear judgement and still accounts for the detail that pulls the other way. The others ignore half of the evidence, or refuse to judge at all.'],
  };
}

// ---------------------------------------------------------------------------- lessons 1.2 and 1.3: two texts

const label = (s: Source, which: 'A' | 'B') => `**Source ${which}**: from ${s.form} by ${s.writer}, ${s.year}`;
const showPair = (p: Pair) => `Two texts about ${p.topic}.\n\n${label(p.a, 'A')}\n\n${block(p.a.text)}\n\n${label(p.b, 'B')}\n\n${block(p.b.text)}`;

function summaryDifference(rng: Rng, d: Difficulty): GenOutput {
  const p = rng.pick(PAIRS);
  const k = rng.int(0, 2);
  const x = p.diffs[k];
  const others = p.diffs.filter((_, i) => i !== k);
  const statement = `In Source A ${x.a}, while in Source B ${x.b}.`;
  if (d === 1) {
    return {
      prompt: `${showPair(p)}\n\nWhich statement gives a true difference between ${x.about} in the two sources?`,
      parts: [part(mc(rng, statement, [`In Source A ${x.b}, while in Source B ${x.a}.`, `In both sources ${x.a}; the two texts do not differ.`, `In both sources ${x.b}; the two texts do not differ.`]))],
      hints: ['Check each half of the statement against the right source.', 'One choice has the two sources the wrong way round.'],
      solution: [statement, `Source A: ${q(x.qa)} Source B: ${q(x.qb)}`],
    };
  }
  if (d === 2) {
    const pairOf = (a: string, b: string) => `Source A: ${q(a)} Source B: ${q(b)}`;
    return {
      prompt: `${showPair(p)}\n\nA student writes: ${q(statement)} Which pair of quotations best supports this point?`,
      parts: [part(mc(rng, pairOf(x.qa, x.qb), [pairOf(others[0].qa, x.qb), pairOf(x.qa, others[1].qb), pairOf(others[0].qa, others[1].qb)]))],
      hints: [`Both quotations must be about ${x.about}.`, 'A summary of differences needs evidence from each source.'],
      solution: [pairOf(x.qa, x.qb), `Both quotations are about ${x.about}, one from each source. The other pairs include a quotation about something else.`],
    };
  }
  const evidence = `In Source A ${x.a} (${qt(x.qa)}), while in Source B ${x.b} (${qt(x.qb)}).`;
  return {
    prompt: `${showPair(p)}\n\nA student is summarising the differences between ${x.about}. Which is the best summary?`,
    parts: [
      part(
        mc(rng, `${evidence} ${x.infer}`, [
          `${evidence} ${x.wrongInfer}`,
          `Source A says ${qt(x.qa)} and Source B says ${qt(x.qb)}. These two quotations show that the sources are different from each other in what they say.`,
          `In Source A the writer uses the phrase ${qt(x.qa)}, which is very effective language because it creates a vivid picture in the reader’s mind.`,
        ]),
      ),
    ],
    hints: ['A strong summary states the difference, gives evidence from both sources and makes an inference.', 'The inference must follow from the texts. A summary does not analyse the writer’s language.'],
    solution: [`${evidence} ${x.infer}`, 'This summary states the difference, quotes both sources and infers something the texts support. The others copy without inferring, infer something the texts do not show, or analyse language in one source only.'],
  };
}

const SUMMARY_FLAW = {
  good: 'It is a strong summary: both sources, evidence and an inference',
  copy: 'It copies quotations from both sources but makes no inference',
  one: 'It writes about only one of the two sources, so nothing is compared',
  language: 'It analyses the writer’s language, which a summary does not need',
} as const;

function summaryInference(rng: Rng, d: Difficulty): GenOutput {
  const p = rng.pick(PAIRS);
  const k = rng.int(0, 2);
  const x = p.diffs[k];
  const others = p.diffs.filter((_, i) => i !== k);
  if (d === 1) {
    return {
      prompt: `${showPair(p)}\n\nA student notes these details about ${x.about}: ${qt(x.qa)} from Source A and ${qt(x.qb)} from Source B. Which is the best inference from them?`,
      parts: [part(mc(rng, x.infer, [x.wrongInfer, others[0].wrongInfer, others[1].wrongInfer]))],
      hints: ['An inference is a conclusion that the text does not state but that its details support.', 'Rule out any conclusion that the two texts give you no reason to believe.'],
      solution: [x.infer, `The details show that in Source A ${x.a}, while in Source B ${x.b}. The other conclusions go beyond anything the texts say.`],
    };
  }
  if (d === 2) {
    const fromA = rng.chance(0.5);
    const own = (y: typeof x) => (fromA ? y.qa : y.qb);
    const src = fromA ? p.a : p.b;
    return {
      prompt: `${showPair(p)}\n\nA student is summarising the differences between ${x.about}. Which detail from Source ${fromA ? 'A' : 'B'} should the student use?`,
      parts: [part(mc(rng, q(own(x)), [q(own(others[0])), q(own(others[1])), q(src.quote)].filter((c, i, all) => c !== q(own(x)) && all.indexOf(c) === i)))],
      hints: [`Choose the detail that is about ${x.about}.`, 'A summary selects only the details that answer the question; the rest of the text is left out.'],
      solution: [`${q(own(x))} is about ${x.about}. The other details are about different things, so they do not belong in this summary.`],
    };
  }
  const kind = rng.pick(['good', 'copy', 'one', 'language'] as const);
  const response = {
    good: `In Source A ${x.a} (${qt(x.qa)}), while in Source B ${x.b} (${qt(x.qb)}). ${x.infer}`,
    copy: `Source A says ${qt(x.qa)}. Source B says ${qt(x.qb)}. So the two sources say different things.`,
    one: `In Source A ${x.a}, because the writer says ${qt(x.qa)}. This tells the reader a great deal about what the experience was like for the writer.`,
    language: `In Source A the writer uses the phrase ${qt(x.qa)}. This is effective because the words create a vivid picture in the reader’s mind, and in Source B the phrase ${qt(x.qb)} is powerful too.`,
  }[kind];
  const labels = Object.values(SUMMARY_FLAW);
  return {
    prompt: `${showPair(p)}\n\nA student is summarising the differences between ${x.about}, and writes:\n\n${block(response)}\n\nWhich comment on this response is right?`,
    parts: [part(mc(rng, SUMMARY_FLAW[kind], labels.filter((l) => l !== SUMMARY_FLAW[kind])))],
    hints: ['A summary of differences needs a point about each source, evidence from each, and an inference.', 'It does not need comments on the writer’s language.'],
    solution: [
      {
        good: 'The response states the difference, quotes each source and infers what the difference suggests. That is everything a summary of differences needs.',
        copy: 'The response quotes both sources but only says that they are different. It needs to say what the difference is and what it suggests.',
        one: 'The response deals with Source A only. A summary of differences must set a detail from each source side by side.',
        language: 'The response comments on how effective the words are. That belongs in a language question; a summary deals with what the texts say and what can be inferred.',
      }[kind],
    ],
  };
}

function compareViewpoints(rng: Rng, d: Difficulty): GenOutput {
  const p = rng.pick(PAIRS);
  if (d === 1) {
    const onA = rng.chance(0.5);
    const s = onA ? p.a : p.b;
    const o = onA ? p.b : p.a;
    return {
      prompt: `${showPair(p)}\n\nWhat is ${s.writer}’s viewpoint in Source ${onA ? 'A' : 'B'}?`,
      parts: [part(mc(rng, `${s.writer} believes that ${s.view}.`, [`${s.writer} believes that ${o.view}.`, `${s.writer} believes that ${s.wrongViews[0]}.`, `${s.writer} believes that ${s.wrongViews[1]}.`]))],
      hints: ['A viewpoint is what the writer thinks and feels about the subject.', 'Read the whole source: which choice fits all of it, including the last sentence?'],
      solution: [`${s.writer} believes that ${s.view}.`, `The tone of the source is ${s.tone}, as in ${qe(s.quote)}`],
    };
  }
  if (d === 2) {
    const right = `${p.a.writer} believes that ${p.a.view}, whereas ${p.b.writer} believes that ${p.b.view}.`;
    return {
      prompt: `${showPair(p)}\n\nWhich sentence correctly compares the two writers’ viewpoints?`,
      parts: [
        part(
          mc(rng, right, [
            `${p.a.writer} believes that ${p.b.view}, whereas ${p.b.writer} believes that ${p.a.view}.`,
            `${p.a.writer} believes that ${p.a.view}, and ${p.b.writer} shares exactly the same view.`,
            `${p.a.writer} believes that ${p.a.wrongViews[0]}, whereas ${p.b.writer} believes that ${p.b.wrongViews[0]}.`,
          ]),
        ),
      ],
      hints: ['Work out each writer’s viewpoint first, then check both halves of each sentence.', 'A comparing word such as “whereas” sets one viewpoint against the other.'],
      solution: [right, `Source A is ${p.a.tone}; Source B is ${p.b.tone}.`],
    };
  }
  const tones = PAIRS.flatMap((x) => [x.a.tone, x.b.tone]).filter((t) => t !== p.a.tone && t !== p.b.tone);
  const [t1, t2] = rng.sample(tones, 2);
  const say = (a: string, b: string) => `Source A is ${a}, and Source B is ${b}`;
  return {
    prompt: `${showPair(p)}\n\nWhich choice best describes the two writers’ attitudes to ${p.topic}?`,
    parts: [part(mc(rng, say(p.a.tone, p.b.tone), [say(p.b.tone, p.a.tone), say(p.a.tone, t1), say(t2, p.b.tone)]))],
    hints: ['An attitude shows in the writer’s choice of words. Find two or three words in each source that carry feeling.', 'Check the description of each source separately.'],
    solution: [`${say(p.a.tone, p.b.tone)}.`, `Source A: ${q(p.a.quote)} Source B: ${q(p.b.quote)}`],
  };
}

function compareMethods(rng: Rng, d: Difficulty): GenOutput {
  const p = rng.pick(PAIRS);
  const onA = rng.chance(0.5);
  const s = onA ? p.a : p.b;
  const which = onA ? 'A' : 'B';
  if (d === 1) {
    return {
      prompt: `${showPair(p)}\n\nIn Source ${which}, ${s.writer} writes: ${qe(s.quote)} Which method is the writer using here?`,
      parts: [part(mc(rng, s.method, s.wrongMethods))],
      hints: ['Look at how the words work, not only at what they say.', 'A simile compares with “like” or “as”; a metaphor says one thing is another; personification gives a thing human feelings.'],
      solution: [`${s.method}: ${qe(s.quote)}`, s.effect],
    };
  }
  if (d === 2) {
    return {
      prompt: `${showPair(p)}\n\nIn Source ${which}, ${s.writer} uses ${lower(s.method)}: ${qe(s.quote)} How does this method help to convey the writer’s viewpoint?`,
      parts: [part(mc(rng, s.effect, [s.wrongEffect, 'It makes the writing more interesting and detailed, which makes the reader want to carry on to the end of the text.', 'It gives the reader a fact that can be checked, which proves that everything else the writer says is true.']))],
      hints: ['Say what the method makes the reader picture or feel, then link that to what the writer thinks.', 'A comment that could be made about any text is not an explanation.'],
      solution: [s.effect, `This fits the writer’s viewpoint: ${s.writer} believes that ${s.view}.`],
    };
  }
  const say = (ma: string, mb: string) => `${p.a.writer} uses ${lower(ma)} (${qt(p.a.quote)}) to ${p.a.purpose}, whereas ${p.b.writer} uses ${lower(mb)} (${qt(p.b.quote)}) to ${p.b.purpose}.`;
  return {
    prompt: `${showPair(p)}\n\nWhich sentence best compares **how** the two writers convey their viewpoints?`,
    parts: [
      part(
        mc(rng, say(p.a.method, p.b.method), [
          say(p.b.method, p.a.method),
          `${p.a.writer} uses ${lower(p.a.method)} (${qt(p.a.quote)}) and ${p.b.writer} uses ${lower(p.b.method)} (${qt(p.b.quote)}), so both writers use techniques to make their writing interesting.`,
          `${p.a.writer} believes that ${p.a.view}, whereas ${p.b.writer} believes that ${p.b.view}, so the two writers disagree with each other completely.`,
        ]),
      ),
    ],
    hints: ['A comparison of methods names each writer’s method, quotes it, and says what it is used to do.', 'Check that each method is named correctly.'],
    solution: [say(p.a.method, p.b.method), 'This sentence names each method correctly, quotes it and explains its purpose, with “whereas” to compare. The others mislabel the methods, give no effect, or compare the viewpoints without any method.'],
  };
}

export const READING_SKILLS: SkillDef[] = [
  skill({ id: 'ex-evaluate-evidence', name: 'Evidence for and against a statement', description: 'Choose the evidence that supports or challenges a statement about a text, and explain how it does so.', outcomes: ['RE1'], lessonId: L(1), gen: evaluateEvidence }),
  skill({ id: 'ex-evaluate-response', name: 'Writing an evaluation', description: 'Open an evaluation with a judgement, spot what a weak response is missing, and reach a balanced conclusion.', outcomes: ['RE1'], lessonId: L(1), gen: evaluateResponse }),
  skill({ id: 'ex-summary-difference', name: 'Summarising differences', description: 'State a difference between two texts, support it with a quotation from each, and add an inference.', outcomes: ['RE2'], lessonId: L(2), gen: summaryDifference }),
  skill({ id: 'ex-summary-inference', name: 'Selecting and inferring', description: 'Select the details a summary needs, infer from them, and judge a summary of two texts.', outcomes: ['RE2'], lessonId: L(2), gen: summaryInference }),
  skill({ id: 'ex-compare-viewpoints', name: 'Comparing viewpoints', description: 'Identify each writer’s viewpoint and attitude, and compare them accurately.', outcomes: ['RE3'], lessonId: L(3), gen: compareViewpoints }),
  skill({ id: 'ex-compare-methods', name: 'Comparing methods', description: 'Name the method a writer uses, explain how it conveys the viewpoint, and compare the methods of two writers.', outcomes: ['RE3'], lessonId: L(3), gen: compareMethods }),
];

