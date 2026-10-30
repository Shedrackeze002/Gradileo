/** The elements of an explainer scene, each drawn from its state at the current frame. */
import type { CSSProperties, ReactNode } from 'react';
import type { BulletsEl, CalcEl, CalloutEl, MathEl, QuoteEl, TableEl, TextEl, TitleEl, TryEl } from '../script.ts';
import { ownPart, partShown, type ElState } from '../timeline.ts';
import { rich, tex, TONES } from './tex.ts';

const clamp01 = (x: number) => Math.max(0, Math.min(1, x));

/** Fades and lifts an element in as it appears. */
export function Reveal({ p, children, style, rise = 18 }: { p: number; children: ReactNode; style?: CSSProperties; rise?: number }) {
  return <div style={{ opacity: clamp01(p), transform: `translateY(${(1 - clamp01(p)) * rise}px)`, ...style }}>{children}</div>;
}

const html = (h: string) => ({ dangerouslySetInnerHTML: { __html: h } });

export function TitleView({ el, st }: { el: TitleEl; st?: ElState }) {
  const p = st?.p ?? 0;
  return (
    <Reveal p={p} style={{ textAlign: 'center' }}>
      <div className="v-display" style={{ color: TONES.brand, fontSize: 22, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600 }}>
        {el.kicker}
      </div>
      <h1 className="v-display v-rich" style={{ fontSize: 72, lineHeight: 1.08, fontWeight: 700, margin: '18px auto 0', maxWidth: 1040 }} {...html(rich(el.title))} />
      <div style={{ height: 6, width: 180 * clamp01((p - 0.3) / 0.7), margin: '28px auto 0', borderRadius: 3, background: `linear-gradient(90deg, ${TONES.brand}, ${TONES.adj})` }} />
      {el.subtitle && <p className="v-rich" style={{ fontSize: 30, color: 'rgb(var(--v-ink-2))', margin: '26px auto 0', maxWidth: 900, lineHeight: 1.35 }} {...html(rich(el.subtitle))} />}
    </Reveal>
  );
}

const TEXT_SIZE = { xl: 42, lg: 34, md: 28 } as const;

export function TextView({ el, st, center }: { el: TextEl; st?: ElState; center: boolean }) {
  return (
    <Reveal p={st?.p ?? 0}>
      <p className="v-rich" style={{ fontSize: TEXT_SIZE[el.size ?? 'lg'], lineHeight: 1.4, margin: 0, textAlign: (el.align ?? (center ? 'center' : 'left')) as CSSProperties['textAlign'], maxWidth: center ? 1000 : undefined, marginInline: center ? 'auto' : undefined }} {...html(rich(el.md))} />
    </Reveal>
  );
}

const QUOTE_SIZE = { lg: 34, md: 28 } as const;

export function QuoteView({ el, st }: { el: QuoteEl; st?: ElState }) {
  return (
    <Reveal p={st?.p ?? 0}>
      <figure style={{ margin: 0, maxWidth: 1060, textAlign: 'left', borderLeft: `6px solid ${TONES.brand}`, padding: '10px 0 10px 32px' }}>
        <div style={{ fontSize: QUOTE_SIZE[el.size ?? 'lg'], lineHeight: 1.45, fontStyle: 'italic' }}>
          {el.lines.map((line, i) => (
            <div key={i} className="v-rich" style={{ opacity: clamp01(partShown(st, String(i)) * 2) }} {...html(rich(line))} />
          ))}
        </div>
        {el.by && (
          <figcaption style={{ marginTop: 16, fontSize: 22, opacity: 0.7 }} {...html(rich(`— ${el.by}`))} />
        )}
      </figure>
    </Reveal>
  );
}

const MATH_SIZE = { xl: 54, lg: 42, md: 34 } as const;

