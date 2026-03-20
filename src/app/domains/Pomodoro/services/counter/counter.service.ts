import { Injectable, WritableSignal, signal } from '@angular/core';
import { splitMinutesAndSeconds, formatTime } from '@po-utils/counter.utils';
import { POMODORO_TIME, SHORT_BREAK_TIME } from '@po-constants/pomodoroTime';

@Injectable({
  providedIn: 'root',
})
export class CounterService {
  private count = signal(POMODORO_TIME);
  private isBreak = false;

  private counterInterval?: NodeJS.Timeout;

  updateCount(externalCount: WritableSignal<string>) {
    this.count.update((count) => {
        let { minutes, seconds } = splitMinutesAndSeconds(count);

        if(minutes === 0 && seconds === 0) {
          this.startAnew(externalCount);
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
    this.counterInterval = setInterval(() => {
      this.updateCount(count);
      count.set(this.count());
    }, 1000);
  }

  startAnew(count: WritableSignal<string>) {
    this.clearInterval();

    setTimeout(() => {
      this.switchStarter(count);
      this.toggleIsBreak();
    }, 1000);
  }

  clearInterval() {
    if (this.counterInterval) clearInterval(this.counterInterval);
    this.counterInterval = undefined;
  }

  switchStarter(count: WritableSignal<string>) {
    if (this.isBreak) {
      this.count.set(SHORT_BREAK_TIME);
      this.startCounter(count);
    } else {
      this.count.set(POMODORO_TIME);
      this.startCounter(count);
    }
  }

  toggleIsBreak() {
    this.isBreak = !this.isBreak;
  }
}
