/**
 * Grade 11 English, lessons 4.1 and 4.2: The Essay; Rhetorical Analysis (11-D1). Kinds of essay,
 * stated and implied central ideas, the rhetorical situation (speaker, occasion, audience, purpose and
 * tone) and why a writer makes a rhetorical choice. Quoted passages come from public-domain essays
 * (./essays.ts) and one Grade 10 speech; every other passage is written for Gradileo, and its people,
 * places and organizations are invented.
 */
import { fixedChoice, mc, part, skill } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { block, fill, lowerFirst, pair } from '../../eng10/gen/common.ts';
import { FD_PROVE, intro, speechBlock } from '../../eng10/gen/speeches.ts';
import {
  BA_DELIGHT, BA_TASTED, CD_CONSCIENCE, CD_PRISON, CH_ADVENTURE, CH_CHALK, CH_WONDER, FN_MAN, JE_IDLING, LE_MANIA, MP_FOOD, MP_INTEREST,
  RP_MANUSCRIPT, SR_SOCIETY, VW_POWER, VW_RATIONAL, WA_SIMPLICITY, WA_WOODS, WP_PRAYER, essayBlock, lead, type Excerpt,
} from './essays.ts';

// ============================================================================ lesson 4.1: kinds of essay

type Kind = 'expository' | 'argumentative' | 'personal' | 'satirical';
const KINDS: Kind[] = ['expository', 'argumentative', 'personal', 'satirical'];
const KIND_NAME: Record<Kind, string> = {
  expository: 'Expository',
  argumentative: 'Argumentative',
  personal: 'Personal (reflective)',
  satirical: 'Satirical',
};
const KIND_DEFINED: Record<Kind, string> = {
  expository: 'Expository: it explains or informs',
  argumentative: 'Argumentative: it argues for a position',
  personal: 'Personal (reflective): it reflects on the writer’s own experience',
  satirical: 'Satirical: it mocks a target in order to criticize it',
};
const KIND_WHAT: Record<Kind, string> = {
  expository: 'an expository essay explains or informs, setting out facts, causes or processes without arguing for one side',
  argumentative: 'an argumentative essay takes a position and supports it with reasons and evidence, often answering the other side',
  personal: 'a personal (reflective) essay explores the writer’s own experience and what the writer has come to understand from it',
  satirical: 'a satirical essay uses irony, exaggeration or mock seriousness to make a target look ridiculous, in order to criticize it',
};
/** The kind with its article: “an expository”, “a personal”. */
const KIND_A: Record<Kind, string> = {
  expository: 'an expository',
  argumentative: 'an argumentative',
  personal: 'a personal (reflective)',
  satirical: 'a satirical',
};
const KIND_HINT = 'Ask what the writer is mainly doing: explaining, arguing for a position, reflecting on their own life, or mocking something to criticize it.';

const KIND_DESCRIPTIONS: Record<Kind, string[]> = {
  expository: [
    'An essay explains how a volcano forms, step by step, using diagrams and facts from geologists.',
    'An essay sets out the history of the bicycle, from the first wooden models to today’s electric bikes.',
    'An essay describes how the human heart pumps blood, defining each part and its job.',
    'An essay explains why the seasons change, using the tilt of the Earth and the angle of sunlight.',
    'An essay compares three ways of storing solar energy and explains how each works, without recommending one.',
    'An essay explains how a bill becomes a law in a parliament, stage by stage.',
  ],
  argumentative: [
    'An essay claims that every city should make its buses free, gives three reasons with evidence, and answers the strongest objection.',
    'An essay argues that homework should be banned in primary schools, citing studies and rebutting the other side.',
    'An essay takes the position that zoos do more harm than good, and supports it with evidence.',
    'An essay argues that voting should be compulsory, answering those who say it limits freedom.',
    'An essay contends that every student should learn to cook at school, giving reasons and evidence.',
    'An essay maintains that social media companies should check their users’ ages, and refutes two counterarguments.',
  ],
  personal: [
    'An essay describes the summer the writer spent working in a grandparent’s bakery and reflects on what it taught them about patience.',
    'An essay recalls the writer’s first day at a new school in a new country and what it showed them about belonging.',
    'An essay looks back on a friendship the writer lost, and on what the writer now understands about it.',
    'An essay reflects on learning to swim at fifteen, and how the writer’s fear felt and slowly changed.',
    'An essay remembers a long train journey the writer took alone, and the strangers who changed how they saw the world.',
    'An essay reflects on the writer’s habit of keeping old letters, and on what those letters have come to mean to them.',
  ],
  satirical: [
    'An essay pretends to praise a city council for building a bridge that leads nowhere, in order to mock its waste of money.',
    'An essay solemnly recommends that students be graded on how quietly they breathe, to ridicule schools obsessed with rules.',
    'An essay, written as a cheerful advertisement, “sells” polluted air in jars, to criticize a factory that pollutes a town.',
    'An essay gravely proposes that meetings about reducing meetings be held every hour, to mock office bureaucracy.',
    'An essay pretends to admire a celebrity for posting forty photos of a sandwich, to mock the hunger for online attention.',
    'An essay offers mock-serious advice on how to ignore every warning label, to ridicule people who think rules never apply to them.',
  ],
};

