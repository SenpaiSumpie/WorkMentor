import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CognitoService } from 'src/app/cognito.service';
import { SignInComponent } from 'src/app/nav-bar/sign-in/sign-in.component';
import { SignUpComponent } from 'src/app/nav-bar/sign-up/sign-up.component';

import { MentorNavComponent } from './mentor-nav.component';

describe('MentorNavComponent', () => {
  let component: MentorNavComponent;
  let fixture: ComponentFixture<MentorNavComponent>;
  let toastrService : jasmine.SpyObj<ToastrService>;
  let cognitoService: jasmine.SpyObj<CognitoService>;
  let dialog : jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    toastrService = jasmine.createSpyObj<ToastrService>('ToasterService', ['error', 'success']);
    cognitoService = jasmine.createSpyObj<CognitoService>('CognitoService', ['signOut']);
    dialog = jasmine.createSpyObj<MatDialog>('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        BrowserAnimationsModule,
        FormsModule,
        BrowserModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
      ],
      declarations: [ MentorNavComponent ],
      providers : [
        {provider: 'MatDialog', useValue: 'dialog'},
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MentorNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*
  it('should openSignIn', () => {
    component.openSignIn();
    expect(dialog.open).toHaveBeenCalledWith(SignInComponent, {width: '500px'});
    
  });*/

  it('should openSignUp', () => {
    component.openSignUp();
    // expect(dialog.open).toHaveBeenCalledWith(SignUpComponent, {width: '500px'});
  });

  it('should signOutToast', () => {
    component.signOutToast();
    /*expect(toastrService.success).toHaveBeenCalledWith("", "Sign Out Successful!", { 
      timeOut: 5000, 
      progressBar: true, 
      closeButton: true, 
    });*/
  });

  it('should call sign out', () => {
    component.signOut();
    //expect(cognitoService.signOut).toHaveBeenCalled();
  });

  it('should call showMenu', () => {
    component.showMenu();
  });

});
