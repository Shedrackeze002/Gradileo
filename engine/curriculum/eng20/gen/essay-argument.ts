/**
 * Grade 11 English, lessons 4.3 and 4.4: Satire; Evaluating Arguments (11-D1, 11-D2). The target and
 * tools of satire (verbal irony, exaggeration, understatement, parody and mock seriousness), subtler
 * fallacies (post hoc, circular reasoning, red herring, false analogy and appeal to tradition, with
 * Grade 10's at difficulty 3), and the quality of evidence: relevance, sample size, representative
 * samples, and correlation against causation. Quoted satire comes from public-domain essays
 * (./essays.ts); every other passage, person, survey and organization is invented for Gradileo.
 */
import { fixedChoice, mc, part, skill } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { block, fill, pair, q } from '../../eng10/gen/common.ts';
import { LE_DEAD, LE_JIGGINS, LE_MANIA, MP_FOOD, MP_LANDLORDS, MP_MELANCHOLY, WP_OPENING, WP_PRAYER, essayBlock, lead, type Excerpt } from './essays.ts';

// ============================================================================ lesson 4.3: satire

type Tool = 'irony' | 'exaggeration' | 'understatement' | 'parody' | 'mock';
const TOOLS: Tool[] = ['irony', 'exaggeration', 'understatement', 'parody', 'mock'];
const TOOL_NAME: Record<Tool, string> = {
  irony: 'Verbal irony',
  exaggeration: 'Exaggeration',
  understatement: 'Understatement',
  parody: 'Parody',
  mock: 'Mock seriousness',
};
const TOOL_WHAT: Record<Tool, string> = {
  irony: 'verbal irony says the opposite of what the writer means, often as mock praise',
  exaggeration: 'exaggeration stretches a fault until it becomes absurd',
  understatement: 'understatement describes something serious as if it were minor',
  parody: 'parody imitates the style of a recognizable kind of text, such as a fairy tale, a recipe or a documentary, in order to mock its subject',
  mock: 'mock seriousness treats something trivial or absurd in a grave, formal, solemn manner',
};

