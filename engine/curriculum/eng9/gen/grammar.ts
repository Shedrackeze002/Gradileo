/**
 * Grade 9 English, Unit 6: Grammar and punctuation (E9-F1, E9-F2). Verbals, sentence variety,
 * agreement in hard cases, and punctuation for effect. The sentences are invented for Gradileo.
 */
import { skill } from '../../helpers.ts';
import type { SkillDef } from '../../../types.ts';
import { bank, Q } from './common.ts';

const F1 = ['E9-F1'];
const F2 = ['E9-F2'];

// ---------------------------------------------------------------------------- 6.1 verbals

const VERBALS = ['A gerund', 'A participle', 'An infinitive'];
const verbal = (d: 1 | 2 | 3, sentence: string, word: string, k: number, why: string) =>
  Q(d, `In this sentence, what is “${word}”?`, VERBALS[k], [...VERBALS.filter((_, i) => i !== k), 'The main verb'], why, sentence);

const VERBAL = [
  verbal(1, 'Swimming is my favourite sport.', 'Swimming', 0, 'An -ing verb form used as a noun (the subject): a gerund.'),
  verbal(1, 'NAME wants to travel the world.', 'to travel', 2, '“To” + a verb: an infinitive.'),
  verbal(2, 'The crying baby finally fell asleep.', 'crying', 1, 'An -ing form used as an adjective to describe “baby”: a participle.'),
  verbal(2, 'The broken window let in the cold.', 'broken', 1, 'A past participle used as an adjective to describe “window”.'),
  verbal(3, 'NAME is good at solving puzzles.', 'solving', 0, 'After the preposition “at”, the -ing form acts as a noun: a gerund.'),
  Q(3, 'What is a verbal?', 'A verb form used as a noun, adjective or adverb', ['A word that is only ever spoken aloud', 'The main verb of a sentence, in the past tense', 'A word that joins two clauses together'],
    'Gerunds, participles and infinitives look like verbs but do another job.'),
];

const VERBAL_PHRASES = [
  Q(1, 'Which sentence uses a participial phrase to combine “NAME opened the letter. {He} was trembling.”?', 'Trembling, NAME opened the letter.', ['NAME opened, the letter trembling.', 'The letter trembling NAME opened.', 'NAME trembling opened. The letter.'],
    'The participle “Trembling” describes NAME, who comes straight after the comma.'),
  Q(2, 'Which sentence combines “The team won the cup. The team celebrated all night.” most smoothly?', 'Having won the cup, the team celebrated all night.', ['The team won the cup, the team celebrated all night.', 'Winning the cup, all night celebrated the team.', 'The team having won the cup and celebrated night.'],
    'A perfect participle phrase (“Having won”) shows one action came first.'),
  Q(2, 'What job does the infinitive phrase do in “To win the final, we must defend well”?', 'It explains the purpose of the main clause.', ['It is the subject that performs the action.', 'It describes the noun that comes after it.', 'It is the main verb of the whole sentence.'],
    'An infinitive phrase often answers “why?”.'),
  Q(3, 'Which sentence is a dangling participle?', 'Running for the bus, my bag fell open.', ['Running for the bus, I dropped my bag.', 'I dropped my bag while running for the bus.', 'My bag fell open as I ran for the bus.'],
    'The bag was not running. The participle must describe the word after the comma.'),
  Q(3, 'Which sentence uses a gerund phrase as its subject?', 'Reading before bed helps NAME sleep.', ['NAME reads before bed to help {him} sleep.', 'NAME, reading before bed, falls asleep.', 'Before bed, NAME likes to read a book.'],
    '“Reading before bed” is the subject that “helps”.'),
];

// ---------------------------------------------------------------------------- 6.2 sentence variety

const TYPES = ['Simple', 'Compound', 'Complex', 'Compound-complex'];
const type = (d: 1 | 2 | 3, sentence: string, k: number, why: string) =>
  Q(d, 'What type of sentence is this?', TYPES[k], TYPES.filter((_, i) => i !== k), why, sentence);

