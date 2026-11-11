/**
 * More English Topics, Units 3 and 4: reading nineteenth-century non-fiction, descriptive writing
 * from a picture, spelling, and spoken language. Every extract, picture and sentence was written
 * for these lessons, in the style of its period where it needs one, so nothing depends on a text in
 * copyright.
 */
import { mc, part, skill, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { block, order, q } from '../../eng10/gen/common.ts';

/** One multiple-choice question from a bank: the keyed answer, three wrong ones and why. */
interface Q {
  prompt: string;
  right: string;
  wrong: string[];
  why: string;
}

const ask = (rng: Rng, bank: Q[], hints: string[]): GenOutput => {
  const x = rng.pick(bank);
  return { prompt: x.prompt, parts: [part(mc(rng, x.right, x.wrong))], hints, solution: [x.right, x.why] };
};

// ---------------------------------------------------------------------------------------------
// Lesson 3.1: Reading nineteenth-century non-fiction.
// ---------------------------------------------------------------------------------------------

interface Extract {
  source: string;
  text: string;
  /** Words to gloss from context (d1 of the language skill). */
  words: Array<{ word: string; meaning: string; wrong: string[] }>;
  /** What a long sentence says, in modern English (d2). */
  sense: Q[];
  /** The effect of the writer's language (d3). */
  effect: Q[];
  /** Explicit information (d1 of the inference skill). */
  facts: Q[];
  /** The writer's attitude (d2). */
  attitude: Q[];
  /** Context: how the writer's world differs from ours, or what a detail implies (d3). */
  context: Q[];
}

const EXTRACTS: Extract[] = [
  {
    source: 'a letter written in 1847 by a governess to her sister',
    text: 'My dear Sister, I write to you from the inn at Derby, whither the railway carried us yesterday in a little under four hours, a journey that would once have cost two days of jolting in the mail-coach. I confess I was much alarmed at first by the shrieking of the engine and the prodigious speed, for the hedges flew past the window so swiftly that I could not fix my eye upon a single leaf. Mrs Hartley, however, sat composedly with her needlework the whole way, and declared that she had never travelled in such comfort. I am persuaded that in a few years nobody will think it remarkable at all.',
    words: [
      { word: 'whither', meaning: 'to which place', wrong: ['from which place', 'at what time', 'for what reason'] },
      { word: 'prodigious', meaning: 'enormous', wrong: ['frightening', 'gradual', 'dangerous'] },
      { word: 'composedly', meaning: 'calmly', wrong: ['carefully', 'nervously', 'quickly'] },
      { word: 'persuaded', meaning: 'convinced', wrong: ['worried', 'told', 'hopeful'] },
    ],
    sense: [
      {
        prompt: 'What does the first sentence tell us about the journey?',
        right: 'The train took under four hours, where the coach took two days',
        wrong: ['The train took two days, because the line ran through Derby', 'The coach was quicker, but far less comfortable than the train', 'The writer spent four hours waiting for a coach at the inn'],
        why: 'The writer compares the railway (“a little under four hours”) with the mail-coach (“two days of jolting”).',
      },
      {
        prompt: 'Why could the writer not “fix my eye upon a single leaf”?',
        right: 'The train went so fast that the hedges were a blur to her',
        wrong: ['Her eyesight was poor, and she had left her spectacles behind', 'The window was too dirty, so she could see nothing of the hedges', 'It was night, and the hedges along the line were too dark to see'],
        why: 'She explains it in the same sentence: “the hedges flew past the window so swiftly”.',
      },
    ],
    effect: [
      {
        prompt: 'The writer calls the engine’s noise “shrieking”. What is the effect of this word?',
        right: 'It makes the engine sound like a frightened or wild creature',
        wrong: ['It suggests the engine was quiet and hardly worth noticing', 'It shows the writer admired the engine’s beauty from the start', 'It tells the reader exactly how loud the engine was in numbers'],
        why: '“Shrieking” is a word for a person or animal screaming, so it conveys the alarm she felt.',
      },
      {
        prompt: 'What is the effect of the contrast between the writer and Mrs Hartley?',
        right: 'Her calm shows that the writer’s fear was a matter of habit',
        wrong: ['It proves that the railway really was dangerous to everyone', 'It shows that Mrs Hartley had never seen a train before', 'It shows that the writer disliked her companion intensely'],
        why: 'Mrs Hartley sews “composedly” and praises the comfort, which suggests the fear will pass, as the last sentence predicts.',
      },
    ],
    facts: [
      {
        prompt: 'Which of these statements is true, according to the letter?',
        right: 'Mrs Hartley did her needlework on the journey',
        wrong: ['Mrs Hartley was alarmed by the engine’s noise', 'The writer travelled to Derby by mail-coach', 'The journey took longer than the writer expected'],
        why: 'The letter says Mrs Hartley “sat composedly with her needlework the whole way”.',
      },
      {
        prompt: 'Where is the writer when she writes the letter?',
        right: 'At an inn in Derby',
        wrong: ['On board the train', 'At her sister’s house', 'In the mail-coach'],
        why: '“I write to you from the inn at Derby”.',
      },
    ],
    attitude: [
      {
        prompt: 'How does the writer’s attitude to the railway change in the letter?',
        right: 'She is alarmed at first, but expects it will soon seem ordinary',
        wrong: ['She enjoys it at first, but decides never to travel by it again', 'She is calm throughout, as she has travelled by railway many times', 'She is alarmed throughout, and warns her sister never to use it'],
        why: 'She was “much alarmed at first”, but ends: “in a few years nobody will think it remarkable at all.”',
      },
    ],
    context: [
      {
        prompt: 'What does the letter suggest about travel in the 1840s?',
        right: 'Railways were new enough to frighten some of their passengers',
        wrong: ['Railways had been in use for so long that nobody noticed them', 'Most people travelled long distances by aeroplane or motor car', 'Coaches had already disappeared from the roads of England'],
        why: 'The writer’s fear and her prediction that the railway will soon seem unremarkable both show that it is still a novelty.',
      },
    ],
  },
  {
    source: 'a newspaper report from the summer of 1858',
    text: 'The condition of the river has this week become intolerable. Members of the House were observed to hurry from the library with handkerchiefs pressed to their faces, and it is said that the curtains of the committee rooms have been soaked in chloride of lime in a vain attempt to keep out the stench. For years the poorer districts upon the banks have endured this nuisance without remedy; it is a curious circumstance that the evil should only now be thought worthy of attention, when it has reached the windows of Parliament itself.',
    words: [
      { word: 'intolerable', meaning: 'unbearable', wrong: ['unusual', 'dangerous', 'invisible'] },
      { word: 'vain', meaning: 'useless', wrong: ['proud', 'careful', 'secret'] },
      { word: 'remedy', meaning: 'a cure', wrong: ['a warning', 'a payment', 'a complaint'] },
      { word: 'endured', meaning: 'put up with', wrong: ['complained of', 'caused', 'escaped from'] },
    ],
    sense: [
      {
        prompt: 'What does the writer say was done to the curtains of the committee rooms?',
        right: 'They were soaked in a chemical to try to keep the smell out',
        wrong: ['They were taken down and burned because they smelled so bad', 'They were drawn shut to stop the members looking at the river', 'They were washed in the river by the poorer people of the city'],
        why: '“Soaked in chloride of lime in a vain attempt to keep out the stench”.',
      },
      {
        prompt: 'What does the last sentence mean, in modern English?',
        right: 'The poor have suffered for years, but only now that MPs suffer is anyone acting',
        wrong: ['The poor have caused the smell for years, so Parliament now plans to punish them', 'Parliament has worked for years to clean the river, and has finally succeeded', 'The smell has only just reached the poorer districts, after starting at Parliament'],
        why: 'The poorer districts “have endured this nuisance without remedy”; it is only “thought worthy of attention” now it has “reached the windows of Parliament”.',
      },
    ],
    effect: [
      {
        prompt: 'The writer calls it “a curious circumstance” that the problem is only now being noticed. What is the tone of this phrase?',
        right: 'Ironic: the writer is criticising Parliament politely',
        wrong: ['Puzzled: the writer cannot think of any reason for it', 'Joyful: the writer is pleased the smell has finally gone', 'Neutral: the writer has no opinion about the matter'],
        why: 'The phrase sounds mild, but the writer means that it is shameful that MPs acted only once they suffered themselves.',
      },
      {
        prompt: 'Why does the writer describe MPs hurrying out “with handkerchiefs pressed to their faces”?',
        right: 'To give a vivid picture that shows how bad the smell had become',
        wrong: ['To show that MPs had all caught colds that summer', 'To prove that the members were working especially hard that week', 'To explain how the river had come to be polluted in the first place'],
        why: 'The image of important men fleeing with their faces covered makes the reader imagine the smell.',
      },
    ],
    facts: [
      {
        prompt: 'According to the report, who had put up with the smell for years?',
        right: 'The poorer districts on the river banks',
        wrong: ['The members of the House', 'The writers of the newspaper', 'The people who live far from the river'],
        why: '“For years the poorer districts upon the banks have endured this nuisance”.',
      },
    ],
    attitude: [
      {
        prompt: 'What is the writer’s attitude to Parliament?',
        right: 'Critical, because it ignored the problem until it was affected',
        wrong: ['Admiring, because it acted the moment the problem began', 'Sympathetic, because MPs have suffered more than anybody', 'Indifferent, because the writer only reports the facts'],
        why: 'The last sentence points out that the problem was ignored “for years” until it “reached the windows of Parliament itself”.',
      },
    ],
    context: [
      {
        prompt: 'What does the report suggest about life in a city in the 1850s?',
        right: 'The river was used for waste, and the poor lived closest to it',
        wrong: ['Every home had clean running water and a modern sewer', 'The river was clean, and the smell came from the factories', 'The poor lived far from the river, in the cleanest districts'],
        why: 'The river’s “stench” and the “poorer districts upon the banks” show a city with no proper drainage, where the poor bore the worst of it.',
      },
    ],
  },
  {
    source: 'the diary of a visitor to a cotton mill, written in 1844',
    text: 'We were conducted through the spinning room, where some two hundred girls, few of them older than fifteen, attended the machines from six in the morning until seven at night. The heat was oppressive, and the air so thick with cotton dust that I was obliged to cover my mouth. The overseer assured us that the hands were perfectly contented, yet I observed that not one of them raised her eyes from her work while he stood near. I left the place with a heavier heart than I had entered it.',
    words: [
      { word: 'conducted', meaning: 'led', wrong: ['ordered', 'sent', 'invited'] },
      { word: 'oppressive', meaning: 'heavy and hard to bear', wrong: ['pleasantly warm', 'cool and fresh', 'loud and harsh'] },
      { word: 'obliged', meaning: 'forced', wrong: ['grateful', 'allowed', 'invited'] },
      { word: 'hands', meaning: 'workers', wrong: ['machines', 'visitors', 'overseers'] },
    ],
    sense: [
      {
        prompt: 'How long was the girls’ working day, according to the diary?',
        right: 'Thirteen hours, from six in the morning until seven at night',
        wrong: ['Seven hours, from seven in the morning until two in the afternoon', 'Six hours, from six in the morning until twelve noon', 'Fifteen hours, which was the age of the oldest girls in the room'],
        why: '“From six in the morning until seven at night” is thirteen hours.',
      },
      {
        prompt: 'What does “I left the place with a heavier heart than I had entered it” mean?',
        right: 'The writer left feeling sadder than when the visit began',
        wrong: ['The writer left carrying cotton bought at the mill', 'The writer left feeling tired from the walk through the mill', 'The writer left feeling glad to have seen the girls at work'],
        why: 'A “heavy heart” is sadness: what the writer saw has made them sorrowful.',
      },
    ],
    effect: [
      {
        prompt: 'The overseer says the workers are “perfectly contented”. How does the writer make the reader doubt this?',
        right: 'By noting that no girl dared look up while he stood near',
        wrong: ['By quoting a girl who says that she is very happy at work', 'By agreeing with the overseer in the very next sentence', 'By describing the pleasant breeze that blew through the room'],
        why: 'The word “yet” introduces evidence against the overseer: the girls seem afraid of him.',
      },
      {
        prompt: 'Why does the writer include the detail “few of them older than fifteen”?',
        right: 'To make the reader feel how young the workers were',
        wrong: ['To show that the mill employed only skilled workers', 'To prove that the girls had chosen the work themselves', 'To explain why the overseer seemed so friendly to them'],
        why: 'The girls’ youth makes the long hours, heat and dust seem even more shocking.',
      },
    ],
    facts: [
      {
        prompt: 'Which of these statements is true, according to the diary?',
        right: 'The air in the room was full of cotton dust',
        wrong: ['The room was cold, and the girls wore coats', 'The overseer said that the workers were unhappy', 'The girls stopped work to greet the visitors'],
        why: '“The air so thick with cotton dust that I was obliged to cover my mouth”.',
      },
    ],
    attitude: [
      {
        prompt: 'What is the writer’s attitude to the conditions in the mill?',
        right: 'Disturbed and sympathetic towards the young workers',
        wrong: ['Impressed by how efficiently the mill was run', 'Amused by how hard the young girls worked', 'Bored, and eager to leave the noisy room'],
        why: 'The writer notices the girls’ youth, the heat and their fear, and leaves “with a heavier heart”.',
      },
    ],
    context: [
      {
        prompt: 'What does the diary suggest about work in the 1840s?',
        right: 'Children could work long hours in hard conditions',
        wrong: ['Children were not allowed to work in any factory', 'Factory work was short, light and well paid', 'Factories closed at noon for the rest of the day'],
        why: 'Girls “few of them older than fifteen” work thirteen hours a day in heat and dust.',
      },
    ],
  },
  {
    source: 'a book of advice to parents, published in 1862',
    text: 'A boy who is permitted to idle away his evenings will seldom acquire the habit of industry in later life. Let him, therefore, be set some useful task each day, however small, and let him not rise from the table until it is completed. Parents who indulge every wish of their children imagine that they are showing kindness; in truth they are preparing them for disappointment, for the world will not indulge them in the same manner.',
    words: [
      { word: 'seldom', meaning: 'rarely', wrong: ['always', 'quickly', 'certainly'] },
      { word: 'industry', meaning: 'hard work', wrong: ['factories', 'cleverness', 'good manners'] },
      { word: 'indulge', meaning: 'give in to', wrong: ['punish', 'ignore', 'question'] },
      { word: 'permitted', meaning: 'allowed', wrong: ['forced', 'taught', 'asked'] },
    ],
    sense: [
      {
        prompt: 'What does the first sentence mean, in modern English?',
        right: 'A boy allowed to laze about will rarely learn to work hard',
        wrong: ['A boy made to work every evening will rarely enjoy his life', 'A boy who works in the evenings will never find a job', 'A boy should be allowed to rest after a day of hard work'],
        why: '“Idle away his evenings” is wasting time; “seldom acquire the habit of industry” is rarely learning to work hard.',
      },
      {
        prompt: 'Why, according to the writer, does giving children everything they want harm them?',
        right: 'The world will not give them what they want, so they will be disappointed',
        wrong: ['They will become too clever and their teachers will dislike them', 'Their parents will run out of money before the children grow up', 'They will refuse ever to rise from the table again'],
        why: '“They are preparing them for disappointment, for the world will not indulge them in the same manner.”',
      },
    ],
    effect: [
      {
        prompt: 'The writer uses commands such as “Let him … be set some useful task”. What is the effect?',
        right: 'It sounds confident and certain, like an expert giving rules',
        wrong: ['It sounds uncertain, as if the writer is asking for advice', 'It sounds playful, as if the writer is telling a joke', 'It sounds angry, as if the writer is shouting at a child'],
        why: 'The imperatives tell parents exactly what to do, which suits an advice book written with authority.',
      },
      {
        prompt: 'The last sentence turns on a semicolon: parents “imagine” one thing; “in truth” another. What is the effect?',
        right: 'It sets what parents believe against the reality the writer sees',
        wrong: ['It lists two pieces of advice that are equally important', 'It shows the writer changing their mind halfway through', 'It shows that the writer agrees with indulgent parents'],
        why: 'The semicolon balances the parents’ belief (kindness) against the writer’s view of the result (disappointment).',
      },
    ],
    facts: [
      {
        prompt: 'What does the writer say a boy should do each day?',
        right: 'Complete some useful task before leaving the table',
        wrong: ['Spend the evening resting after his lessons', 'Choose his own tasks and finish them when he likes', 'Work in a factory to learn the value of money'],
        why: '“Let him … be set some useful task each day … and let him not rise from the table until it is completed.”',
      },
    ],
    attitude: [
      {
        prompt: 'What is the writer’s attitude to parents who give their children everything?',
        right: 'Disapproving: they think they are kind but do harm',
        wrong: ['Approving: they are the kindest kind of parents', 'Uncertain: the writer cannot decide if they are right', 'Jealous: the writer wishes they had been so lucky'],
        why: 'The writer says such parents only “imagine” they are kind, and in truth prepare their children for disappointment.',
      },
    ],
    context: [
      {
        prompt: 'The advice is all about boys. What does this suggest about the time it was written?',
        right: 'Boys and girls were often expected to lead quite different lives',
        wrong: ['Girls were expected to work harder at school than boys', 'Every boy and girl went to the same school and job', 'Parents in the 1860s did not care how their sons behaved'],
        why: 'The writer assumes the habit of work matters for a boy’s “later life”, which reflects a time when men and women were given different roles.',
      },
    ],
  },
];

const intro = (e: Extract) => `This extract is from ${e.source}.\n\n${block(e.text)}\n\n`;

function c19Language(rng: Rng, d: Difficulty): GenOutput {
  const e = rng.pick(EXTRACTS);
  if (d === 1) {
    const w = rng.pick(e.words);
    return {
      prompt: `${intro(e)}What does the word ${q(w.word)} mean in this extract?`,
      parts: [part(mc(rng, w.meaning, w.wrong))],
      hints: ['Find the word in the extract and read the whole sentence around it.', 'Try each meaning in place of the word: which one makes sense?'],
      solution: [`${q(w.word)} means ${q(w.meaning)} here.`, 'Putting the meaning in place of the word keeps the sentence’s sense.'],
    };
  }
  const x = rng.pick(d === 2 ? e.sense : e.effect);
  return {
    prompt: `${intro(e)}${x.prompt}`,
    parts: [part(mc(rng, x.right, x.wrong))],
    hints: d === 2
      ? ['Break the long sentence into its parts, and put each part into your own words.', 'Look for words such as “for”, “yet” and “however”, which link the ideas.']
      : ['Think about what the word or detail makes the reader feel or picture.', 'Ask what the writer wants the reader to think, and how the language helps.'],
    solution: [x.right, x.why],
  };
}

function c19Inference(rng: Rng, d: Difficulty): GenOutput {
  const e = rng.pick(EXTRACTS);
  const x = rng.pick(d === 1 ? e.facts : d === 2 ? e.attitude : e.context);
  return {
    prompt: `${intro(e)}${x.prompt}`,
    parts: [part(mc(rng, x.right, x.wrong))],
    hints: d === 1
      ? ['The answer is stated in the extract: find the sentence that says it.', 'Check each choice against the exact words of the extract.']
      : d === 2
        ? ['Look at the words the writer chooses to describe people and events.', 'Ask whether the writer approves, disapproves, or changes their mind.']
        : ['Think about what the writer takes for granted that a reader today might not.', 'Use the details of the extract as evidence about the time.'],
    solution: [x.right, x.why],
  };
}

// ---------------------------------------------------------------------------------------------
// Lesson 3.2: Descriptive writing from a picture.
// ---------------------------------------------------------------------------------------------

interface Picture {
  scene: string;
  /** Sentences that describe what is in the picture, and one that contradicts it. */
  fits: string[];
  clash: string[];
  /** Paragraphs of a plan, in order: wide view, a closer detail, a small detail, a shift. */
  plan: string[];
}

const PICTURES: Picture[] = [
  {
    scene: 'A photograph of a street market at dusk. Strings of bulbs hang over the stalls, a woman is weighing oranges on a brass scale, steam rises from a food stall, and the sky above the rooftops is turning purple.',
    fits: ['Steam curled from the noodle stall and vanished into the dusk', 'Bulbs swung on their wires above the crowded stalls', 'The orange-seller’s brass scale dipped and shivered'],
    clash: ['The empty market lay silent under the glare of the noon sun', 'Snow lay thick on the deserted stalls in the grey dawn', 'The market had been closed for years, its stalls rotting'],
    plan: ['The whole market under a purple sky, its strings of bulbs just lit', 'The crowd moving between the stalls, voices and steam rising', 'The brass scale in the orange-seller’s hand, dipping under the fruit', 'The last stall-holder switching off the bulbs as night falls'],
  },
  {
    scene: 'A picture of a flooded village street after a storm. Brown water reaches the doorsteps, a red rowing boat is tied to a lamp post, a cat sits on a windowsill, and the clouds are breaking to show a strip of blue sky.',
    fits: ['A red boat nudged against the lamp post where it was tied', 'Brown water lapped at every doorstep in the street', 'On a windowsill, a cat watched the water with narrowed eyes'],
    clash: ['Children played on the dry, dusty road in the heat', 'The street was busy with cars and buses on their way to work', 'Fresh snow covered the rooftops and the frozen pond'],
    plan: ['The whole street under water, the clouds still heavy above it', 'The row of houses, brown water lapping at every doorstep', 'The cat on the windowsill, its tail curled around its paws', 'A strip of blue opening in the sky as the storm moves away'],
  },
  {
    scene: 'A photograph of an empty beach in winter. Grey waves break on the shingle, a single set of footprints leads towards the sea, a lifeguard’s hut is boarded up, and gulls hang in the wind above the cliffs.',
    fits: ['A lone line of footprints led down to the grey water', 'Gulls hung in the wind as if pinned to the sky', 'The lifeguard’s hut stood shuttered, its paint peeling'],
    clash: ['Families crowded the hot sand under bright umbrellas', 'The lifeguard waved from his open hut to the swimmers', 'The calm sea glittered under a cloudless summer sky'],
    plan: ['The whole empty beach under a low, grey sky', 'The far cliffs, with gulls hanging in the wind above them', 'The single set of footprints pressed into the shingle', 'The tide coming in and washing the footprints away'],
  },
  {
    scene: 'A picture of a railway station early in the morning. Commuters hurry across the concourse, a clock above the departures board shows 7:52, a pigeon pecks at crumbs, and sunlight slants through the glass roof.',
    fits: ['Sunlight slanted through the glass roof in long, dusty beams', 'A pigeon pecked at crumbs between the hurrying feet', 'Above the board, the clock’s hand jerked on to 7:52'],
    clash: ['The station lay dark and empty in the middle of the night', 'A single traveller waited on a country platform in the rain', 'The trains had stopped, and grass grew between the rails'],
    plan: ['The whole concourse, crowded and loud under the glass roof', 'The departures board and the clock above it ticking to 7:52', 'The pigeon pecking at a crumb between the hurrying shoes', 'The crowd thinning as the trains pull out, leaving the pigeon alone'],
  },
];

const PLAIN: Q[] = [
  {
    prompt: 'Which sentence describes the wind most vividly?',
    right: 'The wind tore at the shutters and howled down the chimney',
    wrong: ['The wind was very strong and it was quite noisy that night', 'It was a windy night and the wind blew a lot outside', 'There was a lot of wind and it made some loud noises'],
    why: 'Precise verbs (“tore”, “howled”) let the reader hear and see the wind, instead of being told it was strong.',
  },
  {
    prompt: 'Which sentence describes the old man’s hands most precisely?',
    right: 'His knuckles were knotted, and brown spots freckled his skin',
    wrong: ['His hands were very old and they looked quite old as well', 'He had old hands, which were the hands of an old person', 'His hands were not young, and they were not new either'],
    why: 'Specific details (knotted knuckles, brown spots) show age; the others repeat “old” without showing anything.',
  },
  {
    prompt: 'Which sentence uses the senses best to describe a bakery?',
    right: 'Warm sugar filled the air, and the crusts crackled as they cooled',
    wrong: ['The bakery was a nice place with lots of nice things in it', 'There were many different kinds of bread in the bakery today', 'It was a good bakery, and everybody liked going there a lot'],
    why: 'It uses smell (“warm sugar”) and sound (“crackled”), so the reader experiences the bakery.',
  },
];

const SHOW: Q[] = [
  {
    prompt: 'Which sentence **shows**, rather than tells, that the girl was nervous?',
    right: 'She twisted the strap of her bag and glanced again at the door',
    wrong: ['She was very nervous as she waited outside the room for them', 'The girl felt nervous because she was worried about the test', 'Nervousness filled her as she sat there feeling very anxious'],
    why: 'Her actions reveal the feeling without naming it, so the reader works it out.',
  },
  {
    prompt: 'Which sentence **shows**, rather than tells, that the house was abandoned?',
    right: 'Ivy had swallowed the windows, and the gate hung from one hinge',
    wrong: ['The house was abandoned and nobody had lived there for years', 'It was clearly an abandoned house that nobody lived in at all', 'Nobody lived in the house any more because it was abandoned'],
    why: 'The ivy and the broken gate let the reader see the neglect for themselves.',
  },
  {
    prompt: 'Which sentence **shows**, rather than tells, that the man was cold?',
    right: 'He stamped his feet and blew into his cupped, reddened hands',
    wrong: ['The man was very cold because it was a freezing winter night', 'He felt cold, and he was not enjoying the cold weather at all', 'It was cold, so he was cold, and he wished he was warmer now'],
    why: 'Stamping and blowing on red hands are what a cold person does, so the reader feels the cold.',
  },
];

const DEVICES: Q[] = [
  { prompt: 'What method is used in this sentence? “The waves gnawed at the bottom of the cliff.”', right: 'Personification', wrong: ['Simile', 'Onomatopoeia', 'Alliteration'], why: 'The waves are given a living creature’s action: gnawing.' },
  { prompt: 'What method is used in this sentence? “The frost was as sharp as broken glass.”', right: 'Simile', wrong: ['Metaphor', 'Personification', 'Onomatopoeia'], why: 'It compares the frost to glass using “as … as”.' },
  { prompt: 'What method is used in this sentence? “The city was a hive, buzzing with life.”', right: 'Metaphor', wrong: ['Simile', 'Onomatopoeia', 'Alliteration'], why: 'It says the city *is* a hive, without “like” or “as”.' },
  { prompt: 'What method is used in this sentence? “Rain pattered and drummed on the tin roof.”', right: 'Onomatopoeia', wrong: ['Metaphor', 'Simile', 'Personification'], why: '“Pattered” and “drummed” sound like the noise they describe.' },
  { prompt: 'What method is used in this sentence? “Silent snow settled softly on the sleeping street.”', right: 'Alliteration', wrong: ['Simile', 'Metaphor', 'Onomatopoeia'], why: 'The repeated “s” sound gives the sentence a hushed, gentle feel.' },
];

const REVISE: Q[] = [
  {
    prompt: 'A student’s description begins: “It was a dark and stormy night. The rain was raining. I could see things.” Which revision is best?',
    right: 'Rain lashed the windows; beyond them, the trees thrashed in the dark',
    wrong: ['It was a very dark and very stormy night, and the rain was raining', 'It was dark and stormy. The rain was raining. I could see things', 'The night was dark and the night was stormy, and it rained on things'],
    why: 'It replaces a cliché and vague words (“things”) with precise, original detail.',
  },
  {
    prompt: 'Every sentence in a description begins “There was”. Which is the best way to improve it?',
    right: 'Vary the openings: start with a detail, a verb or a sound',
    wrong: ['Begin every sentence with “It was” instead of “There was”', 'Make every sentence exactly the same length as the last', 'Remove every adjective so that the sentences are shorter'],
    why: 'Varied sentence openings keep the reader’s interest and let the writer control the focus.',
  },
  {
    prompt: 'Which ending gives a description from a picture the strongest sense of shape?',
    right: 'One that returns to the opening image, changed by time or light',
    wrong: ['One that begins a new story about a different place entirely', 'One that tells the reader the description has now finished', 'One that lists every detail of the picture a second time'],
    why: 'A cyclical ending echoes the opening but shows a change, which gives the writing a deliberate structure.',
  },
];

function describeDetail(rng: Rng, d: Difficulty): GenOutput {
  const p = rng.pick(PICTURES);
  if (d === 1) {
    return {
      prompt: `The task is to describe this picture:\n\n${block(p.scene)}\n\nWhich sentence describes something **in the picture**?`,
      parts: [part(mc(rng, rng.pick(p.fits), p.clash))],
      hints: ['Check the time of day, the weather and the people in the picture.', 'A description can add detail, but it must not contradict the picture.'],
      solution: ['The right sentence describes a detail that is in the picture.', 'The others contradict it: a different time, season or scene.'],
    };
  }
  if (d === 2) return ask(rng, PLAIN, ['Look for precise verbs and nouns, not vague words such as “nice”, “very” and “things”.', 'The best description lets the reader see, hear or smell the scene.']);
  return order(
    rng,
    `The task is to describe this picture:\n\n${block(p.scene)}\n\nA student plans four paragraphs, moving from the wide view to a small detail and then to a change. Put the paragraphs in order.`,
    p.plan,
    ['Start with the whole scene, as if a camera were far away.', 'Zoom in step by step, then end with a change in time or light.'],
    [p.plan.map((s, i) => `${i + 1}. ${s}`).join(' ')],
  );
}

function describeCraft(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) return ask(rng, DEVICES, ['A simile compares using “like” or “as”; a metaphor says one thing *is* another.', 'Personification gives a human or animal action to something that is not alive.']);
  if (d === 2) return ask(rng, SHOW, ['Telling names the feeling. Showing gives the actions or details that reveal it.', 'Look for the sentence that never names the feeling at all.']);
  return ask(rng, REVISE, ['Avoid clichés and vague words; choose precise, fresh detail.', 'Think about variety and about how the whole piece is shaped.']);
}

