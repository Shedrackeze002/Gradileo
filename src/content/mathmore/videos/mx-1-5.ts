import type { Explainer } from '@/video/script.ts';

const PETS = { kind: 'table' as const, id: 't', head: ['', 'Plays a sport', 'No sport', 'Total'], rows: [['Has a pet', '24', '16', '40'], ['No pet', '21', '39', '60'], ['Total', '45', '55', '100']] };

const video: Explainer = {
  id: 'mx-1-5',
  lessonId: 'mx-1-5',
  title: 'Two-Way Tables',
  thumbnail: false,
  summary: 'A two-way table counts data sorted by two categories, with totals for each row and column. A missing count is a total minus the others. Row percents, such as 60% of pet owners and 35% of the others playing a sport, can show an association, which is not the same as cause and effect.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Statistics and Data Displays', title: 'Two-Way Tables', subtitle: 'How two categories go together' }],
      lines: [
        { say: 'Some data are not numbers but categories: yes or no, walk or ride, Grade 7 or Grade 8.', show: 'title' },
        { say: 'In this video, you will learn to read and complete a two-way table, to work out percents from it, and to look for an association between two categories.' },
      ],
    },
    {
      chapter: 'Two-way tables',
      layout: 'center',
      main: [
        PETS,
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Two-way table', md: 'Counts data sorted by **two categories** at once: one down the side, one across the top. Each cell counts the people who fit **both** its row and its column.' },
      ],
      lines: [
        { say: 'One hundred students were asked two questions: do you have a pet, and do you play a sport? A two-way table counts their answers.', show: 't' },
        { say: 'One category runs down the side, in the rows, and the other runs across the top, in the columns. Each cell counts the people who fit both its row and its column.', show: 'def' },
        { say: 'So 24 students have a pet and play a sport.', focus: 't.0' },
        { say: 'The totals are at the end of each row and the foot of each column. Forty students have a pet altogether, 45 play a sport, and the grand total in the corner says that 100 were asked.', focus: ['t.0', 't.2'] },
      ],
    },
    {
      chapter: 'Completing a table',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['', 'Walk', 'Ride', 'Total'], rows: [['Grade 7', '30', '12', '42'], ['Grade 8', '20', '[[good:18]]', '38'], ['Total', '50', '30', '80']] },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Ride: } 80 - 50 = 30', '\\text{Grade 8 riders: } 30 - 12 = 18'] },
      ],
      lines: [
        { say: 'In a survey of eighty students, fifty walk to school. Thirty of the walkers and twelve of the others are in Grade 7. How many Grade 8 students ride?', show: 't' },
        { say: 'A missing count is a total minus the other counts in its row or column. The students who ride are eighty minus fifty, which is thirty.', show: 'm.0', focus: 'm.0' },
        { say: 'Twelve of those riders are in Grade 7, so thirty minus twelve, or eighteen, are in Grade 8.', show: 'm.1', focus: ['m.1', 't.1'] },
        { say: 'Check it: the Grade 8 walkers are fifty minus thirty, which is twenty. And thirty plus twelve plus twenty plus eighteen is eighty, the grand total.', focus: 't' },
      ],
    },
    {
      chapter: 'Relative frequencies',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Relative frequency', md: 'A count divided by a **total**, usually as a percent: the grand total, a **row** total or a **column** total, as the question asks.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{With a pet: } 24 \\div 40 = 0.6 = 60\\%', '\\text{No pet: } 21 \\div 60 = 0.35 = 35\\%'] },
      ],
      lines: [
        { say: 'Counts are hard to compare when the groups have different sizes. Dividing a count by a total gives a relative frequency, usually written as a percent.', show: 'def' },
        { say: 'Which total we divide by depends on the question. A percent of everyone divides by the grand total. A row percent divides by the row’s total, and a column percent by the column’s total.' },
        { say: 'In the pet and sport table, what percent of the students with a pet play a sport? There are forty pet owners, and 24 of them play a sport. Twenty-four divided by forty is 0.6, or sixty percent.', show: 'm.0', focus: 'm.0' },
        { say: 'Now the students without a pet. There are sixty, and 21 of them play a sport. Twenty-one divided by sixty is 0.35, or 35 percent.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Looking for an association',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Association', md: 'Row percents that are **far apart** suggest the categories are **associated**: knowing one tells us something about the other. That does **not** show that one causes the other.' },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Dividing by the wrong total', md: '“What percent of the students **with a pet** play a sport?” is about the pet owners only: divide by $40$, not by $100$ or $45$.' },
      ],
      lines: [
        { say: 'If the row percents are about the same, the row makes no difference to the column. If they are far apart, the two categories are associated: knowing one tells us something about the other.', show: 'key' },
        { say: 'Sixty percent against 35 percent is a big gap. It suggests that having a pet and playing a sport are associated in this group. But an association does not show that one causes the other.' },
        { say: 'A common mistake is to divide by the wrong total. A question about the students with a pet is about the pet owners only, so divide by their total, forty, not by 100 or by 45.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Of $50$ students who own a bike, $35$ walk to school. Of $50$ students who do not own a bike, $20$ walk. What percent of the bike owners walk?',
          choices: ['$35\\%$', '$55\\%$', '$40\\%$', '$70\\%$'],
          answer: 3,
          working: 'Divide by the bike owners’ total: $35 \\div 50 = 0.7 = 70\\%$.',
        },
      ],
      lines: [
        { say: 'Your turn. Of fifty students who own a bike, 35 walk to school. Of fifty students who do not own a bike, twenty walk. What percent of the bike owners walk? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. The question is about the bike owners only, so divide by their total, fifty. Thirty-five divided by fifty is 0.7, or seventy percent. Choice A divides by all 100 students.', show: 'q.answer' },
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
          items: ['A two-way table counts data sorted by two categories.', 'A missing count is a total minus the other counts in its row or column.', 'A relative frequency divides by the total the question asks about.', 'Row percents far apart suggest an association, not cause and effect.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A two-way table counts data sorted by two categories, and each row and column adds up to its total.', show: 'sum.0' },
        { say: 'A missing count is a total minus the other counts in its row or column.', show: 'sum.1' },
        { say: 'A relative frequency divides a count by a total: the grand total, a row total or a column total, as the question asks.', show: 'sum.2' },
        { say: 'And row percents that are far apart suggest an association, which is not the same as one thing causing the other. In the next lesson, we see which kinds of study can show cause and effect. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
