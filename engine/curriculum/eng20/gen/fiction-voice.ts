/**
 * Grade 11 English, lesson 1.3: Narrative Voice and Perspective (11-A1). Free indirect style, shifts
 * of perspective, what a narrator's voice reveals, and how reliable a narrator is. Narrators written
 * for Gradileo and public-domain stories (./stories.ts).
 */
import { mc, part, skill } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { block, fill, pair, q } from '../../eng10/gen/common.ts';
import {
  ARABY, ARABY_SUMMONS, ARABY_UNCLE, BRILL, BRILL_CUPBOARDS, BRILL_FUR, FROG, FROG_WHEELER, HERON, HERON_LOOK, PARTY, PARTY_EYESORE, PARTY_KNOW, PARTY_PRETEND, WALLPAPER,
  PAPER_BARS, PAPER_CAME_OUT, PAPER_CAREFUL, PAPER_FAINTED, PAPER_HAUNTED, PAPER_JOHN, PAPER_PATTERN, PAPER_SHAKES, quoteBlock, titled, type Excerpt,
} from './stories.ts';

const L = 'e11-1-3';
const OUT = ['11-A1'];

// ============================================================================ narrative voice

/** One moment told four ways: free indirect style, direct thought, reported thought and plain narration. */
interface Forms {
  context: string;
  fis: string;
  direct: string;
  reported: string;
  plain: string;
}
const FORMS: Forms[] = [
  {
    context: 'NAME turned over the exam paper.',
    fis: 'Question one—easy, surely! {He} had practised it a hundred times.',
    direct: '“I’ve practised this a hundred times,” {he} thought.',
    reported: '{He} thought that {he} had practised the first question many times.',
    plain: '{He} picked up {his} pen and began to write.',
  },
  {
    context: 'NAME stood at the bus stop as the rain came down harder.',
    fis: 'Late again, of course. Why did the number 9 never, ever come?',
    direct: '“Why is the bus always late?” {he} wondered.',
    reported: '{He} wondered why the bus was always late.',
    plain: '{He} pulled up {his} hood and checked the timetable.',
  },
  {
    context: 'NAME looked round the crowded hall for {his} sister.',
    fis: 'There she was at last—and wearing that ridiculous hat again!',
    direct: '“She’s wearing that hat again,” {he} thought.',
    reported: '{He} noticed that {his} sister was wearing the same hat again.',
    plain: '{He} waved and walked towards the front of the hall.',
  },
  {
    context: 'The phone rang for the third time. NAME stared at it.',
    fis: 'Three times in an hour! What on earth could Mr. Okafor want now?',
    direct: '“What does he want now?” {he} asked {him}self.',
    reported: '{He} wondered what Mr. Okafor could want.',
    plain: 'At last {he} picked it up.',
  },
];

