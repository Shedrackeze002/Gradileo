/**
 * Grade 12 English, lesson 2.1: The Ode and the Romantic Lyric (12-B1). The ode’s address
 * (apostrophe), what its speaker asks of the thing addressed and how its parts are arranged, in Keats,
 * Shelley and Wordsworth; and how a meditative lyric develops its thought, turning from the world to
 * the mind and back, in “Tintern Abbey”, “Frost at Midnight” and the Immortality ode.
 */
import { mc, part, skill, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { AnswerSpec, Choice, Difficulty, SkillDef } from '../../../types.ts';
import { titled } from '../../eng10/gen/texts.ts';
import {
  AUTUMN_FIGURE, AUTUMN_SONGS, FROST_BABE, FROST_END, FROST_FILM, FROST_OPENING, FROST_SCHOOL, NIGHTINGALE_DRAUGHT, NIGHTINGALE_FORLORN, NIGHTINGALE_IMMORTAL,
  NIGHTINGALE_OPENING, ODE_FOUNTAINS, ODE_GLEAM, ODE_LAST, ODE_OPENING, ODE_STRENGTH, TINTERN_COMFORT, TINTERN_OPENING, TINTERN_PAST, TINTERN_SISTER,
  URN_ENDING, URN_OPENING, WIND_IF, WIND_LYRE, WIND_PROPHECY, end, verseBlock, type Verse,
} from './poems.ts';

const L = 'e12-2-1';
const OUT = ['12-B1'];

export interface Ask {
  ask: string;
  right: string;
  wrong: string[];
  why: string;
}

/** A passage (one verse, or several printed one after the other) with a question about it. */
export interface Item extends Ask {
  verses: Verse[];
  lead: string;
}

/** The passage block: each verse quoted, the attribution after the last. */
export function passage(verses: Verse[]): string {
  return verses.map((v, i) => verseBlock(v, { bare: i < verses.length - 1 })).join('\n>\n> …\n>\n');
}

export function itemQ(rng: Rng, it: Item, hint: string): GenOutput {
  return {
    prompt: `${it.lead}\n\n${passage(it.verses)}\n\n${it.ask}`,
    parts: [part(mc(rng, it.right, it.wrong))],
    hints: [hint],
    solution: [end(it.right), it.why],
  };
}

// ============================================================================ the ode

const ODE_HINT = 'An ode speaks to something that cannot answer: find the “thou” or “you”, then ask what the speaker wants from it.';

/** Whom or what the ode addresses (apostrophe). */
const ADDRESSED: Item[] = [
  {
    verses: [NIGHTINGALE_IMMORTAL],
    lead: `From ${titled(NIGHTINGALE_IMMORTAL.poem)} by John Keats:`,
    ask: 'Whom or what does the speaker address as “thou”?',
    right: 'The nightingale, a bird he can hear singing in the dark',
    wrong: ['A friend who has come to sit with him through the long night', 'The emperor and the clown he names at the end of the stanza', 'Death, whom he has called by soft names in many of his rhymes'],
    why: '“Thou wast not born for death, immortal Bird!”: the one addressed is the nightingale whose song he hears “this passing night”.',
  },
  {
    verses: [URN_OPENING],
    lead: `The opening of an ode by John Keats (“Tempe” and “Arcady” are places in ancient Greece):`,
    ask: 'Whom or what does the speaker address in the first lines?',
    right: 'An ancient Greek vase painted with figures and a story',
    wrong: ['A young bride on the quiet morning of her own wedding', 'A historian who writes books about life in the country', 'The musicians who play the pipes and timbrels at a feast'],
    why: 'The “bride of quietness” and “Sylvan historian” are metaphors for the urn, which tells “a flowery tale” in pictures: the poem is the “Ode on a Grecian Urn”.',
  },
  {
    verses: [AUTUMN_FIGURE],
    lead: `From ${titled(AUTUMN_FIGURE.poem)} by John Keats (a “granary” stores grain; a “swath” is a row of cut grass or grain):`,
    ask: 'Whom does the speaker address as “thee” and “thou”?',
    right: 'Autumn itself, pictured as a person at harvest time',
    wrong: ['A farm worker he once saw asleep in a half-cut field', 'A miller grinding the year’s grain on a granary floor', 'A gleaner carrying home the corn left after the harvest'],
    why: 'The season is personified: Autumn sits “careless on a granary floor”, sleeps on a “half-reap’d furrow” and carries a hook. The farm workers are the forms Autumn takes, not the one addressed.',
  },
  {
    verses: [WIND_LYRE],
    lead: `From the last section of ${titled(WIND_LYRE.poem)} by Percy Bysshe Shelley (a “lyre” is a stringed instrument):`,
    ask: 'Whom or what does the speaker address?',
    right: 'The west wind, which he asks to play on him like a lyre',
    wrong: ['A musician whose lyre he wants to borrow for a song', 'The forest, whose leaves are falling all around him', 'A friend who plays music with him in the autumn woods'],
    why: '“Make me thy lyre, even as the forest is”: the wind plays the forest like an instrument, and the “Spirit fierce” he calls on is the wind.',
  },
  {
    verses: [ODE_FOUNTAINS],
    lead: `Near the end of an ode by William Wordsworth, first printed in 1807 as simply “Ode” and now called ${titled(ODE_FOUNTAINS.poem)}:`,
    ask: 'Whom or what does the speaker address here?',
    right: 'Nature: its fountains, meadows, hills and groves',
    wrong: ['The children he sees picking flowers on a May morning', 'His old friends, who he fears have long forgotten him', 'God, who he says is the true home of the human soul'],
    why: '“And oh ye Fountains, Meadows, Hills, and Groves, / Think not of any severing of our loves!”: he speaks to nature itself.',
  },
];

/** What the speaker asks of, or wants with, the thing addressed. */
const ASKS: Item[] = [
  {
    verses: [NIGHTINGALE_DRAUGHT],
    lead: `From ${titled(NIGHTINGALE_DRAUGHT.poem)} by John Keats (“Flora” is the goddess of flowers; the “Hippocrene” is a spring sacred to the Muses):`,
    ask: 'What does the speaker long for here?',
    right: 'To drink and slip away unseen with the bird into the dark forest',
    wrong: ['To catch the bird and keep it singing in a cage in his house', 'To share a feast of southern wine with his friends in Provence', 'To be cured of his drowsiness by cool water from a mountain spring'],
    why: '“That I might drink, and leave the world unseen, / And with thee fade away into the forest dim”: he wants to escape with the nightingale.',
  },
  {
    verses: [WIND_PROPHECY],
    lead: `The end of ${titled(WIND_PROPHECY.poem)} by Percy Bysshe Shelley (to “quicken” is to bring to life):`,
    ask: 'What does the speaker ask the wind to do?',
    right: 'To scatter his words through the world like seeds of new life',
    wrong: ['To stop blowing, so that the last of the leaves can stay on the trees', 'To carry him home across the sea before the winter storms begin', 'To bury his old, unwanted poems with the dead leaves for ever'],
    why: '“Drive my dead thoughts over the universe / Like withered leaves to quicken a new birth! … Scatter … my words among mankind!”: the wind is to spread his poetry like a prophecy.',
  },
  {
    verses: [URN_OPENING],
    lead: `The opening of ${titled(URN_OPENING.poem)} by John Keats (“Tempe” and “Arcady” are places in ancient Greece):`,
    ask: 'What does the speaker ask of the urn?',
    right: 'To tell the story painted on it, which it can show but cannot explain',
    wrong: ['To say who made it and how it was fired, painted and brought to England', 'To stop the painted maidens from running away from the young men', 'To bring the painted gods and mortals back to life for one more feast'],
    why: 'His questions (“What men or gods are these? What maidens loth? / What mad pursuit?”) ask the “Sylvan historian” for the story behind its pictures.',
  },
  {
    verses: [AUTUMN_SONGS],
    lead: `From the last stanza of ${titled(AUTUMN_SONGS.poem)} by John Keats (“sallows” are willows):`,
    ask: 'What does the speaker tell Autumn?',
    right: 'Not to envy spring: autumn has its own music',
    wrong: ['To hurry and end, so that spring can return sooner', 'To bring back the songs of spring that have gone', 'To silence the gnats and crickets so he can rest'],
    why: '“Where are the songs of Spring? … Think not of them, thou hast thy music too”: the gnats, lambs, crickets and swallows are autumn’s own songs.',
  },
  {
    verses: [ODE_FOUNTAINS],
    lead: `Near the end of ${titled(ODE_FOUNTAINS.poem)} by William Wordsworth:`,
    ask: 'What does the speaker ask of the natural world?',
    right: 'Not to think that his love for it has ended now that he has grown older',
    wrong: ['To give back the bright vision of it that he had as a small child', 'To forgive him for leaving it behind to live in a crowded city', 'To keep its beauty unchanged for the children who come after him'],
    why: '“Think not of any severing of our loves! / Yet in my heart of hearts I feel your might”: he has given up only “one delight”, and loves nature still.',
  },
];

/** How an ode is arranged, and where it ends up. */
const SHAPE: Item[] = [
  {
    verses: [NIGHTINGALE_FORLORN],
    lead: `The last stanza of ${titled(NIGHTINGALE_FORLORN.poem)} by John Keats. In the stanza before, he imagined the bird’s song reaching “faery lands forlorn”:`,
    ask: 'What brings the speaker back from the bird’s world to himself?',
    right: 'The word “forlorn” itself, tolling like a bell',
    wrong: ['The nightingale’s death, which ends its song for ever', 'A friend calling him back into the house at dawn', 'A church bell ringing out in the valley at midnight'],
    why: '“Forlorn! the very word is like a bell / To toll me back from thee to my sole self!”: the bell is a simile for the word, and the word ends the dream.',
  },
  {
    verses: [WIND_IF],
    lead: `Sections 1 to 3 of ${titled(WIND_IF.poem)} by Percy Bysshe Shelley show the wind driving dead leaves on land, clouds in the sky and waves at sea. Section 4 begins:`,
    ask: 'What does section 4 do?',
    right: 'It turns to the speaker, who wishes he were a leaf, a cloud or a wave',
    wrong: ['It describes a fourth power of the wind, over the mountains and forests', 'It ends the poem by describing the arrival of a warm and gentle spring', 'It turns to a friend, who the speaker hopes will follow the wind abroad'],
    why: 'After three sections about the wind’s power over leaf, cloud and wave, the poem turns inward: “If I were a dead leaf … If I were a swift cloud … A wave”.',
  },
  {
    verses: [URN_ENDING],
    lead: `The end of ${titled(URN_ENDING.poem)} by John Keats (“this generation” is the speaker’s own):`,
    ask: 'How does the ode end?',
    right: 'The urn, which will outlast us, offers its riddle: beauty is truth, truth beauty.',
    wrong: ['The speaker smashes the urn in anger that its painted lovers can never kiss.', 'The painted figures come to life at last and finish their country festival.', 'The speaker decides the urn is only a pot and walks away from it unmoved.'],
    why: 'The urn will “remain” when “old age shall this generation waste”, a “friend to man” saying “Beauty is truth, truth beauty”.',
  },
  {
    verses: [AUTUMN_FIGURE, AUTUMN_SONGS],
    lead: `From the second and third stanzas of ${titled(AUTUMN_FIGURE.poem)} by John Keats. The first stanza shows fruit and flowers swelling to ripeness:`,
    ask: 'How does the ode move from its second stanza to its third?',
    right: 'From the harvest at its height to the quiet sounds of its end',
    wrong: ['From the first flowers of spring to the full heat of a summer noon', 'From a calm morning to a sudden storm that destroys the harvest', 'From the poet’s happy childhood to his thoughts of his own death'],
    why: 'The second stanza finds Autumn at harvest; the third turns to the “soft-dying day”, where gnats “mourn” and swallows gather to leave.',
  },
  {
    verses: [ODE_OPENING, ODE_STRENGTH],
    lead: `The opening and, later, the turn of ${titled(ODE_OPENING.poem)} by William Wordsworth:`,
    ask: 'Where does the ode’s thought arrive?',
    right: 'At consolation: a mind deepened by suffering still finds strength',
    wrong: ['At despair: nothing can ever replace the glory he has lost from the world', 'At childhood again: he wins back the vision exactly as he once had it', 'At anger: he blames the busy world for stealing his vision from him'],
    why: 'He cannot “bring back the hour / Of splendour in the grass”, but “We will grieve not, rather find / Strength in what remains behind … In years that bring the philosophic mind.”',
  },
];

/** What apostrophe means, for the definition question. */
const APOSTROPHE_ASK: Ask = {
  ask: 'An ode is usually built on **apostrophe**. What is apostrophe?',
  right: 'Speaking to something absent or not human as if it could hear',
  wrong: ['A stanza of ten lines that rhyme in a fixed and repeated pattern', 'A sudden turn in a poem’s argument, usually near its end', 'A pause in the middle of a line, marked by a strong punctuation mark'],
  why: 'Odes speak to a nightingale, an urn, a season or the wind: things that cannot answer. That address is apostrophe; the other choices describe a stanza form, a volta and a caesura.',
};

function odeQ(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    if (rng.chance(0.25)) {
      const a = APOSTROPHE_ASK;
      return { prompt: a.ask, parts: [part(mc(rng, a.right, a.wrong))], hints: [ODE_HINT], solution: [end(a.right), a.why] };
    }
    return itemQ(rng, rng.pick(ADDRESSED), ODE_HINT);
  }
  if (d === 2) return itemQ(rng, rng.pick(ASKS), ODE_HINT);
  return itemQ(rng, rng.pick(SHAPE), 'Track the ode’s movement: what it begins with, where it turns, and what the speaker has come to by the end.');
}

