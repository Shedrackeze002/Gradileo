/**
 * Short excerpts from the public-domain stories of Grade 11 English, Unit 1, quoted exactly from
 * Project Gutenberg and Wikisource (wrapped lines joined, quotation marks and dashes made
 * typographic). Each story was published before 1925 and its author died before 1945, so it is in
 * the public domain everywhere. None is a translation.
 */
import { cite, quoteBlock, titled, type Excerpt, type Story } from '../../eng10/gen/texts.ts';

export { cite, quoteBlock, titled, type Excerpt, type Story };

export const BROWN: Story = { author: 'Nathaniel Hawthorne', title: 'Young Goodman Brown', year: 1835, url: 'https://www.gutenberg.org/ebooks/512' };
export const VEIL: Story = { author: 'Nathaniel Hawthorne', title: 'The Minister’s Black Veil', year: 1836, url: 'https://www.gutenberg.org/ebooks/508' };
export const WALLPAPER: Story = { author: 'Charlotte Perkins Gilman', title: 'The Yellow Wallpaper', year: 1892, url: 'https://www.gutenberg.org/ebooks/1952' };
export const ARABY: Story = { author: 'James Joyce', title: 'Araby', year: 1914, url: 'https://www.gutenberg.org/ebooks/2814' };
export const BRILL: Story = { author: 'Katherine Mansfield', title: 'Miss Brill', year: 1920, url: 'https://www.gutenberg.org/ebooks/1429' };
export const PARTY: Story = { author: 'Katherine Mansfield', title: 'The Garden Party', year: 1922, url: 'https://www.gutenberg.org/ebooks/1429' };
export const BOAT: Story = { author: 'Stephen Crane', title: 'The Open Boat', year: 1897, url: 'https://www.gutenberg.org/ebooks/45524' };
export const BRIDE: Story = { author: 'Stephen Crane', title: 'The Bride Comes to Yellow Sky', year: 1898, url: 'https://www.gutenberg.org/ebooks/45524' };
export const HERON: Story = { author: 'Sarah Orne Jewett', title: 'A White Heron', year: 1886, url: 'https://en.wikisource.org/wiki/A_White_Heron' };
export const FROG: Story = {
  author: 'Mark Twain',
  title: 'The Celebrated Jumping Frog of Calaveras County',
  year: 1865,
  url: 'https://en.wikisource.org/wiki/The_Celebrated_Jumping_Frog_of_Calaveras_County,_and_Other_Sketches/The_Celebrated_Jumping_Frog_of_Calaveras_County',
};
export const DESIREE: Story = { author: 'Kate Chopin', title: 'Désirée’s Baby', year: 1893, url: 'https://www.gutenberg.org/ebooks/160' };

export const STORIES: Story[] = [BROWN, VEIL, WALLPAPER, ARABY, BRILL, PARTY, BOAT, BRIDE, HERON, FROG, DESIREE];

const X = (story: Story, text: string): Excerpt => ({ story, text });

