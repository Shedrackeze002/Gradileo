/**
 * More English Topics, Unit 14: comparing texts, versions and retellings, as the US Common Core
 * asks for them in Grades 5 to 8: comparing characters, settings and events (RL.5.3), several
 * accounts of one event and texts that disagree (RI.5.6, RI.5.9, RI.6.9, RI.7.9, RI.8.9), stories
 * told in pictures, on stage and on screen (RL.5.7, RL.6.7, RL.7.7, RI.7.7), historical fiction
 * and history (RL.7.9), and myths, allusions and modern stories (RL.8.9, L.7.5a). The passages
 * were written for these lessons; the myths and Bible stories they allude to are traditional.
 */
import { skill } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { ask, type Q } from './bank.ts';

const by = (d: Difficulty, banks: [Q[], Q[], Q[]], hints: [string[], string[], string[]]) => (rng: Rng) => ask(rng, banks[d - 1], hints[d - 1]);

// ---------------------------------------------------------------------------------------------
// Lesson 14.1: Comparing characters, settings and events.
// ---------------------------------------------------------------------------------------------

/** A short story written for the lesson, about two cousins at a lake. */
const LAKE = `> Priya had planned every minute of the camping trip. Her list said *swim at ten, hike at two*, and she checked it twice before breakfast. Her cousin Leo had not packed a list, or a toothbrush. He spent the morning lying on the dock, watching dragonflies.
>
> At two o’clock the sky turned the colour of a bruise. Priya wanted to start the hike anyway; the list said so. Leo pointed at the clouds. “The lake will still be here tomorrow,” he said. They spent the afternoon in the tent, and Priya, to her own surprise, enjoyed the rain drumming on the roof.`;

const CHARACTERS: Q[] = [
  { prompt: `${LAKE}\n\nHow are Priya and Leo **different** at the start?`, right: 'Priya plans everything, while Leo takes things as they come', wrong: ['Priya is lazy and sleeps late, while Leo works hard all day', 'Priya is afraid of the lake, while Leo swims there every day', 'Priya forgot her toothbrush, while Leo packed a long list'], why: 'Priya’s list and Leo’s missing toothbrush show a planner and someone relaxed (RL.5.3).' },
  { prompt: `${LAKE}\n\nWhat do Priya and Leo have **in common** by the end?`, right: 'They both spend the rainy afternoon happily in the tent', wrong: ['They both insist on going for the long hike in the storm', 'They both decide to go home before the rain starts', 'They both write a new list of plans for the next day'], why: 'Comparing means finding likenesses too: both end up enjoying the rain from the tent (RL.5.3).' },
  { prompt: `${LAKE}\n\nWhich detail best shows how Priya **changes**?`, right: '“Priya, to her own surprise, enjoyed the rain drumming on the roof.”', wrong: ['“Her list said *swim at ten, hike at two*, and she checked it twice.”', '“He spent the morning lying on the dock, watching dragonflies.”', '“At two o’clock the sky turned the colour of a bruise.”'], why: 'Enjoying an afternoon that broke her plan shows Priya loosening up; the other details show her or Leo as they were (RL.5.3).' },
  { prompt: `${LAKE}\n\nHow does the **setting** change in the story, and what effect does it have?`, right: 'A storm arrives, so the cousins cannot follow Priya’s plan', wrong: ['The lake dries up, so the cousins cannot go for a swim', 'Night falls early, so the cousins go to sleep at two', 'The dock breaks, so the cousins must leave the lake'], why: 'The darkening sky is a change in setting that drives the main event (RL.5.3).' },
  { prompt: `${LAKE}\n\nWhy does the writer put a careful planner and a relaxed boy side by side?`, right: 'The contrast makes each one clearer and sets up a lesson about plans', wrong: ['The writer wanted the story to have two narrators who take turns', 'The writer thought the story would be too short with one character', 'The writer wanted to show that planning is always a bad idea'], why: 'Contrasting characters highlight each other’s traits and help reveal the theme (RL.5.3).' },
];

