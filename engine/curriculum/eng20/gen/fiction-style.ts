/**
 * Grade 11 English, lesson 1.5: Style: Diction, Syntax and Tone (11-A2). How word choice creates
 * tone, and the effects of sentence length and structure: short sentences, periodic sentences,
 * fragments, repetition, polysyndeton and rhetorical questions. Passages written for Gradileo and
 * public-domain stories (./stories.ts).
 */
import { mc, part, skill } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { block, fill, pair } from '../../eng10/gen/common.ts';
import {
  ARABY, ARABY_SUMMONS, BOAT, BOAT_BATHTUB, BOAT_DROWNED, BOAT_OILER, BOAT_OPENING, BRILL, BRILL_ENDING, BROWN, BROWN_ANGEL, BROWN_CHANGE, BROWN_GRAVE, FROG, FROG_ABSURD, PARTY, PARTY_LIFE,
  quoteBlock, titled, type Excerpt,
} from './stories.ts';

const L = 'e11-1-5';
const OUT = ['11-A2'];

// ============================================================================ diction and tone

type Tone = 'nostalgic' | 'bitter' | 'reverent' | 'playful' | 'clinical' | 'sarcastic' | 'admiring';
const TONE_WORD: Record<Tone, string> = {
  nostalgic: 'Nostalgic',
  bitter: 'Bitter',
  reverent: 'Reverent',
  playful: 'Playful',
  clinical: 'Detached and clinical',
  sarcastic: 'Sarcastic',
  admiring: 'Admiring',
};
/** Tones far enough from each one to be fair wrong answers. */
const FAR: Record<Tone, Tone[]> = {
  nostalgic: ['clinical', 'sarcastic', 'bitter'],
  bitter: ['admiring', 'playful', 'reverent'],
  reverent: ['sarcastic', 'playful', 'bitter'],
  playful: ['bitter', 'reverent', 'clinical'],
  clinical: ['nostalgic', 'playful', 'admiring'],
  sarcastic: ['reverent', 'admiring', 'nostalgic'],
  admiring: ['sarcastic', 'bitter', 'clinical'],
};
interface TonePassage {
  tone: Tone;
  text: string;
  /** The words that do most to create the tone, and three that do little. */
  key: string;
  neutral: string[];
  why: string;
  /** The tone is spread through all the wording, so no single phrase is asked about. */
  noKey?: boolean;
}
const TONE_PASSAGES: TonePassage[] = [
  { tone: 'nostalgic', text: 'Those long summers at my grandmother’s house: the creak of the porch swing, the smell of rain on hot stone, the radio murmuring in the kitchen. I would give anything to sit on that step again.', key: 'I would give anything', neutral: ['porch swing', 'kitchen', 'step'], why: 'The fond sensory details and the longing of “I would give anything” look back on a lost past with affection.' },
  { tone: 'nostalgic', text: 'NAME still keeps the ticket stub from the old cinema on Market Street, long since torn down. Sometimes {he} takes it out and remembers the velvet seats, the flickering light and the friends who sat beside {him}, scattered now across the world.', key: 'long since torn down', neutral: ['ticket stub', 'Market Street', 'seats'], why: 'The memories are tender, and “long since torn down” and “scattered now” stress that the past cannot come back.' },
  { tone: 'bitter', text: 'Of course they promoted Davis. Davis, who has never once arrived before ten and takes credit for every idea he overhears. Hard work, it turns out, is for fools like me.', key: 'fools like me', neutral: ['promoted', 'before ten', 'idea'], why: '“Of course” and “fools like me” show resentment and a sense of unfairness turned against the speaker.' },
  { tone: 'bitter', text: 'They thanked me for my thirty years of service with a cake, a card and a parking space I would never need again. Thirty years, and the card had my name spelled wrong.', key: 'spelled wrong', neutral: ['cake', 'card', 'service'], why: 'The flat list of small gifts and the final detail of the misspelled name show how little the speaker feels valued.' },
  { tone: 'reverent', text: 'The old cathedral rose above the town in the evening light, each stone laid by hands long gone, and even the noisy tourists fell silent as they stepped inside.', key: 'fell silent', neutral: ['town', 'evening', 'tourists'], why: 'The building is described with awe, and the visitors’ silence shows a deep, respectful wonder.' },
  { tone: 'reverent', text: 'NAME placed the flowers at the foot of the memorial and stood for a long moment with {his} head bowed, reading each of the names cut into the stone.', key: 'head bowed', neutral: ['flowers', 'moment', 'stone'], why: 'The slow, quiet gestures and the bowed head show deep respect for the dead.' },
  { tone: 'playful', text: 'My cat, Captain Whiskers, has appointed himself Inspector of All Boxes. No parcel enters this house without his personal approval, usually given from the inside.', key: 'Inspector of All Boxes', neutral: ['parcel', 'house', 'cat'], why: 'The mock-official title and the joke about inspecting from inside the box make the tone light and humorous.' },
  { tone: 'playful', text: 'NAME’s little brother announced that he would be a dinosaur until further notice, and roared at the postman, the neighbours and, with particular ferocity, the vacuum cleaner.', key: 'with particular ferocity', neutral: ['postman', 'neighbours', 'brother'], why: 'Treating a small child’s game with grand, formal words creates gentle comedy.' },
  { tone: 'clinical', text: 'The patient, aged forty-two, was admitted with a fever of 39 degrees. Blood samples were taken at 14:10. No further symptoms were recorded overnight.', key: 'No further symptoms were recorded', neutral: ['forty-two', 'samples', 'overnight'], noKey: true, why: 'Numbers, passive verbs and the absence of any feeling make the account detached and clinical.' },
  { tone: 'clinical', text: 'The subject entered the room at 9:02, sat in the second chair and answered eleven of the twelve questions. Total time: four minutes.', key: 'The subject', neutral: ['room', 'chair', 'questions'], why: 'Calling a person “the subject” and reducing the scene to times and counts strips away all emotion.' },
  { tone: 'sarcastic', text: 'Oh, wonderful. Another meeting about why we have too many meetings. I can hardly contain my excitement.', key: 'I can hardly contain my excitement', neutral: ['meeting', 'another', 'many'], why: 'The speaker says the opposite of what they mean: the “excitement” is mock enthusiasm for something dull.' },
  { tone: 'sarcastic', text: 'Thank you so much, NAME2, for telling the whole class my secret. Truly, what would I do without a friend like you?', key: 'what would I do without a friend like you?', neutral: ['class', 'secret', 'telling'], why: 'The overdone gratitude means its opposite: the speaker is furious.' },
  { tone: 'admiring', text: 'NAME never raised {his} voice, yet the whole team listened when {he} spoke. {He} knew every player’s name, every injury, every small victory, and {he} never once took the credit.', key: 'never once took the credit', neutral: ['team', 'player’s name', 'voice'], why: 'Each detail praises NAME’s quiet leadership, building to {his} modesty.' },
];

