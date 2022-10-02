import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartsFormComponent } from './carts-form.component';

describe('CartsFormComponent', () => {
  let component: CartsFormComponent;
  let fixture: ComponentFixture<CartsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
