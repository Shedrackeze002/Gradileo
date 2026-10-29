/**
 * Public-domain poems for Grade 11 English, Unit 2, quoted exactly from Project Gutenberg and
 * Wikisource (indentation dropped, lines a printer wrapped joined again, a drop capital printed as
 * an ordinary capital, “--” printed as a dash and quotation marks made typographic). Every poet died
 * before 1955 and every poem was published before 1929, so all are in the public domain everywhere.
 * Donne’s and Herbert’s poems keep the spelling of their first printing (1633). Grade 10’s poems
 * (../../eng10/gen/poems.ts) are reused only for comparison, never for the question they were used
 * for in Grade 10.
 */
import type { Poem, Verse } from '../../eng10/gen/poems.ts';

export { linesOf, verseBlock, verseMd, withBold, type Poem, type Verse } from '../../eng10/gen/poems.ts';

const V = (poem: Poem, text: string): Verse => ({ poem, lines: text.split('\n') });

// ---------------------------------------------------------------------------- the poems

export const VALEDICTION: Poem = { author: 'John Donne', title: 'A Valediction: Forbidding Mourning', year: 1633, url: 'https://www.gutenberg.org/ebooks/48688' };
export const HOLY10: Poem = { author: 'John Donne', title: 'Death, be not proud', year: 1633, url: 'https://www.gutenberg.org/ebooks/48688' };
export const SUN_RISING: Poem = { author: 'John Donne', title: 'The Sun Rising', year: 1633, url: 'https://en.wikisource.org/wiki/The_Sun_Rising' };
export const PULLEY: Poem = { author: 'George Herbert', title: 'The Pulley', year: 1633, url: 'https://en.wikisource.org/wiki/The_Temple:_Sacred_Poems_and_Private_Ejaculations/The_Pulley' };
export const MILTON19: Poem = { author: 'John Milton', title: 'When I consider how my light is spent', year: 1673, url: 'https://www.gutenberg.org/ebooks/31706' };
export const WORLD: Poem = { author: 'William Wordsworth', title: 'The world is too much with us', year: 1807, url: 'https://www.gutenberg.org/ebooks/8774' };
export const LONDON: Poem = { author: 'William Wordsworth', title: 'London, 1802', year: 1807, url: 'https://www.gutenberg.org/ebooks/8774' };
export const CHAPMAN: Poem = { author: 'John Keats', title: 'On First Looking into Chapman’s Homer', year: 1816, url: 'https://www.gutenberg.org/ebooks/8209' };
export const SONNET116: Poem = { author: 'William Shakespeare', title: 'Sonnet 116', year: 1609, url: 'https://www.gutenberg.org/ebooks/1041' };
export const EBB43: Poem = { author: 'Elizabeth Barrett Browning', title: 'How do I love thee?', year: 1850, url: 'https://www.gutenberg.org/ebooks/2002' };
export const DUCHESS: Poem = { author: 'Robert Browning', title: 'My Last Duchess', year: 1842, url: 'https://www.gutenberg.org/ebooks/16376' };
export const ULYSSES: Poem = { author: 'Alfred, Lord Tennyson', title: 'Ulysses', year: 1842, url: 'https://en.wikisource.org/wiki/Poems_(Tennyson,_1843)/Volume_2/Ulysses' };
export const MAN_KILLED: Poem = { author: 'Thomas Hardy', title: 'The Man He Killed', year: 1902, url: 'https://www.gutenberg.org/ebooks/2997' };
export const DIGGING: Poem = { author: 'Thomas Hardy', title: 'Ah, Are You Digging on My Grave?', year: 1913, url: 'https://www.gutenberg.org/ebooks/2863' };
export const THRUSH: Poem = { author: 'Thomas Hardy', title: 'The Darkling Thrush', year: 1900, url: 'https://www.gutenberg.org/ebooks/3168' };
export const ANTHEM: Poem = { author: 'Wilfred Owen', title: 'Anthem for Doomed Youth', year: 1920, url: 'https://www.gutenberg.org/ebooks/1034' };
export const DULCE: Poem = { author: 'Wilfred Owen', title: 'Dulce et Decorum Est', year: 1920, url: 'https://www.gutenberg.org/ebooks/1034' };
export const PARABLE: Poem = { author: 'Wilfred Owen', title: 'Parable of the Old Men and the Young', year: 1920, url: 'https://www.gutenberg.org/ebooks/1034' };
export const WAR_KIND: Poem = { author: 'Stephen Crane', title: 'War Is Kind', year: 1899, url: 'https://www.gutenberg.org/ebooks/9870' };
export const SOLDIER: Poem = { author: 'Rupert Brooke', title: 'The Soldier', year: 1914, url: 'https://www.gutenberg.org/ebooks/262' };
export const GRANDEUR: Poem = { author: 'Gerard Manley Hopkins', title: 'God’s Grandeur', year: 1918, url: 'https://www.gutenberg.org/ebooks/22403' };
export const MUST_DIE: Poem = { author: 'Claude McKay', title: 'If We Must Die', year: 1919, url: 'https://www.gutenberg.org/ebooks/64989' };
export const CORY: Poem = { author: 'Edwin Arlington Robinson', title: 'Richard Cory', year: 1897, url: 'https://www.gutenberg.org/ebooks/313' };
export const DOUGLASS: Poem = { author: 'Paul Laurence Dunbar', title: 'Douglass', year: 1903, url: 'https://www.gutenberg.org/ebooks/18338' };
export const FRIGATE: Poem = { author: 'Emily Dickinson', title: 'There is no frigate like a book', year: 1896, url: 'https://www.gutenberg.org/ebooks/12242' };
export const LIQUOR: Poem = { author: 'Emily Dickinson', title: 'I taste a liquor never brewed', year: 1890, url: 'https://www.gutenberg.org/ebooks/12242' };
export const MADNESS: Poem = { author: 'Emily Dickinson', title: 'Much madness is divinest sense', year: 1890, url: 'https://www.gutenberg.org/ebooks/12242' };
export const SUCCESS: Poem = { author: 'Emily Dickinson', title: 'Success is counted sweetest', year: 1890, url: 'https://www.gutenberg.org/ebooks/12242' };
export const DOVER: Poem = { author: 'Matthew Arnold', title: 'Dover Beach', year: 1867, url: 'https://www.gutenberg.org/ebooks/54985' };
export const SECOND_COMING: Poem = { author: 'W. B. Yeats', title: 'The Second Coming', year: 1920, url: 'https://en.wikisource.org/wiki/Michael_Robartes_and_the_Dancer/The_Second_Coming' };