// ---------------------------------------------------------------- Hawthorne, "Young Goodman Brown"
export const BROWN_OPENING = X(BROWN, 'Young Goodman Brown came forth at sunset into the street at Salem village; but put his head back, after crossing the threshold, to exchange a parting kiss with his young wife. And Faith, as the wife was aptly named, thrust her own pretty head into the street, letting the wind play with the pink ribbons of her cap while she called to Goodman Brown.');
export const BROWN_ANGEL = X(BROWN, '“Well, she’s a blessed angel on earth; and after this one night I’ll cling to her skirts and follow her to heaven.” With this excellent resolve for the future, Goodman Brown felt himself justified in making more haste on his present evil purpose.');
export const BROWN_ROAD = X(BROWN, 'He had taken a dreary road, darkened by all the gloomiest trees of the forest, which barely stood aside to let the narrow path creep through, and closed immediately behind.');
export const BROWN_STAFF = X(BROWN, 'But the only thing about him that could be fixed upon as remarkable was his staff, which bore the likeness of a great black snake, so curiously wrought that it might almost be seen to twist and wriggle itself like a living serpent.');
export const BROWN_CATECHISM = X(BROWN, '“That old woman taught me my catechism,” said the young man; and there was a world of meaning in this simple comment.');
export const BROWN_RIBBON = X(BROWN, 'But something fluttered lightly down through the air and caught on the branch of a tree. The young man seized it, and beheld a pink ribbon. “My Faith is gone!” cried he, after one stupefied moment. “There is no good on earth; and sin is but a name. Come, devil; for to thee is this world given.”');
export const BROWN_RETURN = X(BROWN, 'Turning the corner by the meeting-house, he spied the head of Faith, with the pink ribbons, gazing anxiously forth, and bursting into such joy at sight of him that she skipped along the street and almost kissed her husband before the whole village. But Goodman Brown looked sternly and sadly into her face, and passed on without a greeting.');
export const BROWN_DREAM = X(BROWN, 'Had Goodman Brown fallen asleep in the forest and only dreamed a wild dream of a witch-meeting? Be it so if you will; but, alas! it was a dream of evil omen for young Goodman Brown.');
export const BROWN_CHANGE = X(BROWN, 'A stern, a sad, a darkly meditative, a distrustful, if not a desperate man did he become from the night of that fearful dream.');
export const BROWN_GRAVE = X(BROWN, 'And when he had lived long, and was borne to his grave a hoary corpse, followed by Faith, an aged woman, and children and grandchildren, a goodly procession, besides neighbors not a few, they carved no hopeful verse upon his tombstone, for his dying hour was gloom.');

// ---------------------------------------------------------------- Hawthorne, "The Minister's Black Veil"
export const VEIL_FIRST = X(VEIL, 'Swathed about his forehead, and hanging down over his face, so low as to be shaken by his breath, Mr. Hooper had on a black veil.');
export const VEIL_PRISON = X(VEIL, 'All through life that piece of crape had hung between him and the world: it had separated him from cheerful brotherhood and woman’s love, and kept him in that saddest of all prisons, his own heart;');
export const VEIL_EVERY = X(VEIL, 'When the friend shows his inmost heart to his friend; the lover to his best beloved; when man does not vainly shrink from the eye of his Creator, loathsomely treasuring up the secret of his sin; then deem me a monster, for the symbol beneath which I have lived, and die! I look around me, and, lo! on every visage a Black Veil!');

// ---------------------------------------------------------------- Gilman, "The Yellow Wallpaper"
export const PAPER_HAUNTED = X(WALLPAPER, 'A colonial mansion, a hereditary estate, I would say a haunted house, and reach the height of romantic felicity—but that would be asking too much of fate!');
export const PAPER_JOHN = X(WALLPAPER, 'John is a physician, and perhaps—(I would not say it to a living soul, of course, but this is dead paper and a great relief to my mind)—perhaps that is one reason I do not get well faster.');
export const PAPER_SICK = X(WALLPAPER, 'You see, he does not believe I am sick! And what can one do?');
export const PAPER_CAREFUL = X(WALLPAPER, 'He is very careful and loving, and hardly lets me stir without special direction.');
export const PAPER_PATTERN = X(WALLPAPER, 'One of those sprawling flamboyant patterns committing every artistic sin.');
export const PAPER_FIGURE = X(WALLPAPER, 'But in the places where it isn’t faded, and where the sun is just so, I can see a strange, provoking, formless sort of figure, that seems to sulk about behind that silly and conspicuous front design.');
export const PAPER_BARS = X(WALLPAPER, 'At night in any kind of light, in twilight, candlelight, lamplight, and worst of all by moonlight, it becomes bars! The outside pattern I mean, and the woman behind it is as plain as can be.');
export const PAPER_SHAKES = X(WALLPAPER, 'The front pattern does move—and no wonder! The woman behind shakes it!');
export const PAPER_CAME_OUT = X(WALLPAPER, 'I wonder if they all come out of that wallpaper as I did?');
export const PAPER_FAINTED = X(WALLPAPER, 'Now why should that man have fainted? But he did, and right across my path by the wall, so that I had to creep over him every time!');

