/**
 * Grade 11 English, lesson 1.2: Complex Characters (11-A2). Mixed and hidden motives inferred from
 * evidence, and how and why a character changes: the catalyst, the change and what an epiphany
 * reveals. Stories written for Gradileo and public-domain stories (./stories.ts).
 */
import { mc, part, skill } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { block, fill, pair, q } from '../../eng10/gen/common.ts';
import {
  ARABY, ARABY_ENDING, BRIDE, BRIDE_ENDING, BRILL, BRILL_ENDING, BRILL_EXPERT, BROWN, BROWN_ANGEL, BROWN_CATECHISM, BROWN_OPENING, BROWN_RETURN, BROWN_ROAD, HERON, HERON_GUN, HERON_SECRET, HERON_SILENCE,
  PARTY, PARTY_IDEA, PARTY_LATER, PARTY_LIFE, PARTY_LILIES, VEIL, VEIL_EVERY, quoteBlock, titled, type Excerpt,
} from './stories.ts';

const L = 'e11-1-2';
const OUT = ['11-A2'];

// ============================================================================ motive

interface Motive {
  text: string;
  ask: string;
  answer: string;
  /** Unsupported or contradicted by the passage. */
  wrong: string[];
  why: string;
}
const MOTIVES: Motive[] = [
  {
    text: 'NAME volunteers to organize the class trip, then spends every meeting reminding everyone how much work {he} is doing. When the teacher praises a small idea of NAME2’s, NAME goes quiet for the rest of the day.',
    ask: 'What most likely drives NAME to organize the trip?',
    answer: 'A wish to be noticed and admired, as well as to help',
    wrong: ['A dislike of school trips', 'A plan to have the trip cancelled', 'Shyness about speaking in meetings'],
    why: 'NAME keeps pointing out {his} own work and sulks when someone else is praised, so recognition matters to {him}, alongside helping.',
  },
  {
    text: 'NAME says {he} doesn’t care about the scholarship results. All evening, though, {he} checks {his} email every few minutes and snaps at {his} brother for talking too loudly.',
    ask: 'What best explains NAME’s behaviour?',
    answer: '{He} cares a great deal but is afraid of being disappointed.',
    wrong: ['{He} has already been told that {he} won.', '{He} truly has no interest in the scholarship.', '{He} is waiting for an email about a different matter.'],
    why: 'The constant checking and the short temper contradict what NAME says: {he} is anxious about the result and protects {him}self by pretending not to care.',
  },
  {
    text: 'Whenever NAME’s grandfather mentions selling the family farm, NAME changes the subject or finds a job to do outside. Yet one evening {he} leaves the estate agent’s leaflet on the kitchen table, where {his} grandfather is sure to see it.',
    ask: 'What best explains NAME’s mixed behaviour?',
    answer: '{He} knows the farm may have to be sold but cannot bear to talk about losing it.',
    wrong: ['{He} wants to buy the farm from {his} grandfather.', '{He} has never cared about the farm.', '{He} is trying to hide the leaflet from {his} grandfather.'],
    why: 'Avoiding the subject shows how painful it is to {him}; leaving the leaflet out shows {he} accepts the sale may be necessary. Both feelings are true at once.',
  },
  {
    text: 'NAME tells the band {he} is quitting because rehearsals clash with {his} new job. {He} hands in {his} notice the week after a new singer joins, the same singer who laughed at {his} drumming in front of everyone.',
    ask: 'What is most likely NAME’s hidden motive for quitting?',
    answer: '{He} was hurt by the new singer’s mockery but does not want to admit it.',
    wrong: ['{He} wants to start a rival band with the new singer.', '{He} has been offered a place in a famous orchestra.', '{He} has lost interest in music altogether.'],
    why: 'The timing points to the singer’s mockery; the job is the reason NAME gives, not necessarily the real one.',
  },
  {
    text: 'In front of the guests, NAME calls {his} younger sister’s painting “a mess”. Later, when everyone has gone, {he} quietly hangs it on {his} own bedroom wall.',
    ask: 'What does NAME’s behaviour most likely reveal?',
    answer: '{He} admires the painting more than {he} will admit in public.',
    wrong: ['{He} wants to hide the painting so no one sees it.', '{He} plans to sell the painting.', '{He} truly thinks the painting is a mess.'],
    why: 'What NAME does in private contradicts what {he} says in public: pride, or perhaps a little jealousy, stops {him} from praising {his} sister openly.',
  },
  {
    text: 'NAME turns down the promotion that would move {him} to the capital, telling {his} manager that {he} prefers a quiet life. That evening, as every evening since the winter, {he} sits for an hour at {his} mother’s bedside, reading to her.',
    ask: 'What is most likely NAME’s real reason for refusing the promotion?',
    answer: '{He} will not leave {his} sick mother, though {he} keeps this reason private.',
    wrong: ['{He} is afraid of large cities.', '{He} has been offered a better job abroad.', '{He} dislikes {his} manager.'],
    why: 'The nightly visits to {his} mother, “every evening since the winter”, point to the reason {he} does not give {his} manager.',
  },
  {
    text: 'NAME lends {his} notes to NAME2 before every exam and waves away any thanks. Halfway through the story we learn that, years ago, NAME2 took the blame for a window NAME broke, and was nearly expelled for it.',
    ask: 'What is most likely NAME’s hidden motive?',
    answer: '{He} is quietly repaying an old debt of gratitude.',
    wrong: ['{He} wants NAME2 to fail the exams.', '{He} hopes NAME2 will lend {him} money.', '{He} has just met NAME2 and wants to be friends.'],
    why: 'The story of the broken window explains NAME’s generosity: {he} owes NAME2 a great deal and does not want to be thanked for paying it back.',
  },
];

