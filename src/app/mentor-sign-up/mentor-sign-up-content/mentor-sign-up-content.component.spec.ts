import { CommonModule } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { MentorSignUpContentComponent } from './mentor-sign-up-content.component';

describe('MentorSignUpContentComponent', () => {
  let component: MentorSignUpContentComponent;
  let fixture: ComponentFixture<MentorSignUpContentComponent>;
  let toastrService : jasmine.SpyObj<ToastrService>;
  let router : jasmine.SpyObj<Router>;

  beforeEach(async () => {
    toastrService = jasmine.createSpyObj<ToastrService>('ToasterService', ['error', 'success']);
    router = jasmine.createSpyObj<Router>(['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot()],
      declarations: [ MentorSignUpContentComponent ],
      providers:[
        MentorSignUpContentComponent,
        {provide: ToastrService, userValue: toastrService}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MentorSignUpContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should signUp', () => {
    component.signUp();
    expect(component.loading).toBeTrue();
  });

  it('should addUserToDatabase', ()=> {
    component.addUserToDatabase();
  });

  it('should confirmSignUp', ()=> {
    component.confirmSignUp();
    expect(component.loading).toBeTrue();
  });

  it('should show some toast', () => {
    component.showToast();
    /*expect(toastrService.success).toHaveBeenCalledWith("", "Sign Up successful!", 
    { timeOut: 5000, 
      progressBar: true, 
      closeButton: true });*/
  });

  it('should have called showFailure', () => {
    component.showFailure();
  });

  it('should getErrorMessage', () => {
    component.getErrorMessage();
  });
});
