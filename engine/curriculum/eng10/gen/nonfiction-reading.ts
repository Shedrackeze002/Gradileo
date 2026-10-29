/**
 * Grade 10 English, lessons 4.1 and 4.2: Purpose and Audience, Argument and Evidence (10-D1). A
 * text's main purpose and intended audience, the parts of an argument, fact and opinion, and kinds of
 * evidence. Every passage is written for Gradileo except Swift's "A Modest Proposal" (./speeches.ts);
 * the schools, towns, surveys and studies in them are invented.
 */
import { fixedChoice, mc, part, skill } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { block, fill, pair, q } from './common.ts';
import { JS_PROPOSE, SWIFT, intro, speechBlock } from './speeches.ts';

// ============================================================================ lesson 4.1: purpose

type Purpose = 'inform' | 'persuade' | 'entertain' | 'instruct' | 'describe';
const PURPOSES: Purpose[] = ['inform', 'persuade', 'entertain', 'instruct', 'describe'];
const PURPOSE_NAME: Record<Purpose, string> = {
  inform: 'To inform',
  persuade: 'To persuade',
  entertain: 'To entertain',
  instruct: 'To instruct',
  describe: 'To describe',
};
const PURPOSE_WHAT: Record<Purpose, string> = {
  inform: 'a text that informs gives facts so the reader knows or understands something',
  persuade: 'a text that persuades tries to change what the reader thinks or does',
  entertain: 'a text that entertains sets out to amuse, thrill or move the reader, often by telling a story',
  instruct: 'a text that instructs tells the reader how to do something, usually step by step',
  describe: 'a text that describes paints a picture of a person, place or thing in the reader’s mind',
};
/** Purposes too close to each one to offer beside it as a wrong answer. */
const PURPOSE_NEAR: Record<Purpose, Purpose[]> = {
  inform: ['describe'],
  persuade: [],
  entertain: ['describe'],
  instruct: ['inform'],
  describe: ['inform', 'entertain'],
};

const TEXT_TYPES: Record<Purpose, string[]> = {
  inform: [
    'A news report on how many people voted in the city election',
    'An encyclopedia entry on the life cycle of a frog',
    'A museum sign giving the dates and history of an old sailing ship',
    'A school notice listing the dates and rooms of next month’s exams',
    'A weather report for the coming week',
  ],
  persuade: [
    'A letter to the city council urging it to build a skate park',
    'A poster asking students to vote for NAME as class president',
    'A newspaper editorial arguing that the school day should start later',
    'A charity leaflet asking for donations to an animal shelter',
    'A magazine advertisement for a new brand of running shoes',
  ],
  entertain: [
    'A comic strip about a cat who believes he is a dog',
    'A short story about a girl who finds a dragon’s egg in her garden',
    'A collection of jokes about life at school',
    'An adventure novel set on a pirate ship',
  ],
  instruct: [
    'A recipe for banana bread',
    'The guide that comes with a flat-pack bookcase, showing how to put it together',
    'A first-aid card explaining how to treat a minor burn',
    'A manual explaining how to set up a new printer',
  ],
  describe: [
    'A paragraph in a travel journal that captures the sights, sounds and smells of a harbour at dawn',
    'A character sketch that paints a picture of the writer’s grandmother',
    'A paragraph that brings to life the view from the top of a mountain at sunset',
  ],
};

const PURPOSE_PASSAGES: Record<Purpose, string[]> = {
  inform: [
    'Honeybees tell each other where to find flowers with a movement called the waggle dance. The angle of the dance shows the direction of the food, and the length of the dance shows how far away it is.',
    'The public library will be closed on Monday for repairs to its roof. Books due that day may be returned on Tuesday without a fine.',
    'The new light-rail line opens on the first of March. Trains will run every ten minutes between six in the morning and midnight, stopping at eleven stations.',
    'Earth’s moon is about a quarter as wide as Earth itself. It takes roughly 27 days to travel once around our planet.',
  ],
  persuade: [
    'Every year our school throws away thousands of plastic cups. It is time to stop. Bring a reusable bottle, sign the petition at the front office, and help us become the first plastic-free school in the district.',
    'You deserve a weekend without screens. Leave your phone at home, walk the river trail and remember what fresh air feels like. Join us on Saturday at nine.',
    'The old cinema on Station Road is part of our town’s history. If we let it be knocked down to make room for parking, we will lose it forever. Come to Thursday’s council meeting and tell them to save it.',
    'Learning to swim could one day save your life or someone else’s. Sign up for free lessons at the community pool before the places run out.',
  ],
  entertain: [
    'NAME was certain {he} could fix the leaking tap without help. Three hours, two floods and one very wet cat later, {he} phoned the plumber.',
    'NAME had been warned never to open the blue door at the end of the corridor. So, naturally, on {his} first night in the old house, that was exactly what {he} did.',
    'Grandpa insists that the fish he caught last summer was as long as a canoe. Every time he tells the story, the fish gets a little longer.',
    'The robot was supposed to bring NAME a glass of water. Instead, it brought {him} the goldfish, bowl and all, and looked very pleased with itself.',
  ],
  instruct: [
    'First, rinse the rice until the water runs clear. Then add two cups of water for every cup of rice, bring it to the boil and turn the heat down low. Cover the pot and leave it for fifteen minutes.',
    'To plant a seedling, dig a hole twice as wide as its pot. Loosen the roots gently, set the plant in the hole and fill it with soil. Water it well, then press the soil down firmly.',
    'Before you start the quiz, write your name at the top of the page. Answer every question in pencil, and when you have finished, turn the page over and wait quietly.',
    'To reset the router, unplug it from the wall and count to thirty. Plug it back in and wait until all the lights stop flashing before you try to connect again.',
  ],
  describe: [
    'The market at dusk is a swirl of colour. Lanterns sway above stalls piled with mangoes and chillies, smoke curls up from the grills, and the air smells of cinnamon and charcoal.',
    'My grandmother’s kitchen was small and always warm. Copper pots hung above the stove, the window was misty with steam, and a bowl of lemons glowed on the wooden table.',
    'The lake was perfectly still that morning, a sheet of silver under a pale sky. Mist drifted over the water, and the pines on the far shore stood dark and silent.',
    'The old lighthouse leans a little to the left. Its white paint is cracked and peeling, its iron railing is red with rust, and gulls circle its glass dome all day long.',
  ],
};