interface PdTone {
  lead: string;
  excerpt: Excerpt;
  answer: string;
  wrong: string[];
  /** For the d3 word question: the word that reveals the tone, and others that do not. */
  key?: string;
  neutral?: string[];
  why: string;
}
const PD_TONES: PdTone[] = [
  { lead: `In ${titled(BROWN)}, Goodman Brown has just promised himself to be good after tonight’s secret errand:`, excerpt: BROWN_ANGEL, answer: 'Ironic: the narrator does not really think the resolve is “excellent”', wrong: ['Admiring: the narrator praises Brown’s good intentions', 'Joyful: the narrator celebrates Brown’s marriage', 'Neutral: the narrator reports the facts without comment'], key: 'excellent', neutral: ['future', 'haste', 'himself'], why: 'Calling the resolve “excellent” while it excuses an “evil purpose” is ironic: the narrator sees through Brown’s self-deception.' },
  { lead: `In ${titled(BOAT)}, four shipwrecked men are tossed about in a tiny lifeboat:`, excerpt: BOAT_BATHTUB, answer: 'Wry and darkly humorous, understating a deadly situation', wrong: ['Cheerful and carefree', 'Furious and accusing', 'Calm and admiring'], key: 'bath-tub', neutral: ['man', 'boat', 'sea'], why: 'Comparing the lifeboat to a bath-tub turns mortal danger into a dry joke, which makes the danger feel sharper.' },
  { lead: `The narrator of ${titled(FROG)} watches Simon Wheeler tell his long tale with a perfectly straight face:`, excerpt: FROG_ABSURD, answer: 'Amused and gently mocking', wrong: ['Frightened', 'Grief-stricken', 'Angry and bitter'], key: 'exquisitely absurd', neutral: ['spectacle', 'man', 'yarn'], why: '“Exquisitely absurd” shows the narrator’s delight in how comic Wheeler’s seriousness is.' },
  { lead: `${titled(BROWN)} ends:`, excerpt: BROWN_GRAVE, answer: 'Grim and bleak', wrong: ['Hopeful and uplifting', 'Playful and light', 'Excited and suspenseful'], key: 'gloom', neutral: ['procession', 'neighbors', 'grandchildren'], why: 'The life ends with “no hopeful verse” and a dying hour that “was gloom”: the last word seals the bleak tone.' },
  { lead: `The adult narrator of ${titled(ARABY)} remembers his boyhood love:`, excerpt: ARABY_SUMMONS, answer: 'Rueful and gently ironic about his younger self', wrong: ['Bitter and full of hatred for the girl', 'Coldly scientific', 'Triumphant and proud'], key: 'foolish', neutral: ['spoken', 'casual', 'name'], why: '“Foolish blood” shows an older man smiling sadly at the passion he once felt.' },
];

