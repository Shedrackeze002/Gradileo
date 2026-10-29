/**
 * Grade 10 English, lesson 1.1: Plot and Conflict (10-A1). The stages of a plot, kinds of conflict,
 * and foreshadowing, flashback, suspense, in medias res and cliffhangers. Story outlines are written
 * for Gradileo or summarize public-domain stories; quoted passages come from ./texts.ts.
 */
import { fixedChoice, mc, part, skill } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { AnswerSpec, Choice, Difficulty, SkillDef } from '../../../types.ts';
import { fill, people, type Person } from './common.ts';
import { FIRE, FIRE_SPIT, HEART, HEART_BEAT, MAGI, HOUR, OWL, OWL_OPENING, PAW, PAW_BURN, PAW_KNOCK, PAW_THIRD_WISH, WINDOW, quoteBlock, titled, type Excerpt, type Story } from './texts.ts';

const L = 'e10-1-1';

/** Two people of different genders, so "he" and "she" are never ambiguous. */
export function pair(rng: Rng): Person[] {
  const a = people(rng, 1)[0];
  const b = retryPick(rng, (p) => p.he !== a.he);
  return [a, b, retryPick(rng, (p) => p.name !== a.name && p.name !== b.name)];
}
function retryPick(rng: Rng, ok: (p: Person) => boolean): Person {
  for (let i = 0; i < 100; i++) {
    const p = people(rng, 1)[0];
    if (ok(p)) return p;
  }
  throw new Error('no person found');
}

// ---------------------------------------------------------------------------- plot stages

type Stage = 'exposition' | 'rising' | 'climax' | 'falling' | 'resolution';
const STAGES: Stage[] = ['exposition', 'rising', 'climax', 'falling', 'resolution'];
const STAGE_NAME: Record<Stage, string> = {
  exposition: 'Exposition',
  rising: 'Rising action',
  climax: 'Climax',
  falling: 'Falling action',
  resolution: 'Resolution',
};
const STAGE_WHAT: Record<Stage, string> = {
  exposition: 'introduces the characters, the setting and the situation before the main problem takes hold',
  rising: 'builds the problem through complications that raise the tension',
  climax: 'is the turning point, the moment of highest tension when the main conflict comes to a head',
  falling: 'shows what happens straight after the climax, as the tension eases',
  resolution: 'ties up the story and shows how things stand at the end',
};

interface Outline {
  /** A public-domain story, or a story written for Gradileo with NAME placeholders. */
  story?: Story;
  events: [string, string, string, string, string];
}