// ---------------------------------------------------------------- Joyce, "Araby"
export const ARABY_STREET = X(ARABY, 'North Richmond Street, being blind, was a quiet street except at the hour when the Christian Brothers’ School set the boys free. An uninhabited house of two storeys stood at the blind end, detached from its neighbours in a square ground. The other houses of the street, conscious of decent lives within them, gazed at one another with brown imperturbable faces.');
export const ARABY_SUMMONS = X(ARABY, 'I had never spoken to her, except for a few casual words, and yet her name was like a summons to all my foolish blood.');
export const ARABY_CHALICE = X(ARABY, 'These noises converged in a single sensation of life for me: I imagined that I bore my chalice safely through a throng of foes.');
export const ARABY_HARP = X(ARABY, 'But my body was like a harp and her words and gestures were like fingers running upon the wires.');
export const ARABY_FOLLIES = X(ARABY, 'What innumerable follies laid waste my waking and sleeping thoughts after that evening! I wished to annihilate the tedious intervening days.');
export const ARABY_ENCHANT = X(ARABY, 'The syllables of the word *Araby* were called to me through the silence in which my soul luxuriated and cast an Eastern enchantment over me.');
export const ARABY_UNCLE = X(ARABY, 'At nine o’clock I heard my uncle’s latchkey in the halldoor. I heard him talking to himself and heard the hallstand rocking when it had received the weight of his overcoat. I could interpret these signs.');
export const ARABY_BAZAAR = X(ARABY, 'Nearly all the stalls were closed and the greater part of the hall was in darkness. I recognised a silence like that which pervades a church after a service.');
export const ARABY_COINS = X(ARABY, 'Before a curtain, over which the words *Café Chantant* were written in coloured lamps, two men were counting money on a salver. I listened to the fall of the coins.');
export const ARABY_ENDING = X(ARABY, 'Gazing up into the darkness I saw myself as a creature driven and derided by vanity; and my eyes burned with anguish and anger.');

// ---------------------------------------------------------------- Mansfield, "Miss Brill"
export const BRILL_FUR = X(BRILL, 'Miss Brill put up her hand and touched her fur. Dear little thing! It was nice to feel it again.');
export const BRILL_EXPERT = X(BRILL, 'She had become really quite expert, she thought, at listening as though she didn’t listen, at sitting in other people’s lives just for a minute while they talked round her.');
export const BRILL_CUPBOARDS = X(BRILL, 'They were odd, silent, nearly all old, and from the way they stared they looked as though they’d just come from dark little rooms or even—even cupboards!');
export const BRILL_STAGE = X(BRILL, 'They were all on the stage. They weren’t only the audience, not only looking on; they were acting. Even she had a part and came every Sunday.');
export const BRILL_GIRL = X(BRILL, '“It’s her fu-fur which is so funny,” giggled the girl. “It’s exactly like a fried whiting.”');
export const BRILL_ALMOND = X(BRILL, 'If there was an almond it was like carrying home a tiny present—a surprise—something that might very well not have been there.');
export const BRILL_PASSED = X(BRILL, 'But to-day she passed the baker’s by, climbed the stairs, went into the little dark room—her room like a cupboard—and sat down on the red eiderdown.');
export const BRILL_ENDING = X(BRILL, 'She unclasped the necklet quickly; quickly, without looking, laid it inside. But when she put the lid on she thought she heard something crying.');

