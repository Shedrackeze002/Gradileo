/**
 * A picture of Gradileo in a browser window (a `screen` element). The pictures and where their
 * spots are come from video/tools/screens.ts; the stage loads them before the first frame.
 */
import type { ScreenEl } from '../script.ts';
import { ownPart, type ElState } from '../timeline.ts';
import { Reveal } from './elements.tsx';
import { TONES } from './tex.ts';

interface Shot {
  width: number;
  height: number;
  spots: Record<string, [number, number, number, number]>;
  src: string;
}

const shots = new Map<string, Shot>();

/** Loads the shots a video shows, with their pictures decoded, so every frame can draw them at once. */
export async function loadShots(names: string[]): Promise<void> {
  for (const name of new Set(names)) {
    if (shots.has(name)) continue;
    const src = `/video/out/screens/${name}.png`;
    const res = await fetch(`/video/out/screens/${name}.json`);
    if (!res.ok) throw new Error(`No picture "${name}": run npx tsx video/tools/screens.ts ${name}`);
    const meta = (await res.json()) as Omit<Shot, 'src'>;
    const img = new Image();
    img.src = src;
    await img.decode();
    shots.set(name, { ...meta, src });
  }
}

/** The window's bar: three dots and the address. */
const BAR = 34;
const clamp01 = (x: number) => Math.max(0, Math.min(1, x));

export function ScreenView({ el, st, w, h }: { el: ScreenEl; st?: ElState; w: number; h: number }) {
  const shot = shots.get(el.shot);
  if (!shot) throw new Error(`The picture "${el.shot}" is not loaded.`);
  const [vx, vy, vw, vh] = el.view ?? [0, 0, shot.width, shot.height];
  const s = Math.min(w / vw, ((el.height ?? h) - BAR) / vh);
  const width = vw * s;
  const height = vh * s;
  const spots = (el.spots ?? []).map((id) => {
    const box = shot.spots[id];
    if (!box) throw new Error(`The picture "${el.shot}" has no spot "${id}".`);
    // A ring a little outside the spot, kept inside the picture when the spot runs past its edge.
    const pad = 6;
    const x0 = Math.max(4, (box[0] - vx) * s - pad);
    const y0 = Math.max(4, (box[1] - vy) * s - pad);
    const x1 = Math.min(width - 4, (box[0] + box[2] - vx) * s + pad);
    const y1 = Math.min(height - 4, (box[1] + box[3] - vy) * s + pad);
    // Emphasising a spot rings it (and dims the rest); showing it keeps a ring on it.
    const f = st?.focus[id] ?? 0;
    return { id, x: x0, y: y0, w: x1 - x0, h: y1 - y0, k: Math.max(ownPart(st, id), f), f };
  });
  const dim = Math.max(0, ...spots.map((p) => p.f));
  return (
    <Reveal p={st?.p ?? 0}>
      <div style={{ width, borderRadius: 14, overflow: 'hidden', background: '#fff', boxShadow: '0 24px 60px rgb(0 0 0 / 0.45), 0 0 0 1px rgb(255 255 255 / 0.12)' }}>
        <div style={{ height: BAR, display: 'flex', alignItems: 'center', gap: 7, padding: '0 14px', background: '#e9e8f2', borderBottom: '1px solid #d6d4e4' }}>
          {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
            <span key={c} style={{ width: 11, height: 11, borderRadius: 6, background: c }} />
          ))}
          <span style={{ marginLeft: 14, flex: 1, maxWidth: 520, height: 22, borderRadius: 11, background: '#fff', color: '#55536e', fontSize: 13, lineHeight: '22px', padding: '0 12px', textAlign: 'left', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
            {el.url}
          </span>
        </div>
        <div style={{ position: 'relative', width, height, overflow: 'hidden' }}>
          <img src={shot.src} alt="" style={{ position: 'absolute', left: -vx * s, top: -vy * s, width: shot.width * s, height: shot.height * s, maxWidth: 'none' }} />
          <svg width={width} height={height} style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
            {dim > 0 && (
              <>
                <mask id={`${el.id}-mask`}>
                  <rect width={width} height={height} fill="#fff" />
                  {spots.map((p) => (
                    <rect key={p.id} x={p.x} y={p.y} width={p.w} height={p.h} rx={10} fill="#000" fillOpacity={p.f} />
                  ))}
                </mask>
                <rect width={width} height={height} fill="#0d0c24" fillOpacity={0.45 * dim} mask={`url(#${el.id}-mask)`} />
              </>
            )}
            {spots.map((p) => {
              if (p.k <= 0) return null;
              // The ring closes in on its spot as it appears.
              const grow = (1 - clamp01(p.k)) * 14;
              return (
                <rect key={p.id} x={p.x - grow} y={p.y - grow} width={p.w + 2 * grow} height={p.h + 2 * grow} rx={10} fill="none" stroke={TONES.theta} strokeWidth={3.5} strokeOpacity={clamp01(p.k)} />
              );
            })}
          </svg>
        </div>
      </div>
    </Reveal>
  );
}
