/**
 * UK English as schools in England teach it: the two GCSEs of Years 10 and 11.
 *
 * GCSE English Language: reading unseen fiction and non-fiction and writing for a purpose. Each
 * unit names the assessment objectives it serves (AO1 finding and synthesising information, AO2
 * language and structure, AO3 comparing viewpoints, AO4 evaluating, AO5 content and organisation
 * of writing, AO6 technical accuracy).
 *
 * GCSE English Literature: a Shakespeare play, a nineteenth-century novel, a modern text and
 * poetry. Gradileo quotes only texts in the public domain, from the editions each lesson credits;
 * the modern texts and the anthology poems still in copyright are taught in our own words, crediting
 * their writers, and never quoted. The anthology clusters mapped are Power and Conflict and Love and
 * Relationships (AQA's Worlds and Lives cluster is not taught yet).
 * A level English is not mapped yet.
 */
import type { MapCourse } from './build.ts';

export const UK_ENGLISH_COURSES: MapCourse[] = [
  {
    id: 'uk-gcse-english-language',
    title: 'GCSE English Language (UK)',
    shortTitle: 'GCSE English Language',
    grade: 10,
    subject: 'English',
    description: 'Reading fiction and non-fiction closely, analysing language and structure, evaluating a text, and descriptive, narrative and viewpoint writing with accurate sentences, in the order of a Year 10 and 11 scheme of work.',
    units: [
      { title: 'Reading Fiction: Language', description: 'How a writer’s words create character, setting, mood and a narrator’s voice: imagery, word choice and sentence forms (AO1, AO2).', members: ['e10-1-2', 'e10-1-3', 'e10-1-4', 'e10-2-1', 'e9-1-4', 'e10-7-5'] },
      { title: 'Reading Fiction: Structure', description: 'How a text is built to interest the reader: openings, plot and conflict, foreshadowing and flashback, shifts of focus and the control of pace (AO2).', members: ['e10-1-1', 'e7-1-4', 'e9-1-1', 'e11-1-1'] },
      { title: 'Responding to a Text', description: 'Themes, symbols and irony, a personal response that is more than a summary, and a paragraph of point, evidence and analysis with quotations, and evaluating a statement about a text (AO4).', members: ['e10-1-5', 'e10-6-1', 'e8-7-2', 'ex-1-1'] },
      { title: 'Reading Non-fiction: Viewpoints and Perspectives', description: 'Purpose and audience, summarising, argument and evidence, bias, the rhetorical methods of articles, essays and speeches, summarising and comparing two texts, and reading nineteenth-century non-fiction (AO1, AO2, AO3).', members: ['e6-3-1', 'ex-1-2', 'e10-4-1', 'e10-4-2', 'e10-4-3', 'e9-4-1', 'e9-4-2', 'e10-4-4', 'ex-1-3', 'ex-3-1'] },
      { title: 'Descriptive and Narrative Writing', description: 'Describing a picture, showing rather than telling, sensory detail, a consistent voice and tense, dialogue, and the control of pace (AO5).', members: ['e10-6-4', 'ex-3-2', 'e7-7-3', 'e8-7-3'] },
      { title: 'Writing to Present a Viewpoint', description: 'Taking a position, organising reasons and evidence, answering the other side, the forms of the article, the letter and the speech, planning under a time limit and revising (AO5).', members: ['e10-6-3', 'e8-7-1', 'ex-2-1', 'e10-6-6', 'e10-6-5'] },
      { title: 'Technical Accuracy', description: 'Spelling, secure sentences, punctuation, agreement, modifiers and parallel structure, and varying sentences and punctuation for effect (AO6).', members: ['ex-4-1', 'e10-7-1', 'e10-7-2', 'e10-7-3', 'e10-7-4', 'e9-6-2', 'e9-6-4'] },
      { title: 'Spoken Language', description: 'Giving a presentation in standard English, and answering the audience’s questions (the separately endorsed spoken language assessment).', members: ['ex-4-2'] },
    ],
    gaps: [],
  },
  {
    id: 'uk-gcse-english-literature',
    title: 'GCSE English Literature (UK)',
    shortTitle: 'GCSE English Literature',
    grade: 10,
    subject: 'English',
    description: 'A Shakespeare play (Romeo and Juliet, Macbeth, The Tempest, Much Ado About Nothing, The Merchant of Venice or Julius Caesar), a nineteenth-century novel, a modern text (An Inspector Calls, Blood Brothers, Lord of the Flies or Animal Farm), the anthology poems of Power and Conflict and of Love and Relationships, the methods of poetry, unseen poems and comparing poems, and writing about literature, in the order of a Year 10 and 11 scheme of work.',
    units: [
      { title: 'Shakespeare: Romeo and Juliet', description: 'Shakespeare’s language, the characters and their motives, soliloquy and dramatic irony, and the themes of the play.', members: ['e10-u3'] },
      { title: 'Shakespeare: Macbeth', description: 'The language and imagery of the play, ambition and character, the supernatural and the play’s dramatic devices, and tragedy and theme.', members: ['e11-u3'] },
      { title: 'Shakespeare: The Tempest', description: 'The plot and its characters, power, freedom and forgiveness, and soliloquies, songs and staging.', members: ['e9-u3'] },
      { title: 'Shakespeare: Much Ado About Nothing', description: 'The characters and plot, the “merry war” of Beatrice and Benedick, deception, honour and the place of women, and comedy.', members: ['ex-7-1'] },
      { title: 'Shakespeare: The Merchant of Venice', description: 'The characters and plot, Shylock and the play’s prejudice, mercy and justice in the trial, the caskets, and the play in its context.', members: ['ex-7-2'] },
      { title: 'Shakespeare: Julius Caesar', description: 'The characters and plot, power and ambition, honour and betrayal, the rhetoric of the funeral speeches, and tragedy.', members: ['ex-7-3'] },
      { title: 'The Nineteenth-Century Novel: A Christmas Carol', description: 'Scrooge and the Cratchits, the five staves, greed, poverty and redemption, and Dickens’s purpose in 1843.', members: ['ex-5-1'] },
      { title: 'The Nineteenth-Century Novel: The Strange Case of Dr Jekyll and Mr Hyde', description: 'Jekyll, Hyde and Utterson, the mystery and its two letters, duality, reputation and the primitive, and Victorian London.', members: ['ex-5-2'] },
      { title: 'The Nineteenth-Century Novel: Great Expectations', description: 'Pip, Joe, Magwitch and Miss Havisham, class and ambition, wealth and loyalty, and the older narrator looking back.', members: ['ex-5-3'] },
      { title: 'The Nineteenth-Century Novel: Frankenstein', description: 'Victor and the creature, the frame narrative, dangerous knowledge, rejection and revenge, and the Gothic.', members: ['ex-6-1'] },
      { title: 'The Nineteenth-Century Novel: Jane Eyre', description: 'Jane, Rochester and St John, the five homes of the plot, independence, class and gender, and the first-person narrator.', members: ['ex-6-2'] },
      { title: 'The Nineteenth-Century Novel: Pride and Prejudice', description: 'Elizabeth and Darcy, first impressions, marriage and money, class, and Austen’s irony.', members: ['ex-6-3'] },
      { title: 'The Nineteenth-Century Novel: The Sign of Four', description: 'Holmes, Watson and Jonathan Small, reason and detection, greed and treasure, and the novel and the British Empire.', members: ['ex-6-4'] },
      { title: 'Modern Drama: An Inspector Calls', description: 'The Birlings, Gerald and the Inspector, the chain of events that led to a young woman’s death, social responsibility and class, and Priestley’s purpose in 1945.', members: ['ex-10-1'] },
      { title: 'Modern Drama: Blood Brothers', description: 'Mrs Johnstone, Mrs Lyons and the twins, the Narrator and the songs, class, fate and superstition, and the play’s Liverpool setting.', members: ['ex-10-2'] },
      { title: 'Modern Prose: Lord of the Flies', description: 'Ralph, Jack, Piggy and Simon, the island and the beast, civilisation and savagery, and Golding’s view of human nature after the Second World War.', members: ['ex-10-3'] },
      { title: 'Modern Prose: Animal Farm', description: 'The pigs and the other animals, the revolution and its betrayal, propaganda and power, and Orwell’s allegory of the Russian Revolution.', members: ['ex-10-4'] },
      { title: 'Poetry: Language, Form and Structure', description: 'Imagery and figurative language, sound and rhythm, form, the sonnet, the speaker’s voice and irony.', members: ['e10-2-1', 'e10-2-2', 'e10-2-3', 'e11-2-2', 'e11-2-3'] },
      { title: 'Anthology Poetry: Power and Conflict', description: 'The fifteen poems of the cluster, from Ozymandias and London to Remains and Kamikaze: what each is about, its form and methods, its themes and its context, and comparing poems.', members: ['ex-8-1', 'ex-8-2', 'ex-8-3'] },
      { title: 'Anthology Poetry: Love and Relationships', description: 'The fifteen poems of the cluster, from When We Two Parted and Porphyria’s Lover to Follower and Singh Song!: what each is about, its form and methods, its themes and its context, and comparing poems.', members: ['ex-9-1', 'ex-9-2', 'ex-9-3'] },
      { title: 'Unseen Poetry and Comparing Poems', description: 'Reading a poem closely, approaching a poem never read before, comparing two poems, and poems of war and conflict.', members: ['e10-2-4', 'e12-2-4', 'e11-2-4', 'e12-2-2'] },
      { title: 'Writing About Literature', description: 'A thesis, evidence and analysis, the literary essay, a text in its context, the comparative essay and the essay written under a time limit.', members: ['e10-6-2', 'e11-6-1', 'e12-1-2', 'e11-6-2', 'e11-6-6'] },
    ],
    gaps: [],
  },
];
