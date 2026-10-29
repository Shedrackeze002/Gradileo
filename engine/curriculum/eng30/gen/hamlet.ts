/**
 * Excerpts from Shakespeare's Hamlet, quoted exactly from Project Gutenberg's edition (eBook #1524),
 * with each speaker and the act and scene. Verse keeps its line breaks; prose is one line. Stage
 * directions are in square brackets. The edition's speech labels KING and QUEEN are Claudius and
 * Gertrude. The play was first printed in 1603, so it is in the public domain everywhere.
 */

export const HAM = { author: 'William Shakespeare', title: 'Hamlet', url: 'https://www.gutenberg.org/ebooks/1524' };

export interface Speech {
  speaker: string;
  /** Verse lines separated by "\n". */
  text: string;
}

export interface Passage {
  act: number;
  scene: number;
  speeches: Speech[];
}

/** One speaker's lines. */
const S = (speaker: string, act: number, scene: number, text: string): Passage => ({ act, scene, speeches: [{ speaker, text }] });
/** An exchange between speakers. */
const D = (act: number, scene: number, ...speeches: Array<[string, string]>): Passage => ({ act, scene, speeches: speeches.map(([speaker, text]) => ({ speaker, text })) });

/** "Act 2, Scene 2". */
export const where = (p: Passage) => `Act ${p.act}, Scene ${p.scene}`;
/** The speaker of a one-speaker passage. */
export const speaker = (p: Passage) => p.speeches[0].speaker;

/** A passage as a Markdown blockquote, verse lines kept, with its attribution. */
export function quoteBlock(p: Passage): string {
  const verse = (text: string) => text.split('\n').map((l, i, all) => `> ${l}${i < all.length - 1 ? '\\' : ''}`);
  if (p.speeches.length === 1) {
    return [...verse(p.speeches[0].text), '>', `> — ${p.speeches[0].speaker}, *${HAM.title}*, ${where(p)}`].join('\n');
  }
  const out: string[] = [];
  p.speeches.forEach((s, i) => {
    if (i) out.push('>');
    const v = verse(s.text);
    v[0] = `> **${s.speaker}.** ${v[0].slice(2)}`;
    out.push(...v);
  });
  return [...out, '>', `> — *${HAM.title}*, ${where(p)}`].join('\n');
}

/** A passage as a blockquote without its speaker's name (for “Who says this?”). */
export function quoteAnon(p: Passage): string {
  const lines = p.speeches.map((s) => s.text).join('\n').split('\n');
  return [...lines.map((l, i) => `> ${l}${i < lines.length - 1 ? '\\' : ''}`), '>', `> — *${HAM.title}*, ${where(p)}`].join('\n');
}

/** A passage on one line, in quotation marks, with " / " between verse lines (for answer choices); quotation marks inside it become single. */
export const inline = (p: Passage) => `“${p.speeches.map((s) => s.text.split('\n').join(' / ')).join(' … ').replace(/“/g, '‘').replace(/”/g, '’')}”`;

