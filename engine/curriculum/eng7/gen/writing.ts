/**
 * Grade 7 English, Unit 7: Writing (E7-G1, E7-G2). The paragraph, the essay, narrative craft, and
 * research and citing sources. The examples are written for Gradileo.
 */
import { skill } from '../../helpers.ts';
import type { SkillDef } from '../../../types.ts';
import { bank, Q } from './common.ts';

const G1 = ['E7-G1'];
const G2 = ['E7-G2'];

// ---------------------------------------------------------------------------- 7.1 the paragraph

const TOPIC = [
  Q(1, 'What is a topic sentence?', 'A sentence stating the main idea of a paragraph', ['The last sentence of a whole essay', 'A sentence that asks the reader a question', 'A sentence that lists every source used'],
    'The topic sentence, usually first, tells the reader what the paragraph is about and what it will show.'),
  Q(1, 'Which is the best topic sentence for a paragraph about the benefits of cycling?', 'Cycling to school has many benefits for students.', ['I have a blue bicycle with ten gears on it.', 'My cousin fell off her bike last summer.', 'Bicycles were invented a long time ago.'],
    'It states the main idea that the rest of the paragraph will support. The others are single details or off topic.'),
  Q(2, 'Which topic sentence fits these supporting details?', 'Bees are vital to growing our food.', ['Bees can sting people who bother them.', 'Honey is sweet and tastes good on toast.', 'Many people are afraid of insects.'],
    'Every detail is about bees helping crops grow, so the topic sentence must make that point.',
    'They carry pollen from flower to flower. Without them, crops such as apples and almonds would produce far less fruit. Farmers even rent hives to pollinate their fields.'),
  Q(2, 'Which topic sentence is too broad for one paragraph?', 'The history of the whole world is interesting.', ['Our school garden needs more volunteers.', 'Recycling paper saves trees and energy.', 'Breakfast helps students focus in class.'],
    'The history of the world could fill many books. A good topic sentence is focused enough for one paragraph.'),
  Q(3, 'Which is the strongest topic sentence for a paragraph in an essay about school uniforms?', 'Uniforms ease the pressure to wear expensive clothes.', ['This paragraph is going to be about school uniforms.', 'Some people like uniforms and some people do not.', 'School uniforms are clothes that students wear.'],
    'It makes one clear, arguable point that a paragraph can support. The others announce, hedge or state the obvious.'),
  Q(3, 'What is the job of a paragraph’s concluding sentence?', 'To wrap up the point and link to the next idea', ['To begin a new and unrelated topic', 'To list all the sources the writer used', 'To repeat the topic sentence word for word'],
    'A concluding sentence sums up the paragraph’s point and often leads into what comes next.'),
];

const UNITY = [
  Q(1, 'What does it mean for a paragraph to have unity?', 'Every sentence supports the main idea.', ['Every sentence starts with the same word.', 'The paragraph is exactly five sentences long.', 'The paragraph contains no punctuation.'],
    'A unified paragraph sticks to one main idea, with no sentences that wander off.'),
  Q(1, 'Which sentence does not belong in a paragraph about how to care for a puppy?', 'Cats can see well in the dark.', ['Feed the puppy small meals several times a day.', 'Take the puppy outside often to learn toilet habits.', 'Give the puppy safe toys to chew on.'],
    'The sentence about cats is off topic, so it breaks the paragraph’s unity.'),
  Q(2, 'Which sentence breaks the unity of this paragraph?', '“My grandmother has a parrot called Rio.”', ['“Many parrots can live for more than fifty years.”', '“Some parrots need hours of attention every day.”', '“Parrots can be noisy, especially in the morning.”'],
    'The paragraph is about why parrots are a big commitment. A sentence about one particular parrot’s name adds nothing to that point.',
    'Parrots are a bigger commitment than most people realize. Many parrots can live for more than fifty years. Some parrots need hours of attention every day. My grandmother has a parrot called Rio. Parrots can be noisy, especially in the morning.'),
  Q(2, 'Which detail best supports the topic sentence “Our town needs a new skate park”?', 'The old park was closed last year as unsafe.', ['Skateboards were first made in the 1950s.', 'My friend has a red and black skateboard.', 'The town also has a library and a pool.'],
    'A closed, unsafe park is a direct reason the town needs a new one.'),
  Q(3, 'A paragraph’s details are all relevant but jump around in no order. What does it lack?', 'Coherence: a clear order and transitions', ['Unity: every sentence supports one main idea', 'A title written above it in capital letters', 'Enough long and difficult words in it'],
    'Unity means staying on topic; coherence means the sentences connect in a logical order. A paragraph needs both.'),
  Q(3, 'Which order best organizes a paragraph explaining how to plant a seed?', 'Time order: first, next, then, finally', ['Order of size: smallest to largest', 'Alphabetical order of the key words', 'Random order, to keep it interesting'],
    'Instructions make most sense in the order you do them.'),
];

