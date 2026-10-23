/**
 * Core content types. Everything here is plain data so items can be generated,
 * stored, regenerated on the server and rendered by the browser.
 *
 * Text fields are Markdown with inline LaTeX ($...$) and display LaTeX ($$...$$).
 */

export type Difficulty = 1 | 2 | 3;

export interface Choice {
  id: string;
  /** Markdown + LaTeX */
  md: string;
  figure?: Figure;
}

export type LineForm = 'any' | 'slope-intercept' | 'slope-point' | 'general';

export type ExprForm =
  | 'any'
  | 'expanded' // sum of simplified monomials, like terms combined
  | 'factored' // fully factored over the integers
  | 'gcf' // greatest common factor removed (inner polynomial primitive)
  | 'simplified-radical' // a√b with b free of square (or cube) factors
  | 'entire-radical' // √n
  | 'positive-exponents' // simplified, no negative or zero exponents, each base once
  | 'prime-factorization' // product of primes (powers allowed)
  | 'radical-form' // written with a radical sign, no fractional exponents
  | 'exponent-form' // written with rational exponents, no radical sign
  | 'single-function'; // simplified trigonometry: at most one function call (2sec^2 x, 1 + cos x) and none in a denominator

export interface Line {
  /** Ax + By + C = 0 */
  A: number;
  B: number;
  C: number;
}

export type AnswerSpec =
  | { kind: 'mc'; choices: Choice[]; correct: string; layout?: 'list' | 'grid' }
  | { kind: 'multi'; choices: Choice[]; correct: string[]; layout?: 'list' | 'grid' }
  | {
      kind: 'numeric';
      value: number;
      /** Accept |answer - value| <= tolerance. Defaults are derived from `decimals`. */
      tolerance?: number;
      /** If set, the question asks for rounding to this many decimal places. */
      decimals?: number;
      /** Accept exact forms like 2sqrt(5), 3pi, 7/3. Default true when decimals is undefined. */
      allowExpression?: boolean;
      /** "undefined" is the correct answer (e.g. slope of a vertical line). */
      undefinedValue?: boolean;
      /** Unit label shown after the input box. */
      unit?: string;
      /** How an exact non-integer answer is shown on review screens. By default metric amounts and percents show as decimals, other values as fractions. */
      display?: 'fraction' | 'decimal';
      /** The exact answer in the syntax students type, such as '5pi/6' or '(sqrt(6) + sqrt(2))/4', for review screens and "show answers". */
      exact?: string;
      /** Accept sin, cos, tan, ln or log in the answer. Off by default: an exact value must be worked out, not typed as sin(5pi/12). */
      allowFunctions?: boolean;
      /**
       * The answer must be written as a fraction: 'lowest' = in lowest terms (improper fractions and
       * mixed numbers allowed), 'mixed' = a mixed number or proper fraction in lowest terms. A
       * whole-number value is written as a whole number.
       */
      fraction?: 'lowest' | 'mixed';
      /** The answer must be written as a decimal, not a fraction ("Write 3/8 as a decimal"). */
      asDecimal?: boolean;
      /**
       * Accept scientific notation as typed on a calculator or keyboard (2.5e-3, 2.5 x 10^-3,
       * 2.5×10⁻³) as a plain number. For chemistry quantities; off where a question asks for
       * standard form.
       */
      scientific?: boolean;
    }
  | {
      kind: 'numbers';
      /** Every answer, in any order (the roots of an equation, say). An empty list means "no solution". */
      values: number[];
      /** Rounding and tolerance apply to each value, as for a numeric answer. */
      decimals?: number;
      tolerance?: number;
      /** Exact forms of the values, in the same order, for review screens (see the numeric answer). */
      exact?: string[];
      allowFunctions?: boolean;
    }
  | { kind: 'expression'; expected: string; form?: ExprForm; positiveVars?: boolean; radicalIndex?: number }
  | { kind: 'line'; line: Line; form: LineForm }
  | { kind: 'equation-fn'; expected: string; variable: string; fnName: string }
  | { kind: 'point'; x: number; y: number; tolerance?: number }
  | { kind: 'graph-line'; line: Line; grid: GridSpec }
  | { kind: 'graph-points'; points: Array<[number, number]>; grid: GridSpec }
  | { kind: 'order'; items: Choice[]; correctOrder: string[] }
  | { kind: 'text'; accepted: string[]; caseSensitive?: boolean }
  /**
   * A chemical formula, written as a question writes it (`Na2SO4`, `SO4^2-`, `CuSO4.5H2O`) and
   * graded by what it is made of: the atoms of each element and the charge, however the student
   * writes the charge (engine/chem/formula.ts).
   */
  | { kind: 'formula'; expected: string }
  /**
   * The coefficients that balance an equation, in lowest whole numbers: a box before each formula,
   * an empty box meaning 1. Graded by whether the atoms and the charge balance.
   */
  | { kind: 'coefficients'; reactants: string[]; products: string[] }
  | { kind: 'manual'; rubric?: string; maxPoints?: number };

