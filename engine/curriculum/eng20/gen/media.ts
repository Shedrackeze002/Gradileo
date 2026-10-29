/**
 * Grade 11 English, Unit 5: News and Media (11-E1). How news frames an event (selection, omission,
 * placement, word choice and images), comparing headlines, the techniques of documentary film, how
 * media represent people (stereotypes, missing voices), and digital media: recommendation algorithms,
 * echo chambers, sponsored content, clickbait, misinformation and checking a viral claim. Every news
 * story, outlet, headline, film, post, person and product is invented for Gradileo.
 */
import { fixedChoice, mc, part, skill } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { block, fill, pair, q } from '../../eng10/gen/common.ts';

// ============================================================================ lesson 5.1: framing

type Frame = 'selection' | 'omission' | 'placement' | 'wording' | 'image';
const FRAMES: Frame[] = ['selection', 'omission', 'placement', 'wording', 'image'];
const FRAME_NAME: Record<Frame, string> = {
  selection: 'Selection of sources',
  omission: 'Omission',
  placement: 'Placement (what comes first and what is buried)',
  wording: 'Word choice',
  image: 'Choice of image',
};
const FRAME_WHAT: Record<Frame, string> = {
  selection: 'selection is the choice of which people, quotations and voices to include',
  omission: 'omission leaves out relevant facts that would change the reader’s picture',
  placement: 'placement puts some facts first, where readers notice them, and buries others near the end',
  wording: 'word choice uses neutral or loaded words to describe the same thing',
  image: 'the choice of image decides what readers see first, and how they feel about it',
};
/** Techniques that overlap, so they are never offered against each other. */
const FRAME_CLASH: Partial<Record<Frame, Frame[]>> = {
  selection: ['omission', 'image'],
  omission: ['selection'],
  image: ['selection'],
};
const FRAME_EXAMPLES: Record<Frame, string[]> = {
  selection: [
    'A report on the new housing estate interviews only residents who have just moved in and love their new homes.',
    'A report on a protest quotes the one protester who shouted insults, although dozens of others spoke calmly to reporters.',
    'A story about a strike at a factory quotes four of the company’s managers and none of the workers.',
  ],
  omission: [
    'A report says the factory “created 300 jobs” but does not mention that the same company closed another factory with 500 jobs that week.',
    'A report on a new medicine describes its benefits but leaves out the serious side effects found in its trial.',
    'A story on rising crime gives this year’s figures but leaves out that they are lower than they were ten years ago.',
  ],
  placement: [
    'A report on the council meeting opens with a councillor tripping over a cable and mentions the new hospital funding only in its last paragraph.',
    'A story leads with the one injury at the city marathon, and reports in its final line that 20,000 runners finished safely.',
    'A report on a protest explains the protesters’ cause only in its twelfth paragraph, after eleven paragraphs about traffic delays.',
  ],
  wording: [
    'One newspaper says the workers “walked out”; another says they “abandoned their posts”.',
    'One report calls the new charge a “road fee”; another calls it a “cash grab”.',
    'One report describes the crowd as “passionate supporters”; another describes the same crowd as “a rowdy mob”.',
  ],
  image: [
    'A story about a politician’s careful speech is printed with a photo of her mid-sneeze, mouth wide open.',
    'A report on a flood shows a smiling family being rescued by boat, rather than the damaged homes.',
    'A report on the new school building is illustrated with a close-up of the one cracked window.',
  ],
};