// ============================================================================ the meditative lyric

const LYRIC_HINT = 'A meditative lyric starts in a place and a moment, follows the mind as it moves away (into memory or argument), and comes back changed.';

const SITUATION: Item[] = [
  {
    verses: [TINTERN_OPENING],
    lead: `The opening of ${titled(TINTERN_OPENING.poem)} by William Wordsworth, written in 1798 on a walking tour beside the River Wye:`,
    ask: 'What situation begins the poem?',
    right: 'He returns to a river valley that he last saw five years before',
    wrong: ['He sees a river valley for the first time on a summer tour', 'He says goodbye to the valley before leaving for five years', 'He describes a painting of the valley that hangs in his room'],
    why: '“Five years have passed … and again I hear / These waters”: he has come back, and “Once again” sees the cliffs.',
  },
  {
    verses: [FROST_OPENING],
    lead: `The opening of ${titled(FROST_OPENING.poem)} by Samuel Taylor Coleridge (“abstruser musings” are deep, difficult thoughts):`,
    ask: 'What situation begins the poem?',
    right: 'He sits up at night by his sleeping baby as frost forms outside',
    wrong: ['He walks out on a frosty night, listening to an owl in the woods', 'He lies awake in a crowded house that is full of noisy guests', 'He watches over a sick friend through a cold and windy winter night'],
    why: 'The household is “all at rest”, leaving him to “solitude”, “save that at my side / My cradled infant slumbers peacefully”, while the frost works “Unhelped by any wind”.',
  },
  {
    verses: [ODE_OPENING],
    lead: `The opening of ${titled(ODE_OPENING.poem)} by William Wordsworth (“of yore” means in the past):`,
    ask: 'What situation begins the poem?',
    right: 'He grieves that he has lost the glory he once saw in the natural world',
    wrong: ['He is seeing the beauty of the natural world for the first time', 'He has lost his eyesight and can no longer see the world at all', 'He remembers a dream in which the meadows were full of light'],
    why: 'Once “every common sight” seemed “Apparell’d in celestial light”; now “The things which I have seen I now can see no more”. The loss is of a vision, not of eyesight.',
  },
  {
    verses: [NIGHTINGALE_OPENING],
    lead: `The opening of ${titled(NIGHTINGALE_OPENING.poem)} by John Keats (“hemlock” is a poison; “Lethe” is the river of forgetting):`,
    ask: 'What situation begins the poem?',
    right: 'He feels an aching numbness as he listens to a nightingale sing',
    wrong: ['He has drunk poison and lies in the forest, waiting there to die', 'He envies the nightingale’s happiness and wishes it would be silent', 'He is falling asleep while reading a book of poems about summer'],
    why: 'He feels numb “as though of hemlock I had drunk”: a simile. And it is “not through envy of thy happy lot, / But being too happy in thine happiness”.',
  },
];