export const POEMS: Poem[] = [
  VALEDICTION, HOLY10, SUN_RISING, PULLEY, MILTON19, WORLD, LONDON, CHAPMAN, SONNET116, EBB43, DUCHESS, ULYSSES, MAN_KILLED, DIGGING, THRUSH, ANTHEM, DULCE,
  PARABLE, WAR_KIND, SOLDIER, GRANDEUR, MUST_DIE, CORY, DOUGLASS, FRIGATE, LIQUOR, MADNESS, SUCCESS, DOVER, SECOND_COMING,
];

// ---------------------------------------------------------------------------- Donne and Herbert (1633 spelling)

export const VALEDICTION_OPENING = V(VALEDICTION, `As virtuous men passe mildly away,
And whisper to their soules, to goe,
Whilst some of their sad friends doe say,
The breath goes now, and some say, no:

So let us melt, and make no noise,
No teare-floods, nor sigh-tempests move,
T’were prophanation of our joyes
To tell the layetie our love.`);
export const VALEDICTION_GOLD = V(VALEDICTION, `Our two soules therefore, which are one,
Though I must goe, endure not yet
A breach, but an expansion,
Like gold to ayery thinnesse beate.`);
export const VALEDICTION_COMPASS = V(VALEDICTION, `If they be two, they are two so
As stiffe twin compasses are two,
Thy soule the fixt foot, makes no show
To move, but doth, if the’other doe.

And though it in the center sit,
Yet when the other far doth rome,
It leanes, and hearkens after it,
And growes erect, as that comes home.

Such wilt thou be to mee, who must
Like th’other foot, obliquely runne;
Thy firmnes makes my circle just,
And makes me end, where I begunne.`);

