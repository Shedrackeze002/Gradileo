/**
 * Grade 6 English, Unit 6: Grammar and Punctuation (E6-F1, E6-F2). Pronoun case and antecedents,
 * progressive and perfect tenses, simple, compound and complex sentences, conjunctions, and
 * apostrophes and commas.
 */
import { skill } from '../../helpers.ts';
import type { SkillDef } from '../../../types.ts';
import { bank, GAP, Q } from './common.ts';

const F1 = ['E6-F1'];
const F2 = ['E6-F2'];

// ---------------------------------------------------------------------------- 6.1 pronouns

const CASE = [
  Q(1, `Choose the pronoun: “NAME and ${GAP} went to the cinema.”`, 'I', ['me', 'myself', 'mine'],
    'The pronoun is part of the subject (who went), so it must be a subject pronoun: I. Test it alone: “I went”, not “me went”.'),
  Q(1, `Choose the pronoun: “The teacher gave the prize to ${GAP}.”`, 'her', ['she', 'hers', 'herself'],
    'After a preposition such as to, use an object pronoun: her.'),
  Q(1, `Choose the pronoun: “${GAP} are going to the beach on Saturday.”`, 'We', ['Us', 'Our', 'Ours'],
    'The pronoun is the subject, so use the subject pronoun we.'),
  Q(2, `Choose the pronoun: “Grandma made lunch for NAME and ${GAP}.”`, 'me', ['I', 'myself', 'my'],
    'Cover “NAME and”: “Grandma made lunch for me.” After for, use the object pronoun me.'),
  Q(2, `Choose the pronoun: “Between you and ${GAP}, the test was hard.”`, 'me', ['I', 'myself', 'mine'],
    'Between is a preposition, so both pronouns after it are object pronouns: between you and me.'),
  Q(2, 'Which sentence uses pronouns correctly?', '“She and I finished the project.”', ['“Her and me finished the project.”', '“Me and her finished the project.”', '“Her and I finished the project.”'],
    'Both pronouns are subjects, so both must be subject pronouns: she and I.'),
  Q(3, `Choose the pronoun: “The coach chose NAME and ${GAP} to be captains.”`, 'him', ['he', 'his', 'himself'],
    'Him is the object of chose. Cover “NAME and”: “The coach chose him.”'),
  Q(3, `Choose the pronoun: “NAME is taller than ${GAP}.” (meaning: than I am)`, 'I', ['me', 'myself', 'mine'],
    'The full sentence is “taller than I am”, so I is the subject of the hidden verb am. (Many people say “than me” in speech.)'),
  Q(3, 'Which sentence uses a reflexive pronoun correctly?', '“NAME taught {him}self to juggle.”', ['“Myself and NAME went to the shop.”', '“Please give the book to myself.”', '“NAME and myself won the race.”'],
    'A reflexive pronoun (myself, himself) is used when the subject acts on itself. It should not replace I or me.'),
];

const ANTE = [
  Q(1, 'In “The dog wagged its tail”, what is the antecedent of *its*?', 'The dog', ['The tail', 'Wagged', 'None'],
    'An antecedent is the noun a pronoun refers to. Its refers to the dog.'),
  Q(1, `Choose the pronoun: “The students handed in ${GAP} projects.”`, 'their', ['his', 'its', 'her'],
    'Students is plural, so the pronoun must be plural: their.'),
  Q(2, `Choose the pronoun: “Each of the girls brought ${GAP} own lunch.”`, 'her', ['their', 'its', 'them'],
    'Each is singular, and the group is all girls, so use her. (When a group is mixed, many writers use their.)'),
  Q(2, `Choose the pronoun: “The team celebrated ${GAP} victory.”`, 'its', ['their', 'it’s', 'his'],
    'The team acts as one group here, so the singular its is used. It’s means it is.'),
  Q(2, 'Which sentence has an unclear pronoun?', '“NAME told NAME2 that {he} had won.”', ['“NAME told NAME2 that NAME2 had won.”', '“NAME said that {he} had won the race.”', '“NAME told {his} friend the good news.”'],
    'In the first sentence, he could mean NAME or NAME2. The reader cannot tell who won.'),
  Q(3, 'How could you fix the unclear pronoun? “When the cup hit the plate, it broke.”', '“The plate broke when the cup hit it.”', ['“When the cup hit the plate, they broke.”', '“When it hit the plate, it broke apart.”', '“When the cup hit the plate, it smashed.”'],
    'It could mean the cup or the plate. Naming the noun that broke makes the meaning clear.'),
  Q(3, `Choose the pronoun: “Neither of the boys remembered ${GAP} homework.”`, 'his', ['their', 'its', 'our'],
    'Neither is singular, so the pronoun is singular: his.'),
];