const OUTLINES: Outline[] = [
  {
    events: [
      'NAME, the slowest runner on {his} school’s cross-country team, decides to train every morning before the city championship.',
      'Two weeks before the race, NAME sprains an ankle but keeps training on a bicycle, determined not to give up.',
      'Near the finish of the championship, NAME2 slips on the muddy hill ahead, and NAME stops to help {him2} up instead of sprinting past.',
      'NAME and NAME2 cross the finish line together, near the back of the field.',
      'At the team dinner, the coach gives NAME the award for team spirit, and NAME signs up for another season.',
    ],
  },
  {
    events: [
      'NAME lives with {his} grandmother in a small fishing town and walks her old dog, Biscuit, every afternoon.',
      'One stormy evening Biscuit slips his collar and runs off, and NAME searches the harbour as the tide rises.',
      'NAME hears barking from a sinking rowboat and wades into the freezing water to pull Biscuit out just before the boat goes under.',
      'Soaked and shivering, NAME carries Biscuit home, where {his} grandmother wraps them both in blankets.',
      'The next morning NAME mends the broken collar, and Biscuit sleeps by the fire as usual.',
    ],
  },
  {
    events: [
      'NAME runs a tiny bread stall at a busy market and dreams of winning the city’s baking contest.',
      'The night before the contest, NAME’s oven breaks, and {he} has to borrow a neighbour’s old wood-fired oven.',
      'As the judges taste the last loaves, they announce that NAME’s smoky wood-fired bread has won first prize.',
      'The next weekend, a long queue forms at NAME’s stall as people come to try the winning bread.',
      'NAME decides to keep baking in the wood-fired oven and names {his} stall after the neighbour who lent it.',
    ],
  },
  {
    events: [
      'NAME has just moved to a new school and is still trying to make friends.',
      'When NAME2’s phone goes missing, some students whisper that the new student must have taken it.',
      'In front of the whole class, NAME opens the lost-and-found box and pulls out NAME2’s phone, with a note from the caretaker who found it in the gym.',
      'The students who spread the rumour apologize to NAME one by one.',
      'By the end of term, NAME and NAME2 eat lunch together every day.',
    ],
  },
  {
    events: [
      'NAME and {his} cousin NAME2 set out early to hike to a mountain lake they have never visited.',
      'On the way down, thick fog rolls in, the trail markers vanish, and the cousins argue about which way to go.',
      'NAME2 slips at the edge of a steep drop, and NAME grabs {his2} arm just in time to pull {him2} back.',
      'Shaken, the cousins sit together until the fog thins enough to show the trail below.',
      'Back home, NAME2 admits that {he2} should have listened, and the cousins plan a safer hike for the spring.',
    ],
  },
  {
    events: [
      'NAME, NAME2 and two friends form a band to play at the school talent show.',
      'On the day of the show, NAME2, the singer, loses {his2} voice, and NAME, who has never sung in public, must take {his2} place.',
      'Standing at the microphone with {his} hands shaking, NAME begins to sing, and the noisy hall slowly falls silent.',
      'The song ends, the audience stands to applaud, and NAME walks off the stage in a daze.',
      'The band decides that NAME and NAME2 will share the singing from now on.',
    ],
  },
  {
    events: [
      'While helping {his} aunt clear out her attic, NAME finds an old hand-drawn map of the village.',
      'With {his} friend NAME2, NAME follows the map’s clues from the old well to the stone bridge and on to the ruined mill.',
      'Under the floor of the ruined mill, NAME and NAME2 dig up a tin box with the name of NAME’s great-grandmother scratched on the lid.',
      'Inside the box they find letters and a photograph, which they carry back to NAME’s aunt.',
      'NAME’s aunt hangs the photograph in the hall, and the family finally learns the story of the great-grandmother they never knew.',
    ],
  },
  {
    events: [
      'NAME has spent months building a solar-powered water filter for the regional science fair.',
      'On the morning of the fair, clouds cover the sky, and NAME’s filter will not start.',
      'Just as the judges reach {his} table, NAME connects the backup battery {he} built the night before, and clean water begins to flow.',
      'The judges ask NAME questions for twenty minutes and photograph the filter from every side.',
      'NAME wins second place and is invited to show the filter at the community centre in the spring.',
    ],
  },
  {
    story: PAW,
    events: [
      'On a cold, wet night, the White family welcomes Sergeant-Major Morris, an old friend back from many years as a soldier in India.',
      'Ignoring Morris’s warnings, Mr. White keeps the monkey’s paw and wishes on it for two hundred pounds.',
      'As his wife pulls back the bolt to let in whoever is knocking, Mr. White finds the paw and makes his third and last wish.',
      'The knocking stops suddenly, and Mrs. White opens the door.',
      'Outside, the street lamp shines on a quiet and empty road.',
    ],
  },
  {
    story: MAGI,
    events: [
      'On the day before Christmas, Della counts her savings: one dollar and eighty-seven cents to buy a present for her husband, Jim.',
      'Della sells her long, beautiful hair for twenty dollars and buys a platinum chain for Jim’s gold watch.',
      'Della opens Jim’s present, a set of combs for her long hair, and gives him the chain, only to learn that he sold his watch to buy the combs.',
      'Jim lies back on the couch, smiles and asks Della to put the chops on for dinner.',
      'The narrator declares that, of all who give gifts, these two are the wisest.',
    ],
  },
  {
    story: HOUR,
    events: [
      'Because Mrs. Mallard has heart trouble, her sister gently tells her that her husband has been killed in a railroad accident.',
      'Alone in her room by the open window, Mrs. Mallard realizes that she is free and welcomes the years ahead.',
      'As Mrs. Mallard comes down the stairs, her husband walks in through the front door, alive and unhurt.',
      'Josephine cries out, and Richards tries, too late, to block Mrs. Mallard’s view of her husband.',
      'The doctors say that she died of heart disease, “of the joy that kills.”',
    ],
  },
  {
    story: WINDOW,
    events: [
      'Framton Nuttel, who has come to the country to rest his nerves, calls on Mrs. Sappleton and is entertained by her niece, Vera, while he waits.',
      'Vera tells him that her aunt’s husband and brothers vanished in a bog three years ago and that her aunt keeps the window open for their return.',
      'Three figures carrying guns walk across the lawn toward the open window, and Framton flees from the house in terror.',
      'Mrs. Sappleton’s husband comes in through the window and asks who ran out as they arrived.',
      'Vera calmly makes up a new story to explain Framton’s flight: he is terrified of dogs.',
    ],
  },
  {
    story: FIRE,
    events: [
      'On a day far below zero, a newcomer to the Yukon sets out alone with a dog to reach his friends’ camp by six o’clock.',
      'He breaks through the snow into a hidden spring, soaking his legs, and must build a fire to save his feet.',
      'Snow falls from the branches of the spruce tree above him and blots out his fire.',
      'His numb hands fail to light another fire, and he runs along the trail in panic.',
      'He freezes to death in the snow, and the dog trots on toward the camp.',
    ],
  },
];

