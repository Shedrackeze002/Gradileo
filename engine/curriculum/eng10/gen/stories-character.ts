/**
 * Grade 10 English, lesson 1.2: Character (10-A1). Direct and indirect characterization (speech,
 * thoughts, effect on others, actions, looks), kinds of character, and inferring a character’s
 * traits from details. Passages from public-domain stories come from ./texts.ts.
 */
import { fixedChoice, mc, part, skill } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { block, fill, pair, people } from './common.ts';
import {
  CASK_SMILE, FIRE_FROST, FIRE_IMAGINATION, HOUR, HOUR_FREE, HOUR_PRAYER, MAGI_HAIR, MAGI_JIM, MAGI_OPENING, MAGI_PRAYER, MAGI_SELL, MAGI_WATCH, PAW_SNATCH, TIGER_YOUTH, WINDOW_FRAMTON, WINDOW_ROMANCE,
  quoteBlock, titled, type Excerpt,
} from './texts.ts';

const L = 'e10-1-2';

// ---------------------------------------------------------------------------- characterization

type Method = 'direct' | 'speech' | 'thoughts' | 'effect' | 'actions' | 'looks';
const INDIRECT: Method[] = ['speech', 'thoughts', 'effect', 'actions', 'looks'];
const METHOD_NAME: Record<Method, string> = {
  direct: 'Direct: the narrator states the trait',
  speech: 'Speech: what the character says',
  thoughts: 'Thoughts: what the character thinks or feels',
  effect: 'Effect on others: how others react to them',
  actions: 'Actions: what the character does',
  looks: 'Looks: the character’s appearance',
};
const METHOD_SHORT: Record<Method, string> = {
  direct: 'direct characterization',
  speech: 'speech',
  thoughts: 'thoughts',
  effect: 'effect on others',
  actions: 'actions',
  looks: 'looks',
};

const CHAR_LINES: Record<Method, string[]> = {
  direct: [
    'NAME was the most patient person in the whole family.',
    'NAME was proud and quick-tempered, and {he} never forgot an insult.',
    'NAME was a nervous child who worried about everything.',
    'Of all the students in the class, NAME was the most curious.',
    'NAME was lazy, though clever enough to hide it from {his} teachers.',
    'NAME2 was honest to a fault.',
  ],
  speech: [
    '“Leave the dishes,” NAME said. “I’ll wash them all, and you go and rest.”',
    '“I don’t care whose turn it is,” NAME snapped. “I’m going first.”',
    '“We can still win this,” NAME told the team at half-time. “One goal at a time.”',
    '“Nobody asked for your opinion,” NAME said to the new student.',
    '“Are you sure the bridge is safe? What if it breaks? Maybe we should go back,” NAME said.',
  ],
  thoughts: [
    'NAME wondered whether anyone would notice if {he} kept the extra change. No, {he} decided, it was not {his} to keep.',
    'As the others laughed at the joke, NAME thought, They will never understand me.',
    'Lying awake, NAME went over every word of the argument, wishing {he} had said something kinder.',
    'NAME secretly hoped that NAME2 would fail the audition, and a moment later felt ashamed of the thought.',
  ],
  effect: [
    'Whenever NAME walked into the room, the younger children ran to show {him} their drawings.',
    'When NAME raised {his} voice, the whole class went silent and nobody dared to look up.',
    'The shopkeepers on the street smiled and waved as NAME passed.',
    'The other players groaned when the coach put NAME on their team.',
  ],
  actions: [
    'NAME quietly paid for the old man’s groceries and left before he could say thank you.',
    'NAME tore up NAME2’s drawing and threw the pieces in the bin.',
    'Every evening, NAME practised the same difficult passage on the violin until {his} fingers ached.',
    'NAME stepped in front of the younger boy and faced the bullies alone.',
    'NAME read every page of the instructions twice before {he} touched the machine.',
  ],
  looks: [
    'NAME’s school uniform was spotless, and {his} shoes were polished until they shone.',
    'NAME wore a faded jacket two sizes too big, its elbows patched with different cloth.',
    'NAME’s hands were rough and scarred from years of work in the fields.',
    'NAME’s hair was uncombed, and {his} shirt was buttoned wrong.',
  ],
};

