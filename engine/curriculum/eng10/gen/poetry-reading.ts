/**
 * Grade 10 English, lesson 2.4: Reading a Poem Closely (10-B1). The speaker, the tone and its
 * shifts, and close-reading questions on whole short public-domain poems, two or three questions to
 * a poem.
 */
import { mc, part, skill, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, Part, SkillDef } from '../../../types.ts';
import { block } from './common.ts';
import {
  ASTRONOMER_ALL, DEATH_ALL, DULCE_FIRST, EAGLE_ALL, FLANDERS_ALL, HOPE_ALL, MASK_ALL, NOBODY_ALL, OZYMANDIAS_ALL, RAINS_ALL, REMEMBER_ALL, SONNET18_ALL,
  SONNET29_ALL, linesOf, verseBlock, verseMd, type Verse,
} from './poems.ts';
import { titled } from './texts.ts';

const L = 'e10-2-4';
const OUT = ['10-B1'];

// ---------------------------------------------------------------------------- speaker and tone

interface ToneQ {
  /** A poem written for Gradileo, line by line. */
  lines?: string[];
  verse?: Verse;
  lead?: string;
  ask: string;
  right: string;
  wrong: string[];
  why: string;
}

const WRITTEN_TONE: ToneQ[] = [
  {
    lines: ['I have stood on this rock for a hundred years,', 'my one bright eye turning all night,', 'so that the ships can find their way home.'],
    ask: 'Who or what is the speaker of this poem?',
    right: 'A lighthouse',
    wrong: ['A ship’s captain', 'The moon', 'A fisherman'],
    why: 'The speaker has stood on a rock for a hundred years with one bright, turning “eye” that guides ships: a lighthouse speaking as “I”.',
  },
  {
    lines: ['Every day you leave me by the door,', 'my laces tangled, my soles worn thin;', 'I have walked you to school a thousand times.'],
    ask: 'Who or what is the speaker of this poem?',
    right: 'A pair of shoes',
    wrong: ['A school bus', 'A dog', 'A parent'],
    why: 'The speaker has laces and soles and has “walked you to school”: a pair of shoes speaking as “I”.',
  },
  {
    lines: ['They planted me when the town was young;', 'now children climb my arms each spring,', 'and every autumn I let my red leaves fall.'],
    ask: 'Who or what is the speaker of this poem?',
    right: 'A tree',
    wrong: ['A park bench', 'A grandmother', 'A playground'],
    why: 'The speaker was planted, has “arms” that children climb, and drops red leaves in autumn: a tree speaking as “I”.',
  },
  {
    lines: ['The sun is up, the sky is wide,', 'my friends are waiting just outside!', 'Who could stay in bed today?'],
    ask: 'Which word best describes the tone of this poem?',
    right: 'Excited',
    wrong: ['Bitter', 'Gloomy', 'Fearful'],
    why: 'The exclamation, the bright sky, the waiting friends and the eager question all sound excited.',
  },
  {
    lines: ['Another rule, another line,', 'another form for us to sign.', 'They never ask us what we think;', 'they only tell us where to stand.'],
    ask: 'Which word best describes the tone of this poem?',
    right: 'Frustrated',
    wrong: ['Joyful', 'Peaceful', 'Admiring'],
    why: 'The repeated “another” and the complaint that “they never ask us” sound fed up and frustrated.',
  },
  {
    lines: ['The house is quiet now you’ve gone.', 'Your coat still hangs beside the door,', 'and every morning I set out two cups', 'before I remember.'],
    ask: 'Which word best describes the tone of this poem?',
    right: 'Grieving',
    wrong: ['Amused', 'Angry', 'Excited'],
    why: 'The quiet house, the coat still hanging and the second cup set out by habit show a speaker grieving for someone who is gone.',
  },
  {
    lines: ['Oh yes, what a wonderful plan:', 'cancel the trip the day before', 'and spend the whole holiday indoors.', 'Truly, you are a genius.'],
    ask: 'Which word best describes the tone of this poem?',
    right: 'Sarcastic',
    wrong: ['Grateful', 'Admiring', 'Fearful'],
    why: 'The speaker calls a ruined holiday “wonderful” and the planner “a genius”, meaning the opposite: the tone is sarcastic.',
  },
];

