/**
 * Grade 7 English, Unit 2: Poetry (E7-B1, E7-B2). Imagery, sound and rhythm, the ballad, the sonnet
 * and free verse, and speaker and tone. The poems quoted are in the public domain: John Keats (“To
 * Autumn”, 1820), William Carlos Williams (“The Red Wheelbarrow”, 1923), Alfred Tennyson (“The
 * Charge of the Light Brigade”, 1854), Robert Louis Stevenson (“Windy Nights”, 1885), Samuel Taylor
 * Coleridge (“The Rime of the Ancient Mariner”, 1834 text), William Shakespeare (Sonnet 18, 1609),
 * Walt Whitman (“When I Heard the Learn’d Astronomer”, 1865), Emily Dickinson (“I’m Nobody! Who are
 * you?”, as first printed in 1891) and Robert Frost (“The Road Not Taken”, 1916). Other verses are
 * written for Gradileo.
 */
import { skill } from '../../helpers.ts';
import type { SkillDef } from '../../../types.ts';
import { bank, Q } from './common.ts';

const B1 = ['E7-B1'];
const B2 = ['E7-B2'];

export const AUTUMN = 'Season of mists and mellow fruitfulness,\nClose bosom-friend of the maturing sun;\nConspiring with him how to load and bless\nWith fruit the vines that round the thatch-eves run;';
const AUTUMN_SRC = 'John Keats, “To Autumn” (1820), first lines';
export const WHEELBARROW = 'so much depends\nupon\n\na red wheel\nbarrow\n\nglazed with rain\nwater\n\nbeside the white\nchickens';
const WHEELBARROW_SRC = 'William Carlos Williams, “The Red Wheelbarrow” (1923)';
export const CHARGE = 'Half a league, half a league,\nHalf a league onward,\nAll in the valley of Death\nRode the six hundred.';
const CHARGE_SRC = 'Alfred Tennyson, “The Charge of the Light Brigade” (1854), first lines';
export const WINDY = 'Whenever the moon and stars are set,\nWhenever the wind is high,\nAll night long in the dark and wet,\nA man goes riding by.';
const WINDY_SRC = 'Robert Louis Stevenson, “Windy Nights” (1885), first lines';
export const MARINER_OPEN = 'It is an ancient Mariner,\nAnd he stoppeth one of three.\n‘By thy long grey beard and glittering eye,\nNow wherefore stopp’st thou me?';
const MARINER_SRC = 'Samuel Taylor Coleridge, “The Rime of the Ancient Mariner” (1834 text)';
export const MARINER_WATER = 'Water, water, every where,\nAnd all the boards did shrink;\nWater, water, every where,\nNor any drop to drink.';
export const MARINER_BECALMED = 'Day after day, day after day,\nWe stuck, nor breath nor motion;\nAs idle as a painted ship\nUpon a painted ocean.';
export const SONNET18 = 'Shall I compare thee to a summer’s day?\nThou art more lovely and more temperate:\nRough winds do shake the darling buds of May,\nAnd summer’s lease hath all too short a date;\nSometime too hot the eye of heaven shines,\nAnd often is his gold complexion dimm’d;\nAnd every fair from fair sometime declines,\nBy chance or nature’s changing course untrimm’d;\nBut thy eternal summer shall not fade,\nNor lose possession of that fair thou ow’st;\nNor shall Death brag thou wander’st in his shade,\nWhen in eternal lines to time thou grow’st:\nSo long as men can breathe or eyes can see,\nSo long lives this, and this gives life to thee.';
const SONNET18_SRC = 'William Shakespeare, Sonnet 18 (1609)';
export const ASTRONOMER = 'When I heard the learn’d astronomer,\nWhen the proofs, the figures, were ranged in columns before me,\nWhen I was shown the charts and diagrams, to add, divide, and measure them,\nWhen I sitting heard the astronomer where he lectured with much applause in the lecture-room,\nHow soon unaccountable I became tired and sick,\nTill rising and gliding out I wander’d off by myself,\nIn the mystical moist night-air, and from time to time,\nLook’d up in perfect silence at the stars.';
const ASTRONOMER_SRC = 'Walt Whitman, “When I Heard the Learn’d Astronomer” (1865)';
export const NOBODY = 'I’m nobody! Who are you?\nAre you nobody, too?\nThen there’s a pair of us — don’t tell!\nThey’d banish us, you know.\n\nHow dreary to be somebody!\nHow public, like a frog\nTo tell your name the livelong day\nTo an admiring bog!';
const NOBODY_SRC = 'Emily Dickinson, “I’m Nobody! Who are you?” (as printed in 1891)';
export const ROAD_END = 'I shall be telling this with a sigh\nSomewhere ages and ages hence:\nTwo roads diverged in a wood, and I—\nI took the one less traveled by,\nAnd that has made all the difference.';
const ROAD_SRC = 'Robert Frost, “The Road Not Taken” (1916), last stanza';

