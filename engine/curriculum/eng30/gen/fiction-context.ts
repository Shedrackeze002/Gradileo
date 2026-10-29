/**
 * Grade 12 English, lessons 1.2 and 1.3: Fiction in Context and Critical Lenses (12-A2). Using
 * historical and social context to deepen a reading without letting it replace the text; how
 * characters are shaped by, and push against, their society; the historical, feminist,
 * psychological, economic and reader-response lenses, and the evidence that best supports a reading
 * through each. Scenarios written for Gradileo and public-domain fiction (./stories.ts).
 */
import { mc, part, skill } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { block, fill, pair, q } from '../../eng10/gen/common.ts';
import {
  AWAKENING, AWAKE_MOTHERWOMAN, AWAKE_MYSELF, AWAKE_PROPERTY, AWAKE_SEA, AWAKE_SOLITUDE, BARTLEBY, BART_ASTOR, BART_BULLION, BART_EASIEST, BART_FIGURE, BART_LETTERS, BART_PREFER, BART_SAFE, BEAST, BEAST_CROUCHING,
  BEAST_ESCAPE, BEAST_MAN, DEAD, DEAD_DIED, DEAD_FUTURE, DEAD_GENERAL, DEAD_LILY, DEAD_LUDICROUS, DEAD_SYMBOL, LADY, LADY_ENDING, LADY_LOWER, LADY_OPENING, LADY_TWO_LIVES, MARK, OTHER, OTHER_CONFESSED,
  OTHER_NAMES, OTHER_TEA, SIOUX, SIOUX_ENDING, SIOUX_MISSION, SIOUX_NINE, SIOUX_STRANGER, SPRING, SPRING_AMERICANIZED, SPRING_CUSTOMS, SPRING_OPENING, SPRING_TENNYSON, WIFE, WIFE_ACCIDENT,
  WIFE_ANSWER, WIFE_ENDING, WIFE_MILLSTONE, quoteBlock, titled, type Excerpt, type Story,
} from './stories.ts';

const CONTEXT_LESSON = 'e12-1-2';
const LENS_LESSON = 'e12-1-3';
const OUT = ['12-A2'];

// ============================================================================ context

interface Context {
  story: Story;
  /** What a reader wants to understand. */
  point: string;
  /** Context that deepens the reading. */
  relevant: string;
  /** True but beside the point. */
  trivia: string[];
}
const CONTEXTS: Context[] = [
  {
    story: WIFE,
    point: 'why Liza Jane has spent twenty-five years searching for her husband',
    relevant: 'Slavery and the Civil War scattered countless families, and freed people searched for years for lost husbands, wives and children.',
    trivia: ['Chesnutt was born in Cleveland, Ohio, in 1858, and he worked for some years as a teacher and as a court stenographer.', 'The story first appeared in a magazine in 1898, and it later gave its title to a whole collection of Chesnutt’s stories.', 'In Russia at the time, divorce was very hard to obtain, because the Orthodox Church controlled marriage and its ending.'],
  },
  {
    story: SIOUX,
    point: 'why the narrator returns to his father’s village as “a stranger”',
    relevant: 'In the late 1800s, boarding schools took many Native children far from home and taught them to give up their language and beliefs.',
    trivia: ['Zitkala-Ša was also a musician, and in 1913 she helped to write an opera, *The Sun Dance Opera*, with a composer.', 'The story was first published in a monthly magazine in 1901, two decades before it appeared in her collected stories.', 'Before typewriters and photocopiers, legal papers in city offices were copied out by hand by clerks called scriveners.'],
  },
  {
    story: SPRING,
    point: 'why being “Americanized” matters so much to the Spring Fragrances and their neighbours',
    relevant: 'From 1882, US law barred most Chinese immigration, and Chinese Americans faced constant pressure to prove that they belonged.',
    trivia: ['Sui Sin Far was the pen name of Edith Maude Eaton, who was born in England in 1865 and later lived in Canada.', 'The collection *Mrs. Spring Fragrance* was published in Chicago in 1912, two years before the writer’s death in Montreal.', 'Many Irish people at the time argued over whether Ireland should look to England or to its own language and the west.'],
  },
  {
    story: AWAKENING,
    point: 'why Edna’s refusal to “give myself” for her children shocks the people around her',
    relevant: 'In the 1890s a respectable wife was expected to live for her husband and children, and she had few legal or money rights of her own.',
    trivia: ['*The Awakening* was first published in Chicago in 1899, by a small publishing firm that had printed some of Chopin’s other work.', 'Before she wrote fiction, Kate Chopin lived for several years in Louisiana, where much of her writing would later be set.', 'In New York society, the phrase “old money” was used for families who had been rich for several generations already.'],
  },
  {
    story: OTHER,
    point: 'why Waythorn feels uneasy about meeting his wife’s two former husbands',
    relevant: 'Around 1900, divorce was becoming more common among wealthy New Yorkers, but it still carried a strong whiff of scandal.',
    trivia: ['Edith Wharton later won the Pulitzer Prize for her novel *The Age of Innocence*, which was published in 1920.', 'The story was collected in *The Descent of Man and Other Stories*, a book of short fiction that Wharton published in 1904.', 'At the mission schools of the time, children were often given new names, new clothes and a new language to speak.'],
  },
  {
    story: LADY,
    point: 'why Gurov and Anna can see no simple way to be together at the end',
    relevant: 'In Russia at the time, divorce was very hard to obtain, because the Orthodox Church controlled marriage and its ending.',
    trivia: ['Chekhov trained and worked as a doctor, and he wrote many of his early stories to earn money for his family.', 'Constance Garnett translated many of Chekhov’s stories into English, and her version of this one was published in 1917.', 'From 1882, US law barred most Chinese immigration, and Chinese Americans faced constant pressure to prove that they belonged.'],
  },
];