// ---------------------------------------------------------------------------- 6.2 verb tenses

const TENSE = [
  Q(1, 'Which tense is the verb in “NAME is reading a book”?', 'Present progressive', ['Past progressive', 'Present perfect', 'Simple past'],
    'Is + the -ing form shows an action happening right now: the present progressive.'),
  Q(1, `Choose the verb: “Right now, the children ${GAP} in the garden.”`, 'are playing', ['played', 'have played', 'will play'],
    'Right now calls for an action in progress: are playing (present progressive).'),
  Q(2, 'Which tense is the verb in “We have visited Paris twice”?', 'Present perfect', ['Past perfect', 'Present progressive', 'Simple future'],
    'Have + past participle (visited) is the present perfect. It links the past to now.'),
  Q(2, `Choose the verb: “When the phone rang, NAME ${GAP} dinner.”`, 'was eating', ['is eating', 'has eaten', 'will eat'],
    'Was eating (past progressive) shows an action in progress when something else happened in the past.'),
  Q(2, `Choose the verb: “By tomorrow, I ${GAP} the whole book.”`, 'will have finished', ['have finished', 'had finished', 'am finishing'],
    'By tomorrow points to an action completed before a future time: the future perfect, will have finished.'),
  Q(3, `Choose the verb: “By the time we arrived, the film ${GAP}.”`, 'had started', ['has started', 'starts', 'will start'],
    'The film started before another past event (we arrived). The earlier past action uses the past perfect: had started.'),
  Q(3, 'Which sentence uses the present perfect correctly?', '“I have lived here since 2020.”', ['“I have lived here in 2020.”', '“I am living here since 2020.”', '“I live here since 2020.”'],
    'Since links a past starting point to now, so the present perfect fits. In 2020 names a finished time, which needs the simple past.'),
];

const SHIFT = [
  Q(1, 'Which sentence keeps the same tense all the way through?', '“NAME opened the door and walked in.”', ['“NAME opens the door and walked in.”', '“NAME opened the door and walks in.”', '“NAME will open the door and walked in.”'],
    'Opened and walked are both past tense. The others shift tense in the middle.'),
  Q(1, `Choose the verb that keeps the tense steady: “Yesterday we went to the zoo and ${GAP} the lions.”`, 'saw', ['see', 'will see', 'are seeing'],
    'Yesterday and went are past, so the second verb should be past too: saw.'),
  Q(2, 'Which verb shifts tense in error? “The wind howled, the rain fell, and the trees bend.”', 'bend', ['howled', 'fell', 'None'],
    'Howled and fell are past tense, so bend should be bent.'),
  Q(2, 'Which is the best correction? “She runs to the bus stop, but the bus left.”', '“She ran to the bus stop, but the bus had left.”', ['“She runs to the bus stop, but the bus leaving.”', '“She running to the bus stop, but the bus left.”', '“She ran to the bus stop, but the bus leaves.”'],
    'Telling the story in the past, the bus left before she arrived, so had left (past perfect) shows that order.'),
  Q(3, 'When is a change of tense correct?', 'When the time of the actions really changes', ['Whenever a sentence has more than one verb', 'Never: one sentence must keep one tense', 'Whenever the writer wants some variety'],
    '“I lived in Toronto, but now I live in Calgary” changes tense correctly because the times are different.'),
  Q(3, 'Which sentence changes tense correctly?', '“NAME was nervous yesterday, but today {he} feels fine.”', ['“NAME was nervous, and then later on {he} feels so confident.”', '“NAME is nervous yesterday, but today {he} felt confident.”', '“NAME walks in and was very nervous before the big test.”'],
    'Yesterday and today mark real changes in time, so was and feels are both right.'),
];

// ---------------------------------------------------------------------------- 6.3 sentence kinds and conjunctions

const KINDS = ['Simple', 'Compound', 'Complex'];
const kind = (d: 1 | 2 | 3, s: string, k: number, why: string) => Q(d, `What kind of sentence is this?\n\n> ${s}`, KINDS[k], KINDS.filter((_, i) => i !== k), why);

