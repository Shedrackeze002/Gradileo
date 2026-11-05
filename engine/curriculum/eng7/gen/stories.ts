/**
 * Grade 7 English, Unit 1: Short Stories (E7-A1, E7-A2). Conflict and suspense, characterization,
 * setting and mood, foreshadowing and flashback, and theme and symbol. The passages are written for
 * Gradileo.
 */
import { skill } from '../../helpers.ts';
import type { SkillDef } from '../../../types.ts';
import { bank, Q } from './common.ts';

const A1 = ['E7-A1'];
const A2 = ['E7-A2'];

// ---------------------------------------------------------------------------- 1.1 conflict and suspense

const CONFLICT = [
  Q(1, 'Is the conflict in this passage internal or external?', 'Internal: the struggle is inside NAME’s mind.', ['External: NAME struggles against another person.', 'External: NAME struggles against the weather.', 'There is no conflict in this passage at all.'],
    'NAME is torn between two choices, and nobody else is fighting {him}. A struggle inside a character’s mind is internal.',
    'NAME held the two letters, one from the city art school and one from the team. {He} could not do both. Every time {he} picked one, {he} heard {his} own voice say, “But what about the other?”'),
  Q(1, 'Is the conflict in this passage internal or external?', 'External: NAME struggles against nature.', ['Internal: NAME struggles with {his} own fears.', 'External: NAME struggles against a rival.', 'Internal: NAME cannot make up {his} mind.'],
    'The danger comes from outside NAME: the river is rising. A struggle with nature is an external conflict.',
    'The river had burst its banks in the night. By morning the water was at the door, and NAME waded through it, carrying {his} little sister on {his} back towards the hill.'),
  Q(1, 'Which of these is an internal conflict?', 'A boy is torn between loyalty and honesty.', ['A girl races a rival to the finish line.', 'A family is trapped by a sudden blizzard.', 'Two neighbours argue about a broken fence.'],
    'Loyalty against honesty is a struggle within the boy himself, so it is internal. The others are struggles with someone or something outside.'),
  Q(2, 'How does the external conflict in this passage create an internal one?', 'The threat makes NAME unsure whether to tell.', ['The bully and NAME become close friends by the end.', 'NAME forgets all about the bully by the next day.', 'The teacher sees the bully and solves the problem.'],
    'The external conflict is the bully’s threat. It leads to a struggle inside NAME: should {he} speak up or stay silent?',
    '“Tell anyone and you’ll be sorry,” NAME2 hissed. All through maths, NAME stared at {his} book. If {he} told the teacher, it might stop. Or it might get much worse.'),
  Q(2, 'Which kind of conflict drives this passage?', 'Character against society', ['Character against nature', 'Character against self', 'Character against technology'],
    'NAME is pushing back against a rule of the whole town, which is a conflict with society.',
    'The town council had voted: the old library would be knocked down to build a car park. NAME stood on the steps with a sign and a list of two hundred names.'),
  Q(2, 'Which kind of conflict drives this passage?', 'Character against technology', ['Character against character', 'Character against nature', 'Character against society'],
    'NAME is battling a machine that will not obey, so the conflict is with technology.',
    'The robot vacuum spun in a circle and blocked the door again. NAME pressed the off button. Nothing. “Cleaning mode,” the machine announced, and rolled over {his} foot.'),
  Q(3, 'Why might a writer give a character both an internal and an external conflict?', 'The inner struggle makes readers care about the outer events.', ['So the story can be finished in fewer words than usual.', 'Because every story must have exactly two conflicts in it.', 'So that the reader does not need to think about the character.'],
    'An inner struggle makes the outer events matter more: we care about the climb because we know the character is afraid.'),
  Q(3, 'In this passage, which conflict is the main one?', 'NAME’s struggle with {his} own fear of failing', ['NAME’s argument with the coach about the team', 'NAME’s battle against the heat on the track', 'NAME’s rivalry with the runner in lane four'],
    'The heat and the rival are there, but the passage spends its time inside NAME’s head, on {his} fear of letting everyone down.',
    'The sun beat down on the track. In lane four, NAME2 was stretching and smiling. But NAME hardly noticed. Last year {he} had fallen at the final hurdle. What if it happened again? What if everyone laughed?'),
  Q(3, 'Which change would turn this external conflict into an internal one?', 'NAME fears heights and must decide whether to climb.', ['NAME climbs a different and much higher mountain instead.', 'A storm arrives while NAME is climbing the mountain.', 'A rival climber races NAME to the top of the mountain.'],
    'Making the climb a choice NAME struggles with puts the conflict inside {him}. The other changes only add new outside dangers.'),
];

