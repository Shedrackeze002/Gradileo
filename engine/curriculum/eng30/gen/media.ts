/**
 * Grade 12 English, Unit 5: Media and Culture (12-E1). How ownership, funding, audience and platform
 * shape media content; representation and power (voice, the gaze, counter-narratives, tokenism and
 * framing); the techniques of propaganda, past and present; and testing claims in digital media (out
 * of context, manipulated media, accurate but misleading headlines, impostor sources and satire taken
 * as news). Ida B. Wells is quoted from ./speeches.ts; historical propaganda is described neutrally,
 * and every outlet, country, campaign, post and person in the other questions is invented for Gradileo.
 */
import { fixedChoice, mc, part, skill } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { block, fill, pair } from '../../eng10/gen/common.ts';
import { WE_PAPERS, WE_PRESS, leadIn, workBlock } from './speeches.ts';

const lc = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

// ============================================================================ lesson 5.1: media industries

type Factor = 'advertising' | 'ownership' | 'subscription' | 'public' | 'platform';
const FACTORS: Factor[] = ['advertising', 'ownership', 'subscription', 'public', 'platform'];
const FACTOR_NAME: Record<Factor, string> = {
  advertising: 'Advertising: content is shaped to draw the large audiences that advertisers pay for',
  ownership: 'Ownership: the owner’s other business or political interests shape what is covered',
  subscription: 'Subscription: content is shaped to keep the paying readers who fund the outlet',
  public: 'Public funding: a public mission requires content that serves the whole country',
  platform: 'Platform: the format and ranking rules of the platform shape what gets made',
};
/** Factors that easily overlap, so they are never offered against each other. */
const FACTOR_CLASH: Partial<Record<Factor, Factor[]>> = {
  advertising: ['platform'],
  platform: ['advertising'],
};
const FACTOR_EXAMPLES: Record<Factor, string[]> = {
  advertising: [
    'A free news website earns all of its money from adverts paid for by the number of page views. Its front page is now mostly celebrity gossip and dramatic crime headlines.',
    'A free local radio station, paid for entirely by adverts, has replaced its hour of council news with a phone-in quiz that draws three times as many listeners.',
  ],
  ownership: [
    'The *Daily Courier* is owned by a company that also builds shopping centres. Last month it ran six admiring stories about a new mall built by its owner, and none about residents’ objections.',
    'A television channel owned by a mining company covered a protest against a new mine in one short report, while rival channels led their news with it.',
  ],
  subscription: [
    'A financial magazine whose readers pay a high yearly fee covers investment tips in great detail, but rarely writes about low-paid workers.',
    'A specialist cycling website funded by its members’ fees publishes long technical reviews of expensive bikes and almost nothing about cheap commuter bikes.',
  ],
  public: [
    'A publicly funded broadcaster is required by law to serve every region. It makes programs in several languages and covers small towns that commercial channels ignore.',
    'A public radio network, funded by a licence fee, broadcasts a nightly program on farming and fishing news for rural listeners that no commercial station carries.',
  ],
  platform: [
    'A short-video app ranks clips by how many viewers watch to the end. News channels on the app now cut their reports to thirty seconds, with the most dramatic moment first.',
    'On a social app that shows only one image per post, a charity now sums up a complex report on child poverty in a single photo with six words of text.',
  ],
};
interface FactorEffect {
  setup: string;
  right: string;
  wrong: [string, string, string];
  why: string;
}
const FACTOR_EFFECTS: FactorEffect[] = [
  {
    setup: 'A free news app earns all of its money from adverts that are paid for by the number of clicks each story gets.',
    right: 'It is likely to favour sensational headlines and stories that draw quick clicks',
    wrong: ['It is likely to publish long investigations that few readers will ever open', 'It is likely to cover only stories that its owner’s other companies approve', 'It is likely to serve every region equally, as the law requires it to do'],
    why: 'When income depends on clicks, stories that attract clicks are rewarded, so the content drifts towards the sensational.',
  },
  {
    setup: 'A newspaper is bought by a businessman who also owns the country’s largest airline.',
    right: 'Its coverage of the airline and of air travel may become less critical',
    wrong: ['It will have to publish everything in several languages from now on', 'Its stories will be cut to thirty seconds and posted as short videos', 'It will stop carrying adverts and rely only on a public licence fee'],
    why: 'An owner’s other interests can quietly shape coverage: journalists may avoid stories that would harm the owner’s business.',
  },
  {
    setup: 'A national broadcaster is funded by the public and has a legal duty to serve the whole country.',
    right: 'It is likely to cover regions and groups that commercial channels find unprofitable',
    wrong: ['It is likely to chase the largest audience it can find in order to sell more adverts', 'It is likely to report only on the business interests of the person who owns it', 'It is likely to cut every story to suit the ranking rules of a short-video app'],
    why: 'A public mission, not profit, decides what such a broadcaster makes, so it can serve audiences advertisers ignore.',
  },
  {
    setup: 'A video platform starts recommending clips mainly by how long viewers keep watching.',
    right: 'Creators are likely to make clips that hook viewers early and keep them watching',
    wrong: ['Creators are likely to make shorter, duller clips that viewers soon abandon', 'Creators are likely to stop posting news and turn to printing newspapers', 'Creators are likely to ask their viewers to pay a yearly subscription fee'],
    why: 'A platform’s ranking rules reward whatever they measure; when watch time counts, content is built to hold attention.',
  },
];
interface PdIndustry {
  intro: string;
  question: string;
  right: string;
  wrong: [string, string, string];
  why: string;
}
const PD_INDUSTRY: PdIndustry[] = [
  {
    intro: `${leadIn(WE_PAPERS.work)}\n\n${workBlock(WE_PAPERS)}`,
    question: 'What does this passage suggest about how money shaped the press of Wells’s time?',
    right: 'The papers willing to print the truth were too poor to pay for the investigations it needed',
    wrong: ['The richest papers were the most eager to investigate and to print the full truth', 'Every paper in the country had the same money and the same freedom to investigate', 'The poorest papers printed only adverts and had no interest in reporting the news'],
    why: 'Wells says the Black press alone “will print the truth” but “lack means” to investigate. Funding decided who could gather the facts, and the wealthier press did not use its means to do so.',
  },
  {
    intro: `${leadIn(WE_PRESS.work)}\n\n${workBlock(WE_PRESS)}`,
    question: 'What role does Wells give the press in this sentence?',
    right: 'A gatekeeper of knowledge: what it chooses to print decides what the public can act on',
    wrong: ['A source of entertainment that has nothing to do with how the public behaves', 'A business whose only purpose is to sell adverts to the largest possible audience', 'An enemy of the people that should be closed so that the public can think freely'],
    why: 'If “the people must know before they can act”, then whoever controls what is printed controls what the public can do: the press is a gatekeeper.',
  },
];

