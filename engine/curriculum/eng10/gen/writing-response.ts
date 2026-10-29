/**
 * Grade 10 English, lessons 6.1 and 6.2: The Personal Response, and The Analytical Essay (10-F1).
 * Telling a response from a summary, connections that explain why they matter, controlling ideas,
 * strong theses and what is wrong with weak ones, point, evidence and analysis, and working
 * quotations into a sentence with square brackets and ellipses. The essays and paragraphs are about
 * the public-domain stories of Unit 1 (./texts.ts), and every quoted phrase is exact.
 */
import { fixedChoice, mc, part, skill, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { block, fill, people, q } from './common.ts';
import { CASK, FIRE, HEART, HOUR, MAGI, PAW, WINDOW, titled, type Story } from './texts.ts';

const RESPONSE = 'e10-6-1';
/** A choice quoted in a solution, with any quotation marks inside it made single. */
const ESSAY = 'e10-6-2';
const OUTCOMES = ['10-F1'];

// ---------------------------------------------------------------------------- lesson 6.1: the personal response

interface ResponseText {
  story: Story;
  /** Sentences that only retell the story. */
  summaries: string[];
  /** A longer retelling, as full as a strong response, that still only reports events. */
  retell: string;
  /** Strong response sentences: a connection to experience and why it matters. NAME is a friend or relative. */
  responses: string[];
  /** A connection that never says why it matters. */
  connection: string;
  /** A personal story that has nothing to do with the text. */
  offTopic: string;
  /** A strong controlling idea for a personal response. */
  controlling: string;
  /** Only a topic. */
  topic: string;
}

const RESPONSE_TEXTS: ResponseText[] = [
  {
    story: MAGI,
    summaries: ['Della sells her long hair for twenty dollars so that she can buy Jim a chain for his watch.', 'Jim sells his gold watch to buy Della a set of combs for her hair.'],
    retell: 'Della sells her long hair for twenty dollars to buy Jim a chain for his watch, while Jim sells his gold watch to buy Della a set of combs for her hair.',
    responses: [
      'When my cousin NAME sold {his} bike to pay for my birthday trip, I understood Della at last: a gift means most when the giver has given up something they love.',
      'Della’s tears over her hair reminded me of giving my only good football boots to my little brother, and I realized that a sacrifice can hurt and still feel right.',
    ],
    connection: 'This story reminded me of my cousin NAME, who once sold {his} bike to pay for my birthday trip, and of my aunt, who knits scarves for us every winter.',
    offTopic: 'My favourite holiday is the one when my whole family drives to my grandparents’ house by the sea, where we swim every morning and grill fish at night.',
    controlling: 'Like Della and Jim, I have learned that the presents I remember are the ones that cost the giver something they loved.',
    topic: 'Gifts and money',
  },
  {
    story: HOUR,
    summaries: ['Mrs. Mallard learns that her husband has died in a railway accident.', 'Mrs. Mallard locks herself in her room and sits in a chair facing the open window.'],
    retell: 'Mrs. Mallard learns that her husband has died in a railway accident, locks herself in her room, sits by the open window, and dies when he walks through the door alive.',
    responses: [
      'Mrs. Mallard’s secret joy reminded me of travelling alone to visit my aunt and feeling guilty for enjoying it; the story showed me that wanting freedom does not mean loving people less.',
      'When my friend NAME chose {his} own subjects instead of the ones {his} parents picked, {he} felt the same lightness as Mrs. Mallard, and the story showed me how heavy others’ plans for us can be.',
    ],
    connection: 'I have also sat by a window and looked out at the trees and the sky, just like Mrs. Mallard does, on a spring afternoon when I was at home from school with a cold.',
    offTopic: 'I once broke my arm falling off a wall in the park, and I had to wear a heavy plaster cast for six weeks, which made writing and playing football very difficult.',
    controlling: 'Mrs. Mallard’s hour of freedom made me realize that even people who love us can stop us from living our own lives.',
    topic: 'Freedom',
  },
  {
    story: PAW,
    summaries: ['Sergeant-Major Morris tells the Whites that three separate men could each have three wishes from the paw.', 'Mr. White wishes for two hundred pounds, and the next day the money arrives as compensation for his son’s death.'],
    retell: 'Sergeant-Major Morris warns the Whites about the paw, but Mr. White wishes for two hundred pounds, and the money arrives the next day as compensation for his son’s death.',
    responses: [
      'The Whites’ first wish reminded me of begging for a phone and then spending every evening on it instead of with my family; getting what you want can cost more than you expect.',
      'My friend NAME entered a competition only for the prize money and lost the fun of the game, so I understood why the story warns us about wanting things too badly.',
    ],
    connection: 'I have also had a wish that came true, when I asked for a bicycle for my twelfth birthday and my grandparents gave me a red one with a basket on the front.',
    offTopic: 'My uncle has a large, friendly dog that he takes for a long walk along the river every evening, whatever the weather, and sometimes I go along with them.',
    controlling: 'The Whites’ wishes made me think about the times I wanted something so badly that I forgot to ask what it might cost.',
    topic: 'Wishes',
  },
  {
    story: FIRE,
    summaries: ['The man ignores the old-timer’s warning that no one should travel alone in such extreme cold.', 'Snow falls from a spruce tree and puts out the man’s fire.'],
    retell: 'The man ignores the old-timer’s warning about travelling alone, soaks his feet in a hidden spring, and dies after snow falls from a spruce tree and puts out his fire.',
    responses: [
      'The man who ignored the old-timer’s advice reminded me of hiking without enough water because I was sure I knew the trail; the story showed me that confidence without caution is dangerous.',
      'My neighbour NAME, who has hiked all over the world, says that mountains do not care how strong you are, and after reading this story I finally understood what {he} means.',
    ],
    connection: 'I have also been very cold in winter, like the man in the story, when the heating in our flat broke for a whole week in January and we wore our coats indoors.',
    offTopic: 'My favourite food is my mother’s jollof rice, which she cooks in a huge pot for weddings and birthdays, and everyone in our family says hers is the best in the city.',
    controlling: 'The man’s death made me think about how often I ignore good advice simply because I think I already know better.',
    topic: 'Cold weather',
  },
  {
    story: HEART,
    summaries: ['The narrator kills the old man and hides the body under the floorboards.', 'The police arrive, and the narrator chats with them calmly at first.'],
    retell: 'The narrator kills the old man, hides the body under the floorboards, chats calmly with the police, and then confesses when he thinks he hears the heart still beating.',
    responses: [
      'The narrator’s panic reminded me of hiding a broken plate from my parents: the guilt grew louder in my head every hour until I told them, so I understood why he confesses.',
      'When my friend NAME copied a classmate’s homework, {he} could not stop thinking about it all week, and the story showed me how a secret can grow until it takes over your mind.',
    ],
    connection: 'I have also heard my own heart beating fast, just like the narrator does, when I waited backstage before a school concert and when I ran the last lap of a race.',
    offTopic: 'My older sister is learning to play the violin and practises scales in her room every evening, and she hopes to join the city youth orchestra next year.',
    controlling: 'The narrator’s confession made me realize that a guilty conscience can be harder to escape than any punishment.',
    topic: 'Crime',
  },
  {
    story: WINDOW,
    summaries: ['Framton Nuttel visits the Sappletons with letters of introduction from his sister.', 'When the hunters walk across the lawn, Framton grabs his stick and hat and runs away.'],
    retell: 'Framton Nuttel visits the Sappletons, listens to Vera’s story about the lost hunters, and runs away in terror when the three men walk back across the lawn towards the window.',
    responses: [
      'Vera’s invented tragedy reminded me of a ghost rumour about our school basement that I believed for a whole year; the story showed me how easily a confident voice makes us believe anything.',
      'My little cousin NAME tells such convincing stories that our family believed {he} had met a famous singer at the airport, so I laughed when Framton was fooled just as easily.',
    ],
    connection: 'I have also visited people I did not know, when my family stayed with my father’s old friends in another city and I had to make polite conversation all evening.',
    offTopic: 'My family keeps chickens in our back garden, and I collect the eggs every morning before school, which my grandmother then sells to our neighbours on Saturdays.',
    controlling: 'Framton’s terror made me think about how quickly I believe a story when the person telling it seems sure of themselves.',
    topic: 'Visitors',
  },
];

const VAGUE_RESPONSE = [
  'I liked this story a lot because it was interesting, and I think it is one of the best stories we have read in class, so I would recommend it to my friends.',
  'This was a really good story, and I enjoyed reading it very much because the writing was interesting and the characters were good, which kept me reading.',
  'I think this story is really good and everyone should read it, because it has a lot of interesting things in it and it made me think about many things in my life.',
];
const VAGUE_CONTROLLING = [
  'This story made me think about many different things, including my family, my friends, my school and some of my own experiences.',
  'In this response, I will talk about the story and its characters, and then I will explain some of the ways it connects to my life.',
  'There are many interesting things to say about this story and about my own life, and in this response I will discuss several of them.',
];

function personalResponse(rng: Rng, d: Difficulty): GenOutput {
  const t = rng.pick(RESPONSE_TEXTS);
  const cast = people(rng, 1);
  const f = (s: string) => fill(s, cast);
  if (d === 1) {
    const isResponse = rng.chance(0.5);
    const s = f(isResponse ? rng.pick(t.responses) : rng.pick(t.summaries));
    return {
      prompt: `A student wrote this sentence about ${titled(t.story)}:\n\n${block(s)}\n\nIs it a **summary** of the story or a **personal response** to it?`,
      parts: [part(fixedChoice(['A summary: it retells what happens', 'A personal response: it connects the story to the writer’s own life'], isResponse ? 1 : 0))],
      hints: ['A summary only reports events from the story. A personal response brings in the writer’s own experience, thoughts or feelings.'],
      solution: isResponse
        ? ['The writer connects the story to their own experience and says what it taught them, so this is a personal response.']
        : ['The sentence only reports what happens in the story, with nothing about the writer’s own life or thoughts, so it is a summary.'],
    };
  }
  if (d === 2) {
    const right = f(rng.pick(t.responses));
    const wrong = rng.shuffle([f(t.connection), t.retell, rng.pick(VAGUE_RESPONSE), t.offTopic]).slice(0, 3);
    return {
      prompt: `Which sentence from a personal response to ${titled(t.story)} best **connects the story to the writer’s experience and explains why the connection matters**?`,
      parts: [part(mc(rng, right, wrong))],
      hints: ['A strong connection does two things: it links something specific in the story to something in your own life, and it says what the link shows you.'],
      solution: [`${q(right)} links something specific in the story to the writer’s own life and says what the writer learned from the link.`, 'Each of the others only retells the story, makes a connection without explaining it, praises the story vaguely, or tells a personal story that has nothing to do with the text.'],
    };
  }
  const wrong = [t.topic, t.retell, rng.pick(VAGUE_CONTROLLING)];
  return {
    prompt: `Which is the best **controlling idea** for a personal response to ${titled(t.story)}?`,
    parts: [part(mc(rng, t.controlling, wrong))],
    hints: ['A controlling idea is a complete sentence that states the main insight your response will explore: what the story made you think or realize about life.'],
    solution: [`${q(t.controlling)} is a complete statement that links the story to the writer’s own thinking, so every paragraph can explore it.`, `“${t.topic}” is only a topic, and the others retell the plot or say nothing specific.`],
  };
}

// ---------------------------------------------------------------------------- lesson 6.2: thesis statements

type Weak = 'fact' | 'announcement' | 'broad' | 'summary' | 'opinion';
const WEAK_LABEL: Record<Weak, string> = {
  fact: 'It states a fact that no one would argue with.',
  announcement: 'It announces the topic instead of making a claim.',
  broad: 'It is too broad to prove in one essay.',
  summary: 'It retells the plot instead of making a claim.',
  opinion: 'It gives an opinion but no reason or specific focus.',
};
/** Labels that overlap with each kind of weak thesis, never offered alongside it. */
const WEAK_OVERLAP: Record<Weak, Weak[]> = { fact: ['summary'], summary: ['fact'], opinion: ['broad'], broad: ['opinion', 'fact'], announcement: [] };

interface ThesisSet {
  story: Story;
  strong: string[];
  fact: string;
  announcement: string;
  summary: string;
  opinion: string;
}

const THESES: ThesisSet[] = [
  {
    story: MAGI,
    strong: [
      'In “The Gift of the Magi”, O. Henry uses the couple’s useless gifts to show that love is measured by sacrifice, not by money.',
      'O. Henry’s ironic ending in “The Gift of the Magi” turns two wasted presents into proof that Della and Jim are rich in the one thing that matters: love.',
    ],
    fact: '“The Gift of the Magi” was written by O. Henry, published in 1905, and is set on Christmas Eve in a small furnished flat in New York.',
    announcement: 'In this essay, I will discuss the theme of love in “The Gift of the Magi”, looking at Della, at Jim and at the gifts they buy each other.',
    summary: 'In “The Gift of the Magi”, Della sells her hair to buy Jim a watch chain, and Jim sells his watch to buy Della a set of combs.',
    opinion: '“The Gift of the Magi” is a really good story that I enjoyed reading very much, and I think it is one of the best stories in our whole unit.',
  },
  {
    story: HOUR,
    strong: [
      'In “The Story of an Hour”, Kate Chopin uses the spring view from Mrs. Mallard’s window to show that her grief gives way to a joyful, and finally fatal, longing for freedom.',
      'Kate Chopin’s ironic ending in “The Story of an Hour” shows that the people around Mrs. Mallard never understand the freedom she secretly longed for.',
    ],
    fact: '“The Story of an Hour” is a short story by Kate Chopin, first published in 1894, about a woman who hears that her husband has been killed.',
    announcement: 'This essay is about the ending of “The Story of an Hour”, and in it I am going to look at Mrs. Mallard, her sister and what happens when her husband comes home.',
    summary: 'In “The Story of an Hour”, Mrs. Mallard hears that her husband has died, sits alone in her room, and dies when he walks through the door alive.',
    opinion: 'The ending of “The Story of an Hour” is very shocking, and I think it is one of the most surprising endings of any story I have ever read.',
  },
  {
    story: PAW,
    strong: [
      'In “The Monkey’s Paw”, W. W. Jacobs uses the Whites’ three wishes to show that trying to control fate brings sorrow instead of happiness.',
      'W. W. Jacobs builds suspense in “The Monkey’s Paw” by warning the reader early, through the sergeant-major, so that every wish the Whites make is filled with dread.',
    ],
    fact: '“The Monkey’s Paw” was written by W. W. Jacobs, published in 1902, and tells the story of the White family and a dried paw that grants wishes.',
    announcement: 'I am going to write about the monkey’s paw in “The Monkey’s Paw”, and I will explain what the paw is, where it comes from and what the Whites do with it.',
    summary: 'In “The Monkey’s Paw”, the Whites wish on a magic paw for two hundred pounds and receive it as compensation for their son’s death.',
    opinion: '“The Monkey’s Paw” is a really scary story, and I think it is easily the most frightening thing that I have read in English class this year.',
  },
  {
    story: WINDOW,
    strong: [
      'In “The Open Window”, Saki shows through Vera’s invented tragedy that a calm, confident storyteller can make people believe almost anything.',
      'Saki uses Framton Nuttel’s nervousness in “The Open Window” to show that people are most easily fooled when a story confirms what they already fear.',
    ],
    fact: '“The Open Window” is a short story by Saki, published in 1914, in which a nervous young man visits a family in the English countryside.',
    announcement: 'This essay will look at the character of Vera in “The Open Window”, including what she says to Framton, how she behaves and what she does at the end.',
    summary: 'In “The Open Window”, Vera tells Framton Nuttel that her aunt’s husband and brothers disappeared three years ago, and Framton runs away when they return.',
    opinion: '“The Open Window” has a really funny ending, and I think it is the most entertaining and enjoyable story that we have read in this whole unit.',
  },
  {
    story: FIRE,
    strong: [
      'In “To Build a Fire”, Jack London contrasts the man’s confidence with the dog’s instinct to show that a lack of imagination can be deadly in the face of nature.',
      'Jack London presents nature in “To Build a Fire” as neither cruel nor kind but simply indifferent, which makes the man’s overconfidence all the more fatal.',
    ],
    fact: '“To Build a Fire” is a short story by Jack London, published in 1908, about a man and a dog travelling alone through the Yukon in extreme cold.',
    announcement: 'In my essay, I will talk about nature in “To Build a Fire”, including the cold, the snow, the frozen creek and the man’s dog, and what each one is like.',
    summary: 'In “To Build a Fire”, a man travels alone through the frozen Yukon, soaks his feet, fails to keep a fire burning and freezes to death.',
    opinion: '“To Build a Fire” is a very sad story, and I think it is one of the most depressing stories I have ever had to read for an English class.',
  },
  {
    story: HEART,
    strong: [
      'In “The Tell-Tale Heart”, Edgar Allan Poe uses the narrator’s insistence that he is sane to show how guilt can destroy a mind from within.',
      'Poe’s first-person narration in “The Tell-Tale Heart” lets the reader see the narrator’s madness more clearly than he can see it himself.',
    ],
    fact: '“The Tell-Tale Heart” is a short story by Edgar Allan Poe, first published in 1843, and it is told by a narrator who is never named.',
    announcement: 'This essay is going to discuss the narrator of “The Tell-Tale Heart”, looking at what he says, what he does and how he speaks to the reader.',
    summary: 'In “The Tell-Tale Heart”, a narrator kills an old man, hides the body under the floor and confesses when he thinks he hears the heart still beating.',
    opinion: '“The Tell-Tale Heart” is a really creepy story, and I think it is one of the scariest and strangest stories I have ever read in my life.',
  },
  {
    story: CASK,
    strong: [
      'In “The Cask of Amontillado”, Poe makes Montresor’s calm, friendly manner more chilling than any open threat, showing how revenge can hide behind a smile.',
      'Poe fills “The Cask of Amontillado” with verbal irony, so that the reader understands Montresor’s plan long before Fortunato does.',
    ],
    fact: '“The Cask of Amontillado” is a short story by Edgar Allan Poe, published in 1846, about a man named Montresor and his enemy Fortunato.',
    announcement: 'This essay will talk about revenge in “The Cask of Amontillado”, and it will look at Montresor, at Fortunato and at the catacombs where the story ends.',
    summary: 'In “The Cask of Amontillado”, Montresor lures Fortunato into the catacombs with the promise of rare wine and walls him up alive.',
    opinion: 'Montresor is a very bad person, and I think he is one of the most evil and frightening characters in any of the stories we have read this year.',
  },
];

const BROAD = [
  'Stories have always taught readers many important lessons about life, love, money, family and the difficult choices people make every day.',
  'Literature from every country and every century has always been full of characters who learn hard lessons about themselves and the world.',
  'Writers use many different techniques, from imagery and irony to symbols and dialogue, to make their stories interesting and meaningful.',
  'Short stories written long ago are still worth reading today, because people everywhere still face the same problems and the same feelings.',
];

function weakText(s: ThesisSet, w: Weak, rng: Rng): string {
  return w === 'broad' ? rng.pick(BROAD) : s[w];
}

function thesis(rng: Rng, d: Difficulty): GenOutput {
  const s = rng.pick(THESES);
  const right = rng.pick(s.strong);
  if (d === 3) {
    const w = rng.pick(['fact', 'announcement', 'broad', 'summary', 'opinion'] as Weak[]);
    const others = rng.shuffle((Object.keys(WEAK_LABEL) as Weak[]).filter((x) => x !== w && !WEAK_OVERLAP[w].includes(x))).slice(0, 3);
    return {
      prompt: `A student wrote this thesis for an essay on ${titled(s.story)}:\n\n${block(weakText(s, w, rng))}\n\nWhat is the **main weakness** of this thesis?`,
      parts: [part(mc(rng, WEAK_LABEL[w], others.map((x) => WEAK_LABEL[x])))],
      hints: ['A strong thesis makes a specific claim that a reader could disagree with, and it says how or why the story does something.'],
      solution: [`${WEAK_LABEL[w]}`, `A stronger thesis would be: ${q(right)}`],
    };
  }
  const pool: Weak[] = d === 1 ? ['fact', 'announcement', 'summary'] : ['summary', 'broad', 'opinion', 'announcement'];
  const picked = d === 1 ? rng.sample(pool, 2) : rng.sample(pool, 3);
  const wrong = picked.map((w) => weakText(s, w, rng));
  return {
    prompt: `Which is the strongest **thesis** for an analytical essay on ${titled(s.story)}?`,
    parts: [part(mc(rng, right, wrong))],
    hints: ['A strong thesis is arguable (someone could disagree), specific (it names what in the story you will discuss) and analytical (it says how or why, not just what happens).'],
    solution: [`${q(right)} makes a specific claim about how the story works and what it shows, so a whole essay can prove it.`, `The others ${list3(picked)}.`],
  };
}

const WEAK_SHORT: Record<Weak, string> = {
  fact: 'state a fact',
  announcement: 'announce a topic',
  broad: 'make a claim too broad to prove',
  summary: 'retell the plot',
  opinion: 'give an opinion with no reason',
};
function list3(ws: Weak[]): string {
  const parts = ws.map((w) => WEAK_SHORT[w]);
  return parts.length === 2 ? `${parts[0]} or ${parts[1]}` : `${parts.slice(0, -1).join(', ')} or ${parts[parts.length - 1]}`;
}

// ---------------------------------------------------------------------------- lesson 6.2: point, evidence and analysis

interface Paragraph {
  story: Story;
  point: string;
  evidence: string;
  analysis: string;
  /** Repeats the quotation in other words without explaining it. */
  paraphrase: string;
  vague: string;
  /** Moves on to a new point instead of analysing. */
  newPoint: string;
}

const PARAGRAPHS: Paragraph[] = [
  {
    story: MAGI,
    point: 'O. Henry shows from the very first lines that Della and Jim are poor.',
    evidence: 'The story begins with Della counting her money: “One dollar and eighty-seven cents.”',
    analysis: 'The exact sum, repeated twice in the opening paragraph, makes the reader feel how carefully Della has counted every cent and how little she has to spend.',
    paraphrase: 'This shows that Della has exactly one dollar and eighty-seven cents, the amount of money she has saved and counted at the start of the story.',
    vague: 'This quotation is very important because it tells us a lot about the story and the characters, and it is a good example of O. Henry’s writing.',
    newPoint: 'Della also has beautiful long hair that she is very proud of, and later in the story she sells it to Madame Sofronie for twenty dollars.',
  },
  {
    story: FIRE,
    point: 'Jack London presents the man as practical but unable to imagine danger.',
    evidence: 'The narrator says that the cold “impressed him as being cold and uncomfortable, and that was all.”',
    analysis: 'The words “and that was all” show that the man notices the cold as a fact but never thinks about what it could do to him.',
    paraphrase: 'This means that, to the man, the cold was simply cold and uncomfortable, which is exactly what the narrator says in the sentence above.',
    vague: 'This is a really good quotation about the man, and it tells the reader a lot of important things about him and about the weather.',
    newPoint: 'The dog, on the other hand, knows by instinct that it is far too cold to travel, and it would rather stay somewhere warm and wait.',
  },
  {
    story: HEART,
    point: 'Poe makes the narrator’s own words prove that he cannot be trusted.',
    evidence: 'The narrator claims to have heard “many things in hell” and then asks, “How, then, am I mad?”',
    analysis: 'A sane person would not boast of hearing sounds from hell, so his question makes the reader doubt him more, not less.',
    paraphrase: 'This shows that the narrator says he heard many things in hell, and then he asks the reader how, after that, anyone could think he is mad.',
    vague: 'This quotation shows a lot about the narrator and the way he thinks, and it is one of the most important and memorable lines in the story.',
    newPoint: 'Later in the story, the narrator kills the old man and hides the body under the floorboards of the old man’s room before the police arrive.',
  },
  {
    story: HOUR,
    point: 'Kate Chopin uses the view from the window to show the new life Mrs. Mallard senses.',
    evidence: 'Mrs. Mallard sees “the tops of trees that were all aquiver with the new spring life.”',
    analysis: 'Spring is the season of new beginnings, so trees “aquiver” with life suggest the freedom that is beginning to stir inside her.',
    paraphrase: 'This shows that Mrs. Mallard can see the tops of the trees outside her window, and that the trees are moving because it is spring.',
    vague: 'This is a beautiful description that adds a lot to the story, and it is one of the best and most memorable images that Kate Chopin uses.',
    newPoint: 'Mrs. Mallard’s sister, Josephine, is worried about her and kneels outside the locked door, begging her to open it before she makes herself ill.',
  },
  {
    story: PAW,
    point: 'W. W. Jacobs warns the reader early that the paw will bring sorrow.',
    evidence: 'The sergeant-major explains that the fakir “wanted to show that fate ruled people’s lives, and that those who interfered with it did so to their sorrow.”',
    analysis: 'The word “sorrow” prepares the reader to expect that every wish the Whites make will cost them something.',
    paraphrase: 'This means that the fakir put a spell on the paw because he wanted to show that fate ruled the lives of the people who used it.',
    vague: 'This quotation is important to the story because it tells the reader something about the paw and about the sergeant-major who brings it.',
    newPoint: 'Herbert White jokes about the paw and does not take it seriously, even telling his father to wish to be an emperor.',
  },
  {
    story: WINDOW,
    point: 'Saki shows that Vera is a skilled and confident storyteller.',
    evidence: 'The narrator introduces her as “a very self-possessed young lady of fifteen” when Framton first arrives.',
    analysis: 'The word “self-possessed” suggests that she is calm and in control, which is exactly what she needs to make Framton believe her invented tragedy.',
    paraphrase: 'This shows that Vera is a self-possessed young lady who is fifteen years old, which is how the narrator describes her when she first appears.',
    vague: 'This quotation tells us a lot about Vera and the kind of person she is, and it is an important detail for the reader to notice early in the story.',
    newPoint: 'Framton Nuttel has come to the country to rest his nerves, and his sister has given him letters of introduction to people who live nearby.',
  },
  {
    story: CASK,
    point: 'Poe makes Montresor’s calm desire for revenge chilling.',
    evidence: 'Montresor admits that he kept smiling at Fortunato, who “did not perceive that my smile *now* was at the thought of his immolation.”',
    analysis: 'Behind the friendly smile is the thought of Fortunato’s death, so the reader sees that Montresor’s friendliness is a mask for murder.',
    paraphrase: 'This shows that Fortunato did not notice what Montresor’s smile really meant, even though Montresor kept smiling at him in his usual way.',
    vague: 'This is an interesting quotation that tells the reader a lot about the two men, and it is one of the most important sentences in the whole story.',
    newPoint: 'Fortunato is dressed in a jester’s costume for the carnival, with a striped suit and a cap with bells, when Montresor meets him in the street.',
  },
  {
    story: PAW,
    point: 'W. W. Jacobs shows that Mr. White cannot resist the paw, even after he has been warned.',
    evidence: 'When Morris throws the paw on the fire, “White, with a slight cry, stooped down and snatched it off.”',
    analysis: 'The word “snatched” shows how quickly and desperately he grabs the paw, which hints that his desire will overcome his good sense.',
    paraphrase: 'This shows that Mr. White gave a slight cry, stooped down and snatched the paw off the fire after Morris threw it into the flames.',
    vague: 'This quotation is a good example of what happens in the story, and it is an exciting moment that tells us a lot about the White family.',
    newPoint: 'Later that night, Herbert makes fun of the paw and jokes that his father will find the money in a big bag in the middle of his bed.',
  },
  {
    story: WINDOW,
    point: 'Saki shows that Framton is so wrapped up in himself that he never questions Vera’s story.',
    evidence: 'He believes that “total strangers and chance acquaintances are hungry for the least detail of one’s ailments and infirmities, their cause and cure.”',
    analysis: 'Someone who thinks strangers want to hear about his illnesses notices only himself, so he is exactly the kind of listener Vera can fool.',
    paraphrase: 'This means that Framton believes total strangers and chance acquaintances want to hear about his ailments, and about their cause and cure.',
    vague: 'This quotation says a lot about Framton and his character, and it is one of the most interesting and important details in the whole story.',
    newPoint: 'Mrs. Sappleton talks happily about the shooting and the scarcity of birds, and she keeps glancing past Framton towards the open window.',
  },
  {
    story: FIRE,
    point: 'Jack London makes the cold itself feel threatening long before the man understands his danger.',
    evidence: 'When the man spits, “before it could fall to the snow, the spittle crackled.”',
    analysis: 'Spit that freezes in mid-air shows the reader how deadly the cold is, yet the man is only “startled” before he walks on.',
    paraphrase: 'This shows that when the man spat, the spit made a crackling sound in the air before it could fall down onto the snow below.',
    vague: 'This is a very interesting detail that the reader will remember, and it is one of the best descriptions that Jack London writes in the story.',
    newPoint: 'The man is heading for the old claim on Henderson Creek, where the boys are already waiting for him with a fire and a hot supper.',
  },
];

type Role = 'point' | 'evidence' | 'analysis';
const ROLE_LABEL: Record<Role, string> = {
  point: 'The point: the topic sentence',
  evidence: 'Evidence: words from the story',
  analysis: 'Analysis: explaining the evidence',
};
const ROLE_WHY: Record<Role, string> = {
  point: 'It states the claim that the paragraph will prove, so it is the point, or topic sentence.',
  evidence: 'It gives words from the story itself, so it is the evidence.',
  analysis: 'It explains how the quoted words support the point, so it is the analysis.',
};

function evidenceAnalysis(rng: Rng, d: Difficulty): GenOutput {
  const p = rng.pick(PARAGRAPHS);
  if (d === 1 || (d === 2 && rng.chance(0.5))) {
    const roles: Role[] = ['point', 'evidence', 'analysis'];
    const r = d === 1 ? rng.pick(['point', 'evidence'] as Role[]) : rng.pick(roles);
    const n = roles.indexOf(r) + 1;
    return {
      prompt: `Read this body paragraph from an essay on ${titled(p.story)}:\n\n${block(`(1) ${p.point} (2) ${p.evidence} (3) ${p.analysis}`)}\n\nWhat is the job of **sentence ${n}**?`,
      parts: [part(fixedChoice(roles.map((x) => ROLE_LABEL[x]), roles.indexOf(r)))],
      hints: ['A body paragraph makes a point, backs it up with evidence from the text, and then analyses the evidence: it explains how the evidence proves the point.'],
      solution: [ROLE_WHY[r]],
    };
  }
  const wrong = d === 2 ? rng.sample([p.paraphrase, p.vague, p.newPoint], 2) : [p.paraphrase, p.vague, p.newPoint];
  return {
    prompt: `A student is writing a body paragraph on ${titled(p.story)}:\n\n${block(`${p.point} ${p.evidence}`)}\n\nWhich sentence would best **analyse** the evidence?`,
    parts: [part(mc(rng, p.analysis, wrong))],
    hints: ['Analysis explains *how* the evidence proves the point: it looks closely at particular words or details and says what they show. Repeating the quotation in other words is not analysis.'],
    solution: [`${q(p.analysis)} explains how the quoted words support the point.`, 'Each of the others only repeats the quotation in other words, praises it vaguely, or moves on to a new point, so none of them explains the evidence.'],
  };
}

// ---------------------------------------------------------------------------- lesson 6.2: integrating quotations

interface Embed {
  story: Story;
  correct: string;
  dropped: string;
  broken: string;
  unquoted: string;
}

/** Ways to work a quotation into a sentence. Each quoted phrase is copied exactly from the story. */
const EMBEDS: Embed[] = [
  {
    story: MAGI,
    correct: 'After her cry, Della “looked out dully at a gray cat walking a gray fence in a gray backyard” as if the whole world had lost its colour.',
    dropped: 'Della is unhappy after her cry. “She stood by the window and looked out dully at a gray cat walking a gray fence in a gray backyard.”',
    broken: 'After her cry, Della “She stood by the window and looked out dully at a gray cat” as if the whole world had lost its colour.',
    unquoted: 'After her cry, Della looked out dully at a gray cat walking a gray fence in a gray backyard, which shows her sadness.',
  },
  {
    story: MAGI,
    correct: 'Jim “needed a new overcoat and he was without gloves” in the middle of winter, yet he sold his gold watch to buy Della’s combs.',
    dropped: 'Jim is poor, and the story shows it in a small detail about his clothes. “He needed a new overcoat and he was without gloves.”',
    broken: 'Jim is poor in the middle of winter because “He needed a new overcoat and he was without gloves” shows it.',
    unquoted: 'Jim needed a new overcoat and he was without gloves in the middle of winter, so he is clearly a poor man.',
  },
  {
    story: FIRE,
    correct: 'London calls the man “quick and alert in the things of life, but only in the things, and not in the significances” to show that he sees facts but not their meaning.',
    dropped: 'The man does not think deeply about the danger he is in, even after the old-timer’s warning. “The trouble with him was that he was without imagination.”',
    broken: 'London describes the man as “The trouble with him was that he was without imagination” and careless about the cold and its dangers.',
    unquoted: 'London says that the trouble with him was that he was without imagination, which is the main reason why he dies alone in the snow.',
  },
  {
    story: HOUR,
    correct: 'Mrs. Mallard realizes that in the years ahead “she would live for herself” and no longer for anyone else.',
    dropped: 'Mrs. Mallard feels free. “There would be no one to live for her during those coming years; she would live for herself.”',
    broken: 'Mrs. Mallard realizes that “There would be no one to live for her during those coming years” she is happy.',
    unquoted: 'Mrs. Mallard realizes that there would be no one to live for her during those coming years, so she would live for herself.',
  },
  {
    story: HEART,
    correct: 'The narrator says the old man had “the eye of a vulture” and decides to kill him because of it.',
    dropped: 'The narrator hates the old man’s eye. “He had the eye of a vulture—a pale blue eye, with a film over it.”',
    broken: 'The narrator says “He had the eye of a vulture” is the reason why he hates the old man.',
    unquoted: 'The narrator says the old man had the eye of a vulture, a pale blue eye with a film over it.',
  },
  {
    story: WINDOW,
    correct: 'Framton tells Mrs. Sappleton that his doctors insist on “an absence of mental excitement” only moments before he sees the hunters crossing the lawn and runs in terror.',
    dropped: 'Framton is ill. “The doctors agree in ordering me complete rest, an absence of mental excitement, and avoidance of anything in the nature of violent physical exercise,” announced Framton.',
    broken: 'Framton’s doctors order “The doctors agree in ordering me complete rest” for his nerves, which is why he has come to stay in the country.',
    unquoted: 'Framton says that his doctors agree in ordering him complete rest and an absence of mental excitement, which is why he is in the country.',
  },
];

const EMBED_WHY = {
  correct: 'The quoted words fit smoothly into the writer’s own sentence, which stays grammatical from start to finish, and the quotation marks show exactly which words are the author’s.',
  dropped: 'a “dropped” quotation stands alone, with nothing to introduce it or connect it to the writer’s point',
  broken: 'the quotation breaks the grammar of the sentence it is placed in',
  unquoted: 'the author’s exact words are used without quotation marks, as if they were the student’s own',
};

interface Bracket {
  story: Story;
  original: string;
  /** What the student needs to change. */
  need: string;
  correct: string;
  parens: string;
  silent: string;
  misused: string;
}

const BRACKETS: Bracket[] = [
  { story: MAGI, original: 'He looked thin and very serious.', need: 'make clear that “He” means Jim', correct: '“[Jim] looked thin and very serious.”', parens: '“(Jim) looked thin and very serious.”', silent: '“Jim looked thin and very serious.”', misused: '“He looked [thin and very serious].”' },
  { story: HOUR, original: 'There would be no one to live for her during those coming years; she would live for herself.', need: 'quote only the end and make clear that “she” means Mrs. Mallard', correct: '“[Mrs. Mallard] would live for herself.”', parens: '“(Mrs. Mallard) would live for herself.”', silent: '“Mrs. Mallard would live for herself.”', misused: '“she [would live] for herself.”' },
  { story: CASK, original: 'The thousand injuries of Fortunato I had borne as I best could; but when he ventured upon insult, I vowed revenge.', need: 'quote only the last words and replace “I” with the narrator’s name, Montresor', correct: '“[Montresor] vowed revenge.”', parens: '“(Montresor) vowed revenge.”', silent: '“Montresor vowed revenge.”', misused: '“I [vowed revenge].”' },
  { story: FIRE, original: 'The trouble with him was that he was without imagination.', need: 'quote only the end and make clear that “he” means the man', correct: '“[The man] was without imagination.”', parens: '“(The man) was without imagination.”', silent: '“The man was without imagination.”', misused: '“he was [without imagination].”' },
  { story: PAW, original: 'He took the paw, and dangling it between his forefinger and thumb, suddenly threw it upon the fire. White, with a slight cry, stooped down and snatched it off.', need: 'quote the second sentence and make clear that “it” means the paw', correct: '“White, with a slight cry, stooped down and snatched [the paw] off.”', parens: '“White, with a slight cry, stooped down and snatched (the paw) off.”', silent: '“White, with a slight cry, stooped down and snatched the paw off.”', misused: '“White, with a slight cry, [stooped down] and snatched it off.”' },
  { story: MAGI, original: 'As soon as she saw it she knew that it must be Jim’s.', need: 'quote “she knew that it must be Jim’s” but change “knew” to the present tense, “knows”, to match an essay written in the present tense', correct: 'As soon as Della sees the chain, she “[knows] that it must be Jim’s.”', parens: 'As soon as Della sees the chain, she “(knows) that it must be Jim’s.”', silent: 'As soon as Della sees the chain, she “knows that it must be Jim’s.”', misused: 'As soon as Della sees the chain, she “knew [that it must be Jim’s].”' },
];

interface Ellipsis {
  story: Story;
  original: string;
  correct: string;
  silent: string;
  /** Two more wrong versions: the meaning changed, or the sentence left broken. */
  wrong: [string, string];
}

const ELLIPSES: Ellipsis[] = [
  {
    story: WINDOW,
    original: '“The doctors agree in ordering me complete rest, an absence of mental excitement, and avoidance of anything in the nature of violent physical exercise,” announced Framton',
    correct: '“The doctors agree in ordering me complete rest … and avoidance of anything in the nature of violent physical exercise”',
    silent: '“The doctors agree in ordering me complete rest and avoidance of anything in the nature of violent physical exercise”',
    wrong: ['“The doctors agree in ordering me … violent physical exercise”', '“The doctors agree … an absence of … physical”'],
  },
  {
    story: HEART,
    original: 'The disease had sharpened my senses—not destroyed—not dulled them.',
    correct: '“The disease had sharpened my senses … not dulled them.”',
    silent: '“The disease had sharpened my senses not dulled them.”',
    wrong: ['“The disease had … destroyed … them.”', '“The disease had sharpened my … not.”'],
  },
  {
    story: CASK,
    original: '“Enough,” he said; “the cough is a mere nothing; it will not kill me. I shall not die of a cough.”',
    correct: '“the cough is a mere nothing … I shall not die of a cough”',
    silent: '“the cough is a mere nothing; I shall not die of a cough”',
    wrong: ['“the cough … will … kill me”', '“the cough is a … not die of”'],
  },
  {
    story: MAGI,
    original: 'Pennies saved one and two at a time by bulldozing the grocer and the vegetable man and the butcher until one’s cheeks burned with the silent imputation of parsimony that such close dealing implied.',
    correct: '“Pennies saved one and two at a time by bulldozing the grocer … until one’s cheeks burned with the silent imputation of parsimony that such close dealing implied.”',
    silent: '“Pennies saved one and two at a time by bulldozing the grocer until one’s cheeks burned with the silent imputation of parsimony that such close dealing implied.”',
    wrong: ['“Pennies saved … the butcher until one’s … implied.”', '“Pennies saved one and two at a time … the silent imputation.”'],
  },
  {
    story: FIRE,
    original: 'It was a clear day, and yet there seemed an intangible pall over the face of things, a subtle gloom that made the day dark, and that was due to the absence of sun.',
    correct: '“It was a clear day, and yet there seemed … a subtle gloom that made the day dark”',
    silent: '“It was a clear day, and yet there seemed a subtle gloom that made the day dark”',
    wrong: ['“It was a clear day … the day dark … sun”', '“It was a clear day, and yet … made the day”'],
  },
];

function quotations(rng: Rng, d: Difficulty): GenOutput {
  const kind = d === 1 ? 'embed' : d === 2 ? rng.pick(['embed', 'embed', 'bracket']) : rng.pick(['bracket', 'ellipsis']);
  if (kind === 'embed') {
    const e = rng.pick(EMBEDS);
    const keys = d === 1 ? (rng.sample(['dropped', 'unquoted', 'broken'], 2) as Array<'dropped' | 'broken' | 'unquoted'>) : (['dropped', 'broken', 'unquoted'] as const);
    return {
      prompt: `Which sentence from an essay on ${titled(e.story)} works its quotation in **correctly**?`,
      parts: [part(mc(rng, e.correct, keys.map((k) => e[k])))],
      hints: ['A well-integrated quotation is introduced or embedded in your own sentence, the whole sentence still reads grammatically, and quotation marks surround exactly the author’s words.'],
      solution: [EMBED_WHY.correct, `In the others, ${keys.map((k) => EMBED_WHY[k]).join('; ')}.`],
    };
  }
  if (kind === 'bracket') {
    const b = rng.pick(BRACKETS);
    return {
      prompt: `The original sentence from ${titled(b.story)}:\n\n${block(b.original)}\n\nA student wants to ${b.need}. Which version is correct?`,
      parts: [part(mc(rng, b.correct, [b.parens, b.silent, b.misused]))],
      hints: ['Square brackets [ ] mark words that you have changed or added inside a quotation, so the reader knows they are yours and not the author’s.'],
      solution: [`${b.correct} puts square brackets around exactly the words the student changed.`, 'Round brackets would look like the author’s own punctuation, changing words without brackets misquotes the author, and brackets around unchanged words mark nothing.'],
    };
  }
  const e = rng.pick(ELLIPSES);
  return {
    prompt: `The original from ${titled(e.story)}:\n\n${block(e.original)}\n\nWhich shortened quotation is **correct**: it marks the missing words, keeps the author’s meaning and still reads as a sentence?`,
    parts: [part(mc(rng, e.correct, [e.silent, ...e.wrong]))],
    hints: ['An ellipsis ( … ) shows that words have been left out. The words that remain must be exact, must keep the author’s meaning, and must still make sense.'],
    solution: [`${e.correct} leaves out words in one place, marks the gap with an ellipsis, and still says what the author said.`, 'One version leaves words out with no ellipsis, and the others change the meaning or leave fragments that no longer read as a sentence.'],
  };
}

export const RESPONSE_SKILLS: SkillDef[] = [
  skill({
    id: 'e10-personal-response',
    name: 'The personal response',
    description: 'Tell a personal response from a summary, choose connections that explain why they matter, and choose a strong controlling idea.',
    outcomes: OUTCOMES,
    lessonId: RESPONSE,
    format: 'mc',
    gen: personalResponse,
  }),
  skill({
    id: 'e10-thesis',
    name: 'Thesis statements',
    description: 'Choose an arguable, specific, analytical thesis, and say what is wrong with a weak one.',
    outcomes: OUTCOMES,
    lessonId: ESSAY,
    format: 'mc',
    gen: thesis,
  }),
  skill({
    id: 'e10-evidence-analysis',
    name: 'Point, evidence and analysis',
    description: 'Identify the point, evidence and analysis of a body paragraph, and choose the sentence that best analyses a quotation.',
    outcomes: OUTCOMES,
    lessonId: ESSAY,
    format: 'mc',
    gen: evidenceAnalysis,
  }),
  skill({
    id: 'e10-quotations',
    name: 'Integrating quotations',
    description: 'Work a quotation into a sentence, and use square brackets and ellipses correctly.',
    outcomes: OUTCOMES,
    lessonId: ESSAY,
    format: 'mc',
    gen: quotations,
  }),
];
