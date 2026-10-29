/**
 * Grade 12 English, lesson 3.2: Characters and Relationships (12-C1). Who is who in Hamlet, who says
 * what, when the main events happen, and why the characters act as they do, with evidence from their
 * own lines (./hamlet.ts).
 */
import { fixedChoice, mc, part, skill } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { AnswerSpec, Choice, Difficulty, SkillDef } from '../../../types.ts';
import * as H from './hamlet.ts';
import { inline, quoteAnon, quoteBlock, where, type Passage } from './hamlet.ts';

const L = 'e12-3-2';

// ---------------------------------------------------------------------------- who is who

const WHO: Array<{ name: string; is: string }> = [
  { name: 'Hamlet', is: 'the Prince of Denmark, a student at Wittenberg, whose father’s ghost asks him for revenge' },
  { name: 'Claudius', is: 'the new King of Denmark, who murdered his brother and married his brother’s widow' },
  { name: 'Gertrude', is: 'the Queen of Denmark, who married her dead husband’s brother within a month of his funeral' },
  { name: 'Polonius', is: 'the King’s chief counsellor, a talkative father who is killed while hiding behind a tapestry' },
  { name: 'Ophelia', is: 'Polonius’s daughter, whom Hamlet once courted, and who goes mad and drowns after her father dies' },
  { name: 'Laertes', is: 'Polonius’s son, who returns from France to avenge his father and fights Hamlet with a poisoned sword' },
  { name: 'Horatio', is: 'Hamlet’s loyal friend from Wittenberg, who survives the play to tell his story to the world' },
  { name: 'the Ghost', is: 'the spirit of the dead King, who appears on the battlements at night and demands revenge for his murder' },
  { name: 'Fortinbras', is: 'the Prince of Norway, who leads an army across Denmark and claims the throne at the end of the play' },
  { name: 'Rosencrantz', is: 'one of Hamlet’s old school friends, summoned by the King to spy on him, and later sent to England' },
  { name: 'Osric', is: 'an affected young courtier who brings Hamlet the King’s wager and judges the fencing match' },
  { name: 'Yorick', is: 'the old King’s jester, long dead, whose skull a gravedigger digs up in the churchyard' },
  { name: 'Marcellus', is: 'a guard on the castle walls who has seen the Ghost, and who says that something is rotten in Denmark' },
];

/** One speech from an exchange, as a passage of its own. */
const one = (p: Passage, i: number): Passage => ({ act: p.act, scene: p.scene, speeches: [p.speeches[i]] });

/** Lines that only one character could say, for "Who says this?". Leads never give the speaker away by a pronoun. */
const SAYS: Array<{ line: Passage; lead: string; why: string }> = [
  { line: H.OWN_SELF_TRUE, lead: 'Giving parting advice to a young man about to sail for France:', why: 'Polonius gives his son Laertes a string of rules for life before he leaves for France.' },
  { line: H.FEAR_IT_OPHELIA, lead: 'Warning a younger sister about a prince’s attentions:', why: 'Laertes warns Ophelia not to trust Hamlet’s love, before leaving for France.' },
  { line: one(H.SERPENT_WEARS_CROWN, 0), lead: 'On the battlements at night, revealing a secret:', why: 'The Ghost tells Hamlet that the “serpent” who killed him now wears his crown: Claudius.' },
  { line: H.TEMPT_TOWARD_FLOOD, lead: 'On the battlements, trying to stop a friend from following a spirit:', why: 'Horatio fears the Ghost may lead Hamlet to the cliff’s edge and drive him mad.' },
  { line: H.DOUBLET_UNBRACED, lead: 'Coming in frightened, to tell a parent what happened while sewing:', why: 'Ophelia tells her father how Hamlet came to her looking wild and distracted.' },
  { line: one(H.SMART_A_LASH, 1), lead: 'Aside, after hearing a remark about sugaring over the devil with pious action:', why: 'Claudius admits in an aside that his conscience is stung: the first proof to the audience that he is guilty.' },
  { line: H.NOBLE_MIND, lead: 'Left alone after a painful meeting with a prince:', why: 'Ophelia mourns that Hamlet’s noble mind seems to have been overthrown by madness.' },
  { line: H.MAD_AS_THE_SEA, lead: 'Reporting to the King what has just happened in a private room:', why: 'Gertrude tells Claudius that Hamlet, mad as the sea and wind, has killed Polonius.' },
  { line: H.TO_HELL_ALLEGIANCE, lead: 'Bursting into the palace at the head of a mob, demanding to know how a father died:', why: 'Laertes, back from France, is ready to risk damnation to avenge Polonius.' },
  { line: H.SICK_SOUL, lead: 'Waiting for a troubled young woman to be shown in:', why: 'Gertrude speaks of her own “sick soul” and guilt before Ophelia enters.' },
  { line: H.WILLOW, lead: 'Bringing terrible news to a brother:', why: 'Gertrude begins her description of how Ophelia drowned.' },
  { line: H.CHRISTIAN_BURIAL, lead: 'Digging a grave, and arguing about whether its occupant deserves a Christian burial:', why: 'The two gravediggers joke about Ophelia’s death and burial.' },
  { line: H.NOBLE_HEART, lead: 'Holding a dying friend at the end of the play:', why: 'Horatio bids farewell to Hamlet: “Good night, sweet prince”.' },
  { line: H.LIKE_A_SOLDIER, lead: 'Arriving at the end to find the royal family dead, and giving orders for a funeral:', why: 'Fortinbras orders that Hamlet be carried “like a soldier” and honoured with military rites.' },
  { line: H.PALPABLE_HIT, lead: 'Judging a fencing match:', why: 'Osric, the judge, calls the first hit for Hamlet.' },
];
const SPEAKERS = ['Hamlet', 'Claudius', 'Gertrude', 'Polonius', 'Ophelia', 'Laertes', 'Horatio', 'Ghost', 'Fortinbras', 'Osric', 'First Clown'];
const SPEAKER_NAME: Record<string, string> = { Ghost: 'The Ghost', 'First Clown': 'The gravediggers' };
const named = (s: string) => SPEAKER_NAME[s] ?? s;

