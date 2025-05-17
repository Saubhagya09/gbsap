import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploymentEditComponent } from './employment-edit.component';

describe('EmploymentEditComponent', () => {
  let component: EmploymentEditComponent;
  let fixture: ComponentFixture<EmploymentEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmploymentEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmploymentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