// ---------------------------------------------------------------- Act 1
export const SOMETIME_SISTER = S('Claudius', 1, 2, 'Therefore our sometime sister, now our queen,\nTh’imperial jointress to this warlike state,\nHave we, as ’twere with a defeated joy,\nWith one auspicious and one dropping eye,\nWith mirth in funeral, and with dirge in marriage,\nIn equal scale weighing delight and dole,\nTaken to wife;');
export const KIN_AND_KIND = D(1, 2,
  ['Claudius', 'But now, my cousin Hamlet, and my son—'],
  ['Hamlet', '[*Aside.*] A little more than kin, and less than kind.'],
);
export const TOO_MUCH_SUN = D(1, 2,
  ['Claudius', 'How is it that the clouds still hang on you?'],
  ['Hamlet', 'Not so, my lord, I am too much i’ the sun.'],
);
export const NIGHTED_COLOUR = S('Gertrude', 1, 2, 'Good Hamlet, cast thy nighted colour off,\nAnd let thine eye look like a friend on Denmark.\nDo not for ever with thy vailed lids\nSeek for thy noble father in the dust.\nThou know’st ’tis common, all that lives must die,\nPassing through nature to eternity.');
export const KNOW_NOT_SEEMS = S('Hamlet', 1, 2, 'Seems, madam! Nay, it is; I know not seems.\n’Tis not alone my inky cloak, good mother,\nNor customary suits of solemn black,\nNor windy suspiration of forc’d breath,\nNo, nor the fruitful river in the eye,\nNor the dejected haviour of the visage,\nTogether with all forms, moods, shows of grief,\nThat can denote me truly. These indeed seem,\nFor they are actions that a man might play;\nBut I have that within which passeth show;\nThese but the trappings and the suits of woe.');
export const UNMANLY_GRIEF = S('Claudius', 1, 2, 'But to persevere\nIn obstinate condolement is a course\nOf impious stubbornness. ’Tis unmanly grief,\nIt shows a will most incorrect to heaven,\nA heart unfortified, a mind impatient,\nAn understanding simple and unschool’d;');
export const TOO_SOLID_FLESH = S('Hamlet', 1, 2, 'O that this too too solid flesh would melt,\nThaw, and resolve itself into a dew!\nOr that the Everlasting had not fix’d\nHis canon ’gainst self-slaughter. O God! O God!\nHow weary, stale, flat, and unprofitable\nSeem to me all the uses of this world!');
export const UNWEEDED_GARDEN = S('Hamlet', 1, 2, 'Fie on’t! Oh fie! ’tis an unweeded garden\nThat grows to seed; things rank and gross in nature\nPossess it merely. That it should come to this!\nBut two months dead—nay, not so much, not two:\nSo excellent a king; that was to this\nHyperion to a satyr;');
export const FRAILTY = S('Hamlet', 1, 2, 'Frailty, thy name is woman!\nA little month, or ere those shoes were old\nWith which she followed my poor father’s body\nLike Niobe, all tears.');
export const WICKED_SPEED = S('Hamlet', 1, 2, 'Within a month,\nEre yet the salt of most unrighteous tears\nHad left the flushing in her galled eyes,\nShe married. O most wicked speed, to post\nWith such dexterity to incestuous sheets!\nIt is not, nor it cannot come to good.\nBut break, my heart, for I must hold my tongue.');
export const THRIFT = S('Hamlet', 1, 2, 'Thrift, thrift, Horatio! The funeral bak’d meats\nDid coldly furnish forth the marriage tables.');
export const FEAR_IT_OPHELIA = S('Laertes', 1, 3, 'Fear it, Ophelia, fear it, my dear sister;\nAnd keep you in the rear of your affection,\nOut of the shot and danger of desire.');
export const OWN_SELF_TRUE = S('Polonius', 1, 3, 'Neither a borrower nor a lender be:\nFor loan oft loses both itself and friend;\nAnd borrowing dulls the edge of husbandry.\nThis above all: to thine own self be true;\nAnd it must follow, as the night the day,\nThou canst not then be false to any man.');
export const IN_PLAIN_TERMS = D(1, 3,
  ['Polonius', 'I would not, in plain terms, from this time forth\nHave you so slander any moment leisure\nAs to give words or talk with the Lord Hamlet.\nLook to’t, I charge you; come your ways.'],
  ['Ophelia', 'I shall obey, my lord.'],
);
export const ANGELS_AND_MINISTERS = S('Hamlet', 1, 4, 'Angels and ministers of grace defend us!\nBe thou a spirit of health or goblin damn’d,\nBring with thee airs from heaven or blasts from hell,\nBe thy intents wicked or charitable,\nThou com’st in such a questionable shape\nThat I will speak to thee.');
export const TEMPT_TOWARD_FLOOD = S('Horatio', 1, 4, 'What if it tempt you toward the flood, my lord,\nOr to the dreadful summit of the cliff\nThat beetles o’er his base into the sea,\nAnd there assume some other horrible form\nWhich might deprive your sovereignty of reason,\nAnd draw you into madness?');
export const SOMETHING_ROTTEN = S('Marcellus', 1, 4, 'Something is rotten in the state of Denmark.');
export const REVENGE_HIS_MURDER = D(1, 5,
  ['Ghost', 'If thou didst ever thy dear father love—'],
  ['Hamlet', 'O God!'],
  ['Ghost', 'Revenge his foul and most unnatural murder.'],
);
export const SERPENT_WEARS_CROWN = D(1, 5,
  ['Ghost', 'The serpent that did sting thy father’s life\nNow wears his crown.'],
  ['Hamlet', 'O my prophetic soul!\nMine uncle!'],
);
export const SEEMING_VIRTUOUS = S('Ghost', 1, 5, 'O wicked wit, and gifts, that have the power\nSo to seduce!—won to his shameful lust\nThe will of my most seeming-virtuous queen.\nO Hamlet, what a falling off was there,');
export const BROTHERS_HAND = S('Ghost', 1, 5, 'Thus was I, sleeping, by a brother’s hand,\nOf life, of crown, of queen at once dispatch’d:\nCut off even in the blossoms of my sin,\nUnhous’led, disappointed, unanel’d;\nNo reckoning made, but sent to my account\nWith all my imperfections on my head.');
export const LEAVE_HER_TO_HEAVEN = S('Ghost', 1, 5, 'But howsoever thou pursu’st this act,\nTaint not thy mind, nor let thy soul contrive\nAgainst thy mother aught; leave her to heaven,\nAnd to those thorns that in her bosom lodge,\nTo prick and sting her.');
export const REMEMBER_ME = S('Ghost', 1, 5, 'Adieu, adieu, adieu. Remember me.');
export const SMILING_VILLAIN = S('Hamlet', 1, 5, 'O villain, villain, smiling damned villain!\nMy tables. Meet it is I set it down,\nThat one may smile, and smile, and be a villain!\nAt least I am sure it may be so in Denmark.');
export const MORE_THINGS = S('Hamlet', 1, 5, 'There are more things in heaven and earth, Horatio,\nThan are dreamt of in your philosophy.');
export const ANTIC_DISPOSITION = S('Hamlet', 1, 5, 'How strange or odd soe’er I bear myself,—\nAs I perchance hereafter shall think meet\nTo put an antic disposition on—');
export const OUT_OF_JOINT = S('Hamlet', 1, 5, 'The time is out of joint. O cursed spite,\nThat ever I was born to set it right.');

