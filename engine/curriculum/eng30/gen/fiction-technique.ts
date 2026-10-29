/**
 * Grade 12 English, lesson 1.1: Narrative Technique and Time (12-A1). Stream of consciousness,
 * multiple narrators, shifting focalization and external narration; how a story compresses and
 * expands time, and moves back and forward through it. Passages written for Gradileo and
 * public-domain stories (./stories.ts).
 */
import { mc, part, skill } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { block, fill, pair } from '../../eng10/gen/common.ts';
import {
  BARTLEBY, BART_NOTHING, BEAST, BEAST_CROUCHING, DEAD, DEAD_FUTURE, DEAD_LILY, DEAD_SYMBOL, KEW, KEW_FIFTEEN, KEW_SNAIL, MARK, MARK_OPENING, MARK_SWARM, SIOUX, SIOUX_NINE,
  quoteBlock, titled, type Excerpt,
} from './stories.ts';

const L = 'e12-1-1';
const OUT = ['12-A1'];

// ============================================================================ narrative technique

type Technique = 'stream' | 'multiple' | 'shifting' | 'external';
const TECHNIQUE: Record<Technique, string> = {
  stream: 'Stream of consciousness: one mind’s thoughts drifting from one association to the next',
  multiple: 'Multiple narrators: different characters each tell a part of the story in turn',
  shifting: 'Shifting focalization: the narration moves from one character’s view to another’s',
  external: 'External narration: only what could be seen and heard, with no one’s thoughts given',
};

/** Passages written for Gradileo, one technique each. */
const PASSAGES: Record<Technique, string[]> = {
  stream: [
    'Rain again. The bus late, of course, and my umbrella—where did I leave it? Grandmother had one with a carved duck’s head, I remember the smell of her coat, oranges and wool, and her kitchen clock that always ran fast. Is that the bus? No. A grey van, grey like that winter.',
    'The exam hall smells of floor polish. Question three—I knew this last night. Last night, the kettle, Mum asking if I wanted toast, the dog barking at nothing. Barking. Bark, a tree’s skin. Focus. Question three.',
    'Blue paint on my thumb still. Blue like the door of the house on Harbour Street, the one with the broken step, where we waited for the ferry that summer, and the ferry horn, low and long—is someone calling my name?',
  ],
  multiple: [
    'PART ONE: NAME. I never wanted to sell the farm. Father would have hated it.\nPART TWO: NAME2. NAME thinks I wanted the money. The truth is that I could not stand another winter there.',
    'NAME’s chapter: The night the bridge washed away, I was the one who rang the bell.\nNAME2’s chapter: Everyone says NAME rang the bell. I know who really woke the village.',
    'I. NAME speaks: I left the letter on the table so that someone would find it.\nII. NAME2 speaks: I found the letter on the table, and I burned it before anyone else could read it.',
  ],
  shifting: [
    'NAME watched the train pull away, certain that NAME2 would never write. On the train, NAME2 was already composing the first letter in {his2} head, unsure whether NAME would even open it.',
    'NAME was sure the interview had gone badly. Across the desk, NAME2 underlined NAME’s name twice and thought that this, at last, was the candidate the firm needed.',
    'From the stage, NAME saw only darkness and a blur of faces. In the third row, NAME2 was holding {his2} breath, willing NAME not to forget the second verse.',
  ],
  external: [
    'The man set two cups on the table. The woman did not look up. He poured the tea, sat down, and pushed one cup across to her. Outside, a dog barked twice.',
    'NAME opened the door, looked at the envelope in NAME2’s hand, and closed the door again. NAME2 stood on the step for a full minute, then slid the envelope under the door and walked away.',
    'The two players shook hands at the net. One of them smiled; the other did not. They walked off the court in opposite directions, and neither looked back.',
  ],
};

