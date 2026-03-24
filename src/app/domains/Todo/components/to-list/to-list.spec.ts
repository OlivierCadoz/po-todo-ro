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
});