/** The main events, with their acts, in the order they happen. */
const EVENTS: Array<{ act: number; what: string }> = [
  { act: 1, what: 'The ghost of the dead King appears to the guards on the castle battlements at midnight.' },
  { act: 1, what: 'The new King and Queen, just married, urge Hamlet to stop mourning his father.' },
  { act: 1, what: 'Laertes leaves for France, and Polonius forbids Ophelia to see Hamlet again.' },
  { act: 1, what: 'The Ghost tells Hamlet that Claudius poisoned him, and demands revenge.' },
  { act: 2, what: 'Ophelia tells her father that Hamlet came to her room looking wild and distracted.' },
  { act: 2, what: 'Rosencrantz and Guildenstern arrive at court, sent for by the King and Queen.' },
  { act: 2, what: 'A company of travelling actors arrives, and Hamlet plans a play to test the King.' },
  { act: 3, what: 'Hamlet speaks the “To be, or not to be” soliloquy and tells Ophelia to go to a nunnery.' },
  { act: 3, what: 'The actors perform a murder like the old King’s, and Claudius rises and calls for light.' },
  { act: 3, what: 'Hamlet finds Claudius alone, praying, and decides not to kill him yet.' },
  { act: 3, what: 'Hamlet stabs Polonius through the tapestry in his mother’s room.' },
  { act: 4, what: 'Claudius sends Hamlet to England with sealed letters ordering his death.' },
  { act: 4, what: 'Hamlet watches Fortinbras’s army march across Denmark on its way to Poland.' },
  { act: 4, what: 'Ophelia, mad with grief, gives out flowers, and Laertes returns to avenge his father.' },
  { act: 4, what: 'Claudius and Laertes plot to kill Hamlet with a poisoned sword and a poisoned cup.' },
  { act: 4, what: 'Gertrude tells Laertes that Ophelia has drowned in a brook.' },
  { act: 5, what: 'In a churchyard, Hamlet holds the skull of Yorick, the old King’s jester.' },
  { act: 5, what: 'At Ophelia’s funeral, Hamlet and Laertes grapple in her grave.' },
  { act: 5, what: 'During the fencing match, Gertrude drinks from the poisoned cup and dies.' },
  { act: 5, what: 'Fortinbras arrives, finds the royal family dead, and orders a soldier’s funeral for Hamlet.' },
];
const ACT_SUMMARY: Record<number, string> = {
  1: 'Act 1 brings the Ghost, the hasty marriage, Polonius’s warning to Ophelia and the Ghost’s demand for revenge.',
  2: 'Act 2 shows Hamlet’s strange behaviour, the arrival of Rosencrantz, Guildenstern and the actors, and his plan for the play.',
  3: 'Act 3 holds “To be, or not to be”, the play within the play, the King at prayer and the killing of Polonius.',
  4: 'Act 4 sends Hamlet towards England and brings Fortinbras’s army, Ophelia’s madness and death, and Laertes’s plot.',
  5: 'Act 5 brings the graveyard, Ophelia’s funeral, the fencing match and the deaths of the royal family.',
};

