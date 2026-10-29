/**
 * Public-domain poems for Grade 12 English, Unit 2, quoted exactly from Project Gutenberg
 * (indentation dropped, lines a printer wrapped joined again, a printer’s capitals at the start of a
 * poem printed as ordinary letters, footnote markers left out, “--” printed as a dash and quotation
 * marks made typographic). Every poet died before 1955 and every poem was published before 1929, so
 * all are in the public domain everywhere. Whitman is quoted from the 1891–92 edition of Leaves of
 * Grass; Wordsworth’s ode keeps the spelling of its first printing (1807), when it was called simply
 * “Ode”. Grades 10 and 11 use some of these poets, never these poems for the same kind of question.
 */
import type { Poem, Verse } from '../../eng10/gen/poems.ts';
import { AUTUMN, WEST_WIND } from '../../eng10/gen/poems.ts';

export { AUTUMN, WEST_WIND } from '../../eng10/gen/poems.ts';
export { linesOf, verseBlock, verseMd, withBold, type Poem, type Verse } from '../../eng10/gen/poems.ts';

const V = (poem: Poem, text: string): Verse => ({ poem, lines: text.split('\n') });

/** A choice used as a sentence in a solution, with a full stop added when it has none. */
export const end = (s: string) => (/[.!?]”?$/.test(s) ? s : `${s}.`);

// ---------------------------------------------------------------------------- the poems

export const NIGHTINGALE: Poem = { author: 'John Keats', title: 'Ode to a Nightingale', year: 1820, url: 'https://www.gutenberg.org/ebooks/23684' };
export const URN: Poem = { author: 'John Keats', title: 'Ode on a Grecian Urn', year: 1820, url: 'https://www.gutenberg.org/ebooks/23684' };
export const IMMORTALITY: Poem = { author: 'William Wordsworth', title: 'Ode: Intimations of Immortality', year: 1807, url: 'https://www.gutenberg.org/ebooks/8824' };
export const TINTERN: Poem = { author: 'William Wordsworth', title: 'Lines Written a Few Miles above Tintern Abbey', year: 1798, url: 'https://www.gutenberg.org/ebooks/9622' };
export const FROST: Poem = { author: 'Samuel Taylor Coleridge', title: 'Frost at Midnight', year: 1798, url: 'https://www.gutenberg.org/ebooks/8208' };
export const FUTILITY: Poem = { author: 'Wilfred Owen', title: 'Futility', year: 1920, url: 'https://www.gutenberg.org/ebooks/1034' };
export const STRANGE: Poem = { author: 'Wilfred Owen', title: 'Strange Meeting', year: 1920, url: 'https://www.gutenberg.org/ebooks/1034' };
export const SEND_OFF: Poem = { author: 'Wilfred Owen', title: 'The Send-off', year: 1920, url: 'https://www.gutenberg.org/ebooks/1034' };
export const BREAK_OF_DAY: Poem = { author: 'Isaac Rosenberg', title: 'Break of Day in the Trenches', year: 1916, url: 'https://www.gutenberg.org/ebooks/66889' };
export const CHANNEL: Poem = { author: 'Thomas Hardy', title: 'Channel Firing', year: 1914, url: 'https://www.gutenberg.org/ebooks/2863' };
export const VIGIL: Poem = { author: 'Walt Whitman', title: 'Vigil Strange I Kept on the Field One Night', year: 1865, url: 'https://www.gutenberg.org/ebooks/1322' };
export const CAVALRY: Poem = { author: 'Walt Whitman', title: 'Cavalry Crossing a Ford', year: 1865, url: 'https://www.gutenberg.org/ebooks/1322' };
export const DRUMS: Poem = { author: 'Walt Whitman', title: 'Beat! Beat! Drums!', year: 1865, url: 'https://www.gutenberg.org/ebooks/1322' };
export const IN_MEMORIAM: Poem = { author: 'Edward Thomas', title: 'In Memoriam (Easter, 1915)', year: 1917, url: 'https://www.gutenberg.org/ebooks/22423' };
export const RAIN: Poem = { author: 'Edward Thomas', title: 'Rain', year: 1917, url: 'https://www.gutenberg.org/ebooks/22423' };
export const OWL: Poem = { author: 'Edward Thomas', title: 'The Owl', year: 1917, url: 'https://www.gutenberg.org/ebooks/22423' };
export const ADLESTROP: Poem = { author: 'Edward Thomas', title: 'Adlestrop', year: 1917, url: 'https://www.gutenberg.org/ebooks/22423' };
export const PATTERNS: Poem = { author: 'Amy Lowell', title: 'Patterns', year: 1916, url: 'https://www.gutenberg.org/ebooks/841' };
export const BULLION: Poem = { author: 'Amy Lowell', title: 'Bullion', year: 1915, url: 'https://www.gutenberg.org/ebooks/30276' };
export const WINDHOVER: Poem = { author: 'Gerard Manley Hopkins', title: 'The Windhover', year: 1918, url: 'https://www.gutenberg.org/ebooks/22403' };
export const PIED: Poem = { author: 'Gerard Manley Hopkins', title: 'Pied Beauty', year: 1918, url: 'https://www.gutenberg.org/ebooks/22403' };
export const MARVEL: Poem = { author: 'Countee Cullen', title: 'Yet Do I Marvel', year: 1925, url: 'https://www.gutenberg.org/ebooks/70543' };
export const AMERICA: Poem = { author: 'Claude McKay', title: 'America', year: 1921, url: 'https://www.gutenberg.org/ebooks/64989' };
export const TROPICS: Poem = { author: 'Claude McKay', title: 'The Tropics in New York', year: 1920, url: 'https://www.gutenberg.org/ebooks/64989' };
export const TIME_RELIEF: Poem = { author: 'Edna St. Vincent Millay', title: 'Time does not bring relief', year: 1917, url: 'https://www.gutenberg.org/ebooks/109' };
export const CASUAL: Poem = { author: 'Edna St. Vincent Millay', title: 'If I should learn, in some quite casual way', year: 1917, url: 'https://www.gutenberg.org/ebooks/109' };
export const UPHILL: Poem = { author: 'Christina Rossetti', title: 'Up-Hill', year: 1862, url: 'https://www.gutenberg.org/ebooks/16950' };
export const FLY: Poem = { author: 'Emily Dickinson', title: 'I heard a fly buzz when I died', year: 1896, url: 'https://www.gutenberg.org/ebooks/12242' };
export const ATHLETE: Poem = { author: 'A. E. Housman', title: 'To an Athlete Dying Young', year: 1896, url: 'https://www.gutenberg.org/ebooks/5720' };