// ---------------------------------------------------------------------------------------------
// Lesson 4.1: Spelling.
// ---------------------------------------------------------------------------------------------

interface Gap {
  sentence: string;
  right: string;
  set: string[];
  why: string;
}

const HOMOPHONES: Record<1 | 2 | 3, Gap[]> = {
  1: [
    { sentence: 'The students left ___ coats in the hall.', right: 'their', set: ['there', 'they’re'], why: '“Their” shows that something belongs to them.' },
    { sentence: 'Put the boxes over ___ by the window.', right: 'there', set: ['their', 'they’re'], why: '“There” names a place.' },
    { sentence: 'I think ___ going to be late again.', right: 'they’re', set: ['their', 'there'], why: '“They’re” is short for “they are”.' },
    { sentence: 'The tea was ___ hot to drink.', right: 'too', set: ['to', 'two'], why: '“Too” means “more than enough” (or “also”).' },
    { sentence: 'We walked ___ the station together.', right: 'to', set: ['too', 'two'], why: '“To” shows direction.' },
    { sentence: 'Tell me when ___ ready to leave.', right: 'you’re', set: ['your', 'yore'], why: '“You’re” is short for “you are”.' },
    { sentence: 'Don’t forget ___ ticket for the match.', right: 'your', set: ['you’re', 'yore'], why: '“Your” shows that something belongs to you.' },
  ],
  2: [
    { sentence: 'The dog wagged ___ tail.', right: 'its', set: ['it’s', 'its’'], why: '“Its” shows belonging; it has no apostrophe.' },
    { sentence: '___ been raining all morning.', right: 'It’s', set: ['Its', 'Its’'], why: '“It’s” is short for “it has” or “it is”.' },
    { sentence: '___ coat is this on the chair?', right: 'Whose', set: ['Who’s', 'Whos'], why: '“Whose” asks who something belongs to.' },
    { sentence: '___ coming to the meeting tonight?', right: 'Who’s', set: ['Whose', 'Whos'], why: '“Who’s” is short for “who is”.' },
    { sentence: 'The cold weather will ___ the harvest.', right: 'affect', set: ['effect', 'affekt'], why: '“Affect” is usually the verb: to have an influence on.' },
    { sentence: 'The new law had a great ___ on prices.', right: 'effect', set: ['affect', 'efect'], why: '“Effect” is usually the noun: a result.' },
    { sentence: 'Where ___ you when the lights went out?', right: 'were', set: ['where', 'wear'], why: '“Were” is a past form of the verb “to be”.' },
  ],
  3: [
    { sentence: 'She needs more ___ before the concert.', right: 'practice', set: ['practise', 'practis'], why: 'In British English, “practice” with a c is the noun.' },
    { sentence: 'You should ___ the piano every day.', right: 'practise', set: ['practice', 'practiss'], why: 'In British English, “practise” with an s is the verb.' },
    { sentence: 'Can you ___ me on which course to take?', right: 'advise', set: ['advice', 'adviss'], why: '“Advise” with an s is the verb; “advice” is the noun.' },
    { sentence: 'The ___ welcomed the parents to the school.', right: 'principal', set: ['principle', 'principel'], why: 'A “principal” is a head; a “principle” is a rule or belief.' },
    { sentence: 'She refused to lie, as a matter of ___.', right: 'principle', set: ['principal', 'principel'], why: 'A “principle” is a rule or belief.' },
    { sentence: 'The traffic was ___ for an hour.', right: 'stationary', set: ['stationery', 'stationairy'], why: '“Stationary” (with an a) means not moving; “stationery” is paper and pens.' },
    { sentence: 'He paid her a ___ on her speech.', right: 'compliment', set: ['complement', 'complemint'], why: 'A “compliment” is praise; a “complement” completes something.' },
  ],
};