interface PdMotive {
  lead: string;
  excerpt: Excerpt;
  ask: string;
  answer: string;
  wrong: string[];
  why: string;
}
const PD_MOTIVES: PdMotive[] = [
  {
    lead: `In ${titled(BROWN)}, Goodman Brown has left his wife for the night on a secret errand in the forest:`,
    excerpt: BROWN_ANGEL,
    ask: 'Why does Brown feel “justified” in hurrying on?',
    answer: 'He promises himself he will be good after tonight, and the promise lets him excuse doing wrong now.',
    wrong: ['He has decided to turn back and go home to Faith.', 'He fears that Faith will follow him into the forest.', 'He is late for a church meeting with the minister.'],
    why: 'His “excellent resolve for the future” is a bargain with his conscience: by promising to cling to Faith afterwards, he excuses his “present evil purpose”. The narrator’s praise of the resolve is ironic.',
  },
  {
    lead: `In ${titled(HERON)}, a young hunter has offered ten dollars, a fortune to Sylvia and her grandmother, to anyone who shows him the white heron’s nest. Sylvia has climbed the great pine at dawn and seen it:`,
    excerpt: HERON_SECRET,
    ask: 'Why does Sylvia keep the nest a secret?',
    answer: 'Her bond with the heron and the wild world she shared with it outweighs her wish to please the hunter and win the money.',
    wrong: ['She has forgotten where the nest is.', 'She dislikes the hunter and wants him to leave.', 'Her grandmother has told her to say nothing.'],
    why: 'She remembers watching “the sea and the morning together” with the heron; telling would “give its life away”. Earlier the story shows that she admires the hunter, so the choice costs her something.',
  },
  {
    lead: `In ${titled(PARTY)}, Laura has heard that a poor neighbour was killed that morning. Her mother refuses to stop the party and gives Laura a beautiful new hat. Laura looks in the mirror:`,
    excerpt: PARTY_LATER,
    ask: 'Why does Laura decide to remember the accident “after the party’s over”?',
    answer: 'The pleasure of the party and her new hat pull her away from her pity, so she puts it off.',
    wrong: ['She has learned that the man was not really killed.', 'Her mother has promised to visit the widow herself.', 'She never felt sorry for the man’s family.'],
    why: 'Only minutes earlier Laura wanted to stop the party; now, admiring herself in the hat, she postpones her feelings. Her motive is mixed: real pity, and the pull of pleasure.',
  },
  {
    lead: `In ${titled(BRILL)}, Miss Brill spends every Sunday on a park bench, listening to the people around her:`,
    excerpt: BRILL_EXPERT,
    ask: 'What most likely draws Miss Brill to “sitting in other people’s lives”?',
    answer: 'Her own life is lonely, and listening to others lets her feel part of something.',
    wrong: ['She is gathering gossip to sell to a newspaper.', 'She dislikes everyone else in the park.', 'She is waiting for a friend who is late.'],
    why: 'She lives alone and speaks to almost no one; the conversations around her are the closest she comes to company. Mansfield never states this outright, but every detail points to it.',
  },
];

