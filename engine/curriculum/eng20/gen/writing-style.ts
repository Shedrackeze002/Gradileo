/**
 * Grade 11 English, lessons 6.5 and 6.6: Revising for Style and The Timed Literary Essay (11-F2).
 * Varying sentence openings and lengths, putting the key idea at the end of a sentence, revising for
 * precision, concision and a consistent tone, breaking a literary essay prompt into its tasks, and
 * planning, pacing and finishing a timed essay. Details about the Grade 10 public-domain stories and
 * poems are accurate to the texts.
 */
import { mc, multi, part, skill, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { block, q } from '../../eng10/gen/common.ts';
import { order } from './writing-analysis.ts';

const STYLE = 'e11-6-5';
const TIMED = 'e11-6-6';
const OUTCOMES = ['11-F2'];

// ---------------------------------------------------------------------------- lesson 6.5: sentence openings

interface Openings {
  /** Every sentence opens the same way. */
  same: string;
  /** Varied openings and lengths, same meaning. */
  varied: string;
  /** Reworded, but every sentence still opens the same way. */
  stillSame: string;
  /** Joined into run-ons and comma splices. */
  runOn: string;
}

const OPENINGS: Openings[] = [
  {
    same: 'Della counted her money three times. Della found only one dollar and eighty-seven cents. Della sat down on the couch and cried. Della then decided to sell her hair.',
    varied: 'Three times Della counted her money, and each time she found only one dollar and eighty-seven cents. After sitting down on the couch to cry, she decided to sell her hair.',
    stillSame: 'Della counted the money three times. Della discovered just one dollar and eighty-seven cents. Della sat on the couch and wept. Della then chose to sell her hair.',
    runOn: 'Della counted her money three times she found only one dollar and eighty-seven cents, Della sat down on the couch and cried, Della then decided to sell her hair.',
  },
  {
    same: 'The storm reached the village at night. The storm tore the roof off the school. The storm flooded the main road. The storm was gone by morning.',
    varied: 'The storm reached the village at night. Before it passed, it had torn the roof off the school and flooded the main road, yet by morning it was gone.',
    stillSame: 'The storm arrived in the village at night. The storm ripped the roof off the school. The storm covered the main road in water. The storm had left by morning.',
    runOn: 'The storm reached the village at night it tore the roof off the school, it flooded the main road, it was gone by morning.',
  },
  {
    same: 'The narrator says that he is not mad. The narrator plans the murder carefully. The narrator hides the body under the floor. The narrator confesses when he hears the heart.',
    varied: 'Although the narrator insists that he is not mad, he plans the murder with chilling care. After hiding the body under the floor, he finally confesses when he hears the heart.',
    stillSame: 'The narrator claims that he is not mad. The narrator carefully plans the killing. The narrator puts the body beneath the floor. The narrator admits everything when he hears the heart.',
    runOn: 'The narrator says that he is not mad, he plans the murder carefully, he hides the body under the floor he confesses when he hears the heart.',
  },
  {
    same: 'I walked into the exam hall. I sat down at my desk. I read the first question. I realized that I knew the answer.',
    varied: 'After walking into the exam hall and sitting down at my desk, I read the first question. Then I realized that I knew the answer.',
    stillSame: 'I entered the exam hall. I took my seat at the desk. I looked at the first question. I saw that I knew the answer.',
    runOn: 'I walked into the exam hall, I sat down at my desk I read the first question, I realized that I knew the answer.',
  },
  {
    same: 'Mrs. Mallard went to her room alone. She sat in a chair by the open window. She looked out at the trees. She felt something coming toward her.',
    varied: 'Mrs. Mallard went to her room alone and sat in a chair by the open window. Looking out at the trees, she felt something coming toward her.',
    stillSame: 'Mrs. Mallard went alone to her room. She took a seat by the open window. She gazed at the trees. She sensed something approaching her.',
    runOn: 'Mrs. Mallard went to her room alone she sat in a chair by the open window, she looked out at the trees, she felt something coming toward her.',
  },
  {
    same: 'The team trained every morning. The team lost its first three games. The team changed its tactics. The team won the final.',
    varied: 'The team trained every morning but lost its first three games. After changing its tactics, it went on to win the final.',
    stillSame: 'The team practised each morning. The team was beaten in its first three games. The team altered its tactics. The team was victorious in the final.',
    runOn: 'The team trained every morning, the team lost its first three games the team changed its tactics, the team won the final.',
  },
];

interface Lengths {
  /** Every sentence about the same medium length. */
  flat: string;
  /** Varied lengths, with a short sentence for the key moment. */
  good: string;
  /** Everything in one long sentence strung together with "and". */
  oneLong: string;
  /** Every idea in a tiny sentence. */
  choppy: string;
}

const LENGTHS: Lengths[] = [
  {
    flat: 'The man walked along the frozen trail for hours. He stopped to build a fire under a spruce tree. Snow fell from the branches above the fire. The fire went out in a moment.',
    good: 'After walking along the frozen trail for hours, the man stopped to build a fire under a spruce tree. Snow fell from the branches above. In a moment, the fire was out.',
    oneLong: 'The man walked along the frozen trail for hours and he stopped to build a fire under a spruce tree and snow fell from the branches above the fire and the fire went out in a moment.',
    choppy: 'The man walked. The trail was frozen. He walked for hours. He stopped. He built a fire. It was under a spruce. Snow fell. The fire went out.',
  },
  {
    flat: 'Mateo practised the piano every day for a year. He played his piece perfectly at home many times. On the night of the concert his hands began to shake. He forgot the last page of the music.',
    good: 'Mateo practised the piano every day for a year, and at home he played his piece perfectly many times. On the night of the concert, his hands began to shake. He forgot the last page.',
    oneLong: 'Mateo practised the piano every day for a year and he played his piece perfectly at home many times and on the night of the concert his hands began to shake and he forgot the last page of the music.',
    choppy: 'Mateo practised. He practised every day. It was for a year. He played well at home. Then came the concert. His hands shook. He forgot. It was the last page.',
  },
  {
    flat: 'Montresor speaks politely to Fortunato throughout the story. He warns him about the damp air in the vaults. He offers more than once to turn back. These kind words hide a plan to kill him.',
    good: 'Throughout the story, Montresor speaks politely to Fortunato, warning him about the damp air in the vaults and offering more than once to turn back. Each kind word hides a plan to kill.',
    oneLong: 'Montresor speaks politely to Fortunato throughout the story and he warns him about the damp air in the vaults and he offers more than once to turn back and these kind words hide a plan to kill him.',
    choppy: 'Montresor is polite. He talks to Fortunato. He mentions the damp. It is in the vaults. He offers to go back. He does this twice. It is all a trick. He plans murder.',
  },
  {
    flat: 'Aisha trained for the marathon through the whole winter. She ran in snow and rain and early morning darkness. On race day she reached the last kilometre in first place. Then she tripped and fell.',
    good: 'All winter, Aisha trained for the marathon, running through snow and rain and early morning darkness, and on race day she reached the last kilometre in first place. Then she fell.',
    oneLong: 'Aisha trained for the marathon through the whole winter and she ran in snow and rain and early morning darkness and on race day she reached the last kilometre in first place and then she tripped and fell.',
    choppy: 'Aisha trained. It was winter. She ran in snow. She ran in rain. It was dark. Race day came. She led. She tripped. She fell.',
  },
];

interface EndFocus {
  stress: string;
  good: string;
  wrong: string[];
}

const END_FOCUS: EndFocus[] = [
  {
    stress: 'that Jim had sold his watch',
    good: 'Della handed Jim the chain, and only then did she learn that he had sold his watch.',
    wrong: ['That Jim had sold his watch was something Della learned only after she handed him the chain.', 'Jim had sold his watch, Della learned after she handed him the chain.', 'Della learned that Jim had sold his watch only after she handed him the chain.'],
  },
  {
    stress: 'that no one listened',
    good: 'The engineers warned the council about the bridge for months, but no one listened.',
    wrong: ['No one listened to the engineers, who warned the council about the bridge for months.', 'The engineers, to whom no one listened, warned the council about the bridge for months.', 'No one listened, although the engineers warned the council about the bridge for months.'],
  },
  {
    stress: 'that the dog survived',
    good: 'The man froze to death on the trail, but the dog survived.',
    wrong: ['The dog survived, but the man froze to death on the trail.', 'The dog, which survived, trotted on after the man froze to death on the trail.', 'Surviving, the dog trotted on after the man froze to death on the trail.'],
  },
  {
    stress: 'that she had died of joy',
    good: 'When the doctors examined Mrs. Mallard, they announced that she had died of joy.',
    wrong: ['That she had died of joy was what the doctors announced when they examined Mrs. Mallard.', 'The doctors announced that she had died of joy when they examined Mrs. Mallard.', 'Dying of joy, the doctors announced, was what had happened to Mrs. Mallard when they examined her.'],
  },
  {
    stress: 'that Vera had invented the whole story',
    good: 'Framton ran from the house in terror, never guessing that Vera had invented the whole story.',
    wrong: ['Never guessing that Vera had invented the whole story, Framton ran from the house in terror.', 'Vera had invented the whole story, but Framton ran from the house in terror without guessing it.', 'That Vera had invented the whole story never occurred to Framton as he ran from the house in terror.'],
  },
  {
    stress: 'the winning goal',
    good: 'In the last minute of extra time, Amara scored the winning goal.',
    wrong: ['Amara scored the winning goal in the last minute of extra time.', 'The winning goal was scored by Amara in the last minute of extra time.', 'The winning goal, in the last minute of extra time, came from Amara.'],
  },
];

function sentenceVariety(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const o = rng.pick(OPENINGS);
    return {
      prompt: `Every sentence in this passage begins the same way:\n\n${block(o.same)}\n\nWhich revision varies the sentences best, without changing the meaning?`,
      parts: [part(mc(rng, o.varied, [o.stillSame, o.runOn]))],
      hints: ['Vary the openings: begin some sentences with a phrase or a dependent clause (*After…*, *Although…*, *Looking out…*), and combine closely related ideas.'],
      solution: [`${q(o.varied)} opens its sentences in different ways and combines related ideas, while keeping every detail.`, 'Of the others, one only swaps words but still begins every sentence the same way, and one runs the sentences together with commas or no punctuation at all.'],
    };
  }
  if (d === 2) {
    const l = rng.pick(LENGTHS);
    return {
      prompt: `Every sentence in this passage is about the same length:\n\n${block(l.flat)}\n\nWhich revision uses sentence length best, so that the key moment stands out?`,
      parts: [part(mc(rng, l.good, [l.oneLong, l.choppy]))],
      hints: ['A short sentence after longer ones lands hard: save it for the moment you most want the reader to notice.'],
      solution: [`${q(l.good)} builds up in longer sentences and then gives the key moment a short sentence of its own, so it stands out.`, 'Of the others, one strings everything into a single breathless sentence, and one chops every idea into tiny sentences, so nothing stands out.'],
    };
  }
  const e = rng.pick(END_FOCUS);
  return {
    prompt: `A writer wants to stress **${e.stress}**. Which sentence puts that idea where a sentence has the most emphasis, at the end?`,
    parts: [part(mc(rng, e.good, e.wrong))],
    hints: ['Readers give most weight to what comes last in a sentence. Put the idea you most want to stress there, and the background first.'],
    solution: [`${q(e.good)} ends with the idea to be stressed, so it lands with the most force.`, 'Each of the others puts that idea at the beginning or buries it in the middle.'],
  };
}

