import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellBillComponent } from './sell-bill.component';

describe('SellBillComponent', () => {
  let component: SellBillComponent;
  let fixture: ComponentFixture<SellBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellBillComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
