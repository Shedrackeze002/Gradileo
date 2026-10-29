/**
 * Grade 12 English, lessons 4.3 and 4.4: Satire and the Comedy of Manners; Statistics, Evidence and
 * Reasoning (12-D2). Horatian and Juvenalian satire, the tools of satire (epigram, mock-heroic,
 * allegory, caricature and invective), its targets in Wilde, Pope and Swift; misleading statistics and
 * graphs (a truncated axis, a cherry-picked time window, a percentage without its base, an average that
 * hides the spread, a small or narrow sample); and reasoning about causes (reverse causation,
 * confounding factors, survivorship bias, base-rate neglect, and the strength of a causal claim).
 * Quoted satire comes from ./speeches.ts; every other passage, figure, study and person is invented.
 */
import { fixedChoice, mc, part, skill } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef, TableFigure } from '../../../types.ts';
import { block, fill, pair } from '../../eng10/gen/common.ts';
import {
  GU_CUCUMBERS, GU_EGGS, GU_VERMIN, PO_ANNA, PO_OPENING, PO_STAIN, WI_ENGAGEMENTS, WI_IGNORANCE, WI_PARENT, WI_SMOKE, WI_SOCIETY, WI_STYLE,
  workBlock, type Excerpt,
} from './speeches.ts';

const lc = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

// ============================================================================ lesson 4.3: satire

type Mode = 'horatian' | 'juvenalian';
const MODE_NAME: Record<Mode, string> = {
  horatian: 'Horatian: gentle, amused mockery that laughs at folly',
  juvenalian: 'Juvenalian: bitter, angry attack that condemns vice',
};
interface ModeExample {
  /** A description, or a quoted passage with its lead-in. */
  text: string;
  mode: Mode;
  why: string;
}
const MODE_EXAMPLES: ModeExample[] = [
  { text: 'A newspaper column gently teases parents who film every moment of their children’s school concert on their phones and never actually watch it.', mode: 'horatian', why: 'The column smiles at a harmless, familiar folly; its tone is affectionate, not furious.' },
  { text: 'A comic play shows a family that spends a whole act arguing about which fork to use at dinner, while the dinner goes cold.', mode: 'horatian', why: 'The play laughs at trivial social fuss; nobody is harmed and the tone is light.' },
  { text: 'A pamphlet condemns factory owners who keep children working fourteen-hour days, calling them “merchants of misery who grow fat on small bones”.', mode: 'juvenalian', why: 'The pamphlet attacks a real cruelty with fierce, bitter language; its aim is outrage, not amusement.' },
  { text: 'A columnist savages a government that sold the town’s drinking water to a company and then let the pipes rot, comparing its ministers to rats in a granary.', mode: 'juvenalian', why: 'The tone is furious and contemptuous, and the target is serious wrongdoing that harms people.' },
  { text: `In ${WI_SMOKE.work.title} (${WI_SMOKE.work.year}), told that a young man smokes, Lady Bracknell replies:\n\n${workBlock(WI_SMOKE)}`, mode: 'horatian', why: 'Wilde laughs at an idle upper class for whom smoking counts as an “occupation”; the mockery is witty and good-humoured.' },
  { text: `In ${PO_OPENING.work.title} (${PO_OPENING.work.year}), Pope begins his poem about a stolen lock of hair:\n\n${workBlock(PO_OPENING)}`, mode: 'horatian', why: 'Pope teases fashionable society for treating a trifle like an epic war; the tone is playful.' },
  { text: 'A cartoon shows a tourist photographing a famous painting on his phone while standing right in front of it, and never once looking up at the painting itself.', mode: 'horatian', why: 'The cartoon smiles at a small, everyday absurdity; the tourist is silly, not wicked, and the tone is light.' },
  { text: 'A radio sketch follows a man who spends a whole week reading reviews to choose the perfect holiday, and finds that he has no days off left to take it.', mode: 'horatian', why: 'The sketch laughs good-humouredly at a harmless folly that listeners may recognize in themselves.' },
  { text: `In ${WI_ENGAGEMENTS.work.title} (${WI_ENGAGEMENTS.work.year}), Lady Bracknell gives her view of engagements:\n\n${workBlock(WI_ENGAGEMENTS)}`, mode: 'horatian', why: 'Wilde makes the snobbery of Lady Bracknell’s class ridiculous through a witty reversal, and the audience laughs rather than seethes.' },
  { text: 'An essay attacks a landlord who left families without heat through the winter, saying that he “would charge the dead rent for their graves if the law allowed it”.', mode: 'juvenalian', why: 'The essay condemns a cruelty that harms real families, and its scorn for the landlord is bitter, not playful.' },
  { text: 'A protest song attacks generals who send young soldiers to die while they dine in safety, calling them “butchers in gold braid”.', mode: 'juvenalian', why: 'The song is furious: it condemns men whose choices cost lives, and it means to wound them, not to amuse.' },
  { text: `In ${GU_VERMIN.work.title} (${GU_VERMIN.work.year}), after hearing Gulliver proudly describe his country’s laws, wars and politics, the King of Brobdingnag tells him:\n\n${workBlock(GU_VERMIN)}`, mode: 'juvenalian', why: 'The King’s verdict is a savage condemnation of humankind’s cruelty and corruption; there is no gentleness in it.' },
];