function toneQ(rng: Rng, d: Difficulty) {
  if (d === 3) {
    const t = rng.pick(PD_TONES.filter((p) => p.key));
    return {
      prompt: `${t.lead}\n\n${quoteBlock(t.excerpt)}\n\nWhich word or phrase does most to create the passage’s tone?`,
      parts: [part(mc(rng, `“${t.key}”`, t.neutral!.map((w) => `“${w}”`)))],
      hints: ['Look for the word that carries an attitude or a judgement, not one that only names a person, thing or time.'],
      solution: [`“${t.key}” carries the attitude.`, t.why],
    };
  }
  if (d === 2) {
    if (rng.chance(0.5)) {
      const t = rng.pick(PD_TONES);
      return {
        prompt: `${t.lead}\n\n${quoteBlock(t.excerpt)}\n\nWhich best describes the **tone** of this passage?`,
        parts: [part(mc(rng, t.answer, t.wrong))],
        hints: ['Tone is the writer’s or narrator’s attitude. Notice the words that judge, exaggerate or understate.'],
        solution: [t.answer.split(':')[0] + '.', t.why],
      };
    }
    const cast = pair(rng);
    const p = rng.pick(TONE_PASSAGES.filter((t) => !t.noKey));
    return {
      prompt: `${block(fill(p.text, cast))}\n\nWhich word or phrase does most to create the tone?`,
      parts: [part(mc(rng, `“${fill(p.key, cast)}”`, p.neutral.map((w) => `“${fill(w, cast)}”`)))],
      hints: ['Look for the words that carry feeling or judgement, not the ones that simply name things.'],
      solution: [`“${fill(p.key, cast)}” carries the attitude.`, fill(p.why, cast)],
    };
  }
  const cast = pair(rng);
  const p = rng.pick(TONE_PASSAGES);
  return {
    prompt: `${block(fill(p.text, cast))}\n\nWhich word best describes the **tone** of this passage?`,
    parts: [part(mc(rng, TONE_WORD[p.tone], rng.shuffle(FAR[p.tone]).map((t) => TONE_WORD[t])))],
    hints: ['Tone is the attitude behind the words. Ask how the writer feels about what they describe.'],
    solution: [`The tone is ${TONE_WORD[p.tone].toLowerCase()}.`, fill(p.why, cast)],
  };
}

// ============================================================================ syntax

