/**
 * Short excerpts from public-domain essays and non-fiction for Grade 11 English, Units 4 and 5, quoted
 * exactly from Project Gutenberg and Wikisource (wrapped lines joined, quotation marks and apostrophes
 * made typographic, and one word printed in capitals in the source set in italics). Each was
 * published before 1929 and its author died before 1955, so it is in the public domain everywhere.
 */

export interface Essay {
  author: string;
  /** The title as a citation gives it. */
  title: string;
  year: number;
  /** Where the full text can be read. */
  url: string;
  /** How a question names it in a sentence: “In ${lead} (year), ${author} writes:”. */
  lead: string;
}

export interface Excerpt {
  essay: Essay;
  text: string;
}

export const CIVIL: Essay = {
  author: 'Henry David Thoreau',
  title: '“Civil Disobedience”',
  year: 1849,
  url: 'https://www.gutenberg.org/ebooks/71',
  lead: 'his essay “Civil Disobedience”',
};
export const WALDEN: Essay = {
  author: 'Henry David Thoreau',
  title: '*Walden*',
  year: 1854,
  url: 'https://www.gutenberg.org/ebooks/205',
  lead: 'his book *Walden*',
};
export const SELF_RELIANCE: Essay = {
  author: 'Ralph Waldo Emerson',
  title: '“Self-Reliance”',
  year: 1841,
  url: 'https://www.gutenberg.org/ebooks/2944',
  lead: 'his essay “Self-Reliance”',
};
export const VINDICATION: Essay = {
  author: 'Mary Wollstonecraft',
  title: '*A Vindication of the Rights of Woman*',
  year: 1792,
  url: 'https://www.gutenberg.org/ebooks/3420',
  lead: '*A Vindication of the Rights of Woman*',
};
export const NARRATIVE: Essay = {
  author: 'Frederick Douglass',
  title: '*Narrative of the Life of Frederick Douglass*',
  year: 1845,
  url: 'https://www.gutenberg.org/ebooks/23',
  lead: 'his autobiography, *Narrative of the Life of Frederick Douglass*',
};
export const WAR_PRAYER: Essay = {
  author: 'Mark Twain',
  title: '“The War Prayer”',
  // Written in 1905; first published in 1916, after Twain's death.
  year: 1916,
  url: 'https://en.wikisource.org/wiki/Harper%27s_Magazine/The_War_Prayer',
  lead: '“The War Prayer”',
};
export const PROPOSAL: Essay = {
  author: 'Jonathan Swift',
  title: '“A Modest Proposal”',
  year: 1729,
  url: 'https://www.gutenberg.org/ebooks/1080',
  lead: 'his essay “A Modest Proposal”',
};
export const STUDIES: Essay = {
  author: 'Francis Bacon',
  title: '“Of Studies”',
  year: 1625,
  url: 'https://www.gutenberg.org/ebooks/575',
  lead: 'his essay “Of Studies”',
};
export const IDLE: Essay = {
  author: 'Jerome K. Jerome',
  title: '“On Being Idle”',
  year: 1886,
  url: 'https://www.gutenberg.org/ebooks/849',
  lead: 'his essay “On Being Idle”',
};
export const BANK: Essay = {
  author: 'Stephen Leacock',
  title: '“My Financial Career”',
  year: 1910,
  url: 'https://www.gutenberg.org/ebooks/6340',
  lead: 'his sketch “My Financial Career”',
};
export const LIVE_200: Essay = {
  author: 'Stephen Leacock',
  title: '“How to Live to Be 200”',
  year: 1910,
  url: 'https://www.gutenberg.org/ebooks/6340',
  lead: 'his sketch “How to Live to Be 200”',
};
export const HAT: Essay = {
  author: 'G. K. Chesterton',
  title: '“On Running After One’s Hat”',
  year: 1908,
  url: 'https://www.gutenberg.org/ebooks/11505',
  lead: 'his essay “On Running After One’s Hat”',
};
export const TRIFLES: Essay = {
  author: 'G. K. Chesterton',
  title: '“Tremendous Trifles”',
  year: 1909,
  url: 'https://www.gutenberg.org/ebooks/8092',
  lead: 'his essay “Tremendous Trifles”',
};
export const CHALK: Essay = {
  author: 'G. K. Chesterton',
  title: '“A Piece of Chalk”',
  year: 1909,
  url: 'https://www.gutenberg.org/ebooks/8092',
  lead: 'his essay “A Piece of Chalk”',
};
export const ROAST_PIG: Essay = {
  author: 'Charles Lamb',
  title: '“A Dissertation upon Roast Pig”',
  year: 1822,
  url: 'https://www.gutenberg.org/ebooks/10343',
  lead: 'his essay “A Dissertation upon Roast Pig”',
};

