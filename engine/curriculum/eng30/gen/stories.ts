/**
 * Short excerpts from the public-domain fiction of Grade 12 English, Unit 1, quoted exactly from
 * Project Gutenberg (wrapped lines joined, quotation marks and dashes made typographic, a drop
 * capital written as an ordinary capital). Every work was published before 1929 and its author
 * died before 1955, so it is in the public domain everywhere. "The Lady with the Dog" is quoted in
 * Constance Garnett's translation (1917); she died in 1946.
 */
import { cite as citeStory, titled as titleStory, type Excerpt, type Story } from '../../eng10/gen/texts.ts';

export type { Excerpt, Story };

/** Novels take italics; stories take quotation marks. */
const NOVELS = new Set(['The Awakening']);
/** “Title” (year), or *Title* (year) for a novel. */
export const titled = (s: Story) => (NOVELS.has(s.title) ? `*${s.title}* (${s.year})` : titleStory(s));
/** — Author, “Title” (year), or the novel's title in italics. */
export const cite = (s: Story) => (NOVELS.has(s.title) ? `— ${s.author}, *${s.title}* (${s.year})` : citeStory(s));
/** An excerpt as a Markdown blockquote with its attribution. */
export const quoteBlock = (e: Excerpt) => `> ${e.text}\n>\n> ${cite(e.story)}`;

export const DEAD: Story = { author: 'James Joyce', title: 'The Dead', year: 1914, url: 'https://www.gutenberg.org/ebooks/2814' };
export const KEW: Story = { author: 'Virginia Woolf', title: 'Kew Gardens', year: 1919, url: 'https://www.gutenberg.org/ebooks/29220' };
export const MARK: Story = { author: 'Virginia Woolf', title: 'The Mark on the Wall', year: 1917, url: 'https://www.gutenberg.org/ebooks/29220' };
export const BARTLEBY: Story = { author: 'Herman Melville', title: 'Bartleby, the Scrivener', year: 1853, url: 'https://www.gutenberg.org/ebooks/11231' };
export const BEAST: Story = { author: 'Henry James', title: 'The Beast in the Jungle', year: 1903, url: 'https://www.gutenberg.org/ebooks/1093' };
export const WIFE: Story = { author: 'Charles W. Chesnutt', title: 'The Wife of His Youth', year: 1898, url: 'https://www.gutenberg.org/ebooks/11057' };
export const SIOUX: Story = { author: 'Zitkala-Ša', title: 'The Soft-Hearted Sioux', year: 1901, url: 'https://www.gutenberg.org/ebooks/10376' };
export const SPRING: Story = { author: 'Sui Sin Far', title: 'Mrs. Spring Fragrance', year: 1912, url: 'https://www.gutenberg.org/ebooks/62940' };
export const OTHER: Story = { author: 'Edith Wharton', title: 'The Other Two', year: 1904, url: 'https://www.gutenberg.org/ebooks/4519' };
export const LADY: Story = { author: 'Anton Chekhov (tr. Constance Garnett)', title: 'The Lady with the Dog', year: 1899, url: 'https://www.gutenberg.org/ebooks/13415' };
export const AWAKENING: Story = { author: 'Kate Chopin', title: 'The Awakening', year: 1899, url: 'https://www.gutenberg.org/ebooks/160' };

export const STORIES: Story[] = [DEAD, KEW, MARK, BARTLEBY, BEAST, WIFE, SIOUX, SPRING, OTHER, LADY, AWAKENING];

const X = (story: Story, text: string): Excerpt => ({ story, text });

