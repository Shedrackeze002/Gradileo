/** One frame of an explainer video, drawn from the frame state; and the video's thumbnail. */
import { BRAND, type AtomsEl, type MoleculesEl, type ScatterEl, type CircleEl, type CircuitEl, type DiagramEl, type El, type Explainer, type FlightEl, type ForcesEl, type GravityEl, type MotionEl, type ParticlesEl, type RampEl, type RaysEl, type RipplesEl, type ScreenEl, type TriangleEl, type SimilarEl, type WaveEl } from '../script.ts';
import { fastest, flightAt } from '../flight.ts';
import { clipSeconds, type ElState, type FrameState } from '../timeline.ts';
import { CircuitView } from './Circuit.tsx';
import { FlightView } from './Flight.tsx';
import { AtomsView } from './Atoms.tsx';
import { MoleculesView } from './Molecules.tsx';
import { ScatterView } from './Scatter.tsx';
import { FRESH } from '../molecules.ts';
import { heaviest, RampView } from './Ramp.tsx';
import { CircleView } from './Circle.tsx';
import { ForcesView } from './Forces.tsx';
import { GravityView } from './Gravity.tsx';
import { DiagramView } from './Diagram.tsx';
import { MotionView } from './Motion.tsx';
import { ParticlesView } from './Particles.tsx';
import { RaysView } from './Rays.tsx';
import { BulletsView, CalcView, CalloutView, MathView, QuoteView, TableView, TextView, TitleView, TryView } from './elements.tsx';
import { ScreenView } from './Screen.tsx';
import { rich, TONES } from './tex.ts';
import { SimilarView, TriangleView } from './Triangle.tsx';
import { RipplesView } from './Ripples.tsx';
import { WaveView } from './Wave.tsx';

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
    case 'quote':
      return <QuoteView el={el} st={st} />;
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
    case 'motion':
      return <MotionView el={el} st={st} w={area === 'main' ? BODY : fig.w} h={el.height ?? (crowded ? 380 : 540)} />;
    case 'particles':
      return <ParticlesView el={el} st={st} w={area === 'main' ? BODY : fig.w} h={el.height ?? (crowded ? 380 : 520)} />;
    case 'atoms':
      return <AtomsView el={el} st={st} w={area === 'main' ? BODY : fig.w} h={el.height ?? (crowded ? 380 : 520)} />;
    case 'molecules':
      return <MoleculesView el={el} st={st} w={area === 'main' ? BODY : fig.w} h={el.height ?? (crowded ? 380 : 520)} />;
    case 'scatter':
      return <ScatterView el={el} st={st} w={area === 'main' ? BODY : fig.w} h={el.height ?? (crowded ? 380 : 520)} />;
    case 'circuit':
      return <CircuitView el={el} st={st} w={area === 'main' ? BODY : fig.w} h={el.height ?? (crowded ? 380 : 520)} />;
    case 'flight':
      return <FlightView el={el} st={st} w={area === 'main' ? BODY : fig.w} h={el.height ?? (crowded ? 380 : 540)} />;
    case 'ramp':
      return <RampView el={el} st={st} w={area === 'main' ? BODY : fig.w} h={el.height ?? (crowded ? 380 : 540)} />;
    case 'forces':
      return <ForcesView el={el} st={st} w={area === 'main' ? BODY : fig.w} h={el.height ?? (crowded ? 380 : 540)} />;
    case 'gravity':
      return <GravityView el={el} st={st} w={area === 'main' ? BODY : fig.w} h={el.height ?? (crowded ? 380 : 540)} />;
    case 'circle':
      return <CircleView el={el} st={st} w={area === 'main' ? BODY : fig.w} h={el.height ?? (crowded ? 380 : 540)} />;
    case 'rays':
      return <RaysView el={el} st={st} w={area === 'main' ? BODY : fig.w} h={el.height ?? (crowded ? 380 : 520)} />;
    case 'wave':
      return <WaveView el={el} st={st} w={area === 'main' ? BODY : fig.w} h={el.height ?? (crowded ? 380 : 540)} />;
    case 'ripples':
      return <RipplesView el={el} st={st} w={area === 'main' ? BODY : fig.w} h={el.height ?? (crowded ? 380 : 540)} />;
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
/** A motion's clips without the notes of their phases ("Slow motion"), which a thumbnail has no use for. */
function withoutNotes(clips: MotionEl['clips']): MotionEl['clips'] {
  return Object.fromEntries(Object.entries(clips).map(([name, clip]) => [name, { ...clip, phases: clip.phases.map((ph) => ({ ...ph, note: undefined })) }]));
}

