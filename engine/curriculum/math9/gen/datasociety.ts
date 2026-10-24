/** Math 9 Unit 10 — Data Analysis and Probability in Society (SP1, SP2, SP3, SP4). */
import { fixedChoice, mc, numPart, retry, skill } from '../../helpers.ts';
import { fmt, fmtFixed, gcd } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { AnswerSpec, Choice, Difficulty, Figure, Part, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const NAMES = [
  'Amara', 'Jordan', 'Priya', 'Mateo', 'Aiyana', 'Kwame', 'Mei', 'Hamid', 'Sofia', 'Liam', 'Fatima', 'Raj',
  'Chloé', 'Tariq', 'Olivia', 'Ethan', 'Wei', 'Nadia', 'Darius', 'Talia', 'Malik', 'Simran', 'Jun', 'Isabelle',
  'Owen', 'Zainab', 'Kai', 'Ayesha', 'Mason', 'Grace', 'Emeka', 'Rosa', 'Dakota', 'Arjun', 'Hana', 'Lucas',
  'Yusuf', 'Maya', 'Kiona', 'Tyler', 'Ananya', 'Nathan', 'Lena', 'Diego', 'Harpreet', 'Noor',
];

type Out = { prompt: string; parts: Part[]; hints: string[]; solution: string[]; figure?: Figure; answerDisplay?: string; calculator?: boolean };
type Lvl = Difficulty;

const sum = (a: number[]) => a.reduce((s, x) => s + x, 0);
const fr = (n: number, d: number) => `\\frac{${n}}{${d}}`;
function frLow(n: number, d: number): string {
  const g = gcd(n, d) || 1;
  return d / g === 1 ? `${n / g}` : fr(n / g, d / g);
}
/** True when a value sits near a rounding boundary at one decimal place (x.x5). */
function onEdge(v: number): boolean {
  const t = Math.abs(v) * 10;
  return Math.abs(t - Math.floor(t) - 0.5) < 0.06;
}
const lc = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);
/** Money in prose: \$36.00. Never inside $...$. */
const money = (x: number) => `\\$${fmtFixed(x, 2)}`;

/** An order question: items shown shuffled, answer in the given order. */
function orderAnswer(rng: Rng, steps: string[]): AnswerSpec {
  const shown = retry(() => rng.shuffle(steps), (s) => s.some((x, i) => x !== steps[i]), 50);
  const items: Choice[] = shown.map((md, i) => ({ id: 'abcdefgh'[i], md }));
  return { kind: 'order', items, correctOrder: steps.map((st) => items[shown.indexOf(st)].id) };
}

// ---------------------------------------------------------------------------
// 10.1 Factors affecting data collection
// ---------------------------------------------------------------------------

type Factor = 'bias' | 'language' | 'ethics' | 'cost' | 'time' | 'privacy' | 'culture';
const FACTORS: Factor[] = ['bias', 'language', 'ethics', 'cost', 'time', 'privacy', 'culture'];
const FACTOR_NAME: Record<Factor, string> = {
  bias: 'Bias', language: 'Use of language', ethics: 'Ethics', cost: 'Cost', time: 'Time and timing', privacy: 'Privacy', culture: 'Cultural sensitivity',
};
const FACTOR_DEF: Record<Factor, string> = {
  bias: '**Bias**: the way the data is collected favours some answers or some people over others.',
  language: '**Use of language**: the wording of a question pushes people toward an answer or is hard to understand.',
  ethics: '**Ethics**: the data collection is dishonest or unfair, or it could harm people.',
  cost: '**Cost**: collecting the data costs too much money.',
  time: '**Time and timing**: collecting the data takes too long, or it happens at a time that changes the answers.',
  privacy: '**Privacy**: people must share personal information they may want to keep private, or their answers are not kept private.',
  culture: '**Cultural sensitivity**: the question or the way it is asked does not respect people’s cultures, beliefs or traditions.',
};
/** Factors that could also describe a scenario are never offered as its wrong answers. */
const CLASH: Record<Factor, Factor[]> = {
  bias: ['language', 'time'],
  language: ['bias'],
  ethics: ['privacy', 'culture'],
  privacy: ['ethics', 'bias'],
  culture: ['ethics', 'language', 'bias'],
  cost: ['time'],
  time: ['cost', 'bias'],
};

interface Scenario { f: Factor; text: string; why: string; fix: string }

