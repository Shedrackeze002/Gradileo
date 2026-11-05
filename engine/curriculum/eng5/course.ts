/**
 * Grade 5 English: the first of the younger English courses (`docs/PLAN-ENGLISH-5-9.md`), written
 * for learners anywhere at the level of Grade 5 (Year 6 in the UK): stories, poetry, reading for
 * information, words, grammar and punctuation, and writing. Every text quoted is in the public
 * domain or written for Gradileo.
 */
import type { CourseMeta, LessonMeta, Outcome, UnitMeta } from '../../types.ts';

export const OUTCOMES: Outcome[] = [
  { code: 'E5-A1', strand: 'Stories', text: 'Describe the characters, setting and plot of a story, and infer characters’ traits and feelings from what they say and do.' },
  { code: 'E5-A2', strand: 'Stories', text: 'Retell a story’s problem, events and solution in order, and state the lesson of a fable or folk tale.' },
  { code: 'E5-B1', strand: 'Poetry', text: 'Explain how rhyme, rhythm, similes, metaphors, images and form work in a poem.' },
  { code: 'E5-C1', strand: 'Reading for Information', text: 'Find the main idea and supporting details of an informational text, and use its features and structure.' },
  { code: 'E5-C2', strand: 'Reading for Information', text: 'Tell facts from opinions, and identify an author’s purpose.' },
  { code: 'E5-D1', strand: 'Words', text: 'Work out the meaning of words from prefixes, suffixes and context, and choose between synonyms, antonyms and homophones.' },
  { code: 'E5-E1', strand: 'Grammar and Punctuation', text: 'Use nouns, verbs, adjectives and adverbs, and write complete sentences whose subjects and verbs agree.' },
  { code: 'E5-E2', strand: 'Grammar and Punctuation', text: 'Use capital letters, end marks, commas and quotation marks correctly.' },
  { code: 'E5-F1', strand: 'Writing', text: 'Write organized paragraphs, narratives and opinion pieces, and revise and edit them.' },
];

const L = (
  id: string,
  unitId: string,
  number: string,
  title: string,
  outcomes: string[],
  skills: string[],
  objectives: string[],
  minutes = 45,
  vocabulary: string[] = [],
): LessonMeta => ({ id, unitId, number, title, outcomes, skills, objectives, minutes, vocabulary });

