/**
 * Grade 11 English, lesson 3.1: The Language and Imagery of Macbeth (11-C1). Choosing the best
 * modern paraphrase of lines from Macbeth (./macbeth.ts) against plausible misreadings, words read in
 * context, and the play's patterns of imagery: blood, darkness and night, sleep, ill-fitting
 * clothes, sickness and medicine, and nature thrown into disorder.
 */
import { mc, part, skill } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import * as M from './macbeth.ts';
import { inline, quoteBlock, where, type Passage } from './macbeth.ts';

const L = 'e11-3-1';

/** A passage with the first whole-word use of `word` in bold. */
function bold(p: Passage, word: string): Passage {
  const re = new RegExp(`(^|[^A-Za-z’])(${word})(?![A-Za-z’])`, 'i');
  let done = false;
  return {
    ...p,
    speeches: p.speeches.map((s) => {
      if (done || !re.test(s.text)) return s;
      done = true;
      return { ...s, text: s.text.replace(re, '$1**$2**') };
    }),
  };
}

// ---------------------------------------------------------------------------- paraphrase

interface Para {
  level: Difficulty;
  lead: string;
  /** The question, when it is not simply the best paraphrase of the whole passage. */
  ask?: string;
  line: Passage;
  right: string;
  /** Plausible misreadings, each clearly wrong for these lines. */
  wrong: string[];
  why: string;
}
const PARAS: Para[] = [
  { level: 1, lead: 'The witches end the first scene of the play together:', line: M.FAIR_IS_FOUL, right: 'What seems good is evil, and what seems evil is good. Let us fly off through the fog and the filthy air.', wrong: ['Good weather will soon turn bad, so we must hurry home before the fog comes.', 'We will fight fairly against our foul enemies in the fog.', 'Fair-haired people are foul inside, and the dirty air proves it.'], why: '“Fair is foul, and foul is fair” turns good and evil upside down: what looks good is bad, and what looks bad is good. “Hover” means float or fly: the witches leave through the fog.' },
  { level: 1, lead: 'Duncan has ordered the traitor Thane of Cawdor put to death, and gives his title to Macbeth:', line: M.LOST_WON, right: 'The title that the traitor has lost, noble Macbeth has won.', wrong: ['Macbeth has lost the battle, but he has won the King’s love.', 'Whatever Macbeth loses, the King wins.', 'Macbeth has won the battle, but lost his noble name.'], why: '“What he hath lost” is the title Thane of Cawdor, taken from the traitor; “noble Macbeth hath won” it as a reward for his courage.' },
  { level: 1, lead: 'Macbeth has doubts about killing Duncan. Lady Macbeth answers:', line: M.IF_WE_FAIL, ask: 'Which is the best modern paraphrase of Lady Macbeth’s answer?', right: 'Fail? Just tighten your courage until it holds firm, and we won’t fail.', wrong: ['If we fail, we will try again with more courage.', 'We will fail unless we find someone braver to do it.', 'Screw the door shut, so that no one finds out if we fail.'], why: 'To “screw your courage to the sticking-place” is to tighten it until it holds, like a peg wound tight on an instrument: she will not even imagine failing.' },
  { level: 1, lead: 'Macbeth has agreed to kill Duncan. He ends the scene:', line: M.FALSE_FACE, right: 'Go, and fool everyone with a cheerful show: a false face must hide what a false heart knows.', wrong: ['Go and make fun of the King at the feast.', 'Our faces will show everyone what is in our hearts.', 'Go and put on masks, so that no one recognizes us.'], why: '“Mock the time” means deceive the world; the “false face” is a friendly look that hides the murder planned in the “false heart”.' },
  { level: 1, lead: 'Macbeth is brooding alone. Lady Macbeth tells him:', line: M.WHATS_DONE_IS_DONE, right: 'There is no point thinking about things that cannot be changed: what is done is done.', wrong: ['We must undo what we have done before it is too late.', 'Everything we have done so far has been done well.', 'There is no cure for what has happened, so we must confess.'], why: 'Things “without all remedy” (that cannot be fixed) should be “without regard” (not thought about): the past cannot be changed, so stop dwelling on it.' },
  { level: 1, lead: 'The doctor says he cannot cure Lady Macbeth’s troubled mind. Macbeth answers:', line: M.PHYSIC_TO_DOGS, right: 'Throw medicine to the dogs; I want nothing to do with it.', wrong: ['Give the medicine to the dogs first, to test it.', 'Physical strength is for dogs; I need none of it.', 'Feed the dogs, and then I will take my medicine.'], why: '“Physic” means medicine. Macbeth scorns it, because no medicine can cure a sick mind.' },
  { level: 2, lead: 'Lady Macbeth reads her husband’s letter about the witches, then speaks of him:', line: M.MILK_OF_KINDNESS, right: 'I fear your nature: you are too gentle to take the quickest way to the crown. You want to be great, and you have ambition, but not the wickedness that should go with it.', wrong: ['I fear you: you are too ambitious, and your cruelty will ruin us.', 'You are kind to everyone, so you will make a great king.', 'You are too ill to make the long journey home; you need milk and rest.'], why: 'The “milk of human kindness” is gentle human feeling; “the nearest way” is the quickest route to the crown, by murder; “illness” here means the wickedness that ambition needs.' },
  { level: 2, lead: 'Before Duncan arrives, Lady Macbeth tells her husband how to behave:', line: M.INNOCENT_FLOWER, right: 'People can read your thoughts in your face. To fool everyone, look as they expect: welcoming and innocent like a flower, while you are the snake hidden beneath it.', wrong: ['Your face is as handsome as a flower, so the King will trust you.', 'Read a book to pass the time, and keep away from snakes in the garden.', 'Look worried, so that the King knows something is wrong.'], why: 'A face that is “as a book” shows its thoughts; “beguile the time” means deceive the world; the flower and the serpent are innocence outside and danger underneath.' },
  { level: 2, lead: 'Alone, Macbeth weighs up the murder:', line: M.DOUBLE_TRUST, right: 'He trusts me for two reasons: I am his relative and his subject, both strong reasons not to kill him; and I am his host, who should lock the door against his murderer, not hold the knife myself.', wrong: ['He is here with two guards, so I must be doubly careful with the knife.', 'He trusts me twice as much as anyone, so he will forgive me.', 'He is my host tonight, so I must guard his door against his enemies.'], why: 'As Duncan’s “kinsman and his subject” Macbeth owes him loyalty, and as his “host” he should protect his guest. Duncan is the guest; Macbeth is the host.' },
  { level: 2, lead: 'Macbeth has just murdered Duncan, and looks at his bloody hands:', line: M.NEPTUNE, right: 'Could all the oceans wash this blood off my hand? No, this hand would rather turn the vast seas red, making the green sea red.', wrong: ['I will wash my hands in the sea, so that no one sees the blood.', 'The god of the sea will clean my hands and forgive me.', 'The sea is already red with the blood of the battle.'], why: '“Incarnadine” means turn red, and “multitudinous” means vast: Macbeth feels his guilt is so great that it would stain the ocean rather than be washed away.' },
  { level: 2, lead: 'After the banquet, Macbeth tells his wife what he will do next:', line: M.STEPPED_IN_BLOOD, right: 'I have waded so far into blood that going back would be as hard as going on to the other side.', wrong: ['I am so covered in blood that I must stop and wash.', 'I will never kill again, because it is too tiring.', 'I am standing in a river and cannot reach either bank.'], why: 'He pictures killing as wading across a river of blood: he is so far in that turning back is “as tedious” (as hard) as crossing over, so he will go on killing.' },
  { level: 2, lead: 'Macbeth tells Lady Macbeth why he cannot rest:', line: M.SCORCHED_SNAKE, right: 'We have only wounded the snake, not killed it. It will heal and be whole again, and our feeble wickedness will still be in danger of its bite.', wrong: ['We have killed the snake, so we are safe at last.', 'We burned a snake in the fire to keep evil away.', 'Our enemies have wounded us, but we will heal.'], why: '“Scorch’d” (in many editions “scotch’d”) means slashed. The snake is the danger to their crown: killing Duncan has not made them safe.' },
  { level: 3, lead: 'Alone, Macbeth begins to think through the murder:', line: M.ASSASSINATION, right: 'If the murder were over and finished once it was done, it would be best to do it quickly; if killing him could catch all the consequences in a net, and his death bring only success…', wrong: ['If the murder is done, it must be done slowly and carefully.', 'Once it is done, I will confess quickly, before anyone finds out.', 'If the assassination fails, the consequences will come quickly.'], why: 'Macbeth wishes the murder could be the end of the matter: “trammel up” means catch as in a net, and “surcease” means death, or ending. He suspects it will not be.' },
  { level: 3, lead: 'Alone, Macbeth ends his soliloquy before the murder:', line: M.VAULTING_AMBITION, right: 'Nothing urges me on except ambition, which, like a rider leaping too eagerly into the saddle, jumps too far and falls on the other side.', wrong: ['My ambition is a strong horse that will carry me safely to the crown.', 'I have no horse, so I cannot ride to the King tonight.', 'Ambition has spurred me on to kill, and I am proud of it.'], why: 'The “spur” and the “sides” picture his intent as a horse; “vaulting” ambition leaps into the saddle so hard that it “o’erleaps itself / And falls on th’ other” side. Ambition is his only reason, and it will bring him down.' },
  { level: 3, lead: 'Macbeth has just come from Duncan’s room:', line: M.SLEEP_NO_MORE, right: 'I thought I heard a voice cry, “Sleep no more! Macbeth is murdering sleep”, innocent sleep, which mends our worries like knitting up a tangled sleeve, ends each day, eases our labour and heals the mind.', wrong: ['I heard a voice telling me to stay awake and guard the King.', 'I dreamt that someone murdered me in my sleep.', 'Sleep is a kind of death, so Duncan is only sleeping.'], why: 'Having killed Duncan in his sleep, Macbeth feels he has murdered sleep itself; the list praises what he has lost: “knits up the ravell’d sleave of care” means mends tangled worries.' },
  { level: 3, lead: 'Macbeth has just been told that the Queen is dead:', line: M.TOMORROW, ask: 'Which is the best paraphrase of the speech’s main idea?', right: 'Day after day creeps by in the same small steps until the end of time, and every past day has only lit fools’ way to death. Life is brief and empty, like an actor who rants on stage for an hour and is forgotten, or a madman’s story full of noise that means nothing.', wrong: ['Tomorrow will be better, because each new day brings fresh hope.', 'Life is a play, so we should enjoy our hour on the stage.', 'I will put off grieving for my wife until tomorrow.'], why: 'Macbeth sees life as a “walking shadow”, a “poor player” and a “tale / Told by an idiot … Signifying nothing”: brief and meaningless.' },
  { level: 3, lead: 'Macduff has just told Macbeth that he was “untimely ripp’d” from his mother’s womb:', line: M.JUGGLING_FIENDS, right: 'Let no one believe these cheating devils any more, who trick us with words that have two meanings: they keep their promise in the words we hear, and break it in what we hoped for.', wrong: ['These spirits have kept every promise they made, so I will trust them.', 'The jugglers at the fair have fooled us with their tricks.', 'Let us believe the spirits once more, because they always speak plainly.'], why: '“Juggling” means cheating, and to “palter” is to play false. The witches’ promises were true to the letter (“to our ear”) but false to what Macbeth hoped.' },
  { level: 3, lead: 'Macbeth, with the English army near, speaks of his own life:', line: M.YELLOW_LEAF, right: 'I have lived long enough: my life has withered like a dry yellow leaf in autumn, and I cannot expect what should come with old age: honour, love, obedience and many friends.', wrong: ['I have grown old and wise, and my friends honour me for it.', 'My life is in its springtime, green and full of hope.', 'I will live a long life, loved by all my people.'], why: '“The sere, the yellow leaf” is a dried autumn leaf: Macbeth’s life is fading. The comforts that “should accompany old age” he has lost through his crimes.' },
];