type Misuse = 'replaces' | 'irrelevant' | 'biography' | 'good';
const MISUSE: Record<Misuse, string> = {
  replaces: 'It lets the context replace evidence from the story itself',
  irrelevant: 'It uses a fact that has no bearing on the point being made',
  biography: 'It treats the author’s own life as if it were the story’s plot',
  good: 'Nothing: the context deepens a point grounded in the story',
};
/** A student’s sentence for each use or misuse of context (difficulty 2 and 3). */
const STUDENT: Array<{ story: Story; uses: Record<Misuse, string> }> = [
  {
    story: AWAKENING,
    uses: {
      replaces: 'Since women in the 1890s had few rights, Edna must be miserable from the first page to the last, whatever the novel shows.',
      irrelevant: '*The Awakening* was first published in Chicago, and this explains why Edna will not give herself up for her children.',
      biography: 'Because Kate Chopin had six children, Edna must be Chopin herself, and the novel is simply the story of Chopin’s own marriage.',
      good: 'Edna’s “I wouldn’t give myself” is daring because wives of the 1890s were expected to live for their husbands and children.',
    },
  },
  {
    story: WIFE,
    uses: {
      replaces: 'After the war, families were scattered, so Liza Jane’s search must be the only thing the story is really about.',
      irrelevant: 'Chesnutt was born in Cleveland in 1858, which explains why Mr. Ryder finally decides to acknowledge his first wife.',
      biography: 'Because Chesnutt was a light-skinned man himself, Mr. Ryder must be Chesnutt, and the ball must be one he really gave.',
      good: 'Liza Jane’s twenty-five-year search echoes the many families that slavery and war scattered, giving her loyalty weight.',
    },
  },
  {
    story: SIOUX,
    uses: {
      replaces: 'Boarding schools tried to erase Native culture, so the story must simply be about schools, not about this young man at all.',
      irrelevant: 'Zitkala-Ša helped to write an opera in 1913, and this explains why the narrator walks into his village as a stranger.',
      biography: 'Because Zitkala-Ša went to a mission school, the narrator must be the author herself, and all these events must be true.',
      good: 'His “foreigner’s dress” echoes the boarding schools that remade Native children, so his return as a stranger cuts deep.',
    },
  },
  {
    story: LADY,
    uses: {
      replaces: 'Divorce was hard to obtain in Russia, so the lovers can never be happy, whatever the ending of the story may suggest.',
      irrelevant: 'Chekhov worked as a doctor, and this explains why Gurov and Anna cannot see a simple solution at the story’s end.',
      biography: 'Because Chekhov spent time in Yalta, Gurov must be Chekhov himself, and Anna must be a woman he once really loved.',
      good: 'Their “long, long road” reflects how hard divorce was to obtain in Russia, so the ending’s uncertainty has real weight.',
    },
  },
];