// ---------------------------------------------------------------------------- lesson 6.5: revising for precision and tone

interface Precision {
  vague: string;
  good: string;
  wrong: string[];
}

const PRECISION: Precision[] = [
  {
    vague: 'The story has a lot of good stuff about things like fate.',
    good: 'The story uses three wishes on a magic paw to ask whether people can control their fate.',
    wrong: ['The story has many good things in it about stuff like fate and things that happen to people.', 'The story is about fate and things like that, and it has a lot of really good stuff in it.', 'The story is really, really good about fate and about all the other things that it shows.'],
  },
  {
    vague: 'The poem uses some nice words to make you feel stuff about war.',
    good: 'Owen’s images of a soldier choking on gas make the reader feel the horror of war.',
    wrong: ['The poem uses a lot of nice words to make people feel lots of things about war.', 'The poem is good and has a lot of strong feelings about war and stuff in it.', 'The poem uses many words and things to make you feel all kinds of stuff.'],
  },
  {
    vague: 'The ending is kind of weird and does a thing to the reader.',
    good: 'The ending surprises the reader by revealing that both gifts are now useless.',
    wrong: ['The ending is weird and does something to the reader that is kind of a big deal.', 'The ending is really strange and stuff, and it makes the reader feel a certain way.', 'The ending does a thing that is weird, and a lot of readers notice the thing.'],
  },
  {
    vague: 'The narrator is a bad guy who does bad things for bad reasons.',
    good: 'Montresor murders Fortunato in cold blood to avenge an insult that he never describes.',
    wrong: ['The narrator is a very bad guy who does very bad things to another guy in the story.', 'The narrator is bad and does a lot of stuff that is really not good at all.', 'The narrator is not a good person, and the things he does are bad in many ways.'],
  },
  {
    vague: 'The setting is important in a lot of ways in this story.',
    good: 'The extreme cold of the Yukon is more than a backdrop: it is the force that kills the man.',
    wrong: ['The setting is very important in many ways in this story, and it matters a lot to it.', 'The setting matters a lot, and it is a really big thing in the story in lots of ways.', 'The setting is a big thing in the story, and it does many important things for it.'],
  },
  {
    vague: 'Della is a nice person who does a nice thing.',
    good: 'Della sells her long, beautiful hair to buy Jim a chain for his watch.',
    wrong: ['Della is a really nice person who does nice things for the people she loves.', 'Della is nice and does a thing for Jim that is really nice of her.', 'Della is a good person, and she does a good thing in the story.'],
  },
];

