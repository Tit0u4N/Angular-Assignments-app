import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssigmentFormComponent } from './assigment-form.component';

describe('AssigmentFormComponent', () => {
  let component: AssigmentFormComponent;
  let fixture: ComponentFixture<AssigmentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssigmentFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssigmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