interface MainPurpose {
  text: string;
  purpose: Purpose;
  /** The secondary purpose a reader might pick. */
  tempting: Purpose;
  why: string;
}
const MAIN_PURPOSES: MainPurpose[] = [
  {
    text: 'An advertisement tells a funny story about a dog who sneaks into the kitchen every night to steal Wagtails biscuits. It ends: “Wagtails: so good, they’re worth the trouble. Buy a bag today.”',
    purpose: 'persuade',
    tempting: 'entertain',
    why: 'The funny story keeps the reader’s attention, but the advertisement exists to make people buy the biscuits.',
  },
  {
    text: 'A newspaper article about last night’s flood describes brown water swirling around parked cars. It goes on to report how many homes were damaged, which roads are closed and where people can find emergency shelter.',
    purpose: 'inform',
    tempting: 'describe',
    why: 'The vivid description sets the scene, but the article’s main job is to give readers the facts they need.',
  },
  {
    text: 'In a blog post, NAME tells the story of getting lost in a city abroad because {he} could not read the signs. {He} ends: “Learn a second language. One day you will be glad you did.”',
    purpose: 'persuade',
    tempting: 'entertain',
    why: 'The story is entertaining, but NAME uses it to convince readers to learn a second language.',
  },
  {
    text: 'A museum audio guide tells the dramatic story of a sailing ship that sank in a storm in 1857, explaining what the divers found when they reached the wreck and what it shows about life at sea at that time.',
    purpose: 'inform',
    tempting: 'entertain',
    why: 'The story is told dramatically, but a museum guide exists to teach visitors about the ship and its history.',
  },
];

function purposeQ(rng: Rng, d: Difficulty) {
  const cast = pair(rng);
  if (d === 3) {
    if (rng.chance(0.3)) {
      return {
        prompt: `${intro(SWIFT, 'writes in a calm, reasonable voice')}\n\n${speechBlock(JS_PROPOSE)}\n\nHe then “proposes” that the poor families of Ireland sell their babies to the rich as food. Swift does not mean this. What is his **real** purpose?`,
        parts: [part(mc(rng, 'To persuade readers, by shocking them, that the poor were being treated cruelly and something had to change', [
          'To instruct readers in how to prepare an unusual meal',
          'To entertain readers with a cheerful story about family life',
          'To inform readers about what people in Ireland ate in 1729',
        ]))],
        hints: ['“A Modest Proposal” is satire: it mocks cruelty by pretending to support an outrageous idea. Ask what Swift wants readers to think once they are shocked.'],
        solution: ['Swift’s proposal is so monstrous that readers are horrified, and that horror is aimed at how cruelly the poor were really being treated.', 'So his real purpose is to persuade, through satire.'],
      };
    }
    const m = rng.pick(MAIN_PURPOSES);
    const others = PURPOSES.filter((p) => p !== m.purpose && p !== m.tempting && !PURPOSE_NEAR[m.purpose].includes(p));
    return {
      prompt: `${fill(m.text, cast)}\n\nWhat is the **main** purpose of this text?`,
      parts: [part(mc(rng, PURPOSE_NAME[m.purpose], [PURPOSE_NAME[m.tempting], ...rng.shuffle(others).map((p) => PURPOSE_NAME[p])]))],
      hints: ['Many texts do more than one thing. Ask what the text is mainly *for*: what does the writer want to happen when the reader finishes?'],
      solution: [fill(m.why, cast), `So the main purpose is ${PURPOSE_NAME[m.purpose].toLowerCase()}.`],
    };
  }
  const purpose = rng.pick(PURPOSES);
  const others = rng.shuffle(PURPOSES.filter((p) => p !== purpose && !PURPOSE_NEAR[purpose].includes(p)));
  const choices = part(mc(rng, PURPOSE_NAME[purpose], others.map((p) => PURPOSE_NAME[p])));
  const hints = ['Ask what the writer wants the reader to do or feel: learn facts, change their mind, enjoy a story, follow steps, or picture something.'];
  if (d === 1) {
    return {
      prompt: `What is the main purpose of this kind of text?\n\n${block(fill(rng.pick(TEXT_TYPES[purpose]), cast))}`,
      parts: [choices],
      hints,
      solution: [`${PURPOSE_WHAT[purpose][0].toUpperCase()}${PURPOSE_WHAT[purpose].slice(1)}.`, `So its purpose is ${PURPOSE_NAME[purpose].toLowerCase()}.`],
    };
  }
  return {
    prompt: `${block(fill(rng.pick(PURPOSE_PASSAGES[purpose]), cast))}\n\nWhat is the main purpose of this passage?`,
    parts: [choices],
    hints,
    solution: [`${PURPOSE_WHAT[purpose][0].toUpperCase()}${PURPOSE_WHAT[purpose].slice(1)}.`, `So the purpose of this passage is ${PURPOSE_NAME[purpose].toLowerCase()}.`],
  };
}

