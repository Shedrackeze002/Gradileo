/**
 * Grade 10 English, lessons 1.3 and 1.4: Setting and Mood, and Point of View (10-A1). The mood a
 * passage creates and the details that create it, tone and mood, the five points of view, what a
 * narrator can know, and unreliable narrators. Passages are written for Gradileo or quoted from
 * public-domain stories (./texts.ts).
 */
import { fixedChoice, mc, part, skill } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { block, cap, fill, type Person } from './common.ts';
import { pair } from './stories-plot.ts';
import {
  CASK, CASK_OPENING, CASK_SMILE, FIRE, FIRE_FROST, FIRE_IMAGINATION, FIRE_OPENING, HEART, HEART_BEAT, HEART_OPENING, HEART_WISELY, HOUR, HOUR_FREE, HOUR_WINDOW, MAGI, MAGI_GRAY, MAGI_OPENING,
  MAGI_PIER_GLASS, OWL, OWL_OPENING, PAW, PAW_KNOCK, USHER, USHER_OPENING, WINDOW, WINDOW_FRAMTON, quoteBlock, titled, type Excerpt,
} from './texts.ts';

// ============================================================================ lesson 1.3: setting and mood

type Family = 'gloomy' | 'eerie' | 'tense' | 'calm' | 'joyful' | 'chaotic' | 'hopeful';
/**
 * Moods far enough from each family to be fair wrong answers. Gloomy and eerie overlap, and a quiet
 * gloomy scene can seem calm, so those are never tested against each other.
 */
const FAR: Record<Family, Family[]> = {
  gloomy: ['joyful', 'chaotic', 'hopeful'],
  eerie: ['joyful', 'chaotic', 'hopeful'],
  tense: ['calm', 'joyful', 'hopeful'],
  calm: ['eerie', 'tense', 'chaotic'],
  joyful: ['gloomy', 'eerie', 'tense'],
  chaotic: ['gloomy', 'calm', 'hopeful'],
  hopeful: ['gloomy', 'eerie', 'chaotic'],
};
const WORDS: Record<Family, string[]> = {
  gloomy: ['Gloomy', 'Melancholy', 'Dreary'],
  eerie: ['Eerie', 'Ominous', 'Menacing'],
  tense: ['Tense', 'Suspenseful'],
  calm: ['Peaceful', 'Serene', 'Calm'],
  joyful: ['Joyful', 'Cheerful', 'Festive'],
  chaotic: ['Chaotic', 'Frantic'],
  hopeful: ['Hopeful'],
};

interface MoodPassage {
  text: string;
  family: Family;
  /** The details that most create the mood, for the worked solution. */
  why: string;
}
const MOOD_PASSAGES: MoodPassage[] = [
  { family: 'gloomy', text: 'Rain dripped from the broken gutters of the empty house. Inside, the furniture sat under grey sheets, and the clock on the mantelpiece had stopped years ago. No one had lit a fire there since the winter NAME’s grandfather died.', why: 'The dripping rain, the covered furniture, the stopped clock and the grandfather’s death all suggest loss and sadness.' },
  { family: 'gloomy', text: 'The bus station was nearly empty. A single bulb flickered over the cracked benches, and NAME sat alone with {his} suitcase, watching the drizzle turn the car park grey.', why: 'The empty station, the flickering bulb, the cracked benches and the grey drizzle make the scene dull and sad.' },
  { family: 'gloomy', text: 'All through that wet November, the fields stayed brown and flooded. The sky pressed down like a lid, and NAME’s mother no longer sang as she worked.', why: 'The brown, flooded fields, the heavy sky and the silence where there used to be singing create a sad, heavy feeling.' },
  { family: 'eerie', text: 'The swing in the abandoned playground moved back and forth, though there was no wind. Somewhere in the fog, a child’s laugh rang out, and then stopped.', why: 'A swing moving without wind and a laugh that suddenly stops in the fog are strange and unexplained, so the scene feels eerie.' },
  { family: 'eerie', text: 'Every portrait in the long hallway had its eyes scratched out. As NAME walked past, {he} could have sworn {he} heard whispering behind the walls.', why: 'The scratched-out eyes and the whispering behind the walls hint that something unnatural is present.' },
  { family: 'eerie', text: 'The village was perfectly silent. Doors stood open, plates of food sat half-eaten on the tables, and not a single person could be found.', why: 'A silent village abandoned in the middle of a meal is mysterious and unsettling.' },
  { family: 'tense', text: 'NAME held {his} breath as the footsteps stopped outside the cupboard door. The handle began to turn, very slowly.', why: 'Held breath, footsteps that stop and a handle turning slowly make the reader anxious about what comes next.' },
  { family: 'tense', text: 'Ten seconds were left on the clock. NAME stood at the free-throw line, the ball slippery in {his} sweating hands, while the whole crowd fell silent.', why: 'The ticking clock, the sweating hands and the sudden silence build pressure toward a single moment.' },
  { family: 'tense', text: 'The rope creaked. NAME looked down at the river far below, then at the frayed strands above {his} hands, and kept climbing, one hand at a time.', why: 'The creaking rope, the long drop and the frayed strands make the reader fear that the rope will break.' },
  { family: 'calm', text: 'Early morning light spread across the lake. A heron stood motionless in the reeds, and the only sound was the soft lap of water against NAME’s canoe.', why: 'Soft light, still water, a motionless heron and gentle sounds create a quiet, restful scene.' },
  { family: 'calm', text: 'Snow fell softly on the sleeping town. In the warm kitchen, NAME’s grandmother hummed as she rolled out the dough, and the cat dozed by the stove.', why: 'Soft snow, a warm kitchen, quiet humming and a dozing cat make the scene gentle and peaceful.' },
  { family: 'calm', text: 'NAME lay in the long grass on the hillside, watching the clouds drift slowly over the valley while the bees moved from flower to flower.', why: 'Lying in the grass, slowly drifting clouds and busy bees create a slow, relaxed feeling.' },
  { family: 'joyful', text: 'Music spilled into the street as the wedding guests danced under strings of lights. Children chased each other between the tables, and NAME laughed until {his} sides ached.', why: 'Music, dancing, lights, playing children and laughter create a happy, celebratory mood.' },
  { family: 'joyful', text: 'When the results were announced, NAME’s whole team leapt up, hugging, cheering and throwing their caps into the air.', why: 'Leaping, hugging, cheering and caps flying through the air are all signs of celebration.' },
  { family: 'joyful', text: 'The first warm day of the year brought everyone outside. The market was full of colour, the stallholders were joking, and the smell of fresh bread drifted down the street.', why: 'Warmth, colour, joking and the smell of fresh bread make the scene lively and happy.' },
  { family: 'chaotic', text: 'Alarms blared. People shoved toward every exit at once, a table crashed over, and someone was shouting NAME’s name, though {he} could not tell from where.', why: 'Blaring alarms, shoving crowds, crashing furniture and shouting from every direction create confusion and disorder.' },
  { family: 'chaotic', text: 'The kitchen was a storm of shouting cooks, hissing pans and slamming doors. Orders piled up faster than anyone could read them, and NAME dropped a tray of glasses.', why: 'Shouting, hissing, slamming and orders piling up show a busy kitchen out of control.' },
  { family: 'chaotic', text: 'The market square erupted as the goats broke loose: stalls toppled, fruit rolled everywhere, and traders ran in all directions after their animals.', why: 'Toppling stalls, rolling fruit and people running in all directions show disorder everywhere at once.' },
  { family: 'hopeful', text: 'After months of drought, the first drops of rain darkened the dust. NAME stood in the field with {his} face turned to the sky, and along the dry ditch the first green shoots were already showing.', why: 'Rain after drought and new green shoots suggest that things are about to get better.' },
  { family: 'hopeful', text: 'The hospital window faced east. Each morning NAME watched the sun rise a little earlier over the rooftops, and each morning {he} walked one step further down the corridor.', why: 'The rising sun and NAME’s daily progress suggest recovery and better days ahead.' },
];

