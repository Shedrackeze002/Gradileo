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

/** The name on every frame, thumbnail and YouTube description. */
import { checkAtoms } from './atoms.ts';

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
export const MOTION_PARTS = ['velocity', 'readout', 'net', 'bars', 'total', 'clock', 'strobe', 'graph', 'distance', 'displacement', 'energy', 'height'] as const;

/**
 * An energy bar of a motion element: the work done on the body by the forces pushing or lifting
 * it, its kinetic energy, its gravitational potential energy, the energy that friction and air
 * resistance have turned to heat, and the total of the last three.
 */
export type EnergyBar = 'work' | 'kinetic' | 'potential' | 'heat' | 'total';

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
  /** `false` when the total's bar is never shown, so no room is kept for it. */
  momentumTotal?: boolean;
  /**
   * A graph of these bodies against time, above a single track on its right: `seconds` and `max`
   * are the lengths of its axes, and `min` (below zero) lets the line go under the time axis. It
   * plots velocity (in metres per second) unless `y` is `'distance'`, the distance travelled in
   * metres, or `'position'`, where the body is on the track's ruler.
   */
  graph?: { of: string[]; seconds: number; max: number; min?: number; y?: 'velocity' | 'distance' | 'position' };
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
   * One lane; the parts are `velocity`, `energy`, `total`, `height` and `clock`.
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
   */
  energy?: { of?: string[]; max: number; bars: EnergyBar[]; g?: number; names?: Partial<Record<EnergyBar, string>>; labels?: Record<string, string> };
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
  /** The wave bounces back from the right end of the strip (a wall, a cliff), turned over, and the two add up. */
  reflect?: boolean;
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
export const WAVE_PARTS = ['particle', 'amplitude', 'wavelength', 'count', 'speed', 'frequency', 'front', 'labels', 'clock'] as const;

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
 * compressions and rarefactions, or a transverse wave's crests and troughs) and `clock`.
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
   * how fast compared with the solvent itself, 0 to 1).
   */
  kinds?: Array<{ n: number; tone?: Tone; name?: string; bond?: number; heavy?: number; size?: number; magnetic?: boolean; rise?: number }>;
  /**
   * How strongly particles of different kinds attract one another (between their own bonds by
   * default). Stronger than the solute's own bond, a lump dissolves; much weaker, it stays whole.
   */
  cross?: number;
  /**
   * A filter (or sieve) across the box at this fraction of its height, with holes this wide:
   * the particles start above it, and it holds them all until a phase lets them through
   * (`release`); then particles smaller than the holes pass and bigger ones stay on it.
   */
  filter?: { at: number; holes: number };
  /** An open top the particles can leave by (evaporation): one that reaches the top is gone. */
  escape?: boolean;
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
   * reacts with the surface of a lump and not the particles just under it.
   */
  reactions?: Array<{ a: number; b: number; to: [number, number]; join?: boolean; free?: [number | null, number | null]; carry?: boolean; line?: boolean; energy?: number; heat?: number; reach?: number }>;
  /**
   * Molecules the box starts with, besides the single particles in `kinds`: `n` of them, each
   * made of these atoms (kinds, by place), the first bonded to each of the others round it. A
   * `bent` molecule of three atoms is bent like water; otherwise the atoms sit in a line.
   */
  molecules?: Array<{ atoms: number[]; n: number; bent?: boolean }>;
  /** Hold the reactions back until a phase lets the box go (`release`), so they start on cue. */
  waits?: boolean;
  /** What the part `tally` counts under the box: the particles of these kinds, and what to call them. */
  tally?: { kinds: number[]; label: string };
  /** The first kind starts as a lump on the floor in the middle (or this many smaller lumps). */
  lump?: boolean | number;
  /** Hold the first kind still (a lump, keeping its shape), until a phase lets it go (`release`). */
  hold?: boolean;
  /** With several kinds, start them apart (the first kind on the left) instead of mixed. */
  apart?: boolean;
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
  /** How hard to stir each box (0 stops; 2 stirs briskly), reached steadily over the phase. */
  stir?: Record<string, number>;
  /** How strongly a magnet over each box pulls its magnetic kinds (0 takes it away; 1 is strong). */
  magnet?: Record<string, number>;
  /** How fast the solvent runs up each paper box (0 stops it; 1 is the usual). */
  run?: Record<string, number>;
}