const PD_TONE: ToneQ[] = [
  {
    verse: FLANDERS_ALL,
    lead: `${titled(FLANDERS_ALL.poem)} by John McCrae, a Canadian doctor who served in the First World War:`,
    ask: 'Who is the speaker of this poem?',
    right: 'Soldiers who have died in the war and lie buried in Flanders',
    wrong: ['A general planning the next attack', 'A farmer who grows poppies', 'A priest speaking at a funeral'],
    why: '“We are the Dead”: the speakers are the soldiers buried “Between the crosses, row on row”.',
  },
  {
    verse: MASK_ALL,
    lead: `${titled(MASK_ALL.poem)} by Paul Laurence Dunbar (“guile” means trickery; “myriad subtleties” means countless clever ways of hiding the truth):`,
    ask: 'Who is the “we” who speaks in this poem?',
    right: 'People who hide their suffering from the world behind smiling faces',
    wrong: ['Actors performing in a play', 'Children dressing up for a party', 'Thieves hiding who they are'],
    why: 'They smile “With torn and bleeding hearts” and hide their “tears and sighs” from the world: the mask is a cheerful face over real suffering.',
  },
  {
    verse: NOBODY_ALL,
    lead: `${titled(NOBODY_ALL.poem)} by Emily Dickinson (“banish” means send away):`,
    ask: 'Which choice best describes the tone of this poem?',
    right: 'Playful and gently mocking',
    wrong: ['Angry and bitter', 'Fearful and anxious', 'Solemn and grieving'],
    why: 'The speaker whispers “don’t tell!” like a child sharing a secret, and laughs at famous people as frogs croaking to a bog.',
  },
  {
    verse: RAINS_ALL,
    lead: `${titled(RAINS_ALL.poem)} by Sara Teasdale, written during the First World War:`,
    ask: 'Which choice best describes the tone of this poem?',
    right: 'Calm, but quietly bleak',
    wrong: ['Cheerful and excited', 'Furious and violent', 'Silly and comic'],
    why: 'The pictures of rain, frogs and robins are gentle and calm, but the poem quietly imagines a world where “mankind perished utterly” and no one minds.',
  },
  {
    verse: DULCE_FIRST,
    lead: `The opening of ${titled(DULCE_FIRST.poem)} by Wilfred Owen, a soldier in the First World War:`,
    ask: 'Which choice best describes the tone of these lines?',
    right: 'Grim and bitter about the reality of war',
    wrong: ['Proud and full of glory', 'Light-hearted and amused', 'Calm and peaceful'],
    why: 'The soldiers are “like old beggars”, “coughing like hags”, cursing “through sludge”: there is no glory here, only grim exhaustion.',
  },
  {
    verse: linesOf(REMEMBER_ALL, 1, 4),
    lead: `The opening of ${titled(REMEMBER_ALL.poem)} by Christina Rossetti:`,
    ask: 'Which choice best describes the tone of these lines?',
    right: 'Tender and loving',
    wrong: ['Angry and accusing', 'Cheerful and carefree', 'Mocking'],
    why: 'The speaker gently asks to be remembered and pictures holding her loved one’s hand: the tone is tender.',
  },
  {
    verse: OZYMANDIAS_ALL,
    lead: `${titled(OZYMANDIAS_ALL.poem)} by Percy Bysshe Shelley (“visage” means face):`,
    ask: 'Who tells the story of the statue?',
    right: 'The speaker repeats what a traveller from an ancient land told him',
    wrong: ['Ozymandias himself', 'The sculptor who carved the statue', 'A king who is building a statue'],
    why: '“I met a traveller from an antique land / Who said …”: the speaker passes on the traveller’s description.',
  },
  {
    verse: DEATH_ALL,
    lead: `${titled(DEATH_ALL.poem)} by Emily Dickinson (“civility” means politeness; a “cornice” is the decorated edge of a roof):`,
    ask: 'What does the last stanza reveal about the speaker?',
    right: 'She died long ago and is looking back on the day of her death.',
    wrong: ['She is a child on her way home from school.', 'She is about to marry the man in the carriage.', 'She is planning a trip into the countryside.'],
    why: '“Since then ’t is centuries”: the ride was long ago, and the carriage was taking her toward “eternity”. The speaker is dead.',
  },
];

