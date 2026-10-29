/**
 * Grade 10 English, lessons 6.5 and 6.6: Revising and Editing, and Writing Under a Time Limit (10-F2).
 * Transitions that show how ideas connect, cutting wordiness and redundancy, paragraph unity and
 * order, the key words of essay prompts, and planning a timed essay.
 */
import { fixedChoice, mc, part, skill, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { block, fill, people, q } from './common.ts';
import { order } from './writing-persuade.ts';

const REVISE = 'e10-6-5';
const TIMED = 'e10-6-6';
const OUTCOMES = ['10-F2'];
const GAP = '\\_\\_\\_\\_\\_';

// ---------------------------------------------------------------------------- lesson 6.5: transitions

type Relation = 'contrast' | 'cause' | 'addition' | 'example' | 'sequence' | 'conclusion';
const RELATION_NAME: Record<Relation, string> = {
  contrast: 'Contrast',
  cause: 'Cause and effect',
  addition: 'Addition',
  example: 'Example',
  sequence: 'Sequence (time order)',
  conclusion: 'Conclusion',
};
const RELATION_WHAT: Record<Relation, string> = {
  contrast: 'the second idea goes against what the first leads you to expect',
  cause: 'the second idea is a result of the first',
  addition: 'the second idea adds another point of the same kind',
  example: 'the second idea is a specific example of the first',
  sequence: 'the second event happens after the first',
  conclusion: 'the second sentence sums up the points before it',
};
const WORDS: Record<Relation, string[]> = {
  contrast: ['However', 'Even so', 'Nevertheless'],
  cause: ['As a result', 'Therefore', 'Consequently'],
  addition: ['In addition', 'Also', 'What is more'],
  example: ['For example', 'For instance'],
  sequence: ['Next', 'Then', 'After that'],
  conclusion: ['In conclusion', 'Overall', 'In short'],
};
/** Relations whose words could also fit some pairs of another relation, never offered against it. */
const CLOSE: Record<Relation, Relation[]> = {
  contrast: ['sequence', 'addition'],
  cause: ['sequence', 'conclusion'],
  addition: ['example'],
  example: ['addition', 'cause'],
  sequence: ['addition', 'cause'],
  conclusion: ['cause', 'addition'],
};
const PAIRS: Record<Relation, Array<[string, string]>> = {
  contrast: [
    ['The forecast promised sunshine.', 'it rained all afternoon.'],
    ['NAME practised the speech for weeks.', '{he} forgot {his} lines on the night.'],
    ['Most of the class found the test easy.', 'NAME struggled with every question.'],
    ['The museum is free on Sundays.', 'few people know about it.'],
  ],
  cause: [
    ['The bridge was closed for repairs.', 'we had to take the long way round.'],
    ['NAME forgot to set an alarm.', '{he} missed the first bus.'],
    ['Ticket sales were very low.', 'the concert was cancelled.'],
    ['The power went out during the storm.', 'the whole street was dark for hours.'],
    ['NAME trained every morning for a year.', '{he} finished the marathon in under four hours.'],
  ],
  addition: [
    ['Cycling to school saves money.', 'it keeps you fit.'],
    ['The new library has twice as many books.', 'it stays open until nine.'],
    ['The recipe is quick to make.', 'it uses only five ingredients.'],
    ['Volunteering helps the community.', 'it teaches useful skills.'],
  ],
  example: [
    ['Many fruits grow well in hot climates.', 'mangoes and pineapples thrive in the tropics.'],
    ['Some animals are active mainly at night.', 'owls and bats hunt in the dark.'],
    ['Our school offers many clubs.', 'students can join the chess club or the drama club.'],
    ['Small habits can save a lot of water.', 'turning off the tap while you brush your teeth saves many litres a week.'],
  ],
  sequence: [
    ['First, rinse the rice in cold water.', 'add it to the boiling water.'],
    ['We bought our tickets at the station.', 'we waited on the platform for the train.'],
    ['The team warmed up for twenty minutes.', 'the coach announced the starting line-up.'],
    ['NAME wrote the first draft of {his} essay on Monday.', '{he} revised it on Tuesday.'],
  ],
  conclusion: [
    ['A later start would help students sleep, concentrate and arrive on time.', 'a later start would benefit everyone at our school.'],
    ['The garden would teach science, provide fresh food and bring students together.', 'a school garden is well worth the effort.'],
    ['Refill stations would cut waste, save families money and encourage students to drink more water.', 'replacing bottled water is the right choice for our school.'],
  ],
};
const RELATIONS = Object.keys(PAIRS) as Relation[];

function transitions(rng: Rng, d: Difficulty): GenOutput {
  const rel = rng.pick(RELATIONS);
  const [a, b] = rng.pick(PAIRS[rel]);
  const cast = people(rng, 1);
  const s1 = fill(a, cast);
  const s2 = fill(b, cast);
  const word = rng.pick(WORDS[rel]);
  const pool = RELATIONS.filter((r) => r !== rel && !CLOSE[rel].includes(r));
  if (d === 3) {
    const wrong = rng.sample(pool, 3).map((r) => RELATION_NAME[r]);
    return {
      prompt: `${block(`${s1} **${word}**, ${s2}`)}\n\nWhat relationship does the transition **${word}** show between the two sentences?`,
      parts: [part(mc(rng, RELATION_NAME[rel], wrong))],
      hints: ['Ask how the second sentence relates to the first: does it go against it, follow from it, add to it, give an example of it, come after it in time, or sum things up?'],
      solution: [`${q(word)} shows ${RELATION_NAME[rel].toLowerCase()}: ${RELATION_WHAT[rel]}.`],
    };
  }
  const others = rng.sample(pool, d === 1 ? 2 : 3).map((r) => rng.pick(WORDS[r]));
  return {
    prompt: `Choose the transition that best connects the two sentences.\n\n${block(`${s1} ${GAP}, ${s2}`)}`,
    parts: [part(mc(rng, word, others))],
    hints: ['Decide first how the ideas are related: contrast, cause and effect, addition, example, sequence or conclusion. Then choose a transition that signals that relationship.'],
    solution: [`Here ${RELATION_WHAT[rel]}, so the sentence needs a transition that shows ${RELATION_NAME[rel].toLowerCase()}: **${word}**.`, `${s1} ${word}, ${s2}`],
  };
}

// ---------------------------------------------------------------------------- lesson 6.5: concise writing

interface Wordy {
  wordy: string;
  concise: string;
  /** Still wordy: only part of the padding is cut. */
  partial: string;
  /** Short, but loses part of the meaning. */
  lost: string;
  /** Too short to be a correct sentence. */
  broken: string;
}
const WORDY: Wordy[] = [
  { wordy: 'Due to the fact that it was raining, we made the decision to postpone the match until a later date.', concise: 'Because it was raining, we postponed the match.', partial: 'Because of the fact that it was raining, we decided to postpone the match until later.', lost: 'We postponed the match.', broken: 'Because raining, we postponed match.' },
  { wordy: 'In my personal opinion, I think that the ending of the story is very sad.', concise: 'I think the ending of the story is very sad.', partial: 'In my opinion, I think that the ending of the story is very sad.', lost: 'The story has an ending.', broken: 'I think ending of story sad.' },
  { wordy: 'At this point in time, the library is closed for the purpose of cleaning.', concise: 'The library is now closed for cleaning.', partial: 'At this time, the library is closed for the purpose of cleaning.', lost: 'The library is closed.', broken: 'Library now closed cleaning.' },
  { wordy: 'The reason why NAME was late is because {he} missed the bus.', concise: 'NAME was late because {he} missed the bus.', partial: 'The reason NAME was late is because {he} missed the bus.', lost: 'NAME missed the bus.', broken: 'NAME late because missed bus.' },
  { wordy: 'The committee will meet together on Monday in order to discuss and talk about the new rules.', concise: 'The committee will meet on Monday to discuss the new rules.', partial: 'The committee will meet together on Monday to discuss the new rules.', lost: 'The committee will meet on Monday.', broken: 'Committee meet Monday discuss rules.' },
  { wordy: 'It is important to note that the deadline for the project is on Friday.', concise: 'The project is due on Friday.', partial: 'It is important to note that the project is due on Friday.', lost: 'The project has a deadline.', broken: 'Project due Friday note.' },
  { wordy: 'NAME is a person who is very kind to everyone that {he} meets.', concise: 'NAME is very kind to everyone {he} meets.', partial: 'NAME is a person who is very kind to everyone {he} meets.', lost: 'NAME meets people.', broken: 'NAME very kind everyone meets.' },
  { wordy: 'The final outcome of the vote was a complete surprise to everyone who was there.', concise: 'The result of the vote surprised everyone there.', partial: 'The final outcome of the vote surprised everyone who was there.', lost: 'There was a vote.', broken: 'Vote result surprise everyone.' },
  { wordy: 'In the event that it snows, the school will be closed for the whole of the day.', concise: 'If it snows, the school will close for the day.', partial: 'In the event that it snows, the school will close for the day.', lost: 'The school will close.', broken: 'If snows, school close day.' },
  { wordy: 'We returned back to the campsite at around about midnight.', concise: 'We returned to the campsite at about midnight.', partial: 'We returned back to the campsite at about midnight.', lost: 'We were at the campsite.', broken: 'Returned campsite about midnight.' },
  { wordy: 'There are many students who walk to school each and every day.', concise: 'Many students walk to school every day.', partial: 'There are many students who walk to school every day.', lost: 'Students go to school.', broken: 'Many students walk school.' },
  { wordy: 'The play was performed by the drama club, and the play was enjoyed by the audience, and the audience clapped for a long time.', concise: 'The audience enjoyed the drama club’s play and clapped for a long time.', partial: 'The play was performed by the drama club and enjoyed by the audience, and the audience clapped for a long time.', lost: 'The drama club performed a play.', broken: 'Drama club play audience clapped long.' },
];

/** Sentences with one word that repeats what another word already says. */
const REDUNDANT: Array<{ s: string; cut: string; keep: [string, string, string]; why: string }> = [
  { s: 'The final outcome of the vote surprised everyone.', cut: 'final', keep: ['vote', 'surprised', 'everyone'], why: 'an outcome is already final' },
  { s: 'We returned back home at midnight.', cut: 'back', keep: ['home', 'midnight', 'returned'], why: '“returned” already means went back' },
  { s: 'Grandma told us about her past history in the village.', cut: 'past', keep: ['Grandma', 'village', 'told'], why: 'history is always in the past' },
  { s: 'Every customer received a free gift at the door.', cut: 'free', keep: ['customer', 'door', 'received'], why: 'a gift is already free' },
  { s: 'The two classes joined together for the concert.', cut: 'together', keep: ['classes', 'concert', 'two'], why: '“joined” already means came together' },
  { s: 'Could you repeat the question again?', cut: 'again', keep: ['question', 'Could', 'repeat'], why: '“repeat” already means say again' },
  { s: 'The end result was better than we expected.', cut: 'end', keep: ['better', 'expected', 'result'], why: 'a result already comes at the end' },
  { s: 'The shop is in close proximity to the station.', cut: 'close', keep: ['shop', 'station', 'proximity'], why: '“proximity” already means closeness' },
  { s: 'Everyone loved the unexpected surprise at the end of the film.', cut: 'unexpected', keep: ['loved', 'end', 'film'], why: 'a surprise is already unexpected' },
  { s: 'The engineers showed off their new innovation at the fair.', cut: 'new', keep: ['innovation', 'fair', 'showed'], why: 'an innovation is already new' },
  { s: 'We will need advance planning for the trip.', cut: 'advance', keep: ['trip', 'need', 'planning'], why: 'planning is always done in advance' },
];

function concise(rng: Rng, d: Difficulty): GenOutput {
  const cast = people(rng, 1);
  const f = (s: string) => fill(s, cast);
  if (d === 3 && rng.chance(0.5)) {
    const r = rng.pick(REDUNDANT);
    return {
      prompt: `${block(f(r.s))}\n\nWhich word can be cut **without changing the meaning**?`,
      parts: [part(mc(rng, `“${r.cut}”`, r.keep.map((k) => `“${k}”`)))],
      hints: ['Look for a word that repeats what another word in the sentence already says.'],
      solution: [`${q(r.cut)} is redundant: ${r.why}.`, `Cutting it leaves: ${f(cutWord(r.s, r.cut))}`],
    };
  }
  const w = rng.pick(WORDY);
  const wrong = d === 1 ? [f(w.partial), f(w.lost)] : [f(w.partial), f(w.lost), f(w.broken)];
  return {
    prompt: `${block(f(w.wordy))}\n\nWhich revision is the most **concise** while keeping the meaning?`,
    parts: [part(mc(rng, f(w.concise), wrong))],
    hints: ['Cut empty phrases (“due to the fact that”, “it is important to note that”), words that repeat each other, and needless repetition, but keep every piece of information.'],
    solution: [`${q(f(w.concise))} says everything the original says in the fewest words.`, d === 1 ? 'Of the others, one is still padded, and one cuts so much that part of the meaning is lost.' : 'Of the others, one is still padded, one cuts so much that part of the meaning is lost, and one is no longer a correct sentence.'],
  };
}

/** The sentence with one word removed, wherever it stands. */
function cutWord(s: string, w: string): string {
  return new RegExp(`\\b${w} `).test(s) ? s.replace(new RegExp(`\\b${w} `), '') : s.replace(new RegExp(` ${w}\\b`), '');
}

// ---------------------------------------------------------------------------- lesson 6.5: paragraph unity

interface Unit {
  topic: string;
  support: [string, string, string, string];
  offTopic: string;
  narrow: string;
  broad: string;
  wrong: string;
}
const UNITY: Unit[] = [
  {
    topic: 'Cycling to school has real benefits for students.',
    support: ['It gives riders exercise at the start and end of every day.', 'It costs nothing once you own a bicycle.', 'Riders never have to wait for a late bus.', 'Many students say the ride clears their heads before lessons.'],
    offTopic: 'My uncle has a red bicycle with a broken bell.',
    narrow: 'Cycling costs nothing once you own a bicycle.',
    broad: 'There are many ways to travel.',
    wrong: 'Buses are the best way to get to school.',
  },
  {
    topic: 'Many teenagers get less sleep than they need.',
    support: ['Homework often keeps them up late into the night.', 'Phones and games make it easy to stay awake longer than planned.', 'Some work part-time jobs in the evenings.', 'Then they have to get up early for school.'],
    offTopic: 'Some people prefer to sleep with the window open.',
    narrow: 'Homework keeps some teenagers up late.',
    broad: 'Health is important.',
    wrong: 'Teenagers usually sleep far more than they need.',
  },
  {
    topic: 'Learning a second language opens many doors.',
    support: ['It lets you talk with people from other cultures in their own words.', 'It can make travelling easier and more rewarding.', 'Many employers value staff who speak more than one language.', 'It can even help you understand the grammar of your first language better.'],
    offTopic: 'My cousin has a pet parrot that can say ten words.',
    narrow: 'Speaking another language makes travelling easier.',
    broad: 'People learn many things at school.',
    wrong: 'Learning a second language is a waste of time.',
  },
  {
    topic: 'The central market is the liveliest place in our town on a Saturday.',
    support: ['Traders arrive before dawn to set up their stalls.', 'By mid-morning the aisles are packed with shoppers.', 'Musicians play on the corners while children dance.', 'The smell of grilled corn and fresh bread fills the air.'],
    offTopic: 'The town also has a large shopping centre near the airport.',
    narrow: 'Musicians play at the market on Saturdays.',
    broad: 'Towns have many interesting places.',
    wrong: 'The market is quiet and empty at the weekend.',
  },
  {
    topic: 'Coral reefs are among the richest habitats in the ocean.',
    support: ['Thousands of kinds of fish shelter among the corals.', 'Turtles, sharks and rays feed on and around reefs.', 'Even the cracks in the coral hide crabs, shrimp and worms.', 'The reef itself is built up by tiny animals over many years.'],
    offTopic: 'Many people enjoy swimming in pools during the summer.',
    narrow: 'Turtles feed around coral reefs.',
    broad: 'The ocean is very large.',
    wrong: 'Coral reefs are quiet places with little life.',
  },
  {
    topic: 'A school garden would teach students practical skills.',
    support: ['Students would learn how to plan beds and plant seeds.', 'They would find out how to turn kitchen waste into compost.', 'They could practise measuring and recording plant growth.', 'Older students could learn to repair tools and build raised beds.'],
    offTopic: 'The school’s football team won the city cup last year.',
    narrow: 'Students would learn to make compost.',
    broad: 'Schools teach many different subjects.',
    wrong: 'A school garden would be a waste of money.',
  },
  {
    topic: 'Volunteering at the animal shelter taught me patience.',
    support: ['Some dogs took weeks to trust me enough to come near.', 'I learned to sit quietly with a frightened cat until it relaxed.', 'Cleaning the same cages every morning was slow, steady work.', 'When a shy dog finally wagged its tail at me, the waiting felt worth it.'],
    offTopic: 'The shelter is next to a large supermarket.',
    narrow: 'Some dogs took weeks to trust me.',
    broad: 'Animals are interesting.',
    wrong: 'The animal shelter was the most boring place I have ever worked.',
  },
];

/** Five events in clear time order, for "where does this sentence belong?". */
const SEQUENCES: string[][] = [
  ['At six o’clock, the alarm rang and NAME rolled out of bed.', 'By half past six, {he} had showered and dressed.', 'At a quarter to seven, {he} gulped down a bowl of porridge.', 'At seven, {he} caught the first bus into the city.', 'At eight, {he} sat down in the exam hall.'],
  ['On Monday, the class chose a charity to support.', 'On Tuesday, they designed posters for a bake sale.', 'On Wednesday, they bought flour, sugar and butter with money from the class fund.', 'On Thursday, they baked more than two hundred biscuits.', 'On Friday, they sold every last one.'],
  ['In January, the team began training for the championship.', 'In March, they played their first friendly match.', 'In April, an injury to their captain nearly ended their season.', 'In May, they won the semi-final.', 'In June, they lifted the trophy.'],
  ['The train left the city at eight in the morning.', 'At half past nine, it crossed the river.', 'At eleven, it stopped for twenty minutes at a mountain station.', 'At one o’clock in the afternoon, the passengers ate lunch as the train wound through the hills.', 'At four in the afternoon, it pulled into the coastal town.'],
  ['In 1990, NAME’s grandmother opened a small food stall.', 'In 1995, she moved into a shop on the main street.', 'In 2003, she hired her first two cooks.', 'In 2010, the shop became a full restaurant.', 'In 2020, she handed the restaurant to her son.'],
];
const PLACES = ['Before sentence 1', 'Between sentences 1 and 2', 'Between sentences 2 and 3', 'Between sentences 3 and 4', 'After sentence 4'];

function paragraphUnity(rng: Rng, d: Difficulty): GenOutput {
  const cast = people(rng, 1);
  const f = (s: string) => fill(s, cast);
  const kind = d === 1 ? 'odd' : d === 2 ? rng.pick(['odd', 'topic']) : rng.pick(['topic', 'place']);
  if (kind === 'place') {
    const seq = rng.pick(SEQUENCES).map(f);
    const k = rng.int(0, 4);
    const rest = seq.filter((_, i) => i !== k);
    return {
      prompt: `${block(rest.map((s, i) => `(${i + 1}) ${s}`).join(' '))}\n\nWhere does this sentence belong in the paragraph?\n\n${block(seq[k])}`,
      parts: [part(fixedChoice(PLACES, k))],
      hints: ['Follow the time words (days, months, years, clock times) and find the gap where this event fits.'],
      solution: [`The paragraph moves forward in time, and ${q(seq[k])} comes ${k === 0 ? 'before everything else' : k === 4 ? 'after everything else' : `after sentence ${k} and before sentence ${k + 1}`}.`, `So it belongs ${PLACES[k].toLowerCase()}.`],
    };
  }
  const u = rng.pick(UNITY);
  if (kind === 'topic') {
    return {
      prompt: `Which is the best **topic sentence** for a paragraph containing these supporting sentences?\n\n${block(u.support.join(' '))}`,
      parts: [part(mc(rng, u.topic, [u.narrow, u.broad, u.wrong]))],
      hints: ['A topic sentence states the main idea that every other sentence in the paragraph supports: not just one detail, not something far too general, and not the opposite idea.'],
      solution: [`${q(u.topic)} covers every supporting sentence.`, 'The others cover only one detail, are too general to guide the paragraph, or say the opposite of what the sentences show.'],
    };
  }
  // Keep the supporting sentences in their written order: some lead on from the one before.
  const skip = rng.int(0, 3);
  const three = u.support.filter((_, i) => i !== skip);
  const at = rng.int(0, 3);
  const body = [...three.slice(0, at), u.offTopic, ...three.slice(at)];
  return {
    prompt: `${block([u.topic, ...body].map((s, i) => `(${i + 1}) ${s}`).join(' '))}\n\nWhich sentence does **not** belong in this paragraph?`,
    parts: [part(mc(rng, u.offTopic, three))],
    hints: ['Reread the topic sentence, (1). Every other sentence should support that one idea.'],
    solution: [`The topic sentence is ${q(u.topic)}`, `${q(u.offTopic)} does not support that idea, so it breaks the paragraph’s unity and should be cut.`],
  };
}

// ---------------------------------------------------------------------------- lesson 6.6: prompt words

type Verb = 'analyse' | 'compare' | 'contrast' | 'evaluate' | 'explain' | 'discuss' | 'describe' | 'argue';
const VERB_MEANS: Record<Verb, string> = {
  analyse: 'Examine the parts or features of something and explain how they work and what effect they have',
  compare: 'Show how two or more things are alike, and usually how they differ',
  contrast: 'Show how two or more things are different',
  evaluate: 'Judge how good, effective or important something is, and support the judgement with evidence',
  explain: 'Make clear how or why something happens',
  discuss: 'Consider an issue from more than one side and reach a reasoned conclusion',
  describe: 'Give the details of what something is like',
  argue: 'Take one side and defend it with reasons and evidence',
};
/** Verbs whose meanings overlap, never offered against each other. */
const VERB_CLOSE: Record<Verb, Verb[]> = {
  analyse: ['explain'],
  explain: ['analyse'],
  compare: ['contrast'],
  contrast: ['compare'],
  evaluate: ['argue', 'discuss'],
  argue: ['evaluate', 'discuss'],
  discuss: ['argue', 'evaluate'],
  describe: [],
};
const VERBS = Object.keys(VERB_MEANS) as Verb[];

interface Prompt {
  verb: Verb;
  text: string;
  asks: string;
  wrongAsks: [string, string, string];
  plan: string;
  wrongPlans: [string, string, string];
}
const PROMPTS: Prompt[] = [
  {
    verb: 'evaluate',
    text: 'Evaluate how effectively Saki builds suspense in “The Open Window”.',
    asks: 'Judge how well Saki builds suspense, and support the judgement with evidence from the story.',
    wrongAsks: ['Retell the events of the story in order, from Framton’s arrival to the moment he runs away.', 'Describe what Saki’s life was like, and list the other short stories that he wrote.', 'Explain what suspense means in general, with examples of how it works in films and books.'],
    plan: 'A thesis judging how well the suspense works, body paragraphs weighing one technique each with evidence, and a conclusion.',
    wrongPlans: ['A paragraph for each event of the story, from Framton’s arrival to his escape, told in order and with no thesis.', 'An introduction about Saki’s life, a paragraph on each character, and a conclusion saying the story was enjoyable.', 'A definition of suspense, followed by several examples of suspense from films, television series and other books.'],
  },
  {
    verb: 'compare',
    text: 'Compare the endings of “The Gift of the Magi” and “The Story of an Hour”.',
    asks: 'Show how the two endings are alike, and how they differ, with evidence from both stories.',
    wrongAsks: ['Write only about the ending you prefer, and explain why you enjoyed it more than the other.', 'Summarize each story from beginning to end, giving the main events of each one in order.', 'Describe the lives of the two authors and the times and places in which they wrote.'],
    plan: 'A thesis about how the two endings are alike and different, then body paragraphs that each discuss one point of comparison in both stories.',
    wrongPlans: ['Two detailed paragraphs on the ending of “The Gift of the Magi”, and nothing at all on the ending of “The Story of an Hour”.', 'A summary of each story from beginning to end, followed by one sentence saying which of the two endings is better.', 'A paragraph on O. Henry’s life and another on Kate Chopin’s, with a conclusion about when each story was published.'],
  },
  {
    verb: 'contrast',
    text: 'Contrast the man and the dog in “To Build a Fire”.',
    asks: 'Show how the man and the dog differ, with evidence from the story.',
    wrongAsks: ['Retell the man’s journey step by step, from the trail to the end.', 'Describe the landscape and the weather of the Yukon in winter.', 'Judge whether the story is well written and worth reading.'],
    plan: 'A thesis about how the man and the dog differ, then body paragraphs on their knowledge, their instincts and their fates.',
    wrongPlans: ['A retelling of the man’s journey from start to finish, with a paragraph for each fire he tries to build.', 'Paragraphs describing the Yukon’s weather, its frozen creeks and its landscape, with no mention of the dog.', 'An essay about whether Jack London liked dogs and how many dogs he owned during his life.'],
  },
  {
    verb: 'analyse',
    text: 'Analyse how Poe uses the narrator’s voice to create tension in “The Tell-Tale Heart”.',
    asks: 'Examine particular features of the narrator’s voice and explain how each one creates tension.',
    wrongAsks: ['Say whether you liked the story, and give your overall opinion of the narrator and his crime.', 'Retell the murder, the visit from the police and the confession, in order.', 'Describe Poe’s life and the other horror stories that made him famous.'],
    plan: 'A thesis on how the narrator’s voice creates tension, then body paragraphs on his repetitions, his dashes and his claims to be calm, each with evidence.',
    wrongPlans: ['A retelling of the murder, the police visit and the confession, with one paragraph for each part of the story and a short conclusion.', 'A list of every adjective the narrator uses, grouped by paragraph, with no explanation of what they do.', 'An essay on whether Poe was a happy man, using details from his life, his marriage and his letters.'],
  },
  {
    verb: 'argue',
    text: 'Argue whether Della or Jim makes the greater sacrifice in “The Gift of the Magi”.',
    asks: 'Take one side, and defend it with reasons and evidence from the story.',
    wrongAsks: ['Describe both gifts in detail without deciding which sacrifice is greater.', 'Retell how each character sells something and buys a present.', 'Explain what the word “magi” means and where the title comes from.'],
    plan: 'A thesis that takes one side, body paragraphs giving reasons with evidence, a paragraph answering the other side, and a conclusion.',
    wrongPlans: ['One paragraph on Della’s gift and one on Jim’s gift, each describing the sacrifice carefully, and a conclusion that refuses to choose.', 'A retelling of the story in order, from Della counting her money to the moment the gifts are opened.', 'A paragraph on the meaning of the word “magi” and on the three wise men in the Christmas story.'],
  },
  {
    verb: 'explain',
    text: 'Explain why Framton Nuttel runs away at the end of “The Open Window”.',
    asks: 'Make clear the reasons he runs away, using details from the story.',
    wrongAsks: ['Judge whether the story is well written and whether its ending works.', 'Describe the Sappletons’ house, its garden and its open window.', 'Retell everything Framton says to Vera and to her aunt, in order.'],
    plan: 'A thesis on why Framton runs, then body paragraphs on Vera’s story, the open window and the hunters’ return, each linked to his fear.',
    wrongPlans: ['A paragraph judging whether Saki is a good writer, with examples of his most famous stories, characters and endings.', 'A detailed description of the Sappletons’ house, from its lawn and its open window to the furniture in its rooms.', 'A paragraph about a character from another story who also runs away, with no reference to Framton at all.'],
  },
  {
    verb: 'discuss',
    text: 'Discuss whether Mrs. Mallard in “The Story of an Hour” is a sympathetic character.',
    asks: 'Consider more than one view of Mrs. Mallard, and reach a reasoned conclusion.',
    wrongAsks: ['Retell the hour Mrs. Mallard spends alone in her room, moment by moment.', 'Describe what Mrs. Mallard looks like and how old she seems to be.', 'List the characters in the story and say who each one of them is.'],
    plan: 'A thesis previewing a balanced answer, body paragraphs on reasons to sympathize with her and reasons not to, and a conclusion that weighs them.',
    wrongPlans: ['A retelling of the story in order, from the news of the railway accident to Mrs. Mallard’s death, with no judgement of her at all.', 'A description of Mrs. Mallard’s appearance and her room, including the armchair and the view from the window.', 'A list of the characters, with one sentence about each, followed by a summary of what happens to them.'],
  },
  {
    verb: 'describe',
    text: 'Describe the setting of the opening scene of “The Monkey’s Paw”.',
    asks: 'Give the details of the time and place, and what the scene is like.',
    wrongAsks: ['Argue that the story is too frightening for young readers to enjoy.', 'Explain why the Whites make their first wish and what they wish for.', 'Judge whether the ending is effective and whether it surprised you.'],
    plan: 'An opening sentence on the time and place, then details of the cold, wet night outside and the warm, bright parlour inside.',
    wrongPlans: ['An argument that the story is too frightening for children, with reasons from the last part of the story.', 'An explanation of the sergeant-major’s warnings about the paw and of why the Whites ignore them, with a paragraph on each warning.', 'A judgement of whether the ending is effective, comparing it with the endings of other horror stories.'],
  },
  {
    verb: 'explain',
    text: 'Explain how the setting creates the mood in the opening of “The Fall of the House of Usher”.',
    asks: 'Make clear how details of the setting create the mood, using examples from the opening.',
    wrongAsks: ['Retell the whole story of the House of Usher, from the narrator’s arrival to the end.', 'Judge whether Poe is the best writer of horror stories who ever lived.', 'Describe a house you have visited that reminded you of the House of Usher.'],
    plan: 'A thesis on how the setting creates a gloomy mood, then body paragraphs on the dull day, the dreary country and the house itself.',
    wrongPlans: ['A retelling of the whole story from beginning to end, from the narrator’s arrival to the fall of the house.', 'A comparison of Poe with modern horror writers, and of his stories with the films that have been made from theirs.', 'A description of a house the writer once visited, including its rooms, its garden and its history.'],
  },
  {
    verb: 'compare',
    text: 'Compare the narrators of “The Tell-Tale Heart” and “The Cask of Amontillado”.',
    asks: 'Show how the two narrators are alike, and how they differ, with evidence from both stories.',
    wrongAsks: ['Write only about the narrator you find more frightening, and explain why he frightens you most.', 'Retell both crimes in order, from the first plan to the final confession or escape.', 'Describe Poe’s life and explain why he wrote so many stories about murder.'],
    plan: 'A thesis on how the narrators are alike and different, then body paragraphs each comparing one feature of both, such as their calm or motives.',
    wrongPlans: ['Three detailed paragraphs on the narrator of “The Tell-Tale Heart”, his motives and his madness, and nothing at all on Montresor.', 'A retelling of each crime, one after the other, from the first plan to the very last line of each story.', 'A paragraph on Poe’s childhood and another on his marriage, followed by a list of his most famous stories.'],
  },
  {
    verb: 'evaluate',
    text: 'Evaluate whether the open ending of “The Lady, or the Tiger?” satisfies the reader.',
    asks: 'Judge whether the open ending works for the reader, and support the judgement with evidence.',
    wrongAsks: ['Retell the story of the princess and the young man, from his arrest to the moment he opens a door.', 'Explain how arenas worked in ancient times and what kinds of trials and games took place in them.', 'Describe the king’s arena, its two doors and the crowds that came to watch.'],
    plan: 'A thesis judging how satisfying the ending is, body paragraphs weighing what the open ending gives and withholds, and a conclusion.',
    wrongPlans: ['A retelling of the story from the king’s strange laws to the arena, the two doors and the final question to the reader.', 'A description of the arena, its two doors, the crowds in the seats and the tiger waiting behind one of the doors.', 'An essay about real kings in history who held public trials, with examples from several countries and centuries.'],
  },
  {
    verb: 'argue',
    text: 'Argue whether Vera in “The Open Window” is cruel or simply a clever storyteller.',
    asks: 'Take one side, and defend it with reasons and evidence from the story.',
    wrongAsks: ['Describe what Vera looks like, how old she is and how she speaks.', 'Retell Vera’s story about the hunters, from the bog to the open window.', 'Explain what a French window is and why the Sappletons keep theirs open.'],
    plan: 'A thesis taking one side about Vera, body paragraphs with reasons and evidence, a paragraph answering the other view, and a conclusion.',
    wrongPlans: ['A description of Vera and her aunt, their manners and the way each speaks to Framton, with no position on whether Vera is cruel.', 'A retelling of Vera’s story about the hunters and the bog, followed by a retelling of Framton’s escape.', 'A paragraph on the history of French windows, with a description of how they open onto a garden or lawn.'],
  },
  {
    verb: 'discuss',
    text: 'Discuss whether the man in “To Build a Fire” is to blame for his own death.',
    asks: 'Consider more than one view of who or what is to blame, and reach a reasoned conclusion.',
    wrongAsks: ['Describe the Yukon in winter: its extreme cold, its deep snow and its frozen, hidden creeks.', 'Retell the man’s journey from the main trail to the place where he dies.', 'List what the man carries with him and what each item is used for.'],
    plan: 'A thesis previewing a balanced answer, paragraphs on the man’s own choices and on the power of the cold, and a conclusion weighing them.',
    wrongPlans: ['A description of the Yukon’s weather and landscape, with a paragraph each on the cold, the deep snow and the frozen, hidden creeks.', 'A retelling of the man’s journey in order, from the moment he leaves the main trail to the moment he dies.', 'A list of the man’s supplies, from his matches and his lunch to his mittens, with a sentence on each one.'],
  },
  {
    verb: 'describe',
    text: 'Describe Della’s home in “The Gift of the Magi”.',
    asks: 'Give the details of what Della’s home is like, using what the story shows about it.',
    wrongAsks: ['Argue that Della should not have sold her hair, and give reasons from the story.', 'Explain why Jim sells his gold watch and what he buys for Della with the money.', 'Judge whether the ending of the story is satisfying, and whether it surprised you.'],
    plan: 'An opening sentence on the cheap furnished flat, then details of the pier glass, the worn red carpet and the gray view outside.',
    wrongPlans: ['An argument that Della should have kept her hair, with reasons drawn from the opening and the ending of the story.', 'An explanation of why Jim sells his watch, with one paragraph on his gold watch and another on the combs he buys for Della.', 'A judgement of whether the ending works, comparing it with the endings of other stories that we have read in this unit.'],
  },
];

function promptWords(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const v = rng.pick(VERBS);
    const pool = VERBS.filter((x) => x !== v && !VERB_CLOSE[v].includes(x));
    return {
      prompt: `In an essay prompt, what does the word **${v}** ask you to do?`,
      parts: [part(mc(rng, VERB_MEANS[v], rng.sample(pool, 3).map((x) => VERB_MEANS[x])))],
      hints: ['The key verb of a prompt tells you what kind of thinking the essay must show. Answering a different verb is one of the most common ways to lose marks.'],
      solution: [`${q(v)} means: ${VERB_MEANS[v].toLowerCase()}.`],
    };
  }
  const p = rng.pick(PROMPTS);
  if (d === 2) {
    return {
      prompt: `${block(p.text)}\n\nWhat does this prompt ask you to do?`,
      parts: [part(mc(rng, p.asks, p.wrongAsks))],
      hints: [`Find the key verb (here, “${cap1(p.verb)}”) and what it applies to.`],
      solution: [`The key verb is ${q(cap1(p.verb))}, which means: ${VERB_MEANS[p.verb].toLowerCase()}.`, `So the essay must ${p.asks[0].toLowerCase()}${p.asks.slice(1)}`],
    };
  }
  return {
    prompt: `${block(p.text)}\n\nWhich essay plan fits this prompt best?`,
    parts: [part(mc(rng, p.plan, p.wrongPlans))],
    hints: [`The plan must do what the key verb, “${cap1(p.verb)}”, asks: ${VERB_MEANS[p.verb].toLowerCase()}.`],
    solution: [`${q(p.plan)} does what ${q(cap1(p.verb))} asks.`, 'The other plans retell, describe or wander off the question instead of answering it.'],
  };
}

