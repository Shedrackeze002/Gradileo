/**
 * Grade 8 English, Unit 4: Non-fiction (E8-D1). Building an argument, ethos, pathos and logos, and
 * evaluating sources and reasoning. The passages are written for Gradileo; any figures in them are
 * invented for the question and stated inside it.
 */
import { skill } from '../../helpers.ts';
import type { SkillDef } from '../../../types.ts';
import { bank, Q } from './common.ts';

const D1 = ['E8-D1'];

const PHONES = 'Schools should ban phones during lessons. In a trial at one school, test scores rose by 8% in the year after phones were banned. Phones distract students, and a student who checks a message loses focus for several minutes afterwards. Some argue that phones help in emergencies; however, students could still use them at break and lunch, and the school office can always reach parents.';

// ---------------------------------------------------------------------------- 4.1 building an argument

const PARTS = [
  Q(1, 'What is the claim of this argument?', 'Schools should ban phones during lessons.', ['Test scores rose by 8% at one school.', 'Phones can help in emergencies.', 'The office can reach parents.'],
    'The claim is the main position the writer argues for.', PHONES),
  Q(1, 'Which sentence gives evidence?', 'Test scores rose by 8% after phones were banned.', ['Schools should ban phones during lessons.', 'Some argue that phones help in emergencies.', 'Students could use them at break and lunch.'],
    'The 8% rise is a fact offered as proof.', PHONES),
  Q(2, 'What is a warrant in an argument?', 'The link that explains why the evidence supports the claim', ['The very first sentence of an argument, which hooks the reader', 'A quotation from a famous person', 'The list of sources at the end'],
    'A warrant connects evidence and claim. Here: if banning phones raised scores, phones must have been harming learning.'),
  Q(2, 'Which is the warrant that links the 8% rise to the claim?', 'Higher scores after the ban suggest phones were hurting learning.', ['Phones are expensive and easily broken or lost.', 'Students like to send messages to their friends.', 'The trial took place at only one school in the town last year.'],
    'The warrant explains why the evidence matters: the rise implies the phones were the problem.', PHONES),
  Q(3, 'What is the weakness in using one school’s trial as evidence?', 'One school may not be typical, so the result may not apply everywhere.', ['A trial can never tell us anything useful at all about schools.', 'Test scores are not a kind of evidence.', 'An 8% rise is too large to be believed.'],
    'Evidence from a single case is limited. A stronger argument would use several studies.', PHONES),
];

const COUNTER = [
  Q(1, 'What is a counterargument?', 'An argument against the writer’s claim', ['The writer’s main claim restated again', 'A piece of evidence that supports the claim', 'The conclusion at the end of the essay'],
    'A counterargument is an opposing view. Strong writers address it rather than ignore it.'),
  Q(1, 'In the passage, what is the counterargument?', 'Phones help in emergencies.', ['Phones distract students in class.', 'Test scores rose by 8%.', 'Schools should ban phones.'],
    '“Some argue that phones help in emergencies” is the opposing view.', PHONES),
  Q(2, 'How does the writer rebut the counterargument?', 'By showing emergencies can still be handled without phones in lessons', ['By agreeing that phones should be allowed at all times', 'By ignoring the counterargument completely and changing the subject', 'By saying that emergencies never happen at school'],
    'The writer answers it: phones are allowed at break, and the office can reach parents.', PHONES),
  Q(2, 'What is a concession?', 'Admitting that part of the other side has a point', ['Refusing to listen to anything the other side says', 'Repeating your claim in the conclusion', 'Giving up your claim completely'],
    'A concession (“It is true that…”) shows fairness before the writer rebuts.'),
  Q(3, 'Why does acknowledging a counterargument make an argument stronger?', 'It shows the writer is fair and has thought about objections.', ['It makes the argument much shorter and quicker to read.', 'It proves that the other side was completely right all along.', 'It means the writer no longer needs any evidence.'],
    'Readers trust a writer who deals with objections honestly, and the rebuttal answers doubts before they grow.'),
  Q(3, 'Which sentence is a concession followed by a rebuttal?', 'It is true that uniforms cost money, but they are cheaper than buying many outfits.', ['Uniforms cost money, and they are also uncomfortable to wear in hot weather.', 'Uniforms are the best idea, and nobody could disagree.', 'Some people dislike uniforms for many different reasons.'],
    'It grants the opposing point (cost) and then answers it.'),
];

