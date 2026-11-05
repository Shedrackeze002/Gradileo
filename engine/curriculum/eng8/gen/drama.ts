/**
 * Grade 8 English, Unit 3: A Midsummer Night’s Dream (E8-C1). Plot and characters, Shakespeare’s
 * language, and how the play works as a comedy. Lines are quoted from the play (first printed in
 * 1600), in modern spelling.
 */
import { skill } from '../../helpers.ts';
import type { SkillDef } from '../../../types.ts';
import { bank, Q } from './common.ts';

const C1 = ['E8-C1'];
const MSND = (scene: string) => `William Shakespeare, A Midsummer Night’s Dream, ${scene}`;

// ---------------------------------------------------------------------------- 3.1 plot and characters

const PLOT = [
  Q(1, 'Where does the play begin?', 'In Athens, at the court of Duke Theseus', ['In a forest just outside the city of London', 'On a ship lost at sea', 'In a castle in Scotland'],
    'The play opens in Athens, where Theseus is about to marry Hippolyta, queen of the Amazons.'),
  Q(1, 'Why do Hermia and Lysander run away into the woods?', 'Hermia’s father wants her to marry Demetrius instead.', ['They are chased by the fairies of the forest.', 'They want to find the Duke’s lost treasure in the woods.', 'They are rehearsing a play for the wedding.'],
    'Egeus demands that Hermia marry Demetrius. Athenian law says she must obey, die, or become a nun, so she and Lysander flee.'),
  Q(1, 'Who are the “mechanicals”?', 'Workmen who rehearse a play for the Duke’s wedding', ['Fairies who serve Titania, the queen of the fairies', 'Soldiers who guard the gates of Athens', 'Lovers who are lost in the woods at night'],
    'Bottom the weaver, Quince the carpenter and their friends are tradesmen putting on “Pyramus and Thisbe”.'),
  Q(2, 'Why are Oberon and Titania quarrelling?', 'Both want a young changeling boy as their own.', ['Titania wants to rule over the city of Athens.', 'Oberon has lost Titania’s magic flower.', 'Both of them want to marry Duke Theseus.'],
    'Titania refuses to give Oberon the changeling boy, and their quarrel throws nature into disorder.'),
  Q(2, 'What goes wrong when Puck uses the love potion on an Athenian in the woods?', 'He puts it on Lysander instead of Demetrius.', ['He drops the flower into the river by mistake.', 'He uses it on Theseus, who falls for Titania.', 'He forgets to use it on anyone at all.'],
    'Oberon told Puck to find a man in Athenian clothes. Puck finds the wrong one, so Lysander wakes and falls for Helena.'),
  Q(2, 'What does Puck do to Bottom?', 'Gives him the head of an ass (a donkey)', ['Turns him into a fairy with silver wings', 'Makes him the Duke of Athens', 'Sends him home to his workshop'],
    'Puck gives Bottom a donkey’s head, and his friends run away in terror.'),
  Q(3, 'How is the problem of the four lovers solved?', 'Lysander is cured, Demetrius stays in love with Helena, and Theseus overrules Egeus.', ['Hermia agrees to marry Demetrius after all.', 'All four lovers decide never to marry anyone, and they leave Athens for good.', 'Puck takes all four lovers to live in fairyland.'],
    'With two happy couples, Theseus lets Hermia marry Lysander, and both pairs marry alongside him and Hippolyta.'),
  Q(3, 'Which order of events is correct?', 'The lovers flee; Puck mixes up the potion; Titania loves Bottom; the couples marry.', ['The couples marry; the lovers flee; Puck mixes up the potion.', 'Titania loves Bottom; the lovers flee; Theseus meets Hippolyta.', 'The mechanicals’ play is performed; the lovers flee; Puck mixes up the potion.'],
    'The lovers escape to the woods, magic causes confusion, and order returns with the weddings and the mechanicals’ play.'),
];

