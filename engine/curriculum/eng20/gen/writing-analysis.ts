/**
 * Grade 11 English, lessons 6.1 and 6.2: The Literary Analysis Essay and The Comparative Essay
 * (11-F1). Analytical theses that say how a text creates meaning and why it matters, commentary that
 * explains how particular words work and ties them to the point, comparative theses that say why a
 * comparison matters, and block and point-by-point structure. The texts are the public-domain stories
 * and poems of Grade 10 (../../eng10/gen/texts.ts and poems.ts), and every quoted phrase is exact.
 */
import { fixedChoice, mc, part, skill, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { AnswerSpec, Choice, Difficulty, SkillDef } from '../../../types.ts';
import { block, q } from '../../eng10/gen/common.ts';
import { CASK, FIRE, HEART, HOUR, MAGI, PAW, WINDOW, titled, type Story } from '../../eng10/gen/texts.ts';
import { DULCE, FLANDERS, MASK, NOBODY, OZYMANDIAS, REMEMBER, SONNET18 } from '../../eng10/gen/poems.ts';

const LIT = 'e11-6-1';
const COMP = 'e11-6-2';
const OUTCOMES = ['11-F1'];

/** Items to put in order: shuffled (never already in order), with the first and last places named. */
export function order(rng: Rng, prompt: string, steps: string[], hints: string[], solution: string[]): GenOutput {
  const ids = 'abcdefgh';
  const idx = steps.map((_, i) => i);
  let shown = rng.shuffle(idx);
  for (let i = 0; i < 50 && shown.every((v, j) => v === j); i++) shown = rng.shuffle(idx);
  if (shown.every((v, j) => v === j)) shown = [...idx].reverse();
  const items: Choice[] = shown.map((k, i) => ({ id: ids[i], md: steps[k] }));
  const correctOrder = idx.map((k) => items[shown.indexOf(k)].id);
  const answer: AnswerSpec = { kind: 'order', items, correctOrder, ends: ['First', 'Last'] };
  return { prompt, parts: [part(answer)], hints, solution };
}

/** "A, B or C" from short phrases. */
function orList(xs: string[]): string {
  return xs.length <= 2 ? xs.join(' or ') : `${xs.slice(0, -1).join(', ')} or ${xs[xs.length - 1]}`;
}

// ---------------------------------------------------------------------------- lesson 6.1: the analytical thesis

type Weak = 'topic' | 'summary' | 'vague' | 'noHow' | 'noWhy';
const WEAK_LABEL: Record<Weak, string> = {
  topic: 'It names a topic, not a claim.',
  summary: 'It retells what happens instead of making a claim.',
  vague: 'It praises the text without saying anything specific about it.',
  noHow: 'It says what the text means but not how the writer creates that meaning.',
  noWhy: 'It lists techniques but makes no claim about what they show.',
};
const WEAK_SHORT: Record<Weak, string> = {
  topic: 'name a topic',
  summary: 'retell the plot',
  vague: 'praise the text vaguely',
  noHow: 'state a meaning without saying how the writer creates it',
  noWhy: 'list techniques without saying what they show',
};
/** Labels too close to each kind of weak thesis to be offered beside it. */
const WEAK_OVERLAP: Record<Weak, Weak[]> = { topic: [], summary: [], vague: ['noWhy'], noWhy: ['vague'], noHow: [] };

interface ThesisSet {
  text: Story;
  /** Says how the writer creates meaning (a technique) and why it matters (what it shows). */
  strong: string[];
  topic: string;
  summary: string;
  vague: string;
  noHow: string;
  noWhy: string;
}

const THESES: ThesisSet[] = [
  {
    text: HOUR,
    strong: [
      'Through the spring scene outside Mrs. Mallard’s window, Kate Chopin turns an hour of mourning into an awakening, suggesting that the marriage she mourns had quietly confined her.',
      'By having the doctors blame Mrs. Mallard’s death on “the joy that kills”, Chopin ends with an irony that exposes how little the people around her understood her longing for freedom.',
    ],
    topic: 'Freedom and marriage in “The Story of an Hour”',
    summary: 'In “The Story of an Hour”, Mrs. Mallard hears that her husband has died in a railway accident, sits alone by her window feeling free, and dies when he walks in alive.',
    vague: '“The Story of an Hour” is a powerful and moving story that every reader will enjoy, and Kate Chopin is a brilliant writer who knows exactly how to surprise us.',
    noHow: '“The Story of an Hour” shows that marriage in the 1890s could take away a woman’s freedom and leave her with no life of her own, even when her husband was kind.',
    noWhy: 'Kate Chopin uses imagery, irony, symbolism and foreshadowing in “The Story of an Hour”, especially in the long scene where Mrs. Mallard sits by the open window.',
  },
  {
    text: MAGI,
    strong: [
      'O. Henry’s narrator first calls Della and Jim unwise and then names them “the wisest” of all givers, a reversal that argues love is measured by what is given up, not what is gained.',
      'O. Henry fills the opening of “The Gift of the Magi” with exact sums of money, so that when the gifts prove useless, the reader sees the couple’s real wealth was never counted in coins.',
    ],
    topic: 'Sacrifice in “The Gift of the Magi”',
    summary: 'In “The Gift of the Magi”, Della sells her long hair to buy Jim a chain for his watch, while Jim sells his gold watch to buy her a set of combs for her hair.',
    vague: '“The Gift of the Magi” is a wonderful story with a great ending, and O. Henry is one of the most enjoyable and clever short-story writers I have ever read.',
    noHow: '“The Gift of the Magi” shows that love is more important than money, and that the best gifts are the ones that cost the giver something they truly treasure.',
    noWhy: 'O. Henry uses irony, a narrator who comments on the story, exact sums of money and a surprise ending in “The Gift of the Magi”, especially in its final paragraph.',
  },
  {
    text: PAW,
    strong: [
      'W. W. Jacobs uses the sergeant-major’s warnings and the paw’s grim bargains to show that trying to seize control of fate brings only grief.',
      'Jacobs lets the reader imagine what knocks at the door instead of showing it, so that the horror of the last wish comes from the Whites’ fear rather than from anything we see.',
    ],
    topic: 'Fate in “The Monkey’s Paw”',
    summary: 'In “The Monkey’s Paw”, the Whites make three wishes on a magic paw, and each one brings them sorrow, from their son’s death to the knocking at the door at night.',
    vague: '“The Monkey’s Paw” is a really exciting and scary story, one of the best horror stories ever written, with an ending that readers will never forget.',
    noHow: '“The Monkey’s Paw” shows that people who try to interfere with fate will suffer for it, and that getting what you wish for can bring terrible grief.',
    noWhy: 'W. W. Jacobs uses foreshadowing, suspense, symbolism and a dark setting in “The Monkey’s Paw”, especially in the scenes where the family makes their wishes.',
  },
  {
    text: HEART,
    strong: [
      'Poe’s first-person narrator insists on his sanity so frantically that his own voice becomes the strongest evidence against him, showing how guilt unravels a mind from within.',
      'In “The Tell-Tale Heart”, Poe makes the beating heart louder with every sentence of the confession, so that the reader hears the narrator’s guilt grow even as he denies it.',
    ],
    topic: 'Madness in “The Tell-Tale Heart”',
    summary: 'In “The Tell-Tale Heart”, a man kills an old man because of his eye, hides the body under the floor and confesses to the police when he hears the heart still beating.',
    vague: '“The Tell-Tale Heart” is one of the best horror stories ever written, and Poe is a genius whose stories are still exciting and frightening to read today.',
    noHow: '“The Tell-Tale Heart” shows that guilt can drive a person mad, and that a guilty conscience can be impossible to escape, however hard someone tries to hide a crime.',
    noWhy: 'Poe uses a first-person narrator, repetition, dashes, exclamations and a symbol in “The Tell-Tale Heart”, especially in the final scene with the police.',
  },
  {
    text: FIRE,
    strong: [
      'By contrasting the man’s confident reasoning with the dog’s wordless instinct, Jack London suggests that intelligence without imagination is no match for an indifferent nature.',
      'London’s flat, matter-of-fact narration mirrors the man’s own failure to feel the danger of the cold, so that the reader dreads what the man cannot imagine.',
    ],
    topic: 'Nature in “To Build a Fire”',
    summary: 'In “To Build a Fire”, a man travels alone through the frozen Yukon with his dog, soaks his feet, fails to keep a fire burning and freezes to death in the snow.',
    vague: '“To Build a Fire” is a gripping story that is very well written, and it is one of the most exciting and memorable adventure stories that I have ever read.',
    noHow: '“To Build a Fire” shows that nature does not care whether people live or die, and that a person who ignores good advice in the wild can pay with their life.',
    noWhy: 'Jack London uses imagery, a third-person narrator, repetition and a contrast between the man and the dog in “To Build a Fire”, especially when the man lights his fires.',
  },
  {
    text: CASK,
    strong: [
      'Poe lets Montresor tell his own story with calm satisfaction, so that the reader is chilled less by the murder itself than by his complete lack of remorse.',
      'In “The Cask of Amontillado”, Poe fills Montresor’s friendly words with double meanings, making the reader an accomplice who understands the plan long before Fortunato does.',
    ],
    topic: 'Revenge in “The Cask of Amontillado”',
    summary: 'In “The Cask of Amontillado”, Montresor meets Fortunato at the carnival, lures him into the catacombs with the promise of rare wine and walls him up alive.',
    vague: '“The Cask of Amontillado” is a famous and very creepy story, and it is one of the most frightening and memorable things that Edgar Allan Poe ever wrote.',
    noHow: '“The Cask of Amontillado” shows that revenge turns people into monsters, and that someone who holds a grudge for years can become capable of terrible cruelty.',
    noWhy: 'Poe uses verbal irony, dramatic irony, a first-person narrator and a dark, enclosed setting in “The Cask of Amontillado”, especially deep in the catacombs.',
  },
  {
    text: WINDOW,
    strong: [
      'Saki lets the reader be fooled by Vera’s ghost story along with Framton, so that the twist ending exposes how easily a confident storyteller can shape what we believe.',
      'By presenting Vera as “self-possessed” and Framton as nervous, Saki sets up a contest between a cool storyteller and an anxious listener that makes the ending comic and believable.',
    ],
    topic: 'Storytelling in “The Open Window”',
    summary: 'In “The Open Window”, Vera tells Framton that her aunt’s husband and brothers died three years ago, and he runs away in terror when they walk home across the lawn.',
    vague: '“The Open Window” is a clever and funny story with a brilliant twist at the end, and Saki is a writer whose stories are always a real pleasure to read.',
    noHow: '“The Open Window” shows that people will believe almost anything they are told, especially when the person telling the story seems calm and sure of the facts.',
    noWhy: 'Saki uses a surprise ending, dialogue, humour and a nervous main character in “The Open Window”, especially in the conversation between Vera and Framton.',
  },
  {
    text: OZYMANDIAS,
    strong: [
      'Shelley places Ozymandias’s boast inside a traveller’s report of ruins, so that the king’s own words become the poem’s sharpest irony about the emptiness of power.',
      'In “Ozymandias”, Shelley contrasts the proud inscription with the “lone and level sands” around it, showing that time erases even the greatest rulers.',
    ],
    topic: 'Power in “Ozymandias”',
    summary: 'In “Ozymandias”, a traveller describes a broken statue in the desert, with a sneering face, two huge legs and a boastful inscription on its pedestal.',
    vague: '“Ozymandias” is a beautiful and famous poem, and it is one of the most powerful and memorable poems that Shelley or anyone else has ever written.',
    noHow: '“Ozymandias” shows that power does not last, and that even the greatest and proudest rulers in history are eventually forgotten by the world.',
    noWhy: 'Shelley uses irony, imagery, a traveller who tells the story and the sonnet form in “Ozymandias”, especially in the inscription on the statue’s pedestal.',
  },
  {
    text: DULCE,
    strong: [
      'Owen’s nightmarish images of a gas attack turn the poem’s Latin title into a bitter lie, exposing the cruelty of telling young men that dying for their country is glorious.',
      'Owen describes his exhausted soldiers as “old beggars under sacks”, stripping them of every heroic image so that the reader sees war as degradation rather than glory.',
    ],
    topic: 'War in “Dulce et Decorum Est”',
    summary: 'In “Dulce et Decorum Est”, exhausted soldiers march away from the front, one fails to put on his gas mask in time, and he dies in front of the speaker.',
    vague: '“Dulce et Decorum Est” is a very powerful poem about war, and it is one of the most moving and unforgettable poems that I have read in English class.',
    noHow: '“Dulce et Decorum Est” shows that war is horrible, and that the soldiers who fought in the First World War suffered far more than people at home understood.',
    noWhy: 'Wilfred Owen uses imagery, similes, a Latin title and direct address to the reader in “Dulce et Decorum Est”, especially in his description of the gas attack.',
  },
  {
    text: MASK,
    strong: [
      'In “We Wear the Mask”, Paul Laurence Dunbar uses the image of a mask “that grins and lies” to show how people facing injustice must hide their suffering behind a cheerful face.',
      'Dunbar repeats the line “We wear the mask” so that the hidden pain of the poem’s speakers is pressed back under the surface every time it begins to show.',
    ],
    topic: 'Hiding feelings in “We Wear the Mask”',
    summary: 'In “We Wear the Mask”, the speaker says that people wear masks that smile while they are suffering inside, and that the world does not see their pain.',
    vague: '“We Wear the Mask” is a very meaningful poem, and it is one of the most powerful and beautifully written poems that Paul Laurence Dunbar ever wrote.',
    noHow: '“We Wear the Mask” shows that people hide their true feelings, and that those who suffer often have to pretend to the world that they are happy.',
    noWhy: 'Paul Laurence Dunbar uses a metaphor, repetition, rhyme and a speaker who says “we” in “We Wear the Mask”, especially in the poem’s last stanza.',
  },
];

function weakText(s: ThesisSet, w: Weak): string {
  return s[w];
}

function literaryThesis(rng: Rng, d: Difficulty): GenOutput {
  const s = rng.pick(THESES);
  const right = rng.pick(s.strong);
  if (d === 3) {
    const showStrong = rng.chance(0.2);
    const w = rng.pick(Object.keys(WEAK_LABEL) as Weak[]);
    const none = 'Nothing: it is a strong analytical thesis.';
    if (showStrong) {
      const others = rng.sample((Object.keys(WEAK_LABEL) as Weak[]).filter((x) => x !== 'vague'), 3).map((x) => WEAK_LABEL[x]);
      return {
        prompt: `A student wrote this thesis for a literary analysis of ${titled(s.text)}:\n\n${block(right)}\n\nWhat, if anything, is its main weakness?`,
        parts: [part(mc(rng, none, others))],
        hints: ['A strong analytical thesis says *how* the writer creates meaning (a technique or choice) and *why* it matters (what it shows).'],
        solution: ['Nothing: it names a technique and says what the technique shows, so it is an arguable analytical claim.'],
      };
    }
    const others = rng.shuffle((Object.keys(WEAK_LABEL) as Weak[]).filter((x) => x !== w && !WEAK_OVERLAP[w].includes(x))).slice(0, 3);
    return {
      prompt: `A student wrote this thesis for a literary analysis of ${titled(s.text)}:\n\n${block(weakText(s, w))}\n\nWhat is its main weakness?`,
      parts: [part(mc(rng, WEAK_LABEL[w], others.map((x) => WEAK_LABEL[x])))],
      hints: ['A strong analytical thesis says *how* the writer creates meaning (a technique or choice) and *why* it matters (what it shows). Check which of those two this thesis is missing.'],
      solution: [WEAK_LABEL[w], `A stronger thesis: ${q(right)}`],
    };
  }
  const picked: Weak[] = d === 1 ? rng.sample(['topic', 'summary', 'vague'] as Weak[], 2) : ['noHow', 'noWhy', rng.pick(['summary', 'topic'] as Weak[])];
  return {
    prompt: `Which is the strongest **thesis** for a literary analysis essay on ${titled(s.text)}?`,
    parts: [part(mc(rng, right, picked.map((w) => weakText(s, w))))],
    hints: [d === 1 ? 'A thesis is a claim someone could disagree with, not a topic, a summary or praise.' : 'The strongest analytical thesis does two things at once: it names how the writer creates meaning (a technique or choice) and says why it matters (what it shows).'],
    solution: [`${q(right)} names how the writer creates meaning and what that shows, so the essay has an arguable claim to prove.`, `The others ${orList(picked.map((w) => WEAK_SHORT[w]))}.`],
  };
}

// ---------------------------------------------------------------------------- lesson 6.1: depth of analysis

interface Commentary {
  text: Story;
  point: string;
  /** A sentence giving the quotation. */
  evidence: string;
  /** Explains how particular words work and ties them to the point. */
  deep: string;
  /** Explains a word, but stops before connecting it to the point. */
  partial: string;
  /** Only names a device. */
  device: string;
  /** Repeats the quotation in other words. */
  paraphrase: string;
  /** Claims more than the evidence shows. */
  overreach: string;
}

const COMMENTARIES: Commentary[] = [
  {
    text: HOUR,
    point: 'Chopin uses the view from the window to show Mrs. Mallard’s grief giving way to a sense of new life.',
    evidence: 'Mrs. Mallard sees “the tops of trees that were all aquiver with the new spring life.”',
    deep: 'Since “aquiver” makes the trees tremble with energy in her first hour as a widow, the spring scene hints that a new life is stirring inside Mrs. Mallard.',
    partial: 'The word “aquiver” suggests that the trees are trembling with energy, as if they are so full of new life that they can hardly stay still in the spring air.',
    device: 'This is an example of imagery, because Chopin describes what Mrs. Mallard can see through the open window, including the trees and the new spring life.',
    paraphrase: 'This shows that Mrs. Mallard can see the tops of the trees outside her window, and that the trees are moving and full of the new life of spring.',
    overreach: 'This proves that Mrs. Mallard was glad her husband had died from the very first moment she heard the news, and that she never loved him at all.',
  },
  {
    text: MAGI,
    point: 'O. Henry uses the view from Della’s window to show how hopeless her poverty makes her feel.',
    evidence: 'Della “looked out dully at a gray cat walking a gray fence in a gray backyard.”',
    deep: 'Repeating “gray” drains every colour from the scene, so the view becomes a picture of Della’s mood: with so little money, her whole world seems flat and lifeless.',
    partial: 'Repeating “gray” three times makes the scene seem dull and colourless, so that the cat, the fence and the backyard all blend together into one flat picture.',
    device: 'The writer uses repetition in this sentence, because the word “gray” appears three times: once for the cat, once for the fence and once for the backyard.',
    paraphrase: 'This shows that Della looked out of the window at a gray cat that was walking along a gray fence in a gray backyard behind the building.',
    overreach: 'This proves that Della hates living in the city and has wanted to leave New York, and her husband, for many years before the story begins.',
  },
  {
    text: FIRE,
    point: 'London presents the man’s lack of imagination as the flaw that will kill him.',
    evidence: 'The narrator says the man was “quick and alert in the things of life, but only in the things, and not in the significances.”',
    deep: 'Setting “the things” against “the significances” shows that the man notices facts but never asks what they mean for him, so he misses a danger the reader can see.',
    partial: 'The phrases “the things” and “the significances” are set against each other in the sentence, and the word “only” makes the difference between them stand out clearly.',
    device: 'London uses contrast here, because he puts two opposite ideas, “the things” and “the significances”, side by side in the same sentence about the man.',
    paraphrase: 'This shows that the man was quick and alert when it came to the things of life, but that he was not quick or alert when it came to their significances.',
    overreach: 'This proves that the man is stupid and deserves to die in the snow, and that London wants the reader to feel no sympathy for him at all by the end.',
  },
  {
    text: HEART,
    point: 'Poe’s narrator undermines his own claim to be sane.',
    evidence: 'To prove how sharp his senses are, the narrator boasts, “I heard many things in hell.”',
    deep: 'The boast of hearing “many things in hell” is meant to prove sharp senses, but it sounds like raving, so each claim to sanity makes the reader trust him less.',
    partial: 'Hearing “many things in hell” is a strange and extreme thing for anyone to claim, and the word “hell” makes the boast sound wild, dark and frightening.',
    device: 'This is an example of first-person narration, because the narrator speaks directly to the reader as “I” and describes what he heard with his own ears.',
    paraphrase: 'This shows that the narrator says he heard many things in hell, and that he wants the reader to know how sharp his sense of hearing has become.',
    overreach: 'This proves that Poe himself believed he could hear voices from hell, and that he wrote the story to describe his own illness to his readers.',
  },
  {
    text: CASK,
    point: 'Poe makes Montresor’s calm politeness more frightening than open anger.',
    evidence: 'Montresor explains that he continued “to smile in his face, and he did not perceive that my smile now was at the thought of his immolation.”',
    deep: 'The friendly “smile” and the cold “immolation” share one sentence, and the gap between them reveals the murderer behind the friend, more chilling than any threat.',
    partial: 'The word “immolation” sounds formal and cold, and it is a very unusual word to find in a sentence that also talks about a friendly, everyday smile.',
    device: 'This sentence contains irony, because Montresor smiles at Fortunato as if he were a friend while he is secretly thinking about something else entirely.',
    paraphrase: 'This shows that Montresor kept smiling at Fortunato in his usual way, and that Fortunato did not notice what Montresor was really thinking about.',
    overreach: 'This proves that Montresor had murdered many people before Fortunato, and that he has been planning killings like this one for most of his life.',
  },
  {
    text: PAW,
    point: 'Jacobs builds suspense in the final scene through small, quiet sounds.',
    evidence: 'Late at night, “a knock, so quiet and stealthy as to be scarcely audible, sounded on the front door.”',
    deep: 'Because the knock is “stealthy” and “scarcely audible”, the reader strains to hear it as the Whites do, and its quietness makes whatever stands outside more frightening.',
    partial: 'The word “stealthy” makes the knock sound secretive and careful, as if whoever is knocking does not want anyone in the house or the street to hear it.',
    device: 'The writer uses sound imagery here, because the sentence describes a knock on the front door and tells the reader exactly how quiet and soft that knock is.',
    paraphrase: 'This shows that late at night someone knocked very quietly on the front door of the house, so quietly that the knock could hardly be heard.',
    overreach: 'This proves that Herbert has come back from the grave as a monster, and that he is standing outside the door ready to attack his parents.',
  },
  {
    text: WINDOW,
    point: 'Saki makes Framton a figure of fun by showing how wrapped up in himself he is.',
    evidence: 'Framton “laboured under the tolerably widespread delusion that total strangers and chance acquaintances are hungry for the least detail of one’s ailments.”',
    deep: 'Calling his belief a “delusion” mocks Framton gently, so the reader laughs at a man too absorbed in his own health to notice that he is being tricked.',
    partial: 'Calling Framton’s belief a “delusion” makes it sound foolish and mistaken, and the word “hungry” makes strangers seem eager in a way that is plainly absurd.',
    device: 'This sentence uses humour, because the narrator describes Framton’s ideas about his own illnesses in a way that is meant to make the reader smile.',
    paraphrase: 'This shows that Framton thinks total strangers and chance acquaintances want to hear about his illnesses and every last detail of his health.',
    overreach: 'This proves that Framton is a cruel and selfish person who deserves to be frightened, and that Saki wants the reader to hate him from the start.',
  },
  {
    text: HOUR,
    point: 'Chopin shows how completely Mrs. Mallard has changed in a single hour.',
    evidence: '“She breathed a quick prayer that life might be long. It was only yesterday she had thought with a shudder that life might be long.”',
    deep: 'The same words, “that life might be long”, end a prayer and a shudder, so the reader feels her attitude to the future reverse in a single day.',
    partial: 'The phrase “that life might be long” appears twice, once at the end of each sentence, and the second sentence looks back to “only yesterday”.',
    device: 'Chopin uses repetition here, because the same phrase, “that life might be long”, is used in two sentences that sit right next to each other.',
    paraphrase: 'This shows that she prayed for a long life, even though only the day before she had shuddered at the thought that her life might be long.',
    overreach: 'This proves that Mrs. Mallard had planned to leave her husband for a long time, and that she had already decided to start a new life without him.',
  },
];

function analysisDepth(rng: Rng, d: Difficulty): GenOutput {
  const c = rng.pick(COMMENTARIES);
  const wrong = d === 1 ? [c.paraphrase, c.device] : d === 2 ? [c.paraphrase, c.device, c.overreach] : [c.partial, c.device, c.overreach];
  const ask = d === 3 ? 'Which commentary goes deepest: it explains how particular words work **and** connects them to the paragraph’s point?' : 'Which sentence of commentary goes deepest?';
  return {
    prompt: `A student is writing a body paragraph on ${titled(c.text)}:\n\n${block(`${c.point} ${c.evidence}`)}\n\n${ask}`,
    parts: [part(mc(rng, c.deep, wrong))],
    hints: [
      d === 3
        ? 'Deep commentary does two jobs: it looks closely at particular words and says how they work, and then it ties that effect back to the point of the paragraph.'
        : 'Commentary should explain *how* particular words create an effect. Restating the quotation or naming a device is not yet analysis.',
    ],
    solution: [
      `${q(c.deep)} goes deepest: it explains how particular words work and connects them to the point.`,
      d === 3
        ? 'Of the others, one explains a word but stops before linking it to the point, one only names a device, and one claims more than the evidence shows.'
        : d === 2
          ? 'Of the others, one repeats the quotation in other words, one only names a device, and one claims more than the evidence shows.'
          : 'One of the others repeats the quotation in other words, and the other only names a device.',
    ],
  };
}

// ---------------------------------------------------------------------------- lesson 6.2: comparative theses

type CWeak = 'vague' | 'listing' | 'oneSided' | 'noWhy';
const CWEAK_LABEL: Record<CWeak, string> = {
  vague: 'It says only that the texts are alike in some ways and different in others.',
  listing: 'It makes two separate claims without connecting the texts.',
  oneSided: 'It discusses only one of the two texts.',
  noWhy: 'It names a difference but does not say why the comparison matters.',
};
const CWEAK_SHORT: Record<CWeak, string> = {
  vague: 'say only that the texts are alike and different',
  listing: 'make two separate claims',
  oneSided: 'discuss only one text',
  noWhy: 'name a difference without saying why it matters',
};
const CWEAK_OVERLAP: Record<CWeak, CWeak[]> = { vague: ['noWhy'], noWhy: ['vague'], listing: [], oneSided: [] };

interface Pair {
  a: Story;
  b: Story;
  /** Three points of comparison, for outlines. */
  points: [string, string, string];
  strong: string;
  vague: string;
  listing: string;
  oneSided: string;
  noWhy: string;
}

const PAIRS: Pair[] = [
  {
    a: HEART,
    b: CASK,
    points: ['the narrator’s voice', 'guilt', 'the ending'],
    strong: 'Both of Poe’s murderers tell their own stories, but one is destroyed by guilt while Montresor is untouched by it, a contrast that makes Montresor’s calm the more chilling.',
    vague: '“The Tell-Tale Heart” and “The Cask of Amontillado” have many similarities and differences, from their narrators and crimes to their settings and endings.',
    listing: '“The Tell-Tale Heart” is about a man who kills an old man and hides the body. “The Cask of Amontillado” is about revenge in the catacombs.',
    oneSided: 'In “The Tell-Tale Heart”, Poe uses a frantic first-person narrator, full of dashes and exclamations, to show how guilt can destroy a mind from within.',
    noWhy: 'The narrator of “The Tell-Tale Heart” feels so guilty that he confesses to the police, but the narrator of “The Cask of Amontillado” feels no guilt at all.',
  },
  {
    a: MAGI,
    b: HOUR,
    points: ['the use of irony', 'the view of marriage', 'the final sentence'],
    strong: 'Both writers end with an ironic twist, but O. Henry’s affirms love’s sacrifices while Chopin’s exposes what marriage cost Mrs. Mallard, giving two opposite views of love.',
    vague: '“The Gift of the Magi” and “The Story of an Hour” are similar and different in many ways, including their characters, their settings, their endings and their themes.',
    listing: '“The Gift of the Magi” is about a poor couple who sell their treasures at Christmas. “The Story of an Hour” is about a woman who hears that her husband has died.',
    oneSided: 'In “The Gift of the Magi”, O. Henry uses an ironic ending, in which both gifts turn out to be useless, to show that love is worth far more than money.',
    noWhy: 'Both stories end with an ironic twist, but the irony in “The Gift of the Magi” is gentle and warm, while the irony in “The Story of an Hour” is dark and cruel.',
  },
  {
    a: FIRE,
    b: PAW,
    points: ['the warnings the characters ignore', 'the power the characters face', 'the ending'],
    strong: 'London and Jacobs both punish characters who ignore warnings, but London’s nature just obeys its laws while Jacobs’s paw seems vengeful: one world is indifferent, one cruel.',
    vague: '“To Build a Fire” and “The Monkey’s Paw” are alike in some ways and different in others, especially in their characters, their settings and their endings.',
    listing: '“To Build a Fire” is set in the frozen Yukon and follows a man and his dog. “The Monkey’s Paw” is about a magic paw that grants three terrible wishes.',
    oneSided: 'In “To Build a Fire”, London contrasts the man with his dog to show that nature does not care whether a person lives or dies in the cold of the Yukon.',
    noWhy: 'In “To Build a Fire” the danger the man faces is nature itself, but in “The Monkey’s Paw” the danger the family faces comes from a magic paw.',
  },
  {
    a: OZYMANDIAS,
    b: SONNET18,
    points: ['what time destroys', 'what survives', 'the tone of the ending'],
    strong: 'Shakespeare trusts his sonnet to keep his beloved alive, but Shelley shows a king’s proud words surviving only to mock him, so the poems suggest that art outlives power.',
    vague: '“Ozymandias” and “Sonnet 18” have some things in common and some differences, both in what they say about time and memory and in the way that each one is written.',
    listing: '“Ozymandias” is about a broken statue in the desert and the king it shows. “Sonnet 18” compares a person to a summer’s day and finds them lovelier.',
    oneSided: 'In “Sonnet 18”, Shakespeare claims that his poem will keep his beloved’s beauty alive forever, for as long as there are still people left alive to read it.',
    noWhy: '“Sonnet 18” is hopeful about what can survive the passing of time, but “Ozymandias” shows that time destroys even the works of great kings.',
  },
  {
    a: FLANDERS,
    b: DULCE,
    points: ['the speaking voice', 'the images of death', 'what the poem asks of the reader'],
    strong: 'McCrae’s dead urge the living to fight on, while Owen’s images attack the idea that such deaths are glorious, showing two ways of seeing the war from inside it.',
    vague: '“In Flanders Fields” and “Dulce et Decorum Est” are similar in some ways and different in others, especially in their speakers, their images and their endings.',
    listing: '“In Flanders Fields” is spoken by dead soldiers buried among the poppies. “Dulce et Decorum Est” describes a gas attack and a soldier’s death.',
    oneSided: 'In “Dulce et Decorum Est”, Owen uses shocking images of a gas attack and a dying soldier to show that war is not glorious but cruel and degrading.',
    noWhy: '“In Flanders Fields” is spoken by soldiers who have already died, but “Dulce et Decorum Est” describes a soldier dying in front of the speaker.',
  },
  {
    a: NOBODY,
    b: MASK,
    points: ['the reason for hiding', 'the central image', 'the tone'],
    strong: 'Dickinson’s speaker chooses to be a “nobody” and finds freedom in it, while Dunbar’s speakers must mask their suffering: the contrast separates privacy from oppression.',
    vague: '“I’m nobody! Who are you?” and “We Wear the Mask” have similarities and differences, especially in their speakers, their images and the feelings they express.',
    listing: '“I’m nobody! Who are you?” is a short, playful poem about being unknown. “We Wear the Mask” is about people hiding their pain behind a smiling face.',
    oneSided: 'In “We Wear the Mask”, Dunbar uses the image of a grinning mask to show how people facing injustice must hide their suffering from the rest of the world.',
    noWhy: 'Dickinson’s speaker is happy to be hidden from the public and all its noise, but Dunbar’s speakers are not at all happy to hide behind their masks.',
  },
  {
    a: SONNET18,
    b: REMEMBER,
    points: ['the picture of death', 'what the speaker wants', 'the turn in the poem'],
    strong: 'Shakespeare says his poem will keep his beloved alive, while Rossetti’s speaker would rather be forgotten than cause grief: one treats memory as a gift, one questions it.',
    vague: '“Sonnet 18” and “Remember” are alike in some ways and different in others, both in the way they think about death and memory and in the way each one is written.',
    listing: '“Sonnet 18” is about a beloved who is lovelier and more temperate than a summer’s day. “Remember” is about a woman who knows she is going to die.',
    oneSided: 'In “Remember”, Rossetti’s speaker asks her loved one to remember her, but then decides she would rather be forgotten than make that person grieve for her.',
    noWhy: 'Both poems are sonnets that imagine what happens after the speaker’s death, but their speakers want very different things from the people they love.',
  },
];

function comparativeThesis(rng: Rng, d: Difficulty): GenOutput {
  const p = rng.pick(PAIRS);
  const both = `${titled(p.a)} and ${titled(p.b)}`;
  if (d === 3) {
    const none = 'Nothing: it is a strong comparative thesis.';
    if (rng.chance(0.2)) {
      const others = rng.sample(['listing', 'oneSided', 'noWhy'] as CWeak[], 3).map((x) => CWEAK_LABEL[x]);
      return {
        prompt: `A student wrote this thesis for an essay comparing ${both}:\n\n${block(p.strong)}\n\nWhat, if anything, is its main weakness?`,
        parts: [part(mc(rng, none, others))],
        hints: ['A strong comparative thesis connects the two texts and says why the comparison matters: what we see by putting them side by side.'],
        solution: ['Nothing: it names what the texts share, how they differ, and what the comparison reveals.'],
      };
    }
    const w = rng.pick(Object.keys(CWEAK_LABEL) as CWeak[]);
    const others = (Object.keys(CWEAK_LABEL) as CWeak[]).filter((x) => x !== w && !CWEAK_OVERLAP[w].includes(x)).map((x) => CWEAK_LABEL[x]);
    return {
      prompt: `A student wrote this thesis for an essay comparing ${both}:\n\n${block(p[w])}\n\nWhat is its main weakness?`,
      parts: [part(mc(rng, CWEAK_LABEL[w], [...others, none]))],
      hints: ['A strong comparative thesis connects the two texts and says why the comparison matters: what we see by putting them side by side that we would miss in either one alone.'],
      solution: [CWEAK_LABEL[w], `A stronger thesis: ${q(p.strong)}`],
    };
  }
  const picked: CWeak[] = d === 1 ? ['vague', 'listing'] : ['noWhy', 'oneSided', rng.pick(['listing', 'vague'] as CWeak[])];
  return {
    prompt: `Which is the strongest **thesis** for an essay comparing ${both}?`,
    parts: [part(mc(rng, p.strong, picked.map((w) => p[w])))],
    hints: ['A comparative thesis must connect the two texts, and the strongest one also says why the comparison matters.'],
    solution: [`${q(p.strong)} connects the two texts and says what the comparison reveals.`, `The others ${orList(picked.map((w) => CWEAK_SHORT[w]))}.`],
  };
}

// ---------------------------------------------------------------------------- lesson 6.2: block and point-by-point

const cap = (s: string) => s[0].toUpperCase() + s.slice(1);
const t = (s: Story) => `“${s.title}”`;

/** An outline as a numbered list (for a prompt) or on one line with arrows (for a choice, which renders inline). */
function outline(sections: string[], inline: boolean): string {
  return inline ? sections.join(' → ') : sections.map((x, i) => `${i + 1}. ${x}`).join('\n');
}
function blockOutline(p: Pair, inline = false): string {
  return outline(['Introduction and comparative thesis', `${t(p.a)}: ${p.points.join('; ')}`, `${t(p.b)}: ${p.points.join('; ')}, with links back to ${t(p.a)}`, 'Conclusion: what the comparison shows'], inline);
}
function pointOutline(p: Pair, inline = false): string {
  return outline(['Introduction and comparative thesis', ...p.points.map((x) => `${cap(x)}: ${t(p.a)}, then ${t(p.b)}`), 'Conclusion: what the comparison shows'], inline);
}
function oneTextOutline(p: Pair): string {
  return outline(['Introduction and thesis', ...p.points.map((x) => `${cap(x)} in ${t(p.a)}`), 'Conclusion'], true);
}
function plotOutline(p: Pair): string {
  return outline(['Introduction', `What happens in ${t(p.a)}`, `What happens in ${t(p.b)}`, 'Conclusion: which one I liked better'], true);
}

const BLOCK = 'Block (subject by subject): all of one text, then all of the other';
const POINT = 'Point by point: one point at a time, discussing both texts under each';

const PURPOSES: Array<{ ask: string; point: boolean; why: string }> = [
  { ask: 'A student is writing a long essay comparing two novels on five points and wants the reader never to lose sight of how the novels differ.', point: true, why: 'Point by point keeps both texts side by side under every point, so the comparison never drops out of view in a long essay.' },
  { ask: 'An exam question says: “Write one paragraph on each poem, then a final paragraph comparing them.”', point: false, why: 'The question itself asks for all of one poem, then all of the other, then the comparison: that is block structure.' },
  { ask: 'A student’s first draft reads like two separate essays, with no comparison until the last paragraph. The student wants every paragraph to compare.', point: true, why: 'Point by point makes each paragraph discuss both texts, so comparison happens all the way through.' },
  { ask: 'A student is comparing a very short poem with a long story and wants the reader to see the short poem whole before turning to the story.', point: false, why: 'Block structure presents one text completely before the other, which is what the student wants for the short poem.' },
];

function comparisonStructure(rng: Rng, d: Difficulty): GenOutput {
  const p = rng.pick(PAIRS);
  if (d === 1) {
    const isPoint = rng.chance(0.5);
    return {
      prompt: `A student planned an essay comparing ${titled(p.a)} and ${titled(p.b)}:\n\n${isPoint ? pointOutline(p) : blockOutline(p)}\n\nWhich organization does this outline use?`,
      parts: [part(fixedChoice([BLOCK, POINT], isPoint ? 1 : 0))],
      hints: ['Look at the body sections. Does each section deal with one whole text, or with one point in both texts?'],
      solution: [isPoint ? 'Each body section takes one point and discusses both texts under it, so the outline is point by point.' : 'Each body section deals with one whole text, so the outline is in blocks.'],
    };
  }
  if (d === 2) {
    if (rng.chance(0.5)) {
      const u = rng.pick(PURPOSES);
      return {
        prompt: `${u.ask}\n\nWhich organization suits this purpose better?`,
        parts: [part(fixedChoice([BLOCK, POINT], u.point ? 1 : 0))],
        hints: ['Block structure presents each text whole; point-by-point structure keeps both texts side by side under each point.'],
        solution: [u.why],
      };
    }
    return {
      prompt: `A student is planning an essay comparing ${titled(p.a)} and ${titled(p.b)}. Which outline is organized **point by point**?`,
      parts: [part(mc(rng, pointOutline(p, true), [blockOutline(p, true), oneTextOutline(p), plotOutline(p)]))],
      hints: ['In a point-by-point outline, every body section names one point and discusses both texts under it.'],
      solution: ['The point-by-point outline gives each body section one point and discusses both texts under it.', 'Of the others, one is in blocks, one discusses only one text, and one retells the plots instead of comparing.'],
    };
  }
  const [x, y] = rng.sample([0, 1, 2], 2).map((i) => p.points[i]);
  const steps = [
    'Introduction ending with a comparative thesis',
    `${cap(x)} in ${t(p.a)}`,
    `${cap(x)} in ${t(p.b)}`,
    `${cap(y)} in ${t(p.a)}`,
    `${cap(y)} in ${t(p.b)}`,
    'Conclusion: what the comparison shows',
  ];
  return order(
    rng,
    `A student is comparing ${titled(p.a)} and ${titled(p.b)} point by point: first ${x}, then ${y}, discussing ${t(p.a)} before ${t(p.b)} under each point. Put the sections of the outline in order.`,
    steps,
    ['In point-by-point structure, finish one point in both texts before moving to the next point.'],
    [`The introduction comes first, then ${x} in both texts, then ${y} in both texts, and the conclusion last.`],
  );
}

export const ANALYSIS_SKILLS: SkillDef[] = [
  skill({
    id: 'e11-literary-thesis',
    name: 'The analytical thesis',
    description: 'Choose a thesis that says how a text creates meaning and why it matters, and name what is wrong with a weaker one.',
    outcomes: OUTCOMES,
    lessonId: LIT,
    format: 'mc',
    gen: literaryThesis,
  }),
  skill({
    id: 'e11-analysis-depth',
    name: 'Depth of analysis',
    description: 'Choose commentary that explains how particular words create an effect and ties them to the paragraph’s point, rather than paraphrase, device-spotting or overreaching.',
    outcomes: OUTCOMES,
    lessonId: LIT,
    format: 'mc',
    gen: analysisDepth,
  }),
  skill({
    id: 'e11-comparative-thesis',
    name: 'The comparative thesis',
    description: 'Choose a comparative thesis that connects two texts and says why the comparison matters, and name what is wrong with a weaker one.',
    outcomes: OUTCOMES,
    lessonId: COMP,
    format: 'mc',
    gen: comparativeThesis,
  }),
  skill({
    id: 'e11-comparison-structure',
    name: 'Block and point-by-point structure',
    description: 'Recognize block and point-by-point organization, choose the one that suits a purpose, and order a point-by-point outline.',
    outcomes: OUTCOMES,
    lessonId: COMP,
    format: 'mc',
    gen: comparisonStructure,
  }),
];
