/**
 * Grade 10 English, lesson 1.5: Theme, Symbol and Irony (10-A2). Theme statements and what goes
 * wrong with weak ones, verbal, situational and dramatic irony, and interpreting symbols, in stories
 * written for Gradileo and in public-domain stories (./texts.ts).
 */
import { mc, part, skill } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { block, fill, pair } from './common.ts';
import { CASK, CASK_COUGH, CASK_TOAST, FIRE, HEART, HOUR, HOUR_ENDING, HOUR_WINDOW, MAGI, MAGI_WATCH, PAW, PAW_FATE, WINDOW, WINDOW_GHOST, quoteBlock, titled, type Excerpt } from './texts.ts';

const L = 'e10-1-5';

// ---------------------------------------------------------------------------- theme

type Flaw = 'theme' | 'topic' | 'plot' | 'command' | 'absolute' | 'unsupported';
interface ThemeStory {
  summary: string;
  theme: string;
  topic: string;
  plot: string;
  command: string;
  absolute: string;
  unsupported: string;
}
const THEME_STORIES: ThemeStory[] = [
  {
    summary: `In ${titled(MAGI)}, a poor young couple each sell their most treasured possession to buy the other a Christmas present: Della sells her hair to buy a chain for Jim’s watch, and Jim sells his watch to buy combs for Della’s hair. The narrator calls them the wisest of all who give gifts.`,
    theme: 'The love behind a sacrifice matters more than the gift itself.',
    topic: 'Love and sacrifice',
    plot: 'Della sells her hair and Jim sells his watch to buy each other presents.',
    command: 'You should never sell something you treasure, even for love.',
    absolute: 'Poor people are always happier than rich people at Christmas.',
    unsupported: 'Expensive gifts are the best way to show love.',
  },
  {
    summary: `In ${titled(HOUR)}, Louise Mallard hears that her husband has died. Alone in her room, she realizes with growing joy that she is now free to live for herself. When her husband walks in alive, she dies of shock.`,
    theme: 'The longing to live freely, for oneself, can be overwhelming.',
    topic: 'Freedom',
    plot: 'Mrs. Mallard learns that her husband has died, feels free, and dies when he comes home.',
    command: 'You should break bad news gently to people with weak hearts.',
    absolute: 'Every marriage takes away a person’s freedom and joy.',
    unsupported: 'Grief makes people stronger and wiser as time goes on.',
  },
  {
    summary: `In ${titled(PAW)}, the White family is warned that a magic paw grants wishes at a terrible cost. They wish for two hundred pounds and receive it as compensation for their son’s death; a desperate second wish brings something terrible to the door, and a third wish sends it away.`,
    theme: 'Trying to change fate for selfish gain can bring tragic consequences.',
    topic: 'Fate and greed',
    plot: 'The Whites wish for money on a monkey’s paw and receive it after their son is killed.',
    command: 'Don’t keep strange objects that visitors bring home from abroad.',
    absolute: 'Wishes always come true, but always in the worst possible way.',
    unsupported: 'Hard work is the only honest path to wealth.',
  },
  {
    summary: `In ${titled(WINDOW)}, a nervous visitor, Framton Nuttel, is told by a teenage girl that her aunt’s husband and brothers died three years ago and that her aunt still waits for them. When the men walk in from hunting, Framton flees in terror, and the girl, Vera, calmly makes up a new story to explain why he ran.`,
    theme: 'A confident storyteller can make people believe almost anything.',
    topic: 'Deception',
    plot: 'Vera tells Framton a ghost story, and he runs away when the hunters return.',
    command: 'Do not visit strangers when you are trying to rest your nerves.',
    absolute: 'Teenagers always lie to adults who visit their homes.',
    unsupported: 'Grief for lost family members can last a lifetime.',
  },
  {
    summary: `In ${titled(HEART)}, a narrator who insists that he is sane kills an old man and hides the body under the floor. When the police visit, he believes he can hear the dead man’s heart beating louder and louder, until he screams out a confession.`,
    theme: 'A guilty conscience can be impossible to escape.',
    topic: 'Guilt',
    plot: 'A man kills an old man, hides the body under the floor and confesses to the police.',
    command: 'Always tell the police the truth when they question you.',
    absolute: 'Everyone who commits a crime is eventually caught.',
    unsupported: 'Careful planning leads to success.',
  },
  {
    summary: `In ${titled(FIRE)}, a newcomer to the Yukon ignores an old-timer’s advice never to travel alone at fifty degrees below zero. After he soaks his feet, snow from a tree puts out his fire, and he freezes to death, while his dog, guided by instinct, survives.`,
    theme: 'Overconfidence in the face of nature’s power can be deadly.',
    topic: 'Survival in the cold',
    plot: 'A man travels alone in the Yukon, his fire goes out, and he freezes to death.',
    command: 'Always carry extra matches when you hike in the winter.',
    absolute: 'Animals are always smarter than people in the wild.',
    unsupported: 'Courage is enough to survive any danger.',
  },
  {
    summary: 'NAME, a talented swimmer, is so sure of winning the regional final that {he} stops training. {He} finishes last. The next season {he} trains harder than ever, this time alongside a teammate {he} once ignored.',
    theme: 'Talent without effort is not enough, and failure can teach humility.',
    topic: 'Pride',
    plot: 'NAME stops training, loses the final and trains harder the next season.',
    command: 'Never stop training in the weeks before a big race.',
    absolute: 'Talented people always become arrogant and lazy in the end.',
    unsupported: 'Winning is all that matters in sport.',
  },
  {
    summary: 'When NAME’s family moves to a new country, NAME is embarrassed by {his} grandmother’s accent and old-fashioned clothes. When the grandmother falls ill, NAME sits with her and hears, for the first time, how much she gave up so the family could make a new start.',
    theme: 'Understanding sacrifice can turn embarrassment into gratitude.',
    topic: 'Family',
    plot: 'NAME is embarrassed by {his} grandmother until she falls ill and tells {him} her story.',
    command: 'Respect your grandparents and never be embarrassed by them.',
    absolute: 'Young people never appreciate what their families give up.',
    unsupported: 'Moving to a new country makes families happier.',
  },
  {
    summary: 'NAME and NAME2 find a wallet full of money. NAME2 wants to keep it; NAME insists on returning it. They argue bitterly, but they return it together, and the owner, an elderly shopkeeper, offers them both weekend jobs. By the end, the two are closer friends than before.',
    theme: 'Doing the right thing can be hard, but honesty builds trust.',
    topic: 'Honesty',
    plot: 'NAME and NAME2 return a lost wallet and are offered jobs by its owner.',
    command: 'If you ever find money, take it straight to the police.',
    absolute: 'Honest people are always rewarded with money or jobs.',
    unsupported: 'Friendships cannot survive an argument.',
  },
  {
    summary: 'NAME has been teased for {his} stutter and has spent a year avoiding speaking in class. When {his} little brother is lost at a crowded fair, NAME takes the microphone at the information desk and calls for help, stutter and all, and the brother is found.',
    theme: 'Courage often means acting in spite of fear and embarrassment.',
    topic: 'Courage',
    plot: 'NAME, who stutters, uses a microphone to find {his} lost brother.',
    command: 'Never tease people who stutter or speak differently.',
    absolute: 'Shy people are always the bravest ones in an emergency.',
    unsupported: 'It is better to stay silent than to risk embarrassment.',
  },
  {
    summary: 'A village cuts down its ancient forest to build a factory. For a few years everyone is richer, but then floods begin to wash away the fields, and the old people remember that the trees once held back the water.',
    theme: 'Short-term gain at nature’s expense can bring long-term harm.',
    topic: 'Nature and greed',
    plot: 'A village cuts down its forest, builds a factory and then suffers floods.',
    command: 'Do not build factories near rivers or old forests.',
    absolute: 'Factories always destroy the villages that build them.',
    unsupported: 'Money can solve every problem a community faces.',
  },
];

