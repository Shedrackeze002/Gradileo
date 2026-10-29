/**
 * Grade 11 English, lesson 1.1: Structure and Pacing (11-A1). Chronological, non-linear, frame,
 * circular and parallel structures and their effects; scene and summary, and how a writer slows a
 * moment down or speeds time up. Stories written for Gradileo and public-domain stories
 * (./stories.ts).
 */
import { fixedChoice, mc, part, skill } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { block, fill, pair } from '../../eng10/gen/common.ts';
import {
  ARABY, ARABY_FOLLIES, ARABY_UNCLE, BRIDE, BRILL, BRILL_ENDING, BRILL_GIRL, BROWN, BROWN_CHANGE, BROWN_GRAVE, DESIREE, FROG, PARTY, PARTY_HAT, quoteBlock, titled,
  type Excerpt, type Story,
} from './stories.ts';

const L = 'e11-1-1';
const OUT = ['11-A1'];

// ============================================================================ structure

type Struct = 'chronological' | 'nonlinear' | 'frame' | 'circular' | 'parallel';
const STRUCT_LABEL: Record<Struct, string> = {
  chronological: 'Chronological: the events are told in the order they happen',
  nonlinear: 'Non-linear: the story jumps back and forth in time',
  frame: 'Frame narrative: a story is told inside another story',
  circular: 'Circular: the ending returns to the opening scene or image',
  parallel: 'Parallel: two storylines happening at the same time are told in turn',
};
const STRUCT_NAME: Record<Struct, string> = {
  chronological: 'chronological',
  nonlinear: 'non-linear',
  frame: 'a frame narrative',
  circular: 'circular',
  parallel: 'parallel',
};
/**
 * Wrong answers that are clearly wrong for each structure. A frame narrative returns to its frame
 * and tells past events, so circular and non-linear are never set against it; a circular or parallel
 * story may also be told in order, so chronological is never set against those.
 */
const FAR: Record<Struct, Struct[]> = {
  chronological: ['nonlinear', 'frame', 'parallel'],
  nonlinear: ['chronological', 'frame'],
  frame: ['chronological', 'parallel'],
  circular: ['frame', 'parallel'],
  parallel: ['frame', 'circular'],
};

const SCENARIOS: Record<Struct, string[]> = {
  chronological: [
    'The story follows NAME through one school year, from {his} nervous first morning in September to the final exam in June, telling each event in the order it happens.',
    'NAME sets out at dawn to climb the mountain. The story follows {him} hour by hour, through the forest, across the scree and up the icy ridge, and ends as {he} reaches the summit at sunset.',
    'Over a single day, NAME loses {his} job in the morning, argues with {his} sister at lunch and, that night, decides to open the bakery {he} has always dreamed of. The events come in the order they happen.',
    'The story begins on the day NAME arrives in a new city and moves forward week by week as {he} finds a room, a job and, at last, a friend.',
    'NAME’s football team begins the season with three losses. The story follows them game by game, in order, to the final, which they win.',
  ],
  nonlinear: [
    'The story opens at NAME’s trial. It then jumps back to the night of the robbery, forward to the trial again, and back once more to the friendship that began it all, before the jury gives its verdict.',
    'The story begins with NAME, now a famous violinist, walking onto a concert stage. A long flashback then shows the years of lessons {he} nearly gave up, and the story ends the next morning as {he} reads the reviews.',
    'Each section of the story is set in a different year, in the order 2019, 2004, 2023, 1998, as the reader slowly pieces together why NAME and {his} brother stopped speaking.',
    'NAME is on a plane, about to land in the country {he} left as a child. As {he} looks down, the story keeps cutting back to scenes from {his} childhood there, then ends as {he} walks out into the arrivals hall.',
  ],
  frame: [
    'On a stormy night in a mountain hut, an old guide tells the other travellers about NAME, a climber who vanished on the same peak forty years before. Most of the story is the guide’s tale; on the last page we return to the hut as the storm dies down.',
    'A woman finds her grandmother’s diary in the attic. The story then becomes the diary itself, which tells how NAME crossed the ocean in 1920, and ends with the woman closing the diary.',
    'At a family wedding, NAME’s uncle tells a table of guests how he once got lost in the desert for three days. Almost all the story is his tale; it begins and ends with the guests at the table.',
    'A sailor in a harbour tavern tells a young listener about the voyage on which his ship was nearly lost. The listener’s brief questions open and close the sailor’s long account.',
  ],
  circular: [
    'The story begins with NAME standing at a bus stop in the rain, about to leave home. It ends, years later, with {him} at the same bus stop in the rain, coming back.',
    'The first sentence describes an old oak tree outside NAME’s window in spring. In the last sentence, after {his} long illness, NAME looks out at the same oak tree in spring again.',
    'The story opens with NAME burying a letter in the garden as a child. The final scene shows {him}, grown up, digging in the same spot and finding it.',
    'The story starts and ends with the same words, spoken by NAME at {his} kitchen table: “Well, here we are again.” The second time, they mean something quite different.',
  ],
  parallel: [
    'The sections of the story alternate between NAME, racing across the city to reach the hospital, and NAME2, waiting at the hospital and watching the clock. The two storylines meet in the last scene.',
    'One storyline follows a rescue team climbing towards a trapped hiker; the other follows the hiker, alone in a crevasse, rationing {his2} water. The story cuts between them until the team finds {him2}.',
    'The story is told in alternating sections: NAME preparing a surprise party in one town, and NAME2 driving home through a snowstorm in another, unaware of it.',
  ],
};