// ---------------------------------------------------------------- Mansfield, "The Garden Party"
export const PARTY_OPENING = X(PARTY, 'And after all the weather was ideal. They could not have had a more perfect day for a garden-party if they had ordered it.');
export const PARTY_KNOW = X(PARTY, '“Know those little cottages just below here, miss?” Know them? Of course, she knew them.');
export const PARTY_PRETEND = X(PARTY, '“Stop the garden-party, of course.” Why did Jose pretend?');
export const PARTY_EYESORE = X(PARTY, 'True, they were far too near. They were the greatest possible eyesore, and they had no right to be in that neighbourhood at all.');
export const PARTY_NORMALLY = X(PARTY, '“But, my dear child, use your common sense. It’s only by accident we’ve heard of it. If some one had died there normally—and I can’t understand how they keep alive in those poky little holes—we should still be having our party, shouldn’t we?”');
export const PARTY_LATER = X(PARTY, 'I’ll remember it again after the party’s over, she decided. And somehow that seemed quite the best plan....');
export const PARTY_IDEA = X(PARTY, 'There on the table were all those sandwiches, cakes, puffs, all uneaten, all going to be wasted. She had one of her brilliant ideas.');
export const PARTY_LILIES = X(PARTY, '“Take it yourself, darling,” said she. “Run down just as you are. No, wait, take the arum lilies too. People of that class are so impressed by arum lilies.”');
export const PARTY_DEAD = X(PARTY, 'There lay a young man, fast asleep—sleeping so soundly, so deeply, that he was far, far away from them both. Oh, so remote, so peaceful. He was dreaming.');
export const PARTY_HAT = X(PARTY, '“Forgive my hat,” she said.');
export const PARTY_LIFE = X(PARTY, '“Isn’t life,” she stammered, “isn’t life—” But what life was she couldn’t explain. No matter. He quite understood.');

// ---------------------------------------------------------------- Crane, "The Open Boat" and "The Bride Comes to Yellow Sky"
export const BOAT_OPENING = X(BOAT, 'None of them knew the colour of the sky. Their eyes glanced level, and were fastened upon the waves that swept toward them.');
export const BOAT_BATHTUB = X(BOAT, 'Many a man ought to have a bath-tub larger than the boat which here rode upon the sea.');
export const BOAT_DROWNED = X(BOAT, '“If I am going to be drowned—if I am going to be drowned—if I am going to be drowned, why, in the name of the seven mad gods who rule the sea, was I allowed to come thus far and contemplate sand and trees?”');
export const BOAT_TOWER = X(BOAT, 'This tower was a giant, standing with its back to the plight of the ants. It represented in a degree, to the correspondent, the serenity of nature amid the struggles of the individual—nature in the wind, and nature in the vision of men. She did not seem cruel to him then, nor beneficent, nor treacherous, nor wise. But she was indifferent, flatly indifferent.');
export const BOAT_OILER = X(BOAT, 'In the shallows, face downward, lay the oiler. His forehead touched sand that was periodically, between each wave, clear of the sea.');
export const BOAT_ENDING = X(BOAT, 'When it came night, the white waves paced to and fro in the moonlight, and the wind brought the sound of the great sea’s voice to the men on shore, and they felt that they could then be interpreters.');
export const BRIDE_TRAIN = X(BRIDE, 'The great Pullman was whirling onward with such dignity of motion that a glance from the window seemed simply to prove that the plains of Texas were pouring eastward.');
export const BRIDE_EXPRESS = X(BRIDE, 'The California Express on the Southron Railway was due at Yellow Sky in twenty-one minutes.');
export const BRIDE_ENDING = X(BRIDE, '“Married!” He was not a student of chivalry; it was merely that in the presence of this foreign condition he was a simple child of the earlier plains. He picked up his starboard revolver, and placing both weapons in their holsters, he went away. His feet made funnel-shaped tracks in the heavy sand.');

