import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { CounterService } from './counter.service';

describe('CounterService', () => {
  let service: CounterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CounterService);
    vi.useFakeTimers();
  });

  afterEach(() => {
    service.clearInterval();
    vi.useRealTimers();
  });

  describe('When the service is created', () => {
    it('Then it should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('Given the initial count is 25:00', () => {
    describe('When executing startCounter', () => {
      it('Then it should update the count to 24:59 after 1 second', () => {
        const count = service['count'];

        service.startCounter();
        vi.advanceTimersByTime(2000);

        expect(count()).toBe('24:59');
      });
    });
  });

  describe('Given the count is 00:00 and it is NOT a break', () => {
    describe('When executing setCounterInterval', () => {
      it('Then it should update the count to 05:00', () => {
        const count = service['count'];
        count.set('00:00');

        service.setCounterInterval();
        vi.advanceTimersByTime(2000)

        expect(count()).toBe('05:00');
      });
    });
  });

  describe('Given the count is 00:00 and it is a break', () => {
    describe('When executing setCounterInterval', () => {
      it('Then it should update the count to 25:00', () => {
        const count = service['count'];
        count.set('00:00');
        service['isBreak'] = true;

        service.setCounterInterval();
        vi.advanceTimersByTime(2000);

        expect(count()).toBe('25:00');
      });
    });
  });

  describe('Given the counter is running', () => {
    describe('When executing freezeCounter', () => {
      it('Then it should stop the counter and keep the same count', () => {
        const count = service['count'];
        vi.advanceTimersByTime(1000);

        service.startCounter();
        vi.advanceTimersByTime(2000);
        service.freezeCounter();
        vi.advanceTimersByTime(1000);

        expect(count()).toBe('24:59');
      });
    });
  });

  describe('Given the counter is freezed', () => {
    describe('When executing startCounter', () => {
      it('Then it should start the counter where it was freezed and update the count after 1 second', () => {
        const count = service['count'];
        count.set('23:47');
        service['isFreezed'] = true;

        service.startCounter();
        vi.advanceTimersByTime(1000);
        service.freezeCounter();
        service.unFreezeCounter();

        expect(count()).toBe('23:46');
      });
    });
  });

  describe('Given the number of pomodori is a multiple of 4', () => {
    describe('When executing setCounterInterval', () => {
      it('Then it should set the break time to 15:00', () => {
        const count = service['count'];
        count.set('00:00');
        service['pomodoriNumber'] = 4;

        service.setCounterInterval();
        vi.advanceTimersByTime(2000)

        expect(count()).toBe('15:00');
      });
    });
  });
});
