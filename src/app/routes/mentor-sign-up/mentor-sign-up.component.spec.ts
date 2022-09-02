import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorSignUpComponent } from './mentor-sign-up.component';

describe('MentorSignUpComponent', () => {
  let component: MentorSignUpComponent;
  let fixture: ComponentFixture<MentorSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MentorSignUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MentorSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
