/** Shared types for the AI teaching assistant (works in the browser and in Deno). */

export type ActionType = 'assign_practice' | 'assign_review' | 'reteach_lesson' | 'challenge' | 'check_in';

export interface ProposedAction {
  id: string;
  type: ActionType;
  title: string;
  skillIds: string[];
  studentIds: string[];
  lessonId?: string;
  questionCount?: number;
  dueInDays?: number;
  rationale: string;
  status: 'proposed' | 'accepted' | 'dismissed' | 'done';
}

export interface InsightItem {
  skillId?: string;
  text: string;
  evidence?: string;
}

export interface InsightGroup {
  name: string;
  studentIds: string[];
  skillIds: string[];
  rationale: string;
}

export interface InsightData {
  scope: 'student' | 'class';
  headline: string;
  summary: string;
  riskLevel: 'on_track' | 'watch' | 'at_risk';
  strengths: InsightItem[];
  weaknesses: InsightItem[];
  misconceptions: InsightItem[];
  growth: InsightItem[];
  nextSteps: Array<{ text: string; actionId?: string }>;
  actions: ProposedAction[];
  groups?: InsightGroup[];
  /** Encouraging, student-facing message (student scope). */
  studentNote?: string;
}

export interface SkillSnapshot {
  skillId: string;
  name: string;
  outcomes: string[];
  lessonId: string;
  level: string;
  pKnown: number;
  attempts: number;
  correct: number;
  lastPracticedAt: string | null;
}

export interface ErrorSample {
  skillId: string;
  prompt: string;
  studentAnswer: string;
  correctAnswer: string;
  at: string;
}

export interface AssignmentSnapshot {
  id: string;
  title: string;
  type: string;
  dueAt: string | null;
  status: 'submitted' | 'late' | 'missing' | 'in_progress' | 'not_started' | 'upcoming';
  percent: number | null;
}

export interface StudentContext {
  student: { id: string; name: string };
  courseTitle: string;
  /** The course's subject ("Mathematics", "Chemistry"); mathematics when missing. */
  subject?: string;
  taughtLessons: Array<{ id: string; title: string }>;
  skills: SkillSnapshot[];
  recentErrors: ErrorSample[];
  assignments: AssignmentSnapshot[];
  trend: { last7Accuracy: number | null; prev7Accuracy: number | null; hintRate: number | null; questionsLast7: number };
  coursePercent: number;
}

export interface ClassSkillAggregate {
  skillId: string;
  name: string;
  lessonId: string;
  attemptedBy: number;
  mastered: number;
  proficientPlus: number;
  struggling: string[];
  avgPKnown: number;
}

export interface ClassStudentSummary {
  id: string;
  name: string;
  coursePercent: number;
  accuracy7: number | null;
  missing: number;
  late: number;
  weakSkills: string[];
  strongSkills: string[];
}

export interface ClassContext {
  className: string;
  courseTitle: string;
  /** The course's subject ("Mathematics", "Chemistry"); mathematics when missing. */
  subject?: string;
  studentCount: number;
  taughtLessons: Array<{ id: string; title: string }>;
  skills: ClassSkillAggregate[];
  students: ClassStudentSummary[];
  recentErrors: Array<ErrorSample & { studentId: string }>;
  upcoming: Array<{ title: string; dueAt: string | null; submitted: number; total: number }>;
}
