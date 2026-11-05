/**
 * Grade 6 English, Unit 3: Non-fiction (E6-C1). Summarizing, text structure, claims and evidence,
 * and the author’s purpose and point of view. The passages are written for Gradileo; their facts
 * are general knowledge.
 */
import { skill } from '../../helpers.ts';
import type { SkillDef } from '../../../types.ts';
import { bank, Q } from './common.ts';

const C1 = ['E6-C1'];

const MONARCH = 'Every autumn, millions of monarch butterflies leave Canada and the northern United States and fly south to the mountains of central Mexico, a journey of more than 3,000 kilometres. No single butterfly makes the round trip. The monarchs that fly south in autumn spend the winter in the forests, and in spring they start north again, laying eggs on milkweed plants along the way. It takes three or four generations of butterflies to complete the journey back.';
const LIBRARY = 'The town library has changed a great deal in the last twenty years. It still lends books, but it now also lends laptops, tools and even fishing rods. On weekdays it runs homework clubs, and on weekends it hosts coding classes and family film nights. The building has a new wing with quiet study rooms and a “maker space” full of 3D printers.';
const PLASTIC = 'Plastic bags cause serious harm to sea life. Turtles often mistake floating bags for jellyfish and swallow them, which can block their stomachs. Seabirds become tangled in bags and cannot fly or feed. Some scientists estimate that millions of tonnes of plastic enter the oceans every year. Many towns have now banned single-use plastic bags, and shoppers bring their own cloth bags instead.';
const SLEEP = 'Many sleep scientists recommend that children aged 6 to 12 get 9 to 12 hours of sleep a night. Sleep helps the brain store memories and the body repair itself. Yet surveys suggest many children get less than this, often because they use screens late in the evening. The light from screens can make it harder to fall asleep.';

// ---------------------------------------------------------------------------- 3.1 summarizing

const SUMMARY = [
  Q(1, 'Which is the best summary of this passage?', 'Monarchs migrate thousands of kilometres over several generations.', ['Monarch butterflies lay their eggs on milkweed plants in the spring.', 'Mexico has high mountains with large forests in the middle of it.', 'Butterflies are beautiful insects with bright orange and black wings.'],
    'A summary gives the main idea and the most important points in a few words. The other choices give one small detail, or something the passage does not say.', MONARCH),
  Q(1, 'Which is the best summary of this passage?', 'The library now offers much more than books.', ['The library lends out fishing rods on weekdays.', 'The library has a new wing with 3D printers.', 'The library was first built twenty years ago.'],
    'The passage is about how the library has changed: it offers many new things. The fishing rods and the 3D printers are examples; the last choice is not stated.', LIBRARY),
  Q(2, 'Which summary is most accurate?', 'Plastic bags harm sea animals, so many towns now ban them.', ['Turtles eat jellyfish, and seabirds cannot fly when tired.', 'Scientists have counted every bag that enters the ocean.', 'Cloth bags are more colourful than plastic shopping bags.'],
    'The best summary covers the whole passage: the harm to sea life and the response (bans). The other choices misstate or miss the main point.', PLASTIC),
  Q(2, 'What should a good summary leave out?', 'Your own opinions and minor details', ['The main idea of the whole text', 'The most important key points', 'The topic the text is about'],
    'A summary is short and objective: it keeps the main idea and key points in your own words and leaves out small details and your opinions.'),
  Q(3, 'A student wrote this summary: “Monarchs are the most amazing insects in the world, and everyone should plant milkweed.” What is wrong with it?', 'It gives opinions instead of the passage’s points.', ['It is far too long and detailed to count as a summary.', 'It copies the whole passage out word for word.', 'It includes every small detail from the passage.'],
    'A summary should report what the passage says, not the writer’s own opinion. The passage never says monarchs are “the most amazing” or tells readers what to plant.', MONARCH),
  Q(3, 'Which summary of the passage is objective and complete?', 'Children need 9 to 12 hours of sleep, but late screens mean many get less.', ['Children should never be allowed to use any screens at all after school ends.', 'Sleep helps the brain store memories, which is very important for children.', 'Screens give off bright light, and some children like to use them at night.'],
    'This summary includes the recommendation and the main problem without adding opinion. The first adds an opinion; the others give only one detail.', SLEEP),
];