// ---------------------------------------------------------------- Act 2
export const DOUBLET_UNBRACED = S('Ophelia', 2, 1, 'My lord, as I was sewing in my chamber,\nLord Hamlet, with his doublet all unbrac’d,\nNo hat upon his head, his stockings foul’d,\nUngart’red, and down-gyved to his ankle,\nPale as his shirt, his knees knocking each other,\nAnd with a look so piteous in purport\nAs if he had been loosed out of hell\nTo speak of horrors, he comes before me.');
export const ECSTASY_OF_LOVE = S('Polonius', 2, 1, 'This is the very ecstasy of love,\nWhose violent property fordoes itself,\nAnd leads the will to desperate undertakings,');
export const REPEL_LETTERS = S('Ophelia', 2, 1, 'No, my good lord; but as you did command,\nI did repel his letters and denied\nHis access to me.');
/** Hamlet’s love letter to Ophelia, which Polonius reads aloud to the King and Queen. */
export const LOVE_LETTER = S('Polonius', 2, 2, 'Doubt thou the stars are fire,\nDoubt that the sun doth move,\nDoubt truth to be a liar,\nBut never doubt I love.');
export const BREVITY = D(2, 2,
  ['Polonius', 'Therefore, since brevity is the soul of wit,\nAnd tediousness the limbs and outward flourishes,\nI will be brief. Your noble son is mad.\nMad call I it; for to define true madness,\nWhat is’t but to be nothing else but mad?\nBut let that go.'],
  ['Gertrude', 'More matter, with less art.'],
);
export const WORDS_WORDS = D(2, 2,
  ['Polonius', 'What do you read, my lord?'],
  ['Hamlet', 'Words, words, words.'],
);
export const METHOD_IN_IT = S('Polonius', 2, 2, '[*Aside.*] Though this be madness, yet there is method in’t.');
export const PREGNANT_REPLIES = S('Polonius', 2, 2, '[*Aside.*] How pregnant sometimes his replies are! A happiness that often madness hits on, which reason and sanity could not so prosperously be delivered of.');
export const DENMARKS_A_PRISON = D(2, 2,
  ['Hamlet', 'Denmark’s a prison.'],
  ['Rosencrantz', 'Then is the world one.'],
  ['Hamlet', 'A goodly one; in which there are many confines, wards, and dungeons, Denmark being one o’ th’ worst.'],
);
export const YOU_WERE_SENT_FOR = S('Hamlet', 2, 2, 'You were sent for; and there is a kind of confession in your looks, which your modesties have not craft enough to colour. I know the good King and Queen have sent for you.');
export const LOST_ALL_MY_MIRTH = S('Hamlet', 2, 2, 'I have of late, but wherefore I know not, lost all my mirth, forgone all custom of exercises; and indeed, it goes so heavily with my disposition that this goodly frame the earth, seems to me a sterile promontory;');
export const PIECE_OF_WORK = S('Hamlet', 2, 2, 'What a piece of work is man, how noble in reason, how infinite in faculties, in form and moving, how express and admirable; in action how like an angel, in apprehension, how like a god: the beauty of the world, the paragon of animals. And yet, to me, what is this quintessence of dust? Man delights not me;');
export const NORTH_NORTH_WEST = S('Hamlet', 2, 2, 'I am but mad north-north-west. When the wind is southerly, I know a hawk from a handsaw.');
export const ROGUE_AND_PEASANT = S('Hamlet', 2, 2, 'O what a rogue and peasant slave am I!\nIs it not monstrous that this player here,\nBut in a fiction, in a dream of passion,\nCould force his soul so to his own conceit\nThat from her working all his visage wan’d;');
export const HECUBA = S('Hamlet', 2, 2, 'What’s Hecuba to him, or he to Hecuba,\nThat he should weep for her? What would he do,\nHad he the motive and the cue for passion\nThat I have?');
export const PIGEON_LIVERED = S('Hamlet', 2, 2, 'But I am pigeon-liver’d, and lack gall\nTo make oppression bitter, or ere this\nI should have fatted all the region kites\nWith this slave’s offal.');
export const WHAT_AN_ASS = S('Hamlet', 2, 2, 'Why, what an ass am I! This is most brave,\nThat I, the son of a dear father murder’d,\nPrompted to my revenge by heaven and hell,\nMust … unpack my heart with words');
export const PLAYS_THE_THING = S('Hamlet', 2, 2, 'I’ll have these players\nPlay something like the murder of my father\nBefore mine uncle. I’ll observe his looks;\nI’ll tent him to the quick. If he but blench,\nI know my course.');
export const MAY_BE_THE_DEVIL = S('Hamlet', 2, 2, 'The spirit that I have seen\nMay be the devil, and the devil hath power\nT’assume a pleasing shape, yea, and perhaps\nOut of my weakness and my melancholy,\nAs he is very potent with such spirits,\nAbuses me to damn me. I’ll have grounds\nMore relative than this. The play’s the thing\nWherein I’ll catch the conscience of the King.');