function aspect(d: DiagramEl) {
  const pts = Object.values(d.points);
  const span = (k: 0 | 1) => Math.max(...pts.map((p) => p[k])) - Math.min(...pts.map((p) => p[k]));
  return span(0) / Math.max(span(1), 1e-6);
}

/**
 * A flight on a thumbnail: caught part way through its poster clip, with its path, its strobe marks
 * and the parts of each velocity (on a map, its displacement and the two parts of that), and no
 * panel or notes. It sits to the right of the logo, and its
 * arrows are kept short enough to stay inside the picture.
 */
function FlightThumb({ el, w, h }: { el: FlightEl; w: number; h: number }) {
  const plays: Array<[string, number]> = el.poster ? [[el.poster, clipSeconds(el, el.poster) * 0.7]] : [];
  const clips = Object.fromEntries(Object.entries(el.clips).map(([name, clip]) => [name, { ...clip, phases: clip.phases.map((ph) => ({ ...ph, note: undefined })) }]));
  const now = flightAt(el, plays);
  const top = Math.max(1e-6, ...Object.values(now.bodies).map((b) => Math.max(Math.abs(b.vx), Math.abs(b.vy), Math.hypot(b.ownX, b.ownY))));
  const velocityScale = Math.min(el.velocityScale ?? 150 / Math.max(fastest(el), 1e-6), 100 / top);
  // Bodies with a mass (a collision seen from above) show their paths and velocities, without the column of momentum bars.
  // They are framed closely about where they met, without the names that the bars need.
  const collides = el.bodies.some((b) => b.mass !== undefined);
  if (collides) {
    const big = Math.max(...el.bodies.map((b) => b.radius ?? 0.5));
    const [cx, cy] = now.hit ? [now.hit.x, now.hit.y] : [(el.view[0] + el.view[1]) / 2, (el.view[2] + el.view[3]) / 2];
    const view: FlightEl['view'] = [cx - 10.5 * big, cx + 10.5 * big, cy - 3.2 * big, cy + 4.2 * big];
    const bodies = el.bodies.map((b) => ({ ...b, label: b.shape === 'puck' ? b.label : undefined }));
    return <FlightView el={{ ...el, view, bodies, tick: undefined, readout: undefined, momentum: undefined, clips, velocityScale }} st={{ ...FULL, parts: { trail: 1, velocity: 1 } }} w={w} h={h} plays={plays} />;
  }
  return <FlightView el={{ ...el, readout: undefined, momentum: undefined, clips, velocityScale }} st={{ ...FULL, parts: { trail: 1, ...(el.scene === 'map' ? { displacement: 1, legs: 1, angle: 1 } : el.stream ? { strobe: 1, own: 1, velocity: 1 } : { strobe: 1, components: 1 }) } }} w={w} h={h} plays={plays} />;
}

/**
 * A ramp on a thumbnail: caught part way through its poster clip with every force on its blocks
 * drawn, no notes, and arrows short enough to stay inside the picture.
 */
function RampThumb({ el, w, h }: { el: RampEl; w: number; h: number }) {
  const plays: Array<[string, number]> = el.poster ? [[el.poster, clipSeconds(el, el.poster) * 0.7]] : [];
  const clips = Object.fromEntries(Object.entries(el.clips).map(([name, clip]) => [name, { ...clip, phases: clip.phases.map((ph) => ({ ...ph, note: undefined })) }]));
  return <RampView el={{ ...el, label: undefined, clips, pad: [130, 60], forceScale: Math.min(el.forceScale ?? 1.5, 110 / heaviest(el)) }} st={{ ...FULL, parts: { weight: 1, normal: 1, friction: 1, tension: 1 } }} w={w} h={h} plays={plays} />;
}

/** Forces in a plane on a thumbnail: part way through the poster clip, with the net force or the tensions drawn, and no notes. */
function ForcesThumb({ el, w, h }: { el: ForcesEl; w: number; h: number }) {
  const plays: Array<[string, number]> = el.poster ? [[el.poster, clipSeconds(el, el.poster) * 0.7]] : [];
  const clips = Object.fromEntries(Object.entries(el.clips).map(([name, clip]) => [name, { ...clip, phases: clip.phases.map((ph) => ({ ...ph, note: undefined })) }]));
  return <ForcesView el={{ ...el, label: undefined, clips }} st={{ ...FULL, parts: { net: 1, trail: 1, weight: 1, tension: 1, angles: 1 } }} w={w} h={h} plays={plays} />;
}

