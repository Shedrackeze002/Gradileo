/**
 * Grade 12 English, lessons 6.5 and 6.6: Style: Precision, Concision and Voice, and The Final
 * Examination Essay (12-F2). Turning nominalizations back into verbs, cutting stacked hedges without
 * overstating, keeping one precise academic voice, putting the key idea in the stress position and
 * varying rhythm for emphasis; then reading a final-examination prompt, choosing the text and
 * approach that answer it, writing a controlling idea, and managing a two-task examination.
 * Details about the public-domain stories and poems of Grades 10 and 11 are accurate to the texts.
 */
import { mc, part, skill, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { block, order, q } from '../../eng10/gen/common.ts';

const STYLE = 'e12-6-5';
const EXAM = 'e12-6-6';
const OUTCOMES = ['12-F2'];

// ---------------------------------------------------------------------------- lesson 6.5: nominalizations

interface Nominal {
  original: string;
  /** Verbs instead of noun phrases, same meaning, same register. */
  good: string;
  /** Reworded but still built on nouns ("make a decision"). */
  stillNominal: string;
  /** So short that part of the meaning is lost. */
  overcut: string;
  /** Concise, but in a casual voice that does not suit formal writing. */
  informal: string;
}

const NOMINALS: Nominal[] = [
  {
    original: 'The committee made a decision to conduct an investigation of the complaint.',
    good: 'The committee decided to investigate the complaint.',
    stillNominal: 'The committee reached a decision to carry out an investigation into the complaint.',
    overcut: 'The committee decided.',
    informal: 'The committee figured they’d go and check out the complaint.',
  },
  {
    original: 'There was a failure on the part of the narrator to provide an explanation of his behaviour.',
    good: 'The narrator failed to explain his behaviour.',
    stillNominal: 'The narrator was guilty of a failure to provide an explanation of his behaviour.',
    overcut: 'The narrator failed.',
    informal: 'The narrator just totally didn’t bother explaining himself.',
  },
  {
    original: 'The author gives a description of the storm and provides an illustration of its effects on the town.',
    good: 'The author describes the storm and illustrates its effects on the town.',
    stillNominal: 'The author offers a description of the storm and an illustration of its effects on the town.',
    overcut: 'The author describes the storm.',
    informal: 'The author goes on and on about the storm and how it messed up the town.',
  },
  {
    original: 'The council’s implementation of the new policy resulted in a reduction in traffic.',
    good: 'Traffic fell because the council implemented the new policy.',
    stillNominal: 'The implementation by the council of the new policy led to a reduction of the traffic.',
    overcut: 'Traffic fell.',
    informal: 'Once the council got the new policy going, traffic went way down.',
  },
  {
    original: 'Macbeth’s acceptance of the witches’ prophecy is the cause of his eventual destruction.',
    good: 'Because Macbeth accepts the witches’ prophecy, he eventually destroys himself.',
    stillNominal: 'Macbeth’s acceptance of the prophecy of the witches brings about his eventual destruction.',
    overcut: 'Macbeth is destroyed.',
    informal: 'Macbeth totally buys into what the witches say, and that’s what wrecks him.',
  },
  {
    original: 'We conducted an analysis of the results and came to the conclusion that the method needed improvement.',
    good: 'We analysed the results and concluded that the method needed improvement.',
    stillNominal: 'We carried out an analysis of the results and reached the conclusion that the method needed improvement.',
    overcut: 'We analysed the results.',
    informal: 'We looked over the results and figured the method kind of needed fixing.',
  },
  {
    original: 'The speaker makes an admission of his guilt in the final stanza.',
    good: 'The speaker admits his guilt in the final stanza.',
    stillNominal: 'The speaker offers an admission of his own guilt in the final stanza.',
    overcut: 'The speaker admits it.',
    informal: 'The speaker basically owns up to it at the very end.',
  },
  {
    original: 'The students gave their agreement to the proposal after a discussion of its costs.',
    good: 'The students agreed to the proposal after discussing its costs.',
    stillNominal: 'The students gave their agreement to the proposal following a discussion of its costs.',
    overcut: 'The students agreed.',
    informal: 'The students said OK to the proposal after chatting about how much it’d cost.',
  },
];

interface Hedge {
  original: string;
  /** Keeps any qualifier the claim needs, and drops the stacked hedges. */
  good: string;
  stillHedged: string;
  overstated: string;
  informal: string;
}

const HEDGES: Hedge[] = [
  {
    original: 'It could perhaps be argued that the narrator may possibly be somewhat unreliable in certain ways.',
    good: 'The narrator is, in some ways, unreliable.',
    stillHedged: 'It might be argued that the narrator is possibly unreliable in some ways.',
    overstated: 'The narrator lies about absolutely everything, from beginning to end.',
    informal: 'The narrator is kind of sketchy in a few ways, I guess.',
  },
  {
    original: 'It seems as though the poem might perhaps be suggesting that memory is, in a sense, a kind of loss.',
    good: 'The poem suggests that memory is a kind of loss.',
    stillHedged: 'It seems that the poem might be suggesting that memory is perhaps a kind of loss.',
    overstated: 'The poem proves beyond all doubt that every memory is a loss for everyone.',
    informal: 'The poem is basically saying that remembering stuff is kind of sad.',
  },
  {
    original: 'One might possibly suggest that the ending could be read as somewhat ironic.',
    good: 'The ending can be read as ironic.',
    stillHedged: 'One might suggest that the ending could perhaps be read as ironic.',
    overstated: 'The ending is the most ironic ending that anyone has ever written.',
    informal: 'The ending is pretty ironic if you think about it.',
  },
  {
    original: 'It is arguably perhaps the case that the setting may reflect the character’s mood to some degree.',
    good: 'To some degree, the setting reflects the character’s mood.',
    stillHedged: 'It is perhaps arguable that the setting may reflect the character’s mood to some degree.',
    overstated: 'Every detail of the setting perfectly mirrors every one of the character’s feelings.',
    informal: 'The setting kind of matches how the character is feeling, sort of.',
  },
  {
    original: 'It may well be that the author is perhaps trying in some way to criticize the war.',
    good: 'The author criticizes the war.',
    stillHedged: 'It may be that the author is perhaps trying to criticize the war.',
    overstated: 'The author proves that every war in history was a terrible mistake.',
    informal: 'The author is pretty much slamming the war, I think.',
  },
  {
    original: 'It could be said that the symbol might be seen as possibly standing for a kind of freedom.',
    good: 'The symbol stands for a kind of freedom.',
    stillHedged: 'It could be said that the symbol might perhaps stand for a kind of freedom.',
    overstated: 'The symbol stands for freedom and for nothing else, in every reading ever made.',
    informal: 'The symbol is basically all about freedom, kind of.',
  },
];

interface Voice {
  /** A short passage whose voice slips. */
  original: string;
  /** One precise, consistent academic voice. */
  good: string;
  /** Shifts into "you". */
  youShift: string;
  /** Keeps the slang. */
  slang: string;
  /** Inflated, over-formal diction that obscures the point. */
  pompous: string;
}

const VOICES: Voice[] = [
  {
    original: 'Gilman’s narrator records her symptoms with care. But her husband is like, totally dismissive, and you can tell she is scared of him.',
    good: 'Gilman’s narrator records her symptoms with care, but her husband dismisses them, and her fear of him shows in what she leaves unsaid.',
    youShift: 'Gilman’s narrator records her symptoms with care, but her husband dismisses them, and you can really tell that you would be scared of him too.',
    slang: 'Gilman’s narrator records her symptoms with care, but her husband totally brushes them off, and she is super scared of him, honestly.',
    pompous: 'Gilman’s narrator records her symptoms with care, but her husband, most egregiously dismissive, engenders within her a fear beyond all expression.',
  },
  {
    original: 'Owen’s images of the gas attack are vivid and disturbing. Honestly the poem is pretty brutal and it makes you feel sick.',
    good: 'Owen’s images of the gas attack are vivid and disturbing, and their brutality is deliberate: they force the reader to share the speaker’s horror.',
    youShift: 'Owen’s images of the gas attack are vivid and disturbing, and if you read them closely you will feel sick, just as you would at the front.',
    slang: 'Owen’s images of the gas attack are vivid and disturbing, and honestly the whole poem is pretty brutal and totally makes the reader feel sick.',
    pompous: 'Owen’s images of the gas attack are vivid and disturbing, and their unremitting brutality occasions in the perusing reader an ineffable nausea.',
  },
  {
    original: 'Joyce uses light and dark imagery throughout “Araby”. The ending is kind of a downer, but it totally makes sense.',
    good: 'Joyce uses light and dark imagery throughout “Araby”, so the darkness of the closing bazaar feels like the natural end of the boy’s disappointment.',
    youShift: 'Joyce uses light and dark imagery throughout “Araby”, so when you reach the dark bazaar at the end, you feel just as let down as the boy does.',
    slang: 'Joyce uses light and dark imagery throughout “Araby”, so the ending at the dark bazaar is a total downer, but it kind of makes sense anyway.',
    pompous: 'Joyce uses light and dark imagery throughout “Araby”, whereby the crepuscular terminus of the bazaar affords a most consummate culmination of dismay.',
  },
  {
    original: 'Shelley’s sonnet shows that power doesn’t last. That king thought he was a big deal, but now he’s just a pile of rubble.',
    good: 'Shelley’s sonnet shows that power does not last: the king who thought himself mighty survives only as a broken statue in the sand.',
    youShift: 'Shelley’s sonnet shows that power does not last, and you realize that even if you were a mighty king, you would end up as rubble too.',
    slang: 'Shelley’s sonnet shows that power does not last: the king thought he was a big deal, but now he is just a pile of broken rubble in the sand.',
    pompous: 'Shelley’s sonnet evinces the transience of dominion, the erstwhile puissant sovereign enduring solely as fragmentary statuary amid the sands.',
  },
  {
    original: 'Hawthorne never tells us what the veil hides. It’s super mysterious, and the townspeople kind of freak out about it.',
    good: 'Hawthorne never reveals what the veil hides, and that mystery unsettles the townspeople more than any confession could have done.',
    youShift: 'Hawthorne never reveals what the veil hides, and you would be unsettled too if your own minister suddenly appeared wearing one.',
    slang: 'Hawthorne never reveals what the veil hides, which is super mysterious, and the townspeople totally freak out about it every Sunday.',
    pompous: 'Hawthorne never reveals what the veil conceals, an occlusion that perturbs the townsfolk beyond any avowal they might conceivably receive.',
  },
  {
    original: 'Mansfield writes “Miss Brill” through the main character’s thoughts. The ending is so sad and you just feel bad for her.',
    good: 'Mansfield tells “Miss Brill” through its heroine’s thoughts, so the reader shares her hurt when the young couple’s mockery breaks her illusion.',
    youShift: 'Mansfield tells “Miss Brill” through its heroine’s thoughts, so you share her hurt and you feel bad for her when the boy and girl mock her.',
    slang: 'Mansfield tells “Miss Brill” through its heroine’s thoughts, so the ending is so sad and the reader just feels really bad for her, honestly.',
    pompous: 'Mansfield renders “Miss Brill” through its heroine’s cogitations, whereby the reader partakes of her dolour upon the juvenile couple’s derision.',
  },
];

function styleRevision(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const n = rng.pick(NOMINALS);
    return {
      prompt: `${block(n.original)}\n\nWhich revision turns the **nominalizations** (actions buried in nouns, such as *make a decision*) back into verbs, keeping the meaning and a formal voice?`,
      parts: [part(mc(rng, n.good, [n.stillNominal, n.overcut, n.informal]))],
      hints: ['Find the action hiding in a noun (*decision*, *investigation*, *description*) and make it the verb: *decide*, *investigate*, *describe*.'],
      solution: [`${q(n.good)} puts the actions back into verbs, keeps every part of the meaning, and stays formal.`, 'Of the others, one is still built on nouns, one cuts so much that meaning is lost and one slips into a casual voice.'],
    };
  }
  if (d === 2) {
    const h = rng.pick(HEDGES);
    return {
      prompt: `${block(h.original)}\n\nWhich revision removes the **stacked hedges** but keeps the claim honest?`,
      parts: [part(mc(rng, h.good, [h.stillHedged, h.overstated, h.informal]))],
      hints: ['One qualifier, where the evidence really is limited, is honest. Three or four in a row only blur the claim. Cutting them must not turn the claim into an absolute.'],
      solution: [`${q(h.good)} makes the claim plainly and keeps only the qualifier it needs.`, 'Of the others, one is still hedged, one overstates the claim and one slips into a casual voice.'],
    };
  }
  const v = rng.pick(VOICES);
  return {
    prompt: `A student’s paragraph slips out of its academic voice:\n\n${block(v.original)}\n\nWhich revision keeps **one precise, consistent academic voice**?`,
    parts: [part(mc(rng, v.good, [v.youShift, v.slang, v.pompous]))],
    hints: ['An academic voice is formal but plain: third person, no slang, and no inflated words chosen to sound impressive rather than to be exact.'],
    solution: [`${q(v.good)} is formal, precise and consistent from start to finish.`, 'Of the others, one shifts into “you”, one keeps the slang and one swaps plain words for inflated ones that blur the point.'],
  };
}