function industryQ(rng: Rng, d: Difficulty) {
  if (d === 3 && rng.chance(0.5)) {
    const p = rng.pick(PD_INDUSTRY);
    return {
      prompt: `${p.intro}\n\n${p.question}`,
      parts: [part(mc(rng, p.right, p.wrong))],
      hints: ['Ask who could afford to gather the news, and who decided what was printed. Money and ownership shape what the public gets to know.'],
      solution: [p.why],
    };
  }
  if (d >= 2) {
    const e = rng.pick(FACTOR_EFFECTS);
    return {
      prompt: `${e.setup} What is the most likely effect on its content?`,
      parts: [part(mc(rng, e.right, e.wrong))],
      hints: ['Follow the money and the rules: who pays, who owns, and what the platform rewards. Content drifts towards what keeps the money coming.'],
      solution: [e.why, `So the likely effect: ${lc(e.right)}.`],
    };
  }
  const want = rng.pick(FACTORS);
  const text = rng.pick(FACTOR_EXAMPLES[want]);
  const pool = FACTORS.filter((f) => f !== want && !(FACTOR_CLASH[want] ?? []).includes(f));
  return {
    prompt: `${block(text)}\n\nWhich factor best explains what is happening?`,
    parts: [part(mc(rng, FACTOR_NAME[want], rng.shuffle(pool).slice(0, 3).map((f) => FACTOR_NAME[f])))],
    hints: ['Ask who pays for this outlet, who owns it, and where its content appears. Which of these explains the pattern?'],
    solution: [`The best explanation is ${lc(FACTOR_NAME[want].split(':')[0])}: ${FACTOR_NAME[want].split(': ')[1]}.`],
  };
}