interface Effect {
  lead: string;
  excerpt: Excerpt;
  ask: string;
  answer: string;
  wrong: string[];
  why: string;
}
/** Public-domain passages: the technique and its effect (difficulty 2). */
const PD_TECHNIQUE: Effect[] = [
  {
    lead: `In ${titled(MARK)}, the narrator looks up at a mark on the wall and begins to think:`,
    excerpt: MARK_SWARM,
    ask: 'Which technique does the passage use, and to what effect?',
    answer: 'Stream of consciousness, so we follow the mind as one idea sets off the next',
    wrong: ['Multiple narrators, so several people argue about what the mark might be', 'External narration, so we see the room and never learn what anyone thinks', 'Shifting focalization, so the view passes from the narrator to the guests'],
    why: 'The whole story is the narrator’s thinking: the mark sets off fancies, memories and arguments that drift from one to the next. That is stream of consciousness, and it puts the mind itself at the centre of the story.',
  },
  {
    lead: `${titled(KEW)} begins with a long description of a flower bed. Then a couple walks past, and the narration follows the man’s thoughts:`,
    excerpt: KEW_FIFTEEN,
    ask: 'After this, the story turns to a snail in the flower bed, and then to two other people walking past. What is the main effect of this shifting focalization?',
    answer: 'Each passer-by’s inner life is glimpsed briefly, then left behind as the view moves on',
    wrong: ['The man becomes the narrator, and he tells the whole rest of the story himself', 'The snail is revealed to be the real narrator who has watched everyone all along', 'The story keeps the reader outside every character, reporting only their actions'],
    why: 'The narration enters one mind, then moves on: to the snail, then to other walkers. Each human story is a fragment, glimpsed for a moment beside the slow life of the flower bed.',
  },
  {
    lead: `${titled(DEAD)} opens in the hall of a house on the night of a party:`,
    excerpt: DEAD_LILY,
    ask: 'Why does the narrator say Lily was “literally” run off her feet, when she was not?',
    answer: 'The narration borrows Lily’s own way of talking, so we hear her voice in it',
    wrong: ['The narrator is careless with words and does not know what “literally” means', 'Lily has really been knocked off her feet by the guests rushing through the door', 'The narrator wants us to believe that Lily is lying about how hard she works'],
    why: '“Literally” is how a busy young maid might describe her own evening. The third-person narration takes on her idiom, a form of free indirect style: we hear Lily without her speaking.',
  },
  {
    lead: `Near the end of a party in ${titled(DEAD)}, Gabriel looks up at his wife, Gretta, who is listening to a song on the stairs:`,
    excerpt: DEAD_SYMBOL,
    ask: 'Through whose eyes do we see Gretta here, and what does that view leave out?',
    answer: 'Gabriel’s: he sees her as a picture, not knowing the memory the song has woken',
    wrong: ['Gretta’s own: she explains to the reader why the song affects her so deeply', 'A painter’s at the party: he asks Gabriel to let him paint Gretta on the stairs', 'Nobody’s: the narrator reports only what could be filmed, with no thoughts at all'],
    why: 'The narration is focalized through Gabriel, who turns his wife into “a symbol of something”. The reader later learns what he cannot see: the song has made her remember a young man who died.',
  },
  {
    lead: `The narrator of ${titled(BARTLEBY)} is the lawyer who employed Bartleby:`,
    excerpt: BART_NOTHING,
    ask: 'What is the main effect of having the employer, not Bartleby, tell the story?',
    answer: 'Bartleby stays a mystery, seen only from outside by a man who cannot explain him',
    wrong: ['We learn all of Bartleby’s private thoughts, because he trusts the lawyer completely', 'The story becomes a comedy, because the lawyer exaggerates everything Bartleby does', 'Bartleby can tell his own side later, because the lawyer hands the story over to him'],
    why: 'Everything we know comes from what the lawyer “saw”. He cannot see inside Bartleby, so the reader cannot either, and Bartleby remains a puzzle to the last page.',
  },
];