// ---------------------------------------------------------------------------- lesson 6.5: emphasis and rhythm

interface Stress {
  /** The idea the writer wants to stress. */
  idea: string;
  /** The sentence that ends on that idea. */
  good: string;
  /** The same content, with the idea buried earlier. */
  others: [string, string, string];
}

const STRESSES: Stress[] = [
  {
    idea: 'that the letter was burned unsent',
    good: 'She wrote the apology three times, sealed it, stamped it and then, the next morning, burned it unsent.',
    others: [
      'Unsent, the apology she had written three times, sealed and stamped was burned the next morning.',
      'The next morning she burned the unsent apology, which she had written three times, sealed and stamped.',
      'She burned the apology unsent the next morning, after writing it three times and sealing and stamping it.',
    ],
  },
  {
    idea: 'that the bridge collapsed',
    good: 'For a hundred years the bridge had carried carts, trains and crowds across the river; last night, without warning, it collapsed.',
    others: [
      'Last night, without warning, the bridge collapsed, after carrying carts, trains and crowds across the river for a hundred years.',
      'The bridge, which collapsed without warning last night, had carried carts, trains and crowds across the river for a hundred years.',
      'When it collapsed without warning last night, the bridge had been carrying carts, trains and crowds across the river for a hundred years.',
    ],
  },
  {
    idea: 'that the game ended in a draw',
    good: 'After nine hours, 140 moves and two near-victories for each player, the game ended where it began: in a draw.',
    others: [
      'The game ended in a draw after nine hours, 140 moves and two near-victories for each player.',
      'In a draw, after nine hours, 140 moves and two near-victories for each player, the game ended where it began.',
      'A draw ended the game where it began after nine hours, 140 moves and two near-victories for each player.',
    ],
  },
  {
    idea: 'that nobody came',
    good: 'She had cleaned the hall, set out a hundred chairs, printed the programs and tuned the piano, and nobody came.',
    others: [
      'Nobody came, although she had cleaned the hall, set out a hundred chairs, printed the programs and tuned the piano.',
      'Although nobody came, she had cleaned the hall, set out a hundred chairs, printed the programs and tuned the piano.',
      'In the hall where nobody came, she had set out a hundred chairs, printed the programs and tuned the piano.',
    ],
  },
  {
    idea: 'that the cure was clean water',
    good: 'For centuries doctors had blamed the disease on bad air, bad luck and bad blood; the cure, in the end, was clean water.',
    others: [
      'Clean water, in the end, was the cure for the disease that for centuries doctors had blamed on bad air, bad luck and bad blood.',
      'The cure, clean water, came in the end, after doctors had blamed the disease for centuries on bad air, bad luck and bad blood.',
      'In the end clean water cured the disease that for centuries doctors had blamed on bad air, bad luck and bad blood.',
    ],
  },
  {
    idea: 'that the town voted no',
    good: 'After months of meetings, posters, petitions and promises from every side, the town finally voted, and it voted no.',
    others: [
      'The town voted no after months of meetings, posters, petitions and promises from every side.',
      'No was the town’s answer when it finally voted, after months of meetings, posters, petitions and promises.',
      'When it voted no, the town had sat through months of meetings, posters, petitions and promises from every side.',
    ],
  },
  {
    idea: 'that the house was gone',
    good: 'I came back after twenty years expecting the porch, the apple tree and the blue front door, and found an empty lot.',
    others: [
      'An empty lot was all I found when I came back after twenty years, expecting the porch, the apple tree and the blue door.',
      'When I found an empty lot after twenty years, I had been expecting the porch, the apple tree and the blue front door.',
      'Finding an empty lot after twenty years, I had expected the porch, the apple tree and the blue front door to be there.',
    ],
  },
  {
    idea: 'that the shortest runner won',
    good: 'The favourites were taller, older and better trained, and they had beaten her all season; the race went to the shortest runner.',
    others: [
      'The shortest runner won the race, although the favourites were taller, older and better trained and had beaten her all season.',
      'Winning the race, the shortest runner beat favourites who were taller, older and better trained and had won all season.',
      'Though she was the shortest runner, she won the race against taller, older and better-trained favourites who had beaten her all season.',
    ],
  },
];

