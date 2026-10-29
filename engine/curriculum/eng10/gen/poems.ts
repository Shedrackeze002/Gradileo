/**
 * Public-domain poems and lines of verse for Unit 2, quoted exactly from Project Gutenberg and
 * Wikisource (indentation dropped, “--” printed as a dash, quotation marks made typographic). Every
 * poet died before 1955 and every poem was published before 1929, so all are in the public domain
 * everywhere. The haiku and limericks marked as Gradileo’s are written for this course.
 */
import { cite, type Story } from './texts.ts';

/** A poem's author, title, year of first publication and where to read it. */
export type Poem = Story;

/** Lines of a poem; an empty string marks a break between stanzas. */
export interface Verse {
  poem: Poem;
  lines: string[];
}

const V = (poem: Poem, text: string): Verse => ({ poem, lines: text.split('\n') });

/** Lines as Markdown that keeps each line break (a backslash before the newline). */
export function verseMd(lines: readonly string[]): string {
  const out: string[] = [];
  lines.forEach((l, i) => {
    const next = lines[i + 1];
    out.push(l === '' ? '' : next !== undefined && next !== '' ? `${l}\\` : l);
  });
  return out.join('\n');
}
/** Lines as a Markdown blockquote, line breaks kept, with the poem's attribution unless `bare`. */
export function verseBlock(v: Verse | readonly string[], opts: { bare?: boolean } = {}): string {
  const lines = Array.isArray(v) ? (v as readonly string[]) : (v as Verse).lines;
  const body = verseMd(lines).split('\n').map((l) => (l ? `> ${l}` : '>'));
  if (!opts.bare && !Array.isArray(v)) body.push('>', `> ${cite((v as Verse).poem)}`);
  return body.join('\n');
}
/** Count the lines of a stanza or poem (not the stanza breaks). */
export const lineCount = (v: Verse) => v.lines.filter((l) => l !== '').length;
/** Lines `from` to `to` (counting from 1, stanza breaks not counted) of a verse, as a verse of the same poem. */
export function linesOf(v: Verse, from: number, to = from): Verse {
  return { poem: v.poem, lines: v.lines.filter((l) => l !== '').slice(from - 1, to) };
}
/** The same verse with the first appearance of `phrase` in bold. */
export function withBold(v: Verse, phrase: string): Verse {
  let done = false;
  const lines = v.lines.map((l) => {
    if (done || !l.includes(phrase)) return l;
    done = true;
    return l.replace(phrase, `**${phrase}**`);
  });
  if (!done) throw new Error(`“${phrase}” is not in ${v.poem.title}`);
  return { poem: v.poem, lines };
}

// ---------------------------------------------------------------------------- the poems