type Syntax = 'short' | 'periodic' | 'fragments' | 'anaphora' | 'polysyndeton' | 'questions';
const SYNTAX_NAME: Record<Syntax, string> = {
  short: 'Short, simple sentences',
  periodic: 'A periodic sentence: the main clause is held back until the end',
  fragments: 'Sentence fragments',
  anaphora: 'Repetition at the start of clauses (anaphora)',
  polysyndeton: 'Many “and”s joining a long list (polysyndeton)',
  questions: 'A run of questions',
};
/** Techniques that overlap are never set against each other: fragments are short, and polysyndeton repeats a word. */
const SYNTAX_FAR: Record<Syntax, Syntax[]> = {
  short: ['periodic', 'polysyndeton', 'questions'],
  periodic: ['short', 'fragments', 'questions'],
  fragments: ['periodic', 'polysyndeton', 'questions'],
  anaphora: ['periodic', 'fragments', 'questions'],
  polysyndeton: ['short', 'fragments', 'periodic'],
  questions: ['periodic', 'polysyndeton', 'fragments'],
};
interface SyntaxPassage {
  kind: Syntax;
  text: string;
  effect: string;
  wrong: string[];
}
const SYNTAX_PASSAGES: SyntaxPassage[] = [
  { kind: 'short', text: 'NAME ran. {He} did not look back. Behind {him}, the bridge gave way.', effect: 'They create speed and urgency.', wrong: ['They slow the moment down for careful description.', 'They show that NAME is calm and relaxed.', 'They give background about NAME’s past.'] },
  { kind: 'short', text: 'The phone rang. NAME answered. It was the hospital.', effect: 'Each short sentence lands like a blow, building to the shock of the last one.', wrong: ['They make the scene feel slow and dreamy.', 'They show that NAME is confused about what happened.', 'They add humour to a light-hearted moment.'] },
  { kind: 'periodic', text: 'Through the smoke, past the shouting firefighters, over the fallen beam and the broken glass, crawling on {his} hands and knees, NAME reached the door.', effect: 'Holding back the main clause builds suspense about whether NAME will make it.', wrong: ['It speeds the scene up by leaving out detail.', 'It shows that the fire is small and harmless.', 'It makes the reader laugh at NAME’s clumsiness.'] },
  { kind: 'periodic', text: 'After three years of training, two failed attempts, one broken wrist and a thousand cold mornings on the river, NAME won the race.', effect: 'Listing everything before the main clause makes the victory feel hard-won and long awaited.', wrong: ['It suggests that NAME won easily.', 'It hides who won until the next chapter.', 'It shows that NAME has given up rowing.'] },
  { kind: 'fragments', text: 'Silence. Then a knock. Then another, louder.', effect: 'Each detail is isolated, so the tension rises with every sound.', wrong: ['They show a cheerful, noisy party.', 'They summarize a long stretch of time.', 'They show that the narrator is not paying attention.'] },
  { kind: 'fragments', text: 'The village after the flood. Mud on every step. A child’s shoe in the road. No one in sight.', effect: 'The fragments work like snapshots, each one a stark image of loss.', wrong: ['They describe the village’s busy market day.', 'They speed up an exciting chase.', 'They explain the causes of the flood.'] },
  { kind: 'anaphora', text: 'We waited through the rain, we waited through the night, we waited until the boats came home.', effect: 'The repeated “we waited” stresses how long and hard the waiting was.', wrong: ['It shows that the waiting was short and easy.', 'It introduces a new character.', 'It adds humour to a happy scene.'] },
  { kind: 'anaphora', text: 'She remembered the house. She remembered the garden. She remembered the voice that had called her in at dusk.', effect: 'The repeated opening builds feeling with each memory, leading to the most important one.', wrong: ['It shows that she has forgotten her childhood.', 'It speeds up the action of a chase.', 'It gives the scientific facts about the house.'] },
  { kind: 'polysyndeton', text: 'And the wind howled and the windows rattled and the dog barked and the baby cried and still the power did not come back.', effect: 'The pile-up of “and”s makes the chaos feel overwhelming and endless.', wrong: ['It makes the night feel calm and peaceful.', 'It slows the story down to explain the storm’s causes.', 'It shows that only one thing is happening.'] },
  { kind: 'questions', text: 'Where had they gone? Why had no one called? What was {he} supposed to tell their mother?', effect: 'The run of questions shows NAME’s rising panic and confusion.', wrong: ['They show that NAME knows exactly what happened.', 'They are a quiz for the reader to answer.', 'They make the scene humorous.'] },
];