/** Four openings on one subject, one of each kind. */
const OPENINGS: Array<Record<Kind, string> & { subject: string }> = [
  {
    subject: 'phones in class',
    expository: 'Smartphones affect attention in several measurable ways, and researchers study them by recording how often students switch between tasks.',
    argumentative: 'Schools should collect phones at the start of the day, because nothing else will give students back the hours of focus that notifications steal.',
    personal: 'The week my phone broke, I discovered how many times a day I had been reaching for it without thinking.',
    satirical: 'Why waste a lesson on the French Revolution when students could spend it watching a stranger rate breakfast cereals? Our schools must catch up with the times.',
  },
  {
    subject: 'traffic',
    expository: 'A traffic jam can form with no accident at all: when one driver brakes sharply, the cars behind brake harder, and the slowdown travels backward like a wave.',
    argumentative: 'The city centre should be closed to private cars, because cleaner air and safer streets are worth a slightly longer journey.',
    personal: 'I learned to love my city on the bus, watching it wake up through a fogged window every morning on the way to school.',
    satirical: 'Our council has wisely decided that the best cure for traffic is more traffic, and it is building a twelve-lane road to prove it.',
  },
  {
    subject: 'exams',
    expository: 'Most final exams are marked against a scheme that lists the points a strong answer should include, so that different markers give similar marks.',
    argumentative: 'Final exams should count for less than half of a student’s grade, because one bad morning should not outweigh a year of steady work.',
    personal: 'The night before my first final exam, I sat at the kitchen table with my grandmother, who had never been allowed to sit one.',
    satirical: 'Why test students only once a year? Let us test them every morning, every lunchtime and, for the truly dedicated, in their sleep.',
  },
  {
    subject: 'food waste',
    expository: 'Food is wasted at every stage between the farm and the plate: in harvesting, in transport, in shops and in our own kitchens.',
    argumentative: 'Supermarkets should be required to give unsold food to charities instead of throwing it away.',
    personal: 'My grandfather, who grew up hungry, scraped every last grain of rice from his bowl, and I never understood why until I visited his village.',
    satirical: 'I propose that we stop buying food altogether and simply throw our money straight into the bin, which would save everyone a trip to the shops.',
  },
  {
    subject: 'libraries',
    expository: 'A modern public library lends far more than books: many lend tools, musical instruments and even seeds for gardens.',
    argumentative: 'Every town should keep its public library open seven days a week, because it is the one indoor space where anyone may stay without spending money.',
    personal: 'The library on our street was where I spent every rainy afternoon of my childhood, and where a patient librarian taught me to read a map.',
    satirical: 'Why should a town waste money on a library when its citizens could spend the same afternoons admiring the new car park?',
  },
  {
    subject: 'sleep',
    expository: 'During sleep, the brain passes through several stages in cycles of about ninety minutes, each with its own pattern of activity.',
    argumentative: 'Secondary schools should start no earlier than nine o’clock, because teenagers need more sleep than the present timetable allows.',
    personal: 'For a whole term I slept four hours a night and called it ambition, until the morning I fell asleep on the bus and missed my stop by an hour.',
    satirical: 'Sleep is clearly a waste of a third of our lives, and I look forward to the day when schools award prizes for staying awake the longest.',
  },
];

interface PdKind {
  excerpt: Excerpt;
  kind: Kind;
  /** Kinds that could also be argued for this passage, so they are never offered as wrong answers. */
  also: Kind[];
  why: string;
}
const PD_KINDS: PdKind[] = [
  { excerpt: BA_DELIGHT, kind: 'expository', also: ['argumentative'], why: 'Bacon sets out what studies are used for, explaining their three purposes.' },
  { excerpt: CD_CONSCIENCE, kind: 'argumentative', also: [], why: 'Thoreau takes a position (people should follow their conscience before the law) and presses it with questions and claims.' },
  { excerpt: VW_POWER, kind: 'argumentative', also: [], why: 'Wollstonecraft states the position she is arguing for: women’s education should give them power over themselves.' },
  { excerpt: WA_WOODS, kind: 'personal', also: ['argumentative'], why: 'Thoreau reflects on his own decision to live in the woods and what he hoped to learn from it.' },
  { excerpt: CH_CHALK, kind: 'personal', also: [], why: 'Chesterton begins with a small memory from his own life, told in the first person.' },
  { excerpt: MP_FOOD, kind: 'satirical', also: ['argumentative'], why: 'Swift calmly recommends a monstrous idea that he does not mean, to attack how cruelly the poor were treated.' },
  { excerpt: LE_MANIA, kind: 'satirical', also: ['argumentative'], why: 'Leacock exaggerates the health-mad young men’s habits until they look ridiculous.' },
];

function kindQ(rng: Rng, d: Difficulty) {
  if (d === 3) {
    const o = rng.pick(OPENINGS);
    const want = rng.pick(KINDS);
    return {
      prompt: `Four essays about **${o.subject}** begin in these ways. Which opening most likely begins **${KIND_A[want]}** essay?`,
      parts: [part(mc(rng, o[want], KINDS.filter((k) => k !== want).map((k) => o[k])))],
      hints: [`Remember: ${KIND_WHAT[want]}.`],
      solution: [`“${o[want]}” fits: ${KIND_WHAT[want]}.`, 'Each of the other openings begins a different kind of essay.'],
    };
  }
  if (d === 2) {
    if (rng.chance(0.5)) {
      const p = rng.pick(PD_KINDS);
      const kinds = KINDS.filter((k) => !p.also.includes(k));
      return {
        prompt: `${lead(p.excerpt.essay)}\n\n${essayBlock(p.excerpt)}\n\nWhat kind of essay does this passage most likely come from?`,
        parts: [part(fixedChoice(kinds.map((k) => KIND_NAME[k]), kinds.indexOf(p.kind)))],
        hints: [KIND_HINT],
        solution: [p.why, `So it comes from ${KIND_A[p.kind]} essay.`],
      };
    }
    const o = rng.pick(OPENINGS);
    const kind = rng.pick(KINDS);
    return {
      prompt: `An essay begins:\n\n${block(o[kind])}\n\nWhat kind of essay does it most likely begin?`,
      parts: [part(fixedChoice(KINDS.map((k) => KIND_NAME[k]), KINDS.indexOf(kind)))],
      hints: [KIND_HINT],
      solution: [`This opening fits ${KIND_A[kind]} essay: ${KIND_WHAT[kind]}.`],
    };
  }
  const kind = rng.pick(KINDS);
  const text = rng.pick(KIND_DESCRIPTIONS[kind]);
  return {
    prompt: `${text}\n\nWhat kind of essay is this?`,
    parts: [part(fixedChoice(KINDS.map((k) => KIND_DEFINED[k]), KINDS.indexOf(kind)))],
    hints: [KIND_HINT],
    solution: [`This is ${KIND_A[kind]} essay: ${KIND_WHAT[kind]}.`],
  };
}

