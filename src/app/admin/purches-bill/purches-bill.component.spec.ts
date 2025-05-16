import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchesBillComponent } from './purches-bill.component';

describe('PurchesBillComponent', () => {
  let component: PurchesBillComponent;
  let fixture: ComponentFixture<PurchesBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchesBillComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchesBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
