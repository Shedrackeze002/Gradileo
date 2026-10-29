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
  linesOf, verseBlock, type Verse,
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
    listener: { ask: 'Who is the speaker talking to?', right: 'A younger brother or sister who is doing homework', wrong: ['A teacher marking a test', 'A shopkeeper selling pencils', 'A parent cooking dinner'], why: 'The speaker takes the pencil, finishes the work and tells the listener what to say to “our parents”: a younger brother or sister.' },
    reveals: { ask: 'What does the speaker reveal without meaning to?', right: 'They care more about getting the credit than about helping.', wrong: ['They are too shy to help.', 'They find the homework very difficult.', 'They want the listener to learn the work properly.'], why: 'The speaker grabs the pencil instead of teaching, then wants to be told they did “all of it”: the help is really about credit.' },
  },
  {
    title: 'The Shop on Mill Street',
    lines: ['Take your time, there’s no hurry at all.', 'That coat? A bargain. I’ll take ten off. Twenty.', 'Nobody’s been in since Tuesday—not that it matters.', 'Please, just try it on. You’d be doing me a favour.'],
    listener: { ask: 'Who is the speaker talking to?', right: 'A customer browsing in the shop', wrong: ['A delivery driver', 'A friend from school', 'The owner of a rival shop'], why: 'The speaker offers the listener a coat, cuts the price and begs them to try it on: a customer.' },
    reveals: { ask: 'What does the speaker reveal without meaning to?', right: 'The shop is struggling, and the owner is desperate for a sale.', wrong: ['The shop is too busy to serve everyone.', 'The owner does not care whether anything sells.', 'The coat is the most expensive item in the shop.'], why: 'Dropping the price unasked, admitting no one has come in since Tuesday and saying “Please” show desperation, despite “no hurry at all”.' },
  },
  {
    title: 'Before the Final',
    lines: ['Nervous? Not me. I never get nervous.', 'I’ve only checked my laces four times—just habit.', 'You should stay calm, like me. Breathe, see?', 'Why is my voice shaking? It’s the cold, that’s all.'],
    listener: { ask: 'Who is the speaker talking to?', right: 'A teammate, just before an important match', wrong: ['A referee who has made a mistake', 'A reporter after the match', 'A coach who has dropped the speaker from the team'], why: 'The speaker gives the listener advice to “stay calm, like me” before “the final”: a teammate.' },
    reveals: { ask: 'What does the speaker reveal without meaning to?', right: 'The speaker is very nervous but will not admit it.', wrong: ['The speaker is completely calm.', 'The speaker has hurt an ankle.', 'The speaker does not care about winning.'], why: 'Checking laces four times and a shaking voice contradict “I never get nervous”.' },
  },
  {
    title: 'Sunday Visit',
    lines: ['Oh, you’re busy, of course you are. Don’t worry about me.', 'I’ve laid out two cups—habit, I suppose.', 'The neighbours? They moved away last spring.', 'Stay for one more cup of tea, if you like. Only if you like.'],
    listener: { ask: 'Who is the speaker talking to?', right: 'A younger relative who has dropped in for a short visit', wrong: ['A doctor at a hospital', 'A new neighbour who has just moved in', 'A waiter in a café'], why: 'The listener is “busy” and about to leave, and the speaker offers “one more cup of tea”: a visiting relative, as the title suggests.' },
    reveals: { ask: 'What does the speaker reveal without meaning to?', right: 'The speaker is lonely and wants the visitor to stay.', wrong: ['The speaker wants to be left alone.', 'The speaker is angry with the neighbours.', 'The speaker is too busy to talk.'], why: 'Two cups laid out, neighbours gone and a repeated invitation reveal loneliness behind “Don’t worry about me”.' },
  },
  {
    title: 'A Lovely Apartment',
    lines: ['The damp? That’s just character. Old buildings breathe.', 'The last tenant left in a hurry—some people are fussy.', 'You stop hearing the trains after a year or two.', 'Sign here, and the keys are yours tonight.'],
    listener: { ask: 'Who is the speaker talking to?', right: 'Someone looking for an apartment to rent', wrong: ['A builder repairing the damp', 'The last tenant, who has come back', 'A train driver'], why: 'The speaker shows off the apartment and asks the listener to sign for the keys: someone thinking of renting it.' },
    reveals: { ask: 'What does the speaker reveal without meaning to?', right: 'The apartment has serious problems that the speaker is trying to hide.', wrong: ['The apartment is newly built.', 'The speaker wants the listener to take more time.', 'The last tenant loved living there.'], why: 'Damp, a tenant who fled, and noise you only stop hearing after years: every excuse points to a problem.' },
  },
  {
    title: 'Vote for Me',
    lines: ['I don’t want this for myself, you understand.', 'It’s for the school. I’ve made a list of my best qualities—', 'just a short one, nine pages. Shall I read it to you?', 'You’ll vote for me, of course. Everyone sensible will.'],
    listener: { ask: 'Who is the speaker talking to?', right: 'A classmate whose vote the speaker wants', wrong: ['The head of the school', 'A younger child', 'A newspaper reader'], why: 'The speaker is asking the listener to “vote for me” in a school election: a classmate.' },
    reveals: { ask: 'What does the speaker reveal without meaning to?', right: 'The speaker is vain and full of self-importance.', wrong: ['The speaker is modest and unselfish.', 'The speaker does not want to win.', 'The speaker has never written anything.'], why: 'A nine-page list of “my best qualities” contradicts “I don’t want this for myself”.' },
  },
];