const TURNS: Item[] = [
  {
    verses: [FROST_FILM, FROST_SCHOOL],
    lead: `From ${titled(FROST_FILM.poem)} by Samuel Taylor Coleridge (the “film” is a flake of soot on the fire’s bars; people called it a “stranger”, a sign a visitor would come):`,
    ask: 'What carries the speaker’s mind back to his schooldays?',
    right: 'The flake of soot on the grate, which he once watched at school',
    wrong: ['The owl’s cry outside, which reminds him of the school bell long ago', 'His baby’s quiet breathing, which reminds him of a sleeping classmate', 'A letter from an old schoolfriend that he has left beside the fire'],
    why: 'The film is “the sole unquiet thing”, and at school he “gazed upon the bars, / To watch that fluttering stranger”: the same sight links the two moments.',
  },
  {
    verses: [TINTERN_COMFORT],
    lead: `From ${titled(TINTERN_COMFORT.poem)} by William Wordsworth, about the landscape he has come back to:`,
    ask: 'What has the memory of the landscape done for him while he was away?',
    right: 'It has calmed and restored him in lonely rooms and noisy cities',
    wrong: ['It made him miss the valley so badly that he could not work', 'It faded away, like a landscape shown to a blind man’s eyes', 'It made him give up the city to live beside the river for good'],
    why: 'In “lonely rooms, and mid the din / Of towns and cities” he owed to these memories “sensations sweet … With tranquil restoration”. The blind man is the opposite of what they were.',
  },
  {
    verses: [TINTERN_PAST],
    lead: `From ${titled(TINTERN_PAST.poem)} by William Wordsworth. He has just described the wild, thoughtless joy nature gave him as a young man (“recompence” means repayment):`,
    ask: 'How does he feel about losing that youthful joy?',
    right: 'He does not mourn: a deeper sense of humanity has repaid the loss',
    wrong: ['He mourns it bitterly and wishes that he could be a boy once again', 'He is glad to be rid of it, since that joy was foolish and selfish', 'He has never lost it: he feels the same wild joy in nature as before'],
    why: '“Not for this / Faint I, nor mourn nor murmur: other gifts / Have followed … Abundant recompence”, above all hearing “The still, sad music of humanity”.',
  },
  {
    verses: [ODE_GLEAM],
    lead: `From ${titled(ODE_GLEAM.poem)} by William Wordsworth, just after he has described the joy of a May morning:`,
    ask: 'What question does the speaker turn to?',
    right: 'Where the visionary gleam he once saw in nature has gone',
    wrong: ['Why one particular tree in the field has been cut down', 'Whether the pansy at his feet will bloom again next year', 'Who first planted the tree and the field he is looking at'],
    why: 'A tree, a field and a pansy “speak of something that is gone”, and he asks, “Whither is fled the visionary gleam? / Where is it now, the glory and the dream?”',
  },
];

