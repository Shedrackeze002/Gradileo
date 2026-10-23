import { useEffect, useState, type ReactNode } from 'react';
import { Link, NavLink, Outlet, useLocation, useMatch, useNavigate } from 'react-router-dom';
import {
  BarChart3,
  BookOpen,
  ChevronsUpDown,
  Clapperboard,
  ClipboardList,
  Compass,
  FilePenLine,
  FileText,
  GraduationCap,
  Grid3x3,
  Home,
  Inbox,
  LayoutDashboard,
  LogOut,
  MessagesSquare,
  Menu as MenuIcon,
  Monitor,
  Moon,
  Plus,
  RefreshCcw,
  School,
  ScrollText,
  Settings,
  ShieldCheck,
  Sparkles,
  Sun,
  Table2,
  Target,
  UserCircle2,
  Users,
  X,
} from 'lucide-react';
import { useAuth } from '@/features/auth/AuthProvider.tsx';
import { useClasses } from '@/data/hooks.ts';
import { getCourse } from '@engine/curriculum/index.ts';
import { demoApi, setDemoBackend } from '@/data/index.ts';
import { SUPABASE_CONFIGURED } from '@/config.ts';
import { Avatar, Badge, Menu, MenuItem } from '@/components/ui/index.ts';
import { useTheme } from '@/lib/theme.ts';
import { cn } from '@/lib/cn.ts';
import { setItem } from '@/lib/storage.ts';

const LAST_CLASS_KEY = 'educore-last-class';
import { NotificationBell, NotificationsBridge } from './NotificationBell.tsx';
import { LiveBanner } from '@/features/live/LiveBanner.tsx';
import { PresentingBanner } from '@/features/live/AskQuestion.tsx';
import { chooseStudentClass, studentClassName, useStudentClass } from '@/features/shared/useStudentClass.ts';
import { Logo } from './Logo.tsx';

interface NavItem {
  to: string;
  label: string;
  icon: typeof Home;
  end?: boolean;
}

function teacherNav(classId: string | undefined): NavItem[] {
  if (!classId) return [{ to: '/t', label: 'My classes', icon: LayoutDashboard, end: true }];
  const b = `/t/c/${classId}`;
  return [
    { to: b, label: 'Overview', icon: LayoutDashboard, end: true },
    { to: `${b}/curriculum`, label: 'Curriculum', icon: BookOpen },
    { to: `${b}/assignments`, label: 'Assignments', icon: ClipboardList },
    { to: `${b}/students`, label: 'Students', icon: Users },
    { to: `${b}/gradebook`, label: 'Gradebook', icon: Table2 },
    { to: `${b}/mastery`, label: 'Mastery map', icon: Grid3x3 },
    { to: `${b}/insights`, label: 'AI insights', icon: Sparkles },
    { to: `${b}/forum`, label: 'Forum', icon: MessagesSquare },
    { to: `${b}/reports`, label: 'Report cards', icon: FileText },
    { to: `${b}/settings`, label: 'Class settings', icon: Settings },
  ];
}

