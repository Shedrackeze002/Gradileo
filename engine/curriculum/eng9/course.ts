/**
 * Grade 9 English (`docs/PLAN-ENGLISH-5-9.md`), written for learners anywhere at the level of
 * Grade 9 (Year 10 in the UK): fiction, poetry, Shakespeare's The Tempest, rhetoric and argument,
 * advertising and digital media, grammar and punctuation, and writing. It builds on Grade 8 English
 * with character arcs, allegory, close reading, rhetorical devices and a second whole Shakespeare
 * play, and leads straight into Grade 10 English. Every text quoted is in the public domain or
 * written for Gradileo.
 */
import type { CourseMeta, LessonMeta, Outcome, UnitMeta } from '../../types.ts';

export const OUTCOMES: Outcome[] = [
  { code: 'E9-A1', strand: 'Fiction', text: 'Analyse how a novel’s structure, pacing and character arcs create meaning.' },
  { code: 'E9-A2', strand: 'Fiction', text: 'Interpret symbol and allegory, and explain how a writer’s diction and syntax create style.' },
  { code: 'E9-B1', strand: 'Poetry', text: 'Read poems closely, analysing imagery, sound, the sonnet form and metre.' },
  { code: 'E9-C1', strand: 'Drama', text: 'Follow the plot, characters, themes and language of The Tempest, including its soliloquies.' },
  { code: 'E9-D1', strand: 'Non-fiction', text: 'Analyse rhetorical devices, the purpose and structure of speeches, and the soundness of reasoning.' },
  { code: 'E9-E1', strand: 'Media', text: 'Analyse advertising techniques and audiences, and check digital media for misinformation.' },
  { code: 'E9-F1', strand: 'Grammar and Punctuation', text: 'Use verbals and varied sentence structures, and make subjects, verbs and pronouns agree in hard cases.' },
  { code: 'E9-F2', strand: 'Grammar and Punctuation', text: 'Use dashes, parentheses, ellipses and other punctuation for effect.' },
  { code: 'E9-G1', strand: 'Writing', text: 'Write analytical essays with a clear thesis, and plan and write under time limits.' },
  { code: 'E9-G2', strand: 'Writing', text: 'Write personal essays that reflect, and revise writing for concision and precise word choice.' },
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
  // ---------------- Unit 1: Fiction ----------------
  L('e9-1-1', 'e9-u1', '1.1', 'The Structure of a Novel', ['E9-A1'],
    ['e9-novel-structure', 'e9-pacing'],
    ['Identify how a novel is structured, including chapters, flashbacks and multiple narrators', 'Explain how a writer controls pace'],
    45, ['structure', 'chronological', 'flashback', 'parallel plots', 'pacing', 'cliffhanger']),
  L('e9-1-2', 'e9-u1', '1.2', 'Character Arcs and Foils', ['E9-A1'],
    ['e9-character-arc', 'e9-foil'],
    ['Trace how a character changes across a story', 'Explain how a foil reveals a character'],
    45, ['character arc', 'dynamic', 'static', 'foil', 'catalyst', 'epiphany']),
  L('e9-1-3', 'e9-u1', '1.3', 'Symbol and Allegory', ['E9-A2'],
    ['e9-symbol', 'e9-allegory'],
    ['Interpret symbols and motifs in fiction', 'Explain how an allegory carries a second meaning'],
    45, ['symbol', 'motif', 'allegory', 'fable', 'parable']),
  L('e9-1-4', 'e9-u1', '1.4', 'Style: Diction and Syntax', ['E9-A2'],
    ['e9-diction', 'e9-syntax'],
    ['Describe a writer’s diction and its effect', 'Explain how sentence length and structure create effects'],
    45, ['style', 'diction', 'formal', 'colloquial', 'syntax', 'fragment']),

  // ---------------- Unit 2: Poetry ----------------
  L('e9-2-1', 'e9-u2', '2.1', 'Close Reading a Poem', ['E9-B1'],
    ['e9-close-reading', 'e9-imagery-effect'],
    ['Read a poem closely, line by line, for meaning', 'Explain how imagery creates an effect'],
    45, ['close reading', 'imagery', 'connotation', 'annotation', 'speaker']),
  L('e9-2-2', 'e9-u2', '2.2', 'The Sonnet and Its Sounds', ['E9-B1'],
    ['e9-sonnet', 'e9-sound-effects'],
    ['Identify Shakespearean and Petrarchan sonnets and the volta', 'Explain the effect of alliteration, assonance and sibilance'],
    45, ['sonnet', 'quatrain', 'octave', 'sestet', 'volta', 'alliteration', 'assonance', 'sibilance']),
  L('e9-2-3', 'e9-u2', '2.3', 'Metre and Rhythm', ['E9-B1'],
    ['e9-scansion', 'e9-metre-effect'],
    ['Scan a line to find its metre', 'Explain how rhythm, enjambment and caesura shape a poem'],
    45, ['scansion', 'stress', 'foot', 'enjambment', 'caesura', 'end-stopped']),

  // ---------------- Unit 3: The Tempest ----------------
  L('e9-3-1', 'e9-u3', '3.1', 'The Tempest: Plot and Characters', ['E9-C1'],
    ['e9-tempest-plot', 'e9-tempest-characters'],
    ['Follow the main plot and the two conspiracies', 'Explain the motives of Prospero, Ariel, Caliban and Miranda'],
    50, ['tempest', 'usurp', 'exile', 'conspiracy', 'spirit']),
  L('e9-3-2', 'e9-u3', '3.2', 'Power, Freedom and Forgiveness', ['E9-C1'],
    ['e9-tempest-themes', 'e9-tempest-quotes'],
    ['Explain the play’s themes of power, freedom and forgiveness', 'Explain what key lines from the play reveal'],
    50, ['power', 'freedom', 'colonialism', 'forgiveness', 'reconciliation']),
  L('e9-3-3', 'e9-u3', '3.3', 'Soliloquies, Songs and Staging', ['E9-C1'],
    ['e9-soliloquy', 'e9-tempest-language'],
    ['Explain the purpose of soliloquies, asides and songs', 'Analyse how Shakespeare’s language and staging create the island'],
    50, ['soliloquy', 'aside', 'masque', 'epilogue', 'verse', 'prose']),

  // ---------------- Unit 4: Non-fiction ----------------
  L('e9-4-1', 'e9-u4', '4.1', 'Rhetorical Devices', ['E9-D1'],
    ['e9-rhetorical-devices', 'e9-device-effect'],
    ['Identify anaphora, the tricolon, antithesis and the rhetorical question', 'Explain the effect of a rhetorical device'],
    45, ['rhetoric', 'anaphora', 'tricolon', 'antithesis', 'rhetorical question', 'juxtaposition']),
  L('e9-4-2', 'e9-u4', '4.2', 'Analysing a Speech', ['E9-D1'],
    ['e9-speech-purpose', 'e9-speech-structure'],
    ['Identify a speech’s purpose, audience and context', 'Explain how a speech is structured to persuade'],
    45, ['purpose', 'audience', 'context', 'call to action', 'peroration']),
  L('e9-4-3', 'e9-u4', '4.3', 'Sound and Faulty Reasoning', ['E9-D1'],
    ['e9-reasoning', 'e9-fallacies'],
    ['Tell deductive from inductive reasoning and judge whether evidence is enough', 'Identify the straw man, the slippery slope and other fallacies'],
    45, ['deductive', 'inductive', 'premise', 'straw man', 'slippery slope', 'circular reasoning']),

  // ---------------- Unit 5: Media ----------------
  L('e9-5-1', 'e9-u5', '5.1', 'Advertising and Its Audience', ['E9-E1'],
    ['e9-ad-techniques', 'e9-target-audience'],
    ['Identify advertising techniques', 'Explain how an advert targets its audience'],
    45, ['target audience', 'slogan', 'testimonial', 'scarcity', 'influencer', 'sponsored']),
  L('e9-5-2', 'e9-u5', '5.2', 'Misinformation and Checking Sources', ['E9-E1'],
    ['e9-misinformation', 'e9-verify'],
    ['Recognize misinformation, clickbait and manipulated images', 'Check a claim using lateral reading'],
    45, ['misinformation', 'disinformation', 'clickbait', 'lateral reading', 'echo chamber']),

  // ---------------- Unit 6: Grammar and Punctuation ----------------
  L('e9-6-1', 'e9-u6', '6.1', 'Verbals', ['E9-F1'],
    ['e9-verbals', 'e9-verbal-phrases'],
    ['Identify gerunds, participles and infinitives', 'Use verbal phrases to combine sentences'],
    45, ['verbal', 'gerund', 'participle', 'infinitive', 'phrase']),
  L('e9-6-2', 'e9-u6', '6.2', 'Sentence Variety', ['E9-F1'],
    ['e9-sentence-types', 'e9-sentence-variety'],
    ['Identify simple, compound, complex and compound-complex sentences', 'Vary sentence length and openings for effect'],
    45, ['simple', 'compound', 'complex', 'compound-complex', 'subordinate clause']),
  L('e9-6-3', 'e9-u6', '6.3', 'Agreement in Hard Cases', ['E9-F1'],
    ['e9-subject-verb', 'e9-pronoun-agreement'],
    ['Make verbs agree with tricky subjects', 'Make pronouns agree with their antecedents'],
    45, ['agreement', 'indefinite pronoun', 'collective noun', 'antecedent']),
  L('e9-6-4', 'e9-u6', '6.4', 'Punctuation for Effect', ['E9-F2'],
    ['e9-dashes', 'e9-punctuation-effect'],
    ['Use dashes, parentheses and ellipses correctly', 'Explain the effect of punctuation choices'],
    45, ['dash', 'parentheses', 'ellipsis', 'hyphen', 'emphasis']),

  // ---------------- Unit 7: Writing ----------------
  L('e9-7-1', 'e9-u7', '7.1', 'The Analytical Essay', ['E9-G1'],
    ['e9-analytical-thesis', 'e9-essay-structure'],
    ['Write an analytical thesis that makes an interpretation', 'Organize an analytical essay with topic sentences and transitions'],
    45, ['analytical thesis', 'interpretation', 'topic sentence', 'transition', 'conclusion']),
  L('e9-7-2', 'e9-u7', '7.2', 'The Personal Essay', ['E9-G2'],
    ['e9-personal-essay', 'e9-reflection'],
    ['Shape a personal essay around a specific moment', 'Reflect on what an experience means'],
    45, ['personal essay', 'anecdote', 'reflection', 'insight']),
  L('e9-7-3', 'e9-u7', '7.3', 'Timed Writing', ['E9-G1'],
    ['e9-prompt-analysis', 'e9-timed-planning'],
    ['Unpick what an exam prompt is asking', 'Plan and manage time in a timed essay'],
    45, ['prompt', 'command word', 'plan', 'outline', 'proofread']),
  L('e9-7-4', 'e9-u7', '7.4', 'Revising for Style', ['E9-G2'],
    ['e9-concision', 'e9-word-choice'],
    ['Cut wordiness and redundancy', 'Choose precise, vivid words'],
    45, ['concise', 'redundancy', 'wordiness', 'precise', 'cliché']),
];

