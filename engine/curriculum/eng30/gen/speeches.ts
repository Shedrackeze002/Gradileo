/**
 * Short excerpts from public-domain speeches, essays, satire and comedy for Grade 12 English, Units 4
 * and 5, quoted exactly from Project Gutenberg and Wikisource (wrapped lines joined, quotation marks
 * and apostrophes made typographic, double hyphens printed as dashes, and poem lines kept as lines).
 * Each was published before 1929 and its author died before 1955, so it is in the public domain
 * everywhere.
 */

export interface Work {
  author: string;
  /** The title as a citation gives it. */
  title: string;
  year: number;
  /** Where the full text can be read. */
  url: string;
  /** How a question names it in a sentence: “In ${lead} (year), ${author} says:”. */
  lead: string;
}

export interface Excerpt {
  work: Work;
  text: string;
  /** The speaker, for lines from a play. */
  speaker?: string;
}

export const SECOND_INAUGURAL: Work = {
  author: 'Abraham Lincoln',
  title: 'the Second Inaugural Address',
  year: 1865,
  url: 'https://www.gutenberg.org/ebooks/2659',
  lead: 'his Second Inaugural Address, given as the American Civil War was ending',
};
export const ATLANTA: Work = {
  author: 'Booker T. Washington',
  title: 'the Atlanta Exposition Address',
  year: 1895,
  url: 'https://www.gutenberg.org/ebooks/2376',
  lead: 'his Atlanta Exposition Address, given to a mostly white Southern audience',
};
export const SOLITUDE: Work = {
  author: 'Elizabeth Cady Stanton',
  title: '“The Solitude of Self”',
  year: 1892,
  url: 'https://en.wikisource.org/wiki/Solitude_of_Self',
  lead: '“The Solitude of Self”, an address to a committee of the United States Congress',
};
export const COMMON_SENSE: Work = {
  author: 'Thomas Paine',
  title: '*Common Sense*',
  year: 1776,
  url: 'https://www.gutenberg.org/ebooks/147',
  lead: 'his pamphlet *Common Sense*, which urged the American colonies to break from Britain',
};
export const CRISIS: Work = {
  author: 'Thomas Paine',
  title: '*The American Crisis*',
  year: 1776,
  url: 'https://www.gutenberg.org/ebooks/3741',
  lead: '*The American Crisis*, written after a run of defeats for the American army',
};
export const LIBERTY: Work = {
  author: 'John Stuart Mill',
  title: '*On Liberty*',
  year: 1859,
  url: 'https://www.gutenberg.org/ebooks/34901',
  lead: 'his essay *On Liberty*',
};
export const SOUTHERN_HORRORS: Work = {
  author: 'Ida B. Wells',
  title: '*Southern Horrors*',
  year: 1892,
  url: 'https://www.gutenberg.org/ebooks/14975',
  lead: '*Southern Horrors*, her investigation of how newspapers reported lynching',
};
export const EARNEST: Work = {
  author: 'Oscar Wilde',
  title: '*The Importance of Being Earnest*',
  year: 1895,
  url: 'https://www.gutenberg.org/ebooks/844',
  lead: 'his comedy *The Importance of Being Earnest*',
};
export const LOCK: Work = {
  author: 'Alexander Pope',
  title: '*The Rape of the Lock*',
  year: 1714,
  url: 'https://www.gutenberg.org/ebooks/9800',
  lead: 'his poem *The Rape of the Lock*, about a lord who snips a lock of a young woman’s hair',
};
export const GULLIVER: Work = {
  author: 'Jonathan Swift',
  title: '*Gulliver’s Travels*',
  year: 1726,
  url: 'https://www.gutenberg.org/ebooks/829',
  lead: '*Gulliver’s Travels*',
};

export const WORKS: Work[] = [SECOND_INAUGURAL, ATLANTA, SOLITUDE, COMMON_SENSE, CRISIS, LIBERTY, SOUTHERN_HORRORS, EARNEST, LOCK, GULLIVER];

const X = (work: Work, text: string, speaker?: string): Excerpt => ({ work, text, speaker });

/** The attribution line under a quoted passage. */
export const citeWork = (x: Excerpt) =>
  x.speaker ? `— ${x.speaker}, in ${x.work.author}, ${x.work.title} (${x.work.year})` : `— ${x.work.author}, ${x.work.title} (${x.work.year})`;