// ============================================================================ lesson 4.1: audience

interface AudienceText {
  text: string;
  audience: string;
  wrong: string[];
  /** For passages: the detail that shows the audience, and details that do not. */
  clue?: { right: string; wrong: string[] };
  why: string;
}
const AUDIENCE_TYPES: AudienceText[] = [
  { text: 'A picture book with large, bright illustrations and rhyming lines such as “The cat in the hat sat on a mat.”', audience: 'Young children', wrong: ['University students', 'Business owners', 'Doctors'], why: 'Short, simple, rhyming words and big pictures are made for children who are just learning to read.' },
  { text: 'A leaflet titled “Your Baby’s First Year”, with advice on feeding, sleep and vaccinations', audience: 'New parents', wrong: ['Teenagers looking for part-time work', 'Retired teachers', 'Tourists'], why: 'Advice on caring for a baby is aimed at the people looking after one.' },
  { text: 'A journal article titled “Treatment of irregular heart rhythms after surgery: a review of 40 clinical trials”', audience: 'Doctors and medical researchers', wrong: ['Young children learning to read', 'Tourists planning a city break', 'Fans of superhero comic books'], why: 'The technical vocabulary and the review of clinical trials show it is written for medical experts.' },
  { text: 'A brochure listing walking tours, museums and restaurants in a city, with a fold-out map and useful phrases in three languages', audience: 'Tourists visiting the city', wrong: ['People who have lived in the city all their lives', 'Builders', 'Young children'], why: 'A map, sights to see and phrases in other languages are what visitors need.' },
  { text: 'A flyer for a free class that teaches how to make video calls, so that grandparents can stay in touch with their grandchildren', audience: 'Older adults', wrong: ['Toddlers', 'Professional video makers', 'University engineering students'], why: 'The class is aimed at grandparents who may be new to video calls.' },
  { text: 'A cover letter listing a person’s work experience, qualifications and reasons for wanting a job', audience: 'An employer', wrong: ['A best friend', 'A younger brother', 'Readers of a comic book'], why: 'A cover letter is written to persuade the person hiring to offer an interview.' },
  { text: 'A poster in a school corridor: “Auditions for the spring musical! Grades 9 to 12, Room 104, after school on Thursday.”', audience: 'High-school students', wrong: ['Parents of babies', 'Retired people', 'Doctors'], why: 'The grades, the room number and the after-school time are details for students at the school.' },
  { text: 'A guide titled “Your First Week at University: Finding Your Way Around Campus”', audience: 'New university students', wrong: ['Young children', 'Retired people', 'Parents of babies'], why: 'A guide to finding your way around campus in the first week is for students who have just arrived.' },
  { text: 'A restaurant menu printed with a maze and a dot-to-dot puzzle, offering meals called “Dino Nuggets” and “Rocket Pasta”', audience: 'Young children', wrong: ['Food critics', 'Business travellers', 'University professors'], why: 'Puzzles and playful meal names are designed for children.' },
  { text: 'A trade magazine article explaining new safety rules for electrical wiring in apartment buildings', audience: 'Electricians and builders', wrong: ['Young children and their parents', 'Tourists visiting the city', 'Fans of comic books'], why: 'Technical safety rules for wiring matter to the people who install it.' },
];
const AUDIENCE_PASSAGES: AudienceText[] = [
  {
    text: 'Ready to level up your summer? Our coding camp is packed with game design, robot battles and pizza Fridays. No experience needed: if you can use a phone, you can build an app. Ages 13 to 17.',
    audience: 'Teenagers',
    wrong: ['Retired people', 'Young children', 'Business owners'],
    clue: { right: '“Ages 13 to 17”', wrong: ['“pizza Fridays”', '“summer”', '“No experience needed”'] },
    why: 'The camp states the age range outright, and its playful language (“level up”, “robot battles”) suits teenagers.',
  },
  {
    text: 'Retiring soon? Our free evening seminar explains how to plan your pension, protect your savings and make the most of your time after work. Refreshments will be served.',
    audience: 'People who are about to retire',
    wrong: ['Primary-school pupils', 'Teenagers looking for summer jobs', 'New university students'],
    clue: { right: '“Retiring soon?”', wrong: ['“Refreshments will be served”', '“evening seminar”', '“free”'] },
    why: 'The opening question speaks directly to people near the end of their working lives, and pensions are their concern.',
  },
  {
    text: 'Little seeds need sun, and little seeds need rain. Watch them grow and grow and grow, then plant some seeds again! Colour in the flowers on the next page.',
    audience: 'Young children',
    wrong: ['Professional gardeners', 'University biology students', 'Farmers'],
    clue: { right: '“Colour in the flowers”', wrong: ['“on the next page”', '“plant some seeds”', '“need rain”'] },
    why: 'Simple rhyming lines and a colouring activity are made for young children.',
  },
  {
    text: 'Attention all residents of Elm Street: the water supply will be turned off between 9 a.m. and 1 p.m. on Wednesday while the main pipe is repaired. Please store enough water for the morning.',
    audience: 'People who live on Elm Street',
    wrong: ['Tourists visiting the city', 'Plumbers in other countries', 'Young children'],
    clue: { right: '“residents of Elm Street”', wrong: ['“between 9 a.m. and 1 p.m.”', '“while the main pipe is repaired”', '“Please store enough water”'] },
    why: 'The notice names exactly who it is for: the residents of one street.',
  },
  {
    text: 'Before your first training session, pack a swimsuit, a towel and goggles. Arrive fifteen minutes early so the coach can see which lane suits your speed, and bring a full water bottle.',
    audience: 'New members of a swimming club',
    wrong: ['People watching a swimming race on television', 'Pool cleaners', 'Parents of babies'],
    clue: { right: '“your first training session”', wrong: ['“a towel and goggles”', '“Arrive fifteen minutes early”', '“bring a full water bottle”'] },
    why: 'The advice is for someone about to go to their first training session, so it is aimed at new members.',
  },
  {
    text: 'Grandparents, are you tired of missing family news? Our free workshop at the community centre shows you, step by step, how to share photos and send messages on a smartphone. Large-print handouts provided.',
    audience: 'Grandparents who are new to smartphones',
    wrong: ['Teenagers who already use smartphones', 'Professional photographers and designers', 'Toddlers and their babysitters'],
    clue: { right: '“Grandparents”', wrong: ['“free workshop”', '“step by step”', '“community centre”'] },
    why: 'The opening speaks directly to grandparents, and the step-by-step help and large print suit people new to smartphones.',
  },
  {
    text: 'Hey, gamers! The Pixel Quest tournament is back, with prizes for the top three teams. Register your squad of four by Friday, and bring your own controller.',
    audience: 'Video game players',
    wrong: ['Retired people', 'Parents of babies', 'Gardeners'],
    clue: { right: '“Hey, gamers!”', wrong: ['“by Friday”', '“prizes”', '“the top three”'] },
    why: 'The notice greets its readers as gamers and asks them to bring a controller.',
  },
];

