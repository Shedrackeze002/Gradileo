/**
 * Grade 7 English, Unit 4: Non-fiction (E7-D1, E7-D2). Claims, reasons and evidence, persuasive
 * techniques, and fact, opinion and bias. The passages are written for Gradileo; any figures in
 * them are invented for the question and stated inside it.
 */
import { skill } from '../../helpers.ts';
import type { SkillDef } from '../../../types.ts';
import { bank, Q } from './common.ts';

const D1 = ['E7-D1'];
const D2 = ['E7-D2'];

const LUNCH = 'Our school should start lunch fifteen minutes later. First, many students are not hungry at 11:30, so food is wasted: last month the canteen threw away 40 kilograms of uneaten meals. Second, a later lunch would split the long afternoon into shorter blocks. Ms. Patel, the school nurse, says that students who eat later concentrate better in their final lessons.';

// ---------------------------------------------------------------------------- 4.1 claims, reasons and evidence

const CLAIMS = [
  Q(1, 'What is the writer’s claim?', 'The school should start lunch fifteen minutes later.', ['Many students are not hungry by 11:30 in the morning.', 'The canteen threw away 40 kilograms of food last month.', 'Ms. Patel is the nurse who works at the school.'],
    'The claim is the main point the writer argues. The other sentences are reasons and evidence for it.', LUNCH),
  Q(1, 'In an argument, what is a reason?', 'A statement that explains why the claim is true', ['The writer’s name and the date of writing', 'A question the writer cannot answer', 'The title at the top of the article'],
    'Reasons answer “why should I believe the claim?” Evidence then backs up each reason.'),
  Q(2, 'Which sentence is a reason, not evidence?', 'A later lunch would split the long afternoon into shorter blocks.', ['Last month the canteen threw away 40 kilograms of meals.', 'Ms. Patel says students who eat later concentrate better.', 'Our school should start lunch fifteen minutes later.'],
    'Splitting the afternoon is a reason for the claim. The 40 kilograms and Ms. Patel’s view are evidence, and the last sentence is the claim.', LUNCH),
  Q(2, 'Which evidence supports the reason “food is wasted”?', 'The canteen threw away 40 kilograms of uneaten meals last month.', ['Ms. Patel is the school nurse and cares for all students.', 'A later lunch would split the long afternoon into blocks.', 'Our school should start lunch fifteen minutes later than now.'],
    'The figure for thrown-away food directly backs up the reason about waste.', LUNCH),
  Q(3, 'Which new piece of evidence would most strengthen the writer’s argument?', 'A survey showing most students feel hungriest at 12:00', ['A photograph of the canteen’s new tables and chairs', 'A list of all the meals on this week’s canteen menu', 'The number of teachers who work at the school today'],
    'A survey about when students are hungry supports the claim that 11:30 is too early. The others are not connected to the timing of lunch.', LUNCH),
  Q(3, 'Which is a counterclaim to the writer’s argument?', 'A later lunch would make the school day finish later.', ['Food waste costs the school a great deal of money.', 'Students concentrate better after they have eaten.', 'Many students are not hungry by half past eleven.'],
    'A counterclaim argues against the claim. A later end to the day is a reason someone might oppose the change.', LUNCH),
];

const EVTYPES = ['A statistic', 'An expert opinion', 'An anecdote', 'An example'];
const evtype = (d: 1 | 2 | 3, text: string, k: number, why: string) => Q(d, 'Which kind of evidence is this?', EVTYPES[k], EVTYPES.filter((_, i) => i !== k), why, text);

const EVIDENCE = [
  evtype(1, 'In a survey of 500 cyclists, 72% said they felt safer on roads with bike lanes.', 0,
    'Numbers and percentages are statistics.'),
  evtype(1, 'Dr. Kim Lee, who has studied sleep for twenty years, says teenagers need at least eight hours a night.', 1,
    'A qualified person’s view is expert opinion. (Dr. Lee is invented for this question.)'),
  evtype(2, 'When my cousin started walking to school, she said she arrived more awake and in a better mood.', 2,
    'A short personal story about one person is an anecdote.'),
  evtype(2, 'Cities such as Amsterdam and Copenhagen have built thousands of kilometres of bike lanes.', 3,
    'Naming particular cases is giving examples.'),
  Q(2, 'Why is an anecdote usually weaker evidence than a statistic?', 'It describes only one person’s experience.', ['It is always made up by the writer of the text.', 'It is always far too long for anyone to read.', 'It never mentions any real people at all.'],
    'One story may not be typical. A statistic from a fair survey describes many people.'),
  Q(3, 'Which evidence is most relevant to the claim “Homework should be limited to one hour a night”?', 'A study linking more than an hour of homework to worse sleep', ['A study showing that most students own a mobile phone', 'A quotation from a famous footballer about practice', 'A chart of how many schools have libraries'],
    'Relevant evidence connects directly to the claim. Only the sleep study is about the amount of homework.'),
  Q(3, 'A writer quotes a famous singer as an expert on climate science. What is the problem?', 'The singer is not an expert on that subject.', ['Singers are never allowed to be quoted.', 'The quotation is too short to count.', 'Climate science has no real experts.'],
    'Expert opinion is strong only when the person is an expert in the topic. Fame in one field does not make someone an expert in another.'),
];