function contextQ(rng: Rng, d: Difficulty) {
  if (d === 3) {
    const s = rng.pick(STUDENT);
    const right = s.uses.good;
    return {
      prompt: `Students are writing about ${titled(s.story)}. Which sentence uses historical or social context **best**, to deepen a reading of the story without replacing it?`,
      parts: [part(mc(rng, right, [s.uses.replaces, s.uses.irrelevant, s.uses.biography]))],
      hints: ['Good use of context starts from the words of the story and lets the context explain why they matter.'],
      solution: [`${q(right)} starts from the story and uses the context to explain why it matters.`, 'The others let the context overrule the story, bring in a fact that has nothing to do with the point, or confuse the author with a character.'],
    };
  }
  if (d === 2) {
    const s = rng.pick(STUDENT);
    const kind = rng.pick(Object.keys(MISUSE) as Misuse[]);
    const others = (Object.keys(MISUSE) as Misuse[]).filter((k) => k !== kind).map((k) => MISUSE[k]);
    return {
      prompt: `A student writing about ${titled(s.story)} wrote:\n\n${block(s.uses[kind])}\n\nWhat, if anything, is wrong with this use of context?`,
      parts: [part(mc(rng, MISUSE[kind], others))],
      hints: ['Ask three questions: does the context bear on the point? Does the sentence still rest on the story itself? Does it confuse the writer with a character?'],
      solution: [`${MISUSE[kind]}.`, {
        replaces: 'The context is allowed to decide what the story means, instead of helping to explain what the story actually shows.',
        irrelevant: 'The fact may be true, but it has nothing to do with the point, so it explains nothing.',
        biography: 'Writers draw on their lives, but a story is not a diary: a character is not simply the author.',
        good: 'The sentence starts from the story’s own words and lets the context explain why they matter.',
      }[kind]],
    };
  }
  const c = rng.pick(CONTEXTS);
  return {
    prompt: `Which piece of context would **most** help a reader understand ${c.point} in ${titled(c.story)}?`,
    parts: [part(mc(rng, c.relevant, c.trivia))],
    hints: ['Some facts are true but beside the point. Which one bears directly on what the reader wants to understand?'],
    solution: [`${c.relevant}`, 'The other facts may be true, but they say nothing about this part of the story, or they belong to a different story altogether.'],
  };
}

// ============================================================================ character and society

type Stance = 'conforms' | 'resists' | 'torn' | 'exploits';
const STANCE: Record<Stance, string> = {
  conforms: 'Conforms: accepts the rules of their society without question',
  resists: 'Resists: openly defies what their society expects of them',
  torn: 'Torn: pulled between what society expects and what they want',
  exploits: 'Exploits: bends the rules of their society to their own gain',
};
const STANCE_GEN: Record<Stance, string[]> = {
  conforms: [
    'In NAME’s village, the eldest child takes over the family shop. NAME never considers anything else: {he} learns the trade, marries the neighbour’s child as arranged, and is proud to do exactly as {his} parents did.',
    'NAME’s office expects everyone to stay late every night. NAME does so cheerfully for thirty years and tells every new employee that this is simply how good workers behave.',
  ],
  resists: [
    'NAME’s family expects {him} to study law. Instead {he} announces at a family dinner that {he} is leaving for art school, and {he} walks out that night with one suitcase.',
    'When the town council bans public meetings, NAME holds one in the square anyway and reads the banned speech aloud to the crowd.',
  ],
  torn: [
    'NAME has been offered a place at a university abroad, but {his} family expects {him} to stay and care for {his} grandmother. {He} fills in the forms, tears them up, and fills them in again.',
    'NAME loves the city {he} has moved to, with its freedom and noise, yet every evening {he} cooks {his} mother’s recipes and feels guilty that {he} rarely calls home.',
  ],
  exploits: [
    'NAME knows the club admits members only on a friend’s recommendation, so {he} flatters a wealthy member for months to get the letter {he} needs, then never speaks to him again.',
    'In NAME’s town, a public apology clears any scandal. NAME learns to apologize beautifully, and goes on doing exactly as {he} pleases.',
  ],
};