// ---------------------------------------------------------------------------- 2.1 imagery

const SENSES = ['Sight', 'Sound', 'Touch', 'Smell', 'Taste'];
const sense = (d: 1 | 2 | 3, line: string, k: number, why: string, source?: string) =>
  Q(d, 'Which sense does this image appeal to most?', SENSES[k], SENSES.filter((_, i) => i !== k).slice(0, 3), why, line, source);

const IMAGERY = [
  sense(1, 'The kettle shrieked, and the pans rattled on the stove.', 1, 'Shrieked and rattled are sounds.'),
  sense(1, 'The scarlet kite blazed against the clear blue sky.', 0, 'Scarlet, blazed and blue are things we see.'),
  sense(1, 'The icy railing burned my bare fingers.', 2, 'Feeling the cold metal on fingers is touch.'),
  sense(2, 'The kitchen was thick with cinnamon and warm bread.', 3, 'Cinnamon and warm bread fill the air: the image appeals to smell.'),
  sense(2, 'The lemon was so sour it made my whole face pucker.', 4, 'Sourness is a taste; the puckered face shows how strong it is.'),
  sense(2, 'a red wheel\nbarrow\n\nglazed with rain\nwater', 0, 'The poem asks us to picture the red barrow shining with rain. It is a picture for the eye.', WHEELBARROW_SRC),
  sense(3, 'The velvet skin of the peach was warm against my cheek.', 2, 'Velvet and warm describe how the peach feels on the skin: touch.'),
  sense(3, 'It cracked and growled, and roared and howled,\nLike noises in a swound!', 1, 'Cracked, growled, roared and howled are all sounds: the ice around the ship is heard more than seen. (A swound is a swoon, or faint.)', MARINER_SRC),
  Q(3, 'What is imagery?', 'Language that appeals to the five senses', ['A picture printed next to a poem', 'A pattern of rhyming words at line ends', 'A poem that tells a long story'],
    'Imagery is word pictures for any of the senses, not only sight. It lets readers experience a scene.'),
];

const IMAGE_EFFECT = [
  Q(1, 'Which line uses the most vivid imagery?', 'The puppy’s wet nose snuffled into my palm.', ['The dog was very nice and I liked it a lot.', 'We had a dog at home for many, many years.', 'Dogs are very popular pets in my town.'],
    'Wet nose, snuffled and palm let us feel and hear the moment. The others tell without any sensory detail.'),
  Q(1, 'Why do poets use imagery?', 'To help readers see, hear and feel what is described', ['To make sure that every line of the poem rhymes', 'To tell the reader the poet’s name and age', 'To make the poem as short as it can be'],
    'Sensory images let readers experience a scene, not just be told about it.'),
  Q(2, 'What does the image of the wheelbarrow “glazed with rain / water” add to the poem?', 'It makes an ordinary object look shining and precious.', ['It shows that the farm is about to be flooded.', 'It tells the reader that the farmer is very sad.', 'It explains how to build a strong wheelbarrow.'],
    'Glazed suggests a shine, like glaze on pottery. The rain makes a plain farm tool look beautiful, which is the poem’s point: everyday things matter.', WHEELBARROW, WHEELBARROW_SRC),
  Q(2, 'What feeling do Keats’s images of autumn create?', 'Richness and ripeness', ['Fear and danger', 'Cold and emptiness', 'Speed and excitement'],
    'Mellow fruitfulness, the maturing sun and vines loaded with fruit all suggest a rich, ripe, generous season.', AUTUMN, AUTUMN_SRC),
  Q(3, 'What does the image “As idle as a painted ship / Upon a painted ocean” suggest about the sailors’ situation?', 'They are stuck, as still as a ship in a picture.', ['They are sailing quickly and happily towards home.', 'They are busy painting their ship a bright colour.', 'They are enjoying a calm and peaceful holiday.'],
    'A ship in a painting never moves. The image shows the ship becalmed, unable to go anywhere, and the sailors trapped.', MARINER_BECALMED, MARINER_SRC),
  Q(3, 'Which revision adds the strongest image to “The market was busy”?', 'Vendors shouted over the sizzle of frying onions.', ['The market was very, very busy indeed that day.', 'The market had a great many people in it.', 'Many people go to the markets on Saturdays.'],
    'Shouting vendors and sizzling onions give sound and smell. The other versions only repeat or explain the idea.'),
];