interface Register {
  situation: string;
  right: string;
  wrong: string[];
}
const REGISTERS: Register[] = [
  {
    situation: 'NAME is writing to the school principal to ask for permission to start a chess club. Which opening is the most appropriate for this audience?',
    right: 'Dear Principal Okafor, I am writing to ask whether a group of students could start a chess club that would meet at lunchtime.',
    wrong: ['Hey Principal Okafor! So me and some friends wanna start a chess club at lunch, sounds cool, right? Let us know asap!!', 'Yo, Principal, we need a room for chess at lunchtime, so can you sort that out for us by Friday or whatever works?', 'Principal Okafor, you need to give us a chess club right away, because lunch is boring and we deserve something better.'],
  },
  {
    situation: 'NAME is emailing the city council to ask for a pedestrian crossing near the school. Which sentence is the most appropriate for this audience?',
    right: 'I would like to request a pedestrian crossing outside Riverside School, where many students cross a busy road each morning.',
    wrong: ['You guys seriously need to put a crossing by Riverside School, it’s crazy out there every single morning, trust me.', 'Crossing. Riverside School. Busy road. Kids everywhere. Sort it out now, thanks, because nobody listens to us.', 'LOL the road by our school is a total nightmare in the mornings, so fix it pls before someone gets hurt, ok?'],
  },
  {
    situation: 'NAME is writing a cover letter for a summer job at a bookshop. Which sentence is the most appropriate for this audience?',
    right: 'I have volunteered at my school library for two years, so I am used to helping readers find the books they need.',
    wrong: ['Books are kinda my thing and I basically live in the library, so honestly you should just hire me, yeah?', 'I really need some money for the summer, so please just give me the job and I promise I will turn up.', 'Ur shop is awesome and I’d totally crush this job, since I read like a hundred books a year lol.'],
  },
  {
    situation: 'NAME is writing to the director of the city museum to suggest a new exhibition. Which sentence is the most appropriate for this audience?',
    right: 'I would like to suggest an exhibition on the history of our city’s river, which many visitors would find interesting.',
    wrong: ['Your museum is kind of boring right now, no offence, so you should probably do something about the river.', 'Do a river show, it would be way better than the old stuff you’ve got in there at the moment, honestly.', 'Hiii! River exhibition?? Think about it!! Everyone I know would totally come, so it’s a win for you!!'],
  },
];