const FLAW_WHY: Record<Flaw, string> = {
  theme: 'Nothing: it is a strong theme statement.',
  topic: 'It names a topic, not a complete idea about life.',
  plot: 'It retells the plot instead of stating a message about life.',
  command: 'It gives the reader an order instead of an insight.',
  absolute: 'It overgeneralizes with a word like “always”, “never” or “every”.',
  unsupported: 'The story does not support it.',
};
/** Diagnoses that could also be argued for a statement of each kind, so they are left out of its choices. */
const FLAW_CLASH: Record<Flaw, Flaw[]> = {
  theme: [],
  topic: [],
  plot: [],
  command: ['absolute'],
  absolute: ['unsupported'],
  unsupported: ['absolute'],
};

function themeQ(rng: Rng, d: Difficulty) {
  const cast = pair(rng);
  const t = rng.pick(THEME_STORIES);
  const f = (x: string) => fill(x, cast);
  const summary = f(t.summary);
  if (d === 3) {
    const shown = rng.pick(['theme', 'topic', 'plot', 'command', 'absolute', 'unsupported'] as Flaw[]);
    const others = rng.shuffle((['theme', 'topic', 'plot', 'command', 'absolute', 'unsupported'] as Flaw[]).filter((x) => x !== shown && !FLAW_CLASH[shown].includes(x)));
    const statement = f(t[shown]);
    return {
      prompt: `${summary}\n\nA student wrote this theme statement for the story:\n\n${block(statement)}\n\nWhat, if anything, is wrong with it?`,
      parts: [part(mc(rng, FLAW_WHY[shown], others.map((x) => FLAW_WHY[x])))],
      hints: ['A strong theme statement is a complete sentence about life in general, supported by the story, without orders or words like “always” and “never”.'],
      solution: [`${FLAW_WHY[shown]}`, shown === 'theme' ? `It states a general insight that the story supports.` : `A stronger theme statement would be: “${f(t.theme)}”`],
    };
  }
  const wrong = d === 1 ? [t.topic, t.plot, t.unsupported] : [t.command, t.absolute, rng.pick([t.topic, t.plot, t.unsupported])];
  return {
    prompt: `${summary}\n\nWhich is the best statement of the story’s **theme**?`,
    parts: [part(mc(rng, f(t.theme), wrong.map(f)))],
    hints: ['A theme is a message about life or people in general, written as a complete sentence. It is not a topic, a summary of events, or an order to the reader.'],
    solution: [`“${f(t.theme)}” is a complete, general statement about life that the story supports.`, d === 1 ? `“${f(t.topic)}” is only a topic, and “${f(t.plot)}” retells the plot.` : `“${f(t.command)}” is an order, and “${f(t.absolute)}” overgeneralizes.`],
  };
}