function charactersQ(rng: Rng, d: Difficulty) {
  if (d === 1) {
    const [w, ...others] = rng.sample(WHO, 4);
    return {
      prompt: `In *Hamlet*, who is **${w.name}**?`,
      parts: [part(mc(rng, capFirst(w.is), others.map((o) => capFirst(o.is))))],
      hints: ['Think of the royal family, Polonius and his children, Hamlet’s friends, the Ghost, and the people from outside Denmark.'],
      solution: [`${capFirst(w.name)} is ${w.is}.`],
    };
  }
  if (d === 2) {
    const s = rng.pick(SAYS);
    const who = s.line.speeches[0].speaker;
    const wrong = rng.sample(SPEAKERS.filter((x) => x !== who), 3);
    return {
      prompt: `${s.lead}\n\n${quoteAnon(s.line)}\n\nWho says these lines?`,
      parts: [part(mc(rng, named(who), wrong.map(named)))],
      hints: ['Ask what the speaker knows, what they want, and where they are. Which character fits?'],
      solution: [`${named(who)} ${who === 'First Clown' ? 'say' : 'says'} these lines, in ${where(s.line)}.`, s.why],
    };
  }
  if (rng.chance(0.5)) {
    const e = rng.pick(EVENTS);
    return {
      prompt: `In which act of *Hamlet* does this happen?\n\n${e.what}`,
      parts: [part(fixedChoice(['Act 1', 'Act 2', 'Act 3', 'Act 4', 'Act 5'], e.act - 1))],
      hints: ['Act 1: the Ghost. Act 2: the strange behaviour and the actors. Act 3: the play and the death of Polonius. Act 4: England, Ophelia’s madness and the plot. Act 5: the graveyard and the duel.'],
      solution: [`This happens in Act ${e.act}.`, ACT_SUMMARY[e.act]],
    };
  }
  const picks = pickInOrder(rng, 4);
  const ids = 'abcd';
  const shown = notInOrder(rng, picks);
  const items: Choice[] = shown.map((k, i) => ({ id: ids[i], md: EVENTS[k].what }));
  const correctOrder = picks.map((k) => items[shown.indexOf(k)].id);
  const answer: AnswerSpec = { kind: 'order', items, correctOrder, ends: ['First', 'Last'] };
  return {
    prompt: 'Put these events from *Hamlet* in the order they happen in the play.',
    parts: [part(answer)],
    hints: ['Place each event in its act first: the Ghost (Act 1), the actors (Act 2), the play and Polonius’s death (Act 3), Ophelia’s madness and the plot (Act 4), the graveyard and the duel (Act 5).'],
    solution: picks.map((k, i) => `${i + 1}. ${EVENTS[k].what} (Act ${EVENTS[k].act})`),
  };
}

/** `n` events in play order, one from each of `n` different acts. */
function pickInOrder(rng: Rng, n: number): number[] {
  const acts = rng.sample([1, 2, 3, 4, 5], n).sort((a, b) => a - b);
  return acts.map((a) => rng.pick(EVENTS.map((_, i) => i).filter((i) => EVENTS[i].act === a)));
}
function notInOrder(rng: Rng, ks: number[]): number[] {
  for (;;) {
    const s = rng.shuffle(ks);
    if (s.some((k, i) => k !== ks[i])) return s;
  }
}
const capFirst = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

// ---------------------------------------------------------------------------- motive