interface Rhythm {
  /** A paragraph whose sentences all have the same length and shape. */
  original: string;
  /** Long sentences that build, then a short sentence for the climax. */
  varied: string;
  /** Everything run into one long sentence. */
  oneSentence: string;
  /** Everything chopped into short sentences. */
  choppy: string;
  /** Varied, but the short sentence is spent on a minor detail. */
  wasted: string;
}

const RHYTHMS: Rhythm[] = [
  {
    original: 'The waves grew higher as the night went on. The crew tied down everything on deck. The captain stayed at the wheel all night. At dawn the mast finally broke in two.',
    varied: 'As the night went on, the waves grew higher, and the crew worked in the dark to tie down everything on deck while the captain held the wheel hour after hour. At dawn, the mast broke.',
    oneSentence: 'As the night went on the waves grew higher and the crew tied down everything on deck and the captain stayed at the wheel all night long until at dawn the mast finally broke in two.',
    choppy: 'The night went on. The waves grew. They grew higher. The crew worked. They tied things down. The captain stayed. He held the wheel. Dawn came. The mast broke. It broke in two.',
    wasted: 'The crew tied things down. As the night went on, the waves grew higher, and the captain held the wheel hour after hour until, at dawn, the mast finally broke in two and fell into the sea.',
  },
  {
    original: 'The students waited outside the hall for the results. Some of them paced up and down the corridor. Others sat on the floor in silence. Then the doors opened and the list went up.',
    varied: 'The students waited outside the hall for the results, some pacing up and down the corridor, others sitting on the floor in a silence no one wanted to break. Then the doors opened.',
    oneSentence: 'The students waited outside the hall for the results and some of them paced up and down the corridor while others sat on the floor in silence until at last the doors opened and the list went up.',
    choppy: 'The students waited. They stood outside the hall. Some paced. Others sat. They sat on the floor. Nobody spoke. Time passed. The doors opened. A list went up. Everyone ran.',
    wasted: 'The students waited. Some paced up and down the corridor outside the hall while others sat on the floor in a silence no one wanted to break, until at last the doors opened and the list went up.',
  },
  {
    original: 'The climbers left the camp before dawn. They crossed the glacier roped together. The wind grew stronger as they climbed. At noon they reached the summit at last.',
    varied: 'The climbers left the camp before dawn, crossed the glacier roped together and pushed on as the wind grew stronger with every hundred metres they gained. At noon, they stood on the summit.',
    oneSentence: 'The climbers left the camp before dawn and crossed the glacier roped together and kept climbing while the wind grew stronger and stronger until at noon they reached the summit at last.',
    choppy: 'The climbers left. It was before dawn. They crossed the glacier. They were roped together. The wind grew. It grew stronger. They climbed on. Noon came. They reached the top.',
    wasted: 'The climbers left the camp before dawn. Roped together, they crossed the glacier and pushed on as the wind grew stronger, until at noon they reached the summit at last after many hours of climbing.',
  },
  {
    original: 'The old man opened the letter slowly. He read it twice at the kitchen table. He folded it and put it in his pocket. Then he sat very still and began to cry.',
    varied: 'The old man opened the letter slowly, read it twice at the kitchen table, then folded it with great care and put it away in his pocket, as if it might tear. Then he wept.',
    oneSentence: 'The old man opened the letter slowly and read it twice at the kitchen table and then folded it and put it in his pocket and sat there very still until at last he began to cry.',
    choppy: 'The old man had a letter. He opened it slowly. He read it. He read it twice. He folded it. He put it away. It went in his pocket. He sat still. He cried.',
    wasted: 'The old man opened the letter slowly. Then, at the kitchen table, he read it twice, folded it with great care, put it in his pocket and sat there very still until at last he began to cry.',
  },
  {
    original: 'The team trained every morning for a year. They lost every game in the autumn. They kept training through the winter. In the spring they won the final.',
    varied: 'For a year the team trained every morning, losing every game in the autumn and training on through the dark winter months when no one came to watch them play. In the spring, they won.',
    oneSentence: 'The team trained every morning for a year and lost every game in the autumn and kept on training through the winter even when no one watched until in the spring they won the final.',
    choppy: 'The team trained. They trained every morning. A year passed. They lost in autumn. They lost every game. Winter came. They kept training. Spring came. They won.',
    wasted: 'The team trained every morning. For a year they kept at it, losing every game in the autumn and training on through the dark winter months, until in the spring they finally won the final against the champions.',
  },
];