export const HOLY10_ALL = V(HOLY10, `Death be not proud, though some have called thee
Mighty and dreadfull, for, thou art not soe,
For, those, whom thou think’st, thou dost overthrow,
Die not, poore death, nor yet canst thou kill mee.
From rest and sleepe, which but thy pictures bee,
Much pleasure, then from thee, much more must flow,
And soonest our best men with thee doe goe,
Rest of their bones, and soules deliverie.
Thou art slave to Fate, Chance, kings, and desperate men,
And dost with poyson, warre, and sicknesse dwell,
And poppie, or charmes can make us sleepe as well,
And better then thy stroake; why swell’st thou then?
One short sleepe past, wee wake eternally,
And death shall be no more; death, thou shalt die.`);

export const SUN_RISING_LAST = V(SUN_RISING, `Thou, Sun, art half as happy as we,
In that the world’s contracted thus;
Thine age asks ease, and since thy duties be
To warm the world, that’s done in warming us.
Shine here to us, and thou art everywhere;
This bed thy center is, these walls thy sphere.`);

export const PULLEY_ALL = V(PULLEY, `When God at first made man,
Having a glasse of blessings standing by;
Let us (said he) poure on him all we can:
Let the worlds riches, which dispersed lie,
Contract into a span.

So strength first made a way;
Then beautie flow’d, then wisdome, honour, pleasure:
When almost all was out, God made a stay,
Perceiving that alone of all his treasure
Rest in the bottome lay.

For if I should (said he)
Bestow this jewell also on my creature,
He would adore my gifts in stead of me,
And rest in Nature, not the God of Nature,
So both should losers be.

Yet let him keep the rest,
But keep them with repining restlesnesse:
Let him be rich and wearie, that at least,
If goodnesse leade him not, yet wearinesse
May tosse him to my breast.`);

// ---------------------------------------------------------------------------- sonnets

export const MILTON19_ALL = V(MILTON19, `When I consider how my light is spent
Ere half my days in this dark world and wide,
And that one talent which is death to hide
Lodged with me useless, though my soul more bent
To serve therewith my Maker, and present
My true account, lest He returning chide,
“Doth God exact day-labor, light denied?”
I fondly ask. But Patience, to prevent
That murmur, soon replies, “God doth not need
Either man’s work or his own gifts. Who best
Bear his mild yoke, they serve him best. His state
Is kingly; thousands at his bidding speed,
And post o’er land and ocean without rest;
They also serve who only stand and wait.”`);

export const WORLD_ALL = V(WORLD, `The world is too much with us; late and soon,
Getting and spending, we lay waste our powers:
Little we see in nature that is ours;
We have given our hearts away, a sordid boon!
This Sea that bares her bosom to the moon;
The Winds that will be howling at all hours
And are up-gathered now like sleeping flowers;
For this, for every thing, we are out of tune;
It moves us not—Great God! I’d rather be
A Pagan suckled in a creed outworn;
So might I, standing on this pleasant lea,
Have glimpses that would make me less forlorn;
Have sight of Proteus coming from the sea;
Or hear old Triton blow his wreathed horn.`);