/** Bodies in space on a thumbnail: part way through the poster clip, with the pull on each body and the field of the first, or the paths of bodies that fly. */
function GravityThumb({ el, w, h }: { el: GravityEl; w: number; h: number }) {
  // Bodies that fly (in orbit, or thrown) are shown with their paths: the clips before the poster are played through first, so the earlier throws are there too.
  const flies = el.bodies.some((b) => b.orbit || b.v) || Object.values(el.clips).some((c) => c.phases.some((ph) => ph.launch));
  const names = Object.keys(el.clips);
  const before: Array<[string, number]> = flies && el.poster ? names.slice(0, names.indexOf(el.poster)).map((name) => [name, clipSeconds(el, name)]) : [];
  const plays: Array<[string, number]> = el.poster ? [...before, [el.poster, clipSeconds(el, el.poster) * 0.7]] : [];
  const clips = Object.fromEntries(Object.entries(el.clips).map(([name, clip]) => [name, { ...clip, phases: clip.phases.map((ph) => ({ ...ph, note: undefined })) }]));
  return <GravityView el={{ ...el, label: undefined, clips }} st={{ ...FULL, parts: flies ? { force: 1, trail: 1, velocity: 1, orbit: 1 } : { force: 1, field: 1 } }} w={w} h={h} plays={plays} />;
}

/** Bodies on a circle on a thumbnail: part way through the poster clip, with the velocity and what turns each body, and no notes. */
function CircleThumb({ el, w, h }: { el: CircleEl; w: number; h: number }) {
  const plays: Array<[string, number]> = el.poster ? [[el.poster, clipSeconds(el, el.poster) * 0.7]] : [];
  const clips = Object.fromEntries(Object.entries(el.clips).map(([name, clip]) => [name, { ...clip, phases: clip.phases.map((ph) => ({ ...ph, note: undefined })) }]));
  return <CircleView el={{ ...el, label: undefined, shift: 0, clips }} st={{ ...FULL, parts: { velocity: 1, strobe: 1, ...(el.by ? { force: 1 } : { accel: 1 }) } }} w={w} h={h} plays={plays} thumb />;
}

/** Whether a flight's view is wide and flat (a projectile over level ground) and not tall (a river to cross). */
const flatFlight = (el: FlightEl) => (el.view[1] - el.view[0]) / (el.view[3] - el.view[2]) > 1.5;

/** Whether a view of space is wide and flat (a planet and its satellite side by side). */
const flatSpace = (el: GravityEl) => (el.view[1] - el.view[0]) / (el.view[3] - el.view[2]) > 2.4;

/** Whether a motion is along a hill that is tall for its width (a roller coaster): it sits beside the title, not under it. */
function tallHill(el: MotionEl): boolean {
  if (!el.path || !('points' in el.path)) return false;
  const pts = el.path.points;
  const across = Math.max(...pts.map((q) => q[0])) - Math.min(...pts.map((q) => q[0]));
  // A hill stands on the level its heights are measured from.
  const up = Math.max(...pts.map((q) => q[1]), 0) - Math.min(...pts.map((q) => q[1]), 0);
  return across / Math.max(up, 1e-6) < 3;
}

/** Whether a motion is a pendulum with a narrow swing, which is taller than it is wide: it sits beside the title too. */
const tallSwing = (el: MotionEl) => Boolean(el.path && 'swing' in el.path && 2 * Math.sin((el.path.swing.angle * Math.PI) / 180) < 1.5);

/** Whether a motion is a mass hung on a spring, with no graph beside it: it is tall, so it sits beside the title too. */
const hungMass = (el: MotionEl) => Boolean(el.vertical) && el.equilibrium !== undefined && !el.graph;