// ---------------------------------------------------------------------------- irony

type Irony = 'verbal' | 'situational' | 'dramatic';
const IRONIES: Irony[] = ['verbal', 'situational', 'dramatic'];
const IRONY_NAME: Record<Irony, string> = { verbal: 'Verbal irony', situational: 'Situational irony', dramatic: 'Dramatic irony' };
const IRONY_WHAT: Record<Irony, string> = {
  verbal: 'in verbal irony, a speaker says the opposite of what they mean, or something with a hidden second meaning',
  situational: 'in situational irony, what happens is the opposite of what was expected',
  dramatic: 'in dramatic irony, the reader or audience knows something that a character does not',
};

const IRONY_SCENES: Record<Irony, string[]> = {
  verbal: [
    'Looking at the flooded tent, NAME said, “Well, this is the perfect holiday.”',
    'When NAME2 arrived an hour late, NAME glanced at the clock and said, “Thanks for rushing.”',
    'After burning the toast for the third time, NAME announced, “Clearly, I am a master chef.”',
    'Stuck in a traffic jam that had not moved for forty minutes, NAME muttered, “We’re making excellent time.”',
    'When the team lost 7–0, the coach sighed and said to NAME, “Well, that was a masterpiece of defending.”',
  ],
  situational: [
    'The town’s fire station burned down while the firefighters were out putting out a small bin fire.',
    'NAME spent months training a guard dog to protect {his} house, and the dog was so friendly that it followed the burglar home.',
    'NAME2, a driving instructor famous for {his2} safety lectures, crashed {his2} car into the driving-school sign.',
    'NAME had worried all year about failing mathematics, and passed it easily, but failed art, the subject {he} thought was easiest.',
    'NAME put up a security camera to catch whoever was stealing {his} flowers, and the thief stole the camera.',
  ],
  dramatic: [
    'The reader knows that NAME’s friends are hiding in the dark living room for a surprise party, but NAME, sure that everyone has forgotten {his} birthday, decides to go straight to bed.',
    'In a film, the audience sees a thief slip a stolen necklace into NAME’s bag, while NAME walks happily toward the shop’s security guard.',
    'The reader knows that the letter NAME is waiting for was lost in the post, but every morning {he} checks the mailbox, sure it will come today.',
    'The audience knows that the ice in the middle of the lake is thin, but NAME, who arrived after the warning, skates confidently toward it.',
    'In a play, the audience hears NAME2 plan to betray NAME, and then watches NAME thank NAME2 for being such a loyal friend.',
  ],
};
const NO_IRONY: string[] = [
  'NAME studied every evening for a month and passed the exam with a high mark.',
  'It rained all afternoon, so NAME stayed inside and read a book.',
  'NAME2 forgot {his2} lunch, so NAME shared {his} sandwiches.',
  'The team trained hard all season and won the final.',
];

