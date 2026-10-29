/**
 * Grade 10 English, Unit 5: Visual and Media Texts (10-E1). Reading an image (composition, focal
 * point, foreground and background, and the effect of colour, light, space and angle), film
 * techniques (shots, angles, camera movement, sound, editing and lighting), and advertising
 * (persuasive techniques and target audiences). The page shows no images, so every photo, poster and
 * film shot is described in words. Every product, brand and person in the advertisements is invented.
 */
import { fixedChoice, mc, part, skill } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { an, block, cap } from './common.ts';

// ============================================================================ lesson 5.1: reading an image

type Composition = 'leading' | 'framing' | 'thirds' | 'contrast' | 'symmetry';
const COMPOSITIONS: Composition[] = ['leading', 'framing', 'thirds', 'contrast', 'symmetry'];
const COMPOSITION_NAME: Record<Composition, string> = {
  leading: 'Leading lines',
  framing: 'Framing',
  thirds: 'The rule of thirds',
  contrast: 'Contrast',
  symmetry: 'Symmetry',
};
const COMPOSITION_WHAT: Record<Composition, string> = {
  leading: 'leading lines are lines in a picture, such as roads, rivers or fences, that draw the eye toward the subject',
  framing: 'framing surrounds the subject with something in the picture, such as a doorway, window or branches',
  thirds: 'the rule of thirds places the subject about a third of the way across or up the picture, where imaginary lines dividing it into thirds cross, rather than in the centre',
  contrast: 'contrast places very different things side by side, such as light and dark or bright and dull colours, so that one stands out',
  symmetry: 'symmetry makes one half of the picture mirror the other, which feels balanced and calm',
};
const COMPOSITION_EXAMPLES: Record<Composition, string[]> = {
  leading: [
    'A railway track curves from the bottom left corner of the photograph toward a small station far away on the right. The rails draw the viewer’s eye to the station.',
    'A winding road starts at the bottom edge of the picture and curves up the hillside to a single farmhouse, which the eye reaches by following the road.',
    'A row of street lamps stretches from the front of the photo into the distance, pointing the viewer toward a figure at the far end of the street.',
  ],
  framing: [
    'The photographer took the picture through an arched stone doorway, so the dark arch surrounds the sunlit garden beyond it.',
    'Two trees lean in from the left and right edges of the picture, and their branches meet at the top, enclosing a lighthouse in the middle distance.',
    'A boy’s face is seen through a small window, the wooden window frame boxing him in on all four sides.',
  ],
  thirds: [
    'The photographer placed the lone sailboat a third of the way in from the left, where imaginary lines dividing the picture into thirds cross, not in the middle.',
    'The horizon runs along the lower third of the photo, leaving the top two thirds for a dramatic, cloud-filled sky.',
    'A portrait places the girl’s face a third of the way in from the right edge, where imaginary lines dividing the picture into thirds cross, instead of in the centre.',
  ],
  contrast: [
    'In a black-and-white photograph, a single white swan floats on dark, almost black water.',
    'A child in a bright yellow raincoat stands among a crowd of people in dark grey coats.',
    'A small green shoot pushes up through a cracked, grey concrete pavement.',
  ],
  symmetry: [
    'An old temple is reflected perfectly in a still pond below it, so the top and bottom halves of the photo mirror each other.',
    'An arched stone bridge and its reflection in a calm river form a perfect circle, the top half matching the bottom.',
    'A butterfly is photographed from directly above, its left and right wings matching exactly in shape and pattern.',
  ],
};

interface Scene {
  text: string;
  focal: string;
  /** Why the eye goes to the focal point first. */
  focalWhy: string;
  focalWrong: string[];
  foreground: string;
  background: string;
  /** Other parts of the image, for wrong choices. */
  others: string[];
}
const SCENES: Scene[] = [
  {
    text: 'A poster for a music festival. In the foreground, a girl in a red jacket holds a guitar above her head, sharp and brightly lit. Behind her, a crowd of hundreds is blurred, and in the background a stage glows purple against a night sky.',
    focal: 'The girl holding the guitar',
    focalWhy: 'She is the largest figure, the only part in sharp focus, and brightly lit in a red jacket.',
    focalWrong: ['The night sky above the stage', 'The blurred crowd behind her', 'The purple lights on the stage'],
    foreground: 'The girl holding the guitar',
    background: 'The stage and the night sky',
    others: ['The blurred crowd of hundreds'],
  },
  {
    text: 'A photograph of a harbour at dawn. In the foreground, an old fisherman sits on a wooden crate, mending a net in his lap. Behind him, fishing boats bob in the water, and in the background, pale hills rise under a pink sky.',
    focal: 'The fisherman mending his net',
    focalWhy: 'He is the closest and largest figure, and the picture is arranged around him.',
    focalWrong: ['The pale hills in the distance', 'The pink sky above the hills', 'The boats bobbing in the water'],
    foreground: 'The fisherman mending his net',
    background: 'The pale hills and the pink sky',
    others: ['The fishing boats in the water'],
  },
  {
    text: 'A wildlife photo. In the foreground, a tiger’s face fills much of the picture, sharp and close, its yellow eyes staring at the camera. In the middle distance, softly blurred, a deer drinks at a pool, and in the background a line of hills fades into the haze.',
    focal: 'The tiger’s eyes',
    focalWhy: 'The tiger’s face is close, large and sharp, and its eyes look straight at the viewer, while everything behind it is blurred.',
    focalWrong: ['The line of hills', 'The haze', 'The pool'],
    foreground: 'The tiger’s face',
    background: 'The line of hills',
    others: ['The deer drinking at the pool'],
  },
  {
    text: 'A poster for a charity run. In the foreground, a pair of worn running shoes stands on a starting line. Behind them, a long road stretches toward a city skyline in the background, and a single beam of sunlight falls on the shoes.',
    focal: 'The running shoes on the starting line',
    focalWhy: 'They are in the foreground, lit by a beam of sunlight, and the road leads away from them.',
    focalWrong: ['The city skyline far in the distance', 'The sky above the city in the background', 'The middle of the long, empty road'],
    foreground: 'The running shoes on the starting line',
    background: 'The city skyline',
    others: ['The long road leading away from the shoes'],
  },
  {
    text: 'A photograph of a market. In the foreground, a woman’s hands hold out a basket of bright orange mangoes, in sharp focus. Behind her, other stalls and shoppers are soft and blurred, and in the background a white clock tower rises above the rooftops.',
    focal: 'The basket of mangoes',
    focalWhy: 'The mangoes are bright, in sharp focus and held out toward the viewer, while everything behind is blurred.',
    focalWrong: ['The rooftops', 'The blurred shoppers', 'The sky'],
    foreground: 'The woman’s hands holding the mangoes',
    background: 'The white clock tower above the rooftops',
    others: ['The other stalls and the blurred shoppers'],
  },
];

