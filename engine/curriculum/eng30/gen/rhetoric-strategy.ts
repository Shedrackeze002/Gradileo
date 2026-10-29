/**
 * Grade 12 English, lessons 4.1 and 4.2: Rhetorical Strategy; Modelling Arguments (12-D1). The overall
 * strategy of a speech or essay and how a part serves it, the effect of a choice on a particular
 * audience on a particular occasion (kairos), and Toulmin's model of an argument: claim, data,
 * warrant, backing, qualifier and rebuttal. Quoted passages come from public-domain speeches and essays
 * (./speeches.ts); every other speech, argument, person and place is invented for Gradileo.
 */
import { fixedChoice, mc, part, skill } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { block } from '../../eng10/gen/common.ts';
import {
  BW_FINGERS, BW_GRIEVANCES, BW_SHIP, LI_BIBLE, LI_JUDGE, LI_MALICE, MI_COLLISION, PA_TIMES, PA_TYRANNY, ST_ALONE, ST_TWENTY, WE_PRESS,
  leadIn, workBlock,
} from './speeches.ts';

const lc = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

// ============================================================================ lesson 4.1: strategy

type Strategy = 'concession' | 'problem' | 'values' | 'story' | 'refute' | 'dilemma';
const STRATEGIES: Strategy[] = ['concession', 'problem', 'values', 'story', 'refute', 'dilemma'];
const STRATEGY_NAME: Record<Strategy, string> = {
  concession: 'Concession and turn: grant a point to the other side, then turn it to support the claim',
  problem: 'Problem and solution: show what is wrong, then propose a fix and explain why it would work',
  values: 'Shared values and demand: name values the audience holds, then ask for action that honours them',
  story: 'Story and lesson: tell an anecdote or parable first, then draw out the lesson that it teaches',
  refute: 'Point-by-point refutation: state each objection to the claim in turn and answer it with evidence',
  dilemma: 'Dilemma: show that every possible case, considered one at a time, leads to the same conclusion',
};
const STRATEGY_SHORT: Record<Strategy, string> = {
  concession: 'concession and turn',
  problem: 'problem and solution',
  values: 'shared values and demand',
  story: 'story and lesson',
  refute: 'point-by-point refutation',
  dilemma: 'a dilemma',
};
/** Strategies that easily overlap, so they are never offered against each other. */
const STRATEGY_CLASH: Partial<Record<Strategy, Strategy[]>> = {
  concession: ['refute'],
  refute: ['concession'],
};
const OUTLINES: Record<Strategy, string[]> = {
  concession: [
    'A speech against closing the town pool begins by agreeing that the pool costs a great deal to run and has lost money for three years. It then argues that this cost is exactly why the town should keep it: every closed pool means children who never learn to swim, and drownings cost far more.',
    'An essay about school uniforms opens by admitting that uniforms limit how students express themselves. It then turns this around: because clothes no longer mark who is rich and who is not, students are judged more by what they say and do.',
    'A council member agrees that the new bus lanes have slowed car traffic on Main Street. She then argues that this is the point: slower car traffic is what has made the buses faster and the street safer to cross.',
  ],
  problem: [
    'A speech to the school board first describes how thirty students a day miss breakfast and struggle to concentrate before lunch. It then proposes a free breakfast club run by volunteers, and explains what it would cost and why it would work.',
    'An essay begins by showing that the town’s river floods two streets almost every spring. It then sets out a plan to plant wetlands upstream, with the costs and the results from a town that tried it.',
    'A letter to the newspaper describes the long queues at the only clinic in the district, then proposes opening it on Saturdays, staffed by retired nurses, and explains how the plan would be paid for.',
  ],
  values: [
    'A speech to parents begins: “Every family here wants children who are honest, curious and kind.” Only after the audience has agreed does the speaker ask them to support a new program that teaches exactly those things.',
    'An essay opens by reminding readers that the town has always been proud of welcoming strangers and helping neighbours. It then asks readers to support a shelter for families who have lost their homes, as a way of living up to that pride.',
    'A coach tells the team that they all believe in fair play and in giving every player a chance. She then asks them to agree to share playing time equally for the rest of the season.',
  ],
  story: [
    'A speech about road safety begins with the story of a boy who stepped off the pavement while looking at his phone and was hit by a cyclist. The speaker then draws the lesson that every one of us should look up before we cross.',
    'An essay opens with a fable about a farmer who would not mend his fence because the wolf had not yet come. Only at the end does the writer apply the fable to the town’s refusal to repair its sea wall.',
    'A graduation speaker tells how her grandmother learned to read at sixty-five, then tells the graduates that it is never too late to begin what they have put off.',
  ],
  refute: [
    'An essay supporting a later school start lists the three main objections in turn (buses, sports practice and parents’ work hours) and answers each one with evidence from schools that have already changed.',
    'A speech for a new park sets out every argument the opponents have made, one by one: the cost, the noise, the parking. It answers each with figures from the council’s own reports.',
    'A letter defending a ban on single-use cups quotes four complaints from local cafés and answers each in turn, citing how cafés in a nearby city adapted.',
  ],
  dilemma: [
    'An essay argues that the town should keep its library open whether the new budget rises or falls: if it rises, the town can afford the library; if it falls, more families will need the free books and computers.',
    'A speaker argues that testing the water supply is worth it either way: if the water is safe, the town can prove it; if it is not, the town has found the danger in time.',
    'A writer argues that the class should hold the debate whatever the vote shows: if most agree, the debate will test their reasons; if most disagree, it will give the minority a hearing.',
  ],
};