type Tool = 'epigram' | 'mock-heroic' | 'allegory' | 'caricature' | 'invective';
const TOOLS: Tool[] = ['epigram', 'mock-heroic', 'allegory', 'caricature', 'invective'];
const TOOL_NAME: Record<Tool, string> = {
  epigram: 'Epigram',
  'mock-heroic': 'Mock-heroic',
  allegory: 'Allegory',
  caricature: 'Caricature',
  invective: 'Invective',
};
const TOOL_WHAT: Record<Tool, string> = {
  epigram: 'an epigram is a short, witty, memorable saying, often built on a surprising twist',
  'mock-heroic': 'mock-heroic writing describes something trivial in the grand style of an epic',
  allegory: 'an allegory is a story whose characters and events stand for real people, groups or events',
  caricature: 'caricature exaggerates a person’s or a type’s features to make them ridiculous',
  invective: 'invective is direct, harsh, abusive denunciation of its target',
};
interface ToolExample {
  text: string;
  tool: Tool;
  /** Tools that could also be argued for this passage, so they are never offered as wrong answers. */
  also: Tool[];
}
const TOOL_EXAMPLES: ToolExample[] = [
  { text: 'Everyone wants to change the world; nobody wants to change the bins.', tool: 'epigram', also: [] },
  { text: 'In this office, every problem has a committee, and no committee has a solution.', tool: 'epigram', also: [] },
  { text: 'The council never forgets a promise; it simply never remembers keeping one.', tool: 'epigram', also: [] },
  { text: `${WI_SOCIETY.speaker} says, in ${WI_SOCIETY.work.title}: “${WI_SOCIETY.text}”`, tool: 'epigram', also: [] },
  { text: 'A student describes the lunch queue as an epic battle: trays become shields, the dinner staff are stern goddesses, and the last slice of pizza is the prize of the gods.', tool: 'mock-heroic', also: ['caricature'] },
  { text: 'A poem in solemn verse calls upon the Muse to sing of the great war between two neighbours over a hedge that grew three centimetres too tall.', tool: 'mock-heroic', also: [] },
  { text: `${workBlock(PO_OPENING)}`, tool: 'mock-heroic', also: [] },
  { text: 'A fable tells of two flocks in one farmyard that go to war over which way the gate should swing, while the fox quietly eats both.', tool: 'allegory', also: [] },
  { text: 'A story about a kingdom of ants whose queen bans all singing because she cannot sing is read by everyone as a story about the country’s own ruler.', tool: 'allegory', also: [] },
  { text: 'A cartoon draws the mayor with a head the size of a hot-air balloon and tiny ears, cutting the ribbon on a bridge with no road at either end.', tool: 'caricature', also: [] },
  { text: 'A comic novel’s headmaster has a voice like a foghorn, eyebrows like hedges and a cane he calls “Justice”, which he uses on the furniture.', tool: 'caricature', also: [] },
  { text: 'A columnist calls the company’s directors “a pack of greedy cowards who would sell their own grandmothers for a bonus”.', tool: 'invective', also: [] },
  { text: `${workBlock(GU_VERMIN)}`, tool: 'invective', also: [] },
];