// ---------------------------------------------------------------------------- 2.2 sound and rhythm

const RHYTHM = [
  Q(1, 'Which syllable is stressed in the word “garden”?', 'GAR', ['DEN', 'Both equally', 'Neither'],
    'We say GAR-den, with the stress on the first syllable.'),
  Q(1, 'Which syllable is stressed in the word “today”?', 'DAY', ['TO', 'Both equally', 'Neither'],
    'We say to-DAY, with the stress on the second syllable.'),
  Q(1, 'What is rhythm in a poem?', 'The pattern of stressed and unstressed syllables', ['The pattern of rhyming words at the ends of lines', 'The number of stanzas in the poem', 'The title and the poet’s name'],
    'Rhythm is the beat of a poem, made by the pattern of stressed (strong) and unstressed (weak) syllables.'),
  Q(2, 'How many stressed beats are in the line “Half a league, half a league,”?', '4', ['2', '3', '6'],
    'HALF a LEAGUE, HALF a LEAGUE: four strong beats. The rhythm is DUM-da-DUM, like galloping hooves.', CHARGE, CHARGE_SRC),
  Q(2, 'How many stressed beats are in the line “A man goes riding by”?', '3', ['2', '4', '6'],
    'a MAN goes RID-ing BY: three strong beats.', WINDY, WINDY_SRC),
  Q(2, 'Which word has the stress pattern da-DUM-da?', 'banana', ['elephant', 'pencil', 'afternoon'],
    'ba-NA-na is da-DUM-da. EL-e-phant is DUM-da-da, PEN-cil is DUM-da, and af-ter-NOON is da-da-DUM.'),
  Q(3, 'An iamb is one unstressed syllable followed by one stressed syllable (da-DUM). How many iambs are in “Shall I compare thee to a summer’s day?”', '5', ['4', '6', '10'],
    'shall I | com-PARE | thee TO | a SUM | mer’s DAY: ten syllables in five da-DUM pairs. Five iambs in a line is called iambic pentameter.', 'Shall I compare thee to a summer’s day?', SONNET18_SRC),
  Q(3, 'How does the rhythm of these lines match their meaning?', 'The galloping beat sounds like the horses charging.', ['The slow beat sounds like a lullaby for a baby.', 'The lines have no rhythm, like ordinary speech.', 'The beat sounds like a quiet, ticking clock.'],
    'The DUM-da-da pattern (HALF a league, HALF a league) has the drumming feel of hooves at a gallop.', CHARGE, CHARGE_SRC),
];