interface StrategyPart {
  text: string;
  question: string;
  right: string;
  wrong: [string, string, string];
  why: string;
}
const PARTS: StrategyPart[] = [
  {
    text: 'A speech asking the school board for a later start time begins: “Every one of us in this room wants students who are healthy, alert and ready to learn.”',
    question: 'How does this opening serve the speech’s strategy?',
    right: 'It wins agreement on a value the board already holds before asking it to act on that value',
    wrong: ['It admits that the board has already done everything it possibly can to help tired students', 'It proves with research that a later start would raise marks in every class across the school', 'It changes the subject from the start time to the health of the teachers who work at the school'],
    why: 'A shared-values strategy first secures agreement on something the audience already believes, so that the request which follows looks like that belief in action.',
  },
  {
    text: 'An essay against a new motorway through the valley spends its first paragraph agreeing that the old road is dangerous and too narrow for today’s traffic.',
    question: 'How does this first paragraph serve the essay’s strategy?',
    right: 'It grants the other side’s strongest point, so the writer can then turn it into a case for a safer, cheaper fix',
    wrong: ['It shows that the writer has changed her mind and now supports building the new motorway after all', 'It gives evidence from traffic reports that the old road is in fact perfectly safe for heavy lorries', 'It tells the story of a crash on the old road so the reader feels sad before the main argument'],
    why: 'In a concession-and-turn strategy, the writer gives ground on purpose: admitting the old road’s danger shows fairness, and sets up the turn to a better solution.',
  },
  {
    text: 'A speech for a community garden opens with a story about an elderly neighbour who grew tomatoes on her balcony to share with the whole street.',
    question: 'How does this story serve the speech’s strategy?',
    right: 'It gives the audience a concrete picture of the sharing that the garden would make possible for everyone',
    wrong: ['It proves that balcony gardens produce more food than any community garden ever could', 'It answers the first objection that opponents have raised about the cost of the garden', 'It changes the topic from the garden to the problems that older people face living alone'],
    why: 'A story-and-lesson strategy begins with something listeners can picture; the lesson that follows (gardens bring neighbours together) feels earned rather than asserted.',
  },
  {
    text: 'Halfway through an essay supporting free bus passes for students, the writer quotes a councillor: “The city simply cannot afford it.” The next paragraph sets out the cost and the savings from fewer school car journeys.',
    question: 'How does this part serve the essay’s strategy?',
    right: 'It states an objection fairly and then answers it with figures, one step in a point-by-point refutation',
    wrong: ['It shows that the writer now agrees the passes are too expensive and should not be offered at all', 'It praises the councillor’s honesty in order to win the trust of readers who support the council', 'It tells a story about a student who missed school because the bus fare had risen too far'],
    why: 'A refutation strategy names each objection and answers it in turn; quoting the objection fairly makes the answer more convincing.',
  },
  {
    text: 'An essay arguing for repairs to the town’s sea wall ends with two short paragraphs. The first says: “If the storms grow worse, the wall will save the harbour.” The second says: “If they do not, the repaired wall will last another century.”',
    question: 'How do these paragraphs serve the essay’s strategy?',
    right: 'They show that the repair is worth doing in either case, so the reader cannot escape the conclusion',
    wrong: ['They admit that the storms may never come, which weakens the case for doing any repairs at all', 'They tell the story of the last great storm so that readers feel afraid of what is coming next', 'They list the objections of the harbour owners and answer each of them in turn with evidence'],
    why: 'A dilemma considers every possibility and shows that each leads to the same conclusion: here, repair the wall.',
  },
  {
    text: 'A letter to the council describes overflowing bins in the park every weekend for a whole summer, and only then proposes a weekend collection paid for by the park’s café.',
    question: 'Why does the writer describe the problem at such length before proposing anything?',
    right: 'So that readers feel the problem is real and serious before the solution is offered to them',
    wrong: ['So that readers stop reading before they reach the cost of the weekend collection', 'So that the writer can avoid making any proposal of their own to the town council', 'So that readers blame the café for the rubbish instead of the people who drop it'],
    why: 'In a problem-and-solution strategy, a solution only matters to readers who believe in the problem, so the problem comes first.',
  },
];