interface MotiveEvidence {
  lead: string;
  claim: string;
  answer: Excerpt;
  wrong: Excerpt[];
  why: string;
}
const MOTIVE_EVIDENCE: MotiveEvidence[] = [
  {
    lead: `In ${titled(PARTY)}, after the party, Mrs. Sheridan sends Laura to the dead man’s house with a basket of leftovers.`,
    claim: 'Mrs. Sheridan’s kindness is mixed with snobbery and a wish to avoid waste.',
    answer: PARTY_LILIES,
    wrong: [PARTY_LIFE, PARTY_LATER],
    why: '“People of that class are so impressed by arum lilies” shows that she looks down on the family even while giving to them.',
  },
  {
    lead: `In ${titled(PARTY)}, after the party, Mrs. Sheridan has an idea.`,
    claim: 'Mrs. Sheridan sends the basket partly because the food would otherwise be wasted.',
    answer: PARTY_IDEA,
    wrong: [PARTY_LIFE, PARTY_LATER],
    why: 'The leftovers are “all uneaten, all going to be wasted” just before “she had one of her brilliant ideas”: the waste prompts the generosity.',
  },
  {
    lead: `In ${titled(HERON)}, Sylvia spends a day following the young hunter through the woods.`,
    claim: 'Even while she admires the hunter, Sylvia is troubled by his killing of birds.',
    answer: HERON_GUN,
    wrong: [HERON_SECRET, HERON_SILENCE],
    why: 'She would “have liked him vastly better without his gun”: she admires the young man but cannot understand why he kills the birds he loves, the conflict that her final choice resolves.',
  },
  {
    lead: `In ${titled(BROWN)}, Goodman Brown sets off into the forest at sunset on a secret errand.`,
    claim: 'Brown knows his errand is wrong even as he hurries on with it.',
    answer: BROWN_ANGEL,
    wrong: [BROWN_OPENING, BROWN_ROAD],
    why: 'The narrator calls his errand his “present evil purpose”, and Brown has to promise himself future goodness to feel “justified”: he knows what he is doing is wrong.',
  },
];

