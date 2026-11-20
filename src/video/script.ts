/**
 * Explainer video scripts. A script is a list of scenes. Each scene puts elements on the stage, and
 * the narrator reads its lines; each line can show, highlight or hide elements as it is spoken. The
 * build (video/build.ts) voices every line, so all timing comes from the narration, then renders
 * the frames, captions and thumbnail. Scripts live in src/content/<course>/videos/<lesson>.ts.
 *
 * Elements are addressed by id; a part of an element by "id.part": a line, bullet or table row by
 * its index ("steps.0"), a triangle's sides and angles by name ("tri.opp"), a diagram's parts by
 * their ids ("d.sight"). Showing an element shows all of it; showing a part shows the element with
 * just that part, so a list of parts can be revealed one at a time. Hiding an element hides all of
 * it; hiding a part that was shown on its own hides just that part (to swap one label for another).
 */

import { checkPath, type MotionPath } from './path.ts';

export type { MotionPath };

import { checkAtoms } from './atoms.ts';
import { checkMolecules } from './molecules.ts';
import { checkScatter } from './scatter.ts';

/** The name on every frame, thumbnail and YouTube description. */
export const BRAND = 'Gradileo';

/** Colours with a fixed meaning in every video (trigonometry uses the first four). */
export type Tone = 'theta' | 'opp' | 'adj' | 'hyp' | 'brand' | 'good' | 'bad';

export interface TitleEl {
  kind: 'title';
  id: string;
  kicker: string;
  title: string;
  subtitle?: string;
}

/** A paragraph of Markdown with $inline maths$. */
export interface TextEl {
  kind: 'text';
  id: string;
  md: string;
  size?: 'xl' | 'lg' | 'md';
  align?: 'left' | 'center';
}

/**
 * A quotation set off from the narration: a passage of prose or verse, one entry per line (each
 * Markdown), with an optional attribution under it. Lines can be shown one at a time ("q.0").
 */
export interface QuoteEl {
  kind: 'quote';
  id: string;
  lines: string[];
  /** Who wrote or said it and where, shown under the quotation ("Emily Dickinson, 1891"). */
  by?: string;
  size?: 'lg' | 'md';
}

/** Display maths, one line per step. */
export interface MathEl {
  kind: 'math';
  id: string;
  lines: string[];
  size?: 'xl' | 'lg' | 'md';
  align?: 'left' | 'center';
}

export interface BulletsEl {
  kind: 'bullets';
  id: string;
  items: string[];
  /** Ticks instead of dots (for summaries). */
  check?: boolean;
}

export interface CalloutEl {
  kind: 'callout';
  id: string;
  tone: 'definition' | 'mistake' | 'tip' | 'key';
  title: string;
  md: string;
}

export interface TableEl {
  kind: 'table';
  id: string;
  head: string[];
  rows: string[][];
}

/** The parts of a right triangle, named from the angle θ. */
export type TriPart = 'theta' | 'other' | 'opp' | 'adj' | 'hyp';

/**
 * A right triangle with θ at the bottom left, the right angle at the bottom right and the other
 * angle at the top. Parts: shape, theta, other, opp, adj, hyp.
 */
export interface TriangleEl {
  kind: 'triangle';
  id: string;
  /** Lengths used for drawing (adjacent along the bottom, opposite up the right side). */
  adj: number;
  opp: number;
  /** TeX labels for the sides and angles. */
  labels?: Partial<Record<TriPart, string>>;
  /** Vertex names: [θ vertex, right-angle vertex, other vertex]. */
  vertices?: [string, string, string];
  /** Draw the triangle in a setting: a ramp, a tree, a ladder against a wall, a building. */
  setting?: 'ramp' | 'tree' | 'ladder' | 'building';
  /** Reflect left to right, so θ is at the bottom right. */
  mirror?: boolean;
}

/** Similar right triangles side by side, all with the same angle θ. Parts: "0", "1", "2"… */
export interface SimilarEl {
  kind: 'similar';
  id: string;
  /** θ in degrees. */
  angle: number;
  /** The adjacent side of each triangle. */
  sizes: number[];
  /** Decimal places for the side labels. */
  decimals?: number;
}

/** A calculator screen: the keys are typed out, then the result appears. */
export interface CalcEl {
  kind: 'calc';
  id: string;
  keys: string;
  result: string;
}

/**
 * "Your turn": a question the viewer tries while the video counts down. In Gradileo the player
 * pauses here and asks the question; the answer is shown with the part "answer".
 */
export interface TryEl {
  kind: 'try';
  id: string;
  prompt: string;
  choices?: string[];
  /** The correct choice (its index) or the answer as text. */
  answer: number | string;
  /** How the answer is worked out, shown with "answer". */
  working?: string;
  /** The card's heading; "Your turn" when left out (an exam video says "The question"). */
  kicker?: string;
}

/** A colour for a diagram part: a fixed video colour, white ink, or muted grey. */
export type DiagramTone = Tone | 'ink' | 'muted';

/** Scenery drawn behind a diagram's lines (see DiagramThing). */
export type ThingType = 'ground' | 'water' | 'cliff' | 'tower' | 'lighthouse' | 'building' | 'flagpole' | 'tree' | 'person' | 'boat';

/** Where a label sits beside a point. */
export type Place = 'above' | 'below' | 'left' | 'right' | 'above left' | 'above right' | 'below left' | 'below right' | 'center';

/**
 * A part of a diagram. Every part has an id, so a line can show or emphasise it ("d.sight"), and
 * names the points it uses. Parts are drawn in order, so list scenery first. A part in a `group`
 * also appears, and is emphasised, with its group ("d.shape" shows every edge of a solid).
 */
export type DiagramItem = (
  /**
   * A straight line from one point to another, drawn on from `from`. Its label sits beside its
   * middle (or at `labelAt`, 0 to 1 along it), away from the middle of the diagram unless `labelSide`
   * says which side, looking from `from` to `to`. `weight` sets its thickness in pixels.
   */
  | { kind: 'line'; id: string; from: string; to: string; tone?: DiagramTone; dashed?: boolean; label?: string; labelSide?: 'left' | 'right'; labelAt?: number; weight?: number; /** An arrowhead at `to`. */ arrow?: boolean }
  /**
   * A curve through points (the edge of a cylinder, a sphere's outline), drawn on in order, and
   * joined back to the start when `closed`. Labels as for a line, `labelAt` measured along it.
   */
  | { kind: 'curve'; id: string; points: string[]; closed?: boolean; tone?: DiagramTone; dashed?: boolean; label?: string; labelSide?: 'left' | 'right'; labelAt?: number; weight?: number }
  /**
   * The angle at `at` between the directions to `from` and `to` (the smaller one), with a label on
   * its bisector, or at `labelAt` (0 to 1 from `from` to `to`; beyond 1 places it outside, for an
   * angle that contains a smaller one).
   */
  | { kind: 'angle'; id: string; at: string; from: string; to: string; tone?: DiagramTone; label?: string; /** Arc radius in pixels. */ r?: number; /** Label distance from the vertex in pixels. */ labelDist?: number; labelAt?: number }
  /** A right-angle mark at `at`, between the directions to `from` and `to`. */
  | { kind: 'right'; id: string; at: string; from: string; to: string }
  /** A shaded polygon, such as the triangle being solved; `shade` is its opacity (0.1 by default). */
  | { kind: 'region'; id: string; points: string[]; tone?: DiagramTone; shade?: number }
  /** A label (TeX) beside a point (or on it, with `place: 'center'`); a point's name, with a dot when `dot` is set (hollow when `open`). */
  | { kind: 'label'; id: string; at: string; tex: string; tone?: DiagramTone; place?: Place; dot?: boolean; /** With `dot`, a hollow dot (an endpoint not included). */ open?: boolean }
  /**
   * Scenery. Ground and water run across the diagram at the height of `at`. A cliff, tower,
   * lighthouse, building, flagpole or tree stands on `at` and reaches `top`; a cliff or building
   * extends to the `side` of that line. A person stands on `at` with their eyes at `top`. A boat
   * floats at `at`.
   */
  | { kind: 'thing'; id: string; type: ThingType; at: string; top?: string; side?: 'left' | 'right'; /** Width in diagram units (cliff, building). */ width?: number }
) & { group?: string };

/**
 * A diagram drawn to scale from named points (x to the right, y up, in any unit): lines, angles,
 * labels and scenery such as a cliff and a boat. It fits the space it is given; `height` sets
 * that space in stage pixels.
 */
export interface DiagramEl {
  kind: 'diagram';
  id: string;
  points: Record<string, [number, number]>;
  items: DiagramItem[];
  height?: number;
}

/**
 * A picture of Gradileo itself in a browser window, for videos about the platform: a shot that
 * video/tools/screens.ts takes from the demo (video/out/screens/<shot>.png). Its `spots` are parts
 * of the page that the tool finds by name (a button, a panel); a line emphasises one to ring it and
 * dim the rest of the picture (focus: "app.draft"), and the ring moves on with the emphasis.
 */
export interface ScreenEl {
  kind: 'screen';
  id: string;
  /** The shot's name in video/tools/screens.ts. */
  shot: string;
  /** The address in the window's bar, such as "gradileo.com/t/c/…". */
  url: string;
  /** The part of the page to show, in the shot's pixels: x, y, width, height. All of it by default. */
  view?: [number, number, number, number];
  /** The shot's spots that lines point at. */
  spots?: string[];
  /** Height on the stage in pixels; it fills its column otherwise. */
  height?: number;
}

/** A body in a motion element: a block that slides, a cart that rolls or a ball. */
export interface MotionBody {
  id: string;
  shape: 'block' | 'cart' | 'ball';
  /** Mass in kilograms: it sets the acceleration a force gives, and the momentum. */
  mass: number;
  /** What is written on the body ("2 kg" from its mass otherwise). */
  label?: string;
  /** Where its centre starts, in metres along the track. */
  x: number;
  /** Its starting velocity in metres per second (to the right is positive); at rest otherwise. */
  v?: number;
  /** Its length in metres (0.9 for a block, 1.1 for a cart, 0.6 for a ball). */
  width?: number;
  tone?: Tone;
  /** The track it is on, counted from the top (0 by default). */
  lane?: number;
  /**
   * A wall, or anything else that stays where it is: a block drawn as a tall hatched slab, with no
   * velocity label and no momentum bar. Give it a very large mass (a million kilograms), so that
   * a ball that bounces off it leaves it at rest.
   */
  fixed?: boolean;
}

/**
 * A force on a body, drawn as an arrow from the body whose length is its size. Forces along the
 * track (the default) accelerate the body: a = F ÷ m from the sum of them. Vertical forces
 * (weight, the normal force) are drawn but must balance.
 */
export interface MotionForce {
  on: string;
  /** Its name beside the arrow ("Push"); the size in newtons is added. */
  name: string;
  /** Newtons, signed: to the right or up is positive. */
  n: number;
  axis?: 'x' | 'y';
  tone?: Tone;
  /**
   * Friction, or any force that only resists motion: it acts while the body moves and stops with
   * it, so a body slowed to rest stays at rest.
   */
  resist?: boolean;
  /** Acts, but no arrow is drawn (the forces of a collision too quick to read at full speed). */
  hidden?: boolean;
  /**
   * Air resistance: newtons for each metre per second of the body's velocity, acting against its
   * motion (`n` is not used; give 0). It grows as the body speeds up, so a falling body settles
   * at the terminal velocity where it equals the other forces. Not for a body that also has
   * friction (`resist`) on it.
   */
  drag?: number;
  /**
   * A force that changes as the body moves: its size in newtons at distances from where the body
   * started, in metres, as [distance, newtons] points joined by straight lines (it stays at the
   * last value beyond the last point). `n` is not used (give 0). The work it does is the area
   * under these points, which a force-displacement graph (`graph: { y: 'force' }`) fills in.
   */
  profile?: Array<[number, number]>;
  /**
   * A force that changes with time: it goes steadily from `n` at the start of the phase to this
   * many newtons at its end. A force that rises to a peak and falls again takes two phases. On a
   * force-time graph (`graph: { y: 'impulse' }`) it is a sloping line. Not for friction, air
   * resistance or a force with a `profile`.
   */
  to?: number;
}

/**
 * A spring on a straight track, between a wall and one body. It obeys Hooke's law: it pulls or
 * pushes the body towards the place where it has its natural length, with k newtons for each metre
 * of extension, in every phase (it is not listed among a phase's forces). It is drawn as a coil
 * from the wall at the left end of the track, with its force as an arrow named "Spring". Over a
 * drop (`vertical: true`) it hangs from a beam at the top instead, and `rest` is how far down the
 * foot of the body is when the spring has its natural length.
 */
export interface MotionSpring {
  /** The body on its end. */
  on: string;
  /** The spring constant, in newtons per metre. */
  k: number;
  /** Where the centre of the body is when the spring has its natural length, in metres along the track. */
  rest: number;
  /** Not tied to the body: it pushes while it is compressed and never pulls, so the body leaves it at its natural length (a launcher). */
  loose?: boolean;
  /** Decimal places of the extension that is written under the track (2 by default). */
  decimals?: number;
  /** Its force acts, but no arrow is drawn for it (a video that describes an oscillation before its forces are taught). */
  hidden?: boolean;
}

/** A stretch of a clip during which the same forces act. */
export interface MotionPhase {
  /** How long it lasts, in seconds of the motion's own time. */
  dur: number;
  /** Slow motion: seconds of video for each second of the motion (1 by default; 0.5 plays it twice as fast). */
  slow?: number;
  /**
   * Hold the motion still for `dur` seconds of video while the forces appear, to name them before
   * anything moves. Nothing is worked out from the forces of a frozen phase.
   */
  freeze?: boolean;
  forces?: MotionForce[];
  /** Velocities given at the start of the phase, in metres per second, by body id. */
  set?: Record<string, number>;
  /** A flash where these two bodies touch, as the phase starts (a collision). */
  contact?: [string, string];
  /** A short note shown over the track ("Slow motion"). */
  note?: string;
}

export interface MotionClip {
  phases: MotionPhase[];
  /** Put every body back at its start first (to play the motion again). */
  reset?: boolean;
}

/** What a motion element can show over its bodies; each is a part ("sim.velocity"). */
export const MOTION_PARTS = ['velocity', 'readout', 'net', 'bars', 'total', 'clock', 'strobe', 'graph', 'distance', 'displacement', 'energy', 'height', 'extension', 'amplitude', 'count', 'restoring', 'length'] as const;

/**
 * An energy bar of a motion element: the work done on the body by the forces pushing or lifting
 * it, its kinetic energy, its gravitational potential energy, the elastic potential energy of the
 * spring it is on, the energy that friction and air resistance have turned to heat, and the total
 * of the last four.
 */
export type EnergyBar = 'work' | 'kinetic' | 'potential' | 'elastic' | 'heat' | 'total';

/**
 * Bodies moving along straight tracks under forces, for the physics videos: the motion is worked
 * out from the forces drawn (a = F ÷ m), so what the viewer sees is what the physics says. A line
 * plays a clip (`play: 'sim.push'`) and the bodies move while the narrator speaks; the next clip
 * carries on from where the last one ended. Showing the element shows the tracks and bodies;
 * showing a part adds it: `velocity` (an arrow over each body), `readout` (speed and acceleration
 * under it), `net` (the net force), `bars` (a momentum bar for each body), `total` (a bar for
 * their total momentum), `graph` (a velocity-time, distance-time or position-time graph that draws itself as the
 * bodies move), `clock` and `strobe` (a mark at each body's place at equal time steps),
 * `distance` (how far each body has travelled, with its path drawn under a single track),
 * `displacement` (an arrow under a single track from where the body started to where it is now),
 * `energy` (the energy bars of `energy`; the bar for the total comes with `total`) and `height`
 * (how high a body on a curved track is). Emphasising a body's id makes it glow. See
 * src/video/motion.ts.
 */
export interface MotionEl {
  kind: 'motion';
  id: string;
  /** The stretch of track shown, in metres: [left, right]. */
  span: [number, number];
  /** One entry per track, top to bottom (one smooth track otherwise); a label sits at its top left, or right. */
  lanes?: Array<{ surface?: 'smooth' | 'rough'; label?: string; labelSide?: 'left' | 'right' }>;
  bodies: MotionBody[];
  clips: Record<string, MotionClip>;
  /** Pixels of arrow for each newton (4 by default). */
  forceScale?: number;
  /** Pixels of arrow for each metre per second (24 by default). */
  velocityScale?: number;
  /** The largest momentum the bars must fit, in kg·m/s; the bars are given room when it is set. */
  momentumMax?: number;
  /**
   * The most negative momentum the bars must fit (a number below zero), for bodies that move to
   * the left: the zero line then sits part way along, and a negative bar grows to its left.
   */
  momentumMin?: number;
  /** `false` when the total's bar is never shown, so no room is kept for it. */
  momentumTotal?: boolean;
  /**
   * A graph of these bodies against time, above a single track on its right: `seconds` and `max`
   * are the lengths of its axes, and `min` (below zero) lets the line go under the time axis. It
   * plots velocity (in metres per second) unless `y` is `'distance'`, the distance travelled in
   * metres, or `'position'`, where the body is on the track's ruler. With `y: 'force'` it is a
   * force-displacement graph of one body instead: the force named in `force` (the body's first
   * force with a `profile` otherwise, or the spring's) against the distance moved, or against the
   * extension of the spring. `metres` is then the length of its displacement axis (`seconds` is
   * not used; give 0), the area under the line fills in as the body moves, and the work done so
   * far is written over it (`area` renames it: "Energy stored"). With `y: 'impulse'` it is a
   * force-time graph of one body: the force named in `force` (the net force along the track
   * otherwise) against time, with `max` in newtons. The area under the line fills in while the
   * force acts, and the impulse so far (that area, in N·s) is written over it. `ms: true` numbers
   * the time axis of any of these graphs in milliseconds, for a collision (`seconds` stays in
   * seconds: 0.006 for six milliseconds).
   */
  graph?: { of: string[]; seconds: number; max: number; min?: number; y?: 'velocity' | 'distance' | 'position' | 'displacement' | 'force' | 'impulse'; metres?: number; force?: string; area?: string; ms?: boolean };
  /** A spring between the wall at the left end of a single straight track and one of the bodies. */
  spring?: MotionSpring;
  /**
   * For an oscillation on a single straight track or over a single drop: where the body rests, in
   * metres along the track. Displacement is then measured from here and not from where the body
   * started (over a drop, upwards is positive), the ruler is numbered from here, the part
   * `displacement` is an arrow from here to the body, `amplitude` marks the two extremes of the
   * motion, and `graph: { y: 'displacement' }` traces the displacement against time. The part
   * `count` (also for a pendulum) counts the complete oscillations of a body let go from rest.
   */
  equilibrium?: number;
  /** Write the displacements of an oscillation in centimetres, or the height of a pendulum's bob (beside the bob, for a small rise). */
  cm?: boolean;
  /** Decimal places of the velocities written over the bodies (1 by default); from 10 m/s up they keep one place. */
  velocityDecimals?: number;
  /** Say "speed" instead of "v =" beside the velocity arrow, for videos that come before velocity is taught. */
  speedWord?: boolean;
  /**
   * A sketch, not a measurement: the tracks have no ruler, a force is named without its size, and a
   * ball carries its label inside it and does not roll (two charges that repel or attract).
   */
  plain?: boolean;
  /**
   * A drop: the tracks point down the screen, one column for each lane with the ground at its
   * foot. A body's `x` is then the distance it has fallen in metres and `span` the fall shown, so
   * weight is a force with a positive `n` (drawn downwards) and air resistance points up. The
   * parts are `velocity`, `readout`, `net`, `clock`, `strobe` and `graph` (with one column).
   * With `'up'`, for lifting, a body's `x` is its height above the ground instead: up is positive,
   * so weight is a force with a negative `n`.
   */
  vertical?: boolean | 'up';
  /**
   * A curved track instead of a straight one: a hill through given points, or the arc of a
   * pendulum. A body's `x` is then its distance along the track in metres (from the left end of a
   * hill, or from the lowest point of a pendulum's swing), and gravity pulls it along the slope.
   * One lane; the parts are `velocity`, `energy`, `total`, `height`, `clock` and `count` (the
   * complete swings so far), and for a pendulum `length` (the length of its string, written beside
   * it) and `restoring` (the weight of the bob, and the part of it along the swing that pulls the
   * bob back: `forceScale` is the pixels to a newton).
   */
  path?: MotionPath;
  /**
   * Energy bars for the bodies listed in `of` (the first body otherwise): `bars` lists the bars
   * in order, and `max` is the largest energy one must fit, in joules. Gravitational potential
   * energy is m × g × height, with the height measured from the ground of a drop or a lift (and
   * `g` given here), or from the zero of a curved track's points (with the path's own g). The
   * force named "Weight" is gravity: its work is the change in potential energy, and is not
   * counted as work done on the body. `names` renames a bar ("Energy supplied" for the work), and
   * with several bodies `labels` names each one in front of its bars (its own label otherwise).
   * `system` adds bars for the bodies in `of` taken together, under the part `total`: `'kinetic'`
   * is their total kinetic energy, and `'lost'` is how much less that is than at the start (the
   * kinetic energy a collision has turned to heat and sound).
   */
  energy?: { of?: string[]; max: number; bars: EnergyBar[]; g?: number; names?: Partial<Record<EnergyBar, string>>; labels?: Record<string, string>; system?: Array<'kinetic' | 'lost'> };
  /** Seconds between strobe marks (0.5 by default). */
  strobe?: number;
  /** For the thumbnail: the clip to show, part way through. */
  poster?: string;
  height?: number;
}

/** One wave of a `wave` element, on its own strip. */
export interface WaveLane {
  id: string;
  /**
   * `transverse`: the points of a rope move up and down as the wave runs along it. `longitudinal`:
   * particles move back and forth along the line of travel, as in sound or a pulse on a spring.
   */
  kind: 'transverse' | 'longitudinal';
  /** A label at the strip's top left. */
  label?: string;
  /** Waves sent out each second, in hertz. */
  frequency: number;
  /** The amplitude, in the element's `amplitudeUnit`. */
  amplitude: number;
  /** How fast the wave travels, in metres per second: the wavelength is the speed ÷ the frequency. */
  speed: number;
  /** The wave already fills the strip when it first appears; otherwise it starts at the source and runs in. */
  full?: boolean;
  /**
   * The wave bounces back from the right end of the strip, and the two add up: `true` for a fixed
   * end (a wall, a cliff), which turns the wave over, and `'free'` for a free end (a ring that
   * slides on a pole), which sends it back the same way up.
   */
  reflect?: boolean | 'free';
  /**
   * Single pulses, instead of a steady wave or as well as one. A lane of pulses alone has a
   * frequency of 0, and its `amplitude` is the height of its tallest pulse. Pulses that meet add
   * up, and pass through each other.
   */
  pulses?: WavePulse[];
  /**
   * Another medium from `from` metres on (a heavier rope tied on), where the wave travels at this
   * speed: the frequency stays the same, and the wavelength changes with the speed. A pulse is
   * partly reflected at the join (turned over when the second medium is the slower one) and
   * partly sent on. A steady wave is drawn without its reflected part, so that its wavelength can
   * be read on each side. Transverse lanes only.
   */
  medium?: { from: number; speed: number };
  /**
   * A standing wave instead of a travelling one. On a transverse lane, a string fixed at both ends
   * with this many `loops`. On a longitudinal lane, the air in a tube that is closed at the left
   * end and open at the right, holding this many `quarters` of a wavelength (1, 3, 5, …).
   * `length` is the length of the string or the air column in metres, from the left end (the
   * whole strip otherwise). The lane's `frequency` must be the one that fits: loops × speed ÷ 2L,
   * or quarters × speed ÷ 4L.
   */
  standing?: {
    loops?: number;
    quarters?: number;
    length?: number;
    /**
     * For an air column: how far beyond the open end of the tube the antinode sits, in metres (0
     * otherwise). The standing wave is `length + beyond` long, so a real tube resonates when it
     * is a little shorter than a quarter of a wavelength.
     */
    beyond?: number;
  };
  tone?: Tone;
}

/** A single pulse on a lane of a `wave` element. */
export interface WavePulse {
  /** How high its middle is, in the element's amplitude unit: negative for a trough. */
  height: number;
  /** How long it is, in metres (a tenth of the strip otherwise). */
  width?: number;
  /**
   * When it starts to leave its end, in seconds of the wave's own time (0 otherwise). It may be
   * as early as minus half its length ÷ the speed, so that its middle leaves as the clock starts:
   * the `front` marker and the clock then give the distance and the time of an echo exactly.
   */
  at?: number;
  /** `'right'`: it comes in from the right end and travels left. From the left end otherwise. */
  from?: 'left' | 'right';
  tone?: Tone;
}

/** A stretch of a wave clip. */
export interface WavePhase {
  /** How long it lasts, in seconds of the wave's own time. */
  dur: number;
  /** Slow motion: seconds of video for each second of the wave (1 by default). */
  slow?: number;
  /** New settings for a lane's source as the phase starts, by lane id: the change travels in from the source. */
  set?: Record<string, { frequency?: number; amplitude?: number }>;
  /** A short note shown over the wave ("Slow motion"). */
  note?: string;
}

export interface WaveClip {
  phases: WavePhase[];
  /** Start every wave again from the beginning first. */
  reset?: boolean;
}

/** What a wave element can show over its waves; each is a part ("w.wavelength"). */
export const WAVE_PARTS = ['particle', 'amplitude', 'wavelength', 'count', 'speed', 'frequency', 'front', 'labels', 'clock', 'pulses', 'sum', 'heights', 'pull', 'motion', 'nodes', 'loop', 'length'] as const;

/**
 * Travelling waves, for the physics videos: each lane is a strip with a source at its left end,
 * and what the source does travels along the strip at the wave's speed (src/video/wave.ts). The
 * waves run only while a clip plays (`play: 'w.go'`), and the next clip carries on from where the
 * last one stopped, so a wave can be frozen to measure it. Showing the element shows the strips;
 * showing a part adds it: `particle` (one marked point of each wave and the line it keeps to, to
 * see that it only moves about its own place), `amplitude` and `wavelength` (measured on the wave
 * as it stands), `count` (a post at the mark, with the complete waves that have passed it),
 * `speed` (an arrow with the wave's speed), `frequency` (the source's frequency, under it), `front`
 * (a marker on the front of a wave that started at the source, with how far it has travelled), `labels` (the names of a longitudinal wave's
 * compressions and rarefactions, or a transverse wave's crests and troughs) and `clock`. Where
 * pulses meet: `pulses` (the outline of each pulse on its own, under the rope that carries their
 * sum), `sum` (the displacement of the rope where it is largest) and `heights` (the height of each
 * hump on the rope, with its sign, for what a join or an end has made of a pulse). At a fixed end,
 * `pull` shows the pair of forces there: the rope's pull on the wall, and the wall's on the rope;
 * `motion` puts an arrow on the points of a rope for how fast each is moving, up or down. On a standing wave, or a
 * steady wave that meets its own reflection: `nodes` (the points that never move, and the points
 * half way between them that move the most), `loop` (the length of one loop, node to node) and
 * `length` (the length of a standing wave's string, in metres, or of its tube, in centimetres).
 * Emphasising a lane's id makes it glow.
 */
