/**
 * Grade 10 English, lessons 4.3 and 4.4: Ethos, Pathos and Logos; Bias and Reliable Sources (10-D1,
 * 10-D2). Appeals to credibility, emotion and logic, rhetorical devices, logical fallacies, loaded
 * language, signs of bias, and judging how reliable a source is. Speech excerpts come from
 * public-domain speeches (./speeches.ts); every other passage is written for Gradileo, and its towns,
 * people, surveys and organizations are invented.
 */
import { fixedChoice, mc, part, skill } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { block, fill, pair } from './common.ts';
import {
  DS_HE_HAS, DS_TRUTHS, EP_SACRED, EP_VOTERS, FD_ARGUE, FD_FALSE, FD_FIRE, FD_NATION, FD_PROVE, FD_STORM, FD_VIRGINIA, FD_WAIL, FD_YOURS,
  GB_HALLOW, GB_OPENING, GB_PEOPLE, GB_WORLD, ST_MUSCLE, ST_PINT, intro, speechBlock, type Passage,
} from './speeches.ts';

// ============================================================================ lesson 4.3: ethos, pathos and logos

type Appeal = 'ethos' | 'pathos' | 'logos';
const APPEALS: Appeal[] = ['ethos', 'pathos', 'logos'];
const APPEAL_CHOICE: Record<Appeal, string> = {
  ethos: 'Ethos: it builds trust in the speaker’s credibility or character',
  pathos: 'Pathos: it stirs the audience’s emotions',
  logos: 'Logos: it uses logic, facts and evidence',
};
const APPEAL_WHAT: Record<Appeal, string> = {
  ethos: 'an appeal to ethos makes the audience trust the speaker, by showing experience, expertise or good character',
  pathos: 'an appeal to pathos stirs the audience’s feelings, such as pity, fear, anger or hope',
  logos: 'an appeal to logos convinces with reasoning, facts, numbers and evidence',
};
const APPEAL_HINT = 'Ask what the sentence relies on: who the speaker is (ethos), how the audience will feel (pathos), or facts and reasoning (logos).';

interface AppealTopic {
  goal: string;
  ethos: string;
  pathos: string;
  logos: string;
  /** Difficulty 3: a sentence that makes no appeal at all. */
  none: string;
}
const APPEAL_TOPICS: AppealTopic[] = [
  {
    goal: 'asking the town to give more money to the animal shelter',
    ethos: 'I have volunteered at the shelter every weekend for six years, so I know its work first-hand.',
    pathos: 'Picture a frightened puppy, shivering in a cold cage, waiting for someone to love it.',
    logos: 'The shelter takes in about 900 animals a year but has only 40 kennels, so it has to turn animals away almost every week.',
    none: 'The shelter is on the corner of Mill Road and Station Street.',
  },
  {
    goal: 'urging students to wear helmets when they cycle',
    ethos: 'As a nurse who has worked in the hospital’s emergency department for twenty years, I have seen what a fall from a bike can do.',
    pathos: 'No family should ever have to sit by a hospital bed, wondering whether their child will wake up.',
    logos: 'Last year, 8 of the 10 cyclists treated at our hospital for serious head injuries were not wearing helmets.',
    none: 'Helmets come in many different colours and sizes.',
  },
  {
    goal: 'asking classmates to join a river clean-up',
    ethos: 'I have organized the clean-up for three years, and every year we have finished on time and safely.',
    pathos: 'Imagine a heron tangled in fishing line, unable to fly, slowly starving on the riverbank.',
    logos: 'Last spring, forty volunteers removed 300 kilograms of litter from the river in a single morning.',
    none: 'The river runs through the middle of the town.',
  },
  {
    goal: 'asking the school to hire a second counsellor',
    ethos: 'I have been a student representative on the school council for two years and have spoken with hundreds of students about their worries.',
    pathos: 'Think of a student sitting alone at lunch every day, too anxious to ask anyone for help.',
    logos: 'Our one counsellor serves 1,200 students, so each student can be given, at most, a few minutes a term.',
    none: 'The counsellor’s office is next to the library.',
  },
  {
    goal: 'asking families to donate food to the community food bank',
    ethos: 'I have run the food bank’s Saturday collection for five years, and I know exactly where every donation goes.',
    pathos: 'Tonight, somewhere in this town, a mother will go to bed hungry so that her children can eat.',
    logos: 'Requests for help at the food bank have doubled in two years, while donations have stayed the same.',
    none: 'The food bank has a blue door and a large sign.',
  },
  {
    goal: 'persuading the council to keep the town’s pool open in summer',
    ethos: 'I have been a qualified swimming instructor at the pool for ten years and have taught more than 2,000 children to swim.',
    pathos: 'For many children, a summer without the pool means long, lonely afternoons with nowhere to go.',
    logos: 'Last summer the pool had 18,000 visits, and its ticket sales covered nearly all of its running costs.',
    none: 'The pool was built more than forty years ago.',
  },
];