interface Hedging {
  wordy: string;
  good: string;
  /** Hedges gone, intensifiers piled on. */
  intense: string;
  /** Still hedged. */
  hedged: string;
  /** Changes the meaning. */
  changed: string;
}

const HEDGING: Hedging[] = [
  {
    wordy: 'I think that maybe the ending of the story is sort of really very surprising.',
    good: 'The ending of the story is surprising.',
    intense: 'The ending of the story is extremely, incredibly surprising.',
    hedged: 'I think the ending is maybe kind of surprising.',
    changed: 'The ending of the story is predictable.',
  },
  {
    wordy: 'In my opinion, I personally feel that Montresor is basically a very, very cruel man.',
    good: 'Montresor is a cruel man.',
    intense: 'Montresor is an extremely, terribly, horribly cruel man.',
    hedged: 'I personally feel that Montresor is basically kind of cruel.',
    changed: 'Montresor is a kind man.',
  },
  {
    wordy: 'It could be argued that perhaps the poem is possibly quite angry in tone.',
    good: 'The poem’s tone is angry.',
    intense: 'The poem’s tone is really, truly, extremely angry.',
    hedged: 'Perhaps the poem is possibly a bit angry.',
    changed: 'The poem’s tone is calm.',
  },
  {
    wordy: 'The narrator seems to sort of be kind of unreliable, I guess.',
    good: 'The narrator is unreliable.',
    intense: 'The narrator is very, very, very unreliable.',
    hedged: 'I guess the narrator is sort of unreliable.',
    changed: 'The narrator is completely trustworthy.',
  },
  {
    wordy: 'Basically, the imagery in the opening of the story is really very, very dark.',
    good: 'The imagery in the opening of the story is dark.',
    intense: 'The imagery in the opening is totally, incredibly, extremely dark.',
    hedged: 'Basically, the imagery is kind of dark, I suppose.',
    changed: 'The imagery in the opening of the story is bright and cheerful.',
  },
];

