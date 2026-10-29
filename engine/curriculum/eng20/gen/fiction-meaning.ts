/**
 * Grade 11 English, lesson 1.4: Symbolism and Allegory (11-A2). Symbols whose meaning develops,
 * motifs, and allegories and parables whose characters and events stand for ideas. Stories written
 * for Gradileo and public-domain stories (./stories.ts).
 */
import { mc, part, skill } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { AnswerSpec, Choice, Difficulty, SkillDef } from '../../../types.ts';
import { block, fill, pair, q } from '../../eng10/gen/common.ts';
import {
  ARABY, BOAT, BOAT_TOWER, BRILL, BRILL_ENDING, BROWN, BROWN_DREAM, BROWN_OPENING, BROWN_RIBBON, BROWN_STAFF, HERON, HERON_SECRET, PAPER_BARS, PAPER_CAME_OUT, PAPER_FIGURE, PAPER_PATTERN,
  VEIL, VEIL_PRISON, WALLPAPER, quoteBlock, titled, type Excerpt,
} from './stories.ts';

const L = 'e11-1-4';
const OUT = ['11-A2'];

// ============================================================================ symbolism

interface Develops {
  text: string;
  answer: string;
  wrong: string[];
  why: string;
}
const DEVELOPS: Develops[] = [
  {
    text: 'At the start of the story, NAME’s grandfather gives {him} an old pocket watch, which {he} drops in a drawer and forgets. After the grandfather dies, NAME winds the watch every morning before school.',
    answer: 'From an unwanted gift to a way of keeping {his} grandfather close',
    wrong: ['From a precious heirloom to worthless junk', 'From a reminder of school to a reminder of holidays', 'It stays a simple timepiece with no deeper meaning'],
    why: 'At first the watch means nothing to NAME; after the death, winding it each morning becomes a daily act of remembering.',
  },
  {
    text: 'A gate stands at the end of NAME’s garden. As a child, {he} is forbidden to open it; as a teenager, {he} climbs over it at night to meet friends; at the end, now a parent, {he} leaves it standing open for {his} own children.',
    answer: 'From the rules {he} must obey to the freedom {he} chooses to give',
    wrong: ['From freedom to imprisonment', 'From a sign of wealth to a sign of poverty', 'From a reminder of {his} friends to a reminder of school'],
    why: 'The closed gate first stands for the limits set on NAME; the open gate at the end shows {him} giving the next generation the freedom {he} once had to take.',
  },
  {
    text: 'A crack runs across the kitchen window of NAME’s family home. As {his} parents’ arguments grow worse, NAME keeps noticing that the crack has spread. In the last scene, after the family has made peace, {his} father finally replaces the glass.',
    answer: 'From the growing break in the family to its repair',
    wrong: ['From the family’s wealth to its poverty', 'From NAME’s fear of storms to {his} love of them', 'From a happy home to a lonely one'],
    why: 'The crack spreads as the family breaks apart, and the new glass arrives when they are reconciled: the window’s story follows the family’s.',
  },
  {
    text: 'NAME’s mother’s old sewing machine sits under a cloth in the corner, a reminder of the years she sewed through the night to pay the rent. In the final scene, NAME uses it to make {his} own graduation gown.',
    answer: 'From a sign of hardship and sacrifice to a sign of what that sacrifice made possible',
    wrong: ['From a useful tool to a broken one', 'From a sign of success to a sign of failure', 'From a family secret to a public embarrassment'],
    why: 'The machine first recalls the mother’s struggle; used for a graduation gown, it becomes proof of what her work achieved.',
  },
];

