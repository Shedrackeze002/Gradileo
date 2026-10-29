/**
 * Grade 12 English, lesson 1.5: Style and Authorial Voice (12-A1). The features of an author's
 * style (sentence length and shape, repetition, imagery, register) and their effect; subtle tone
 * and narratorial irony. Passages written for Gradileo and public-domain fiction (./stories.ts).
 */
import { mc, part, skill } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { block, fill, pair } from '../../eng10/gen/common.ts';
import {
  BARTLEBY, BART_ASTOR, BART_EASIEST, BART_ENDING, BART_FIGURE, BART_SAFE, BEAST, BEAST_CONVICTION, BEAST_WAIT, DEAD, DEAD_LUDICROUS, DEAD_SNOW, DEAD_TEARS, KEW, KEW_LIGHT, MARK, MARK_SNAIL,
  MARK_SWARM, OTHER, OTHER_CONFESSED, SIOUX, SIOUX_ENDING, SPRING, SPRING_TENNYSON, WIFE, WIFE_ACCIDENT, WIFE_PURPOSE, quoteBlock, titled, type Excerpt,
} from './stories.ts';

const L = 'e12-1-5';
const OUT = ['12-A1'];

// ============================================================================ style

type Feature = 'long' | 'short' | 'repeat' | 'imagery' | 'formal';
const FEATURE: Record<Feature, string> = {
  long: 'Long, many-claused sentences that hold back their main point',
  short: 'Short, plain sentences with almost no decoration at all',
  repeat: 'Repeated words and phrases that build a steady rhythm',
  imagery: 'Dense sensory imagery of colour, light, sound and texture',
  formal: 'Grand, formal, old-fashioned words used for small matters',
};
const FEATURE_GEN: Record<Feature, string[]> = {
  long: [
    'Though the journey had been long, and though the rain, which had followed them since the coast, had soaked every bag they carried, and though NAME, who had planned it all, now doubted every choice {he} had made, they arrived.',
    'If NAME had known, as {he} stood at the gate that morning with the letter still folded in {his} coat, unread and somehow heavier than paper should be, what it would ask of {him}, {he} might never have opened it.',
  ],
  short: [
    'NAME closed the door. The house was quiet. {He} sat down. The clock ticked. Nobody came.',
    'The ship left at dawn. NAME watched it go. {He} did not wave. Then {he} walked home alone.',
  ],
  repeat: [
    'NAME waited for the bus, and waited for the rain to stop, and waited for a call that never came, and still {he} waited.',
    'Every morning the same road, every morning the same grey sky, every morning the same question: why stay?',
  ],
  imagery: [
    'The market blazed with saffron and crimson; the air was thick with cardamom and diesel; copper pots rang under the hammers, and the stones were warm and gritty beneath NAME’s bare feet.',
    'Gold light slid across the wet tiles; the river hissed against the pilings; the smell of bread and woodsmoke drifted up from the street below.',
  ],
  formal: [
    'Having partaken of a modest repast of toast, NAME did then proceed, with all due solemnity, to the commencement of {his} homework.',
    'It was with the gravest deliberation that NAME undertook the ascent of the staircase in pursuit of {his} misplaced slipper.',
  ],
};