const SENTENCES = [
  kind(1, 'The dog barked at the mail carrier.', 0, 'One subject and one verb (dog barked) make one independent clause: a simple sentence.'),
  kind(1, 'The dog barked, and the cat ran away.', 1, 'Two independent clauses (the dog barked; the cat ran away) are joined by a comma and and: a compound sentence.'),
  kind(2, 'Because it was raining, we stayed inside.', 2, '“Because it was raining” cannot stand alone; it is a dependent clause joined to an independent one. That makes a complex sentence.'),
  kind(2, 'NAME and NAME2 laughed and clapped.', 0, 'Two subjects and two verbs, but only one clause: still a simple sentence.'),
  kind(2, 'I wanted to swim, but the pool was closed.', 1, 'Two independent clauses joined by but: compound.'),
  kind(3, 'When the bell rang, the students packed up their books.', 2, '“When the bell rang” is a dependent clause, so the sentence is complex.'),
  kind(3, 'We could take the bus, or we could walk.', 1, 'Two independent clauses joined by or: compound.'),
  kind(3, 'After lunch, we played football in the park.', 0, '“After lunch” is a phrase, not a clause (it has no verb). The sentence has one clause, so it is simple.'),
];

const CONJ = [
  Q(1, `Choose the conjunction: “I was hungry, ${GAP} I made a sandwich.”`, 'so', ['but', 'or', 'nor'],
    'So shows a result: being hungry led to making a sandwich.'),
  Q(1, `Choose the conjunction: “NAME likes maths, ${GAP} {he} does not like science.”`, 'but', ['so', 'for', 'and'],
    'But shows a contrast between liking one subject and not the other.'),
  Q(2, 'Which of these is a coordinating conjunction (one of FANBOYS)?', 'yet', ['because', 'although', 'when'],
    'FANBOYS: for, and, nor, but, or, yet, so. Because, although and when begin dependent clauses.'),
  Q(2, `Choose the conjunction: “You can have juice, ${GAP} you can have milk.”`, 'or', ['so', 'yet', 'for'],
    'Or offers a choice between two things.'),
  Q(2, 'Which is the correct way to join these sentences? “It was late. We kept playing.”', '“It was late, yet we kept playing.”', ['“It was late, we kept playing.”', '“It was late yet, we kept playing.”', '“It was late so we kept, playing.”'],
    'Join two independent clauses with a comma and a conjunction. A comma alone makes a comma splice.'),
  Q(3, `Choose the conjunction: “NAME did not call, ${GAP} did {he} send a text.”`, 'nor', ['or', 'but', 'so'],
    'Nor joins two negative ideas: did not call, nor did {he} send a text.'),
  Q(3, 'What is wrong with “The film was long, I enjoyed it”?', 'It is a comma splice: it needs a conjunction.', ['It is a fragment: it has no main verb.', 'It uses the wrong tense for the verb.', 'Nothing: it is a correct compound sentence.'],
    'Two independent clauses joined by only a comma make a comma splice. Fix it: “The film was long, but I enjoyed it.”'),
];

// ---------------------------------------------------------------------------- 6.4 apostrophes and commas

const APOS = [
  Q(1, 'Which is the correct contraction of “do not”?', 'don’t', ['do’nt', 'dont’', 'd’ont'],
    'The apostrophe goes where the letter o of not is left out: don’t.'),
  Q(1, `Choose the correct word: “The ${GAP} bone was buried in the garden.” (one dog)`, 'dog’s', ['dogs', 'dogs’', 'dog’'],
    'For one owner, add ’s: the dog’s bone.'),
  Q(2, `Choose the correct word: “The ${GAP} coats were hanging on the hooks.” (several girls)`, 'girls’', ['girl’s', 'girls', 'girls’s'],
    'For a plural ending in s, add only an apostrophe: the girls’ coats.'),
  Q(2, `Choose the correct word: “The ${GAP} toys were all over the floor.” (several children)`, 'children’s', ['childrens’', 'childrens', 'children'],
    'Children is a plural that does not end in s, so add ’s: children’s.'),
  Q(2, `Choose the correct word: “${GAP} going to rain later.”`, 'It’s', ['Its', 'Its’', 'It is’'],
    'It’s means it is. Its (no apostrophe) shows belonging: the dog wagged its tail.'),
  Q(3, 'Which sentence uses apostrophes correctly?', '“The cat licked its paws in the sun.”', ['“The cat licked it’s paws in the sun.”', '“The cats’s paws were licked in the sun.”', '“The cat lick’s its paws in the sun.”'],
    'Its (belonging) has no apostrophe. Verbs such as licks never take an apostrophe.'),
  Q(3, 'Which sentence uses an apostrophe wrongly?', '“Fresh apple’s for sale!”', ['“The apple’s skin was red.”', '“It’s an apple, not a pear.”', '“The apples’ skins were red.”'],
    'Apples is just a plural here, so it needs no apostrophe. The other apostrophes show belonging or a contraction.'),
];

