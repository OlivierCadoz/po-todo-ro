import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToForm } from './to-form';

describe('ToForm', () => {
  let component: ToForm;
  let fixture: ComponentFixture<ToForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToForm],
    }).compileComponents();

    fixture = TestBed.createComponent(ToForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