interface Target {
  intro: string;
  excerpt: Excerpt;
  right: string;
  wrong: [string, string, string];
  why: string;
}
const TARGETS: Target[] = [
  {
    intro: 'Lady Bracknell is questioning a young man who hopes to marry her daughter.',
    excerpt: WI_ENGAGEMENTS,
    right: 'Upper-class marriages arranged for money and rank rather than for love or character',
    wrong: ['Young couples who rush into marriage without any engagement at all, against advice', 'Engaged couples who quarrel noisily about their wedding plans in front of their guests', 'Writers of the time who mocked marriage on the stage and were punished for doing so'],
    why: 'She calls getting to know a partner’s character “never advisable”: for her class, marriage is a matter of rank and fortune, and Wilde makes that look absurd.',
  },
  {
    intro: 'Lady Bracknell gives her view on education.',
    excerpt: WI_IGNORANCE,
    right: 'An upper class that wants education to stay harmless so that it keeps its power',
    wrong: ['Teachers who do not work hard enough to make their pupils learn anything at all', 'Students in England who refuse to study and waste the education given to them', 'Rioters in London who attack wealthy houses for no reason that anyone can see'],
    why: 'She is relieved that education “produces no effect”, because real learning might threaten the upper classes. Wilde exposes a class that fears an educated public.',
  },
  {
    intro: 'Lady Bracknell learns that the young man has lost both his parents.',
    excerpt: WI_PARENT,
    right: 'A snobbery that judges a person’s family history as a matter of social respectability',
    wrong: ['Young men who are careless with money and lose their family fortunes at cards', 'Parents who leave their children alone in large houses for weeks at a time', 'Orphans who pretend to have lost their parents in order to win sympathy from others'],
    why: 'Treating the loss of parents as “carelessness” shows that for Lady Bracknell, even grief is a question of social standing.',
  },
  {
    intro: 'Gwendolen is questioning her suitor about a lie he has told her.',
    excerpt: WI_STYLE,
    right: 'A society that values polished manners and appearances above honesty and feeling',
    wrong: ['People who dress carelessly and pay no attention at all to what they are wearing', 'Lawyers who argue in court about grave matters and do so without any sincerity', 'Writers who care more about their prose style than about telling a good story'],
    why: 'Putting “style” above “sincerity” in “matters of grave importance” turns the usual order of values upside down, exposing a world of surfaces.',
  },
  {
    intro: 'Gulliver visits an academy where inventors work on “projects”.',
    excerpt: GU_CUCUMBERS,
    right: 'Scientists and inventors who waste years on useless, impractical projects',
    wrong: ['Farmers who grow cucumbers in cold climates where they will not ripen', 'Governors who refuse to pay for the gardens that their towns rely on', 'Travellers who invent wild stories about the strange lands they visit'],
    why: 'Eight years spent extracting “sunbeams out of cucumbers” mocks learned men whose research has lost touch with any real use.',
  },
  {
    intro: 'In Lilliput, a law about how to break boiled eggs (at the large end or the small end) has divided the nation.',
    excerpt: GU_EGGS,
    right: 'Bitter political and religious quarrels over differences that do not matter',
    wrong: ['Cooks who break eggs carelessly and waste the food of the people of Lilliput', 'Historians who exaggerate the number of people who died in ancient wars', 'Rulers who forbid their subjects from eating eggs on certain days of the week'],
    why: 'Thousands dying over which end of an egg to break mocks the religious and political feuds of Swift’s own day, fought over trivial differences.',
  },
  {
    intro: 'Pope describes Hampton Court, where Queen Anne holds court.',
    excerpt: PO_ANNA,
    right: 'A court where weighty matters of state sit beside mere social trifles',
    wrong: ['A queen who refuses to drink tea and insults her guests at the palace', 'Three kingdoms that fight a long war about who should rule them all', 'Servants at the palace who serve the tea too late in the afternoon'],
    why: 'Joining “counsel” and “tea” with one verb (a zeugma) puts affairs of state and a tea party on the same level, a gentle jab at the court’s priorities.',
  },
  {
    intro: 'Pope describes the possible disasters awaiting his heroine, Belinda.',
    excerpt: PO_STAIN,
    right: 'A fashionable world that treats a stained dress as seriously as a lost honour',
    wrong: ['Young women who refuse to go to balls and miss every party of the season', 'Dressmakers who use cheap cloth and make dresses that stain far too easily', 'Thieves who steal necklaces from guests while they dance at grand balls'],
    why: 'Each line pairs something grave with something trivial (honour with a brocade dress, a heart with a necklace), showing a society that can no longer tell them apart.',
  },
];