interface PdAppeal {
  passage: Passage;
  appeal: Appeal;
  why: string;
}
const PD_APPEALS: PdAppeal[] = [
  { passage: FD_VIRGINIA, appeal: 'logos', why: 'Douglass sets out a fact about the law (seventy-two crimes against two) and lets the reasoning show the injustice.' },
  { passage: FD_WAIL, appeal: 'pathos', why: 'The “mournful wail of millions” in chains, set against the “jubilant shouts” of the celebration, is meant to make the audience feel grief and shame.' },
  { passage: EP_SACRED, appeal: 'pathos', why: 'Pankhurst speaks of sacrifice, life and death to stir the audience’s feelings about the women’s struggle.' },
  { passage: EP_VOTERS, appeal: 'logos', why: 'Pankhurst reasons step by step about how voters can remove a legislature that fails them, building a logical argument.' },
];

function appealQ(rng: Rng, d: Difficulty) {
  if (d === 3) {
    const t = rng.pick(APPEAL_TOPICS);
    const want = rng.pick(APPEALS);
    const cast = pair(rng);
    return {
      prompt: fill(`NAME is giving a speech ${t.goal}. {He} wants to add an appeal to **${want}**. Which sentence would do this best?`, cast),
      parts: [part(mc(rng, t[want], [...APPEALS.filter((a) => a !== want).map((a) => t[a]), t.none]))],
      hints: [`Remember: ${APPEAL_WHAT[want]}.`],
      solution: [`“${t[want]}” appeals to ${want}: ${APPEAL_WHAT[want]}.`, 'Each of the other sentences relies on something else, and one makes no appeal at all.'],
    };
  }
  if (d === 2 && rng.chance(0.6)) {
    const p = rng.pick(PD_APPEALS);
    return {
      prompt: `${intro(p.passage.speech)}\n\n${speechBlock(p.passage)}\n\nWhich appeal does this passage **mainly** use?`,
      parts: [part(fixedChoice(APPEALS.map((a) => APPEAL_CHOICE[a]), APPEALS.indexOf(p.appeal)))],
      hints: [APPEAL_HINT],
      solution: [p.why, `So the main appeal is to ${p.appeal}.`],
    };
  }
  const t = rng.pick(APPEAL_TOPICS);
  const appeal = rng.pick(APPEALS);
  return {
    prompt: `In a speech ${t.goal}, a speaker says:\n\n${block(t[appeal])}\n\nWhich appeal does this sentence mainly use?`,
    parts: [part(fixedChoice(APPEALS.map((a) => APPEAL_CHOICE[a]), APPEALS.indexOf(appeal)))],
    hints: [APPEAL_HINT],
    solution: [`This sentence appeals to ${appeal}: ${APPEAL_WHAT[appeal]}.`],
  };
}

// ============================================================================ lesson 4.3: rhetorical devices

type Device = 'question' | 'anaphora' | 'parallelism' | 'tricolon' | 'antithesis' | 'hyperbole' | 'allusion';
const DEVICES: Device[] = ['question', 'anaphora', 'parallelism', 'tricolon', 'antithesis', 'hyperbole', 'allusion'];
const DEVICE_NAME: Record<Device, string> = {
  question: 'Rhetorical question',
  anaphora: 'Repetition (anaphora)',
  parallelism: 'Parallelism',
  tricolon: 'Tricolon (a list of three)',
  antithesis: 'Antithesis',
  hyperbole: 'Hyperbole',
  allusion: 'Allusion',
};
/** The device with an article, for use in a sentence. */
const DEVICE_A: Record<Device, string> = {
  question: 'a rhetorical question',
  anaphora: 'repetition (anaphora)',
  parallelism: 'parallelism',
  tricolon: 'a tricolon',
  antithesis: 'antithesis',
  hyperbole: 'hyperbole',
  allusion: 'an allusion',
};
const DEVICE_WHAT: Record<Device, string> = {
  question: 'a rhetorical question is asked for effect, not for an answer: the answer is meant to be obvious',
  anaphora: 'anaphora repeats the same word or words at the start of several clauses or sentences',
  parallelism: 'parallelism puts several ideas in the same grammatical form, so they sound balanced',
  tricolon: 'a tricolon is a series of three parallel words, phrases or clauses',
  antithesis: 'antithesis sets two opposite ideas side by side in a balanced sentence',
  hyperbole: 'hyperbole is deliberate, obvious exaggeration',
  allusion: 'an allusion is a brief reference to a well-known person, story, event or text',
};