// ============================================================================ lesson 5.2: representation and power

type Concept = 'voice' | 'gaze' | 'counter' | 'token' | 'frame';
const CONCEPTS: Concept[] = ['voice', 'gaze', 'counter', 'token', 'frame'];
const CONCEPT_NAME: Record<Concept, string> = {
  voice: 'Voice: who is allowed to speak for themselves, and who is only spoken about',
  gaze: 'The gaze: the outsider whose point of view the camera or narration takes',
  counter: 'Counter-narrative: a group telling its own story to challenge the usual one',
  token: 'Tokenism: including one member of a group just to appear fair or diverse',
  frame: 'Framing: showing a group over and over in one narrow role or in one light',
};
/** Concepts that easily overlap, so they are never offered against each other. */
const CONCEPT_CLASH: Partial<Record<Concept, Concept[]>> = {
  voice: ['token'],
  token: ['voice'],
  gaze: ['frame'],
  frame: ['gaze'],
};
const CONCEPT_EXAMPLES: Record<Concept, string[]> = {
  voice: [
    'A documentary about a fishing village interviews three government officials and a visiting economist, but none of the fishers whose jobs it describes.',
    'A news report on a new law for farm workers quotes the minister, two business owners and a professor, but no farm workers.',
  ],
  gaze: [
    'A travel series films a city’s market only through the eyes of a visiting presenter, who calls everything “exotic” and “strange” while the stallholders never speak.',
    'A novel set in a mountain village describes the villagers only as a passing tourist sees them: picturesque, mysterious and silent.',
  ],
  counter: [
    'After years of news stories that showed their neighbourhood only through crime reports, residents start their own newspaper about local artists, businesses and schools.',
    'A group of young people in a town known for its factory closures makes a film about the businesses and festivals they have built themselves.',
  ],
  token: [
    'A panel on the future of farming has nine speakers from the city and one woman farmer, who is asked a single question at the very end.',
    'A company’s new advert shows one older worker in a crowd scene, although the company has not hired anyone over fifty in ten years.',
  ],
  frame: [
    'Over a whole year, a news channel shows young people almost only in stories about crime, vandalism and noise complaints.',
    'Every story a magazine runs about a farming region shows it in drought or disaster, never in a good season or a time of success.',
  ],
};
interface Fairer {
  case_: string;
  right: string;
  wrong: [string, string, string];
  why: string;
}
const FAIRER: Fairer[] = [
  {
    case_: 'A documentary about a fishing village interviews officials and an economist, but none of the fishers whose jobs it describes.',
    right: 'Interview the fishers themselves, so they can describe their own work and lives',
    wrong: ['Add more officials and economists, so the film sounds even more authoritative', 'Cut the film shorter, so that viewers do not grow bored before the ending', 'Add music to the film, so the village seems more peaceful and attractive'],
    why: 'The problem is missing voices; the fix is to let the people being described speak for themselves.',
  },
  {
    case_: 'A news channel shows young people almost only in stories about crime and vandalism.',
    right: 'Cover young people across the full range of their lives, not just in crime stories',
    wrong: ['Show fewer young people in the news, so that viewers stop thinking about them', 'Interview more police officers about crime by young people in every report', 'Move the crime stories to the end of each program, so fewer people see them'],
    why: 'The problem is a narrow frame; the fix is to show the group in the full variety of roles it really has.',
  },
  {
    case_: 'A panel on farming has nine speakers from the city and one farmer, who is asked one question at the end.',
    right: 'Give farmers a real share of the panel and of the time to speak and be questioned',
    wrong: ['Remove the farmer from the panel, since one voice cannot make any difference', 'Add a second city speaker, so the panel has an even number of members', 'Ask the farmer the question at the start instead of at the end of the panel'],
    why: 'One token speaker with one question is not representation; a fair panel gives the affected group a real voice.',
  },
];
interface PdRepresentation {
  intro: string;
  question: string;
  right: string;
  wrong: [string, string, string];
  why: string;
}
const PD_REPRESENTATION: PdRepresentation[] = [
  {
    intro: `${leadIn(WE_PAPERS.work)}\n\n${workBlock(WE_PAPERS)}\n\nWells had shown that the major white-owned papers printed false reports about Black Americans accused of crimes.`,
    question: 'What role does Wells give the Black press?',
    right: 'A counter-narrative: it must put the facts that the major papers distort before the public',
    wrong: ['A token voice: it should appear now and then so that the major papers seem fair', 'An outside gaze: it should describe Black communities as a visiting stranger would', 'An echo: it should repeat whatever the major papers have printed, to avoid trouble'],
    why: 'Wells calls on the Black press to tell the story the dominant press distorts: a counter-narrative grounded in the facts.',
  },
];