const TRICKY: Array<{ word: string; wrong: string[]; tip: string }> = [
  { word: 'definitely', wrong: ['definately', 'definatly', 'defenitely'], tip: 'It contains the word “finite”.' },
  { word: 'separate', wrong: ['seperate', 'separete', 'seperete'], tip: 'There is “a rat” in sep-a-rat-e.' },
  { word: 'necessary', wrong: ['neccessary', 'necesary', 'neccesary'], tip: 'One collar (c) and two sleeves (ss).' },
  { word: 'believe', wrong: ['beleive', 'belive', 'beleave'], tip: 'Never “believe” a lie: i before e.' },
  { word: 'receive', wrong: ['recieve', 'receeve', 'recive'], tip: 'I before e, except after c.' },
  { word: 'beginning', wrong: ['begining', 'beggining', 'beginnig'], tip: 'Double the n before -ing: begin, beginning.' },
  { word: 'accommodation', wrong: ['accomodation', 'acommodation', 'accommadation'], tip: 'It is big enough for two cs and two ms.' },
  { word: 'embarrass', wrong: ['embarass', 'embaress', 'emberrass'], tip: 'Two rs and two ss.' },
  { word: 'environment', wrong: ['enviroment', 'enviornment', 'envirnment'], tip: 'There is “iron” in env-iron-ment.' },
  { word: 'government', wrong: ['goverment', 'govenment', 'guvernment'], tip: 'Those who govern form the govern-ment.' },
  { word: 'rhythm', wrong: ['rythm', 'rhythem', 'rhytm'], tip: 'Rhythm Helps Your Two Hips Move.' },
  { word: 'occurred', wrong: ['occured', 'ocurred', 'ocured'], tip: 'Double the c and double the r.' },
];