const TECHS = ['A cliffhanger', 'Short, quick sentences', 'An unanswered question', 'A ticking clock'];
const tech = (d: 1 | 2 | 3, text: string, k: number, why: string) => Q(d, 'Which technique builds the most suspense in this passage?', TECHS[k], TECHS.filter((_, i) => i !== k), why, text);

const SUSPENSE = [
  Q(1, 'What is suspense?', 'The worry a reader feels about what will happen next', ['The part of a story where all the problems are solved', 'A list of the characters at the start of a story', 'The place and time in which a story is set'],
    'Suspense is the tension of waiting to find out what happens. It keeps a reader turning pages.'),
  tech(1, 'The door creaked open. NAME froze. Footsteps. Closer. Closer.', 1,
    'Very short sentences and fragments speed up the reading, like a racing heartbeat.'),
  tech(1, 'NAME reached for the handle, and from inside the cupboard something reached back.', 0,
    'The passage stops at a frightening moment without saying what happens next. That is a cliffhanger.'),
  tech(2, 'The bomb squad had four minutes. NAME’s hands were shaking as {he} unscrewed the panel. Three minutes.', 3,
    'A deadline counting down (four minutes, three minutes) makes every second feel dangerous.'),
  tech(2, 'Nobody in the village would say why the lighthouse had been empty for twenty years, or why the old keeper had left in the middle of the night.', 2,
    'The passage raises a mystery and holds back the answer, so the reader keeps reading to find out.'),
  Q(2, 'Which sentence builds the most suspense?', 'Somewhere in the dark house, a stair creaked.', ['The house was big and had a lot of stairs.', 'NAME went up the stairs and went to bed.', 'The stairs in the house were made of oak.'],
    'A sound in the dark, with no one to explain it, makes the reader wonder who or what is there.'),
  tech(3, 'The last train left at midnight. If NAME missed it, {he} would be stuck in the empty station until morning. {He} ran. Eleven fifty-eight.', 3,
    'The fixed deadline and the time check (eleven fifty-eight) create a race against the clock.'),
  Q(3, 'How does the writer build suspense in this passage?', 'By slowing down a single moment with small details', ['By explaining exactly what will happen next', 'By skipping quickly over many days of the trip', 'By describing a cheerful and peaceful scene'],
    'One moment, opening a letter, is stretched out with tiny details. Slowing time like this makes the reader wait and worry.',
    'NAME turned the envelope over. {He} slid a finger under the flap. The paper tore slowly, with a soft rasp. {He} drew out the single folded sheet, and for a long moment {he} could not open it.'),
  Q(3, 'Why do writers often end a chapter with a cliffhanger?', 'To make the reader keep reading to find out what happens', ['To show that the story has come to its final ending', 'To remind the reader of what happened in the first chapter', 'To let the reader rest before the next chapter begins'],
    'Leaving a character in danger or a question unanswered pulls the reader into the next chapter.'),
];

// ---------------------------------------------------------------------------- 1.2 characterization

const DIRECT = 'Direct characterization';
const INDIRECT = 'Indirect characterization';
const dirind = (d: 1 | 2 | 3, text: string, isDirect: boolean, why: string) =>
  Q(d, 'Is this direct or indirect characterization?', isDirect ? DIRECT : INDIRECT, [isDirect ? INDIRECT : DIRECT, 'It is not characterization at all', 'It is the setting of the story'], why, text);

