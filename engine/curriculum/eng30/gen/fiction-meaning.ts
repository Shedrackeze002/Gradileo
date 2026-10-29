/**
 * Grade 12 English, lesson 1.4: Ambiguity and Open Endings (12-A2). Deliberate ambiguity and the
 * evidence on each side of it; open, closed, ironic and epiphanic endings, and how an ending shapes
 * a story's meaning. Stories written for Gradileo and public-domain fiction (./stories.ts).
 */
import { mc, part, skill } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { block, fill, list, pair, q } from '../../eng10/gen/common.ts';
import {
  BARTLEBY, BART_ASTOR, BART_EASIEST, BART_LETTERS, BART_SAFE, BEAST, BEAST_MAN, DEAD, DEAD_FADING, DEAD_FUTURE, DEAD_GENERAL, DEAD_LILY, DEAD_TEARS, LADY, LADY_ENDING, MARK, MARK_SNAIL, OTHER,
  OTHER_ENDING, SIOUX, SIOUX_ENDING, SIOUX_NINE, SIOUX_STRANGER, SIOUX_WONDER, WIFE, WIFE_ENDING, quoteBlock, titled, type Excerpt, type Story,
} from './stories.ts';

const L = 'e12-1-4';
const OUT = ['12-A2'];

// ============================================================================ ambiguity

/** Stories written for Gradileo that leave one question deliberately open (difficulty 1). */
const OPEN_QUESTIONS: Array<{ text: string; open: string; settled: string[] }> = [
  {
    text: 'NAME wakes at night in {his} late grandmother’s house and finds the kitchen warm, the kettle steaming and two cups set out, though {he} lives there alone now. In the morning the cups are back on the shelf, dry and cold.',
    open: 'Whether the grandmother’s presence came back, or NAME only dreamed it',
    settled: ['Whether the grandmother is still alive and still living in the house with NAME', 'Whether NAME has been sharing the house with a lodger or a friend this year', 'Whether the house in the story once belonged to NAME’s own grandmother'],
  },
  {
    text: 'For twenty years NAME has said that {he} gave up the prize money to help a friend. At {his} funeral, the friend tells the mourners that {he} never received a penny, then looks at NAME’s photograph and quietly says, “But perhaps that was the point.”',
    open: 'Whether NAME lied about the gift, or gave it in a way no one saw',
    settled: ['Whether NAME was still alive on the day the friend spoke to the mourners', 'Whether NAME had won the prize money in the first place, all those years ago', 'Whether the friend made the journey to NAME’s funeral to speak at all'],
  },
  {
    text: 'NAME finds an old map in the attic with a cross drawn beside the lake. {He} digs there all summer and finds nothing. On the last day, {he} notices that {his} late father’s initials are carved into the tree that stands over the hole.',
    open: 'Whether the map was a real treasure map, or a father’s way to share a summer',
    settled: ['Whether NAME found the old map in the attic of the family’s house', 'Whether NAME spent the whole summer digging in the ground beside the lake', 'Whether NAME’s father had already died before the summer of the search'],
  },
  {
    text: 'The stranger who repairs the village clock refuses payment and leaves before dawn. From that day on, the clock runs perfectly, but NAME, who watched him work, swears that its hands had begun to move backwards.',
    open: 'Whether the stranger worked a kind of magic, or NAME misremembers',
    settled: ['Whether the stranger asked the village to pay him for repairing the clock', 'Whether the village clock kept good time after the stranger had mended it', 'Whether NAME was there to watch the stranger while he worked on the clock'],
  },
];

interface Side {
  story: Story;
  lead: string;
  reading: string;
  key: Excerpt;
  others: Excerpt[];
  why: string;
}
/** The detail that supports one reading of an ambiguous moment (difficulty 2). */
const SIDES: Side[] = [
  {
    story: DEAD, lead: 'The story ends with Gabriel lying awake beside Gretta after learning of her first love.',
    reading: 'the ending is hopeful, because Gabriel has grown more generous',
    key: DEAD_TEARS, others: [DEAD_FADING, DEAD_LILY, DEAD_FUTURE],
    why: '“Generous tears” and his recognition that “such a feeling must be love” suggest a man opened up by what he has learned.',
  },
  {
    story: DEAD, lead: 'The story ends with Gabriel lying awake beside Gretta after learning of her first love.',
    reading: 'the ending is bleak, because Gabriel’s sense of himself is dissolving',
    key: DEAD_FADING, others: [DEAD_TEARS, DEAD_LILY, DEAD_GENERAL],
    why: 'His “own identity was fading out into a grey impalpable world”: the solid world itself is “dissolving and dwindling”.',
  },
  {
    story: SIOUX, lead: 'The story ends as the narrator waits in a cell to be hanged.',
    reading: 'he dies still torn between the two worlds that shaped him',
    key: SIOUX_WONDER, others: [SIOUX_ENDING, SIOUX_NINE],
    why: 'He does not know whether “the loving Jesus” or “my warrior father” will receive him: he is still divided between the mission’s world and his people’s.',
  },
  {
    story: SIOUX, lead: 'The story ends as the narrator waits in a cell to be hanged.',
    reading: 'he meets his death with calm and courage',
    key: SIOUX_ENDING, others: [SIOUX_WONDER, SIOUX_STRANGER],
    why: '“My heart is strong. My face is calm. My eyes are dry”: the short, steady sentences show a man at peace with what is coming.',
  },
  {
    story: BARTLEBY, lead: 'The narrator never learns why Bartleby “would prefer not to”, but he offers one rumour.',
    reading: 'Bartleby’s despair grew out of his earlier work',
    key: BART_LETTERS, others: [BART_ASTOR, BART_EASIEST, BART_SAFE],
    why: 'The rumour that he sorted “dead letters” links his hopelessness to a job spent among messages that never reached the living.',
  },
];