interface StructPd {
  story: Story;
  summary: string;
  answer: Struct;
  /** Wrong answers that are clearly wrong for this story. */
  wrong: Struct[];
  why: string;
}
const STRUCT_PD: StructPd[] = [
  { story: FROG, answer: 'frame', wrong: ['chronological', 'parallel'], summary: 'A narrator visits old Simon Wheeler at a mining-camp tavern and asks about a man named Smiley. Most of the sketch is Wheeler’s long tale about Jim Smiley and his jumping frog; at the end, the narrator escapes before Wheeler can start another.', why: 'The narrator’s visit is the frame, and Wheeler’s tale about Jim Smiley is the story told inside it.' },
  { story: BRIDE, answer: 'parallel', wrong: ['frame', 'circular'], summary: 'Section I follows the town marshal and his new bride on the train to Yellow Sky; Section II jumps to a saloon in town, where people hide from Scratchy Wilson, who is drunk and shooting; Section III follows Scratchy through the empty streets; in Section IV, the two storylines meet.', why: 'The story alternates between two storylines happening at the same time, the couple on the train and the gunman in town, until they meet.' },
  { story: DESIREE, answer: 'nonlinear', wrong: ['chronological', 'frame'], summary: 'The story opens with Madame Valmondé driving over to visit Désirée and her new baby. It then goes back eighteen years to the day Désirée was found as a toddler by the gate, and to her marriage, before returning to the visit.', why: 'The story leaves the present visit to go back eighteen years, then returns: it moves back and forth in time.' },
  { story: BROWN, answer: 'chronological', wrong: ['frame', 'parallel'], summary: 'Goodman Brown leaves his wife at sunset, walks into the forest, meets a strange traveller, witnesses a dark meeting, and returns to the village the next morning. A final paragraph covers the rest of his life.', why: 'The events are told in the order they happen, from sunset to the next morning and on to his death.' },
  { story: ARABY, answer: 'chronological', wrong: ['frame', 'parallel'], summary: 'A boy falls for his friend’s sister, promises to bring her something from the Araby bazaar, waits all evening for his uncle to give him the money, and arrives at the bazaar just as it is closing.', why: 'The events are told in the order they happen, from the boy’s first infatuation to his night at the bazaar.' },
  { story: PARTY, answer: 'chronological', wrong: ['frame', 'parallel'], summary: 'On the morning of her family’s garden party, Laura hears that a poor neighbour has been killed. The party goes ahead that afternoon, and in the evening Laura carries a basket of leftovers to the dead man’s house.', why: 'The story follows one day, morning to evening, in the order things happen.' },
];