function sentenceCraft(rng: Rng, d: Difficulty): GenOutput {
  if (d === 3) {
    const r = rng.pick(RHYTHMS);
    return {
      prompt: `Every sentence of this paragraph has the same length and shape:\n\n${block(r.original)}\n\nWhich revision uses **rhythm** best, so that the paragraph builds to its most important moment?`,
      parts: [part(mc(rng, r.varied, [r.oneSentence, r.choppy, r.wasted]))],
      hints: ['Longer sentences can build pressure; a short sentence after them lands with force. Put the short one where the paragraph’s key moment is.'],
      solution: [`${q(r.varied)} builds with longer sentences and saves a short one for the climax.`, 'Of the others, one runs everything into a single breathless sentence, one chops everything up so nothing stands out and one spends its short sentence on a minor detail.'],
    };
  }
  const st = rng.pick(STRESSES);
  const others = d === 1 ? rng.sample(st.others, 2) : st.others;
  return {
    prompt: `A writer wants to stress **${st.idea}**. Which sentence puts that idea in the **stress position**, at the very end?`,
    parts: [part(mc(rng, st.good, others))],
    hints: ['Readers give most weight to the end of a sentence. Build the context first and save the key idea for the last words.'],
    solution: [`${q(st.good)} builds the context first and ends on the key idea, where it lands hardest.`, 'Each of the others puts the key idea earlier and ends on something less important.'],
  };
}