const KEY = [
  Q(1, 'Which is a key idea of the passage rather than a minor detail?', 'No single monarch makes the whole round trip.', ['The journey can be over 3,000 kilometres.', 'Monarchs spend the winter in forests.', 'Monarchs lay eggs on milkweed.'],
    'The fact that it takes several generations is the surprising key idea the passage builds to. The others are supporting details.', MONARCH),
  Q(2, 'Which detail is least important to the main idea of the passage?', 'The new wing has quiet study rooms.', ['The library now lends laptops and tools.', 'The library runs clubs and classes.', 'The library has changed in many ways.'],
    'The main idea is that the library offers much more than it used to. Quiet rooms are a small detail; the others are key points.', LIBRARY),
  Q(2, 'Which sentence is the key idea of the passage?', 'Plastic bags cause serious harm to sea life.', ['Seabirds become tangled in bags and cannot fly.', 'Shoppers now bring their own cloth bags instead.', 'Turtles often mistake floating bags for jellyfish.'],
    'The first sentence states the key idea; the others are details that support it.', PLASTIC),
  Q(3, 'Which two ideas would be most important to include in a summary of the passage?', 'How much sleep is recommended, and why many children get less', ['What sleep does for the body, and what screens are made of', 'How old the children are, and what surveys are', 'Which scientists did the study, and when they did it'],
    'The passage’s key points are the recommended amount and the gap caused by screens. The other choices include details the passage does not give or that are minor.', SLEEP),
  Q(3, 'How can you check whether an idea is a key idea?', 'Ask whether the passage would lose its point without it.', ['Check whether it is the longest sentence in the text.', 'See whether it contains a number or a date in it.', 'Look for the idea that you personally find interesting.'],
    'A key idea is one the text needs to make its point. Length, numbers and personal interest do not decide it.'),
];

// ---------------------------------------------------------------------------- 3.2 text structure

const STRUCTS = ['Description', 'Sequence', 'Compare and contrast', 'Cause and effect', 'Problem and solution'];
const struct = (d: 1 | 2 | 3, text: string, k: number, why: string) =>
  Q(d, 'What is the main structure of this passage?', STRUCTS[k], STRUCTS.filter((_, i) => i !== k).slice(0, 3), why, text);

const STRUCTURE = [
  struct(1, 'The giant panda has black-and-white fur, round ears and black patches around its eyes. It is about the size of an American black bear and spends most of its day eating bamboo.', 0,
    'The passage tells what pandas are like: their fur, size and habits. Listing features of one subject is description.'),
  struct(1, 'To make a paper aeroplane, first fold a sheet in half lengthwise. Next, fold the top corners to the middle. Then fold the edges down to make wings. Finally, launch it gently.', 1,
    'First, next, then and finally show steps in order: sequence.'),
  struct(2, 'Because the river flooded in spring, the fields were covered with water for weeks. As a result, the farmers planted their crops late, and the harvest was small.', 3,
    'Because and as a result show that one event caused others.'),
  struct(2, 'The school car park was jammed every morning. To fix this, the school started a “walking bus”: parents take turns walking groups of children to school. Now there are far fewer cars.', 4,
    'The passage names a problem (traffic) and a solution (the walking bus).'),
  struct(2, 'Alligators and crocodiles are both large reptiles. However, alligators have wide, rounded snouts, while crocodiles have long, pointed ones. Crocodiles also live in salt water more often.', 2,
    'Both shows similarities; however and while show differences.'),
  struct(3, 'Monarchs leave Canada in autumn. They spend the winter in the forests of Mexico. In spring they start north again, and over three or four generations they reach Canada once more.', 1,
    'The passage follows the migration in time order, season by season. Words such as in autumn and in spring signal sequence.'),
  struct(3, 'Turtles mistake floating bags for jellyfish and swallow them. The plastic can block their stomachs, so they cannot eat and may starve.', 3,
    'The passage explains what happens because turtles swallow bags. One event leads to the next, which is cause and effect.'),
];