interface Society {
  lead: string;
  excerpt: Excerpt;
  ask: string;
  answer: string;
  wrong: string[];
  why: string;
}
const SOCIETY_PD: Society[] = [
  {
    lead: `In ${titled(AWAKENING)}, Edna tries to explain to her friend Madame Ratignolle, a devoted mother, what she would and would not sacrifice:`,
    excerpt: AWAKE_MYSELF,
    ask: 'What does Edna refuse that her society expects of a mother?',
    answer: 'To lose her own self in her role, though she would die for her children',
    wrong: ['To care for her children at all, since she wants no part in raising them', 'To spend her husband’s money on the family, which she means to keep', 'To leave the island, since she prefers the company of her old friends'],
    why: 'She would give her money and even her life, but not “myself”: the self that her society expects a mother to give up without a thought.',
  },
  {
    lead: `In ${titled(WIFE)}, Mr. Ryder, a leader of a society of light-skinned Black Americans, explains his views:`,
    excerpt: WIFE_MILLSTONE,
    ask: 'How has Ryder’s place in society shaped his outlook at the start of the story?',
    answer: 'He feels caught between two worlds, and guards his group’s narrow standing',
    wrong: ['He feels completely free of society, and ignores what anyone thinks of him', 'He longs to return to the South, and plans to leave the city in the spring', 'He wants every member of the society to marry within his own family'],
    why: '“Ground between the upper and the nether millstone”: he sees his group squeezed on both sides, and his ball is meant to protect its exclusiveness.',
  },
  {
    lead: `In ${titled(SIOUX)}, the narrator comes home after nine years at a mission school:`,
    excerpt: SIOUX_STRANGER,
    ask: 'What does this sentence show about his place between two societies?',
    answer: 'He now belongs fully to neither, and even his own village sees a stranger',
    wrong: ['He has been warmly welcomed back, and slips easily into his old life', 'He has forgotten his native tongue, so no one can understand a word', 'He has come back as a chief, and the village is waiting to obey him'],
    why: 'The “foreigner’s dress” marks how the school has changed him, and “a stranger” shows that the village no longer recognizes him as its own.',
  },
  {
    lead: `In ${titled(LADY)}, Gurov has fallen in love with Anna and now lives a double life in Moscow:`,
    excerpt: LADY_TWO_LIVES,
    ask: 'What does this passage show about Gurov and the society he lives in?',
    answer: 'His true life is hidden, while his public life is the one society sees',
    wrong: ['He has given up his job and friends to live openly with Anna in Moscow', 'He has no life outside his work at the bank, and he wants nothing more', 'He tells his friends at the club everything about his love for Anna'],
    why: 'His “open” life follows society’s rules, full of “relative truth and of relative falsehood”; everything real in him runs “in secret”.',
  },
  {
    lead: `In ${titled(SPRING)}, the narrator describes the Chin Yuen family next door:`,
    excerpt: SPRING_CUSTOMS,
    ask: 'What does the passage show about the Chin Yuen parents?',
    answer: 'They live American lives on the surface but hold to Chinese ideals within',
    wrong: ['They have given up every Chinese custom in order to seem fully American', 'They refuse to wear American clothes or to live in an American-style house', 'They have arranged their daughter’s marriage to an American baseball player'],
    why: 'The house and clothes are American, but “their ideals of life were the ideals of their Chinese forefathers”, which is why they have arranged Laura’s marriage.',
  },  {
    lead: `In ${titled(SPRING)}, the narrator introduces Mr. Spring Fragrance, a merchant in Seattle, and his wife:`,
    excerpt: SPRING_AMERICANIZED,
    ask: 'What does the passage suggest about the couple’s place in American society?',
    answer: 'They have taken up American ways, yet “Americanized” is a label others give them',
    wrong: ['They have refused every American custom, and keep entirely to Chinese ways', 'They have just arrived in Seattle and know nothing of American life so far', 'They have given up their Chinese names and no longer speak to their neighbours'],
    why: 'They are “Americanized”, but the word sits in quotation marks as “what is called by the Westerners”: it is how outsiders sort them, not simply how they see themselves.',
  },
];

/** What a character’s final choice shows (difficulty 3). */
const CHOICES: Society[] = [
  {
    lead: `At the end of ${titled(WIFE)}, Mr. Ryder has told his guests the story of a man whose wife, separated from him by slavery, has found him after many years. They agree that the man should acknowledge her. Then:`,
    excerpt: WIFE_ENDING,
    ask: 'What does Ryder’s choice show about him and the society he leads?',
    answer: 'He puts loyalty to his past above the standing that his society prizes',
    wrong: ['He shows his guests that the old woman is a servant he has hired', 'He proves that the Blue Veins were right to keep their circle closed', 'He tests his guests, then sends the old woman away when they leave'],
    why: 'By presenting Liza Jane as “the wife of my youth”, Ryder chooses faithfulness over the exclusiveness that the Blue Veins have built their circle on.',
  },
  {
    lead: `At the end of ${titled(SIOUX)}, the narrator waits in a cell for his execution:`,
    excerpt: SIOUX_ENDING,
    ask: 'How does the narrator face the end that the two worlds have brought him to?',
    answer: 'With calm courage, though still unsure which world will receive him',
    wrong: ['With anger at his father, whom he blames for everything that happened', 'With relief that he will be set free in the morning by his tribe', 'With fear and tears, begging the guard to let him escape his fate'],
    why: '“My heart is strong. My face is calm”: he meets death bravely, yet a moment before he has asked whether Jesus or his warrior father will greet him.',
  },
];