function motiveQ(rng: Rng, d: Difficulty) {
  if (d === 3) {
    if (rng.chance(0.5)) {
      return {
        prompt: `${titled(VEIL)} ends with the dying Mr. Hooper refusing to let anyone lift the black veil he has worn for most of his life:\n\n${quoteBlock(VEIL_EVERY)}\n\nWhy does he refuse, even at death?`,
        parts: [part(mc(rng, 'He wants the veil to stand for the secret sin he believes every person hides, and lifting it would undo that lesson.', ['His face was badly scarred in an accident, and he is ashamed of it.', 'His church ordered him to wear the veil until his death.', 'He wants to confess a crime that only he has committed.']))],
        hints: ['Read his last speech closely: whom does he say the people should tremble at?'],
        solution: ['He tells the onlookers to “tremble also at each other”: he sees “on every visage a Black Veil”.', 'The veil stands for the secrets everyone hides; lifting it would suggest the sin was his alone. Nothing in the story mentions a scar, an order or a crime of his own.'],
      };
    }
    const e = rng.pick(MOTIVE_EVIDENCE);
    const opts = [e.answer, ...e.wrong];
    return {
      prompt: `${e.lead} A student claims:\n\n${block(e.claim)}\n\nWhich quotation best supports this claim?`,
      parts: [part(mc(rng, q(e.answer.text), opts.slice(1).map((o) => q(o.text))))],
      hints: ['Choose the words that show the motive itself, not just what happens.'],
      solution: [e.why],
    };
  }
  if (d === 2) {
    const m = rng.pick(PD_MOTIVES);
    return {
      prompt: `${m.lead}\n\n${quoteBlock(m.excerpt)}\n\n${m.ask}`,
      parts: [part(mc(rng, m.answer, m.wrong))],
      hints: ['Look for evidence in the character’s words and actions, and in what the narrator hints. Reject any answer the passage does not support or contradicts.'],
      solution: [m.answer, m.why],
    };
  }
  const cast = pair(rng);
  const m = rng.pick(MOTIVES);
  return {
    prompt: `${block(fill(m.text, cast))}\n\n${fill(m.ask, cast)}`,
    parts: [part(mc(rng, fill(m.answer, cast), m.wrong.map((w) => fill(w, cast))))],
    hints: ['Characters do not always say why they act. Compare what the character says with what the character does, and look at the timing.'],
    solution: [fill(m.answer, cast).replace(/\.?$/, '.'), fill(m.why, cast)],
  };
}

// ============================================================================ change

interface Arc {
  text: string;
  change: string;
  changeWrong: string[];
  catalyst: string;
  catalystWrong: string[];
}
const ARCS: Arc[] = [
  {
    text: 'At first NAME laughs with {his} friends at the new student’s accent. Then the teacher pairs NAME with {him2} for a project, and NAME2 explains why {his2} family had to leave {his2} country. By the end of term NAME sits with NAME2 at lunch and tells {his} friends to stop the jokes.',
    change: 'From mocking NAME2 to understanding and standing up for {him2}',
    changeWrong: ['From kindness to cruelty', 'From loving school to hating it', 'From shyness to arrogance'],
    catalyst: 'Hearing NAME2’s story while they work on the project',
    catalystWrong: ['Winning a prize for the project', 'Moving to a new school', 'A quarrel with the teacher'],
  },
  {
    text: 'NAME has always believed {his} older brother is perfect. Clearing out the attic, {he} finds letters showing that the brother failed his exams and lied about it for years. NAME is shaken, but by the last page {he} loves him more, not less, for being human.',
    change: 'From hero-worship to a more realistic, forgiving love',
    changeWrong: ['From love to hatred', 'From trust in {his} brother to cutting him off', 'From laziness to hard work'],
    catalyst: 'Finding the letters in the attic',
    catalystWrong: ['The brother’s wedding', 'Failing {his} own exams', 'An argument with {his} parents'],
  },
  {
    text: 'Proud of doing everything alone, NAME refuses help with {his} struggling farm. Then a flood nearly ruins {him}, and the neighbours rebuild {his} barn without being asked. In the spring NAME joins the village co-operative.',
    change: 'From proud independence to accepting help from {his} community',
    changeWrong: ['From generosity to greed', 'From farming to city life', 'From trusting people to suspecting everyone'],
    catalyst: 'The flood, and the neighbours rebuilding {his} barn',
    catalystWrong: ['A good harvest', 'An argument with the co-operative', 'Selling the farm'],
  },
  {
    text: 'NAME, a champion swimmer, cares only about winning. In the regional final, a teammate collapses in the next lane, and NAME stops to hold her up until help arrives, losing the race. The next season, NAME starts coaching the younger swimmers.',
    change: 'From caring only about winning to caring about other people',
    changeWrong: ['From kindness to selfishness', 'From confidence to fear of water', 'From coaching to competing'],
    catalyst: 'Stopping to help the teammate who collapsed in the final',
    catalystWrong: ['Winning the regional final', 'An injury to {his} shoulder', 'A new coach arriving'],
  },
];

