import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationBillComponent } from './quotation-bill.component';

describe('QuotationBillComponent', () => {
  let component: QuotationBillComponent;
  let fixture: ComponentFixture<QuotationBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuotationBillComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuotationBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
