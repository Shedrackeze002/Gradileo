import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'mx-29-2',
  lessonId: 'mx-29-2',
  title: 'Voronoi Diagrams',
  thumbnail: 'm',
  summary: 'A Voronoi diagram splits the plane into cells, one for each site, holding the points nearest to that site. A point belongs to the cell of its nearest site. Each edge is part of the perpendicular bisector of two sites: for A(2, 1) and B(6, 5) it is y = −x + 7. A vertex is equidistant from three sites, and the point furthest from its nearest site, inside the region, is at a vertex.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Mid-Ordinate Rule and Voronoi Diagrams', title: 'Voronoi Diagrams', subtitle: 'Who is nearest?' }],
      lines: [
        { say: 'Which water pump is closest to each house in a village? A Voronoi diagram answers that for every point at once.', show: 'title' },
        { say: 'In this video, you will learn what a Voronoi diagram is, how to find its edges and vertices, and how to use them.' },
      ],
    },
    {
      chapter: 'Cells and sites',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Voronoi diagram', md: 'Divides the plane around points called **sites** into **cells**. Each cell holds every point closer to its site than to any other. Cells meet along **edges**, and edges meet at **vertices**.' },
        { kind: 'text', id: 'q', md: 'Sites $A(1, 1)$, $B(7, 2)$ and $C(3, 8)$. Which cell is $(4, 3)$ in?', size: 'md' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['A: \\sqrt{9 + 4} \\approx 3.61', 'B: \\sqrt{9 + 1} \\approx 3.16', 'C: \\sqrt{1 + 25} \\approx 5.10'] },
      ],
      lines: [
        { say: 'A Voronoi diagram divides the plane around a set of points, called sites, into cells, one for each site. Each cell contains every point that is closer to its site than to any other site.', show: 'def' },
        { say: 'To decide which cell a point is in, find its distance to each site and pick the nearest.', show: 'q' },
        { say: 'The distance to A is about three point six one, and to B about three point one six.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'The distance to C is about five point one. B is nearest, so the point is in the cell of B.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Edges',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A point on the edge between two cells is the same distance from both sites, so each edge is part of a **perpendicular bisector**.', size: 'md' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['A(2, 1), \\ B(6, 5): \\ \\text{midpoint } (4, 3)', 'm_{AB} = \\dfrac{4}{4} = 1, \\quad m_{\\text{edge}} = {-1}', '3 = {-4} + c \\ \\Rightarrow \\ c = 7: \\quad y = {-x} + 7'] },
      ],
      lines: [
        { say: 'A point on the edge between two cells is equally far from both sites. The points that are equidistant from two sites lie on the perpendicular bisector of the line joining them, so each edge is part of a perpendicular bisector.', show: 'q' },
        { say: 'Let’s find the edge between A and B. The midpoint of AB has x equal to four and y equal to three.', show: 'm.0', focus: 'm.0' },
        { say: 'AB has gradient one, so the perpendicular edge has gradient negative one.', show: 'm.1', focus: 'm.1' },
        { say: 'Through the midpoint, c is seven. The edge lies on the line y equals negative x plus seven.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Vertices',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A vertex is equidistant from three sites: the centre of the circle through them. Inside a region, the point furthest from its nearest site is at a vertex.', size: 'md' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['V(4, 3), \\ A(1, {-1}): \\ VA = \\sqrt{3^2 + 4^2} = 5'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'A new site', md: 'Only the neighbouring cells change. Draw the new bisectors and erase the old edges inside the new cell.' },
      ],
      lines: [
        { say: 'A vertex where three cells meet is equally far from all three sites, so it lies on all three perpendicular bisectors. It is the centre of the circle through the three sites, and we find it by solving two bisector equations together.', show: 'q' },
        { say: 'This solves a common problem: where should something unwanted, like a noisy factory, go, so that it is as far as possible from the nearest site? Inside the region, the best place is at one of the vertices.' },
        { say: 'A vertex V is equidistant from three sites. Its distance from A is the square root of nine plus sixteen, which is five units. That is the radius of the largest circle with no site inside it.', show: 'm.0', focus: 'm.0' },
        { say: 'When a new site is added, only the cells next to it change.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Sites are at $P(0, 0)$ and $Q(6, 0)$. Which line is the edge between their cells?',
          choices: ['$y = 3$', '$x = 3$', '$y = x$', '$x = 6$'],
          answer: 1,
          working: 'The midpoint of $PQ$ is $(3, 0)$ and $PQ$ is horizontal, so the perpendicular bisector is the vertical line $x = 3$.',
        },
      ],
      lines: [
        { say: 'Your turn. Two sites are on the x-axis, at zero and at six. Which line is the edge between their cells? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. The midpoint has x equal to three, and the sites lie on a horizontal line, so the perpendicular bisector is the vertical line x equals three. Choice A is horizontal, which is parallel to the line joining the sites.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'sum',
          check: true,
          items: ['Each cell holds the points nearest to its site.', 'Edges are parts of perpendicular bisectors.', 'A vertex is equidistant from three sites.', 'The point furthest from its nearest site is at a vertex.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Each cell of a Voronoi diagram holds the points nearest to its site.', show: 'sum.0' },
        { say: 'The edges are parts of perpendicular bisectors.', show: 'sum.1' },
        { say: 'A vertex is equally far from three sites.', show: 'sum.2' },
        { say: 'And inside the region, the point furthest from its nearest site is at a vertex of the diagram. See you in the next lesson!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