const EVENTS: Q[] = [
  { prompt: 'In the first half of a story, a girl loses a race and sulks. In the second half, she loses again but cheers for the winner. What does comparing the two **events** show?', right: 'She has learned to be a good sport since the first race', wrong: ['She has become much faster since she lost the first race', 'She has stopped caring about running and wants to quit it', 'She has forgotten that she lost the first race at all'], why: 'When two similar events turn out differently, the difference shows how a character has changed (RL.5.3).' },
  { prompt: 'Story A is set in a crowded city; Story B is set on a quiet farm. Both are about a boy who feels lonely. What does comparing the **settings** show?', right: 'A person can feel lonely in a crowd as well as when alone', wrong: ['Cities are always better places to live than farms', 'The two stories must have been written by one author', 'Farms are lonely places, so no one should live there'], why: 'Comparing how stories treat a similar theme in different settings shows something about the theme itself (RL.5.9).' },
  { prompt: 'Which sentence **compares** two characters, rather than describing just one?', right: 'Both sisters want to win, but Ana works for it while Bea hopes for luck.', wrong: ['Ana works hard every evening, practising until it is too dark to see.', 'Bea is the younger sister, and she has a small grey cat called Moss.', 'The sisters live in a tall house at the end of a narrow street.'], why: 'A comparison names a likeness and a difference between the two (RL.5.3).' },
  { prompt: 'Two folk tales from different countries both tell of a clever small animal tricking a big one. What is the best **comparison** of the two?', right: 'They share a theme: wit can defeat strength', wrong: ['They prove that the two countries were once one', 'They are the same story, so one must be copied', 'They show that small animals are always kind'], why: 'Stories from different cultures often share themes and patterns of events (RL.5.9).' },
  { prompt: 'Which **signal words** help a writer show a contrast between two characters?', right: 'whereas, however, on the other hand', wrong: ['also, likewise, in the same way', 'first, next, at the end of it', 'because, so that, as a result'], why: '*Whereas*, *however* and *on the other hand* signal a difference; *also* and *likewise* signal a likeness.' },
];

const characters = (rng: Rng, d: Difficulty) =>
  by(d, [CHARACTERS.slice(0, 3), CHARACTERS, CHARACTERS.slice(2)], [
    ['Look at what each character does, says and thinks.', 'Find one way they are alike and one way they differ.'],
    ['Compare the start and the end: has a character changed?', 'A change in setting often causes a key event.'],
    ['Writers put contrasting characters together to make each clearer.', 'Quote the detail that best supports your comparison.'],
  ])(rng);

const events = (rng: Rng, d: Difficulty) =>
  by(d, [EVENTS.slice(0, 3), EVENTS, EVENTS.slice(1)], [
    ['When two events are alike but end differently, ask what has changed.', 'A comparison names both a likeness and a difference.'],
    ['Stories in different settings can share a theme.', 'Signal words such as whereas and however show a contrast.'],
    ['Compare how two stories treat a similar theme or topic.', 'Folk tales from different places often share patterns.'],
  ])(rng);

// ---------------------------------------------------------------------------------------------
// Lesson 14.2: Comparing accounts of the same event.
// ---------------------------------------------------------------------------------------------

/** Two accounts of one flood, written for the lesson. */
const FLOOD = `**Account A**, from the diary of Maria, aged twelve:

> The water came up the steps faster than I could believe. Dad carried Grandma, and I carried the cat, who scratched me the whole way to the hill. I could hear our neighbour shouting for her dog. I have never been so frightened.

**Account B**, from the town newspaper the next morning:

> The River Hale burst its banks at 4 a.m. yesterday after three days of heavy rain. Forty homes on Mill Street were flooded. No one was hurt. The council says the flood wall, built in 1950, was two feet too low.`;