function outlineIntro(o: Outline, cast: Person[]): string {
  return o.story ? `These events come from ${titled(o.story)} by ${o.story.author}.` : `These events come from a short story about ${cast[0].name}.`;
}

function stageSolution(events: string[]): string[] {
  return STAGES.map((s, i) => `**${STAGE_NAME[s]}:** ${events[i]}`);
}

/** Why the chosen event, and not its neighbours, is at this stage. */
const STAGE_WHY: Record<Stage, string> = {
  exposition: 'It only sets the scene: no problem has started yet.',
  rising: 'It adds a complication that raises the tension, but the outcome is not yet decided.',
  climax: 'Everything before it builds toward this moment, and everything after it follows from it.',
  falling: 'It follows straight on from the climax, before the story has fully settled.',
  resolution: 'It comes last and shows how things stand once the story is over.',
};
/** The neighbouring stage that is too easy to confuse with each one at the lower difficulties. */
const STAGE_NEIGHBOUR: Partial<Record<Stage, Stage>> = { exposition: 'rising', resolution: 'falling', falling: 'resolution' };

const STAGE_HINTS: Record<Stage, string> = {
  exposition: 'The exposition comes first: it introduces who, where and what the situation is, before trouble begins.',
  rising: 'The rising action is where problems pile up and the tension builds toward the turning point.',
  climax: 'The climax is the turning point: the moment of greatest tension, after which the outcome is decided.',
  falling: 'The falling action follows straight on from the climax, as the tension eases.',
  resolution: 'The resolution is the end: it shows how things have settled.',
};

function plotStages(rng: Rng, d: Difficulty) {
  const o = rng.pick(OUTLINES);
  const cast = pair(rng);
  const events = o.events.map((e) => fill(e, cast));
  const intro = outlineIntro(o, cast);
  if (d === 3 && rng.chance(0.6)) {
    // Put all five events in plot order.
    const ids = 'abcde';
    const shown = shuffledNotInOrder(rng, [0, 1, 2, 3, 4]);
    const items: Choice[] = shown.map((k, i) => ({ id: ids[i], md: events[k] }));
    const correctOrder = [0, 1, 2, 3, 4].map((k) => items[shown.indexOf(k)].id);
    const answer: AnswerSpec = { kind: 'order', items, correctOrder };
    return {
      prompt: `${intro} Put the events in **plot order**, with the exposition first and the resolution last.`,
      parts: [part(answer)],
      hints: ['Start with the event that only sets the scene, and end with the one that shows how things settle.', 'Find the turning point of highest tension: it goes in the middle, with complications before it and consequences after it.'],
      solution: stageSolution(events),
    };
  }
  const stage: Stage = d === 1 ? rng.pick(['exposition', 'resolution'] as Stage[]) : d === 2 ? rng.pick(['climax', 'climax', 'rising', 'falling'] as Stage[]) : rng.pick(STAGES);
  const k = STAGES.indexOf(stage);
  const skip = d < 3 ? STAGE_NEIGHBOUR[stage] : undefined;
  const others = rng.shuffle([0, 1, 2, 3, 4].filter((i) => i !== k && STAGES[i] !== skip)).map((i) => events[i]);
  return {
    prompt: `${intro} Which event is the **${STAGE_NAME[stage].toLowerCase()}**?`,
    parts: [part(mc(rng, events[k], others, { max: d === 1 ? 3 : 4 }))],
    hints: [STAGE_HINTS[stage]],
    solution: [`The ${STAGE_NAME[stage].toLowerCase()} ${STAGE_WHAT[stage]}: “${events[k]}”`, STAGE_WHY[stage]],
  };
}