export const POEMS: Poem[] = [
  NIGHTINGALE, URN, AUTUMN, WEST_WIND, IMMORTALITY, TINTERN, FROST, FUTILITY, STRANGE, SEND_OFF, BREAK_OF_DAY, CHANNEL, VIGIL, CAVALRY, DRUMS, IN_MEMORIAM,
  RAIN, OWL, ADLESTROP, PATTERNS, BULLION, WINDHOVER, PIED, MARVEL, AMERICA, TROPICS, TIME_RELIEF, CASUAL, UPHILL, FLY, ATHLETE,
];

// ---------------------------------------------------------------------------- Keats

export const NIGHTINGALE_OPENING = V(NIGHTINGALE, `My heart aches, and a drowsy numbness pains
My sense, as though of hemlock I had drunk,
Or emptied some dull opiate to the drains
One minute past, and Lethe-wards had sunk:
’Tis not through envy of thy happy lot,
But being too happy in thine happiness,—
That thou, light-winged Dryad of the trees,
In some melodious plot
Of beechen green, and shadows numberless,
Singest of summer in full-throated ease.`);
export const NIGHTINGALE_DRAUGHT = V(NIGHTINGALE, `O, for a draught of vintage! that hath been
Cool’d a long age in the deep-delved earth,
Tasting of Flora and the country green,
Dance, and Provençal song, and sunburnt mirth!
O for a beaker full of the warm South,
Full of the true, the blushful Hippocrene,
With beaded bubbles winking at the brim,
And purple-stained mouth;
That I might drink, and leave the world unseen,
And with thee fade away into the forest dim:`);
export const NIGHTINGALE_WORLD = V(NIGHTINGALE, `Fade far away, dissolve, and quite forget
What thou among the leaves hast never known,
The weariness, the fever, and the fret
Here, where men sit and hear each other groan;
Where palsy shakes a few, sad, last gray hairs,
Where youth grows pale, and spectre-thin, and dies;
Where but to think is to be full of sorrow
And leaden-eyed despairs,
Where Beauty cannot keep her lustrous eyes,
Or new Love pine at them beyond to-morrow.`);
export const NIGHTINGALE_FLY = V(NIGHTINGALE, `Away! away! for I will fly to thee,
Not charioted by Bacchus and his pards,
But on the viewless wings of Poesy,
Though the dull brain perplexes and retards:`);
export const NIGHTINGALE_DARK = V(NIGHTINGALE, `I cannot see what flowers are at my feet,
Nor what soft incense hangs upon the boughs,
But, in embalmed darkness, guess each sweet
Wherewith the seasonable month endows
The grass, the thicket, and the fruit-tree wild;
White hawthorn, and the pastoral eglantine;
Fast fading violets cover’d up in leaves;
And mid-May’s eldest child,
The coming musk-rose, full of dewy wine,
The murmurous haunt of flies on summer eves.`);
export const NIGHTINGALE_DEATH = V(NIGHTINGALE, `Darkling I listen; and, for many a time
I have been half in love with easeful Death,
Call’d him soft names in many a mused rhyme,
To take into the air my quiet breath;
Now more than ever seems it rich to die,
To cease upon the midnight with no pain,
While thou art pouring forth thy soul abroad
In such an ecstasy!`);
export const NIGHTINGALE_IMMORTAL = V(NIGHTINGALE, `Thou wast not born for death, immortal Bird!
No hungry generations tread thee down;
The voice I hear this passing night was heard
In ancient days by emperor and clown:`);
export const NIGHTINGALE_FORLORN = V(NIGHTINGALE, `Forlorn! the very word is like a bell
To toll me back from thee to my sole self!
Adieu! the fancy cannot cheat so well
As she is fam’d to do, deceiving elf.
Adieu! adieu! thy plaintive anthem fades
Past the near meadows, over the still stream,
Up the hill-side; and now ’tis buried deep
In the next valley-glades:
Was it a vision, or a waking dream?
Fled is that music:—Do I wake or sleep?`);

