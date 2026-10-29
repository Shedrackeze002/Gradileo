/**
 * Grade 11 English, lesson 2.1: Extended Metaphor, Conceit and Allusion (11-B1). Following a
 * comparison through a poem, from extended metaphors written for Gradileo to Donne’s compasses and
 * Herbert’s pulley; and biblical, classical, historical and literary allusions, from everyday
 * sentences to Wordsworth, Keats, Arnold, Dunbar, Owen, Yeats and Tennyson.
 */
import { mc, part, skill, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { block, fill, pair } from '../../eng10/gen/common.ts';
import { titled } from '../../eng10/gen/texts.ts';
import {
  ANTHEM_ALL, CHAPMAN_ALL, DOUGLASS_ALL, DOVER_SOPHOCLES, DULCE_LIE, FRIGATE_ALL, LIQUOR_FIRST, LONDON_ALL, PARABLE_END, PARABLE_OPENING, PULLEY_ALL,
  SECOND_COMING_BEAST, SECOND_COMING_END, SONNET116_ALL, SUN_RISING_LAST, ULYSSES_END, VALEDICTION_COMPASS, VALEDICTION_GOLD, VALEDICTION_OPENING, WORLD_ALL,
  end, linesOf, verseBlock, type Verse,
} from './poems.ts';

const L = 'e11-2-1';
const OUT = ['11-B1'];

/** A question about a passage: its answer, distractors and explanation. */
interface Ask {
  ask: string;
  right: string;
  wrong: string[];
  why: string;
}

/** Two verses with an ellipsis between them, as one blockquote with the second's attribution. */
export function versesWithGap(a: Verse, b: Verse): string {
  return `${verseBlock(a, { bare: true })}\n>\n> …\n>\n${verseBlock(b)}`;
}

// ============================================================================ extended metaphor and conceit

interface Written {
  title: string;
  lines: string[];
  right: string;
  wrong: string[];
  why: string;
}

/** Extended metaphors written for Gradileo: what is compared to what, all the way through. */
const WRITTEN: Written[] = [
  {
    title: 'Downtown',
    lines: ['Each morning the great hive wakes early;', 'its workers pour from every door', 'and hum along the narrow streets', 'to fill the towers with honey before dark.'],
    right: 'A busy city is compared to a beehive.',
    wrong: ['A garden is compared to a city.', 'A storm is compared to a swarm of bees.', 'A factory is compared to a forest.'],
    why: 'The “hive”, its “workers”, the humming and the honey are all bee words, but the “streets” and “towers” show that the subject is a city.',
  },
  {
    title: 'The Line',
    lines: ['I boarded before I could read the signs;', 'the stations slide past, some bright, some grey,', 'the faces beside me change at every stop,', 'and no one has told me where the line ends.'],
    right: 'A life is compared to a long journey by train.',
    wrong: ['A school day is compared to a bus route.', 'A city is compared to a railway station.', 'A friendship is compared to a train ticket.'],
    why: 'Boarding before one can read, people who come and go, and not knowing where the line ends all describe a whole life as a train journey.',
  },
  {
    title: 'Memory',
    lines: ['My memory is an old house with many rooms;', 'some I visit every day and keep swept,', 'some are locked, and I have lost the keys,', 'and in the attic, things I had forgotten wait.'],
    right: 'Memory is compared to a house with many rooms.',
    wrong: ['A family is compared to an attic.', 'Old age is compared to a locked door.', 'A home is compared to a museum.'],
    why: 'The comparison is stated in the first line and carried through: rooms often visited, locked rooms and a forgotten attic are kinds of memories.',
  },
  {
    title: 'Grief',
    lines: ['It comes in twice a day and covers everything;', 'I have learned to wait for it, as fishermen do;', 'when it pulls back, the sand is smooth again,', 'but I know it will return before the night.'],
    right: 'Grief is compared to the tide of the sea.',
    wrong: ['Fishing is compared to waiting for news.', 'Night is compared to the ocean floor.', 'Anger is compared to a storm at sea.'],
    why: 'The title names grief, and everything in the poem belongs to a tide: it comes in twice a day, covers everything, pulls back and returns.',
  },
  {
    title: 'Exam Day',
    lines: ['We file into the hall in silent ranks,', 'pencils sharpened, every one a spear;', 'the clock, our general, barks out the minutes,', 'and at the end we count the wounded.'],
    right: 'Writing an exam is compared to fighting a battle.',
    wrong: ['A school is compared to a prison.', 'A teacher is compared to a judge.', 'A clock is compared to an alarm bell.'],
    why: 'Ranks, spears, a general and “the wounded” are all battle words used for students writing an exam.',
  },
  {
    title: 'Old Friends',
    lines: ['We planted it years ago, almost by accident;', 'we have weeded it through long, dry summers,', 'and even after a winter of silence', 'it puts out green shoots when we meet.'],
    right: 'A long friendship is compared to a garden.',
    wrong: ['A family farm is compared to a friendship.', 'A drought is compared to an argument.', 'Winter is compared to old age.'],
    why: 'The title names old friends; planting, weeding, dry summers and new shoots after winter turn the friendship into a garden that keeps growing.',
  },
  {
    title: 'Time',
    lines: ['He comes at night and never knocks;', 'he takes the colour from my grandmother’s hair,', 'the hours from the afternoon, the speed from the old dog,', 'and leaves no footprints in the snow.'],
    right: 'Time is compared to a thief.',
    wrong: ['Night is compared to a burglar’s mask.', 'Old age is compared to a snowstorm.', 'A grandmother is compared to a watchful dog.'],
    why: 'The title names time; coming at night without knocking, taking things and leaving no footprints are what a thief does.',
  },
  {
    title: 'My Phone',
    lines: ['It goes wherever I go, held tight in my hand;', 'one tug, and my head turns towards it;', 'it tells me when to stop and when to run,', 'and I am never sure which of us is walking whom.'],
    right: 'A phone is compared to a leash that controls its owner.',
    wrong: ['A dog is compared to a best friend.', 'A walk is compared to a race.', 'A hand is compared to a tool.'],
    why: 'Holding it tight, being tugged and told when to stop, and wondering “which of us is walking whom” turn the phone into a leash, with its owner as the dog.',
  },
];

const writtenQ = (rng: Rng): GenOutput => {
  const w = rng.pick(WRITTEN);
  return {
    prompt: `A poem written for Gradileo, called “${w.title}”:\n\n${block(w.lines.join('\n'))}\n\nWhat is being compared to what, all the way through the poem?`,
    parts: [part(mc(rng, w.right, w.wrong, { max: 4 }))],
    hints: ['An extended metaphor keeps one comparison going for several lines. Find the subject (often in the title), then list the words that all belong to something else.'],
    solution: [w.why, `So: ${w.right.charAt(0).toLowerCase()}${w.right.slice(1)}`],
  };
};

interface PdAsk extends Ask {
  verse: Verse;
  lead: string;
}

const PD_CONCEIT: PdAsk[] = [
  {
    verse: FRIGATE_ALL,
    lead: `${titled(FRIGATE_ALL.poem)} by Emily Dickinson (a “frigate” is a fast sailing ship; “coursers” are swift horses):`,
    ask: 'What is a book compared to throughout the poem?',
    right: 'Ships, horses and a carriage that carry the reader to faraway places',
    wrong: ['A treasure chest full of coins', 'A teacher who scolds the reader', 'A house where the reader can hide from the world'],
    why: 'The frigate, the coursers and the chariot are all ways of travelling: a book or a page of poetry carries the reader “lands away”.',
  },
  {
    verse: FRIGATE_ALL,
    lead: `${titled(FRIGATE_ALL.poem)} by Emily Dickinson (a “traverse” is a crossing; “oppress of toll” means the burden of paying a fee):`,
    ask: 'What does “This traverse may the poorest take / Without oppress of toll” add to the comparison?',
    right: 'Unlike real travel, reading costs almost nothing, so even the poorest person can make the journey.',
    wrong: ['Poor people cannot afford to buy books.', 'Travelling by ship is cheaper than reading.', 'Only rich people can enjoy poetry.'],
    why: 'A journey by ship or carriage costs money, but this one has no toll: the “frugal” chariot of a book carries even the poorest reader’s soul.',
  },
  {
    verse: VALEDICTION_OPENING,
    lead: `The opening of ${titled(VALEDICTION_OPENING.poem)} by John Donne, spoken by a man to the woman he loves before a long journey (the spelling is from the first printing; “prophanation” means insulting something holy, and “the layetie” means ordinary people):`,
    ask: 'What does the speaker compare their parting to?',
    right: 'The quiet death of a good man, so calm that his friends cannot tell the moment he has gone',
    wrong: ['A noisy storm at sea', 'A wedding feast', 'A soldier marching away to war'],
    why: '“As virtuous men passe mildly away … So let us melt, and make no noise”: the lovers should part as calmly as a good man dies, with no “teare-floods” or “sigh-tempests”.',
  },
  {
    verse: VALEDICTION_GOLD,
    lead: `From ${titled(VALEDICTION_GOLD.poem)} by John Donne, spoken to the woman he loves before a long journey (the spelling is from the first printing; “ayery thinnesse” means airy thinness):`,
    ask: 'What does the comparison to gold suggest about the lovers’ separation?',
    right: 'Distance will stretch their love wider without breaking it, as gold can be beaten into a very thin sheet without tearing.',
    wrong: ['Their love is valuable, so others will try to steal it.', 'The separation will break their love into pieces.', 'He is travelling to find gold to make them rich.'],
    why: 'Their souls “endure not yet / A breach, but an expansion”: like beaten gold, the love spreads thinner across the distance but stays whole.',
  },
  {
    verse: linesOf(SONNET116_ALL, 5, 8),
    lead: `Lines 5 to 8 of Shakespeare’s ${titled(SONNET116_ALL.poem)} (a “bark” is a ship; sailors measured a star’s “height” to find their way, without knowing its true nature):`,
    ask: 'What is true love compared to in these lines?',
    right: 'A fixed landmark that storms cannot move, and the star that guides every lost ship',
    wrong: ['A ship tossed about by a storm', 'A traveller who has lost his way', 'A tempest that sinks ships'],
    why: 'Love is “an ever-fixed mark, / That looks on tempests and is never shaken” and “the star to every wandering bark”: steady itself, and a guide to others.',
  },
  {
    verse: linesOf(ANTHEM_ALL, 1, 8),
    lead: `The first eight lines of ${titled(ANTHEM_ALL.poem)} by Wilfred Owen, a soldier in the First World War (“orisons” are prayers; “shires” are country districts):`,
    ask: 'The poem compares these soldiers’ deaths on the battlefield to what?',
    right: 'A church funeral, with guns, rifles and shells taking the place of the bells, prayers and choirs',
    wrong: ['A battle between two choirs', 'A wedding celebration', 'A children’s game'],
    why: 'There are no passing-bells, prayers or choirs for them: only the guns’ “anger”, the rifles’ “rapid rattle” and the “choirs of wailing shells”. The battlefield gives them the only funeral they get.',
  },
  {
    verse: SUN_RISING_LAST,
    lead: `The last lines of ${titled(SUN_RISING_LAST.poem)} by John Donne, spoken to the sun as it shines on two lovers (“sphere” here means the orbit the sun was believed to travel in):`,
    ask: 'What does the speaker claim the lovers’ room has become?',
    right: 'The whole world: by shining on the two lovers, the sun shines everywhere',
    wrong: ['A prison the lovers cannot leave', 'A church where they will marry', 'A cold, empty place the sun cannot reach'],
    why: '“The world’s contracted thus”: “Shine here to us, and thou art everywhere; / This bed thy center is, these walls thy sphere.” The room is the centre of the sun’s whole universe.',
  },
  {
    verse: linesOf(DOUGLASS_ALL, 9, 14),
    lead: `From ${titled(DOUGLASS_ALL.poem)} by Paul Laurence Dunbar, written to Frederick Douglass after his death (a “bark” is a ship; “stark” here means stiff and lifeless):`,
    ask: 'The country in a time of trouble is compared to a ship in a storm. What does “Honor, the strong pilot, lieth stark” suggest?',
    right: 'The nation has lost the honour that should steer it, like a ship whose pilot lies dead in a storm.',
    wrong: ['The ship’s pilot is too strong for the storm.', 'Douglass is the pilot who caused the storm.', 'The storm has ended and the sea is calm.'],
    why: 'The pilot steers the ship; with Honor lying “stark” (dead), the “shivering bark” has no one to guide it, so the speaker longs for Douglass’s “strong arm”.',
  },
];

interface PdTwo {
  verse: Verse;
  lead: string;
  asks: Ask[];
}

const PD_CONCEIT_TWO: PdTwo[] = [
  {
    verse: VALEDICTION_COMPASS,
    lead: `From ${titled(VALEDICTION_COMPASS.poem)} by John Donne, spoken by a man to the woman he loves before a long journey. Donne compares the two lovers to the two legs of a pair of compasses, the tool for drawing circles (the spelling is from the first printing; “obliquely” means at a slant, and “just” means perfect):`,
    asks: [
      {
        ask: 'In this conceit, what does the fixed foot of the compasses stand for?',
        right: 'The woman, who stays at home',
        wrong: ['The speaker, who travels', 'The journey itself', 'Death'],
        why: '“Thy soule the fixt foot” stays “in the center”, while the speaker is “Like th’other foot” that must “obliquely runne”.',
      },
      {
        ask: 'What does the last line, “And makes me end, where I begunne”, suggest?',
        right: 'Her faithfulness will bring him back home to her, as the fixed foot makes the moving foot finish its circle where it began.',
        wrong: ['He will never leave home at all.', 'Their love will end in the same sadness it began with.', 'He will wander in circles and get lost.'],
        why: 'A compass draws a perfect (“just”) circle only if the centre foot holds firm; her “firmnes” brings him round to the point he started from: home.',
      },
    ],
  },
  {
    verse: PULLEY_ALL,
    lead: `${titled(PULLEY_ALL.poem)} by George Herbert (the spelling is from the first printing; a “glasse” is a glass jar, “a span” is a small space, and “repining” means complaining):`,
    asks: [
      {
        ask: 'Which blessing does God keep back from man?',
        right: 'Rest',
        wrong: ['Beauty', 'Wisdom', 'Riches'],
        why: 'Strength, beauty, wisdom, honour and pleasure are poured out, but “Rest in the bottome lay”, and God decides to keep it back.',
      },
      {
        ask: 'How does the poem’s title, “The Pulley”, fit what God does?',
        right: 'Man’s restless weariness will pull him up to God, as a pulley lifts a weight.',
        wrong: ['God uses a machine to pour blessings onto man.', 'Rest makes man too heavy to lift.', 'Man pulls God down to earth with a rope.'],
        why: 'If goodness does not lead man to God, “yet wearinesse / May tosse him to my breast”: the missing rest works like a pulley, raising him towards God.',
      },
    ],
  },
  {
    verse: LIQUOR_FIRST,
    lead: `The first two stanzas of ${titled(LIQUOR_FIRST.poem)} by Emily Dickinson (“inebriate” means drunk, and a “debauchee” is someone who overindulges):`,
    asks: [
      {
        ask: 'What is the speaker “drunk” on?',
        right: 'The air, the dew and the summer sky',
        wrong: ['Wine from the Rhine', 'Beer from a village inn', 'A doctor’s medicine'],
        why: 'The liquor was “never brewed”: she is “Inebriate of air” and a “debauchee of dew”, reeling “From inns of molten blue”, the sky.',
      },
      {
        ask: 'What does the conceit suggest about how nature makes the speaker feel?',
        right: 'Summer fills her with a giddy, overflowing joy.',
        wrong: ['She regrets drinking too much.', 'She feels lonely in summer.', 'She is warning readers against alcohol.'],
        why: 'By turning air and dew into the strongest drink, the poem makes her delight in nature as dizzying and joyful as being drunk.',
      },
    ],
  },
];

const CONCEIT_TERMS: Ask[] = [
  {
    ask: 'Which choice best describes a **metaphysical conceit**?',
    right: 'A surprising comparison between two very unlike things, worked out in detail through a poem',
    wrong: ['A comparison using “like” or “as” in a single line', 'A poem that tells a story about a journey', 'A word that imitates the sound it names'],
    why: 'Poets such as John Donne made the conceit famous: lovers become a pair of compasses, a room becomes the world. The surprise of the comparison, and how far it is carried, are what make it a conceit.',
  },
  {
    ask: 'Which choice is the best example of a **conceit** rather than a simple simile?',
    right: 'Two lovers, one travelling and one at home, are compared at length to the two legs of a pair of compasses drawing a circle.',
    wrong: ['Her cheeks were as red as roses.', 'The wind howled all night.', 'He was as brave as a lion.'],
    why: 'The compasses are an unlikely, intellectual comparison developed over several stanzas; the others are brief, familiar comparisons or a single image.',
  },
];

function conceitQ(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) return writtenQ(rng);
  if (d === 2) {
    const q = rng.pick(PD_CONCEIT);
    return {
      prompt: `${q.lead}\n\n${verseBlock(q.verse)}\n\n${q.ask}`,
      parts: [part(mc(rng, q.right, q.wrong))],
      hints: ['Read the comparison as if it were literal, then ask what each detail of it would mean for the real subject.'],
      solution: [q.why, `So the answer is: ${end(q.right)}`],
    };
  }
  if (rng.chance(0.25)) {
    const t = rng.pick(CONCEIT_TERMS);
    return {
      prompt: t.ask,
      parts: [part(mc(rng, t.right, t.wrong))],
      hints: ['A conceit is a kind of extended metaphor: an unexpected comparison that a poet works out in detail.'],
      solution: [t.why],
    };
  }
  const q = rng.pick(PD_CONCEIT_TWO);
  return {
    prompt: `${q.lead}\n\n${verseBlock(q.verse)}\n\nAnswer both questions.`,
    parts: q.asks.map((a, i) => part(mc(rng, a.right, a.wrong), { label: `${i + 1}. ${a.ask}` })),
    hints: ['Name the two things being compared, then match each part of one to a part of the other.'],
    solution: q.asks.map((a, i) => `${i + 1}. ${end(a.right)} ${a.why}`),
  };
}