interface PdSymbol {
  lead: string;
  excerpt: Excerpt;
  ask: string;
  answer: string;
  wrong: string[];
  why: string;
}
const PD_SYMBOLS: PdSymbol[] = [
  {
    lead: `In ${titled(WALLPAPER)}, the narrator at first simply hates the ugly yellow wallpaper in her room. Weeks later she writes:`,
    excerpt: PAPER_BARS,
    ask: 'How has the meaning of the wallpaper developed?',
    answer: 'It has become a prison, and the woman trapped behind it is a picture of the narrator’s own confinement.',
    wrong: ['It has become a beautiful pattern that she learns to love.', 'It now stands for her husband’s love and care.', 'It has become a sign of the family’s wealth.'],
    why: 'The pattern “becomes bars” with a woman behind them: the narrator, confined to the room by her husband’s orders, sees her own situation in the paper.',
  },
  {
    lead: `In ${titled(VEIL)}, Mr. Hooper wears a black veil for the rest of his life. On his deathbed, the narrator says:`,
    excerpt: VEIL_PRISON,
    ask: 'What has the veil come to stand for?',
    answer: 'The secret sin and guilt that separate every person from others',
    wrong: ['Mr. Hooper’s grief for a wife who has died', 'The wealth and power of the church', 'A disguise that lets Mr. Hooper spy on his congregation'],
    why: 'The veil has “separated him from cheerful brotherhood and woman’s love”, and at the end he says he sees a black veil “on every visage”: it stands for the hidden sin that isolates everyone.',
  },
  {
    lead: `In ${titled(BROWN)}, Goodman Brown’s wife, Faith, wears pink ribbons in her cap. Deep in the forest, Brown hears voices, then:`,
    excerpt: BROWN_RIBBON,
    ask: 'What does the falling pink ribbon suggest?',
    answer: 'That Brown’s faith, in his wife and in goodness itself, has been lost',
    wrong: ['That Faith has come to rescue him from the forest', 'That the meeting in the forest is a wedding', 'That spring has come to Salem village'],
    why: 'The ribbon is the sign of Faith; finding it fallen, he cries “My Faith is gone!” and gives himself to despair. The object carries both his wife and his belief.',
  },
  {
    lead: `At the end of ${titled(BRILL)}, after a young couple have laughed at her fur, Miss Brill goes home:`,
    excerpt: BRILL_ENDING,
    ask: 'What does the fur most likely stand for by the end?',
    answer: 'Miss Brill herself: her fragile pride and loneliness, now hurt and hidden away',
    wrong: ['Her wealth and high social position', 'Her anger at the young couple', 'Her plan to leave the town for good'],
    why: 'She once treated the fur as a living companion; now she shuts it away and hears “something crying”. The crying is her own hurt, placed on the fur she identified with.',
  },
  {
    lead: `In ${titled(BOAT)}, four shipwrecked men in a small boat look towards a tall wind-tower on the shore:`,
    excerpt: BOAT_TOWER,
    ask: 'What does the tower stand for in the correspondent’s mind?',
    answer: 'Nature’s indifference to the men struggling to survive',
    wrong: ['Hope that rescue is near', 'The cruelty of the sea', 'The safety and comfort of home'],
    why: 'The tower stands “with its back to the plight of the ants”, and the correspondent sees nature as neither cruel nor kind but “flatly indifferent”.',
  },
  {
    lead: `In ${titled(HERON)}, Sylvia has seen the rare white heron from the top of the great pine. Back home, she will not tell the hunter where its nest is:`,
    excerpt: HERON_SECRET,
    ask: 'What does the white heron most likely stand for?',
    answer: 'The wild, natural world Sylvia belongs to, which she will not betray for money or admiration',
    wrong: ['The hunter’s scientific knowledge', 'The busy town Sylvia came from', 'Her grandmother’s strict rules'],
    why: 'The heron is the secret she shared with the sea and the morning; protecting it means choosing the woods over the hunter and his money.',
  },
];

/** The wallpaper's descriptions, in the order they come in the story. */
const PAPER_ORDER: Excerpt[] = [PAPER_PATTERN, PAPER_FIGURE, PAPER_BARS, PAPER_CAME_OUT];