interface CharExcerpt {
  who: string;
  lead?: string;
  excerpt: Excerpt;
  method: Method;
  /** Methods left out of the choices because the passage also shows a little of them. */
  exclude: Method[];
  trait: string;
  wrong: string[];
}
const CHAR_EXCERPTS: CharExcerpt[] = [
  { who: 'Vera', excerpt: WINDOW_ROMANCE, method: 'direct', exclude: ['thoughts', 'effect'], trait: 'She can invent a convincing story on the spot.', wrong: ['She is too shy to say much to a stranger.', 'She always tells visitors exactly what happened.', 'She is easily frightened by stories of ghosts.'] },
  { who: 'the man', excerpt: FIRE_IMAGINATION, method: 'direct', exclude: ['thoughts', 'effect'], trait: 'He notices facts but not what they could mean for him.', wrong: ['He is so fearful that he turns back at every danger.', 'He is wise from many hard winters spent in the North.', 'He thinks deeply about man’s frailty and the universe.'] },
  { who: 'Della', lead: 'Della has climbed the stairs to a shop that buys hair, and the owner has just looked at hers.', excerpt: MAGI_SELL, method: 'speech', exclude: ['actions'], trait: 'Once she has made up her mind, she acts quickly.', wrong: ['She cannot make up her mind and keeps delaying.', 'She is rude to the shop owner and insults her.', 'She wants to keep the money to spend on herself.'] },
  { who: 'Mrs. Mallard', lead: 'An hour after hearing of her husband’s death, Mrs. Mallard thinks about the years ahead.', excerpt: HOUR_FREE, method: 'thoughts', exclude: ['direct'], trait: 'She longs to live her own life, for herself.', wrong: ['She is afraid of the long years of living alone.', 'She wishes her husband would come home again.', 'She is jealous of her sister Josephine’s life.'] },
  { who: 'the young man on trial', lead: 'The young man accused of loving the princess walks into the king’s arena.', excerpt: TIGER_YOUTH, method: 'effect', exclude: ['looks', 'direct'], trait: 'He is handsome and impressive.', wrong: ['He is cruel and frightening.', 'He is weak and sickly.', 'He is ordinary and easy to overlook.'] },
  { who: 'Mr. White', lead: 'Sergeant-Major Morris has warned the Whites that the monkey’s paw causes sorrow.', excerpt: PAW_SNATCH, method: 'actions', exclude: ['speech', 'effect'], trait: 'He is curious about the paw and unwilling to let it go.', wrong: ['He is cautious and wants nothing to do with the paw.', 'He is generous and eager to make his guest comfortable.', 'He does not believe in the paw’s power at all.'] },
  { who: 'Della', lead: 'Della has decided to sell her long, beautiful hair, and has just let it down in front of the mirror.', excerpt: MAGI_HAIR, method: 'actions', exclude: ['looks', 'thoughts'], trait: 'She is torn about giving up the hair she treasures.', wrong: ['She does not care at all about how she looks.', 'She is angry with Jim for leaving her so little money.', 'She is proud of being poor and wants others to see it.'] },
  { who: 'Jim', lead: 'Jim comes home on Christmas Eve.', excerpt: MAGI_JIM, method: 'looks', exclude: ['direct', 'thoughts'], trait: 'He is poor and weighed down by his responsibilities.', wrong: ['He is wealthy and carefree, with nothing to worry him.', 'He is lazy and careless about his work and his home.', 'He is harsh with Della and takes his troubles out on her.'] },
];
const EXCERPT_STORY = (c: CharExcerpt) => `${titled(c.excerpt.story)}`;