interface Styled {
  lead: string;
  excerpt: Excerpt;
  feature: Feature;
  /** Features that the passage also shows, so they are never offered as wrong answers. */
  also?: Feature[];
  why: string;
}
const STYLED: Styled[] = [
  { lead: `In ${titled(KEW)}, Woolf describes the light falling on a flower bed:`, excerpt: KEW_LIGHT, feature: 'imagery', also: ['long'], why: 'The passage is full of colour and light: “red, blue and yellow”, the “grey back of a pebble”, the raindrop’s “thin walls of water”.' },
  { lead: `${titled(DEAD)} ends as Gabriel watches the snow:`, excerpt: DEAD_SNOW, feature: 'repeat', also: ['imagery', 'long'], why: '“Falling faintly … faintly falling”: the repeated words, turned around, give the sentence the slow, soft rhythm of the snow itself.' },
  { lead: `In ${titled(SIOUX)}, the narrator waits for dawn in his cell:`, excerpt: SIOUX_ENDING, feature: 'short', also: ['repeat'], why: '“My heart is strong. My face is calm.” Each sentence is short and bare, with nothing added.' },
  { lead: `The narrator of ${titled(BARTLEBY)} describes his career:`, excerpt: BART_ASTOR, feature: 'formal', also: ['long'], why: '“Hath”, “orbicular” and “rings like unto bullion” are grand, old-fashioned words, used for the small vanity of repeating a rich man’s name.' },
  { lead: `In ${titled(BEAST)}, the narrator explains why Marcher has never married:`, excerpt: BEAST_CONVICTION, feature: 'long', also: ['formal'], why: 'The sentence piles up “his conviction, his apprehension, his obsession” and qualifies itself with “in short” before it reaches its point.' },
];

/** The effect of a feature of style (difficulty 3). */
const STYLE_EFFECT: Array<{ lead: string; excerpt: Excerpt; ask: string; answer: string; wrong: string[]; why: string }> = [
  {
    lead: `${titled(DEAD)} ends:`,
    excerpt: DEAD_SNOW,
    ask: 'What is the effect of “falling faintly … and faintly falling”?',
    answer: 'The mirrored words slow the sentence into a soft, hushed rhythm like the snow',
    wrong: ['The repeated words show that Gabriel is confused and cannot think clearly', 'The repetition speeds the sentence up, as the snow turns into a sudden storm', 'The mirrored words are a printing error that later editions of the story fix'],
    why: 'Joyce turns the phrase around so the sound itself falls gently and repeats, like snow settling over everything.',
  },
  {
    lead: `In ${titled(SIOUX)}, the narrator faces his execution:`,
    excerpt: SIOUX_ENDING,
    ask: 'What is the effect of the short, plain sentences?',
    answer: 'They show a man holding himself steady and calm in the face of death',
    wrong: ['They show that the narrator is too tired to write in long sentences', 'They show that the narrator has forgotten how to speak his own language', 'They show that the narrator is laughing at the guard and the court'],
    why: 'Each brief sentence is a statement of control: the plain style matches the composure he is claiming.',
  },
  {
    lead: `In ${titled(KEW)}, the narrator describes the light in a flower bed:`,
    excerpt: KEW_LIGHT,
    ask: 'What is the effect of describing a few square inches of earth in such detail?',
    answer: 'A tiny patch of ground is given the grandeur and wonder of a whole landscape',
    wrong: ['The detail shows that the narrator is a gardener checking the bed for weeds', 'The detail warns the reader that a crime will soon take place in the gardens', 'The detail slows the story down because nothing else happens in it at all'],
    why: 'Pebbles, a snail’s shell and a raindrop fill the view: close attention turns the small into something vast and full of colour.',
  },
  {
    lead: `The narrator of ${titled(BARTLEBY)} first sees Bartleby at his office door:`,
    excerpt: BART_FIGURE,
    ask: 'What is the effect of the three paired words, “pallidly neat, pitiably respectable, incurably forlorn”?',
    answer: 'Each pair adds a sadder note, building to a portrait of quiet despair',
    wrong: ['Each pair praises Bartleby more highly, building to a picture of success', 'Each pair describes a different clerk, so three people stand at the door', 'Each pair is a joke, showing that the narrator finds Bartleby ridiculous'],
    why: 'Neat becomes pitiable, then “incurably forlorn”: the rhythm of three builds a sense of hopelessness that the story will bear out.',
  },
  {
    lead: `In ${titled(BEAST)}, Marcher at last understands his life:`,
    excerpt: BEAST_WAIT,
    ask: 'What is the effect of holding the main point to the end of the sentence?',
    answer: 'The long build-up lands on a bleak truth: the waiting was his whole life',
    wrong: ['The long build-up hides the point so well that the reader never finds it', 'The long build-up shows that Marcher is excited about the future ahead', 'The long build-up makes the sentence comic, like the punchline of a joke'],
    why: 'The sentence delays its point until “the wait was itself his portion”, so the realization lands with the weight of years.',
  },
];