function satireQ(rng: Rng, d: Difficulty) {
  if (d === 3) {
    const t = rng.pick(TARGETS);
    return {
      prompt: `${t.intro}\n\n${workBlock(t.excerpt)}\n\nWhat is the **target** of the satire here?`,
      parts: [part(mc(rng, t.right, t.wrong))],
      hints: ['The target is what the writer wants readers to judge, which is often not what the words seem to be about. Ask whose attitudes or values the passage makes ridiculous.'],
      solution: [t.why, `So the target is: ${lc(t.right)}.`],
    };
  }
  if (d === 2) {
    const ex = rng.pick(TOOL_EXAMPLES);
    const pool = TOOLS.filter((t) => t !== ex.tool && !ex.also.includes(t));
    return {
      prompt: `${ex.text.startsWith('>') ? ex.text : block(ex.text)}\n\nWhich tool of satire does this passage **mainly** use?`,
      parts: [part(mc(rng, TOOL_NAME[ex.tool], rng.shuffle(pool).slice(0, 3).map((t) => TOOL_NAME[t])))],
      hints: ['Ask how the passage mocks: a witty one-line twist, epic grandeur for a trifle, a story standing for something real, an exaggerated portrait, or open abuse?'],
      solution: [`It mainly uses ${TOOL_NAME[ex.tool].toLowerCase()}: ${TOOL_WHAT[ex.tool]}.`],
    };
  }
  const ex = rng.pick(MODE_EXAMPLES);
  return {
    prompt: `${ex.text.includes('\n') ? ex.text : block(ex.text)}\n\nIs this satire **Horatian** or **Juvenalian**?`,
    parts: [part(fixedChoice([MODE_NAME.horatian, MODE_NAME.juvenalian], ex.mode === 'horatian' ? 0 : 1))],
    hints: ['Listen to the tone. Is the writer amused by a folly, or angry at a vice that does real harm?'],
    solution: [ex.why, `So it is ${ex.mode === 'horatian' ? 'Horatian' : 'Juvenalian'} satire.`],
  };
}

// ============================================================================ lesson 4.4: statistics

