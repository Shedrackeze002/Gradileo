/** The demo backend's database: a JSON document persisted in localStorage. */
import type {
  Announcement,
  AppNotification,
  Assignment,
  Board,
  ClassRoom,
  CourseRequest,
  Insight,
  ReportCard,
  LessonEdit,
  LessonPrefs,
  LiveAnswer,
  LiveQuestion,
  Presentation,
  ClassQuestion,
  PlatformSettings,
  Profile,
  Publication,
  Resource,
  SkillEvent,
  SkillMastery,
  Submission,
} from '../types.ts';
import { getItem, removeItem, setItem } from '@/lib/storage.ts';
import type { DemoForumPost } from './forum.ts';

export interface DemoUser extends Profile {
  password: string;
  lastSignInAt?: string | null;
}

export interface DemoAuditRow {
  id: string;
  createdAt: string;
  action: string;
  actorId: string | null;
  targetUser: string | null;
  details: Record<string, unknown>;
}

export interface DemoDB {
  version: number;
  createdAt: string;
  users: DemoUser[];
  classes: ClassRoom[];
  enrollments: Array<{ classId: string; studentId: string; joinedAt: string }>;
  publications: Publication[];
  resources: Resource[];
  assignments: Assignment[];
  submissions: Submission[];
  mastery: SkillMastery[];
  events: SkillEvent[];
  notifications: AppNotification[];
  insights: Insight[];
  announcements: Announcement[];
  reminderLog: string[];
  aiKey: string | null;
  aiModel: string | null;
  /** Platform administration (added later; older saved demos may lack these). */
  settings?: PlatformSettings;
  audit?: DemoAuditRow[];
  /** Presenting (added later; older saved demos may lack these). */
  boards?: Board[];
  lessonPrefs?: LessonPrefs[];
  liveQuestions?: LiveQuestion[];
  liveAnswers?: LiveAnswer[];
  /** Students' questions during a presentation (added later). */
  presentations?: Array<Presentation & { seenAt: string; endedAt: string | null }>;
  classQuestions?: Array<Omit<ClassQuestion, 'studentName'> & { decidedAt: string | null }>;
  /** Requests to join classes that ask for approval (added later). */
  joinRequests?: DemoJoinRequest[];
  /** Requests for courses or topics Gradileo does not have yet (added later). */
  courseRequests?: Array<Omit<CourseRequest, 'requester'> & { requesterId: string }>;
  /** Teachers' suggested lesson edits (added later). */
  lessonEdits?: Array<Omit<LessonEdit, 'author'> & { authorId: string }>;
  /** Explainer videos' YouTube ids, by video id (added later). */
  videoLinks?: Record<string, string>;
  /** Students' report cards (added later). */
  reportCards?: ReportCard[];
  /** Class forums' questions and replies (added later). */
  forumPosts?: DemoForumPost[];
}

export interface DemoJoinRequest {
  id: string;
  classId: string;
  studentId: string;
  status: 'pending' | 'approved' | 'declined';
  message: string | null;
  createdAt: string;
  decidedAt: string | null;
  /** Approved as this student already in the class: the requesting device takes over that account. */
  sameAs?: string | null;
}

export const DB_KEY = 'educore-demo-db-v1';
export const DB_VERSION = 1;

export function loadDb(): DemoDB | null {
  const raw = getItem(DB_KEY);
  if (!raw) return null;
  try {
    const db = JSON.parse(raw) as DemoDB;
    if (db.version !== DB_VERSION) return null;
    // The demo accounts moved to gradileo.demo when EduCore became Gradileo; keep earlier demo data.
    for (const u of db.users) if (u.email?.endsWith('@educore.demo')) u.email = u.email.replace(/@educore\.demo$/, '@gradileo.demo');
    return db;
  } catch {
    return null;
  }
}

export function saveDb(db: DemoDB): void {
  // Keep storage bounded: trim old analytics events if the document grows large.
  let raw = JSON.stringify(db);
  if (raw.length > 3_500_000) {
    db.events = db.events.slice(-4000).map((e) => ({ ...e, prompt: e.correct ? undefined : e.prompt }));
    db.notifications = db.notifications.slice(-400);
    raw = JSON.stringify(db);
  }
  setItem(DB_KEY, raw);
}

export function clearDb(): void {
  removeItem(DB_KEY);
}