const SOUND_EFFECT = [
  Q(1, 'Which line uses alliteration?', 'Big bears bounce on blue balloons.', ['The cat sat quietly by the fire.', 'I like to read books in bed at night.', 'The rain stopped and the sun came out.'],
    'Alliteration is the repetition of the same first sound in nearby words: b, b, b, b, b.'),
  Q(1, 'In “Water, water, every where”, which sound device does Coleridge use?', 'Repetition', ['Onomatopoeia', 'Rhyme', 'Hyperbole'],
    'The word water is repeated, and the whole line comes back in the stanza. The repetition stresses the cruel joke: water everywhere, but none to drink.', MARINER_WATER, MARINER_SRC),
  Q(2, 'What is the effect of the repeated words “Whenever” and “Whenever” at the start of the first two lines?', 'They build a steady, mysterious beat, like hooves.', ['They show that the poet forgot what to write next.', 'They tell the reader that the poem is about to end.', 'They prove that the rider is a friendly neighbour.'],
    'Starting lines the same way creates a pattern and a sense of something that happens again and again, which suits the unseen rider.', WINDY, WINDY_SRC),
  Q(2, 'Why does Coleridge repeat “Water, water, every where” in the stanza?', 'To stress the cruel irony of thirst surrounded by sea', ['To show that all the sailors are happy and well fed', 'To fill out the line because no other word would rhyme', 'To describe how the ship’s painter did his work'],
    'The repeated line hammers home the irony: the sailors are surrounded by water, yet they cannot drink sea water.', MARINER_WATER, MARINER_SRC),
  Q(3, 'Which sound device makes these lines feel slow and heavy?', 'Long vowels and repeated phrases', ['Quick, short words with hard sounds', 'A mix of numbers and capital letters', 'Words that imitate a bell ringing'],
    '“Day after day, day after day” repeats long, slow vowel sounds, so the line drags like the days without wind.', MARINER_BECALMED, MARINER_SRC),
  Q(3, 'A poem about a racing train uses short words, a fast beat and many hard “k” and “t” sounds. Why?', 'The sound imitates the speed and clatter of the train.', ['The sounds make the train seem slow and gentle.', 'Hard sounds always show that the poet is angry.', 'The poet wants readers to fall asleep reading it.'],
    'Sound can match sense: a quick beat and clattering consonants echo a speeding train.'),
];

// ---------------------------------------------------------------------------- 2.3 the ballad

const BALLAD = [
  Q(1, 'What is a ballad?', 'A poem or song that tells a story', ['A poem of exactly fourteen lines', 'A short poem with three lines', 'A list of words that rhyme'],
    'Ballads are narrative poems, first passed on as songs, that tell a story, often a dramatic or tragic one.'),
  Q(1, 'How many lines are in a typical ballad stanza?', '4', ['2', '3', '14'],
    'A ballad stanza is a quatrain: four lines.'),
  Q(2, 'What is the usual rhyme scheme of a ballad stanza?', 'ABCB', ['AABB', 'ABBA', 'AAAA'],
    'In a ballad stanza the second and fourth lines rhyme; the first and third often do not. Coleridge’s stanza shrink / drink fits this.', MARINER_WATER, MARINER_SRC),
  Q(2, 'How does the number of beats change from line to line in a ballad stanza?', 'Lines of four beats and three beats take turns.', ['Every line has exactly ten beats.', 'Each line has one more beat than the last.', 'The lines have no beat at all.'],
    'WA-ter, WA-ter, EV-ery WHERE (4); and ALL the BOARDS did SHRINK (3). Ballads alternate four-beat and three-beat lines.', MARINER_WATER, MARINER_SRC),
  Q(2, 'Which feature of ballads is shown here?', 'Dialogue between characters', ['A happy ending for everyone', 'A fourteen-line stanza', 'Lines that do not have a beat'],
    'The wedding guest speaks to the Mariner directly. Ballads often use dialogue, with quotation marks, to tell their stories.', MARINER_OPEN, MARINER_SRC),
  Q(3, 'Why do ballads so often use repetition and refrains?', 'They began as songs passed on by memory.', ['Their poets did not know enough words.', 'Repetition is needed to make them fourteen lines.', 'Refrains make the stories end happily.'],
    'Ballads were sung and remembered long before they were written down. Repeated lines and refrains made them easier to remember and to sing together.'),
  Q(3, 'Which stanza is written as a ballad stanza?', '“The wind blew cold across the moor, / The lady rode alone; / She never saw the castle door / Nor ever reached her home.”', ['“The leaf / falls / slowly / down / to the cold, / wet ground / below / the old tree.”', '“I like dogs. / I like cats. / I like birds / and I like bats. / I like frogs / and I like logs, / and I like hogs / that sit on logs.”', '“So long as men can breathe or eyes can see, / So long lives this, and this gives life to thee.”'],
    'The first is four lines that alternate four and three beats, tells a story and rhymes the second and fourth lines (alone / home), as well as the first and third. The last is Shakespeare’s closing couplet.'),
];