interface PdStrategy {
  intro: string;
  /** A label question (which strategy?) or a question about how a part serves it. */
  label?: Strategy;
  also?: Strategy[];
  question?: string;
  right?: string;
  wrong?: [string, string, string];
  why: string;
}
const PD_STRATEGIES: PdStrategy[] = [
  {
    intro: `${leadIn(LI_BIBLE.work, 'says')}\n\n${workBlock(LI_BIBLE)}\n\nThe speech ends by asking the victorious North to act “with malice toward none, with charity for all”.`,
    question: 'How does this sentence serve the strategy of the whole speech?',
    right: 'By showing both sides as alike in their faith, it prepares the victors to show charity, not vengeance',
    wrong: ['By mocking the South’s religion, it prepares the North to punish the defeated Southern states', 'By listing the great battles of the war, it prepares the nation for a long lesson in its history', 'By praising the Union army’s courage, it prepares the crowd to celebrate a final, glorious victory'],
    why: 'Lincoln stresses what North and South share, so his closing call for charity toward the defeated seems natural rather than weak.',
  },
  {
    intro: `${leadIn(LI_JUDGE.work, 'says')}\n\n${workBlock(LI_JUDGE)}`,
    question: 'How does “let us judge not, that we be not judged” serve the speech’s strategy?',
    right: 'It checks the North’s sense of righteousness, preparing listeners for a peace without revenge',
    wrong: ['It forgives slavery completely, so that the North will stop fighting before the war is won', 'It judges the South harshly, preparing listeners for a demand that its leaders be punished', 'It changes the subject from the war to a sermon on the importance of going to church'],
    why: 'Lincoln names slavery’s wrong plainly (“wringing their bread from the sweat of other men’s faces”) but then warns his own side against self-righteous judgment, which leads to his call for “charity for all”.',
  },
  {
    intro: `${leadIn(LI_MALICE.work, 'ends')}\n\n${workBlock(LI_MALICE)}\n\nEarlier, Lincoln has reminded listeners that both sides “read the same Bible and pray to the same God”.`,
    label: 'values',
    also: ['story', 'concession'],
    why: 'Lincoln first names what the whole nation shares (faith and a hope for peace), then asks for the action that honours it: charity, and binding up “the nation’s wounds”.',
  },
  {
    intro: `${leadIn(BW_SHIP.work, 'begins his central argument')}\n\n${workBlock(BW_SHIP)}\n\nHe then repeats the captain’s words, “Cast down your bucket where you are”, first to Black listeners and then to white ones.`,
    label: 'story',
    also: ['values'],
    why: 'Washington tells a parable (the ship that was in fresh water all along) and then applies its lesson to each part of his audience in turn.',
  },
  {
    intro: `${leadIn(PA_TIMES.work, 'begins')}\n\n${workBlock(PA_TIMES)}\n\nA few lines later he adds:\n\n${workBlock(PA_TYRANNY)}`,
    label: 'concession',
    also: ['refute', 'values'],
    why: 'Paine admits the hardship and that some will desert, then turns it round: the harder the struggle, “the more glorious the triumph”.',
  },
  {
    intro: `${leadIn(MI_COLLISION.work)}\n\n${workBlock(MI_COLLISION)}\n\nMill is arguing that no opinion should be silenced.`,
    label: 'dilemma',
    also: ['refute'],
    why: 'Mill takes both possibilities (the silenced opinion is right, or it is wrong) and shows that silencing it does harm in each case.',
  },
  {
    intro: `${leadIn(ST_TWENTY.work, 'begins')}\n\n${workBlock(ST_TWENTY)}\n\nShe goes on to argue that every human being faces life alone and so must be free to develop fully:\n\n${workBlock(ST_ALONE)}`,
    question: 'How does Stanton’s opening serve the strategy of her address?',
    right: 'It sets aside the familiar legal arguments so that her new argument, from the solitude of every person, stands out',
    wrong: ['It admits that the women’s arguments have failed for twenty years and that she will now stop campaigning', 'It flatters the committee by praising their long memories so that they will vote as she asks', 'It begins a point-by-point refutation of every objection the committee has raised over twenty years'],
    why: 'By declining to repeat arguments the committee knows by heart, Stanton signals that what follows is different: an argument from the human condition itself.',
  },
];