export interface WaveEl {
  kind: 'wave';
  id: string;
  /** The stretch shown, in metres: [left, right]. The sources are at the left. */
  span: [number, number];
  lanes: WaveLane[];
  clips: Record<string, WaveClip>;
  /** Where the marked point and the counting post are, in metres (the middle otherwise). */
  mark?: number;
  /** What the marked point is called ("a leaf"). */
  markLabel?: string;
  /** The unit amplitudes are given and written in ("cm"; metres otherwise). */
  amplitudeUnit?: string;
  /** `false` leaves out the ruler of distance under the strips. */
  ruler?: boolean;
  /** `false` leaves the sizes off the amplitude and the wavelength, for a picture that is not to scale. */
  values?: boolean;
  /** A clock in another unit: its name, and how many seconds one of it is ({ unit: 'ms', seconds: 0.001 }). */
  clock?: { unit: string; seconds: number };
  /** For the thumbnail: the clip to show, part way through. */
  poster?: string;
  height?: number;
}

/** A source of circular waves in a `ripples` element. */
export interface RippleSource {
  id: string;
  /** What it is called in the picture ("Speaker A"). */
  label?: string;
  /** Where it is at time 0, in metres: [x, y]. */
  at: [number, number];
  /** Waves sent out each second. */
  frequency: number;
  /**
   * Its velocity in metres per second, [vx, vy]: the crests ahead of a moving source are crowded
   * together. It must be slower than the waves when the element has listeners; without them a
   * faster source can be drawn, with its crests overlapping along a shock wave behind it.
   */
  velocity?: [number, number];
  /** Which side of it the label goes (above otherwise). */
  side?: 'above' | 'below' | 'left' | 'right';
  tone?: Tone;
}

/** Someone, or something, that receives the waves of a `ripples` element. */
export interface RippleListener {
  id: string;
  label?: string;
  /** Where it starts, in metres: [x, y]. */
  at: [number, number];
  /** Which side of it the label goes (above otherwise). */
  side?: 'above' | 'below' | 'left' | 'right';
}

/** A stretch of a ripples clip. */
export interface RipplePhase {
  /** How long it lasts, in seconds of the waves' own time. */
  dur: number;
  /** Slow motion: seconds of video for each second of the waves (1 by default). */
  slow?: number;
  /** Listeners that walk to a new place during the phase, by id: [x, y] in metres. */
  move?: Record<string, [number, number]>;
  /** A short note shown over the picture while the phase plays ("Slow motion"). */
  note?: string;
}

export interface RippleClip {
  phases: RipplePhase[];
  /** Start again from time 0, with the listeners back where they began. */
  reset?: boolean;
}

export const RIPPLES_PARTS = ['paths', 'difference', 'traces', 'loudness', 'pattern', 'wavelength', 'centres', 'heard', 'velocity', 'count', 'clock'] as const;

/**
 * Waves seen from above, spreading in circles from their sources (src/video/ripples.ts): each
 * crest is a circle that grows at the speed of the waves, centred where its source was when it
 * left. Two sources in step show interference, and a source that moves shows the Doppler effect.
 * The waves run only while a clip plays, and the next clip carries on from where the last one
 * stopped. Showing the element shows the crests, the sources and the listeners; showing a part
 * adds it: `paths` (a line from each source to the first listener, with its length), `difference`
 * (the path difference there, in metres and in wavelengths), `traces` (the wave that arrives from
 * each source and their sum, against time), `loudness` (how large the sum is, as a bar, with
 * "Loud" or "Quiet"), `pattern` (the whole picture shaded by how large the waves are when they
 * are added: bright where they arrive in step), `wavelength` (measured between two crests: ahead
 * of a moving source and behind it), `centres` (a dot where the source was when it sent each
 * crest), `heard` (the frequency each listener receives from a source that moves), `velocity`
 * (an arrow on a moving source, with its speed), `count` (the crests each listener has received
 * since the start) and `clock`. When the picture leaves 380 pixels or more beside it and there
 * is a listener, the picture sits on the left and `paths`, `difference`, `traces` and `loudness`
 * are written in a panel on the right. Emphasising a source's id makes its crests glow.
 */
export interface RipplesEl {
  kind: 'ripples';
  id: string;
  /** The region shown, in metres: [left, bottom, right, top]. */
  view: [number, number, number, number];
  /** The speed of the waves, in metres per second. */
  speed: number;
  sources: RippleSource[];
  listeners?: RippleListener[];
  /** The waves have been spreading for ever, so they fill the picture from the start (otherwise the sources start at time 0). */
  full?: boolean;
  /** Draw only one crest in every so many, where the wavelength is too short for the picture. */
  every?: number;
  /** A clock in another unit: its name, and how many seconds one of it is ({ unit: 'ms', seconds: 0.001 }). */
  clock?: { unit: string; seconds: number };
  clips: Record<string, RippleClip>;
  /** For the thumbnail: the clip to show, part way through. */
  poster?: string;
  height?: number;
}

/** A temperature for a particle box: a number, or the usual one for a state. */
export type Temp = number | 'solid' | 'liquid' | 'gas';

/** One box of particles in a `particles` element. */
export interface ParticleBox {
  id: string;
  /** How the particles start: in rows (solid), packed at the bottom (liquid) or through the box (gas). */
  state: 'solid' | 'liquid' | 'gas';
  /** How many particles (30 by default). */
  n?: number;
  /**
   * Several kinds of particle (a mixture, or two gases side by side), each with its count and
   * colour, how strongly its particles attract one another (`bond`, 1 by default: 2.5 makes a
   * solid that stays solid in a hot liquid) and how strongly gravity pulls it (`heavy`, 1). A kind
   * can be bigger or smaller (`size`, its diameter, 1 by default: sand grains held back by a
   * filter), pulled by a magnet (`magnetic`), or carried up a paper strip by the solvent (`rise`,
   * how fast compared with the solvent itself, 0 to 1). A kind's `mass` (1 by default) sets how
   * fast it moves at a given temperature: every kind gets the same energy, so a kind 16 times as
   * heavy moves a quarter as fast (oxygen beside hydrogen).
   */
  kinds?: Array<{ n: number; tone?: Tone; name?: string; bond?: number; heavy?: number; mass?: number; size?: number; magnetic?: boolean; rise?: number; temp?: Temp; charge?: number }>;
  /**
   * How strongly particles of different kinds attract one another (between their own bonds by
   * default). Stronger than the solute's own bond, a lump dissolves; much weaker, it stays whole.
   */
  cross?: number;
  /**
   * How strongly particular pairs of different kinds attract, in place of `cross` for those pairs:
   * the two ions of a crystal that water cannot pull apart hold each other tightly
   * (`pairs: [{ kinds: [0, 2], bond: 4 }]`) while each feels water only weakly (`cross: 1`).
   */
  pairs?: Array<{ kinds: [number, number]; bond: number }>;
  /**
   * A filter (or sieve) across the box at this fraction of its height, with holes this wide:
   * the particles start above it, and it holds them all until a phase lets them through
   * (`release`); then particles smaller than the holes pass and bigger ones stay on it.
   */
  filter?: { at: number; holes: number };
  /**
   * An open top the particles can leave by (evaporation): one that reaches the top is gone. With a
   * list of kinds, only those leave (a gas bubbling out of a solution).
   */
  escape?: boolean | number[];
  /**
   * A low wall standing across the box at this fraction of its width, this fraction of its height
   * tall, that never lifts: the particles start on its left, and only a gas can get over it (a
   * still, with the flask on the left and the collecting side on the right).
   */
  wall?: { at: number; height: number };
  /**
   * Parts of the box (fractions of its width and height) held at their own temperatures, the
   * rest of the box only passing heat on by bumping: a hot plate under a flask, a cold condenser.
   * A zone with no `temp` follows the box's temperature (so a clip heats it).
   */
  zones?: Array<{ x: [number, number]; y: [number, number]; temp?: Temp }>;
  /**
   * A strip of chromatography paper: no glass, the particles start as a dot near the bottom, and
   * a phase's `run` sends the solvent up the paper, carrying each kind up at its `rise`.
   */
  paper?: boolean;
  /**
   * Reactions between kinds (by their place in `kinds`): when a particle of kind `a` meets one of
   * kind `b` hard enough (their collision energy above `energy`, 0 by default), they become kinds
   * `to` and, with `join`, are bonded into one molecule, drawn with a line between them. `heat`
   * gives the pair that much extra energy (a reaction that gives out heat). With `free`, each of
   * the two first lets go of the atoms it was bonded to, and those become the kinds in `free`
   * (the first for the `a` atom's old partners, the second for the `b` atom's; `null` keeps that
   * atom's bonds): so a hydrogen molecule meeting an oxygen molecule can swap partners. With
   * `carry` too, the `a` atom's old partners stay with it, joined to the `b` atom instead (bent,
   * like water, or in a straight line with `line`, like carbon dioxide): a hydrogen molecule that
   * hits an oxygen atom becomes one water molecule. Atoms are never made or lost: only
   * joined differently, so the mass is the same after. Particles react a little way apart (1.6
   * times their mean diameter); `reach` sets that distance, about 1.15 for touching only, so a gas
   * reacts with the surface of a lump and not the particles just under it. With `settle`, the
   * two made stay still where they formed, as a solid deposited from two gases (the white ring of
   * ammonium chloride in a tube). `chance` lets only that fraction of the meetings react (checked
   * at each step of the simulation while they touch, so keep it small, about 0.001 to 0.02): a
   * slow reaction, or one that runs both ways at steady rates (an equilibrium).
   */
  reactions?: Array<{ a: number; b: number; to: [number, number]; join?: boolean; free?: [number | null, number | null]; carry?: boolean; line?: boolean; energy?: number; heat?: number; reach?: number; settle?: boolean; chance?: number }>;
  /**
   * Molecules that fall apart by themselves: each step of the simulation, a bond between atoms of
   * `kinds` snaps with this `chance` (keep it small, about 0.0001 to 0.002), and the two atoms
   * become the kinds in `to`. With `energy`, the chance is multiplied by e^(−energy / T), so it
   * falls apart more often when hot. `heat` below zero cools the box each time (it takes energy
   * in). Unlike a reaction, this needs no meeting, so squeezing a gas does not speed it up.
   */
  breaks?: Array<{ kinds: [number, number]; to: [number, number]; chance: number; energy?: number; heat?: number }>;
  /**
   * Molecules the box starts with, besides the single particles in `kinds`: `n` of them, each
   * made of these atoms (kinds, by place), the first bonded to each of the others round it. A
   * `bent` molecule of three atoms is bent like water; otherwise the atoms sit in a line. A
   * `chain` (a polymer) is bonded end to end instead, each atom to the next, and bends freely;
   * chains start laid along the box one above another.
   */
  molecules?: Array<{ atoms: number[]; n: number; bent?: boolean; chain?: boolean }>;
  /** Hold the reactions back until a phase lets the box go (`release`), so they start on cue. */
  waits?: boolean;
  /**
   * Kinds kept out of the box at first, as in a burette above it: a phase's `add` pours them in,
   * one unit (a molecule, or a single particle) at a time, alternating between the kinds' units.
   */
  reserve?: number[];
  /**
   * Tint the box in this colour, as an indicator would, once none of the `acid` kinds is left and
   * some of the `base` kinds are (the endpoint of a titration).
   */
  indicator?: { acid: number[]; base: number[]; tone: Tone };
  /** What the part `tally` counts under the box: the particles of these kinds, and what to call them. */
  tally?: { kinds: number[]; label: string };
  /**
   * The part `spread` draws a bar chart under the box of how many particles move at each speed (a
   * Maxwell–Boltzmann spread), live, with a line at the speed `at` (the least a collision needs to
   * react, for the activation energy) and a count of the particles faster than it. `max` is the
   * fastest speed on the axis (3 by default) and `bins` the number of bars (12).
   */
  spread?: { at: number; max?: number; bins?: number; label?: string };
  /** The first kind starts as a lump on the floor in the middle (or this many smaller lumps). */
  lump?: boolean | number;
  /**
   * The lump starts on top of the rest instead of on the floor, raised this far above them (in
   * particle widths; 0 rests on the surface), so a phase's `release` drops it in: a dense lump
   * sinks and the liquid rises round it, and a light one floats.
   */
  above?: number;
  /**
   * The part `level` draws a line at the liquid's surface (the particles not in the lump), with a
   * dashed line where it was when the element was shown, so a lump dropped in is seen to raise it
   * (measuring a volume by displacement).
   */
  level?: boolean;
  /**
   * An ionic lattice: about half the lump's particles become this kind instead, each next to
   * particles of the other kind (positive and negative ions side by side). Give this kind `n: 0`
   * and list it after the kind round the lump, and hold both (`hold: [0, k]`).
   */
  lumpMix?: number;
  /**
   * Hold the first kind still (a lump, keeping its shape), or the kinds listed (gases soaked into
   * cotton wool at the ends of a tube), until a phase lets them go (`release`).
   */
  hold?: boolean | number[];
  /**
   * Kinds fixed in place once the box has settled, so a push (`push` in a phase) cannot slide the
   * rows past them: the odd-sized atoms of an alloy, which jam its layers.
   */
  pin?: number[];
  /** With several kinds, start them apart (the first kind on the left) instead of mixed. */
  apart?: boolean;
  /**
   * With `apart` and three kinds or more, pack the first kind into this fraction of the box at its
   * left end, and the last kind that has particles into the same at its right end, with the kinds
   * between filling the middle: two gases soaked into cotton wool at the two ends of a tube of air.
   */
  ends?: number;
  /** With `ends`, what is at the left and right ends, written under them with the labels. */
  endLabels?: [string, string];
  /** Its starting temperature; the usual one for its state otherwise. */
  temp?: Temp;
  /** Inside width and height, in particle diameters (10 by 10 by default). */
  width?: number;
  height?: number;
  /** Where the lid starts, as a fraction of the box's height (1, the top, by default). */
  lid?: number;
  /** Draw the lid as a piston with a handle, to push in or pull out. */
  piston?: boolean;
  /** Draw no lid (a beaker): the particles still stay inside. */
  open?: boolean;
  /** Draw no box at all, only the particles (a metal bar); they still keep to its space. */
  bare?: boolean;
  /** How many particles to a row as they start (a solid bar many particles long). */
  cols?: number;
  /**
   * Show expansion more clearly than real solids do: for each degree of the simulation's
   * temperature above its start, the particles settle this fraction further apart (0.8 is about
   * 9% for a solid warmed from 0.03 to 0.14; much hotter and its rows start to slide). They are drawn the same size, so the gaps grow.
   */
  expand?: number;
  /** A particle to follow: it is drawn in yellow, with a trail when the part `trail` is shown. */
  follow?: number;
  /** The name under the box. */
  label?: string;
  tone?: Tone;
  /**
   * A wall across the box at this fraction of its width, keeping the particles on either side
   * apart until a clip lifts it (`lift`), to let two gases or liquids mix by diffusion.
   */
  divider?: number;
  /**
   * Where the box is heated or cooled: only the particles in a strip along this side are held at
   * the box's temperature, and the rest keep their energy and pass it on by bumping into one
   * another. A bar heated at one end conducts heat along itself; a gas by a cold wall condenses on
   * it. The whole box is held at its temperature otherwise.
   */
  bath?: 'left' | 'right' | 'floor';
  /**
   * Colour each particle by how fast it is moving, from blue (as at the first temperature) to red
   * (as at the second), to see heat spread.
   */
  heatColor?: [Temp, Temp];
  /**
   * Hold no particle at a temperature once it is seen (a calorimeter): energy only passes from
   * particle to particle as they collide. A kind can start at its own temperature (`temp` on the
   * kind: a hot metal lump dropped into cold water), and the thermometer reads the kinds without
   * one (the water), so it shows the water warming as the lump cools.
   */
  insulated?: boolean;
  /**
   * Electrodes down the left and right walls (an electrolytic or a voltaic cell). While a phase
   * turns the current on (`power`), kinds with a `charge` drift: positive ones to the left
   * electrode (the cathode) and negative ones to the right (the anode). A particle that touches an
   * electrode, or a particle stuck on it, and has a rule there changes kind (`chance` makes it
   * happen only sometimes), and with `stick` stays on the electrode (a metal plating out). `plate`
   * starts an electrode coated with that many particles of a kind, and `dissolve` lets its coating
   * leave one particle at a time as another kind (a zinc anode giving zinc ions), about `chance`
   * of the steps, or, without a `chance`, one for each particle that sticks on the other electrode
   * (electroplating, where the anode loses an atom for every atom the object gains). `label` is
   * written over the electrode ("cathode −" and "anode +" by default).
   */
  electrodes?: { left?: Electrode; right?: Electrode };
}

/** One electrode of a particle box (see `electrodes`). */
export interface Electrode {
  label?: string;
  tone?: Tone;
  rules?: Array<{ kind: number; to: number; stick?: boolean; chance?: number }>;
  plate?: { kind: number; n: number };
  dissolve?: { kind: number; to: number; chance?: number };
}

/** A stretch of a particle clip: temperatures and lids move steadily to these values over `dur` seconds. */
export interface ParticlePhase {
  dur: number;
  /** New temperatures, by box id. */
  heat?: Record<string, Temp>;
  /** New lid heights (fractions of the box's height), by box id. */
  lid?: Record<string, number>;
  /** Boxes whose divider is lifted out as the phase starts. */
  lift?: string[];
  /** Boxes whose held lump (or waiting reactions) are let go as the phase starts. */
  release?: string[];
  /** Pour this many of each box's reserved units in over the phase, evenly, from the top. */
  add?: Record<string, number>;
  /** How hard to stir each box (0 stops; 2 stirs briskly), reached steadily over the phase. */
  stir?: Record<string, number>;
  /** How strongly a magnet over each box pulls its magnetic kinds (0 takes it away; 1 is strong). */
  magnet?: Record<string, number>;
  /** How fast the solvent runs up each paper box (0 stops it; 1 is the usual). */
  run?: Record<string, number>;
  /** How strongly a current flows through each box's electrodes (0 off; 1 the usual), reached steadily. */
  power?: Record<string, number>;
  /**
   * Push each box's solid sideways (1 is a firm push; 0 lets go), its top half to the right and its
   * bottom half to the left, as a hammer blow does: the rows of a metal slide over one another.
   */
  push?: Record<string, number>;
}

/** What a particles element can show besides its boxes; each is a part ("p.thermo"). */
export const PARTICLE_PARTS = ['thermo', 'gauge', 'volume', 'hits', 'trail', 'labels', 'rate', 'flow', 'width', 'count', 'tally', 'middle', 'key', 'spread', 'level'] as const;

/**
 * Boxes of moving particles, for chemistry: a small simulation in which particles attract and
 * jostle one another (src/video/particles.ts), so solids vibrate in rows, liquids slide and gases
 * fly and bounce off the walls, and heating or squeezing a box changes them as it would. The
 * particles move whenever the element is on screen; a line plays a clip (`play: 'p.heat'`) to
 * change temperatures or move a lid, and the next line waits for it. Parts: `thermo` (a
 * thermometer by each box), `gauge` (a pressure gauge on the box `gauge.box`), `hits` (a flash
 * wherever a particle hits a wall), `rate` (wall hits each second, under each box), `trail` (the
 * path of each box's followed particle), `labels`, `flow` (an arrow of heat between two boxes,
 * thinner as their temperatures meet; set `flow` up), `width` (a bracket over each box's
 * particles, with dashed marks as wide as they were when the element was shown, to see expansion),
 * `middle` (a dashed line down the middle of each box, to see which end something is nearer),
 * `count` (how many particles of each box's first kind have broken away on their own: "8 of 16
 * dissolved"), `tally` (a box's running count) and `key` (each kind's colour and name; set `key` up).
 * Emphasising a box's id makes it glow.
 */
export interface ParticlesEl {
  kind: 'particles';
  id: string;
  boxes: ParticleBox[];
  clips: Record<string, { phases: ParticlePhase[] }>;
  /**
   * A pressure gauge on one box, reading `start` (in `unit`, kPa by default) as the box starts,
   * to `decimals` places (none by default).
   */
  gauge?: { box: string; start: number; unit?: string; decimals?: number };
  /** A volume reading under one box, `start` (in `unit`, L by default) with the lid where it starts. */
  volume?: { box: string; start: number; unit?: string; decimals?: number };
  /**
   * Keep room for a thermometer by each box (the part `thermo` shows them), with marks at these
   * temperatures if given ("melts", "boils").
   */
  thermometers?: boolean | { marks?: Array<{ at: Temp; label: string }> };
  /**
   * Keep room to the right of the boxes for a key: a dot in each named kind's colour, with its
   * name (the part `key` shows it). Kinds with the same name and colour are listed once.
   */
  key?: boolean;
  /** Heat flowing from one box to the next one along (the part `flow` shows it). */
  flow?: { from: string; to: string; label?: string };
  /**
   * Seconds of simulation for each second of video, as a multiple of the usual. Liquids are
   * sluggish, so dissolving needs about 6 to happen while the narrator speaks.
   */
  speed?: number;
  /** Changes the starting arrangement, if one looks wrong. */
  seed?: number;
  height?: number;
}

/** An atom in an atoms element: its nucleus, written with its symbol, and its electrons in shells. */
export interface AtomSpec {
  id: string;
  /** The symbol on its nucleus ("Na"). */
  symbol: string;
  protons: number;
  /** How many electrons it starts with (as many as its protons by default; 0 to fill it in a clip). */
  electrons?: number;
  /** Where its nucleus starts, in the element's units (a shell is about 0.6 wide). */
  at: [number, number];
  /** The nucleus's colour, and its electrons' (so they can be followed when given or shared). */
  tone?: Tone;
  /** Its name, under it ("sodium"), shown with the `labels` part. */
  name?: string;
  /** Write its name and arrangement above it instead (where another atom is close below). */
  labelAbove?: boolean;
}

/** A stretch of an atoms clip: everything in it happens together, over `dur` seconds. */
export interface AtomsPhase {
  dur: number;
  /** Electrons added one by one, inside shells first, until each named atom has this many. */
  fill?: Record<string, number>;
  /** Outer electrons passed from one atom to another (or lost, drifting away, with `to: null`). */
  give?: Array<{ from: string; to: string | null; n: number }>;
  /** Atoms slid to new places. */
  move?: Record<string, [number, number]>;
  /** A covalent bond: `n` outer electrons of each atom go to sit where their shells overlap. */
  share?: Array<{ a: string; b: string; n: number }>;
  /**
   * A polar bond: the electrons shared between `to` and `from` slide towards `to`'s nucleus, `by`
   * of the way (0 shares them equally, 1 is as close as they go), as a more electronegative atom
   * pulls them. 0 moves them back to the middle.
   */
  pull?: Array<{ to: string; from: string; by: number }>;
}

/** What an atoms element can show besides the atoms: each is a part ("at.arrangement"). */
export const ATOM_PARTS = ['labels', 'arrangement', 'charges'] as const;

/**
 * Atoms with their electrons circling in shells, for electron arrangements, ions and bonding (see
 * src/video/atoms.ts). Showing the element shows the atoms; `labels` adds each one's name,
 * `arrangement` its electrons shell by shell ("2, 8, 1") and `charges` its charge once it has
 * one ("Na+"). A line plays a clip (`play: 'at.fill'`) and the electrons move as the narrator
 * speaks; the next clip carries on from where the last one ended. Emphasising an atom's id makes
 * it glow.
 */
export interface AtomsEl {
  kind: 'atoms';
  id: string;
  atoms: AtomSpec[];
  /** The width and height of the scene, in the units the atoms are placed in. */
  span: [number, number];
  clips: Record<string, { phases: AtomsPhase[] }>;
  /** For the thumbnail: the clip to show, played to its end. */
  poster?: string;
  height?: number;
}

/** An atom of a molecules element: its symbol ("C"), drawn in its element's colour unless a `tone` is given. */
export type MolAtom = string | { el: string; tone?: Tone };

/** One arrangement of a molecules element. */
export interface MolStage {
  /** Where each atom is, by name, in the element's units (a bond is about 1 long); an atom left out is not there. */
  at: Record<string, [number, number]>;
  /** The bonds, by atom names: "C1=C2 C1-H1" (`-` single, `=` double, `#` triple). */
  bonds: string;
  /** Charges, by atom name ("O": -1 for a hydroxide ion), written beside the atom. */
  charges?: Record<string, number>;
  /** Names written in the scene ("ethene"), with their place in the element's units. */
  names?: Array<{ text: string; at: [number, number]; tone?: Tone }>;
  /**
   * Curly arrows (a mechanism): each from an atom (a lone pair on it) or a bond ("C1=C2", from its
   * middle) to an atom or a bond, curving to one side by `bend` (0.5 by default; below zero for
   * the other side). Give them to the stage before the move they explain.
   */
  arrows?: Array<{ from: string; to: string; bend?: number }>;
  /** Rings of delocalised electrons (benzene), each drawn as a circle inside the atoms named. */
  rings?: string[][];
}

/** A stretch of a molecules clip: the molecules move to the arrangement `to` over `dur` seconds (or hold, without one). */
export interface MolPhase {
  dur: number;
  to?: string;
}

/**
 * Molecules as balls and sticks, for the organic chemistry videos (src/video/molecules.ts). Each
 * stage is an arrangement of the atoms and their bonds, and a clip moves the molecules from one
 * stage to the next: the atoms glide to their new places, a bond that breaks flashes red and fades
 * in the first half of the move, and a new bond fades in green in the second half (and stays green
 * for a moment), so the bonds broken and made can be seen. The atoms jiggle a little all the time.
 * An atom's name is a part, so a line can focus on it.
 */
export interface MoleculesEl {
  kind: 'molecules';
  id: string;
  atoms: Record<string, MolAtom>;
  stages: Record<string, MolStage>;
  /** The stage shown before any clip plays. */
  start: string;
  clips: Record<string, { phases: MolPhase[] }>;
  /** The width and height of the scene, in the element's units. */
  span: [number, number];
  /** For the thumbnail: the clip to show, played to its end. */
  poster?: string;
  height?: number;
}

/** A stretch of a scatter clip: `fire` more shots leave evenly through it. */
export interface ScatterPhase {
  dur: number;
  fire?: number;
}

/** What a scatter element can show; each is a part ("g.labels"). */
export const SCATTER_PARTS = ['labels', 'atoms', 'count'] as const;