export const LONDON_ALL = V(LONDON, `Milton! thou should’st be living at this hour:
England hath need of thee: she is a fen
Of stagnant waters: altar, sword and pen,
Fireside, the heroic wealth of hall and bower,
Have forfeited their ancient English dower
Of inward happiness. We are selfish men;
Oh! raise us up, return to us again;
And give us manners, virtue, freedom, power.
Thy soul was like a Star and dwelt apart:
Thou hadst a voice whose sound was like the sea;
Pure as the naked heavens, majestic, free,
So didst thou travel on life’s common way,
In chearful godliness; and yet thy heart
The lowliest duties on itself did lay.`);

export const CHAPMAN_ALL = V(CHAPMAN, `Much have I traveled in the realms of gold,
And many goodly states and kingdoms seen;
Round many western islands have I been
Which bards in fealty to Apollo hold.
Oft of one wide expanse had I been told
That deep-brow’d Homer ruled as his demesne;
Yet did I never breathe its pure serene
Till I heard Chapman speak out loud and bold:
Then felt I like some watcher of the skies
When a new planet swims into his ken;
Or like stout Cortez when with eagle eyes
He star’d at the Pacific—and all his men
Look’d at each other with a wild surmise—
Silent, upon a peak in Darien.`);

export const SONNET116_ALL = V(SONNET116, `Let me not to the marriage of true minds
Admit impediments. Love is not love
Which alters when it alteration finds,
Or bends with the remover to remove:
O, no! it is an ever-fixed mark,
That looks on tempests and is never shaken;
It is the star to every wandering bark,
Whose worth’s unknown, although his height be taken.
Love’s not Time’s fool, though rosy lips and cheeks
Within his bending sickle’s compass come;
Love alters not with his brief hours and weeks,
But bears it out even to the edge of doom.
If this be error and upon me prov’d,
I never writ, nor no man ever lov’d.`);

export const EBB43_ALL = V(EBB43, `How do I love thee? Let me count the ways.
I love thee to the depth and breadth and height
My soul can reach, when feeling out of sight
For the ends of Being and ideal Grace.
I love thee to the level of everyday’s
Most quiet need, by sun and candlelight.
I love thee freely, as men strive for Right;
I love thee purely, as they turn from Praise.
I love thee with the passion put to use
In my old griefs, and with my childhood’s faith.
I love thee with a love I seemed to lose
With my lost saints,—I love thee with the breath,
Smiles, tears, of all my life!—and, if God choose,
I shall but love thee better after death.`);

export const GRANDEUR_ALL = V(GRANDEUR, `The world is charged with the grandeur of God.
It will flame out, like shining from shook foil;
It gathers to a greatness, like the ooze of oil
Crushed. Why do men then now not reck his rod?
Generations have trod, have trod, have trod;
And all is seared with trade; bleared, smeared with toil;
And wears man’s smudge and shares man’s smell: the soil
Is bare now, nor can foot feel, being shod.

And for all this, nature is never spent;
There lives the dearest freshness deep down things;
And though the last lights off the black West went
Oh, morning, at the brown brink eastward, springs—
Because the Holy Ghost over the bent
World broods with warm breast and with ah! bright wings.`);

export const MUST_DIE_ALL = V(MUST_DIE, `If we must die, let it not be like hogs
Hunted and penned in an inglorious spot,
While round us bark the mad and hungry dogs,
Making their mock at our accursèd lot.
If we must die, O let us nobly die,
So that our precious blood may not be shed
In vain; then even the monsters we defy
Shall be constrained to honor us though dead!
O kinsmen! we must meet the common foe!
Though far outnumbered let us show us brave,
And for their thousand blows deal one death-blow!
What though before us lies the open grave?
Like men we’ll face the murderous, cowardly pack,
Pressed to the wall, dying, but fighting back!`);