const SCENARIOS: Scenario[] = [
  { f: 'bias', text: 'To find out whether people in a city want a new hockey arena, a group surveys only fans leaving a hockey game.', why: 'Hockey fans are more likely to want an arena, so the results will favour “yes”.', fix: 'Survey people chosen at random from all over the city.' },
  { f: 'bias', text: 'The student council wants to know which new club students would join. It surveys only the members of the robotics club.', why: 'Robotics club members already like robotics, so the results will favour clubs like theirs.', fix: 'Survey students chosen at random from every grade.' },
  { f: 'bias', text: 'To find out how much time Grade 9 students spend reading for fun, Omar surveys students at the public library on a Saturday.', why: 'Students at the library probably read more than most students.', fix: 'Survey Grade 9 students chosen at random from the school list.' },
  { f: 'bias', text: 'A gym wants to know if people in its city exercise enough, so it surveys its own members.', why: 'Gym members exercise more than most people, so the results will look too good.', fix: 'Survey residents chosen at random from all over the city.' },
  { f: 'language', text: 'A survey asks: “Don’t you agree that the cafeteria’s greasy fries should be replaced with healthy salads?”', why: 'The words “greasy”, “healthy” and “Don’t you agree” push people toward one answer.', fix: 'Ask: “Which side would you rather have in the cafeteria: fries or salad?”' },
  { f: 'language', text: 'A survey asks: “Should the town waste money on a new skatepark?”', why: 'The word “waste” pushes people to say no.', fix: 'Ask: “Should the town build a new skatepark? (Yes / No / Not sure)”' },
  { f: 'language', text: 'A survey asks: “Most students want school to start later. Do you agree?”', why: 'Telling people what “most students” think pushes them to agree.', fix: 'Ask: “What time would you like school to start?”' },
  { f: 'language', text: 'A survey for Grade 7 students asks: “Do you concur that the inclement-weather cancellation protocol is efficacious?”', why: 'The words are too hard, so students may answer without understanding the question.', fix: 'Ask in plain words: “Does the school do a good job of telling you when buses are cancelled for bad weather?”' },
  { f: 'ethics', text: 'A company tells people its survey is about healthy eating, but it really uses the answers to sell them diet products.', why: 'The company is not honest about how the answers will be used.', fix: 'Tell people the true purpose of the survey before they agree to answer.' },
  { f: 'ethics', text: 'For a project, a student changes some of the survey answers so the results support her prediction.', why: 'Changing data is dishonest, so the results cannot be trusted.', fix: 'Report the answers exactly as they were given.' },
  { f: 'ethics', text: 'To study how students react to stress, a group sets off a fake fire alarm and records how younger students react.', why: 'The experiment could frighten or harm people who did not agree to take part.', fix: 'Use a safe method, such as an anonymous survey about stress, that people agree to answer.' },
  { f: 'ethics', text: 'A class tells students they will lose recess if they do not fill in the class survey.', why: 'People are forced to take part, which is unfair.', fix: 'Let students choose freely whether to answer.' },
  { f: 'cost', text: 'To learn what every adult in the country thinks about daylight saving time, a Grade 9 class plans to mail a printed survey with a stamped return envelope to every home in the country.', why: 'Printing and postage for every home in the country would cost far more than a class can pay.', fix: 'Survey a random sample of adults instead of every home.' },
  { f: 'cost', text: 'To find out how long a brand of phone battery lasts, a student plans to buy $500$ new phones and test them all.', why: 'Buying $500$ phones would cost far too much money.', fix: 'Test a small sample of phones, or use test results the company has already published.' },
  { f: 'cost', text: 'A school club wants to interview every junior hockey coach in Canada in person by flying to each city.', why: 'The plane tickets would cost far too much.', fix: 'Interview a sample of coaches by video call or with an online survey.' },
  { f: 'time', text: 'A survey asks the people of a city about their favourite outdoor summer activity in the middle of a January cold snap.', why: 'In a cold snap, people may not be thinking about summer, so the timing can change the answers.', fix: 'Do the survey in late spring or summer.' },
  { f: 'time', text: 'Right after a news story about a school bus accident, a group surveys parents about whether school buses are safe.', why: 'The news story is fresh in people’s minds, so the timing can change the answers.', fix: 'Wait until the news is not so recent, or survey at several different times.' },
  { f: 'time', text: 'A student plans to measure the height of every tree in a provincial park by hand before her project is due next week.', why: 'Measuring every tree would take far longer than one week.', fix: 'Measure a random sample of trees in the park.' },
  { f: 'time', text: 'A survey about whether students like the new school timetable is given on the first morning of school, before anyone has tried it.', why: 'Students have not used the timetable yet, so it is the wrong time to ask.', fix: 'Give the survey after students have used the timetable for a few weeks.' },
  { f: 'privacy', text: 'A survey for a class project asks students to write their name, home address and family income.', why: 'Address and income are personal information that people may not want to share.', fix: 'Leave out names and addresses, and ask only what is needed to answer the question.' },
  { f: 'privacy', text: 'A teacher posts each student’s answers to a health survey on the classroom wall, with their names.', why: 'Health information is personal, and the answers are not kept private.', fix: 'Keep the answers private and report only totals, with no names.' },
  { f: 'privacy', text: 'A survey about cheating on tests asks each student to write their name at the top.', why: 'Students will not want their names linked to personal answers, so many will not answer honestly.', fix: 'Make the survey anonymous: no names.' },
  { f: 'culture', text: 'A survey asks every student in a school what they will get for Christmas, but some students do not celebrate Christmas.', why: 'The question assumes everyone shares one tradition.', fix: 'Ask: “Which holidays or celebrations, if any, does your family enjoy?”' },
  { f: 'culture', text: 'A survey about favourite cafeteria meals lists only pork dishes, at a school where some students do not eat pork for religious reasons.', why: 'The choices do not respect some students’ beliefs.', fix: 'Include choices that all students can eat, and an “Other” option.' },
  { f: 'culture', text: 'A survey about family traditions includes a joke about one group’s traditional clothing.', why: 'Making fun of a culture is disrespectful and may upset people.', fix: 'Remove the joke and use respectful wording.' },
];

const WRONG_FIXES = [
  'Ask the same people again, using the same question.',
  'Make the survey longer by adding more questions.',
  'Keep the plan the same, but round the results to the nearest ten.',
  'Keep the plan the same, but show the results in a circle graph.',
];

const FACTOR_LIST = 'Bias: who is asked. Use of language: how the question is worded. Ethics: honesty, fairness and harm. Cost: money. Time and timing: how long it takes and when it happens. Privacy: personal information. Cultural sensitivity: respect for cultures and beliefs.';

function factorChoices(rng: Rng, f: Factor, n: number): AnswerSpec {
  const pool = FACTORS.filter((x) => x !== f && !CLASH[f].includes(x));
  return mc(rng, FACTOR_NAME[f], rng.sample(pool, n - 1).map((x) => FACTOR_NAME[x]));
}

const NEUTRAL: Array<{ topic: string; fair: string; leading: string[] }> = [
  { topic: 'the school’s new later start time', fair: 'What do you think of the new 9:00 a.m. start time?', leading: ['Don’t you love sleeping in with the new start time?', 'Isn’t the new start time a big mistake?', 'Most teachers dislike the new start time. Do you?'] },
  { topic: 'a ban on cell phones in class', fair: 'Do you support or oppose a ban on cell phones in class?', leading: ['Should the school take away students’ phones like a prison?', 'Don’t you agree that phones ruin learning?', 'Experts say phones distract students. Do you support a ban?'] },
  { topic: 'the menu at the year-end party', fair: 'Which food would you like at the year-end party: pizza, tacos or burgers?', leading: ['Would you like delicious pizza or boring tacos?', 'Pizza is everyone’s favourite. Do you want pizza?', 'Don’t you think burgers are too messy for a party?'] },
  { topic: 'a new dog park in town', fair: 'Should the town build a dog park? (Yes / No / Not sure)', leading: ['Should the town spend tax money on a dog park when roads need fixing?', 'Wouldn’t a dog park make the town a happier place?', 'Every dog owner wants a dog park. Do you agree?'] },
  { topic: 'how students get to school', fair: 'How do you usually get to school?', leading: ['Do you walk to school like a healthy person should?', 'Don’t you think driving to school is lazy?', 'Most students take the bus. Do you take the bus too?'] },
];

function collectIdentify(rng: Rng, d: Lvl): Out {
  const s = rng.pick(SCENARIOS);
  return {
    prompt: `${s.text} Which factor is the **main** problem with this data collection?`,
    parts: [{ answer: factorChoices(rng, s.f, d === 1 ? 3 : 4) }],
    hints: ['Ask: Who is asked? How is the question worded? Is it honest and fair? Is it too costly or slow, or at a bad time? Is personal information protected? Is it respectful?', FACTOR_LIST],
    solution: [s.why, `This is a problem of ${lc(FACTOR_DEF[s.f])}`, `The answer is **${FACTOR_NAME[s.f]}**.`],
    answerDisplay: FACTOR_NAME[s.f],
  };
}

function collectNeutral(rng: Rng, name: string): Out {
  const q = rng.pick(NEUTRAL);
  return {
    prompt: `${name} is writing a survey about ${q.topic}. Which question is the most neutral (does not lead people toward an answer)?`,
    parts: [{ answer: mc(rng, q.fair, q.leading) }],
    hints: ['A leading question uses loaded words, gives an opinion, or tells you what others think.', 'Look for the question that lets people answer any way without feeling pushed.'],
    solution: ['A **leading question** pushes people toward one answer with loaded words (“delicious”, “boring”, “lazy”), opinions, or claims about what others think.', 'Each of the other questions does one of these things.', `The neutral question is: “${q.fair}”`],
    answerDisplay: q.fair,
  };
}