const CHARACTERIZATION = [
  dirind(1, 'NAME was the most generous person in the village.', true,
    'The writer tells us the trait (generous) straight out. That is direct characterization.'),
  dirind(1, 'NAME gave {his} only coat to the shivering stranger and walked home in the snow.', false,
    'The writer never says “generous”. We work it out from what NAME does, which is indirect characterization.'),
  dirind(2, '“Hurry up! I haven’t got all day,” NAME snapped, tapping {his} foot.', false,
    'We infer that NAME is impatient from {his} words and actions. Nothing tells us the trait directly.'),
  dirind(2, 'NAME2 was clever but lazy, and {he2} rarely finished anything {he2} started.', true,
    'The narrator names the traits (clever, lazy) directly.'),
  dirind(3, 'When the new student walked in, the whole class went quiet, and two of them quickly moved their bags off the empty chair beside them.', false,
    'The way others react to the new student (their effect on others) hints at what the student is like. That is indirect.'),
  Q(3, 'Why might a writer prefer indirect characterization?', 'It lets readers work out a character for themselves, which feels more real.', ['It is quicker, because the writer can just name each trait.', 'It stops the reader from having to think about the character.', 'It is the only kind of characterization a novel is allowed to use.'],
    'Showing a character through actions and speech lets readers discover them, as we do with real people. Direct statements are quicker but flatter.'),
  Q(1, 'Which of these is a way of showing a character indirectly?', 'What the character says and does', ['The title of the story', 'The number of pages in the book', 'The name of the author'],
    'Indirect characterization shows a character through speech, thoughts, effect on others, actions and looks.'),
  Q(2, 'Which sentence uses direct characterization?', 'Mr. Okafor was a strict but fair teacher.', ['Mr. Okafor marked every test the same night.', 'Mr. Okafor smiled as the class filed in.', 'Mr. Okafor’s desk was always perfectly tidy.'],
    'Only the first sentence names the traits (strict, fair) outright. The others let us infer them.'),
];

const TRAITS = [
  Q(1, 'Which word best describes NAME?', 'Brave', ['Lazy', 'Rude', 'Shy'],
    'NAME runs towards danger to help someone, which shows bravery.',
    'When the dog fell through the ice, everyone screamed. NAME dropped {his} bag, lay flat on the ice and crawled out until {he} could grab its collar.'),
  Q(1, 'Which word best describes NAME?', 'Careless', ['Careful', 'Patient', 'Honest'],
    'Leaving the door open, losing {his} keys and spilling paint all point to carelessness.',
    'NAME left the front door wide open again, dropped {his} keys somewhere in the park and knocked a whole tin of paint across the floor without noticing.'),
  Q(1, 'Which word best describes NAME?', 'Jealous', ['Grateful', 'Cheerful', 'Generous'],
    'NAME glares at {his} friend’s prize and mutters that it is not fair. These are signs of jealousy.',
    'When NAME2 held up the first-place ribbon, NAME clapped once and looked away. “It’s not fair,” {he} muttered. “I worked twice as hard.”'),
  Q(2, 'What do NAME’s thoughts reveal about {him}?', '{He} is more nervous than {he} looks.', ['{He} is bored and wants to go home.', '{He} is angry at {his} best friend.', '{He} is sure that {he} will win.'],
    'Outside, NAME smiles. Inside, {his} thoughts are full of worry. Thoughts can reveal what a character hides.',
    'NAME smiled and waved at the crowd. Don’t trip, {he} told {him}self. Don’t forget the words. Please, please don’t forget the words.'),
  Q(2, 'What does the way others react suggest about NAME2?', '{He2} is respected and trusted.', ['{He2} is feared and disliked.', '{He2} is new and unknown.', '{He2} is silly and careless.'],
    'Everyone stops arguing and listens when NAME2 speaks. Others’ reactions show that NAME2 is respected.',
    'The meeting had turned into a shouting match. Then NAME2 stood up, and the room fell silent. Even the loudest voices waited to hear what {he2} would say.'),
  Q(2, 'Which detail best shows that NAME is thoughtful?', '{He} remembers {his} friend’s allergy and brings another snack.', ['{He} eats {his} lunch quickly so {he} can get outside to play.', '{He} wears a bright red jacket to school every single day.', '{He} is the tallest student in the whole of {his} class.'],
    'Remembering a friend’s allergy and planning around it shows care for others. The other details say nothing about thoughtfulness.'),
  Q(3, 'Which pair of words best describes NAME in this passage?', 'Proud but kind', ['Lazy and selfish', 'Shy and fearful', 'Cruel but clever'],
    'NAME refuses help (pride) but quietly helps someone else (kindness). Characters often have more than one trait, sometimes in tension.',
    '“I don’t need anyone’s help,” NAME said, lifting the heavy box alone. On the way out, {he} saw an old man struggling with his shopping, and without a word {he} carried it to his car.'),
  Q(3, 'What does NAME’s speech reveal about {him}?', '{He} hides {his} hurt behind jokes.', ['{He} is truly happy to be left out.', '{He} does not understand the plan.', '{He} wants to start an argument.'],
    'NAME laughs off being left out, but {his} voice cracks. The joke covers real hurt.',
    '“Oh, you’re all going to the beach without me? Great. More ice cream for me, then,” NAME laughed. But {his} voice cracked on the last word.'),
  Q(3, 'Which detail about NAME’s appearance hints at {his} situation?', 'The patched elbows of {his} carefully ironed coat', ['The colour of {his} eyes in the bright light', 'The number of buttons on the front of {his} coat', 'The sound of {his} footsteps on the stairs'],
    'Patches suggest NAME has little money; careful ironing suggests {he} takes pride in {his} appearance anyway. Looks can reveal a character’s life.',
    'NAME’s coat was old, the elbows patched twice over, but it was ironed so carefully that the creases stood up like blades.'),
];