function visualElementsQ(rng: Rng, d: Difficulty) {
  if (d === 2) {
    const s = rng.pick(SCENES);
    if (rng.chance(0.5)) {
      return {
        prompt: `${block(s.text)}\n\nWhat is the **focal point** of this image?`,
        parts: [part(mc(rng, s.focal, s.focalWrong))],
        hints: ['The focal point is the part of the image the eye goes to first. Look for what is largest, brightest, sharpest or placed where other lines lead.'],
        solution: [s.focalWhy, `So the focal point is ${s.focal[0].toLowerCase()}${s.focal.slice(1)}.`],
      };
    }
    const askFront = rng.chance(0.5);
    const right = askFront ? s.foreground : s.background;
    const wrong = [askFront ? s.background : s.foreground, ...s.others];
    return {
      prompt: `${block(s.text)}\n\nWhat is in the **${askFront ? 'foreground' : 'background'}** of this image?`,
      parts: [part(mc(rng, right, wrong))],
      hints: ['The foreground is the part of an image that seems closest to the viewer; the background is the part that seems farthest away.'],
      solution: [`The ${askFront ? 'foreground' : 'background'} is ${right[0].toLowerCase()}${right.slice(1)}: ${askFront ? 'it seems closest to the viewer' : 'it seems farthest away'}.`],
    };
  }
  const c = rng.pick(COMPOSITIONS);
  const text = rng.pick(COMPOSITION_EXAMPLES[c]);
  if (d === 3) {
    const want = c;
    const others = rng.shuffle(COMPOSITIONS.filter((x) => x !== want)).slice(0, 3).map((x) => rng.pick(COMPOSITION_EXAMPLES[x]));
    return {
      prompt: `Which description shows **${COMPOSITION_NAME[want].toLowerCase()}**?`,
      parts: [part(mc(rng, text, others))],
      hints: [`Remember: ${COMPOSITION_WHAT[want]}.`],
      solution: [`This description shows ${COMPOSITION_NAME[want].toLowerCase()}: ${COMPOSITION_WHAT[want]}.`, 'Each of the others shows a different technique.'],
    };
  }
  return {
    prompt: `Which technique of composition does this image use?\n\n${block(text)}`,
    parts: [part(mc(rng, COMPOSITION_NAME[c], rng.shuffle(COMPOSITIONS.filter((x) => x !== c)).map((x) => COMPOSITION_NAME[x])))],
    hints: ['Composition is how the parts of an image are arranged. Ask what guides your eye: lines, a frame, placement off-centre, a strong difference, or a mirror image?'],
    solution: [`The image uses ${COMPOSITION_NAME[c].toLowerCase()}: ${COMPOSITION_WHAT[c]}.`],
  };
}

interface VisualChoice {
  /** Feelings the choice is linked to; two choices that share one are never offered together. */
  tags: string[];
  choice: string;
  effect: string;
  wrong: string[];
  /** Difficulty 3: the feeling a designer wants, for which this choice is the best. */
  goal: string;
}
const VISUAL_CHOICES: VisualChoice[] = [
  { tags: ['lonely', 'small'], choice: 'a single hiker, tiny, in the middle of a vast, empty desert', effect: 'It makes the hiker seem small and alone in a huge landscape.', wrong: ['It makes the hiker seem powerful and in full control of the land.', 'It makes the scene feel crowded, busy and full of other people.', 'It makes the desert seem small, cosy and pleasantly familiar.'], goal: 'a feeling of how small and alone a person can be in nature' },
  { tags: ['warm'], choice: 'a family dinner lit by the warm orange glow of candles', effect: 'It makes the scene feel warm, cosy and close.', wrong: ['It makes the scene feel cold, distant and formal.', 'It makes the scene feel tense and threatening.', 'It makes the family seem like strangers to each other.'], goal: 'a feeling of comfort and closeness' },
  { tags: ['lonely', 'sad'], choice: 'a city street at night painted in cold blues and greys', effect: 'It creates a calm but sad and lonely feeling.', wrong: ['It creates a cheerful, festive party feeling.', 'It makes the street feel hot, bright and crowded.', 'It makes the scene seem silly, playful and comic.'], goal: 'a feeling of sadness and loneliness' },
  { tags: ['fear'], choice: 'an old house lit only by a single candle, with deep shadows in every corner', effect: 'It creates mystery and suspense: something might be hiding in the dark.', wrong: ['It makes the house feel bright, warm and welcoming to every visitor.', 'It makes the scene feel cheerful and safe, like a sunny afternoon.', 'It makes the old house look freshly painted and brand new.'], goal: 'a feeling of mystery and fear' },
  { tags: ['happy'], choice: 'a playground photographed in bright, even sunlight with almost no shadows', effect: 'It makes the scene feel cheerful, open and safe.', wrong: ['It makes the scene feel dangerous and mysterious.', 'It makes the playground seem gloomy and cold.', 'It makes the playground look abandoned and frightening.'], goal: 'a feeling of happiness and safety' },
  { tags: ['power'], choice: 'a photo of a statue taken from below, looking up at it against the sky', effect: 'It makes the statue seem tall, powerful and important.', wrong: ['It makes the statue seem small, weak and unimportant.', 'It makes the statue seem friendly, ordinary and familiar.', 'It makes the statue blend into the background behind it.'], goal: 'a sense of power and importance' },
  { tags: ['small'], choice: 'a lost puppy photographed from high above, looking up at the camera', effect: 'It makes the puppy seem small, helpless and vulnerable.', wrong: ['It makes the puppy seem fierce, dangerous and ready to attack.', 'It makes the puppy seem huge, strong and powerful.', 'It makes the puppy seem confident and fully in charge.'], goal: 'a sense of helplessness, so that viewers want to protect the subject' },
  { tags: ['past'], choice: 'a black-and-white photograph of an old couple on a park bench', effect: 'It gives the image a timeless, serious feel, as if from the past.', wrong: ['It makes the image feel loud, bright and completely modern.', 'It makes the image feel like a cheerful cartoon for children.', 'It makes the couple seem young and only just in love.'], goal: 'a sense of memory and the passing of time' },
  { tags: ['attention'], choice: 'one red umbrella in a crowd of people dressed in grey', effect: 'It draws the eye straight to the umbrella and makes it seem important.', wrong: ['It hides the umbrella in the crowd so that it is hard to find.', 'It makes every person in the crowd look exactly the same as the rest.', 'It makes the whole picture feel dull, flat and colourless.'], goal: 'a sense that one thing stands out from everything around it' },
  { tags: ['attention'], choice: 'a portrait where the face is sharp and everything behind it is blurred', effect: 'It focuses the viewer’s attention on the person’s face and expression.', wrong: ['It draws the viewer’s attention away from the face to the background.', 'It makes the person hard to notice among the details behind them.', 'It makes the setting, not the person, the most important part.'], goal: 'a focus on one person’s expression' },
];