function collectFix(rng: Rng): Out {
  const s = rng.pick(SCENARIOS);
  return {
    prompt: `${s.text} (a) Which factor is the main problem? (b) Which change would best fix it?`,
    parts: [{ label: '(a)', answer: factorChoices(rng, s.f, 4) }, { label: '(b)', answer: mc(rng, s.fix, rng.sample(WRONG_FIXES, 3)) }],
    hints: ['First name the problem. Then pick the change that removes that exact problem.', FACTOR_DEF[s.f]],
    solution: [s.why, `(a) ${FACTOR_NAME[s.f]}: ${lc(FACTOR_DEF[s.f].replace(/\*\*[^*]+\*\*: /, ''))}`, `(b) ${s.fix} The other choices leave the problem in place.`],
  };
}

const collectionIssues = skill({
  id: 'm9-data-collection-issues',
  name: 'Factors affecting data collection',
  description: 'Identify bias, use of language, ethics, cost, time and timing, privacy and cultural sensitivity issues in collecting data, and suggest a fix.',
  outcomes: ['SP1'],
  lessonId: 'm9-10-1',
  format: 'mc',
  gen(rng, d) {
    const name = rng.pick(NAMES);
    if (d === 1) return collectIdentify(rng, 1);
    if (d === 2) return rng.chance(0.6) ? collectIdentify(rng, 2) : collectNeutral(rng, name);
    return collectFix(rng);
  },
});

// ---------------------------------------------------------------------------
// 10.2 Populations and samples
// ---------------------------------------------------------------------------

type Reason = 'small' | 'every' | 'large' | 'destroy';
const REASON: Record<Reason, string> = {
  small: 'Population, because the group is small and easy to reach.',
  every: 'Population, because information is needed about every single member.',
  large: 'Sample, because the population is too large to reach everyone in a reasonable time and cost.',
  destroy: 'Sample, because testing an item uses it up or destroys it.',
};
const WRONG_REASON = ['Population, because a sample is always biased.', 'Sample, because a census always gives wrong results.'];

const POP_SAMPLE: Array<{ text: string; r: Reason; why: string }> = [
  { text: 'the average height of the $26$ students in your class', r: 'small', why: 'There are only $26$ students, and they are all in one room.' },
  { text: 'which evening the $12$ members of a book club can meet', r: 'small', why: 'Only $12$ people need to be asked, and they meet together.' },
  { text: 'the shoe size of each player on the school basketball team, to order new team shoes', r: 'every', why: 'Every player needs shoes that fit, so every size is needed.' },
  { text: 'the allergies of every student going on the Grade 9 overnight camping trip', r: 'every', why: 'Missing even one student’s allergy could be dangerous.' },
  { text: 'whether every parachute packed for a skydiving club’s jumps is safe', r: 'every', why: 'One unsafe parachute could cost a life, so each one must be checked.' },
  { text: 'the favourite breakfast cereal of teenagers in Canada', r: 'large', why: 'There are millions of teenagers in Canada, far too many to ask.' },
  { text: 'the number of hours of sleep high school students across the country get on school nights', r: 'large', why: 'There are many thousands of high school students in the country.' },
  { text: 'the opinion of voters in a large city about a new transit line', r: 'large', why: 'Asking every voter in a large city would take too long and cost too much.' },
  { text: 'how long the light bulbs made in a factory last before burning out', r: 'destroy', why: 'A bulb tested until it burns out cannot be sold.' },
  { text: 'whether a batch of $5000$ granola bars from a bakery tastes right', r: 'destroy', why: 'A granola bar that is tasted cannot be sold.' },
  { text: 'how much force it takes to break the hockey sticks made by a company', r: 'destroy', why: 'Each stick tested is broken, so only a few can be tested.' },
];

function popOrSample(rng: Rng, d: Lvl, name: string): Out {
  const s = rng.pick(POP_SAMPLE);
  const pop = s.r === 'small' || s.r === 'every';
  if (d === 1) {
    return {
      prompt: `${name} wants to collect data about ${s.text}. Should ${name} use the whole population (a census) or a sample?`,
      parts: [{ answer: fixedChoice(['The whole population (a census)', 'A sample'], pop ? 0 : 1) }],
      hints: ['A census collects data from every member of the population. A sample uses only part of it.', 'Use a sample when the population is very large or when testing destroys the items. Use the population when it is small or every member matters.'],
      solution: [s.why, REASON[s.r].replace(/^(Population|Sample), because /, (_m, w: string) => `${w === 'Population' ? 'Use the population' : 'Use a sample'}: `), `The answer is **${pop ? 'the whole population (a census)' : 'a sample'}**.`],
      answerDisplay: pop ? 'The whole population (a census)' : 'A sample',
    };
  }
  const other = pop ? (['large', 'destroy'] as Reason[]) : (['small', 'every'] as Reason[]);
  const ds = [...other.map((r) => REASON[r]), pop ? WRONG_REASON[0] : WRONG_REASON[1]];
  return {
    prompt: `${name} wants to collect data about ${s.text}. Which choice and reason are best?`,
    parts: [{ answer: mc(rng, REASON[s.r], ds) }],
    hints: ['Is the population small or huge? Does every member matter? Does testing destroy what is tested?', 'A census collects data from every member; a sample uses part of the population.'],
    solution: [s.why, `The best answer: ${REASON[s.r]}`],
    answerDisplay: REASON[s.r],
  };
}

type Method = 'random' | 'systematic' | 'stratified' | 'cluster' | 'convenience' | 'voluntary';
const METHOD_NAME: Record<Method, string> = {
  random: 'Simple random sample', systematic: 'Systematic sample', stratified: 'Stratified sample', cluster: 'Cluster sample', convenience: 'Convenience sample', voluntary: 'Voluntary response sample',
};
const METHOD_DEF: Record<Method, string> = {
  random: 'In a **simple random sample**, every member of the population has the same chance of being chosen.',
  systematic: 'In a **systematic sample**, members are chosen from a list or a line at a regular interval, such as every 10th person.',
  stratified: 'In a **stratified sample**, the population is split into groups (such as grades), and members are chosen at random from **each** group in proportion to its size.',
  cluster: 'In a **cluster sample**, the population is split into groups (such as homerooms), some whole groups are chosen at random, and **everyone** in those groups is surveyed.',
  convenience: 'In a **convenience sample**, the people who are easiest to reach are chosen.',
  voluntary: 'In a **voluntary response sample**, people choose themselves by deciding to answer.',
};
const METHOD_DESC: Array<{ m: Method; text: string }> = [
  { m: 'random', text: 'The student council puts the names of all $600$ students into a computer and has it choose $60$ names at random.' },
  { m: 'random', text: 'A coach writes each player’s name on a slip of paper, mixes the slips in a hat and draws $5$ names.' },
  { m: 'systematic', text: 'A grocery store in a small town surveys every $20$th customer who walks through the door.' },
  { m: 'systematic', text: 'Using the alphabetical school list, Nadia chooses the $3$rd name and then every $8$th name after it.' },
  { m: 'stratified', text: 'A junior high chooses students at random from Grade 7, Grade 8 and Grade 9, with the number from each grade in proportion to the size of that grade.' },
  { m: 'stratified', text: 'A town surveys a random $5\\%$ of the households in each of its neighbourhoods.' },
  { m: 'cluster', text: 'A school chooses $3$ of its $24$ homerooms at random and surveys every student in those $3$ homerooms.' },
  { m: 'cluster', text: 'A city picks $5$ city blocks at random and surveys every household on those blocks.' },
  { m: 'convenience', text: 'Jasmine surveys the first $30$ students she sees in the hallway.' },
  { m: 'convenience', text: 'A reporter asks the people walking past the TV station.' },
  { m: 'voluntary', text: 'A radio station asks listeners to text in their opinion.' },
  { m: 'voluntary', text: 'A website posts a poll that anyone who visits can answer.' },
];
const REP_ANSWER = [
  'Yes. Every member of the population has a fair chance to be chosen.',
  'No. Only people who are easy to reach are chosen.',
  'No. People choose themselves, so people with strong opinions are more likely to answer.',
];
const repIndex = (m: Method) => (m === 'convenience' ? 1 : m === 'voluntary' ? 2 : 0);