export function Thumbnail({ x, label }: { x: Explainer; label: string }) {
  const isFigure = (e: El): e is TriangleEl | SimilarEl | DiagramEl | ScreenEl | MotionEl | ParticlesEl | AtomsEl | MoleculesEl | ScatterEl | WaveEl | RipplesEl | RaysEl | CircuitEl | FlightEl | RampEl | ForcesEl | GravityEl | CircleEl => e.kind === 'triangle' || e.kind === 'similar' || e.kind === 'diagram' || e.kind === 'screen' || e.kind === 'motion' || e.kind === 'particles' || e.kind === 'atoms' || e.kind === 'molecules' || e.kind === 'scatter' || e.kind === 'wave' || e.kind === 'ripples' || e.kind === 'rays' || e.kind === 'circuit' || e.kind === 'flight' || e.kind === 'ramp' || e.kind === 'forces' || e.kind === 'gravity' || e.kind === 'circle';
  const figures = x.scenes.flatMap((s) => [...(s.left ?? []), ...(s.main ?? [])]).filter(isFigure);
  // A figure that is named can be in the right-hand column of a scene; the first figure, which is used when none is named, is not looked for there.
  const named = x.thumbnail ? [...figures, ...x.scenes.flatMap((s) => s.right ?? []).filter(isFigure)].find((e) => e.id === x.thumbnail) : undefined;
  const fig = x.thumbnail === false ? undefined : named || figures[0];
  const title = x.thumbnailTitle ?? x.title;
  // A wide, flat diagram (a ruler, a pair of lengths) goes under the title, across the thumbnail;
  // anything else sits to the right of it.
  const wide = (fig?.kind === 'diagram' && aspect(fig) > 2.4) || (fig?.kind === 'motion' && !tallHill(fig) && !hungMass(fig) && !tallSwing(fig)) || fig?.kind === 'wave' || (fig?.kind === 'flight' && flatFlight(fig)) || (fig?.kind === 'gravity' && flatSpace(fig));
  // A long title takes a smaller size, so it stays clear of the figure.
  const size = fig ? (title.length > 22 ? 76 : 88) : 104;
  return (
    <div className="v-stage">
      {wide && (
        <div style={{ position: 'absolute', left: fig.kind === 'flight' ? 330 : 60, top: fig.kind === 'motion' || fig.kind === 'wave' || fig.kind === 'flight' ? 300 : 330 }}>
          {fig.kind === 'motion' ? (
            // A motion is caught part way through its poster clip, with its forces and velocities drawn.
            // A drop takes the full height and width, without its graph, strobe marks or phase notes;
            // an oscillation keeps the displacement graph it traces.
            <MotionView
              el={{ ...fig, momentumMax: undefined, energy: undefined, lanes: fig.lanes?.map((l) => ({ surface: l.surface })), ...(fig.vertical ? { graph: fig.graph?.y === 'displacement' ? fig.graph : undefined, clips: withoutNotes(fig.clips) } : fig.equilibrium !== undefined ? { clips: withoutNotes(fig.clips) } : {}) }}
              st={{ ...FULL, parts: fig.vertical ? (fig.graph?.y === 'displacement' ? { graph: 1 } : fig.equilibrium !== undefined ? { amplitude: 1 } : { velocity: 1 }) : fig.equilibrium !== undefined ? { velocity: 1, amplitude: 1 } : { velocity: 1, strobe: 1 } }}
              w={1160}
              h={fig.vertical ? 320 : Math.min(320, 150 + 130 * (fig.lanes?.length ?? 1))}
              plays={fig.poster ? [[fig.poster, clipSeconds(fig, fig.poster) * 0.7]] : []}
            />
          ) : fig.kind === 'wave' ? (
            // Waves are caught part way through their poster clip, without the ruler or the notes, and
            // with the nodes of a standing pattern marked. A wave carries on from one clip to the
            // next, so the clips before the poster are played through first.
            <WaveView
              el={{ ...fig, ruler: false, lanes: fig.lanes.slice(0, 2), clips: Object.fromEntries(Object.entries(fig.clips).map(([name, clip]) => [name, { ...clip, phases: clip.phases.map((ph) => ({ ...ph, note: undefined })) }])) }}
              st={{ ...FULL, parts: { nodes: 1 } }}
              w={1160}
              h={320}
              plays={fig.poster ? [...Object.keys(fig.clips).slice(0, Object.keys(fig.clips).indexOf(fig.poster)).map((name): [string, number] => [name, clipSeconds(fig, name)]), [fig.poster, clipSeconds(fig, fig.poster) * 0.7]] : []}
            />
          ) : fig.kind === 'flight' ? (
            <FlightThumb el={fig} w={890} h={330} />
          ) : fig.kind === 'gravity' ? (
            <GravityThumb el={fig} w={1160} h={255} />
          ) : (
            <DiagramView el={fig as DiagramEl} st={FULL} w={1160} h={280} />
          )}
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
          ) : fig.kind === 'particles' ? (
            // Particles are caught a few seconds after they start moving, with their labels.
            <ParticlesView el={fig} st={{ ...FULL, parts: { labels: 1 } }} w={560} h={440} age={6} played={[]} />
          ) : fig.kind === 'atoms' ? (
            // Atoms are shown with their poster clip played to its end, with their labels.
            <AtomsView el={fig} st={{ ...FULL, parts: { labels: 1, charges: 1 } }} w={560} h={440} age={fig.poster ? clipSeconds(fig, fig.poster) + 2 : 2} played={fig.poster ? [[fig.poster, 0]] : []} />
          ) : fig.kind === 'molecules' ? (
            // Molecules are shown with their poster clip played to its end.
            <MoleculesView el={fig} st={FULL} w={560} h={440} age={fig.poster ? clipSeconds(fig, fig.poster) + 2 + FRESH : 2} played={fig.poster ? [[fig.poster, 0]] : []} />
          ) : fig.kind === 'scatter' ? (
            // The gold foil with its poster clip played to its end, every track left on it.
            <ScatterView el={fig} st={FULL} w={560} h={420} plays={fig.poster ? [[fig.poster, clipSeconds(fig, fig.poster) + 6]] : []} />
          ) : fig.kind === 'rays' ? (
            // Rays are shown with the normal and the angles marked, part way through the poster clip.
            <RaysView el={{ ...fig, media: undefined }} st={{ ...FULL, parts: { normal: 1, angles: 1 } }} w={560} h={440} plays={fig.poster ? [[fig.poster, clipSeconds(fig, fig.poster) * 0.7]] : []} />
          ) : fig.kind === 'circuit' ? (
            // A circuit is shown switched on, with its charges, part way through the poster clip.
            <CircuitView el={{ ...fig, open: false, clips: Object.fromEntries(Object.entries(fig.clips).map(([name, clip]) => [name, { phases: clip.phases.map((ph) => ({ ...ph, note: undefined })) }])) }} st={{ ...FULL, parts: { charges: 1 } }} w={560} h={440} plays={fig.poster ? [[fig.poster, clipSeconds(fig, fig.poster) * 0.7]] : []} />
          ) : fig.kind === 'flight' ? (
            <FlightThumb el={fig} w={520} h={500} />
          ) : fig.kind === 'ramp' ? (
            <RampThumb el={fig} w={560} h={470} />
          ) : fig.kind === 'forces' ? (
            <ForcesThumb el={fig} w={560} h={470} />
          ) : fig.kind === 'circle' ? (
            <CircleThumb el={fig} w={500} h={470} />
          ) : fig.kind === 'ripples' ? (
            // Ripples are caught part way through their poster clip (after the clips before it), with the paths to the listener and no notes.
            <RipplesView
              el={{ ...fig, clips: Object.fromEntries(Object.entries(fig.clips).map(([name, clip]) => [name, { ...clip, phases: clip.phases.map((ph) => ({ ...ph, note: undefined })) }])) }}
              st={{ ...FULL, parts: { paths: 1, velocity: 1 } }}
              w={500}
              h={470}
              plays={fig.poster ? [...Object.keys(fig.clips).slice(0, Object.keys(fig.clips).indexOf(fig.poster)).map((name): [string, number] => [name, clipSeconds(fig, name)]), [fig.poster, clipSeconds(fig, fig.poster) * 0.7]] : []}
            />
          ) : fig.kind === 'gravity' ? (
            <GravityThumb el={fig} w={500} h={430} />
          ) : fig.kind === 'motion' && tallSwing(fig) ? (
            // A pendulum, part way through its poster clip, with its length and what pulls its bob back (or how fast the bob is moving).
            <MotionView el={{ ...fig, energy: undefined, lanes: undefined, clips: withoutNotes(fig.clips) }} st={{ ...FULL, parts: fig.forceScale ? { length: 1, restoring: 1 } : { length: 1, velocity: 1 } }} w={500} h={470} plays={fig.poster ? [[fig.poster, clipSeconds(fig, fig.poster) * 0.7]] : []} />
          ) : fig.kind === 'motion' && hungMass(fig) ? (
            // A mass hung on a spring, part way through its poster clip, with its amplitude marked.
            <MotionView el={{ ...fig, energy: undefined, lanes: undefined, clips: withoutNotes(fig.clips) }} st={{ ...FULL, parts: { amplitude: 1 } }} w={440} h={500} plays={fig.poster ? [[fig.poster, clipSeconds(fig, fig.poster) * 0.7]] : []} />
          ) : fig.kind === 'motion' ? (
            // A tall hill, part way through its poster clip, with the speed and the height of its car.
            <MotionView el={{ ...fig, energy: undefined, clips: withoutNotes(fig.clips) }} st={{ ...FULL, parts: { velocity: 1, height: 1 } }} w={540} h={470} plays={fig.poster ? [[fig.poster, clipSeconds(fig, fig.poster) * 0.7]] : []} />
          ) : fig.kind === 'similar' ? (
            <SimilarView el={fig} st={FULL} w={500} h={480} />
          ) : null}
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