function visualEffectQ(rng: Rng, d: Difficulty) {
  const v = rng.pick(VISUAL_CHOICES);
  if (d === 3) {
    const others = rng.sample(VISUAL_CHOICES.filter((x) => x !== v && !x.tags.some((t) => v.tags.includes(t))), 3);
    return {
      prompt: `A photographer wants an image that creates **${v.goal}**. Which choice would work best?`,
      parts: [part(mc(rng, `${v.choice[0].toUpperCase()}${v.choice.slice(1)}`, others.map((o) => `${o.choice[0].toUpperCase()}${o.choice.slice(1)}`)))],
      hints: ['Think about the feeling each choice of colour, light, space or angle usually creates.'],
      solution: [`${v.choice[0].toUpperCase()}${v.choice.slice(1)}: ${v.effect[0].toLowerCase()}${v.effect.slice(1)}`, 'Each of the other choices creates a different feeling.'],
    };
  }
  const lead = d === 1 ? `An image shows ${v.choice}.` : `A magazine cover shows ${v.choice}, with the magazine’s title at the top.`;
  return {
    prompt: `${lead}\n\nWhat effect does this choice most likely have on the viewer?`,
    parts: [part(mc(rng, v.effect, v.wrong))],
    hints: ['Warm colours and bright light tend to feel welcoming; cool colours and shadow feel sad or mysterious. Size, space and camera angle change how strong or weak a subject seems.'],
    solution: [v.effect, 'Every choice of colour, light, space and angle shapes how the viewer feels about the subject.'],
  };
}

// ============================================================================ lesson 5.2: camera shots, angles and movements