interface Motive {
  level: Difficulty;
  /** Motives from the same episode are never offered against each other. */
  ep: string;
  lead: string;
  ask: string;
  evidence: Passage;
  right: string;
  wrong: string[];
  why: string;
}
const MOTIVES: Motive[] = [
  { ep: 'ghost', level: 1, lead: 'On the battlements, the Ghost speaks to Hamlet alone:', ask: 'Why has the Ghost come to Hamlet?', evidence: H.BROTHERS_HAND, right: 'To tell him that his own brother murdered him, and to demand that his son avenge the murder.', wrong: ['To warn him that Norway is about to invade, and to ask him to lead the Danish army.', 'To beg him to forgive Claudius and Gertrude, so that his own spirit can rest in peace.', 'To tell him where the royal treasure is hidden, so that he can claim the throne for himself.'], why: 'He was killed “sleeping, by a brother’s hand”, sent to his death without confession; elsewhere he commands, “Revenge his foul and most unnatural murder.”' },
  { ep: 'ophelia', level: 1, lead: 'Polonius tells his daughter what she must do:', ask: 'Why does Ophelia stop seeing Hamlet?', evidence: H.IN_PLAIN_TERMS, right: 'Her father forbids her to speak with Hamlet at all, and she obeys him.', wrong: ['She has found out that Hamlet is mad, and she is frightened of him.', 'Her brother has told her that Hamlet loves another woman at court.', 'The Queen has told her that Hamlet must marry a foreign princess.'], why: 'Polonius charges her not to “give words or talk with the Lord Hamlet”, and she answers, “I shall obey, my lord.”' },
  { ep: 'polonius', level: 1, lead: 'Ophelia has told her father about Hamlet’s strange visit. Polonius says:', ask: 'What does Polonius believe has made Hamlet mad?', evidence: H.ECSTASY_OF_LOVE, right: 'Love for Ophelia, who has rejected him on her father’s orders.', wrong: ['Grief for his dead father, whose death he still cannot accept.', 'Anger at the new King, who has taken the crown that was his.', 'Poison, which an enemy at court has secretly slipped into his wine.'], why: 'He calls it “the very ecstasy of love”, and learns that Ophelia has repelled Hamlet’s letters as he told her to.' },
  { ep: 'play', level: 1, lead: 'Alone, Hamlet explains why he will have the actors perform a play about a murder:', ask: 'Why does Hamlet want the play performed before the King?', evidence: H.MAY_BE_THE_DEVIL, right: 'He fears the Ghost may be a devil, so he wants proof by watching the King’s reaction.', wrong: ['He wants to entertain the court and show everyone that he is no longer grieving.', 'He wants to warn his mother that the King may try to poison her as well.', 'He wants to teach the actors how a murder should really be played on stage.'], why: 'The Ghost “May be the devil”, so he wants grounds “More relative than this”: the play will “catch the conscience of the King”.' },
  { ep: 'england', level: 1, lead: 'Alone, Claudius speaks of the letters he has sent to England with Hamlet:', ask: 'Why does Claudius send Hamlet to England?', evidence: H.DO_IT_ENGLAND, right: 'To have him killed there, by sealed letters ordering the English king to put him to death.', wrong: ['To let him finish his studies abroad, far away from the grief of the Danish court.', 'To make peace with England, by sending the prince there as an honoured ambassador.', 'To protect him from Laertes, who has sworn to kill him for his own father’s death.'], why: 'The letters demand “The present death of Hamlet”: Claudius calls Hamlet a fever in his blood that England “must cure”.' },
  { ep: 'laertes', level: 1, lead: 'Laertes bursts into the palace:', ask: 'What does Laertes want, now that he is back from France?', evidence: H.TO_HELL_ALLEGIANCE, right: 'Revenge for his father’s death, whatever it costs him in this world or the next.', wrong: ['The crown of Denmark, which the people have offered to him instead of the King.', 'His sister’s hand in marriage for a friend, who will protect her from Hamlet.', 'An apology from the King, who failed to invite him to his father’s funeral.'], why: '“Let come what comes; only I’ll be reveng’d / Most throughly for my father.” He dares damnation itself.' },
  { ep: 'prayer', level: 2, lead: 'Alone, Claudius tries to pray:', ask: 'Why can Claudius not truly pray for forgiveness?', evidence: H.RETAIN_THE_OFFENCE, right: 'He still keeps everything he murdered for, the crown, his ambition and the Queen, and will not give them up.', wrong: ['He does not believe in heaven at all, and thinks that prayer is only a show for the court to watch.', 'He is too frightened of Hamlet to close his eyes, and keeps watching the door for an attacker.', 'He has already confessed to a priest and been forgiven, so he has no need to pray any more.'], why: 'He asks, “May one be pardon’d and retain th’offence?”: he is “still possess’d / Of those effects for which I did the murder”.' },
  { ep: 'prayer', level: 2, lead: 'Hamlet finds Claudius kneeling, and stops:', ask: 'Why does Hamlet spare Claudius when he finds him at prayer?', evidence: H.HIRE_AND_SALARY, right: 'He fears that killing Claudius at prayer would send his soul to heaven, which would be no revenge.', wrong: ['He fears that the guards are too close, and that he will be caught before he can escape the room.', 'He believes that the Ghost lied after all, since a guilty man could never kneel and pray like this.', 'He has promised his mother that he will not harm the King, and he does not want to break his word.'], why: 'Killing him now would “send / To heaven” the man who killed his father: “this is hire and salary, not revenge.”' },
  { ep: 'friends', level: 2, lead: 'Hamlet questions his old school friends Rosencrantz and Guildenstern:', ask: 'Why have Rosencrantz and Guildenstern come to Elsinore?', evidence: H.YOU_WERE_SENT_FOR, right: 'The King and Queen sent for them to find out what is troubling Hamlet.', wrong: ['They came on their own to see the actors who are performing at court.', 'They were sent by Fortinbras to spy on the Danish army and its plans.', 'They came to warn Hamlet that the King is planning to have him killed.'], why: 'Hamlet sees “a kind of confession in your looks”: “I know the good King and Queen have sent for you.”' },
  { ep: 'poison', level: 2, lead: 'Claudius has just suggested an unbated sword. Laertes answers:', ask: 'Why does Laertes decide to put poison on his sword?', evidence: H.ANOINT_MY_SWORD, right: 'To make sure that even a scratch from his blade will kill Hamlet in the match.', wrong: ['To protect himself, since he fears that Hamlet will use a poisoned blade.', 'To impress the King with his skill, since poison makes the blade shine.', 'To punish the King, whom he still blames secretly for his father’s death.'], why: 'He has bought an “unction” so deadly that wherever it draws blood, nothing can save the wounded man.' },
  { ep: 'cup', level: 2, lead: 'Claudius adds a second part to his plan with Laertes:', ask: 'Why does Claudius prepare a poisoned cup?', evidence: H.CHALICE_FOR_THE_NONCE, right: 'As a second plan, in case Hamlet escapes the poisoned sword in the match.', wrong: ['As a cure for Laertes, in case Hamlet wounds him during the fencing.', 'As a toast to the Queen, whom he plans to poison along with Hamlet.', 'As a test of Laertes, to see whether he will drink from it himself.'], why: '“If he by chance escape your venom’d stuck, / Our purpose may hold there”: the cup is a back-up if the sword fails.' },
  { ep: 'test-laertes', level: 2, lead: 'Claudius begins to bring Laertes into his plot against Hamlet:', ask: 'Why does Claudius ask whether Laertes truly loved his father?', evidence: H.PAINTING_OF_A_SORROW, right: 'To stir Laertes’s anger and test whether he will act, so that he can use him against Hamlet.', wrong: ['To find out whether Laertes will forgive Hamlet, so that the two can make peace at last.', 'To comfort Laertes, who he fears is hiding his grief behind a calm and painted face.', 'To accuse Laertes of not mourning enough, so that he can banish him back to France.'], why: 'He goads Laertes to show himself “your father’s son in deed, / More than in words”, then reveals the plot.' },
  { ep: 'rg-deaths', level: 3, lead: 'Horatio says that Rosencrantz and Guildenstern “go to’t”, to their deaths in England. Hamlet answers:', ask: 'Why does Hamlet feel no guilt about the deaths of Rosencrantz and Guildenstern?', evidence: H.NOT_NEAR_MY_CONSCIENCE, right: 'They chose to serve the King’s plot against him, so he believes they brought their deaths on themselves.', wrong: ['He does not know that they will die, since he believes the letters only ask England to imprison them.', 'He thinks they are still his loyal friends, and plans to rescue them from England before they are harmed.', 'He believes that Horatio forged the letters, so the guilt for their deaths belongs to Horatio, not to him.'], why: '“They did make love to this employment”: their “defeat / Does by their own insinuation grow”. He changed the letters himself.' },
  { ep: 'image', level: 3, lead: 'After the fight in Ophelia’s grave, Hamlet tells Horatio:', ask: 'Why does Hamlet want to make peace with Laertes?', evidence: H.IMAGE_OF_MY_CAUSE, right: 'He sees that Laertes, like him, is a son grieving for a father who was killed.', wrong: ['He fears Laertes’s skill with a sword and hopes to avoid a match with him.', 'He wants Laertes to help him kill the King, in return for his friendship.', 'He wants to marry Laertes’s sister, and needs her brother’s permission first.'], why: '“By the image of my cause I see / The portraiture of his”: Laertes’s situation mirrors his own. Ophelia is already dead.' },
  { ep: 'claudius-mad', level: 3, lead: 'Claudius and Polonius have secretly watched Hamlet with Ophelia. Claudius says:', ask: 'Why does Claudius first decide to send Hamlet to England?', evidence: H.NOT_LIKE_MADNESS, right: 'He doubts that Hamlet is mad with love, and fears that whatever is brooding in his soul will prove dangerous.', wrong: ['He is now certain that Hamlet is mad with love, and hopes a sea voyage will help him forget Ophelia.', 'He has learned that Hamlet knows about the murder, and he wants him killed in England at once.', 'He wants to reward Hamlet for his loyalty by making him ambassador to England, as Polonius suggests.'], why: '“His affections do not that way tend … There’s something in his soul / O’er which his melancholy sits on brood”, and its “disclose / Will be some danger.”' },
  { ep: 'hedge', level: 3, lead: 'Laertes has burst into the palace with a mob. Gertrude holds him back. Claudius says:', ask: 'Why does Claudius tell Gertrude to let Laertes go?', evidence: H.HEDGE_A_KING, right: 'To show that he is unafraid, claiming that God protects a king, so as to calm and win over the rebel.', wrong: ['To let Laertes kill him, since he has decided to confess his crime and accept his punishment.', 'To let Laertes find Hamlet, since he hopes Laertes will kill the prince that very hour.', 'To let Laertes leave, since he wants the mob to follow him away from the palace gates.'], why: '“There’s such divinity doth hedge a king, / That treason can but peep to what it would”: he plays the calm, protected king and turns Laertes’s anger towards Hamlet.' },
];