interface Choice2 { text: string; answer: string; wrong: string[]; why: string }
/** Which passage shows a named technique (difficulty 3), written for Gradileo. */
const EFFECT_GEN: Choice2[] = [
  {
    text: 'A novel tells the same wedding day three times: first through the bride, then through her father, then through the waiter who served them both.',
    answer: 'The reader sees how differently three people experience one day',
    wrong: ['The reader learns that two of the three narrators are lying', 'The reader is kept outside everyone’s thoughts and feelings', 'The reader gets one clear, settled account of what happened'],
    why: 'Telling one event through three people shows how much a story depends on who sees it; no single view is the whole truth.',
  },
  {
    text: 'A story about a family reunion never enters anyone’s mind. It reports only what each person says and does across one long dinner.',
    answer: 'The reader must infer the tensions from words and gestures alone',
    wrong: ['The reader hears each guest explain their feelings at length', 'The reader is told directly which character is in the right', 'The reader follows one guest’s flood of memories through dinner'],
    why: 'External narration leaves the reader to read the silences, glances and small gestures, as we would at a real dinner.',
  },
  {
    text: 'A story about a car accident moves through the driver’s mind as a stream of half-thoughts: the radio song, a childhood dog, the colour of the sky, the sound of brakes.',
    answer: 'The reader lives the moment inside the confusion of the driver’s mind',
    wrong: ['The reader gets a calm, ordered report of the accident’s causes', 'The reader learns how each witness saw the accident from the road', 'The reader stays outside the car and sees only what a camera could'],
    why: 'Stream of consciousness puts us inside the driver’s scattered, associative thinking at the moment of the crash.',
  },
];

function techniqueQ(rng: Rng, d: Difficulty) {
  if (d === 3) {
    if (rng.chance(0.5)) {
      const e = rng.pick(EFFECT_GEN);
      return {
        prompt: `${block(e.text)}\n\nWhat is the main effect of this narrative technique?`,
        parts: [part(mc(rng, e.answer, e.wrong))],
        hints: ['Name the technique first. Then ask what it lets the reader see, or keeps hidden.'],
        solution: [`${e.answer}.`, e.why],
      };
    }
    const e = rng.pick(PD_TECHNIQUE.slice(3));
    return {
      prompt: `${e.lead}\n\n${quoteBlock(e.excerpt)}\n\n${e.ask}`,
      parts: [part(mc(rng, e.answer, e.wrong))],
      hints: ['Ask whose eyes the passage looks through, and what that person cannot see or know.'],
      solution: [`${e.answer}.`, e.why],
    };
  }
  if (d === 2) {
    const e = rng.pick(PD_TECHNIQUE.slice(0, 3));
    return {
      prompt: `${e.lead}\n\n${quoteBlock(e.excerpt)}\n\n${e.ask}`,
      parts: [part(mc(rng, e.answer, e.wrong))],
      hints: ['Listen for whose words and thoughts fill the narration, and whether the view stays with one person or moves on.'],
      solution: [`${e.answer}.`, e.why],
    };
  }
  const t = rng.pick(Object.keys(PASSAGES) as Technique[]);
  const cast = pair(rng);
  const text = fill(rng.pick(PASSAGES[t]), cast);
  const others = (Object.keys(TECHNIQUE) as Technique[]).filter((x) => x !== t).map((x) => TECHNIQUE[x]);
  return {
    prompt: `${block(text)}\n\nWhich narrative technique does this passage use?`,
    parts: [part(mc(rng, TECHNIQUE[t], others))],
    hints: ['Is the passage inside one mind, passing between minds, split between tellers, or outside every mind?'],
    solution: [`${TECHNIQUE[t]}.`, {
      stream: 'The thoughts jump by association, with no tidy order: that is a mind’s stream of consciousness.',
      multiple: 'Each part is told by a different character in the first person, so the story has multiple narrators.',
      shifting: 'The narration is in the third person but moves from one character’s view and thoughts to another’s.',
      external: 'Only actions and speech are reported; we never learn what anyone thinks or feels.',
    }[t]],
  };
}

// ============================================================================ time

