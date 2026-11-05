/**
 * Grade 6 English, Unit 7: Writing (E6-G1). Story openings and dialogue, informational structure
 * and transitions, persuasive claims and counterclaims, and revising for precise words and
 * sentence variety.
 */
import { skill } from '../../helpers.ts';
import type { SkillDef } from '../../../types.ts';
import { bank, GAP, Q } from './common.ts';

const G1 = ['E6-G1'];

const HOOKS = [
  Q(1, 'Which is the strongest opening (hook) for a story?', '“The floor beneath me cracked, and I was falling.”', ['“This is a story about a girl and a long trip she took.”', '“Once there was a day that was quite normal in every way.”', '“I am going to tell you all about my summer holiday.”'],
    'A strong hook drops the reader into action and makes them want to know what happens. The others announce the story instead of starting it.'),
  Q(1, 'Which kind of hook is this? “Have you ever wondered what it would be like to fly?”', 'A question', ['A sound effect', 'A line of dialogue', 'A surprising fact'],
    'The opening asks the reader something, so it is a question hook.'),
  Q(2, 'Which kind of hook is this? “‘Don’t open that box!’ Grandma shouted.”', 'A line of dialogue', ['A question', 'A description', 'A summary'],
    'The story opens with a character speaking. Dialogue hooks throw the reader straight into a scene.'),
  Q(2, 'Why do writers often begin in the middle of the action?', 'To grab the reader’s interest straight away', ['To explain every detail of the setting first', 'To make the story shorter and easier to write', 'To tell the reader how the story will end'],
    'Starting in the action makes the reader curious; background can be filled in later.'),
  Q(3, 'Which opening best sets up a mysterious mood?', '“The letter had no name on it, only a black feather.”', ['“It was a sunny day, and everyone in town was very happy.”', '“My name is NAME, and I am eleven years old this year.”', '“We went to the park and then we went back home again.”'],
    'An unsigned letter with a black feather raises questions and creates mystery. The others are flat or give no reason to read on.'),
];

const DIALOGUE = [
  Q(1, 'Which sentence is punctuated correctly?', '“Let’s go,” said NAME.', ['“Let’s go” said NAME.', '“Let’s go.” said NAME.', 'Let’s go, “said NAME.”'],
    'When the dialogue tag comes after the speech, end the spoken words with a comma inside the quotation marks.'),
  Q(1, 'When should a writer start a new paragraph in dialogue?', 'Each time a different character speaks', ['After every three lines of dialogue', 'Only when the setting changes', 'Never: dialogue is one paragraph'],
    'A new paragraph for each new speaker helps the reader follow who is talking.'),
  Q(2, 'Which dialogue tag shows the most about how a character feels?', '“I won,” NAME whispered, tears in {his} eyes.', ['“I won,” said NAME, and that was all {he} said.', '“I won,” NAME said to the others in the room.', '“I won,” NAME told everyone who was there.'],
    'Whispered and tears in {his} eyes show NAME is overwhelmed with emotion. The others only report the words.'),
  Q(2, 'What does this dialogue show about NAME? “Oh, sure, I’d love to clean the bathroom,” NAME muttered, rolling {his} eyes.', '{He} does not want to clean it at all.', ['{He} is excited to clean the bathroom.', '{He} has never cleaned a bathroom.', '{He} thinks the bathroom is very clean.'],
    'Muttered and rolling {his} eyes show the words are sarcastic: NAME means the opposite of what {he} says.'),
  Q(3, 'Which piece of dialogue best moves the plot forward?', '“The bridge is out. We’ll have to swim across.”', ['“Hello there. How are you feeling today, then?”', '“I really like your shoes. Are they new ones?”', '“It’s quite a nice day for a walk, isn’t it?”'],
    'This line gives new information that creates a problem and changes what the characters must do. The others are small talk.'),
  Q(3, 'Which sentence is punctuated correctly?', '“Wait,” NAME said, “I forgot my bag.”', ['“Wait” NAME said, “I forgot my bag.”', '“Wait,” NAME said “I forgot my bag.”', '“Wait,” NAME said, “i forgot my bag.”'],
    'When a tag interrupts a sentence, put a comma after the first part, a comma after the tag, and continue in lower case unless the next word is I.'),
];