interface PdIrony {
  lead: string;
  excerpt?: Excerpt;
  irony: Irony;
  /** The kinds offered as choices besides the right one (others could be argued). */
  choices: Irony[];
  why: string;
}
const PD_IRONIES: PdIrony[] = [
  { lead: `In ${titled(MAGI)}, Della has sold her hair to buy a chain for Jim’s watch. Then Jim says:`, excerpt: MAGI_WATCH, irony: 'situational', choices: ['verbal', 'dramatic'], why: 'Each gift was bought for the very treasure the other has just sold, the opposite of what either of them expected.' },
  { lead: `At the end of ${titled(HOUR)}, Mrs. Mallard has died at the sight of her husband, alive. The reader has just watched her rejoice that she was free.`, excerpt: HOUR_ENDING, irony: 'dramatic', choices: ['verbal'], why: 'The doctors think she died of joy at seeing her husband; the reader knows she had just found joy in being free of him.' },
  { lead: `Near the end of ${titled(WINDOW)}, Framton has fled from the house. Mrs. Sappleton says:`, excerpt: WINDOW_GHOST, irony: 'dramatic', choices: ['verbal'], why: 'The reader knows that Framton really did believe he had seen ghosts, because of Vera’s story; Mrs. Sappleton has no idea.' },
  { lead: `In ${titled(CASK)}, Montresor is leading Fortunato into the vaults, where he plans to kill him. Fortunato raises a glass:`, excerpt: CASK_TOAST, irony: 'verbal', choices: ['situational'], why: 'Montresor wishes Fortunato “long life” while planning to end it: his words mean the opposite of what he intends.' },
  { lead: `In ${titled(CASK)}, Fortunato is coughing in the damp vaults where Montresor plans to kill him. Montresor answers:`, excerpt: CASK_COUGH, irony: 'verbal', choices: ['situational'], why: 'Montresor agrees that Fortunato will not die of a cough, a statement with a hidden second meaning: he will die another way, at Montresor’s hands.' },
  { lead: `In ${titled(PAW)}, the Whites wish on the paw for two hundred pounds. The next day, the company where their son works pays them exactly two hundred pounds, as compensation for his death in the machinery.`, irony: 'situational', choices: ['verbal'], why: 'The family gets exactly what they wished for, in the worst way imaginable, the opposite of the happy outcome they expected.' },
];

