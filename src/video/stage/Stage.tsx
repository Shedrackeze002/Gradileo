/** One frame of an explainer video, drawn from the frame state; and the video's thumbnail. */
import { BRAND, type DiagramEl, type El, type Explainer, type ScreenEl, type TriangleEl, type SimilarEl } from '../script.ts';
import type { ElState, FrameState } from '../timeline.ts';
import { DiagramView } from './Diagram.tsx';
import { BulletsView, CalcView, CalloutView, MathView, TableView, TextView, TitleView, TryView } from './elements.tsx';
import { ScreenView } from './Screen.tsx';
import { rich, TONES } from './tex.ts';
import { SimilarView, TriangleView } from './Triangle.tsx';

function Logo({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <rect width="64" height="64" rx="16" fill="#6a43e3" />
      <path d="M18 42 L30 22 L36 32 L42 26 L48 42" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="30" cy="22" r="3.5" fill="#bcadff" />
    </svg>
  );
}

type Area = 'left' | 'right' | 'main';

/** Width of a split scene's left column, unless the scene sets its own. */
const LEFT = 540;
/** The stage's content width (1280 less the margins), and the gap between split columns. */
const BODY = 1136;
const GAP = 48;

function ElView({ el, st, area, crowded, leftWidth }: { el: El; st: ElState | undefined; area: Area; crowded: boolean; leftWidth: number }) {
  const center = area !== 'right';
  // A figure fills its column: the left or right of a split scene, or the middle of a centred one.
  const fig =
    area === 'main' ? { w: 1100, h: crowded ? 340 : 440 } : { w: area === 'left' ? leftWidth : BODY - GAP - leftWidth, h: crowded ? 380 : 560 };
  switch (el.kind) {
    case 'title':
      return <TitleView el={el} st={st} />;
    case 'text':
      return <TextView el={el} st={st} center={center} />;
    case 'math':
      return <MathView el={el} st={st} center={center} />;
    case 'bullets':
      return <BulletsView el={el} st={st} />;
    case 'callout':
      return <CalloutView el={el} st={st} />;
    case 'table':
      return <TableView el={el} st={st} />;
    case 'triangle':
      return <TriangleView el={el} st={st} {...fig} />;
    case 'similar':
      return <SimilarView el={el} st={st} {...fig} />;
    case 'diagram':
      return <DiagramView el={el} st={st} w={fig.w} h={el.height ?? fig.h} />;
    case 'calc':
      return <CalcView el={el} st={st} />;
    case 'try':
      return <TryView el={el} st={st} />;
    case 'screen':
      // A picture of the app takes all the height it is given.
      return <ScreenView el={el} st={st} w={area === 'main' ? BODY : fig.w} h={crowded ? 470 : 584} />;
  }
}

function Column({ els, state, area, className, leftWidth = LEFT }: { els: El[] | undefined; state: FrameState; area: Area; className: string; leftWidth?: number }) {
  const list = els ?? [];
  return (
    <div className={className}>
      {list.map((el) => (
        <ElView key={el.id} el={el} st={state.els[el.id]} area={area} crowded={list.length > 1} leftWidth={leftWidth} />
      ))}
    </div>
  );
}

export function Stage({ x, state, label }: { x: Explainer; state: FrameState; label: string }) {
  const scene = x.scenes[state.scene];
  return (
    <div className="v-stage">
      <div className="v-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Logo />
          <span className="v-display" style={{ color: 'rgb(var(--v-ink))', fontSize: 19, fontWeight: 600 }}>
            {BRAND}
          </span>
          <span style={{ opacity: 0.6 }}>·</span>
          <span>{label}</span>
        </div>
        {state.chapter && <div className="v-chapter v-display">{state.chapter}</div>}
      </div>
      <div className="v-body" style={{ opacity: state.fade }}>
        {scene.layout === 'split' ? (
          <div className="v-split" style={scene.leftWidth ? { gridTemplateColumns: `${scene.leftWidth}px minmax(0, 1fr)` } : undefined}>
            <Column els={scene.left} state={state} area="left" className="v-col v-center" leftWidth={scene.leftWidth} />
            <Column els={scene.right} state={state} area="right" className="v-col" leftWidth={scene.leftWidth} />
          </div>
        ) : (
          <Column els={scene.main} state={state} area="main" className="v-col v-center" />
        )}
      </div>
    </div>
  );
}

