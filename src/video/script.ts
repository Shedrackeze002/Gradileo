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
 * their total momentum), `graph` (a velocity-time or distance-time graph that draws itself as the
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
   * are the lengths of its axes. It plots velocity (in metres per second) unless `y` is
   * `'distance'`, the distance travelled in metres.
   */
  graph?: { of: string[]; seconds: number; max: number; y?: 'velocity' | 'distance' };
  /** Say "speed" instead of "v =" beside the velocity arrow, for videos that come before velocity is taught. */
  speedWord?: boolean;
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
   * solid that stays solid in a hot liquid) and how strongly gravity pulls it (`heavy`, 1).
   */
  kinds?: Array<{ n: number; tone?: Tone; name?: string; bond?: number; heavy?: number }>;
  /**
   * How strongly particles of different kinds attract one another (between their own bonds by
   * default). Stronger than the solute's own bond, a lump dissolves; much weaker, it stays whole.
   */
  cross?: number;
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
  /** Boxes whose held lump is let go as the phase starts. */
  release?: string[];
  /** How hard to stir each box (0 stops; 2 stirs briskly), reached steadily over the phase. */
  stir?: Record<string, number>;
}

/** What a particles element can show besides its boxes; each is a part ("p.thermo"). */
export const PARTICLE_PARTS = ['thermo', 'gauge', 'volume', 'hits', 'trail', 'labels', 'rate', 'flow', 'width', 'count'] as const;

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

export type El = TitleEl | TextEl | QuoteEl | MathEl | BulletsEl | CalloutEl | TableEl | TriangleEl | SimilarEl | DiagramEl | CalcEl | TryEl | ScreenEl | MotionEl | ParticlesEl;

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
    const n = b.kinds ? b.kinds.reduce((s, k) => s + k.n, 0) : (b.n ?? 30);
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
  for (const [name, clip] of Object.entries(e.clips)) {
    if (!clip.phases.length) problems.push(`clip "${name}" has no phases.`);
    clip.phases.forEach((ph, pi) => {
      if (!(ph.dur > 0)) problems.push(`clip "${name}", phase ${pi + 1} needs a length above zero.`);
      for (const id of ph.lift ?? []) if (!e.boxes.find((b) => b.id === id)?.divider) problems.push(`clip "${name}", phase ${pi + 1} lifts a divider that box "${id}" does not have.`);
      for (const id of ph.release ?? []) if (!e.boxes.find((b) => b.id === id)?.hold) problems.push(`clip "${name}", phase ${pi + 1} lets go of a lump that box "${id}" does not hold.`);
      for (const id of Object.keys(ph.stir ?? {})) if (!ids.has(id)) problems.push(`clip "${name}", phase ${pi + 1} names no box "${id}".`);
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
    const motions = new Map<string, MotionEl | ParticlesEl>();
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
      if (e.kind === 'particles') {
        diagrams.set(e.id, new Set<string>([...PARTICLE_PARTS, ...e.boxes.map((b) => b.id)]));
        motions.set(e.id, e);
        problems.push(...checkParticles(e).map((p) => `Scene ${si + 1}: particles "${e.id}": ${p}`));
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
        else if (part !== undefined && diagrams.has(el) && !diagrams.get(el)!.has(part)) problems.push(`Scene ${si + 1}, line ${li + 1}: ${screens.has(el) ? 'screen' : motions.has(el) ? 'motion' : 'diagram'} "${el}" has no part "${part}".`);
      }
      for (const target of asList(l.play)) {
        const [el, clip] = target.split('.');
        const m = motions.get(el);
        if (!m) problems.push(`Scene ${si + 1}, line ${li + 1}: no motion "${el}" to play.`);
        else if (!clip || !(clip in m.clips)) problems.push(`Scene ${si + 1}, line ${li + 1}: ${m.kind === 'particles' ? 'particles' : 'motion'} "${el}" has no clip "${clip ?? ''}".`);
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