export const ESSAYS: Essay[] = [CIVIL, WALDEN, SELF_RELIANCE, VINDICATION, NARRATIVE, WAR_PRAYER, PROPOSAL, STUDIES, IDLE, BANK, LIVE_200, HAT, TRIFLES, CHALK, ROAST_PIG];

const X = (essay: Essay, text: string): Excerpt => ({ essay, text });

/** The attribution line under a quoted passage. */
export const citeEssay = (e: Essay) => `— ${e.author}, ${e.title} (${e.year})`;
/** A passage as a Markdown blockquote with its attribution. */
export const essayBlock = (x: Excerpt) => `> ${x.text}\n>\n> ${citeEssay(x.essay)}`;
/** A question's lead-in: “In his essay “Self-Reliance” (1841), Ralph Waldo Emerson writes:”. */
export const lead = (e: Essay, verb = 'writes') => `In ${e.lead} (${e.year}), ${e.author} ${verb}:`;

// ---------------------------------------------------------------- Henry David Thoreau, "Civil Disobedience"
export const CD_MOTTO = X(CIVIL, 'I heartily accept the motto,—“That government is best which governs least;” and I should like to see it acted up to more rapidly and systematically.');
export const CD_PRISON = X(CIVIL, 'Under a government which imprisons any unjustly, the true place for a just man is also a prison.');
export const CD_CONSCIENCE = X(CIVIL, 'Must the citizen ever for a moment, or in the least degree, resign his conscience to the legislator? Why has every man a conscience, then? I think that we should be men first, and subjects afterward. It is not desirable to cultivate a respect for the law, so much as for the right.');
export const CD_FRICTION = X(CIVIL, 'Let your life be a counter friction to stop the machine.');

// ---------------------------------------------------------------- Henry David Thoreau, Walden
export const WA_WOODS = X(WALDEN, 'I went to the woods because I wished to live deliberately, to front only the essential facts of life, and see if I could not learn what it had to teach, and not, when I came to die, discover that I had not lived.');
export const WA_DESPERATION = X(WALDEN, 'The mass of men lead lives of quiet desperation.');
export const WA_SIMPLICITY = X(WALDEN, 'Our life is frittered away by detail. An honest man has hardly need to count more than his ten fingers, or in extreme cases he may add his ten toes, and lump the rest. Simplicity, simplicity, simplicity!');

// ---------------------------------------------------------------- Ralph Waldo Emerson, "Self-Reliance"
export const SR_TRUST = X(SELF_RELIANCE, 'Trust thyself: every heart vibrates to that iron string.');
export const SR_SOCIETY = X(SELF_RELIANCE, 'Society everywhere is in conspiracy against the manhood of every one of its members. … The virtue in most request is conformity. Self-reliance is its aversion.');
export const SR_NONCONFORMIST = X(SELF_RELIANCE, 'Whoso would be a man, must be a nonconformist.');
export const SR_CONSISTENCY = X(SELF_RELIANCE, 'A foolish consistency is the hobgoblin of little minds, adored by little statesmen and philosophers and divines.');
export const SR_ENVY = X(SELF_RELIANCE, 'There is a time in every man’s education when he arrives at the conviction that envy is ignorance; that imitation is suicide; that he must take himself for better for worse as his portion …');

// ---------------------------------------------------------------- Mary Wollstonecraft, A Vindication of the Rights of Woman
export const VW_POWER = X(VINDICATION, 'I do not wish them to have power over men; but over themselves.');
export const VW_RATIONAL = X(VINDICATION, 'My own sex, I hope, will excuse me, if I treat them like rational creatures, instead of flattering their *fascinating* graces, and viewing them as if they were in a state of perpetual childhood, unable to stand alone.');
export const VW_CAGE = X(VINDICATION, 'Taught from their infancy, that beauty is woman’s sceptre, the mind shapes itself to the body, and, roaming round its gilt cage, only seeks to adorn its prison.');
export const VW_STRENGTHEN = X(VINDICATION, 'Strengthen the female mind by enlarging it, and there will be an end to blind obedience …');

// ---------------------------------------------------------------- Frederick Douglass, Narrative
export const FN_MAN = X(NARRATIVE, 'You have seen how a man was made a slave; you shall see how a slave was made a man.');
export const FN_PATHWAY = X(NARRATIVE, 'From that moment, I understood the pathway from slavery to freedom.');

// ---------------------------------------------------------------- Mark Twain, "The War Prayer"
export const WP_OPENING = X(WAR_PRAYER, 'It was a time of great and exalting excitement. The country was up in arms, the war was on, in every breast burned the holy fire of patriotism; the drums were beating, the bands playing, the toy pistols popping, the bunched firecrackers hissing and spluttering …');
export const WP_PRAYER = X(WAR_PRAYER, 'O Lord our God, help us to tear their soldiers to bloody shreds with our shells; help us to cover their smiling fields with the pale forms of their patriot dead …');