interface SatireExample {
  text: string;
  tool: Tool;
  /** Tools that could also be argued for this passage, so they are never offered as wrong answers. */
  also: Tool[];
  target: string;
}
const SATIRE: SatireExample[] = [
  // exaggeration
  { text: 'The new homework rules are so strict that students now need a signed permission slip to blink during maths.', tool: 'exaggeration', also: [], target: 'A school’s overly strict rules' },
  { text: 'The latest phone update added so many features that the phone now needs a second phone to run them.', tool: 'exaggeration', also: [], target: 'Technology companies that pile on features nobody needs' },
  { text: 'The meeting about reducing meetings went on so long that three new committees were formed during the coffee break.', tool: 'exaggeration', also: ['irony'], target: 'Pointless office bureaucracy' },
  { text: 'Cereal adverts now promise that a single bowl will make you faster, cleverer, taller and unbeatable at chess.', tool: 'exaggeration', also: [], target: 'Exaggerated claims in food advertising' },
  { text: 'The town’s new car park is so enormous that residents now need a car to get from one end of it to the other.', tool: 'exaggeration', also: [], target: 'Planning that puts cars before people' },
  // understatement
  { text: 'The flood that swept away half the village was, according to the council’s report, “a moderate inconvenience to residents.”', tool: 'understatement', also: ['irony'], target: 'Officials who play down disasters' },
  { text: 'After the company’s factory poisoned the river for ten years, its chief executive admitted that things had been “not ideal.”', tool: 'understatement', also: ['irony'], target: 'Companies that play down the damage they cause' },
  { text: 'The new airport, built on a swamp, has sunk two metres since it opened, which officials describe as “a small adjustment period.”', tool: 'understatement', also: ['irony'], target: 'Officials who excuse costly failures' },
  { text: 'The bridge collapsed into the river on the morning it opened, giving the engineers, as the mayor put it, “a few things to think about.”', tool: 'understatement', also: ['irony'], target: 'Leaders who refuse to admit serious mistakes' },
  // verbal irony
  { text: 'What a brilliant idea it was to hold the outdoor music festival in the middle of the rainy season.', tool: 'irony', also: [], target: 'The festival organizers’ poor planning' },
  { text: 'Thank you, dear landlord, for so generously raising our rent for the third time this year.', tool: 'irony', also: [], target: 'Landlords who keep raising the rent' },
  { text: 'How wonderful that the new car park was built where the town’s only playground used to be.', tool: 'irony', also: [], target: 'Councils that put cars before children' },
  { text: 'Our thoughtful leader has kindly protected us from the danger of free speech by closing every newspaper in the country.', tool: 'irony', also: [], target: 'Leaders who silence the press' },
  { text: 'Congratulations to the cinema on its brave new policy of charging extra for seats that face the screen.', tool: 'irony', also: ['exaggeration'], target: 'Businesses that invent extra charges' },
  // parody
  { text: 'An article written in the style of a nature documentary describes shoppers on the first day of a sale: “Here we see the bargain hunter, a fierce creature, defending its territory near the discount racks.”', tool: 'parody', also: ['mock', 'exaggeration'], target: 'Shoppers’ frenzy during sales' },
  { text: 'A “fairy tale” in a student magazine begins: “Once upon a time, in a land of endless forms, there lived a committee that had never once made a decision.”', tool: 'parody', also: [], target: 'Slow, indecisive committees' },
  { text: 'A newspaper column prints a “recipe” for a successful political speech: two cups of promises, a pinch of facts, and plenty of applause.', tool: 'parody', also: [], target: 'Empty political speeches' },
  { text: 'A mock instruction manual for a new phone includes the step: “Step 7: Agree to the 400-page terms and conditions without reading them, like everyone else.”', tool: 'parody', also: ['irony'], target: 'Long terms and conditions that nobody reads' },
  { text: 'A student magazine prints a fake weather forecast for the exam season: “Heavy showers of panic expected by Tuesday, clearing to scattered regret by Friday.”', tool: 'parody', also: [], target: 'The stress of the exam season' },
  // mock seriousness
  { text: 'With deep regret, the school board announces that, after eighteen months of careful study, it has decided that the lunch queue will now form on the left instead of the right.', tool: 'mock', also: [], target: 'School boards that waste time on trivial matters' },
  { text: 'Scientists at the National Institute of Obvious Facts have confirmed, after a ten-year study costing millions, that water is wet.', tool: 'mock', also: ['exaggeration', 'parody'], target: 'Research that wastes money proving what everyone already knows' },
  { text: 'In solemn, formal language, a columnist reports that a neighbour’s hedge has grown two centimetres over the fence, and calls on the government to “consider its response with the utmost gravity.”', tool: 'mock', also: ['exaggeration'], target: 'People who turn trivial quarrels into great disputes' },
  { text: 'The council announces, with a brass band and a long speech about “this historic day”, the opening of a single new bench.', tool: 'mock', also: ['exaggeration'], target: 'Councils that make a show of doing very little' },
];