const SENTENCE_TYPES = [
  type(1, 'The dog barked.', 0, 'One main clause and no other clauses: simple.'),
  type(1, 'The dog barked, and the cat ran away.', 1, 'Two main clauses joined by “and”: compound.'),
  type(2, 'When the doorbell rang, the dog barked.', 2, 'A main clause (“the dog barked”) and a subordinate clause (“When the doorbell rang”): complex.'),
  type(2, 'Although it was late, NAME kept reading.', 2, 'One main clause and one subordinate clause beginning “Although”: complex.'),
  type(3, 'When the storm hit, the lights went out, and we lit candles.', 3, 'Two main clauses and at least one subordinate clause: compound-complex.'),
  Q(3, 'What is a subordinate clause?', 'A clause that cannot stand alone as a sentence', ['A clause that is always at the end of a sentence', 'A sentence that has no verb in it anywhere', 'The shortest sentence in a paragraph'],
    'Subordinate clauses begin with words such as because, although, when and if.'),
];

const VARIETY = [
  Q(1, 'Why should writers vary the length of their sentences?', 'Variety keeps the rhythm interesting and helps key points stand out.', ['Every sentence in good writing must be exactly the same length.', 'Short sentences are always wrong in formal pieces of writing.', 'Long sentences are never allowed in a piece of writing for school.'],
    'All long or all short sentences become monotonous.'),
  Q(2, 'Which revision gives this passage the most variety?', 'I woke at six. Rain was drumming on the roof, so I pulled the covers up and lay listening.', ['I woke at six. It was raining. The rain was on the roof. I pulled the covers up. I lay listening.', 'I woke at six and it was raining and the rain was on the roof and I pulled the covers up.', 'At six I woke. At six it was raining. At six I pulled the covers up and lay there.'],
    'It mixes a short sentence with a longer compound one.', 'I woke at six. It was raining. The rain was on the roof. I pulled the covers up. I lay listening.'),
  Q(2, 'Which sentence begins with a subordinate clause for variety?', 'Because the road was flooded, the bus turned back.', ['The bus turned back because the road was flooded.', 'The road was flooded, so the bus turned back.', 'The bus turned back. The road was flooded.'],
    'Starting with the “because” clause changes the usual subject-first pattern.'),
  Q(3, 'Why might a writer end a tense paragraph with a one-word sentence such as “Silence.”?', 'The sudden short sentence creates a dramatic pause and emphasis.', ['One-word sentences make a whole paragraph feel calm and slow.', 'The writer has run out of ideas to describe the scene.', 'It is a mistake that should always be corrected.'],
    'A deliberate fragment can be very powerful when used sparingly.'),
  Q(3, 'Which technique adds variety by delaying the main clause?', 'Starting with a phrase, as in “After hours of searching, we found it.”', ['Repeating the same subject at the start of every sentence in a row', 'Using “and” to join every sentence in the paragraph together', 'Writing every sentence as a question with a question mark'],
    'Varying openings stops every sentence from starting “We…”, “We…”.'),
];

// ---------------------------------------------------------------------------- 6.3 agreement

const SUBJECT_VERB = [
  Q(1, 'Which verb is correct? “Each of the players ___ a shirt.”', 'has', ['have', 'are having', 'were having'],
    '“Each” is singular, so the verb is singular, whatever comes after “of”.'),
  Q(1, 'Which verb is correct? “The box of chocolates ___ on the table.”', 'is', ['are', 'were', 'have been'],
    'The subject is “box”, not “chocolates”.'),
  Q(2, 'Which verb is correct? “Neither the teacher nor the students ___ ready.”', 'are', ['is', 'was', 'has been'],
    'With “neither … nor”, the verb agrees with the nearer subject: “students” (plural).'),
  Q(2, 'Which verb is correct? “There ___ three reasons for the delay.”', 'are', ['is', 'was', 'has been'],
    'After “there”, the verb agrees with what follows: “three reasons”.'),
  Q(3, 'Which sentence is correct?', 'The team is celebrating its victory.', ['The team are celebrating its victory.', 'The team is celebrating their victories.', 'The team were celebrating its victory.'],
    'Treated as one unit, the collective noun “team” takes a singular verb and pronoun. (British English often allows a plural verb when the members act separately, but keep it consistent.)'),
  Q(3, 'Which verb is correct? “Mathematics ___ my strongest subject.”', 'is', ['are', 'were', 'have been'],
    'Some nouns ending in -s, such as mathematics and news, are singular.'),
];