export const URN_OPENING = V(URN, `Thou still unravish’d bride of quietness,
Thou foster-child of silence and slow time,
Sylvan historian, who canst thus express
A flowery tale more sweetly than our rhyme:
What leaf-fring’d legend haunts about thy shape
Of deities or mortals, or of both,
In Tempe or the dales of Arcady?
What men or gods are these? What maidens loth?
What mad pursuit? What struggle to escape?
What pipes and timbrels? What wild ecstasy?`);
export const URN_UNHEARD = V(URN, `Heard melodies are sweet, but those unheard
Are sweeter; therefore, ye soft pipes, play on;
Not to the sensual ear, but, more endear’d,
Pipe to the spirit ditties of no tone:
Fair youth, beneath the trees, thou canst not leave
Thy song, nor ever can those trees be bare;
Bold Lover, never, never canst thou kiss,
Though winning near the goal—yet, do not grieve;
She cannot fade, though thou hast not thy bliss,
For ever wilt thou love, and she be fair!`);
export const URN_TOWN = V(URN, `And, little town, thy streets for evermore
Will silent be; and not a soul to tell
Why thou art desolate, can e’er return.`);
export const URN_ENDING = V(URN, `When old age shall this generation waste,
Thou shalt remain, in midst of other woe
Than ours, a friend to man, to whom thou say’st,
“Beauty is truth, truth beauty,”—that is all
Ye know on earth, and all ye need to know.`);

export const AUTUMN_FIGURE = V(AUTUMN, `Who hath not seen thee oft amid thy store?
Sometimes whoever seeks abroad may find
Thee sitting careless on a granary floor,
Thy hair soft-lifted by the winnowing wind;
Or on a half-reap’d furrow sound asleep,
Drows’d with the fume of poppies, while thy hook
Spares the next swath and all its twined flowers:`);
export const AUTUMN_OOZINGS = V(AUTUMN, `Or by a cyder-press, with patient look,
Thou watchest the last oozings hours by hours.`);
export const AUTUMN_SONGS = V(AUTUMN, `Where are the songs of Spring? Ay, where are they?
Think not of them, thou hast thy music too,—
While barred clouds bloom the soft-dying day,
And touch the stubble-plains with rosy hue;
Then in a wailful choir the small gnats mourn
Among the river sallows, borne aloft
Or sinking as the light wind lives or dies;`);

// ---------------------------------------------------------------------------- Shelley

export const WIND_IF = V(WEST_WIND, `If I were a dead leaf thou mightest bear;
If I were a swift cloud to fly with thee;
A wave to pant beneath thy power, and share

The impulse of thy strength, only less free
Than thou, O uncontrollable!`);
export const WIND_THORNS = V(WEST_WIND, `Oh, lift me as a wave, a leaf, a cloud!
I fall upon the thorns of life! I bleed!
A heavy weight of hours has chained and bowed
One too like thee: tameless, and swift, and proud.`);
export const WIND_LYRE = V(WEST_WIND, `Make me thy lyre, even as the forest is:
What if my leaves are falling like its own!
The tumult of thy mighty harmonies

Will take from both a deep, autumnal tone,
Sweet though in sadness. Be thou, Spirit fierce,
My spirit! Be thou me, impetuous one!`);
export const WIND_PROPHECY = V(WEST_WIND, `Drive my dead thoughts over the universe
Like withered leaves to quicken a new birth!
And, by the incantation of this verse,

Scatter, as from an unextinguished hearth
Ashes and sparks, my words among mankind!
Be through my lips to unawakened earth

The trumpet of a prophecy! O, Wind,
If Winter comes, can Spring be far behind?`);