function characterization(rng: Rng, d: Difficulty) {
  if (d === 3) {
    const c = rng.pick(CHAR_EXCERPTS);
    const others = rng.shuffle((['direct', ...INDIRECT] as Method[]).filter((m) => m !== c.method && !c.exclude.includes(m))).map((m) => METHOD_NAME[m]);
    return {
      prompt: `${c.lead ? `${c.lead} ` : ''}Read this passage from ${EXCERPT_STORY(c)} about ${c.who}.\n\n${quoteBlock(c.excerpt)}`,
      parts: [
        part(mc(rng, METHOD_NAME[c.method], others), { label: 'How does the writer reveal the character here?' }),
        part(mc(rng, c.trait, c.wrong), { label: `What does the passage suggest about ${c.who}?` }),
      ],
      hints: ['Direct characterization tells you the trait outright. Indirect characterization shows it through speech, thoughts, effect on others, actions or looks, and you work out the trait yourself.'],
      solution: [`The writer uses ${METHOD_SHORT[c.method]}.`, `From it we can infer: ${c.trait.charAt(0).toLowerCase()}${c.trait.slice(1)}`],
    };
  }
  const cast = pair(rng);
  const method: Method = d === 1 ? (rng.chance(0.4) ? 'direct' : rng.pick(INDIRECT)) : rng.pick(INDIRECT);
  const line = fill(rng.pick(CHAR_LINES[method]), cast);
  if (d === 1) {
    const direct = method === 'direct';
    return {
      prompt: `${block(line)}\n\nIs this **direct** or **indirect** characterization?`,
      parts: [part(fixedChoice(['Direct: the narrator states the trait', 'Indirect: the reader infers the trait from details'], direct ? 0 : 1))],
      hints: ['Does the sentence name the trait outright (patient, proud, curious), or does it show you something and leave you to work out the trait?'],
      solution: direct
        ? ['The narrator names the trait outright, so this is direct characterization.']
        : [`The sentence never names a trait; it shows the character through ${METHOD_SHORT[method]}, so this is indirect characterization.`],
    };
  }
  const others = rng.shuffle(INDIRECT.filter((m) => m !== method)).map((m) => METHOD_NAME[m]);
  return {
    prompt: `${block(line)}\n\nWhich kind of indirect characterization does this sentence use?`,
    parts: [part(mc(rng, METHOD_NAME[method], others))],
    hints: ['Indirect characterization works through speech, thoughts, effect on others, actions and looks. Ask what the sentence actually shows you.'],
    solution: [`The sentence shows the character through ${METHOD_SHORT[method]}.`, methodWhy(method)],
  };
}

function methodWhy(m: Method): string {
  switch (m) {
    case 'speech':
      return 'The character’s own words, in quotation marks, let us judge what kind of person they are.';
    case 'thoughts':
      return 'We are told what goes on inside the character’s head, which no one else in the story can see.';
    case 'effect':
      return 'We learn about the character from how other people react to them, not from what the character does.';
    case 'actions':
      return 'What the character does shows what kind of person they are.';
    default:
      return 'The description of the character’s appearance hints at their situation or personality.';
  }
}

// ---------------------------------------------------------------------------- kinds of character

type Role = 'protagonist' | 'antagonist' | 'foil';
const ROLE_NAME: Record<Role, string> = { protagonist: 'Protagonist', antagonist: 'Antagonist', foil: 'Foil' };
const ROLE_WHAT: Record<Role, string> = {
  protagonist: 'the protagonist is the main character, whose problem the story follows',
  antagonist: 'the antagonist is the character who works against the protagonist',
  foil: 'a foil is a character whose contrasting traits make the protagonist’s traits stand out',
};

