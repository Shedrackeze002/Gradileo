/**
 * A curved mirror or a thin lens, with an object on its principal axis and the rays that find
 * the image (src/video/optics.ts works it all out).
 *
 * The object stands in front, on the left, and light travels to the right. A mirror is a true
 * arc of its circle, so its centre of curvature is where the picture says it is; a lens is drawn
 * thin, with all of its bending at the line through its centre. Each ray is drawn to the surface
 * and then on through the image (or, for a virtual image, away from it, with a dashed line back
 * to it), so the rays meet exactly where the equation puts the image.
 */
import type { ReactElement } from 'react';
import type { OpticsEl } from '../script.ts';
import { beamOf, describeImage, focalOf, imageAt, imagePlace, isMirror, opticsAt, raysOf, sagOf, type OpticsRay } from '../optics.ts';
import { ownPart, type ElState } from '../timeline.ts';
import { clamp01, FONT, INK2, Text } from './motionKit.tsx';
import { TONES } from './tex.ts';
import { INK, INK3 } from './Triangle.tsx';

/** The size the picture is designed at; it is scaled to the room it is given. */
const WIDE = 1136;
const PAD = 34;
const RAY: Record<OpticsRay['id'], string> = { parallel: TONES.theta, focal: TONES.opp, central: TONES.good, beam: '#FFE9A8' };
const IMAGE = TONES.brand;

type P = [number, number];

/** A number to so many figures, with a true minus sign, and a plus sign if asked. */
function figuresOf(n: number, figures: number, plus = false): string {
  if (!(Math.abs(n) > 0)) return '0';
  const rounded = Number(n.toPrecision(figures));
  const whole = Math.floor(Math.log10(Math.abs(rounded))) + 1;
  const places = Math.max(0, figures - whole);
  const text = Math.abs(rounded).toFixed(places);
  return `${rounded < 0 ? '−' : plus ? '+' : ''}${text}`;
}

/** An arrow that stands on the axis: the object, or its image (dashed when the image is virtual). */
function Standing({ x, foot, tip, color, dashed = false, opacity = 1 }: { x: number; foot: number; tip: number; color: string; dashed?: boolean; opacity?: number }) {
  const len = Math.abs(tip - foot);
  if (len < 2) return null;
  const s = Math.sign(tip - foot);
  const head = Math.min(17, len * 0.6);
  return (
    <g opacity={opacity} style={{ filter: `drop-shadow(0 0 6px ${color}66)` }}>
      <line x1={x} y1={foot} x2={x} y2={tip - s * head * 0.8} stroke={color} strokeWidth={6} strokeLinecap="round" strokeDasharray={dashed ? '9 9' : undefined} />
      <polygon points={`${x},${tip} ${x - 10},${tip - s * head} ${x + 10},${tip - s * head}`} fill={dashed ? 'none' : color} stroke={color} strokeWidth={2.5} strokeLinejoin="round" />
    </g>
  );
}

/** A small arrowhead part of the way along a ray, to show which way the light goes. */
function Head({ from, to, share, color }: { from: P; to: P; share: number; color: string }) {
  const [dx, dy] = [to[0] - from[0], to[1] - from[1]];
  const len = Math.hypot(dx, dy);
  if (len < 40) return null;
  const [ux, uy] = [dx / len, dy / len];
  const [x, y] = [from[0] + dx * share, from[1] + dy * share];
  return <polygon points={`${x + ux * 9},${y + uy * 9} ${x - ux * 7 - uy * 6.5},${y - uy * 7 + ux * 6.5} ${x - ux * 7 + uy * 6.5},${y - uy * 7 - ux * 6.5}`} fill={color} />;
}

/** A name on a small dark plate, so that the rays that cross behind it do not hide it. */
function Name({ x, y, children, color }: { x: number; y: number; children: string; color: string }) {
  const wide = children.length * 10.5 + 14;
  return (
    <g>
      <rect x={x - wide / 2} y={y - 13} width={wide} height={26} rx={8} fill="rgb(13 12 36 / 0.82)" />
      <Text x={x} y={y} size={19} color={color}>{children}</Text>
    </g>
  );
}