interface NewsEvent {
  facts: string[];
  report: string;
  /** Facts the report leaves out (each must also be in `facts`). */
  left: string[];
  /** One loaded word or phrase in the report, and three neutral ones from it. */
  loaded: string;
  neutral: [string, string, string];
  loadedWhy: string;
  /** The impression the report leaves, the opposite one that the full facts would support, and one it does not suggest at all. */
  slant: string;
  opposite: string;
  off: string;
}
const NEWS: NewsEvent[] = [
  {
    facts: ['Bus fares will rise by 20% in March.', 'The money will pay for forty new electric buses.', 'Fares have not risen for eight years.', 'Students and pensioners will still travel free.', 'Some passengers say they will drive instead.'],
    report: 'Bus passengers face a 20% fare hike in March, and some are already vowing to abandon the buses for their cars. Officials say the money will pay for forty new electric buses.',
    left: ['Fares have not risen for eight years.', 'Students and pensioners will still travel free.'],
    loaded: '“hike”',
    neutral: ['“March”', '“officials”', '“electric”'],
    loadedWhy: '“Hike” makes the rise sound sudden and steep; “rise” or “increase” would be neutral.',
    slant: 'That the fare rise is a steep blow to every passenger.',
    opposite: 'That the rise is overdue, and students and pensioners are protected from it.',
    off: 'That the buses will stop running in March.',
  },
  {
    facts: ['The council approved 400 new homes on farmland.', 'A quarter of the homes will be sold below the market price.', 'The farm’s owner chose to sell the land.', 'Some neighbours fear more traffic.', 'The town has a waiting list of 900 families for housing.'],
    report: 'Councillors last night handed 400 homes’ worth of farmland to developers, despite neighbours’ fears of traffic chaos. A quarter of the homes will be sold below the market price.',
    left: ['The farm’s owner chose to sell the land.', 'The town has a waiting list of 900 families for housing.'],
    loaded: '“traffic chaos”',
    neutral: ['“last night”', '“a quarter”', '“the market price”'],
    loadedWhy: '“Chaos” turns a worry about more cars into a picture of disaster.',
    slant: 'That the council carelessly handed farmland to developers.',
    opposite: 'That the council is meeting an urgent need for homes.',
    off: 'That the homes have already been built.',
  },
  {
    facts: ['Students marched to city hall on Saturday.', 'About 3,000 students took part.', 'They want the city to keep three school bus routes.', 'The march was peaceful.', 'One shop window was broken near the end of the route.', 'The city says the routes cost more than they earn.'],
    report: 'A shop window was smashed on Saturday as students marched on city hall to keep three school bus routes. The city says the routes cost more than they earn.',
    left: ['About 3,000 students took part.', 'The march was peaceful.'],
    loaded: '“smashed”',
    neutral: ['“Saturday”', '“routes”', '“city hall”'],
    loadedWhy: '“Smashed” is violent and dramatic; “broken” would report the same damage neutrally.',
    slant: 'That the march was small and destructive.',
    opposite: 'That the march was large and peaceful.',
    off: 'That the bus routes have already been saved.',
  },
  {
    facts: ['The new phone’s battery lasts about one day.', 'Its camera won an award from a photography magazine.', 'It costs 30% more than last year’s model.', 'Its screen is easier to read in sunlight.', 'Two reviewers found that it overheated during games.'],
    report: 'The new phone boasts an award-winning camera and a screen you can finally read in sunlight. Its battery lasts about a day.',
    left: ['It costs 30% more than last year’s model.', 'Two reviewers found that it overheated during games.'],
    loaded: '“boasts”',
    neutral: ['“camera”', '“screen”', '“a day”'],
    loadedWhy: '“Boasts” presents the features as proud achievements, nudging readers to admire the phone.',
    slant: 'That the phone is an impressive buy with no real drawbacks.',
    opposite: 'That the phone is expensive and may overheat.',
    off: 'That the phone has not yet been released.',
  },
  {
    facts: ['The town’s only swimming pool will close for two years for repairs.', 'The roof was found to be unsafe.', 'A temporary pool will open at the sports centre in May.', 'Swimming clubs will have fewer hours each week.', 'The repairs will cost the town about twice the pool’s yearly budget.'],
    report: 'Swimmers are reeling after the town shut its only pool for two years. Clubs will lose hours every week, and the repairs will swallow twice the pool’s yearly budget.',
    left: ['The roof was found to be unsafe.', 'A temporary pool will open at the sports centre in May.'],
    loaded: '“reeling”',
    neutral: ['“two years”', '“clubs”', '“every week”'],
    loadedWhy: '“Reeling” suggests swimmers are in shock, adding emotion the facts do not report.',
    slant: 'That the closure is a needless blow, with nothing to replace the pool.',
    opposite: 'That the closure is needed for safety, and a temporary pool is on the way.',
    off: 'That the pool will never reopen.',
  },
];