interface RoleStory {
  text: string;
  /** The role of NAME2 (NAME is always the protagonist). */
  other: Role;
}
const ROLE_STORIES: RoleStory[] = [
  { text: 'The story follows NAME, who is running for class president. Throughout the campaign, NAME2 tears down NAME’s posters and spreads lies about {him}.', other: 'antagonist' },
  { text: 'NAME, a young farmer, is trying to save {his} family’s land. A wealthy developer, NAME2, schemes to take it away from {him}.', other: 'antagonist' },
  { text: 'The story centres on NAME, who dreams of opening a restaurant. NAME2, a city inspector with a grudge against {his} family, invents reasons to refuse NAME a licence.', other: 'antagonist' },
  { text: 'The story follows NAME, a nervous first-year nurse. {His} roommate NAME2 is calm and confident in every emergency, which makes NAME’s nerves stand out all the more.', other: 'foil' },
  { text: 'NAME, the main character, coasts through school without trying. {His} twin, NAME2, works hard for every mark, and the story often places the two side by side.', other: 'foil' },
  { text: 'NAME, a cautious and careful climber, is the hero of the story. {His} best friend NAME2 is reckless and laughs at danger, and their friendship shows how careful NAME really is.', other: 'foil' },
];

type Dimension = 'complexity' | 'change';
interface TypeLine {
  text: string;
  dim: Dimension;
  answer: 'Round' | 'Flat' | 'Static' | 'Dynamic';
}
const TYPE_LINES: TypeLine[] = [
  { text: 'We learn NAME’s fears, {his} mixed feelings about {his} father and {his} secret love of poetry, and {he} often surprises us.', dim: 'complexity', answer: 'Round' },
  { text: 'NAME is brave but sometimes cruel, loyal to {his} friends yet jealous of them, and the story shows each side of {him} in turn.', dim: 'complexity', answer: 'Round' },
  { text: 'The shopkeeper, NAME, appears in three short scenes, and all the reader ever learns about {him} is that {he} is grumpy.', dim: 'complexity', answer: 'Flat' },
  { text: 'NAME, the bully, does nothing in the story except push younger students around; we learn nothing else about {him}.', dim: 'complexity', answer: 'Flat' },
  { text: 'At first NAME will share nothing with {his} little sister; after nursing her through an illness, {he} gives her {his} most treasured book.', dim: 'change', answer: 'Dynamic' },
  { text: 'NAME begins certain that {he} is better than everyone in the village; after losing everything, {he} learns to ask others for help.', dim: 'change', answer: 'Dynamic' },
  { text: 'NAME is selfish on the first page and just as selfish on the last; nothing that happens in the story changes {him} at all.', dim: 'change', answer: 'Static' },
  { text: 'Through floods, quarrels and a move to a new city, NAME stays exactly the same cheerful, stubborn person {he} was at the start.', dim: 'change', answer: 'Static' },
];
const TYPE_WHAT: Record<string, string> = {
  Round: 'a round character is complex, with many traits, some of them contradictory',
  Flat: 'a flat character has only one or two traits and is not developed',
  Static: 'a static character stays the same from the beginning of the story to the end',
  Dynamic: 'a dynamic character changes in an important way during the story',
};