const ACCOUNTS: Q[] = [
  { prompt: `${FLOOD}\n\nWhich account is a **firsthand** account?`, right: 'Account A, because Maria lived through the flood herself', wrong: ['Account B, because newspapers always report the exact truth', 'Account B, because it gives the time and the number of homes', 'Account A, because it was written the next morning in the paper'], why: 'A firsthand account is by someone who was there; a secondhand account reports what others saw (RI.5.6, RI.4.6).' },
  { prompt: `${FLOOD}\n\nWhat does Account A tell us that Account B does **not**?`, right: 'What it felt like to escape the rising water', wrong: ['How many homes on Mill Street were flooded', 'When the flood wall along the river was built', 'How many days of heavy rain came before the flood'], why: 'Maria’s diary gives feelings and personal detail; the newspaper gives facts and figures (RI.5.6).' },
  { prompt: `${FLOOD}\n\nWhat does Account B focus on that Account A does not?`, right: 'The cause of the flood and how widespread it was', wrong: ['The way the family’s cat behaved during the escape', 'How frightened one girl felt as the water rose', 'The neighbour who was shouting for her lost dog'], why: 'Different accounts have different purposes and points of view, so they emphasize different things (RI.5.6).' },
  { prompt: `${FLOOD}\n\nA student is writing a report on the flood. Why should they use **both** accounts?`, right: 'Together they give the facts and the human experience of the flood', wrong: ['Using two accounts makes the report twice as long as one would be', 'One account is false, so a reader must check which one to ignore', 'Teachers only give marks to reports that use two or more sources'], why: 'Integrating information from several texts gives a fuller picture of a topic (RI.5.9).' },
  { prompt: `${FLOOD}\n\nIn what way do the two accounts **agree**?`, right: 'Both say the water rose and people had to leave their homes', wrong: ['Both say that the flood wall was built too low in 1950', 'Both describe the cat that scratched Maria on the way', 'Both report that forty homes on Mill Street were flooded'], why: 'Comparing accounts means noting where they agree as well as where they differ.' },
];

const CONFLICT: Q[] = [
  { prompt: 'A memoir by a famous inventor says she built her first engine alone. A biography says her brother helped her. What should a careful reader do?', right: 'Note the disagreement and look for other evidence, such as letters', wrong: ['Believe the memoir, since people always remember their lives exactly', 'Believe the biography, since longer books are always more reliable', 'Ignore both books, since one of them must be completely untrue'], why: 'When a memoir and a biography differ, readers weigh the evidence each gives (RI.6.9).' },
  { prompt: 'Two articles on school uniforms quote the same survey. One stresses that 60% of parents like uniforms; the other stresses that 70% of students dislike them. What does this show?', right: 'The writers chose different evidence to stress, to suit their views', wrong: ['One of the two writers must have made up the survey results', 'The survey must be wrong, because the two sets of numbers differ', 'Both writers hold exactly the same view about school uniforms'], why: 'Authors writing on one topic can shape their presentations by emphasizing different evidence (RI.7.9).' },
  { prompt: 'One history book says a battle was won by better weapons; another says it was won by better leaders. Both cite the same facts. What is happening?', right: 'The authors interpret the same facts differently', wrong: ['One of the authors has copied the other’s book', 'The authors are describing two different battles', 'The authors agree completely about the battle'], why: 'Two authors can analyse the same facts and reach different interpretations (RI.7.9).' },
  { prompt: 'Website A says a new bridge will cost \\$2 million; Website B says \\$5 million. What is the best first step?', right: 'Check who wrote each one, when, and where their figure comes from', wrong: ['Take the average of the two figures and use that in your report', 'Use whichever figure appears on the more colourful website', 'Choose the figure that is closer to what you expected to find'], why: 'When texts give conflicting information, readers identify where they disagree and check the evidence and sources (RI.8.9).' },
  { prompt: 'Two articles disagree about whether a lake is polluted. Article A cites water tests from last month; Article B cites a resident’s opinion from ten years ago. Which is more convincing, and why?', right: 'Article A, because its evidence is recent and from tests', wrong: ['Article B, because a resident knows the lake best of all', 'Article B, because older information is always more reliable', 'Neither, because two articles can never both be judged'], why: 'Readers judge conflicting texts by the quality of their evidence, not just what they claim (RI.8.9).' },
  { prompt: 'Which pair of texts is most likely to give **different points of view** on one event?', right: 'A speech by the winning candidate and one by the loser', wrong: ['Two copies of the same newspaper report, side by side', 'A dictionary entry and a thesaurus entry on one word', 'Two printings of one textbook chapter about the event'], why: 'People with different roles in an event tell it from different points of view (RI.5.6).' },
];

const accounts = (rng: Rng, d: Difficulty) =>
  by(d, [ACCOUNTS.slice(0, 3), ACCOUNTS, ACCOUNTS.slice(2).concat(CONFLICT.slice(5))], [
    ['A firsthand account comes from someone who was there.', 'Ask what each account focuses on.'],
    ['Each writer’s purpose shapes what they include.', 'Note where the accounts agree and where they differ.'],
    ['Use several accounts together to get a fuller picture.', 'Think about each writer’s point of view.'],
  ])(rng);