function framingQ(rng: Rng, d: Difficulty) {
  if (d === 1) {
    const kind = rng.pick(FRAMES);
    const options = FRAMES.filter((f) => f !== kind && !(FRAME_CLASH[kind] ?? []).includes(f));
    return {
      prompt: `${rng.pick(FRAME_EXAMPLES[kind])}\n\nWhich framing technique does this show most clearly?`,
      parts: [part(mc(rng, FRAME_NAME[kind], rng.shuffle(options).slice(0, 3).map((f) => FRAME_NAME[f])))],
      hints: ['Ask what the reporter has chosen: whom to quote, what to leave out, what to put first, which words to use, or which picture to print?'],
      solution: [`This shows ${FRAME_NAME[kind].toLowerCase()}: ${FRAME_WHAT[kind]}.`],
    };
  }
  const e = rng.pick(NEWS);
  const facts = e.facts.map((f) => `- ${f}`).join('\n');
  if (d === 2 && rng.chance(0.5)) {
    return {
      prompt: `A news report says:\n\n${block(e.report)}\n\nWhich word or phrase in the report is the most **loaded**?`,
      parts: [part(mc(rng, e.loaded, e.neutral))],
      hints: ['A loaded word carries strong feelings or a judgment. Ask which word could be swapped for a plainer one without changing the facts.'],
      solution: [e.loadedWhy],
    };
  }
  if (d === 3 && rng.chance(0.5)) {
    return {
      prompt: `The facts of a story:\n\n${facts}\n\nA news report says:\n\n${block(e.report)}\n\nCompared with the full facts, what impression does the report create?`,
      parts: [part(mc(rng, e.slant, [e.opposite, e.off, 'A balanced picture that includes every important fact.']))],
      hints: ['Notice which facts the report puts first, which it leaves out, and which words it chooses. Together they push readers toward one view.'],
      solution: [`The report leaves out ${e.left.map((f) => q(f)).join(' and ')}, and uses loaded language such as ${e.loaded}.`, `So it suggests: ${e.slant.charAt(0).toLowerCase()}${e.slant.slice(1)}`],
    };
  }
  const omitted = rng.pick(e.left);
  const included = e.facts.filter((f) => !e.left.includes(f));
  return {
    prompt: `The facts of a story:\n\n${facts}\n\nA news report says:\n\n${block(e.report)}\n\nWhich fact has the report **left out**?`,
    parts: [part(mc(rng, omitted, included))],
    hints: ['Check each fact against the report. Omitting a fact can change readers’ picture of an event as much as stating a false one.'],
    solution: [`The report never mentions that ${omitted.charAt(0).toLowerCase()}${omitted.slice(1, -1)}.`, d === 3 ? 'Leaving it out makes the story look more one-sided than the facts are.' : 'Every other fact appears in the report.'],
  };
}

// ============================================================================ lesson 5.1: headlines

interface Headlines {
  event: string;
  /** Who or what the headlines judge. */
  subject: string;
  neutral: string;
  favourable: string;
  hostile: string;
  favourableEffect: string;
  hostileEffect: string;
}
const HEADLINES: Headlines[] = [
  {
    event: 'Hospital cleaners and porters stopped work for one day in a dispute over pay.',
    subject: 'the hospital workers',
    neutral: 'Hospital Workers Strike for One Day Over Pay',
    favourable: 'Exhausted Hospital Staff Forced to Strike After Years of Pay Freezes',
    hostile: 'Striking Staff Abandon Patients in Pay Grab',
    favourableEffect: 'The workers are overworked and have been pushed into striking.',
    hostileEffect: 'The workers are greedy and have put patients at risk.',
  },
  {
    event: 'The council approved 400 new homes on farmland north of the town.',
    subject: 'the housing plan',
    neutral: 'Council Approves 400 Homes on Farmland North of Town',
    favourable: 'Council Opens the Door to 400 Homes for Young Families',
    hostile: 'Council Bulldozes Farmland for Housing Sprawl',
    favourableEffect: 'The plan is a welcome chance for families to find a home.',
    hostileEffect: 'The plan destroys the countryside for ugly, careless building.',
  },
  {
    event: 'Students protested outside city hall against cuts to school bus routes.',
    subject: 'the students',
    neutral: 'Students Protest Outside City Hall Over Bus Cuts',
    favourable: 'Students Fight to Save the Buses They Rely On',
    hostile: 'Students Skip Class to Block City Hall',
    favourableEffect: 'The students are standing up for something they genuinely need.',
    hostileEffect: 'The students are truants causing a nuisance.',
  },
  {
    event: 'Riverside FC lost the cup final 2–1.',
    subject: 'Riverside FC',
    neutral: 'Riverside FC Loses Cup Final 2–1',
    favourable: 'Brave Riverside Fall Just Short in Cup Final',
    hostile: 'Riverside Crumble Again in Cup Final Flop',
    favourableEffect: 'The team played with courage and nearly won.',
    hostileEffect: 'The team failed under pressure, as usual.',
  },
  {
    event: 'The mayor raised property tax by 3% to pay for park improvements.',
    subject: 'the mayor’s decision',
    neutral: 'Mayor Raises Property Tax 3% to Fund Parks',
    favourable: 'Mayor Invests in Greener Parks for Every Neighbourhood',
    hostile: 'Mayor Hits Homeowners With Tax Hike',
    favourableEffect: 'The mayor is improving every neighbourhood.',
    hostileEffect: 'The mayor is attacking homeowners’ wallets.',
  },
  {
    event: 'Valley Textiles will close its mill, ending 200 jobs.',
    subject: 'the mill’s owners',
    neutral: 'Valley Textiles to Close Mill, Ending 200 Jobs',
    favourable: 'Valley Textiles Streamlines to Secure Its Future',
    hostile: 'Valley Textiles Throws 200 Workers on the Scrapheap',
    favourableEffect: 'The company is making a sensible business decision.',
    hostileEffect: 'The company is treating its workers as rubbish.',
  },
];