interface PdMood {
  lead: string;
  excerpt: Excerpt;
  family: Family;
  answer: string;
  why: string;
}
const PD_MOODS: PdMood[] = [
  { lead: `This is the opening of ${titled(USHER)}:`, excerpt: USHER_OPENING, family: 'gloomy', answer: 'Gloomy', why: 'A “dull, dark, and soundless day”, low clouds, a “dreary tract of country” and “insufferable gloom” create a dark, depressing mood.' },
  { lead: `In ${titled(HOUR)}, Mrs. Mallard sits alone at her open window, an hour after hearing of her husband’s death:`, excerpt: HOUR_WINDOW, family: 'hopeful', answer: 'Hopeful', why: '“New spring life”, “the delicious breath of rain”, a distant song and twittering sparrows suggest fresh life and new possibilities.' },
  { lead: `In ${titled(HEART)}, the narrator stands in the dark beside the old man’s bed:`, excerpt: HEART_BEAT, family: 'tense', answer: 'Tense', why: 'The heart beats “quicker and quicker, and louder and louder”, building pressure toward something terrible.' },
  { lead: `This is the opening of ${titled(FIRE)}:`, excerpt: FIRE_OPENING, family: 'gloomy', answer: 'Bleak', why: '“Cold and grey, exceedingly cold and grey”, repeated, and a “dim and little-travelled trail” make the scene bleak and lonely.' },
  { lead: `In ${titled(PAW)}, late at night after the second wish, Mr. White goes downstairs in the dark:`, excerpt: PAW_KNOCK, family: 'tense', answer: 'Suspenseful', why: 'The match goes out in the dark, and a “quiet and stealthy” knock sounds at that very moment, so the reader dreads what is outside.' },
];

function moodChoices(rng: Rng, family: Family, answer: string, max = 4) {
  const wrong = rng.shuffle(FAR[family]).map((f) => rng.pick(WORDS[f]));
  return mc(rng, answer, wrong, { max });
}

function moodQ(rng: Rng, d: Difficulty) {
  if (d === 3 || (d === 2 && rng.chance(0.5))) {
    if (d === 3 && rng.chance(0.5)) return moodShift(rng);
    const m = rng.pick(PD_MOODS);
    return {
      prompt: `${m.lead}\n\n${quoteBlock(m.excerpt)}\n\nWhich word best describes the **mood** of this passage?`,
      parts: [part(moodChoices(rng, m.family, m.answer))],
      hints: ['Mood is the feeling the passage creates in the reader. Look at the descriptive words and images: what feeling do they share?'],
      solution: [`The mood is ${m.answer.toLowerCase()}.`, m.why],
    };
  }
  const cast = pair(rng);
  const p = rng.pick(MOOD_PASSAGES);
  const answer = rng.pick(WORDS[p.family]);
  return {
    prompt: `${block(fill(p.text, cast))}\n\nWhich word best describes the **mood** of this passage?`,
    parts: [part(moodChoices(rng, p.family, answer, d === 1 ? 3 : 4))],
    hints: ['Mood is the feeling the passage creates in the reader. Look at the descriptive words and images: what feeling do they share?'],
    solution: [`The mood is ${answer.toLowerCase()}.`, fill(p.why, cast)],
  };
}