interface Tone {
  sentences: [string, string, string];
  good: string;
  wrong: string[];
}

const TONES: Tone[] = [
  {
    sentences: ['In “The Monkey’s Paw”, W. W. Jacobs builds suspense through the sergeant-major’s warnings.', 'The guy straight up tells them the paw is bad news, but they totally ignore him.', 'Each wish therefore fills the reader with dread.'],
    good: 'The sergeant-major warns the Whites that the paw brings sorrow, but they ignore him.',
    wrong: ['The dude warns them that the paw is total trouble, but they just ignore him anyway.', 'The sergeant-major warns them, but they do not care, which is so annoying to read.', 'The sergeant-major praises the paw warmly, and the Whites gladly follow his advice.'],
  },
  {
    sentences: ['Kate Chopin makes Mrs. Mallard’s grief intense but surprisingly brief.', 'She cries hard for a bit and then she is kind of over it.', 'This short-lived grief prepares the reader for the joy that follows.'],
    good: 'She weeps at once in her sister’s arms, but the storm of grief soon passes.',
    wrong: ['She cries hard for a bit, but then she gets over it real quick, like in minutes.', 'She weeps at once, but then she is totally fine, which is honestly kind of weird.', 'She refuses to cry at all, even when her sister holds her in her arms.'],
  },
  {
    sentences: ['In “Ozymandias”, Shelley uses irony to criticize the pride of rulers.', 'The king’s statue is, like, totally smashed up.', 'His boast now stands among ruins.'],
    good: 'The king’s statue lies broken in the desert.',
    wrong: ['The king’s statue is totally wrecked.', 'The statue is pretty much destroyed, which is kind of funny.', 'The king’s statue still stands whole and proud.'],
  },
  {
    sentences: ['Jack London presents the man as practical but unimaginative.', 'He doesn’t get that it’s super cold, which is a big oops.', 'This failure of imagination proves fatal.'],
    good: 'He notices the extreme cold but never considers what it could do to him.',
    wrong: ['He doesn’t really get how cold it is out there, which is a pretty big mistake.', 'He totally misses that it’s freezing, which is a seriously dumb move on his part.', 'He is terrified of the cold from the very start and refuses to leave camp.'],
  },
  {
    sentences: ['Poe opens “The Tell-Tale Heart” with a narrator who insists on his sanity.', 'But the guy is obviously out of his mind, seriously.', 'His frantic tone undermines every claim he makes.'],
    good: 'Yet the narrator’s own words suggest that he is not sane.',
    wrong: ['But the narrator is clearly crazy, for real, no matter what he says.', 'But it’s super obvious that the guy has totally lost it.', 'His calm, logical words prove that he is perfectly sane.'],
  },
];