// ============================================================================ lesson 4.1: central idea

/** A paragraph whose central idea is stated in one general sentence; the others are details. */
const STATED: Array<{ central: string; details: [string, string, string] }> = [
  { central: 'Learning a craft by hand teaches patience in a way that few other activities can.', details: ['A first clay bowl usually collapses on the wheel before it is finished.', 'A beginner at knitting may unpick the same row five or six times.', 'Even an expert woodworker waits a full day for glue to set before sanding.'] },
  { central: 'Public parks give a crowded city room to breathe.', details: ['On summer evenings, families from tiny flats spread blankets on the grass.', 'Office workers eat lunch under the trees instead of at their desks.', 'Older residents meet at the same bench every morning to play chess.'] },
  { central: 'A good coach notices what a player does right, not only what the player does wrong.', details: ['After a lost match, Coach Mendes begins by naming the three best passes of the game.', 'She writes each player one sentence of praise before any criticism.', 'In training, she stops the game to applaud a well-timed run.'] },
  { central: 'Moving to a new country means learning far more than a new language.', details: ['Newcomers must learn when the shops close and how the buses work.', 'They discover which jokes their new classmates find funny.', 'They even learn how close to stand to someone in a queue.'] },
  { central: 'Noise is one of the most overlooked costs of city life.', details: ['Traffic on the main road rarely falls silent before midnight.', 'Delivery lorries begin unloading outside the shops at five in the morning.', 'Residents near the airport hear a plane roughly every two minutes.'] },
  { central: 'Volunteering often helps the volunteer as much as the people being helped.', details: ['Students who tutor younger children often find their own marks improving.', 'Retired people who help at the food bank say they feel less lonely.', 'Volunteers at the animal shelter learn skills they later use in paid jobs.'] },
  { central: 'Handwritten letters carry a warmth that messages on a screen rarely match.', details: ['The writer’s handwriting itself becomes part of the message.', 'A letter can be kept in a drawer and reread years later.', 'Waiting days for a reply makes its arrival an event.'] },
  { central: 'The way a classroom is arranged shapes how students learn in it.', details: ['Desks in rows point every student toward the teacher.', 'Desks in clusters invite students to talk and work together.', 'A room with no windows can leave a class drowsy by the afternoon.'] },
];

interface PdIdea {
  excerpt: Excerpt;
  right: string;
  wrong: [string, string, string];
  why: string;
}
const PD_IDEAS: PdIdea[] = [
  { excerpt: CD_CONSCIENCE, right: 'A person should follow their own conscience rather than simply obey the law.', wrong: ['Citizens should respect the law above their own sense of right.', 'Every person has a conscience.', 'Governments are important.'], why: 'Thoreau asks whether a citizen should ever give up his conscience to a lawmaker, and answers that respect for “the right” matters more than respect for the law.' },
  { excerpt: SR_SOCIETY, right: 'Society pressures people to conform, which works against their independence.', wrong: ['Society rewards people who think for themselves.', 'People live together in societies.', 'Conformity is the greatest virtue a person can have.'], why: 'Emerson calls society a “conspiracy” against its members and says the virtue it most wants is conformity, the opposite of self-reliance.' },
  { excerpt: VW_RATIONAL, right: 'Women should be treated as rational adults, not flattered as if they were children.', wrong: ['Women are happiest when they are admired for their graces.', 'Children should be taught to stand on their own.', 'The writer is a woman.'], why: 'Wollstonecraft says she will treat women “like rational creatures” instead of flattering them and treating them as if in “perpetual childhood”.' },
  { excerpt: WA_SIMPLICITY, right: 'People waste their lives on unnecessary detail and should simplify them.', wrong: ['A busy life with many affairs is the best kind of life.', 'People should count on their fingers and toes.', 'Life is complicated.'], why: 'Thoreau says life is “frittered away by detail” and calls for “simplicity, simplicity, simplicity”.' },
  { excerpt: CH_ADVENTURE, right: 'Whether something is an adventure or an inconvenience depends on how we choose to see it.', wrong: ['Adventures are always more dangerous than they seem.', 'Inconveniences should be avoided at all costs.', 'People enjoy adventures.'], why: 'Chesterton says the same event is an adventure “rightly considered” and an inconvenience “wrongly considered”: the difference lies in our view of it.' },
  { excerpt: BA_TASTED, right: 'Different books deserve different kinds of reading.', wrong: ['Every book should be read slowly and completely.', 'Some books can be eaten.', 'Reading is a waste of time.'], why: 'Bacon’s food metaphor sorts books into those to be tasted (read in parts), swallowed (read quickly) and chewed and digested (read wholly and carefully).' },
  { excerpt: JE_IDLING, right: 'Idleness is only enjoyable when there is work one ought to be doing.', wrong: ['People should never stop working.', 'Doing nothing is the best way to spend a holiday.', 'Work is always more enjoyable than rest.'], why: 'Jerome says idling is only fun when “one has plenty of work to do”: with nothing to do, doing nothing is no pleasure.' },
  { excerpt: CH_WONDER, right: 'The world is full of marvels; what is lacking is people who feel wonder at them.', wrong: ['The world is running out of wonders.', 'Many people around the world are starving.', 'Wonders can only be found in faraway places.'], why: 'Chesterton says the world will never lack “wonders”, only “wonder”: the problem is our attitude, not the world.' },
  { excerpt: CD_PRISON, right: 'Under an unjust government, an honest person should be willing to go to prison rather than cooperate with it.', wrong: ['Prisons are only for people who have committed crimes.', 'Governments should build more prisons.', 'Just people never break the law.'], why: 'Thoreau says that where a government imprisons people unjustly, a just person belongs in prison too: resisting injustice matters more than staying free.' },
];