// ---------------------------------------------------------------------------- lesson 6.6: the examination prompt

interface ExamPrompt {
  prompt: string;
  /** What the prompt asks for. */
  meaning: string;
  meaningWrong: [string, string, string];
  /** The best text and approach. */
  approach: string;
  approachWrong: [string, string, string];
  /** A controlling idea that answers the prompt arguably. */
  thesis: string;
  thesisWrong: [string, string, string];
}

const EXAM_PROMPTS: ExamPrompt[] = [
  {
    prompt: 'Discuss the idea, developed in a literary text you have studied, about how people respond when the truth threatens the story they tell about themselves.',
    meaning: 'Argue, with evidence, what one text you studied suggests about how people react when the truth threatens their self-image.',
    meaningWrong: [
      'Retell the plot of a text you have studied in which a character discovers the truth about something that matters to them.',
      'Explain your own opinion about whether people should always tell the truth, using examples from your own life and the news.',
      'Discuss any idea that you find interesting in a literary text you have studied, as long as you quote from that text often.',
    ],
    approach: '“Miss Brill”: argue that Mansfield shows how an overheard truth can expose, but not erase, the fantasy that makes a lonely life bearable.',
    approachWrong: [
      '“Miss Brill”: retell Miss Brill’s Sunday afternoon in the park in order, from the band’s first piece to the moment she goes home.',
      '“To Build a Fire”: argue that London shows how the deadly cold of the Yukon is more powerful than any man who dares to travel through it alone.',
      '“Miss Brill”: describe Katherine Mansfield’s own life in London and explain which people she knew may have inspired the character.',
    ],
    thesis: 'In “Araby”, Joyce suggests that when the truth punctures the story we tell about ourselves, we feel shame first, yet that shame begins clear sight.',
    thesisWrong: [
      'In “Araby”, Joyce develops an important and interesting idea about how people respond when the truth threatens the stories they tell.',
      'In “Araby”, Joyce shows that Dublin in the early twentieth century was a dark and poor city where religion shaped almost every part of daily life.',
      'In “Araby”, a boy promises to bring a girl a gift from a bazaar, arrives too late after his uncle forgets, and leaves the bazaar with nothing at all.',
    ],
  },
  {
    prompt: 'Discuss the idea, developed in a literary text you have studied, about the cost of keeping a secret.',
    meaning: 'Argue what one text you have studied suggests about what keeping a secret costs a person, using evidence from that text.',
    meaningWrong: [
      'List as many of the secrets that characters keep as you can remember from all of the texts that you have read this year.',
      'Explain whether you think it is ever right to keep a secret from a close friend or family member, using your own experience.',
      'Retell the plot of a text you have studied in which a secret is revealed, in order, from its first page to its very last.',
    ],
    approach: '“The Minister’s Black Veil”: argue that Hawthorne shows how a secret, even a symbolic one, can cut a person off from love and from community.',
    approachWrong: [
      '“The Minister’s Black Veil”: retell what happens to Mr. Hooper from the first Sunday he wears the veil until the day of his death.',
      '“Ozymandias”: argue that Shelley shows how even the most powerful kings in history are forgotten as the centuries pass, and their works decay.',
      '“The Minister’s Black Veil”: explain the history of the Puritans in New England and describe their religious beliefs and customs in detail.',
    ],
    thesis: 'In “A White Heron”, Jewett suggests that keeping a secret can protect something precious, but only by giving up a friendship that may never return.',
    thesisWrong: [
      'In “A White Heron”, Jewett develops an important and interesting idea about the cost that a person pays for keeping a secret from other people.',
      'In “A White Heron”, Jewett shows that the countryside of nineteenth-century New England was a beautiful place, full of forests, marshes and wildlife.',
      'In “A White Heron”, Sylvia meets a young hunter, climbs a tall pine tree to find the heron’s nest, and then decides not to tell him where it is.',
    ],
  },
  {
    prompt: 'Discuss the idea, developed in a literary text you have studied, about the gap between how others see a person and who that person really is.',
    meaning: 'Argue, with evidence, what one text you studied suggests about the difference between how a person is seen and who they are.',
    meaningWrong: [
      'Describe what the main character of a text you have studied looks like, using as many details from the text as you can find.',
      'Explain whether you think people judge each other too quickly today, using examples from social media and from your own life.',
      'Compare the characters in several different texts you have studied, and decide which one of them you like the best and why.',
    ],
    approach: '“We Wear the Mask”: argue that Dunbar shows how a cheerful public face can be forced on people whose suffering the world refuses to see.',
    approachWrong: [
      '“We Wear the Mask”: paraphrase each line of the poem in plain modern words, in order, from its first stanza to its very last.',
      '“The Eagle”: argue that Tennyson shows the power and the loneliness of a great bird that watches the wide sea from high above it.',
      '“We Wear the Mask”: explain the history of the United States in the 1890s and describe the life and family of Paul Laurence Dunbar.',
    ],
    thesis: 'In “The Yellow Wallpaper”, Gilman suggests that the gap between how a woman is seen and who she is can become a trap, as the patient replaces the person.',
    thesisWrong: [
      'In “The Yellow Wallpaper”, Gilman develops an interesting idea about the gap between how other people see a person and who that person really is.',
      'In “The Yellow Wallpaper”, Gilman shows that country houses in the 1890s were often old, gloomy places decorated with very strange yellow wallpaper.',
      'In “The Yellow Wallpaper”, a woman rests in an upstairs room, becomes obsessed with the paper on its walls, and finally tears it all down at the end.',
    ],
  },
  {
    prompt: 'Discuss the idea, developed in a literary text you have studied, about the ways individuals respond to forces they cannot control.',
    meaning: 'Argue, with evidence, what one text you have studied suggests about how people respond to forces beyond their control.',
    meaningWrong: [
      'Explain which forces in the modern world, such as the weather or the economy, are the hardest for people to control.',
      'Retell the plot of a text you have studied in which characters face danger, from the moment the danger begins to the end.',
      'List the techniques the writer uses in a text you have studied, such as imagery and symbolism, with an example of each.',
    ],
    approach: '“The Open Boat”: argue that Crane shows how men facing an indifferent sea find their only meaning in their bond with one another.',
    approachWrong: [
      '“The Open Boat”: retell the men’s night at sea and their swim through the surf, in order, from the first page to the last.',
      '“I’m nobody! Who are you?”: argue that Dickinson shows the quiet pleasure of privacy and the foolishness of wanting to be famous.',
      '“The Open Boat”: explain how small boats are built and how their crews are trained to survive a shipwreck far out at sea.',
    ],
    thesis: 'In “To Build a Fire”, London suggests that the most dangerous response to a force beyond our control is the confidence that we can control it after all.',
    thesisWrong: [
      'In “To Build a Fire”, London develops an interesting idea about the many different ways in which people respond to forces they cannot control.',
      'In “To Build a Fire”, London shows that the Yukon in the depths of winter is one of the coldest and most dangerous places anywhere on Earth.',
      'In “To Build a Fire”, a man ignores an old-timer’s advice, breaks through the ice into a hidden spring, fails to keep a fire burning, and freezes.',
    ],
  },
  {
    prompt: 'Discuss the idea, developed in a literary text you have studied, about what is gained or lost when a person chooses loyalty over self-interest.',
    meaning: 'Argue, with evidence, what one text you studied suggests about what is gained and lost when loyalty wins over self-interest.',
    meaningWrong: [
      'Explain whether you think loyalty or self-interest is more important in life, using examples from your own friendships.',
      'Retell the plot of a text you have studied in which a character must make a difficult choice between two people they love.',
      'Discuss whether the writer of a text you have studied was a loyal person, using what you know about the writer’s own life.',
    ],
    approach: '“A White Heron”: argue that Jewett shows Sylvia choosing loyalty to the heron over money and friendship, and weigh what she loses.',
    approachWrong: [
      '“A White Heron”: retell Sylvia’s climb up the great pine tree in order, from the moment she leaves the house to her return home.',
      '“The Tell-Tale Heart”: argue that Poe shows how guilt can drive a murderer to confess his crime to the police at last.',
      '“A White Heron”: explain how herons build their nests and why they are often found in the marshes of New England in summer.',
    ],
    thesis: 'In “The Gift of the Magi”, O. Henry suggests that loyalty can look foolish by the measure of money, yet it gains something no money can buy.',
    thesisWrong: [
      'In “The Gift of the Magi”, O. Henry develops an interesting idea about what a person gains or loses by choosing loyalty over self-interest.',
      'In “The Gift of the Magi”, O. Henry shows that life in New York at the start of the twentieth century was hard for people with little money.',
      'In “The Gift of the Magi”, Della sells her hair to buy a watch chain, and Jim sells his watch to buy her combs, so neither gift can be used.',
    ],
  },
  {
    prompt: 'Discuss the idea, developed in a literary text you have studied, about the role of illusion in a person’s life.',
    meaning: 'Argue, with evidence, what one text you have studied suggests about the part that illusion plays in a person’s life.',
    meaningWrong: [
      'Explain how magicians create illusions on stage, and whether you think it is wrong for them to deceive their audiences.',
      'Retell the plot of a text you have studied in which a character believes something that turns out not to be true.',
      'Describe the setting of a text you have studied and explain whether you would like to live in that place yourself.',
    ],
    approach: '“Araby”: argue that Joyce shows how the boy’s romantic illusion gives his dull life its meaning until the bazaar exposes it.',
    approachWrong: [
      '“Araby”: retell the boy’s journey to the bazaar on the train, in order, from the moment he leaves home until he arrives.',
      '“The Eagle”: argue that Tennyson shows the strength of the eagle as it falls from its mountain like a thunderbolt.',
      '“Araby”: explain the history of Dublin at the start of the twentieth century and describe its streets and its schools.',
    ],
    thesis: 'In “Miss Brill”, Mansfield suggests that illusion can be a shelter that makes a lonely life bearable, which is exactly why losing it hurts so much.',
    thesisWrong: [
      'In “Miss Brill”, Mansfield develops an interesting idea about the role that illusion plays in a person’s life and in the lives of the people around her.',
      'In “Miss Brill”, Mansfield shows that public gardens in the early twentieth century were busy places on Sundays, full of music and visitors.',
      'In “Miss Brill”, a woman listens to the band in the park, overhears a young couple mocking her fur, and goes home sadly to her little dark room.',
    ],
  },
];