// ---------------------------------------------------------------------------- 7.2 the essay

const THESIS = [
  Q(1, 'What is a thesis statement?', 'A sentence or two stating an essay’s main point', ['A question that opens the essay and hooks the reader', 'The list of sources at the very end of the essay', 'The title, written in bold letters at the top'],
    'The thesis, usually at the end of the introduction, tells the reader what the whole essay will argue or explain.'),
  Q(1, 'Which is the best thesis statement?', 'Schools should teach cooking, because it builds health and independence.', ['This essay is going to be all about cooking classes at our school.', 'Cooking is something that many people around the world do every day.', 'Do you like cooking at home, and do you think that it is fun?'],
    'It makes a clear point and previews three reasons. The others announce a topic, state a fact or ask a question.'),
  Q(2, 'Which thesis is arguable, not just a fact?', 'Zoos do more good than harm for endangered animals.', ['Zoos keep animals in enclosures for visitors.', 'The first public zoo opened over 200 years ago.', 'Many zoos have lions, tigers and elephants.'],
    'People could disagree with the first statement, so it can be argued. The others are facts.'),
  Q(2, 'Which thesis is too vague?', 'Technology is good and bad.', ['Video games can improve problem-solving skills.', 'Phones should be banned during lessons.', 'Online learning helps students in remote areas.'],
    '“Good and bad” says almost nothing. A strong thesis takes a clear, specific position.'),
  Q(3, 'Which revision makes this thesis stronger? “Sports are good.”', 'Team sports teach young people cooperation and resilience.', ['Sports are very good and also quite a lot of fun.', 'There are many different kinds of sports in the world.', 'In this essay I am going to talk all about sports.'],
    'The revision narrows the topic (team sports), names who benefits and gives three specific reasons.'),
];

const PARTS = ['Introduction', 'Body paragraph', 'Conclusion'];
const part = (d: 1 | 2 | 3, text: string, k: number, why: string) => Q(d, 'Which part of an essay is this most likely from?', PARTS[k], [...PARTS.filter((_, i) => i !== k), 'Bibliography'], why, text);

const ESSAY = [
  Q(1, 'In what order do the parts of an essay usually come?', 'Introduction, body paragraphs, conclusion', ['Conclusion, introduction, body paragraphs', 'Body paragraphs, conclusion, introduction', 'Introduction, conclusion, body paragraphs'],
    'An essay opens with an introduction, develops its points in body paragraphs and closes with a conclusion.'),
  part(1, 'Have you ever wondered where your rubbish goes? Every year, millions of tonnes end up in landfill. Our town should introduce weekly food-waste collections.', 0,
    'A hook (the question), background and a thesis at the end: an introduction.'),
  part(2, 'Second, food-waste collections save money. When food rots in landfill, the council pays a tax on every tonne. Collecting it separately reduces that bill, as a nearby town found last year.', 1,
    '“Second”, one reason, and evidence for it: a body paragraph.'),
  part(2, 'In short, weekly food-waste collections would cut landfill, save money and produce compost for our parks. It is time for our council to act.', 2,
    'It sums up the reasons and ends with a call to action: a conclusion.'),
  Q(3, 'What should a strong conclusion do?', 'Restate the thesis in new words and end with a final thought', ['Introduce a brand-new argument that was not discussed before', 'Copy the introduction out again, word for word', 'List every fact from the essay in the same order'],
    'A conclusion reminds the reader of the main point and ends with impact, without adding new arguments.'),
  Q(3, 'Each body paragraph in an essay should usually…', 'make one point that supports the thesis, with evidence', ['retell the whole essay from beginning to end', 'introduce a thesis different from the first one', 'contain only questions for the reader to answer'],
    'Each body paragraph develops one reason or point, backed by evidence and explanation.'),
];

// ---------------------------------------------------------------------------- 7.3 narrative craft