const ORGANIZER = [
  Q(1, 'Which graphic organizer best fits a text that compares two animals?', 'A Venn diagram', ['A timeline', 'A flow chart', 'A web'],
    'A Venn diagram has two overlapping circles: differences on the outside, similarities in the middle.'),
  Q(1, 'Which graphic organizer best fits a text that tells events in order?', 'A timeline', ['A Venn diagram', 'A T-chart', 'A web'],
    'A timeline shows events in time order.'),
  Q(2, 'Which graphic organizer best fits a cause-and-effect text?', 'Boxes joined by arrows from causes to effects', ['Two overlapping circles for likenesses and differences', 'A circle with the topic in it and details around it', 'A list of dates in order along a straight line'],
    'Arrows from each cause to its effect show how one thing leads to another.'),
  Q(2, 'A text describes the habits, diet and home of the giant panda. Which organizer fits best?', 'A web with “Giant panda” in the centre', ['A Venn diagram of pandas and bears', 'A timeline of a panda’s day', 'A flow chart of cause and effect'],
    'A description text tells many things about one subject, so a web with the subject in the middle and details around it fits best.'),
  Q(3, 'A text explains why the farmers’ harvest was small after a flood. Which organizer would best show its structure?', 'A chain: flood → late planting → small harvest', ['A Venn diagram comparing the flood and the harvest', 'A web with “Farms” in the centre and details around', 'A T-chart listing wet fields and dry fields'],
    'The text is a chain of causes and effects, so a chain of arrows shows it best.'),
  Q(3, 'Which organizer best fits a problem-and-solution text?', 'A chart with boxes for the problem, solutions and result', ['A timeline showing the dates of each event in order', 'A Venn diagram comparing two possible problems', 'A web of describing words around a single topic'],
    'A problem-and-solution chart has a box for the problem, boxes for possible solutions, and a box for the result.'),
];

// ---------------------------------------------------------------------------- 3.3 claims and evidence

const CLAIM = [
  Q(1, 'What is the author’s claim?', 'Our school should have a longer lunch break.', ['Lunch at our school starts at twelve noon.', 'Many students eat sandwiches for lunch.', 'The school canteen sells fresh fruit daily.'],
    'A claim is the main point an author argues for, something people could disagree with. The others are facts.',
    'Our school should have a longer lunch break. Twenty minutes is not enough time to eat and get some exercise. Students who play at lunch come back more focused.'),
  Q(1, 'Which of these is a claim?', 'Every town should ban plastic bags.', ['Plastic is made from oil and gas.', 'Some towns have banned plastic bags.', 'Many turtles live in the ocean.'],
    'A claim is a position that can be argued for or against. The others are facts that can be checked.'),
  Q(2, 'What is the author’s claim?', 'Children should put screens away an hour before bed.', ['Many children get less than nine hours of sleep.', 'Screens give off a kind of bright light.', 'Sleep helps the brain store memories.'],
    'The author argues that screens should go away before bed. The other sentences are evidence given to support that claim.',
    'Children should put screens away an hour before bed. Surveys show many children sleep less than nine hours, and the light from screens can make it harder to fall asleep. Sleep helps the brain store memories, so it matters for learning.'),
  Q(2, 'Which sentence is a reason that supports the claim “Students should learn to cook at school”?', 'Cooking teaches skills students will use all their lives.', ['Some students already enjoy cooking at home with family.', 'The school kitchen was built more than ten years ago.', 'Pasta is a very popular food in many different countries.'],
    'A reason explains why the claim is right. A life-long skill is a reason to teach cooking; the others do not support the claim.'),
  Q(3, 'Which claim is the most arguable (something reasonable people might disagree about)?', 'Homework should be banned in primary schools.', ['Most schools set some homework for pupils.', 'Homework is work that is done at home.', 'Some pupils do their homework after dinner.'],
    'A good claim takes a position that could be argued either way. The others are definitions or facts.'),
];

