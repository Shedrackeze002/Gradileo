/**
 * Grade 12 English, lessons 6.3 and 6.4: Research Writing and Reflective Writing (12-F2). Judging a
 * source for a stated research question by its authority, evidence, currency, purpose and relevance;
 * weaving two sources into the writer's own argument with attribution in the sentence, against
 * source dumping, misrepresentation, patchwriting and missing credit; and reflective prose that moves
 * from specific experience to an earned insight. Every source and finding here is invented for
 * practice and says so; no citation format is tested.
 */
import { mc, part, skill, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { block, q } from '../../eng10/gen/common.ts';
import { andList } from './writing-lists.ts';

const RESEARCH = 'e12-6-3';
const REFLECT = 'e12-6-4';
const OUTCOMES = ['12-F2'];

// ---------------------------------------------------------------------------- lesson 6.3: evaluating sources

type Flaw = 'outdated' | 'biased' | 'irrelevant' | 'anecdote';
const FLAW_LABEL: Record<Flaw, string> = {
  outdated: 'It is too old to reflect what is known about the question now.',
  biased: 'Its author gains from one answer, so its view may be one-sided.',
  irrelevant: 'It answers a different question from the one being researched.',
  anecdote: 'It rests on one person’s experience rather than on wide evidence.',
};
const FLAW_SHORT: Record<Flaw, string> = {
  outdated: 'is too old',
  biased: 'comes from someone who gains from one answer',
  irrelevant: 'answers a different question',
  anecdote: 'rests on one person’s experience',
};

interface Inquiry {
  question: string;
  /** Expert, evidence-based, recent and on the question. */
  strong: string;
  outdated: string;
  biased: string;
  irrelevant: string;
  anecdote: string;
  /** A source with real value and one real limit, for a balanced judgement. */
  mixed: string;
  balanced: string;
  /** Rejects the source for a reason that does not hold. */
  dismiss: string;
  /** Accepts the source as settling the question. */
  accept: string;
  /** Rejects the source for a reason that is simply false. */
  wrongCritique: string;
}

const INQUIRIES: Inquiry[] = [
  {
    question: 'Does a four-day school week affect student achievement?',
    strong: 'A 2025 review by university education researchers comparing test results in 30 districts before and after they moved to four-day weeks',
    outdated: 'A 1988 newspaper column predicting how a four-day school week might change schools, written long before any district had actually tried one',
    biased: 'A brochure from a company that sells scheduling software to districts switching to a four-day week, praising the change',
    irrelevant: 'A recent study by a respected labour institute of how a four-day working week affects the productivity of office workers',
    anecdote: 'A blog post by a parent describing how her own son’s marks went up after his school began a four-day week last year, and who says he now loves school',
    mixed: 'A 2025 report by a national teachers’ union comparing students’ marks before and after the change in the districts where its members work',
    balanced: 'Useful, since it compares marks before and after, but the union has a stake in the result, so check it against an independent study.',
    dismiss: 'Worthless, because a union represents teachers and so cannot possibly know anything about how well students are doing.',
    accept: 'Enough to settle the question on its own, because teachers see students every day and know their marks far better than any researcher.',
    wrongCritique: 'Unusable, because a report from 2025 is already far too old to say anything about how schools work today.',
  },
  {
    question: 'Do school breakfast programs improve attendance?',
    strong: 'A 2025 study by a national public-health institute tracking attendance at 120 schools for two years after breakfast programs began',
    outdated: 'A 1974 government pamphlet guessing how school breakfasts might affect students, written before any program had been tried',
    biased: 'A report paid for by a cereal company that supplies school breakfast programs, praising the programs in every district it serves',
    irrelevant: 'A recent hospital study of how eating breakfast affects the blood sugar of adult office workers during the working morning',
    anecdote: 'A principal’s speech at an awards night describing one student who stopped missing school after breakfasts began',
    mixed: 'A 2025 report by a charity that runs breakfast programs, comparing attendance at its own schools before and after they began',
    balanced: 'Useful, since it compares attendance before and after, but the charity runs the programs, so its findings need independent checking.',
    dismiss: 'Worthless, because a charity is not a university, and only a university is ever allowed to publish real research on schools.',
    accept: 'Enough to settle the question, because a charity that runs the programs knows more about them than any outside researcher could.',
    wrongCritique: 'Unusable, because a report that is only one year old has not yet had time to be proved true or false by anyone else.',
  },
  {
    question: 'Does learning a musical instrument improve teenagers’ memory?',
    strong: 'A 2024 study by university psychologists that tested the memory of 400 teenagers before and after two years of music lessons',
    outdated: 'A 1952 magazine article by a music teacher predicting that lessons would one day be shown to sharpen students’ memories',
    biased: 'A website run by a company that sells music lessons online, claiming that its lessons will make every student much smarter',
    irrelevant: 'A recent university study of whether quiet background music helps adults fall asleep faster at night in a noisy city',
    anecdote: 'A social media post by a violinist saying that she has always had an excellent memory thanks to her years of practice, which began when she was four',
    mixed: 'A 2025 study finding that teenagers who play instruments have better memories, though it never tested them before they started playing',
    balanced: 'Useful, but since it never tested the students before they started playing, it cannot show that the music caused the better memory.',
    dismiss: 'Worthless, because psychologists are not musicians and so cannot study anything at all that has to do with music.',
    accept: 'Enough to settle the question, because it shows clearly that music lessons are what made the students’ memories better.',
    wrongCritique: 'Unusable, because a study published in 2025 is far too recent for anyone to have read it or checked it yet.',
  },
  {
    question: 'Do protected bicycle lanes reduce injuries to cyclists?',
    strong: 'A 2025 report by a university transport centre comparing injury records on 40 roads before and after protected lanes were built',
    outdated: 'A 1965 newspaper editorial about cycle paths, written before any city in the country had built a single protected lane',
    biased: 'A leaflet from a company that builds protected bicycle lanes, quoting its happiest customers and claiming that its lanes end all injuries',
    irrelevant: 'A recent sports-science study of how professional racing cyclists avoid knee injuries during their long training rides',
    anecdote: 'A letter to a newspaper from a cyclist who says that he has felt much safer since a protected lane opened on his street',
    mixed: 'A 2025 city council report showing fewer injuries on the four roads where the council itself had chosen to build protected lanes',
    balanced: 'Useful evidence, but the council chose the roads and has a stake in the result, so check it against independent studies.',
    dismiss: 'Worthless, because a city council is a government body and so can never tell the public anything true about its own roads.',
    accept: 'Enough to settle the question, because the council built the lanes itself and so knows better than anyone how well they work.',
    wrongCritique: 'Unusable, because a report on four roads is far too large to be read carefully by a student in the time available.',
  },
  {
    question: 'Do students understand more when they read on paper than on screens?',
    strong: 'A 2024 review by education researchers combining the results of 50 experiments that compared reading on paper and on screens',
    outdated: 'A 1991 magazine article predicting how computer screens might one day change reading, written before tablets existed',
    biased: 'An advertisement from a company that sells e-readers, claiming that its screens make reading easier for every student',
    irrelevant: 'A recent eye-health study of how long hours at a monitor affect the eyesight of office workers who stare at screens all day',
    anecdote: 'A post by a student saying that she always understands books better when she reads them on paper than on her phone, especially long novels',
    mixed: 'A 2025 study by a paper manufacturers’ association finding that students remembered more of a story they read on paper',
    balanced: 'Possibly useful, but the association profits if paper wins, so its method and findings need checking against independent research.',
    dismiss: 'Worthless, because any study that compares paper with screens becomes out of date the moment a new kind of tablet is released.',
    accept: 'Enough to settle the question, because a paper manufacturer knows more about paper and about reading than anyone else in the world.',
    wrongCritique: 'Unusable, because a study about reading a story has nothing at all to do with whether students understand what they read.',
  },
  {
    question: 'Does a later school start time improve teenagers’ sleep?',
    strong: 'A 2025 study by a university sleep laboratory that tracked the sleep of 600 teenagers before and after their schools started later',
    outdated: 'A 1979 newspaper article speculating about later school starts, written before any school in the country had tried the change',
    biased: 'A press release from a bus company that would earn more if schools started later, saying that later starts are good for everyone',
    irrelevant: 'A recent medical study of how night shifts affect the sleep of nurses and other hospital staff who work through the night',
    anecdote: 'A blog post by a parent who says that her daughter has been much less tired since their school began starting at 9:00 in the morning',
    mixed: 'A 2024 survey in which students at one school said that they felt less tired after the school began starting later',
    balanced: 'Useful as a sign of how students feel, but it records their impressions at one school, not their measured sleep, so it needs support.',
    dismiss: 'Worthless, because students cannot be trusted to say anything at all about how tired they feel or how well they sleep.',
    accept: 'Enough to settle the question, because the students themselves know far better than any scientist how much sleep they are really getting.',
    wrongCritique: 'Unusable, because a survey from 2024 is now much too old to tell us anything about how teenagers sleep today.',
  },
];

const FLAWS = Object.keys(FLAW_LABEL) as Flaw[];

function sourceEvaluation(rng: Rng, d: Difficulty): GenOutput {
  const inq = rng.pick(INQUIRIES);
  const lead = `A student is researching this question:\n\n${block(inq.question)}\n\nAll the sources below are invented, for practice.`;
  if (d === 1) {
    const wrong = rng.sample(FLAWS, 3);
    return {
      prompt: `${lead}\n\nWhich source would be the most reliable for this question?`,
      parts: [part(mc(rng, inq.strong, wrong.map((f) => inq[f])))],
      hints: ['Ask four things of each source: Is its author an expert? Does it rest on wide evidence? Is it recent? Does it answer this question, not a nearby one?'],
      solution: [`${q(inq.strong)} is expert, recent, based on wide evidence and about this very question.`, `Of the others, ${andList(wrong.map((f) => `one ${FLAW_SHORT[f]}`))}.`],
    };
  }
  if (d === 2) {
    const f = rng.pick(FLAWS);
    return {
      prompt: `${lead}\n\nOne source the student found:\n\n${block(inq[f])}\n\nWhat is the main weakness of this source **for this question**?`,
      parts: [part(mc(rng, FLAW_LABEL[f], FLAWS.filter((x) => x !== f).map((x) => FLAW_LABEL[x])))],
      hints: ['Check the date, who wrote it and what they gain, what evidence it rests on and whether it answers the question being researched.'],
      solution: [FLAW_LABEL[f]],
    };
  }
  return {
    prompt: `${lead}\n\nThe student finds this source:\n\n${block(inq.mixed)}\n\nWhich judgement of it is the most accurate?`,
    parts: [part(mc(rng, inq.balanced, [inq.dismiss, inq.accept, inq.wrongCritique]))],
    hints: ['Few sources are simply good or bad. Say what this one can show, and what limit means it should be checked against other sources.'],
    solution: [`${q(inq.balanced)} weighs what the source can show against its real limit.`, 'Of the others, one rejects it for a reason that does not hold, one treats it as settling the question and one rests on a claim that is simply false.'],
  };
}

// ---------------------------------------------------------------------------- lesson 6.3: integrating sources

type IKind = 'good' | 'dump' | 'misrep' | 'patch' | 'noAttr';
const IKIND_LABEL: Record<IKind, string> = {
  good: 'Nothing: it weaves both sources into the writer’s own point and credits each.',
  dump: 'It strings the sources together without making them serve the writer’s point.',
  misrep: 'It claims that the sources say more than they actually say.',
  patch: 'It keeps the sources’ own wording and only rearranges it (patchwriting).',
  noAttr: 'It uses the sources’ findings without saying where they come from.',
};
const IKIND_SHORT: Record<Exclude<IKind, 'good'>, string> = {
  dump: 'strings the sources together without a point',
  misrep: 'makes the sources say more than they do',
  patch: 'keeps the sources’ own wording (patchwriting)',
  noAttr: 'leaves out where the findings come from',
};

interface Synthesis {
  claim: string;
  sources: Array<{ name: string; finding: string }>;
  good: string;
  dump: string;
  misrep: string;
  patch: string;
  noAttr: string;
}

const SYNTHESES: Synthesis[] = [
  {
    claim: 'Cities should plant more street trees.',
    sources: [
      { name: 'the Green Streets study', finding: 'Streets lined with mature trees were on average four degrees cooler on summer afternoons.' },
      { name: 'the Riverside Health Survey', finding: 'Residents of tree-lined streets reported less stress than residents of streets without trees.' },
    ],
    good: 'Street trees do more than decorate a city: the Green Streets study found tree-lined streets four degrees cooler on summer afternoons, and the Riverside Health Survey linked them to lower stress.',
    dump: 'The Green Streets study says that streets with trees were four degrees cooler on summer afternoons. The Riverside Health Survey says residents reported less stress. These are two interesting facts about street trees.',
    misrep: 'Street trees transform city life: the Green Streets study proved that trees keep every street four degrees cooler all year round, and the Riverside Health Survey shows that trees cure stress.',
    patch: 'Streets lined with mature trees were on average four degrees cooler on summer afternoons, says the Green Streets study, and residents of tree-lined streets reported less stress, says the Riverside survey.',
    noAttr: 'Street trees do more than decorate a city: tree-lined streets are about four degrees cooler on summer afternoons, and the people who live on them report lower stress, so trees protect body and mind.',
  },
  {
    claim: 'Schools should offer free breakfast to every student.',
    sources: [
      { name: 'the Northfield Schools report', finding: 'Attendance rose by six per cent in the year after free breakfasts began.' },
      { name: 'the Harbour Learning study', finding: 'Students who ate breakfast at school scored higher on morning tests of attention than those who did not.' },
    ],
    good: 'Free breakfasts feed learning as well as students: the Northfield Schools report found attendance up six per cent in the first year, and the Harbour Learning study found sharper attention in morning tests.',
    dump: 'The Northfield Schools report says attendance rose by six per cent. The Harbour Learning study says students who ate breakfast scored higher on attention tests. Both of these are facts about breakfast at school.',
    misrep: 'A free breakfast transforms schools: the Northfield Schools report proved that it doubles attendance, and the Harbour Learning study shows that it raises every student’s marks in every subject.',
    patch: 'Attendance rose by six per cent in the year after free breakfasts began, says the Northfield Schools report, and students who ate breakfast at school scored higher on morning tests of attention.',
    noAttr: 'Free breakfasts feed learning as well as students: attendance goes up by about six per cent in the first year, and students who eat breakfast at school show sharper attention in their morning tests.',
  },
  {
    claim: 'Every student should learn to play a musical instrument.',
    sources: [
      { name: 'the Lakeshore Music Project', finding: 'Students who took two years of lessons improved on memory tests more than students who did not.' },
      { name: 'the Harmony Survey', finding: 'Most students in school bands said the band was where they made their closest friends.' },
    ],
    good: 'Music lessons build both minds and friendships: the Lakeshore Music Project found better gains on memory tests after two years of lessons, and in the Harmony Survey most band members named the band as where they made close friends.',
    dump: 'The Lakeshore Music Project says students who took two years of lessons improved on memory tests. The Harmony Survey says most band members made close friends in the band. These are two findings about music in schools.',
    misrep: 'Music lessons change everything: the Lakeshore Music Project proved that lessons give every student a perfect memory, and the Harmony Survey shows that students without music have no friends at all.',
    patch: 'Students who took two years of lessons improved on memory tests more than students who did not, says the Lakeshore Music Project, and most students in school bands said the band was where they made their closest friends.',
    noAttr: 'Music lessons build both minds and friendships: students with two years of lessons make bigger gains on memory tests, and most band members say the band is where they made their closest friends at school.',
  },
  {
    claim: 'The city should build protected bicycle lanes on its main roads.',
    sources: [
      { name: 'the Harbour City Transport Office', finding: 'Cyclist injuries on four main roads fell by almost half within two years of protected lanes being built.' },
      { name: 'the Commuter Count', finding: 'The number of people cycling to work on those roads doubled in the same two years.' },
    ],
    good: 'Protected lanes make cycling both safer and more popular: the Harbour City Transport Office found cyclist injuries almost halved within two years, while the Commuter Count found the number of cyclists doubled.',
    dump: 'The Harbour City Transport Office says cyclist injuries on four roads fell by almost half. The Commuter Count says the number of people cycling to work doubled. Both of these findings are about bicycles in cities.',
    misrep: 'Protected lanes solve every traffic problem: the Harbour City Transport Office proved that they end all injuries on every road, and the Commuter Count shows that everyone in the city now cycles to work.',
    patch: 'Cyclist injuries on four main roads fell by almost half within two years of protected lanes being built, says the Harbour City Transport Office, and the number of people cycling to work doubled in the same years.',
    noAttr: 'Protected lanes make cycling both safer and more popular: injuries to cyclists on the city’s main roads fell by almost half within two years, while the number of people cycling to work on them doubled.',
  },
  {
    claim: 'Phones should be kept in lockers during lessons.',
    sources: [
      { name: 'the Clearview classroom study', finding: 'Students whose phones lay silent on their desks remembered less of a lesson than students whose phones were in their bags.' },
      { name: 'the Teachers’ Time Survey', finding: 'Teachers reported losing about five minutes a lesson to dealing with phones.' },
    ],
    good: 'A phone does harm even when it is silent: the Clearview classroom study found that phones lying on desks lowered what students remembered, and the Teachers’ Time Survey counted five lost minutes a lesson.',
    dump: 'The Clearview classroom study says that students with phones on their desks remembered less. The Teachers’ Time Survey says teachers lose five minutes a lesson. Both of these are facts about phones in class.',
    misrep: 'Phones ruin every lesson: the Clearview classroom study proved that any phone in a room stops students from learning anything, and the Teachers’ Time Survey shows that phones waste half of every lesson.',
    patch: 'Students whose phones lay silent on their desks remembered less of a lesson than students whose phones were in their bags, says the Clearview study, and teachers reported losing five minutes a lesson.',
    noAttr: 'A phone does harm even when it is silent: phones lying on desks lower how much of a lesson students remember, and teachers lose about five minutes of every lesson to dealing with them.',
  },
  {
    claim: 'Students should do their close reading on paper rather than on screens.',
    sources: [
      { name: 'the Meridian reading review', finding: 'Across fifty experiments, readers understood long texts slightly better on paper than on screens.' },
      { name: 'the Study Habits Survey', finding: 'Students reading on screens were more likely to skim and to switch to other tasks.' },
    ],
    good: 'For close reading, paper still has the edge: the Meridian reading review found slightly better understanding of long texts on paper across fifty experiments, and the Study Habits Survey suggests why, since screen readers skim more.',
    dump: 'The Meridian reading review says readers understood long texts slightly better on paper. The Study Habits Survey says screen readers skim and switch tasks. These are two findings about reading on paper and screens.',
    misrep: 'Screens destroy reading: the Meridian reading review proved that nobody can understand anything they read on a screen, and the Study Habits Survey shows that every screen reader skims every single page.',
    patch: 'Across fifty experiments, readers understood long texts slightly better on paper than on screens, says the Meridian review, and students reading on screens were more likely to skim and to switch to other tasks.',
    noAttr: 'For close reading, paper still has the edge: readers understand long texts slightly better on paper, and the reason may be that students reading on screens are more likely to skim and to switch tasks.',
  },
];

const sourcesBlock = (s: Synthesis) =>
  s.sources.map((x) => `**${x.name[0].toUpperCase()}${x.name.slice(1)}** (an invented source): ${x.finding}`).join('\n\n');

function integratingSources(rng: Rng, d: Difficulty): GenOutput {
  const s = rng.pick(SYNTHESES);
  const lead = `A student is arguing:\n\n${block(s.claim)}\n\nTwo sources the student has found:\n\n${sourcesBlock(s)}`;
  if (d === 3) {
    const kind = rng.pick(Object.keys(IKIND_LABEL) as IKind[]);
    const others = rng.sample((Object.keys(IKIND_LABEL) as IKind[]).filter((k) => k !== kind), 3).map((k) => IKIND_LABEL[k]);
    return {
      prompt: `${lead}\n\nThe student wrote:\n\n${block(s[kind])}\n\nWhat, if anything, is wrong with how the sources are used?`,
      parts: [part(mc(rng, IKIND_LABEL[kind], others))],
      hints: ['Good integration makes the sources serve the writer’s point, keeps their findings accurate, puts them in the writer’s own words and names each source in the sentence.'],
      solution: [IKIND_LABEL[kind], kind === 'good' ? 'It makes both findings serve one point, keeps them accurate, uses its own words and credits each source.' : `A better version: ${q(s.good)}`],
    };
  }
  const wrong: Array<Exclude<IKind, 'good'>> = d === 1 ? ['dump', 'noAttr'] : ['misrep', 'patch', rng.pick(['dump', 'noAttr'] as const)];
  return {
    prompt: `${lead}\n\nWhich sentence integrates the sources best into the student’s argument?`,
    parts: [part(mc(rng, s.good, wrong.map((k) => s[k])))],
    hints: [
      d === 1
        ? 'The sources should serve the writer’s point, and the sentence should name where each finding comes from.'
        : 'Check each choice against the sources: does it report them accurately, in the writer’s own words, with credit?',
    ],
    solution: [`${q(s.good)} makes both findings serve one point, reports them accurately in its own words and names each source.`, `Of the others, ${andList(wrong.map((k) => `one ${IKIND_SHORT[k]}`))}.`],
  };
}

// ---------------------------------------------------------------------------- lesson 6.4: reflective writing

type RKind = 'good' | 'narration' | 'vague' | 'tacked';
const RKIND_LABEL: Record<RKind, string> = {
  good: 'Nothing: it moves from specific detail to an insight the detail has earned.',
  narration: 'It tells what happened in detail but never reflects on what it meant.',
  vague: 'It reflects only in broad generalities, with no specific detail at all.',
  tacked: 'Its lesson is tacked on at the end rather than earned by the detail.',
};
const RKIND_SHORT: Record<Exclude<RKind, 'good'>, string> = {
  narration: 'tells what happened without reflecting',
  vague: 'reflects only in generalities',
  tacked: 'tacks a moral on at the end',
};

interface Reflection {
  topic: string;
  good: string;
  narration: string;
  vague: string;
  tacked: string;
}

const REFLECTIONS: Reflection[] = [
  {
    topic: 'learning to bake bread with a grandmother',
    good: 'Every Sunday my grandmother measured flour with a chipped teacup, never a scale. When I baked her bread alone, I used exact grams from a website, and it came out dense and flat. Only later did I see that her teacup measured more than flour: it measured years of watching dough, which no recipe can hold.',
    narration: 'Every Sunday my grandmother measured flour with a chipped teacup, never a scale. When I baked her bread alone, I used exact grams from a website, and it came out dense and flat. I tried three more times that month, changing the oven temperature each time, and in the end I bought a loaf from the shop on the corner.',
    vague: 'Cooking with family can teach us so many important lessons about life, tradition and love. Some things simply cannot be learned from books or from the internet, and spending time with the older people in our lives shows us how much we still have to learn from them, every single day of our lives.',
    tacked: 'Every Sunday my grandmother measured flour with a chipped teacup, never a scale. When I baked her bread alone, I used exact grams from a website, and it came out dense and flat. I threw it away and went out with friends. In conclusion, this experience taught me that family is the most important thing of all.',
  },
  {
    topic: 'losing a swimming final',
    good: 'In the 200-metre final I was leading at the last turn, and I glanced sideways at the swimmer in lane four. She passed me in that half-second. For weeks I blamed my turn, but the glance told me more: all season I had been racing against her instead of towards my own best time.',
    narration: 'In the 200-metre final I was leading at the last turn, and I glanced sideways at the swimmer in lane four. She passed me in that half-second and touched the wall first. My coach timed my turns all the next week, and at the regional meet a month later I came second again.',
    vague: 'Sport teaches us valuable lessons about winning, losing and hard work. When we lose, it is important to learn from our mistakes and keep going, because every failure is a chance to grow, and it can make us stronger and better people in the future, if only we let it teach us.',
    tacked: 'In the 200-metre final I was leading at the last turn, and I glanced sideways at the swimmer in lane four. She passed me in that half-second and touched the wall first. I was upset for days. This shows that you should never give up and should always try your hardest at everything.',
  },
  {
    topic: 'starting school in a new country',
    good: 'In my first month in a new country I answered every question in class with “yes”, the one word I was sure of. A teacher once asked if I understood, and I said yes while understanding nothing. That small lie taught me that a quick yes can hide confusion, and now, when a new student tells me yes, I ask them to show me.',
    narration: 'In my first month in a new country I answered every question in class with “yes”, the one word I was sure of. A teacher once asked if I understood, and I said yes. Later that term I joined an after-school language club, and by the spring I could follow most of my lessons without needing any help from anyone at all.',
    vague: 'Moving to a new country is one of the hardest things anyone can go through. It teaches you to be patient, open-minded and brave, and it shows you that people everywhere are the same deep down, even when they speak different languages and come from very different cultures and countries.',
    tacked: 'In my first month in a new country I answered every question in class with “yes”, the one word I was sure of. A teacher once asked if I understood, and I said yes. By the spring I could follow most lessons. The moral of the story is that hard work and patience always pay off in the end.',
  },
  {
    topic: 'volunteering at a repair café',
    good: 'At the repair café I fixed an old man’s bicycle bell in four minutes, then listened for twenty to the story of the bicycle. I had thought the job was the bell. Walking home, I realized that he had come for the listening, and that the most useful thing I could offer was not my skill but my time.',
    narration: 'At the repair café I fixed an old man’s bicycle bell in four minutes, then listened for twenty to the story of the bicycle. He had bought it the year he married and ridden it to work for thirty years. After he left, I repaired two kettles and a lamp before the café closed its doors at five o’clock.',
    vague: 'Volunteering is a wonderful way to help others and to give back to the community. It teaches young people responsibility, kindness and teamwork, and everyone should try it at least once, because helping other people always makes us feel good about ourselves and about the world we live in.',
    tacked: 'At the repair café I fixed an old man’s bicycle bell in four minutes, then listened for twenty to the story of the bicycle. He had bought it the year he married. After he left, I repaired two kettles. This experience taught me that volunteering is always rewarding and good for everyone.',
  },
  {
    topic: 'a failed science-fair experiment',
    good: 'My science-fair plants died in the second week, and I spent the night before the fair rewriting my poster to explain why. The judges asked more about my failure than about anyone else’s success. I learned that an honest account of what went wrong can teach more than a result that went right.',
    narration: 'My science-fair plants died in the second week, and I spent the night before the fair rewriting my poster to explain why. The judges asked me about the soil, the light and the watering, and in the end I received a certificate of merit and a thick book about gardening as a prize.',
    vague: 'Science is all about trial and error, and failure is an important part of learning. Every great scientist has failed many times before succeeding, and we should all remember that mistakes are a normal and necessary part of growing up and of discovering new things about the world around us every day.',
    tacked: 'My science-fair plants died in the second week, and I spent the night before the fair rewriting my poster. The judges asked me about the soil and the light, and I received a certificate of merit. In the end, this experience showed me that science is the most important subject at our school.',
  },
  {
    topic: 'reading the same book to a younger brother',
    good: 'My brother made me read the same picture book every night for a month, and by the third week I was skipping pages to get it over with. He always noticed. I had thought he wanted the story, but he wanted the ritual, and I saw that repetition can be a kind of comfort rather than boredom.',
    narration: 'My brother made me read the same picture book every night for a month, and by the third week I was skipping pages to get it over with. He always noticed and made me go back. When the month ended, he chose a new book about a lighthouse, and we read that one every night instead.',
    vague: 'Spending time with younger brothers and sisters is very important, and reading together is one of the best ways to build a strong relationship. Children learn so much from books, and older siblings can be wonderful role models who help them to develop a deep and lifelong love of reading.',
    tacked: 'My brother made me read the same picture book every night for a month, and by the third week I was skipping pages. He always noticed and made me go back. When the month ended, he chose a new book. This taught me that reading is fun and that everyone should read something, every single day.',
  },
];

function reflectiveWriting(rng: Rng, d: Difficulty): GenOutput {
  const r = rng.pick(REFLECTIONS);
  if (d === 3) {
    const kind = rng.pick(Object.keys(RKIND_LABEL) as RKind[]);
    const others = (Object.keys(RKIND_LABEL) as RKind[]).filter((k) => k !== kind).map((k) => RKIND_LABEL[k]);
    return {
      prompt: `A student wrote this paragraph for a reflective essay about ${r.topic}:\n\n${block(r[kind])}\n\nWhat, if anything, is its main weakness as reflective writing?`,
      parts: [part(mc(rng, RKIND_LABEL[kind], others))],
      hints: ['Strong reflection does two things: it gives specific detail, and it draws from that detail an insight that could only come from this experience.'],
      solution: [RKIND_LABEL[kind], kind === 'good' ? 'Its insight grows out of a precise detail, so the reader believes it.' : `A stronger version: ${q(r.good)}`],
    };
  }
  const wrong: Array<Exclude<RKind, 'good'>> = d === 1 ? ['narration', 'vague'] : ['narration', 'vague', 'tacked'];
  return {
    prompt: `Which paragraph about ${r.topic} is the strongest **reflective** writing: specific detail that leads to an earned insight?`,
    parts: [part(mc(rng, r.good, wrong.map((k) => r[k])))],
    hints: [
      d === 1
        ? 'Reflection needs both halves: what happened, told in specific detail, and what it meant.'
        : 'Watch for a lesson that is simply announced at the end. An earned insight grows out of a particular detail in the paragraph.',
    ],
    solution: [`The strongest paragraph moves from a precise detail to an insight that the detail has earned.`, `Of the others, ${andList(wrong.map((k) => `one ${RKIND_SHORT[k]}`))}.`],
  };
}

export const RESEARCH_SKILLS: SkillDef[] = [
  skill({
    id: 'e12-source-evaluation',
    name: 'Evaluating sources',
    description: 'Judge a source for a stated research question by its authority, evidence, currency, purpose and relevance, and weigh a mixed source fairly.',
    outcomes: OUTCOMES,
    lessonId: RESEARCH,
    format: 'mc',
    gen: sourceEvaluation,
  }),
  skill({
    id: 'e12-integrating-sources',
    name: 'Integrating sources',
    description: 'Weave two sources into your own argument, accurately, in your own words and with attribution, and recognize source dumping, misrepresentation, patchwriting and missing credit.',
    outcomes: OUTCOMES,
    lessonId: RESEARCH,
    format: 'mc',
    gen: integratingSources,
  }),
  skill({
    id: 'e12-reflective-writing',
    name: 'Reflective writing',
    description: 'Recognize reflective writing that moves from specific experience to an earned insight, and name what is wrong with narration, vague generality or a tacked-on moral.',
    outcomes: OUTCOMES,
    lessonId: REFLECT,
    format: 'mc',
    gen: reflectiveWriting,
  }),
];
