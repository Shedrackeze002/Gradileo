/**
 * Grade 10 English, lesson 3.4: Themes (10-C1). Theme statements for Romeo and Juliet (hatred and
 * the feud, haste, fate and chance, love, parents and children, violence, the price of peace), what
 * goes wrong with weak ones, and choosing the quotation that best supports a claim about the play.
 */
import { mc, part, skill } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { block } from './common.ts';
import * as P from './play.ts';
import { inline, quoteBlock, where, type Passage } from './play.ts';

const L = 'e10-3-4';

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
    summary: 'Romeo and Juliet are born into two families locked in an “ancient grudge”. By the end of the play Mercutio, Tybalt, Paris, Romeo and Juliet are all dead, and only then do the fathers make peace.',
    theme: 'Hatred handed down from one generation to the next can destroy the innocent along with the guilty.',
    topic: 'Hatred and the feud',
    plot: 'The Montagues and Capulets keep fighting in the streets, their children die, and at last the fathers make peace.',
    command: 'Parents should settle their quarrels before they hand them down to their children.',
    absolute: 'Family feuds that last for generations always end with the death of the children on both sides.',
    unsupported: 'A feud that lasts for generations makes both families stronger and more loyal to each other.',
  },
  {
    summary: 'Romeo and Juliet meet, fall in love and marry within a day. Friar Lawrence warns, “Wisely and slow; they stumble that run fast”, and much of the tragedy follows from decisions made in a rush.',
    theme: 'Acting in haste, without stopping to think, can lead to disaster.',
    topic: 'Haste',
    plot: 'Romeo and Juliet marry the day after they meet, and everything goes wrong.',
    command: 'Take the time to get to know someone well before you agree to marry them.',
    absolute: 'Every decision that is made in a hurry ends in tragedy for someone.',
    unsupported: 'Decisions made quickly, in the heat of the moment, are usually the wisest ones.',
  },
  {
    summary: 'The Prologue calls the lovers “star-cross’d”, and Romeo cries, “O, I am fortune’s fool!” In the end, a letter that would have saved them never arrives, because the friar carrying it is shut in by a quarantine.',
    theme: 'Chance and bad luck can overturn even the most carefully made plans.',
    topic: 'Fate',
    plot: 'Friar John’s letter never reaches Romeo, so Romeo believes Juliet is dead.',
    command: 'If a letter really matters, deliver it yourself instead of trusting a messenger.',
    absolute: 'No one, however careful or clever, can ever escape what fate has planned.',
    unsupported: 'Luck tends to reward people who are brave enough to take risks for love.',
  },
  {
    summary: 'At the Capulets’ feast, Juliet discovers that the young man she has fallen for is a Montague: “My only love sprung from my only hate!” Their love grows in the middle of their families’ hatred.',
    theme: 'Love can grow even across the deepest divisions between people.',
    topic: 'Love',
    plot: 'Juliet falls in love with Romeo and then learns that he is a Montague.',
    command: 'Do not let yourself fall in love with someone from your family’s enemies.',
    absolute: 'True love always conquers everything, even a feud between two families.',
    unsupported: 'Loyalty to one’s own family matters more than love for any outsider.',
  },
  {
    summary: 'Capulet first tells Paris that Juliet should have her say, then orders her to marry Paris or “die in the streets”. Her mother and the Nurse turn away from her too, and Juliet turns to the Friar’s desperate plan.',
    theme: 'When the old will not listen to the young, the young may turn to desperate measures.',
    topic: 'Parents and children',
    plot: 'Capulet orders Juliet to marry Paris, so she goes to Friar Lawrence for help instead.',
    command: 'Parents should let their children choose for themselves whom they will marry.',
    absolute: 'Young people never listen to their parents, however good the advice they are given.',
    unsupported: 'Obeying one’s parents, even against one’s own heart, brings a young person happiness.',
  },
  {
    summary: 'In Act 3, Tybalt kills Mercutio, and Romeo, in “fire-ey’d fury”, kills Tybalt. That one afternoon leads to Romeo’s banishment and, in the end, to the lovers’ deaths.',
    theme: 'Violence breeds more violence, and revenge can destroy the avenger too.',
    topic: 'Violence and revenge',
    plot: 'Tybalt kills Mercutio in the street, and Romeo kills Tybalt in revenge for his friend.',
    command: 'Walk away from a fight, even when someone insults you or your friends.',
    absolute: 'Every fight, however small it seems at first, ends in someone’s death.',
    unsupported: 'Fighting is the best way to defend one’s honour and the honour of one’s friends.',
  },
  {
    summary: 'Over the bodies of Romeo and Juliet, Capulet and Montague finally take each other’s hand, and the Prince says, “All are punish’d.”',
    theme: 'Sometimes enemies make peace only after a terrible loss.',
    topic: 'Reconciliation',
    plot: 'Capulet and Montague shake hands after their children die.',
    command: 'Make peace with your enemies before it is too late.',
    absolute: 'Enemies always become friends in the end, whatever has happened between them.',
    unsupported: 'Peace between two families is impossible once blood has been shed.',
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
      prompt: `${t.summary}\n\nA student wrote this theme statement for *Romeo and Juliet*:\n\n${block(t[shown])}\n\nWhat, if anything, is wrong with it?`,
      parts: [part(mc(rng, FLAW_WHY[shown], others.map((x) => FLAW_WHY[x])))],
      hints: ['A strong theme statement is a complete sentence about life in general, supported by the play, with no orders and no words like “always” and “never”.'],
      solution: [FLAW_WHY[shown], shown === 'theme' ? 'It states a general insight that the play supports.' : `A stronger theme statement would be: “${t.theme}”`],
    };
  }
  const wrong = d === 1 ? [t.topic, t.plot, t.unsupported] : [t.command, t.absolute, rng.pick([t.topic, t.plot, t.unsupported])];
  return {
    prompt: `${t.summary}\n\nWhich is the best statement of a **theme** of *Romeo and Juliet*?`,
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
  others: Passage[];
  why: string;
}
const CLAIMS: Claim[] = [
  { group: 'juliet', claim: 'Juliet senses early on that her love may end in death.', best: P.JULIET_GRAVE, others: [P.WHATS_IN_A_NAME, P.SWEET_SORROW, P.JULIET_LOOK_TO_LIKE], why: 'Juliet fears that her “grave” may be her “wedding bed”: on the night she meets Romeo, she already links love with death.' },
  { group: 'friar', claim: 'Friar Lawrence warns that love which burns too fast can destroy itself.', best: P.VIOLENT_DELIGHTS, others: [P.FRIAR_ALLIANCE, P.FRIAR_MORN, P.TAKE_THIS_VIAL], why: '“Violent delights” have “violent ends”, like fire and gunpowder that destroy each other as they meet.' },
  { group: 'feud', claim: 'Tybalt’s hatred of the Montagues is fierce and personal.', best: P.TYBALT_HATE, others: [P.BENVOLIO_PEACE, P.CAPULET_WEALTH, P.QUEEN_MAB], why: 'Tybalt says he hates peace “as I hate hell, all Montagues, and thee”: his hatred is total, and aimed at Benvolio himself.' },
  { group: 'fate', claim: 'Romeo sees himself as the victim of fate.', best: P.FORTUNES_FOOL, others: [P.BUT_SOFT, P.ROMEO_TRUE_BEAUTY, P.NEVER_INJURED], why: 'Calling himself “fortune’s fool”, Romeo blames fate for making him kill Tybalt.' },
  { group: 'feud', claim: 'Mercutio blames both families for his death.', best: P.PLAGUE, others: [P.QUEEN_MAB, P.MERCUTIO_DREAMS, P.VILE_SUBMISSION], why: 'Dying, Mercutio curses both “houses”, Montague and Capulet, for the feud that killed him.' },
  { group: 'capulet', claim: 'Capulet comes to treat Juliet as his property, to give away as he chooses.', best: P.HANG_BEG_STARVE, others: [P.CAPULET_STRANGER, P.CAPULET_CONSENT, P.UNTIMELY_FROST], why: '“I’ll give you to my friend” treats Juliet as his to hand over, and he threatens to disown her if she refuses.' },
  { group: 'capulet', claim: 'At first, Capulet wants Juliet to have a say in whom she marries.', best: P.CAPULET_CONSENT, others: [P.HANG_BEG_STARVE, P.KNOT_KNIT, P.DRAG_THEE], why: 'Capulet tells Paris to “get her heart”, because his own will is only “a part” of her consent.' },
  { group: 'feud', claim: 'The feud ends only because of the lovers’ deaths.', best: P.PROLOGUE_STAR_CROSSED, others: [P.PRINCE_FORFEIT, P.TYBALT_HATE, P.MAD_BLOOD], why: 'The Prologue says the lovers’ deaths will “bury their parents’ strife”: only their deaths end the feud.' },
  { group: 'juliet', claim: 'Juliet worries that their love is moving too fast.', best: P.TOO_RASH, others: [P.BOUNDLESS_SEA, P.WHEREFORE, P.SWEET_SORROW], why: 'Juliet calls their vows “too rash, too unadvis’d, too sudden”, like lightning that is over in a moment.' },
  { group: 'romeo', claim: 'Romeo’s love for Juliet begins with her beauty.', best: P.ROMEO_TRUE_BEAUTY, others: [P.FORTUNES_FOOL, P.DEFY_STARS, P.NEVER_INJURED], why: 'Seeing Juliet for the first time, before they have spoken, Romeo says he never saw “true beauty till this night”.' },
  { group: 'friar', claim: 'Friar Lawrence doubts that young men’s love runs deep.', best: P.YOUNG_MENS_LOVE, others: [P.TAKE_THIS_VIAL, P.FRIAR_MORN, P.UNHAPPY_FORTUNE], why: 'The Friar says young men’s love lies “not truly in their hearts, but in their eyes”.' },
  { group: 'nurse', claim: 'The Nurse puts Juliet’s safety ahead of her marriage vows.', best: P.NURSE_THE_COUNTY, others: [P.HIE_YOU_HENCE, P.NURSE_SUSAN, P.NURSE_ANON], why: 'With Romeo banished, the Nurse advises Juliet to marry Paris, though Juliet is already Romeo’s wife.' },
  { group: 'juliet', claim: 'Juliet would rather face death than be unfaithful to Romeo.', best: P.BID_ME_LEAP, others: [P.JULIET_HONOUR, P.JULIET_LOOK_TO_LIKE, P.OUT_OF_BREATH], why: 'Juliet would leap from a tower “rather than marry Paris”.' },
  { group: 'romeo', claim: 'Before Mercutio’s death, Romeo tries to keep the peace.', best: P.FORBEAR, others: [P.FIRE_EYED_FURY, P.TAKE_THE_VILLAIN_BACK, P.BLACK_FATE], why: 'Romeo calls on Benvolio to beat down the swords and begs the fighters to stop.' },
  { group: 'feud', claim: 'The Prince holds the feuding families responsible for the deaths.', best: P.SCOURGE, others: [P.STORY_OF_WOE, P.EXILE, P.MERCY_MURDERS], why: 'The Prince tells Capulet and Montague to see “what a scourge is laid upon your hate”: their feud has killed their children.' },
  { group: 'romeo', claim: 'Romeo describes Juliet with images of light.', best: P.BUT_SOFT, others: [P.FORTUNES_FOOL, P.DESPERATE_MAN, P.NEVER_INJURED], why: 'Romeo sees Juliet’s window as a “light” and Juliet as “the sun”.' },
];
/** Pairs of claims that one quotation could support at once, never offered against each other. */
const CLASH: Array<[string, string]> = [['Friar Lawrence doubts that young men’s love runs deep.', 'Romeo’s love for Juliet begins with her beauty.']];
const clash = (a: Claim, b: Claim) => a.group === b.group || CLASH.some(([x, y]) => (x === a.claim && y === b.claim) || (y === a.claim && x === b.claim));

function evidenceQ(rng: Rng, d: Difficulty) {
  const c = rng.pick(CLAIMS);
  if (d === 3) {
    const others = rng.sample(CLAIMS.filter((x) => !clash(x, c)), 3).map((x) => x.claim);
    return {
      prompt: `${quoteBlock(c.best)}\n\nWhich claim about *Romeo and Juliet* does this quotation support best?`,
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

export const PLAY_THEME_SKILLS: SkillDef[] = [
  skill({
    id: 'e10-play-themes',
    name: 'Themes of Romeo and Juliet',
    description: 'State the themes of Romeo and Juliet as complete, general ideas, and explain what is wrong with weak theme statements.',
    outcomes: ['10-C1'],
    lessonId: L,
    format: 'mc',
    gen: themesQ,
  }),
  skill({
    id: 'e10-quote-evidence',
    name: 'Quotations as evidence',
    description: 'Choose the quotation from Romeo and Juliet that best supports a claim, and the claim a quotation best supports.',
    outcomes: ['10-C1'],
    lessonId: L,
    format: 'mc',
    gen: evidenceQ,
  }),
];
