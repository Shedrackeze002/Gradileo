/**
 * Grade 11 English, lesson 2.3: Voice and Irony in Poetry (11-B1). The dramatic monologue: its
 * speaker, its silent listener and what the speaker gives away without meaning to (Browning’s “My
 * Last Duchess”, Tennyson’s “Ulysses” and monologues written for Gradileo); and irony and paradox in
 * poems by Hardy, Crane, Robinson and Dickinson.
 */
import { fixedChoice, mc, part, skill, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { block } from '../../eng10/gen/common.ts';
import { titled } from '../../eng10/gen/texts.ts';
import {
  CORY_ALL, DIGGING_ALL, DUCHESS_COMMANDS, DUCHESS_DOWRY, DUCHESS_LOOKS, DUCHESS_NAME, DUCHESS_NEPTUNE, DUCHESS_OPENING, DUCHESS_STOOP, MADNESS_ALL,
  MAN_KILLED_ALL, SUCCESS_ALL, ULYSSES_END, ULYSSES_FRIENDS, ULYSSES_OPENING, ULYSSES_SON, WAR_KIND_BABE, WAR_KIND_FLAG, WAR_KIND_MOTHER, WAR_KIND_OPENING,
  end, linesOf, verseBlock, type Verse,
} from './poems.ts';
import { versesWithGap } from './poetry-conceit.ts';

const L = 'e11-2-3';
const OUT = ['11-B1'];

interface Ask {
  ask: string;
  right: string;
  wrong: string[];
  why: string;
}

// ============================================================================ the dramatic monologue

interface Monologue {
  title: string;
  lines: string[];
  listener: Ask;
  reveals: Ask;
}

/** Short dramatic monologues written for Gradileo. */
const WRITTEN: Monologue[] = [
  {
    title: 'Homework Help',
    lines: ['No, no, give me the pencil—watch how it’s done.', 'You see? Finished in a minute. Easy.', 'You can tell our parents I helped. Tell them I did most of it.', 'Actually, tell them I did all of it. That’s only fair.'],
    listener: { ask: 'Who is the speaker talking to?', right: 'A younger brother or sister who is doing homework', wrong: ['A teacher who is marking the speaker’s maths test', 'A shopkeeper selling pencils and exercise books', 'A parent who is cooking dinner in the kitchen'], why: 'The speaker takes the pencil, finishes the work and tells the listener what to say to “our parents”: a younger brother or sister.' },
    reveals: { ask: 'What does the speaker reveal without meaning to?', right: 'They care more about getting the credit than about helping.', wrong: ['They are too shy to offer help unless they are asked.', 'They find the homework very difficult and need help themselves.', 'They want the listener to learn the work properly, step by step.'], why: 'The speaker grabs the pencil instead of teaching, then wants to be told they did “all of it”: the help is really about credit.' },
  },
  {
    title: 'The Shop on Mill Street',
    lines: ['Take your time, there’s no hurry at all.', 'That coat? A bargain. I’ll take ten off. Twenty.', 'Nobody’s been in since Tuesday—not that it matters.', 'Please, just try it on. You’d be doing me a favour.'],
    listener: { ask: 'Who is the speaker talking to?', right: 'A customer browsing in the shop', wrong: ['A driver delivering new stock', 'A friend from school who has popped in', 'The owner of a rival shop'], why: 'The speaker offers the listener a coat, cuts the price and begs them to try it on: a customer.' },
    reveals: { ask: 'What does the speaker reveal without meaning to?', right: 'The shop is struggling, and the owner is desperate for a sale.', wrong: ['The shop is so busy that the owner cannot serve everyone at once.', 'The owner does not really care whether anything in the shop sells.', 'The coat is the most expensive and fashionable item in the shop.'], why: 'Dropping the price unasked, admitting no one has come in since Tuesday and saying “Please” show desperation, despite “no hurry at all”.' },
  },
  {
    title: 'Before the Final',
    lines: ['Nervous? Not me. I never get nervous.', 'I’ve only checked my laces four times—just habit.', 'You should stay calm, like me. Breathe, see?', 'Why is my voice shaking? It’s the cold, that’s all.'],
    listener: { ask: 'Who is the speaker talking to?', right: 'A teammate, just before an important match', wrong: ['A referee who has made a mistake', 'A reporter after the match', 'A coach who has dropped the speaker from the team'], why: 'The speaker gives the listener advice to “stay calm, like me” before “the final”: a teammate.' },
    reveals: { ask: 'What does the speaker reveal without meaning to?', right: 'The speaker is very nervous but will not admit it.', wrong: ['The speaker is completely calm and confident before the match.', 'The speaker has hurt an ankle and keeps checking it is strapped.', 'The speaker does not care at all whether the team wins or loses.'], why: 'Checking laces four times and a shaking voice contradict “I never get nervous”.' },
  },
  {
    title: 'Sunday Visit',
    lines: ['Oh, you’re busy, of course you are. Don’t worry about me.', 'I’ve laid out two cups—habit, I suppose.', 'The neighbours? They moved away last spring.', 'Stay for one more cup of tea, if you like. Only if you like.'],
    listener: { ask: 'Who is the speaker talking to?', right: 'A younger relative who has dropped in for a short visit', wrong: ['A doctor who has come to check on the speaker’s health', 'A new neighbour who has just moved into the house next door', 'A waiter serving tea and cake in a busy café'], why: 'The listener is “busy” and about to leave, and the speaker offers “one more cup of tea”: a visiting relative, as the title suggests.' },
    reveals: { ask: 'What does the speaker reveal without meaning to?', right: 'The speaker is lonely and wants the visitor to stay.', wrong: ['The speaker wants to be left alone as soon as possible.', 'The speaker is angry with the neighbours for moving away.', 'The speaker is too busy with the housework to talk for long.'], why: 'Two cups laid out, neighbours gone and a repeated invitation reveal loneliness behind “Don’t worry about me”.' },
  },
  {
    title: 'A Lovely Apartment',
    lines: ['The damp? That’s just character. Old buildings breathe.', 'The last tenant left in a hurry—some people are fussy.', 'You stop hearing the trains after a year or two.', 'Sign here, and the keys are yours tonight.'],
    listener: { ask: 'Who is the speaker talking to?', right: 'Someone looking for an apartment to rent', wrong: ['A builder who has come to repair the damp', 'The last tenant, who has come back', 'A train driver who lives in the building'], why: 'The speaker shows off the apartment and asks the listener to sign for the keys: someone thinking of renting it.' },
    reveals: { ask: 'What does the speaker reveal without meaning to?', right: 'The apartment has serious problems that the speaker is trying to hide.', wrong: ['The apartment is newly built and has never been lived in before.', 'The speaker wants the listener to take more time before deciding.', 'The last tenant loved living there and was sad to have to leave.'], why: 'Damp, a tenant who fled, and noise you only stop hearing after years: every excuse points to a problem.' },
  },
  {
    title: 'Vote for Me',
    lines: ['I don’t want this for myself, you understand.', 'It’s for the school. I’ve made a list of my best qualities—', 'just a short one, nine pages. Shall I read it to you?', 'You’ll vote for me, of course. Everyone sensible will.'],
    listener: { ask: 'Who is the speaker talking to?', right: 'A classmate whose vote the speaker wants', wrong: ['The head of the school, who runs the election', 'A younger child who is too young to vote', 'A reader of the town’s local newspaper'], why: 'The speaker is asking the listener to “vote for me” in a school election: a classmate.' },
    reveals: { ask: 'What does the speaker reveal without meaning to?', right: 'The speaker is vain and full of self-importance.', wrong: ['The speaker is modest and genuinely unselfish.', 'The speaker does not really want to win the vote.', 'The speaker has never written anything about themselves.'], why: 'A nine-page list of “my best qualities” contradicts “I don’t want this for myself”.' },
  },
];

interface PdMono extends Ask {
  verse: Verse;
  lead: string;
}

/** “From “My Last Duchess” … The speaker is a duke …”, with any extra context, ending in a colon. */
const DUCHESS_LEAD = (where: string, extra = '') => `${where} ${titled(DUCHESS_OPENING.poem)} by Robert Browning. The speaker is a duke in Renaissance Italy${extra}:`;

const PD_MONO: PdMono[] = [
  {
    verse: DUCHESS_OPENING,
    lead: `The opening of ${titled(DUCHESS_OPENING.poem)} by Robert Browning, set in Renaissance Italy (Frà Pandolf is a painter; “countenance” means face):`,
    ask: 'Who is speaking, and what is he showing his listener?',
    right: 'A duke, showing a visitor a portrait of his dead wife',
    wrong: ['A painter, showing a buyer the newest portrait he has made', 'A priest, showing a pilgrim a painting in a church', 'A servant, showing a guest the paintings in a museum'],
    why: '“That’s my last Duchess painted on the wall, / Looking as if she were alive”: the speaker is her husband, the Duke, and only he draws back “The curtain I have drawn for you”.',
  },
  {
    verse: DUCHESS_DOWRY,
    lead: DUCHESS_LEAD('Near the end of', ' (“munificence” means generosity, and a “dowry” is the money a bride’s family pays at a marriage)'),
    ask: 'Who is the listener, and why is he visiting?',
    right: 'An agent of a Count, arranging the Duke’s marriage to the Count’s daughter',
    wrong: ['A painter who has been hired to paint a portrait of the new Duchess', 'A close friend of the dead Duchess, who has come to ask how she died', 'A judge who is investigating a crime committed in the Duke’s palace'],
    why: '“The Count your master” and talk of a dowry and “his fair daughter” show that the listener serves a Count and is negotiating the Duke’s next marriage.',
  },
  {
    verse: DUCHESS_LOOKS,
    lead: DUCHESS_LEAD('From'),
    ask: 'What does this complaint about his wife reveal about the Duke?',
    right: 'He was jealous and possessive, angry that she smiled at everything as warmly as at him.',
    wrong: ['He admired the warm, cheerful kindness she showed to everyone she met at court.', 'He was always too shy to speak to her, so he admired her smile from a distance.', 'He thought she was secretly unhappy and wanted to find a way to help her.'],
    why: 'He sneers that her heart was “too soon made glad” and that “her looks went everywhere”: he resented any joy that was not about him.',
  },
  {
    verse: DUCHESS_NAME,
    lead: DUCHESS_LEAD('From'),
    ask: 'What does the Duke reveal about himself here?',
    right: 'He is arrogant: he expected his ancient family name to count for more than any gift.',
    wrong: ['He is modest about his family’s long history and hardly ever mentions it at all.', 'He is generous, and showers expensive gifts on everyone who serves at his court.', 'He forgave his wife easily and quickly whenever she offended him in small ways.'],
    why: 'He is offended that she “ranked / My gift of a nine-hundred-years-old name / With anybody’s gift”.',
  },
  {
    verse: DUCHESS_STOOP,
    lead: DUCHESS_LEAD('From', ', explaining why he never told his wife what displeased him'),
    ask: 'What do these words reveal about the Duke?',
    right: 'He is too proud ever to lower himself to explain, or to talk things through.',
    wrong: ['He is too kind and gentle ever to criticize anyone, even his wife.', 'He is old and physically unable to bend down because of his bad back.', 'He was secretly afraid of his wife and dared not tell her anything.'],
    why: '“I choose / Never to stoop”: speaking to her plainly would have been beneath him.',
  },
  {
    verse: ULYSSES_OPENING,
    lead: `The opening of ${titled(ULYSSES_OPENING.poem)} by Alfred, Lord Tennyson. The speaker is Ulysses (Odysseus), the old king of Ithaca, home at last from his wanderings (“mete and dole” means hand out; “the lees” are the dregs at the bottom of a cup):`,
    ask: 'What does Ulysses reveal about how he feels as king?',
    right: 'He is bored and restless at home, and looks down on the people he rules.',
    wrong: ['He is content to rule his island in peace for the rest of his life.', 'He is afraid of travelling again after so many years of danger at sea.', 'He loves his people and his rocky kingdom deeply, and is glad to be home.'],
    why: 'He calls himself “an idle king” among “barren crags”, ruling “a savage race, / That hoard, and sleep, and feed, and know not me”, and says, “I cannot rest from travel”.',
  },
  {
    verse: ULYSSES_SON,
    lead: `From ${titled(ULYSSES_SON.poem)} by Alfred, Lord Tennyson, spoken by the old king Ulysses (“prudence” means caution; “meet” here means proper):`,
    ask: 'How does Ulysses seem to see his son, Telemachus?',
    right: 'As suited to the patient, everyday work of ruling, which Ulysses does not want',
    wrong: ['As unfit to rule, and a real danger to the kingdom once Ulysses has gone', 'As eager to join the voyage, and the bravest sailor of all the mariners', 'As a jealous rival who has stolen his throne while he was away at war'],
    why: 'Telemachus will patiently civilize “a rugged people” and attend to “common duties”: “He works his work, I mine.” The son’s work is not the kind Ulysses wants.',
  },
  {
    verse: ULYSSES_FRIENDS,
    lead: `From ${titled(ULYSSES_FRIENDS.poem)} by Alfred, Lord Tennyson, spoken by the old king Ulysses:`,
    ask: 'Whom does Ulysses address in these lines?',
    right: 'His mariners, the old sailors who travelled with him',
    wrong: ['His wife, Penelope, who waited for him at home', 'His son, Telemachus, who will rule after him', 'The gods of the sea, who decide every sailor’s fate'],
    why: '“My mariners, / Souls that have toil’d, and wrought, and thought with me”: he turns to the sailors who shared his voyages.',
  },
];

interface PdMonoTwo {
  verse: Verse;
  lead: string;
  asks: Ask[];
}

const PD_MONO_TWO: PdMonoTwo[] = [
  {
    verse: DUCHESS_COMMANDS,
    lead: DUCHESS_LEAD('From', ', telling the agent of a Count, who is arranging the Duke’s next marriage, about his late wife'),
    asks: [
      {
        ask: 'What does “I gave commands; / Then all smiles stopped together” most likely suggest?',
        right: 'The Duke had his wife killed.',
        wrong: ['He asked her to stop smiling, and she agreed.', 'He ordered a new portrait to be painted.', 'Everyone at court stopped laughing at a joke.'],
        why: 'Her smiles “grew”, he “gave commands”, and then “all smiles stopped together”: with “There she stands / As if alive”, the line points to her death on his orders.',
      },
      {
        ask: 'Why is it chilling that he tells this story to this listener?',
        right: 'He tells it calmly to the man arranging his next marriage, hinting at his next wife’s fate.',
        wrong: ['He is confessing his crime to a priest and asking humbly for God’s forgiveness for it.', 'He wants the listener to buy the painting and take it back to the Count as a gift.', 'He is still grieving for his wife and hopes the listener will offer him some comfort.'],
        why: 'The listener serves the Count whose daughter the Duke will marry; the Duke reveals his cruelty without seeming to notice how it sounds.',
      },
    ],
  },
  {
    verse: DUCHESS_NEPTUNE,
    lead: `The last lines of ${titled(DUCHESS_NEPTUNE.poem)} by Robert Browning, as the Duke leads the Count’s agent away from the portrait (Neptune is the Roman god of the sea; Claus of Innsbruck is a sculptor):`,
    asks: [
      {
        ask: 'What does the Duke’s sudden change of subject to a bronze statue suggest?',
        right: 'He sees his late wife as just one more prized object in his collection.',
        wrong: ['He is too upset and grief-stricken to keep talking about her any longer.', 'He wants to give the bronze statue to the Count as a wedding present.', 'He loves the sea and its gods far more than he has ever loved people.'],
        why: 'He moves straight from his dead wife’s portrait to a “rarity” cast “for me”: both are possessions to show off.',
      },
      {
        ask: 'The statue shows Neptune “Taming a sea-horse”. How might it reflect the Duke?',
        right: 'Like Neptune, he wants to tame and control whatever belongs to him.',
        wrong: ['Like the wild sea-horse, he longs to escape and be free of his duties.', 'He dreams of giving up his title and becoming a sailor on the sea.', 'He fears the power of the sea and the god who rules over its waves.'],
        why: 'A god taming a wild creature mirrors a duke who could not bear a wife he could not control.',
      },
    ],
  },
  {
    verse: ULYSSES_END,
    lead: `The end of ${titled(ULYSSES_END.poem)} by Alfred, Lord Tennyson, spoken by the old king Ulysses (the Happy Isles were where the souls of Greek heroes went after death; Achilles was a hero who died at Troy):`,
    asks: [
      {
        ask: 'Whom is Ulysses speaking to here?',
        right: 'His old shipmates, who will sail with him',
        wrong: ['His son, Telemachus, who will rule Ithaca', 'The people of Ithaca, whom he rules', 'Achilles, the hero he knew at Troy'],
        why: '“Us”, “we” and “heroic hearts”: he speaks to the old mariners who will sail with him, the same men he called “My mariners”.',
      },
      {
        ask: 'What does the last line reveal about Ulysses?',
        right: 'Though old and weakened, he is determined to keep seeking new experience to the end.',
        wrong: ['He has finally given up his wandering and wants to rest quietly at home now.', 'He is afraid of dying at sea, far from home, as so many of his men have done.', 'He bitterly regrets the long years of travelling that kept him from his family.'],
        why: '“Made weak by time and fate, but strong in will / To strive, to seek, to find, and not to yield”: his body has aged, but his will has not.',
      },
    ],
  },
];

function monologueQ(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const m = rng.pick(WRITTEN);
    const q = rng.chance(0.5) ? m.listener : m.reveals;
    return {
      prompt: `A dramatic monologue written for Gradileo, called “${m.title}”:\n\n${block(m.lines.join('\n'))}\n\n${q.ask}`,
      parts: [part(mc(rng, q.right, q.wrong))],
      hints: ['In a dramatic monologue, one character speaks to a silent listener. Use the speaker’s questions and replies to work out who is there, and compare what the speaker says with what the details show.'],
      solution: [q.why, `So: ${end(q.right)}`],
    };
  }
  if (d === 2) {
    const q = rng.pick(PD_MONO);
    return {
      prompt: `${q.lead}\n\n${verseBlock(q.verse)}\n\n${q.ask}`,
      parts: [part(mc(rng, q.right, q.wrong))],
      hints: ['Look for words addressed to the listener (“you”, “sir”) and for moments where the speaker says more about himself than he intends.'],
      solution: [q.why, `So: ${end(q.right)}`],
    };
  }
  const q = rng.pick(PD_MONO_TWO);
  return {
    prompt: `${q.lead}\n\n${verseBlock(q.verse)}\n\nAnswer both questions.`,
    parts: q.asks.map((a, i) => part(mc(rng, a.right, a.wrong), { label: `${i + 1}. ${a.ask}` })),
    hints: ['Work out whom the speaker is addressing, then read between the lines: what a speaker says calmly can reveal more than he intends.'],
    solution: q.asks.map((a, i) => `${i + 1}. ${end(a.right)} ${a.why}`),
  };
}