export function MathView({ el, st, center }: { el: MathEl; st?: ElState; center: boolean }) {
  const left = (el.align ?? (center ? 'center' : 'left')) === 'left';
  return (
    <div className="v-math" style={{ fontSize: MATH_SIZE[el.size ?? 'lg'], display: 'flex', flexDirection: 'column', gap: 8, alignItems: left ? 'flex-start' : 'center' }}>
      {el.lines.map((line, i) => {
        const k = partShown(st, String(i));
        const f = st?.focus[String(i)] ?? 0;
        return (
          <div key={i} style={{ position: 'relative', padding: '10px 18px', opacity: clamp01(k * 2), clipPath: `inset(-20px ${(1 - k) * 100}% -20px -20px)` }}>
            <div style={{ position: 'absolute', inset: 0, borderRadius: 14, background: `rgb(255 209 102 / ${0.12 * f})`, boxShadow: `inset 0 0 0 ${2 * f}px rgb(255 209 102 / ${0.55 * f})` }} />
            <div style={{ position: 'relative' }} {...html(tex(line, true))} />
          </div>
        );
      })}
    </div>
  );
}

export function BulletsView({ el, st }: { el: BulletsEl; st?: ElState }) {
  return (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 1000 }}>
      {el.items.map((item, i) => {
        const k = partShown(st, String(i));
        const f = st?.focus[String(i)] ?? 0;
        return (
          <li key={i} style={{ display: 'flex', gap: 18, alignItems: 'baseline', opacity: clamp01(k), transform: `translateX(${(1 - k) * 24}px)`, fontSize: 30, lineHeight: 1.38 }}>
            {el.check ? (
              <span style={{ flex: 'none', width: 34, height: 34, borderRadius: 10, background: `rgb(52 211 153 / 0.18)`, color: TONES.good, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 800, transform: 'translateY(4px)' }}>✓</span>
            ) : (
              <span style={{ flex: 'none', width: 12, height: 12, borderRadius: 6, background: TONES.brand, transform: 'translateY(-4px)', boxShadow: `0 0 ${12 * f}px ${TONES.brand}` }} />
            )}
            <span className="v-rich" style={{ textAlign: 'left' }} {...html(rich(item))} />
          </li>
        );
      })}
    </ul>
  );
}

const CALLOUT: Record<CalloutEl['tone'], { color: string; label: string }> = {
  definition: { color: TONES.brand, label: 'Definition' },
  mistake: { color: TONES.bad, label: 'Watch out' },
  tip: { color: TONES.theta, label: 'Tip' },
  key: { color: TONES.good, label: 'Key idea' },
};

