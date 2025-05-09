import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressAddComponent } from './progress-add.component';

describe('ProgressAddComponent', () => {
  let component: ProgressAddComponent;
  let fixture: ComponentFixture<ProgressAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgressAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