function representationQ(rng: Rng, d: Difficulty) {
  if (d === 3 && rng.chance(0.4)) {
    const p = rng.pick(PD_REPRESENTATION);
    return {
      prompt: `${p.intro}\n\n${p.question}`,
      parts: [part(mc(rng, p.right, p.wrong))],
      hints: ['Ask whose story the major papers were telling, and who was telling it. What did Wells want the Black press to do about that?'],
      solution: [p.why],
    };
  }
  if (d >= 2 && rng.chance(0.5)) {
    const f = rng.pick(FAIRER);
    return {
      prompt: `${block(f.case_)}\n\nWhich change would make this representation **fairer**?`,
      parts: [part(mc(rng, f.right, f.wrong))],
      hints: ['Name the problem first (missing voices, a narrow frame, a token presence), then choose the change that addresses it.'],
      solution: [f.why, `So: ${lc(f.right)}.`],
    };
  }
  const want = rng.pick(CONCEPTS);
  const text = rng.pick(CONCEPT_EXAMPLES[want]);
  const pool = CONCEPTS.filter((c) => c !== want && !(CONCEPT_CLASH[want] ?? []).includes(c));
  return {
    prompt: `${block(text)}\n\nWhich idea best describes what is happening here?`,
    parts: [part(mc(rng, CONCEPT_NAME[want], rng.shuffle(pool).slice(0, 3).map((c) => CONCEPT_NAME[c])))],
    hints: ['Ask who speaks, through whose eyes we see, who is telling whose story, and in what roles the group always appears.'],
    solution: [`This is ${lc(CONCEPT_NAME[want].split(':')[0])}: ${CONCEPT_NAME[want].split(': ')[1]}.`],
  };
}

// ============================================================================ lesson 5.3: propaganda