function strategyQ(rng: Rng, d: Difficulty) {
  if (d === 3) {
    const p = rng.pick(PD_STRATEGIES);
    if (p.label) {
      const pool = STRATEGIES.filter((s) => s !== p.label && !(p.also ?? []).includes(s) && !(STRATEGY_CLASH[p.label!] ?? []).includes(s));
      return {
        prompt: `${p.intro}\n\nWhich overall **strategy** does this part of the text show?`,
        parts: [part(mc(rng, STRATEGY_NAME[p.label], rng.shuffle(pool).slice(0, 3).map((s) => STRATEGY_NAME[s])))],
        hints: ['Ask what the text does first and what it does next: concede, describe a problem, name shared values, tell a story, answer objections, or test every case.'],
        solution: [p.why, `So the strategy is ${STRATEGY_SHORT[p.label]}.`],
      };
    }
    return {
      prompt: `${p.intro}\n\n${p.question}`,
      parts: [part(mc(rng, p.right!, p.wrong!))],
      hints: ['Think about where the text is heading. How does this part prepare the audience for the conclusion or the request?'],
      solution: [p.why, `So the best answer is: ${lc(p.right!)}.`],
    };
  }
  if (d === 2) {
    const p = rng.pick(PARTS);
    return {
      prompt: `${p.text}\n\n${p.question}`,
      parts: [part(mc(rng, p.right, p.wrong))],
      hints: ['Name the overall strategy first. Then ask what job this part does in it: winning agreement, giving ground, setting up a turn, picturing the problem, or answering an objection.'],
      solution: [p.why, `So the best answer is: ${lc(p.right)}.`],
    };
  }
  const want = rng.pick(STRATEGIES);
  const text = rng.pick(OUTLINES[want]);
  const pool = STRATEGIES.filter((s) => s !== want && !(STRATEGY_CLASH[want] ?? []).includes(s));
  return {
    prompt: `${block(text)}\n\nWhich overall **strategy** does this text use?`,
    parts: [part(mc(rng, STRATEGY_NAME[want], rng.shuffle(pool).slice(0, 3).map((s) => STRATEGY_NAME[s])))],
    hints: ['Look at the order of the moves: what comes first, and what does it set up?'],
    solution: [`The text uses ${STRATEGY_SHORT[want]}: ${lc(STRATEGY_NAME[want].split(': ')[1])}.`],
  };
}

// ============================================================================ lesson 4.1: effect on an audience

interface Effect {
  text: string;
  question: string;
  right: string;
  wrong: [string, string, string];
  why: string;
}
const EFFECTS: Effect[] = [
  {
    text: 'At a council meeting held eight days after a cyclist was badly hurt on Harbour Road, a student begins: “Eight days ago, my neighbour was carried off Harbour Road on a stretcher.”',
    question: 'What effect does the timing of this opening most likely have on the council?',
    right: 'The recent injury makes the danger vivid, so the council feels it must act now',
    wrong: ['The council feels the issue is old news that no longer needs any decision', 'The council mainly notices that the speaker is too young to address it', 'The council decides the speech is about stretchers, not about the road'],
    why: 'Kairos is the right moment for an appeal. Speaking just after the accident, while it is fresh in everyone’s mind, turns a general worry into an urgent one.',
  },
  {
    text: 'Speaking to customers the day after a data leak, a company’s director says: “Mistakes were made, and some information may have been accessed.”',
    question: 'What effect is this wording most likely to have on angry customers?',
    right: 'It sounds evasive, because it hides who made the mistakes, and so angers them more',
    wrong: ['It reassures them completely, because it names exactly who caused the leak', 'It makes them laugh, because the director has chosen to joke about the leak', 'It confuses them, because the sentence is written in a foreign language'],
    why: 'The passive voice (“mistakes were made”) leaves out who made them. To an angry audience wanting accountability, that sounds like dodging responsibility.',
  },
  {
    text: 'A graduation speaker, facing nervous students and their families, begins by describing the morning she slept through her own final exam.',
    question: 'What effect is this opening most likely to have on this audience?',
    right: 'It relaxes the nervous graduates and shows them that a setback can be survived',
    wrong: ['It frightens the graduates into thinking that they will fail their exams too', 'It proves to the families that the speaker is not qualified to speak to them', 'It makes the audience expect a long and detailed lecture on sleep science'],
    why: 'Self-deprecating humour lowers the tension of a big occasion and builds goodwill; the story also carries a message that suits an audience about to face the unknown.',
  },
  {
    text: 'A scientist giving evidence to a committee of lawmakers, none of them scientists, explains a rise in sea level by saying it would cover the lowest floor of the building they are sitting in.',
    question: 'What effect does this comparison most likely have on this audience?',
    right: 'It turns an abstract figure into something the lawmakers can picture at once',
    wrong: ['It insults the lawmakers by suggesting that their building is badly made', 'It makes the figure seem smaller and less urgent than it really is to them', 'It confuses them, because they cannot see the floor from where they are'],
    why: 'Non-specialists remember a vivid, familiar comparison far better than a number; tying it to the room they are in makes it personal and immediate.',
  },
  {
    text: 'Addressing striking workers outside a factory, a union leader ends each section of her speech with the same three words: “Not one more.”',
    question: 'What effect does the repetition most likely have on this crowd?',
    right: 'It gives the crowd a phrase to remember and chant, binding it together',
    wrong: ['It makes the crowd wonder whether she has lost her place in the speech', 'It persuades the factory owners that the strike has already come to an end', 'It shows the crowd that she has no evidence for any of the points she makes'],
    why: 'Repetition gives a crowd something to hold on to and repeat; spoken aloud at a rally, it builds unity and determination.',
  },
  {
    text: 'Writing to the parents of a small rural school, a principal explains a new reading program in plain words, with one short example of a lesson, and no statistics.',
    question: 'What effect do these choices most likely have on this audience?',
    right: 'Parents can quickly understand the program and imagine their own child using it',
    wrong: ['Parents feel that the principal is hiding the research behind the program', 'Parents assume the program is meant only for the school’s teachers', 'Parents decide the letter is an advert for a company that sells books'],
    why: 'For busy parents, plain language and a concrete example work better than technical data; the principal has fitted the message to the audience.',
  },
];
interface Kairos {
  appeal: string;
  right: string;
  wrong: [string, string, string];
  why: string;
}
const KAIROS: Kairos[] = [
  {
    appeal: 'A charity wants to persuade people to give money for the town’s flood defences.',
    right: 'The week after heavy rain flooded three streets in the town centre',
    wrong: ['In midsummer, when the town has had no rain for several months', 'On a quiet weekend when the local news is full of sports results', 'Ten years after the last serious flood, when it has been forgotten'],
    why: 'Just after a flood, the danger is vivid and the need obvious, so the appeal meets an audience already thinking about it.',
  },
  {
    appeal: 'A student group wants the school to install water fountains with filters for refilling bottles.',
    right: 'In the week the school’s new recycling figures show plastic bottles filling the bins',
    wrong: ['On the first day of the winter holiday, when the school building is closed', 'During the exam fortnight, when everyone is busy revising and has no time', 'Long after the plastic problem has been solved by the cafeteria’s new rules'],
    why: 'When fresh figures show the problem, the audience is already paying attention to it, and the request feels timely rather than random.',
  },
  {
    appeal: 'A local campaign wants the council to put a crossing guard outside the primary school.',
    right: 'At the meeting held just after a car nearly hit two children outside the school',
    wrong: ['At a meeting about the budget for the town’s summer fireworks display', 'In a letter sent during the summer holiday, when the school is closed', 'Two years after the road outside the school was closed to all traffic'],
    why: 'A recent near-miss makes the risk concrete and urgent; the same request at another time would be easy to postpone.',
  },
  {
    appeal: 'A cycling club wants the city to light the path through the river park.',
    right: 'In early autumn, as the evenings darken and commuters begin cycling home at dusk',
    wrong: ['At midsummer, when it is light until late in the evening every single day', 'The week after the path has been closed for good and replaced by a road', 'In a letter about parking fees for the shopping centre on the other side'],
    why: 'As the evenings darken, the need is about to become obvious to everyone who uses the path, so the appeal arrives at its moment.',
  },
];