interface Shift {
  text: string;
  from: string;
  to: string;
  /** Two wrong descriptions, besides the reverse of the right one. */
  wrong: [string, string];
}
const SHIFTS: Shift[] = [
  { text: 'The picnic by the river was perfect: warm sun, cold lemonade and NAME’s little brother splashing in the shallows. Then the splashing stopped. NAME looked up, and the river was empty.', from: 'peaceful', to: 'alarming', wrong: ['From tense to joyful', 'From gloomy to peaceful'] },
  { text: 'For three days the storm battered the cabin, rattling the shutters and howling down the chimney. On the fourth morning NAME woke to silence, opened the door, and found the valley shining under fresh snow and a clear blue sky.', from: 'threatening', to: 'peaceful', wrong: ['From joyful to gloomy', 'From calm to frantic'] },
  { text: 'The house was full of noise and laughter as the family opened their presents. Then the phone rang. NAME’s mother listened, set down the receiver without a word and sat very still.', from: 'joyful', to: 'ominous', wrong: ['From gloomy to cheerful', 'From calm to festive'] },
  { text: 'NAME crept through the dark forest, flinching at every snapped twig. At last the trees opened onto a meadow where fireflies drifted and the moon shone on a quiet pond.', from: 'tense', to: 'calm', wrong: ['From joyful to gloomy', 'From peaceful to frantic'] },
  { text: 'The waiting room was silent except for the ticking clock, and NAME could not stop {his} knee from shaking. Then the doctor appeared in the doorway, smiling, and NAME’s whole family burst into happy tears.', from: 'tense', to: 'joyful', wrong: ['From cheerful to gloomy', 'From calm to eerie'] },
];

function moodShift(rng: Rng) {
  const cast = pair(rng);
  const s = rng.pick(SHIFTS);
  const correct = `From ${s.from} to ${s.to}`;
  const wrong = [`From ${s.to} to ${s.from}`, ...s.wrong];
  return {
    prompt: `${block(fill(s.text, cast))}\n\nHow does the **mood** change in this passage?`,
    parts: [part(mc(rng, correct, wrong))],
    hints: ['Find the moment where the passage turns. Describe the feeling before that moment, then the feeling after it.'],
    solution: [`The passage begins ${s.from} and becomes ${s.to}.`, 'The turn comes with a single change in the details, and the descriptive words after it create a different feeling.'],
  };
}

// ---------------------------------------------------------------------------- details that create the mood; tone and mood

/** Extra details that fit each mood, for “which detail would add to the mood” questions. */
const MOOD_DETAILS: Record<Family, string[]> = {
  gloomy: ['A dead plant drooped on the windowsill.', 'Grey water dripped steadily from the roof.', 'The last of the light faded from the sky.', 'Somewhere a dog howled, then fell silent.'],
  eerie: ['A door at the end of the hall creaked open by itself.', 'The candle flames bent, though no air was moving.', 'A shadow crossed the window, though no one was outside.', 'Footprints led into the room but none led out.'],
  tense: ['The clock ticked louder with every second.', 'NAME’s heart hammered against {his} ribs.', 'Somewhere close by, a floorboard creaked.', 'The phone rang once, then stopped.'],
  calm: ['A soft breeze stirred the curtains.', 'Somewhere far off, a church bell rang gently.', 'The kettle sighed quietly on the stove.', 'A cat stretched lazily in a patch of sunlight.'],
  joyful: ['Someone started a song, and soon everyone joined in.', 'Balloons bobbed above the dancing crowd.', 'The children’s laughter echoed down the street.', 'Bright flags fluttered over the square.'],
  chaotic: ['Somewhere a glass shattered, and a baby began to wail.', 'People pushed past each other in every direction.', 'Three phones rang at once, and nobody answered any of them.', 'Papers flew off the desks as the door burst open.'],
  hopeful: ['A single green shoot pushed up through the ashes.', 'The clouds parted, and sunlight touched the hills.', 'A letter of acceptance lay waiting on the table.', 'The first swallows of spring returned to the barn.'],
};

