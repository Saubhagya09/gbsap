import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TastManagementComponent } from './tast-management.component';

describe('TastManagementComponent', () => {
  let component: TastManagementComponent;
  let fixture: ComponentFixture<TastManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TastManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TastManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