function examPrompt(rng: Rng, d: Difficulty): GenOutput {
  const e = rng.pick(EXAM_PROMPTS);
  const lead = `A final examination asks:\n\n${block(e.prompt)}`;
  if (d === 1) {
    return {
      prompt: `${lead}\n\nWhat does this prompt ask you to do?`,
      parts: [part(mc(rng, e.meaning, e.meaningWrong))],
      hints: ['*Discuss the idea … developed in a literary text* means: argue what the text suggests about the prompt’s subject, with evidence from the text. It is not a request for plot, opinion alone, or any idea at all.'],
      solution: [`${q(e.meaning)} names what the prompt asks.`, 'None of the others asks for an argument about what a text suggests on the prompt’s subject; each asks instead for plot, a list, a description, a personal opinion or a different subject.'],
    };
  }
  if (d === 2) {
    return {
      prompt: `${lead}\n\nWhich text and approach would answer this prompt best?`,
      parts: [part(mc(rng, e.approach, e.approachWrong))],
      hints: ['Choose a text whose central idea fits the prompt’s subject, and an approach that argues about the text rather than retelling it or turning to history.'],
      solution: [`${q(e.approach)} fits the prompt’s subject and argues about what the text suggests.`, 'Of the others, one retells or paraphrases instead of arguing, one argues about an idea other than the prompt’s subject and one turns to background instead of the text.'],
    };
  }
  return {
    prompt: `${lead}\n\nWhich **controlling idea** answers this prompt best?`,
    parts: [part(mc(rng, e.thesis, e.thesisWrong))],
    hints: ['A controlling idea answers the prompt in a claim of your own. Repeating the prompt, describing the setting or summarizing the plot does not answer it.'],
    solution: [`${q(e.thesis)} answers the prompt with an arguable claim about what the text suggests.`, 'Of the others, one only repeats the prompt, one turns to setting or history and one summarizes the plot.'],
  };
}