function ironyQ(rng: Rng, d: Difficulty) {
  const cast = pair(rng);
  if (d === 3) {
    const want = rng.pick(IRONIES);
    const options = [want, ...IRONIES.filter((x) => x !== want)].map((x) => fill(rng.pick(IRONY_SCENES[x]), cast));
    options.push(fill(rng.pick(NO_IRONY), cast));
    return {
      prompt: `Which situation is an example of **${IRONY_NAME[want].toLowerCase()}**?`,
      parts: [part(mc(rng, options[0], options.slice(1)))],
      hints: [`Remember: ${IRONY_WHAT[want]}.`],
      solution: [`Remember: ${IRONY_WHAT[want]}.`, `This situation fits: ${options[0]}`, 'One of the other situations is not ironic at all: things turn out just as expected.'],
    };
  }
  if (d === 2) {
    const p = rng.pick(PD_IRONIES);
    return {
      prompt: `${p.lead}${p.excerpt ? `\n\n${quoteBlock(p.excerpt)}` : ''}\n\nWhat kind of irony is this?`,
      parts: [part(mc(rng, IRONY_NAME[p.irony], p.choices.map((c) => IRONY_NAME[c])))],
      hints: ['Ask: is someone saying the opposite of what they mean (verbal)? Does the outcome go against what was expected (situational)? Does the reader know something a character does not (dramatic)?'],
      solution: [`This is ${IRONY_NAME[p.irony].toLowerCase()}: ${IRONY_WHAT[p.irony]}.`, p.why],
    };
  }
  const irony = rng.pick(IRONIES);
  const scene = fill(rng.pick(IRONY_SCENES[irony]), cast);
  return {
    prompt: `${scene}\n\nWhat kind of irony is this?`,
    parts: [part(mc(rng, IRONY_NAME[irony], IRONIES.filter((x) => x !== irony).map((x) => IRONY_NAME[x])))],
    hints: ['Ask: is someone saying the opposite of what they mean (verbal)? Does the outcome go against what was expected (situational)? Does the reader know something a character does not (dramatic)?'],
    solution: [`This is ${IRONY_NAME[irony].toLowerCase()}: ${IRONY_WHAT[irony]}.`],
  };
}

// ---------------------------------------------------------------------------- symbols

