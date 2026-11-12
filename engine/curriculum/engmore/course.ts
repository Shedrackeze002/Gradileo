/**
 * More English Topics: lessons that other school systems' English courses teach and Gradileo's own
 * grade courses do not (roadmap item 5, step 4, "fill the gaps"). The curriculum maps file these
 * lessons into their courses (evaluating a statement and comparing two texts in GCSE English
 * Language), and Browse by topic lists them with the other lessons of their topics. It is not a
 * course to take on its own, so it is not offered in the course pickers (`extra`), and each lesson
 * carries its own level (`grade`). Units 1 to 4 use texts written for these lessons; Units 5 to 7
 * teach the GCSE English Literature set texts in the public domain, quoting each word for word from
 * its Project Gutenberg edition. Units 8 and 9 teach two clusters of the AQA poetry anthology,
 * quoting only the poems in the public domain, and Unit 10 teaches four modern texts. Works still in
 * copyright are described in our own words and never quoted, and every lesson credits its sources.
 */
import type { CourseMeta, LessonMeta, Outcome, UnitMeta } from '../../types.ts';

export const OUTCOMES: Outcome[] = [
  { code: 'RE1', strand: 'Evaluating and comparing texts', text: 'Evaluate a statement about a text: weigh the evidence for and against it, explain the writer’s methods and reach a judgement.' },
  { code: 'RE2', strand: 'Evaluating and comparing texts', text: 'Summarise the differences between two texts, with evidence from each and an inference.' },
  { code: 'RE3', strand: 'Evaluating and comparing texts', text: 'Compare two writers’ viewpoints and the methods each uses to convey them.' },
  { code: 'WF1', strand: 'Writing in a form', text: 'Write to present a viewpoint as an article, a formal letter or a speech, with the features, structure and register that suit the form and its audience.' },
  { code: 'RN1', strand: 'Nineteenth-century non-fiction and description', text: 'Read nineteenth-century non-fiction: work out older words and long sentences, find information, infer the writer’s attitude and explain the effect of the language.' },
  { code: 'WD1', strand: 'Nineteenth-century non-fiction and description', text: 'Write a description from a picture, with precise and sensory detail, imagery, and a structure that moves from the wide view to a small detail.' },
  { code: 'SP1', strand: 'Spelling and spoken language', text: 'Spell homophones, commonly misspelt words and words with suffixes correctly.' },
  { code: 'SL1', strand: 'Spoken language', text: 'Give a presentation in standard English, and answer the audience’s questions politely and directly.' },
  { code: 'LN1', strand: 'Literature: nineteenth-century novels', text: 'Know the characters and the plot of a nineteenth-century novel, and who says its key lines.' },
  { code: 'LN2', strand: 'Literature: nineteenth-century novels', text: 'Explain how key quotations from a nineteenth-century novel show its themes, and relate the novel to its context and the writer’s methods.' },
  { code: 'LS1', strand: 'Literature: Shakespeare', text: 'Know the characters and the plot of a Shakespeare play, and who speaks its key lines.' },
  { code: 'LS2', strand: 'Literature: Shakespeare', text: 'Explain how key quotations from a Shakespeare play show its themes, and relate the play to its context and Shakespeare’s methods.' },
  { code: 'LP1', strand: 'Literature: poetry anthology', text: 'Know what each poem of an anthology cluster is about, who wrote it, and which poem key lines come from.' },
  { code: 'LP2', strand: 'Literature: poetry anthology', text: 'Explain the themes, form and methods of the poems of an anthology cluster, compare poems that share a theme, and relate each poem to its context.' },
  { code: 'LM1', strand: 'Literature: modern prose and drama', text: 'Know the characters and the plot of a modern play or novel.' },
  { code: 'LM2', strand: 'Literature: modern prose and drama', text: 'Explain how key moments of a modern play or novel show its themes, and relate the text to its context and the writer’s methods.' },
];

const L = (
  id: string,
  unitId: string,
  number: string,
  title: string,
  grade: number,
  outcomes: string[],
  skills: string[],
  objectives: string[],
  vocabulary: string[] = [],
): LessonMeta => ({ id, unitId, number, title, grade, outcomes, skills, objectives, minutes: 60, vocabulary });

