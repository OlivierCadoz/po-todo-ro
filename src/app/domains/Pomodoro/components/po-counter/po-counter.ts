import { Component, computed, inject } from '@angular/core';

import { POMODORO_TIME } from '@po-constants/pomodoroTime';
import { CounterService } from '@po-services/counter/counter.service';

@Component({
  selector: 'po-counter',
  imports: [],
  templateUrl: './po-counter.html',
  styleUrl: './po-counter.scss',
})
export class PoCounter {
  count = computed(() => this.counterService.count() || POMODORO_TIME);

  private counterService = inject(CounterService);

  startCounter() {
    this.counterService
      .startAnew();
  }
}