const BALLAD_READ = [
  Q(1, 'Who is speaking in the last two lines of this stanza?', 'The person the Mariner has stopped', ['The Mariner himself, still talking', 'The poet’s mother, from far away', 'The captain of the Mariner’s ship'],
    'The Mariner stops “one of three”, and that person asks why: “Now wherefore stopp’st thou me?” (In the poem he is a guest on his way to a wedding.)', MARINER_OPEN, MARINER_SRC),
  Q(1, 'What does “stopp’st thou me” mean in modern English?', 'Do you stop me', ['Do you follow me', 'Do you know me', 'Do you hear me'],
    'Thou means you, and stopp’st is an old form of stop. Wherefore means why. So: “Why do you stop me?”', MARINER_OPEN, MARINER_SRC),
  Q(2, 'What problem do the sailors face in this stanza?', 'They have nothing to drink.', ['Their ship is sinking fast.', 'They are lost in the dark.', 'They are being chased by pirates.'],
    'Water is all around, but “Nor any drop to drink”: sea water cannot be drunk, and the ship’s wooden boards are shrinking in the heat.', MARINER_WATER, MARINER_SRC),
  Q(2, 'What has happened to the ship in this stanza?', 'There is no wind, so it cannot move.', ['A storm has broken its mast.', 'It has reached land at last.', 'It has been painted a new colour.'],
    '“Nor breath nor motion”: no breath of wind and no movement. The ship is becalmed, as still as one in a painting.', MARINER_BECALMED, MARINER_SRC),
  Q(3, 'The Mariner stops one wedding guest out of three and holds him with his “glittering eye”. What mood does this opening create?', 'Strange and uneasy', ['Light and comic', 'Calm and restful', 'Proud and joyful'],
    'An ancient stranger with a glittering eye who stops someone for no clear reason feels mysterious and unsettling. It draws us into the tale.', MARINER_OPEN, MARINER_SRC),
  Q(3, 'Why might a ballad tell a story about a strange or terrible event?', 'Dramatic events make a story worth retelling.', ['Ballads are only allowed to describe happy days.', 'Strange events are easier to fit into rhyme.', 'Readers of ballads never enjoy any suspense.'],
    'Ballads have always told of shipwrecks, battles, love and ghosts: memorable events that people wanted to hear again.'),
];

// ---------------------------------------------------------------------------- 2.4 the sonnet and free verse

const FORMS = ['A sonnet', 'A ballad', 'Free verse', 'A limerick'];
const form = (d: 1 | 2 | 3, text: string, k: number, why: string, source?: string) =>
  Q(d, 'Which form is this poem or passage written in?', FORMS[k], FORMS.filter((_, i) => i !== k), why, text, source);

