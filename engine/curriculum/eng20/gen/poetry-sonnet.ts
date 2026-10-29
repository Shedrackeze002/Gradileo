/**
 * Grade 11 English, lesson 2.2: The Sonnet (11-B1). Petrarchan and Shakespearean sonnets, their
 * rhyme schemes and where they turn; and the variations that bring an iambic line to life: the
 * trochee at the start of a line, the caesura and enjambment. Every scansion used is one that
 * teachers agree on; lines whose stresses are disputed are left out.
 */
import { fixedChoice, mc, part, skill, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { titled } from '../../eng10/gen/texts.ts';
import {
  CHAPMAN_ALL, DOUGLASS_ALL, DUCHESS_OPENING, GRANDEUR_ALL, HOLY10_ALL, LONDON_ALL, MILTON19_ALL, MUST_DIE_ALL, SONNET116_ALL, ULYSSES_END, WORLD_ALL,
  end, linesOf, verseBlock, withBold, type Verse,
} from './poems.ts';

const L = 'e11-2-2';
const OUT = ['11-B1'];

interface Ask {
  ask: string;
  right: string;
  wrong: string[];
  why: string;
}

// ============================================================================ the sonnet

const TERMS: Ask[] = [
  {
    ask: 'A sonnet is made of an **octave** rhyming ABBAABBA and a **sestet** rhyming CDECDE. Which kind of sonnet is it?',
    right: 'Petrarchan (Italian)',
    wrong: ['Shakespearean (English)', 'Free verse', 'A ballad'],
    why: 'An octave (eight lines) followed by a sestet (six lines), with the octave rhyming ABBAABBA, is the Petrarchan or Italian sonnet.',
  },
  {
    ask: 'A sonnet is made of three **quatrains** rhyming ABAB CDCD EFEF and a final **couplet** rhyming GG. Which kind of sonnet is it?',
    right: 'Shakespearean (English)',
    wrong: ['Petrarchan (Italian)', 'Free verse', 'A ballad'],
    why: 'Three four-line quatrains and a closing rhymed couplet make the Shakespearean or English sonnet.',
  },
  {
    ask: 'In a Petrarchan sonnet, where does the **volta** (the turn) usually come?',
    right: 'At line 9, where the octave gives way to the sestet',
    wrong: ['In the very first line', 'In the final couplet', 'At line 5, after the first quatrain'],
    why: 'The octave sets out a problem or situation; at line 9 the sestet turns to answer it or see it differently.',
  },
  {
    ask: 'In a Shakespearean sonnet, what does the final **couplet** usually do?',
    right: 'It sums up the poem or gives it a last twist.',
    wrong: ['It introduces a completely new subject.', 'It repeats the first line word for word.', 'It sets out the problem the poem will explore.'],
    why: 'After three quatrains develop the idea, the two rhyming lines at the end clinch it: a summary, a conclusion or a surprising turn.',
  },
  {
    ask: 'What is the **volta** of a sonnet?',
    right: 'The turn: the point where the poem’s thought or feeling shifts',
    wrong: ['The rhyme scheme of its last six lines', 'A line with ten syllables', 'The title of the poem'],
    why: 'Volta is Italian for “turn”. Every sonnet has one: a shift in argument, mood or point of view.',
  },
  {
    ask: 'How many lines does a sonnet have, and in what metre are English sonnets usually written?',
    right: 'Fourteen lines, usually in iambic pentameter',
    wrong: ['Twelve lines, in free verse', 'Sixteen lines, in iambic tetrameter', 'Fourteen lines, with no regular metre'],
    why: 'A sonnet has fourteen lines; in English they are usually iambic pentameter, five da-DUM beats to a line.',
  },
];

type Kind = 'petrarchan' | 'shakespearean';
const KIND_NAME: Record<Kind, string> = { petrarchan: 'A Petrarchan (Italian) sonnet', shakespearean: 'A Shakespearean (English) sonnet' };

interface Sonnet {
  verse: Verse;
  lead: string;
  kind: Kind;
  /** The rhyme scheme of lines 1 to 8, when every rhyme is a full rhyme today. */
  octave?: string;
  why: string;
}

const SONNETS: Sonnet[] = [
  {
    verse: MILTON19_ALL,
    lead: `${titled(MILTON19_ALL.poem)} by John Milton, who had gone blind (a “talent” is a coin in a story Jesus told about a servant who buried his instead of using it; “fondly” means foolishly):`,
    kind: 'petrarchan',
    octave: 'ABBAABBA',
    why: 'The first eight lines rhyme spent, wide, hide, bent, present, chide, denied, prevent: ABBAABBA. The last six rhyme need, best, state, speed, rest, wait: CDECDE. An octave and a sestet make it Petrarchan.',
  },
  {
    verse: WORLD_ALL,
    lead: `${titled(WORLD_ALL.poem)} by William Wordsworth (a “boon” is a gift; a “lea” is a meadow):`,
    kind: 'petrarchan',
    octave: 'ABBAABBA',
    why: 'The first eight lines rhyme soon, powers, ours, boon, moon, hours, flowers, tune: ABBAABBA. The last six rhyme be, outworn, lea, forlorn, sea, horn: CDCDCD. An octave and a sestet make it Petrarchan.',
  },
  {
    verse: GRANDEUR_ALL,
    lead: `${titled(GRANDEUR_ALL.poem)} by Gerard Manley Hopkins (“reck his rod” means heed God’s authority):`,
    kind: 'petrarchan',
    octave: 'ABBAABBA',
    why: 'The octave rhymes God, foil, oil, rod, trod, toil, soil, shod: ABBAABBA. The sestet rhymes spent, things, went, springs, bent, wings: CDCDCD. It is Petrarchan.',
  },
  {
    verse: DOUGLASS_ALL,
    lead: `${titled(DOUGLASS_ALL.poem)} by Paul Laurence Dunbar, written to Frederick Douglass, the great speaker against slavery, after his death (a “bark” is a ship):`,
    kind: 'petrarchan',
    octave: 'ABBAABBA',
    why: 'The octave rhymes days, know, ago, ways, amaze, flow, fro, dispraise: ABBAABBA. The sestet rhymes swarm, stark, storm, bark, form, dark: CDCDCD. The break after line 8 marks the octave and sestet of a Petrarchan sonnet.',
  },
  {
    verse: MUST_DIE_ALL,
    lead: `${titled(MUST_DIE_ALL.poem)} by Claude McKay, written in a year of violent attacks on Black communities in the United States:`,
    kind: 'shakespearean',
    octave: 'ABABCDCD',
    why: 'It rhymes hogs, spot, dogs, lot (ABAB); die, shed, defy, dead (CDCD); foe, brave, blow, grave (EFEF); then pack, back (GG). Three quatrains and a couplet make it Shakespearean.',
  },
  {
    verse: SONNET116_ALL,
    lead: `William Shakespeare’s ${titled(SONNET116_ALL.poem)} (“impediments” are obstacles; a “bark” is a ship):`,
    kind: 'shakespearean',
    why: 'Its fourteen lines fall into three quatrains, each developing the idea of constant love, and a closing couplet, “If this be error and upon me prov’d, / I never writ, nor no man ever lov’d”. That is the Shakespearean form.',
  },
];

const OCTAVE_CHOICES = ['ABBAABBA', 'ABABCDCD', 'AABBCCDD', 'ABCABCAB'];

interface Volta {
  verse: Verse;
  lead: string;
  where: Ask;
  what: Ask;
}

const VOLTAS: Volta[] = [
  {
    verse: MILTON19_ALL,
    lead: `${titled(MILTON19_ALL.poem)} by John Milton, who had gone blind (a “talent” is a coin in a story Jesus told about a servant who buried his instead of using it; “fondly” means foolishly):`,
    where: {
      ask: 'Where does the poem turn?',
      right: 'In the middle of line 8: “But Patience, to prevent / That murmur, soon replies”',
      wrong: ['At line 1: “When I consider how my light is spent”', 'At line 4: “Lodged with me useless”', 'At the last line: “They also serve who only stand and wait.”'],
      why: 'Milton’s turn comes half a line early, when Patience interrupts the speaker’s question.',
    },
    what: {
      ask: 'What changes at the turn?',
      right: 'The speaker’s anxious complaint that blindness stops him serving God is answered by Patience: God values those who wait in faith.',
      wrong: ['The speaker regains his sight and returns to work.', 'The speaker turns from praising God to rebelling against him.', 'The speaker stops thinking about God and describes the weather.'],
      why: 'Up to the turn he frets (“Doth God exact day-labor, light denied?”); after it Patience replies that “They also serve who only stand and wait.”',
    },
  },
  {
    verse: WORLD_ALL,
    lead: `${titled(WORLD_ALL.poem)} by William Wordsworth (a “boon” is a gift; a “lea” is a meadow; Proteus and Triton are Greek sea gods):`,
    where: {
      ask: 'Where does the poem turn?',
      right: 'In line 9: “Great God! I’d rather be / A Pagan”',
      wrong: ['At line 1: “The world is too much with us”', 'At line 5: “This Sea that bares her bosom to the moon”', 'At the last line: “Or hear old Triton blow his wreathed horn.”'],
      why: 'The turn comes at line 9, with the outburst “Great God!”, exactly where the sestet begins.',
    },
    what: {
      ask: 'What changes at the turn?',
      right: 'A complaint that people are too busy getting and spending to feel nature becomes a wish for an old pagan faith that would let him feel its wonder.',
      wrong: ['Love of nature turns into love of money.', 'Despair turns into joy at the beauty of the sea.', 'Praise of the modern world turns into fear of the sea.'],
      why: 'The octave laments that “we are out of tune”; the sestet longs to be “A Pagan” who could still see Proteus and hear Triton.',
    },
  },
  {
    verse: GRANDEUR_ALL,
    lead: `${titled(GRANDEUR_ALL.poem)} by Gerard Manley Hopkins (“reck his rod” means heed God’s authority):`,
    where: {
      ask: 'Where does the poem turn?',
      right: 'At line 9: “And for all this, nature is never spent”',
      wrong: ['At line 1: “The world is charged with the grandeur of God.”', 'At line 5: “Generations have trod, have trod, have trod”', 'At the last line: “World broods with warm breast and with ah! bright wings.”'],
      why: 'The sestet opens with “And for all this”, signalling the turn at line 9.',
    },
    what: {
      ask: 'What changes at the turn?',
      right: 'Grief that people have scarred and dulled the earth gives way to hope that nature is always renewed by God.',
      wrong: ['Hope gives way to despair about the future.', 'Praise of trade gives way to praise of industry.', 'A description of morning gives way to a description of night.'],
      why: 'The octave mourns that “all is seared with trade”; the sestet answers that “There lives the dearest freshness deep down things”.',
    },
  },
  {
    verse: CHAPMAN_ALL,
    lead: `${titled(CHAPMAN_ALL.poem)} by John Keats, about first reading George Chapman’s translation of Homer (“demesne” means realm; “ken” means sight):`,
    where: {
      ask: 'Where does the poem turn?',
      right: 'At line 9: “Then felt I like some watcher of the skies”',
      wrong: ['At line 1: “Much have I traveled in the realms of gold”', 'At line 5: “Oft of one wide expanse had I been told”', 'At the last line: “Silent, upon a peak in Darien.”'],
      why: '“Then” at line 9 moves from what he had read before to how he felt when he finally read Chapman’s Homer.',
    },
    what: {
      ask: 'What changes at the turn?',
      right: 'An account of how widely he has read gives way to the thrill of discovering Homer through Chapman.',
      wrong: ['Love of travel gives way to fear of the sea.', 'Joy gives way to disappointment.', 'Praise of Chapman gives way to criticism of him.'],
      why: 'The octave tours the “realms of gold” he has read; the sestet compares his discovery to an astronomer’s new planet and an explorer’s first sight of the Pacific.',
    },
  },
  {
    verse: DOUGLASS_ALL,
    lead: `${titled(DOUGLASS_ALL.poem)} by Paul Laurence Dunbar, written to Frederick Douglass, the great speaker against slavery, after his death (a “bark” is a ship; “stark” here means lifeless):`,
    where: {
      ask: 'Where does the poem turn?',
      right: 'At line 9: “Now, when the waves of swift dissension swarm”',
      wrong: ['At line 1: “Ah, Douglass, we have fall’n on evil days”', 'At line 5: “And all the country heard thee with amaze.”', 'At the last line: “To give us comfort through the lonely dark.”'],
      why: 'The sestet begins with “Now, when …” and turns from description to a plea.',
    },
    what: {
      ask: 'What changes at the turn?',
      right: 'Lament for a troubled present gives way to a direct plea for Douglass’s guiding voice and strength.',
      wrong: ['Praise of Douglass gives way to criticism of him.', 'A plea for help gives way to a celebration of victory.', 'Talk of the past gives way to a description of a real ship.'],
      why: 'The octave mourns “evil days”; the sestet cries, “Oh, for thy voice high-sounding o’er the storm”.',
    },
  },
  {
    verse: MUST_DIE_ALL,
    lead: `${titled(MUST_DIE_ALL.poem)} by Claude McKay, written in a year of violent attacks on Black communities in the United States:`,
    where: {
      ask: 'Where does the poem turn from how not to die to a call to fight together?',
      right: 'At line 9: “O kinsmen! we must meet the common foe!”',
      wrong: ['At line 1: “If we must die, let it not be like hogs”', 'At line 5: “If we must die, O let us nobly die”', 'At the last line: “Pressed to the wall, dying, but fighting back!”'],
      why: 'Line 9 addresses “kinsmen” directly and calls them to meet “the common foe” together.',
    },
    what: {
      ask: 'What does the final couplet do?',
      right: 'It sums up the poem’s resolve: to face the enemy with courage and die fighting back.',
      wrong: ['It admits that resistance is hopeless and urges surrender.', 'It introduces a new subject: the beauty of the city.', 'It asks the enemy for mercy.'],
      why: '“Like men we’ll face the murderous, cowardly pack, / Pressed to the wall, dying, but fighting back!” clinches the argument in two rhyming lines.',
    },
  },
  {
    verse: SONNET116_ALL,
    lead: `William Shakespeare’s ${titled(SONNET116_ALL.poem)} (“impediments” are obstacles; a “bark” is a ship; “doom” here means Judgement Day):`,
    where: {
      ask: 'What does “Love’s not Time’s fool” (line 9) mean?',
      right: 'Love is not at the mercy of time, even though youth and beauty fade.',
      wrong: ['Love makes people foolish as they grow old.', 'Time is a fool who does not understand love.', 'Love is a waste of time.'],
      why: 'Time’s “bending sickle” cuts down “rosy lips and cheeks”, but love “alters not with his brief hours and weeks”.',
    },
    what: {
      ask: 'What does the final couplet do?',
      right: 'It stakes everything on the poem’s claim: if this view of love is wrong, then he never wrote and no one ever loved.',
      wrong: ['It admits that love does change with time.', 'It describes the speaker’s wedding day.', 'It begins a new argument about beauty.'],
      why: '“If this be error and upon me prov’d, / I never writ, nor no man ever lov’d”: since he plainly has written, and people plainly have loved, the claim must be true.',
    },
  },
];

function sonnetQ(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const t = rng.pick(TERMS);
    return {
      prompt: t.ask,
      parts: [part(mc(rng, t.right, t.wrong))],
      hints: ['Petrarchan: an octave (8 lines) and a sestet (6 lines), turning at line 9. Shakespearean: three quatrains and a couplet.'],
      solution: [t.why],
    };
  }
  if (d === 2) {
    const s = rng.pick(SONNETS);
    if (s.octave && rng.chance(0.5)) {
      return {
        prompt: `${s.lead}\n\n${verseBlock(s.verse)}\n\nWhat is the rhyme scheme of the first eight lines?`,
        parts: [part(mc(rng, s.octave, OCTAVE_CHOICES.filter((c) => c !== s.octave)))],
        hints: ['Write the last word of each of the first eight lines, and give the same letter to lines that rhyme.'],
        solution: [s.why],
      };
    }
    const choices = [KIND_NAME.petrarchan, KIND_NAME.shakespearean, 'Not a sonnet: it has no regular rhyme scheme'];
    return {
      prompt: `${s.lead}\n\n${verseBlock(s.verse)}\n\nWhich kind of sonnet is this?`,
      parts: [part(fixedChoice(choices, s.kind === 'petrarchan' ? 0 : 1))],
      hints: ['Look for a break or turn after line 8 (Petrarchan) or a rhyming couplet at the end (Shakespearean), and check the rhyme scheme.'],
      solution: [s.why],
    };
  }
  const v = rng.pick(VOLTAS);
  return {
    prompt: `${v.lead}\n\n${verseBlock(v.verse)}\n\nAnswer both questions.`,
    parts: [part(mc(rng, v.where.right, v.where.wrong), { label: `1. ${v.where.ask}` }), part(mc(rng, v.what.right, v.what.wrong), { label: `2. ${v.what.ask}` })],
    hints: ['Look for a word such as “But”, “Yet”, “Then” or “Now”, or a sudden change of tone, near line 9 or at the closing couplet.'],
    solution: [`1. ${end(v.where.right)} ${v.where.why}`, `2. ${end(v.what.right)} ${v.what.why}`],
  };
}