interface PdTarget {
  excerpt: Excerpt;
  context: string;
  right: string;
  wrong: [string, string, string];
  why: string;
}
const PD_TARGETS: PdTarget[] = [
  {
    excerpt: MP_FOOD,
    context: 'Swift wrote during a famine in Ireland, when many Irish families were starving while their landlords lived in comfort.',
    right: 'The wealthy landlords and rulers who let Ireland’s poor starve',
    wrong: ['Irish mothers who beg in the streets with their children', 'Americans living in London who know about cooking', 'Cooks who make poor stews and serve them to their families'],
    why: 'Swift pretends to treat poor children as food for the rich. The horror is aimed at the people whose greed and indifference already treated the poor as worthless.',
  },
  {
    excerpt: MP_LANDLORDS,
    context: 'Swift wrote during a famine in Ireland, when many Irish families were starving while their landlords lived in comfort.',
    right: 'Landlords who have already ruined the poor families who rent from them',
    wrong: ['Poor parents who cannot find enough food to feed their children', 'Butchers who charge their customers far too much for meat', 'Children who eat far too much and leave their parents hungry'],
    why: 'The joke that landlords have “devoured most of the parents” accuses them of already consuming the poor through rents and greed.',
  },
  {
    excerpt: MP_MELANCHOLY,
    context: 'This is the opening of an essay that goes on to propose, calmly, that the children of the poor be sold as food for the rich.',
    right: 'A society that treats the starving poor as a problem, not as people',
    wrong: ['People who give money to the beggars they pass in the street', 'Children who play in the streets instead of going to school', 'Travellers who visit the countryside to admire its scenery'],
    why: 'The essay begins with real suffering, then turns its sympathy into a cold “solution”, which mocks the way the powerful talked about the poor.',
  },
  {
    excerpt: WP_PRAYER,
    context: 'In “The War Prayer”, a stranger interrupts a church service and speaks aloud the unspoken part of the congregation’s prayer for victory.',
    right: 'People who pray for victory without thinking of the suffering it brings',
    wrong: ['Soldiers who refuse to fight when their country calls them to war', 'People who never go to church, even on the most important days', 'The enemy’s generals, who are leading their army against the town'],
    why: 'The stranger shows what a prayer for victory also asks for: the enemy’s death and grief. The target is the congregation’s thoughtless patriotism.',
  },
  {
    excerpt: WP_OPENING,
    context: 'This is the opening of “The War Prayer”, which goes on to reveal what a prayer for victory in war really asks for.',
    right: 'The excited, unthinking patriotism that cheers a war on',
    wrong: ['Children who play with toy pistols in the streets', 'Bands that play much too loudly at public events', 'People who dislike fireworks and complain about noise'],
    why: 'The drums, bands, “holy fire of patriotism” and firecrackers present war as a festival, the mood the story goes on to expose.',
  },
  {
    excerpt: LE_JIGGINS,
    context: 'This is the opening of Leacock’s “How to Live to Be 200”, which follows Jiggins’s health habits to an early death.',
    right: 'People obsessed with fashionable health habits',
    wrong: ['People who refuse to do any exercise at all', 'Doctors who will not treat their patients', 'Shopkeepers who sell sponges and soap'],
    why: 'Jiggins’s solemn rituals for opening and shutting his pores make health fads look absurd.',
  },
  {
    excerpt: LE_DEAD,
    context: 'Leacock’s Jiggins spent his life on strict health routines and heavy exercise with dumb-bells.',
    right: 'The fashion for extreme health and fitness routines',
    wrong: ['Doctors who neglect the patients in their care', 'Young men who never take any exercise at all', 'People who write long books about history'],
    why: 'The flat report that Jiggins “dumb-belled himself to death”, while others still follow him, mocks the craze that killed him.',
  },
  {
    excerpt: LE_MANIA,
    context: 'In “How to Live to Be 200”, Leacock describes the young men who follow Jiggins’s example.',
    right: 'People who follow health fads without thinking',
    wrong: ['Farmers who grow fruit and sell it at market', 'Scientists who study nitrogen in their laboratories', 'People who enjoy eating meat at every meal'],
    why: 'Reasons that cancel each other out (meat has too much nitrogen, fruit has none) show the fad-followers have stopped thinking.',
  },
];