interface PdChange {
  lead: string;
  excerpt: Excerpt;
  ask: string;
  answer: string;
  wrong: string[];
  why: string;
}
const PD_CHANGES: PdChange[] = [
  {
    lead: `At the end of ${titled(ARABY)}, the boy reaches the bazaar just as it is closing. He has come to buy a present for the girl he adores, but finds dark, empty stalls, men counting money and a shop assistant flirting with two young men. Standing in the dark hall:`,
    excerpt: ARABY_ENDING,
    ask: 'What does the boy realize in this epiphany?',
    answer: 'That his romantic dream of the girl and the bazaar was built on vanity and self-deception',
    wrong: ['That the girl secretly loves him too', 'That he has lost his money on the train', 'That he should have come to the bazaar the day before'],
    why: 'He sees himself “as a creature driven and derided by vanity”: the bazaar he imagined as enchanted is ordinary and commercial, and his grand romance was mostly in his own head.',
  },
  {
    lead: `At the end of ${titled(BRILL)}, a young couple on her bench have mocked her fur as “exactly like a fried whiting”. At home:`,
    excerpt: BRILL_ENDING,
    ask: 'What has changed for Miss Brill?',
    answer: 'Her happy belief that she belongs to the Sunday “performance” has collapsed into hurt and loneliness.',
    wrong: ['She has decided to buy a smarter fur next Sunday.', 'She has realized she enjoys being alone.', 'She has become angry and plans to confront the couple.'],
    why: 'She skips her Sunday treat, puts the fur away “without looking”, and hears “something crying”: the crying is her own grief, displaced onto the fur.',
  },
  {
    lead: `At the end of ${titled(PARTY)}, Laura has seen the dead man lying peacefully in his cottage. Walking home, she tries to tell her brother how she feels:`,
    excerpt: PARTY_LIFE,
    ask: 'What does her broken sentence suggest?',
    answer: 'Seeing the dead man has given her a sense of life and death too large and new to put into words.',
    wrong: ['She is too tired to finish speaking.', 'She wants Laurie to explain how the accident happened.', 'She has decided never to go to a party again.'],
    why: 'Laura’s sentence breaks off because the experience goes beyond words; the story ends on her wordless epiphany rather than a stated lesson.',
  },
  {
    lead: `In ${titled(BRIDE)}, Scratchy Wilson, the drunken gunman who has always fought the town marshal, meets him in the street, unarmed and with his new bride. Learning that the marshal is married:`,
    excerpt: BRIDE_ENDING,
    ask: 'What does Scratchy’s reaction most likely suggest?',
    answer: 'He senses that the wild old days are over, and that his old game no longer has a place.',
    wrong: ['He plans to come back later with more guns.', 'He is secretly in love with the bride.', 'He is pleased that the marshal is unarmed.'],
    why: 'Marriage is a “foreign condition” to him, and he is “a simple child of the earlier plains”: the settled, married world has arrived, and he walks away.',
  },
];

