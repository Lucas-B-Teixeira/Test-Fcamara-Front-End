import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortAddressComponent } from './sort-address.component';

describe('SortAddressComponent', () => {
  let component: SortAddressComponent;
  let fixture: ComponentFixture<SortAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortAddressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SortAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
