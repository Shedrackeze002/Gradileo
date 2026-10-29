/**
 * Grade 11 English, lesson 3.4: Tragedy and Theme (11-C1). The ideas of tragedy (tragic hero,
 * hamartia, hubris, recognition, catharsis) applied to Macbeth; theme statements for the play and
 * what goes wrong with weak ones; and choosing the quotation that best supports a claim (./macbeth.ts).
 */
import { mc, part, skill } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { block } from '../../eng10/gen/common.ts';
import * as M from './macbeth.ts';
import { inline, quoteBlock, where, type Passage } from './macbeth.ts';

const L = 'e11-3-4';

// ---------------------------------------------------------------------------- tragedy

type Term = 'hero' | 'hamartia' | 'hubris' | 'recognition' | 'catharsis';
const TERM_NAME: Record<Term, string> = {
  hero: 'Tragic hero',
  hamartia: 'Hamartia (tragic flaw)',
  hubris: 'Hubris',
  recognition: 'Recognition (anagnorisis)',
  catharsis: 'Catharsis',
};
const TERM_WHAT: Record<Term, string> = {
  hero: 'a character of high standing and real greatness who falls to ruin through a flaw or error of their own',
  hamartia: 'the flaw or error of judgement in the hero that leads to their downfall',
  hubris: 'excessive pride or overconfidence that leads a person to defy limits, fate or the gods',
  recognition: 'the moment when the hero realizes the truth about their situation or their mistake',
  catharsis: 'the release of pity and fear that the audience feels at the end of the play',
};

/** Applying the ideas to Macbeth (difficulty 2). */
const APPLY: Array<{ ask: string; right: string; wrong: string[]; why: string }> = [
  {
    ask: 'What makes Macbeth a **tragic hero** at the start of the play?',
    right: 'He is a brave and admired general of high rank, so his fall is a fall from real greatness.',
    wrong: ['He is a villain from the very first scene, with no good qualities that could make us admire him.', 'He is a poor, ordinary man who rises to power by luck and then loses it again.', 'He is a comic character whom the audience laughs at, so his fall does not move anyone.'],
    why: 'In Act 1 he is “brave Macbeth”, praised by the King as a “valiant cousin! worthy gentleman!”. A tragic hero must have greatness to lose.',
  },
  {
    ask: 'What is Macbeth’s **hamartia**, the flaw that leads to his downfall?',
    right: 'His ambition, which he admits is his only spur to murder.',
    wrong: ['His loyalty to Duncan, which blinds him to the King’s faults.', 'His cowardice in battle, which the captain reports to the King.', 'His honesty, which makes him tell everyone his plans.'],
    why: 'He has “no spur … but only / Vaulting ambition, which o’erleaps itself / And falls on th’ other”: ambition drives him to murder and to ruin.',
  },
  {
    ask: 'Which moment best shows Macbeth’s **hubris**?',
    right: 'After the apparitions’ promises, he boasts that his castle “will laugh a siege to scorn” and that he bears “a charmed life”.',
    wrong: ['After killing Duncan, he hears a voice cry, “Sleep no more!”, and he is too afraid to go back to the room.', 'He fights bravely for Duncan against the rebels and the Norwegians in Act 1, and is praised for it.', 'Before the murder, he hesitates and tells his wife, “We will proceed no further in this business.”'],
    why: 'Trusting the witches, Macbeth becomes overconfident and believes himself untouchable, exactly the “security” Hecate calls “mortals’ chiefest enemy”.',
  },
  {
    ask: 'Which moment is Macbeth’s **recognition**, when he sees the truth about how he has been deceived?',
    right: 'When Macduff reveals his birth, and Macbeth sees that the “juggling fiends” deceived him with double meanings.',
    wrong: ['When the witches first hail him on the heath as Thane of Cawdor, and he begins to dream of the crown.', 'When he is crowned at Scone, and realizes that the throne the witches promised is finally his.', 'When he meets the hired murderers and plans the deaths of Banquo and Fleance in secret.'],
    why: 'Only at the end does Macbeth see that the prophecies were equivocations: true in their words, false to his hopes.',
  },
  {
    ask: 'How does the ending of *Macbeth* produce **catharsis**?',
    right: 'Watching a once-great man fall and die arouses pity and fear, which are released as order returns under Malcolm.',
    wrong: ['The audience laughs with relief as Macbeth is defeated, because he was a villain from start to finish.', 'Macbeth wins the final battle against Macduff, so the audience feels relieved and happy for him.', 'The witches are caught and punished at the end, so the audience feels nothing for Macbeth at all.'],
    why: 'Catharsis is the release of pity and fear: we pity the man Macbeth was and fear what ambition can do, and the restored order lets those feelings settle.',
  },
  {
    ask: 'Why is Macbeth’s fall more tragic than if he were simply a villain?',
    right: 'He knows that murder is wrong and does it anyway, and we watch a man of courage and conscience destroy himself.',
    wrong: ['He never feels any guilt at all, so the audience has no feelings about him either way.', 'He is forced to kill by the witches’ spells, so none of what happens to him is really his own fault.', 'He is only a minor character in the play, so his death changes nothing for anyone.'],
    why: 'Macbeth knows the deed is evil (Duncan’s “virtues / Will plead like angels” against it), yet he chooses it. The waste of a great man is what makes tragedy painful.',
  },
];