/** A passage as a Markdown blockquote with its attribution; a poem keeps its lines. */
export const workBlock = (x: Excerpt) => `${x.text.split('\n').map((l, i, all) => `> ${l}${i < all.length - 1 ? '\\' : ''}`).join('\n')}\n>\n> ${citeWork(x)}`;
/** A question's lead-in: “In his Second Inaugural Address … (1865), Abraham Lincoln says:”. */
export const leadIn = (w: Work, verb = 'writes') => `In ${w.lead} (${w.year}), ${w.author} ${verb}:`;

// ---------------------------------------------------------------- Abraham Lincoln, Second Inaugural Address
export const LI_BOTH = X(SECOND_INAUGURAL, 'Both parties deprecated war, but one of them would make war rather than let the nation survive, and the other would accept war rather than let it perish, and the war came.');
export const LI_BIBLE = X(SECOND_INAUGURAL, 'Both read the same Bible and pray to the same God, and each invokes His aid against the other.');
export const LI_JUDGE = X(SECOND_INAUGURAL, 'It may seem strange that any men should dare to ask a just God’s assistance in wringing their bread from the sweat of other men’s faces, but let us judge not, that we be not judged.');
export const LI_FONDLY = X(SECOND_INAUGURAL, 'Fondly do we hope, fervently do we pray, that this mighty scourge of war may speedily pass away.');
export const LI_MALICE = X(SECOND_INAUGURAL, 'With malice toward none, with charity for all, with firmness in the right as God gives us to see the right, let us strive on to finish the work we are in, to bind up the nation’s wounds, to care for him who shall have borne the battle and for his widow and his orphan …');

// ---------------------------------------------------------------- Booker T. Washington, Atlanta Exposition Address
export const BW_SHIP = X(ATLANTA, 'A ship lost at sea for many days suddenly sighted a friendly vessel. From the mast of the unfortunate vessel was seen a signal, “Water, water; we die of thirst!” The answer from the friendly vessel at once came back, “Cast down your bucket where you are.”');
export const BW_FINGERS = X(ATLANTA, 'In all things that are purely social we can be as separate as the fingers, yet one as the hand in all things essential to mutual progress.');
export const BW_DIGNITY = X(ATLANTA, 'No race can prosper till it learns that there is as much dignity in tilling a field as in writing a poem.');
export const BW_GRIEVANCES = X(ATLANTA, 'Nor should we permit our grievances to overshadow our opportunities.');

// ---------------------------------------------------------------- Elizabeth Cady Stanton, "The Solitude of Self"
export const ST_TWENTY = X(SOLITUDE, 'We have been speaking before Committees of the Judiciary for the last twenty years, and we have gone over all the arguments in favor of a sixteenth amendment which are familiar to all you gentlemen; therefore, it will not be necessary that I should repeat them again.');
export const ST_ALONE = X(SOLITUDE, 'We come into the world alone, unlike all who have gone before us; we leave it alone under circumstances peculiar to ourselves.');

// ---------------------------------------------------------------- Thomas Paine
export const PA_SOCIETY = X(COMMON_SENSE, 'Society in every state is a blessing, but government even in its best state is but a necessary evil; in its worst state an intolerable one …');
export const PA_ISLAND = X(COMMON_SENSE, '… there is something very absurd, in supposing a continent to be perpetually governed by an island.');
export const PA_TIMES = X(CRISIS, 'These are the times that try men’s souls. The summer soldier and the sunshine patriot will, in this crisis, shrink from the service of their country; but he that stands it now, deserves the love and thanks of man and woman.');
export const PA_TYRANNY = X(CRISIS, 'Tyranny, like hell, is not easily conquered; yet we have this consolation with us, that the harder the conflict, the more glorious the triumph.');

// ---------------------------------------------------------------- John Stuart Mill, On Liberty
export const MI_MINUS = X(LIBERTY, 'If all mankind minus one, were of one opinion, and only one person were of the contrary opinion, mankind would be no more justified in silencing that one person, than he, if he had the power, would be justified in silencing mankind.');
export const MI_INFALLIBILITY = X(LIBERTY, 'All silencing of discussion is an assumption of infallibility.');
export const MI_COLLISION = X(LIBERTY, 'If the opinion is right, they are deprived of the opportunity of exchanging error for truth: if wrong, they lose, what is almost as great a benefit, the clearer perception and livelier impression of truth, produced by its collision with error.');

