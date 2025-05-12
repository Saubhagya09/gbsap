import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenderListAddComponent } from './vender-list-add.component';

describe('VenderListAddComponent', () => {
  let component: VenderListAddComponent;
  let fixture: ComponentFixture<VenderListAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VenderListAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VenderListAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