type Technique = 'demonize' | 'glitter' | 'biglie' | 'fear' | 'scapegoat' | 'symbols';
const TECHNIQUES: Technique[] = ['demonize', 'glitter', 'biglie', 'fear', 'scapegoat', 'symbols'];
const TECH_NAME: Record<Technique, string> = {
  demonize: 'Demonization: showing the enemy as monstrous, evil or less than human',
  glitter: 'Glittering generalities: noble, vague words that stir feeling but say nothing',
  biglie: 'The big lie: a falsehood so huge and so often repeated that people believe it',
  fear: 'Fear: warning of a terrible danger that only the speaker’s side can prevent',
  scapegoat: 'Scapegoating: blaming a whole group of people for problems they did not cause',
  symbols: 'Transfer: borrowing the respect people feel for a flag, a faith or a hero',
};
const TECH_SHORT: Record<Technique, string> = {
  demonize: 'demonization',
  glitter: 'glittering generalities',
  biglie: 'the big lie',
  fear: 'an appeal to fear',
  scapegoat: 'scapegoating',
  symbols: 'transfer of symbols',
};
/** Techniques that easily overlap, so they are never offered against each other. */
const TECH_CLASH: Partial<Record<Technique, Technique[]>> = {
  demonize: ['scapegoat', 'fear'],
  scapegoat: ['demonize', 'biglie'],
  fear: ['demonize'],
  biglie: ['scapegoat'],
  glitter: ['symbols'],
  symbols: ['glitter'],
};
const TECH_EXAMPLES: Record<Technique, string[]> = {
  demonize: [
    'Posters in several countries during the First World War showed the enemy army as a giant beast, claws dripping, looming over a map of the homeland.',
    'An online campaign in the invented country of Velmora shares pictures of opposition leaders with their faces digitally turned into rats.',
  ],
  glitter: [
    'A campaign slogan promises “a new dawn of greatness, pride and freedom” but never says which policy will change or how.',
    'A party’s leaflet in Velmora is headed “Strength. Honour. Tomorrow.”, with no word about what the party plans to do.',
  ],
  biglie: [
    'For years, a government’s radio announces every morning that this year’s harvest is the best in the nation’s history, while people queue for bread.',
    'A ruler in Velmora repeats in every speech that the country has never lost a single battle, though everyone remembers last year’s defeat.',
  ],
  fear: [
    'A leaflet warns that if the other party wins, “your savings will vanish and your streets will burn”, without any evidence.',
    'An advert for a political group in Velmora shows a dark city at night and says, “Only we stand between your family and chaos.”',
  ],
  scapegoat: [
    'A leader blames the country’s rising prices entirely on a small community of recent immigrants, who have no control over prices.',
    'A Velmoran newspaper says that the town’s factory closed because of “outsiders” who moved there, not because of falling sales.',
  ],
  symbols: [
    'Recruiting posters in several countries during the two world wars placed the national flag, or a national hero, behind the call to enlist.',
    'A Velmoran candidate gives every speech in front of the statue of the nation’s founder, with the old royal banner hanging behind her.',
  ],
};
interface Resist {
  technique: Technique;
  right: string;
  wrong: [string, string, string];
  why: string;
}
const RESIST: Resist[] = [
  {
    technique: 'glitter',
    right: 'Ask what the noble words actually commit the speaker to doing, and how',
    wrong: ['Trust the slogan, because words like “freedom” are always used honestly', 'Ignore all political messages, since every one of them is equally false', 'Judge the message by how bright and attractive its colours and pictures are'],
    why: 'Glittering generalities borrow the glow of words that everyone admires, so they work only until someone asks what the words would mean in practice.',
  },
  {
    technique: 'fear',
    right: 'Ask what evidence there is for the danger, and whether other solutions exist',
    wrong: ['Act at once, because a frightening warning is always the most honest one', 'Share the message widely, so that everyone hears the warning straight away', 'Accept the warning if the speaker sounds confident and speaks very loudly'],
    why: 'An appeal to fear rushes people past the evidence, so slowing down to ask whether the danger is real, and whether only one side can stop it, takes away its force.',
  },
  {
    technique: 'scapegoat',
    right: 'Look for the real causes of the problem and ask whether the blamed group controls them',
    wrong: ['Accept the blame, because a whole group is always responsible for its members', 'Find a different group to blame, so that the first group is treated more fairly', 'Avoid thinking about the problem, since its causes can never be known at all'],
    why: 'Scapegoating offers an easy villain in place of a real explanation, so the answer is to trace the actual causes and see whether the blamed group has any power over them.',
  },
  {
    technique: 'symbols',
    right: 'Separate the respect you feel for the symbol from the argument the speaker is making',
    wrong: ['Support the speaker, because anyone shown with the flag must love the country', 'Refuse to respect the flag, so that no politician can ever use it again', 'Judge the speaker by the size and the beauty of the statue behind them'],
    why: 'Transfer lends a speaker the respect people feel for a symbol, so the argument has to be judged on its own, as if the flag or the statue were not there.',
  },
  {
    technique: 'demonize',
    right: 'Remember that the people shown as monsters are human, and look for what they really did',
    wrong: ['Accept the picture, because an enemy who looks frightening must really be dangerous', 'Make an even uglier picture of the other side, so that the contest is a fair one', 'Look away from the picture, since images can never change what anybody thinks'],
    why: 'Demonization makes it easier to hate or harm people by hiding their humanity, so the answer is to put the real people, and the real facts about them, back in view.',
  },
  {
    technique: 'biglie',
    right: 'Check the claim against records and witnesses, however often it has been repeated',
    wrong: ['Believe the claim, because something repeated every day for years must be true', 'Repeat the claim yourself, so that the people around you are not left confused', 'Accept the claim if it is printed in large letters on the front of every newspaper'],
    why: 'The big lie relies on repetition to make a falsehood feel familiar, so the answer is to test it against evidence that does not depend on how often it is said.',
  },
];