export const LESSONS: LessonMeta[] = [
  // ---------------- Unit 1: Evaluating and Comparing Texts ----------------
  L('ex-1-1', 'ex-u1', '1.1', 'Evaluating a Statement: How Far Do You Agree?', 10, ['RE1'],
    ['ex-evaluate-evidence', 'ex-evaluate-response'],
    ['Choose the evidence that supports a statement about a text, and the evidence that challenges it', 'Write an evaluation that judges the statement, quotes the text and explains the writer’s methods'],
    ['evaluate', 'statement', 'evidence', 'method', 'judgement']),
  L('ex-1-2', 'ex-u1', '1.2', 'Summarising the Differences between Two Texts', 10, ['RE2'],
    ['ex-summary-difference', 'ex-summary-inference'],
    ['State a difference between two texts and support it with a quotation from each', 'Select only the details the question asks about, and infer what they suggest'],
    ['summary', 'synthesis', 'inference', 'source']),
  L('ex-1-3', 'ex-u1', '1.3', 'Comparing Writers’ Viewpoints and Methods', 10, ['RE3'],
    ['ex-compare-viewpoints', 'ex-compare-methods'],
    ['Identify each writer’s viewpoint and attitude, and compare them', 'Compare the methods two writers use to convey their viewpoints'],
    ['viewpoint', 'attitude', 'tone', 'method', 'comparison']),

  // ---------------- Unit 2: Writing in a Form ----------------
  L('ex-2-1', 'ex-u2', '2.1', 'Writing an Article, a Letter and a Speech', 10, ['WF1'],
    ['ex-form-features', 'ex-form-register'],
    ['Use the features and structure of an article, a formal letter and a speech', 'Match the register of the writing to its audience'],
    ['form', 'audience', 'purpose', 'register', 'headline', 'sign-off']),

  // ---------------- Unit 3: Nineteenth-Century Non-fiction and Description ----------------
  L('ex-3-1', 'ex-u3', '3.1', 'Reading Nineteenth-Century Non-fiction', 10, ['RN1'],
    ['ex-c19-language', 'ex-c19-inference'],
    ['Work out the meaning of older words and long sentences from their context', 'Find information, infer the writer’s attitude, and use the text as evidence about its time'],
    ['context', 'archaic', 'attitude', 'inference', 'irony']),
  L('ex-3-2', 'ex-u3', '3.2', 'Descriptive Writing from a Picture', 10, ['WD1'],
    ['ex-describe-detail', 'ex-describe-craft'],
    ['Choose and describe details that fit a picture, and plan from the wide view to a small detail', 'Use imagery and the senses, show rather than tell, and revise for precision'],
    ['description', 'sensory detail', 'imagery', 'show, not tell', 'cyclical structure']),

  // ---------------- Unit 4: Spelling and Spoken Language ----------------
  L('ex-4-1', 'ex-u4', '4.1', 'Spelling', 9, ['SP1'],
    ['ex-spelling-homophones', 'ex-spelling-words'],
    ['Choose the right homophone for the sentence', 'Spell commonly misspelt words, and apply the rules for suffixes and plurals'],
    ['homophone', 'suffix', 'plural', 'silent e']),
  L('ex-4-2', 'ex-u4', '4.2', 'Spoken Language: Presenting and Answering Questions', 10, ['SL1'],
    ['ex-presentation', 'ex-spoken-questions'],
    ['Plan and deliver a presentation that holds an audience', 'Use standard English, and answer questions politely and directly'],
    ['presentation', 'signposting', 'standard English', 'eye contact']),

  // ---------------- Unit 5: Nineteenth-Century Novels: Dickens and Stevenson ----------------
  L('ex-5-1', 'ex-u5', '5.1', 'A Christmas Carol', 10, ['LN1', 'LN2'],
    ['ex-carol-plot', 'ex-carol-themes'],
    ['Know who the characters of A Christmas Carol are, the order of the main events, and who says the key lines', 'Explain what key quotations show about the novella’s themes, and relate the novella to its context and the writer’s methods'],
    ['Stave', 'miser', 'redemption', 'allegory', 'Poor Law']),
  L('ex-5-2', 'ex-u5', '5.2', 'The Strange Case of Dr Jekyll and Mr Hyde', 10, ['LN1', 'LN2'],
    ['ex-jekyll-plot', 'ex-jekyll-themes'],
    ['Know who the characters of Dr Jekyll and Mr Hyde are, the order of the main events, and who says the key lines', 'Explain what key quotations show about the novella’s themes, and relate the novella to its context and the writer’s methods'],
    ['duality', 'respectability', 'Gothic', 'repression', 'degeneration']),
  L('ex-5-3', 'ex-u5', '5.3', 'Great Expectations', 10, ['LN1', 'LN2'],
    ['ex-expectations-plot', 'ex-expectations-themes'],
    ['Know who the characters of Great Expectations are, the order of the main events, and who says the key lines', 'Explain what key quotations show about the novel’s themes, and relate the novel to its context and the writer’s methods'],
    ['expectations', 'gentleman', 'benefactor', 'bildungsroman', 'serial']),

  // ---------------- Unit 6: Nineteenth-Century Novels: Shelley, Brontë, Austen and Conan Doyle ----------------
  L('ex-6-1', 'ex-u6', '6.1', 'Frankenstein', 10, ['LN1', 'LN2'],
    ['ex-frankenstein-plot', 'ex-frankenstein-themes'],
    ['Know who the characters of Frankenstein are, the order of the main events, and who says the key lines', 'Explain what key quotations show about the novel’s themes, and relate the novel to its context and the writer’s methods'],
    ['frame narrative', 'Gothic', 'sublime', 'galvanism', 'Prometheus']),
  L('ex-6-2', 'ex-u6', '6.2', 'Jane Eyre', 10, ['LN1', 'LN2'],
    ['ex-jane-eyre-plot', 'ex-jane-eyre-themes'],
    ['Know who the characters of Jane Eyre are, the order of the main events, and who says the key lines', 'Explain what key quotations show about the novel’s themes, and relate the novel to its context and the writer’s methods'],
    ['governess', 'first-person narrator', 'independence', 'Gothic', 'bildungsroman']),
  L('ex-6-3', 'ex-u6', '6.3', 'Pride and Prejudice', 10, ['LN1', 'LN2'],
    ['ex-pride-plot', 'ex-pride-themes'],
    ['Know who the characters of Pride and Prejudice are, the order of the main events, and who says the key lines', 'Explain what key quotations show about the novel’s themes, and relate the novel to its context and the writer’s methods'],
    ['irony', 'entail', 'first impressions', 'gentry', 'free indirect speech']),
  L('ex-6-4', 'ex-u6', '6.4', 'The Sign of Four', 10, ['LN1', 'LN2'],
    ['ex-sign-of-four-plot', 'ex-sign-of-four-themes'],
    ['Know who the characters of The Sign of Four are, the order of the main events, and who says the key lines', 'Explain what key quotations show about the novel’s themes, and relate the novel to its context and the writer’s methods'],
    ['deduction', 'detective fiction', 'Empire', 'narrator', 'red herring']),

  // ---------------- Unit 7: Shakespeare: Comedy, Justice and Tragedy ----------------
  L('ex-7-1', 'ex-u7', '7.1', 'Much Ado About Nothing', 10, ['LS1', 'LS2'],
    ['ex-much-ado-plot', 'ex-much-ado-themes'],
    ['Know who the characters of Much Ado About Nothing are, the order of the main events, and who says the key lines', 'Explain what key quotations show about the play’s themes, and relate the play to its context and the writer’s methods'],
    ['comedy', 'wit', 'deception', 'honour', 'prose and verse']),
  L('ex-7-2', 'ex-u7', '7.2', 'The Merchant of Venice', 10, ['LS1', 'LS2'],
    ['ex-merchant-plot', 'ex-merchant-themes'],
    ['Know who the characters of The Merchant of Venice are, the order of the main events, and who says the key lines', 'Explain what key quotations show about the play’s themes, and relate the play to its context and the writer’s methods'],
    ['usury', 'antisemitism', 'mercy', 'bond', 'comedy']),
  L('ex-7-3', 'ex-u7', '7.3', 'Julius Caesar', 10, ['LS1', 'LS2'],
    ['ex-caesar-plot', 'ex-caesar-themes'],
    ['Know who the characters of Julius Caesar are, the order of the main events, and who says the key lines', 'Explain what key quotations show about the play’s themes, and relate the play to its context and the writer’s methods'],
    ['rhetoric', 'conspiracy', 'tragic hero', 'omen', 'republic']),

  // ---------------- Unit 8: Poetry Anthology: Power and Conflict ----------------
  L('ex-8-1', 'ex-u8', '8.1', 'Power and Conflict: Ozymandias, London and The Prelude', 10, ['LP1', 'LP2'],
    ['ex-power-1-poems', 'ex-power-1-themes'],
    ['Know what Ozymandias, London and the extract from The Prelude are about, and which poem key lines come from', 'Explain the themes key lines show, compare the poems with others in the cluster, and relate them to their context'],
    ['Romantic', 'sonnet', 'irony', 'dramatic monologue', 'sublime']),
  L('ex-8-2', 'ex-u8', '8.2', 'Power and Conflict: My Last Duchess, The Charge of the Light Brigade and Exposure', 10, ['LP1', 'LP2'],
    ['ex-power-2-poems', 'ex-power-2-themes'],
    ['Know what My Last Duchess, The Charge of the Light Brigade and Exposure are about, and which poem key lines come from', 'Explain the themes key lines show, compare the poems with others in the cluster, and relate them to their context'],
    ['dramatic monologue', 'enjambment', 'dactyl', 'pararhyme', 'refrain']),
  L('ex-8-3', 'ex-u8', '8.3', 'Power and Conflict: the Modern Poems', 10, ['LP1', 'LP2'],
    ['ex-power-3-poems', 'ex-power-3-methods'],
    ['Know who wrote each of the more recent Power and Conflict poems and what each is about', 'Explain the form and key moments of each poem, and relate it to its context'],
    ['free verse', 'persona', 'in medias res', 'volta', 'caesura']),

  // ---------------- Unit 9: Poetry Anthology: Love and Relationships ----------------
  L('ex-9-1', 'ex-u9', '9.1', 'Love and Relationships: When We Two Parted, Love’s Philosophy and Porphyria’s Lover', 10, ['LP1', 'LP2'],
    ['ex-love-1-poems', 'ex-love-1-themes'],
    ['Know what When We Two Parted, Love’s Philosophy and Porphyria’s Lover are about, and which poem key lines come from', 'Explain the themes key lines show, compare the poems with others in the cluster, and relate them to their context'],
    ['Romantic', 'personification', 'rhetorical question', 'dramatic monologue', 'pathetic fallacy']),
  L('ex-9-2', 'ex-u9', '9.2', 'Love and Relationships: Sonnet 29, Neutral Tones and The Farmer’s Bride', 10, ['LP1', 'LP2'],
    ['ex-love-2-poems', 'ex-love-2-themes'],
    ['Know what Sonnet 29, Neutral Tones and The Farmer’s Bride are about, and which poem key lines come from', 'Explain the themes key lines show, compare the poems with others in the cluster, and relate them to their context'],
    ['Petrarchan sonnet', 'extended metaphor', 'cyclical structure', 'dialect', 'simile']),
  L('ex-9-3', 'ex-u9', '9.3', 'Love and Relationships: the Modern Poems', 10, ['LP1', 'LP2'],
    ['ex-love-3-poems', 'ex-love-3-methods'],
    ['Know who wrote each of the more recent Love and Relationships poems and what each is about', 'Explain the form and key moments of each poem, and relate it to its context'],
    ['free verse', 'extended metaphor', 'sonnet', 'nostalgia', 'persona']),

  // ---------------- Unit 10: Modern Prose and Drama ----------------
  L('ex-10-1', 'ex-u10', '10.1', 'An Inspector Calls', 10, ['LM1', 'LM2'],
    ['ex-inspector-plot', 'ex-inspector-themes'],
    ['Know who the characters of An Inspector Calls are and the order of the main events', 'Explain what key moments show about the play’s themes, and relate the play to its context and the writer’s methods'],
    ['dramatic irony', 'social responsibility', 'capitalism', 'socialism', 'well-made play']),
  L('ex-10-2', 'ex-u10', '10.2', 'Blood Brothers', 10, ['LM1', 'LM2'],
    ['ex-blood-brothers-plot', 'ex-blood-brothers-themes'],
    ['Know who the characters of Blood Brothers are and the order of the main events', 'Explain what key moments show about the play’s themes, and relate the play to its context and the writer’s methods'],
    ['narrator', 'superstition', 'class', 'foreshadowing', 'musical']),
  L('ex-10-3', 'ex-u10', '10.3', 'Lord of the Flies', 10, ['LM1', 'LM2'],
    ['ex-lord-of-the-flies-plot', 'ex-lord-of-the-flies-themes'],
    ['Know who the characters of Lord of the Flies are, the order of the main events and the chapter each happens in', 'Explain what key moments show about the novel’s themes, and relate the novel to its context and the writer’s methods'],
    ['allegory', 'civilisation', 'savagery', 'symbol', 'microcosm']),
  L('ex-10-4', 'ex-u10', '10.4', 'Animal Farm', 10, ['LM1', 'LM2'],
    ['ex-animal-farm-plot', 'ex-animal-farm-themes'],
    ['Know who the characters of Animal Farm are, the order of the main events and the chapter each happens in', 'Explain what key moments show about the novella’s themes, and relate the novella to its context and the writer’s methods'],
    ['allegory', 'fable', 'propaganda', 'revolution', 'totalitarianism']),
];

