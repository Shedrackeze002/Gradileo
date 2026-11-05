/**
 * Grade 6 English (`docs/PLAN-ENGLISH-5-9.md`), written for learners anywhere at the level of
 * Grade 6 (Year 7 in the UK): stories, poetry, non-fiction, media, words, grammar and punctuation,
 * and writing. It builds on Grade 5 English with harder texts and finer terms. Every text quoted
 * is in the public domain or written for Gradileo.
 */
import type { CourseMeta, LessonMeta, Outcome, UnitMeta } from '../../types.ts';

export const OUTCOMES: Outcome[] = [
  { code: 'E6-A1', strand: 'Stories', text: 'Describe how a plot develops through its stages and conflict, and how characters’ motives drive what happens.' },
  { code: 'E6-A2', strand: 'Stories', text: 'Explain how a narrator’s point of view shapes a story, and state a story’s theme with evidence.' },
  { code: 'E6-B1', strand: 'Poetry', text: 'Explain how figurative language, sound devices, stanza form and word choice create meaning and mood in a poem.' },
  { code: 'E6-C1', strand: 'Non-fiction', text: 'Summarize an informational text, identify its structure, and evaluate the claims and evidence an author uses.' },
  { code: 'E6-D1', strand: 'Media', text: 'Identify the techniques, audience and message of advertisements, images and headlines.' },
  { code: 'E6-E1', strand: 'Words', text: 'Use Greek and Latin roots, connotation and idioms to understand and choose words.' },
  { code: 'E6-F1', strand: 'Grammar and Punctuation', text: 'Use pronouns and verb tenses correctly, and write simple and compound sentences.' },
  { code: 'E6-F2', strand: 'Grammar and Punctuation', text: 'Use commas and apostrophes correctly.' },
  { code: 'E6-G1', strand: 'Writing', text: 'Write narratives, informational texts and persuasive pieces, and revise them for word choice and sentence variety.' },
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
  L('e6-1-1', 'e6-u1', '1.1', 'Plot and Conflict', ['E6-A1'],
    ['e6-plot-stages', 'e6-conflict'],
    ['Name the stages of a plot: exposition, rising action, climax, falling action and resolution', 'Identify the kind of conflict a character faces'],
    45, ['exposition', 'rising action', 'climax', 'falling action', 'resolution', 'conflict']),
  L('e6-1-2', 'e6-u1', '1.2', 'Character and Motive', ['E6-A1'],
    ['e6-motive', 'e6-character-change'],
    ['Infer why a character acts as they do', 'Explain how and why a character changes'],
    45, ['motive', 'motivation', 'dynamic character', 'static character']),
  L('e6-1-3', 'e6-u1', '1.3', 'Point of View', ['E6-A2'],
    ['e6-point-of-view', 'e6-narrator-knows'],
    ['Tell first-person from third-person narration', 'Explain what a narrator can and cannot know'],
    45, ['point of view', 'first person', 'third person', 'narrator', 'limited', 'omniscient']),
  L('e6-1-4', 'e6-u1', '1.4', 'Theme', ['E6-A2'],
    ['e6-theme', 'e6-theme-evidence'],
    ['State the theme of a story as a full sentence', 'Choose evidence from a story that supports its theme'],
    45, ['theme', 'topic', 'message', 'evidence']),

  // ---------------- Unit 2: Poetry ----------------
  L('e6-2-1', 'e6-u2', '2.1', 'Personification and Hyperbole', ['E6-B1'],
    ['e6-figure-type', 'e6-figure-effect'],
    ['Tell similes, metaphors, personification and hyperbole apart', 'Explain what a figure of speech adds to a poem'],
    45, ['personification', 'hyperbole', 'simile', 'metaphor', 'figure of speech']),
  L('e6-2-2', 'e6-u2', '2.2', 'Sound Devices', ['E6-B1'],
    ['e6-sound-devices', 'e6-repetition'],
    ['Identify alliteration, onomatopoeia and assonance', 'Explain the effect of repetition and refrain'],
    45, ['alliteration', 'onomatopoeia', 'assonance', 'repetition', 'refrain']),
  L('e6-2-3', 'e6-u2', '2.3', 'Stanzas and Rhyme Scheme', ['E6-B1'],
    ['e6-rhyme-scheme', 'e6-stanza-names'],
    ['Write the rhyme scheme of a stanza', 'Name couplets, tercets and quatrains'],
    45, ['rhyme scheme', 'stanza', 'couplet', 'tercet', 'quatrain', 'end rhyme']),
  L('e6-2-4', 'e6-u2', '2.4', 'Mood', ['E6-B1'],
    ['e6-mood', 'e6-mood-words'],
    ['Describe the mood of a poem or passage', 'Find the words that create a mood'],
    45, ['mood', 'tone', 'atmosphere', 'imagery']),

  // ---------------- Unit 3: Non-fiction ----------------
  L('e6-3-1', 'e6-u3', '3.1', 'Summarizing', ['E6-C1'],
    ['e6-summary', 'e6-key-ideas'],
    ['Choose the best summary of a passage', 'Tell key ideas from minor details'],
    45, ['summary', 'key idea', 'minor detail', 'paraphrase']),
  L('e6-3-2', 'e6-u3', '3.2', 'Text Structure', ['E6-C1'],
    ['e6-text-structure', 'e6-graphic-organizer'],
    ['Identify five text structures, including description', 'Choose a graphic organizer that fits a text'],
    45, ['description', 'sequence', 'compare and contrast', 'cause and effect', 'problem and solution', 'graphic organizer']),
  L('e6-3-3', 'e6-u3', '3.3', 'Claims and Evidence', ['E6-C1'],
    ['e6-claim', 'e6-evidence'],
    ['Find the claim an author makes', 'Judge whether evidence is relevant and strong'],
    45, ['claim', 'evidence', 'reason', 'relevant', 'statistic', 'expert']),
  L('e6-3-4', 'e6-u3', '3.4', 'Author’s Purpose and Point of View', ['E6-C1'],
    ['e6-author-purpose', 'e6-author-view'],
    ['Identify an author’s purpose: to inform, persuade, entertain or give instructions', 'Infer an author’s point of view from word choice'],
    45, ['purpose', 'inform', 'persuade', 'entertain', 'explain', 'point of view', 'bias']),

  // ---------------- Unit 4: Media ----------------
  L('e6-4-1', 'e6-u4', '4.1', 'Advertising', ['E6-D1'],
    ['e6-ad-techniques', 'e6-audience'],
    ['Identify advertising techniques such as bandwagon and testimonial', 'Identify the audience an advertisement is aimed at'],
    45, ['advertisement', 'bandwagon', 'testimonial', 'slogan', 'target audience']),
  L('e6-4-2', 'e6-u4', '4.2', 'Images and Headlines', ['E6-D1'],
    ['e6-image-message', 'e6-loaded-words'],
    ['Explain the message an image or photograph sends', 'Spot loaded words in headlines'],
    45, ['image', 'caption', 'headline', 'loaded word', 'neutral']),

  // ---------------- Unit 5: Words ----------------
  L('e6-5-1', 'e6-u5', '5.1', 'Greek and Latin Roots', ['E6-E1'],
    ['e6-roots', 'e6-root-words'],
    ['Know the meanings of common Greek and Latin roots', 'Work out the meaning of a word from its root'],
    45, ['root', 'Greek', 'Latin', 'prefix', 'suffix']),
  L('e6-5-2', 'e6-u5', '5.2', 'Connotation', ['E6-E1'],
    ['e6-connotation', 'e6-word-choice'],
    ['Tell positive, negative and neutral connotations apart', 'Choose a word with the right connotation for a sentence'],
    45, ['denotation', 'connotation', 'positive', 'negative', 'neutral']),
  L('e6-5-3', 'e6-u5', '5.3', 'Idioms', ['E6-E1'],
    ['e6-idioms', 'e6-literal-figurative'],
    ['Explain what common idioms mean', 'Tell literal from figurative meaning'],
    45, ['idiom', 'literal', 'figurative', 'expression']),

  // ---------------- Unit 6: Grammar and Punctuation ----------------
  L('e6-6-1', 'e6-u6', '6.1', 'Pronouns', ['E6-F1'],
    ['e6-pronoun-case', 'e6-antecedents'],
    ['Choose subject and object pronouns, including in pairs', 'Make a pronoun agree with its antecedent'],
    45, ['pronoun', 'subject pronoun', 'object pronoun', 'possessive pronoun', 'antecedent']),
  L('e6-6-2', 'e6-u6', '6.2', 'Verb Tenses', ['E6-F1'],
    ['e6-progressive-perfect', 'e6-tense-shift'],
    ['Use progressive and perfect tenses', 'Keep verb tenses consistent'],
    45, ['tense', 'progressive', 'perfect', 'helping verb', 'consistent']),
  L('e6-6-3', 'e6-u6', '6.3', 'Simple and Compound Sentences', ['E6-F1'],
    ['e6-sentence-kinds', 'e6-conjunctions'],
    ['Tell simple, compound and complex sentences apart', 'Join ideas with coordinating conjunctions'],
    45, ['simple sentence', 'compound sentence', 'complex sentence', 'clause', 'conjunction', 'FANBOYS']),
  L('e6-6-4', 'e6-u6', '6.4', 'Commas and Apostrophes', ['E6-F2'],
    ['e6-apostrophes', 'e6-commas'],
    ['Use apostrophes in contractions and possessives', 'Use commas in compound sentences, after introductory parts and around extra information'],
    45, ['apostrophe', 'contraction', 'possessive', 'comma', 'introductory phrase']),

  // ---------------- Unit 7: Writing ----------------
  L('e6-7-1', 'e6-u7', '7.1', 'Narrative Writing', ['E6-G1'],
    ['e6-hooks', 'e6-dialogue'],
    ['Choose a strong opening for a story', 'Use dialogue to show character and move the story along'],
    45, ['hook', 'opening', 'dialogue', 'dialogue tag']),
  L('e6-7-2', 'e6-u7', '7.2', 'Informational Writing', ['E6-G1'],
    ['e6-info-structure', 'e6-transitions'],
    ['Organize an informational piece with an introduction, body and conclusion', 'Choose transitions that connect ideas'],
    45, ['introduction', 'body', 'conclusion', 'transition']),
  L('e6-7-3', 'e6-u7', '7.3', 'Persuasive Writing', ['E6-G1'],
    ['e6-thesis', 'e6-counterclaim'],
    ['Write a clear, arguable claim', 'Answer a counterclaim'],
    45, ['claim', 'thesis', 'counterclaim', 'rebuttal', 'audience']),
  L('e6-7-4', 'e6-u7', '7.4', 'Revising for Style', ['E6-G1'],
    ['e6-precise-words', 'e6-sentence-variety'],
    ['Replace vague words with precise ones', 'Vary the length and openings of sentences'],
    45, ['revise', 'precise', 'vague', 'sentence variety', 'wordy']),
];