// ---------------------------------------------------------------------------- 4.2 ethos, pathos and logos

const APPEALS = ['Ethos', 'Pathos', 'Logos'];
const appeal = (d: 1 | 2 | 3, text: string, k: number, why: string) => Q(d, 'Which appeal does this use most?', APPEALS[k], [...APPEALS.filter((_, i) => i !== k), 'None of these'], why, text);

const APPEAL_TYPE = [
  Q(1, 'What does logos appeal to?', 'Logic and reason', ['Emotion and feeling', 'The speaker’s credibility', 'Humour and fun'],
    'Logos uses facts, figures and reasoning. Pathos appeals to emotion, and ethos to credibility.'),
  appeal(1, 'As a nurse for twenty years, I have seen what poor diets do to children.', 0,
    'The speaker builds trust through experience: ethos.'),
  appeal(1, 'Imagine a child going to bed hungry, night after night.', 1,
    'The image is meant to stir pity: pathos.'),
  appeal(2, 'Cycling to school takes 15 minutes and costs nothing; driving takes 10 minutes and costs £3 a day in fuel and parking.', 2,
    'The comparison of time and cost appeals to reason: logos. (The figures are invented for this question.)'),
  appeal(2, 'Scientists at three universities reached the same conclusion independently.', 0,
    'Naming respected experts builds credibility. It also has a logical side, but the main appeal is ethos, trust in the source.'),
  appeal(3, 'If we do nothing, our grandchildren will ask us why we stood by as the forests burned.', 1,
    'Picturing grandchildren’s blame aims at guilt and fear: pathos.'),
  appeal(3, 'Since every extra hour of sleep improves memory, and teens need nine hours, school should start later.', 2,
    'It reasons step by step from premises to a conclusion: logos.'),
];

const APPEAL_EFFECT = [
  Q(1, 'Why might a speaker mention their own experience before making an argument?', 'To show they can be trusted on the subject', ['To make the speech as long as possible', 'To change the subject away from the topic', 'To make the audience laugh at them'],
    'Establishing experience is ethos: the audience is more likely to believe a credible speaker.'),
  Q(2, 'Which appeal would most persuade a group of scientists?', 'Logos, with clear data and reasoning', ['Pathos, with a sad story', 'Ethos, with a famous actor', 'None: scientists cannot be persuaded'],
    'An expert audience expects evidence and logic.'),
  Q(2, 'A charity advert shows a shivering dog and soft music. What is the intended effect?', 'To make viewers feel pity, so they donate', ['To give viewers exact facts about dogs', 'To show the charity’s financial accounts', 'To prove the charity is the largest one'],
    'Images and music are chosen to create emotion: pathos.'),
  Q(3, 'What is the risk of relying only on pathos?', 'Readers may feel strongly but not be convinced by reasons.', ['Readers will feel nothing at all about the topic.', 'The argument will be full of far too many statistics.', 'The writer will seem too expert and cold.'],
    'Emotion without evidence can feel manipulative. The strongest arguments balance all three appeals.'),
  Q(3, 'Why do strong speeches often combine ethos, pathos and logos?', 'Each reaches the audience in a different way: trust, feeling and reason.', ['Using all three makes the speech short.', 'Using one appeal on its own is against the rules of speech writing.', 'They are three names for the same thing.'],
    'An audience trusts a credible speaker, is moved by emotion and convinced by logic; together they persuade more fully.'),
];

// ---------------------------------------------------------------------------- 4.3 evaluating sources and reasoning

const CREDIBILITY = [
  Q(1, 'What is a primary source?', 'A first-hand account or original record', ['A textbook summary written much later', 'An encyclopedia article about a topic', 'A review of someone else’s book'],
    'Diaries, letters, photographs and interviews from the time are primary. Textbooks and encyclopedias are secondary.'),
  Q(1, 'Which source is most credible for the health effects of sugar?', 'A peer-reviewed medical journal', ['A sweet company’s advertisement', 'An anonymous online forum post', 'A friend’s opinion on the subject'],
    'Peer review means experts checked the research. The company has a reason to be biased.'),
  Q(2, 'A study on energy drinks was paid for by an energy-drink company. What should a reader consider?', 'The funding could create a conflict of interest.', ['The study must be the most accurate available.', 'Companies never pay for any research.', 'The funding does not matter at all.'],
    'A source with something to gain may present results favourably. It is not automatically wrong, but needs checking.'),
  Q(3, 'Which detail does NOT help you judge a source’s credibility?', 'How attractive the website’s colours are', ['The author’s expertise and qualifications', 'When the source was published', 'Whether it cites its evidence'],
    'Design says nothing about accuracy. Expertise, date and evidence do.'),
];