// ---------------------------------------------------------------- Joyce, "The Dead"
export const DEAD_LILY = X(DEAD, 'Lily, the caretaker’s daughter, was literally run off her feet.');
export const DEAD_SYMBOL = X(DEAD, 'There was grace and mystery in her attitude as if she were a symbol of something. He asked himself what is a woman standing on the stairs in the shadow, listening to distant music, a symbol of.');
export const DEAD_DIED = X(DEAD, '“I think he died for me,” she answered.');
export const DEAD_LUDICROUS = X(DEAD, 'He saw himself as a ludicrous figure, acting as a pennyboy for his aunts, a nervous, well-meaning sentimentalist, orating to vulgarians and idealising his own clownish lusts, the pitiable fatuous fellow he had caught a glimpse of in the mirror.');
export const DEAD_FUTURE = X(DEAD, 'Soon, perhaps, he would be sitting in that same drawing-room, dressed in black, his silk hat on his knees. The blinds would be drawn down and Aunt Kate would be sitting beside him, crying and blowing her nose and telling him how Julia had died.');
export const DEAD_SHADES = X(DEAD, 'One by one they were all becoming shades. Better pass boldly into that other world, in the full glory of some passion, than fade and wither dismally with age.');
export const DEAD_TEARS = X(DEAD, 'Generous tears filled Gabriel’s eyes. He had never felt like that himself towards any woman but he knew that such a feeling must be love.');
export const DEAD_FADING = X(DEAD, 'His own identity was fading out into a grey impalpable world: the solid world itself which these dead had one time reared and lived in was dissolving and dwindling.');
export const DEAD_GENERAL = X(DEAD, 'Yes, the newspapers were right: snow was general all over Ireland.');
export const DEAD_SNOW = X(DEAD, 'His soul swooned slowly as he heard the snow falling faintly through the universe and faintly falling, like the descent of their last end, upon all the living and the dead.');

// ---------------------------------------------------------------- Woolf, "Kew Gardens" and "The Mark on the Wall"
export const KEW_LIGHT = X(KEW, 'The light fell either upon the smooth, grey back of a pebble, or, the shell of a snail with its brown, circular veins, or falling into a raindrop, it expanded with such intensity of red, blue and yellow the thin walls of water that one expected them to burst and disappear.');
export const KEW_FIFTEEN = X(KEW, '“Fifteen years ago I came here with Lily,” he thought. “We sat somewhere over there by a lake and I begged her to marry me all through the hot afternoon.');
export const KEW_KISS = X(KEW, 'Imagine six little girls sitting before their easels twenty years ago, down by the side of a lake, painting the water-lilies, the first red water-lilies I’d ever seen. And suddenly a kiss, there on the back of my neck.');
export const KEW_SNAIL = X(KEW, 'In the oval flower bed the snail, whose shell had been stained red, blue, and yellow for the space of two minutes or so, now appeared to be moving very slightly in its shell, and next began to labour over the crumbs of loose earth which broke away and rolled down as it passed over them.');
export const MARK_OPENING = X(MARK, 'Perhaps it was the middle of January in the present year that I first looked up and saw the mark on the wall. In order to fix a date it is necessary to remember what one saw.');
export const MARK_SWARM = X(MARK, 'How readily our thoughts swarm upon a new object, lifting it a little way, as ants carry a blade of straw so feverishly, and then leave it....');
export const MARK_NAIL = X(MARK, 'But as for that mark, I’m not sure about it; I don’t believe it was made by a nail after all; it’s too big, too round, for that.');
export const MARK_SNAIL = X(MARK, 'Ah, the mark on the wall! It was a snail.');

// ---------------------------------------------------------------- Melville, "Bartleby, the Scrivener"
export const BART_EASIEST = X(BARTLEBY, 'Imprimis: I am a man who, from his youth upwards, has been filled with a profound conviction that the easiest way of life is the best.');
export const BART_SAFE = X(BARTLEBY, 'All who know me, consider me an eminently safe man.');
export const BART_ASTOR = X(BARTLEBY, 'I do not speak it in vanity, but simply record the fact, that I was not unemployed in my profession by the late John Jacob Astor; a name which, I admit, I love to repeat, for it hath a rounded and orbicular sound to it, and rings like unto bullion.');
export const BART_BULLION = X(BARTLEBY, 'a name which, I admit, I love to repeat, for it hath a rounded and orbicular sound to it, and rings like unto bullion.');
export const BART_NOTHING = X(BARTLEBY, 'Bartleby was one of those beings of whom nothing is ascertainable, except from the original sources, and in his case those are very small.');
export const BART_FIGURE = X(BARTLEBY, 'I can see that figure now—pallidly neat, pitiably respectable, incurably forlorn! It was Bartleby.');
export const BART_PREFER = X(BARTLEBY, 'Imagine my surprise, nay, my consternation, when without moving from his privacy, Bartleby in a singularly mild, firm voice, replied, “I would prefer not to.”');
export const BART_LETTERS = X(BARTLEBY, 'Dead letters! does it not sound like dead men?');
export const BART_ENDING = X(BARTLEBY, 'Ah Bartleby! Ah humanity!');