const COMMAS = [
  Q(1, 'Which sentence is punctuated correctly?', '“I like apples, but my sister likes pears.”', ['“I like apples but, my sister likes pears.”', '“I like, apples but my sister likes pears.”', '“I like apples but my sister, likes pears.”'],
    'In a compound sentence, put a comma before the conjunction that joins the two clauses.'),
  Q(1, 'Which sentence is punctuated correctly?', '“After the game, we went for pizza.”', ['“After the game we, went for pizza.”', '“After, the game we went for pizza.”', '“After the game we went, for pizza.”'],
    'A comma follows an introductory phrase such as “After the game”.'),
  Q(2, 'Which sentence is punctuated correctly?', '“My cousin, who lives in Halifax, is visiting.”', ['“My cousin who lives, in Halifax is visiting.”', '“My cousin, who lives in Halifax is visiting.”', '“My cousin who, lives in Halifax, is visiting.”'],
    'The clause “who lives in Halifax” is extra information, so it needs a comma on both sides.'),
  Q(2, 'Which sentence is punctuated correctly?', '“However, the bus was late.”', ['“However the bus, was late.”', '“However the bus was, late.”', '“However the, bus was late.”'],
    'A comma follows an introductory word such as however, yes or well.'),
  Q(3, 'Which sentence needs no extra comma?', '“The dog barked and wagged its tail.”', ['“The dog barked and the cat hissed.”', '“When the dog barked the cat hissed.”', '“Sam the dog barked at the postman.”'],
    'The first sentence has one subject and two verbs, so no comma is needed. The others need commas (before and, after the introductory clause, and around “the dog”).'),
  Q(3, 'Which sentence is punctuated correctly?', '“NAME, our team captain, scored twice.”', ['“NAME our team captain, scored twice.”', '“NAME, our team captain scored twice.”', '“NAME our team, captain scored twice.”'],
    'A phrase that renames a noun (our team captain) is set off with commas on both sides.'),
];

export const GRAMMAR_SKILLS: SkillDef[] = [
  skill({ id: 'e6-pronoun-case', name: 'Subject and object pronouns', description: 'Choose subject, object and reflexive pronouns, including in pairs.', outcomes: F1, lessonId: 'e6-6-1', format: 'mc', gen: bank(CASE, ['Subjects: I, he, she, we, they. Objects: me, him, her, us, them.', 'Cover the other name in a pair and read the sentence.']) }),
  skill({ id: 'e6-antecedents', name: 'Pronouns and antecedents', description: 'Make a pronoun agree with its antecedent and keep its meaning clear.', outcomes: F1, lessonId: 'e6-6-1', format: 'mc', gen: bank(ANTE, ['Find the noun the pronoun stands for.', 'Singular nouns take singular pronouns.']) }),
  skill({ id: 'e6-progressive-perfect', name: 'Progressive and perfect tenses', description: 'Use the progressive and perfect tenses.', outcomes: F1, lessonId: 'e6-6-2', format: 'mc', gen: bank(TENSE, ['Progressive: be + -ing, an action in progress.', 'Perfect: have, has or had + past participle, an action completed before a time.']) }),
  skill({ id: 'e6-tense-shift', name: 'Consistent tense', description: 'Keep verb tenses consistent, and change them only when the time changes.', outcomes: F1, lessonId: 'e6-6-2', format: 'mc', gen: bank(SHIFT, ['Check that each verb fits the time of the action.']) }),
  skill({ id: 'e6-sentence-kinds', name: 'Simple, compound and complex sentences', description: 'Tell simple, compound and complex sentences apart.', outcomes: F1, lessonId: 'e6-6-3', format: 'mc', gen: bank(SENTENCES, ['Count the clauses (subject + verb).', 'A clause starting with because, when or although cannot stand alone.']) }),
  skill({ id: 'e6-conjunctions', name: 'Coordinating conjunctions', description: 'Join ideas with for, and, nor, but, or, yet and so, and avoid comma splices.', outcomes: F1, lessonId: 'e6-6-3', format: 'mc', gen: bank(CONJ, ['FANBOYS: for, and, nor, but, or, yet, so.', 'And adds, but contrasts, so shows a result, or gives a choice.']) }),
  skill({ id: 'e6-apostrophes', name: 'Apostrophes', description: 'Use apostrophes in contractions and possessives, and avoid them in plurals.', outcomes: F2, lessonId: 'e6-6-4', format: 'mc', gen: bank(APOS, ['One owner: ’s. A plural ending in s: s’.', 'It’s = it is; its = belonging to it.']) }),
  skill({ id: 'e6-commas', name: 'Commas in sentences', description: 'Use commas in compound sentences, after introductory parts, and around extra information.', outcomes: F2, lessonId: 'e6-6-4', format: 'mc', gen: bank(COMMAS, ['Comma before and, but or so joining two sentences.', 'Extra information needs commas on both sides.']) }),
];