const conflict = (rng: Rng, d: Difficulty) =>
  by(d, [CONFLICT.slice(0, 3), CONFLICT, CONFLICT.slice(1, 5)], [
    ['When texts disagree, look for more evidence.', 'Authors can stress different evidence to suit their views.'],
    ['Two authors can interpret the same facts differently.', 'Check who wrote each text and where its figures come from.'],
    ['Judge conflicting texts by the quality of their evidence.', 'Recent, tested evidence beats an old opinion.'],
  ])(rng);

// ---------------------------------------------------------------------------------------------
// Lesson 14.3: Stories in pictures, on stage and on screen.
// ---------------------------------------------------------------------------------------------

const PICTURES: Q[] = [
  { prompt: 'In a graphic novel, a character says “I’m fine,” but the picture shows her clenching her fists. What does the picture add?', right: 'It shows she is not really fine, which the words alone hide', wrong: ['It shows she is getting ready for a boxing match later', 'It adds nothing, because pictures only decorate the words', 'It shows that the artist made a mistake with the drawing'], why: 'Visual elements can add meaning or even contradict the words (RL.5.7).' },
  { prompt: 'A graphic novel shows a whole page with no words, only a tiny boat on a huge, dark sea. What effect does this have?', right: 'It makes the boat feel small and alone, building a sense of danger', wrong: ['It saves space, since the artist ran out of words for that page', 'It makes the story move faster, as the reader skips the page', 'It tells the reader that the story has come to its happy ending'], why: 'Size, space and colour in a picture create tone and mood (RL.5.7).' },
  { prompt: 'Why might an illustrator draw a scene from a very low angle, looking up at a giant?', right: 'To make the giant look huge and threatening to the reader', wrong: ['To fit more of the background into the small picture', 'To show that the giant is friendly and very gentle', 'To save the time it would take to draw the giant’s face'], why: 'The angle of a picture shapes how we feel about what it shows (RL.5.7).' },
  { prompt: 'In a comic, the panels get smaller and closer together during a chase. What does this do?', right: 'It speeds up the reading, so the chase feels fast and urgent', wrong: ['It slows down the reading, so the chase feels calm and quiet', 'It saves paper, so the comic can be printed more cheaply', 'It tells the reader that the chase scene is a dream'], why: 'The size and spacing of panels control the pace of a graphic story (RL.5.7).' },
];

const PERFORMANCE: Q[] = [
  { prompt: 'In the script of a play, a line reads: *“I suppose you’re right.”* In one performance, the actor says it with a sigh; in another, with a smile. What does this show?', right: 'An actor’s delivery can change what a line means', wrong: ['One of the actors forgot the words of the script', 'Only the first performance follows what is written', 'The writer of the play wrote two different lines'], why: 'Comparing a script with a performance shows how voice and gesture shape meaning (RL.6.7).' },
  { prompt: 'When you **read** a poem silently and then **hear** the poet read it aloud, what might you notice?', right: 'The rhythm, pauses and emphasis the poet gives the words', wrong: ['That the poem has more lines than it did on the page', 'That the poem’s meaning is now impossible to work out', 'Nothing, since reading and hearing are exactly alike'], why: 'Hearing a poem brings out sound and rhythm that silent reading may miss (RL.6.7).' },
  { prompt: 'A novel spends three pages on a girl’s thoughts as she waits for news. The film shows her staring out of a rainy window for ten seconds. What has the film done?', right: 'Used an image and its mood to stand for her thoughts', wrong: ['Left out the scene completely from the film', 'Added a new character who is not in the novel', 'Copied every word of the novel’s three pages'], why: 'Films use images, lighting and sound in place of a narrator’s words (RL.7.7).' },
  { prompt: 'A filmed version of a story cuts a minor character. Why might the director have made this choice?', right: 'To keep the film to a length an audience can watch in one sitting', wrong: ['Because the minor character was not written in the novel at all', 'Because films are never allowed to have more than four characters', 'Because the minor character was the most important one in it'], why: 'Directors adapt a text for a new medium, and often cut to fit the time (RL.7.7).' },
  { prompt: 'You read the text of a famous speech and then watch a video of it being given. What can the video show that the text cannot?', right: 'The speaker’s tone, pauses and gestures, and the crowd’s reaction', wrong: ['The exact words of the speech, which are missing from the text', 'The date and place where the speech was first written down', 'Nothing more, because a video only repeats the written words'], why: 'Comparing a speech’s text with its delivery shows how delivery affects the impact of the words (RI.7.7).' },
  { prompt: 'In the novel, a scene is told by the hero; in the film, the camera shows the villain’s face. What changes for the audience?', right: 'They see the villain’s side, which the hero’s narration hid', wrong: ['They no longer know which character is the villain', 'They hear the hero’s thoughts more clearly than before', 'Nothing changes, because the plot of the scene is the same'], why: 'Camera choices can change point of view, which changes how we judge characters (RL.7.7).' },
];