function shuffledNotInOrder(rng: Rng, xs: number[]): number[] {
  for (let i = 0; i < 50; i++) {
    const s = rng.shuffle(xs);
    if (s.some((v, j) => v !== xs[j])) return s;
  }
  return [...xs].reverse();
}

// ---------------------------------------------------------------------------- conflict

type Conflict = 'character' | 'nature' | 'society' | 'self';
const CONFLICT_NAME: Record<Conflict, string> = {
  character: 'Character vs. character',
  nature: 'Character vs. nature',
  society: 'Character vs. society',
  self: 'Character vs. self',
};
const CONFLICT_WHAT: Record<Conflict, string> = {
  character: 'the main character struggles against another person',
  nature: 'the main character struggles against a force of nature: weather, the land, an animal',
  society: 'the main character struggles against the laws, traditions or expectations of a community or a whole society',
  self: 'the struggle happens inside the character’s own mind: a fear, a doubt, a temptation or a hard choice',
};

const CONFLICTS: Record<Conflict, string[]> = {
  character: [
    'NAME and NAME2 both want to be captain of the football team, and NAME2 spreads rumours to turn the other players against NAME.',
    'A rival stall owner, NAME2, copies NAME’s recipes and lowers {his2} prices to drive NAME out of the market.',
    'Every day on the way home, an older student named NAME2 blocks NAME’s path and demands {his} lunch money.',
    'NAME catches NAME2 cheating in the chess tournament, and NAME2 threatens to have NAME disqualified if {he} says a word.',
    'The detective NAME spends the whole story chasing a clever thief, NAME2, across the city.',
    'NAME’s older cousin NAME2 keeps borrowing {his} bicycle without asking and returning it broken, and their arguments grow louder each week.',
  ],
  nature: [
    'NAME’s fishing boat is caught in a sudden storm far from shore, and {he} must keep it from sinking until the wind drops.',
    'After {his} car breaks down in the desert, NAME must find water before the afternoon heat becomes deadly.',
    'NAME races toward a mountain hut as an avalanche thunders down the slope behind {him}.',
    'Flood water rises through NAME’s village, and {he} must get {his} family to the hill before it reaches the roof.',
    'Stranded on a frozen lake as the ice begins to crack, NAME must crawl to the shore before it breaks.',
    'A hungry bear circles NAME’s tent in the night, and {he} must keep it away until morning.',
  ],
  society: [
    'In NAME’s town, an old rule says that only the children of fishing families may join the rowing club, and NAME, a farmer’s child, campaigns to change it.',
    'NAME refuses to follow {his} village’s tradition of marrying the person chosen by {his} parents, and the whole community turns against {him}.',
    'NAME, a factory worker, organizes the other workers to protest dangerous conditions that the company and the government both ignore.',
    'In a country where novels are banned, NAME secretly runs a library in {his} basement.',
    'NAME is told that students from {his} neighbourhood may not attend the city’s best school, and {he} challenges the rule in court.',
    'When the city council decides to pave over the community garden for a car park, NAME leads the neighbourhood’s fight to save it.',
  ],
  self: [
    'NAME finds a wallet full of money and must decide whether to return it, even though {his} family badly needs money.',
    'NAME is terrified of speaking in public but has promised to give a speech at {his} grandmother’s ninetieth birthday.',
    'After breaking {his} friend’s camera and blaming it on the dog, NAME is tormented by guilt.',
    'NAME longs to quit the piano lessons {he} hates but cannot bear to disappoint {his} mother.',
    'NAME has been offered a place at a school far from home and cannot decide whether to leave {his} family.',
    'NAME doubts {his} own talent so badly that {he} almost tears up the painting {he} has worked on for months.',
  ],
};

const CONFLICT_TYPES: Conflict[] = ['character', 'nature', 'society', 'self'];