const RULES: Array<{ base: string; ask: string; right: string; wrong: string[]; rule: string }> = [
  { base: 'hop', ask: 'add -ing', right: 'hopping', wrong: ['hoping', 'hopeing', 'hoppeing'], rule: 'After a short vowel and one consonant, double the consonant: hop, hopping.' },
  { base: 'hope', ask: 'add -ing', right: 'hoping', wrong: ['hopping', 'hopeing', 'hoppeing'], rule: 'Drop the silent e before a suffix that begins with a vowel: hope, hoping.' },
  { base: 'carry', ask: 'add -ed', right: 'carried', wrong: ['carryed', 'carred', 'carreid'], rule: 'After a consonant, change y to i before -ed: carry, carried.' },
  { base: 'happy', ask: 'add -ness', right: 'happiness', wrong: ['happyness', 'hapiness', 'happness'], rule: 'After a consonant, change y to i before most suffixes: happy, happiness.' },
  { base: 'knife', ask: 'make it plural', right: 'knives', wrong: ['knifes', 'knifs', 'knivs'], rule: 'Many words ending in -f or -fe change to -ves: knife, knives.' },
  { base: 'tomato', ask: 'make it plural', right: 'tomatoes', wrong: ['tomatos', 'tomatoe', 'tomatoies'], rule: 'Some words ending in -o add -es: tomato, tomatoes.' },
  { base: 'baby', ask: 'make it plural', right: 'babies', wrong: ['babys', 'babyes', 'babeys'], rule: 'After a consonant, change y to ies: baby, babies.' },
  { base: 'day', ask: 'make it plural', right: 'days', wrong: ['daies', 'dayes', 'dais'], rule: 'After a vowel, keep the y and add s: day, days.' },
  { base: 'care', ask: 'add -ful', right: 'careful', wrong: ['carefull', 'carful', 'carefulle'], rule: 'The suffix -ful has one l, and the e stays before a consonant: care, careful.' },
  { base: 'admit', ask: 'add -ed', right: 'admitted', wrong: ['admited', 'addmitted', 'admittid'], rule: 'Double the final t when the stress is on the last syllable: ad-MIT, admitted.' },
];