interface PdEffect {
  intro: string;
  question: string;
  right: string;
  wrong: [string, string, string];
  why: string;
}
const PD_EFFECTS: PdEffect[] = [
  {
    intro: `${leadIn(PA_TIMES.work)}\n\n${workBlock(PA_TIMES)}\n\nThe pamphlet was read aloud to the army’s soldiers, many of whom were thinking of going home.`,
    question: 'What effect was “the summer soldier and the sunshine patriot” most likely meant to have on these soldiers?',
    right: 'To shame those tempted to leave and honour those who stay, so that every soldier wants to stand',
    wrong: ['To persuade the soldiers that the war was over and they could safely go home for the winter', 'To praise the soldiers who had left the army in the summer for their patriotism and their good sense', 'To explain to the soldiers in detail how the army would be paid and fed through the coming winter'],
    why: 'Paine sorts his listeners into fair-weather deserters and those who “stand it now”; no soldier hearing it wants to be the first kind. Read at the army’s lowest moment, it was meant to steady them.',
  },
  {
    intro: `${leadIn(BW_FINGERS.work, 'says')}\n\n${workBlock(BW_FINGERS)}`,
    question: 'What effect did this image most likely have on the white listeners in 1895?',
    right: 'It reassured them that he was not demanding social equality, so they welcomed his call for economic cooperation',
    wrong: ['It angered them, because it demanded that Black and white people share every part of social life at once', 'It confused them, because a speech about the economy should never use an image of the human body', 'It made them laugh, because they took the image of the fingers and the hand as a joke about their manners'],
    why: 'The image accepts separation in social life while asking for unity in economic progress. White listeners welcomed it; many Black critics later called the speech a compromise that accepted segregation.',
  },
  {
    intro: `${leadIn(ST_TWENTY.work, 'begins')}\n\n${workBlock(ST_TWENTY)}`,
    question: 'What effect is this opening likely to have on a committee that has heard the same case for twenty years?',
    right: 'It wins the attention of tired listeners by promising them something other than arguments they know',
    wrong: ['It offends the committee by accusing its members of having forgotten all that they once heard', 'It makes the committee expect a long list of the arguments it has already heard many times', 'It persuades the committee that the women have finally given up their campaign for the vote'],
    why: 'An audience that has heard every argument stops listening. By refusing to repeat them, Stanton signals that something new is coming.',
  },
  {
    intro: `${leadIn(LI_MALICE.work, 'ends')}\n\n${workBlock(LI_MALICE)}`,
    question: 'What effect was this ending most likely meant to have on a Northern audience close to victory?',
    right: 'To restrain the winners’ anger, so that a lasting peace could be built with the defeated South',
    wrong: ['To stir the crowd to demand harsh punishment for the leaders of the defeated Southern states', 'To announce that the war would go on for many more years until every soldier had been replaced', 'To thank the Southern army for its courage and to ask it to keep fighting for its own cause'],
    why: 'Victors are tempted to punish. Lincoln asks his own side for “charity for all” and to “bind up the nation’s wounds”, preparing them for reconciliation.',
  },
  {
    intro: `${leadIn(WE_PRESS.work)}\n\n${workBlock(WE_PRESS)}`,
    question: 'What effect is this sentence most likely to have on Wells’s readers?',
    right: 'It shows them that spreading the facts is itself a way to act, and urges them to support the press',
    wrong: ['It tells readers that nothing can be done until the newspapers decide to change on their own', 'It warns readers never to trust any newspaper, whoever owns it and whatever it reports', 'It suggests that schools, not newspapers, are the only true educators in the country'],
    why: 'By calling the press the greatest “educator”, Wells turns reading and supporting honest newspapers into action that readers can take.',
  },
  {
    intro: `${leadIn(BW_GRIEVANCES.work, 'tells the Black members of his audience')}\n\n${workBlock(BW_GRIEVANCES)}`,
    question: 'How were white listeners in the hall most likely to hear this sentence?',
    right: 'As reassurance that Washington would not press complaints about injustice, which made them receptive',
    wrong: ['As an angry demand that every grievance be put right before any cooperation could begin', 'As a threat that Black workers would strike unless their grievances were answered at once', 'As a confession that Washington himself had never faced any injustice in his own life'],
    why: 'Speaking to two audiences at once, Washington chose words that reassured white listeners; critics later argued that this cost too much, because the grievances were real.',
  },
];