function audienceQ(rng: Rng, d: Difficulty) {
  const cast = pair(rng);
  if (d === 3) {
    const r = rng.pick(REGISTERS);
    return {
      prompt: fill(r.situation, cast),
      parts: [part(mc(rng, r.right, r.wrong))],
      hints: ['A formal audience, such as a principal, a council or an employer, expects complete sentences, polite wording and no slang.'],
      solution: [`“${r.right}” is polite, clear and formal, which suits the audience.`, 'The others use slang, abbreviations or demands that would suit a close friend, if anyone.'],
    };
  }
  if (d === 2) {
    const a = rng.pick(AUDIENCE_PASSAGES);
    return {
      prompt: `${block(a.text)}`,
      parts: [
        part(mc(rng, a.audience, a.wrong), { label: 'Who is the intended audience?' }),
        part(mc(rng, a.clue!.right, a.clue!.wrong), { label: 'Which detail shows the audience most clearly?' }),
      ],
      hints: ['Look at who is addressed, the vocabulary and the topic. Which detail could only be meant for one group of readers?'],
      solution: [a.why],
    };
  }
  const a = rng.pick(AUDIENCE_TYPES);
  return {
    prompt: `Who is the intended audience of this text?\n\n${block(a.text)}`,
    parts: [part(mc(rng, a.audience, a.wrong))],
    hints: ['Ask who would need or enjoy this text. Look at its topic, its vocabulary and how it is presented.'],
    solution: [a.why],
  };
}

// ============================================================================ lesson 4.2: the parts of an argument

type Role = 'claim' | 'reason' | 'evidence' | 'counterclaim' | 'rebuttal';
const ROLES: Role[] = ['claim', 'reason', 'evidence', 'counterclaim', 'rebuttal'];
const ROLE_NAME: Record<Role, string> = { claim: 'Claim', reason: 'Reason', evidence: 'Evidence', counterclaim: 'Counterclaim', rebuttal: 'Rebuttal' };
const ROLE_WHAT: Record<Role, string> = {
  claim: 'the claim is the writer’s main position, the point the whole argument sets out to prove',
  reason: 'a reason explains why the writer holds the claim',
  evidence: 'evidence is the specific facts, numbers, examples or expert opinions that back up a reason',
  counterclaim: 'a counterclaim states an opposing view',
  rebuttal: 'a rebuttal answers the counterclaim and shows why it does not defeat the claim',
};

type Argument = Record<Role, string>;
const ARGUMENTS: Argument[] = [
  {
    claim: 'Our school day should start at 9:30 instead of 8:00.',
    reason: 'Teenagers learn better when they are well rested.',
    evidence: 'When Lakeside Secondary moved its start time to 9:30, attendance rose by 8 percent in a single year.',
    counterclaim: 'Some parents argue that a later start would make it harder for them to get to work on time.',
    rebuttal: 'However, the school could open at 8:00 for supervised reading, so students could still be dropped off early.',
  },
  {
    claim: 'Every school should have a vegetable garden.',
    reason: 'Growing food teaches students where their meals come from.',
    evidence: 'At Hillcrest Secondary, students who worked in the school garden ate twice as many vegetables at lunch as before, according to a survey by the school nurse.',
    counterclaim: 'Critics say a garden takes up space that could be used for sport.',
    rebuttal: 'But a garden needs only a small corner of a field, and many school gardens are built on rooftops or along fences.',
  },
  {
    claim: 'Our town should build protected bike lanes on Main Street.',
    reason: 'Lanes separated from the traffic make cycling safer.',
    evidence: 'In the two years after the town of Riverton added protected lanes, bicycle accidents on its main road fell from 31 to 9.',
    counterclaim: 'Shop owners worry that losing parking spaces will drive their customers away.',
    rebuttal: 'Yet people who cycle past a shop can stop and go in easily, while drivers often give up looking for a parking space.',
  },
  {
    claim: 'The public library should stay open until 10 p.m. on weekdays.',
    reason: 'Many students have nowhere quiet to study at home.',
    evidence: 'In a survey of 300 students at our school, 64 percent said their homes were too noisy for homework.',
    counterclaim: 'Some council members say that longer opening hours would cost too much.',
    rebuttal: 'However, the extra hours could be covered by trained volunteers, as they already are on Saturday afternoons.',
  },
  {
    claim: 'Students should complete twenty hours of community service before they graduate.',
    reason: 'Volunteering helps young people build the skills employers look for.',
    evidence: 'A survey of 150 local employers found that 7 in 10 prefer applicants who have volunteered.',
    counterclaim: 'Opponents argue that students are already too busy with homework and part-time jobs.',
    rebuttal: 'But twenty hours spread over four years of high school is less than half an hour a month.',
  },
  {
    claim: 'The cafeteria should stop selling drinks in plastic bottles.',
    reason: 'Plastic bottles create a huge amount of waste.',
    evidence: 'Last term the cafeteria sold over 4,000 bottled drinks, and the caretaker found most of the empty bottles in the general waste bins.',
    counterclaim: 'Some students say they need bottled drinks because there is nowhere to fill a water bottle.',
    rebuttal: 'That problem is easily solved: the school can install water-refill stations in the cafeteria and the gym.',
  },
  {
    claim: 'Teachers should limit homework to one hour a night.',
    reason: 'Too much homework leaves students no time for rest, family or exercise.',
    evidence: 'In a survey of our Grade 10 classes, students who did more than two hours of homework a night slept, on average, 50 minutes less than their classmates.',
    counterclaim: 'Some teachers argue that less homework would mean less practice and lower marks.',
    rebuttal: 'However, a short, focused hour of practice is often worth more than three hours of work done while tired.',
  },
  {
    claim: 'Every student should begin learning a second language in primary school.',
    reason: 'Young children pick up new sounds and words more easily than older learners.',
    evidence: 'A study of 600 children by a university language centre found that those who began a second language at six had better pronunciation at fifteen than those who began at twelve.',
    counterclaim: 'Some people argue that young children should concentrate on reading and maths first.',
    rebuttal: 'But learning a second language can strengthen reading, because it makes children think about how words and sentences work.',
  },
];