type Flaw = 'axis' | 'window' | 'base' | 'average' | 'sample' | 'fair';
const FLAWS: Flaw[] = ['axis', 'window', 'base', 'average', 'sample'];
const FLAW_CHOICE: Record<Flaw, string> = {
  axis: 'The vertical axis does not start at zero, so a small difference looks dramatic',
  window: 'It picks a short stretch of time that suits the claim and hides the longer trend',
  base: 'It reports a relative change, like “doubled” or “up 300%”, without the small numbers behind it',
  average: 'A single average hides how spread out the figures are, or how a few extremes skew it',
  sample: 'The sample is too small or too narrow to support a claim about the whole population',
  fair: 'Nothing: the figures are complete and are presented to the reader in a fair way',
};
const FLAW_FIX: Record<Flaw, string> = {
  axis: 'Start the vertical axis at zero, so the bars show the true size of the difference',
  window: 'Show the figures for the whole period, not just the stretch that fits the claim',
  base: 'Give the actual numbers before and after, as well as the relative change',
  average: 'Report the median and the range as well as the mean, so the spread can be seen',
  sample: 'Survey a much larger group chosen at random from the whole population, not a few',
  fair: '',
};
const FLAW_WHY: Record<Flaw, string> = {
  axis: 'when an axis starts high, the bars’ heights exaggerate a small difference',
  window: 'choosing only the stretch of time that fits the claim hides the trend over the whole record',
  base: 'a large percentage of a tiny number is still a tiny number',
  average: 'a mean can be dragged up or down by a few extreme values, and says nothing about spread',
  sample: 'a few people, or a group that is not typical, cannot speak for everyone',
  fair: 'the figures are complete, in context and drawn to scale',
};
interface StatCase {
  flaw: Flaw;
  text: string;
  figure?: TableFigure;
}
const STAT_CASES: StatCase[] = [
  {
    flaw: 'axis',
    text: 'An advert compares the battery life of two phones in a bar chart. The vertical axis runs from 10 hours to 10.7 hours, so the Nova’s bar looks nearly three times as tall as the Pulse’s.',
    figure: { type: 'table', headers: ['Phone', 'Battery life (hours)'], rows: [['Pulse', '10.2'], ['Nova', '10.6']] },
  },
  {
    flaw: 'axis',
    text: 'A council leaflet shows a chart of the town’s recycling rate. The axis begins at 40%, so the rise from 41% to 43% fills almost the whole height of the chart.',
    figure: { type: 'table', headers: ['Year', 'Recycling rate'], rows: [['Last year', '41%'], ['This year', '43%']] },
  },
  {
    flaw: 'axis',
    text: 'A school’s newsletter shows the average class size in two years as a bar chart. The vertical axis starts at 26.5, so the rise from 27 to 28 pupils makes the second bar look three times as tall.',
    figure: { type: 'table', headers: ['Year', 'Average class size'], rows: [['Last year', '27'], ['This year', '28']] },
  },
  {
    flaw: 'window',
    text: 'A ski resort advertises that snowfall “has doubled”, comparing this January with last January. Over the past twenty winters, its snowfall has been falling steadily.',
  },
  {
    flaw: 'window',
    text: 'A company’s report says its share price “rose 40% in a month”. Over the whole year, the price fell by more than half, and the month shown was the only one in which it rose.',
  },
  {
    flaw: 'window',
    text: 'A campaign leaflet shows a graph of crime in the town for the three months after its candidate took office, when crime fell. Over the previous ten years, crime had risen and fallen by the same amount many times.',
  },
  {
    flaw: 'base',
    text: 'A headline warns that a rare illness has become “twice as common”. The number of cases rose from 2 in every million people to 4 in every million.',
  },
  {
    flaw: 'base',
    text: 'A club announces that its membership has “grown by 300%”. It had one member last year and now has four.',
  },
  {
    flaw: 'average',
    text: 'A job advert says that the average salary at a small firm is very high. The figure includes the owner’s salary, which is twenty times what most of the staff earn.',
    figure: { type: 'table', headers: ['Staff member', 'Salary (thousands)'], rows: [['Owner', '600'], ['Manager', '45'], ['Clerk 1', '30'], ['Clerk 2', '30'], ['Clerk 3', '30']] },
  },
  {
    flaw: 'average',
    text: 'A report says that the town’s residents commute an average of 20 minutes. Most commute 5 minutes, but a few travel more than two hours to the city each way.',
  },
  {
    flaw: 'sample',
    text: 'A gym owner reports that 11 of the 12 people he asked at his gym think the town needs another gym, and concludes that the whole town wants one.',
  },
  {
    flaw: 'sample',
    text: 'An online poll on a cycling club’s website finds that 94% of voters want more bike lanes, and the club announces that the whole city agrees.',
  },
  {
    flaw: 'average',
    text: 'A school says that its students read “an average of 12 books a year”. Two students read more than 100 books each, and most read two or three.',
  },
  {
    flaw: 'sample',
    text: 'A sports drink company says that “9 out of 10 athletes prefer our drink”, based on asking the ten members of the team it sponsors.',
  },
  {
    flaw: 'fair',
    text: 'A chart shows the town’s monthly rainfall for every month of the last five years. Its axis starts at zero, its source is the national weather service, and it states how each figure was measured.',
  },
  {
    flaw: 'fair',
    text: 'A survey of 2,400 residents chosen at random from the town’s electoral roll finds that 61% support the new park. The report gives the question asked, the number who answered and the margin of error.',
  },
];
interface RiskCase {
  text: string;
  right: string;
  wrong: [string, string, string];
  why: string;
}
const RISKS: RiskCase[] = [
  {
    text: 'A headline says that a medicine “raises the risk of headaches by 50%”. In the study, 2 in every 1,000 people had headaches without the medicine, and 3 in every 1,000 had them with it.',
    right: 'One more person in every 1,000 had headaches with the medicine',
    wrong: ['Half of all the people who took the medicine had headaches afterwards', 'Fifty more people in every 1,000 had headaches with the medicine', 'Every person who took the medicine was 50 times more likely to have headaches'],
    why: 'A 50% rise in relative risk here means going from 2 to 3 in 1,000: an absolute rise of 1 in 1,000.',
  },
  {
    text: 'A report says that a new road layout “cut accidents by 75%”. Before the change there were 4 accidents a year on the road, and after it there was 1.',
    right: 'There are three fewer accidents a year on the road than there were before',
    wrong: ['Seventy-five accidents a year have been prevented by the new road layout', 'Three-quarters of all the accidents in the country have been prevented', 'There are now seventy-five percent of the accidents there used to be'],
    why: 'From 4 to 1 is a fall of 3 accidents a year, which is 75% of the original 4.',
  },
  {
    text: 'An advert claims that a new toothpaste makes cavities “40% less likely”. In the trial, 5 in every 100 children using ordinary toothpaste got a cavity, against 3 in every 100 using the new one.',
    right: 'Two fewer children in every 100 got a cavity with the new toothpaste',
    wrong: ['Forty fewer children in every 100 got a cavity with the new toothpaste', 'Forty percent of the children who used it never needed to see a dentist', 'Only three children in all of the trial ever got a cavity of any kind'],
    why: 'From 5 to 3 in 100 is a fall of 2 in 100, which is 40% of the original 5.',
  },
];