interface DeviceExample {
  text: string;
  device: Device;
  /** Devices the text could also be said to use, which are never offered beside the right answer. */
  also: Device[];
}
const D = (text: string, device: Device, also: Device[] = []): DeviceExample => ({ text, device, also });

const DEVICE_EXAMPLES: DeviceExample[] = [
  D('If we do not protect this forest, who will?', 'question'),
  D('Do we really want our children to grow up breathing this air?', 'question'),
  D('How many more warnings do we need before we act?', 'question'),
  D('Is anyone in this room truly happy with a bus that comes once an hour?', 'question'),
  D('We will clean the beaches. We will plant the trees. We will protect the rivers.', 'anaphora', ['parallelism', 'tricolon']),
  D('Every child deserves a safe home. Every child deserves a good school. Every child deserves a chance.', 'anaphora', ['parallelism', 'tricolon']),
  D('Not today, not tomorrow, not ever will we give up.', 'anaphora', ['parallelism', 'tricolon']),
  D('This is our park. This is our history. This is our home. And we will not let it go.', 'anaphora', ['parallelism', 'tricolon']),
  D('We read the reports, studied the maps, interviewed the farmers and counted the trees.', 'parallelism', ['tricolon']),
  D('She trains in the morning, studies in the afternoon and works in the evening, every single day.', 'parallelism', ['tricolon']),
  D('Our team is faster, stronger and smarter than ever.', 'tricolon', ['parallelism']),
  D('Reduce, reuse, recycle.', 'tricolon', ['parallelism']),
  D('The plan is cheap, simple and fair.', 'tricolon', ['parallelism']),
  D('Talk less; listen more.', 'antithesis', ['parallelism']),
  D('It is easy to make a promise and hard to keep one.', 'antithesis', ['parallelism']),
  D('We may have lost the match, but we have not lost our spirit.', 'antithesis', ['parallelism']),
  D('This homework will take me a thousand years.', 'hyperbole'),
  D('I have asked you a million times to close the gate.', 'hyperbole'),
  D('The line for the new phone stretched halfway around the world.', 'hyperbole'),
  D('I’m so hungry I could eat a horse.', 'hyperbole'),
  D('Opening that old box of letters was like opening Pandora’s box: one secret after another spilled out.', 'allusion'),
  D('Our team’s star player has an Achilles heel: she cannot shoot with her left foot.', 'allusion'),
  D('Cleaning my brother’s bedroom was a task worthy of Hercules.', 'allusion', ['hyperbole']),
  D('Like Romeo and Juliet, the two friends were kept apart by their feuding families.', 'allusion'),
];

interface PdDevice {
  passage: Passage;
  device: Device;
  also: Device[];
  why: string;
}
const PD_DEVICES: PdDevice[] = [
  { passage: GB_HALLOW, device: 'anaphora', also: ['parallelism', 'tricolon'], why: 'Lincoln repeats “we can not” at the start of three clauses in a row.' },
  { passage: GB_WORLD, device: 'antithesis', also: ['parallelism'], why: 'Lincoln balances “what we say here” against “what they did here”: the world will forget the words but never the deeds.' },
  { passage: GB_PEOPLE, device: 'tricolon', also: ['parallelism', 'anaphora'], why: 'Lincoln names government three ways in a row: “of the people, by the people, for the people”.' },
  { passage: GB_OPENING, device: 'allusion', also: [], why: '“All men are created equal” echoes the Declaration of Independence of 1776, and “four score and seven years ago” (87 years) points back to that year.' },
  { passage: FD_YOURS, device: 'antithesis', also: ['parallelism'], why: 'Douglass sets “yours” against “mine” and “rejoice” against “mourn”.' },
  { passage: FD_FIRE, device: 'antithesis', also: ['parallelism'], why: 'Douglass sets opposites side by side: not light but fire, not the gentle shower but thunder.' },
  { passage: FD_STORM, device: 'tricolon', also: ['parallelism'], why: 'Douglass lists three violent forces of nature in a row: “the storm, the whirlwind, and the earthquake”.' },
  { passage: FD_NATION, device: 'parallelism', also: ['anaphora', 'tricolon'], why: 'Each clause has the same shape, “the ___ of the nation must be ___”, which makes the demands sound balanced and relentless.' },
  { passage: FD_FALSE, device: 'tricolon', also: ['parallelism', 'anaphora'], why: 'Douglass builds a series of three: false to the past, false to the present, false to the future.' },
  { passage: FD_PROVE, device: 'question', also: [], why: 'Douglass does not expect an answer: everyone knows the slave is a man, and he says so at once.' },
  { passage: FD_ARGUE, device: 'question', also: ['parallelism'], why: 'Douglass asks questions whose answers are obvious; as he says, “You have already declared it.”' },
  { passage: ST_MUSCLE, device: 'question', also: ['anaphora', 'parallelism', 'tricolon'], why: 'Truth asks “can any man do more than that?” knowing that the obvious answer is no.' },
  { passage: ST_PINT, device: 'question', also: [], why: 'Truth asks a question whose answer is obvious: of course a woman should have her little pint full.' },
  { passage: DS_TRUTHS, device: 'allusion', also: ['anaphora', 'parallelism', 'tricolon'], why: 'The opening deliberately echoes the Declaration of Independence (“We hold these truths to be self-evident, that all men are created equal”), adding “and women”.' },
  { passage: DS_HE_HAS, device: 'anaphora', also: ['parallelism'], why: 'Sentence after sentence begins “He has”, hammering home the list of wrongs.' },
];

