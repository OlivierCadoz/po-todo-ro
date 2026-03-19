import { Component, signal, inject } from '@angular/core';

import { CounterService } from '@po-services/counter/counter.service';

@Component({
  selector: 'po-counter',
  imports: [],
  templateUrl: './po-counter.html',
  styleUrl: './po-counter.scss',
})
export class PoCounter {
  count = signal('25:00');

  private counterService = inject(CounterService);

  startCounter() {
    this.counterService
      .startCounter(this.count);
  }
}
