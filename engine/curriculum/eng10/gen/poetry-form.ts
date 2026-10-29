/**
 * Grade 10 English, lesson 2.3: Form (10-B1). The sonnet (Shakespearean and Petrarchan, and the
 * volta), haiku, limerick, ballad, ode, elegy and free verse; stanzas named by their number of
 * lines, and how a poem’s form shapes its meaning.
 */
import { mc, numPart, part, skill, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { an, block } from './common.ts';
import {
  ASTRONOMER_ALL, BEARD_ALL, CAPTAIN_FIRST, CLOUD_LAST, DULCE_FIRST, EAGLE_ALL, FLANDERS_ALL, MARINER_SHIP, MARINER_WATER, OZYMANDIAS_ALL, REMEMBER_ALL,
  ROSE_FIRST, SONNET18_ALL, SONNET18_COUPLET, SONNET29_ALL, SONNET29_FIRST, SONNET73_ALL, SONNET130_COUPLET, TIGER_SECOND, WEST_WIND_OPENING, linesOf,
  lineCount, verseBlock, verseMd, type Verse,
} from './poems.ts';
import { titled } from './texts.ts';

const L = 'e10-2-3';
const OUT = ['10-B1'];

// ---------------------------------------------------------------------------- forms

type Form = 'sonnet' | 'haiku' | 'limerick' | 'ballad' | 'ode' | 'elegy' | 'free';
const FORMS: Form[] = ['sonnet', 'haiku', 'limerick', 'ballad', 'ode', 'elegy', 'free'];
const FORM_NAME: Record<Form, string> = { sonnet: 'Sonnet', haiku: 'Haiku', limerick: 'Limerick', ballad: 'Ballad', ode: 'Ode', elegy: 'Elegy', free: 'Free verse' };
const FORM_DESC: Record<Form, string[]> = {
  sonnet: ['A fourteen-line poem, usually in iambic pentameter, with a set rhyme scheme.', 'A poem of exactly fourteen lines that turns, at line 9 or in its final couplet, to a new thought.'],
  haiku: ['A three-line poem of five, seven and five syllables, often about nature or a season.', 'A very short form from Japan that captures a single moment in three lines.'],
  limerick: ['A funny five-line poem with the rhyme scheme AABBA.', 'A short comic poem whose long first, second and fifth lines rhyme, and whose short third and fourth lines rhyme with each other.'],
  ballad: ['A poem that tells a story, often in four-line stanzas, and was first meant to be sung.', 'A story told in verse with a simple rhyme scheme such as ABCB and, often, a repeated refrain.'],
  ode: ['A formal poem of praise that speaks directly to its subject.', 'A serious poem that addresses a person, thing or idea and celebrates it.'],
  elegy: ['A poem that mourns a person who has died.', 'A sad, reflective poem of grief for the dead.'],
  free: ['A poem with no regular rhyme scheme or metre.', 'Poetry that follows the rhythms of natural speech instead of a fixed pattern of rhyme and beat.'],
};
const FORM_WHY: Record<Form, string> = {
  sonnet: 'a sonnet has fourteen lines, usually in iambic pentameter, with a set rhyme scheme',
  haiku: 'a haiku is three short lines (five, seven and five syllables in English) capturing a moment, often in nature',
  limerick: 'a limerick is a comic five-line poem rhyming AABBA',
  ballad: 'a ballad tells a story in short, song-like stanzas, often rhyming ABCB',
  ode: 'an ode speaks directly to its subject and praises it',
  elegy: 'an elegy mourns someone who has died',
  free: 'free verse has no regular rhyme or metre',
};

interface FormExample {
  form: Form;
  /** The example as Markdown, with no title that gives the form away. */
  md: string;
  why: string;
  /** The source, given in the solution. */
  source?: string;
  /** Forms that could also be argued for this example, left out of its choices. */
  leave?: Form[];
}
const from = (v: Verse) => `The poem is ${titled(v.poem)} by ${v.poem.author}.`;
const HAIKU_FROST = ['Morning frost on glass', 'a sparrow shakes the cold twig', 'sunlight finds the field'];
const HAIKU_THUNDER = ['Summer thunder rolls', 'children run in from the rain', 'the dog stays asleep'];
const HAIKU_POND = ['The old pond—', 'a frog jumps in,', 'the sound of water.'];
const BAKER = ['A baker who lived by the sea', 'Baked bread for the fish, and for free;', 'Each morning at eight', 'He would wait at the gate', 'With a loaf and a large pot of tea.'];
const bare = (v: Verse) => verseBlock(v, { bare: true });
const FORM_EXAMPLES: FormExample[] = [
  { form: 'haiku', md: `A poem written for Gradileo:\n\n${block(verseMd(HAIKU_FROST))}`, why: 'It has three lines of five, seven and five syllables and captures one moment in nature.' },
  { form: 'haiku', md: `A poem written for Gradileo:\n\n${block(verseMd(HAIKU_THUNDER))}`, why: 'It has three lines of five, seven and five syllables and captures one summer moment.' },
  { form: 'haiku', md: `A poem by the Japanese poet Matsuo Bashō (1686), in Gradileo’s own word-for-word translation:\n\n${block(verseMd(HAIKU_POND))}`, why: 'It is a three-line Japanese poem that captures a single moment in nature (in Japanese its lines have five, seven and five sound units).' },
  { form: 'limerick', md: `A poem by Edward Lear:\n\n${bare(BEARD_ALL)}`, why: 'It is a comic five-line poem rhyming AABBA (beard, feared, Hen, Wren, beard).', source: from(BEARD_ALL) },
  { form: 'limerick', md: `A poem written for Gradileo:\n\n${block(verseMd(BAKER))}`, why: 'It is a comic five-line poem rhyming AABBA (sea, free, eight, gate, tea).' },
  { form: 'ballad', md: `From a long poem by Samuel Taylor Coleridge that tells the story of a sailor’s terrible voyage:\n\n${bare(MARINER_SHIP)}`, why: 'It tells a story in short four-line stanzas rhyming ABCB, like a song.', source: from(MARINER_SHIP) },
  { form: 'ballad', md: `From a long poem by Samuel Taylor Coleridge that tells the story of a sailor’s terrible voyage:\n\n${bare(MARINER_WATER)}`, why: 'It tells a story in short, repetitive four-line stanzas, like a song.', source: from(MARINER_WATER) },
  { form: 'ode', md: `The opening of a long poem by Percy Bysshe Shelley:\n\n${bare(WEST_WIND_OPENING)}`, why: 'It speaks directly to the west wind (“O wild West Wind, thou …”) and celebrates its power.', source: from(WEST_WIND_OPENING) },
  { form: 'elegy', md: `Walt Whitman wrote this poem after President Abraham Lincoln was assassinated in 1865. It begins:\n\n${bare(CAPTAIN_FIRST)}\n\nand each of its three stanzas ends with the Captain lying “cold and dead.”`, why: 'It mourns a leader who has died, the “Captain” of the ship of state.', source: from(CAPTAIN_FIRST), leave: ['ballad'] },
  { form: 'free', md: `From a poem by Walt Whitman:\n\n${bare(linesOf(ASTRONOMER_ALL, 1, 5))}`, why: 'Its lines are of very different lengths, with no rhyme and no regular beat.', source: from(ASTRONOMER_ALL) },
  { form: 'sonnet', md: `A poem by Christina Rossetti:\n\n${bare(REMEMBER_ALL)}`, why: 'It has fourteen lines of iambic pentameter with a set rhyme scheme (ABBAABBA CDDECE), and it turns at line 9 with “Yet”.', source: from(REMEMBER_ALL), leave: ['elegy'] },
  { form: 'sonnet', md: `A poem by Percy Bysshe Shelley:\n\n${bare(OZYMANDIAS_ALL)}`, why: 'It has fourteen rhyming lines in iambic pentameter, and it turns near the end, from the boast on the pedestal to “Nothing beside remains.”', source: from(OZYMANDIAS_ALL) },
];

interface SonnetQ {
  prompt: string;
  right: string;
  wrong: string[];
  why: string[];
}
const SONNET_QS: SonnetQ[] = [
  {
    prompt: `Christina Rossetti’s ${titled(REMEMBER_ALL.poem)} rhymes **ABBAABBA CDDECE**: an eight-line group, then a six-line group. Which kind of sonnet is it?`,
    right: 'A Petrarchan (Italian) sonnet',
    wrong: ['A Shakespearean (English) sonnet', 'A ballad', 'A limerick'],
    why: ['A Petrarchan sonnet has an octave (eight lines, rhyming ABBAABBA) and a sestet (six lines).', 'A Shakespearean sonnet would have three quatrains and a couplet: ABAB CDCD EFEF GG.'],
  },
  {
    prompt: `Shakespeare’s ${titled(SONNET18_ALL.poem)} rhymes **ABAB CDCD EFEF GG**. Which kind of sonnet is it?`,
    right: 'A Shakespearean (English) sonnet',
    wrong: ['A Petrarchan (Italian) sonnet', 'A ballad', 'Free verse'],
    why: ['A Shakespearean sonnet has three quatrains (ABAB CDCD EFEF) and a closing couplet (GG).', 'A Petrarchan sonnet would divide into an octave rhyming ABBAABBA and a sestet.'],
  },
  {
    prompt: `Here is Christina Rossetti’s sonnet ${titled(REMEMBER_ALL.poem)}:\n\n${verseBlock(REMEMBER_ALL)}\n\nWhere does the **volta** (the turn) come?`,
    right: 'At line 9: “Yet if you should forget me for a while”',
    wrong: ['At line 1: “Remember me when I am gone away,”', 'At line 5: “Remember me when no more day by day”', 'At line 13: “Better by far you should forget and smile”'],
    why: ['In a Petrarchan sonnet the turn usually comes at the start of the sestet, line 9.', 'Here “Yet” turns the poem: after eight lines begging to be remembered, the speaker says she would rather be forgotten than make her loved one sad.'],
  },
  {
    prompt: `Here is Shakespeare’s ${titled(SONNET29_ALL.poem)} (“beweep” means weep over; “haply” means by chance):\n\n${verseBlock(SONNET29_ALL)}\n\nWhat happens at the poem’s turn?`,
    right: 'The speaker’s despair changes to joy when he thinks of the person he loves.',
    wrong: ['The speaker’s joy changes to despair when he loses his fortune.', 'The speaker stops thinking about his life and describes the weather.', 'The speaker decides to become a king.'],
    why: ['The first eight lines are full of despair and envy.', 'Then “Haply I think on thee”: the speaker’s mood rises “like to the lark at break of day”, and he would not change places with kings.'],
  },
  {
    prompt: `Shakespeare’s ${titled(SONNET130_COUPLET.poem)} spends twelve lines saying that his love’s eyes, lips, hair and voice are nothing special. It ends with this couplet:\n\n${verseBlock(SONNET130_COUPLET)}\n\nWhat does the couplet do?`,
    right: 'It turns the poem: she is as precious as any woman praised with flattering, false comparisons.',
    wrong: ['It adds one more insult to the list.', 'It describes the weather on the day they met.', 'It says that he no longer loves her.'],
    why: ['The closing couplet of a Shakespearean sonnet often gives a twist.', 'Here, after mocking the usual flattering comparisons, the speaker says his love is as “rare” as any woman “belied with false compare”.'],
  },
];

function formsQ(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Count the lines and look at the rhyme and rhythm. Then ask what the poem does: tell a story, mourn, praise, joke, or capture a moment.'];
  if (d === 3 && rng.chance(0.6)) {
    const q = rng.pick(SONNET_QS);
    return {
      prompt: q.prompt,
      parts: [part(mc(rng, q.right, q.wrong))],
      hints: ['A Shakespearean sonnet: three quatrains and a couplet (ABAB CDCD EFEF GG), often turning in the couplet. A Petrarchan sonnet: an octave and a sestet, turning at line 9.'],
      solution: q.why,
    };
  }
  if (d === 1) {
    const f = rng.pick(FORMS);
    const desc = rng.pick(FORM_DESC[f]);
    return {
      prompt: `${desc}\n\nWhich form of poem is this?`,
      parts: [part(mc(rng, FORM_NAME[f], rng.sample(FORMS.filter((x) => x !== f), 3).map((x) => FORM_NAME[x])))],
      hints,
      solution: [`This describes ${f === 'free' ? 'free verse' : `${f === 'ode' || f === 'elegy' ? 'an' : 'a'} ${f}`}: ${FORM_WHY[f]}.`],
    };
  }
  const e = rng.pick(FORM_EXAMPLES);
  return {
    prompt: `${e.md}\n\nWhich form of poem is this?`,
    parts: [part(mc(rng, FORM_NAME[e.form], rng.sample(FORMS.filter((x) => x !== e.form && !(e.leave ?? []).includes(x)), 3).map((x) => FORM_NAME[x])))],
    hints,
    solution: [`It is ${e.form === 'free' ? 'free verse' : `${e.form === 'ode' || e.form === 'elegy' ? 'an' : 'a'} ${e.form}`}: ${FORM_WHY[e.form]}.`, e.why, ...(e.source ? [e.source] : [])],
  };
}

// ---------------------------------------------------------------------------- stanzas

type StanzaKind = 2 | 3 | 4 | 6 | 8;
const KINDS: StanzaKind[] = [2, 3, 4, 6, 8];
const KIND_NAME: Record<StanzaKind, string> = { 2: 'Couplet', 3: 'Tercet', 4: 'Quatrain', 6: 'Sestet', 8: 'Octave' };
const NUMBER: Record<StanzaKind, string> = { 2: 'two', 3: 'three', 4: 'four', 6: 'six', 8: 'eight' };

interface StanzaEx {
  verse?: Verse;
  lines?: string[];
  lead: string;
}
const STANZA_EXAMPLES: StanzaEx[] = [
  { verse: SONNET18_COUPLET, lead: `The end of Shakespeare’s ${titled(SONNET18_COUPLET.poem)}:` },
  { lines: ['A friend in need is hard to find,', 'But one who stays is rare and kind.'], lead: 'Lines written for Gradileo:' },
  { verse: linesOf(EAGLE_ALL, 1, 3), lead: `The first stanza of ${titled(EAGLE_ALL.poem)} by Alfred, Lord Tennyson:` },
  { lines: ['The fog came in across the bay,', 'It hid the boats and turned them grey,', 'And swallowed up the end of day.'], lead: 'A stanza written for Gradileo:' },
  { verse: SONNET29_FIRST, lead: `The opening of Shakespeare’s ${titled(SONNET29_FIRST.poem)}:` },
  { verse: MARINER_SHIP, lead: `A stanza of ${titled(MARINER_SHIP.poem)} by Samuel Taylor Coleridge:` },
  { verse: TIGER_SECOND, lead: `A stanza of ${titled(TIGER_SECOND.poem)} by William Blake:` },
  { verse: ROSE_FIRST, lead: `The first stanza of ${titled(ROSE_FIRST.poem)} by Robert Burns:` },
  { verse: DULCE_FIRST, lead: `The opening of ${titled(DULCE_FIRST.poem)} by Wilfred Owen:` },
  { verse: CLOUD_LAST, lead: `The last stanza of ${titled(CLOUD_LAST.poem)} by William Wordsworth:` },
  { verse: linesOf(REMEMBER_ALL, 1, 8), lead: `The first part of ${titled(REMEMBER_ALL.poem)}, a sonnet by Christina Rossetti:` },
  { verse: linesOf(SONNET73_ALL, 9, 14), lead: `The last six lines of Shakespeare’s ${titled(SONNET73_ALL.poem)}:` },
];
const exCount = (e: StanzaEx) => (e.verse ? lineCount(e.verse) : e.lines!.length) as StanzaKind;

interface FormMeaning {
  prompt: string;
  right: string;
  wrong: string[];
  why: string;
}
const FORM_MEANINGS: FormMeaning[] = [
  {
    prompt: 'In a Shakespearean sonnet, what does the closing couplet usually do?',
    right: 'It sums up the poem or gives it a final twist.',
    wrong: ['It introduces the poem’s main characters.', 'It repeats the first two lines word for word.', 'It asks the reader a question that the poem never answers.'],
    why: 'After three quatrains develop the idea, the two rhyming lines at the end land the point: a summary, a twist or a turn.',
  },
  {
    prompt: `In Shakespeare’s ${titled(SONNET73_ALL.poem)}, each of the three quatrains compares the speaker’s age to something different: late autumn, twilight, then a fire burning down to ashes. How does the form support this?`,
    right: 'Each quatrain develops one image, and each image is closer to the end: the poem moves step by step toward death.',
    wrong: ['The quatrains tell three different stories with three different speakers.', 'The three quatrains rhyme on the same words, so the images are identical.', 'Each quatrain asks a question that the poem never answers.'],
    why: 'A year ends, a day ends, a fire goes out: the form gives each image its own quatrain, and the images grow shorter and darker.',
  },
  {
    prompt: 'Why is the turn of a Petrarchan sonnet so often placed between the octave and the sestet?',
    right: 'The octave can set out a problem or situation, and the sestet can answer it or change direction.',
    wrong: ['The octave and the sestet must be written by different poets.', 'The sestet must always repeat the octave in different words.', 'The octave is always happy and the sestet always sad.'],
    why: 'The division into eight lines and six gives the poem two parts, so a change of thought fits naturally at line 9.',
  },
  {
    prompt: `In ${titled(FLANDERS_ALL.poem)}, the second and third stanzas end with the same short line, “In Flanders fields.” What is the effect of this refrain?`,
    right: 'It keeps bringing the reader back to the place where the dead soldiers lie.',
    wrong: ['It shows that the poet ran out of ideas.', 'It tells the reader the poem is about to start again.', 'It makes the poem cheerful and light.'],
    why: 'A refrain is a repeated line. Ending stanzas with the place name returns us again and again to the graves.',
  },
  {
    prompt: 'Many ballads end each stanza with the same line, a refrain. Why?',
    right: 'The repetition makes the story easy to remember and sing, and keeps its main idea before the listener.',
    wrong: ['It saves the poet from writing new lines.', 'It shows that the story has ended.', 'It is required in every kind of poem.'],
    why: 'Ballads began as songs passed on by memory: a refrain helps listeners join in and drives home the story’s main feeling.',
  },
  {
    prompt: 'A limerick has long first, second and fifth lines and short third and fourth lines. What effect does this shape have?',
    right: 'The two short lines speed up the rhythm, setting up a quick, funny last line.',
    wrong: ['It slows the poem down to make it sad.', 'It shows that the poem is unfinished.', 'It turns the poem into a sonnet.'],
    why: 'The short third and fourth lines rush along, so the long last line lands like the punchline of a joke.',
  },
  {
    prompt: `In Walt Whitman’s free-verse poem ${titled(ASTRONOMER_ALL.poem)}, the lines about the lecture grow longer and longer, but the last line is short and calm: “Look’d up in perfect silence at the stars.” How does the form help the meaning?`,
    right: 'The long, piling-up lines feel as tiring as the lecture, and the short last line feels like the quiet of the night sky.',
    wrong: ['The lines get longer to show that the speaker enjoys the lecture more and more.', 'The short last line shows that the poet ran out of time.', 'The lines rhyme in pairs to imitate the stars.'],
    why: 'Free verse lets the line lengths follow the feeling: crowded and wearying inside, then simple and still outside.',
  },
  {
    prompt: 'A haiku is only three short lines. What does this form encourage the poet to do?',
    right: 'Capture a single moment or image with very few, carefully chosen words.',
    wrong: ['Tell a long story with many characters.', 'Argue a point with evidence and examples.', 'Rhyme every line with the one before.'],
    why: 'With so few syllables, a haiku focuses on one clear image, often from nature, and leaves the reader to feel its meaning.',
  },
];

function stanzasQ(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Count the lines. Two lines make a couplet, three a tercet, four a quatrain, six a sestet and eight an octave.'];
  if (d === 1) {
    const k = rng.pick(KINDS);
    if (rng.chance(0.5)) {
      return {
        prompt: `What is a stanza of **${NUMBER[k]}** lines called?`,
        parts: [part(mc(rng, KIND_NAME[k], rng.sample(KINDS.filter((x) => x !== k), 3).map((x) => KIND_NAME[x])))],
        hints,
        solution: [`A stanza of ${NUMBER[k]} lines is ${an(KIND_NAME[k].toLowerCase())}.`],
      };
    }
    return {
      prompt: `How many lines are in ${/^[aeiou]/i.test(KIND_NAME[k]) ? 'an' : 'a'} **${KIND_NAME[k].toLowerCase()}**?`,
      parts: [numPart(k)],
      hints,
      solution: [`${an(KIND_NAME[k].toLowerCase()).replace(/^a/, 'A')} has ${NUMBER[k]} lines.`],
    };
  }
  if (d === 2) {
    if (rng.chance(0.2)) {
      const ask = rng.pick([
        { q: 'How many quatrains are in a Shakespearean sonnet?', a: 3, why: 'A Shakespearean sonnet is three quatrains (12 lines) and a couplet (2 lines): 14 lines.' },
        { q: 'How many lines are in the sestet of a Petrarchan sonnet?', a: 6, why: 'A Petrarchan sonnet is an octave (8 lines) and a sestet (6 lines).' },
        { q: 'How many lines are in a sonnet?', a: 14, why: 'Every sonnet has fourteen lines.' },
      ]);
      return { prompt: ask.q, parts: [numPart(ask.a)], hints: ['A sonnet has 14 lines. A Shakespearean sonnet: three quatrains and a couplet. A Petrarchan sonnet: an octave and a sestet.'], solution: [ask.why] };
    }
    const e = rng.pick(STANZA_EXAMPLES);
    const k = exCount(e);
    const shown = e.verse ? verseBlock(e.verse) : block(verseMd(e.lines!));
    return {
      prompt: `${e.lead}\n\n${shown}\n\nWhat kind of stanza (or group of lines) is this?`,
      parts: [part(mc(rng, KIND_NAME[k], rng.sample(KINDS.filter((x) => x !== k), 3).map((x) => KIND_NAME[x])))],
      hints,
      solution: [`It has ${NUMBER[k]} lines, so it is ${an(KIND_NAME[k].toLowerCase())}.`],
    };
  }
  const m = rng.pick(FORM_MEANINGS);
  return {
    prompt: m.prompt,
    parts: [part(mc(rng, m.right, m.wrong))],
    hints: ['Think about what the shape of the form lets the poet do: where it pauses, where it repeats, where it turns.'],
    solution: [m.why],
  };
}

export const FORM_SKILLS: SkillDef[] = [
  skill({
    id: 'e10-poetic-forms',
    name: 'Forms of poetry',
    description: 'Recognize the sonnet (Shakespearean and Petrarchan), haiku, limerick, ballad, ode, elegy and free verse, and find a sonnet’s turn.',
    outcomes: OUT,
    lessonId: L,
    format: 'mc',
    gen: formsQ,
  }),
  skill({
    id: 'e10-stanzas',
    name: 'Stanzas and how form shapes meaning',
    description: 'Name couplets, tercets, quatrains, sestets and octaves, and explain how a poem’s form shapes its meaning.',
    outcomes: OUT,
    lessonId: L,
    format: 'free',
    gen: stanzasQ,
  }),
];