const pictures = (rng: Rng, d: Difficulty) =>
  by(d, [PICTURES.slice(0, 3), PICTURES, PICTURES.slice(1).concat(PERFORMANCE.slice(0, 1))], [
    ['Ask what the picture shows that the words do not.', 'Size, angle, colour and space create mood.'],
    ['Panel size and spacing control how fast we read.', 'Pictures can contradict words to show a hidden feeling.'],
    ['Visual elements add to the meaning, tone and pace of a story.', 'An actor’s delivery, like a picture, can change a line’s meaning.'],
  ])(rng);

const performance = (rng: Rng, d: Difficulty) =>
  by(d, [PERFORMANCE.slice(0, 3), PERFORMANCE, PERFORMANCE.slice(2)], [
    ['A performance adds voice, gesture, sound and image to the words.', 'Ask what you notice when you hear or watch it that you missed in reading.'],
    ['Films use images in place of a narrator’s words.', 'Directors cut and change a text to suit the new medium.'],
    ['Camera angle and focus can change the point of view.', 'A speech’s delivery affects the impact of its words.'],
  ])(rng);

// ---------------------------------------------------------------------------------------------
// Lesson 14.4: Historical fiction and history.
// ---------------------------------------------------------------------------------------------

/** A passage of historical fiction written for the lesson, and a factual account to set beside it. */
const GOLD = `**From a novel:**

> Tom’s fingers were raw from the icy river. He had sold his father’s watch to reach California, and every morning he swore that today his pan would shine. “Fortune favours the stubborn,” old Hal told him, and Tom believed it.

**From a history book:**

> Gold was found at Sutter’s Mill, California, in January 1848. By 1849 about 90,000 people had arrived to search for it. Most miners found little gold, and the merchants who sold them food and tools often grew richer than the miners did.`;

const HISTORICAL: Q[] = [
  { prompt: `${GOLD}\n\nWhich detail does the novel **share** with the history book?`, right: 'People came to California hoping to find gold', wrong: ['Old Hal told Tom that fortune favours the stubborn', 'Tom sold his father’s watch to pay for the journey', 'Merchants grew richer than most of the gold miners'], why: 'Historical fiction uses real events, here the Gold Rush, as its background (RL.7.9).' },
  { prompt: `${GOLD}\n\nWhich part of the novel is most likely **invented** by the writer?`, right: 'Tom and old Hal and what they say to each other', wrong: ['The fact that people searched for gold in California', 'The fact that miners panned for gold in rivers', 'The fact that the search for gold was in the 1840s'], why: 'Historical fiction adds invented characters and dialogue to a real time and place (RL.7.9).' },
  { prompt: `${GOLD}\n\nWhat does the history book tell us that **Tom does not know**?`, right: 'Most miners found little gold, so Tom’s hope may be in vain', wrong: ['The river in California is icy cold early in the morning', 'Tom has sold his father’s watch to pay for his journey', 'Old Hal believes that being stubborn brings a fortune'], why: 'Setting fiction beside history can create dramatic irony: we know what the character does not (RL.7.9).' },
  { prompt: `${GOLD}\n\nWhy might the novelist tell the Gold Rush through one young miner?`, right: 'So readers feel the hope and hardship of one person in that time', wrong: ['Because there were very few miners in California at that time', 'Because the facts of the Gold Rush are not known to historians', 'So readers learn the exact number of people who travelled west'], why: 'Fiction brings history to life through a character’s experience; the history book gives the wider facts (RL.7.9).' },
  { prompt: 'Why might an author of historical fiction **change** a real event, such as moving a battle by a year?', right: 'To make the story’s plot work, while keeping the spirit of the time', wrong: ['Because authors of fiction never know the real dates of events', 'To trick readers into learning the wrong dates on purpose', 'Because historians are always wrong about the dates of battles'], why: 'Authors use or alter history for the story’s sake, and many explain their changes in a note (RL.7.9).' },
  { prompt: 'Where might an author of historical fiction tell readers which parts are true?', right: 'In an author’s note at the end of the book', wrong: ['In the dialogue of the villain in chapter one', 'In the title of each of the book’s chapters', 'Nowhere, because fiction cannot include facts'], why: 'An author’s note often separates the history from the invention (RL.7.9).' },
];