function headlineQ(rng: Rng, d: Difficulty) {
  const h = rng.pick(HEADLINES);
  const three = [h.neutral, h.favourable, h.hostile];
  const listed = rng.shuffle(three);
  const shown = listed.map((x) => `- *${x}*`).join('\n');
  if (d === 3) {
    const which = rng.pick(['favourable', 'hostile'] as const);
    const right = which === 'favourable' ? h.favourableEffect : h.hostileEffect;
    const opposite = which === 'favourable' ? h.hostileEffect : h.favourableEffect;
    return {
      prompt: `${h.event} One newspaper’s headline reads:\n\n${block(`*${h[which]}*`)}\n\nWhat impression of ${h.subject} does this headline create?`,
      parts: [part(mc(rng, right, [opposite, 'It reports the facts without judging anyone.', 'It suggests the event did not really happen.']))],
      hints: ['Look at the verbs and adjectives: which words judge, rather than simply report?'],
      solution: [`The headline’s loaded words suggest: ${right.charAt(0).toLowerCase()}${right.slice(1)}`, `A neutral version would be: *${h.neutral}*`],
    };
  }
  if (d === 2) {
    const which = rng.pick(['favourable', 'hostile'] as const);
    return {
      prompt: `${h.event} Three newspapers report it with these headlines:\n\n${shown}\n\nWhich headline presents ${h.subject} **most ${which === 'favourable' ? 'favourably' : 'unfavourably'}**?`,
      parts: [part(fixedChoice(listed.map((x) => `*${x}*`), listed.indexOf(h[which])))],
      hints: ['Compare the words each headline uses for the same event. Which ones praise, excuse or sympathize, and which ones blame or mock?'],
      solution: [`*${h[which]}* uses loaded words that make readers think: ${(which === 'favourable' ? h.favourableEffect : h.hostileEffect).charAt(0).toLowerCase()}${(which === 'favourable' ? h.favourableEffect : h.hostileEffect).slice(1)}`],
    };
  }
  return {
    prompt: `${h.event} Three newspapers report it with these headlines:\n\n${shown}\n\nWhich headline is the most **neutral**?`,
    parts: [part(fixedChoice(listed.map((x) => `*${x}*`), listed.indexOf(h.neutral)))],
    hints: ['A neutral headline states what happened in plain words, without praising or blaming anyone.'],
    solution: [`*${h.neutral}* states the facts in plain words; the other two use loaded language to push readers one way or the other.`],
  };
}

// ============================================================================ lesson 5.2: documentary

