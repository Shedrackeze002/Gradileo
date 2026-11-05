/**
 * Grade 7 English, Unit 6: Grammar and Punctuation (E7-F1, E7-F2). Phrases and clauses, complex
 * sentences, fragments and run-ons, agreement, and punctuating clauses and dialogue. The sentences
 * are written for Gradileo.
 */
import { skill } from '../../helpers.ts';
import type { SkillDef } from '../../../types.ts';
import { bank, Q } from './common.ts';

const F1 = ['E7-F1'];
const F2 = ['E7-F2'];

// ---------------------------------------------------------------------------- 6.1 phrases and clauses

const PHRASE = 'A phrase';
const CLAUSE = 'A clause';
const pc = (d: 1 | 2 | 3, group: string, isClause: boolean, why: string) =>
  Q(d, `Is “${group}” a phrase or a clause?`, isClause ? CLAUSE : PHRASE, [isClause ? PHRASE : CLAUSE, 'A complete paragraph', 'A single noun'], why);

const PHRASE_CLAUSE = [
  Q(1, 'What is the difference between a phrase and a clause?', 'A clause has a subject and a verb; a phrase does not.', ['A phrase has a subject and a verb; a clause does not.', 'A clause is always longer than ten words.', 'A phrase always ends with a full stop.'],
    'A clause contains a subject and a verb working together. A phrase is a group of words without that pair.'),
  pc(1, 'under the old bridge', false, 'There is no subject doing a verb, so it is a phrase (a prepositional phrase).'),
  pc(1, 'the dog barked', true, 'The dog (subject) barked (verb): a clause.'),
  pc(2, 'because the bus was late', true, 'The bus (subject) was (verb). It is a clause, even though it cannot stand alone.'),
  pc(2, 'after the long and tiring match', false, 'Match is a noun, not a verb, and no one is doing anything. It is a phrase.'),
  pc(3, 'running through the forest at night', false, 'Running looks like a verb, but there is no subject doing it. Without a subject and verb pair, it is a phrase.'),
  pc(3, 'when NAME finally arrived', true, 'NAME (subject) arrived (verb): a clause.'),
];

const IND = 'Independent';
const DEP = 'Dependent';
const clause = (d: 1 | 2 | 3, group: string, isInd: boolean, why: string) =>
  Q(d, `Is “${group}” an independent or a dependent clause?`, isInd ? IND : DEP, [isInd ? DEP : IND, 'It is a phrase, not a clause', 'It is a question, not a clause'], why);

const CLAUSE_KINDS = [
  Q(1, 'What is an independent clause?', 'A clause that can stand alone as a sentence', ['A clause that must be joined to another clause', 'A group of words with no subject or verb', 'A sentence that has no punctuation at all'],
    'An independent clause expresses a complete thought: “The bell rang.”'),
  clause(1, 'the bell rang', true, 'It makes complete sense on its own: “The bell rang.”'),
  clause(1, 'although the bell rang', false, 'Although leaves us waiting for more. It cannot stand alone.'),
  clause(2, 'if you finish your homework', false, 'If makes the clause depend on another one: “If you finish your homework, (what?)”'),
  clause(2, 'NAME scored the winning goal', true, 'This is a complete thought with a subject and verb.'),
  Q(3, 'Which word turns “we went inside” into a dependent clause?', 'Because', ['And', 'Quickly', 'Then'],
    '“Because we went inside” cannot stand alone. And joins clauses equally, and quickly and then are adverbs.'),
  Q(3, 'In “When the rain stopped, the children ran outside”, which part is the independent clause?', 'the children ran outside', ['When the rain stopped', 'When the rain', 'the rain stopped, the children'],
    '“The children ran outside” can stand alone. “When the rain stopped” depends on it.'),
];

// ---------------------------------------------------------------------------- 6.2 complex sentences