function statisticsQ(rng: Rng, d: Difficulty) {
  if (d === 3 && rng.chance(0.4)) {
    const r = rng.pick(RISKS);
    return {
      prompt: `${block(r.text)}\n\nWhat does the change mean in **absolute** terms?`,
      parts: [part(mc(rng, r.right, r.wrong))],
      hints: ['A percentage change compares the new figure with the old one. To see the real size of the change, subtract: how many more (or fewer) cases per hundred or per thousand?'],
      solution: [r.why, `So, in absolute terms: ${lc(r.right)}.`],
    };
  }
  const flaws: Flaw[] = d === 3 ? [...FLAWS, 'fair'] : FLAWS;
  const c = rng.pick(STAT_CASES.filter((x) => flaws.includes(x.flaw)));
  if (d === 2 && c.flaw !== 'fair') {
    const others = rng.shuffle(FLAWS.filter((f) => f !== c.flaw)).slice(0, 3);
    return {
      prompt: `${c.text}\n\nWhich change would do most to make this presentation **fair**?`,
      figure: c.figure,
      parts: [part(mc(rng, FLAW_FIX[c.flaw], others.map((f) => FLAW_FIX[f])))],
      hints: ['First name what is misleading. Then choose the change that removes that problem, not some other one.'],
      solution: [`The problem is that ${FLAW_WHY[c.flaw]}.`, `So the fix is: ${lc(FLAW_FIX[c.flaw])}.`],
    };
  }
  return {
    prompt: `${c.text}\n\n${d === 3 ? 'What, if anything, is misleading about this?' : 'What is misleading about this?'}`,
    figure: c.figure,
    parts: [part(fixedChoice(flaws.map((f) => FLAW_CHOICE[f]), flaws.indexOf(c.flaw)))],
    hints: ['Check the scale, the time period, the numbers behind any percentage, what an average might hide, and who was asked.'],
    solution: [c.flaw === 'fair' ? `Nothing is misleading: ${FLAW_WHY.fair}.` : `${FLAW_CHOICE[c.flaw]}: ${FLAW_WHY[c.flaw]}.`],
  };
}

// ============================================================================ lesson 4.4: reasoning about causes

