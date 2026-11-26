/**
 * More English Topics, Unit 11: grammar, punctuation and usage that the US Common Core asks for and
 * Gradileo's grade courses do not teach: conjunctions, prepositions and interjections (L.5.1a, e),
 * commas with yes and no, tag questions, direct address and coordinate adjectives, and the titles
 * of works (L.5.2c–d, L.7.2a), intensive pronouns, pronoun shifts and vague pronouns (L.6.1b–d),
 * verb moods and shifts in voice and mood (L.8.1c–d, L.8.3a), and contested usage and hyphens
 * (L.11-12.1a–b, L.11-12.2a). Every sentence was written for these lessons.
 */
import { skill, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { ask, type Q } from './bank.ts';

const by = (d: Difficulty, banks: [Q[], Q[], Q[]], hints: [string[], string[], string[]]) => (rng: Rng): GenOutput => ask(rng, banks[d - 1], hints[d - 1]);

// ---------------------------------------------------------------------------------------------
// Lesson 11.1: Conjunctions, prepositions and interjections.
// ---------------------------------------------------------------------------------------------

const CONJ_1: Q[] = [
  { prompt: 'Which word is a **conjunction** in this sentence?\n\n> Leila wanted to swim, but the pool was closed.', right: 'but', wrong: ['wanted', 'pool', 'closed'], why: '*But* joins the two halves of the sentence and shows a contrast, so it is a conjunction.' },
  { prompt: 'Which word is a **conjunction** in this sentence?\n\n> We stayed inside because the storm was getting worse.', right: 'because', wrong: ['inside', 'storm', 'worse'], why: '*Because* joins the reason to the main idea, so it is a conjunction.' },
  { prompt: 'Which word is a **conjunction** in this sentence?\n\n> Kwame can borrow my bike or walk to the shop.', right: 'or', wrong: ['borrow', 'bike', 'shop'], why: '*Or* joins two choices, so it is a conjunction.' },
  { prompt: 'Which word is a **conjunction** in this sentence?\n\n> The bread was warm, so we ate it straight away.', right: 'so', wrong: ['bread', 'warm', 'straight'], why: '*So* joins a cause to its result, so it is a conjunction.' },
  { prompt: 'Which word is a **conjunction** in this sentence?\n\n> Although it was late, Mei finished her drawing.', right: 'Although', wrong: ['late', 'finished', 'drawing'], why: '*Although* joins the two ideas and shows a contrast, so it is a conjunction.' },
];

const CONJ_2: Q[] = [
  { prompt: 'Which conjunction best completes the sentence?\n\n> The library was quiet, ___ Omar could not concentrate.', right: 'yet', wrong: ['so', 'because', 'and'], why: 'A quiet library should help, so the result is surprising: *yet* shows that contrast.' },
  { prompt: 'Which conjunction best completes the sentence?\n\n> You will need a coat ___ you go out tonight.', right: 'if', wrong: ['but', 'or', 'so'], why: '*If* introduces a condition: the coat is needed only on that condition.' },
  { prompt: 'Which conjunction best completes the sentence?\n\n> The puppy was tired, ___ it fell asleep on the rug.', right: 'so', wrong: ['but', 'or', 'unless'], why: 'Falling asleep is the result of being tired, and *so* shows a result.' },
  { prompt: 'Which conjunction best completes the sentence?\n\n> We cannot start the game ___ everyone has arrived.', right: 'until', wrong: ['because', 'and', 'or'], why: '*Until* shows time: the game waits for that moment.' },
  { prompt: 'Which conjunction best completes the sentence?\n\n> Sofia practised every day, ___ she still felt nervous.', right: 'but', wrong: ['so', 'because', 'or'], why: 'Feeling nervous after practising is a contrast, and *but* shows a contrast.' },
];

const CORRELATIVE: Q[] = [
  { prompt: 'Which pair of **correlative conjunctions** completes the sentence?\n\n> ___ the bus ___ the train goes to the beach, so we will cycle.', right: 'Neither … nor', wrong: ['Either … nor', 'Both … or', 'Neither … or'], why: 'Correlative conjunctions come in fixed pairs. *Neither* goes with *nor*: no way there exists, so they cycle.' },
  { prompt: 'Which pair of **correlative conjunctions** completes the sentence?\n\n> You can have ___ soup ___ salad with your sandwich.', right: 'either … or', wrong: ['neither … or', 'both … or', 'either … nor'], why: '*Either* goes with *or* to offer a choice of two.' },
  { prompt: 'Which pair of **correlative conjunctions** completes the sentence?\n\n> The film was ___ funny ___ moving.', right: 'both … and', wrong: ['both … or', 'either … and', 'neither … and'], why: '*Both* goes with *and* to say that two things are true.' },
  { prompt: 'Which pair of **correlative conjunctions** completes the sentence?\n\n> Ravi ___ won the race ___ broke the school record.', right: 'not only … but also', wrong: ['not only … and also', 'either … but also', 'both … but also'], why: '*Not only* goes with *but also*, adding a second, bigger achievement.' },
  { prompt: 'Which pair of **correlative conjunctions** completes the sentence?\n\n> We will play outside ___ it is sunny ___ cloudy.', right: 'whether … or', wrong: ['whether … nor', 'neither … or', 'both … or'], why: '*Whether* goes with *or*: the plan holds in either case.' },
];

const PREP_1: Q[] = [
  { prompt: 'Which word is a **preposition** in this sentence?\n\n> The cat hid under the bed.', right: 'under', wrong: ['cat', 'hid', 'bed'], why: '*Under* shows where the cat is in relation to the bed, so it is a preposition.' },
  { prompt: 'Which word is a **preposition** in this sentence?\n\n> We walked home after the concert.', right: 'after', wrong: ['walked', 'home', 'concert'], why: '*After* shows when, linking the walk to the concert, so it is a preposition.' },
  { prompt: 'Which word is a **preposition** in this sentence?\n\n> Nia sat between her two cousins.', right: 'between', wrong: ['sat', 'her', 'cousins'], why: '*Between* shows where Nia sat in relation to her cousins.' },
  { prompt: 'Which word is an **interjection** in this sentence?\n\n> Wow, that is the biggest pumpkin I have ever seen!', right: 'Wow', wrong: ['biggest', 'pumpkin', 'seen'], why: 'An interjection shows a sudden feeling and stands apart from the rest of the sentence: *Wow*.' },
  { prompt: 'Which word is an **interjection** in this sentence?\n\n> Ouch! I stepped on a pin.', right: 'Ouch', wrong: ['stepped', 'on', 'pin'], why: '*Ouch* shows a sudden feeling of pain, so it is an interjection.' },
];

const PREP_2: Q[] = [
  { prompt: 'What part of speech is the word in bold?\n\n> The kite flew **over** the trees.', right: 'Preposition: it shows where the kite flew', wrong: ['Conjunction: it joins two separate clauses', 'Interjection: it shows a sudden strong feeling', 'Adjective: it describes the trees in the park'], why: '*Over the trees* is a prepositional phrase telling where.' },
  { prompt: 'What part of speech is the word in bold?\n\n> **Hey**, wait for me!', right: 'Interjection: it shows a sudden feeling', wrong: ['Preposition: it shows where someone is', 'Conjunction: it joins two words together', 'Noun: it names a person, place or thing'], why: '*Hey* calls out with feeling and is set off by a comma, so it is an interjection.' },
  { prompt: 'What part of speech is the word in bold?\n\n> I was tired, **so** I went to bed early.', right: 'Conjunction: it joins a cause to a result', wrong: ['Preposition: it shows where something is', 'Interjection: it shows a sudden feeling', 'Adverb: it tells how the action was done'], why: '*So* joins two clauses and shows that the second follows from the first.' },
  { prompt: 'What part of speech is the word in bold?\n\n> The shop is closed **during** the holiday.', right: 'Preposition: it shows when the shop is closed', wrong: ['Conjunction: it joins two separate clauses', 'Interjection: it shows a sudden feeling', 'Verb: it shows an action that happens'], why: '*During the holiday* is a prepositional phrase telling when.' },
];

const PREP_3: Q[] = [
  { prompt: 'Which sentence uses an **interjection** correctly punctuated?', right: 'Oh no, I left my lunch on the bus!', wrong: ['Oh no I left, my lunch on the bus!', 'Oh, no I left my lunch, on the bus.', 'Oh no I left my lunch on, the bus!'], why: 'A mild interjection is followed by a comma; the rest of the sentence follows as usual.' },
  { prompt: 'Which word in this sentence is used as a **preposition**?\n\n> Before the match, the players stretched and jogged around the field.', right: 'around', wrong: ['players', 'stretched', 'jogged'], why: '*Around the field* shows where; *before* is a preposition too, but it is not offered here.' },
  { prompt: 'In which sentence is **since** a conjunction rather than a preposition?', right: 'Since it was raining, we took the bus to school.', wrong: ['We have lived here since last spring with our aunt.', 'Nobody has seen him since the end of the summer.', 'The shop has been open since nine in the morning.'], why: 'As a conjunction, *since* is followed by a clause with its own verb: *it was raining*. As a preposition it is followed only by a noun phrase.' },
  { prompt: 'In which sentence is **after** a preposition rather than a conjunction?', right: 'We went for a walk after lunch with our neighbours.', wrong: ['After we finished lunch, we went for a long walk.', 'We went for a walk after the rain had finally stopped.', 'After the guests left, we tidied the whole kitchen.'], why: 'A preposition is followed by a noun phrase (*lunch*); a conjunction is followed by a clause with a verb.' },
];

const conjunctions = (rng: Rng, d: Difficulty) =>
  by(d, [CONJ_1, CONJ_2, CORRELATIVE], [
    ['A conjunction joins words, phrases or clauses.', 'Look for the word that links two ideas.'],
    ['Decide how the two ideas relate: contrast, result, condition or time.', 'Contrast: but, yet. Result: so. Condition: if, unless. Time: when, until.'],
    ['Correlative conjunctions always come in the same pairs.', 'Either goes with or, neither with nor, both with and, not only with but also.'],
  ])(rng);

const prepositions = (rng: Rng, d: Difficulty) =>
  by(d, [PREP_1, PREP_2, PREP_3], [
    ['A preposition shows where or when, linking a noun to the rest of the sentence.', 'An interjection shows a sudden feeling: wow, oh, ouch, hey.'],
    ['Ask what job the word does in the sentence.', 'Prepositions begin phrases such as under the bed or during the game.'],
    ['Some words can be prepositions or conjunctions.', 'A conjunction is followed by a clause with its own verb; a preposition is followed by a noun phrase.'],
  ])(rng);

// ---------------------------------------------------------------------------------------------
// Lesson 11.2: More commas, and the titles of works.
// ---------------------------------------------------------------------------------------------

const COMMA_1: Q[] = [
  { prompt: 'Which sentence uses the comma correctly?', right: 'Yes, you can borrow my pencil.', wrong: ['Yes you, can borrow my pencil.', 'Yes you can, borrow my pencil.', 'Yes you can borrow, my pencil.'], why: 'A comma sets off *yes* or *no* at the start of a reply.' },
  { prompt: 'Which sentence uses the comma correctly?', right: 'No, thank you, I am not hungry.', wrong: ['No thank, you I am not hungry.', 'No thank you I, am not hungry.', 'No thank you I am, not hungry.'], why: 'Commas set off *no* and the polite *thank you* from the rest of the reply.' },
  { prompt: 'Which sentence uses the comma correctly?', right: 'Is that your coat, Daniel?', wrong: ['Is that, your coat Daniel?', 'Is, that your coat Daniel?', 'Is that your, coat Daniel?'], why: 'A comma sets off the name of the person spoken to (direct address).' },
  { prompt: 'Which sentence uses the comma correctly?', right: 'Grace, please close the door.', wrong: ['Grace please, close the door.', 'Grace please close, the door.', 'Grace please close the, door.'], why: 'The person spoken to is set off by a comma, wherever the name comes.' },
];

const COMMA_2: Q[] = [
  { prompt: 'Which sentence uses commas correctly?', right: 'It’s a lovely day, isn’t it?', wrong: ['It’s a lovely, day isn’t it?', 'It’s, a lovely day isn’t it?', 'It’s a lovely day isn’t, it?'], why: 'A comma comes before a tag question such as *isn’t it?* that turns a statement into a question.' },
  { prompt: 'Which sentence uses commas correctly?', right: 'You finished your homework, didn’t you?', wrong: ['You finished, your homework didn’t you?', 'You, finished your homework didn’t you?', 'You finished your homework didn’t, you?'], why: 'The tag question *didn’t you?* is set off by a comma.' },
  { prompt: 'Which sentence uses commas correctly?', right: 'I think, Amara, that you should go first.', wrong: ['I think Amara that, you should go first.', 'I think Amara, that you should go first.', 'I, think Amara that you should go first.'], why: 'A name in the middle of a sentence is set off by a comma on each side.' },
  { prompt: 'Which sentence needs a comma that it is missing?', right: 'Come and see this Noah.', wrong: ['Noah came to see this film.', 'This is the film Noah saw.', 'Noah and I saw this film.'], why: 'Noah is being spoken to, so it should be *Come and see this, Noah.* In the other sentences Noah is talked about, not to.' },
];

const COMMA_3: Q[] = [
  { prompt: 'Which sentence is punctuated correctly?', right: 'It was a long, exhausting journey.', wrong: ['It was a long exhausting, journey.', 'It was a, long exhausting journey.', 'It was, a long exhausting journey.'], why: '*Long* and *exhausting* are coordinate adjectives: you could write *long and exhausting*, so they take a comma.' },
  { prompt: 'Which sentence is punctuated correctly?', right: 'He wore an old green jacket.', wrong: ['He wore an old, green jacket.', 'He wore an, old green jacket.', 'He wore, an old green jacket.'], why: '*An old and green jacket* sounds wrong, so the adjectives are not coordinate and take no comma.' },
  { prompt: 'Which sentence is punctuated correctly?', right: 'We swam in the cold, clear water.', wrong: ['We swam in the cold clear, water.', 'We swam in the, cold clear water.', 'We swam, in the cold clear water.'], why: '*Cold and clear* works, and so does *clear, cold*, so the adjectives are coordinate and take a comma.' },
  { prompt: 'Which sentence is punctuated correctly?', right: 'She bought three small glass jars.', wrong: ['She bought three, small glass jars.', 'She bought three small, glass jars.', 'She bought three, small, glass jars.'], why: 'These adjectives build on each other in a fixed order (number, size, material), so they take no commas.' },
  { prompt: 'Which test tells you that two adjectives need a comma between them?', right: 'You can put “and” between them, or swap their order', wrong: ['They both end in “-y” or “-ful” and describe a noun', 'They are both longer than five letters each in total', 'They come straight after the verb in the sentence'], why: 'Coordinate adjectives each describe the noun equally, so *and* fits between them and their order can change.' },
];

const TITLES_1: Q[] = [
  { prompt: 'How should the title of a **book** be shown in typed writing?', right: 'In italics, like *Treasure Island*', wrong: ['In quotation marks, like “Treasure Island”', 'In capital letters, like TREASURE ISLAND', 'In bold type, like **Treasure Island**'], why: 'Titles of long works, such as books, are in italics when typed (underlined when handwritten).' },
  { prompt: 'How should the title of a **poem** be shown?', right: 'In quotation marks, like “The Raven”', wrong: ['In italics, like *The Raven* in print', 'In capital letters, like THE RAVEN', 'In bold type, like **The Raven** in print'], why: 'Titles of short works, such as poems, go in quotation marks.' },
  { prompt: 'How should the title of a **short story** be shown?', right: 'In quotation marks, like “The Gift of the Magi”', wrong: ['In italics, like *The Gift of the Magi* in print', 'Underlined, like a book title in handwriting', 'In capital letters, like THE GIFT OF THE MAGI'], why: 'A short story is a short work, so its title goes in quotation marks.' },
  { prompt: 'How should the title of a **film** be shown in typed writing?', right: 'In italics, like *The Lost Valley*', wrong: ['In quotation marks, like “The Lost Valley”', 'In capital letters, like THE LOST VALLEY', 'In brackets, like (The Lost Valley)'], why: 'Films are long works, so their titles go in italics.' },
];

const TITLES_2: Q[] = [
  { prompt: 'Which title is shown correctly?', right: 'We sang “Home on the Range” in music class.', wrong: ['We sang *Home on the Range* in music class.', 'We sang HOME ON THE RANGE in music class.', 'We sang (Home on the Range) in music class.'], why: 'A song is a short work, so its title goes in quotation marks.' },
  { prompt: 'Which title is shown correctly?', right: 'I read *Little Women* over the summer holidays.', wrong: ['I read “Little Women” over the summer holidays.', 'I read LITTLE WOMEN over the summer holidays.', 'I read Little-Women over the summer holidays.'], why: '*Little Women* is a novel, a long work, so it goes in italics.' },
  { prompt: 'Which title is shown correctly?', right: 'The article “Our Library Reopens” was in the *Daily Star*.', wrong: ['The article *Our Library Reopens* was in the “Daily Star”.', 'The article “Our Library Reopens” was in the “Daily Star”.', 'The article *Our Library Reopens* was in the *Daily Star*.'], why: 'An article is a short work (quotation marks); a newspaper is a long work (italics).' },
  { prompt: 'Which title is shown correctly?', right: 'My favourite chapter is “The Secret Door” in *The Hidden Garden*.', wrong: ['My favourite chapter is *The Secret Door* in “The Hidden Garden”.', 'My favourite chapter is “The Secret Door” in “The Hidden Garden”.', 'My favourite chapter is *The Secret Door* in *The Hidden Garden*.'], why: 'A chapter is part of a book, so it goes in quotation marks; the whole book is in italics.' },
];

const commasSpeech = (rng: Rng, d: Difficulty) =>
  by(d, [COMMA_1, COMMA_2, COMMA_3], [
    ['A comma sets off yes, no and the name of the person spoken to.', 'Read the sentence aloud: the comma marks the small pause.'],
    ['A tag question such as isn’t it? or didn’t you? follows a comma.', 'A name in the middle of a sentence needs a comma on each side.'],
    ['Try putting “and” between the adjectives, or swapping them.', 'If both work, use a comma; if not, leave it out.'],
  ])(rng);

const titles = (rng: Rng, d: Difficulty) =>
  by(d, [TITLES_1, TITLES_2, TITLES_2], [
    ['Long works (books, films, newspapers) go in italics, or are underlined by hand.', 'Short works (poems, stories, songs, articles) go in quotation marks.'],
    ['Ask whether the work is complete on its own and long, or short or part of a bigger work.', 'Chapters, articles and episodes are parts, so they take quotation marks.'],
    ['Check each title in the sentence separately.', 'The part goes in quotation marks; the whole work goes in italics.'],
  ])(rng);

// ---------------------------------------------------------------------------------------------
// Lesson 11.3: Pronouns: intensive, consistent and clear.
// ---------------------------------------------------------------------------------------------

const INTENSIVE_1: Q[] = [
  { prompt: 'Which sentence uses an **intensive pronoun**?', right: 'The head teacher herself handed out the prizes.', wrong: ['The head teacher handed the prizes to herself.', 'The head teacher handed out the prizes to us all.', 'The head teacher handed out her prizes to them.'], why: '*Herself* adds emphasis and could be removed without changing the meaning, so it is intensive.' },
  { prompt: 'Which sentence uses an **intensive pronoun**?', right: 'I painted the whole fence myself.', wrong: ['I painted a big picture of myself.', 'I painted the fence with my uncle.', 'I painted the whole fence for him.'], why: '*Myself* emphasizes who did it; *I painted the whole fence* still makes sense without it.' },
  { prompt: 'Which sentence uses an **intensive pronoun**?', right: 'We ourselves were surprised by the score.', wrong: ['We gave ourselves a break after the score.', 'We were all surprised by the final score.', 'We asked them to tell us the final score.'], why: '*Ourselves* only adds emphasis here; in *gave ourselves a break* it is reflexive and needed.' },
  { prompt: 'Which pronoun completes the sentence correctly?\n\n> The twins built the tree house ___.', right: 'themselves', wrong: ['theirselves', 'themself', 'theirself'], why: '*Themselves* is the standard form; *theirselves* and *theirself* are not standard.' },
  { prompt: 'Which pronoun completes the sentence correctly?\n\n> Kenji fixed the puncture ___.', right: 'himself', wrong: ['hisself', 'hisown', 'himselves'], why: '*Himself* is the standard form; *hisself* is not standard.' },
];

const INTENSIVE_2: Q[] = [
  { prompt: 'Is the pronoun in bold **intensive** or **reflexive**?\n\n> Hana taught **herself** to knit.', right: 'Reflexive: the sentence needs it to make sense', wrong: ['Intensive: it can be removed without loss', 'Intensive: it adds emphasis to the subject', 'Neither: it is used here as an object pronoun'], why: 'Without *herself*, *Hana taught to knit* makes no sense, so the pronoun is reflexive.' },
  { prompt: 'Is the pronoun in bold **intensive** or **reflexive**?\n\n> The mayor **himself** opened the new park.', right: 'Intensive: it adds emphasis and can be removed', wrong: ['Reflexive: the sentence needs it to make sense', 'Reflexive: the mayor does the action to himself', 'Neither: it is the subject of the whole sentence'], why: '*The mayor opened the new park* still makes sense, so *himself* only adds emphasis.' },
  { prompt: 'Which sentence uses a pronoun ending in -self **incorrectly**?', right: 'Please send the photos to Esi and myself.', wrong: ['I made the birthday card myself.', 'Esi told herself not to panic.', 'We enjoyed ourselves at the fair.'], why: 'A -self pronoun needs a subject to point back to; here it should be *Esi and me*.' },
  { prompt: 'Which sentence uses a pronoun ending in -self **incorrectly**?', right: 'Myself and Omar will bring the drinks.', wrong: ['Omar and I will bring the drinks ourselves.', 'I reminded myself to bring the drinks.', 'Omar himself offered to bring the drinks.'], why: 'A -self pronoun cannot be the subject; it should be *Omar and I*.' },
];

const SHIFT_1: Q[] = [
  { prompt: 'Which sentence has an inappropriate **shift in pronoun person**?', right: 'When we reached the top, you could see the whole town.', wrong: ['When we reached the top, we could see the whole town.', 'When I reached the top, I could see the whole town.', 'When they reached the top, they could see the town.'], why: 'The sentence starts with *we* and shifts to *you*; it should stay with *we*.' },
  { prompt: 'Which sentence has an inappropriate **shift in pronoun number**?', right: 'Tomatoes grow best in sun, so plant it in a bright spot.', wrong: ['Tomatoes grow best in sun, so plant them in a bright spot.', 'A tomato grows best in sun, so plant it in a bright spot.', 'Tomato plants grow best in sun, so plant them in sunlight.'], why: '*Tomatoes* is plural, so the pronoun should be *them*, not *it*.' },
  { prompt: 'Which sentence has an inappropriate **shift in pronoun person**?', right: 'If students study hard, you will do well in the test.', wrong: ['If students study hard, they will do well in the test.', 'If you study hard, you will do well in the test.', 'If we study hard, we will do well in the test.'], why: 'The sentence talks about *students* and shifts to *you*; it should be *they*.' },
  { prompt: 'Which sentence has an inappropriate **shift in pronoun number**?', right: 'The cookies were burnt, so we threw it away.', wrong: ['The cookies were burnt, so we threw them away.', 'The cake was burnt, so we threw it away.', 'The bread was burnt, so we threw it away too.'], why: '*Cookies* is plural, so the pronoun should be *them*.' },
];

const VAGUE: Q[] = [
  { prompt: 'Why is the pronoun in bold **vague**?\n\n> Priya told Ines that **she** had won the prize.', right: 'It could mean Priya or Ines, so we cannot tell who won', wrong: ['It is in the wrong case and should be the word “her”', 'It is plural, but Priya and Ines are each one person', 'It is too far from the start of the whole sentence'], why: 'Both Priya and Ines could be *she*; rewrite it, for example: *Priya told Ines, “You have won the prize.”*' },
  { prompt: 'Why is the pronoun in bold **vague**?\n\n> I put the vase on the shelf, and then **it** broke.', right: 'It could mean the vase or the shelf that broke', wrong: ['It should be “they”, because there are two things', 'It should be “itself”, to add emphasis to the vase', 'It is in the wrong tense and should be in the past'], why: 'The reader cannot tell what broke; name it: *and then the shelf broke.*' },
  { prompt: 'Which sentence fixes the vague pronoun?\n\n> When Arjun met his brother at the station, he was tired.', right: 'Arjun was tired when he met his brother at the station.', wrong: ['When Arjun met his brother at the station, they were tired.', 'When Arjun met his brother at the station, himself was tired.', 'When Arjun met him at the station, he was tired.'], why: 'Putting *Arjun* in the main clause makes it clear who was tired.' },
  { prompt: 'Which sentence has a **vague pronoun**?', right: 'They say that the river will flood this spring.', wrong: ['The council says the river will flood this spring.', 'Forecasters say that the river will flood this spring.', 'The river, experts say, will flood this spring.'], why: '*They* refers to nobody in particular; name who says it.' },
];

const intensive = (rng: Rng, d: Difficulty) =>
  by(d, [INTENSIVE_1, INTENSIVE_2, INTENSIVE_2], [
    ['An intensive pronoun (myself, herself, ourselves) adds emphasis.', 'Take it out: if the sentence still makes sense, it was intensive.'],
    ['A reflexive pronoun is needed for the sentence to make sense; an intensive one is not.', 'A -self pronoun never replaces I or me.'],
    ['Check that the -self pronoun points back to someone named in the sentence.', 'Say the sentence with I or me instead to test it.'],
  ])(rng);

const shiftsVague = (rng: Rng, d: Difficulty) =>
  by(d, [SHIFT_1, VAGUE, VAGUE], [
    ['Keep pronouns in the same person (I, you, we, they) through a sentence.', 'Make a pronoun agree in number with the noun it stands for.'],
    ['A vague pronoun could point to more than one noun, or to none.', 'Replace the pronoun with a noun to make the meaning clear.'],
    ['Ask: who or what exactly does the pronoun mean?', 'If the answer could be two things, rewrite the sentence.'],
  ])(rng);

// ---------------------------------------------------------------------------------------------
// Lesson 11.4: Verb moods, and shifts in voice and mood.
// ---------------------------------------------------------------------------------------------

const MOOD_1: Q[] = [
  { prompt: 'What is the **mood** of this sentence?\n\n> Close the window before you leave.', right: 'Imperative: it gives a command', wrong: ['Indicative: it states a fact', 'Interrogative: it asks a question', 'Subjunctive: it states a wish'], why: 'It tells someone to do something, so it is imperative.' },
  { prompt: 'What is the **mood** of this sentence?\n\n> Did you remember to feed the fish?', right: 'Interrogative: it asks a question', wrong: ['Imperative: it gives a command', 'Indicative: it states a fact', 'Conditional: it names a condition'], why: 'It asks something, so it is interrogative.' },
  { prompt: 'What is the **mood** of this sentence?\n\n> The library opens at nine on Saturdays.', right: 'Indicative: it states a fact', wrong: ['Imperative: it gives a command', 'Subjunctive: it states a wish', 'Interrogative: it asks a question'], why: 'It states a fact, so it is indicative.' },
  { prompt: 'What is the **mood** of the verb in bold?\n\n> If it snowed tomorrow, we **would build** a snowman.', right: 'Conditional: what would happen if something were true', wrong: ['Imperative: an order to build a snowman', 'Interrogative: a question about the snow', 'Indicative: a fact about yesterday’s snow'], why: '*Would build* says what would happen under a condition, so it is conditional.' },
  { prompt: 'What is the **mood** of the verb in bold?\n\n> I wish my grandmother **were** here today.', right: 'Subjunctive: a wish that is not true', wrong: ['Indicative: a plain statement of fact', 'Imperative: a command to come here', 'Interrogative: a question about a visit'], why: '*Were* after *I wish* states something wished for but not real, so it is subjunctive.' },
];

const MOOD_2: Q[] = [
  { prompt: 'Which sentence uses the **subjunctive** correctly?', right: 'If I were taller, I could reach the top shelf.', wrong: ['If I was taller, I could reached the top shelf.', 'If I am taller, I could have reach the shelf.', 'If I be taller, I could reaching the shelf.'], why: 'A condition contrary to fact takes *were*: I am not taller.' },
  { prompt: 'Which sentence uses the **subjunctive** correctly?', right: 'The coach insists that every player be on time.', wrong: ['The coach insists that every player is be on time.', 'The coach insists that every player are on time.', 'The coach insists that every player been on time.'], why: 'After a demand (*insists that*), the subjunctive uses the base form: *be*.' },
  { prompt: 'Which sentence uses the **conditional** mood correctly?', right: 'If the bus were late, we would miss the start.', wrong: ['If the bus were late, we will missed the start.', 'If the bus were late, we would missing the start.', 'If the bus were late, we would of missed the start.'], why: 'The conditional uses *would* with the base form of the verb: *would miss*.' },
  { prompt: 'Which sentence uses the **conditional** mood to show uncertainty?', right: 'The plan might work if everyone helped.', wrong: ['The plan works because everyone helped.', 'Make the plan work by helping everyone.', 'Does the plan work when everyone helps?'], why: '*Might work* with an *if* clause shows that the outcome is uncertain.' },
];

const SHIFTS: Q[] = [
  { prompt: 'Which sentence has an inappropriate **shift in voice**?', right: 'Zainab painted the walls, and the doors were painted by her too.', wrong: ['Zainab painted the walls, and she painted the doors too.', 'The walls and the doors were both painted by Zainab.', 'Zainab painted both the walls and the doors in a day.'], why: 'It starts in the active voice (*Zainab painted*) and shifts to the passive (*were painted by her*).' },
  { prompt: 'Which sentence has an inappropriate **shift in mood**?', right: 'First, mix the flour and sugar, and then you should add the eggs.', wrong: ['First, mix the flour and sugar, and then add the eggs.', 'First you mix the flour and sugar, and then you add the eggs.', 'First, the flour and sugar are mixed, and then the eggs are added.'], why: 'It starts with a command (*mix*) and shifts to a statement (*you should add*); keep both imperative.' },
  { prompt: 'Which sentence has an inappropriate **shift in mood**?', right: 'If I were the captain, I will choose you first.', wrong: ['If I were the captain, I would choose you first.', 'If I am the captain, I will choose you first.', 'When I am captain, I will choose you first.'], why: '*If I were* is subjunctive (not true), so the result needs the conditional *would choose*, not *will*.' },
  { prompt: 'Which sentence has an inappropriate **shift in voice**?', right: 'We cleaned the beach, and forty bags of rubbish were collected.', wrong: ['We cleaned the beach and collected forty bags of rubbish.', 'The beach was cleaned, and forty bags of rubbish were collected.', 'We cleaned the beach, and we collected forty bags of rubbish.'], why: 'It shifts from active (*we cleaned*) to passive (*were collected*); keep the same voice.' },
  { prompt: 'Why might a writer choose the passive voice on purpose?', right: 'To focus on the action when the actor is unknown or unimportant', wrong: ['To make every sentence shorter and easier for a reader to follow', 'To show that the action happened in the future instead of the past', 'To turn a statement of fact into a question or a polite command'], why: 'In *The window was broken during the night*, who broke it is unknown, so the passive keeps the focus on what happened.' },
];

const verbMoods = (rng: Rng, d: Difficulty) =>
  by(d, [MOOD_1, MOOD_2, MOOD_2], [
    ['Indicative states, imperative commands, interrogative asks.', 'Conditional says what would happen; subjunctive states a wish or something not real.'],
    ['A wish or a condition that is not true takes were: if I were.', 'The conditional uses would, could or might with the base form of the verb.'],
    ['After insist, demand or suggest that, the subjunctive uses the base form: be, go.', 'Check that the verb after would or might is in its base form.'],
  ])(rng);

const voiceMoodShifts = (rng: Rng, d: Difficulty) =>
  by(d, [SHIFTS.slice(0, 2), SHIFTS.slice(2, 4), SHIFTS], [
    ['Keep the same voice (active or passive) and mood through a sentence.', 'Look for a sentence that starts one way and changes halfway.'],
    ['If one clause is subjunctive, the result needs the conditional (would).', 'In the active voice the subject does the action; in the passive it receives it.'],
    ['Shifts are errors when they happen for no reason.', 'A writer may choose the passive on purpose, to focus on the action.'],
  ])(rng);

// ---------------------------------------------------------------------------------------------
// Lesson 11.5: Contested usage and hyphens.
// ---------------------------------------------------------------------------------------------

const USAGE_1: Q[] = [
  { prompt: 'Which statement about English usage is most accurate?', right: 'Usage is a matter of convention, and conventions change over time', wrong: ['Usage was fixed by law in the eighteenth century and cannot change', 'Every rule of usage comes from Latin, so Latin settles every question', 'Usage is a matter of taste, so no choice is ever better than another'], why: 'Usage rests on what careful writers and speakers agree on, and that agreement shifts over time, which is why usage guides are revised.' },
  { prompt: 'A rule says never to end a sentence with a preposition. What do most modern usage guides say?', right: 'It is a myth: ending with a preposition is often the natural choice', wrong: ['It is a strict rule that every careful writer must follow at all times', 'It applies to speech but is always an error in any piece of writing', 'It is a rule of American English that British English does not share'], why: '*What are you looking at?* is natural; *At what are you looking?* is stiff. Usage guides treat the rule as a myth.' },
  { prompt: 'A rule says never to split an infinitive, as in *to boldly go*. What do most modern usage guides say?', right: 'A split infinitive is acceptable, especially when it reads better', wrong: ['A split infinitive is always an error and must be corrected at once', 'A split infinitive is acceptable only in poetry and in song lyrics', 'A split infinitive is a spelling mistake rather than a grammar one'], why: 'The rule was borrowed from Latin, where infinitives are one word; guides now accept a split when it is clearer.' },
  { prompt: 'What is a **usage guide**, such as a dictionary of English usage?', right: 'A reference that explains disputed choices and what careful writers do', wrong: ['A list of the spellings that are banned in formal and academic writing', 'A book of grammar exercises with the answers printed in the back', 'A collection of famous quotations arranged in alphabetical order'], why: 'A usage guide records how words are used and judges disputed points, often with the history of each dispute.' },
];

const USAGE_2: Q[] = [
  { prompt: 'Which sentence follows the traditional formal distinction between **fewer** and **less**?', right: 'There were fewer cars on the road, so there was less noise.', wrong: ['There were less cars on the road, so there was fewer noise.', 'There were fewer cars on the road, so there was fewer noise.', 'There were less cars on the road, so there was less noise.'], why: 'Formally, *fewer* goes with things you count (cars) and *less* with amounts (noise). *Less cars* is common in speech but avoided in formal writing.' },
  { prompt: 'A student writes: *Each visitor should leave their bag at the desk.* What do many modern usage guides say about **their** here?', right: 'Singular “they” is widely accepted, though some formal styles reword it', wrong: ['It is always an error, because “their” can only ever refer to more than one', 'It is correct only when the visitor is known to be a group of two people', 'It is a new invention of the last few years that no dictionary yet records'], why: 'Singular *they* has been used for centuries and many guides accept it; some formal styles prefer *Visitors should leave their bags*.' },
  { prompt: 'The word **hopefully** once meant only “in a hopeful way”. How do most guides treat *Hopefully, it will stop raining*?', right: 'As now standard, though some careful writers still avoid it', wrong: ['As a spelling mistake that should be written as “hopefuly”', 'As always wrong, because hopefully can only describe a person', 'As acceptable in writing, but never in speech or conversation'], why: 'Usage changed: *hopefully* as “it is to be hoped that” is now widely accepted, though the dispute is remembered.' },
  { prompt: 'A writer is unsure whether *data* takes *is* or *are*. What is the best way to settle it?', right: 'Consult a usage guide or the style guide the writing must follow', wrong: ['Choose whichever form sounds more impressive to the reader', 'Use both forms in turn so that every reader is satisfied', 'Avoid the word data entirely and never use it in writing'], why: 'Both forms are in use (*data are* is common in science); a usage guide or house style settles which to use.' },
];

const HYPHEN_1: Q[] = [
  { prompt: 'Which phrase is hyphenated correctly?', right: 'a well-known writer', wrong: ['a well known-writer', 'a-well known writer', 'a well known writer-'], why: 'Two words that work together as one adjective before a noun are hyphenated: *well-known*.' },
  { prompt: 'Which sentence is hyphenated correctly?', right: 'The writer is well known in her town.', wrong: ['The writer is well-known-in her town.', 'The writer-is well known in her town.', 'The writer is well known-in her town.'], why: 'After the noun, a compound adjective usually needs no hyphen: *the writer is well known*.' },
  { prompt: 'Which phrase is hyphenated correctly?', right: 'a highly rated film', wrong: ['a highly-rated-film', 'a-highly rated film', 'a highly rated-film'], why: 'An adverb ending in *-ly* is not hyphenated to the word after it.' },
  { prompt: 'Which number is written correctly in words?', right: 'thirty-seven', wrong: ['thirty seven-', 'thirty-seven-', 'thirtyseven'], why: 'Compound numbers from twenty-one to ninety-nine are hyphenated.' },
];

const HYPHEN_2: Q[] = [
  { prompt: 'Which sentence uses hyphens correctly?', right: 'The first- and second-year students met in the hall.', wrong: ['The first and second-year-students met in the hall.', 'The first- and second year students met in the hall.', 'The first and second year-students met in the hall.'], why: 'A suspended hyphen (*first-*) shows that *year* belongs to both numbers.' },
  { prompt: 'Why does *re-cover* need a hyphen in this sentence?\n\n> We had to re-cover the sofa after the cat ruined it.', right: 'Without it, the word would read as “recover”, a different word', wrong: ['All words that begin with “re” must always be hyphenated', 'The hyphen shows that the word is a verb rather than a noun', 'It is a compound number, and those are always hyphenated'], why: 'The hyphen separates *re-cover* (cover again) from *recover* (get better).' },
  { prompt: 'Which phrase is hyphenated correctly?', right: 'a self-taught pianist', wrong: ['a self taught-pianist', 'a selftaught pianist', 'a self-taught-pianist'], why: 'Words formed with *self-*, *ex-* and *all-* take a hyphen: *self-taught*, *ex-champion*, *all-important*.' },
  { prompt: 'Which sentence uses a hyphen correctly?', right: 'She ran a two-hour workshop on writing.', wrong: ['She ran a two hour-workshop on writing.', 'She ran a two-hour-workshop on writing.', 'She ran a-two hour workshop on writing.'], why: '*Two-hour* is a compound adjective before a noun, so it is hyphenated.' },
  { prompt: 'Two usage guides disagree about hyphenating *e-mail*. What should a writer do?', right: 'Follow the style guide the writing must use, and be consistent', wrong: ['Hyphenate it in one paragraph and not in the next, to vary it', 'Use whichever form appears first in any search on the internet', 'Leave the word out, because a disputed spelling is always wrong'], why: 'Hyphenation of new compounds changes over time (*e-mail* has become *email* in many guides); consistency with one guide matters most.' },
];

const contestedUsage = (rng: Rng, d: Difficulty) =>
  by(d, [USAGE_1, USAGE_2, USAGE_2], [
    ['Usage is set by convention, which changes over time.', 'Some “rules” are myths that usage guides reject.'],
    ['Formal writing keeps some traditional distinctions, such as fewer and less.', 'When a point is disputed, consult a usage guide or the style guide you must follow.'],
    ['Ask whether the choice is an error, a matter of formality, or genuinely disputed.', 'Most guides record what careful writers actually do.'],
  ])(rng);

const hyphens = (rng: Rng, d: Difficulty) =>
  by(d, [HYPHEN_1, HYPHEN_2, HYPHEN_2], [
    ['Hyphenate two words that act as one adjective before a noun: a well-known writer.', 'Do not hyphenate after an adverb ending in -ly: a highly rated film.'],
    ['Self-, ex- and all- take a hyphen; so do numbers from twenty-one to ninety-nine.', 'A hyphen can stop a word being misread: re-cover and recover.'],
    ['A suspended hyphen shares the last word: first- and second-year.', 'Where guides disagree, follow one style guide consistently.'],
  ])(rng);

export const UNIT11_SKILLS: SkillDef[] = [
  skill({ id: 'ex-conjunctions', name: 'Conjunctions', description: 'Find conjunctions, choose the one that shows how two ideas relate, and use the correlative pairs either … or, neither … nor, both … and and not only … but also.', outcomes: ['US1'], lessonId: 'ex-11-1', gen: conjunctions }),
  skill({ id: 'ex-prepositions-interjections', name: 'Prepositions and interjections', description: 'Find prepositions and interjections, tell them from conjunctions, and punctuate an interjection.', outcomes: ['US1'], lessonId: 'ex-11-1', gen: prepositions }),
  skill({ id: 'ex-commas-speech', name: 'Commas with yes, no, names, tags and adjectives', description: 'Use commas with yes and no, direct address and tag questions, and between coordinate adjectives.', outcomes: ['US2'], lessonId: 'ex-11-2', gen: commasSpeech }),
  skill({ id: 'ex-titles-of-works', name: 'The titles of works', description: 'Put the titles of long works in italics and of short works in quotation marks.', outcomes: ['US2'], lessonId: 'ex-11-2', gen: titles }),
  skill({ id: 'ex-intensive-pronouns', name: 'Intensive and reflexive pronouns', description: 'Recognize intensive pronouns, tell them from reflexive pronouns, and use -self pronouns correctly.', outcomes: ['US3'], lessonId: 'ex-11-3', gen: intensive }),
  skill({ id: 'ex-pronoun-shifts', name: 'Pronoun shifts and vague pronouns', description: 'Correct shifts in pronoun number and person, and fix vague pronouns.', outcomes: ['US3'], lessonId: 'ex-11-3', gen: shiftsVague }),
  skill({ id: 'ex-verb-moods', name: 'Verb moods', description: 'Name the indicative, imperative, interrogative, conditional and subjunctive moods, and form the subjunctive and conditional.', outcomes: ['US4'], lessonId: 'ex-11-4', gen: verbMoods }),
  skill({ id: 'ex-voice-mood-shifts', name: 'Shifts in voice and mood', description: 'Correct inappropriate shifts in verb voice and mood, and choose the passive voice for a reason.', outcomes: ['US4'], lessonId: 'ex-11-4', gen: voiceMoodShifts }),
  skill({ id: 'ex-contested-usage', name: 'Contested usage', description: 'Treat usage as convention that changes, recognize usage myths, and settle a disputed point with a usage guide.', outcomes: ['US5'], lessonId: 'ex-11-5', gen: contestedUsage }),
  skill({ id: 'ex-hyphens', name: 'Hyphens', description: 'Hyphenate compound adjectives, numbers and prefixes, use a suspended hyphen, and follow one style guide.', outcomes: ['US5'], lessonId: 'ex-11-5', gen: hyphens }),
];
