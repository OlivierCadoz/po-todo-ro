import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToList } from './to-list';

describe('ToList', () => {
  let component: ToList;
  let fixture: ComponentFixture<ToList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToList],
    }).compileComponents();

    fixture = TestBed.createComponent(ToList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Given a todo item is added to the list', () => {
    describe('When the component is rendered', () => {
      it('Then the todo item should be displayed in the list', () => {
        const title = 'Test Todo';

        component.todoService.addTodo(title);
        fixture.detectChanges();

        const todoItem = fixture.nativeElement.querySelector('li');
        expect(todoItem).toBeTruthy();
        expect(todoItem.textContent).toContain(title);
      });
    });
  });
});