/** What a particles element can show besides its boxes; each is a part ("p.thermo"). */
export const PARTICLE_PARTS = ['thermo', 'gauge', 'volume', 'hits', 'trail', 'labels', 'rate', 'flow', 'width', 'count', 'tally'] as const;

/**
 * Boxes of moving particles, for chemistry: a small simulation in which particles attract and
 * jostle one another (src/video/particles.ts), so solids vibrate in rows, liquids slide and gases
 * fly and bounce off the walls, and heating or squeezing a box changes them as it would. The
 * particles move whenever the element is on screen; a line plays a clip (`play: 'p.heat'`) to
 * change temperatures or move a lid, and the next line waits for it. Parts: `thermo` (a
 * thermometer by each box), `gauge` (a pressure gauge on the box `gauge.box`), `hits` (a flash
 * wherever a particle hits a wall), `rate` (wall hits each second, under each box), `trail` (the
 * path of each box's followed particle), `labels`, `flow` (an arrow of heat between two boxes,
 * thinner as their temperatures meet; set `flow` up) and `width` (a bracket over each box's
 * particles, with dashed marks as wide as they were when the element was shown, to see expansion)
 * and `count` (how many particles of each box's first kind have broken away on their own: "8 of 16
 * dissolved").
 * Emphasising a box's id makes it glow.
 */
export interface ParticlesEl {
  kind: 'particles';
  id: string;
  boxes: ParticleBox[];
  clips: Record<string, { phases: ParticlePhase[] }>;
  /** A pressure gauge on one box, reading `start` (in `unit`, kPa by default) as the box starts. */
  gauge?: { box: string; start: number; unit?: string };
  /** A volume reading under one box, `start` (in `unit`, L by default) with the lid where it starts. */
  volume?: { box: string; start: number; unit?: string; decimals?: number };
  /**
   * Keep room for a thermometer by each box (the part `thermo` shows them), with marks at these
   * temperatures if given ("melts", "boils").
   */
  thermometers?: boolean | { marks?: Array<{ at: Temp; label: string }> };
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
export const CIRCUIT_PARTS = ['charges', 'energy', 'arrows', 'current', 'voltage', 'power', 'charge', 'transferred', 'clock'] as const;

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
 * since the start), `transferred` (the energy the components have transferred since the start)
 * and `clock`.
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
  /** A ball (the default), a boat or an aircraft that points the way it is steered, or a plain dot (a walker on a map). */
  shape?: 'ball' | 'boat' | 'plane' | 'dot';
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
  /** A short note shown over the picture ("Slow motion"). */
  note?: string;
}

export interface FlightClip {
  phases: FlightPhase[];
  /** Put every body back at its start first, and clear its trail (to play the motion again). */
  reset?: boolean;
}

/** What a flight element can show over its bodies; each is a part ("f.components"). */
export const FLIGHT_PARTS = ['velocity', 'components', 'own', 'trail', 'strobe', 'shadows', 'displacement', 'legs', 'angle', 'readout', 'clock'] as const;

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
  /** For the thumbnail: the clip to show, part way through. */
  poster?: string;
  height?: number;
}