function argumentText(a: Argument): string {
  return ROLES.map((r, i) => `**(${i + 1})** ${a[r]}`).join(' ');
}

function argumentQ(rng: Rng, d: Difficulty) {
  const a = rng.pick(ARGUMENTS);
  const hints = [`Remember: ${ROLE_WHAT.claim}; ${ROLE_WHAT.reason}; ${ROLE_WHAT.evidence}; ${ROLE_WHAT.counterclaim}; ${ROLE_WHAT.rebuttal}.`];
  if (d === 1) {
    return {
      prompt: `${block(argumentText(a))}\n\nWhich sentence states the writer’s **claim**?`,
      parts: [part(mc(rng, a.claim, rng.shuffle([a.reason, a.evidence, a.counterclaim, a.rebuttal]).slice(0, 3)))],
      hints: [`The claim is the writer’s main position: the point everything else supports.`],
      solution: [`“${a.claim}” is the claim: it is the position the whole argument sets out to prove.`, 'The other sentences support it, oppose it or answer the opposition.'],
    };
  }
  const role = d === 2 ? rng.pick<Role>(['claim', 'reason', 'evidence']) : rng.pick<Role>(['evidence', 'counterclaim', 'rebuttal', 'reason']);
  const n = ROLES.indexOf(role) + 1;
  const pool = d === 2 ? ROLES.filter((r) => r !== role && r !== 'rebuttal') : ROLES.filter((r) => r !== role);
  return {
    prompt: `${block(argumentText(a))}\n\nWhat is the role of sentence **(${n})** in this argument?`,
    parts: [part(mc(rng, ROLE_NAME[role], pool.map((r) => ROLE_NAME[r]), { max: d === 3 ? 5 : 4 }))],
    hints,
    solution: [`Sentence (${n}), “${a[role]}”, is the ${role}: ${ROLE_WHAT[role]}.`],
  };
}

// ============================================================================ lesson 4.2: fact, opinion and kinds of evidence

const FACTS = [
  'Water freezes at 0 °C at sea level.',
  'Mount Everest is the highest mountain above sea level.',
  'The human heart has four chambers.',
  'Light travels faster than sound.',
  'Spiders have eight legs.',
  'Our school library has three computers for students to use.',
  'The bus to the city centre leaves every twenty minutes.',
  'The Pacific is the largest ocean on Earth.',
  'Last Saturday’s match ended in a 2–1 win for the home team.',
];
const OPINIONS = [
  'Summer is the most enjoyable season of the year.',
  'Spiders are the creepiest animals on Earth.',
  'The new library building is ugly.',
  'Football is more exciting to watch than tennis.',
  'Everyone should learn to play a musical instrument.',
  'The film’s ending was disappointing.',
  'Pizza is the best food for a party.',
  'Mornings are the best time to study.',
  'The old bridge is the most beautiful sight in the city.',
];

