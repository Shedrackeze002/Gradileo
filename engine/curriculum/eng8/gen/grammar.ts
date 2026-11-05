/**
 * Grade 8 English, Unit 6: Grammar and punctuation (E8-F1, E8-F2). Active and passive voice,
 * misplaced and dangling modifiers, parallel structure, and semicolons and colons. The sentences are
 * invented for Gradileo.
 */
import { skill } from '../../helpers.ts';
import type { SkillDef } from '../../../types.ts';
import { bank, Q } from './common.ts';

const F1 = ['E8-F1'];
const F2 = ['E8-F2'];

// ---------------------------------------------------------------------------- 6.1 active and passive voice

const VOICES = ['Active voice', 'Passive voice'];
const voice = (d: 1 | 2 | 3, text: string, k: number, why: string) =>
  Q(d, 'Is this sentence in the active or the passive voice?', VOICES[k], [VOICES[1 - k], 'It has no verb at all', 'Both voices at once'], why, text);

const VOICE = [
  voice(1, 'NAME kicked the ball over the fence.', 0, 'The subject (NAME) does the action (kicked): active voice.'),
  voice(1, 'The ball was kicked over the fence.', 1, 'The subject (the ball) receives the action, and the verb uses “was” + past participle: passive voice.'),
  voice(2, 'The new library will be opened by the mayor next week.', 1, '“Will be opened” is a passive verb; the doer (the mayor) comes after “by”.'),
  voice(2, 'Our class has painted a mural in the hall.', 0, 'The subject (our class) does the painting: active voice.'),
  Q(2, 'Which sentence is the active version of “The cake was eaten by the dog”?', 'The dog ate the cake.', ['The cake ate the dog.', 'The cake had been eaten.', 'The dog was eaten by the cake.'],
    'In the active voice the doer (the dog) becomes the subject.'),
  Q(3, 'Which sentence is in the passive voice and leaves out who did the action?', 'Mistakes were made during the count.', ['The officials made mistakes during the count.', 'The officials counted the votes twice.', 'During the count, NAME made a mistake.'],
    'A passive verb (“were made”) lets a writer hide who was responsible.'),
  Q(3, 'Which sentence is the passive version of “The storm damaged three houses”?', 'Three houses were damaged by the storm.', ['The storm was damaging three houses.', 'Three houses damaged the storm badly.', 'The storm has damaged three houses.'],
    'The object (three houses) becomes the subject, and the verb becomes “were damaged”.'),
];

const VOICE_CHOICE = [
  Q(1, 'Why do writers usually prefer the active voice?', 'It is clearer and more direct about who did what.', ['It is always longer and more formal than passive.', 'The passive voice is grammatically incorrect.', 'It hides who was responsible for an action.'],
    'Active sentences put the doer first, so they are usually shorter and clearer.'),
  Q(2, 'A science report says: “The water was heated to 80 °C.” Why is the passive voice suitable here?', 'The action matters more than who did it.', ['The writer wants to blame a particular person.', 'Science reports never use the active voice at all.', 'Passive verbs always make sentences shorter.'],
    'In method writing, the process matters, not the person doing it.'),
  Q(2, 'A news report says: “A window was broken at the school last night.” Why might it use the passive?', 'Nobody knows yet who broke the window.', ['The writer wants to name and blame the culprit.', 'The passive always sounds more exciting to read.', 'Active verbs cannot describe a broken window.'],
    'When the doer is unknown, the passive voice lets the writer report the event.'),
  Q(3, 'A company says: “Errors were made in your bill.” What effect does the passive voice have?', 'It avoids saying that the company made the errors.', ['It shows the company is taking full responsibility.', 'It makes the apology longer and more detailed.', 'It proves that the customer made the errors.'],
    'Leaving out the doer can dodge blame, so readers should ask who did it.'),
  Q(3, 'Which is the best revision of “The match was won by our team in the last minute”?', 'Our team won the match in the last minute.', ['The match, in the last minute, was won by us.', 'In the last minute was won the match by our team.', 'The match was being won by our team at the end.'],
    'The active version is shorter and puts the doer (our team) first.'),
];

// ---------------------------------------------------------------------------- 6.2 modifiers