function conflictQ(rng: Rng, d: Difficulty) {
  const cast = pair(rng);
  if (d === 3) {
    const want = rng.pick(CONFLICT_TYPES);
    const options = CONFLICT_TYPES.map((t) => fill(rng.pick(CONFLICTS[t]), cast));
    const correct = options[CONFLICT_TYPES.indexOf(want)];
    return {
      prompt: `Which situation shows a **${CONFLICT_NAME[want].toLowerCase()}** conflict?`,
      parts: [part(mc(rng, correct, options.filter((o) => o !== correct)))],
      hints: [`In a ${CONFLICT_NAME[want].toLowerCase()} conflict, ${CONFLICT_WHAT[want]}.`],
      solution: [`“${correct}” fits: ${CONFLICT_WHAT[want]}.`, 'In each other situation, the character struggles against something different: another person, nature, society or their own mind.'],
    };
  }
  const type = rng.pick(CONFLICT_TYPES);
  const scene = fill(rng.pick(CONFLICTS[type]), cast);
  if (d === 1) {
    const internal = type === 'self';
    return {
      prompt: `${scene}\n\nIs this conflict **internal** or **external**?`,
      parts: [part(fixedChoice(['Internal: it happens inside the character’s mind', 'External: the character struggles against an outside force'], internal ? 0 : 1))],
      hints: ['Ask where the struggle is. Inside the character’s own mind (a fear, a doubt, a choice) is internal; against a person, nature or society is external.'],
      solution: internal
        ? [`The struggle is inside ${cast[0].name}’s own mind, so the conflict is internal (character vs. self).`]
        : [`${cast[0].name} struggles against something outside ${cast[0].him}self, so the conflict is external (${CONFLICT_NAME[type].toLowerCase()}).`],
    };
  }
  return {
    prompt: `${scene}\n\nWhat kind of conflict is this?`,
    parts: [part(mc(rng, CONFLICT_NAME[type], CONFLICT_TYPES.filter((t) => t !== type).map((t) => CONFLICT_NAME[t]), { keepOrder: false }))],
    hints: ['Ask what the main character is struggling against: another person, nature, the rules of a society, or something inside themselves.'],
    solution: [`In a ${CONFLICT_NAME[type].toLowerCase()} conflict, ${CONFLICT_WHAT[type]}.`, `Here, ${conflictWhy(type, cast)}`],
  };
}

function conflictWhy(type: Conflict, cast: Person[]): string {
  const n = cast[0].name;
  switch (type) {
    case 'character':
      return `${n}’s problem is another person, so the conflict is external, character vs. character.`;
    case 'nature':
      return `${n} is fighting the natural world, not another person, so the conflict is character vs. nature.`;
    case 'society':
      return `${n} is up against the laws, institutions or traditions of a community, not just one person, so the conflict is character vs. society.`;
    default:
      return `the struggle is inside ${n}’s own mind, so the conflict is internal: character vs. self.`;
  }
}

// ---------------------------------------------------------------------------- plot devices

type Device = 'foreshadowing' | 'flashback' | 'suspense' | 'medias' | 'cliffhanger';
const DEVICES: Device[] = ['foreshadowing', 'flashback', 'suspense', 'medias', 'cliffhanger'];
const DEVICE_NAME: Record<Device, string> = {
  foreshadowing: 'Foreshadowing',
  flashback: 'Flashback',
  suspense: 'Suspense',
  medias: 'In medias res',
  cliffhanger: 'Cliffhanger',
};
const DEVICE_WHAT: Record<Device, string> = {
  foreshadowing: 'foreshadowing gives an early hint of what will happen later',
  flashback: 'a flashback interrupts the story to show events from the past',
  suspense: 'suspense keeps the reader anxiously waiting to find out what will happen',
  medias: 'a story that begins in medias res opens in the middle of the action, without an introduction',
  cliffhanger: 'a cliffhanger ends a chapter or episode at a moment of danger or uncertainty, leaving the outcome unknown',
};
/** Devices too close to each one to be fair distractors (a cliffhanger creates suspense, and so on). */
const DEVICE_CLOSE: Record<Device, Device[]> = {
  foreshadowing: ['suspense'],
  flashback: [],
  suspense: ['cliffhanger', 'foreshadowing'],
  medias: ['suspense'],
  cliffhanger: ['suspense'],
};