interface KeyWord {
  lead: string;
  excerpt: Excerpt;
  mood: string;
  key: string;
  neutral: string[];
  why: string;
}
const KEY_WORDS: KeyWord[] = [
  { lead: `The opening of ${titled(USHER)}:`, excerpt: USHER_OPENING, mood: 'gloomy', key: 'gloom', neutral: ['horseback', 'year', 'building'], why: '“Insufferable gloom” names the feeling outright; “horseback”, “year” and “building” only give facts.' },
  { lead: `From ${titled(MAGI)}, as Della, who has only one dollar and eighty-seven cents, finishes crying:`, excerpt: MAGI_GRAY, mood: 'dreary', key: 'gray', neutral: ['window', 'cat', 'fence'], why: 'The word “gray”, used three times in one sentence, makes the whole view dull and lifeless; the cat, the fence and the window are simply things she sees.' },
  { lead: `From ${titled(HOUR)}:`, excerpt: HOUR_WINDOW, mood: 'hopeful', key: 'spring', neutral: ['square', 'street', 'house'], why: '“The new spring life” suggests renewal and fresh starts; the square, the street and the house are just places.' },
  { lead: `The opening of ${titled(FIRE)}:`, excerpt: FIRE_OPENING, mood: 'bleak', key: 'grey', neutral: ['trail', 'bank', 'eastward'], why: '“Grey”, repeated with “cold”, drains the scene of colour and warmth; “trail”, “bank” and “eastward” only give directions.' },
  { lead: `From ${titled(HEART)}:`, excerpt: HEART_BEAT, mood: 'tense', key: 'hellish', neutral: ['meantime', 'instant', 'every'], why: '“Hellish” gives the sound of the heart a terrible, threatening quality; the other words only mark time.' },
  { lead: `From ${titled(PAW)}, late at night:`, excerpt: PAW_KNOCK, mood: 'suspenseful', key: 'stealthy', neutral: ['stairs', 'match', 'front'], why: 'A “stealthy” knock is secretive and threatening, so the reader fears what is outside; the stairs, the match and the front door are just part of the scene.' },
];

interface ToneMood {
  lead: string;
  excerpt: Excerpt;
  tone: string;
  mood: string;
  wrong: Array<[string, string]>;
  why: string;
}
const TONE_MOODS: ToneMood[] = [
  { lead: `The opening of ${titled(HEART)}:`, excerpt: HEART_OPENING, tone: 'nervous and defensive', mood: 'unsettling', wrong: [['calm and relaxed', 'peaceful'], ['cheerful', 'joyful'], ['unsettling', 'nervous and defensive']], why: 'The narrator sounds nervous and defensive as he insists he is not mad, and that makes the reader uneasy.' },
  { lead: `The opening of ${titled(MAGI)}:`, excerpt: MAGI_OPENING, tone: 'playful and affectionate', mood: 'sympathetic', wrong: [['angry and bitter', 'frightening'], ['cold and scientific', 'tense'], ['mournful', 'eerie']], why: 'The narrator jokes gently (“bulldozing the grocer”) while clearly liking Della, and the reader feels sympathy for her.' },
  { lead: `From ${titled(CASK)}, in which the narrator, Montresor, has vowed revenge on Fortunato:`, excerpt: CASK_SMILE, tone: 'calm and coldly satisfied', mood: 'chilling', wrong: [['guilty and regretful', 'comforting'], ['cheerful and silly', 'lighthearted'], ['chilling', 'calm and coldly satisfied']], why: 'Montresor describes his plan calmly, even with satisfaction, and the reader is chilled by how cold he is.' },
  { lead: `From ${titled(FIRE)}, describing the man walking alone in the cold:`, excerpt: FIRE_FROST, tone: 'detached and critical', mood: 'ominous', wrong: [['excited and joyful', 'festive'], ['tender and loving', 'romantic'], ['ominous', 'detached and critical']], why: 'The narrator coolly points out what the man fails to understand, and the reader senses danger ahead.' },
  { lead: `From ${titled(WINDOW)}:`, excerpt: WINDOW_FRAMTON, tone: 'gently mocking', mood: 'amusing', wrong: [['mournful', 'tragic'], ['fearful', 'terrifying'], ['admiring', 'inspiring']], why: 'The narrator pokes fun at Framton’s belief that strangers want to hear about his illnesses, and the reader is amused.' },
];
const toneMood = (tone: string, mood: string) => `Tone: ${tone}; mood: ${mood}`;

function moodDetails(rng: Rng, d: Difficulty) {
  if (d === 3) {
    const t = rng.pick(TONE_MOODS);
    return {
      prompt: `${t.lead}\n\n${quoteBlock(t.excerpt)}\n\nWhich choice correctly describes the narrator’s **tone** and the **mood** it creates for the reader?`,
      parts: [part(mc(rng, toneMood(t.tone, t.mood), t.wrong.map(([a, b]) => toneMood(a, b))))],
      hints: ['Tone is the writer’s or narrator’s attitude: how they sound. Mood is the feeling the reader gets. The two can be different.'],
      solution: [t.why, `So the tone is ${t.tone}, and the mood is ${t.mood}.`],
    };
  }
  if (d === 2 && rng.chance(0.6)) {
    const k = rng.pick(KEY_WORDS);
    return {
      prompt: `${k.lead}\n\n${quoteBlock(k.excerpt)}\n\nWhich word from the passage does the most to create its ${k.mood} mood?`,
      parts: [part(mc(rng, `“${k.key}”`, k.neutral.map((w) => `“${w}”`)))],
      hints: ['Look for a word that carries a feeling, not one that only names a thing, a place or a time.'],
      solution: [k.why],
    };
  }
  const cast = pair(rng);
  const p = rng.pick(MOOD_PASSAGES);
  const right = fill(rng.pick(MOOD_DETAILS[p.family]), cast);
  const wrong = rng.shuffle(FAR[p.family]).map((f) => fill(rng.pick(MOOD_DETAILS[f]), cast));
  const word = WORDS[p.family][0].toLowerCase();
  return {
    prompt: `${block(fill(p.text, cast))}\n\nThe mood of this passage is ${word}. Which sentence, added to the end, would best **keep** that mood?`,
    parts: [part(mc(rng, right, wrong, { max: d === 1 ? 3 : 4 }))],
    hints: ['Choose the detail whose images and sounds create the same feeling as the rest of the passage.'],
    solution: [`“${right}” fits the ${word} mood.`, 'Each of the other sentences would create a different feeling and break the mood.'],
  };
}