const ERRORS: Array<{ sentence: string; word: string; fix: string; others: string[] }> = [
  { sentence: 'We definately need to leave before the rain starts.', word: 'definately', fix: 'definitely', others: ['need', 'leave', 'before'] },
  { sentence: 'The goverment announced a new plan on Tuesday.', word: 'goverment', fix: 'government', others: ['announced', 'plan', 'Tuesday'] },
  { sentence: 'She was embarassed when her phone rang in class.', word: 'embarassed', fix: 'embarrassed', others: ['when', 'phone', 'class'] },
  { sentence: 'The accident occured just after midnight.', word: 'occured', fix: 'occurred', others: ['accident', 'after', 'midnight'] },
  { sentence: 'Please keep the two groups seperate during the test.', word: 'seperate', fix: 'separate', others: ['Please', 'groups', 'during'] },
  { sentence: 'I recieved a letter from my cousin in Canada.', word: 'recieved', fix: 'received', others: ['letter', 'cousin', 'Canada'] },
  { sentence: 'The begining of the film was very slow.', word: 'begining', fix: 'beginning', others: ['film', 'very', 'slow'] },
  { sentence: 'Is it really neccessary to bring a coat?', word: 'neccessary', fix: 'necessary', others: ['really', 'bring', 'coat'] },
];