function revision(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const p = rng.pick(PRECISION);
    return {
      prompt: `${block(p.vague)}\n\nWhich revision replaces the vague words with precise ones?`,
      parts: [part(mc(rng, p.good, rng.sample(p.wrong, 2)))],
      hints: ['Vague words such as *stuff*, *things*, *a lot*, *good* and *bad* tell the reader nothing. Name exactly what you mean.'],
      solution: [`${q(p.good)} names exactly what the writer means.`, 'The others only shuffle or add vague words such as “stuff”, “things” or “really”.'],
    };
  }
  if (d === 2) {
    const h = rng.pick(HEDGING);
    return {
      prompt: `${block(h.wordy)}\n\nWhich revision is the most precise and concise, keeping the meaning?`,
      parts: [part(mc(rng, h.good, [h.intense, h.hedged, h.changed]))],
      hints: ['Cut hedges (*I think*, *maybe*, *sort of*, *it could be argued*) and empty intensifiers (*really*, *very*, *extremely*). State the point plainly.'],
      solution: [`${q(h.good)} states the point plainly, with no hedges and no empty intensifiers.`, 'Of the others, one swaps the hedges for a pile of intensifiers, one is still hedged, and one changes the meaning.'],
    };
  }
  const tn = rng.pick(TONES);
  return {
    prompt: `${block(tn.sentences.map((s, i) => `**(${i + 1})** ${s}`).join(' '))}\n\nSentence (2) breaks the formal tone of this paragraph from a literary essay. Which revision keeps the tone **and** the meaning?`,
    parts: [part(mc(rng, tn.good, tn.wrong))],
    hints: ['A formal essay avoids slang and chatty asides, but the revision must still say the same thing about the text.'],
    solution: [`${q(tn.good)} matches the formal tone of the paragraph and keeps its meaning.`, 'Of the others, two keep slang or chatty comments, and one changes what the sentence says about the text.'],
  };
}

// ---------------------------------------------------------------------------- lesson 6.6: reading a prompt

interface Prompt {
  prompt: string;
  tasks: string[];
  notTasks: string[];
  plan: string;
  badPlans: string[];
}