type DocTechnique = 'interview' | 'voiceover' | 'archival' | 'reconstruction' | 'music' | 'editing';
const DOC_TECHNIQUES: DocTechnique[] = ['interview', 'voiceover', 'archival', 'reconstruction', 'music', 'editing'];
const DOC_NAME: Record<DocTechnique, string> = {
  interview: 'Expert interview',
  voiceover: 'Voice-over narration',
  archival: 'Archival footage',
  reconstruction: 'Reconstruction (re-enactment)',
  music: 'Music',
  editing: 'Editing (juxtaposition)',
};
const DOC_WHAT: Record<DocTechnique, string> = {
  interview: 'an expert interview lets someone with special knowledge speak to the camera, lending the film authority',
  voiceover: 'voice-over narration is an unseen voice that explains the images and tells viewers how to understand them',
  archival: 'archival footage is real film or photographs from the past',
  reconstruction: 'a reconstruction uses actors to show an event that no camera recorded',
  music: 'music, added to the soundtrack, tells viewers how to feel about what they see',
  editing: 'editing places shots side by side, so that viewers connect them',
};
interface DocExample {
  text: string;
  technique: DocTechnique;
  effect: string;
  wrongEffects: [string, string];
}
const DOC_EXAMPLES: DocExample[] = [
  { text: 'A professor of ocean science speaks to the camera, explaining how plastic breaks down in sea water.', technique: 'interview', effect: 'It gives the film’s claims the authority of an expert.', wrongEffects: ['It shows an event that no camera recorded.', 'It makes the film feel like a comedy.'] },
  { text: 'A retired firefighter describes, in his own words, the night the old mill burned.', technique: 'interview', effect: 'It lets viewers hear from someone who knows the subject first-hand, which makes the account more believable.', wrongEffects: ['It shows real footage of the fire from the night itself.', 'It hides who is speaking.'] },
  { text: 'An unseen narrator says, over shots of an empty factory: “Here, a whole town once made its living.”', technique: 'voiceover', effect: 'It tells viewers how to understand the images, guiding their interpretation.', wrongEffects: ['It shows viewers the factory as it was fifty years ago.', 'It lets the factory workers speak for themselves.'] },
  { text: 'Over pictures of a forest, a calm voice explains that the trees are older than the town beside them.', technique: 'voiceover', effect: 'It shapes what viewers notice and what they conclude about the images.', wrongEffects: ['It proves the narrator is a scientist.', 'It shows an event that happened in the past.'] },
  { text: 'Grainy black-and-white film shows crowds lining the harbour as the town’s first ship was launched in 1920.', technique: 'archival', effect: 'It lets viewers see the past for themselves, which makes the history feel real and true.', wrongEffects: ['It uses actors to imagine the scene.', 'It shows what the harbour looks like today.'] },
  { text: 'Old photographs from a family album show the river before the dam was built.', technique: 'archival', effect: 'It shows real evidence of how things used to be.', wrongEffects: ['It invents a scene that no one recorded.', 'It explains the photographs with expert opinion.'] },
  { text: 'Actors in period costume show a secret meeting in 1848 that no one filmed.', technique: 'reconstruction', effect: 'It lets viewers picture an event that was never recorded, though the details are the film-makers’ choices.', wrongEffects: ['It shows real film of the meeting.', 'It lets a historian explain the meeting.'] },
  { text: 'A dimly lit scene, played by actors, shows how the bank robbery might have happened, step by step.', technique: 'reconstruction', effect: 'It makes the unseen event vivid and dramatic, even though it is imagined.', wrongEffects: ['It proves exactly what happened, as security footage would.', 'It gives the robbers a chance to speak for themselves.'] },
  { text: 'Low, slow strings play under shots of an empty playground at dusk.', technique: 'music', effect: 'It makes viewers feel sad and uneasy about what they are seeing.', wrongEffects: ['It gives viewers facts about the playground.', 'It shows the playground as it was in the past.'] },
  { text: 'Fast, cheerful drums play over shots of volunteers planting trees.', technique: 'music', effect: 'It makes the volunteers’ work feel lively, hopeful and exciting.', wrongEffects: ['It proves the trees will survive.', 'It lets the volunteers explain their work.'] },
  { text: 'A shot of a company boss smiling at a party is followed immediately by a shot of the polluted river beside his factory.', technique: 'editing', effect: 'It invites viewers to connect the boss’s wealth with the pollution, without saying so.', wrongEffects: ['It shows real film from the past.', 'It lets an expert explain the pollution.'] },
  { text: 'Shots of children walking miles to fetch water are placed straight after shots of a lawn being watered in the rain.', technique: 'editing', effect: 'It makes viewers compare the two and feel the unfairness.', wrongEffects: ['It explains how water is pumped.', 'It lets the children speak to the camera.'] },
];
const DOC_PURPOSES: Array<{ purpose: string; technique: DocTechnique }> = [
  { purpose: 'show viewers what the town actually looked like before the factory closed', technique: 'archival' },
  { purpose: 'let viewers hear from someone with special knowledge of the subject', technique: 'interview' },
  { purpose: 'show an event from 1890 that no camera recorded', technique: 'reconstruction' },
  { purpose: 'tell viewers how to interpret the images they are watching', technique: 'voiceover' },
  { purpose: 'make a quiet scene feel tense and threatening without changing the pictures', technique: 'music' },
  { purpose: 'suggest a link between two things by placing them side by side', technique: 'editing' },
];

function documentaryQ(rng: Rng, d: Difficulty) {
  if (d === 3) {
    const p = rng.pick(DOC_PURPOSES);
    const wrong = rng.sample(DOC_TECHNIQUES.filter((t) => t !== p.technique), 3);
    return {
      prompt: `A documentary maker wants to **${p.purpose}**. Which technique would work best?`,
      parts: [part(mc(rng, DOC_NAME[p.technique], wrong.map((t) => DOC_NAME[t])))],
      hints: ['Think about what each technique does: who speaks, what is shown, and how the viewer is guided.'],
      solution: [`${DOC_NAME[p.technique]}: ${DOC_WHAT[p.technique]}.`],
    };
  }
  const e = rng.pick(DOC_EXAMPLES);
  if (d === 2) {
    const other = rng.pick(DOC_EXAMPLES.filter((x) => x.technique !== e.technique));
    return {
      prompt: `In a documentary:\n\n${block(e.text)}\n\nWhat is the most likely **effect** on viewers?`,
      parts: [part(mc(rng, e.effect, [...e.wrongEffects, other.effect]))],
      hints: ['Name the technique first, then ask what it does to the viewer.'],
      solution: [`This is ${DOC_NAME[e.technique].toLowerCase()}: ${DOC_WHAT[e.technique]}.`, `So: ${e.effect.charAt(0).toLowerCase()}${e.effect.slice(1)}`],
    };
  }
  const wrong = rng.sample(DOC_TECHNIQUES.filter((t) => t !== e.technique), 3);
  return {
    prompt: `In a documentary:\n\n${block(e.text)}\n\nWhich technique is this?`,
    parts: [part(mc(rng, DOC_NAME[e.technique], wrong.map((t) => DOC_NAME[t])))],
    hints: ['Ask who is speaking (an expert on screen, or an unseen narrator), whether the images are real or acted, and what has been added in editing.'],
    solution: [`This is ${DOC_NAME[e.technique].toLowerCase()}: ${DOC_WHAT[e.technique]}.`],
  };
}