// ---------------------------------------------------------------------------- Wordsworth and Coleridge

export const ODE_OPENING = V(IMMORTALITY, `There was a time when meadow, grove, and stream,
The earth, and every common sight,
To me did seem
Apparell’d in celestial light,
The glory and the freshness of a dream.
It is not now as it has been of yore;—
Turn wheresoe’er I may,
By night or day,
The things which I have seen I now can see no more.`);
export const ODE_GLEAM = V(IMMORTALITY, `—But there’s a Tree, of many one,
A single Field which I have look’d upon,
Both of them speak of something that is gone:
The Pansy at my feet
Doth the same tale repeat:
Whither is fled the visionary gleam?
Where is it now, the glory and the dream?`);
export const ODE_BIRTH = V(IMMORTALITY, `Our birth is but a sleep and a forgetting:
The Soul that rises with us, our life’s Star,
Hath had elsewhere its setting,
And cometh from afar:
Not in entire forgetfulness,
And not in utter nakedness,
But trailing clouds of glory do we come
From God, who is our home;
Heaven lies about us in our infancy!`);
export const ODE_STRENGTH = V(IMMORTALITY, `What though the radiance which was once so bright
Be now for ever taken from my sight,
Though nothing can bring back the hour
Of splendour in the grass, of glory in the flower;
We will grieve not, rather find
Strength in what remains behind,
In the primal sympathy
Which having been must ever be,
In the soothing thoughts that spring
Out of human suffering,
In the faith that looks through death,
In years that bring the philosophic mind.`);
export const ODE_FOUNTAINS = V(IMMORTALITY, `And oh ye Fountains, Meadows, Hills, and Groves,
Think not of any severing of our loves!
Yet in my heart of hearts I feel your might;
I only have relinquish’d one delight
To live beneath your more habitual sway.`);
export const ODE_LAST = V(IMMORTALITY, `Thanks to the human heart by which we live,
Thanks to its tenderness, its joys, and fears,
To me the meanest flower that blows can give
Thoughts that do often lie too deep for tears.`);

export const TINTERN_OPENING = V(TINTERN, `Five years have passed; five summers, with the length
Of five long winters! and again I hear
These waters, rolling from their mountain-springs
With a sweet inland murmur.—Once again
Do I behold these steep and lofty cliffs,
Which on a wild secluded scene impress
Thoughts of more deep seclusion; and connect
The landscape with the quiet of the sky.`);
export const TINTERN_COMFORT = V(TINTERN, `These forms of beauty have not been to me,
As is a landscape to a blind man’s eye:
But oft, in lonely rooms, and mid the din
Of towns and cities, I have owed to them,
In hours of weariness, sensations sweet,
Felt in the blood, and felt along the heart,
And passing even into my purer mind
With tranquil restoration:`);
export const TINTERN_PAST = V(TINTERN, `That time is past,
And all its aching joys are now no more,
And all its dizzy raptures. Not for this
Faint I, nor mourn nor murmur: other gifts
Have followed, for such loss, I would believe,
Abundant recompence. For I have learned
To look on nature, not as in the hour
Of thoughtless youth, but hearing oftentimes
The still, sad music of humanity,`);
export const TINTERN_SISTER = V(TINTERN, `For thou art with me, here, upon the banks
Of this fair river; thou, my dearest Friend,
My dear, dear Friend, and in thy voice I catch
The language of my former heart, and read
My former pleasures in the shooting lights
Of thy wild eyes. Oh! yet a little while
May I behold in thee what I was once,
My dear, dear Sister!`);