/** Readings that weigh both sides (difficulty 3). */
const BOTH: Array<{ lead: string; excerpts: Excerpt[]; ask: string; answer: string; wrong: string[]; why: string }> = [
  {
    lead: `The last pages of ${titled(DEAD)} include both of these moments:`,
    excerpts: [DEAD_TEARS, DEAD_FADING],
    ask: 'Is the ending of the story hopeful or bleak?',
    answer: 'The text supports both: Gabriel grows more generous even as his old sense of himself dissolves',
    wrong: ['Clearly hopeful: nothing in the last pages suggests death, loss or any fading of the self', 'Clearly bleak: Gabriel feels nothing but anger at Gretta, and he means to leave her at once', 'Neither: the last pages describe only the weather, and they say nothing about Gabriel at all'],
    why: 'The “generous tears” and the “fading out” sit side by side. Joyce leaves both open, and a strong reading accounts for both rather than ignoring one.',
  },
  {
    lead: `The condemned narrator of ${titled(SIOUX)} waits for dawn. In the story’s last lines he says:`,
    excerpts: [SIOUX_WONDER, SIOUX_ENDING],
    ask: 'Does the narrator die at peace?',
    answer: 'The text holds both: a calm and steady courage, and an unresolved doubt about which world receives him',
    wrong: ['Clearly at peace: he has no doubts left, and he knows for certain where his soul will go after death', 'Clearly in despair: he weeps and pleads with the guard all night, and he begs to be set free', 'The story does not say: it ends before the narrator learns what is going to happen to him'],
    why: 'His face is “calm” and his heart “strong”, yet he asks whether Jesus or his warrior father will greet him. Zitkala-Ša leaves him between two worlds to the end.',
  },
  {
    lead: `Near the end of ${titled(BARTLEBY)}, the narrator shares the one thing he heard about Bartleby’s past:`,
    excerpts: [BART_LETTERS],
    ask: 'What does the story finally reveal about why Bartleby “would prefer not to”?',
    answer: 'Nothing certain: the rumour hints at despair, but the narrator cannot confirm it',
    wrong: ['That Bartleby was too ill to work, as his doctor told the narrator in a letter', 'That Bartleby was lazy and simply wanted to be paid for doing no work at all', 'That Bartleby hated the narrator and refused his orders to make him look foolish'],
    why: 'The narrator calls it “one vague report” and admits he “could never ascertain” its basis. The story withholds an answer on purpose.',
  },
];

function ambiguityQ(rng: Rng, d: Difficulty) {
  if (d === 3) {
    const b = rng.pick(BOTH);
    return {
      prompt: `${b.lead}\n\n${b.excerpts.map(quoteBlock).join('\n\n')}\n\n${b.ask}`,
      parts: [part(mc(rng, b.answer, b.wrong))],
      hints: ['A deliberately ambiguous moment gives evidence on more than one side. A strong reading accounts for all of it.'],
      solution: [`${b.answer}.`, b.why],
    };
  }
  if (d === 2) {
    const s = rng.pick(SIDES);
    return {
      prompt: `${s.lead} Some readers argue that ${s.reading}. Which detail from ${titled(s.story)} supports **this** reading?`,
      parts: [part(mc(rng, q(s.key.text), s.others.map((o) => q(o.text))))],
      hints: ['Some details support the opposite reading, and some support neither. Which one points the way this reading goes?'],
      solution: [q(s.key.text), s.why],
    };
  }
  const o = rng.pick(OPEN_QUESTIONS);
  const cast = pair(rng);
  return {
    prompt: `${block(fill(o.text, cast))}\n\nThis story is deliberately ambiguous. What does it leave open?`,
    parts: [part(mc(rng, fill(o.open, cast), o.settled.map((x) => fill(x, cast))))],
    hints: ['Some questions the story answers plainly. Which one does it give evidence on both sides of, and leave unanswered?'],
    solution: [`${fill(o.open, cast)}.`, 'The other questions are settled by the story’s own details; only this one has evidence on both sides.'],
  };
}