function propagandaQ(rng: Rng, d: Difficulty) {
  if (d === 3) {
    if (rng.chance(0.5)) {
      const r = rng.pick(RESIST);
      const text = rng.pick(TECH_EXAMPLES[r.technique]);
      return {
        prompt: `${block(text)}\n\nThis uses ${TECH_SHORT[r.technique]}. What is the best way for a reader to resist it?`,
        parts: [part(mc(rng, r.right, r.wrong))],
        hints: ['Propaganda works on feeling. Resisting it means asking the question the message hopes you will skip.'],
        solution: [r.why, `So the best way to resist it is to ${lc(r.right)}.`],
      };
    }
    const want = rng.pick(TECHNIQUES);
    const right = rng.pick(TECH_EXAMPLES[want]);
    const others = rng.shuffle(TECHNIQUES.filter((t) => t !== want && !(TECH_CLASH[want] ?? []).includes(t))).slice(0, 3).map((t) => rng.pick(TECH_EXAMPLES[t]));
    return {
      prompt: `Which example uses **${TECH_SHORT[want]}**?`,
      parts: [part(mc(rng, right, others))],
      hints: [`Remember: ${lc(TECH_NAME[want])}.`],
      solution: [`This example uses ${TECH_SHORT[want]}: ${TECH_NAME[want].split(': ')[1]}.`, 'Each of the others uses a different technique.'],
    };
  }
  const want = rng.pick(TECHNIQUES);
  const text = rng.pick(TECH_EXAMPLES[want]);
  const pool = TECHNIQUES.filter((t) => t !== want && !(TECH_CLASH[want] ?? []).includes(t));
  return {
    prompt: `${block(text)}\n\nWhich propaganda technique does this ${d === 1 ? 'mainly ' : ''}use?`,
    parts: [part(mc(rng, TECH_NAME[want], rng.shuffle(pool).slice(0, 3).map((t) => TECH_NAME[t])))],
    hints: ['Ask what the message does: turn people into monsters, use grand empty words, repeat a huge falsehood, frighten, blame a group, or borrow a symbol’s glory?'],
    solution: [`This is ${TECH_SHORT[want]}: ${TECH_NAME[want].split(': ')[1]}.`],
  };
}

// ============================================================================ lesson 5.3: misinformation

type Problem = 'context' | 'manipulated' | 'headline' | 'impostor' | 'satire';
const PROBLEMS: Problem[] = ['context', 'manipulated', 'headline', 'impostor', 'satire'];
const PROBLEM_NAME: Record<Problem, string> = {
  context: 'Out of context: a real photo or clip from another time or another place',
  manipulated: 'Manipulated media: an image, a video or a voice that has been edited or faked',
  headline: 'Accurate but misleading: true facts arranged to suggest something false',
  impostor: 'Impostor source: an account pretending to be a trusted organization',
  satire: 'Satire taken as news: a joke article shared as if it were a real report',
};
const PROBLEM_CHECK: Record<Problem, string> = {
  context: 'Search for the image, or a still from the clip, to see where and when it first appeared',
  manipulated: 'Find the original image or clip, and see whether experts or reporters have checked it',
  headline: 'Read the full article and the study it reports on, not just the dramatic headline',
  impostor: 'Check the sender’s account or address against the organization’s real website',
  satire: 'Check what kind of site published it, and whether the site calls itself satire',
};
const PROBLEM_EXAMPLES: Record<Problem, string[]> = {
  context: [
    'A photo of a flooded street goes viral with the caption “Lakeside this morning!”. It was taken in a different country nine years ago.',
    'A video of a crowd fighting at a stadium is shared as footage of last night’s match in Riverton. It comes from a different match, years ago.',
    'A photo of empty supermarket shelves is shared with the caption “Shortages begin today!”. It was taken during a snowstorm in another province four winters ago.',
  ],
  manipulated: [
    'A video shows the mayor announcing that every school will close, but her lips do not quite match the words, and no news outlet reported any such speech.',
    'A photo shows a famous bridge with a huge crack across it. The engineers who inspected the bridge the same day found no crack, and the shadows in the photo point two ways.',
    'An audio clip seems to record a school principal insulting her students, but the voice sounds flat, the clip was first posted by an anonymous account, and her school says it was made with a voice-cloning tool.',
  ],
  headline: [
    'A headline says “Coffee drinkers live longer, study finds.” The study found a small link in one group of older adults and did not test whether coffee was the cause.',
    'A headline reads “Crime doubles in Riverton!” The figures are correct: there were 2 burglaries last year and 4 this year, in a town of 30,000 people.',
    'A headline says “Half of Riverton’s bridges fail safety test!” The report behind it covers the town’s only two bridges, and the one that failed did so because of peeling paint.',
  ],
  impostor: [
    'A post from “@HealthMinistry_0fficial”, with a zero in place of the letter O, announces that schools will close tomorrow. The account was created last week.',
    'An email with the logo of NAME’s bank asks {him} to confirm {his} password through a link. The sender’s address ends in a misspelling of the bank’s name.',
    'A page called “Riverton City News Official” posts that the city’s tap water is unsafe to drink. The city’s real website links to a different page and has issued no warning.',
  ],
  satire: [
    'An article claims that the city will start taxing people for breathing on Tuesdays. It comes from a website called *The Daily Spoon*, which publishes only jokes.',
    'A story says that scientists have taught pigeons to file tax returns. It was first published by a comedy website and is now being shared as real news.',
    'A relative shares an article headed “Town Council Votes to Rename Winter”. The site’s “About” page says that every story it publishes is invented for laughs.',
  ],
};