const PROMPTS: Prompt[] = [
  {
    prompt: 'Analyse how Kate Chopin uses the scene outside Mrs. Mallard’s window to reveal her inner life in “The Story of an Hour”, and evaluate whether the final sentence is an effective ending.',
    tasks: ['Analyse how the view from the window reveals Mrs. Mallard’s inner life', 'Judge whether the final sentence is an effective ending, with reasons'],
    notTasks: ['Retell the events of the story in order, from the news to the final scene', 'Compare the story with a story by another writer from the same period', 'Describe Kate Chopin’s life and the other stories that she wrote'],
    plan: 'A thesis answering both parts; two paragraphs on what the window scene reveals; a paragraph judging the final sentence; a conclusion',
    badPlans: ['A detailed summary of the story, from the news of the railway accident to Mrs. Mallard’s sudden death, then a conclusion', 'Three paragraphs on the window scene and what it reveals about Mrs. Mallard, with nothing at all on the ending', 'A paragraph on Chopin’s life, a paragraph on the window scene, and a conclusion saying that the ending is surprising'],
  },
  {
    prompt: 'Compare the narrators of “The Tell-Tale Heart” and “The Cask of Amontillado”, and explain which one the reader trusts less, and why.',
    tasks: ['Compare the two narrators and how each one tells his story', 'Decide which of the two narrators the reader trusts less', 'Give the reasons for that judgement, with evidence'],
    notTasks: ['Retell the plots of both stories from beginning to end', 'Write about only one of the two stories in detail', 'Explain why Poe chose to write so many horror stories'],
    plan: 'A thesis naming the less trustworthy narrator; paragraphs comparing how each speaks and what each hides; a conclusion explaining the judgement',
    badPlans: ['A paragraph summarizing the plot of each story, from the first plan to the very end, then a conclusion saying which story is the scarier one', 'Three detailed paragraphs on how the narrator of “The Tell-Tale Heart” speaks and what he hides, and nothing on Montresor', 'A careful comparison of how the two narrators speak and what each one hides, which never says which of them is trusted less'],
  },
  {
    prompt: 'Discuss the role of the dog in “To Build a Fire”. How does Jack London use the dog to develop the story’s view of nature?',
    tasks: ['Consider what part the dog plays in the story', 'Explain how London uses the dog to develop the story’s view of nature'],
    notTasks: ['Describe the dog’s appearance, its size and its coat in detail', 'Compare the story with a different story about another animal', 'Give your own opinion of whether dogs make good pets'],
    plan: 'A thesis on what the dog shows about nature; paragraphs on its instinct, its contrast with the man and its survival; a conclusion on nature',
    badPlans: ['A retelling of the man’s journey from the main trail to his death, with a paragraph for each fire he builds, then a short conclusion', 'Paragraphs on the man’s mistakes, from ignoring the old-timer to wetting his feet in the hidden spring, that never mention the dog', 'A detailed description of the dog’s appearance, its behaviour and its relationship with the man, with no link to nature'],
  },
  {
    prompt: 'Explain how O. Henry prepares the reader for the ending of “The Gift of the Magi”, and consider whether the narrator’s final comment changes how we see Della and Jim.',
    tasks: ['Explain how earlier details prepare the reader for the ending', 'Consider whether the final comment changes how we see Della and Jim'],
    notTasks: ['Retell the ending of the story in your own words, step by step', 'Write a different, happier ending for the story and explain it', 'Compare the story with a Christmas film that you have seen'],
    plan: 'A thesis answering both parts; paragraphs on the details that prepare the ending; a paragraph on how the final comment changes our view; a conclusion',
    badPlans: ['A detailed retelling of the story, from Della counting her money on the first page to the opening of the two gifts, then a conclusion', 'Several paragraphs on the details that prepare the reader for the ending, with nothing at all on the narrator’s final comment', 'One long paragraph on the narrator’s final comment about the magi, and nothing on the details that come before it'],
  },
  {
    prompt: 'Analyse how Wilfred Owen uses imagery in “Dulce et Decorum Est” to challenge the idea expressed in the poem’s title.',
    tasks: ['Analyse Owen’s imagery and how it works in the poem', 'Explain how that imagery challenges the idea in the title'],
    notTasks: ['Put every line of the poem into plain modern English', 'Compare the poem with “In Flanders Fields” by John McCrae', 'Write a history of the First World War and its battles'],
    plan: 'A thesis on how the imagery undercuts the title; paragraphs on the exhausted soldiers, the gas attack and the dying man; a conclusion',
    badPlans: ['A list of every image in the poem, from the beggars under sacks to the dying man, each explained in turn but with no link to the title', 'A history of the First World War and the use of gas in its battles, then one short paragraph on the poem itself', 'A paragraph explaining what the Latin title means and where it comes from, and nothing about the poem’s imagery'],
  },
  {
    prompt: 'Evaluate how effectively Saki uses Vera’s story to create the surprise ending of “The Open Window”.',
    tasks: ['Analyse how Vera’s story sets up the ending', 'Judge how effective it is, with reasons'],
    notTasks: ['Retell Vera’s story in full', 'Write your own ending for the story', 'Compare Saki with other writers of his time'],
    plan: 'A thesis giving a judgement; paragraphs on how Vera tells her story, how it sets up the twist and how convincing it is; a conclusion',
    badPlans: ['A detailed retelling of Vera’s story about the bog and the three missing hunters, followed by a conclusion saying it was clever', 'Paragraphs on how Vera tells her story and how it sets up the twist, which never judge how effective the ending actually is', 'A new ending for the story written in Saki’s own style, followed by a paragraph explaining why the new ending is better'],
  },
];