// ============================================================================ allusion

type Kind = 'biblical' | 'classical' | 'historical' | 'literary';
const KIND_NAME: Record<Kind, string> = { biblical: 'Biblical', classical: 'Classical', historical: 'Historical', literary: 'Literary' };
const KIND_WHAT: Record<Kind, string> = {
  biblical: 'it refers to a story or person from the Bible',
  classical: 'it refers to the myths, legends or writers of ancient Greece or Rome',
  historical: 'it refers to a real person or event from history',
  literary: 'it refers to a character or work of literature',
};
const KINDS: Kind[] = ['biblical', 'classical', 'historical', 'literary'];

interface Everyday {
  /** The sentence, with the allusion in bold; NAME and pronouns are filled in. */
  text: string;
  allusion: string;
  kind: Kind;
  /** Kinds that could also be argued, never offered as wrong answers. */
  leave?: Kind[];
  source: string;
  right: string;
  wrong: string[];
}

const EVERYDAY: Everyday[] = [
  { text: 'Clearing the flooded basement in one night was a **Herculean** task for NAME.', allusion: 'Herculean', kind: 'classical', source: 'Hercules, the Greek hero who performed twelve impossible labours', right: 'It needed enormous strength and effort.', wrong: ['It was quick and easy.', 'It was against the law.', 'It was done by a team of strangers.'] },
  { text: 'NAME is a brilliant player, but {his} temper is {his} **Achilles’ heel**.', allusion: 'Achilles’ heel', kind: 'classical', source: 'Achilles, the Greek warrior who could be wounded only in his heel', right: 'It is a single weakness that could bring about {his} downfall.', wrong: ['It is the source of {his} greatest strength.', 'It is an old injury that has healed.', 'It makes {him} run faster than anyone.'] },
  { text: 'By asking about the missing money at dinner, NAME opened **Pandora’s box**.', allusion: 'Pandora’s box', kind: 'classical', source: 'Pandora, who opened a jar and let every evil out into the world', right: '{He} started a chain of troubles that could not be stopped.', wrong: ['{He} found a hidden treasure.', '{He} solved a mystery at once.', '{He} handed everyone a surprise gift.'] },
  { text: 'NAME seems to have **the Midas touch** in business.', allusion: 'the Midas touch', kind: 'classical', source: 'King Midas, whose touch turned everything to gold', right: 'Everything {he} starts makes money.', wrong: ['Everything {he} starts fails.', '{He} treats every customer kindly.', '{He} only sells gold jewellery.'] },
  { text: 'Critics called the friendly-looking offer a **Trojan horse**.', allusion: 'Trojan horse', kind: 'classical', leave: ['literary'], source: 'the wooden horse the Greeks hid soldiers inside to capture Troy', right: 'It looked harmless but hid a danger inside.', wrong: ['It was a gift given out of real kindness.', 'It was too generous to refuse.', 'It was the start of a long, difficult journey.'] },
  { text: 'Getting home through three airports and a snowstorm became a real **odyssey** for NAME.', allusion: 'odyssey', kind: 'classical', leave: ['literary'], source: 'Odysseus, the Greek hero whose voyage home took ten years', right: 'It was a long journey full of adventures and setbacks.', wrong: ['It was a short, pleasant trip.', 'It was a trip taken alone by choice.', 'It was a journey made entirely by sea.'] },
  { text: 'The match between the village team and the national champions was a **David and Goliath** contest.', allusion: 'David and Goliath', kind: 'biblical', source: 'the young shepherd David, who defeated the giant Goliath with a sling', right: 'A small, weaker side faced a huge, powerful one.', wrong: ['Two equally matched teams played each other.', 'It was a friendly game with no winner.', 'The contest was decided by cheating.'] },
  { text: 'A **Good Samaritan** stopped to help NAME when {his} car broke down on the highway.', allusion: 'Good Samaritan', kind: 'biblical', source: 'the parable of the Samaritan who cared for a wounded stranger', right: 'A stranger kindly helped someone in need.', wrong: ['A police officer helped while on duty.', 'A thief pretended to help.', 'A close relative came to help.'] },
  { text: 'Waiting three hours at the clinic with a crying baby, NAME showed **the patience of Job**.', allusion: 'the patience of Job', kind: 'biblical', source: 'Job, who kept his faith through terrible suffering', right: '{He} stayed patient through a long, hard wait.', wrong: ['{He} lost {his} temper quickly.', '{He} came up with a clever plan.', '{He} fell asleep from boredom.'] },
  { text: 'For NAME, the locked cupboard of sweets was **forbidden fruit**.', allusion: 'forbidden fruit', kind: 'biblical', source: 'the fruit Adam and Eve were forbidden to eat in the Garden of Eden', right: 'It was tempting because it was not allowed.', wrong: ['It was healthy but tasteless.', 'It was shared with everyone.', 'It was old and spoiled.'] },
  { text: 'When sales fell for the sixth month in a row, the owners saw **the writing on the wall**.', allusion: 'the writing on the wall', kind: 'biblical', source: 'the Book of Daniel, where a hand writes a warning of doom on a king’s wall', right: 'They saw a clear sign that disaster was coming.', wrong: ['They saw a new advertisement.', 'They expected a sudden success.', 'They noticed a mural on the shop wall.'] },
  { text: 'After winning every round, the champion finally **met {his} Waterloo** in the final.', allusion: 'met his Waterloo', kind: 'historical', source: 'the Battle of Waterloo (1815), Napoleon’s final defeat', right: '{He} suffered a final, decisive defeat.', wrong: ['{He} won {his} greatest victory.', '{He} met an old friend.', '{He} travelled to Belgium.'] },
  { text: 'When NAME handed in {his} resignation, {he} knew {he} had **crossed the Rubicon**.', allusion: 'crossed the Rubicon', kind: 'historical', leave: ['classical'], source: 'Julius Caesar’s crossing of the river Rubicon in 49 BCE, which started a civil war', right: '{He} had taken a step that could not be undone.', wrong: ['{He} had made a small, harmless mistake.', '{He} had gone on holiday.', '{He} had changed {his} mind again.'] },
  { text: 'Everyone in the building called the landlord a **Scrooge**.', allusion: 'Scrooge', kind: 'literary', source: 'Ebenezer Scrooge, the miser in Charles Dickens’s “A Christmas Carol”', right: 'He was mean and hated spending money.', wrong: ['He was a generous host.', 'He was strict but fair.', 'He was a cheerful storyteller.'] },
  { text: 'Charming in public and cruel at home, the coach was a real **Jekyll and Hyde**.', allusion: 'Jekyll and Hyde', kind: 'literary', source: 'Robert Louis Stevenson’s story of a doctor who turns into a monstrous other self', right: 'The coach had two very different sides.', wrong: ['The coach was a qualified doctor.', 'The coach never changed.', 'The coach had a twin.'] },
  { text: 'The hotel room was **Lilliputian**: NAME could touch both walls at once.', allusion: 'Lilliputian', kind: 'literary', source: 'Lilliput, the land of tiny people in Jonathan Swift’s “Gulliver’s Travels”', right: 'It was tiny.', wrong: ['It was luxurious.', 'It was noisy.', 'It was old-fashioned.'] },
  { text: 'NAME warned for weeks that the old bridge would flood, but no one listened; {he} felt like **Cassandra**.', allusion: 'Cassandra', kind: 'classical', source: 'Cassandra, the Trojan princess whose true prophecies no one believed', right: '{His} true warnings were ignored.', wrong: ['{He} had been telling lies.', '{He} was the bridge’s designer.', '{He} was always lucky.'] },
];