const SUBORD = [
  Q(1, 'Which word is a subordinating conjunction?', 'Because', ['And', 'But', 'Or'],
    'Because, although, when, if, since and while begin dependent clauses. And, but and or are coordinating conjunctions.'),
  Q(1, 'Choose the best word: “We stayed indoors ___ it was raining.”', 'because', ['although', 'unless', 'so'],
    'Staying indoors is caused by the rain, so because fits.'),
  Q(2, 'Choose the best word: “___ she was tired, she finished the race.”', 'Although', ['Because', 'Since', 'Unless'],
    'Finishing despite being tired is a contrast, which although shows.'),
  Q(2, 'Choose the best word: “You will miss the bus ___ you hurry.”', 'unless', ['because', 'although', 'since'],
    'Unless means if not: you will miss it if you do not hurry.'),
  Q(3, 'Which sentence uses a subordinating conjunction to show time?', 'While the cake baked, we washed the dishes.', ['The cake baked, and we washed the dishes.', 'We washed the dishes because the cake baked.', 'The cake baked, so we washed the dishes.'],
    'While shows two things happening at the same time. Because and so show cause, and and simply joins.'),
  Q(3, 'Which revision joins the ideas best? “The museum was closed. We visited the park.”', 'Since the museum was closed, we visited the park.', ['The museum was closed, we visited the park.', 'The museum was closed and, we visited the park.', 'The museum, was closed since we visited the park.'],
    'Since shows why they went to the park, and the comma after the opening clause is correct. The second is a comma splice.'),
];

const STRUCTS = ['Simple', 'Compound', 'Complex', 'Compound-complex'];
const struct = (d: 1 | 2 | 3, s: string, k: number, why: string) => Q(d, 'What kind of sentence is this?', STRUCTS[k], STRUCTS.filter((_, i) => i !== k), why, s);

const STRUCTURE = [
  struct(1, 'The cat slept on the warm windowsill.', 0, 'One independent clause and no other: a simple sentence.'),
  struct(1, 'The cat slept, and the dog played in the garden.', 1, 'Two independent clauses joined by and: a compound sentence.'),
  struct(2, 'The cat slept because the sun was warm.', 2, 'One independent clause and one dependent clause (because the sun was warm): a complex sentence.'),
  struct(2, 'Although it was late, NAME kept reading.', 2, 'A dependent clause (Although it was late) and an independent clause: complex.'),
  struct(3, 'When the storm ended, the birds sang, and the children ran outside.', 3, 'Two independent clauses (the birds sang; the children ran outside) and a dependent clause (When the storm ended): compound-complex.'),
  struct(3, 'NAME and NAME2 laughed and danced all night.', 0, 'There are two subjects and two verbs, but they form one clause. It is still a simple sentence.'),
  Q(3, 'Which sentence is compound-complex?', 'If it rains, we will stay in, but we will still have fun.', ['If it rains, we will stay in and play board games.', 'It is raining hard, so we will stay inside today.', 'We will stay inside today because it is raining.'],
    'It has a dependent clause (If it rains) and two independent clauses joined by but.'),
];

// ---------------------------------------------------------------------------- 6.3 fragments and run-ons

const FRAG = [
  Q(1, 'What is a sentence fragment?', 'A group of words that is not a full sentence', ['Two sentences joined with only a comma', 'A very long sentence with many clauses', 'A sentence that ends with a question mark'],
    'A fragment is missing a subject, a verb or a complete thought.'),
  Q(1, 'Which is a fragment?', 'Running down the hill.', ['NAME ran down the hill.', 'The dog runs every day.', 'We ran home together.'],
    '“Running down the hill” has no subject and no complete verb. Who was running?'),
  Q(2, 'Which is a fragment?', 'Because the shop was closed.', ['The shop was closed.', 'The shop closed early today.', 'We left because the shop was closed.'],
    'A dependent clause on its own is a fragment: because what? It needs a main clause.'),
  Q(2, 'Which revision fixes the fragment? “After the match ended.”', 'After the match ended, we went for pizza.', ['After the match. Ended. We went for pizza.', 'After the match ended and after pizza.', 'After, the match ended, for pizza.'],
    'Adding an independent clause (we went for pizza) completes the thought.'),
  Q(3, 'Which is NOT a fragment?', 'Stop!', ['The girl with the red umbrella.', 'Which was the best part of the trip.', 'Hoping for a sunny day tomorrow.'],
    '“Stop!” is a command. The subject “you” is understood, so it is a complete sentence. The others lack a main clause.'),
  Q(3, 'Writers sometimes use fragments on purpose in stories. Why?', 'For effect, such as tension or emphasis', ['Because fragments are always correct in essays', 'Because they do not know any grammar', 'To make a paragraph look longer'],
    '“Footsteps. Closer. Closer.” Fragments can build drama in fiction, but they should be avoided in formal writing.'),
];