// ---------------------------------------------------------------- Jewett, "A White Heron"
export const HERON_GUN = X(HERON, 'Sylvia would have liked him vastly better without his gun; she could not understand why he killed the very birds he seemed to like so much.');
export const HERON_STAR = X(HERON, 'Sylvia’s face was like a pale star, if one had seen it from the ground, when the last thorny bough was past, and she stood trembling and tired but wholly triumphant, high in the tree-top.');
export const HERON_LOOK = X(HERON, 'Now look down again, Sylvia, where the green marsh is set among the shining birches and dark hemlocks; there where you saw the white heron once you will see him again; look, look!');
export const HERON_SILENCE = X(HERON, 'No, she must keep silence! What is it that suddenly forbids her and makes her dumb? Has she been nine years growing and now, when the great world for the first time puts out a hand to her, must she thrust it aside for a bird’s sake?');
export const HERON_SECRET = X(HERON, 'The murmur of the pine’s green branches is in her ears, she remembers how the white heron came flying through the golden air and how they watched the sea and the morning together, and Sylvia cannot speak; she cannot tell the heron’s secret and give its life away.');

// ---------------------------------------------------------------- Twain, "The Celebrated Jumping Frog of Calaveras County"
export const FROG_WHEELER = X(FROG, 'He never smiled, he never frowned, he never changed his voice from the gentle-flowing key to which he tuned the initial sentence, he never betrayed the slightest suspicion of enthusiasm;');
export const FROG_ABSURD = X(FROG, 'To me, the spectacle of a man drifting serenely along through such a queer yarn without ever smiling, was exquisitely absurd.');
export const FROG_BIRDS = X(FROG, 'why, if there was two birds setting on a fence, he would bet you which one would fly first;');
export const FROG_ENDING = X(FROG, '“Oh! hang Smiley and his afflicted cow!” I muttered, good-naturedly, and bidding the old gentleman good-day, I departed.');

// ---------------------------------------------------------------- Chopin, "Désirée's Baby"
export const DESIREE_PISTOL = X(DESIREE, 'That was the way all the Aubignys fell in love, as if struck by a pistol shot.');
export const DESIREE_HAPPY = X(DESIREE, 'Oh, mamma, I’m so happy; it frightens me.');

/** Every excerpt, for the quotation check. */
export const EXCERPTS: Record<string, Excerpt> = {
  BROWN_OPENING, BROWN_ANGEL, BROWN_ROAD, BROWN_STAFF, BROWN_CATECHISM, BROWN_RIBBON, BROWN_RETURN, BROWN_DREAM, BROWN_CHANGE, BROWN_GRAVE,
  VEIL_FIRST, VEIL_PRISON, VEIL_EVERY,
  PAPER_HAUNTED, PAPER_JOHN, PAPER_SICK, PAPER_CAREFUL, PAPER_PATTERN, PAPER_FIGURE, PAPER_BARS, PAPER_SHAKES, PAPER_CAME_OUT, PAPER_FAINTED,
  ARABY_STREET, ARABY_SUMMONS, ARABY_CHALICE, ARABY_HARP, ARABY_FOLLIES, ARABY_ENCHANT, ARABY_UNCLE, ARABY_BAZAAR, ARABY_COINS, ARABY_ENDING,
  BRILL_FUR, BRILL_EXPERT, BRILL_CUPBOARDS, BRILL_STAGE, BRILL_GIRL, BRILL_ALMOND, BRILL_PASSED, BRILL_ENDING,
  PARTY_OPENING, PARTY_KNOW, PARTY_PRETEND, PARTY_EYESORE, PARTY_NORMALLY, PARTY_LATER, PARTY_IDEA, PARTY_LILIES, PARTY_DEAD, PARTY_HAT, PARTY_LIFE,
  BOAT_OPENING, BOAT_BATHTUB, BOAT_DROWNED, BOAT_TOWER, BOAT_OILER, BOAT_ENDING, BRIDE_TRAIN, BRIDE_EXPRESS, BRIDE_ENDING,
  HERON_GUN, HERON_STAR, HERON_LOOK, HERON_SILENCE, HERON_SECRET,
  FROG_WHEELER, FROG_ABSURD, FROG_BIRDS, FROG_ENDING,
  DESIREE_PISTOL, DESIREE_HAPPY,
};

/** “Title” (year) by Author, for a lead-in that names the writer. */
export const byline = (s: Story) => `${titled(s)} by ${s.author}`;
