/**
 * Grade 12 English, lesson 3.4: Themes and Interpretations (12-C1). Theme statements for Hamlet and
 * what goes wrong with weak ones, the quotation that best supports a claim, and weighing readings of
 * the play (is the madness feigned, why the delay, what did Gertrude know) against the evidence that
 * supports or complicates them (./hamlet.ts). No question asks which reading is "correct".
 */
import { mc, part, skill } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { block } from '../../eng10/gen/common.ts';
import * as H from './hamlet.ts';
import { inline, quoteBlock, where, type Passage } from './hamlet.ts';

const L = 'e12-3-4';

// ---------------------------------------------------------------------------- theme statements

type Flaw = 'theme' | 'topic' | 'plot' | 'command' | 'absolute' | 'unsupported';
interface PlayTheme {
  summary: string;
  theme: string;
  topic: string;
  plot: string;
  command: string;
  absolute: string;
  unsupported: string;
}
const THEMES: PlayTheme[] = [
  {
    summary: 'Hamlet says that “conscience does make cowards of us all”, and that resolution is “sicklied o’er with the pale cast of thought”. In Act 4 he wonders whether his delay comes from “thinking too precisely on th’event”.',
    theme: 'Thinking too long about a terrible deed can weaken the will to carry it out.',
    topic: 'Thought and action',
    plot: 'Hamlet keeps putting off his revenge on Claudius until the very last scene.',
    command: 'Stop thinking so much, and act at once whenever you know what you must do.',
    absolute: 'People who think carefully before they act never manage to do anything at all.',
    unsupported: 'The longer a person thinks about a deed, the easier it becomes to do it.',
  },
  {
    summary: 'A guard senses that “Something is rotten in the state of Denmark.” The Ghost reveals that the old King was murdered by his own brother, who now wears the crown, and soon the court is full of spies, plots and poison.',
    theme: 'Corruption at the top of a state spreads until it poisons everyone around it.',
    topic: 'Corruption',
    plot: 'Claudius poisons his brother, marries the Queen, and rules Denmark until he dies.',
    command: 'Never let a corrupt leader stay in power, whatever it costs you to remove him.',
    absolute: 'Every king who takes the throne by crime ruins his whole kingdom for ever.',
    unsupported: 'A crime committed in secret by a king harms no one except the victim.',
  },
  {
    summary: 'Hamlet tells his mother, “I know not seems”, and after meeting the Ghost he writes down “That one may smile, and smile, and be a villain”. Claudius plays the loving king while hiding a murder, and Hamlet himself puts on an “antic disposition”.',
    theme: 'People can hide their true natures behind false appearances, so the truth is hard to see.',
    topic: 'Appearance and reality',
    plot: 'Claudius pretends to be a good king, and Hamlet pretends to be mad.',
    command: 'Never trust what people show you on the outside, but find out the truth for yourself.',
    absolute: 'Everyone at court is always pretending to be someone that they are not.',
    unsupported: 'In this play, what people show on the outside is a true guide to who they are.',
  },
  {
    summary: 'In the graveyard, Hamlet holds the skull of Yorick, the jester he loved as a child, and imagines that “Imperious Caesar, dead and turn’d to clay, / Might stop a hole to keep the wind away.”',
    theme: 'Death comes to everyone, and it erases the differences between the great and the humble.',
    topic: 'Death',
    plot: 'Hamlet finds the skull of Yorick in a graveyard where a new grave is being dug.',
    command: 'Remember that you will die one day, so never be proud of your rank or wealth.',
    absolute: 'Everyone, without any exception, is forgotten completely as soon as they die.',
    unsupported: 'Rank and wealth can protect a person from the common fate of death.',
  },
  {
    summary: 'Hamlet, Laertes and Fortinbras are all sons whose fathers have been killed. Laertes cries, “To hell, allegiance!”, and plots with Claudius to kill Hamlet with a poisoned sword. By the end, both Hamlet and Laertes lie dead.',
    theme: 'The pursuit of revenge can destroy the avenger as surely as it destroys the guilty.',
    topic: 'Revenge',
    plot: 'Laertes and Hamlet fight a duel in which both are wounded by the poisoned sword.',
    command: 'Forgive the people who have wronged you instead of trying to take revenge on them.',
    absolute: 'Anyone who seeks revenge, for any reason at all, always dies in the attempt.',
    unsupported: 'Revenge brings lasting peace and happiness to the people who carry it out.',
  },
  {
    summary: 'At sea, Hamlet acts on impulse and escapes the King’s plot. He tells Horatio, “There’s a divinity that shapes our ends, / Rough-hew them how we will”, and before the duel he says, “The readiness is all.”',
    theme: 'Accepting what one cannot control can bring a kind of peace, and a readiness to act.',
    topic: 'Fate and providence',
    plot: 'Hamlet escapes from the ship to England and comes back to Denmark for the duel.',
    command: 'Stop worrying about the future, and simply accept whatever happens to you.',
    absolute: 'Nothing that any person plans ever makes the slightest difference to anything.',
    unsupported: 'Only those who plan every step carefully are ready for whatever may come.',
  },
];
const FLAWS: Flaw[] = ['theme', 'topic', 'plot', 'command', 'absolute', 'unsupported'];
const FLAW_WHY: Record<Flaw, string> = {
  theme: 'Nothing: it is a strong theme statement.',
  topic: 'It names a topic, not a complete idea about life.',
  plot: 'It retells the plot instead of stating a message about life.',
  command: 'It gives an order instead of offering an insight.',
  absolute: 'It overgeneralizes with a word like “always”, “never”, “every” or “no one”.',
  unsupported: 'The play does not support it.',
};
/** Diagnoses that could also be argued for a statement of each kind, so they are left out of its choices. */
const FLAW_CLASH: Record<Flaw, Flaw[]> = { theme: [], topic: [], plot: [], command: ['absolute'], absolute: ['unsupported'], unsupported: ['absolute'] };