const PD_SHIFTS: ToneQ[] = [
  {
    verse: FLANDERS_ALL,
    lead: `${titled(FLANDERS_ALL.poem)} by John McCrae:`,
    ask: 'Where does the tone shift, and how?',
    right: 'In the third stanza: from quiet description of the dead to an urgent call to the living to carry on the fight',
    wrong: ['In the second stanza: from sadness to joy at the larks’ singing', 'In the last line: from anger to forgiveness of the enemy', 'There is no shift: the poem is cheerful throughout'],
    why: 'The first two stanzas describe the graves and the lives lost; then “Take up our quarrel with the foe” turns to command and warning.',
  },
  {
    verse: REMEMBER_ALL,
    lead: `${titled(REMEMBER_ALL.poem)} by Christina Rossetti (“a vestige” means a trace):`,
    ask: 'Where does the tone shift, and how?',
    right: 'At “Yet”: from pleading to be remembered to gently freeing her loved one from grief',
    wrong: ['At “Yet”: from love to anger at being forgotten', 'At line 5: from sadness to joy at their future plans', 'In the last line: from hope to despair'],
    why: 'For eight lines she begs, “Remember me”; then “Yet if you should forget me” she says she would rather be forgotten than make her loved one sad.',
  },
  {
    verse: SONNET29_ALL,
    lead: `Shakespeare’s ${titled(SONNET29_ALL.poem)} (“beweep” means weep over; “haply” means by chance):`,
    ask: 'Where does the tone shift, and how?',
    right: 'When he thinks of the person he loves: from despair and envy to joy',
    wrong: ['When he loses his fortune: from joy to despair', 'In the last line: from love to anger at his rivals', 'At the start: from boredom to curiosity'],
    why: 'The first part is full of disgrace, envy and cursing his fate; then “Haply I think on thee” and his mood rises “like to the lark at break of day”.',
  },
  {
    verse: ASTRONOMER_ALL,
    lead: `${titled(ASTRONOMER_ALL.poem)} by Walt Whitman:`,
    ask: 'Where does the tone shift, and how?',
    right: 'When he leaves the lecture: from weariness to quiet wonder at the stars',
    wrong: ['When the astronomer begins: from boredom to excitement about the figures', 'In the last line: from wonder to fear of the dark', 'At the start: from loneliness to joy at meeting the astronomer'],
    why: 'The repeated “When …” lines pile up charts and figures until he becomes “tired and sick”; outside, alone, he looks up “in perfect silence at the stars”.',
  },
  {
    verse: RAINS_ALL,
    lead: `${titled(RAINS_ALL.poem)} by Sara Teasdale:`,
    ask: 'Where does the tone shift, and how?',
    right: 'At “And not one will know of the war”: from gentle pictures of nature to the bleak idea that nature would not notice if people were gone',
    wrong: ['At the start: from war to a peace treaty', 'At “Robins will wear their feathery fire”: from spring to winter', 'In the last line: from sadness to joy'],
    why: 'The first three couplets are calm pictures of rain, frogs and robins; then the poem turns to the war and to the thought that “mankind perished utterly” and no one would mind.',
  },
];

function toneShown(t: ToneQ): string {
  if (t.verse) return `${t.lead}\n\n${verseBlock(t.verse)}`;
  return `A poem written for Gradileo:\n\n${block(verseMd(t.lines!))}`;
}

function speakerToneQ(rng: Rng, d: Difficulty): GenOutput {
  const t = d === 1 ? rng.pick(WRITTEN_TONE) : d === 2 ? rng.pick(PD_TONE) : rng.pick(PD_SHIFTS);
  return {
    prompt: `${toneShown(t)}\n\n${t.ask}`,
    parts: [part(mc(rng, t.right, t.wrong))],
    hints: [
      d === 3
        ? 'Look for a turning word such as “yet”, “but” or “then”, or a change in what the poem describes. Compare the feeling before and after it.'
        : 'The speaker is the voice in the poem, not always the poet. Tone is the speaker’s attitude: listen to the word choices and what they suggest.',
    ],
    solution: [t.why],
  };
}

// ---------------------------------------------------------------------------- close reading