const cap1 = (s: string) => s[0].toUpperCase() + s.slice(1);

// ---------------------------------------------------------------------------- lesson 6.6: planning a timed essay

const STEP_SETS: string[][] = [
  ['Read the prompt carefully and underline its key words', 'Brainstorm ideas and decide on your thesis', 'Make a quick outline of your paragraphs', 'Write the essay, following your outline', 'Proofread and correct your errors'],
  ['Read the question twice and circle the key verb', 'Jot down ideas and evidence you could use', 'Choose your thesis and put your points in order', 'Write the introduction, the body paragraphs and the conclusion', 'Reread the essay and fix spelling and punctuation'],
  ['Work out exactly what the prompt asks', 'List possible points and pick the strongest', 'Write a one-line thesis and a short outline', 'Write the essay from your outline', 'Check the essay for mistakes and missing words'],
  ['Underline the key words in the prompt', 'Brainstorm points and evidence for a few minutes', 'Write your thesis and number your points in order', 'Write the essay, one paragraph per point', 'Read the essay through and correct errors'],
  ['Decide what the prompt’s key verb asks you to do', 'Note the strongest evidence you remember from the text', 'Sketch a quick outline with your thesis at the top', 'Write the essay from the outline', 'Proofread for spelling, punctuation and missing words'],
];