export const DOUGLASS_ALL = V(DOUGLASS, `Ah, Douglass, we have fall’n on evil days,
Such days as thou, not even thou didst know,
When thee, the eyes of that harsh long ago
Saw, salient, at the cross of devious ways,
And all the country heard thee with amaze.
Not ended then, the passionate ebb and flow,
The awful tide that battled to and fro;
We ride amid a tempest of dispraise.

Now, when the waves of swift dissension swarm,
And Honor, the strong pilot, lieth stark,
Oh, for thy voice high-sounding o’er the storm,
For thy strong arm to guide the shivering bark,
The blast-defying power of thy form,
To give us comfort through the lonely dark.`);

export const SOLDIER_ALL = V(SOLDIER, `If I should die, think only this of me:
That there’s some corner of a foreign field
That is for ever England. There shall be
In that rich earth a richer dust concealed;
A dust whom England bore, shaped, made aware,
Gave, once, her flowers to love, her ways to roam,
A body of England’s, breathing English air,
Washed by the rivers, blest by suns of home.

And think, this heart, all evil shed away,
A pulse in the eternal mind, no less
Gives somewhere back the thoughts by England given;
Her sights and sounds; dreams happy as her day;
And laughter, learnt of friends; and gentleness,
In hearts at peace, under an English heaven.`);

export const ANTHEM_ALL = V(ANTHEM, `What passing-bells for these who die as cattle?
Only the monstrous anger of the guns.
Only the stuttering rifles’ rapid rattle
Can patter out their hasty orisons.
No mockeries for them; no prayers nor bells,
Nor any voice of mourning save the choirs,—
The shrill, demented choirs of wailing shells;
And bugles calling for them from sad shires.

What candles may be held to speed them all?
Not in the hands of boys, but in their eyes
Shall shine the holy glimmers of goodbyes.
The pallor of girls’ brows shall be their pall;
Their flowers the tenderness of patient minds,
And each slow dusk a drawing-down of blinds.`);

// ---------------------------------------------------------------------------- dramatic monologues

export const DUCHESS_OPENING = V(DUCHESS, `That’s my last Duchess painted on the wall,
Looking as if she were alive. I call
That piece a wonder, now: Frà Pandolf’s hands
Worked busily a day, and there she stands.
Will’t please you sit and look at her? I said
“Frà Pandolf” by design: for never read
Strangers like you that pictured countenance,
The depth and passion of its earnest glance,
But to myself they turned (since none puts by
The curtain I have drawn for you, but I)
And seemed as they would ask me, if they durst,
How such a glance came there; so, not the first
Are you to turn and ask thus.`);
export const DUCHESS_LOOKS = V(DUCHESS, `She had
A heart—how shall I say?—too soon made glad,
Too easily impressed; she liked whate’er
She looked on, and her looks went everywhere.`);
export const DUCHESS_NAME = V(DUCHESS, `She thanked men,—good! but thanked
Somehow—I know not how—as if she ranked
My gift of a nine-hundred-years-old name
With anybody’s gift. Who’d stoop to blame
This sort of trifling?`);
export const DUCHESS_STOOP = V(DUCHESS, `—E’en then would be some stooping: and I choose
Never to stoop.`);
export const DUCHESS_COMMANDS = V(DUCHESS, `Oh, sir, she smiled, no doubt,
Whene’er I passed her; but who passed without
Much the same smile? This grew; I gave commands;
Then all smiles stopped together. There she stands
As if alive.`);
export const DUCHESS_DOWRY = V(DUCHESS, `I repeat,
The Count your master’s known munificence
Is ample warrant that no just pretence
Of mine for dowry will be disallowed;
Though his fair daughter’s self, as I avowed
At starting, is my object.`);
export const DUCHESS_NEPTUNE = V(DUCHESS, `Nay, we’ll go
Together down, sir. Notice Neptune, though,
Taming a sea-horse, thought a rarity,
Which Claus of Innsbruck cast in bronze for me!`);