export const FROST_OPENING = V(FROST, `The Frost performs its secret ministry,
Unhelped by any wind. The owlet’s cry
Came loud—and hark, again! loud as before.
The inmates of my cottage, all at rest,
Have left me to that solitude, which suits
Abstruser musings: save that at my side
My cradled infant slumbers peacefully.`);
export const FROST_FILM = V(FROST, `the thin blue flame
Lies on my low-burnt fire, and quivers not;
Only that film, which fluttered on the grate,
Still flutters there, the sole unquiet thing.`);
export const FROST_SCHOOL = V(FROST, `But O! how oft,
How oft, at school, with most believing mind,
Presageful, have I gazed upon the bars,
To watch that fluttering stranger! and as oft
With unclosed lids, already had I dreamt
Of my sweet birth-place, and the old church-tower,`);
export const FROST_BABE = V(FROST, `For I was reared
In the great city, pent ’mid cloisters dim,
And saw nought lovely but the sky and stars.
But *thou*, my babe! shalt wander like a breeze
By lakes and sandy shores, beneath the crags
Of ancient mountain, and beneath the clouds,`);
export const FROST_END = V(FROST, `Therefore all seasons shall be sweet to thee,
Whether the summer clothe the general earth
With greenness, or the redbreast sit and sing
Betwixt the tufts of snow on the bare branch
Of mossy apple-tree, while the nigh thatch
Smokes in the sun-thaw; whether the eave-drops fall
Heard only in the trances of the blast,
Or if the secret ministry of frost
Shall hang them up in silent icicles,
Quietly shining to the quiet Moon.`);

// ---------------------------------------------------------------------------- war and witness

