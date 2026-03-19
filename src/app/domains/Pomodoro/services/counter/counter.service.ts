import { Injectable, WritableSignal, signal } from '@angular/core';
import { splitMinutesAndSeconds, formatTime } from '@po-utils/counter.utils';

@Injectable({
  providedIn: 'root',
})
export class CounterService {
  private count = signal('25:00');

  updateCount(interval?: NodeJS.Timeout) {
    this.count.update((count) => {
        let { minutes, seconds } = splitMinutesAndSeconds(count);

        if(minutes === 0 && seconds === 0) {
          if (interval) clearInterval(interval);
          return '00:00';
        } else if (seconds === 0) {
          minutes -= 1;
          seconds = 59;
        } else {
          seconds -= 1;
        }

        return formatTime(minutes, seconds);
      });
  }

  startCounter(count: WritableSignal<string>) {
    const counterInterval = setInterval(() => {
      this.updateCount(counterInterval);
      count.set(this.count());
    }, 1000);
  }
}