function societyQ(rng: Rng, d: Difficulty) {
  if (d === 3) {
    const c = rng.pick(CHOICES);
    return {
      prompt: `${c.lead}\n\n${quoteBlock(c.excerpt)}\n\n${c.ask}`,
      parts: [part(mc(rng, c.answer, c.wrong))],
      hints: ['Weigh what the character gives up or keeps against what their society values most.'],
      solution: [`${c.answer}.`, c.why],
    };
  }
  if (d === 2) {
    const s = rng.pick(SOCIETY_PD);
    return {
      prompt: `${s.lead}\n\n${quoteBlock(s.excerpt)}\n\n${s.ask}`,
      parts: [part(mc(rng, s.answer, s.wrong))],
      hints: ['Ask what the society around the character expects, and whether the character accepts, resists or is caught by it.'],
      solution: [`${s.answer}.`, s.why],
    };
  }
  const k = rng.pick(Object.keys(STANCE_GEN) as Stance[]);
  const text = fill(rng.pick(STANCE_GEN[k]), pair(rng));
  return {
    prompt: `${block(text)}\n\nWhich best describes this character’s relationship with their society?`,
    parts: [part(mc(rng, STANCE[k], (Object.keys(STANCE) as Stance[]).filter((x) => x !== k).map((x) => STANCE[x])))],
    hints: ['What does the society expect? Then: does the character accept it, defy it, struggle with it, or use it?'],
    solution: [`${STANCE[k]}.`, {
      conforms: 'The character takes the society’s expectations as their own and never questions them.',
      resists: 'The character defies the expectation openly, whatever it costs.',
      torn: 'The character feels the pull of both the expectation and their own wishes, and cannot settle.',
      exploits: 'The character understands the rules well enough to use them for their own ends.',
    }[k]],
  };
}

// ============================================================================ critical lenses

type Lens = 'historical' | 'feminist' | 'psychological' | 'economic' | 'reader';
const LENS_NAME: Record<Lens, string> = {
  historical: 'A historical lens',
  feminist: 'A feminist lens',
  psychological: 'A psychological lens',
  economic: 'An economic (class) lens',
  reader: 'A reader-response lens',
};
/** The lens named in running text, with its key word in bold. */
const LENS_BOLD: Record<Lens, string> = {
  historical: 'a **historical** lens',
  feminist: 'a **feminist** lens',
  psychological: 'a **psychological** lens',
  economic: 'an **economic (class)** lens',
  reader: 'a **reader-response** lens',
};
const LENS_ASKS: Record<Lens, string> = {
  historical: 'how the events and beliefs of the time shape the story',
  feminist: 'how the story shows the roles, power and voices of women and men',
  psychological: 'what hidden fears, desires and defences drive the characters',
  economic: 'how money, work and social class shape the characters’ lives',
  reader: 'how readers make meaning from the text as they read it',
};
/** Readings of the public-domain stories, one lens each (difficulty 2). */
const READINGS: Array<{ story: Story; lens: Lens; text: string }> = [
  { story: DEAD, lens: 'feminist', text: 'Gabriel turns Gretta into a picture to admire, while her own memories and desires stay hidden from him.' },
  { story: AWAKENING, lens: 'feminist', text: 'Mr. Pontellier treats Edna as property, and the novel shows a marriage that expects a woman to erase herself.' },
  { story: BEAST, lens: 'psychological', text: 'Marcher’s certainty that something rare awaits him is a defence that spares him the risk of loving May Bartram.' },
  { story: LADY, lens: 'psychological', text: 'Gurov’s scorn for women hides how much he depends on them: he despises what he cannot do without.' },
  { story: BARTLEBY, lens: 'economic', text: 'The office treats men as copying machines, and Bartleby’s refusal exposes a world that values workers only for output.' },
  { story: BARTLEBY, lens: 'economic', text: 'The lawyer pities Bartleby but never questions the system that leaves a poor clerk with nowhere to live.' },
  { story: WIFE, lens: 'historical', text: 'Liza Jane’s twenty-five-year search reflects the many families scattered by slavery and the Civil War.' },
  { story: SIOUX, lens: 'historical', text: 'The narrator’s return as “a stranger” reflects the boarding schools that took Native children from their families.' },
  { story: MARK, lens: 'reader', text: 'Because the story never settles on one meaning, each reader’s own associations become part of the story.' },
  { story: BARTLEBY, lens: 'reader', text: 'A first reading of the story can feel comic; a second reading, knowing the ending, makes the same scenes painful.' },
];
/** Questions each lens would ask about a story (difficulty 3). */
const LENS_QUESTIONS: Array<{ story: Story; asks: Record<Lens, string> }> = [
  {
    story: AWAKENING,
    asks: {
      historical: 'How does the Creole society of 1890s New Orleans shape the world of the novel?',
      feminist: 'How does the novel show the limits placed on Edna because she is a woman?',
      psychological: 'What inner longings and fears draw Edna toward solitude and the sea?',
      economic: 'How does the Pontelliers’ wealth shape the freedoms that Edna can afford?',
      reader: 'How might a reader today respond differently to Edna than readers did in 1899?',
    },
  },
  {
    story: BARTLEBY,
    asks: {
      historical: 'How do 1850s American ideas of charity and duty shape the lawyer’s choices?',
      feminist: 'What does the all-male office reveal about the roles open to men and women?',
      psychological: 'What despair or withdrawal lies behind Bartleby’s quiet refusals?',
      economic: 'How does a job copying documents reduce a man to the work he produces?',
      reader: 'Why might the same scenes seem comic to some readers and tragic to others?',
    },
  },
  {
    story: DEAD,
    asks: {
      historical: 'How does the debate over Irish identity in 1900s Dublin shape the party?',
      feminist: 'How does Gabriel’s view of Gretta overlook her as a person with her own past?',
      psychological: 'How does Gretta’s story wound Gabriel’s pride and force him to see himself?',
      economic: 'How do work, wages and class divide the guests from the servants at the party?',
      reader: 'How does the final image of the snow invite each reader to find their own meaning?',
    },
  },
];

