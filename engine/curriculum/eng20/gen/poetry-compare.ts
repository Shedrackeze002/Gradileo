/**
 * Grade 11 English, lesson 2.4: Comparing Poems (11-B1). Pairs of public-domain poems on the same
 * subject, with questions on what they share and how their attitude, voice, imagery, form and
 * endings differ. Grade 10’s poems appear here only as partners in a comparison.
 */
import { mc, part, skill, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { DEATH_ALL, HOPE_ALL, MASK_ALL } from '../../eng10/gen/poems.ts';
import { titled } from '../../eng10/gen/texts.ts';
import { CORY_ALL, DULCE_LAST, EBB43_ALL, GRANDEUR_ALL, HOLY10_ALL, MAN_KILLED_ALL, SOLDIER_ALL, SONNET116_ALL, THRUSH_LAST, WAR_KIND_BABE, WAR_KIND_OPENING, WORLD_ALL, end, verseBlock, type Verse } from './poems.ts';
import { versesWithGap } from './poetry-conceit.ts';

const L = 'e11-2-4';
const OUT = ['11-B1'];

interface Ask {
  ask: string;
  right: string;
  wrong: string[];
  why: string;
}

interface Pair {
  a: Verse;
  /** How poem A is introduced (title and poet are added). */
  aNote: string;
  b: Verse;
  bNote: string;
  /** Poem B printed some other way, e.g. two stanzas with a gap. */
  bPassage?: string;
  /** The first question is always what the two poems share; the others compare them. */
  asks: Ask[];
}

const PAIRS: Pair[] = [
  {
    a: SOLDIER_ALL,
    aNote: 'written in 1914, at the start of the First World War',
    b: DULCE_LAST,
    bNote: 'the last stanza; Owen wrote it as a soldier in 1917, after describing a man dying from poison gas',
    asks: [
      {
        ask: 'What subject do both poems deal with?',
        right: 'A young soldier’s death in war',
        wrong: ['A journey home after peace is declared', 'Childhood memories of the countryside', 'A love affair in wartime'],
        why: 'Poem A imagines the speaker’s own death “in some corner of a foreign field”; Poem B describes a gassed soldier dying in a wagon.',
      },
      {
        ask: 'How do their attitudes to dying for one’s country differ?',
        right: 'Poem A makes it peaceful and noble; Poem B makes it agonizing and calls its glory a lie.',
        wrong: ['Both poems celebrate dying for one’s country as the noblest end a young man can have.', 'Poem A is angry and bitter about war; Poem B is calm and accepting of the soldier’s fate.', 'Both poems refuse to describe death at all, and speak only of life back at home.'],
        why: 'In Poem A the dead soldier becomes “a richer dust” and a heart “at peace”; Poem B calls Horace’s praise of such a death “The old Lie”.',
      },
      {
        ask: 'How does each poem’s imagery support its attitude?',
        right: 'Poem A uses gentle images of rivers, flowers and sun; Poem B uses graphic images of blood and gassed lungs.',
        wrong: ['Both poems use bright images of battle flags, marching bands and the cheering crowds of a parade.', 'Poem A uses graphic images of wounds and blood; Poem B uses peaceful images of home and fields.', 'Neither poem uses any images of the body: both describe only the landscape where soldiers fight.'],
        why: '“Washed by the rivers, blest by suns of home” against “the blood / Come gargling from the froth-corrupted lungs”.',
      },
    ],
  },
  {
    a: HOPE_ALL,
    aNote: '“abash” means silence; “in extremity” means in the worst of times',
    b: THRUSH_LAST,
    bNote: 'the last two stanzas; the poem is dated 31 December 1900, the last day of the century',
    asks: [
      {
        ask: 'What do both poems use a small bird to stand for?',
        right: 'Hope',
        wrong: ['Freedom from prison', 'Death', 'Springtime'],
        why: 'Poem A says outright that “Hope is the thing with feathers”; in Poem B the thrush’s song carries “Some blessed Hope”.',
      },
      {
        ask: 'How do the two speakers’ attitudes to hope differ?',
        right: 'Poem A’s speaker is sure hope never stops singing; Poem B’s speaker hears the thrush but cannot share its hope.',
        wrong: ['Both speakers are completely sure that hope will win in the end, whatever storms and winters come.', 'Poem A’s speaker has lost all hope in the storm; Poem B’s speaker is full of hope at the thrush’s song.', 'Neither speaker really notices the bird: both are too lost in their own thoughts to hear it sing.'],
        why: 'Poem A: hope “never stops at all”. Poem B: the thrush knows a hope “whereof he knew / And I was unaware”.',
      },
      {
        ask: 'How do the settings differ?',
        right: 'Poem A imagines the bird singing through gales and strange seas; Poem B sets a frail thrush in a winter dusk.',
        wrong: ['Both poems are set on a bright, sunny spring morning, with the birds singing high in the green trees.', 'Poem A is set in a quiet winter garden at dusk; Poem B is set on a ship sailing across a strange sea.', 'Both poems are set indoors, beside a fire, with the bird heard singing faintly through the window.'],
        why: 'Poem A’s bird is heard “in the gale”, “in the chillest land” and “on the strangest sea”; Poem B’s “aged thrush, frail, gaunt, and small” sings in “the growing gloom”.',
      },
    ],
  },
  {
    a: WORLD_ALL,
    aNote: '',
    b: GRANDEUR_ALL,
    bNote: '',
    asks: [
      {
        ask: 'What do both poems criticize?',
        right: 'People’s busy, money-minded lives, which cut them off from nature',
        wrong: ['The cruelty of war and the suffering it brings to ordinary families', 'The loss of a loved one and the long years of grief that follow it', 'The ugliness and harshness of nature compared with the modern city'],
        why: 'Poem A: “Getting and spending, we lay waste our powers”. Poem B: “all is seared with trade; bleared, smeared with toil”.',
      },
      {
        ask: 'How do their endings differ?',
        right: 'Poem A ends wishing for an old pagan faith; Poem B ends in hope that God constantly renews nature.',
        wrong: ['Both poems end in despair, sure that the modern world has destroyed nature for ever.', 'Poem A ends in hope that God renews nature; Poem B ends in despair at the ruined world.', 'Both poems end by praising trade and industry for bringing wealth and progress to the land.'],
        why: 'Poem A wants to see “Proteus coming from the sea”; Poem B ends with the Holy Ghost brooding over the world “with ah! bright wings”.',
      },
      {
        ask: 'What form do both poems share?',
        right: 'Both are Petrarchan sonnets, turning at line 9',
        wrong: ['Both are ballads, telling a story in short stanzas', 'Both are in free verse, with no regular rhyme or metre', 'Both are Shakespearean sonnets ending in a couplet'],
        why: 'Each has an octave rhyming ABBAABBA and a sestet that turns: “Great God!” in Poem A, “And for all this” in Poem B.',
      },
    ],
  },
  {
    a: MAN_KILLED_ALL,
    aNote: '“nipperkin” means a small cup of drink, “’list” means enlist and “traps” are belongings',
    b: WAR_KIND_OPENING,
    bNote: 'two stanzas',
    bPassage: versesWithGap(WAR_KIND_OPENING, WAR_KIND_BABE),
    asks: [
      {
        ask: 'What do both poems question?',
        right: 'The reasons people are given for killing and dying in war',
        wrong: ['Whether soldiers should be paid more for the work they do', 'Whether poems about war should rhyme or be written freely', 'The bravery and skill of the enemy soldiers on the battlefield'],
        why: 'Poem A’s soldier cannot say why he killed a man “because— / Because he was my foe”; Poem B mocks the comfort that “war is kind”.',
      },
      {
        ask: 'How do their voices differ?',
        right: 'Poem A’s speaker is a puzzled soldier talking plainly; Poem B’s speaker offers bitterly sarcastic comfort.',
        wrong: ['Both speakers are generals, praising war in grand and formal language before a great battle.', 'Poem A’s speaker is bitterly sarcastic; Poem B’s speaker is a puzzled soldier talking plainly.', 'Both speakers are children, asking their parents simple questions about why wars are fought.'],
        why: 'Poem A talks of inns and being “out of work”; Poem B tells a maiden and a babe, again and again, “Do not weep”.',
      },
      {
        ask: 'What kind of irony does each mainly use?',
        right: 'Poem A: situational irony (killing a would-be friend); Poem B: verbal irony (“War is kind”).',
        wrong: ['Both poems use only dramatic irony, letting the reader know more than any of the speakers.', 'Poem A: verbal irony (saying the opposite); Poem B: situational irony (an unexpected death).', 'Neither poem uses irony: both say exactly what they mean about war and the people it kills.'],
        why: 'Poem A’s irony lies in what happened; Poem B’s lies in a phrase that means the opposite of what it says.',
      },
    ],
  },
  {
    a: CORY_ALL,
    aNote: '“arrayed” means dressed; “in fine” means in short',
    b: MASK_ALL,
    bNote: '“guile” means trickery; “myriad subtleties” means countless clever ways of hiding the truth',
    asks: [
      {
        ask: 'What subject do both poems share?',
        right: 'The gap between how people appear to others and what they suffer inside',
        wrong: ['Wealth, and how ordinary people can earn it through years of hard work', 'The beauty of nature, and how it can comfort people who are lonely or sad', 'The history of a small town and the families who have lived there'],
        why: 'Richard Cory “glittered when he walked” but despaired; the “we” of Poem B smile “With torn and bleeding hearts”.',
      },
      {
        ask: 'How do their points of view differ?',
        right: 'Poem A is told from outside, by envious townspeople; Poem B is spoken from inside, by those hiding pain.',
        wrong: ['Both poems are told by the people who are suffering, speaking openly about the pain they feel inside.', 'Poem A is spoken by Richard Cory himself; Poem B is told by envious people watching from outside.', 'Poem A is told by a doctor who treated Cory; Poem B is told by a crowd laughing at the masked people.'],
        why: 'Poem A: “We people on the pavement looked at him”. Poem B: “We wear the mask that grins and lies”.',
      },
      {
        ask: 'How do their endings differ?',
        right: 'Poem A ends with a sudden act that reveals Cory’s despair; Poem B ends by repeating its resolve to wear the mask.',
        wrong: ['Both poems end with the speakers taking off their masks and telling the world how they really feel.', 'Poem A ends happily, with Cory finding peace at last; Poem B ends with the death of one of its speakers.', 'Both poems end with the poor townspeople becoming rich and finally as admired as the people they envied.'],
        why: 'Cory “Went home and put a bullet through his head”; Poem B closes, “But let the world dream otherwise, / We wear the mask!”',
      },
    ],
  },
  {
    a: SONNET116_ALL,
    aNote: '“impediments” are obstacles; a “bark” is a ship',
    b: EBB43_ALL,
    bNote: 'from “Sonnets from the Portuguese”',
    asks: [
      {
        ask: 'What do both sonnets celebrate?',
        right: 'A love that lasts beyond time and even death',
        wrong: ['A love that has ended in bitterness and regret', 'Love at first sight, sudden and overwhelming', 'Love of one’s country and its long history'],
        why: 'Poem A’s love “bears it out even to the edge of doom”; Poem B’s speaker will “love thee better after death”.',
      },
      {
        ask: 'How do their approaches differ?',
        right: 'Poem A defines true love in general, by what it is not; Poem B speaks to one beloved and counts the ways.',
        wrong: ['Both poems speak directly to one beloved from the first line to the last, praising that person’s beauty.', 'Poem A counts the many ways of loving one person; Poem B defines true love in general, by what it is not.', 'Both poems doubt that any love can last, and warn the reader that time destroys every feeling.'],
        why: 'Poem A: “Love is not love / Which alters”. Poem B: “How do I love thee? Let me count the ways.”',
      },
      {
        ask: 'How do the two sonnets differ in form?',
        right: 'Poem A is Shakespearean, ending in a couplet; Poem B is Petrarchan, with an octave and a sestet.',
        wrong: ['Both poems are Petrarchan sonnets, each with an octave followed by a sestet that turns.', 'Poem A is Petrarchan, with an octave and sestet; Poem B is Shakespearean, ending in a couplet.', 'Neither poem is a sonnet: both are written in free verse with lines of different lengths.'],
        why: 'Poem A’s three quatrains end in the couplet “If this be error …”; Poem B’s first eight lines rhyme ABBAABBA, followed by a sestet.',
      },
    ],
  },
  {
    a: HOLY10_ALL,
    aNote: 'the spelling is from the first printing, 1633',
    b: DEATH_ALL,
    bNote: '“civility” means politeness; “surmised” means guessed',
    asks: [
      {
        ask: 'What do both poems do with Death?',
        right: 'They personify Death, treating it as a person',
        wrong: ['They describe a real funeral and the people mourning', 'They argue that death does not really exist at all', 'They describe Death as a wild animal hunting its prey'],
        why: 'Poem A speaks to Death as “thou”; in Poem B Death is a gentleman who “kindly stopped for me”.',
      },
      {
        ask: 'How do their attitudes to Death differ?',
        right: 'Poem A defies Death and mocks its power; Poem B accepts Death calmly, as a courteous gentleman.',
        wrong: ['Both speakers are terrified of Death and beg it to pass them by for a few more years.', 'Poem A welcomes Death as a kind friend; Poem B defies Death and mocks its power over people.', 'Both poems say that Death is a slave to Fate, Chance and kings, with no power of its own.'],
        why: 'Poem A: “Death be not proud … thou art slave to Fate, Chance, kings”. Poem B: “He kindly stopped for me”, with “his civility”.',
      },
      {
        ask: 'How does each poem end?',
        right: 'Poem A declares that Death will die; Poem B’s speaker sees she has been heading for eternity for centuries.',
        wrong: ['Both poems end with the speaker coming back to life and returning home to the people who loved her.', 'Poem A ends with a calm carriage ride toward eternity; Poem B ends by declaring that Death will die.', 'Both poems end at a wedding, where the speaker is finally married to Death in front of all her friends.'],
        why: '“Death, thou shalt die” against “I first surmised the horses’ heads / Were toward eternity”.',
      },
    ],
  },
];

function poemHeading(v: Verse, label: string, note: string) {
  return `**${label}:** ${titled(v.poem)} by ${v.poem.author}${note ? ` (${note})` : ''}`;
}

function compareQ(rng: Rng, d: Difficulty): GenOutput {
  const p = rng.pick(PAIRS);
  const n = d === 1 ? 1 : d === 2 ? 2 : 3;
  const asks = n === 3 ? p.asks : [p.asks[0], ...rng.sample(p.asks.slice(1), n - 1)];
  const prompt = [
    `Read the two poems, then answer ${n === 1 ? 'the question' : `the ${n === 2 ? 'two' : 'three'} questions`}.`,
    poemHeading(p.a, 'Poem A', p.aNote),
    verseBlock(p.a),
    poemHeading(p.b, 'Poem B', p.bNote),
    p.bPassage ?? verseBlock(p.b),
  ].join('\n\n');
  return {
    prompt,
    parts: asks.map((a, i) => part(mc(rng, a.right, a.wrong), { label: n === 1 ? a.ask : `${i + 1}. ${a.ask}` })),
    hints: ['First find what the poems share; then compare them point by point: attitude, speaker, imagery, form and ending.'],
    solution: asks.map((a, i) => `${n === 1 ? '' : `${i + 1}. `}${end(a.right)} ${a.why}`),
  };
}

export const COMPARE_SKILLS: SkillDef[] = [
  skill({
    id: 'e11-compare-poems',
    name: 'Comparing poems',
    description: 'Compare how two poems treat the same subject through attitude, voice, imagery, form and tone.',
    outcomes: OUT,
    lessonId: L,
    format: 'mc',
    gen: compareQ,
  }),
];