// ---------------------------------------------------------------- Ida B. Wells, Southern Horrors
export const WE_PRESS = X(SOUTHERN_HORRORS, 'The people must know before they can act, and there is no educator to compare with the press.');
export const WE_PAPERS = X(SOUTHERN_HORRORS, 'The Afro-American papers are the only ones which will print the truth, and they lack means to employ agents and detectives to get at the facts.');

// ---------------------------------------------------------------- Oscar Wilde, The Importance of Being Earnest
export const WI_TRUTH = X(EARNEST, 'The truth is rarely pure and never simple.', 'Algernon');
export const WI_STYLE = X(EARNEST, 'In matters of grave importance, style, not sincerity is the vital thing.', 'Gwendolen');
export const WI_PARENT = X(EARNEST, 'To lose one parent, Mr. Worthing, may be regarded as a misfortune; to lose both looks like carelessness.', 'Lady Bracknell');
export const WI_SMOKE = X(EARNEST, 'I am glad to hear it. A man should always have an occupation of some kind. There are far too many idle men in London as it is.', 'Lady Bracknell');
export const WI_IGNORANCE = X(EARNEST, 'Fortunately in England, at any rate, education produces no effect whatsoever. If it did, it would prove a serious danger to the upper classes, and probably lead to acts of violence in Grosvenor Square.', 'Lady Bracknell');
export const WI_SOCIETY = X(EARNEST, 'Never speak disrespectfully of Society, Algernon. Only people who can’t get into it do that.', 'Lady Bracknell');
export const WI_ENGAGEMENTS = X(EARNEST, 'To speak frankly, I am not in favour of long engagements. They give people the opportunity of finding out each other’s character before marriage, which I think is never advisable.', 'Lady Bracknell');
export const WI_FICTION = X(EARNEST, 'The good ended happily, and the bad unhappily. That is what Fiction means.', 'Miss Prism');

// ---------------------------------------------------------------- Alexander Pope, The Rape of the Lock
export const PO_OPENING = X(LOCK, 'What dire offence from am’rous causes springs,\nWhat mighty contests rise from trivial things,');
export const PO_STAIN = X(LOCK, 'Or stain her honour or her new brocade;\nForget her pray’rs, or miss a masquerade;\nOr lose her heart, or necklace, at a ball;');
export const PO_ANNA = X(LOCK, 'Here thou, great Anna! whom three realms obey,\nDost sometimes counsel take—and sometimes tea.');

// ---------------------------------------------------------------- Jonathan Swift, Gulliver's Travels
export const GU_EGGS = X(GULLIVER, 'It is computed that eleven thousand persons have at several times suffered death, rather than submit to break their eggs at the smaller end.');
export const GU_VERMIN = X(GULLIVER, '… I cannot but conclude the bulk of your natives to be the most pernicious race of little odious vermin that nature ever suffered to crawl upon the surface of the earth.');
export const GU_CUCUMBERS = X(GULLIVER, 'He had been eight years upon a project for extracting sunbeams out of cucumbers, which were to be put in phials hermetically sealed, and let out to warm the air in raw inclement summers.');

/** Every excerpt, by name (for the quotation check). */
export const EXCERPTS: Record<string, Excerpt> = {
  LI_BOTH, LI_BIBLE, LI_JUDGE, LI_FONDLY, LI_MALICE,
  BW_SHIP, BW_FINGERS, BW_DIGNITY, BW_GRIEVANCES,
  ST_TWENTY, ST_ALONE,
  PA_SOCIETY, PA_ISLAND, PA_TIMES, PA_TYRANNY,
  MI_MINUS, MI_INFALLIBILITY, MI_COLLISION,
  WE_PRESS, WE_PAPERS,
  WI_TRUTH, WI_STYLE, WI_PARENT, WI_SMOKE, WI_IGNORANCE, WI_SOCIETY, WI_ENGAGEMENTS, WI_FICTION,
  PO_OPENING, PO_STAIN, PO_ANNA,
  GU_EGGS, GU_VERMIN, GU_CUCUMBERS,
};
