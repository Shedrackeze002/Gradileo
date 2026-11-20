import type { Explainer, RaysEl } from '@/video/script.ts';

// Exam question for Grade 10 lesson 4.4 (reflection): compare the distance of an object from a
// mirror with the apparent distance of its virtual image behind the mirror. The question is
// OpenStax Physics' own, word for word (the question after the Watch Physics feature "Virtual
// Image", section 16.1, CC BY 4.0), about a flat mirror. The image is as far behind the mirror as
// the object is in front (choice a). The last two choices describe a curved, concave mirror.
//
// The picture (src/video/rays.ts) reflects a ray from a lamp off a flat mirror, with the angle of
// reflection equal to the angle of incidence, and follows the reflected ray back behind the
// mirror to the lamp's image; as the lamp moves, the image moves with it, always as far behind.

const mirror: RaysEl = {
  kind: 'rays',
  id: 'r',
  surface: 'mirror',
  angle: 50,
  behind: true,
  height: 470,
  poster: 'move',
  clips: {
    move: { phases: [{ dur: 3, to: 25 }, { dur: 3, to: 62 }, { dur: 2, to: 50 }] },
  },
};

const QUESTION = 'Compare the distance of an object from a mirror to the apparent distance of its virtual image behind the mirror.';
const CHOICES = [
  'The distances of the image and the object from the mirror are the same.',
  'The distances of the image and the object from the mirror are always different.',
  'The image is formed at infinity if the object is placed near the mirror.',
  'The image is formed near the mirror if the object is placed at infinity.',
];