function characterTypes(rng: Rng, d: Difficulty) {
  const cast = pair(rng);
  if (d === 1 || (d === 2 && rng.chance(0.3))) {
    const s = rng.pick(ROLE_STORIES);
    const askMain = rng.chance(0.35);
    const role: Role = askMain ? 'protagonist' : s.other;
    const who = askMain ? cast[0].name : cast[1].name;
    const choices: Role[] = ['protagonist', 'antagonist', 'foil'];
    return {
      prompt: `${fill(s.text, cast)}\n\nWhat is **${who}** in this story?`,
      parts: [part(mc(rng, ROLE_NAME[role], choices.filter((r) => r !== role).map((r) => ROLE_NAME[r])))],
      hints: ['Whose problem does the story follow? Who works against that person? Who simply contrasts with them?'],
      solution: [`${who} is the ${role}: ${ROLE_WHAT[role]}.`, role === 'foil' ? `${cast[1].name} does not work against ${cast[0].name}, so ${cast[1].he} is not an antagonist; the contrast between them is what matters.` : `The story is about ${cast[0].name}’s goal, and ${cast[1].name} ${s.other === 'antagonist' ? 'stands in the way of it' : 'contrasts with ' + cast[0].name}.`],
    };
  }
  if (d === 2) {
    const t = rng.pick(TYPE_LINES);
    const options = t.dim === 'complexity' ? ['Round', 'Flat'] : ['Static', 'Dynamic'];
    return {
      prompt: `${fill(t.text, cast)}\n\nIs ${cast[0].name} a **${options[0].toLowerCase()}** or a **${options[1].toLowerCase()}** character?`,
      parts: [part(fixedChoice(options, options.indexOf(t.answer)))],
      hints: [t.dim === 'complexity' ? 'Round characters are complex, with many sides; flat characters have only one or two traits.' : 'Dynamic characters change in an important way; static characters stay the same.'],
      solution: [`${cast[0].name} is ${t.answer.toLowerCase()}: ${TYPE_WHAT[t.answer]}.`],
    };
  }
  // Difficulty 3: which description fits a dynamic (or round) character, including Mrs. Mallard.
  if (rng.chance(0.35)) {
    return {
      prompt: `Read this passage from ${titled(HOUR)}. An hour earlier, Mrs. Mallard has learned that her husband is dead.\n\n${quoteBlock(HOUR_PRAYER)}\n\nWhat does the passage show about Mrs. Mallard as a character?`,
      parts: [part(mc(rng, 'She is dynamic: her feelings about her own life change completely within the hour.', [
        'She is static: she feels the same about life at the end as at the beginning.',
        'She is flat: the story gives her only one simple trait.',
        'She is the antagonist: she works against the other characters.',
      ]))],
      hints: ['Compare how she felt about a long life “only yesterday” with how she feels now.'],
      solution: ['Yesterday she shuddered at the thought of a long life; now she prays for one. Such a change of heart makes her a dynamic character.', 'She is not static, since she changes, and she is not flat: the story shows her grief, her fear and her joy.'],
    };
  }
  const want = rng.pick(['Dynamic', 'Round'] as const);
  const dim: Dimension = want === 'Dynamic' ? 'change' : 'complexity';
  const right = rng.pick(TYPE_LINES.filter((t) => t.answer === want));
  const wrong = rng.shuffle(TYPE_LINES.filter((t) => t.dim === dim && t.answer !== want)).slice(0, 2);
  const ps = people(rng, 3);
  const options = [right, ...wrong].map((t, i) => fill(t.text, [ps[i]]));
  return {
    prompt: `Which description is of a **${want.toLowerCase()}** character?`,
    parts: [part(mc(rng, options[0], options.slice(1)))],
    hints: [want === 'Dynamic' ? 'Look for a character who is different at the end from the way they were at the start.' : 'Look for a character with many sides, including some that seem to contradict each other.'],
    solution: [`“${options[0]}” describes a ${want.toLowerCase()} character: ${TYPE_WHAT[want]}.`],
  };
}

// ---------------------------------------------------------------------------- inferring traits

