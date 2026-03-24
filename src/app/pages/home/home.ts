import { Component } from '@angular/core';

import { PoCounter } from '@po-components/po-counter/po-counter';
import { ToForm } from "@to-components/to-form/to-form";
import { ToList } from "@to-components/to-list/to-list";

@Component({
  selector: 'po-home',
  imports: [PoCounter, ToForm, ToList],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