type Error_ = 'reverse' | 'confounder' | 'survivorship' | 'baserate' | 'sound';
const ERRORS: Error_[] = ['reverse', 'confounder', 'survivorship', 'baserate'];
const ERROR_NAME: Record<Error_, string> = {
  reverse: 'Reverse causation: the effect may really be causing the cause',
  confounder: 'A confounding factor: some third thing may be causing both of them',
  survivorship: 'Survivorship bias: it looks only at the cases that survived or succeeded',
  baserate: 'Base-rate neglect: it ignores how rare or common the thing is overall',
  sound: 'Nothing: the evidence does support the causal claim that is made',
};
const ERROR_WHY: Record<Error_, string> = {
  reverse: 'the arrow of cause may run the other way',
  confounder: 'a third factor can make two things rise and fall together without either causing the other',
  survivorship: 'the failures that did not survive are missing from the evidence, so the pattern is biased',
  baserate: 'without knowing how common something is overall, a striking figure can mislead',
  sound: 'a fair comparison, with chance deciding who got the treatment, rules out the other explanations',
};
const REASONING: Record<Error_, string[]> = {
  reverse: [
    'The faster the sails of a windmill turn, the stronger the wind is blowing, so the turning sails must be making the wind.',
    'Students who see the tutor every week get lower marks than students who never go, so tutoring must lower marks.',
    'Students who visit the school counsellor most often report the most stress, so visiting the counsellor must make students stressed.',
  ],
  confounder: [
    'Children with bigger feet score higher on reading tests, so bigger feet must make children better readers.',
    'In weeks when more electric fans are sold, more people are treated for heatstroke, so electric fans must cause heatstroke.',
    'Countries where people drink more coffee have more prize-winning scientists per person, so drinking coffee must make people win prizes.',
    'In months when more sunglasses are sold, more people drown, so selling sunglasses must lead to drownings.',
  ],
  survivorship: [
    'Every famous entrepreneur in the magazine dropped out of university, so dropping out must be a path to success.',
    'The old houses still standing in town are all solidly built, so builders a century ago must have been better than today’s.',
    'The planes that returned from battle had bullet holes mostly in their wings, so the wings are where armour is most needed.',
    'The songs from fifty years ago that are still played on the radio are all excellent, so popular music must have been better back then.',
  ],
  baserate: [
    'A screening test for a rare illness is 99% accurate, and 1 person in 10,000 has the illness. NAME tests positive and concludes that {he} almost certainly has it.',
    'Most car accidents happen within five kilometres of home, so the roads near home must be the most dangerous to drive on.',
    'Most drivers caught speeding last year drove silver cars, so drivers of silver cars must be the most reckless.',
    'Nine out of ten people who caught the flu last winter had eaten bread that week, so bread must help to spread the flu.',
  ],
  sound: [
    'In a trial, 4,000 volunteers were randomly given either the new vaccine or a dummy injection, and those given the vaccine fell ill far less often.',
    'A town chose half of its streets at random for new street lights; night-time accidents fell on those streets but not on the others.',
    'A school picked half of its classes at random to start an hour later; over the year, students in those classes were late far less often than the others.',
  ],
};
interface Confounder {
  claim: string;
  right: string;
  wrong: [string, string, string];
}
const CONFOUNDERS: Confounder[] = [
  {
    claim: 'Children with bigger feet score higher on reading tests.',
    right: 'Age: older children have bigger feet and have had more years to learn to read',
    wrong: ['The colour of the children’s shoes, which the testers wrote down on each paper', 'The weather on the day of the test, which was warm and sunny across the region', 'The name of the reading test, which the children did not know before they took it'],
  },
  {
    claim: 'In weeks when more ice cream is sold, more people get sunburned.',
    right: 'Hot, sunny weather: it makes people buy ice cream and spend hours outdoors',
    wrong: ['The flavours of ice cream on sale, which change slowly over the course of the year', 'The prices of sunglasses in the shops, which stay much the same in every season', 'The number of ice-cream vans in the town, which the council fixes every January'],
  },
  {
    claim: 'Students who eat breakfast every day get higher marks than those who skip it.',
    right: 'Home life: settled, well-off homes make both regular breakfasts and study easier',
    wrong: ['The type of cereal the students eat, which the survey did not ask them about', 'The time the school bell rings, which is the same for every student in the school', 'The number of students in each class, which was similar across the whole sample'],
  },
  {
    claim: 'Towns with more libraries have more reported crimes.',
    right: 'Population: bigger towns have both more libraries and more crimes reported',
    wrong: ['The opening hours of each library, which are the same in every single town', 'The number of books borrowed per person, which is lowest in the smallest towns', 'The age of the library buildings, which were all built in the same decade'],
  },
];
interface Strength {
  claim: string;
  right: string;
  wrong: [string, string, string];
}
const STRENGTHS: Strength[] = [
  {
    claim: 'a new reading program improves children’s reading',
    right: 'Schools are randomly given the program or not, and both groups take the same test',
    wrong: ['Children who chose to join the program read better than those who did not join', 'A teacher who loves the program says that her pupils now enjoy reading more', 'Reading scores rose in the year the program began, but no other schools were compared'],
  },
  {
    claim: 'a new fertilizer makes tomato plants grow taller',
    right: 'Plants are randomly given the fertilizer or plain water, then all of them are measured',
    wrong: ['A gardener used the fertilizer last summer and says her plants grew taller than ever', 'Farms that buy the fertilizer have taller plants, but they also have better soil', 'Plants grew taller in the month after the fertilizer arrived, with nothing compared'],
  },
  {
    claim: 'a quiet study room improves students’ test marks',
    right: 'Students are randomly assigned to the quiet room or the usual room, then tested',
    wrong: ['Students who already chose the quiet room had higher marks than those who did not', 'The librarian reports that students in the quiet room seem much happier and calmer', 'Marks rose in the term the quiet room opened, but no comparison group was tested'],
  },
];