/** The right answer and up to three wrong devices, never one the example also uses. */
function deviceChoices(rng: Rng, device: Device, also: readonly Device[]) {
  const wrong = rng.shuffle(DEVICES.filter((x) => x !== device && !also.includes(x))).slice(0, 3);
  return part(mc(rng, DEVICE_NAME[device], wrong.map((x) => DEVICE_NAME[x])));
}

function deviceQ(rng: Rng, d: Difficulty) {
  const hints = ['Look at the shape of the words: a question? words repeated at the start? a balanced pair of opposites? a list of three? an exaggeration? a reference to a famous story or text?'];
  if (d === 3) {
    const want = rng.pick(DEVICES);
    const right = rng.pick(DEVICE_EXAMPLES.filter((e) => e.device === want));
    const used = new Set<Device>([want]);
    const wrong: string[] = [];
    for (const e of rng.shuffle(DEVICE_EXAMPLES)) {
      if (wrong.length === 3) break;
      if (used.has(e.device) || e.also.includes(want) || right.also.includes(e.device)) continue;
      used.add(e.device);
      wrong.push(e.text);
    }
    return {
      prompt: `Which sentence uses **${DEVICE_A[want]}**?`,
      parts: [part(mc(rng, right.text, wrong))],
      hints: [`Remember: ${DEVICE_WHAT[want]}.`],
      solution: [`“${right.text}” uses ${DEVICE_A[want]}: ${DEVICE_WHAT[want]}.`, 'Each of the other sentences uses a different device.'],
    };
  }
  if (d === 2) {
    const p = rng.pick(PD_DEVICES);
    return {
      prompt: `${intro(p.passage.speech)}\n\n${speechBlock(p.passage)}\n\nWhich rhetorical device does this passage use?`,
      parts: [deviceChoices(rng, p.device, p.also)],
      hints,
      solution: [p.why, `So the device is ${DEVICE_A[p.device]}: ${DEVICE_WHAT[p.device]}.`],
    };
  }
  const e = rng.pick(DEVICE_EXAMPLES);
  return {
    prompt: `Which rhetorical device does this sentence use?\n\n${block(e.text)}`,
    parts: [deviceChoices(rng, e.device, e.also)],
    hints,
    solution: [`This is ${DEVICE_A[e.device]}: ${DEVICE_WHAT[e.device]}.`],
  };
}

// ============================================================================ lesson 4.4: logical fallacies

type Fallacy = 'ad-hominem' | 'bandwagon' | 'false-dilemma' | 'hasty' | 'slippery' | 'straw-man' | 'authority';
const BASIC_FALLACIES: Fallacy[] = ['ad-hominem', 'bandwagon', 'false-dilemma', 'hasty', 'slippery', 'straw-man'];
const FALLACY_NAME: Record<Fallacy, string> = {
  'ad-hominem': 'Ad hominem',
  bandwagon: 'Bandwagon',
  'false-dilemma': 'False dilemma',
  hasty: 'Hasty generalization',
  slippery: 'Slippery slope',
  'straw-man': 'Straw man',
  authority: 'Appeal to a false authority',
};
/** The fallacy with an article, for use in a sentence. */
const FALLACY_A: Record<Fallacy, string> = {
  'ad-hominem': 'an ad hominem attack',
  bandwagon: 'a bandwagon argument',
  'false-dilemma': 'a false dilemma',
  hasty: 'a hasty generalization',
  slippery: 'a slippery slope',
  'straw-man': 'a straw man',
  authority: 'an appeal to a false authority',
};
const FALLACY_WHAT: Record<Fallacy, string> = {
  'ad-hominem': 'an ad hominem argument attacks the person making a claim instead of the claim itself',
  bandwagon: 'a bandwagon argument says something must be right or good because many people believe or do it',
  'false-dilemma': 'a false dilemma offers only two choices when there are really more',
  hasty: 'a hasty generalization draws a broad conclusion from too few examples',
  slippery: 'a slippery slope claims, without evidence, that one small step will lead to a chain of disasters',
  'straw-man': 'a straw man twists an opponent’s argument into a weaker or more extreme one, then attacks that instead',
  authority: 'an appeal to a false authority relies on someone who is famous but has no expertise in the subject',
};

