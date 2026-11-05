/**
 * Grade 7 English (`docs/PLAN-ENGLISH-5-9.md`), written for learners anywhere at the level of
 * Grade 7 (Year 8 in the UK): short stories, poetry, drama, non-fiction, media, grammar and
 * punctuation, and writing. It builds on Grade 6 English with longer texts, poetic forms, scripts
 * and the essay. Every text quoted is in the public domain or written for Gradileo.
 */
import type { CourseMeta, LessonMeta, Outcome, UnitMeta } from '../../types.ts';

export const OUTCOMES: Outcome[] = [
  { code: 'E7-A1', strand: 'Short Stories', text: 'Analyse how conflict, characterization and setting shape a short story.' },
  { code: 'E7-A2', strand: 'Short Stories', text: 'Explain how foreshadowing, flashback and symbol build meaning, and trace how a theme develops.' },
  { code: 'E7-B1', strand: 'Poetry', text: 'Explain how imagery, sound, rhythm, speaker and tone create meaning in a poem.' },
  { code: 'E7-B2', strand: 'Poetry', text: 'Identify the features of the ballad, the sonnet and free verse.' },
  { code: 'E7-C1', strand: 'Drama', text: 'Read a script, explaining how stage directions, dialogue, asides and monologues reveal character and move the action.' },
  { code: 'E7-D1', strand: 'Non-fiction', text: 'Identify an author’s claims, reasons and evidence, and the persuasive techniques they use.' },
  { code: 'E7-D2', strand: 'Non-fiction', text: 'Tell fact from opinion and recognize bias in a text.' },
  { code: 'E7-E1', strand: 'Media', text: 'Analyse how news reports and online texts present information, and judge whether a source is reliable.' },
  { code: 'E7-F1', strand: 'Grammar and Punctuation', text: 'Use phrases and clauses to build simple, compound, complex and compound-complex sentences, and correct fragments and run-ons.' },
  { code: 'E7-F2', strand: 'Grammar and Punctuation', text: 'Make subjects and verbs, and pronouns and antecedents, agree, and punctuate clauses and dialogue correctly.' },
  { code: 'E7-G1', strand: 'Writing', text: 'Write unified paragraphs and multi-paragraph essays with a clear thesis.' },
  { code: 'E7-G2', strand: 'Writing', text: 'Write vivid narratives, and research a topic using reliable sources that are paraphrased and cited.' },
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
  // ---------------- Unit 1: Short Stories ----------------
  L('e7-1-1', 'e7-u1', '1.1', 'Conflict and Suspense', ['E7-A1'],
    ['e7-conflict', 'e7-suspense'],
    ['Tell internal from external conflict, and see how one can lead to another', 'Explain how a writer builds suspense'],
    45, ['internal conflict', 'external conflict', 'suspense', 'tension', 'cliffhanger']),
  L('e7-1-2', 'e7-u1', '1.2', 'Characterization', ['E7-A1'],
    ['e7-characterization', 'e7-character-traits'],
    ['Tell direct from indirect characterization', 'Infer a character’s traits from speech, thoughts, effect on others, actions and looks'],
    45, ['characterization', 'direct', 'indirect', 'trait', 'infer']),
  L('e7-1-3', 'e7-u1', '1.3', 'Setting and Mood', ['E7-A1'],
    ['e7-setting', 'e7-setting-mood'],
    ['Explain how a setting shapes the characters and the conflict', 'Explain how details of a setting create a mood'],
    45, ['setting', 'time', 'place', 'mood', 'atmosphere']),
  L('e7-1-4', 'e7-u1', '1.4', 'Foreshadowing and Flashback', ['E7-A2'],
    ['e7-foreshadowing', 'e7-flashback'],
    ['Spot foreshadowing and explain what it hints at', 'Recognize a flashback and explain why a writer uses it'],
    45, ['foreshadowing', 'flashback', 'chronological order', 'hint']),
  L('e7-1-5', 'e7-u1', '1.5', 'Theme and Symbol', ['E7-A2'],
    ['e7-symbol', 'e7-theme-development'],
    ['Explain what a symbol stands for in a story', 'Trace how a theme develops from the beginning to the end of a story'],
    45, ['symbol', 'theme', 'develop', 'universal']),

  // ---------------- Unit 2: Poetry ----------------
  L('e7-2-1', 'e7-u2', '2.1', 'Imagery', ['E7-B1'],
    ['e7-imagery', 'e7-imagery-effect'],
    ['Identify the sense an image appeals to', 'Explain what an image adds to a poem'],
    45, ['imagery', 'sensory', 'image', 'concrete']),
  L('e7-2-2', 'e7-u2', '2.2', 'Sound and Rhythm', ['E7-B1'],
    ['e7-rhythm', 'e7-sound-effect'],
    ['Hear stressed and unstressed syllables and describe a poem’s rhythm', 'Explain how sound devices and rhythm match a poem’s meaning'],
    45, ['rhythm', 'stress', 'syllable', 'beat', 'rhyme', 'alliteration']),
  L('e7-2-3', 'e7-u2', '2.3', 'The Ballad', ['E7-B2'],
    ['e7-ballad', 'e7-ballad-reading'],
    ['Know the features of a ballad', 'Follow the story a ballad tells'],
    45, ['ballad', 'ballad stanza', 'refrain', 'narrative poem', 'quatrain']),
  L('e7-2-4', 'e7-u2', '2.4', 'The Sonnet and Free Verse', ['E7-B2'],
    ['e7-poem-form', 'e7-sonnet'],
    ['Tell a sonnet, a ballad and free verse apart', 'Know the parts of a Shakespearean sonnet'],
    45, ['sonnet', 'quatrain', 'couplet', 'free verse', 'iambic pentameter']),
  L('e7-2-5', 'e7-u2', '2.5', 'Speaker and Tone', ['E7-B1'],
    ['e7-speaker', 'e7-tone'],
    ['Tell the speaker of a poem from the poet', 'Describe the tone of a poem and the words that create it'],
    45, ['speaker', 'poet', 'tone', 'attitude']),

  // ---------------- Unit 3: Drama ----------------
  L('e7-3-1', 'e7-u3', '3.1', 'Reading a Script', ['E7-C1'],
    ['e7-script-parts', 'e7-stage-directions'],
    ['Name the parts of a script: cast list, scenes, dialogue and stage directions', 'Explain what stage directions tell actors and readers'],
    45, ['script', 'playwright', 'cast list', 'act', 'scene', 'stage directions', 'dialogue']),
  L('e7-3-2', 'e7-u3', '3.2', 'Dialogue, Asides and Monologues', ['E7-C1'],
    ['e7-drama-dialogue', 'e7-aside-monologue'],
    ['Explain how dialogue reveals character and moves the action in a play', 'Tell an aside, a monologue and a soliloquy apart'],
    45, ['dialogue', 'aside', 'monologue', 'soliloquy', 'dramatic irony']),

  // ---------------- Unit 4: Non-fiction ----------------
  L('e7-4-1', 'e7-u4', '4.1', 'Claims, Reasons and Evidence', ['E7-D1'],
    ['e7-claim-reasons', 'e7-evidence-types'],
    ['Trace an argument from its claim to its reasons and evidence', 'Name kinds of evidence and judge how strong they are'],
    45, ['claim', 'reason', 'evidence', 'statistic', 'anecdote', 'expert opinion']),
  L('e7-4-2', 'e7-u4', '4.2', 'Persuasive Techniques', ['E7-D1'],
    ['e7-persuasive-techniques', 'e7-persuasive-effect'],
    ['Identify persuasive techniques such as rhetorical questions, repetition and emotive language', 'Explain the effect of a persuasive technique on a reader'],
    45, ['rhetorical question', 'repetition', 'emotive language', 'rule of three', 'direct address']),
  L('e7-4-3', 'e7-u4', '4.3', 'Fact, Opinion and Bias', ['E7-D2'],
    ['e7-fact-opinion', 'e7-bias'],
    ['Tell facts from opinions, including opinions dressed as facts', 'Recognize bias in what a writer includes, leaves out and how they say it'],
    45, ['fact', 'opinion', 'bias', 'one-sided', 'balanced']),

  // ---------------- Unit 5: Media ----------------
  L('e7-5-1', 'e7-u5', '5.1', 'News Reports', ['E7-E1'],
    ['e7-news-features', 'e7-news-angle'],
    ['Know the features of a news report, including the lead and the five Ws', 'Explain how word choice and order give a report an angle'],
    45, ['headline', 'lead', 'five Ws', 'quotation', 'angle', 'inverted pyramid']),
  L('e7-5-2', 'e7-u5', '5.2', 'Reliable Sources Online', ['E7-E1'],
    ['e7-reliable-source', 'e7-online-purpose'],
    ['Judge whether an online source is reliable', 'Identify the purpose of an online text, such as a sponsored post'],
    45, ['source', 'reliable', 'author', 'date', 'sponsored', 'cross-check']),

  // ---------------- Unit 6: Grammar and Punctuation ----------------
  L('e7-6-1', 'e7-u6', '6.1', 'Phrases and Clauses', ['E7-F1'],
    ['e7-phrase-clause', 'e7-clause-kinds'],
    ['Tell a phrase from a clause', 'Tell independent from dependent clauses'],
    45, ['phrase', 'clause', 'subject', 'verb', 'independent clause', 'dependent clause']),
  L('e7-6-2', 'e7-u6', '6.2', 'Complex Sentences', ['E7-F1'],
    ['e7-subordinators', 'e7-sentence-structure'],
    ['Join ideas with subordinating conjunctions', 'Tell simple, compound, complex and compound-complex sentences apart'],
    45, ['subordinating conjunction', 'complex sentence', 'compound-complex sentence']),
  L('e7-6-3', 'e7-u6', '6.3', 'Fragments and Run-ons', ['E7-F1'],
    ['e7-fragments', 'e7-run-ons'],
    ['Find and fix sentence fragments', 'Find and fix run-on sentences and comma splices'],
    45, ['fragment', 'run-on', 'comma splice', 'complete sentence']),
  L('e7-6-4', 'e7-u6', '6.4', 'Agreement', ['E7-F2'],
    ['e7-subject-verb', 'e7-pronoun-agreement'],
    ['Make a verb agree with its subject, even with phrases in between', 'Make a pronoun agree with its antecedent'],
    45, ['agreement', 'singular', 'plural', 'subject', 'antecedent', 'indefinite pronoun']),
  L('e7-6-5', 'e7-u6', '6.5', 'Punctuating Clauses and Dialogue', ['E7-F2'],
    ['e7-clause-commas', 'e7-dialogue-punctuation'],
    ['Use commas with introductory clauses and in compound sentences', 'Punctuate dialogue correctly'],
    45, ['comma', 'introductory clause', 'quotation marks', 'dialogue tag', 'new paragraph']),

  // ---------------- Unit 7: Writing ----------------
  L('e7-7-1', 'e7-u7', '7.1', 'The Paragraph', ['E7-G1'],
    ['e7-topic-sentence', 'e7-paragraph-unity'],
    ['Write a topic sentence that controls a paragraph', 'Keep a paragraph unified and well supported'],
    45, ['paragraph', 'topic sentence', 'supporting detail', 'concluding sentence', 'unity']),
  L('e7-7-2', 'e7-u7', '7.2', 'The Essay', ['E7-G1'],
    ['e7-thesis', 'e7-essay-parts'],
    ['Write a clear thesis statement', 'Know what belongs in an essay’s introduction, body paragraphs and conclusion'],
    45, ['essay', 'thesis', 'introduction', 'body paragraph', 'conclusion']),
  L('e7-7-3', 'e7-u7', '7.3', 'Narrative Craft', ['E7-G2'],
    ['e7-show-tell', 'e7-pacing'],
    ['Show rather than tell', 'Control the pace of a story'],
    45, ['show', 'tell', 'sensory detail', 'pacing', 'summary', 'scene']),
  L('e7-7-4', 'e7-u7', '7.4', 'Research and Citing Sources', ['E7-G2'],
    ['e7-research-question', 'e7-paraphrase-cite'],
    ['Write a focused research question', 'Paraphrase, quote and cite a source, and avoid plagiarism'],
    45, ['research question', 'source', 'paraphrase', 'quotation', 'cite', 'plagiarism']),
];