// ---------------------------------------------------------------------------- 1.3 setting and mood

const SETTING = [
  Q(1, 'What is the setting of a story?', 'The time and place in which it happens', ['The main problem the characters face', 'The lesson the story teaches readers', 'The person who is telling the story'],
    'The setting is when and where the story takes place, including the weather, the season and the society.'),
  Q(1, 'Where and when is this passage set?', 'In a city at night during a storm', ['In a desert on a hot afternoon', 'In a village on a summer morning', 'On a farm in the middle of winter'],
    'Streetlights, buildings and rain at midnight point to a city, at night, in a storm.',
    'Rain hammered on the rooftops. Below, the streetlights flickered, and the tall buildings vanished into the clouds. It was nearly midnight.'),
  Q(2, 'How does the setting cause the conflict in this passage?', 'The desert heat and lack of water put NAME in danger.', ['The desert is a happy place where NAME can rest.', 'The desert has nothing to do with NAME’s problem.', 'The desert helps NAME find {his} lost friends.'],
    'The setting is the problem: in a hot desert with an empty bottle, NAME must find water to survive.',
    'NAME shook the bottle. Empty. In every direction the sand stretched to the horizon, shimmering in the heat. The nearest well was a day’s walk away.'),
  Q(2, 'Why does the time of the story matter in this passage?', 'Before phones, NAME has no way to call for help.', ['It tells us what NAME eats for breakfast.', 'It shows that NAME is good at sending letters.', 'It does not matter at all to the story.'],
    'In 1890 there are no phones, so NAME is cut off. The time period shapes what characters can and cannot do.',
    'It was the winter of 1890, and the nearest town was forty miles away. When the horse went lame, NAME knew no one would come looking for days.'),
  Q(3, 'How does the setting reflect the character’s feelings in this passage?', 'The grey, empty beach mirrors NAME’s loneliness.', ['The sunny beach shows that NAME is happy.', 'The crowded beach shows NAME has many friends.', 'The beach has no link with NAME’s feelings.'],
    'Writers often make a setting echo a character’s mood. The empty, grey beach matches how alone NAME feels after {his} friend has moved away.',
    'The day after NAME2 moved away, NAME walked along the beach. The sky was grey, the café was shuttered, and the only sound was the slap of the waves on the empty sand.'),
  Q(3, 'A story is set in a school where every student must wear identical grey uniforms and speak only when told. What does this setting suggest the conflict may be?', 'A character against a society that crushes difference', ['A character against the hot, dry weather of a desert', 'A character who cannot decide what to eat for lunch', 'A character racing against a clock that ticks down'],
    'A setting with strict rules and sameness suggests a struggle between a character and the society that controls them.'),
];