const historical = (rng: Rng, d: Difficulty) =>
  by(d, [HISTORICAL.slice(0, 3), HISTORICAL.slice(0, 5), HISTORICAL.slice(2)], [
    ['Historical fiction sets invented characters in a real time and place.', 'Ask which details a history book would also include.'],
    ['Compare what the character knows with what history tells us.', 'Fiction shows one person’s experience; history gives the wider facts.'],
    ['Authors may alter history to make a story work.', 'An author’s note often says what is true and what is invented.'],
  ])(rng);

// ---------------------------------------------------------------------------------------------
// Lesson 14.5: Myths, allusions and modern stories.
// ---------------------------------------------------------------------------------------------

const ALLUSIONS: Q[] = [
  { prompt: 'A coach says: *“Our goalkeeper is brilliant, but his weak left side is his **Achilles’ heel**.”* What does the allusion mean?', right: 'A small weakness in someone who is otherwise strong', wrong: ['An injury to the foot that heals very slowly', 'A great strength that nobody else can match', 'A habit of running away when the game is hard'], why: 'In Greek myth, Achilles could be wounded only in his heel (L.7.5a).' },
  { prompt: 'A reporter writes: *“Opening the old files was like opening **Pandora’s box**.”* What does this suggest?', right: 'It let loose a whole series of unexpected troubles', wrong: ['It revealed a hidden treasure that made them rich', 'It was easy to do and took only a few short minutes', 'It was a gift that everyone had long been waiting for'], why: 'In Greek myth, Pandora opened a jar (later called a box) that released all the evils into the world (L.7.5a).' },
  { prompt: 'In a story, a small, unknown team beats the champions. The narrator calls it *“a **David and Goliath** match.”* Where does the allusion come from, and what does it mean?', right: 'From the Bible: a weak side beats a far stronger one', wrong: ['From a Greek myth: two equals fight to a long draw', 'From Shakespeare: a king is tricked by his own servant', 'From a fairy tale: a giant shares his gold with a boy'], why: 'In the Bible, the young David defeats the giant Goliath with a sling (L.7.5a).' },
  { prompt: 'A character who always wanders off on long adventures is described as being *“on another **odyssey**.”* What is the allusion?', right: 'Homer’s *Odyssey*, in which Odysseus takes ten years to travel home', wrong: ['A Bible story in which a man is swallowed by a great fish', 'A fairy tale in which a girl follows a trail of breadcrumbs', 'A legend in which a king pulls a sword out of a stone'], why: 'An *odyssey* is a long, eventful journey, after Homer’s epic (L.7.5a).' },
  { prompt: 'What is an **allusion**?', right: 'A brief reference to a well-known story, person or event', wrong: ['A long retelling of a famous myth, from start to finish', 'A comparison of two things that uses like or as', 'A word that sounds like the noise that it describes'], why: 'An allusion borrows meaning from a story the reader already knows (L.7.5a).' },
  { prompt: 'A writer says her hero has *“the **Midas touch**.”* What does she mean?', right: 'Everything he tries turns into a success', wrong: ['He breaks everything he puts his hands on', 'He is very gentle with people and animals', 'He cannot stop eating sweets and puddings'], why: 'In Greek myth, King Midas turned everything he touched into gold (L.7.5a).' },
];