// ---------------------------------------------------------------------------- lesson 6.6: managing the examination

interface Budget {
  setup: string;
  good: string;
  wrong: [string, string, string];
}

const BUDGETS: Budget[] = [
  {
    setup: 'Your final examination has **150 minutes** for two tasks: a personal response worth 40% of the marks and a critical essay worth 60%.',
    good: 'About 10 minutes reading, 50 minutes on the personal response, 80 minutes on the critical essay and 10 minutes checking both',
    wrong: [
      'Exactly 75 minutes on each task, starting to write at once, with no time set aside for reading or for checking at the end',
      'About 100 minutes on the personal response, since it comes first, and whatever time is left over at the end for the critical essay',
      'About 60 minutes reading and planning both tasks, then 90 minutes to write both essays, and no time at all to check your work',
    ],
  },
  {
    setup: 'Your final examination has **180 minutes** for two tasks: a personal response worth 30% of the marks and a critical essay worth 70%.',
    good: 'About 15 minutes reading, 45 minutes on the personal response, 105 minutes on the critical essay and 15 minutes checking both',
    wrong: [
      'Exactly 90 minutes on each task, starting to write at once, with no time set aside for reading or for checking at the end',
      'About 120 minutes on the personal response, since it comes first, and whatever time is left over at the end for the critical essay',
      'About 70 minutes reading and planning both tasks, then 110 minutes to write both essays, and no time at all to check your work',
    ],
  },
  {
    setup: 'Your final examination has **120 minutes** for two tasks of equal weight: a personal response and a critical essay.',
    good: 'About 10 minutes reading, 50 minutes on each of the two tasks, and 10 minutes at the end checking both of them carefully',
    wrong: [
      'Exactly 60 minutes on each task, starting to write at once, with no time set aside for reading or for checking at the end',
      'About 85 minutes on the personal response, since it comes first, and whatever time is left over at the end for the critical essay',
      'About 50 minutes reading and planning both tasks, then 70 minutes to write both essays, and no time at all to check your work',
    ],
  },
];