/**
 * Alpha particles fired at a thin gold foil, Rutherford's experiment (src/video/scatter.ts). Every
 * nucleus pushes each alpha particle away, harder the closer it is, so one that passes far from the
 * nuclei goes straight on, one that passes close is turned aside, and one aimed almost straight at
 * a nucleus bounces back. A clip's phases fire the shots, one after another, each leaving a faint
 * track. `close` aims chosen shots at a nucleus, missing it by a little (0.004 bounces back, about
 * 0.03 turns a shot by some tens of degrees); every other shot keeps clear of the nuclei. The
 * parts: `labels` (the source, the foil and a nucleus named), `atoms` (each gold atom's size
 * round its tiny nucleus, to show the atom is mostly empty space) and `count` (how many went
 * straight through, were turned aside and bounced back).
 */
export interface ScatterEl {
  kind: 'scatter';
  id: string;
  /** How many alpha particles there are to fire. */
  shots: number;
  /** Columns of gold atoms in the foil (3 by default). */
  columns?: number;
  /** Shots aimed close to a nucleus, by their place in the firing order (from 0). */
  close?: Array<{ shot: number; miss: number }>;
  clips: Record<string, { phases: ScatterPhase[] }>;
  /** For the thumbnail: the clip to show, played to its end. */
  poster?: string;
  height?: number;
}

/** A stretch of a rays clip. */
export interface RayPhase {
  /** How long it lasts, in seconds. */
  dur: number;
  /** Turn the incoming ray to this angle of incidence over the phase, in degrees from the normal. */
  to?: number;
  /** Slow motion: seconds of video for each second of the light's own time (1 by default). */
  slow?: number;
  /** A short note shown over the picture. */
  note?: string;
}

export interface RayClip {
  phases: RayPhase[];
}

/** What a rays element can show over its rays; each is a part ("r.normal"). */
export const RAYS_PARTS = ['normal', 'angles', 'toSurface', 'fronts', 'image'] as const;

/**
 * A ray of light meeting a surface, for the physics videos (src/video/rays.ts). At a `mirror` the
 * ray reflects, with the angle of reflection equal to the angle of incidence. At a `boundary` it
 * passes into a second material and bends: the angle of refraction comes from the two speeds
 * (sin r ÷ sin i = the second speed ÷ the first), so a ray that slows bends towards the normal and
 * one that speeds up bends away. A clip turns the incoming ray (`to`), and the outgoing ray and the
 * angles follow it. Showing the element shows the surface and the rays; showing a part adds it:
 * `normal` (the line at right angles to the surface), `angles` (the angles from the normal, with
 * their sizes), `toSurface` (the angle between the incoming ray and the surface, which is not the
 * angle of incidence), `fronts` (a wide beam with its wavefronts marching along it while a clip
 * plays: closer together where the light is slower) and, at a mirror with room `behind` it,
 * `image` (where the lamp seems to be: as far behind the mirror as the lamp is in front).
 */
export interface RaysEl {
  kind: 'rays';
  id: string;
  surface: 'mirror' | 'boundary';
  /** The angle of incidence to start with, in degrees from the normal (0 to 85). */
  angle: number;
  /** At a boundary: the wave's speed before and after it, in any one unit (only their ratio matters). */
  speeds?: [number, number];
  /** At a boundary: what the two materials are called ("Air", "Glass"). The slower one is shaded. */
  media?: [string, string];
  /** At a mirror: put it across the middle of the picture, with room behind it for the image. */
  behind?: boolean;
  clips: Record<string, RayClip>;
  /** For the thumbnail: the clip to show, part way through. */
  poster?: string;
  height?: number;
}

/** A component of a circuit element: a lamp, which glows with the power it gets, or a resistor. */
export interface CircuitPart {
  id: string;
  kind: 'lamp' | 'resistor';
  /** Its resistance in ohms. */
  ohms: number;
  /** What is written beside it (its resistance otherwise). */
  label?: string;
}

/** A stretch of a circuit clip. */
export interface CircuitPhase {
  /** How long it lasts, in seconds. */
  dur: number;
  /** Slow motion: seconds of video for each second of the circuit's own time (1 by default). */
  slow?: number;
  /** Changes as the phase starts: the switch, the supply voltage, a component's resistance, or the components that have broken. */
  set?: { closed?: boolean; volts?: number; ohms?: Record<string, number>; broken?: string[] };
  /** A short note shown over the circuit. */
  note?: string;
}

export interface CircuitClip {
  phases: CircuitPhase[];
}

/** What a circuit element can show over its wires; each is a part ("c.current"). */
export const CIRCUIT_PARTS = ['charges', 'energy', 'arrows', 'current', 'voltage', 'power', 'charge', 'transferred', 'clock', 'terminal', 'lost'] as const;

/**
 * A circuit, for the physics videos (src/video/circuit.ts): a battery, a switch, and lamps or
 * resistors in one loop (`series`) or each on its own branch across the supply (`parallel`). The
 * currents and voltages are worked out from the supply voltage and the resistances, and the
 * charges drawn on the wires move at a speed in proportion to the current where they are, so
 * they split at a junction and no charge is lost. Time runs only while a clip plays; a phase can
 * close or open the switch, change the supply or a resistance, or break a component. Showing the
 * element shows the circuit; showing a part adds it: `charges` (the moving charges), `energy`
 * (the charges are bright where they carry energy from the battery and dim once they have given
 * it up), `arrows` (the direction of conventional current), `current` (ammeters with their
 * readings), `voltage` (the voltage across each component, on a voltmeter joined across it in a
 * loop), `power` (the power of each component), `charge` (the charge that has passed the ammeter
 * since the start), `transferred` (the energy the components have transferred since the start),
 * `clock`, `terminal` (a voltmeter across the battery's terminals) and `lost` (the volts lost
 * across the battery's internal resistance).
 * Emphasising a component's id makes it glow.
 */
export interface CircuitEl {
  kind: 'circuit';
  id: string;
  /** The supply voltage, in volts. */
  volts: number;
  layout: 'series' | 'parallel';
  /** The components: in order round the loop, or one on each branch. Up to four. */
  parts: CircuitPart[];
  /**
   * In a `parallel` layout: a component in series with the whole group of branches, drawn on the
   * wire from the battery to the first junction. All of the battery current passes through it.
   */
  lead?: CircuitPart;
  /**
   * The internal resistance of the battery, in ohms. It is drawn as a small resistor inside the
   * battery's case, and `volts` is then the emf. For a scene's main column (the names beside the
   * battery need the wide margin).
   */
  internal?: number;
  /** What is written beside the internal resistance (its value otherwise): "r = ?" while it is still to be found. */
  internalLabel?: string;
  /** The switch starts open, so no current flows until a clip closes it. */
  open?: boolean;
  /** `electrons` draws the charges as electrons, drifting from the negative terminal round to the positive. */
  carriers?: 'conventional' | 'electrons';
  /** How far a charge moves for each coulomb that passes, in pixels (40 otherwise). */
  pace?: number;
  /** The power at which a lamp is fully bright, in watts (the most any lamp gets at the start otherwise). */
  bright?: number;
  clips: Record<string, CircuitClip>;
  /** For the thumbnail: the clip to show, part way through. */
  poster?: string;
  height?: number;
}

/** A body of a flight element: something that moves over a flat picture. */
export interface FlightBody {
  id: string;
  /**
   * A ball (the default), a boat or an aircraft that points the way it is steered, or a plain dot
   * (a walker on a map). Seen from above, for collisions: a `puck`, a disc drawn to scale with its
   * label inside, or a `car`, which points the way it was last driven.
   */
  shape?: 'ball' | 'boat' | 'plane' | 'dot' | 'puck' | 'car';
  /**
   * Its mass in kilograms. A body with a mass has momentum (the bars and the triangle of
   * `momentum`), takes part in the element's `collisions`, and can be given a `kick`.
   */
  mass?: number;
  /** For a body with a mass: its radius in the length unit (0.5 by default). Two such bodies touch when their centres are the sum of their radii apart. */
  radius?: number;
  /** A name written beside it. */
  label?: string;
  /** Where the name sits: over the body otherwise, or under it while it climbs. */
  labelAt?: 'above' | 'below' | 'left' | 'right';
  /** Where it starts, in the element's length unit: [x, y], with y up the screen. */
  at: [number, number];
  /**
   * Its starting velocity, [vx, vy]. For a body carried by the stream this is its own velocity
   * through the water or the air, and the stream's velocity is added to it. At rest otherwise.
   * Under gravity, a body with a starting velocity is in flight from the first moment.
   */
  v?: [number, number];
  tone?: Tone;
}

/** A stretch of a flight clip. */
export interface FlightPhase {
  /** How long it lasts, in the element's own time. */
  dur: number;
  /** Slow motion: seconds of video for each unit of the element's time (1 by default; 0.5 plays it twice as fast). */
  slow?: number;
  /** Hold everything still for `dur` seconds of video, to name the arrows before anything moves. */
  freeze?: boolean;
  /** Velocities given as the phase starts, by body id: [vx, vy]. Under gravity this also launches the body. */
  set?: Record<string, [number, number]>;
  /** Under gravity: let these bodies go as the phase starts (a ball dropped from rest). */
  release?: string[];
  /** Stop these bodies where they are as the phase starts (a boat that has reached the far bank): the stream no longer carries them. */
  stop?: string[];
  /**
   * An explosion: impulses given to bodies with a mass as the phase starts, in kg·m/s by body id,
   * as [east, north]. Each changes its body's velocity by the impulse ÷ the mass. The pieces push
   * only on each other, so the impulses of one phase must add up to zero.
   */
  kick?: Record<string, [number, number]>;
  /** A short note shown over the picture ("Slow motion"). */
  note?: string;
}

export interface FlightClip {
  phases: FlightPhase[];
  /** Put every body back at its start first, and clear its trail (to play the motion again). */
  reset?: boolean;
}

/** What a flight element can show over its bodies; each is a part ("f.components"). */
export const FLIGHT_PARTS = ['velocity', 'components', 'own', 'trail', 'strobe', 'shadows', 'displacement', 'legs', 'angle', 'readout', 'clock', 'speed', 'bars', 'total', 'sum'] as const;

/**
 * Motion in two dimensions, for the physics videos (src/video/flight.ts): a projectile, a boat
 * crossing a river, an aircraft in a wind, or a walk drawn on a map. The picture is to scale, so
 * every angle on screen is the true one. With `gravity`, a body in flight accelerates downwards
 * and stops where it lands on the ground (y = 0). With a `stream`, the bodies it carries move
 * with their own velocity plus the stream's. Showing the element shows the scene and the bodies;
 * showing a part adds it: `velocity` (an arrow on each body for its velocity over the ground),
 * `components` (the horizontal and vertical parts of that velocity, as two arrows that change on
 * their own), `own` (with a stream: the body's own velocity and the stream's, drawn head to tail
 * so that the velocity arrow closes the triangle), `trail` (the path so far), `strobe` (a mark
 * where each body was at equal time steps), `shadows` (a mark on the ground under the body and
 * one on the left wall beside it, with their own strobe marks: the two motions taken apart),
 * `displacement` (an arrow from where the body started to where it is), `legs` (the two parts of
 * that displacement, dashed: along x and then along y, or for a body in a stream its own motion
 * and then how far the stream has carried it), `angle` (the angle of the displacement, or of the
 * velocity when no displacement is shown, measured from the x direction; for a body in a stream,
 * the angle between the way it points and the way it travels), `readout` (a panel of the numbers
 * for the arrows shown) and `clock`. Emphasising a body's id makes it glow.
 *
 * Momentum in two dimensions is a view from above (the `map` scene) of bodies with a `mass`. With
 * `collisions` they collide as discs, pushed by equal and opposite impulses, and a phase's `kick`
 * is an explosion; either way the momentum is shared out by the forces between the bodies and is
 * never typed in. The parts for it are `speed` (the speed written at the tip of each velocity
 * arrow), `bars` (with `momentum`: a bar for each body's momentum in each of the two directions),
 * `total` (the bars of the two totals) and `sum` (the total momentum drawn at the centre of mass:
 * its two parts head to tail, and the total closing the triangle).
 */
export interface FlightEl {
  kind: 'flight';
  id: string;
  /** The region shown, in the length unit: [left, right, bottom, top]. */
  view: [number, number, number, number];
  bodies: FlightBody[];
  clips: Record<string, FlightClip>;
  /** `ground` (the default): a ground line at y = 0 with a ruler. `river`: water between two banks. `map`: a grid with a compass. */
  scene?: 'ground' | 'river' | 'map';
  /** The acceleration due to gravity, in length units per time unit squared, pulling bodies in flight down (none otherwise). */
  gravity?: number;
  /** A ledge to launch from: a block from the left edge of the view to this x, with its top at this y. */
  ledge?: [number, number];
  /**
   * A current or a wind: every body listed in `of` (all of them otherwise) is carried at this
   * velocity as well as its own. On a river the water lies between the two y values of `band`
   * (the whole view otherwise), and marks drift with it so that the current is seen. `name` is
   * what the readout calls it ("Current" on a river and "Wind" otherwise).
   */
  stream?: { v: [number, number]; band?: [number, number]; of?: string[]; name?: string };
  /** The units written on the picture: metres and seconds otherwise. */
  units?: { length?: string; time?: string };
  /** The gap between ruler or grid marks, in the length unit (chosen to suit the view otherwise). A river has a ruler along its banks only when this is given. */
  tick?: number;
  /** Pixels of arrow for each unit of velocity (chosen so the fastest starting velocity is about 150 pixels otherwise). */
  velocityScale?: number;
  /** Time between strobe marks (0.5 by default). */
  strobe?: number;
  /** Pixels kept clear under the picture, for arrows that point down from a body near the ground. */
  below?: number;
  /**
   * The names of the two directions in the readout: "Horizontal" and "Vertical" otherwise ("East"
   * and "North" on a map). With a stream they name the two legs of the displacement instead: the
   * body's own motion and the drift ("Across the river" and "Downstream").
   */
  axes?: [string, string];
  /**
   * Give this when a line shows `readout`: it keeps a column beside the picture for the panel of
   * numbers. `of` is the body the panel describes (the first otherwise), and `side` the side of
   * the picture the column is on (right otherwise).
   */
  readout?: { of?: string; side?: 'left' | 'right' };
  /**
   * What happens when two bodies with a mass touch (with no gravity and no stream). They are
   * smooth discs, so each pushes the other along the line through their centres, and where one
   * strikes the other off centre both are turned aside. They part at `restitution` times the
   * speed at which they closed along that line (1 by default: an elastic collision), or with
   * `stick` they lock together and move as one.
   */
  collisions?: { restitution?: number; stick?: boolean };
  /**
   * Momentum bars in a column on the right of the picture, for the bodies with a mass: one group
   * for each direction (named by `axes`), with a bar for each body (the part `bars`) and one for
   * their total (`total`). `max` is the largest momentum a bar must fit, in kg·m/s, and `min` (a
   * number below zero) the most negative: the zero line then sits part way along. `scale` is the
   * pixels of arrow for each kg·m/s in the triangle of the part `sum` (chosen from `max` otherwise).
   */
  momentum?: { max: number; min?: number; scale?: number };
  /** On a map: two roads this wide, in the length unit, that cross at the origin (one runs east and the other north). */
  roads?: number;
  /** Decimal places of the angles written on the picture (none by default). */
  angleDecimals?: number;
  /** Decimal places of the speeds written by the part `speed` (1 by default); from 10 units up they keep one place. */
  speedDecimals?: number;
  /** For the thumbnail: the clip to show, part way through. */
  poster?: string;
  height?: number;
}

/** A block on the surface of a ramp element. */
export interface RampBody {
  id: string;
  /** Mass in kilograms. */
  mass: number;
  /** What is written on it ("8 kg" from its mass otherwise). */
  label?: string;
  /** Where its centre starts, in metres along the surface from its lower (left) end. */
  x: number;
  /** Its starting velocity along the surface in metres per second: up the slope, to the right, is positive. */
  v?: number;
  /** Its length along the surface in metres (1 by default). */
  width?: number;
  tone?: Tone;
}

/**
 * A push or a pull on a block of a ramp element. These are the only forces a script gives: the
 * weight, the normal force, friction and every tension are worked out from them.
 */
export interface RampForce {
  on: string;
  /** Its name beside the arrow ("Push"); the size in newtons is added. */
  name: string;
  /** Its size in newtons. */
  n: number;
  /**
   * Its direction in degrees, anticlockwise from the direction up the surface (to the right on a
   * level one): 0 by default, 180 points back down the surface, 30 slants up and away from it, and
   * -20 presses down into it.
   */
  angle?: number;
  tone?: Tone;
}

/** A stretch of a ramp clip during which the same pushes and pulls act. */
export interface RampPhase {
  /** How long it lasts, in seconds of the motion's own time. */
  dur: number;
  /** Slow motion: seconds of video for each second of the motion (1 by default). */
  slow?: number;
  /** Hold everything still for `dur` seconds of video, to name the forces before anything moves. */
  freeze?: boolean;
  forces?: RampForce[];
  /** Velocities given at the start of the phase, in metres per second, by body id; everything tied to that body gets it too. */
  set?: Record<string, number>;
  /** Tilt the surface steadily to this angle, in degrees, during the phase. */
  tilt?: number;
  /** A short note shown over the picture ("Slow motion"). */
  note?: string;
}

export interface RampClip {
  phases: RampPhase[];
  /** Put every body back at its start, and the surface at its first tilt (to play the motion again). */
  reset?: boolean;
}

/** What a ramp element can show over its bodies; each is a part ("ramp.weight"). */
export const RAMP_PARTS = ['weight', 'components', 'normal', 'friction', 'tension', 'net', 'velocity', 'readout', 'clock', 'strobe', 'distance', 'work'] as const;

/**
 * Blocks on a surface, level or tilted, for the dynamics videos (src/video/ramp.ts): a box pushed
 * across a floor with friction, a block on a ramp, blocks tied by strings, a block pulled by a body
 * that hangs over a pulley, or two hanging bodies (a surface tilted to 90 degrees, which is not
 * drawn). The script gives the masses, the tilt, the coefficients of friction and the pushes of
 * each phase; the weight, the normal force, static or kinetic friction, the tensions and the
 * motion are worked out from them. Showing the element shows the surface, the bodies and the
 * pushes of the phase being played; showing a part adds it: `weight`, `normal`, `friction` and
 * `tension` (each an arrow with its name and size), `components` (the two parts, dashed, of the
 * weight on a tilted surface and of any push at an angle: along the surface and at right angles
 * to it), `net` (the net force on each body), `velocity`, `readout` (the acceleration), `clock`
 * and `strobe`. Emphasising a body's id makes it glow.
 */
export interface RampEl {
  kind: 'ramp';
  id: string;
  /** The tilt of the surface in degrees: 0 is level, and it rises to the right. */
  angle: number;
  /** The length of the surface, in metres. */
  length: number;
  /** The gravitational field strength in newtons per kilogram (9.81 otherwise). */
  g?: number;
  /** The coefficients of static and kinetic friction between the blocks and the surface (smooth otherwise). */
  friction?: [stat: number, kinetic: number];
  bodies: RampBody[];
  /** Light strings that tie neighbouring blocks together, as pairs of body ids. */
  ropes?: Array<[string, string]>;
  /**
   * A body that hangs from a string over a pulley at the top (right) end of the surface, tied to
   * the block nearest it. `drop` is how far under the pulley its centre starts, in metres (1 by
   * default). Its velocity and acceleration are counted downwards.
   */
  hanging?: { id: string; mass: number; label?: string; tone?: Tone; drop?: number; width?: number };
  /** Blocks whose weight and normal force are never drawn: on a level surface the two balance, and take no part in the motion. */
  balanced?: string[];
  /** How far the lower end of the surface stands above the ground, in metres (a table top; 0 otherwise). */
  raise?: number;
  /** Pixels kept clear above the highest point of the surface and under the ground, for arrows and labels ([150, 44] otherwise, and [150, 130] under a level floor). */
  pad?: [top: number, bottom: number];
  /**
   * Bars of the work each force has done on one block (the first otherwise), under the picture:
   * `rows` names the forces in order ("Weight", "Normal force", "Friction", "Tension", the name of
   * a push or a pull, and "Net" for their sum), and `range` is the least and the greatest work a
   * bar must hold, in joules ([-400, 600]). Work is the part of a force along the motion times
   * the distance moved, so a bar grows to the left of zero for a force that points against the
   * motion. Keep 40 px under the ground for each row, and 50 more (`pad`).
   */
  work?: { of?: string; rows: string[]; range: [number, number] };
  clips: Record<string, RampClip>;
  /** A label at the top left of the picture. */
  label?: string;
  /** Pixels of arrow for each newton (1.5 by default). */
  forceScale?: number;
  /** Pixels of arrow for each metre per second (24 by default). */
  velocityScale?: number;
  /** Seconds between strobe marks (0.5 by default). */
  strobe?: number;
  /** For the thumbnail: the clip to show, part way through. */
  poster?: string;
  height?: number;
}

/** A push or a pull on the object of a forces element. */
export interface PlaneForce {
  /** Its name beside the arrow ("Pull"); the size in newtons is added. */
  name: string;
  /** Its size in newtons. */
  n: number;
  /** Its direction in degrees, anticlockwise from the right of the picture (east): 90 is north, 180 west and -90 south. */
  angle: number;
  tone?: Tone;
}

/** A stretch of a forces clip during which the same forces act. */
export interface ForcesPhase {
  /** How long it lasts, in seconds of the motion's own time. */
  dur: number;
  /** Slow motion: seconds of video for each second of the motion (1 by default). */
  slow?: number;
  /** Hold everything still for `dur` seconds of video, to name the forces before anything moves. */
  freeze?: boolean;
  forces?: PlaneForce[];
  /** Tilt the two cables steadily to these angles above the horizontal, in degrees, during the phase. */
  cables?: [left: number, right: number];
  /** A short note shown over the picture ("Slow motion"). */
  note?: string;
}

export interface ForcesClip {
  phases: ForcesPhase[];
  /** Put the object back at its start and at rest, and the cables at their first angles. */
  reset?: boolean;
}

/** What a forces element can show over its object; each is a part ("forces.net"). */
export const FORCES_PARTS = ['components', 'net', 'velocity', 'readout', 'trail', 'angles', 'weight', 'tension', 'clock'] as const;

/**
 * One object with forces that point any way in a plane, for forces in two dimensions
 * (src/video/forces.ts). Without `cables` it is seen from above on frictionless ice: the forces of
 * the phase being played are drawn from its middle, they add to a net force, and it moves off
 * along that force. With `cables` it hangs at rest from two cables at those angles above the
 * horizontal: its weight is known, and the two tensions are worked out from the angles, so they
 * change as a phase tilts the cables. Showing the element shows the object and the forces of the
 * phase; showing a part adds it: `components` (the two parts, dashed, of every slanted force, head
 * to tail), `net` (the net force, with its size and its angle from east), `velocity` (an arrow
 * beside the net force), `readout` (the speed and the acceleration, as numbers), `trail`, `clock`,
 * and for a hung object `weight`, `tension` and `angles`.
 * Emphasising `body` makes the object glow.
 */
export interface ForcesEl {
  kind: 'forces';
  id: string;
  body: { /** Mass in kilograms. */ mass: number; /** What is written on it ("10 kg" from its mass otherwise). */ label?: string; tone?: Tone };
  /** The floor seen from above, in metres: [left, right, bottom, top]. The object starts at the origin. */
  view?: [left: number, right: number, bottom: number, top: number];
  /** Hang the object from two cables at these angles above the horizontal, in degrees: the left one, then the right one. */
  cables?: [left: number, right: number];
  /** The names of the two tensions ("Tension" otherwise). */
  names?: [left: string, right: string];
  /** The gravitational field strength in newtons per kilogram (9.81 otherwise). */
  g?: number;
  clips: Record<string, ForcesClip>;
  /** A label at the top left of the picture. */
  label?: string;
  /** Pixels of arrow for each newton (3 by default). */
  forceScale?: number;
  /** Pixels of arrow for each metre per second (24 by default). */
  velocityScale?: number;
  /** For the thumbnail: the clip to show, part way through. */
  poster?: string;
  height?: number;
}

/** A body of a gravity element: a planet drawn to scale, or a small ball. */
export interface GravityBody {
  id: string;
  /** Mass in kilograms. */
  mass: number;
  /** What is written by it ("Earth"); its mass otherwise ("800 kg", "6.0 × 10²⁴ kg"). */
  label?: string;
  /** Where its centre starts, in metres (y is 0 otherwise). */
  x: number;
  y?: number;
  /** Its radius in metres, drawn to scale (a planet). Without one it is a small ball. */
  radius?: number;
  /** The radius of the ball in pixels (16 by default); it swells as its mass grows. */
  size?: number;
  /**
   * It starts in a circular orbit round the first body, anticlockwise: its speed is worked out,
   * √(GM ÷ r). It moves while a phase lets time run (`fly`).
   */
  orbit?: boolean;
  /** Or its starting velocity, in metres per second, as [right, up]: it falls freely under the pull of the bodies that stay where they are. */
  v?: [number, number];
  tone?: Tone;
}

/** A stretch of a gravity clip, during which bodies are carried to new places, change their mass, or fly freely. */
export interface GravityPhase {
  /** How long it lasts, in seconds of video. */
  dur: number;
  /** Where bodies are carried to during the phase, by id: a new x in metres, or [x, y]. */
  to?: Record<string, number | [number, number]>;
  /** The masses bodies have by the end of the phase, in kilograms, by id. */
  mass?: Record<string, number>;
  /**
   * Bodies thrown as the phase starts, by id, each with a velocity in metres per second as
   * [right, up]. A body that has flown before is put back where it started first, and the path it
   * took stays on the picture, faded, to compare with the new one.
   */
  launch?: Record<string, [number, number]>;
  /** Let time run: bodies in orbit and bodies that have been thrown move under gravity, `rate` seconds of motion for each second of video. */
  fly?: boolean;
  /** Seconds of the motion for each second of video in this phase (the element's `rate` otherwise). */
  rate?: number;
  /** A short note shown over the picture. */
  note?: string;
}

export interface GravityClip {
  phases: GravityPhase[];
  /** Put every body back at its start, with its first mass. */
  reset?: boolean;
}

/** What a gravity element can show over its bodies; each is a part ("space.force"). */
export const GRAVITY_PARTS = ['force', 'distance', 'radius', 'height', 'field', 'g', 'velocity', 'trail', 'orbit', 'clock', 'turns'] as const;

/**
 * Bodies in space that attract one another, for universal gravitation, gravitational fields and
 * orbits (src/video/gravity.ts). The script gives the masses and where the centres are, in
 * kilograms and metres; the forces and the field strengths are worked out from Newton's law, and
 * they change as a clip carries a body away or makes it heavier. Showing the element shows the
 * bodies; showing a part adds it: `force` (the pull on each body, with its size: the two pulls of a
 * pair are always equal), `distance` (the distance r between the centres of the first two bodies),
 * `radius` and `height` (the radius of the first body, and how far the second is above its
 * surface), `field` (arrows of the first body's field, shorter where it is weaker) and `g` (the
 * field strength where each of the other bodies is). A body with `orbit` or a velocity, or one that
 * a phase throws (`launch`), moves freely under gravity while a phase lets time run (`fly`): it
 * orbits, or it falls until it lands on a planet. For those there are `velocity` (green, with the
 * speed), `trail` (the path taken), `orbit` (the circle of each orbit), `clock` and `turns` (the
 * orbits each body has completed). Emphasising a body's id makes it glow.
 */
