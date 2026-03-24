import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TodoService } from '@to-services/todo.service';

@Component({
  selector: 'to-form',
  imports: [FormsModule],
  templateUrl: './to-form.html',
  styleUrl: './to-form.scss',
})
export class ToForm {
  title = '';

  todoService = inject(TodoService);

  saveTodo() {
    this.todoService.addTodo(this.title);
    this.title = '';
  }
}