function styleQ(rng: Rng, d: Difficulty) {
  if (d === 3) {
    const e = rng.pick(STYLE_EFFECT);
    return {
      prompt: `${e.lead}\n\n${quoteBlock(e.excerpt)}\n\n${e.ask}`,
      parts: [part(mc(rng, e.answer, e.wrong))],
      hints: ['Describe the feature first, then ask how it makes the reader feel or what it shows about the character.'],
      solution: [`${e.answer}.`, e.why],
    };
  }
  if (d === 2) {
    const s = rng.pick(STYLED);
    const others = (Object.keys(FEATURE) as Feature[]).filter((f) => f !== s.feature && !(s.also ?? []).includes(f)).map((f) => FEATURE[f]);
    return {
      prompt: `${s.lead}\n\n${quoteBlock(s.excerpt)}\n\nWhich feature of style stands out most in this passage?`,
      parts: [part(mc(rng, FEATURE[s.feature], others))],
      hints: ['Look at the length and shape of the sentences, any repeated words, the senses, and the kind of vocabulary.'],
      solution: [`${FEATURE[s.feature]}.`, s.why],
    };
  }
  const k = rng.pick(Object.keys(FEATURE_GEN) as Feature[]);
  const text = fill(rng.pick(FEATURE_GEN[k]), pair(rng));
  const others = rng.sample((Object.keys(FEATURE) as Feature[]).filter((f) => f !== k), 3).map((f) => FEATURE[f]);
  return {
    prompt: `${block(text)}\n\nWhich feature of style stands out most in this passage?`,
    parts: [part(mc(rng, FEATURE[k], others))],
    hints: ['Look at sentence length and shape, repetition, the senses, and the kind of words chosen.'],
    solution: [`${FEATURE[k]}.`, {
      long: 'One long sentence piles up clauses before it reaches its main point.',
      short: 'The sentences are brief and bare, with no decoration.',
      repeat: 'The same words come back again and again, setting up a rhythm.',
      imagery: 'Colours, smells, sounds and textures crowd the passage.',
      formal: 'Grand, formal words are used for an everyday action, which is comic.',
    }[k]],
  };
}

// ============================================================================ tone and irony

type Tone = 'ironic' | 'sympathetic' | 'detached' | 'admiring';
const TONE: Record<Tone, string> = {
  ironic: 'Ironic: saying one thing while plainly meaning another',
  sympathetic: 'Sympathetic: sharing the character’s feelings warmly',
  detached: 'Detached: reporting events coolly, without judgement',
  admiring: 'Admiring: praising the character with open respect',
};
const TONE_GEN: Record<Tone, string[]> = {
  ironic: [
    'NAME, who had never once arrived on time, gave a long speech to the new staff about the importance of punctuality.',
    'The mayor, a modest man, had only eleven portraits of himself hung in the town hall.',
  ],
  sympathetic: [
    'NAME had saved for a year for the concert ticket, and when the show was cancelled {he} sat on the steps outside, holding the useless ticket, too tired even to cry.',
    'Poor NAME. {He} had tried so hard to make the dinner perfect, and now the guests were leaving early, one by one, with polite excuses.',
  ],
  detached: [
    'At 9:14 the train stopped. NAME stepped onto the platform, checked {his} watch, and walked toward the exit.',
    'The letter arrived on a Tuesday. NAME read it, folded it, and put it in a drawer. Then {he} made lunch.',
  ],
  admiring: [
    'NAME worked through the night without a word of complaint, and by morning the bridge, which everyone had said could not be saved, stood firm against the flood.',
    'Through every setback NAME kept faith with {his} students, and three generations of them would say that {he} had changed their lives.',
  ],
};