function satireQ(rng: Rng, d: Difficulty) {
  if (d === 3 && rng.chance(0.5)) {
    const p = rng.pick(PD_TARGETS);
    return {
      prompt: `${lead(p.excerpt.essay)}\n\n${essayBlock(p.excerpt)}\n\n${p.context} What is the **target** of the satire?`,
      parts: [part(mc(rng, p.right, p.wrong))],
      hints: ['The target is the person, group or idea the satire criticizes, which is not always the thing the words seem to be about. Ask whom the writer wants readers to judge.'],
      solution: [p.why, `So the target is: ${p.right.charAt(0).toLowerCase()}${p.right.slice(1)}.`],
    };
  }
  const s = rng.pick(SATIRE);
  if (d === 1) {
    const wrong = rng.sample(SATIRE.filter((x) => x.target !== s.target && x.tool !== s.tool), 3).map((x) => x.target);
    return {
      prompt: `${block(s.text)}\n\nWhat is the **target** of this satire?`,
      parts: [part(mc(rng, s.target, wrong))],
      hints: ['The target is the person, group or practice the satire is criticizing.'],
      solution: [`The satire makes fun of ${s.target.charAt(0).toLowerCase()}${s.target.slice(1)}.`],
    };
  }
  const options = TOOLS.filter((t) => t !== s.tool && !s.also.includes(t));
  const wrong = rng.shuffle(options).slice(0, 3);
  return {
    prompt: `${block(s.text)}\n\nWhich tool of satire does this passage **mainly** use?`,
    parts: [part(mc(rng, TOOL_NAME[s.tool], wrong.map((t) => TOOL_NAME[t])))],
    hints: ['Ask how the passage makes its target look foolish: by saying the opposite, stretching a fault, shrinking a disaster, imitating a kind of text, or treating something silly with great solemnity?'],
    solution: [`The passage mainly uses ${TOOL_NAME[s.tool].toLowerCase()}: ${TOOL_WHAT[s.tool]}.`, `Its target is ${s.target.charAt(0).toLowerCase()}${s.target.slice(1)}.`],
  };
}

// ============================================================================ lesson 4.4: fallacies

type Fallacy = 'post-hoc' | 'circular' | 'red-herring' | 'false-analogy' | 'tradition'
  | 'ad-hominem' | 'bandwagon' | 'false-dilemma' | 'hasty' | 'slippery' | 'straw-man';
