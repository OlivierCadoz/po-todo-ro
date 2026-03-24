import {
  splitMinutesAndSeconds,
  numberToTimeString,
  formatTime
} from '@po-utils/counter.utils';


describe('CounterService', () => {

  describe('When executingsplitMinutesAndSeconds', () => {
    it('Then it should split minutes and seconds correctly', () => {
      const result = splitMinutesAndSeconds('25:00');
      expect(result.minutes).toBe(25);
      expect(result.seconds).toBe(0);
    });
  });

  describe('When executing numberToTimeString', () => {
    it('Then it should convert a number to a time string with leading zeros', () => {
      const result = numberToTimeString(5);
      expect(result).toBe('05');
    });
  });

  describe('When executing formatTime', () => {
    it('Then it should format minutes and seconds into a time string', () => {
      const result = formatTime(25, 0);
      expect(result).toBe('25:00');
    });
  });
});