const RETELLINGS: Q[] = [
  { prompt: 'A modern novel tells of a teenage inventor who builds wings, ignores warnings, flies too high over the city, and crashes. Which myth does it draw on?', right: 'Icarus, who flew too close to the sun on wings of wax', wrong: ['Hercules, who carried out twelve impossible labours', 'Persephone, who was taken to the underworld each year', 'Narcissus, who fell in love with his own reflection'], why: 'The pattern of wings, a warning ignored and a fall comes from the myth of Icarus (RL.8.9).' },
  { prompt: 'The modern Icarus story changes the ending: the inventor survives and learns from her fall. What does this change suggest about the new story’s message?', right: 'That failure can teach us, rather than only punish us', wrong: ['That flying is always wrong and must never be tried', 'That the writer did not know how the myth really ends', 'That the old myth has no meaning for readers today'], why: 'Writers make old stories new by changing details or endings, and the change often reveals the new theme (RL.8.9).' },
  { prompt: 'Many stories follow a hero who leaves home, faces trials with help from a wise guide, and returns changed. What is this pattern called?', right: 'The hero’s journey, an archetype found in myths worldwide', wrong: ['A flashback, a scene from the past that interrupts the plot', 'Dramatic irony, when the audience knows what a character does not', 'A cliffhanger, an ending that leaves the outcome unknown'], why: 'An archetype is a pattern of events or character type that recurs across myths and modern stories (RL.8.9).' },
  { prompt: 'A modern film about a selfish boss who learns kindness from three ghostly visits on Christmas Eve draws on which earlier work?', right: 'A Christmas Carol, by Charles Dickens', wrong: ['The Odyssey, by the Greek poet Homer', 'Romeo and Juliet, by William Shakespeare', 'The story of Noah’s ark, from the Bible'], why: 'Retellings of older works keep their pattern of events and change the setting and characters (RL.8.9).' },
  { prompt: 'Why do modern writers so often draw on myths and traditional stories?', right: 'Their patterns and themes are familiar, so they carry meaning at once', wrong: ['Because myths are short, so they fill up only a few pages in all', 'Because writers are not allowed to invent stories of their own', 'Because readers today have never heard of any of the old myths'], why: 'Familiar patterns let a writer echo an old story’s meaning while saying something new (RL.8.9).' },
  { prompt: 'A novel set in a modern school has a character named Cassandra who warns of a disaster that nobody believes. What does the name add?', right: 'It alludes to the Greek prophet whose true warnings were ignored', wrong: ['It shows that the character is the hero of the whole story', 'It tells the reader that the story is set in ancient Greece', 'It adds nothing, since names in novels are chosen at random'], why: 'Names can be allusions; in Greek myth Cassandra foresaw the truth but was never believed (L.7.5a, RL.8.9).' },
];

const allusions = (rng: Rng, d: Difficulty) =>
  by(d, [ALLUSIONS.slice(0, 3), ALLUSIONS, ALLUSIONS.slice(2)], [
    ['An allusion borrows meaning from a story the reader knows.', 'Recall the myth or Bible story and what happened in it.'],
    ['Ask what quality the original story is famous for.', 'Then apply that quality to the person or thing described.'],
    ['Allusions come from myths, the Bible, history and literature.', 'Recall the story, then explain the meaning it lends.'],
  ])(rng);

const retellings = (rng: Rng, d: Difficulty) =>
  by(d, [RETELLINGS.slice(0, 3), RETELLINGS, RETELLINGS.slice(1)], [
    ['Look for the pattern of events that the old story and the new one share.', 'Then ask what the new story changes.'],
    ['A changed ending often reveals a new theme.', 'Archetypes such as the hero’s journey recur across stories.'],
    ['Writers draw on myths because their patterns carry meaning.', 'Names and details can allude to an older story.'],
  ])(rng);

// ---------------------------------------------------------------------------------------------