interface StructEffect {
  lead: string;
  answer: string;
  wrong: string[];
  why: string;
}
const STRUCT_EFFECTS: StructEffect[] = [
  {
    lead: `In ${titled(FROG)} by Mark Twain, a well-spoken narrator introduces old Simon Wheeler, who then tells his rambling tale without ever smiling. What is the main effect of this frame?`,
    answer: 'The gap between the polished narrator and Wheeler’s deadpan rambling makes it funny.',
    wrong: ['It lets the reader follow events happening in two different places at the same time.', 'It hides how the frog contest ends, so the story finishes on a cliffhanger.', 'It reveals the narrator’s private thoughts while keeping Wheeler’s secret hidden.'],
    why: 'The frame puts two very different voices side by side: the narrator’s careful, educated prose and Wheeler’s earnest yarn. The comedy comes from the gap between them.',
  },
  {
    lead: `In ${titled(BRIDE)} by Stephen Crane, the story cuts between the town marshal travelling home with his new bride and a drunken gunman roaming the town’s streets. What is the main effect of this structure?`,
    answer: 'The reader knows a clash is coming before the characters do, which builds suspense.',
    wrong: ['It reveals the ending first, then goes back to explain how the clash came about.', 'It lets an older narrator look back on the day in Yellow Sky with regret.', 'It shows the same event twice, once from each of two characters’ memories.'],
    why: 'Each cut back to the gunman reminds the reader of the danger waiting for the unarmed marshal, so tension grows as the train gets closer.',
  },
  {
    lead: `${titled(DESIREE)} by Kate Chopin opens with a visit to Désirée and her baby, then goes back eighteen years to tell how Désirée was found as a toddler, with no one knowing who her parents were. What is the main effect of this flashback?`,
    answer: 'It plants the mystery of Désirée’s unknown parents, on which the ending depends.',
    wrong: ['It lets the reader hear Désirée tell her own story, in her own words, years later.', 'It cuts between two storylines happening at the same time in different houses.', 'It tells the reader how the story ends before the main events begin.'],
    why: 'The reader learns early that Désirée’s parents are unknown, so when her husband blames her for their child’s appearance, everyone, including the reader, assumes the answer lies in her past. The ending turns that assumption upside down.',
  },
  {
    lead: 'A story begins with NAME, aged twelve, leaving {his} village on a crowded bus. It ends, forty years later, with {him} stepping off a bus in the same village square. What is the main effect of this circular structure?',
    answer: 'Ending where it began invites the reader to see how much NAME and the village have changed.',
    wrong: ['It builds suspense by cutting between the village and the city at the same moment.', 'It hides who is telling the story until NAME steps off the bus on the last page.', 'It makes the story move faster by skipping the forty years in the middle entirely.'],
    why: 'When a story ends where it began, the repeated scene works like a mirror: the reader compares the two moments and sees the change between them.',
  },
  {
    lead: 'A novel about a shipwreck opens with the survivors already on the beach, then jumps back to the voyage and the storm. What is the main effect of beginning near the end?',
    answer: 'Knowing that some survive, the reader wonders how they did, and who did not.',
    wrong: ['The reader cannot tell whether anyone survives until the last page.', 'Two storylines happening at the same time are told in turn, chapter by chapter.', 'A second narrator tells the whole story to listeners gathered around a fire.'],
    why: 'Starting near the end gives away part of the outcome, so the reader’s curiosity moves from what happens to how and why it happens.',
  },
];

