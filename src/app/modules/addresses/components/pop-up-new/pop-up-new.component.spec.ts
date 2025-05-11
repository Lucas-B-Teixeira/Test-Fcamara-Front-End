import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpNewComponent } from './pop-up-new.component';

describe('PopUpNewComponent', () => {
  let component: PopUpNewComponent;
  let fixture: ComponentFixture<PopUpNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
