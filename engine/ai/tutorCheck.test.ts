import { describe, expect, it } from 'vitest';
import { checkBeats, joinThousands, numbersIn, wordsToDigits, wrongCalculations } from './tutorCheck.ts';

describe('numbers in words', () => {
  it('reads whole numbers, decimals and place words as digits', () => {
    expect(numbersIn('four million, five hundred seventy-two thousand, three hundred six', true)).toEqual([4572306]);
    expect(numbersIn('zero point zero four five')).toEqual([0.045]);
    expect(numbersIn('forty-five thousandths and one tenth')).toEqual([0.045, 0.1]);
    expect(numbersIn('twelve and forty-five thousandths')).toEqual([12.045]);
    expect(numbersIn('five thousand two hundred seventy-three and four hundred sixty-eight thousandths')).toEqual([5273.468]);
    expect(numbersIn('3 tenths')).toEqual([0.3]);
    expect(numbersIn('It costs two dollars and forty cents.')).toEqual([2.4]);
  });

  it('keeps numbers apart at a comma unless asked to read on', () => {
    expect(numbersIn('six thousand, eight hundred, and one hundred forty')).toEqual([6000, 800, 140]);
    expect(numbersIn('six thousand, eight hundred', true)).toEqual([6800]);
    expect(numbersIn('three hundred, and twenty-six rounds to thirty')).toEqual([300, 26, 30]);
  });

  it('notices "and" inside a whole number, but not before a decimal part', () => {
    expect(wordsToDigits('one hundred and three').andInWhole).toBe(true);
    expect(wordsToDigits('one hundred and three').text).toBe('103');
    expect(wordsToDigits('one hundred three').andInWhole).toBe(false);
    expect(wordsToDigits('one hundred and three thousandths').andInWhole).toBe(false);
  });

  it('joins digit groups written with spaces or commas', () => {
    expect(joinThousands('4 572 306 and 70 000, then 12,345.5')).toBe('4572306 and 70000, then 12345.5');
    expect(joinThousands('the list 2, 345 and 7 8')).toBe('the list 2, 345 and 7 8');
  });
});

describe('calculations a line states', () => {
  it('finds a wrong product, sum, difference or quotient', () => {
    expect(wrongCalculations('Seven times four is twenty-nine.')).toEqual(['7 times 4 is 29']);
    expect(wrongCalculations('one hundred three divided by six leaves no remainder')).toEqual(['103 divided by 6 leaves no remainder']);
    expect(wrongCalculations('6254 minus 2981 equals 4273')).toHaveLength(1);
    expect(wrongCalculations('367 divided by 7 equals 52 remainder 4')).toHaveLength(1);
  });

  it('accepts right ones, in digits or words', () => {
    const right = [
      'Seven times 5 equals 35, while seven times 6 equals 42, which is too big.',
      'Fifty-two times seven equals three hundred sixty-four, and adding three gives three hundred sixty-seven.',
      '367 divided by 7 equals 52 remainder 3, and 5 divided by 4 equals 1, with some left.',
      'Subtract 6 from 6 to get 0. Multiply 4 by 3 to get 12. Twenty-two divided by seven is 3.14.',
    ];
    for (const line of right) expect(wrongCalculations(line)).toEqual([]);
  });

  it('leaves alone a number that belongs to a sign, a fraction or more working', () => {
    expect(wrongCalculations('negative two plus five is three')).toEqual([]);
    expect(wrongCalculations('one over two times six is three')).toEqual([]);
    expect(wrongCalculations('four hundred times thirty is four times three, which is twelve')).toEqual([]);
    expect(wrongCalculations('four times the quantity six plus three equals thirty-six')).toEqual([]);
  });
});

describe('checking the lines for a slide', () => {
  const context = ['Dividing Whole Numbers', 'Divide 618 by 6'];
  const steps = ['Divide 618 by 6.', 'Hundreds: 6 divided by 6 equals 1. Write 1 above the 6.', 'Answer: 618 divided by 6 equals 103.'];

  it('passes lines that say the slide, in their own words', () => {
    const beats = ['Let’s divide six hundred eighteen by six.', 'In the hundreds place, six divided by six is one, so we write one above the six.', 'So six hundred eighteen divided by six equals one hundred three.'];
    expect(checkBeats(context, steps, beats)).toEqual([]);
  });

  it('rejects a slip in a number or a calculation, and "and" in a whole number', () => {
    expect(checkBeats(context, steps, ['Let’s divide six hundred eighty by six.', steps[1], steps[2]]).join()).toMatch(/680 is not on the slide/);
    expect(checkBeats(context, steps, [steps[0], steps[1], 'One hundred and three divided by six leaves no remainder.']).join()).toMatch(/"and" inside[\s\S]*wrong: 103 divided by 6/);
  });

  it('rejects lines said one step early', () => {
    const beats = ['In the hundreds place, six divided by six is one, so we write one above the six.', 'So six hundred eighteen divided by six equals one hundred three.', 'Great work.'];
    expect(checkBeats(context, steps, beats).join()).toMatch(/line 1 is not about its step/);
  });

  it('allows a mistake the slide itself shows, and pointing at a question, a video or working', () => {
    const shown = ['Diego says 6254 minus 2981 equals 4273. Is that reasonable?'];
    expect(checkBeats([], shown, ['Diego says six thousand two hundred fifty-four minus two thousand nine hundred eighty-one equals four thousand two hundred seventy-three. Is that reasonable?'])).toEqual([]);
    expect(checkBeats([], ['[YOUR TURN] Dividing', '[VIDEO] Long division', 'Look at how the working is set out.'], ['Your turn: try it, then press Check.', 'Watch this video, then press Continue.', 'Each subtraction matches a place.'])).toEqual([]);
  });

  it('rejects a step tag read out and a line that runs on', () => {
    expect(checkBeats([], ['[VIDEO] Long division'], ['[VIDEO] Watch this.']).join()).toMatch(/tag read out/);
    expect(checkBeats([], ['Divide.'], [Array(80).fill('word').join(' ')]).join()).toMatch(/too long/);
  });
});