function methodName(rng: Rng): Out {
  const s = rng.pick(METHOD_DESC);
  const others = rng.sample((Object.keys(METHOD_NAME) as Method[]).filter((m) => m !== s.m), 3);
  return {
    prompt: `${s.text} Which sampling method is this?`,
    parts: [{ answer: mc(rng, METHOD_NAME[s.m], others.map((m) => METHOD_NAME[m])) }],
    hints: ['Ask: Who decides who is in the sample? Is it chance, a regular pattern, groups, ease, or the people themselves?', 'Stratified: some from **every** group. Cluster: **all** of some groups.'],
    solution: [METHOD_DEF[s.m], `The answer is: ${METHOD_NAME[s.m]}.`],
    answerDisplay: METHOD_NAME[s.m],
  };
}

const PLANS: Array<{ goal: string; good: string; bad: string[] }> = [
  { goal: 'what all the students at a large city high school think of the new cafeteria menu', good: 'Choose $80$ students at random from the list of all students.', bad: ['Ask $80$ students in line at the cafeteria.', 'Put a poll on the school website and use whatever answers come in.', 'Ask every student in the Grade 12 homerooms.'] },
  { goal: 'how the residents of a city feel about a new bike lane', good: 'Phone $400$ households chosen at random from all parts of the city.', bad: ['Ask $400$ people at a cycling race.', 'Ask readers of a cycling blog to answer an online poll.', 'Ask the $50$ people who live on the street where the bike lane will go.'] },
  { goal: 'which new sport the Grade 7 to 9 students at a junior high want in gym class', good: 'Choose students at random from each grade, in proportion to the size of each grade.', bad: ['Ask the students on the volleyball team.', 'Leave a sheet in the gym for anyone who wants to give an opinion.', 'Ask the first $30$ Grade 9 students who arrive at school.'] },
  { goal: 'how happy customers are with a pizza shop’s delivery', good: 'Call every $10$th customer on the list of all delivery orders from the past month.', bad: ['Ask only the customers who left a comment on the shop’s website.', 'Ask the shop’s own delivery drivers.', 'Ask only the customers who order on Friday night.'] },
  { goal: 'how many hours a week teens across the country spend on screens', good: 'Choose schools at random from all over the country, then survey a random sample of students in each one.', bad: ['Survey teens at a video game store.', 'Post a poll on a gaming website.', 'Survey only the students in your own class.'] },
];

function planChoice(rng: Rng, name: string): Out {
  const p = rng.pick(PLANS);
  return {
    prompt: `${name} wants to find out ${p.goal}. Which plan gives a **representative** sample?`,
    parts: [{ answer: mc(rng, p.good, p.bad) }],
    hints: ['A representative sample is like a small copy of the whole population.', 'Avoid samples that leave out part of the population, pick people who are easy to reach, or let people choose themselves.'],
    solution: ['A **representative sample** has the same mix of people as the whole population, so random selection from the whole population works best.', 'The other plans leave out groups, use people who are easy to reach, or let people choose themselves.', `The representative plan: ${p.good}`],
    answerDisplay: p.good,
  };
}

function methodAndRep(rng: Rng): Out {
  const s = rng.pick(METHOD_DESC);
  const others = rng.sample((Object.keys(METHOD_NAME) as Method[]).filter((m) => m !== s.m), 3);
  return {
    prompt: `${s.text} (a) Which sampling method is this? (b) Is it likely to give a representative sample?`,
    parts: [{ label: '(a)', answer: mc(rng, METHOD_NAME[s.m], others.map((m) => METHOD_NAME[m])) }, { label: '(b)', answer: fixedChoice(REP_ANSWER, repIndex(s.m)) }],
    hints: ['Name the method first: chance, a regular pattern, groups, ease, or people choosing themselves.', 'Random, systematic, stratified and cluster samples give everyone a fair chance. Convenience and voluntary samples do not.'],
    solution: [METHOD_DEF[s.m], `(a) ${METHOD_NAME[s.m]}. (b) ${REP_ANSWER[repIndex(s.m)]}`],
  };
}

function stratified(rng: Rng): Out {
  const k = rng.pick([4, 5, 10, 20]);
  const grades = ['Grade 7', 'Grade 8', 'Grade 9'];
  const sizes = retry(() => grades.map(() => k * rng.int(Math.ceil(120 / k), Math.floor(320 / k))), (s) => new Set(s).size === 3, 100);
  const total = sum(sizes);
  const n = total / k;
  const i = rng.int(0, 2);
  const j = (i + rng.int(1, 2)) % 3;
  const school = rng.pick(['Westwood Junior High', 'Northgate School', 'Prairie View School', 'Valley View Junior High']);
  return {
    prompt: `${school} has $${sizes[0]}$ Grade 7, $${sizes[1]}$ Grade 8 and $${sizes[2]}$ Grade 9 students. The principal wants a stratified sample of $${n}$ students, with each grade represented in proportion to its size. How many students should be chosen from (a) ${grades[i]} and (b) ${grades[j]}?`,
    parts: [numPart(sizes[i] / k, { label: `(a) ${grades[i]}`, suffix: 'students' }), numPart(sizes[j] / k, { label: `(b) ${grades[j]}`, suffix: 'students' })],
    hints: ['Find the total number of students. What fraction of all the students will be in the sample?', `Each grade gets the same fraction: (students in the grade) $\\times \\dfrac{${n}}{\\text{total}}$.`],
    solution: [
      `Total: $${sizes.join(' + ')} = ${total}$ students.`,
      `The sample is $${fr(n, total)} = ${frLow(n, total)}$ of the school.`,
      `${grades[i]}: $${sizes[i]} \\times ${frLow(n, total)} = ${sizes[i] / k}$`,
      `${grades[j]}: $${sizes[j]} \\times ${frLow(n, total)} = ${sizes[j] / k}$`,
      `(a) $${sizes[i] / k}$ students. (b) $${sizes[j] / k}$ students.`,
    ],
    calculator: true,
  };
}

const populationSample = skill({
  id: 'm9-population-sample',
  name: 'Populations and samples',
  description: 'Decide whether to use a population or a sample, name a sampling method, and choose a sample that represents the population.',
  outcomes: ['SP2'],
  lessonId: 'm9-10-2',
  format: 'mc',
  gen(rng, d) {
    const name = rng.pick(NAMES);
    if (d === 1) return rng.chance(0.55) ? popOrSample(rng, 1, name) : methodName(rng);
    if (d === 2) {
      const k = rng.pick(['pop', 'plan', 'plan'] as const);
      return k === 'pop' ? popOrSample(rng, 2, name) : planChoice(rng, name);
    }
    return rng.chance(0.5) ? stratified(rng) : methodAndRep(rng);
  },
});