const NEW_FALLACIES: Fallacy[] = ['post-hoc', 'circular', 'red-herring', 'false-analogy', 'tradition'];
const OLD_FALLACIES: Fallacy[] = ['ad-hominem', 'bandwagon', 'false-dilemma', 'hasty', 'slippery', 'straw-man'];
const FALLACY_NAME: Record<Fallacy, string> = {
  'post-hoc': 'Post hoc (false cause)',
  circular: 'Circular reasoning',
  'red-herring': 'Red herring',
  'false-analogy': 'False analogy',
  tradition: 'Appeal to tradition',
  'ad-hominem': 'Ad hominem',
  bandwagon: 'Bandwagon',
  'false-dilemma': 'False dilemma',
  hasty: 'Hasty generalization',
  slippery: 'Slippery slope',
  'straw-man': 'Straw man',
};
/** The name with an article, for use in a sentence: “a red herring”. */
const FALLACY_A: Record<Fallacy, string> = {
  'post-hoc': 'post hoc reasoning (false cause)',
  circular: 'circular reasoning',
  'red-herring': 'a red herring',
  'false-analogy': 'a false analogy',
  tradition: 'an appeal to tradition',
  'ad-hominem': 'an ad hominem argument',
  bandwagon: 'a bandwagon argument',
  'false-dilemma': 'a false dilemma',
  hasty: 'a hasty generalization',
  slippery: 'a slippery slope',
  'straw-man': 'a straw man',
};
const FALLACY_WHAT: Record<Fallacy, string> = {
  'post-hoc': 'post hoc reasoning assumes that because one thing happened after another, the first caused the second',
  circular: 'circular reasoning uses its conclusion as its own evidence, so it goes round in a circle',
  'red-herring': 'a red herring changes the subject to something irrelevant, drawing attention away from the real issue',
  'false-analogy': 'a false analogy compares two things that are not alike in the way that matters to the argument',
  tradition: 'an appeal to tradition claims that something is right because it has always been done that way',
  'ad-hominem': 'an ad hominem argument attacks the person instead of the argument',
  bandwagon: 'a bandwagon argument says something is right because many people believe or do it',
  'false-dilemma': 'a false dilemma offers only two choices when there are others',
  hasty: 'a hasty generalization draws a broad conclusion from too few examples',
  slippery: 'a slippery slope claims, without evidence, that one step will lead to a chain of disasters',
  'straw-man': 'a straw man twists the other side’s view into a weaker or more extreme one, then attacks that',
};
/** Fallacies that easily overlap, so they are never offered against each other. */
const CLASH: Partial<Record<Fallacy, Fallacy[]>> = {
  'post-hoc': ['hasty'],
  hasty: ['post-hoc'],
  tradition: ['bandwagon'],
  bandwagon: ['tradition'],
  'red-herring': ['straw-man'],
  'straw-man': ['red-herring'],
};
const FALLACIES: Record<Fallacy, string[]> = {
  'post-hoc': [
    'Ever since the new mayor took office, it has rained every weekend, so the mayor must be bringing the bad weather.',
    'I wore my green socks on the day I passed my driving test, so the socks must have helped me pass.',
    'The school painted its classrooms blue in September, and marks rose in December, so the blue paint must have made students cleverer.',
    'NAME started drinking a new herbal tea, and a week later {his} cold was gone, so the tea must have cured it.',
    'Sales at the bakery fell the month after it changed its logo, so the new logo must have driven customers away.',
  ],
  circular: [
    'This website is trustworthy, because it says on its home page that it is trustworthy.',
    'NAME is the best player on the team, because nobody on the team plays better than {he} does.',
    'The novel is a classic because it is one of the great classic novels.',
    'We know the rule is fair because it is a rule, and the rules here are fair.',
    'The film was popular because so many people liked it.',
  ],
  'red-herring': [
    'Why worry about pollution from the factory when there are so many potholes in our roads?',
    'Asked why the new stadium went over budget, the councillor replied: “Our fans are the most loyal in the country, and they deserve a great place to watch.”',
    'Critics say the new phone’s battery dies too quickly, but the company points out that it comes in six beautiful colours.',
    'Yes, the restaurant failed its hygiene inspection, but its owner gives a great deal of money to local charities.',
    'When asked why the bus service was cut, the minister talked for ten minutes about the new trains planned for the capital.',
  ],
  'false-analogy': [
    'Students should be allowed to use their notes in exams; after all, surgeons look at X-rays while they operate.',
    'Employees are like nails: you have to hit them on the head to make them work.',
    'A school is like a shop, so the students whose parents pay the most should get the best marks.',
    'Learning to drive is like riding a bicycle, so anyone who can ride a bike should be allowed to drive without lessons.',
    'A country is like a ship, so its leader, like a captain, should never have to listen to anyone else.',
  ],
  tradition: [
    'We have always held the school dance in the gym, so it would be wrong to hold it anywhere else.',
    'This town has never had a bike lane, so there is no reason to build one now.',
    'Exams have been written with pen and paper for centuries, so they should never be taken on computers.',
    'The club has always been for boys only, so girls should not be allowed to join.',
    'Our family has always opened presents on Christmas Eve, so that must be the correct day to open them.',
  ],
  'ad-hominem': [
    'NAME’s argument for a longer lunch break can be ignored, because {he} is always late to class.',
    'Don’t listen to NAME’s plan to save the river; {he} once failed a geography test.',
  ],
  bandwagon: [
    'Everyone in our class has signed the petition, so it must be a good idea.',
    'Millions of people have downloaded this diet app, so it must work.',
  ],
  'false-dilemma': [
    'Either we cancel the school trip, or we accept that someone will get lost.',
    'You either support every one of the coach’s decisions, or you don’t care about the team.',
  ],
  hasty: [
    'The two students I met from that school were rude, so all its students must be rude.',
    'My first two attempts at baking failed, so I will never be able to bake.',
  ],
  slippery: [
    'If we let students choose their own seats, soon they will choose their own lessons, and then they will stop coming to school at all.',
    'If the town allows one food truck on Main Street, soon the restaurants will close and the whole town centre will die.',
  ],
  'straw-man': [
    'NAME wants fewer tests, so {he} obviously thinks students should never be assessed at all.',
    'NAME suggests closing Main Street to cars for one Sunday a month; apparently {he} wants to ban cars from the whole town.',
  ],
};
const SOUND = [
  'The bridge has failed two safety inspections this year, so the engineers have recommended closing it for repairs.',
  'Our team has lost its last three matches by conceding goals from corners, so we should practise defending corners this week.',
  'Five independent studies with thousands of patients found that the medicine lowers blood pressure, so doctors are right to prescribe it for high blood pressure.',
];