export const UNITS: UnitMeta[] = [
  { id: 'e6-u1', number: 1, title: 'Stories', description: 'Plot and conflict, character and motive, point of view, and theme.', outcomes: ['E6-A1', 'E6-A2'], lessons: [], color: 'rose' },
  { id: 'e6-u2', number: 2, title: 'Poetry', description: 'Personification and hyperbole, sound devices, stanzas and rhyme scheme, and mood, with poems by Alfred Tennyson, William Wordsworth, Emily Dickinson, Carl Sandburg and others.', outcomes: ['E6-B1'], lessons: [], color: 'sky' },
  { id: 'e6-u3', number: 3, title: 'Non-fiction', description: 'Summarizing, text structure, claims and evidence, and the author’s purpose and point of view.', outcomes: ['E6-C1'], lessons: [], color: 'amber' },
  { id: 'e6-u4', number: 4, title: 'Media', description: 'Advertising techniques and audiences, and the messages of images and headlines.', outcomes: ['E6-D1'], lessons: [], color: 'orange' },
  { id: 'e6-u5', number: 5, title: 'Words', description: 'Greek and Latin roots, connotation, and idioms.', outcomes: ['E6-E1'], lessons: [], color: 'emerald' },
  { id: 'e6-u6', number: 6, title: 'Grammar and Punctuation', description: 'Pronouns, verb tenses, simple and compound sentences, and commas and apostrophes.', outcomes: ['E6-F1', 'E6-F2'], lessons: [], color: 'violet' },
  { id: 'e6-u7', number: 7, title: 'Writing', description: 'Narrative, informational and persuasive writing, and revising for style.', outcomes: ['E6-G1'], lessons: [], color: 'teal' },
];

for (const u of UNITS) u.lessons = LESSONS.filter((l) => l.unitId === u.id).map((l) => l.id);

export const ENG6: CourseMeta = {
  id: 'eng-6',
  title: 'Grade 6 English',
  shortTitle: 'English 6',
  grade: 6,
  subject: 'English',
  description: 'English for Grade 6: plot, character, point of view and theme; poetry; non-fiction and media; roots, connotation and idioms; grammar and punctuation; and narrative, informational and persuasive writing.',
  outcomes: OUTCOMES,
  units: UNITS,
  lessons: LESSONS,
};