const EVIDENCE = [
  Q(1, 'Which is the strongest evidence for the claim “Exercise helps students concentrate”?', 'A study found pupils focused better after a short run.', ['My best friend says she likes running at break time.', 'Running shoes come in many bright and different colours.', 'Our school has a large playing field just outside.'],
    'A study is reliable, relevant evidence. A friend’s liking, shoe colours and the field do not show that exercise helps concentration.'),
  Q(1, 'Which kind of evidence is a number from a survey?', 'A statistic', ['An anecdote', 'An opinion', 'A slogan'],
    'A statistic is a fact given as a number, such as “7 in 10 pupils”. An anecdote is a short personal story.'),
  Q(2, 'Which piece of evidence is NOT relevant to the claim “The library should stay open on Sundays”?', 'The library was painted blue last summer.', ['Many families are busy on weekdays.', 'A survey found 300 people want Sunday hours.', 'Sunday film nights drew large crowds.'],
    'Relevant evidence connects to the claim. The colour of the paint says nothing about opening hours.'),
  Q(2, 'Why is an expert’s statement often strong evidence?', 'The expert has special knowledge of the subject.', ['The expert is always famous and well liked.', 'The expert agrees with whatever the author says.', 'The expert uses longer words than others do.'],
    'An expert has studied or worked in the field, so their statement is more reliable. Fame does not make someone an expert.'),
  Q(3, 'Claim: “Plastic bags harm sea life.” Which evidence is strongest?', 'Scientists found plastic inside many dead turtles.', ['A woman saw a plastic bag floating in the sea last summer.', 'Plastic bags are very thin and blow away quite easily.', 'Many people think that plastic bags look very ugly.'],
    'Findings by scientists about harm to turtles directly support the claim. One sighting is an anecdote; the others do not show harm.'),
  Q(3, 'An author claims “Our town needs a skate park” and supports it only with “Everyone I know loves skating.” What is the problem with this evidence?', 'It is based on a few people and cannot be checked.', ['It uses a statistic that is far too large to believe.', 'It comes from an expert who has studied skate parks.', 'It is about a different topic from the claim.'],
    'Saying “everyone I know” is an anecdote from a small group. It is not reliable evidence about the whole town’s needs.'),
];

// ---------------------------------------------------------------------------- 3.4 purpose and point of view

const PURPOSES = ['To inform', 'To persuade', 'To entertain', 'To give instructions'];
const purpose = (d: 1 | 2 | 3, text: string, k: number, why: string) =>
  Q(d, 'What is the author’s main purpose?', PURPOSES[k], PURPOSES.filter((_, i) => i !== k), why, text);

const PURPOSE = [
  purpose(1, 'Join the Green Team today! Together we can make our school the cleanest in the city. Sign up at the office.', 1,
    'Join today, together we can and sign up urge the reader to act: the purpose is to persuade.'),
  purpose(1, 'Step 1: Cut the paper into a square. Step 2: Fold it in half to make a triangle. Step 3: Fold the corners up to make the cat’s ears.', 3,
    'Numbered steps teach the reader how to make something: instructions explain how to do something.'),
  purpose(2, 'The blue whale is the largest animal that has ever lived. It can grow to about 30 metres long and eats mostly tiny shrimp-like animals called krill.', 0,
    'The passage gives facts without trying to change the reader’s mind: its purpose is to inform.'),
  purpose(2, 'When Grandpa tried to fix the washing machine, it swallowed his sock, spat out a cloud of bubbles, and played a tune that sounded suspiciously like a pirate song.', 2,
    'A funny, made-up scene meant to amuse the reader: the purpose is to entertain.'),
  purpose(3, 'Monarch butterflies leave Canada every autumn and fly more than 3,000 kilometres to Mexico. It takes three or four generations to complete the journey back north.', 0,
    'The passage reports facts about the migration. Even though it is interesting, its purpose is to inform.'),
  purpose(3, 'Every plastic bag you refuse is one less bag in the sea. Bring a cloth bag. The turtles are counting on you.', 1,
    'The writer speaks directly to the reader (you) and pulls at their feelings (“the turtles are counting on you”) to change what they do.'),
];

