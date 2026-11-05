/**
 * Grade 9 English, Unit 4: Non-fiction (E9-D1). Rhetorical devices, analysing a speech, and sound
 * and faulty reasoning. Speeches quoted: Abraham Lincoln (Gettysburg Address, 1863) and Frederick
 * Douglass (“What to the Slave Is the Fourth of July?”, 1852). Other passages are written for
 * Gradileo.
 */
import { skill } from '../../helpers.ts';
import type { SkillDef } from '../../../types.ts';
import { bank, Q } from './common.ts';

const D1 = ['E9-D1'];

const LINCOLN_SRC = 'Abraham Lincoln, the Gettysburg Address (1863)';
const GETTYSBURG_OPEN = 'Four score and seven years ago our fathers brought forth on this continent, a new nation, conceived in Liberty, and dedicated to the proposition that all men are created equal.';
const GETTYSBURG_HALLOW = 'But, in a larger sense, we can not dedicate—we can not consecrate—we can not hallow—this ground.';
const GETTYSBURG_END = '…that this nation, under God, shall have a new birth of freedom—and that government of the people, by the people, for the people, shall not perish from the earth.';
const DOUGLASS_SRC = 'Frederick Douglass, “What to the Slave Is the Fourth of July?” (1852)';
const DOUGLASS = 'What, to the American slave, is your 4th of July? I answer: a day that reveals to him, more than all other days in the year, the gross injustice and cruelty to which he is the constant victim.';

// ---------------------------------------------------------------------------- 4.1 rhetorical devices

const DEVICES = ['Anaphora', 'Tricolon', 'Antithesis', 'Rhetorical question'];
const device = (d: 1 | 2 | 3, text: string, k: number, why: string, source?: string) =>
  Q(d, 'Which rhetorical device is used here?', DEVICES[k], DEVICES.filter((_, i) => i !== k), why, text, source);

const RHETORIC = [
  device(1, 'We will not wait. We will not be silent. We will not give up.', 0, 'Each sentence begins with the same words, “We will not”: anaphora.'),
  device(1, 'Who among us does not want a safer town for our children?', 3, 'A question asked for effect, not for an answer: a rhetorical question.'),
  device(2, '…government of the people, by the people, for the people…', 1, 'Three parallel phrases in a row: a tricolon (a rule of three).', LINCOLN_SRC),
  device(2, 'It was the best of times, it was the worst of times.', 2, 'Opposite ideas set side by side in a balanced structure: antithesis. (Charles Dickens, “A Tale of Two Cities”, 1859)'),
  device(3, 'Ask not what your town can do for you; ask what you can do for your town.', 2, 'The reversed halves set opposite ideas against each other: antithesis.'),
  Q(3, 'Which devices does Lincoln combine in “we can not dedicate—we can not consecrate—we can not hallow—this ground”?', 'Anaphora and a tricolon', ['Antithesis and a rhetorical question', 'A simile and personification', 'Hyperbole and onomatopoeia'],
    '“We can not” repeats at the start of each phrase (anaphora), and there are three of them (tricolon).', GETTYSBURG_HALLOW, LINCOLN_SRC),
];

const DEVICE_EFFECT = [
  Q(1, 'Why do speakers often group ideas in threes?', 'A group of three sounds complete and is easy to remember.', ['Audiences can only ever count to three when listening.', 'Groups of three make a speech much shorter overall.', 'It hides the speaker’s main point from the audience.'],
    'The tricolon gives a satisfying rhythm and builds to a climax.'),
  Q(2, 'What is the effect of anaphora in a speech?', 'The repetition builds rhythm and drives the key idea home.', ['It confuses the audience about what the main idea is.', 'It shows that the speaker has forgotten what to say.', 'It makes the speech sound quiet and uncertain to listeners.'],
    'Repeated openings hammer home a point and stir emotion.'),
  Q(2, 'Douglass asks, “What, to the American slave, is your 4th of July?” and then answers it himself. Why?', 'The question forces the audience to see the holiday from an enslaved person’s view.', ['He does not know the answer himself and wants someone in the audience to tell him.', 'He wants to change the subject to a different holiday entirely.', 'He is praising the Fourth of July as a day of freedom for all.'],
    'His answer exposes the gap between the nation’s celebration of liberty and the reality of slavery.', DOUGLASS, DOUGLASS_SRC),
  Q(3, 'Douglass says “your 4th of July”, not “our”. What is the effect of this word choice?', 'It shows that enslaved people are shut out of the freedom being celebrated.', ['It shows that Douglass is celebrating the holiday with his audience.', 'It is a simple mistake, and “our” is what he really meant to say.', 'It makes the speech sound more friendly and relaxed to listeners.'],
    'One pronoun separates the audience’s freedom from the slave’s bondage.', DOUGLASS, DOUGLASS_SRC),
  Q(3, 'Lincoln opens with “Four score and seven years ago” rather than “Eighty-seven years ago”. What is the effect?', 'The formal, Bible-like phrase gives the occasion a solemn, timeless tone.', ['It makes the speech sound casual and chatty, like a conversation.', 'It is easier for the audience to work out the number quickly.', 'It shows that Lincoln has forgotten exactly how many years ago.'],
    '“Score” (twenty) echoes the language of the Bible, lifting the speech above the everyday.', GETTYSBURG_OPEN, LINCOLN_SRC),
];

