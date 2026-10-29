/**
 * Grade 12 English, lesson 7.5: Etymology and Academic Vocabulary (12-G2). Word histories that
 * explain present meanings, words that came from myths and people, words whose meanings have
 * shifted, Latin roots and cognates; and the precise verbs and nouns of literary analysis in place
 * of "shows", "talks about" and "is about". The etymologies are the standard dictionary accounts;
 * popular stories that dictionaries reject (sincere as "without wax", posh as "port out, starboard
 * home") are left out, and where a history is uncertain it is either said to be uncertain or not used.
 */
import { mc, part, skill, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { block } from '../../eng10/gen/common.ts';

const LESSON = 'e12-7-5';
const OUTCOMES = ['12-G2'];
const GAP = '\\_\\_\\_\\_\\_';

// ---------------------------------------------------------------------------- etymology

type Kind = 'myth' | 'person' | 'shifted' | 'compound' | 'image';
interface Word {
  word: string;
  /** The history, written without naming the word. */
  origin: string;
  /** What the word means today. */
  meaning: string;
  kind: Kind;
}
const W = (word: string, kind: Kind, origin: string, meaning: string): Word => ({ word, kind, origin, meaning });

const WORDS: Word[] = [
  W('sinister', 'image', 'from Latin *sinister*, “on the left”: the left side was once thought unlucky', 'threatening, or suggesting that something evil will happen'),
  W('disaster', 'image', 'from Latin *dis-*, “badly”, and *astrum*, “star”: a misfortune blamed on unlucky stars', 'a sudden event that causes great damage or suffering'),
  W('companion', 'compound', 'from Latin *com-*, “with”, and *panis*, “bread”: someone you share bread with', 'a person you spend time with or travel with'),
  W('muscle', 'image', 'from Latin *musculus*, “little mouse”: a flexing muscle looked like a mouse under the skin', 'tissue in the body that tightens to produce movement'),
  W('candidate', 'image', 'from Latin *candidatus*, “dressed in white”: Romans seeking office wore a whitened toga', 'a person who applies for a job or stands for election'),
  W('quarantine', 'image', 'from Italian *quaranta giorni*, “forty days”: the time ships arriving in Venice were kept apart', 'a period of isolation to stop a disease from spreading'),
  W('curfew', 'image', 'from Old French *cuevrefeu*, “cover fire”: a bell at nightfall meant that fires must be covered', 'a rule that people must be indoors after a certain hour'),
  W('nice', 'shifted', 'from Latin *nescius*, “not knowing”: in Middle English it meant “foolish” before it softened', 'pleasant, agreeable or kind'),
  W('silly', 'shifted', 'from Old English *sælig*, “happy, blessed”: it later meant “innocent”, and only then “foolish”', 'foolish, or lacking good sense'),
  W('awful', 'shifted', 'first meant “full of awe” or “inspiring awe” before it weakened over the centuries', 'very bad or unpleasant'),
  W('hippopotamus', 'compound', 'from Greek *hippos*, “horse”, and *potamos*, “river”: a “river horse”', 'a very large African animal that lives in and near rivers'),
  W('philosophy', 'compound', 'from Greek *philos*, “loving”, and *sophia*, “wisdom”: the love of wisdom', 'the study of the basic questions of knowledge, truth and how to live'),
  W('democracy', 'compound', 'from Greek *dēmos*, “the people”, and *kratos*, “power, rule”: rule by the people', 'a system of government in which citizens choose their leaders'),
  W('tantalize', 'myth', 'from Tantalus, punished in Greek myth with food and water always just out of reach', 'to tease someone with something desirable that they cannot have'),
  W('narcissism', 'myth', 'from Narcissus, who in Greek myth fell in love with his own reflection in a pool', 'excessive admiration of oneself and one’s own appearance'),
  W('panic', 'myth', 'from Pan, the Greek god whose sudden appearance or cry was said to fill people with fear', 'sudden, overwhelming fear that stops clear thinking'),
  W('jovial', 'myth', 'from Latin *Jovialis*, “of Jupiter”: people born under that planet were thought to be cheerful', 'cheerful, friendly and good-humoured'),
  W('mercurial', 'myth', 'from Mercury, the quick, changeable messenger of the Roman gods, and the planet named for him', 'changing mood or mind quickly and unpredictably'),
  W('martial', 'myth', 'from Mars, the Roman god of war', 'having to do with war, fighting or soldiers'),
  W('lunatic', 'image', 'from Latin *luna*, “moon”: madness was once thought to rise and fall with the moon’s phases', 'an old, now offensive word for a person thought to be mad'),
  W('vaccine', 'image', 'from Latin *vacca*, “cow”: the first vaccine used cowpox to protect people from smallpox', 'a substance that trains the body to resist a disease'),
  W('boycott', 'person', 'from Charles Boycott, a land agent in Ireland whom local people refused to deal with in 1880', 'to refuse to buy, use or take part in something as a protest'),
  W('sandwich', 'person', 'named after the fourth Earl of Sandwich, an eighteenth-century English nobleman', 'two slices of bread with a filling between them'),
  W('window', 'image', 'from Old Norse *vindauga*, “wind eye”: an opening that let in air and light', 'an opening in a wall, usually filled with glass, to let in light'),
  W('daisy', 'image', 'from Old English *dæges ēage*, “day’s eye”: the flower opens at dawn and closes at dusk', 'a small flower with white petals around a yellow centre'),
  W('goodbye', 'compound', 'a shortening of the old blessing “God be with you”, said when parting', 'a word said when leaving someone or ending a conversation'),
  W('clue', 'shifted', 'from *clew*, “a ball of thread”: like the thread Theseus followed out of the labyrinth, a clue leads you through a puzzle', 'a piece of evidence that helps to solve a problem or mystery'),
  W('rival', 'image', 'from Latin *rivalis*, “one who uses the same stream” as another', 'a person competing with another for the same thing'),
  W('senate', 'image', 'from Latin *senex*, “old man”: a council of elders', 'a council or house of a parliament that makes laws'),
  W('calculate', 'image', 'from Latin *calculus*, “small pebble”: pebbles were once used for counting', 'to work out an amount or number by using mathematics'),
  W('explode', 'shifted', 'from Latin *explodere*, “to drive off the stage by clapping”, to hiss a performer away', 'to burst violently, or to prove a belief false'),
  W('investigate', 'image', 'from Latin *vestigium*, “footprint”: to follow a track', 'to examine facts carefully in order to find out the truth'),
  W('pupil', 'image', 'from Latin *pupilla*, “little doll”: the tiny reflection of yourself seen in another person’s eye', 'the dark circle at the centre of the eye that lets in light'),
  W('sarcasm', 'image', 'from Greek *sarkazein*, “to tear flesh”, and later “to sneer”', 'mocking remarks that say the opposite of what is meant'),
  W('robot', 'compound', 'from Czech *robota*, “forced labour”: first used for artificial workers in Karel Čapek’s play *R.U.R.* (1920)', 'a machine that can carry out tasks on its own'),
  W('ambition', 'image', 'from Latin *ambitio*, “going around”: a Roman candidate went around asking for votes', 'a strong wish to succeed or to achieve something'),
  W('inaugurate', 'image', 'from Latin *inaugurare*, to read omens from birds before someone took office', 'to begin something formally, or to install someone in office'),
  W('alphabet', 'compound', 'from *alpha* and *beta*, the first two letters of the Greek alphabet', 'the set of letters used to write a language, in a fixed order'),
  W('glamour', 'shifted', 'a Scots form of *grammar*: learning was once linked with magic, so it meant “enchantment”', 'an attractive, exciting quality, especially of wealth or fame'),
  W('checkmate', 'compound', 'from Persian *shāh māt*, “the king is helpless”', 'in chess, a position in which the king cannot escape capture'),
  W('mortgage', 'compound', 'from Old French *mort gage*, “dead pledge”: the pledge dies when the debt is paid or the land is lost', 'a loan to buy property, with the property as security'),
  W('ostracize', 'image', 'from Greek *ostrakon*, a piece of broken pottery on which Athenians wrote the name of a citizen to banish', 'to exclude someone from a group'),
  W('nostalgia', 'compound', 'from Greek *nostos*, “homecoming”, and *algos*, “pain”: coined in 1688 for homesickness', 'a wistful longing for a happy time in the past'),
  W('berserk', 'image', 'from Old Norse *berserkr*, probably “bear-shirt”: a warrior who fought in a wild frenzy', 'out of control, especially with anger or excitement'),
];

/** Latin roots and the English words that come from them, for "which word comes from …" questions. */
interface Root {
  root: string;
  gloss: string;
  word: string;
}
const ROOTS: Root[] = [
  { root: '*nox, noctis*', gloss: 'night', word: 'nocturnal' },
  { root: '*luna*', gloss: 'moon', word: 'lunar' },
  { root: '*sol*', gloss: 'sun', word: 'solar' },
  { root: '*stella*', gloss: 'star', word: 'stellar' },
  { root: '*mater*', gloss: 'mother', word: 'maternal' },
  { root: '*pater*', gloss: 'father', word: 'paternal' },
  { root: '*dens, dentis*', gloss: 'tooth', word: 'dental' },
  { root: '*pes, pedis*', gloss: 'foot', word: 'pedal' },
  { root: '*cor, cordis*', gloss: 'heart', word: 'cordial' },
  { root: '*novus*', gloss: 'new', word: 'novice' },
  { root: '*nomen*', gloss: 'name', word: 'nominate' },
  { root: '*aqua*', gloss: 'water', word: 'aquatic' },
];

/** Cognates: words in related languages that descend from one ancestral word. */
const COGNATES = [
  'English *night*, German *Nacht* and Latin *nox*',
  'English *mother*, German *Mutter* and Latin *mater*',
  'English *three*, German *drei* and Latin *tres*',
  'English *father*, German *Vater* and Latin *pater*',
  'English *new*, German *neu* and Latin *novus*',
  'English *name*, German *Name* and Latin *nomen*',
];
const COGNATE_RIGHT = 'They descend from the same word in an older language that English, German and Latin share as an ancestor.';
const COGNATE_WRONG = [
  'English took all three of them directly from German, which had earlier borrowed them from Latin.',
  'They look and sound alike purely by chance, and their histories have nothing in common at all.',
  'Latin borrowed each of them from English when Roman soldiers came to Britain two thousand years ago.',
];

const KIND_ASK: Record<Exclude<Kind, 'image' | 'compound'>, string> = {
  myth: 'comes from a figure in Greek or Roman myth',
  person: 'is named after a real person',
  shifted: 'meant something very different in English a few centuries ago',
};
/** Words whose meaning in English has hardly changed since they arrived. */
const STABLE = ['hippopotamus', 'democracy', 'alphabet', 'checkmate', 'sandwich', 'boycott', 'robot', 'calculate', 'daisy', 'goodbye'];

function etymology(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const w = rng.pick(WORDS);
    const others = rng.sample(WORDS.filter((x) => x !== w), 3);
    return {
      prompt: `Which word history explains the meaning of **${w.word}** (${w.meaning})?`,
      parts: [part(mc(rng, w.origin, others.map((o) => o.origin)))],
      hints: ['Find the history whose original meaning connects to the word’s meaning today.'],
      solution: [`**${w.word}**: ${w.origin}.`, `That history explains today’s meaning: ${w.meaning}.`],
    };
  }
  if (d === 2) {
    if (rng.chance(0.3)) {
      const set = rng.pick(COGNATES);
      return {
        prompt: `${set} are **cognates**. What does that mean?`,
        parts: [part(mc(rng, COGNATE_RIGHT, COGNATE_WRONG))],
        hints: ['Cognates are relatives, not borrowings: think of a family of languages with a common ancestor.'],
        solution: [COGNATE_RIGHT, 'English, German and Latin all descend from Proto-Indo-European, so many of their everyday words grew from the same roots.'],
      };
    }
    const w = rng.pick(WORDS);
    const others = rng.sample(WORDS.filter((x) => x !== w), 3);
    return {
      prompt: `The word **${w.word}** comes ${w.origin}. What does **${w.word}** mean today?`,
      parts: [part(mc(rng, w.meaning, others.map((o) => o.meaning)))],
      hints: ['Follow the history forward: what idea from the origin is still part of the word?'],
      solution: [`**${w.word}** means “${w.meaning}”.`, `Its history, ${w.origin}, explains that meaning.`],
    };
  }
  if (rng.chance(0.4)) {
    const r = rng.pick(ROOTS);
    const others = rng.sample(ROOTS.filter((x) => x !== r), 3).map((x) => x.word);
    return {
      prompt: `Which English word comes from the Latin ${r.root}, “${r.gloss}”?`,
      parts: [part(mc(rng, r.word, others))],
      hints: ['Look for the Latin root inside the English word, letter for letter.'],
      solution: [`**${r.word}** comes from ${r.root}, “${r.gloss}”.`, `The others come from other roots: ${rng.shuffle(ROOTS.filter((x) => others.includes(x.word))).map((x) => `${x.word} from ${x.root} (${x.gloss})`).join(', ')}.`],
    };
  }
  const kind = rng.pick(['myth', 'person', 'shifted'] as const);
  const right = rng.pick(WORDS.filter((x) => x.kind === kind));
  // Wrong answers come only from words that plainly do not fit: no myth figure is offered as a real
  // person, only words whose English meaning has stayed put are offered against a shifted one, and
  // no word with a near link to myth (lunatic and the moon goddess Luna, clue and Theseus) is offered.
  const pool = kind === 'shifted'
    ? WORDS.filter((x) => STABLE.includes(x.word))
    : WORDS.filter((x) => (x.kind === 'image' || x.kind === 'compound') && x.word !== 'lunatic');
  const others = rng.sample(pool, 3);
  return {
    prompt: `Which of these words ${KIND_ASK[kind]}?`,
    parts: [part(mc(rng, right.word, others.map((o) => o.word)))],
    hints: ['Think about where each word came from before it reached English.'],
    solution: [`**${right.word}**: ${right.origin}.`, ...others.slice(0, 1).map((o) => `**${o.word}**, by contrast, comes ${o.origin}.`)],
  };
}