const video: Explainer = {
  id: 'xq-p10-4-4',
  lessonId: '',
  exam: {
    lesson: 'p10-4-4',
    source: 'OpenStax, Physics, question on the Watch Physics feature "Virtual Image", section 16.1, Reflection',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/16-1-reflection',
    question: QUESTION,
    choices: CHOICES,
  },
  title: 'Exam Question: How Far Behind the Mirror Is Your Image?',
  thumbnailTitle: 'The Image in a Mirror',
  thumbnail: 'r',
  summary:
    'A real test question, solved one small step at a time: we compare how far an object is in front of a flat mirror with how far its image seems to be behind it. We use the law of reflection to follow a reflected ray back behind the mirror, find where the image is, and see that it is always as far behind the mirror as the object is in front. Then we look at the traps hidden in the wrong choices, two of which describe curved mirrors.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'The Image in a Mirror', subtitle: 'Reflection, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the image you see in a mirror. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Physics textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          kicker: 'The question',
          prompt: QUESTION,
          choices: CHOICES,
          answer: 0,
          working: 'In a flat mirror, the image is as far **behind** the mirror as the object is **in front** of it.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Compare the distance of an object from a mirror to the apparent distance of its virtual image behind the mirror.' },
        { say: 'Choice A says the two distances are the same. Choice B says they are always different. Choice C says the image is formed at infinity if the object is near the mirror, and choice D says the image is formed near the mirror if the object is at infinity. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [mirror, { kind: 'text', id: 'plain', size: 'lg', md: 'How far **behind** the mirror does the image seem to be?' }],
      lines: [
        { say: 'Let us picture it. The question comes after a video about an ordinary flat mirror, so that is our mirror. Here it is, seen from the side, with a lamp in front of it.', show: 'r' },
        { say: 'A ray of light leaves the lamp, hits the mirror and bounces off. When you look into a mirror, you see the lamp as if it were behind the glass. That is its image.' },
        { say: 'The image is called virtual, because no light really goes behind the mirror. The question asks: how far behind the mirror does the image seem to be, compared with how far the lamp is in front?', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'def',
          tone: 'definition',
          title: 'The law of reflection',
          md: 'When light bounces off a mirror, the **angle of reflection** equals the **angle of incidence**. Both are measured from the **normal**, the line at right angles to the mirror. Your eye and brain assume light travels in **straight lines**, so you see things where the rays **seem** to come from.',
        },
      ],
      lines: [
        { say: 'Here is what we need. When light bounces off a mirror, it leaves at the same angle as it arrived. The angle of reflection equals the angle of incidence.', show: 'def' },
        { say: 'Both angles are measured from the normal, a line at right angles to the mirror.' },
        { say: 'And your eye and brain assume light travels in straight lines. So you see an object where its rays seem to come from, even when they have bounced.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Bounce a ray off the mirror: **equal angles**', 'Follow the reflected ray **backwards**, behind the mirror', 'Compare the two **distances**'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, bounce a ray off the mirror, with equal angles.', show: 'plan.0' },
        { say: 'Second, follow the reflected ray backwards, in a straight line, behind the mirror.', show: 'plan.1' },
        { say: 'Third, compare how far the image is behind the mirror with how far the lamp is in front.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Equal angles',
      layout: 'center',
      main: [mirror],
      lines: [
        { say: 'Step one. Here is the normal, at right angles to the mirror where the ray lands.', show: ['r', 'r.normal'] },
        { say: 'The ray arrives at fifty degrees from the normal, and leaves at fifty degrees on the other side. The two angles are equal.', show: 'r.angles' },
      ],
    },
    {
      chapter: 'Step 2: Follow the ray back',
      layout: 'center',
      main: [mirror, { kind: 'text', id: 't', size: 'md', md: 'The reflected ray **seems** to come from a point behind the mirror: the **image**.' }],
      lines: [
        { say: 'Step two. To your eye, the reflected ray seems to come in a straight line from somewhere behind the mirror. Follow it backwards, along the dashed line.', show: ['r', 'r.normal', 'r.angles', 'r.image'] },
        { say: 'It seems to come from a point behind the glass. That point is the image of the lamp.', show: 't' },
      ],
    },
    {
      chapter: 'Step 3: Compare the distances',
      layout: 'center',
      main: [mirror, { kind: 'text', id: 't', size: 'md', md: '**Same distance**: as far behind the mirror as the lamp is in front.' }],
      lines: [
        { say: 'Step three. Look at the two marks on the dotted line from the lamp to its image. The lamp is above the mirror by exactly the same distance as the image is below it.', show: ['r', 'r.image'] },
        { say: 'Now move the lamp. Wherever it goes, the image goes with it, always exactly as far behind the mirror as the lamp is in front.', play: 'r.move', playDelay: 0.5 },
        { say: 'So the distances of the image and the object from the mirror are the same. That is choice A.', show: 't' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [mirror, { kind: 'text', id: 't', size: 'md', md: 'Equal angles make a **mirror-image** pair of triangles, so the two distances **must** match.' }],
      lines: [
        { say: 'Let us check why this always works. The ray and its backward line make two triangles, one in front of the mirror and one behind it.', show: ['r', 'r.normal', 'r.angles', 'r.image'] },
        { say: 'Because the angles are equal, the two triangles are exact mirror images of each other, the same shape and the same size. So the distance in front must equal the distance behind.', show: 't' },
        { say: 'You can test it at home: stand one metre from a mirror, and your image looks one metre behind the glass, two metres from you.' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Choice', 'Why it is wrong'],
          rows: [
            ['Always **different**', 'In a flat mirror they are **always the same**'],
            ['At infinity, object **near**', 'Happens in a **curved** mirror, not a flat one'],
            ['Near the mirror, object at **infinity**', 'Also a **curved** mirror: a flat mirror\'s image goes to infinity too'],
            ['The **same**', 'Correct'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps hidden in the wrong choices.', show: 'traps' },
        { say: 'Always different is the opposite of what we found. In a flat mirror, the distances are always the same.' },
        { say: 'The last two choices describe curved mirrors, like the inside of a spoon. A curved mirror can throw an image far away, or bring a faraway object\'s image close to the mirror.' },
        { say: 'A flat mirror never does that. Move the object closer, and the image comes closer. Move it far away, and the image goes just as far behind the glass.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'You stand 1.5 m in front of a flat mirror. How far are you from your image?',
          choices: ['1.5 m', '0.75 m', '3 m', '6 m'],
          answer: 2,
          working: 'Your image is $1.5$ m behind the mirror, and you are $1.5$ m in front: $1.5 + 1.5 = 3$ m apart.',
        },
      ],
      lines: [
        { say: 'Your turn. You stand 1.5 metres in front of a flat mirror. How far are you from your image? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Your image is 1.5 metres behind the mirror, and you are 1.5 metres in front of it. So you are three metres apart. That is choice C. 1.5 metres is the distance from the mirror, not from you.', show: 'q2.answer' },
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
          items: ['Angle of reflection $=$ angle of incidence', 'The image is where the rays **seem** to come from', 'Flat mirror: image as far **behind** as the object is **in front**', 'Same size, and **virtual**: no light goes behind the glass'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Light leaves a mirror at the same angle as it arrives.', show: 'sum.0' },
        { say: 'You see an image where the reflected rays seem to come from.', show: 'sum.1' },
        { say: 'In a flat mirror, the image is as far behind the mirror as the object is in front.', show: 'sum.2' },
        { say: 'And it is the same size, and virtual, because no light really goes behind the glass. For more on reflection, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