export const ULYSSES_OPENING = V(ULYSSES, `It little profits that an idle king,
By this still hearth, among these barren crags,
Match’d with an aged wife, I mete and dole
Unequal laws unto a savage race,
That hoard, and sleep, and feed, and know not me.
I cannot rest from travel: I will drink
Life to the lees:`);
export const ULYSSES_RUST = V(ULYSSES, `How dull it is to pause, to make an end,
To rust unburnish’d, not to shine in use!
As tho’ to breathe were life.`);
export const ULYSSES_SON = V(ULYSSES, `This is my son, mine own Telemachus,
To whom I leave the sceptre and the isle—
Well-loved of me, discerning to fulfil
This labour, by slow prudence to make mild
A rugged people, and thro’ soft degrees
Subdue them to the useful and the good.
Most blameless is he, centred in the sphere
Of common duties, decent not to fail
In offices of tenderness, and pay
Meet adoration to my household gods
When I am gone. He works his work, I mine.`);
export const ULYSSES_FRIENDS = V(ULYSSES, `There lies the port: the vessel puffs her sail:
There gloom the dark broad seas. My mariners,
Souls that have toil’d, and wrought, and thought with me—`);
export const ULYSSES_END = V(ULYSSES, `It may be that the gulfs will wash us down:
It may be we shall touch the Happy Isles,
And see the great Achilles, whom we knew.
Tho’ much is taken, much abides; and tho’
We are not now that strength which in old days
Moved earth and heaven; that which we are, we are;
One equal temper of heroic hearts,
Made weak by time and fate, but strong in will
To strive, to seek, to find, and not to yield.`);

// ---------------------------------------------------------------------------- irony

export const MAN_KILLED_ALL = V(MAN_KILLED, `“Had he and I but met
By some old ancient inn,
We should have sat us down to wet
Right many a nipperkin!

“But ranged as infantry,
And staring face to face,
I shot at him as he at me,
And killed him in his place.

“I shot him dead because—
Because he was my foe,
Just so: my foe of course he was;
That’s clear enough; although

“He thought he’d ’list, perhaps,
Off-hand like—just as I—
Was out of work—had sold his traps—
No other reason why.

“Yes; quaint and curious war is!
You shoot a fellow down
You’d treat if met where any bar is,
Or help to half-a-crown.”`);

export const DIGGING_ALL = V(DIGGING, `“Ah, are you digging on my grave
My loved one?—planting rue?”
—“No: yesterday he went to wed
One of the brightest wealth has bred.
‘It cannot hurt her now,’ he said,
‘That I should not be true.’”

“Then who is digging on my grave?
My nearest dearest kin?”
—“Ah, no; they sit and think, ‘What use!
What good will planting flowers produce?
No tendance of her mound can loose
Her spirit from Death’s gin.’”

“But some one digs upon my grave?
My enemy?—prodding sly?”
—“Nay: when she heard you had passed the Gate
That shuts on all flesh soon or late,
She thought you no more worth her hate,
And cares not where you lie.”

“Then, who is digging on my grave?
Say—since I have not guessed!”
—“O it is I, my mistress dear,
Your little dog, who still lives near,
And much I hope my movements here
Have not disturbed your rest?”

“Ah, yes! You dig upon my grave . . .
Why flashed it not on me
That one true heart was left behind!
What feeling do we ever find
To equal among human kind
A dog’s fidelity!”

“Mistress, I dug upon your grave
To bury a bone, in case
I should be hungry near this spot
When passing on my daily trot.
I am sorry, but I quite forgot
It was your resting-place.”`);

export const WAR_KIND_OPENING = V(WAR_KIND, `Do not weep, maiden, for war is kind.
Because your lover threw wild hands toward the sky
And the affrighted steed ran on alone,
Do not weep.
War is kind.`);
export const WAR_KIND_BABE = V(WAR_KIND, `Do not weep, babe, for war is kind.
Because your father tumbled in the yellow trenches,
Raged at his breast, gulped and died,
Do not weep.
War is kind.`);
export const WAR_KIND_FLAG = V(WAR_KIND, `Swift blazing flag of the regiment,
Eagle with crest of red and gold,
These men were born to drill and die.
Point for them the virtue of the slaughter,
Make plain to them the excellence of killing
And a field where a thousand corpses lie.`);
export const WAR_KIND_MOTHER = V(WAR_KIND, `Mother whose heart hung humble as a button
On the bright splendid shroud of your son,
Do not weep.
War is kind.`);

