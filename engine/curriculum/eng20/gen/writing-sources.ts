/**
 * Grade 11 English, lessons 6.3 and 6.4: Using Sources and The Argumentative Essay (11-F2).
 * Acceptable paraphrase against patchwriting, copying, missing credit and changed meaning; summary
 * against paraphrase; synthesis of several sources; the parts of an argument, including the
 * reasoning (warrant) that links evidence to a claim; concession and rebuttal; and qualified claims.
 * Every source here is invented for practice and says so; no citation style is tested.
 */
import { fixedChoice, mc, part, skill, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { block, q } from '../../eng10/gen/common.ts';
import { order } from './writing-analysis.ts';

const SOURCES = 'e11-6-3';
const ARGUE = 'e11-6-4';
const OUTCOMES = ['11-F2'];

// ---------------------------------------------------------------------------- lesson 6.3: paraphrase

interface Source {
  /** How the prompt introduces the (invented) source. */
  label: string;
  text: string;
  /** Own words and structure, same meaning, credited. */
  good: string;
  /** The source's structure with a few synonyms swapped in, credited. */
  patch: string;
  /** The source's exact words without quotation marks, credited. */
  copied: string;
  /** Own words, same meaning, but no credit. */
  noCredit: string;
  /** Own words, credited, but the meaning changed. */
  changed: string;
  /** Much shorter: the main idea only, credited. */
  summary: string;
}

const PARAPHRASE_SOURCES: Source[] = [
  {
    label: 'a report by the Lakeside Youth Health Centre',
    text: 'Teenagers who sleep fewer than eight hours on school nights are more likely to report trouble concentrating in morning lessons. The effect is strongest after nights when they used a phone or computer in bed.',
    good: 'The Lakeside Youth Health Centre found that students who get less than eight hours of sleep before a school day often say they struggle to focus in their first classes, especially if they were on a screen in bed the night before.',
    patch: 'Teens who sleep less than eight hours on school nights are more likely to report difficulty concentrating in morning classes, and the effect is strongest after nights when they used a phone or computer in bed, says the Lakeside Youth Health Centre.',
    copied: 'The Lakeside Youth Health Centre reports that teenagers who sleep fewer than eight hours on school nights are more likely to report trouble concentrating in morning lessons.',
    noCredit: 'Students who get less than eight hours of sleep before a school day often say they struggle to focus in their first classes, especially if they were on a screen in bed the night before.',
    changed: 'The Lakeside Youth Health Centre found that using a phone in bed is the main reason teenagers fall asleep in their morning lessons.',
    summary: 'The Lakeside Youth Health Centre links short sleep to poor concentration in morning lessons.',
  },
  {
    label: 'a study by the Green Streets Project',
    text: 'On summer afternoons, streets lined with mature trees were on average four degrees cooler than nearby streets with no trees. Shaded pavements also stayed cooler well into the evening.',
    good: 'According to the Green Streets Project, mature street trees lowered afternoon temperatures in summer by about four degrees compared with treeless streets close by, and the shade kept pavements cooler into the evening.',
    patch: 'On summer afternoons, streets with mature trees were on average four degrees cooler than nearby streets without trees, and shaded pavements also stayed cool well into the evening, according to the Green Streets Project.',
    copied: 'The Green Streets Project found that on summer afternoons, streets lined with mature trees were on average four degrees cooler than nearby streets with no trees.',
    noCredit: 'Mature street trees lower afternoon temperatures in summer by about four degrees compared with treeless streets close by, and their shade keeps pavements cooler into the evening.',
    changed: 'The Green Streets Project found that planting young trees makes a street four degrees cooler all year round.',
    summary: 'The Green Streets Project found that street trees keep summer streets noticeably cooler.',
  },
  {
    label: 'a survey by the National Reading Trust',
    text: 'Students who read for pleasure at least three times a week knew, on average, twice as many uncommon words as students who rarely read outside school. The difference grew larger with every year of secondary school.',
    good: 'The National Reading Trust reports that frequent readers, who read for enjoyment three or more times a week, had roughly double the vocabulary of uncommon words of students who seldom read outside class, and the gap widened as students moved up through secondary school.',
    patch: 'Students who read for enjoyment at least three times a week knew, on average, double the number of rare words as students who seldom read outside school, and the gap grew bigger with every year of secondary school, says the National Reading Trust.',
    copied: 'According to the National Reading Trust, students who read for pleasure at least three times a week knew, on average, twice as many uncommon words as students who rarely read outside school.',
    noCredit: 'Frequent readers, who read for enjoyment three or more times a week, have roughly double the vocabulary of uncommon words of students who seldom read outside class, and the gap widens as students move up through secondary school.',
    changed: 'The National Reading Trust found that reading three times a week doubles a student’s marks in every subject.',
    summary: 'The National Reading Trust found that regular readers have much larger vocabularies.',
  },
  {
    label: 'a study by the Harbour City Transport Office',
    text: 'After protected bicycle lanes were built on four main roads, injuries to cyclists on those roads fell by almost half within two years. Injuries to pedestrians on the same roads also fell slightly.',
    good: 'The Harbour City Transport Office found that within two years of protected cycle lanes opening on four main roads, cyclist injuries there dropped by nearly fifty per cent, and pedestrians were injured a little less often too.',
    patch: 'After protected bike lanes were built on four major roads, injuries to cyclists on those roads dropped by almost half within two years, and injuries to pedestrians on the same roads also went down slightly, says the Harbour City Transport Office.',
    copied: 'The Harbour City Transport Office reports that after protected bicycle lanes were built on four main roads, injuries to cyclists on those roads fell by almost half within two years.',
    noCredit: 'Within two years of protected cycle lanes opening on four main roads, cyclist injuries there dropped by nearly fifty per cent, and pedestrians were injured a little less often too.',
    changed: 'The Harbour City Transport Office found that bicycle lanes have ended all accidents on the city’s roads.',
    summary: 'The Harbour City Transport Office found that protected bicycle lanes made cycling much safer.',
  },
  {
    label: 'an article by the Riverside School Garden Network',
    text: 'Children who helped grow vegetables at school were more willing to try new vegetables at lunch than children who did not. The change lasted for at least a year after the gardening ended.',
    good: 'According to the Riverside School Garden Network, pupils who took part in school vegetable gardening became readier to taste unfamiliar vegetables at lunch than their classmates, and this lasted for a year or more after the project finished.',
    patch: 'Children who helped grow vegetables at school were more willing to taste new vegetables at lunch than children who did not, and the change lasted at least a year after the gardening finished, says the Riverside School Garden Network.',
    copied: 'The Riverside School Garden Network says that children who helped grow vegetables at school were more willing to try new vegetables at lunch than children who did not.',
    noCredit: 'Pupils who take part in school vegetable gardening become readier to taste unfamiliar vegetables at lunch than their classmates, and this lasts for a year or more after the project finishes.',
    changed: 'The Riverside School Garden Network found that school gardens make children stop eating sweets.',
    summary: 'The Riverside School Garden Network found that gardening at school makes children more open to vegetables.',
  },
  {
    label: 'a report by the Youth Work Research Group',
    text: 'Students who worked more than fifteen hours a week in part-time jobs had lower average marks than students who worked fewer hours. Students who worked up to ten hours a week did about as well as those who did not work at all.',
    good: 'The Youth Work Research Group reports that part-time work only seemed to hurt marks beyond fifteen hours a week: students working up to ten hours a week had marks much like those of students with no job.',
    patch: 'Students who worked over fifteen hours a week in part-time jobs had lower average grades than students who worked fewer hours, while students who worked up to ten hours a week did about as well as those who did not work, says the Youth Work Research Group.',
    copied: 'According to the Youth Work Research Group, students who worked more than fifteen hours a week in part-time jobs had lower average marks than students who worked fewer hours.',
    noCredit: 'Part-time work only seems to hurt marks beyond fifteen hours a week: students working up to ten hours a week have marks much like those of students with no job.',
    changed: 'The Youth Work Research Group found that any part-time job lowers a student’s marks.',
    summary: 'The Youth Work Research Group found that only long hours of part-time work lowered students’ marks.',
  },
];

type PFlaw = 'good' | 'patch' | 'noCredit' | 'changed';
const PFLAW_LABEL: Record<PFlaw, string> = {
  good: 'Nothing: it is an acceptable paraphrase.',
  patch: 'It keeps the source’s sentence structure and swaps in a few synonyms (patchwriting).',
  noCredit: 'It does not say where the idea comes from.',
  changed: 'It changes what the source says.',
};
const PFLAW_WHY: Record<PFlaw, string> = {
  good: 'It uses the writer’s own words and sentence structure, keeps the source’s meaning and says where the idea comes from.',
  patch: 'It follows the source sentence by sentence and only swaps a few words for synonyms. That is still too close to the original: it is plagiarism, even with the source named.',
  noCredit: 'The wording is the writer’s own, but the idea belongs to the source, and the paraphrase never says so. Presenting someone else’s idea without credit is plagiarism.',
  changed: 'The wording is the writer’s own and the source is named, but the sentence claims something the source never said.',
};

const sourceBlock = (s: Source) => `This passage is from ${s.label} (an invented source, for practice):\n\n${block(s.text)}`;

function paraphraseSources(rng: Rng, d: Difficulty): GenOutput {
  const s = rng.pick(PARAPHRASE_SOURCES);
  if (d === 1) {
    if (rng.chance(0.4)) {
      const isSummary = rng.chance(0.5);
      return {
        prompt: `${sourceBlock(s)}\n\nA student wrote:\n\n${block(isSummary ? s.summary : s.good)}\n\nIs this a **paraphrase** or a **summary** of the source?`,
        parts: [part(fixedChoice(['A paraphrase: all the source’s ideas, in the student’s own words', 'A summary: only the main idea, much shorter'], isSummary ? 1 : 0))],
        hints: ['A paraphrase restates all of a passage in new words and is about as long as the original. A summary keeps only the main idea and is much shorter.'],
        solution: [isSummary ? 'It keeps only the main idea and drops the details, so it is a summary.' : 'It restates every idea of the source in new words, at about the same length, so it is a paraphrase.'],
      };
    }
    return {
      prompt: `${sourceBlock(s)}\n\nWhich is an acceptable paraphrase?`,
      parts: [part(mc(rng, s.good, [s.copied, s.changed]))],
      hints: ['An acceptable paraphrase uses your own words and sentence structure, keeps the source’s meaning, and says where the idea comes from.'],
      solution: [`${q(s.good)} is acceptable: ${PFLAW_WHY.good[0].toLowerCase()}${PFLAW_WHY.good.slice(1)}`, 'Of the others, one copies the source’s exact words without quotation marks, and one changes what the source says.'],
    };
  }
  if (d === 2) {
    return {
      prompt: `${sourceBlock(s)}\n\nWhich is an acceptable paraphrase?`,
      parts: [part(mc(rng, s.good, [s.patch, s.noCredit, s.changed]))],
      hints: ['Check three things: are the words and sentence structure the writer’s own, is the meaning the same, and is the source named?'],
      solution: [`${q(s.good)} passes all three tests.`, 'Of the others, one only swaps a few synonyms into the source’s sentences (patchwriting), one never says where the idea comes from, and one changes what the source says.'],
    };
  }
  const flaw = rng.pick(['good', 'patch', 'noCredit', 'changed'] as PFlaw[]);
  return {
    prompt: `${sourceBlock(s)}\n\nA student wrote this paraphrase:\n\n${block(s[flaw])}\n\nWhat, if anything, is wrong with it?`,
    parts: [part(mc(rng, PFLAW_LABEL[flaw], (Object.keys(PFLAW_LABEL) as PFlaw[]).filter((x) => x !== flaw).map((x) => PFLAW_LABEL[x])))],
    hints: ['Compare the paraphrase with the source sentence by sentence: whose structure and words, the same meaning or not, and is the source named?'],
    solution: [PFLAW_WHY[flaw]],
  };
}

// ---------------------------------------------------------------------------- lesson 6.3: synthesis

interface Synthesis {
  topic: string;
  /** Labelled findings of invented sources. */
  sources: string[];
  good: string;
  /** Lists the sources one after another without connecting them. */
  list: string;
  /** Uses only one source. */
  oneSource: string;
  /** Claims more than, or something different from, what a source found. */
  misrep: string;
}

/** Two sources each, for difficulties 1 and 2. */
const SYNTH2: Synthesis[] = [
  {
    topic: 'school start times',
    sources: ['**Source A**, a sleep researcher: Teenagers’ body clocks shift later in adolescence, so many cannot fall asleep before eleven at night.', '**Source B**, a district report: When two schools moved their start time from 8:00 to 9:00, attendance at first-period classes rose by six per cent.'],
    good: 'Because teenagers’ body clocks make early sleep difficult (Source A), it is not surprising that a later start brought more students to first-period classes (Source B).',
    list: 'Source A says teenagers cannot fall asleep before eleven. Source B says attendance rose when two schools started at 9:00.',
    oneSource: 'When two schools started an hour later, attendance at first-period classes rose by six per cent (Source B).',
    misrep: 'Both sources prove that a later start makes every student sleep more and get better marks.',
  },
  {
    topic: 'phones in class',
    sources: ['**Source A**, a classroom study: Students who kept their phones on their desks remembered less of a lesson than students whose phones were in their bags, even when the phones never rang.', '**Source B**, a survey of teachers: Most teachers said students checked their phones several times in each lesson.'],
    good: 'Phones seem to distract students twice over: they are checked often during lessons (Source B), and even a silent phone on the desk reduces how much students remember (Source A).',
    list: 'Source A is a classroom study about phones on desks. Source B is a survey of teachers about checking phones.',
    oneSource: 'Most teachers report that students check their phones several times a lesson (Source B).',
    misrep: 'Both sources show that phones ringing in class are the main reason students forget lessons.',
  },
  {
    topic: 'green space and health',
    sources: ['**Source A**, a city health survey: People who lived within a five-minute walk of a park reported exercising more often than people who lived further away.', '**Source B**, a hospital study: Patients whose windows looked out on trees recovered from surgery slightly faster than patients facing a brick wall.'],
    good: 'Green space appears to help health in more than one way: living near a park is linked to more exercise (Source A), and even a view of trees seems to speed recovery (Source B).',
    list: 'Source A found something about parks. Source B found something about hospital windows.',
    oneSource: 'People who live near a park say they exercise more often (Source A).',
    misrep: 'Both sources prove that looking at trees cures illness.',
  },
  {
    topic: 'reading on paper and on screens',
    sources: ['**Source A**, a university study: Students who read a long article on paper answered more questions about it correctly than students who read it on a screen.', '**Source B**, a library survey: Most students said they preferred reading short texts on their phones.'],
    good: 'Although students say they prefer screens for short reading (Source B), paper may still serve them better for long, demanding texts (Source A).',
    list: 'Source A compared paper and screens. Source B asked students what they prefer.',
    oneSource: 'Students who read a long article on paper understood it better than those who read it on a screen (Source A).',
    misrep: 'Both sources show that students understand everything better on paper.',
  },
  {
    topic: 'volunteering',
    sources: ['**Source A**, a youth charity survey: Teenagers who volunteered at least once a month were more likely to say they felt part of their community.', '**Source B**, an employers’ survey: Most employers said volunteer work on a young person’s application showed reliability.'],
    good: 'Volunteering seems to benefit young people both personally and practically: it is linked to a stronger sense of belonging (Source A), and employers see it as a sign of reliability (Source B).',
    list: 'Source A surveyed teenagers about volunteering. Source B surveyed employers.',
    oneSource: 'Employers say volunteer work shows that a young applicant is reliable (Source B).',
    misrep: 'Both sources prove that every teenager who volunteers will get a job.',
  },
  {
    topic: 'homework',
    sources: ['**Source A**, a study of Grade 11 students: Students who did about an hour of homework a night did better on tests than those who did none.', '**Source B**, the same study: Students who did more than three hours a night did no better than those who did one hour, and reported more stress.'],
    good: 'Homework seems to help only up to a point: about an hour a night improves test results (Source A), but much more than that adds stress without adding marks (Source B).',
    list: 'Source A says one hour of homework helps. Source B says three hours does not help more.',
    oneSource: 'Students who did an hour of homework a night did better on tests than those who did none (Source A).',
    misrep: 'Both sources show that the more homework students do, the better their marks.',
  },
];

/** Three sources each, one of them qualifying the others, for difficulty 3. */
const SYNTH3: Synthesis[] = [
  {
    topic: 'four-day school weeks',
    sources: [
      '**Source A**, a district report: After switching to a four-day week, teacher job applications rose by a third.',
      '**Source B**, a parents’ survey: Many parents of young children struggled to find care on the fifth day.',
      '**Source C**, a study of test results: Marks stayed about the same after the switch.',
    ],
    good: 'A four-day week may help schools attract teachers (Source A) without lowering marks (Source C), but its cost to families who need childcare on the fifth day (Source B) means it is not a simple win.',
    list: 'Source A is about teacher applications. Source B is about parents. Source C is about test results.',
    oneSource: 'After one district switched to a four-day week, teacher applications rose by a third (Source A).',
    misrep: 'All three sources agree that a four-day week is better for everyone.',
  },
  {
    topic: 'school uniforms',
    sources: [
      '**Source A**, a survey of parents: Most parents said uniforms reduced morning arguments about clothes.',
      '**Source B**, a study of several schools: Bringing in uniforms made no measurable difference to behaviour.',
      '**Source C**, a family budget study: Uniforms cost less than buying fashionable clothes, but more in schools that require a branded blazer.',
    ],
    good: 'Uniforms may make mornings easier for families (Source A), but they do not seem to improve behaviour (Source B), and whether they save money depends on what the school requires (Source C).',
    list: 'Source A asked parents. Source B studied behaviour. Source C looked at budgets.',
    oneSource: 'Most parents say uniforms reduce arguments about clothes in the morning (Source A).',
    misrep: 'The sources agree that uniforms improve behaviour and always save families money.',
  },
  {
    topic: 'online learning',
    sources: [
      '**Source A**, a college survey: Students who worked full-time valued being able to study online at any hour.',
      '**Source B**, a study of course results: Students in online courses were more likely to drop out than students in classroom courses.',
      '**Source C**, the same study: Online students who met a tutor by video once a week dropped out no more often than classroom students.',
    ],
    good: 'Online courses give working students valuable flexibility (Source A), and although they lose more students than classroom courses (Source B), regular contact with a tutor seems to close that gap (Source C).',
    list: 'Source A surveyed students. Source B studied drop-out rates. Source C looked at tutors.',
    oneSource: 'Students in online courses drop out more often than students in classroom courses (Source B).',
    misrep: 'The sources show that online courses always have more students dropping out, whatever support they offer.',
  },
  {
    topic: 'electric scooters in cities',
    sources: [
      '**Source A**, a city transport report: Rental e-scooters replaced many short car trips in the city centre.',
      '**Source B**, a hospital report: Injuries from e-scooter accidents rose sharply in the first year.',
      '**Source C**, a later city report: Injuries fell after the city lowered the speed limit for e-scooters and added more bicycle lanes.',
    ],
    good: 'E-scooters can take cars off city streets (Source A), and the rise in injuries they first brought (Source B) seems to fall when cities lower their speed and give them safe lanes (Source C).',
    list: 'Source A is about car trips. Source B is about injuries. Source C is about speed limits.',
    oneSource: 'Injuries from e-scooter accidents rose sharply in the first year (Source B).',
    misrep: 'All three sources prove that e-scooters are dangerous and should be banned.',
  },
];

function synthesis(rng: Rng, d: Difficulty): GenOutput {
  const s = rng.pick(d === 3 ? SYNTH3 : SYNTH2);
  const wrong = d === 1 ? [s.list, s.oneSource] : [s.list, s.oneSource, s.misrep];
  return {
    prompt: `A student is writing about ${s.topic} and has these findings from invented sources, for practice:\n\n${s.sources.map((x) => `- ${x}`).join('\n')}\n\nWhich sentence best **synthesizes** the sources?`,
    parts: [part(mc(rng, s.good, wrong))],
    hints: [d === 3 ? 'Synthesis connects all the sources into one point, and when one source qualifies or complicates the others, a good synthesis says so.' : 'Synthesis connects the sources into one point of your own, using each source accurately; listing the sources one after another is not synthesis.'],
    solution: [
      `${q(s.good)} connects ${d === 3 ? 'all three sources' : 'both sources'} into one point and represents each accurately.`,
      d === 1 ? 'Of the others, one only lists the sources and one uses just one of them.' : 'Of the others, one only lists the sources, one uses just one of them, and one claims more than the sources found.',
    ],
  };
}

// ---------------------------------------------------------------------------- lesson 6.4: the parts of an argument

type Role = 'claim' | 'reason' | 'evidence' | 'warrant' | 'counter' | 'rebuttal';
const ROLES: Role[] = ['claim', 'reason', 'evidence', 'warrant', 'counter', 'rebuttal'];
const ROLE_LABEL: Record<Role, string> = {
  claim: 'The claim',
  reason: 'A reason',
  evidence: 'Evidence',
  warrant: 'The reasoning (warrant) that links the evidence to the claim',
  counter: 'A counterargument',
  rebuttal: 'A rebuttal',
};
const ROLE_WHY: Record<Role, string> = {
  claim: 'It states the position the whole argument sets out to prove.',
  reason: 'It gives a reason why the claim is true.',
  evidence: 'It gives specific facts or findings that support the reason.',
  warrant: 'It explains why the evidence proves the claim: the reasoning that connects them.',
  counter: 'It states a view that opposes the claim.',
  rebuttal: 'It answers the opposing view.',
};
/** Roles too close to each other to offer as alternatives. */
const ROLE_OVERLAP: Record<Role, Role[]> = { reason: ['warrant'], warrant: ['reason'], claim: [], evidence: [], counter: [], rebuttal: [] };

interface Argument {
  claim: string;
  reason: string;
  evidence: string;
  warrant: string;
  counter: string;
  rebuttal: string;
  /** Wrong answers for "which sentence is the warrant". */
  restate: string;
  moreEvidence: string;
  irrelevant: string;
}

const ARGUMENTS: Argument[] = [
  {
    claim: 'Our school should start classes at 9:00 instead of 8:00.',
    reason: 'A later start would let students get the sleep they need to learn.',
    evidence: 'When two schools in our district made this change, attendance at first-period classes rose by six per cent.',
    warrant: 'If more students arrive for the first lesson when school starts later, then a later start is helping students take part in learning, not just letting them sleep in.',
    counter: 'Some parents worry that a later start would make it harder for them to get to work on time.',
    rebuttal: 'However, the school could open its library at 8:00 for supervised reading, so students could still be dropped off early.',
    restate: 'Starting school at 9:00 would be better than starting at 8:00.',
    moreEvidence: 'In the same district, more students also ate breakfast after the change.',
    irrelevant: 'Many famous people have said that sleep is important.',
  },
  {
    claim: 'The city should build protected bicycle lanes on its main roads.',
    reason: 'Protected lanes would make cycling much safer.',
    evidence: 'In a nearby city, cyclist injuries on four main roads fell by almost half within two years of protected lanes being built.',
    warrant: 'Because our main roads carry similar traffic to that city’s, we can expect protected lanes to cut injuries here in a similar way.',
    counter: 'Some drivers argue that the lanes would take away space for cars and slow traffic.',
    rebuttal: 'Yet in that same city, travel times by car changed by less than a minute, because some drivers switched to bicycles.',
    restate: 'Protected bicycle lanes are a good idea for our city.',
    moreEvidence: 'Injuries to pedestrians on those roads also fell slightly.',
    irrelevant: 'Cycling is a popular sport around the world.',
  },
  {
    claim: 'Every secondary school should have a vegetable garden.',
    reason: 'Growing food changes what students are willing to eat.',
    evidence: 'In one study, children who helped grow vegetables at school were more willing to try new vegetables at lunch, and the change lasted at least a year.',
    warrant: 'If working in a garden makes students more willing to eat vegetables for a year or more, then a school garden can shape healthy habits long after the lessons end.',
    counter: 'Critics say gardens take up time that should be spent on core subjects.',
    rebuttal: 'But a garden can be a science and mathematics classroom too, as students measure growth, test soil and keep records.',
    restate: 'Schools should definitely have vegetable gardens.',
    moreEvidence: 'Gardening also gets students outdoors and moving.',
    irrelevant: 'Vegetables come in many different colours.',
  },
  {
    claim: 'Students should be limited to ten hours of part-time work a week during the school year.',
    reason: 'Long working hours harm students’ marks.',
    evidence: 'A study found that students who worked more than fifteen hours a week had lower average marks, while those who worked up to ten hours did as well as students with no job.',
    warrant: 'Since the harm appears only above ten to fifteen hours, a limit of ten hours would protect marks while still letting students earn money and gain experience.',
    counter: 'Some students need to work longer hours to help support their families.',
    rebuttal: 'For those students, schools could offer grants or flexible timetables, so that no one has to choose between money and an education.',
    restate: 'Part-time work should be limited for students.',
    moreEvidence: 'The study also found that working students learned to manage their time.',
    irrelevant: 'Many adults had part-time jobs when they were young.',
  },
  {
    claim: 'Phones should be kept in lockers during lessons.',
    reason: 'Phones distract students even when no one is using them.',
    evidence: 'In a classroom study, students whose phones lay silent on their desks remembered less of a lesson than students whose phones were in their bags.',
    warrant: 'If even a silent phone in sight lowers what students remember, then keeping phones out of sight altogether is the surest way to protect learning.',
    counter: 'Some argue that students need their phones in case of an emergency.',
    rebuttal: 'But in an emergency the school office can always reach students and families, and phones would still be available at break.',
    restate: 'Students should not have their phones out in lessons.',
    moreEvidence: 'Most teachers also report that students check their phones several times a lesson.',
    irrelevant: 'Phones have become much more powerful in the last twenty years.',
  },
];

function argumentStructure(rng: Rng, d: Difficulty): GenOutput {
  const a = rng.pick(ARGUMENTS);
  if (d === 1) {
    const role = rng.pick(ROLES);
    const shown = ROLES.map((r, i) => `**(${i + 1})** ${a[r]}`).join(' ');
    const others = rng.shuffle(ROLES.filter((r) => r !== role && !ROLE_OVERLAP[role].includes(r))).slice(0, 3);
    return {
      prompt: `${block(shown)}\n\nWhat is the role of sentence **(${ROLES.indexOf(role) + 1})** in this argument?`,
      parts: [part(mc(rng, ROLE_LABEL[role], others.map((r) => ROLE_LABEL[r])))],
      hints: ['A claim is the position; a reason supports it; evidence backs up the reason; the warrant explains why the evidence proves the claim; a counterargument opposes it; a rebuttal answers the counterargument.'],
      solution: [`Sentence (${ROLES.indexOf(role) + 1}): ${ROLE_WHY[role]}`],
    };
  }
  if (d === 2) {
    if (rng.chance(0.5)) {
      return {
        prompt: `An argument makes this claim and gives this evidence:\n\n${block(`${a.claim} ${a.evidence}`)}\n\nWhich sentence is the best **warrant**: the reasoning that explains why the evidence proves the claim?`,
        parts: [part(mc(rng, a.warrant, [a.restate, a.moreEvidence, a.irrelevant]))],
        hints: ['A warrant does not add new facts or repeat the claim. It explains the link: *if this evidence is true, why does the claim follow?*'],
        solution: [`${q(a.warrant)} explains why the evidence supports the claim.`, 'Of the others, one only repeats the claim, one adds more evidence without explaining it, and one is beside the point.'],
      };
    }
    return order(
      rng,
      'Put the sentences of this argument in the most logical order.',
      ROLES.map((r) => a[r]),
      ['Start with the position, support it, explain the support, and then deal with the other side.'],
      ['The claim comes first, then a reason, the evidence for it, the warrant that explains the evidence, a counterargument, and finally the rebuttal that answers it.'],
    );
  }
  type Missing = 'evidence' | 'warrant' | 'rebuttal' | 'counter';
  // A missing warrant is left out: warrants are often implicit, so its absence is not always a gap.
  const missing = rng.pick(['evidence', 'rebuttal', 'counter'] as Missing[]);
  const keep: Role[] =
    missing === 'counter' ? ['claim', 'reason', 'evidence', 'warrant'] : ROLES.filter((r) => r !== missing);
  const MISSING_LABEL: Record<Missing, string> = {
    evidence: 'Evidence to support the reason',
    warrant: 'Reasoning that explains why the evidence proves the claim',
    rebuttal: 'A rebuttal that answers the counterargument',
    counter: 'Any opposing view (a counterargument)',
  };
  const MISSING_WHY: Record<Missing, string> = {
    evidence: 'The argument gives a reason, but no facts or findings back it up.',
    warrant: 'The argument gives evidence but never explains why that evidence proves the claim.',
    rebuttal: 'The argument raises an opposing view and then leaves it unanswered, so the reader is left with the objection.',
    counter: 'The argument never considers the other side, so it seems one-sided.',
  };
  return {
    prompt: `${block(keep.map((r) => a[r]).join(' '))}\n\nWhat is the biggest gap in this argument?`,
    parts: [part(mc(rng, MISSING_LABEL[missing], (Object.keys(MISSING_LABEL) as Missing[]).filter((m) => m !== missing).map((m) => MISSING_LABEL[m])))],
    hints: ['Check the argument against its parts: claim, reason, evidence, reasoning that links them, a counterargument and a rebuttal.'],
    solution: [MISSING_WHY[missing]],
  };
}

// ---------------------------------------------------------------------------- lesson 6.4: concession and qualifiers

interface Concession {
  claim: string;
  counter: string;
  /** Admits a point to the other side, and only that. */
  concedeOnly: string;
  /** Concedes, then turns back to the claim with a reason. */
  good: string;
  /** Concedes and abandons the claim. */
  giveUp: string;
  /** Rebuts without acknowledging anything. */
  ignore: string;
  /** Mocks the other side. */
  dismiss: string;
  /** A plain denial with no reason. */
  deny: string;
  qualified: string;
  overstated: string;
  never: string;
  hedged: string;
}

const CONCESSIONS: Concession[] = [
  {
    claim: 'The school day should start at 9:00.',
    counter: 'A later start would make mornings harder for working parents.',
    concedeOnly: 'It is true that a later start would make some parents’ mornings harder.',
    good: 'It is true that a later start would make some parents’ mornings harder, but opening the library at 8:00 for supervised reading would solve that problem while still giving students more sleep.',
    giveUp: 'It is true that a later start would make some parents’ mornings harder, so the school should probably keep its 8:00 start.',
    ignore: 'A later start would give students more sleep, so it is clearly the right choice.',
    dismiss: 'Parents who complain about a later start only care about themselves.',
    deny: 'A later start would not cause any problems for anyone.',
    qualified: 'For most students, a later start would probably mean more sleep and better attendance.',
    overstated: 'A later start would improve the life of every single student.',
    never: 'An early start never helps any student learn.',
    hedged: 'It is possible that a later start might perhaps help some students a little, in some cases.',
  },
  {
    claim: 'The city should build protected bicycle lanes.',
    counter: 'The lanes would take space away from cars.',
    concedeOnly: 'Admittedly, protected lanes would take some road space away from cars.',
    good: 'Admittedly, protected lanes would take some road space away from cars, but in a nearby city that built them, car journeys slowed by less than a minute while cycling injuries fell by almost half.',
    giveUp: 'Admittedly, protected lanes would take some road space away from cars, so perhaps the city should leave the roads as they are.',
    ignore: 'Protected lanes make cycling safer, and that is all that matters.',
    dismiss: 'Drivers who complain about bicycle lanes are just selfish.',
    deny: 'Bicycle lanes take no space from anyone.',
    qualified: 'On busy main roads, protected bicycle lanes would likely make cycling much safer.',
    overstated: 'Bicycle lanes would end every traffic accident in the city.',
    never: 'Cyclists are never safe on roads without protected lanes.',
    hedged: 'Bicycle lanes could possibly, perhaps, make some cycling slightly safer in certain situations.',
  },
  {
    claim: 'Phones should be kept in lockers during lessons.',
    counter: 'Students might need their phones in an emergency.',
    concedeOnly: 'Certainly, families want to be able to reach students in an emergency.',
    good: 'Certainly, families want to be able to reach students in an emergency, but the school office can always do that, and phones would still be available at break.',
    giveUp: 'Certainly, families want to be able to reach students in an emergency, so phones should probably stay on students’ desks.',
    ignore: 'Phones distract students, so they should be locked away.',
    dismiss: 'Anyone who thinks students need phones in class is not thinking clearly.',
    deny: 'There is no reason at all for a student to have a phone at school.',
    qualified: 'In most lessons, keeping phones out of sight would probably help students concentrate.',
    overstated: 'Locking phones away would make every student concentrate perfectly.',
    never: 'Students never learn anything when their phones are nearby.',
    hedged: 'Maybe locking phones away might possibly help some students concentrate a bit, sometimes.',
  },
  {
    claim: 'Every secondary school should have a vegetable garden.',
    counter: 'Gardens take time away from core subjects.',
    concedeOnly: 'Granted, a garden takes time that could be spent in the classroom.',
    good: 'Granted, a garden takes time that could be spent in the classroom, yet that time can teach science and mathematics as students measure growth and record results.',
    giveUp: 'Granted, a garden takes time that could be spent in the classroom, so schools should probably not bother with one.',
    ignore: 'School gardens teach students to eat healthily, so every school needs one.',
    dismiss: 'Only people who have never touched soil would object to school gardens.',
    deny: 'A school garden takes no time away from anything.',
    qualified: 'For many students, working in a school garden can encourage healthier eating.',
    overstated: 'A school garden would make every student eat vegetables for the rest of their life.',
    never: 'Students who have no school garden never learn to eat well.',
    hedged: 'It might perhaps be possible that a garden could maybe help a few students eat a little better.',
  },
  {
    claim: 'Students should work no more than ten hours a week during the school year.',
    counter: 'Some students need the money to help their families.',
    concedeOnly: 'Some students do need to earn money to help their families.',
    good: 'Some students do need to earn money to help their families, but grants and flexible timetables could support them without asking them to sacrifice their marks.',
    giveUp: 'Some students do need to earn money to help their families, so there should be no limit at all.',
    ignore: 'Long hours lower marks, so a limit is obviously necessary.',
    dismiss: 'Students who want to work long hours are just greedy.',
    deny: 'No student really needs to work more than ten hours a week.',
    qualified: 'For most students, working more than fifteen hours a week is likely to lower their marks.',
    overstated: 'Any student with a job will fail all of their courses.',
    never: 'Working students never do well at school.',
    hedged: 'Working a lot might perhaps sometimes possibly affect marks for certain students, maybe.',
  },
];

function concession(rng: Rng, d: Difficulty): GenOutput {
  const c = rng.pick(CONCESSIONS);
  const context = `An essay argues: **${c.claim}** One counterargument is: ${c.counter}`;
  if (d === 1) {
    return {
      prompt: `${context}\n\nWhich sentence makes a **concession**: it admits that the other side has a point?`,
      parts: [part(mc(rng, c.concedeOnly, [c.deny, c.dismiss, c.ignore]))],
      hints: ['A concession grants that something in the opposing view is true or fair. Words such as *admittedly*, *granted*, *certainly* and *it is true that* often signal one.'],
      solution: [`${q(c.concedeOnly)} admits that the other side has a fair point.`, 'The others deny the point, mock the people who make it, or ignore it.'],
    };
  }
  if (d === 2) {
    return {
      prompt: `${context}\n\nWhich sentence handles the counterargument best?`,
      parts: [part(mc(rng, c.good, [c.giveUp, c.ignore, c.dismiss]))],
      hints: ['The strongest response concedes what is fair in the other view and then turns back to the claim with a reason or evidence.'],
      solution: [`${q(c.good)} concedes what is fair and then answers it with a reason, so the writer’s position is stronger for it.`, 'Of the others, one concedes and then abandons the claim, one ignores the counterargument, and one mocks the people who hold it.'],
    };
  }
  return {
    prompt: `An essay argues: **${c.claim}** Which version of a supporting claim is the most reasonable: neither overstated nor buried in hedges?`,
    parts: [part(mc(rng, c.qualified, [c.overstated, c.never, c.hedged]))],
    hints: ['A well-qualified claim uses words such as *most*, *many*, *often* or *likely* to claim only what the evidence can support. Absolutes such as *every*, *all* and *never* overstate; piling up *maybe*, *perhaps* and *possibly* says almost nothing.'],
    solution: [`${q(c.qualified)} claims only what the evidence can support, using qualifiers such as “most”, “many”, “probably” or “likely”, without hedging every word.`, 'Of the others, two overstate with absolutes and one hedges so much that it claims almost nothing.'],
  };
}

export const SOURCES_SKILLS: SkillDef[] = [
  skill({
    id: 'e11-paraphrase-sources',
    name: 'Paraphrase, summary and plagiarism',
    description: 'Tell an acceptable paraphrase from patchwriting, copying, missing credit and a changed meaning, and tell a paraphrase from a summary.',
    outcomes: OUTCOMES,
    lessonId: SOURCES,
    format: 'mc',
    gen: paraphraseSources,
  }),
  skill({
    id: 'e11-synthesis',
    name: 'Synthesizing sources',
    description: 'Choose the sentence that connects several sources accurately into one point, rather than listing them, using only one or misrepresenting them.',
    outcomes: OUTCOMES,
    lessonId: SOURCES,
    format: 'mc',
    gen: synthesis,
  }),
  skill({
    id: 'e11-argument-structure',
    name: 'The structure of an argument',
    description: 'Name the claim, reasons, evidence, warrant, counterargument and rebuttal of an argument, put them in order, and find the part that is missing.',
    outcomes: OUTCOMES,
    lessonId: ARGUE,
    format: 'mc',
    gen: argumentStructure,
  }),
  skill({
    id: 'e11-concession',
    name: 'Concession, rebuttal and qualifiers',
    description: 'Recognize a concession, choose the best concession-and-rebuttal, and choose a claim qualified to fit the evidence.',
    outcomes: OUTCOMES,
    lessonId: ARGUE,
    format: 'mc',
    gen: concession,
  }),
];