const PRONOUN = [
  Q(1, 'What is an antecedent?', 'The noun that a pronoun refers back to', ['The verb at the end of a sentence', 'The first word of a new paragraph', 'A word that means the opposite of another'],
    'In “NAME lost {his} bag”, NAME is the antecedent of “{his}”.'),
  Q(2, 'Which sentence has clear pronoun reference?', 'When Lena met Ruth, Lena was nervous.', ['When Lena met Ruth, she was nervous.', 'Lena met Ruth, and she was nervous.', 'She met Ruth, and Lena was nervous.'],
    'With two women, “she” could mean either. Naming the person removes the doubt.'),
  Q(2, 'Which sentence is correct in formal writing?', 'Everyone should bring their own lunch.', ['Everyone should bring our own lunch.', 'Everyone should bring your own lunch.', 'Everyone should bring its own lunch.'],
    'Singular “they” (“their”) is widely accepted for “everyone”. “His or her” is also correct but can sound stiff.'),
  Q(3, 'Which pronoun is correct? “The committee announced ___ decision.”', 'its', ['their', 'it’s', 'there'],
    'Treated as one body, the committee takes “its”. (“It’s” means “it is”.)'),
  Q(3, 'Which sentence is correct?', 'Between you and me, the plan will fail.', ['Between you and I, the plan will fail.', 'Between yourself and I, the plan will fail.', 'Between you and myself, the plan will fail.'],
    'After a preposition such as “between”, use the object pronoun “me”.'),
];

// ---------------------------------------------------------------------------- 6.4 punctuation for effect

const DASHES = [
  Q(1, 'Which sentence uses a dash for emphasis?', 'There was only one thing missing from the party—the guest of honour.', ['There was only one thing—missing from the party the guest of honour.', 'There was—only one thing missing from the party the guest of honour.', 'There was only one thing missing—from the party the guest of honour.'],
    'The dash creates a pause before the surprising final point.'),
  Q(1, 'What do parentheses (brackets) usually show?', 'Extra information that the sentence could do without', ['The most important idea in the whole of the sentence', 'A question that the writer wants answered', 'Words that someone said aloud, word for word'],
    'Brackets lower the volume; dashes raise it.'),
  Q(2, 'What does an ellipsis (…) show in a quotation?', 'That words have been left out', ['That the speaker is shouting loudly', 'That the quotation is a question', 'That the sentence is in the past tense'],
    'In dialogue, an ellipsis can also show a trailing pause.'),
  Q(2, 'Which sentence uses a pair of dashes correctly?', 'My aunt—who hates flying—flew to Lagos last week.', ['My aunt—who hates flying, flew to Lagos last week.', 'My aunt who—hates flying—flew to Lagos last week.', 'My—aunt who hates flying—flew to Lagos last week.'],
    'A pair of dashes wraps the extra information, like brackets but with more emphasis.'),
  Q(3, 'What is the difference between a hyphen and a dash?', 'A hyphen joins words, as in “well-known”; a dash separates parts of a sentence.', ['A hyphen ends a sentence, while a dash begins a new paragraph of writing.', 'There is no difference: they are two names for the same mark.', 'A hyphen is used only in poems, and a dash only in stories.'],
    'A hyphen is short and has no spaces around it; a dash is longer.'),
];