const MOODS = ['Peaceful', 'Tense', 'Gloomy', 'Joyful'];
const mood = (d: 1 | 2 | 3, text: string, k: number, why: string) => Q(d, 'What mood does this setting create?', MOODS[k], MOODS.filter((_, i) => i !== k), why, text);

const SETTING_MOOD = [
  mood(1, 'Sunlight spilled across the meadow. Bees hummed lazily among the clover, and a slow stream murmured past the willows.', 0,
    'Gentle sounds (humming, murmuring) and warm light make the scene calm and peaceful.'),
  mood(1, 'Balloons bobbed against the ceiling, music thumped, and children shrieked with laughter as the cake came out.', 3,
    'Balloons, music, laughter and cake create a joyful, celebratory mood.'),
  mood(2, 'The corridor was silent except for the hum of a broken light. At the far end, a door stood half open, and something behind it shifted.', 1,
    'Silence, a flickering light and something moving behind a door make the reader nervous: the mood is tense.'),
  mood(2, 'Fog hung over the empty graveyard. The trees were bare and black, and a cold drizzle dripped from the iron gates.', 2,
    'Fog, bare trees, cold and drizzle create a dark, gloomy mood.'),
  mood(3, 'Every clock in the house had stopped at seven minutes past four. Dust lay thick on the wedding cake, and the curtains had not been opened in years.', 2,
    'Stopped clocks, dust and closed curtains suggest grief and decay, so the mood is gloomy and sad.'),
  mood(3, 'The crowd held its breath. The ball hung on the rim of the hoop, rolled once, twice, and the clock showed one second left.', 1,
    'The writer freezes the moment, with the outcome uncertain and the clock nearly out. The mood is tense.'),
  Q(3, 'Which detail most helps create the eerie mood?', 'The rocking chair moving by itself', ['The wooden floor of the porch', 'The house being two storeys tall', 'The porch facing the road'],
    'A chair rocking with nobody in it is strange and unsettling. The other details are ordinary.',
    'The house was two storeys tall, with a wooden porch facing the road. On the porch, an empty rocking chair moved slowly back and forth, though there was no wind.'),
];

// ---------------------------------------------------------------------------- 1.4 foreshadowing and flashback

const FORESHADOW = [
  Q(1, 'What is foreshadowing?', 'A hint about what will happen later', ['A scene that jumps back to the past', 'A description of the story’s setting', 'The moment the main problem is solved'],
    'Foreshadowing gives clues about later events, building suspense and making the ending feel earned.'),
  Q(1, 'What does this sentence most likely foreshadow?', 'Trouble on the ice', ['A sunny picnic', 'A birthday party', 'A trip to the shops'],
    'The warning that the ice is thin hints that someone will fall through it later.',
    '“Stay off the pond,” Grandpa warned. “The ice is thinner than it looks this year.”'),
  Q(2, 'What does this detail most likely foreshadow?', 'The bridge will fail later in the story.', ['NAME will become a famous bridge builder.', 'The river will dry up by the end of summer.', 'NAME will soon move to another town.'],
    'Pointing out a cracked, creaking bridge is a clue that it will matter, probably by breaking, later on.',
    'As the cart rolled over the old bridge, NAME heard it creak. {He} noticed a long crack running through the middle plank, but {he} said nothing.'),
  Q(2, 'Which sentence is the best example of foreshadowing?', 'NAME didn’t know it, but that call would change everything.', ['NAME answered the phone and said hello to {his} aunt Rosa.', 'The old phone sat on the table next to the front door.', 'NAME liked to talk to {his} friends on the phone at night.'],
    'The narrator tells us that the call will matter later, without saying how. That hints at what is coming.'),
  Q(3, 'In a story, a character pockets a small key “just in case” in chapter 1. In chapter 9 she is locked in a cellar. What was the key?', 'Foreshadowing of how she will escape', ['A flashback to her childhood home', 'A symbol of the story’s setting', 'A detail with no purpose in the plot'],
    'An object introduced early that becomes important later is foreshadowing. It makes the escape believable rather than lucky.'),
  Q(3, 'Why do writers use foreshadowing?', 'To build suspense and make later events feel believable', ['To tell the reader the whole ending at the very start', 'To fill up space when there is nothing else to say', 'To go back and explain what happened years before'],
    'Foreshadowing makes readers wonder what will happen, and when it does happen, it feels planned rather than random.'),
  Q(3, 'What might the change in the weather foreshadow?', 'A coming danger or disaster', ['A peaceful end to the voyage', 'A celebration on the beach', 'A quiet afternoon at home'],
    'Writers often use darkening weather to hint that trouble is on the way.',
    'The fishermen laughed as they loaded the boat. Only old NAME looked up at the sky, where a bank of black cloud was creeping in from the west.'),
];