const VIEW = [
  Q(1, 'How does the author feel about the new park?', 'Delighted with it', ['Angry about it', 'Bored by it', 'Unsure about it'],
    'Words such as wonderful, beautiful and best show the author is delighted.',
    'The wonderful new park has beautiful gardens, a splash pad and the best playground in town.'),
  Q(2, 'Which word in the passage best shows the author’s point of view?', 'wasteful', ['bags', 'shops', 'year'],
    'Wasteful is a judgement; it shows the author disapproves. The other words are neutral.',
    'Each year, shops hand out billions of wasteful plastic bags.'),
  Q(2, 'Which sentence shows the author is against the new rule?', '“This unfair rule punishes children who want to play.”', ['“The new rule starts on the first day of June this year.”', '“The council voted on the new rule on Monday evening.”', '“The rule applies to the whole park after 6 p.m. each day.”'],
    'Unfair and punishes show a negative opinion. The other sentences only give facts about the rule.'),
  Q(3, 'Two articles describe the same event. Which shows a point of view in favour of the new shopping centre?', '“The exciting new centre brings 200 jobs to our town.”', ['“The noisy new centre has replaced our only green field.”', '“A new shopping centre opened on Main Street on Friday.”', '“The new centre will be open from 9 a.m. to 9 p.m.”'],
    'Exciting and the focus on jobs show approval. The second shows disapproval, and the others are neutral facts.'),
  Q(3, 'Why should a reader notice an author’s point of view?', 'It can affect which facts are included or left out.', ['It tells the reader exactly when the text was written.', 'It shows that everything in the text must be false.', 'It means the author does not use any facts at all.'],
    'An author with a strong view may choose only the facts that support it. Noticing this helps readers judge the text fairly.'),
];

// ---------------------------------------------------------------------------- skills

export const NONFICTION_SKILLS: SkillDef[] = [
  skill({ id: 'e6-summary', name: 'Summarizing', description: 'Choose an accurate, objective summary of an informational passage.', outcomes: C1, lessonId: 'e6-3-1', format: 'mc', gen: bank(SUMMARY, ['A summary gives the main idea and key points, briefly, in your own words.', 'Leave out opinions and small details.']) }),
  skill({ id: 'e6-key-ideas', name: 'Key ideas and minor details', description: 'Tell the key ideas of a passage from its minor details.', outcomes: C1, lessonId: 'e6-3-1', format: 'mc', gen: bank(KEY, ['Ask: would the passage lose its point without this idea?']) }),
  skill({ id: 'e6-text-structure', name: 'Text structure', description: 'Identify description, sequence, compare and contrast, cause and effect, and problem and solution.', outcomes: C1, lessonId: 'e6-3-2', format: 'mc', gen: bank(STRUCTURE, ['Look for signal words: first, then; because, as a result; both, however; to solve this.', 'A text that tells what something is like is description.']) }),
  skill({ id: 'e6-graphic-organizer', name: 'Graphic organizers', description: 'Choose a graphic organizer that fits a text’s structure.', outcomes: C1, lessonId: 'e6-3-2', format: 'mc', gen: bank(ORGANIZER, ['Match the organizer to the structure: Venn for comparing, timeline for sequence.']) }),
  skill({ id: 'e6-claim', name: 'Claims', description: 'Find an author’s claim and the reasons that support it.', outcomes: C1, lessonId: 'e6-3-3', format: 'mc', gen: bank(CLAIM, ['A claim is a point someone could argue against.', 'Facts and reasons support the claim.']) }),
  skill({ id: 'e6-evidence', name: 'Judging evidence', description: 'Judge whether evidence is relevant and strong.', outcomes: C1, lessonId: 'e6-3-3', format: 'mc', gen: bank(EVIDENCE, ['Strong evidence is relevant, reliable and can be checked.', 'An anecdote about a few people is weak evidence.']) }),
  skill({ id: 'e6-author-purpose', name: 'Author’s purpose', description: 'Identify whether an author writes to inform, persuade, entertain or give instructions.', outcomes: C1, lessonId: 'e6-3-4', format: 'mc', gen: bank(PURPOSE, ['Ask: what does the author want the reader to know, do or feel?']) }),
  skill({ id: 'e6-author-view', name: 'Author’s point of view', description: 'Infer an author’s point of view from their word choice.', outcomes: C1, lessonId: 'e6-3-4', format: 'mc', gen: bank(VIEW, ['Look for words that judge: wonderful, unfair, wasteful.', 'Neutral words only report.']) }),
];