const CHARACTERS = [
  Q(1, 'Who loves Demetrius at the start of the play?', 'Helena', ['Hermia', 'Hippolyta', 'Titania'],
    'Helena loves Demetrius, but he has abandoned her for Hermia.'),
  Q(1, 'Who is Puck?', 'A mischievous fairy who serves Oberon', ['The Duke of Athens', 'Hermia’s strict father', 'A weaver who loves acting in plays'],
    'Puck, also called Robin Goodfellow, is Oberon’s servant and loves playing tricks.'),
  Q(2, 'What is Bottom like?', 'Confident and eager, wanting to play every part', ['Shy and nervous, afraid to speak to anyone at all', 'Cruel and jealous of the lovers', 'Wise and quiet, like the Duke'],
    'In rehearsal Bottom offers to play Pyramus, Thisbe and the Lion as well. His overconfidence makes him comic.'),
  Q(2, 'Why does Helena tell Demetrius that Hermia and Lysander are running away?', 'She hopes to win his thanks and his love.', ['She wants Hermia to be punished by law.', 'She wishes to marry Lysander herself.', 'The fairies have ordered her to do it.'],
    'Helena hopes that helping Demetrius will make him love her again, even though it means he will chase Hermia.'),
  Q(3, 'When both men suddenly love her, why does Helena think they are mocking her?', 'She cannot believe men who scorned her now mean it.', ['She knows all about the fairies’ love potion.', 'She has always been loved by both of them.', 'She wants to marry Theseus instead of them.'],
    'Helena has been rejected for so long that she assumes it is a cruel joke. Only the audience knows about the potion.'),
  Q(3, 'How does Hermia react when she thinks Helena has stolen Lysander?', 'She is furious and wants to fight Helena.', ['She laughs and says she never loved him.', 'She runs home to tell her father.', 'She asks Puck to undo the spell.'],
    'Hermia is ready to scratch Helena’s eyes out, and Helena says, “though she be but little, she is fierce.”'),
];

// ---------------------------------------------------------------------------- 3.2 Shakespeare’s language

const WORDS = [
  Q(1, 'What does “thou” mean?', 'You', ['They', 'We', 'Me'],
    'Thou is an old word for you (as the subject). Thee is you as an object, and thy is your.'),
  Q(1, 'What does “thy” mean?', 'Your', ['Their', 'My', 'Our'],
    'Thy means your: “thy love” is “your love”. Before a vowel it becomes thine.'),
  Q(2, 'In “Ill met by moonlight, proud Titania”, what does Oberon mean?', 'It is bad luck to meet you here tonight.', ['What a lovely night for us to meet.', 'I am ill and need the moonlight.', 'Titania is proud of the moon.'],
    'Ill met means unluckily met: the opposite of “well met”, a friendly greeting. Oberon greets her coldly.', 'Ill met by moonlight, proud Titania.', MSND('Act 2, Scene 1')),
  Q(2, 'In Shakespeare, what does “wherefore” mean?', 'Why', ['Where', 'When', 'Who'],
    'Wherefore means why. (It does not mean where.)'),
  Q(2, 'Puck says he can “put a girdle round about the earth / In forty minutes”. What does he mean?', 'He can fly all the way around the world very fast.', ['He can tie a belt around the waist of a giant.', 'He can count to forty in less than a minute.', 'He can make the earth stop spinning for a time.'],
    'A girdle is a belt. Puck boasts that he can circle the earth in forty minutes.', 'I’ll put a girdle round about the earth\nIn forty minutes.', MSND('Act 2, Scene 1')),
  Q(3, 'Rewrite in modern word order: “The course of true love never did run smooth.”', 'True love has never been easy.', ['True love always runs smoothly.', 'Love is a kind of running race.', 'True love never runs at all.'],
    'Lysander means that true lovers always face obstacles. “Did run” is an older way of saying ran.', 'The course of true love never did run smooth.', MSND('Act 1, Scene 1')),
  Q(3, 'When Quince sees Bottom with an ass’s head, he cries, “Bless thee, Bottom! bless thee! thou art translated.” What does “translated” mean here?', 'Changed or transformed', ['Put into another language', 'Carried to another place', 'Made into a famous actor'],
    'In Shakespeare’s time, translated could mean transformed. Bottom has been changed into something else.', 'Bless thee, Bottom! bless thee! thou art translated.', MSND('Act 3, Scene 1')),
];