function fallacyQ(rng: Rng, d: Difficulty) {
  const cast = pair(rng);
  const want = rng.pick(NEW_FALLACIES);
  const pool = (d === 3 ? [...NEW_FALLACIES, ...OLD_FALLACIES] : NEW_FALLACIES).filter((f) => f !== want && !(CLASH[want] ?? []).includes(f));
  if (d === 3 && rng.chance(0.3)) {
    const sound = rng.pick(SOUND);
    const kinds = rng.sample(NEW_FALLACIES, 3);
    return {
      prompt: 'Three of these arguments contain a logical fallacy. Which argument is **reasonable**?',
      parts: [part(mc(rng, sound, kinds.map((f) => fill(rng.pick(FALLACIES[f]), cast))))],
      hints: ['A reasonable argument draws a sensible conclusion from relevant, sufficient evidence. Check each of the others for a flaw in the reasoning.'],
      solution: [`“${sound}” is reasonable: its conclusion follows from relevant evidence.`, 'Each of the others contains a fallacy.'],
    };
  }
  if (d >= 2 && rng.chance(0.5)) {
    const right = fill(rng.pick(FALLACIES[want]), cast);
    // The wrong arguments may not overlap with the fallacy asked for.
    const wrong = rng.shuffle(pool).slice(0, 3).map((f) => fill(rng.pick(FALLACIES[f]), cast));
    return {
      prompt: `Which argument is an example of **${FALLACY_A[want]}**?`,
      parts: [part(mc(rng, right, wrong))],
      hints: [`Remember: ${FALLACY_WHAT[want]}.`],
      solution: [`${q(right)}: ${FALLACY_WHAT[want]}.`, 'Each of the other arguments contains a different fallacy.'],
    };
  }
  const text = fill(rng.pick(FALLACIES[want]), cast);
  const wrong = rng.shuffle(pool).slice(0, 3);
  return {
    prompt: `Which logical fallacy does this argument contain?\n\n${block(text)}`,
    parts: [part(mc(rng, FALLACY_NAME[want], wrong.map((f) => FALLACY_NAME[f])))],
    hints: ['Ask where the reasoning goes wrong: a cause assumed from timing, a conclusion used as its own proof, a change of subject, a comparison that does not hold, or “we have always done it this way”?'],
    solution: [`This is ${FALLACY_A[want]}: ${FALLACY_WHAT[want]}.`],
  };
}

// ============================================================================ lesson 4.4: quality of evidence

