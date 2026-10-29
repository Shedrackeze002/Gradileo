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
        right: 'Poem A presents it as peaceful and noble; Poem B presents it as agonizing and calls the glory of it a lie.',
        wrong: ['Both poems celebrate dying for one’s country.', 'Poem A is angry about war; Poem B is calm and accepting.', 'Both poems refuse to describe death at all.'],
        why: 'In Poem A the dead soldier becomes “a richer dust” and a heart “at peace”; Poem B calls Horace’s praise of such a death “The old Lie”.',
      },
      {
        ask: 'How does each poem’s imagery support its attitude?',
        right: 'Poem A uses gentle images of English rivers, flowers and sunshine; Poem B uses graphic images of a body in a wagon and blood from gassed lungs.',
        wrong: ['Both use images of battle flags and parades.', 'Poem A uses graphic images of wounds; Poem B uses peaceful images of home.', 'Neither poem uses any images of the body.'],
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
        right: 'Poem A’s speaker is sure hope never stops singing, even in storms; Poem B’s speaker hears the thrush’s joy but cannot share its hope.',
        wrong: ['Both speakers are sure that hope will win.', 'Poem A’s speaker has lost all hope; Poem B’s speaker is full of it.', 'Neither speaker notices the bird.'],
        why: 'Poem A: hope “never stops at all”. Poem B: the thrush knows a hope “whereof he knew / And I was unaware”.',
      },
      {
        ask: 'How do the settings differ?',
        right: 'Poem A imagines the bird singing through gales and on strange seas; Poem B places a frail, real thrush in a bleak winter dusk.',
        wrong: ['Both are set on a sunny spring morning.', 'Poem A is set in a winter garden; Poem B on a ship at sea.', 'Both are set indoors.'],
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
        wrong: ['The cruelty of war', 'The loss of a loved one', 'The ugliness of nature'],
        why: 'Poem A: “Getting and spending, we lay waste our powers”. Poem B: “all is seared with trade; bleared, smeared with toil”.',
      },
      {
        ask: 'How do their endings differ?',
        right: 'Poem A ends wishing for an old pagan faith to feel nature’s wonder; Poem B ends in hope that nature is constantly renewed by God.',
        wrong: ['Both end in despair.', 'Poem A ends in hope; Poem B ends in despair.', 'Both end by praising trade and industry.'],
        why: 'Poem A wants to see “Proteus coming from the sea”; Poem B ends with the Holy Ghost brooding over the world “with ah! bright wings”.',
      },
      {
        ask: 'What form do both poems share?',
        right: 'Both are Petrarchan sonnets, turning at line 9',
        wrong: ['Both are ballads', 'Both are free verse', 'Both are Shakespearean sonnets ending in a couplet'],
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
        wrong: ['Whether soldiers should be paid more', 'Whether war poetry should rhyme', 'The bravery of the enemy'],
        why: 'Poem A’s soldier cannot say why he killed a man “because— / Because he was my foe”; Poem B mocks the comfort that “war is kind”.',
      },
      {
        ask: 'How do their voices differ?',
        right: 'Poem A’s speaker is a puzzled ordinary soldier talking plainly; Poem B’s speaker repeats a bitterly sarcastic comfort to those left grieving.',
        wrong: ['Both speakers are generals praising war.', 'Poem A’s speaker is sarcastic; Poem B’s speaker is plain and puzzled.', 'Both speakers are children.'],
        why: 'Poem A talks of inns and being “out of work”; Poem B tells a maiden and a babe, again and again, “Do not weep”.',
      },
      {
        ask: 'What kind of irony does each mainly use?',
        right: 'Poem A mainly situational irony (killing a man he might have befriended); Poem B mainly verbal irony (“War is kind”).',
        wrong: ['Both use only dramatic irony.', 'Poem A mainly verbal irony; Poem B mainly situational irony.', 'Neither poem uses irony.'],
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
        wrong: ['Wealth and how to earn it', 'The beauty of nature', 'The history of a small town'],
        why: 'Richard Cory “glittered when he walked” but despaired; the “we” of Poem B smile “With torn and bleeding hearts”.',
      },
      {
        ask: 'How do their points of view differ?',
        right: 'Poem A is told from outside, by townspeople who envied a man they never knew; Poem B is spoken from inside, by the “we” who hide their pain.',
        wrong: ['Both are told by the person who is suffering.', 'Poem A is spoken by Richard Cory himself.', 'Poem B is told by envious townspeople.'],
        why: 'Poem A: “We people on the pavement looked at him”. Poem B: “We wear the mask that grins and lies”.',
      },
      {
        ask: 'How do their endings differ?',
        right: 'Poem A ends with a sudden, shocking act that reveals Cory’s despair; Poem B ends by repeating its resolve to keep wearing the mask.',
        wrong: ['Both end with the speakers removing their masks.', 'Poem A ends happily; Poem B ends in a death.', 'Both end with the townspeople becoming rich.'],
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
        wrong: ['A love that has ended', 'Love at first sight', 'Love of one’s country'],
        why: 'Poem A’s love “bears it out even to the edge of doom”; Poem B’s speaker will “love thee better after death”.',
      },
      {
        ask: 'How do their approaches differ?',
        right: 'Poem A defines true love in general, largely by what it is not; Poem B speaks directly to one beloved and counts the ways of loving.',
        wrong: ['Both speak directly to one beloved from start to finish.', 'Poem A counts the ways of loving; Poem B defines love by what it is not.', 'Both doubt that love can last.'],
        why: 'Poem A: “Love is not love / Which alters”. Poem B: “How do I love thee? Let me count the ways.”',
      },
      {
        ask: 'How do the two sonnets differ in form?',
        right: 'Poem A is Shakespearean, ending in a couplet; Poem B is Petrarchan, with an octave and a sestet.',
        wrong: ['Both are Petrarchan.', 'Poem A is Petrarchan; Poem B is Shakespearean.', 'Neither is a sonnet.'],
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
        wrong: ['They describe a real funeral', 'They argue that death does not exist', 'They describe Death as a wild animal'],
        why: 'Poem A speaks to Death as “thou”; in Poem B Death is a gentleman who “kindly stopped for me”.',
      },
      {
        ask: 'How do their attitudes to Death differ?',
        right: 'Poem A defies Death and mocks its power; Poem B accepts Death calmly, as a courteous gentleman.',
        wrong: ['Both are terrified of Death.', 'Poem A welcomes Death; Poem B defies it.', 'Both say that Death is a slave.'],
        why: 'Poem A: “Death be not proud … thou art slave to Fate, Chance, kings”. Poem B: “He kindly stopped for me”, with “his civility”.',
      },
      {
        ask: 'How does each poem end?',
        right: 'Poem A ends by declaring that Death itself will die; Poem B ends with the speaker realizing she has been travelling toward eternity for centuries.',
        wrong: ['Both end with the speaker coming back to life.', 'Poem A ends in a carriage; Poem B ends with Death’s defeat.', 'Both end at a wedding.'],
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