interface Voice {
  lead: string;
  excerpt: Excerpt;
  ask: string;
  answer: string;
  wrong: string[];
  why: string;
}
/** Sentences in free indirect style, and whose attitude they carry. */
const WHOSE: Voice[] = [
  {
    lead: `In ${titled(PARTY)}, the Sheridans’ servants have just told Laura about the poor neighbour who was killed. The narrator describes the cottages where he lived:`,
    excerpt: PARTY_EYESORE,
    ask: 'Whose attitude does this sentence express?',
    answer: 'The Sheridan family’s snobbish view, slipped into the narration',
    wrong: ['The narrator’s own judgement, which the story asks us to share', 'Laura’s sympathy for the dead man’s family', 'The cottagers’ pride in their homes'],
    why: '“The greatest possible eyesore” and “no right to be in that neighbourhood” are the words a wealthy family would use. Mansfield lets their prejudice speak through the narration so that the reader can judge it.',
  },
  {
    lead: `In ${titled(BRILL)}, Miss Brill takes her old fur out of its box for her Sunday walk:`,
    excerpt: BRILL_FUR,
    ask: 'Whose voice do we hear in “Dear little thing! It was nice to feel it again.”?',
    answer: 'Miss Brill’s own fond thoughts, in her own words, without a tag such as “she thought”',
    wrong: ['The narrator’s mocking judgement of the shabby fur', 'The fur speaking to Miss Brill', 'A passer-by in the park, admiring the fur'],
    why: 'The exclamation and the pet name belong to Miss Brill, but they are not in quotation marks or tagged: this is free indirect style.',
  },
  {
    lead: `In ${titled(PARTY)}, a delivery man asks Laura about the cottages where the dead man lived:`,
    excerpt: PARTY_KNOW,
    ask: 'Whose thoughts are in “Know them? Of course, she knew them.”?',
    answer: 'Laura’s, in her own impatient words',
    wrong: ['The delivery man’s', 'Laura’s mother’s', 'A neutral narrator’s, stating a fact'],
    why: 'The repeated question and the “Of course” carry Laura’s impatience, but the sentence is in the third person with no tag: free indirect style.',
  },
  {
    lead: `In ${titled(PARTY)}, Laura begs her sister Jose to stop the party, and Jose pretends not to understand:`,
    excerpt: PARTY_PRETEND,
    ask: 'Whose thought is “Why did Jose pretend?”',
    answer: 'Laura’s, given in the narration without quotation marks',
    wrong: ['Jose’s', 'The narrator’s, speaking directly to the reader', 'Their mother’s'],
    why: 'Laura is the one who believes Jose is pretending; her question is folded into the narration with no tag.',
  },
  {
    lead: `In ${titled(BRILL)}, Miss Brill watches the other people who sit on the benches every Sunday:`,
    excerpt: BRILL_CUPBOARDS,
    ask: 'Whose view of the other people is this, and what irony does it carry?',
    answer: 'Miss Brill’s, and it fits her too: she also lives alone in a little dark room',
    wrong: ['The narrator’s, and it proves the others are dangerous', 'The young couple’s, mocking the old people', 'The band leader’s, judging his audience'],
    why: 'The breathless “even—even cupboards!” is Miss Brill’s, but the reader later sees her own room is “like a cupboard”: she describes herself without knowing it.',
  },
];

const REVEAL: Voice[] = [
  {
    lead: `The narrator of ${titled(ARABY)} describes his boyhood love for his friend’s sister:`,
    excerpt: ARABY_SUMMONS,
    ask: 'What does the narrator’s voice reveal about him?',
    answer: 'He is looking back as an older man, with gentle irony at his younger self',
    wrong: ['He is a boy telling events as they happen, with no hindsight', 'He despises the girl and wants revenge on her', 'He is the girl’s brother, describing her from outside'],
    why: 'Calling his young feelings “foolish blood” shows an older narrator who sees more than the boy did, but remembers him fondly.',
  },
  {
    lead: `The narrator of ${titled(FROG)} describes old Simon Wheeler telling his tale:`,
    excerpt: FROG_WHEELER,
    ask: 'What does the narrator’s own language reveal about him?',
    answer: 'He is educated and rather formal, and his polished style contrasts comically with Wheeler’s rambling',
    wrong: ['He is a miner from the camp who speaks just like Wheeler', 'He is bored and leaves before Wheeler begins', 'He believes every word of Wheeler’s story'],
    why: 'Phrases such as “gentle-flowing key” and “betrayed the slightest suspicion of enthusiasm” are a cultured writer’s; Wheeler’s tale that follows is in country dialect. The gap is the joke.',
  },
  {
    lead: `The narrator of ${titled(WALLPAPER)} writes in a secret journal:`,
    excerpt: PAPER_JOHN,
    ask: 'What does this aside, in brackets, reveal about the narrator?',
    answer: 'She feels unable to speak openly to anyone, so she confides only in her hidden journal',
    wrong: ['She trusts her husband completely and tells him everything', 'She is a doctor writing notes about a patient', 'She is writing a letter to be published in a newspaper'],
    why: '“I would not say it to a living soul… but this is dead paper”: her real thoughts can only go on paper, which shows how silenced she feels.',
  },
];