export const UNITS: UnitMeta[] = [
  { id: 'e7-u1', number: 1, title: 'Short Stories', description: 'Conflict and suspense, characterization, setting and mood, foreshadowing and flashback, and theme and symbol.', outcomes: ['E7-A1', 'E7-A2'], lessons: [], color: 'rose' },
  { id: 'e7-u2', number: 2, title: 'Poetry', description: 'Imagery, sound and rhythm, the ballad, the sonnet and free verse, and speaker and tone, with poems by Shakespeare, Coleridge, Tennyson, Whitman, Dickinson, Frost and others.', outcomes: ['E7-B1', 'E7-B2'], lessons: [], color: 'sky' },
  { id: 'e7-u3', number: 3, title: 'Drama', description: 'Reading a script: stage directions, dialogue, asides and monologues.', outcomes: ['E7-C1'], lessons: [], color: 'violet' },
  { id: 'e7-u4', number: 4, title: 'Non-fiction', description: 'Claims, reasons and evidence, persuasive techniques, and fact, opinion and bias.', outcomes: ['E7-D1', 'E7-D2'], lessons: [], color: 'amber' },
  { id: 'e7-u5', number: 5, title: 'Media', description: 'How news reports are built and angled, and how to judge sources online.', outcomes: ['E7-E1'], lessons: [], color: 'orange' },
  { id: 'e7-u6', number: 6, title: 'Grammar and Punctuation', description: 'Phrases and clauses, complex sentences, fragments and run-ons, agreement, and punctuating clauses and dialogue.', outcomes: ['E7-F1', 'E7-F2'], lessons: [], color: 'emerald' },
  { id: 'e7-u7', number: 7, title: 'Writing', description: 'The paragraph, the essay, narrative craft, and research and citing sources.', outcomes: ['E7-G1', 'E7-G2'], lessons: [], color: 'teal' },
];

for (const u of UNITS) u.lessons = LESSONS.filter((l) => l.unitId === u.id).map((l) => l.id);

export const ENG7: CourseMeta = {
  id: 'eng-7',
  title: 'Grade 7 English',
  shortTitle: 'English 7',
  grade: 7,
  subject: 'English',
  description: 'English for Grade 7: conflict, characterization, setting, foreshadowing and symbol in short stories; imagery, sound, ballads and sonnets; reading a script; claims, persuasion and bias; news and online sources; clauses, sentences and agreement; and paragraphs, essays, narratives and research.',
  outcomes: OUTCOMES,
  units: UNITS,
  lessons: LESSONS,
};
