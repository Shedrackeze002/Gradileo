import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { testTube } from './lib/c10-1-figures.ts';

const video: Explainer = {
  id: 'c10-1-5-c',
  lessonId: 'c10-1-5',
  title: 'Lab Safety and Hazard Symbols, Part 3: Protecting Yourself and Heating Safely',
  thumbnailTitle: 'Heating Safely',
  thumbnail: 'tt',
  summary:
    'Wear safety goggles, tie back long hair, never eat, drink or taste anything in a laboratory, and waft to smell. Heat a test tube in a holder, gently, with its open end pointing away from everyone; never heat a sealed container; use the yellow safety flame when a burner is not in use; keep flammable liquids away from flames; and put hot glass on a heat-proof mat.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Matter and the Particle Model · Part 3', title: 'Protecting Yourself and Heating Safely', subtitle: 'Rules that prevent accidents' }],
      lines: [
        { say: 'Most laboratory accidents come from a few simple mistakes. A few rules, followed every single time, prevent them, even when an experiment seems harmless.', show: 'title' },
        { say: 'In this part, you will learn how to protect yourself, and how to heat things safely. Part four covers handling chemicals and reporting accidents.' },
      ],
    },
    {
      chapter: 'Protect yourself',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            'Wear **safety goggles** whenever chemicals are heated, mixed or poured: over your eyes, not on your forehead.',
            '**Tie back long hair** and tuck in loose clothing before lighting a Bunsen burner.',
            '**Never eat, drink or taste** anything in a laboratory, and wash your hands at the end.',
            'To smell a substance, only when told to, **waft** a little vapour towards your nose.',
          ],
        },
      ],
      lines: [
        { say: 'First, protect yourself. Wear safety goggles whenever chemicals are being heated, mixed or poured, and keep them over your eyes, not pushed up on your forehead.', show: 'b.0' },
        { say: 'Tie back long hair, and tuck in loose clothing, before lighting a Bunsen burner, so that nothing can swing into the flame.', show: 'b.1' },
        { say: 'Never eat, drink or taste anything in a laboratory, and wash your hands at the end of every practical. Traces of chemicals can get onto food and into your mouth.', show: 'b.2' },
        { say: 'To smell a substance, and only when your teacher tells you to, hold it away from your face, and waft a little of the vapour towards your nose with your hand.', show: 'b.3' },
      ],
    },
    {
      chapter: 'Heating a test tube',
      layout: 'split',
      leftWidth: 600,
      left: [figure('tt', [testTube()])],
      right: [
        { kind: 'callout', id: 'tube', tone: 'key', title: 'Heating a liquid', md: 'Use a **test-tube holder**, heat **gently**, and point the open end **away from everyone**: the liquid can boil suddenly and shoot out.' },
        { kind: 'callout', id: 'seal', tone: 'mistake', title: 'Never heat a sealed container', md: 'The gas inside expands and can **burst** it.' },
      ],
      lines: [
        { say: 'When heating a liquid in a test tube, hold the tube in a test-tube holder, and heat it gently.', show: ['tt.tube', 'tt.holder', 'tt.flame', 'tube'] },
        { say: 'Point the open end away from yourself and everyone else. The liquid can boil suddenly, and shoot out of the tube.', show: 'tt.away', focus: 'tt.away' },
        { say: 'And never heat a container that is sealed. The gas inside expands as it warms, and can burst the container.', show: 'seal' },
      ],
    },
    {
      chapter: 'Flames and hot glass',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            'Burner not in use? Close the air hole for the yellow **safety flame**, or turn it off. Never leave a lit burner unattended.',
            'Keep **flammable liquids**, such as ethanol, well away from flames.',
            'Put hot glassware on a **heat-proof mat**: hot glass looks exactly like cold glass.',
          ],
        },
      ],
      lines: [
        { say: 'When a Bunsen burner is lit but not in use, close the air hole to give the yellow safety flame, or turn it off. The hot blue flame is hard to see, and someone could reach into it. Never leave a lit burner unattended.', show: 'b.0' },
        { say: 'Keep flammable liquids, such as ethanol, well away from flames: their vapour catches fire easily.', show: 'b.1' },
        { say: 'And put hot glassware down on a heat-proof mat. Hot glass looks exactly like cold glass, so nobody can tell by looking.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'You are heating a liquid in a test tube over a Bunsen burner. Which way should the open end of the tube point?',
          choices: [
            'Away from yourself and everyone else.',
            'Towards yourself, so that you can see inside.',
            'Towards your partner, who is watching.',
            'Straight up, with a stopper pushed in tightly.',
          ],
          answer: 0,
          working: 'A liquid heated in a narrow tube can boil suddenly and shoot out of the open end, so it must point away from everyone. A stoppered tube could burst as the gas inside expands.',
        },
      ],
      lines: [
        { say: 'Your turn. You are heating a liquid in a test tube over a Bunsen burner. Which way should the open end of the tube point? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A: away from yourself and everyone else, because the liquid can boil suddenly and shoot out. Choice D is doubly dangerous: a stoppered tube can burst as the gas inside expands.', show: 'q.answer' },
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
            'Goggles on, long hair tied back; never eat, drink or taste; waft to smell.',
            'Heat a test tube gently in a holder, pointing it away from everyone.',
            'Never heat a sealed container; use the safety flame; hot glass goes on a heat-proof mat.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Wear goggles, tie back long hair, never eat, drink or taste anything in a laboratory, and waft to smell.', show: 'sum.0' },
        { say: 'Heat a test tube gently in a holder, pointing it away from everyone.', show: 'sum.1' },
        { say: 'Never heat a sealed container, use the safety flame when a burner is not in use, and put hot glass on a heat-proof mat. In part four, you will handle chemicals safely, and learn what to report. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