/** A paragraph that implies its central idea without stating it. */
const IMPLIED: Array<{ text: string; right: string; wrong: [string, string, string]; why: string }> = [
  {
    text: 'Every evening at six, NAME’s grandmother set the table for four, though only two of them lived in the house by then. She folded the napkins into the same neat triangles and set out the blue plates that NAME’s mother had loved. She never explained, and NAME never asked.',
    right: 'The grandmother keeps alive, through a daily ritual, the memory of family members who are gone.',
    wrong: ['The grandmother expects guests every evening.', 'Setting a table properly is an important skill.', 'NAME dislikes eating with {his} grandmother.'],
    why: 'The empty places, the dead or absent mother’s favourite plates and the silence suggest a ritual of remembering.',
  },
  {
    text: 'The new shopping centre has six cinemas, forty shops and a fountain that changes colour every minute. It has no benches. Security guards ask teenagers who sit on the steps to move along.',
    right: 'The shopping centre welcomes people who spend money, but not those who simply want somewhere to be.',
    wrong: ['The shopping centre is the best place in town for teenagers.', 'Fountains are expensive to run.', 'The shopping centre needs more cinemas.'],
    why: 'Plenty of places to spend money, but no benches and no welcome for teenagers who sit, imply a place built for customers only.',
  },
  {
    text: 'NAME’s father leaves for the bakery at four every morning and comes home after dark. NAME has seen him asleep at the kitchen table, still wearing his apron. On NAME’s birthday, there is always a cake, decorated by hand.',
    right: 'Despite his exhausting work, the father shows his love through the care he puts into what he makes for his child.',
    wrong: ['The father does not care about his child.', 'Bakeries open too early in the morning.', 'NAME wants to become a baker.'],
    why: 'The long hours and exhaustion, set beside the hand-decorated cake, suggest love shown through work and care.',
  },
  {
    text: 'The village school has one classroom, one teacher and nineteen pupils between five and eleven. The older children help the younger ones to read. When the teacher is ill, the pupils teach themselves from the books on the shelf.',
    right: 'In the small village school, the pupils have learned to rely on and teach one another.',
    wrong: ['The village school is about to close.', 'The older children dislike helping the younger ones.', 'Books are the most important part of any school.'],
    why: 'Older pupils teaching younger ones, and the class teaching itself when the teacher is away, point to a community that relies on itself.',
  },
  {
    text: 'For years the town’s river smelled of chemicals, and no one swam in it. Last summer, after the factory upstream fitted new filters, a heron was seen fishing by the bridge. By August, children were paddling in the shallows again.',
    right: 'Cleaning up the factory’s waste has brought the river back to life.',
    wrong: ['Herons are rare birds.', 'The factory should be closed down.', 'Children should not swim in rivers.'],
    why: 'The filters come first, then the heron, then the children: the details trace the river’s recovery after the clean-up.',
  },
  {
    text: 'At the start of the year, NAME would not raise {his} hand in class. In March {he} asked one question. By June {he} was arguing with the teacher about the ending of a novel, and winning.',
    right: 'Over the year, NAME grew in confidence.',
    wrong: ['NAME dislikes {his} teacher.', 'Novels often have unsatisfying endings.', 'NAME knew all the answers from the start of the year.'],
    why: 'The details move from silence, to one question, to confident argument: together they show growing confidence.',
  },
];

function ideaQ(rng: Rng, d: Difficulty) {
  if (d === 3) {
    const p = rng.pick(IMPLIED);
    const cast = pair(rng);
    return {
      prompt: `${block(fill(p.text, cast))}\n\nThe paragraph never states its central idea. Which statement best expresses it?`,
      parts: [part(mc(rng, fill(p.right, cast), p.wrong.map((w) => fill(w, cast))))],
      hints: ['An implied central idea is a general point that all the details add up to. Check that your choice is supported by every detail, not just one.'],
      solution: [fill(p.why, cast), `So the central idea is: ${lowerFirst(fill(p.right, cast))}`],
    };
  }
  if (d === 2) {
    const p = rng.pick(PD_IDEAS);
    return {
      prompt: `${lead(p.excerpt.essay)}\n\n${essayBlock(p.excerpt)}\n\nWhich statement best expresses the central idea of this passage?`,
      parts: [part(mc(rng, p.right, p.wrong))],
      hints: ['The central idea is the main point the whole passage makes. Rule out choices that are too broad, that repeat one detail, that take a figure of speech literally, or that say the opposite.'],
      solution: [p.why, `So the central idea is: ${lowerFirst(p.right)}`],
    };
  }
  const p = rng.pick(STATED);
  const first = rng.chance(0.5);
  const sentences = first ? [p.central, ...p.details] : [...p.details, p.central];
  return {
    prompt: `${block(sentences.join(' '))}\n\nWhich sentence states the central idea of this paragraph?`,
    parts: [part(mc(rng, p.central, p.details))],
    hints: ['Look for the one general statement that the other sentences support with specific examples.'],
    solution: [`“${p.central}” is the general claim; each of the other sentences is a specific example that supports it.`],
  };
}

// ============================================================================ lesson 4.2: the rhetorical situation

type Element = 'speaker' | 'occasion' | 'audience' | 'purpose' | 'tone';
const ELEMENT_QUESTION: Record<Element, string> = {
  speaker: 'Who is the **speaker**?',
  occasion: 'What is the **occasion**: the event or situation that prompted the text?',
  audience: 'Who is the intended **audience**?',
  purpose: 'What is the main **purpose** of the text?',
  tone: 'Which word or phrase best describes its **tone**?',
};
const ELEMENT_WHAT: Record<Element, string> = {
  speaker: 'the speaker is the person or group whose voice the text speaks in',
  occasion: 'the occasion is the event or situation that prompted the text',
  audience: 'the audience is the person or group the text is meant to reach',
  purpose: 'the purpose is what the writer wants the text to do to its audience',
  tone: 'the tone is the writer’s attitude to the subject, shown by word choice',
};