type ShotGroup = 'shot' | 'angle' | 'move';
interface Shot {
  name: string;
  group: ShotGroup;
  what: string;
  /** Difficulty 2: an example and its usual effect, with wrong effects. */
  example: string;
  effect: string;
  wrongEffects: string[];
}
const SHOTS: Shot[] = [
  { name: 'Extreme long shot', group: 'shot', what: 'shows a vast area, such as a whole city or a mountain range, with people tiny or not visible at all', example: 'A film opens with an extreme long shot of a tiny boat on a vast, empty ocean.', effect: 'It establishes the setting and shows how small and alone the boat is.', wrongEffects: ['It shows the sailor’s face and feelings in close, careful detail.', 'It makes the boat seem huge, powerful and in control of the sea.', 'It hides where the story takes place until much later in the film.'] },
  { name: 'Long shot', group: 'shot', what: 'shows a character’s whole body, from head to foot, with some of the surroundings', example: 'A long shot shows a girl standing at the end of an empty platform, her suitcase beside her.', effect: 'It shows all of her and where she is, so we understand her situation.', wrongEffects: ['It shows only her eyes, so we see nothing of the platform around her.', 'It makes her seem powerful and threatening as she waits for the train.', 'It hides where she is, so the audience cannot tell what is happening.'] },
  { name: 'Medium shot', group: 'shot', what: 'shows a character from about the waist up', example: 'Two friends talking at a café table are filmed in a medium shot, from the waist up.', effect: 'It shows their faces and gestures, as if the audience were sitting with them.', wrongEffects: ['It shows the whole city around them, so the café is just a tiny dot.', 'It makes them look tiny and lost in a huge, empty landscape around them.', 'It shows only a single detail, such as one hand resting on the table.'] },
  { name: 'Close-up', group: 'shot', what: 'shows a character’s face filling most of the screen', example: 'As the letter is read aloud, the camera holds a close-up of the mother’s face.', effect: 'It shows her emotions in detail and draws the audience close to her feelings.', wrongEffects: ['It shows the whole room and everyone in it, so her face is hard to see.', 'It makes her seem distant and unimportant, as if she were a stranger.', 'It establishes where the scene is set before we meet any of the characters.'] },
  { name: 'Extreme close-up', group: 'shot', what: 'shows a tiny detail, such as an eye, a hand or a key, filling the screen', example: 'An extreme close-up shows a finger hovering over the red button.', effect: 'It focuses all our attention on one small detail and builds tension.', wrongEffects: ['It shows the whole control room and everyone working in it at once.', 'It relaxes the audience by showing a calm, ordinary everyday moment.', 'It shows where the scene takes place, like a map of the whole building.'] },
  { name: 'High angle', group: 'angle', what: 'looks down on the subject from above', example: 'The camera looks down from a high angle on a boy sitting alone on the floor of a huge hall.', effect: 'It makes him seem small, weak and vulnerable.', wrongEffects: ['It makes him seem powerful and fully in charge.', 'It makes him seem threatening and dangerous.', 'It makes him seem taller than everyone else.'] },
  { name: 'Low angle', group: 'angle', what: 'looks up at the subject from below', example: 'The villain is filmed from a low angle as he steps out of the shadows.', effect: 'It makes him seem large, powerful and threatening.', wrongEffects: ['It makes him seem small, weak and easy to defeat.', 'It makes him seem friendly, gentle and harmless.', 'It makes him seem lost, confused and frightened.'] },
  { name: 'Eye-level shot', group: 'angle', what: 'puts the camera at the height of the character’s eyes', example: 'During an ordinary conversation, the camera stays at eye level with both characters.', effect: 'It feels natural, as if we were meeting the characters as equals.', wrongEffects: ['It makes one character seem far more powerful than the other.', 'It makes both characters seem tiny, weak and far away from us.', 'It shows the scene from directly overhead, like a map of the room.'] },
  { name: 'Bird’s-eye view', group: 'angle', what: 'looks straight down from directly above', example: 'A bird’s-eye view shows a maze of city streets, with cars moving like ants.', effect: 'It shows the layout like a map and makes the people in it seem small.', wrongEffects: ['It shows one driver’s face in detail, so we can read her feelings.', 'It makes the cars seem huge, powerful and frightening as they pass.', 'It puts the audience at eye level with the drivers on the street.'] },
  { name: 'Pan', group: 'move', what: 'turns the camera left or right from a fixed position', example: 'The camera pans slowly from left to right across the ruined village.', effect: 'It lets the audience take in the whole scene, one part at a time.', wrongEffects: ['It moves closer and closer to one face until it fills the screen.', 'It looks straight down on the village from high above, like a map.', 'It follows one running character along the street on wheels.'] },
  { name: 'Tilt', group: 'move', what: 'turns the camera up or down from a fixed position', example: 'The camera tilts slowly up the side of the skyscraper, from the street to the very top.', effect: 'It reveals how tall the building is, bit by bit.', wrongEffects: ['It shows the whole street from left to right.', 'It follows a car as it drives down the road.', 'It shows only one window of the building in detail.'] },
  { name: 'Zoom', group: 'move', what: 'changes the lens so the subject seems to come closer or move away, while the camera stays still', example: 'The camera suddenly zooms in on a face in the crowd.', effect: 'It picks out one person and tells the audience that he matters.', wrongEffects: ['It shows the whole crowd from high above, like a map of the square.', 'It turns slowly to the left to show the rest of the street.', 'It makes everyone in the crowd seem equally important to the story.'] },
  { name: 'Tracking shot', group: 'move', what: 'moves the camera along with the subject, often on rails or a vehicle', example: 'A tracking shot follows the runner along the beach, staying beside her as she races.', effect: 'It puts us alongside the runner and keeps up the energy of the race.', wrongEffects: ['It stays still and lets the runner disappear far into the distance.', 'It shows the whole beach from directly above, like a map of the coast.', 'It shows only the runner’s eye, so we cannot see where she is.'] },
];

interface ShotPurpose {
  purpose: string;
  right: string;
  wrong: string[];
}
const SHOT_PURPOSES: ShotPurpose[] = [
  { purpose: 'show at the start of the film that the story takes place in a vast mountain range', right: 'Extreme long shot', wrong: ['Extreme close-up', 'Close-up', 'Medium shot'] },
  { purpose: 'show the fear in a character’s face as she hears footsteps', right: 'Close-up', wrong: ['Extreme long shot', 'Bird’s-eye view', 'Long shot'] },
  { purpose: 'make a giant robot look as huge and frightening as possible', right: 'Low angle', wrong: ['High angle', 'Bird’s-eye view', 'Eye-level shot'] },
  { purpose: 'make a lost child in a crowded station look small and helpless', right: 'High angle', wrong: ['Low angle', 'Eye-level shot', 'Extreme close-up'] },
  { purpose: 'show only the key turning slowly in the lock', right: 'Extreme close-up', wrong: ['Extreme long shot', 'Long shot', 'Bird’s-eye view'] },
  { purpose: 'follow a cyclist through the streets, staying right beside her', right: 'Tracking shot', wrong: ['Tilt', 'Zoom', 'Pan'] },
  { purpose: 'show the pattern of a marching band’s formation on the field below', right: 'Bird’s-eye view', wrong: ['Low angle', 'Extreme close-up', 'Close-up'] },
  { purpose: 'reveal a waterfall from its pool at the bottom up to the cliff at the top, without moving the camera', right: 'Tilt', wrong: ['Tracking shot', 'Pan', 'Extreme close-up'] },
];

function cameraQ(rng: Rng, d: Difficulty) {
  if (d === 3) {
    const p = rng.pick(SHOT_PURPOSES);
    return {
      prompt: `A director wants to **${p.purpose}**. Which shot, angle or movement would work best?`,
      parts: [part(mc(rng, p.right, p.wrong))],
      hints: ['Match the purpose to the technique: how much of the scene it shows, whether it looks up or down, and how the camera moves.'],
      solution: [`The best choice is the ${p.right.toLowerCase()}: it ${SHOTS.find((s) => s.name === p.right)!.what}.`],
    };
  }
  const s = rng.pick(SHOTS);
  if (d === 2) {
    return {
      prompt: `${s.example}\n\nWhat effect does this most likely have on the audience?`,
      parts: [part(mc(rng, s.effect, s.wrongEffects))],
      hints: ['Think about how much the shot shows, whether the camera looks up or down, and how it moves.'],
      solution: [`${cap(an(s.name.toLowerCase()))} ${s.what}.`, s.effect],
    };
  }
  const same = SHOTS.filter((x) => x.group === s.group && x !== s);
  return {
    prompt: `Which ${s.group === 'shot' ? 'kind of shot' : s.group === 'angle' ? 'camera angle' : 'camera movement'} ${s.what}?`,
    parts: [part(mc(rng, s.name, rng.shuffle(same).map((x) => x.name)))],
    hints: [s.group === 'shot' ? 'Shots are named by how much of the scene they show, from an extreme long shot (a vast area) to an extreme close-up (one small detail).' : s.group === 'angle' ? 'Angles are named by where the camera is: above the subject, below it, at eye level, or directly overhead.' : 'Movements are named by what the camera does: turns sideways, turns up or down, changes the lens, or travels with the subject.'],
    solution: [`${cap(an(s.name.toLowerCase()))} ${s.what}.`],
  };
}

