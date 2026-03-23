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

  toggleIsBreak() {
    this.isBreak = !this.isBreak;
  }

  toggleIsFreezed() {
    this.isFreezed = !this.isFreezed;
  }

  incrementPomodoriNumber() {
    this.pomodoriNumber += 1;
  }

  updateCount() {
    const newCount = this.handleCountUpdate(this.count());
    this.count.set(newCount);
  }

  handleCountUpdate(count: string) {
    let { minutes, seconds } = splitMinutesAndSeconds(count);

    if(minutes === 0 && seconds === 0) {
      this.toggleIsBreak();
      this.startAnew();
    } else if (seconds === 0) {
      minutes -= 1;
      seconds = 59;
    } else {
      seconds -= 1;
    }

    return formatTime(minutes, seconds);
  }

  setCounterInterval() {
    this.counterInterval = setInterval(() => {
      this.updateCount();
    }, 1000);
  }

  startAnew() {
    this.clearInterval();

    setTimeout(() => {
      this.switchStarter();
      this.setCounterInterval();
    }, 1000);

    if (!this.isBreak) this.incrementPomodoriNumber();
  }

  unFreezeCounter() {
    this.toggleIsFreezed();
    this.setCounterInterval();
  }

  startCounter() {
    if (this.isFreezed) {
      this.unFreezeCounter();
    } else {
      this.startAnew();
    }
  }

  freezeCounter() {
    this.clearInterval();
    this.toggleIsFreezed();
  }

  clearInterval() {
    if (this.counterInterval) {
      clearInterval(this.counterInterval);
      this.counterInterval = undefined;
    }
  }

  switchStarter() {
    if (this.isBreak) this.setBreakTime();
    else this.count.set(POMODORO_TIME);
  }

  setBreakTime() {
    const breakTime = this.checkBreakTime();
    this.count.set(breakTime);
  }

  checkBreakTime() {
    const isLongBreak = this.pomodoriNumber % 4 === 0 && this.pomodoriNumber !== 0;
    return isLongBreak ? LONG_BREAK_TIME : SHORT_BREAK_TIME;
  }
}