const FLASHBACK = [
  Q(1, 'What is a flashback?', 'A scene showing events from before the story', ['A hint about something that will happen later', 'The turning point where the conflict is faced', 'A summary of the story written at the end'],
    'A flashback interrupts the present story to show something that happened earlier.'),
  Q(1, 'Which words signal that a flashback is starting?', '“NAME remembered the summer {he} was six…”', ['“The next morning, NAME woke up early…”', '“Suddenly, the door burst open…”', '“Years later, NAME would look back…”'],
    'Remembering a time in the past takes us back. “Years later” jumps forward, and the others continue the present story.'),
  Q(2, 'Why does the writer include this flashback?', 'To explain why NAME is afraid of dogs', ['To show that NAME has many pets at home', 'To describe the weather on the walk', 'To introduce a new main character'],
    'The flashback to the dog bite explains NAME’s fear in the present scene.',
    'The dog trotted towards them, wagging its tail. NAME stepped back. {He} was five again, in the park, and the big brown dog was lunging, teeth flashing. {He} still had the scar on {his} arm.'),
  Q(2, 'In what order does this passage tell events?', 'Present, then the past, then the present again', ['Strictly in the order that the events happened', 'The future first, then the present, then the past', 'Only past events, with nothing in the present'],
    'The passage begins at the funeral, goes back to a memory of fishing, and returns to the present at the end.',
    'At the funeral, NAME stared at the rain. {He} remembered fishing with Grandad, the old man laughing when {he} fell in the river. Someone touched {his} shoulder, and NAME looked up.'),
  Q(3, 'What is the effect of opening a story with its ending, then going back to the beginning?', 'Readers know what happens and read to find out how and why.', ['Readers have no reason to keep reading the story at all.', 'The story becomes exactly the same as one told in order.', 'The ending of the story will now be a total surprise.'],
    'Starting at the end removes the question “what happens?” and replaces it with “how did it come to this?”'),
  Q(3, 'How is a flashback different from foreshadowing?', 'A flashback shows the past; foreshadowing hints at the future.', ['A flashback hints at the future; foreshadowing shows the past.', 'They are two names for the very same technique.', 'A flashback is used only in poems, and foreshadowing only in plays.'],
    'A flashback goes back in time to an earlier scene. Foreshadowing stays in the present but hints at what is coming.'),
  Q(3, 'Which detail tells the reader the flashback has ended?', '“Now, thirty years later, NAME stood at the same door.”', ['“The house was painted bright yellow back then, with blue shutters.”', '“{His} mother was singing in the warm, bright kitchen.”', '“NAME was only nine years old at the time, and small.”'],
    '“Now, thirty years later” returns us to the present. The other sentences are still describing the past.'),
];

// ---------------------------------------------------------------------------- 1.5 theme and symbol