interface Inference {
  detail: string;
  trait: string;
  wrong: string[];
}
const INFERENCES: Inference[] = [
  { detail: 'Every morning, NAME gives up {his} seat on the bus to an older passenger, even when {he} is tired.', trait: 'considerate', wrong: ['selfish', 'lazy', 'rude'] },
  { detail: 'NAME counts the change from every purchase twice and writes the amount in a small notebook.', trait: 'careful with money', wrong: ['wasteful with money', 'forgetful and disorganized', 'reckless with money'] },
  { detail: 'NAME laughs loudly at {his} own jokes and interrupts whenever anyone else is speaking.', trait: 'self-centred', wrong: ['shy', 'modest', 'thoughtful'] },
  { detail: 'When {his} team loses the final, NAME is the first to walk over and shake the winners’ hands.', trait: 'gracious in defeat', wrong: ['bitter about losing', 'arrogant and boastful', 'afraid of the winners'] },
  { detail: 'NAME has rewritten the first page of {his} story eleven times and still is not satisfied.', trait: 'determined to get it right', wrong: ['careless about mistakes', 'too lazy to finish anything', 'satisfied with a first try'] },
  { detail: 'NAME checks the locks three times before bed and keeps a light on all night.', trait: 'anxious', wrong: ['carefree', 'reckless', 'bold'] },
  { detail: 'NAME hides {his} report card under the mattress before {his} parents get home.', trait: 'worried about {his} parents’ reaction', wrong: ['proud to show {his} parents {his} marks', 'eager to share {his} good news at home', 'careless about school and {his} marks'] },
  { detail: 'After the party, NAME stays to wash every dish, though no one asked {him} to.', trait: 'helpful', wrong: ['lazy', 'rude', 'selfish'] },
  { detail: 'NAME spends all of {his} birthday money on a present for {his} little brother.', trait: 'generous', wrong: ['greedy', 'selfish', 'jealous'] },
  { detail: 'Although {he} is afraid of heights, NAME climbs the ladder to rescue the neighbour’s cat from the roof.', trait: 'brave', wrong: ['cowardly', 'cruel', 'lazy'] },
  { detail: 'NAME tells everyone that {he} did the group project alone, though NAME2 did half the work.', trait: 'dishonest', wrong: ['modest', 'honest', 'generous'] },
  { detail: 'NAME reads the rules of the new game aloud, slowly, so that {his} grandmother can follow them.', trait: 'patient', wrong: ['impatient', 'unkind', 'careless'] },
];

interface PdInference {
  who: string;
  lead?: string;
  /** A gloss of a hard word, shown under the passage. */
  note?: string;
  excerpt: Excerpt;
  trait: string;
  wrong: string[];
  why: string;
}
const PD_INFERENCES: PdInference[] = [
  { who: 'Della', excerpt: MAGI_OPENING, trait: 'She is careful with money and has saved hard.', wrong: ['She spends money as soon as she gets any.', 'She is lazy and careless about her household.', 'She is rich but mean with her money.'], why: 'She saved pennies by bargaining hard and counted her money three times, which shows how carefully she manages what little she has.' },
  { who: 'Della', lead: 'Della has cut off and sold her hair to buy Jim a present, and now she hears him on the stairs.', excerpt: MAGI_PRAYER, trait: 'She is anxious about how Jim will see her.', wrong: ['She is confident that she looks as lovely as ever.', 'She is angry with Jim for coming home so late.', 'She does not care what Jim thinks of her.'], why: 'She prays that Jim will still think her pretty, which shows she is worried about his reaction to her short hair.' },
  { who: 'Jim', lead: 'Della has just given Jim a chain for his watch, after receiving combs for her hair.', excerpt: MAGI_WATCH, trait: 'He gave up his greatest treasure for Della.', wrong: ['He is angry that Della sold her hair.', 'He cares more about the watch than about Della.', 'He is greedy and wants the money for himself.'], why: 'Jim sold the watch he was so proud of to buy Della’s combs, a sacrifice that shows his love for her.' },
  { who: 'Framton Nuttel', excerpt: WINDOW_FRAMTON, trait: 'He is wrapped up in himself and his health.', wrong: ['He is modest and quiet about his own troubles.', 'He is curious about other people and their lives.', 'He is adventurous and eager for danger.'], why: 'He tells a near-stranger the details of his illnesses, believing others want to hear them, which shows he is self-absorbed.' },
  { who: 'Montresor', lead: 'Montresor, the narrator, has sworn revenge on Fortunato.', note: '*Immolation* means killing someone as a sacrifice.', excerpt: CASK_SMILE, trait: 'He is deceitful, hiding his hatred behind a smile.', wrong: ['He is forgiving and has put the insult behind him.', 'He is honest and open about his true feelings.', 'He is shy and nervous in Fortunato’s company.'], why: 'He smiles in Fortunato’s face while planning his death, so he hides his true feelings: he is deceitful.' },
  { who: 'the man', excerpt: FIRE_FROST, trait: 'He does not grasp how dangerous the cold is.', wrong: ['He is terrified of the cold and of being alone.', 'He is wise from many years of life in the North.', 'He is careful and cautious about every danger.'], why: 'Fifty below zero is only “cold and uncomfortable” to him, so he does not see the danger to his life.' },
  { who: 'Mr. White', lead: 'Sergeant-Major Morris has just warned the family that the monkey’s paw causes sorrow.', excerpt: PAW_SNATCH, trait: 'He is curious and tempted by the paw.', wrong: ['He is cautious and heeds his guest’s warning.', 'He is afraid of the paw and what it might do.', 'He is generous and polite to his guest.'], why: 'Despite the warning, he snatches the paw out of the fire, which shows that his curiosity and temptation are stronger than his caution.' },
  { who: 'Mrs. Mallard', lead: 'Mrs. Mallard has just learned that her husband is dead.', excerpt: HOUR_FREE, trait: 'She longs for independence.', wrong: ['She wants to remarry soon.', 'She depends on her husband for everything.', 'She is afraid of the years ahead.'], why: 'She rejoices that she will live for herself, which shows how much she longs to be independent.' },
];

