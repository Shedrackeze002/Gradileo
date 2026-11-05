/**
 * Grade 9 English, Unit 7: Writing (E9-G1, E9-G2). The analytical essay, the personal essay, timed
 * writing, and revising for style. The examples are written for Gradileo.
 */
import { skill } from '../../helpers.ts';
import type { SkillDef } from '../../../types.ts';
import { bank, Q } from './common.ts';

const G1 = ['E9-G1'];
const G2 = ['E9-G2'];

// ---------------------------------------------------------------------------- 7.1 the analytical essay

const THESIS = [
  Q(1, 'How is an analytical thesis different from a summary?', 'It makes an interpretation that the essay must prove.', ['It retells the plot of the text in the correct order.', 'It lists the names of every character in the text.', 'It gives the writer’s opinion of whether the book is good.'],
    'An analytical thesis argues what a text means or how it works.'),
  Q(1, 'Which is an analytical thesis about The Tempest?', 'Shakespeare uses Caliban to question whether Prospero’s rule is just.', ['The Tempest is a play by Shakespeare about an island.', 'Prospero has a daughter called Miranda and a spirit.', 'I enjoyed reading The Tempest more than any of the other plays.'],
    'It makes a claim about how the play works that needs evidence.'),
  Q(2, 'Which thesis is the most precise?', 'Owen’s imagery of disease and decay turns the soldiers’ heroism into horror.', ['Owen’s poem is about war, and war is very bad for everyone involved.', 'Owen uses lots of different techniques in his famous war poem.', 'This essay will discuss the poem by Wilfred Owen in some detail.'],
    'It names the technique, the text and the effect.'),
  Q(2, 'Why should an analytical thesis be arguable?', 'If no one could disagree, there is nothing for the essay to prove.', ['Arguable theses are shorter and quicker to write than others.', 'Teachers only accept theses that are obviously correct.', 'An arguable thesis means the essay needs no evidence.'],
    'A thesis that states the obvious leaves the essay with nothing to do.'),
  Q(3, 'How can a thesis address “how” and “why”, not just “what”?', 'By naming the writer’s methods and the effect or purpose they serve', ['By listing every single event in the plot in the correct order', 'By stating whether the reader enjoyed the text or not', 'By quoting the longest passage in the text in full'],
    '“What”: Prospero forgives. “How and why”: Shakespeare stages his forgiveness to show that mercy is the rarer strength.'),
];

const STRUCTURE = [
  Q(1, 'What should each body paragraph of an analytical essay begin with?', 'A topic sentence that makes one point supporting the thesis', ['A long quotation with no comment of any kind', 'A summary of the whole plot of the text', 'A question that the writer does not plan to answer later'],
    'Topic sentences are the steps of the argument.'),
  Q(1, 'What is the job of a transition?', 'To show how one idea links to the next', ['To repeat the thesis word for word', 'To introduce a brand new topic', 'To list the sources used at the end'],
    'Words such as “however”, “similarly” and “as a result” guide the reader.'),
  Q(2, 'What is the best order for body paragraphs in an analytical essay?', 'An order that builds the argument, often from simpler points to deeper ones', ['A random order, since the reader will put all the points together anyway', 'Always the order in which the points appear in the text', 'Shortest paragraph first, then the longest one at the end'],
    'Build to your most insightful point.'),
  Q(2, 'Which is the strongest concluding sentence for an essay on The Tempest?', 'In forgiving his enemies, Prospero shows that the play’s real magic is mercy.', ['In conclusion, that is everything that I have to say about The Tempest.', 'The Tempest is a play that was written by William Shakespeare.', 'There are many other plays by Shakespeare that are also good.'],
    'A good conclusion draws the argument together and shows why it matters.'),
  Q(3, 'What should a conclusion do beyond restating the thesis?', 'Show the bigger significance of the argument', ['Introduce a brand new piece of evidence', 'Apologise for any weaknesses in the essay', 'Summarize the plot from the beginning'],
    'Answer the question “so what?”'),
];