// ============================================================================ lesson 1.4: point of view

type Pov = 'first' | 'second' | 'limited' | 'omniscient' | 'objective';
const POV_NAME: Record<Pov, string> = {
  first: 'First person',
  second: 'Second person',
  limited: 'Third person limited',
  omniscient: 'Third person omniscient',
  objective: 'Third person objective',
};
const POV_WHAT: Record<Pov, string> = {
  first: 'a first-person narrator is a character in the story who tells it as “I”',
  second: 'second-person narration speaks to “you”, putting the reader in the main character’s place',
  limited: 'a third-person limited narrator uses “he”, “she” or “they” and reveals the thoughts of only one character',
  omniscient: 'a third-person omniscient narrator knows everything and can reveal the thoughts of several characters',
  objective: 'a third-person objective narrator reports only what can be seen and heard, like a camera, and reveals no one’s thoughts',
};

/**
 * Scenes for generated passages. [A] is the viewpoint character (I, you, or a name), [Aa] the same
 * person as a capitalized pronoun, [a] lower case, [a:obj] and [a:pos] object and possessive,
 * [A:obj] the object on first mention, [was] agrees with A. [B], [Bb], [b], [b:pos] are the other person.
 */
interface Scene {
  setup: string;
  aThought: string;
  act: string;
  bThought: string;
  act2: string;
  comment: string;
}
const SCENES: Scene[] = [
  {
    setup: '[A] picked up the pieces of the blue vase and set them on the table just as [B] came through the door.',
    aThought: '[Aa] wondered whether [b] would believe it had been the cat.',
    act: '“What happened here?” [b] asked, looking from the table to [A:obj].',
    bThought: '[Bb] knew perfectly well that the cat had been asleep upstairs all afternoon.',
    act2: '[A] shrugged and pointed at the stairs.',
    comment: 'Neither of them knew that the vase had been a cheap copy all along.',
  },
  {
    setup: '[A] opened the envelope with the exam results while [B] waited by the window.',
    aThought: '[Aa] [was] sure that [a] had failed the science paper.',
    act: '“Well?” [b] asked.',
    bThought: '[Bb] had already decided to say something kind, whatever the results were.',
    act2: '[A] unfolded the page and read it twice.',
    comment: 'It was, though neither of them could have guessed it, the highest mark in the school.',
  },
  {
    setup: '[A] stopped in the middle of the crowded market and turned in a slow circle, looking for [B].',
    aThought: '[Aa] felt a cold wave of panic rise in [a:pos] chest.',
    act: 'A voice called [A:pos] name from behind the spice stall.',
    bThought: '[Bb] had been watching the whole time, trying not to laugh.',
    act2: '[A] hurried toward the spice stall.',
    comment: 'Years later, it would become the family’s favourite story.',
  },
  {
    setup: '[A] stepped onto the stage, and [B], the director, looked up from [b:pos] notes.',
    aThought: '[Aa] could hear [a:pos] own heart pounding over the hum of the lights.',
    act: '“Whenever you’re ready,” [b] said.',
    bThought: '[Bb] privately hoped this would be the last audition of a very long day.',
    act2: '[A] cleared [a:pos] throat and began to sing.',
    comment: 'Neither of them knew that this audition would change both of their lives.',
  },
  {
    setup: '[A] tied the boat to the dock as the first heavy drops of rain began to fall, and [B] watched from the porch.',
    aThought: '[Aa] wished [a] had listened to the weather report that morning.',
    act: '“Come inside!” [b] shouted over the wind.',
    bThought: '[Bb] was secretly relieved that the boat had made it back at all.',
    act2: '[A] pulled the last knot tight and ran for the house.',
    comment: 'By midnight, the storm would tear the dock away.',
  },
  {
    setup: '[A] slid the letter across the kitchen table to [B].',
    aThought: '[Aa] had rehearsed what to say all morning, but now the words would not come.',
    act: '[B] read the first line and put the letter down.',
    bThought: '[Bb] recognized the handwriting at once and felt [b:pos] stomach drop.',
    act2: '“Where did you find this?” [b] asked quietly.',
    comment: 'The letter had been lost for twenty years.',
  },
  {
    setup: '[A] placed the ball on the penalty spot while [B], the goalkeeper, bounced on [b:pos] toes.',
    aThought: '[Aa] decided to aim for the top left corner.',
    act: 'The referee blew the whistle.',
    bThought: '[Bb] was certain the kick would go to the right.',
    act2: '[A] took three steps back and ran at the ball.',
    comment: 'The kick would be replayed on television for weeks.',
  },
  {
    setup: '[A] carried a plate of dumplings to the door of [B], the new neighbour.',
    aThought: '[Aa] hoped [b] would not notice that half of them were burnt.',
    act: '[B] opened the door and smiled.',
    bThought: '[Bb] had been too nervous to knock on anyone’s door all week.',
    act2: '[A] held out the plate.',
    comment: 'It was the start of a friendship that would last forty years.',
  },
];