type Handling = 'compress' | 'expand' | 'analepsis' | 'prolepsis';
const HANDLING: Record<Handling, string> = {
  compress: 'Compression: a long stretch of time passes in a sentence or two',
  expand: 'Expansion: a brief moment is drawn out over many lines',
  analepsis: 'Analepsis (flashback): the telling jumps back into the past',
  prolepsis: 'Prolepsis (flash-forward): the telling jumps ahead in time',
};
const TIME_GEN: Record<Handling, string[]> = {
  compress: [
    'NAME planted the apple tree the spring {he} turned seven. Thirty summers later, {he} sat in its shade and watched {his} own children climb it.',
    'The years at the factory passed: winters, strikes, new machines, old friends retiring. By the time NAME looked up, {he} was the oldest worker on the floor.',
    'They wrote to each other every week for a decade, through two wars and four house moves, and then, one autumn, the letters simply stopped.',
  ],
  expand: [
    'The cup left NAME’s hand. It turned once in the air, catching the window light; NAME saw the blue rim, the chip near the handle, the tea leaving it in a thin brown ribbon; {he} heard {his} mother’s intake of breath; and still the cup had not reached the floor.',
    'In the second before the starting gun, NAME felt everything: the grit under {his} fingers, a bead of sweat at {his} temple, the crowd’s noise falling away, {his} own heartbeat counting down.',
    'The envelope lay on the table. NAME looked at the stamp, at {his} name in the familiar handwriting, at the torn corner, and could not yet bring {him}self to touch it.',
  ],
  analepsis: [
    'Standing at the station, NAME suddenly remembered the summer {he} was nine, when {his} father had lifted {him} onto his shoulders to watch the very first train pull in.',
    'The smell of oranges took NAME straight back to {his} grandmother’s kitchen in the winter of the great storm, when the power failed for three days.',
    'Before we go further, the reader should know what happened between the two brothers twenty years earlier, on the night of their father’s funeral.',
  ],
  prolepsis: [
    'NAME did not know it then, but the stranger on the bus would one day be the person {he} married.',
    'Years later, when the house had been sold and the garden built over, NAME would still dream of the pear tree by the gate.',
    'That handshake on the dock was the last time the two friends would ever see each other.',
  ],
};
/** Public-domain passages, one way of handling time each (difficulty 2). */
const TIME_PD: Array<{ lead: string; excerpt: Excerpt; kind: Handling; why: string }> = [
  { lead: `In ${titled(SIOUX)}, the narrator has described a winter night when his family planned his future. The next section begins:`, excerpt: SIOUX_NINE, kind: 'compress', why: 'Nine years pass in a single sentence: the narrator’s whole time at the mission school is compressed into a phrase about snow.' },
  { lead: `In ${titled(DEAD)}, Gabriel lies awake in a hotel room after the party and thinks about his old aunt, Julia:`, excerpt: DEAD_FUTURE, kind: 'prolepsis', why: 'Gabriel imagines a funeral that has not happened yet: the narration leaps ahead to a future he can already foresee.' },
  { lead: `In ${titled(KEW)}, a man walking past a flower bed thinks:`, excerpt: KEW_FIFTEEN, kind: 'analepsis', why: 'The man’s thoughts go back fifteen years to the afternoon he asked Lily to marry him: the telling steps back into the past.' },
  { lead: `In ${titled(KEW)}, a few minutes of a snail’s progress across the flower bed fill a long paragraph:`, excerpt: KEW_SNAIL, kind: 'expand', why: 'A couple of minutes in the life of a snail are given in close detail: a tiny moment is drawn out at length.' },
];

