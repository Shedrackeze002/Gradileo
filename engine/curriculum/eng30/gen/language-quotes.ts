/**
 * Grade 12 English, Unit 7: short public-domain quotations used to show syntax devices (lesson 7.1)
 * and rhetorical figures (lesson 7.4), each with its source. Every quotation is copied from the
 * Project Gutenberg text named in `file` (the King James Bible, Dickens, Shakespeare, Milton, Pope,
 * Keats, Donne and Frederick Douglass) and checked against it.
 */

export interface Quote {
  text: string;
  /** Where it comes from, written to follow “From”: “Brutus’s speech in William Shakespeare’s *Julius Caesar* (1599)”. */
  source: string;
  /** The Project Gutenberg text it was checked against. */
  file: string;
}
const Q = (text: string, source: string, file: string): Quote => ({ text, source, file });

const KJV = 'in the King James Bible (1611)';

export const TWO_CITIES = Q('It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness', 'the opening of Charles Dickens’s *A Tale of Two Cities* (1859)', 'pg98');
export const CAESAR_ROME = Q('Not that I loved Caesar less, but that I loved Rome more.', 'Brutus’s speech in William Shakespeare’s *Julius Caesar* (1599)', 'pg1522');
export const RAIN = Q('And the rain descended, and the floods came, and the winds blew, and beat upon that house; and it fell not: for it was founded upon a rock.', `Matthew 7:25 ${KJV}`, 'pg10');
export const MEEK = Q('Blessed are the meek: for they shall inherit the earth.', `Matthew 5:5 ${KJV}`, 'pg10');
export const SEASON = Q('A time to be born, and a time to die; a time to plant, and a time to pluck up that which is planted', `Ecclesiastes 3:2 ${KJV}`, 'pg10');
export const HEAL = Q('Heal the sick, cleanse the lepers, raise the dead, cast out devils', `Matthew 10:8 ${KJV}`, 'pg10');
export const MALICE = Q('With malice toward none; with charity for all; with firmness in the right, as God gives us to see the right', 'Abraham Lincoln’s Second Inaugural Address (1865)', 'pg14721');
export const ALMIGHTY = Q('Him the Almighty Power\nHurled headlong flaming from th’ ethereal sky', 'John Milton’s *Paradise Lost* (1667), on the fall of Satan', 'pg26');

export const FAIR_FOUL = Q('Fair is foul, and foul is fair:', 'the Witches’ chant in William Shakespeare’s *Macbeth* (1606)', 'pg1533');
export const DOUGLASS = Q('You have seen how a man was made a slave; you shall see how a slave was made a man.', 'Frederick Douglass’s *Narrative of the Life of Frederick Douglass* (1845)', 'pg23');
export const SABBATH = Q('The sabbath was made for man, and not man for the sabbath', `Mark 2:27 ${KJV}`, 'pg10');
export const POPE_TEA = Q('Here thou, great Anna! whom three realms obey,\nDost sometimes counsel take—and sometimes tea.', 'Alexander Pope’s *The Rape of the Lock* (1714), to Queen Anne', 'pg9800');
export const POPE_STAIN = Q('Or stain her honour or her new brocade', 'Alexander Pope’s *The Rape of the Lock* (1714), on the dangers facing a young woman', 'pg9800');
export const PICKWICK = Q('went straight home, in a flood of tears and a sedan-chair.', 'Charles Dickens’s *The Pickwick Papers* (1837), of Miss Bolo leaving a card party', 'pg580');
export const STING = Q('O death, where is thy sting? O grave, where is thy victory?', `1 Corinthians 15:55 ${KJV}`, 'pg10');
export const URN = Q('Thou still unravish’d bride of quietness', 'John Keats’s “Ode on a Grecian Urn” (1820), speaking to an ancient vase', 'pg23684');
export const DONNE = Q('And death shall be no more; death, thou shalt die.', 'John Donne’s sonnet “Death, be not proud” (1633)', 'pg48688');
export const CRUEL = Q('I must be cruel, only to be kind:', 'Hamlet’s words to his mother in William Shakespeare’s *Hamlet* (1600)', 'pg1524');
export const HEAVY_LIGHTNESS = Q('O heavy lightness! serious vanity!', 'Romeo’s first speech about love in William Shakespeare’s *Romeo and Juliet* (1597)', 'pg1513');
export const SWEET_SORROW = Q('Good night, good night. Parting is such sweet sorrow', 'Juliet’s farewell to Romeo in William Shakespeare’s *Romeo and Juliet* (1597)', 'pg1513');
export const BREAD = Q('Give us this day our daily bread.', `Matthew 6:11 ${KJV}`, 'pg10');
export const SWORD = Q('Now therefore the sword shall never depart from thine house', `2 Samuel 12:10 ${KJV}`, 'pg10');
export const SILVER_GOLD = Q('Silver and gold have I none; but such as I have', `Acts 3:6 ${KJV}, where Peter speaks to a man begging at the temple gate`, 'pg10');
export const MEAN_CITY = Q('a citizen of no mean city', `Acts 21:39 ${KJV}, where Paul speaks of his home town, Tarsus`, 'pg10');

export const QUOTES: Record<string, Quote> = {
  TWO_CITIES, CAESAR_ROME, RAIN, MEEK, SEASON, HEAL, MALICE, ALMIGHTY,
  FAIR_FOUL, DOUGLASS, SABBATH, POPE_TEA, POPE_STAIN, PICKWICK, STING, URN, DONNE, CRUEL,
  HEAVY_LIGHTNESS, SWEET_SORROW, BREAD, SWORD, MEAN_CITY, SILVER_GOLD,
};

/** A quotation as a Markdown blockquote; verse lines keep their breaks. The prompt names the source. */
export function quoteBlock(qt: Quote): string {
  const lines = qt.text.split('\n');
  return lines.map((l, i) => `> ${l}${i < lines.length - 1 ? '\\' : ''}`).join('\n');
}