export const DULCE_LAST = V(DULCE, `If in some smothering dreams, you too could pace
Behind the wagon that we flung him in,
And watch the white eyes writhing in his face,
His hanging face, like a devil’s sick of sin,
If you could hear, at every jolt, the blood
Come gargling from the froth-corrupted lungs
Bitter as the cud
Of vile, incurable sores on innocent tongues,—
My friend, you would not tell with such high zest
To children ardent for some desperate glory,
The old Lie: Dulce et decorum est
Pro patria mori.`);
export const DULCE_LIE = V(DULCE, `My friend, you would not tell with such high zest
To children ardent for some desperate glory,
The old Lie: Dulce et decorum est
Pro patria mori.`);

export const PARABLE_OPENING = V(PARABLE, `So Abram rose, and clave the wood, and went,
And took the fire with him, and a knife.
And as they sojourned both of them together,
Isaac the first-born spake and said, My Father,
Behold the preparations, fire and iron,
But where the lamb for this burnt-offering?`);
export const PARABLE_END = V(PARABLE, `When lo! an angel called him out of heaven,
Saying, Lay not thy hand upon the lad,
Neither do anything to him. Behold,
A ram caught in a thicket by its horns;
Offer the Ram of Pride instead of him.
But the old man would not so, but slew his son. . . .`);

export const CORY_ALL = V(CORY, `Whenever Richard Cory went down town,
We people on the pavement looked at him:
He was a gentleman from sole to crown,
Clean favored, and imperially slim.

And he was always quietly arrayed,
And he was always human when he talked;
But still he fluttered pulses when he said,
“Good-morning,” and he glittered when he walked.

And he was rich,—yes, richer than a king,—
And admirably schooled in every grace:
In fine, we thought that he was everything
To make us wish that we were in his place.

So on we worked, and waited for the light,
And went without the meat, and cursed the bread;
And Richard Cory, one calm summer night,
Went home and put a bullet through his head.`);

export const MADNESS_ALL = V(MADNESS, `Much madness is divinest sense
To a discerning eye;
Much sense the starkest madness.
’T is the majority
In this, as all, prevails.
Assent, and you are sane;
Demur,—you’re straightway dangerous,
And handled with a chain.`);

export const SUCCESS_ALL = V(SUCCESS, `Success is counted sweetest
By those who ne’er succeed.
To comprehend a nectar
Requires sorest need.

Not one of all the purple host
Who took the flag to-day
Can tell the definition,
So clear, of victory,

As he, defeated, dying,
On whose forbidden ear
The distant strains of triumph
Break, agonized and clear!`);

// ---------------------------------------------------------------------------- extended metaphor and allusion

export const FRIGATE_ALL = V(FRIGATE, `There is no frigate like a book
To take us lands away,
Nor any coursers like a page
Of prancing poetry.
This traverse may the poorest take
Without oppress of toll;
How frugal is the chariot
That bears a human soul!`);

export const LIQUOR_FIRST = V(LIQUOR, `I taste a liquor never brewed,
From tankards scooped in pearl;
Not all the vats upon the Rhine
Yield such an alcohol!

Inebriate of air am I,
And debauchee of dew,
Reeling, through endless summer days,
From inns of molten blue.`);

