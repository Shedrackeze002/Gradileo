/**
 * Grade 10 English, lesson 7.5: Word Choice, Tone and Vocabulary in Context (10-G3). Commonly
 * confused words, connotation and register, and working out a word from context clues and word
 * parts. Words whose spelling differs between varieties of English are left out.
 */
import { mc, part, skill, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { block, cap, fill, people } from './common.ts';

const LESSON = 'e10-7-5';
const OUTCOMES = ['10-G3'];
const GAP = '\\_\\_\\_\\_\\_';

// ---------------------------------------------------------------------------- commonly confused words

/** What each word means or does, for the solutions. */
const MEANING: Record<string, string> = {
  their: '“their” means belonging to them',
  there: '“there” means in that place, or begins “there is” and “there are”',
  'they’re': '“they’re” is short for “they are”',
  its: '“its” means belonging to it (no apostrophe)',
  'it’s': '“it’s” is short for “it is” or “it has”',
  your: '“your” means belonging to you',
  'you’re': '“you’re” is short for “you are”',
  whose: '“whose” asks or tells who something belongs to',
  'who’s': '“who’s” is short for “who is” or “who has”',
  then: '“then” is about time: next, or at that time',
  than: '“than” is used in comparisons',
  affect: '“affect” is usually a verb: to have an influence on',
  effect: '“effect” is usually a noun: a result',
  accept: '“accept” is a verb: to receive or agree to',
  except: '“except” means not including',
  lose: '“lose” (one o) is a verb: to misplace or be beaten',
  loose: '“loose” (two o’s) is an adjective: not tight or not fixed',
  to: '“to” shows direction or begins a verb (to run)',
  too: '“too” means also, or more than enough',
  two: '“two” is the number 2',
  principal: '“principal” is the head of a school, or means main or most important',
  principle: '“principle” is a rule or belief',
  complement: '“complement” is something that completes or goes well with something else',
  compliment: '“compliment” is praise',
  fewer: '“fewer” is for things you can count',
  less: '“less” is for amounts you cannot count',
  advice: '“advice” is a noun: a suggestion',
  advise: '“advise” is a verb: to give a suggestion',
  weather: '“weather” is rain, sun, wind and so on',
  whether: '“whether” introduces a choice between possibilities',
  passed: '“passed” is a verb, the past of “pass”',
  past: '“past” means beyond, or an earlier time; it is never a verb',
  quiet: '“quiet” means making little noise',
  quite: '“quite” means fairly or completely',
  breath: '“breath” (no e) is a noun: the air you take in',
  breathe: '“breathe” (with an e) is the verb',
  desert: '“desert” (one s) is a dry place',
  dessert: '“dessert” (two s’s) is the sweet course of a meal',
  stationary: '“stationary” (with an a) means not moving',
  stationery: '“stationery” (with an e) is paper, envelopes and pens',
};

interface Gap {
  s: string;
  answer: string;
  set: string[];
}

const G = (s: string, answer: string, set: string[]): Gap => ({ s, answer, set });
const THEIR = ['their', 'there', 'they’re'];
const ITS = ['its', 'it’s'];
const YOUR = ['your', 'you’re'];
const WHOSE = ['whose', 'who’s'];
const THAN = ['then', 'than'];
const TO = ['to', 'too', 'two'];
const AFFECT = ['affect', 'effect'];
const ACCEPT = ['accept', 'except'];
const LOSE = ['lose', 'loose'];
const PASSED = ['passed', 'past'];
const QUIET = ['quiet', 'quite'];
const WEATHER = ['weather', 'whether'];
const BREATH = ['breath', 'breathe'];
const PRINCIPAL = ['principal', 'principle'];
const COMPLEMENT = ['complement', 'compliment'];
const FEWER = ['fewer', 'less'];
const ADVICE = ['advice', 'advise'];
const DESERT = ['desert', 'dessert'];
const STATIONARY = ['stationary', 'stationery'];

const GAPS: Record<Difficulty, Gap[]> = {
  1: [
    G('The students left ___ bags in the hall.', 'their', THEIR),
    G('Put the boxes over ___, next to the door.', 'there', THEIR),
    G('___ hoping to win the debate on Friday.', 'they’re', THEIR),
    G('NAME’s cousins said that ___ arriving on the late train.', 'they’re', THEIR),
    G('The cat licked ___ paw.', 'its', ITS),
    G('___ going to rain this afternoon.', 'it’s', ITS),
    G('The school is proud of ___ new science lab.', 'its', ITS),
    G('NAME says ___ been a long week.', 'it’s', ITS),
    G('Don’t forget ___ umbrella.', 'your', YOUR),
    G('___ welcome to join us for lunch.', 'you’re', YOUR),
    G('Tell me when ___ ready to leave.', 'you’re', YOUR),
    G('___ coat is this?', 'whose', WHOSE),
    G('___ coming to the match tomorrow?', 'who’s', WHOSE),
    G('NAME is the student ___ painting won the prize.', 'whose', WHOSE),
    G('NAME is taller ___ {his} older brother.', 'than', THAN),
    G('We ate dinner and ___ watched a film.', 'then', THAN),
    G('The test was easier ___ NAME expected.', 'than', THAN),
    G('NAME bought ___ tickets for the concert.', 'two', TO),
    G('The soup is ___ hot to eat.', 'too', TO),
    G('We walked ___ the park after lunch.', 'to', TO),
    G('NAME wants to come ___.', 'too', TO),
  ],
  2: [
    G('Lack of sleep can ___ your concentration.', 'affect', AFFECT),
    G('The new rule had a big ___ on the school.', 'effect', AFFECT),
    G('How will the storm ___ the flight times?', 'affect', AFFECT),
    G('The medicine took ___ within an hour.', 'effect', AFFECT),
    G('Everyone ___ NAME had finished the test.', 'except', ACCEPT),
    G('Please ___ this small gift.', 'accept', ACCEPT),
    G('The shop is open every day ___ Sunday.', 'except', ACCEPT),
    G('If you ___ your ticket, you cannot get in.', 'lose', LOSE),
    G('One of NAME’s teeth is ___.', 'loose', LOSE),
    G('NAME tied the rope tightly so that it would not come ___.', 'loose', LOSE),
    G('We drove ___ the old lighthouse.', 'past', PASSED),
    G('NAME ___ the ball to {his} teammate.', 'passed', PASSED),
    G('In the ___, people wrote letters by hand.', 'past', PASSED),
    G('Three weeks have ___ since the storm.', 'passed', PASSED),
    G('The library was ___ except for the ticking clock.', 'quiet', QUIET),
    G('The test was ___ difficult, but NAME finished it.', 'quite', QUIET),
    G('The ___ was perfect for a picnic.', 'weather', WEATHER),
    G('NAME could not decide ___ to buy the blue shoes or the black ones.', 'whether', WEATHER),
    G('Take a deep ___ before you start.', 'breath', BREATH),
    G('It was hard to ___ at the top of the mountain.', 'breathe', BREATH),
  ],
  3: [
    G('The ___ announced the new timetable at assembly.', 'principal', PRINCIPAL),
    G('Honesty is an important ___ in NAME’s family.', 'principle', PRINCIPAL),
    G('The ___ reason for the delay was the snow.', 'principal', PRINCIPAL),
    G('NAME paid the chef a ___ on the soup.', 'compliment', COMPLEMENT),
    G('The red scarf is a perfect ___ to the black coat.', 'complement', COMPLEMENT),
    G('NAME smiled at the ___ about {his} speech.', 'compliment', COMPLEMENT),
    G('There are ___ students in the class this year.', 'fewer', FEWER),
    G('NAME drinks ___ coffee than {he} used to.', 'less', FEWER),
    G('We had ___ rain this month than last month.', 'less', FEWER),
    G('The new bus route makes ___ stops.', 'fewer', FEWER),
    G('NAME’s aunt gave {him} good ___ about the interview.', 'advice', ADVICE),
    G('I ___ you to leave early to avoid the traffic.', 'advise', ADVICE),
    G('NAME asked the coach for ___.', 'advice', ADVICE),
    G('We had mango ice cream for ___.', 'dessert', DESERT),
    G('Very little rain falls in the ___.', 'desert', DESERT),
    G('The traffic was ___ for nearly an hour.', 'stationary', STATIONARY),
    G('NAME bought pens, envelopes and other ___.', 'stationery', STATIONARY),
  ],
};

function confusedWords(rng: Rng, d: Difficulty): GenOutput {
  const cast = people(rng, 2);
  const g = rng.pick(GAPS[d]);
  const sentence = fill(g.s, cast);
  const atStart = sentence.startsWith('___');
  const show = (w: string) => (atStart ? cap(w) : w);
  const filled = sentence.replace('___', `**${show(g.answer)}**`);
  return {
    prompt: `Choose the word that completes the sentence correctly.\n\n${block(sentence.replace('___', GAP))}`,
    parts: [part(mc(rng, show(g.answer), g.set.filter((w) => w !== g.answer).map(show)))],
    hints: ['Try each choice in the gap and ask what the sentence would then mean.', 'For words with an apostrophe, expand the contraction (they’re → they are) and see whether it still makes sense.'],
    solution: [`${cap(MEANING[g.answer])}. ${cap(g.set.filter((w) => w !== g.answer).map((w) => MEANING[w]).join('; '))}.`, `So the sentence is: ${filled}`],
  };
}

// ---------------------------------------------------------------------------- connotation and register

interface Shade {
  pos: string;
  neu?: string;
  neg: string;
  /** A sentence with a gap that any of the words could fill. */
  frame: string;
}

const SHADES: Shade[] = [
  { pos: 'slender', neu: 'thin', neg: 'scrawny', frame: 'The young dancer was ___.' },
  { pos: 'inquisitive', neu: 'curious', neg: 'nosy', frame: 'NAME’s cousin is very ___ about everyone’s plans.' },
  { pos: 'determined', neg: 'stubborn', frame: 'Once NAME has made a decision, {he} is ___ and will not change {his} mind.' },
  { pos: 'famous', neu: 'well-known', neg: 'notorious', frame: 'The chef is ___ across the country.' },
  { pos: 'vintage', neu: 'old', neg: 'outdated', frame: 'NAME wore a ___ jacket to the party.' },
  { pos: 'cautious', neg: 'cowardly', frame: 'NAME was ___ about crossing the old rope bridge.' },
  { pos: 'unique', neu: 'unusual', neg: 'weird', frame: 'The new house has a ___ design.' },
  { pos: 'fragrance', neu: 'smell', neg: 'stench', frame: 'A strong ___ drifted out of the kitchen.' },
  { pos: 'childlike', neg: 'childish', frame: 'NAME’s ___ excitement surprised the adults.' },
  { pos: 'assertive', neg: 'pushy', frame: 'The salesperson was ___.' },
  { pos: 'courageous', neu: 'bold', neg: 'reckless', frame: 'NAME’s decision to sail across the bay alone was ___.' },
  { pos: 'relaxed', neg: 'lazy', frame: 'On weekends, NAME is ___ and stays in bed until noon.' },
  { pos: 'confident', neg: 'arrogant', frame: 'The new captain seemed ___.' },
  { pos: 'thrifty', neg: 'stingy', frame: 'NAME is ___ and rarely spends money.' },
  { pos: 'chuckle', neu: 'laugh', neg: 'cackle', frame: 'NAME let out a ___ when {he} heard the news.' },
];

const REGISTER: Array<{ context: string; formal: string; informal: string[] }> = [
  { context: 'a letter from a school to parents', formal: 'We regret to inform you that the sports day has been postponed.', informal: ['Sorry, folks, but sports day’s been pushed back to some other day.', 'Bad news, guys: sports day is off for now, so hang tight.', 'Heads up, sports day got moved, so don’t bother showing up.'] },
  { context: 'a science report', formal: 'The results suggest that regular exercise improves concentration.', informal: ['The results kind of show that working out helps you focus a lot.', 'Basically, hitting the gym makes you way better at focusing.', 'Turns out exercise is seriously great for your brain and stuff.'] },
  { context: 'a job application', formal: 'I am writing to apply for the summer position at your library.', informal: ['Hey, I really want that summer job you’ve got at the library.', 'I’d totally love to grab the summer job at your library!', 'So I saw you guys need summer help at the library, and I’m in.'] },
  { context: 'a literary essay', formal: 'The author uses dark imagery to create a sense of dread.', informal: ['The author totally goes for creepy vibes with all the dark stuff.', 'The dark imagery is super scary and makes you freak out.', 'The author uses a ton of dark images to be creepy.'] },
  { context: 'an email to a teacher', formal: 'Could you please send me the reading list for next week?', informal: ['Send me next week’s reading list, okay? Thanks a bunch.', 'Can u send me the reading list for next week asap? Thx!', 'Gimme the reading list for next week when you get a sec.'] },
  { context: 'a newspaper report', formal: 'Many residents oppose the plan to close the park.', informal: ['Loads of people around here hate the plan to close the park.', 'Tons of locals are mad about the park closing.', 'People are really not into the park closing.'] },
  { context: 'a speech at a graduation ceremony', formal: 'Today we celebrate four years of hard work and friendship.', informal: ['So yeah, we made it through four years, which is pretty cool.', 'Four years of grinding, and we’re finally out of here!', 'Can you believe we actually survived this place?'] },
  { context: 'a complaint to a company', formal: 'The blender I purchased stopped working after two days.', informal: ['Your blender totally died on me after, like, two days of using it.', 'Ugh, the blender I got from you guys is already totally broken.', 'So the blender just quit on me after, like, two days. Seriously?'] },
];

function connotation(rng: Rng, d: Difficulty): GenOutput {
  const cast = people(rng, 2);
  const f = (s: string) => fill(s, cast);
  if (d === 3) {
    const r = rng.pick(REGISTER);
    return {
      prompt: `Which sentence is the most appropriate for ${r.context}?`,
      parts: [part(mc(rng, r.formal, r.informal))],
      hints: ['Formal writing avoids slang, chatty words and most contractions.', 'Think about who will read it and how serious the situation is.'],
      solution: [`“${r.formal}” uses a formal register: complete, precise wording with no slang.`, `The others use informal words or phrases (such as “${r.informal[0].split(' ').slice(0, 3).join(' ')}…”) that suit a conversation with friends, not ${r.context}.`],
    };
  }
  const sh = rng.pick(SHADES);
  const words = [sh.pos, ...(sh.neu ? [sh.neu] : []), sh.neg];
  if (d === 1) {
    const negative = rng.chance(0.5);
    const answer = negative ? sh.neg : sh.pos;
    return {
      prompt: `These words have similar dictionary meanings (denotations): ${words.map((w) => `**${w}**`).join(', ')}. Which one has the most ${negative ? 'negative' : 'positive'} connotation?`,
      parts: [part(mc(rng, answer, words.filter((w) => w !== answer)))],
      hints: ['Connotation is the feeling a word carries beyond its dictionary meaning.', `Imagine someone used each word to describe you. Which would you be ${negative ? 'least' : 'most'} happy to hear?`],
      solution: [`“${answer}” has the most ${negative ? 'negative' : 'positive'} connotation.`, `${cap(sh.pos)} sounds approving${sh.neu ? `, ${sh.neu} is neutral` : ''} and ${sh.neg} sounds disapproving, although the dictionary meanings are close.`],
    };
  }
  const admire = rng.chance(0.5);
  const answer = admire ? sh.pos : sh.neg;
  return {
    prompt: `A writer wants readers to ${admire ? 'think well of' : 'think badly of'} what is described. Which word best completes the sentence?\n\n${block(f(sh.frame).replace('___', GAP))}`,
    parts: [part(mc(rng, answer, words.filter((w) => w !== answer)))],
    hints: ['All the choices have a similar dictionary meaning; they differ in connotation.', `Choose the word whose feeling is ${admire ? 'approving' : 'disapproving'}.`],
    solution: [`“${answer}” has a ${admire ? 'positive' : 'negative'} connotation, so it ${admire ? 'makes readers approve' : 'makes readers disapprove'}.`, `So the sentence is: ${f(sh.frame).replace('___', `**${answer}**`)}`],
  };
}

// ---------------------------------------------------------------------------- context clues

type Clue = 'definition' | 'synonym' | 'antonym' | 'example' | 'inference';

interface Ctx {
  s: string;
  word: string;
  meaning: string;
  wrong: [string, string, string];
  clue: Clue;
}

const CLUE_HINT: Record<Clue, string> = {
  definition: 'Look for a phrase that explains the word, set off by commas or dashes or introduced by “or” or “which means”.',
  synonym: 'Look nearby for a word or phrase that means nearly the same thing.',
  antonym: 'Look for a word such as “but”, “unlike”, “instead of” or “although” that signals an opposite.',
  example: 'Look for examples introduced by “such as”, “including” or a colon.',
  inference: 'Use the rest of the sentence: what situation is described, and what would make sense?',
};

const CLUE_NAME: Record<Clue, string> = {
  definition: 'a definition clue',
  synonym: 'a synonym clue',
  antonym: 'an antonym (contrast) clue',
  example: 'an example clue',
  inference: 'an inference clue',
};

const C = (s: string, word: string, meaning: string, wrong: [string, string, string], clue: Clue): Ctx => ({ s, word, meaning, wrong, clue });

const CONTEXTS: Ctx[] = [
  C('The hikers reached the **summit**, the highest point of the mountain, just after noon.', 'summit', 'the top of a mountain', ['a narrow mountain valley', 'a stone shelter for hikers', 'the start of a hiking trail'], 'definition'),
  C('The doctor said the illness was **chronic**, which means it would last a long time.', 'chronic', 'lasting a long time', ['easy to cure', 'passed from person to person', 'very painful'], 'definition'),
  C('The island is home to many **endemic** species, plants and animals found nowhere else on Earth.', 'endemic', 'found only in one particular place', ['in danger of dying out completely', 'brought in from another country', 'much larger than usual for its kind'], 'definition'),
  C('An **anthology**, or collection of writings by different authors, sat on the teacher’s desk.', 'anthology', 'a collection of writings by different authors', ['a book that tells the story of one person’s life', 'a dictionary of rare and old-fashioned words', 'a book of maps of different countries'], 'definition'),
  C('NAME felt **apprehensive**, or uneasy about what might happen, before the interview.', 'apprehensive', 'worried about what might happen', ['excited and eager for it to start', 'too tired to think clearly', 'angry about having to wait so long'], 'definition'),
  C('The town built a **levee**, a high bank of earth that stops a river from flooding.', 'levee', 'a wall of earth that holds back a river', ['a bridge built across a wide river', 'a flat boat for crossing a river', 'a dam that makes electricity from a river'], 'definition'),
  C('The speech was **verbose**—full of unnecessary words—so the audience grew restless.', 'verbose', 'using more words than needed', ['spoken much too quickly to follow', 'too quiet for the audience to hear', 'full of jokes and funny stories'], 'definition'),
  C('NAME is a **novice**, a beginner who has only just started to learn chess.', 'novice', 'a beginner', ['a champion', 'a judge', 'a teacher'], 'definition'),
  C('The puppy was **lethargic**; it was sluggish and slept most of the day.', 'lethargic', 'lacking energy', ['playful', 'hungry', 'aggressive'], 'synonym'),
  C('After the match, the two captains had an **amicable** chat, as friendly as old classmates.', 'amicable', 'friendly', ['brief', 'angry', 'secret'], 'synonym'),
  C('NAME’s room was **immaculate**; everything was spotless and in its place.', 'immaculate', 'perfectly clean and tidy', ['crowded with furniture', 'dark and cold', 'recently painted'], 'synonym'),
  C('The instructions were **ambiguous**, so unclear that no one knew what to do.', 'ambiguous', 'unclear; open to more than one meaning', ['much too long and full of extra detail', 'cheerful and full of encouragement', 'strict and impossible to break'], 'synonym'),
  C('The old bridge was **precarious**: shaky and likely to collapse at any moment.', 'precarious', 'unsafe and unsteady', ['beautifully decorated', 'recently built', 'crowded with people'], 'synonym'),
  C('The fans were **jubilant**, joyful and cheering after the final whistle.', 'jubilant', 'extremely happy after a success', ['silent and tense, waiting for news', 'disappointed after a narrow defeat', 'confused about what had happened'], 'synonym'),
  C('The rules were **stringent**, strict and impossible to bend.', 'stringent', 'strict', ['old-fashioned', 'easy to follow', 'unfair'], 'synonym'),
  C('NAME gave a **candid**, honest answer about why {he} was late.', 'candid', 'honest and direct', ['short', 'rude', 'polite but untrue'], 'synonym'),
  C('Unlike {his} **gregarious** sister, who loves parties, NAME prefers quiet evenings alone.', 'gregarious', 'sociable; enjoying the company of others', ['shy and happiest when left on their own', 'hard-working and serious about school', 'older and more experienced in life'], 'antonym'),
  C('The first chapter was **tedious**, but the second was thrilling.', 'tedious', 'boring and tiring', ['exciting', 'confusing', 'short'], 'antonym'),
  C('Some days the river is calm, but after heavy rain it becomes **turbulent**.', 'turbulent', 'moving wildly and unevenly', ['clear and clean enough to drink', 'very shallow and easy to wade', 'frozen hard from bank to bank'], 'antonym'),
  C('Rather than being **frugal** with {his} prize money, NAME spent it all in one afternoon.', 'frugal', 'careful not to waste money', ['generous with gifts for friends', 'proud of having won the prize', 'secretive about where it came from'], 'antonym'),
  C('The coach is usually **lenient**, but today she was strict about every rule.', 'lenient', 'not strict; forgiving', ['harsh', 'late', 'loud'], 'antonym'),
  C('NAME is usually **punctual**, yet today {he} arrived an hour late.', 'punctual', 'on time', ['polite', 'cheerful', 'well prepared'], 'antonym'),
  C('Although the soup looked **bland**, it tasted rich and spicy.', 'bland', 'having little taste', ['too hot to eat', 'thick and creamy', 'very salty'], 'antonym'),
  C('The answer was not **obscure** at all; it was obvious to everyone.', 'obscure', 'hard to see or understand', ['correct', 'surprising', 'short'], 'antonym'),
  C('Instead of **concealing** the broken vase, NAME showed it to {his} mother right away.', 'concealing', 'hiding', ['repairing', 'breaking', 'selling'], 'antonym'),
  C('The first speaker was **hesitant**, while the second spoke with total confidence.', 'hesitant', 'unsure and slow to speak or act', ['loud enough to fill the whole hall', 'funny and full of clever jokes', 'smartly dressed in a new suit'], 'antonym'),
  C('NAME loves **legumes**, such as lentils, chickpeas and kidney beans.', 'legumes', 'plants with seeds in pods, such as beans and peas', ['vegetables that grow under the ground, such as carrots', 'tropical fruits, such as mangoes and papayas', 'leafy green vegetables, such as spinach and lettuce'], 'example'),
  C('The museum displays many **relics**, including clay pots, ancient coins and stone tools.', 'relics', 'objects that survive from long ago', ['paintings of famous people from history', 'fossils of animals and plants', 'souvenirs sold in the museum shop'], 'example'),
  C('Many **nocturnal** animals, such as owls, bats and foxes, hunt in the dark.', 'nocturnal', 'active at night', ['living in trees', 'eating only meat', 'living in groups'], 'example'),
  C('Some **precipitation**, such as rain, sleet or snow, is expected tomorrow.', 'precipitation', 'water falling from the sky', ['strong wind that blows in gusts', 'warm sunshine after a cold spell', 'thick fog that hides the roads'], 'example'),
  C('The shop sells **percussion** instruments: drums, cymbals, tambourines and xylophones.', 'percussion', 'played by striking or shaking', ['played by blowing into them', 'played by plucking strings', 'played through electric speakers'], 'example'),
  C('NAME has several **phobias**, including fear of heights, spiders and deep water.', 'phobias', 'strong, unreasonable fears', ['favourite hobbies and pastimes', 'allergies to foods or animals', 'bad dreams that come back often'], 'example'),
  C('The kitchen drawer was full of **utensils**: spoons, whisks, ladles and spatulas.', 'utensils', 'tools used in cooking and eating', ['ingredients used to make a meal', 'cupboards for storing dishes', 'written instructions for cooking'], 'example'),
  C('Bad weather brings many **hazards** on the road, such as ice, fallen trees and floods.', 'hazards', 'dangers', ['delays', 'signs', 'repairs'], 'example'),
  C('After running the marathon, NAME was so **famished** that {he} ate three plates of rice.', 'famished', 'extremely hungry', ['extremely tired', 'very proud', 'slightly ill'], 'inference'),
  C('The **arid** land had not seen rain for two years, and the soil was cracked and dusty.', 'arid', 'very dry', ['flat', 'rocky', 'empty of people'], 'inference'),
  C('NAME’s **meticulous** notes were neatly written, carefully sorted and checked twice.', 'meticulous', 'showing great care about details', ['written quickly and in a hurry', 'brightly decorated with colours', 'much longer than they needed to be'], 'inference'),
  C('The **benevolent** stranger paid for the family’s meal and asked for nothing in return.', 'benevolent', 'kind and generous', ['rude and impatient', 'forgetful', 'nervous'], 'inference'),
  C('The audience sat in **rapt** silence, hardly breathing until the last note faded.', 'rapt', 'completely absorbed and fascinated', ['bored and waiting for it to end', 'angry and ready to complain loudly', 'confused about what was going on'], 'inference'),
  C('The **dilapidated** cabin had a sagging roof, broken windows and a door hanging from one hinge.', 'dilapidated', 'falling apart from age or neglect', ['small and crowded with old furniture', 'newly built and freshly painted', 'hidden deep in the woods'], 'inference'),
  C('NAME was **elated** when {he} saw {his} name at the top of the winners’ list.', 'elated', 'very happy and excited', ['embarrassed', 'upset', 'calm'], 'inference'),
  C('The **ominous** clouds grew darker, and the birds stopped singing.', 'ominous', 'suggesting that something bad will happen', ['beautiful in the light of the setting sun', 'moving quickly across the sky', 'thin and wispy, like strands of cotton'], 'inference'),
  C('The **pungent** smell of the fish market reached us two streets away.', 'pungent', 'strong and sharp (of a smell)', ['faint and barely noticeable', 'pleasant and welcoming', 'sweet, like a bunch of flowers'], 'inference'),
  C('The volunteers were **diligent**, working through the night until every sandbag was filled.', 'diligent', 'hard-working and careful', ['tired', 'paid', 'young'], 'inference'),
  C('When the teacher walked in, the noisy class fell **mute** at once.', 'mute', 'silent', ['asleep', 'into line', 'over'], 'inference'),
];

/** The words of each sentence that give the clue. */
const CLUES: Record<string, string> = {
  summit: '“the highest point of the mountain”',
  chronic: '“which means it would last a long time”',
  endemic: '“plants and animals found nowhere else on Earth”',
  anthology: '“or collection of writings by different authors”',
  apprehensive: '“or uneasy about what might happen”',
  levee: '“a high bank of earth that stops a river from flooding”',
  verbose: '“full of unnecessary words”',
  novice: '“a beginner who has only just started”',
  lethargic: '“sluggish and slept most of the day”',
  amicable: '“as friendly as old classmates”',
  immaculate: '“spotless and in its place”',
  ambiguous: '“so unclear that no one knew what to do”',
  precarious: '“shaky and likely to collapse”',
  jubilant: '“joyful and cheering”',
  stringent: '“strict and impossible to bend”',
  candid: '“honest”',
  gregarious: '“unlike” sets the sister, who loves parties, against someone who prefers quiet evenings alone',
  tedious: '“but” sets it against “thrilling”',
  turbulent: '“but” sets it against “calm”',
  frugal: '“rather than” sets it against spending all the money in one afternoon',
  lenient: '“but” sets it against “strict”',
  punctual: '“yet” sets it against arriving an hour late',
  bland: '“although” sets it against “rich and spicy”',
  obscure: '“not … at all” sets it against “obvious”',
  concealing: '“instead of” sets it against showing the vase right away',
  hesitant: '“while” sets it against “total confidence”',
  legumes: 'the examples lentils, chickpeas and kidney beans',
  relics: 'the examples clay pots, ancient coins and stone tools',
  nocturnal: 'the examples owls, bats and foxes, which hunt in the dark',
  precipitation: 'the examples rain, sleet and snow',
  percussion: 'the examples drums, cymbals, tambourines and xylophones',
  phobias: 'the examples fear of heights, spiders and deep water',
  utensils: 'the examples spoons, whisks, ladles and spatulas',
  hazards: 'the examples ice, fallen trees and floods',
  famished: 'eating three plates of rice after running a marathon',
  arid: 'no rain for two years, and cracked, dusty soil',
  meticulous: 'notes neatly written, carefully sorted and checked twice',
  benevolent: 'paying for a family’s meal and asking for nothing in return',
  rapt: 'an audience hardly breathing until the last note faded',
  dilapidated: 'a sagging roof, broken windows and a door hanging from one hinge',
  elated: 'seeing one’s name at the top of the winners’ list',
  ominous: 'darkening clouds and birds that stop singing',
  pungent: 'a smell strong enough to reach people two streets away',
  diligent: 'working through the night until every sandbag was filled',
  mute: 'a noisy class reacting at once when the teacher walks in',
};

/** Words worked out from their parts (difficulty 3). */
const WORD_PARTS: Array<{ s: string; word: string; parts: string; meaning: string; wrong: [string, string, string] }> = [
  { s: 'NAME was afraid the class would **misunderstand** {his} joke.', word: 'misunderstand', parts: 'mis- (wrongly) + understand', meaning: 'understand wrongly', wrong: ['understand completely', 'understand again', 'understand in advance'] },
  { s: 'The museum has a whole room of **prehistoric** tools.', word: 'prehistoric', parts: 'pre- (before) + historic', meaning: 'from the time before written history', wrong: ['from the last few years of recent history', 'opposed to the teaching of history', 'about the study of history at school'] },
  { s: 'A local **benefactor** paid for the new playground.', word: 'benefactor', parts: 'bene- (good, well) + factor (one who does)', meaning: 'a person who gives help, often money', wrong: ['a person who causes damage on purpose', 'a person who builds and runs factories', 'a person who plays on playgrounds'] },
  { s: 'A **malfunction** in the engine delayed the flight.', word: 'malfunction', parts: 'mal- (badly) + function', meaning: 'a failure to work properly', wrong: ['a routine safety check', 'a sudden increase in speed', 'a new part being fitted'] },
  { s: 'The history test asked us to put the events in **chronological** order.', word: 'chronological', parts: 'chron (time) + -logical', meaning: 'in the order in which they happened', wrong: ['in order from most to least important', 'in alphabetical order by their names', 'in order from smallest to largest'] },
  { s: 'NAME took a **portable** speaker to the beach.', word: 'portable', parts: 'port (carry) + -able (can be)', meaning: 'easy to carry', wrong: ['very loud', 'waterproof', 'powered by the sun'] },
  { s: 'Thousands of **spectators** filled the stadium.', word: 'spectators', parts: 'spect (look) + -ator (one who)', meaning: 'people who watch an event', wrong: ['people who play in a match', 'people who sell tickets', 'people who clean a stadium'] },
  { s: 'The new phone has an almost **unbreakable** screen.', word: 'unbreakable', parts: 'un- (not) + break + -able (can be)', meaning: 'impossible to break', wrong: ['easy to break', 'already broken', 'able to be repaired'] },
  { s: 'NAME wants to study **biology** at university.', word: 'biology', parts: 'bio (life) + -ology (study of)', meaning: 'the study of living things', wrong: ['the study of rocks', 'the study of the stars', 'the study of ancient people'] },
  { s: 'Before the race, the officials **inspect** every bicycle.', word: 'inspect', parts: 'in (into) + spect (look)', meaning: 'look at closely', wrong: ['paint', 'race', 'lend out'] },
  { s: 'The country must **import** most of its oil.', word: 'import', parts: 'im- (into) + port (carry)', meaning: 'bring in from another country', wrong: ['send out to another country', 'produce in its own factories', 'stop using completely'] },
  { s: 'Many children in the drought were **malnourished**.', word: 'malnourished', parts: 'mal- (badly) + nourished (fed)', meaning: 'not getting enough healthy food', wrong: ['eating far too much food every day', 'well fed and growing strongly', 'allergic to some common foods'] },
  { s: 'The cinema showed a short **preview** of the new film.', word: 'preview', parts: 'pre- (before) + view', meaning: 'a look at something before it is shown to everyone', wrong: ['a review written by a critic after a film opens', 'a second showing of a film for people who missed it', 'a film played backwards from the end to the start'] },
  { s: 'NAME had to **rewrite** {his} essay after the computer crashed.', word: 'rewrite', parts: 're- (again) + write', meaning: 'write again', wrong: ['write for the first time', 'write badly', 'stop writing'] },
  { s: 'The archaeologists studied a **chronicle** of the old kingdom.', word: 'chronicle', parts: 'chron (time) + -icle', meaning: 'a record of events in the order they happened', wrong: ['a map showing the kingdom’s towns and rivers', 'a jewelled crown worn by the kingdom’s kings', 'a song praising the kingdom and its people'] },
];

function contextClues(rng: Rng, d: Difficulty): GenOutput {
  const cast = people(rng, 2);
  const f = (s: string) => fill(s, cast);
  if (d === 3 && rng.chance(0.5)) {
    const w = rng.pick(WORD_PARTS);
    return {
      prompt: `Use the word parts to work out the meaning of the word in bold.\n\n${block(f(w.s))}\n\nWhat does **${w.word}** most likely mean?`,
      parts: [part(mc(rng, w.meaning, w.wrong))],
      hints: ['Split the word into a prefix, a root and a suffix.', `Here: ${w.parts}.`],
      solution: [`**${w.word}** = ${w.parts}.`, `So it means “${w.meaning}”, which also fits the sentence.`],
    };
  }
  const clues: Clue[] = d === 1 ? ['definition', 'synonym'] : d === 2 ? ['antonym', 'example', 'synonym'] : ['inference', 'antonym'];
  const c = rng.pick(CONTEXTS.filter((x) => clues.includes(x.clue)));
  return {
    prompt: `${block(f(c.s))}\n\nWhat does **${c.word}** mean in this sentence?`,
    parts: [part(mc(rng, c.meaning, c.wrong))],
    hints: [CLUE_HINT[c.clue]],
    solution: [`The sentence gives ${CLUE_NAME[c.clue]}: ${CLUES[c.word]}.`, `So **${c.word}** means “${c.meaning}”, not “${c.wrong[0]}”.`],
  };
}

export const WORD_SKILLS: SkillDef[] = [
  skill({
    id: 'e10-confused-words',
    name: 'Commonly confused words',
    description: 'Choose correctly between words that sound or look alike, such as their, there and they’re or affect and effect.',
    outcomes: OUTCOMES,
    lessonId: LESSON,
    format: 'mc',
    gen: confusedWords,
  }),
  skill({
    id: 'e10-connotation',
    name: 'Connotation, tone and register',
    description: 'Choose words for their positive, neutral or negative connotation, and choose a formal register where it is needed.',
    outcomes: OUTCOMES,
    lessonId: LESSON,
    format: 'mc',
    gen: connotation,
  }),
  skill({
    id: 'e10-context-clues',
    name: 'Vocabulary from context',
    description: 'Work out the meaning of an unfamiliar word from definition, synonym, antonym, example and inference clues, and from its prefix and root.',
    outcomes: OUTCOMES,
    lessonId: LESSON,
    format: 'mc',
    gen: contextClues,
  }),
];