function orderAnswer(rng: Rng, items: string[]): AnswerSpec {
  const ids = 'abcdefgh';
  const choices: Choice[] = items.map((md, i) => ({ id: ids[i], md }));
  const shuffled = rng.shuffle(choices);
  return { kind: 'order', items: shuffled, correctOrder: choices.map((c) => c.id), ends: ['First', 'Last'] };
}

function symbolQ(rng: Rng, d: Difficulty) {
  if (d === 3) {
    if (rng.chance(0.5)) {
      return {
        prompt: `In ${titled(WALLPAPER)}, the narrator’s descriptions of the wallpaper change as the story goes on. Put these passages in the order they appear, from first to last.`,
        parts: [part(orderAnswer(rng, PAPER_ORDER.map((e) => q(e.text))))],
        hints: ['Trace the change: from an ugly design, to a shape glimpsed behind it, to bars with a woman behind them, to the narrator herself.'],
        solution: PAPER_ORDER.map((e, i) => `${i + 1}. ${q(e.text)}`).concat('The wallpaper moves from an ugly decoration to a prison, and finally to the narrator’s own self: its meaning develops with her illness.'),
      };
    }
    return {
      prompt: `In ${titled(ARABY)}, images of darkness recur: the “blind” dead-end street, the dark room where the old priest died, the boy watching from the shadows, and finally the darkened hall of the bazaar. What does this **motif** most likely suggest?`,
      parts: [part(mc(rng, 'The dimness of the boy’s world, and the disappointment waiting for his bright romantic hopes', ['That the whole story takes place at night', 'That the boy is afraid of the dark', 'That Dublin had no street lighting at the time']))],
      hints: ['A motif is an image or idea that recurs through a story. Ask what all the dark places have in common, and where the story ends.'],
      solution: ['The repeated darkness surrounds the boy’s dreams of the girl and the “Eastern enchantment” of the bazaar.', 'When the bazaar’s lights go out and he stands “gazing up into the darkness”, the motif completes the story’s movement from hope to disillusion.'],
    };
  }
  if (d === 2) {
    const s = rng.pick(PD_SYMBOLS);
    return {
      prompt: `${s.lead}\n\n${quoteBlock(s.excerpt)}\n\n${s.ask}`,
      parts: [part(mc(rng, s.answer, s.wrong))],
      hints: ['Look at the moments where the object appears and what is happening to the character then. Choose the meaning the story supports, not just one that sounds deep.'],
      solution: [s.answer.replace(/\.?$/, '.'), s.why],
    };
  }
  const cast = pair(rng);
  const s = rng.pick(DEVELOPS);
  return {
    prompt: `${block(fill(s.text, cast))}\n\nHow does the meaning of this symbol develop over the story?`,
    parts: [part(mc(rng, fill(s.answer, cast), s.wrong.map((w) => fill(w, cast))))],
    hints: ['Compare what the object means to the character at the start with what it means at the end.'],
    solution: [`${fill(s.answer, cast).replace(/\.?$/, '')}.`, fill(s.why, cast)],
  };
}

// ============================================================================ allegory

