import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { caption, polygon } from './lib/m303-3-figures.ts';

/** A logo 12 cm wide on a business card and 30 cm wide on a banner (the same shape, 5 by 12 and 12.5 by 30). */
const logos = () =>
  figure('lg', [
    polygon({ name: 'card', corners: { A: [0, 0], B: [12, 0], C: [12, 5], D: [0, 5] }, names: false, tone: 'adj', sides: { AB: '12\\text{ cm}' }, group: 'card' }),
    caption({ id: 'card-cap', at: [6, 2.5], tex: '\\text{card}', tone: 'adj', group: 'card' }),
    polygon({ name: 'ban', corners: { A: [16, 0], B: [46, 0], C: [46, 12.5], D: [16, 12.5] }, names: false, tone: 'opp', sides: { AB: '30\\text{ cm}' }, group: 'ban' }),
    caption({ id: 'ban-cap', at: [31, 6.25], tex: '\\text{banner}', tone: 'opp', group: 'ban' }),
  ]);

const video: Explainer = {
  id: 'm303-4-2-b',
  lessonId: 'm303-4-2',
  title: 'Dilations, Part 2: Finding the Scale Factor',
  thumbnailTitle: 'Finding the Scale Factor',
  thumbnail: 'lg',
  summary: 'The scale factor of a dilation is any image length divided by the matching original length: a logo 12 cm wide on a business card and 30 cm wide on a banner has k = 30 ÷ 12 = 2.5, an enlargement, and a 24 cm tile pattern copied at 6 cm has k = 0.25, a reduction. Dividing the wrong way, 12 ÷ 30 = 0.4, would wrongly call the banner smaller. Part 3 covers perimeter and area.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Dilations · Part 2', title: 'Finding the Scale Factor', subtitle: 'Image length over original length' }],
      lines: [
        { say: 'Often you know the size of the original and the size of the copy, and you need to know how much it was enlarged or reduced.', show: 'title' },
        { say: 'In this video, you will find the scale factor of a dilation from two matching lengths, and check whether it is an enlargement or a reduction.' },
      ],
    },
    {
      chapter: 'The rule',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['k = \\dfrac{\\text{image length}}{\\text{original length}}'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Matching lengths', md: 'Compare **any** length in the image with the **matching** length in the original: a width with the width, a height with the height.' },
      ],
      lines: [
        { say: 'In a dilation, every length is multiplied by the scale factor, k. So to find k, divide a length in the image by the matching length in the original.', show: 'm' },
        { say: 'Any pair of matching lengths will do: a width with the matching width, or a height with the matching height. Every pair gives the same scale factor.', show: 'key' },
      ],
    },
    {
      chapter: 'A logo for a banner',
      layout: 'center',
      main: [logos(), { kind: 'math', id: 'm', size: 'md', lines: ['k = \\dfrac{30}{12} = 2.5 \\qquad 2.5 > 1: \\text{ an enlargement}'] }],
      lines: [
        { say: 'A logo is twelve centimetres wide on a business card. On a trade-show banner, it is thirty centimetres wide. Find the scale factor.', show: ['lg.card', 'lg.ban'] },
        { say: 'The banner logo is the image, and the card logo is the original. So k is thirty divided by twelve, which is 2.5.', show: 'm', focus: 'm' },
        { say: '2.5 is greater than one, so the banner logo is an enlargement. Every length on the banner is 2.5 times the matching length on the card.' },
      ],
    },
    {
      chapter: 'A reduction',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'lg', md: 'A tile pattern $24\\text{ cm}$ wide is copied $6\\text{ cm}$ wide for a mosaic. Find the scale factor.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['k = \\dfrac{6}{24} = 0.25', '0.25 < 1: \\text{ a reduction}'] },
      ],
      lines: [
        { say: 'A tile pattern 24 centimetres wide is copied six centimetres wide for a mosaic. Find the scale factor.', show: 'q' },
        { say: 'The copy is the image. So k is six divided by 24, which is 0.25, or one quarter.', show: 'm.0', focus: 'm.0' },
        { say: '0.25 is less than one, so the copy is a reduction. Every length in the mosaic is one quarter of the matching length in the pattern.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Dividing the wrong way', md: 'Always put the **image** on top. Original over image gives $12 \\div 30 = 0.4$, which would wrongly say the banner is smaller than the card.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{\\text{image}}{\\text{original}} = \\dfrac{30}{12} = \\good{2.5} \\qquad \\dfrac{12}{30} = \\bad{0.4}'] },
      ],
      lines: [
        { say: 'Be careful to divide the right way round. Always put the image on top, and the original underneath.', show: 'oops' },
        { say: 'For the logo, thirty over twelve is 2.5. But twelve over thirty is 0.4, a number less than one, which would say the banner logo is smaller than the card. It clearly is not.', show: 'm', focus: 'm' },
        { say: 'So check your answer against the picture. If the image is bigger, k must be greater than one. If the image is smaller, k must be less than one.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A photo $20\\text{ cm}$ wide is printed $16\\text{ cm}$ wide. What is the scale factor of the print?',
          choices: ['$1.25$', '$0.8$', '$4$', '$0.2$'],
          answer: 1,
          working: '$k = \\dfrac{\\text{image}}{\\text{original}} = \\dfrac{16}{20} = 0.8$. Since $0.8 < 1$, the print is a reduction.',
        },
      ],
      lines: [
        { say: 'Your turn. A photo twenty centimetres wide is printed sixteen centimetres wide. What is the scale factor of the print? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, 0.8. The print is the image, so k is sixteen over twenty, which is 0.8: less than one, a reduction. Choice A, 1.25, divides the original by the image, which would make the print bigger.', show: 'q.answer' },
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
            'Scale factor $=$ image length $\\div$ matching original length.',
            'An enlargement has $k > 1$; a reduction has $k < 1$.',
            'Put the image on top, and check $k$ against the picture.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The scale factor is an image length divided by the matching original length.', show: 'sum.0' },
        { say: 'An enlargement has a scale factor greater than one, and a reduction has a scale factor less than one.', show: 'sum.1' },
        { say: 'So put the image on top, and check your answer against the picture. In the next part, we see what a dilation does to perimeter and area. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