// ============================================================================ irony and paradox

type Irony = 'verbal' | 'situational' | 'dramatic';
const IRONY_NAME: Record<Irony, string> = { verbal: 'Verbal irony', situational: 'Situational irony', dramatic: 'Dramatic irony' };
const IRONY_WHAT: Record<Irony, string> = {
  verbal: 'a speaker says the opposite of what is meant',
  situational: 'what happens is the opposite of what was expected',
  dramatic: 'the reader knows something a character does not',
};

interface WrittenIrony {
  lines: string[];
  kind: Irony;
  why: string;
}

/** Short poems written for Gradileo, each with one clear kind of irony. */
const WRITTEN_IRONY: WrittenIrony[] = [
  { lines: ['The fire chief gave a speech on safety,', 'warned us twice about the stove,', 'then went home to cook his supper', 'and burned his kitchen down.'], kind: 'situational', why: 'A fire-safety expert is the last person we expect to burn his own kitchen down.' },
  { lines: ['“Lovely weather,” said the hikers', 'as the hail began to fall', 'and the tent blew off the mountain', 'with their breakfast, pots and all.'], kind: 'verbal', why: 'The hikers call the hailstorm “lovely weather”, meaning the opposite.' },
  { lines: ['She saved for years to see the sea,', 'and on the day she came at last', 'the fog rolled in so thick and grey', 'she never saw a single wave.'], kind: 'situational', why: 'After years of saving to see the sea, the one thing she does not see is the sea.' },
  { lines: ['“Take your time,” the coach called out', 'as I limped in, the race long done;', '“No rush at all. We’ll wait for you', 'until next season’s race is run.”'], kind: 'verbal', why: 'The coach says “No rush at all” sarcastically: he means the runner is far too slow.' },
  { lines: ['The sign above the reading room said QUIET', 'in letters three feet tall;', 'the man who hammered it up that morning', 'was the loudest noise of all.'], kind: 'situational', why: 'Putting up a sign asking for quiet is the noisiest thing that happens in the reading room.' },
  { lines: ['The princess smiles and takes the apple', 'the kind old woman offers her,', 'but we have watched the queen at midnight', 'mixing poison into its core.'], kind: 'dramatic', why: 'The reader knows the apple is poisoned; the princess does not.' },
  { lines: ['The traveller boards the ship with a cheer:', '“Unsinkable, they say! What luck!”', 'Below, in the hold, we have seen the crack', 'that widens every time the waves come back.'], kind: 'dramatic', why: 'The reader has seen the widening crack that the cheerful traveller knows nothing about.' },
];