export interface Part {
  /** Label shown before the input, e.g. "Slope", "x =" (Markdown + LaTeX). */
  label?: string;
  /** Short unit or text after the input, e.g. "cm²". */
  suffix?: string;
  answer: AnswerSpec;
  /** Placeholder text inside the box. */
  placeholder?: string;
}

export interface Item {
  /** skillId:seed:difficulty, or custom:<assignmentId>:<index> */
  id: string;
  skillId: string;
  difficulty: Difficulty;
  prompt: string;
  figure?: Figure;
  parts: Part[];
  hints: string[];
  /** Worked solution, one step per entry. */
  solution: string[];
  /** Whether a calculator is reasonable for this item. */
  calculator?: boolean;
  /** Optional plain-language reference answer shown in review (Markdown + LaTeX). */
  answerDisplay?: string;
  points?: number;
}

/** A reference sufficient to regenerate an item exactly. */
export type ItemRef =
  | { skillId: string; seed: number; difficulty: Difficulty }
  | { custom: number; seed?: number };

export interface GridSpec {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  step?: number;
  xLabel?: string;
  yLabel?: string;
  /** Scale per grid line on each axis (for context graphs). */
  xStep?: number;
  yStep?: number;
  /** Label the x-axis in multiples of pi (π/2, π, 3π/2); use an xStep such as Math.PI / 2 or Math.PI / 6. */
  xPi?: boolean;
}

// ---------------------------------------------------------------------------
// Figures (rendered as SVG by the client)
// ---------------------------------------------------------------------------

export type Figure =
  | RightTriangleFigure
  | TwoTriangleFigure
  | SolidFigure
  | PlaneFigure
  | NumberLineFigure
  | RulerFigure
  | CaliperFigure
  | AreaModelFigure
  | ArrowDiagramFigure
  | TableFigure
  | BarChartFigure
  | CircleGraphFigure
  | CubesFigure;

/** Every figure type, for checking figures written by hand in lesson files. */
export const FIGURE_TYPES: ReadonlyArray<Figure['type']> = [
  'rightTriangle', 'twoTriangles', 'solid', 'plane', 'numberLine', 'ruler', 'caliper', 'areaModel', 'arrowDiagram', 'table', 'barChart', 'circleGraph', 'cubes',
];

export interface RightTriangleFigure {
  type: 'rightTriangle';
  /** Vertex names, right angle is at `right`. */
  vertices: { right: string; a: string; b: string };
  /** Leg lengths used for the drawn proportions (not necessarily labelled). */
  legA: number; // leg from right-angle vertex to vertex a (drawn horizontal before rotation)
  legB: number; // leg from right-angle vertex to vertex b (drawn vertical before rotation)
  /** Labels on sides: 'ra' = side right→a, 'rb' = right→b, 'ab' = hypotenuse. */
  sideLabels?: Partial<Record<'ra' | 'rb' | 'ab', string>>;
  /** Angle labels at vertices a or b, e.g. { a: '35°' } or { b: 'θ' }. */
  angleLabels?: Partial<Record<'a' | 'b', string>>;
  /** 0-3 quarter turns and optional mirror so students cannot rely on orientation. */
  rotate?: 0 | 1 | 2 | 3;
  mirror?: boolean;
  /** Optional scene decoration for applications. */
  scene?: 'none' | 'ladder' | 'tree' | 'building' | 'ramp' | 'kite' | 'cliff';
}

export interface TwoTriangleFigure {
  type: 'twoTriangles';
  /** Shared vertical side (a tower/cliff) with observers on the same or opposite sides. */
  arrangement: 'opposite' | 'same' | 'stacked';
  labels: Partial<Record<string, string>>;
}

export type SolidShape =
  | 'rectPrism'
  | 'cube'
  | 'triPrism'
  | 'cylinder'
  | 'cone'
  | 'sphere'
  | 'hemisphere'
  | 'squarePyramid'
  | 'rectPyramid'
  | 'cylinderCone'
  | 'cylinderHemisphere'
  | 'capsule'
  | 'cubePyramid'
  | 'coneHemisphere'
  | 'prismCylinderHole';

export interface SolidFigure {
  type: 'solid';
  shape: SolidShape;
  /** Free-form labels keyed by dimension name: r, d, h, s, l, w, b, hTri, h2 ... */
  labels: Partial<Record<string, string>>;
  /** Show the slant height / height lines. */
  show?: Array<'h' | 's' | 'r' | 'd'>;
}

export interface PlanePoint {
  x: number;
  y: number;
  label?: string;
  color?: 'brand' | 'accent' | 'muted';
  open?: boolean;
}

export interface PlaneLine {
  /** Either a line through two points or Ax+By+C=0. */
  through?: [[number, number], [number, number]];
  line?: Line;
  label?: string;
  color?: 'brand' | 'accent' | 'muted';
  dashed?: boolean;
}

export interface PlaneSegment {
  from: [number, number];
  to: [number, number];
  color?: 'brand' | 'accent' | 'muted';
  dashed?: boolean;
  /** Arrowheads at the ends (for continuing graphs). */
  arrowEnd?: boolean;
  arrowStart?: boolean;
  closedStart?: boolean;
  closedEnd?: boolean;
  openStart?: boolean;
  openEnd?: boolean;
}