const VERSE_PROSE = [
  Q(1, 'In Shakespeare’s plays, what is prose?', 'Ordinary sentences, without a regular beat', ['Lines with ten syllables and a steady beat', 'Lines that always rhyme in pairs', 'Songs sung by the fairies'],
    'Prose is written like normal speech, in sentences. Verse has a regular rhythm, usually iambic pentameter.'),
  Q(1, 'Which characters in A Midsummer Night’s Dream usually speak in prose?', 'The mechanicals, such as Bottom', ['Oberon and Titania, the fairy rulers', 'Theseus and Hippolyta', 'The four young lovers'],
    'The workmen speak in everyday prose. The nobles, lovers and fairies mostly speak in verse.'),
  Q(2, 'The lovers often speak in rhyming couplets in the woods. Why might Shakespeare do this?', 'The neat rhymes suit the silly, sing-song romance of the potion.', ['Rhyming couplets show that the lovers are really workmen in disguise.', 'The lovers have forgotten how to speak normally.', 'Couplets are only used for very sad scenes.'],
    'The bouncy rhymes make the sudden, potion-driven declarations of love sound exaggerated and comic.'),
  Q(2, 'Is this line verse or prose? “The course of true love never did run smooth.”', 'Verse: a line of iambic pentameter', ['Prose: an ordinary sentence of speech', 'Neither: it is a stage direction', 'A song with a repeated refrain'],
    'the COURSE of TRUE love NEV-er DID run SMOOTH: ten syllables in a da-DUM beat, so verse.'),
  Q(3, 'Bottom speaks in prose: “I have had a most rare vision. I have had a dream, past the wit of man to say what dream it was.” What does the prose suggest?', 'He is an ordinary man struggling to describe something magical.', ['He is a king giving a grand speech to his court.', 'He is a fairy casting a spell on the lovers.', 'He is reading aloud a poem he has written for Duke Theseus.'],
    'Prose marks Bottom as a down-to-earth workman, and his tangled sentence shows how hard it is for him to put the dream into words.', 'I have had a most rare vision. I have had a dream, past the wit of man to say what dream it was.', MSND('Act 4, Scene 1')),
  Q(3, 'Why does Shakespeare give the fairies short, rhyming, song-like lines at times?', 'It makes them sound magical and different from humans.', ['It shows that the fairies are poor, hard-working labourers.', 'It shows that they are about to die.', 'It means the actors forgot their lines.'],
    'Changing the rhythm and rhyme sets the fairy world apart and gives it a spell-like sound.'),
];

// ---------------------------------------------------------------------------- 3.3 comedy and the play within the play

const COMEDY = [
  Q(1, 'How does a Shakespearean comedy usually end?', 'With order restored and one or more marriages', ['With the death of the main character on stage', 'With a war between two kingdoms', 'With the hero alone and in disgrace'],
    'Comedies move from confusion to harmony, usually ending in weddings.'),
  Q(1, 'Which is a feature of Shakespearean comedy?', 'Mistaken identity and confusion', ['A hero with a fatal flaw', 'A ghost demanding revenge', 'A battle that kills the king'],
    'Mix-ups, disguises and confusions drive comedies. A fatal flaw belongs to tragedy.'),
  Q(2, 'What is a “play within a play”?', 'A play that characters perform inside the main play', ['A second play printed in the same book', 'A play that is far too long to perform in one evening', 'A rehearsal that the audience never sees'],
    'The mechanicals perform “Pyramus and Thisbe” for the wedding guests: a play inside the play.'),
  Q(2, 'Why is the mechanicals’ “Pyramus and Thisbe” funny?', 'Its tragic story is acted so badly that it becomes absurd.', ['Its jokes are told by very skilled, experienced actors.', 'It has a happy ending with a wedding.', 'It is performed by fairies in disguise.'],
    'A man plays a wall, a lion apologizes for being scary, and the deaths are hammed up. Bad acting turns tragedy into comedy.'),
  Q(3, '“Pyramus and Thisbe” tells of young lovers kept apart by their parents who die tragically. How does it mirror the main plot?', 'Hermia and Lysander were also kept apart, but their story ends happily.', ['It shows that Hermia and Lysander will also die at the end of the play.', 'It is about the fairies’ quarrel over a boy.', 'It has no link to anything else in the play.'],
    'The play within the play shows how the lovers’ story might have gone in a tragedy, which makes the comic ending feel lucky.'),
  Q(3, 'Puck’s epilogue begins, “If we shadows have offended, / Think but this, and all is mended, / That you have but slumber’d here / While these visions did appear.” What does he ask the audience to do?', 'Treat the play as a dream if they did not like it', ['Go to sleep quietly before the play has ended', 'Come back tomorrow for another play', 'Punish the actors who made mistakes'],
    'Shadows can mean actors. Puck playfully says that if we were offended, we can think of the play as a dream.', 'If we shadows have offended,\nThink but this, and all is mended,\nThat you have but slumber’d here\nWhile these visions did appear.', MSND('Act 5, Epilogue')),
];

