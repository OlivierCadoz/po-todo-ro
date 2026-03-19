import { Component } from '@angular/core';

import { PoCounter } from '@po-components/po-counter/po-counter';

@Component({
  selector: 'po-home',
  imports: [PoCounter],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