export const FUTILITY_ALL = V(FUTILITY, `Move him into the sun—
Gently its touch awoke him once,
At home, whispering of fields unsown.
Always it woke him, even in France,
Until this morning and this snow.
If anything might rouse him now
The kind old sun will know.

Think how it wakes the seeds—
Woke, once, the clays of a cold star.
Are limbs so dear-achieved, are sides
Full-nerved,—still warm,—too hard to stir?
Was it for this the clay grew tall?
—O what made fatuous sunbeams toil
To break earth’s sleep at all?`);
export const STRANGE_OPENING = V(STRANGE, `It seemed that out of the battle I escaped
Down some profound dull tunnel, long since scooped
Through granites which Titanic wars had groined.
Yet also there encumbered sleepers groaned,
Too fast in thought or death to be bestirred.
Then, as I probed them, one sprang up, and stared
With piteous recognition in fixed eyes,
Lifting distressful hands as if to bless.`);
export const STRANGE_PITY = V(STRANGE, `“None,” said the other, “Save the undone years,
The hopelessness. Whatever hope is yours,
Was my life also; I went hunting wild
After the wildest beauty in the world,`);
export const STRANGE_TRUTH = V(STRANGE, `I mean the truth untold,
The pity of war, the pity war distilled.`);
export const STRANGE_END = V(STRANGE, `I am the enemy you killed, my friend.
I knew you in this dark; for so you frowned
Yesterday through me as you jabbed and killed.
I parried; but my hands were loath and cold.
Let us sleep now . . .”`);
export const SEND_OFF_ALL = V(SEND_OFF, `Down the close, darkening lanes they sang their way
To the siding-shed,
And lined the train with faces grimly gay.

Their breasts were stuck all white with wreath and spray
As men’s are, dead.

Dull porters watched them, and a casual tramp
Stood staring hard,
Sorry to miss them from the upland camp.
Then, unmoved, signals nodded, and a lamp
Winked to the guard.

So secretly, like wrongs hushed-up, they went.
They were not ours:
We never heard to which front these were sent.

Nor there if they yet mock what women meant
Who gave them flowers.

Shall they return to beatings of great bells
In wild trainloads?
A few, a few, too few for drums and yells,
May creep back, silent, to still village wells
Up half-known roads.`);
export const BREAK_OF_DAY_ALL = V(BREAK_OF_DAY, `The darkness crumbles away—
It is the same old druid Time as ever.
Only a live thing leaps my hand—
A queer sardonic rat—
As I pull the parapet’s poppy
To stick behind my ear.
Droll rat, they would shoot you if they knew
Your cosmopolitan sympathies
(And God knows what antipathies).
Now you have touched this English hand
You will do the same to a German—
Soon, no doubt, if it be your pleasure
To cross the sleeping green between.
It seems you inwardly grin as you pass
Strong eyes, fine limbs, haughty athletes
Less chanced than you for life,
Bonds to the whims of murder,
Sprawled in the bowels of the earth,
The torn fields of France.
What do you see in our eyes
At the shrieking iron and flame
Hurled through still heavens?
What quaver—what heart aghast?
Poppies whose roots are in man’s veins
Drop, and are ever dropping;
But mine in my ear is safe,
Just a little white with the dust.`);
export const CHANNEL_OPENING = V(CHANNEL, `That night your great guns, unawares,
Shook all our coffins as we lay,
And broke the chancel window-squares,
We thought it was the Judgment-day

And sat upright. While drearisome
Arose the howl of wakened hounds:
The mouse let fall the altar-crumb,
The worms drew back into the mounds,

The glebe cow drooled. Till God called, “No;
It’s gunnery practice out at sea
Just as before you went below;
The world is as it used to be:`);
export const CHANNEL_GOD = V(CHANNEL, `“All nations striving strong to make
Red war yet redder. Mad as hatters
They do no more for Christés sake
Than you who are helpless in such matters.`);
export const CHANNEL_END = V(CHANNEL, `Again the guns disturbed the hour,
Roaring their readiness to avenge,
As far inland as Stourton Tower,
And Camelot, and starlit Stonehenge.`);
export const VIGIL_OPENING = V(VIGIL, `Vigil strange I kept on the field one night;
When you my son and my comrade dropt at my side that day,
One look I but gave which your dear eyes return’d with a look I shall never forget,
One touch of your hand to mine O boy, reach’d up as you lay on the ground,
Then onward I sped in the battle, the even-contested battle,`);
export const VIGIL_SILENCE = V(VIGIL, `But not a tear fell, not even a long-drawn sigh, long, long I gazed,
Then on the earth partially reclining sat by your side leaning my chin in my hands,
Passing sweet hours, immortal and mystic hours with you dearest comrade—not a tear, not a word,
Vigil of silence, love and death, vigil for you my son and my soldier,`);
export const CAVALRY_ALL = V(CAVALRY, `A line in long array where they wind betwixt green islands,
They take a serpentine course, their arms flash in the sun—hark to the musical clank,
Behold the silvery river, in it the splashing horses loitering stop to drink,
Behold the brown-faced men, each group, each person a picture, the negligent rest on the saddles,
Some emerge on the opposite bank, others are just entering the ford—while,
Scarlet and blue and snowy white,
The guidon flags flutter gayly in the wind.`);
export const DRUMS_FIRST = V(DRUMS, `Beat! beat! drums!—blow! bugles! blow!
Through the windows—through doors—burst like a ruthless force,
Into the solemn church, and scatter the congregation,
Into the school where the scholar is studying;
Leave not the bridegroom quiet—no happiness must he have now with his bride,
Nor the peaceful farmer any peace, ploughing his field or gathering his grain,
So fierce you whirr and pound you drums—so shrill you bugles blow.`);
export const IN_MEMORIAM_ALL = V(IN_MEMORIAM, `The flowers left thick at nightfall in the wood
This Eastertide call into mind the men,
Now far from home, who, with their sweethearts, should
Have gathered them and will do never again.`);
export const OWL_ALL = V(OWL, `Downhill I came, hungry, and yet not starved;
Cold, yet had heat within me that was proof
Against the North wind; tired, yet so that rest
Had seemed the sweetest thing under a roof.

Then at the inn I had food, fire, and rest,
Knowing how hungry, cold, and tired was I.
All of the night was quite barred out except
An owl’s cry, a most melancholy cry

Shaken out long and clear upon the hill,
No merry note, nor cause of merriment,
But one telling me plain what I escaped
And others could not, that night, as in I went.

And salted was my food, and my repose,
Salted and sobered, too, by the bird’s voice
Speaking for all who lay under the stars,
Soldiers and poor, unable to rejoice.`);
export const PATTERNS_OPENING = V(PATTERNS, `I walk down the garden paths,
And all the daffodils
Are blowing, and the bright blue squills.
I walk down the patterned garden-paths
In my stiff, brocaded gown.
With my powdered hair and jewelled fan,
I too am a rare
Pattern. As I wander down
The garden paths.`);
export const PATTERNS_LETTER = V(PATTERNS, `Underneath the fallen blossom
In my bosom,
Is a letter I have hid.
It was brought to me this morning by a rider from the Duke.
“Madam, we regret to inform you that Lord Hartwell
Died in action Thursday se’nnight.”
As I read it in the white, morning sunlight,
The letters squirmed like snakes.
“Any answer, Madam,” said my footman.
“No,” I told him.
“See that the messenger takes some refreshment.
No, no answer.”`);
export const PATTERNS_END = V(PATTERNS, `In Summer and in Winter I shall walk
Up and down
The patterned garden-paths
In my stiff, brocaded gown.
The squills and daffodils
Will give place to pillared roses, and to asters, and to snow.
I shall go
Up and down,
In my gown.
Gorgeously arrayed,
Boned and stayed.
And the softness of my body will be guarded from embrace
By each button, hook, and lace.
For the man who should loose me is dead,
Fighting with the Duke in Flanders,
In a pattern called a war.
Christ! What are patterns for?`);

// ---------------------------------------------------------------------------- modern forms