function lensQ(rng: Rng, d: Difficulty) {
  const lenses = Object.keys(LENS_NAME) as Lens[];
  if (d === 3) {
    const set = rng.pick(LENS_QUESTIONS);
    const want = rng.pick(lenses);
    const others = rng.sample(lenses.filter((l) => l !== want), 3).map((l) => set.asks[l]);
    return {
      prompt: `Which question would a critic using ${LENS_BOLD[want]} be most likely to ask about ${titled(set.story)}?`,
      parts: [part(mc(rng, set.asks[want], others))],
      hints: [`${LENS_NAME[want]} asks ${LENS_ASKS[want]}.`],
      solution: [`${q(set.asks[want])}`, `${LENS_NAME[want]} asks ${LENS_ASKS[want]}; the other questions belong to other lenses.`],
    };
  }
  if (d === 2) {
    const r = rng.pick(READINGS);
    const others = rng.sample(lenses.filter((l) => l !== r.lens), 3).map((l) => LENS_NAME[l]);
    return {
      prompt: `A student wrote this reading of ${titled(r.story)}:\n\n${block(r.text)}\n\nWhich critical lens does this reading use?`,
      parts: [part(mc(rng, LENS_NAME[r.lens], others))],
      hints: ['Ask what the reading is most interested in: history, gender, the mind, money and class, or the reader.'],
      solution: [`${LENS_NAME[r.lens]}.`, `The reading asks ${LENS_ASKS[r.lens]}.`],
    };
  }
  const want = rng.pick(lenses);
  const others = rng.sample(lenses.filter((l) => l !== want), 3).map((l) => LENS_NAME[l]);
  return {
    prompt: `Which critical lens asks ${LENS_ASKS[want]}?`,
    parts: [part(mc(rng, LENS_NAME[want], others))],
    hints: ['Each lens brings one main question to a text: history, gender, the mind, money and class, or the reader’s experience.'],
    solution: [`${LENS_NAME[want]} asks ${LENS_ASKS[want]}.`],
  };
}