export const EAGLE: Poem = { author: 'Alfred, Lord Tennyson', title: 'The Eagle', year: 1851, url: 'https://en.wikisource.org/wiki/The_Eagle_(Tennyson)' };
export const CLOUD: Poem = { author: 'William Wordsworth', title: 'I wandered lonely as a Cloud', year: 1807, url: 'https://www.gutenberg.org/ebooks/8824' };
export const ROSE: Poem = { author: 'Robert Burns', title: 'A Red, Red Rose', year: 1794, url: 'https://www.gutenberg.org/ebooks/1279' };
export const HOPE: Poem = { author: 'Emily Dickinson', title: 'Hope is the thing with feathers', year: 1891, url: 'https://www.gutenberg.org/ebooks/12242' };
export const DEATH: Poem = { author: 'Emily Dickinson', title: 'Because I could not stop for Death', year: 1890, url: 'https://www.gutenberg.org/ebooks/12242' };
export const NOBODY: Poem = { author: 'Emily Dickinson', title: 'I’m nobody! Who are you?', year: 1891, url: 'https://www.gutenberg.org/ebooks/12242' };
export const FLANDERS: Poem = { author: 'John McCrae', title: 'In Flanders Fields', year: 1915, url: 'https://www.gutenberg.org/ebooks/353' };
export const DULCE: Poem = { author: 'Wilfred Owen', title: 'Dulce et Decorum Est', year: 1920, url: 'https://www.gutenberg.org/ebooks/1034' };
export const RAINS: Poem = { author: 'Sara Teasdale', title: 'There Will Come Soft Rains', year: 1920, url: 'https://www.gutenberg.org/ebooks/591' };
export const ASTRONOMER: Poem = { author: 'Walt Whitman', title: 'When I Heard the Learn’d Astronomer', year: 1865, url: 'https://www.gutenberg.org/ebooks/1322' };
export const CAPTAIN: Poem = { author: 'Walt Whitman', title: 'O Captain! My Captain!', year: 1865, url: 'https://www.gutenberg.org/ebooks/1322' };
export const BEARD: Poem = { author: 'Edward Lear', title: 'There was an Old Man with a beard', year: 1846, url: 'https://www.gutenberg.org/ebooks/982' };
export const MARINER: Poem = { author: 'Samuel Taylor Coleridge', title: 'The Rime of the Ancient Mariner', year: 1798, url: 'https://www.gutenberg.org/ebooks/151' };
export const RAVEN: Poem = { author: 'Edgar Allan Poe', title: 'The Raven', year: 1845, url: 'https://www.gutenberg.org/ebooks/1065' };
export const BELLS: Poem = { author: 'Edgar Allan Poe', title: 'The Bells', year: 1849, url: 'https://www.gutenberg.org/ebooks/2151' };
export const SONNET18: Poem = { author: 'William Shakespeare', title: 'Sonnet 18', year: 1609, url: 'https://www.gutenberg.org/ebooks/1041' };
export const SONNET29: Poem = { author: 'William Shakespeare', title: 'Sonnet 29', year: 1609, url: 'https://www.gutenberg.org/ebooks/1041' };
export const SONNET73: Poem = { author: 'William Shakespeare', title: 'Sonnet 73', year: 1609, url: 'https://www.gutenberg.org/ebooks/1041' };
export const SONNET130: Poem = { author: 'William Shakespeare', title: 'Sonnet 130', year: 1609, url: 'https://www.gutenberg.org/ebooks/1041' };
export const STAGE: Poem = { author: 'William Shakespeare', title: 'As You Like It', year: 1623, url: 'https://www.gutenberg.org/ebooks/1523' };
export const REMEMBER: Poem = { author: 'Christina Rossetti', title: 'Remember', year: 1862, url: 'https://www.gutenberg.org/ebooks/16950' };
export const MASK: Poem = { author: 'Paul Laurence Dunbar', title: 'We Wear the Mask', year: 1896, url: 'https://www.gutenberg.org/ebooks/18338' };
export const SYMPATHY: Poem = { author: 'Paul Laurence Dunbar', title: 'Sympathy', year: 1899, url: 'https://www.gutenberg.org/ebooks/18338' };
export const OZYMANDIAS: Poem = { author: 'Percy Bysshe Shelley', title: 'Ozymandias', year: 1818, url: 'https://www.gutenberg.org/ebooks/4800' };
export const WEST_WIND: Poem = { author: 'Percy Bysshe Shelley', title: 'Ode to the West Wind', year: 1820, url: 'https://www.gutenberg.org/ebooks/4800' };
export const AUTUMN: Poem = { author: 'John Keats', title: 'To Autumn', year: 1820, url: 'https://www.gutenberg.org/ebooks/23684' };
export const TIGER: Poem = { author: 'William Blake', title: 'The Tiger', year: 1794, url: 'https://www.gutenberg.org/ebooks/1934' };

export const POEMS: Poem[] = [EAGLE, CLOUD, ROSE, HOPE, DEATH, NOBODY, FLANDERS, DULCE, RAINS, ASTRONOMER, CAPTAIN, BEARD, MARINER, RAVEN, BELLS, SONNET18, SONNET29, SONNET73, SONNET130, STAGE, REMEMBER, MASK, SYMPATHY, OZYMANDIAS, WEST_WIND, AUTUMN, TIGER];