const DEVICE_SCENES: Record<Device, string[]> = {
  foreshadowing: [
    'In the first chapter, NAME notices a long crack in the dam above {his} village and decides it is nothing to worry about. Halfway through the story, the dam bursts.',
    'On the first page, a fortune teller warns NAME that {he} will lose something precious before winter. Near the end, {his} grandmother’s ring disappears.',
    'Early in the story, NAME’s car makes a strange rattling noise, and {he} ignores it. Later, the car breaks down on a lonely road at night.',
    'When NAME moves into the old house, the neighbours exchange glances and say that no family has stayed there for more than a month.',
  ],
  flashback: [
    'In the middle of the final match, the story goes back six years to the day NAME first picked up a tennis racket, and then returns to the match.',
    'While NAME waits outside the courtroom, {he} remembers, in a scene several pages long, the night of the accident two years earlier.',
    'As NAME opens the old letter, the story jumps back to the summer {he} and NAME2 last spoke, and then returns to the present.',
    'The chapter interrupts NAME’s wedding day to replay, in detail, the day {he} first met NAME2 at a bus stop ten years before.',
  ],
  suspense: [
    'Over several paragraphs, NAME creeps down the dark stairs toward the noise in the kitchen, and the writer describes every creaking step without revealing what made the sound.',
    'The writer cuts back and forth between NAME racing to the station and the train getting ready to leave, so the reader cannot tell whether {he} will make it.',
    'As NAME edges across the narrow rope bridge, the writer slows the story down, describing each fraying rope and each gust of wind.',
    'For three pages, NAME waits by the phone for the hospital to call with news of {his} brother, while the clock ticks and nothing happens.',
  ],
  medias: [
    'The story’s first sentence is “NAME was already halfway across the frozen river when the ice began to crack.”',
    'The novel opens in the middle of a car chase, with no introduction of the characters or how the chase began.',
    'The opening line drops the reader straight into an argument: “I never said I would help you,” NAME shouted, slamming the door.',
    'The story begins with NAME already running through the burning building; only later does the reader learn who {he} is.',
  ],
  cliffhanger: [
    'Chapter six ends with NAME hanging from the edge of the roof as {his} grip begins to slip.',
    'The first book of the series ends as NAME opens the door to find a stranger who looks exactly like {him}.',
    'The episode ends just as the doctor walks out to tell NAME the results of {his} test.',
    'The chapter ends with NAME reading the first line of the letter, “I know what you did,” and the next chapter does not appear until the following week’s issue.',
  ],
};

interface DeviceExcerpt {
  device: Device;
  lead: string;
  excerpt?: Excerpt;
  /** Devices left out of the choices because they could also be argued. */
  exclude: Device[];
}
const DEVICE_EXCERPTS: DeviceExcerpt[] = [
  { device: 'foreshadowing', lead: `Early in ${titled(PAW)}, before anyone has made a wish, Sergeant-Major Morris describes what happened to the paw’s first owner:`, excerpt: PAW_THIRD_WISH, exclude: ['suspense'] },
  { device: 'foreshadowing', lead: `Early in ${titled(PAW)}, Morris throws the paw on the fire, and Mr. White pulls it out. Morris says:`, excerpt: PAW_BURN, exclude: ['suspense'] },
  { device: 'foreshadowing', lead: `Near the start of ${titled(FIRE)}, the man tests the cold on his long walk alone:`, excerpt: FIRE_SPIT, exclude: ['suspense'] },
  { device: 'suspense', lead: `Late at night in ${titled(PAW)}, after the second wish, Mr. White goes downstairs in the dark:`, excerpt: PAW_KNOCK, exclude: ['cliffhanger', 'foreshadowing'] },
  { device: 'suspense', lead: `In ${titled(HEART)}, the narrator stands in the dark old man’s room with his lantern:`, excerpt: HEART_BEAT, exclude: ['cliffhanger', 'foreshadowing'] },
  { device: 'medias', lead: `This is the opening of ${titled(OWL)}:`, excerpt: OWL_OPENING, exclude: ['suspense'] },
  { device: 'flashback', lead: `${titled(OWL)} opens with a man standing on a bridge with a rope around his neck. Its second part then goes back in time to show how the man, a planter named Peyton Farquhar, came to be there, before the story returns to the bridge.`, exclude: ['medias'] },
];