const INFO = [
  Q(1, 'What should the introduction of an informational piece do?', 'Introduce the topic and catch the reader’s interest', ['Give every fact the writer knows about the topic', 'Say goodbye to the reader and end the piece', 'Tell a made-up story with lots of dialogue'],
    'The introduction names the topic, hooks the reader and often says what the piece will cover.'),
  Q(1, 'Where do most of the facts and details go in an informational piece?', 'In the body paragraphs', ['In the title', 'In the conclusion', 'In the introduction'],
    'Each body paragraph covers one subtopic with its facts and details.'),
  Q(2, 'A report on wolves has body paragraphs on their packs, their hunting and their habitat. What should each paragraph begin with?', 'A topic sentence naming its subtopic', ['A question for the reader to answer', 'A list of sources the writer used', 'A summary of the whole report'],
    'Each body paragraph should begin with a topic sentence, such as “Wolves live and hunt in family groups called packs.”'),
  Q(2, 'Which is the best conclusion for a report about recycling?', '“Recycling is a small habit that makes a big difference.”', ['“The end. Thank you very much for reading my report.”', '“Old paper can be recycled into brand new paper.”', '“Glass bottles are often coloured green or brown.”'],
    'A good conclusion sums up the main idea and leaves the reader with a final thought. The others are a weak sign-off or a single detail.'),
  Q(3, 'A writer is planning a report on the solar system. Which plan has the clearest structure?', 'Intro; the Sun; rocky planets; gas giants; conclusion', ['Intro; Mars; the Sun; Saturn; Earth; my opinion', 'Facts about space in the order I thought of them', 'Conclusion first, then the planets, then the Sun'],
    'The first plan groups related information into sections in a logical order, with an introduction and conclusion.'),
];

const TRANS = [
  Q(1, `Choose the transition: “Wolves hunt in packs. ${GAP}, they share the food with the whole group.”`, 'Afterwards', ['However', 'For example', 'In contrast'],
    'Afterwards shows what happens next in time.'),
  Q(1, `Choose the transition: “Many animals live in the desert. ${GAP}, camels can go for days without water.”`, 'For example', ['However', 'Finally', 'Meanwhile'],
    'The second sentence gives an example of a desert animal.'),
  Q(2, `Choose the transition: “Frogs have smooth skin. ${GAP}, toads have dry, bumpy skin.”`, 'In contrast', ['Similarly', 'For example', 'As a result'],
    'The second sentence shows a difference, so a contrast transition fits.'),
  Q(2, `Choose the transition: “The river flooded. ${GAP}, the road was closed for a week.”`, 'As a result', ['For instance', 'Similarly', 'In contrast'],
    'The road closing was caused by the flood, so a cause-and-effect transition fits.'),
  Q(3, `Choose the transition: “Bees make honey. ${GAP}, they pollinate many of the crops we eat.”`, 'In addition', ['In contrast', 'As a result', 'Instead'],
    'The second sentence adds another way bees are useful, so an adding transition fits.'),
  Q(3, 'Which transition best signals a conclusion?', 'In summary', ['For instance', 'Next', 'However'],
    'In summary tells the reader the writer is wrapping up the main points.'),
];

const THESIS = [
  Q(1, 'Which is the clearest claim for a persuasive piece?', '“Our school should plant a vegetable garden.”', ['“Gardens are places where plants grow.”', '“Some schools have gardens and some do not.”', '“I am going to write about gardens.”'],
    'A clear claim takes a position that the writer will argue for. The others are facts or announcements.'),
  Q(2, 'Which claim is the most specific?', '“Our town should build a skate park in Elm Field.”', ['“Our town should be a better place to live.”', '“Something should be done about our town.”', '“Parks are good for the people of towns.”'],
    'A specific claim says exactly what should happen and where. Vague claims are hard to support.'),
  Q(2, 'What makes a claim arguable?', 'Reasonable people could disagree with it.', ['Everyone already agrees that it is true.', 'It can be proved true by looking it up.', 'It is a question rather than a sentence.'],
    'If a statement is a plain fact, there is nothing to argue. A claim must be something people could disagree with.'),
  Q(3, 'Which claim would be best for a one-page persuasive letter to a head teacher?', '“Pupils should have ten more minutes of break each day.”', ['“Schools around the world should be completely changed.”', '“Break time is when pupils go outside to play.”', '“Some pupils like break and some pupils do not.”'],
    'The best claim is arguable, specific and small enough to support well in one page, for a reader who can act on it.'),
];