interface Situation {
  text: string;
  speaker: string;
  occasion: string;
  audience: string;
  purpose: string;
  tone: string;
  wrongPurpose: [string, string];
  wrongTone: [string, string];
}
const SITUATIONS: Situation[] = [
  {
    text: 'A letter to the editor of a town newspaper, written by a nurse at the town’s walk-in clinic the week after the council voted to close it, urging readers to come to a public meeting on Thursday and demand that the clinic stay open.',
    speaker: 'A nurse who works at the clinic',
    occasion: 'The council’s vote to close the clinic',
    audience: 'Readers of the town newspaper',
    purpose: 'To persuade readers to come to the meeting and fight to keep the clinic open',
    tone: 'Urgent and concerned',
    wrongPurpose: ['To explain how the clinic’s budget is calculated', 'To thank the council for its decision'],
    wrongTone: ['Playful and light-hearted', 'Bored and indifferent'],
  },
  {
    text: 'A speech given by a head teacher who is retiring this year, at the graduation ceremony of the school’s final-year students, encouraging the graduates to stay curious all their lives.',
    speaker: 'A head teacher who is about to retire',
    occasion: 'The graduation ceremony for the final-year students',
    audience: 'The graduating students and their families',
    purpose: 'To encourage the graduates to keep learning and stay curious',
    tone: 'Warm and hopeful',
    wrongPurpose: ['To announce changes to next year’s timetable', 'To complain about the students’ behaviour'],
    wrongTone: ['Bitter and resentful', 'Cold and detached'],
  },
  {
    text: 'An online review written by a customer whose new washing machine flooded the kitchen twice in its first week, warning other shoppers not to buy that model.',
    speaker: 'A customer who bought the washing machine',
    occasion: 'The machine flooding the customer’s kitchen twice in a week',
    audience: 'Other shoppers who are thinking of buying the machine',
    purpose: 'To warn other shoppers not to buy this model',
    tone: 'Frustrated and exasperated',
    wrongPurpose: ['To advertise the machine’s best features', 'To explain how washing machines work'],
    wrongTone: ['Joyful and grateful', 'Calm and admiring'],
  },
  {
    text: 'A leaflet from the city fire service, handed out at the start of winter, explaining step by step how to use a portable heater safely.',
    speaker: 'The city fire service',
    occasion: 'The start of winter, when people begin using heaters',
    audience: 'People who live in the city',
    purpose: 'To inform residents how to use heaters without starting a fire',
    tone: 'Clear and serious',
    wrongPurpose: ['To sell a new brand of heater', 'To entertain readers with stories about firefighters'],
    wrongTone: ['Sarcastic and mocking', 'Silly and comic'],
  },
  {
    text: 'A speech by the student council president to the school board, a week after the board proposed cutting the school’s music programme, asking the board to keep it.',
    speaker: 'The student council president',
    occasion: 'The board’s proposal to cut the music programme',
    audience: 'The members of the school board',
    purpose: 'To persuade the board to keep the music programme',
    tone: 'Respectful but determined',
    wrongPurpose: ['To announce the date of the next concert', 'To thank the board for cutting the programme'],
    wrongTone: ['Rude and insulting', 'Careless and uninterested'],
  },
  {
    text: 'A eulogy given by a young woman at her grandfather’s funeral, remembering his stories, his garden and his kindness to strangers.',
    speaker: 'The grandfather’s granddaughter',
    occasion: 'Her grandfather’s funeral',
    audience: 'The family and friends who have come to mourn him',
    purpose: 'To honour and remember her grandfather’s life',
    tone: 'Loving and sorrowful',
    wrongPurpose: ['To argue for a change in the law', 'To sell her grandfather’s house'],
    wrongTone: ['Angry and accusing', 'Cheerful and joking throughout'],
  },
  {
    text: 'A blog post by a doctor, written after a viral post claimed that drinking cold water after a meal is dangerous, explaining calmly what the evidence actually shows.',
    speaker: 'A doctor',
    occasion: 'A viral post making a false health claim',
    audience: 'People online who have seen the claim',
    purpose: 'To correct the false claim with evidence',
    tone: 'Calm and reassuring',
    wrongPurpose: ['To spread the claim to more people', 'To advertise a brand of bottled water'],
    wrongTone: ['Panicked and alarmed', 'Mocking and cruel'],
  },
  {
    text: 'A letter from the manager of a city bus company to its passengers, after a week in which dozens of services were cancelled without warning.',
    speaker: 'The manager of the bus company',
    occasion: 'A week of cancelled bus services',
    audience: 'The company’s passengers',
    purpose: 'To apologize and win back passengers’ trust',
    tone: 'Apologetic and sincere',
    wrongPurpose: ['To blame the passengers for the cancellations', 'To announce a rise in fares'],
    wrongTone: ['Boastful and proud', 'Careless and dismissive'],
  },
  {
    text: 'A satirical column in a student newspaper, written by a student the week after the school banned hats, pretending to praise the ban as the greatest step forward in the school’s history.',
    speaker: 'A student columnist',
    occasion: 'The school’s new ban on hats',
    audience: 'Students who read the student newspaper',
    purpose: 'To make the hat ban look ridiculous',
    tone: 'Mocking and sarcastic',
    wrongPurpose: ['To explain the history of school uniforms', 'To persuade students to obey the ban'],
    wrongTone: ['Sincere and admiring', 'Sorrowful and grieving'],
  },
  {
    text: 'A speech by the mayor at the opening of a new footbridge across the river, thanking the engineers and builders and inviting everyone to be the first to cross it.',
    speaker: 'The mayor',
    occasion: 'The opening of the new footbridge',
    audience: 'Residents gathered for the opening, and the people who built the bridge',
    purpose: 'To celebrate the bridge and thank the people who built it',
    tone: 'Proud and celebratory',
    wrongPurpose: ['To apologize for the bridge’s delays', 'To warn people never to use the bridge'],
    wrongTone: ['Gloomy and regretful', 'Angry and threatening'],
  },
];