export const BULLION_ALL = V(BULLION, `My thoughts
Chink against my ribs
And roll about like silver hail-stones.
I should like to spill them out,
And pour them, all shining,
Over you.
But my heart is shut upon them
And holds them straitly.

Come, You! and open my heart;
That my thoughts torment me no longer,
But glitter in your hair.`);
export const WINDHOVER_OCTAVE = V(WINDHOVER, `I caught this morning morning’s minion, king-
dom of daylight’s dauphin, dapple-dawn-drawn Falcon, in his riding
Of the rolling level underneath him steady air, and striding
High there, how he rung upon the rein of a wimpling wing
In his ecstacy! then off, off forth on swing,
As a skate’s heel sweeps smooth on a bow-bend: the hurl and gliding
Rebuffed the big wind. My heart in hiding
Stirred for a bird,—the achieve of, the mastery of the thing!`);
export const WINDHOVER_SESTET = V(WINDHOVER, `Brute beauty and valour and act, oh, air, pride, plume, here
Buckle! AND the fire that breaks from thee then, a billion
Times told lovelier, more dangerous, O my chevalier!

No wonder of it: shéer plód makes plough down sillion
Shine, and blue-bleak embers, ah my dear,
Fall, gall themselves, and gash gold-vermillion.`);
export const PIED_ALL = V(PIED, `Glory be to God for dappled things—
For skies of couple-colour as a brinded cow;
For rose-moles all in stipple upon trout that swim:
Fresh-firecoal chestnut-falls; finches’ wings;
Landscape plotted and pieced—fold, fallow, and plough;
And àll tràdes, their gear and tackle and trim.

All things counter, original, spare, strange;
Whatever is fickle, freckled (who knows how?)
With swift, slow; sweet, sour; adazzle, dim;
He fathers-forth whose beauty is past change:
Praise him.`);
export const MARVEL_ALL = V(MARVEL, `I doubt not God is good, well-meaning, kind,
And did He stoop to quibble could tell why
The little buried mole continues blind,
Why flesh that mirrors Him must some day die,
Make plain the reason tortured Tantalus
Is baited by the fickle fruit, declare
If merely brute caprice dooms Sisyphus
To struggle up a never-ending stair.
Inscrutable His ways are, and immune
To catechism by a mind too strewn
With petty cares to slightly understand
What awful brain compels His awful hand.
Yet do I marvel at this curious thing:
To make a poet black, and bid him sing!`);
export const AMERICA_ALL = V(AMERICA, `Although she feeds me bread of bitterness,
And sinks into my throat her tiger’s tooth,
Stealing my breath of life, I will confess
I love this cultured hell that tests my youth!
Her vigor flows like tides into my blood,
Giving me strength erect against her hate.
Her bigness sweeps my being like a flood.
Yet as a rebel fronts a king in state,
I stand within her walls with not a shred
Of terror, malice, not a word of jeer.
Darkly I gaze into the days ahead,
And see her might and granite wonders there,
Beneath the touch of Time’s unerring hand,
Like priceless treasures sinking in the sand.`);
export const TIME_RELIEF_ALL = V(TIME_RELIEF, `Time does not bring relief; you all have lied
Who told me time would ease me of my pain!
I miss him in the weeping of the rain;
I want him at the shrinking of the tide;
The old snows melt from every mountain-side,
And last year’s leaves are smoke in every lane;
But last year’s bitter loving must remain
Heaped on my heart, and my old thoughts abide!

There are a hundred places where I fear
To go,—so with his memory they brim!
And entering with relief some quiet place
Where never fell his foot or shone his face
I say, “There is no memory of him here!”
And so stand stricken, so remembering him!`);

// ---------------------------------------------------------------------------- unseen poems

