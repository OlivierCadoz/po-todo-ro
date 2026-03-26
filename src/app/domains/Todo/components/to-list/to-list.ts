import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TodoService } from '@to-services/todo.service';
import { TodoItem } from '@to-types/todo.interface';

@Component({
  selector: 'to-list',
  imports: [FormsModule],
  templateUrl: './to-list.html',
  styleUrl: './to-list.scss',
})
export class ToList {
  todos: WritableSignal<TodoItem[]> = signal([]);

  todoService = inject(TodoService);

  constructor() {
    this.todos = this.todoService.todos;
  }

  consolelol() {
    console.log(this.todos());
  }
}