type Weakness = 'irrelevant' | 'small' | 'unrepresentative' | 'correlation' | 'strong';
const WEAK_CHOICE: Record<Weakness, string> = {
  irrelevant: 'It is not relevant to the claim it is meant to support.',
  small: 'The sample is too small to support the claim it is used for.',
  unrepresentative: 'The sample does not represent the group the claim is about.',
  correlation: 'It shows that two things go together, not that one causes the other.',
  strong: 'Nothing: it is relevant, sufficient and representative.',
};
const WEAK_WHY: Record<Weakness, string> = {
  irrelevant: 'the evidence, even if true, says nothing about the claim',
  small: 'a handful of cases, however fairly chosen, is too few to support a general claim',
  unrepresentative: 'the people or things studied are not typical of the whole group the claim is about, so the result is biased',
  correlation: 'two things can rise and fall together because of a third cause, or by chance, without one causing the other',
  strong: 'the evidence is relevant, comes from a large and fairly chosen sample, and supports exactly what is claimed',
};
const EVIDENCE: Record<Weakness, Array<[string, string]>> = {
  irrelevant: [
    ['The new playground is safe for small children.', 'Its bright colours won a design award.'],
    ['NAME would make a good mayor.', '{He} can run a marathon in under three hours.'],
    ['The bridge is strong enough for heavy lorries.', 'It is the most photographed bridge in the region.'],
    ['The restaurant’s food is healthy.', 'The restaurant has been open for fifty years.'],
    ['This laptop is the best choice for students.', 'Its advertisement won a prize for the best music.'],
  ],
  small: [
    ['The new fertilizer makes tomato plants grow taller.', 'Of the two plants given the fertilizer, both grew taller than the two plants without it.'],
    ['Most students at the school prefer online homework.', 'Three students, chosen at random from the school’s 1,200, said they prefer it.'],
    ['The new medicine cures headaches.', 'One patient who took it said her headache went away.'],
    ['This brand of light bulb lasts longer than any other.', 'A shop tested one bulb of each brand, and this brand’s bulb lasted longest.'],
    ['The town’s new bus route is always on time.', 'NAME rode it twice last week and it was on time both times.'],
  ],
  unrepresentative: [
    ['Most people in the city want more bike lanes.', 'In a survey of 2,000 members of the city’s cycling club, 95% said they want more bike lanes.'],
    ['Teenagers in this country spend little time on their phones.', 'A survey of 500 teenagers at a summer camp where phones are banned found they used them less than ten minutes a day.'],
    ['Most of the town supports keeping the golf course.', '800 people interviewed at the golf club last weekend said the course should stay.'],
    ['Students love the school’s new lunch menu.', 'The menu’s designer asked 300 students waiting in the queue for second helpings, and 90% of them said they love it.'],
    ['Most adults in the country read a book every week.', 'An online poll of 3,000 members of a national book club found that they do.'],
  ],
  correlation: [
    ['Owning a dog makes people live longer.', 'In a large study, dog owners lived, on average, two years longer than people without dogs.'],
    ['Eating breakfast causes higher marks.', 'Across 4,000 students, those who ate breakfast scored higher on average.'],
    ['Eating ice cream causes sunburn.', 'In months when ice-cream sales rise, cases of sunburn rise too.'],
    ['Playing chess makes children better at maths.', 'Children in the chess club have higher maths marks than other children.'],
    ['Sending more firefighters to a fire causes more damage.', 'Fires with more firefighters present do more damage.'],
  ],
  strong: [
    ['There have been fewer accidents on Station Road since the new crossing was built.', 'Police records show 14 accidents at the spot in the three years before the crossing was built, and 2 in the three years since.'],
    ['Most students at the school want a later start to the day.', 'All 1,200 students were invited to vote anonymously; 1,050 voted, and 72% chose the later start.'],
    ['The new vaccine lowers the chance of catching the illness.', 'In a trial, 20,000 volunteers were randomly given either the vaccine or a dummy injection, and those given the vaccine caught the illness far less often.'],
  ],
};
/** Claims with one strong and three weak pieces of evidence, for “which supports it best?”. */
const BEST_EVIDENCE: Array<{ claim: string; strong: string; weak: [string, string, string] }> = [
  {
    claim: 'Most students at our school would use the library if it stayed open until 6:00 p.m.',
    strong: 'An anonymous survey answered by 900 of the school’s 1,100 students found that 70% would use it.',
    weak: ['Three students chosen at random in the corridor one morning said they would use it.', 'All ninety members of the chess club, which meets in the library, said they would use it.', 'The library holds more than 30,000 books and has forty new computers for students.'],
  },
  {
    claim: 'Cycling to work is common in this city.',
    strong: 'A survey of 10,000 randomly chosen workers across the city found that a quarter cycle to work.',
    weak: ['A survey of customers at a bike shop found that 98% of them cycle to work every day.', 'Two of the writer’s neighbours on the same quiet street cycle to work every morning.', 'The city once hosted a famous international cycling race that drew huge crowds.'],
  },
  {
    claim: 'The new medicine lowers blood pressure.',
    strong: 'In a trial, 3,000 patients got the medicine or a dummy pill at random, and blood pressure fell far more with the medicine.',
    weak: ['The writer’s uncle took the medicine for a month and said that he felt much better afterwards.', 'The medicine comes in an easy-to-open bottle, with large, clear instructions printed on its label.', 'People who buy the medicine also tend to exercise more and eat more healthily than the many people who do not.'],
  },
  {
    claim: 'The reading programme improved pupils’ reading.',
    strong: 'Pupils in the programme improved twice as much on the same reading test as similar pupils not in it.',
    weak: ['One pupil in the programme, a girl in Grade 4, improved her reading a great deal this year.', 'The programme’s books have colourful covers and come with a free bookmark for every pupil.', 'Pupils who already loved reading were the first to sign up for the programme when it began.'],
  },
  {
    claim: 'The town’s new recycling bins have reduced the rubbish sent to landfill.',
    strong: 'Council records show 30% less rubbish went to landfill in the year after the bins arrived, with the same number of homes.',
    weak: ['The new bins come in three bright colours and have lids that are easy for children to open.', 'One street that NAME walked down last week had no litter at all on its pavements.', 'A survey of the recycling company’s own staff found that almost all of them liked the new bins very much indeed.'],
  },
];

