/**
 * Where a learner goes to school: their country or curriculum, and their year in that system's
 * own words (Year 10, SS 1, Form 3, MYP 5). Each year is matched to Gradileo's level, the grade a
 * learner of the same age is in from Grade 1 at age six, which is how the courses are numbered.
 * "Find your course" asks for these first; the curriculum is saved on the learner's profile.
 */

export interface SchoolYear {
  /** As the system names it: "Year 10", "SS 1", "Form 3". */
  label: string;
  /** Gradileo's level for the same age, 5 to 12. */
  grade: number;
}

export interface Curriculum {
  id: string;
  /** The country or curriculum as the learner picks it. */
  name: string;
  /** The question that asks for the year. */
  question: string;
  years: SchoolYear[];
  /** The levels already have this system's names (Grade 10 is Grade 10), so nothing needs translating. */
  sameAsGrades?: boolean;
}

const range = (from: number, to: number) => Array.from({ length: to - from + 1 }, (_, i) => from + i);
/** Years numbered as Gradileo's grades plus an offset: England's Year 11 is Grade 10. */
const numbered = (word: string, from: number, to: number, offset: number): SchoolYear[] => range(from, to).map((n) => ({ label: `${word} ${n}`, grade: n - offset }));
const grades = (word = 'Grade') => numbered(word, 5, 12, 0);

export const CURRICULA: Curriculum[] = [
  { id: 'us', name: 'United States', question: 'Which grade are you in?', years: grades(), sameAsGrades: true },
  { id: 'uk', name: 'United Kingdom: England and Wales', question: 'Which year are you in?', years: numbered('Year', 6, 13, 1) },
  { id: 'scotland', name: 'United Kingdom: Scotland', question: 'Which year are you in?', years: [{ label: 'P6', grade: 5 }, { label: 'P7', grade: 6 }, ...numbered('S', 1, 6, -6).map((y) => ({ ...y, label: y.label.replace(' ', '') }))] },
  { id: 'ni', name: 'United Kingdom: Northern Ireland', question: 'Which year are you in?', years: numbered('Year', 7, 14, 2) },
  { id: 'ca', name: 'Canada', question: 'Which grade are you in?', years: grades(), sameAsGrades: true },
  {
    id: 'ng',
    name: 'Nigeria',
    question: 'Which class are you in?',
    years: [{ label: 'Primary 5', grade: 5 }, { label: 'Primary 6', grade: 6 }, ...numbered('JSS', 1, 3, -6), ...numbered('SS', 1, 3, -9)],
  },
  {
    id: 'gh',
    name: 'Ghana',
    question: 'Which class are you in?',
    years: [{ label: 'Basic 5', grade: 5 }, { label: 'Basic 6', grade: 6 }, ...numbered('JHS', 1, 3, -6), ...numbered('SHS', 1, 3, -9)],
  },
  { id: 'ke', name: 'Kenya', question: 'Which grade or form are you in?', years: [...grades(), ...numbered('Form', 1, 4, -8)], sameAsGrades: true },
  { id: 'za', name: 'South Africa', question: 'Which grade are you in?', years: grades(), sameAsGrades: true },
  { id: 'in', name: 'India', question: 'Which class are you in?', years: grades('Class') },
  { id: 'au', name: 'Australia', question: 'Which year are you in?', years: grades('Year') },
  { id: 'nz', name: 'New Zealand', question: 'Which year are you in?', years: numbered('Year', 6, 13, 1) },
  {
    id: 'ie',
    name: 'Ireland',
    question: 'Which class or year are you in?',
    years: [
      { label: '5th Class', grade: 5 },
      { label: '6th Class', grade: 6 },
      { label: '1st Year', grade: 7 },
      { label: '2nd Year', grade: 8 },
      { label: '3rd Year', grade: 9 },
      { label: 'Transition Year', grade: 10 },
      { label: '5th Year', grade: 11 },
      { label: '6th Year', grade: 12 },
    ],
  },
  { id: 'ib', name: 'International Baccalaureate (IB)', question: 'Which year of the IB are you in?', years: [...numbered('MYP', 1, 5, -5), ...numbered('DP', 1, 2, -10)] },
  { id: 'cambridge', name: 'Cambridge International (IGCSE, A level)', question: 'Which year are you in?', years: numbered('Year', 6, 13, 1) },
  { id: 'other', name: 'Somewhere else', question: 'How old were you at the start of this school year?', years: range(10, 17).map((age) => ({ label: `${age}`, grade: age - 5 })) },
];

const BY_ID = new Map(CURRICULA.map((c) => [c.id, c]));

export function curriculumById(id: string | null | undefined): Curriculum | undefined {
  return id ? BY_ID.get(id) : undefined;
}

/** The years a learner can choose for a subject whose courses start at `from` (5 for mathematics, 9 otherwise). */
export function yearsFor(c: Curriculum, from: number): SchoolYear[] {
  return c.years.filter((y) => y.grade >= from && y.grade <= 12);
}

/**
 * Where a level sits in a learner's own system, for a course recommended to them: "Year 11",
 * "SS 1", "age 15". Undefined when the system already uses Gradileo's grades, so there is nothing
 * to translate.
 */
export function levelIn(curriculumId: string | null | undefined, grade: number): string | undefined {
  const c = curriculumById(curriculumId);
  if (!c || c.sameAsGrades) return undefined;
  const y = c.years.find((y) => y.grade === grade);
  if (!y) return undefined;
  return c.id === 'other' ? `age ${y.label}` : y.label;
}

/** Each IANA time zone's country, for guessing the learner's curriculum before they choose. */
const ZONES: Array<[RegExp, string]> = [
  [/^Europe\/London$/, 'uk'],
  [/^Europe\/(Dublin)$/, 'ie'],
  [/^America\/(Toronto|Vancouver|Edmonton|Winnipeg|Regina|Halifax|St_Johns|Moncton|Whitehorse|Yellowknife|Iqaluit)$/, 'ca'],
  [/^(America\/(New_York|Chicago|Denver|Phoenix|Los_Angeles|Anchorage|Detroit|Boise|Indiana\/.*|Kentucky\/.*)|Pacific\/Honolulu)$/, 'us'],
  [/^Africa\/Lagos$/, 'ng'],
  [/^Africa\/Accra$/, 'gh'],
  [/^Africa\/Nairobi$/, 'ke'],
  [/^Africa\/Johannesburg$/, 'za'],
  [/^Asia\/(Kolkata|Calcutta)$/, 'in'],
  [/^Australia\//, 'au'],
  [/^Pacific\/Auckland$/, 'nz'],
];

/** A first guess at the learner's curriculum from their time zone; they can change it. */
export function guessCurriculum(timeZone: string | undefined): string | undefined {
  if (!timeZone) return undefined;
  return ZONES.find(([re]) => re.test(timeZone))?.[1];
}