interface Symbol {
  lead: string;
  excerpt?: Excerpt;
  object: string;
  meaning: string;
  wrong: string[];
  /** Difficulty 3: the detail that best supports the reading, and details that do not. */
  evidence?: { claim: string; right: string; wrong: string[] };
}
const SYMBOLS: Symbol[] = [
  {
    lead: 'All through the story, NAME, who is not allowed to leave {his} uncle’s house, cares for a small bird that lives in a cage by the window. On the last page, NAME opens the cage and watches the bird fly away.',
    object: 'the caged bird',
    meaning: 'NAME’s longing for freedom',
    wrong: ['NAME’s love of keeping pets', 'the uncle’s wealth and comfort', 'the coming of a long winter'],
    evidence: { claim: 'The caged bird stands for NAME’s own lack of freedom.', right: 'Like the bird, NAME is shut inside the house and cannot leave.', wrong: ['The bird sings every morning as the sun comes through the window.', 'The uncle bought the cage at a market many years before.', 'The bird eats seeds from NAME’s hand when it is hungry.'] },
  },
  {
    lead: 'After {his} grandfather dies, NAME keeps the old man’s pocket watch, which stopped at the hour of his death, and refuses to have it repaired. On the final page, NAME takes it to a watchmaker to be fixed.',
    object: 'the stopped watch',
    meaning: 'NAME’s grief, then {his} readiness to move on',
    wrong: ['NAME’s need to be on time for school every day', 'the high cost of repairing an old pocket watch', 'the grandfather’s old job at the railway station'],
    evidence: { claim: 'The watch stands for NAME’s grief.', right: 'It stopped when the grandfather died, and NAME keeps it stopped.', wrong: ['It is made of silver, with a pattern of leaves on the case.', 'It was bought in another city, long before NAME was born.', 'It is small enough to fit in the pocket of a school jacket.'] },
  },
  {
    lead: 'NAME and NAME2, who have not spoken since a bitter quarrel, live on opposite sides of a river. In the final scene, they meet in the middle of the old bridge and shake hands.',
    object: 'the bridge',
    meaning: 'the reconciliation of the two former friends',
    wrong: ['the danger of crossing deep rivers', 'the town’s need for better roads and bridges', 'NAME’s lifelong fear of heights and water'],
  },
  {
    lead: 'After a fire destroys {his} family’s farm, NAME plants a single apple seedling in the ashes and waters it every day.',
    object: 'the apple seedling',
    meaning: 'hope and a new beginning',
    wrong: ['the family’s hunger', 'NAME’s anger about the fire', 'the end of the farm'],
    evidence: { claim: 'The seedling stands for hope.', right: 'It grows out of the ashes of the farm that was destroyed.', wrong: ['Apples are a common fruit on farms all over the world.', 'NAME bought it at a garden shop in the nearest town.', 'Young seedlings need plenty of water every day to grow.'] },
  },
  {
    lead: 'NAME’s mother keeps one drawer of her desk locked, and NAME is never allowed to look inside. When NAME finally finds the key, the drawer holds letters about a sister {he} never knew existed.',
    object: 'the locked drawer',
    meaning: 'the family’s hidden past',
    wrong: ['NAME’s love of writing', 'the mother’s wealth', 'the importance of tidiness'],
  },
  {
    lead: 'As NAME and NAME2’s argument grows worse, a storm builds outside; when they finally apologize to each other, the rain stops and the sun comes out.',
    object: 'the storm',
    meaning: 'the conflict between NAME and NAME2',
    wrong: ['the changing seasons of the year', 'the danger of travelling in bad weather', 'NAME’s love of nature and the outdoors'],
  },
  {
    lead: 'NAME wears a smiling mask to every party and never lets anyone see {him} without it. At the end, alone in {his} room, {he} takes it off and cries.',
    object: 'the mask',
    meaning: 'the happy face NAME shows while hiding {his} sadness',
    wrong: ['NAME’s love of dressing up in fancy costumes', 'the danger of going to parties with strangers', 'a fashion that NAME and {his} friends all follow'],
  },
  {
    lead: 'On {his} eighteenth birthday, NAME’s father hands {him} the keys to the family shop, the same keys his own father once gave him.',
    object: 'the keys',
    meaning: 'responsibility passed down to the next generation',
    wrong: ['the danger of theft in a busy market street', 'NAME’s love of shopping with {his} father', 'the shop’s need for new and stronger locks'],
  },
];
const PD_SYMBOLS: Symbol[] = [
  {
    lead: `In ${titled(HOUR)}, Mrs. Mallard sits facing an open window as she realizes that she is free. This is what she sees and hears:`,
    excerpt: HOUR_WINDOW,
    object: 'the open window',
    meaning: 'the free new life that now lies open before her',
    wrong: ['her fear of the noisy world outside her house', 'the railroad accident reported in the newspaper', 'her sister Josephine’s kindness and concern'],
    evidence: { claim: 'The open window is a symbol of Mrs. Mallard’s new freedom.', right: 'Through it she sees “new spring life” as she realizes she is free.', wrong: ['Her sister kneels at the closed door and begs her to open it.', 'Richards was at the newspaper office when the news arrived.', 'The doctors say she died of heart disease, of “joy that kills”.'] },
  },
  {
    lead: `In ${titled(PAW)}, Sergeant-Major Morris explains why the paw was made:`,
    excerpt: PAW_FATE,
    object: 'the monkey’s paw',
    meaning: 'the danger of trying to change fate',
    wrong: ['the family’s love of travel and adventure', 'the sergeant-major’s bravery in war', 'the comfort of the family’s home'],
  },
  {
    lead: `In ${titled(MAGI)}, Della receives combs for the long hair she has sold, and Jim receives a chain for the watch he has sold.`,
    object: 'the combs and the watch chain',
    meaning: 'the love shown by what each gave up for the other',
    wrong: ['Della’s vanity about her beautiful long hair', 'the couple’s wealth and comfortable life', 'the cold of winter in the city at Christmas'],
    evidence: { claim: 'The combs and the chain stand for the couple’s love.', right: 'Each was bought by giving up the thing the giver valued most.', wrong: ['The combs are made of tortoise shell, with jewelled rims.', 'The chain cost twenty-one dollars at a shop in the city.', 'Della bought the chain on Christmas Eve, after selling her hair.'] },
  },
  {
    lead: `At the end of ${titled(HEART)}, after the murder, the narrator believes he hears the dead man’s heart beating louder and louder beneath the floor, until he confesses.`,
    object: 'the beating heart',
    meaning: 'the narrator’s guilty conscience',
    wrong: ['the old man’s kindness to the narrator', 'the narrator’s good health and strength', 'the slow passing of the seasons and years'],
    evidence: { claim: 'The beating heart stands for the narrator’s guilt.', right: 'No one else hears it, and it grows louder until he confesses.', wrong: ['The old man had a pale blue eye, with a film over it.', 'The police officers chat pleasantly and smile at the narrator.', 'The narrator hid the body under three planks of the floor.'] },
  },
  {
    lead: `In ${titled(FIRE)}, the man’s life depends on keeping a fire burning in the deadly cold. When snow from a tree puts it out, his chances of surviving begin to fade.`,
    object: 'fire',
    meaning: 'life and survival',
    wrong: ['the man’s anger', 'friendship', 'wealth'],
  },
];

