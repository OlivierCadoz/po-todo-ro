import { Injectable, signal } from '@angular/core';
import { splitMinutesAndSeconds, formatTime } from '@po-utils/counter.utils';
import { POMODORO_TIME, SHORT_BREAK_TIME, LONG_BREAK_TIME } from '@po-constants/pomodoroTime';

@Injectable({
  providedIn: 'root',
})
export class CounterService {
  public count = signal(POMODORO_TIME);
  private isBreak = false;
  private isFreezed = false;
  private pomodoriNumber = 0;

  private counterInterval?: NodeJS.Timeout;

  updateCount() {
    this.count.update((count) => {
        let { minutes, seconds } = splitMinutesAndSeconds(count);

        if(minutes === 0 && seconds === 0) {
          this.startAnew();
          this.toggleIsBreak();
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
      if (this.isFreezed) {
        this.toggleIsFreezed();
      } else {
        this.switchStarter();
        if (!this.isBreak) this.incrementPomodoriNumber();
      }

      this.startCounter();
    }, 1000);
  }

  clearInterval() {
    if (this.counterInterval) {
      clearInterval(this.counterInterval);
      this.counterInterval = undefined;
    }
  }

  switchStarter() {
    if (this.isBreak) {
      this.setBreakTime();
    } else {
      this.count.set(POMODORO_TIME);
    }
  }

  setBreakTime() {
    const isLongBreak = this.pomodoriNumber % 4 === 0;
    const breakTime = isLongBreak ? SHORT_BREAK_TIME : LONG_BREAK_TIME;
    this.count.set(breakTime);
  }

  freezeCounter() {
    this.clearInterval();
    this.toggleIsFreezed();
  }

  toggleIsBreak() {
    this.isBreak = !this.isBreak;
  }

  toggleIsFreezed() {
    this.isFreezed = !this.isFreezed;
  }

  incrementPomodoriNumber() {
    this.pomodoriNumber += 1;
  }
}