export const LESSONS: LessonMeta[] = [
  // ---------------- Unit 1: Stories ----------------
  L('e5-1-1', 'e5-u1', '1.1', 'Story Elements', ['E5-A1'],
    ['e5-story-elements', 'e5-setting'],
    ['Name the characters, setting and plot of a story', 'Work out where and when a story takes place from clues in the text'],
    45, ['character', 'setting', 'plot', 'main character', 'narrator']),
  L('e5-1-2', 'e5-u1', '1.2', 'Characters', ['E5-A1'],
    ['e5-character-traits', 'e5-character-feelings'],
    ['Infer a character’s traits from what they say and do', 'Tell how a character feels and find the words that show it'],
    45, ['character trait', 'feeling', 'infer', 'evidence']),
  L('e5-1-3', 'e5-u1', '1.3', 'Problem, Events and Solution', ['E5-A2'],
    ['e5-problem-solution', 'e5-sequence'],
    ['Find the problem and solution of a story', 'Put the events of a story in order'],
    45, ['problem', 'solution', 'event', 'sequence', 'beginning', 'middle', 'end']),
  L('e5-1-4', 'e5-u1', '1.4', 'Fables, Folk Tales and Their Lessons', ['E5-A2'],
    ['e5-moral', 'e5-story-types'],
    ['State the lesson, or moral, of a fable', 'Recognize fables, fairy tales, folk tales, myths and tall tales'],
    45, ['fable', 'moral', 'lesson', 'fairy tale', 'folk tale', 'myth', 'tall tale']),

  // ---------------- Unit 2: Poetry ----------------
  L('e5-2-1', 'e5-u2', '2.1', 'Rhyme and Rhythm', ['E5-B1'],
    ['e5-rhyme', 'e5-syllables'],
    ['Find rhyming words and the rhyme pattern of a verse', 'Count the syllables and beats in a line'],
    45, ['rhyme', 'rhyme pattern', 'rhythm', 'beat', 'syllable', 'line', 'verse']),
  L('e5-2-2', 'e5-u2', '2.2', 'Similes and Metaphors', ['E5-B1'],
    ['e5-simile-metaphor', 'e5-figurative-meaning'],
    ['Tell a simile from a metaphor', 'Explain what a simile or metaphor means'],
    45, ['simile', 'metaphor', 'comparison', 'figurative language', 'literal']),
  L('e5-2-3', 'e5-u2', '2.3', 'Images and the Senses', ['E5-B1'],
    ['e5-senses', 'e5-vivid-words'],
    ['Name the sense an image appeals to', 'Choose vivid words that help a reader picture a scene'],
    45, ['imagery', 'image', 'senses', 'sensory detail', 'vivid']),
  L('e5-2-4', 'e5-u2', '2.4', 'Forms of Poetry', ['E5-B1'],
    ['e5-poem-forms', 'e5-lines-stanzas'],
    ['Recognize haiku, limericks, acrostic poems and free verse', 'Count the lines and stanzas of a poem'],
    45, ['haiku', 'limerick', 'acrostic', 'free verse', 'stanza', 'line']),

  // ---------------- Unit 3: Reading for Information ----------------
  L('e5-3-1', 'e5-u3', '3.1', 'Main Idea and Details', ['E5-C1'],
    ['e5-main-idea', 'e5-supporting-details'],
    ['Find the main idea of a paragraph', 'Choose the details that support the main idea'],
    45, ['main idea', 'topic', 'supporting detail', 'summary']),
  L('e5-3-2', 'e5-u3', '3.2', 'Text Features', ['E5-C1'],
    ['e5-text-features'],
    ['Use headings, captions, diagrams, bold words, glossaries and indexes to find information'],
    45, ['heading', 'caption', 'diagram', 'glossary', 'index', 'table of contents', 'bold']),
  L('e5-3-3', 'e5-u3', '3.3', 'Text Structures', ['E5-C1'],
    ['e5-text-structure', 'e5-signal-words'],
    ['Recognize sequence, compare and contrast, cause and effect, and problem and solution', 'Use signal words to see how ideas connect'],
    45, ['text structure', 'sequence', 'compare', 'contrast', 'cause', 'effect', 'problem and solution', 'signal word']),
  L('e5-3-4', 'e5-u3', '3.4', 'Fact, Opinion and the Author’s Purpose', ['E5-C2'],
    ['e5-fact-opinion', 'e5-author-purpose'],
    ['Tell a fact from an opinion', 'Tell whether an author writes to inform, persuade or entertain'],
    45, ['fact', 'opinion', 'author’s purpose', 'inform', 'persuade', 'entertain']),

  // ---------------- Unit 4: Words ----------------
  L('e5-4-1', 'e5-u4', '4.1', 'Prefixes and Suffixes', ['E5-D1'],
    ['e5-prefixes', 'e5-suffixes'],
    ['Use prefixes such as un-, re-, pre- and mis- to work out a word’s meaning', 'Use suffixes such as -ful, -less, -er and -able'],
    45, ['prefix', 'suffix', 'root word', 'base word']),
  L('e5-4-2', 'e5-u4', '4.2', 'Synonyms, Antonyms and Shades of Meaning', ['E5-D1'],
    ['e5-synonyms-antonyms', 'e5-shades-of-meaning'],
    ['Choose a synonym or antonym for a word', 'Order words by the strength of their meaning'],
    45, ['synonym', 'antonym', 'shades of meaning']),
  L('e5-4-3', 'e5-u4', '4.3', 'Context Clues', ['E5-D1'],
    ['e5-context-clues'],
    ['Work out an unfamiliar word from the words around it'],
    45, ['context', 'context clue', 'definition clue', 'example clue', 'opposite clue']),
  L('e5-4-4', 'e5-u4', '4.4', 'Homophones and Multiple-Meaning Words', ['E5-D1'],
    ['e5-homophones', 'e5-multiple-meaning'],
    ['Choose the right homophone for a sentence', 'Tell which meaning of a word a sentence uses'],
    45, ['homophone', 'multiple-meaning word']),

  // ---------------- Unit 5: Grammar and Punctuation ----------------
  L('e5-5-1', 'e5-u5', '5.1', 'Parts of Speech', ['E5-E1'],
    ['e5-parts-of-speech', 'e5-adjective-adverb'],
    ['Name nouns, verbs, adjectives and adverbs in a sentence', 'Choose between an adjective and an adverb'],
    45, ['noun', 'proper noun', 'verb', 'adjective', 'adverb', 'pronoun']),
  L('e5-5-2', 'e5-u5', '5.2', 'Complete Sentences', ['E5-E1'],
    ['e5-complete-sentences', 'e5-subject-predicate'],
    ['Tell a complete sentence from a fragment or a run-on', 'Find the subject and predicate of a sentence'],
    45, ['sentence', 'fragment', 'run-on', 'subject', 'predicate']),
  L('e5-5-3', 'e5-u5', '5.3', 'Agreement and Verb Tense', ['E5-E1'],
    ['e5-agreement', 'e5-verb-tense'],
    ['Make a verb agree with its subject', 'Use past, present and future tense, and irregular past forms'],
    45, ['subject', 'verb', 'agreement', 'singular', 'plural', 'tense', 'past', 'present', 'future']),
  L('e5-5-4', 'e5-u5', '5.4', 'Capital Letters and End Marks', ['E5-E2'],
    ['e5-capitals', 'e5-end-marks'],
    ['Use capital letters for sentences, names, places, days and titles', 'Choose the end mark for statements, questions, commands and exclamations'],
    45, ['capital letter', 'proper noun', 'statement', 'question', 'command', 'exclamation', 'period', 'question mark', 'exclamation mark']),
  L('e5-5-5', 'e5-u5', '5.5', 'Commas and Quotation Marks', ['E5-E2'],
    ['e5-commas', 'e5-quotation-marks'],
    ['Use commas in lists, after introductory words and in dates and addresses', 'Punctuate dialogue with quotation marks'],
    45, ['comma', 'list', 'introductory word', 'quotation marks', 'dialogue', 'speaker tag']),

  // ---------------- Unit 6: Writing ----------------
  L('e5-6-1', 'e5-u6', '6.1', 'The Paragraph', ['E5-F1'],
    ['e5-topic-sentence', 'e5-paragraph-unity'],
    ['Choose a topic sentence that fits a paragraph', 'Find the sentence that does not belong'],
    45, ['paragraph', 'topic sentence', 'supporting sentence', 'closing sentence']),
  L('e5-6-2', 'e5-u6', '6.2', 'Narrative Writing', ['E5-F1'],
    ['e5-time-order', 'e5-show-not-tell'],
    ['Use time-order words to move a story along', 'Show a feeling through actions and details instead of naming it'],
    45, ['narrative', 'time-order word', 'transition', 'dialogue', 'show, don’t tell']),
  L('e5-6-3', 'e5-u6', '6.3', 'Opinion Writing', ['E5-F1'],
    ['e5-opinion-reasons', 'e5-linking-words'],
    ['Support an opinion with strong reasons', 'Link opinions and reasons with words such as because and for example'],
    45, ['opinion', 'reason', 'example', 'linking word', 'conclusion']),
  L('e5-6-4', 'e5-u6', '6.4', 'Revising and Editing', ['E5-F1'],
    ['e5-editing', 'e5-combining-sentences'],
    ['Find and fix mistakes in capitals, punctuation, spelling and grammar', 'Combine short sentences into one smoother sentence'],
    45, ['revise', 'edit', 'proofread', 'combine']),
];