// ---------------------------------------------------------------------------
// 10.3 Developing a project plan
// ---------------------------------------------------------------------------

const STEP = {
  question: 'Write a clear question to investigate.',
  method: 'Choose a data-collection method, thinking about bias, privacy and other social issues.',
  who: 'Decide whether to use a population or a sample, and choose who will take part.',
  collect: 'Collect the data.',
  display: 'Organize the data and display it in a suitable graph or table.',
  conclude: 'Analyze the data and draw conclusions that answer the question.',
};

const PROJECTS: Array<{ topic: string; steps: string[] }> = [
  {
    topic: 'how much Grade 9 students at the school sleep on school nights',
    steps: [
      'Write the question: “How many hours of sleep do Grade 9 students at our school get on school nights?”',
      'Choose $40$ Grade 9 students at random from the school list.',
      'Give each chosen student an anonymous survey and collect the answers.',
      'Make a bar graph of how many students sleep each number of hours.',
      'Find the mean and the mode, and write a conclusion that answers the question.',
    ],
  },
  {
    topic: 'whether the temperature of water changes how fast sugar dissolves',
    steps: [
      'Write the question: “Does sugar dissolve faster in warmer water?”',
      'Plan an experiment: the same amount of sugar in the same amount of water at four different temperatures.',
      'Time how long the sugar takes to dissolve, three times at each temperature.',
      'Make a line graph of the mean dissolving time at each temperature.',
      'Describe the pattern in the graph and answer the question.',
    ],
  },
  {
    topic: 'how the number of students at the school has changed over the last ten years',
    steps: [
      'Write the question: “How has our school’s enrolment changed over the last ten years?”',
      'Ask the school office for the total enrolment for each year (no names needed).',
      'Record the total for each year in a table.',
      'Make a line graph of enrolment by year.',
      'Describe the trend and answer the question.',
    ],
  },
  {
    topic: 'which lunch option students at the school like best',
    steps: [
      'Write the question: “Which of the four lunch options do students at our school like best?”',
      'Choose students at random from each grade, in proportion to the size of each grade.',
      'Ask each chosen student to pick one option on a short anonymous survey.',
      'Make a circle graph of the percent of students who chose each option.',
      'State which option was most popular and whether it is a clear favourite.',
    ],
  },
];

const GOOD_Q: Array<{ topic: string; good: string; bad: string[] }> = [
  { topic: 'screen time', good: 'On a typical school day, how many hours do Grade 9 students at our school spend on screens outside of class?', bad: ['Do teens use screens too much?', 'Don’t you agree that phones are ruining teenagers’ lives?', 'What did each student look at on their phone last night?'] },
  { topic: 'sports', good: 'Which sport do Grade 9 students at our school most want to play in gym class: basketball, volleyball, badminton or soccer?', bad: ['Is sport good?', 'Isn’t basketball obviously the best sport?', 'Which sport does every person in the world like best?'] },
  { topic: 'recycling', good: 'What percent of the drink containers in our school’s garbage bins could have been recycled?', bad: ['Is recycling important?', 'Why don’t lazy students recycle?', 'Which students threw bottles in the garbage this week?'] },
  { topic: 'getting to school', good: 'How do students at our school usually travel to school: bus, car, walking or biking?', bad: ['Do you like getting to school?', 'Wouldn’t walking to school be better for everyone?', 'What is your home address, and how far do you live from school?'] },
];

type CollectMethod = 'survey' | 'experiment' | 'observation' | 'records';
const CM_NAME: Record<CollectMethod, string> = {
  survey: 'A survey or questionnaire',
  experiment: 'An experiment',
  observation: 'Observation (watching and counting)',
  records: 'Existing data from records or a database',
};
const CM_WHY: Record<CollectMethod, string> = {
  survey: 'The data is people’s opinions, habits or choices, so ask them.',
  experiment: 'The question asks whether changing one thing changes another, so test it under controlled conditions.',
  observation: 'The data is something you can watch and count as it happens.',
  records: 'The data is about the past, so it must come from records that were already collected.',
};
const CM_QS: Array<{ q: string; m: CollectMethod }> = [
  { q: 'Which kind of music do Grade 9 students at our school like best?', m: 'survey' },
  { q: 'How many hours a week do students in our class spend on homework?', m: 'survey' },
  { q: 'Does the height a ball is dropped from change how high it bounces?', m: 'experiment' },
  { q: 'Do bean plants grow taller with $1$, $2$ or $3$ hours of extra light each day?', m: 'experiment' },
  { q: 'How many vehicles pass the school crosswalk between 8:00 and 8:30 a.m.?', m: 'observation' },
  { q: 'What percent of shoppers at a grocery store bring their own bags?', m: 'observation' },
  { q: 'How has the population of our country changed since 1950?', m: 'records' },
  { q: 'How did the total snowfall in a mountain town change from 1990 to 2020?', m: 'records' },
];

function planOrder(rng: Rng, d: Lvl): Out {
  let steps: string[];
  if (d === 1) steps = [STEP.question, STEP.collect, STEP.display, STEP.conclude];
  else steps = [STEP.question, rng.pick([STEP.method, STEP.who]), STEP.collect, STEP.display, STEP.conclude];
  return {
    prompt: 'Put the steps of a data project plan in order, from first to last.',
    parts: [{ answer: orderAnswer(rng, steps) }],
    hints: ['You cannot collect data until you know your question and how you will collect it.', 'You need the data before you can graph it, and the graph before you can draw a conclusion.'],
    solution: ['A project starts with a question, then plans how and from whom to collect the data, then collects, displays and analyzes it.', ...steps.map((s, i) => `${i + 1}. ${s}`)],
    answerDisplay: steps.map((s, i) => `${i + 1}. ${s}`).join(' '),
  };
}

function planProject(rng: Rng, name: string): Out {
  const p = rng.pick(PROJECTS);
  return {
    prompt: `${name} is planning a project about ${p.topic}. Put ${name}’s steps in order.`,
    parts: [{ answer: orderAnswer(rng, p.steps) }],
    hints: ['Start with the question. End with the conclusion.', 'Decide how and from whom to collect data before collecting it; collect it before graphing it.'],
    solution: ['Question, then a plan for collecting data, then collecting, displaying and concluding.', ...p.steps.map((s, i) => `${i + 1}. ${s}`)],
    answerDisplay: p.steps.map((s, i) => `${i + 1}. ${s}`).join(' '),
  };
}

function goodQuestion(rng: Rng, name: string): Out {
  const g = rng.pick(GOOD_Q);
  return {
    prompt: `${name} is planning a data project about ${g.topic}. Which is the best question to investigate?`,
    parts: [{ answer: mc(rng, g.good, g.bad) }],
    hints: ['A good question is clear and specific: it says who is studied and what is measured.', 'Avoid questions that are vague, leading, too personal, or impossible to answer with data you can collect.'],
    solution: ['A good project question names the population, says exactly what will be measured or counted, uses neutral words and respects privacy.', 'The other questions are vague, leading, too personal, or impossible to collect data for.', `The best question: “${g.good}”`],
    answerDisplay: g.good,
  };
}