function misinformationQ(rng: Rng, d: Difficulty) {
  const cast = pair(rng);
  const want = rng.pick(PROBLEMS);
  const text = fill(rng.pick(PROBLEM_EXAMPLES[want]), cast);
  if (d >= 2 && (d === 3 || rng.chance(0.5))) {
    return {
      prompt: `${block(text)}\n\nWhich check would do most to reveal the problem?`,
      parts: [part(mc(rng, PROBLEM_CHECK[want], rng.shuffle(PROBLEMS.filter((p) => p !== want)).slice(0, 3).map((p) => PROBLEM_CHECK[p])))],
      hints: ['Name the problem first. Then choose the check that tests exactly that: where an image came from, whether it has been altered, what a study really found, who runs an account, or what kind of site published it.'],
      solution: [`The problem is ${lc(PROBLEM_NAME[want].split(':')[0])}: ${PROBLEM_NAME[want].split(': ')[1]}.`, `So the best check is: ${lc(PROBLEM_CHECK[want])}.`],
    };
  }
  return {
    prompt: `${block(text)}\n\nWhat is the main problem with this item?`,
    parts: [part(fixedChoice(PROBLEMS.map((p) => PROBLEM_NAME[p]), PROBLEMS.indexOf(want)))],
    hints: ['Ask: is the media real but from elsewhere, faked, true but misleading, from a fake account, or a joke?'],
    solution: [`This is ${lc(PROBLEM_NAME[want].split(':')[0])}: ${PROBLEM_NAME[want].split(': ')[1]}.`],
  };
}

const L1 = 'e12-5-1';
const L2 = 'e12-5-2';
const L3 = 'e12-5-3';

export const MEDIA_SKILLS: SkillDef[] = [
  skill({
    id: 'e12-media-industry',
    name: 'Media industries and audiences',
    description: 'Explain how advertising, ownership, subscription, public funding and platforms shape media content, including the press that Ida B. Wells described.',
    outcomes: ['12-E1'],
    lessonId: L1,
    format: 'mc',
    gen: industryQ,
  }),
  skill({
    id: 'e12-representation-power',
    name: 'Representation and power',
    description: 'Recognize who speaks and who is spoken about, the outsider’s gaze, counter-narratives, tokenism and narrow framing, and choose fairer representation.',
    outcomes: ['12-E1'],
    lessonId: L2,
    format: 'mc',
    gen: representationQ,
  }),
  skill({
    id: 'e12-propaganda',
    name: 'Propaganda techniques',
    description: 'Recognize demonization, glittering generalities, the big lie, appeals to fear, scapegoating and transfer of symbols, in historical and modern examples, and how to resist them.',
    outcomes: ['12-E1'],
    lessonId: L3,
    format: 'mc',
    gen: propagandaQ,
  }),
  skill({
    id: 'e12-misinformation',
    name: 'Testing claims in digital media',
    description: 'Recognize media out of context, manipulated media, accurate but misleading headlines, impostor sources and satire taken as news, and choose the check that reveals each.',
    outcomes: ['12-E1'],
    lessonId: L3,
    format: 'mc',
    gen: misinformationQ,
  }),
];