const MISPLACED = [
  Q(1, 'What is a misplaced modifier?', 'A describing word or phrase placed next to the wrong word', ['A word that is spelled wrongly in a sentence', 'A sentence that has no verb in it at all', 'A full stop placed by mistake in the middle of a sentence'],
    'A modifier should sit next to the word it describes.'),
  Q(1, 'What is wrong with this sentence?', 'It sounds as though the dog has the wallet, not the man.', ['The sentence has no subject at all.', 'The verb “sold” is in the wrong tense for this sentence.', 'There is nothing wrong with the sentence.'],
    '“With a leather wallet” sits next to “dog”, so it seems to describe the dog.', 'The man sold a dog with a leather wallet to my neighbour.'),
  Q(2, 'Which sentence places the modifier correctly?', 'NAME served the guests cold drinks in paper cups.', ['NAME served the guests in paper cups cold drinks.', 'In paper cups NAME served the guests cold drinks.', 'NAME, in paper cups, served the guests cold drinks.'],
    '“In paper cups” should sit right after “drinks”, not next to “guests” or NAME.'),
  Q(2, '“She almost failed every test.” What does the placement of “almost” suggest?', 'She came close to failing but passed every test.', ['She failed nearly all of the tests she took.', 'She failed every single test without exception.', 'She did not take any of the tests at all.'],
    '“Almost failed” means she did not fail. “Failed almost every test” means she failed most of them.'),
  Q(3, 'Which sentence means that only NAME finished the essay?', 'Only NAME finished the essay.', ['NAME only finished the essay.', 'NAME finished only the essay.', 'NAME finished the essay only.'],
    'Put “only” directly before the word it limits. Here it limits NAME.'),
  Q(3, 'Which is the best revision of “I saw a deer driving home from school”?', 'Driving home from school, I saw a deer.', ['I saw, driving home, a deer from school.', 'A deer driving home from school saw me.', 'I saw a deer that was driving from school.'],
    'Moving the phrase next to “I” makes it clear who was driving.'),
];

const DANGLING = [
  Q(1, 'What is a dangling modifier?', 'An opening phrase with no clear word in the sentence to describe', ['A word that is repeated twice in one sentence', 'A comma placed at the very end of a sentence', 'A sentence that is written entirely in the passive voice'],
    'A dangling modifier describes someone who is not named in the sentence.'),
  Q(1, 'What is wrong with this sentence?', 'It sounds as though the bus was running late.', ['It sounds as though the student caught the bus.', 'The sentence is too short to make any sense.', 'There is nothing wrong with this sentence.'],
    'The person running late is never named, so the phrase attaches to “the bus”.', 'Running late, the bus left without me.'),
  Q(2, 'Which sentence fixes “Walking to school, the rain started”?', 'Walking to school, I felt the rain start.', ['Walking to school, the rain started to fall.', 'The rain, walking to school, started early.', 'Walking to school the rain started, and fell.'],
    'The opening phrase now attaches to “I”, the person walking.'),
  Q(2, 'Which sentence has a dangling modifier?', 'After eating lunch, the dishes were washed.', ['After eating lunch, NAME washed the dishes.', 'NAME washed the dishes after eating lunch.', 'After lunch, NAME and NAME2 washed the dishes.'],
    'The dishes did not eat lunch. The sentence never says who did.'),
  Q(3, 'Which is the best revision of “To win the prize, hard work is needed”?', 'To win the prize, you need to work hard.', ['To win the prize, hard work is very needed.', 'Hard work, to win the prize, is needed.', 'To win the prize, needed is hard work.'],
    'Adding “you” gives the phrase “to win the prize” someone to describe.'),
  Q(3, 'Which sentence uses its opening phrase correctly?', 'Tired after the match, NAME fell asleep on the bus.', ['Tired after the match, the bus took NAME home.', 'Tired after the match, sleep came on the bus.', 'Tired after the match, the seat was comfortable.'],
    '“Tired after the match” must describe the word right after the comma: NAME.'),
];

// ---------------------------------------------------------------------------- 6.3 parallel structure

const PARALLEL = [
  Q(1, 'What is parallel structure?', 'Using the same grammatical form for items in a list or pair', ['Writing two sentences that mean exactly the same thing', 'Starting every sentence with the same word', 'Placing two paragraphs side by side on a page'],
    'For example: “running, swimming and cycling” (all -ing words).'),
  Q(1, 'Which sentence has parallel structure?', 'NAME likes reading, painting and dancing.', ['NAME likes reading, to paint and dancing.', 'NAME likes to read, painting and to dance.', 'NAME likes reading, paints and to dance.'],
    'All three items use the same -ing form.'),
  Q(2, 'Which item breaks the parallel structure?', '“she sang loudly”', ['“to wash the car”', '“to feed the cat”', 'None: the list is parallel.'],
    'The other two items begin with “to” + verb.', 'On Saturday NAME had to wash the car, to feed the cat and she sang loudly.'),
  Q(2, 'Which sentence uses “not only … but also” in parallel form?', 'The plan is not only cheap but also quick.', ['The plan is not only cheap but also it is quick.', 'Not only the plan is cheap but also quick.', 'The plan not only is cheap but quick also.'],
    'The words after “not only” and “but also” (cheap, quick) are the same kind of word.'),
  Q(3, 'Why do speakers often use parallel structure, as in “We will fight for our schools, for our parks and for our future”?', 'The repeated pattern creates rhythm and makes ideas memorable.', ['It makes each sentence shorter and much less important to hear.', 'It hides the main idea from the audience.', 'It is required in every sentence of a speech.'],
    'Parallel phrases build rhythm, so listeners remember them.'),
  Q(3, 'Which sentence is parallel?', 'The coach told us to stretch, to drink water and to rest.', ['The coach told us to stretch, drinking water and rest.', 'The coach told us stretching, to drink and resting.', 'The coach told us to stretch, water drinking and rest.'],
    'Each item is “to” + verb.'),
];