function collectMethod(rng: Rng, name: string): Out {
  const c = rng.pick(CM_QS);
  return {
    prompt: `${name}’s project question is: “${c.q}” Which data-collection method fits best?`,
    parts: [{ answer: fixedChoice((Object.keys(CM_NAME) as CollectMethod[]).map((m) => CM_NAME[m]), (Object.keys(CM_NAME) as CollectMethod[]).indexOf(c.m)) }],
    hints: ['Is the data people’s opinions, something you can watch and count, the result of changing something, or facts from the past?', 'Survey: opinions and habits. Experiment: change one thing and measure. Observation: watch and count. Records: data from the past.'],
    solution: [CM_WHY[c.m], `The best method is: ${CM_NAME[c.m]}.`],
    answerDisplay: CM_NAME[c.m],
  };
}

const TRAVEL = ['Bus', 'Car', 'Walk', 'Bike'];

function planConclusion(rng: Rng, name: string): Out {
  const school = rng.pick([480, 600, 720, 840, 960]);
  const n = rng.pick([40, 48, 60]);
  const counts = retry(() => {
    const a = rng.int(Math.round(n * 0.2), Math.round(n * 0.5));
    const b = rng.int(Math.round(n * 0.15), Math.round(n * 0.35));
    const c = rng.int(Math.round(n * 0.05), n - a - b - 2);
    return [a, b, c, n - a - b - c];
  }, (c) => c.every((x) => x >= 2) && new Set(c).size === 4 && Number.isInteger((c[0] * school) / n), 500);
  const bus = counts[0];
  const pct = (100 * bus) / n;
  const pred = (bus * school) / n;
  const top = TRAVEL[counts.indexOf(Math.max(...counts))];
  const notTop = TRAVEL.filter((t) => t !== top && t !== 'Bus');
  const wrongMost = rng.pick(notTop);
  const exactPct = Number.isInteger(pct * 10);
  const pctTxt = exactPct ? fmt(pct, 1) : `${Math.round(pct)}`;
  const correct = `About ${pctTxt}% of the students at the school probably take the bus, but the true percent may be a little different.`;
  return {
    prompt: `${name} surveyed a random sample of $${n}$ of the $${school}$ students at a school about how they usually travel to school. The table shows the results. (a) Predict how many students in the whole school take the bus. (b) Which conclusion is best supported by the data?`,
    figure: { type: 'table', headers: ['How students travel', 'Students'], rows: TRAVEL.map((t, i) => [t, String(counts[i])]) },
    parts: [numPart(pred, { label: '(a) Bus riders', suffix: 'students' }), { label: '(b)', answer: mc(rng, correct, [
      `Exactly $${pred}$ students at the school take the bus.`,
      `About ${pctTxt}% of all students in the country take the bus.`,
      `Most students at the school ${wrongMost === 'Walk' ? 'walk' : wrongMost === 'Bike' ? 'bike' : 'come by car'} to school.`,
    ]) }],
    hints: ['Find the fraction of the sample who take the bus. Apply the same fraction to the whole school.', 'A random sample lets you make a reasonable prediction about this school only, and the prediction is not exact.'],
    solution: [
      `Bus riders in the sample: $${bus}$ of $${n}$, which is $${fr(bus, n)} ${exactPct ? '=' : '\\approx'} ${fmt(pct, 1)}\\%$.`,
      `Prediction: $${fr(bus, n)} \\times ${school} = ${pred}$ students.`,
      `The sample only represents this school, and a sample result is an estimate, not an exact count. The most common way to travel in the sample is ${top.toLowerCase() === 'walk' ? 'walking' : top.toLowerCase() === 'bike' ? 'biking' : top === 'Bus' ? 'the bus' : 'by car'}.`,
      `(a) About $${pred}$ students. (b) ${correct}`,
    ],
    calculator: true,
  };
}

const projectPlan = skill({
  id: 'm9-project-plan',
  name: 'Developing a project plan',
  description: 'Plan a data project: order the steps, choose a good question, a data-collection method and a display, and draw conclusions.',
  outcomes: ['SP3'],
  lessonId: 'm9-10-3',
  format: 'mc',
  gen(rng, d) {
    const name = rng.pick(NAMES);
    if (d === 1) return rng.chance(0.5) ? planOrder(rng, 1) : goodQuestion(rng, name);
    if (d === 2) {
      const k = rng.pick(['order', 'question', 'method'] as const);
      return k === 'order' ? planOrder(rng, 2) : k === 'question' ? goodQuestion(rng, name) : collectMethod(rng, name);
    }
    return rng.chance(0.5) ? planProject(rng, name) : planConclusion(rng, name);
  },
});

// ---------------------------------------------------------------------------
// 10.4 Probability in society
// ---------------------------------------------------------------------------

type Kind = 'theoretical' | 'experimental' | 'subjective';
const KIND_NAME: Record<Kind, string> = { theoretical: 'Theoretical probability', experimental: 'Experimental probability', subjective: 'Subjective probability' };
const KIND_DEF: Record<Kind, string> = {
  theoretical: '**Theoretical probability** comes from counting equally likely outcomes, without doing the experiment.',
  experimental: '**Experimental probability** comes from data: results of trials or records of what happened in the past.',
  subjective: '**Subjective probability** comes from a person’s opinion, feelings or judgement, not from counting outcomes or from data.',
};
const STATEMENTS: Array<{ k: Kind; text: string }> = [
  { k: 'theoretical', text: 'The probability of rolling a $6$ on a fair die is $\\frac{1}{6}$.' },
  { k: 'theoretical', text: 'A raffle sold $500$ tickets and Mika bought $5$, so her probability of winning is $1\\%$.' },
  { k: 'theoretical', text: 'A spinner has $8$ equal sections and $3$ are blue, so the probability of blue is $\\frac{3}{8}$.' },
  { k: 'theoretical', text: 'The probability that a card picked from a shuffled standard deck is a heart is $\\frac{1}{4}$.' },
  { k: 'experimental', text: 'Kiona made $42$ of her $60$ free throws this season, so the probability she makes her next one is about $70\\%$.' },
  { k: 'experimental', text: 'In the past $200$ school days, the 7:45 bus was late $30$ times, so the probability it is late tomorrow is about $15\\%$.' },
  { k: 'experimental', text: 'A farmer planted $500$ seeds last year and $440$ sprouted, so the probability a seed sprouts is about $88\\%$.' },
  { k: 'experimental', text: 'A factory tested $1000$ phone cases and found $20$ with defects, so the probability a case has a defect is about $2\\%$.' },
  { k: 'subjective', text: 'Kai feels there is a $90\\%$ chance he will ace tomorrow’s test because he studied hard.' },
  { k: 'subjective', text: 'A coach thinks her team has about a $70\\%$ chance of winning the final.' },
  { k: 'subjective', text: 'Priya is almost certain she will be chosen for the school play.' },
  { k: 'subjective', text: 'Owen guesses there is about a $50\\%$ chance his parents will let him go to the concert.' },
];
const KINDS: Kind[] = ['theoretical', 'experimental', 'subjective'];