type EvidenceKind = 'statistic' | 'anecdote' | 'expert' | 'example';
const EVIDENCE_NAME: Record<EvidenceKind, string> = { statistic: 'A statistic', anecdote: 'An anecdote', expert: 'Expert testimony', example: 'An example' };
const EVIDENCE_WHAT: Record<EvidenceKind, string> = {
  statistic: 'a statistic is evidence given as numbers or percentages',
  anecdote: 'an anecdote is a short personal story about something that happened to the writer or someone they know',
  expert: 'expert testimony is the opinion or finding of someone with special knowledge of the subject',
  example: 'an example is a specific case that shows the point is true, without being a personal story',
};
/** Kinds too close to offer beside each other. */
const EVIDENCE_NEAR: Record<EvidenceKind, EvidenceKind[]> = { statistic: [], anecdote: ['example'], expert: [], example: ['anecdote'] };

interface EvidenceTopic {
  claim: string;
  statistic: string;
  anecdote: string;
  expert: string;
  example: string;
  /** Difficulty 3: evidence that does not support the claim. */
  opinion: string;
  irrelevant: string;
  vague: string;
}
const EVIDENCE_TOPICS: EvidenceTopic[] = [
  {
    claim: 'Reading for pleasure helps students do better at school.',
    statistic: 'In a survey of 2,000 students, those who read for fun every day scored 15 percent higher on English tests than those who rarely did.',
    anecdote: 'When my cousin started reading a novel every week, her essays improved so much that her teacher asked what had changed.',
    expert: 'Dr. Ruth Mensah, a professor of education who studies how children learn to read, calls daily reading “the single best habit a student can build”.',
    example: 'Lakeside Secondary, for example, added a daily reading period last year, and its English results rose afterwards.',
    opinion: 'Personally, I think that losing yourself in a good novel is far more enjoyable than watching television or scrolling through a phone.',
    irrelevant: 'The school library, which reopened last year after a long renovation, is open from eight in the morning until five in the afternoon.',
    vague: 'Everybody knows that reading is good for you, and people have been saying so for generations, so it must help students in every way.',
  },
  {
    claim: 'Regular exercise improves teenagers’ mood.',
    statistic: 'In a study of 500 teenagers, those who exercised for an hour a day were half as likely to report feeling low.',
    anecdote: 'My brother used to come home grumpy every day, but since he joined the running club he has been far more cheerful.',
    expert: 'Dr. Omar Haddad, a doctor who specializes in teenage health, says that exercise is “one of the most reliable mood boosters we know of”.',
    example: 'Hillcrest Secondary, for example, now starts each day with a short exercise session, and fewer of its students visit the counsellor feeling low.',
    opinion: 'If you ask me, running laps around a track is the most boring way there is to spend an hour, and team sports are far more fun.',
    irrelevant: 'The school gym was painted blue last summer, and new lights were fitted above the basketball court in time for the autumn term.',
    vague: 'Exercise is good for all kinds of things, as everyone has always said, so it is bound to be good for teenagers’ feelings as well.',
  },
  {
    claim: 'Planting trees helps keep cities cool in summer.',
    statistic: 'Measurements across one city found that streets lined with trees were up to 4 °C cooler on hot afternoons than streets without them.',
    anecdote: 'Last July, my family moved from a bare street to one with big oak trees, and our home stayed noticeably cooler.',
    expert: 'Professor Mei Tanaka, a climate scientist who studies cities, explains that trees cool the air “by shading the ground and releasing water from their leaves”.',
    example: 'The town of Riverton, for example, lined its main streets with trees, and those streets are now the coolest places in town on hot afternoons.',
    opinion: 'In my opinion, a tall oak in full summer leaf is the most beautiful sight in the world, far lovelier than anything a city could build.',
    irrelevant: 'Many cities have a large park with a playground, a pond and a café, where families like to spend their weekends when the weather is good.',
    vague: 'Trees are nice to have around, and most people would agree that a city with more green in it is simply a better place to live in.',
  },
  {
    claim: 'Learning a musical instrument improves concentration.',
    statistic: 'A study of 300 pupils found that those who had played an instrument for two years scored 20 percent higher on concentration tests.',
    anecdote: 'Since I started piano lessons, I have found it much easier to focus on my homework for an hour at a time.',
    expert: 'Dr. Daniel Osei, a psychologist who studies music and the brain, says that practising an instrument “trains the brain to hold attention”.',
    example: 'Lakeside Primary, for example, teaches every pupil an instrument, and its pupils now concentrate for longer in other lessons.',
    opinion: 'I have always thought that the guitar is the coolest instrument to play, and anyone who learns it will be the most popular person in class.',
    irrelevant: 'A new music shop opened in the town centre last month, selling guitars, keyboards and drums, and it stays open late on Fridays and Saturdays.',
    vague: 'Music makes everything better, and so many people love it that it must surely help with concentration and lots of other things too.',
  },
  {
    claim: 'Walking or cycling to school is good for students.',
    statistic: 'A survey of 1,200 students found that those who walked or cycled to school were 30 percent more likely to meet daily exercise guidelines.',
    anecdote: 'My neighbour started cycling to school in September, and he says he arrives awake and ready to learn.',
    expert: 'Ines Garcia, a public-health nurse who works with schools, says that a walk to school “gives students exercise before the first bell”.',
    example: 'Riverton High, for example, closed the road by its gates so students could walk in safely, and they now arrive more alert for the first lesson.',
    opinion: 'Bicycles are far more fun than cars, and in my opinion anyone who gets a lift to school when they could ride a bike is really missing out.',
    irrelevant: 'The school car park has forty spaces for staff and visitors, and it was resurfaced and given new white lines during the summer holidays.',
    vague: 'Walking is great and everyone should do it, because it is just good for people in general, as everybody already knows perfectly well.',
  },
];