// ============================================================================ endings

type Ending = 'closed' | 'open' | 'ironic' | 'epiphany';
const ENDING: Record<Ending, string> = {
  closed: 'Closed: the main conflict is settled and its meaning is made clear',
  open: 'Open: the main conflict is left unresolved for the reader',
  ironic: 'Ironic: the outcome reverses what the characters expected',
  epiphany: 'Epiphanic: a character suddenly sees a truth they had missed',
};
const ENDING_GEN: Record<Ending, string[]> = {
  closed: [
    'After years apart, the two sisters meet at their mother’s grave, talk through their old quarrel, and agree to spend the holidays together. The last scene shows them laughing as they cook a family meal.',
    'The missing boy is found safe in the hills, the search party goes home, and NAME, who led the search, is thanked at a village dinner the next evening.',
  ],
  open: [
    'NAME stands at the station with two tickets: one for the city job, one for home. The train doors open. The story ends there.',
    'The letter that might explain everything lies unopened on the table as the last scene fades. We never learn what it says.',
  ],
  ironic: [
    'NAME spends {his} life savings on a lock that no thief can break. That night {he} locks {him}self out, and {he} has to sleep in the garden of {his} own house.',
    'The town builds a great wall to keep the river out. In the spring flood, the wall holds back the water that would have drained away, and the town floods.',
  ],
  epiphany: [
    'Sorting {his} late father’s papers, NAME finds every one of {his} school reports, carefully kept and marked in pencil. {He} suddenly understands that the father {he} thought indifferent had been watching all along.',
    'Halfway through {his} angry speech, NAME catches sight of {him}self in the window and sees, for the first time, that {he} has become the bully {he} once feared.',
  ],
};

interface EndEffect {
  story: Story;
  lead: string;
  excerpt: Excerpt;
  /** The question, when it is not “What does this ending do?” */
  ask?: string;
  answer: string;
  wrong: string[];
  why: string;
}
const ENDING_EFFECTS: EndEffect[] = [
  {
    story: LADY, lead: 'The lovers, both married to others, meet in secret in Moscow. The story ends:', excerpt: LADY_ENDING,
    answer: 'It refuses a neat ending: their love is real, but no way forward is in sight',
    wrong: ['It promises a happy ending: they will marry each other within a few weeks', 'It ends their affair: they agree to part for good and return to their families', 'It reveals a secret: Anna has known all along that Gurov is married to another'],
    why: 'The “solution” only “seemed” near; the “most complicated and difficult part” is “only just beginning”. Chekhov leaves the lovers, and the reader, on the road.',
  },
  {
    story: OTHER, lead: 'Waythorn has been uneasy about his wife’s two former husbands. In the last scene, both are in his library when she comes in and offers tea:', excerpt: OTHER_ENDING,
    ask: 'How does Waythorn meet the situation he had dreaded?',
    answer: 'With a rueful laugh, Waythorn accepts his place as one of the three husbands',
    wrong: ['With an angry shout, Waythorn orders both former husbands out of the house', 'With a sudden fall, Waythorn faints from the shock of meeting the other two men', 'With a bitter refusal, Waythorn leaves the room and the tea goes cold in his cup'],
    why: 'Taking “the third cup with a laugh”, he joins the arrangement he had dreaded. The ending is comic and ironic: he is now simply the third of her husbands.',
  },
  {
    story: WIFE, lead: 'Mr. Ryder has asked his guests what a man should do when the wife of his youth finds him again after many years. They answer that he should acknowledge her. Then:', excerpt: WIFE_ENDING,
    answer: 'The story Ryder told was his own, so his guests’ answer becomes his choice',
    wrong: ['The old woman turns out to be an actress whom Ryder hired to test his guests', 'The guests leave in anger, and Ryder is shut out of the society he once led', 'Ryder announces that he will marry Mrs. Dixon, just as everyone had expected'],
    why: 'By revealing that “I am the man”, Ryder turns his guests’ verdict into his own decision, and acknowledges his wife before the whole society.',
  },
  {
    story: MARK, lead: 'For pages, the narrator has drifted through thoughts set off by a mark on the wall. Someone standing near says, “I don’t see why we should have a snail on our wall.” The story ends:', excerpt: MARK_SNAIL,
    answer: 'After all the drifting thought, the answer is tiny and ordinary, which deflates the search',
    wrong: ['The snail proves that the narrator was right about the mark’s cause from the very start', 'The snail shows that the house is in danger and the family must leave it that same night', 'The snail is a secret message from the old owners, which the narrator decides to answer'],
    why: 'A grand journey of speculation ends with a plain fact: a snail. The anticlimax suggests that the thinking mattered more than the answer.',
  },
  {
    story: BEAST, lead: 'At May Bartram’s grave, John Marcher at last understands what his rare fate was:', excerpt: BEAST_MAN,
    ask: 'What does Marcher realize his rare fate has been?',
    answer: 'His great fate was to be the man to whom nothing at all happened',
    wrong: ['His great fate was to be killed by a wild animal in a jungle abroad', 'His great fate was to win May’s love after she had refused him twice', 'His great fate was to become famous for a discovery he had made'],
    why: 'The “rare stroke” he waited for turns out to be the emptiness of his own life: the waiting itself. The ending is both an epiphany and a bitter irony.',
  },
];