const IRONY: Array<{ lead: string; excerpt: Excerpt; ask: string; answer: string; wrong: string[]; why: string }> = [
  {
    lead: `In ${titled(WIFE)}, the narrator describes how the Blue Vein Society came to have its members:`,
    excerpt: WIFE_ACCIDENT,
    ask: 'What does the irony of “by accident” suggest?',
    answer: 'The light-skinned membership was no accident: the society chose by colour',
    wrong: ['The society truly chose its members at random, as the narrator says it did', 'The society chose its members only by their education and their manners', 'The narrator admires the society for welcoming everyone who wished to join'],
    why: '“By accident, combined perhaps with some natural affinity” is said with a straight face, but the reader is meant to doubt it: the society’s denial is part of the satire.',
  },
  {
    lead: `In ${titled(OTHER)}, Waythorn waits for his new wife to come down to dinner:`,
    excerpt: OTHER_CONFESSED,
    ask: 'What does the word “confessed” quietly suggest about his wife?',
    answer: 'She may be older than she admits, and careful about what she reveals',
    wrong: ['She has confessed to a crime, and Waythorn has decided to forgive her', 'She is exactly thirty-five, and Waythorn has checked the records himself', 'She is much younger than Waythorn, and he is embarrassed by the gap'],
    why: 'People “confess” to what they would rather hide. The word hints that thirty-five is the age she chooses to admit, a first sign of her skill at managing her past.',
  },
  {
    lead: `In ${titled(SPRING)}, Mrs. Spring Fragrance comforts her young neighbour, Laura:`,
    excerpt: SPRING_TENNYSON,
    ask: 'What is gently ironic about “a noble American named Tennyson”?',
    answer: 'Tennyson was English: her eagerness to be American has run ahead of her',
    wrong: ['Tennyson was her teacher in Seattle, and she is proud of his poems', 'Tennyson was a famous Chinese poet, whose verses she has translated', 'Tennyson was Laura’s sweetheart, and she is teasing the girl about him'],
    why: 'Alfred Tennyson was a famous English poet. Sui Sin Far lets the slip show, with affection, how eagerly “Americanized” Mrs. Spring Fragrance has become.',
  },
  {
    lead: `The narrator of ${titled(BARTLEBY)} introduces himself:`,
    excerpt: BART_SAFE,
    ask: 'What does the narrator’s pride in being “eminently safe” reveal about him, without his meaning it to?',
    answer: 'He values comfort and caution so highly that he will avoid any real risk',
    wrong: ['He is a daring man who takes great risks for his clients in court', 'He is a dangerous man whom nobody in his office truly trusts at all', 'He is a poor man who has never had any money worth keeping safe'],
    why: 'He boasts of being “safe” and of believing “the easiest way of life is the best”: his self-praise shows the caution that will fail him with Bartleby.',
  },
  {
    lead: `In ${titled(WIFE)}, the narrator describes the purpose of the Blue Vein Society:`,
    excerpt: WIFE_PURPOSE,
    ask: 'What is the narrator’s tone in describing the society’s aim?',
    answer: 'Gently mocking: he borrows the society’s lofty words with a hint of irony',
    wrong: ['Openly angry: he attacks the society’s members by name as liars', 'Plainly admiring: he praises the society as a model for every city', 'Completely neutral: the words carry no attitude or judgement at all'],
    why: '“Correct social standards” and “almost unlimited room for improvement” echo the society’s own self-important language, and the echo lets the reader smile at it.',
  },
];