/** Words read in context (difficulty 3). */
interface Word {
  word: string;
  line: Passage;
  meaning: string;
  /** A plausible misreading, offered first among the wrong choices. */
  misread: string;
  wrong: string[];
  why: string;
}
const WORDS: Word[] = [
  { word: 'physic', line: M.PHYSIC_TO_DOGS, meaning: 'medicine', misread: 'physical exercise', wrong: ['a doctor’s fee', 'a magic spell'], why: '“Physic” means medicine, and a “physician” is someone who gives it.' },
  { word: 'incarnadine', line: M.NEPTUNE, meaning: 'turn red', misread: 'wash clean', wrong: ['calm', 'flood'], why: '“Incarnadine” means turn red, the colour of flesh and blood: “Making the green one red” explains it in the next line.' },
  { word: 'surcease', line: M.ASSASSINATION, meaning: 'death; ending', misread: 'success', wrong: ['delay', 'surprise'], why: '“Surcease” means a stop or an ending: here, Duncan’s death.' },
  { word: 'issue', line: M.SEED_OF_BANQUO, meaning: 'children; descendants', misread: 'a problem to solve', wrong: ['business', 'sorrow'], why: '“Issue” means offspring: Macbeth fears he has done it all for Banquo’s children, “the seed of Banquo”.' },
  { word: 'fil’d', line: M.SEED_OF_BANQUO, meaning: 'defiled; made filthy', misread: 'filled up', wrong: ['put in order', 'calmed'], why: '“Fil’d” is short for “defiled”: Macbeth has dirtied his own mind with murder for Banquo’s sake.' },
  { word: 'chuck', line: M.DEAREST_CHUCK, meaning: 'darling (a loving name)', misread: 'throw away', wrong: ['servant', 'fool'], why: '“Chuck” is a loving name, like “chick” or “darling”: Macbeth keeps his wife out of his plan while calling her tenderly.' },
  { word: 'sere', line: M.YELLOW_LEAF, meaning: 'dry and withered', misread: 'sacred', wrong: ['sharp', 'green'], why: '“Sere” means dried up and withered, like a leaf in autumn.' },
  { word: 'minister', line: M.MIND_DISEASED, meaning: 'give treatment to', misread: 'a priest', wrong: ['govern', 'punish'], why: 'To “minister to” someone is to treat or care for them: Macbeth asks whether the doctor can treat a sick mind.' },
  { word: 'equivocation', line: M.EQUIVOCATION_OF_FIEND, meaning: 'speaking with double meanings, to mislead', misread: 'equal treatment', wrong: ['bravery', 'hesitation'], why: '“Equivocation” is speaking in words with two meanings so as to deceive without telling a plain lie: the fiend “lies like truth”.' },
  { word: 'palter', line: M.JUGGLING_FIENDS, meaning: 'play false; cheat', misread: 'grow pale', wrong: ['pray', 'chatter'], why: 'To “palter” is to play tricks, to shift between meanings: the fiends deceive “in a double sense”.' },
];

