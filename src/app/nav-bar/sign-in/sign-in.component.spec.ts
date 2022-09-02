import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { SignInComponent } from './sign-in.component';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let toastrService : jasmine.SpyObj<ToastrService>;
  let fixture: ComponentFixture<SignInComponent>;
  let dialogref : jasmine.SpyObj<MatDialogRef<SignInComponent>>;
  
  beforeEach(async () => {
    toastrService = jasmine.createSpyObj<ToastrService>('ToasterService', ['error', 'success']);
    dialogref = jasmine.createSpyObj<MatDialogRef<SignInComponent>>(['close']);

    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        FormsModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
      ],
      declarations: [ SignInComponent ],
      providers: [
        {provide: MatDialogRef, useValue: {}},
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
