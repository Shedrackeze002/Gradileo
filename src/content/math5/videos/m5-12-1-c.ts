import type { Explainer } from '@/video/script.ts';
import { barGraph } from '@/video/charts.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm5-12-1-c',
  lessonId: 'm5-12-1',
  title: 'Frequency and the Mode, Part 3: One Mode, Two Modes or None',
  thumbnailTitle: 'Two Modes, or None',
  thumbnail: 'two',
  summary: 'Data can have one mode, more than one mode, or no mode. Votes for a season of Winter 5, Spring 8, Summer 8 and Fall 4 have two modes, Spring and Summer; when every category has the same frequency, there is no mode.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Frequency and Data · Part 3', title: 'One Mode, Two Modes or None', subtitle: 'When there is a tie' }],
      lines: [
        { say: 'Does every set of data have exactly one winner? Not always! Sometimes there is a tie, and sometimes there is no winner at all.', show: 'title' },
        { say: 'In this video, you will find data with one mode, two modes, or no mode.' },
      ],
    },
    {
      chapter: 'Three cases',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Frequencies', 'Mode'],
          rows: [
            ['Hockey $7$, Soccer $5$, Swimming $3$', 'One mode: Hockey'],
            ['Hockey $6$, Soccer $6$, Swimming $3$', 'Two modes: Hockey and Soccer'],
            ['Hockey $4$, Soccer $4$, Swimming $4$', 'No mode'],
          ],
        },
      ],
      lines: [
        { say: 'Here are three classes that voted for their favourite sport.', show: 't' },
        { say: 'In the first class, hockey got seven votes, soccer five, and swimming three. Hockey has the greatest frequency, so there is one mode: hockey.', focus: 't.0' },
        { say: 'In the second class, hockey and soccer both got six votes, and swimming got three. Two categories tie for the greatest frequency, so there are two modes: hockey and soccer.', focus: 't.1' },
        { say: 'In the third class, every sport got four votes. No answer is more common than the others, so there is no mode.', focus: 't.2' },
      ],
    },
    {
      chapter: 'Two modes',
      layout: 'split',
      leftWidth: 700,
      left: [figure('two', [barGraph({ categories: ['Winter', 'Spring', 'Summer', 'Fall'], values: [5, 8, 8, 4], max: 10, step: 1, height: 4.5, titles: { x: 'Season', y: 'Votes' } })])],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A class voted for a season: Winter $5$, Spring $8$, Summer $8$, Fall $4$. What is the mode?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{greatest frequency: } 8', '\\text{Spring and Summer}', '\\text{two modes}'] },
      ],
      lines: [
        { say: 'A class voted for their favourite season. Winter got five votes, spring eight, summer eight, and fall four.', show: ['q', 'two.scale', 'two.b0', 'two.b1', 'two.b2', 'two.b3'] },
        { say: 'First, find the greatest frequency. The tallest bars reach eight.', show: ['two.r1', 'two.r2', 'm.0'], focus: ['two.b1', 'two.b2', 'm.0'] },
        { say: 'But two categories have eight votes: spring and summer. They are tied.', show: ['two.v1', 'two.v2', 'm.1'], focus: 'm.1' },
        { say: 'So there are two modes, spring and summer. When categories tie for the greatest frequency, they are all modes.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'No mode',
      layout: 'split',
      leftWidth: 700,
      left: [figure('none', [barGraph({ categories: ['Hockey', 'Soccer', 'Swimming'], values: [4, 4, 4], max: 6, step: 1, height: 4, titles: { x: 'Sport', y: 'Votes' } })])],
      right: [{ kind: 'callout', id: 'key', tone: 'key', title: 'No mode', md: 'If every category has the same frequency, no answer is more common than the others, so there is **no mode**.' }],
      lines: [
        { say: 'Here is the third class as a bar graph. Every bar is the same height: four votes each.', show: ['none.scale', 'none.b0', 'none.b1', 'none.b2', 'none.v0', 'none.v1', 'none.v2'] },
        { say: 'No answer is more common than the others. So there is no mode.', show: 'key' },
        { say: 'Be careful: no mode does not mean the mode is zero. It means that no category stands out above the rest.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Votes for a team colour: Red $6$, Blue $9$, Green $9$, Yellow $3$. What is the mode?',
          choices: ['Blue and Green', 'Blue', 'No mode', '$9$'],
          answer: 0,
          working: 'The greatest frequency is $9$, and two colours have it: Blue and Green. There are two modes.',
        },
      ],
      lines: [
        { say: 'Your turn. A class voted for a team colour: red got six votes, blue nine, green nine, and yellow three. What is the mode? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, blue and green. The greatest frequency is nine, and two colours have it, so there are two modes. Choice B misses the tie, because green also has nine votes.', show: 'q.answer' },
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
          items: ['One category with the greatest frequency: one mode.', 'Two or more categories tied for the greatest frequency: they are all modes.', 'Every category with the same frequency: no mode.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. If one category has the greatest frequency, there is one mode.', show: 'sum.0' },
        { say: 'If two or more categories tie for the greatest frequency, they are all modes.', show: 'sum.1' },
        { say: 'And if every category has the same frequency, there is no mode. In the next part, you will use the mode to answer questions. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