const RUNON = [
  Q(1, 'What is a comma splice?', 'Two independent clauses joined by only a comma', ['A dependent clause with no main clause', 'A comma placed before the word and in a list', 'A list of three items with commas'],
    '“It was cold, we stayed in” is a comma splice. A comma alone cannot join two sentences.'),
  Q(1, 'Which is a run-on sentence?', 'I love pizza I eat it every Friday.', ['I love pizza, and I eat it every Friday.', 'I love pizza. I eat it every Friday.', 'Because I love pizza, I eat it every Friday.'],
    'Two complete sentences run together with nothing between them.'),
  Q(2, 'Which is a correct way to fix “It was late, we went home”?', 'It was late, so we went home.', ['It was late, we, went home.', 'It was late we went home.', 'It was, late we went home.'],
    'Adding a coordinating conjunction (so) after the comma fixes the splice. A full stop or a semicolon would also work.'),
  Q(2, 'Which sentence is correct?', 'The film ended; the lights came on.', ['The film ended, the lights came on.', 'The film ended the lights came on.', 'The film, ended the lights came on.'],
    'A semicolon can join two closely linked independent clauses.'),
  Q(3, 'Which is NOT a correct fix for “NAME was tired, {he} kept working”?', 'NAME was tired, {he}, kept working.', ['NAME was tired, but {he} kept working.', 'NAME was tired. {He} kept working.', 'Although NAME was tired, {he} kept working.'],
    'Adding another comma does not fix the splice. A conjunction, a full stop or a subordinating word does.'),
  Q(3, 'Why are run-on sentences a problem?', 'It is hard to tell where one idea ends and the next begins.', ['They are always too short to make any sense at all.', 'They use far too many full stops between all the ideas.', 'They are only ever a problem when written in pencil.'],
    'Without clear boundaries, readers lose track of the ideas.'),
];

// ---------------------------------------------------------------------------- 6.4 agreement

const SV = [
  Q(1, 'Choose the correct verb: “The dogs ___ in the park.”', 'play', ['plays', 'playing', 'is playing'],
    'Dogs is plural, so it takes the plural verb play.'),
  Q(1, 'Choose the correct verb: “My sister ___ the piano.”', 'plays', ['play', 'are playing', 'have played'],
    'Sister is singular, so the verb is plays.'),
  Q(2, 'Choose the correct verb: “The box of chocolates ___ on the table.”', 'is', ['are', 'were', 'have been'],
    'The subject is box (singular). “Of chocolates” is a phrase in between and does not change the verb.'),
  Q(2, 'Choose the correct verb: “Each of the players ___ a medal.”', 'gets', ['get', 'are getting', 'have got'],
    'Each is singular, so it takes gets, even though players is plural.'),
  Q(3, 'Choose the correct verb: “Neither the teacher nor the students ___ ready.”', 'were', ['was', 'is', 'has been'],
    'With neither… nor, the verb agrees with the nearer subject: students (plural), so were.'),
  Q(3, 'Choose the correct verb: “The team ___ celebrating its win tonight.”', 'is', ['are', 'were', 'have been'],
    'In American usage, a collective noun acting as one unit takes a singular verb, and “its” confirms the team is treated as one. (British English often allows “are”, but then it would be “their win”.)'),
];