interface StructChange {
  story: string;
  answer: string;
  wrong: string[];
  why: string;
}
const STRUCT_CHANGES: StructChange[] = [
  { story: 'A chronological story follows NAME through one summer working on {his} grandfather’s fishing boat.', answer: 'Begin and end with an older NAME telling the story to {his} grandchildren.', wrong: ['Tell the summer’s events in the order they happened, but in more detail.', 'Cut out the first week of the summer and start on the day of the first storm.', 'Add a second character, a cousin, who works on the boat beside NAME all summer.'], why: 'The older NAME and the grandchildren become the frame, and the summer on the boat becomes the story told inside it.' },
  { story: 'A chronological story tells how NAME and NAME2 planned and ran a charity concert, from the first idea to the final song.', answer: 'Open and close with NAME telling the story to a reporter years later.', wrong: ['Add more songs to the concert and describe each performer in detail.', 'Tell the planning in the order it happened, day by day, up to the concert.', 'Remove NAME2 from the story so that NAME plans the concert alone.'], why: 'The interview becomes the frame, and the planning of the concert becomes the story told inside it.' },
  { story: 'A chronological story follows NAME’s first week as a volunteer firefighter in a dry, windy summer.', answer: 'Open and close with NAME, now the fire chief, telling new recruits about that week.', wrong: ['Add a second, bigger fire later in the week, on the hottest day of the summer.', 'Tell the week in the order it happened, hour by hour, from the first alarm.', 'End the story a day earlier, before the last and most dangerous call-out.'], why: 'The fire chief’s talk to the recruits becomes the frame, and the first week becomes the story told inside it.' },
];

function structQ(rng: Rng, d: Difficulty) {
  if (d === 3) {
    if (rng.chance(0.25)) {
      const cast = pair(rng);
      const c = rng.pick(STRUCT_CHANGES);
      return {
        prompt: `${fill(c.story, cast)}\n\nWhich change would turn it into a **frame narrative**?`,
        parts: [part(mc(rng, fill(c.answer, cast), c.wrong.map((w) => fill(w, cast))))],
        hints: ['A frame narrative puts the main story inside another story: someone tells it, and the telling surrounds it.'],
        solution: [fill(c.why, cast), 'The other changes alter the content or the detail but leave the story without a frame.'],
      };
    }
    const cast = pair(rng);
    const e = rng.pick(STRUCT_EFFECTS);
    return {
      prompt: fill(e.lead, cast),
      parts: [part(mc(rng, fill(e.answer, cast), e.wrong.map((w) => fill(w, cast))))],
      hints: ['First name the structure. Then ask what it lets the writer do: create suspense, contrast two voices, plant a mystery, or invite a comparison.'],
      solution: [fill(e.answer, cast), fill(e.why, cast)],
    };
  }
  if (d === 2) {
    const s = rng.pick(STRUCT_PD);
    return {
      prompt: `${titled(s.story)} by ${s.story.author}:\n\n${block(s.summary)}\n\nWhich best describes the story’s **structure**?`,
      parts: [part(mc(rng, STRUCT_LABEL[s.answer], s.wrong.map((w) => STRUCT_LABEL[w])))],
      hints: ['Ask two questions: are the events told in the order they happen, and is there a story inside another story or more than one storyline?'],
      solution: [`The structure is ${STRUCT_NAME[s.answer]}.`, s.why],
    };
  }
  const type = rng.pick(Object.keys(SCENARIOS) as Struct[]);
  const cast = pair(rng);
  const wrong = rng.sample(FAR[type], 2);
  return {
    prompt: `${block(fill(rng.pick(SCENARIOS[type]), cast))}\n\nWhich best describes the story’s **structure**?`,
    parts: [part(mc(rng, STRUCT_LABEL[type], wrong.map((w) => STRUCT_LABEL[w])))],
    hints: ['Follow the time order: does the story move straight forward, jump back, return to where it began, frame one story inside another, or switch between two storylines?'],
    solution: [`The structure is ${STRUCT_NAME[type]}.`, `${STRUCT_LABEL[type].split(': ')[1].replace(/^./, (c) => c.toUpperCase())}.`],
  };
}

// ============================================================================ pacing