function spellingHomophones(rng: Rng, d: Difficulty): GenOutput {
  const g = rng.pick(HOMOPHONES[d]);
  return {
    prompt: `Which word fills the gap?\n\n${block(g.sentence)}`,
    parts: [part(mc(rng, g.right, g.set))],
    hints: ['Homophones sound the same but are spelt differently and mean different things.', 'Try expanding a short form: does “they are”, “it is” or “who is” fit?'],
    solution: [`${g.sentence.replace('___', `**${g.right}**`)}`, g.why],
  };
}

function spellingWords(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const w = rng.pick(TRICKY);
    return {
      prompt: 'Which spelling is correct?',
      parts: [part(mc(rng, w.word, w.wrong))],
      hints: ['Say the word slowly, syllable by syllable.', 'Look for the letters people often miss or double by mistake.'],
      solution: [`The correct spelling is **${w.word}**.`, w.tip],
    };
  }
  if (d === 2) {
    const r = rng.pick(RULES);
    return {
      prompt: `Take the word **${r.base}** and ${r.ask}. Which spelling is correct?`,
      parts: [part(mc(rng, r.right, r.wrong))],
      hints: ['Check how the word ends: a short vowel and one consonant, a silent e, a y, or an f.', 'Then apply the rule for that ending.'],
      solution: [`**${r.right}**`, r.rule],
    };
  }
  const e = rng.pick(ERRORS);
  return {
    prompt: `One word in this sentence is spelt wrongly. Which one?\n\n${block(e.sentence)}`,
    parts: [part(mc(rng, e.word, e.others))],
    hints: ['Read the sentence one word at a time, slowly.', 'Look for a commonly misspelt word: a missing double letter, or i and e swapped.'],
    solution: [`**${e.word}** should be spelt **${e.fix}**.`],
  };
}