function themesQ(rng: Rng, d: Difficulty) {
  const t = rng.pick(THEMES);
  if (d === 3) {
    const shown = rng.pick(FLAWS);
    const others = rng.shuffle(FLAWS.filter((x) => x !== shown && !FLAW_CLASH[shown].includes(x)));
    return {
      prompt: `${t.summary}\n\nA student wrote this theme statement for *Hamlet*:\n\n${block(t[shown])}\n\nWhat, if anything, is wrong with it?`,
      parts: [part(mc(rng, FLAW_WHY[shown], others.map((x) => FLAW_WHY[x])))],
      hints: ['A strong theme statement is a complete sentence about life in general, supported by the play, with no orders and no words like “always” and “never”.'],
      solution: [FLAW_WHY[shown], shown === 'theme' ? 'It states a general insight that the play supports.' : `A stronger theme statement would be: “${t.theme}”`],
    };
  }
  const wrong = d === 1 ? [t.topic, t.plot, t.unsupported] : [t.command, t.absolute, rng.pick([t.topic, t.plot, t.unsupported])];
  return {
    prompt: `${t.summary}\n\nWhich is the best statement of a **theme** of *Hamlet*?`,
    parts: [part(mc(rng, t.theme, wrong))],
    hints: ['A theme is a message about life or people in general, written as a complete sentence. It is not a topic, a summary of events, or an order to the audience.'],
    solution: [`“${t.theme}” is a complete, general statement about life that the play supports.`, d === 1 ? `“${t.topic}” is only a topic, and “${t.plot}” retells the plot.` : `“${t.command}” is an order, and “${t.absolute}” overgeneralizes.`],
  };
}

// ---------------------------------------------------------------------------- quotation evidence

