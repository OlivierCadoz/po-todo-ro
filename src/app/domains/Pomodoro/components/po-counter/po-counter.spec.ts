import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoCounter } from './po-counter';

describe('PoCounter', () => {
  let component: PoCounter;
  let fixture: ComponentFixture<PoCounter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoCounter],
    }).compileComponents();

    fixture = TestBed.createComponent(PoCounter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