const ADMIN_NAV: NavItem[] = [
  { to: '/admin', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/admin/users', label: 'Users', icon: Users },
  { to: '/admin/classes', label: 'Classes', icon: School },
  { to: '/admin/requests', label: 'Course requests', icon: Inbox },
  { to: '/admin/edits', label: 'Lesson edits', icon: FilePenLine },
  { to: '/admin/videos', label: 'Videos', icon: Clapperboard },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
  { to: '/admin/audit', label: 'Audit log', icon: ScrollText },
];

type ShellRole = 'teacher' | 'student' | 'admin';

const homeFor = (role: ShellRole) => (role === 'student' ? '/s' : role === 'admin' ? '/admin' : '/t');

const STUDENT_NAV: NavItem[] = [
  { to: '/s', label: 'Home', icon: Home, end: true },
  { to: '/s/learn', label: 'Learn', icon: BookOpen },
  { to: '/s/work', label: 'Classwork', icon: ClipboardList },
  { to: '/s/forum', label: 'Forum', icon: MessagesSquare },
  { to: '/s/progress', label: 'Progress', icon: Target },
];

export function AppShell({ role }: { role: ShellRole }) {
  const { user, signOut } = useAuth();
  const match = useMatch('/t/c/:classId/*');
  const classId = role === 'teacher' ? match?.params.classId : undefined;
  const nav = role === 'teacher' ? teacherNav(classId) : role === 'admin' ? ADMIN_NAV : STUDENT_NAV;
  const isAdmin = !!user?.platformAdmin && !user.disabled;
  // A student who joined with the class link has no password: signing out leaves this device.
  const nameOnlySignOut = async () => {
    if (window.confirm(`Sign ${user?.fullName ?? 'this student'} out of this device? To come back, open the class link and type your name again; your teacher lets you back in.`)) await signOut();
  };
  const [drawer, setDrawer] = useState(false);
  const loc = useLocation();
  useEffect(() => setDrawer(false), [loc.pathname]);
  useEffect(() => {
    if (classId) setItem(LAST_CLASS_KEY, classId);
  }, [classId]);

  return (
    <div className="min-h-screen bg-canvas">
      <NotificationsBridge />
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-line bg-surface lg:flex print:!hidden">
        <Sidebar role={role} classId={classId} nav={nav} isAdmin={isAdmin} />
      </aside>
      {/* Mobile drawer */}
      {drawer && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setDrawer(false)} />
          <aside className="absolute inset-y-0 left-0 flex w-72 animate-slide-up flex-col bg-surface shadow-pop">
            <button type="button" className="absolute right-3 top-3 rounded-lg p-1.5 text-ink-3 hover:bg-surface-2" onClick={() => setDrawer(false)} aria-label="Close menu">
              <X className="h-5 w-5" />
            </button>
            <Sidebar role={role} classId={classId} nav={nav} isAdmin={isAdmin} />
          </aside>
        </div>
      )}
      <div className="lg:pl-64 print:!pl-0">
        <header className="sticky top-0 z-20 border-b border-line bg-canvas/85 backdrop-blur print:hidden">
          <div className="mx-auto flex h-16 max-w-7xl items-center gap-2 px-4 sm:px-6">
            {role !== 'student' && (
              <button type="button" className="rounded-xl p-2 text-ink-2 hover:bg-surface-2 lg:hidden" onClick={() => setDrawer(true)} aria-label="Open menu">
                <MenuIcon className="h-5 w-5" />
              </button>
            )}
            <Link to={homeFor(role)} className="lg:hidden">
              <Logo compact />
            </Link>
            {role === 'student' && (
              <div className="min-w-0 lg:hidden">
                <StudentClassBadge compact />
              </div>
            )}
            <div className="flex-1" />
            {demoApi() && <Badge tone="warn" className="hidden sm:inline-flex">Demo mode</Badge>}
            <NotificationBell />
            <UserMenu name={user?.fullName ?? ''} color={user?.avatarColor} email={user?.email ?? ''} onSignOut={user?.nameOnly ? nameOnlySignOut : signOut} role={role} isAdmin={isAdmin} />
          </div>
        </header>
        <main className={cn('mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 print:max-w-none print:p-0', role === 'student' && 'pb-28 lg:pb-8')}>
          {role === 'student' && (
            <div className="print:hidden">
              <LiveBanner />
              <PresentingBanner />
            </div>
          )}
          <Outlet />
        </main>
      </div>
      {/* Student bottom tabs on mobile */}
      {role === 'student' && (
        <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden print:hidden" aria-label="Main">
          <div className="grid grid-cols-5">
            {STUDENT_NAV.map((n) => (
              <NavLink key={n.to} to={n.to} end={n.end} className={({ isActive }) => cn('flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-medium', isActive ? 'text-brand' : 'text-ink-3')}>
                <n.icon className="h-5 w-5" />
                {n.label}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </div>
  );
}

function Sidebar({ role, classId, nav, isAdmin }: { role: ShellRole; classId?: string; nav: NavItem[]; isAdmin: boolean }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center px-5">
        <Link to={homeFor(role)}>
          <Logo />
        </Link>
      </div>
      {role === 'teacher' && <ClassSwitcher classId={classId} />}
      {role === 'student' && <StudentClassBadge />}
      {role === 'admin' && <AdminBadge />}
      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-3" aria-label="Main">
        {nav.map((n) => (
          <NavLink
            key={n.to}
            to={n.to}
            end={n.end}
            className={({ isActive }) =>
              cn('flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] font-medium transition', isActive ? 'bg-brand-50 text-brand-800' : 'text-ink-2 hover:bg-surface-2 hover:text-ink')
            }
          >
            {({ isActive }) => (
              <>
                <n.icon className={cn('h-[18px] w-[18px]', isActive ? 'text-brand' : 'text-ink-3')} />
                {n.label}
              </>
            )}
          </NavLink>
        ))}
      </nav>
      {role === 'teacher' && isAdmin && (
        <div className="px-3 pb-3">
          <Link to="/admin" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] font-medium text-ink-2 transition hover:bg-surface-2 hover:text-ink">
            <ShieldCheck className="h-[18px] w-[18px] text-ink-3" />
            Admin console
          </Link>
        </div>
      )}
      <div className="border-t border-line p-4 text-xs text-ink-3">
        <div className="flex items-center gap-2">
          {role === 'admin' ? <ShieldCheck className="h-4 w-4" /> : <GraduationCap className="h-4 w-4" />}
          {role === 'admin' ? 'Gradileo platform administration' : <CourseLabel classId={classId} role={role} />}
        </div>
      </div>
    </div>
  );
}

function ClassSwitcher({ classId }: { classId?: string }) {
  const { data: classes = [] } = useClasses();
  const navigate = useNavigate();
  const current = classes.find((c) => c.id === classId);
  return (
    <div className="px-3">
      <Menu
        align="left"
        className="w-[232px]"
        trigger={() => (
          <button type="button" className="flex w-full items-center gap-3 rounded-xl border border-line bg-surface-2/60 px-3 py-2.5 text-left hover:bg-surface-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-sm font-bold text-brand-ink">{(current?.name ?? 'C').slice(0, 1)}</span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold text-ink">{current ? current.name : 'Choose a class'}</span>
              <span className="block truncate text-xs text-ink-3">{current?.section ?? `${classes.length} class${classes.length === 1 ? '' : 'es'}`}</span>
            </span>
            <ChevronsUpDown className="h-4 w-4 text-ink-3" />
          </button>
        )}
      >
        {(close) => (
          <div>
            {classes.map((c) => (
              <MenuItem
                key={c.id}
                onClick={() => {
                  close();
                  navigate(`/t/c/${c.id}`);
                }}
              >
                <span className="font-medium">{c.name}</span>
                {c.section && <span className="ml-1 text-ink-3">· {c.section}</span>}
              </MenuItem>
            ))}
            <div className="my-1 border-t border-line" />
            <MenuItem
              icon={<LayoutDashboard className="h-4 w-4" />}
              onClick={() => {
                close();
                navigate('/t?all');
              }}
            >
              All classes
            </MenuItem>
            <MenuItem
              icon={<Plus className="h-4 w-4" />}
              onClick={() => {
                close();
                navigate('/t/new-class');
              }}
            >
              New class
            </MenuItem>
          </div>
        )}
      </Menu>
    </div>
  );
}

/** The current class's course (teachers) or the student's class course. */
function CourseLabel({ classId, role }: { classId?: string; role: ShellRole }) {
  const { data: classes = [] } = useClasses();
  const student = useStudentClass().cls;
  const cls = role === 'student' ? student : (classes.find((c) => c.id === classId) ?? (classes.length === 1 ? classes[0] : undefined));
  return <>{(cls && getCourse(cls.courseId)?.title) ?? 'Gradileo'}</>;
}

function AdminBadge() {
  return (
    <div className="px-3">
      <div className="flex items-center gap-3 rounded-xl border border-line bg-surface-2/60 px-3 py-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-brand-ink">
          <ShieldCheck className="h-5 w-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-semibold text-ink">Admin console</span>
          <Link to="/t?all" className="block truncate text-xs text-ink-3 hover:text-brand">
            Back to my classes
          </Link>
        </span>
      </div>
    </div>
  );
}

function StudentClassBadge({ compact = false }: { compact?: boolean }) {
  const { cls, classes } = useStudentClass();
  const navigate = useNavigate();
  if (!cls && compact) return null;
  if (!cls)
    return (
      <div className="space-y-1 px-3">
        <Link to="/s/welcome" className="flex items-center gap-2 rounded-xl border border-dashed border-line-strong px-3 py-2.5 text-sm font-medium text-brand hover:bg-brand-50">
          <Compass className="h-4 w-4" /> Find my course
        </Link>
        <Link to="/s/join" className="flex items-center gap-2 rounded-xl px-3 py-1.5 text-sm font-medium text-ink-2 hover:bg-surface-2 hover:text-ink">
          <Plus className="h-4 w-4" /> Join a class
        </Link>
      </div>
    );
  const name = studentClassName(cls);
  return (
    <div className={compact ? 'min-w-0' : 'px-3'}>
      <Menu
        align="left"
        className="w-[232px]"
        trigger={() =>
          compact ? (
            <button type="button" className="flex max-w-[11rem] items-center gap-1.5 rounded-xl border border-line bg-surface px-2.5 py-1.5 text-sm font-semibold text-ink" aria-label="Switch course">
              <span className="truncate">{name.title}</span>
              <ChevronsUpDown className="h-3.5 w-3.5 shrink-0 text-ink-3" />
            </button>
          ) : (
            <button type="button" className="flex w-full items-center gap-3 rounded-xl border border-line bg-surface-2/60 px-3 py-2.5 text-left hover:bg-surface-2" aria-label="Switch course">
              <span className="min-w-0 flex-1">
                <span className="block text-xs text-ink-3">{cls.kind === 'self' ? 'Studying' : 'Your class'}</span>
                <span className="block truncate text-sm font-semibold text-ink">{name.title}</span>
                {name.detail && <span className="block truncate text-xs text-ink-3">{name.detail}</span>}
              </span>
              <ChevronsUpDown className="h-4 w-4 shrink-0 text-ink-3" />
            </button>
          )
        }
      >
        {(close) => (
          <div>
            {classes.map((c) => {
              const n = studentClassName(c);
              return (
                <MenuItem
                  key={c.id}
                  onClick={() => {
                    close();
                    chooseStudentClass(c.id);
                    navigate('/s');
                  }}
                >
                  <span className="min-w-0">
                    <span className={cn('block truncate font-medium', c.id === cls.id && 'text-brand-800')}>{n.title}</span>
                    {n.detail && <span className="block truncate text-xs text-ink-3">{n.detail}</span>}
                  </span>
                </MenuItem>
              );
            })}
            <div className="my-1 border-t border-line" />
            <MenuItem
              icon={<Compass className="h-4 w-4" />}
              onClick={() => {
                close();
                navigate('/s/welcome');
              }}
            >
              Add a course
            </MenuItem>
            <MenuItem
              icon={<Plus className="h-4 w-4" />}
              onClick={() => {
                close();
                navigate('/s/join');
              }}
            >
              Join a teacher’s class
            </MenuItem>
          </div>
        )}
      </Menu>
    </div>
  );
}

function UserMenu({ name, color, email, onSignOut, role, isAdmin }: { name: string; color?: string; email: string; onSignOut: () => Promise<void>; role: ShellRole; isAdmin: boolean }) {
  const [theme, setTheme] = useTheme();
  const navigate = useNavigate();
  const demo = demoApi();
  return (
    <Menu
      trigger={() => (
        <button type="button" className="flex items-center gap-2 rounded-xl p-1 pr-2 hover:bg-surface-2" aria-label="Account menu">
          <Avatar name={name || '?'} color={color} size={32} />
          <span className="hidden max-w-[140px] truncate text-sm font-medium text-ink md:inline">{name}</span>
        </button>
      )}
    >
      {(close) => (
        <div>
          <div className="px-2.5 py-2">
            <div className="truncate text-sm font-semibold">{name}</div>
            <div className="truncate text-xs text-ink-3">{email}</div>
          </div>
          <div className="my-1 border-t border-line" />
          <MenuItem
            icon={<UserCircle2 className="h-4 w-4" />}
            onClick={() => {
              close();
              navigate('/settings');
            }}
          >
            Profile & settings
          </MenuItem>
          {isAdmin && (
            <MenuItem
              icon={role === 'admin' ? <LayoutDashboard className="h-4 w-4" /> : <ShieldCheck className="h-4 w-4" />}
              onClick={() => {
                close();
                navigate(role === 'admin' ? '/t?all' : '/admin');
              }}
            >
              {role === 'admin' ? 'My classes' : 'Admin console'}
            </MenuItem>
          )}
          <div className="flex items-center gap-1 px-2.5 py-2">
            {(
              [
                ['light', Sun],
                ['dark', Moon],
                ['system', Monitor],
              ] as const
            ).map(([v, Icon]) => (
              <button
                key={v}
                type="button"
                onClick={() => setTheme(v)}
                className={cn('flex flex-1 items-center justify-center gap-1 rounded-lg py-1.5 text-xs capitalize', theme === v ? 'bg-brand-50 font-semibold text-brand-800' : 'text-ink-3 hover:bg-surface-2')}
              >
                <Icon className="h-3.5 w-3.5" />
                {v}
              </button>
            ))}
          </div>
          {demo && (
            <MenuItem
              icon={<RefreshCcw className="h-4 w-4" />}
              onClick={async () => {
                close();
                if (window.confirm('Reset the demo? All demo changes in this browser will be replaced with the sample class.')) {
                  await demo.reset();
                  navigate('/login');
                }
              }}
            >
              Reset demo data
            </MenuItem>
          )}
          {demo && SUPABASE_CONFIGURED && (
            <MenuItem icon={<BarChart3 className="h-4 w-4" />} onClick={() => setDemoBackend(false)}>
              Leave demo
            </MenuItem>
          )}
          <div className="my-1 border-t border-line" />
          <MenuItem
            danger
            icon={<LogOut className="h-4 w-4" />}
            onClick={async () => {
              close();
              await onSignOut();
              navigate('/login');
            }}
          >
            Sign out
          </MenuItem>
        </div>
      )}
    </Menu>
  );
}

export function FocusShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-canvas">
      <NotificationsBridge />
      {children}
    </div>
  );
}