function changeQ(rng: Rng, d: Difficulty) {
  if (d === 3) {
    const pick = rng.int(0, 2);
    if (pick === 0) {
      return {
        prompt: `${titled(BROWN)} begins with Goodman Brown kissing his young wife, Faith, goodbye at sunset. After his night in the forest, which detail best shows **how he has changed**?`,
        parts: [part(mc(rng, q(BROWN_RETURN.text.split('. ').slice(1).join('. ')), [q(BROWN_OPENING.text.split('. ')[0] + '.'), q(BROWN_CATECHISM.text), q(BROWN_ROAD.text)]))],
        hints: ['A change is shown most clearly when the story repeats a moment and the character behaves differently.'],
        solution: ['When Faith runs to greet him the next morning, Brown “looked sternly and sadly into her face, and passed on without a greeting”, the opposite of the parting kiss at the start.', 'The other details come before his change, or describe the forest rather than Brown.'],
      };
    }
    if (pick === 1) {
      return {
        prompt: `${titled(HERON)}: at the start, Sylvia hides from the young hunter in the bushes and can barely say her name. At the end:\n\n${quoteBlock(HERON_SILENCE)}\n\nWhat does this moment reveal about how Sylvia has changed?`,
        parts: [part(mc(rng, 'The shy child who wanted to please the stranger now makes her own choice, against him, to protect the heron.', ['She has grown afraid of the woods and wants to move back to town.', 'She has decided to tell the hunter everything after all.', 'She has lost interest in birds.']))],
        hints: ['Compare the girl hiding in the bushes with the girl who now refuses to speak. Whose wishes does she follow now?'],
        solution: ['At first Sylvia does whatever the adults expect; now, with “the great world” offering her money and friendship, she “must keep silence”.', 'She has found the strength to choose for herself, and she chooses the heron.'],
      };
    }
    return {
      prompt: `In ${titled(BROWN)}, Goodman Brown returns from the forest a changed man:\n\n${quoteBlock(BROWN_RETURN)}\n\nWhat is the **catalyst** of this change?`,
      parts: [part(mc(rng, 'His night in the forest, where he believes he saw the townspeople, and even Faith, at a witches’ meeting', ['The death of his wife, Faith', 'A quarrel with the minister about money', 'Losing his farm in a bad harvest']))],
      hints: ['The catalyst is the event that sets the change in motion. What happened between the parting kiss and this morning?'],
      solution: ['The catalyst is his night in the forest: he believes he saw the people he trusted most, Faith among them, worshipping evil.', 'Faith does not die; she is alive and runs to greet him. Nothing in the story mentions a quarrel about money or a lost farm.'],
    };
  }
  if (d === 2) {
    const c = rng.pick(PD_CHANGES);
    return {
      prompt: `${c.lead}\n\n${quoteBlock(c.excerpt)}\n\n${c.ask}`,
      parts: [part(mc(rng, c.answer, c.wrong))],
      hints: ['An epiphany is a sudden moment of understanding. Ask what the character sees, or feels, now that they did not before.'],
      solution: [c.answer.replace(/\.?$/, '.'), c.why],
    };
  }
  const cast = pair(rng);
  const a = rng.pick(ARCS);
  if (rng.chance(0.5)) {
    return {
      prompt: `${block(fill(a.text, cast))}\n\nWhat is the **catalyst**: the event that causes ${cast[0].name} to change?`,
      parts: [part(mc(rng, fill(a.catalyst, cast), a.catalystWrong.map((w) => fill(w, cast))))],
      hints: ['Find the turning point: the event after which the character starts to think or act differently.'],
      solution: [`The catalyst is: ${fill(a.catalyst, cast).replace(/^./, (c) => c.toLowerCase())}.`, 'Before it, the character behaves one way; after it, the character begins to change.'],
    };
  }
  return {
    prompt: `${block(fill(a.text, cast))}\n\nHow does ${cast[0].name} change?`,
    parts: [part(mc(rng, fill(a.change, cast), a.changeWrong.map((w) => fill(w, cast))))],
    hints: ['Compare the character at the start with the character at the end. What do they believe or do differently?'],
    solution: [`${fill(a.change, cast)}.`, 'The opening shows one attitude; the ending shows its opposite, after the turning point.'],
  };
}

export const CHARACTER_SKILLS: SkillDef[] = [
  skill({
    id: 'e11-character-motive',
    name: 'Motives, mixed and hidden',
    description: 'Infer a character’s motives, including mixed and hidden ones, from what they say and do, and choose the evidence that best supports an inference.',
    outcomes: OUT,
    lessonId: L,
    format: 'mc',
    gen: motiveQ,
  }),
  skill({
    id: 'e11-character-change',
    name: 'Character change and epiphany',
    description: 'Identify how a character changes, the catalyst that causes the change, and what an epiphany reveals.',
    outcomes: OUT,
    lessonId: L,
    format: 'mc',
    gen: changeQ,
  }),
];