const QUOTES = [
  Q(1, 'Who says “Lord, what fools these mortals be!”?', 'Puck', ['Bottom', 'Theseus', 'Hermia'],
    'Puck says it in Act 3, laughing at the lovers’ confusion.', 'Lord, what fools these mortals be!', MSND('Act 3, Scene 2')),
  Q(2, 'What does Puck mean by “Lord, what fools these mortals be!”?', 'Humans in love behave foolishly.', ['Humans are wiser than fairies.', 'Mortals should never fall in love.', 'He is sorry for his own mistakes.'],
    'Puck enjoys watching humans make fools of themselves over love, though he caused much of the mess.', 'Lord, what fools these mortals be!', MSND('Act 3, Scene 2')),
  Q(2, 'Helena says, “Love looks not with the eyes, but with the mind, / And therefore is wing’d Cupid painted blind.” What does she mean?', 'Love is not based on what we see, so it can be blind and unfair.', ['People in love always have very good eyesight.', 'Cupid was a real painter who lost his sight.', 'Love only depends on how beautiful a person looks from the outside.'],
    'Helena is as beautiful as Hermia, yet Demetrius prefers Hermia. Love follows the imagination, not the eyes, so Cupid is shown blindfolded.', 'Love looks not with the eyes, but with the mind,\nAnd therefore is wing’d Cupid painted blind.', MSND('Act 1, Scene 1')),
  Q(3, 'Helena says of Hermia, “And though she be but little, she is fierce.” What does this reveal?', 'Hermia is small but has a fiery temper.', ['Hermia is tall and very gentle.', 'Hermia is a child, not a young woman.', 'Hermia is afraid of Helena.'],
    'The line, spoken as Hermia threatens her, shows Hermia’s spirit and adds to the comedy of the quarrel.', 'And though she be but little, she is fierce.', MSND('Act 3, Scene 2')),
  Q(3, 'Theseus says, “The lunatic, the lover and the poet / Are of imagination all compact.” What idea does this connect to in the play?', 'Imagination, like the dream in the woods, shapes how people see the world.', ['Poets should be kept away from the city of Athens.', 'Lovers are always more sensible and clear-sighted than other people.', 'Imagination is useless and should be ignored.'],
    'Theseus groups madmen, lovers and poets as people ruled by imagination, which is exactly what the night in the woods has shown.', 'The lunatic, the lover and the poet\nAre of imagination all compact.', MSND('Act 5, Scene 1')),
];

// ---------------------------------------------------------------------------- skills

export const DRAMA_SKILLS: SkillDef[] = [
  skill({ id: 'e8-msnd-plot', name: 'The plot of the Dream', description: 'Follow the four plots of A Midsummer Night’s Dream: the court, the lovers, the fairies and the mechanicals.', outcomes: C1, lessonId: 'e8-3-1', format: 'mc', gen: bank(PLOT, ['Four groups: the court, the lovers, the fairies, the mechanicals.', 'The woods bring confusion; Athens brings order.']) }),
  skill({ id: 'e8-msnd-characters', name: 'Characters in the Dream', description: 'Explain the motives and conflicts of the main characters.', outcomes: C1, lessonId: 'e8-3-1', format: 'mc', gen: bank(CHARACTERS, ['Ask: what does this character want, and what stands in the way?', 'Remember who is under the potion.']) }),
  skill({ id: 'e8-shakespeare-words', name: 'Shakespeare’s words', description: 'Understand Shakespeare’s pronouns, older words and word order.', outcomes: C1, lessonId: 'e8-3-2', format: 'mc', gen: bank(WORDS, ['Thou and thee mean you; thy means your.', 'Wherefore means why.']) }),
  skill({ id: 'e8-verse-prose', name: 'Verse and prose', description: 'Explain why some characters speak in verse and others in prose.', outcomes: C1, lessonId: 'e8-3-2', format: 'mc', gen: bank(VERSE_PROSE, ['Verse has a steady beat; prose does not.', 'Nobles, lovers and fairies use verse; the mechanicals use prose.']) }),
  skill({ id: 'e8-comedy', name: 'Shakespearean comedy', description: 'Identify the features of a Shakespearean comedy and the role of the play within the play.', outcomes: C1, lessonId: 'e8-3-3', format: 'mc', gen: bank(COMEDY, ['Comedies move from confusion to order and marriage.', 'Pyramus and Thisbe is a tragedy acted as a comedy.']) }),
  skill({ id: 'e8-msnd-quotes', name: 'Key lines from the Dream', description: 'Explain who says key lines and what they reveal.', outcomes: C1, lessonId: 'e8-3-3', format: 'mc', gen: bank(QUOTES, ['Ask who is speaking, to whom, and when.', 'Link the line to the play’s ideas about love and imagination.']) }),
];