interface Q {
  ask: string;
  right: string;
  wrong: string[];
  why: string;
}
interface Reading {
  verse: Verse;
  lead: string;
  qs: Q[];
}
const READINGS: Reading[] = [
  {
    verse: EAGLE_ALL,
    lead: `${titled(EAGLE_ALL.poem)} by Alfred, Lord Tennyson (a “crag” is a steep rock; “azure” means sky blue):`,
    qs: [
      { ask: 'What does the eagle do in the last line?', right: 'It dives swiftly down toward the sea.', wrong: ['It is struck by lightning.', 'It flies up toward the sun.', 'It falls asleep on the cliff.'], why: 'It “falls” “like a thunderbolt”: a sudden, powerful dive, perhaps onto its prey.' },
      { ask: 'What does “Close to the sun in lonely lands” suggest about the eagle?', right: 'It lives high up and alone, far above everything else.', wrong: ['It is too hot and wants to fly away.', 'It is lost and looking for a home.', 'It lives in a desert country.'], why: 'Being “close to the sun” puts the eagle at a great height, and the lands are “lonely”: it rules a high, empty world.' },
      { ask: 'Why does the sea seem to “crawl”?', right: 'From so high up, the waves look small and slow.', wrong: ['The tide is going out.', 'The sea is frozen.', 'The eagle is flying very fast.'], why: 'The sea is “beneath him”: from the top of the cliff, even big waves look like slow wrinkles.' },
    ],
  },
  {
    verse: NOBODY_ALL,
    lead: `${titled(NOBODY_ALL.poem)} by Emily Dickinson (“banish” means send away):`,
    qs: [
      { ask: 'How does the speaker feel about being “nobody”?', right: 'Content, even pleased, especially now that she has found another nobody', wrong: ['Ashamed and lonely', 'Angry at being ignored', 'Desperate to become famous'], why: 'She greets the reader happily (“Then there’s a pair of us”) and finds being somebody “dreary”.' },
      { ask: 'Why does the speaker compare being “somebody” to a frog?', right: 'Famous people keep announcing their own names to admirers who hardly matter.', wrong: ['Famous people like to live near water.', 'Frogs are the most admired animals.', 'Being somebody is peaceful and private.'], why: 'A frog croaks the same sound “the livelong day” to “an admiring bog”: fame is noisy, repetitive and a little ridiculous.' },
    ],
  },
  {
    verse: ASTRONOMER_ALL,
    lead: `${titled(ASTRONOMER_ALL.poem)} by Walt Whitman:`,
    qs: [
      { ask: 'How does the speaker feel during the lecture?', right: 'Tired and sick', wrong: ['Thrilled and inspired', 'Proud of his own knowledge', 'Eager to ask questions'], why: 'He says, “How soon unaccountable I became tired and sick.”' },
      { ask: 'What does the speaker do instead of listening?', right: 'He goes outside alone and looks up at the stars in silence.', wrong: ['He asks the astronomer a question.', 'He copies down the figures and charts.', 'He falls asleep in the lecture room.'], why: '“I wander’d off by myself … / Look’d up in perfect silence at the stars.”' },
      { ask: 'What does the poem suggest?', right: 'Experiencing nature directly can move us more than studying it in figures and charts.', wrong: ['Lectures should be shorter.', 'The stars are too far away to study.', 'People should never be alone at night.'], why: 'The crowded room of “proofs” and “figures” leaves him sick; the “mystical moist night-air” and the stars bring peace and wonder.' },
    ],
  },
  {
    verse: RAINS_ALL,
    lead: `${titled(RAINS_ALL.poem)} by Sara Teasdale, written during the First World War:`,
    qs: [
      { ask: 'According to the poem, what would nature do if the war wiped out humankind?', right: 'Carry on as before, without noticing that people were gone', wrong: ['Mourn for humankind', 'Be destroyed along with the people', 'Wait for people to return'], why: '“Not one would mind, neither bird nor tree”, and Spring “Would scarcely know that we were gone.”' },
      { ask: 'What does the poem suggest about people and nature?', right: 'Nature does not depend on us and would not miss us.', wrong: ['Nature needs people to protect it.', 'People are the most important part of nature.', 'Birds and frogs start wars too.'], why: 'The rain, frogs, robins and Spring go on without us: the poem quietly humbles human importance.' },
    ],
  },
  {
    verse: FLANDERS_ALL,
    lead: `${titled(FLANDERS_ALL.poem)} by John McCrae, a Canadian doctor who served in the First World War:`,
    qs: [
      { ask: 'Who is speaking in the poem?', right: 'Soldiers who have died and are buried in Flanders', wrong: ['The larks singing in the sky', 'A general giving orders', 'The poppies in the fields'], why: '“We are the Dead. Short days ago / We lived”.' },
      { ask: 'What do the speakers ask of the reader?', right: 'To carry on the fight they died for', wrong: ['To bring flowers to their graves', 'To stop fighting at once', 'To forget them and move on'], why: '“Take up our quarrel with the foe”, and do not “break faith with us who die”.' },
      { ask: 'What does “The Torch” stand for?', right: 'The cause, or duty, that the dead pass on to the living', wrong: ['A real torch used to see at night', 'The light of the setting sun', 'The guns firing below'], why: 'It is thrown “from failing hands” to the living, who must “hold it high”: the cause they must continue.' },
    ],
  },
  {
    verse: REMEMBER_ALL,
    lead: `${titled(REMEMBER_ALL.poem)} by Christina Rossetti (“to counsel” means to advise; “a vestige” means a trace):`,
    qs: [
      { ask: 'What does the speaker ask at the start of the poem?', right: 'To be remembered after she has died', wrong: ['To be forgiven for leaving', 'To be visited every day', 'To be forgotten at once'], why: '“Remember me when I am gone away, / Gone far away into the silent land”: the “silent land” is death.' },
      { ask: 'What does she say after “Yet”?', right: 'She would rather be forgotten than have her loved one be sad.', wrong: ['She will be angry if she is forgotten.', 'She will come back to remind them.', 'She wants her loved one to grieve forever.'], why: '“Better by far you should forget and smile / Than that you should remember and be sad.”' },
    ],
  },
  {
    verse: MASK_ALL,
    lead: `${titled(MASK_ALL.poem)} by Paul Laurence Dunbar (“guile” means trickery; “over-wise” means knowing too much):`,
    qs: [
      { ask: 'What does the mask hide?', right: 'Pain and suffering', wrong: ['The speakers’ names', 'Their wealth', 'Their happiness'], why: 'Behind the grinning mask are “torn and bleeding hearts”, “tears and sighs” and “tortured souls”.' },
      { ask: 'Why do the speakers wear the mask?', right: 'They do not want the world to see and count their suffering.', wrong: ['The law forces them to.', 'They are performing in a play.', 'They are ashamed of their faces.'], why: '“Why should the world be over-wise, / In counting all our tears and sighs?” They choose to let the world see only the mask.' },
    ],
  },
  {
    verse: OZYMANDIAS_ALL,
    lead: `${titled(OZYMANDIAS_ALL.poem)} by Percy Bysshe Shelley (“visage” means face; “colossal” means enormous):`,
    qs: [
      { ask: 'What is left of the statue?', right: 'Two huge legs, and a broken face half buried in the sand', wrong: ['A complete statue of a king on his throne', 'Nothing at all', 'A great city around it'], why: '“Two vast and trunkless legs of stone” stand, and nearby “a shattered visage lies”, “Half sunk”.' },
      { ask: 'What is ironic about the words on the pedestal?', right: 'The king boasted that his works would make the mighty despair, but nothing of them remains.', wrong: ['The words are in a foreign language.', 'The king was really very poor.', 'The traveller carved the words himself.'], why: '“Look on my works, ye Mighty, and despair!” — yet “Nothing beside remains”, only “lone and level sands”.' },
      { ask: 'Which idea does the poem suggest?', right: 'Power and fame do not last.', wrong: ['Statues are the best way to be remembered.', 'Deserts are dangerous to cross.', 'Travellers cannot be trusted.'], why: 'The proudest king’s works have crumbled into the desert: time defeats power.' },
    ],
  },
  {
    verse: HOPE_ALL,
    lead: `${titled(HOPE_ALL.poem)} by Emily Dickinson (“abash” means to shame or silence; “in extremity” means in the worst of times):`,
    qs: [
      { ask: 'Where does hope live, according to the poem?', right: 'In the soul', wrong: ['In a cage', 'In the sky', 'In the storm'], why: 'It is the thing “That perches in the soul”.' },
      { ask: 'What does hope ask of the speaker in return?', right: 'Nothing at all, not even a crumb', wrong: ['A crumb of bread each day', 'A place to shelter from storms', 'That she sing along with it'], why: '“Yet, never, in extremity, / It asked a crumb of me.”' },
      { ask: 'What does “sweetest in the gale is heard” suggest?', right: 'Hope matters most, and sounds sweetest, in the hardest times.', wrong: ['Hope can only be heard on windy days.', 'Hope disappears in a storm.', 'Birds sing louder in bad weather.'], why: 'A gale is a storm: hope sings sweetest when life is hardest, and only a terrible storm could silence it.' },
    ],
  },
  {
    verse: SONNET18_ALL,
    lead: `Shakespeare’s ${titled(SONNET18_ALL.poem)} (“temperate” means mild and even; “lease” means a time that is rented and must end; “thou ow’st” means you own):`,
    qs: [
      { ask: 'What does the speaker say is wrong with a summer’s day?', right: 'Summer is too short, and sometimes too hot or too windy.', wrong: ['Summer is too cold.', 'Summer lasts too long.', 'Summer has no flowers.'], why: '“Rough winds” shake the buds, “summer’s lease hath all too short a date”, and sometimes the sun is “too hot”.' },
      { ask: 'Why will the loved one’s “eternal summer” not fade?', right: 'The poem itself will keep their beauty alive as long as people read it.', wrong: ['The loved one will never grow old.', 'Summer will never end.', 'The loved one lives in a warm country.'], why: '“So long as men can breathe, or eyes can see, / So long lives this, and this gives life to thee”: “this” is the poem.' },
    ],
  },
  {
    verse: DEATH_ALL,
    lead: `${titled(DEATH_ALL.poem)} by Emily Dickinson (“civility” means politeness; a “cornice” is the decorated edge of a roof):`,
    qs: [
      { ask: 'How is Death shown in the first two stanzas?', right: 'As a kind, unhurried gentleman taking the speaker for a carriage ride', wrong: ['As a frightening monster', 'As a thief who drags her away', 'As an angry judge'], why: 'He “kindly stopped”, “knew no haste”, and she gives up her work “For his civility”.' },
      { ask: 'What is the “house” that seems “A swelling of the ground”?', right: 'Her grave', wrong: ['A farmhouse', 'Death’s castle', 'The school'], why: 'A house that is only a swelling in the ground, its roof “scarcely visible”, is a grave.' },
    ],
  },
];