interface PdMono extends Ask {
  verse: Verse;
  lead: string;
}

const DUCHESS_LEAD = (where: string) => `${where} ${titled(DUCHESS_OPENING.poem)} by Robert Browning. The speaker is a duke in Renaissance Italy:`;

const PD_MONO: PdMono[] = [
  {
    verse: DUCHESS_OPENING,
    lead: `The opening of ${titled(DUCHESS_OPENING.poem)} by Robert Browning, set in Renaissance Italy (Frà Pandolf is a painter; “countenance” means face):`,
    ask: 'Who is speaking, and what is he showing his listener?',
    right: 'A duke, showing a visitor a portrait of his dead wife',
    wrong: ['A painter, showing a buyer his newest work', 'A priest, showing a pilgrim a painting in a church', 'A servant, showing a guest around a museum'],
    why: '“That’s my last Duchess painted on the wall, / Looking as if she were alive”: the speaker is her husband, the Duke, and only he draws back “The curtain I have drawn for you”.',
  },
  {
    verse: DUCHESS_DOWRY,
    lead: `${DUCHESS_LEAD('Near the end of')} (“munificence” means generosity, and a “dowry” is the money a bride’s family pays at a marriage):`,
    ask: 'Who is the listener, and why is he visiting?',
    right: 'An agent of a Count, arranging the Duke’s marriage to the Count’s daughter',
    wrong: ['A painter hired to paint the new Duchess', 'A friend of the dead Duchess, asking how she died', 'A judge investigating a crime'],
    why: '“The Count your master” and talk of a dowry and “his fair daughter” show that the listener serves a Count and is negotiating the Duke’s next marriage.',
  },
  {
    verse: DUCHESS_LOOKS,
    lead: `${DUCHESS_LEAD('From')}`,
    ask: 'What does this complaint about his wife reveal about the Duke?',
    right: 'He was jealous and possessive, angry that she smiled at everything as warmly as at him.',
    wrong: ['He admired her kindness to everyone.', 'He was too shy to speak to her.', 'He thought she was unhappy and wanted to help her.'],
    why: 'He sneers that her heart was “too soon made glad” and that “her looks went everywhere”: he resented any joy that was not about him.',
  },
  {
    verse: DUCHESS_NAME,
    lead: `${DUCHESS_LEAD('From')}`,
    ask: 'What does the Duke reveal about himself here?',
    right: 'He is proud and arrogant: he expected his ancient family name to be valued above any other gift.',
    wrong: ['He is modest about his family.', 'He is generous with gifts to everyone.', 'He forgave his wife easily.'],
    why: 'He is offended that she “ranked / My gift of a nine-hundred-years-old name / With anybody’s gift”.',
  },
  {
    verse: DUCHESS_STOOP,
    lead: `${DUCHESS_LEAD('From')} He has been explaining why he never told his wife what displeased him:`,
    ask: 'What do these words reveal about the Duke?',
    right: 'He is too proud ever to lower himself to explain, or to talk things through.',
    wrong: ['He is too kind to criticize anyone.', 'He is physically unable to bend down.', 'He was afraid of his wife.'],
    why: '“I choose / Never to stoop”: speaking to her plainly would have been beneath him.',
  },
  {
    verse: ULYSSES_OPENING,
    lead: `The opening of ${titled(ULYSSES_OPENING.poem)} by Alfred, Lord Tennyson. The speaker is Ulysses (Odysseus), the old king of Ithaca, home at last from his wanderings (“mete and dole” means hand out; “the lees” are the dregs at the bottom of a cup):`,
    ask: 'What does Ulysses reveal about how he feels as king?',
    right: 'He is bored and restless at home, and looks down on the people he rules.',
    wrong: ['He is content to rule in peace for the rest of his life.', 'He is afraid of travelling again.', 'He loves his people and his kingdom deeply.'],
    why: 'He calls himself “an idle king” among “barren crags”, ruling “a savage race, / That hoard, and sleep, and feed, and know not me”, and says, “I cannot rest from travel”.',
  },
  {
    verse: ULYSSES_SON,
    lead: `From ${titled(ULYSSES_SON.poem)} by Alfred, Lord Tennyson, spoken by the old king Ulysses (“prudence” means caution; “meet” here means proper):`,
    ask: 'How does Ulysses seem to see his son, Telemachus?',
    right: 'As well suited to the patient, everyday work of ruling, which Ulysses himself does not want',
    wrong: ['As unfit to rule and a danger to the kingdom', 'As eager to join the voyage', 'As a rival who has stolen his throne'],
    why: 'Telemachus will patiently civilize “a rugged people” and attend to “common duties”: “He works his work, I mine.” The son’s work is not the kind Ulysses wants.',
  },
  {
    verse: ULYSSES_FRIENDS,
    lead: `From ${titled(ULYSSES_FRIENDS.poem)} by Alfred, Lord Tennyson, spoken by the old king Ulysses:`,
    ask: 'Whom does Ulysses address in these lines?',
    right: 'His mariners, the old sailors who travelled with him',
    wrong: ['His wife', 'His son, Telemachus', 'The gods of the sea'],
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
    lead: `${DUCHESS_LEAD('From')} He is telling the Count’s agent, who is arranging his next marriage, about his late wife:`,
    asks: [
      {
        ask: 'What does “I gave commands; / Then all smiles stopped together” most likely suggest?',
        right: 'The Duke had his wife killed.',
        wrong: ['He asked her to stop smiling, and she agreed.', 'He ordered a new portrait to be painted.', 'Everyone at court stopped laughing at a joke.'],
        why: 'Her smiles “grew”, he “gave commands”, and then “all smiles stopped together”: with “There she stands / As if alive”, the line points to her death on his orders.',
      },
      {
        ask: 'Why is it chilling that he tells this story to this listener?',
        right: 'He tells it calmly to the man arranging his next marriage, showing what his next wife may face.',
        wrong: ['He is confessing to a priest and asking forgiveness.', 'He wants the listener to buy the painting.', 'He is grieving and wants comfort.'],
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
        wrong: ['He is too upset to keep talking about her.', 'He wants to give the statue to the Count.', 'He loves the sea more than people.'],
        why: 'He moves straight from his dead wife’s portrait to a “rarity” cast “for me”: both are possessions to show off.',
      },
      {
        ask: 'The statue shows Neptune “Taming a sea-horse”. How might it reflect the Duke?',
        right: 'Like Neptune, he wants to tame and control whatever belongs to him.',
        wrong: ['Like the sea-horse, he longs to be free.', 'He dreams of becoming a sailor.', 'He fears the power of the sea.'],
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
        wrong: ['His son, Telemachus', 'The people of Ithaca', 'Achilles'],
        why: '“Us”, “we” and “heroic hearts”: he speaks to the old mariners who will sail with him, the same men he called “My mariners”.',
      },
      {
        ask: 'What does the last line reveal about Ulysses?',
        right: 'Though old and weakened, he is determined to keep seeking new experience to the end.',
        wrong: ['He has given up and wants to rest.', 'He is afraid of dying at sea.', 'He regrets his years of travelling.'],
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
      solution: [q.why, `So: ${q.right}`],
    };
  }
  if (d === 2) {
    const q = rng.pick(PD_MONO);
    return {
      prompt: `${q.lead}\n\n${verseBlock(q.verse)}\n\n${q.ask}`,
      parts: [part(mc(rng, q.right, q.wrong))],
      hints: ['Look for words addressed to the listener (“you”, “sir”) and for moments where the speaker says more about himself than he intends.'],
      solution: [q.why, `So: ${q.right}`],
    };
  }
  const q = rng.pick(PD_MONO_TWO);
  return {
    prompt: `${q.lead}\n\n${verseBlock(q.verse)}\n\nAnswer both questions.`,
    parts: q.asks.map((a, i) => part(mc(rng, a.right, a.wrong), { label: `${i + 1}. ${a.ask}` })),
    hints: ['Read between the lines: what the speaker says calmly may show something terrible he does not see.'],
    solution: q.asks.map((a, i) => `${i + 1}. ${a.right} ${a.why}`),
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
    right: 'He killed a man he would have gladly shared a drink with if they had met anywhere but a battlefield.',
    wrong: ['He was killed by the man he wanted to befriend.', 'He became rich because of the war.', 'He met his enemy at an inn and fought him there.'],
    why: 'At “some old ancient inn” they would have drunk together; “ranged as infantry”, he shot the man dead: a fellow, like him, who had joined up only because he was “out of work”.',
  },
  {
    verse: linesOf(MAN_KILLED_ALL, 9, 12),
    lead: `From ${titled(MAN_KILLED_ALL.poem)} by Thomas Hardy, spoken by a soldier home from war:`,
    ask: 'What do the dash and the repeated “because— / Because he was my foe” suggest?',
    right: 'The speaker is struggling to find a reason for the killing, and the official reason sounds hollow even to him.',
    wrong: ['He is certain that the man deserved to die.', 'He is trying to remember the dead man’s name.', 'He is shouting with anger at his enemy.'],
    why: 'He hesitates, repeats himself and insists “of course” and “That’s clear enough”, which shows that it is not clear to him at all.',
  },
  {
    verse: DIGGING_ALL,
    lead: `${titled(DIGGING_ALL.poem)} by Thomas Hardy. A dead woman, in her grave, asks who is digging above her (“rue” is a plant of mourning; “gin” means trap):`,
    ask: 'What is the irony of the ending?',
    right: 'She is comforted by her dog’s faithfulness, but the dog was only burying a bone and had forgotten whose grave it was.',
    wrong: ['Her lover is secretly digging to bring her back.', 'Her enemy has come to apologize.', 'Her family has planted flowers on the grave.'],
    why: 'Just as she praises “A dog’s fidelity!”, the dog explains it was hiding a bone and “quite forgot / It was your resting-place”.',
  },
  {
    verse: CORY_ALL,
    lead: `${titled(CORY_ALL.poem)} by Edwin Arlington Robinson (“arrayed” means dressed; “in fine” means in short):`,
    ask: 'What is the situational irony of the poem?',
    right: 'The man everyone envied, who seemed to have everything, takes his own life.',
    wrong: ['The poor townspeople suddenly become rich.', 'Richard Cory gives all his money away.', 'Richard Cory loses his fortune and becomes poor.'],
    why: 'For three stanzas the townspeople wish “that we were in his place”; the last line reveals despair that no one had seen.',
  },
  {
    verse: SUCCESS_ALL,
    lead: `${titled(SUCCESS_ALL.poem)} by Emily Dickinson (a “host” is an army; “strains” are sounds of music):`,
    ask: 'What is the paradox in the first two lines?',
    right: 'Those who fail understand the value of success better than those who win it.',
    wrong: ['Successful people enjoy success the most.', 'Success is not worth wanting.', 'Everyone counts success in the same way.'],
    why: 'It seems contradictory that those “who ne’er succeed” prize success most, but the poem shows it is true: only the dying, defeated soldier hears victory “agonized and clear”.',
  },
  {
    verse: MADNESS_ALL,
    lead: `${titled(MADNESS_ALL.poem)} by Emily Dickinson (to “demur” is to object):`,
    ask: 'What is ironic about the way “the majority” decides who is sane?',
    right: 'People who disagree with the majority are called mad and dangerous, even when they see most clearly.',
    wrong: ['The majority is always right about madness.', 'Mad people are kinder than sane ones.', 'People who agree with the majority are locked up.'],
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
        right: 'The gap between the comforting words and her lover’s death makes the reader feel war’s cruelty more sharply.',
        wrong: ['It truly comforts her, so the poem has a happy ending.', 'It shows that the speaker sincerely admires war.', 'It makes the poem light and cheerful.'],
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
        wrong: ['A soldier who has been wounded', 'A general who has lost a battle', 'A bride whose wedding is cancelled'],
        why: 'The “babe” has lost a father who “gulped and died”; the “Mother” mourns over “the bright splendid shroud of your son”.',
      },
      {
        ask: 'Why does the refrain grow more bitter each time it is repeated?',
        right: 'Each stanza adds a new grieving family, so the claim that “War is kind” sounds more and more false.',
        wrong: ['Each stanza reports a victory, so the claim becomes more believable.', 'The speaker forgets the words and has to repeat them.', 'Each stanza is about the same person.'],
        why: 'Lover, father, son: the deaths pile up, and the same comforting phrase becomes harder to bear.',
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
        wrong: ['They show that the speaker truly admires soldiers.', 'They describe a peaceful parade.', 'They praise the regiment’s flag sincerely.'],
        why: '“Virtue” and “excellence” belong with goodness, not “slaughter” and “killing”: the clash exposes the glory as a lie.',
      },
      {
        ask: 'What does “These men were born to drill and die” suggest?',
        right: 'The soldiers’ lives are reduced to training and dying, as if they were made for nothing else.',
        wrong: ['The soldiers have long, happy lives ahead of them.', 'The soldiers are excellent dancers.', 'The soldiers will never have to fight.'],
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
        wrong: ['A general giving orders before a battle', 'The dead man, speaking from his grave', 'A priest preaching about war'],
        why: 'His words are homely and spoken (“Right many a nipperkin”, “Off-hand like”), and he talks about being “out of work” like the man he killed.',
      },
      {
        ask: 'What does the understatement “quaint and curious war is!” suggest?',
        right: 'He cannot find words for how senseless the killing was, so he describes it mildly, which makes its horror clearer.',
        wrong: ['He finds war amusing and harmless.', 'He thinks war is old-fashioned and should be modernized.', 'He enjoyed the fighting.'],
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
        wrong: ['Richard Cory himself', 'Richard Cory’s closest friend', 'A doctor who treated him'],
        why: '“We people on the pavement looked at him”: the speakers are ordinary, poorer townspeople.',
      },
      {
        ask: 'Why does telling it through their eyes make the ending more shocking?',
        right: 'They saw only his polished surface, so his inner despair stays hidden from them, and from us, until the last line.',
        wrong: ['They knew all along that he was unhappy.', 'They describe his thoughts in detail from the first line.', 'They were glad when he died.'],
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
        right: 'Each one has forgotten her or stopped caring.',
        wrong: ['Each one is planting flowers on her grave.', 'Each one is digging to find treasure.', 'Each one is coming to visit her that day.'],
        why: 'Her loved one has married someone rich, her family think “What use!”, and her enemy no longer thinks her “worth her hate”.',
      },
      {
        ask: 'How does the dog’s final answer complete the irony?',
        right: 'Even the one visitor she thinks is faithful has forgotten her: the dog came only to bury a bone.',
        wrong: ['The dog has come to guard her grave forever.', 'The dog is really her lost lover in disguise.', 'The dog digs her out of the grave.'],
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
      solution: [q.why, `So: ${q.right}`],
    };
  }
  const q = rng.pick(PD_IRONY_TWO);
  return {
    prompt: `${q.lead}\n\n${q.passage}\n\nAnswer both questions.`,
    parts: q.asks.map((a, i) => part(mc(rng, a.right, a.wrong), { label: `${i + 1}. ${a.ask}` })),
    hints: ['Ask what the words say on the surface, what the poem actually shows, and why the gap between them matters.'],
    solution: q.asks.map((a, i) => `${i + 1}. ${a.right} ${a.why}`),
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