/** A reading through a lens, the quotation that supports it best, and quotations that do not (difficulty 1 to 3). */
interface Evidence {
  story: Story;
  lens: Lens;
  claim: string;
  key: Excerpt;
  others: Excerpt[];
  why: string;
}
const EVIDENCE: Evidence[] = [
  { story: DEAD, lens: 'feminist', claim: 'Gabriel sees Gretta as an image to admire rather than a person with a past of her own.', key: DEAD_SYMBOL, others: [DEAD_LILY, DEAD_GENERAL, DEAD_FUTURE], why: 'Gabriel wonders what Gretta is “a symbol of” and imagines painting her, while her own thoughts are on a young man from her past.' },
  { story: DEAD, lens: 'psychological', claim: 'Gretta’s story wounds Gabriel’s pride and forces him to see himself without illusions.', key: DEAD_LUDICROUS, others: [DEAD_LILY, DEAD_GENERAL, DEAD_FUTURE], why: 'He sees himself as “a ludicrous figure” and “the pitiable fatuous fellow” in the mirror: his self-image has collapsed.' },
  { story: DEAD, lens: 'historical', claim: 'The ending widens from one marriage to a vision of the whole of Ireland.', key: DEAD_GENERAL, others: [DEAD_LILY, DEAD_DIED, DEAD_LUDICROUS], why: '“Snow was general all over Ireland” carries the private moment out across the whole country.' },
  { story: BEAST, lens: 'psychological', claim: 'Marcher’s endless waiting was a defence that kept him from love.', key: BEAST_ESCAPE, others: [BEAST_CROUCHING, BEAST_MAN], why: '“The escape would have been to love her”: what he was waiting for was the thing his waiting kept him from.' },
  { story: BARTLEBY, lens: 'economic', claim: 'The lawyer measures people, himself included, by their closeness to wealth.', key: BART_BULLION, others: [BART_PREFER, BART_LETTERS, BART_FIGURE], why: 'He loves to repeat John Jacob Astor’s name because it “rings like unto bullion”: he values himself by his link to a rich man.' },
  { story: BARTLEBY, lens: 'psychological', claim: 'Bartleby’s withdrawal may come from long contact with despair and death.', key: BART_LETTERS, others: [BART_ASTOR, BART_EASIEST, BART_SAFE], why: 'The rumour of the Dead Letter Office links Bartleby to “dead men”: a job that could teach hopelessness.' },
  { story: WIFE, lens: 'historical', claim: 'The Blue Vein Society, whatever it claimed, chose its members by the colour of their skin.', key: WIFE_ACCIDENT, others: [WIFE_ANSWER, WIFE_ENDING], why: '“By accident, combined perhaps with some natural affinity”: the irony suggests the light-skinned membership was no accident.' },
  { story: LADY, lens: 'feminist', claim: 'Gurov’s contempt for women hides how much he depends on them.', key: LADY_LOWER, others: [LADY_OPENING, LADY_ENDING], why: 'He calls women “the lower race” and speaks ill of them because he is so often unfaithful: the scorn and the need go together.' },
  { story: LADY, lens: 'psychological', claim: 'Gurov’s real self can exist only in secret.', key: LADY_TWO_LIVES, others: [LADY_OPENING, LADY_LOWER], why: 'His “open” life is full of “relative falsehood”; the life that matters to him runs “in secret”.' },
  { story: SIOUX, lens: 'historical', claim: 'The mission school replaced the values the narrator was raised with.', key: SIOUX_MISSION, others: [SIOUX_ENDING, SIOUX_NINE], why: 'He did not become “the warrior, huntsman, and husband I was to have been”: the school taught him “it was wrong to kill”.' },
  { story: SPRING, lens: 'historical', claim: 'The older generation holds on to Chinese ideals beneath American surfaces.', key: SPRING_CUSTOMS, others: [SPRING_OPENING, SPRING_TENNYSON], why: 'The Chin Yuens wear American clothes, yet “their ideals of life were the ideals of their Chinese forefathers”.' },
  { story: AWAKENING, lens: 'feminist', claim: 'Mr. Pontellier sees his wife as something he owns.', key: AWAKE_PROPERTY, others: [AWAKE_SEA, AWAKE_MOTHERWOMAN], why: 'He looks at her “as one looks at a valuable piece of personal property which has suffered some damage”.' },
  { story: AWAKENING, lens: 'psychological', claim: 'Edna is drawn inward, toward solitude and her own inner life.', key: AWAKE_SOLITUDE, others: [AWAKE_PROPERTY, AWAKE_MOTHERWOMAN], why: 'The sea invites “the soul to wander for a spell in abysses of solitude; to lose itself in mazes of inward contemplation”.' },
  { story: OTHER, lens: 'feminist', claim: 'Alice has had to reshape herself to suit each of her husbands in turn.', key: OTHER_NAMES, others: [OTHER_TEA, OTHER_CONFESSED], why: 'With each name she “left hanging to each name a little of her privacy, a little of her personality”.' },
];

