/**
 * Grade 12 English, lessons 6.1 and 6.2: The Critical Essay and The Comparative Literary Essay
 * (12-F1). A sophisticated thesis takes a position on how and why a text means and takes on a real
 * tension in it; critical commentary weighs a second reading instead of settling too soon; a
 * comparative argument shows what neither text shows alone. The texts are the public-domain stories
 * and poems of Grades 10 and 11, and every quoted phrase is exact. Every weak choice is written as
 * fully as the strong one, so length never gives the answer away (answer-length.test.ts).
 */
import { mc, part, skill, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { block, q } from '../../eng10/gen/common.ts';
import { ARABY_ENDING, BOAT_ENDING, BROWN_RETURN, BRILL_STAGE, HERON_GUN, PAPER_CAREFUL, VEIL_EVERY, ARABY, BRILL, BROWN, HERON, PARTY, VEIL, WALLPAPER, BOAT } from '../../eng20/gen/stories.ts';
import { CASK, FIRE, HEART, HOUR, HOUR_ENDING, MAGI, quoteBlock, titled, type Excerpt, type Story } from '../../eng10/gen/texts.ts';
import { DULCE, MASK, OZYMANDIAS } from '../../eng10/gen/poems.ts';
import { andList, orList } from './writing-lists.ts';

const CRITICAL = 'e12-6-1';
const COMPARE = 'e12-6-2';
const OUTCOMES = ['12-F1'];

// ---------------------------------------------------------------------------- lesson 6.1: the sophisticated thesis

type TWeak = 'obvious' | 'summary' | 'overreach' | 'list';
const TWEAK_LABEL: Record<TWeak, string> = {
  obvious: 'It is accurate but obvious: it names a meaning nearly every reader already sees.',
  summary: 'It retells what happens in the text instead of making any arguable claim.',
  overreach: 'It claims more than the text can support, about its author or about everyone.',
  list: 'It lists the writer’s techniques without making a claim about what they reveal.',
};
const TWEAK_SHORT: Record<TWeak, string> = {
  obvious: 'state an accurate but obvious reading with no tension in it',
  summary: 'retell the plot',
  overreach: 'claim more than the text can support',
  list: 'list techniques without a claim',
};
const THESIS_NONE = 'Nothing: it is arguable, and it takes on a real tension in the text.';

interface ThesisSet {
  text: Story;
  /** Takes a position on how and why the text means, and engages a tension or complexity. */
  strong: string[];
  /** Technique plus meaning, accurate, but the reading nearly everyone already shares. */
  obvious: string;
  summary: string;
  /** Claims about the author's life, or absolutes about everyone, that the text cannot support. */
  overreach: string;
  list: string;
}

const THESES: ThesisSet[] = [
  {
    text: HOUR,
    strong: [
      'Chopin never makes Brently Mallard cruel, and that restraint sharpens the story: even a kind marriage, she suggests, can confine a woman, which makes the widow’s joy unsettling rather than simply freeing.',
      'Chopin lets Mrs. Mallard’s grief and her joy rise together in a single hour, so the story refuses to call her either heartless or merely relieved, and asks what a marriage was costing her all along.',
    ],
    obvious: 'In “The Story of an Hour”, Chopin uses the open window and the spring imagery to show that Mrs. Mallard feels free after she hears that her husband has died in a railway accident.',
    summary: 'In “The Story of an Hour”, Mrs. Mallard hears that her husband has died, locks herself in her room, feels a growing sense of freedom by the window and dies of shock when he walks through the door alive.',
    overreach: 'Chopin wrote “The Story of an Hour” to prove that every marriage of her time was a prison and that every married woman in the 1890s secretly longed for her husband to die, whatever she said in public.',
    list: 'In “The Story of an Hour”, Chopin uses imagery, irony, symbolism, foreshadowing and a narrator who reveals Mrs. Mallard’s thoughts, especially in the long scene by the open window.',
  },
  {
    text: MAGI,
    strong: [
      'O. Henry’s narrator first calls Della and Jim foolish children and then names them the wisest of givers, a reversal that unsettles the very idea of wisdom the story seemed to accept.',
      'O. Henry counts every cent in the opening and then makes both gifts useless, so the story measures the couple’s love in a currency that its own careful arithmetic cannot count.',
    ],
    obvious: 'In “The Gift of the Magi”, O. Henry uses an ironic ending, in which both gifts turn out to be useless, to show that love is worth far more than any amount of money.',
    summary: 'In “The Gift of the Magi”, Della sells her long hair to buy Jim a chain for his watch, and Jim sells his watch to buy Della combs, so in the end neither of their Christmas gifts can be used.',
    overreach: 'O. Henry wrote “The Gift of the Magi” to prove that poor people are always more loving than rich people, and that anyone who has money cares about nothing else in life, not even the people they love.',
    list: 'O. Henry uses irony, a chatty narrator, exact sums of money, a surprise ending and an allusion to the Magi in “The Gift of the Magi”, especially in its final paragraph about the Magi.',
  },
  {
    text: HEART,
    strong: [
      'Poe’s narrator argues for his sanity with such careful logic that the reader is caught between his reasoning and his acts, which makes the story’s horror as much intellectual as physical.',
      'Poe has the narrator set his chair over the very spot where the body lies, so the story suggests that pride in his own cleverness, as much as guilt, is what finally betrays him.',
    ],
    obvious: 'In “The Tell-Tale Heart”, Poe uses a first-person narrator who insists that he is sane to show that guilt can drive a person mad and force him to confess to his crime.',
    summary: 'In “The Tell-Tale Heart”, a man kills an old man because of his eye, hides the body under the floor and confesses to the police when he believes he can hear the heart still beating.',
    overreach: 'Poe wrote “The Tell-Tale Heart” about his own madness, and the story proves that he himself was a dangerous man who heard voices and could easily have killed someone, just as his narrator does.',
    list: 'Poe uses a first-person narrator, repetition, dashes, exclamations and the symbol of the beating heart in “The Tell-Tale Heart”, especially in the final scene with the police officers.',
  },
  {
    text: BROWN,
    strong: [
      'Hawthorne refuses to say whether Brown’s night in the forest was real, and that refusal moves the horror from the devil to Brown himself, whose suspicion poisons the rest of his life.',
      'Hawthorne names Brown’s wife Faith and then lets him lose her in the forest, so the allegory seems simple, yet the story leaves open whether Faith failed Brown or Brown failed her.',
    ],
    obvious: 'In “Young Goodman Brown”, Hawthorne uses the dark forest and the witches’ meeting to show that Goodman Brown loses his faith in the goodness of the people around him.',
    summary: 'In “Young Goodman Brown”, Brown leaves his wife Faith for a night in the forest, sees the townspeople at a witches’ meeting and returns home a gloomy, distrustful man for the rest of his life.',
    overreach: 'Hawthorne wrote “Young Goodman Brown” to prove that everyone in Salem was secretly evil, and that religion has always turned every believer, everywhere, into a hypocrite.',
    list: 'Hawthorne uses allegory, symbolism, a dark forest setting, an ambiguous dream and names with double meanings, such as Faith, in “Young Goodman Brown”, especially at the end.',
  },
  {
    text: WALLPAPER,
    strong: [
      'Gilman makes the narrator’s madness grow out of the very rest meant to cure her, so her breakdown reads both as a collapse and as a desperate escape from the role her husband prescribes.',
      'Gilman lets the narrator praise her husband’s care in the same sentences that show its control, so the story exposes a harm that no one in the house, not even the narrator, fully names.',
    ],
    obvious: 'In “The Yellow Wallpaper”, Gilman uses the wallpaper as a symbol to show that the narrator is going mad because she is shut away in a room with nothing to do all day.',
    summary: 'In “The Yellow Wallpaper”, a woman is taken to a country house to rest, grows obsessed with the wallpaper in her room and finally tears it down to free the woman she sees in it.',
    overreach: 'Gilman wrote “The Yellow Wallpaper” to prove that every doctor of her time was cruel and that every husband in the 1890s deliberately set out to drive his wife mad, as John does in the story.',
    list: 'Gilman uses a first-person journal, symbolism, repetition, a gothic setting and an unreliable narrator in “The Yellow Wallpaper”, especially in its final pages.',
  },
  {
    text: ARABY,
    strong: [
      'Joyce lets the adult narrator retell his boyhood in the language of romance and religion, so the ending mocks his younger self’s vanity while still honouring the intensity of what he felt.',
      'Joyce makes the bazaar fail the boy in the same way his imagination had made it holy, so the epiphany exposes not only a childish crush but a habit of turning ordinary things into shrines.',
    ],
    obvious: 'In “Araby”, Joyce uses the dark, closing bazaar to show that the boy is bitterly disappointed when he cannot buy the gift he promised to the girl he admires so much.',
    summary: 'In “Araby”, a boy falls for his friend’s sister, promises to bring her a gift from a bazaar, arrives late after his uncle forgets and leaves the dark hall without buying anything at all.',
    overreach: 'Joyce wrote “Araby” to prove that first love is always foolish, and that every young person who falls in love will end up bitter and disappointed for the rest of their life.',
    list: 'Joyce uses first-person narration, light and dark imagery, religious language, a quest structure and an epiphany in “Araby”, especially in its last paragraph at the bazaar.',
  },
  {
    text: BRILL,
    strong: [
      'Mansfield tells “Miss Brill” almost entirely through its heroine’s cheerful thoughts, so the reader sees her loneliness before she does, and the overheard insult is both cruel and clarifying.',
      'Mansfield gives Miss Brill a fantasy of the park as a stage, and the story treats it with sympathy rather than scorn, so its collapse feels like a loss as much as a correction.',
    ],
    obvious: 'In “Miss Brill”, Mansfield uses the fur necklet as a symbol to show that Miss Brill is a lonely woman who imagines that she is part of the crowd in the park on Sundays.',
    summary: 'In “Miss Brill”, a woman goes to the park on Sunday, enjoys watching the people around her, overhears a young couple mocking her and goes home in sadness to her little room.',
    overreach: 'Mansfield wrote “Miss Brill” to prove that all young people are cruel to the old, and that every woman who lives alone is lonely and unhappy, whatever she may say to her neighbours.',
    list: 'Mansfield uses free indirect style, the fur necklet as a symbol, music, an overheard conversation and a quiet ending in “Miss Brill”, especially in its final paragraph.',
  },
  {
    text: VEIL,
    strong: [
      'Hawthorne never reveals what Mr. Hooper’s veil hides, and that silence turns the veil into a mirror: the townspeople’s fear of it says more about their own secret sins than about his.',
      'Hawthorne lets the veil make Mr. Hooper a better preacher and a lonelier man at once, so the story asks whether a truth about sin is worth the human ties it costs.',
    ],
    obvious: 'In “The Minister’s Black Veil”, Hawthorne uses the black veil as a symbol of secret sin to show that every person hides some of their sins from other people, even from those they love.',
    summary: 'In “The Minister’s Black Veil”, Mr. Hooper begins to wear a black veil, refuses to remove it even for the woman he is to marry and is buried still wearing it years later.',
    overreach: 'Hawthorne wrote “The Minister’s Black Veil” to prove that every minister in New England was hiding a terrible crime, and that the church was full of liars and cheats, from the pulpit to the door.',
    list: 'Hawthorne uses symbolism, ambiguity, a parable structure, a deathbed speech and a small-town setting in “The Minister’s Black Veil”, especially at Mr. Hooper’s death.',
  },
  {
    text: OZYMANDIAS,
    strong: [
      'Shelley frames Ozymandias’s boast inside a traveller’s report, so the poem honours the sculptor’s skill even as it mocks the king, suggesting that art outlasts power but not time.',
      'Shelley lets the king’s own inscription survive to mock him, so the poem finds its sharpest irony not in the ruin itself but in the words that were meant to make the ruin impossible.',
    ],
    obvious: 'In “Ozymandias”, Shelley uses the broken statue and its proud inscription to show that even the most powerful rulers in history are forgotten as time passes.',
    summary: 'In “Ozymandias”, a traveller describes a broken statue in the desert, with two huge stone legs, a shattered face and a boastful inscription carved on its pedestal.',
    overreach: 'Shelley wrote “Ozymandias” to prove that every king in history was a cruel tyrant and that all of their works, without exception, have already turned to dust in the desert sands.',
    list: 'Shelley uses a sonnet, a frame narrator, irony, imagery and an inscription in “Ozymandias”, especially in the contrast between the boast and the lone and level sands.',
  },
  {
    text: DULCE,
    strong: [
      'Owen turns the reader into a witness who cannot look away, so the poem’s anger falls not only on the generals but on everyone at home who repeats the old Latin lie.',
      'Owen ends by addressing one comfortable reader as “My friend”, a phrase both inviting and accusing, which keeps the poem from becoming only a description of war.',
    ],
    obvious: 'In “Dulce et Decorum Est”, Owen uses shocking images of a gas attack and a dying soldier to show that war is not glorious at all, but cruel, ugly and horrible.',
    summary: 'In “Dulce et Decorum Est”, exhausted soldiers march away from the front line, a gas attack begins and one man fails to fit his mask in time and dies in agony.',
    overreach: 'Owen wrote “Dulce et Decorum Est” to prove that no war in history has ever been worth fighting and that every soldier who dies in battle has died for nothing.',
    list: 'Owen uses similes, graphic imagery, a Latin title, a sudden shift into the present tense and direct address to the reader in “Dulce et Decorum Est”, especially at the end.',
  },
  {
    text: MASK,
    strong: [
      'Dunbar’s speakers expose the mask in the very act of wearing it, so the poem is both a disguise and a confession, revealing the pain that it claims the world will never see.',
      'Dunbar keeps the poem’s “we” deliberately unnamed, so its mask belongs to a whole people and to no one in particular, which widens the protest while protecting the speakers.',
    ],
    obvious: 'In “We Wear the Mask”, Dunbar uses the image of a smiling mask to show that people who face injustice must hide their suffering from the rest of the world.',
    summary: 'In “We Wear the Mask”, the speakers say that they wear masks that smile while they suffer inside, and that the world sees only the masks and not the pain hidden behind them.',
    overreach: 'Dunbar wrote “We Wear the Mask” to prove that nobody in the world ever shows their true feelings, and that everyone who smiles is secretly suffering behind a cheerful face.',
    list: 'Dunbar uses a metaphor, repetition, rhyme, a refrain and a speaker who says “we” in “We Wear the Mask”, especially in the short final stanza of the poem.',
  },
  {
    text: HERON,
    strong: [
      'Jewett lets Sylvia keep the heron’s secret without being sure it was right, and that uncertainty turns a simple choice between nature and money into a loss whatever she decides.',
      'Jewett gives the hunter real charm rather than villainy, so Sylvia’s silence costs her a friendship she wanted, and the story honours her choice without pretending it was easy.',
    ],
    obvious: 'In “A White Heron”, Jewett uses Sylvia’s climb up the great pine tree to show that she chooses to protect nature and the heron instead of helping the young hunter.',
    summary: 'In “A White Heron”, a girl meets a hunter who offers money for help in finding a rare heron, climbs a pine tree to find its nest and then decides to keep the secret.',
    overreach: 'Jewett wrote “A White Heron” to prove that every hunter is cruel and that people who live in the country are always better and kinder than people from the city.',
    list: 'Jewett uses a third-person narrator, nature imagery, a climb up a tall pine tree, direct address to the reader and an open ending in “A White Heron”, especially in its final paragraph.',
  },
];

function criticalThesis(rng: Rng, d: Difficulty): GenOutput {
  const s = rng.pick(THESES);
  const right = rng.pick(s.strong);
  if (d === 3) {
    if (rng.chance(0.2)) {
      const others = rng.sample(Object.keys(TWEAK_LABEL) as TWeak[], 3).map((x) => TWEAK_LABEL[x]);
      return {
        prompt: `A student wrote this thesis for a critical essay on ${titled(s.text)}:\n\n${block(right)}\n\nWhat, if anything, is its main weakness?`,
        parts: [part(mc(rng, THESIS_NONE, others))],
        hints: ['A sophisticated thesis is arguable, says how and why the text means and takes on a tension or complexity that a quick reading would miss.'],
        solution: ['Nothing: it takes a position that a reader could dispute, and it engages a real tension in the text rather than its most obvious meaning.'],
      };
    }
    const w = rng.pick(Object.keys(TWEAK_LABEL) as TWeak[]);
    const others = (Object.keys(TWEAK_LABEL) as TWeak[]).filter((x) => x !== w).map((x) => TWEAK_LABEL[x]);
    return {
      prompt: `A student wrote this thesis for a critical essay on ${titled(s.text)}:\n\n${block(s[w])}\n\nWhat is its main weakness?`,
      parts: [part(mc(rng, TWEAK_LABEL[w], [...rng.sample(others, 2), THESIS_NONE]))],
      hints: ['Test the thesis three ways: is it a claim, not a summary or a list? Does the text support it? Would a thoughtful reader find anything in it to argue with?'],
      solution: [TWEAK_LABEL[w], `A more sophisticated thesis: ${q(right)}`],
    };
  }
  const picked: TWeak[] = d === 1 ? ['summary', 'list'] : ['obvious', 'overreach', rng.pick(['summary', 'list'] as TWeak[])];
  return {
    prompt: `Which is the most **sophisticated** thesis for a critical essay on ${titled(s.text)}: arguable, and alert to a tension or complexity in the text?`,
    parts: [part(mc(rng, right, picked.map((w) => s[w])))],
    hints: [
      d === 1
        ? 'A thesis must make a claim about the text. Retelling events or naming techniques is not yet a claim.'
        : 'Several of these are accurate. Look for the one a thoughtful reader could argue with, because it takes on something difficult or double in the text.',
    ],
    solution: [`${q(right)} takes a position on how and why the text means, and engages a tension rather than the most obvious reading.`, `The others ${orList(picked.map((w) => TWEAK_SHORT[w]))}.`],
  };
}

// ---------------------------------------------------------------------------- lesson 6.1: commentary that weighs complexity

type CKind = 'complex' | 'oneSided' | 'paraphrase' | 'assertion' | 'overreach';
const CKIND_LABEL: Record<CKind, string> = {
  complex: 'Nothing: it weighs the tension in the passage instead of settling it too soon.',
  oneSided: 'It explains the words well but ignores the tension or second reading they invite.',
  paraphrase: 'It repeats the quotation in other words instead of analysing what it shows.',
  assertion: 'It asserts a large meaning without showing how these words create that meaning.',
  overreach: 'It claims far more than the passage, or the story as a whole, can support.',
};
const CKIND_SHORT: Record<Exclude<CKind, 'complex'>, string> = {
  oneSided: 'explains the words but misses the tension',
  paraphrase: 'repeats the quotation in other words',
  assertion: 'asserts a meaning without showing how the words create it',
  overreach: 'claims more than the passage supports',
};

interface Commentary {
  excerpt: Excerpt;
  /** The point of the student's paragraph. */
  point: string;
  complex: string;
  oneSided: string;
  paraphrase: string;
  assertion: string;
  overreach: string;
}

const COMMENTARIES: Commentary[] = [
  {
    excerpt: HOUR_ENDING,
    point: 'Chopin ends the story with an irony that turns on what the doctors cannot see.',
    complex: 'The doctors mean joy at seeing her husband alive, but the reader knows her joy came from his death; the phrase is still true in a darker sense, since losing that joy is what killed her.',
    oneSided: 'Putting “joy” beside “kills” makes a paradox, since joy usually gives life, and the clash between the two words gives the ending a sudden, shocking force that the reader does not expect.',
    paraphrase: 'This shows that when the doctors arrived, they decided that Mrs. Mallard had died of heart disease, and that the joy of seeing her husband again was too much for her weak heart.',
    assertion: 'This ending proves that Chopin is attacking marriage and the way women were treated in the 1890s, which is clearly the most important and most meaningful idea in the whole of the story.',
    overreach: 'This proves that the doctors knew perfectly well that Mrs. Mallard was glad her husband had died, and that they invented the story about joy to protect the family’s good name.',
  },
  {
    excerpt: PAPER_CAREFUL,
    point: 'Gilman shows how the narrator’s husband controls her through his care.',
    complex: 'She offers “careful and loving” as praise, yet “hardly lets me stir” describes a prison; the sentence lets her defend John and expose him at once, before she can see what she has said.',
    oneSided: 'The words “careful and loving” present John as a devoted husband who looks after his wife, and the phrase “special direction” suggests that he plans every moment of her rest for her.',
    paraphrase: 'This shows that the narrator says her husband John is very careful and loving towards her, and that he hardly lets her move about without giving her a special instruction first.',
    assertion: 'This sentence proves that John is the real villain of the story and that Gilman wants every one of her readers to hate him, which is clearly the main point of “The Yellow Wallpaper” as a whole.',
    overreach: 'This proves that John knows his treatment is driving his wife mad, and that he keeps her in the room on purpose so that he can take control of her money and her house.',
  },
  {
    excerpt: BROWN_RETURN,
    point: 'Hawthorne shows how Brown’s night in the forest has changed the way he sees his wife.',
    complex: 'Faith’s joy has no shadow in it, so she seems innocent; yet Brown’s stern look recalls the pink ribbon in the forest, and the story never settles whether his suspicion or her joy tells the truth.',
    oneSided: 'Faith skips along the street and almost kisses her husband in public, while Brown looks at her “sternly and sadly” and walks on, so the contrast between her warmth and his coldness is sharp.',
    paraphrase: 'This shows that when Goodman Brown came back to the village, his wife Faith ran to meet him happily, but he only looked at her sadly and walked past her without saying anything.',
    assertion: 'This scene proves that Hawthorne believes all marriages are built on lies and that nobody can ever truly trust the person they love, which is the central message of the whole of “Young Goodman Brown”.',
    overreach: 'This proves that Faith really was at the witches’ meeting in the forest the night before, and that she is only pretending to be glad so that her husband will not suspect her.',
  },
  {
    excerpt: ARABY_ENDING,
    point: 'Joyce ends the story with the boy’s judgement of himself.',
    complex: 'The adult narrator condemns his younger self as “driven and derided by vanity”, yet “anguish and anger” keep the feeling at full strength; the sentence judges the romance and still honours its pain.',
    oneSided: 'The phrase “driven and derided” uses alliteration to make the boy sound helpless, as if his vanity pushed him forward and then laughed at him, and the darkness around him matches his mood.',
    paraphrase: 'This shows that as the boy stood looking up into the dark and empty hall, he realized that he had been driven by vanity and made a fool of, and that his eyes were burning with anguish and with anger.',
    assertion: 'This ending proves that Joyce thinks love is always a waste of time for young people, which is the most important idea that the story wants every one of its readers to understand.',
    overreach: 'This proves that the boy will grow up to be a bitter, lonely man who never trusts anyone, and that Joyce himself was never able to love anyone after his own childhood.',
  },
  {
    excerpt: VEIL_EVERY,
    point: 'At his death, Mr. Hooper explains what his veil has meant.',
    complex: 'Hooper turns the veil back on his listeners, saying every face hides sin; yet his refusal to lift it also made him the loneliest man in the village, so the symbol accuses others and condemns him too.',
    oneSided: 'The cry “on every visage a Black Veil!” turns the veil from one man’s strange habit into a symbol for everyone, and the capital letters make it sound like a solemn judgement on the whole village.',
    paraphrase: 'This shows that on his deathbed, Mr. Hooper tells the people around him to call him a monster only when everyone shows their true heart, and that he sees a black veil on every face.',
    assertion: 'This speech proves that Hawthorne hated religion and the church and that he wrote the story to show that all ministers are hypocrites, which is clearly the most important idea in the whole of the story.',
    overreach: 'This proves that Mr. Hooper had committed a terrible crime as a young man, and that he wore the veil for the rest of his life so that no one would ever recognize him.',
  },
  {
    excerpt: BRILL_STAGE,
    point: 'Mansfield shows how Miss Brill imagines her place in the life of the park.',
    complex: 'That “even she had a part” is touching, since it gives her lonely Sundays meaning; yet she cast herself in the role, and the reader senses how easily a part no one else gave her can be taken away.',
    oneSided: 'The metaphor of the stage turns the park into a theatre, and the short, excited sentences show how thrilled Miss Brill is to find that she is not just watching other people but acting with them.',
    paraphrase: 'This shows that Miss Brill suddenly realizes that everyone in the park is on a stage, not just watching but acting, and that she too has a part to play there every Sunday.',
    assertion: 'This passage proves that Mansfield believes life is only a play and that nothing that happens to any of us is real, which is the most important message she wanted all of her readers to take away from it.',
    overreach: 'This proves that Miss Brill cannot tell the difference between real life and the theatre at all, and that she will soon have to be taken away from her home and cared for.',
  },
  {
    excerpt: BOAT_ENDING,
    point: 'Crane ends “The Open Boat” with what the survivors believe they have learned.',
    complex: 'The men feel they can now “be interpreters” of the sea, yet the story has shown nature indifferent to them; the ending leaves open whether their new understanding is wisdom or a story they need to tell.',
    oneSided: 'The white waves pacing “to and fro in the moonlight” give the sea a calm, almost human movement, and the phrase “the great sea’s voice” makes nature sound as though it is finally speaking.',
    paraphrase: 'This shows that when night came, the white waves moved back and forth in the moonlight, and the wind carried the sound of the great sea to the men on the shore, who now felt that they could interpret it.',
    assertion: 'This ending proves that Crane believes nature is always kind to people in the end, which is clearly the most important and hopeful idea in the whole of “The Open Boat”.',
    overreach: 'This proves that the survivors went on to become famous writers who told the world about the sea, and that every one of them later wrote a book about the shipwreck.',
  },
  {
    excerpt: HERON_GUN,
    point: 'Jewett shows the mixed feelings Sylvia has about the young hunter.',
    complex: 'Sylvia is drawn to the hunter, yet his gun troubles her; the sentence holds both feelings at once, and the contradiction she sees in him, loving the birds he kills, foreshadows her choice.',
    oneSided: 'The phrase “vastly better” shows how strongly Sylvia dislikes the gun, and the words “the very birds” stress how strange it seems to her that he would kill the creatures he admires.',
    paraphrase: 'This shows that Sylvia would have liked the young man much more if he had not carried a gun with him, and that she could not understand why he killed the very birds that he seemed to like so much.',
    assertion: 'This sentence proves that Jewett was against all hunting and wanted to persuade her readers to stop killing animals, which is clearly the main purpose of “A White Heron”.',
    overreach: 'This proves that Sylvia secretly hates the hunter and has planned from the very start to trick him, so that he will leave the farm without ever finding the heron’s nest.',
  },
];

function criticalAnalysis(rng: Rng, d: Difficulty): GenOutput {
  const c = rng.pick(COMMENTARIES);
  const lead = `A student’s paragraph on ${titled(c.excerpt.story)} makes this point:\n\n${block(c.point)}\n\nIts evidence is this passage:\n\n${quoteBlock(c.excerpt)}`;
  if (d === 3) {
    const kind = rng.pick(Object.keys(CKIND_LABEL) as CKind[]);
    const others = rng.sample((Object.keys(CKIND_LABEL) as CKind[]).filter((k) => k !== kind), 3).map((k) => CKIND_LABEL[k]);
    return {
      prompt: `${lead}\n\nThe student’s commentary on it:\n\n${block(c[kind])}\n\nWhat, if anything, is wrong with this commentary?`,
      parts: [part(mc(rng, CKIND_LABEL[kind], others))],
      hints: ['Critical commentary explains how the words work and then asks what else they might mean: a tension, a second reading or what the character cannot see.'],
      solution: [CKIND_LABEL[kind], kind === 'complex' ? 'It explains the words and then weighs the tension they create, which is what critical analysis does.' : `Commentary that weighs the tension: ${q(c.complex)}`],
    };
  }
  const wrong: Array<Exclude<CKind, 'complex'>> = d === 1 ? ['paraphrase', 'assertion'] : ['oneSided', 'paraphrase', rng.pick(['assertion', 'overreach'] as const)];
  return {
    prompt: `${lead}\n\nWhich commentary best handles the **complexity** of the passage?`,
    parts: [part(mc(rng, c.complex, wrong.map((k) => c[k])))],
    hints: [
      d === 1
        ? 'Analysis explains what the words do. Repeating the quotation, or announcing a big meaning without showing how the words create it, is not yet analysis.'
        : 'More than one of these looks closely at the words. The best one also notices a tension, a second reading or something a character cannot see.',
    ],
    solution: [`${q(c.complex)} explains how the words work and weighs the tension they create.`, `Of the others, ${andList(wrong.map((k) => `one ${CKIND_SHORT[k]}`))}.`],
  };
}

// ---------------------------------------------------------------------------- lesson 6.2: the comparative argument

type PKind = 'strong' | 'similar' | 'listing' | 'noInsight' | 'oneSided';
const PKIND_LABEL: Record<PKind, string> = {
  strong: 'Nothing: it shows what the comparison reveals that neither text shows alone.',
  similar: 'It says only that the texts are similar, without saying what that shows.',
  listing: 'It makes two separate claims, one about each text, without connecting them.',
  noInsight: 'It names a difference between the texts but not what the difference reveals.',
  oneSided: 'It discusses only one of the two texts, so it is not yet a comparison at all.',
};
const PKIND_SHORT: Record<Exclude<PKind, 'strong'>, string> = {
  similar: 'only says the texts are similar',
  listing: 'makes two separate claims',
  noInsight: 'names a difference without saying what it reveals',
  oneSided: 'discusses only one text',
};

interface Pairing {
  a: Story;
  b: Story;
  strong: string;
  similar: string;
  listing: string;
  noInsight: string;
  oneSided: string;
}

const PAIRINGS: Pairing[] = [
  {
    a: HOUR,
    b: WALLPAPER,
    strong: 'Read together, Chopin’s and Gilman’s stories suggest that the danger to their heroines is not cruelty but kindness: both husbands are loving, and that love makes the confinement hard to name.',
    similar: 'Both “The Story of an Hour” and “The Yellow Wallpaper” are about women in the 1890s who feel trapped in their marriages, so the two stories are very similar in their themes and their endings.',
    listing: '“The Story of an Hour” shows a woman who feels free for an hour when she hears that her husband has died. “The Yellow Wallpaper” shows a woman who goes mad in a room her husband chose for her.',
    noInsight: 'Mrs. Mallard feels her freedom for one short hour beside an open window, while Gilman’s narrator is shut in an upstairs room with barred windows for the whole summer and slowly loses her mind.',
    oneSided: 'In “The Yellow Wallpaper”, Gilman uses the narrator’s secret journal to show how a woman who is forbidden to work, and told only to rest, slowly loses her hold on reality in an upstairs room.',
  },
  {
    a: BROWN,
    b: VEIL,
    strong: 'Brown suspects everyone of secret sin and is ruined; Mr. Hooper declares that everyone hides sin and is isolated: together, the stories suggest that seeing sin everywhere destroys the seer.',
    similar: 'Both “Young Goodman Brown” and “The Minister’s Black Veil” are stories by Hawthorne about sin and guilt in a Puritan village, so they share many of the same ideas, settings and symbols throughout.',
    listing: '“Young Goodman Brown” is about a man who goes into the forest at night and sees his neighbours at a witches’ meeting. “The Minister’s Black Veil” is about a minister who hides his face behind a veil.',
    noInsight: 'Goodman Brown learns about sin by going into the dark forest for one night, while Mr. Hooper shows his message about sin by wearing a black veil in front of his whole congregation for years.',
    oneSided: 'In “The Minister’s Black Veil”, Hawthorne never explains what the veil hides, so the townspeople’s fear of it reveals their own guilty secrets more than any secret of Mr. Hooper’s own.',
  },
  {
    a: ARABY,
    b: BRILL,
    strong: 'Joyce’s boy and Mansfield’s Miss Brill each live inside a flattering story of themselves until overheard words break it, which suggests that self-deception lasts at any age until another voice intrudes.',
    similar: 'Both “Araby” and “Miss Brill” are about lonely characters who are disappointed at the end of the story, so the two stories have very similar themes, moods and endings, and both of them are sad.',
    listing: '“Araby” is about a boy who goes to a bazaar to buy a gift for the girl he admires. “Miss Brill” is about a woman who spends her Sunday afternoons listening to the band and watching people in the park.',
    noInsight: 'The boy in “Araby” is young and full of romantic hopes about the girl he loves, while Miss Brill is much older and full of romantic ideas about the strangers she watches in the park every Sunday.',
    oneSided: 'In “Araby”, Joyce lets the adult narrator describe his boyhood in the language of romance and religion, so that the ending at the dark, empty bazaar judges his younger self’s vanity harshly.',
  },
  {
    a: DULCE,
    b: MASK,
    strong: 'Owen exposes the old lie that dying for one’s country is sweet, while Dunbar’s speakers must wear a mask that lies: together, the poems show a lie used against the powerless and a lie forced upon them.',
    similar: 'Both “Dulce et Decorum Est” and “We Wear the Mask” are serious, powerful poems about suffering that the world refuses to see, so the two poems are very similar in their message and in their mood.',
    listing: '“Dulce et Decorum Est” describes a gas attack and a young soldier dying in front of the speaker. “We Wear the Mask” describes people who hide their pain behind smiling faces that the whole world believes.',
    noInsight: 'Owen describes suffering in shocking, graphic detail so that the reader cannot look away, while Dunbar’s speakers keep their suffering hidden behind a mask that the world cannot see past.',
    oneSided: 'In “We Wear the Mask”, Dunbar uses a grinning mask and the repeated line “We wear the mask” to show how people facing injustice must hide their pain from a world that does not care.',
  },
  {
    a: HERON,
    b: FIRE,
    strong: 'Sylvia saves the heron by refusing a confident outsider, while London’s confident newcomer dies by ignoring nature: together, the stories suggest respect for nature is a knowledge outsiders lack.',
    similar: 'Both “A White Heron” and “To Build a Fire” are stories about people alone in the wild, far from towns, so the two stories are very similar in their settings and in what they say about nature and its dangers.',
    listing: '“A White Heron” is about a young girl who climbs a tall pine tree and finds a heron’s nest at the top. “To Build a Fire” is about a man who freezes to death on a lonely trail in the Yukon.',
    noInsight: 'In “A White Heron” the main character is a quiet young girl who loves the woods, while in “To Build a Fire” the main character is a grown man facing his first winter in the Yukon.',
    oneSided: 'In “To Build a Fire”, London contrasts the man’s confident reasoning with the dog’s instinct, suggesting that intelligence without imagination is no match for an indifferent nature.',
  },
  {
    a: HEART,
    b: WALLPAPER,
    strong: 'Both narrators lose their hold on reality, but Poe’s murderer is undone by guilt and Gilman’s narrator by a confinement imposed on her: together, they separate madness as punishment from madness as injury.',
    similar: 'Both “The Tell-Tale Heart” and “The Yellow Wallpaper” have narrators who go mad as they tell their stories, so the two are very similar in their first-person voices and their frightening endings.',
    listing: '“The Tell-Tale Heart” is about a man who kills an old man and then hears his heart beating. “The Yellow Wallpaper” is about a woman who becomes obsessed with the strange paper on the walls of her bedroom upstairs.',
    noInsight: 'Poe’s narrator speaks aloud to a listener who doubts his sanity, while Gilman’s narrator writes in a secret journal that she must hide from her husband and from his sister, who keeps house for them.',
    oneSided: 'In “The Tell-Tale Heart”, Poe’s narrator insists so frantically on his sanity that his own voice becomes the strongest evidence against him, showing how guilt can unravel a mind from within.',
  },
  {
    a: ARABY,
    b: PARTY,
    strong: 'Joyce’s boy and Mansfield’s Laura each leave a sheltered world for one evening and return changed, but he finds his own vanity and she glimpses a life beyond her class: two directions an epiphany can face.',
    similar: 'Both “Araby” and “The Garden Party” end with a young character’s sudden epiphany, so the two stories are very similar in their structure and in what their main characters learn by the end of each of the two stories.',
    listing: '“Araby” is about a boy who arrives at a bazaar just as it is closing. “The Garden Party” is about a girl whose family holds a party on the day a neighbour is killed in an accident.',
    noInsight: 'The boy in “Araby” comes away from the dark bazaar angry and ashamed of himself, while Laura comes away from the dead man’s cottage deeply moved and unable to find the words for what she feels.',
    oneSided: 'In “The Garden Party”, Mansfield sends Laura from her family’s party to the dead carter’s cottage, so that the contrast between the two places exposes the blindness of her whole class.',
  },
  {
    a: CASK,
    b: BOAT,
    strong: 'Montresor controls every step of his story and feels nothing, while Crane’s men control nothing and feel everything: together, they suggest that the coldest voice may belong to the one who is never at risk.',
    similar: 'Both “The Cask of Amontillado” and “The Open Boat” are stories in which people face death, so the two stories are very similar in their dark and frightening atmosphere and in their violent endings.',
    listing: '“The Cask of Amontillado” is about a man who walls up his enemy alive in the catacombs. “The Open Boat” is about four shipwrecked men who try to row their small boat to the shore through the heavy surf.',
    noInsight: 'Montresor tells his story calmly, half a century after the crime, while the men in “The Open Boat” face the waves in the present and struggle desperately, hour after hour, to stay alive.',
    oneSided: 'In “The Open Boat”, Crane shows four men in a small boat facing an indifferent sea, so that their bond with one another becomes the only meaning they can find in their long struggle.',
  },
];

const both = (p: Pairing) => `${titled(p.a)} and ${titled(p.b)}`;

function comparativeArgument(rng: Rng, d: Difficulty): GenOutput {
  const p = rng.pick(PAIRINGS);
  if (d === 3) {
    const kind = rng.pick(Object.keys(PKIND_LABEL) as PKind[]);
    const others = rng.sample((Object.keys(PKIND_LABEL) as PKind[]).filter((k) => k !== kind), 3).map((k) => PKIND_LABEL[k]);
    return {
      prompt: `A student wrote this thesis for an essay comparing ${both(p)}:\n\n${block(p[kind])}\n\nWhat, if anything, is its main weakness?`,
      parts: [part(mc(rng, PKIND_LABEL[kind], others))],
      hints: ['A strong comparative argument connects the two texts and says what we see by putting them side by side that we would miss in either one alone.'],
      solution: [PKIND_LABEL[kind], kind === 'strong' ? 'It connects the texts and names what the comparison reveals.' : `A stronger comparative thesis: ${q(p.strong)}`],
    };
  }
  const wrong: Array<Exclude<PKind, 'strong'>> = d === 1 ? ['similar', 'listing'] : ['noInsight', 'oneSided', rng.pick(['similar', 'listing'] as const)];
  return {
    prompt: `Which is the strongest **comparative thesis** for an essay on ${both(p)}: one that shows what neither text shows alone?`,
    parts: [part(mc(rng, p.strong, wrong.map((k) => p[k])))],
    hints: [
      d === 1
        ? 'A comparison must connect the two texts. Saying they are alike, or describing each one separately, does not yet connect them.'
        : 'Naming a difference is a start. The strongest thesis also says what the difference reveals: something you would miss reading either text alone.',
    ],
    solution: [`${q(p.strong)} connects the two texts and names what the comparison reveals.`, `Of the others, ${andList(wrong.map((k) => `one ${PKIND_SHORT[k]}`))}.`],
  };
}

export const CRITICAL_SKILLS: SkillDef[] = [
  skill({
    id: 'e12-critical-thesis',
    name: 'The sophisticated thesis',
    description: 'Choose a thesis that takes an arguable position on how and why a text means and engages a real tension in it, and name what is wrong with a weaker one.',
    outcomes: OUTCOMES,
    lessonId: CRITICAL,
    format: 'mc',
    gen: criticalThesis,
  }),
  skill({
    id: 'e12-critical-analysis',
    name: 'Commentary that weighs complexity',
    description: 'Choose commentary that explains how the words work and weighs the tension or second reading they invite, rather than paraphrase, assertion or a one-sided reading.',
    outcomes: OUTCOMES,
    lessonId: CRITICAL,
    format: 'mc',
    gen: criticalAnalysis,
  }),
  skill({
    id: 'e12-comparative-argument',
    name: 'The comparative argument',
    description: 'Choose a comparative thesis that reveals something neither text shows alone, and name what is wrong with a listing, a vague likeness or a bare difference.',
    outcomes: OUTCOMES,
    lessonId: COMPARE,
    format: 'mc',
    gen: comparativeArgument,
  }),
];