// ---------------------------------------------------------------------------- academic vocabulary

/** A sentence of literary analysis with a gap, the precise verb or noun for it, and three that do not fit. */
interface Gap {
  s: string;
  right: string;
  wrong: [string, string, string];
  why: string;
  /** The subject is plural, so the vague verbs must be plural too. */
  plural?: boolean;
}
const VERBS: Gap[] = [
  { s: 'By placing the wedding feast beside the funeral, the writer ___ celebration and grief.', right: 'juxtaposes', wrong: ['foreshadows', 'undermines', 'symbolizes'], why: 'To juxtapose is to place two things side by side so that they are compared.' },
  { s: 'The storm clouds gathering in the opening scene ___ the tragedy to come.', right: 'foreshadow', wrong: ['juxtapose', 'critique', 'interrogate'], why: 'To foreshadow is to hint at something that will happen later.', plural: true },
  { s: 'The narrator’s cheerful tone ___ the horror of what he describes, making it harder to take seriously.', right: 'undercuts', wrong: ['foreshadows', 'juxtaposes', 'symbolizes'], why: 'To undercut is to weaken something, here the horror, by working against it.' },
  { s: 'The repeated image of chains ___ the novel’s theme of captivity.', right: 'reinforces', wrong: ['undermines', 'juxtaposes', 'interrogates'], why: 'To reinforce is to strengthen an idea that is already there.' },
  { s: 'Through its greedy and foolish ruling class, the play ___ a society that values wealth above kindness.', right: 'critiques', wrong: ['foreshadows', 'juxtaposes', 'reinforces'], why: 'To critique is to judge something and expose its faults.' },
  { s: 'The poem ___ what it means to be free, raising the question in every stanza without ever settling it.', right: 'interrogates', wrong: ['reinforces', 'foreshadows', 'juxtaposes'], why: 'To interrogate an idea is to question it closely without settling it.' },
  { s: 'The character’s silence when her brother is praised ___ that she resents his success.', right: 'implies', wrong: ['juxtaposes', 'foreshadows', 'critiques'], why: 'To imply is to suggest something without stating it.' },
  { s: 'The scent of oranges in the final scene ___ the narrator’s childhood summers in his grandmother’s kitchen.', right: 'evokes', wrong: ['undermines', 'interrogates', 'juxtaposes'], why: 'To evoke is to call up a memory or feeling.' },
  { s: 'The locked gate at the end of the garden ___ everything the young heroine is forbidden to know.', right: 'symbolizes', wrong: ['interrogates', 'undercuts', 'juxtaposes'], why: 'To symbolize is to stand for an idea beyond the object itself.' },
  { s: 'The final chapter ___ everything the reader has believed about the narrator, revealing that he lied from the start.', right: 'subverts', wrong: ['foreshadows', 'evokes', 'reinforces'], why: 'To subvert is to overturn what was expected or believed.' },
  { s: 'By ending each stanza with the same line, the poet ___ the speaker’s grief.', right: 'emphasizes', wrong: ['undercuts', 'foreshadows', 'juxtaposes'], why: 'To emphasize is to give something extra weight or attention.' },
  { s: 'The writer ___ the city’s glittering wealth with the hunger in its back streets.', right: 'contrasts', wrong: ['evokes', 'foreshadows', 'critiques'], why: 'To contrast one thing with another is to show how different they are.' },
  { s: 'Satirists such as Swift ___ the cruelty of the powerful by pretending to admire it.', right: 'expose', wrong: ['foreshadow', 'evoke', 'juxtapose'], why: 'To expose is to reveal something hidden, especially a fault.', plural: true },
  { s: 'The early mention of the loaded rifle ___ the violence of the last act.', right: 'anticipates', wrong: ['interrogates', 'undercuts', 'contrasts'], why: 'To anticipate, in analysis, is to prepare the reader for what comes later.' },
];

