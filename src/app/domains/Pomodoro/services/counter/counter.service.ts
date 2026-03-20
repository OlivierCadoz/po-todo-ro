import { Injectable, WritableSignal, signal } from '@angular/core';
import { splitMinutesAndSeconds, formatTime } from '@po-utils/counter.utils';
import { POMODORO_TIME, SHORT_BREAK_TIME } from '@po-constants/pomodoroTime';

@Injectable({
  providedIn: 'root',
})
export class CounterService {
  public count = signal(POMODORO_TIME);
  private isBreak = false;

  private counterInterval?: NodeJS.Timeout;

  updateCount() {
    this.count.update((count) => {
        let { minutes, seconds } = splitMinutesAndSeconds(count);

        if(minutes === 0 && seconds === 0) {
          this.startAnew();
        } else if (seconds === 0) {
          minutes -= 1;
          seconds = 59;
        } else {
          seconds -= 1;
        }

        return formatTime(minutes, seconds);
      });
  }

  startCounter() {
    this.counterInterval = setInterval(() => {
      this.updateCount();
    }, 1000);
  }

  startAnew() {
    this.clearInterval();

    setTimeout(() => {
      this.switchStarter();
      this.toggleIsBreak();
    }, 1000);
  }

  clearInterval() {
    if (this.counterInterval) clearInterval(this.counterInterval);
    this.counterInterval = undefined;
  }

  switchStarter() {
    if (this.isBreak) {
      this.count.set(SHORT_BREAK_TIME);
      this.startCounter();
    } else {
      this.count.set(POMODORO_TIME);
      this.startCounter();
    }
  }

  toggleIsBreak() {
    this.isBreak = !this.isBreak;
  }
}