// ============================================================================ lesson 5.2: sound, editing and lighting

const DIEGETIC = [
  'A character switches on the car radio, and a pop song begins to play.',
  'Rain drums on the roof of the cabin where the characters are hiding.',
  'Two friends argue loudly in the kitchen.',
  'A phone rings on the desk, and the detective picks it up.',
  'A band plays at the wedding while the guests dance to its music.',
  'A dog barks outside the window, and the character looks up.',
];
const NON_DIEGETIC = [
  'Gentle piano music plays as the camera moves across an empty beach; there is no piano anywhere in the scene.',
  'An older version of the main character, never seen on screen, tells the story in a voice-over.',
  'Fast drumming music builds during the chase, though no one in the scene is playing drums.',
  'A sudden, loud chord from the film’s score sounds as the villain appears in the doorway.',
  'Sad violin music swells as the two friends say goodbye at the airport, though there are no musicians nearby.',
];

type Edit = 'cut' | 'crosscut' | 'montage' | 'fade' | 'highkey' | 'lowkey';
const EDIT_NAME: Record<Edit, string> = {
  cut: 'A cut',
  crosscut: 'Cross-cutting',
  montage: 'A montage',
  fade: 'A fade to black',
  highkey: 'High-key lighting',
  lowkey: 'Low-key lighting',
};
const EDIT_WHAT: Record<Edit, string> = {
  cut: 'a cut is an instant change from one shot to the next',
  crosscut: 'cross-cutting switches back and forth between two scenes happening at the same time',
  montage: 'a montage is a series of short shots edited together to show time passing or something changing',
  fade: 'a fade to black slowly darkens the picture until the screen is black',
  highkey: 'high-key lighting is bright and even, with few shadows',
  lowkey: 'low-key lighting is dark, with strong shadows and small pools of light',
};
interface EditExample {
  edit: Edit;
  text: string;
  effect: string;
  wrong: string[];
}
const EDITS: EditExample[] = [
  { edit: 'crosscut', text: 'The film switches back and forth between a bomb’s timer counting down and the hero racing through traffic to reach it.', effect: 'It builds suspense: will the hero arrive in time?', wrong: ['It shows that the two events happened years apart.', 'It slows the story down to calm the audience.', 'It shows the hero’s memories of his childhood.'] },
  { edit: 'crosscut', text: 'The film moves back and forth between a girl waiting nervously at a train station and her brother running through the city to meet her before the train leaves.', effect: 'It builds tension, because the audience knows they are running out of time.', wrong: ['It shows that the girl is only dreaming that her brother is coming.', 'It makes the scene feel calm and slow, with nothing much at stake.', 'It hides where the two characters are, so the audience feels lost.'] },
  { edit: 'montage', text: 'A series of quick shots shows a boxer skipping, running up stairs, punching a bag and lifting weights, as weeks go by.', effect: 'It shows a long period of training and improvement in a short time.', wrong: ['It shows a single moment of the training in great, slow detail.', 'It shows two events happening at the same moment in different places.', 'It ends the film by slowly darkening the screen to black.'] },
  { edit: 'montage', text: 'Short shots show a garden through the seasons: bare soil, green shoots, flowers in bloom, then falling leaves.', effect: 'It shows a long passage of time in a few seconds.', wrong: ['It freezes time at a single moment in the garden.', 'It shows two places at exactly the same moment.', 'It hides the garden from the audience until later.'] },
  { edit: 'fade', text: 'As the old man closes his eyes in the final scene, the picture slowly darkens until the screen is completely black.', effect: 'It gives a sense of an ending, gently closing the scene.', wrong: ['It speeds up the action and makes the scene feel rushed.', 'It builds excitement for a chase that is about to begin.', 'It shows two events happening at the same time in two places.'] },
  { edit: 'cut', text: 'In the middle of a quiet conversation, the film jumps instantly to a loud, crowded street.', effect: 'It jolts the audience with a sudden change of scene.', wrong: ['It slowly darkens the screen to show an ending.', 'It shows a long period of training in a few seconds.', 'It shows the same moment from two different places.'] },
  { edit: 'lowkey', text: 'A detective walks down an alley lit only by one flickering street lamp, with deep shadows on the walls around him.', effect: 'It creates mystery and danger: anything could be hiding in the dark.', wrong: ['It makes the scene feel cheerful and safe, like a sunny morning.', 'It suggests a light-hearted family comedy with nothing to fear.', 'It makes the alley look bright, clean and welcoming to visitors.'] },
  { edit: 'highkey', text: 'A family comedy shows a bright, sunny kitchen where every corner is evenly lit and there are almost no shadows.', effect: 'It makes the scene feel cheerful, light-hearted and safe.', wrong: ['It creates fear and suspense, as if danger were near.', 'It suggests that something terrible is hiding nearby.', 'It makes the scene feel gloomy, cold and lonely.'] },
];