function evidenceQ(rng: Rng, d: Difficulty) {
  if (d === 1) {
    if (rng.chance(0.5)) {
      const isFact = rng.chance(0.5);
      const s = rng.pick(isFact ? FACTS : OPINIONS);
      return {
        prompt: `Is this statement a fact or an opinion?\n\n${block(s)}`,
        parts: [part(fixedChoice(['Fact', 'Opinion'], isFact ? 0 : 1))],
        hints: ['A fact can be checked and proved true or false. An opinion is a judgment or feeling that people can disagree about.'],
        solution: [isFact ? 'This can be checked against a reliable source or measurement, so it is a fact.' : 'This is a judgment that people could reasonably disagree with, so it is an opinion.'],
      };
    }
    const wantFact = rng.chance(0.5);
    const right = rng.pick(wantFact ? FACTS : OPINIONS);
    const wrong = rng.sample(wantFact ? OPINIONS : FACTS, 3);
    return {
      prompt: `Which statement is ${wantFact ? 'a **fact**' : 'an **opinion**'}?`,
      parts: [part(mc(rng, right, wrong))],
      hints: ['A fact can be checked and proved true or false. An opinion is a judgment or feeling that people can disagree about.'],
      solution: [wantFact ? `“${right}” can be checked, so it is a fact; the others are judgments people could disagree with.` : `“${right}” is a judgment people could disagree with, so it is an opinion; the others can be checked.`],
    };
  }
  const t = rng.pick(EVIDENCE_TOPICS);
  if (d === 3) {
    const kind = rng.pick<EvidenceKind>(['statistic', 'expert', 'example']);
    return {
      prompt: `A writer makes this claim:\n\n${block(t.claim)}\n\nWhich piece of evidence best supports it?`,
      parts: [part(mc(rng, t[kind], [t.opinion, t.irrelevant, t.vague]))],
      hints: ['Good evidence is relevant to the claim, specific, and can be checked. An opinion or a vague statement proves nothing.'],
      solution: [`${q(t[kind])} is specific, relevant evidence that backs up the claim.`, 'One of the other choices is only an opinion, one is beside the point, and one is too vague to prove anything.'],
    };
  }
  const kind = rng.pick<EvidenceKind>(['statistic', 'anecdote', 'expert', 'example']);
  const others = (Object.keys(EVIDENCE_NAME) as EvidenceKind[]).filter((k) => k !== kind && !EVIDENCE_NEAR[kind].includes(k));
  return {
    prompt: `A writer claims that ${t.claim[0].toLowerCase()}${t.claim.slice(1, -1)}. As evidence, the writer says:\n\n${block(t[kind])}\n\nWhat kind of evidence is this?`,
    parts: [part(mc(rng, EVIDENCE_NAME[kind], others.map((k) => EVIDENCE_NAME[k])))],
    hints: ['Numbers point to a statistic; a personal story to an anecdote; a named person with special knowledge to expert testimony; a specific case that is not a personal story to an example.'],
    solution: [`This is ${EVIDENCE_NAME[kind].toLowerCase()}: ${EVIDENCE_WHAT[kind]}.`],
  };
}

const L1 = 'e10-4-1';
const L2 = 'e10-4-2';

export const READING_SKILLS: SkillDef[] = [
  skill({
    id: 'e10-purpose',
    name: 'Purpose of a text',
    description: 'Identify a text’s main purpose: to inform, persuade, entertain, instruct or describe, even when it does more than one thing.',
    outcomes: ['10-D1'],
    lessonId: L1,
    format: 'mc',
    gen: purposeQ,
  }),
  skill({
    id: 'e10-audience',
    name: 'Audience of a text',
    description: 'Identify a text’s intended audience from its content, vocabulary and register, and choose the register that suits an audience.',
    outcomes: ['10-D1'],
    lessonId: L1,
    format: 'mc',
    gen: audienceQ,
  }),
  skill({
    id: 'e10-argument-parts',
    name: 'Parts of an argument',
    description: 'Find the claim, reasons, evidence, counterclaim and rebuttal in an argument.',
    outcomes: ['10-D1'],
    lessonId: L2,
    format: 'mc',
    gen: argumentQ,
  }),
  skill({
    id: 'e10-evidence-types',
    name: 'Fact, opinion and evidence',
    description: 'Tell fact from opinion, name kinds of evidence, and choose the evidence that best supports a claim.',
    outcomes: ['10-D1'],
    lessonId: L2,
    format: 'mc',
    gen: evidenceQ,
  }),
];