type Voice = 'first' | 'second' | 'third';
function render(t: string, voice: Voice, a: Person, b: Person, standalone = false): string {
  const A = { first: { sub: 'I', obj: 'me', pos: 'my', was: 'was' }, second: { sub: 'you', obj: 'you', pos: 'your', was: 'were' }, third: { sub: a.he, obj: a.him, pos: a.his, was: 'was' } }[voice];
  const nameA = voice === 'third' ? a.name : cap(A.sub);
  return t
    .replace(/\[A:obj\]/g, voice === 'third' ? a.name : A.obj)
    .replace(/\[A:pos\]/g, voice === 'third' ? `${a.name}’s` : A.pos)
    .replace(/\[A\]/g, nameA)
    .replace(/\[Aa\]/g, standalone ? nameA : voice === 'first' ? 'I' : cap(A.sub))
    .replace(/\[a:obj\]/g, A.obj)
    .replace(/\[a:pos\]/g, A.pos)
    .replace(/\[a\]/g, A.sub)
    .replace(/\[was\]/g, A.was)
    .replace(/\[B\]/g, b.name)
    .replace(/\[Bb\]/g, standalone ? b.name : cap(b.he))
    .replace(/\[b:pos\]/g, b.his)
    .replace(/\[b\]/g, b.he);
}

function passage(rng: Rng, pov: Pov, withComment = false): { text: string; a: Person; b: Person } {
  const s = rng.pick(SCENES);
  const [a, b] = pair(rng);
  const voice: Voice = pov === 'first' ? 'first' : pov === 'second' ? 'second' : 'third';
  const parts =
    pov === 'objective' ? [s.setup, s.act, s.act2] : pov === 'omniscient' ? [s.setup, s.aThought, s.act, s.bThought, ...(withComment ? [s.comment] : [])] : [s.setup, s.aThought, s.act];
  return { text: parts.map((p) => render(p, voice, a, b)).join(' '), a, b };
}

interface PdPov {
  lead: string;
  excerpt: Excerpt;
  pov: Pov;
  choices: Pov[];
  why: string;
}
const PD_POVS: PdPov[] = [
  { lead: `The opening of ${titled(HEART)}:`, excerpt: HEART_OPENING, pov: 'first', choices: ['second', 'limited', 'omniscient'], why: 'The narrator is a character who speaks as “I”. He also says “you”, but he is speaking to a listener, not telling the story about “you”.' },
  { lead: `The opening of ${titled(CASK)}:`, excerpt: CASK_OPENING, pov: 'first', choices: ['second', 'limited', 'objective'], why: 'The narrator, Montresor, is a character in the story and tells it as “I”.' },
  { lead: `The opening of ${titled(USHER)}:`, excerpt: USHER_OPENING, pov: 'first', choices: ['second', 'limited', 'objective'], why: 'The narrator is a character travelling toward the house, and he tells the story as “I”.' },
  { lead: `From ${titled(HOUR)}, as Mrs. Mallard sits alone in her room:`, excerpt: HOUR_FREE, pov: 'limited', choices: ['first', 'second', 'objective'], why: 'The narrator uses “she” and shows what Mrs. Mallard is thinking, and only her thoughts.' },
  { lead: `From ${titled(FIRE)}:`, excerpt: FIRE_IMAGINATION, pov: 'omniscient', choices: ['first', 'second', 'objective'], why: 'The narrator uses “he” and judges the man from outside, telling the reader something the man himself does not realize: that he lacks imagination.' },
  { lead: `The opening of ${titled(OWL)}:`, excerpt: OWL_OPENING, pov: 'objective', choices: ['first', 'second'], why: 'The narrator reports only what could be seen, like a camera, and reveals no one’s thoughts.' },
  { lead: `In ${titled(MAGI)}, the narrator tells us what both Della and Jim think and feel, and sometimes speaks straight to the reader, as here:`, excerpt: MAGI_PIER_GLASS, pov: 'omniscient', choices: ['second', 'first', 'objective'], why: 'The narrator is not a character and knows both Della’s and Jim’s thoughts. Speaking to the reader as “you” once in a while does not make a story second person.' },
];

function pointOfView(rng: Rng, d: Difficulty) {
  if (d === 3 && rng.chance(0.6)) {
    const p = rng.pick(PD_POVS);
    return {
      prompt: `${p.lead}\n\n${quoteBlock(p.excerpt)}\n\nFrom which point of view is this told?`,
      parts: [part(mc(rng, POV_NAME[p.pov], p.choices.map((c) => POV_NAME[c])))],
      hints: ['First, find the narrator’s pronouns: “I”, “you”, or “he”, “she” and “they”. In third person, ask whose thoughts the narrator can reveal.'],
      solution: [`This is ${POV_NAME[p.pov].toLowerCase()}: ${POV_WHAT[p.pov]}.`, p.why],
    };
  }
  if (d === 1) {
    const pov = rng.pick(['first', 'second', 'limited', 'omniscient', 'objective'] as Pov[]);
    const { text } = passage(rng, pov);
    const answer = pov === 'first' ? 0 : pov === 'second' ? 1 : 2;
    return {
      prompt: `${block(text)}\n\nIs this passage told in the first, second or third person?`,
      parts: [part(fixedChoice(['First person (“I”)', 'Second person (“you”)', 'Third person (“he”, “she”, “they”)'], answer))],
      hints: ['Look at how the narrator refers to the main character: “I”, “you”, or a name with “he”, “she” or “they”. Ignore “you” inside quotation marks: that is a character speaking.'],
      solution: [pov === 'first' ? 'The narrator is the main character and calls themselves “I”, so it is first person.' : pov === 'second' ? 'The narrator calls the main character “you”, so it is second person.' : 'The narrator calls the characters by name and “he” or “she”, so it is third person.'],
    };
  }
  const pov = d === 2 ? rng.pick(['limited', 'omniscient', 'objective'] as Pov[]) : rng.pick(['limited', 'omniscient', 'objective', 'first'] as Pov[]);
  const { text, a, b } = passage(rng, pov, d === 3);
  const others = (['first', 'limited', 'omniscient', 'objective'] as Pov[]).filter((x) => x !== pov);
  return {
    prompt: `${block(text)}\n\nFrom which point of view is this passage told?`,
    parts: [part(mc(rng, POV_NAME[pov], others.map((x) => POV_NAME[x])))],
    hints: ['In third person, count whose thoughts the narrator reveals: one character (limited), several (omniscient), or none (objective).'],
    solution: [`This is ${POV_NAME[pov].toLowerCase()}: ${POV_WHAT[pov]}.`, povWhy(pov, a, b)],
  };
}