const FALLACIES: Record<Fallacy, string[]> = {
  'ad-hominem': [
    'NAME wants a bigger budget for the science club, but why should we listen to someone who failed a chemistry test last year?',
    'NAME’s essay on climate change can’t be any good; {he} is only fifteen.',
    'Don’t vote for NAME’s recycling plan. Have you seen how messy {his} locker is?',
    'NAME2 says the bus routes should change, but {he2} is always late for everything, so ignore {him2}.',
  ],
  bandwagon: [
    'Everyone at school is buying these running shoes, so they must be the best ones you can get.',
    'Millions of people have downloaded this diet app, so it must work.',
    'All your friends are going to the concert, so you should go too.',
    'Most people in town believe the old mill is haunted, so it must be true.',
  ],
  'false-dilemma': [
    'You are either with us on this, or you are against us.',
    'Either you join the football team, or you don’t care about our school.',
    'We must either ban phones from school completely or let students use them whenever they like.',
    'Either we close the library on weekends, or the town will run out of money.',
  ],
  hasty: [
    'I met two rude people from that town last summer, so everyone who lives there must be rude.',
    'My first two science tests went badly, so I must be terrible at science.',
    'NAME’s new laptop broke after a week, so that brand makes terrible computers.',
    'The first restaurant we tried in the city was overpriced, so all the restaurants there must be too expensive.',
  ],
  slippery: [
    'If we let students wear hats in class, soon they will want to wear slippers, and before long no one will take school seriously.',
    'If you skip one practice, you will start skipping all of them, then you will quit the team, and you will never stick with anything again.',
    'If the city allows one food truck on Main Street, soon the street will be full of them, the restaurants will close, and the whole town centre will die.',
    'If we give students five extra minutes between classes, they will soon want an hour, and then nobody will go to lessons at all.',
  ],
  'straw-man': [
    'NAME says the school should serve more vegetarian meals. So {he} wants to ban meat completely and force everyone to eat salad every day.',
    'NAME2 thinks we should have fewer tests. Clearly, {he2} doesn’t believe students should ever be assessed at all.',
    'My parents say I should spend less time on my phone. They obviously want me to have no friends at all.',
    'NAME suggests closing Main Street to cars for one Sunday a month. Apparently {he} wants to ban cars from the whole town.',
  ],
  authority: [
    'A famous footballer says this vitamin drink cures colds, so it must work.',
    'A popular film actor says the new bridge design is unsafe, so the city should cancel it.',
    'A well-known pop singer says that eating only fruit is the healthiest diet, so it must be true.',
  ],
};
const SOUND_ARGUMENTS = [
  'The bridge has failed two safety inspections this year, so the engineers have recommended closing it for repairs.',
  'Our team has lost its last three matches by conceding goals from corners, so we should practise defending corners this week.',
  'The forecast says heavy rain is likely tomorrow, so we should move the sports day to Friday.',
];