function poemReadingQ(rng: Rng, d: Difficulty): GenOutput {
  const r = rng.pick(READINGS);
  const n = d === 1 ? 1 : d === 2 ? Math.min(2, r.qs.length) : r.qs.length;
  const qs = d === 3 ? r.qs : rng.sample(r.qs, n).sort((a, b) => r.qs.indexOf(a) - r.qs.indexOf(b));
  const parts: Part[] = qs.map((q, i) => part(mc(rng, q.right, q.wrong), { label: qs.length > 1 ? `${i + 1}. ${q.ask}` : q.ask }));
  return {
    prompt: `${r.lead}\n\n${verseBlock(r.verse)}\n\n${qs.length > 1 ? 'Answer the questions about the poem.' : 'Answer the question about the poem.'}`,
    parts,
    hints: ['Read the poem twice: once for its sense, once slowly for its details. Each answer should rest on words actually in the poem.'],
    solution: qs.map((q, i) => `${qs.length > 1 ? `${i + 1}. ` : ''}${q.right}${/[.!?]$/.test(q.right) ? '' : '.'} ${q.why}`),
  };
}

export const READING_SKILLS: SkillDef[] = [
  skill({
    id: 'e10-speaker-tone',
    name: 'Speaker, tone and shifts',
    description: 'Identify a poem’s speaker and tone, and say where and how the tone shifts.',
    outcomes: OUT,
    lessonId: L,
    format: 'mc',
    gen: speakerToneQ,
  }),
  skill({
    id: 'e10-poem-reading',
    name: 'Reading a poem closely',
    description: 'Answer close-reading questions on a short poem, using its words as evidence.',
    outcomes: OUT,
    lessonId: L,
    format: 'mc',
    gen: poemReadingQ,
  }),
];