const SYMBOL = [
  Q(1, 'What is a symbol in a story?', 'Something concrete that stands for a bigger idea', ['The person who tells the story to the reader', 'The time and place in which a story is set', 'A word that sounds like the noise it names'],
    'A symbol is something concrete that also stands for something abstract, such as a dove for peace.'),
  Q(1, 'In many stories, what does a white dove usually symbolize?', 'Peace', ['Danger', 'Greed', 'Anger'],
    'The dove has long been used as a symbol of peace.'),
  Q(2, 'What does the locked gate most likely symbolize?', 'NAME being shut out of a life {he} wants', ['NAME’s love of gardening and flowers', 'The good weather on that summer day', 'NAME’s skill at fixing broken locks'],
    'NAME stands outside, looking in at the laughter. The gate stands for the barrier between {him} and the life inside.',
    'Every evening, NAME stood at the locked gate of the big house and watched the children play on the lawn. {He} could hear their laughter, but the bars were cold under {his} hands.'),
  Q(2, 'In a story, a girl plants a tree when her brother is born, and the tree grows as he grows. What does the tree most likely symbolize?', 'The brother’s life and growth', ['The family’s wealth and money', 'The danger of the forest', 'The coming of winter snow'],
    'The tree is tied to the brother from his birth and grows alongside him, so it stands for his life.'),
  Q(3, 'At the end of the story, NAME finally opens the curtains that have been closed since {his} mother died. What does this most likely symbolize?', 'NAME starting to move on from {his} grief', ['NAME wanting a better view of the street', 'NAME planning to sell the house soon', 'NAME being afraid of the bright light'],
    'Closed curtains stood for grief and shutting out the world. Opening them stands for letting life back in.'),
  Q(3, 'How can you tell that an object in a story is a symbol?', 'It keeps appearing and is linked to feelings or the theme.', ['It is mentioned only once, in the very first sentence.', 'It is the most expensive object named in the story.', 'The narrator states that it is a symbol in the title.'],
    'Symbols are usually repeated and tied to important moments, feelings or ideas. A writer rarely labels them.'),
];

const DEVELOP = [
  Q(1, 'What is the difference between a topic and a theme?', 'A topic is a subject; a theme is a message about it.', ['A topic is a message; a theme is just one word.', 'A topic and a theme mean exactly the same thing.', 'A topic is in poems; a theme is only in stories.'],
    '“Friendship” is a topic. “True friends stand by you when things go wrong” is a theme: a full statement about life.'),
  Q(1, 'Which is the best statement of a theme?', 'Courage means acting even when you are afraid.', ['Courage', 'NAME climbs the tall tree to save a cat.', 'This story is about a brave young firefighter.'],
    'A theme is a complete sentence about life. One word is a topic, and the others retell the plot.'),
  Q(2, 'How does the theme develop across this story?', 'NAME learns that asking for help is a strength.', ['NAME learns that it is best to do everything alone.', 'NAME learns that school is too hard for {him}.', 'NAME learns that {his} friends cannot be trusted.'],
    'At the start NAME refuses help; at the end {he} asks for it and succeeds. The change in NAME carries the theme.',
    'At the start, NAME refused every offer of help: “I can do it myself.” By the middle, {his} project was falling apart. At the end, {he} finally asked NAME2 to help, and together they finished it in an afternoon.'),
  Q(2, 'Where is a story’s theme most often revealed?', 'In how the main character changes or what they learn', ['In the name of the town where the story is set', 'In the number of characters in the story', 'In the first word of the very first sentence'],
    'Watching how the main character changes, especially at the climax and the end, is the surest way to find the theme.'),
  Q(3, 'A story opens with a boy who mocks his grandfather’s old stories and ends with the boy telling those stories to his own son. Which theme does this best develop?', 'We come to value the past and pass it on.', ['Grandfathers always tell very boring stories.', 'Children should never listen to old people.', 'Telling stories is a waste of a person’s time.'],
    'The boy moves from mocking the stories to treasuring and passing them on. That change develops a theme about valuing what the past gives us.'),
  Q(3, 'How does a symbol help develop a theme?', 'It gives an idea a concrete form that can change.', ['It replaces the theme so that no message is needed.', 'It makes the story shorter by skipping the plot.', 'It tells the reader exactly how the story ends.'],
    'A symbol, like a wilting then blooming plant, can carry a theme of hope through the story and show it changing.'),
  Q(3, 'Which detail from a story best supports the theme “Greed leads to loss”?', 'The king turns his daughter to gold by touching her.', ['The king lives in a large and beautiful palace.', 'The king enjoys eating grapes in his garden.', 'The king has a servant who brings his meals.'],
    'In the myth of King Midas, his greedy wish for a golden touch costs him his daughter. That event shows greed leading to loss.'),
];

