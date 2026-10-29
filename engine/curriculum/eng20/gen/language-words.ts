/**
 * Grade 11 English, lesson 7.5: Word Roots and Precise Diction (11-G3). Greek and Latin roots,
 * prefixes and suffixes, with words that share a root offered side by side so the prefix decides;
 * and vague words, jargon, euphemism and cliché, each example chosen so that it is clearly one kind.
 */
import { fixedChoice, mc, part, skill, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { block, fill, people } from '../../eng10/gen/common.ts';

const LESSON = 'e11-7-5';
const OUTCOMES = ['11-G3'];

// ---------------------------------------------------------------------------- roots

/** A root, what it means, and words built from it. Roots in the same group mean nearly the same. */
interface Root {
  root: string;
  meaning: string;
  group: string;
  examples: string[];
}
const R = (root: string, meaning: string, examples: string[], group = meaning): Root => ({ root, meaning, group, examples });

const ROOTS: Root[] = [
  R('aud', 'hear', ['audience', 'audible', 'audition']),
  R('bene', 'good, well', ['benefit', 'benevolent', 'beneficial']),
  R('bio', 'life', ['biology', 'biography', 'antibiotic']),
  R('chron', 'time', ['chronic', 'chronological', 'synchronize']),
  R('cred', 'believe', ['credible', 'incredible', 'credit']),
  R('dict', 'say, speak', ['predict', 'contradict', 'dictate'], 'speak'),
  R('voc', 'call, voice', ['vocal', 'advocate', 'vocabulary'], 'speak'),
  R('duc / duct', 'lead', ['conduct', 'introduce', 'aqueduct']),
  R('fract / frag', 'break', ['fracture', 'fragile', 'fragment'], 'break'),
  R('rupt', 'break, burst', ['erupt', 'interrupt', 'rupture'], 'break'),
  R('graph', 'write, draw', ['autograph', 'paragraph', 'biography'], 'write'),
  R('scrib / script', 'write', ['describe', 'manuscript', 'transcript'], 'write'),
  R('ject', 'throw', ['eject', 'reject', 'project']),
  R('mal', 'bad, badly', ['malicious', 'malfunction', 'malnourished']),
  R('manu', 'hand', ['manual', 'manuscript', 'manufacture']),
  R('mort', 'death', ['mortal', 'immortal', 'mortality']),
  R('path', 'feeling, suffering', ['sympathy', 'empathy', 'apathy']),
  R('ped', 'foot', ['pedestrian', 'pedal', 'pedestal']),
  R('phil', 'love', ['philosophy', 'philanthropist', 'bibliophile']),
  R('phon', 'sound', ['telephone', 'symphony', 'microphone']),
  R('photo', 'light', ['photograph', 'photosynthesis', 'telephoto']),
  R('port', 'carry', ['portable', 'transport', 'export'], 'carry'),
  R('spect', 'look', ['inspect', 'spectator', 'perspective'], 'see'),
  R('vid / vis', 'see', ['video', 'visible', 'evident'], 'see'),
  R('struct', 'build', ['construct', 'structure', 'destruction']),
  R('tele', 'far', ['telescope', 'telephone', 'television']),
  R('tract', 'pull, drag', ['tractor', 'attract', 'extract']),
  R('vert / vers', 'turn', ['reverse', 'convert', 'divert']),
  R('geo', 'earth', ['geography', 'geology', 'geothermal'], 'earth'),
  R('terr', 'earth, land', ['terrain', 'territory', 'terrestrial'], 'earth'),
  R('hydr', 'water', ['hydrate', 'dehydrated', 'hydroelectric'], 'water'),
  R('aqua', 'water', ['aquarium', 'aquatic', 'aqueduct'], 'water'),
  R('therm', 'heat', ['thermometer', 'thermal', 'thermostat']),
  R('auto', 'self', ['automatic', 'autograph', 'autobiography']),
  R('micro', 'small', ['microscope', 'microbe', 'microphone']),
  R('pend', 'hang', ['pendant', 'pendulum', 'suspend']),
  R('sequ / secu', 'follow', ['sequel', 'sequence', 'consecutive']),
  R('ven / vent', 'come', ['convene', 'intervene', 'event']),
  R('mit / miss', 'send', ['transmit', 'mission', 'emit']),
  R('cide', 'kill', ['pesticide', 'insecticide', 'herbicide']),
  R('equ / equi', 'equal', ['equal', 'equator', 'equidistant']),
  R('circum', 'around', ['circumference', 'circumnavigate', 'circumstance']),
  R('omni', 'all', ['omnivore', 'omnipresent', 'omnibus']),
  R('poly', 'many', ['polygon', 'polyglot', 'polysyllabic']),
];

/** A word, the root it shares with other words in the bank, and what its parts give. */
interface Word {
  word: string;
  root: string;
  s: string;
  parts: string;
  meaning: string;
  wrong: [string, string, string];
}
const W = (word: string, root: string, s: string, parts: string, meaning: string, wrong: [string, string, string]): Word => ({ word, root, s, parts, meaning, wrong });

const WORDS: Word[] = [
  W('inaudible', 'aud', 'NAME spoke so softly that {his} answer was almost **inaudible**.', 'in- (not) + aud (hear) + -ible (can be)', 'impossible to hear', ['very loud', 'easy to see', 'spoken in another language']),
  W('audition', 'aud', 'NAME has an **audition** for the school musical on Friday.', 'aud (hear) + -ition (the act of)', 'a short performance to show whether someone is right for a part', ['a long rehearsal in which the whole cast practises together', 'the final performance of a show, on its closing night', 'a ticket for a seat in the front row of the theatre']),
  W('benevolent', 'bene', 'A **benevolent** stranger paid for the family’s groceries.', 'bene (good, well) + vol (wish)', 'kind and generous; wishing good to others', ['strict and unfair to people who need help', 'very wealthy, with more money than needed', 'easily angered and quick to blame others']),
  W('beneficial', 'bene', 'Regular sleep is **beneficial** to a student’s memory.', 'bene (good) + fic (make, do) + -ial', 'helpful; having a good effect', ['harmful; having a bad effect', 'expensive and hard to afford', 'unnecessary; making no difference']),
  W('chronic', 'chron', 'NAME’s grandfather has **chronic** back pain.', 'chron (time) + -ic', 'lasting a long time or coming back often', ['sudden and sharp, but over very quickly', 'very mild and hardly noticeable at all', 'easy to cure with a little rest and care']),
  W('synchronize', 'chron', 'The two dancers **synchronize** every step.', 'syn- (together) + chron (time) + -ize (make)', 'make things happen at the same time', ['repeat the same thing several times', 'slow down until they almost stop', 'change direction suddenly and often']),
  W('incredible', 'cred', 'The goalkeeper made an **incredible** save in the last minute.', 'in- (not) + cred (believe) + -ible (can be)', 'hard to believe', ['easy to understand', 'unfair', 'ordinary']),
  W('credible', 'cred', 'The witness gave a **credible** account of the accident.', 'cred (believe) + -ible (can be)', 'believable; able to be trusted', ['impossible to believe or trust', 'very long and full of details', 'funny enough to make people laugh']),
  W('contradict', 'dict', 'The second witness **contradicted** the first.', 'contra- (against) + dict (say)', 'say the opposite of', ['agree with', 'repeat word for word', 'listen to']),
  W('predict', 'dict', 'Scientists **predict** a dry summer this year.', 'pre- (before) + dict (say)', 'say what will happen before it happens', ['remember what happened before now', 'complain loudly about what is coming', 'measure exactly with instruments']),
  W('dictate', 'dict', 'The manager **dictated** a letter while her assistant typed.', 'dict (say) + -ate', 'say words aloud for someone else to write down', ['type something very quickly on a keyboard', 'read a letter silently to oneself', 'sign and seal a letter before posting it']),
  W('advocate', 'voc', 'NAME **advocates** for safer cycling routes in the city.', 'ad- (to, toward) + voc (call, voice)', 'speaks in support of', ['argues against', 'keeps quiet about', 'makes fun of']),
  W('vocal', 'voc', 'The choir began with ten minutes of **vocal** exercises.', 'voc (voice) + -al', 'using the voice', ['using the hands', 'done in silence', 'using the eyes']),
  W('conduct', 'duc / duct', 'NAME will **conduct** the school orchestra at the spring concert.', 'con- (with, together) + duct (lead)', 'lead and direct', ['play the drums in', 'sell tickets for', 'record']),
  W('aqueduct', 'aqua', 'Roman engineers built a stone **aqueduct** across the valley.', 'aqua (water) + duct (lead)', 'a bridge or channel built to carry water', ['a large lake that forms behind a dam', 'an underground cave carved out by water', 'a long, flat boat for carrying goods']),
  W('fragile', 'fract / frag', 'The old vase is very **fragile**.', 'frag (break) + -ile (able to)', 'easily broken', ['very heavy', 'brightly coloured', 'very valuable']),
  W('fracture', 'fract / frag', 'The X-ray showed a small **fracture** in NAME’s wrist.', 'fract (break) + -ure', 'a crack or break, especially in a bone', ['a bruise, especially on the arm or leg', 'a cut in the skin that needs stitches', 'a swollen muscle after too much exercise']),
  W('erupt', 'rupt', 'Scientists warned that the volcano could **erupt** within days.', 'e- (out) + rupt (burst)', 'burst out suddenly', ['cool down slowly', 'sink into the sea', 'grow taller']),
  W('interrupt', 'rupt', 'Please do not **interrupt** while NAME is speaking.', 'inter- (between) + rupt (break)', 'break in while someone is speaking', ['agree politely with what someone says', 'speak very quietly so no one hears', 'take notes while someone is speaking']),
  W('eject', 'ject', 'Press the button to **eject** the memory card.', 'e- (out) + ject (throw)', 'push out', ['pull in', 'repair', 'switch on']),
  W('reject', 'ject', 'The editor **rejected** NAME’s first story.', 're- (back) + ject (throw)', 'refused to accept', ['welcomed', 'corrected', 'copied']),
  W('interject', 'ject', '“That is not fair!” NAME **interjected**.', 'inter- (between) + ject (throw)', 'said suddenly, interrupting others', ['whispered quietly to the person nearby', 'agreed with what the others had said', 'answered slowly after thinking']),
  W('project', 'ject', 'The teacher **projected** the map onto the wall.', 'pro- (forward) + ject (throw)', 'shone an image forward onto a surface', ['drew carefully by hand with a pencil', 'rubbed out with a cloth and some water', 'folded up and put away in a drawer']),
  W('malicious', 'mal', 'Someone spread a **malicious** rumour about the new student.', 'mal (bad) + -icious (full of)', 'meant to do harm', ['careless but harmless', 'cheerful', 'true']),
  W('manuscript', 'manu', 'The museum displayed a **manuscript** from the twelfth century.', 'manu (hand) + script (write)', 'a book or document written by hand', ['a newspaper printed on a machine', 'a map painted on a piece of cloth', 'a statue carved out of stone']),
  W('manual', 'manu', 'Picking tea leaves is **manual** work.', 'manu (hand) + -al', 'done with the hands, not by machine', ['done by machines, not by people', 'well paid and done in an office', 'done at night, when it is cooler']),
  W('immortal', 'mort', 'In the myth, the gods were **immortal**.', 'im- (not) + mort (death) + -al', 'never dying; living forever', ['very old but still growing older', 'very strong and hard to defeat', 'easily hurt and often ill']),
  W('empathy', 'path', 'NAME showed real **empathy** when {his} friend lost the final.', 'em- (in) + path (feeling)', 'the ability to share and understand another person’s feelings', ['a feeling of strong anger at the unfairness of what happened', 'a complete lack of interest in how other people feel', 'great intelligence and the ability to solve problems']),
  W('apathy', 'path', 'Voter **apathy** kept many people at home on election day.', 'a- (without) + path (feeling)', 'a lack of interest or feeling', ['great excitement about an event', 'deep fear of what might happen', 'strong anger at the government']),
  W('sympathy', 'path', 'The whole school sent **sympathy** to the family after the flood.', 'sym- (together, with) + path (feeling)', 'a feeling of sorrow for someone else’s trouble', ['congratulations on a great success or win', 'a demand for payment for the damage done', 'a formal complaint about how help was given']),
  W('pedestrian', 'ped', 'The new crossing makes the road safer for **pedestrians**.', 'ped (foot) + -estrian', 'people walking', ['cyclists', 'bus drivers', 'traffic officers']),
  W('pedal', 'ped', 'NAME pressed the brake **pedal** just in time.', 'ped (foot) + -al', 'a lever pushed by the foot', ['a handle turned by hand', 'a small wheel', 'a warning light']),
  W('philanthropist', 'phil', 'A local **philanthropist** paid for the new library.', 'phil (love) + anthrop (human) + -ist (person who)', 'a person who gives money or time to help others', ['a person who studies insects and their habits', 'a person who dislikes and avoids other people', 'a person who collects rare stamps and coins']),
  W('symphony', 'phon', 'The orchestra played a **symphony** that lasted almost an hour.', 'sym- (together) + phon (sound)', 'a long piece of music for a full orchestra', ['a short poem read aloud with music behind it', 'a song written for one singer and a piano', 'a drum solo in the middle of a rock song']),
  W('photosynthesis', 'photo', 'Leaves need sunlight for **photosynthesis**.', 'photo (light) + synthesis (putting together)', 'the way plants use light to make their food', ['the way animals break down the food they eat', 'the art of taking photographs of plants', 'the way water turns to ice in cold weather']),
  W('portable', 'port', 'NAME took a **portable** stove on the camping trip.', 'port (carry) + -able (can be)', 'easy to carry', ['very powerful', 'waterproof', 'very old']),
  W('transport', 'port', 'Trucks **transport** fresh fruit from the farms to the city.', 'trans- (across) + port (carry)', 'carry from one place to another', ['grow in fields outside the city', 'sell at markets in the city', 'store in cold rooms for months']),
  W('export', 'port', 'The country **exports** coffee to more than fifty nations.', 'ex- (out) + port (carry)', 'sends goods out to sell in other countries', ['buys goods in from other countries to use', 'grows food only for its own people', 'refuses to sell anything to other nations']),
  W('perspective', 'spect', 'The story is told from the dog’s **perspective**.', 'per- (through) + spect (look)', 'point of view; way of seeing things', ['a loud complaint about how things are', 'a careful plan for what happens next', 'a short summary of what happened']),
  W('spectacle', 'spect', 'The fireworks were a **spectacle** that nobody forgot.', 'spect (look) + -acle', 'an impressive sight or show', ['a quiet talk between friends', 'a window broken in the storm', 'a secret meeting at night']),
  W('retrospect', 'spect', 'In **retrospect**, NAME wished {he} had started revising sooner.', 'retro- (back) + spect (look)', 'looking back on the past', ['planning ahead', 'looking closely', 'guessing wildly']),
  W('evident', 'vid / vis', 'It was **evident** that NAME had practised for weeks.', 'e- (out) + vid (see) + -ent', 'clear; easy to see or understand', ['hidden; hard to notice at all', 'doubtful; not likely to be true', 'surprising; not at all expected']),
  W('visible', 'vid / vis', 'On a clear day the mountains are **visible** from the city.', 'vis (see) + -ible (can be)', 'able to be seen', ['able to be heard', 'able to be climbed', 'able to be reached by road']),
  W('destruction', 'struct', 'The storm left a trail of **destruction** along the coast.', 'de- (down, undo) + struct (build) + -ion', 'damage so great that things are ruined', ['new building work all along the coast', 'heavy rain that lasted for several days', 'clean-up work done by volunteers']),
  W('infrastructure', 'struct', 'The city spent the money on **infrastructure**: roads, bridges and water pipes.', 'infra- (below) + struct (build) + -ure', 'the basic systems a place needs to run', ['the tallest and newest buildings in a city', 'the people who run the city government', 'the statues and art in public parks']),
  W('telescope', 'tele', 'NAME looked at the moons of Jupiter through a **telescope**.', 'tele (far) + scope (look at)', 'an instrument for seeing distant things', ['an instrument for seeing tiny things', 'an instrument for measuring heat', 'a machine for sending messages']),
  W('microscope', 'micro', 'Under the **microscope**, the drop of pond water was full of life.', 'micro (small) + scope (look at)', 'an instrument for seeing very small things', ['an instrument for seeing distant things', 'an instrument for measuring sound', 'a machine for recording images']),
  W('attract', 'tract', 'Bright flowers **attract** bees.', 'at- (toward) + tract (pull)', 'draw toward themselves', ['push away', 'hide from', 'harm']),
  W('extract', 'tract', 'The dentist had to **extract** the broken tooth.', 'ex- (out) + tract (pull)', 'pull out', ['push in', 'clean', 'cover']),
  W('distract', 'tract', 'The noise outside **distracted** NAME from {his} homework.', 'dis- (away) + tract (pull)', 'drew attention away from', ['helped to concentrate on', 'reminded again and again about', 'praised warmly and often for']),
  W('divert', 'vert / vers', 'Police **diverted** traffic around the accident.', 'di- (aside) + vert (turn)', 'turned aside onto another route', ['sped up to clear the road faster', 'stopped completely for an hour', 'counted one car at a time']),
  W('introvert', 'vert / vers', 'NAME is an **introvert** who recharges with a book after a busy day.', 'intro- (inward) + vert (turn)', 'a person who turns inward and enjoys time alone', ['a person who loves crowds and noisy parties', 'a person who travels a lot for work or fun', 'a person who often tells lies to others']),
  W('revert', 'vert / vers', 'After the holidays, NAME’s sleep **reverted** to its usual pattern.', 're- (back) + vert (turn)', 'went back to an earlier state', ['moved forward to a new stage', 'improved quickly and steadily', 'stopped completely for good']),
  W('geology', 'geo', 'NAME wants to study **geology** because {he} loves volcanoes.', 'geo (earth) + -logy (study of)', 'the study of rocks and the structure of the earth', ['the study of living things and how they grow', 'the study of weather and how it changes', 'the study of ancient languages and their words']),
  W('terrestrial', 'terr', 'Frogs begin life in water but many become **terrestrial** as adults.', 'terr (earth, land) + -estrial', 'living on land', ['living in water', 'living only in trees', 'coming from outer space']),
  W('subterranean', 'terr', 'The city has a **subterranean** railway.', 'sub- (under) + terr (earth) + -anean', 'underground', ['high above the streets', 'very old', 'very fast']),
  W('dehydrated', 'hydr', 'After the long hike in the heat, NAME was **dehydrated**.', 'de- (remove) + hydr (water) + -ated', 'having lost too much water from the body', ['having eaten far too much food at once', 'sunburned after too long in the sun', 'soaked through by rain or sweat']),
  W('aquatic', 'aqua', 'The lake is home to many **aquatic** plants.', 'aqua (water) + -tic', 'growing or living in water', ['growing in hot, dry deserts', 'growing high up on mountains', 'growing deep underground']),
  W('thermometer', 'therm', 'The nurse used a **thermometer** to check NAME’s temperature.', 'therm (heat) + meter (measure)', 'an instrument that measures temperature', ['an instrument that measures weight', 'an instrument that measures distance', 'an instrument that measures sound']),
  W('autobiography', 'auto', 'The famous runner wrote an **autobiography** about her childhood in a small village.', 'auto (self) + bio (life) + graph (write)', 'the story of a person’s life written by that person', ['the story of a person’s life written by someone else', 'a book of photographs', 'a book about cars']),
  W('biography', 'bio', 'NAME read a **biography** of the explorer, written by a historian.', 'bio (life) + graph (write)', 'the story of a person’s life written by someone else', ['the story of a person’s life written by that person', 'a science book about plants', 'a collection of poems']),
  W('automatic', 'auto', 'The doors are **automatic**: they open as you walk towards them.', 'auto (self) + -matic (acting)', 'working by itself', ['needing a key', 'very old', 'made by hand']),
  W('microbe', 'micro', 'A single **microbe** can multiply into millions overnight.', 'micro (small) + be (from bio, life)', 'a living thing too small to see without a microscope', ['a very large animal that lives deep in the ocean', 'a tiny stone too small to see without a lens', 'a small machine that makes copies of itself']),
  W('suspend', 'pend', 'The lamp was **suspended** from the ceiling by a chain.', 'sus- (under, from below) + pend (hang)', 'hung from above', ['fixed to the floor', 'painted', 'switched on']),
  W('pendulum', 'pend', 'The **pendulum** of the old clock swung slowly from side to side.', 'pend (hang) + -ulum', 'a hanging weight that swings back and forth', ['a spinning wheel that turns the clock hands', 'a sliding door that covers the clock face', 'a bell that rings every hour']),
  W('sequel', 'sequ / secu', 'Fans are waiting for the **sequel** to the film.', 'sequ (follow) + -el', 'a later film or book that continues the story', ['the first film in a series, which starts it all', 'a short summary of the story so far', 'a newspaper review written after the film']),
  W('consecutive', 'sequ / secu', 'It rained on five **consecutive** days.', 'con- (together) + secu (follow) + -tive', 'following one after another without a break', ['scattered at random across the whole month', 'all at the same time, on a single day', 'very rare, happening only once a year']),
  W('intervene', 'ven / vent', 'The referee had to **intervene** when the players started shoving.', 'inter- (between) + ven (come)', 'come between to stop or change something', ['watch closely without doing anything', 'leave the field quickly and quietly', 'cheer loudly for one of the teams']),
  W('convene', 'ven / vent', 'The council will **convene** on Monday to discuss the budget.', 'con- (together) + ven (come)', 'come together for a meeting', ['break up and go separate ways', 'go on holiday for a week', 'travel there one at a time']),
  W('transmit', 'mit / miss', 'The satellite will **transmit** images back to Earth.', 'trans- (across) + mit (send)', 'send from one place to another', ['receive from somewhere far away', 'store safely for later use', 'destroy so no one can see them']),
  W('emit', 'mit / miss', 'The old car **emits** a cloud of black smoke.', 'e- (out) + mit (send)', 'sends out', ['takes in', 'hides', 'cleans']),
  W('pesticide', 'cide', 'The farmer stopped using **pesticides** near the stream.', 'pest + -cide (kill)', 'chemicals that kill insects and other pests', ['plant food that helps crops grow faster', 'medicine given to sick farm animals', 'a kind of rich soil for growing crops']),
  W('equidistant', 'equ / equi', 'The school is **equidistant** from NAME’s house and the station.', 'equi (equal) + distant', 'the same distance from two places', ['much nearer to one place than the other', 'very far away from both places', 'right next door to both places']),
  W('equilibrium', 'equ / equi', 'The ecosystem stays in **equilibrium** as long as no species takes over.', 'equi (equal) + libr (balance)', 'a state of balance', ['a state of sudden change', 'a state of decline', 'a state of confusion']),
  W('circumference', 'circum', 'NAME measured the **circumference** of the tree trunk with a tape.', 'circum (around) + fer (carry)', 'the distance around the outside', ['the distance straight across', 'the area inside', 'the height']),
  W('circumnavigate', 'circum', 'The sailors set out to **circumnavigate** the globe.', 'circum (around) + navigate (sail)', 'sail all the way around', ['sail straight across', 'map from the air', 'stay in harbour']),
  W('omnivore', 'omni', 'A bear is an **omnivore**: it eats berries, roots and fish.', 'omni (all) + vor (eat)', 'an animal that eats both plants and meat', ['an animal that eats only plants', 'an animal that eats only meat', 'an animal that eats only insects']),
  W('polyglot', 'poly', 'NAME’s aunt is a **polyglot** who speaks six languages.', 'poly (many) + glot (tongue, language)', 'a person who speaks many languages', ['a person who travels alone a lot', 'a person who writes many poems', 'a person who teaches music lessons']),
  W('polygon', 'poly', 'A hexagon is a **polygon** with six sides.', 'poly (many) + gon (angle)', 'a flat shape with many straight sides', ['a perfect circle with no corners at all', 'a curved line that never closes up', 'a solid ball with a smooth surface']),
];

function rootGroup(name: string): string {
  return ROOTS.find((r) => r.root === name)?.group ?? name;
}

function wordRoots(rng: Rng, d: Difficulty): GenOutput {
  const cast = people(rng, 1);
  const f = (s: string) => fill(s, cast);
  if (d === 1) {
    const r = rng.pick(ROOTS);
    const wrong = rng.shuffle(ROOTS.filter((x) => x.group !== r.group)).slice(0, 3).map((x) => x.meaning);
    return {
      prompt: `The root **${r.root}** appears in ${r.examples.map((e) => `*${e}*`).join(', ')}. What does it mean?`,
      parts: [part(mc(rng, r.meaning, wrong))],
      hints: ['Think about what the example words have in common.'],
      solution: [`**${r.root}** means “${r.meaning}”.`, `The idea of “${r.meaning.split(',')[0]}” runs through *${r.examples[0]}*, *${r.examples[1]}* and *${r.examples[2]}*.`],
    };
  }
  if (d === 2) {
    const w = rng.pick(WORDS);
    return {
      prompt: `Use the word parts to work out the meaning of the word in bold.\n\n${block(f(w.s))}\n\nWhat does **${w.word}** mean here?`,
      parts: [part(mc(rng, w.meaning, w.wrong))],
      hints: ['Split the word into a prefix, a root and a suffix, and put their meanings together.', `Here: ${w.parts}.`],
      solution: [`**${w.word}** = ${w.parts}.`, `So it means “${w.meaning}”, which fits the sentence.`],
    };
  }
  // Difficulty 3: which word has this meaning? Words that share the root are offered first, so the
  // prefix or suffix decides.
  const w = rng.pick(WORDS);
  const kin = rng.shuffle(WORDS.filter((x) => x !== w && rootGroup(x.root) === rootGroup(w.root)));
  const rest = rng.shuffle(WORDS.filter((x) => x !== w && !kin.includes(x)));
  const others = [...kin, ...rest].slice(0, 3);
  return {
    prompt: `Which word means “${w.meaning}”?`,
    parts: [part(mc(rng, w.word, others.map((o) => o.word)))],
    hints: ['Several choices may share a root. Look at the prefix and the suffix to decide.'],
    solution: [`**${w.word}** = ${w.parts}: “${w.meaning}”.`, `${others[0].word} = ${others[0].parts}: “${others[0].meaning}”.`],
  };
}

// ---------------------------------------------------------------------------- precise diction

type Fault = 'vague' | 'jargon' | 'euphemism' | 'cliche';
const FAULT_TEXT: Record<Fault, string> = {
  vague: 'A vague word: it says too little to be useful',
  jargon: 'Jargon: technical or insider language the reader may not understand',
  euphemism: 'A euphemism: a soft or polite way of avoiding a harsh truth',
  cliche: 'A cliché: an expression so overused it has lost its force',
};
const FAULTS: Fault[] = ['vague', 'jargon', 'euphemism', 'cliche'];

interface Diction {
  fault: Fault;
  /** Context before the sentence, where the audience matters. */
  lead?: string;
  s: string;
  /** A plain, precise revision. */
  plain: string;
  /** Revisions that keep the fault or swap it for another. */
  wrong: [string, string, string];
}
const D = (fault: Fault, s: string, plain: string, wrong: [string, string, string], lead?: string): Diction => ({ fault, s, plain, wrong, lead });

const DICTION: Diction[] = [
  D('vague', 'The film was **good**.', 'The film’s twist ending surprised everyone in the cinema.', ['The film was really good, and everyone said it was really great.', 'The film was very nice and a lot better than I expected it to be.', 'The film was great in lots of ways, and it had some good bits.']),
  D('vague', 'There were **a lot of** problems with the plan.', 'The plan had three problems: it cost too much, took too long and needed too many volunteers.', ['There were lots and lots of problems with the plan, and some were really serious.', 'There were loads of different problems with the plan, in all sorts of ways.', 'There were quite a few problems with the plan, and they caused all kinds of trouble.']),
  D('vague', 'NAME brought **some stuff** for the picnic.', 'NAME brought sandwiches, mangoes and a flask of tea for the picnic.', ['NAME brought some things to eat and drink, and a few other bits, for the picnic.', 'NAME brought various items and all sorts of other stuff for the picnic.', 'NAME brought loads of stuff and lots of different things for the picnic.']),
  D('vague', 'The museum trip was **nice**.', 'At the museum, we held a fossil that is two hundred million years old.', ['The museum trip was really nice, and we saw lots of really interesting things.', 'The museum trip was very good, and there was plenty of stuff to look at there.', 'The museum trip was lovely, and everyone agreed it was a great day out.']),
  D('vague', 'The new rule had a **big effect** on the school.', 'Since the new rule, students have arrived fifteen minutes earlier on average.', ['The new rule had a huge effect on the school, and things are very different now.', 'The new rule had a major impact on the school and changed a lot of things there.', 'The new rule really changed things at the school in all kinds of important ways.']),
  D('vague', 'The weather on our trip was **bad**.', 'It rained on four of our five days, and the ferry to the island was cancelled twice.', ['The weather on our trip was really bad, and it made things very difficult for us.', 'The weather on our trip was awful almost all of the time, which spoiled a lot.', 'The weather on our trip was not very good at all, and it caused some problems.']),
  D('vague', 'The new phone is **a lot better** than the old one.', 'The new phone’s battery lasts two days, twice as long as the old one’s.', ['The new phone is much better than the old one in lots of different ways.', 'The new phone is way better than the old one, and it does things really well.', 'The new phone is loads better than the old one, and everything about it is great.']),
  D('vague', 'NAME’s speech on bees was **interesting**.', 'After NAME’s speech on bees, three classmates signed up for the school garden club.', ['NAME’s speech on bees was really interesting, and everyone thought it was very good.', 'NAME’s speech on bees was very good and had lots of interesting things in it.', 'NAME’s speech on bees was fascinating, and people found it really interesting.']),
  D('jargon', 'Going forward, we will **leverage our core competencies** to grow the club.', 'Next season, we will use what we do best, coaching young players, to grow the club.', ['Going forward, we will optimize our core competencies to grow the club.', 'Going forward, we will leverage our strengths synergistically to grow the club.', 'At the end of the day, we will play to our strengths to grow the club.'], 'From a sports club’s letter to parents:'),
  D('jargon', 'Your child **presented with acute cephalalgia** this morning.', 'Your child had a bad headache this morning.', ['Your child presented with severe cephalalgia this morning.', 'Your child had an acute cephalalgic episode this morning.', 'Your child was under the weather this morning.'], 'From a school nurse’s note to parents:'),
  D('jargon', 'Please **action these deliverables** and **circle back** to me by Friday.', 'Please finish these tasks and report back to me by Friday.', ['Please action these items and touch base with me by Friday.', 'Please progress these deliverables and loop back to me by Friday.', 'Please deal with this stuff and get back to me by Friday.'], 'From a teacher’s email to a Grade 11 class:'),
  D('jargon', 'The defence lawyer **filed a motion in limine**.', 'The defence lawyer asked the judge to keep certain evidence out of the trial.', ['The defence lawyer submitted a motion in limine to the court this morning.', 'The defence lawyer filed a pre-trial in limine application with the court.', 'The defence lawyer pulled out all the stops before the trial began.'], 'From a newspaper report for general readers:'),
  D('euphemism', 'After a long illness, NAME’s grandfather **passed away** last spring.', 'After a long illness, NAME’s grandfather died last spring.', ['After a long illness, NAME’s grandfather was lost last spring.', 'After a long illness, NAME’s grandfather went to a better place last spring.', 'After a long illness, NAME’s grandfather departed last spring.'], 'In a news report, where plain facts are needed:'),
  D('euphemism', 'The factory said three hundred workers would be **let go**.', 'The factory said it would dismiss three hundred workers.', ['The factory said three hundred workers would be released.', 'The factory said three hundred workers would be freed up.', 'The factory said three hundred workers would be moving on.'], 'In a news report, where plain facts are needed:'),
  D('euphemism', 'The dealer is selling the car as **pre-owned**.', 'The dealer is selling the car as used.', ['The dealer is selling the car as pre-loved.', 'The dealer is selling the car as gently enjoyed.', 'The dealer is selling the car as previously enjoyed.'], 'In a consumer guide that warns buyers:'),
  D('euphemism', 'Since the factory closed, NAME’s uncle has been **between jobs**.', 'Since the factory closed, NAME’s uncle has been unemployed.', ['Since the factory closed, NAME’s uncle has been taking a career break.', 'Since the factory closed, NAME’s uncle has been exploring options.', 'Since the factory closed, NAME’s uncle has been in transition.'], 'In a report on jobs in the town, where plain facts are needed:'),
  D('cliche', '**At the end of the day**, what matters most is effort.', 'What matters most is effort.', ['When all is said and done, what matters most is effort.', 'At the end of the day, effort is what really counts.', 'When push comes to shove, what matters most is effort.'], 'From a student’s essay:'),
  D('cliche', 'To solve the parking problem, we need to **think outside the box**.', 'To solve the parking problem, we should consider ideas such as shared bikes and later start times.', ['To solve the parking problem, we need to push the envelope and try something completely new.', 'To solve the parking problem, we really need to think outside of the box and be creative.', 'To solve the parking problem, we need some blue-sky thinking and fresh ideas from everyone.'], 'From a student’s proposal:'),
  D('cliche', 'The ambulance arrived **in the nick of time**.', 'The ambulance arrived two minutes before the patient stopped breathing.', ['The ambulance arrived just in the nick of time, as things were getting worse.', 'The ambulance arrived at the eleventh hour, just when things looked their worst.', 'The ambulance arrived not a moment too soon for the patient on the ground.'], 'From a student’s news story:'),
  D('cliche', 'NAME’s new coach is **as old as the hills**.', 'NAME’s new coach is seventy-two and has trained players for fifty years.', ['NAME’s new coach is as old as time and has been around the game forever.', 'NAME’s new coach is older than the hills and has seen it all before.', 'NAME’s new coach is no spring chicken and has been in the game a long, long time.'], 'From a student’s profile of a coach:'),
];

function preciseDiction(rng: Rng, d: Difficulty): GenOutput {
  const cast = people(rng, 1);
  const f = (s: string) => fill(s, cast);
  if (d === 1) {
    const it = rng.pick(DICTION.filter((x) => x.fault === 'vague'));
    return {
      prompt: `Which revision replaces the vague words with precise, specific language?\n\n${block(f(it.s))}`,
      parts: [part(mc(rng, f(it.plain), it.wrong.map(f)))],
      hints: ['Adding “very” or “really”, or swapping one vague word for another, does not make writing precise. Precise writing gives specific details the reader can picture or check.'],
      solution: [`“${f(it.plain)}” gives specific details.`, 'The others stay vague, however long they get: they swap one vague word for another and add words such as “really”, “very” and “lots of”, but no detail the reader can picture or check.'],
    };
  }
  if (d === 2) {
    const it = rng.pick(DICTION);
    return {
      prompt: `${it.lead ? `${it.lead}\n\n` : ''}${block(f(it.s))}\n\nWhat is the problem with the words in bold?`,
      parts: [part(fixedChoice(FAULTS.map((x) => FAULT_TEXT[x]), FAULTS.indexOf(it.fault)))],
      hints: ['Vague words say too little; jargon is language only insiders understand; a euphemism softens an unpleasant truth; a cliché is a worn-out phrase.'],
      solution: [`${FAULT_TEXT[it.fault]}.`, `A plain, precise version: “${f(it.plain)}”`],
    };
  }
  const it = rng.pick(DICTION.filter((x) => x.fault !== 'vague'));
  return {
    prompt: `${it.lead ? `${it.lead}\n\n` : ''}${block(f(it.s))}\n\nThe words in bold are ${FAULT_TEXT[it.fault].split(':')[0].toLowerCase()}. Which revision says the same thing plainly and precisely?`,
    parts: [part(mc(rng, f(it.plain), it.wrong.map(f)))],
    hints: ['Say exactly what is meant, in words every reader of this text will understand.'],
    solution: [`“${f(it.plain)}” says it plainly and precisely.`, `The others keep the ${it.fault === 'cliche' ? 'cliché' : it.fault} or swap it for another one.`],
  };
}

export const WORD_SKILLS: SkillDef[] = [
  skill({
    id: 'e11-word-roots',
    name: 'Greek and Latin roots',
    description: 'Work out the meaning of a word from its Greek and Latin roots, prefixes and suffixes.',
    outcomes: OUTCOMES,
    lessonId: LESSON,
    format: 'mc',
    gen: wordRoots,
  }),
  skill({
    id: 'e11-precise-diction',
    name: 'Precise diction',
    description: 'Recognize vague words, jargon, euphemism and cliché, and replace them with precise language suited to the reader.',
    outcomes: OUTCOMES,
    lessonId: LESSON,
    format: 'mc',
    gen: preciseDiction,
  }),
];
