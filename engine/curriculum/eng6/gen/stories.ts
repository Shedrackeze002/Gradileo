/**
 * Grade 6 English, Unit 1: Stories (E6-A1, E6-A2). Plot stages and conflict, character and
 * motive, point of view, and theme. Fables are Aesop’s, retold; the other passages are written for
 * Gradileo.
 */
import { skill } from '../../helpers.ts';
import type { SkillDef } from '../../../types.ts';
import { bank, Q } from './common.ts';

const A1 = ['E6-A1'];
const A2 = ['E6-A2'];

// ---------------------------------------------------------------------------- 1.1 plot and conflict

const STAGES = ['The exposition', 'The rising action', 'The climax', 'The falling action', 'The resolution'];
const stage = (d: 1 | 2 | 3, text: string, k: number, why: string) => Q(d, 'Which stage of the plot is this part of the story?', STAGES[k], STAGES.filter((_, i) => i !== k), why, text);

const PLOT: ReturnType<typeof Q>[] = [
  stage(1, 'Once upon a time, in a village at the edge of a great forest, there lived a woodcutter named NAME and {his} three goats.', 0,
    'The exposition opens the story. It introduces the characters (the woodcutter and the goats) and the setting (a village by a forest) before anything goes wrong.'),
  stage(1, 'At last NAME reached the top of the cliff, grabbed the rope with both hands and pulled the lost climber to safety as the rock gave way beneath them.', 2,
    'The climax is the turning point, the moment of greatest tension when the main problem is faced. Here the rescue happens as the rock gives way.'),
  stage(1, 'Back home, the whole family sat down to dinner together. From then on, NAME never forgot to lock the gate.', 4,
    'The resolution ends the story. The problem is over, and we learn how things are afterwards.'),
  stage(2, 'The storm grew worse. First the lights went out, then the phone stopped working, and then NAME heard water dripping through the roof.', 1,
    'In the rising action, problems pile up and the tension builds towards the climax. Each event here makes things harder.'),
  stage(2, 'With the thief caught, the police returned the paintings to the museum, and NAME went to the station to tell them everything {he} had seen.', 3,
    'The falling action comes after the climax (catching the thief). Loose ends are tied up before the story ends.'),
  stage(2, 'It was the first day of summer camp. NAME, who was shy and hated swimming, stood at the edge of the lake holding {his} new towel.', 0,
    'The exposition introduces the main character, an important trait (shy, hates swimming) and the setting (a lake at summer camp).'),
  stage(3, 'NAME took a deep breath, stepped up to the microphone in front of the whole school, and began to sing, even though {his} knees were shaking.', 2,
    'This is the moment the whole story has built towards: the character faces the fear head on. That turning point is the climax.'),
  stage(3, 'Every day that week something else went missing from the classroom: a pencil case, a lunch box, then the class hamster.', 1,
    'A mystery that grows, with one event after another, is rising action. The tension is building, and the problem has not yet been faced.'),
  stage(3, 'After the race, NAME’s legs ached, and the cheering faded as the crowd drifted home. {He} packed up {his} bag and went to find {his} coach.', 3,
    'The race (the climax) is over, and the story is winding down towards its end. That is the falling action.'),
];

const KINDS = ['Character against character', 'Character against nature', 'Character against self', 'Character against society'];
const conflict = (d: 1 | 2 | 3, text: string, k: number, why: string) => Q(d, 'What kind of conflict does this passage show?', KINDS[k], KINDS.filter((_, i) => i !== k), why, text);