// ---------------------------------------------------------------------------------------------
// Lesson 4.2: Spoken language.
// ---------------------------------------------------------------------------------------------

const TOPICS = [
  { topic: 'why everyone should learn to swim', opener: 'Hands up if you can swim. Now imagine falling into deep water and not being able to.', points: ['why swimming saves lives', 'how few young people can swim far', 'how schools could help'] },
  { topic: 'the benefits of keeping a pet', opener: 'Last winter, when I had a bad week, it was my dog who cheered me up first.', points: ['how pets help our mood', 'how they teach responsibility', 'what a pet really costs'] },
  { topic: 'why the school day should start later', opener: 'How many of you felt truly awake in your first lesson this morning?', points: ['what research suggests about teenagers’ sleep', 'how a later start could help learning', 'the problems it would cause'] },
  { topic: 'the value of learning a second language', opener: 'Imagine arriving in a new country and not being able to ask the way.', points: ['how languages help with travel', 'how they open up jobs', 'how they help us understand others'] },
];

const GOOD_HABITS: Q[] = [
  { prompt: 'Which of these is good practice when giving a presentation?', right: 'Look up and make eye contact with different parts of the room', wrong: ['Read every word from your notes without looking up at all', 'Speak as quickly as you can so that you finish on time', 'Use as much slang as you can so that you sound relaxed'], why: 'Eye contact keeps the audience involved and shows confidence.' },
  { prompt: 'Which of these is good practice when giving a presentation?', right: 'Use short notes as prompts, rather than a full script', wrong: ['Write out every word and read the script aloud to them', 'Keep your notes hidden and try to remember every word', 'Show the audience your notes so they can read along too'], why: 'Prompt cards keep you on track while letting you speak naturally to the audience.' },
  { prompt: 'Which of these is good practice when giving a presentation?', right: 'Pause after an important point to let it sink in', wrong: ['Keep talking without any pauses so no one interrupts', 'Rush through the important points to save some time', 'Speak in the same flat tone throughout so you sound calm'], why: 'A pause gives the audience time to take in what you said and shows the point matters.' },
  { prompt: 'Which of these is good practice when giving a presentation?', right: 'Signpost your points: “First…”, “My second point is…”', wrong: ['Give all your points at once without saying how many', 'Keep the order secret so that the audience stays surprised', 'Repeat your first point several times instead of moving on'], why: 'Signposts help listeners follow, because they cannot look back up a page.' },
];

const ANSWERS: Q[] = [
  {
    prompt: 'After a talk on why the school day should start later, someone asks: “Wouldn’t a later finish clash with after-school clubs?” Which is the best reply?',
    right: 'It could, yes, so clubs might run at lunchtime or start a little later',
    wrong: ['That isn’t what my talk was about, so I won’t answer that one', 'Clubs don’t really matter, so it doesn’t make any difference', 'Well, I just think it should start later, and that is my view'],
    why: 'It accepts the point, answers it directly and offers a solution.',
  },
  {
    prompt: 'After a talk on keeping a pet, someone asks: “Aren’t pets too expensive for many families?” Which is the best reply?',
    right: 'They can be; that is why I suggested starting with a small pet',
    wrong: ['No, pets are not expensive at all, so that is simply wrong', 'I don’t know anything about the cost, so I can’t really say', 'Everybody can afford a pet if they really want one enough'],
    why: 'It admits the cost honestly and links back to a point from the talk.',
  },
  {
    prompt: 'You are asked a question you cannot answer. Which is the best reply?',
    right: 'That’s a good question; I’m not sure, but I could find out for you',
    wrong: ['That is a silly question, and I am not going to answer it now', 'I’ll just guess the answer, because guessing is better than nothing', 'Can somebody else answer this question for me instead, please?'],
    why: 'Being honest, polite and offering to follow up keeps the audience’s trust.',
  },
  {
    prompt: 'After a talk on learning a second language, someone asks: “Can’t we just use translation apps now?” Which is the best reply?',
    right: 'Apps help, but they can’t replace a real conversation with someone',
    wrong: ['Apps are rubbish, and anybody who uses one is just being lazy', 'I don’t use apps myself, so I can’t really comment on them', 'Yes, you’re right, so I suppose there is no point learning one'],
    why: 'It answers the question directly, gives a reason and keeps the argument of the talk.',
  },
  {
    prompt: 'After a talk on why everyone should learn to swim, someone asks: “Who would pay for all the lessons?” Which is the best reply?',
    right: 'Schools already have some funding, and local pools could offer cheaper sessions',
    wrong: ['I haven’t thought about that, and it isn’t really my problem to solve', 'Parents should just pay for it, and if they can’t, that is their problem', 'Money doesn’t matter when lives are at stake, so it isn’t a real question'],
    why: 'It treats the question seriously and suggests a practical answer.',
  },
  {
    prompt: 'Someone in the audience says firmly: “I completely disagree with you.” Which is the best reply?',
    right: 'That’s fair; could you tell me which point you disagree with most?',
    wrong: ['Well, you’re wrong, and I have nothing more to say about it', 'Fine, then I take back everything I have said in my talk', 'You weren’t listening properly, so I will say it all again'],
    why: 'It stays polite and invites a real discussion of the point.',
  },
];