export const UNITS: UnitMeta[] = [
  { id: 'e5-u1', number: 1, title: 'Stories', description: 'Characters, setting and plot, problem and solution, and the lessons of fables and folk tales, in tales by Aesop, the Brothers Grimm, Hans Christian Andersen and others.', outcomes: ['E5-A1', 'E5-A2'], lessons: [], color: 'rose' },
  { id: 'e5-u2', number: 2, title: 'Poetry', description: 'Rhyme and rhythm, similes and metaphors, images and the senses, and forms of poetry, with poems by Robert Louis Stevenson, Christina Rossetti, Edward Lear and others.', outcomes: ['E5-B1'], lessons: [], color: 'sky' },
  { id: 'e5-u3', number: 3, title: 'Reading for Information', description: 'Main idea and details, text features, text structures, and fact, opinion and the author’s purpose.', outcomes: ['E5-C1', 'E5-C2'], lessons: [], color: 'amber' },
  { id: 'e5-u4', number: 4, title: 'Words', description: 'Prefixes and suffixes, synonyms and antonyms, context clues, and homophones and multiple-meaning words.', outcomes: ['E5-D1'], lessons: [], color: 'emerald' },
  { id: 'e5-u5', number: 5, title: 'Grammar and Punctuation', description: 'Parts of speech, complete sentences, agreement and verb tense, capital letters and end marks, and commas and quotation marks.', outcomes: ['E5-E1', 'E5-E2'], lessons: [], color: 'violet' },
  { id: 'e5-u6', number: 6, title: 'Writing', description: 'The paragraph, narrative writing, opinion writing, and revising and editing.', outcomes: ['E5-F1'], lessons: [], color: 'teal' },
];

for (const u of UNITS) u.lessons = LESSONS.filter((l) => l.unitId === u.id).map((l) => l.id);

export const ENG5: CourseMeta = {
  id: 'eng-5',
  title: 'Grade 5 English',
  shortTitle: 'English 5',
  grade: 5,
  subject: 'English',
  description: 'English for Grade 5: stories, poetry, reading for information, words and vocabulary, grammar and punctuation, and paragraph, narrative and opinion writing.',
  outcomes: OUTCOMES,
  units: UNITS,
  lessons: LESSONS,
};