interface PdAllusion extends Ask {
  verse: Verse;
  lead: string;
}

const PD_ALLUSION: PdAllusion[] = [
  {
    verse: linesOf(LONDON_ALL, 1, 8),
    lead: `From ${titled(LONDON_ALL.poem)} by William Wordsworth. John Milton (1608–1674) was the poet of “Paradise Lost” and a fierce defender of liberty (a “fen” is a marsh, and a “dower” is an inheritance):`,
    ask: 'Why does Wordsworth call on Milton?',
    right: 'He believes England has lost its virtue and freedom, and needs Milton’s moral greatness to restore them.',
    wrong: ['He wants Milton to write a new poem about London.', 'He blames Milton for England’s troubles.', 'He is mourning a friend who has just died.'],
    why: 'England is “a fen / Of stagnant waters”; “We are selfish men”. Calling on Milton measures the present against a great champion of virtue and freedom: “give us manners, virtue, freedom, power.”',
  },
  {
    verse: linesOf(WORLD_ALL, 9, 14),
    lead: `The last six lines of ${titled(WORLD_ALL.poem)} by William Wordsworth. Proteus and Triton are sea gods from Greek myth (a “lea” is a meadow):`,
    ask: 'What does the speaker’s wish to glimpse Proteus and Triton suggest?',
    right: 'He would rather believe an outdated myth that makes nature feel alive than live in a modern world that feels nothing for it.',
    wrong: ['He truly worships the Greek sea gods.', 'He is afraid of the sea and its gods.', 'He wants to become a sailor.'],
    why: 'He would “rather be / A Pagan suckled in a creed outworn” if it let him see gods in the sea: the allusion shows how much wonder the modern world has lost.',
  },
  {
    verse: linesOf(CHAPMAN_ALL, 9, 14),
    lead: `The last six lines of ${titled(CHAPMAN_ALL.poem)} by John Keats, about first reading George Chapman’s translation of Homer. Keats alludes to a Spanish explorer seeing the Pacific Ocean for the first time from a mountain in Darien, in Central America (“ken” means sight):`,
    ask: 'What feeling do these allusions express?',
    right: 'The awe of discovering a vast new world, which is how reading Homer in Chapman’s translation felt',
    wrong: ['Fear of the unknown', 'Disappointment that Homer was not as good as he had heard', 'Pride in having travelled so widely'],
    why: 'An astronomer finding “a new planet” and explorers staring “with a wild surmise” at an unknown ocean both stand for the silent wonder of a great discovery: Homer, through Chapman.',
  },
  {
    verse: DOVER_SOPHOCLES,
    lead: `From ${titled(DOVER_SOPHOCLES.poem)} by Matthew Arnold, as the speaker listens to waves on the shore. Sophocles was an ancient Greek writer of tragedies (“turbid” means muddy and troubled):`,
    ask: 'Why does the speaker mention Sophocles?',
    right: 'To show that the sad sound of the sea has made thinkers feel human misery for thousands of years',
    wrong: ['To show that the speaker has visited Greece', 'To argue that ancient writers were happier than modern ones', 'To compare the sea to a theatre stage'],
    why: 'Sophocles “long ago” heard in the sea “the turbid ebb and flow / Of human misery”; the speaker hears the same thought by “this distant northern sea”. The allusion links his sadness to an ancient tradition.',
  },
  {
    verse: linesOf(DOUGLASS_ALL, 1, 5),
    lead: `The opening of ${titled(DOUGLASS_ALL.poem)} by Paul Laurence Dunbar. Frederick Douglass (about 1818–1895) escaped slavery and became one of the greatest speakers against it (“salient” here means standing out):`,
    ask: 'Why does the speaker call on Douglass?',
    right: 'In a troubled time, he longs for a leader with Douglass’s courage and voice.',
    wrong: ['To blame Douglass for the evil days', 'To retell the story of Douglass’s escape', 'To celebrate that the struggle is over'],
    why: '“We have fall’n on evil days”: by addressing Douglass, the poem measures a troubled present against a great leader of the past, and later cries, “Oh, for thy voice”.',
  },
];

