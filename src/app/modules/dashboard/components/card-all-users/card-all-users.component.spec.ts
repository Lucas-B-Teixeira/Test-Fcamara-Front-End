import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAllUsersComponent } from './card-all-users.component';

describe('CardAllUsersComponent', () => {
  let component: CardAllUsersComponent;
  let fixture: ComponentFixture<CardAllUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardAllUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardAllUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