// ============================================================================ lesson 5.3: representation

interface Portrayal {
  text: string;
  stereotype: string;
  better: string;
}
const PORTRAYALS: Portrayal[] = [
  { text: 'In a phone advert, a grandmother holds the phone upside down and has to be rescued by her grandson.', stereotype: 'Older people cannot cope with technology.', better: 'Show the grandmother using the phone confidently, as many older people do.' },
  { text: 'In a television comedy, every teenager is shown slumped on a sofa, ignoring adults and never doing homework.', stereotype: 'Teenagers are lazy and rude.', better: 'Show teenagers with a range of interests, jobs and responsibilities.' },
  { text: 'In a cleaning-product advert, only mothers ever clean the house, while fathers relax on the sofa.', stereotype: 'Housework is women’s work.', better: 'Show the whole family sharing the housework.' },
  { text: 'In a film, the only scientist is an awkward man in a lab coat who cannot hold a normal conversation.', stereotype: 'Scientists are awkward and isolated.', better: 'Show scientists of different kinds, working and talking with other people.' },
  { text: 'In a cartoon, the only character from the countryside is slow-witted and easily fooled.', stereotype: 'Country people are less clever than city people.', better: 'Give the country character the same intelligence and range as the city characters.' },
  { text: 'In a toy catalogue, every engineering kit shows a boy, and every craft kit shows a girl.', stereotype: 'Building and engineering are for boys.', better: 'Show girls and boys alike with every kind of kit.' },
  { text: 'In a hospital drama, every nurse is a woman and every surgeon is a man.', stereotype: 'Men are surgeons and women are nurses.', better: 'Cast women and men in both roles.' },
];
const WEAK_FIXES = [
  'Make the stereotype even stronger, so that the joke is funnier.',
  'Add a small caption saying that it is only a joke.',
  'Give the character fewer lines, so that viewers notice them less.',
];
interface Voices {
  text: string;
  quoted: [string, string, string];
  missing: string;
}
const VOICES: Voices[] = [
  { text: 'A report on a plan to close a youth centre quotes the mayor, a councillor and a local business owner.', quoted: ['The mayor', 'A councillor', 'A local business owner'], missing: 'The young people who use the centre' },
  { text: 'A report on a new policy to cut hospital waiting times quotes the health minister, the hospital’s director and an economist.', quoted: ['The health minister', 'The hospital’s director', 'An economist'], missing: 'Patients waiting for treatment' },
  { text: 'A report on a strike by bus drivers quotes the bus company’s chief executive, a city councillor and two passengers.', quoted: ['The bus company’s chief executive', 'A city councillor', 'Passengers'], missing: 'The bus drivers who are on strike' },
  { text: 'A documentary about a logging project in a rainforest interviews the logging company, a government official and a timber buyer.', quoted: ['The logging company', 'A government official', 'A timber buyer'], missing: 'The people who live in the rainforest' },
  { text: 'A school newsletter article about a new uniform rule quotes the principal, the head of the parents’ association and the uniform supplier.', quoted: ['The principal', 'The head of the parents’ association', 'The uniform supplier'], missing: 'The students who must wear the uniform' },
];

function representationQ(rng: Rng, d: Difficulty) {
  if (d === 2) {
    const v = rng.pick(VOICES);
    return {
      prompt: `${v.text}\n\nWhose voice is **missing** from this report?`,
      parts: [part(mc(rng, v.missing, v.quoted))],
      hints: ['Ask who is most affected by the story, and check whether they are given a chance to speak.'],
      solution: [`${v.missing} are the people most affected, yet none of them is quoted.`, 'Leaving them out means readers hear only the views of people with power over the decision.'],
    };
  }
  const p = rng.pick(PORTRAYALS);
  if (d === 3) {
    return {
      prompt: `${p.text}\n\nWhich change would most improve how this portrayal represents people?`,
      parts: [part(mc(rng, p.better, WEAK_FIXES))],
      hints: ['A stereotype shrinks a whole group to one trait. A better portrayal shows the variety of real people.'],
      solution: [`${q(p.better)} replaces the stereotype with a more realistic picture.`, 'The other changes keep the stereotype, or only hide it.'],
    };
  }
  const wrong = rng.sample(PORTRAYALS.filter((x) => x !== p), 3).map((x) => x.stereotype);
  return {
    prompt: `${p.text}\n\nWhich stereotype does this portrayal rely on?`,
    parts: [part(mc(rng, p.stereotype, wrong))],
    hints: ['A stereotype is an oversimplified idea that a whole group of people are all the same. Ask what the portrayal assumes about the group.'],
    solution: [`The portrayal assumes: ${p.stereotype.charAt(0).toLowerCase()}${p.stereotype.slice(1)}`],
  };
}