const SHOW = [
  Q(1, 'Which sentence shows rather than tells?', 'NAME’s hands trembled as {he} opened the letter.', ['NAME was very nervous about opening the letter.', 'NAME felt very, very nervous about the letter.', 'NAME was a nervous person, and always had been.'],
    'Trembling hands let the reader see the nerves. The others simply state the feeling.'),
  Q(1, 'What does “show, don’t tell” mean?', 'Use actions and details so readers infer feelings', ['Draw pictures instead of writing any words at all', 'Never let any of the characters speak aloud', 'Tell the reader every feeling directly and clearly'],
    'Instead of naming a feeling, show it through what a character does, says and notices.'),
  Q(2, 'Which revision best shows “The room was messy”?', 'Socks hung from the lamp; pizza boxes towered by the bed.', ['The room was extremely messy and very, very untidy.', 'It was quite simply the messiest room I had ever seen.', 'Nobody had cleaned the room for a long time, it seemed.'],
    'Specific images (socks on the lamp, towers of boxes) let the reader picture the mess.'),
  Q(2, 'Which sentence best shows that NAME is happy?', 'NAME burst in, grinning, and spun {his} brother round.', ['NAME was very happy when {he} got home that day.', 'NAME felt a great deal of happiness inside {him}.', 'NAME was in a really good mood after school.'],
    'Bursting in, grinning and spinning someone round show joy in action.'),
  Q(3, 'Which detail best shows that a house has been empty for a long time?', 'A spider had strung its web across the front door.', ['The house was very old and nobody lived in it now.', 'The house looked very empty and lonely from outside.', 'The house had not been visited by anyone in years.'],
    'An unbroken web across the door shows that no one has opened it. The others tell us directly.'),
  Q(3, 'When is it better to tell than to show?', 'To skip quickly over dull time: “Three weeks passed.”', ['At the climax, when the reader most wants detail', 'When describing the main character’s strongest feeling', 'In the opening scene, when setting the mood'],
    'Telling is useful for summary and quick transitions. Showing is best for important moments.'),
];

const PACING = [
  Q(1, 'What is pacing in a story?', 'How fast or slowly the story moves', ['How many pages the whole story has', 'How quickly the reader turns pages', 'How many characters the story has'],
    'Pacing is the speed of the storytelling: some moments race past, others are slowed down.'),
  Q(1, 'Which technique speeds up the pace?', 'Short sentences and quick action', ['Long descriptions of the setting', 'A flashback to childhood', 'Pages of a character’s thoughts'],
    'Short sentences and action make readers move quickly.'),
  Q(2, 'Why might a writer slow down the pace at the climax?', 'To stretch out the tension of the key moment', ['To make the reader stop reading the story', 'To skip past the climax as quickly as possible', 'To add more characters to the scene'],
    'Slowing the climax with detail makes the reader live through every second of it.'),
  Q(2, 'Which sentence summarizes time, speeding up the pace?', 'Over the next month, NAME practised every day.', ['NAME lifted the violin, closed {his} eyes and drew the bow slowly across the strings.', 'The first note wavered, thin and uncertain, in the silent hall.', 'NAME’s fingers pressed down, and the note steadied.'],
    'One sentence covers a whole month. The others describe a single moment in detail, which slows the pace.'),
  Q(3, 'Which plan shows good control of pacing in a story about a rescue at sea?', 'Summarize the boring trip out; slow down the storm and the rescue.', ['Describe the trip out in detail; skip the rescue in one sentence.', 'Give every hour of the trip exactly the same amount of space.', 'Skip the storm entirely and only describe the trip home.'],
    'Spend words where the story matters most (the storm and rescue) and move quickly through the rest.'),
];

// ---------------------------------------------------------------------------- 7.4 research and citing sources

const QUESTION = [
  Q(1, 'Which is the best research question?', 'How do bees find their way back to their hive?', ['Bees and all the other insects in my garden', 'Do you like bees, or are you afraid of them?', 'What colour are the stripes on a honeybee?'],
    'A good research question is focused and needs real investigation. A single word is a topic, and the others are too personal or too simple.'),
  Q(1, 'What is a research question?', 'The question your research sets out to answer', ['A question you ask your friend about lunch', 'The last question in a test', 'A question with no possible answer'],
    'A research question focuses your search for information.'),
  Q(2, 'Which research question is too broad?', 'What is the history of science?', ['How did the printing press change education in Europe?', 'Why are coral reefs in the Pacific losing colour?', 'How do electric cars affect air quality in cities?'],
    'The history of science would take a lifetime. The others are focused enough for a school project.'),
  Q(2, 'Which research question is too narrow?', 'What year was the Eiffel Tower finished?', ['Why was the Eiffel Tower built, and how did Parisians react?', 'How has the Eiffel Tower changed tourism in Paris?', 'What engineering ideas made the Eiffel Tower possible?'],
    'A single fact can be looked up in seconds. A research question should need several sources to answer.'),
  Q(3, 'Which revision improves the research question “Is pollution bad?”', 'How does plastic pollution harm sea turtles in the Pacific?', ['Is pollution really, really bad for everyone everywhere?', 'Pollution: is it a bad thing or a good thing, and why?', 'What is pollution, and where in the world can it be found?'],
    'The revision names a type of pollution, an animal and a place, so it can be researched in depth.'),
];

const SOURCE = 'Honeybees perform a “waggle dance” to tell other bees where flowers are. The angle of the dance shows the direction, and its length shows the distance.';