function deviceChoices(rng: Rng, device: Device, exclude: Device[], max = 4): AnswerSpec {
  const others = DEVICES.filter((x) => x !== device && !exclude.includes(x) && !DEVICE_CLOSE[device].includes(x));
  return mc(rng, DEVICE_NAME[device], rng.shuffle(others).map((x) => DEVICE_NAME[x]), { max });
}

function plotDevices(rng: Rng, d: Difficulty) {
  const cast = pair(rng);
  if (d === 3) {
    const device = rng.pick(DEVICES);
    const others = DEVICES.filter((x) => x !== device && !DEVICE_CLOSE[device].includes(x));
    const options = [device, ...rng.shuffle(others).slice(0, 3)].map((x) => fill(rng.pick(DEVICE_SCENES[x]), cast));
    return {
      prompt: `Which passage uses **${DEVICE_NAME[device].toLowerCase()}**?`,
      parts: [part(mc(rng, options[0], options.slice(1)))],
      hints: [`Remember: ${DEVICE_WHAT[device]}.`],
      solution: [`Remember: ${DEVICE_WHAT[device]}.`, `This passage does that: ${options[0]}`],
    };
  }
  if (d === 2 && rng.chance(0.6)) {
    const ex = rng.pick(DEVICE_EXCERPTS);
    return {
      prompt: `${ex.lead}${ex.excerpt ? `\n\n${quoteBlock(ex.excerpt)}` : ''}\n\nWhich technique is the writer using?`,
      parts: [part(deviceChoices(rng, ex.device, ex.exclude))],
      hints: ['Ask what the passage does with time: does it hint at the future, jump into the past, start in the middle, stop at a dangerous moment, or make the reader wait?'],
      solution: [`This is ${DEVICE_NAME[ex.device].toLowerCase()}: ${DEVICE_WHAT[ex.device]}.`, deviceExcerptWhy(ex)],
    };
  }
  const device = rng.pick(DEVICES);
  const scene = fill(rng.pick(DEVICE_SCENES[device]), cast);
  return {
    prompt: `${scene}\n\nWhich technique is the writer using?`,
    parts: [part(deviceChoices(rng, device, [], d === 1 ? 3 : 4))],
    hints: ['Ask what the passage does with time: does it hint at the future, jump into the past, start in the middle, stop at a dangerous moment, or make the reader wait?'],
    solution: [`This is ${DEVICE_NAME[device].toLowerCase()}: ${DEVICE_WHAT[device]}.`],
  };
}

function deviceExcerptWhy(ex: DeviceExcerpt): string {
  switch (ex.device) {
    case 'foreshadowing':
      return ex.excerpt === FIRE_SPIT
        ? 'Spit that freezes before it reaches the snow hints that the cold is far more dangerous than the man thinks, and it is the cold that kills him in the end.'
        : 'The warning about the paw hints at the sorrow the Whites’ own wishes will bring.';
    case 'suspense':
      return 'The writer slows the moment down and holds back what is happening, so the reader waits anxiously to find out.';
    case 'medias':
      return 'The story opens at the most dramatic moment, with a man about to be hanged, and does not explain who he is or why.';
    default:
      return 'The story leaves the present moment to show past events that explain how the man came to be on the bridge.';
  }
}

export const PLOT_SKILLS: SkillDef[] = [
  skill({
    id: 'e10-plot-stages',
    name: 'Stages of a plot',
    description: 'Identify the exposition, rising action, climax, falling action and resolution of a story, and put its events in plot order.',
    outcomes: ['10-A1'],
    lessonId: L,
    format: 'mc',
    gen: plotStages,
  }),
  skill({
    id: 'e10-conflict',
    name: 'Kinds of conflict',
    description: 'Classify a conflict as internal or external, and as character against character, nature, society or self.',
    outcomes: ['10-A1'],
    lessonId: L,
    format: 'mc',
    gen: conflictQ,
  }),
  skill({
    id: 'e10-plot-devices',
    name: 'Foreshadowing, flashback and suspense',
    description: 'Recognize foreshadowing, flashback, suspense, in medias res and cliffhangers in a story.',
    outcomes: ['10-A1'],
    lessonId: L,
    format: 'mc',
    gen: plotDevices,
  }),
];