function promptAnalysis(rng: Rng, d: Difficulty): GenOutput {
  const p = rng.pick(PROMPTS);
  const lead = `An exam asks:\n\n${block(p.prompt)}`;
  if (d === 1) {
    const task = rng.pick(p.tasks);
    return {
      prompt: `${lead}\n\nWhich of these is a task the prompt asks you to do?`,
      parts: [part(mc(rng, task, p.notTasks))],
      hints: ['Underline each key verb in the prompt (*analyse*, *compare*, *explain*, *evaluate*, *discuss*) and what it applies to: each one is a task.'],
      solution: [`${q(task)} is one of the prompt’s tasks.`, 'The others are things the prompt never asks for.'],
    };
  }
  if (d === 2) {
    const shown = rng.sample(p.notTasks, 2);
    return {
      prompt: `${lead}\n\nWhich tasks does this prompt ask you to do?`,
      parts: [part(multi(rng, [...p.tasks.map((md) => ({ md, correct: true })), ...shown.map((md) => ({ md, correct: false }))]))],
      hints: ['Read the prompt clause by clause. A prompt with *and*, or a second sentence, usually sets more than one task, and an essay that answers only one of them loses marks.'],
      solution: [`The prompt asks you to: ${p.tasks.map((x) => x[0].toLowerCase() + x.slice(1)).join('; ')}.`, 'It does not ask you to ' + shown.map((x) => x[0].toLowerCase() + x.slice(1)).join(' or ') + '.'],
    };
  }
  return {
    prompt: `${lead}\n\nWhich essay plan fits this prompt best?`,
    parts: [part(mc(rng, p.plan, p.badPlans))],
    hints: ['A good plan gives every task in the prompt its own place, and it analyses or judges rather than retells.'],
    solution: [`${q(p.plan)} covers every task in the prompt.`, 'Of the others, one retells instead of analysing, and the rest leave out part of what the prompt asks.'],
  };
}

// ---------------------------------------------------------------------------- lesson 6.6: managing time

interface Budget {
  total: number;
  good: string;
  wrong: string[];
}

const BUDGETS: Budget[] = [
  { total: 45, good: '5 minutes reading and planning, 35 minutes writing, 5 minutes checking', wrong: ['No planning or checking at all: all 45 minutes spent writing the essay', '20 minutes planning, 25 minutes writing, and no time left over to check', 'A 25-minute rough draft, then 20 minutes copying it all out neatly'] },
  { total: 60, good: '10 minutes reading and planning, 45 minutes writing, 5 minutes checking', wrong: ['No planning or checking at all: all 60 minutes spent writing the essay', '30 minutes planning, 30 minutes writing, and no time left over to check', 'A 35-minute rough draft, then 25 minutes copying it all out neatly'] },
  { total: 75, good: '10 minutes reading and planning, 55 minutes writing, 10 minutes checking', wrong: ['No planning or checking at all: all 75 minutes spent writing the essay', '40 minutes planning, 35 minutes writing, and no time left over to check', 'A 40-minute rough draft, then 35 minutes copying it all out neatly'] },
  { total: 90, good: '15 minutes reading and planning, 65 minutes writing, 10 minutes checking', wrong: ['No planning or checking at all: all 90 minutes spent writing the essay', '45 minutes planning, 45 minutes writing, and no time left over to check', 'A 50-minute rough draft, then 40 minutes copying it all out neatly'] },
  { total: 120, good: '20 minutes reading and planning, 85 minutes writing, 15 minutes checking', wrong: ['No planning or checking at all: all 120 minutes spent writing the essay', '60 minutes planning, 60 minutes writing, and no time left over to check', 'A 70-minute rough draft, then 50 minutes copying it all out neatly'] },
];