const ENDINGS: Item[] = [
  {
    verses: [ODE_STRENGTH, ODE_LAST],
    lead: `From the last two stanzas of ${titled(ODE_STRENGTH.poem)} by William Wordsworth (“the meanest flower that blows” is the humblest flower that blooms):`,
    ask: 'What does the speaker conclude?',
    right: 'The glory has gone, but a mind deepened by suffering still finds strength',
    wrong: ['Since the glory has gone, nothing in nature can move him at all any longer', 'The glory will return if only he goes back to the places of his childhood', 'Children see nothing special in nature until they are older and wiser'],
    why: '“We will grieve not, rather find / Strength in what remains behind”, and even “the meanest flower that blows” gives him “Thoughts that do often lie too deep for tears”.',
  },
  {
    verses: [FROST_BABE, FROST_END],
    lead: `From the end of ${titled(FROST_BABE.poem)} by Samuel Taylor Coleridge, speaking to his sleeping baby:`,
    ask: 'Where does the poem’s thought end?',
    right: 'In the hope that every season will be sweet to the child, down to the frost',
    wrong: ['In fear that the coming winter will harm the child as it once harmed him', 'In a plan to send the child to the same city school that he attended', 'In a wish that the frost would melt away so that spring can come sooner'],
    why: 'Reared “In the great city”, he hopes the child will grow up among lakes and mountains: “all seasons shall be sweet to thee”, ending with the “secret ministry of frost” the poem began with.',
  },
  {
    verses: [TINTERN_SISTER],
    lead: `Near the end of ${titled(TINTERN_SISTER.poem)} by William Wordsworth, who has been walking with his sister:`,
    ask: 'Why does the speaker turn to his sister at the end?',
    right: 'In her he sees his former self, and hopes nature will guard her too',
    wrong: ['He blames her for keeping him away from the valley for five long years', 'He asks her to write the poem down for him before he can forget it', 'He tells her that he will never come back to the valley again'],
    why: 'In her voice he catches “The language of my former heart”: “May I behold in thee what I was once”. He goes on to pray that nature will “lead / From joy to joy” for her.',
  },
];