// ---------------------------------------------------------------- Act 3
export const SMART_A_LASH = D(3, 1,
  ['Polonius', 'We are oft to blame in this,\n’Tis too much prov’d, that with devotion’s visage\nAnd pious action we do sugar o’er\nThe devil himself.'],
  ['Claudius', '[*Aside.*] O ’tis too true!\nHow smart a lash that speech doth give my conscience!\nThe harlot’s cheek, beautied with plastering art,\nIs not more ugly to the thing that helps it\nThan is my deed to my most painted word.\nO heavy burden!'],
);
export const TO_BE = S('Hamlet', 3, 1, 'To be, or not to be, that is the question:\nWhether ’tis nobler in the mind to suffer\nThe slings and arrows of outrageous fortune,\nOr to take arms against a sea of troubles,\nAnd by opposing end them?');
export const THE_RUB = S('Hamlet', 3, 1, 'To die, to sleep.\nTo sleep, perchance to dream—ay, there’s the rub,\nFor in that sleep of death what dreams may come,\nWhen we have shuffled off this mortal coil,\nMust give us pause.');
export const WHIPS_AND_SCORNS = S('Hamlet', 3, 1, 'For who would bear the whips and scorns of time,\nThe oppressor’s wrong, the proud man’s contumely,\nThe pangs of dispriz’d love, the law’s delay,\nThe insolence of office, and the spurns\nThat patient merit of the unworthy takes,\nWhen he himself might his quietus make\nWith a bare bodkin?');
export const UNDISCOVERED_COUNTRY = S('Hamlet', 3, 1, 'But that the dread of something after death,\nThe undiscover’d country, from whose bourn\nNo traveller returns, puzzles the will,\nAnd makes us rather bear those ills we have\nThan fly to others that we know not of?');
export const CONSCIENCE_COWARDS = S('Hamlet', 3, 1, 'Thus conscience does make cowards of us all,\nAnd thus the native hue of resolution\nIs sicklied o’er with the pale cast of thought,\nAnd enterprises of great pith and moment,\nWith this regard their currents turn awry\nAnd lose the name of action.');
export const LOVED_YOU_ONCE = D(3, 1,
  ['Hamlet', 'I did love you once.'],
  ['Ophelia', 'Indeed, my lord, you made me believe so.'],
  ['Hamlet', 'You should not have believed me; for virtue cannot so inoculate our old stock but we shall relish of it. I loved you not.'],
);
export const WHERES_YOUR_FATHER = D(3, 1,
  ['Hamlet', 'Where’s your father?'],
  ['Ophelia', 'At home, my lord.'],
);
export const NUNNERY = S('Hamlet', 3, 1, 'Get thee to a nunnery. Why wouldst thou be a breeder of sinners?');
export const NOBLE_MIND = S('Ophelia', 3, 1, 'O, what a noble mind is here o’erthrown!\nThe courtier’s, soldier’s, scholar’s, eye, tongue, sword,\nTh’expectancy and rose of the fair state,\nThe glass of fashion and the mould of form,\nTh’observ’d of all observers, quite, quite down!');
export const NOT_LIKE_MADNESS = S('Claudius', 3, 1, 'Love? His affections do not that way tend,\nNor what he spake, though it lack’d form a little,\nWas not like madness. There’s something in his soul\nO’er which his melancholy sits on brood,\nAnd I do doubt the hatch and the disclose\nWill be some danger, which for to prevent,\nI have in quick determination\nThus set it down: he shall with speed to England');
export const MIRROR_UP_TO_NATURE = S('Hamlet', 3, 2, 'Suit the action to the word, the word to the action, with this special observance, that you o’erstep not the modesty of nature; for anything so overdone is from the purpose of playing, whose end, both at the first and now, was and is, to hold as ’twere the mirror up to nature;');
export const PASSIONS_SLAVE = S('Hamlet', 3, 2, 'Give me that man\nThat is not passion’s slave, and I will wear him\nIn my heart’s core, ay, in my heart of heart,\nAs I do thee.');
export const I_MUST_BE_IDLE = S('Hamlet', 3, 2, 'They are coming to the play. I must be idle.\nGet you a place.');
export const WORMWOOD = D(3, 2,
  ['Player Queen', 'In second husband let me be accurst!\nNone wed the second but who kill’d the first.'],
  ['Hamlet', '[*Aside.*] Wormwood, wormwood.'],
);
export const PROTESTS_TOO_MUCH = D(3, 2,
  ['Gertrude', 'The lady protests too much, methinks.'],
  ['Hamlet', 'O, but she’ll keep her word.'],
);
export const GONZAGO = S('Hamlet', 3, 2, 'He poisons him i’ th’garden for’s estate. His name’s Gonzago. The story is extant, and written in very choice Italian. You shall see anon how the murderer gets the love of Gonzago’s wife.');
export const KING_RISES = D(3, 2,
  ['Ophelia', 'The King rises.'],
  ['Hamlet', 'What, frighted with false fire?'],
  ['Gertrude', 'How fares my lord?'],
  ['Polonius', 'Give o’er the play.'],
  ['Claudius', 'Give me some light. Away.'],
);
export const GHOSTS_WORD = S('Hamlet', 3, 2, 'O good Horatio, I’ll take the ghost’s word for a thousand pound. Didst perceive?');
export const PLAYED_ON_A_PIPE = S('Hamlet', 3, 2, '’Sblood, do you think I am easier to be played on than a pipe? Call me what instrument you will, though you can fret me, you cannot play upon me.');
export const WITCHING_TIME = S('Hamlet', 3, 2, '’Tis now the very witching time of night,\nWhen churchyards yawn, and hell itself breathes out\nContagion to this world. Now could I drink hot blood,\nAnd do such bitter business as the day\nWould quake to look on.');
export const SPEAK_DAGGERS = S('Hamlet', 3, 2, 'O heart, lose not thy nature; let not ever\nThe soul of Nero enter this firm bosom:\nLet me be cruel, not unnatural.\nI will speak daggers to her, but use none;');
export const OFFENCE_IS_RANK = S('Claudius', 3, 3, 'O, my offence is rank, it smells to heaven;\nIt hath the primal eldest curse upon’t,—\nA brother’s murder! Pray can I not,');
export const RETAIN_THE_OFFENCE = S('Claudius', 3, 3, 'But O, what form of prayer\nCan serve my turn? Forgive me my foul murder!\nThat cannot be; since I am still possess’d\nOf those effects for which I did the murder,—\nMy crown, mine own ambition, and my queen.\nMay one be pardon’d and retain th’offence?');
export const NOW_MIGHT_I = S('Hamlet', 3, 3, 'Now might I do it pat, now he is praying.\nAnd now I’ll do’t. And so he goes to heaven;\nAnd so am I reveng’d. That would be scann’d:');
export const HIRE_AND_SALARY = S('Hamlet', 3, 3, 'A villain kills my father, and for that\nI, his sole son, do this same villain send\nTo heaven. O, this is hire and salary, not revenge.');
export const HORRID_HENT = S('Hamlet', 3, 3, 'Up, sword, and know thou a more horrid hent:\nWhen he is drunk asleep; or in his rage,\nOr in th’incestuous pleasure of his bed,\nAt gaming, swearing; or about some act\nThat has no relish of salvation in’t,');
export const WORDS_FLY_UP = S('Claudius', 3, 3, 'My words fly up, my thoughts remain below.\nWords without thoughts never to heaven go.');
export const DEAD_FOR_A_DUCAT = D(3, 4,
  ['Hamlet', 'How now? A rat? [*Draws.*]\nDead for a ducat, dead!'],
  ['Polonius', '[*Behind.*] O, I am slain!'],
);
export const AS_KILL_A_KING = D(3, 4,
  ['Gertrude', 'O what a rash and bloody deed is this!'],
  ['Hamlet', 'A bloody deed. Almost as bad, good mother,\nAs kill a king and marry with his brother.'],
  ['Gertrude', 'As kill a king?'],
);
export const INTRUDING_FOOL = S('Hamlet', 3, 4, '[*To Polonius.*] Thou wretched, rash, intruding fool, farewell!\nI took thee for thy better. Take thy fortune,\nThou find’st to be too busy is some danger.');
export const THIS_PICTURE = S('Hamlet', 3, 4, 'Look here upon this picture, and on this,\nThe counterfeit presentment of two brothers.');
export const GRAINED_SPOTS = S('Gertrude', 3, 4, 'O Hamlet, speak no more.\nThou turn’st mine eyes into my very soul,\nAnd there I see such black and grained spots\nAs will not leave their tinct.');
export const ALAS_HES_MAD = S('Gertrude', 3, 4, 'Alas, he’s mad.');
export const BLUNTED_PURPOSE = S('Ghost', 3, 4, 'Do not forget. This visitation\nIs but to whet thy almost blunted purpose.\nBut look, amazement on thy mother sits.\nO step between her and her fighting soul.');
export const SEE_NOTHING_THERE = D(3, 4,
  ['Gertrude', 'To whom do you speak this?'],
  ['Hamlet', 'Do you see nothing there?'],
  ['Gertrude', 'Nothing at all; yet all that is I see.'],
);
export const CRUEL_TO_BE_KIND = S('Hamlet', 3, 4, 'I must be cruel, only to be kind:\nThus bad begins, and worse remains behind.');
export const MAD_IN_CRAFT = S('Hamlet', 3, 4, 'That I essentially am not in madness,\nBut mad in craft.');
export const NO_LIFE_TO_BREATHE = S('Gertrude', 3, 4, 'Be thou assur’d, if words be made of breath,\nAnd breath of life, I have no life to breathe\nWhat thou hast said to me.');

