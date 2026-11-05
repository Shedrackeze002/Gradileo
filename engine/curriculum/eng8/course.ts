/**
 * Grade 8 English (`docs/PLAN-ENGLISH-5-9.md`), written for learners anywhere at the level of
 * Grade 8 (Year 9 in the UK): fiction, poetry, Shakespeare's A Midsummer Night's Dream,
 * non-fiction and argument, film and news, grammar and punctuation, and writing. It builds on Grade
 * 7 English with irony, narrators, rhetorical appeals and a first whole Shakespeare play. Every text
 * quoted is in the public domain or written for Gradileo.
 */
import type { CourseMeta, LessonMeta, Outcome, UnitMeta } from '../../types.ts';

export const OUTCOMES: Outcome[] = [
  { code: 'E8-A1', strand: 'Fiction', text: 'Analyse how plot, subplot and irony create meaning and effect in fiction.' },
  { code: 'E8-A2', strand: 'Fiction', text: 'Explain how a narrator’s point of view shapes a story, and compare how texts treat a theme.' },
  { code: 'E8-B1', strand: 'Poetry', text: 'Analyse figurative language, form and metre, and shifts in tone in poems.' },
  { code: 'E8-C1', strand: 'Drama', text: 'Follow the plot, characters and language of A Midsummer Night’s Dream, and explain how it works as a comedy.' },
  { code: 'E8-D1', strand: 'Non-fiction', text: 'Analyse how an argument is built, including ethos, pathos and logos, and evaluate its sources and reasoning.' },
  { code: 'E8-E1', strand: 'Media', text: 'Explain how film techniques and news framing shape an audience’s response.' },
  { code: 'E8-F1', strand: 'Grammar and Punctuation', text: 'Use active and passive voice, place modifiers clearly and keep structures parallel.' },
  { code: 'E8-F2', strand: 'Grammar and Punctuation', text: 'Use semicolons and colons correctly.' },
  { code: 'E8-G1', strand: 'Writing', text: 'Write argument essays and literary paragraphs that use evidence and answer counterarguments.' },
  { code: 'E8-G2', strand: 'Writing', text: 'Write narratives with a controlled voice, and integrate and cite research sources.' },
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
  L('e8-1-1', 'e8-u1', '1.1', 'Plot and Subplot', ['E8-A1'],
    ['e8-subplot', 'e8-plot-devices'],
    ['Tell a main plot from a subplot and explain how they connect', 'Identify plot devices such as in medias res, a twist and a frame story'],
    45, ['main plot', 'subplot', 'in medias res', 'twist', 'frame story', 'red herring']),
  L('e8-1-2', 'e8-u1', '1.2', 'Irony', ['E8-A1'],
    ['e8-irony-type', 'e8-irony-effect'],
    ['Tell verbal, situational and dramatic irony apart', 'Explain the effect of irony in a story'],
    45, ['irony', 'verbal irony', 'situational irony', 'dramatic irony', 'sarcasm']),
  L('e8-1-3', 'e8-u1', '1.3', 'Narrators', ['E8-A2'],
    ['e8-narrator-type', 'e8-narrator-effect'],
    ['Identify first-person, third-person limited and omniscient narrators', 'Explain how a narrator’s point of view and reliability shape a story'],
    45, ['narrator', 'first person', 'third-person limited', 'omniscient', 'unreliable narrator']),
  L('e8-1-4', 'e8-u1', '1.4', 'Theme Across Texts', ['E8-A2'],
    ['e8-theme-statement', 'e8-compare-themes'],
    ['State a theme precisely, avoiding clichés', 'Compare how two texts treat the same theme'],
    45, ['theme', 'universal theme', 'compare', 'contrast', 'cliché']),

  // ---------------- Unit 2: Poetry ----------------
  L('e8-2-1', 'e8-u2', '2.1', 'Figurative Language', ['E8-B1'],
    ['e8-figurative', 'e8-extended-metaphor'],
    ['Identify simile, metaphor, personification, hyperbole and symbol in poems', 'Follow an extended metaphor through a poem'],
    45, ['figurative language', 'extended metaphor', 'personification', 'symbol', 'imagery']),
  L('e8-2-2', 'e8-u2', '2.2', 'Form and Metre', ['E8-B1'],
    ['e8-poem-form', 'e8-metre'],
    ['Identify the haiku, the couplet, the sonnet, blank verse and free verse', 'Name iambic and trochaic metre and count the feet in a line'],
    45, ['form', 'haiku', 'couplet', 'blank verse', 'metre', 'iamb', 'trochee', 'pentameter', 'tetrameter']),
  L('e8-2-3', 'e8-u2', '2.3', 'Tone and Shifts', ['E8-B1'],
    ['e8-tone-words', 'e8-tone-shift'],
    ['Describe tone with precise words', 'Find where and why a poem’s tone shifts'],
    45, ['tone', 'shift', 'turn', 'ironic', 'nostalgic', 'defiant']),

  // ---------------- Unit 3: A Midsummer Night’s Dream ----------------
  L('e8-3-1', 'e8-u3', '3.1', 'A Midsummer Night’s Dream: Plot and Characters', ['E8-C1'],
    ['e8-msnd-plot', 'e8-msnd-characters'],
    ['Follow the four groups of characters and their plots', 'Explain the motives and conflicts of the main characters'],
    50, ['comedy', 'Athens', 'the lovers', 'the fairies', 'the mechanicals', 'love potion']),
  L('e8-3-2', 'e8-u3', '3.2', 'Shakespeare’s Language', ['E8-C1'],
    ['e8-shakespeare-words', 'e8-verse-prose'],
    ['Understand Shakespeare’s pronouns, verbs and word order', 'Explain why some characters speak in verse and others in prose'],
    50, ['thou', 'thee', 'thy', 'verse', 'prose', 'blank verse', 'rhyming couplet']),
  L('e8-3-3', 'e8-u3', '3.3', 'Comedy and the Play Within the Play', ['E8-C1'],
    ['e8-comedy', 'e8-msnd-quotes'],
    ['Identify the features of a Shakespearean comedy', 'Explain what key lines from the play reveal'],
    50, ['comedy', 'mistaken identity', 'play within a play', 'epilogue', 'theme']),

  // ---------------- Unit 4: Non-fiction ----------------
  L('e8-4-1', 'e8-u4', '4.1', 'Building an Argument', ['E8-D1'],
    ['e8-argument-parts', 'e8-counterargument'],
    ['Identify an argument’s claim, reasons, evidence and warrant', 'Explain how a writer acknowledges and rebuts a counterargument'],
    45, ['claim', 'reason', 'evidence', 'warrant', 'counterargument', 'rebuttal', 'concession']),
  L('e8-4-2', 'e8-u4', '4.2', 'Ethos, Pathos and Logos', ['E8-D1'],
    ['e8-appeals', 'e8-appeal-effect'],
    ['Identify appeals to credibility, emotion and logic', 'Explain why a writer uses an appeal for a given audience'],
    45, ['ethos', 'pathos', 'logos', 'appeal', 'credibility', 'audience']),
  L('e8-4-3', 'e8-u4', '4.3', 'Evaluating Sources and Reasoning', ['E8-D1'],
    ['e8-credibility', 'e8-fallacies'],
    ['Judge the credibility of a source', 'Spot common faulty reasoning, such as the bandwagon and the false choice'],
    45, ['credible', 'primary source', 'secondary source', 'fallacy', 'generalization', 'false choice']),

  // ---------------- Unit 5: Media ----------------
  L('e8-5-1', 'e8-u5', '5.1', 'Film Techniques', ['E8-E1'],
    ['e8-camera-shots', 'e8-film-effects'],
    ['Name camera shots and angles', 'Explain how lighting, sound and editing shape a scene'],
    45, ['close-up', 'long shot', 'establishing shot', 'low angle', 'high angle', 'diegetic', 'montage']),
  L('e8-5-2', 'e8-u5', '5.2', 'News and Framing', ['E8-E1'],
    ['e8-news-opinion', 'e8-framing'],
    ['Tell news reports from opinion pieces and analysis', 'Explain how framing, sources and images shape a news story'],
    45, ['news report', 'editorial', 'opinion column', 'framing', 'source', 'caption']),

  // ---------------- Unit 6: Grammar and Punctuation ----------------
  L('e8-6-1', 'e8-u6', '6.1', 'Active and Passive Voice', ['E8-F1'],
    ['e8-voice', 'e8-voice-choice'],
    ['Tell active from passive voice', 'Choose the voice that suits the purpose of a sentence'],
    45, ['active voice', 'passive voice', 'subject', 'object', 'agent']),
  L('e8-6-2', 'e8-u6', '6.2', 'Misplaced and Dangling Modifiers', ['E8-F1'],
    ['e8-misplaced-modifiers', 'e8-dangling-modifiers'],
    ['Find and fix misplaced modifiers', 'Find and fix dangling modifiers'],
    45, ['modifier', 'misplaced modifier', 'dangling modifier', 'phrase']),
  L('e8-6-3', 'e8-u6', '6.3', 'Parallel Structure', ['E8-F1'],
    ['e8-parallelism', 'e8-parallel-fix'],
    ['Recognize parallel structure in lists and comparisons', 'Revise sentences that break parallel structure'],
    45, ['parallel structure', 'list', 'correlative conjunction', 'balance']),
  L('e8-6-4', 'e8-u6', '6.4', 'Semicolons and Colons', ['E8-F2'],
    ['e8-semicolons', 'e8-colons'],
    ['Use semicolons to join clauses and separate complex list items', 'Use colons to introduce lists, explanations and quotations'],
    45, ['semicolon', 'colon', 'independent clause', 'conjunctive adverb']),

  // ---------------- Unit 7: Writing ----------------
  L('e8-7-1', 'e8-u7', '7.1', 'The Argument Essay', ['E8-G1'],
    ['e8-argument-thesis', 'e8-rebuttal'],
    ['Write a precise, arguable thesis for an argument essay', 'Concede and rebut a counterargument'],
    45, ['thesis', 'argument', 'counterargument', 'concession', 'rebuttal']),
  L('e8-7-2', 'e8-u7', '7.2', 'The Literary Paragraph', ['E8-G1'],
    ['e8-embed-quotes', 'e8-analysis'],
    ['Embed short quotations smoothly in your own sentences', 'Explain evidence with analysis rather than summary'],
    45, ['point', 'evidence', 'analysis', 'embedded quotation', 'summary']),
  L('e8-7-3', 'e8-u7', '7.3', 'Narrative Voice', ['E8-G2'],
    ['e8-narrative-voice', 'e8-dialogue-craft'],
    ['Keep a consistent point of view and tense in a narrative', 'Write dialogue that reveals character and builds tension'],
    45, ['voice', 'point of view', 'tense', 'dialogue', 'subtext']),
  L('e8-7-4', 'e8-u7', '7.4', 'Using Research', ['E8-G2'],
    ['e8-integrate-sources', 'e8-citation'],
    ['Introduce and explain source material with signal phrases', 'Cite sources in the text and in a works-cited list'],
    45, ['signal phrase', 'in-text citation', 'works cited', 'paraphrase', 'quotation']),
];