interface Allegory {
  text: string;
  ask: string;
  answer: string;
  wrong: string[];
  why: string;
}
const ALLEGORIES: Allegory[] = [
  {
    text: 'A traveller named Ambition sets out for the City of Success. On the road she meets Rest, who offers her a soft bed for as long as she likes, and Envy, who keeps pointing at the travellers ahead of her.',
    ask: 'In this allegory, what does the meeting with Rest most likely stand for?',
    answer: 'The temptation to give up effort for comfort',
    wrong: ['A friendly guide who shows her the quickest way', 'The end of her journey and her final success', 'A rival who is racing her to the city'],
    why: 'Each character stands for an idea. Rest offers a bed “for as long as she likes”: the comfort that tempts an ambitious person to stop striving.',
  },
  {
    text: 'A man named Everyman is told he must set out on a long journey from which no one returns. One by one, Wealth, Fellowship and Beauty refuse to go with him. Only Good Deeds stays at his side to the end.',
    ask: 'What lesson does this allegory teach?',
    answer: 'Possessions, friends and looks cannot go with us at death; only the good we have done remains.',
    wrong: ['Travellers should always carry plenty of money.', 'Beautiful people make the most loyal friends.', 'Long journeys are best made alone.'],
    why: 'The journey “from which no one returns” is death, and each companion stands for something a person values. Only Good Deeds goes all the way.',
  },
  {
    text: 'A lighthouse keeper named Truth keeps a lamp burning on a rocky coast. Ships that steer by the lamp reach harbour safely; a proud captain who mocks the lamp as old-fashioned runs onto the rocks.',
    ask: 'In this allegory, what does the lamp most likely stand for?',
    answer: 'Truth, which guides those who follow it and wrecks those who scorn it',
    wrong: ['Modern technology, which is always better than the old', 'The captain’s pride, which saves his ship', 'The danger of the sea at night'],
    why: 'The keeper is named Truth, and the ships that heed the lamp are saved while the scornful captain is wrecked: the lamp is truth itself.',
  },
  {
    text: 'Two farmers are given equal land. One builds a high fence and guards his harvest alone; the other shares seed and tools with the neighbours. When drought comes, the first man’s crops wither, but the neighbours carry water to the second.',
    ask: 'What idea does this parable teach?',
    answer: 'Generosity builds a community that protects us in hard times.',
    wrong: ['Fences are the best way to protect a farm.', 'Droughts always come after a good harvest.', 'Farmers should never trust their neighbours.'],
    why: 'The two farmers stand for two ways of living. The one who shared is helped when trouble comes; the one who shut others out is left alone.',
  },
];

interface PdAllegory {
  lead: string;
  excerpt: Excerpt;
  ask: string;
  answer: string;
  wrong: string[];
  why: string;
}
const PD_ALLEGORY: PdAllegory[] = [
  {
    lead: `${titled(BROWN)} is often read as an allegory. It opens:`,
    excerpt: BROWN_OPENING,
    ask: 'Why is the wife “aptly named” Faith?',
    answer: 'She stands for Brown’s religious faith, so what happens to her also happens to his belief.',
    wrong: ['She is the most religious woman in Salem village, but plays no further part.', 'She was named after Brown’s mother.', 'Brown gave her the name on their wedding day.'],
    why: 'In an allegory, names point to ideas. Leaving Faith at the door, Brown leaves his faith behind; when he cries “My Faith is gone!”, he means both.',
  },
  {
    lead: `In ${titled(BROWN)}, Goodman Brown meets a mysterious traveller in the dark forest:`,
    excerpt: BROWN_STAFF,
    ask: 'In the allegory, whom does the traveller most likely represent?',
    answer: 'The devil, tempting Brown away from goodness',
    wrong: ['A kindly minister guiding Brown home', 'A wealthy merchant from Boston', 'Brown’s servant, sent to find him'],
    why: 'The staff like “a living serpent” recalls the serpent of Eden, and the traveller later leads a meeting of “fiend worshippers”: he is the tempter.',
  },
  {
    lead: `In ${titled(BROWN)}, Goodman Brown leaves Salem village at sunset and walks deep into the dark forest, where he meets the tempter and sees a gathering of sinners.`,
    excerpt: BROWN_RIBBON,
    ask: 'In the allegory, what does the forest most likely stand for?',
    answer: 'The dark world of sin and doubt that lies outside the ordered, pious village',
    wrong: ['Brown’s farm and the work he must do there', 'A safe refuge from the cruelty of the village', 'The road to a new life in Boston'],
    why: 'The village is daylight, church and order; the forest is night, temptation and the loss of faith. Brown’s journey into it is a journey into doubt.',
  },
];