const PRON = [
  Q(1, 'Choose the correct pronoun: “The girls packed ___ bags.”', 'their', ['her', 'its', 'his'],
    'Girls is plural, so the plural possessive their agrees with it.'),
  Q(1, 'Choose the correct pronoun: “The tree lost ___ leaves.”', 'its', ['it’s', 'their', 'her'],
    'Tree is singular and not a person, so its. (It’s means it is.)'),
  Q(2, 'Choose the correct pronoun: “Everyone should bring ___ own lunch.”', 'their', ['our', 'its', 'your'],
    'Everyone is grammatically singular, but singular their is widely accepted for a person whose gender is not known. “His or her” is also correct.'),
  Q(2, 'What is wrong with “When Tom met Jack, he smiled”?', 'It is unclear who smiled.', ['Smiled should be smiles.', 'Met should be meeted.', 'Nothing is wrong with it.'],
    'Tom and Jack could both be he, so the pronoun is ambiguous. Naming the person who smiled fixes it.'),
  Q(3, 'Choose the correct pronoun: “Neither of the boys remembered ___ coat.”', 'his', ['their', 'its', 'our'],
    'Neither is singular, and the group is boys, so his. (In casual speech, their is common.)'),
  Q(3, 'Which sentence has a pronoun that agrees with its antecedent?', 'The committee announced its decision.', ['The students left his books on the bus.', 'The cat licked their paw very slowly.', 'My parents have lost her car keys again.'],
    'Committee, as one group, takes its. In the others the pronouns do not match their antecedents in number.'),
];

// ---------------------------------------------------------------------------- 6.5 punctuating clauses and dialogue

const COMMAS = [
  Q(1, 'Which sentence uses a comma correctly?', 'When the bell rang, we ran outside.', ['When the bell, rang we ran outside.', 'When, the bell rang we ran outside.', 'When the bell rang we, ran outside.'],
    'A dependent clause at the start of a sentence is followed by a comma.'),
  Q(1, 'Where does the comma go? “It was cold so we lit the fire.”', 'After cold', ['After it', 'After so', 'After lit'],
    '“It was cold, so we lit the fire.” In a compound sentence, the comma goes before the conjunction.'),
  Q(2, 'Which sentence needs no comma?', 'We lit the fire because it was cold.', ['Because it was cold we lit the fire.', 'It was cold so we lit the fire.', 'After dinner we lit the fire.'],
    'When the dependent clause comes after the main clause, no comma is usually needed.'),
  Q(2, 'Which sentence is punctuated correctly?', 'My uncle, who lives in Lagos, is visiting.', ['My uncle who lives in Lagos, is visiting.', 'My uncle, who lives in Lagos is visiting.', 'My, uncle who lives in Lagos is visiting.'],
    'Extra information in the middle of a sentence needs a comma on both sides.'),
  Q(3, 'Which sentence uses commas correctly?', 'If you are free, come to the party, and bring a friend.', ['If you are free come to the party, and, bring a friend.', 'If you are, free come to the party and bring a friend.', 'If, you are free come to the party and bring a friend.'],
    'A comma follows the opening clause, and another comes before and in the compound sentence.'),
];

const DIALOGUE = [
  Q(1, 'Which sentence punctuates dialogue correctly?', '“Wait for me,” called NAME.', ['“Wait for me” called NAME.', '“Wait for me”, called NAME.', 'Wait for me, “called NAME.”'],
    'The comma goes inside the closing quotation mark, before the dialogue tag.'),
  Q(1, 'When does a writer start a new paragraph in dialogue?', 'Each time a new person speaks', ['After every third line of speech', 'Only when the scene changes', 'Never: dialogue goes in one paragraph'],
    'A new paragraph for each new speaker makes it clear who is talking.'),
  Q(2, 'Which is correct?', 'NAME asked, “Where are you going?”', ['NAME asked, “Where are you going”?', 'NAME asked “Where are you going?”.', 'NAME asked, “where are you going?”'],
    'A comma after the tag, a capital to begin the speech, and the question mark inside the quotation marks.'),
  Q(2, 'Which is correct?', '“I can’t,” said NAME, “because I have to work.”', ['“I can’t,” said NAME, “Because I have to work.”', '“I can’t” said NAME “because I have to work.”', '“I can’t,” said NAME. “because I have to work.”'],
    'When one sentence of speech is split by a tag, use commas, and do not capitalize the second part.'),
  Q(3, 'Which is correct?', '“Run!” shouted NAME. “The bridge is falling!”', ['“Run”! shouted NAME. “The bridge is falling”!', '“Run!” Shouted NAME. “The bridge is falling!”', '“Run!,” shouted NAME, “the bridge is falling!”'],
    'Exclamation marks go inside the quotation marks, the tag is not capitalized, and a full stop after the tag starts a new sentence of speech.'),
  Q(3, 'Which sentence is indirect (reported) speech, needing no quotation marks?', 'NAME said that {he} was hungry.', ['NAME said, “I am hungry.”', '“I am hungry,” NAME said.', '“Hungry,” NAME said, “I am.”'],
    'Reported speech tells what someone said without quoting their exact words, often with that.'),
];