function effectQ(rng: Rng, d: Difficulty) {
  if (d === 3 || (d === 2 && rng.chance(0.4))) {
    const p = rng.pick(PD_EFFECTS);
    return {
      prompt: `${p.intro}\n\n${p.question}`,
      parts: [part(mc(rng, p.right, p.wrong))],
      hints: ['Picture the audience on that day: who they were, what they had just lived through, and what they hoped or feared. Then ask what the words would do to them.'],
      solution: [p.why],
    };
  }
  if (d === 2 || rng.chance(0.3)) {
    const k = rng.pick(KAIROS);
    return {
      prompt: `${k.appeal} When would its appeal have the most force?`,
      parts: [part(mc(rng, k.right, k.wrong))],
      hints: ['Kairos is the right moment: the time when the audience is already thinking about the problem, so the appeal meets them halfway.'],
      solution: [k.why, `So the best moment is: ${lc(k.right)}.`],
    };
  }
  const e = rng.pick(EFFECTS);
  return {
    prompt: `${e.text}\n\n${e.question}`,
    parts: [part(mc(rng, e.right, e.wrong))],
    hints: ['Think about this particular audience on this particular occasion: what do they want, and how would these words strike them?'],
    solution: [e.why],
  };
}

// ============================================================================ lesson 4.2: Toulmin

type Role = 'claim' | 'data' | 'warrant' | 'backing' | 'rebuttal';
const ROLES: Role[] = ['claim', 'data', 'warrant', 'backing', 'rebuttal'];
const ROLE_NAME: Record<Role, string> = {
  claim: 'Claim',
  data: 'Data (grounds)',
  warrant: 'Warrant',
  backing: 'Backing',
  rebuttal: 'Rebuttal',
};
const ROLE_WHAT: Record<Role, string> = {
  claim: 'the claim is the position the argument sets out to prove',
  data: 'the data, or grounds, are the facts and evidence offered in support of the claim',
  warrant: 'the warrant is the general principle that links the data to the claim',
  backing: 'the backing is support for the warrant itself, showing why the principle can be trusted',
  rebuttal: 'the rebuttal names the exceptions or conditions under which the claim would not hold',
};