// ============================================================================ variations in metre

const METRE_TERMS: Ask[] = [
  { ask: 'Which term names a pause in the middle of a line of poetry, usually marked by punctuation?', right: 'Caesura', wrong: ['Enjambment', 'Trochee', 'Couplet'], why: 'A caesura is a pause within a line, often at a full stop, semicolon or comma.' },
  { ask: 'Which term names a sentence that runs on past the end of a line without a pause?', right: 'Enjambment', wrong: ['Caesura', 'Spondee', 'End-stopped line'], why: 'In enjambment the sense and grammar carry straight over the line break into the next line.' },
  { ask: 'Which term names a foot of poetry with a stressed syllable followed by an unstressed one (DUM-da), as in “garden”?', right: 'Trochee', wrong: ['Iamb', 'Spondee', 'Caesura'], why: 'A trochee is DUM-da, the reverse of an iamb (da-DUM).' },
  { ask: 'Which term names a foot of poetry with two stressed syllables (DUM-DUM)?', right: 'Spondee', wrong: ['Trochee', 'Iamb', 'Enjambment'], why: 'A spondee has two stresses side by side, which slows a line and gives it weight.' },
  { ask: 'Which term names a line that ends with a pause, at a punctuation mark such as a full stop or semicolon?', right: 'End-stopped line', wrong: ['Enjambment', 'Spondee', 'Trochee'], why: 'An end-stopped line finishes its phrase or sentence at the line break.' },
  { ask: 'A poet writing in iambic pentameter starts a line with a trochee instead of an iamb. What is this variation called?', right: 'A trochaic inversion (a reversed first foot)', wrong: ['A caesura', 'An end-stopped line', 'A rhyming couplet'], why: 'Swapping the first iamb (da-DUM) for a trochee (DUM-da) is called trochaic inversion; it puts a strong stress on the first word.' },
];