// ---------------------------------------------------------------------------- skills

export const GRAMMAR_SKILLS: SkillDef[] = [
  skill({ id: 'e7-phrase-clause', name: 'Phrases and clauses', description: 'Tell a phrase from a clause.', outcomes: F1, lessonId: 'e7-6-1', format: 'mc', gen: bank(PHRASE_CLAUSE, ['A clause has a subject and a verb.', 'Ask: who or what is doing something here?']) }),
  skill({ id: 'e7-clause-kinds', name: 'Independent and dependent clauses', description: 'Tell independent from dependent clauses.', outcomes: F1, lessonId: 'e7-6-1', format: 'mc', gen: bank(CLAUSE_KINDS, ['An independent clause can stand alone.', 'Words like because, although, when and if start dependent clauses.']) }),
  skill({ id: 'e7-subordinators', name: 'Subordinating conjunctions', description: 'Join ideas with subordinating conjunctions that show cause, contrast, condition and time.', outcomes: F1, lessonId: 'e7-6-2', format: 'mc', gen: bank(SUBORD, ['Because and since show cause; although shows contrast.', 'If and unless show condition; when and while show time.']) }),
  skill({ id: 'e7-sentence-structure', name: 'Sentence structures', description: 'Tell simple, compound, complex and compound-complex sentences apart.', outcomes: F1, lessonId: 'e7-6-2', format: 'mc', gen: bank(STRUCTURE, ['Count the independent and dependent clauses.', 'Compound-complex: two independent clauses and at least one dependent clause.']) }),
  skill({ id: 'e7-fragments', name: 'Sentence fragments', description: 'Find and fix sentence fragments.', outcomes: F1, lessonId: 'e7-6-3', format: 'mc', gen: bank(FRAG, ['A sentence needs a subject, a verb and a complete thought.', 'A dependent clause alone is a fragment.']) }),
  skill({ id: 'e7-run-ons', name: 'Run-ons and comma splices', description: 'Find and fix run-on sentences and comma splices.', outcomes: F1, lessonId: 'e7-6-3', format: 'mc', gen: bank(RUNON, ['A comma alone cannot join two sentences.', 'Fix with a full stop, a semicolon, or a comma and a conjunction.']) }),
  skill({ id: 'e7-subject-verb', name: 'Subject–verb agreement', description: 'Make a verb agree with its subject, even with phrases in between.', outcomes: F2, lessonId: 'e7-6-4', format: 'mc', gen: bank(SV, ['Find the real subject; ignore phrases like “of the…”.', 'Each, every and either are singular.']) }),
  skill({ id: 'e7-pronoun-agreement', name: 'Pronoun–antecedent agreement', description: 'Make a pronoun agree with its antecedent and avoid unclear pronouns.', outcomes: F2, lessonId: 'e7-6-4', format: 'mc', gen: bank(PRON, ['Find the noun the pronoun replaces.', 'Match it in number: singular or plural.']) }),
  skill({ id: 'e7-clause-commas', name: 'Commas with clauses', description: 'Use commas after introductory clauses, in compound sentences and around extra information.', outcomes: F2, lessonId: 'e7-6-5', format: 'mc', gen: bank(COMMAS, ['Put a comma after an opening dependent clause.', 'Put a comma before and, but or so joining two sentences.']) }),
  skill({ id: 'e7-dialogue-punctuation', name: 'Punctuating dialogue', description: 'Punctuate direct speech correctly and tell it from reported speech.', outcomes: F2, lessonId: 'e7-6-5', format: 'mc', gen: bank(DIALOGUE, ['Punctuation at the end of speech goes inside the quotation marks.', 'Start a new paragraph for each new speaker.']) }),
];