const CONFLICT = [
  conflict(1, 'The waves rose higher and higher, and the wind tore at the sail. NAME gripped the tiller and steered the little boat towards the shore.', 1,
    'The character struggles against the sea and wind, a force of nature.'),
  conflict(1, 'NAME2 snatched the ball and shoved NAME into the mud. “It’s my ball now,” NAME2 sneered.', 0,
    'Two characters are against each other: one bullies the other.'),
  conflict(1, 'NAME knew {he} should tell the truth about the broken window, but {he} was afraid of getting into trouble. All night {he} lay awake, unable to decide.', 2,
    'The struggle is inside the character’s own mind, between telling the truth and fear.'),
  conflict(2, 'In NAME’s town, a new rule said that children could no longer use the park after school. NAME collected signatures to ask the council to change it.', 3,
    'The character is struggling against a rule of the community. A conflict with the laws or customs of a group is character against society.'),
  conflict(2, 'Snow had buried the road, and the temperature kept falling. NAME had to reach the cabin before dark or freeze.', 1,
    'Snow and cold are forces of nature that the character must survive.'),
  conflict(2, 'NAME and NAME2 both wanted to be captain of the team, and each tried to make the coach see that the other was not good enough.', 0,
    'Two characters want the same thing and work against each other.'),
  conflict(3, 'Everyone in the kingdom believed that girls could not be knights. NAME practised with a sword every night, determined to prove them wrong.', 3,
    'The character pushes against what the whole community believes. That is character against society, even though no single villain is named.'),
  conflict(3, 'NAME had trained for months, but at the start line {he} kept thinking, “I can’t do this. I’m going to let everyone down.”', 2,
    'The race is the setting, but the real struggle here is with the character’s own doubts: character against self.'),
];

// ---------------------------------------------------------------------------- 1.2 character and motive

const MOTIVE = [
  Q(1, 'Why does NAME save {his} money?', 'To buy a gift for {his} grandmother', ['To pay for a new pair of shoes', 'To go to the cinema with friends', 'To pay back money {he} owes'],
    'The passage says the money is for a birthday present for {his} grandmother.',
    'For three months, NAME put every coin from {his} chores into a jar. {His} grandmother’s birthday was coming, and {he} wanted to buy her the blue scarf in the shop window.'),
  Q(1, 'Why does NAME stay late at school?', 'To help a classmate with fractions', ['To finish a project of {his} own first', 'To avoid walking home in the heavy rain', 'To be punished for being rude in class'],
    'NAME stays because a classmate is struggling and {he} wants to help: “I’ll show you how.”',
    'When the bell rang, everyone rushed out, but NAME saw NAME2 still frowning at the fractions sheet. “I’ll stay,” NAME said, pulling up a chair. “I’ll show you how.”'),
  Q(2, 'What is the most likely reason NAME pretends not to care about the contest?', '{He} is afraid of being disappointed if {he} loses.', ['{He} truly thinks the contest is a waste of time.', '{He} has never been interested in drawing pictures.', '{He} wants {his} friends to enter the contest instead.'],
    'NAME secretly practises every night and checks the results first, so {he} does care. Saying “Who cares?” protects {him} from disappointment.',
    '“Who cares about a drawing contest?” NAME shrugged. But every night that week {he} sat at {his} desk, drawing until midnight, and on Friday {he} was the first to check the results board.'),
  Q(2, 'Why does the Fox say the grapes are sour?', 'He cannot reach them and wants to feel better.', ['He has tasted them and found them sour.', 'He wants to warn the other animals away.', 'He prefers to eat meat instead of fruit.'],
    'The Fox tries and fails to reach the grapes. Calling them sour is a way to pretend he did not want them anyway.',
    'A hungry Fox saw some fine bunches of grapes hanging from a vine. He jumped and jumped but could not reach them. At last he walked away, saying, “I am sure they are sour.”', 'Aesop, “The Fox and the Grapes”, retold'),
  Q(3, 'Which detail best explains why NAME refuses the prize?', '{He} knows NAME2 did most of the work.', ['{He} does not like the colour of the trophy.', '{He} is too shy to walk up onto the stage.', '{He} has already won many prizes before.'],
    'NAME glances at NAME2, who built most of the model, and says the prize belongs to NAME2. Fairness is {his} motive.',
    'The judge held out the trophy. NAME looked at NAME2, who had stayed up every night building the bridge model while NAME watched. “It’s not mine,” NAME said quietly. “NAME2 built it.”'),
  Q(3, 'What does NAME want most in this passage?', 'To be included by the other children', ['To win the game of football outright', 'To go home and play by {him}self', 'To show off {his} new football boots'],
    'NAME hovers at the edge, laughs too loudly at every joke and offers {his} ball, all signs that {he} wants to belong.',
    'NAME stood at the edge of the pitch, laughing too loudly whenever the others laughed. “You can use my ball if you like,” {he} called. Nobody looked round.'),
];