/** Episodes whose lines could support each other’s answers, so they are never offered against each other. */
const CLOSE = [['england', 'claudius-mad'], ['poison', 'cup']];

function motiveQ(rng: Rng, d: Difficulty) {
  if (d === 3 && rng.chance(0.4)) {
    const m = rng.pick(MOTIVES);
    const pool = MOTIVES.filter((x) => x.ep !== m.ep && !CLOSE.some((g) => g.includes(x.ep) && g.includes(m.ep))).map((x) => inline(x.evidence));
    // Prefer lines about as long as the key, so that the longest choice is not a tell.
    const key = inline(m.evidence);
    const near = [...new Set(pool.filter((x) => x.length * 1.15 >= key.length))];
    const picked = rng.sample(near, Math.min(3, near.length));
    const others = [...picked, ...rng.shuffle([...new Set(pool)].filter((x) => !picked.includes(x))).sort((a, b) => b.length - a.length)].slice(0, 3);
    return {
      prompt: `${m.ask} A student answers: “${m.right}” Which line from the play best supports this answer?`,
      parts: [part(mc(rng, inline(m.evidence), others))],
      hints: ['Look for the line that gives the reason itself, in the character’s own words or in the words of someone who knows.'],
      solution: [`${inline(m.evidence)} (${where(m.evidence)})`, m.why],
    };
  }
  const m = rng.pick(MOTIVES.filter((x) => x.level === d || (d === 3 && x.level === 2)));
  return {
    prompt: `${m.lead}\n\n${quoteBlock(m.evidence)}\n\n${m.ask}`,
    parts: [part(mc(rng, m.right, m.wrong))],
    hints: ['A motive is the reason behind an action. Use the quoted lines as evidence, and rule out any choice that the character could not know or that the play does not show.'],
    solution: [m.why],
  };
}

export const HAMLET_CHARACTER_SKILLS: SkillDef[] = [
  skill({
    id: 'e12-hamlet-characters',
    name: 'The characters and events of Hamlet',
    description: 'Identify the characters of Hamlet, who says what, and when the main events of the play happen.',
    outcomes: ['12-C1'],
    lessonId: L,
    format: 'mc',
    gen: charactersQ,
  }),
  skill({
    id: 'e12-hamlet-motive',
    name: 'Motive in Hamlet',
    description: 'Explain why Hamlet, Claudius, Gertrude, Ophelia, Polonius and Laertes act as they do, and choose the lines that show it.',
    outcomes: ['12-C1'],
    lessonId: L,
    format: 'mc',
    gen: motiveQ,
  }),
];