// ---------------------------------------------------------------- Act 4
export const MAD_AS_THE_SEA = S('Gertrude', 4, 1, 'Mad as the sea and wind, when both contend\nWhich is the mightier. In his lawless fit\nBehind the arras hearing something stir,\nWhips out his rapier, cries ‘A rat, a rat!’\nAnd in this brainish apprehension kills\nThe unseen good old man.');
export const HAD_WE_BEEN_THERE = S('Claudius', 4, 1, 'O heavy deed!\nIt had been so with us, had we been there.\nHis liberty is full of threats to all;');
export const SPONGE = D(4, 2,
  ['Rosencrantz', 'Take you me for a sponge, my lord?'],
  ['Hamlet', 'Ay, sir; that soaks up the King’s countenance, his rewards, his authorities.'],
);
export const FISH_WITH_THE_WORM = S('Hamlet', 4, 3, 'A man may fish with the worm that hath eat of a king, and eat of the fish that hath fed of that worm.');
export const DO_IT_ENGLAND = S('Claudius', 4, 3, 'Our sovereign process, which imports at full,\nBy letters conjuring to that effect,\nThe present death of Hamlet. Do it, England;\nFor like the hectic in my blood he rages,\nAnd thou must cure me.');
export const ALL_OCCASIONS = S('Hamlet', 4, 4, 'How all occasions do inform against me,\nAnd spur my dull revenge. What is a man\nIf his chief good and market of his time\nBe but to sleep and feed? A beast, no more.');
export const THREE_PARTS_COWARD = S('Hamlet', 4, 4, 'Now whether it be\nBestial oblivion, or some craven scruple\nOf thinking too precisely on th’event,—\nA thought which, quarter’d, hath but one part wisdom\nAnd ever three parts coward,—I do not know\nWhy yet I live to say this thing’s to do,\nSith I have cause, and will, and strength, and means\nTo do’t.');
export const EVEN_FOR_AN_EGGSHELL = S('Hamlet', 4, 4, 'Witness this army of such mass and charge,\nLed by a delicate and tender prince,\nWhose spirit, with divine ambition puff’d,\nMakes mouths at the invisible event,\nExposing what is mortal and unsure\nTo all that fortune, death, and danger dare,\nEven for an eggshell.');
export const QUARREL_IN_A_STRAW = S('Hamlet', 4, 4, 'Rightly to be great\nIs not to stir without great argument,\nBut greatly to find quarrel in a straw\nWhen honour’s at the stake.');
export const THOUGHTS_BE_BLOODY = S('Hamlet', 4, 4, 'O, from this time forth,\nMy thoughts be bloody or be nothing worth.');
export const SICK_SOUL = S('Gertrude', 4, 5, 'To my sick soul, as sin’s true nature is,\nEach toy seems prologue to some great amiss.\nSo full of artless jealousy is guilt,\nIt spills itself in fearing to be spilt.');
export const WHAT_WE_MAY_BE = S('Ophelia', 4, 5, 'Lord, we know what we are, but know not what we may be.');
export const SINGLE_SPIES = S('Claudius', 4, 5, 'When sorrows come, they come not single spies,\nBut in battalions. First, her father slain;\nNext, your son gone; and he most violent author\nOf his own just remove;');
export const HEDGE_A_KING = S('Claudius', 4, 5, 'Let him go, Gertrude. Do not fear our person.\nThere’s such divinity doth hedge a king,\nThat treason can but peep to what it would,\nActs little of his will.');
export const ROSEMARY = S('Ophelia', 4, 5, 'There’s rosemary, that’s for remembrance; pray love, remember. And there is pansies, that’s for thoughts.');
export const TO_HELL_ALLEGIANCE = S('Laertes', 4, 5, 'To hell, allegiance! Vows, to the blackest devil!\nConscience and grace, to the profoundest pit!\nI dare damnation. To this point I stand,\nThat both the worlds, I give to negligence,\nLet come what comes; only I’ll be reveng’d\nMost throughly for my father.');
export const PAINTING_OF_A_SORROW = S('Claudius', 4, 7, 'Laertes, was your father dear to you?\nOr are you like the painting of a sorrow,\nA face without a heart?');
export const THIS_WOULD_CHANGES = S('Claudius', 4, 7, 'That we would do,\nWe should do when we would; for this ‘would’ changes,\nAnd hath abatements and delays as many\nAs there are tongues, are hands, are accidents;');
export const THROAT_IN_CHURCH = D(4, 7,
  ['Claudius', 'Hamlet comes back: what would you undertake\nTo show yourself your father’s son in deed,\nMore than in words?'],
  ['Laertes', 'To cut his throat i’ th’ church.'],
  ['Claudius', 'No place, indeed, should murder sanctuarize;\nRevenge should have no bounds.'],
);
export const SWORD_UNBATED = S('Claudius', 4, 7, 'He, being remiss,\nMost generous, and free from all contriving,\nWill not peruse the foils; so that with ease,\nOr with a little shuffling, you may choose\nA sword unbated, and in a pass of practice,\nRequite him for your father.');
export const ANOINT_MY_SWORD = S('Laertes', 4, 7, 'I will do’t.\nAnd for that purpose I’ll anoint my sword.');
export const CHALICE_FOR_THE_NONCE = S('Claudius', 4, 7, 'And that he calls for drink, I’ll have prepar’d him\nA chalice for the nonce; whereon but sipping,\nIf he by chance escape your venom’d stuck,\nOur purpose may hold there.');
export const WILLOW = S('Gertrude', 4, 7, 'There is a willow grows aslant a brook,\nThat shows his hoary leaves in the glassy stream.');
export const MERMAID_LIKE = S('Gertrude', 4, 7, 'There on the pendant boughs her coronet weeds\nClamb’ring to hang, an envious sliver broke,\nWhen down her weedy trophies and herself\nFell in the weeping brook. Her clothes spread wide,\nAnd mermaid-like, awhile they bore her up,\nWhich time she chaunted snatches of old tunes,\nAs one incapable of her own distress,');