const CHANGE = [
  Q(1, 'How does NAME change from the beginning of the story to the end?', 'From scared of the dog to friends with it', ['From friends with the dog to scared of it', 'From liking cats to liking dogs instead', '{He} does not change during the story at all'],
    'At the start NAME runs from the dog; at the end {he} walks it every day. A character who changes like this is a dynamic character.',
    'Beginning: Whenever the neighbour’s dog barked, NAME ran inside. End: Now NAME walks Biscuit every afternoon, and the dog waits for {him} by the gate.'),
  Q(1, 'Which word best describes a character who changes during a story?', 'Dynamic', ['Static', 'Minor', 'Flat'],
    'A dynamic character changes, usually because of what happens in the story. A static character stays the same.'),
  Q(2, 'What causes NAME to change?', 'Seeing how {his} words hurt NAME2', ['Being told off by the head teacher', 'Moving to a brand new school', 'Winning the spelling competition'],
    'NAME changes after {he} sees NAME2 crying because of {his} joke. The cause of a change is often an event that makes a character see things differently.',
    'NAME always made jokes about NAME2’s old coat. Then, one afternoon, {he} found NAME2 crying behind the gym. After that, NAME never made a joke about anyone’s clothes again.'),
  Q(2, 'In “The Tortoise and the Hare”, which character learns a lesson and changes?', 'The Hare, who stops being overconfident', ['The Tortoise, who learns to run quickly', 'The Fox, who judged the race between them', 'Neither one, since the race simply ends'],
    'The Hare is boastful and sure he will win; losing teaches him not to be overconfident. The Tortoise is steady from start to finish.'),
  Q(3, 'Which sentence best shows that NAME has changed by the end?', '“NAME raised {his} hand and asked {his} question.”', ['“NAME sat at the back, hoping not to be noticed.”', '“NAME stared at {his} desk and said nothing.”', '“NAME whispered the answer to {him}self.”'],
    'At the start NAME is too shy to speak in class. Raising {his} hand and asking a question shows the change; the other choices show {him} still shy.',
    'At the start of the year, NAME was too shy to say a word in class.'),
  Q(3, 'Which of these characters is static (does not change)?', 'A villain who is cruel at the start and cruel at the end', ['A bully who learns to apologize after being bullied', 'A lazy boy who starts working hard after failing', 'A scared girl who becomes brave by saving a friend'],
    'A static character stays the same. The villain is cruel throughout; the others all change because of what happens to them.'),
];

// ---------------------------------------------------------------------------- 1.3 point of view

const POV = ['First person', 'Third person limited', 'Third person omniscient'];
const pov = (d: 1 | 2 | 3, text: string, k: number, why: string, source?: string) => Q(d, 'From what point of view is this passage told?', POV[k], POV.filter((_, i) => i !== k), why, text, source);