const COUNTER = [
  Q(1, 'What is a counterclaim?', 'An argument against the writer’s own claim', ['A second claim that agrees with the first', 'A list of facts at the end of an essay', 'A question asked in the introduction'],
    'A counterclaim is what someone on the other side might argue. Strong persuasive writing answers it.'),
  Q(2, 'Claim: “Pupils should have a longer lunch.” Which is a counterclaim?', '“A longer lunch would make the school day end later.”', ['“A longer lunch would give pupils time to exercise.”', '“Pupils come back from lunch more focused.”', '“Twenty minutes is not enough to eat and play.”'],
    'The counterclaim gives a reason against the writer’s claim. The others support the claim.'),
  Q(2, 'Why should a persuasive writer address a counterclaim?', 'It shows they have thought about other views.', ['It makes the piece of writing twice as long.', 'It proves that the other side is really right.', 'It means they can skip giving any evidence.'],
    'Answering the other side shows fairness and makes the writer’s argument more convincing.'),
  Q(3, 'Which is the best rebuttal to the counterclaim “A longer lunch would make the day end later”?', '“Five minutes could come from assembly instead.”', ['“That is a really silly thing to say about lunch.”', '“Everyone in the school wants a longer lunch anyway.”', '“Lunch is my very favourite part of the whole day.”'],
    'A good rebuttal answers the concern with a reasonable solution. Insults and opinions do not answer it.'),
  Q(3, 'Which sentence introduces a counterclaim fairly?', '“Some people argue that homework helps pupils practise.”', ['“Only foolish people think homework is useful.”', '“Nobody could ever think that homework helps.”', '“Homework is terrible, and that is the end of it.”'],
    'A fair writer states the other view respectfully before answering it.'),
];

const PRECISE = [
  Q(1, 'Which word is most precise? “The dog ___ the stick.”', 'snatched', ['got', 'had', 'did'],
    'Snatched shows exactly how the dog took the stick: quickly. Got, had and did are vague.'),
  Q(1, 'Which revision replaces the vague word “nice” best? “We had a nice time at the beach.”', '“We had a relaxing time at the beach.”', ['“We had a nice, nice time at the beach.”', '“We had a very nice time at the beach.”', '“We had a good time at the beach.”'],
    'Relaxing says exactly what kind of time it was. Very nice and good are still vague.'),
  Q(2, 'Which sentence is least wordy?', '“We decided to leave early.”', ['“We made the decision that we would leave early.”', '“We decided that we would make our leave early.”', '“We came to a decision to leave at an early time.”'],
    'The first says the same thing in the fewest words. The others add words that carry no meaning.'),
  Q(2, 'Which sentence uses the most precise nouns and verbs?', '“The terrier sprinted across the meadow.”', ['“The dog went across the field.”', '“The animal moved across the place.”', '“The dog ran across the grassy area.”'],
    'Terrier, sprinted and meadow paint a clear picture. Animal, moved and place are vague.'),
  Q(3, 'Which revision best improves this sentence? “The food was really very good.”', '“The soup was rich and creamy.”', ['“The food was really, really good.”', '“The food was extremely very good.”', '“The food was good and nice.”'],
    'The revision names the food and describes it exactly. Adding really or very does not make writing more precise.'),
];

