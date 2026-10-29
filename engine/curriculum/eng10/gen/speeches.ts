/**
 * Short excerpts from public-domain speeches and essays, quoted exactly from Project Gutenberg and
 * Wikisource (wrapped lines joined, quotation marks and apostrophes made typographic). Each was
 * published before 1915 and its author died before 1930, so it is in the public domain everywhere.
 */

export interface Speech {
  speaker: string;
  /** The title as a citation gives it. */
  title: string;
  year: number;
  /** Where the full text can be read. */
  url: string;
  /** How a question names it in a sentence: “In ${lead} (year), ${speaker} says:”. */
  lead: string;
  /** A lead-in to use instead, when the text has no single speaker: “${selfIntro} says:”. */
  selfIntro?: string;
}

export interface Passage {
  speech: Speech;
  text: string;
}

export const GETTYSBURG: Speech = {
  speaker: 'Abraham Lincoln',
  title: 'the Gettysburg Address',
  year: 1863,
  url: 'https://en.wikisource.org/wiki/Gettysburg_Address_(Bliss_copy)',
  lead: 'the Gettysburg Address',
};
export const DOUGLASS: Speech = {
  speaker: 'Frederick Douglass',
  title: '“What to the Slave Is the Fourth of July?”',
  year: 1852,
  url: 'https://www.gutenberg.org/ebooks/202',
  lead: 'his speech “What to the Slave Is the Fourth of July?”',
};
export const TRUTH: Speech = {
  speaker: 'Sojourner Truth',
  title: 'speech at the Women’s Rights Convention in Akron, Ohio, as reported by Marius Robinson',
  year: 1851,
  url: 'https://en.wikisource.org/wiki/Sojourner_Truth%27s_Women%27s_Rights_Convention_Speech_(1851)',
  lead: 'her speech at the Women’s Rights Convention in Akron, Ohio',
};
export const PANKHURST: Speech = {
  speaker: 'Emmeline Pankhurst',
  title: '“Freedom or Death”',
  year: 1913,
  url: 'https://en.wikisource.org/wiki/Freedom_or_death',
  lead: 'her speech “Freedom or Death”',
};
export const SENTIMENTS: Speech = {
  speaker: 'Elizabeth Cady Stanton and others',
  title: 'the Declaration of Sentiments',
  year: 1848,
  url: 'https://en.wikisource.org/wiki/Declaration_of_Sentiments',
  lead: 'the Declaration of Sentiments',
  selfIntro: 'The Declaration of Sentiments (1848), written by Elizabeth Cady Stanton and others for the first women’s rights convention, at Seneca Falls, New York,',
};
export const SWIFT: Speech = {
  speaker: 'Jonathan Swift',
  title: '“A Modest Proposal”',
  year: 1729,
  url: 'https://www.gutenberg.org/ebooks/1080',
  lead: 'his essay “A Modest Proposal”',
};

export const SPEECHES: Speech[] = [GETTYSBURG, DOUGLASS, TRUTH, PANKHURST, SENTIMENTS, SWIFT];

const X = (speech: Speech, text: string): Passage => ({ speech, text });

/** The attribution line under a quoted passage. */
export const citeSpeech = (s: Speech) => `— ${s.speaker}, ${s.title} (${s.year})`;
/** A passage as a Markdown blockquote with its attribution. */
export const speechBlock = (p: Passage) => `> ${p.text}\n>\n> ${citeSpeech(p.speech)}`;
/** A question's lead-in: “In his speech “…” (1852), Frederick Douglass says:”. */
export const intro = (s: Speech, verb = 'says') => (s.selfIntro ? `${s.selfIntro} ${verb}:` : `In ${s.lead} (${s.year}), ${s.speaker} ${verb}:`);

// ---------------------------------------------------------------- Abraham Lincoln, the Gettysburg Address (Bliss copy)
export const GB_OPENING = X(GETTYSBURG, 'Four score and seven years ago our fathers brought forth, on this continent, a new nation, conceived in Liberty, and dedicated to the proposition that all men are created equal.');
export const GB_HALLOW = X(GETTYSBURG, 'But, in a larger sense, we can not dedicate—we can not consecrate—we can not hallow—this ground.');
export const GB_WORLD = X(GETTYSBURG, 'The world will little note, nor long remember what we say here, but it can never forget what they did here.');
export const GB_PEOPLE = X(GETTYSBURG, '… and that government of the people, by the people, for the people, shall not perish from the earth.');