const POINT = [
  pov(1, 'I grabbed my bag and ran for the bus. My heart was pounding, because if I missed it, I would miss the field trip.', 0,
    'The narrator uses I and my and is part of the story, so it is first person.'),
  pov(1, 'NAME grabbed {his} bag and ran for the bus. {His} heart was pounding. If {he} missed it, {he} would miss the field trip.', 1,
    'The narrator is outside the story (he, she, they) and tells us only one character’s thoughts and feelings: third person limited.'),
  pov(2, 'NAME smiled and said {he} loved the sweater. Secretly, {he} thought it was the ugliest thing {he} had ever seen. Across the table, NAME2 was thinking that {he2} had chosen the perfect gift.', 2,
    'The narrator is outside the story and tells us what two different characters are thinking. Knowing everyone’s thoughts is third person omniscient.'),
  pov(2, 'There was once a velveteen rabbit, and in the beginning he was really splendid. He was fat and bunchy, as a rabbit should be.', 1,
    'The narrator stands outside the story and calls the rabbit he. In this opening we follow only the rabbit, so it reads as third person limited.',
    'Margery Williams, The Velveteen Rabbit (1922), opening, adapted'),
  pov(3, 'We had never seen snow before. When the first flakes fell, my brother and I ran outside in our pyjamas, and Mum laughed at us from the window.', 0,
    'The narrator says we, my and I, and takes part in the events. First person can use we as well as I.'),
  pov(3, 'The wolf licked his lips as he watched the cottage. Inside, Grandmother dozed in her chair, dreaming of her garden, and down the path, Red Riding Hood hummed a song, thinking only of the flowers.', 2,
    'We learn the thoughts of three characters: the wolf, Grandmother and Red Riding Hood. A narrator who knows every character’s mind is omniscient.'),
];

const KNOWS = [
  Q(1, 'In a story told in the first person, what can the narrator tell the reader?', 'Only what the narrator sees, hears, thinks and feels', ['Every character’s secret thoughts and feelings', 'Everything that will happen at the end of the story', 'What is happening in places the narrator is not'],
    'A first-person narrator is a character in the story, so they know only what they experience. They can guess what others think, but they cannot know.'),
  Q(2, 'The passage is told in first person. Which sentence could the narrator NOT know for certain?', '“NAME was secretly jealous of me.”', ['“My hands were shaking as I opened the letter.”', '“I heard footsteps on the stairs behind me.”', '“I wished I had stayed at home that day.”'],
    'A first-person narrator cannot see inside another character’s mind. They can only guess that NAME was jealous, unless NAME says so.'),
  Q(2, 'Why might an author tell a mystery story in the first person?', 'So the reader knows only what the narrator knows', ['So the reader can see what every suspect is thinking', 'So the reader knows the ending from the very start', 'So the story can be told without any characters'],
    'In first person the reader discovers clues with the narrator, so the solution stays hidden. An omniscient narrator could reveal the culprit’s thoughts.'),
  Q(3, 'A story is told in third person limited, following NAME. Which sentence breaks that point of view?', '“Meanwhile, at home, NAME2 worried about the test.”', ['“NAME wondered whether NAME2 was still angry with {him}.”', '“NAME watched NAME2 walk away without saying a word.”', '“NAME felt a tight knot of worry in {his} stomach.”'],
    'Third person limited follows one character’s thoughts. Telling us what NAME2 thinks, in a place where NAME is not, switches to an omniscient view.'),
  Q(3, 'Which sentence is most likely from an unreliable narrator, one whose account the reader should question?', '“I never get angry. I only threw the plate because it slipped.”', ['“I was nervous, so I practised my speech one more time.”', '“I opened the door and saw that the room was empty.”', '“I could not remember where I had left my key.”'],
    'The narrator claims never to get angry while describing throwing a plate. When a narrator’s words and actions do not match, the reader should not trust their account.'),
];

// ---------------------------------------------------------------------------- 1.4 theme