export type El = TitleEl | TextEl | QuoteEl | MathEl | BulletsEl | CalloutEl | TableEl | TriangleEl | SimilarEl | DiagramEl | CalcEl | TryEl | ScreenEl | MotionEl | ParticlesEl | WaveEl | RaysEl | CircuitEl | FlightEl | AtomsEl;

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
  scenes: Scene[];
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
  }
  if (e.poster && !(e.poster in e.clips)) problems.push(`no clip "${e.poster}" for the thumbnail.`);
  for (const id of e.graph?.of ?? []) if (!ids.has(id)) problems.push(`the graph names no body "${id}".`);
  if (e.graph?.min !== undefined && !(e.graph.min < 0)) problems.push('the lowest value of the graph must be below zero (leave it out otherwise).');
  if (e.graph?.min !== undefined && e.graph.y === 'distance') problems.push('a distance never falls below zero: leave out the lowest value of the graph.');
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
  const ids = new Set<string>();
  for (const part of e.parts) {
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
      for (const id of [...Object.keys(ph.set ?? {}), ...(ph.release ?? []), ...(ph.stop ?? [])]) if (!ids.has(id)) problems.push(`${where} names no body "${id}".`);
      if (ph.release?.length && !e.gravity) problems.push(`${where} lets a body go, but there is no gravity.`);
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
    if (b.lid !== undefined && !(b.lid > 0.2 && b.lid <= 1)) problems.push(`box "${b.id}": a lid must be between 0.2 and 1.`);
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
  for (const b of e.boxes) {
    const k = b.kinds?.length ?? 1;
    const ok = (i: number) => Number.isInteger(i) && i >= 0 && i < k;
    for (const r of b.reactions ?? []) if (![r.a, r.b, ...r.to].every(ok) || !(r.free ?? []).every((f) => f === null || ok(f))) problems.push(`box "${b.id}": a reaction names a kind it does not have.`);
    for (const m of b.molecules ?? []) {
      if (!m.atoms.every(ok) || m.atoms.length < 2) problems.push(`box "${b.id}": a molecule needs two atoms or more, of kinds the box has.`);
      if (m.bent && m.atoms.length !== 3) problems.push(`box "${b.id}": only a molecule of three atoms can be bent.`);
    }
    if (b.molecules && (b.apart || b.divider !== undefined || b.wall || b.filter || b.paper)) problems.push(`box "${b.id}": molecules can only start mixed through a plain box (with a lump, if you like).`);
    if (b.tally && !b.tally.kinds.every(ok)) problems.push(`box "${b.id}": the tally counts a kind it does not have.`);
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
      for (const id of [...Object.keys(ph.stir ?? {}), ...Object.keys(ph.magnet ?? {})]) if (!ids.has(id)) problems.push(`clip "${name}", phase ${pi + 1} names no box "${id}".`);
      for (const id of Object.keys(ph.run ?? {})) if (!e.boxes.find((b) => b.id === id)?.paper) problems.push(`clip "${name}", phase ${pi + 1} runs solvent up box "${id}", which is not paper.`);
      for (const id of [...Object.keys(ph.heat ?? {}), ...Object.keys(ph.lid ?? {})]) if (!ids.has(id)) problems.push(`clip "${name}", phase ${pi + 1} names no box "${id}".`);
      for (const v of Object.values(ph.lid ?? {})) if (!(v > 0.2 && v <= 1)) problems.push(`clip "${name}", phase ${pi + 1}: a lid must be between 0.2 and 1.`);
    });
  }
  return problems;
}

export function checkScript(x: Explainer): string[] {
  const problems: string[] = [];
  if (!x.scenes.length) problems.push('The script has no scenes.');
  x.scenes.forEach((s, si) => {
    const ids = new Set<string>();
    const diagrams = new Map<string, Set<string>>();
    const screens = new Set<string>();
    const motions = new Map<string, MotionEl | ParticlesEl | AtomsEl | WaveEl | RaysEl | CircuitEl | FlightEl>();
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
        diagrams.set(e.id, new Set<string>([...CIRCUIT_PARTS, ...e.parts.map((part) => part.id)]));
        motions.set(e.id, e);
        problems.push(...checkCircuit(e).map((p) => `Scene ${si + 1}: circuit "${e.id}": ${p}`));
      }
      if (e.kind === 'flight') {
        diagrams.set(e.id, new Set<string>([...FLIGHT_PARTS, ...e.bodies.map((b) => b.id)]));
        motions.set(e.id, e);
        problems.push(...checkFlight(e).map((p) => `Scene ${si + 1}: flight "${e.id}": ${p}`));
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
