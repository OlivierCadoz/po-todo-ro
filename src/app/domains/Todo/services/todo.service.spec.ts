import { TestBed } from '@angular/core/testing';

import { TodoService } from '@to-services/todo.service';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Given a new todo item is created',() => {
    describe('When addTodo is called with a title', () => {
      it('Then the new todo item should be added to the todos list', () => {
        const title = 'Test Todo';

        service.addTodo(title);

        const todos = service.todos();
        expect(todos.length).toBe(1);
        expect(todos[0].title).toBe(title);
        expect(todos[0].isDone).toBe(false);
      });
    });
  });

  describe('Given an existing todo item is removed', () => {
    describe('When deleteTodo is called with the id of the todo item', () => {
      it('Then the todo item should be removed from the todos list', () => {
        const title = 'Test Todo';
        service.addTodo(title);
        const todoId = service.todos()[0].id;

        service.deleteTodo(todoId);
        const todos = service.todos();
        expect(todos.length).toBe(0);
      });
    });
  });
});