// ---------------------------------------------------------------------------- 7.2 the personal essay

const PERSONAL = [
  Q(1, 'What is a personal essay?', 'Non-fiction that explores the writer’s own experience and what it means', ['A made-up story about characters who never existed in real life', 'A research report on a scientific experiment', 'A list of the writer’s achievements for a job'],
    'Personal essays combine storytelling and reflection.'),
  Q(1, 'Which opening is strongest for a personal essay about moving to a new country?', 'The first word I learned in English was “sorry”, and I said it a hundred times that week.', ['This essay is about the time that I moved to a new country with my whole family.', 'Moving to a new country is something that a lot of people do these days.', 'Everyone has experiences, and this is one of the experiences that I had.'],
    'A specific, vivid detail draws the reader straight in.'),
  Q(2, 'Why should a personal essay focus on a specific moment rather than a whole year?', 'A focused moment can be shown in vivid detail and carry a clear meaning.', ['A year is always too boring to write about in any essay at all.', 'Personal essays must be shorter than one single page in length.', 'Specific moments are easier to make up than real events are.'],
    'Depth beats breadth in a personal essay.'),
  Q(2, 'What is an anecdote?', 'A short, real story used to make a point', ['A long list of facts and statistics', 'A quotation from a famous writer', 'A remedy that cures a poison'],
    'Personal essays are often built around an anecdote. (An antidote cures poison.)'),
  Q(3, 'How should a personal essay sound?', 'Honest and personal, in the writer’s own voice', ['Formal and impersonal, like a science report', 'Full of long words to impress the reader', 'Exactly like a famous author’s style'],
    'The writer’s real voice is what makes a personal essay work.'),
];

const REFLECTION = [
  Q(1, 'What is reflection in a personal essay?', 'Thinking about what an experience meant and how it changed you', ['Describing what you can see in a mirror', 'Retelling all the events with no comment on them at all', 'Listing other people’s opinions of you'],
    'Reflection turns a story into an essay.'),
  Q(2, 'Which sentence is reflection rather than narration?', 'I realize now that I was not angry with my brother, but afraid of losing him.', ['My brother slammed the door and ran off down the street into the rain.', 'It was a Tuesday, and the bus was late again that morning.', 'We argued in the kitchen for nearly an hour about the trip.'],
    'It looks back and interprets the experience.'),
  Q(2, 'Where does reflection usually come in a personal essay?', 'Woven through it, and especially near the end', ['Only in the title, and nowhere else at all', 'Never: personal essays only tell events', 'In a list of sources at the very end'],
    'Writers often move between “then” and “now”.'),
  Q(3, 'Which reflection is the most insightful?', 'Losing the race taught me that I had been running for my father’s pride, not my own joy.', ['Losing the race made me very sad, but I got over it in the end after a while.', 'Losing is bad, and everyone should try their best to win every race.', 'I lost the race, and then I went home and had dinner with my family.'],
    'It reaches a specific, surprising understanding, not a cliché.'),
  Q(3, 'Why should reflection avoid clichés such as “I learned to never give up”?', 'Clichés are vague and hide what the writer actually discovered.', ['Clichés are always too long to fit in an essay.', 'Clichés are only ever allowed in poems, and never in essays.', 'Clichés make the essay too honest and personal.'],
    'Specific insight is more convincing than a ready-made moral.'),
];

// ---------------------------------------------------------------------------- 7.3 timed writing