function characterInference(rng: Rng, d: Difficulty) {
  if (d === 3 || (d === 2 && rng.chance(0.5))) {
    const c = rng.pick(PD_INFERENCES);
    return {
      prompt: `${c.lead ? `${c.lead} ` : ''}Read this passage from ${titled(c.excerpt.story)}.\n\n${quoteBlock(c.excerpt)}${c.note ? `\n\n${c.note}` : ''}\n\nWhat does the passage most suggest about ${c.who}?`,
      parts: [part(mc(rng, c.trait, c.wrong))],
      hints: ['Ask what the character says, does or thinks here, and what kind of person would behave that way.'],
      solution: [c.why],
    };
  }
  const cast = pair(rng);
  const inf = rng.pick(INFERENCES);
  const name = cast[0].name;
  return {
    prompt: `${fill(inf.detail, cast)}\n\nWhat does this detail most suggest about ${name}?`,
    parts: [part(mc(rng, `${name} is ${fill(inf.trait, cast)}.`, inf.wrong.map((w) => `${name} is ${fill(w, cast)}.`)))],
    hints: ['Ask what kind of person would act this way. Choose the trait the detail supports, not one that is simply possible.'],
    solution: [`The detail shows that ${name} is ${fill(inf.trait, cast)}.`, `Nothing in the detail suggests that ${name} is ${fill(inf.wrong[0], cast)}; the evidence points the other way.`],
  };
}

export const CHARACTER_SKILLS: SkillDef[] = [
  skill({
    id: 'e10-characterization',
    name: 'Direct and indirect characterization',
    description: 'Tell direct from indirect characterization, and name the method: speech, thoughts, effect on others, actions or looks.',
    outcomes: ['10-A1'],
    lessonId: L,
    format: 'mc',
    gen: characterization,
  }),
  skill({
    id: 'e10-character-types',
    name: 'Kinds of character',
    description: 'Describe characters as protagonist, antagonist or foil, round or flat, and static or dynamic.',
    outcomes: ['10-A1'],
    lessonId: L,
    format: 'mc',
    gen: characterTypes,
  }),
  skill({
    id: 'e10-character-inference',
    name: 'Inferring character traits',
    description: 'Infer what a character is like from what they say, think and do.',
    outcomes: ['10-A1'],
    lessonId: L,
    format: 'mc',
    gen: characterInference,
  }),
];