interface PdIrony extends Ask {
  verse: Verse;
  lead: string;
}

const HARDY_GLOSS = '(“nipperkin” means a small cup of drink, “’list” means enlist in the army, “traps” are belongings, and “half-a-crown” was a coin)';

const PD_IRONY: PdIrony[] = [
  {
    verse: MAN_KILLED_ALL,
    lead: `${titled(MAN_KILLED_ALL.poem)} by Thomas Hardy, spoken by a soldier home from war ${HARDY_GLOSS}:`,
    ask: 'What is ironic about what happened to the speaker?',
    right: 'He killed a man he would gladly have shared a drink with if they had met anywhere else.',
    wrong: ['He was killed in battle by the very man he had hoped to make a friend of at the inn.', 'He became rich because of the war, though he had joined up only because he was poor.', 'He met his enemy by chance at an old inn and fought him there over a spilled drink.'],
    why: 'At “some old ancient inn” they would have drunk together; “ranged as infantry”, he shot the man dead: a fellow, like him, who had joined up only because he was “out of work”.',
  },
  {
    verse: linesOf(MAN_KILLED_ALL, 9, 12),
    lead: `From ${titled(MAN_KILLED_ALL.poem)} by Thomas Hardy, spoken by a soldier home from war:`,
    ask: 'What do the dash and the repeated “because— / Because he was my foe” suggest?',
    right: 'He is struggling to find a reason for the killing, and the official one sounds hollow to him.',
    wrong: ['He is completely certain that the man deserved to die, and he says so with pride.', 'He is trying hard to remember the dead man’s name, but it will not come back to him.', 'He is shouting with anger at his enemy, as he did when they met on the battlefield.'],
    why: 'He hesitates, repeats himself and insists “of course” and “That’s clear enough”, which shows that it is not clear to him at all.',
  },
  {
    verse: DIGGING_ALL,
    lead: `${titled(DIGGING_ALL.poem)} by Thomas Hardy. A dead woman, in her grave, asks who is digging above her (“rue” is a plant of mourning; “gin” means trap):`,
    ask: 'What is the irony of the ending?',
    right: 'She takes comfort in her dog’s faithfulness, but it was only burying a bone and forgot her.',
    wrong: ['Her lover has come back in secret and is digging at night to bring her back to life.', 'Her old enemy has come at last to apologize, and is planting rue on her grave.', 'Her family has come together to plant flowers on the grave and remember her.'],
    why: 'Just as she praises “A dog’s fidelity!”, the dog explains it was hiding a bone and “quite forgot / It was your resting-place”.',
  },
  {
    verse: CORY_ALL,
    lead: `${titled(CORY_ALL.poem)} by Edwin Arlington Robinson (“arrayed” means dressed; “in fine” means in short):`,
    ask: 'What is the situational irony of the poem?',
    right: 'The man everyone envied, who seemed to have everything, takes his own life.',
    wrong: ['The poor townspeople who envied him suddenly become rich themselves.', 'Richard Cory gives all his money away to the poor people of the town.', 'Richard Cory loses his whole fortune overnight and becomes poorer than anyone.'],
    why: 'For three stanzas the townspeople wish “that we were in his place”; the last line reveals despair that no one had seen.',
  },
  {
    verse: SUCCESS_ALL,
    lead: `${titled(SUCCESS_ALL.poem)} by Emily Dickinson (a “host” is an army; “strains” are sounds of music):`,
    ask: 'What is the paradox in the first two lines?',
    right: 'Those who fail understand the value of success better than those who win it.',
    wrong: ['Successful people enjoy and understand their success more than anyone else.', 'Success is not worth wanting, because it never makes anyone truly happy.', 'Everyone counts success in exactly the same way, whether they win or lose.'],
    why: 'It seems contradictory that those “who ne’er succeed” prize success most, but the poem shows it is true: only the dying, defeated soldier hears victory “agonized and clear”.',
  },
  {
    verse: MADNESS_ALL,
    lead: `${titled(MADNESS_ALL.poem)} by Emily Dickinson (to “demur” is to object):`,
    ask: 'What is ironic about the way “the majority” decides who is sane?',
    right: 'Anyone who disagrees with the majority is called mad, even when they see most clearly.',
    wrong: ['The majority is always right about madness, because many people cannot all be wrong.', 'Mad people are kinder and gentler than sane ones, so the majority treats them well.', 'People who agree with the majority are the ones who end up locked away in chains.'],
    why: '“Assent, and you are sane; / Demur,—you’re straightway dangerous”: sanity is decided by agreeing, not by seeing truly.',
  },
];

