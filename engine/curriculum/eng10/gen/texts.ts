/**
 * Short excerpts from public-domain short stories, quoted exactly from Project Gutenberg and
 * Wikisource (wrapped lines joined, quotation marks made typographic). Each story was published
 * before 1915 and its author died before 1945, so it is in the public domain everywhere.
 * A `\$` is a literal dollar sign in Markdown.
 */

export interface Story {
  author: string;
  title: string;
  year: number;
  /** Where the full text can be read. */
  url: string;
}

export interface Excerpt {
  story: Story;
  text: string;
}

export const MAGI: Story = { author: 'O. Henry', title: 'The Gift of the Magi', year: 1905, url: 'https://www.gutenberg.org/ebooks/7256' };
export const HOUR: Story = { author: 'Kate Chopin', title: 'The Story of an Hour', year: 1894, url: 'https://en.wikisource.org/wiki/The_Story_of_an_Hour' };
export const PAW: Story = { author: 'W. W. Jacobs', title: 'The Monkey’s Paw', year: 1902, url: 'https://www.gutenberg.org/ebooks/12122' };
export const WINDOW: Story = { author: 'Saki', title: 'The Open Window', year: 1914, url: 'https://www.gutenberg.org/ebooks/269' };
export const USHER: Story = { author: 'Edgar Allan Poe', title: 'The Fall of the House of Usher', year: 1839, url: 'https://www.gutenberg.org/ebooks/2148' };
export const HEART: Story = { author: 'Edgar Allan Poe', title: 'The Tell-Tale Heart', year: 1843, url: 'https://www.gutenberg.org/ebooks/2148' };
export const CASK: Story = { author: 'Edgar Allan Poe', title: 'The Cask of Amontillado', year: 1846, url: 'https://www.gutenberg.org/ebooks/2148' };
export const FIRE: Story = { author: 'Jack London', title: 'To Build a Fire', year: 1908, url: 'https://www.gutenberg.org/ebooks/2429' };
export const OWL: Story = { author: 'Ambrose Bierce', title: 'An Occurrence at Owl Creek Bridge', year: 1890, url: 'https://www.gutenberg.org/ebooks/375' };
export const TIGER: Story = { author: 'Frank R. Stockton', title: 'The Lady, or the Tiger?', year: 1882, url: 'https://www.gutenberg.org/ebooks/396' };

export const STORIES: Story[] = [MAGI, HOUR, PAW, WINDOW, USHER, HEART, CASK, FIRE, OWL, TIGER];

const X = (story: Story, text: string): Excerpt => ({ story, text });

/** “Title” (year) by Author, for a question's lead-in. */
export const titled = (s: Story) => `“${s.title}” (${s.year})`;
/** The attribution line under a quoted excerpt. */
export const cite = (s: Story) => `— ${s.author}, “${s.title}” (${s.year})`;
/** An excerpt as a Markdown blockquote with its attribution. */
export const quoteBlock = (e: Excerpt) => `> ${e.text}\n>\n> ${cite(e.story)}`;

// ---------------------------------------------------------------- O. Henry, "The Gift of the Magi"
export const MAGI_OPENING = X(MAGI, 'One dollar and eighty-seven cents. That was all. And sixty cents of it was in pennies. Pennies saved one and two at a time by bulldozing the grocer and the vegetable man and the butcher until one’s cheeks burned with the silent imputation of parsimony that such close dealing implied. Three times Della counted it. One dollar and eighty-seven cents. And the next day would be Christmas.');
export const MAGI_GRAY = X(MAGI, 'Della finished her cry and attended to her cheeks with the powder rag. She stood by the window and looked out dully at a gray cat walking a gray fence in a gray backyard.');
export const MAGI_PIER_GLASS = X(MAGI, 'There was a pier glass between the windows of the room. Perhaps you have seen a pier glass in an \\$8 flat.');
export const MAGI_HAIR = X(MAGI, 'And then she did it up again nervously and quickly. Once she faltered for a minute and stood still while a tear or two splashed on the worn red carpet.');
export const MAGI_SELL = X(MAGI, '“Twenty dollars,” said Madame, lifting the mass with a practised hand. “Give it to me quick,” said Della.');
export const MAGI_CHAIN = X(MAGI, 'As soon as she saw it she knew that it must be Jim’s. It was like him. Quietness and value—the description applied to both.');
export const MAGI_NEVER_LATE = X(MAGI, 'Jim was never late.');
export const MAGI_PRAYER = X(MAGI, 'She had a habit of saying a little silent prayer about the simplest everyday things, and now she whispered: “Please God, make him think I am still pretty.”');
export const MAGI_JIM = X(MAGI, 'He looked thin and very serious. Poor fellow, he was only twenty-two—and to be burdened with a family! He needed a new overcoat and he was without gloves.');
export const MAGI_WATCH = X(MAGI, '“Dell,” said he, “let’s put our Christmas presents away and keep ’em a while. They’re too nice to use just at present. I sold the watch to get the money to buy your combs. And now suppose you put the chops on.”');
export const MAGI_WISEST = X(MAGI, 'But in a last word to the wise of these days let it be said that of all who give gifts these two were the wisest.');