/** Public-domain endings and the types each clearly is (difficulty 3). */
const PD_ENDINGS: Array<{ story: Story; text: string; types: Ending[] }> = [
  { story: LADY, text: 'The lovers face a long, hard road, with no solution yet in sight.', types: ['open'] },
  { story: OTHER, text: 'Waythorn, who wanted his wife’s past kept at a distance, ends up taking tea with both of her former husbands.', types: ['ironic'] },
  { story: WIFE, text: 'Mr. Ryder presents the old woman to his guests as the wife of his youth, and so settles his dilemma.', types: ['closed'] },
  { story: BEAST, text: 'At May’s grave, Marcher sees at last that the rare fate he waited for was to miss love altogether.', types: ['epiphany', 'ironic'] },
];

function endingsQ(rng: Rng, d: Difficulty) {
  if (d === 3) {
    const want = rng.pick(['open', 'ironic', 'epiphany'] as Ending[]);
    const right = PD_ENDINGS.find((e) => e.types[0] === want)!;
    const others = PD_ENDINGS.filter((e) => e !== right && !e.types.includes(want));
    const show = (e: (typeof PD_ENDINGS)[number]) => `${titled(e.story)}: ${e.text}`;
    return {
      prompt: `Which of these endings is the clearest example of an **${ENDING[want].split(':')[0].toLowerCase()}** ending? (${ENDING[want].replace(/^[A-Za-z]+: /, '')}.)`,
      parts: [part(mc(rng, show(right), others.map(show)))],
      hints: ['Ask of each ending: is the conflict settled, left open, reversed, or suddenly understood?'],
      solution: [`${show(right)}`, `${ENDING[want]}. The others are ${list(others.map((o) => ENDING[o.types[0]].split(':')[0].toLowerCase()))} endings.`],
    };
  }
  if (d === 2) {
    const e = rng.pick(ENDING_EFFECTS);
    return {
      prompt: `${titled(e.story)}: ${e.lead}\n\n${quoteBlock(e.excerpt)}\n\n${e.ask ?? 'What does this ending do?'}`,
      parts: [part(mc(rng, e.answer, e.wrong))],
      hints: ['Compare the ending with what the story led the characters, and the reader, to expect.'],
      solution: [`${e.answer}.`, e.why],
    };
  }
  const k = rng.pick(Object.keys(ENDING_GEN) as Ending[]);
  const text = fill(rng.pick(ENDING_GEN[k]), pair(rng));
  return {
    prompt: `${block(text)}\n\nWhat kind of ending is this?`,
    parts: [part(mc(rng, ENDING[k], (Object.keys(ENDING) as Ending[]).filter((x) => x !== k).map((x) => ENDING[x])))],
    hints: ['Is the conflict settled, left hanging, turned upside down, or suddenly understood by a character?'],
    solution: [`${ENDING[k]}.`, {
      closed: 'The conflict is resolved and the story tells us how things stand.',
      open: 'The story stops before the conflict is resolved, leaving the reader to imagine what follows.',
      ironic: 'The outcome is the opposite of what the character intended or expected.',
      epiphany: 'The ending turns on a sudden moment of understanding.',
    }[k]],
  };
}

export const MEANING_SKILLS: SkillDef[] = [
  skill({
    id: 'e12-ambiguity',
    name: 'Ambiguity',
    description: 'Recognize deliberate ambiguity and the details that support each reading, and account for both in an interpretation.',
    outcomes: OUT,
    lessonId: L,
    format: 'mc',
    gen: ambiguityQ,
  }),
  skill({
    id: 'e12-endings',
    name: 'Endings',
    description: 'Recognize closed, open, ironic and epiphanic endings, and explain how an ending shapes a story’s meaning.',
    outcomes: OUT,
    lessonId: L,
    format: 'mc',
    gen: endingsQ,
  }),
];