interface Claim {
  claim: string;
  /** Claims in the same group are never offered against each other. */
  group: string;
  best: Passage;
  /** Quotations that say nothing about this claim. */
  others: Passage[];
  why: string;
}
const CLAIMS: Claim[] = [
  { group: 'delay', claim: 'Hamlet blames himself for being slow to take his revenge.', best: H.ALL_OCCASIONS, others: [H.SMILING_VILLAIN, H.MORE_THINGS, H.POOR_YORICK, H.OWN_SELF_TRUE], why: 'Everything he sees seems to “inform against” him and “spur my dull revenge”: he calls his own revenge dull, that is, sluggish.' },
  { group: 'delay', claim: 'Hamlet accuses himself of cowardice for not yet killing the King.', best: H.PIGEON_LIVERED, others: [H.WORDS_WORDS, H.THIS_PICTURE, H.IMPERIOUS_CAESAR, H.MORE_THINGS], why: 'He calls himself “pigeon-liver’d”, lacking the “gall” that would long ago have fed the King’s body to the kites.' },
  { group: 'grief', claim: 'Hamlet insists that his grief is real and not a show.', best: H.KNOW_NOT_SEEMS, others: [H.ANTIC_DISPOSITION, H.NORTH_NORTH_WEST, H.DENMARKS_A_PRISON, H.SPONGE], why: '“I know not seems”: his black clothes and tears are only “the trappings and the suits of woe”, but he has “that within which passeth show”.' },
  { group: 'claudius', claim: 'Claudius knows he cannot be forgiven while he keeps what the murder won him.', best: H.RETAIN_THE_OFFENCE, others: [H.UNMANLY_GRIEF, H.SOMETIME_SISTER, H.HEDGE_A_KING, H.CHALICE_FOR_THE_NONCE], why: 'He still has “My crown, mine own ambition, and my queen”, and asks, “May one be pardon’d and retain th’offence?”' },
  { group: 'claudius', claim: 'Claudius secretly arranges for Hamlet to be killed.', best: H.DO_IT_ENGLAND, others: [H.UNMANLY_GRIEF, H.SOMETIME_SISTER, H.HEDGE_A_KING, H.OFFENCE_IS_RANK], why: 'His letters to the King of England order “The present death of Hamlet”.' },
  { group: 'gertrude', claim: 'Gertrude comes to see her own guilt when her son confronts her.', best: H.GRAINED_SPOTS, others: [H.NIGHTED_COLOUR, H.MAD_AS_THE_SEA, H.SWEETS_TO_THE_SWEET, H.THE_DRINK], why: 'Hamlet turns her eyes “into my very soul”, where she sees “black and grained spots” that will not fade.' },
  { group: 'ophelia', claim: 'Ophelia obeys her father rather than her own feelings.', best: H.IN_PLAIN_TERMS, others: [H.NOBLE_MIND, H.MERMAID_LIKE, H.SWEETS_TO_THE_SWEET, H.FEAR_IT_OPHELIA], why: 'Ordered not to “give words or talk with the Lord Hamlet”, she answers simply, “I shall obey, my lord.”' },
  { group: 'polonius', claim: 'Polonius is sure that love for Ophelia has driven Hamlet mad.', best: H.ECSTASY_OF_LOVE, others: [H.OWN_SELF_TRUE, H.IN_PLAIN_TERMS, H.METHOD_IN_IT, H.PREGNANT_REPLIES], why: '“This is the very ecstasy of love”: he takes Hamlet’s wild behaviour for the madness of a rejected lover.' },
  { group: 'laertes', claim: 'Laertes is ready to risk his own soul to avenge his father.', best: H.TO_HELL_ALLEGIANCE, others: [H.FEAR_IT_OPHELIA, H.EXCHANGE_FORGIVENESS, H.OWN_TREACHERY], why: 'He sends “Conscience and grace, to the profoundest pit” and says “I dare damnation”: revenge matters more to him than his soul.' },
  { group: 'death', claim: 'Hamlet sees that death brings even the greatest people down to dust.', best: H.IMPERIOUS_CAESAR, others: [H.OWN_SELF_TRUE, H.SPONGE, H.PLAYS_THE_THING], why: 'Caesar, once “Imperious”, is now clay that “Might stop a hole to keep the wind away”.' },
  { group: 'providence', claim: 'By the last act, Hamlet trusts that a higher power shapes events.', best: H.DIVINITY_SHAPES, others: [H.MAY_BE_THE_DEVIL, H.THREE_PARTS_COWARD, H.ROGUE_AND_PEASANT, H.WICKED_SPEED], why: '“There’s a divinity that shapes our ends, / Rough-hew them how we will”: whatever rough plans we make, heaven gives our lives their final shape.' },
  { group: 'appearance', claim: 'Hamlet learns that a man can seem good and still be wicked.', best: H.SMILING_VILLAIN, others: [H.MORE_THINGS, H.REMEMBER_ME, H.OUT_OF_JOINT, H.TOO_SOLID_FLESH], why: 'He writes down “That one may smile, and smile, and be a villain”.' },
  { group: 'rotten', claim: 'Something is wrong in Denmark from the very start of the play.', best: H.SOMETHING_ROTTEN, others: [H.OWN_SELF_TRUE, H.FEAR_IT_OPHELIA, H.IN_PLAIN_TERMS], why: 'A guard senses it even before the Ghost has spoken: “Something is rotten in the state of Denmark.”' },
  { group: 'friends', claim: 'Hamlet sees that his old friends have been sent to spy on him.', best: H.YOU_WERE_SENT_FOR, others: [H.MORE_THINGS, H.THRIFT, H.DENMARKS_A_PRISON, H.NORTH_NORTH_WEST], why: '“You were sent for”: their faces confess it, and he knows “the good King and Queen have sent for you.”' },
];