const FULL: ElState = { p: 1, parts: { answer: 1 }, whole: true, focus: {} };

/** Every element of a scene fully shown (to load fonts before rendering). */
export function fullScene(x: Explainer, si: number): FrameState {
  const s = x.scenes[si];
  const els: Record<string, ElState> = {};
  for (const e of [...(s.main ?? []), ...(s.left ?? []), ...(s.right ?? [])]) els[e.id] = FULL;
  return { scene: si, fade: 1, chapter: s.chapter ?? null, els };
}

/** How many times wider than tall a diagram's points spread. */
function aspect(d: DiagramEl) {
  const pts = Object.values(d.points);
  const span = (k: 0 | 1) => Math.max(...pts.map((p) => p[k])) - Math.min(...pts.map((p) => p[k]));
  return span(0) / Math.max(span(1), 1e-6);
}

export function Thumbnail({ x, label }: { x: Explainer; label: string }) {
  const isFigure = (e: El): e is TriangleEl | SimilarEl | DiagramEl | ScreenEl => e.kind === 'triangle' || e.kind === 'similar' || e.kind === 'diagram' || e.kind === 'screen';
  const figures = x.scenes.flatMap((s) => [...(s.left ?? []), ...(s.main ?? [])]).filter(isFigure);
  const fig = x.thumbnail === false ? undefined : (x.thumbnail && figures.find((e) => e.id === x.thumbnail)) || figures[0];
  const title = x.thumbnailTitle ?? x.title;
  // A wide, flat diagram (a ruler, a pair of lengths) goes under the title, across the thumbnail;
  // anything else sits to the right of it.
  const wide = fig?.kind === 'diagram' && aspect(fig) > 2.4;
  // A long title takes a smaller size, so it stays clear of the figure.
  const size = fig ? (title.length > 22 ? 76 : 88) : 104;
  return (
    <div className="v-stage">
      {wide && (
        <div style={{ position: 'absolute', left: 60, top: 330 }}>
          <DiagramView el={fig} st={FULL} w={1160} h={280} />
        </div>
      )}
      {/* A picture of the app is wider than a figure, so the title beside it wraps sooner. */}
      <div style={{ position: 'absolute', left: 80, top: 86, width: fig?.kind === 'screen' ? 520 : fig && !wide ? 640 : 1100 }}>
        <div className="v-display" style={{ color: TONES.brand, fontSize: 30, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 }}>
          {label}
        </div>
        <h1 className="v-display v-rich" style={{ fontSize: size, lineHeight: 1.04, fontWeight: 800, margin: '22px 0 0' }} dangerouslySetInnerHTML={{ __html: rich(title) }} />
        <div style={{ height: 10, width: 220, marginTop: 34, borderRadius: 5, background: `linear-gradient(90deg, ${TONES.brand}, ${TONES.adj})` }} />
      </div>
      {fig && !wide && (
        <div style={{ position: 'absolute', right: fig.kind === 'screen' ? 70 : 130, top: fig.kind === 'screen' ? 170 : 110 }}>
          {fig.kind === 'triangle' ? (
            <TriangleView el={fig} st={FULL} w={500} h={480} labelSize={34} />
          ) : fig.kind === 'diagram' ? (
            <DiagramView el={fig} st={FULL} w={500} h={480} />
          ) : fig.kind === 'screen' ? (
            <ScreenView el={fig} st={{ ...FULL, parts: {} }} w={580} h={400} />
          ) : (
            <SimilarView el={fig} st={FULL} w={500} h={480} />
          )}
        </div>
      )}
      <div style={{ position: 'absolute', left: 80, bottom: 60, display: 'flex', alignItems: 'center', gap: 16 }}>
        <Logo size={52} />
        <span className="v-display" style={{ fontSize: 36, fontWeight: 700 }}>
          {BRAND}
        </span>
      </div>
    </div>
  );
}