// ---------------------------------------------------------------------------- skills

export const STORY_SKILLS: SkillDef[] = [
  skill({ id: 'e7-conflict', name: 'Internal and external conflict', description: 'Tell internal from external conflict, and see how one conflict can create another.', outcomes: A1, lessonId: 'e7-1-1', format: 'mc', gen: bank(CONFLICT, ['Internal conflict happens inside a character’s mind.', 'External conflict is with something outside: another person, nature, society or technology.']) }),
  skill({ id: 'e7-suspense', name: 'Building suspense', description: 'Explain how cliffhangers, short sentences, unanswered questions and deadlines build suspense.', outcomes: A1, lessonId: 'e7-1-1', format: 'mc', gen: bank(SUSPENSE, ['Suspense is the worry about what will happen next.', 'Look at sentence length, deadlines and what the writer holds back.']) }),
  skill({ id: 'e7-characterization', name: 'Direct and indirect characterization', description: 'Tell when a writer states a trait and when the reader must infer it.', outcomes: A1, lessonId: 'e7-1-2', format: 'mc', gen: bank(CHARACTERIZATION, ['Direct: the writer names the trait.', 'Indirect: we infer the trait from speech, thoughts, effect on others, actions or looks.']) }),
  skill({ id: 'e7-character-traits', name: 'Inferring character traits', description: 'Infer a character’s traits from what they say, think, do and look like, and how others react.', outcomes: A1, lessonId: 'e7-1-2', format: 'mc', gen: bank(TRAITS, ['Ask: what does this action or speech show about the character?', 'Look for more than one clue that points the same way.']) }),
  skill({ id: 'e7-setting', name: 'How setting shapes a story', description: 'Explain how the time and place of a story shape its characters and conflict.', outcomes: A1, lessonId: 'e7-1-3', format: 'mc', gen: bank(SETTING, ['The setting is when and where a story happens.', 'Ask: could this story happen anywhere else, or at any other time?']) }),
  skill({ id: 'e7-setting-mood', name: 'Setting and mood', description: 'Explain how details of a setting create a mood.', outcomes: A1, lessonId: 'e7-1-3', format: 'mc', gen: bank(SETTING_MOOD, ['Mood is the feeling a passage gives the reader.', 'Look at the sounds, light, weather and colours.']) }),
  skill({ id: 'e7-foreshadowing', name: 'Foreshadowing', description: 'Spot foreshadowing and explain what it hints at.', outcomes: A2, lessonId: 'e7-1-4', format: 'mc', gen: bank(FORESHADOW, ['Foreshadowing is a clue about the future.', 'Look for warnings, odd details and changes in the weather.']) }),
  skill({ id: 'e7-flashback', name: 'Flashback', description: 'Recognize a flashback and explain why a writer uses it.', outcomes: A2, lessonId: 'e7-1-4', format: 'mc', gen: bank(FLASHBACK, ['A flashback is a scene from the past.', 'Look for words like remembered, years before and back then.']) }),
  skill({ id: 'e7-symbol', name: 'Symbols', description: 'Explain what a symbol stands for in a story.', outcomes: A2, lessonId: 'e7-1-5', format: 'mc', gen: bank(SYMBOL, ['A symbol is something concrete that stands for an idea.', 'Ask: which feeling or idea is this object linked to?']) }),
  skill({ id: 'e7-theme-development', name: 'How a theme develops', description: 'State a theme and trace how it develops through a story.', outcomes: A2, lessonId: 'e7-1-5', format: 'mc', gen: bank(DEVELOP, ['A theme is a full sentence about life.', 'Compare the main character at the start and at the end.']) }),
];