function allegoryQ(rng: Rng, d: Difficulty) {
  if (d === 3) {
    const pick = rng.int(0, 2);
    if (pick === 0) {
      return {
        prompt: `In ${titled(BROWN)}, the narrator refuses to say whether Brown’s night in the forest really happened:\n\n${quoteBlock(BROWN_DREAM)}\n\nHow does this uncertainty affect the allegory?`,
        parts: [part(mc(rng, 'It hardly matters whether the meeting was real: Brown’s loss of faith is real either way, and it ruins his life.', ['It proves that everything in the story was only a dream and means nothing.', 'It shows that Brown made up the whole story to frighten his wife.', 'It shows that Brown will soon go back to the forest for another meeting.']))],
        hints: ['Ask what happens to Brown afterwards, whichever way the reader answers the narrator’s question.'],
        solution: ['“Be it so if you will”: the narrator lets the reader decide, because the consequence is the same.', 'Real or dreamed, the night destroys Brown’s trust in everyone around him: the allegory is about what doubt does to a person.'],
      };
    }
    if (pick === 1) {
      return {
        prompt: `Hawthorne gave “The Minister’s Black Veil” the subtitle “A Parable”. Mr. Hooper says on his deathbed that he sees a black veil “on every visage”. What does the label “parable” suggest about how to read the veil?`,
        parts: [part(mc(rng, 'As a simple story told to teach a moral lesson: the veil stands for the secret sin all people hide.', ['As a true historical account of one minister’s illness.', 'As a mystery whose solution is a crime Mr. Hooper committed.', 'As a comedy about a man who dislikes the sun.']))],
        hints: ['A parable is a short story that teaches a moral or spiritual lesson. What lesson does Mr. Hooper draw in his last speech?'],
        solution: ['A parable invites us to read its events for their lesson.', 'Mr. Hooper’s last words make the lesson plain: everyone hides a secret sin behind a “veil”, and fears in him what they hide in themselves.'],
      };
    }
    return {
      prompt: `Which statement best explains why “Young Goodman Brown” is an **allegory**, not just a story that contains a symbol?`,
      parts: [part(mc(rng, 'Its characters, places and events consistently stand for ideas: Faith for faith, the forest for sin and doubt, the traveller for the devil.', ['It contains one object, a pink ribbon, that has a deeper meaning.', 'It is set in a real place, Salem village, at a real time in history.', 'It has a surprise ending that the reader does not expect.']))],
      hints: ['A symbol is one thing with a deeper meaning. In an allegory, the whole story works on two levels at once.'],
      solution: ['In an allegory, the story as a whole stands for something else, so many elements carry meanings that fit together.', 'One symbol, a real setting or a twist ending does not make a story allegorical.'],
    };
  }
  if (d === 2) {
    const a = rng.pick(PD_ALLEGORY);
    return {
      prompt: `${a.lead}\n\n${quoteBlock(a.excerpt)}\n\n${a.ask}`,
      parts: [part(mc(rng, a.answer, a.wrong))],
      hints: ['In an allegory, people, places and events stand for ideas. Ask what idea fits this element and the story as a whole.'],
      solution: [a.answer.replace(/\.?$/, '.'), a.why],
    };
  }
  const a = rng.pick(ALLEGORIES);
  return {
    prompt: `${block(a.text)}\n\n${a.ask}`,
    parts: [part(mc(rng, a.answer, a.wrong))],
    hints: ['In an allegory, characters and events stand for ideas. Often the names tell you which ideas.'],
    solution: [a.answer.replace(/\.?$/, '.'), a.why],
  };
}

export const MEANING_SKILLS: SkillDef[] = [
  skill({
    id: 'e11-symbolism',
    name: 'Symbols that develop, and motifs',
    description: 'Interpret symbols whose meaning develops through a story, and explain what a recurring motif suggests.',
    outcomes: OUT,
    lessonId: L,
    format: 'mc',
    gen: symbolQ,
  }),
  skill({
    id: 'e11-allegory',
    name: 'Allegory and parable',
    description: 'Recognize allegory and parable, and explain what their characters, places and events stand for.',
    outcomes: OUT,
    lessonId: L,
    format: 'mc',
    gen: allegoryQ,
  }),
];