// ---------------------------------------------------------------------------- whole poems

export const EAGLE_ALL = V(EAGLE, `He clasps the crag with crooked hands;
Close to the sun in lonely lands,
Ring’d with the azure world, he stands.

The wrinkled sea beneath him crawls;
He watches from his mountain walls,
And like a thunderbolt he falls.`);

export const NOBODY_ALL = V(NOBODY, `I’m nobody! Who are you?
Are you nobody, too?
Then there’s a pair of us — don’t tell!
They’d banish us, you know.

How dreary to be somebody!
How public, like a frog
To tell your name the livelong day
To an admiring bog!`);

export const HOPE_ALL = V(HOPE, `Hope is the thing with feathers
That perches in the soul,
And sings the tune without the words,
And never stops at all,

And sweetest in the gale is heard;
And sore must be the storm
That could abash the little bird
That kept so many warm.

I’ve heard it in the chillest land,
And on the strangest sea;
Yet, never, in extremity,
It asked a crumb of me.`);

export const ASTRONOMER_ALL = V(ASTRONOMER, `When I heard the learn’d astronomer,
When the proofs, the figures, were ranged in columns before me,
When I was shown the charts and diagrams, to add, divide, and measure them,
When I sitting heard the astronomer where he lectured with much applause in the lecture-room,
How soon unaccountable I became tired and sick,
Till rising and gliding out I wander’d off by myself,
In the mystical moist night-air, and from time to time,
Look’d up in perfect silence at the stars.`);

export const RAINS_ALL = V(RAINS, `There will come soft rains and the smell of the ground,
And swallows circling with their shimmering sound;

And frogs in the pools singing at night,
And wild plum-trees in tremulous white;

Robins will wear their feathery fire
Whistling their whims on a low fence-wire;

And not one will know of the war, not one
Will care at last when it is done.

Not one would mind, neither bird nor tree
If mankind perished utterly;

And Spring herself, when she woke at dawn,
Would scarcely know that we were gone.`);

export const FLANDERS_ALL = V(FLANDERS, `In Flanders fields the poppies grow
Between the crosses, row on row
That mark our place: and in the sky
The larks still bravely singing, fly
Scarce heard amid the guns below.

We are the Dead. Short days ago
We lived, felt dawn, saw sunset glow,
Loved, and were loved, and now we lie
In Flanders fields.

Take up our quarrel with the foe:
To you from failing hands we throw
The Torch: be yours to hold it high!
If ye break faith with us who die
We shall not sleep, though poppies grow
In Flanders fields.`);

export const REMEMBER_ALL = V(REMEMBER, `Remember me when I am gone away,
Gone far away into the silent land;
When you can no more hold me by the hand,
Nor I half turn to go yet turning stay.
Remember me when no more day by day
You tell me of our future that you planned:
Only remember me; you understand
It will be late to counsel then or pray.
Yet if you should forget me for a while
And afterwards remember, do not grieve:
For if the darkness and corruption leave
A vestige of the thoughts that once I had,
Better by far you should forget and smile
Than that you should remember and be sad.`);

export const MASK_ALL = V(MASK, `We wear the mask that grins and lies,
It hides our cheeks and shades our eyes,—
This debt we pay to human guile;
With torn and bleeding hearts we smile,
And mouth with myriad subtleties.

Why should the world be over-wise,
In counting all our tears and sighs?
Nay, let them only see us, while
We wear the mask.

We smile, but, O great Christ, our cries
To thee from tortured souls arise.
We sing, but oh the clay is vile
Beneath our feet, and long the mile;
But let the world dream otherwise,
We wear the mask!`);