/** The stages of a lyric’s thought, in order, for the ordering question. */
const ORDERS: Array<{ poem: Verse; lead: string; stages: string[] }> = [
  {
    poem: FROST_OPENING,
    lead: `${titled(FROST_OPENING.poem)} by Samuel Taylor Coleridge moves through these stages.`,
    stages: [
      'The frost at work, and the silent cottage at midnight',
      'The flake of soot fluttering on the grate, the one thing that moves',
      'His schooldays, when he watched the same flutter and dreamed of home',
      'His hopes for the baby, who will grow up among lakes and mountains',
      'The frost again, hanging up icicles that shine to the moon',
    ],
  },
  {
    poem: TINTERN_OPENING,
    lead: `${titled(TINTERN_OPENING.poem)} by William Wordsworth moves through these stages.`,
    stages: [
      'Returning to the river valley after five years away',
      'How its memory restored him in towns and cities',
      'The thoughtless, passionate love of nature of his youth',
      'His mature sense of “the still, sad music of humanity”',
      'Turning to his sister, in whose eyes he sees his former self',
    ],
  },
  {
    poem: ODE_OPENING,
    lead: `${titled(ODE_OPENING.poem)} by William Wordsworth moves through these stages.`,
    stages: [
      'The loss of the “celestial light” he once saw in everything',
      'A joyful May morning that he cannot fully share',
      'The question of where “the visionary gleam” has gone',
      'The idea that we are born “trailing clouds of glory” and forget it',
      'Consolation in “the philosophic mind” and the meanest flower',
    ],
  },
];

