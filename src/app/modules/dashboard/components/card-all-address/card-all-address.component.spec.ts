import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAllAddressComponent } from './card-all-address.component';

describe('CardAllAddressComponent', () => {
  let component: CardAllAddressComponent;
  let fixture: ComponentFixture<CardAllAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardAllAddressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardAllAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