const FALLACIES = ['Bandwagon', 'False choice', 'Hasty generalization', 'Attack on the person'];
const fallacy = (d: 1 | 2 | 3, text: string, k: number, why: string) => Q(d, 'Which faulty reasoning is this?', FALLACIES[k], FALLACIES.filter((_, i) => i !== k), why, text);

const FALLACY = [
  Q(1, 'What is a fallacy?', 'A flaw in reasoning that makes an argument weak', ['A fact that has been checked carefully', 'A kind of strong evidence that comes from an expert', 'A strong conclusion to an essay'],
    'A fallacy looks persuasive but does not hold up logically.'),
  fallacy(1, 'Everyone is buying this phone, so it must be the best.', 0,
    'Popularity does not prove quality. This is the bandwagon fallacy.'),
  fallacy(2, 'Either we ban all cars from the city, or the air will be poisoned forever.', 1,
    'It presents only two extreme options when there are many others. That is a false choice.'),
  fallacy(2, 'My two cousins hated the film, so everyone will hate it.', 2,
    'Two people are too few to judge everyone: a hasty generalization.'),
  fallacy(3, 'Why listen to her views on the park? She can’t even keep her own garden tidy.', 3,
    'It attacks the person instead of answering her argument.'),
  fallacy(3, 'I met a rude tourist once, so tourists are all rude.', 2,
    'One example is used to judge a whole group: a hasty generalization.'),
];

// ---------------------------------------------------------------------------- skills

export const NONFICTION_SKILLS: SkillDef[] = [
  skill({ id: 'e8-argument-parts', name: 'Parts of an argument', description: 'Identify an argument’s claim, reasons, evidence and warrant.', outcomes: D1, lessonId: 'e8-4-1', format: 'mc', gen: bank(PARTS, ['Claim: the position. Evidence: the proof.', 'Warrant: why the evidence supports the claim.']) }),
  skill({ id: 'e8-counterargument', name: 'Counterarguments and rebuttals', description: 'Explain how a writer acknowledges, concedes and rebuts a counterargument.', outcomes: D1, lessonId: 'e8-4-1', format: 'mc', gen: bank(COUNTER, ['A counterargument is the other side.', 'Concede the fair part, then rebut.']) }),
  skill({ id: 'e8-appeals', name: 'Ethos, pathos and logos', description: 'Identify appeals to credibility, emotion and logic.', outcomes: D1, lessonId: 'e8-4-2', format: 'mc', gen: bank(APPEAL_TYPE, ['Ethos: trust. Pathos: feeling. Logos: reason.', 'Ask what the writer wants you to trust, feel or think.']) }),
  skill({ id: 'e8-appeal-effect', name: 'Choosing an appeal', description: 'Explain why a writer uses an appeal for a given audience and purpose.', outcomes: D1, lessonId: 'e8-4-2', format: 'mc', gen: bank(APPEAL_EFFECT, ['Ask: who is the audience, and what will move them?', 'Strong arguments balance all three appeals.']) }),
  skill({ id: 'e8-credibility', name: 'Credible sources', description: 'Judge the credibility of a source, including primary and secondary sources and conflicts of interest.', outcomes: D1, lessonId: 'e8-4-3', format: 'mc', gen: bank(CREDIBILITY, ['Ask: who made this, how do they know, and what do they gain?', 'Primary sources are first-hand.']) }),
  skill({ id: 'e8-fallacies', name: 'Faulty reasoning', description: 'Spot the bandwagon, the false choice, hasty generalizations and attacks on the person.', outcomes: D1, lessonId: 'e8-4-3', format: 'mc', gen: bank(FALLACY, ['Popular is not the same as right.', 'Ask: are there really only two choices, and is one example enough?']) }),
];