function languageQ(rng: Rng, d: Difficulty) {
  if (d === 3 && rng.chance(0.3)) {
    const w = rng.pick(WORDS);
    return {
      prompt: `From ${where(w.line)}:\n\n${quoteBlock(bold(w.line, w.word))}\n\nWhat does **${w.word}** mean here?`,
      parts: [part(mc(rng, w.meaning, [w.misread, ...rng.shuffle(w.wrong)]))],
      hints: ['Shakespeare’s words can look like modern ones and mean something else. Read the whole passage and ask which meaning makes sense here.'],
      solution: [w.why],
    };
  }
  const p = rng.pick(PARAS.filter((x) => x.level === d));
  return {
    prompt: `${p.lead}\n\n${quoteBlock(p.line)}\n\n${p.ask ?? 'Which is the best modern paraphrase?'}`,
    parts: [part(mc(rng, p.right, p.wrong))],
    hints: [d === 1 ? 'Put each old or unusual word into modern English first, then read the lines again.' : 'Follow the image the lines build (a horse, a river, a snake, a net), and check who is speaking and why.'],
    solution: [p.why, `So the best paraphrase is: ${p.right}`],
  };
}

// ---------------------------------------------------------------------------- imagery

type Pattern = 'blood' | 'darkness' | 'sleep' | 'clothing' | 'sickness' | 'disorder';
const PATTERN_NAME: Record<Pattern, string> = {
  blood: 'Blood',
  darkness: 'Darkness and night',
  sleep: 'Sleep and sleeplessness',
  clothing: 'Clothes that do not fit',
  sickness: 'Sickness and medicine',
  disorder: 'Nature thrown into disorder',
};
const PATTERN_WHAT: Record<Pattern, string> = {
  blood: 'blood stands first for courage in battle, then for murder and the guilt that cannot be washed away',
  darkness: 'darkness and night hide evil deeds, and the murderers call on night to cover them',
  sleep: 'sleep is the innocent rest that the murderers destroy and can no longer enjoy',
  clothing: 'titles are pictured as clothes, and Macbeth’s stolen titles never fit him',
  sickness: 'evil is pictured as a sickness of the mind and of Scotland, and Malcolm as its cure',
  disorder: 'nature itself is turned upside down by the murder of a king',
};
/** Patterns too close to tell apart for some passages: left out of their choices. */
interface Image {
  pattern: Pattern;
  lead: string;
  line: Passage;
  not?: Pattern[];
  /** What the image suggests at this moment, and wrong readings. */
  means: string;
  wrongMeans: string[];
}
const IMAGES: Image[] = [
  { pattern: 'blood', lead: 'A wounded captain describes Macbeth in battle:', line: M.BRAVE_MACBETH, means: 'Here blood is a sign of courage: Macbeth’s sword “smok’d with bloody execution” of the King’s enemies, and everyone praises him for it.', wrongMeans: ['Macbeth is already guilty of murder, and the blood shows his shame.', 'Macbeth has been badly wounded and may die.', 'The captain disapproves of Macbeth’s cruelty.'] },
  { pattern: 'blood', lead: 'Macbeth has just murdered Duncan, and looks at his hands:', line: M.NEPTUNE, means: 'His guilt is so great that he feels it could never be washed away, and would stain the whole ocean red.', wrongMeans: ['He is planning to hide the daggers in the sea.', 'He is proud of the blood, as he was after the battle.', 'He is afraid that the King is still alive.'] },
  { pattern: 'blood', lead: 'After the banquet, Macbeth thinks about what he must do next:', line: M.STEPPED_IN_BLOOD, means: 'Murder has become a river he is wading across: he is in so deep that he sees no way back, only more killing.', wrongMeans: ['He has decided to stop killing and confess.', 'He is describing a battle he fought in Act 1.', 'He feels clean and safe now that Banquo is dead.'] },
  { pattern: 'blood', lead: 'After Banquo’s ghost has gone, Macbeth says:', line: M.BLOOD_WILL_HAVE_BLOOD, means: 'He fears that murder always demands more murder, and that his own crimes will be paid for in blood.', wrongMeans: ['He believes the ghost has forgiven him.', 'He means that blood is needed to cure his illness.', 'He is boasting about his success in battle.'] },
  { pattern: 'blood', lead: 'Sleepwalking, Lady Macbeth rubs her hands:', line: M.PERFUMES_OF_ARABIA, means: 'The blood she once thought “a little water” would clear now seems impossible to remove: her guilt has overwhelmed her.', wrongMeans: ['She has cut her hand and wants a bandage.', 'She is trying out a new perfume for the court.', 'She is proud of what she has done.'] },
  { pattern: 'darkness', lead: 'Alone, after Duncan names Malcolm heir to the throne, Macbeth says:', line: M.STARS_HIDE, means: 'He wants darkness to hide his “black and deep desires”, even from himself: he is ashamed of the murder he is thinking of.', wrongMeans: ['He is admiring the stars on a clear night.', 'He wants the stars to guide him to the King.', 'He is afraid of the dark because of the witches.'] },
  { pattern: 'darkness', lead: 'Lady Macbeth, waiting for Duncan to arrive:', line: M.THICK_NIGHT, means: 'She calls on night to wrap the deed in smoke from hell, so that not even heaven can see the murder and stop it.', wrongMeans: ['She is afraid of the dark and wants a light.', 'She hopes the night will be peaceful for her guest.', 'She is praying for rain to end the drought.'] },
  { pattern: 'darkness', lead: 'Macbeth, as he plans Banquo’s murder:', line: M.LIGHT_THICKENS, means: 'As darkness falls, good things grow sleepy while “night’s black agents” wake to hunt: evil is about to strike.', wrongMeans: ['Macbeth is enjoying a peaceful evening with his wife.', 'The crows are a sign that Banquo will escape.', 'Macbeth is describing a storm at sea.'] },
  { pattern: 'darkness', lead: 'On the morning after Duncan’s murder, Ross says to an old man:', line: M.DARK_NIGHT_STRANGLES, not: ['disorder'], means: 'By the clock it is day, but darkness smothers the sun, as if the heavens were troubled by the murder.', wrongMeans: ['It is simply a cloudy morning, and Ross is bored.', 'Ross is glad that the sun has risen.', 'Ross is describing a play he has seen.'] },
  { pattern: 'sleep', lead: 'Macbeth, just after killing Duncan:', line: M.SLEEP_NO_MORE, not: ['sickness'], means: 'By killing Duncan in his sleep, Macbeth has destroyed his own peace: he will never again enjoy innocent, healing sleep.', wrongMeans: ['He is too excited about becoming king to sleep.', 'He is warning the guards to stay awake.', 'He is pleased that Duncan died peacefully.'] },
  { pattern: 'sleep', lead: 'Macbeth, explaining why he envies the dead King:', line: M.SLEEPS_WELL, not: ['sickness'], means: 'Duncan rests peacefully in death, while Macbeth lies awake tortured by fear: the murderer has lost the peace he took.', wrongMeans: ['He is glad that Duncan suffered before he died.', 'He plans to visit Duncan’s grave.', 'He believes Duncan is only asleep.'] },
  { pattern: 'sleep', lead: 'After the banquet, Lady Macbeth tells her husband:', line: M.SEASON_OF_NATURES, means: 'Sleep, which keeps every living thing fresh, has been taken from Macbeth by his guilt and fear.', wrongMeans: ['She wants him to stay awake and guard the castle.', 'She thinks he is lazy and sleeps too much.', 'She is talking about the change of seasons.'] },
  { pattern: 'clothing', lead: 'Ross has just called Macbeth Thane of Cawdor:', line: M.BORROWED_ROBES, means: 'The title feels like clothes that belong to someone else: Macbeth knows the Thane of Cawdor is still alive.', wrongMeans: ['Macbeth has borrowed robes for the King’s feast.', 'Macbeth is ashamed of his poor clothes.', 'Macbeth wants to wear Duncan’s crown.'] },
  { pattern: 'clothing', lead: 'Banquo, watching Macbeth, who is lost in thought after the news:', line: M.STRANGE_GARMENTS, means: 'Like new clothes that only fit after they are worn in, Macbeth’s new honours do not sit easily on him yet.', wrongMeans: ['Macbeth is wearing strange clothes from Norway.', 'Banquo is jealous of Macbeth’s fine clothes.', 'New honours are a sign that Macbeth will soon die.'] },
  { pattern: 'clothing', lead: 'As Malcolm’s army approaches, a Scottish lord, Angus, says of Macbeth:', line: M.GIANTS_ROBE, not: ['blood'], means: 'Macbeth is too small for the crown he stole, like a little thief lost inside a giant’s robe.', wrongMeans: ['Macbeth has grown so powerful that his robes no longer fit.', 'Macbeth has disguised himself to escape.', 'Macbeth is a giant among kings.'] },
  { pattern: 'clothing', lead: 'Macduff decides not to attend Macbeth’s crowning at Scone:', line: M.OLD_ROBES, means: 'He fears that the new reign, like new clothes, will fit Scotland worse than the old one under Duncan.', wrongMeans: ['He is worried about what to wear at the crowning.', 'He wants new robes made for the new king.', 'He is glad that the old king’s reign has ended.'] },
  { pattern: 'sickness', lead: 'Macbeth asks the doctor about his wife:', line: M.MIND_DISEASED, means: 'Lady Macbeth’s guilt is a sickness of the mind that no medicine can reach: only the sufferer can heal it.', wrongMeans: ['Lady Macbeth has a fever that a new drug could cure.', 'Macbeth wants the doctor to poison his wife.', 'The doctor is too lazy to treat her.'] },
  { pattern: 'sickness', lead: 'Rebel Scottish lords march to join Malcolm:', line: M.SICKLY_WEAL, means: 'Scotland is a sick country, and Malcolm is the medicine that will purge it of Macbeth.', wrongMeans: ['The lords are going to fetch a doctor for the King.', 'The army is suffering from a plague.', 'The lords plan to poison Malcolm.'] },
  { pattern: 'sickness', lead: 'The doctor, after watching Lady Macbeth walk in her sleep:', line: M.MORE_NEEDS_DIVINE, not: ['sleep'], means: 'Her illness is caused by guilt: “infected minds” confess their secrets to their pillows, and she needs a priest more than a doctor.', wrongMeans: ['She has caught an infection from the soldiers.', 'The doctor believes she is pretending to be ill.', 'She needs stronger medicine to help her sleep.'] },
  { pattern: 'disorder', lead: 'On the morning after Duncan’s murder, an old man tells Ross:', line: M.FALCON_OWL, not: ['darkness'], means: 'A small owl killing a proud falcon mirrors the murder of a king by his subject: nature itself is turned upside down.', wrongMeans: ['The old man is talking about a hunting trip.', 'Owls are usually stronger than falcons.', 'The bird is a sign that Duncan will recover.'] },
  { pattern: 'disorder', lead: 'Ross and the old man talk the morning after Duncan’s murder:', line: M.DUNCANS_HORSES, means: 'Even Duncan’s horses turn wild and eat each other: the murder of the King has thrown nature into chaos.', wrongMeans: ['The horses were badly trained and hungry.', 'The horses were frightened of the witches.', 'Ross is joking to cheer up the old man.'] },
  { pattern: 'disorder', lead: 'On the morning after Duncan’s murder, Lennox tells Macbeth:', line: M.ROUGH_NIGHT, not: ['darkness'], means: 'Storms, screams and an earthquake on the night of the murder suggest that nature is in uproar at the killing of a king.', wrongMeans: ['Lennox is simply complaining about the weather.', 'The storm was caused by the witches to help Macbeth.', 'Lennox is warning Macbeth to repair the chimneys.'] },
];