function filmQ(rng: Rng, d: Difficulty) {
  if (d === 1) {
    const isDiegetic = rng.chance(0.5);
    const s = rng.pick(isDiegetic ? DIEGETIC : NON_DIEGETIC);
    return {
      prompt: `Is this sound **diegetic** or **non-diegetic**?\n\n${block(s)}`,
      parts: [part(fixedChoice(['Diegetic: it comes from inside the world of the story', 'Non-diegetic: it is added for the audience only'], isDiegetic ? 0 : 1))],
      hints: ['Ask: could the characters hear this sound? If its source is in the scene, it is diegetic. Background music and a narrator’s voice-over are non-diegetic.'],
      solution: [isDiegetic ? 'The source of the sound is inside the scene, and the characters can hear it, so it is diegetic.' : 'The sound is added for the audience; the characters cannot hear it, so it is non-diegetic.'],
    };
  }
  const e = rng.pick(EDITS);
  if (d === 3) {
    return {
      prompt: `${block(e.text)}\n\nWhy might a director make this choice?`,
      parts: [part(mc(rng, e.effect, e.wrong))],
      hints: ['Think about what the technique does to time, place and mood.'],
      solution: [`This is ${EDIT_NAME[e.edit].toLowerCase()}: ${EDIT_WHAT[e.edit]}.`, e.effect],
    };
  }
  const isLight = e.edit === 'highkey' || e.edit === 'lowkey';
  const pool: Edit[] = isLight ? ['highkey', 'lowkey', 'montage', 'crosscut'] : ['cut', 'crosscut', 'montage', 'fade', 'lowkey'];
  const wrong = rng.shuffle(pool.filter((x) => x !== e.edit)).slice(0, 3);
  return {
    prompt: `${block(e.text)}\n\nWhich film technique is described here?`,
    parts: [part(mc(rng, EDIT_NAME[e.edit], wrong.map((x) => EDIT_NAME[x])))],
    hints: ['Editing joins shots together (cuts, cross-cutting, montages and fades); lighting sets the mood (high-key is bright, low-key is dark).'],
    solution: [`This is ${EDIT_NAME[e.edit].toLowerCase()}: ${EDIT_WHAT[e.edit]}.`],
  };
}

// ============================================================================ lesson 5.3: advertising techniques

type Technique = 'bandwagon' | 'testimonial' | 'glittering' | 'snob' | 'plain' | 'fear' | 'statistics';
const TECHNIQUES: Technique[] = ['bandwagon', 'testimonial', 'glittering', 'snob', 'plain', 'fear', 'statistics'];
const TECHNIQUE_NAME: Record<Technique, string> = {
  bandwagon: 'Bandwagon',
  testimonial: 'Testimonial',
  glittering: 'Glittering generalities',
  snob: 'Snob appeal',
  plain: 'Plain folks',
  fear: 'Fear',
  statistics: 'Statistics',
};
/** The technique with an article, for use in a sentence. */
const TECHNIQUE_A: Record<Technique, string> = {
  bandwagon: 'the bandwagon technique',
  testimonial: 'a testimonial',
  glittering: 'glittering generalities',
  snob: 'snob appeal',
  plain: 'the plain-folks technique',
  fear: 'fear',
  statistics: 'statistics',
};
const TECHNIQUE_WHAT: Record<Technique, string> = {
  bandwagon: 'bandwagon tells you that everyone else is buying or doing it, so you should too',
  testimonial: 'a testimonial has a famous or expert person say they use or recommend the product',
  glittering: 'glittering generalities use vague, attractive words, such as “pure”, “freedom” or “better”, that sound good but say nothing specific',
  snob: 'snob appeal suggests that the product is only for special, wealthy or superior people',
  plain: 'plain folks presents the product, or the person selling it, as ordinary and down-to-earth, just like you',
  fear: 'fear warns that something bad will happen if you do not buy the product',
  statistics: 'statistics use numbers and percentages to make the product sound proven',
};
const TECHNIQUE_WEAKNESS: Record<Technique, string> = {
  bandwagon: 'Popularity does not prove that the product is good.',
  testimonial: 'The famous person may have been paid to praise it, and one person’s word is not evidence that it is any good.',
  glittering: 'The attractive words give no actual facts about the product.',
  snob: 'Being expensive or exclusive does not make the product better.',
  plain: 'Seeming ordinary and friendly is not evidence that what is being sold is any good.',
  fear: 'It exaggerates a danger to make people anxious enough to buy.',
  statistics: 'Numbers sound scientific, but they may come from a small or unfair test run by the company itself.',
};
/** Techniques too close to offer beside each one. */
const TECHNIQUE_NEAR: Record<Technique, Technique[]> = {
  bandwagon: ['statistics'],
  testimonial: ['plain'],
  glittering: ['snob', 'plain'],
  snob: ['glittering'],
  plain: ['testimonial', 'glittering'],
  fear: ['glittering'],
  statistics: ['bandwagon'],
};
const ADS: Record<Technique, string[]> = {
  bandwagon: [
    'Over a million teenagers have already switched to Zing Chat. Don’t be the last one left out!',
    'Everyone’s wearing SnapStep running shoes this season. Join the crowd!',
    'All your friends are drinking FizzUp. What are you waiting for?',
    'The whole town is shopping at Greenleaf Market. Come and see why!',
  ],
  testimonial: [
    '“I never run a race without my Swiftfoot shoes.” — Olympic sprinter Kara Mensah',
    'Award-winning chef Luca Moretti says, “I cook with Golden Grove olive oil at home every day.”',
    'Champion footballer Diego Santos says, “BrightSmile toothpaste gives me a winning smile.”',
    'Famous pop star Lila Chen says, “I can’t start my morning without a cup of Sunrise coffee.”',
  ],
  glittering: [
    'Pure. Natural. Freedom in every bottle. Clearwater Springs.',
    'Brightway: for a better tomorrow.',
    'Sunvale juice: the taste of goodness.',
    'Harmony Bank: built on trust, values and tradition.',
  ],
  snob: [
    'Velvet Reserve watches: for the few who accept nothing less than perfection.',
    'Only the most distinguished travellers stay at the Aurelia Grand.',
    'Not everyone can own a Montclair. Can you?',
    'Silverline Club: membership by invitation only.',
  ],
  plain: [
    'At Miller’s Bakery, we’re just ordinary neighbours baking honest bread, the way our grandparents did.',
    'Candidate Ana Ruiz grew up on a farm, rides the bus to work and shops at the same market you do.',
    'No fancy chefs, no secret formulas: Homestyle soup is made by everyday families for everyday families.',
  ],
  fear: [
    'Is your home protected? Every night without a SafeGuard alarm, you are leaving your family at risk.',
    'Don’t let bad breath ruin your big day. Use MintFresh.',
    'Germs are hiding on every surface in your kitchen. Only CleanAll kills them.',
    'One power cut could wipe out years of photos. Back them up with CloudKeep before it’s too late.',
  ],
  statistics: [
    'In a survey of 500 users, 92 percent said GlowSkin cream made their skin feel softer in two weeks.',
    'Charge+ batteries last up to 40 percent longer than our previous model.',
    'Nine out of ten cat owners in our taste test said their cats preferred Purrfect Bites.',
  ],
};

