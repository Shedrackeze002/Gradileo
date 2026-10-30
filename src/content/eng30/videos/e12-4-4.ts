import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e12-4-4',
  lessonId: 'e12-4-4',
  title: 'Statistics and Causal Reasoning',
  thumbnailTitle: 'Statistics and Causes',
  thumbnail: false,
  summary:
    'True figures can still mislead. Learn five ways they do, why a relative change can hide a tiny absolute one, and four errors to check before accepting that one thing causes another.',
  scenes: [
    {
      layout: 'center',
      main: [
        { kind: 'title', id: 'title', kicker: 'Rhetoric and Argument', title: 'Statistics and Causal Reasoning', subtitle: 'When true figures mislead' },
        {
          kind: 'bullets',
          id: 'b',
          items: ['**The advert**: the Spark’s bar is three times as tall as the Volt’s', '**The truth**: the phones last 10 and 9.6 hours'],
        },
      ],
      lines: [
        { say: 'A phone advert shows two bars. The bar for the Spark is three times as tall as the bar for its rival, the Volt.', show: ['title', 'b.0'] },
        { say: 'Only the small print on the axis tells the truth. It starts at 9.4 hours, and the two phones last 9.6 and 10 hours. Every number was true, and the picture was still a lie. Today you will learn how true figures mislead.', show: 'b.1' },
      ],
    },
    {
      chapter: 'How true figures mislead',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Truncated axis**: a small gap looks huge',
            '**Cherry-picked window**: only the helpful stretch of time',
            '**Missing base**: “doubled” with no numbers behind it',
            '**Misleading average**: a few extremes drag the mean',
            '**Biased sample**: too small or narrow for the claim',
          ],
        },
      ],
      lines: [
        { say: 'A truncated axis starts above zero. A cherry-picked window shows only the stretch of time that suits the claim. A missing base reports a relative change without the small numbers behind it.', show: ['b.0', 'b.1', 'b.2'] },
        { say: 'A misleading average hides how a few extreme values drag the mean. A firm with one very rich owner has a high mean but a low median. And a biased sample is too narrow to speak for everyone.', show: ['b.3', 'b.4'] },
      ],
    },
    {
      chapter: 'Relative and absolute change',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['**Relative**: 2 in 1,000 to 3 in 1,000 is a 50% rise', '**Absolute**: that is one more person in 1,000'],
        },
        { kind: 'text', id: 't', size: 'md', md: 'Ask: **out of how many?**' },
      ],
      lines: [
        { say: 'A headline says a medicine raises the risk of headaches by fifty percent. A relative change compares the new figure with the old one.', show: 'b.0' },
        { say: 'An absolute change is the actual difference. If two in a thousand have headaches without the medicine, and three in a thousand with it, the absolute rise is one person in a thousand.', show: 'b.1' },
        { say: 'So whenever you see a percentage change, ask, out of how many?', show: 't', focus: 't' },
      ],
    },
    {
      chapter: 'Reasoning about causes',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Reverse causation**: the arrow runs the other way',
            '**Confounding factor**: a third thing causes both',
            '**Survivorship bias**: only the survivors are counted',
            '**Base-rate neglect**: no sense of how common it is',
          ],
        },
      ],
      lines: [
        { say: 'Before you accept that one thing causes another, check four errors. Reverse causation means the cause may run the other way. Patients who take the most pain tablets report the most pain, because pain is what makes them take the tablets.', show: 'b.0' },
        { say: 'A confounding factor is a third thing that causes both. Towns with more dentists have more traffic accidents, because bigger towns have more dentists and more traffic.', show: 'b.1', focus: 'b.1' },
        { say: 'Survivorship bias counts only the cases that survived. In the Second World War, Abraham Wald saw that the armour belonged where the returning bombers had no holes, because planes hit there never came back.', show: 'b.2' },
        { say: 'And base-rate neglect forgets how common something is overall.', show: 'b.3' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Calling every link a confounder', md: 'Before you name a third factor, ask whether the cause could simply run **backwards**.' },
      ],
      lines: [
        { say: 'Here is a common mistake. Do not call every link a confounder.', show: 'm' },
        { say: 'Before you name a third factor, ask whether the cause could simply run backwards.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Families with more fire extinguishers have had more house fires. What is the best explanation?',
          choices: [
            'A confounding factor: bigger houses have both more extinguishers and more fires.',
            'Reverse causation: a fire led families to buy more extinguishers.',
            'Survivorship bias: only houses that burned down were counted.',
            'Base-rate neglect: most houses never had an extinguisher.',
          ],
          answer: 1,
          working: 'The cause may run backwards. A house fire is what led the family to buy extinguishers, so no third factor is needed.',
        },
      ],
      lines: [
        { say: 'Your turn. Families with more fire extinguishers have had more house fires. What is the best explanation? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is B. The cause may run backwards. A house fire is what led the family to buy extinguishers, so no third factor is needed.', show: 'q2.answer' },
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
          items: [
            'True figures mislead through axes, windows, bases, averages and samples.',
            'A relative change can hide a tiny absolute one.',
            'Check reverse causation, confounders, survivors and base rates.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. True figures can mislead in five ways, from a truncated axis to a biased sample.', show: 'sum.0' },
        { say: 'A relative change can hide a tiny absolute change, so always ask, out of how many?', show: 'sum.1' },
        { say: 'And before accepting a cause, check for reverse causation, a confounding factor, survivorship bias and base-rate neglect.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