interface PdIronyTwo {
  passage: string;
  lead: string;
  asks: Ask[];
}

const PD_IRONY_TWO: PdIronyTwo[] = [
  {
    passage: verseBlock(WAR_KIND_OPENING),
    lead: `The first stanza of ${titled(WAR_KIND_OPENING.poem)} by Stephen Crane (a “steed” is a horse):`,
    asks: [
      {
        ask: 'What kind of irony is the refrain “War is kind”?',
        right: 'Verbal irony',
        wrong: ['Situational irony', 'Dramatic irony'],
        why: 'The speaker says the opposite of what the poem shows: the lover has died in battle, and war is cruel.',
      },
      {
        ask: 'What is the effect of telling a grieving woman “Do not weep”?',
        right: 'The gap between the gentle words and her lover’s death makes war’s cruelty felt more sharply.',
        wrong: ['It truly comforts her, so the poem ends on a happy, hopeful note after all the grief.', 'It shows that the speaker sincerely admires war and believes the lover died well.', 'It makes the poem light and cheerful, like a song sung to cheer up the grieving.'],
        why: 'The calm instruction sounds absurd beside “your lover threw wild hands toward the sky”: the irony exposes the lie.',
      },
    ],
  },
  {
    passage: versesWithGap(WAR_KIND_BABE, WAR_KIND_MOTHER),
    lead: `Two stanzas of ${titled(WAR_KIND_BABE.poem)} by Stephen Crane (a “shroud” is the cloth a dead body is wrapped in):`,
    asks: [
      {
        ask: 'Who is told “Do not weep” in these stanzas?',
        right: 'A child whose father has died, and a mother whose son has died',
        wrong: ['A soldier who has been wounded and sent home from the front', 'A general who has lost a great battle and all of his men', 'A bride whose wedding has been cancelled because of the war'],
        why: 'The “babe” has lost a father who “gulped and died”; the “Mother” mourns over “the bright splendid shroud of your son”.',
      },
      {
        ask: 'Why does the refrain grow more bitter each time it is repeated?',
        right: 'Each stanza adds a new grieving family, so “War is kind” sounds more and more false.',
        wrong: ['Each stanza reports a new victory, so the claim becomes more and more believable.', 'The speaker keeps forgetting what comes next and so has to repeat the same words.', 'Each stanza is about the same person, mourned again and again by the same family.'],
        why: 'First a father, then a son: the deaths pile up, and the same comforting phrase becomes harder to bear.',
      },
    ],
  },
  {
    passage: verseBlock(WAR_KIND_FLAG),
    lead: `A stanza of ${titled(WAR_KIND_FLAG.poem)} by Stephen Crane, addressed to a regiment’s flag:`,
    asks: [
      {
        ask: 'What is ironic about “the virtue of the slaughter” and “the excellence of killing”?',
        right: 'They pair words of praise with words for killing, so the praise of war sounds bitterly false.',
        wrong: ['They show that the speaker truly admires soldiers and the skill they show in battle.', 'They describe a peaceful parade, with the flag carried proudly through the streets.', 'They praise the regiment’s flag sincerely, as a symbol of courage and of honour.'],
        why: '“Virtue” and “excellence” belong with goodness, not “slaughter” and “killing”: the clash exposes the glory as a lie.',
      },
      {
        ask: 'What does “These men were born to drill and die” suggest?',
        right: 'The soldiers’ lives are reduced to training and dying, as if they were made for nothing else.',
        wrong: ['The soldiers have long, happy lives ahead of them once all their training is done.', 'The soldiers are skilled at drill, so they march as gracefully as excellent dancers.', 'The soldiers only drill for show and will never actually have to fight in a war.'],
        why: 'The flat, alliterative line strips their lives down to “drill and die”, which makes the waving flag above them seem heartless.',
      },
    ],
  },
  {
    passage: verseBlock(MAN_KILLED_ALL),
    lead: `${titled(MAN_KILLED_ALL.poem)} by Thomas Hardy ${HARDY_GLOSS}:`,
    asks: [
      {
        ask: 'Who is speaking, and how?',
        right: 'An ordinary soldier back from war, telling his story in plain, everyday speech',
        wrong: ['A general giving orders to his troops in grand, formal language before a battle', 'The dead man himself, speaking from his grave about the soldier who shot him', 'A priest preaching a solemn sermon about the evils of war to his congregation'],
        why: 'His words are homely and spoken (“Right many a nipperkin”, “Off-hand like”), and he talks about being “out of work” like the man he killed.',
      },
      {
        ask: 'What does the understatement “quaint and curious war is!” suggest?',
        right: 'He cannot find words for how senseless the killing was, and the mild phrase makes it clearer.',
        wrong: ['He finds war amusing and harmless, like an old-fashioned game played by country gentlemen.', 'He thinks war is old-fashioned and that armies should use more modern weapons.', 'He enjoyed the fighting and would happily go back to the war if he were asked.'],
        why: '“Quaint and curious” are far too gentle for shooting “a fellow down / You’d treat if met where any bar is”: the understatement points to what he cannot say.',
      },
    ],
  },
  {
    passage: verseBlock(CORY_ALL),
    lead: `${titled(CORY_ALL.poem)} by Edwin Arlington Robinson (“arrayed” means dressed; “in fine” means in short):`,
    asks: [
      {
        ask: 'Who tells the story of Richard Cory?',
        right: 'The townspeople, the “we” who watched and envied him',
        wrong: ['Richard Cory himself, looking back on his own life', 'Richard Cory’s closest friend, who knew his secrets', 'A doctor who treated him for his illness in the town'],
        why: '“We people on the pavement looked at him”: the speakers are ordinary, poorer townspeople.',
      },
      {
        ask: 'Why does telling it through their eyes make the ending more shocking?',
        right: 'They saw only his polished surface, so his despair stays hidden from us until the last line.',
        wrong: ['They knew all along that he was unhappy, and they describe his sadness in every stanza.', 'They describe his private thoughts and feelings in detail from the very first line.', 'They were secretly glad when he died, because they had envied him for so long.'],
        why: 'Everything they report is outward (his looks, manners, wealth); the final line reveals what none of them saw.',
      },
    ],
  },
  {
    passage: verseBlock(DIGGING_ALL),
    lead: `${titled(DIGGING_ALL.poem)} by Thomas Hardy. A dead woman, in her grave, asks who is digging above her (“rue” is a plant of mourning; “gin” means trap):`,
    asks: [
      {
        ask: 'What do her first three guesses (her loved one, her family, her enemy) have in common?',
        right: 'None of them is coming: each has moved on or given up on her.',
        wrong: ['Each one is planting flowers on her grave to remember her.', 'Each one is digging in the churchyard to find buried treasure.', 'Each one is coming to visit her grave on that very same day.'],
        why: 'Her loved one has married someone rich, her family think “What use!”, and her enemy no longer thinks her “worth her hate”.',
      },
      {
        ask: 'How does the dog’s final answer complete the irony?',
        right: 'Even the one visitor she thinks faithful has forgotten her: the dog came only to bury a bone.',
        wrong: ['The dog has come to lie on her grave and guard it faithfully for as long as it lives.', 'The dog is really her lost lover, who has come back to her grave in disguise at last.', 'The dog keeps digging until it has dug her right out of the grave and set her free.'],
        why: 'She praises “A dog’s fidelity!”, and the dog replies that it “quite forgot / It was your resting-place”.',
      },
    ],
  },
];