// ---------------------------------------------------------------- Jonathan Swift, "A Modest Proposal"
export const MP_MELANCHOLY = X(PROPOSAL, 'It is a melancholy object to those, who walk through this great town, or travel in the country, when they see the streets, the roads, and cabbin-doors crowded with beggars of the female sex, followed by three, four, or six children, all in rags, and importuning every passenger for an alms.');
export const MP_FOOD = X(PROPOSAL, 'I have been assured by a very knowing American of my acquaintance in London, that a young healthy child well nursed, is, at a year old, a most delicious nourishing and wholesome food, whether stewed, roasted, baked, or boiled …');
export const MP_LANDLORDS = X(PROPOSAL, 'I grant this food will be somewhat dear, and therefore very proper for landlords, who, as they have already devoured most of the parents, seem to have the best title to the children.');
export const MP_INTEREST = X(PROPOSAL, 'I profess in the sincerity of my heart, that I have not the least personal interest in endeavouring to promote this necessary work, having no other motive than the publick good of my country …');

// ---------------------------------------------------------------- Francis Bacon, "Of Studies"
export const BA_DELIGHT = X(STUDIES, 'Studies serve for delight, for ornament, and for ability.');
export const BA_TASTED = X(STUDIES, 'Some books are to be tasted, others to be swallowed, and some few to be chewed and digested …');

// ---------------------------------------------------------------- Jerome K. Jerome, "On Being Idle"
export const JE_IDLING = X(IDLE, 'It is impossible to enjoy idling thoroughly unless one has plenty of work to do. There is no fun in doing nothing when you have nothing to do.');

// ---------------------------------------------------------------- Stephen Leacock, Literary Lapses
export const LE_BANK = X(BANK, 'When I go into a bank I get rattled. The clerks rattle me; the wickets rattle me; the sight of the money rattles me; everything rattles me.');
export const LE_JIGGINS = X(LIVE_200, 'Twenty years ago I knew a man called Jiggins, who had the Health Habit. He used to take a cold plunge every morning. He said it opened his pores. After it he took a hot sponge. He said it closed the pores.');
export const LE_DEAD = X(LIVE_200, 'Jiggins is dead. He was, of course, a pioneer, but the fact that he dumb-belled himself to death at an early age does not prevent a whole generation of young men from following in his path.');
export const LE_MANIA = X(LIVE_200, 'They are ridden by the Health Mania. … They won’t eat meat because it has too much nitrogen. They won’t eat fruit because it hasn’t any.');

// ---------------------------------------------------------------- G. K. Chesterton
export const CH_ADVENTURE = X(HAT, 'An adventure is only an inconvenience rightly considered. An inconvenience is only an adventure wrongly considered.');
export const CH_WONDER = X(TRIFLES, 'The world will never starve for want of wonders; but only for want of wonder.');
export const CH_CHALK = X(CHALK, 'I remember one splendid morning, all blue and silver, in the summer holidays when I reluctantly tore myself away from the task of doing nothing in particular, and put on a hat of some sort and picked up a walking-stick, and put six very bright-coloured chalks in my pocket.');

// ---------------------------------------------------------------- Charles Lamb, "A Dissertation upon Roast Pig"
export const RP_MANUSCRIPT = X(ROAST_PIG, 'Mankind, says a Chinese manuscript, which my friend M. was obliging enough to read and explain to me, for the first seventy thousand ages ate their meat raw, clawing or biting it from the living animal …');

/** Every excerpt, by name (for the quotation check). */
export const EXCERPTS: Record<string, Excerpt> = {
  CD_MOTTO, CD_PRISON, CD_CONSCIENCE, CD_FRICTION,
  WA_WOODS, WA_DESPERATION, WA_SIMPLICITY,
  SR_TRUST, SR_SOCIETY, SR_NONCONFORMIST, SR_CONSISTENCY, SR_ENVY,
  VW_POWER, VW_RATIONAL, VW_CAGE, VW_STRENGTHEN,
  FN_MAN, FN_PATHWAY,
  WP_OPENING, WP_PRAYER,
  MP_MELANCHOLY, MP_FOOD, MP_LANDLORDS, MP_INTEREST,
  BA_DELIGHT, BA_TASTED,
  JE_IDLING,
  LE_BANK, LE_JIGGINS, LE_DEAD, LE_MANIA,
  CH_ADVENTURE, CH_WONDER, CH_CHALK,
  RP_MANUSCRIPT,
};
