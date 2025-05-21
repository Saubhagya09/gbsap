import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationBookComponent } from './quotation-book.component';

describe('QuotationBookComponent', () => {
  let component: QuotationBookComponent;
  let fixture: ComponentFixture<QuotationBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuotationBookComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuotationBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