const THEME = [
  Q(1, 'Which of these is a theme rather than a topic?', 'True friends help in hard times.', ['Friendship and helping others in need', 'A dog and a cat who become friends', 'A long, hard winter on a lonely farm'],
    'A topic is a word or phrase (friendship). A theme is a full sentence about life that the story shows: what it says about friendship.'),
  Q(1, 'What is the theme of this fable?', 'Slow and steady effort can beat speed.', ['Hares are faster animals than tortoises.', 'Races should only be run on sunny days.', 'It is good to take a nap after lunch.'],
    'The Tortoise wins by never stopping, while the speedy Hare loses by stopping to sleep. The lesson is about steady effort.',
    'The Hare laughed at the slow Tortoise and agreed to race him. Far ahead, the Hare lay down for a nap. When he woke, the Tortoise, who had never stopped, was crossing the finish line.', 'Aesop, “The Tortoise and the Hare”, retold'),
  Q(2, 'What is the theme of this passage?', 'Being honest is worth the risk of trouble.', ['Cookies should be kept out of reach of children.', 'Mothers are always angry about broken jars.', 'It is best to hide mistakes so no one knows.'],
    'NAME admits breaking the jar, and {his} mother thanks {him} for telling the truth. The story shows that honesty is worth it.',
    'NAME stared at the broken cookie jar. {He} could blame the cat. Instead, {he} went to find {his} mother. “I broke it,” {he} said. She hugged {him}. “Thank you for telling me the truth.”'),
  Q(2, 'Which is the best way to state a theme?', 'Hard work can help people reach their goals.', ['Hard work, practice and goals', 'NAME practises the piano every single day.', 'This story is about a big piano contest.'],
    'A theme is a general message in a full sentence. “Hard work” is only a topic, and the other two retell the plot instead of stating a message.'),
  Q(3, 'What is the theme of this fable?', 'Even the small and weak can help the strong.', ['Lions are the kings of all the animals.', 'Mice should stay away from sleeping lions.', 'Nets are the best way to catch a lion.'],
    'The lion laughs at the idea that a mouse could help him, but the mouse later frees him from the net. The message is that small creatures can help great ones.',
    'A Lion let a little Mouse go free. “One day I will repay you,” said the Mouse, and the Lion laughed. Later, the Lion was caught in a hunter’s net. The Mouse gnawed the ropes until the Lion was free.', 'Aesop, “The Lion and the Mouse”, retold'),
  Q(3, 'Two stories share the same theme. Which pair fits “Pride comes before a fall”?', 'A boastful champion loses to a newcomer; a show-off falls off a wall.', ['A girl finds a lost puppy; a boy wins a prize for his garden.', 'A family moves to a new city; a cat learns to climb a tree.', 'A storm floods a village; friends build a raft to escape.'],
    'Both stories in the first pair show a proud, boastful character brought down. The other pairs have no proud character who fails.'),
];

const EVIDENCE = [
  Q(1, 'The theme of a story is “Kindness is never wasted.” Which event best supports it?', 'A stranger NAME helped later saves {his} life.', ['NAME eats a big breakfast before school.', 'NAME forgets {his} homework on the bus.', 'NAME wins the race at the sports day.'],
    'The kindness NAME showed comes back to {him}, which shows that kindness is not wasted. The other events have nothing to do with kindness.'),
  Q(2, 'Which quotation from the passage best supports the theme “It is brave to admit your mistakes”?', '“{He} went to find {his} mother. ‘I broke it,’ {he} said.”', ['“NAME stared at the broken cookie jar on the floor.”', '“{He} could blame the cat. Nobody would ever know.”', '“She hugged {him}. ‘Thank you for telling me.’”'],
    'Going to find {his} mother and admitting the mistake is the brave act the theme describes.',
    'NAME stared at the broken cookie jar. {He} could blame the cat. Instead, {he} went to find {his} mother. “I broke it,” {he} said. She hugged {him}. “Thank you for telling me the truth.”'),
  Q(2, 'In “The Ant and the Grasshopper”, the Grasshopper sings all summer while the Ant stores food. Which event best supports the theme “Prepare today for tomorrow”?', 'The Grasshopper has no food when winter comes.', ['The Grasshopper sings a cheerful summer song.', 'The Ant and the Grasshopper meet in a field.', 'The sun shines warmly all through the summer.'],
    'The Grasshopper’s hunger in winter shows what happens when you do not prepare, which supports the theme.'),
  Q(3, 'Theme: “People are not always what they first seem.” Which detail from a story would support it best?', 'The grumpy neighbour secretly feeds all the stray cats.', ['The neighbour lives in a large house at the end of the street.', 'The neighbour shouts at children who play on the lawn.', 'The neighbour wears the same brown coat every day.'],
    'The neighbour seems grumpy, but secretly does something kind, so the first impression was wrong. Shouting only shows the first impression.'),
  Q(3, 'A student says the theme of a story is “Never trust anyone.” Which detail would most weaken that claim?', 'NAME’s friend keeps {his} secret even when offered a reward.', ['A stranger lies to NAME about the way to the station.', 'NAME’s little brother eats the last slice of cake.', 'A salesman tricks NAME into buying a broken bike.'],
    'A friend who stays loyal even when tempted shows that some people can be trusted, so it works against the student’s claim.'),
];