function ironyQ(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const w = rng.pick(WRITTEN_IRONY);
    const names = (['verbal', 'situational', 'dramatic'] as Irony[]).map((k) => IRONY_NAME[k]);
    return {
      prompt: `A short poem written for Gradileo:\n\n${block(w.lines.join('\n'))}\n\nWhat kind of irony does it use?`,
      parts: [part(fixedChoice(names, names.indexOf(IRONY_NAME[w.kind])))],
      hints: ['Verbal: someone says the opposite of what they mean. Situational: things turn out the opposite of what we expect. Dramatic: we know something a character does not.'],
      solution: [w.why, `That is ${IRONY_NAME[w.kind].toLowerCase()}: ${IRONY_WHAT[w.kind]}.`],
    };
  }
  if (d === 2) {
    const q = rng.pick(PD_IRONY);
    return {
      prompt: `${q.lead}\n\n${verseBlock(q.verse)}\n\n${q.ask}`,
      parts: [part(mc(rng, q.right, q.wrong))],
      hints: ['Compare what is said or expected with what the poem actually shows.'],
      solution: [q.why, `So: ${end(q.right)}`],
    };
  }
  const q = rng.pick(PD_IRONY_TWO);
  return {
    prompt: `${q.lead}\n\n${q.passage}\n\nAnswer both questions.`,
    parts: q.asks.map((a, i) => part(mc(rng, a.right, a.wrong), { label: `${i + 1}. ${a.ask}` })),
    hints: ['Ask what the words say on the surface, what the poem actually shows, and why the gap between them matters.'],
    solution: q.asks.map((a, i) => `${i + 1}. ${end(a.right)} ${a.why}`),
  };
}

export const VOICE_SKILLS: SkillDef[] = [
  skill({
    id: 'e11-dramatic-monologue',
    name: 'The dramatic monologue',
    description: 'Identify the speaker and silent listener of a dramatic monologue and infer what the speaker reveals without meaning to.',
    outcomes: OUT,
    lessonId: L,
    format: 'mc',
    gen: monologueQ,
  }),
  skill({
    id: 'e11-poetic-irony',
    name: 'Irony in poetry',
    description: 'Recognize verbal, situational and dramatic irony, understatement and paradox in poems, and explain their effect.',
    outcomes: OUT,
    lessonId: L,
    format: 'mc',
    gen: ironyQ,
  }),
];