function voiceQ(rng: Rng, d: Difficulty) {
  if (d === 3) {
    const pick = rng.int(0, 2);
    if (pick === 0) {
      return {
        prompt: `In ${titled(HERON)}, most of the story is told in the past tense about Sylvia. Then, as she sits high in the pine at dawn, the narrator writes:\n\n${quoteBlock(HERON_LOOK)}\n\nWhat changes in the narration here, and what is the effect?`,
        parts: [part(mc(rng, 'The narrator speaks directly to Sylvia, in the present tense, which makes the moment urgent and close.', ['Sylvia takes over and tells the rest of the story in the first person.', 'The narrator jumps forward many years to summarize Sylvia’s life.', 'A new narrator, the young hunter, begins to tell the story.']))],
        hints: ['Look at who “you” is in “Now look down again, Sylvia”, and at the tense of “you will see him again”.'],
        solution: ['The narrator addresses Sylvia by name and moves into the present tense, as if watching beside her.', 'The shift pulls the reader into the moment of discovery. Sylvia is not narrating: the narrator is speaking to her.'],
      };
    }
    if (pick === 1) {
      return {
        prompt: `In ${titled(ARABY)}, the boy is waiting impatiently for his uncle to come home and give him money for the bazaar:\n\n${quoteBlock(ARABY_UNCLE)}\n\nWhat does the narrator leave the reader to infer from “I could interpret these signs”?`,
        parts: [part(mc(rng, 'That his uncle has come home late after drinking, which does not bode well for the bazaar', ['That his uncle has brought him a present from the bazaar', 'That his uncle is too ill to eat dinner', 'That his uncle is angry with him for asking for money']))],
        hints: ['What might a man who talks to himself and makes the hallstand rock as he throws down his coat have been doing all evening?'],
        solution: ['The narrator does not say it outright, but the signs (talking to himself, the hallstand rocking) suggest that the uncle has been drinking.', 'The narrator trusts the reader to read the clues as the boy did; a moment later we learn the uncle “had forgotten” the bazaar.'],
      };
    }
    const r = rng.pick(REVEAL);
    return {
      prompt: `${r.lead}\n\n${quoteBlock(r.excerpt)}\n\n${r.ask}`,
      parts: [part(mc(rng, r.answer, r.wrong))],
      hints: ['Listen to the narrator’s own words: the vocabulary, the attitude, and anything that shows when or why the story is being told.'],
      solution: [`${r.answer}.`, r.why],
    };
  }
  if (d === 2) {
    const w = rng.pick(WHOSE);
    return {
      prompt: `${w.lead}\n\n${quoteBlock(w.excerpt)}\n\n${w.ask}`,
      parts: [part(mc(rng, w.answer, w.wrong))],
      hints: ['In free indirect style, the narration takes on a character’s words, feelings and judgements without a tag such as “she thought”. Whose vocabulary is this?'],
      solution: [`${w.answer}.`, w.why],
    };
  }
  const cast = pair(rng);
  const f = rng.pick(FORMS);
  return {
    prompt: `${block(fill(f.context, cast))}\n\nWhich next sentence is written in **free indirect style**, giving the character’s thoughts in the narration without quotation marks or a tag such as “she thought”?`,
    parts: [part(mc(rng, fill(f.fis, cast), [fill(f.direct, cast), fill(f.reported, cast), fill(f.plain, cast)]))],
    hints: ['Free indirect style sounds like the character’s own thoughts, with their exclamations and questions, but it stays in the third person and has no “she thought” or quotation marks.'],
    solution: [`“${fill(f.fis, cast)}” carries the character’s own feelings and words in the narration, with no tag: free indirect style.`, 'The others are direct thought in quotation marks, reported thought with “thought that” or “wondered why”, and plain narration of an action.'],
  };
}

// ============================================================================ reliability