/** Tone shifts across two passages (difficulty 3). */
const SHIFTS: Array<{ lead: string; first: Excerpt; second: Excerpt; answer: string; wrong: string[]; why: string }> = [
  {
    lead: `In ${titled(DEAD)}, after Gretta tells Gabriel about the young man who loved her, these two passages come a few pages apart:`,
    first: DEAD_LUDICROUS, second: DEAD_TEARS,
    answer: 'From bitter, wounded self-mockery to a tender and generous feeling',
    wrong: ['From calm contentment to sudden anger at his wife and her past', 'From cheerful amusement to cold indifference toward his wife', 'From deep fear of his wife to proud triumph over her old love'],
    why: 'Gabriel first sees himself as “a ludicrous figure”; then “generous tears” fill his eyes. Humiliation gives way to compassion.',
  },
  {
    lead: `${titled(BARTLEBY)} begins and ends with these two passages:`,
    first: BART_EASIEST, second: BART_ENDING,
    answer: 'From comfortable self-satisfaction to grief that reaches past one man',
    wrong: ['From open grief for Bartleby to cheerful relief that he has gone', 'From fierce anger at Bartleby to calm and settled indifference', 'From cold disinterest in his clerks to boasting about his office'],
    why: 'The narrator starts by praising “the easiest way of life”; he ends crying out “Ah Bartleby! Ah humanity!”: his ease has been broken open.',
  },
  {
    lead: `In ${titled(MARK)}, the narrator’s long train of thought begins and ends like this:`,
    first: MARK_SWARM, second: MARK_SNAIL,
    answer: 'From playful, drifting speculation to a sudden, flat matter of fact',
    wrong: ['From angry argument with a visitor to a calm and happy agreement', 'From deep terror of the mark to joyful relief that it has gone', 'From a plain list of facts to a long and wandering daydream'],
    why: 'The thoughts “swarm” and drift for pages; the last line drops them with a plain answer: “It was a snail.”',
  },
];

function toneQ(rng: Rng, d: Difficulty) {
  if (d === 3) {
    const s = rng.pick(SHIFTS);
    return {
      prompt: `${s.lead}\n\n${quoteBlock(s.first)}\n\n${quoteBlock(s.second)}\n\nHow does the tone change from the first passage to the second?`,
      parts: [part(mc(rng, s.answer, s.wrong))],
      hints: ['Name the attitude of each passage in one or two words, then describe the move from one to the other.'],
      solution: [`${s.answer}.`, s.why],
    };
  }
  if (d === 2) {
    const i = rng.pick(IRONY);
    return {
      prompt: `${i.lead}\n\n${quoteBlock(i.excerpt)}\n\n${i.ask}`,
      parts: [part(mc(rng, i.answer, i.wrong))],
      hints: ['Irony says one thing and lets the reader see another. What does the narrator expect the reader to notice?'],
      solution: [`${i.answer}.`, i.why],
    };
  }
  const k = rng.pick(Object.keys(TONE_GEN) as Tone[]);
  const text = fill(rng.pick(TONE_GEN[k]), pair(rng));
  return {
    prompt: `${block(text)}\n\nWhich best describes the narrator’s tone?`,
    parts: [part(mc(rng, TONE[k], (Object.keys(TONE) as Tone[]).filter((x) => x !== k).map((x) => TONE[x])))],
    hints: ['Ask how the narrator feels about the character: amused, warm, neutral or impressed? Then check whether the words mean exactly what they say.'],
    solution: [`${TONE[k]}.`, {
      ironic: 'The words say one thing, but the facts show the opposite, and the narrator expects us to notice.',
      sympathetic: 'The narrator shares the character’s disappointment and invites us to feel it too.',
      detached: 'Events are reported plainly, with no comment on how anyone feels.',
      admiring: 'The narrator openly praises the character’s effort and courage.',
    }[k]],
  };
}

export const STYLE_SKILLS: SkillDef[] = [
  skill({
    id: 'e12-style',
    name: 'Style and authorial voice',
    description: 'Identify the features of an author’s style (sentence shape, repetition, imagery and diction) and explain their effect.',
    outcomes: OUT,
    lessonId: L,
    format: 'mc',
    gen: styleQ,
  }),
  skill({
    id: 'e12-tone-irony',
    name: 'Tone and narratorial irony',
    description: 'Recognize a narrator’s tone and irony, and explain how the tone shifts across a story.',
    outcomes: OUT,
    lessonId: L,
    format: 'mc',
    gen: toneQ,
  }),
];
