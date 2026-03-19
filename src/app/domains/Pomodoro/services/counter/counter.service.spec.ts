import { TestBed } from '@angular/core/testing';

import { CounterService } from './counter.service';

describe('CounterService', () => {
  let service: CounterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CounterService);
  });

  describe('When the service is created', () => {
    it('Then it should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('Given the initial count is 25:00', () => {
    describe('When executing StartCounter', () => {
      it('Then it should update the count to 24:59 after 1 second', () => {
        const count = service['count'] as any;

        service.startCounter(count);

        setTimeout(() => {
          expect(count()).toBe('24:59');
        }, 1100);
      });
    });
  });

  describe('Given the count is 24:01', () => {
    describe('When executing StartCounter', () => {
      it('Then it should update the count to 23:59 after 1 second', () => {
        const count = service['count'] as any;
        count.set('24:01');

        service.startCounter(count);

        setTimeout(() => {
          expect(count()).toBe('24:00');
        }, 1100);
      });
    });
  });

  describe('Given the count is 00:00', () => {
    describe('When executing StartCounter', () => {
      it('Then it should not update the count', () => {
        const count = service['count'] as any;
        count.set('00:00');

        service.startCounter(count);

        setTimeout(() => {
          expect(count()).toBe('00:00');
        }, 1100);
      });
    });
  });

});