const PARALLEL_FIX = [
  Q(1, 'Which is the best revision of “I enjoy hiking, to swim and reading”?', 'I enjoy hiking, swimming and reading.', ['I enjoy to hike, swimming and reading.', 'I enjoy hiking, to swim and to read.', 'I enjoy hike, swim and reading books.'],
    'All three items now use the -ing form.'),
  Q(2, 'Which is the best revision of “The job requires patience, being careful and good skills with people”?', 'The job requires patience, care and people skills.', ['The job requires being patient, care and skills.', 'The job requires patience, being careful and skills.', 'The job requires patient, careful and people skill.'],
    'Each item is now a noun: patience, care, skills.'),
  Q(2, 'Which is the best revision of “NAME was tired, hungry and had no money”?', 'NAME was tired, hungry and broke.', ['NAME was tired, had hunger and had no money.', 'NAME was tired, hungry and was having no money.', 'NAME was tiredness, hunger and no money.'],
    'Each item is now an adjective after “was”.'),
  Q(3, 'Which is the best revision of “It is better to give than receiving”?', 'It is better to give than to receive.', ['It is better giving than to receive.', 'It is better to give than having received.', 'It is better to giving than receive.'],
    'A comparison links two items of the same form: “to give” and “to receive”.'),
  Q(3, 'Which is the best revision of “The essay was clear, well organised and it persuaded readers”?', 'The essay was clear, well organised and persuasive.', ['The essay was clear, organised well and it persuaded.', 'The essay was clear, well organised and persuading it.', 'The essay was clarity, organised and it persuaded.'],
    'Three adjectives in a row: clear, well organised, persuasive.'),
];

// ---------------------------------------------------------------------------- 6.4 semicolons and colons

const SEMICOLONS = [
  Q(1, 'What does a semicolon usually join?', 'Two closely related complete sentences', ['A list of single words with no verbs', 'A name and the title of a book', 'The greeting and the body of a letter'],
    'Each side of a semicolon should be able to stand alone as a sentence.'),
  Q(1, 'Which sentence uses a semicolon correctly?', 'It rained all day; the match was cancelled.', ['It rained; all day the match was cancelled.', 'It rained all day; and cancelled.', 'Because it rained all day; the match was cancelled.'],
    'Both sides are complete sentences, and the ideas are closely linked.'),
  Q(2, 'Which sentence uses a semicolon correctly before a connecting word?', 'NAME studied hard; however, the test was difficult.', ['NAME studied hard however; the test was difficult.', 'NAME studied; hard however, the test was difficult.', 'NAME studied hard, however; the test was difficult.'],
    'Put the semicolon before “however” and a comma after it.'),
  Q(2, 'Which sentence is a comma splice that a semicolon could fix?', 'The bell rang, everyone left the room.', ['The bell rang, and everyone left the room.', 'When the bell rang, everyone left the room.', 'The bell rang; everyone left the room.'],
    'Two sentences joined only by a comma form a comma splice.'),
  Q(3, 'Why does this list use semicolons?', 'The items already contain commas.', ['Semicolons are always used in every list.', 'The writer wanted the list to be shorter.', 'Each item is a complete sentence on its own.'],
    'Semicolons separate list items that contain commas, so the reader can tell them apart.', 'The tour visited Lagos, Nigeria; Accra, Ghana; and Nairobi, Kenya.'),
  Q(3, 'Which sentence uses a semicolon incorrectly?', 'We bought; apples, pears and plums.', ['We bought apples; the shop had no pears.', 'The shop was busy; we waited an hour.', 'NAME was late; {his} bus had broken down.'],
    'The words before the semicolon (“We bought”) cannot stand alone as a sentence.'),
];