// ---------------------------------------------------------------- James, "The Beast in the Jungle"
export const BEAST_CONVICTION = X(BEAST, 'His conviction, his apprehension, his obsession, in short, wasn’t a privilege he could invite a woman to share; and that consequence of it was precisely what was the matter with him.');
export const BEAST_CROUCHING = X(BEAST, 'Something or other lay in wait for him, amid the twists and the turns of the months and the years, like a crouching Beast in the Jungle.');
export const BEAST_WAIT = X(BEAST, 'It was the truth, vivid and monstrous, that all the while he had waited the wait was itself his portion.');
export const BEAST_MAN = X(BEAST, 'he had been the man of his time, *the* man, to whom nothing on earth was to have happened.');
export const BEAST_ESCAPE = X(BEAST, 'The escape would have been to love her; then, *then* he would have lived.');

// ---------------------------------------------------------------- Chesnutt, "The Wife of His Youth"
export const WIFE_PURPOSE = X(WIFE, 'Its purpose was to establish and maintain correct social standards among a people whose social condition presented almost unlimited room for improvement.');
export const WIFE_ACCIDENT = X(WIFE, 'By accident, combined perhaps with some natural affinity, the society consisted of individuals who were, generally speaking, more white than black.');
export const WIFE_MILLSTONE = X(WIFE, '“I have no race prejudice,” he would say, “but we people of mixed blood are ground between the upper and the nether millstone.');
export const WIFE_ANSWER = X(WIFE, 'She had listened, with parted lips and streaming eyes. She was the first to speak: “He should have acknowledged her.”');
export const WIFE_ENDING = X(WIFE, '“Ladies and gentlemen,” he said, “this is the woman, and I am the man, whose story I have told you. Permit me to introduce to you the wife of my youth.”');

// ---------------------------------------------------------------- Zitkala-Ša, "The Soft-Hearted Sioux"
export const SIOUX_NINE = X(SIOUX, 'Nine winters’ snows had buried deep that night when my old grandmother, together with my father and mother, designed my future with the glow of a camp fire upon it.');
export const SIOUX_MISSION = X(SIOUX, 'Yet I did not grow up the warrior, huntsman, and husband I was to have been. At the mission school I learned it was wrong to kill.');
export const SIOUX_STRANGER = X(SIOUX, 'Wearing a foreigner’s dress, I walked, a stranger, into my father’s village.');
export const SIOUX_WONDER = X(SIOUX, 'Will the loving Jesus grant me pardon and give my soul a soothing sleep? or will my warrior father greet me and receive me as his son?');
export const SIOUX_ENDING = X(SIOUX, 'Soon, soon I shall know, for now I see the east is growing red. My heart is strong. My face is calm. My eyes are dry and eager for new scenes.');

// ---------------------------------------------------------------- Sui Sin Far, "Mrs. Spring Fragrance"
export const SPRING_OPENING = X(SPRING, 'When Mrs. Spring Fragrance first arrived in Seattle, she was unacquainted with even one word of the American language. Five years later her husband, speaking of her, said: “There are no more American words for her learning.”');
export const SPRING_AMERICANIZED = X(SPRING, 'Though conservatively Chinese in many respects, he was at the same time what is called by the Westerners, “Americanized.” Mrs. Spring Fragrance was even more “Americanized.”');
export const SPRING_CUSTOMS = X(SPRING, 'although the Chin Yuen parents lived in a house furnished in American style, and wore American clothes, yet they religiously observed many Chinese customs, and their ideals of life were the ideals of their Chinese forefathers.');
export const SPRING_TENNYSON = X(SPRING, '“Now, Little Sister,” comforted Mrs. Spring Fragrance, “you really must not grieve like that. Is there not a beautiful American poem written by a noble American named Tennyson, which says:');

// ---------------------------------------------------------------- Wharton, "The Other Two"
export const OTHER_CONFESSED = X(OTHER, 'He was not so old, to be sure—his glass gave him little more than the five-and-thirty years to which his wife confessed—but he had fancied himself already in the temperate zone;');
export const OTHER_SHOE = X(OTHER, 'She was “as easy as an old shoe”—a shoe that too many feet had worn. Her elasticity was the result of tension in too many different directions.');
export const OTHER_NAMES = X(OTHER, 'Alice Haskett—Alice Varick—Alice Waythorn—she had been each in turn, and had left hanging to each name a little of her privacy, a little of her personality, a little of the inmost self where the unknown god abides.');
export const OTHER_TEA = X(OTHER, '“But before talking business,” she added brightly, “I’m sure every one wants a cup of tea.”');
export const OTHER_ENDING = X(OTHER, 'She glanced about for Waythorn, and he took the third cup with a laugh.');