// ---------------------------------------------------------------------------- 4.2 analysing a speech

const PURPOSE = [
  Q(1, 'When analysing a speech, what does “context” mean?', 'The time, place and situation in which it was given', ['The total number of words in the speech as printed', 'The font the speech was printed in', 'The speaker’s favourite colour'],
    'Context explains why the speech was given and why it mattered.'),
  Q(1, 'What is a speech’s audience?', 'The people it was written for', ['The person who wrote it down', 'The place it was given', 'The title of the speech'],
    'Speakers shape their words for their audience.'),
  Q(2, 'Lincoln gave the Gettysburg Address in 1863, during the American Civil War, at a cemetery for soldiers killed in battle. What was its main purpose?', 'To honour the dead and recommit the living to the cause they died for', ['To announce that the war was over and that his side had won', 'To describe the battle in detail, minute by minute, for listeners', 'To ask the audience to vote for him in the next election'],
    'He turns a ceremony for the dead into a call to finish their work.'),
  Q(2, 'Douglass was invited to speak at a Fourth of July celebration in 1852, when slavery was still legal in much of the United States. Why was this context powerful?', 'He used a celebration of freedom to expose the injustice of slavery.', ['The audience expected a speech about the history of fireworks.', 'He wanted to praise the country for its perfect record on freedom.', 'The context did not matter because the speech was very short.'],
    'Speaking on the very day of celebration made the contradiction impossible to ignore.'),
  Q(3, 'Why does Lincoln say “that all men are created equal” in his opening?', 'He roots his argument in the nation’s founding ideal, which the war is testing.', ['He wants to change the subject from the war to a new law about voting.', 'He is quoting a poem that he had read the night before the ceremony.', 'He is admitting that the nation was never founded on any ideals.'],
    'The line echoes the Declaration of Independence (1776).', GETTYSBURG_OPEN, LINCOLN_SRC),
];

const STRUCTURE = [
  Q(1, 'What is a call to action?', 'A part of a speech that urges the audience to do something', ['A phone call made by the speaker before the speech', 'A question the audience asks the speaker afterwards', 'A list of the sources the speaker used'],
    'Many persuasive speeches end with a call to action.'),
  Q(2, 'The Gettysburg Address moves from the nation’s birth, to the present war, to the future. Why this order?', 'Past, present and future build to a hopeful vision of what must be done.', ['It is the only order that a speech is allowed to follow by law.', 'It makes the speech sound confused and hard for listeners to follow.', 'It means the most important point comes right at the very start.'],
    'The time structure builds from history to a call to action.'),
  Q(2, 'What is the peroration of a speech?', 'Its powerful closing section, which sums up and stirs the audience', ['Its opening joke, which is meant to relax the nervous audience', 'The long middle section, where facts and figures go', 'The written notes that the speaker holds while talking'],
    'The peroration is where speakers place their most memorable lines.'),
  Q(3, 'Lincoln’s speech ends “that government of the people, by the people, for the people, shall not perish from the earth.” Why end here?', 'It closes on the speech’s highest ideal, in a rhythm the audience will remember.', ['It closes on a list of the soldiers who died in the battle at Gettysburg.', 'It closes by changing the subject to the price of food during the war.', 'It closes by admitting that the speech has failed in its main purpose.'],
    'The tricolon and the idea of democracy give the speech its final force.', GETTYSBURG_END, LINCOLN_SRC),
  Q(3, 'Why might a speaker open with a personal story?', 'A story hooks the audience and builds a personal connection.', ['A story fills time when the speaker has nothing to say.', 'A story proves the speaker’s argument with statistics.', 'Personal stories are forbidden in political speeches.'],
    'Anecdotes build ethos and pathos before the argument begins.'),
];

// ---------------------------------------------------------------------------- 4.3 reasoning