export const UNITS: UnitMeta[] = [
  { id: 'e9-u1', number: 1, title: 'Fiction', description: 'The structure of a novel, character arcs and foils, symbol and allegory, and style.', outcomes: ['E9-A1', 'E9-A2'], lessons: [], color: 'rose' },
  { id: 'e9-u2', number: 2, title: 'Poetry', description: 'Close reading, the sonnet and its sounds, and metre and rhythm, with poems by Shakespeare, Christina Rossetti, Paul Laurence Dunbar, Wilfred Owen and Edgar Allan Poe.', outcomes: ['E9-B1'], lessons: [], color: 'sky' },
  { id: 'e9-u3', number: 3, title: 'The Tempest', description: 'Shakespeare’s late play of magic, revenge and forgiveness: its plot and characters, its themes, and its soliloquies, songs and staging.', outcomes: ['E9-C1'], lessons: [], color: 'violet' },
  { id: 'e9-u4', number: 4, title: 'Non-fiction', description: 'Rhetorical devices, analysing a speech, and sound and faulty reasoning.', outcomes: ['E9-D1'], lessons: [], color: 'amber' },
  { id: 'e9-u5', number: 5, title: 'Media', description: 'Advertising and its audience, and misinformation and checking sources.', outcomes: ['E9-E1'], lessons: [], color: 'orange' },
  { id: 'e9-u6', number: 6, title: 'Grammar and Punctuation', description: 'Verbals, sentence variety, agreement in hard cases, and punctuation for effect.', outcomes: ['E9-F1', 'E9-F2'], lessons: [], color: 'emerald' },
  { id: 'e9-u7', number: 7, title: 'Writing', description: 'The analytical essay, the personal essay, timed writing, and revising for style.', outcomes: ['E9-G1', 'E9-G2'], lessons: [], color: 'teal' },
];

for (const u of UNITS) u.lessons = LESSONS.filter((l) => l.unitId === u.id).map((l) => l.id);

export const ENG9: CourseMeta = {
  id: 'eng-9',
  title: 'Grade 9 English',
  shortTitle: 'English 9',
  grade: 9,
  subject: 'English',
  description: 'English for Grade 9: structure, character arcs, symbol, allegory and style in fiction; close reading, the sonnet and metre in poetry; Shakespeare’s The Tempest; rhetoric, speeches and reasoning; advertising and misinformation; verbals, sentence variety, agreement and punctuation for effect; and analytical, personal and timed writing.',
  outcomes: OUTCOMES,
  units: UNITS,
  lessons: LESSONS,
};