interface PacePassage {
  text: string;
  kind: 'scene' | 'summary';
  why: string;
}
const PACE_PASSAGES: PacePassage[] = [
  { kind: 'summary', text: 'Over the next three winters NAME learned the trade, married, and opened a small workshop of {his} own.', why: 'One sentence covers three years and several major events, without detail or dialogue.' },
  { kind: 'summary', text: 'The years at boarding school passed slowly. NAME made two friends, lost one, and grew used to the cold dormitory and the bells.', why: 'Years of school are compressed into two sentences that list events rather than show them.' },
  { kind: 'summary', text: 'For the rest of that spring, NAME visited the hospital every evening after work, and by May {his} father could walk to the window on his own.', why: 'Weeks of visits are reported in a single sentence.' },
  { kind: 'summary', text: 'The campaign took most of the year: meetings, posters, letters to the council, and finally a vote in December that NAME’s side won.', why: 'A whole year of events is listed in one sentence instead of being shown moment by moment.' },
  { kind: 'scene', text: 'NAME set the cup down. “You knew,” {he} said. Across the table, NAME2 didn’t answer; {he2} turned {his2} ring, once, twice, and looked at the window.', why: 'The passage shows a few seconds in detail, with dialogue, small gestures and silence.' },
  { kind: 'scene', text: '“Ten seconds,” the coach shouted. NAME caught the pass, felt the defender’s breath on {his} neck, and turned. The crowd went quiet.', why: 'Seconds are shown as they happen, with dialogue and physical detail.' },
  { kind: 'scene', text: 'The door creaked. NAME froze on the stairs, one hand on the rail. Somewhere below, a floorboard answered. “Who’s there?” {he} whispered.', why: 'A single moment is played out action by action, with sound and speech.' },
  { kind: 'scene', text: '“I’m not going,” said NAME. {His} mother put down the iron. “Say that again,” she said quietly, and the kitchen clock seemed suddenly loud.', why: 'The passage shows a short exchange in real time, with dialogue and detail.' },
];
interface PacePd {
  lead: string;
  excerpt: Excerpt;
  kind: 'scene' | 'summary';
  why: string;
}
const PACE_PD: PacePd[] = [
  { lead: `The end of ${titled(BROWN)}:`, excerpt: BROWN_GRAVE, kind: 'summary', why: 'One sentence carries Goodman Brown through the rest of his life to his funeral.' },
  { lead: `From ${titled(BROWN)}, the morning after the forest:`, excerpt: BROWN_CHANGE, kind: 'summary', why: 'One sentence sums up the kind of man Brown became over all the years that followed.' },
  { lead: `From ${titled(ARABY)}, after the girl mentions the bazaar:`, excerpt: ARABY_FOLLIES, kind: 'summary', why: 'The narrator sums up the days of waiting in two sentences rather than showing them one by one.' },
  { lead: `From ${titled(BRILL)}, on her bench in the park:`, excerpt: BRILL_GIRL, kind: 'scene', why: 'The girl’s words are given exactly as they are spoken, in the moment.' },
  { lead: `From ${titled(PARTY)}, as Laura leaves the dead man’s room:`, excerpt: PARTY_HAT, kind: 'scene', why: 'Laura’s exact words are given at the moment she says them.' },
  { lead: `From ${titled(ARABY)}, on the night of the bazaar:`, excerpt: ARABY_UNCLE, kind: 'scene', why: 'The narrator gives each sound in the order he hears it, as it happens: the latchkey, the talking, the hallstand rocking.' },
  { lead: `From the end of ${titled(BRILL)}:`, excerpt: BRILL_ENDING, kind: 'scene', why: 'Each small action is shown as it happens: unclasping the fur, laying it in the box, putting on the lid.' },
];

/** Moments slowed down in detail, each with the technique that slows them. */
const SLOW: Array<{ text: string; why: string }> = [
  { text: 'NAME lifted the envelope. {He} slid one finger under the flap, felt the paper tear, and stopped. Through the window, a dog barked twice. {He} took a breath, and pulled out the letter.', why: 'opening a letter, something that takes two seconds, is stretched out action by action, with a pause for a sound outside' },
  { text: 'The ball left NAME’s foot. It rose, spinning, over the wall of players. {He} watched it hang against the grey sky; {he} heard nothing, not the crowd, not {his} own breathing. The keeper leapt.', why: 'a kick that lasts a second is broken into small moments, with what NAME sees, hears and does not hear' },
  { text: 'The ice cracked. NAME felt it before {he} heard it: a shiver under {his} boots, then a sound like a whip, then water, black and cold, climbing to {his} knees.', why: 'one sudden moment is slowed into a sequence of sensations, one after another' },
];