const NOUNS: Gap[] = [
  { s: 'The repeated image of caged birds becomes a ___ that runs through the whole novel.', right: 'motif', wrong: ['foil', 'subtext', 'connotation'], why: 'A motif is an image or idea that recurs throughout a work.' },
  { s: 'The ___ of the ending leaves readers unsure whether the hero lives or dies.', right: 'ambiguity', wrong: ['motif', 'foil', 'imagery'], why: 'Ambiguity is the quality of being open to more than one reading.' },
  { s: 'Laertes acts as a ___ to Hamlet: both seek revenge for a father, but Laertes acts at once.', right: 'foil', wrong: ['motif', 'subtext', 'connotation'], why: 'A foil is a character whose contrast with another brings out that character’s qualities.' },
  { s: 'Beneath the polite small talk, the ___ of the scene is the sisters’ old quarrel.', right: 'subtext', wrong: ['foil', 'motif', 'imagery'], why: 'Subtext is the meaning beneath what is actually said.' },
  { s: 'The word “home” carries a ___ of warmth and safety that the word “house” lacks.', right: 'connotation', wrong: ['foil', 'motif', 'juxtaposition'], why: 'A connotation is a feeling or idea a word suggests beyond its dictionary meaning.' },
  { s: 'There is a growing ___ between what the speaker says and what she clearly feels.', right: 'tension', wrong: ['motif', 'foil', 'connotation'], why: 'Tension is the strain between two opposing forces or ideas.' },
  { s: 'It is a bitter ___ that the man who fears death most is the first to die.', right: 'irony', wrong: ['motif', 'foil', 'connotation'], why: 'Irony is a gap between what is expected and what happens.' },
  { s: 'The ___ of the wedding and the funeral in one chapter sharpens the contrast between joy and grief.', right: 'juxtaposition', wrong: ['connotation', 'subtext', 'foil'], why: 'Juxtaposition is the placing of two things side by side for comparison.' },
];