const SITUATIONS: Array<{ ask: string; good: string; wrong: [string, string, string]; why: string }> = [
  {
    ask: 'You are 75 minutes into a 150-minute examination and still writing the personal response. The critical essay, worth more marks, has not been started.',
    good: 'Finish the personal response quickly with a clear ending, and start the critical essay now, since it carries more of the marks.',
    wrong: [
      'Keep polishing the personal response until it is perfect, then write as much of the critical essay as the time left allows.',
      'Leave the personal response half-finished in mid-sentence, and come back to complete it only if there is time at the very end.',
      'Start the critical essay over again from a new plan, since the time already spent on the personal response is now lost anyway.',
    ],
    why: 'Marks follow weight: a complete personal response and a full critical essay earn far more than a polished first task and a rushed second one.',
  },
  {
    ask: 'The critical essay prompt uses a key word, *resilience*, and you are not sure exactly how the examiners mean it.',
    good: 'Work out its meaning from the rest of the prompt, state in your introduction how you understand it, and use that meaning throughout.',
    wrong: [
      'Skip the word and write about the text in general, hoping that the marker will not notice that you have left part of the prompt out.',
      'Choose a different prompt from an earlier examination that you have already practised and know well, and write about that one.',
      'Spend twenty minutes trying to recall the dictionary definition before writing anything, so that you are certain you are right.',
    ],
    why: 'Defining a key term in your own words shows the marker how you are reading the prompt, and keeps the essay focused on it.',
  },
  {
    ask: 'Halfway through the critical essay you realize that your chosen text fits the prompt less well than you thought.',
    good: 'Keep the text, but reframe your controlling idea around the part of it that does fit the prompt, and revise the introduction to match.',
    wrong: [
      'Start a completely new essay on a different text, even though more than half of the time for the task has already gone.',
      'Carry on exactly as planned, and add a sentence at the end admitting that the text does not really fit the prompt very well.',
      'Stop writing the essay and spend the remaining time making a detailed plan of how you would answer it with a better text.',
    ],
    why: 'Adjusting the controlling idea keeps your evidence and time; starting again rarely leaves enough time to finish.',
  },
  {
    ask: 'You have 12 minutes left. Your critical essay has an introduction and two body paragraphs, and you planned a third.',
    good: 'Write a brief version of the third point if it adds something, then a conclusion that answers the prompt, and check quickly.',
    wrong: [
      'Start a long, fully developed third paragraph with all its evidence, and hope to finish it before the time runs out.',
      'Use the time to recopy your introduction more neatly, since the introduction is what the marker reads first of all.',
      'Stop writing and hand in the essay as it stands, without the third point and without any conclusion at all.',
    ],
    why: 'A short final point and a conclusion that answers the prompt make the essay complete; an unfinished paragraph does not.',
  },
  {
    ask: 'You finish both tasks with 20 minutes to spare.',
    good: 'Reread both responses against their prompts, strengthen any weak link between evidence and claim, and correct errors.',
    wrong: [
      'Hand in the examination at once, since both tasks are already finished and rereading them will only make you more nervous.',
      'Add a long new body paragraph to the critical essay on a fresh point that you have only just thought of in the last minute.',
      'Rewrite the whole personal response from the beginning in neater handwriting so that the marker can read every word easily.',
    ],
    why: 'Spare minutes are best spent making sure every paragraph answers the prompt and catching errors that cost marks.',
  },
];

const EXAM_STEPS = [
  'Read the prompt and the instructions, and mark the key terms',
  'Choose the text that best fits the prompt',
  'Jot down moments and quotations from the text that bear on the prompt',
  'Shape a controlling idea from what those moments show',
  'Plan the order of the body paragraphs',
  'Write the essay',
  'Reread against the prompt and correct errors',
];

function examStrategy(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const b = rng.pick(BUDGETS);
    return {
      prompt: `${b.setup} Which plan divides the time most sensibly?`,
      parts: [part(mc(rng, b.good, b.wrong))],
      hints: ['Give each task time in proportion to its marks, and keep a few minutes at the start for reading and at the end for checking.'],
      solution: [`${q(b.good)} matches the time to the marks and leaves room to read and to check.`, 'Of the others, one ignores the weighting and skips reading and checking, one lets the first task swallow the time and one spends so long planning that nothing can be checked.'],
    };
  }
  if (d === 2) {
    const s = rng.pick(SITUATIONS);
    return {
      prompt: `${s.ask} What should you do?`,
      parts: [part(mc(rng, s.good, s.wrong))],
      hints: ['Ask which choice leaves you, at the end of the time, with complete answers that respond to the prompts.'],
      solution: [s.good, s.why],
    };
  }
  return order(
    rng,
    'Put the steps of writing the critical essay in a final examination in a sensible order.',
    EXAM_STEPS,
    ['Understand the prompt before choosing a text; gather evidence before deciding your claim; plan before writing; check last.'],
    EXAM_STEPS.map((x, i) => `${i + 1}. ${x}`),
  );
}

export const CRAFT_SKILLS: SkillDef[] = [
  skill({
    id: 'e12-style-revision',
    name: 'Revising for precision, concision and voice',
    description: 'Turn nominalizations back into verbs, cut stacked hedges without overstating, and keep one precise, consistent academic voice.',
    outcomes: OUTCOMES,
    lessonId: STYLE,
    format: 'mc',
    gen: styleRevision,
  }),
  skill({
    id: 'e12-sentence-craft',
    name: 'Emphasis and rhythm',
    description: 'Put the key idea of a sentence in the stress position at the end, and vary sentence length so that a paragraph builds to its key moment.',
    outcomes: OUTCOMES,
    lessonId: STYLE,
    format: 'mc',
    gen: sentenceCraft,
  }),
  skill({
    id: 'e12-exam-prompt',
    name: 'The examination prompt',
    description: 'Work out what a final-examination prompt asks, choose the text and approach that answer it, and choose a controlling idea that answers it arguably.',
    outcomes: OUTCOMES,
    lessonId: EXAM,
    format: 'mc',
    gen: examPrompt,
  }),
  skill({
    id: 'e12-exam-strategy',
    name: 'Managing the examination',
    description: 'Divide the time of a two-task examination by its marks, decide what to do when plans go wrong, and order the steps of the critical essay.',
    outcomes: OUTCOMES,
    lessonId: EXAM,
    format: 'mc',
    gen: examStrategy,
  }),
];