export const UNITS: UnitMeta[] = [
  { id: 'e8-u1', number: 1, title: 'Fiction', description: 'Plot and subplot, irony, narrators, and theme across texts.', outcomes: ['E8-A1', 'E8-A2'], lessons: [], color: 'rose' },
  { id: 'e8-u2', number: 2, title: 'Poetry', description: 'Figurative language, form and metre, and tone and shifts, with poems by Shelley, Dickinson, Frost, Langston Hughes and others.', outcomes: ['E8-B1'], lessons: [], color: 'sky' },
  { id: 'e8-u3', number: 3, title: 'A Midsummer Night’s Dream', description: 'Shakespeare’s comedy of lovers, fairies and amateur actors: its plot and characters, its language, and how it works as a comedy.', outcomes: ['E8-C1'], lessons: [], color: 'violet' },
  { id: 'e8-u4', number: 4, title: 'Non-fiction', description: 'Building an argument, ethos, pathos and logos, and evaluating sources and reasoning.', outcomes: ['E8-D1'], lessons: [], color: 'amber' },
  { id: 'e8-u5', number: 5, title: 'Media', description: 'Film techniques, and how news is framed.', outcomes: ['E8-E1'], lessons: [], color: 'orange' },
  { id: 'e8-u6', number: 6, title: 'Grammar and Punctuation', description: 'Active and passive voice, modifiers, parallel structure, and semicolons and colons.', outcomes: ['E8-F1', 'E8-F2'], lessons: [], color: 'emerald' },
  { id: 'e8-u7', number: 7, title: 'Writing', description: 'The argument essay, the literary paragraph, narrative voice, and using research.', outcomes: ['E8-G1', 'E8-G2'], lessons: [], color: 'teal' },
];

for (const u of UNITS) u.lessons = LESSONS.filter((l) => l.unitId === u.id).map((l) => l.id);

export const ENG8: CourseMeta = {
  id: 'eng-8',
  title: 'Grade 8 English',
  shortTitle: 'English 8',
  grade: 8,
  subject: 'English',
  description: 'English for Grade 8: plot, irony, narrators and theme in fiction; figurative language, form and tone in poetry; Shakespeare’s A Midsummer Night’s Dream; argument, rhetorical appeals and sources; film and news; voice, modifiers, parallel structure, semicolons and colons; and argument, literary, narrative and research writing.',
  outcomes: OUTCOMES,
  units: UNITS,
  lessons: LESSONS,
};