function imageryQ(rng: Rng, d: Difficulty) {
  const all = Object.keys(PATTERN_NAME) as Pattern[];
  if (d === 1) {
    const im = rng.pick(IMAGES);
    const others = rng.sample(all.filter((p) => p !== im.pattern && !(im.not ?? []).includes(p)), 3);
    return {
      prompt: `${im.lead}\n\n${quoteBlock(im.line)}\n\nThese lines belong to which pattern of imagery in *Macbeth*?`,
      parts: [part(mc(rng, PATTERN_NAME[im.pattern], others.map((p) => PATTERN_NAME[p])))],
      hints: ['Look for the picture the words build in your mind: a colour, a time of day, a state of the body, a piece of clothing, or a strange event in nature.'],
      solution: [`These lines belong to the pattern of ${PATTERN_NAME[im.pattern].toLowerCase()}: across the play, ${PATTERN_WHAT[im.pattern]}.`],
    };
  }
  if (d === 2) {
    const im = rng.pick(IMAGES);
    return {
      prompt: `${im.lead}\n\n${quoteBlock(im.line)}\n\nWhat does the imagery suggest at this moment?`,
      parts: [part(mc(rng, im.means, im.wrongMeans))],
      hints: ['Say what the picture is first (blood that will not wash off, a robe that is too big …), then ask what it shows about the character or the moment.'],
      solution: [im.means],
    };
  }
  // Difficulty 3: which passage belongs to a pattern, or how a pattern develops.
  if (rng.chance(0.5)) {
    const want = rng.pick(all);
    const right = rng.pick(IMAGES.filter((x) => x.pattern === want && !x.not));
    const others = rng.sample(all.filter((p) => p !== want), 3).map((p) => rng.pick(IMAGES.filter((x) => x.pattern === p && !(x.not ?? []).includes(want))));
    return {
      prompt: `Which passage belongs to the pattern of **${PATTERN_NAME[want].toLowerCase()}** imagery in *Macbeth*?`,
      parts: [part(mc(rng, inline(right.line), others.map((x) => inline(x.line))))],
      hints: [`In this pattern, ${PATTERN_WHAT[want]}. Find the passage whose central picture belongs to it.`],
      solution: [`${inline(right.line)} (${where(right.line)})`, right.means],
    };
  }
  const dev = rng.pick(DEVELOPMENTS);
  return {
    prompt: dev.ask,
    parts: [part(mc(rng, dev.right, dev.wrong))],
    hints: ['Compare how the image is used early in the play with how it is used near the end. What has changed in the characters?'],
    solution: [dev.why],
  };
}