interface Ending {
  verse: Verse;
  /** The line in bold, as printed. */
  line: string;
  enjambed: boolean;
  lead: string;
  why: string;
}

const ENDINGS: Ending[] = [
  { verse: linesOf(MILTON19_ALL, 3, 4), line: 'And that one talent which is death to hide', enjambed: true, lead: `From ${titled(MILTON19_ALL.poem)} by John Milton:`, why: 'There is no punctuation at “hide”, and the sentence carries straight on: the talent is “Lodged with me useless”.' },
  { verse: linesOf(WORLD_ALL, 3, 4), line: 'Little we see in nature that is ours;', enjambed: false, lead: `From ${titled(WORLD_ALL.poem)} by William Wordsworth:`, why: 'The line ends with a semicolon: the thought is complete and the voice pauses at the line break.' },
  { verse: linesOf(WORLD_ALL, 9, 10), line: 'It moves us not—Great God! I’d rather be', enjambed: true, lead: `From ${titled(WORLD_ALL.poem)} by William Wordsworth:`, why: '“I’d rather be” needs the next line to finish it: “A Pagan suckled in a creed outworn”.' },
  { verse: linesOf(CHAPMAN_ALL, 9, 10), line: 'Then felt I like some watcher of the skies', enjambed: true, lead: `From ${titled(CHAPMAN_ALL.poem)} by John Keats:`, why: 'No punctuation, and the comparison runs on: the watcher of the skies is one “When a new planet swims into his ken”.' },
  { verse: linesOf(CHAPMAN_ALL, 9, 10), line: 'When a new planet swims into his ken;', enjambed: false, lead: `From ${titled(CHAPMAN_ALL.poem)} by John Keats:`, why: 'The line ends with a semicolon, closing the first comparison before the next begins.' },
  { verse: linesOf(ULYSSES_END, 8, 9), line: 'Made weak by time and fate, but strong in will', enjambed: true, lead: `From ${titled(ULYSSES_END.poem)} by Alfred, Lord Tennyson:`, why: '“Strong in will” runs on to say what the will is for: “To strive, to seek, to find, and not to yield.”' },
  { verse: linesOf(ULYSSES_END, 8, 9), line: 'To strive, to seek, to find, and not to yield.', enjambed: false, lead: `From ${titled(ULYSSES_END.poem)} by Alfred, Lord Tennyson:`, why: 'The line, and the poem, end with a full stop.' },
  { verse: linesOf(SONNET116_ALL, 1, 2), line: 'Let me not to the marriage of true minds', enjambed: true, lead: `From William Shakespeare’s ${titled(SONNET116_ALL.poem)}:`, why: 'The sentence needs the next line, “Admit impediments”, to make sense.' },
  { verse: linesOf(SONNET116_ALL, 3, 4), line: 'Or bends with the remover to remove:', enjambed: false, lead: `From William Shakespeare’s ${titled(SONNET116_ALL.poem)}:`, why: 'The colon ends the line with a pause before the next thought, “O, no!”.' },
  { verse: linesOf(DUCHESS_OPENING, 4, 5), line: 'Worked busily a day, and there she stands.', enjambed: false, lead: `From ${titled(DUCHESS_OPENING.poem)} by Robert Browning:`, why: 'The full stop at “stands” ends the sentence with the line.' },
  { verse: linesOf(DUCHESS_OPENING, 5, 6), line: 'Will’t please you sit and look at her? I said', enjambed: true, lead: `From ${titled(DUCHESS_OPENING.poem)} by Robert Browning:`, why: '“I said” runs straight on into the next line: “I said / ‘Frà Pandolf’ by design”.' },
];