const REASONING = [
  Q(1, 'What is deductive reasoning?', 'Reasoning from a general rule to a certain conclusion about a case', ['Reasoning from a few examples to a likely general rule for all', 'Reasoning that uses only emotions instead of facts', 'Reasoning that has no conclusion at all at the end'],
    'All mammals breathe air; whales are mammals; so whales breathe air.'),
  Q(1, 'What is inductive reasoning?', 'Reasoning from examples to a probable general conclusion', ['Reasoning from a rule to a conclusion that is certain', 'Reasoning that attacks the person instead of the idea', 'Reasoning that repeats the claim as its own proof'],
    'Every swan I have seen is white, so swans are probably white. (Black swans exist, so induction is only probable.)'),
  Q(2, 'Which is an example of deductive reasoning?', 'All students in the club must pay; NAME is in the club; so NAME must pay.', ['NAME has been late three times, so {he} is probably late every day.', 'Most of my friends like the film, so it is probably a good film.', 'It rained the last two Mondays, so it will rain next Monday.'],
    'The conclusion follows with certainty from the general rule.'),
  Q(2, 'Why is this conclusion weak?', 'Ten customers are too few to stand for a whole town.', ['The survey should have asked more questions.', 'Coffee is not a suitable subject for a survey.', 'The conclusion is too short to be persuasive.'],
    'Inductive conclusions need enough representative evidence.', 'We asked ten customers in our café, and eight prefer our coffee. So most people in the town prefer our coffee.'),
  Q(3, 'What is a premise?', 'A statement that an argument assumes or offers as a reason', ['The final paragraph of an argument essay', 'A fact that has already been proved to be completely false', 'The title given to a speech or article'],
    'If a premise is false, the conclusion may not hold, even if the logic is valid.'),
];

const FALLACIES = ['Straw man', 'Slippery slope', 'Circular reasoning', 'Appeal to authority'];
const fallacy = (d: 1 | 2 | 3, text: string, k: number, why: string) => Q(d, 'Which fallacy is this?', FALLACIES[k], FALLACIES.filter((_, i) => i !== k), why, text);

const FALLACY = [
  fallacy(1, 'If we let students choose one book, next they will want to choose all their lessons, and soon there will be no school at all.', 1,
    'It claims one small step will lead, without evidence, to an extreme result: slippery slope.'),
  fallacy(1, 'My opponent wants to reduce homework. So he thinks students should never learn anything at all.', 0,
    'It distorts the other side into an extreme version that is easy to attack: straw man.'),
  fallacy(2, 'This website is trustworthy because it says it is the most reliable site online.', 2,
    'The claim is used as its own proof: circular reasoning.'),
  fallacy(2, 'A famous footballer says this toothpaste is the best, so it must be.', 3,
    'A footballer is not an expert on teeth: a false appeal to authority.'),
  fallacy(3, 'We cannot trust him because he is untrustworthy.', 2,
    'The conclusion simply restates the premise: circular reasoning.'),
  Q(3, 'Why is a straw man argument unfair?', 'It attacks a weaker version of the argument instead of the real one.', ['It uses too many statistics to support the claim.', 'It quotes the opponent’s exact words accurately.', 'It agrees with the opponent on every single point they make.'],
    'Defeating a distorted argument proves nothing about the real one.'),
];

// ---------------------------------------------------------------------------- skills

export const NONFICTION_SKILLS: SkillDef[] = [
  skill({ id: 'e9-rhetorical-devices', name: 'Rhetorical devices', description: 'Identify anaphora, the tricolon, antithesis and the rhetorical question.', outcomes: D1, lessonId: 'e9-4-1', format: 'mc', gen: bank(RHETORIC, ['Anaphora repeats openings; a tricolon groups three; antithesis balances opposites.']) }),
  skill({ id: 'e9-device-effect', name: 'The effect of rhetoric', description: 'Explain how a rhetorical device persuades its audience.', outcomes: D1, lessonId: 'e9-4-1', format: 'mc', gen: bank(DEVICE_EFFECT, ['Ask: what does this device make the audience feel or remember?']) }),
  skill({ id: 'e9-speech-purpose', name: 'Purpose, audience and context', description: 'Identify a speech’s purpose and audience, and explain how its context shapes it.', outcomes: D1, lessonId: 'e9-4-2', format: 'mc', gen: bank(PURPOSE, ['Who was listening, where, when and why?']) }),
  skill({ id: 'e9-speech-structure', name: 'How a speech is structured', description: 'Explain how a speech’s opening, development and ending persuade.', outcomes: D1, lessonId: 'e9-4-2', format: 'mc', gen: bank(STRUCTURE, ['Look at how the speech opens, builds and ends.']) }),
  skill({ id: 'e9-reasoning', name: 'Deductive and inductive reasoning', description: 'Tell deductive from inductive reasoning and judge whether evidence is enough.', outcomes: D1, lessonId: 'e9-4-3', format: 'mc', gen: bank(REASONING, ['Deductive: rule to case, certain. Inductive: examples to rule, probable.']) }),
  skill({ id: 'e9-fallacies', name: 'More fallacies', description: 'Identify the straw man, slippery slope, circular reasoning and false appeals to authority.', outcomes: D1, lessonId: 'e9-4-3', format: 'mc', gen: bank(FALLACY, ['Ask: does the conclusion really follow from the evidence?']) }),
];
