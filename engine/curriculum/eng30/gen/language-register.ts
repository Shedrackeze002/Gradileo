/**
 * Grade 12 English, lesson 7.3: Register, Tone and Audience (12-G1). Choosing the version of a message
 * that suits an academic essay, a professional email, a speech to an assembly or a message to a
 * friend; naming the register of a passage; spotting the one phrase that slips out of a formal
 * register; and revising casual sentences into academic prose without changing what they say.
 * Every version of a message is written to a similar length, so that the right one never stands out.
 */
import { fixedChoice, mc, part, skill, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { block, people } from '../../eng10/gen/common.ts';

const LESSON = 'e12-7-3';
const OUTCOMES = ['12-G1'];

type Register = 'academic' | 'professional' | 'speech' | 'casual';
const REGISTERS: Register[] = ['academic', 'professional', 'speech', 'casual'];
const CONTEXT: Record<Register, string> = {
  academic: 'an analytical essay for a Grade 12 English class',
  professional: 'an email to someone in charge whom the writer has never met',
  speech: 'a speech to the whole school at an assembly',
  casual: 'a text message to a close friend',
};
const LABEL: Record<Register, string> = {
  academic: 'Formal and academic',
  professional: 'Polite and professional',
  speech: 'Rousing and public',
  casual: 'Casual and conversational',
};
/** Who each version suits, for solutions. */
const READER: Record<Register, string> = {
  academic: 'an essay',
  professional: 'an email to a stranger in charge',
  speech: 'a speech to an assembly',
  casual: 'a message to a friend',
};
const FEATURES: Record<Register, string> = {
  academic: 'impersonal, precise and formal, with no slang and no direct appeal to the reader',
  professional: 'polite, clear and to the point, without slang or jokes',
  speech: 'addressed to a crowd, speaking to the listeners as “we” and building energy',
  casual: 'relaxed and personal, with slang, contractions and loose punctuation',
};

/** One message in four registers, each version about the same length. */
interface Message {
  topic: string;
  versions: Record<Register, string>;
}
const MESSAGES: Message[] = [
  {
    topic: 'a later start to the school day',
    versions: {
      academic: 'Research on adolescent sleep suggests that a later start to the school day would improve both health and results.',
      professional: 'I am writing to ask whether the school might consider a later start, as many students are struggling with sleep.',
      speech: 'Friends, how many of us dragged ourselves here this morning half asleep? It is time our school day started later.',
      casual: 'honestly school starting at 8 is wrecking me, they should push it back like an hour, nobody can think that early lol',
    },
  },
  {
    topic: 'a late bus',
    versions: {
      academic: 'The unreliability of the route 9 bus falls hardest on the students who live farthest from the school.',
      professional: 'I am writing to report that the route 9 bus has arrived more than twenty minutes late on six days this month.',
      speech: 'Every one of us deserves to reach class on time, and right now the route 9 bus is letting all of us down.',
      casual: 'the 9 was late AGAIN today, like twenty mins, i literally ran into class right as the bell went, so done with it',
    },
  },
  {
    topic: 'longer library hours',
    versions: {
      academic: 'Longer library hours would give students without quiet space at home an equal opportunity to study in the evening.',
      professional: 'Would it be possible to keep the library open until eight on weekdays? I would be glad to help organize volunteers.',
      speech: 'Imagine a library that stays open after dark, a place for every one of us to work in peace. Let us make it happen.',
      casual: 'ok wild idea but what if the library stayed open till like 8, i would literally live there before exams, so good',
    },
  },
  {
    topic: 'volunteering at a food bank',
    versions: {
      academic: 'Volunteering at the food bank revealed how hidden hunger can be, even in a neighbourhood that appears comfortable.',
      professional: 'I volunteered at the community food bank every Saturday for two years and would welcome the chance to discuss it.',
      speech: 'Last year, some of us gave our Saturdays to the food bank. Today I am asking all of you to join us on Saturday.',
      casual: 'food bank shift was actually so good today, met the nicest people, you should totally come next sat with me',
    },
  },
  {
    topic: 'a team that lost the final',
    versions: {
      academic: 'Although the team lost the final, its season demonstrated how steady coaching can transform a group of beginners.',
      professional: 'Thank you for your support this season. Although we lost the final, the team has improved more than we hoped.',
      speech: 'We lost the final, yes, but look at how far we have come together. Stand up and cheer for your team this morning!',
      casual: 'we lost the final but honestly we played so well, nobody thought we would even get that far, still buzzing tbh',
    },
  },
];

/** A formal sentence with one phrase that slips into a casual register, and three phrases that do not. */
interface Slip {
  s: string;
  slip: string;
  fine: [string, string, string];
  fix: string;
}
const SLIPS: Slip[] = [
  { s: 'In the final paragraph, Chopin reveals that Mrs. Mallard’s joy was pretty much doomed from the beginning.', slip: 'pretty much', fine: ['In the final paragraph', 'reveals', 'from the beginning'], fix: 'In the final paragraph, Chopin reveals that Mrs. Mallard’s joy was doomed from the beginning.' },
  { s: 'The data suggest that the new policy has a ton of benefits for families on low incomes.', slip: 'a ton of', fine: ['The data suggest', 'the new policy', 'on low incomes'], fix: 'The data suggest that the new policy has many benefits for families on low incomes.' },
  { s: 'Hamlet’s delay, which critics have debated for centuries, drives the audience nuts throughout the play.', slip: 'drives the audience nuts', fine: ['critics have debated', 'for centuries', 'throughout the play'], fix: 'Hamlet’s delay, which critics have debated for centuries, frustrates the audience throughout the play.' },
  { s: 'Although the evidence is limited, the study kind of supports the claim that sleep improves memory.', slip: 'kind of', fine: ['Although the evidence is limited', 'supports the claim', 'improves memory'], fix: 'Although the evidence is limited, the study partly supports the claim that sleep improves memory.' },
  { s: 'The poet’s use of enjambment creates momentum, and the final stanza is super powerful as a result.', slip: 'super powerful', fine: ['enjambment', 'creates momentum', 'as a result'], fix: 'The poet’s use of enjambment creates momentum, and the final stanza is especially powerful as a result.' },
  { s: 'The committee concluded that the proposal was a no-brainer and recommended that it be adopted at once.', slip: 'a no-brainer', fine: ['The committee concluded', 'recommended', 'be adopted at once'], fix: 'The committee concluded that the proposal was clearly sound and recommended that it be adopted at once.' },
  { s: 'Douglass argues that literacy is the pathway to freedom, and his own life totally backs this up.', slip: 'totally backs this up', fine: ['argues', 'the pathway to freedom', 'his own life'], fix: 'Douglass argues that literacy is the pathway to freedom, and his own life strongly supports this claim.' },
  { s: 'Swift exaggerates the cruelty of his society, and his proposal goes way overboard to expose its indifference.', slip: 'goes way overboard', fine: ['exaggerates', 'the cruelty of his society', 'to expose its indifference'], fix: 'Swift exaggerates the cruelty of his society, and his proposal deliberately goes too far to expose its indifference.' },
];

/** A casual sentence and four revisions: one academic and faithful, the others wrong in one way each. */
interface Revision {
  casual: string;
  right: string;
  /** Formal but saying something different. */
  changed: string;
  /** Still casual. */
  slangy: string;
  /** Personal and emotional, wrong for an analytical essay. */
  personal: string;
}
const REVISIONS: Revision[] = [
  {
    casual: 'Basically, Macbeth gets way too greedy for power and it totally ruins him.',
    right: 'Macbeth’s growing ambition overwhelms his judgement and ultimately destroys him.',
    changed: 'Macbeth’s modest ambition is quietly rewarded, and he ends the play secure and content.',
    slangy: 'Basically, Macbeth gets super greedy for power, and in the end it totally ruins him.',
    personal: 'I really feel like Macbeth gets far too greedy, and I hate watching it ruin him.',
  },
  {
    casual: 'The study shows that kids who read a lot do way better at school.',
    right: 'The study found that children who read frequently perform better at school.',
    changed: 'The study found that children who read frequently perform no better at school.',
    slangy: 'The study shows that kids who read loads of books do loads better at school.',
    personal: 'I loved this study, because it proves that kids like me who read do better.',
  },
  {
    casual: 'Swift’s essay is super dark, but it’s actually making fun of how the rich treat the poor.',
    right: 'Swift’s essay is grimly shocking, but its true target is the way the rich treat the poor.',
    changed: 'Swift’s essay is grimly shocking, and its true purpose is to praise the way the rich treat the poor.',
    slangy: 'Swift’s essay is seriously dark, but it’s really just roasting how rich people treat poor people.',
    personal: 'Swift’s essay honestly upset me, but I think he is making fun of how the rich treat the poor.',
  },
  {
    casual: 'Lots of people think social media is bad for teens, but the research is kind of mixed.',
    right: 'Many people believe social media harms teenagers, but the research is inconclusive.',
    changed: 'Many people believe social media harms teenagers, and the research firmly confirms it.',
    slangy: 'Loads of people reckon social media is bad news for teens, but the research is kinda mixed.',
    personal: 'I personally feel social media is awful for teens, though I admit the research is mixed.',
  },
  {
    casual: 'The ending of the poem kind of flips everything we thought before.',
    right: 'The final stanza reverses the meaning that the earlier stanzas seemed to establish.',
    changed: 'The final stanza repeats the meaning that the earlier stanzas had already established.',
    slangy: 'The last stanza totally flips everything we were thinking about the poem before that.',
    personal: 'I was so surprised by the ending, because it changed everything I thought before.',
  },
  {
    casual: 'Gatsby throws all these crazy parties just to get Daisy to notice him.',
    right: 'Gatsby hosts lavish parties chiefly in the hope of attracting Daisy’s attention.',
    changed: 'Gatsby hosts lavish parties chiefly to avoid ever being noticed by Daisy again.',
    slangy: 'Gatsby throws these totally wild parties, all just so Daisy will notice him, lol.',
    personal: 'I think it is so sad that Gatsby throws all those parties just to get Daisy’s attention.',
  },
];

function register(rng: Rng, d: Difficulty): GenOutput {
  const cast = people(rng, 1);
  if (d === 1) {
    const m = rng.pick(MESSAGES);
    const want = rng.pick(REGISTERS);
    return {
      prompt: `${cast[0].name} is writing about ${m.topic}. Which version suits **${CONTEXT[want]}**?`,
      parts: [part(mc(rng, m.versions[want], REGISTERS.filter((r) => r !== want).map((r) => m.versions[r])))],
      hints: ['Ask who will read or hear it, and why. An essay is impersonal; an email to a stranger is polite and direct; a speech speaks to the crowd; a message to a friend is relaxed.'],
      solution: [`The right version is ${FEATURES[want]}.`, `The others suit ${REGISTERS.filter((r) => r !== want).map((r) => READER[r]).join(', ')}.`],
    };
  }
  if (d === 2) {
    if (rng.chance(0.5)) {
      const m = rng.pick(MESSAGES);
      const want = rng.pick(REGISTERS);
      return {
        prompt: `${block(m.versions[want])}\n\nWhich best describes the register of this passage?`,
        parts: [part(fixedChoice(REGISTERS.map((r) => LABEL[r]), REGISTERS.indexOf(want)))],
        hints: ['Look at the vocabulary, at whether the writer speaks to someone directly, and at how carefully the sentence is punctuated.'],
        solution: [`${LABEL[want]}: it is ${FEATURES[want]}.`],
      };
    }
    const sl = rng.pick(SLIPS);
    return {
      prompt: `This sentence comes from a formal essay. Which phrase slips out of the formal register?\n\n${block(sl.s)}`,
      parts: [part(mc(rng, `“${sl.slip}”`, sl.fine.map((x) => `“${x}”`)))],
      hints: ['Read the sentence aloud. Which words would you say to a friend but not write in an essay?'],
      solution: [`“${sl.slip}” is casual.`, `A formal version: “${sl.fix}”`],
    };
  }
  if (rng.chance(0.3)) {
    const sl = rng.pick(SLIPS);
    const chosen = rng.sample(SLIPS.filter((x) => x !== sl), 3);
    const others = chosen.map((x) => x.s);
    return {
      prompt: 'Which sentence from a formal essay keeps a formal register throughout?',
      parts: [part(mc(rng, sl.fix, others))],
      hints: ['Look for one casual word or phrase in each sentence; the right one has none.'],
      solution: [`“${sl.fix}” is formal throughout.`, `Each of the others contains one casual phrase: ${chosen.map((x) => `“${x.slip}”`).join(', ')}.`],
    };
  }
  const rv = rng.pick(REVISIONS);
  return {
    prompt: `Revise this sentence for an analytical essay, keeping its meaning.\n\n${block(rv.casual)}\n\nWhich revision is best?`,
    parts: [part(mc(rng, rv.right, [rv.changed, rv.slangy, rv.personal]))],
    hints: ['The best revision is formal and impersonal, and it still says exactly what the original said.'],
    solution: [`“${rv.right}” is formal and keeps the meaning.`, 'Of the others, one is formal but changes what the sentence says, one is still casual, and one turns it into a personal reaction.'],
  };
}

export const REGISTER_SKILLS: SkillDef[] = [
  skill({
    id: 'e12-register',
    name: 'Register, tone and audience',
    description: 'Choose the register and tone that suit an audience and purpose, recognize a slip in register, and revise casual writing into academic prose without changing its meaning.',
    outcomes: OUTCOMES,
    lessonId: LESSON,
    format: 'mc',
    gen: register,
  }),
];