// ---------------------------------------------------------------------------- 4.2 persuasive techniques

const TECHS = ['A rhetorical question', 'The rule of three', 'Emotive language', 'Direct address'];
const tech = (d: 1 | 2 | 3, text: string, k: number, why: string) => Q(d, 'Which persuasive technique is used most here?', TECHS[k], TECHS.filter((_, i) => i !== k), why, text);

const TECHNIQUES = [
  tech(1, 'Do we really want our children breathing dirty air every day?', 0,
    'A question asked for effect, not for an answer, is a rhetorical question. The expected answer is obviously no.'),
  tech(1, 'Our new park will be safe, green and free.', 1,
    'Three ideas in a row (safe, green, free) form the rule of three, which sounds complete and memorable.'),
  tech(2, 'Helpless puppies are being abandoned on freezing streets, shivering and starving.', 2,
    'Helpless, abandoned, freezing, shivering and starving are chosen to stir pity. That is emotive language.'),
  tech(2, 'You can make a difference. You can sign the petition today.', 3,
    'Speaking straight to the reader as “you” draws them in. That is direct address.'),
  tech(3, 'Is it fair that some students have no books at home? Is it fair that the library is closing? Of course it is not.', 0,
    'The questions are not really asking; the writer answers them at once. They are rhetorical questions, used with repetition.'),
  Q(3, 'Which technique is repetition of the same words at the start of sentences?', 'Anaphora: “We will… We will… We will…”', ['Hyperbole, as in “a million times”', 'Onomatopoeia, as in “buzz”', 'A pun, as in a play on words'],
    'Repeating an opening phrase is called anaphora. It builds rhythm and makes a speech memorable.'),
];

const EFFECT = [
  Q(1, 'Why do persuasive writers use rhetorical questions?', 'To lead readers to think and agree with the answer', ['To find out what readers really think about it', 'To show that the writer is confused and unsure', 'To make the writing as short as it can possibly be'],
    'A rhetorical question leads the reader to the answer the writer wants.'),
  Q(1, 'What is the effect of calling a plan “a disaster for our children”?', 'It makes readers feel worried and protective.', ['It gives readers an exact figure to check.', 'It explains exactly how the plan will work.', 'It makes the plan sound fun and exciting.'],
    'Disaster and our children are emotive words, chosen to make readers feel strongly.'),
  Q(2, 'What is the effect of “we” in “Together, we can save our library”?', 'It makes the reader feel part of a shared group.', ['It shows that the writer is feeling very lonely.', 'It tells the reader to stay at home and wait.', 'It proves that the library has already been saved.'],
    'Inclusive “we” and “together” invite the reader to join the writer’s side.'),
  Q(2, 'Why might a speech say “We will rebuild. We will recover. We will return”?', 'The repetition builds rhythm and determination.', ['The speaker forgot the words of the speech.', 'The speaker wants the audience to leave.', 'The words are needed to explain a chart.'],
    'Repeating “We will” makes the speech sound strong, united and memorable.'),
  Q(3, 'A charity letter describes one named child’s day in detail instead of giving figures. Why?', 'A single story makes readers feel more than numbers do.', ['Figures are not allowed to appear in charity letters.', 'The charity has no information or figures to share.', 'Stories are always more accurate than any figures.'],
    'Readers connect with one person more easily than with a statistic, so a story moves them to act.'),
  Q(3, 'How should a careful reader respond to strongly emotive language?', 'Notice the feeling, then check the evidence for the claim.', ['Accept the claim at once because it feels so strong.', 'Ignore the whole text because it uses any emotion.', 'Count up how many adjectives the writer has used.'],
    'Emotion is not wrong in persuasion, but a reader should ask whether reasons and evidence back it up.'),
];

// ---------------------------------------------------------------------------- 4.3 fact, opinion and bias

const FACT = 'Fact';
const OPINION = 'Opinion';
const fo = (d: 1 | 2 | 3, text: string, isFact: boolean, why: string) =>
  Q(d, 'Is this a fact or an opinion?', isFact ? FACT : OPINION, [isFact ? OPINION : FACT, 'Neither: it is a question', 'Both at the same time'], why, text);