function classify(rng: Rng): Out {
  const s = rng.pick(STATEMENTS);
  return {
    prompt: `What kind of probability is used in this statement? “${s.text}”`,
    parts: [{ answer: fixedChoice(KINDS.map((k) => KIND_NAME[k]), KINDS.indexOf(s.k)) }],
    hints: ['Ask: Does the number come from counting equally likely outcomes, from data that was collected, or from someone’s opinion?', 'Words like “feels”, “thinks” or “I would say” point to an opinion.'],
    solution: [KIND_DEF[s.k], `The statement uses **${KIND_NAME[s.k].toLowerCase()}**.`],
    answerDisplay: KIND_NAME[s.k],
  };
}

const TOWNS = ['Riverton', 'Lakeside', 'Brookfield', 'Hillcrest', 'Pinewood', 'Maple Falls', 'Stonebridge'];

function forecast(rng: Rng): Out {
  const p = 10 * rng.pick([2, 3, 6, 7, 8, 9]);
  const likely = p > 50;
  const town = rng.pick(TOWNS);
  const correct = `${likely ? 'Rain is likely, but not certain' : 'Rain is unlikely, but possible'}: on days with weather like this, it rains about $${p / 10}$ times out of $10$.`;
  return {
    prompt: `The forecast for ${town} says there is a $${p}\\%$ chance of rain tomorrow. What is the best way to understand this forecast?`,
    parts: [{ answer: mc(rng, correct, [
      `It will rain for $${p}\\%$ of the day, about $${fmt((24 * p) / 100, 1)}$ hours.`,
      likely ? `It will definitely rain, because $${p}\\%$ is more than $50\\%$.` : `It will definitely not rain, because $${p}\\%$ is less than $50\\%$.`,
      `There is ${100 - p === 80 ? 'an' : 'a'} $${100 - p}\\%$ chance that it will rain.`,
    ]) }],
    hints: ['A probability describes how often something happens over many similar situations.', 'A probability between $0\\%$ and $100\\%$ is never a guarantee either way.'],
    solution: [`A $${p}\\%$ chance of rain means that, out of many days with weather like this, rain falls on about $${p}$ of every $100$ ($${p / 10}$ of every $10$).`, `It does not say how long it will rain, and it is not certain either way.`, `The answer: ${correct}`],
    answerDisplay: correct,
  };
}

function statement(rng: Rng): Out {
  const k = rng.pick(['oneIn', 'percent'] as const);
  if (k === 'oneIn') {
    const n = rng.pick([4, 5, 8, 10, 20]);
    const what = rng.pick([
      { who: 'A cereal company says', thing: 'boxes contains a prize', item: 'boxes', one: 'box' },
      { who: 'A fundraiser says', thing: 'scratch cards wins a free pizza', item: 'scratch cards', one: 'scratch card' },
      { who: 'A juice company says', thing: 'bottle caps wins a free drink', item: 'bottle caps', one: 'bottle cap' },
    ]);
    const correct = `About $${fr(1, n)}$ of all the ${what.item} win, so buying $${n}$ does not guarantee a win.`;
    return {
      prompt: `${what.who} “$1$ in every $${n}$ ${what.thing}.” Which statement is true?`,
      parts: [{ answer: mc(rng, correct, [
        `If you buy $${n}$ ${what.item}, one of them is sure to win.`,
        `The probability of winning is $${fr(n - 1, n)}$.`,
        `Every $${n}$th ${what.one} sold at each store wins.`,
      ]) }],
      hints: [`“$1$ in $${n}$” is a probability of $${fr(1, n)}$.`, 'A probability tells what happens over many tries. It does not promise what happens in a few tries.'],
      solution: [`“$1$ in $${n}$” means $P(\\text{win}) = ${fr(1, n)}$.`, `Over a very large number of ${what.item}, about $${fr(1, n)}$ of them win. But the winners are mixed in at random, so any $${n}$ could have no winner, or more than one.`, `The true statement: ${correct}`],
      answerDisplay: correct,
    };
  }
  const p = rng.pick([75, 80, 85, 90, 95]);
  const correct = `If $100$ people take it, it will probably work for about $${p}$ of them, but it may not work for any one person.`;
  return {
    prompt: `A pharmacist says a cold medicine works for $${p}\\%$ of the people who take it. Which statement is true?`,
    parts: [{ answer: mc(rng, correct, [
      `It will work for exactly $${p}$ out of every $100$ people.`,
      `It works $${p}\\%$ of the way for each person.`,
      `It is certain to work for you, because $${p}\\%$ is high.`,
    ]) }],
    hints: ['A percent probability describes what happens over many people, not one person.', '“Exactly” and “certain” are clues that a statement says too much.'],
    solution: [`$${p}\\%$ is an experimental probability from many people who took the medicine.`, 'For a new group of $100$ people, expect about that many, not exactly that many. For one person, it is likely but not certain to work.', `The true statement: ${correct}`],
    answerDisplay: correct,
  };
}

interface ExpCtx { text: (p: string, n: number) => string; ask: string; unit: string }
const EXP_CTX: ExpCtx[] = [
  { text: (p, n) => `The probability that a seed from a packet of carrot seeds sprouts is ${p}. Leah plants $${n}$ seeds.`, ask: 'About how many seeds should she expect to sprout?', unit: 'seeds' },
  { text: (p, n) => `The probability that a goalie stops a shot is ${p}. In the next few games she will face $${n}$ shots.`, ask: 'About how many shots should she expect to stop?', unit: 'shots' },
  { text: (p, n) => `The probability that a phone case from a factory has a defect is ${p}. A store orders $${n}$ cases.`, ask: 'About how many cases should the store expect to have a defect?', unit: 'cases' },
  { text: (p, n) => `The probability of winning a small prize at the ring-toss game is ${p}. On fair day, $${n}$ people play.`, ask: 'About how many small prizes should the fair expect to give out?', unit: 'prizes' },
  { text: (p, n) => `The probability that a flight between two large cities arrives on time is ${p}. An airline flies the route $${n}$ times this month.`, ask: 'About how many on-time arrivals should it expect?', unit: 'flights' },
];

function expected(rng: Rng, d: Lvl): Out {
  const ctx = rng.pick(EXP_CTX);
  const form = d === 1 ? 'fraction' : rng.pick(['percent', 'decimal'] as const);
  const [a, b] = rng.pick(ctx.unit === 'cases' ? [[1, 50], [1, 25], [3, 100], [1, 20]] : ctx.unit === 'prizes' ? [[1, 5], [3, 20], [1, 4], [3, 10]] : [[3, 4], [4, 5], [9, 10], [17, 20], [7, 8], [23, 25]]);
  const n = b * rng.int(d === 1 ? 4 : 8, d === 1 ? 12 : 40);
  const e = (a * n) / b;
  const pTxt = form === 'fraction' ? `$${fr(a, b)}$` : form === 'percent' ? `$${fmt((100 * a) / b, 2)}\\%$` : `$${fmt(a / b, 4)}$`;
  const pNum = form === 'fraction' ? fr(a, b) : fmt(a / b, 4);
  return {
    prompt: `${ctx.text(pTxt, n)} ${ctx.ask}`,
    parts: [numPart(e, { suffix: ctx.unit })],
    hints: ['Expected number $=$ probability $\\times$ number of trials.', form === 'percent' ? 'Change the percent to a decimal first.' : 'Multiply the probability by the number of trials.'],
    solution: [
      'Expected number $=$ probability $\\times$ number of trials',
      ...(form === 'percent' ? [`$${fmt((100 * a) / b, 2)}\\% = ${fmt(a / b, 4)}$`] : []),
      `$${pNum} \\times ${n} = ${e}$`,
      `Expect about $${e}$ ${ctx.unit}. The actual number will probably be close to this, but not exactly equal.`,
    ],
    calculator: true,
  };
}