function adTechniqueQ(rng: Rng, d: Difficulty) {
  const t = rng.pick(TECHNIQUES);
  const ad = rng.pick(ADS[t]);
  const allowed = TECHNIQUES.filter((x) => x !== t && !TECHNIQUE_NEAR[t].includes(x));
  if (d === 3) {
    const wrongWeak = rng.shuffle(allowed).slice(0, 3).map((x) => TECHNIQUE_WEAKNESS[x]);
    return {
      prompt: `${block(ad)}\n\nThis advertisement uses **${TECHNIQUE_A[t]}**. What should a careful reader notice about it?`,
      parts: [part(mc(rng, TECHNIQUE_WEAKNESS[t], wrongWeak))],
      hints: [`Remember: ${TECHNIQUE_WHAT[t]}. Ask what the technique leaves out or hides.`],
      solution: [`${cap(TECHNIQUE_WHAT[t])}.`, TECHNIQUE_WEAKNESS[t]],
    };
  }
  if (d === 2 && rng.chance(0.5)) {
    const wrong = rng.shuffle(allowed).slice(0, 3).map((x) => rng.pick(ADS[x]));
    return {
      prompt: `Which advertisement uses **${TECHNIQUE_A[t]}**?`,
      parts: [part(mc(rng, ad, wrong))],
      hints: [`Remember: ${TECHNIQUE_WHAT[t]}.`],
      solution: [`“${ad}”: ${TECHNIQUE_WHAT[t]}.`, 'Each of the other advertisements uses a different technique.'],
    };
  }
  return {
    prompt: `Which persuasive technique does this advertisement use?\n\n${block(ad)}`,
    parts: [part(mc(rng, TECHNIQUE_NAME[t], rng.shuffle(allowed).slice(0, 3).map((x) => TECHNIQUE_NAME[x])))],
    hints: ['Ask what the advertisement relies on: everyone else, a famous face, vague good words, exclusivity, ordinariness, fear, or numbers?'],
    solution: [`The advertisement uses ${TECHNIQUE_A[t]}: ${TECHNIQUE_WHAT[t]}.`],
  };
}

// ============================================================================ lesson 5.3: target audience

interface TargetAd {
  ad: string;
  audience: string;
  wrong: string[];
  clue: string;
  clueWrong: string[];
  /** Difficulty 3: a change that would suit the audience better, and changes that would not. */
  better: string;
  worse: string[];
}
const TARGET_ADS: TargetAd[] = [
  {
    ad: 'TinyTreads: soft, flexible first shoes that let little feet grow naturally. Machine-washable, because we know how busy you are.',
    audience: 'Parents of toddlers',
    wrong: ['Professional athletes', 'Teenagers', 'Retired people'],
    clue: '“little feet”',
    clueWrong: ['“soft, flexible”', '“Machine-washable”', '“grow naturally”'],
    better: 'Adding that a children’s foot specialist recommends the shoes',
    worse: ['Adding the slogan “Built for extreme sports and serious athletes”', 'Describing the shoes in the slang that teenagers use online', 'Adding a free video game for older players with every pair'],
  },
  {
    ad: 'Level up your game. The NovaPad controller: zero lag, custom buttons and a battery that lasts all night.',
    audience: 'Video game players',
    wrong: ['Parents of babies', 'Gardeners', 'Retired people'],
    clue: '“zero lag”',
    clueWrong: ['“a battery”', '“all night”', '“The NovaPad”'],
    better: 'Adding that a professional gamer uses the NovaPad in tournaments',
    worse: ['Adding a recipe for a quick and healthy dinner for the whole family', 'Showing the controller lying unused on a desk in a quiet library', 'Adding large print so that the advertisement is easier to read'],
  },
  {
    ad: 'Stay sharp in your golden years. BrainBloom puzzle books keep your mind active, with large print that’s easy on the eyes.',
    audience: 'Older adults',
    wrong: ['Toddlers', 'University athletes', 'Teenage gamers'],
    clue: '“golden years”',
    clueWrong: ['“puzzle books”', '“Stay sharp”', '“BrainBloom”'],
    better: 'Showing a grandmother doing a puzzle with her grandchildren',
    worse: ['Adding loud music and the slang that teenagers use online', 'Showing a young skateboarder doing tricks in a city park', 'Promising “extreme difficulty for hardcore players”'],
  },
  {
    ad: 'Exams coming up? StudyBuddy flashcards help you remember more in less time. Free for anyone with a school email address.',
    audience: 'Students preparing for exams',
    wrong: ['Retired people on holiday', 'Parents of newborn babies', 'Owners of small businesses'],
    clue: '“Exams coming up?”',
    clueWrong: ['“remember more”', '“in less time”', '“Free for anyone”'],
    better: 'Adding a quotation from a student whose marks improved after using the cards',
    worse: ['Showing a retired couple relaxing in deckchairs on a luxury cruise ship', 'Using formal business language about “clients” and “quarterly targets”', 'Advertising a special discount this month on baby food and baby clothes'],
  },
  {
    ad: 'TrailPro boots: waterproof, built for rocky ground and tested on the world’s toughest mountain trails.',
    audience: 'Serious hikers',
    wrong: ['Office workers looking for smart shoes', 'Parents of babies', 'Ballet dancers'],
    clue: '“mountain trails”',
    clueWrong: ['“waterproof”', '“built for”', '“tested on”'],
    better: 'Showing a climber wearing the boots on a snowy summit',
    worse: ['Showing the boots polished and shining at a formal dinner party', 'Adding bright cartoon characters to appeal to young children', 'Describing them as “perfect for a long day at the office”'],
  },
  {
    ad: 'Make every client meeting count. The Apex briefcase: slim, smart and built for the busy professional.',
    audience: 'Business professionals',
    wrong: ['Young children', 'Teenage gamers', 'Farmers'],
    clue: '“every client meeting”',
    clueWrong: ['“slim, smart”', '“The Apex”', '“count”'],
    better: 'Showing the briefcase on the desk of a confident manager in a modern office',
    worse: ['Showing the briefcase covered in bright cartoon stickers and glitter', 'Adding the slogan “Perfect for the playground and the school bus”', 'Describing it in the slang that teenagers use when they text'],
  },
  {
    ad: 'Sleep through the night, every night. DreamNest baby monitors let you hear every sound from the nursery, so you can finally rest.',
    audience: 'Parents of babies',
    wrong: ['Teenagers', 'Professional athletes', 'University students'],
    clue: '“the nursery”',
    clueWrong: ['“every night”', '“DreamNest”', '“so you can”'],
    better: 'Adding a review from a mother of twins who says the monitor helped her rest',
    worse: ['Showing the monitor on a shelf in a teenager’s gaming room', 'Describing it in business jargon about “productivity” and “efficiency”', 'Adding a discount on golf clubs and lessons at the local course'],
  },
  {
    ad: 'Retire to the coast. Seaview Gardens offers homes with no stairs, a doctor on site and weekly card tournaments.',
    audience: 'People who are retiring',
    wrong: ['University students', 'Young families with babies', 'Teenagers'],
    clue: '“Retire to the coast”',
    clueWrong: ['“on site”', '“Seaview Gardens”', '“offers homes”'],
    better: 'Showing a retired couple enjoying a walk along the seafront',
    worse: ['Adding a skate park and late-night music festivals', 'Advertising the nightclubs nearby that stay open until dawn', 'Promising “the best student parties in town, every weekend”'],
  },
];