/** Quotations that show each idea (difficulty 3). */
const SHOWS: Array<{ term: Exclude<Term, 'catharsis'>; line: Passage }> = [
  { term: 'hero', line: M.BRAVE_MACBETH },
  { term: 'hero', line: M.VALIANT_COUSIN },
  { term: 'hamartia', line: M.VAULTING_AMBITION },
  { term: 'hamartia', line: M.STARS_HIDE },
  { term: 'hubris', line: M.THAT_WILL_NEVER_BE },
  { term: 'hubris', line: M.LAUGH_A_SIEGE },
  { term: 'hubris', line: M.CHARMED_LIFE },
  { term: 'hubris', line: M.NOT_AFRAID_TILL_BIRNAM },
  { term: 'recognition', line: M.JUGGLING_FIENDS },
  { term: 'recognition', line: M.EQUIVOCATION_OF_FIEND },
];
const SHOW_WHY: Record<Exclude<Term, 'catharsis'>, string> = {
  hero: 'It shows Macbeth’s greatness at the start: brave, honoured and admired, a man with far to fall.',
  hamartia: 'It shows his ambition, the flaw that drives him to murder.',
  hubris: 'It shows his overconfidence: trusting the prophecies, he believes nothing can touch him.',
  recognition: 'It shows him realizing that the witches’ promises were tricks with double meanings.',
};