function orderQ(rng: Rng): GenOutput {
  const o = rng.pick(ORDERS);
  const ids = 'abcdefgh';
  const idx = o.stages.map((_, i) => i);
  let shown = rng.shuffle(idx);
  for (let i = 0; i < 50 && shown.every((v, j) => v === j); i++) shown = rng.shuffle(idx);
  if (shown.every((v, j) => v === j)) shown = [...idx].reverse();
  const items: Choice[] = shown.map((k, i) => ({ id: ids[i], md: o.stages[k] }));
  const answer: AnswerSpec = { kind: 'order', items, correctOrder: idx.map((k) => items[shown.indexOf(k)].id), ends: ['First', 'Last'] };
  return {
    prompt: `${o.lead} Put them in the order in which the poem’s thought moves.`,
    parts: [part(answer)],
    hints: [LYRIC_HINT],
    solution: o.stages.map((s, i) => `${i + 1}. ${s}`),
  };
}

function lyricQ(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) return itemQ(rng, rng.pick(SITUATION), LYRIC_HINT);
  if (d === 2) return itemQ(rng, rng.pick(TURNS), LYRIC_HINT);
  return rng.chance(0.3) ? orderQ(rng) : itemQ(rng, rng.pick(ENDINGS), LYRIC_HINT);
}

export const ODE_SKILLS: SkillDef[] = [
  skill({
    id: 'e12-ode',
    name: 'The ode',
    description: 'Recognize the ode’s address to something that cannot answer, what its speaker asks of it, and how the ode is arranged.',
    outcomes: OUT,
    lessonId: L,
    format: 'mc',
    gen: odeQ,
  }),
  skill({
    id: 'e12-lyric-thought',
    name: 'How a lyric thinks',
    description: 'Trace how a meditative lyric develops its thought: its starting situation, its turns into memory or argument, and what the speaker concludes.',
    outcomes: OUT,
    lessonId: L,
    format: 'mc',
    gen: lyricQ,
  }),
];