export interface GravityEl {
  kind: 'gravity';
  id: string;
  /** The first body is the one whose radius and field are shown. */
  bodies: GravityBody[];
  /** What the picture shows, in metres: [left, right, bottom, top]. */
  view: [left: number, right: number, bottom: number, top: number];
  /** The gravitational constant (6.67 × 10⁻¹¹ N·m²/kg² otherwise). */
  G?: number;
  /** Write distances in this unit and not in metres ({ metres: 6.37e6, symbol: 'R' } gives "r = 2 R"). */
  unit?: { metres: number; symbol: string };
  /** How many significant figures distances are written with (2 otherwise: "7.0 × 10⁶ m"). */
  figures?: number;
  /** Draw the pull on these bodies only (on every body otherwise). */
  pulls?: string[];
  /** Write every force and speed in scientific notation ("6.53 × 10³ N"); otherwise only very large and very small ones. */
  notation?: 'sci';
  /** Seconds of the motion for each second of video, while a phase lets time run (1 otherwise). */
  rate?: number;
  /** The unit of the clock ({ unit: 'min', seconds: 60 }; seconds otherwise). */
  clock?: { unit: string; seconds: number };
  /** A mountain on top of the first body, this many metres high, to throw things from (Newton's cannon). */
  mountain?: number;
  /** Pixels of arrow for each metre per second (otherwise the fastest body at the start, or the fastest throw, has an arrow of 80 pixels). */
  velocityScale?: number;
  clips: Record<string, GravityClip>;
  /** A label at the top left of the picture. */
  label?: string;
  /** Pixels of arrow for each newton (otherwise the largest force at the start is 110 pixels long). */
  forceScale?: number;
  /** Pixels of field arrow for each newton per kilogram (otherwise 56 pixels at the surface of the first body). */
  fieldScale?: number;
  /** For the thumbnail: the clip to show, part way through. */
  poster?: string;
  height?: number;
}

/** A body of a charges element: a small charged ball, a metal sphere on an insulating stand, a rod, a cloth, or an atom. */
export interface ChargeBody {
  id: string;
  /**
   * What it is. A `point` (the default) is a small ball that carries its charge as a number. A
   * `sphere` is a metal ball, a conductor: its electrons move over the whole of it, so they lean
   * towards a positive body that is near and away from a negative one. A `rod` and a `cloth` are
   * insulators: their charges stay where they are put. An `atom` has its + marks in its nucleus and
   * its electrons circling in two shells, two in the first and up to eight in the second.
   */
  shape?: 'point' | 'sphere' | 'rod' | 'cloth' | 'atom';
  /** Its charge at the start, in the element's unit of charge. */
  charge: number;
  /** Where its centre starts (y is 0 otherwise). */
  x: number;
  y?: number;
  /** What it is called, written by it ("A", "Glass rod"). */
  label?: string;
  /** Where its name and charge are written: over it (the default), under it, or to one side. */
  labelAt?: 'above' | 'below' | 'left' | 'right';
  /** The radius of a sphere or of an atom, or half the length of a rod or a cloth, in the units of the view. A point is drawn to scale with one, and 20 pixels otherwise. */
  radius?: number;
  /** Half the thickness of a rod or a cloth (otherwise a rod is a fifth as thick as it is long, and a cloth three fifths). */
  thick?: number;
  /** A rod or a cloth turned anticlockwise, in degrees. Its working end, where electrons arrive and leave first, is the right-hand end before it is turned. */
  turn?: number;
  /**
   * Draw its charges: this many + marks, which never move, and an electron for each, less the ones
   * it has lost and plus the ones it has gained. Each mark stands for the element's `mark` of
   * charge, so the charge must be a whole number of marks.
   */
  pairs?: number;
  /** A sphere stands on an insulating stand unless this is false. */
  stand?: boolean;
  /** The side of a sphere its ground wire is joined to (the right otherwise). */
  wire?: 'left' | 'right';
  /** Its mass in kilograms: it moves under the forces on it while a phase lets time run (`fly`). */
  mass?: number;
  /** Its velocity at the start, in metres per second, as [right, up] (at rest otherwise). */
  v?: [number, number];
  /**
   * A test charge: it feels the forces of the others, but they are drawn and worked out as if it
   * were not there. The electric field is drawn where each test charge is (`field`), so one with
   * no charge at all marks a point of the field. With a mass and a velocity, a test charge with no
   * charge marks a path instead: no force acts on it and nothing stops at it, so its trail is the
   * straight line a charge beside it would have followed (it can start at the same place).
   */
  test?: boolean;
  tone?: Tone;
}

/** Two parallel plates with a potential difference between them, and a uniform field in the gap. */
export interface ChargePlates {
  /** Where the two plates are, along the line the field points: the first is the positive one while `volts` is above zero. */
  at: [first: number, second: number];
  /** Upright plates, with the field along x (the default), or level ones, with the field along y. */
  across?: 'x' | 'y';
  /** How far the plates reach the other way: [from, to]. */
  span: [from: number, to: number];
  /** The potential difference between them in volts: the potential of the first plate less that of the second. */
  volts: number;
  /** The potential of the second plate, in volts (0 otherwise). */
  base?: number;
  /** A hole in the middle of a plate that lets a body through (the anode of an electron gun). */
  hole?: 'first' | 'second';
  /** How many field lines there are at the start (7 otherwise); a stronger field has more of them. */
  lines?: number;
  /** How many dashed lines of equal potential are drawn between the plates, evenly spaced, with the `potential` part (none otherwise). */
  levels?: number;
}

/**
 * A uniform magnetic field at right angles to the picture, in a charges element. A charge that
 * moves across it feels the force F = qvB, at right angles to its velocity, so it turns in a
 * circle without changing its speed.
 */
export interface ChargeMagnet {
  /** The field strength in teslas: out of the page when it is above zero (drawn as dots), and into the page when below (crosses). */
  tesla: number;
  /** Where the field is: [left, right, bottom, top] (the whole picture otherwise). */
  region?: [left: number, right: number, bottom: number, top: number];
  /** A side of the region that is a detector: a body that leaves the field through it stops there. */
  screen?: 'left' | 'right' | 'bottom' | 'top';
  /** How many significant figures the field strength is written with (2 otherwise). */
  figures?: number;
}

/** A stretch of a charges clip: bodies are carried, electrons cross from one to another, or time runs. */
export interface ChargesPhase {
  /** How long it lasts, in seconds of video. */
  dur: number;
  /** Where bodies are carried to during the phase, by id: a new x, or [x, y]. */
  to?: Record<string, number | [number, number]>;
  /** The charges that bodies without marks have by the end of the phase, by id. */
  charge?: Record<string, number>;
  /**
   * Electrons that cross during the phase, one after another, each standing for one mark of
   * charge: from a body to a body, or to and from the ground (`'ground'`) along the wire of a
   * sphere that is grounded.
   */
  electrons?: Array<{ from: string; to: string; n: number }>;
  /** Join spheres to the ground with a wire (true), or take the wire away (false), as the phase starts. */
  ground?: Record<string, boolean>;
  /** Let time run: bodies with a mass move under the forces on them, until they touch another body or a plate. */
  fly?: boolean;
  /** The potential difference of the plates by the end of the phase, in volts. */
  volts?: number;
  /** Where the two plates are by the end of the phase. */
  plates?: [first: number, second: number];
  /** The strength of the magnetic field by the end of the phase, in teslas. */
  tesla?: number;
  /** Velocities that bodies are given as the phase starts, in metres per second, by id: [right, up]. */
  launch?: Record<string, [number, number]>;
  /** Seconds of the motion for each second of video in this phase (the element's `rate` otherwise). */
  rate?: number;
  /** A short note shown over the picture. */
  note?: string;
}

export interface ChargesClip {
  phases: ChargesPhase[];
  /** Put every body back at its start, with its first charge. */
  reset?: boolean;
}

/** What a charges element can show over its bodies; each is a part ("lab.force"). */
export const CHARGES_PARTS = ['charge', 'force', 'net', 'angle', 'distance', 'velocity', 'lines', 'field', 'netfield', 'potential', 'gap', 'energy', 'trail', 'magnetic', 'radius'] as const;

/** The units a charge can be given in, in coulombs (`e` is the elementary charge: "+e", "−2e"). */
export const CHARGE_UNITS = { C: 1, mC: 1e-3, μC: 1e-6, nC: 1e-9, e: 1.6e-19 } as const;

/**
 * Charged bodies, for electric charge, the ways of charging an object and Coulomb's law
 * (src/video/charges.ts). A body with `pairs` shows its charges: + marks that stay where they are,
 * and electrons that move. A phase sends electrons from one body to another (`electrons`), so
 * rubbing, touching and grounding are seen as what they are, and the charge written by each body
 * (`charge`) follows the electrons it holds. The electrons of a metal sphere lean towards a
 * positive body that is brought near and away from a negative one. The forces are worked out from
 * Coulomb's law, F = k q₁ q₂ ÷ r², with the charges in the element's `unit` and the distances of
 * the view in metres: `force` draws each force on a body from each of the others, with its size,
 * `net` their sum, `angle` the angle of the sum from the east-west line, and `distance` the
 * distance r between the centres of the pairs in `spans` (the first two bodies otherwise). A body
 * with a mass moves under the forces on it while a phase lets time run (`fly`), with `velocity`
 * for its speed. A magnetic field at right angles to the picture (`magnetic`) pushes a moving
 * charge sideways, F = qvB: the part `magnetic` draws the field, as dots or crosses, and `radius`
 * the radius of the circle each charge is on. Emphasising a body's id makes it glow.
 */
export interface ChargesEl {
  kind: 'charges';
  id: string;
  bodies: ChargeBody[];
  /** What the picture shows, in metres: [left, right, bottom, top]. */
  view: [left: number, right: number, bottom: number, top: number];
  /** The unit the charges are given and written in (microcoulombs otherwise). */
  unit?: keyof typeof CHARGE_UNITS;
  /** The charge that one mark stands for, in the element's unit (for bodies with `pairs`). */
  mark?: number;
  /** How many decimal places charges are written with (none otherwise: "+12 nC"). */
  decimals?: number;
  /** Coulomb's constant (8.99 × 10⁹ N·m²/C² otherwise). */
  k?: number;
  /** Write distances in this unit and not in metres ({ metres: 0.01, symbol: 'cm' }). */
  length?: { metres: number; symbol: string };
  /** How many significant figures distances are written with (2 otherwise: "0.30 m"). */
  figures?: number;
  /** The pairs of bodies whose distance apart is marked (the first two bodies otherwise). */
  spans?: Array<[string, string]>;
  /** Draw the forces on these bodies only (on every body otherwise). */
  pulls?: string[];
  /** Draw the forces without their sizes (a picture that is not to scale). */
  plain?: boolean;
  /** Write every force in scientific notation ("8.22 × 10⁻⁸ N"); otherwise only very large and very small ones. */
  notation?: 'sci';
  /** How many significant figures forces are written with (3 otherwise: "1.50 N"). */
  forceFigures?: number;
  /** Or how many decimal places, so that forces that are added line up ("1.35 N", "1.01 N", "0.34 N"). */
  forceDecimals?: number;
  /**
   * Mark each distance on a dashed line that joins the two bodies, with its size near the second
   * body of the pair, and not on a dimension line beside them: for bodies that are not all in a row.
   */
  join?: boolean;
  /** How many decimal places the angle of a net force is written with (1 otherwise). */
  angleDecimals?: number;
  /** Seconds of the motion for each second of video, while a phase lets time run (1 otherwise). */
  rate?: number;
  /** The height of the table that the stands of the spheres are on (otherwise a little below the lowest sphere). */
  floor?: number;
  /** The charge that, at two and a half radii from the centre of a sphere, makes its electrons lean half way (four marks otherwise). */
  sway?: number;
  /** Pixels of arrow for each newton (otherwise the largest force of the element is 110 pixels long). */
  forceScale?: number;
  /** Pixels of arrow for each metre per second (otherwise the greatest speed of the element is 90 pixels long). */
  velocityScale?: number;
  /** Write the speed by each velocity arrow, with this many significant figures. */
  speedFigures?: number;
  /** Two parallel plates, with a uniform field between them. */
  plates?: ChargePlates;
  /** A uniform field over the whole picture, in newtons per coulomb, at `angle` degrees anticlockwise from the right (0 otherwise). */
  uniform?: { field: number; angle?: number; lines?: number };
  /** A uniform magnetic field into or out of the page, over the whole picture or a part of it. */
  magnetic?: ChargeMagnet;
  /** The gravitational field strength, in newtons per kilogram: bodies with a mass then have a weight (none otherwise). */
  g?: number;
  /** How many field lines leave, or end on, the largest charge of the element (12 otherwise); a smaller charge has fewer in proportion. */
  lines?: number;
  /** Pixels of arrow for each newton per coulomb (otherwise the strongest field at a test charge is 110 pixels long). */
  fieldScale?: number;
  /** How many significant figures a field strength is written with (3 otherwise). */
  fieldFigures?: number;
  /** Write the name of each force by its arrow ("Electric force", "Weight") and not its size. */
  names?: boolean;
  /** The side of the picture the energy bars are on (the right otherwise). */
  energyAt?: 'left' | 'right';
  /** The parts drawn on the thumbnail (otherwise the charges, and the forces unless the bodies show their electrons). */
  thumb?: Array<(typeof CHARGES_PARTS)[number]>;
  clips: Record<string, ChargesClip>;
  /** A label at the top left of the picture. */
  label?: string;
  /** For the thumbnail: the clip to show, part way through. */
  poster?: string;
  height?: number;
}

/** A bar magnet of a magnets element. */
export interface MagnetBar {
  id: string;
  /** Its centre, [x, y], in the element's length unit. */
  at: [number, number];
  /** Its length from end to end, and its thickness. */
  long: number;
  thick: number;
  /** The way its north pole faces, in degrees anticlockwise from the right (0 otherwise). */
  angle?: number;
  /** How many field lines leave its north pole (12 otherwise): a stronger magnet has more. */
  lines?: number;
  /** A name written beside it. */
  label?: string;
  /** Draw its field but no bar (the magnet inside the Earth is drawn faintly instead). */
  faint?: boolean;
}

/** A long straight wire of a magnets element, seen end-on. */
export interface MagnetWire {
  id: string;
  at: [number, number];
  /** Its current in amperes: positive comes out of the page (drawn as a dot), negative goes in (a cross). */
  amps: number;
  /** The length of it that lies in the field, in metres: the force on it is then written in newtons (in newtons for each metre otherwise). */
  metres?: number;
  /** Its mass in kilograms: it then moves under the force on it (and its weight, when the element has `g`) while a clip plays. It needs `metres`. */
  mass?: number;
  /** It lies on supports, so it cannot go below where it starts. */
  rests?: boolean;
  /** A name written beside it (its current otherwise). */
  label?: string;
  labelAt?: 'above' | 'below' | 'left' | 'right';
}

/**
 * The coil of a motor in a magnets element, seen from one end: two sides, one each side of the
 * axle, that carry the same current opposite ways. The forces on them turn the coil about the axle.
 * With `drive` it is the coil of a generator instead: something outside turns it at a steady rate,
 * and an emf is induced in its sides as they cut across the field.
 */
export interface MagnetCoil {
  id: string;
  /** Its axle, [x, y]. */
  at: [number, number];
  /** How far each side is from the axle, in the element's length unit. */
  radius: number;
  /** The angle of the first side at the start, in degrees anticlockwise from the right (0 otherwise). */
  angle?: number;
  /** The current in the coil, in amperes: positive comes out of the page in the first side (with a commutator, in the side that is further along the field). */
  amps: number;
  /** How many turns it has (1 otherwise): the force on a side is NBIL. */
  turns?: number;
  /** The length of each side that lies in the field, in metres. */
  metres: number;
  /** Its moment of inertia about the axle, in kg·m²: how hard it is to set turning. A motor needs it; a coil that is driven does not. */
  inertia?: number;
  /** The friction at the axle, in newton metres for each radian per second (none otherwise). */
  friction?: number;
  /** A split-ring commutator and two brushes: the current in the coil is reversed every half turn. */
  commutator?: boolean;
  /**
   * A generator: the coil is turned from outside at this many turns each second (anticlockwise is
   * positive), whatever the forces on it. Give it `amps: 0`: the only current is the induced one.
   */
  drive?: number;
  /** For a generator: the resistance joined across its brushes, in ohms. The induced current ε ÷ R then flows in the coil, and the field pushes back on its sides. */
  load?: number;
  /** For a generator: two slip rings, each joined to one end of the coil and touching its own brush, so the output alternates as the emf does. (With `commutator` the output always has the same sign.) */
  slip?: boolean;
}

/**
 * A coil joined to a sensitive meter, in a magnets element, seen from the side: its axis lies along
 * x, and a bar magnet on that axis can be pushed into it. The flux of the magnet through its turns
 * is worked out from the poles, and while that flux changes an emf is induced: the needle of the
 * meter swings, further for a faster change, one way as the flux grows and the other way as it falls.
 */
export interface MagnetPickup {
  id: string;
  /** Its centre, [x, y], in the element's length unit. */
  at: [number, number];
  /** Its length along the axis, and the radius of its turns. */
  long: number;
  radius: number;
  /** How many turns are drawn (7 otherwise). */
  drawn?: number;
  /** Where the middle of the meter is, [x, y] (under the coil otherwise). */
  meter?: [number, number];
}

/** A place in a magnets element: a compass, whose needle turns to the field there, or a probe, which shows the field there as an arrow. */
export interface MagnetPoint {
  id: string;
  at: [number, number];
  label?: string;
  labelAt?: 'above' | 'below' | 'left' | 'right';
}

/** A piece of iron in a magnets element, drawn with its domains: small arrows that point every way until `order` lines them up. */
export interface MagnetIron {
  id: string;
  at: [number, number];
  long: number;
  thick: number;
  /** How many domains across and down ([8, 3] otherwise). */
  cells?: [number, number];
  /** How far its domains are lined up at the start, from 0 (every way) to 1 (all one way). */
  order?: number;
  label?: string;
}

/** A stretch of a magnets clip: things are carried or turned, currents change, or domains line up. */
export interface MagnetsPhase {
  /** How long it lasts, in seconds. */
  dur: number;
  /** Where bars, wires, compasses, probes and pieces of iron are by its end, by id. */
  to?: Record<string, [number, number]>;
  /** The angle a bar has by its end, in degrees. */
  turn?: Record<string, number>;
  /** The current a wire (or the coil) carries by its end, in amperes. */
  amps?: Record<string, number>;
  /** How fast the coil of a generator is turned by its end, in turns per second. */
  drive?: number;
  /** How far the domains of a piece of iron are lined up by its end (0 to 1). */
  order?: Record<string, number>;
}

export interface MagnetsClip {
  phases: MagnetsPhase[];
}

/** What a magnets element can show; each is a part ("mag.lines"). */
export const MAGNETS_PARTS = ['lines', 'compass', 'field', 'distance', 'force', 'weight', 'current', 'poles', 'trace'] as const;

/**
 * Magnets, wires and compasses seen from above (src/video/magnets.ts): the magnetic field of bar
 * magnets (two poles each) and of long straight wires seen end-on (B = μ₀I ÷ 2πr, circling the
 * wire as the right-hand rule says), with a uniform field added if one is given. Showing the
 * element shows the magnets, the wires and the iron; showing a part adds it: `lines` (the field
 * lines: out of each north pole and round to a south pole, and round the wires from the `seeds`),
 * `compass` (the compasses, whose needles point along the field where they are), `field` (at
 * each probe, an arrow along the field, with its strength in teslas when the picture has no bar
 * magnet), `distance` (from the first wire to each probe) and `force` (the push or pull between
 * bar magnets, and the force of the field on each wire and on each side of the coil, F = BIL) and
 * `weight` (the weight of each wire that has a mass). With a `pickup` coil, `current` shows which
 * way the induced current goes round its turns, `poles` the poles that current gives the coil, and
 * `force` the push of the coil on the magnet, against its motion. With a coil that is driven (a
 * generator), `trace` draws the emf at its brushes against time. A clip carries things about, turns a magnet,
 * changes a current or lines up the domains of a piece of iron; while it plays, a wire with a mass
 * moves under the forces on it, and the coil of a motor turns. North is red, south is blue, the
 * field is violet, a current is yellow, a force is orange and a weight is pink. Emphasising an id
 * makes that thing glow.
 */
export interface MagnetsEl {
  kind: 'magnets';
  id: string;
  /** The part of the plane that is drawn: [left, right, bottom, top], in the length unit. */
  view: [number, number, number, number];
  /** The length unit: how many metres it is, and its symbol (metres otherwise). */
  length?: { metres: number; symbol: string };
  bars?: MagnetBar[];
  wires?: MagnetWire[];
  compasses?: MagnetPoint[];
  probes?: MagnetPoint[];
  iron?: MagnetIron[];
  /** Where the field lines that close on themselves start (the lines round wires): points [x, y]. */
  seeds?: Array<[number, number]>;
  /** A uniform field added everywhere, in teslas: [Bx, By]. `uniformLines` straight lines are drawn for it when there is nothing else to make a field (7 otherwise). */
  uniform?: [number, number];
  uniformLines?: number;
  /**
   * The magnet that makes the uniform field, seen from one end: a north pole face at one of the
   * `faces` (two values of x) and a south pole face at the other, between the two heights of
   * `span`. The field is then only in the gap between them. `thick` is how wide each pole is drawn
   * (an eighth of the view otherwise), and `base` the thickness of the bar that joins the poles
   * under the gap, when the magnet is a U (no bar otherwise). The uniform field must point along x.
   */
  yoke?: { faces: [number, number]; span: [number, number]; thick?: number; base?: number };
  /** The coil of a motor. */
  coil?: MagnetCoil;
  /** A coil joined to a meter, for a bar magnet to be pushed into. The bar magnets must lie on its axis. */
  pickup?: MagnetPickup;
  /**
   * For a generator: a graph of the emf at its brushes against time, drawn between two values of
   * x (`at`) and two of y (`span`). `volts` is the emf at the top of the graph, and `seconds` the
   * time (of the model) that one sweep across it takes; the trace then starts again from the left.
   */
  trace?: { at: [number, number]; span: [number, number]; volts: number; seconds: number };
  /** Gravity, in m/s², down the screen: the picture is then seen from the side, and a wire with a mass has a weight. */
  g?: number;
  /** Seconds of the model for each second of video, while wires and the coil move (1 otherwise). */
  rate?: number;
  /** A balance under the magnet: it reads this many grams with no current, and more or less as the wires push back on the magnet. It needs `g` and a `yoke`. */
  balance?: { grams: number; decimals?: number };
  /** Draw the Earth round the first bar magnet: a disc of this radius, with the geographic poles named. */
  earth?: number;
  /** How long the arrow of a probe is, in pixels for each tesla (every arrow is 64 pixels long otherwise). */
  fieldScale?: number;
  /** How long a force arrow is, in pixels for each newton (or newton per metre) on a wire. */
  forceScale?: number;
  /** Significant figures of a field strength, a distance and a force (2 otherwise). */
  figures?: number;
  /** The parts drawn on the thumbnail (the field lines and the compasses otherwise). */
  thumb?: string[];
  /** For the thumbnail: the clip to show, at its end, or this far through it (`posterAt`, from 0 to 1). */
  poster?: string;
  posterAt?: number;
  clips: Record<string, MagnetsClip>;
  /** A label at the top left of the picture. */
  label?: string;
  height?: number;
}

/** A coil seen face on, in an induction element: a rectangle of wire, joined to a meter that reads the emf induced in it. */
export interface InductionLoop {
  id: string;
  /** Its sides: [left, right, bottom, top], in the element's length unit. */
  rect: [number, number, number, number];
  /** How many turns it has (1 otherwise). */
  turns?: number;
  /** The resistance of its circuit in ohms: an induced current then flows round it (the meter reads the emf, and no current flows, otherwise). */
  ohms?: number;
}

/** Two level rails in an induction element, joined at their left ends by a resistor, with a rod that slides along them. */
export interface InductionRails {
  id: string;
  /** Where the rails start (at the resistor) and end: two values of x. */
  x: [number, number];
  /** Where the two rails are: two values of y, the lower one first. */
  y: [number, number];
  /** The resistance that joins the rails, in ohms (the rod and the rails have none). */
  ohms: number;
  /** Where the rod starts: a value of x. */
  rod: number;
  /** The speed of the rod at the start, in metres per second (at rest otherwise): positive is to the right. */
  speed?: number;
  /** The mass of the rod in kilograms, for a phase that lets it go (`free`). */
  mass?: number;
}

/** A stretch of an induction clip: the field changes steadily, the rod is brought steadily to a speed, or the rod is let go. */
export interface InductionPhase {
  /** How long it lasts, in seconds of video. */
  dur: number;
  /** The field by its end, in teslas: it changes at a steady rate. */
  tesla?: number;
  /** The speed of the rod by its end, in metres per second: it changes at a steady rate, as if a hand moved the rod. */
  speed?: number;
  /** Let the rod go: only the magnetic force on it acts, so it slows down. The rod needs a mass. */
  free?: boolean;
}

export interface InductionClip {
  /** Start again from the first picture: the field and the rod go back to where they began before the clip plays. */
  reset?: boolean;
  phases: InductionPhase[];
}

/** What an induction element can show; each is a part ("ind.flux"). */
export const INDUCTION_PARTS = ['field', 'flux', 'emf', 'current', 'velocity', 'force', 'charge'] as const;

/**
 * A circuit in a magnetic field that points through the page (src/video/induction.ts): a coil seen
 * face on (`loop`), or two rails with a rod that slides along them (`rails`). The flux through the
 * circuit is Φ = BA, and while it changes an emf is induced, ε = NΔΦ ÷ Δt (Faraday's law): for a
 * rod of length L that moves at v across a field B, ε = BLv. The induced current flows the way
 * that opposes the change (Lenz's law), and the field pushes back on the rod with F = BIL.
 * Showing the element shows the circuit; showing a part adds it: `field` (a dot where the field
 * comes out of the page and a cross where it goes in, larger in a stronger field, with its
 * strength), `flux` (the area of the circuit that the field passes through, and the flux), `emf`
 * (the emf, on the meter of a coil or beside the rod), `current` (arrowheads that go round the
 * circuit the way the current does, and its size), `velocity` and `force` (of the rod) and
 * `charge` (the ends of the rod the field pushes its charges to). A clip changes the field or the
 * speed of the rod at a steady rate, or lets the rod go. The field is violet, a current is yellow,
 * a velocity is green and a force is orange. Emphasising an id makes that thing glow.
 */