export const OZYMANDIAS_ALL = V(OZYMANDIAS, `I met a traveller from an antique land
Who said: Two vast and trunkless legs of stone
Stand in the desert...Near them, on the sand,
Half sunk, a shattered visage lies, whose frown,
And wrinkled lip, and sneer of cold command,
Tell that its sculptor well those passions read
Which yet survive, stamped on these lifeless things,
The hand that mocked them, and the heart that fed:
And on the pedestal these words appear:
‘My name is Ozymandias, king of kings:
Look on my works, ye Mighty, and despair!’
Nothing beside remains. Round the decay
Of that colossal wreck, boundless and bare
The lone and level sands stretch far away.`);

export const DEATH_ALL = V(DEATH, `Because I could not stop for Death,
He kindly stopped for me;
The carriage held but just ourselves
And Immortality.

We slowly drove, he knew no haste,
And I had put away
My labor, and my leisure too,
For his civility.

We passed the school where children played,
Their lessons scarcely done;
We passed the fields of gazing grain,
We passed the setting sun.

We paused before a house that seemed
A swelling of the ground;
The roof was scarcely visible,
The cornice but a mound.

Since then ’t is centuries; but each
Feels shorter than the day
I first surmised the horses’ heads
Were toward eternity.`);

export const ROSE_ALL = V(ROSE, `O my Luve’s like a red, red rose,
That’s newly sprung in June:
O my Luve’s like the melodie,
That’s sweetly play’d in tune.

As fair art thou, my bonie lass,
So deep in luve am I;
And I will luve thee still, my dear,
Till a’ the seas gang dry.

Till a’ the seas gang dry, my dear,
And the rocks melt wi’ the sun;
And I will luve thee still, my dear,
While the sands o’ life shall run.

And fare-thee-weel, my only Luve!
And fare-thee-weel, a while!
And I will come again, my Luve,
Tho’ ’twere ten thousand mile!`);

export const SONNET18_ALL = V(SONNET18, `Shall I compare thee to a summer’s day?
Thou art more lovely and more temperate:
Rough winds do shake the darling buds of May,
And summer’s lease hath all too short a date:
Sometime too hot the eye of heaven shines,
And often is his gold complexion dimm’d,
And every fair from fair sometime declines,
By chance, or nature’s changing course untrimm’d:
But thy eternal summer shall not fade,
Nor lose possession of that fair thou ow’st,
Nor shall death brag thou wander’st in his shade,
When in eternal lines to time thou grow’st,
So long as men can breathe, or eyes can see,
So long lives this, and this gives life to thee.`);

export const SONNET29_ALL = V(SONNET29, `When in disgrace with fortune and men’s eyes
I all alone beweep my outcast state,
And trouble deaf heaven with my bootless cries,
And look upon myself, and curse my fate,
Wishing me like to one more rich in hope,
Featur’d like him, like him with friends possess’d,
Desiring this man’s art, and that man’s scope,
With what I most enjoy contented least;
Yet in these thoughts my self almost despising,
Haply I think on thee, and then my state,
Like to the lark at break of day arising
From sullen earth, sings hymns at heaven’s gate;
For thy sweet love remember’d such wealth brings
That then I scorn to change my state with kings.`);

export const SONNET73_ALL = V(SONNET73, `That time of year thou mayst in me behold
When yellow leaves, or none, or few, do hang
Upon those boughs which shake against the cold,
Bare ruin’d choirs, where late the sweet birds sang.
In me thou see’st the twilight of such day
As after sunset fadeth in the west;
Which by and by black night doth take away,
Death’s second self, that seals up all in rest.
In me thou see’st the glowing of such fire,
That on the ashes of his youth doth lie,
As the death-bed, whereon it must expire,
Consum’d with that which it was nourish’d by.
This thou perceiv’st, which makes thy love more strong,
To love that well, which thou must leave ere long.`);

// ---------------------------------------------------------------------------- stanzas and lines