interface Argument {
  claim: string;
  qualifier: string;
  data: string;
  warrant: string;
  backing: string;
  rebuttal: string;
  /** For “which is the unstated warrant?”: a restated claim and an extra fact, as long as the warrant. */
  restate: string;
  extra: string;
  /** For “which version of the claim is most defensible?”. */
  absolute: string;
  overclaim: string;
  vague: string;
}
const ARGUMENTS: Argument[] = [
  {
    claim: 'The city should almost certainly build a protected bike lane on Harbour Road.',
    qualifier: 'almost certainly',
    data: 'Thirty-one cyclists were injured on Harbour Road in the past two years, more than on any other street in the city.',
    warrant: 'A city should make its most dangerous streets safer for the people who use them.',
    backing: 'When five similar cities added protected lanes to their most dangerous streets, injuries to cyclists fell by more than half.',
    rebuttal: 'The lane would be unnecessary only if a safe route for cyclists were opened on a quieter street nearby.',
    restate: 'Harbour Road urgently needs a protected bike lane, and the city should build one.',
    extra: 'Harbour Road is also the main route to the city’s largest secondary school.',
    absolute: 'The city must build a protected bike lane on every road, with no exceptions.',
    overclaim: 'A bike lane on Harbour Road would end every road accident in the whole city.',
    vague: 'Something might perhaps be done about Harbour Road at some point in time.',
  },
  {
    claim: 'Our school should probably move its start time from 8:00 to 9:00.',
    qualifier: 'probably',
    data: 'Students at schools that start at 9:00 sleep, on average, forty minutes more each night than students at schools that start at 8:00.',
    warrant: 'A school should arrange its day so that students get the sleep they need to learn.',
    backing: 'Medical associations report that teenagers need eight to ten hours of sleep a night to learn well and stay healthy.',
    rebuttal: 'The change would not be wise if most students would lose their after-school jobs because of it.',
    restate: 'A 9:00 start would be better for our school than the current 8:00 start.',
    extra: 'Most of the schools in the neighbouring district already start at 8:30.',
    absolute: 'Every school in the world must start at exactly 9:00, without exception.',
    overclaim: 'A 9:00 start would solve every problem that students at our school face.',
    vague: 'Perhaps the timetable could possibly be looked at in some way one day.',
  },
  {
    claim: 'In most lessons, phones should stay in students’ lockers.',
    qualifier: 'in most lessons',
    data: 'In a term-long trial in six classes, marks on unit tests rose by an average of eight percent when phones were kept in lockers.',
    warrant: 'Anything that keeps students’ attention on the lesson will help them learn.',
    backing: 'Decades of research on learning show that focused attention is one of the strongest predictors of what students remember.',
    rebuttal: 'The rule should not apply when a teacher asks students to use their phones for a lesson activity.',
    restate: 'Students should not have their phones with them in most of their lessons.',
    extra: 'Most students in the trial said they checked their phones less often at home too.',
    absolute: 'Phones must be banned from the school building at all times, for everyone.',
    overclaim: 'Banning phones would double every student’s marks in every subject at once.',
    vague: 'Phones are perhaps something that could be thought about in some lessons.',
  },
  {
    claim: 'The council should very likely turn the empty lot on Mill Street into a community garden.',
    qualifier: 'very likely',
    data: 'The lot on Mill Street, which the council owns, has been unused for nine years and is now covered in rubbish.',
    warrant: 'Land that the public owns should be used in ways that benefit the public.',
    backing: 'The town’s own charter states that council property must be managed “for the good of all residents”.',
    rebuttal: 'This would not apply if the lot were needed soon for the fire station the town has planned.',
    restate: 'A community garden would be a good use of the empty lot on Mill Street.',
    extra: 'Several residents of Mill Street have offered to look after the garden.',
    absolute: 'Every empty lot in the country must become a garden, whatever its owner wants.',
    overclaim: 'A garden on Mill Street would end loneliness in the town for good.',
    vague: 'The lot on Mill Street is a matter that could possibly be considered.',
  },
  {
    claim: 'The city should, in all likelihood, offer free bus passes to secondary students.',
    qualifier: 'in all likelihood',
    data: 'Since bus fares doubled last year, student ridership has fallen by a third, and more parents now drive their children to school.',
    warrant: 'The city should encourage forms of travel that cut traffic and pollution.',
    backing: 'The city’s climate plan, approved by the council, commits it to cutting car journeys by a quarter.',
    rebuttal: 'The plan would fail only if the buses were already too full to carry more passengers.',
    restate: 'Secondary students in the city ought to be able to ride the buses for free.',
    extra: 'Bus drivers report that students are, on the whole, polite and well behaved.',
    absolute: 'All public transport must be free for every person, everywhere, at all times.',
    overclaim: 'Free passes would end all traffic and all pollution in the city within a year.',
    vague: 'Bus passes might perhaps be a topic worth some kind of discussion someday.',
  },
  {
    claim: 'The library should most likely stay open until 8:00 p.m. during exam season.',
    qualifier: 'most likely',
    data: 'Last exam season, the library’s study rooms were full every evening until closing at 6:00 p.m., and dozens of students were turned away.',
    warrant: 'Public services should be available when the people who need them can use them.',
    backing: 'The library’s founding statement says it exists “to serve every learner in the community”.',
    rebuttal: 'This would not hold if the extra hours meant cutting the library’s weekend opening.',
    restate: 'The library ought to keep its doors open later in the evenings at exam time.',
    extra: 'The library’s café is also popular with students in the afternoons.',
    absolute: 'Every library must stay open all night, every night, throughout the year.',
    overclaim: 'Later hours would guarantee that every student passes every exam.',
    vague: 'Library hours are a matter that might perhaps be raised at some stage.',
  },
];