const VARIETY = [
  Q(1, 'Why should writers vary the length of their sentences?', 'To make writing flow and keep it interesting', ['To make every paragraph exactly the same length', 'To use up more space on the page', 'To avoid using any punctuation at all'],
    'A mix of short and long sentences gives writing rhythm. Too many of one length becomes dull or confusing.'),
  Q(2, 'Which revision varies the sentence openings best? “I woke up. I got dressed. I ate breakfast.”', '“When I woke up, I got dressed. After breakfast, I left.”', ['“I woke up and I got dressed and I ate breakfast.”', '“I woke up. I got dressed. I ate my breakfast.”', '“I woke. I dressed. I ate. I went to school.”'],
    'Starting with “When…” and “After…” varies the openings and joins the ideas. The others still start every idea with I.'),
  Q(2, 'Which sentence begins with an adverb to add variety?', '“Slowly, the door creaked open.”', ['“The door creaked open slowly.”', '“The door slowly creaked open.”', '“The door creaked and opened.”'],
    'Moving the adverb to the front changes the sentence opening.'),
  Q(3, 'A paragraph has five long sentences in a row. What would most improve it?', 'Adding a short sentence for emphasis', ['Making every sentence even longer', 'Starting every sentence with “Then”', 'Removing all the describing words'],
    'A short sentence after long ones stands out and adds punch: “Then it stopped.”'),
  Q(3, 'Which revision best combines these choppy sentences? “The cave was dark. It was cold. We went in anyway.”', '“Although the cave was dark and cold, we went in anyway.”', ['“The cave was dark, it was cold, we went in anyway.”', '“The cave was dark and it was cold and we went in.”', '“The cave was dark. And cold. And we went in anyway.”'],
    'Although shows the contrast, and “dark and cold” joins the two describing sentences. The second option is a run-on.'),
];

export const WRITING_SKILLS: SkillDef[] = [
  skill({ id: 'e6-hooks', name: 'Story openings', description: 'Choose and name strong openings (hooks) for a story.', outcomes: G1, lessonId: 'e6-7-1', format: 'mc', gen: bank(HOOKS, ['A hook makes the reader want to keep reading.', 'Start in the action, with a question, dialogue or a surprising detail.']) }),
  skill({ id: 'e6-dialogue', name: 'Dialogue', description: 'Punctuate dialogue and use it to show character and move the plot.', outcomes: G1, lessonId: 'e6-7-1', format: 'mc', gen: bank(DIALOGUE, ['Speech goes inside quotation marks, with its comma or end mark inside too.', 'Good dialogue shows feelings or moves the story on.']) }),
  skill({ id: 'e6-info-structure', name: 'Organizing informational writing', description: 'Organize an informational piece with an introduction, body paragraphs and a conclusion.', outcomes: G1, lessonId: 'e6-7-2', format: 'mc', gen: bank(INFO, ['Introduction: topic and hook. Body: one subtopic each. Conclusion: sum up.']) }),
  skill({ id: 'e6-transitions', name: 'Transitions', description: 'Choose transitions that show time, examples, contrast, cause and effect, and addition.', outcomes: G1, lessonId: 'e6-7-2', format: 'mc', gen: bank(TRANS, ['Ask how the two sentences connect: time, example, contrast, result or addition?']) }),
  skill({ id: 'e6-thesis', name: 'Persuasive claims', description: 'Write a clear, specific and arguable claim.', outcomes: G1, lessonId: 'e6-7-3', format: 'mc', gen: bank(THESIS, ['A claim takes a position people could disagree with.', 'Specific claims are easier to support.']) }),
  skill({ id: 'e6-counterclaim', name: 'Counterclaims and rebuttals', description: 'Recognize and answer counterclaims fairly.', outcomes: G1, lessonId: 'e6-7-3', format: 'mc', gen: bank(COUNTER, ['A counterclaim argues against your claim.', 'A rebuttal answers it with reasons, not insults.']) }),
  skill({ id: 'e6-precise-words', name: 'Precise words', description: 'Replace vague and wordy language with precise words.', outcomes: G1, lessonId: 'e6-7-4', format: 'mc', gen: bank(PRECISE, ['Swap vague words (nice, good, thing, went) for exact ones.', 'Cut words that add no meaning.']) }),
  skill({ id: 'e6-sentence-variety', name: 'Sentence variety', description: 'Vary the length and openings of sentences.', outcomes: G1, lessonId: 'e6-7-4', format: 'mc', gen: bank(VARIETY, ['Mix short and long sentences.', 'Start some sentences with a phrase, an adverb or a clause.']) }),
];