export const DOVER_SOPHOCLES = V(DOVER, `Sophocles long ago
Heard it on the Ægean, and it brought
Into his mind the turbid ebb and flow
Of human misery: we
Find also in the sound a thought,
Hearing it by this distant northern sea.`);
export const DOVER_FAITH = V(DOVER, `The sea of faith
Was once, too, at the full, and round earth’s shore
Lay like the folds of a bright girdle furled.
But now I only hear
Its melancholy, long, withdrawing roar,
Retreating, to the breath
Of the night-wind, down the vast edges drear
And naked shingles of the world.`);

export const SECOND_COMING_END = V(SECOND_COMING, `Surely some revelation is at hand;
Surely the Second Coming is at hand.`);
export const SECOND_COMING_BEAST = V(SECOND_COMING, `The darkness drops again but now I know
That twenty centuries of stony sleep
Were vexed to nightmare by a rocking cradle,
And what rough beast, its hour come round at last,
Slouches towards Bethlehem to be born?`);

export const THRUSH_ALL = V(THRUSH, `I leant upon a coppice gate
When Frost was spectre-gray,
And Winter’s dregs made desolate
The weakening eye of day.
The tangled bine-stems scored the sky
Like strings from broken lyres,
And all mankind that haunted nigh
Had sought their household fires.

The land’s sharp features seemed to be
The Century’s corpse outleant,
His crypt the cloudy canopy,
The wind his death-lament.
The ancient pulse of germ and birth
Was shrunken hard and dry,
And every spirit upon earth
Seemed fervourless as I.

At once a voice outburst among
The bleak twigs overhead
In a full-hearted evensong
Of joy illimited;
An aged thrush, frail, gaunt, and small,
In blast-beruffled plume,
Had chosen thus to fling his soul
Upon the growing gloom.

So little cause for carollings
Of such ecstatic sound
Was written on terrestrial things
Afar or nigh around,
That I could think there trembled through
His happy good-night air
Some blessed Hope, whereof he knew
And I was unaware.`);
export const THRUSH_LAST = V(THRUSH, `At once a voice outburst among
The bleak twigs overhead
In a full-hearted evensong
Of joy illimited;
An aged thrush, frail, gaunt, and small,
In blast-beruffled plume,
Had chosen thus to fling his soul
Upon the growing gloom.

So little cause for carollings
Of such ecstatic sound
Was written on terrestrial things
Afar or nigh around,
That I could think there trembled through
His happy good-night air
Some blessed Hope, whereof he knew
And I was unaware.`);

/** Every verse, for the quotation check. */
export const VERSES: Record<string, Verse> = {
  VALEDICTION_OPENING, VALEDICTION_GOLD, VALEDICTION_COMPASS, HOLY10_ALL, SUN_RISING_LAST, PULLEY_ALL, MILTON19_ALL, WORLD_ALL, LONDON_ALL, CHAPMAN_ALL,
  SONNET116_ALL, EBB43_ALL, GRANDEUR_ALL, MUST_DIE_ALL, DOUGLASS_ALL, SOLDIER_ALL, ANTHEM_ALL, DUCHESS_OPENING, DUCHESS_LOOKS, DUCHESS_NAME, DUCHESS_STOOP,
  DUCHESS_COMMANDS, DUCHESS_DOWRY, DUCHESS_NEPTUNE, ULYSSES_OPENING, ULYSSES_RUST, ULYSSES_SON, ULYSSES_FRIENDS, ULYSSES_END, MAN_KILLED_ALL, DIGGING_ALL,
  WAR_KIND_OPENING, WAR_KIND_BABE, WAR_KIND_FLAG, WAR_KIND_MOTHER, DULCE_LAST, DULCE_LIE, PARABLE_OPENING, PARABLE_END, CORY_ALL, MADNESS_ALL, SUCCESS_ALL,
  FRIGATE_ALL, LIQUOR_FIRST, DOVER_SOPHOCLES, DOVER_FAITH, SECOND_COMING_END, SECOND_COMING_BEAST, THRUSH_ALL, THRUSH_LAST,
};
