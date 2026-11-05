/**
 * Grade 5 English, Unit 6: Writing (E5-F1). Topic sentences and paragraph unity, time-order words
 * and showing feelings in narratives, reasons and linking words in opinion writing, and editing
 * and combining sentences. The paragraphs are written for Gradileo.
 */
import { mc, part, skill, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { atLevel, bank, fill, GAP, people, Q } from './common.ts';

const F1 = ['E5-F1'];

// ---------------------------------------------------------------------------- 6.1 the paragraph

const TOPIC: Q[] = [
  Q(1, 'Which topic sentence fits this paragraph best?', 'Dogs make wonderful pets.', ['Cats sleep for most of the day.', 'My uncle has a big farm.', 'Some people are scared of dogs.'],
    'Every detail is about why dogs are good pets: loyalty, fun and exercise. The topic sentence must cover all of them.',
    '[Topic sentence] They are loyal and love their owners. They enjoy playing games like fetch. Walking a dog also helps its owner get exercise.'),
  Q(1, 'Which topic sentence fits this paragraph best?', 'Our class trip to the zoo was exciting.', ['Zoos are found in many big cities.', 'Buses can carry a lot of students.', 'I like to eat lunch outdoors.'],
    'The details are all about what the class saw and did at the zoo, so the topic sentence should introduce the trip.',
    '[Topic sentence] First we watched the lions eat their lunch. Then a zookeeper let us feed the giraffes. Before we left, we saw a baby elephant splash in a pool.'),
  Q(2, 'Which topic sentence fits this paragraph best?', 'Autumn is a busy time for animals.', ['Leaves turn red and gold in autumn.', 'Squirrels have long, bushy tails.', 'Winter is the coldest season.'],
    'The details describe animals preparing for winter (squirrels, birds, bears). The topic sentence must be about animals in autumn, not leaves or squirrels alone.',
    '[Topic sentence] Squirrels bury nuts to eat later. Many birds fly south to warmer places. Bears eat as much as they can before their long winter sleep.'),
  Q(2, 'Which is the best closing sentence for this paragraph?', 'Riding my bike gives me freedom, fun and exercise.', ['My bike is blue and has a basket on the front.', 'I got my bike for my birthday last year.', 'Some people prefer to take the bus to school.'],
    'A closing sentence sums up the paragraph’s main idea in new words. The others add new details or change the topic.',
    'I love riding my bike. I can ride to my friend’s house on my own. I race down hills with the wind in my face. Riding also keeps me fit. [Closing sentence]'),
  Q(3, 'Which topic sentence fits this paragraph best?', 'Water is important to every living thing.', ['Plants need sunlight to make their food.', 'People need to drink water every day.', 'The ocean is home to many kinds of fish.'],
    'The details cover people, plants and animals all needing water, so the topic sentence must be about every living thing. “People drink water every day” is too narrow.',
    '[Topic sentence] People need to drink water to stay healthy. Plants take in water through their roots. Animals in the desert travel long distances to find it.'),
  Q(3, 'Which topic sentence would best begin a paragraph about the ways people use trees?', 'Trees give people many useful things.', ['Some trees grow to be very tall.', 'Oak trees have acorns in autumn.', 'Forests are home to many animals.'],
    'A topic sentence states the main idea the paragraph will explain. Only the first one is about the ways people use trees.'),
];

const UNITY: Q[] = [
  Q(1, 'Which sentence does NOT belong in this paragraph?', '(3) My favourite colour is green.', ['(2) It gives us apples in the autumn.', '(4) Birds build nests in its branches.', '(5) In summer, we read in its shade.'],
    'Every other sentence is about the apple tree. Sentence 3 changes the topic, so it does not belong.',
    '(1) The apple tree in our garden is special. (2) It gives us apples in the autumn. (3) My favourite colour is green. (4) Birds build nests in its branches. (5) In summer, we read in its shade.'),
  Q(1, 'Which sentence does NOT belong in this paragraph?', '(4) Bananas are yellow.', ['(2) Cheetahs can run very fast.', '(3) They can reach their top speed quickly.', '(5) Their long tails help them turn.'],
    'The paragraph is about how cheetahs are built for speed. Sentence 4 is about bananas, so it does not belong.',
    '(1) Cheetahs are built for speed. (2) Cheetahs can run very fast. (3) They can reach their top speed quickly. (4) Bananas are yellow. (5) Their long tails help them turn.'),
  Q(2, 'Which sentence does NOT belong in this paragraph?', '(4) My cousin plays the violin.', ['(2) It teaches us how to work together.', '(3) It keeps our bodies strong and healthy.', '(5) It is also a lot of fun.'],
    'The paragraph is about why playing sport is good. Sentence 4 is about music and a cousin, so it is off topic.',
    '(1) Playing a team sport is good for children. (2) It teaches us how to work together. (3) It keeps our bodies strong and healthy. (4) My cousin plays the violin. (5) It is also a lot of fun.'),
  Q(3, 'Which sentence does NOT belong in this paragraph?', '(4) Some lighthouses are painted in stripes.', ['(2) Its bright light warned ships of rocks.', '(3) Sailors could see it from far away.', '(5) Without it, many ships might have sunk.'],
    'The paragraph is about how the lighthouse kept ships safe. Stripes are about how lighthouses look, so sentence 4 does not support the main idea, even though it is about lighthouses.',
    '(1) The old lighthouse kept ships safe for a hundred years. (2) Its bright light warned ships of rocks. (3) Sailors could see it from far away. (4) Some lighthouses are painted in stripes. (5) Without it, many ships might have sunk.'),
];

// ---------------------------------------------------------------------------- 6.2 narrative writing

const TIME: Array<{ s: string; right: string; wrong: string[]; d: Difficulty }> = [
  { s: '___, NAME packed {his} bag for the camping trip.', right: 'First', wrong: ['Finally', 'Because', 'However'], d: 1 },
  { s: 'NAME put up the tent. ___, {he} built a small campfire.', right: 'Next', wrong: ['First', 'But', 'Instead'], d: 1 },
  { s: '___, after a long day, NAME fell asleep under the stars.', right: 'Finally', wrong: ['First', 'Next', 'Also'], d: 1 },
  { s: 'The movie ended at nine. ___, we drove home.', right: 'Afterwards', wrong: ['Before', 'Meanwhile', 'First'], d: 2 },
  { s: 'NAME waited at the station. ___, {his} grandmother was stuck in traffic across town.', right: 'Meanwhile', wrong: ['Finally', 'First', 'Afterwards'], d: 2 },
  { s: 'The ground was dry for months. ___ one night, the rain came pouring down.', right: 'Then', wrong: ['First', 'Before', 'Meanwhile'], d: 2 },
  { s: '___ the bell rang, everyone rushed out of the classroom.', right: 'As soon as', wrong: ['Before long', 'In the end', 'Meanwhile'], d: 3 },
  { s: 'NAME practised for weeks. ___, {he} stepped onto the stage.', right: 'At last', wrong: ['Meanwhile', 'At first', 'Before'], d: 3 },
  { s: '___, NAME did not like {his} new school, but by spring it felt like home.', right: 'At first', wrong: ['At last', 'Afterwards', 'Meanwhile'], d: 3 },
];

function timeOrder(rng: Rng, d: Difficulty): GenOutput {
  const x = rng.pick(atLevel(TIME, d));
  const [who] = people(rng, 1);
  const s = fill(x.s, [who]).replace('___', GAP);
  return {
    prompt: `Which time-order word or phrase best completes the sentence?\n\n> ${s}`,
    parts: [part(mc(rng, x.right, x.wrong))],
    hints: ['Time-order words show when events happen: first, next, then, meanwhile, afterwards, finally.', 'Ask: does this event come at the start, in the middle, at the same time as another, or at the end?'],
    solution: [`“${x.right}” fits: ${{ First: 'it begins the sequence', Next: 'it is the step after', Finally: 'it ends the sequence', Afterwards: 'it comes after the movie', Meanwhile: 'two things happen at the same time', Then: 'it shows what happened next', 'As soon as': 'it shows one thing happening right after another', 'At last': 'it shows the end of a long wait', 'At first': 'it shows how things were in the beginning, before they changed' }[x.right] ?? 'it shows when the event happens'}.`],
  };
}

const SHOW: Q[] = [
  Q(1, 'Which sentence SHOWS that NAME is nervous, instead of telling it?', 'NAME’s hands shook as {he} held {his} speech.', ['NAME was very nervous about the speech.', 'NAME felt nervous, so {he} was nervous.', 'NAME was nervous before {he} spoke.'],
    'Showing uses actions and details (shaking hands) so the reader can work out the feeling. The others just name the feeling.'),
  Q(1, 'Which sentence SHOWS that the room was cold?', 'NAME could see {his} breath in the air.', ['The room NAME was in was very cold.', 'It was cold inside the room that day.', 'NAME thought that the room was cold.'],
    'Seeing your breath is a detail that shows the cold without saying “cold”.'),
  Q(2, 'Which sentence SHOWS that NAME is happy?', 'NAME skipped down the path, humming a tune.', ['NAME was happy as {he} went down the path.', 'NAME felt really happy on the path today.', 'NAME was in a happy mood on the path.'],
    'Skipping and humming are actions that show happiness. The others tell the feeling directly.'),
  Q(2, 'Which sentence SHOWS that the dog was tired?', 'The dog flopped onto the rug and closed its eyes.', ['The dog was very tired after the long walk.', 'The dog felt tired, and it was sleepy too.', 'After the walk the dog was really tired.'],
    'Flopping down and closing its eyes show tiredness without naming it.'),
  Q(3, 'Which revision best SHOWS the feeling in “NAME was angry”?', 'NAME clenched {his} fists and slammed the door.', ['NAME was really, truly and very angry indeed.', 'NAME was angry, and everyone knew it was so.', 'NAME felt anger, which is a very strong feeling.'],
    'Clenched fists and a slammed door are actions that show anger. Adding “really” and “very” still only tells.'),
  Q(3, 'Which detail would best SHOW that the old house was spooky?', 'The door creaked open, and cobwebs brushed NAME’s face.', ['The old house at the end of the street was spooky.', 'Everyone in town said the old house was very scary.', 'NAME thought the old house was the spookiest one.'],
    'A creaking door and cobwebs are sensory details that let the reader feel the spookiness.'),
];

// ---------------------------------------------------------------------------- 6.3 opinion writing

const REASONS: Q[] = [
  Q(1, 'Which is the strongest reason to support this opinion: “Our school should have a garden”?', 'Students could learn how food grows.', ['Gardens are green and have flowers.', 'My grandmother has a big garden.', 'Some people do not like gardening.'],
    'A strong reason explains why the opinion is right. Learning how food grows is a real benefit for the school. The others do not explain why the school needs one.'),
  Q(1, 'Which is the strongest reason to support this opinion: “Everyone should learn to swim”?', 'Swimming can keep people safe near water.', ['Swimming pools are often blue and very wet.', 'My friend NAME has a big swimming pool.', 'Some people learn to swim down at the beach.'],
    'Safety is an important reason that applies to everyone. The others are facts that do not support the opinion.'),
  Q(2, 'Which is the strongest reason to support this opinion: “Recess should be longer”?', 'Students focus better after time to play.', ['Recess is my favourite part of the day.', 'The playground has a slide and swings.', 'Recess happens at about ten o’clock.'],
    'A strong reason gives a benefit that others will accept. “It is my favourite part” is only a feeling, not a reason that would persuade a principal.'),
  Q(2, 'Which reason does NOT support this opinion: “Our town needs a public library”?', 'Libraries are usually quiet places.', ['People could borrow books for free.', 'Students would have a place to study.', 'Families could join reading programs.'],
    'Being quiet does not explain why the town needs one. The others give real benefits.'),
  Q(3, 'Which piece of evidence would best support the reason: “Reading every day makes you a better writer”?', 'Readers see many examples of good sentences.', ['Most books have a cover and a title.', 'Reading can be done anywhere you like.', 'Libraries let you borrow up to ten books.'],
    'The evidence must connect reading to writing. Seeing good sentences helps you write them. The others are true but unrelated to writing.'),
  Q(3, 'A writer’s opinion is “Students should wear helmets when they ride bikes.” Which is the best concluding sentence?', 'A small helmet can protect your whole life.', ['Bikes come in many different colours and sizes.', 'Some helmets have stickers and stripes on them.', 'I rode my bike to the park last Saturday.'],
    'A conclusion restates the opinion in a fresh, convincing way. The others add details that do not wrap up the argument.'),
];

const LINKING: Array<{ s: string; right: string; wrong: string[]; d: Difficulty }> = [
  { s: 'I think we should get a dog ___ dogs are friendly.', right: 'because', wrong: ['but', 'or', 'although'], d: 1 },
  { s: 'Vegetables are good for you. ___, carrots help your eyes.', right: 'For example', wrong: ['However', 'Instead', 'Finally'], d: 1 },
  { s: 'Our park needs more bins. ___, there would be less litter.', right: 'That way', wrong: ['First', 'Because', 'Although'], d: 2 },
  { s: 'Reading is fun. ___, it helps you learn new words.', right: 'Also', wrong: ['However', 'Because', 'Instead'], d: 2 },
  { s: 'Some people think homework is a waste of time. ___, it helps us practise.', right: 'However', wrong: ['For example', 'Also', 'Because'], d: 2 },
  { s: 'Bikes are cheap to ride, quiet and good exercise. ___, everyone should ride one.', right: 'For these reasons', wrong: ['For example', 'However', 'Meanwhile'], d: 3 },
  { s: 'School should start later, ___ students would be less tired.', right: 'since', wrong: ['but', 'unless', 'although'], d: 3 },
  { s: 'Screens can be harmful. ___ too much screen time can hurt your sleep.', right: 'In particular,', wrong: ['In contrast,', 'However,', 'Meanwhile,'], d: 3 },
];

function linking(rng: Rng, d: Difficulty): GenOutput {
  const x = rng.pick(atLevel(LINKING, d));
  return {
    prompt: `Which linking word or phrase best completes the opinion writing?\n\n> ${x.s.replace('___', GAP)}`,
    parts: [part(mc(rng, x.right, x.wrong))],
    hints: ['Because and since give a reason. For example and in particular give an example. Also adds a point. However shows the other side. For these reasons concludes.'],
    solution: [`“${x.right}” ${{ because: 'gives the reason', since: 'gives the reason', 'For example': 'introduces an example', 'In particular,': 'introduces a specific example', 'That way': 'shows the result', Also: 'adds another point', However: 'turns to the other side', 'For these reasons': 'sums up the reasons before the conclusion' }[x.right] ?? 'links the ideas'}.`],
  };
}

// ---------------------------------------------------------------------------- 6.4 revising and editing

const EDITS: Q[] = [
  Q(1, 'Which word in this sentence is spelled wrongly?', 'freind', ['visited', 'grandmother', 'weekend'],
    'The correct spelling is “friend”: i before e in this word.', 'My freind visited his grandmother last weekend.'),
  Q(1, 'What needs to be fixed in this sentence?', 'The word “i” needs a capital letter.', ['The sentence needs a question mark.', 'The word “park” needs a capital letter.', 'The word “went” is spelled wrongly.'],
    'The word I is always a capital letter.', 'Yesterday i went to the park with my dog.'),
  Q(2, 'Which is the correct way to edit this sentence?', 'The children were playing in the yard.', ['The children was playing in the yard.', 'The childrens were playing in the yard.', 'The children were play in the yard.'],
    '“Children” is plural, so it needs “were”, not “was”.', 'The children was playing in the yard.'),
  Q(2, 'Which is the correct way to edit this sentence?', 'NAME and I went to the beach on Sunday.', ['NAME and me went to the beach on Sunday.', 'Me and NAME went to the beach on sunday.', 'NAME and i went to the beach on Sunday.'],
    'Use “I” as a subject (try it alone: “I went”, not “me went”), and capitalize days of the week.', 'NAME and me went to the beach on sunday.'),
  Q(3, 'Which is the correct way to edit this sentence?', 'Do you know where their house is?', ['Do you know where there house is?', 'Do you know where they’re house is.', 'Do you know were their house is?'],
    '“Their” shows belonging, “where” asks about a place, and a question ends with a question mark.', 'Do you know were there house is.'),
  Q(3, 'Which version fixes every mistake?', 'On Monday, our class visited the museum.', ['On monday, our class visited the museum.', 'On Monday our class visit the museum.', 'on Monday, our class visited the Museum.'],
    'Capitalize the first word and the day, use a comma after the introductory phrase, and use the past tense “visited”. Museum is a common noun here, so it stays lower case.', 'on monday our class visit the Museum'),
];

const COMBINE: Q[] = [
  Q(1, 'Which sentence best combines these two sentences?', 'The cat is black and fluffy.', ['The cat is black, the cat is fluffy.', 'The cat is black the cat is fluffy.', 'Black and fluffy the cat is a cat.'],
    'When two sentences describe the same thing, join the describing words with “and”.', 'The cat is black.\nThe cat is fluffy.'),
  Q(1, 'Which sentence best combines these two sentences?', 'NAME and NAME2 like to swim.', ['NAME likes to swim, NAME2 likes to swim.', 'NAME likes NAME2 and likes to swim.', 'NAME likes to swim NAME2 likes it too.'],
    'When two sentences have different subjects doing the same thing, join the subjects with “and”.', 'NAME likes to swim.\nNAME2 likes to swim.'),
  Q(2, 'Which sentence best combines these two sentences?', 'It was raining, so we stayed inside.', ['It was raining, we stayed inside.', 'It was raining we stayed inside.', 'It was raining so, we stayed inside.'],
    'Use a comma and a joining word such as “so” to combine two complete sentences. A comma alone, or nothing, makes a run-on.', 'It was raining.\nWe stayed inside.'),
  Q(2, 'Which sentence best combines these two sentences?', 'NAME wanted to play, but {he} had homework.', ['NAME wanted to play, {he} had homework.', 'NAME wanted to play but, {he} had homework.', 'NAME wanted to play {he} had homework.'],
    '“But” shows a contrast between the two ideas; put a comma before it.', 'NAME wanted to play.\n{He} had homework.'),
  Q(3, 'Which sentence best combines these three sentences?', 'The small brown puppy chased the ball.', ['The puppy was small, brown and chased.', 'The puppy chased the ball, it was small, brown.', 'The puppy was small and the puppy was brown.'],
    'Move the describing words in front of the noun to make one smooth sentence.', 'The puppy chased the ball.\nThe puppy was small.\nThe puppy was brown.'),
  Q(3, 'Which sentence best combines these two sentences?', 'Because the bus was late, NAME missed the start.', ['The bus was late, NAME missed the start.', 'Because the bus was late NAME, missed the start.', 'The bus was late because NAME missed the start.'],
    '“Because” joins the cause to the effect. When the “because” part comes first, a comma follows it. The last choice gets the cause and effect backwards.', 'The bus was late.\nNAME missed the start of the film.'),
];

export const WRITING_SKILLS: SkillDef[] = [
  skill({ id: 'e5-topic-sentence', name: 'Topic and closing sentences', description: 'Choose a topic sentence or a closing sentence that fits a paragraph.', outcomes: F1, lessonId: 'e5-6-1', format: 'mc', gen: bank(TOPIC, ['A topic sentence states the main idea that all the other sentences support.', 'It must be broad enough to cover every detail, but not so broad that it is about something else.']) }),
  skill({ id: 'e5-paragraph-unity', name: 'Sentences that do not belong', description: 'Find the sentence that does not support the main idea of a paragraph.', outcomes: F1, lessonId: 'e5-6-1', format: 'mc', gen: bank(UNITY, ['Find the main idea first, usually in sentence 1.', 'Check each sentence: does it support that idea?']) }),
  skill({ id: 'e5-time-order', name: 'Time-order words', description: 'Use time-order words to move a story along.', outcomes: F1, lessonId: 'e5-6-2', format: 'mc', gen: timeOrder }),
  skill({ id: 'e5-show-not-tell', name: 'Show, don’t tell', description: 'Show a feeling through actions and details instead of naming it.', outcomes: F1, lessonId: 'e5-6-2', format: 'mc', gen: bank(SHOW, ['“Telling” names the feeling (sad, cold). “Showing” gives details that let the reader work it out (tears, shivering).']) }),
  skill({ id: 'e5-opinion-reasons', name: 'Reasons for an opinion', description: 'Support an opinion with strong reasons and evidence, and end with a conclusion.', outcomes: F1, lessonId: 'e5-6-3', format: 'mc', gen: bank(REASONS, ['A strong reason explains why the opinion is right, in a way that would convince someone else.', 'Ask: does this answer the question “why?”']) }),
  skill({ id: 'e5-linking-words', name: 'Linking words', description: 'Link opinions, reasons and examples with words such as because, for example and however.', outcomes: F1, lessonId: 'e5-6-3', format: 'mc', gen: linking }),
  skill({ id: 'e5-editing', name: 'Editing', description: 'Find and fix mistakes in capitals, punctuation, spelling and grammar.', outcomes: F1, lessonId: 'e5-6-4', format: 'mc', gen: bank(EDITS, ['Check capitals, end marks, spelling and whether the verbs agree with their subjects.', 'Read the sentence slowly, one word at a time.']) }),
  skill({ id: 'e5-combining-sentences', name: 'Combining sentences', description: 'Combine short sentences into one smoother sentence.', outcomes: F1, lessonId: 'e5-6-4', format: 'mc', gen: bank(COMBINE, ['Join repeated subjects or describing words with “and”.', 'Join two complete sentences with a comma and and, but or so, or with because.']) }),
];