export const CLOUD_OPENING = V(CLOUD, `I wandered lonely as a Cloud
That floats on high o’er Vales and Hills,`);
export const CLOUD_LAST = V(CLOUD, `For oft when on my couch I lie
In vacant or in pensive mood,
They flash upon that inward eye
Which is the bliss of solitude,
And then my heart with pleasure fills,
And dances with the Daffodils.`);
export const ROSE_FIRST = V(ROSE, `O my Luve’s like a red, red rose,
That’s newly sprung in June:
O my Luve’s like the melodie,
That’s sweetly play’d in tune.`);
export const ROSE_SEAS = V(ROSE, `And I will luve thee still, my dear,
Till a’ the seas gang dry.`);
export const DEATH_FIRST = V(DEATH, `Because I could not stop for Death,
He kindly stopped for me;
The carriage held but just ourselves
And Immortality.`);
export const DEATH_GRAIN = V(DEATH, `We passed the school where children played,
Their lessons scarcely done;
We passed the fields of gazing grain,
We passed the setting sun.`);
export const DULCE_FIRST = V(DULCE, `Bent double, like old beggars under sacks,
Knock-kneed, coughing like hags, we cursed through sludge,
Till on the haunting flares we turned our backs,
And towards our distant rest began to trudge.`);
export const DULCE_GAS = V(DULCE, `Gas! GAS! Quick, boys!—An ecstasy of fumbling
Fitting the clumsy helmets just in time,`);
export const DULCE_EYES = V(DULCE, `And watch the white eyes writhing in his face,`);
export const CAPTAIN_FIRST = V(CAPTAIN, `O Captain! my Captain! our fearful trip is done,
The ship has weather’d every rack, the prize we sought is won,`);
export const BEARD_ALL = V(BEARD, `There was an Old Man with a beard,
Who said, “It is just as I feared!—
Two Owls and a Hen,
Four Larks and a Wren,
Have all built their nests in my beard!”`);
export const MARINER_SHIP = V(MARINER, `Day after day, day after day,
We stuck, nor breath nor motion;
As idle as a painted ship
Upon a painted ocean.`);
export const MARINER_WATER = V(MARINER, `Water, water, every where,
And all the boards did shrink;
Water, water, every where,
Nor any drop to drink.`);
export const MARINER_BREEZE = V(MARINER, `The fair breeze blew, the white foam flew,
The furrow followed free:
We were the first that ever burst
Into that silent sea.`);
export const MARINER_SUN = V(MARINER, `The bloody Sun, at noon,
Right up above the mast did stand,
No bigger than the Moon.`);
export const RAVEN_FIRST = V(RAVEN, `Once upon a midnight dreary, while I pondered, weak and weary,
Over many a quaint and curious volume of forgotten lore—
While I nodded, nearly napping, suddenly there came a tapping,
As of some one gently rapping, rapping at my chamber door.`);
export const RAVEN_CURTAIN = V(RAVEN, `And the silken sad uncertain rustling of each purple curtain
Thrilled me—filled me with fantastic terrors never felt before;`);
export const BELLS_TINKLE = V(BELLS, `How they tinkle, tinkle, tinkle,
In the icy air of night!`);
export const BELLS_JINGLE = V(BELLS, `To the tintinnabulation that so musically wells
From the bells, bells, bells, bells,
Bells, bells, bells—
From the jingling and the tinkling of the bells.`);
export const BELLS_WEDDING = V(BELLS, `Hear the mellow wedding-bells`);
export const SONNET18_OPENING = V(SONNET18, `Shall I compare thee to a summer’s day?`);
export const SONNET18_BUDS = V(SONNET18, `Rough winds do shake the darling buds of May,`);
export const SONNET18_COUPLET = V(SONNET18, `So long as men can breathe, or eyes can see,
So long lives this, and this gives life to thee.`);
export const SONNET29_FIRST = V(SONNET29, `When in disgrace with fortune and men’s eyes
I all alone beweep my outcast state,
And trouble deaf heaven with my bootless cries,
And look upon myself, and curse my fate,`);
export const SONNET73_FIRST = V(SONNET73, `That time of year thou mayst in me behold
When yellow leaves, or none, or few, do hang
Upon those boughs which shake against the cold,
Bare ruin’d choirs, where late the sweet birds sang.`);
export const SONNET73_LINE1 = V(SONNET73, `That time of year thou mayst in me behold`);
export const SONNET73_LINE3 = V(SONNET73, `Upon those boughs which shake against the cold,`);
export const SONNET130_OPENING = V(SONNET130, `My mistress’ eyes are nothing like the sun;`);
export const SONNET130_COUPLET = V(SONNET130, `And yet by heaven, I think my love as rare,
As any she belied with false compare.`);
export const STAGE_LINES = V(STAGE, `All the world’s a stage,
And all the men and women merely players;
They have their exits and their entrances,
And one man in his time plays many parts,`);
export const MASK_OPENING = V(MASK, `We wear the mask that grins and lies,
It hides our cheeks and shades our eyes,—`);
export const SYMPATHY_LAST = V(SYMPATHY, `I know why the caged bird sings, ah me,
When his wing is bruised and his bosom sore,—
When he beats his bars and he would be free;
It is not a carol of joy or glee,
But a prayer that he sends from his heart’s deep core,
But a plea, that upward to Heaven he flings—
I know why the caged bird sings!`);
export const WEST_WIND_OPENING = V(WEST_WIND, `O wild West Wind, thou breath of Autumn’s being,
Thou, from whose unseen presence the leaves dead
Are driven, like ghosts from an enchanter fleeing,`);
export const AUTUMN_OPENING = V(AUTUMN, `Season of mists and mellow fruitfulness,
Close bosom-friend of the maturing sun;`);
export const TIGER_SECOND = V(TIGER, `In what distant deeps or skies
Burnt the fire of thine eyes?
On what wings dare he aspire?
What the hand dare seize the fire?`);
export const TIGER_OPENING = V(TIGER, `Tiger, tiger, burning bright`);
export const FLANDERS_FIRST = V(FLANDERS, `In Flanders fields the poppies grow
Between the crosses, row on row
That mark our place: and in the sky
The larks still bravely singing, fly
Scarce heard amid the guns below.`);
export const RAINS_FIRST = V(RAINS, `There will come soft rains and the smell of the ground,
And swallows circling with their shimmering sound;

And frogs in the pools singing at night,
And wild plum-trees in tremulous white;`);
export const RAINS_SPRING = V(RAINS, `And Spring herself, when she woke at dawn,
Would scarcely know that we were gone.`);