function povWhy(pov: Pov, a: Person, b: Person): string {
  switch (pov) {
    case 'limited':
      return `We learn what ${a.name} thinks, but not what ${b.name} thinks.`;
    case 'omniscient':
      return `We learn the thoughts of both ${a.name} and ${b.name}.`;
    case 'objective':
      return 'We see what the characters do and hear what they say, but we are never told what anyone thinks or feels.';
    case 'first':
      return 'The narrator is the character who calls themselves “I”.';
    default:
      return 'The narrator calls the main character “you”.';
  }
}

// ---------------------------------------------------------------------------- what a narrator can know; unreliable narrators

interface Effect {
  q: string;
  right: string;
  wrong: string[];
  why: string;
}
const EFFECTS: Effect[] = [
  { q: 'What does **first-person** narration let the reader experience most directly?', right: 'The narrator’s own thoughts and feelings', wrong: ['The private thoughts of every character', 'Only what a camera could record', 'Events the narrator could not have seen or heard about'], why: 'A first-person narrator tells the story from inside their own head, so we share their thoughts and feelings, but no one else’s.' },
  { q: 'What is a **limitation** of a first-person narrator?', right: 'The reader learns only what the narrator knows, notices or chooses to tell.', wrong: ['The reader never learns how the narrator feels.', 'The narrator must reveal every character’s thoughts.', 'The narrator cannot take part in the events.'], why: 'Everything reaches the reader through one character, who may not know, notice or tell everything.' },
  { q: 'A mystery is told in **third person limited**, following the detective. What effect does this have?', right: 'The reader discovers the clues only as the detective does.', wrong: ['The reader knows the criminal’s thoughts from the first page.', 'The reader sees every character’s secrets at once.', 'The reader cannot learn what the detective thinks.'], why: 'A limited narrator shows only one character’s thoughts, so the reader solves the mystery alongside the detective.' },
  { q: 'What does **third person objective** narration leave the reader to do?', right: 'Infer the characters’ thoughts and feelings from what they say and do', wrong: ['Read every character’s thoughts directly', 'Trust the narrator’s opinions about each character', 'Imagine themselves as the main character'], why: 'An objective narrator never enters anyone’s mind, so the reader must work out thoughts and feelings from words and actions.' },
  { q: 'What can a **third person omniscient** narrator do that a limited narrator cannot?', right: 'Reveal the thoughts of several characters, and things none of them know', wrong: ['Tell the story as “I”', 'Report only what can be seen and heard', 'Speak to the reader as the main character'], why: 'An omniscient narrator is all-knowing: it can move into any character’s mind and tell the reader things no character knows.' },
  { q: 'What effect does **second-person** narration usually have?', right: 'It puts the reader in the main character’s place, as if the events were happening to them.', wrong: ['It lets the reader see every character’s thoughts.', 'It makes the narrator seem distant and objective.', 'It turns the narrator into a minor character.'], why: 'Telling the story to “you” places the reader inside the events.' },
];

interface Unreliable {
  lead: string;
  text?: string;
  excerpt?: Excerpt;
  right: string;
  wrong: string[];
}
const UNRELIABLE: Unreliable[] = [
  { lead: `The opening of ${titled(HEART)}:`, excerpt: HEART_OPENING, right: 'He insists that he is calm and sane, yet he claims to hear things in heaven and in hell.', wrong: ['He tells the story in the third person.', 'He admits that he has forgotten most of what happened.', 'He says nothing about his own feelings.'] },
  { lead: `From ${titled(HEART)}:`, excerpt: HEART_WISELY, right: 'He offers his careful planning as proof that he is not mad, though he is planning to kill a harmless old man.', wrong: ['He admits openly that he is mad.', 'He describes events he could not have seen.', 'He gives the old man’s thoughts in detail.'] },
  { lead: `The opening of ${titled(CASK)}:`, excerpt: CASK_OPENING, right: 'He never says what Fortunato’s “insult” was, so we have only his word that revenge was deserved.', wrong: ['He tells the story in the third person.', 'He admits that he regrets his revenge.', 'He reveals the thoughts of every character.'] },
  { lead: 'A first-person narrator says:', text: 'I am the most honest person in my class; everyone says so. That is why nobody suspected me when the money went missing from the teacher’s desk, and why I never had to explain my new headphones.', right: 'The details suggest that the narrator took the money, which contradicts the claim to be honest.', wrong: ['The narrator tells the story in the third person.', 'The narrator gives too few details about the classroom.', 'The narrator was not present at the events.'] },
  { lead: 'A first-person narrator says:', text: 'I am not jealous of NAME. I simply told the coach that {he} trips over the ball and that the team might be better without {him}. Anyone would have done the same.', right: 'The narrator denies being jealous while trying to get NAME dropped from the team.', wrong: ['The narrator tells the story in the third person.', 'The narrator describes NAME’s private thoughts.', 'The narrator was not present at the events.'] },
  { lead: 'A first-person narrator says:', text: 'Nothing frightens me. I only left the light on all night because I was reading, and I only slept on the floor of my sister’s room because my own bed was too soft.', right: 'The narrator’s actions suggest fear, which contradicts the claim that nothing is frightening.', wrong: ['The narrator tells the story in the second person.', 'The narrator describes a setting that does not exist.', 'The narrator reveals the sister’s private thoughts.'] },
  { lead: 'A first-person narrator says:', text: 'My new neighbour is a dangerous man. I have never spoken to him, but he keeps his curtains closed, and once I saw him carrying a shovel.', right: 'The narrator jumps to a serious conclusion from very little evidence.', wrong: ['The narrator tells the story in the third person.', 'The narrator admits to having lied about the shovel.', 'The narrator knows the neighbour too well to judge him.'] },
];