const CITE = [
  Q(1, 'What is plagiarism?', 'Passing off someone else’s words or ideas as your own', ['Writing an essay entirely in your own words and ideas', 'Listing all of the sources you used at the end', 'Quoting a source and naming its author clearly'],
    'Plagiarism is presenting others’ work as your own. Citing sources avoids it.'),
  Q(1, 'What does it mean to paraphrase?', 'To put someone else’s idea into your own words', ['To copy a passage exactly, word for word', 'To make up a fact that sounds convincing', 'To translate a text into another language'],
    'A paraphrase keeps the idea but changes the words and sentence structure. It still needs a citation.'),
  Q(2, 'Which is the best paraphrase of the source?', 'Bees dance to show where food is: the angle gives direction, the length distance.', ['Honeybees perform a “waggle dance” to tell other bees where flowers are.', 'Bees like to dance when they are happy in the summer.', 'The angle of the dance shows the direction, and its length shows the distance.'],
    'The first keeps the meaning in new words. Two choices copy the source word for word, and one changes the meaning.', SOURCE),
  Q(2, 'Why must you cite a source even when you paraphrase?', 'The idea still belongs to the original author.', ['Paraphrases are always less accurate than quotes.', 'Teachers do not like paraphrases in essays.', 'Citing makes an essay much longer and better.'],
    'Changing the words does not make the idea yours. A citation gives credit and lets readers check.'),
  Q(3, 'When should you use a direct quotation rather than a paraphrase?', 'When the exact words are especially powerful', ['Whenever you cannot be bothered to paraphrase', 'Every time you use any fact from a source', 'Only when the source has no author at all'],
    'Quote when the wording itself matters; otherwise, paraphrase. Either way, cite the source.'),
  Q(3, 'Which detail is usually needed to cite a website?', 'The author, the title, the date and the address', ['Only the colour scheme used on the website', 'The number of pictures shown on the page', 'How long it took you to read the page'],
    'A citation gives enough information for a reader to find the source and judge it.'),
];

// ---------------------------------------------------------------------------- skills

export const WRITING_SKILLS: SkillDef[] = [
  skill({ id: 'e7-topic-sentence', name: 'Topic sentences', description: 'Choose a focused topic sentence that controls a paragraph, and know the job of a concluding sentence.', outcomes: G1, lessonId: 'e7-7-1', format: 'mc', gen: bank(TOPIC, ['A topic sentence states the paragraph’s main idea.', 'It should be focused enough for one paragraph.']) }),
  skill({ id: 'e7-paragraph-unity', name: 'Unified paragraphs', description: 'Keep a paragraph unified and coherent, with relevant, well-ordered details.', outcomes: G1, lessonId: 'e7-7-1', format: 'mc', gen: bank(UNITY, ['Ask: does this sentence support the main idea?', 'Put details in a logical order.']) }),
  skill({ id: 'e7-thesis', name: 'Thesis statements', description: 'Write a clear, specific and arguable thesis statement.', outcomes: G1, lessonId: 'e7-7-2', format: 'mc', gen: bank(THESIS, ['A thesis states the essay’s main point.', 'It should be specific and something people could disagree with.']) }),
  skill({ id: 'e7-essay-parts', name: 'Parts of an essay', description: 'Know what belongs in an essay’s introduction, body paragraphs and conclusion.', outcomes: G1, lessonId: 'e7-7-2', format: 'mc', gen: bank(ESSAY, ['Introduction: hook, background, thesis.', 'Body: one point and its evidence. Conclusion: sum up and end strongly.']) }),
  skill({ id: 'e7-show-tell', name: 'Show, don’t tell', description: 'Show feelings and settings through actions and specific details.', outcomes: G2, lessonId: 'e7-7-3', format: 'mc', gen: bank(SHOW, ['Ask: could the reader see or hear this?', 'Replace named feelings with actions.']) }),
  skill({ id: 'e7-pacing', name: 'Pacing', description: 'Control the pace of a story by summarizing some moments and slowing others.', outcomes: G2, lessonId: 'e7-7-3', format: 'mc', gen: bank(PACING, ['Short sentences speed up; detail slows down.', 'Slow down for the moments that matter most.']) }),
  skill({ id: 'e7-research-question', name: 'Research questions', description: 'Write a research question that is neither too broad nor too narrow.', outcomes: G2, lessonId: 'e7-7-4', format: 'mc', gen: bank(QUESTION, ['A good research question needs several sources to answer.', 'Name a specific subject, place or group.']) }),
  skill({ id: 'e7-paraphrase-cite', name: 'Paraphrasing and citing', description: 'Paraphrase and quote sources, cite them, and avoid plagiarism.', outcomes: G2, lessonId: 'e7-7-4', format: 'mc', gen: bank(CITE, ['A paraphrase uses your own words and structure.', 'Always cite the source of an idea, quoted or paraphrased.']) }),
];