/** Lesson 14.4’s second skill: why authors alter history, and how to read the two side by side. */
const SIDE: Q[] = [
  { prompt: 'A novel about the sinking of a great ship shows the captain weeping on the bridge. Historians have no record of how he behaved. What is the novelist doing?', right: 'Imagining what history does not record, to bring the scene to life', wrong: ['Reporting a proven fact that every historian has somehow missed', 'Making an error that the publisher should have found and corrected', 'Copying a scene word for word from a history textbook about it'], why: 'Historical fiction fills the gaps in the record with imagined detail (RL.7.9).' },
  { prompt: 'A history book and a novel both describe a famous march for the right to vote. The history book gives dates and numbers; the novel gives one marcher’s fear and pride. How do the two **work together**?', right: 'The history gives the facts, and the novel shows how it felt', wrong: ['They do not work together, since one of them must be wrong', 'The novel replaces the need to read any history about it', 'The history book proves that the novel’s marcher was real'], why: 'Comparing fiction with history shows how a writer uses facts to make an experience vivid (RL.7.9).' },
  { prompt: 'A novel set in the 1800s shows a character using a word that was first recorded in the 1960s. Why might a careful reader notice this?', right: 'It is an anachronism: something that does not belong to the period', wrong: ['It is an allusion: a reference to a well-known story or event', 'It is a flashback: a scene that takes place earlier in time', 'It is foreshadowing: a hint about what will happen later on'], why: 'Comparing fiction with history helps readers spot details that do not fit the time.' },
  { prompt: 'Which question best helps you compare a historical novel with a factual account of the same time?', right: 'Which details are the same, which are invented, and why?', wrong: ['Which of the two has the more exciting front cover?', 'Which of the two has more pages and more chapters?', 'Which of the two was written by the more famous author?'], why: 'Comparing the two means sorting fact from invention and asking why the author chose as they did (RL.7.9).' },
  { prompt: 'In a novel, a real president appears and says a line he never said. Is this acceptable in historical fiction?', right: 'Usually yes, if it fits what is known of him and is clearly fiction', wrong: ['Never, because fiction must only use the real words of real people', 'Always, even if it makes him say the opposite of his known views', 'Only if the president himself gave the novelist written permission'], why: 'Historical novelists invent dialogue for real people, ideally in keeping with the record (RL.7.9).' },
];

const sideBySide = (rng: Rng, d: Difficulty) =>
  by(d, [SIDE.slice(0, 3), SIDE, SIDE.slice(1).concat(HISTORICAL.slice(4, 5))], [
    ['Fiction imagines what the historical record leaves out.', 'History gives facts; fiction shows how it felt.'],
    ['Sort the details into facts and inventions.', 'Ask why the author made each choice.'],
    ['Watch for details that do not fit the period.', 'Invented dialogue should fit what is known of a real person.'],
  ])(rng);

export const UNIT14_SKILLS: SkillDef[] = [
  skill({ id: 'ex-compare-characters', name: 'Comparing characters', description: 'Compare two characters in a story, quote the details that show how they differ, and explain how one changes.', outcomes: ['US13'], lessonId: 'ex-14-1', gen: characters }),
  skill({ id: 'ex-compare-events', name: 'Comparing settings, events and stories', description: 'Compare two settings or events, and how stories in different settings treat a similar theme.', outcomes: ['US13'], lessonId: 'ex-14-1', gen: events }),
  skill({ id: 'ex-accounts', name: 'Several accounts of one event', description: 'Tell firsthand from secondhand accounts, compare what each focuses on, and combine them.', outcomes: ['US14'], lessonId: 'ex-14-2', gen: accounts }),
  skill({ id: 'ex-conflicting-texts', name: 'Texts that disagree', description: 'Explain how authors stress different evidence or interpret facts differently, and weigh texts that conflict.', outcomes: ['US14'], lessonId: 'ex-14-2', gen: conflict }),
  skill({ id: 'ex-pictures-and-words', name: 'Stories in pictures', description: 'Explain how pictures, panels and angles add to the meaning, tone and pace of a story.', outcomes: ['US15'], lessonId: 'ex-14-3', gen: pictures }),
  skill({ id: 'ex-text-and-performance', name: 'Text, performance and film', description: 'Compare reading a text with hearing or watching it performed, filmed or delivered.', outcomes: ['US15'], lessonId: 'ex-14-3', gen: performance }),
  skill({ id: 'ex-historical-fiction', name: 'Historical fiction', description: 'Tell the history in a historical novel from what the author invented, and explain why.', outcomes: ['US16'], lessonId: 'ex-14-4', gen: historical }),
  skill({ id: 'ex-fiction-and-history', name: 'Fiction and history side by side', description: 'Compare a fictional portrayal with a historical account, and judge how an author uses or alters history.', outcomes: ['US16'], lessonId: 'ex-14-4', gen: sideBySide }),
  skill({ id: 'ex-allusions', name: 'Allusions', description: 'Explain literary, biblical and mythological allusions and the meaning they lend.', outcomes: ['US17'], lessonId: 'ex-14-5', gen: allusions }),
  skill({ id: 'ex-myth-retellings', name: 'Myths in modern stories', description: 'Find the myth or older story a modern work draws on, and explain how it makes it new.', outcomes: ['US17'], lessonId: 'ex-14-5', gen: retellings }),
];