const EFFECT = [
  Q(1, 'What is the effect of the ellipsis in “I thought I heard… no, it was nothing.”?', 'It shows the speaker hesitating and trailing off.', ['It shows the speaker is completely certain.', 'It shows that the sentence is a question.', 'It shows that a word has been spelled wrongly.'],
    'An ellipsis in dialogue can create hesitation or suspense.'),
  Q(2, 'Why might a writer use a dash instead of a comma in “He opened the box—empty.”?', 'The dash creates a sharper pause that makes the reveal hit harder.', ['The dash is required by the rules after every verb in English.', 'A comma would make the sentence a question instead of a statement.', 'The dash shows that the box was full of interesting things.'],
    'Dashes add drama; commas are more neutral.'),
  Q(2, 'What is the effect of putting a comment in brackets, as in “The concert (if you can call it that) lasted two hours.”?', 'It adds a sly aside that shows the writer’s opinion.', ['It shows that the concert was the best one ever.', 'It marks the most important fact in the sentence.', 'It shows that the sentence has been quoted.'],
    'Brackets can carry a quiet, ironic voice.'),
  Q(3, 'What is the effect of the exclamation marks in this passage?', 'They make the speaker sound frantic and urgent.', ['They make the speaker sound calm and bored.', 'They show that the speaker is asking questions.', 'They have no effect on how it is read aloud.'],
    'Repeated exclamation marks raise the emotional temperature, though overusing them weakens writing.', '“Run! Now! They’re coming!”'),
  Q(3, 'A writer uses many semicolons in a description of a calm garden. What effect might this create?', 'A measured, balanced rhythm that suits the calm scene', ['A breathless rush that suits a frantic chase scene', 'A list of questions that the reader must answer', 'A loud, shouting voice that disturbs the scene'],
    'Punctuation shapes rhythm, and rhythm shapes mood.'),
];

// ---------------------------------------------------------------------------- skills

export const GRAMMAR_SKILLS: SkillDef[] = [
  skill({ id: 'e9-verbals', name: 'Verbals', description: 'Identify gerunds, participles and infinitives.', outcomes: F1, lessonId: 'e9-6-1', format: 'mc', gen: bank(VERBAL, ['Gerund: -ing as a noun. Participle: a verb form as an adjective. Infinitive: to + verb.']) }),
  skill({ id: 'e9-verbal-phrases', name: 'Verbal phrases', description: 'Use verbal phrases to combine sentences, without dangling them.', outcomes: F1, lessonId: 'e9-6-1', format: 'mc', gen: bank(VERBAL_PHRASES, ['A participial phrase must describe the word after the comma.']) }),
  skill({ id: 'e9-sentence-types', name: 'Sentence types', description: 'Identify simple, compound, complex and compound-complex sentences.', outcomes: F1, lessonId: 'e9-6-2', format: 'mc', gen: bank(SENTENCE_TYPES, ['Count the main clauses and the subordinate clauses.']) }),
  skill({ id: 'e9-sentence-variety', name: 'Sentence variety', description: 'Vary sentence length, type and openings for effect.', outcomes: F1, lessonId: 'e9-6-2', format: 'mc', gen: bank(VARIETY, ['Mix short and long sentences.', 'Vary how sentences begin.']) }),
  skill({ id: 'e9-subject-verb', name: 'Subject-verb agreement in hard cases', description: 'Make verbs agree with tricky subjects.', outcomes: F1, lessonId: 'e9-6-3', format: 'mc', gen: bank(SUBJECT_VERB, ['Find the real subject; ignore phrases such as “of the players”.']) }),
  skill({ id: 'e9-pronoun-agreement', name: 'Pronoun agreement and reference', description: 'Make pronouns agree with clear antecedents.', outcomes: F1, lessonId: 'e9-6-3', format: 'mc', gen: bank(PRONOUN, ['Ask: which noun does this pronoun point back to?']) }),
  skill({ id: 'e9-dashes', name: 'Dashes, brackets and ellipses', description: 'Use dashes, parentheses, ellipses and hyphens correctly.', outcomes: F2, lessonId: 'e9-6-4', format: 'mc', gen: bank(DASHES, ['Dashes emphasize; brackets play down; an ellipsis leaves out.']) }),
  skill({ id: 'e9-punctuation-effect', name: 'Punctuation for effect', description: 'Explain how punctuation choices shape tone and rhythm.', outcomes: F2, lessonId: 'e9-6-4', format: 'mc', gen: bank(EFFECT, ['Ask: how does this mark change the pause or the voice?']) }),
];