const PROMPT = [
  Q(1, 'What should you do first in a timed essay?', 'Read the prompt carefully and underline its key words', ['Start writing at once to save as much time as possible', 'Write the conclusion first, then work backwards', 'Copy out the whole text you are writing about'],
    'Misreading the prompt is the most costly mistake.'),
  Q(1, 'What does the command word “analyse” ask you to do?', 'Examine how something works and why', ['Retell what happens in order', 'List the facts with no explanation', 'Say whether you liked it'],
    'Analyse means take apart and explain.'),
  Q(2, 'A prompt asks: “How does Shakespeare present the theme of power in The Tempest?” What must your answer focus on?', 'Shakespeare’s methods and what they show about power', ['A retelling of the whole plot from start to finish', 'A biography of Shakespeare and his family life', 'Your opinion on whether islands are nice places'],
    '“How does … present” asks about methods and effects.'),
  Q(2, 'What is the difference between “compare” and “contrast”?', 'Compare looks at similarities (and often differences); contrast looks at differences.', ['They mean exactly the same thing in every essay prompt.', 'Compare means describe one text; contrast means describe two.', 'Contrast looks only at similarities, while compare looks only at the differences.'],
    'Read command words precisely.'),
  Q(3, 'A prompt says: “To what extent is Prospero a sympathetic character?” What does “to what extent” require?', 'A judgement that weighs evidence on both sides', ['A simple yes or no with no further explanation', 'A list of every scene in which Prospero appears', 'A description of Prospero’s costume on stage'],
    '“To what extent” invites a balanced, nuanced judgement.'),
];

const PLANNING = [
  Q(1, 'Why should you plan before writing a timed essay?', 'A plan keeps the essay focused and saves time later.', ['Planning is a waste of the time you are given.', 'Plans are marked instead of the essay itself.', 'A plan means you can skip the conclusion.'],
    'A few minutes of planning prevents wandering.'),
  Q(2, 'In a 45-minute essay, about how long is sensible for planning?', 'About 5 to 10 minutes', ['About 30 minutes', 'No time at all', 'The whole 45 minutes'],
    'Enough to sketch a thesis and points, while leaving time to write and check.'),
  Q(2, 'What should a quick essay plan include?', 'A thesis, the main point of each paragraph, and key evidence', ['Every sentence of the essay written out in full', 'A drawing of the main character’s face', 'A list of all the words you might not know how to spell'],
    'A plan is a map, not a draft.'),
  Q(3, 'You have five minutes left and one paragraph unwritten. What is the best move?', 'Write a brief version of the point and a short conclusion.', ['Start the whole essay again from the very beginning.', 'Leave the essay unfinished with no conclusion.', 'Spend the time decorating the title.'],
    'A complete argument, even if brief, beats an unfinished one.'),
  Q(3, 'Why save a few minutes at the end of a timed essay?', 'To proofread for errors and check that the essay answers the prompt', ['To write a second, completely different essay on the same prompt', 'To rest, since nothing written at the end ever counts', 'To copy out the prompt again in your best handwriting'],
    'Quick checks can fix costly slips.'),
];

// ---------------------------------------------------------------------------- 7.4 revising for style

const CONCISION = [
  Q(1, 'What does it mean to write concisely?', 'To say what you mean in as few words as clarity allows', ['To use as many long, difficult words as you possibly can', 'To leave out all of the important details', 'To write every sentence as a question'],
    'Concise writing cuts padding, not meaning.'),
  Q(1, 'Which is the most concise version of “at this point in time”?', 'now', ['at this current moment', 'at the present time now', 'in this point of time'],
    'One word does the job of five.'),
  Q(2, 'Which revision removes the redundancy in “The two twins were identical in appearance and looked the same”?', 'The twins were identical.', ['The two twins looked the same in appearance.', 'The twins were identical and looked alike.', 'The two twins were identical in appearance.'],
    '“Two twins”, “identical” and “looked the same” all repeat one idea.'),
  Q(2, 'Which is the best revision of “Due to the fact that it was raining, we stayed in”?', 'Because it was raining, we stayed in.', ['Due to the fact that it rained, we stayed in.', 'Owing to the fact of rain, we stayed inside.', 'Due to the rain fact, we stayed indoors.'],
    '“Because” replaces “due to the fact that”.'),
  Q(3, 'Which is the best revision of “It is my opinion that the ending of the story is something that is weak”?', 'The story’s ending is weak.', ['In my opinion, the ending is something weak.', 'It is my opinion that the ending is weak.', 'The ending of the story is something weak.'],
    'Cut “It is my opinion that” and “something that is”; the claim is stronger for it.'),
];