/** A vague sentence of analysis and four revisions: one precise, three still vague, each as long as the precise one. */
interface Vague {
  s: string;
  right: string;
  wrong: [string, string, string];
}
const VAGUE: Vague[] = [
  {
    s: 'The poem talks about death.',
    right: 'The poem presents death as a courteous visitor who calmly escorts the speaker to her grave.',
    wrong: ['The poem talks about death quite a lot and has many different things to say about it.', 'The poem is about death, and it deals with the whole topic of dying in a very deep way.', 'The poem shows death in many interesting ways, and it is a very important part of the poem.'],
  },
  {
    s: 'The ending shows that the main character has changed.',
    right: 'The ending reveals that the boy’s pride has given way to a painful recognition of his own vanity.',
    wrong: ['The ending shows that the main character has changed a lot by the end of the whole story.', 'The ending is about how the main character is a very different person from who he was before.', 'The ending shows a big change in the main character, which is very important for the story.'],
  },
  {
    s: 'The writer uses a lot of imagery to show the setting.',
    right: 'Images of rust, ash and dying light make the town seem exhausted, as if it were slowly burning out.',
    wrong: ['The writer uses a lot of imagery to show the setting, which is described in a lot of detail.', 'There is a lot of imagery in the description of the setting, and it shows what the place is like.', 'The writer uses many different images to show the setting, and they are very effective images.'],
  },
  {
    s: 'This quote shows that she is sad.',
    right: 'Her clipped, unfinished sentences suggest a grief that she cannot yet bring herself to name.',
    wrong: ['This quote shows that she is very sad and upset about what has happened in the story.', 'This quote is about her sadness and shows how sad she really feels at this point.', 'This quote shows a lot about her feelings, and especially that she is really very sad.'],
  },
];