// ---------------------------------------------------------------- Act 5
export const CHRISTIAN_BURIAL = D(5, 1,
  ['First Clown', 'Is she to be buried in Christian burial, when she wilfully seeks her own salvation?'],
  ['Second Clown', 'I tell thee she is, and therefore make her grave straight. The crowner hath sat on her, and finds it Christian burial.'],
);
export const POOR_YORICK = S('Hamlet', 5, 1, 'Alas, poor Yorick. I knew him, Horatio, a fellow of infinite jest, of most excellent fancy. He hath borne me on his back a thousand times; and now, how abhorred in my imagination it is!');
export const INCH_THICK = S('Hamlet', 5, 1, 'Now get you to my lady’s chamber, and tell her, let her paint an inch thick, to this favour she must come.');
export const IMPERIOUS_CAESAR = S('Hamlet', 5, 1, 'Imperious Caesar, dead and turn’d to clay,\nMight stop a hole to keep the wind away.');
export const SWEETS_TO_THE_SWEET = S('Gertrude', 5, 1, '[*Scattering flowers.*] Sweets to the sweet. Farewell.\nI hop’d thou shouldst have been my Hamlet’s wife;\nI thought thy bride-bed to have deck’d, sweet maid,\nAnd not have strew’d thy grave.');
export const HAMLET_THE_DANE = S('Hamlet', 5, 1, 'This is I,\nHamlet the Dane.');
export const FORTY_THOUSAND = S('Hamlet', 5, 1, 'I lov’d Ophelia; forty thousand brothers\nCould not, with all their quantity of love,\nMake up my sum.');
export const DIVINITY_SHAPES = S('Hamlet', 5, 2, 'Our indiscretion sometime serves us well,\nWhen our deep plots do pall; and that should teach us\nThere’s a divinity that shapes our ends,\nRough-hew them how we will.');
export const SUDDEN_DEATH = S('Hamlet', 5, 2, 'That on the view and know of these contents,\nWithout debatement further, more or less,\nHe should the bearers put to sudden death,\nNot shriving-time allow’d.');
export const NOT_NEAR_MY_CONSCIENCE = D(5, 2,
  ['Horatio', 'So Guildenstern and Rosencrantz go to’t.'],
  ['Hamlet', 'Why, man, they did make love to this employment.\nThey are not near my conscience; their defeat\nDoes by their own insinuation grow.'],
);
export const IMAGE_OF_MY_CAUSE = S('Hamlet', 5, 2, 'But I am very sorry, good Horatio,\nThat to Laertes I forgot myself;\nFor by the image of my cause I see\nThe portraiture of his.');
export const ILL_ABOUT_MY_HEART = S('Hamlet', 5, 2, 'But thou wouldst not think how ill all’s here about my heart: but it is no matter.');
export const READINESS_IS_ALL = S('Hamlet', 5, 2, 'Not a whit, we defy augury. There’s a special providence in the fall of a sparrow. If it be now, ’tis not to come; if it be not to come, it will be now; if it be not now, yet it will come. The readiness is all.');
export const HIS_MADNESS = S('Hamlet', 5, 2, 'Was’t Hamlet wrong’d Laertes? Never Hamlet.\nIf Hamlet from himself be ta’en away,\nAnd when he’s not himself does wrong Laertes,\nThen Hamlet does it not, Hamlet denies it.\nWho does it, then? His madness. If’t be so,\nHamlet is of the faction that is wrong’d;\nHis madness is poor Hamlet’s enemy.');
export const YOUR_FOIL = D(5, 2,
  ['Hamlet', 'I’ll be your foil, Laertes; in mine ignorance\nYour skill shall like a star i’ th’ darkest night,\nStick fiery off indeed.'],
  ['Laertes', 'You mock me, sir.'],
);
export const PALPABLE_HIT = S('Osric', 5, 2, 'A hit, a very palpable hit.');
export const POISONED_CUP = D(5, 2,
  ['Claudius', 'Gertrude, do not drink.'],
  ['Gertrude', 'I will, my lord; I pray you pardon me.'],
  ['Claudius', '[*Aside.*] It is the poison’d cup; it is too late.'],
);
export const OWN_TREACHERY = S('Laertes', 5, 2, 'Why, as a woodcock to my own springe, Osric.\nI am justly kill’d with mine own treachery.');
export const THE_DRINK = S('Gertrude', 5, 2, 'No, no, the drink, the drink! O my dear Hamlet!\nThe drink, the drink! I am poison’d.');
export const KINGS_TO_BLAME = S('Laertes', 5, 2, 'The treacherous instrument is in thy hand,\nUnbated and envenom’d. The foul practice\nHath turn’d itself on me. Lo, here I lie,\nNever to rise again. Thy mother’s poison’d.\nI can no more. The King, the King’s to blame.');
export const DAMNED_DANE = S('Hamlet', 5, 2, 'Here, thou incestuous, murderous, damned Dane,\nDrink off this potion. Is thy union here?\nFollow my mother.');
export const EXCHANGE_FORGIVENESS = S('Laertes', 5, 2, 'He is justly serv’d.\nIt is a poison temper’d by himself.\nExchange forgiveness with me, noble Hamlet.\nMine and my father’s death come not upon thee,\nNor thine on me.');
export const TELL_MY_STORY = S('Hamlet', 5, 2, 'O good Horatio, what a wounded name,\nThings standing thus unknown, shall live behind me.\nIf thou didst ever hold me in thy heart,\nAbsent thee from felicity awhile,\nAnd in this harsh world draw thy breath in pain,\nTo tell my story.');
export const REST_IS_SILENCE = S('Hamlet', 5, 2, 'But I do prophesy th’election lights\nOn Fortinbras. He has my dying voice.\nSo tell him, with the occurrents more and less,\nWhich have solicited. The rest is silence.');
export const NOBLE_HEART = S('Horatio', 5, 2, 'Now cracks a noble heart. Good night, sweet prince,\nAnd flights of angels sing thee to thy rest.');
export const PURPOSES_MISTOOK = S('Horatio', 5, 2, 'So shall you hear\nOf carnal, bloody and unnatural acts,\nOf accidental judgements, casual slaughters,\nOf deaths put on by cunning and forc’d cause,\nAnd, in this upshot, purposes mistook\nFall’n on the inventors’ heads.');
export const LIKE_A_SOLDIER = S('Fortinbras', 5, 2, 'Let four captains\nBear Hamlet like a soldier to the stage,\nFor he was likely, had he been put on,\nTo have prov’d most royally;');