function tragedyQ(rng: Rng, d: Difficulty) {
  const terms = Object.keys(TERM_NAME) as Term[];
  if (d === 1) {
    const t = rng.pick(terms);
    const others = rng.sample(terms.filter((x) => x !== t), 3);
    if (rng.chance(0.5)) {
      return {
        prompt: `In the language of tragedy, which term names ${TERM_WHAT[t]}?`,
        parts: [part(mc(rng, TERM_NAME[t], others.map((x) => TERM_NAME[x])))],
        hints: ['Tragic hero: the great person who falls. Hamartia: the flaw. Hubris: overconfidence. Recognition: seeing the truth. Catharsis: what the audience feels.'],
        solution: [`${TERM_NAME[t]}: ${TERM_WHAT[t]}.`],
      };
    }
    return {
      prompt: `In tragedy, what does **${TERM_NAME[t].toLowerCase().replace(/ \(.*\)$/, '')}** mean?`,
      parts: [part(mc(rng, capFirst(TERM_WHAT[t]), others.map((x) => capFirst(TERM_WHAT[x]))))],
      hints: ['Think of how the term applies to Macbeth: his greatness, his flaw, his overconfidence, his moment of truth, and how the audience feels at the end.'],
      solution: [`${TERM_NAME[t]}: ${TERM_WHAT[t]}.`],
    };
  }
  if (d === 2) {
    const a = rng.pick(APPLY);
    return {
      prompt: a.ask,
      parts: [part(mc(rng, a.right, a.wrong))],
      hints: ['Recall the definition of the term first, then find the moment or quality in the play that fits it.'],
      solution: [a.right, a.why],
    };
  }
  const want = rng.pick(['hero', 'hamartia', 'hubris', 'recognition'] as const);
  const right = rng.pick(SHOWS.filter((s) => s.term === want));
  const others = (['hero', 'hamartia', 'hubris', 'recognition'] as const).filter((t) => t !== want).map((t) => rng.pick(SHOWS.filter((s) => s.term === t)).line);
  return {
    prompt: SHOW_ASK[want],
    parts: [part(mc(rng, inline(right.line), others.map(inline)))],
    hints: ['Read each quotation and ask what it shows about Macbeth: greatness, ambition, overconfidence, or a moment of seeing the truth.'],
    solution: [`${inline(right.line)} (${where(right.line)})`, SHOW_WHY[want]],
  };
}
const capFirst = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
/** What each quotation question asks for: one quality of Macbeth that only one of the four quotations shows. */
const SHOW_ASK: Record<'hero' | 'hamartia' | 'hubris' | 'recognition', string> = {
  hero: 'A tragic hero has real greatness to lose. Which quotation best shows Macbeth’s **greatness** before his fall?',
  hamartia: 'Which quotation best shows Macbeth’s **hamartia**, the tragic flaw that drives him to murder?',
  hubris: 'Which quotation best shows Macbeth’s **hubris**, the overconfidence that makes him think he cannot be beaten?',
  recognition: 'Which quotation best shows Macbeth’s moment of **recognition**, when he sees the truth about the witches’ promises?',
};

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
    summary: 'Macbeth admits that nothing spurs him to kill Duncan except “vaulting ambition, which o’erleaps itself / And falls on th’ other”. He gains the crown, but loses his peace, his wife and finally his life.',
    theme: 'Ambition that is not held in check by conscience destroys the person it drives.',
    topic: 'Ambition',
    plot: 'Macbeth kills Duncan to become king, and in the end he is killed by Macduff.',
    command: 'Do not let ambition rule your life, or it will lead you into terrible crimes.',
    absolute: 'Ambitious people always end up destroying themselves and everyone around them.',
    unsupported: 'Ambition is the surest road to lasting happiness, as long as you act boldly.',
  },
  {
    summary: 'After the murder, Macbeth hears a voice cry “Sleep no more!”, and Lady Macbeth, who once said “A little water clears us of this deed”, later walks in her sleep, trying to wash blood from her hands.',
    theme: 'Guilt cannot be washed away; it eats at the minds of the guilty.',
    topic: 'Guilt',
    plot: 'Lady Macbeth walks in her sleep and tries to wash her hands.',
    command: 'Never do anything that you would feel guilty about later.',
    absolute: 'Every criminal is eventually driven mad by guilt over the crime.',
    unsupported: 'People who commit terrible crimes soon forget them and live in peace.',
  },
  {
    summary: 'Duncan says, “There’s no art / To find the mind’s construction in the face,” then trusts Macbeth completely. Lady Macbeth tells her husband to “look like the innocent flower, / But be the serpent under’t.”',
    theme: 'People can hide evil intentions behind a friendly face, so appearances can deceive.',
    topic: 'Appearance and reality',
    plot: 'Macbeth and his wife warmly welcome Duncan to their castle and then murder him in his sleep.',
    command: 'Never trust a smiling face, because a friend may be an enemy in disguise.',
    absolute: 'Everyone who smiles at you is secretly hiding some evil intention behind the smile.',
    unsupported: 'A person’s face always shows what they truly feel, so it is easy to spot a traitor.',
  },
  {
    summary: 'The witches tell Macbeth that he will be king, but they never tell him to kill anyone. Banquo hears a prophecy too, and does nothing to make it come true.',
    theme: 'A prophecy may tempt a person, but the choice to commit a crime is still their own.',
    topic: 'Fate and free will',
    plot: 'The witches make their prophecies, and Macbeth murders Duncan to become king.',
    command: 'Do not listen to fortune-tellers, or you may be tempted into doing evil.',
    absolute: 'No one can ever escape what has been foretold, however hard they try.',
    unsupported: 'People are not responsible for what they do after hearing a prophecy.',
  },
  {
    summary: 'Under Macbeth, Ross says, Scotland “cannot / Be call’d our mother, but our grave”. Nature itself seems disordered, and peace returns only when Malcolm is hailed King of Scotland.',
    theme: 'A ruler who seizes power through violence brings suffering to the whole country.',
    topic: 'Tyranny',
    plot: 'Macbeth rules Scotland cruelly until Malcolm’s army defeats him at Dunsinane.',
    command: 'Choose your leaders carefully, and never follow one who has used violence.',
    absolute: 'Every ruler who takes power by force is overthrown within a year.',
    unsupported: 'A strong ruler is good for a country however he gains his power.',
  },
  {
    summary: 'Lady Macbeth tells her husband, “When you durst do it, then you were a man,” but Macduff, told to “Dispute it like a man” when he hears of his family’s murder, answers that he “must also feel it as a man”.',
    theme: 'True manhood includes feeling and conscience, not only the courage to kill.',
    topic: 'Manhood',
    plot: 'Lady Macbeth calls her husband a coward, and Macduff grieves for his family.',
    command: 'Men should never be afraid to show their grief when they lose someone.',
    absolute: 'Real men never show their feelings, whatever happens to them.',
    unsupported: 'Being a man means being willing to do anything to get what you want.',
  },
  {
    summary: 'After killing Duncan, Macbeth kills the grooms, then has Banquo murdered, then Macduff’s family. “It will have blood, they say, blood will have blood.”',
    theme: 'One violent act leads to another, until the violence destroys the one who began it.',
    topic: 'Violence',
    plot: 'Macbeth kills Duncan, Banquo and Macduff’s family, and is killed himself.',
    command: 'Never answer violence with violence, even when you have been wronged.',
    absolute: 'Every murderer is always caught and punished before the year is out.',
    unsupported: 'A single murder can solve a problem for good, if it is done quickly.',
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
      prompt: `${t.summary}\n\nA student wrote this theme statement for *Macbeth*:\n\n${block(t[shown])}\n\nWhat, if anything, is wrong with it?`,
      parts: [part(mc(rng, FLAW_WHY[shown], others.map((x) => FLAW_WHY[x])))],
      hints: ['A strong theme statement is a complete sentence about life in general, supported by the play, with no orders and no words like “always” and “never”.'],
      solution: [FLAW_WHY[shown], shown === 'theme' ? 'It states a general insight that the play supports.' : `A stronger theme statement would be: “${t.theme}”`],
    };
  }
  const wrong = d === 1 ? [t.topic, t.plot, t.unsupported] : [t.command, t.absolute, rng.pick([t.topic, t.plot, t.unsupported])];
  return {
    prompt: `${t.summary}\n\nWhich is the best statement of a **theme** of *Macbeth*?`,
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
  { group: 'lady', claim: 'Lady Macbeth fears that her husband is too gentle to seize the crown.', best: M.MILK_OF_KINDNESS, others: [M.OUT_DAMNED_SPOT, M.NAUGHTS_HAD, M.THICK_NIGHT], why: 'She fears his nature is “too full o’ th’ milk of human kindness / To catch the nearest way”: he has ambition but not the ruthlessness to act on it.' },
  { group: 'lady', claim: 'Lady Macbeth calls on dark powers to make her cruel.', best: M.RAVEN, others: [M.LITTLE_WATER, M.INNOCENT_FLOWER, M.BANQUOS_BURIED], why: 'She calls on spirits to “unsex” her and fill her “top-full / Of direst cruelty”.' },
  { group: 'guilt', claim: 'Macbeth is tormented by guilt immediately after the murder.', best: M.NEPTUNE, others: [M.VAULTING_AMBITION, M.BRAVE_MACBETH, M.LAUGH_A_SIEGE], why: 'Right after killing Duncan, he feels that all the oceans could not wash the blood from his hand.' },
  { group: 'guilt', claim: 'By the end of the play, Macbeth has grown hardened to horror.', best: M.TASTE_OF_FEARS, others: [M.NEPTUNE, M.DAGGER, M.SLEEP_NO_MORE], why: 'He has “almost forgot the taste of fears”: once a night-shriek chilled him, but now he has “supp’d full with horrors”.' },
  { group: 'banquo', claim: 'Banquo is wary of the witches’ promises.', best: M.INSTRUMENTS_OF_DARKNESS, others: [M.BANQUO_PROPHECY, M.FLY_FLEANCE, M.STRANGE_GARMENTS], why: 'He warns that the “instruments of darkness tell us truths” to win our trust and then betray us.' },
  { group: 'macduff', claim: 'Macduff believes a man can grieve openly and still be brave.', best: M.FEEL_IT_AS_A_MAN, others: [M.BLEED_POOR_COUNTRY, M.FIT_TO_GOVERN, M.MALCOLM_TEST], why: 'Told to “Dispute it like a man”, he answers that he “must also feel it as a man”.' },
  { group: 'witches', claim: 'The witches’ prophecies mislead Macbeth with double meanings.', best: M.JUGGLING_FIENDS, others: [M.ALL_HAIL, M.DOUBLE_DOUBLE, M.MIDNIGHT_HAGS], why: 'Macbeth calls them “juggling fiends” who “palter with us in a double sense”, keeping their word “to our ear” and breaking it “to our hope”.' },
  { group: 'duncan', claim: 'Duncan cannot tell a traitor from a loyal man.', best: M.NO_ART, others: [M.CAWDOR_LEAVING, M.CURSED_THOUGHTS, M.HOPE_DRUNK], why: 'He admits there is “no art / To find the mind’s construction in the face”, and he trusted the traitor Cawdor completely.' },
  { group: 'nature', claim: 'Nature itself seems disturbed by Duncan’s murder.', best: M.FALCON_OWL, others: [M.PLEASANT_SEAT, M.HEW_A_BOUGH, M.YELLOW_LEAF], why: 'A “mousing owl” kills a proud falcon, an “unnatural” event “like the deed that’s done”.' },
  { group: 'ambition', claim: 'Macbeth feels his crown is worthless because he has no heir.', best: M.FRUITLESS_CROWN, others: [M.ASSURANCE_DOUBLE_SURE, M.LAUGH_A_SIEGE, M.STEPPED_IN_BLOOD], why: 'The witches gave him a “fruitless crown” and a “barren sceptre”, with “No son of mine succeeding”.' },
  { group: 'end', claim: 'Macbeth comes to see life itself as meaningless.', best: M.TOMORROW, others: [M.DAGGER, M.VAULTING_AMBITION, M.LAY_ON], why: 'Life is “a tale / Told by an idiot, full of sound and fury, / Signifying nothing.”' },
  { group: 'lady', claim: 'Lady Macbeth believes at first that the murder can easily be forgotten.', best: M.LITTLE_WATER, others: [M.RAVEN, M.OUT_DAMNED_SPOT, M.ARE_YOU_A_MAN], why: '“A little water clears us of this deed: / How easy is it then!” She will later find it anything but easy.' },
  { group: 'ambition', claim: 'Macbeth decides to act at once, without stopping to think.', best: M.FIRSTLINGS, others: [M.PROCEED_NO_FURTHER, M.AMEN, M.TO_BE_THUS], why: 'From now on, “The very firstlings of my heart shall be / The firstlings of my hand”: whatever he feels first, he will do at once.' },
  { group: 'lady', claim: 'Becoming queen has not brought Lady Macbeth happiness.', best: M.NAUGHTS_HAD, others: [M.RAVEN, M.IF_WE_FAIL, M.LITTLE_WATER], why: '“Naught’s had, all’s spent, / Where our desire is got without content”: they have what they wanted, but no contentment.' },
];

function evidenceQ(rng: Rng, d: Difficulty) {
  const c = rng.pick(CLAIMS);
  if (d === 3) {
    const others = rng.sample(CLAIMS.filter((x) => x.group !== c.group), 3).map((x) => x.claim);
    return {
      prompt: `${quoteBlock(c.best)}\n\nWhich claim about *Macbeth* does this quotation support best?`,
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

export const MACBETH_THEME_SKILLS: SkillDef[] = [
  skill({
    id: 'e11-tragedy',
    name: 'Macbeth as a tragedy',
    description: 'Apply the ideas of tragic hero, hamartia, hubris, recognition and catharsis to Macbeth, and choose the quotations that show them.',
    outcomes: ['11-C1'],
    lessonId: L,
    format: 'mc',
    gen: tragedyQ,
  }),
  skill({
    id: 'e11-macbeth-themes',
    name: 'Themes of Macbeth',
    description: 'State the themes of Macbeth as complete, general ideas, explain what is wrong with weak theme statements, and choose the quotation that best supports a claim.',
    outcomes: ['11-C1'],
    lessonId: L,
    format: 'mc',
    gen: themesOrEvidence,
  }),
];
