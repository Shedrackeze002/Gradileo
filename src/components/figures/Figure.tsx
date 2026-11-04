import type { Figure as FigureSpec } from '@engine/types.ts';
import { cn } from '@/lib/cn.ts';
import { PlaneFigure } from './PlaneFigure.tsx';
import { RightTriangle, TwoTriangles } from './TriangleFigures.tsx';
import { SolidFigure } from './SolidFigure.tsx';
import { AreaModel, ArrowDiagram, Caliper, NumberLine, Ruler, TableFig } from './MiscFigures.tsx';
import { BarChart, BoxPlot, CircleGraph, DotPlot } from './ChartFigures.tsx';
import { CubesFigure } from './CubesFigure.tsx';

function Inner({ fig }: { fig: FigureSpec }) {
  switch (fig.type) {
    case 'plane':
      return <PlaneFigure fig={fig} />;
    case 'rightTriangle':
      return <RightTriangle fig={fig} />;
    case 'twoTriangles':
      return <TwoTriangles fig={fig} />;
    case 'solid':
      return <SolidFigure fig={fig} />;
    case 'numberLine':
      return <NumberLine fig={fig} />;
    case 'ruler':
      return <Ruler fig={fig} />;
    case 'caliper':
      return <Caliper fig={fig} />;
    case 'areaModel':
      return <AreaModel fig={fig} />;
    case 'arrowDiagram':
      return <ArrowDiagram fig={fig} />;
    case 'table':
      return <TableFig fig={fig} />;
    case 'barChart':
      return <BarChart fig={fig} />;
    case 'circleGraph':
      return <CircleGraph fig={fig} />;
    case 'cubes':
      return <CubesFigure fig={fig} />;
    case 'dotPlot':
      return <DotPlot fig={fig} />;
    case 'boxPlot':
      return <BoxPlot fig={fig} />;
  }
}

export function Figure({ fig, className, compact }: { fig: FigureSpec; className?: string; compact?: boolean }) {
  const narrow = fig.type === 'plane' || fig.type === 'rightTriangle' || fig.type === 'solid' || fig.type === 'twoTriangles' || fig.type === 'cubes';
  return (
    <figure className={cn('my-1 rounded-2xl border border-line bg-surface p-3', compact && 'p-2', className)}>
      <div className={cn('mx-auto', narrow && (compact ? 'max-w-[260px]' : 'max-w-[420px]'))}>
        <Inner fig={fig} />
      </div>
      {fig.type === 'solid' || fig.type === 'rightTriangle' || fig.type === 'twoTriangles' || (fig.type === 'plane' && fig.notToScale) ? <figcaption className="mt-1 text-center text-[11px] text-ink-3">Diagram not to scale</figcaption> : null}
    </figure>
  );
}