/** How a pattern changes across the play (difficulty 3). */
const DEVELOPMENTS: Array<{ ask: string; right: string; wrong: string[]; why: string }> = [
  {
    ask: 'In Act 1, Scene 2, a captain praises Macbeth’s sword, which “smok’d with bloody execution”. In Act 5, Scene 1, Lady Macbeth cannot wash “the smell of the blood” from her hand. How has the meaning of blood changed?',
    right: 'At first blood is a sign of honour in battle; by the end it is a sign of murder and of guilt that cannot be removed.',
    wrong: ['At first blood is a sign of guilt; by the end it is a sign of honour.', 'Blood means the same thing throughout: bravery in war.', 'Blood stands for royal birth in both scenes.'],
    why: 'In Act 1 bloodshed earns praise and titles; after the murders, blood clings to the killers as guilt that no water or perfume can remove.',
  },
  {
    ask: 'Right after the murder, Lady Macbeth says, “A little water clears us of this deed.” In Act 5, Scene 1, she rubs her hands and cries, “What, will these hands ne’er be clean?” What does the change show?',
    right: 'Her early confidence that guilt can be washed away has collapsed: the blood she dismissed now haunts her mind.',
    wrong: ['She has become more confident as queen.', 'She has forgotten the murder completely.', 'She is blaming Macbeth for not washing his hands.'],
    why: 'The washing image returns with its meaning reversed: what seemed easy to clean becomes impossible, which shows how guilt has broken her.',
  },
  {
    ask: 'In Act 1, Macbeth asks why he is dressed “in borrow’d robes”. In Act 5, Angus says his title hangs on him “like a giant’s robe / Upon a dwarfish thief”. What does the clothing imagery suggest across the play?',
    right: 'Macbeth’s titles never truly belong to him: they are borrowed or stolen, and they never fit the man.',
    wrong: ['Macbeth grows into his royal titles and wears them well.', 'Macbeth cares more about fine clothes than about power.', 'The other lords envy Macbeth’s wealth.'],
    why: 'From “borrow’d robes” to the “giant’s robe” on a “dwarfish thief”, the clothes never fit: Macbeth is a usurper, too small for the crown he stole.',
  },
  {
    ask: 'Macbeth hears a voice cry, “Macbeth does murder sleep”, and later Lady Macbeth walks and talks in her sleep. What does the sleep imagery show?',
    right: 'Murdering a sleeping king has destroyed the murderers’ own peace: neither of them can rest.',
    wrong: ['The Macbeths are too busy ruling Scotland to sleep.', 'Sleep is a sign of innocence that the Macbeths keep.', 'Sleep stands for laziness, which the Macbeths overcome.'],
    why: 'Sleep, the “balm of hurt minds”, is what they took from Duncan, and it is what they lose: Macbeth lies in “restless ecstasy” and Lady Macbeth sleepwalks.',
  },
  {
    ask: 'Early in the play the Macbeths call on night to hide their deeds (“Stars, hide your fires!”; “Come, thick night”). In Act 5, Scene 1, the gentlewoman says Lady Macbeth “has light by her continually”. What does the change suggest?',
    right: 'The darkness she once called on to hide her crimes now terrifies her: she cannot bear to be in the dark.',
    wrong: ['She has become afraid of fire.', 'She wants to read late into the night.', 'She has stopped feeling any guilt.'],
    why: 'The pattern of darkness turns around: the night she welcomed as a cover for murder has become something she cannot face.',
  },
];

export const MACBETH_LANGUAGE_SKILLS: SkillDef[] = [
  skill({
    id: 'e11-macbeth-language',
    name: 'Paraphrasing Macbeth',
    description: 'Choose the best modern paraphrase of lines from Macbeth, avoiding plausible misreadings, and work out words in context.',
    outcomes: ['11-C1'],
    lessonId: L,
    format: 'mc',
    gen: languageQ,
  }),
  skill({
    id: 'e11-macbeth-imagery',
    name: 'The imagery of Macbeth',
    description: 'Trace the patterns of imagery in Macbeth (blood, darkness, sleep, clothing, sickness and disorder in nature) and explain what an image suggests at its moment in the play.',
    outcomes: ['11-C1'],
    lessonId: L,
    format: 'mc',
    gen: imageryQ,
  }),
];