interface PdAllusionTwo {
  verse?: Verse;
  passage?: string;
  lead: string;
  kind: Kind;
  leave?: Kind[];
  ask: Ask;
}

const PD_ALLUSION_TWO: PdAllusionTwo[] = [
  {
    passage: versesWithGap(PARABLE_OPENING, PARABLE_END),
    lead: `From ${titled(PARABLE_OPENING.poem)} by Wilfred Owen, a soldier in the First World War. It retells the story in which God tells Abraham (Abram) to sacrifice his son Isaac, then sends an angel to stop him and a ram to sacrifice instead (“clave” means split):`,
    kind: 'biblical',
    ask: {
      ask: 'How does Owen change the story, and what does the change suggest?',
      right: 'The old man kills his son anyway, suggesting that older leaders sacrificed a generation of young soldiers rather than give up their pride.',
      wrong: ['The son is saved, suggesting that faith is always rewarded.', 'The angel punishes the old man, suggesting that war punishes its leaders.', 'The ram escapes into the thicket, suggesting that nature is free.'],
      why: 'In the Bible, Abraham obeys the angel. Owen’s Abram builds “parapets and trenches” and refuses to “Offer the Ram of Pride instead”: “the old man would not so, but slew his son.”',
    },
  },
  {
    verse: DULCE_LIE,
    lead: `The end of ${titled(DULCE_LIE.poem)} by Wilfred Owen, after he has described a soldier dying from poison gas. “Dulce et decorum est pro patria mori” is a line by the Roman poet Horace: “It is sweet and fitting to die for one’s country.”`,
    kind: 'classical',
    leave: ['literary'],
    ask: {
      ask: 'Why does Owen call Horace’s line “The old Lie”?',
      right: 'Having shown a soldier dying in agony, he rejects the idea that dying in war is sweet or glorious.',
      wrong: ['He believes Horace was a dishonest man.', 'He thinks the Latin has been translated wrongly.', 'He wants children to learn more Latin.'],
      why: 'The poem has just shown a gassed man’s “froth-corrupted lungs”; after that, telling children that such a death is “sweet and fitting” is a lie.',
    },
  },
  {
    passage: versesWithGap(SECOND_COMING_END, SECOND_COMING_BEAST),
    lead: `From ${titled(SECOND_COMING_END.poem)} by W. B. Yeats, written just after the First World War. In Christian belief, the Second Coming is Christ’s promised return, and Bethlehem is where Christ was born:`,
    kind: 'biblical',
    ask: {
      ask: 'How does Yeats twist these allusions?',
      right: 'Instead of a saviour, a “rough beast” is about to be born, suggesting a terrifying new age rather than a hopeful one.',
      wrong: ['He retells the birth of Christ faithfully.', 'He promises that Christ will return to end all wars.', 'He describes a real journey to Bethlehem.'],
      why: 'The speaker expects “the Second Coming”, but what “Slouches towards Bethlehem to be born” is a “rough beast”: the hopeful story is turned into a nightmare.',
    },
  },
  {
    verse: ULYSSES_END,
    lead: `The end of ${titled(ULYSSES_END.poem)} by Alfred, Lord Tennyson. Ulysses is the Roman name of Odysseus, the hero of Homer’s “Odyssey”, who fought at Troy beside Achilles. In Greek myth, the Happy Isles were where the souls of heroes went after death:`,
    kind: 'classical',
    leave: ['literary'],
    ask: {
      ask: 'What do “the Happy Isles” and “the great Achilles, whom we knew” suggest about the voyage Ulysses plans?',
      right: 'It may well end in death, where the heroes of the past rest, but he is ready to risk it for one last adventure.',
      wrong: ['It will be a short, safe trip to a nearby island.', 'He is sailing to find Achilles and bring him home alive.', 'He has decided to stay at home and remember his old friends.'],
      why: 'The gulfs may “wash us down”, or they may reach the isles of the heroic dead and meet Achilles: either way, he will “strive, to seek, to find, and not to yield.”',
    },
  },
];