// ---------------------------------------------------------------------------- skills

export const STORY_SKILLS: SkillDef[] = [
  skill({ id: 'e6-plot-stages', name: 'Stages of a plot', description: 'Place an event in the exposition, rising action, climax, falling action or resolution.', outcomes: A1, lessonId: 'e6-1-1', format: 'mc', gen: bank(PLOT, ['The exposition introduces; the rising action builds; the climax is the turning point; the falling action winds down; the resolution ends.', 'Ask: has the main problem been faced yet?']) }),
  skill({ id: 'e6-conflict', name: 'Kinds of conflict', description: 'Identify conflict with another character, with nature, with oneself or with society.', outcomes: A1, lessonId: 'e6-1-1', format: 'mc', gen: bank(CONFLICT, ['Ask: what or who is the character struggling against?', 'A struggle inside a character’s mind is character against self.']) }),
  skill({ id: 'e6-motive', name: 'Character motive', description: 'Infer why a character acts as they do.', outcomes: A1, lessonId: 'e6-1-2', format: 'mc', gen: bank(MOTIVE, ['A motive is the reason behind an action.', 'Look at what the character does as well as what they say.']) }),
  skill({ id: 'e6-character-change', name: 'How characters change', description: 'Explain how and why a character changes, and tell dynamic from static characters.', outcomes: A1, lessonId: 'e6-1-2', format: 'mc', gen: bank(CHANGE, ['Compare the character at the beginning and at the end.', 'A dynamic character changes; a static character stays the same.']) }),
  skill({ id: 'e6-point-of-view', name: 'Point of view', description: 'Tell first-person, third-person limited and third-person omniscient narration apart.', outcomes: A2, lessonId: 'e6-1-3', format: 'mc', gen: bank(POINT, ['I and we mean first person.', 'In third person, ask: whose thoughts are we told, one character’s or everyone’s?']) }),
  skill({ id: 'e6-narrator-knows', name: 'What a narrator knows', description: 'Explain what a narrator can and cannot know, and why an author chooses a point of view.', outcomes: A2, lessonId: 'e6-1-3', format: 'mc', gen: bank(KNOWS, ['A first-person narrator knows only their own thoughts.', 'Ask: could this narrator really know that?']) }),
  skill({ id: 'e6-theme', name: 'Theme', description: 'State the theme of a story as a full sentence about life.', outcomes: A2, lessonId: 'e6-1-4', format: 'mc', gen: bank(THEME, ['A theme is a message about life, in a full sentence.', 'Ask: what does the main character learn?']) }),
  skill({ id: 'e6-theme-evidence', name: 'Evidence for a theme', description: 'Choose events and quotations that support a theme.', outcomes: A2, lessonId: 'e6-1-4', format: 'mc', gen: bank(EVIDENCE, ['Good evidence shows the theme in action.', 'Ask: does this detail actually connect to the message?']) }),
];
