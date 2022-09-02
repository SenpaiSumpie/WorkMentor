import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let toastService: jasmine.SpyObj<ToastrService>;
  let fixture: ComponentFixture<SignUpComponent>;
  let dialogRef : jasmine.SpyObj<MatDialogRef<SignUpComponent>>;

  beforeEach(async () => {
    toastService = jasmine.createSpyObj<ToastrService>('ToasterService', ['error', 'success']);
    dialogRef = jasmine.createSpyObj<MatDialogRef<SignUpComponent>>('DialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        ToastrModule.forRoot()
      ],
      declarations: [ SignUpComponent ],
      providers: [
        {provide: MatDialogRef, useValue: dialogRef},
    ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should signUp', () => {
    component.signUp();
  });

  it('should add user to database', ()=> {
    component.addUserToDatabase();
  });

  it('should confirmSignUp', () => {
    component.confirmSignUp();
  });

  it('should onNoClick', () => {
    component.onNoClick();
  });

  it('should showToast', () => {
    component.showToast();
  });

  it('should show error message', () => {
    component.getErrorMessage();
  });

});
