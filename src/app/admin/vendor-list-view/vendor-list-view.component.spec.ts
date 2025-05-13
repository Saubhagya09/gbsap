import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorListViewComponent } from './vendor-list-view.component';

describe('VendorListViewComponent', () => {
  let component: VendorListViewComponent;
  let fixture: ComponentFixture<VendorListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorListViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