function evidenceQ(rng: Rng, d: Difficulty) {
  const c = rng.pick(CLAIMS);
  if (d === 3) {
    const others = rng.sample(CLAIMS.filter((x) => x.group !== c.group), 3).map((x) => x.claim);
    return {
      prompt: `${quoteBlock(c.best)}\n\nWhich claim about *Hamlet* does this quotation support best?`,
      parts: [part(mc(rng, c.claim, others))],
      hints: ['Who is speaking, and what do the words show about them or about the play? Choose the claim the words prove most directly.'],
      solution: [c.why, `So the quotation best supports: “${c.claim}”`],
    };
  }
  const wrong = rng.sample(c.others, d === 1 ? 2 : 3).map(inline);
  return {
    prompt: `A student claims: “${c.claim}”\n\nWhich quotation from the play best supports this claim?`,
    parts: [part(mc(rng, inline(c.best), wrong))],
    hints: ['Good evidence proves the claim directly. A quotation can be famous, or come from the right character, and still say nothing about this claim.'],
    solution: [`${inline(c.best)} (${where(c.best)})`, c.why],
  };
}

/** Themes and evidence share one skill: a theme statement, or the quotation that best supports a claim. */
function themesOrEvidence(rng: Rng, d: Difficulty) {
  return rng.chance(0.5) ? themesQ(rng, d) : evidenceQ(rng, d);
}

// ---------------------------------------------------------------------------- readings