export interface InductionEl {
  kind: 'induction';
  id: string;
  /** The part of the plane that is drawn: [left, right, bottom, top], in the length unit. */
  view: [number, number, number, number];
  /** The length unit: how many metres it is, and its symbol (metres otherwise). */
  length?: { metres: number; symbol: string };
  /** The field at the start, in teslas: positive comes out of the page, negative goes into it. */
  tesla: number;
  /** Where the field is: [left, right, bottom, top] (everywhere otherwise). */
  region?: [number, number, number, number];
  /** Give a coil or the rails, not both. */
  loop?: InductionLoop;
  rails?: InductionRails;
  /** Seconds of the model for each second of video (1 otherwise). */
  rate?: number;
  /** Write the flux in milliwebers (webers otherwise). */
  milli?: boolean;
  /** How long a velocity arrow is, in pixels for each metre per second, and a force arrow, in pixels for each newton. */
  velocityScale?: number;
  forceScale?: number;
  /** Significant figures of what is written (2 otherwise). */
  figures?: number;
  /** The parts drawn on the thumbnail (the field and the current otherwise). */
  thumb?: string[];
  /** For the thumbnail: the clip to show, part way through. */
  poster?: string;
  clips: Record<string, InductionClip>;
  /** A label at the top left of the picture. */
  label?: string;
  height?: number;
}

/** One step of a transformer clip. */
export interface TransformerPhase {
  /** Seconds of video. */
  dur: number;
  /** Close (true) or open (false) the switch of the supply as the phase starts. */
  on?: boolean;
  /** Wind the secondary coil to this many turns by the end of the phase. */
  secondary?: number;
}

export interface TransformerClip {
  phases: TransformerPhase[];
}

/** What a transformer element can show; each is a part ("tr.flux"). */
export const TRANSFORMER_PARTS = ['flux', 'turns', 'voltage', 'current', 'power'] as const;

/**
 * A transformer (src/video/transformer.ts): an iron core with a primary coil on the left, joined
 * to its supply, and a secondary coil on the right. The same flux passes through every turn of
 * both coils, so Vs ÷ Vp = Ns ÷ Np, and an ideal transformer passes on all of the power:
 * VpIp = VsIs. Parts: `flux` (the flux in the core, which brightens as it grows and turns round
 * when it reverses), `turns` (the turns of each coil), `voltage` (a screen beside each coil that
 * draws its voltage against time, both to one scale, with the voltage written over it), `current`
 * (the current in each coil, which needs a `load`) and `power` (the power in each coil). A clip
 * runs the supply; a phase can close or open the switch, or wind turns on or off the secondary.
 * With `dc` the supply is a battery and a switch: the secondary then gives one short kick each
 * time the switch moves, and nothing while the current is steady. The flux is violet, and a
 * voltage is yellow.
 */
export interface TransformerEl {
  kind: 'transformer';
  id: string;
  /** The turns on the primary coil and on the secondary coil. */
  turns: [number, number];
  /** The voltage of the supply across the primary coil, in volts. */
  volts: number;
  /** The frequency of an alternating supply, in hertz (50 otherwise). */
  hertz?: number;
  /** A battery and a switch in place of the alternating supply. */
  dc?: boolean;
  /** Whether the supply is joined at the start (an alternating supply is, and a battery is not, otherwise). */
  on?: boolean;
  /** With a battery: the seconds of the model that its current takes to settle after the switch moves (0.004 otherwise). */
  settle?: number;
  /** The resistance of the lamp across the secondary coil, in ohms (nothing is joined to it otherwise). */
  load?: number;
  /** Seconds of the model for each second of video (0.005 otherwise, so 50 Hz is one cycle in four seconds). */
  rate?: number;
  /** The seconds of the model that one sweep of the two screens takes (two cycles otherwise). */
  sweep?: number;
  /** Significant figures of what is written (2 otherwise). */
  figures?: number;
  /** The parts drawn on the thumbnail (the flux otherwise). */
  thumb?: string[];
  /** For the thumbnail: the clip to show, part way through. */
  poster?: string;
  clips: Record<string, TransformerClip>;
  /** A label at the top left of the picture. */
  label?: string;
  height?: number;
}

/** One step of a power line clip. */
export interface PowerlinePhase {
  /** Seconds of video. */
  dur: number;
  /** Step the voltage of the line up or down to this many volts by the end of the phase. */
  volts?: number;
}

export interface PowerlineClip {
  phases: PowerlinePhase[];
}

/** What a power line element can show; each is a part ("line.loss"). */
export const POWERLINE_PARTS = ['voltage', 'current', 'loss'] as const;

/**
 * A power line (src/video/transformer.ts): a power station sends a fixed power P to a town along
 * a line of resistance R, with a transformer at each end. At a line voltage V the current is
 * I = P ÷ V, and the power wasted as heat in the line is I²R. Parts: `voltage` (the voltage of
 * the line), `current` (the current, as a number and as dots that move along the line, faster for
 * a larger current) and `loss` (the power wasted, as a number, as a glow on the line and as its
 * share of a bar that stands for the power sent). A clip steps the voltage up or down. A current
 * is yellow and heat is orange.
 */
export interface PowerlineEl {
  kind: 'powerline';
  id: string;
  /** The power the station sends, in watts. */
  watts: number;
  /** The resistance of the line, in ohms. */
  ohms: number;
  /** The voltage of the line at the start, in volts. */
  volts: number;
  /** The parts drawn on the thumbnail (all three otherwise). */
  thumb?: string[];
  /** For the thumbnail: the clip to show, part way through. */
  poster?: string;
  clips: Record<string, PowerlineClip>;
  /** A label at the top left of the picture. */
  label?: string;
  height?: number;
}

/** One step of a light clip. */
export interface LightPhase {
  /** Seconds of video. */
  dur: number;
  /** An electromagnetic wave: start (true) or stop (false) the charge that makes it, as the phase starts. */
  on?: boolean;
  /**
   * An electromagnetic wave: bring the frequency of its source steadily to this many cycles for
   * each second of video (the change travels out with the wave). A spinning mirror: bring it
   * steadily to this many turns each second.
   */
  hertz?: number;
  /** An electromagnetic wave with a filter: turn the filter steadily to this angle, in degrees from upright. */
  filter?: number;
  /** A spectrum: slide the pointer to this wavelength, in metres, by the same factor in each moment. */
  to?: number;
  /** A trip: send a flash from the source as the phase starts. */
  send?: boolean;
}

export interface LightClip {
  phases: LightPhase[];
}

/** An electromagnetic wave that leaves a charge driven up and down an aerial. */
export interface LightWave {
  /** The frequency of the charge, in cycles for each second of video. The wave crosses the picture at one speed, so a higher frequency is a shorter wavelength. */
  hertz: number;
  /** The seconds of video the wave takes to cross the picture (3 otherwise). */
  cross?: number;
  /** Whether the charge is driven at the start (it is, otherwise). */
  on?: boolean;
  /** The wave fills the picture from the start (otherwise it runs out from the aerial). */
  full?: boolean;
  /** A polarizing filter across the path: `at` is how far along the path it stands (0 to 1), and `angle` is how far it is turned from upright, in degrees. It passes the part of the electric field that is along its own direction. */
  filter?: { at: number; angle: number };
  /** The real frequency, in hertz, that `hertz` stands for: the part `values` then writes the real frequency and wavelength. */
  real?: number;
}

/** A place something can be drawn at an end of a trip of light. */
export type LightShape = 'sun' | 'earth' | 'moon' | 'dish' | 'plane' | 'lamp' | 'mirror';

/** A flash of light that travels from a source to a target, and perhaps back again. */
export interface LightTrip {
  from: { shape: LightShape; label?: string };
  to: { shape: LightShape; label?: string };
  /** The distance between them, in metres. */
  metres: number;
  /** The flash is reflected, and the clock runs until it is back at the source. */
  echo?: boolean;
  /** The clock in another unit: its name, and how many seconds one of it is ({ unit: 'μs', seconds: 1e-6 }). */
  clock?: { unit: string; seconds: number };
  /** Distances in another unit: its name, and how many metres one of it is ({ unit: 'km', metres: 1000 }). */
  length?: { unit: string; metres: number };
}

/** Michelson's measurement: a mirror with eight flat faces spins, and sends flashes of light to a fixed mirror far away and back. */
export interface LightSpin {
  /** The distance to the fixed mirror, in metres. */
  metres: number;
  /** The turns the mirror makes each second at the start (it is at rest otherwise, and the light is a steady beam). */
  hertz?: number;
}

/** What a light element can show; each is a part ("em.magnetic"). */
export const LIGHT_PARTS = ['electric', 'magnetic', 'wavelength', 'speed', 'values', 'scale', 'wave', 'made', 'use', 'visible', 'ionizing', 'arrows', 'clock', 'distance', 'travelled', 'turn', 'rate'] as const;

/**
 * Light as an electromagnetic wave (src/video/light.ts). One element is one of four pictures.
 *
 * `wave` is the wave that leaves a charge driven up and down an aerial: its electric field
 * (yellow, part `electric`) is up and down, its magnetic field (violet, part `magnetic`) is at
 * right angles to it, drawn towards and away from you, and both are at right angles to the way
 * the wave travels. Parts: `wavelength`, `speed` and `values` (the real frequency and wavelength,
 * with `real`). A phase can start or stop the charge, change its frequency, or turn a polarizing
 * `filter`.
 *
 * `spectrum` is the electromagnetic spectrum, drawn to a scale on which each step is ten times
 * shorter: a pointer slides along it, and a wave over it shortens as it goes. Parts: `wave`,
 * `values` (the wavelength and the frequency at the pointer), `scale`, `made` and `use` (what
 * makes the waves of that region, and one use of them), `visible` (the visible band drawn
 * larger, from red to violet), `ionizing` and `arrows`.
 *
 * `trip` is a flash of light that travels from a source to a target at 3.00 × 10⁸ m/s, and back
 * with `echo`. Parts: `clock`, `distance` and `travelled` (how far the flash has gone).
 *
 * `spin` is Michelson's measurement of the speed of light with a spinning mirror. At rest, the
 * beam grows along the path to the detector while a clip plays. Once the mirror turns, each time a
 * face is in place a flash leaves for a fixed mirror far away; when it returns, the mirror has
 * turned, and the flash reaches the detector only if the next face stands where the first one
 * was. Parts: `rate` (the turns each second), `clock` (the time of the round trip), `turn` (the
 * share of a turn the mirror makes in that time) and `distance`.
 */
export interface LightEl {
  kind: 'light';
  id: string;
  wave?: LightWave;
  spectrum?: { /** The wavelength the pointer starts at, in metres. */ at: number };
  trip?: LightTrip;
  spin?: LightSpin;
  /** Seconds of the model for each second of video, for a trip or a spinning mirror (a trip one way, or a round trip of the spinning mirror, takes 2.5 seconds of video otherwise). */
  rate?: number;
  /** Significant figures of what is written (3 otherwise). */
  figures?: number;
  /** The parts drawn on the thumbnail (the fields of a wave, the wave over a spectrum, the clock of a trip, the rate of a spinning mirror, otherwise). */
  thumb?: string[];
  /** For the thumbnail: the clip to show, part way through (`posterAt` of the way, 0.7 otherwise). */
  poster?: string;
  posterAt?: number;
  clips: Record<string, LightClip>;
  /** A label at the top left of the picture. */
  label?: string;
  height?: number;
}

/** A body of a circle element: something that goes round a circle. */
export interface CircleBody {
  id: string;
  /** Mass in kilograms. */
  mass: number;
  /** What is written on it (its mass otherwise: "0.5 kg"). */
  label?: string;
  /** The radius of its circle, in metres. */
  r: number;
  /** Its speed in metres per second (in a vertical circle, the speed where it starts). Give this or the period. */
  speed?: number;
  /** The time for one turn, in seconds. */
  period?: number;
  /** Where it starts, in degrees anticlockwise from the right of the picture (0 otherwise; -90 is the lowest point of a vertical circle). */
  at?: number;
  /** Drawn as a ball (the default) or as a car, seen from above, that points the way it is going. */
  shape?: 'ball' | 'car';
  tone?: Tone;
}

/** A stretch of a circle clip. */
export interface CirclePhase {
  /** How long it lasts, in seconds of the motion's own time. */
  dur: number;
  /** Slow motion: seconds of video for each second of the motion (1 by default). */
  slow?: number;
  /** Hold everything still for `dur` seconds of video. */
  freeze?: boolean;
  /** Speeds the bodies reach, steadily, by the end of the phase, in metres per second, by body id. */
  speed?: Record<string, number>;
  /** Bodies let go as the phase starts (the string breaks, the tyres lose their grip): each carries on in a straight line. */
  release?: string[];
  /** A short note shown over the picture ("The string breaks"). */
  note?: string;
}

export interface CircleClip {
  phases: CirclePhase[];
  /** Put every body back at its start, on its circle, at its first speed. */
  reset?: boolean;
}

/** What a circle element can show over its bodies; each is a part ("spin.velocity"). */
export const CIRCLE_PARTS = ['velocity', 'accel', 'force', 'net', 'radius', 'tangent', 'trail', 'strobe', 'readout', 'period', 'meter', 'clock', 'turns'] as const;

/**
 * Bodies that move round a circle, for circular motion (src/video/circle.ts): seen from above on a
 * level surface, where each keeps a steady speed, or (`vertical`) on a circle that stands upright,
 * where gravity makes it slow down as it climbs and speed up as it falls. The script gives each
 * body's mass, radius and speed (or period); the centripetal acceleration and the forces are worked
 * out from them. `by` says what turns the bodies: a `string` (tension, and the string is drawn),
 * `friction` (a car on a road) or a `track` (the normal force of a loop). Showing the element
 * shows the circle and the bodies; showing a part adds it: `velocity` (green, along the tangent),
 * `accel` (the centripetal acceleration, towards the centre), `force` (the real forces: the one
 * named by `by` and, in a vertical circle, the weight), `net` (the net force), `radius`, `tangent`
 * (a dashed line along the velocity), `trail`, `strobe` (marks left every eighth of a turn, with
 * the arrows shown), `readout` (the speed and the acceleration, as numbers), `period`, `meter` (the
 * force needed beside the greatest the string or the road can give, `limit`), `clock` and `turns`.
 * Emphasising a body's id makes it glow.
 */
export interface CircleEl {
  kind: 'circle';
  id: string;
  bodies: CircleBody[];
  /** What turns the bodies; with none, only the net force can be drawn. */
  by?: 'string' | 'friction' | 'track';
  /** A circle that stands upright, so that the weight of each body matters. */
  vertical?: boolean;
  /** The gravitational field strength in newtons per kilogram (9.81 otherwise). */
  g?: number;
  /** The bodies go round clockwise (anticlockwise otherwise). */
  clockwise?: boolean;
  /** A turning platform under the bodies (a roundabout), of this radius in metres; it turns with the first body. */
  disc?: number;
  /** The greatest force the string or the road can give, in newtons, for the meter. */
  limit?: number;
  /** How far the picture reaches from the centre, in metres (a little more than the largest circle otherwise). */
  span?: number;
  /** Move the centre of the circle sideways, in pixels (to leave room for a body that is let go). */
  shift?: number;
  clips: Record<string, CircleClip>;
  /** A label at the top left of the picture. */
  label?: string;
  /** Pixels of arrow for each newton (otherwise the largest force at the start is 90 pixels long). */
  forceScale?: number;
  /** Pixels of arrow for each metre per second (otherwise the fastest body at the start has an arrow of 90 pixels). */
  velocityScale?: number;
  /** Pixels of arrow for each metre per second squared (otherwise the largest at the start is 70 pixels long). */
  accelScale?: number;
  /** For the thumbnail: the clip to show, part way through. */
  poster?: string;
  height?: number;
}

export type El = TitleEl | TextEl | QuoteEl | MathEl | BulletsEl | CalloutEl | TableEl | TriangleEl | SimilarEl | DiagramEl | CalcEl | TryEl | ScreenEl | MotionEl | ParticlesEl | WaveEl | RipplesEl | RaysEl | CircuitEl | FlightEl | RampEl | ForcesEl | GravityEl | ChargesEl | MagnetsEl | InductionEl | TransformerEl | PowerlineEl | LightEl | CircleEl | AtomsEl | MoleculesEl | ScatterEl;

export interface Line {
  /** What the narrator says, written as it should be spoken. */
  say: string;
  /** The caption, when it should read differently from what is said. */
  caption?: string;
  show?: string | string[];
  hide?: string | string[];
  /**
   * Emphasise parts ("tri.opp"); the parts listed for an element replace its earlier emphasis,
   * and the element id alone ("tri") clears it.
   */
  focus?: string | string[];
  /**
   * Start a motion element's clip as the line starts ("sim.push"); the next line waits for it to
   * finish. `playDelay` holds it back that many seconds into the line.
   */
  play?: string | string[];
  playDelay?: number;
  /** Extra seconds after the line, for example while a "Your turn" counts down. */
  wait?: number;
}

export interface Scene {
  /** Starts a chapter (shown at the top and listed in the YouTube description). */
  chapter?: string;
  /** center: one column; split: a figure on the left and text on the right. */
  layout: 'center' | 'split';
  /** Width of the left column of a split scene in stage pixels (540 by default), for wide figures. */
  leftWidth?: number;
  /** In a split scene: centre the right column as the left one is, for two figures side by side. */
  centreRight?: boolean;
  main?: El[];
  left?: El[];
  right?: El[];
  lines: Line[];
}

export interface Explainer {
  /** The video's id, also its file name: the lesson id, with "-b", "-c"… for further videos. */
  id: string;
  /** The lesson the video teaches; empty for a video about Gradileo itself (the introduction). */
  lessonId: string;
  /** The header and thumbnail label of a video that teaches no lesson. */
  label?: string;
  /** YouTube tags of a video that teaches no lesson (a lesson's video takes its tags from the lesson). */
  tags?: string[];
  title: string;
  /** A shorter title for the thumbnail, when the title is long. */
  thumbnailTitle?: string;
  /**
   * The id of the figure to show on the thumbnail; the first triangle or diagram otherwise, or
   * none with `false` (for a figure too detailed to read at thumbnail size).
   */
  thumbnail?: string | false;
  /** One or two sentences for the YouTube description. */
  summary: string;
  /**
   * An exam or quiz question video (roadmap item 11): the question it solves, where the question
   * comes from and under what licence, and the lesson it practises. Its header reads "Exam
   * Question" and its YouTube description carries the source line.
   */
  exam?: ExamSource;
  scenes: Scene[];
}

/** Where an exam question comes from. A question Gradileo wrote itself says so in `source`. */
export interface ExamSource {
  /** The lesson the question practises. */
  lesson: string;
  /** Who set the question and where ("OpenStax, Physics, Chapter 4.3, Problem 21"). */
  source: string;
  /** The licence it is used under ("CC BY 4.0", "Public domain"), with any credit the licence asks for. */
  licence: string;
  /** A link to the question as published. */
  url?: string;
  /**
   * The whole question, word for word as it was set (our own wording for a question we wrote), in
   * plain text with no TeX: the YouTube description opens with it, because people find a worked
   * solution by searching for the exact question.
   */
  question: string;
  /** Its answer choices in plain text, for a multiple-choice question. */
  choices?: string[];
}

export const asList = (v: string | string[] | undefined): string[] => (v === undefined ? [] : Array.isArray(v) ? v : [v]);

/** Every element of a scene. */
export const sceneElements = (s: Scene): El[] => [...(s.main ?? []), ...(s.left ?? []), ...(s.right ?? [])];

/** The points a diagram part uses. */
export function itemPoints(item: DiagramItem): string[] {
  switch (item.kind) {
    case 'line':
      return [item.from, item.to];
    case 'curve':
      return item.points;
    case 'angle':
    case 'right':
      return [item.at, item.from, item.to];
    case 'region':
      return item.points;
    case 'label':
      return [item.at];
    case 'thing':
      return item.top ? [item.at, item.top] : [item.at];
  }
}