interface Pause {
  verse: Verse;
  line: string;
  /** The word just before the strongest pause, and other words in the line to offer. */
  after: string;
  others: string[];
  lead: string;
}

const PAUSES: Pause[] = [
  { verse: linesOf(MILTON19_ALL, 8, 8), line: 'I fondly ask. But Patience, to prevent', after: 'ask', others: ['fondly', 'Patience', 'to'], lead: `From ${titled(MILTON19_ALL.poem)} by John Milton:` },
  { verse: linesOf(MILTON19_ALL, 12, 12), line: 'Is kingly; thousands at his bidding speed,', after: 'kingly', others: ['thousands', 'his', 'at'], lead: `From ${titled(MILTON19_ALL.poem)} by John Milton:` },
  { verse: linesOf(GRANDEUR_ALL, 4, 4), line: 'Crushed. Why do men then now not reck his rod?', after: 'Crushed', others: ['men', 'now', 'reck'], lead: `From ${titled(GRANDEUR_ALL.poem)} by Gerard Manley Hopkins:` },
  { verse: linesOf(SONNET116_ALL, 2, 2), line: 'Admit impediments. Love is not love', after: 'impediments', others: ['Admit', 'Love', 'is'], lead: `From William Shakespeare’s ${titled(SONNET116_ALL.poem)}:` },
  { verse: linesOf(HOLY10_ALL, 14, 14), line: 'And death shall be no more; death, thou shalt die.', after: 'more', others: ['death', 'shall', 'thou'], lead: `From John Donne’s ${titled(HOLY10_ALL.poem)}:` },
  { verse: linesOf(ULYSSES_END, 4, 4), line: 'Tho’ much is taken, much abides; and tho’', after: 'abides', others: ['taken', 'much', 'is'], lead: `From ${titled(ULYSSES_END.poem)} by Alfred, Lord Tennyson:` },
];