interface Evidence {
  line: Passage;
  why: string;
}
interface Reading {
  /** The reading, to follow “Some readers argue that”. */
  view: string;
  supports: Evidence[];
  complicates: Evidence[];
  /** Quotations that have no bearing on this reading. */
  neutral: Passage[];
  /** Weighing one supporting and one complicating quotation (difficulty 3). */
  weigh: { support: Passage; complicate: Passage; right: string; wrong: string[]; why: string };
}
const READINGS: Reading[] = [
  {
    view: '**Hamlet’s madness is only an act**, put on to deceive the court',
    supports: [
      { line: H.ANTIC_DISPOSITION, why: 'He warns his friends in advance that he may “put an antic disposition on”: the madness is planned.' },
      { line: H.MAD_IN_CRAFT, why: 'He tells his mother plainly that he is “not in madness, / But mad in craft”: mad by design.' },
      { line: H.METHOD_IN_IT, why: 'Even Polonius sees “method” in Hamlet’s madness: his wild words make a kind of sense.' },
      { line: H.NORTH_NORTH_WEST, why: 'He is mad only “north-north-west”, and at other times knows “a hawk from a handsaw”: his madness is partial and under control.' },
    ],
    complicates: [
      { line: H.HIS_MADNESS, why: 'Before the duel he tells Laertes that “His madness” did the wrong, not Hamlet himself, which suggests he may truly have been out of his mind.' },
      { line: H.LOST_ALL_MY_MIRTH, why: 'He describes a deep sadness, “but wherefore I know not”, which suggests real distress beneath any act.' },
      { line: H.SEE_NOTHING_THERE, why: 'He sees and speaks to a figure his mother cannot see, so to her, and perhaps to us, his mind seems truly disturbed.' },
    ],
    neutral: [H.OWN_SELF_TRUE, H.SOMETHING_ROTTEN, H.FEAR_IT_OPHELIA, H.WILLOW, H.CHALICE_FOR_THE_NONCE, H.SOMETIME_SISTER],
    weigh: {
      support: H.ANTIC_DISPOSITION,
      complicate: H.HIS_MADNESS,
      right: 'Hamlet plans to act mad, so much of his wildness may be a performance, though his apology leaves open whether grief also unbalanced him at times.',
      wrong: [
        'Hamlet’s apology to Laertes proves that he was truly mad all along, so his plan in Act 1 to act strangely can safely be set aside.',
        'Hamlet’s plan in Act 1 settles the question for good, so anything he says later about his madness must be a lie told to fool Laertes.',
        'Since Hamlet is only a character in a play, there is no evidence either way, and readers should not form any view about his madness.',
      ],
      why: 'Strong interpretation weighs both: the plan for an “antic disposition” supports the reading, while “His madness is poor Hamlet’s enemy” complicates it without simply cancelling it.',
    },
  },
  {
    view: '**Hamlet delays his revenge because he thinks too much**',
    supports: [
      { line: H.CONSCIENCE_COWARDS, why: 'Resolution is “sicklied o’er with the pale cast of thought”: thinking drains away the will to act.' },
      { line: H.THREE_PARTS_COWARD, why: 'He suspects that his delay comes from “thinking too precisely on th’event”, that is, on the outcome.' },
    ],
    complicates: [
      { line: H.DEAD_FOR_A_DUCAT, why: 'He stabs through the tapestry in an instant, without a moment’s thought, so he is not always slow to act.' },
      { line: H.MAY_BE_THE_DEVIL, why: 'He has a practical reason to wait: the Ghost “May be the devil”, so he needs proof before he kills a king.' },
      { line: H.SUDDEN_DEATH, why: 'At sea he rewrites the King’s letter to send Rosencrantz and Guildenstern to “sudden death”, without hesitating at all.' },
    ],
    neutral: [H.SOMETIME_SISTER, H.NIGHTED_COLOUR, H.FEAR_IT_OPHELIA, H.WILLOW, H.SWEETS_TO_THE_SWEET, H.OWN_SELF_TRUE],
    weigh: {
      support: H.CONSCIENCE_COWARDS,
      complicate: H.DEAD_FOR_A_DUCAT,
      right: 'Hamlet does accuse himself of thinking too much, yet he can act in an instant, so his delay may come from doubt or from the deed itself, not thought alone.',
      wrong: [
        'Hamlet kills Polonius without a moment’s thought, which proves that he never once hesitates in the play and has no delay at all to explain.',
        'Hamlet’s words about conscience prove that thinking alone causes his delay, so his sudden killing of Polonius has nothing to tell us.',
        'The play is too old for its words to tell us anything about Hamlet’s mind, so his delay can be explained in any way a reader likes.',
      ],
      why: 'The soliloquy supports the reading, but the rash killing of Polonius shows he can act without thinking, which suggests that something more than thought holds him back from killing Claudius.',
    },
  },
  {
    view: '**Gertrude knew nothing of her first husband’s murder**',
    supports: [
      { line: H.AS_KILL_A_KING, why: 'Her startled question, “As kill a king?”, sounds like someone hearing of the murder for the first time.' },
      { line: H.LEAVE_HER_TO_HEAVEN, why: 'The Ghost, who names his murderer, tells Hamlet to “leave her to heaven”: he blames her conscience, but never accuses her of the murder.' },
    ],
    complicates: [
      { line: H.GRAINED_SPOTS, why: 'She admits to “black and grained spots” on her soul, without ever saying what they are.' },
      { line: H.SICK_SOUL, why: 'Waiting to see Ophelia, she speaks of her “sick soul” and of “guilt”, so she feels guilty about something.' },
    ],
    neutral: [H.OWN_SELF_TRUE, H.NORTH_NORTH_WEST, H.IMPERIOUS_CAESAR, H.FEAR_IT_OPHELIA, H.PIGEON_LIVERED, H.WILLOW],
    weigh: {
      support: H.AS_KILL_A_KING,
      complicate: H.GRAINED_SPOTS,
      right: 'Her surprise suggests that she did not know of the murder, and the “grained spots” may be guilt over her hasty marriage, though the play never says so plainly.',
      wrong: [
        'Her talk of “black and grained spots” proves that she helped to plan the murder, so her surprise at “As kill a king?” must have been an act.',
        'Her surprise at “As kill a king?” proves that she is innocent of everything, so her talk of “black and grained spots” can simply be ignored.',
        'Gertrude says too little in the play for any reader to form a view, so the question of what she knew cannot be discussed at all.',
      ],
      why: 'Her shock supports the reading. Her guilt complicates it, but the play leaves open what that guilt is for, so a careful reader holds both.',
    },
  },
  {
    view: '**Hamlet truly loved Ophelia**',
    supports: [
      { line: H.FORTY_THOUSAND, why: 'At her grave he cries that “forty thousand brothers” could not match his love.' },
      { line: H.LOVE_LETTER, why: 'In the love letter that Polonius reads aloud, Hamlet writes, “never doubt I love.”' },
    ],
    complicates: [
      { line: H.LOVED_YOU_ONCE, why: 'He tells her “I loved you not”, flatly denying the love he had just admitted.' },
      { line: H.NUNNERY, why: 'He orders her “to a nunnery” and calls her a possible “breeder of sinners”, treating her with contempt.' },
    ],
    neutral: [H.SOMETHING_ROTTEN, H.DO_IT_ENGLAND, H.CHALICE_FOR_THE_NONCE, H.OWN_TREACHERY, H.HEDGE_A_KING, H.THREE_PARTS_COWARD],
    weigh: {
      support: H.FORTY_THOUSAND,
      complicate: H.LOVED_YOU_ONCE,
      right: 'The two lines pull against each other: his cruelty in Act 3 may come from his act or his anger, and his grief at her grave suggests a real love, badly damaged.',
      wrong: [
        '“I loved you not” settles the question, so his claim at the grave to love her more than forty thousand brothers must be a lie.',
        'His claim at the grave settles the question, so his cruel words to her in Act 3 have nothing at all to tell us about his feelings.',
        'Love cannot be shown on a stage, so neither line tells us anything, and readers should not form a view about Hamlet’s feelings.',
      ],
      why: 'Each quotation is evidence, and neither cancels the other. A careful reading asks why he might say each, and what the contradiction shows.',
    },
  },
  {
    view: '**the Ghost tells Hamlet the truth**',
    supports: [
      { line: H.OFFENCE_IS_RANK, why: 'Alone, Claudius confesses “A brother’s murder”, just as the Ghost said.' },
      { line: H.GHOSTS_WORD, why: 'After the play, Hamlet will “take the ghost’s word for a thousand pound”: the King’s reaction has confirmed it.' },
    ],
    complicates: [
      { line: H.MAY_BE_THE_DEVIL, why: 'Hamlet fears that the spirit “May be the devil”, taking a pleasing shape to damn him.' },
      { line: H.ANGELS_AND_MINISTERS, why: 'Hamlet cannot tell whether it is “a spirit of health or goblin damn’d”, bringing “airs from heaven or blasts from hell”.' },
      { line: H.TEMPT_TOWARD_FLOOD, why: 'Horatio fears that the Ghost may lure Hamlet to the cliff’s edge and “draw you into madness”.' },
    ],
    neutral: [H.OWN_SELF_TRUE, H.FEAR_IT_OPHELIA, H.WILLOW, H.SPONGE, H.SOMETIME_SISTER, H.IMPERIOUS_CAESAR],
    weigh: {
      support: H.OFFENCE_IS_RANK,
      complicate: H.MAY_BE_THE_DEVIL,
      right: 'Claudius’s private confession confirms the Ghost’s story of the murder, though Hamlet’s fear reminds us that a true story could still serve a dark purpose.',
      wrong: [
        'Hamlet’s fear that the Ghost “May be the devil” proves that it lied, so Claudius’s confession of “A brother’s murder” must mean something else.',
        'Claudius’s confession proves the Ghost honest in every way, so Hamlet’s doubts were foolish and there was never anything to question.',
        'Ghosts do not exist, so nothing the Ghost says can be weighed as evidence, and the question of its honesty has no place in the play.',
      ],
      why: 'The confession supports the Ghost’s account; Hamlet’s doubt was reasonable before he had it, and the bloodshed that revenge brings leaves its purpose open to question.',
    },
  },
  {
    view: '**Claudius truly feels the guilt of his crime**',
    supports: [
      { line: H.SMART_A_LASH, why: 'Hearing Polonius, he admits in an aside, “How smart a lash that speech doth give my conscience!”' },
      { line: H.OFFENCE_IS_RANK, why: 'Alone, he says his offence is “rank, it smells to heaven”.' },
    ],
    complicates: [
      { line: H.RETAIN_THE_OFFENCE, why: 'He will not give up “My crown, mine own ambition, and my queen”, so his guilt does not lead him to undo his crime.' },
      { line: H.DO_IT_ENGLAND, why: 'Later he orders “The present death of Hamlet”, adding a new murder to the old one.' },
      { line: H.SWORD_UNBATED, why: 'He plots with Laertes to kill Hamlet with “A sword unbated”, a second murder planned in cold blood.' },
    ],
    neutral: [H.THRIFT, H.FEAR_IT_OPHELIA, H.POOR_YORICK, H.NORTH_NORTH_WEST, H.WILLOW, H.OWN_SELF_TRUE],
    weigh: {
      support: H.OFFENCE_IS_RANK,
      complicate: H.RETAIN_THE_OFFENCE,
      right: 'Claudius truly feels the weight of his crime, but he will not give up the crown and queen he gained by it, so his guilt is real without being repentance.',
      wrong: [
        'Claudius feels no guilt at all, and his speech about his “rank” offence is only an act put on to fool the courtiers who are listening.',
        'Claudius’s guilt proves that he has fully repented, so he gives up the crown at once and is forgiven by heaven before the play ends.',
        'A villain’s words can never be trusted, so nothing Claudius says when alone can tell us anything about what he truly feels.',
      ],
      why: 'He speaks alone, so his guilt is genuine; but he asks, “May one be pardon’d and retain th’offence?”, and keeps the offence. Guilt and repentance are not the same.',
    },
  },
  {
    view: '**Ophelia’s death was an accident**',
    supports: [
      { line: H.MERMAID_LIKE, why: 'Gertrude says that “an envious sliver broke” and Ophelia fell into the brook, singing, “As one incapable of her own distress”.' },
    ],
    complicates: [
      { line: H.CHRISTIAN_BURIAL, why: 'The gravediggers question her Christian burial, since she “wilfully seeks her own salvation”, a muddled way of saying that she took her own life.' },
    ],
    neutral: [H.HIS_MADNESS, H.KNOW_NOT_SEEMS, H.DO_IT_ENGLAND, H.OWN_SELF_TRUE, H.DOUBLET_UNBRACED, H.SOMETIME_SISTER],
    weigh: {
      support: H.MERMAID_LIKE,
      complicate: H.CHRISTIAN_BURIAL,
      right: 'Gertrude describes an accident, yet the gravediggers’ talk shows that people in Denmark doubt it, so the play leaves the cause of her death uncertain.',
      wrong: [
        'The gravediggers’ words prove that Ophelia meant to die, so Gertrude’s account of a broken branch must be a lie told to the court.',
        'The gravediggers are only clowns, so their talk proves nothing at all, and Gertrude’s account settles that her death was an accident.',
        'Ophelia’s death happens offstage, so the play gives no evidence about it at all, and any view about it is as good as any other.',
      ],
      why: 'Gertrude’s account supports the reading and the gravediggers’ doubt complicates it; the play does not settle the question, and a careful reader says so.',
    },
  },
];

