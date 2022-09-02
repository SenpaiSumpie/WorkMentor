import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';

interface IUser {
  email: string;
  password: string;
  showPassword: boolean;
  userName: string;
  code: string;
  name: string;
}

import { CognitoService } from './cognito.service';

describe('CognitoService', () => {
  let service: CognitoService;
  let authenticationSubject : jasmine.SpyObj<BehaviorSubject<any>>;
  let cognitoService : jasmine.SpyObj<CognitoService>;

  beforeEach(() => {
    authenticationSubject = jasmine.createSpyObj<BehaviorSubject<any>>(['next']);
    cognitoService = jasmine.createSpyObj<CognitoService>(['signIn', 'isAuthenticated', 'signUp', 'updateUser', 'confirmSignUp']);
    TestBed.configureTestingModule({});
    service = TestBed.inject(CognitoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


});