const FACT_OPINION = [
  fo(1, 'Water freezes at 0 °C at sea level.', true, 'This can be tested and proved, so it is a fact.'),
  fo(1, 'Winter is the best season of the year.', false, '“Best” is a judgement people disagree about. It is an opinion.'),
  fo(2, 'The new stadium cost 30 million dollars to build.', true, 'A cost can be checked against records, so it is a fact (whether or not it is true in this example).'),
  fo(2, 'The new stadium is a waste of money.', false, '“A waste” is a judgement. Some people would disagree, so it is an opinion.'),
  fo(3, 'Studies show that students who read for fun often do better in tests.', true, 'This reports findings that can be checked, so it is presented as a fact. A careful reader would still ask which studies.'),
  fo(3, 'Clearly, everyone agrees that homework is pointless.', false, '“Clearly” and “everyone agrees” make an opinion sound like a fact, but it is still a judgement that many dispute.'),
  Q(3, 'Which word most often signals an opinion?', 'Should', ['Measured', 'Recorded', 'Counted'],
    'Should, best, worst, beautiful and terrible signal judgements. Measured, recorded and counted point to checkable facts.'),
];

const BIAS = [
  Q(1, 'What does it mean if a text is biased?', 'It favours one side unfairly.', ['It is written in the first person.', 'It has more than one author.', 'It includes too many facts.'],
    'Bias is an unfair leaning towards one side, often by leaving out the other side or using loaded words.'),
  Q(1, 'A review of a phone is written by the company that makes it. What should a reader think?', 'It may be biased in favour of the phone.', ['It must be the most accurate review there is.', 'It will point out every problem with the phone.', 'It is certainly a fair and balanced review.'],
    'The company profits if people buy the phone, so it has a reason to present it favourably.'),
  Q(2, 'Which headline is the most balanced?', 'Council votes 5–4 to close the old pool', ['Heartless council destroys our beloved pool', 'Council finally rids town of useless pool', 'Pool lovers lose out to greedy council'],
    'The first states what happened, with no loaded words for either side.'),
  Q(2, 'This article describes a new road. What makes it biased?', 'It gives only the benefits and none of the drawbacks.', ['It mentions the name of the town and its high street.', 'It uses full sentences and clear paragraphs throughout.', 'It is written in the past tense, like a story.'],
    'A fair article would also mention drawbacks, such as noise or lost trees. Leaving them out makes it one-sided.',
    'The new road will cut journey times, bring shoppers to our high street and create jobs. Everyone will benefit from this exciting project.'),
  Q(3, 'A writer calls one group “protesters” and the other “thugs”, though both did the same thing. What does this show?', 'Bias through word choice', ['A fair and balanced report', 'A mistake in the spelling', 'A careful use of statistics'],
    'Describing the same actions with different labels, one neutral and one loaded, reveals the writer’s bias.'),
  Q(3, 'How can a reader check whether a text is biased?', 'Compare it with other sources that may see things differently.', ['Count the number of paragraphs that the text contains.', 'Check whether it has a title written at the very top.', 'See whether the font is large and easy enough to read.'],
    'Comparing sources shows what a text has left out or exaggerated.'),
];

// ---------------------------------------------------------------------------- skills

export const NONFICTION_SKILLS: SkillDef[] = [
  skill({ id: 'e7-claim-reasons', name: 'Claim, reasons and evidence', description: 'Trace an argument from its claim to its reasons and evidence, and spot a counterclaim.', outcomes: D1, lessonId: 'e7-4-1', format: 'mc', gen: bank(CLAIMS, ['The claim is the main point; reasons say why; evidence proves the reasons.', 'A counterclaim argues the other side.']) }),
  skill({ id: 'e7-evidence-types', name: 'Kinds of evidence', description: 'Name statistics, expert opinion, anecdotes and examples, and judge how strong and relevant they are.', outcomes: D1, lessonId: 'e7-4-1', format: 'mc', gen: bank(EVIDENCE, ['Ask: is this evidence relevant to the claim?', 'Ask: is the expert really an expert in this subject?']) }),
  skill({ id: 'e7-persuasive-techniques', name: 'Persuasive techniques', description: 'Identify rhetorical questions, the rule of three, emotive language, direct address and repetition.', outcomes: D1, lessonId: 'e7-4-2', format: 'mc', gen: bank(TECHNIQUES, ['A rhetorical question expects no answer.', 'Emotive words are chosen to stir feelings.']) }),
  skill({ id: 'e7-persuasive-effect', name: 'The effect of persuasion', description: 'Explain how a persuasive technique affects a reader.', outcomes: D1, lessonId: 'e7-4-2', format: 'mc', gen: bank(EFFECT, ['Ask: how is this meant to make the reader feel or think?', 'Then ask: is there evidence behind it?']) }),
  skill({ id: 'e7-fact-opinion', name: 'Fact and opinion', description: 'Tell facts from opinions, including opinions dressed up as facts.', outcomes: D2, lessonId: 'e7-4-3', format: 'mc', gen: bank(FACT_OPINION, ['A fact can be checked; an opinion is a judgement.', 'Watch for words like best, should and clearly.']) }),
  skill({ id: 'e7-bias', name: 'Bias', description: 'Recognize bias in what a writer includes, leaves out and how they word it.', outcomes: D2, lessonId: 'e7-4-3', format: 'mc', gen: bank(BIAS, ['Ask: who wrote this, and what might they gain?', 'Look for loaded words and missing sides.']) }),
];
