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
import { block, cap, fill, pair, people, q } from './common.ts';

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
    question: 'Should our school start classes later in the morning?',
    reason: 'Students would learn better: in our student council’s survey of 300 students, two thirds said they are too tired to concentrate in their first lesson.',
    noEvidence: 'Starting later would just be better for everyone, because students, teachers and parents would all be much happier with the new times.',
    insult: 'Only people who enjoy making students miserable would want school to start at 8:00, and they clearly never think about anyone but themselves.',
    irrelevant: 'Many students like to eat cereal for breakfast, and some of the most popular brands now come in more than twenty different flavours.',
    otherSide: 'Starting later would mean that students get home later in the evening, leaving less daylight for sport, part-time jobs and family time.',
    action: 'Sign the student council’s petition this week, and ask your parents to write to the principal before the board meets next month.',
    vagueAction: 'Everyone should think carefully about this important issue and about all the different ways that it affects students like us.',
    threat: 'If the school does not change its start time this year, every single student will regret it forever and their futures will be ruined.',
    counter: 'Some parents argue that a later start would make it harder for them to get to work on time, because they drive their children to school on the way.',
    rebuttal: 'It is true that some families would need to adjust, but the school could open at 8:00 for supervised study, so parents could still drop students off early.',
    deny: 'That is simply not true, and it is not something that our school needs to worry about at all when it makes this important decision.',
    attack: 'Parents who say this only care about themselves and their own busy mornings, and they have clearly never listened to what their children need.',
    giveUp: 'That is a fair point, and since so many parents would find it hard to get to work, perhaps the school should keep the 8:00 start after all.',
    ignore: 'Students also deserve much better food in the cafeteria, with fresh fruit, hot meals and more choices for students who do not eat meat.',
  },
  {
    issue: 'a school vegetable garden',
    position: 'Our school should turn the empty lot behind the gym into a vegetable garden.',
    vague: 'Gardens are something that many people at our school have strong opinions about.',
    fence: 'A school vegetable garden would have some advantages and some disadvantages.',
    question: 'Would turning the empty lot behind the gym into a vegetable garden be a good idea?',
    reason: 'A garden would give science classes a place to study plants first-hand: our biology teacher has already offered to plan lessons around it.',
    noEvidence: 'A garden would be a really nice thing for our school to have, and everybody would enjoy it far more than they enjoy the empty lot.',
    insult: 'Anyone who does not want a garden at our school must hate nature, and they probably never go outside or notice anything green.',
    irrelevant: 'Some vegetables, such as tomatoes and cucumbers, are actually fruits, because they grow from flowers and contain the plant’s seeds.',
    otherSide: 'Someone would have to water the garden every day during the summer holidays, when most of the students and teachers are away.',
    action: 'Join the garden club’s first meeting on Thursday at lunch, and bring one seed packet to start our first bed.',
    vagueAction: 'Gardens are something we should all consider, and we should talk about them more often at school.',
    threat: 'Without a garden, our school will become a terrible, lifeless place that no student will ever want to come to again.',
    counter: 'Some staff worry that no one will look after the garden during the long summer holidays, when the school is closed and everyone is away.',
    rebuttal: 'The holidays are a real challenge, but families nearby have already signed up to water the beds on a weekly rota, so the plants will not be left alone.',
    deny: 'Nobody will forget about the garden over the summer, so this is not a real problem, and there is no need to discuss it any further.',
    attack: 'Teachers who raise this problem just want an excuse to say no to anything that students suggest, however good the idea might be.',
    giveUp: 'They are right that no one would be around in the summer, so we should probably forget about the garden and leave the lot empty.',
    ignore: 'The gym also needs new basketball hoops, because the old ones are bent and rusty and the nets have been torn for as long as anyone remembers.',
  },
  {
    issue: 'phones in class',
    position: 'Phones should be switched off and stored in lockers during lessons.',
    vague: 'Phones in class are a big issue these days, and people talk about them a lot.',
    fence: 'Phones in class can be both helpful and distracting, depending on how they are used.',
    question: 'Are phones in class a problem for students, for teachers, or for both of them?',
    reason: 'Phones break students’ concentration: in a two-week trial in our Grade 10 classes, teachers counted half as many interruptions when phones were in lockers.',
    noEvidence: 'Lessons are obviously much better without phones, and anyone who has ever sat in a classroom knows that this is completely true.',
    insult: 'Students who want their phones in class are addicted to them and cannot think for themselves, so their opinion should not count.',
    irrelevant: 'Some phones now have very good cameras, with several lenses and a night mode that can take clear photos in almost total darkness.',
    otherSide: 'Phones can be useful for looking things up during a lesson, working out a sum or photographing homework instructions from the board.',
    action: 'Vote yes on the phone policy at Friday’s student assembly, and try leaving your own phone in your locker for one week before then.',
    vagueAction: 'Phones are something we should all reflect on carefully, both in class and at home, whenever we pick ours up.',
    threat: 'If phones stay in class, every student in the school will fail their exams, and nobody will ever learn anything again.',
    counter: 'Some students argue that they need their phones in lessons to look up information quickly whenever a question comes up in class.',
    rebuttal: 'Looking things up can help learning, but every classroom already has shared laptops for research, so students would lose very little by storing their phones.',
    deny: 'Nobody really needs a phone in class for anything, and this argument is not worth taking seriously when we decide on the new phone policy.',
    attack: 'Students who say this just want to play games and message their friends, and they are only pretending to care about looking things up.',
    giveUp: 'Since phones can be useful for looking things up, we should probably let students keep them in class after all and drop the new policy.',
    ignore: 'Our school should also have longer breaks between lessons, so that students have enough time to get from one building to another.',
  },
  {
    issue: 'free bus passes for students',
    position: 'The city should give every secondary-school student a free bus pass.',
    vague: 'Buses are an important part of city life for many people, young and old.',
    fence: 'Free bus passes would help some people in the city but not others.',
    question: 'Should secondary-school students be able to ride the city’s buses for free?',
    reason: 'Free passes would help students reach school and activities: in our class survey, one in four students said bus fares stop them from joining after-school clubs.',
    noEvidence: 'Free bus passes would make life better for everyone in the city, and it is hard to see how any reasonable person could disagree with that.',
    insult: 'City councillors who oppose free passes do not care about young people at all and are only interested in keeping their own jobs.',
    irrelevant: 'The city’s newest buses are painted bright green, and they have charging points for phones beside many of the seats near the back.',
    otherSide: 'Free passes would cost the city a great deal of money, which might have to come from other services such as parks and libraries.',
    action: 'Come to the city council meeting on 12 March and speak for two minutes in the public comment time, or sign our letter in the school office.',
    vagueAction: 'Buses matter to all of us, so everyone should keep this issue in mind and think about it over the coming months.',
    threat: 'If the city says no, young people will never trust it again, and the whole city will be ruined for the next generation and the one after it.',
    counter: 'Some councillors argue that the city cannot afford to give passes away when its budget is already stretched by many other services.',
    rebuttal: 'The cost is real, but students who ride now will be the paying adult riders of the future, and more riders mean fewer cars on the city’s crowded roads.',
    deny: 'The city can easily afford it, so the councillors are simply wrong about this, and there is no reason to look at the budget again.',
    attack: 'Councillors who say this are being selfish and short-sighted, and they would rather spend the money on projects that make them look good.',
    giveUp: 'If the city really cannot afford it, then free passes are not a good idea after all, and students should just keep paying their fares.',
    ignore: 'The city should also fix the potholes on Main Street, which have been getting deeper and wider every winter for the last five years.',
  },
  {
    issue: 'refillable water bottles instead of plastic ones',
    position: 'Our school should stop selling bottled water and install refill stations instead.',
    vague: 'Plastic is something that many people talk about, especially in schools these days.',
    fence: 'Bottled water has good and bad sides, and both deserve to be considered carefully.',
    question: 'Is selling bottled water at our school a problem, or is it a useful service for students?',
    reason: 'The change would cut waste: last month, the cleaning staff collected more than 1,200 empty bottles from our school’s bins.',
    noEvidence: 'Refill stations are just a better idea than bottled water, and most people would agree once they had thought about it.',
    insult: 'Only lazy people buy bottled water, because anyone who cared at all would remember to bring a bottle from home.',
    irrelevant: 'Water covers most of the Earth’s surface, and most of it is salt water in the oceans rather than fresh water.',
    otherSide: 'The school earns some money from selling bottled water, and it uses that money to pay for trips and sports equipment.',
    action: 'Bring a refillable bottle to school every day next week, and sign the environment club’s request to the principal at lunch on Wednesday.',
    vagueAction: 'Let’s all try to be better about plastic, and think a little more about the effect that our everyday choices have on the planet.',
    threat: 'If we keep buying plastic bottles at this school, the whole world will be buried in rubbish, and it will be entirely our own fault.',
    counter: 'Some people point out that the school earns money from selling bottled water, and that it would lose that money if the sales stopped.',
    rebuttal: 'The school does earn a little from water sales, but the parents’ association could pay for refill stations, and students would save money on bottles.',
    deny: 'The money does not matter at all, and nobody should even mention it when the future of the planet is what really counts in this debate.',
    attack: 'People who worry about the money care more about profit than about the planet, and they should be ashamed of putting cash first.',
    giveUp: 'Since the school needs the money from water sales, we should keep selling bottled water and forget about building refill stations.',
    ignore: 'The school should also plant more trees around the playing fields, so that students have some shade on hot afternoons in the summer.',
  },
  {
    issue: 'longer library opening hours',
    position: 'The school library should stay open until 6:00 p.m. on weekdays.',
    vague: 'Libraries are an important topic for every school community.',
    fence: 'Longer library hours would have both benefits and costs for the school.',
    question: 'Should the school library stay open later in the afternoon on weekdays?',
    reason: 'Many students have nowhere quiet to study at home: in our survey of 150 students, more than a third said they share a bedroom with a younger brother or sister.',
    noEvidence: 'Longer hours would be good for the whole school, and they would make the library a much better and more useful place for every student.',
    insult: 'Anyone who wants the library to close early clearly does not care about education, or about the students who need a place to study.',
    irrelevant: 'Our library has a large collection of graphic novels, which are among the most popular books that students borrow each term.',
    otherSide: 'Longer hours would mean paying library staff for more time each week, which would take money away from buying new books.',
    action: 'Fill in the library survey on the school website by Friday, and tell the librarian how you would use the extra hours.',
    vagueAction: 'Reading is important for all of us, so please remember that the next time you think about the library.',
    threat: 'If the library closes early, students’ futures will be completely ruined, and the school will have failed every one of them.',
    counter: 'Some people argue that paying staff to stay late every weekday would cost the school far too much money each year.',
    rebuttal: 'Staff time does cost money, but trained student volunteers could help run the evening hours, so only one paid member of staff would be needed.',
    deny: 'It would not cost the school anything at all, so this is not a real objection, and there is no need to answer it in this essay.',
    attack: 'The people who say this have obviously never had to study in a noisy house, so they have no idea what they are talking about.',
    giveUp: 'Because of the cost, the library should keep its present hours, and students will simply have to find somewhere else to study.',
    ignore: 'The library should also buy new chairs, because many of the old ones are broken and wobble whenever students sit on them for long.',
  },
  {
    issue: 'trees on city streets',
    position: 'The city should plant a tree on every residential street that does not have one.',
    vague: 'Trees are a part of nature that people notice every day as they walk around the city.',
    fence: 'Planting trees on city streets would have some benefits and some costs.',
    question: 'Should the city plant a tree on every residential street that does not have one yet?',
    reason: 'Trees keep streets cooler: when our science class measured the pavement at noon, it was much cooler under the trees on Park Road than on the treeless streets nearby.',
    noEvidence: 'More trees would just make the city better in every possible way, and it is obvious that everyone who lives here would be much happier with them.',
    insult: 'People who do not want more trees have no taste and no imagination, and they would be happy to live in a city made entirely of concrete.',
    irrelevant: 'Some trees can live for thousands of years, and some of the oldest living trees in the world were already old when the first cities were built.',
    otherSide: 'Tree roots can damage pavements and underground pipes, and repairing that damage can cost the city a great deal of money each year.',
    action: 'Ask your family to adopt a street tree through the city’s volunteer program, and come to the planting day at Riverside School on Saturday.',
    vagueAction: 'Trees are worth caring about, so everyone should keep them in mind whenever they think about the future of our city.',
    threat: 'Without more trees, our city will become completely unlivable within a few years, and everyone will be forced to move away.',
    counter: 'Some residents worry that the roots of new trees would crack the pavements and the pipes along their streets.',
    rebuttal: 'Roots can cause damage, but choosing small street trees with deep roots and planting them in proper tree pits greatly reduces the risk.',
    deny: 'Roots never damage anything at all, so the residents who are worried about this are simply mistaken about how trees grow.',
    attack: 'People who worry about roots just do not like nature, and they would complain about anything at all that changed their street.',
    giveUp: 'Since roots can cause damage to pavements and pipes, the city should not plant more trees on residential streets after all.',
    ignore: 'The city also needs more bicycle lanes, because cycling on the main roads is dangerous and many people are afraid to try it.',
  },
  {
    issue: 'volunteering in Grade 10',
    position: 'Every Grade 10 student should complete twenty hours of community volunteering before the end of the year.',
    vague: 'Volunteering is a topic that comes up a lot when people talk about what young people should do outside school.',
    fence: 'Required volunteering for Grade 10 students would have some advantages and some disadvantages for the school.',
    question: 'Should every Grade 10 student have to complete some community volunteering before the end of the school year?',
    reason: 'Volunteering builds skills that employers value: when our careers teacher surveyed twenty local businesses, most said they value volunteer experience.',
    noEvidence: 'Volunteering is just a good thing to do, and every student would become a better person by spending some time helping other people.',
    insult: 'Students who do not want to volunteer are selfish and lazy, and they only ever think about what they can get for themselves.',
    irrelevant: 'Some charities in our city were started more than a hundred years ago, and a few of them still work from their original buildings.',
    otherSide: 'Students already have a lot of homework, sport and family duties, and twenty more hours could leave them even more tired.',
    action: 'Sign up for one shift at the food bank this month using the form outside the library, and bring a friend with you.',
    vagueAction: 'Volunteering is worth thinking about, so keep it in mind whenever you have some free time this year.',
    threat: 'If students do not volunteer, our whole community will fall apart, and nobody will ever help anyone again.',
    counter: 'Some students argue that they have no time for volunteering on top of their homework, their sport and their part-time jobs.',
    rebuttal: 'Many students are busy, but twenty hours over a whole school year is less than an hour a week, and the hours can also be done during the holidays.',
    deny: 'Everyone has plenty of free time if they look for it, so this is not a real problem, and the school does not need to think about it.',
    attack: 'Students who say this are just lazy, and they would rather spend their evenings on their phones than help anybody else in the community.',
    giveUp: 'If students are really that busy, then volunteering should not be required in Grade 10 after all, and the idea should be dropped.',
    ignore: 'The school should also hold more dances and social events, so that students in different grades can get to know each other.',
  },
  {
    issue: 'a longer lunch break',
    position: 'Our school should lengthen the lunch break from thirty to forty-five minutes.',
    vague: 'Lunch breaks are something that students talk about a lot at our school.',
    fence: 'A longer lunch break would have both good and bad effects on the school day.',
    question: 'Is our thirty-minute lunch break really long enough for every student to eat?',
    reason: 'A longer break would let everyone eat properly: last week, the student council counted over fifty students still queuing for lunch when the bell rang.',
    noEvidence: 'A longer lunch would be much nicer for everyone, and it is obvious that students would be happier and calmer in the afternoon.',
    insult: 'Whoever made the lunch break so short clearly does not care about students at all and has never had to queue for food.',
    irrelevant: 'Rice is eaten by billions of people around the world every day, and it is grown on every continent except Antarctica.',
    otherSide: 'A longer lunch break would make the school day end later, which would cut into the time students have for sport, jobs and homework.',
    action: 'Come to the student council meeting on Tuesday to sign our proposal, and tell your class representative how long you usually wait in the queue.',
    vagueAction: 'Think about lunch and how it affects you, and talk about it with your friends whenever you get the chance this term.',
    threat: 'If the break stays short, students will starve, and our school will become the worst place in the whole country to study.',
    counter: 'Some teachers worry that a longer lunch break would push the end of the school day later for every student and teacher.',
    rebuttal: 'The day would end fifteen minutes later, but students who have eaten properly concentrate better in the afternoon, so less lesson time would be wasted.',
    deny: 'The school day would not end any later at all, so this worry is not worth discussing, and the teachers have simply got their facts wrong.',
    attack: 'Teachers who worry about this just want to go home early, and they care far more about their own afternoons than about their students.',
    giveUp: 'Since the school day would end later, we should probably keep the short lunch break after all and forget about changing it this year.',
    ignore: 'The school should also repaint the hallways, because the walls are badly scratched and the paint has faded since the building opened.',
  },
  {
    issue: 'idling cars outside the school',
    position: 'Drivers should switch off their engines while they wait outside our school.',
    vague: 'Cars are part of everyday life for most families at our school.',
    fence: 'Leaving engines running outside the school has some good and some bad sides.',
    question: 'Is leaving engines running outside the school gate really a problem?',
    reason: 'Idling engines fill the air with exhaust: when our science club tested the air at the school gate, it was much dirtier at pick-up time than at midday.',
    noEvidence: 'Switching off engines is just the right thing to do, and every driver who thinks about it for even a moment will know that this is true.',
    insult: 'Drivers who leave their engines running are thoughtless, selfish people who never think about anybody except themselves.',
    irrelevant: 'Some cars can now park themselves, using cameras and sensors that measure the space around them while the driver watches.',
    otherSide: 'In cold weather, drivers want to keep their cars warm while they wait, especially when they have small children sitting in the back seat.',
    action: 'This week, ask whoever drives you to school to switch off the engine while waiting, and sign the science club’s pledge at the front office.',
    vagueAction: 'Let’s all be more careful about the way we use our cars, and try to think about the people around us every day.',
    threat: 'If drivers keep their engines running, everyone at our school will get sick, and the gate will become the most dangerous place in town.',
    counter: 'Some drivers say they need to keep their engines running to stay warm while they wait at the gate on winter mornings.',
    rebuttal: 'Cold mornings are uncomfortable, but a car stays warm for several minutes with the engine off, and most drivers wait for only a few minutes.',
    deny: 'Nobody really needs to stay warm for a few minutes, so this excuse is simply wrong and is not worth answering in a serious essay.',
    attack: 'Drivers who say this only care about their own comfort, and they do not mind if the students breathe in their exhaust every afternoon.',
    giveUp: 'Since drivers get cold in winter, they should be allowed to keep their engines running while they wait at the gate after all.',
    ignore: 'The school also needs a bigger car park, because parents often have to wait on the road when all of the spaces are taken.',
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
  nervous: 'NAME was very nervous before the audition, and {he} felt more and more nervous with every minute that passed.',
  angry: 'NAME was really angry about what had happened, angrier than {he} had ever been in {his} whole life.',
  exhausted: 'NAME was completely exhausted after the long day, and {he} felt more tired than {he} had ever felt before.',
  excited: 'NAME felt very excited about the visit, more excited than {he} had been about anything for months.',
  embarrassed: 'NAME was really embarrassed in front of the whole class, more embarrassed than {he} had ever been.',
  proud: 'NAME was very proud of winning the competition, and {he} felt prouder than ever before in {his} life.',
  cold: 'NAME was very cold standing outside in the wind, and {he} felt colder and colder as the minutes went by.',
  scared: 'NAME was really scared in the dark, empty house, more frightened than {he} had ever been before.',
  bored: 'NAME was really bored in the long lesson, as bored as {he} had ever been in any class at school.',
  lonely: 'NAME felt very lonely at the new school, lonelier than {he} had ever felt anywhere in {his} life.',
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
  { plain: 'The market was busy.', vivid: 'Traders shouted prices over the hiss of frying plantains, and the air smelled of smoke and ripe mangoes.', vague: 'The market was very, very busy, and it was really, really crowded with lots and lots of people.', tell: 'The market was busy and interesting, and I liked it a lot because there was so much going on.', irrelevant: 'The market opens at seven o’clock every morning and closes at six, except on public holidays.' },
  { plain: 'The storm was bad.', vivid: 'Rain hammered on the tin roof, and every flash of lightning lit the rattling windows white.', vague: 'The storm was really, really bad, and it was much worse than any storm we had had before.', tell: 'The storm was bad, and it was very scary for everyone in the house that night.', irrelevant: 'Storms are more common in some seasons than in others, especially in the late summer.' },
  { plain: 'The kitchen smelled nice.', vivid: 'Cinnamon and warm butter drifted from the oven, and the window had fogged over with steam.', vague: 'The kitchen smelled very nice indeed, really very nice, nicer than it usually smelled.', tell: 'The kitchen smelled nice, and I was happy to be there while the food was cooking.', irrelevant: 'The kitchen was painted yellow last year, and the cupboards were replaced the year before.' },
  { plain: 'The beach was hot.', vivid: 'The sand burned our bare feet, and the air shimmered above the bright, glaring water.', vague: 'The beach was extremely hot, really very hot, much hotter than it had been all week.', tell: 'The beach was hot, and it was uncomfortable to stay there for very long that day.', irrelevant: 'The beach is about forty minutes from the city by car, or about an hour by bus.' },
  { plain: 'The train station was crowded.', vivid: 'Elbows and suitcases jostled us toward the platform, and a voice crackled announcements no one could understand.', vague: 'The train station was very crowded, really extremely crowded, more crowded than we had ever seen it.', tell: 'The train station was crowded, which was really annoying, and I did not enjoy being there at all that day.', irrelevant: 'The station was built more than a hundred years ago and has been repainted many times since then.' },
  { plain: 'The forest was quiet at night.', vivid: 'Only a twig snapped somewhere in the dark, and the cold air smelled of pine and wet earth.', vague: 'The forest was so quiet at night, really very quiet, much quieter than it was in the day.', tell: 'The forest was quiet at night, and it felt strange and a little bit uncomfortable to be there.', irrelevant: 'The forest covers about half of the national park and is home to several kinds of deer.' },
  { plain: 'The stadium was loud.', vivid: 'Drums thundered from the stands, and forty thousand voices roared as the ball hit the net.', vague: 'The stadium was extremely loud, really very loud, louder than any place I had ever been.', tell: 'The stadium was loud, and the atmosphere was great, so I enjoyed every minute of the match.', irrelevant: 'The stadium has a car park on its north side and a railway station on its south side.' },
  { plain: 'The bakery was warm.', vivid: 'Heat rolled from the brick oven, and the smell of fresh bread wrapped around us as the door jingled shut.', vague: 'The bakery was very warm, really very warm indeed, much warmer than the street outside it.', tell: 'The bakery was warm, and I liked being there because it was such a nice, comfortable place.', irrelevant: 'The bakery is closed on Mondays and opens at six o’clock on every other morning of the week.' },
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
  'Hi, my name is NAME, and I am going to tell you a story about something that happened to me last year.',
  'One day I woke up, brushed my teeth, ate my breakfast and then walked to school as I always do.',
  'The dictionary defines courage as “the ability to do something that frightens one.”',
  'This is a story about a person who finds something unusual and has to decide what to do with it.',
  'It was a normal day in a normal town, and nothing much was happening anywhere at all.',
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