const RATE_CTX = [
  { intro: 'A farmer is choosing between two brands of canola seed. Last year', a: 'Brand A', b: 'Brand B', verb: 'sprouted', of: 'seeds planted', noun: 'seed', goal: 'which brand to buy', tot: [200, 300, 400, 500] },
  { intro: 'A coach must choose a player to take the deciding penalty shot. This season', a: 'Ravi', b: 'Mateo', verb: 'scored', of: 'penalty shots taken', noun: 'penalty shot', goal: 'who should take the shot', tot: [20, 24, 25, 40] },
  { intro: 'A family is choosing between two bus routes to get to work on time. Over the past few months', a: 'Route 4', b: 'Route 9', verb: 'were on time', of: 'trips', noun: 'trip', goal: 'which route to take', tot: [40, 50, 60, 80] },
];

function decideRates(rng: Rng): Out {
  const c = rng.pick(RATE_CTX);
  // The option tried more often has more successes but a LOWER rate, so counting alone gives the wrong answer.
  const pick = retry(
    () => {
      const [big, small] = rng.sample(c.tot, 2).sort((x, y) => y - x);
      const fWorse = rng.int(Math.ceil(big * 0.6), Math.floor(big * 0.9));
      const fBetter = rng.int(Math.ceil(small * 0.6), small - 1);
      return { big, small, fWorse, fBetter };
    },
    (o) => o.big >= 1.2 * o.small && o.fBetter < o.fWorse && o.fBetter / o.small - o.fWorse / o.big >= 0.03 && !onEdge((100 * o.fBetter) / o.small) && !onEdge((100 * o.fWorse) / o.big),
    3000,
  );
  const ok = pick.big >= 1.2 * pick.small && pick.fBetter < pick.fWorse && pick.fBetter / pick.small - pick.fWorse / pick.big >= 0.03;
  const { big, small, fWorse, fBetter } = ok ? pick : { big: c.tot[c.tot.length - 1], small: c.tot[0], fWorse: Math.round(c.tot[c.tot.length - 1] * 0.7), fBetter: Math.round(c.tot[0] * 0.85) };
  const betterIsA = rng.chance(0.5);
  const [ta, fa, tb, fb] = betterIsA ? [small, fBetter, big, fWorse] : [big, fWorse, small, fBetter];
  const pa = (100 * fa) / ta;
  const pb = (100 * fb) / tb;
  const best = betterIsA ? c.a : c.b;
  const worst = betterIsA ? c.b : c.a;
  const show = (v: number) => `${Number.isInteger(v * 10) ? '=' : '\\approx'} ${fmt(v, 1)}`;
  const correct = `${best}, because the experimental probability of success is higher (${fmt(Math.max(pa, pb), 1)}% compared with ${fmt(Math.min(pa, pb), 1)}%).`;
  return {
    prompt: `${c.intro}, ${c.a}: $${fa}$ ${c.verb} out of $${ta}$ ${c.of}. ${c.b}: $${fb}$ ${c.verb} out of $${tb}$ ${c.of}. Find each experimental probability of success as a percent, to the nearest tenth of a percent. Then decide ${c.goal}.`,
    parts: [numPart(pa, { label: c.a, suffix: '%', decimals: 1 }), numPart(pb, { label: c.b, suffix: '%', decimals: 1 }), { label: 'Decision', answer: mc(rng, correct, [
      `${worst}, because there were more successes in total.`,
      `${worst}, because there were more attempts.`,
      'It makes no difference. Probability cannot help with this decision.',
    ]) }],
    hints: ['Experimental probability $=$ successes $\\div$ attempts. Change each to a percent.', 'Compare the percents, not the counts. The counts come from different numbers of attempts.'],
    solution: [
      `${c.a}: $${fa} \\div ${ta} \\times 100 ${show(pa)}\\%$`,
      `${c.b}: $${fb} \\div ${tb} \\times 100 ${show(pb)}\\%$`,
      `${best} has the higher probability of success, even though ${worst} has more successes in total.`,
      `Decision: ${correct}`,
    ],
    calculator: true,
  };
}

function warranty(rng: Rng): Out {
  const p = rng.pick([10, 15, 20, 25, 30]);
  const repair = rng.pick([150, 200, 240, 300, 360]);
  const exp = (p * repair) / 100;
  const w = retry(() => exp + rng.sign() * rng.int(8, 25), (x) => x > 10 && Math.abs(x - exp) >= 8, 50);
  const device = rng.pick(['phone', 'tablet', 'laptop', 'gaming console']);
  const cheaper = w > exp ? 1 : 0;
  return {
    prompt: `A store offers a one-year warranty on a new ${device} for ${money(w)}. Without the warranty, a repair costs ${money(repair)}. Suppose the probability that the ${device} needs a repair in the first year is $${p}\\%$. (a) What is the expected repair cost per ${device} without the warranty, to the nearest cent? (b) Based on expected cost alone, which choice costs less on average?`,
    parts: [numPart(exp, { label: '(a) \\$', decimals: 2, tolerance: 0.011 }), { label: '(b)', answer: fixedChoice(['Buying the warranty', 'Paying for a repair only if one is needed'], cheaper) }],
    hints: ['Expected cost $=$ probability $\\times$ cost.', `Compare the expected repair cost with the warranty price of ${money(w)}.`],
    solution: [
      `Expected repair cost $= ${p}\\% \\times ${repair} = ${fmt(p / 100, 2)} \\times ${repair} = ${fmtFixed(exp, 2)}$`,
      `So, on average, repairs cost ${money(exp)} per ${device}, and the warranty costs ${money(w)}.`,
      `(a) ${money(exp)}. (b) ${cheaper ? 'Paying for a repair only if one is needed' : 'Buying the warranty'} costs less on average. (A person might still choose differently, for example if a surprise repair bill would be hard to pay.)`,
    ],
    calculator: true,
  };
}

const probabilitySociety = skill({
  id: 'm9-probability-society',
  name: 'Probability in society',
  description: 'Tell theoretical, experimental and subjective probability apart, interpret forecasts and probability statements, predict expected outcomes, and use probability to make decisions.',
  outcomes: ['SP4'],
  lessonId: 'm9-10-4',
  format: 'mc',
  calculator: true,
  gen(rng, d) {
    if (d === 1) return rng.chance(0.6) ? classify(rng) : expected(rng, 1);
    if (d === 2) {
      const k = rng.pick(['forecast', 'statement', 'expected'] as const);
      return k === 'forecast' ? forecast(rng) : k === 'statement' ? statement(rng) : expected(rng, 2);
    }
    return rng.chance(0.55) ? decideRates(rng) : warranty(rng);
  },
});

export const DATASOCIETY_SKILLS: SkillDef[] = [collectionIssues, populationSample, projectPlan, probabilitySociety];