const COLONS = [
  Q(1, 'Which sentence uses a colon correctly to introduce a list?', 'Bring three things: a pen, a ruler and a calculator.', ['Bring: three things a pen, a ruler and a calculator.', 'Bring three: things, a pen, a ruler and a calculator.', 'Bring three things a pen: a ruler and a calculator.'],
    'A complete sentence comes before the colon, then the list follows.'),
  Q(1, 'What can come after a colon?', 'A list, an explanation or a quotation', ['Only a single question mark', 'Only the name of a person', 'Nothing: a colon ends a paragraph'],
    'A colon announces that something follows which explains or completes the first part.'),
  Q(2, 'Which sentence uses a colon to introduce an explanation?', 'NAME had one reason for leaving: {he} was exhausted.', ['NAME had: one reason for leaving, {he} was exhausted.', 'NAME had one: reason for leaving {he} was exhausted.', 'NAME: had one reason for leaving {he} was exhausted.'],
    'The part after the colon explains the “one reason”.'),
  Q(2, 'Which sentence uses a colon incorrectly?', 'My favourite subjects are: art and music.', ['I have two favourite subjects: art and music.', 'My choice was simple: art or nothing.', 'One word sums up the day: chaos.'],
    'Do not put a colon straight after a verb such as “are”; the words before it must be a complete sentence.'),
  Q(3, 'Which sentence uses a colon to introduce a quotation correctly?', 'Puck sums up the chaos: “Lord, what fools these mortals be!”', ['Puck: sums up the chaos “Lord, what fools these mortals be!”', 'Puck sums: up the chaos “Lord, what fools these mortals be!”', 'Puck sums up the chaos “Lord: what fools these mortals be!”'],
    'A complete sentence introduces the quotation, then the colon.'),
  Q(3, 'Should the gap take a colon or a semicolon?', 'A colon, because the second part explains the first.', ['A semicolon, because the second part is a list.', 'A colon, because the second part is a question.', 'Neither, because the sentence needs a full stop.'],
    'The second part tells us what the “warning” was, so a colon fits.', 'The sign gave one clear warning \\_\\_\\_ the bridge was closed.'),
];

// ---------------------------------------------------------------------------- skills

export const GRAMMAR_SKILLS: SkillDef[] = [
  skill({ id: 'e8-voice', name: 'Active and passive voice', description: 'Tell the active voice from the passive and change one into the other.', outcomes: F1, lessonId: 'e8-6-1', format: 'mc', gen: bank(VOICE, ['Ask: does the subject do the action or receive it?', 'Passive verbs use a form of “be” + past participle.']) }),
  skill({ id: 'e8-voice-choice', name: 'Choosing a voice', description: 'Explain when the passive voice is useful and when it hides who is responsible.', outcomes: F1, lessonId: 'e8-6-1', format: 'mc', gen: bank(VOICE_CHOICE, ['Active is usually clearer.', 'Passive suits unknown or unimportant doers, and can dodge blame.']) }),
  skill({ id: 'e8-misplaced-modifiers', name: 'Misplaced modifiers', description: 'Spot and fix describing words and phrases placed next to the wrong word.', outcomes: F1, lessonId: 'e8-6-2', format: 'mc', gen: bank(MISPLACED, ['A modifier sits next to the word it describes.', 'Watch where “only”, “almost” and “just” go.']) }),
  skill({ id: 'e8-dangling-modifiers', name: 'Dangling modifiers', description: 'Spot and fix opening phrases that have no clear word to describe.', outcomes: F1, lessonId: 'e8-6-2', format: 'mc', gen: bank(DANGLING, ['Ask: who is doing the action in the opening phrase?', 'That person must come right after the comma.']) }),
  skill({ id: 'e8-parallelism', name: 'Parallel structure', description: 'Recognise lists and pairs written in the same grammatical form.', outcomes: F1, lessonId: 'e8-6-3', format: 'mc', gen: bank(PARALLEL, ['Match the form of every item: all -ing, all “to” + verb, or all nouns.']) }),
  skill({ id: 'e8-parallel-fix', name: 'Fixing faulty parallelism', description: 'Revise sentences so that listed items share one form.', outcomes: F1, lessonId: 'e8-6-3', format: 'mc', gen: bank(PARALLEL_FIX, ['Find the item that does not match, and rewrite it in the same form as the others.']) }),
  skill({ id: 'e8-semicolons', name: 'Semicolons', description: 'Use semicolons to join related sentences and to separate complex list items.', outcomes: F2, lessonId: 'e8-6-4', format: 'mc', gen: bank(SEMICOLONS, ['Each side of a semicolon should be a full sentence.', 'Use semicolons in a list whose items contain commas.']) }),
  skill({ id: 'e8-colons', name: 'Colons', description: 'Use colons to introduce lists, explanations and quotations.', outcomes: F2, lessonId: 'e8-6-4', format: 'mc', gen: bank(COLONS, ['A complete sentence comes before a colon.', 'What follows a colon explains or completes it.']) }),
];