const SHORT_ON_TIME: Array<{ ask: string; good: string; wrong: string[]; why: string }> = [
  {
    ask: 'You have 10 minutes left. You have written your introduction and two body paragraphs, and you planned a third.',
    good: 'Write a brief version of the third point and a short conclusion that returns to your thesis.',
    wrong: ['Start a long, fully developed third paragraph with all your evidence and hope to finish it.', 'Use the time to rewrite your introduction more neatly so that it makes a good first impression.', 'Stop writing and hand in the essay as it is, without a third point or a conclusion.'],
    why: 'A short third point and a conclusion finish the argument; an unfinished paragraph or a missing conclusion leaves the essay incomplete.',
  },
  {
    ask: 'You have 5 minutes left and no conclusion yet.',
    good: 'Write two or three sentences that answer the prompt and return to your thesis, then check for errors if time remains.',
    wrong: ['Begin a new body paragraph with fresh evidence from the text, and try to squeeze in the conclusion afterwards if you can.', 'Copy your introduction out again, word for word, as the conclusion, so that the essay at least has some kind of ending.', 'Spend the time recopying a messy paragraph so that the marker can read every single word of it easily.'],
    why: 'Even a short conclusion that answers the prompt makes the essay complete; new evidence at the end would be left unfinished.',
  },
  {
    ask: 'With 20 minutes left, you realize that your body paragraphs prove a slightly different point from the thesis in your introduction.',
    good: 'Revise the thesis so that it matches what the body paragraphs actually prove.',
    wrong: ['Start the whole essay again from the beginning with a new plan and a new thesis.', 'Leave the mismatch as it is and hope that the marker does not notice it.', 'Add a paragraph arguing against your own body paragraphs to make the thesis fit.'],
    why: 'Changing one sentence brings the whole essay into line; starting again would leave too little time to finish.',
  },
  {
    ask: 'Ten minutes into the exam, you have read the prompt twice but still have no thesis.',
    good: 'Jot down ideas and evidence from the text, look for what they have in common, and draft a thesis from that before you begin.',
    wrong: ['Start writing body paragraphs at once, and decide what the essay argues at the very end, once you can see what you have written.', 'Answer a different question that you find easier and have practised before, since any good essay is better than none.', 'Write a careful summary of the whole text instead of an argument, since a summary does not need a thesis at all.'],
    why: 'A thesis often grows out of the evidence you notice; writing without one usually produces paragraphs that do not add up to an argument.',
  },
  {
    ask: 'You finish your conclusion with 8 minutes left.',
    good: 'Reread the essay, check that each paragraph answers the prompt, and correct spelling and punctuation.',
    wrong: ['Hand it in at once without reading it, since the essay is already finished and complete.', 'Start a long new body paragraph on a fresh point that you have only just thought of now.', 'Rewrite the whole essay more neatly so that the marker can read your handwriting.'],
    why: 'The last minutes are best spent catching errors and gaps; a long new paragraph or a full rewrite cannot be finished in time.',
  },
];

const TIMED_STEPS = [
  'Read the prompt and underline its key verbs and each task',
  'Jot down ideas and evidence from the text',
  'Write a thesis and plan the order of your paragraphs',
  'Write the introduction and the body paragraphs',
  'Write a conclusion that returns to the thesis',
  'Reread the essay and correct errors',
];

function timedEssay(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const b = rng.pick(BUDGETS);
    return {
      prompt: `You have **${b.total} minutes** to write a literary analysis essay in an exam. Which plan divides the time most sensibly?`,
      parts: [part(mc(rng, b.good, b.wrong))],
      hints: ['Spend roughly the first sixth of the time reading and planning, most of it writing, and save a few minutes at the end to check.'],
      solution: [`${q(b.good)} leaves time to plan, to write a full essay and to check it.`, 'Of the others, one skips planning, one plans for so long that the essay cannot be finished or checked, and one wastes time copying out a draft.'],
    };
  }
  if (d === 2) {
    const s = rng.pick(SHORT_ON_TIME);
    return {
      prompt: `${s.ask} What should you do?`,
      parts: [part(mc(rng, s.good, s.wrong))],
      hints: ['Ask which choice leaves you with a complete, focused essay that answers the prompt by the end of the time.'],
      solution: [s.good, s.why],
    };
  }
  return order(
    rng,
    'Put the steps of writing a timed literary essay in order.',
    TIMED_STEPS,
    ['Understand the question before gathering ideas, and plan before you write; checking comes last.'],
    TIMED_STEPS.map((x, i) => `${i + 1}. ${x}`),
  );
}

export const STYLE_SKILLS: SkillDef[] = [
  skill({
    id: 'e11-sentence-variety',
    name: 'Sentence variety and emphasis',
    description: 'Vary sentence openings and lengths, and put the key idea of a sentence at the end, where it has most emphasis.',
    outcomes: OUTCOMES,
    lessonId: STYLE,
    format: 'mc',
    gen: sentenceVariety,
  }),
  skill({
    id: 'e11-revision',
    name: 'Revising for precision and tone',
    description: 'Replace vague words with precise ones, cut hedges and empty intensifiers, and keep a consistent formal tone.',
    outcomes: OUTCOMES,
    lessonId: STYLE,
    format: 'mc',
    gen: revision,
  }),
  skill({
    id: 'e11-prompt-analysis',
    name: 'Breaking down a prompt',
    description: 'Find every task in a literary essay prompt and choose the plan that answers all of them.',
    outcomes: OUTCOMES,
    lessonId: TIMED,
    format: 'mc',
    gen: promptAnalysis,
  }),
  skill({
    id: 'e11-timed-essay',
    name: 'Writing under a time limit',
    description: 'Divide the time of a timed essay sensibly, decide what to do when time runs short, and order the steps.',
    outcomes: OUTCOMES,
    lessonId: TIMED,
    format: 'mc',
    gen: timedEssay,
  }),
];
