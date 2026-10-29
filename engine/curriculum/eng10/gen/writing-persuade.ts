/**
 * Grade 10 English, lessons 6.3 and 6.4: The Persuasive Essay and Narrative Writing (10-F2).
 * Position statements, reasons with evidence, calls to action, the parts of a persuasive essay,
 * rebuttals that concede and answer, showing rather than telling, sensory detail, pacing, opening
 * lines, and punctuating dialogue. Every issue and survey is invented for practice; no question
 * claims a real figure. Dialogue uses double quotation marks, the course's house style.
 */
import { mc, part, skill, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { AnswerSpec, Choice, Difficulty, SkillDef } from '../../../types.ts';
import { block, cap, fill, pair, people } from './common.ts';
import { q } from './writing-response.ts';

const PERSUADE = 'e10-6-3';
const NARRATIVE = 'e10-6-4';
const OUTCOMES = ['10-F2'];

// ---------------------------------------------------------------------------- lesson 6.3: the persuasive essay

interface Issue {
  /** The issue in a few words, for prompts. */
  issue: string;
  position: string;
  vague: string;
  fence: string;
  question: string;
  reason: string;
  noEvidence: string;
  insult: string;
  irrelevant: string;
  otherSide: string;
  action: string;
  vagueAction: string;
  threat: string;
  counter: string;
  rebuttal: string;
  deny: string;
  attack: string;
  giveUp: string;
  ignore: string;
}

const ISSUES: Issue[] = [
  {
    issue: 'a later start to the school day',
    position: 'Our school should start classes at 9:30 instead of 8:00.',
    vague: 'School start times are an interesting topic to think about.',
    fence: 'There are good points on both sides of starting school later.',
    question: 'Should our school start later in the morning?',
    reason: 'Students would learn better: in our student council’s survey of 300 students, two thirds said they are too tired to concentrate in their first lesson.',
    noEvidence: 'Starting later would just be better for everyone.',
    insult: 'Only people who enjoy making students miserable want school to start at 8:00.',
    irrelevant: 'Many students like to eat cereal for breakfast.',
    otherSide: 'Starting later would mean that students get home later in the evening.',
    action: 'Sign the student council’s petition this week, and ask your parents to write to the principal before the board meets next month.',
    vagueAction: 'Think about it.',
    threat: 'If the school does not change, everyone will regret it forever.',
    counter: 'Some parents argue that a later start would make it harder for them to get to work on time.',
    rebuttal: 'It is true that some families would need to adjust, but the school could open its doors at 8:00 for supervised study, so parents could still drop students off early.',
    deny: 'That is simply not true.',
    attack: 'Parents who say this only care about themselves.',
    giveUp: 'That is a fair point, so perhaps the school should keep the 8:00 start after all.',
    ignore: 'Students also deserve better food in the cafeteria.',
  },
  {
    issue: 'a school vegetable garden',
    position: 'Our school should turn the empty lot behind the gym into a vegetable garden.',
    vague: 'Gardens are something many people have opinions about.',
    fence: 'A school garden has some advantages and some disadvantages.',
    question: 'Would a school garden be a good idea?',
    reason: 'A garden would give science classes a place to study plants first-hand: our biology teacher has already offered to plan lessons around it.',
    noEvidence: 'A garden would be a really nice thing to have.',
    insult: 'Anyone who does not want a garden must hate nature.',
    irrelevant: 'Some vegetables, such as tomatoes, are actually fruits.',
    otherSide: 'Someone would have to water the garden during the summer holidays.',
    action: 'Join the garden club’s first meeting on Thursday at lunch, and bring one seed packet to start our first bed.',
    vagueAction: 'Gardens are something to consider.',
    threat: 'Without a garden, our school will become a terrible place.',
    counter: 'Some staff worry that no one will look after the garden during the summer holidays.',
    rebuttal: 'The holidays are a real challenge, but families who live nearby have already signed up to water the beds on a weekly rota, so the plants will not be left alone.',
    deny: 'Nobody will forget the garden.',
    attack: 'Teachers who raise this problem just want an excuse to say no.',
    giveUp: 'They are right, so we should probably forget about the garden.',
    ignore: 'The gym also needs new basketball hoops.',
  },
  {
    issue: 'phones in class',
    position: 'Phones should be switched off and stored in lockers during lessons.',
    vague: 'Phones in class are a big issue these days.',
    fence: 'Phones in class can be both helpful and distracting.',
    question: 'Are phones in class a problem?',
    reason: 'Phones break students’ concentration: in a two-week trial in our Grade 10 classes, teachers counted half as many interruptions when phones were in lockers.',
    noEvidence: 'Lessons are obviously better without phones.',
    insult: 'Students who want their phones in class are addicted and cannot think for themselves.',
    irrelevant: 'Some phones have very good cameras.',
    otherSide: 'Phones can be useful for looking things up during a lesson.',
    action: 'Vote yes on the phone policy at Friday’s student assembly, and try leaving your own phone in your locker for one week before then.',
    vagueAction: 'Phones are something we should all reflect on.',
    threat: 'If phones stay in class, every student will fail.',
    counter: 'Some students argue that they need their phones to look up information during lessons.',
    rebuttal: 'Looking things up can help learning, but every classroom already has shared laptops for research, so students would lose very little by storing their phones.',
    deny: 'Nobody really needs a phone in class.',
    attack: 'Students who say this just want to play games.',
    giveUp: 'Since phones can be useful, we should probably let students keep them after all.',
    ignore: 'Our school should also have longer breaks.',
  },
  {
    issue: 'free bus passes for students',
    position: 'The city should give every secondary-school student a free bus pass.',
    vague: 'Buses are an important part of city life.',
    fence: 'Free bus passes would help some people but not others.',
    question: 'Should students ride the bus for free?',
    reason: 'Free passes would help students reach school and activities: in our class survey, one in four students said bus fares stop them from joining after-school clubs.',
    noEvidence: 'Free bus passes would make life better.',
    insult: 'City councillors who oppose free passes do not care about young people.',
    irrelevant: 'The city’s newest buses are painted bright green.',
    otherSide: 'Free passes would cost the city money.',
    action: 'Come to the city council meeting on 12 March and speak for two minutes in the public comment time, or sign our letter in the school office.',
    vagueAction: 'Buses matter.',
    threat: 'If the city says no, young people will never trust it again.',
    counter: 'Some councillors argue that the city cannot afford to give passes away.',
    rebuttal: 'The cost is real, but students who ride now will be the paying adult riders of the future, and more riders mean fewer cars on the city’s crowded roads.',
    deny: 'The city can easily afford it.',
    attack: 'Councillors who say this are being selfish.',
    giveUp: 'If the city cannot afford it, then free passes are not a good idea.',
    ignore: 'The city should also fix the potholes on Main Street.',
  },
  {
    issue: 'refillable water bottles instead of plastic ones',
    position: 'Our school should stop selling bottled water and install refill stations instead.',
    vague: 'Plastic is something many people talk about.',
    fence: 'Bottled water has good and bad sides.',
    question: 'Is bottled water a problem at our school?',
    reason: 'The change would cut waste: last month, the cleaning staff collected more than 1,200 empty bottles from our school’s bins.',
    noEvidence: 'Refill stations are just a better idea.',
    insult: 'Only lazy people buy bottled water.',
    irrelevant: 'Water covers most of the Earth’s surface.',
    otherSide: 'The school earns some money from selling bottled water.',
    action: 'Bring a refillable bottle to school every day next week, and sign the environment club’s request to the principal at lunch on Wednesday.',
    vagueAction: 'Let’s all try to be better.',
    threat: 'If we keep buying plastic bottles, the world will end.',
    counter: 'Some people point out that the school earns money from selling bottled water.',
    rebuttal: 'The school does earn a little from water sales, but the refill stations could be paid for by the parents’ association, and students would save money they now spend on bottles.',
    deny: 'The money does not matter at all.',
    attack: 'People who worry about the money care more about profit than the planet.',
    giveUp: 'Since the school needs the money, we should keep selling bottled water.',
    ignore: 'The school should also plant more trees.',
  },
  {
    issue: 'longer library opening hours',
    position: 'The school library should stay open until 6:00 p.m. on weekdays.',
    vague: 'Libraries are an important topic.',
    fence: 'Longer library hours have both benefits and costs.',
    question: 'Should the library stay open later?',
    reason: 'Many students have nowhere quiet to study at home: in our survey of 150 students, more than a third said they share a bedroom with a younger brother or sister.',
    noEvidence: 'Longer hours would be good for the school.',
    insult: 'Anyone who wants the library to close early does not care about education.',
    irrelevant: 'Our library has a large collection of graphic novels.',
    otherSide: 'Longer hours would mean paying staff for more time.',
    action: 'Fill in the library survey on the school website by Friday, and tell the librarian how you would use the extra hours.',
    vagueAction: 'Reading is important, so remember that.',
    threat: 'If the library closes early, students’ futures will be ruined.',
    counter: 'Some people argue that paying staff to stay late would cost too much.',
    rebuttal: 'Staff time does cost money, but trained student volunteers could help run the evening hours, so only one paid member of staff would be needed.',
    deny: 'It would not cost anything.',
    attack: 'The people who say this have never had to study in a noisy house.',
    giveUp: 'Because of the cost, the library should keep its present hours.',
    ignore: 'The library should also buy new chairs.',
  },
  {
    issue: 'trees on city streets',
    position: 'The city should plant a tree on every residential street that does not have one.',
    vague: 'Trees are a part of nature that people notice.',
    fence: 'Planting trees has some benefits and some costs.',
    question: 'Should the city plant more trees?',
    reason: 'Trees keep streets cooler in hot weather: when our science class measured the pavement at noon, it was much cooler under the trees on Park Road than on the treeless streets nearby.',
    noEvidence: 'More trees would just make the city better.',
    insult: 'People who do not want trees have no taste.',
    irrelevant: 'Some trees can live for thousands of years.',
    otherSide: 'Tree roots can damage pavements.',
    action: 'Ask your family to adopt a street tree through the city’s volunteer program, and come to the planting day at Riverside School on Saturday.',
    vagueAction: 'Trees are worth caring about.',
    threat: 'Without more trees, our city will become unlivable.',
    counter: 'Some residents worry that tree roots will crack pavements and pipes.',
    rebuttal: 'Roots can cause damage, but choosing small street trees with deep roots and planting them in proper tree pits greatly reduces the risk.',
    deny: 'Roots never damage anything.',
    attack: 'People who worry about roots just do not like nature.',
    giveUp: 'Since roots can cause damage, the city should not plant more trees.',
    ignore: 'The city also needs more bicycle lanes.',
  },
  {
    issue: 'volunteering in Grade 10',
    position: 'Every Grade 10 student should complete twenty hours of community volunteering before the end of the year.',
    vague: 'Volunteering is a topic that comes up a lot.',
    fence: 'Required volunteering has advantages and disadvantages.',
    question: 'Should volunteering be part of Grade 10?',
    reason: 'Volunteering builds skills that employers look for: when our careers teacher surveyed twenty local businesses, most said they value volunteer experience on a young person’s application.',
    noEvidence: 'Volunteering is just a good thing to do.',
    insult: 'Students who do not want to volunteer are selfish.',
    irrelevant: 'Some charities were started more than a hundred years ago.',
    otherSide: 'Students already have a lot of homework.',
    action: 'Sign up for one shift at the food bank this month using the form outside the library, and bring a friend with you.',
    vagueAction: 'Volunteering is worth thinking about.',
    threat: 'If students do not volunteer, our community will fall apart.',
    counter: 'Some students argue that they have no time for volunteering on top of homework and sport.',
    rebuttal: 'Many students are busy, but twenty hours over a whole school year is less than an hour a week, and the hours can also be done during the holidays.',
    deny: 'Everyone has plenty of free time.',
    attack: 'Students who say this are just lazy.',
    giveUp: 'If students are busy, then volunteering should not be required.',
    ignore: 'The school should also hold more dances.',
  },
  {
    issue: 'a longer lunch break',
    position: 'Our school should lengthen the lunch break from thirty to forty-five minutes.',
    vague: 'Lunch breaks are something students talk about.',
    fence: 'A longer lunch break would have good and bad effects.',
    question: 'Is our lunch break long enough?',
    reason: 'A longer break would let every student eat properly: on three days last week, the student council counted more than fifty students still in the lunch queue when the bell rang.',
    noEvidence: 'A longer lunch would be nicer for everyone.',
    insult: 'Whoever made the lunch break so short clearly does not care about students.',
    irrelevant: 'Rice is eaten by billions of people around the world.',
    otherSide: 'A longer lunch break would make the school day end later.',
    action: 'Come to the student council meeting at lunch on Tuesday to sign our proposal, and tell your class representative how long you usually wait in the queue.',
    vagueAction: 'Think about lunch.',
    threat: 'If the break stays short, students will starve.',
    counter: 'Some teachers worry that a longer lunch would push the end of the school day later.',
    rebuttal: 'The day would end fifteen minutes later, but students who have eaten properly concentrate better in the afternoon, so less lesson time would be wasted.',
    deny: 'The day would not end any later.',
    attack: 'Teachers who worry about this just want to go home early.',
    giveUp: 'Since the day would end later, we should keep the short lunch break.',
    ignore: 'The school should also repaint the hallways.',
  },
  {
    issue: 'idling cars outside the school',
    position: 'Drivers should switch off their engines while they wait outside our school.',
    vague: 'Cars are part of everyday life.',
    fence: 'Leaving engines running has some good and some bad sides.',
    question: 'Is idling outside the school a problem?',
    reason: 'Idling engines fill the air that students breathe with exhaust: when our science club tested the air at the school gate, it was much dirtier at pick-up time than at midday.',
    noEvidence: 'Switching off engines is just the right thing to do.',
    insult: 'Drivers who leave their engines running are thoughtless people.',
    irrelevant: 'Some cars can now park themselves.',
    otherSide: 'In cold weather, drivers want to keep their cars warm.',
    action: 'This week, ask whoever drives you to school to switch off the engine while waiting, and sign the science club’s pledge at the front office.',
    vagueAction: 'Let’s all be more careful.',
    threat: 'If drivers keep their engines running, everyone at our school will get sick.',
    counter: 'Some drivers say they need to keep their engines running to stay warm in winter.',
    rebuttal: 'Cold mornings are uncomfortable, but a car stays warm for several minutes with the engine off, and most drivers wait at the gate for only a few minutes.',
    deny: 'Nobody really needs to stay warm.',
    attack: 'Drivers who say this only care about their own comfort.',
    giveUp: 'Since drivers get cold, they should be allowed to keep their engines running.',
    ignore: 'The school also needs a bigger car park.',
  },
];

function persuasiveWriting(rng: Rng, d: Difficulty): GenOutput {
  const t = rng.pick(ISSUES);
  const kind = d === 1 ? 'position' : d === 2 ? rng.pick(['reason', 'action']) : rng.pick(['order', 'reason', 'action']);
  if (kind === 'position') {
    return {
      prompt: `A student is writing a persuasive essay about ${t.issue}. Which is the clearest **position statement**?`,
      parts: [part(mc(rng, t.position, [t.vague, t.fence, t.question].slice(0, 3)))],
      hints: ['A position statement takes one side and says exactly what should happen. It is not a question, and it does not sit on the fence.'],
      solution: [`${q(t.position)} takes a clear side and says exactly what should change.`, 'The others only name the topic, refuse to take a side, or ask a question instead of answering it.'],
    };
  }
  if (kind === 'reason') {
    const wrong = d === 2 ? [t.noEvidence, t.irrelevant, t.otherSide] : [t.noEvidence, t.insult, t.otherSide];
    return {
      prompt: `A student is writing a persuasive essay with this position:\n\n${block(t.position)}\n\nWhich is the strongest **reason with evidence** to support it?`,
      parts: [part(mc(rng, t.reason, wrong))],
      hints: ['A strong reason supports the position directly and backs it up with specific evidence: a fact, a number, an example or an expert.'],
      solution: [`${q(t.reason)} gives a reason that supports the position and backs it with specific evidence.`, 'The others give no evidence, attack people, wander off the topic, or support the other side.'],
    };
  }
  if (kind === 'action') {
    return {
      prompt: `A persuasive essay argues:\n\n${block(t.position)}\n\nWhich is the most effective **call to action** for its conclusion?`,
      parts: [part(mc(rng, t.action, [t.vagueAction, t.threat, t.ignore]))],
      hints: ['A call to action tells the reader exactly what to do next: a specific, realistic step they can take soon.'],
      solution: [`${q(t.action)} tells readers a specific, realistic step to take and when to take it.`, 'The others are too vague to act on, exaggerate wildly, or raise a new topic at the very end.'],
    };
  }
  const steps = [
    'A hook that grabs the reader’s attention',
    'Background on the issue and the position statement',
    'Reasons, each backed by evidence',
    'The strongest counterargument and a rebuttal to it',
    'A conclusion that restates the position and ends with a call to action',
  ];
  return order(rng, `Put the parts of a persuasive essay about ${t.issue} in a sensible order. The writer answers the other side **after** giving their own reasons.`, steps, ['An essay opens with a hook and closes with a call to action.', 'The position comes in the introduction, before the reasons that support it.'], [
    'The introduction opens with a hook, gives background, and ends with the position.',
    'The body gives the reasons with evidence, then answers the strongest counterargument.',
    'The conclusion restates the position and ends with a call to action.',
  ]);
}

/** An order question whose items are shown shuffled (never already in order). */
export function order(rng: Rng, prompt: string, steps: string[], hints: string[], solution: string[]): GenOutput {
  const ids = 'abcdefgh';
  const idx = steps.map((_, i) => i);
  let shown = rng.shuffle(idx);
  for (let i = 0; i < 50 && shown.every((v, j) => v === j); i++) shown = rng.shuffle(idx);
  if (shown.every((v, j) => v === j)) shown = [...idx].reverse();
  const items: Choice[] = shown.map((k, i) => ({ id: ids[i], md: steps[k] }));
  const correctOrder = idx.map((k) => items[shown.indexOf(k)].id);
  const answer: AnswerSpec = { kind: 'order', items, correctOrder, ends: ['First', 'Last'] };
  return { prompt, parts: [part(answer)], hints, solution };
}

type RebuttalFlaw = 'deny' | 'attack' | 'giveUp' | 'ignore';
const FLAW_LABEL: Record<RebuttalFlaw, string> = {
  deny: 'It simply denies the counterargument without giving a reason.',
  attack: 'It attacks the people who disagree instead of their argument.',
  giveUp: 'It gives up the writer’s own position.',
  ignore: 'It does not answer the counterargument at all.',
};

function rebuttal(rng: Rng, d: Difficulty): GenOutput {
  const t = rng.pick(ISSUES);
  if (d === 1) {
    const which = rng.pick(['counter', 'rebuttal'] as const);
    return {
      prompt: `In a persuasive essay arguing that ${lowerPosition(t.position)}, a student wrote:\n\n${block(`${t.counter} ${t.rebuttal}`)}\n\nWhich sentence is the **${which === 'counter' ? 'counterargument' : 'rebuttal'}**?`,
      parts: [part(mc(rng, t[which], [t[which === 'counter' ? 'rebuttal' : 'counter'], t.position], { keepOrder: false }))],
      hints: ['The counterargument is the other side’s view. The rebuttal is the writer’s answer to it.'],
      solution: which === 'counter'
        ? [`“${t.counter}” states what people on the other side believe, so it is the counterargument.`]
        : [`“${t.rebuttal}” answers the other side’s point, so it is the rebuttal.`],
    };
  }
  if (d === 2) {
    const wrong = rng.sample([t.deny, t.attack, t.giveUp, t.ignore], 3);
    return {
      prompt: `A persuasive essay argues:\n\n${block(t.position)}\n\nIt includes this counterargument:\n\n${block(t.counter)}\n\nWhich is the strongest **rebuttal**?`,
      parts: [part(mc(rng, t.rebuttal, wrong))],
      hints: ['A strong rebuttal admits what is fair in the other side’s point, then answers it with a reason or evidence.'],
      solution: [`${q(t.rebuttal)} concedes what is fair in the counterargument and then answers it with a reason.`, 'The others deny it without a reason, attack the people who hold it, give up the writer’s own position, or ignore it.'],
    };
  }
  const flaw = rng.pick(['deny', 'attack', 'giveUp', 'ignore'] as RebuttalFlaw[]);
  const others = (Object.keys(FLAW_LABEL) as RebuttalFlaw[]).filter((f) => f !== flaw);
  return {
    prompt: `A persuasive essay argues:\n\n${block(t.position)}\n\nIt includes this counterargument and rebuttal:\n\n${block(`${t.counter} ${t[flaw]}`)}\n\nWhat is the main weakness of the rebuttal?`,
    parts: [part(mc(rng, FLAW_LABEL[flaw], others.map((f) => FLAW_LABEL[f])))],
    hints: ['A strong rebuttal concedes what is fair, then answers the counterargument with a reason or evidence. Ask which of those things this rebuttal fails to do.'],
    solution: [FLAW_LABEL[flaw], `A stronger rebuttal: ${q(t.rebuttal)}`],
  };
}

function lowerPosition(p: string): string {
  return (p[0].toLowerCase() + p.slice(1)).replace(/\.$/, '');
}

// ---------------------------------------------------------------------------- lesson 6.4: narrative techniques

type Feeling = 'nervous' | 'angry' | 'exhausted' | 'excited' | 'embarrassed' | 'proud' | 'cold' | 'scared' | 'bored' | 'lonely';
/** Feelings close enough to be confused, never offered against each other. */
const NEAR: Record<Feeling, Feeling[]> = {
  nervous: ['scared', 'embarrassed', 'excited'],
  scared: ['nervous'],
  angry: [],
  exhausted: ['bored'],
  bored: ['exhausted', 'lonely'],
  excited: ['proud', 'nervous'],
  proud: ['excited'],
  embarrassed: ['nervous'],
  cold: [],
  lonely: ['bored'],
};

const SHOW: Record<Feeling, string[]> = {
  nervous: ['NAME wiped {his} damp palms on {his} jeans for the third time and read the first line of {his} speech again.', 'NAME checked {his} passport for the fifth time and swallowed hard as the interview room door opened.'],
  angry: ['NAME slammed the door so hard that the pictures on the wall rattled.', 'NAME crumpled the letter into a tight ball and hurled it across the room.'],
  exhausted: ['NAME dropped {his} bag in the hall, kicked off {his} shoes and fell asleep on the sofa with the lights still on.', 'NAME’s eyelids drooped, and {his} head jerked up each time it began to fall toward the desk.'],
  excited: ['NAME bounced on {his} toes, checking the arrivals board every few seconds.', 'NAME tore open the parcel before the delivery driver had even reached the gate.'],
  embarrassed: ['NAME’s cheeks burned, and {he} stared hard at {his} shoes while the class laughed.', 'NAME pulled {his} hood over {his} face as the whole bus turned to look at {him}.'],
  proud: ['NAME held the trophy above {his} head and grinned at {his} grandmother in the front row.', 'NAME read {his} name on the winners’ list twice, then stood a little taller as {he} walked home.'],
  cold: ['NAME’s teeth chattered, and {he} pulled {his} hands deep into {his} sleeves.', 'NAME stamped {his} numb feet on the platform and blew on {his} fingers.'],
  scared: ['NAME froze, holding {his} breath, as the footsteps stopped right outside the door.', 'NAME gripped the railing with white knuckles as the bridge swayed under {him}.'],
  bored: ['NAME traced circles on the desk with {his} finger and checked the clock again: only two minutes had passed.', 'NAME yawned, counted the ceiling tiles for the fourth time and sighed.'],
  lonely: ['NAME sat on the steps with {his} lunch, watching the other groups laugh together across the yard.', 'NAME scrolled through {his} messages, but no one had written all weekend.'],
};
const TELL: Record<Feeling, string> = {
  nervous: 'NAME was very nervous before the audition.',
  angry: 'NAME was really angry.',
  exhausted: 'NAME was exhausted after the long day.',
  excited: 'NAME felt excited about the visit.',
  embarrassed: 'NAME was embarrassed.',
  proud: 'NAME was proud of winning.',
  cold: 'NAME was very cold.',
  scared: 'NAME was scared.',
  bored: 'NAME was bored in the lesson.',
  lonely: 'NAME felt lonely at the new school.',
};
const FEELINGS = Object.keys(SHOW) as Feeling[];

interface Scene {
  plain: string;
  vivid: string;
  vague: string;
  tell: string;
  irrelevant: string;
}
const SCENES: Scene[] = [
  { plain: 'The market was busy.', vivid: 'Traders shouted prices over the hiss of frying plantains, and the air smelled of smoke and ripe mangoes.', vague: 'The market was very, very busy.', tell: 'The market was busy and interesting, and I liked it.', irrelevant: 'The market opens at seven o’clock every morning.' },
  { plain: 'The storm was bad.', vivid: 'Rain hammered on the tin roof, and every flash of lightning lit the rattling windows white.', vague: 'The storm was really, really bad.', tell: 'The storm was bad, and it was scary.', irrelevant: 'Storms are more common in some seasons than in others.' },
  { plain: 'The kitchen smelled nice.', vivid: 'Cinnamon and warm butter drifted from the oven, and the window had fogged over with steam.', vague: 'The kitchen smelled very nice indeed.', tell: 'The kitchen smelled nice, and I was happy.', irrelevant: 'The kitchen was painted yellow last year.' },
  { plain: 'The beach was hot.', vivid: 'The sand burned our bare feet, and the air shimmered above the bright, glaring water.', vague: 'The beach was extremely hot.', tell: 'The beach was hot, and it was uncomfortable.', irrelevant: 'The beach is about forty minutes from the city.' },
  { plain: 'The train station was crowded.', vivid: 'Elbows and suitcases jostled us toward the platform, and a voice crackled announcements no one could understand.', vague: 'The train station was very crowded.', tell: 'The train station was crowded, which was annoying.', irrelevant: 'The station was built more than a hundred years ago.' },
  { plain: 'The forest was quiet at night.', vivid: 'Only a twig snapped somewhere in the dark, and the cold air smelled of pine and wet earth.', vague: 'The forest was so quiet at night.', tell: 'The forest was quiet at night, and it felt strange.', irrelevant: 'The forest covers about half of the national park.' },
  { plain: 'The stadium was loud.', vivid: 'Drums thundered from the stands, and forty thousand voices roared as the ball hit the net.', vague: 'The stadium was extremely loud.', tell: 'The stadium was loud, and the atmosphere was great.', irrelevant: 'The stadium has a car park on its north side.' },
  { plain: 'The bakery was warm.', vivid: 'Heat rolled from the brick oven, and the smell of fresh bread wrapped around us as the door jingled shut.', vague: 'The bakery was very warm.', tell: 'The bakery was warm, and I liked being there.', irrelevant: 'The bakery is closed on Mondays.' },
];

interface Moment {
  slow: string;
  summary: string;
  skip: string;
  wrongSlow: string;
}
const MOMENTS: Array<{ what: string } & Moment> = [
  {
    what: 'NAME opens the letter that says whether {he} has won a scholarship',
    slow: 'NAME slid a finger under the flap. The paper tore slowly, loud in the silent kitchen. {He} unfolded the letter one crease at a time and made {himself} read the first word: *Congratulations*.',
    summary: 'NAME opened the letter and found out that {he} had won the scholarship.',
    skip: 'A month later, NAME started at {his} new school.',
    wrongSlow: 'That morning, NAME had spent twenty minutes choosing between the blue socks and the grey ones, holding each pair up to the light. Then {he} opened the letter and found out that {he} had won the scholarship.',
  },
  {
    what: 'NAME takes the last penalty kick of the final',
    slow: 'NAME placed the ball on the spot and stepped back. The crowd’s roar faded until {he} could hear only {his} own breathing. {He} ran, struck, and watched the ball curl toward the corner.',
    summary: 'NAME took the last penalty and scored, and {his} team won the final.',
    skip: 'The next season, NAME was made captain of the team.',
    wrongSlow: 'Before the match, the coach spent a long time explaining the bus timetable, listing every stop between the school and the stadium. Then NAME took the last penalty and scored.',
  },
  {
    what: 'NAME steps onto the stage to sing for the first time',
    slow: 'The curtain swept open. Hot lights pressed on NAME’s face, and somewhere in the dark a seat creaked. {He} gripped the microphone, drew one long breath, and sang the first note.',
    summary: 'NAME went on stage and sang the song well.',
    skip: 'Years later, NAME became a professional singer.',
    wrongSlow: 'Earlier, NAME had eaten a sandwich in the dressing room, chewing every bite slowly and brushing each crumb from {his} sleeve. Then {he} went on stage and sang.',
  },
  {
    what: 'NAME searches the flooded street for {his} lost dog',
    slow: 'Brown water swirled around NAME’s knees. {He} called the dog’s name and held {his} breath. Then, from under a parked car, came a small, shivering whimper.',
    summary: 'NAME searched the street and found {his} dog under a car.',
    skip: 'After the flood, the street was repaired and repainted.',
    wrongSlow: 'The street had been built in 1965, and the council had repainted its lines twice since then, once in blue and once in white. NAME found {his} dog under a car.',
  },
];

const OPENINGS = [
  'The day the river turned red, nobody in our village dared to cross the bridge.',
  'I had exactly four minutes to find the key before my grandmother came home.',
  'Nobody had opened the door at the end of the corridor in fifty years, until the morning NAME did.',
  'The message arrived at 3:07 a.m., and it had only two words: *Don’t come.*',
  'By the time the last bus left, NAME had already made the worst decision of {his} life.',
];
const WEAK_OPENINGS = [
  'Hi, my name is NAME, and I am going to tell you a story.',
  'One day I woke up, brushed my teeth and ate my breakfast.',
  'The dictionary defines courage as “the ability to do something that frightens one.”',
  'This is a story about a person who finds something.',
  'It was a normal day, and nothing much was happening.',
];

function narrativeTechniques(rng: Rng, d: Difficulty): GenOutput {
  const cast = people(rng, 1);
  const f = (s: string) => fill(s, cast).replace(/\{himself\}/g, cast[0].he === 'he' ? 'himself' : 'herself');
  const kind = d === 1 ? rng.pick(['show', 'opening']) : d === 2 ? rng.pick(['showFeeling', 'sensory']) : rng.pick(['pacing', 'showFeeling', 'sensory']);
  if (kind === 'show') {
    const feel = rng.pick(FEELINGS);
    const others = rng.sample(FEELINGS.filter((x) => x !== feel), 2).map((x) => f(TELL[x]));
    const right = f(rng.pick(SHOW[feel]));
    return {
      prompt: 'Which sentence **shows** a character’s feelings instead of **telling** them?',
      parts: [part(mc(rng, right, others))],
      hints: ['Telling names the feeling (“was nervous”). Showing lets the reader work it out from actions, body language and details.'],
      solution: [`${q(right)} never names a feeling; the reader works it out from what the character does.`, 'The others simply tell the reader the feeling.'],
    };
  }
  if (kind === 'opening') {
    const right = f(rng.pick(OPENINGS));
    const wrong = rng.sample(WEAK_OPENINGS, 3).map(f);
    return {
      prompt: 'Which opening line would most make a reader want to keep reading a story?',
      parts: [part(mc(rng, right, wrong))],
      hints: ['A strong opening drops the reader into something unusual, urgent or mysterious, and raises a question the reader wants answered.'],
      solution: [`${q(right)} starts with something urgent or mysterious and makes the reader ask what happens next.`, 'The others introduce the writer, list ordinary routines, quote a dictionary, or say nothing specific.'],
    };
  }
  if (kind === 'showFeeling') {
    const feel = rng.pick(FEELINGS);
    const far = FEELINGS.filter((x) => x !== feel && !NEAR[feel].includes(x) && !NEAR[x].includes(feel));
    const [o1, o2] = rng.sample(far, 2);
    const right = f(rng.pick(SHOW[feel]));
    return {
      prompt: `Which sentence best **shows**, without naming the feeling, that the character is **${feel}**?`,
      parts: [part(mc(rng, right, [f(TELL[feel]), f(rng.pick(SHOW[o1])), f(rng.pick(SHOW[o2]))]))],
      hints: ['Find the sentence whose actions and details point to this feeling, and check that it does not simply name the feeling.'],
      solution: [`${q(right)} shows that the character is ${feel} through actions and details.`, `${q(f(TELL[feel]))} tells instead of shows, and the other sentences show different feelings (${o1} and ${o2}).`],
    };
  }
  if (kind === 'sensory') {
    const sc = rng.pick(SCENES);
    return {
      prompt: `A student wants to revise this flat sentence in a story:\n\n${block(sc.plain)}\n\nWhich revision adds the most vivid **sensory detail**?`,
      parts: [part(mc(rng, sc.vivid, d === 3 ? [sc.vague, sc.tell, sc.irrelevant] : [sc.vague, sc.tell]))],
      hints: ['Sensory details appeal to sight, sound, smell, taste and touch. Words like “very” and “really” add emphasis but no detail.'],
      solution: [`${q(sc.vivid)} lets the reader see, hear, smell or feel the scene.`, 'The others only add “very” or “really”, state an opinion, or give a fact that does not help the reader experience the scene.'],
    };
  }
  const m = rng.pick(MOMENTS);
  return {
    prompt: `In a story, the key moment is when ${f(m.what)}. The writer wants to **slow this moment down**. Which version does that best?`,
    parts: [part(mc(rng, f(m.slow), [f(m.summary), f(m.skip), f(m.wrongSlow)]))],
    hints: ['Slow down the moment that matters most by giving it small, step-by-step actions and sensory details. Hurry through the moments that do not matter.'],
    solution: [`The best version stretches the key moment into small actions and details, so the reader feels the tension: ${q(f(m.slow))}`, 'The others rush through the key moment, skip past it, or slow down an unimportant moment instead.'],
  };
}

// ---------------------------------------------------------------------------- lesson 6.4: dialogue

interface Line {
  /** What is said, without its closing punctuation. */
  words: string;
  verb: string;
  end: '.' | '?' | '!';
}
const STATEMENTS: Line[] = [
  { words: 'I’m too tired to keep walking', verb: 'said', end: '.' },
  { words: 'The bus leaves in five minutes', verb: 'said', end: '.' },
  { words: 'I think I left my keys at school', verb: 'said', end: '.' },
  { words: 'We should take the shorter path', verb: 'whispered', end: '.' },
  { words: 'Everyone is waiting outside', verb: 'said', end: '.' },
  { words: 'The match has been cancelled', verb: 'announced', end: '.' },
];
const QUESTIONS: Line[] = [
  { words: 'Where are you going', verb: 'asked', end: '?' },
  { words: 'Did anyone see the bus', verb: 'asked', end: '?' },
  { words: 'Is this the right platform', verb: 'asked', end: '?' },
  { words: 'Why is the door open', verb: 'whispered', end: '?' },
];
const EXCLAIMS: Line[] = [
  { words: 'Watch out', verb: 'shouted', end: '!' },
  { words: 'We won', verb: 'cried', end: '!' },
  { words: 'Stop that bus', verb: 'yelled', end: '!' },
];
/** A sentence split by its dialogue tag: the two halves, both one sentence. */
const SPLITS: Array<[string, string]> = [
  ['If we leave now', 'we can still catch the bus'],
  ['When the rain stops', 'we can walk to the market'],
  ['Before you go', 'please feed the cat'],
  ['As soon as the bell rings', 'meet me by the gate'],
];
/** Two sentences spoken with a tag between them. */
const PAIRS: Array<[string, string]> = [
  ['I’m not going', 'It’s far too cold'],
  ['Wait here', 'I’ll be back in a minute'],
  ['The shop is closed', 'We’ll have to try tomorrow'],
  ['I found your phone', 'It was under the sofa'],
];

const low = (s: string) => s[0].toLowerCase() + s.slice(1);

function dialogue(rng: Rng, d: Difficulty): GenOutput {
  const [p] = pair(rng);
  const n = p.name;
  const kind = d === 1 ? rng.pick(['after', 'before']) : d === 2 ? rng.pick(['question', 'exclaim', 'split']) : rng.pick(['split', 'pairs', 'paragraph']);
  const ask = 'Which sentence punctuates the dialogue **correctly**?';
  if (kind === 'after') {
    const l = rng.pick(STATEMENTS);
    const right = `“${l.words},” ${n} ${l.verb}.`;
    return {
      prompt: ask,
      parts: [part(mc(rng, right, [`“${l.words}.” ${n} ${l.verb}.`, `“${l.words}” ${n} ${l.verb}.`, `“${l.words},” ${n} ${cap(l.verb)}.`]))],
      hints: ['When a dialogue tag such as “she said” follows the words spoken, the spoken sentence ends with a comma inside the closing quotation mark, and the tag starts with a small letter.'],
      solution: [`Correct: ${right}`, `A comma ends the spoken words inside the quotation marks, and the sentence continues with the tag.`, 'A period would end the sentence before the tag, a missing comma runs the words into the tag, and the verb in the tag needs no capital letter.'],
    };
  }
  if (kind === 'before') {
    const l = rng.pick(STATEMENTS.filter((x) => !/^I[\s’]/.test(x.words)));
    const right = `${n} ${l.verb}, “${l.words}.”`;
    return {
      prompt: ask,
      parts: [part(mc(rng, right, [`${n} ${l.verb}, “${low(l.words)}.”`, `${n} ${l.verb}. “${l.words}.”`, `${n} ${l.verb}, ${l.words}.`]))],
      hints: ['When the tag comes first, put a comma after it, open the quotation marks, and start the spoken words with a capital letter.'],
      solution: [`Correct: ${right}`, `A comma follows the tag, and the quotation begins with a capital letter because it is a complete sentence.`, 'The others start the spoken sentence with a small letter, end the tag with a period, which cuts it off from the words it introduces, or leave out the quotation marks.'],
    };
  }
  if (kind === 'question' || kind === 'exclaim') {
    const l = rng.pick(kind === 'question' ? QUESTIONS : EXCLAIMS);
    const right = `“${l.words}${l.end}” ${n} ${l.verb}.`;
    return {
      prompt: ask,
      parts: [part(mc(rng, right, [`“${l.words}${l.end},” ${n} ${l.verb}.`, `“${l.words},” ${n} ${l.verb}.`, `“${l.words}${l.end}” ${n} ${cap(l.verb)}.`]))],
      hints: [`When the spoken words end with a ${l.end === '?' ? 'question mark' : 'exclamation mark'}, keep it inside the quotation marks and add no comma. The tag still begins with a small letter.`],
      solution: [`Correct: ${right}`, `The ${l.end === '?' ? 'question mark' : 'exclamation mark'} takes the place of the comma, inside the closing quotation mark.`, `A comma after the ${l.end === '?' ? 'question mark' : 'exclamation mark'} is never needed, a comma instead of it loses the ${l.end === '?' ? 'question' : 'exclamation'}, and the tag needs no capital letter.`],
    };
  }
  if (kind === 'split') {
    const [a, b] = rng.pick(SPLITS);
    const right = `“${a},” ${n} said, “${b}.”`;
    return {
      prompt: ask,
      parts: [part(mc(rng, right, [`“${a},” ${n} said, “${cap(b)}.”`, `“${a},” ${n} said. “${b}.”`, `“${a}” ${n} said “${b}.”`]))],
      hints: ['When a tag interrupts one spoken sentence, put commas on both sides of the tag, and do not use a capital letter where the speech picks up again: it is still the same sentence.'],
      solution: [`Correct: ${right}`, `One spoken sentence is interrupted by the tag, so commas surround the tag and the second part starts with a small letter.`, 'A capital letter or a period would wrongly suggest a new sentence, and leaving out the commas runs the speech into the tag.'],
    };
  }
  if (kind === 'pairs') {
    const [a, b] = rng.pick(PAIRS);
    const right = `“${a},” ${n} said. “${b}.”`;
    return {
      prompt: ask,
      parts: [part(mc(rng, right, [`“${a},” ${n} said, “${low(b)}.”`, `“${a},” ${n} said, “${b}.”`, `“${a}.” ${n} said. “${b}.”`]))],
      hints: ['When the speaker says two separate sentences with a tag between them, end the tag with a period and start the second sentence with a capital letter.'],
      solution: [`Correct: ${right}`, `The speaker says two complete sentences, so a period ends the tag and the second sentence begins with a capital letter.`, 'Joining two complete sentences with a comma makes a comma splice, and a period before the tag cuts it off from the speech.'],
    };
  }
  const [a, b] = pair(rng);
  const story = rng.pick([
    `“Is anyone there?” ${a.name} called. “Just me,” ${b.name} answered from the dark. “I thought you had gone home.”`,
    `“We’re late,” ${a.name} said. “The bus has already gone.” “Then we’ll walk,” ${b.name} replied. “It’s only twenty minutes.”`,
    `“Have you finished the poster?” ${a.name} asked. “Almost,” ${b.name} said, holding up the brush. “I just need to paint the title.”`,
  ]);
  return {
    prompt: `A student wrote this passage as one paragraph:\n\n${block(story)}\n\nHow should it be set out?`,
    parts: [part(mc(rng, `Start a new paragraph when ${b.name} begins to speak`, [
      'Keep it as one paragraph, because it is one short conversation',
      'Start a new paragraph for every sentence',
      'Start a new paragraph only when the place or time changes',
    ]))],
    hints: ['In written dialogue, each change of speaker starts a new paragraph, so the reader can always tell who is talking.'],
    solution: [`${a.name} speaks first and ${b.name} answers, so ${b.name}’s words begin a new paragraph.`, `Both of ${b.name}’s sentences stay together in that paragraph, because the same person is still speaking.`],
  };
}

export const PERSUADE_SKILLS: SkillDef[] = [
  skill({
    id: 'e10-persuasive-writing',
    name: 'Planning a persuasive essay',
    description: 'Choose a clear position statement, the strongest reason with evidence and an effective call to action, and order the parts of a persuasive essay.',
    outcomes: OUTCOMES,
    lessonId: PERSUADE,
    format: 'mc',
    gen: persuasiveWriting,
  }),
  skill({
    id: 'e10-rebuttal',
    name: 'Counterarguments and rebuttals',
    description: 'Tell a counterargument from a rebuttal, choose the rebuttal that concedes and answers, and say what is wrong with a weak one.',
    outcomes: OUTCOMES,
    lessonId: PERSUADE,
    format: 'mc',
    gen: rebuttal,
  }),
  skill({
    id: 'e10-narrative-techniques',
    name: 'Narrative techniques',
    description: 'Show rather than tell, choose vivid sensory detail, slow down the key moment, and choose an opening line that hooks the reader.',
    outcomes: OUTCOMES,
    lessonId: NARRATIVE,
    format: 'mc',
    gen: narrativeTechniques,
  }),
  skill({
    id: 'e10-dialogue',
    name: 'Punctuating dialogue',
    description: 'Punctuate dialogue with tags before, after and between the spoken words, and start a new paragraph for each new speaker.',
    outcomes: OUTCOMES,
    lessonId: NARRATIVE,
    format: 'mc',
    gen: dialogue,
  }),
];