function fallacyQ(rng: Rng, d: Difficulty) {
  const cast = pair(rng);
  const pool = d === 3 ? [...BASIC_FALLACIES, 'authority' as Fallacy] : BASIC_FALLACIES;
  const want = rng.pick(pool);
  const hints = ['Ask what is wrong with the reasoning: is it attacking a person, following the crowd, offering only two choices, generalizing from too little, predicting a chain of disasters, twisting the other side’s view, or trusting a famous name?'];
  if (d === 3 && rng.chance(0.35)) {
    const sound = rng.pick(SOUND_ARGUMENTS);
    const wrong = rng.sample(BASIC_FALLACIES, 3).map((f) => fill(rng.pick(FALLACIES[f]), cast));
    return {
      prompt: 'Three of these arguments contain a logical fallacy. Which argument is **reasonable**?',
      parts: [part(mc(rng, sound, wrong))],
      hints: ['A reasonable argument draws a sensible conclusion from relevant evidence. Check each of the others for a fallacy.'],
      solution: [`“${sound}” is reasonable: its conclusion follows from relevant evidence.`, 'Each of the others contains a fallacy.'],
    };
  }
  if (d >= 2 && rng.chance(0.5)) {
    const right = fill(rng.pick(FALLACIES[want]), cast);
    const wrong = rng.shuffle(pool.filter((f) => f !== want)).slice(0, 3).map((f) => fill(rng.pick(FALLACIES[f]), cast));
    return {
      prompt: `Which argument is an example of **${FALLACY_A[want]}**?`,
      parts: [part(mc(rng, right, wrong))],
      hints: [`Remember: ${FALLACY_WHAT[want]}.`],
      solution: [`“${right}”: ${FALLACY_WHAT[want]}.`, 'Each of the other arguments contains a different fallacy.'],
    };
  }
  const text = fill(rng.pick(FALLACIES[want]), cast);
  const wrong = rng.shuffle(pool.filter((f) => f !== want)).slice(0, 3);
  return {
    prompt: `Which logical fallacy does this argument contain?\n\n${block(text)}`,
    parts: [part(mc(rng, FALLACY_NAME[want], wrong.map((f) => FALLACY_NAME[f])))],
    hints,
    solution: [`This is ${FALLACY_A[want]}: ${FALLACY_WHAT[want]}.`],
  };
}

// ============================================================================ lesson 4.4: bias and reliable sources

interface Loaded {
  frame: string;
  neutral: string;
  loaded: string[];
}
const LOADED: Loaded[] = [
  { frame: 'Hundreds of people ___ outside city hall to protest the new tax.', neutral: 'gathered', loaded: ['swarmed', 'invaded', 'mobbed'] },
  { frame: 'The mayor ___ the new budget at Tuesday’s meeting.', neutral: 'presented', loaded: ['rammed through', 'smugly unveiled', 'forced through'] },
  { frame: 'The company ___ that its profits had fallen.', neutral: 'reported', loaded: ['was forced to confess', 'finally admitted', 'grudgingly owned up'] },
  { frame: 'The council member ___ the plan to close the library.', neutral: 'criticized', loaded: ['savaged', 'tore apart', 'slammed'] },
  { frame: 'The new apartment block will ___ 200 families.', neutral: 'house', loaded: ['cram in', 'pack in', 'squeeze in'] },
  { frame: 'Students ___ a later start to the school day.', neutral: 'asked for', loaded: ['nagged for', 'whined for', 'begged for'] },
  { frame: 'The new shopping centre ___ the old market square.', neutral: 'replaced', loaded: ['bulldozed', 'swallowed up', 'wiped out'] },
  { frame: 'The scientist ___ the report’s findings.', neutral: 'questioned', loaded: ['sneered at', 'ripped apart', 'trashed'] },
  { frame: 'Ticket prices at the cinema ___ by ten percent this year.', neutral: 'rose', loaded: ['skyrocketed', 'exploded', 'soared outrageously'] },
];

