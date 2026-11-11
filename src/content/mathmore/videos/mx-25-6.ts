import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'mx-25-6',
  lessonId: 'mx-25-6',
  title: 'Longitude and Latitude',
  thumbnail: 'm',
  summary: 'Latitude is the angle north or south of the equator, and longitude is the angle east or west of Greenwich. Along a meridian or the equator, the distance is (θ/360) × 2πR, with θ the difference of the angles on the same side and the sum on opposite sides. A parallel of latitude θ has radius R cos θ, so distances along it are multiplied by cos θ. 15° of longitude is one hour of local time.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Circles, Solids and the Earth', title: 'Longitude and Latitude', subtitle: 'Distances on the Earth' }],
      lines: [
        { say: 'A ship’s navigator and a phone’s map both describe a place on the Earth with two angles.', show: 'title' },
        { say: 'In this video, you will learn what those angles mean, and how to use them to find the distance between two places.' },
      ],
    },
    {
      chapter: 'Two angles',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Latitude and longitude', md: '**Latitude**: the angle north or south of the equator, $0°$ to $90°$. **Longitude**: the angle east or west of the Greenwich meridian, $0°$ to $180°$.' },
        { kind: 'callout', id: 'gc', tone: 'definition', title: 'Great circle', md: 'A circle on the sphere whose centre is the centre of the sphere, such as the equator or a meridian. Its radius is $R$. Other circles are **small circles**.' },
      ],
      lines: [
        { say: 'The latitude of a place is its angle north or south of the equator, measured at the centre of the Earth. The longitude is its angle east or west of the Greenwich meridian. We write the latitude first.', show: 'def' },
        { say: 'A great circle has the same centre as the Earth, so its radius is the radius of the Earth. The equator and every meridian lie on great circles. The other parallels of latitude are small circles.', show: 'gc' },
        { say: 'In this lesson we take the radius of the Earth as six thousand four hundred kilometres.' },
      ],
    },
    {
      chapter: 'Along a meridian',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{distance} = \\dfrac{\\theta}{360} \\times 2\\pi R', '50°\\text{N} \\text{ and } 15°\\text{N}: \\ \\theta = 50° - 15° = 35°', '25°\\text{N} \\text{ and } 10°\\text{S}: \\ \\theta = 25° + 10° = 35°', '\\dfrac{35}{360} \\times 2\\pi \\times 6400 \\approx 3910 \\text{ km}'] },
        { kind: 'text', id: 'nm', md: '$1°$ of a great circle is $60$ nautical miles.', size: 'md' },
      ],
      lines: [
        { say: 'Two places on the same meridian are separated by an angle at the centre of the Earth. The distance between them is that fraction of the circumference of a great circle.', show: 'm.0', focus: 'm.0' },
        { say: 'If both places are on the same side of the equator, the angle is the difference of their latitudes: fifty minus fifteen is thirty-five degrees.', show: 'm.1', focus: 'm.1' },
        { say: 'If one is north and the other south, the angle is the sum: twenty-five plus ten is also thirty-five degrees.', show: 'm.2', focus: 'm.2' },
        { say: 'Either way, the distance is thirty-five over three hundred and sixty of the circumference, about three thousand nine hundred and ten kilometres.', show: 'm.3', focus: 'm.3' },
        { say: 'Sailors use nautical miles. One degree of a great circle is sixty nautical miles.', show: 'nm' },
      ],
    },
    {
      chapter: 'Along a parallel',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['r = R\\cos\\theta', '\\text{distance} = \\dfrac{\\alpha}{360} \\times 2\\pi R\\cos\\theta', '\\dfrac{60}{360} \\times 2\\pi \\times 6400 \\times \\cos 40° \\approx 5134 \\text{ km}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Do not forget the cosine', md: 'Without $\\cos\\theta$ the answer is the distance along the equator, which is too long.' },
      ],
      lines: [
        { say: 'A parallel of latitude is a smaller circle. Its radius is R times the cosine of the latitude.', show: 'm.0', focus: 'm.0' },
        { say: 'For two places on the same parallel, the angle alpha is the difference or sum of their longitudes, and the distance is that fraction of the parallel’s circumference.', show: 'm.1', focus: 'm.1' },
        { say: 'Two towns at forty degrees north are at ten degrees west and fifty degrees east. One is west and one is east, so the angle is sixty degrees. The distance is about five thousand one hundred and thirty-four kilometres.', show: 'm.2', focus: 'm.2' },
        { say: 'Do not forget the cosine. Without it, you get the distance along the equator, which is too long.', show: 'oops' },
      ],
    },
    {
      chapter: 'Longitude and time',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['360° \\div 24 = 15° \\text{ per hour}', '30°\\text{W} \\text{ and } 45°\\text{E}: \\ 75° \\div 15 = 5 \\text{ hours}'] },
      ],
      lines: [
        { say: 'The Earth turns through three hundred and sixty degrees in twenty-four hours, which is fifteen degrees each hour.', show: 'm.0', focus: 'm.0' },
        { say: 'So each fifteen degrees of longitude is one hour of local time, and places to the east are ahead. From thirty degrees west to forty-five degrees east is seventy-five degrees, which is five hours.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find the radius of the parallel of latitude $60°$N. Take $R = 6400$ km.',
          choices: ['$3200$ km', '$5543$ km', '$6400$ km', '$1600$ km'],
          answer: 0,
          working: '$r = R\\cos\\theta = 6400 \\times \\cos 60° = 6400 \\times 0.5 = 3200$ km.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the radius of the parallel of latitude sixty degrees north. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The radius is six thousand four hundred times cos sixty degrees, which is a half, so it is three thousand two hundred kilometres. Choice B uses the sine instead of the cosine.', show: 'q.answer' },
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
          items: ['Latitude: north or south of the equator. Longitude: east or west of Greenwich.', 'Great circles: distance $= \\dfrac{\\theta}{360} \\times 2\\pi R$.', 'A parallel of latitude $\\theta$ has radius $R\\cos\\theta$.', '$1°$ is $60$ nautical miles; $15°$ of longitude is $1$ hour.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Latitude is the angle north or south of the equator, and longitude is the angle east or west of Greenwich.', show: 'sum.0' },
        { say: 'Along a meridian or the equator, the distance is the fraction theta over three hundred and sixty of two pi R.', show: 'sum.1' },
        { say: 'A parallel of latitude theta has radius R cos theta, so distances along it use that smaller radius.', show: 'sum.2' },
        { say: 'One degree of a great circle is sixty nautical miles, and fifteen degrees of longitude is one hour of local time. See you in the next lesson!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