// ---------------------------------------------------------------- Kate Chopin, "The Story of an Hour"
export const HOUR_OPENING = X(HOUR, 'Knowing that Mrs. Mallard was afflicted with a heart trouble, great care was taken to break to her as gently as possible the news of her husband’s death.');
export const HOUR_WINDOW = X(HOUR, 'She could see in the open square before her house the tops of trees that were all aquiver with the new spring life. The delicious breath of rain was in the air. In the street below a peddler was crying his wares. The notes of a distant song which some one was singing reached her faintly, and countless sparrows were twittering in the eaves.');
export const HOUR_FREE = X(HOUR, 'There would be no one to live for her during those coming years; she would live for herself.');
export const HOUR_PRAYER = X(HOUR, 'She breathed a quick prayer that life might be long. It was only yesterday she had thought with a shudder that life might be long.');
export const HOUR_ENDING = X(HOUR, 'When the doctors came they said she had died of heart disease — of the joy that kills.');

// ---------------------------------------------------------------- W. W. Jacobs, "The Monkey's Paw"
export const PAW_OPENING = X(PAW, 'Without, the night was cold and wet, but in the small parlour of Laburnam Villa the blinds were drawn and the fire burned brightly.');
export const PAW_FATE = X(PAW, '“It had a spell put on it by an old fakir,” said the sergeant-major, “a very holy man. He wanted to show that fate ruled people’s lives, and that those who interfered with it did so to their sorrow.');
export const PAW_THIRD_WISH = X(PAW, '“The first man had his three wishes. Yes,” was the reply; “I don’t know what the first two were, but the third was for death. That’s how I got the paw.”');
export const PAW_BURN = X(PAW, '“I won’t,” said his friend, doggedly. “I threw it on the fire. If you keep it, don’t blame me for what happens. Pitch it on the fire again like a sensible man.”');
export const PAW_SNATCH = X(PAW, 'He took the paw, and dangling it between his forefinger and thumb, suddenly threw it upon the fire. White, with a slight cry, stooped down and snatched it off.');
export const PAW_HURT = X(PAW, '“I suppose all old soldiers are the same,” said Mrs. White. “The idea of our listening to such nonsense! How could wishes be granted in these days? And if they could, how could two hundred pounds hurt you, father?”');
export const PAW_KNOCK = X(PAW, 'At the foot of the stairs the match went out, and he paused to strike another; and at the same moment a knock, so quiet and stealthy as to be scarcely audible, sounded on the front door.');
export const PAW_ENDING = X(PAW, 'The street lamp flickering opposite shone on a quiet and deserted road.');

// ---------------------------------------------------------------- Saki, "The Open Window"
export const WINDOW_VERA = X(WINDOW, '“My aunt will be down presently, Mr. Nuttel,” said a very self-possessed young lady of fifteen; “in the meantime you must try and put up with me.”');
export const WINDOW_OPEN = X(WINDOW, '“You may wonder why we keep that window wide open on an October afternoon,” said the niece, indicating a large French window that opened on to a lawn.');
export const WINDOW_FRAMTON = X(WINDOW, '“The doctors agree in ordering me complete rest, an absence of mental excitement, and avoidance of anything in the nature of violent physical exercise,” announced Framton, who laboured under the tolerably widespread delusion that total strangers and chance acquaintances are hungry for the least detail of one’s ailments and infirmities, their cause and cure.');
export const WINDOW_RETURN = X(WINDOW, 'In the deepening twilight three figures were walking across the lawn towards the window; they all carried guns under their arms, and one of them was additionally burdened with a white coat hung over his shoulders. A tired brown spaniel kept close at their heels.');
export const WINDOW_GHOST = X(WINDOW, '“A most extraordinary man, a Mr. Nuttel,” said Mrs. Sappleton; “could only talk about his illnesses, and dashed off without a word of good-bye or apology when you arrived. One would think he had seen a ghost.”');
export const WINDOW_ROMANCE = X(WINDOW, 'Romance at short notice was her speciality.');