interface BiasSign {
  scenario: string;
  sign: string;
  wrong: string[];
  why: string;
}
const BIAS_SIGNS: BiasSign[] = [
  {
    scenario: 'A news article about a plan to build a factory near a river quotes three managers from the company that wants to build it, and no one who lives nearby or works to protect the river.',
    sign: 'It presents only one side of the issue.',
    wrong: ['It names each person it quotes, with their job.', 'It reports on a plan that affects a local river.', 'It describes where the new factory would be built.'],
    why: 'A fair article would include the views of residents and environmental groups too. Quoting only the company gives one side.',
  },
  {
    scenario: 'An article calls a proposed skate park “a magnet for troublemakers” and describes its supporters as “a noisy gang of teenagers”.',
    sign: 'It uses loaded language to make readers dislike the idea.',
    wrong: ['It gives the cost of building and running the park.', 'It says where in the town the park would be built.', 'It reports that some teenagers support the idea.'],
    why: 'Words like “magnet for troublemakers” and “noisy gang” carry strong negative feelings instead of neutral facts.',
  },
  {
    scenario: 'A website praising a new sports drink as “scientifically proven” turns out to be run by the company that makes the drink, and it names no scientists or studies.',
    sign: 'It profits from persuading readers and names no evidence.',
    wrong: ['It is published on a website rather than in print.', 'It describes the drink’s flavour and the bottle size.', 'It is about a sports drink rather than a food.'],
    why: 'A source that profits from what it says, and offers no evidence, may be biased.',
  },
  {
    scenario: 'A report on the town’s new bus service describes only the three days on which buses ran late and leaves out the other sixty days, when they ran on time.',
    sign: 'It leaves out facts that do not support its point of view.',
    wrong: ['It gives exact numbers of days, not rough estimates.', 'It is about the town’s public transport, not its roads.', 'It names the specific days when the buses ran late.'],
    why: 'Choosing only the facts that support one view, and hiding the rest, gives a distorted picture.',
  },
  {
    scenario: 'A website comparing two phones turns out to be paid for by the company that makes one of them, and the page does not say so.',
    sign: 'The writer has a hidden reason to favour one side.',
    wrong: ['It compares two products instead of describing one.', 'It is published on a website instead of in a magazine.', 'It describes and compares the two phones’ screens.'],
    why: 'A source paid by one side, which hides that fact, cannot be trusted to judge fairly.',
  },
  {
    scenario: 'A school newsletter article about a new uniform rule interviews five students, all of whom say they like the rule.',
    sign: 'It presents only one side of the issue.',
    wrong: ['It interviews students rather than teachers.', 'It is about the school’s new uniform rule.', 'It was published in the first week of term.'],
    why: 'Choosing only people who agree hides the students who might object, so readers see one side.',
  },
  {
    scenario: 'A documentary about a new dam plays dark, threatening music whenever the dam’s builders appear on screen, and cheerful music whenever its opponents speak.',
    sign: 'It uses music to make one side seem like the villain.',
    wrong: ['It shows the valley where the dam would be built.', 'It interviews people on both sides of the debate.', 'It is a documentary film rather than a news report.'],
    why: 'The music tells viewers how to feel about each side before they have heard the arguments.',
  },
  {
    scenario: 'A blog post quotes a politician as saying “we should cut the library budget”, but leaves out the rest of her sentence: “if the new grant does not arrive”.',
    sign: 'It quotes words out of context, changing their meaning.',
    wrong: ['It quotes a politician by name about the library.', 'It is about the budget of the town’s public library.', 'It is published as a blog post instead of in print.'],
    why: 'Cutting the quotation makes the politician sound as if she wants the cut, which is not what she said.',
  },
];

interface SourceQuestion {
  question: string;
  best: string;
  /** Each weaker source with what is wrong with it. */
  weak: Array<{ source: string; flaw: string }>;
}
const SOURCE_QUESTIONS: SourceQuestion[] = [
  {
    question: 'How many hours of sleep do teenagers need?',
    best: 'A recent report by a national association of children’s doctors that reviews dozens of sleep studies',
    weak: [
      { source: 'A blog post by a mattress company that sells beds and pillows specially designed for teenagers', flaw: 'the mattress company profits from what it says' },
      { source: 'A comment posted on a popular social media page by someone who gives no name or qualifications', flaw: 'the anonymous comment has no known expertise or evidence' },
      { source: 'A detailed magazine article about how much sleep young people need, published fifty years ago', flaw: 'the magazine article is out of date' },
    ],
  },
  {
    question: 'Is the water in the local river safe for swimming this month?',
    best: 'This month’s water-quality test results, published by the city’s environmental health department',
    weak: [
      { source: 'A post on a neighbourhood forum by someone who swam in the river once last week and felt fine', flaw: 'one swimmer’s experience is not evidence about the water' },
      { source: 'An advertisement for a private swimming pool that promises “water cleaner than any river”', flaw: 'the pool company gains if people avoid the river' },
      { source: 'A long news story about pollution in the river, published by the local paper twenty years ago', flaw: 'the news story is far too old to tell us about this month' },
    ],
  },
  {
    question: 'Does a new phone’s battery really last as long as its maker claims?',
    best: 'A test by an independent consumer organization that measured the battery life of ten phones',
    weak: [
      { source: 'The phone maker’s own advertisement, which promises “a full two days of battery on one charge”', flaw: 'the maker profits from the claim' },
      { source: 'A celebrity’s post telling her millions of followers how much she loves the phone', flaw: 'the celebrity has no expertise and gives no measurements' },
      { source: 'A careful review of the previous model of the phone, written by a technology website four years ago', flaw: 'the old review is about a different phone' },
    ],
  },
  {
    question: 'How many people live in your country?',
    best: 'The most recent census figures from the national statistics office',
    weak: [
      { source: 'An estimate printed in a travel guide to the country that was published many years ago', flaw: 'the travel guide is out of date and not an expert source' },
      { source: 'A guess made by a radio host during a call-in show about life in the country', flaw: 'the radio host offers no evidence' },
      { source: 'A real-estate company’s brochure describing the country as “booming”', flaw: 'the real-estate company gains from making the country sound attractive' },
    ],
  },
  {
    question: 'What are the possible side effects of a common medicine?',
    best: 'The information leaflet that comes with the medicine, approved by the national medicines regulator',
    weak: [
      { source: 'A long forum post by someone who took the medicine once and describes how they felt afterwards', flaw: 'one person’s experience is not reliable evidence' },
      { source: 'An advertisement for a rival medicine that claims to cause “none of the usual side effects”', flaw: 'the rival company gains from making the medicine sound bad' },
      { source: 'A friend’s memory of what a doctor once told her about the medicine several years ago', flaw: 'a second-hand memory is easily wrong' },
    ],
  },
  {
    question: 'Which bird species visit the wetlands near your town?',
    best: 'The results of a bird count carried out last spring by a regional naturalists’ society',
    weak: [
      { source: 'A tourism brochure promoting the wetlands as a peaceful holiday destination for birdwatchers', flaw: 'the brochure is written to attract visitors, not to count birds' },
      { source: 'A bird guide for the whole continent, with colour pictures, printed about sixty years ago', flaw: 'the guide is out of date and not about these wetlands' },
      { source: 'A comment under an online photo of the wetlands, posted by someone who gives no name', flaw: 'the comment has no known author or evidence' },
    ],
  },
];