/** Every passage, for checking them against the source. */
export const PASSAGES: Record<string, Passage> = {
  SOMETIME_SISTER, KIN_AND_KIND, TOO_MUCH_SUN, NIGHTED_COLOUR, KNOW_NOT_SEEMS, UNMANLY_GRIEF, TOO_SOLID_FLESH, UNWEEDED_GARDEN, FRAILTY,
  WICKED_SPEED, THRIFT, FEAR_IT_OPHELIA, OWN_SELF_TRUE, IN_PLAIN_TERMS, ANGELS_AND_MINISTERS, TEMPT_TOWARD_FLOOD, SOMETHING_ROTTEN,
  REVENGE_HIS_MURDER, SERPENT_WEARS_CROWN, SEEMING_VIRTUOUS, BROTHERS_HAND, LEAVE_HER_TO_HEAVEN, REMEMBER_ME, SMILING_VILLAIN, MORE_THINGS,
  ANTIC_DISPOSITION, OUT_OF_JOINT,
  DOUBLET_UNBRACED, ECSTASY_OF_LOVE, REPEL_LETTERS, LOVE_LETTER, BREVITY, WORDS_WORDS, METHOD_IN_IT, PREGNANT_REPLIES, DENMARKS_A_PRISON, YOU_WERE_SENT_FOR,
  LOST_ALL_MY_MIRTH, PIECE_OF_WORK, NORTH_NORTH_WEST, ROGUE_AND_PEASANT, HECUBA, PIGEON_LIVERED, WHAT_AN_ASS, PLAYS_THE_THING, MAY_BE_THE_DEVIL,
  SMART_A_LASH, TO_BE, THE_RUB, WHIPS_AND_SCORNS, UNDISCOVERED_COUNTRY, CONSCIENCE_COWARDS, LOVED_YOU_ONCE, WHERES_YOUR_FATHER, NUNNERY,
  NOBLE_MIND, NOT_LIKE_MADNESS, MIRROR_UP_TO_NATURE, PASSIONS_SLAVE, I_MUST_BE_IDLE, WORMWOOD, PROTESTS_TOO_MUCH, GONZAGO, KING_RISES,
  GHOSTS_WORD, PLAYED_ON_A_PIPE, WITCHING_TIME, SPEAK_DAGGERS, OFFENCE_IS_RANK, RETAIN_THE_OFFENCE, NOW_MIGHT_I, HIRE_AND_SALARY, HORRID_HENT,
  WORDS_FLY_UP, DEAD_FOR_A_DUCAT, AS_KILL_A_KING, INTRUDING_FOOL, THIS_PICTURE, GRAINED_SPOTS, ALAS_HES_MAD, BLUNTED_PURPOSE, SEE_NOTHING_THERE,
  CRUEL_TO_BE_KIND, MAD_IN_CRAFT, NO_LIFE_TO_BREATHE,
  MAD_AS_THE_SEA, HAD_WE_BEEN_THERE, SPONGE, FISH_WITH_THE_WORM, DO_IT_ENGLAND, ALL_OCCASIONS, THREE_PARTS_COWARD, EVEN_FOR_AN_EGGSHELL,
  QUARREL_IN_A_STRAW, THOUGHTS_BE_BLOODY, SICK_SOUL, WHAT_WE_MAY_BE, SINGLE_SPIES, HEDGE_A_KING, ROSEMARY, TO_HELL_ALLEGIANCE,
  PAINTING_OF_A_SORROW, THIS_WOULD_CHANGES, THROAT_IN_CHURCH, SWORD_UNBATED, ANOINT_MY_SWORD, CHALICE_FOR_THE_NONCE, WILLOW, MERMAID_LIKE,
  CHRISTIAN_BURIAL, POOR_YORICK, INCH_THICK, IMPERIOUS_CAESAR, SWEETS_TO_THE_SWEET, HAMLET_THE_DANE, FORTY_THOUSAND, DIVINITY_SHAPES,
  SUDDEN_DEATH, NOT_NEAR_MY_CONSCIENCE, IMAGE_OF_MY_CAUSE, ILL_ABOUT_MY_HEART, READINESS_IS_ALL, HIS_MADNESS, YOUR_FOIL, PALPABLE_HIT,
  POISONED_CUP, OWN_TREACHERY, THE_DRINK, KINGS_TO_BLAME, DAMNED_DANE, EXCHANGE_FORGIVENESS, TELL_MY_STORY, REST_IS_SILENCE, NOBLE_HEART,
  PURPOSES_MISTOOK, LIKE_A_SOLDIER,
};