interface Inversion {
  verse: Verse;
  lead: string;
  /** The first foot, a trochee; or null for a regular line. */
  first: string | null;
  effect?: Ask;
  why: string;
}

const INVERSIONS: Inversion[] = [
  {
    verse: linesOf(WORLD_ALL, 1, 2),
    lead: `The opening of ${titled(WORLD_ALL.poem)} by William Wordsworth. Look at the second line:`,
    first: 'Getting',
    effect: { ask: 'What is the effect of the trochee here?', right: 'It throws a heavy stress onto the restless activity of “Getting and spending”, making it sound busy and relentless.', wrong: ['It slows the line to a calm, peaceful pace.', 'It makes the line rhyme with the line before.', 'It hides the meaning so that the reader passes over it.'], why: '“GET-ting and SPEND-ing” hammers the stress onto the very activity the poem condemns.' },
    why: 'The line begins “GET-ting” (DUM-da), a trochee, where the iambic pattern would lead us to expect da-DUM; then it settles back into the iambic beat.',
  },
  {
    verse: linesOf(LONDON_ALL, 1, 1),
    lead: `The first line of ${titled(LONDON_ALL.poem)} by William Wordsworth:`,
    first: 'Milton!',
    effect: { ask: 'What is the effect of the trochee here?', right: 'The name bursts out with a stress on its first syllable, like an urgent cry for help.', wrong: ['It makes the line sound sleepy and slow.', 'It shows that the speaker has forgotten Milton’s name.', 'It turns the line into prose.'], why: 'Starting with “MIL-ton!” rather than an unstressed syllable makes the poem open with a call.' },
    why: 'The line begins “MIL-ton!” (DUM-da), a trochee, then continues in iambs: “thou SHOULD’ST | be LIV | ing AT | this HOUR”.',
  },
  {
    verse: linesOf(MILTON19_ALL, 3, 4),
    lead: `From ${titled(MILTON19_ALL.poem)} by John Milton, who had gone blind. Look at the second line:`,
    first: 'Lodged with',
    effect: { ask: 'What is the effect of the trochee here?', right: 'The stress lands hard on “Lodged”, emphasizing that his gift is stuck and lying useless.', wrong: ['It makes the speaker sound cheerful.', 'It speeds the line up to show he is busy.', 'It hides the speaker’s worry.'], why: 'The heavy first syllable makes the talent seem stuck, “Lodged with me useless”.' },
    why: 'The line begins “LODGED with” (DUM-da), a trochee, then returns to iambs: “me USE | less, THOUGH | my SOUL | more BENT”.',
  },
  {
    verse: linesOf(MILTON19_ALL, 13, 13),
    lead: `Line 13 of ${titled(MILTON19_ALL.poem)} by John Milton (“post” means ride swiftly):`,
    first: null,
    why: 'It is perfectly regular: “and POST | o’er LAND | and O | cean WITH | out REST”: five iambs.',
  },
  {
    verse: linesOf(MILTON19_ALL, 14, 14),
    lead: `The last line of ${titled(MILTON19_ALL.poem)} by John Milton:`,
    first: null,
    why: 'It is perfectly regular: “they AL | so SERVE | who ON | ly STAND | and WAIT”: five iambs.',
  },
];