interface PdSituation {
  context: string;
  element: Element;
  right: string;
  wrong: [string, string, string];
  why: string;
}
const PD_SITUATIONS: PdSituation[] = [
  {
    context: 'In 1845, Frederick Douglass, who had escaped from slavery seven years before, published the story of his life. Campaigners against slavery in the Northern United States helped to publish it, and it was read widely by Northern readers who had never seen slavery for themselves.',
    element: 'audience',
    right: 'Readers in the Northern United States who had never seen slavery',
    wrong: ['Enslaved people in the South, few of whom were allowed to learn to read', 'Douglass’s former owners', 'Historians writing a hundred years later'],
    why: 'The book was published in the North and read by Northern readers who had never seen slavery: they are the people it was written to reach.',
  },
  {
    context: 'In 1845, Frederick Douglass, who had escaped from slavery seven years before, published the story of his life. Campaigners against slavery in the Northern United States helped to publish it, and it was read widely by Northern readers who had never seen slavery for themselves.',
    element: 'purpose',
    right: 'To show readers the cruelty of slavery and strengthen the campaign to end it',
    wrong: ['To entertain readers with an adventure story', 'To describe the geography of Maryland', 'To argue that slavery should continue'],
    why: 'Published with the help of campaigners against slavery, the book shows readers what slavery was really like, to win them to the cause.',
  },
  {
    context: 'In 1729, Ireland was suffering from famine and terrible poverty, while many of its landlords lived in comfort, some of them in England. Jonathan Swift, an Irish clergyman, published “A Modest Proposal” without his name, as a pamphlet.',
    element: 'occasion',
    right: 'Famine and poverty in Ireland',
    wrong: ['A shortage of food in London’s restaurants', 'A new law about cookery', 'The opening of a hospital for children'],
    why: 'The pamphlet was prompted by the famine and poverty in Ireland at the time.',
  },
  {
    context: 'In 1729, Ireland was suffering from famine and terrible poverty, while many of its landlords lived in comfort, some of them in England. Jonathan Swift, an Irish clergyman, published “A Modest Proposal” without his name, as a pamphlet.',
    element: 'tone',
    right: 'Calm and reasonable on the surface, bitterly ironic underneath',
    wrong: ['Openly cheerful and sincere throughout', 'Panicked and confused', 'Gentle and admiring of the landlords'],
    why: 'The narrator sounds calm and reasonable, but the monstrous proposal shows that Swift means the opposite: the tone is bitterly ironic.',
  },
  {
    context: 'In 1846, Henry David Thoreau spent a night in jail for refusing to pay a tax, because he would not support a government that allowed slavery and was fighting a war with Mexico that he believed unjust. He later gave a lecture explaining why, which became the essay “Civil Disobedience”.',
    element: 'occasion',
    right: 'His night in jail for refusing to pay a tax',
    wrong: ['His election to the government', 'The opening of a new prison', 'A holiday he took in Mexico'],
    why: 'Thoreau wrote the lecture to explain his refusal to pay the tax and his night in jail.',
  },
  {
    context: 'In 1846, Henry David Thoreau spent a night in jail for refusing to pay a tax, because he would not support a government that allowed slavery and was fighting a war with Mexico that he believed unjust. He later gave a lecture explaining why, which became the essay “Civil Disobedience”.',
    element: 'purpose',
    right: 'To argue that people should refuse to support a government that acts unjustly',
    wrong: ['To explain how taxes are collected', 'To apologize for breaking the law', 'To describe life in a prison'],
    why: 'Thoreau explains and defends his refusal: he wants readers to see that an unjust government should not be supported.',
  },
  {
    context: 'In 1792, after a French politician proposed that girls should receive only a limited education at home, Mary Wollstonecraft published *A Vindication of the Rights of Woman*.',
    element: 'purpose',
    right: 'To argue that women should be educated as rational beings, as men are',
    wrong: ['To agree that girls need only a limited education', 'To give advice on running a household', 'To describe life in France'],
    why: 'Wollstonecraft answers the proposal by arguing that women deserve a full education that develops their reason.',
  },
  {
    context: 'Mark Twain wrote “The War Prayer” in 1905, while the United States was fighting a war in the Philippines that he opposed. In it, a congregation prays for victory, and a stranger tells them what they are also, without saying it, asking for.',
    element: 'purpose',
    right: 'To make readers see the suffering that a prayer for victory also asks for',
    wrong: ['To celebrate the soldiers going off to war', 'To teach readers how to pray', 'To describe the geography of the Philippines'],
    why: 'The stranger spells out the hidden half of the prayer, the enemy’s suffering, so readers cannot ignore it.',
  },
];

function situationQ(rng: Rng, d: Difficulty) {
  if (d === 3) {
    const p = rng.pick(PD_SITUATIONS);
    return {
      prompt: `${p.context}\n\n${ELEMENT_QUESTION[p.element]}`,
      parts: [part(mc(rng, p.right, p.wrong))],
      hints: [`Remember: ${ELEMENT_WHAT[p.element]}. Use the facts given about the text.`],
      solution: [p.why],
    };
  }
  const s = rng.pick(SITUATIONS);
  if (d === 2) {
    const element = rng.pick(['purpose', 'tone'] as const);
    const other = rng.pick(SITUATIONS.filter((x) => x !== s));
    const wrong = element === 'purpose' ? [...s.wrongPurpose, other.purpose] : [...s.wrongTone, other.tone];
    return {
      prompt: `${s.text}\n\n${ELEMENT_QUESTION[element]}`,
      parts: [part(mc(rng, s[element], wrong))],
      hints: [`Remember: ${ELEMENT_WHAT[element]}.`],
      solution: [`${element === 'purpose' ? 'The purpose' : 'The tone'} is: ${s[element].charAt(0).toLowerCase()}${s[element].slice(1)}.`, `Here, ${ELEMENT_WHAT[element]}.`],
    };
  }
  const element = rng.pick(['speaker', 'occasion', 'audience'] as const);
  const wrong = rng.sample(SITUATIONS.filter((x) => x !== s), 3).map((x) => x[element]);
  return {
    prompt: `${s.text}\n\n${ELEMENT_QUESTION[element]}`,
    parts: [part(mc(rng, s[element], wrong))],
    hints: [`Remember: ${ELEMENT_WHAT[element]}.`],
    solution: [`The ${element} is: ${s[element].charAt(0).toLowerCase()}${s[element].slice(1)}.`, `Here, ${ELEMENT_WHAT[element]}.`],
  };
}