function academicVocabulary(rng: Rng, d: Difficulty): GenOutput {
  const gapItem = (g: Gap, what: string): GenOutput => ({
    prompt: `Choose the most precise ${what} for this sentence of literary analysis.\n\n${block(g.s.replace('___', GAP))}`,
    parts: [part(mc(rng, g.right, g.wrong))],
    hints: ['Read the whole sentence: the words after the gap tell you exactly what the writer or the text is doing.'],
    solution: [g.why, `So the sentence reads: ${g.s.replace('___', `**${g.right}**`)}`],
  });
  if (d === 1) return gapItem(rng.pick(VERBS), 'verb');
  if (d === 2) {
    if (rng.chance(0.5)) return gapItem(rng.pick(NOUNS), 'noun');
    // "implies that …" and "contrasts … with …" do not take a vague verb grammatically, so they stay out.
    const g = rng.pick(VERBS.filter((x) => x.right !== 'implies' && x.right !== 'contrasts'));
    const vague = rng.shuffle(g.plural ? ['show', 'talk about', 'deal with', 'mention'] : ['shows', 'talks about', 'deals with', 'mentions']).slice(0, 3);
    const fill = (v: string) => g.s.replace('___', v);
    return {
      prompt: 'Which sentence of literary analysis uses the most precise verb?',
      parts: [part(mc(rng, fill(g.right), vague.map(fill)))],
      hints: ['“Shows”, “talks about” and “deals with” say little. A precise verb says exactly what the writer is doing.'],
      solution: [`“${fill(g.right)}” is precise. ${g.why}`, 'The others use vague verbs that could describe almost anything a text does.'],
    };
  }
  const v = rng.pick(VAGUE);
  return {
    prompt: `Revise this vague sentence of literary analysis.\n\n${block(v.s)}\n\nWhich revision is precise?`,
    parts: [part(mc(rng, v.right, v.wrong))],
    hints: ['Length is not precision. The precise revision names exactly what the text does and how, with specific detail.'],
    solution: [`“${v.right}” says exactly what the text does, with specific detail.`, 'The others are just as long but stay vague: “a lot”, “very” and “shows” add words, not meaning.'],
  };
}

export const WORD_SKILLS: SkillDef[] = [
  skill({
    id: 'e12-etymology',
    name: 'Etymology',
    description: 'Use a word’s history, roots and cognates to explain its meaning today.',
    outcomes: OUTCOMES,
    lessonId: LESSON,
    format: 'mc',
    gen: etymology,
  }),
  skill({
    id: 'e12-academic-vocabulary',
    name: 'Academic vocabulary',
    description: 'Choose the precise analytical verb or noun, and replace vague words such as “shows” and “talks about”.',
    outcomes: OUTCOMES,
    lessonId: LESSON,
    format: 'mc',
    gen: academicVocabulary,
  }),
];