type Reason = 'naive' | 'contradicts' | 'grudge' | 'reliable';
const REASON_LABEL: Record<Reason, string> = {
  naive: 'Carefully: the narrator is a child who reports accurately what they see but does not understand it.',
  contradicts: 'Not much: the narrator’s own actions contradict what they claim about themselves.',
  grudge: 'Not much: the narrator has a strong grudge against the person they are describing.',
  reliable: 'Fully: the narrator reports events plainly and admits their own mistakes.',
};
/** For the naive and self-contradicting narrators: what the reader understands that the narrator misses or will not admit. */
interface Gap {
  text: string;
  answer: string;
  wrong: string[];
}
const GAPS: Gap[] = [
  { text: 'Grandpa has started calling me by my mum’s name. I think it is a new game, so I answer to it, and he smiles. Mum goes very quiet when I tell her about it.', answer: 'Grandpa’s memory is failing, and he is confusing the narrator with Mum.', wrong: ['Grandpa has invented a new game and Mum is jealous of it.', 'Mum has changed her name.', 'The narrator is pretending to be Mum to trick Grandpa.'] },
  { text: 'The men who came this morning took our sofa and the television. Dad said they were only borrowing them for a while, so I helped carry the cushions to their van.', answer: 'The family’s belongings are being taken away, probably because of money troubles.', wrong: ['The neighbours are borrowing furniture for a party.', 'Dad has bought a new sofa and television.', 'The narrator is helping friends move house.'] },
  { text: 'Every night this week Mum has stayed up late at the kitchen table with a pile of letters and a calculator. She must be very good at maths, because she does it so often.', answer: 'The family is struggling with money, and Mum is worried about paying the bills.', wrong: ['Mum is training to become a maths teacher.', 'Mum is writing letters to old friends.', 'Mum has won a maths competition.'] },
  { text: 'Everyone at the office agrees that I am the calmest person there. When Omar moved my stapler again, I only threw it a little, and only at the wall.', answer: 'The narrator has a temper and is not calm at all.', wrong: ['Omar threw the stapler at the narrator.', 'The narrator is the calmest person in the office.', 'Everyone at the office is afraid of Omar.'] },
  { text: 'I have never once been jealous of my sister. That is why, when the judges asked whose painting it was, I didn’t think it worth mentioning that it was hers and not mine.', answer: 'The narrator is jealous, and let the judges believe the sister’s painting was the narrator’s own.', wrong: ['The sister copied the narrator’s painting.', 'The judges chose the sister’s painting as the winner.', 'The narrator is proud of the sister and told the judges so.'] },
  { text: 'I am a very honest person, as I always tell people. I only said I had finished the report because it was nearly finished, and nobody would have checked anyway.', answer: 'The narrator lied about the report, and is less honest than they claim.', wrong: ['The report really was finished.', 'Someone else lied about the report.', 'The narrator always checks other people’s work.'] },
];

const NARRATORS: Record<Reason, string[]> = {
  naive: [
    'Grandpa has started calling me by my mum’s name. I think it is a new game, so I answer to it, and he smiles. Mum goes very quiet when I tell her about it.',
    'The men who came this morning took our sofa and the television. Dad said they were only borrowing them for a while, so I helped carry the cushions to their van.',
    'Every night this week Mum has stayed up late at the kitchen table with a pile of letters and a calculator. She must be very good at maths, because she does it so often.',
  ],
  contradicts: [
    'Everyone at the office agrees that I am the calmest person there. When Omar moved my stapler again, I only threw it a little, and only at the wall.',
    'I have never once been jealous of my sister. That is why, when the judges asked whose painting it was, I didn’t think it worth mentioning that it was hers and not mine.',
    'I am a very honest person, as I always tell people. I only said I had finished the report because it was nearly finished, and nobody would have checked anyway.',
  ],
  grudge: [
    'My neighbour, who has never forgiven me for winning the village garden prize, says his dog dug up my roses by accident. Nothing that man does is an accident.',
    'Mr. Lindqvist, who gave me the lowest mark in my class last year, says the school trip was cancelled because of the weather. I know the real reason: he enjoys ruining things for us.',
  ],
  reliable: [
    'I was wrong about Mateo that summer, and it took me ten years to admit it. He had not taken the money; I had simply wanted someone to blame.',
    'I remember the date because it was my sister’s birthday. I was angry, and I said things I regret; the next morning I wrote to apologize, and she still has the letter.',
  ],
};

const PAPER_SIGNS: Array<{ excerpt: Excerpt; sees: string }> = [
  { excerpt: PAPER_SHAKES, sees: 'she believes a woman behind the pattern is shaking it' },
  { excerpt: PAPER_CAME_OUT, sees: 'she believes that she herself came out of the wallpaper' },
  { excerpt: PAPER_BARS, sees: 'she sees the pattern turn into bars, with a woman behind them' },
];
const PAPER_NOT_SIGNS: Excerpt[] = [PAPER_PATTERN, PAPER_HAUNTED, PAPER_CAREFUL];