const BEARING = { support: 'It supports this reading.', complicate: 'It complicates this reading.', none: 'It has no bearing on this reading.' };

/** Wrong quotations of about the key's length, so that the longest choice is not a tell. */
function similar(rng: Rng, key: Passage, pool: Passage[], n: number): Passage[] {
  const len = inline(key).length;
  const near = pool.filter((p) => inline(p).length * 1.15 >= len);
  const picked = rng.sample(near, Math.min(n, near.length));
  const rest = rng.shuffle(pool.filter((p) => !picked.includes(p))).sort((a, b) => inline(b).length - inline(a).length);
  return [...picked, ...rest.slice(0, n - picked.length)];
}

function readingsQ(rng: Rng, d: Difficulty) {
  const r = rng.pick(READINGS);
  const intro = `Some readers argue that ${r.view}.`;
  if (d === 3) {
    const w = r.weigh;
    return {
      prompt: `${intro} One student points to this passage:\n\n${quoteBlock(w.support)}\n\nAnother points to this one:\n\n${quoteBlock(w.complicate)}\n\nWhich conclusion weighs this evidence best?`,
      parts: [part(mc(rng, w.right, w.wrong))],
      hints: ['A careful reading admits evidence on both sides. Be wary of any answer that lets one quotation cancel the other, or that refuses to weigh the text at all.'],
      solution: [w.why],
    };
  }
  if (d === 2 && rng.chance(0.4)) {
    const side = rng.chance(0.5) ? 'support' : 'complicate';
    const e = rng.pick(side === 'support' ? r.supports : r.complicates);
    return {
      prompt: `${intro}\n\n${quoteBlock(e.line)}\n\nHow does this passage bear on that reading?`,
      parts: [part(mc(rng, BEARING[side], [BEARING[side === 'support' ? 'complicate' : 'support'], BEARING.none]))],
      hints: ['Ask whether the passage makes the reading more likely, gives a reason to doubt it, or says nothing about it.'],
      solution: [e.why, side === 'support' ? 'So it supports the reading.' : 'So it complicates the reading: it does not disprove it, but a careful reader must account for it.'],
    };
  }
  const side = d === 1 ? 'support' : 'complicate';
  const e = rng.pick(side === 'support' ? r.supports : r.complicates);
  const opposite = rng.pick(side === 'support' ? r.complicates : r.supports).line;
  const wrong = [opposite, ...similar(rng, e.line, r.neutral, 2)];
  return {
    prompt: `${intro}\n\nWhich quotation **${side === 'support' ? 'supports' : 'complicates'}** this reading?`,
    parts: [part(mc(rng, inline(e.line), wrong.map(inline)))],
    hints: [side === 'support' ? 'Evidence that supports a reading makes it more likely. Ask what each quotation shows, and whether it bears on this reading at all.' : 'Evidence that complicates a reading gives a reason to doubt it, without simply disproving it. Ask which quotation pulls against the reading.'],
    solution: [`${inline(e.line)} (${where(e.line)})`, e.why],
  };
}

export const HAMLET_THEME_SKILLS: SkillDef[] = [
  skill({
    id: 'e12-hamlet-themes',
    name: 'Themes of Hamlet',
    description: 'State the themes of Hamlet as complete, general ideas, explain what is wrong with weak theme statements, and choose the quotation that best supports a claim.',
    outcomes: ['12-C1'],
    lessonId: L,
    format: 'mc',
    gen: themesOrEvidence,
  }),
  skill({
    id: 'e12-hamlet-readings',
    name: 'Interpreting Hamlet',
    description: 'Weigh different readings of Hamlet (is the madness feigned, why does Hamlet delay, what did Gertrude know) against the passages that support or complicate them.',
    outcomes: ['12-C1'],
    lessonId: L,
    format: 'mc',
    gen: readingsQ,
  }),
];