function reasoningQ(rng: Rng, d: Difficulty) {
  const cast = pair(rng);
  if (d === 3 && rng.chance(0.4)) {
    const s = rng.pick(STRENGTHS);
    return {
      prompt: `Which study would give the **strongest** evidence that ${s.claim}?`,
      parts: [part(mc(rng, s.right, s.wrong))],
      hints: ['The strongest evidence of a cause comes from a fair comparison in which chance, not choice, decides who gets the treatment.'],
      solution: [`${s.right}: random assignment means the two groups differ only in the treatment, so a difference in results can be traced to it.`, 'The others rely on self-selected groups, one person’s impression, or a before-and-after change with nothing to compare it with.'],
    };
  }
  if (d === 2 && rng.chance(0.5)) {
    const c = rng.pick(CONFOUNDERS);
    return {
      prompt: `${block(c.claim)}\n\nWhich is the most likely **confounding factor**, a third thing that could explain the link?`,
      parts: [part(mc(rng, c.right, c.wrong))],
      hints: ['Look for something that could plausibly cause both things at once. If it would make both rise together, it could explain the link.'],
      solution: [`${c.right}. It could produce the link without either thing causing the other.`],
    };
  }
  const kinds: Error_[] = d === 3 ? [...ERRORS, 'sound'] : ERRORS;
  const kind = rng.pick(kinds);
  const text = fill(rng.pick(REASONING[kind]), cast);
  return {
    prompt: `${block(text)}\n\n${d === 3 ? 'What, if anything, is wrong with this reasoning?' : 'What is wrong with this reasoning?'}`,
    parts: [part(fixedChoice(kinds.map((k) => ERROR_NAME[k]), kinds.indexOf(kind)))],
    hints: ['Ask: could the cause run the other way? Could a third thing cause both? Are the failures missing? Do we know how common the thing is overall?'],
    solution: [kind === 'sound' ? `Nothing is wrong: ${ERROR_WHY.sound}.` : `${ERROR_NAME[kind].split(':')[0]}: ${ERROR_WHY[kind]}.`],
  };
}

const L3 = 'e12-4-3';
const L4 = 'e12-4-4';

export const REASONING_SKILLS: SkillDef[] = [
  skill({
    id: 'e12-satire',
    name: 'Satire and the comedy of manners',
    description: 'Tell Horatian from Juvenalian satire, recognize epigram, mock-heroic, allegory, caricature and invective, and identify the targets of Wilde, Pope and Swift.',
    outcomes: ['12-D2'],
    lessonId: L3,
    format: 'mc',
    gen: satireQ,
  }),
  skill({
    id: 'e12-statistics',
    name: 'Misleading statistics',
    description: 'Recognize truncated axes, cherry-picked time windows, percentages without their base, averages that hide the spread and small or narrow samples, fix them, and turn a relative change into an absolute one.',
    outcomes: ['12-D2'],
    lessonId: L4,
    format: 'mc',
    gen: statisticsQ,
  }),
  skill({
    id: 'e12-reasoning',
    name: 'Reasoning about causes',
    description: 'Recognize reverse causation, confounding factors, survivorship bias and base-rate neglect, find a likely confounder, and choose the study that best supports a causal claim.',
    outcomes: ['12-D2'],
    lessonId: L4,
    format: 'mc',
    gen: reasoningQ,
  }),
];
