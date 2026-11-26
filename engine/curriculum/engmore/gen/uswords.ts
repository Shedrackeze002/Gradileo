/**
 * More English Topics, Unit 12: words, references and varieties of English, as the US Common Core
 * asks for them: formal and informal English, dialect and register (L.5.3b, L.6.1e, SL.5.6–8.6),
 * dictionaries, glossaries and thesauruses (L.5.4c to L.11-12.4c–d), and word relationships and
 * analogies (L.6.5b, L.7.5b, L.8.5b). The dictionary entries and the passages were written for
 * these lessons.
 */
import { mc, part, skill, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { ask, type Q } from './bank.ts';
import { block } from '../../eng10/gen/common.ts';

const by = (d: Difficulty, banks: [Q[], Q[], Q[]], hints: [string[], string[], string[]]) => (rng: Rng): GenOutput => ask(rng, banks[d - 1], hints[d - 1]);

// ---------------------------------------------------------------------------------------------
// Lesson 12.1: Formal and informal English, dialect and register.
// ---------------------------------------------------------------------------------------------

const REGISTER_1: Q[] = [
  { prompt: 'Which sentence is the most **formal**, the right choice for a letter to a museum director?', right: 'I am writing to ask whether our class may visit in May.', wrong: ['Hey, can our class swing by your place some time in May?', 'So, like, we kind of want to come over to see stuff in May.', 'Yo, our class is totally coming to your museum in May!'], why: 'Formal English uses complete sentences and polite, precise words, with no slang.' },
  { prompt: 'Which sentence is the most **informal**, the right choice for a text to a close friend?', right: 'Can’t wait for Saturday, it’s gonna be so much fun!', wrong: ['I very much look forward to our meeting on Saturday.', 'Please confirm your attendance at Saturday’s event.', 'The event on Saturday is expected to be enjoyable.'], why: 'Informal English uses contractions, everyday words and even slang such as *gonna*; it suits friends, not formal settings.' },
  { prompt: 'You are giving a speech to the school board. Which opening suits the occasion?', right: 'Good evening, members of the board. Thank you for hearing us.', wrong: ['Hi guys, thanks for letting us come and chat about stuff.', 'Okay, so, we’re here because there’s this thing we want.', 'What’s up, everyone? Let’s get this over with quickly.'], why: 'A formal occasion needs formal English: a polite greeting and precise, complete sentences.' },
  { prompt: 'What does **register** mean when we talk about language?', right: 'How formal or informal language is, to suit its audience and purpose', wrong: ['How loudly a speaker talks when they stand in front of a group', 'The list of every word that appears in a dictionary of English', 'The accent a person has because of where they grew up and live'], why: 'Register is the level of formality we choose for a situation, from very formal to very casual.' },
];

const DIALECT: Q[] = [
  { prompt: 'Read this line of dialogue from a story.\n\n> “I ain’t never seen a storm like this un,” said Old Tom, squinting at the sky.\n\nWhy might the writer give Old Tom this way of speaking?', right: 'To show where he comes from and make him sound real', wrong: ['To show that the writer does not know standard English', 'To make the storm sound calmer than it really was', 'To prove that Old Tom is the narrator of the whole story'], why: 'Writers use dialect in dialogue to show a character’s background and voice; it is a deliberate choice.' },
  { prompt: 'What is a **dialect**?', right: 'A form of a language with its own words and grammar in a region or group', wrong: ['A mistake that a person makes when they speak too fast to be understood', 'The formal English used only in laws, contracts and official reports', 'A language that is written down but is no longer spoken by anybody'], why: 'A dialect is a variety of a language with its own vocabulary, grammar and pronunciation, shared by a place or community.' },
  { prompt: 'In a story, the narrator speaks in standard English but one character says, “We was only messing about.” What does the contrast show?', right: 'The character’s voice is different from the narrator’s', wrong: ['The narrator has made an error the editor missed', 'The character is the most important one in the story', 'The story is set in the future in another country'], why: 'Writers use different varieties of English to give each voice its own character.' },
  { prompt: 'Why is **standard English** usually expected in a formal essay?', right: 'It is the variety most readers share, so it is clear to all of them', wrong: ['It is the only correct form of English, and every dialect is wrong', 'It is older than every other variety of English spoken today', 'It uses longer words, and longer words always earn more marks'], why: 'Standard English is the shared variety for formal writing; dialects are not wrong, but they suit other situations.' },
];

const STANDARD: Q[] = [
  { prompt: 'Which sentence is in **standard English**?', right: 'We were surprised by how many people came.', wrong: ['We was surprised by how many people came.', 'Us was surprised by how many people came.', 'We were surprised by how many people come.'], why: '*We were* is standard English; *we was* is a variety used in some dialects.' },
  { prompt: 'Which sentence is in **standard English**?', right: 'I saw the film yesterday with my sister.', wrong: ['I seen the film yesterday with my sister.', 'I seen the film yesterday with me sister.', 'Me and her seen the film yesterday.'], why: 'Standard English uses *I saw*; *I seen* is a variation from standard English.' },
  { prompt: 'Which sentence is in **standard English**?', right: 'There isn’t any milk left in the fridge.', wrong: ['There isn’t no milk left in the fridge.', 'There ain’t no milk left in the fridge.', 'There ain’t any milk left in the fridge.'], why: 'Standard English uses one negative and avoids *ain’t*.' },
  { prompt: 'A student’s report says: *The results was better than we expected.* How should it be revised for standard English?', right: 'The results were better than we expected.', wrong: ['The results was more better than we expected.', 'The results is better than what we expected.', 'The result were better than we was expected.'], why: '*Results* is plural, so standard English uses *were*.' },
];

const register = (rng: Rng, d: Difficulty) =>
  by(d, [REGISTER_1, REGISTER_1.concat(DIALECT.slice(1, 2)), DIALECT], [
    ['Think about who will read or hear the words, and why.', 'Formal English avoids slang and contractions; informal English uses them.'],
    ['Register is the level of formality that suits a situation.', 'Match it to the audience: a friend, a teacher, a board.'],
    ['Writers give characters dialect on purpose, to show who they are.', 'Standard English is the shared variety for formal writing.'],
  ])(rng);

const standardEnglish = (rng: Rng, d: Difficulty) =>
  by(d, [STANDARD.slice(0, 3), STANDARD, DIALECT.slice(2).concat(STANDARD.slice(3))], [
    ['Check the verb: we were, I saw, I did.', 'Standard English uses one negative and avoids ain’t.'],
    ['Make the verb agree with its subject.', 'Read the sentence as it would appear in a formal report.'],
    ['A dialect is a variety, not a mistake; it suits some situations and not others.', 'Formal writing expects standard English.'],
  ])(rng);

// ---------------------------------------------------------------------------------------------
// Lesson 12.2: Dictionaries, glossaries and thesauruses.
// ---------------------------------------------------------------------------------------------

interface Entry {
  md: string;
  word: string;
  part: string;
  wrongPart: string[];
  /** A sentence, the sense it uses (by number) and the other senses. */
  sentence: string;
  sense: string;
  otherSenses: string[];
  origin: string;
  wrongOrigin: string[];
}

const ENTRIES: Entry[] = [
  {
    md: '**bark** (bärk) *noun* **1.** the sharp sound a dog makes. **2.** the tough outer covering of a tree. *verb* **3.** to make the sound of a dog. **4.** to say something sharply: *She barked an order.* [Old English *beorcan*, to bark; sense 2 from Old Norse *börkr*]',
    word: 'bark', part: 'noun or verb', wrongPart: ['adjective only', 'adverb only', 'noun only'],
    sentence: 'The beetles lived under the bark of the old oak.', sense: 'the tough outer covering of a tree', otherSenses: ['the sharp, short sound a dog makes', 'to make the sound that a dog makes', 'to say something sharply and loudly'],
    origin: 'The tree sense came from Old Norse', wrongOrigin: ['Both of its senses came from Latin', 'The word was first used in modern times', 'The dog sense came from ancient Greek'],
  },
  {
    md: '**current** (kûr′ənt) *adjective* **1.** happening now; of the present time. *noun* **2.** a flow of water or air in one direction. **3.** a flow of electricity. [Latin *currere*, to run]',
    word: 'current', part: 'adjective or noun', wrongPart: ['verb only', 'adverb only', 'pronoun only'],
    sentence: 'The swimmers were pulled out to sea by a strong current.', sense: 'a flow of water or air in one direction', otherSenses: ['happening now; of the present time', 'a flow of electricity through a wire', 'up to date with the latest news'],
    origin: 'It comes from a Latin word meaning “to run”', wrongOrigin: ['It comes from a Greek word meaning “to swim”', 'It comes from an Old English word for “a river”', 'It comes from a French word meaning “a stream”'],
  },
  {
    md: '**grave** (grāv) *noun* **1.** a place where a dead person is buried. *adjective* **2.** serious and worrying: *a grave mistake.* **3.** solemn in manner: *a grave face.* [sense 1 from Old English *græf*; senses 2 and 3 from Latin *gravis*, heavy]',
    word: 'grave', part: 'noun or adjective', wrongPart: ['verb only', 'adverb only', 'conjunction only'],
    sentence: 'The doctor said the patient was in grave danger.', sense: 'serious and worrying', otherSenses: ['a place where a dead person is buried', 'solemn and serious in manner or face', 'deep and low in the sound it makes'],
    origin: 'The adjective comes from Latin for “heavy”', wrongOrigin: ['The adjective comes from Old Norse for “dark”', 'The noun comes from a Latin word for “happy”', 'Both of the senses come from modern French'],
  },
  {
    md: '**spring** (spring) *noun* **1.** the season between winter and summer. **2.** a coil of metal that returns to its shape. **3.** a place where water rises from the ground. *verb* **4.** to jump suddenly. [Old English *springan*, to leap or burst out]',
    word: 'spring', part: 'noun or verb', wrongPart: ['adjective only', 'adverb only', 'preposition only'],
    sentence: 'The village took its water from a spring on the hillside.', sense: 'a place where water rises from the ground', otherSenses: ['the season between winter and summer', 'a coil of metal that returns to its shape', 'to jump up suddenly from where you are'],
    origin: 'It comes from an Old English word meaning “to leap”', wrongOrigin: ['It comes from a Latin word meaning “a flower”', 'It comes from a Greek word meaning “to warm”', 'It comes from a Dutch word meaning “a garden”'],
  },
];

const GUIDE: Q[] = [
  { prompt: 'A dictionary page has the **guide words** *lamp* and *lane* at the top. Which word would you find on that page?', right: 'land', wrong: ['lake', 'large', 'lamb'], why: '*Land* comes after *lamp* and before *lane* in alphabetical order.' },
  { prompt: 'A dictionary page has the **guide words** *harbour* and *harvest* at the top. Which word would you find on that page?', right: 'harmony', wrong: ['hare', 'hasty', 'happen'], why: '*Harm-* comes after *harb-* and before *harv-*.' },
  { prompt: 'A dictionary page has the **guide words** *pebble* and *pencil* at the top. Which word would you find on that page?', right: 'pedal', wrong: ['peach', 'penny', 'people'], why: '*Ped-* comes after *peb-* and before *pen-*.' },
  { prompt: 'Where would you look to find what a key term means **in your science textbook**?', right: 'In the glossary at the back of the book', wrong: ['In the index of a different textbook', 'In the copyright notice at the front', 'In the list of chapters at the front'], why: 'A glossary defines the special terms of one book, as that book uses them.' },
];

const THESAURUS: Q[] = [
  { prompt: 'A thesaurus lists these synonyms for **thin**: *slim, skinny, slender, scrawny, lean*. Which word best fits a compliment?\n\n> The dancer moved with ___ grace.', right: 'slender', wrong: ['scrawny', 'skinny', 'bony'], why: 'A thesaurus gives words with similar meanings, but their connotations differ: *slender* is admiring, *scrawny* is not.' },
  { prompt: 'A thesaurus lists these synonyms for **smell**: *scent, odour, stench, aroma, whiff*. Which word best fits the sentence?\n\n> The ___ of fresh bread drifted from the bakery.', right: 'aroma', wrong: ['stench', 'odour', 'reek'], why: '*Aroma* suggests a pleasant smell; *stench* and *reek* suggest a foul one.' },
  { prompt: 'Why should you check a word from a thesaurus in a dictionary before you use it?', right: 'Synonyms are rarely exact; the word may not fit your sentence', wrong: ['A thesaurus always gives words that are spelt the wrong way', 'Dictionaries list more synonyms than any thesaurus can do', 'Every word in a thesaurus is old-fashioned and out of use'], why: 'A thesaurus suggests words; a dictionary confirms the exact meaning and use.' },
  { prompt: 'You guess that *meagre* means “small and not enough” from this sentence. How should you **verify** your guess?\n\n> After the long winter, the farmers had only a meagre harvest.', right: 'Check the meaning in a dictionary, and reread the sentence with it', wrong: ['Ask a friend whether the word sounds right to them when read aloud', 'Count the letters, because short words usually have small meanings', 'Look for the word in the index at the back of a history textbook'], why: 'A dictionary confirms the meaning, and rereading checks that it fits the context.' },
];

function dictionary(rng: Rng, d: Difficulty): GenOutput {
  if (d === 3) return ask(rng, GUIDE.concat(THESAURUS.slice(3)), ['Guide words show the first and last words on a page.', 'Check whether the word comes between them in alphabetical order.']);
  const e = rng.pick(ENTRIES);
  const entry = block(e.md);
  if (d === 1) {
    if (rng.chance(0.5)) {
      return {
        prompt: `Read the dictionary entry.\n\n${entry}\n\nWhich parts of speech can **${e.word}** be?`,
        parts: [part(mc(rng, e.part, e.wrongPart))],
        hints: ['The part of speech is shown in italics before each group of senses.', 'Some words can be more than one part of speech.'],
        solution: [`**${e.part}**`, 'The entry lists its senses under each part of speech, in italics.'],
      };
    }
    return {
      prompt: `Read the dictionary entry.\n\n${entry}\n\nWhat does the part in square brackets tell you?`,
      parts: [part(mc(rng, e.origin, e.wrongOrigin))],
      hints: ['The part in square brackets is the word’s etymology: where it came from.', 'Read the language named and the meaning given.'],
      solution: [`**${e.origin}**`, 'The etymology, in square brackets, gives the word’s history.'],
    };
  }
  return {
    prompt: `Read the dictionary entry.\n\n${entry}\n\nWhich meaning of **${e.word}** is used in this sentence?\n\n${block(e.sentence)}`,
    parts: [part(mc(rng, e.sense, e.otherSenses))],
    hints: ['Read each numbered sense.', 'Try each meaning in the sentence and keep the one that makes sense.'],
    solution: [`**${e.sense}**`, `In “${e.sentence}” only this sense fits.`],
  };
}

const thesaurus = (rng: Rng, d: Difficulty) =>
  by(d, [THESAURUS.slice(0, 2), THESAURUS, GUIDE.slice(3).concat(THESAURUS.slice(2))], [
    ['A thesaurus lists words with similar meanings.', 'Choose the synonym whose connotation fits the sentence.'],
    ['Synonyms are rarely exact; check the one you choose.', 'A dictionary confirms a meaning; a thesaurus suggests alternatives.'],
    ['Use a glossary for the terms of one book, a dictionary for any word.', 'Verify a guess about a word by checking it and rereading the sentence.'],
  ])(rng);

// ---------------------------------------------------------------------------------------------
// Lesson 12.3: Word relationships and analogies.
// ---------------------------------------------------------------------------------------------

const RELATION_1: Q[] = [
  { prompt: 'How are these two words related?\n\n> **petal** and **flower**', right: 'Part and whole', wrong: ['Cause and effect', 'Item and category', 'Opposites'], why: 'A petal is a part of a flower.' },
  { prompt: 'How are these two words related?\n\n> **drought** and **famine**', right: 'Cause and effect', wrong: ['Part and whole', 'Item and category', 'Synonyms'], why: 'A drought (no rain) can cause a famine (no food).' },
  { prompt: 'How are these two words related?\n\n> **oak** and **tree**', right: 'Item and category', wrong: ['Part and whole', 'Cause and effect', 'Opposites'], why: 'An oak is one kind of tree.' },
  { prompt: 'How are these two words related?\n\n> **ancient** and **modern**', right: 'Opposites (antonyms)', wrong: ['Synonyms', 'Part and whole', 'Item and category'], why: '*Ancient* and *modern* have opposite meanings.' },
  { prompt: 'How are these two words related?\n\n> **brave** and **courageous**', right: 'Synonyms', wrong: ['Opposites (antonyms)', 'Cause and effect', 'Part and whole'], why: '*Brave* and *courageous* have nearly the same meaning.' },
  { prompt: 'How are these two words related?\n\n> **chapter** and **book**', right: 'Part and whole', wrong: ['Item and category', 'Cause and effect', 'Synonyms'], why: 'A chapter is a part of a book.' },
];

const ANALOGY: Q[] = [
  { prompt: 'Complete the analogy.\n\n> **petal** is to **flower** as **page** is to ___', right: 'book', wrong: ['ink', 'read', 'paper'], why: 'A petal is part of a flower, and a page is part of a book (part to whole).' },
  { prompt: 'Complete the analogy.\n\n> **hot** is to **cold** as **early** is to ___', right: 'late', wrong: ['soon', 'morning', 'warm'], why: '*Hot* and *cold* are opposites, and so are *early* and *late*.' },
  { prompt: 'Complete the analogy.\n\n> **scissors** is to **cut** as **pen** is to ___', right: 'write', wrong: ['ink', 'paper', 'draw a line'], why: 'Scissors are used to cut, and a pen is used to write (tool to use).' },
  { prompt: 'Complete the analogy.\n\n> **salmon** is to **fish** as **eagle** is to ___', right: 'bird', wrong: ['nest', 'fly', 'feather'], why: 'A salmon is a kind of fish, and an eagle is a kind of bird (item to category).' },
  { prompt: 'Complete the analogy.\n\n> **warm** is to **hot** as **cool** is to ___', right: 'freezing', wrong: ['warm', 'heat', 'mild'], why: '*Hot* is a stronger degree of *warm*, and *freezing* is a stronger degree of *cool*.' },
  { prompt: 'Complete the analogy.\n\n> **rain** is to **puddle** as **fire** is to ___', right: 'ash', wrong: ['match', 'flame', 'wood'], why: 'Rain leaves a puddle, and fire leaves ash (cause to effect).' },
];

const ANALOGY_3: Q[] = [
  { prompt: 'Which pair has the same relationship as **author : novel**?', right: 'composer : symphony', wrong: ['reader : library', 'paper : printer', 'actor : audience'], why: 'An author creates a novel, and a composer creates a symphony (maker to thing made).' },
  { prompt: 'Which pair has the same relationship as **timid : terrified**?', right: 'happy : ecstatic', wrong: ['angry : calm', 'tired : bed', 'sad : unhappy'], why: '*Terrified* is a stronger degree of *timid* fear, and *ecstatic* is a stronger degree of *happy*.' },
  { prompt: 'Which pair has the same relationship as **wheel : bicycle**?', right: 'key : keyboard', wrong: ['road : car', 'pedal : push', 'rider : helmet'], why: 'A wheel is part of a bicycle, and a key is part of a keyboard (part to whole).' },
  { prompt: 'Which pair has the same relationship as **virus : illness**?', right: 'spark : fire', wrong: ['doctor : patient', 'water : ice', 'tree : forest'], why: 'A virus can cause an illness, and a spark can cause a fire (cause to effect).' },
  { prompt: 'Which pair has the same relationship as **generous : stingy**?', right: 'humble : arrogant', wrong: ['kind : gentle', 'clever : wise', 'rich : wealthy'], why: '*Generous* and *stingy* are opposites, and so are *humble* and *arrogant*.' },
];

const relationships = (rng: Rng, d: Difficulty) =>
  by(d, [RELATION_1, RELATION_1, ANALOGY_3.slice(0, 3)], [
    ['Ask how the first word connects to the second.', 'Is one a part of the other, a kind of it, a cause of it, or its opposite?'],
    ['Make up a sentence that links the two words: “A petal is part of a flower.”', 'The sentence shows the relationship.'],
    ['Name the relationship of the first pair in a sentence.', 'Then test each choice with the same sentence.'],
  ])(rng);

const analogies = (rng: Rng, d: Difficulty) =>
  by(d, [ANALOGY.slice(0, 4), ANALOGY, ANALOGY_3], [
    ['An analogy compares two pairs that share a relationship.', 'Find the relationship in the first pair, then apply it to the second.'],
    ['Say the first pair in a sentence: “A petal is part of a flower.”', 'Use the same sentence for the second pair.'],
    ['Relationships include part to whole, cause to effect, degree, opposites and maker to thing made.', 'Test every choice with the sentence for the first pair.'],
  ])(rng);

export const UNIT12_SKILLS: SkillDef[] = [
  skill({ id: 'ex-register', name: 'Formal and informal English', description: 'Choose the register that suits an audience and purpose, and explain why a writer gives a character a dialect.', outcomes: ['US6'], lessonId: 'ex-12-1', gen: register }),
  skill({ id: 'ex-standard-english', name: 'Standard English and dialect', description: 'Recognize variations from standard English, revise them for formal writing, and tell a dialect from an error.', outcomes: ['US6'], lessonId: 'ex-12-1', gen: standardEnglish }),
  skill({ id: 'ex-dictionary', name: 'Using a dictionary', description: 'Read a dictionary entry for part of speech, meaning and etymology, choose the sense that fits, and use guide words.', outcomes: ['US7'], lessonId: 'ex-12-2', gen: dictionary }),
  skill({ id: 'ex-thesaurus', name: 'Thesauruses, glossaries and checking a meaning', description: 'Choose a synonym from a thesaurus, use a glossary, and verify the meaning of a word.', outcomes: ['US7'], lessonId: 'ex-12-2', gen: thesaurus }),
  skill({ id: 'ex-word-relationships', name: 'Word relationships', description: 'Name how two words are related: part and whole, cause and effect, item and category, synonyms or opposites.', outcomes: ['US8'], lessonId: 'ex-12-3', gen: relationships }),
  skill({ id: 'ex-analogies', name: 'Analogies', description: 'Complete an analogy and choose the pair with the same relationship.', outcomes: ['US8'], lessonId: 'ex-12-3', gen: analogies }),
];
