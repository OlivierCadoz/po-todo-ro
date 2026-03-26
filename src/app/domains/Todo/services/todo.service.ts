import { Injectable, signal, WritableSignal } from '@angular/core';

import { TodoItem } from '@to-types/todo.interface';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos: WritableSignal<TodoItem[]> = signal([]);

  addTodo(title: string) {
    const newTodo: TodoItem = {
      id: Date.now(),
      title,
      isDone: false,
    };
    this.todos.update((todos) => [...todos, newTodo]);
  }

  deleteTodo(id: number) {
    this.todos.update((todos) => todos.filter((todo) => todo.id !== id));
  }
}