const POEM_FORM = [
  Q(1, 'How many lines does a sonnet have?', '14', ['4', '10', '12'],
    'A sonnet is a fourteen-line poem, usually in iambic pentameter with a set rhyme scheme.'),
  Q(1, 'What is free verse?', 'Poetry with no fixed rhyme or regular beat', ['A poem that anyone may print for free', 'A poem of exactly fourteen lines', 'A song with a repeated refrain'],
    'Free verse is free of a regular rhyme scheme and metre. It follows the rhythms of natural speech.'),
  form(2, ASTRONOMER, 2, 'The lines are of very different lengths, there is no rhyme and no regular beat. Whitman is famous for free verse.', ASTRONOMER_SRC),
  form(2, MARINER_WATER, 1, 'Four lines, alternating four and three beats, rhyming the second and fourth lines, in a story poem: a ballad stanza.', MARINER_SRC),
  form(2, 'There once was a cat from Peru\nWho dreamed he was eating a shoe.\nHe woke with a fright\nIn the middle of the night\nAnd found it was perfectly true.', 3,
    'Five lines, rhyming AABBA, with a bouncy beat and a joke: a limerick. (This one is written for Gradileo, after a traditional limerick.)'),
  form(3, SONNET18, 0, 'Fourteen lines of iambic pentameter rhyming ABAB CDCD EFEF GG: a Shakespearean sonnet.', SONNET18_SRC),
  Q(3, 'Why might a poet choose free verse?', 'To follow the rhythms of natural speech and thought', ['To make sure the poem is exactly fourteen lines', 'To make every line rhyme with the line before', 'To give the poem a steady marching beat'],
    'Without a set pattern, a free verse poet can shape each line to the thought, as Whitman does when he leaves the lecture.'),
  Q(3, 'How does the form of Whitman’s poem match its meaning?', 'Long, crowded lines for the lecture give way to a short, quiet last line.', ['Every line rhymes neatly, like the tidy columns of figures.', 'All the lines are the same length, like the astronomer’s charts.', 'The poem is fourteen lines long, like a sonnet by Shakespeare.'],
    'The long, piled-up “When…” lines feel like the tiring lecture. The last line, short and simple, is the peace of looking at the stars.', ASTRONOMER, ASTRONOMER_SRC),
];

const SONNET = [
  Q(1, 'How many quatrains are in a Shakespearean sonnet?', '3', ['2', '4', '14'],
    'A Shakespearean sonnet is three quatrains (four lines each) and a final couplet: 4 + 4 + 4 + 2 = 14.'),
  Q(1, 'What ends a Shakespearean sonnet?', 'A rhyming couplet', ['A quatrain', 'A refrain', 'A single word'],
    'The last two lines rhyme with each other (see / thee in Sonnet 18). The couplet often sums up or twists the poem.'),
  Q(2, 'What is the rhyme scheme of a Shakespearean sonnet?', 'ABAB CDCD EFEF GG', ['AABB CCDD EEFF GG', 'ABBA ABBA CDE CDE', 'ABCB DEFE GHIH JJ'],
    'Each quatrain has its own alternating rhymes, and the couplet rhymes GG. In Sonnet 18: day / May, temperate / date, and so on.'),
  Q(2, 'In Sonnet 18, what does the speaker compare the person to?', 'A summer’s day', ['A painted ship', 'A red wheelbarrow', 'A field of daffodils'],
    'The first line asks, “Shall I compare thee to a summer’s day?” The poem then says the person is even better.', SONNET18, SONNET18_SRC),
  Q(2, 'Why does the speaker say the person is better than a summer’s day?', 'Summer is short and changeable; the person is lovelier and calmer.', ['Summer days are far too cold and dark for the person to enjoy.', 'The person prefers winter and dislikes the heat of the sun.', 'Summer days are always much too long and far too boring.'],
    'Summer has rough winds, ends too soon (“all too short a date”) and is sometimes too hot. The person is “more lovely and more temperate”.', SONNET18, SONNET18_SRC),
  Q(3, 'Line 9 begins with “But”. What is this change of direction in a sonnet called?', 'The turn (or volta)', ['The refrain', 'The chorus', 'The stanza break'],
    'Many sonnets have a turn, where the argument shifts. Here, after eight lines on how summer fades, “But thy eternal summer shall not fade.”', SONNET18, SONNET18_SRC),
  Q(3, 'What does the closing couplet of Sonnet 18 claim?', 'The poem itself will keep the person’s beauty alive.', ['The person will soon forget all about the poet.', 'Summer will last forever, starting from next year.', 'The poet is going to stop writing poems now.'],
    '“So long lives this, and this gives life to thee”: as long as people read the poem (this), the person lives on in it.', SONNET18, SONNET18_SRC),
];

// ---------------------------------------------------------------------------- 2.5 speaker and tone