function toulminQ(rng: Rng, d: Difficulty) {
  const a = rng.pick(ARGUMENTS);
  if (d === 3) {
    if (rng.chance(0.5)) {
      return {
        prompt: `An argument rests on this data:\n\n${block(a.data)}\n\nWhich version of the **claim** is the most defensible?`,
        parts: [part(mc(rng, a.claim, [a.absolute, a.overclaim, a.vague]))],
        hints: ['A defensible claim takes a clear position but is limited by a qualifier (“probably”, “in most cases”) so that one exception cannot sink it.'],
        solution: [`${a.claim.replace(/\.$/, '')} is the most defensible: the qualifier “${a.qualifier}” limits it to what the evidence can support.`, 'The others claim too much (an absolute or an exaggerated result) or too little (no clear position at all).'],
      };
    }
    return {
      prompt: `Claim: **${a.claim}**\n\nWarrant: ${a.warrant}\n\nWhich statement is the **backing** for this warrant?`,
      parts: [part(mc(rng, a.backing, [a.data, a.rebuttal, a.extra]))],
      hints: ['Backing supports the warrant, the general principle, not the claim directly. Look for evidence that the principle itself can be trusted.'],
      solution: [`${a.backing} This shows why the warrant (“${a.warrant.replace(/\.$/, '')}”) can be trusted, so it is the backing.`],
    };
  }
  if (d === 2) {
    return {
      prompt: `Claim: **${a.claim}**\n\nData: ${a.data}\n\nThe argument does not state its warrant. Which statement is the **unstated warrant** that links the data to the claim?`,
      parts: [part(mc(rng, a.warrant, [a.restate, a.extra, a.rebuttal]))],
      hints: ['The warrant is the general principle you must accept to get from the data to the claim. Ask: why does this evidence lead to this conclusion?'],
      solution: [`${a.warrant} Anyone who accepts this principle will move from the data to the claim.`, 'The others restate the claim, add another fact, or name an exception.'],
    };
  }
  // Arguments are read in a natural order: the claim or its data first, the warrant and backing after.
  const order = rng.pick<Role[]>([
    ['claim', 'data', 'warrant', 'backing', 'rebuttal'],
    ['data', 'claim', 'warrant', 'backing', 'rebuttal'],
    ['claim', 'data', 'rebuttal', 'warrant', 'backing'],
    ['data', 'warrant', 'backing', 'claim', 'rebuttal'],
  ]);
  const sentences = order.map((r) => a[r]);
  const ask = rng.pick(ROLES);
  const at = order.indexOf(ask) + 1;
  const numbered = sentences.map((s, i) => `**(${i + 1})** ${s}`).join(' ');
  return {
    prompt: `${block(numbered)}\n\nIn Toulmin’s model, what is the role of sentence **(${at})**?`,
    parts: [part(fixedChoice(ROLES.map((r) => ROLE_NAME[r]), ROLES.indexOf(ask)))],
    hints: ['Find the claim first. Then ask which sentence gives evidence, which gives the principle linking evidence to claim, which supports that principle, and which names an exception.'],
    solution: [`Sentence (${at}) is the ${ROLE_NAME[ask].toLowerCase()}: ${ROLE_WHAT[ask]}.`],
  };
}

const L1 = 'e12-4-1';
const L2 = 'e12-4-2';

export const STRATEGY_SKILLS: SkillDef[] = [
  skill({
    id: 'e12-rhetorical-strategy',
    name: 'Rhetorical strategy',
    description: 'Identify the overall strategy of a speech or essay (concession and turn, problem and solution, shared values and demand, story and lesson, refutation, dilemma) and how a part serves it, including in Lincoln, Washington, Stanton, Paine and Mill.',
    outcomes: ['12-D1'],
    lessonId: L1,
    format: 'mc',
    gen: strategyQ,
  }),
  skill({
    id: 'e12-rhetorical-effect',
    name: 'Effect on an audience',
    description: 'Explain the effect of a rhetorical choice on a particular audience on a particular occasion, and choose the moment (kairos) when an appeal has the most force.',
    outcomes: ['12-D1'],
    lessonId: L1,
    format: 'mc',
    gen: effectQ,
  }),
  skill({
    id: 'e12-toulmin',
    name: 'Modelling arguments (Toulmin)',
    description: 'Identify the claim, data, warrant, backing and rebuttal of an argument, supply an unstated warrant, and choose the qualified claim that is most defensible.',
    outcomes: ['12-D1'],
    lessonId: L2,
    format: 'mc',
    gen: toulminQ,
  }),
];