const FIRST = ['Read the prompt carefully and underline its key words.', 'Read the whole prompt and work out exactly what it asks.'];
const NOT_FIRST = ['Start writing straight away so that you do not waste any time.', 'Write your conclusion so that you know where the essay ends.', 'Check the spelling of difficult words you might use.', 'Count how many words you will need to write.'];

const TIMES = [40, 45, 60, 75, 90];
/** A sensible split: about a tenth to a sixth planning, five to ten minutes proofreading. */
function split(total: number): [number, number, number] {
  const plan = total <= 45 ? 5 : total <= 75 ? 10 : 15;
  const check = total <= 60 ? 5 : 10;
  return [plan, total - plan - check, check];
}
const timeLine = (p: number, w: number, c: number) => `${p} minutes planning, ${w} minutes writing, ${c} minutes proofreading`;

function essayPlan(rng: Rng, d: Difficulty): GenOutput {
  const kind = d === 1 ? 'first' : d === 2 ? rng.pick(['time', 'first', 'order4']) : rng.pick(['order', 'time']);
  if (kind === 'first') {
    const p = rng.pick(PROMPTS);
    const mins = rng.pick(TIMES);
    return {
      prompt: `You have ${mins} minutes to answer this prompt in an exam:\n\n${block(p.text)}\n\nWhat should you do **first**?`,
      parts: [part(mc(rng, rng.pick(FIRST), rng.sample(NOT_FIRST, d === 1 ? 2 : 3)))],
      hints: ['An essay that answers the wrong question loses marks, however well it is written.'],
      solution: ['First read the prompt carefully and find its key words, so the whole essay answers the question that was asked.', `Here the key verb is ${q(cap1(p.verb))}.`],
    };
  }
  if (kind === 'time') {
    const total = rng.pick(TIMES);
    const [p, w, c] = split(total);
    const half = Math.round(total / 10) * 5;
    const wrong = [
      `0 minutes planning, ${total - c} minutes writing, ${c} minutes proofreading`,
      `${half} minutes planning, ${total - half - c} minutes writing, ${c} minutes proofreading`,
      `${half} minutes writing a full rough draft, then ${total - half} minutes copying it out neatly`,
    ];
    return {
      prompt: `You have **${total} minutes** to write an essay in an exam. Which plan divides the time most sensibly?`,
      parts: [part(mc(rng, timeLine(p, w, c), wrong))],
      hints: ['Spend a short time planning, most of the time writing, and keep a few minutes at the end to proofread.'],
      solution: [`${timeLine(p, w, c)}: a short plan keeps the essay focused, most of the time goes to writing, and the last minutes catch errors.`, 'With no plan the essay wanders, half the time on planning leaves too little for writing, and copying out a rough draft wastes time you need for thinking.'],
    };
  }
  const steps = rng.pick(STEP_SETS);
  const use = kind === 'order4' ? [steps[0], steps[2], steps[3], steps[4]] : steps;
  return order(rng, 'Put the steps for writing an essay under a time limit in a sensible order.', use, ['Every essay starts by finding out what the prompt asks, and ends with a final check.', 'Plan before you write: ideas and a thesis come before the outline, and the outline before the essay.'], use.map((s, i) => `${i + 1}. ${s}`));
}