/** A quantity with a subscript: "dₒ = 30 cm". */
function Quantity({ x, y, sub, value, anchor, color = INK, opacity = 1 }: { x: number; y: number; sub: string; value: string; anchor: 'start' | 'end'; color?: string; opacity?: number }) {
  return (
    <text x={x} y={y} fill={color} fontSize={22} fontWeight={600} textAnchor={anchor} dominantBaseline="central" opacity={opacity} style={{ fontFamily: FONT, fontVariantNumeric: 'tabular-nums', paintOrder: 'stroke', stroke: 'rgb(13 12 36 / 0.85)', strokeWidth: 4, strokeLinejoin: 'round' }}>
      <tspan fontStyle="italic">{sub[0]}</tspan>
      {sub.length > 1 && (
        <>
          <tspan dy="0.36em" fontSize="0.68em" fontStyle="italic">
            {sub.slice(1)}
          </tspan>
          <tspan dy="-0.36em" fontSize="0.68em">
            {' '}
          </tspan>
        </>
      )}
      {` = ${value}`}
    </text>
  );
}

/** `fit` is the height the picture is designed for: it is then drawn whole in a room of another shape (a thumbnail), with space to spare at the sides. */
export function OpticsView({ el, st, w, h, plays, fit }: { el: OpticsEl; st: ElState | undefined; w: number; h: number; plays?: Array<[string, number]>; fit?: number }) {
  const p = st?.p ?? 0;
  if (p <= 0) return <div style={{ width: w, height: h }} />;
  const state = opticsAt(el, plays ?? st?.plays ?? []);
  const part = (name: string) => ownPart(st, name);
  const out: ReactElement[] = [];
  const HIGH = fit ?? WIDE * (h / w);
  const across = fit ? (fit * w) / h : WIDE;
  const left = (WIDE - across) / 2;
  if (el.label)
    out.push(
      <text key="label" x={left} y={14} fill={INK3} fontSize={18} fontWeight={600} style={{ fontFamily: FONT, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        {el.label}
      </text>,
    );
  const top = el.label ? 30 : 0;
  out.push(<rect key="panel" x={left} y={top} width={across} height={HIGH - top} rx={14} fill="rgb(8 7 28 / 0.55)" stroke="rgb(188 217 255 / 0.25)" strokeWidth={1.5} />);

  const mirror = isMirror(el);
  const f = focalOf(el);
  const unit = el.unit ?? 'cm';
  const figures = el.figures ?? 2;
  const scale = (WIDE - 2 * PAD) / (el.view[0] + el.view[1]);
  const x0 = PAD + el.view[0] * scale;
  const cy = top + (HIGH - top) * (el.axis ?? 0.5);
  /** A place in the picture: x is measured from the mirror or lens (positive beyond it), y up from the axis. */
  const at = (x: number, y: number): P => [x0 + x * scale, cy - y * scale];
  // How far up and down the mirror or lens reaches: most of the room there is, and for a mirror no more than its circle allows.
  const room = Math.min(cy - top, HIGH - cy) / scale;
  const aperture = Math.min(room * 0.88, mirror ? 1.5 * el.f : Infinity, el.aperture ?? Infinity);
  const clip = `${el.id}-clip`;
  out.push(
    <defs key="defs">
      <clipPath id={clip}>
        <rect x={left + 2} y={top + 2} width={across - 4} height={HIGH - top - 4} rx={13} />
      </clipPath>
    </defs>,
  );

  // The principal axis.
  out.push(<line key="axis" x1={PAD} y1={cy} x2={WIDE - PAD} y2={cy} stroke={INK3} strokeWidth={1.5} />);

  // The mirror or the lens.
  const A = aperture * scale;
  if (mirror) {
    const R = 2 * el.f * scale;
    const edge = x0 + sagOf(el, aperture) * scale;
    const arc = (dx: number) => `M${edge + dx},${cy - A} A${R},${R} 0 0 ${el.device === 'concave' ? 1 : 0} ${edge + dx},${cy + A}`;
    out.push(
      <g key="device" fill="none" strokeLinecap="round">
        <path d={arc(6)} stroke="#5d5b93" strokeWidth={9} />
        <path d={arc(0)} stroke="#e8ecff" strokeWidth={4.5} />
      </g>,
    );
  } else {
    const t = el.device === 'converging' ? 24 : 12;
    const d = el.device === 'converging' ? `M${x0},${cy - A} Q${x0 + t * 2},${cy} ${x0},${cy + A} Q${x0 - t * 2},${cy} ${x0},${cy - A} Z` : `M${x0 - t - 6},${cy - A} L${x0 + t + 6},${cy - A} Q${x0 + t - 16},${cy} ${x0 + t + 6},${cy + A} L${x0 - t - 6},${cy + A} Q${x0 - t + 16},${cy} ${x0 - t - 6},${cy - A} Z`;
    out.push(
      <g key="device">
        <path d={d} fill="rgb(120 170 255 / 0.22)" stroke="#bcd0ff" strokeWidth={3} strokeLinejoin="round" />
        <line x1={x0} y1={cy - A} x2={x0} y2={cy + A} stroke="#bcd0ff" strokeWidth={1.2} strokeDasharray="4 6" opacity={0.7} />
      </g>,
    );
  }

  // The focus and, for a mirror, the centre of curvature; a lens has a focus on each side, and 2F beyond each.
  const pointsPart = part('points');
  if (pointsPart > 0) {
    const marks: Array<[number, string]> = mirror
      ? [
          [-f, 'F'],
          [-2 * f, 'C'],
        ]
      : [
          [-el.f, 'F'],
          [el.f, 'F'],
          [-2 * el.f, '2F'],
          [2 * el.f, '2F'],
        ];
    out.push(
      <g key="points" opacity={pointsPart}>
        {marks
          .filter(([x]) => x > -el.view[0] && x < el.view[1])
          .map(([x, name], i) => (
            <g key={i}>
              <circle cx={at(x, 0)[0]} cy={cy} r={5.5} fill={INK} />
              {/* Under the axis on the object's side; over it beyond the mirror or lens, where the readouts and a real image are below. */}
              <Name x={at(x, 0)[0] + (x > 0 ? 16 : -16)} y={cy + (x > 0 ? -24 : 24)} color={INK2}>{name}</Name>
            </g>
          ))}
      </g>,
    );
  }

  const object = el.object;
  const image = object ? imageAt(f, state.at, object.height) : null;
  const place = image ? imagePlace(el, image) : null;

  // One ray: to the surface, and then through the point where the rays meet (or away from it, with a dashed line back).
  const drawRay = (ray: OpticsRay, key: string, opacity: number, meet: P | null, real: boolean) => {
    // A ray that would miss the mirror or lens is not drawn; it fades as it nears the edge, so it does not vanish at a stroke while the object slides.
    opacity *= clamp01((aperture - Math.abs(ray.y)) / (0.1 * aperture));
    if (opacity <= 0) return;
    const color = RAY[ray.id];
    const T = at(-ray.from[0], ray.from[1]);
    const S = at(sagOf(el, ray.y), ray.y);
    let dir: P;
    // The ray through a mirror's centre of curvature comes back along its own path.
    if (mirror && ray.id === 'central') dir = [T[0] - S[0], T[1] - S[1]];
    else if (meet) dir = real ? [meet[0] - S[0], meet[1] - S[1]] : [S[0] - meet[0], S[1] - meet[1]];
    else dir = [mirror ? -1 : 1, -ray.outSlope];
    const len = Math.hypot(dir[0], dir[1]) || 1;
    const E: P = [S[0] + (dir[0] / len) * 2 * WIDE, S[1] + (dir[1] / len) * 2 * WIDE];
    const dashes: string[] = [];
    // A ray that leaves as if from a point is traced back to it; the parallel ray of a diverging mirror or lens is traced on to the focus it seems to come from.
    const focus = at(mirror ? -f : f, 0);
    if (meet && !real) dashes.push(ray.id === 'parallel' && f < 0 ? `M${S[0]},${S[1]} L${focus[0]},${focus[1]}` : `M${S[0]},${S[1]} L${meet[0]},${meet[1]}`);
    if (ray.through !== null) {
      const Q = at(-ray.through, 0);
      // The incoming ray is heading for a point behind the mirror or beyond the lens, or comes as if from one behind the object.
      if (ray.through < 0) dashes.push(`M${S[0]},${S[1]} L${Q[0]},${Q[1]}`);
      else if (ray.through > ray.from[0]) dashes.push(`M${Q[0]},${Q[1]} L${T[0]},${T[1]}`);
    }
    const d = `M${T[0]},${T[1]} L${S[0]},${S[1]} L${E[0]},${E[1]}`;
    out.push(
      <g key={key} opacity={opacity} clipPath={`url(#${clip})`}>
        {dashes.length > 0 && <path d={dashes.join(' ')} stroke={color} strokeWidth={2} strokeDasharray="6 7" fill="none" opacity={0.7} />}
        <path d={d} stroke={color} strokeWidth={3} fill="none" strokeLinejoin="round" opacity={0.9} />
        {/* Light runs along the ray while a clip plays. */}
        <path d={d} stroke="#fffbe6" strokeWidth={3} fill="none" strokeLinejoin="round" strokeLinecap="round" strokeDasharray="12 92" strokeDashoffset={-state.time * 150} opacity={0.9} />
        <Head from={T} to={S} share={0.5} color={color} />
        <Head from={S} to={meet && real ? meet : [S[0] + (dir[0] / len) * 300, S[1] + (dir[1] / len) * 300]} share={0.45} color={color} />
      </g>,
    );
  };

  // A beam parallel to the axis: it meets at the focus, or spreads as if it came from the focus.
  const beamPart = part('beam');
  if (beamPart > 0) {
    const focus: P = at(mirror ? -f : f, 0);
    const heights = [-0.7, -0.35, 0.35, 0.7].map((share) => share * aperture);
    beamOf(el, heights, el.view[0]).forEach((ray, i) => drawRay(ray, `beam${i}`, beamPart, focus, f > 0));
    out.push(<line key="beam0" x1={PAD} y1={cy} x2={x0} y2={cy} stroke={RAY.beam} strokeWidth={3} opacity={0.9 * beamPart} />);
  }

  if (object && image) {
    const meet: P | null = place === null ? null : at(place, image.hi!);
    for (const ray of raysOf(el, state.at, object.height)) if (ray.id !== 'beam') drawRay(ray, ray.id, part(ray.id), meet, image.real);

    // The object, and its image: solid where light really meets, dashed where it only seems to come from.
    const [ox, tipY] = at(-state.at, object.height);
    out.push(
      <g key="object">
        <Standing x={ox} foot={cy} tip={tipY} color="#f4f5ff" />
        <Name x={ox} y={tipY - 24} color={INK2}>{object.label ?? 'Object'}</Name>
      </g>,
    );
    const imagePart = part('image');
    if (imagePart > 0 && meet) {
      const s = Math.sign(cy - meet[1]) || 1;
      out.push(
        <g key="image" opacity={imagePart} clipPath={`url(#${clip})`}>
          <Standing x={meet[0]} foot={cy} tip={meet[1]} color={IMAGE} dashed={!image.real} />
          <Name x={meet[0]} y={meet[1] - s * 26} color={IMAGE}>Image</Name>
        </g>,
      );
    }

    // The readouts sit in the corner the rays leave empty: behind a mirror, and under the object's side of a lens. A lens has names under its axis there, so its three values go in one row along the foot of the picture.
    const [valuesPart, kindPart] = [part('values'), part('kind')];
    const anchor = mirror ? 'end' : 'start';
    const tx = mirror ? WIDE - PAD - 8 : PAD + 8;
    const lines: ReactElement[] = [];
    let y = HIGH - 30;
    if (valuesPart > 0 && !mirror) {
      lines.push(<Quantity key="do" x={tx} y={y} sub="do" value={`${figuresOf(state.at, figures)} ${unit}`} anchor={anchor} opacity={valuesPart} />);
      lines.push(<Quantity key="di" x={tx + 180} y={y} sub="di" value={image.di === null ? 'none' : `${figuresOf(image.di, figures)} ${unit}`} anchor={anchor} color={IMAGE} opacity={valuesPart} />);
      lines.push(<Quantity key="m" x={tx + 372} y={y} sub="m" value={image.m === null ? 'none' : figuresOf(image.m, figures, true)} anchor={anchor} opacity={valuesPart} />);
      y -= 34;
    } else if (valuesPart > 0) {
      lines.push(<Quantity key="m" x={tx} y={y} sub="m" value={image.m === null ? 'none' : figuresOf(image.m, figures, true)} anchor={anchor} opacity={valuesPart} />);
      lines.push(<Quantity key="di" x={tx} y={y - 30} sub="di" value={image.di === null ? 'none' : `${figuresOf(image.di, figures)} ${unit}`} anchor={anchor} color={IMAGE} opacity={valuesPart} />);
      lines.push(<Quantity key="do" x={tx} y={y - 60} sub="do" value={`${figuresOf(state.at, figures)} ${unit}`} anchor={anchor} opacity={valuesPart} />);
      y -= 94;
    }
    if (kindPart > 0) lines.push(<Text key="kind" x={tx} y={y} anchor={anchor} size={21} color={image.di === null ? TONES.opp : IMAGE} opacity={kindPart}>{describeImage(image)}</Text>);
    if (lines.length) out.push(<g key="readouts">{lines}</g>);
  }

  return (
    <div style={{ width: w, height: h, opacity: clamp01(p), transform: `translateY(${(1 - clamp01(p)) * 14}px)` }}>
      <svg width={w} height={h} viewBox={`${left} 0 ${across} ${HIGH}`} style={{ overflow: 'visible', display: 'block' }}>
        {out}
      </svg>
    </div>
  );
}