// ---------------------------------------------------------------- Edgar Allan Poe
export const USHER_OPENING = X(USHER, 'During the whole of a dull, dark, and soundless day in the autumn of the year, when the clouds hung oppressively low in the heavens, I had been passing alone, on horseback, through a singularly dreary tract of country; and at length found myself, as the shades of the evening drew on, within view of the melancholy House of Usher. I know not how it was—but, with the first glimpse of the building, a sense of insufferable gloom pervaded my spirit.');
export const HEART_OPENING = X(HEART, 'True!—nervous—very, very dreadfully nervous I had been and am; but why will you say that I am mad? The disease had sharpened my senses—not destroyed—not dulled them. Above all was the sense of hearing acute. I heard all things in the heaven and in the earth. I heard many things in hell. How, then, am I mad? Hearken! and observe how healthily—how calmly I can tell you the whole story.');
export const HEART_EYE = X(HEART, 'I think it was his eye! yes, it was this! He had the eye of a vulture—a pale blue eye, with a film over it. Whenever it fell upon me, my blood ran cold; and so by degrees—very gradually—I made up my mind to take the life of the old man, and thus rid myself of the eye forever.');
export const HEART_WISELY = X(HEART, 'Now this is the point. You fancy me mad. Madmen know nothing. But you should have seen me. You should have seen how wisely I proceeded—with what caution—with what foresight—with what dissimulation I went to work!');
export const HEART_BEAT = X(HEART, 'Meantime the hellish tattoo of the heart increased. It grew quicker and quicker, and louder and louder every instant.');
export const CASK_OPENING = X(CASK, 'The thousand injuries of Fortunato I had borne as I best could; but when he ventured upon insult, I vowed revenge.');
export const CASK_SMILE = X(CASK, 'It must be understood, that neither by word nor deed had I given Fortunato cause to doubt my good will. I continued, as was my wont, to smile in his face, and he did not perceive that my smile *now* was at the thought of his immolation.');
export const CASK_COUGH = X(CASK, '“Enough,” he said; “the cough is a mere nothing; it will not kill me. I shall not die of a cough.” “True—true,” I replied;');
export const CASK_TOAST = X(CASK, '“I drink,” he said, “to the buried that repose around us.” “And I to your long life.”');

// ---------------------------------------------------------------- Jack London, "To Build a Fire"
export const FIRE_OPENING = X(FIRE, 'Day had broken cold and grey, exceedingly cold and grey, when the man turned aside from the main Yukon trail and climbed the high earth-bank, where a dim and little-travelled trail led eastward through the fat spruce timberland.');
export const FIRE_GLOOM = X(FIRE, 'It was a clear day, and yet there seemed an intangible pall over the face of things, a subtle gloom that made the day dark, and that was due to the absence of sun.');
export const FIRE_IMAGINATION = X(FIRE, 'The trouble with him was that he was without imagination. He was quick and alert in the things of life, but only in the things, and not in the significances.');
export const FIRE_FROST = X(FIRE, 'Fifty degrees below zero meant eighty odd degrees of frost. Such fact impressed him as being cold and uncomfortable, and that was all.');
export const FIRE_SPIT = X(FIRE, 'As he turned to go on, he spat speculatively. There was a sharp, explosive crackle that startled him. He spat again. And again, in the air, before it could fall to the snow, the spittle crackled.');

// ---------------------------------------------------------------- Bierce and Stockton
export const OWL_OPENING = X(OWL, 'A man stood upon a railroad bridge in northern Alabama, looking down into the swift water twenty feet below. The man’s hands were behind his back, the wrists bound with a cord. A rope closely encircled his neck.');
export const TIGER_SIGNAL = X(TIGER, 'Her right arm lay on the cushioned parapet before her. She raised her hand, and made a slight, quick movement toward the right. No one but her lover saw her.');
export const TIGER_ENDING = X(TIGER, 'And so I leave it with all of you: Which came out of the opened door,—the lady, or the tiger?');
export const TIGER_YOUTH = X(TIGER, 'Tall, beautiful, fair, his appearance was greeted with a low hum of admiration and anxiety.');

/** Every excerpt, for the quotation check. */
export const EXCERPTS: Record<string, Excerpt> = {
  MAGI_OPENING, MAGI_GRAY, MAGI_PIER_GLASS, MAGI_HAIR, MAGI_SELL, MAGI_CHAIN, MAGI_NEVER_LATE, MAGI_PRAYER, MAGI_JIM, MAGI_WATCH, MAGI_WISEST,
  HOUR_OPENING, HOUR_WINDOW, HOUR_FREE, HOUR_PRAYER, HOUR_ENDING,
  PAW_OPENING, PAW_FATE, PAW_THIRD_WISH, PAW_BURN, PAW_SNATCH, PAW_HURT, PAW_KNOCK, PAW_ENDING,
  WINDOW_VERA, WINDOW_OPEN, WINDOW_FRAMTON, WINDOW_RETURN, WINDOW_GHOST, WINDOW_ROMANCE,
  USHER_OPENING, HEART_OPENING, HEART_EYE, HEART_WISELY, HEART_BEAT, CASK_OPENING, CASK_SMILE, CASK_COUGH, CASK_TOAST,
  FIRE_OPENING, FIRE_GLOOM, FIRE_IMAGINATION, FIRE_FROST, FIRE_SPIT,
  OWL_OPENING, TIGER_SIGNAL, TIGER_ENDING, TIGER_YOUTH,
};