// ---------------------------------------------------------------- Chekhov, "The Lady with the Dog" (tr. Constance Garnett)
export const LADY_OPENING = X(LADY, 'It was said that a new person had appeared on the sea-front: a lady with a little dog.');
export const LADY_LOWER = X(LADY, 'He had begun being unfaithful to her long ago—had been unfaithful to her often, and, probably on that account, almost always spoke ill of women, and when they were talked about in his presence, used to call them “the lower race.”');
export const LADY_TWO_LIVES = X(LADY, 'He had two lives: one, open, seen and known by all who cared to know, full of relative truth and of relative falsehood, exactly like the lives of his friends and acquaintances; and another life running its course in secret.');
export const LADY_ENDING = X(LADY, 'And it seemed as though in a little while the solution would be found, and then a new and splendid life would begin; and it was clear to both of them that they had still a long, long road before them, and that the most complicated and difficult part of it was only just beginning.');

// ---------------------------------------------------------------- Chopin, The Awakening
export const AWAKE_PROPERTY = X(AWAKENING, '“You are burnt beyond recognition,” he added, looking at his wife as one looks at a valuable piece of personal property which has suffered some damage.');
export const AWAKE_MOTHERWOMAN = X(AWAKENING, 'In short, Mrs. Pontellier was not a mother-woman. The mother-women seemed to prevail that summer at Grand Isle.');
export const AWAKE_EFFACE = X(AWAKENING, 'They were women who idolized their children, worshiped their husbands, and esteemed it a holy privilege to efface themselves as individuals and grow wings as ministering angels.');
export const AWAKE_MYSELF = X(AWAKENING, '“I would give up the unessential; I would give my money, I would give my life for my children; but I wouldn’t give myself.');
export const AWAKE_SOLITUDE = X(AWAKENING, 'inviting the soul to wander for a spell in abysses of solitude; to lose itself in mazes of inward contemplation.');
export const AWAKE_SEA = X(AWAKENING, 'The voice of the sea is seductive; never ceasing, whispering, clamoring, murmuring, inviting the soul to wander for a spell in abysses of solitude; to lose itself in mazes of inward contemplation.');

/** Every excerpt, for the quotation check. */
export const EXCERPTS: Record<string, Excerpt> = {
  DEAD_LILY, DEAD_SYMBOL, DEAD_DIED, DEAD_LUDICROUS, DEAD_FUTURE, DEAD_SHADES, DEAD_TEARS, DEAD_FADING, DEAD_GENERAL, DEAD_SNOW,
  KEW_LIGHT, KEW_FIFTEEN, KEW_KISS, KEW_SNAIL, MARK_OPENING, MARK_SWARM, MARK_NAIL, MARK_SNAIL,
  BART_EASIEST, BART_SAFE, BART_ASTOR, BART_BULLION, BART_NOTHING, BART_FIGURE, BART_PREFER, BART_LETTERS, BART_ENDING,
  BEAST_CONVICTION, BEAST_CROUCHING, BEAST_WAIT, BEAST_MAN, BEAST_ESCAPE,
  WIFE_PURPOSE, WIFE_ACCIDENT, WIFE_MILLSTONE, WIFE_ANSWER, WIFE_ENDING,
  SIOUX_NINE, SIOUX_MISSION, SIOUX_STRANGER, SIOUX_WONDER, SIOUX_ENDING,
  SPRING_OPENING, SPRING_AMERICANIZED, SPRING_CUSTOMS, SPRING_TENNYSON,
  OTHER_CONFESSED, OTHER_SHOE, OTHER_NAMES, OTHER_TEA, OTHER_ENDING,
  LADY_OPENING, LADY_LOWER, LADY_TWO_LIVES, LADY_ENDING,
  AWAKE_PROPERTY, AWAKE_MOTHERWOMAN, AWAKE_EFFACE, AWAKE_MYSELF, AWAKE_SEA, AWAKE_SOLITUDE,
};

/** “Title” (year) by Author, for a lead-in that names the writer. */
export const byline = (s: Story) => `${titled(s)} by ${s.author}`;
