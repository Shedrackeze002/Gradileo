/**
 * Grade 5 English, Unit 1: Stories (E5-A1, E5-A2). Story elements and setting, characters' traits
 * and feelings, problem, events and solution, and the lessons and kinds of traditional tales. The
 * short passages are written for Gradileo; the fables are retold from Aesop.
 */
import { skill, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { bank, fill, order, people, Q } from './common.ts';

const A1 = ['E5-A1'];
const A2 = ['E5-A2'];

// ---------------------------------------------------------------------------- 1.1 story elements

const ELEMENTS: Q[] = [
  Q(1, 'Who is the main character of this passage?', 'NAME, who wants to win the race', ['The teacher who blows the whistle', 'The crowd watching from the fence', 'The sports field behind the school'],
    'The main character is the one the story follows and cares about most. The passage is about NAME and what {he} wants: to win the race.',
    'NAME had practised every evening for a month. On the morning of the school race, {he} tied {his} laces twice, took a deep breath and walked to the starting line. The teacher raised the whistle, and the crowd by the fence went quiet.'),
  Q(1, 'What is the setting of this passage?', 'A snowy farm early on a winter morning', ['A busy city street on a summer night', 'A school classroom in the afternoon', 'A sandy beach at the end of the day'],
    'The setting is where and when a story happens. “Before the sun was up”, “frost” and “the barn” show a farm, early in the morning, in winter.',
    'Before the sun was up, NAME pulled on {his} boots and crunched across the frosty yard to the barn. Snow lay on the fence posts, and the cows’ breath hung in clouds.'),
  Q(1, 'Which sentence tells part of the plot?', 'NAME finds a lost puppy and takes it home.', ['The story takes place in a small town.', 'NAME is ten years old and has red hair.', 'The street is lined with tall oak trees.'],
    'The plot is what happens: the events of the story. Finding a puppy is an event. The other sentences describe the setting or a character.'),
  Q(1, 'Which of these is a character in the passage?', 'The old fisherman', ['The stormy harbour', 'The early morning', 'The rocking boat'],
    'Characters are the people (or animals) in a story. The harbour, the morning and the boat are part of the setting.',
    'The old fisherman pulled his boat up onto the stones of the harbour. It was early morning, and a storm was coming in from the sea.'),
  Q(2, 'Who is telling this story?', 'A narrator who is a character in it', ['A narrator who is outside the story', 'The dog, Biscuit, telling its own tale', 'The grandmother, talking about the dog'],
    'The words “I” and “my” show that the narrator is a character in the story, telling it as it happened to them.',
    'I will never forget the day my grandmother’s dog, Biscuit, ate my birthday cake. I had left it on the kitchen table for only a minute.'),
  Q(2, 'Which detail shows when this story takes place?', '“The candles in the windows”', ['“The cobbled lane by the river”', '“The baker’s shop on the corner”', '“The children’s wooden toys”'],
    'Candles in the windows suggest a time before electric light, long ago. The lane, the shop and the toys tell more about where the story happens or what is there.',
    'Night fell over the town. In every house along the cobbled lane by the river, the candles in the windows were lit one by one, and the baker on the corner put away the children’s wooden toys he sold.'),
  Q(2, 'Which sentence describes the setting rather than the plot?', 'The cabin stood alone at the edge of a dark pine forest.', ['NAME heard a scratching noise at the cabin door.', 'NAME grabbed a flashlight and opened the door slowly.', 'A small raccoon ran out from under the porch.'],
    'Setting is where and when. The cabin at the edge of a forest is a place. The other sentences tell events, so they are part of the plot.'),
  Q(3, 'What does the setting add to this passage?', 'It makes the scene feel lonely and a little frightening', ['It shows that the story happens on a sunny holiday', 'It explains why NAME has no friends at school', 'It tells the reader exactly what happens next'],
    'The empty station, the flickering light and the wind create a lonely, uneasy feeling. Setting can create a mood as well as tell where and when.',
    'The last train had gone. NAME stood alone on the platform while a single light flickered above the bench, and the wind pushed old leaves along the empty tracks.'),
  Q(3, 'What is the main thing the main character wants in this passage?', 'To be chosen for the school play', ['To make friends with the new teacher', 'To win a prize for {his} singing', 'To leave school early to go home'],
    'Characters drive the plot by wanting something. NAME practises lines, waits by the board and holds {his} breath for the list, so {he} wants a part in the play.',
    'All week NAME had practised the lines in front of the mirror. Now {he} stood by the notice board, waiting for the drama teacher to pin up the list of who would be in the play, and held {his} breath.'),
];

const SETTING: Q[] = [
  Q(1, 'Where does this passage take place?', 'At a beach', ['In a forest', 'In a library', 'On a mountain'],
    'The waves, the warm sand and the shells are clues: the passage takes place at a beach.',
    'NAME dug {his} toes into the warm sand and watched the waves roll in. A crab scuttled past a heap of shells.'),
  Q(1, 'When does this passage take place?', 'At night', ['In the early morning', 'At lunchtime', 'In the afternoon'],
    'The moon, the stars and the owl are clues that it is night.',
    'The moon rose over the hills, and the stars came out one by one. Somewhere in the trees, an owl hooted.'),
  Q(1, 'Where does this passage take place?', 'In a kitchen', ['In a garden', 'In a classroom', 'In a car'],
    'The oven, the mixing bowl and the smell of baking are clues that the passage takes place in a kitchen.',
    'NAME stirred the batter in the big mixing bowl while the oven warmed up. Soon the whole room smelled of baking bread.'),
  Q(1, 'In which season does this passage take place?', 'In autumn', ['In spring', 'In summer', 'In winter'],
    'Red and gold leaves falling from the trees and a cool wind are clues that it is autumn (fall).',
    'Red and gold leaves drifted down from the maple trees, and NAME zipped up {his} jacket against the cool wind.'),
  Q(2, 'Which clue best shows that this story takes place long ago?', 'The family travels by horse and wagon.', ['The family stops beside a wide river.', 'The children are tired after the trip.', 'The weather turns cold in the evening.'],
    'Horses and wagons were used for long journeys long ago. A river, tired children and cold evenings could belong to any time.',
    'The family travelled west for weeks by horse and wagon. Each evening they stopped beside the river, and the children, tired from the long trip, huddled by the fire as the air turned cold.'),
  Q(2, 'Where and when does this passage take place?', 'In a city, during a rainy evening', ['In a village, on a sunny morning', 'On a farm, during a snowy night', 'At a beach, on a windy afternoon'],
    'The traffic, the tall buildings and the streetlights show a city; the umbrellas, puddles and the lights coming on show a rainy evening.',
    'Umbrellas bobbed along the crowded pavement. The traffic splashed through puddles, and the streetlights flickered on between the tall buildings as the day ended.'),
  Q(2, 'Which detail tells you most about where this passage takes place?', '“Rows of corn stretched to the horizon”', ['“NAME wiped the sweat from {his} face”', '“The afternoon sun beat down”', '“{He} was thirsty and tired”'],
    'Rows of corn stretching far away show a farm or the countryside. The sun shows the time of day, and the other details are about NAME.',
    'The afternoon sun beat down. Rows of corn stretched to the horizon. NAME wiped the sweat from {his} face: {he} was thirsty and tired.'),
  Q(3, 'What can you tell about the setting of this passage?', 'It is set in the future, in space', ['It is set long ago, on a ship at sea', 'It is set today, in a science museum', 'It is set at night, in a small village'],
    'A spaceship, a planet seen through a window and a robot that serves breakfast all suggest the future, in space.',
    'NAME floated to the window of the spaceship and looked out at the red planet below. Behind {him}, the robot cook clicked and beeped as it served breakfast.'),
  Q(3, 'How does the setting cause a problem for the characters?', 'The storm blocks the only road home', ['The town is having a big festival', 'The house is too small for the family', 'The summer is too hot for school'],
    'The setting can create problems. Here, the storm floods the road over the bridge, so the family cannot get home.',
    'By evening the storm had turned the creek into a roaring river. Water poured over the bridge, the only road home, and NAME’s family had to turn the car around.'),
];

// ---------------------------------------------------------------------------- 1.2 characters

const TRAITS: Q[] = [
  Q(1, 'Which word best describes NAME?', 'Kind', ['Lazy', 'Rude', 'Greedy'],
    'A character trait is what a character is like. NAME shares {his} lunch with someone who has none, which shows kindness.',
    'At lunch, NAME saw that the new student had forgotten {his2} lunch. Without a word, NAME broke {his} sandwich in half and held out a piece.'),
  Q(1, 'Which word best describes NAME?', 'Brave', ['Careless', 'Bossy', 'Shy'],
    'NAME is scared but still climbs the tree to rescue the kitten. Doing something hard even when you are afraid shows bravery.',
    'The kitten mewed from the top branch. NAME’s knees shook, but {he} grabbed the lowest branch and began to climb.'),
  Q(1, 'Which word best describes NAME?', 'Honest', ['Proud', 'Silly', 'Selfish'],
    'NAME could keep the money, but {he} hands it in. Telling the truth and doing the right thing shows honesty.',
    'NAME found a ten-dollar note on the floor of the shop. {He} carried it straight to the counter and said, “Someone must have dropped this.”'),
  Q(1, 'Which word best describes NAME?', 'Hard-working', ['Forgetful', 'Impatient', 'Careless'],
    'NAME practises every day, even when {his} friends are playing. Sticking at a task shows that {he} is hard-working.',
    'Every day after school, while {his} friends played outside, NAME practised the piano for an hour.'),
  Q(2, 'Which word best describes NAME, and why?', 'Patient, because {he} keeps trying calmly', ['Angry, because the knots keep coming undone', 'Lazy, because {he} gives up on the lesson', 'Clever, because {he} learns the knot at once'],
    'Look at what NAME does: {he} tries again and again without getting upset. That shows patience.',
    'The knot came undone for the fifth time. NAME smiled, took a slow breath and started again from the beginning.'),
  Q(2, 'What does NAME’s action show about {him}?', 'That {he} is responsible', ['That {he} is forgetful', 'That {he} is unkind', 'That {he} is fearful'],
    'NAME remembers the plants and waters them without being told. Taking care of jobs you are trusted with shows responsibility.',
    'NAME’s neighbour had gone away for a week. Every morning, without being reminded, NAME let {him}self into the garden and watered the tomato plants.'),
  Q(2, 'Which word best describes the fox in this fable?', 'Sly', ['Honest', 'Gentle', 'Foolish'],
    'The fox flatters the crow on purpose so that she will drop the cheese. Tricking others with clever words shows that the fox is sly.',
    'A crow sat in a tree with a piece of cheese in her beak. A fox, wanting the cheese, called up, “What beautiful feathers you have! Surely your voice is just as lovely. Won’t you sing for me?”', 'retold from Aesop, “The Fox and the Crow”'),
  Q(3, 'How does NAME change from the beginning of the passage to the end?', 'From nervous to confident', ['From cheerful to grumpy', 'From friendly to unkind', 'From bored to excited'],
    'At first NAME’s hands shake and {his} voice is quiet; by the end {he} speaks loudly and smiles. {He} changes from nervous to confident.',
    'When NAME stood up to give {his} talk, {his} hands shook and {his} voice came out as a whisper. But as {he} told the class about {his} trip to the mountains, {his} voice grew stronger. By the end, {he} was smiling and answering questions loudly.'),
  Q(3, 'Which piece of evidence best shows that NAME is generous?', '“NAME gave {his} prize money to the animal shelter.”', ['“NAME won first prize in the spelling contest.”', '“NAME thanked {his} teacher for the extra help.”', '“NAME smiled when the judges called {his} name.”'],
    'Generous means happy to give to others. Giving away prize money is the clearest evidence. Winning, thanking and smiling show other things.'),
];

const FEELINGS: Q[] = [
  Q(1, 'How does NAME feel?', 'Excited', ['Bored', 'Sad', 'Angry'],
    'NAME jumps up and down and cannot stop grinning. Those actions show that {he} is excited.',
    'When NAME saw the bike with a big red bow, {he} jumped up and down and could not stop grinning.'),
  Q(1, 'How does NAME feel?', 'Sad', ['Proud', 'Excited', 'Calm'],
    'NAME’s eyes fill with tears and {he} looks down at the empty cage. Those details show that {he} is sad.',
    'NAME looked at the empty hamster cage. {His} eyes filled with tears, and {he} turned away.'),
  Q(1, 'How does NAME feel?', 'Scared', ['Happy', 'Sleepy', 'Proud'],
    'NAME’s heart pounds and {he} pulls the blanket over {his} head. Those actions show fear.',
    'Thunder crashed outside. NAME’s heart pounded, and {he} pulled the blanket over {his} head.'),
  Q(1, 'How does NAME feel?', 'Proud', ['Worried', 'Lonely', 'Angry'],
    'NAME stands tall and shows {his} certificate to everyone. That shows pride in what {he} did.',
    'NAME stood tall and showed {his} swimming certificate to everyone {he} met that day.'),
  Q(2, 'Which words in the passage show how NAME feels?', '“stomped up the stairs and slammed the door”', ['“came home from school at four o’clock”', '“the dinner was ready on the table”', '“{his} sister had used the last of the paint”'],
    'Stomping and slamming a door are actions that show anger. The other words tell what happened, not how NAME feels.',
    'NAME came home from school at four o’clock. The dinner was ready on the table, but {his} sister had used the last of the paint for {his} project. NAME stomped up the stairs and slammed the door.'),
  Q(2, 'How does NAME feel at the end of the passage?', 'Relieved', ['Disappointed', 'Jealous', 'Embarrassed'],
    'NAME had been worried about the dog. When {he} sees it safe, {he} lets out a long breath and laughs: that shows relief.',
    'NAME had searched the park for an hour. Then {he} heard a bark and saw Max trotting towards {him}, wagging his tail. NAME let out a long breath and laughed.'),
  Q(2, 'Why does NAME feel nervous?', 'It is {his} first day at a new school', ['{He} has lost {his} brand new lunch box', '{He} is late for the morning school bus', '{His} best friend is moving far away'],
    'The passage says it is NAME’s first day and {he} does not know anyone, so {he} is nervous about meeting new people.',
    'NAME stood at the classroom door, holding the straps of {his} backpack tightly. It was {his} first day at the new school, and {he} did not know anyone.'),
  Q(3, 'How do NAME’s feelings change in this passage?', 'From disappointed to hopeful', ['From angry to frightened', 'From proud to embarrassed', 'From bored to jealous'],
    'At first NAME’s shoulders slump when the team list has no place for {him}. Then the coach mentions next month, and {he} looks up: {he} feels hopeful.',
    'NAME read the team list twice. {His} name was not there. {His} shoulders slumped. Then the coach tapped {him} on the arm. “There’s another tryout next month,” she said. “Keep practising.” NAME looked up.'),
  Q(3, 'What can you infer about how NAME feels, even though the passage does not say it?', 'NAME is jealous of {his} cousin', ['NAME is proud of {his} own bicycle', 'NAME is afraid of riding fast', 'NAME is happy to share {his} things'],
    'NAME looks at {his} old bike and then at the new one, frowns and says it is “nothing special”. Putting down something you wish you had suggests jealousy.',
    'NAME’s cousin rode up on a shiny new bicycle. NAME looked down at {his} own old, rusty bike, then back at the new one. “It’s nothing special,” {he} muttered, frowning.'),
];

// ---------------------------------------------------------------------------- 1.3 problem, events and solution

const PROBLEMS: Q[] = [
  Q(1, 'What is the problem in this story?', 'The class pet rabbit has escaped', ['The class is going on a field trip', 'The teacher has bought a new rabbit', 'The rabbit likes eating carrots'],
    'The problem is what goes wrong or what a character must deal with. Here, the rabbit has escaped from its cage.',
    'On Monday morning, the door of the rabbit cage was open, and Snowball was gone. The class searched under every desk.'),
  Q(1, 'How is the problem solved?', 'NAME finds the kite and climbs to get it', ['The wind blows the kite away for good', 'NAME’s dad buys {him} a brand new kite', 'NAME decides that {he} does not like kites'],
    'The solution is how the problem is fixed. NAME’s kite is stuck; {he} climbs the ladder and brings it down.',
    'NAME’s kite got stuck in the big oak tree. {He} fetched a ladder from the shed, climbed up carefully and untangled the string. Soon the kite was flying again.'),
  Q(1, 'What is the problem in this story?', 'NAME has forgotten {his} lines', ['NAME is in the school play', 'NAME’s family is in the audience', 'NAME has a new costume'],
    'The problem is what goes wrong: on stage, NAME cannot remember what to say.',
    'The curtain opened, and NAME stepped onto the stage in {his} new costume. {His} family waved from the front row. NAME opened {his} mouth, and nothing came out. {He} had forgotten {his} lines.'),
  Q(2, 'How do the characters solve the problem?', 'They hold a bake sale to raise the money', ['They ask the mayor to give them a library', 'They decide to stop reading library books', 'They borrow books from a friend’s house'],
    'The problem is that the library needs money for new books. The children solve it by holding a bake sale.',
    'The town library had no money for new books. NAME and NAME2 had an idea. They baked cookies, made posters and held a bake sale outside the school. By the end of the day they had raised two hundred dollars.'),
  Q(2, 'What is the problem in this fable, and how is it solved?', 'The crow cannot reach the water, so she drops in pebbles', ['The crow is too tired to fly, so she rests in a tree', 'The pitcher is empty, so the crow flies to the river', 'The crow cannot find food, so she eats some pebbles'],
    'The water is too low for the crow’s beak. She drops pebbles in one by one until the water rises and she can drink.',
    'A thirsty crow found a pitcher with a little water at the bottom, but her beak could not reach it. She picked up a pebble and dropped it in, then another, and another. Slowly the water rose until she could drink.', 'retold from Aesop, “The Crow and the Pitcher”'),
  Q(2, 'Which event happens just after the problem begins?', 'NAME calls {his} friends to help search', ['NAME finds the ring under the sofa', 'NAME’s mother thanks {him} with a hug', 'NAME puts the ring in a safe box'],
    'The problem begins when the ring goes missing. Next, NAME calls {his} friends to help; finding the ring and the hug come later.',
    'NAME’s mother had lost her grandmother’s ring. NAME called {his} friends, and together they searched the whole house. At last NAME found the ring under the sofa. {His} mother hugged {him}, and they put the ring in a safe box.'),
  Q(3, 'What is the main problem of this passage?', 'The two friends both want to lead the project', ['The project is due at the end of the week', 'The friends sit next to each other in class', 'The teacher has given them a hard topic'],
    'The main problem is the conflict that the characters must work out: NAME and NAME2 both want to be in charge.',
    'NAME and NAME2 were partners for the science project. The topic was volcanoes, and it was due on Friday. On Monday, they both arrived with a plan, and each one insisted, “I should be in charge.”'),
  Q(3, 'Which sentence best tells how the problem is solved?', 'NAME and NAME2 agree to share the jobs', ['The teacher chooses a new partner for NAME', 'NAME2 decides to do the whole project alone', 'They hand in the project a week late'],
    'They solve the problem together: NAME builds the model and NAME2 writes the report, so both lead a part.',
    'NAME and NAME2 argued about who should lead their project. Finally NAME said, “What if I build the model and you write the report?” NAME2 thought for a moment and grinned. “Deal.”'),
];

interface Seq {
  title: string;
  events: string[];
}

const SEQUENCES: Record<Difficulty, Seq[]> = {
  1: [
    { title: 'a morning', events: ['NAME’s alarm clock rang.', 'NAME got dressed and ate breakfast.', 'NAME walked to the bus stop.', 'The bus arrived, and NAME climbed on.'] },
    { title: 'planting a seed', events: ['NAME filled a pot with soil.', 'NAME pushed a sunflower seed into the soil.', 'NAME watered the pot every day.', 'A tiny green shoot appeared.'] },
    { title: 'a birthday', events: ['NAME’s family hid behind the sofa.', 'NAME opened the front door.', 'Everyone jumped up and shouted “Surprise!”', 'NAME blew out the candles on the cake.'] },
  ],
  2: [
    { title: '“The Tortoise and the Hare” (retold from Aesop)', events: ['The hare laughed at the tortoise for being slow.', 'The tortoise challenged the hare to a race.', 'The hare ran far ahead and lay down for a nap.', 'The tortoise plodded past the sleeping hare.', 'The tortoise crossed the finish line first.'] },
    { title: 'a lost dog', events: ['NAME’s dog slipped out of the gate.', 'NAME made posters with the dog’s photo.', 'A neighbour called to say she had seen the dog.', 'NAME found the dog sleeping on the neighbour’s porch.', 'NAME fixed the latch on the gate.'] },
  ],
  3: [
    { title: '“The Lion and the Mouse” (retold from Aesop)', events: ['A mouse woke a sleeping lion by running over his paw.', 'The lion let the mouse go when it begged for its life.', 'Later, the lion was caught in a hunter’s net.', 'The mouse heard the lion roar and came to help.', 'The mouse gnawed through the ropes and set the lion free.'] },
    { title: 'a school garden', events: ['The class noticed an empty patch of ground by the school.', 'They wrote to the principal asking to plant a garden.', 'The principal agreed and bought seeds and tools.', 'The class planted beans, carrots and lettuce in spring.', 'In summer, they shared the vegetables at a class lunch.'] },
  ],
};

function sequence(rng: Rng, d: Difficulty): GenOutput {
  const s = rng.pick(SEQUENCES[d]);
  const who = people(rng, 2);
  const events = s.events.map((e) => fill(e, who));
  return order(
    rng,
    `Put the events of ${fill(s.title, who)} in the order they happen.`,
    events,
    ['Find the event that starts everything off: it comes first.', 'Ask of each event, “What has to happen before this can happen?”', 'Signal words such as first, then, later and finally can help.'],
    [`The events happen in this order: ${events.map((e, i) => `(${i + 1}) ${e.replace(/\.$/, '')}`).join('; ')}.`, 'Each event leads to the next, from the beginning of the story to the end.'],
  );
}

// ---------------------------------------------------------------------------- 1.4 fables and folk tales

const MORALS: Q[] = [
  Q(1, 'What is the lesson of this fable?', 'Slow and steady can win the race.', ['Hares are faster than tortoises.', 'Never take a nap in the daytime.', 'Races are only fun when you win.'],
    'The tortoise keeps going and wins, while the boastful hare stops to rest. The lesson is that steady effort can beat speed.',
    'The speedy hare was so sure he would win the race that he lay down for a nap. The slow tortoise kept plodding along, step by step, and crossed the finish line while the hare was still asleep.', 'retold from Aesop, “The Tortoise and the Hare”'),
  Q(1, 'What is the lesson of this fable?', 'Even the small can help the strong.', ['Lions are the kings of the animals.', 'Mice should stay away from lions.', 'Hunters always set nets in the forest.'],
    'The tiny mouse, whom the lion had laughed at, frees the lion from the net. The lesson is that small creatures can help great ones, so kindness to the weak is worthwhile.',
    'A lion spared a little mouse, laughing at the idea that it could ever help him. Days later, the lion was trapped in a hunter’s net. The mouse gnawed through the ropes and set him free.', 'retold from Aesop, “The Lion and the Mouse”'),
  Q(1, 'What is the lesson of this fable?', 'Liars are not believed, even when honest.', ['Wolves are always dangerous to sheep.', 'Shepherds should never work alone.', 'Villagers are far too busy to help.'],
    'The boy lies about the wolf so often that, when a real wolf comes, no one believes him. The lesson is that liars are not believed, even when they tell the truth.',
    'A shepherd boy, bored on the hillside, shouted “Wolf!” to trick the villagers, who ran up the hill for nothing. He did it again the next day. When a real wolf came, he shouted for help, but no one came.', 'retold from Aesop, “The Boy Who Cried Wolf”'),
  Q(2, 'What is the lesson of this fable?', 'Don’t pretend you never wanted what you can’t get.', ['Grapes always taste better when they are ripe.', 'Foxes should never try to jump up so high.', 'Always share your food with all your friends.'],
    'The fox cannot reach the grapes, so he says they must be sour. The lesson is about pretending you did not want something just because you failed to get it.',
    'A hungry fox saw a bunch of grapes hanging high on a vine. He jumped and jumped but could not reach them. At last he walked away, saying, “I’m sure they were sour anyway.”', 'retold from Aesop, “The Fox and the Grapes”'),
  Q(2, 'What is the lesson of this fable?', 'Work today so you are ready for tomorrow.', ['Singing is a good way to pass the time.', 'Ants are stronger than grasshoppers.', 'Winter is the hardest season for insects.'],
    'The ant stores food all summer while the grasshopper sings. When winter comes, only the ant has food. The lesson is to prepare for the future.',
    'All summer, the ant carried grain to her nest, while the grasshopper sang in the sun and laughed at her. When winter came, the grasshopper was hungry, but the ant had plenty to eat.', 'retold from Aesop, “The Ant and the Grasshopper”'),
  Q(2, 'What is the lesson of this fable?', 'Kindness works better than force.', ['The wind is stronger than the sun.', 'Travellers should carry a warm coat.', 'Contests are a good way to settle arguments.'],
    'The wind’s blowing only makes the traveller hold his coat tighter; the sun’s gentle warmth makes him take it off. Gentleness succeeds where force fails.',
    'The wind and the sun argued about who was stronger. They agreed that whoever could make a traveller take off his coat would win. The wind blew hard, but the man only pulled his coat tighter. Then the sun shone warmly, and soon the man took off his coat.', 'retold from Aesop, “The North Wind and the Sun”'),
  Q(3, 'Which saying best fits the lesson of this fable?', '“Don’t count your chickens before they hatch.”', ['“The early bird always catches the worm.”', '“Two heads are always better than one.”', '“Always look carefully before you leap.”'],
    'The milkmaid plans everything she will buy before she has even sold the milk, and loses it all. The saying means do not rely on something before you really have it.',
    'A milkmaid walked to market with a pail of milk on her head. “With the money from this milk I’ll buy eggs,” she thought, “and the eggs will hatch into chickens, and I’ll sell the chickens and buy a new dress.” She tossed her head proudly, and the pail fell. All the milk was spilled.', 'retold from Aesop, “The Milkmaid and Her Pail”'),
  Q(3, 'What is the lesson of this fable?', 'Greed can make you lose what you already have.', ['Dogs should never try to cross a bridge.', 'Meat always tastes better after a long walk.', 'You should always look down into the water.'],
    'The dog snaps at the “bigger” piece of meat, which is only his reflection, and drops the meat he had. Wanting more made him lose what he had.',
    'A dog carrying a piece of meat crossed a bridge and saw his reflection in the water. Thinking it was another dog with a bigger piece of meat, he snapped at it, and his own meat fell into the river.', 'retold from Aesop, “The Dog and His Reflection”'),
];

const TYPES: Q[] = [
  Q(1, 'What kind of story is this most likely to be?', 'A fable', ['A news report', 'A biography', 'A recipe'],
    'A fable is a short story, often with talking animals, that teaches a lesson (a moral), which is sometimes stated at the end.',
    'A hare made fun of a tortoise for being slow. The tortoise challenged him to a race, and won. Moral: slow and steady wins the race.'),
  Q(1, 'What kind of story begins like this?', 'A fairy tale', ['A science article', 'A diary entry', 'A tall tale'],
    '“Once upon a time”, a princess and a castle are clues of a fairy tale, a story with magic, royalty and good and evil characters.',
    'Once upon a time, in a castle high on a hill, there lived a princess who could talk to birds.'),
  Q(2, 'What kind of story is this?', 'A tall tale', ['A fable', 'A myth', 'A biography'],
    'A tall tale is about a larger-than-life hero whose deeds are hugely exaggerated for fun, such as digging a lake with a single scoop.',
    'Big Bertha was so strong that she dug the lake behind her farm with one scoop of her shovel, and so tall that she used clouds as pillows.'),
  Q(2, 'What kind of story is this?', 'A myth', ['A fairy tale', 'A tall tale', 'A news report'],
    'A myth is a traditional story, often about gods or heroes, that explains how something in nature came to be, such as the seasons.',
    'Long ago, the ancient Greeks told how the goddess Demeter grew so sad when her daughter went to the underworld that she let nothing grow. That, they said, is why we have winter.'),
  Q(2, 'Which feature shows that this story is a folk tale?', 'It was passed down by people telling it aloud', ['It is printed in a science textbook', 'It tells the true life of a real person', 'It gives step-by-step instructions'],
    'A folk tale is a traditional story told aloud and passed down through many generations before anyone wrote it down.'),
  Q(3, 'How is a fable different from a fairy tale?', 'A fable is short and teaches a stated lesson', ['A fable always has a prince and a castle', 'A fable is always about real people', 'A fable is always longer than a fairy tale'],
    'Both are traditional stories, but a fable is short, usually has animal characters and teaches a moral. Fairy tales are longer and often have magic, royalty and a happy ending.'),
  Q(3, 'Which story is most likely a myth?', 'A story telling how the first fire was brought to people', ['A story about a fox who tricks a crow for its cheese', 'A story about a giant lumberjack who digs rivers', 'A story about a girl who meets a fairy godmother'],
    'Myths explain how something began or why nature is as it is, often with gods or heroes. The others are a fable, a tall tale and a fairy tale.'),
];

const STORY_HINTS = ['Read the passage carefully, then look back at it for clues.', 'Rule out the answers that the passage does not support.'];

export const STORY_SKILLS: SkillDef[] = [
  skill({ id: 'e5-story-elements', name: 'Characters, setting and plot', description: 'Tell the characters, setting and plot of a story apart, and find the main character.', outcomes: A1, lessonId: 'e5-1-1', format: 'mc', gen: bank(ELEMENTS, ['Characters are who the story is about; the setting is where and when; the plot is what happens.', ...STORY_HINTS]) }),
  skill({ id: 'e5-setting', name: 'Where and when', description: 'Work out where and when a story takes place from clues in the text.', outcomes: A1, lessonId: 'e5-1-1', format: 'mc', gen: bank(SETTING, ['Look for clue words about the place (sand, trees, traffic) and the time (the moon, frost, candles).', ...STORY_HINTS]) }),
  skill({ id: 'e5-character-traits', name: 'Character traits', description: 'Infer what a character is like from what the character says and does.', outcomes: A1, lessonId: 'e5-1-2', format: 'mc', gen: bank(TRAITS, ['A trait is what a character is like on the inside. Look at what the character does and says.', 'Ask: what kind of person would act like this?']) }),
  skill({ id: 'e5-character-feelings', name: 'Characters’ feelings', description: 'Tell how a character feels and find the words that show it.', outcomes: A1, lessonId: 'e5-1-2', format: 'mc', gen: bank(FEELINGS, ['Writers often show feelings through actions, faces and words instead of naming them.', 'Picture the character: what would your face and body do if you felt that way?']) }),
  skill({ id: 'e5-problem-solution', name: 'Problem and solution', description: 'Find the problem in a story and how it is solved.', outcomes: A2, lessonId: 'e5-1-3', format: 'mc', gen: bank(PROBLEMS, ['The problem is what goes wrong or what a character needs to fix.', 'The solution is how the problem is fixed, usually near the end.']) }),
  skill({ id: 'e5-sequence', name: 'Events in order', description: 'Put the events of a story in the order they happen.', outcomes: A2, lessonId: 'e5-1-3', format: 'free', gen: sequence }),
  skill({ id: 'e5-moral', name: 'The lesson of a fable', description: 'State the lesson, or moral, of a fable.', outcomes: A2, lessonId: 'e5-1-4', format: 'mc', gen: bank(MORALS, ['A moral is a lesson about how to live, not just a fact from the story.', 'Ask: what mistake does a character make, or what do they do well?']) }),
  skill({ id: 'e5-story-types', name: 'Kinds of traditional tales', description: 'Recognize fables, fairy tales, folk tales, myths and tall tales.', outcomes: A2, lessonId: 'e5-1-4', format: 'mc', gen: bank(TYPES, ['Fables teach a moral; fairy tales have magic; myths explain nature; tall tales exaggerate; folk tales were passed down by telling.']) }),
];