function narrator(rng: Rng, d: Difficulty) {
  if (d === 1) {
    const e = rng.pick(EFFECTS);
    return {
      prompt: e.q,
      parts: [part(mc(rng, e.right, e.wrong))],
      hints: ['Think about whose mind the narrator can see into, and what that lets the reader know.'],
      solution: [e.why],
    };
  }
  if (d === 3) {
    const u = rng.pick(UNRELIABLE);
    const cast = pair(rng);
    const body = u.excerpt ? quoteBlock(u.excerpt) : block(fill(u.text!, cast));
    return {
      prompt: `${u.lead}\n\n${body}\n\nWhy should a reader be careful about trusting this narrator?`,
      parts: [part(mc(rng, fill(u.right, cast), u.wrong.map((w) => fill(w, cast))))],
      hints: ['An unreliable narrator’s words and actions do not match, or their judgments go far beyond the evidence. Look for a contradiction.'],
      solution: [`${fill(u.right, cast)} That makes the narrator unreliable: we cannot take everything they say at face value.`],
    };
  }
  // Difficulty 2: which sentence could not appear in a story told from this point of view.
  const s = rng.pick(SCENES);
  const [a, b] = pair(rng);
  const pov = rng.pick(['first', 'limited', 'objective'] as Pov[]);
  const voice: Voice = pov === 'first' ? 'first' : 'third';
  const r = (t: string) => render(t, voice, a, b, true);
  let right: string;
  let ok: string[];
  let setupLine: string;
  if (pov === 'objective') {
    right = r(s.aThought);
    ok = [r(s.setup), r(s.act2)];
    setupLine = `A story is told in **third person objective**. Which sentence could **not** appear in it?`;
  } else {
    right = r(s.bThought);
    ok = [r(s.setup), r(s.aThought)];
    setupLine = pov === 'first' ? `A story is told in the **first person** by its main character, who calls themselves “I”. Which sentence could **not** appear in it, unless someone told the narrator?` : `A story is told in **third person limited**, from ${a.name}’s point of view. Which sentence could **not** appear in it?`;
  }
  return {
    prompt: setupLine,
    parts: [part(mc(rng, right, ok))],
    hints: [pov === 'objective' ? 'An objective narrator reports only what can be seen and heard.' : `This narrator can reveal only ${pov === 'first' ? 'the narrator’s own' : `${a.name}’s`} thoughts and what can be seen and heard.`],
    solution: [
      pov === 'objective'
        ? `“${right}” reveals what a character is thinking or feeling, which an objective narrator never does.`
        : `“${right}” reveals ${b.name}’s private thoughts, which ${pov === 'first' ? 'the narrator' : `a narrator limited to ${a.name}’s mind`} cannot know.`,
      'The other sentences describe actions, or the viewpoint character’s own thoughts, which this narrator can report.',
    ],
  };
}

export const VOICE_SKILLS: SkillDef[] = [
  skill({
    id: 'e10-mood',
    name: 'Mood',
    description: 'Describe the mood a passage creates, and how the mood shifts.',
    outcomes: ['10-A1'],
    lessonId: 'e10-1-3',
    format: 'mc',
    gen: moodQ,
  }),
  skill({
    id: 'e10-mood-details',
    name: 'Details that create mood; tone and mood',
    description: 'Find the words and details that create a mood, and tell the narrator’s tone from the reader’s mood.',
    outcomes: ['10-A1'],
    lessonId: 'e10-1-3',
    format: 'mc',
    gen: moodDetails,
  }),
  skill({
    id: 'e10-point-of-view',
    name: 'Point of view',
    description: 'Identify first-person, second-person and third-person limited, omniscient and objective narration.',
    outcomes: ['10-A1'],
    lessonId: 'e10-1-4',
    format: 'mc',
    gen: pointOfView,
  }),
  skill({
    id: 'e10-narrator',
    name: 'What a narrator can know',
    description: 'Explain what a narrator can and cannot know, the effect of a point of view, and why a narrator may be unreliable.',
    outcomes: ['10-A1'],
    lessonId: 'e10-1-4',
    format: 'mc',
    gen: narrator,
  }),
];