const STANDARD: Q[] = [
  { prompt: 'Which sentence is in **standard English**, the right choice for a formal presentation?', right: 'We were surprised by the results of the survey', wrong: ['We was surprised by the results of the survey', 'Us lot was surprised by the results of the survey', 'We was well surprised by the results of the survey'], why: '“We were” is standard English; “we was” is not.' },
  { prompt: 'Which sentence is in **standard English**, the right choice for a formal presentation?', right: 'I did the research for this talk last week', wrong: ['I done the research for this talk last week', 'I done all the research for this here talk', 'Me and him done the research last week'], why: '“I did” is standard English; “I done” is not.' },
  { prompt: 'Which sentence is in **standard English**, the right choice for a formal presentation?', right: 'There aren’t any easy answers to this problem', wrong: ['There ain’t no easy answers to this problem', 'There isn’t no easy answers to this problem', 'There aren’t no easy answers to this problem'], why: 'Standard English uses one negative and avoids “ain’t”.' },
  { prompt: 'Which sentence is in **standard English**, the right choice for a formal presentation?', right: 'Those figures show how much has changed', wrong: ['Them figures show how much has changed', 'Them there figures show how much it’s changed', 'Them figures shows how much has changed'], why: '“Those figures” is standard English; “them figures” is not.' },
];

function presentation(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) return ask(rng, GOOD_HABITS, ['Think about what helps listeners follow and stay interested.', 'A presentation is spoken to people, not read to them.']);
  const t = rng.pick(TOPICS);
  if (d === 2) {
    const flat = `Hello. My presentation is about ${t.topic}. I am going to talk about it now.`;
    const rude = `Right, listen up, because ${t.topic} is obvious and you should already know it.`;
    const off = 'Before I start, does anyone know what time lunch is today, by the way?';
    return {
      prompt: `You are giving a presentation on ${t.topic}. Which opening is best?`,
      parts: [part(mc(rng, t.opener, [flat, rude, off]))],
      hints: ['A good opening grabs attention: a question, a story or a picture in words.', 'It should be polite and lead into the topic.'],
      solution: [t.opener, 'It catches the audience’s attention and leads straight into the topic.'],
    };
  }
  const steps = [
    `Grab attention: ${q(t.opener)}`,
    `Say what you will cover: ${t.points.join(', ')}`,
    `Make each point in turn, with a signpost: ${q(`First, ${t.points[0]}…`)}`,
    'Sum up the main points and end with a clear final message',
    'Thank the audience, and invite their questions',
  ];
  return order(rng, `Put the parts of a presentation on ${t.topic} in order.`, steps, ['Open by grabbing attention, then tell the audience what is coming.', 'End by summing up, then thank the audience and take questions.'], [steps.map((s, i) => `${i + 1}. ${s}`).join(' ')]);
}

function spokenQuestions(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) return ask(rng, STANDARD, ['Standard English is the form used in formal speech and writing.', 'Check the verbs (“we were”, “I did”) and the negatives.']);
  if (d === 2) return ask(rng, [ANSWERS[0], ANSWERS[2], ANSWERS[4]], ['A good answer is polite, honest and answers the actual question.', 'Avoid dismissing the questioner.']);
  return ask(rng, [ANSWERS[1], ANSWERS[3], ANSWERS[5]], ['The best answer takes the point seriously and gives a reason.', 'Link the answer back to your argument where you can.']);
}

export const UNIT3_SKILLS: SkillDef[] = [
  skill({ id: 'ex-c19-language', name: 'The language of nineteenth-century non-fiction', description: 'Work out the meaning of older words and long sentences from context, and explain the effect of a writer’s language.', outcomes: ['RN1'], lessonId: 'ex-3-1', gen: c19Language }),
  skill({ id: 'ex-c19-inference', name: 'Information, attitudes and context', description: 'Find information in a nineteenth-century text, infer the writer’s attitude, and use the text as evidence about its time.', outcomes: ['RN1'], lessonId: 'ex-3-1', gen: c19Inference }),
  skill({ id: 'ex-describe-detail', name: 'Describing a picture', description: 'Choose details that fit a picture, describe them precisely, and plan a description from the wide view to a small detail.', outcomes: ['WD1'], lessonId: 'ex-3-2', gen: describeDetail }),
  skill({ id: 'ex-describe-craft', name: 'Methods in descriptive writing', description: 'Recognise imagery and sound devices, show rather than tell, and revise a description for precision and variety.', outcomes: ['WD1'], lessonId: 'ex-3-2', gen: describeCraft }),
];

export const UNIT4_SKILLS: SkillDef[] = [
  skill({ id: 'ex-spelling-homophones', name: 'Homophones', description: 'Choose between words that sound alike: there, their and they’re; its and it’s; affect and effect; practice and practise.', outcomes: ['SP1'], lessonId: 'ex-4-1', gen: spellingHomophones }),
  skill({ id: 'ex-spelling-words', name: 'Spelling rules and tricky words', description: 'Spell commonly misspelt words, apply the rules for adding suffixes and plurals, and find a spelling mistake.', outcomes: ['SP1'], lessonId: 'ex-4-1', gen: spellingWords }),
  skill({ id: 'ex-presentation', name: 'Giving a presentation', description: 'Use the habits of a good speaker, choose an opening that grabs attention, and put the parts of a presentation in order.', outcomes: ['SL1'], lessonId: 'ex-4-2', gen: presentation }),
  skill({ id: 'ex-spoken-questions', name: 'Answering questions in standard English', description: 'Use standard English when speaking formally, and answer an audience’s questions politely and directly.', outcomes: ['SL1'], lessonId: 'ex-4-2', gen: spokenQuestions }),
];