/** A quotation, and the one lens reading of its story that it supports (difficulty 3). */
const SUPPORTS: Array<{ story: Story; excerpt: Excerpt; lead: string; right: string; wrong: string[]; why: string }> = [
  {
    story: DEAD,
    excerpt: DEAD_SYMBOL,
    lead: 'Gabriel watches his wife, Gretta, listening to a song on the stairs',
    right: 'A feminist reading: Gabriel makes Gretta an object to look at and overlooks her inner life',
    wrong: ['An economic reading: the party shows how wages and work divide the guests from the servants', 'A historical reading: the snow over Ireland links one marriage to the state of the whole nation', 'A reader-response reading: each reader must decide alone what the falling snow finally means'],
    why: 'The passage shows Gabriel turning Gretta into “a symbol of something” to be painted: it supports a reading about how he sees her as a woman, not about class, history or the reader.',
  },
  {
    story: BARTLEBY,
    excerpt: BART_ASTOR,
    lead: 'the lawyer who narrates the story introduces himself',
    right: 'An economic reading: the narrator measures his own worth by his closeness to great wealth',
    wrong: ['A feminist reading: the all-male office shows how women were shut out of legal careers', 'A psychological reading: Bartleby withdraws from life because of years of quiet despair', 'A reader-response reading: the story feels comic at first and tragic on a second reading'],
    why: 'He loves Astor’s name because it “rings like unto bullion”: the quotation shows his respect for money, which an economic reading would build on.',
  },
  {
    story: AWAKENING,
    excerpt: AWAKE_PROPERTY,
    lead: 'Mr. Pontellier greets his wife after she has spent the morning in the sun',
    right: 'A feminist reading: the husband regards his wife as a possession whose value can be damaged',
    wrong: ['A psychological reading: Edna is drawn inward, toward solitude and the voice of the sea', 'A historical reading: the novel records the daily life of holiday resorts in old Louisiana', 'A reader-response reading: modern readers judge Edna more kindly than readers did in 1899'],
    why: 'He looks at her “as one looks at a valuable piece of personal property”: the quotation is about how a husband sees his wife.',
  },
  {
    story: SIOUX,
    excerpt: SIOUX_MISSION,
    lead: 'the narrator looks back on the years after his family planned his future',
    right: 'A historical reading: the mission school replaced the values that his people had raised him with',
    wrong: ['An economic reading: the narrator’s family grows rich by selling cattle to their neighbours', 'A feminist reading: the grandmother holds the real power in the family and rules the tepee', 'A reader-response reading: every reader decides for themselves whether the narrator dies at all'],
    why: 'The school taught him “it was wrong to kill”, so he did not become “the warrior, huntsman, and husband” he was meant to be: a change made by the history of the mission schools.',
  },
  {
    story: BEAST,
    excerpt: BEAST_ESCAPE,
    lead: 'John Marcher, standing at May Bartram’s grave, finally understands what he has missed',
    right: 'A psychological reading: his long wait for a great event was a way of avoiding love',
    wrong: ['An economic reading: he could not marry May because he was too poor to support a wife', 'A historical reading: London society at the time did not allow unmarried friends to meet', 'A feminist reading: May had no wish to marry and kept Marcher at a distance on purpose'],
    why: '“The escape would have been to love her”: the waiting that defined his life was what kept him from the love that would have made him live.',
  },
];

function lensReadingQ(rng: Rng, d: Difficulty) {
  if (d === 3) {
    const s = rng.pick(SUPPORTS);
    return {
      prompt: `In ${titled(s.story)}, ${s.lead}:\n\n${quoteBlock(s.excerpt)}\n\nWhich critical reading of the story does this quotation support **best**?`,
      parts: [part(mc(rng, s.right, s.wrong))],
      hints: ['Ask what the quotation is really about: gender, the mind, money and class, history, or the reader’s experience.'],
      solution: [`${s.right}.`, s.why],
    };
  }
  const e = rng.pick(d === 1 ? EVIDENCE.filter((x) => x.others.length >= 3) : EVIDENCE.filter((x) => x.others.length < 3));
  return {
    prompt: `${LENS_NAME[e.lens]} reading of ${titled(e.story)} claims:\n\n${block(e.claim)}\n\nWhich quotation best supports this reading?`,
    parts: [part(mc(rng, q(e.key.text), e.others.map((o) => q(o.text))))],
    hints: ['All the quotations come from the right story. Which one actually shows what the claim says?'],
    solution: [`${q(e.key.text)}`, e.why],
  };
}

export const CONTEXT_SKILLS: SkillDef[] = [
  skill({
    id: 'e12-context',
    name: 'Fiction in context',
    description: 'Choose the historical or social context that deepens a reading, and tell good uses of context from ones that replace the text.',
    outcomes: OUT,
    lessonId: CONTEXT_LESSON,
    format: 'mc',
    gen: contextQ,
  }),
  skill({
    id: 'e12-character-society',
    name: 'Character and society',
    description: 'Analyse how characters are shaped by, conform to, resist or use the expectations of their society.',
    outcomes: OUT,
    lessonId: CONTEXT_LESSON,
    format: 'mc',
    gen: societyQ,
  }),
  skill({
    id: 'e12-literary-lens',
    name: 'Critical lenses',
    description: 'Recognize historical, feminist, psychological, economic and reader-response readings, and the questions each lens asks.',
    outcomes: OUT,
    lessonId: LENS_LESSON,
    format: 'mc',
    gen: lensQ,
  }),
  skill({
    id: 'e12-lens-reading',
    name: 'Evidence for a lens reading',
    description: 'Choose the quotation that best supports a reading of a story through a named critical lens.',
    outcomes: OUT,
    lessonId: LENS_LESSON,
    format: 'mc',
    gen: lensReadingQ,
  }),
];