const SPEAKER = [
  Q(1, 'Who is the speaker of a poem?', 'The voice that speaks the words of the poem', ['Always the very person who wrote the poem', 'The person who reads the poem out loud', 'The publisher who printed the poem in a book'],
    'The speaker is the poem’s voice. It may be close to the poet, or a character the poet invents.'),
  Q(1, 'A poem begins, “I am the old oak at the end of the lane.” Who is the speaker?', 'An oak tree', ['The poet’s grandmother', 'A lane of houses', 'A farmer'],
    'The I of the poem is the tree. The poet has invented a speaker who is not a person at all.'),
  Q(2, 'What does the speaker of Whitman’s poem do at the end?', 'Leaves the lecture to look at the stars in silence', ['Gives a lecture of his own about the stars to a crowd', 'Writes down every one of the astronomer’s figures', 'Asks the astronomer to explain all the charts again'],
    'The speaker grows “tired and sick”, wanders outside, and looks up “in perfect silence at the stars”.', ASTRONOMER, ASTRONOMER_SRC),
  Q(2, 'What kind of person does the speaker in Dickinson’s poem seem to be?', 'Someone who prefers to be private and unknown', ['Someone who longs to be rich and very famous', 'Someone who is angry at all of the frogs', 'Someone who is sad at losing a close friend'],
    'The speaker is happy to be “nobody” and finds being “somebody” dreary and public.', NOBODY, NOBODY_SRC),
  Q(3, 'Why is it better to say “the speaker” than “the poet” when discussing a poem?', 'The voice in a poem may be a character, not the poet.', ['Poets never write about their own lives at all.', 'Nobody knows who wrote most of the poems we read.', 'Poems never use the word I to mean the poet.'],
    'Poets often write as invented speakers, so the speaker’s feelings are not always the poet’s own.'),
  Q(3, 'In Frost’s last stanza, how does the speaker expect to tell the story of the two roads in the future?', 'With a sigh, years from now', ['With a laugh, the very next day', 'In a letter to the other road', 'Never, because it is a secret'],
    '“I shall be telling this with a sigh / Somewhere ages and ages hence”: the speaker imagines looking back on the choice far in the future.', ROAD_END, ROAD_SRC),
];

const TONES = ['Playful', 'Bitter', 'Admiring', 'Weary'];
const tone = (d: 1 | 2 | 3, text: string, k: number, why: string, source?: string) =>
  Q(d, 'Which word best describes the speaker’s tone?', TONES[k], TONES.filter((_, i) => i !== k), why, text, source);

const TONE = [
  Q(1, 'What is tone in a poem?', 'The speaker’s attitude towards the subject', ['The number of syllables in each line', 'The feeling the setting gives the reader', 'The sound made by reading it aloud'],
    'Tone is the speaker’s attitude: admiring, mocking, bitter, playful and so on. Mood is the feeling the reader gets.'),
  tone(1, 'Thou art more lovely and more temperate:', 2, 'The speaker praises the person as lovelier than summer. That is admiring.', SONNET18_SRC),
  tone(2, NOBODY, 0, 'Exclamations, a secret shared (“don’t tell!”) and the joke about a frog croaking its name to a bog make the tone playful and teasing.', NOBODY_SRC),
  tone(2, 'How soon unaccountable I became tired and sick,', 3, 'Tired and sick shows the speaker worn out by the lecture: a weary tone.', ASTRONOMER_SRC),
  tone(3, 'They promised us a park. They built a car park,\nand called the concrete “green space”, with a smile.', 1,
    'The speaker mocks the broken promise, putting “green space” in scare quotes. The tone is bitter. (Lines written for Gradileo.)'),
  Q(3, 'Which words most create Dickinson’s mocking tone towards being “somebody”?', '“How dreary” and “like a frog”', ['“Who are you?” and “nobody”', '“a pair of us” and “don’t tell!”', '“nobody, too” and “you know”'],
    'Calling fame dreary and comparing a famous person to a frog croaking to a bog pokes fun at it.', NOBODY, NOBODY_SRC),
  Q(3, 'Readers disagree about the tone of “I shall be telling this with a sigh”. Which reading fits the words best?', 'Regret or quiet content: the poem leaves it open.', ['The sigh must be of anger at the other traveller.', 'The sigh shows the speaker is bored of walking.', 'The sigh shows the speaker never made a choice.'],
    'A sigh can be wistful or content. Frost does not say which, so the tone is thoughtful and open, which is part of why the poem is so often discussed.', ROAD_END, ROAD_SRC),
];