function symbolQ(rng: Rng, d: Difficulty) {
  const cast = pair(rng);
  const f = (x: string) => fill(x, cast);
  if (d === 3) {
    const s = rng.pick([...SYMBOLS, ...PD_SYMBOLS].filter((x) => x.evidence));
    const e = s.evidence!;
    return {
      prompt: `${f(s.lead)}${s.excerpt ? `\n\n${quoteBlock(s.excerpt)}` : ''}\n\nA student claims: “${f(e.claim)}” Which detail best supports this reading?`,
      parts: [part(mc(rng, f(e.right), e.wrong.map(f)))],
      hints: ['Good evidence for a symbol links the object to the idea it stands for. A detail that is merely true about the object is not enough.'],
      solution: [`This detail connects ${s.object} directly to the idea it stands for: ${f(e.right)}`, 'The other details are true or possible, but they say nothing about what the object means.'],
    };
  }
  const s = d === 2 && rng.chance(0.7) ? rng.pick(PD_SYMBOLS) : rng.pick(SYMBOLS);
  return {
    prompt: `${f(s.lead)}${s.excerpt ? `\n\n${quoteBlock(s.excerpt)}` : ''}\n\nWhat does ${s.object} most likely symbolize?`,
    parts: [part(mc(rng, cap1(f(s.meaning)), s.wrong.map((w) => cap1(f(w)))))],
    hints: ['A symbol is an object that stands for an idea. Notice when the object appears, what happens to it, and how it connects to the main character’s situation.'],
    solution: [`${cap1(s.object)} most likely stands for ${f(s.meaning)}.`, 'The story links the object to this idea at its most important moments, which is what makes it a symbol rather than just a detail.'],
  };
}
const cap1 = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const THEME_SKILLS: SkillDef[] = [
  skill({
    id: 'e10-theme',
    name: 'Theme statements',
    description: 'Choose and write a theme as a complete, general statement about life that the story supports, and explain what is wrong with weak theme statements.',
    outcomes: ['10-A2'],
    lessonId: L,
    format: 'mc',
    gen: themeQ,
  }),
  skill({
    id: 'e10-irony',
    name: 'Verbal, situational and dramatic irony',
    description: 'Tell verbal, situational and dramatic irony apart.',
    outcomes: ['10-A2'],
    lessonId: L,
    format: 'mc',
    gen: ironyQ,
  }),
  skill({
    id: 'e10-symbol',
    name: 'Symbols',
    description: 'Interpret what a symbol most likely stands for, and choose the evidence that supports the reading.',
    outcomes: ['10-A2'],
    lessonId: L,
    format: 'mc',
    gen: symbolQ,
  }),
];