function adAudienceQ(rng: Rng, d: Difficulty) {
  const a = rng.pick(TARGET_ADS);
  if (d === 3) {
    return {
      prompt: `${block(a.ad)}\n\nThis advertisement is aimed at **${a.audience.toLowerCase()}**. Which change would appeal to that audience most?`,
      parts: [part(mc(rng, a.better, a.worse))],
      hints: ['Think about what the target audience cares about, and which change speaks to that.'],
      solution: [`${a.better} speaks to what ${a.audience.toLowerCase()} care about.`, 'The other changes would suit a different audience, or none at all.'],
    };
  }
  if (d === 2) {
    return {
      prompt: block(a.ad),
      parts: [
        part(mc(rng, a.audience, a.wrong), { label: 'Who is the target audience?' }),
        part(mc(rng, a.clue, a.clueWrong), { label: 'Which detail shows the target audience most clearly?' }),
      ],
      hints: ['Look at the words that speak directly to one group of people: their age, their worries or their interests.'],
      solution: [`The detail ${a.clue} speaks directly to ${a.audience.toLowerCase()}.`],
    };
  }
  return {
    prompt: `Who is the target audience of this advertisement?\n\n${block(a.ad)}`,
    parts: [part(mc(rng, a.audience, a.wrong))],
    hints: ['Ask who would need or want this product, and who the words are speaking to.'],
    solution: [`The words ${a.clue} show that the advertisement is aimed at ${a.audience.toLowerCase()}.`],
  };
}

const L1 = 'e10-5-1';
const L2 = 'e10-5-2';
const L3 = 'e10-5-3';

export const MEDIA_SKILLS: SkillDef[] = [
  skill({
    id: 'e10-visual-elements',
    name: 'Elements of an image',
    description: 'Describe an image’s focal point, foreground and background, and composition: leading lines, framing, the rule of thirds, contrast and symmetry.',
    outcomes: ['10-E1'],
    lessonId: L1,
    format: 'mc',
    gen: visualElementsQ,
  }),
  skill({
    id: 'e10-visual-effect',
    name: 'Effects of visual choices',
    description: 'Explain the effect of colour, light, space and viewpoint on the viewer, and choose the visual choice that suits a purpose.',
    outcomes: ['10-E1'],
    lessonId: L1,
    format: 'mc',
    gen: visualEffectQ,
  }),
  skill({
    id: 'e10-camera-shots',
    name: 'Camera shots, angles and movements',
    description: 'Identify camera shots, angles and movements and their usual effects, and choose the right one for a purpose.',
    outcomes: ['10-E1'],
    lessonId: L2,
    format: 'mc',
    gen: cameraQ,
  }),
  skill({
    id: 'e10-film-techniques',
    name: 'Sound, editing and lighting in film',
    description: 'Tell diegetic from non-diegetic sound, recognize cuts, cross-cutting, montages, fades and high- and low-key lighting, and explain their effects.',
    outcomes: ['10-E1'],
    lessonId: L2,
    format: 'mc',
    gen: filmQ,
  }),
  skill({
    id: 'e10-ad-techniques',
    name: 'Advertising techniques',
    description: 'Identify bandwagon, testimonial, glittering generalities, snob appeal, plain folks, fear and statistics in advertisements, and see what each leaves out.',
    outcomes: ['10-E1'],
    lessonId: L3,
    format: 'mc',
    gen: adTechniqueQ,
  }),
  skill({
    id: 'e10-ad-audience',
    name: 'Target audience of an advertisement',
    description: 'Identify an advertisement’s target audience and the details that reach it, and choose changes that would appeal to it.',
    outcomes: ['10-E1'],
    lessonId: L3,
    format: 'mc',
    gen: adAudienceQ,
  }),
];