function allusionQ(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1 || (d === 2 && rng.chance(0.4))) {
    const e = rng.pick(EVERYDAY);
    const cast = pair(rng);
    const sentence = fill(e.text, cast);
    if (d === 2) {
      const choices = KINDS.filter((k) => k !== e.kind && !(e.leave ?? []).includes(k)).map((k) => KIND_NAME[k]);
      return {
        prompt: `${block(sentence)}\n\nThe words in bold allude to ${e.source}. What kind of allusion is this?`,
        parts: [part(mc(rng, KIND_NAME[e.kind], choices))],
        hints: ['Biblical allusions come from the Bible; classical ones from ancient Greece and Rome (their myths, legends and writers); historical ones from real people and events; literary ones from later works of literature.'],
        solution: [`It is ${e.kind === 'historical' ? 'a historical' : `a ${e.kind}`} allusion: ${KIND_WHAT[e.kind]}, here ${e.source}.`],
      };
    }
    return {
      prompt: `${block(sentence)}\n\nWhat does the allusion in bold suggest?`,
      parts: [part(mc(rng, fill(e.right, cast), e.wrong.map((w) => fill(w, cast))))],
      hints: ['An allusion borrows the meaning of a well-known story, person or event. Think of what happens in the story it points to.'],
      solution: [`“${e.allusion}” alludes to ${e.source}.`, `So it suggests: ${fill(e.right, cast).charAt(0).toLowerCase()}${fill(e.right, cast).slice(1)}`],
    };
  }
  if (d === 2) {
    const q = rng.pick(PD_ALLUSION);
    return {
      prompt: `${q.lead}\n\n${verseBlock(q.verse)}\n\n${q.ask}`,
      parts: [part(mc(rng, q.right, q.wrong))],
      hints: ['Ask what the person, story or place alluded to is famous for, then how that meaning fits the poem.'],
      solution: [q.why, `So: ${end(q.right)}`],
    };
  }
  const q = rng.pick(PD_ALLUSION_TWO);
  const passage = q.passage ?? verseBlock(q.verse!);
  const kinds = KINDS.filter((k) => k !== q.kind && !(q.leave ?? []).includes(k)).map((k) => KIND_NAME[k]);
  return {
    prompt: `${q.lead}\n\n${passage}\n\nAnswer both questions.`,
    parts: [
      part(mc(rng, KIND_NAME[q.kind], kinds), { label: '1. What kind of allusion is this?' }),
      part(mc(rng, q.ask.right, q.ask.wrong), { label: `2. ${q.ask.ask}` }),
    ],
    hints: ['First place the allusion: Bible, Greek and Roman myth, real history or later literature. Then ask what the poem does with it: does it borrow the meaning, or twist it?'],
    solution: [`1. It is ${q.kind === 'historical' ? 'a historical' : `a ${q.kind}`} allusion: ${KIND_WHAT[q.kind]}.`, `2. ${end(q.ask.right)} ${q.ask.why}`],
  };
}

export const CONCEIT_SKILLS: SkillDef[] = [
  skill({
    id: 'e11-conceit',
    name: 'Extended metaphor and conceit',
    description: 'Follow an extended metaphor or metaphysical conceit through a poem and explain what its details suggest.',
    outcomes: OUT,
    lessonId: L,
    format: 'mc',
    gen: conceitQ,
  }),
  skill({
    id: 'e11-allusion',
    name: 'Allusion',
    description: 'Recognize biblical, classical, historical and literary allusions and explain what they add to a text.',
    outcomes: OUT,
    lessonId: L,
    format: 'mc',
    gen: allusionQ,
  }),
];