export const REVISE_SKILLS: SkillDef[] = [
  skill({
    id: 'e10-transitions',
    name: 'Transitions',
    description: 'Choose the transition that shows how two ideas are related: contrast, cause and effect, addition, example, sequence or conclusion.',
    outcomes: OUTCOMES,
    lessonId: REVISE,
    format: 'mc',
    gen: transitions,
  }),
  skill({
    id: 'e10-concise',
    name: 'Concise writing',
    description: 'Choose the most concise revision that keeps the meaning, and cut words that repeat each other.',
    outcomes: OUTCOMES,
    lessonId: REVISE,
    format: 'mc',
    gen: concise,
  }),
  skill({
    id: 'e10-paragraph-unity',
    name: 'Paragraph unity and order',
    description: 'Find the sentence that does not belong, choose the best topic sentence, and place a sentence where it fits.',
    outcomes: OUTCOMES,
    lessonId: REVISE,
    format: 'mc',
    gen: paragraphUnity,
  }),
  skill({
    id: 'e10-prompt-words',
    name: 'Reading an essay prompt',
    description: 'Work out what a prompt asks from its key verb, and choose an essay plan that answers it.',
    outcomes: OUTCOMES,
    lessonId: TIMED,
    format: 'mc',
    gen: promptWords,
  }),
  skill({
    id: 'e10-essay-plan',
    name: 'Planning a timed essay',
    description: 'Put the steps of a timed essay in order, divide the time sensibly, and know what to do first.',
    outcomes: OUTCOMES,
    lessonId: TIMED,
    format: 'mc',
    gen: essayPlan,
  }),
];