export interface PlaneFigure {
  type: 'plane';
  grid: GridSpec;
  points?: PlanePoint[];
  lines?: PlaneLine[];
  segments?: PlaneSegment[];
  /** Polyline graphs (e.g. distance-time). */
  polylines?: Array<{ points: Array<[number, number]>; color?: 'brand' | 'accent' | 'muted'; label?: string; fill?: boolean }>;
  /** Show rise/run triangle between two points. */
  riseRun?: { from: [number, number]; to: [number, number] };
  /** Hide numeric tick labels (for "describe the graph" questions). */
  hideTickLabels?: boolean;
  /** Hide the axes (diagrams drawn on the plane). Planes without grid lines and tick labels hide them automatically. */
  hideAxes?: boolean;
  /** Label segments A, B, C ... at their midpoints. */
  segmentLabels?: string[];
  /** Show "Diagram not to scale" under the figure (lengths and angles are given as labels). */
  notToScale?: boolean;
  caption?: string;
}

export interface NumberLineFigure {
  type: 'numberLine';
  min: number;
  max: number;
  step?: number;
  points?: Array<{ value: number; label: string }>;
  ticksLabelled?: boolean;
}

export interface RulerFigure {
  type: 'ruler';
  system: 'metric' | 'imperial';
  /** Ruler length in cm (metric) or inches (imperial). */
  length: number;
  /** Object start and end in the same units. */
  start: number;
  end: number;
  /** Imperial division (8 or 16). */
  division?: 8 | 16;
}

export interface CaliperFigure {
  type: 'caliper';
  /** Reading in mm, to 0.1 mm. */
  reading: number;
}

export interface AreaModelFigure {
  type: 'areaModel';
  /** Terms along the top and side (LaTeX). */
  top: string[];
  side: string[];
  /** Cell contents (LaTeX), row-major; use '?' to hide. */
  cells?: string[][];
}

export interface ArrowDiagramFigure {
  type: 'arrowDiagram';
  leftTitle?: string;
  rightTitle?: string;
  left: string[];
  right: string[];
  arrows: Array<[number, number]>;
}

/** A vertical bar graph with one bar per category. */
export interface BarChartFigure {
  type: 'barChart';
  categories: string[];
  values: number[];
  /** Title of the value (vertical) axis, e.g. "Number of students". */
  valueLabel?: string;
  /** Title of the category (horizontal) axis. */
  categoryLabel?: string;
  /** Top of the value axis and the gap between grid lines; chosen from the data when omitted. */
  max?: number;
  step?: number;
  /** Print each bar's value above it. Leave off when the question asks students to read the graph. */
  showValues?: boolean;
  caption?: string;
}

/**
 * A structure built from unit cubes, drawn in isometric view from the front right.
 * `heights[row][col]` is the number of cubes stacked on that square; row 0 is at the back and the
 * last row is at the front, column 0 is on the left.
 */
export interface CubesFigure {
  type: 'cubes';
  heights: number[][];
  /** Draw an arrow marking the front (for top, front and side view questions). */
  showFront?: boolean;
  caption?: string;
}

/** A circle (pie) graph with at most 6 slices, drawn clockwise from the top in the given order. */
export interface CircleGraphFigure {
  type: 'circleGraph';
  slices: Array<{ label: string; value: number }>;
  /** What the legend shows after each label: the slice's percent of the whole (default), its value, or nothing. */
  show?: 'percent' | 'value' | 'none';
  caption?: string;
}

export interface TableFigure {
  type: 'table';
  headers: string[];
  rows: string[][];
  /** Render horizontally (x row, y row). */
  horizontal?: boolean;
}

// ---------------------------------------------------------------------------
// Curriculum structure
// ---------------------------------------------------------------------------

export interface Outcome {
  code: string; // e.g. "M1"
  strand: string; // e.g. "Measurement"
  text: string;
}

export interface SkillDef {
  id: string;
  name: string;
  /** One-sentence description of what mastery looks like. */
  description: string;
  outcomes: string[];
  lessonId: string;
  /** Typical question format, used for BKT guess parameter. */
  format: 'mc' | 'free';
  generate: (seed: number, difficulty: Difficulty) => Item;
  /** Calculator expected. */
  calculator?: boolean;
}

/** A skill without its question generator: what the app needs before the course's generators load. */
export type SkillInfo = Omit<SkillDef, 'generate'>;

export interface LessonMeta {
  id: string;
  unitId: string;
  number: string; // "1.3"
  title: string;
  outcomes: string[];
  skills: string[];
  objectives: string[];
  minutes: number;
  vocabulary?: string[];
}

export interface UnitMeta {
  id: string;
  number: number;
  title: string;
  description: string;
  outcomes: string[];
  lessons: string[];
  color: string; // tailwind hue name for decoration
}

export interface CourseMeta {
  id: string;
  title: string;
  shortTitle: string;
  grade: number;
  subject: string;
  description: string;
  outcomes: Outcome[];
  units: UnitMeta[];
  lessons: LessonMeta[];
  /** Still being written: it runs everywhere but the course pickers (LISTED_COURSES). */
  draft?: boolean;
}