export const CASUAL_ALL = V(CASUAL, `If I should learn, in some quite casual way,
That you were gone, not to return again—
Read from the back-page of a paper, say,
Held by a neighbor in a subway train,
How at the corner of this avenue
And such a street (so are the papers filled)
A hurrying man—who happened to be you—
At noon to-day had happened to be killed,
I should not cry aloud—I could not cry
Aloud, or wring my hands in such a place—
I should but watch the station lights rush by
With a more careful interest on my face,
Or raise my eyes and read with greater care
Where to store furs and how to treat the hair.`);
export const TROPICS_ALL = V(TROPICS, `Bananas ripe and green, and ginger-root,
Cocoa in pods and alligator pears,
And tangerines and mangoes and grape fruit,
Fit for the highest prize at parish fairs,

Set in the window, bringing memories
Of fruit-trees laden by low-singing rills,
And dewy dawns, and mystical blue skies
In benediction over nun-like hills.

My eyes grew dim, and I could no more gaze;
A wave of longing through my body swept,
And, hungry for the old, familiar ways,
I turned aside and bowed my head and wept.`);
export const UPHILL_ALL = V(UPHILL, `Does the road wind up-hill all the way?
Yes, to the very end.
Will the day’s journey take the whole long day?
From morn to night, my friend.

But is there for the night a resting-place?
A roof for when the slow dark hours begin.
May not the darkness hide it from my face?
You cannot miss that inn.

Shall I meet other wayfarers at night?
Those who have gone before.
Then must I knock, or call when just in sight?
They will not keep you standing at that door.

Shall I find comfort, travel-sore and weak?
Of labour you shall find the sum.
Will there be beds for me and all who seek?
Yea, beds for all who come.`);
export const FLY_ALL = V(FLY, `I heard a fly buzz when I died;
The stillness round my form
Was like the stillness in the air
Between the heaves of storm.

The eyes beside had wrung them dry,
And breaths were gathering sure
For that last onset, when the king
Be witnessed in his power.

I willed my keepsakes, signed away
What portion of me I
Could make assignable,—and then
There interposed a fly,

With blue, uncertain, stumbling buzz,
Between the light and me;
And then the windows failed, and then
I could not see to see.`);
export const ADLESTROP_ALL = V(ADLESTROP, `Yes. I remember Adlestrop—
The name, because one afternoon
Of heat the express-train drew up there
Unwontedly. It was late June.

The steam hissed. Someone cleared his throat.
No one left and no one came
On the bare platform. What I saw
Was Adlestrop—only the name

And willows, willow-herb, and grass,
And meadowsweet, and haycocks dry,
No whit less still and lonely fair
Than the high cloudlets in the sky.

And for that minute a blackbird sang
Close by, and round him, mistier,
Farther and farther, all the birds
Of Oxfordshire and Gloucestershire.`);
export const ATHLETE_ALL = V(ATHLETE, `The time you won your town the race
We chaired you through the market-place;
Man and boy stood cheering by,
And home we brought you shoulder-high.

To-day, the road all runners come,
Shoulder-high we bring you home,
And set you at your threshold down,
Townsman of a stiller town.

Smart lad, to slip betimes away
From fields where glory does not stay
And early though the laurel grows
It withers quicker than the rose.

Eyes the shady night has shut
Cannot see the record cut,
And silence sounds no worse than cheers
After earth has stopped the ears:

Now you will not swell the rout
Of lads that wore their honours out,
Runners whom renown outran
And the name died before the man.

So set, before its echoes fade,
The fleet foot on the sill of shade,
And hold to the low lintel up
The still-defended challenge-cup.

And round that early-laurelled head
Will flock to gaze the strengthless dead,
And find unwithered on its curls
The garland briefer than a girl’s.`);

/** Every verse, for the quote check. */
export const VERSES: Record<string, Verse> = {
  NIGHTINGALE_OPENING, NIGHTINGALE_DRAUGHT, NIGHTINGALE_WORLD, NIGHTINGALE_FLY, NIGHTINGALE_DARK, NIGHTINGALE_DEATH, NIGHTINGALE_IMMORTAL, NIGHTINGALE_FORLORN,
  URN_OPENING, URN_UNHEARD, URN_TOWN, URN_ENDING, AUTUMN_FIGURE, AUTUMN_OOZINGS, AUTUMN_SONGS, WIND_IF, WIND_THORNS, WIND_LYRE, WIND_PROPHECY,
  ODE_OPENING, ODE_GLEAM, ODE_BIRTH, ODE_STRENGTH, ODE_FOUNTAINS, ODE_LAST, TINTERN_OPENING, TINTERN_COMFORT, TINTERN_PAST, TINTERN_SISTER,
  FROST_OPENING, FROST_FILM, FROST_SCHOOL, FROST_BABE, FROST_END, FUTILITY_ALL, STRANGE_OPENING, STRANGE_PITY, STRANGE_TRUTH, STRANGE_END, SEND_OFF_ALL,
  BREAK_OF_DAY_ALL, CHANNEL_OPENING, CHANNEL_GOD, CHANNEL_END, VIGIL_OPENING, VIGIL_SILENCE, CAVALRY_ALL, DRUMS_FIRST, IN_MEMORIAM_ALL, OWL_ALL,
  PATTERNS_OPENING, PATTERNS_LETTER, PATTERNS_END, BULLION_ALL, WINDHOVER_OCTAVE, WINDHOVER_SESTET, PIED_ALL, MARVEL_ALL, AMERICA_ALL, TIME_RELIEF_ALL,
  CASUAL_ALL, TROPICS_ALL, UPHILL_ALL, FLY_ALL, ADLESTROP_ALL, ATHLETE_ALL,
};