function metreQ(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const t = rng.pick(METRE_TERMS);
    return {
      prompt: t.ask,
      parts: [part(mc(rng, t.right, t.wrong))],
      hints: ['An iamb is da-DUM, a trochee DUM-da, a spondee DUM-DUM. A caesura is a pause inside a line; enjambment runs on past its end.'],
      solution: [t.why],
    };
  }
  if (d === 2) {
    if (rng.chance(0.5)) {
      const e = rng.pick(ENDINGS);
      return {
        prompt: `${e.lead}\n\n${verseBlock(withBold(e.verse, e.line))}\n\nIs the line in bold end-stopped or enjambed?`,
        parts: [part(fixedChoice(['End-stopped: it ends with a pause', 'Enjambed: it runs on into the next line'], e.enjambed ? 1 : 0))],
        hints: ['Look at the end of the line. Is there punctuation that closes the thought, or does the sentence need the next line to finish?'],
        solution: [e.why, `So the line is ${e.enjambed ? 'enjambed' : 'end-stopped'}.`],
      };
    }
    const p = rng.pick(PAUSES);
    const label = (w: string) => `After “${w}”`;
    return {
      prompt: `${p.lead}\n\n${verseBlock(p.verse)}\n\nWhere does the strongest pause (the caesura) fall in this line?`,
      parts: [part(mc(rng, label(p.after), p.others.map(label)))],
      hints: ['Look for punctuation inside the line. A full stop or semicolon makes a stronger pause than a comma.'],
      solution: [`The strongest punctuation inside the line comes after “${p.after}”, so the caesura falls there.`],
    };
  }
  const v = rng.pick(INVERSIONS);
  const line = v.verse.lines.filter(Boolean).slice(-1)[0];
  const firstWords = line.split(/\s+/).map((w) => w.replace(/[.,;:!?]+$/, ''));
  const regular = 'None: every foot is an iamb';
  const choices = [
    `The first foot: “${v.first ?? firstWords[0]}”`,
    `The last foot: “${firstWords.slice(-2).join(' ')}”`,
    `A foot in the middle: “${firstWords.slice(3, 5).join(' ')}”`,
    regular,
  ];
  const right = v.first ? choices[0] : regular;
  const parts = [part(mc(rng, right, choices.filter((c) => c !== right)), { label: '1. Which foot is a trochee (DUM-da) instead of an iamb (da-DUM)?' })];
  const solution = [`1. ${v.why}`];
  if (v.effect) {
    parts.push(part(mc(rng, v.effect.right, v.effect.wrong), { label: `2. ${v.effect.ask}` }));
    solution.push(`2. ${end(v.effect.right)} ${v.effect.why}`);
  }
  return {
    prompt: `${v.lead}\n\n${verseBlock(v.verse)}\n\nThe poem is in iambic pentameter (five da-DUM feet a line). Answer ${v.effect ? 'both questions' : 'the question'} about the ${v.verse.lines.filter(Boolean).length > 1 ? 'last line' : 'line'}.`,
    parts,
    hints: ['Say the line aloud and tap the beats. A word like “GAR-den”, stressed on its first syllable, at the start of the line makes a trochee.'],
    solution,
  };
}

export const SONNET_SKILLS: SkillDef[] = [
  skill({
    id: 'e11-sonnet',
    name: 'The sonnet',
    description: 'Tell Petrarchan from Shakespearean sonnets by their structure and rhyme, and find and explain the volta.',
    outcomes: OUT,
    lessonId: L,
    format: 'mc',
    gen: sonnetQ,
  }),
  skill({
    id: 'e11-meter-variation',
    name: 'Variations in metre',
    description: 'Recognize trochaic inversion, spondees, caesura and enjambment in iambic verse, and explain their effect.',
    outcomes: OUT,
    lessonId: L,
    format: 'mc',
    gen: metreQ,
  }),
];