// ============================================================================ lesson 4.2: rhetorical choices

interface RhetChoice {
  /** The passage or a description of it. */
  text: string;
  question: string;
  right: string;
  wrong: [string, string, string];
  why: string;
}
const CHOICES: RhetChoice[] = [
  {
    text: 'An essay arguing for safer crossings outside schools begins: “At 8:14 last Tuesday, a seven-year-old named Leo stepped off the pavement outside Hillside Primary, and a van missed him by less than a metre.”',
    question: 'Why does the writer most likely begin with this story?',
    right: 'To make the danger real and personal before setting out the argument',
    wrong: ['To show that accidents near schools never happen', 'To change the subject from road safety to vans', 'To prove the argument with statistics'],
    why: 'An anecdote, a short true story, puts a face on the problem, so readers care before the reasons and evidence arrive.',
  },
  {
    text: 'An essay arguing for a four-day school week includes: “It is true that some parents would struggle to find childcare on the fifth day. A community programme run by the school could fill that gap.”',
    question: 'Why does the writer admit that some parents would struggle?',
    right: 'To treat the other side fairly before answering its objection, which makes the argument more credible',
    wrong: ['To give up the argument for a four-day week', 'To attack parents who disagree', 'To add a statistic to the essay'],
    why: 'A concession admits what is fair in the other side’s view. Answering it straight away shows the writer has thought it through, which builds trust.',
  },
  {
    text: 'After several paragraphs of formal argument about plastic waste, a writer suddenly says: “Let’s be honest: nobody needs a plastic fork with their banana.”',
    question: 'Why might the writer shift to this casual, plain-spoken sentence?',
    right: 'To jolt readers and make the point feel like plain common sense',
    wrong: ['To show that the writer has run out of evidence', 'To make the essay sound more scientific', 'To introduce a counterargument'],
    why: 'A sudden shift into everyday language stands out against the formal paragraphs and makes the point feel obvious.',
  },
  {
    text: 'A speech to a graduating class ends: “You, sitting in these rows today, will decide what this town becomes.”',
    question: 'Why does the speaker address the listeners directly as “you”?',
    right: 'To make each listener feel personally responsible for the town’s future',
    wrong: ['To blame the audience for the town’s problems', 'To show that the speaker is unsure of the facts', 'To change the subject of the speech'],
    why: 'Direct address speaks to each listener as an individual, turning a general hope into a personal challenge.',
  },
  {
    text: 'An essay about wasted food asks: “If we would never throw a third of our pay into the bin, why do we throw away a third of our food?”',
    question: 'Why does the writer ask this question?',
    right: 'To make readers see the waste as absurd, by comparing it with something they would never do',
    wrong: ['To ask readers for information the writer does not have', 'To admit that the writer does not know the answer', 'To introduce a new topic'],
    why: 'A rhetorical question expects no answer: here it leads readers to see for themselves how foolish the waste is.',
  },
  {
    text: 'After a long, winding paragraph about the factory’s history, its hundreds of jobs and its forty years beside the river, a writer adds a sentence of three words: “Then it closed.”',
    question: 'Why does the writer use such a short sentence here?',
    right: 'To make the closure land with sudden, heavy emphasis',
    wrong: ['To save space because the writer ran out of room', 'To show that the closure was unimportant', 'To list the causes of the closure'],
    why: 'A very short sentence after long ones stops the reader abruptly, so the fact it states hits hard.',
  },
  {
    text: 'A speech given after a flood begins four sentences in a row with the words “We will rebuild”.',
    question: 'Why does the speaker repeat these words?',
    right: 'To stress the community’s determination and make the message memorable',
    wrong: ['To fill time because the speaker has forgotten the speech', 'To show doubt about whether rebuilding is possible', 'To give evidence about the cost of the flood'],
    why: 'Repetition at the start of sentences builds rhythm and drives one idea home, so the audience remembers it.',
  },
  {
    text: 'An essay about road safety includes: “Four of the last five accidents on Station Road happened between three and four in the afternoon, when the school day ends.”',
    question: 'Why does the writer include these figures?',
    right: 'To give specific evidence that links the danger to the end of the school day',
    wrong: ['To entertain the reader with a funny story', 'To attack drivers as bad people', 'To show that the writer has no evidence'],
    why: 'Precise figures are evidence (logos): they show a pattern that connects the accidents to school hours.',
  },
  {
    text: 'A speaker opening a talk on public speaking says: “When I gave my first speech, I was so nervous that I introduced myself by the wrong name.”',
    question: 'Why does the speaker begin with this story about herself?',
    right: 'To put the audience at ease and win their goodwill',
    wrong: ['To prove that she is still a poor speaker', 'To show that names do not matter', 'To argue that nobody should give speeches'],
    why: 'Gentle humour at her own expense makes the speaker likeable and shows she understands the audience’s nerves.',
  },
];