function biasQ(rng: Rng, d: Difficulty) {
  if (d === 1) {
    const l = rng.pick(LOADED);
    const show = (w: string) => l.frame.replace('___', `**${w}**`);
    return {
      prompt: 'Which version of the sentence uses the most **neutral** language?',
      parts: [part(mc(rng, show(l.neutral), l.loaded.map(show)))],
      hints: ['Loaded words carry strong positive or negative feelings. A neutral word simply reports what happened.'],
      solution: [`“${l.neutral}” simply reports what happened.`, `The other words (${l.loaded.map((w) => `“${w}”`).join(', ')}) carry strong feelings that push the reader to judge.`],
    };
  }
  if (d === 2) {
    const b = rng.pick(BIAS_SIGNS);
    return {
      prompt: `${b.scenario}\n\nWhat is the clearest sign of bias?`,
      parts: [part(mc(rng, b.sign, b.wrong))],
      hints: ['Signs of bias include telling only one side, using loaded words, leaving out facts, and having something to gain from persuading the reader.'],
      solution: [b.why],
    };
  }
  const s = rng.pick(SOURCE_QUESTIONS);
  return {
    prompt: `You want to find out: **${s.question}** Which source is the most reliable?`,
    parts: [part(mc(rng, s.best, s.weak.map((w) => w.source)))],
    hints: ['Judge a source by its expertise, its evidence, how recent it is, and its purpose: does it gain from persuading you?'],
    solution: [`“${s.best}” comes from experts, rests on evidence and is up to date.`, `By contrast, ${s.weak.map((w) => w.flaw).join('; ')}.`],
  };
}

const L3 = 'e10-4-3';
const L4 = 'e10-4-4';

export const RHETORIC_SKILLS: SkillDef[] = [
  skill({
    id: 'e10-appeals',
    name: 'Ethos, pathos and logos',
    description: 'Identify appeals to credibility, emotion and logic in speeches and arguments, and choose a sentence that makes a given appeal.',
    outcomes: ['10-D1'],
    lessonId: L3,
    format: 'mc',
    gen: appealQ,
  }),
  skill({
    id: 'e10-rhetorical-devices',
    name: 'Rhetorical devices',
    description: 'Recognize rhetorical questions, repetition, parallelism, tricolon, antithesis, hyperbole and allusion, in everyday persuasion and in famous speeches.',
    outcomes: ['10-D1'],
    lessonId: L3,
    format: 'mc',
    gen: deviceQ,
  }),
  skill({
    id: 'e10-fallacies',
    name: 'Logical fallacies',
    description: 'Recognize ad hominem, bandwagon, false dilemma, hasty generalization, slippery slope, straw man and false-authority arguments, and tell them from sound reasoning.',
    outcomes: ['10-D2'],
    lessonId: L4,
    format: 'mc',
    gen: fallacyQ,
  }),
  skill({
    id: 'e10-bias-sources',
    name: 'Bias and reliable sources',
    description: 'Tell loaded from neutral language, recognize signs of bias, and choose the most reliable source for a question.',
    outcomes: ['10-D2'],
    lessonId: L4,
    format: 'mc',
    gen: biasQ,
  }),
];