const WORD_CHOICE = [
  Q(1, 'Which verb is the most precise and vivid?', 'The runner sprinted to the line.', ['The runner went to the line.', 'The runner got to the line.', 'The runner moved to the line.'],
    '“Sprinted” shows exactly how the runner moved.'),
  Q(1, 'Which phrase is a cliché?', 'as busy as a bee', ['as busy as a ticket booth', 'busy with grading', 'too busy to eat lunch'],
    'A cliché is a phrase used so often it has lost its force.'),
  Q(2, 'Which revision replaces the vague word “nice” most precisely?', 'The soup was rich and peppery.', ['The soup was very nice indeed.', 'The soup was good and nice.', 'The soup was really quite nice.'],
    'Precise adjectives show exactly what “nice” meant.'),
  Q(2, 'Why is “The old man shuffled” stronger than “The old man walked slowly”?', 'One precise verb shows the movement better than a verb plus an adverb.', ['“Shuffled” is a longer and more difficult word to spell.', 'Adverbs are never allowed in any good piece of writing at all.', 'The second sentence is grammatically incorrect English.'],
    'Strong verbs often make adverbs unnecessary.'),
  Q(3, 'A writer describes a quiet library as “deafeningly silent”. What is this figure, and why use it?', 'An oxymoron, stressing how intense the silence feels', ['A simile, comparing the library to a loud noise', 'A pun, making a joke about the word “library”', 'A cliché, because everyone uses that phrase'],
    'Joining opposites makes the reader notice the silence.'),
];

// ---------------------------------------------------------------------------- skills

export const WRITING_SKILLS: SkillDef[] = [
  skill({ id: 'e9-analytical-thesis', name: 'Analytical theses', description: 'Write an arguable, precise thesis that interprets a text.', outcomes: G1, lessonId: 'e9-7-1', format: 'mc', gen: bank(THESIS, ['Name the text, the method and the effect.']) }),
  skill({ id: 'e9-essay-structure', name: 'Structuring an analytical essay', description: 'Organize an essay with topic sentences, transitions and a conclusion.', outcomes: G1, lessonId: 'e9-7-1', format: 'mc', gen: bank(STRUCTURE, ['Each paragraph proves one step of the thesis.']) }),
  skill({ id: 'e9-personal-essay', name: 'The personal essay', description: 'Shape a personal essay around a specific, vivid moment.', outcomes: G2, lessonId: 'e9-7-2', format: 'mc', gen: bank(PERSONAL, ['Focus on one moment and tell it vividly.']) }),
  skill({ id: 'e9-reflection', name: 'Reflection', description: 'Reflect on what an experience means, avoiding clichés.', outcomes: G2, lessonId: 'e9-7-2', format: 'mc', gen: bank(REFLECTION, ['Ask: what do I understand now that I did not then?']) }),
  skill({ id: 'e9-prompt-analysis', name: 'Reading an essay prompt', description: 'Unpick command words and what a prompt is asking.', outcomes: G1, lessonId: 'e9-7-3', format: 'mc', gen: bank(PROMPT, ['Underline the command word and the focus.']) }),
  skill({ id: 'e9-timed-planning', name: 'Planning under time limits', description: 'Plan and manage time in a timed essay.', outcomes: G1, lessonId: 'e9-7-3', format: 'mc', gen: bank(PLANNING, ['Plan, write, then check.']) }),
  skill({ id: 'e9-concision', name: 'Concision', description: 'Cut wordiness and redundancy.', outcomes: G2, lessonId: 'e9-7-4', format: 'mc', gen: bank(CONCISION, ['Cut words that add nothing.']) }),
  skill({ id: 'e9-word-choice', name: 'Precise word choice', description: 'Choose precise, vivid words and avoid clichés.', outcomes: G2, lessonId: 'e9-7-4', format: 'mc', gen: bank(WORD_CHOICE, ['Prefer a strong verb to a weak verb and an adverb.']) }),
];