const TIME_EFFECT: Effect[] = [
  {
    lead: `In ${titled(SIOUX)}, the narrator’s years at the mission school pass in a sentence:`,
    excerpt: SIOUX_NINE,
    ask: 'What is the main effect of compressing these years so tightly?',
    answer: 'The years that remade him rush past, so his return home as a stranger feels abrupt',
    wrong: ['The years are unimportant, so the story can leave the mission school out of its meaning', 'The narrator cannot remember the school at all, so he invents a new past for himself', 'The family’s plan comes true at once, so his return home is calm and happy for them all'],
    why: 'The story skips the long change itself and lands us at its result. He walks into his father’s village a “stranger”, and the sudden jump makes the gap between who he was and who he is feel stark.',
  },
  {
    lead: `In ${titled(BEAST)}, John Marcher waits for something rare to happen to him. The narrator describes his life:`,
    excerpt: BEAST_CROUCHING,
    ask: 'Across the story, whole years pass between its chapters. What does this handling of time suggest about Marcher?',
    answer: 'His life slips away in long stretches while he waits for one great event',
    wrong: ['His life is crowded with adventures that the narrator has no space to describe', 'He is a hunter who travels the world, so years pass between his expeditions', 'He forgets each year as soon as it ends, because of an illness he has hidden'],
    why: 'The waiting fills the years, and the years pass almost unnoticed. The way time is handled mirrors his life: he lets it go by while he watches for “the Beast”.',
  },
  {
    lead: `In ${titled(MARK)}, the narrator begins by trying to date a memory:`,
    excerpt: MARK_OPENING,
    ask: 'What does this opening suggest about how the story will treat time?',
    answer: 'Time is measured by the mind’s memories, not by clocks and calendars',
    wrong: ['Time will be told in strict order, day by day, like the entries of a diary', 'Time will stand still, because nothing at all happens in the narrator’s room', 'Time will jump ahead to the narrator’s old age, where the story mainly takes place'],
    why: 'The narrator fixes the date only by remembering what she saw: the fire, the book, the chrysanthemums. In this story, time belongs to the mind.',
  },
  {
    lead: `In ${titled(DEAD)}, Gabriel imagines his aunt’s funeral before it has happened:`,
    excerpt: DEAD_FUTURE,
    ask: 'What does this leap forward in time show about Gabriel at this moment?',
    answer: 'He has begun to feel how close death is to everyone he knows',
    wrong: ['He is planning to cause his aunt’s death later that same night', 'He has forgotten that the party is over and his aunt is well', 'He is jealous of his aunt and hopes she will die very soon'],
    why: 'The imagined funeral belongs to his new awareness of mortality, which leads into the story’s final vision of the snow falling “upon all the living and the dead”.',
  },
];

function timeQ(rng: Rng, d: Difficulty) {
  if (d === 3) {
    const e = rng.pick(TIME_EFFECT);
    return {
      prompt: `${e.lead}\n\n${quoteBlock(e.excerpt)}\n\n${e.ask}`,
      parts: [part(mc(rng, e.answer, e.wrong))],
      hints: ['Ask what the story speeds through and what it slows down for, and what that choice says about the characters.'],
      solution: [`${e.answer}.`, e.why],
    };
  }
  const labels = (k: Handling) => (Object.keys(HANDLING) as Handling[]).filter((x) => x !== k).map((x) => HANDLING[x]);
  if (d === 2) {
    const t = rng.pick(TIME_PD);
    return {
      prompt: `${t.lead}\n\n${quoteBlock(t.excerpt)}\n\nHow does this passage handle time?`,
      parts: [part(mc(rng, HANDLING[t.kind], labels(t.kind)))],
      hints: ['Compare how much time passes in the story with how many words it takes, and ask whether the telling moves back or forward.'],
      solution: [`${HANDLING[t.kind]}.`, t.why],
    };
  }
  const k = rng.pick(Object.keys(TIME_GEN) as Handling[]);
  const text = fill(rng.pick(TIME_GEN[k]), pair(rng));
  return {
    prompt: `${block(text)}\n\nHow does this passage handle time?`,
    parts: [part(mc(rng, HANDLING[k], labels(k)))],
    hints: ['How much story time passes, and how many words does the passage spend on it? Does it look back, or ahead?'],
    solution: [`${HANDLING[k]}.`, {
      compress: 'Years pass in a few words: the story speeds through them.',
      expand: 'A second or two is slowed down and filled with detail.',
      analepsis: 'The passage leaves the present to show something from the past.',
      prolepsis: 'The passage tells us about something that will happen later.',
    }[k]],
  };
}

export const TECHNIQUE_SKILLS: SkillDef[] = [
  skill({
    id: 'e12-narrative-technique',
    name: 'Narrative technique',
    description: 'Recognize stream of consciousness, multiple narrators, shifting focalization and external narration, and explain their effect.',
    outcomes: OUT,
    lessonId: L,
    format: 'mc',
    gen: techniqueQ,
  }),
  skill({
    id: 'e12-time',
    name: 'Time in fiction',
    description: 'Analyse how a story compresses and expands time, and moves back and forward through it, and the effect.',
    outcomes: OUT,
    lessonId: L,
    format: 'mc',
    gen: timeQ,
  }),
];