interface PdSyntax {
  lead: string;
  excerpt: Excerpt;
  ask: string;
  answer: string;
  wrong: string[];
  why: string;
}
const PD_SYNTAX: PdSyntax[] = [
  { lead: `${titled(BOAT)} begins:`, excerpt: BOAT_OPENING, ask: 'What is the effect of the short, plain first sentence?', answer: 'It shows at once how completely the men’s attention is fixed on the dangerous waves.', wrong: ['It suggests that the men are enjoying a calm day at sea.', 'It slows the story down to describe the sky in detail.', 'It tells the reader that the men will be rescued.'], why: 'Not one of them has looked up at the sky: a single flat statement shows how fully the waves hold their eyes, and their fear.' },
  { lead: `In ${titled(BOAT)}, the men struggle through the surf towards the beach. Then:`, excerpt: BOAT_OILER, ask: 'What is the effect of putting “lay the oiler” at the end of the first sentence?', answer: 'Delaying the subject makes the discovery of the oiler’s body land with quiet shock.', wrong: ['It hides who is lying there until the next chapter.', 'It makes the scene feel cheerful and relieved.', 'It shows that the oiler is only resting.'], why: 'The reader sees the place and position first, “in the shallows, face downward”, before learning who it is: the inverted order makes the death strike at the last moment.' },
  { lead: `After his night in the forest, Goodman Brown returns to Salem a changed man:`, excerpt: BROWN_CHANGE, ask: 'What is the effect of the long, inverted sentence?', answer: 'The piled-up adjectives, each darker than the last, stress how completely Brown has changed.', wrong: ['It shows that Brown has barely changed at all.', 'It speeds up the story with a quick summary of events.', 'It makes the ending feel light and comic.'], why: '“A stern, a sad, a darkly meditative, a distrustful, if not a desperate man” builds like a slow toll, and the inverted “did he become” holds the verb back to the end.' },
  { lead: `At the end of ${titled(PARTY)}, Laura tries to tell her brother what she felt on seeing the dead man:`, excerpt: PARTY_LIFE, ask: 'What is the effect of the unfinished sentence?', answer: 'Breaking off shows a feeling too large and new for Laura to put into words.', wrong: ['It shows that Laura has been interrupted by a noise.', 'It suggests that Laura is bored and does not care.', 'It is a printing error in the text.'], why: 'Laura stops mid-sentence twice, and the narrator confirms she “couldn’t explain”: the broken syntax carries her overwhelming epiphany.' },
  { lead: `In ${titled(BOAT)}, the exhausted correspondent sees the shore he may never reach:`, excerpt: BOAT_DROWNED, ask: 'What is the effect of repeating “if I am going to be drowned”?', answer: 'The repetition captures his exhausted, circling and indignant thoughts.', wrong: ['It shows that he is calm and certain he will survive.', 'It is a song the sailors sing to keep time with the oars.', 'It speeds the story towards a happy ending.'], why: 'He keeps returning to the same phrase, unable to move past it, until his frustration bursts out at the “seven mad gods who rule the sea”.' },
  { lead: `At the end of ${titled(BRILL)}, Miss Brill gets home after being mocked in the park:`, excerpt: BRILL_ENDING, ask: 'What is the effect of repeating “quickly” at the start of the second clause?', answer: 'It shows her hurry to hide something that now hurts to look at.', wrong: ['It shows that she is in a hurry to go back out to the park.', 'It slows the moment down to show she is calm.', 'It suggests she is excited about tomorrow.'], why: '“Quickly; quickly, without looking”: the doubled word and “without looking” show her rushing to put the fur, and the humiliation, out of sight.' },
];

function syntaxQ(rng: Rng, d: Difficulty) {
  if (d === 3) {
    const s = rng.pick(PD_SYNTAX);
    return {
      prompt: `${s.lead}\n\n${quoteBlock(s.excerpt)}\n\n${s.ask}`,
      parts: [part(mc(rng, s.answer, s.wrong))],
      hints: ['First describe the sentence: its length, order, repetition or what is missing. Then ask how that shape makes the reader feel.'],
      solution: [s.answer, s.why],
    };
  }
  const cast = pair(rng);
  const p = rng.pick(SYNTAX_PASSAGES);
  if (d === 2) {
    return {
      prompt: `${block(fill(p.text, cast))}\n\nWhat is the main effect of the sentence structure here?`,
      parts: [part(mc(rng, fill(p.effect, cast), p.wrong.map((w) => fill(w, cast))))],
      hints: ['Notice the length and shape of the sentences, then ask how that shape changes the pace or the feeling.'],
      solution: [`${SYNTAX_NAME[p.kind]}.`, fill(p.effect, cast)],
    };
  }
  return {
    prompt: `${block(fill(p.text, cast))}\n\nWhich technique of sentence structure does this passage use?`,
    parts: [part(mc(rng, SYNTAX_NAME[p.kind], rng.shuffle(SYNTAX_FAR[p.kind]).map((k) => SYNTAX_NAME[k])))],
    hints: ['Look at the length of the sentences, where the main clause comes, and any words that repeat.'],
    solution: [`The passage uses this: ${SYNTAX_NAME[p.kind].replace(/^./, (c) => c.toLowerCase())}.`, fill(p.effect, cast)],
  };
}

export const STYLE_SKILLS: SkillDef[] = [
  skill({
    id: 'e11-diction-tone',
    name: 'Diction and tone',
    description: 'Describe a passage’s tone and identify the words that create it.',
    outcomes: OUT,
    lessonId: L,
    format: 'mc',
    gen: toneQ,
  }),
  skill({
    id: 'e11-syntax-effect',
    name: 'Syntax and its effects',
    description: 'Recognize sentence techniques such as short sentences, periodic sentences, fragments, repetition and polysyndeton, and explain their effect.',
    outcomes: OUT,
    lessonId: L,
    format: 'mc',
    gen: syntaxQ,
  }),
];