function paceQ(rng: Rng, d: Difficulty) {
  const cast = pair(rng);
  if (d === 3) {
    if (rng.chance(0.5)) {
      return {
        prompt: `${titled(BROWN)} spends almost all its pages on a single night in the forest. Then its last paragraph covers the rest of Goodman Brown’s life:\n\n${quoteBlock(BROWN_GRAVE)}\n\nWhat is the main effect of this contrast in pacing?`,
        parts: [part(mc(rng, 'It shows that one night shaped, and darkened, all the decades that followed.', ['It suggests that the rest of Brown’s life was happy and full of events.', 'It builds suspense about whether Brown will survive the night.', 'It shows that Hawthorne ran out of space to tell the story fully.']))],
        hints: ['Compare how much time each part covers with how many pages it gets. What does the writer think matters most?'],
        solution: ['The single night is shown in scene, page after page; decades pass in one summarizing sentence.', 'So the pacing tells us that the night in the forest defined the rest of Brown’s life: everything afterwards is just its gloomy consequence.'],
      };
    }
    const s = rng.pick(SLOW);
    return {
      prompt: `${block(fill(s.text, cast))}\n\nThis moment is the turning point of the story. Why does the writer slow it down?`,
      parts: [part(mc(rng, 'To build suspense, so the reader lives the key moment as it happens.', ['To cover a long stretch of time quickly and move on to the ending.', 'To fill in background information about NAME’s childhood and family.', 'To show that the moment is unimportant and can be passed over.'].map((w) => fill(w, cast))))],
      hints: ['Writers spend the most words on the moments that matter most. What happens to the reader’s attention when a second is stretched across several sentences?'],
      solution: [`Here ${fill(s.why, cast)}.`, 'Slowing the turning point down holds the reader inside the moment and builds suspense about what happens next.'],
    };
  }
  if (d === 2) {
    if (rng.chance(0.5)) {
      const s = rng.pick(SLOW);
      return {
        prompt: `${block(fill(s.text, cast))}\n\nHow does the writer **slow down** this moment?`,
        parts: [part(mc(rng, 'By breaking a few seconds into small actions and sounds', ['By jumping ahead to what happens weeks after this moment', 'By summarizing many events in a single quick sentence', 'By going back in time to a memory from years before']))],
        hints: ['Slowing down means spending many words on a short stretch of time. Look at how much happens in each sentence.'],
        solution: [`In this passage ${fill(s.why, cast)}.`, 'Breaking a moment into small details is the main way a writer slows time down.'],
      };
    }
    const p = rng.pick(PACE_PD);
    return {
      prompt: `${p.lead}\n\n${quoteBlock(p.excerpt)}\n\nIs this passage **scene** or **summary**?`,
      parts: [part(fixedChoice(['Scene: it shows events moment by moment', 'Summary: it covers a stretch of time quickly'], p.kind === 'scene' ? 0 : 1))],
      hints: ['Compare the time the events take with the words used to tell them. A scene shows events as they happen; a summary covers a long time in a few words.'],
      solution: [`It is ${p.kind}.`, p.why],
    };
  }
  const p = rng.pick(PACE_PASSAGES);
  return {
    prompt: `${block(fill(p.text, cast))}\n\nIs this passage **scene** or **summary**?`,
    parts: [part(fixedChoice(['Scene: it shows events moment by moment', 'Summary: it covers a stretch of time quickly'], p.kind === 'scene' ? 0 : 1))],
    hints: ['A scene shows events as they happen, often with dialogue and detail. A summary covers a long stretch of time in a few words.'],
    solution: [`It is ${p.kind}.`, fill(p.why, cast)],
  };
}

export const STRUCTURE_SKILLS: SkillDef[] = [
  skill({
    id: 'e11-structure',
    name: 'Narrative structure',
    description: 'Recognize chronological, non-linear, frame, circular and parallel structures and explain the effect of a story’s structure.',
    outcomes: OUT,
    lessonId: L,
    format: 'mc',
    gen: structQ,
  }),
  skill({
    id: 'e11-pacing',
    name: 'Pacing: scene and summary',
    description: 'Tell scene from summary, recognize how a writer slows a moment down, and explain why a moment is slowed.',
    outcomes: OUT,
    lessonId: L,
    format: 'mc',
    gen: paceQ,
  }),
];
