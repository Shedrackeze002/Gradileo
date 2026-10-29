/**
 * Grade 10 English, lesson 2.1: Imagery and Figurative Language (10-B1). Similes, metaphors,
 * personification and hyperbole (understatement and extended metaphor at difficulty 3), the sense an
 * image appeals to, and what a figure of speech suggests, in lines written for Gradileo and in
 * public-domain poems (./poems.ts).
 */
import { mc, part, skill, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { block, fill, pair } from './common.ts';
import {
  CAPTAIN_FIRST, CLOUD_OPENING, DEATH_FIRST, DEATH_GRAIN, DULCE_EYES, DULCE_FIRST, DULCE_GAS, EAGLE_ALL, HOPE_ALL, MARINER_SHIP, MARINER_SUN, MASK_OPENING,
  RAINS_FIRST, RAINS_SPRING, ROSE_FIRST, ROSE_SEAS, SONNET73_FIRST, STAGE_LINES, BELLS_TINKLE, WEST_WIND_OPENING, linesOf, verseBlock, withBold, type Verse,
} from './poems.ts';
import { titled } from './texts.ts';

const L = 'e10-2-1';
const OUT = ['10-B1'];

// ---------------------------------------------------------------------------- figurative language

type Device = 'simile' | 'metaphor' | 'personification' | 'hyperbole' | 'understatement' | 'extended';
const BASIC: Device[] = ['simile', 'metaphor', 'personification', 'hyperbole'];
const ALL: Device[] = [...BASIC, 'understatement', 'extended'];
const NAME: Record<Device, string> = {
  simile: 'Simile',
  metaphor: 'Metaphor',
  personification: 'Personification',
  hyperbole: 'Hyperbole',
  understatement: 'Understatement',
  extended: 'Extended metaphor',
};
/** The device's name as it reads in a sentence: "a simile", "personification". */
const A: Record<Device, string> = {
  simile: 'a simile',
  metaphor: 'a metaphor',
  personification: 'personification',
  hyperbole: 'hyperbole',
  understatement: 'understatement',
  extended: 'an extended metaphor',
};
const WHAT: Record<Device, string> = {
  simile: 'a simile compares two different things using “like” or “as”',
  metaphor: 'a metaphor compares two different things by saying that one thing *is* the other, without “like” or “as”',
  personification: 'personification gives human qualities or actions to something that is not human',
  hyperbole: 'hyperbole is deliberate, extreme exaggeration for effect',
  understatement: 'understatement makes something sound much smaller or less serious than it really is',
  extended: 'an extended metaphor carries one comparison on through several lines or sentences',
};
/** The confusion each device is most often mistaken for, and how to tell them apart. */
const CONTRAST: Record<Device, string> = {
  simile: 'It uses “like” or “as” to make the comparison, so it is a simile, not a metaphor.',
  metaphor: 'There is no “like” or “as”: one thing is said to *be* the other, so it is a metaphor, not a simile.',
  personification: 'The thing described is not human, but it is given a human action or feeling, so it is personification.',
  hyperbole: 'No one means it literally: the exaggeration is too extreme to be true, so it is hyperbole.',
  understatement: 'The words make a serious situation sound small, the opposite of hyperbole.',
  extended: 'The comparison is not made once and dropped: it goes on through several lines, so it is an extended metaphor.',
};

interface Fig {
  text?: string;
  verse?: Verse;
  lead?: string;
  device: Device;
  /** Labels that could also be argued for this example, so they are left out of its choices. */
  leave?: Device[];
  why: string;
}

const WRITTEN: Fig[] = [
  { device: 'simile', text: 'NAME’s voice was as soft as falling snow.', why: 'NAME’s voice is compared to falling snow with “as … as”.' },
  { device: 'simile', text: 'The lake lay flat and still, like a sheet of glass.', why: 'The lake is compared to a sheet of glass with “like”.' },
  { device: 'simile', text: 'The old bus climbed the hill as slowly as a snail.', why: 'The bus is compared to a snail with “as … as”.' },
  { device: 'simile', text: 'After the race, NAME’s legs felt like jelly.', why: 'NAME’s legs are compared to jelly with “like”.' },
  { device: 'simile', text: 'The stars were scattered across the sky like grains of salt on a black tablecloth.', why: 'The stars are compared to grains of salt with “like”.' },
  { device: 'simile', text: 'NAME’s hands were as cold as ice.', why: 'NAME’s hands are compared to ice with “as … as”.' },
  { device: 'metaphor', text: 'After the bell rang, the classroom was a zoo.', leave: ['hyperbole'], why: 'The classroom is said to *be* a zoo, with no “like” or “as”.' },
  { device: 'metaphor', text: 'NAME’s words were daggers.', why: 'NAME’s words are said to *be* daggers, with no “like” or “as”.' },
  { device: 'metaphor', text: 'At night the city is a sea of lights.', leave: ['hyperbole'], why: 'The city is said to *be* a sea of lights, with no “like” or “as”.' },
  { device: 'metaphor', text: 'The snow was a white blanket over the fields.', why: 'The snow is said to *be* a blanket, with no “like” or “as”.' },
  { device: 'metaphor', text: 'The final exam was a mountain that NAME had to climb.', leave: ['hyperbole'], why: 'The exam is said to *be* a mountain, with no “like” or “as”.' },
  { device: 'metaphor', text: 'NAME’s little brother is a walking dictionary.', leave: ['hyperbole'], why: 'The brother is said to *be* a dictionary, with no “like” or “as”.' },
  { device: 'personification', text: 'The wind whispered through the pines.', why: 'The wind is given a human action: whispering.' },
  { device: 'personification', text: 'The old house groaned in the storm.', why: 'The house is given a human action: groaning.' },
  { device: 'personification', text: 'The alarm clock screamed at six o’clock.', leave: ['hyperbole'], why: 'The clock is given a human action: screaming.' },
  { device: 'personification', text: 'Dry leaves danced across the playground.', why: 'The leaves are given a human action: dancing.' },
  { device: 'personification', text: 'Thunder grumbled in the distance.', why: 'Thunder is given a human action: grumbling.' },
  { device: 'personification', text: 'The sun smiled down on the picnic.', why: 'The sun is given a human expression: smiling.' },
  { device: 'hyperbole', text: 'I have told you a million times to close the door.', why: 'No one has said anything a million times: the number is a deliberate exaggeration.' },
  { device: 'hyperbole', text: 'NAME’s backpack weighs a ton.', why: 'A backpack cannot weigh a ton: it is a deliberate exaggeration of how heavy it feels.' },
  { device: 'hyperbole', text: 'NAME was so hungry that {he} could eat a horse.', why: 'No one could eat a horse: it is a deliberate exaggeration of hunger.' },
  { device: 'hyperbole', text: 'We waited for that bus for a hundred years.', why: 'Nobody waits a hundred years for a bus: it is a deliberate exaggeration.' },
  { device: 'hyperbole', text: 'This homework is going to take me forever.', why: 'Homework cannot take forever: it is a deliberate exaggeration.' },
  { device: 'hyperbole', text: 'NAME’s laugh could be heard on the other side of the world.', why: 'No laugh carries round the world: it is a deliberate exaggeration of how loud it is.' },
];
const WRITTEN_HARD: Fig[] = [
  { device: 'understatement', text: 'After a hurricane flattened half the town, NAME said, “We’ve had a bit of wind.”', why: 'A hurricane is a disaster, but NAME calls it “a bit of wind”.' },
  { device: 'understatement', text: 'Pulled out of the freezing river after an hour, NAME said, “I’m slightly damp.”', why: 'NAME is soaked and freezing, but calls it “slightly damp”.' },
  { device: 'understatement', text: 'Standing on the summit of Mount Everest, the climber said, “That was a nice little walk.”', why: 'Climbing Everest is one of the hardest climbs on Earth, but the climber calls it “a nice little walk”.' },
  { device: 'understatement', text: '“It’s just a scratch,” said NAME, looking at {his} broken arm.', why: 'A broken arm is called “just a scratch”.' },
  { device: 'understatement', text: 'Having just broken the world record, NAME told reporters, “I’m fairly pleased with today.”', why: 'A world record is a huge achievement, but NAME says only “fairly pleased”.' },
  { device: 'extended', text: 'Life is a long voyage by sea. On some days the water is calm and the wind fills your sails; on others, storms toss you about, and you must hold the wheel tightly and steer for the harbour.', why: 'Life is compared to a voyage, and the comparison continues with calm water, sails, storms, the wheel and the harbour.' },
  { device: 'extended', text: 'The classroom was a garden. Every morning the teacher watered each mind with patience, pulled out the weeds of doubt and waited for every student to bloom.', why: 'The classroom is compared to a garden, and the comparison continues with watering, weeds and blooming.' },
  { device: 'extended', text: 'Grief was a heavy coat that NAME could not take off. {He} wore it to school, buttoned it tightly at night, and only in spring did {he} feel it begin to loosen.', why: 'Grief is compared to a coat, and the comparison continues with wearing it, buttoning it and loosening it.' },
];
const PD_FIGS: Fig[] = [
  { device: 'simile', verse: ROSE_FIRST, lead: `From ${titled(ROSE_FIRST.poem)} by Robert Burns (“Luve” is Scots for “love”):`, why: 'The speaker’s love is compared to a red rose and to a melody with “like”.' },
  { device: 'simile', verse: CLOUD_OPENING, lead: `From ${titled(CLOUD_OPENING.poem)} by William Wordsworth:`, why: 'The speaker compares himself to a cloud with “as”.' },
  { device: 'simile', verse: linesOf(EAGLE_ALL, 6), lead: `The last line of ${titled(EAGLE_ALL.poem)} by Alfred, Lord Tennyson:`, why: 'The eagle’s dive is compared to a thunderbolt with “like”.' },
  { device: 'simile', verse: linesOf(MARINER_SHIP, 3, 4), lead: `From ${titled(MARINER_SHIP.poem)} by Samuel Taylor Coleridge, when the wind has dropped:`, why: 'The real ship is compared to a painted ship with “as … as”.' },
  { device: 'simile', verse: linesOf(DULCE_FIRST, 1), lead: `The first line of ${titled(DULCE_FIRST.poem)} by Wilfred Owen, about soldiers in the First World War:`, why: 'The soldiers are compared to old beggars with “like”.' },
  { device: 'simile', verse: linesOf(WEST_WIND_OPENING, 2, 3), lead: `From ${titled(WEST_WIND_OPENING.poem)} by Percy Bysshe Shelley, speaking to the wind:`, leave: ['personification'], why: 'The dead leaves are compared to ghosts with “like”.' },
  { device: 'metaphor', verse: linesOf(HOPE_ALL, 1, 2), lead: `The opening of ${titled(HOPE_ALL.poem)} by Emily Dickinson:`, leave: ['extended'], why: 'Hope is said to *be* a feathered creature, a bird, with no “like” or “as”.' },
  { device: 'metaphor', verse: linesOf(STAGE_LINES, 1, 2), lead: `From Shakespeare’s play ${titled(STAGE_LINES.poem)}:`, leave: ['extended'], why: 'The world is said to *be* a stage and people to *be* players, with no “like” or “as”.' },
  { device: 'personification', verse: linesOf(DEATH_FIRST, 1, 2), lead: `The opening of ${titled(DEATH_FIRST.poem)} by Emily Dickinson:`, why: 'Death is given human actions and manners: he kindly stops his carriage for the speaker.' },
  { device: 'personification', verse: linesOf(EAGLE_ALL, 4), lead: `From ${titled(EAGLE_ALL.poem)} by Alfred, Lord Tennyson, describing the sea far below the eagle:`, leave: ['metaphor'], why: 'The sea is given a wrinkled face and the action of crawling.' },
  { device: 'personification', verse: RAINS_SPRING, lead: `The last lines of ${titled(RAINS_SPRING.poem)} by Sara Teasdale, imagining the world after a war has wiped out humankind:`, why: 'Spring is a “she” who wakes at dawn and could know or not know something.' },
  { device: 'hyperbole', verse: ROSE_SEAS, lead: `From ${titled(ROSE_SEAS.poem)} by Robert Burns (“a’” means “all” and “gang” means “go”):`, why: 'The speaker will love her until all the seas run dry, a deliberately impossible length of time.' },
];
const PD_HARD: Fig[] = [
  { device: 'extended', verse: CAPTAIN_FIRST, lead: `Walt Whitman wrote ${titled(CAPTAIN_FIRST.poem)} after President Abraham Lincoln was assassinated, just as the American Civil War ended. It begins:`, why: 'The nation is a ship and Lincoln its captain, and the comparison runs on: the “fearful trip”, the ship that has “weather’d every rack”, the “prize” that is won.' },
  { device: 'extended', verse: STAGE_LINES, lead: `From Shakespeare’s play ${titled(STAGE_LINES.poem)}:`, why: 'The world is a stage, and the comparison runs on: people are players with exits and entrances, and each plays many parts.' },
];

function figItem(f: Fig, cast: ReturnType<typeof pair>): string {
  if (f.verse) return `${f.lead ? `${f.lead}\n\n` : ''}${verseBlock(f.verse)}`;
  return block(fill(f.text!, cast));
}

function figurativeQ(rng: Rng, d: Difficulty): GenOutput {
  const cast = pair(rng);
  if (d === 3 && rng.chance(0.4)) {
    // Which line uses the device? One line of each kind.
    const want = rng.pick(BASIC);
    const lines = BASIC.map((dev) => fill(rng.pick(WRITTEN.filter((x) => x.device === dev && !(x.leave ?? []).length)).text!, cast));
    const right = lines[BASIC.indexOf(want)];
    return {
      prompt: `Which sentence uses **${A[want]}**?`,
      parts: [part(mc(rng, right, lines.filter((l) => l !== right)))],
      hints: [`Remember: ${WHAT[want]}.`],
      solution: [`“${right}” uses ${A[want]}: ${WHAT[want]}.`, 'Each of the other sentences uses a different figure of speech.'],
    };
  }
  const pool = d === 1 ? WRITTEN : d === 2 ? (rng.chance(0.6) ? PD_FIGS : WRITTEN) : rng.chance(0.5) ? WRITTEN_HARD : [...PD_HARD, ...PD_FIGS];
  const f = rng.pick(pool);
  const options = (d === 3 ? ALL : BASIC).filter((x) => x !== f.device && !(f.leave ?? []).includes(x));
  const wrong = rng.sample(options, 3).map((x) => NAME[x]);
  return {
    prompt: `${figItem(f, cast)}\n\nWhich figure of speech is used here?`,
    parts: [part(mc(rng, NAME[f.device], wrong))],
    hints: ['Look for “like” or “as” (a simile), one thing said to be another (a metaphor), a human action given to something that is not human (personification), or an extreme exaggeration (hyperbole).'],
    solution: [`This is ${A[f.device]}: ${WHAT[f.device]}.`, fill(f.why, cast), CONTRAST[f.device]],
  };
}

// ---------------------------------------------------------------------------- imagery

type Sense = 'sight' | 'sound' | 'smell' | 'taste' | 'touch';
const SENSES: Sense[] = ['sight', 'sound', 'smell', 'taste', 'touch'];
const SENSE_NAME: Record<Sense, string> = { sight: 'Sight', sound: 'Sound (hearing)', smell: 'Smell', taste: 'Taste', touch: 'Touch' };
const IMAGES: Record<Sense, string[]> = {
  sight: [
    'A thin silver moon hung over the dark hills.',
    'Red and gold leaves lay scattered across the grey path.',
    'The kitchen window glowed yellow against the blue evening.',
    'Bright kites of every colour dotted the sky over the beach.',
  ],
  sound: [
    'Rain drummed on the tin roof, and somewhere a door banged.',
    'Bees hummed in the clover while a dog barked far away.',
    'The kettle whistled and the old radio crackled.',
    'Car horns blared and a street seller shouted over the traffic.',
  ],
  smell: [
    'The kitchen smelled of cinnamon and fresh bread.',
    'The air was thick with the smell of smoke and wet earth.',
    'The sharp scent of pine filled the cabin.',
    'The market reeked of fish and diesel fumes.',
  ],
  taste: [
    'The lemonade was so sour that it made NAME’s mouth pucker.',
    'The soup was salty and rich, with a bite of pepper.',
    'The tea was bitter, and the cake far too sweet.',
    'The mango tasted sweet, with a sharp tang near the skin.',
  ],
  touch: [
    'The sand burned the soles of NAME’s bare feet.',
    'The wool scarf was rough and itchy against NAME’s neck.',
    'Icy water soaked through NAME’s socks.',
    'The cat’s fur was warm and silky under NAME’s hand.',
  ],
};
const SENSE_CLUE: Record<Sense, string> = {
  sight: 'colours, shapes and light are things we see',
  sound: 'noises are things we hear',
  smell: 'scents and odours are things we smell',
  taste: 'sour, salty, bitter and sweet are things we taste',
  touch: 'heat, cold, roughness and softness are things we feel on the skin',
};

interface PdImage {
  verse: Verse;
  lead: string;
  phrase: string;
  sense: Sense;
  why: string;
}
const PD_IMAGES: PdImage[] = [
  { verse: linesOf(RAINS_FIRST, 1, 2), lead: `From ${titled(RAINS_FIRST.poem)} by Sara Teasdale:`, phrase: 'the smell of the ground', sense: 'smell', why: 'The image names a smell: the smell of the wet ground after rain.' },
  { verse: linesOf(RAINS_FIRST, 3, 4), lead: `From ${titled(RAINS_FIRST.poem)} by Sara Teasdale:`, phrase: 'frogs in the pools singing at night', sense: 'sound', why: 'We hear the frogs “singing” in the dark.' },
  { verse: linesOf(RAINS_FIRST, 3, 4), lead: `From ${titled(RAINS_FIRST.poem)} by Sara Teasdale:`, phrase: 'wild plum-trees in tremulous white', sense: 'sight', why: 'We see the colour of the blossom, white and trembling on the trees.' },
  { verse: BELLS_TINKLE, lead: `From ${titled(BELLS_TINKLE.poem)} by Edgar Allan Poe:`, phrase: 'tinkle, tinkle, tinkle', sense: 'sound', why: '“Tinkle” is the sound of small bells ringing.' },
  { verse: BELLS_TINKLE, lead: `From ${titled(BELLS_TINKLE.poem)} by Edgar Allan Poe:`, phrase: 'the icy air of night', sense: 'touch', why: '“Icy” air is something we feel on the skin: the cold of the night.' },
  { verse: DULCE_EYES, lead: `From ${titled(DULCE_EYES.poem)} by Wilfred Owen, describing a soldier caught in a gas attack:`, phrase: 'the white eyes writhing in his face', sense: 'sight', why: 'We are made to watch the dying man’s eyes: a picture of what the speaker saw.' },
  { verse: DULCE_GAS, lead: `From ${titled(DULCE_GAS.poem)} by Wilfred Owen:`, phrase: 'Gas! GAS! Quick, boys!', sense: 'sound', why: 'We hear the shouted warning, louder the second time (“GAS!”).' },
  { verse: linesOf(MARINER_SUN, 1, 2), lead: `From ${titled(MARINER_SUN.poem)} by Samuel Taylor Coleridge:`, phrase: 'The bloody Sun', sense: 'sight', why: 'We see the colour of the sun: blood red.' },
  { verse: linesOf(EAGLE_ALL, 3), lead: `From ${titled(EAGLE_ALL.poem)} by Alfred, Lord Tennyson:`, phrase: 'Ring’d with the azure world', sense: 'sight', why: '“Azure” is a colour, bright blue: we see the blue sky and sea all around the eagle.' },
  { verse: DEATH_GRAIN, lead: `From ${titled(DEATH_GRAIN.poem)} by Emily Dickinson:`, phrase: 'We passed the setting sun', sense: 'sight', why: 'We see the sun going down.' },
];

function imageryQ(rng: Rng, d: Difficulty): GenOutput {
  const cast = pair(rng);
  const hints = ['Ask which of the five senses the words call up: what would you see, hear, smell, taste or feel?'];
  if (d === 3) {
    const want = rng.pick(SENSES);
    const others = rng.sample(SENSES.filter((s) => s !== want), 3);
    const right = fill(rng.pick(IMAGES[want]), cast);
    return {
      prompt: `Which sentence appeals most strongly to the sense of **${want === 'sound' ? 'hearing' : want}**?`,
      parts: [part(mc(rng, right, others.map((s) => fill(rng.pick(IMAGES[s]), cast))))],
      hints,
      solution: [`“${right}” appeals to ${want === 'sound' ? 'hearing' : want}: ${SENSE_CLUE[want]}.`, `The other sentences appeal to ${others.map((s) => (s === 'sound' ? 'hearing' : s)).join(', ').replace(/, ([^,]*)$/, ' and $1')}.`],
    };
  }
  if (d === 2 && rng.chance(0.7)) {
    const p = rng.pick(PD_IMAGES);
    const wrong = rng.sample(SENSES.filter((s) => s !== p.sense), 3);
    return {
      prompt: `${p.lead}\n\n${verseBlock(withBold(p.verse, p.phrase))}\n\nWhich sense does the image in bold appeal to?`,
      parts: [part(mc(rng, SENSE_NAME[p.sense], wrong.map((s) => SENSE_NAME[s])))],
      hints,
      solution: [p.why, `So the image appeals to ${p.sense === 'sound' ? 'hearing' : p.sense}.`],
    };
  }
  const sense = rng.pick(SENSES);
  const text = fill(rng.pick(IMAGES[sense]), cast);
  const wrong = rng.sample(SENSES.filter((s) => s !== sense), 3);
  return {
    prompt: `${block(text)}\n\nWhich sense does this image appeal to most?`,
    parts: [part(mc(rng, SENSE_NAME[sense], wrong.map((s) => SENSE_NAME[s])))],
    hints,
    solution: [`The image appeals to ${sense === 'sound' ? 'hearing' : sense}: ${SENSE_CLUE[sense]}.`],
  };
}

// ---------------------------------------------------------------------------- what a figure of speech suggests

interface Meaning {
  text?: string;
  verse?: Verse;
  lead?: string;
  /** What is compared to what. */
  compared: string;
  right: string;
  wrong: string[];
  why: string;
}
const WRITTEN_MEANINGS: Meaning[] = [
  { text: 'After the bell rang, the classroom was a zoo.', compared: 'The classroom is compared to a zoo.', right: 'The classroom became noisy, wild and completely out of control.', wrong: ['The class had gone outside to visit the animals at a zoo.', 'The classroom fell silent as everyone waited for the teacher.', 'The students were studying animals in their science lesson.'], why: 'A zoo is full of noisy, restless animals, so the classroom was loud and disorderly.' },
  { text: 'NAME’s words were daggers.', compared: 'NAME’s words are compared to daggers.', right: 'NAME’s words were cruel and wounded the people who heard them.', wrong: ['NAME was holding a sharp knife while speaking to the class.', 'NAME spoke so quickly that nobody could follow the words.', 'NAME’s words were gentle and full of kindness for everyone.'], why: 'Daggers wound, so the words hurt the people who heard them.' },
  { text: 'Time is a thief.', compared: 'Time is compared to a thief.', right: 'Time quietly takes things from us, such as our youth.', wrong: ['Clocks and watches are often stolen from people’s homes.', 'Time passes very slowly when nothing interesting happens.', 'People should keep their watches locked away at night.'], why: 'A thief takes things quietly, without permission, as time takes our years.' },
  { text: 'The final exam was a mountain that NAME had to climb.', compared: 'The exam is compared to a mountain.', right: 'The exam was a huge challenge that took great effort.', wrong: ['The exam was held outdoors, on a hill above the school.', 'The exam was so short and easy that NAME finished early.', 'NAME enjoys hiking and climbing mountains at weekends.'], why: 'Climbing a mountain is long, hard work, so the exam was a big challenge.' },
  { text: 'NAME has a heart of stone.', compared: 'NAME’s heart is compared to stone.', right: 'NAME is cold and shows no pity for anyone.', wrong: ['NAME is very strong and can lift heavy weights.', 'NAME has a heart condition and must see a doctor.', 'NAME stays calm and steady in every emergency.'], why: 'Stone is hard and cold, so NAME shows no warmth or pity.' },
  { text: 'Grandfather’s memory is a library of old stories.', compared: 'Grandfather’s memory is compared to a library.', right: 'He remembers a great many old stories.', wrong: ['He works as a librarian in the town centre.', 'He has forgotten nearly all of his old stories.', 'He owns a large collection of old books.'], why: 'A library holds a great many books, as his memory holds a great many stories.' },
  { text: 'NAME’s smile was a ray of sunshine on a grey day.', compared: 'NAME’s smile is compared to a ray of sunshine.', right: 'NAME’s smile brought warmth and cheer at a gloomy time.', wrong: ['NAME was standing outside in the bright afternoon sun.', 'NAME’s smile was so bright it hurt people’s eyes to look.', 'The weather was about to change from grey skies to rain.'], why: 'Sunshine breaking through on a grey day brings light and warmth, as the smile brought cheer.' },
];
const PD_MEANINGS: Meaning[] = [
  { verse: linesOf(HOPE_ALL, 1, 4), lead: `The opening of ${titled(HOPE_ALL.poem)} by Emily Dickinson:`, compared: 'Hope is compared to a small bird that sings in the soul.', right: 'Hope lives inside us and keeps singing, even in hard times.', wrong: ['Hope is fragile, and the first storm of trouble destroys it.', 'Hope is a wild thing we must catch and keep shut in a cage.', 'Hope flies away from us as soon as hard times arrive.'], why: 'The bird “perches in the soul” and “never stops at all”: hope stays with us and keeps going.' },
  { verse: ROSE_FIRST, lead: `From ${titled(ROSE_FIRST.poem)} by Robert Burns (“Luve” is Scots for “love”):`, compared: 'The speaker’s love is compared to a June rose and a sweet tune.', right: 'His love is fresh and lovely, and as delightful as music.', wrong: ['His love is prickly, like a rose’s thorns, and hard to reach.', 'His love will fade and die as quickly as a summer flower.', 'His love is a skilled musician who plays sweet tunes.'], why: 'A rose “newly sprung in June” is fresh and lovely, and a tune “sweetly play’d” is a delight.' },
  { verse: STAGE_LINES, lead: `From Shakespeare’s play ${titled(STAGE_LINES.poem)}:`, compared: 'The world is compared to a stage, and people to its actors.', right: 'People play many roles in their lives, as actors do in a play.', wrong: ['Everyone secretly wants to be famous and act on a real stage.', 'Life is a light-hearted comedy that always ends happily.', 'The world is full of theatres, and everyone should visit one.'], why: 'Players have “exits and entrances” and “many parts”, as people are born, die and play many roles in between.' },
  { verse: DEATH_FIRST, lead: `The opening of ${titled(DEATH_FIRST.poem)} by Emily Dickinson:`, compared: 'Death is compared to a polite gentleman driving a carriage.', right: 'Death comes gently and politely, so it seems calm, not frightening.', wrong: ['Death arrives violently and cruelly, and drags the speaker away.', 'The speaker is being kidnapped by a stranger in a carriage.', 'The speaker is late for an important appointment in town.'], why: 'Death “kindly stopped” for her: he is shown as courteous, not terrifying.' },
  { verse: linesOf(DULCE_FIRST, 1, 2), lead: `From ${titled(DULCE_FIRST.poem)} by Wilfred Owen, about young soldiers in the First World War:`, compared: 'The young soldiers are compared to old beggars and hags.', right: 'The war has worn the young soldiers out until they seem old and broken.', wrong: ['The soldiers are carrying sacks of supplies to sell in the town.', 'The soldiers are proud and strong as they march off to battle.', 'The soldiers are pretending to be beggars to fool the enemy.'], why: 'Young men who are “bent double” and “coughing like hags” have been aged and broken by the war.' },
  { verse: MARINER_SHIP, lead: `From ${titled(MARINER_SHIP.poem)} by Samuel Taylor Coleridge, when the wind has dropped:`, compared: 'The still ship is compared to a ship in a painting of the sea.', right: 'The ship is completely still, as if frozen in a painting.', wrong: ['The ship has just been given a fresh coat of bright paint.', 'The sailors pass the time painting pictures of the ocean.', 'The ship is sinking fast beneath the waves of the ocean.'], why: 'A painted ship can never move, and the sailors have “nor breath nor motion”.' },
  { verse: linesOf(EAGLE_ALL, 4, 6), lead: `The second stanza of ${titled(EAGLE_ALL.poem)} by Alfred, Lord Tennyson:`, compared: 'The eagle’s sudden dive is compared to a thunderbolt.', right: 'The eagle’s dive is sudden, fast and powerful.', wrong: ['The eagle has been struck by lightning during a storm.', 'The eagle falls slowly because it has been badly injured.', 'The eagle is afraid of the thunder and hides on the cliff.'], why: 'A thunderbolt strikes suddenly and with great force, like the eagle diving on its prey.' },
  { verse: MASK_OPENING, lead: `The opening of ${titled(MASK_OPENING.poem)} by Paul Laurence Dunbar:`, compared: 'Hiding one’s true feelings is compared to wearing a mask.', right: 'People hide their pain behind a false, cheerful face.', wrong: ['People like to wear costumes and masks for fun at parties.', 'People are ashamed of how they look and cover their faces.', 'The speaker works as an actor who wears masks on stage.'], why: 'The mask “grins and lies”: it shows a smile that hides the truth.' },
  { verse: SONNET73_FIRST, lead: `The first four lines of Shakespeare’s ${titled(SONNET73_FIRST.poem)}:`, compared: 'The speaker’s time of life is compared to late autumn.', right: 'The speaker feels that he is growing old, near the end of his life.', wrong: ['The speaker loves autumn more than any other season of the year.', 'The speaker is a gardener watching his trees lose their leaves.', 'The speaker is about to sing with a choir in an old church.'], why: 'Yellow leaves, bare boughs and empty “choirs” where birds once sang suggest youth has passed and old age has come.' },
  { verse: CAPTAIN_FIRST, lead: `Walt Whitman wrote ${titled(CAPTAIN_FIRST.poem)} after President Abraham Lincoln was assassinated, just as the American Civil War ended. It begins:`, compared: 'The nation is compared to a ship, and Lincoln to its captain.', right: 'Lincoln steered the nation through the war, as a captain steers a ship.', wrong: ['Before politics, Lincoln worked as the captain of a sailing ship.', 'The war was fought mainly at sea, aboard large sailing ships.', 'The nation was setting out together on a long holiday voyage.'], why: 'The ship has “weather’d every rack” (survived every storm) and won its prize: the nation has come through the war.' },
  { verse: CLOUD_OPENING, lead: `From ${titled(CLOUD_OPENING.poem)} by William Wordsworth:`, compared: 'The lonely speaker is compared to a cloud drifting on high.', right: 'The speaker was wandering alone, drifting without any purpose.', wrong: ['The speaker was flying high above the hills in an aeroplane.', 'The speaker was angry and stormy, like a dark thundercloud.', 'The speaker felt heavy and full of tears, like a rain cloud.'], why: 'A single cloud “floats on high”, alone and drifting, as the speaker “wandered lonely”.' },
];

function meaningPrompt(m: Meaning, cast: ReturnType<typeof pair>): string {
  return m.verse ? `${m.lead}\n\n${verseBlock(m.verse)}` : block(fill(m.text!, cast));
}

function meaningQ(rng: Rng, d: Difficulty): GenOutput {
  const cast = pair(rng);
  const hints = ['Name the two things being compared. Then ask what the second thing is like, and which of those qualities the writer wants us to see in the first.'];
  if (d === 3) {
    const m = rng.pick(PD_MEANINGS);
    const otherCompared = rng.sample(PD_MEANINGS.filter((x) => x !== m), 3).map((x) => x.compared);
    return {
      prompt: `${meaningPrompt(m, cast)}\n\nAnswer both questions.`,
      parts: [
        part(mc(rng, m.compared, otherCompared), { label: 'What is being compared?' }),
        part(mc(rng, m.right, m.wrong), { label: 'What does the comparison suggest?' }),
      ],
      hints,
      solution: [m.compared, m.why, `So the comparison suggests: ${m.right.charAt(0).toLowerCase()}${m.right.slice(1)}`],
    };
  }
  const m = d === 1 ? rng.pick(WRITTEN_MEANINGS) : rng.chance(0.75) ? rng.pick(PD_MEANINGS) : rng.pick(WRITTEN_MEANINGS);
  return {
    prompt: `${meaningPrompt(m, cast)}\n\nWhat does the figure of speech suggest?`,
    parts: [part(mc(rng, fill(m.right, cast), m.wrong.map((w) => fill(w, cast))))],
    hints,
    solution: [fill(m.compared, cast), fill(m.why, cast), 'The other choices take the comparison literally or say something the words do not suggest.'],
  };
}

export const FIGURATIVE_SKILLS: SkillDef[] = [
  skill({
    id: 'e10-figurative-language',
    name: 'Similes, metaphors, personification and hyperbole',
    description: 'Identify similes, metaphors, personification and hyperbole, and at a harder level understatement and extended metaphor, in poems and other writing.',
    outcomes: OUT,
    lessonId: L,
    format: 'mc',
    gen: figurativeQ,
  }),
  skill({
    id: 'e10-imagery',
    name: 'Imagery and the senses',
    description: 'Name the sense an image appeals to, and find the image that appeals most strongly to a given sense.',
    outcomes: OUT,
    lessonId: L,
    format: 'mc',
    gen: imageryQ,
  }),
  skill({
    id: 'e10-figurative-meaning',
    name: 'What figurative language suggests',
    description: 'Explain what a simile, metaphor or personification suggests about its subject.',
    outcomes: OUT,
    lessonId: L,
    format: 'mc',
    gen: meaningQ,
  }),
];