// ============================================================================ lesson 5.3: digital media

type Digital = 'algorithm' | 'echo' | 'sponsored' | 'clickbait' | 'misinformation';
const DIGITALS: Digital[] = ['algorithm', 'echo', 'sponsored', 'clickbait', 'misinformation'];
const DIGITAL_NAME: Record<Digital, string> = {
  algorithm: 'Algorithmic recommendation',
  echo: 'An echo chamber',
  sponsored: 'Sponsored content',
  clickbait: 'Clickbait',
  misinformation: 'Misinformation',
};
const DIGITAL_WHAT: Record<Digital, string> = {
  algorithm: 'a recommendation algorithm chooses what to show you next from what you have already watched, clicked or bought',
  echo: 'an echo chamber is a group or space where people hear only views that match their own, because other views are pushed out',
  sponsored: 'sponsored content is paid promotion made to look like ordinary posts or articles',
  clickbait: 'clickbait is a headline or title that exaggerates or teases to get clicks, then fails to deliver',
  misinformation: 'misinformation is false information that spreads, often because it is shocking or because people share it without checking',
};
const DIGITAL_CLASH: Partial<Record<Digital, Digital[]>> = {
  algorithm: ['echo'],
  echo: ['algorithm'],
  clickbait: ['misinformation'],
  misinformation: ['clickbait'],
};
const DIGITAL_EXAMPLES: Record<Digital, string[]> = {
  algorithm: [
    'After NAME watches two videos about skateboard tricks, {his} video app fills {his} home screen with skateboarding videos.',
    'A music app starts suggesting jazz after NAME plays three jazz albums.',
    'An online shop shows NAME tents and sleeping bags the day after {he} looked at a camping stove.',
  ],
  echo: [
    'In an online group, members who question the group’s favourite theory are mocked and removed, so everyone left agrees.',
    'NAME follows only accounts that share {his} views on every issue, and {he} is amazed to learn that most people voted the other way.',
    'A forum about a diet deletes every post that mentions research against the diet, so members see nothing but praise for it.',
  ],
  sponsored: [
    'A fitness influencer praises a protein bar in a video without saying that the company paid for the post.',
    'An article titled “The 10 Best Headphones” on a news site was written by a headphone company and is labelled “Paid partnership” in small grey letters.',
    'A travel blogger’s glowing review of a hotel was paid for with a free week’s stay, which the review does not mention.',
  ],
  clickbait: [
    'A headline reads “You Won’t BELIEVE What This Teacher Found in Her Classroom!”, and the article reveals that it was a lost pencil case.',
    'A video titled “Scientists SHOCKED by New Discovery!” turns out to be about a potato that is slightly larger than usual.',
    'A post promising “This ONE Trick Will Change Your Life Forever” is a list of reminders to drink water.',
  ],
  misinformation: [
    'A photo shared thousands of times as showing this week’s flood was actually taken in another country five years ago.',
    'A post falsely claims that a popular singer has died, and it spreads widely before the singer posts a video from home.',
    'A message forwarded across the city claims that the tap water has been poisoned, although the water authority’s tests show it is safe.',
  ],
};
const CHECKS: Array<{ claim: string }> = [
  { claim: 'A viral post claims that the city will ban all cars from the centre next month.' },
  { claim: 'A widely shared video claims that a common painkiller has been withdrawn because it is dangerous.' },
  { claim: 'A post shared by thousands of people says that the national exams have been cancelled this year.' },
  { claim: 'A screenshot going round your school claims that a famous author has announced she will visit next week.' },
];
const CHECK_RIGHT = 'Leave the post and search what trusted news sources, official websites and fact-checkers say about the claim, and who posted it.';
const CHECK_WRONG = [
  'Read the post several more times to judge whether it sounds convincing.',
  'Check how many likes and shares the post has.',
  'Share the post with a warning, so that friends can decide for themselves.',
  'Look at the comments under the post to see whether people agree.',
];
const DISCLOSURE: Array<{ brand: string; product: string }> = [
  { brand: 'Brightsmile', product: 'toothpaste' },
  { brand: 'TrailFox', product: 'hiking boots' },
  { brand: 'Glow&Go', product: 'face cream' },
  { brand: 'Peakfit', product: 'running watch' },
];