function evidenceQ(rng: Rng, d: Difficulty) {
  const cast = pair(rng);
  if (d === 2 && rng.chance(0.5)) {
    const b = rng.pick(BEST_EVIDENCE);
    return {
      prompt: `${fill(`Claim: **${b.claim}**`, cast)}\n\nWhich piece of evidence would best support this claim?`,
      parts: [part(mc(rng, fill(b.strong, cast), b.weak.map((w) => fill(w, cast))))],
      hints: ['Strong evidence is relevant to the claim, comes from enough cases, and those cases are typical of the whole group the claim is about.'],
      solution: [`${q(fill(b.strong, cast))} is relevant, large and fairly chosen.`, 'The others are too few, come from an unrepresentative group, or are beside the point.'],
    };
  }
  const kinds: Weakness[] = d === 3 ? ['irrelevant', 'small', 'unrepresentative', 'correlation', 'strong'] : ['irrelevant', 'small', 'unrepresentative', 'correlation'];
  const kind = rng.pick(kinds);
  const [claim, evidence] = rng.pick(EVIDENCE[kind]).map((s) => fill(s, cast));
  const question = d === 3 ? 'What, if anything, is wrong with this evidence?' : 'What is the main weakness of this evidence?';
  return {
    prompt: `Claim: **${claim}**\n\nEvidence: ${evidence}\n\n${question}`,
    parts: [part(fixedChoice(kinds.map((k) => WEAK_CHOICE[k]), kinds.indexOf(kind)))],
    hints: ['Ask three questions: Is the evidence about the claim at all? Is the sample big enough? Is it typical of the whole group? And if two things go together, has anyone shown that one causes the other?'],
    solution: [kind === 'strong' ? `Nothing is wrong: ${WEAK_WHY.strong}.` : `${WEAK_CHOICE[kind]} Here, ${WEAK_WHY[kind]}.`],
  };
}

const L3 = 'e11-4-3';
const L4 = 'e11-4-4';

export const ARGUMENT_SKILLS: SkillDef[] = [
  skill({
    id: 'e11-satire',
    name: 'Satire: target and tools',
    description: 'Identify the target of a satire, and the tool it mainly uses: verbal irony, exaggeration, understatement, parody or mock seriousness, including in Swift, Twain and Leacock.',
    outcomes: ['11-D1'],
    lessonId: L3,
    format: 'mc',
    gen: satireQ,
  }),
  skill({
    id: 'e11-fallacies',
    name: 'Subtler fallacies',
    description: 'Recognize post hoc reasoning, circular reasoning, red herrings, false analogies and appeals to tradition, alongside the fallacies of Grade 10, and tell them from sound reasoning.',
    outcomes: ['11-D2'],
    lessonId: L4,
    format: 'mc',
    gen: fallacyQ,
  }),
  skill({
    id: 'e11-evidence-quality',
    name: 'Judging evidence',
    description: 'Judge whether evidence is relevant, sufficient and representative, and tell correlation from causation.',
    outcomes: ['11-D2'],
    lessonId: L4,
    format: 'mc',
    gen: evidenceQ,
  }),
];