function reliabilityQ(rng: Rng, d: Difficulty) {
  if (d === 3 && rng.chance(0.6)) {
    const g = rng.pick(GAPS);
    return {
      prompt: `${block(g.text)}\n\nWhat does the reader understand that the narrator misses, or will not admit?`,
      parts: [part(mc(rng, g.answer, g.wrong))],
      hints: ['Set the narrator’s interpretation aside and look only at the facts the narrator reports. What do those facts suggest?'],
      solution: [g.answer, 'The narrator’s own details reveal more than the narrator understands or admits: that gap is what makes the narrator unreliable.'],
    };
  }
  if (d === 3) {
    return {
      prompt: `${titled(WALLPAPER)} ends with the narrator creeping around the room, the wallpaper torn from the walls. Her husband, John, breaks in:\n\n${quoteBlock(PAPER_FAINTED)}\n\nWhat does the reader understand that the narrator does not?`,
      parts: [part(mc(rng, 'John has fainted from the shock of seeing her breakdown; she sees him only as something in her way.', ['John is pretending to faint to trick her into leaving the room.', 'The narrator has finally recovered and is cleaning the room.', 'John has fainted because the room is too hot.']))],
      hints: ['The narrator cannot see herself as John sees her. What has he just found when he opens the door?'],
      solution: ['John faints at the sight of his wife creeping around a room stripped of its paper, a sign of how far her mind has gone.', 'She calls him “that man”, wonders why he fainted, and creeps over him: the gap between her account and what the reader understands shows how unreliable she has become.'],
    };
  }
  if (d === 2) {
    const right = rng.pick(PAPER_SIGNS);
    return {
      prompt: `The narrator of ${titled(WALLPAPER)} has been ordered to rest in an upstairs room with yellow wallpaper. Which detail from her journal **most clearly** shows that her perceptions can no longer be trusted?`,
      parts: [part(mc(rng, q(right.excerpt.text), PAPER_NOT_SIGNS.map((e) => q(e.text))))],
      hints: ['Disliking a wallpaper or teasing yourself about a haunted house is normal. Which detail shows her seeing something that cannot be real?'],
      solution: [`In ${q(right.excerpt.text)}, ${right.sees}: something that cannot be real.`, 'The other details show taste, humour or irony about her husband, not a mind losing its grip on what is real.'],
    };
  }
  const reason = rng.pick(Object.keys(NARRATORS) as Reason[]);
  const text = rng.pick(NARRATORS[reason]);
  const labels = (Object.keys(REASON_LABEL) as Reason[]).map((r) => REASON_LABEL[r]);
  const answer = REASON_LABEL[reason];
  return {
    prompt: `${block(text)}\n\nHow far should the reader trust this narrator?`,
    parts: [part(mc(rng, answer, labels.filter((l) => l !== answer)))],
    hints: ['Compare what the narrator says with what the narrator’s own details show. Is there a gap, and why?'],
    solution: [answer, {
      naive: 'The facts are reported accurately, but the child misreads them; the reader understands what the narrator does not.',
      contradicts: 'The narrator’s claim about themselves is undercut by what they admit doing, so their judgements cannot be trusted.',
      grudge: 'The narrator’s grudge colours everything they say about the person, so their account is biased.',
      reliable: 'The narrator reports events plainly and owns up to their own faults, so nothing suggests we should doubt them.',
    }[reason]],
  };
}

export const VOICE_SKILLS: SkillDef[] = [
  skill({
    id: 'e11-narrative-voice',
    name: 'Narrative voice and free indirect style',
    description: 'Recognize free indirect style and shifts of perspective, and explain what a narrator’s voice reveals.',
    outcomes: OUT,
    lessonId: L,
    format: 'mc',
    gen: voiceQ,
  }),
  skill({
    id: 'e11-reliability',
    name: 'Reliable and unreliable narrators',
    description: 'Judge how far a narrator can be trusted, and find the evidence that a narrator is naive, biased or unreliable.',
    outcomes: OUT,
    lessonId: L,
    format: 'mc',
    gen: reliabilityQ,
  }),
];