/** Problems with a script: unknown ids, repeated ids, empty lines, unknown diagram points and parts. Empty when it is fine. */
/** A four-digit whole number with no comma, not part of a longer number or a decimal. */
const YEAR_LIKE = /(?<![\d.,])\d{4}(?![\d]|[.,]\d)/g;
/** A minus sign straight after a space or label in maths, which KaTeX sets as subtraction ("− 5"). */
const LOOSE_MINUS = /(\\q?quad|\\text\{[^}]*\})\s*-(?=[\w(\\])/;

/**
 * The letter a, or A, used as a variable, which the voice reads as the article ("uh to the m",
 * "uh x plus B y").
 */
const BARE_A = /(?<![\w"])(?:a (?=to the|over [a-z]\b|and [a-z]\b|squared|cubed)|A (?=x\b|over [A-Z]\b|is (?:negative|positive|zero)\b))/;

/** "The point" before a number: "the point four, zero" can be heard as the decimal 0.40. */
const POINT_NUMBER = /\bthe point (?=(?:zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|negative|\d)\b)/i;

/**
 * What a line's caption says: its own `caption`, or what is said without the quotes that make
 * the voice name a lone letter ("a" is read "ay", where a bare a is read as the article).
 */
export function captionOf(l: Line): string {
  return l.caption ?? l.say.replace(/"([A-Za-z])"/g, '$1');
}

/** Problems with a motion element: unknown bodies, forces that do not balance vertically. */
export function checkMotion(e: MotionEl): string[] {
  const problems: string[] = [];
  const ids = new Set(e.bodies.map((b) => b.id));
  if (ids.size !== e.bodies.length) problems.push('two bodies share an id.');
  for (const b of e.bodies) {
    if (!(b.mass > 0)) problems.push(`body "${b.id}" needs a mass above zero.`);
    if ((MOTION_PARTS as readonly string[]).includes(b.id)) problems.push(`body id "${b.id}" is the name of a part.`);
    if ((b.lane ?? 0) >= (e.lanes?.length ?? 1)) problems.push(`body "${b.id}" is on a lane that does not exist.`);
    if (b.fixed && b.shape !== 'block') problems.push(`body "${b.id}": only a block can be fixed (a wall).`);
  }
  if (e.momentumMin !== undefined && !(e.momentumMin < 0)) problems.push('the least momentum of the bars must be below zero (leave it out otherwise).');
  if (e.poster && !(e.poster in e.clips)) problems.push(`no clip "${e.poster}" for the thumbnail.`);
  for (const id of e.graph?.of ?? []) if (!ids.has(id)) problems.push(`the graph names no body "${id}".`);
  if (e.graph?.min !== undefined && !(e.graph.min < 0)) problems.push('the lowest value of the graph must be below zero (leave it out otherwise).');
  if (e.graph?.min !== undefined && e.graph.y === 'distance') problems.push('a distance never falls below zero: leave out the lowest value of the graph.');
  if (e.graph?.y === 'force') {
    if (!((e.graph.metres ?? 0) > 0)) problems.push('a force-displacement graph needs the length of its displacement axis, in metres.');
    if (e.graph.of.length !== 1) problems.push('a force-displacement graph is of one body.');
    if (e.path || e.vertical || (e.lanes?.length ?? 1) > 1) problems.push('a force-displacement graph goes over a single straight track.');
  } else if (e.graph && !(e.graph.seconds > 0)) problems.push('the graph needs the length of its time axis, in seconds.');
  if (e.graph?.y === 'impulse' && e.graph.of.length !== 1) problems.push('a force-time graph is of one body.');
  if (e.graph?.y === 'displacement' && e.equilibrium === undefined) problems.push('a displacement graph needs an equilibrium position to measure from.');
  if (e.equilibrium !== undefined) {
    if (e.path || e.vertical === 'up' || (e.lanes?.length ?? 1) > 1) problems.push('an equilibrium position is for a single straight track, or a single drop.');
    if (!(e.equilibrium > e.span[0] && e.equilibrium < e.span[1])) problems.push('the equilibrium position must be on the track.');
  }
  if (e.spring) {
    if (!ids.has(e.spring.on)) problems.push(`the spring is tied to no body "${e.spring.on}".`);
    if (!(e.spring.k > 0)) problems.push('the spring needs a spring constant above zero.');
    if (e.path || e.vertical === 'up' || (e.lanes?.length ?? 1) > 1) problems.push('a spring lies along a single straight track, or hangs over a single drop.');
    const tied = e.bodies.find((b) => b.id === e.spring!.on);
    if (tied && !(e.spring.rest - (tied.width ?? 1) / 2 > e.span[0])) problems.push('the spring needs room between the wall at the left end of the track and the body.');
  }
  if (e.energy?.bars.includes('elastic') && !e.spring) problems.push('elastic energy needs a spring.');
  for (const id of e.energy?.of ?? []) if (!ids.has(id)) problems.push(`the energy bars name no body "${id}".`);
  for (const id of Object.keys(e.energy?.labels ?? {})) if (!ids.has(id)) problems.push(`the energy bars label no body "${id}".`);
  if (e.energy && !(e.energy.max > 0)) problems.push('the energy bars need a largest energy above zero.');
  if (e.energy?.bars.includes('potential') && !e.path && !(e.vertical && (e.energy.g ?? 0) > 0)) problems.push('potential energy needs a curved track, or a drop or a lift with g given.');
  if (e.path) {
    problems.push(...checkPath(e.path));
    if (e.vertical) problems.push('a curved track cannot also be a drop.');
    if ((e.lanes?.length ?? 1) > 1) problems.push('a curved track has one lane.');
  }
  for (const [name, clip] of Object.entries(e.clips)) {
    if (!clip.phases.length) problems.push(`clip "${name}" has no phases.`);
    clip.phases.forEach((ph, pi) => {
      const where = `clip "${name}", phase ${pi + 1}`;
      if (!(ph.dur > 0)) problems.push(`${where} needs a length above zero.`);
      const up = new Map<string, number>();
      for (const f of ph.forces ?? []) {
        if (!ids.has(f.on)) problems.push(`${where}: a force acts on no body "${f.on}".`);
        if (f.profile) {
          if (f.profile.length < 2 || f.profile.some(([d], i) => i > 0 && !(d > f.profile![i - 1][0]))) problems.push(`${where}: the points of a force that changes need distances that increase.`);
          if (f.resist || f.drag || f.axis === 'y') problems.push(`${where}: a force that changes with distance pushes along the track, and is not friction or air resistance.`);
          if (e.path || e.vertical) problems.push(`${where}: a force that changes with distance acts on a straight track.`);
        }
        if (f.to !== undefined && (f.resist || f.drag || f.profile || f.axis === 'y')) problems.push(`${where}: a force that changes with time pushes along the track, and is not friction, air resistance or a force that changes with distance.`);
        if (f.to !== undefined && (e.path || e.spring)) problems.push(`${where}: a force that changes with time acts on a straight track with no spring.`);
        if (f.axis === 'y') up.set(f.on, (up.get(f.on) ?? 0) + f.n);
      }
      // Bodies stay on their track, so the forces drawn up and down must cancel.
      for (const [id, sum] of up) if (Math.abs(sum) > 1e-9) problems.push(`${where}: the vertical forces on "${id}" do not balance.`);
      for (const id of [...Object.keys(ph.set ?? {}), ...(ph.contact ?? [])]) if (!ids.has(id)) problems.push(`${where} names no body "${id}".`);
    });
  }
  return problems;
}

/** Problems with a circuit element: components that cannot be solved, clips that change what is not there. */
export function checkCircuit(e: CircuitEl): string[] {
  const problems: string[] = [];
  if (!(e.volts >= 0)) problems.push('the supply voltage must be zero or more.');
  if (e.parts.length < 1 || e.parts.length > 4) problems.push('it needs one to four components.');
  if (e.lead && e.layout !== 'parallel') problems.push('only a parallel layout has a component in series with its branches (`lead`).');
  if (e.internal !== undefined && !(e.internal >= 0)) problems.push('the internal resistance must be zero or more.');
  const ids = new Set<string>();
  for (const part of [...(e.lead ? [e.lead] : []), ...e.parts]) {
    if (ids.has(part.id)) problems.push(`the component id "${part.id}" is used twice.`);
    ids.add(part.id);
    if ((CIRCUIT_PARTS as readonly string[]).includes(part.id)) problems.push(`the component id "${part.id}" is the name of a part.`);
    if (!(part.ohms > 0)) problems.push(`component "${part.id}" needs a resistance above zero.`);
  }
  for (const [name, clip] of Object.entries(e.clips)) {
    if (!clip.phases.length) problems.push(`clip "${name}" has no phases.`);
    for (const ph of clip.phases) {
      if (!(ph.dur > 0)) problems.push(`clip "${name}" has a phase with no duration.`);
      if (ph.set?.volts !== undefined && !(ph.set.volts >= 0)) problems.push(`clip "${name}" sets a supply voltage below zero.`);
      for (const [id, ohms] of Object.entries(ph.set?.ohms ?? {})) {
        if (!ids.has(id)) problems.push(`clip "${name}" sets the resistance of "${id}", which is not a component.`);
        if (!(ohms > 0)) problems.push(`clip "${name}" sets a resistance that is not above zero.`);
      }
      for (const id of ph.set?.broken ?? []) if (!ids.has(id)) problems.push(`clip "${name}" breaks "${id}", which is not a component.`);
    }
  }
  return problems;
}

/** Problems with a flight element: a view with no size, bodies outside it, clips that name no body. */
export function checkFlight(e: FlightEl): string[] {
  const problems: string[] = [];
  const [x0, x1, y0, y1] = e.view;
  if (!(x1 > x0 && y1 > y0)) problems.push('the view needs its right above its left, and its top above its bottom.');
  const ids = new Set(e.bodies.map((b) => b.id));
  const massive = new Set(e.bodies.filter((b) => b.mass !== undefined).map((b) => b.id));
  if (ids.size !== e.bodies.length) problems.push('two bodies share an id.');
  if (!e.bodies.length) problems.push('it needs a body.');
  for (const b of e.bodies) {
    if ((FLIGHT_PARTS as readonly string[]).includes(b.id)) problems.push(`body id "${b.id}" is the name of a part.`);
    if (b.at[0] < x0 || b.at[0] > x1 || b.at[1] < y0 || b.at[1] > y1) problems.push(`body "${b.id}" starts outside the view.`);
    if (e.gravity && b.at[1] < 0) problems.push(`body "${b.id}" starts below the ground.`);
  }
  if (e.gravity !== undefined && !(e.gravity > 0)) problems.push('gravity must be above zero.');
  if (e.gravity && (e.scene ?? 'ground') !== 'ground') problems.push('gravity needs the ground scene.');
  if (e.ledge && (e.scene ?? 'ground') !== 'ground') problems.push('a ledge needs the ground scene.');
  if (e.stream) {
    for (const id of e.stream.of ?? []) if (!ids.has(id)) problems.push(`the stream carries no body "${id}".`);
    if (e.stream.band && !(e.stream.band[1] > e.stream.band[0])) problems.push('the stream needs its far bank above its near bank.');
  }
  if (e.readout?.of && !ids.has(e.readout.of)) problems.push(`the readout names no body "${e.readout.of}".`);
  if (e.strobe !== undefined && !(e.strobe > 0)) problems.push('the strobe step must be above zero.');
  if (e.poster && !(e.poster in e.clips)) problems.push(`no clip "${e.poster}" for the thumbnail.`);
  for (const [name, clip] of Object.entries(e.clips)) {
    if (!clip.phases.length) problems.push(`clip "${name}" has no phases.`);
    clip.phases.forEach((ph, pi) => {
      const where = `clip "${name}", phase ${pi + 1}`;
      if (!(ph.dur > 0)) problems.push(`${where} needs a length above zero.`);
      for (const id of [...Object.keys(ph.set ?? {}), ...(ph.release ?? []), ...(ph.stop ?? []), ...Object.keys(ph.kick ?? {})]) if (!ids.has(id)) problems.push(`${where} names no body "${id}".`);
      if (ph.release?.length && !e.gravity) problems.push(`${where} lets a body go, but there is no gravity.`);
      if (ph.kick) {
        const kicks = Object.entries(ph.kick);
        for (const [id] of kicks) if (ids.has(id) && !massive.has(id)) problems.push(`${where} kicks body "${id}", which has no mass.`);
        const size = Math.max(...kicks.map(([, j]) => Math.hypot(j[0], j[1])), 0);
        const [sx, sy] = kicks.reduce(([x, y], [, j]) => [x + j[0], y + j[1]], [0, 0]);
        if (Math.hypot(sx, sy) > 1e-6 * Math.max(1, size)) problems.push(`${where}: the impulses of an explosion must add up to zero.`);
      }
    });
  }
  for (const b of e.bodies) {
    if (b.mass !== undefined && !(b.mass > 0)) problems.push(`body "${b.id}" needs a mass above zero.`);
    if (b.radius !== undefined && !(b.radius > 0)) problems.push(`body "${b.id}" needs a radius above zero.`);
    if ((b.shape === 'puck' || b.shape === 'car') && b.mass === undefined) problems.push(`body "${b.id}" is a ${b.shape}, so it needs a mass.`);
  }
  if (e.collisions) {
    if (e.gravity || e.stream) problems.push('collisions are for a view from above, with no gravity and no stream.');
    if (massive.size < 2) problems.push('collisions need two bodies with a mass.');
    const r = e.collisions.restitution;
    if (r !== undefined && !(r >= 0 && r <= 1)) problems.push('the restitution of a collision is from 0 to 1.');
    const round = e.bodies.filter((b) => b.mass !== undefined);
    for (let i = 0; i < round.length; i++)
      for (let j = i + 1; j < round.length; j++)
        if (Math.hypot(round[i].at[0] - round[j].at[0], round[i].at[1] - round[j].at[1]) < (round[i].radius ?? 0.5) + (round[j].radius ?? 0.5) - 1e-9) problems.push(`bodies "${round[i].id}" and "${round[j].id}" start inside each other.`);
  }
  if (e.momentum) {
    if (!(e.momentum.max > 0)) problems.push('the largest momentum of the bars must be above zero.');
    if (e.momentum.min !== undefined && !(e.momentum.min < 0)) problems.push('the least momentum of the bars must be below zero.');
    if (!massive.size) problems.push('momentum bars need a body with a mass.');
    if (e.readout) problems.push('the momentum bars take the column of the readout: give one or the other.');
  }
  return problems;
}

/** Problems with a ramp element: masses, tilts and coefficients that make no sense, strings and clips that name no body. */
export function checkRamp(e: RampEl): string[] {
  const problems: string[] = [];
  const ids = new Set(e.bodies.map((b) => b.id));
  if (!e.bodies.length) problems.push('it needs a block.');
  if (e.hanging) {
    if (ids.has(e.hanging.id)) problems.push('two bodies share an id.');
    if (!(e.hanging.mass > 0)) problems.push(`body "${e.hanging.id}" needs a mass above zero.`);
  }
  if (ids.size !== e.bodies.length) problems.push('two bodies share an id.');
  const all = new Set([...ids, ...(e.hanging ? [e.hanging.id] : [])]);
  for (const id of all) if ((RAMP_PARTS as readonly string[]).includes(id)) problems.push(`body id "${id}" is the name of a part.`);
  if (!(e.length > 0)) problems.push('the surface needs a length above zero.');
  if (e.work) {
    if (!e.work.rows.length) problems.push('the bars of work need a force to show.');
    if (!(e.work.range[0] <= 0 && e.work.range[1] >= 0 && e.work.range[1] > e.work.range[0])) problems.push('the range of the bars of work is [least, greatest], with zero between them.');
    if (e.work.of !== undefined && !ids.has(e.work.of)) problems.push(`the bars of work are of no block "${e.work.of}".`);
  }
  const tilt = (a: number) => a >= 0 && a <= 90;
  if (!tilt(e.angle)) problems.push('the tilt must be from 0 to 90 degrees.');
  if (e.angle === 90 && !e.hanging) problems.push('a surface tilted to 90 degrees needs a hanging body on the other side of its pulley.');
  if (e.g !== undefined && !(e.g > 0)) problems.push('g must be above zero.');
  if (e.friction && !(e.friction[0] >= e.friction[1] && e.friction[1] >= 0)) problems.push('the coefficients of friction are [static, kinetic], with the static one at least as large.');
  for (const b of e.bodies) {
    if (!(b.mass > 0)) problems.push(`body "${b.id}" needs a mass above zero.`);
    if (b.x < 0 || b.x > e.length) problems.push(`body "${b.id}" starts off the surface.`);
  }
  const order = [...e.bodies].sort((a, b) => a.x - b.x).map((b) => b.id);
  for (const [a, b] of e.ropes ?? []) {
    if (!ids.has(a) || !ids.has(b)) problems.push(`a string ties no block "${ids.has(a) ? b : a}".`);
    else if (Math.abs(order.indexOf(a) - order.indexOf(b)) !== 1) problems.push(`the string from "${a}" to "${b}" must tie two neighbours.`);
  }
  for (const id of e.balanced ?? []) if (!ids.has(id)) problems.push(`no block "${id}" to leave the weight off.`);
  if (e.strobe !== undefined && !(e.strobe > 0)) problems.push('the strobe step must be above zero.');
  if (e.poster && !(e.poster in e.clips)) problems.push(`no clip "${e.poster}" for the thumbnail.`);
  for (const [name, clip] of Object.entries(e.clips)) {
    if (!clip.phases.length) problems.push(`clip "${name}" has no phases.`);
    clip.phases.forEach((ph, pi) => {
      const where = `clip "${name}", phase ${pi + 1}`;
      if (!(ph.dur > 0)) problems.push(`${where} needs a length above zero.`);
      for (const id of Object.keys(ph.set ?? {})) if (!all.has(id)) problems.push(`${where} names no body "${id}".`);
      for (const f of ph.forces ?? []) {
        if (!ids.has(f.on)) problems.push(`${where} pushes no block "${f.on}".`);
        if (!(f.n > 0)) problems.push(`${where}: the force "${f.name}" needs a size above zero (turn it with its angle).`);
      }
      if (ph.tilt !== undefined && !tilt(ph.tilt)) problems.push(`${where} tilts the surface past 0 to 90 degrees.`);
      if (ph.tilt !== undefined && ph.freeze) problems.push(`${where} cannot tilt the surface while it is frozen.`);
      if (ph.tilt !== undefined && (e.hanging || e.angle === 90)) problems.push(`${where} cannot tilt a surface with a pulley.`);
    });
  }
  return problems;
}

/** Problems with a forces element: a mass or a force of no size, cables that cannot hold a weight. */
export function checkForces(e: ForcesEl): string[] {
  const problems: string[] = [];
  if (!(e.body.mass > 0)) problems.push('the object needs a mass above zero.');
  if (e.g !== undefined && !(e.g > 0)) problems.push('g must be above zero.');
  // Two cables hold a weight when neither hangs below the horizontal and they are not both level.
  const holds = (c: [number, number]) => c[0] >= 0 && c[1] >= 0 && c[0] <= 90 && c[1] <= 90 && c[0] + c[1] >= 5;
  if (e.cables && !holds(e.cables)) problems.push('the cables must be from 0 to 90 degrees above the horizontal, and not both level.');
  if (!e.cables && !e.view) problems.push('it needs a view of the floor, or two cables to hang from.');
  if (e.view && !(e.view[0] <= 0 && e.view[1] >= 0 && e.view[2] <= 0 && e.view[3] >= 0 && e.view[1] > e.view[0] && e.view[3] > e.view[2])) problems.push('the view is [left, right, bottom, top], around the origin where the object starts.');
  if (e.poster && !(e.poster in e.clips)) problems.push(`no clip "${e.poster}" for the thumbnail.`);
  for (const [name, clip] of Object.entries(e.clips)) {
    if (!clip.phases.length) problems.push(`clip "${name}" has no phases.`);
    clip.phases.forEach((ph, pi) => {
      const where = `clip "${name}", phase ${pi + 1}`;
      if (!(ph.dur > 0)) problems.push(`${where} needs a length above zero.`);
      for (const f of ph.forces ?? []) if (!(f.n > 0)) problems.push(`${where}: the force "${f.name}" needs a size above zero (turn it with its angle).`);
      if (ph.cables && !e.cables) problems.push(`${where} tilts cables the object does not hang from.`);
      if (ph.cables && !holds(ph.cables)) problems.push(`${where}: the cables must be from 0 to 90 degrees above the horizontal, and not both level.`);
      if (ph.cables && ph.freeze) problems.push(`${where} cannot tilt the cables while it is frozen.`);
    });
  }
  return problems;
}

/** Problems with a gravity element: masses of nothing, bodies on top of one another, clips that name no body. */
export function checkGravity(e: GravityEl): string[] {
  const problems: string[] = [];
  const ids = new Set(e.bodies.map((b) => b.id));
  if (!e.bodies.length) problems.push('it needs a body.');
  if (ids.size !== e.bodies.length) problems.push('two bodies share an id.');
  for (const id of ids) if ((GRAVITY_PARTS as readonly string[]).includes(id)) problems.push(`body id "${id}" is the name of a part.`);
  for (const [i, b] of e.bodies.entries()) {
    if (!(b.mass > 0)) problems.push(`body "${b.id}" needs a mass above zero.`);
    if (b.radius !== undefined && !(b.radius > 0)) problems.push(`body "${b.id}" needs a radius above zero.`);
    if ((b.orbit || b.v) && i === 0) problems.push('the first body stays where it is: the others orbit it or fall towards it.');
    if (b.orbit && b.v) problems.push(`body "${b.id}" has an orbit and a velocity: give one.`);
  }
  if (e.rate !== undefined && !(e.rate > 0)) problems.push('the rate must be above zero.');
  if (e.clock && !(e.clock.seconds > 0)) problems.push('the unit of the clock needs a length above zero.');
  if (e.mountain !== undefined && !(e.mountain > 0 && e.bodies[0]?.radius)) problems.push('a mountain needs a height above zero, and a first body with a radius to stand on.');
  e.bodies.forEach((a, i) => {
    for (const b of e.bodies.slice(i + 1)) if (a.x === b.x && (a.y ?? 0) === (b.y ?? 0)) problems.push(`bodies "${a.id}" and "${b.id}" start at the same place.`);
  });
  if (!(e.view[1] > e.view[0] && e.view[3] > e.view[2])) problems.push('the view is [left, right, bottom, top].');
  if (e.G !== undefined && !(e.G > 0)) problems.push('G must be above zero.');
  if (e.unit && !(e.unit.metres > 0)) problems.push('the unit of distance needs a size above zero.');
  for (const id of e.pulls ?? []) if (!ids.has(id)) problems.push(`no body "${id}" to draw the pull on.`);
  if (e.poster && !(e.poster in e.clips)) problems.push(`no clip "${e.poster}" for the thumbnail.`);
  for (const [name, clip] of Object.entries(e.clips)) {
    if (!clip.phases.length) problems.push(`clip "${name}" has no phases.`);
    clip.phases.forEach((ph, pi) => {
      const where = `clip "${name}", phase ${pi + 1}`;
      if (!(ph.dur > 0)) problems.push(`${where} needs a length above zero.`);
      for (const id of [...Object.keys(ph.to ?? {}), ...Object.keys(ph.mass ?? {}), ...Object.keys(ph.launch ?? {})]) if (!ids.has(id)) problems.push(`${where} names no body "${id}".`);
      for (const [id, m] of Object.entries(ph.mass ?? {})) if (!(m > 0)) problems.push(`${where}: body "${id}" needs a mass above zero.`);
      if (ph.launch && e.bodies[0] && e.bodies[0].id in ph.launch) problems.push(`${where}: the first body stays where it is.`);
      if (ph.fly && ph.to) problems.push(`${where} cannot carry a body while time runs.`);
      if (ph.rate !== undefined && !(ph.rate > 0)) problems.push(`${where}: the rate must be above zero.`);
    });
  }
  return problems;
}

/** The speed of a body of a circle element at its start, in metres per second. */
export const circleSpeed = (b: CircleBody): number => b.speed ?? (2 * Math.PI * b.r) / (b.period ?? Infinity);

export function checkCircle(e: CircleEl): string[] {
  const problems: string[] = [];
  const ids = new Set(e.bodies.map((b) => b.id));
  if (!e.bodies.length) problems.push('it needs a body.');
  if (ids.size !== e.bodies.length) problems.push('two bodies share an id.');
  for (const id of ids) if ((CIRCLE_PARTS as readonly string[]).includes(id)) problems.push(`body id "${id}" is the name of a part.`);
  const g = e.g ?? 9.81;
  if (!(g > 0)) problems.push('g must be above zero.');
  for (const b of e.bodies) {
    if (!(b.mass > 0)) problems.push(`body "${b.id}" needs a mass above zero.`);
    if (!(b.r > 0)) problems.push(`body "${b.id}" needs a radius above zero.`);
    if ((b.speed === undefined) === (b.period === undefined)) problems.push(`body "${b.id}" needs a speed or a period (one of them).`);
    else if (!(circleSpeed(b) > 0)) problems.push(`body "${b.id}" needs a speed above zero.`);
    else if (e.vertical) {
      // Energy is conserved round an upright circle: the body must still be fast enough at the top to stay on it.
      const top = circleSpeed(b) ** 2 + 2 * g * b.r * (Math.sin(((b.at ?? 0) * Math.PI) / 180) - 1);
      if (top < g * b.r - 1e-9) problems.push(`body "${b.id}" is too slow to stay on its circle at the top (it needs ${Math.sqrt(g * b.r).toFixed(2)} m/s there).`);
    }
  }
  if (e.disc !== undefined && !(e.disc > 0)) problems.push('the platform needs a radius above zero.');
  if (e.limit !== undefined && !(e.limit > 0)) problems.push('the greatest force must be above zero.');
  if (e.span !== undefined && !(e.span > 0)) problems.push('the span must be above zero.');
  if (e.poster && !(e.poster in e.clips)) problems.push(`no clip "${e.poster}" for the thumbnail.`);
  for (const [name, clip] of Object.entries(e.clips)) {
    if (!clip.phases.length) problems.push(`clip "${name}" has no phases.`);
    clip.phases.forEach((ph, pi) => {
      const where = `clip "${name}", phase ${pi + 1}`;
      if (!(ph.dur > 0)) problems.push(`${where} needs a length above zero.`);
      for (const id of [...Object.keys(ph.speed ?? {}), ...(ph.release ?? [])]) if (!ids.has(id)) problems.push(`${where} names no body "${id}".`);
      for (const [id, v] of Object.entries(ph.speed ?? {})) if (!(v > 0)) problems.push(`${where}: body "${id}" needs a speed above zero.`);
      if (e.vertical && (ph.speed || ph.release)) problems.push(`${where}: on an upright circle gravity sets the speed, and a body cannot be let go.`);
      if (ph.freeze && ph.speed) problems.push(`${where} cannot change a speed while it is frozen.`);
    });
  }
  return problems;
}

/** Problems with a rays element: angles a ray cannot have, a boundary without its two speeds. */
export function checkRays(e: RaysEl): string[] {
  const problems: string[] = [];
  const ok = (a: number) => a >= 0 && a <= 85;
  if (!ok(e.angle)) problems.push('the angle of incidence must be from 0 to 85 degrees.');
  if (e.surface === 'boundary' && !(e.speeds && e.speeds[0] > 0 && e.speeds[1] > 0)) problems.push('a boundary needs the two speeds, both above zero.');
  if (e.surface === 'mirror' && (e.speeds || e.media)) problems.push('a mirror has no second material: leave out the speeds and the media.');
  if (e.surface === 'boundary' && e.behind) problems.push('only a mirror has an image behind it.');
  for (const [name, clip] of Object.entries(e.clips)) {
    if (!clip.phases.length) problems.push(`clip "${name}" has no phases.`);
    for (const ph of clip.phases) {
      if (!(ph.dur > 0)) problems.push(`clip "${name}" has a phase with no duration.`);
      if (ph.to !== undefined && !ok(ph.to)) problems.push(`clip "${name}" turns the ray to an angle outside 0 to 85 degrees.`);
    }
  }
  return problems;
}

/** What is wrong with a ripples element, if anything. */
export function checkRipples(e: RipplesEl): string[] {
  const problems: string[] = [];
  const [x0, y0, x1, y1] = e.view;
  if (!(x1 > x0) || !(y1 > y0)) problems.push('the view must run from left to right and from bottom to top.');
  if (!(e.speed > 0)) problems.push('the waves need a speed above zero.');
  if (!e.sources.length) problems.push('it has no sources.');
  if (e.every !== undefined && !(Number.isInteger(e.every) && e.every >= 1)) problems.push('`every` must be a whole number, 1 or more.');
  if (e.clock && !(e.clock.seconds > 0)) problems.push('the clock needs a unit of more than zero seconds.');
  const inside = (p: [number, number]) => p[0] >= x0 && p[0] <= x1 && p[1] >= y0 && p[1] <= y1;
  const ids = new Set<string>();
  const taken = (id: string, what: string) => {
    if (ids.has(id)) problems.push(`the id "${id}" is used twice.`);
    ids.add(id);
    if ((RIPPLES_PARTS as readonly string[]).includes(id)) problems.push(`the ${what} id "${id}" is the name of a part.`);
  };
  for (const s of e.sources) {
    taken(s.id, 'source');
    if (!(s.frequency > 0)) problems.push(`source "${s.id}" needs a frequency above zero.`);
    // A source that outruns its waves can be drawn (its crests overlap along a shock wave), but nothing can be worked out for a listener.
    if (s.velocity && Math.hypot(...s.velocity) >= e.speed && e.listeners?.length) problems.push(`source "${s.id}" must move more slowly than the waves when there are listeners.`);
  }
  for (const l of e.listeners ?? []) {
    taken(l.id, 'listener');
    if (!inside(l.at)) problems.push(`listener "${l.id}" is outside the view.`);
  }
  const listeners = new Set((e.listeners ?? []).map((l) => l.id));
  for (const [name, clip] of Object.entries(e.clips)) {
    if (!clip.phases.length) problems.push(`clip "${name}" has no phases.`);
    for (const ph of clip.phases) {
      if (!(ph.dur > 0)) problems.push(`clip "${name}" has a phase that lasts no time.`);
      if (ph.slow !== undefined && !(ph.slow > 0)) problems.push(`clip "${name}" has a phase with a slow motion of zero or less.`);
      for (const [id, to] of Object.entries(ph.move ?? {})) {
        if (!listeners.has(id)) problems.push(`clip "${name}" moves a listener "${id}" that is not there.`);
        else if (!inside(to)) problems.push(`clip "${name}" moves listener "${id}" out of the view.`);
      }
    }
  }
  if (e.poster && !(e.poster in e.clips)) problems.push(`no clip "${e.poster}" for the thumbnail.`);
  return problems;
}

/** Problems with a wave element: lanes that cannot run, clips that set no lane, a mark off the strip. */
export function checkWave(e: WaveEl): string[] {
  const problems: string[] = [];
  if (!(e.span[1] > e.span[0])) problems.push('the span must run from left to right.');
  if (!e.lanes.length) problems.push('it has no lanes.');
  const ids = new Set<string>();
  for (const l of e.lanes) {
    if (ids.has(l.id)) problems.push(`the lane id "${l.id}" is used twice.`);
    ids.add(l.id);
    if ((WAVE_PARTS as readonly string[]).includes(l.id)) problems.push(`the lane id "${l.id}" is the name of a part.`);
    if (!(l.speed > 0)) problems.push(`lane "${l.id}" needs a speed above zero.`);
    if (!(l.frequency >= 0) || !(l.amplitude >= 0)) problems.push(`lane "${l.id}" needs a frequency and an amplitude of zero or more.`);
    for (const pulse of l.pulses ?? []) {
      // A pulse may be half way out at time 0, so that its middle leaves the source as the clock starts.
      const early = -(pulse.width ?? (e.span[1] - e.span[0]) / 10) / (2 * l.speed);
      if (!(pulse.height !== 0) || (pulse.width !== undefined && !(pulse.width > 0)) || (pulse.at ?? 0) < early - 1e-9) problems.push(`lane "${l.id}" has a pulse with no height, no width or a middle that leaves before time zero.`);
      if (pulse.from === 'right' && (l.reflect || l.medium)) problems.push(`lane "${l.id}": a pulse from the right needs a plain strip, with no reflecting end and no second medium.`);
    }
    if (l.medium) {
      if (l.kind !== 'transverse') problems.push(`lane "${l.id}": a second medium is for a transverse wave.`);
      if (!(l.medium.speed > 0) || !(l.medium.from > e.span[0] && l.medium.from < e.span[1])) problems.push(`lane "${l.id}": the second medium needs a speed above zero and a start on the strip.`);
      if (l.reflect) problems.push(`lane "${l.id}": a lane with a second medium has no reflecting end.`);
    }
    if (l.standing) {
      const { loops, quarters, beyond = 0 } = l.standing;
      // The standing wave reaches a little beyond the open end of a tube.
      const length = (l.standing.length ?? e.span[1] - e.span[0]) + beyond;
      if (l.pulses || l.reflect || l.medium) problems.push(`lane "${l.id}": a standing wave has no pulses, reflecting end or second medium of its own.`);
      if (!(length > 0 && length <= e.span[1] - e.span[0] + 1e-9)) problems.push(`lane "${l.id}": the standing wave's length must fit the strip.`);
      if (beyond < 0 || (beyond > 0 && l.kind !== 'longitudinal')) problems.push(`lane "${l.id}": only an air column reaches beyond its open end, by zero or more.`);
      const whole = (n: number | undefined) => n !== undefined && Number.isInteger(n) && n >= 1;
      if (l.kind === 'transverse' ? !whole(loops) : !(whole(quarters) && quarters! % 2 === 1)) problems.push(`lane "${l.id}": a string needs a whole number of loops, and an air column an odd number of quarter wavelengths.`);
      else {
        const fits = l.kind === 'transverse' ? (loops! * l.speed) / (2 * length) : (quarters! * l.speed) / (4 * length);
        if (Math.abs(l.frequency - fits) > 0.01 * fits) problems.push(`lane "${l.id}": the frequency that fits this standing wave is ${Math.round(fits * 100) / 100} Hz.`);
      }
    }
  }
  if (e.mark !== undefined && !(e.mark >= e.span[0] && e.mark <= e.span[1])) problems.push('the mark is off the strip.');
  for (const [name, clip] of Object.entries(e.clips)) {
    if (!clip.phases.length) problems.push(`clip "${name}" has no phases.`);
    for (const ph of clip.phases) {
      if (!(ph.dur > 0)) problems.push(`clip "${name}" has a phase with no duration.`);
      for (const [id, set] of Object.entries(ph.set ?? {})) {
        if (!ids.has(id)) problems.push(`clip "${name}" sets no lane "${id}".`);
        if ((set.frequency ?? 0) < 0 || (set.amplitude ?? 0) < 0) problems.push(`clip "${name}" sets a frequency or an amplitude below zero.`);
      }
    }
  }
  return problems;
}

/** Whether a particles element is set up to show this part (a thermometer, gauge or volume needs its option). */
function particlePartReady(e: ParticlesEl, part: string): boolean {
  if (part === 'thermo') return !!e.thermometers;
  if (part === 'gauge') return !!e.gauge;
  if (part === 'volume') return !!e.volume;
  if (part === 'flow') return !!e.flow;
  return true;
}

/** Problems with a particles element: clips that name no box, a gauge on no box, a bad lid. */
export function checkParticles(e: ParticlesEl): string[] {
  const problems: string[] = [];
  const ids = new Set(e.boxes.map((b) => b.id));
  if (ids.size !== e.boxes.length) problems.push('two boxes share an id.');
  for (const b of e.boxes) {
    if ((PARTICLE_PARTS as readonly string[]).includes(b.id)) problems.push(`box id "${b.id}" is the name of a part.`);
    if (b.lid !== undefined && !(b.lid >= 0.2 && b.lid <= 1)) problems.push(`box "${b.id}": a lid must be between 0.2 and 1.`);
    if (!b.insulated && b.kinds?.some((k) => k.temp !== undefined)) problems.push(`box "${b.id}": a kind starts at its own temperature only in an insulated box.`);
    const nk = (b.kinds ?? []).length;
    for (const e of [b.electrodes?.left, b.electrodes?.right]) {
      if (!e) continue;
      const named = [...(e.rules ?? []).flatMap((ru) => [ru.kind, ru.to]), ...(e.plate ? [e.plate.kind] : []), ...(e.dissolve ? [e.dissolve.kind, e.dissolve.to] : [])];
      if (named.some((k) => !Number.isInteger(k) || k < 0 || k >= nk)) problems.push(`box "${b.id}": an electrode names a kind the box does not have.`);
      if (e.plate && e.plate.n > (b.kinds?.[e.plate.kind]?.n ?? 0)) problems.push(`box "${b.id}": an electrode's coating needs more particles than its kind has.`);
    }
    const n = (b.kinds ? b.kinds.reduce((s, k) => s + k.n, 0) : (b.n ?? 30)) + (b.molecules ?? []).reduce((s, m) => s + m.n * m.atoms.length, 0);
    if (n > 120) problems.push(`box "${b.id}" has ${n} particles; keep it to 120 so frames draw quickly.`);
    if (b.follow !== undefined && !(b.follow >= 0 && b.follow < n)) problems.push(`box "${b.id}" follows a particle it does not have.`);
  }
  if (e.gauge && !ids.has(e.gauge.box)) problems.push(`the gauge is on no box "${e.gauge.box}".`);
  if (e.volume && !ids.has(e.volume.box)) problems.push(`the volume reading is on no box "${e.volume.box}".`);
  if (e.flow) {
    const at = (id: string) => e.boxes.findIndex((b) => b.id === id);
    if (at(e.flow.from) < 0 || at(e.flow.to) < 0) problems.push(`the heat flow names a box that is not there.`);
    else if (Math.abs(at(e.flow.from) - at(e.flow.to)) !== 1) problems.push(`the heat flow must join two boxes side by side.`);
  }
  for (const b of e.boxes) if ((b.lump || b.hold) && (b.kinds?.length ?? 0) < 2) problems.push(`box "${b.id}": a lump or held particles need two kinds (the lump first, then what is round it).`);
  for (const b of e.boxes) if (b.divider !== undefined && !(b.divider > 0.1 && b.divider < 0.9)) problems.push(`box "${b.id}": a divider must be between 0.1 and 0.9 of the way across.`);
  for (const b of e.boxes) if (b.wall && !(b.wall.at > 0.1 && b.wall.at < 0.9 && b.wall.height > 0 && b.wall.height < 1)) problems.push(`box "${b.id}": a wall must stand between 0.1 and 0.9 of the way across, and be lower than the box.`);
  for (const b of e.boxes) if (b.filter && !(b.filter.at > 0.1 && b.filter.at < 0.9)) problems.push(`box "${b.id}": a filter must be between 0.1 and 0.9 of the way up.`);
  for (const b of e.boxes) if (b.spread && !(b.spread.at > 0 && b.spread.at < (b.spread.max ?? 3))) problems.push(`box "${b.id}": a spread's line must be between 0 and the fastest speed on its axis.`);
  for (const b of e.boxes) {
    const k = b.kinds?.length ?? 1;
    const ok = (i: number) => Number.isInteger(i) && i >= 0 && i < k;
    for (const r of b.reactions ?? []) if (![r.a, r.b, ...r.to].every(ok) || !(r.free ?? []).every((f) => f === null || ok(f))) problems.push(`box "${b.id}": a reaction names a kind it does not have.`);
    for (const m of b.molecules ?? []) {
      if (!m.atoms.every(ok) || m.atoms.length < 2) problems.push(`box "${b.id}": a molecule needs two atoms or more, of kinds the box has.`);
      if (m.bent && m.atoms.length !== 3) problems.push(`box "${b.id}": only a molecule of three atoms can be bent.`);
    }
    if (b.molecules && (b.apart || b.divider !== undefined || b.wall || b.filter || b.paper)) problems.push(`box "${b.id}": molecules can only start mixed through a plain box (with a lump, if you like).`);
    for (const r of b.breaks ?? []) if (![...r.kinds, ...r.to].every(ok)) problems.push(`box "${b.id}": a break names a kind it does not have.`);
    if (b.tally && !b.tally.kinds.every(ok)) problems.push(`box "${b.id}": the tally counts a kind it does not have.`);
    if (b.reserve && !b.reserve.every(ok)) problems.push(`box "${b.id}": the burette holds a kind the box does not have.`);
    if (b.pin && !b.pin.every(ok)) problems.push(`box "${b.id}": it pins a kind it does not have.`);
    if (b.pin && b.state !== 'solid') problems.push(`box "${b.id}": only a solid can have pinned atoms.`);
    if (b.indicator && ![...b.indicator.acid, ...b.indicator.base].every(ok)) problems.push(`box "${b.id}": the indicator watches a kind the box does not have.`);
  }
  for (const [name, clip] of Object.entries(e.clips)) {
    if (!clip.phases.length) problems.push(`clip "${name}" has no phases.`);
    clip.phases.forEach((ph, pi) => {
      if (!(ph.dur > 0)) problems.push(`clip "${name}", phase ${pi + 1} needs a length above zero.`);
      for (const id of ph.lift ?? []) if (!e.boxes.find((b) => b.id === id)?.divider) problems.push(`clip "${name}", phase ${pi + 1} lifts a divider that box "${id}" does not have.`);
      for (const id of ph.release ?? []) {
        const b = e.boxes.find((bb) => bb.id === id);
        if (!b?.hold && !b?.filter && !b?.waits) problems.push(`clip "${name}", phase ${pi + 1} lets go of a lump that box "${id}" does not hold.`);
      }
      for (const id of Object.keys(ph.push ?? {})) if (e.boxes.find((b) => b.id === id)?.state !== 'solid') problems.push(`clip "${name}", phase ${pi + 1} pushes box "${id}", which is not a solid.`);
      for (const id of [...Object.keys(ph.stir ?? {}), ...Object.keys(ph.magnet ?? {}), ...Object.keys(ph.power ?? {})]) if (!ids.has(id)) problems.push(`clip "${name}", phase ${pi + 1} names no box "${id}".`);
      for (const id of Object.keys(ph.add ?? {})) if (!e.boxes.find((b) => b.id === id)?.reserve?.length) problems.push(`clip "${name}", phase ${pi + 1} pours into box "${id}", which has no burette (\`reserve\`).`);
      for (const id of Object.keys(ph.run ?? {})) if (!e.boxes.find((b) => b.id === id)?.paper) problems.push(`clip "${name}", phase ${pi + 1} runs solvent up box "${id}", which is not paper.`);
      for (const id of [...Object.keys(ph.heat ?? {}), ...Object.keys(ph.lid ?? {})]) if (!ids.has(id)) problems.push(`clip "${name}", phase ${pi + 1} names no box "${id}".`);
      for (const v of Object.values(ph.lid ?? {})) if (!(v >= 0.2 && v <= 1)) problems.push(`clip "${name}", phase ${pi + 1}: a lid must be between 0.2 and 1.`);
    });
  }
  return problems;
}

/** Problems with an induction element: a view with no size, no circuit or two, a circuit outside the view, clips that ask for what the circuit cannot do. */
export function checkInduction(e: InductionEl): string[] {
  const problems: string[] = [];
  const [x0, x1, y0, y1] = e.view;
  if (!(x1 > x0 && y1 > y0)) problems.push('the view needs its right above its left, and its top above its bottom.');
  if (e.length && !(e.length.metres > 0)) problems.push('the length unit must be more than zero metres.');
  if (e.rate !== undefined && !(e.rate > 0)) problems.push('the rate must be more than zero.');
  if (!Number.isFinite(e.tesla)) problems.push('the field needs a strength in teslas.');
  if (e.region && !(e.region[1] > e.region[0] && e.region[3] > e.region[2])) problems.push('the field needs a region with its right above its left, and its top above its bottom.');
  if (Boolean(e.loop) === Boolean(e.rails)) problems.push('it needs a coil or two rails, and not both.');
  const circuit = e.loop ?? e.rails;
  if (circuit && (INDUCTION_PARTS as readonly string[]).includes(circuit.id)) problems.push(`the id "${circuit.id}" is the name of a part.`);
  if (e.loop) {
    const [l, r, b, t] = e.loop.rect;
    if (!(r > l && t > b)) problems.push('the coil needs its right above its left, and its top above its bottom.');
    if (l < x0 || r > x1 || b < y0 || t > y1) problems.push('the coil is outside the view.');
    if (e.loop.turns !== undefined && !(Number.isInteger(e.loop.turns) && e.loop.turns >= 1)) problems.push('the coil needs a whole number of turns.');
    if (e.loop.ohms !== undefined && !(e.loop.ohms > 0)) problems.push('the coil needs a resistance above zero.');
  }
  if (e.rails) {
    const k = e.rails;
    if (!(k.x[1] > k.x[0] && k.y[1] > k.y[0])) problems.push('the rails need their end to the right of their start, and the upper rail above the lower one.');
    if (k.x[0] < x0 || k.x[1] > x1 || k.y[0] < y0 || k.y[1] > y1) problems.push('the rails are outside the view.');
    if (!(k.ohms > 0)) problems.push('the rails need a resistance above zero between them.');
    if (!(k.rod > k.x[0] && k.rod < k.x[1])) problems.push('the rod must start on the rails.');
    if (k.mass !== undefined && !(k.mass > 0)) problems.push('the rod needs a mass above zero.');
  }
  if (e.poster !== undefined && !(e.poster in e.clips)) problems.push(`the poster clip "${e.poster}" is not a clip.`);
  for (const part of e.thumb ?? []) if (!(INDUCTION_PARTS as readonly string[]).includes(part)) problems.push(`the thumbnail part "${part}" is not a part.`);
  for (const [name, clip] of Object.entries(e.clips)) {
    if (!clip.phases.length) problems.push(`clip "${name}" has no phases.`);
    for (const ph of clip.phases) {
      if (!(ph.dur > 0)) problems.push(`clip "${name}" has a phase with no duration.`);
      if (ph.tesla !== undefined && !Number.isFinite(ph.tesla)) problems.push(`clip "${name}" needs a field in teslas.`);
      if ((ph.speed !== undefined || ph.free) && !e.rails) problems.push(`clip "${name}" moves a rod, and the picture has no rails.`);
      if (ph.speed !== undefined && ph.free) problems.push(`clip "${name}" lets the rod go and sets its speed in the same phase.`);
      if (ph.free && e.rails && e.rails.mass === undefined) problems.push(`clip "${name}" lets the rod go, so the rod needs a mass.`);
    }
  }
  return problems;
}

/** Problems with a light element: no picture or more than one, a wave with no frequency, a trip of no length, clips that ask for what the picture does not have. */
export function checkLight(e: LightEl): string[] {
  const problems: string[] = [];
  const pictures = [e.wave, e.spectrum, e.trip, e.spin].filter((picture) => picture !== undefined).length;
  if (pictures !== 1) problems.push('give it exactly one of `wave`, `spectrum`, `trip` and `spin`.');
  const inSpectrum = (metres: number) => metres >= 1e-13 && metres <= 1e4;
  if (e.wave) {
    if (!(e.wave.hertz > 0)) problems.push('the wave needs a frequency above zero.');
    if (e.wave.cross !== undefined && !(e.wave.cross > 0)) problems.push('the wave must take more than zero seconds to cross the picture.');
    if (e.wave.filter && !(e.wave.filter.at > 0 && e.wave.filter.at < 1)) problems.push('the filter must stand part of the way along the path (between 0 and 1).');
    if (e.wave.real !== undefined && !(e.wave.real > 0)) problems.push('the real frequency must be more than zero.');
  }
  if (e.spectrum && !inSpectrum(e.spectrum.at)) problems.push('the pointer must start at a wavelength between 10⁻¹³ m and 10⁴ m.');
  if (e.trip) {
    if (!(e.trip.metres > 0)) problems.push('the trip needs a distance above zero.');
    if (e.trip.clock && !(e.trip.clock.seconds > 0)) problems.push('a unit of the clock must be more than zero seconds.');
    if (e.trip.length && !(e.trip.length.metres > 0)) problems.push('a unit of length must be more than zero metres.');
  }
  if (e.spin) {
    if (!(e.spin.metres > 0)) problems.push('the fixed mirror needs a distance above zero.');
    if (e.spin.hertz !== undefined && !(e.spin.hertz >= 0)) problems.push('the spinning mirror cannot turn a negative number of times each second.');
  }
  if (e.rate !== undefined && !(e.rate > 0)) problems.push('the rate must be more than zero.');
  if (e.rate !== undefined && !e.trip && !e.spin) problems.push('only a trip or a spinning mirror has a rate.');
  if (e.poster !== undefined && !(e.poster in e.clips)) problems.push(`the poster clip "${e.poster}" is not a clip.`);
  if (e.posterAt !== undefined && !(e.posterAt > 0 && e.posterAt <= 1)) problems.push('`posterAt` is a share of the poster clip, above 0 and up to 1.');
  for (const part of e.thumb ?? []) if (!(LIGHT_PARTS as readonly string[]).includes(part)) problems.push(`the thumbnail part "${part}" is not a part.`);
  for (const [name, clip] of Object.entries(e.clips)) {
    if (!clip.phases.length) problems.push(`clip "${name}" has no phases.`);
    for (const ph of clip.phases) {
      if (!(ph.dur > 0)) problems.push(`clip "${name}" has a phase with no duration.`);
      if (ph.on !== undefined && !e.wave) problems.push(`clip "${name}" starts or stops a charge, and the picture is not a wave.`);
      if (ph.hertz !== undefined && !e.wave && !e.spin) problems.push(`clip "${name}" sets a frequency, and the picture is not a wave or a spinning mirror.`);
      if (ph.hertz !== undefined && e.wave && !(ph.hertz > 0)) problems.push(`clip "${name}" needs a frequency above zero.`);
      if (ph.hertz !== undefined && e.spin && !(ph.hertz >= 0)) problems.push(`clip "${name}" cannot turn the mirror a negative number of times each second.`);
      if (ph.filter !== undefined && !e.wave?.filter) problems.push(`clip "${name}" turns a filter, and the picture has none.`);
      if (ph.to !== undefined && !e.spectrum) problems.push(`clip "${name}" slides a pointer, and the picture is not a spectrum.`);
      if (ph.to !== undefined && e.spectrum && !inSpectrum(ph.to)) problems.push(`clip "${name}" slides the pointer off the spectrum (it runs from 10⁻¹³ m to 10⁴ m).`);
      if (ph.send && !e.trip) problems.push(`clip "${name}" sends a flash, and the picture is not a trip.`);
    }
  }
  return problems;
}

/** Problems with a transformer element: coils with no turns, a supply with no voltage, clips that ask for what the supply cannot do. */
export function checkTransformer(e: TransformerEl): string[] {
  const problems: string[] = [];
  if (!e.turns.every((n) => Number.isInteger(n) && n >= 1)) problems.push('each coil needs a whole number of turns.');
  if (!(e.volts > 0)) problems.push('the supply needs a voltage above zero.');
  if (e.hertz !== undefined && !(e.hertz > 0)) problems.push('the supply needs a frequency above zero.');
  if (e.dc && e.hertz !== undefined) problems.push('a battery has no frequency.');
  if (e.settle !== undefined && !(e.dc && e.settle > 0)) problems.push('only a battery has a time to settle, and it must be more than zero.');
  if (e.load !== undefined && !(e.load > 0)) problems.push('the lamp needs a resistance above zero.');
  if (e.rate !== undefined && !(e.rate > 0)) problems.push('the rate must be more than zero.');
  if (e.sweep !== undefined && !(e.sweep > 0)) problems.push('a sweep of the screens must take more than zero seconds.');
  if (e.poster !== undefined && !(e.poster in e.clips)) problems.push(`the poster clip "${e.poster}" is not a clip.`);
  for (const part of e.thumb ?? []) if (!(TRANSFORMER_PARTS as readonly string[]).includes(part)) problems.push(`the thumbnail part "${part}" is not a part.`);
  for (const [name, clip] of Object.entries(e.clips)) {
    if (!clip.phases.length) problems.push(`clip "${name}" has no phases.`);
    for (const ph of clip.phases) {
      if (!(ph.dur > 0)) problems.push(`clip "${name}" has a phase with no duration.`);
      if (ph.secondary !== undefined && !(Number.isInteger(ph.secondary) && ph.secondary >= 1)) problems.push(`clip "${name}" needs a whole number of turns for the secondary coil.`);
    }
  }
  return problems;
}

/** Problems with a power line element: no power, no resistance, a voltage of zero, or a line that wastes more than it is sent. */
export function checkPowerline(e: PowerlineEl): string[] {
  const problems: string[] = [];
  if (!(e.watts > 0)) problems.push('the station needs a power above zero.');
  if (!(e.ohms > 0)) problems.push('the line needs a resistance above zero.');
  if (!(e.volts > 0)) problems.push('the line needs a voltage above zero.');
  const wasteful = (volts: number) => e.watts > 0 && e.ohms > 0 && volts > 0 && (e.watts / volts) ** 2 * e.ohms >= e.watts;
  if (wasteful(e.volts)) problems.push('at this voltage the line would waste all of the power it is sent.');
  if (e.poster !== undefined && !(e.poster in e.clips)) problems.push(`the poster clip "${e.poster}" is not a clip.`);
  for (const part of e.thumb ?? []) if (!(POWERLINE_PARTS as readonly string[]).includes(part)) problems.push(`the thumbnail part "${part}" is not a part.`);
  for (const [name, clip] of Object.entries(e.clips)) {
    if (!clip.phases.length) problems.push(`clip "${name}" has no phases.`);
    for (const ph of clip.phases) {
      if (!(ph.dur > 0)) problems.push(`clip "${name}" has a phase with no duration.`);
      if (ph.volts !== undefined && !(ph.volts > 0)) problems.push(`clip "${name}" needs a voltage above zero.`);
      if (ph.volts !== undefined && wasteful(ph.volts)) problems.push(`clip "${name}" steps the line down to a voltage at which it would waste all of the power.`);
    }
  }
  return problems;
}

/** Problems with a magnets element: a view with no size, ids used twice, things outside the view, clips that name nothing. */
export function checkMagnets(e: MagnetsEl): string[] {
  const problems: string[] = [];
  const [x0, x1, y0, y1] = e.view;
  if (!(x1 > x0 && y1 > y0)) problems.push('the view needs its right above its left, and its top above its bottom.');
  if (e.length && !(e.length.metres > 0)) problems.push('the length unit must be more than zero metres.');
  const [bars, wires, iron] = [e.bars ?? [], e.wires ?? [], e.iron ?? []];
  const points = [...(e.compasses ?? []), ...(e.probes ?? [])];
  const all = [...bars, ...wires, ...iron, ...points];
  if (!bars.length && !wires.length && !e.uniform) problems.push('it needs a bar magnet, a wire or a uniform field.');
  const ids = new Set<string>();
  if (e.g !== undefined && !(e.g >= 0)) problems.push('gravity cannot be below zero.');
  if (e.rate !== undefined && !(e.rate > 0)) problems.push('the rate must be more than zero.');
  if (e.yoke) {
    const { faces, span, thick, base } = e.yoke;
    if (!e.uniform || e.uniform[0] === 0 || e.uniform[1] !== 0) problems.push('the poles of a magnet need a uniform field along x between them.');
    if (!(faces[1] > faces[0] && faces[0] > x0 && faces[1] < x1)) problems.push('the pole faces need two values of x inside the view, the left one first.');
    if (!(span[1] > span[0] && span[0] >= y0 && span[1] <= y1)) problems.push('the poles need a span inside the view, its bottom first.');
    if (thick !== undefined && !(thick > 0)) problems.push('the poles need a thickness above zero.');
    if (base !== undefined && !(base > 0 && span[0] - base >= y0)) problems.push('the bar that joins the poles needs a thickness above zero, and room under the gap.');
  }
  if (e.balance && !(e.g !== undefined && e.g > 0 && e.yoke)) problems.push('a balance needs gravity and the poles of a magnet to stand on it.');
  if (e.coil) {
    const c = e.coil;
    ids.add(c.id);
    if ((MAGNETS_PARTS as readonly string[]).includes(c.id)) problems.push(`the id "${c.id}" is the name of a part.`);
    if (!(c.radius > 0 && c.metres > 0)) problems.push('the coil needs a radius and a length above zero.');
    if (c.drive === undefined && !(c.inertia !== undefined && c.inertia > 0)) problems.push('the coil of a motor needs a moment of inertia above zero.');
    if (c.drive !== undefined && c.amps !== 0) problems.push('a coil that is driven carries only the induced current: give it `amps: 0`.');
    if (c.drive === undefined && (c.load !== undefined || c.slip)) problems.push('only a coil that is driven (a generator) has a load or slip rings.');
    if (c.load !== undefined && !(c.load > 0)) problems.push('the load of the generator needs a resistance above zero.');
    if (c.slip && c.commutator) problems.push('the coil has slip rings or a commutator, not both.');
    if (c.turns !== undefined && !(Number.isInteger(c.turns) && c.turns >= 1)) problems.push('the coil needs a whole number of turns.');
    if (c.friction !== undefined && !(c.friction >= 0)) problems.push('the friction of the coil cannot be below zero.');
    if (c.at[0] - c.radius < x0 || c.at[0] + c.radius > x1 || c.at[1] - c.radius < y0 || c.at[1] + c.radius > y1) problems.push('the coil turns outside the view.');
    if (e.yoke && (c.at[0] - c.radius < e.yoke.faces[0] || c.at[0] + c.radius > e.yoke.faces[1] || c.at[1] - c.radius < e.yoke.span[0] || c.at[1] + c.radius > e.yoke.span[1])) problems.push('the coil turns outside the gap between the poles.');
  }
  if (e.trace) {
    const { at, span, volts, seconds } = e.trace;
    if (e.coil?.drive === undefined) problems.push('a trace needs a coil that is driven (a generator).');
    if (!(at[1] > at[0] && at[0] >= x0 && at[1] <= x1 && span[1] > span[0] && span[0] >= y0 && span[1] <= y1)) problems.push('the trace needs a place inside the view: two values of x and two of y, the smaller first.');
    if (!(volts > 0 && seconds > 0)) problems.push('the trace needs an emf and a time above zero.');
  }
  if (e.pickup) {
    const k = e.pickup;
    ids.add(k.id);
    if ((MAGNETS_PARTS as readonly string[]).includes(k.id)) problems.push(`the id "${k.id}" is the name of a part.`);
    if (!(k.long > 0 && k.radius > 0)) problems.push('the pickup coil needs a length and a radius above zero.');
    if (k.drawn !== undefined && !(Number.isInteger(k.drawn) && k.drawn >= 2)) problems.push('the pickup coil needs two or more turns drawn.');
    if (k.at[0] - k.long / 2 < x0 || k.at[0] + k.long / 2 > x1 || k.at[1] - k.radius < y0 || k.at[1] + k.radius > y1) problems.push('the pickup coil is outside the view.');
    if (!bars.length) problems.push('a pickup coil needs a bar magnet to induce an emf in it.');
    for (const b of bars) {
      if (b.at[1] !== k.at[1] || (b.angle ?? 0) % 180 !== 0) problems.push(`bar "${b.id}" must lie along the axis of the pickup coil.`);
      if (!(b.thick < 2 * k.radius)) problems.push(`bar "${b.id}" is too thick to go into the pickup coil.`);
    }
  }
  for (const o of all) {
    if (ids.has(o.id)) problems.push(`the id "${o.id}" is used twice.`);
    ids.add(o.id);
    if ((MAGNETS_PARTS as readonly string[]).includes(o.id)) problems.push(`the id "${o.id}" is the name of a part.`);
    if (o.at[0] < x0 || o.at[0] > x1 || o.at[1] < y0 || o.at[1] > y1) problems.push(`"${o.id}" starts outside the view.`);
  }
  for (const b of [...bars, ...iron]) if (!(b.long > 0 && b.thick > 0)) problems.push(`"${b.id}" needs a length and a thickness above zero.`);
  for (const b of bars) if (b.lines !== undefined && !(Number.isInteger(b.lines) && b.lines >= 2)) problems.push(`bar "${b.id}" needs a whole number of field lines, two or more.`);
  for (const b of iron) if (b.order !== undefined && !(b.order >= 0 && b.order <= 1)) problems.push(`iron "${b.id}" needs an order from 0 to 1.`);
  for (const w of wires) if (w.metres !== undefined && !(w.metres > 0)) problems.push(`wire "${w.id}" needs a length above zero.`);
  for (const w of wires) if (w.mass !== undefined && !(w.mass > 0 && w.metres !== undefined)) problems.push(`wire "${w.id}" needs a mass above zero, and the length of it that is in the field.`);
  for (const w of wires) if (w.rests && w.mass === undefined) problems.push(`wire "${w.id}" rests on supports, so it needs a mass.`);
  if (e.earth !== undefined && (!bars.length || !(e.earth > 0))) problems.push('the Earth needs a bar magnet inside it and a radius above zero.');
  for (const [sx, sy] of e.seeds ?? []) if (sx < x0 || sx > x1 || sy < y0 || sy > y1) problems.push(`the seed at (${sx}, ${sy}) is outside the view.`);
  if (e.poster !== undefined && !(e.poster in e.clips)) problems.push(`the poster clip "${e.poster}" is not a clip.`);
  if (e.posterAt !== undefined && !(e.posterAt > 0 && e.posterAt <= 1 && e.poster !== undefined)) problems.push('`posterAt` needs a poster clip, and a part of it from 0 to 1.');
  for (const part of e.thumb ?? []) if (!(MAGNETS_PARTS as readonly string[]).includes(part)) problems.push(`the thumbnail part "${part}" is not a part.`);
  const named = (group: Array<{ id: string }>) => new Set(group.map((o) => o.id));
  const [barIds, wireIds, ironIds] = [named(bars), named(wires), named(iron)];
  for (const [name, clip] of Object.entries(e.clips)) {
    if (!clip.phases.length) problems.push(`clip "${name}" has no phases.`);
    for (const ph of clip.phases) {
      if (!(ph.dur > 0)) problems.push(`clip "${name}" has a phase with no duration.`);
      for (const [id, [tx, ty]] of Object.entries(ph.to ?? {})) {
        if (!ids.has(id)) problems.push(`clip "${name}" moves "${id}", which is not in the picture.`);
        else if (id === e.coil?.id) problems.push(`clip "${name}" moves the coil, which stays on its axle.`);
        else if (id === e.pickup?.id) problems.push(`clip "${name}" moves the pickup coil: move the magnet instead.`);
        else if (e.pickup && barIds.has(id) && ty !== e.pickup.at[1]) problems.push(`clip "${name}" moves "${id}" off the axis of the pickup coil.`);
        else if (wires.some((w) => w.id === id && w.mass !== undefined)) problems.push(`clip "${name}" moves "${id}", which has a mass and moves by itself.`);
        else if (tx < x0 || tx > x1 || ty < y0 || ty > y1) problems.push(`clip "${name}" moves "${id}" outside the view.`);
      }
      for (const id of Object.keys(ph.turn ?? {})) if (!barIds.has(id)) problems.push(`clip "${name}" turns "${id}", which is not a bar magnet.`);
      if (e.pickup && Object.keys(ph.turn ?? {}).length) problems.push(`clip "${name}" turns a magnet, which must stay along the axis of the pickup coil.`);
      for (const id of Object.keys(ph.amps ?? {})) if (!wireIds.has(id) && id !== e.coil?.id) problems.push(`clip "${name}" sets the current of "${id}", which is not a wire.`);
      if (ph.drive !== undefined && e.coil?.drive === undefined) problems.push(`clip "${name}" changes how fast the coil is driven, and the picture has no generator.`);
      if (e.coil?.drive !== undefined && e.coil.id in (ph.amps ?? {})) problems.push(`clip "${name}" sets the current of a coil that is driven.`);
      for (const [id, order] of Object.entries(ph.order ?? {})) {
        if (!ironIds.has(id)) problems.push(`clip "${name}" lines up "${id}", which is not a piece of iron.`);
        if (!(order >= 0 && order <= 1)) problems.push(`clip "${name}" needs an order from 0 to 1.`);
      }
    }
  }
  return problems;
}

/**
 * Problems with a charges element: marks that do not add up, electrons sent from a body that has
 * none, clips that name no body. The electrons each body holds, and the wires to the ground, are
 * followed through the clips in `order`: the order a scene plays them in (a clip can be played
 * twice), or the order they are written in when none is given.
 */
export function checkCharges(e: ChargesEl, order: string[] = Object.keys(e.clips)): string[] {
  const problems: string[] = [];
  const ids = new Set(e.bodies.map((b) => b.id));
  const whole = (n: number) => Math.abs(n - Math.round(n)) < 1e-6;
  if (!e.bodies.length) problems.push('it needs a body.');
  if (ids.size !== e.bodies.length) problems.push('two bodies share an id.');
  for (const id of ids) if ((CHARGES_PARTS as readonly string[]).includes(id) || id === 'ground' || id === 'weight') problems.push(`body id "${id}" is the name of a part, of the ground or of a force.`);
  if (e.unit !== undefined && !(e.unit in CHARGE_UNITS)) problems.push(`the unit of charge is one of ${Object.keys(CHARGE_UNITS).join(', ')}.`);
  if (e.mark !== undefined && !(e.mark > 0)) problems.push('a mark stands for a charge above zero.');
  const marked = new Map<string, number>();
  for (const b of e.bodies) {
    const shape = b.shape ?? 'point';
    if (shape !== 'point' && !(b.radius !== undefined && b.radius > 0)) problems.push(`body "${b.id}" needs a radius (half its length, for a rod or a cloth) above zero.`);
    if (b.radius !== undefined && !(b.radius > 0)) problems.push(`body "${b.id}" needs a radius above zero.`);
    if (b.thick !== undefined && !(b.thick > 0)) problems.push(`body "${b.id}" needs a thickness above zero.`);
    if (b.mass !== undefined && !(b.mass > 0)) problems.push(`body "${b.id}" needs a mass above zero.`);
    if (b.v && !b.mass) problems.push(`body "${b.id}" needs a mass to have a velocity.`);
    if (b.pairs !== undefined) {
      if (shape === 'point') problems.push(`body "${b.id}" is a point: a sphere, a rod, a cloth or an atom shows its charges.`);
      else if (shape === 'atom' && b.pairs > 10) problems.push(`atom "${b.id}" has room for ten electrons in its two shells, so it can have ten protons at most.`);
      else if (!e.mark) problems.push(`body "${b.id}" shows its charges, so the element needs the charge of one mark (\`mark\`).`);
      else if (!(Number.isInteger(b.pairs) && b.pairs > 0)) problems.push(`body "${b.id}" needs a whole number of pairs above zero.`);
      else if (!whole(b.charge / e.mark)) problems.push(`the charge of body "${b.id}" is not a whole number of marks.`);
      else if (b.pairs - Math.round(b.charge / e.mark) < 0) problems.push(`body "${b.id}" has too few pairs for its charge: it cannot lose more electrons than it has.`);
      else if (shape === 'atom' && b.pairs - Math.round(b.charge / e.mark) > 10) problems.push(`atom "${b.id}" starts with more than ten electrons: its two shells have room for ten.`);
      else marked.set(b.id, b.pairs - Math.round(b.charge / e.mark));
    }
    if (shape === 'atom' && b.pairs === undefined) problems.push(`atom "${b.id}" needs its number of protons (\`pairs\`).`);
    if (b.wire && shape !== 'sphere') problems.push(`body "${b.id}" is not a sphere: only a sphere is joined to the ground.`);
  }
  e.bodies.forEach((a, i) => {
    // A test charge with no charge only marks a place or a path, so it can start where another body is.
    const mark = (o: ChargeBody) => !!o.test && o.charge === 0 && o.pairs === undefined;
    for (const b of e.bodies.slice(i + 1)) if (a.x === b.x && (a.y ?? 0) === (b.y ?? 0) && !mark(a) && !mark(b)) problems.push(`bodies "${a.id}" and "${b.id}" start at the same place.`);
  });
  if (!(e.view[1] > e.view[0] && e.view[3] > e.view[2])) problems.push('the view is [left, right, bottom, top].');
  if (e.k !== undefined && !(e.k > 0)) problems.push('k must be above zero.');
  if (e.length && !(e.length.metres > 0)) problems.push('the unit of distance needs a size above zero.');
  if (e.rate !== undefined && !(e.rate > 0)) problems.push('the rate must be above zero.');
  if (e.sway !== undefined && !(e.sway > 0)) problems.push('the sway must be above zero.');
  if (e.forceDecimals !== undefined && !(Number.isInteger(e.forceDecimals) && e.forceDecimals >= 0)) problems.push('forces are written with a whole number of decimal places.');
  for (const id of e.pulls ?? []) if (!ids.has(id)) problems.push(`no body "${id}" to draw the forces on.`);
  for (const pair of e.spans ?? []) for (const id of pair) if (!ids.has(id)) problems.push(`no body "${id}" to mark a distance from.`);
  if (e.poster && !(e.poster in e.clips)) problems.push(`no clip "${e.poster}" for the thumbnail.`);
  for (const part of e.thumb ?? []) if (!(CHARGES_PARTS as readonly string[]).includes(part)) problems.push(`no part "${part}" to draw on the thumbnail.`);
  if (e.plates) {
    const pl = e.plates;
    if (pl.at[0] === pl.at[1]) problems.push('the two plates are at the same place.');
    if (!(pl.span[1] > pl.span[0])) problems.push('the span of the plates is [from, to].');
    if (!Number.isFinite(pl.volts)) problems.push('the plates need a potential difference in volts.');
    if (pl.lines !== undefined && !(Number.isInteger(pl.lines) && pl.lines > 0)) problems.push('the plates have a whole number of field lines above zero.');
    if (pl.levels !== undefined && !(Number.isInteger(pl.levels) && pl.levels >= 0)) problems.push('the plates have a whole number of lines of equal potential.');
  }
  if (e.uniform && !(e.uniform.field > 0)) problems.push('a uniform field needs a strength above zero (turn it with `angle`).');
  if (e.plates && e.uniform) problems.push('give plates or a uniform field, not both.');
  if (e.g !== undefined && !(e.g > 0)) problems.push('g must be above zero.');
  if (e.magnetic) {
    const m = e.magnetic;
    if (!Number.isFinite(m.tesla)) problems.push('the magnetic field needs a strength in teslas.');
    if (m.region && !(m.region[1] > m.region[0] && m.region[3] > m.region[2])) problems.push('the region of the magnetic field is [left, right, bottom, top].');
    if (m.screen && !m.region) problems.push('a detector is a side of the region of the magnetic field, so the field needs a region.');
    if (m.figures !== undefined && !(Number.isInteger(m.figures) && m.figures > 0)) problems.push('the magnetic field is written with a whole number of figures above zero.');
  }
  if (e.lines !== undefined && !(Number.isInteger(e.lines) && e.lines > 0)) problems.push('a charge has a whole number of field lines above zero.');
  const shapes = new Map(e.bodies.map((b) => [b.id, b.shape ?? 'point']));
  for (const [name, clip] of Object.entries(e.clips)) {
    if (!clip.phases.length) problems.push(`clip "${name}" has no phases.`);
    clip.phases.forEach((ph, pi) => {
      const where = `clip "${name}", phase ${pi + 1}`;
      if (!(ph.dur > 0)) problems.push(`${where} needs a length above zero.`);
      for (const id of [...Object.keys(ph.to ?? {}), ...Object.keys(ph.charge ?? {}), ...Object.keys(ph.ground ?? {})]) if (!ids.has(id)) problems.push(`${where} names no body "${id}".`);
      for (const id of Object.keys(ph.charge ?? {})) if (marked.has(id)) problems.push(`${where}: body "${id}" shows its charges, so its charge changes as electrons cross (\`electrons\`).`);
      for (const id of Object.keys(ph.ground ?? {})) if (shapes.get(id) !== 'sphere') problems.push(`${where}: body "${id}" is not a sphere: only a sphere is joined to the ground.`);
      if (ph.fly && ph.to) problems.push(`${where} cannot carry a body while time runs.`);
      if (ph.fly && !e.bodies.some((b) => b.mass)) problems.push(`${where} lets time run, but no body has a mass.`);
      if ((ph.volts !== undefined || ph.plates) && !e.plates) problems.push(`${where} changes the plates, but the element has none.`);
      if (ph.volts !== undefined && !Number.isFinite(ph.volts)) problems.push(`${where} needs a potential difference in volts.`);
      if (ph.plates && ph.plates[0] === ph.plates[1]) problems.push(`${where} puts the two plates at the same place.`);
      if (ph.plates && ph.fly) problems.push(`${where} cannot move the plates while time runs.`);
      if (ph.tesla !== undefined && !e.magnetic) problems.push(`${where} changes the magnetic field, but the element has none.`);
      if (ph.tesla !== undefined && !Number.isFinite(ph.tesla)) problems.push(`${where} needs a magnetic field in teslas.`);
      for (const id of Object.keys(ph.launch ?? {})) {
        if (!ids.has(id)) problems.push(`${where} names no body "${id}".`);
        else if (!e.bodies.find((b) => b.id === id)?.mass) problems.push(`${where}: body "${id}" needs a mass to be thrown.`);
      }
      if (ph.rate !== undefined && !(ph.rate > 0)) problems.push(`${where}: the rate must be above zero.`);
      const gives = new Set<string>();
      const takes = new Set<string>();
      for (const t of ph.electrons ?? []) {
        if (!(Number.isInteger(t.n) && t.n > 0)) problems.push(`${where} sends a whole number of electrons above zero.`);
        if (t.from === t.to) problems.push(`${where} sends electrons from "${t.from}" to itself.`);
        for (const id of [t.from, t.to]) {
          if (id === 'ground') continue;
          if (!ids.has(id)) problems.push(`${where} names no body "${id}".`);
          else if (!marked.has(id)) problems.push(`${where}: body "${id}" does not show its charges (\`pairs\`), so no electron can be seen to cross.`);
        }
        if (t.from === 'ground' && t.to === 'ground') problems.push(`${where} sends electrons from the ground to the ground.`);
        if (marked.has(t.from)) gives.add(t.from);
        if (marked.has(t.to)) takes.add(t.to);
      }
      for (const id of gives) if (takes.has(id)) problems.push(`${where}: body "${id}" gives and takes electrons at once; use two phases.`);
    });
  }
  // What depends on what has gone before: the electrons each body holds, and which spheres are joined to the ground.
  const first = new Map(marked);
  const grounded = new Set<string>();
  const told = new Set<string>();
  const tell = (problem: string) => {
    if (!told.has(problem)) problems.push(problem);
    told.add(problem);
  };
  for (const name of order) {
    const clip = e.clips[name];
    if (!clip) continue;
    if (clip.reset) {
      for (const [id, n] of first) marked.set(id, n);
      grounded.clear();
    }
    clip.phases.forEach((ph, pi) => {
      const where = `clip "${name}", phase ${pi + 1}`;
      for (const [id, on] of Object.entries(ph.ground ?? {})) {
        if (on) grounded.add(id);
        else grounded.delete(id);
      }
      for (const t of ph.electrons ?? []) {
        const other = t.from === 'ground' ? t.to : t.to === 'ground' ? t.from : null;
        if (other !== null && other !== 'ground' && ids.has(other) && !grounded.has(other)) tell(`${where}: body "${other}" is not joined to the ground.`);
        if (marked.has(t.from)) {
          marked.set(t.from, marked.get(t.from)! - t.n);
          if (marked.get(t.from)! < 0) tell(`${where}: body "${t.from}" has no more electrons to give.`);
        }
        if (marked.has(t.to)) {
          marked.set(t.to, marked.get(t.to)! + t.n);
          if (shapes.get(t.to) === 'atom' && marked.get(t.to)! > 10) tell(`${where}: atom "${t.to}" has room for ten electrons at most.`);
        }
      }
    });
  }
  return problems;
}

export function checkScript(x: Explainer): string[] {
  const problems: string[] = [];
  if (!x.scenes.length) problems.push('The script has no scenes.');
  // An exam question video must always credit where its question comes from.
  if (x.exam && (!x.exam.lesson || !x.exam.source.trim() || !x.exam.licence.trim() || !x.exam.question?.trim())) problems.push('An exam question video needs its lesson, its source, its licence and the whole question.');
  x.scenes.forEach((s, si) => {
    const ids = new Set<string>();
    const diagrams = new Map<string, Set<string>>();
    const screens = new Set<string>();
    const motions = new Map<string, MotionEl | ParticlesEl | AtomsEl | MoleculesEl | ScatterEl | WaveEl | RipplesEl | RaysEl | CircuitEl | FlightEl | RampEl | ForcesEl | GravityEl | ChargesEl | MagnetsEl | InductionEl | TransformerEl | PowerlineEl | LightEl | CircleEl>();
    for (const e of sceneElements(s)) {
      if (ids.has(e.id)) problems.push(`Scene ${si + 1}: the id "${e.id}" is used twice.`);
      ids.add(e.id);
      if (e.kind === 'math') {
        e.lines.forEach((m, mi) => {
          if (LOOSE_MINUS.test(m)) problems.push(`Scene ${si + 1}: maths "${e.id}.${mi}" has a minus after a space or label; write it in braces ({-5}), or it is set as subtraction.`);
        });
      }
      if (e.kind === 'screen') {
        // A screen's parts are its spots.
        diagrams.set(e.id, new Set(e.spots ?? []));
        screens.add(e.id);
      }
      if (e.kind === 'motion') {
        // A motion's parts are what it can show over its bodies, and the bodies themselves.
        diagrams.set(e.id, new Set<string>([...MOTION_PARTS, ...e.bodies.map((b) => b.id)]));
        motions.set(e.id, e);
        problems.push(...checkMotion(e).map((p) => `Scene ${si + 1}: motion "${e.id}": ${p}`));
      }
      if (e.kind === 'circuit') {
        diagrams.set(e.id, new Set<string>([...CIRCUIT_PARTS, ...e.parts.map((part) => part.id), ...(e.lead ? [e.lead.id] : [])]));
        motions.set(e.id, e);
        problems.push(...checkCircuit(e).map((p) => `Scene ${si + 1}: circuit "${e.id}": ${p}`));
      }
      if (e.kind === 'flight') {
        diagrams.set(e.id, new Set<string>([...FLIGHT_PARTS, ...e.bodies.map((b) => b.id)]));
        motions.set(e.id, e);
        problems.push(...checkFlight(e).map((p) => `Scene ${si + 1}: flight "${e.id}": ${p}`));
      }
      if (e.kind === 'ramp') {
        diagrams.set(e.id, new Set<string>([...RAMP_PARTS, ...e.bodies.map((b) => b.id), ...(e.hanging ? [e.hanging.id] : [])]));
        motions.set(e.id, e);
        problems.push(...checkRamp(e).map((p) => `Scene ${si + 1}: ramp "${e.id}": ${p}`));
      }
      if (e.kind === 'forces') {
        diagrams.set(e.id, new Set<string>([...FORCES_PARTS, 'body']));
        motions.set(e.id, e);
        problems.push(...checkForces(e).map((p) => `Scene ${si + 1}: forces "${e.id}": ${p}`));
      }
      if (e.kind === 'gravity') {
        diagrams.set(e.id, new Set<string>([...GRAVITY_PARTS, ...e.bodies.map((b) => b.id)]));
        motions.set(e.id, e);
        problems.push(...checkGravity(e).map((p) => `Scene ${si + 1}: gravity "${e.id}": ${p}`));
      }
      if (e.kind === 'charges') {
        diagrams.set(e.id, new Set<string>([...CHARGES_PARTS, ...e.bodies.map((b) => b.id)]));
        motions.set(e.id, e);
        // The clips are followed in the order the scene plays them (and a clip can be played twice).
        const played = s.lines.flatMap((l) => asList(l.play)).map((target) => target.split('.')).filter(([el]) => el === e.id).map(([, clip]) => clip ?? '');
        problems.push(...checkCharges(e, played).map((p) => `Scene ${si + 1}: charges "${e.id}": ${p}`));
      }
      if (e.kind === 'magnets') {
        diagrams.set(e.id, new Set<string>([...MAGNETS_PARTS, ...[...(e.bars ?? []), ...(e.wires ?? []), ...(e.iron ?? []), ...(e.compasses ?? []), ...(e.probes ?? []), ...(e.coil ? [e.coil] : []), ...(e.pickup ? [e.pickup] : [])].map((o) => o.id)]));
        motions.set(e.id, e);
        problems.push(...checkMagnets(e).map((p) => `Scene ${si + 1}: magnets "${e.id}": ${p}`));
      }
      if (e.kind === 'induction') {
        const circuit = e.loop ?? e.rails;
        diagrams.set(e.id, new Set<string>([...INDUCTION_PARTS, ...(circuit ? [circuit.id] : [])]));
        motions.set(e.id, e);
        problems.push(...checkInduction(e).map((p) => `Scene ${si + 1}: induction "${e.id}": ${p}`));
      }
      if (e.kind === 'transformer') {
        diagrams.set(e.id, new Set<string>(TRANSFORMER_PARTS));
        motions.set(e.id, e);
        problems.push(...checkTransformer(e).map((p) => `Scene ${si + 1}: transformer "${e.id}": ${p}`));
      }
      if (e.kind === 'powerline') {
        diagrams.set(e.id, new Set<string>(POWERLINE_PARTS));
        motions.set(e.id, e);
        problems.push(...checkPowerline(e).map((p) => `Scene ${si + 1}: power line "${e.id}": ${p}`));
      }
      if (e.kind === 'light') {
        diagrams.set(e.id, new Set<string>(LIGHT_PARTS));
        motions.set(e.id, e);
        problems.push(...checkLight(e).map((p) => `Scene ${si + 1}: light "${e.id}": ${p}`));
      }
      if (e.kind === 'circle') {
        diagrams.set(e.id, new Set<string>([...CIRCLE_PARTS, ...e.bodies.map((b) => b.id)]));
        motions.set(e.id, e);
        problems.push(...checkCircle(e).map((p) => `Scene ${si + 1}: circle "${e.id}": ${p}`));
      }
      if (e.kind === 'rays') {
        diagrams.set(e.id, new Set<string>(RAYS_PARTS));
        motions.set(e.id, e);
        problems.push(...checkRays(e).map((p) => `Scene ${si + 1}: rays "${e.id}": ${p}`));
      }
      if (e.kind === 'wave') {
        diagrams.set(e.id, new Set<string>([...WAVE_PARTS, ...e.lanes.map((l) => l.id)]));
        motions.set(e.id, e);
        problems.push(...checkWave(e).map((p) => `Scene ${si + 1}: wave "${e.id}": ${p}`));
      }
      if (e.kind === 'ripples') {
        diagrams.set(e.id, new Set<string>([...RIPPLES_PARTS, ...e.sources.map((src) => src.id)]));
        motions.set(e.id, e);
        problems.push(...checkRipples(e).map((p) => `Scene ${si + 1}: ripples "${e.id}": ${p}`));
      }
      if (e.kind === 'particles') {
        diagrams.set(e.id, new Set<string>([...PARTICLE_PARTS, ...e.boxes.map((b) => b.id)]));
        motions.set(e.id, e);
        problems.push(...checkParticles(e).map((p) => `Scene ${si + 1}: particles "${e.id}": ${p}`));
      }
      if (e.kind === 'atoms') {
        diagrams.set(e.id, new Set<string>([...ATOM_PARTS, ...e.atoms.map((a) => a.id)]));
        motions.set(e.id, e);
        problems.push(...checkAtoms(e).map((p) => `Scene ${si + 1}: atoms "${e.id}": ${p}`));
      }
      if (e.kind === 'scatter') {
        diagrams.set(e.id, new Set<string>(SCATTER_PARTS));
        motions.set(e.id, e);
        problems.push(...checkScatter(e).map((p) => `Scene ${si + 1}: scatter "${e.id}": ${p}`));
      }
      if (e.kind === 'molecules') {
        diagrams.set(e.id, new Set<string>(Object.keys(e.atoms)));
        motions.set(e.id, e);
        problems.push(...checkMolecules(e).map((p) => `Scene ${si + 1}: molecules "${e.id}": ${p}`));
      }
      if (e.kind !== 'diagram') continue;
      const parts = new Set<string>();
      const groups = new Set<string>();
      for (const item of e.items) {
        if (parts.has(item.id)) problems.push(`Scene ${si + 1}: diagram "${e.id}" uses the part id "${item.id}" twice.`);
        parts.add(item.id);
        if (item.group) groups.add(item.group);
        for (const pt of itemPoints(item)) if (!(pt in e.points)) problems.push(`Scene ${si + 1}: diagram "${e.id}", part "${item.id}" uses no point "${pt}".`);
      }
      // A line can show or emphasise a part by its id, or a group of parts by the group's name.
      diagrams.set(e.id, new Set([...parts, ...groups]));
    }
    if (!s.lines.length) problems.push(`Scene ${si + 1} has no lines.`);
    s.lines.forEach((l, li) => {
      if (!l.say.trim()) problems.push(`Scene ${si + 1}, line ${li + 1} says nothing.`);
      // The voice reads a bare four-digit whole number like a year (5280 as "fifty-two eighty").
      for (const [n] of l.say.matchAll(YEAR_LIKE)) problems.push(`Scene ${si + 1}, line ${li + 1}: write ${n} as ${n[0]},${n.slice(1)} or in words, or it is read like a year.`);
      const bare = l.say.match(BARE_A);
      if (bare) problems.push(`Scene ${si + 1}, line ${li + 1}: write the variable ${bare[0].trim()} as "${bare[0].trim()}" (in quotes), or it is read as the article.`);
      if (POINT_NUMBER.test(l.say)) problems.push(`Scene ${si + 1}, line ${li + 1}: say "the point at" before coordinates, or "the point four" can be heard as a decimal.`);
      for (const target of [...asList(l.show), ...asList(l.hide), ...asList(l.focus)]) {
        const [el, part] = target.split('.');
        if (!ids.has(el)) problems.push(`Scene ${si + 1}, line ${li + 1}: no element "${target}".`);
        else if (part !== undefined && motions.get(el)?.kind === 'particles' && !particlePartReady(motions.get(el) as ParticlesEl, part)) problems.push(`Scene ${si + 1}, line ${li + 1}: particles "${el}" shows "${part}" but does not set it up (thermometers, gauge, volume or flow).`);
        else if (part !== undefined && diagrams.has(el) && !diagrams.get(el)!.has(part)) problems.push(`Scene ${si + 1}, line ${li + 1}: ${screens.has(el) ? 'screen' : motions.has(el) ? motions.get(el)!.kind : 'diagram'} "${el}" has no part "${part}".`);
      }
      for (const target of asList(l.play)) {
        const [el, clip] = target.split('.');
        const m = motions.get(el);
        if (!m) problems.push(`Scene ${si + 1}, line ${li + 1}: no motion "${el}" to play.`);
        else if (!clip || !(clip in m.clips)) problems.push(`Scene ${si + 1}, line ${li + 1}: ${m.kind} "${el}" has no clip "${clip ?? ''}".`);
      }
    });
  });
  return problems;
}

const TONE_MACRO = /\\(opp|adj|hyp|thc|brand|good|bad)\{/g;

/**
 * Script text as plain lesson Markdown, for showing a video's questions in the app: tones become
 * bold and the colour macros are dropped (the video's colours are for its dark stage).
 */
export function plainMarkdown(md: string): string {
  return md.replace(/\[\[\w+:([^\]]+)\]\]/g, '**$1**').replace(TONE_MACRO, '{');
}