/** Every quotation above, for the quotation check. */
export const VERSES: Record<string, Verse> = {
  EAGLE_ALL, NOBODY_ALL, HOPE_ALL, ASTRONOMER_ALL, DEATH_ALL, ROSE_ALL, RAINS_ALL, FLANDERS_ALL, REMEMBER_ALL, MASK_ALL, OZYMANDIAS_ALL,
  SONNET18_ALL, SONNET29_ALL, SONNET73_ALL, CLOUD_OPENING, CLOUD_LAST, ROSE_FIRST, ROSE_SEAS, DEATH_FIRST, DEATH_GRAIN,
  DULCE_FIRST, DULCE_GAS, DULCE_EYES, CAPTAIN_FIRST, BEARD_ALL, MARINER_SHIP, MARINER_WATER, MARINER_BREEZE, MARINER_SUN,
  RAVEN_FIRST, RAVEN_CURTAIN, BELLS_TINKLE, BELLS_JINGLE, BELLS_WEDDING, SONNET18_OPENING, SONNET18_BUDS, SONNET18_COUPLET,
  SONNET29_FIRST, SONNET73_FIRST, SONNET73_LINE1, SONNET73_LINE3, SONNET130_OPENING, SONNET130_COUPLET, STAGE_LINES,
  MASK_OPENING, SYMPATHY_LAST, WEST_WIND_OPENING, AUTUMN_OPENING, TIGER_SECOND, TIGER_OPENING, FLANDERS_FIRST, RAINS_FIRST,
  RAINS_SPRING,
};
