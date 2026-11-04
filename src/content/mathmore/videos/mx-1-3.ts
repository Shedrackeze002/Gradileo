import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'mx-1-3',
  lessonId: 'mx-1-3',
  title: 'Mean Absolute Deviation',
  thumbnail: false,
  summary: 'The mean absolute deviation (MAD) is the mean distance of the values from the mean. For 4, 7, 9, 10, 15 the mean is 9, the distances are 5, 2, 0, 1 and 6, and the MAD is 14 ÷ 5 = 2.8. A small MAD means the values sit close to the mean.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Statistics and Data Displays', title: 'Mean Absolute Deviation', subtitle: 'How far from the mean, on average?' }],
      lines: [
        { say: 'Two archers each score an average of eight points an arrow. One scores eight almost every time. The other’s arrows land anywhere from four to ten.', show: 'title' },
        { say: 'The mean is the same, but the archers are not. In this video, you will learn to measure how far the values are from the mean, with the mean absolute deviation.' },
      ],
    },
    {
      chapter: 'Distance from the mean',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Mean absolute deviation (MAD)', md: 'The mean of the **distances** of the values from the mean. 1. Find the mean. 2. Find each value’s distance from it. 3. Find the mean of those distances.' },
      ],
      lines: [
        { say: 'For each value, the deviation is how far it is from the mean. We care about the distance, not the direction. A value three below the mean and a value three above it are both three away.', show: 'def' },
        { say: 'The mean absolute deviation, or MAD, is the mean of those distances. There are three steps. Find the mean. Find the distance of each value from the mean. Then find the mean of those distances.' },
      ],
    },
    {
      chapter: 'Finding the MAD',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Value', 'Distance from the mean, 9'], rows: [['4', '5'], ['7', '2'], ['9', '0'], ['10', '1'], ['15', '6']] },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Mean} = \\dfrac{4 + 7 + 9 + 10 + 15}{5} = \\dfrac{45}{5} = 9', '\\text{Distances: } 5,\\ 2,\\ 0,\\ 1,\\ 6', '\\text{MAD} = \\dfrac{5 + 2 + 0 + 1 + 6}{5} = \\dfrac{14}{5} = 2.8'] },
      ],
      lines: [
        { say: 'Find the mean absolute deviation of four, seven, nine, ten and fifteen.', },
        { say: 'Step one: the mean. The values add up to 45, and there are five of them, so the mean is nine.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two: each value’s distance from nine. Four is five away. Seven is two away. Nine is zero away. Ten is one away, and fifteen is six away.', show: ['t', 'm.1'], focus: 'm.1' },
        { say: 'Step three: the mean of those distances. Five plus two plus zero plus one plus six is fourteen, and fourteen divided by five is 2.8.', show: 'm.2', focus: 'm.2' },
        { say: 'So the MAD is 2.8. On average, a value is 2.8 away from the mean.', focus: 'm' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Adding the signed deviations', md: 'The deviations $-5,\\ -2,\\ 0,\\ 1,\\ 6$ add up to $0$. They always do, because the mean is the balance point of the data. So the MAD uses **distances**, which are never negative.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['{-5} + ({-2}) + 0 + 1 + 6 = 0'] },
      ],
      lines: [
        { say: 'A common mistake is to keep the signs. Four is five below the mean, so its deviation is negative five. Seven’s is negative two.', show: 'oops' },
        { say: 'Add all the signed deviations: negative five, negative two, zero, one and six. They come to zero.', show: 'm.0', focus: 'm.0' },
        { say: 'They always add to zero, because the mean is the balance point of the data. That is why the MAD uses distances, the absolute values, which are never negative.' },
      ],
    },
    {
      chapter: 'What the MAD tells us',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['', 'Mean', 'MAD'], rows: [['Group A', '70', '3'], ['Group B', '70', '11']] },
        { kind: 'text', id: 'ans', md: 'Same centre, but Group B’s scores are much more **spread out**.', align: 'center' },
      ],
      lines: [
        { say: 'A small MAD means the values sit close to the mean, so the mean describes the data well. A large MAD means the values are spread out. The steady archer might have a MAD of 0.4 points, and the other a MAD of 1.8 points.' },
        { say: 'Group A’s test scores have a mean of seventy and a MAD of three. Group B’s have a mean of seventy and a MAD of eleven.', show: 't', focus: 't' },
        { say: 'Both groups score seventy on average. But Group A’s scores are typically only three points from seventy, while Group B’s are typically eleven points away.', focus: ['t.0', 't.1'] },
        { say: 'So the groups have the same centre, but Group B’s scores are much more spread out.', show: 'ans' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find the mean absolute deviation of $2,\\ 6,\\ 8,\\ 12$.',
          choices: ['$0$', '$7$', '$3$', '$10$'],
          answer: 2,
          working: 'Mean: $28 \\div 4 = 7$. Distances: $5, 1, 1, 5$. MAD: $12 \\div 4 = 3$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the mean absolute deviation of two, six, eight and twelve. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. The values add up to 28, so the mean is 28 divided by four, which is seven. The distances from seven are five, one, one and five. They add up to twelve, and twelve divided by four is three. Choice A adds the signed deviations, which always give zero.', show: 'q.answer' },
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
          items: ['The MAD is the mean distance of the values from the mean.', 'Find the mean, each value’s distance from it, then the mean of the distances.', 'Signed deviations always add to $0$, so use distances.', 'A small MAD: values close together. A large MAD: values spread out.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The mean absolute deviation is the mean distance of the values from the mean.', show: 'sum.0' },
        { say: 'Find the mean, then each value’s distance from it, then the mean of those distances.', show: 'sum.1' },
        { say: 'The signed deviations always add to zero, so we use distances instead.', show: 'sum.2' },
        { say: 'And a small MAD means the values are close together, while a large one means they are spread out. In the next lesson, we use the MAD to compare two groups. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