export const UNITS: UnitMeta[] = [
  { id: 'ex-u1', number: 1, title: 'Evaluating and Comparing Texts', description: 'Evaluating a statement about a text, summarising the differences between two texts, and comparing two writers’ viewpoints and methods.', outcomes: ['RE1', 'RE2', 'RE3'], lessons: [], color: 'violet' },
  { id: 'ex-u2', number: 2, title: 'Writing in a Form', description: 'The article, the formal letter and the speech: their features, their structure and the register that suits the audience.', outcomes: ['WF1'], lessons: [], color: 'rose' },
  { id: 'ex-u3', number: 3, title: 'Nineteenth-Century Non-fiction and Description', description: 'Reading letters, diaries, reports and advice from the nineteenth century, and writing a description from a picture.', outcomes: ['RN1', 'WD1'], lessons: [], color: 'amber' },
  { id: 'ex-u4', number: 4, title: 'Spelling and Spoken Language', description: 'Homophones, tricky words and the rules for suffixes, and giving a presentation and answering questions in standard English.', outcomes: ['SP1', 'SL1'], lessons: [], color: 'sky' },
  { id: 'ex-u5', number: 5, title: 'Nineteenth-Century Novels: Dickens and Stevenson', description: 'A Christmas Carol, The Strange Case of Dr Jekyll and Mr Hyde and Great Expectations: their characters and plots, key quotations and themes, and their context.', outcomes: ['LN1', 'LN2'], lessons: [], color: 'emerald' },
  { id: 'ex-u6', number: 6, title: 'Nineteenth-Century Novels: Shelley, Brontë, Austen and Conan Doyle', description: 'Frankenstein, Jane Eyre, Pride and Prejudice and The Sign of Four: their characters and plots, key quotations and themes, and their context.', outcomes: ['LN1', 'LN2'], lessons: [], color: 'teal' },
  { id: 'ex-u7', number: 7, title: 'Shakespeare: Comedy, Justice and Tragedy', description: 'Much Ado About Nothing, The Merchant of Venice and Julius Caesar: their characters and plots, key speeches and themes, and their context.', outcomes: ['LS1', 'LS2'], lessons: [], color: 'orange' },
  { id: 'ex-u8', number: 8, title: 'Poetry Anthology: Power and Conflict', description: 'The fifteen poems of the AQA Power and Conflict cluster: what each is about, its form, its themes and its context, with the poems in the public domain quoted from cited editions.', outcomes: ['LP1', 'LP2'], lessons: [], color: 'rose' },
  { id: 'ex-u9', number: 9, title: 'Poetry Anthology: Love and Relationships', description: 'The fifteen poems of the AQA Love and Relationships cluster: what each is about, its form, its themes and its context, with the poems in the public domain quoted from cited editions.', outcomes: ['LP1', 'LP2'], lessons: [], color: 'fuchsia' },
  { id: 'ex-u10', number: 10, title: 'Modern Prose and Drama', description: 'An Inspector Calls, Blood Brothers, Lord of the Flies and Animal Farm: their characters and plots, key moments and themes, and their context, discussed in our own words.', outcomes: ['LM1', 'LM2'], lessons: [], color: 'indigo' },
];
for (const u of UNITS) u.lessons = LESSONS.filter((l) => l.unitId === u.id).map((l) => l.id);

export const ENGMORE: CourseMeta = {
  id: 'eng-more',
  title: 'More English Topics',
  shortTitle: 'More English',
  grade: 10,
  subject: 'English',
  description: 'Topics that school systems around the world teach and Gradileo’s grade courses do not: evaluating a statement about a text, summarising and comparing two texts, writing an article, a formal letter and a speech, nineteenth-century non-fiction, descriptive writing, spelling and spoken language, and GCSE English Literature: seven nineteenth-century novels, three Shakespeare plays, two clusters of the AQA poetry anthology and four modern texts.',
  outcomes: OUTCOMES,
  units: UNITS,
  lessons: LESSONS,
  extra: true,
};