// ---------------------------------------------------------------------------- skills

export const POETRY_SKILLS: SkillDef[] = [
  skill({ id: 'e7-imagery', name: 'Imagery and the senses', description: 'Identify the sense an image appeals to.', outcomes: B1, lessonId: 'e7-2-1', format: 'mc', gen: bank(IMAGERY, ['Imagery appeals to sight, sound, touch, smell or taste.', 'Ask: which sense would you use to notice this?']) }),
  skill({ id: 'e7-imagery-effect', name: 'What an image adds', description: 'Explain what an image adds to a poem.', outcomes: B1, lessonId: 'e7-2-1', format: 'mc', gen: bank(IMAGE_EFFECT, ['Ask: what feeling or idea does this picture give?', 'Vivid images use precise sensory detail.']) }),
  skill({ id: 'e7-rhythm', name: 'Stress and rhythm', description: 'Hear stressed syllables, count beats and describe a poem’s rhythm.', outcomes: B1, lessonId: 'e7-2-2', format: 'mc', gen: bank(RHYTHM, ['Say the line aloud and tap the strong syllables.', 'An iamb is da-DUM.']) }),
  skill({ id: 'e7-sound-effect', name: 'Sound and meaning', description: 'Explain how repetition, alliteration and rhythm match a poem’s meaning.', outcomes: B1, lessonId: 'e7-2-2', format: 'mc', gen: bank(SOUND_EFFECT, ['Ask: what does this sound make me feel?', 'Sound often echoes sense: fast for speed, slow for stillness.']) }),
  skill({ id: 'e7-ballad', name: 'Features of a ballad', description: 'Know the ballad stanza, its rhyme and beat, and the ballad’s use of story, dialogue and refrain.', outcomes: B2, lessonId: 'e7-2-3', format: 'mc', gen: bank(BALLAD, ['A ballad tells a story.', 'Ballad stanza: four lines, beats 4-3-4-3, rhyming ABCB.']) }),
  skill({ id: 'e7-ballad-reading', name: 'Reading a ballad', description: 'Follow the story, speakers and mood of a ballad.', outcomes: B2, lessonId: 'e7-2-3', format: 'mc', gen: bank(BALLAD_READ, ['Thou means you; wherefore means why.', 'Ask: who is speaking, and what is happening?']) }),
  skill({ id: 'e7-poem-form', name: 'Poetic forms', description: 'Tell a sonnet, a ballad, a limerick and free verse apart.', outcomes: B2, lessonId: 'e7-2-4', format: 'mc', gen: bank(POEM_FORM, ['Count the lines and listen for rhyme and beat.', 'Free verse has no regular rhyme or metre.']) }),
  skill({ id: 'e7-sonnet', name: 'The Shakespearean sonnet', description: 'Know the quatrains, couplet, rhyme scheme and turn of a Shakespearean sonnet, and read Sonnet 18.', outcomes: B2, lessonId: 'e7-2-4', format: 'mc', gen: bank(SONNET, ['Three quatrains and a couplet: ABAB CDCD EFEF GG.', 'Look for the turn, often at line 9 or in the couplet.']) }),
  skill({ id: 'e7-speaker', name: 'The speaker', description: 'Identify the speaker of a poem and tell the speaker from the poet.', outcomes: B1, lessonId: 'e7-2-5', format: 'mc', gen: bank(SPEAKER, ['The speaker is the voice of the poem.', 'Ask: who is the I, and what do they want or feel?']) }),
  skill({ id: 'e7-tone', name: 'Tone', description: 'Describe a speaker’s tone and the words that create it.', outcomes: B1, lessonId: 'e7-2-5', format: 'mc', gen: bank(TONE, ['Tone is the speaker’s attitude to the subject.', 'Look at word choice, punctuation and what is praised or mocked.']) }),
];