function digitalQ(rng: Rng, d: Difficulty) {
  const cast = pair(rng);
  if (d === 3) {
    if (rng.chance(0.5)) {
      const c = rng.pick(CHECKS);
      return {
        prompt: `${c.claim} Before you believe it or share it, what is the **best first step** to check it?`,
        parts: [part(mc(rng, CHECK_RIGHT, rng.sample(CHECK_WRONG, 3)))],
        hints: ['Fact-checkers read “laterally”: instead of studying the post itself, they open other tabs to see what reliable sources say about it.'],
        solution: ['Checking what trusted sources and fact-checkers say, and who is behind the post, is called lateral reading: it is the quickest reliable way to test a claim.', 'Likes, shares and comments show only that a post is popular, not that it is true.'],
      };
    }
    const b = rng.pick(DISCLOSURE);
    const right = `Ad: ${b.brand} paid me to try their ${b.product}. Here’s what I honestly thought after a month.`;
    return {
      prompt: `An influencer has been paid by ${b.brand} to post about its ${b.product}. Which post **clearly discloses** that it is paid?`,
      parts: [part(mc(rng, right, [
        `Loving my new ${b.brand} ${b.product}! Best thing I’ve bought all year!`,
        `Loving my new ${b.brand} ${b.product}! #blessed #happy #newfavourite`,
        `Loving my new ${b.brand} ${b.product}! (My partnerships are listed in a link on my profile page.)`,
      ]))],
      hints: ['A clear disclosure appears in the post itself, at the start, in plain words that every viewer will see.'],
      solution: [`${q(right)} says plainly, at the start, that the post was paid for.`, 'The others hide the payment, or tuck it away where most viewers will never look.'],
    };
  }
  const kind = rng.pick(DIGITALS);
  const options = DIGITALS.filter((k) => k !== kind && !(DIGITAL_CLASH[kind] ?? []).includes(k));
  return {
    prompt: `${fill(rng.pick(DIGITAL_EXAMPLES[kind]), cast)}\n\nWhat is this an example of?`,
    parts: [part(mc(rng, DIGITAL_NAME[kind], rng.shuffle(options).slice(0, d === 1 ? 2 : 3).map((k) => DIGITAL_NAME[k])))],
    hints: ['Ask what is happening: is a program choosing what you see, is a group shutting out other views, is someone paid to promote, is a headline teasing for clicks, or is something false spreading?'],
    solution: [`This is ${DIGITAL_NAME[kind].charAt(0).toLowerCase()}${DIGITAL_NAME[kind].slice(1)}: ${DIGITAL_WHAT[kind]}.`],
  };
}

const L1 = 'e11-5-1';
const L2 = 'e11-5-2';
const L3 = 'e11-5-3';

export const MEDIA_SKILLS: SkillDef[] = [
  skill({
    id: 'e11-news-framing',
    name: 'Framing in the news',
    description: 'Recognize how selection, omission, placement, word choice and images frame a news story, find what a report leaves out, and spot loaded words.',
    outcomes: ['11-E1'],
    lessonId: L1,
    format: 'mc',
    gen: framingQ,
  }),
  skill({
    id: 'e11-headlines',
    name: 'Comparing headlines',
    description: 'Compare headlines on the same event: which is neutral, which favours or attacks its subject, and what impression each creates.',
    outcomes: ['11-E1'],
    lessonId: L1,
    format: 'mc',
    gen: headlineQ,
  }),
  skill({
    id: 'e11-documentary',
    name: 'Documentary techniques',
    description: 'Recognize expert interviews, voice-over narration, archival footage, reconstruction, music and editing in documentaries, their effects, and which suits a purpose.',
    outcomes: ['11-E1'],
    lessonId: L2,
    format: 'mc',
    gen: documentaryQ,
  }),
  skill({
    id: 'e11-representation',
    name: 'Representation and stereotypes',
    description: 'Recognize stereotypes in media portrayals, notice whose voices are missing from a story, and choose fairer representation.',
    outcomes: ['11-E1'],
    lessonId: L3,
    format: 'mc',
    gen: representationQ,
  }),
  skill({
    id: 'e11-digital-media',
    name: 'Digital media literacy',
    description: 'Recognize recommendation algorithms, echo chambers, sponsored content, clickbait and misinformation, spot proper disclosure, and check a viral claim by reading laterally.',
    outcomes: ['11-E1'],
    lessonId: L3,
    format: 'mc',
    gen: digitalQ,
  }),
];
