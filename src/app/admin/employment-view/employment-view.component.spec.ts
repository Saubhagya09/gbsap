import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploymentViewComponent } from './employment-view.component';

describe('EmploymentViewComponent', () => {
  let component: EmploymentViewComponent;
  let fixture: ComponentFixture<EmploymentViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmploymentViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmploymentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