interface PdChoice {
  intro: string;
  question: string;
  right: string;
  wrong: [string, string, string];
  why: string;
}
const PD_CHOICES: PdChoice[] = [
  {
    intro: `${intro(FD_PROVE.speech)}\n\n${speechBlock(FD_PROVE)}`,
    question: 'Why does Douglass ask a question and then answer it at once?',
    right: 'To show that the point is too obvious to need arguing, which exposes how absurd it is to deny it',
    wrong: ['To admit that he cannot prove his point', 'To ask the audience for their opinion', 'To change the subject of his speech'],
    why: 'By asking whether he must prove that the slave is a man, then saying “nobody doubts it”, Douglass shows that those who keep slaves already know the truth they act against.',
  },
  {
    intro: `G. K. Chesterton begins his essay “A Piece of Chalk” (1909) this way:\n\n${essayBlock(CH_CHALK)}`,
    question: 'Why does Chesterton most likely begin with this small personal story?',
    right: 'To draw readers in with an ordinary, vivid moment that the essay will find meaning in',
    wrong: ['To prove a point with statistics', 'To argue against a political opponent', 'To explain how chalk is made'],
    why: 'An anecdote opening invites the reader into a scene. A personal essay often finds a larger idea in such a small moment.',
  },
  {
    intro: `${lead(MP_INTEREST.essay)}\n\n${essayBlock(MP_INTEREST)}`,
    question: 'Why does Swift’s narrator insist that he has no personal interest in his proposal?',
    right: 'To sound reasonable and trustworthy, which makes his monstrous proposal all the more shocking',
    wrong: ['Because Swift really wants his proposal to be carried out', 'To admit that the whole proposal is a joke', 'To describe Ireland’s trade in detail'],
    why: 'The narrator’s calm claim of honesty borrows the voice of a sensible reformer, so the cruelty of what he proposes stands out more sharply.',
  },
  {
    intro: `${lead(VW_RATIONAL.essay)}\n\n${essayBlock(VW_RATIONAL)}`,
    question: 'Why does Wollstonecraft address “my own sex” directly?',
    right: 'To speak to women readers and show that she respects them as rational beings',
    wrong: ['To apologize to men for writing the book', 'To flatter women’s graces, as other writers did', 'To show that she is unsure of her argument'],
    why: 'She turns to women readers and promises to treat them “like rational creatures”: the direct address itself shows the respect she argues for.',
  },
  {
    intro: `${lead(WP_PRAYER.essay)}\n\n${essayBlock(WP_PRAYER)}`,
    question: 'Why does Twain repeat “help us to” at the start of each clause?',
    right: 'To pile up the horrors that a prayer for victory also asks for, so readers cannot ignore them',
    wrong: ['To show that the congregation is praying for peace', 'To make the war sound glorious and exciting', 'To list the soldiers’ names'],
    why: 'Each repetition adds another cruelty, so the hidden meaning of “victory” builds until it is overwhelming.',
  },
  {
    intro: `${lead(CD_CONSCIENCE.essay)}\n\n${essayBlock(CD_CONSCIENCE)}`,
    question: 'Why does Thoreau begin with two questions?',
    right: 'To lead readers to answer “no” for themselves, so they reach his conclusion on their own',
    wrong: ['To ask lawmakers for advice', 'To show that he is unsure whether people have consciences', 'To list the laws he disagrees with'],
    why: 'The rhetorical questions expect the answer “no”. Readers who answer them have already agreed with him before he states his claim.',
  },
  {
    intro: `${lead(FN_MAN.essay)}\n\n${essayBlock(FN_MAN)}`,
    question: 'Why does Douglass reverse the words “man” and “slave” in the two halves of the sentence?',
    right: 'To mark a turning point in his story with a memorable reversal',
    wrong: ['To show that he has forgotten what he wrote earlier', 'To make the sentence harder to understand', 'To prove that he was never enslaved'],
    why: 'The reversal (a man made a slave; a slave made a man) announces that the story is about to turn from his enslavement to his resistance.',
  },
  {
    intro: `${lead(RP_MANUSCRIPT.essay)}\n\n${essayBlock(RP_MANUSCRIPT)}`,
    question: 'Why does Lamb claim to be retelling an ancient “Chinese manuscript”?',
    right: 'To give his comic story about roast pork a mock-scholarly air of authority',
    wrong: ['To give a serious history of Chinese cooking', 'To prove that the manuscript is genuine', 'To argue that people should eat their meat raw'],
    why: 'Pretending to cite an ancient source, in a learned tone, is part of the joke: a trivial subject is treated with mock solemnity.',
  },
];

function choiceQ(rng: Rng, d: Difficulty) {
  if (d === 3 || (d === 2 && rng.chance(0.4))) {
    const p = rng.pick(PD_CHOICES);
    return {
      prompt: `${p.intro}\n\n${p.question}`,
      parts: [part(mc(rng, p.right, p.wrong))],
      hints: ['Ask what the choice does for the writer’s purpose: how does it affect the audience, and why would that help?'],
      solution: [p.why, `So the best answer is: ${p.right.charAt(0).toLowerCase()}${p.right.slice(1)}.`],
    };
  }
  const c = rng.pick(CHOICES);
  return {
    prompt: `${c.text}\n\n${c.question}`,
    parts: [part(mc(rng, c.right, c.wrong, d === 1 ? { max: 3 } : {}))],
    hints: ['Ask what the choice does to the reader or listener, and how that serves the writer’s purpose.'],
    solution: [c.why, `So the best answer is: ${c.right.charAt(0).toLowerCase()}${c.right.slice(1)}.`],
  };
}

const L1 = 'e11-4-1';
const L2 = 'e11-4-2';

export const READING_SKILLS: SkillDef[] = [
  skill({
    id: 'e11-essay-types',
    name: 'Kinds of essay',
    description: 'Tell expository, argumentative, personal (reflective) and satirical essays apart, from a description, an opening or a famous passage.',
    outcomes: ['11-D1'],
    lessonId: L1,
    format: 'mc',
    gen: kindQ,
  }),
  skill({
    id: 'e11-central-idea',
    name: 'Central idea of an essay',
    description: 'Find a passage’s stated central idea, and express an implied one, ruling out details, overly broad statements and misreadings.',
    outcomes: ['11-D1'],
    lessonId: L1,
    format: 'mc',
    gen: ideaQ,
  }),
  skill({
    id: 'e11-rhetorical-situation',
    name: 'The rhetorical situation',
    description: 'Identify the speaker, occasion, audience, purpose and tone of a text, including famous essays and speeches in their context.',
    outcomes: ['11-D1'],
    lessonId: L2,
    format: 'mc',
    gen: situationQ,
  }),
  skill({
    id: 'e11-rhetorical-choices',
    name: 'Rhetorical choices',
    description: 'Explain why a writer chooses an anecdote, a concession, a shift in register, direct address, a rhetorical question, a short sentence or repetition, and how it serves the purpose.',
    outcomes: ['11-D1'],
    lessonId: L2,
    format: 'mc',
    gen: choiceQ,
  }),
];