// ---------------------------------------------------------------- Frederick Douglass, "What to the Slave Is the Fourth of July?"
export const FD_YOURS = X(DOUGLASS, 'This Fourth of July is *yours*, not mine. You may rejoice, I must mourn.');
export const FD_FIRE = X(DOUGLASS, 'For it is not light that is needed, but fire; it is not the gentle shower, but thunder.');
export const FD_STORM = X(DOUGLASS, 'We need the storm, the whirlwind, and the earthquake.');
export const FD_NATION = X(DOUGLASS, 'The feeling of the nation must be quickened; the conscience of the nation must be roused; the propriety of the nation must be startled; the hypocrisy of the nation must be exposed; and its crimes against God and man must be proclaimed and denounced.');
export const FD_FALSE = X(DOUGLASS, 'America is false to the past, false to the present, and solemnly binds herself to be false to the future.');
export const FD_PROVE = X(DOUGLASS, 'Must I undertake to prove that the slave is a man? That point is conceded already. Nobody doubts it.');
export const FD_ARGUE = X(DOUGLASS, 'Would you have me argue that man is entitled to liberty? that he is the rightful owner of his own body? You have already declared it.');
export const FD_VIRGINIA = X(DOUGLASS, 'There are seventy-two crimes in the state of Virginia, which, if committed by a black man (no matter how ignorant he be), subject him to the punishment of death; while only two of these same crimes will subject a white man to the like punishment.');
export const FD_WAIL = X(DOUGLASS, 'Fellow-citizens, above your national, tumultous joy, I hear the mournful wail of millions, whose chains, heavy and grievous yesterday, are to-day rendered more intolerable by the jubilant shouts that reach them.');

// ---------------------------------------------------------------- Sojourner Truth, speech at Akron (Robinson's 1851 report)
export const ST_MUSCLE = X(TRUTH, 'I have as much muscle as any man, and can do as much work as any man. I have plowed and reaped and husked and chopped and mowed, and can any man do more than that?');
export const ST_PINT = X(TRUTH, 'As for intellect, all I can say is, if women have a pint and man a quart — why can’t she have her little pint full?');

// ---------------------------------------------------------------- Emmeline Pankhurst, "Freedom or Death"
export const EP_SACRED = X(PANKHURST, 'Human life for us is sacred, but we say if any life is to be sacrificed it shall be ours; we won’t do it ourselves, but we will put the enemy in the position where they will have to choose between giving us freedom or giving us death.');
export const EP_VOTERS = X(PANKHURST, 'It is perfectly simple and perfectly easy for voting communities to get their grievances removed if they act in combination and make an example of the legislature by changing the composition of the legislature and sending better people to take the place of those who have failed to do justice.');

// ---------------------------------------------------------------- The Declaration of Sentiments
export const DS_TRUTHS = X(SENTIMENTS, 'We hold these truths to be self-evident; that all men and women are created equal; that they are endowed by their Creator with certain inalienable rights; that among these are life, liberty, and the pursuit of happiness …');
export const DS_HE_HAS = X(SENTIMENTS, 'He has never permitted her to exercise her inalienable right to the elective franchise. He has compelled her to submit to laws, in the formation of which she had no voice.');
export const DS_FACTS = X(SENTIMENTS, 'The history of mankind is a history of repeated injuries and usurpations on the part of man toward woman, having in direct object the establishment of an absolute tyranny over her. To prove this, let facts be submitted to a candid world.');

// ---------------------------------------------------------------- Jonathan Swift, "A Modest Proposal"
export const JS_PROPOSE = X(SWIFT, 'I shall now therefore humbly propose my own thoughts, which I hope will not be liable to the least objection.');

/** Every passage, by name (for the quotation check). */
export const PASSAGES: Record<string, Passage> = {
  GB_OPENING, GB_HALLOW, GB_WORLD, GB_PEOPLE,
  FD_YOURS, FD_FIRE, FD_STORM, FD_NATION, FD_FALSE, FD_PROVE, FD_ARGUE, FD_VIRGINIA, FD_WAIL,
  ST_MUSCLE, ST_PINT,
  EP_SACRED, EP_VOTERS,
  DS_TRUTHS, DS_HE_HAS, DS_FACTS,
  JS_PROPOSE,
};
