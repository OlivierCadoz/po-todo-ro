import { TestBed } from '@angular/core/testing';

import { CounterService } from './counter.service';
import { after } from 'node:test';

describe('CounterService', () => {
  let service: CounterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CounterService);
  });

  afterEach(() => {
    service.clearInterval();
  });

  describe('When the service is created', () => {
    it('Then it should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('Given the initial count is 25:00', () => {
    describe('When executing startAnew', () => {
      it('Then it should update the count to 24:59 after 1 second', () => {
        const count = service['count'];

        service.startAnew();

        setTimeout(() => {
          expect(count()).toBe('24:59');
        }, 1100);
      });
    });
  });

  describe('Given the count is 24:01', () => {
    describe('When executing startAnew', () => {
      it('Then it should update the count to 23:59 after 1 second', () => {
        const count = service['count'] as any;
        count.set('24:01');

        service.startAnew();

        setTimeout(() => {
          expect(count()).toBe('24:00');
        }, 1100);
      });
    });
  });

  describe('Given the count is 00:00 and it is NOT a break', () => {
    describe('When executing startAnew', () => {
      it('Then it should update the count to 05:00 after 1 second', () => {
        const count = service['count'];
        count.set('00:00');

        service.startAnew();

        setTimeout(() => {
          expect(count()).toBe('05:00');
        }, 1100);
      });
    });
  });

  describe('Given the count is 00:00 and it is a break', () => {
    describe('When executing startAnew', () => {
      it('Then it should update the count to 05:00 after 1 second', () => {
        const count = service['count'];
        count.set('00:00');
        service['toggleIsBreak']();

        service.startAnew();

        setTimeout(() => {
          expect(count()).toBe('25:00');
        }, 1100);
      });
    });
  });

  describe('Given the counter is running', () => {
    describe('When executing freezeCounter', () => {
      it('Then it should stop the counter and keep the same count', () => {
        const count = service['count'];
        service.startAnew();
        service.freezeCounter();
      });
    });
  });

  describe('Given the counter is freezed', () => {
    describe('When executing startAnew', () => {
      it('Then it should start the counter where it was freezed and update the count after 1 second', () => {
        const count = service['count'];
        count.set('23:47');
        service.startAnew();
        service.freezeCounter();
        service.startAnew();

        setTimeout(() => {
          expect(count()).toBe('23:46');
        }, 1100);
      });
    });
  });
});