export function CalloutView({ el, st }: { el: CalloutEl; st?: ElState }) {
  const c = CALLOUT[el.tone];
  return (
    <Reveal p={st?.p ?? 0}>
      <div className="v-card" style={{ padding: '24px 30px', borderLeft: `6px solid ${c.color}`, textAlign: 'left', maxWidth: 1020 }}>
        <div className="v-display" style={{ color: c.color, fontSize: 18, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>
          {c.label} · {el.title}
        </div>
        <div className="v-rich v-math" style={{ fontSize: 30, lineHeight: 1.42, marginTop: 10 }} {...html(rich(el.md))} />
      </div>
    </Reveal>
  );
}

export function TableView({ el, st }: { el: TableEl; st?: ElState }) {
  const cols = el.head.length;
  const cell: CSSProperties = { padding: '12px 16px', textAlign: 'center' };
  return (
    <Reveal p={st?.p ?? 0}>
      <div className="v-card" style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, auto)`, overflow: 'hidden', fontSize: 28, fontVariantNumeric: 'tabular-nums', justifySelf: 'start' }}>
        {el.head.map((h, i) => (
          <div key={i} className="v-rich v-display" style={{ ...cell, fontSize: 18, color: 'rgb(var(--v-ink-3))', borderBottom: '1px solid rgb(255 255 255 / 0.12)', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }} {...html(rich(h))} />
        ))}
        {el.rows.map((row, r) => {
          const k = partShown(st, String(r));
          const f = st?.focus[String(r)] ?? 0;
          return row.map((c, i) => <div key={`${r}-${i}`} className="v-rich" style={{ ...cell, opacity: k, background: `rgb(255 209 102 / ${0.1 * f})` }} {...html(rich(c))} />);
        })}
      </div>
    </Reveal>
  );
}

export function CalcView({ el, st }: { el: CalcEl; st?: ElState }) {
  const p = st?.p ?? 0;
  // Type the keys at an even pace (the reveal is eased), then show the result.
  const lin = 1 - Math.cbrt(1 - clamp01(p));
  const typed = el.keys.slice(0, Math.round(el.keys.length * clamp01(lin / 0.7)));
  const result = clamp01((lin - 0.75) / 0.2);
  return (
    <Reveal p={Math.min(1, p * 4)}>
      <div className="v-card" style={{ width: 520, padding: 22, background: 'linear-gradient(180deg, rgb(255 255 255 / 0.09), rgb(255 255 255 / 0.04))' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, color: 'rgb(var(--v-ink-3))', marginBottom: 12 }}>
          <span className="v-display">Calculator</span>
          <span style={{ color: TONES.good, fontWeight: 700, border: `1px solid ${TONES.good}`, borderRadius: 6, padding: '0 8px' }}>DEG</span>
        </div>
        <div style={{ borderRadius: 14, background: '#07071a', padding: '16px 22px', textAlign: 'left' }}>
          <div className="v-mono" style={{ fontSize: 30, color: 'rgb(var(--v-ink-2))', minHeight: 40 }}>
            {typed}
            {result === 0 && <span style={{ opacity: 0.8 }}>▏</span>}
          </div>
          <div className="v-mono" style={{ fontSize: 44, fontWeight: 700, textAlign: 'right', color: TONES.good, opacity: result }}>
            {el.result}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function TryView({ el, st }: { el: TryEl; st?: ElState }) {
  const p = st?.p ?? 0;
  const ans = ownPart(st, 'answer');
  const timer = st?.timer;
  const R = 26;
  const C = 2 * Math.PI * R;
  return (
    <Reveal p={p}>
      <div className="v-card" style={{ width: 980, padding: '28px 34px', textAlign: 'left', border: `2px solid rgb(167 139 250 / 0.55)`, background: 'linear-gradient(160deg, rgb(167 139 250 / 0.16), rgb(255 255 255 / 0.04))' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="v-display" style={{ color: TONES.brand, fontSize: 20, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700 }}>
            Your turn
          </div>
          {timer !== undefined && ans === 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, color: 'rgb(var(--v-ink-2))', fontSize: 20 }}>
              Pause the video and try it
              <svg width={64} height={64} viewBox="0 0 64 64">
                <circle cx={32} cy={32} r={R} fill="none" stroke="rgb(255 255 255 / 0.15)" strokeWidth={6} />
                <circle cx={32} cy={32} r={R} fill="none" stroke={TONES.brand} strokeWidth={6} strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * timer} transform="rotate(-90 32 32)" />
              </svg>
            </div>
          )}
        </div>
        <div className="v-rich" style={{ fontSize: 32, lineHeight: 1.4, marginTop: 14 }} {...html(rich(el.prompt))} />
        {el.choices && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 22 }}>
            {el.choices.map((c, i) => {
              const right = el.answer === i;
              return (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    gap: 16,
                    alignItems: 'center',
                    padding: '14px 18px',
                    borderRadius: 16,
                    fontSize: 28,
                    border: `2px solid ${right && ans > 0 ? `rgb(52 211 153 / ${ans})` : 'rgb(255 255 255 / 0.14)'}`,
                    background: right ? `rgb(52 211 153 / ${0.16 * ans})` : 'rgb(255 255 255 / 0.04)',
                    opacity: right ? 1 : 1 - 0.55 * ans,
                  }}
                >
                  <span className="v-display" style={{ flex: 'none', width: 38, height: 38, borderRadius: 10, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 700, background: right && ans > 0 ? TONES.good : 'rgb(255 255 255 / 0.1)', color: right && ans > 0 ? '#0d0c24' : 'rgb(var(--v-ink-2))' }}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="v-rich" {...html(rich(c))} />
                </div>
              );
            })}
          </div>
        )}
        {typeof el.answer === 'string' && (
          <div className="v-rich" style={{ marginTop: 20, fontSize: 32, opacity: ans, color: TONES.good, fontWeight: 700 }} {...html(rich(`Answer: ${el.answer}`))} />
        )}
        {el.working && <div className="v-rich" style={{ marginTop: 16, fontSize: 26, lineHeight: 1.4, color: 'rgb(var(--v-ink-2))', opacity: ans }} {...html(rich(el.working))} />}
      </div>
    </Reveal>
  );
}
