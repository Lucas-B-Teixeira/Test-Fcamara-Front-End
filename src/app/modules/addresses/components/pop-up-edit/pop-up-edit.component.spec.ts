import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpEditComponent } from './pop-up-edit.component';

describe('PopUpEditComponent', () => {
  let component: PopUpEditComponent;
  let fixture: ComponentFixture<PopUpEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
